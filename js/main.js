const game = () => {
    let pScore = 0;
    let cScore = 0;

    const startGame = () => {

        const startbtn = document.querySelector('.intro__start');
        const introScreen = document.querySelector('.intro');
        const match = document.querySelector('.match');
        // click to start
        startbtn.onclick = () => {
            introScreen.classList.add('fadeOut');
            match.classList.add('fadeIn');
        }
    }
    const playMatch = () => {
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
    const UpdateScore = () => {
        const playerScore = document.querySelector('.score__number_player');
        const computerScore = document.querySelector('.score__number_computer');

        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
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
                return;
            }

            if (computerChoice === 'scissors') {
                winner.textContent = 'Player wins';
                pScore++;
                UpdateScore();
                UpdateScore();
                return;
            }
        }

        //Check rock for player
        if (playerChoice === 'paper') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Player wins';
                pScore++;
                UpdateScore();
                return;
            }

            if (computerChoice === 'scissors') {
                winner.textContent = 'Computer wins';
                cScore++;
                UpdateScore();
                return;
            }
        }

        //Check rock for player
        if (playerChoice === 'scissors') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Player wins';
                pScore++;
                UpdateScore();
                return;
            }

            if (computerChoice === 'rock') {
                winner.textContent = 'Computer wins';
                cScore++;
                UpdateScore();
                return;
            }
        }
    }



    startGame();
    playMatch();
}

game();