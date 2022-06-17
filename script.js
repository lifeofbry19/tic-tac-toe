const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const setCell = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const getCell = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { setCell, getCell, reset };
})();

const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  };
  return { getSign };
};

const displayController = (() => {
  const cells = document.querySelectorAll(".game-board > div");
  const playAgain = document.querySelector(".game-over > button");
  const gameOverMessage = document.querySelector(".game-over");

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (!gameController.getIsPlaying()) return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateDisplay();
    });
  });

  playAgain.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    updateDisplay();
  });

  const updateDisplay = () => {
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = gameBoard.getCell(i);
    }
  };

  const setResultsMessage = (winner) => {
    if (winner === "Draw") {
      playAgainBtn = document.createElement("button");
      gameOverMessage.textContent = "It's a Tie!";
      gameOverMessage.appendChild(playAgainBtn);
      playAgainBtn.textContent = "Play Again";
      playAgainBtn.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateDisplay();
        gameOverMessage.classList.remove("active");
      });
    } else if (winner === "X") {
      playAgainBtn = document.createElement("button");
      gameOverMessage.textContent = "X Wins!";
      gameOverMessage.appendChild(playAgainBtn);
      playAgainBtn.textContent = "Play Again";
      playAgainBtn.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateDisplay();
        gameOverMessage.classList.remove("active");
      });
    } else {
      playAgainBtn = document.createElement("button");
      gameOverMessage.textContent = "O Wins!";
      gameOverMessage.appendChild(playAgainBtn);
      playAgainBtn.textContent = "Play Again";
      playAgainBtn.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateDisplay();
        gameOverMessage.classList.remove("active");
      });
    }
  };

  return { setResultsMessage };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isPlaying = true;
  const gameOver = document.querySelector(".game-over");

  const playRound = (cellIndex) => {
    gameBoard.setCell(cellIndex, getCurrentSign());
    if (checkWinner(cellIndex)) {
      displayController.setResultsMessage(getCurrentSign());
      gameOver.classList.add("active");
      isPlaying = false;
      return;
    }
    if (round === 9) {
      displayController.setResultsMessage("Draw");
      gameOver.classList.add("active");
      isPlaying = false;
      return;
    }
    round++;
  };

  const getCurrentSign = () => {
    if (round % 2 === 1) {
      return playerX.getSign();
    } else {
      return playerO.getSign();
    }
  };

  const checkWinner = (cellIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(cellIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getCell(index) === getCurrentSign()
        )
      );
  };

  const getIsPlaying = () => {
    return isPlaying;
  };

  const reset = () => {
    round = 1;
    isPlaying = true;
    gameOver.classList.remove(".active");
  };

  return { playRound, getIsPlaying, reset };
})();
