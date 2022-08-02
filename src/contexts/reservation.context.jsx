import { createContext, useEffect, useReducer } from "react";
import { getReservationByTransactionIdRealtime } from "../utils/firebase/firebase.utils";
import { useParams } from 'react-router-dom';
import { createAction } from "../utils/reducer/reducer.util";

export const ReservationContext = createContext({
  currentReservation: null
});

export const RESERVATION_ACTION_TYPES = {
  'SET_CURRENT_RESERVATION': 'SET_CURRENT_RESERVATION'
};


const reservationReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(state);
  // console.log(payload);
  switch(type) {
    case RESERVATION_ACTION_TYPES.SET_CURRENT_RESERVATION:
      return {
        ...state,
        currentReservation: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
};

const INITIAL_STATE = {
  currentReservation: null,
};


export const ReservationProvider = ({children}) => {
  
  const { id } = useParams();
  const [{currentReservation}, dispatch] = useReducer(reservationReducer, INITIAL_STATE); 
  
  const setCurrentReservation = (reservation) => {
    dispatch(
      createAction(RESERVATION_ACTION_TYPES.SET_CURRENT_RESERVATION, reservation)
    )
  }

  useEffect(() => {

    const unsubscribe = getReservationByTransactionIdRealtime(id, (data) => {
      //console.log(data);
      setCurrentReservation(data);
    });

    return unsubscribe;
  }, [id]);
  
  const value = { currentReservation };

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>

}; 








