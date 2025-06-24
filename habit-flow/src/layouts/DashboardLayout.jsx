import HabitCreater from "../components/HabitCreater";
import HabitList from "../components/HabitList";
import { HabitProvider } from "../contexts/HabitContext";

export default function DashboardLayout(){
    return <>
            <HabitProvider>
            <HabitCreater/>
            <HabitList/>
            </HabitProvider>   
           </>
}