import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Items from './routes/items/items.component';
import Login from './routes/login/login.component';
import SelectedItem from './routes/selected-item/selected-item.component';
import Home from './routes/home/home.component';

import RequireAuth from './guards/require-auth.guard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<RequireAuth><Login /></RequireAuth>} />
        <Route path="items" element={<RequireAuth><Items /></RequireAuth>} />
        <Route path="selected-item" element={<RequireAuth><SelectedItem /></RequireAuth>} />
      </Route>
    </Routes>
  );
}

export default App;
