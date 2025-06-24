import { useAuth } from '../contexts/AuthContext'
import DashboardLayout from '../layouts/DashboardLayout';
export default function Dashboard(){
    const { logout } = useAuth();
    return <><button onClick={logout}>Logout</button>
    <DashboardLayout/></>
}