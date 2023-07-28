import View from './View';

class WorkoutView extends View {
  _parentEl = document.querySelector('.workout');
  _errorMessage = `Sorry we couldn't find this workout, please try another one`;
  _message = ``;

  addHandlerRender(handler) {
    // Listening to hashchange :
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateOptions(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      console.log(btn);
      const updateTo = +btn.dataset.updateTo;
      // const workoutOption = 'sets';
      const workoutOption =
        btn.classList.contains('btn--decrease-repetitions') ||
        btn.classList.contains('btn--increase-repetitions')
          ? 'repetitions'
          : 'sets';
      console.log(workoutOption);
      console.log(updateTo);
      if (updateTo > 0) handler(workoutOption, updateTo);
    });
  }

  _generateMarkup() {
    return `
    <figure class="workout__fig">
    <img src="${this._data.gif}" alt="${
      this._data.name
    }" class="workout__img" />
    <h3 class="workout__title">
      <span>${this._data.name.toUpperCase()}</span>
    </h3>
    </figure>

    <div class="workout__details">
        <div class="workout__info">
        <span class="workout__info-text">Body Part : </span>
          <span class="workout__info-data workout__info-data--bodyPart">${
            this._data.bodyPart
          }</span>
        </div>

        <div class="workout__info">
        <span class="workout__info-text">Equipment : </span>
        <span class="workout__info-data workout__info-data--equipment">${
          this._data.equipment
        }</span>
       </div>

       <div class="workout__info">
       <span class="workout__info-text">Target : </span>
       <span class="workout__info-data workout__info-data--target">${
         this._data.target
       }</span>
      </div>

        <div class="workout__info">
        <span class="workout__info-text">Nbr of repetitions : </span>
          <span class="workout__info-data workout__info-data--repetitions">x${
            this._data.repetitions
          }</span>

          <div class="workout__info-buttons">
            <button class="btn--tiny btn--decrease-repetitions" data-update-to = "${
              this._data.repetitions - 1
            }">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn--tiny btn--increase-repetitions" data-update-to = "${
              this._data.repetitions + 1
            }">
              <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div class="workout__info">
        <span class="workout__info-text">Nbr of sets : </span>
          <span class="workout__info-data workout__info-data--sets">x${
            this._data.sets
          }</span>

          <div class="workout__info-buttons">
            <button class="btn--tiny btn--decrease-sets" data-update-to = "${
              this._data.sets - 1
            }">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn--tiny btn--increase-sets" data-update-to = "${
              this._data.sets + 1
            }">
              <i class="fa-solid fa-plus"></i>
            </button>
        </div>


      </div>
    </div>
`;
  }
}

export default new WorkoutView();
