import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";
import type {JSX} from "react";

export const PrivateRoute: React.FC<{children: JSX.Element}> = ({children}) =>{
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />
}