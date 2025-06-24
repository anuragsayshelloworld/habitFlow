import {useHabit} from '../contexts/HabitContext';

export default function HabitCreater(){
    const {addHabit, habitdesc, sethabitdesc, sethabitname, habitname, edit, Update} = useHabit();
    const handleSubmit = (e) => {
    e.preventDefault();
     
    const newHabit = {
    habitName: habitname,
    habitDescription: habitdesc,
    habitStreak: 0
    };

    addHabit(newHabit); 
    sethabitname('');
    sethabitdesc('');
    };
    
    return <form onSubmit={edit ? Update : handleSubmit}>
    <input type="text" placeholder="habit name" value={habitname} onChange={(e)=>sethabitname(e.target.value)} required />
    <textarea placeholder="description" value={habitdesc} onChange={(e)=>sethabitdesc(e.target.value)} required></textarea>
    <button type="submit">{edit ? 'Update': 'Add'}</button>
    </form>
}