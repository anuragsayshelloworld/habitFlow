import {useHabit} from '../contexts/HabitContext';

export default function HabitCreater(){
    const {addHabit} = useHabit();
    const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  const newHabit = {
    habitName: form.habitName.value,
    habitDescription: form.habitDescription.value,
    habitStreak: 0
  };

  addHabit(newHabit); // ✅ send full object
  form.reset();
};

    return <form onSubmit={handleSubmit}>
  <input type="text" name="habitName" placeholder="habit name" required />
  <textarea name="habitDescription" placeholder="description" required></textarea>
  <button type="submit">Add</button>
</form>

}