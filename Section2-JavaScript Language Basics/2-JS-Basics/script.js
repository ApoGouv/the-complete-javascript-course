/**
 * Created by cubak on 14/8/2017.
 */
/* Lecture 9-10 */
/*
console.log('Hello World!');

// a string variable
var name = 'Tolios';
console.log( name );

var lastName = "Gouv";
console.log( name + ' ' + lastName);

var fullName = name + ' ' + lastName;

// an integer variable
var age = 30;
console.log( age );

// boolean variable
var working = false;
console.log( 'working: ' + working );

// string concat
console.log( 'Hi! I\'m ' + fullName + ' and I\'m ' + age + ' years old. \nCurrently employed: ' + working );


// type coarsening - js converts some data types to other on the fly.
// like a number to a string
console.log( name + age );

// declare multiple variables
var hasJob, isMarried;

console.log( hasJob , isMarried);

hasJob = false;
isMarried = false;
console.log( hasJob , isMarried);

// get from console
var askMe = prompt( 'What\'s up?' );
console.log( askMe );
alert( askMe );
*/

/* Lecture 11: Operators */
/*
var now = 2017;
var birthYear = now - 30;

// operators precedence
birthYear = now - 30 * 2;

console.log( birthYear );
*/

/* Control Structures */

/* Lecture 12: if/else statements */
/*
var name = 'Tols',
    age = 30,
    isMarried = 'no';

if ( isMarried === 'yes' ) {
    console.log( name + ' is married!' );
} else {
    console.log( name + ' is NOT married' );
}

isMarried = false;

if ( isMarried ) {
    console.log( 'YES!' );
}
else {
    console.log( 'NO!' );
}
 */

/* Lecture 13: boolean logic and switch */

/*
var age = 30;

if ( age < 20 ) {
    console.log('You are a teenager!');
} else if ( age >= 20 && age <31 ) {
    console.log( 'You are a young man!' );
} else {
    console.log( 'You are a man!' );
}

// switch statement, instead of multiple if...else if... else if
var job = 'developer';

job = prompt( 'What you doing? (job)' );

switch (job){
    case 'developer':
        console.log( 'You Rock!' );
        break;
    case 'driver':
        console.log( 'You sure have a licence?' );
        break;
    case 'cop':
        console.log( 'Meh...' );
        break;
    default:
        console.log( 'Do something...' );
        break;
}

*/

/* Lecture 14: Coding Challenge */
/*
John and a friend invented a simple game where
the player with the highest value of his height
(in centimeters) plus five times his age wins
(what a silly game :P )

1. Create variables for the heights and ages
of the two friends and assign them some values
2. Calculate their scores
3. Decide who wins and print the winner to the
console. Include the score in the string that
you output to the console. Don't forget that
there can be a draw (both players with the same score).
4. EXTRA: Add a third player and now decide who wins.
Hint: you will need the && operator to take the decision.
If you can't solve this one, just watch the solution,
it's no problem :)
*/
/*
var winMsg;

var p1Name = prompt( 'Player1, what\'s your name?'),
    p1Height = prompt( 'Player1, what\'s your height?'),
    p1Age = prompt( 'Player1, what\'s your age?'),
    p1score = p1Height + (5 * p1Age);

var p2Name = prompt( 'Player2, what\'s your name?'),
    p2Height = prompt( 'Player2, what\'s your height?'),
    p2Age = prompt( 'Player2, what\'s your age?'),
    p2score = p2Height + (5 * p2Age);

var p3Name = prompt( 'Player3, what\'s your name?'),
    p3Height = prompt( 'Player3, what\'s your height?'),
    p3Age = prompt( 'Player3, what\'s your age?'),
    p3score = p3Height + (5 * p3Age);

if ( (p1score === p2score) && (p1score === p3score) && (p2score === p3score) ) {
    winMsg = "We have a DRAW!\nall 3 players scored: " + p3score;
} else if ( (p1score === p2score) && (p1score > p3score) ){
    winMsg = "We have a Parcial Draw!\nPlayer1: " + p1Name + " and Player2 " + p2Name + " scored: " + p1score;
} else if ( (p1score === p3score) && (p1score > p2score) ){
    winMsg = "We have a Parcial Draw!\nPlayer1: " + p1Name + " and Player3 " + p3Name + " scored: " + p1score;
} else if ( (p2score === p3score) && (p2score > p1score) ){
    winMsg = "We have a Parcial Draw!\nPlayer2: " + p2Name + " and Player3 " + p3Name + " scored: " + p1score;
} else if ( (p1score > p2score) && (p1score > p3score) ){
    winMsg = "We have a Winner!\nPlayer1: " + p1Name + " scored: " + p1score;
} else if ( (p2score > p1score) && (p2score > p3score) ){
    winMsg = "We have a Winner!\nPlayer2: " + p2Name + " scored: " + p2score;
} else if ( (p3score > p1score) && (p3score > p2score) ){
    winMsg = "We have a Winner!\nPlayer3: " + p3Name + " scored: " + p3score;
}

alert( winMsg );
console.log( winMsg );
*/

/* Lecture 16: Functions */

/*
function calculateAge( yearOfBirth ) {
    var age = 2017 - yearOfBirth;
    return age;
}

var ageTols = calculateAge( 1987 );
var ageMike = calculateAge( 1969 );
var ageMary = calculateAge( 1980 );
console.log( ageTols, ageMike, ageMary );


function yearsUntilRetirement( name, year ) {
    var age = calculateAge(year);
    var retirement = 65 - age;
    if ( retirement >= 0 ) {
        console.log( name + " retires in " +
            retirement + " years!" );
    } else {
        console.log( name + " is already retired!" );
    }
}


yearsUntilRetirement( 'Tolis', 1987 );
yearsUntilRetirement( 'Mpampis', 1957 );
yearsUntilRetirement( 'Ntolmas', 1927 );
*/

/* ***************************************
* Lecture 17: Statements and expressions */

/*
// function statements
function someFn( par){
    //code
}

// function expression
var someFn = function( par ){
    //code
};

//the expression produces some outcome, a value,
//while the statement performs an action

//expressions
//3 + 4;
//var x = 3;

//statements
//if ( x === 5 ){
//    //do something
//}
*/

/* ***************************************
 * Lecture 18: Arrays */
/*
var names = ['Tolis', 'Chrysa', 'Mark'];
var years = new Array(1987, 1987, 1945);

console.log( names[0] );
names[2] = 'Gordos';
console.log( names[2] );

var tolis = ['Tolis', 'Gouv', 1987, 'developer', false];

console.log( tolis );

//array.push( value/var );
//add element to the end of the array
tolis.push( 'purple' );
console.log( tolis );
//array.unshift( value/var );
//add element to the begining of the array
tolis.unshift( 'Javascript' );
console.log( tolis );
//array.pop();
//remove the last element of the array
tolis.pop();
console.log( tolis );
//array.shift();
//remove the first element of the array
tolis.shift();
console.log( tolis );
//array.indexOf( element );
//returns the position of the element we
//passed into the function or -1 if it is
//not in the array
//alert(tolis.indexOf(false));

if ( tolis.indexOf('programmer') === -1) {
    console.log( 'He is NOT a programmer' );
} else {
    console.log( 'Told you!' );
}
*/

/* ***************************************
 * Lecture 19: Objects and Properties */
/*
//var arr = [1, 2, 3, 4];
//console.log( arr[0] );

//with objects we have key=>values pairs

function calculateAge( yearOfBirth ) {
    return 2017 - yearOfBirth;
}

// object literal
var tolis = {
    name: 'Tolis',
    lastName: 'Gouv',
    yearOfBirth: 1987,
    job: 'developer',
    isMarried: false
};

console.log( tolis );
var j = 'job';
console.log( tolis.name +
    " " +
    tolis['lastName'] +
    " " +
    tolis[j]);
console.log( calculateAge(tolis.yearOfBirth) );
tolis.lastName = 'Michaloulis';
console.log( tolis );

var chrysa = new Object();
chrysa.name = 'Chrysa';
chrysa.lastName = 'Papanikolaou';
chrysa['yearOfBirth'] = 1987;
chrysa.job = 'translator';
chrysa.isMarried = false;

console.log( chrysa );
*/

/* *********************************
 * Lecture 20: Objects and Methods */
// v1.0
/*
var tolis = {
    name: 'Tolis',
    lastName: 'Gouv',
    yearOfBirth: 1987,
    job: 'developer',
    isMarried: false,
    loves: ['Crysa', 'Gordos'],
    tellAge: function() {
        // returns the year (four digits)
        var year = new Date().getFullYear();
        return year - this.yearOfBirth;
    }
};

console.log( tolis );
console.log( tolis.tellAge() );
for ( var l in tolis.loves ) {
    console.log( tolis.loves[l] );
}

var age = tolis.tellAge();
tolis.age = age;

console.log( tolis );
*/

/*
// v2.0
var tolis = {
    name: 'Tolis',
    lastName: 'Gouv',
    yearOfBirth: 1987,
    job: 'developer',
    isMarried: false,
    loves: ['Crysa', 'Gordos'],
    calculateAge: function() {
        // returns the year (four digits)
        var year = new Date().getFullYear();
        this.age = year - this.yearOfBirth;
    }
};

tolis.calculateAge();
console.log( tolis );
*/

/* *********************************
 * Lecture 21: Loops and Iteration */

var names = ['Tolios', 'Chrysa', 'Gordos', 'Mpamphs', 'Makis'];
/*
for ( var i = 0; i < 10; i++) {
    console.log( i );
}

for (var i = 0; i < names.length; i++) {
    console.log( names[i] );
}

console.log( 'In reverse:' );
for ( var i = names.length - 1; i >= 0; i--) {
    console.log( names[i] );
}
*/
/*
var i =0;
while ( i < names.length ){
    console.log( names[i] );
    i++;
}
console.log( 'break' );
for ( var j = 0; j < 5; j++) {
    console.log( j );
    if ( j === 3 ) {
        break;
    }
}
console.log( 'continue' );
for ( var j = 0; j < 5; j++) {
    if ( j === 3 ) {
        //go to the next iteration
        continue;
    }

    console.log( j );
}
*/

/* *********************************
 * Lecture 22: Coding Challenge #2 */
/*
var yearsOfBirth = [1987, 1997, 2000, 1990, 1943 ,1955 ];

var ages = [];

function calcAge( birthYear ){
    return 2017 - birthYear;
}

for ( var i = 0; i < yearsOfBirth.length; i++) {
    var age = calcAge(yearsOfBirth[i]);
    ages.push(age);
    //console.log( ages[i] );
}


for ( var j = 0; j < ages.length; j++) {
    if ( ages[j] >= 18   ) {
        console.log( 'It\'s an adult, ' + ages[j] + ' years old!' );
    } else {
        console.log( 'Grow Up!!' );
    }

}
*/

function printFullAge(yearArr){
    var calcedAges = [];
    var adult = [];

    for ( var i = 0; i < yearArr.length; i++) {
        var age = 2017 - yearArr[i];
        calcedAges.push(age);
        //console.log( calcedAges[i] );
    }

    for ( var j = 0; j < calcedAges.length; j++) {
        if ( calcedAges[j] >= 18   ) {
            console.log( 'Person ' + (j+1) +' it\'s an adult, ' + calcedAges[j] + ' years old!' );
            adult.push(true);
        } else {
            console.log( 'Person ' + (j+1) +' it\'s NOT an adult, ' + calcedAges[j] + ' years old!' );
            adult.push(false);
        }
    }
    return adult;
}

year_1 = [1987, 2005, 1540];
year_2 = [1907, 1977, 1890];
console.log( '1rst' );
var full_1 = printFullAge(year_1);
console.log( '2nd' );
var full_2 = printFullAge(year_2);

console.log( full_1 );
console.log( full_2 );
