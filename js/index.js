import { GuessNumber } from "./GuessNumber.js";
import { alert } from "./sweetAlert.js";

class GuessNumberGame {
  constructor() {
    this.game = new GuessNumber();
    this.inputPosition = 0;
    this.description = document.getElementById("description");
    this.resetButton = document.getElementById("resetButton");
    this.guessNumberInput = document.getElementById("guessNumber");
    this.guessButton = document.getElementById("guessButton");
    this.numberButtons = document.querySelectorAll(".btn-group .btn");

    this.description.textContent = this.game.attemptsMsg();

    this.description.textContent = this.game.attemptsMsg();
    this.guessButton.addEventListener("click", this.handleGuess.bind(this));
    this.guessNumberInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.handleGuess();
      }
    });
    this.numberButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (!this.game.isFinished) {
          const currentInput = this.guessNumberInput.value;
          const newInput =
            currentInput.substring(0, this.inputPosition) +
            button.textContent +
            currentInput.substring(this.inputPosition + 1);
          this.guessNumberInput.value = newInput;
          this.inputPosition = (this.inputPosition + 1) % 2;
        }
      });
    });
    this.resetButton.addEventListener("click", this.resetGame.bind(this));
    this.renderNumberButtons();
  }

  updateGameUI(result) {
    this.description.textContent = this.game.attemptsMsg();
    const attemptContainers = document.querySelectorAll(".attempt-container");
    for (let i = 0; i < attemptContainers.length; i++) {
      const attemptContainer = attemptContainers[i];
      const arrowSpan = attemptContainer.querySelector("span:nth-child(1)");
      const numberSpan = attemptContainer.querySelector("span:nth-child(2)");
      if (!arrowSpan.textContent && !numberSpan.textContent) {
        arrowSpan.textContent = result.result;
        numberSpan.textContent = this.guessNumberInput.value;
        break;
      }
    }
    if ("message" in result) {
      setTimeout(() => {
        alert(result.icon, result.result, result.message);
      }, 100);
    }
  }

  handleGuess() {
    if (this.game.isFinished) {
      return;
    }
    const guess = parseInt(this.guessNumberInput.value, 10);
    if (isNaN(guess)) {
      alert("warning", "Something is not okay", "Please enter a valid number.");
      return;
    }
    const gameInput = this.game.tryGuess(guess);
    this.updateGameUI(gameInput);
    this.guessNumberInput.value =
      this.guessNumberInput.value.substring(1) + " ";
    this.inputPosition = 0;
  }

  resetGame() {
    this.game.reset();
    this.description.textContent = this.game.attemptsMsg();
    this.guessNumberInput.value = "";
    const attemptContainers = document.querySelectorAll(".attempt-container");
    for (let i = 0; i < attemptContainers.length; i++) {
      const attemptContainer = attemptContainers[i];
      const arrowSpan = attemptContainer.querySelector("span:nth-child(1)");
      const numberSpan = attemptContainer.querySelector("span:nth-child(2)");
      arrowSpan.textContent = "";
      numberSpan.textContent = "";
    }
  }

  renderNumberButtons() {
    const numberButtonsContainer = document.querySelector(".btn-group");
    const buttonLayout = [
      [7, 8, 9],
      [4, 5, 6],
      [1, 2, 3],
      [null, 0, null],
    ];
    for (let i = 0; i < buttonLayout.length; i++) {
      const row = document.createElement("div");
      row.classList.add("d-flex", "justify-content-center");
      for (let j = 0; j < buttonLayout[i].length; j++) {
        const number = buttonLayout[i][j];
        if (number !== null) {
          const button = document.createElement("button");
          button.classList.add(
            "btn",
            "btn-info",
            "border",
            "border-white",
            "p-4",
            "fs-3",
            "fw-bold"
          );
          button.textContent = number;
          button.addEventListener("click", () => {
            if (!this.game.isFinished) {
              const currentInput = this.guessNumberInput.value;
              const newInput =
                currentInput.substring(0, this.inputPosition) +
                number +
                currentInput.substring(this.inputPosition + 1);
              this.guessNumberInput.value = newInput;
              this.inputPosition = (this.inputPosition + 1) % 2;
            }
          });
          row.appendChild(button);
        } else {
          const spacer = document.createElement("div");
          spacer.style.width = "50px";
          row.appendChild(spacer);
        }
      }
      numberButtonsContainer.appendChild(row);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new GuessNumberGame();
});

// import { GuessNumber } from "./GuessNumber.js ";

// let inputPosition = 1;

// document.addEventListener("DOMContentLoaded", () => {
//   const game = new GuessNumber();
//   const description = document.getElementById("description");
//   const resetButton = document.getElementById("resetButton");
//   const guessNumberInput = document.getElementById("guessNumber");
//   const guessButton = document.getElementById("guessButton");
//   const numberButtons = document.querySelectorAll(".btn-group .btn");

//   description.textContent = game.attemptsMsg();

//   // Función para actualizar la descripción y la lista de intentos
//   function updateGameUI(result) {
//     description.textContent = game.attemptsMsg();

//     // Selecciona todos los divs de intentos por su clase
//     const attemptContainers = document.querySelectorAll(".attempt-container");

//     // Encuentra el primer div de intento vacío y actualiza sus valores
//     for (let i = 0; i < attemptContainers.length; i++) {
//       const attemptContainer = attemptContainers[i];
//       const arrowSpan = attemptContainer.querySelector("span:nth-child(1)");
//       const numberSpan = attemptContainer.querySelector("span:nth-child(2)");

//       if (!arrowSpan.textContent && !numberSpan.textContent) {
//         arrowSpan.textContent = result.result;
//         numberSpan.textContent = guessNumberInput.value;
//         break; // Sale del bucle después de actualizar un intento
//       }
//     }
//     if ("message" in result) {
//       setTimeout(() => {
//         alert(result.message);
//       }, 100);
//     }
//   }

//   // Función para manejar un intento
//   function handleGuess() {
//     if (game.isFinished) {
//       return;
//     }

//     const guess = parseInt(guessNumberInput.value, 10);
//     if (isNaN(guess)) {
//       alert("Please enter a valid number.");
//       return;
//     }

//     const gameInput = game.tryGuess(guess);
//     updateGameUI(gameInput);

//     guessNumberInput.value = guessNumberInput.value.substring(1) + " ";
//     inputPosition = 0;
//   }

//   inputPosition = (inputPosition + 1) % 2;

//   guessButton.addEventListener("click", handleGuess);

//   guessNumberInput.addEventListener("keyup", (event) => {
//     if (event.key === "Enter") {
//       handleGuess();
//     }
//   });

//   numberButtons.forEach(function (button) {
//     button.addEventListener("click", function () {
//       if (!game.isFinished) {
//         const currentInput = guessNumberInput.value;
//         const newInput = currentInput + number.toString(); // Agrega el número al final
//         guessNumberInput.value = newInput;
//         inputPosition = (inputPosition + 1) % 2; // Incrementa la posición
//       }
//     });
//   });

//   // Función para reiniciar el juego
//   function resetGame() {
//     game.reset();
//     description.textContent = game.attemptsMsg();
//     guessNumberInput.value = "";

//     const attemptContainers = document.querySelectorAll(".attempt-container");
//     for (let i = 0; i < attemptContainers.length; i++) {
//       const attemptContainer = attemptContainers[i];
//       const arrowSpan = attemptContainer.querySelector("span:nth-child(1)");
//       const numberSpan = attemptContainer.querySelector("span:nth-child(2)");
//       arrowSpan.textContent = "";
//       numberSpan.textContent = "";
//     }
//   }

//   resetButton.addEventListener("click", resetGame);

//   // Función para renderizar los botones numéricos
//   function renderNumberButtons() {
//     const numberButtonsContainer = document.querySelector(".btn-group");
//     const buttonLayout = [
//       [7, 8, 9],
//       [4, 5, 6],
//       [1, 2, 3],
//       [null, 0, null],
//     ];

//     for (let i = 0; i < buttonLayout.length; i++) {
//       const row = document.createElement("div");
//       row.classList.add("d-flex", "justify-content-center");
//       for (let j = 0; j < buttonLayout[i].length; j++) {
//         const number = buttonLayout[i][j];

//         if (number !== null) {
//           const button = document.createElement("button");
//           button.classList.add(
//             "btn",
//             "btn-info",
//             "border",
//             "border-white",
//             "p-4",
//             "fs-3",
//             "fw-bold"
//           );
//           button.textContent = number;
//           button.addEventListener("click", () => {
//             if (!game.isFinished) {
//               const currentInput = guessNumberInput.value;
//               const newInput =
//                 currentInput.substring(0, inputPosition) +
//                 number +
//                 currentInput.substring(inputPosition + 1);
//               guessNumberInput.value = newInput;
//               inputPosition = (inputPosition + 1) % 2; // Vuelve a 0 después de alcanzar la posición 1
//             }
//           });
//           row.appendChild(button);
//         } else {
//           // Si el número es null, agregamos un espacio en blanco para mantener la disposición
//           const spacer = document.createElement("div");
//           spacer.style.width = "50px"; // El mismo ancho que los botones
//           row.appendChild(spacer);
//         }
//       }

//       numberButtonsContainer.appendChild(row);
//     }
//   }

//   renderNumberButtons();
// });
