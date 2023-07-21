// import {async} from 'regenerator-runtime';
export const state = {
  workout: {},
};

export const loadWorkout = async function (id) {
  try {
    const url = 'https://exercisedb.p.rapidapi.com/exercises';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b18f7ecab4msh714e81df57af967p11bba7jsn1be18de8f791',
        // 'X-RapidAPI-Key': process.env.APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
    if (!res.ok) throw new Error(`${data.message} (${res.status}) `);

    let workouts;

    if (!id) {
      // 3. Loading the exercises
      workouts = data.filter(
        exercice =>
          exercice.name.includes(search) ||
          exercice.target.includes(search) ||
          exercice.equipment.includes(search) ||
          exercice.bodyPart.includes(search)
      );
      console.log(workouts);
    } else {
      workouts = data.filter(workout => workout.id === id);
      console.log(workouts);
    }

    const workout = workouts[0];
    state.workout = {
      id: workout.id,
      bodyPart: workout.bodyPart,
      equipment: workout.equipment,
      gif: workout.gifUrl,
      name: workout.name,
      target: workout.target,
      repetitions: 10,
      sets: 3,
    };

    console.log(state.workout);
  } catch (err) {
    console.log(err);
  }
};
