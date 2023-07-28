import { API_URL, API_OPTIONS, RES_PER_PAGE } from './config';

import { getJSON } from './helpers';

export const state = {
  workout: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadWorkout = async function (id) {
  try {
    const data = await getJSON(API_URL, API_OPTIONS);
    const workout = data.filter(workout => workout.id === id)[0];

    state.workout = {
      id: workout.id,
      bodyPart: workout.bodyPart,
      equipment: workout.equipment,
      gif: workout.gifUrl,
      name: workout.name,
      target: workout.target,
      repetitions: 10,
      sets: 3,
      publisher: 'FitnessCoachApp',
    };
    window.location.hash = `#${workout.id}`;
    console.log(state.workout);
    console.log(state.search.results);
  } catch (err) {
    console.log(`${err} 🧧`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(API_URL, API_OPTIONS);
    state.search.query = query;
    // 3. Loading the exercises
    state.search.results = data
      .filter(
        exercice =>
          exercice.name.includes(query) ||
          exercice.target.includes(query) ||
          exercice.equipment.includes(query) ||
          exercice.bodyPart.includes(query)
      )
      .map(workout => {
        return {
          id: workout.id,
          bodyPart: workout.bodyPart,
          equipment: workout.equipment,
          gif: workout.gifUrl,
          name: workout.name,
          target: workout.target,
          repetitions: 10,
          sets: 3,
          publisher: 'FitnessCoachApp',
        };
      });
  } catch (err) {
    console.log(`${err} 🧧`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //6;
  return state.search.results.slice(start, end);
};

export const updateWorkoutOptions = function (option, newValue) {
  option === 'sets'
    ? (state.workout.sets = newValue)
    : (state.workout.repetitions = newValue);
};
