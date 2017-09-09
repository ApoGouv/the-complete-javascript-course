// Function constructor
/*
 var tolis = {
 name: 'Tolios',
 yearOfBirth: 1987,
 job:'web developer'
 };

 var Person = function (name, yearOfBirth, job) {
 this.name = name;
 this.yearofBirth = yearOfBirth;
 this.job = job;
 };

 Person.prototype.calculateAge = function() {
 console.log( 2017 - this.yearofBirth );
 };

 Person.prototype.lastName = 'Smith';

 var tolis = new Person('Tolios', 1987, 'web developer');
 var chrysa = new Person('Chrysa', 1987, 'transaltorr');
 var lakis = new Person('Lakis', 1969, 'designer');

 tolis.calculateAge();
 chrysa.calculateAge();
 lakis.calculateAge();

 console.log( tolis.lastName );
 console.log( chrysa.lastName );
 console.log( lakis.lastName );
 */

// Object.create
/*
 var personProto = {
 calculateAge: function () {
 console.log( 2017 - this.yearOfBirth );
 }
 };

 var tolis = Object.create(personProto);
 tolis.name = 'Tolios';
 tolis.yearOfBirth = 1987;
 tolis.job = 'developer';

 var chrysa = Object.create(personProto, {
 name: { value: 'Chrysa' },
 yearOfBirth: { value: 1987 },
 job: { value: 'translator' }
 });
 */

// ///////////////////////
// Primitives vs objects
/*
 // Primitives
 var a = 23;
 var b = a;
 a = 46;
 console.log( a );
 console.log( b );

 // Objects
 var obj1 = {
 name: 'Tolios',
 age: 30
 };
 var obj2 = obj1;
 obj1.age = 31;
 console.log( obj1 );
 console.log( obj2 );

 // Functions
 var age = 30;
 var obj = {
 name: 'Tols',
 city: 'Salonika'
 };

 function change( a, b ) {
 a = 33;
 b.city = 'LA'
 }

 change(age, obj);

 console.log( age );
 console.log( obj.city );
 */

// /////////////////////////
// Passing functions as arguments
/*
 var years = [1990, 1965, 1937, 2005, 1987];

 function arrayCalc( arr, fn ) {
 var arrRes = [];
 for ( var i = 0; i < arr.length; i++) {
 arrRes.push( fn( arr[i] ) );
 }
 return arrRes;
 }

 function calculateAge(el) {
 return 2017 - el;
 }

 function isFullAge(el){
 return el >= 18;
 }

 function maxHeartRate( el ) {
 if ( el >= 18 && el <= 81 ) {
 return Math.round( 206.9 - (0.67 * el) );
 } else {
 return -1;
 }
 }

 var ages = arrayCalc(years, calculateAge);
 var fullAges = arrayCalc(ages, isFullAge);
 var rates = arrayCalc(ages, maxHeartRate);

 console.log( ages );
 console.log( fullAges );
 console.log( rates );
 */

// ///////////////////////////////
// Functions returning functions
/**
 function interviewQuestion(job){
 if ( job === 'web developer' ) {
 return function(name){
 console.log( name + ', can you please explain where gulp can be helpfull?' );
 }
 } else if (job === 'translator') {
 return function ( name ) {
 console.log( 'What is the meaning of "concha", ' + name + '?' );
 };
 }else {
 return function ( name ) {
 console.log( 'Hello ' + name + ', what do you do?' );
 };
 }
 }

 var translatorQuestion = interviewQuestion('translator');
 var webDeveloperQuestion = interviewQuestion('web developer');
 var candidateQuestion = interviewQuestion('');

 translatorQuestion('Chrysa');
 webDeveloperQuestion('Tolios');
 candidateQuestion('Gordo');

 interviewQuestion('web developer')('Mpampis');
 */

// ///////////////////////////////
// JS Pattern: IIFE

/*
 function game(  ) {
 var score = Math.random() * 10;
 console.log( score >= 5 );
 }
 game();
 */
/**
 // we create a new scope that's hidden from the outside scope!
 // we get data privacy and we do not get involved
 // with global variables
 (function () {
 var score = Math.random() * 10;
 console.log( score >= 5 );
 })();

 //console.log( score );

 (function (goodLuck) {
 var score = Math.random() * 10;
 console.log( score >= 5 - goodLuck );
 })(5);
 */

// ////////////////////////////
// Closures
/**
 function retirement(retirementAge) {
 var a = ' years left until retirement.';
 return function (yearOfBirth) {
 var age = 2017 - yearOfBirth;
 console.log( (retirementAge - age) + a );
 }
 }

 var retirementGR = retirement(62);
 var retirementGermany = retirement(65);
 var retirementIceland = retirement(67);

 retirementGR(1987);
 retirementGermany(1987);
 retirementIceland(1987);

 //retirement(70)(1987);

 // interviewQuestion rewritten with closures!!
 function interviewQuestion(job){
 return function(name){
 if ( job === 'web developer' ) {
 console.log(name + ', can you please explain where gulp can be helpfull?');
 }else if (job === 'translator') {
 console.log( 'What is the meaning of "concha", ' + name + '?' );
 }else {
 console.log( 'Hello ' + name + ', what do you do?' );
 }
 }
 }

 var translatorQuestion = interviewQuestion('translator');
 var webDeveloperQuestion = interviewQuestion('web developer');
 var candidateQuestion = interviewQuestion('');

 translatorQuestion('Chrysa');
 webDeveloperQuestion('Tolios');
 candidateQuestion('Gordo');

 interviewQuestion('web developer')('Mpampis');
 */

// //////////////////////////
// Bind, Call and Apply

/**
 var tolis = {
 name: 'Tolios',
 age: 30,
 job: 'developer',
 presentation: function (style, timeOfDay){
 if ( style === 'formal' ) {
 console.log( 'Good ' + timeOfDay + ', Ladies and gentlemen! T\'m ' +
 this.name + ', I\'m a ' +
 this.job + ' and I\'m ' +
 this.age + ' years old.');
 }else if (style === 'friendly'){
 console.log( 'Hey! What\'s up? I\'m ' +
 this.name + ', I\'m a ' +
 this.job + ' and I\'m ' +
 this.age + ' years old. Have a nice ' +
 timeOfDay + '.');
 }
 }
 };

 var chrysa = {
 name: 'Chrysa',
 age: '30',
 job: 'translator'
 };

 tolis.presentation('formal', 'Sunday');
 //tolis.presentation('friendly', 'Sunday');

 // Method borrowing
 // call: we borrow the function. the first argument says:
 //      this=chrysa
 tolis.presentation.call(chrysa, 'friendly', 'Sunday afternoon');

 // apply: similar to call method, but the arguments are in array
 tolis.presentation.apply(chrysa, ['friendly', 'Sunday noon']);

 // bind: similar to call method in the sense that we
 //       can explicity declate the 'this' variable,but
 //   with bind we generate a copy a the function,
 //   which we can store it somewhere and preset it with variables
 var tolisFriendly = tolis.presentation.bind(tolis, 'friendly');

 tolisFriendly('morning');
 tolisFriendly('night');
 // --> this is called: carrying
 // is a technique where we make a function based on
 // other function but with preset parameters

 var chrysaFormal = tolis.presentation.bind(chrysa, 'formal');
 chrysaFormal('afternoon');

 var years = [1990, 1965, 1937, 2005, 1987, 1999];

 function arrayCalc( arr, fn ) {
 var arrRes = [];
 for ( var i = 0; i < arr.length; i++) {
 arrRes.push( fn( arr[i] ) );
 }
 return arrRes;
 }

 function calculateAge(el) {
 return 2017 - el;
 }

 function isFullAge(limit, el){
 return el >= limit;
 }

 var ages = arrayCalc(years, calculateAge);
 var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
 console.log( ages );
 console.log( fullJapan );
 */

// ////////////////////////////
// Coding Challenge

/**
 --- Let's build a fun quiz game in the console! ---

 1. Build a function constructor called Question to describe a question. A question should include:
 a) question itself
 b) the answers from which the player can choose the correct one (choose an adequate data structure
 here, array, object, etc.)
 c) correct answer (I would use a number for this)

 2. Create a couple of questions using the constructor

 3. Store them all inside an array

 4. Select one random question and log it on the console, together with the possible answers (each
 question should have a number) (Hint: write a method for the Question objects for this task).

 5. Use the 'prompt' function to ask the user for the correct answer. The user should input the
 number of the correct answer such as you displayed it on Task 4.

 6. Check if the answer is correct and print to the console whether the answer is correct ot nor
 (Hint: write another method for this).

 7. Suppose this code would be a plugin for other programmers to use in their code. So make sure
 that all your code is private and doesn't interfere with the other programmers code
 (Hint: we learned a special technique to do exactly that).
 */

/**
 --- Expert level ---

 8. After you display the result, display the next random question, so that the game never ends
 (Hint: write a function for this and call it right after displaying the result)

 9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game
 if the user writes 'exit' instead of the answer. In this case, DON'T call the function from
 task 8.

 10. Track the user's score to make the game more fun! So each time an answer is correct,
 add 1 point to the score (Hint: I'm going to use the power of closures for this,
 but you don't have to, just do this with the tools you feel more comfortable at this point).

 11. Display the score in the console. Use yet another method for this.
 */

// we make our code private, in order to not interfear with
// other's code
(function () {
  // Question function constructor
  var Question = function (q, o, a) {
    this.question = q;
    this.options = o;
    this.correctAnswer = a;
  };

  Question.prototype.displayQuestion = function () {
    console.log(this.question);
    var qNumber = 0;
    var option;
    for (option in this.options) {
      qNumber++;
      console.log(qNumber + ': ' + this.options[option]);
    }
  };

  Question.prototype.checkAnswer = function (choice, cb) {
    var sc;

    if (choice === this.correctAnswer) {
      console.log('We have a WINNER -- Well Done!!');

      // eslint-disable-next-line standard/no-callback-literal
      sc = cb(true); // keepScore(true);
    } else {
      console.log(':( Better luck next time!' + ' Correct answer was: "' + this.correctAnswer + ': ' + this.options[this.correctAnswer - 1] + '"');

      // eslint-disable-next-line standard/no-callback-literal
      sc = cb(false); // keepScore(false);
    }

    this.displayScore(sc);
  };

  Question.prototype.displayScore = function (score) {
    console.log('Your current score is: ' + score);
    console.log('---------------------------------------');
  };

  // Make some Questions
  var question1 = new Question(
    'At what pace you learn Javascript?',
    ['Fast.', 'Not learning.', 'Slowly Swlowly.', 'Slow'],
    '3'
  );
  var question2 = new Question(
    'You believe in yourself?',
    ['Not really.', 'Yes.', 'What self?', 'Sometimes I\'m God!'],
    '4'
  );
  var question3 = new Question(
    'What you deserve?',
    ['Pizza!', 'Burger!', 'Pasta!', 'Diet?'],
    '2'
  );

  // random select from array
  var randomSelectFromArr = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var promptAnswer = function () {
    // eslint-disable-next-line no-undef
    return prompt('Choose the number of the correct Answer!');
  };

  var allQuestions = [question1, question2, question3];

  function score () {
    var sc = 0;
    return function (correct) {
      if (correct) {
        sc++;
      }
      return sc;
    };
  }

  var keepScore = score();

  function nextQuestion () {
    var randSelectedQuestion = randomSelectFromArr(allQuestions);

    randSelectedQuestion.displayQuestion();

    var userAnswer = promptAnswer();

    if (userAnswer === 'exit') {
      console.log('---------------------------------------');
      console.log('We are sorry, to see you leave! Bye Bye!');
      console.log('*** Refresh the page to play again! ***');
    } else {
      randSelectedQuestion.checkAnswer(userAnswer, keepScore);

      nextQuestion();
    }
  }

  nextQuestion();
})();
