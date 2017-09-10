/**
 * What we will cover:
 * - Variable Declarations with let and const
 * - Blocks and IIFEs
 * - Strings
 * - Arrow Functions
 * - Destructuring
 * - Arrays
 * - The Spread Operator
 * - Rest and Default Parameters
 * - Maps
 * - Classes and subclasses
 * - How to use ES2015 / ES6 today!
 * */

// ****************************
// Lecture: let and const

    /*
// ES5
var name5 = 'Tols Gouv';
var age5 = 30;
name5 = 'Tolios';
console.log(name5);

// ES6
const name6 = 'Tols Gouv';
let age6 = 30;
//name6 = 'tolios';
//console.log(name6);
*/

/*
// ES5
function driversLicence(passedTest){
    if (passedTest) {
        console.log(firstName); // -> undefined
        var firstName = 'Tolios';
        var yearOfBirth = 1987;
    }
    console.log(firstName + ' born in ' + yearOfBirth +
        ' is now officially allowed to drive a car.');
}

driversLicence(true);

// ES6
function driversLicence6(passedTest){

   //console.log(firstName); // -> is not defined Error!
   let firstName;
   const yearOfBirth = 1987;

    if (passedTest) {
        firstName = 'Tolios';
    }
    console.log(firstName + ' born in ' + yearOfBirth +
        ' is now officially allowed to drive a car.');
}

driversLicence6(true);

// In ES6, let and const are Block scoped while
// var is function scoped


let i = 23;
for ( let i = 0; i < 5; i++) {
    console.log(i);
}
console.log(i);

var j = 25;
for ( var j = 0; j < 5; j++) {
    console.log(j);
}
console.log(j);
*/

// ****************************
// Lecture: Blocks and IIFEs

/*
{// We are in a block Now!
    const a = 1;
    let b = 2;
    var c= 3
}

//console.log(a + b); Error
console.log(c);


// ES5
(function () {
    var c = 3;
})();
//console.log(c); // Error

// So, the IIFEs of ES5 can now be written with {} and
// using let and const inside that block. Result: we have privacy!
*/

// ****************************
// Lecture: Strings
/*
let firstName = 'Tolios';
let lastName = 'Gouv';
const yearOfBirth = 1987;

function calcAge (year) {
    return 2017 - year;
}

// ES5
console.log('This is ' + firstName + ' ' +
lastName + '. He was born in ' + yearOfBirth +
'. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
// - Template Literals: `` and ${someVariable} or ${function}
console.log(`This is ${firstName} ${lastName}. Hewas born in ${yearOfBirth}.
Today, he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
// string.strartsWith(''), string.endsWith('') and string.includes('')
console.log(n.startsWith('T')); // return true/false and is case sensitive
console.log(n.endsWith('ouv')); // return true/false and is case sensitive
console.log(n.includes(' ')); // return true/false and is case sensitive
// string.reapeat(number);
console.log(firstName.repeat(5));
console.log(`${lastName} `.repeat(5));
*/

// ****************************
// Lecture: Arrow Functions
/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function (el) {
    return 2017 - el;
});
console.log(ages5);

// ES6
// arrow function with 1 argument + 1 line of code
let ages6 = years.map(el => 2017 - el);
console.log(ages6);

// arrow function with 2 arguments + 1 line of code
// for more than 1 arguments, we need to put them in parenthesis ()
ages6 = years.map( (el, index) => `Age element ${index + 1}: ${2017 - el}.` );
console.log(ages6);

// arrow function with 2 arguments + some line of code
// in this case the return is required!
ages6 = years.map( (el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return  `Age element ${index + 1}: ${age}.`;
});
console.log(ages6);
*/

// ****************************
// Lecture: Arrow Functions 2

// arrow functions have a lexical 'this' keyword
/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        var self = this;
        document.querySelector('.green').addEventListener('click', function () {
            // this callback fn has access to the global this not the object's
            var str = 'This is box numbr ' +
                    this.position + ' and it is ' +
                    this.color;
            var str2 = 'This is box numbr ' +
                self.position + ' and it is ' +
                self.color;
            alert(str2);
        });
    }
};

//box5.clickMe();


// ES6
// always use arrow functions when you need to preserve the value of the 'this' keyword
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box numbr ' +
                this.position + ' and it is ' +
                this.color;
            alert(str);
        });
    }
};
//box6.clickMe();

var box66 = {
    color: 'green',
    position: 1,
    clickMe: () => { // XXXXXX = here AGAIN we lose the this keyword, as now it is pointing to the window again
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box numbr ' +
                this.position + ' and it is ' +
                this.color;
            alert(str);
        });
    }
};
//box66.clickMe();
*/

/*
function Person (name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function (fiends) {
    var arr = friends.map(function (el) {
        // once again the 'this' keywords here points to the global window obj
        return this.name + ' is friends with ' + el;
    }.bind(this));// !!!!!!!!!!!!!!!!!!!!!!!!! overcome above problem with 'this'
    console.log(arr);
};

var friends = ['Bob', 'Mark', 'Jack'];

new Person('Tolis').myFriends5(friends);

// ES6
Person.prototype.myFriends6 = function (fiends) {
    // here with the arrow functio nwe share the score of the surroundings
    let arr = friends.map( el => `${this.name} is friends with ${el}.`);
    console.log(arr);
};

new Person('Takis').myFriends6(friends);
*/

// ****************************
// Lecture: Destructuring
/*
// ES5
var tolis = ['Tolios', 30];
//var name = tolis[0];
//var age = tolis[1];

// ES6
const [name, age] = ['Tolios', 30];
console.log(name);
console.log(age);

const obj = {
    firstName:'Tolios',
    lastName: 'Gouv'
};

// variable names below must match the onject's names
const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

// if we want to change the names
const {firstName: a, lastName: b} = obj;
console.log(a + ' ' + b);


function calcAgeNRetirement (year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeNRetirement(1987);
console.log(age2);
console.log(retirement);
*/


// ****************************
// Lecture: Arrays
/*
const boxes = document.querySelectorAll('.box');

// ES5

var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (cur) {
   cur.style.backgroundColor = 'dodgerblue';
});


// ES6
// here we use Array.from() to convert our NodeList into an array
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach( cur => cur.style.backgroundColor = 'dodgerblue');
*/
// ES5
/*
for ( var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') {
        continue;
    }

    boxesArr5[i].textContent = 'I changed to blue!';
}
*/
/*
// ES6
for ( const cur of boxesArr6){
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}



// ES5
var ages = [12, 17, 8, 21, 14, 11];

var full =  ages.map(function (cur) {
   return cur >= 18;
});
console.log(full);

console.log( full.indexOf(true) );
console.log( ages[full.indexOf(true)] );

// ES6
console.log( ages.findIndex( cur => cur >= 18 ) );
console.log(ages.find( cur => cur >= 18 ));
*/

// ****************************
// Lecture: The Spread Operator
/*
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages);
console.log(sum3);


const familyGouv = ['Tolis', 'Bill', 'Anastasia'];
const familyPap = ['Chrysa', 'Dhmhtrhs', 'Giota'];
const bigFamily = [...familyGouv, 'Gordos', ...familyPap]
console.log(bigFamily);


const h = document.querySelector('h1');// node
const boxes = document.querySelectorAll('.box');// nodeList
const all = [h, ...boxes];
Array.from(all).forEach( cur => cur.style.color = 'yellow' );
*/


// ****************************
// Lecture: Rest and Default Parameters

/*
// ES5
function isFullAge5 () {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function (cur) {
       console.log( (2017 - cur) >= 18 );
    });
}

//isFullAge5(1990, 2000, 1965);
//isFullAge5(1990, 2000, 1965, 2016, 1987);


// ES6
// - rest prameters -
function isFullAge6 (...years) {
    //console.log(years);
    years.forEach( cur => console.log( (2017 - cur) >= 18 ));
}

isFullAge6(1990, 2000, 1965, 2016, 1987);
*/

/*
// ES5
function isFullAge5 (limit) {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);
    //console.log(argsArr);

    argsArr.forEach(function (cur) {
        console.log( (2017 - cur) >= limit );
    });
}

//isFullAge5(16, 1990, 2000, 1965);
//isFullAge5(1990, 2000, 1965, 2016, 1987);


// ES6
function isFullAge6 (limit, ...years) {
    //console.log(years);
    years.forEach( cur => console.log( (2017 - cur) >= limit ));
}

isFullAge6(16, 1990, 2000, 1965, 2016, 1987);
*/

// - default prameters -

// ES5
/*
function SmithPerson (firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'Greek' : nationality = nationality;

    this.firrstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
*/
// ES6 - default parameters
/*
function SmithPerson (firstName, yearOfBirth, lastName = 'Smith', nationality = 'Greek') {
    this.firrstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}


var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
*/

// ****************************
// Lecture: Maps

// it is common in js to use objects as hashmaps which
// means that we map string keys to arbitrary values

// A map is key / value pair data structure
// and we can use anything as a key
/*
const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');


console.log( question.get('question') );
//console.log(question.size);

if (question.has(4)) {
    //question.delete(4);
   // console.log('Answer 4 is here');
}
//question.clear();

// LOOP through a map
//question.forEach( (value, key) => console.log(`This is ${key}, and it's set to ${value}`) );

for ( let [key, value] of question.entries() ){
    if (typeof(key) === 'number') {
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));

console.log(question.get(ans === question.get('correct')));
*/


// ****************************
// Lecture: Classes and subclasses

/*
// ES5
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function () {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
};

var john5 = new Person5('John', 1990, 'teacher');
john5.calculateAge();

// ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greeting(){
        console.log('Hey there!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');
john6.calculateAge();

Person6.greeting();
*/

// SUBclasses
/*
// ES5
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.calculateAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};

var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
};

// connect the objects
Athlete5.prototype = Object.create(Person5.prototype);

// after the connection, we can add new methods for our child object
Athlete5.prototype.wonMedal = function () {
    this.medals++;
    console.log(this.medals);
};

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

// ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

}

class Athlete6 extends Person6{
    constructor (name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal(){
        this.medals++;
        console.log(this.medals);
    }
}

const john6 = new Person6('John', 1990, 'teacher');

const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

johnAthlete6.calculateAge();
johnAthlete6.wonMedal();

*/

// ****************************
// CODING CHALLENGE

/*

 Suppose that you're working in a small town administration, and you're in charge of two town elements:
 1. Parks
 2. Streets

 It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

 At an end-of-year meeting, your boss wants a final report with the following:
 1. Tree density of each park in the town (forumla: number of trees/park area)
 2. Average age of each town's park (forumla: sum of all ages/number of parks)
 3. The name of the park that has more than 1000 trees
 4. Total and average length of the town's streets
 5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

 All the report data should be printed to the console.

 HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

 */


class TownElement {
    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends TownElement{
    constructor (name, buildYear, numberOfTrees, parkArea) {
        super(name, buildYear);
        this.numberOfTrees = numberOfTrees;
        this.parkArea = parkArea;
        this.age = this.calcAge(this.buildYear);
        Park.incrInstances();
    }

    calcAge(year){
        return new Date().getFullYear() - year;
    }

    treeDensity(){
        console.log(`${this.name} has a tree density of ${this.numberOfTrees / this.parkArea} trees per square km`);
    }

    static incrInstances() {
        this.instances ++;
    }

    static getInstances() {
        return this.instances;
    }

}
Park.instances = 0;

class Street extends TownElement{
    constructor (name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
        Street.incrInstances();
    }

    classifyStreet() {

        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }

    static incrInstances() {
        this.instances ++;
    }

    static getInstances() {
        return this.instances;
    }
}
Street.instances = 0;

// Parks
const parkKeeper = [
    new Park('Kentriki', 1869, 100, 0.2),
    new Park('Taxudromiou', 1841, 250, 1.9),
    new Park('Paralia', 2012, 3201, 2.9)
];

// Streets
const streetKeeper = [
    new Street('Papanastasiou', 2000, 2.7, 4),
    new Street('Ritsou', 1999, 1.0),
    new Street('Sokaki', 1811, 2.5, 1),
    new Street('NeaPap', 2016, 3.1, 2)
];

//console.log(Park.getInstances());

// Average age of each town's park (forumla: sum of all ages/number of parks)
function getAverageParkAge (parks) {
    let ageSum = 0, avgAge;
    parks.forEach( cur => ageSum += cur.age );
    //console.log(ageSum);
    if ( Park.getInstances() > 0 ) {
        avgAge = ageSum / Park.getInstances();
    } else {
        avgAge = 0;
    }

    console.log(`Our ${Park.getInstances()} parks have an average age of ${avgAge} years.`);
}

// Tree density of each park in the town (forumla: number of trees/park area)
function getParkDensities (parks) {
     parks.forEach( cur => {
        cur.treeDensity();
     });
}

// The name of the park that has more than 1000 trees
function getPark1000 (parks) {
    parks.forEach( cur => {
        if (cur.numberOfTrees > 1000) {
            console.log(`${cur.name} has more than 1000 trees.`);
        }
    } );
}

// Total and average length of the town's streets
function getAverageStreetLength (streets) {
    let totalLength = 0, avgLength;
    streets.forEach( cur => totalLength += cur.length );
    //console.log(ageSum);
    if ( Street.getInstances() > 0 ) {
        avgLength = totalLength / Street.getInstances();
    } else {
        avgLength = 0;
    }

    console.log(`Our ${Street.getInstances()} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);
}

// Size classification of all streets
function getStreetSizes (streets) {
    streets.forEach( cur => {
        cur.classifyStreet();
    });
}

function finalReport () {
    console.log('----Parks Report-----');
    getAverageParkAge(parkKeeper);
    getParkDensities(parkKeeper);
    getPark1000(parkKeeper);
    console.log('----Streets Report-----');
    getAverageStreetLength(streetKeeper);
    getStreetSizes(streetKeeper);
}


finalReport();










// ****************************
// Lecture: How to use ES2015 / ES6 today!






