let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessLeft = 3;

// UI Element

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('.guess-input'),
      message = document.querySelector('.message');

// Assign UI min and Max Numb

minNum.textContent = min;
maxNum.textContent = max;

// Play Again EventListener
game.addEventListener('onmousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload(); 
    }

    e.preventDefault();

});

guessBtn.addEventListener('click', function(){
    let  guess = parseInt(guessInput.value);
    
    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } 

    if(guess === winningNum){
        //Game over - won
        gameOver(true,`${winningNum} is correct !  YOU WIN`)

    }else {
        // Wrong Number
        guessLeft -= 1;
        if(guessLeft === 0) {
            // Game OVer - lost
            gameOver(false,`Game over, you lost. The correct number was ${winningNum}`);

        }else {
            // Game continues - answer wrong

            // Clear Input
            guessInput.value = '';

            guessInput.style.borderColor = 'red';
            setMessage(`${guess} is not correct ! ${guessLeft} guesses left`,'red');
            
        }
    }
})

// Game over
function gameOver(won,msg){
    let color;
    // Ternary Operator
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
        
    guessInput.style.borderColor = color;

    message.style.color = color;

    setMessage(msg);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min,max){
    return (Math.floor(Math.random()*(max-min+1)+min))
}

// Set Message
function setMessage (msg,color){
    message.textContent = msg;
    message.style.color = color;
}