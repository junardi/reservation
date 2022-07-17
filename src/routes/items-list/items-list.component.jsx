import { Routes, Route } from 'react-router-dom';
import Items from '../items/items.component';
import SelectedItem from '../selected-item/selected-item.component';

const ItemsList = () => {

  return(
    <Routes>
      <Route index element={<Items />}></Route>
      <Route path=":id" element={<SelectedItem />}></Route>
    </Routes>
  )
 
};

export default ItemsList;