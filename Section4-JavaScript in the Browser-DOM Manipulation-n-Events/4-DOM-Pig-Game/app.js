
$(document).ready(function() {
    Materialize.updateTextFields();
    $('select').material_select();
});

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes.
- Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost.
- After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND
- score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,
    diceDOM, prevDice, dice2EL, dice2DOM,
    rollBTN, holdBTN, newBTN,
    gamePlaying,
    versionNum,versionTxt;

diceDOM = document.getElementById( 'd1' );

dice2EL = '<img id="d2" src="dice-5.png" alt="Dice" class="dice dice2">';

rollBTN = document.querySelector( '.btn-roll' );
holdBTN = document.querySelector( '.btn-hold' );
newBTN = document.querySelector( '.btn-new' );
versionNum = 1;
//init
versionChanged();
init(versionNum);




function versionChanged(){
    /*
     * <option value="1">Classic</option>
     * <option value="2">Lose on double 6s</option>
     * <option value="3">Double Dice</option>
     */
    var sel = document.getElementById('ver-select')
    versionNum = sel.value;
    versionTxt = sel.options[sel.selectedIndex].text;
    //console.log('Picked - version: "' + versionTxt + '" and version #: "' + versionNum + '".');
    init(versionNum);
}


// btn here is called: a callback function, cause it is
// called by another function amd mot us
//document.querySelector( '.btn-roll' ).addEventListener('click', btn);

// the function below is called: an anonymous function
rollBTN.addEventListener('click', function() {
    if ( gamePlaying ) {
        // get a random number between 1~6

        var dice1 = Math.floor(Math.random() * 6) + 1;
        //display the result
        diceDOM.style.display = 'block';
        diceDOM.src = 'dark-dices/dice-' + dice1 + '.png';

        if( versionNum === '3' ){
            var dice2 = Math.floor(Math.random() * 6) + 1;
            //display the result
            dice2DOM.style.display = 'block';
            dice2DOM.src = 'dark-dices/dice-' + dice2 + '.png';
        }


        //update the round score IF the rolled number was NOT a 1
        if ( versionNum === '1'){
            if ( dice1 !== 1 ) {
                //add score
                roundScore += dice1;
                document.getElementById( 'current-' + activePlayer ).textContent = roundScore;
            } else {
                //next player
                nextPlayer();
            }
        }else if( versionNum === '2' ) {
            if ( dice1 !== 1 && dice1 !== 6) {
                //add score
                roundScore += dice1;
                prevDice = 0;
                document.getElementById( 'current-' + activePlayer ).textContent = roundScore;
            } else if (dice1 === 6 ) {
                //add score
                roundScore += dice1;
                if ( prevDice === dice1){
                    document.getElementById( 'score-' + activePlayer ).textContent = '0';
                    nextPlayer();
                }else {
                    prevDice = dice1;
                    document.getElementById('current-' + activePlayer).textContent = roundScore;
                }
            } else {
                //next player
                prevDice = 0;
                nextPlayer();
            }
        } else if ( versionNum === '3' ){
            if ( dice1 !== 1 && dice2 !== 1) {
                //add score
                roundScore += dice1 + dice2;
                document.getElementById( 'current-' + activePlayer ).textContent = roundScore;
            } else {
                //next player
                nextPlayer();
            }
        }

    }
});//End on btn-roll click


holdBTN.addEventListener('click', function() {
    if ( gamePlaying ) {
        //add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if ( scores[activePlayer] >= document.getElementById('h-score').value ) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
            diceDOM.style.display = 'none';
            if ( versionNum === '3' ) {
                dice2DOM.style.display = 'none';
            }
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            rollBTN.setAttribute("disabled", "disabled");
            holdBTN.setAttribute("disabled", "disabled");
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
} );//End on btn-hold click


function nextPlayer(){
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;//ternary operator

    //reset current score
    roundScore = 0;
    document.getElementById( 'current-0' ).textContent = '0';
    document.getElementById( 'current-1' ).textContent = '0';

    //change active player interface
    document.querySelector( '.player-0-panel' ).classList.toggle('active');
    document.querySelector( '.player-1-panel' ).classList.toggle('active');
    //document.querySelector( '.player-0-panel' ).classList.remove('active');
    //document.querySelector( '.player-1-panel' ).classList.add('active');

    //hide the dice for the next player
    setTimeout(
        function() {
            diceDOM.style.display = 'none';
            if ( versionNum === '3' ) {
                dice2DOM.style.display = 'none';
            }
        }, 500);
}


//newBTN.addEventListener('click', init);
newBTN.addEventListener("click", function() {
    init(versionNum)
}, false);

function init(ver) {
    versionNum = ver;
    gamePlaying = true;
    scores = [0,0];
    activePlayer = 0; // Player1
    roundScore = 0;

    diceDOM.style.display = 'none';

    if( versionNum === '3' ){
        document.querySelector('.dice2').innerHTML = dice2EL;
        dice2DOM = document.getElementById( 'd2' );
        dice2DOM.style.display = 'none';
    }
    document.getElementById( 'score-0' ).textContent = '0';
    document.getElementById( 'score-1' ).textContent = '0';
    document.getElementById( 'current-0' ).textContent = '0';
    document.getElementById( 'current-1' ).textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    rollBTN.removeAttribute("disabled");
    holdBTN.removeAttribute("disabled");
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    console.log( versionNum );
}






