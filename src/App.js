import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Login from './routes/login/login.component';
import Home from './routes/home/home.component';
import ItemsList from './routes/items-list/items-list.component';

import RequireAuth from './guards/require-auth.guard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<RequireAuth><Login /></RequireAuth>} />
        
        
        <Route path="items/*" element={<RequireAuth><ItemsList /></RequireAuth>} />
       
      
      
        </Route>
    </Routes>
  );
}

export default App;
