import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { UserContext } from "../contexts/user.context";

const RequireAuth = ({children}) => {
  const { currentUser, loadedCurrentUser } = useContext(UserContext);
  const location = useLocation();

  if(location.pathname === "/login") {
    if(loadedCurrentUser) {
      return currentUser === null ? children : <Navigate to="/items" replace />;                
    }
  } else {
    if(loadedCurrentUser) {
      return currentUser !== null ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;                
    }
  }

};

export default RequireAuth;





