import { Navigate } from "react-router-dom"


const AuthRoute = ({ user, component }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return component;
  };

export default AuthRoute