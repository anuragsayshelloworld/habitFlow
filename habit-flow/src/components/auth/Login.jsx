import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
export default function Login(){
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        try{
            await login(email, password);
            // login function in context handles user state and redirect
        }
        catch(error){
            console.error('Login failed:', error);
        }
        finally {
            setIsLoading(false);
        }
    }
    return <>
           <form onSubmit={handleSubmit}>
            <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button> 
           </form>
           </>
}

//if we already have data in localstorage and then even if backend off chha bhane pani it will log in. so this need to be fixed but later.. 
