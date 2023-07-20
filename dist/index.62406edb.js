"use strict";
const workoutContainer = document.querySelector(".workout");
const searchInput = document.querySelector(".search__field");
const searchBtn = document.querySelector(".search__btn");
let search;
// 0. Adding a spinner :
const renderSpinner = function(parentEl) {
    const markup = `
  <div class ="spinner">
  <i class="fa-solid fa-spinner"></i>
  </div>
  `;
    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML("afterbegin", markup);
};
// 1. Adding event listener and extracting search
searchBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (!searchInput.value) return;
    search = searchInput.value.toLowerCase();
    searchWorkout();
    searchInput.value = "";
});
// 2. fetching workout data
const searchWorkout = async function() {
    try {
        renderSpinner(workoutContainer);
        const url = "https://exercisedb.p.rapidapi.com/exercises/";
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "b18f7ecab4msh714e81df57af967p11bba7jsn1be18de8f791",
                // 'X-RapidAPI-Key': process.env.APP_RAPID_API_KEY,
                "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
            }
        };
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);
        if (!res.ok) throw new Error(`${data.message} (${res.status}) `);
        // 3. Loading the exercises
        const workouts = data.filter((exercice)=>exercice.name.includes(search) || exercice.target.includes(search) || exercice.equipment.includes(search) || exercice.bodyPart.includes(search));
        console.log(workouts);
        let workout = workouts[1];
        workout = {
            id: workout.id,
            bodyPart: workout.bodyPart,
            equipment: workout.equipment,
            gif: workout.gifUrl,
            name: workout.name,
            target: workout.target,
            repetition: 1
        };
        console.log(workout);
        // 4. Rendering a workout :
        const markup = `
        <figure class="workout__fig">
        <img src="${workout.gif}" alt="${workout.name}" class="workout__img" />
        <h3 class="workout__title">
          <span>${workout.name.toUpperCase()}</span>
        </h3>
        </figure>

        <div class="workout__details">
            <div class="workout__info">
            <span class="workout__info-text">Body Part : </span>
              <span class="workout__info-data workout__info-data--bodyPart">${workout.bodyPart}</span>
            </div>

            <div class="workout__info">
            <span class="workout__info-text">Equipment : </span>
            <span class="workout__info-data workout__info-data--equipment">${workout.equipment}</span>
           </div>

           <div class="workout__info">
           <span class="workout__info-text">Target : </span>
           <span class="workout__info-data workout__info-data--target">${workout.target}</span>
          </div>

            <div class="workout__info">
            <span class="workout__info-text">Nbr of repetitions : </span>
              <span class="workout__info-data workout__info-data--repetitions">${workout.repetition}</span>

              <div class="workout__info-buttons">
                <button class="btn--tiny btn--decrease-repetitions">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <button class="btn--tiny btn--increase-repetitions">
                  <i class="fa-solid fa-plus"></i>
                </button>
            </div>



          </div>
        </div>
    `;
        workoutContainer.innerHTML = "";
        workoutContainer.insertAdjacentHTML("afterbegin", markup);
    } catch (err) {
        console.log(`${err}🎃,${err.message}`);
    }
};

//# sourceMappingURL=index.62406edb.js.map
