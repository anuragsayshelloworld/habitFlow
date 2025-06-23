import { useAuth } from '../contexts/AuthContext';
import Login from '../components/auth/Login';
import Dashboard from '../components/Dashboard';

export default function MainRoute() {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  //loading is set to false if user exists in LS or login success occurs. Till then loading occurs.
  //loading state true and success in login don't occurs. tesari lekhna hunna authcontext ma. 
  return user ? <Dashboard /> : <Login />;
}