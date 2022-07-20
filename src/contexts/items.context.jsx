import { createContext, useState, useEffect } from "react";
import { getItems } from "../utils/firebase/firebase.utils";
import { getItemReservations, getItemDataById, approveReservation, deleteReservation } from "../utils/firebase/firebase.utils";


export const ItemsContext = createContext({
  itemsMap: {},
  doGetItemReservations: () => {},
  doGetItemDataById: () => {},
  callReTrigger: () => {},
  doApproveReservation: () => {},
  doDeleteReservation: () => {}
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


  const doGetItemDataById = async(id) => {
    //console.log(id);
    const itemData = await getItemDataById(id);
    return itemData;
  };

  const doApproveReservation = async(itemId, reservationId) => {
    const approve = await approveReservation(itemId, reservationId);
    return approve;
  };

  const doDeleteReservation =  async(itemId, reservationId) => {
    const deleting = await deleteReservation(itemId, reservationId);
    return deleting;
  };

  const value = { itemsMap, callReTrigger, doGetItemReservations, doGetItemDataById, doApproveReservation, doDeleteReservation };                                           

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  )

};