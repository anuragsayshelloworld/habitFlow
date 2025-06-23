import { useAuth } from '../contexts/AuthContext'
export default function Dashboard(){
    const { logout } = useAuth();
    return <button onClick={logout}>Logout</button>
}