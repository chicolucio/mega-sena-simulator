export class Game {
  #selectedNumbers;

  constructor(maxNumbers = 6) {
    this.maxNumbers = maxNumbers;
    this.#selectedNumbers = [];
  }

  get values() {
    // native JS sort is lexicographic...
    return this.#selectedNumbers.sort((a, b) => a - b);
  }

  addNumber(number) {
    if (
      this.#selectedNumbers.length < this.maxNumbers &&
      !this.#selectedNumbers.includes(number)
    ) {
      this.#selectedNumbers.push(number);
    } else {
      throw new Error("Game is full or number already selected");
    }
  }

  removeNumber(number) {
    const index = this.#selectedNumbers.indexOf(number);
    if (index > -1) {
      this.#selectedNumbers.splice(index, 1);
    } else {
      throw new Error("Number not in game");
    }
  }

  random() {
    this.#selectedNumbers = [];
    while (this.#selectedNumbers.length < this.maxNumbers) {
      let newNumber = Math.ceil(Math.random() * 60);
      newNumber = Math.max(newNumber, 1);

      if (!this.#selectedNumbers.includes(newNumber)) {
        this.#selectedNumbers.push(newNumber);
      }
    }
  }
}
