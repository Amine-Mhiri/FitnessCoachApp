import * as model from './model.js';
import workoutView from './views/workoutView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

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
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // 2. loading workout :
    await model.loadWorkout(id);

    // 3. Rendering workout :
    workoutView.render(model.state.workout);
  } catch (err) {
    workoutView.renderError();
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
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
  workoutView.update(model.state.workout);
};

const controlAddBookmark = function () {
  // 1 ) Adding and removeing bookmarks
  if (!model.state.workout.bookmarked) model.addBookmark(model.state.workout);
  else model.deleteBookmark(model.state.workout.id);

  // 2) Updating recipe view
  workoutView.update(model.state.workout);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  workoutView.addHandlerRender(controlWorkout);
  workoutView.addHandlerUpdateOptions(controlWorkoutOptions);
  workoutView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
