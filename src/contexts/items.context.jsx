import { createContext, useState, useEffect } from "react";
import { getItems } from "../utils/firebase/firebase.utils";


export const ItemsContext = createContext({
  itemsMap: {}
});

export const ItemsContextProvider = ({children}) => {
  
  const [itemsMap, setItemsMap] = useState({});

  useEffect(() => {

    const getItemsMap = async() => {
      const itemMap = await getItems();
      setItemsMap(itemMap);
    };
    getItemsMap();
  
  }, []);

  const value = { itemsMap };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  )

};