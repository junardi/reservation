import { createContext, useState, useEffect } from "react";
import { getItems } from "../utils/firebase/firebase.utils";


export const ItemsContext = createContext({
  itemsMap: {},
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
  


  const value = { itemsMap, callReTrigger };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  )

};