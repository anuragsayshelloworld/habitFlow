import { createContext, useContext, useEffect, useState } from "react";
import { createHabit, getHabit as getHabitAPI, deletehabit, updateapi } from '../services/HabitServices';

const HabitContext = createContext();
export default HabitContext;

export function HabitProvider({children}){
    const [Habit, sethabit] = useState([]);
    const [habitname, sethabitname] = useState('');
    const [habitdesc, sethabitdesc] = useState('');
    const [edit, setEdit] = useState('');
    const [id, setId] = useState(null);
    
    //add new habit
    async function addHabit(habit){
    try{
    const response = await createHabit(habit);
    const temporaryObject = {
    id: response.habitId,
    habitName: habit.habitName,
    habitDescription: habit.habitDescription,
    habitStreak: habit.habitStreak
    }
    sethabit(prevHabits => [...prevHabits, temporaryObject]);
    //can use this to display successfully added message            
    }catch (error) {
    console.log(error);  
    }}

    async function Delete(id){
    await deletehabit(id);
    const newArrayOfHabits = Habit.filter((item)=>item.id !== id);
    sethabit(newArrayOfHabits);         
    }
    
    function updatehabit(id) {
    setEdit(true);
    const habit = Habit.find(item => item.id === id);
    if (habit) {
    sethabitname(habit.habitName || '');
    sethabitdesc(habit.habitDescription || '');
    setId(habit.id);  
    }}

    const Update = async (e) =>{
    e.preventDefault();
    await updateapi(id, habitname, habitdesc);
    sethabitname('');
    sethabitdesc('');
    setEdit(false);
    setId(null);
    sethabit(prev => prev.map(h =>
    h.id === id ? { ...h, habitName: habitname, habitDescription: habitdesc } : h
    ));}



    useEffect(()=>{
    async function getHabit(){
    const response = await getHabitAPI();
    sethabit(response.habits);   
    } getHabit()},[])

    return <HabitContext.Provider value={{Update, addHabit, Habit, Delete, habitdesc, sethabitdesc,
    sethabitname, habitname, updatehabit, edit}}>{children}</HabitContext.Provider>
}
export const useHabit = () => useContext(HabitContext);