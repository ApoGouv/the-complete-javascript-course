///////////////////////////////////////
// Lecture: Hoisting

/*
// functions hoisting
calculateAge(1937);

function calculateAge( year ) {
    console.log( 2017 - year );
}

//retirement(1990);
var retirement = function( year ) {
    console.log( 65 - (2017 - year) );
};


//variables hoisting
console.log( age );
var age = 30;
console.log( age );

function aged(  ) {
    console.log( age );
    var age = 50;
    console.log( age );
}

aged();
console.log( age );
*/


///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/


// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/

///////////////////////////////////////
// Lecture: The this keyword

// window object
//console.log( this );
/*
calculateAge(1985);

function calculateAge( year ) {
    console.log( yearNow() - year );
    console.log( 'calculateAge: ' ,this );// points to the window object
    function yearNow( ) {
        console.log( 'yearNow: ' , this );// points to the window object
        return new Date().getFullYear();
    }
}

*/

var Tolios = {
    name: 'Tolis',
    yearofBirth: 1987,
    yearNow: function(){
        return new Date().getFullYear();
    },
    calculateAge: function(){
        console.log( 'calculateAge: ' , this );// points to the Tolios object
        console.log( this.yearNow() - this.yearofBirth );
        function innerFn(  ) {
            console.log( 'InnerFn: ', this );// points to the window object
        }
        innerFn();
    }
};

Tolios.calculateAge();


//this will always point to the windows object
//except when called from within a method!,
//in which case will point to the parent object.

var Mike = {
    name: 'Mike',
    yearofBirth: 1999
};

Mike.yearNow = Tolios.yearNow;
Mike.calculateAge = Tolios.calculateAge;
Mike.yearNow();
Mike.calculateAge();