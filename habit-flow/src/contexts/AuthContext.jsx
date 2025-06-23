import { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi } from '../services/AuthServices';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({children}){
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){setUser(user)}
    setLoading(false);
    },[])
     
    const login = async (email, password) => {
    try{
    const response = await loginApi(email, password);
    if(response.success){
    setUser(response.user);
    localStorage.setItem('user', JSON.stringify(response.user));
    setLoading(false);    
    }}

    catch(error){
    console.log(error);
    }}

    const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    }    

return <AuthContext.Provider value={{user, setUser, login, logout, loading}}>
    {children}
</AuthContext.Provider>    
}

export const useAuth = () => useContext(AuthContext);