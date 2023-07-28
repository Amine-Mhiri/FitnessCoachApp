import * as model from './model.js';
import workoutView from './views/workoutView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// core js is for polyfilling everything else
import 'core-js/stable';
//  regenerator is for polyfilling async await for older browsers
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

const controlWorkout = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    workoutView.renderSpinner();
    // 1. Update results view to mark selected search result
    // resultsView.render(model.getSearchResultsPage());
    // 2. loading workout :
    await model.loadWorkout(id);

    // 3. Rendering workout :
    workoutView.render(model.state.workout);
  } catch (err) {
    workoutView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get Search query :
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load Search Results :
    await model.loadSearchResults(query);

    // 3) Render Results :
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination Numbers
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW Results :
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4) Render NEW pagination Numbers
  paginationView.render(model.state.search);
};

const controlWorkoutOptions = function (option, newValue) {
  // Update the Repetitions and sets (in state) :
  model.updateWorkoutOptions(option, newValue);
  // Update the workout view :
  // workoutView.render(model.state.workout);
  workoutView.update(model.state.workout);
};

const init = function () {
  workoutView.addHandlerRender(controlWorkout);
  workoutView.addHandlerUpdateOptions(controlWorkoutOptions);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
