export class Board {
  #spaces;

  constructor(maxNumber = 60) {
    this.maxNumber = maxNumber;
    this.#spaces = [];
  }

  get spaces() {
    this.#create();
    return this.#spaces;
  }

  #create() {
    for (let i = 1; i <= this.maxNumber; i++) {
      this.#spaces.push(i);
    }
  }
}
