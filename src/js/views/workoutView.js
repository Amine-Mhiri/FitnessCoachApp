class WorkoutView {
  #parentElement = document.querySelector('.workout');
  #data;
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
    <div class ="spinner">
    <i class="fa-solid fa-spinner"></i>
    </div>
    `;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  #generateMarkup() {
    return `
    <figure class="workout__fig">
    <img src="${this.#data.gif}" alt="${
      this.#data.name
    }" class="workout__img" />
    <h3 class="workout__title">
      <span>${this.#data.name.toUpperCase()}</span>
    </h3>
    </figure>

    <div class="workout__details">
        <div class="workout__info">
        <span class="workout__info-text">Body Part : </span>
          <span class="workout__info-data workout__info-data--bodyPart">${
            this.#data.bodyPart
          }</span>
        </div>

        <div class="workout__info">
        <span class="workout__info-text">Equipment : </span>
        <span class="workout__info-data workout__info-data--equipment">${
          this.#data.equipment
        }</span>
       </div>

       <div class="workout__info">
       <span class="workout__info-text">Target : </span>
       <span class="workout__info-data workout__info-data--target">${
         this.#data.target
       }</span>
      </div>

        <div class="workout__info">
        <span class="workout__info-text">Nbr of repetitions : </span>
          <span class="workout__info-data workout__info-data--repetitions">x${
            this.#data.repetitions
          }</span>

          <div class="workout__info-buttons">
            <button class="btn--tiny btn--decrease-repetitions">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn--tiny btn--increase-repetitions">
              <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div class="workout__info">
        <span class="workout__info-text">Nbr of sets : </span>
          <span class="workout__info-data workout__info-data--sets">x${
            this.#data.sets
          }</span>

          <div class="workout__info-buttons">
            <button class="btn--tiny btn--decrease-sets">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn--tiny btn--increase-sets">
              <i class="fa-solid fa-plus"></i>
            </button>
        </div>


      </div>
    </div>
`;
  }
}

export default new WorkoutView();
