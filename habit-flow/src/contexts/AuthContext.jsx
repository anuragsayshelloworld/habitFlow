import { createContext, useContext, useEffect, useState } from "react";
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
     
    const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    }

    const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    }    

return <AuthContext.Provider value={{user, setUser, login, logout, loading}}>
    {children}
</AuthContext.Provider>    
}

export const useAuth = () => useContext(AuthContext);