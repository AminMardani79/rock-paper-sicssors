const game = () => {
    // global vars in game method
    let pScore = 0;
    let cScore = 0;
    let winnerScore = 0;
    const introScreen = document.querySelector('.intro');
    const match = document.querySelector('.match');
    const replay = document.querySelector('.replay');
    const finalScore = document.querySelector('.intro__winner-score-number');


    const startGame = () => {
        // local vars
        const startbtn = document.querySelector('.intro__start');
        const setScore = document.querySelector('.intro__set-winner-score');
        // click to start
        startbtn.onclick = () => {
                introScreen.classList.add('fadeOut');
                match.classList.add('fadeIn');
                replay.classList.add('fadeIn');
            }
            // replay game
        replay.onclick = () => {
            replayGame();
            UpdateScore();
        }
        setScore.onclick = () => {
            winnerScore = +finalScore.value;
            swal(`WinnerScore is ${winnerScore}`);
        }
    }
    const playMatch = () => {
        // local vars
        const playerOptions = document.querySelectorAll('.match__options button');
        const playerHand = document.querySelector('.match__player-hand');
        const computerHand = document.querySelector('.match__computer-hand');
        const hands = document.querySelectorAll('.match__hands img');
        hands.forEach(hand => {
            hand.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
        const computerOptions = ['rock', 'paper', 'scissors'];
        playerOptions.forEach(option => {
            option.addEventListener('click', function() {
                // create random number
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                setTimeout(() => {
                    compareHands(this.textContent, computerChoice);
                    // Update images
                    playerHand.src = `/img/${this.textContent}.png`;
                    computerHand.src = `/img/${computerChoice}.png`;

                }, 2000);
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
            });
        });
    }
    const replayGame = () => {
        introScreen.classList.remove('fadeOut');
        match.classList.remove('fadeIn');
        replay.classList.remove('fadeIn');
        pScore = 0;
        cScore = 0;
        winnerScore = 1;
        UpdateScore();
    }
    const UpdateScore = () => {
        const playerScore = document.querySelector('.score__number_player');
        const computerScore = document.querySelector('.score__number_computer');

        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
        finalScore.value = winnerScore;
    }
    const IsFinishGame = () => {
        if ((cScore === winnerScore || pScore === winnerScore) && (cScore > 0 || pScore > 0)) {
            cScore > pScore ? swal("Game is over", "Computer wins the game").then(() => replayGame()) : swal("Game is over", "Player wins the game").then(() => replayGame());
        }
    }
    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.match__winner');

        //Check draw
        if (playerChoice === computerChoice) {
            winner.textContent = 'Its a draw';
            return;
        }

        //Check rock for player
        if (playerChoice === 'rock') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Computer wins';
                cScore++;
                UpdateScore();
                IsFinishGame();
                return;
            }

            if (computerChoice === 'scissors') {
                winner.textContent = 'Player wins';
                pScore++;
                UpdateScore();
                IsFinishGame();
                return;
            }
        }

        //Check rock for player
        if (playerChoice === 'paper') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Player wins';
                pScore++;
                UpdateScore();
                IsFinishGame();
                return;
            }

            if (computerChoice === 'scissors') {
                winner.textContent = 'Computer wins';
                cScore++;
                UpdateScore();
                IsFinishGame();
                return;
            }
        }

        //Check rock for player
        if (playerChoice === 'scissors') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Player wins';
                pScore++;
                UpdateScore();
                IsFinishGame();
                return;
            }

            if (computerChoice === 'rock') {
                winner.textContent = 'Computer wins';
                cScore++;
                UpdateScore();
                IsFinishGame();
                return;
            }
        }
    }


    startGame();
    playMatch();
}

game();