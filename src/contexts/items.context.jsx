import { createContext, useState, useEffect } from "react";
import { getItems } from "../utils/firebase/firebase.utils";
import { getItemReservations } from "../utils/firebase/firebase.utils";


export const ItemsContext = createContext({
  itemsMap: {},
  doGetItemReservations: () => {},
  callReTrigger: () => {}
});

export const ItemsContextProvider = ({children}) => {
  
  const [itemsMap, setItemsMap] = useState({});
  const [reTrigger, setReTrigger] = useState(false);
  
  useEffect(() => {
    
    const getItemsMap = async() => {
      const itemMap = await getItems();
      setItemsMap(itemMap);
    };
    getItemsMap();
  
  }, [reTrigger]);

  const callReTrigger = () =>{
    setReTrigger(!reTrigger);
  };

  const doGetItemReservations = async(id) => {
    const reservationsMap = await getItemReservations(id);
    return reservationsMap;
  };
  

  const value = { itemsMap, callReTrigger, doGetItemReservations };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  )

};