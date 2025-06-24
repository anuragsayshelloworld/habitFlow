import { useHabit } from "../contexts/HabitContext"
export default function HabitList(){
    const { Habit, Delete } = useHabit();
    console.log(Habit);
    return <ol>
           {Habit.map(habit => (
           <li key={habit.id}>
           {habit.habitName} 
           <button onClick={()=>Delete(habit.id)}>Delete</button>
           </li>
           ))}
           </ol>
}