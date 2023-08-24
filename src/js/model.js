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
  bookmarks: [],
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
      timer: 2,
      publisher: 'FitnessCoachApp',
    };
    window.location.hash = `#${workout.id}`;

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.workout.bookmarked = true;
    else state.workout.bookmarked = false;
  } catch (err) {
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
          timer: 2,
          publisher: 'FitnessCoachApp',
        };
      });
    state.search.page = 1;
  } catch (err) {
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
  if (option === 'sets') {
    state.workout.timer =
      (+state.workout.timer * newValue) / state.workout.sets;
    state.workout.sets = newValue;
  }
  if (option === 'repetitions') {
    state.workout.timer =
      (+state.workout.timer * newValue) / state.workout.repetitions;
    state.workout.repetitions = newValue;
  }
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (workout) {
  // Add bookmark
  state.bookmarks.push(workout);

  // Mark current workout as bookmarked
  if (workout.id === state.workout.id) state.workout.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current workout as NOT bookmarked
  if (id === state.workout.id) state.workout.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
