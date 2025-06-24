
export const createHabit =  async (habit) =>{
    const habitName = habit.habitName;
    const habitDescription = habit.habitDescription;
    const habitStreak = habit.habitStreak;
    const response = await fetch('http://localhost:5000/api/addHabit', { 
    method: 'POST',
    headers: {'Content-Type' : 'application/json' },
    body: JSON.stringify({habitName, habitDescription, habitStreak})
});
const data = await response.json();
return data;
}

export const getHabit = async () =>{
    const response = await fetch ('http://localhost:5000/api/habitList',{method:'GET'});
    const data = await response.json();
    return data;
}

export const deletehabit = async (id) => {
  await fetch('http://localhost:5000/api/deleteitem', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })  // Correct serialization
  });
};
