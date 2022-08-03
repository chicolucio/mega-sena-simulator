import { Board } from "./board.js";
import { Game } from "./game.js";

const board = new Board();
// board.create();

let game = new Game();

let state = {
  currentGame: [game],
  savedGames: [],
  board: [board],
};

function readLocalStorage() {
  if (!window.localStorage) {
    return;
  }
  let savedGames = window.localStorage.getItem("saved-games");
  if (savedGames) {
    state.savedGames = JSON.parse(savedGames);
  }
}

function writeLocalStorage() {
  window.localStorage.setItem("saved-games", JSON.stringify(state.savedGames));
}

function clearLocalStorage() {
  if (!window.localStorage) {
    return;
  }
  let savedGames = window.localStorage.getItem("saved-games");
  if (savedGames) {
    state.savedGames = [];
    localStorage.removeItem("saved-games");
  }
}

function renderBoard() {
  let divGame = document.querySelector("#megasena-numbers");
  divGame.innerHTML = "";

  let ulGames = document.createElement("ul");
  ulGames.classList.add("numbers");

  for (let i = 0; i < board.maxNumber; i++) {
    let currentNumber = board.spaces[i];

    let liGame = document.createElement("li");
    liGame.textContent = currentNumber.toString().padStart(2, "0");
    liGame.classList.add("number");
    liGame.addEventListener("click", handleNumberClick);

    if (game.values.includes(currentNumber)) {
      liGame.classList.add("selected-number");
    }

    ulGames.appendChild(liGame);
  }
  divGame.appendChild(ulGames);
}

function handleNumberClick(event) {
  let element = event.currentTarget;
  let clickedNumber = Number(element.textContent);

  let numberInGame = game.values.includes(clickedNumber);
  let totalNumbers = game.values.length;

  if (numberInGame) {
    game.removeNumber(clickedNumber);
  } else {
    if (totalNumbers === game.maxNumbers) {
      return;
    } else {
      game.addNumber(clickedNumber);
    }
  }
  render();
}

function render() {
  renderBoard();
  renderButtons();
  renderSavedGames();
}

function handleSaveGame() {
  state.savedGames.push(game.values);
  writeLocalStorage();
  newGame();
}

function renderSavedGames() {
  let divSavedGames = document.querySelector("#megasena-saved-games");
  divSavedGames.innerHTML = "";

  if (state.savedGames.length === 0) {
    divSavedGames.innerHTML =
      "<p style='text-align: center'> No saved games at the moment.</p>";
  } else {
    let h2 = document.createElement("h2");
    h2.textContent = "Saved games";

    let ul = document.createElement("ul");
    ul.classList.add("saved-games");

    for (let i = 0; i < state.savedGames.length; i++) {
      let currentGame = state.savedGames[i];

      let li = document.createElement("li");

      li.textContent = currentGame
        .map((number) => number.toString().padStart(2, "0"))
        .join(" ");
      ul.appendChild(li);
    }
    divSavedGames.appendChild(h2);
    divSavedGames.appendChild(ul);
  }
}

function renderNewGameButton() {
  let li = document.createElement("li");
  li.classList.add("button");

  let button = document.createElement("button");

  button.textContent = "New game";
  button.addEventListener("click", newGame);
  li.appendChild(button);
  return li;
}

function renderRandomGameButton() {
  let li = document.createElement("li");
  li.classList.add("button");

  let button = document.createElement("button");
  button.textContent = "Random game";
  button.addEventListener("click", function () {
    game.random();
    render();
  });
  li.appendChild(button);
  return li;
}

function renderSaveGameButton() {
  let li = document.createElement("li");
  li.classList.add("button");

  let button = document.createElement("button");
  button.textContent = "Save game";
  button.disabled = game.values.length !== game.maxNumbers;

  button.addEventListener("click", handleSaveGame);
  li.appendChild(button);
  return li;
}

function renderClearSavedGamesButton() {
  let li = document.createElement("li");
  li.classList.add("button");

  let button = document.createElement("button");
  button.textContent = "Clear saved games";
  button.disabled = state.savedGames.length === 0;

  button.addEventListener("click", function () {
    clearLocalStorage();
    render();
  });
  li.appendChild(button);
  return li;
}

function renderButtons() {
  let divButtons = document.querySelector("#megasena-buttons");
  divButtons.innerHTML = "";

  let ulButtons = document.createElement("ul");
  ulButtons.classList.add("buttons");

  let liNewGameButton = renderNewGameButton();
  let liRandomGameButton = renderRandomGameButton();
  let liSaveGameButton = renderSaveGameButton();
  let liClearSavedGamesButton = renderClearSavedGamesButton();

  ulButtons.appendChild(liNewGameButton);
  ulButtons.appendChild(liRandomGameButton);
  ulButtons.appendChild(liSaveGameButton);
  ulButtons.appendChild(liClearSavedGamesButton);

  divButtons.appendChild(ulButtons);
}

function newGame() {
  game = new Game();
  state.currentGame = [game];
  render();
}

function start() {
  readLocalStorage();
  newGame();
}

start();
