import { useHabit } from "../contexts/HabitContext"
export default function HabitList(){
    const { Habit, Delete, updatehabit } = useHabit();
    return <ol>
    {Habit.map(habit => (
    <li key={habit.id}>
    {habit.habitName} 
    <button onClick={()=>Delete(habit.id)}>Delete</button>
    <button onClick={()=> updatehabit(habit.id)}>Edit</button>
    </li>
     ))}
    </ol>
}