import * as model from './model.js';
import workoutView from './views/workoutView.js';

// core js is for polyfilling everything else
import 'core-js/stable';
//  regenerator is for polyfilling async await for older browsers
import 'regenerator-runtime/runtime';

const searchInput = document.querySelector('.search__field');
const searchBtn = document.querySelector('.search__btn');
let search;

// 1. Adding event listener and extracting search
searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  search = searchInput.value.toLowerCase();
  controlWorkout();
  searchInput.value = '';
});

const controlWorkout = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id && !searchInput.value) return;

    workoutView.renderSpinner();

    // 2. loading workout :
    await model.loadWorkout(id);

    // 3. Rendering workout :
    workoutView.render(model.state.workout);
  } catch (err) {
    console.log(`${err}🎃,${err.message}`);
  }
};

// Listening to hashchange :
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlWorkout)
);
