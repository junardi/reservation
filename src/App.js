import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Items from './routes/items/items.component';
import Login from './routes/login/login.component';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="items" element={<Items />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
