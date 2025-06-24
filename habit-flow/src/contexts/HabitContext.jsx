import { createContext, useContext, useEffect, useState } from "react";
import { createHabit, getHabit as getHabitAPI, deletehabit } from '../services/HabitServices';

const HabitContext = createContext();
export default HabitContext;

export function HabitProvider({children}){
    const [Habit, sethabit] = useState([]);
    
    //add new habit
    async function addHabit(habit){
        try {
            const response = await createHabit(habit);
            const temporaryObject = {
                id: response.habitId,
                habitName: habit.habitName,
                habitDescription: habit.habitDescription,
                habitStreak: habit.habitStreak
            }
         sethabit(prevHabits => [...prevHabits, temporaryObject]);
            //can use this to display successfully added message            
        } catch (error) {
          console.log(error);  
        }
    }
    async function Delete(id){
      await deletehabit(id);
      const newArrayOfHabits = Habit.filter((item)=>item.id !== id);
      sethabit(newArrayOfHabits);         
    }
    //get habit on mount
    useEffect(()=>{
        async function getHabit(){
            const response = await getHabitAPI();
            sethabit(response.habits);   
        }
        getHabit();
    },[])
    return <HabitContext.Provider value={{addHabit, Habit, Delete}}>
        {children}
    </HabitContext.Provider>
}
export const useHabit = () => useContext(HabitContext);