import { createContext, useEffect, useReducer } from "react";

import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.util.js';

export const UserContext = createContext({
  currentUser: null,
  loadedCurrentUser: false
});

export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER': 'SET_CURRENT_USER'
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
        loadedCurrentUser: true
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
};


const INITIAL_STATE = {
  currentUser: null,
  loadedCurrentUser: false
};

export const UserProvider = ({children}) => {

  const [{currentUser, loadedCurrentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE); 

  const setCurrentUser = (user) => {
    dispatch(
      createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
    );
  };

  useEffect(() => {
    
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
    
  }, []);

  const value = { currentUser, loadedCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>

};









