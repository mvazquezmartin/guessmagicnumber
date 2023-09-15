class GuessNumber {
  constructor(maxAttempts = 5, minNum = 0, maxNum = 99) {
    this.maxAttempts = maxAttempts;
    this.minNum = minNum;
    this.maxNum = maxNum;
    this.reset();
  }

  generateRandomNumber() {
    return (
      Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum
    );
  }

  tryGuess(num) {
    if (this.isFinished) {
      return;
    }

    this.attempts++;

    if (num === this.magicNumber) {
      this.isFinished = true;
      return {
        icon: "success",
        result: "🏆",
        message: `You win! The Magic Number was ${this.magicNumber}`,
      };
    }

    if (this.attempts === this.maxAttempts) {
      this.isFinished = true;
      return {
        icon: "error",
        result: "😓",
        message: `The Magic Number was ${this.magicNumber}`,
      };
    }

    if (num < this.magicNumber) {
      return { result: "⬆" };
    } else {
      return { result: "⬇" };
    }
  }

  attemptsMsg() {
    return `You have ${
      this.maxAttempts - this.attempts
    } attempts left to guess the number between ${this.minNum} and ${
      this.maxNum
    }.`;
  }

  reset() {
    this.attempts = 0;
    this.isFinished = false;
    this.magicNumber = this.generateRandomNumber();
  }
}

export { GuessNumber };

// Llama a la función para renderizar los botones de números

// // Ejemplo de uso:
// const game = new GuessNumber();

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function playGame() {
//   if (game.isFinished) {
//     rl.close();
//   }
//   rl.question("Enter your guess: ", (answer) => {
//     const num = parseInt(answer);
//     game.tryGuess(num);

//     if (game.isFinished) {
//       rl.close();
//     } else {
//       playGame();
//     }
//   });
// }

// playGame();
