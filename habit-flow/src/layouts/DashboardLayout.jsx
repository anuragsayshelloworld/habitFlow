import HabitCreater from "../components/HabitCreater";
import { HabitProvider } from "../contexts/HabitContext";

export default function DashboardLayout(){
    return <>
            <HabitProvider>
            <HabitCreater/>
            </HabitProvider>   
           </>
}