import { createContext, useContext } from "react";
import { createHabit } from '../services/HabitServices';

const HabitContext = createContext();
export default HabitContext;

export function HabitProvider({children}){
    async function addHabit(habit){
        try {
            const response = await createHabit(habit);
            console.log(response);            
        } catch (error) {
          console.log(error);  
        }
    }
    return <HabitContext.Provider value={{addHabit}}>
        {children}
    </HabitContext.Provider>
}
export const useHabit = () => useContext(HabitContext);