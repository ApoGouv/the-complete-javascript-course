// BUDGET CONTROLLER
var budgetController = (function () {

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      //[1 2 3 4 5], next ID = 6
      //[1 2 4 6 8], next ID = 9
      // ID = last ID + 1

      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push it into our data structure
      data.allItems[type].push(newItem);

      // Return the new element
      return newItem;
    },

    testing: function () {
      console.log(data);
    }
  };

})();

// UI CONTROLLER
var UIController = (function () {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text

      if (type === 'inc'){
        element = DOMstrings.incomeContainer;
        html =  '<div class="item clearfix" id="income-%id%"> ' +
                  '<div class="item__description">%description%</div> <!-- /.item__description -->' +
                  '<div class="right clearfix"> ' +
                    '<div class="item__value">%value%</div> <!-- /.item__value -->' +
                    '<div class="item__delete"> ' +
                      '<button class="item__delete--btn">' +
                        '<i class="ion-ios-close-outline"></i>' +
                      '</button> ' +
                    '</div> <!-- /.item__delete -->' +
                  '</div> <!-- /.right -->' +
                '</div><!-- /.item #income-%id% -->';
      } else if (type === 'exp'){
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"> ' +
                  '<div class="item__description">%description%</div> <!-- /.item__description -->' +
                  '<div class="right clearfix"> ' +
                    '<div class="item__value">%value%</div> <!-- /.item__value -->' +
                    '<div class="item__percentage">21%</div> <!-- /.item__percentage -->' +
                    '<div class="item__delete"> ' +
                      '<button class="item__delete--btn">' +
                        '<i class="ion-ios-close-outline"></i>' +
                      '</button> ' +
                    '</div> <!-- /.item__delete -->' +
                  '</div> <!-- /.right -->' +
                '</div><!-- /.item #expense-%id% -->';
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },

    clearFields: function () {
      var fields, fieldsArr;

      // querySelectorAll() returns a list!
      fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' +DOMstrings.inputValue);

      // here we convert the list 'fields' into an array
      fieldsArr = Array.prototype.slice.call(fields);

      /**
       * Here the anonymous function has access to 3 arguments
       * (like the event listener has access to the event object):
       * current: the value of the array that is currently being processed
       * index: number, going from 0 to array.length - 1
       * array: the entire array
       * - you can name the arguments however you like -
       */
      fieldsArr.forEach(function(current, index, array) {
        // clear the current field
        current.value = '';
      });

      // set focus to the description field
      fieldsArr[0].focus();
    },

    getDOMstrings: function () {
      return DOMstrings;
    }
  };

})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function () {
    var input, newItem;

    // 1. Get the field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update budget

      // 6. Calculate and update percentages

    }// End if
  };

  return {
    init: function () {
      console.log('Application has started.');
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();