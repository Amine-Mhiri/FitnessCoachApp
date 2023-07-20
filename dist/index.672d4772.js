"use strict";
const workoutList = document.querySelector(".workout");
const searchInput = document.querySelector(".search__field");
const searchBtn = document.querySelector(".search__btn");
let search;
// 1. Adding event listener and extracting search
searchBtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (!searchInput.value) return;
    search = searchInput.value.toLowerCase();
    loadWorkout();
    searchInput.value = "";
});
// 2. fetching workout data
const loadWorkout = async function() {
    try {
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
        // 3. Loading the exercises
        const workouts = data.filter((exercice)=>exercice.name.includes(search) || exercice.target.includes(search) || exercice.equipment.includes(search) || exercice.bodyPart.includes(search));
        console.log(workouts);
    } catch (err) {
        console.log(`${err}🎃,${err.message}`);
    }
};

//# sourceMappingURL=index.672d4772.js.map
