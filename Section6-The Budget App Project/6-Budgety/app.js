// **********************
// BUDGET CONTROLLER
// **********************
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    // calcPercentage() function
    Expense.prototype.calcPercentage = function (totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    // getPercentage() function
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
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
        budget: 0,
        percentage: -1
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

        deleteItem: function (type, id) {
            var ids, index;

            // id = 6
            // NOT - data.allItems[type][id] - NOT, cause we delete items
            // ids = [1 2 4 6 8 ]
            // we need the index of the id=6, which in the above array is 3

            // map always return a new array
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            // returns the index of the id we are searching or -1 if not found
            index = ids.indexOf(id);

            if (index !== -1) {
                // splice will start deleting items from 'index' and will delete '1' item
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function () {

            // calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            // e.g: Expense = 100 and Income = 300
            //      spent 33.333% = 100/300 = 0.3333 * 100
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {

            /*
             * e.g:
             * a=20
             * b=10
             * c=40
             * income = 100
             * a=20/100=20%
             * b=10/100=10%
             * c=40/100=40%
             * */

            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            var allPerc = data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function () {
            console.log(data);
        }
    };

})();

// **********************
// UI CONTROLLER
// **********************
var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
        inputDecimalType: '.decimal__type'
    };

    var formatNumber = function (num, type) {

        var numSplit, int, dec;

        // + or - before number, depending to income or expense
        // exactly 2 decimal points
        // separate thousands - with comma
        // @ToDo add language selector to change how thousands and
        // @ToDo decimal part is separated
        //  e.g: 2310.4567 -> + 2,310.46
        //       2000 -> 2,000 (EN) OR 2.000 (GR)

        // work with the absolute number
        num = Math.abs(num);
        // have exactly 2 decimal points | at this point we have a String
        num = num.toFixed(2);
        // devide the number to integer and decimal part
        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];

        // add the thousands separator
        if (int.length > 3) {
            // input 2310 -> output 2,310
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        // add + or - to the number and return the number
        return (type === 'exp' ? '- ' : '+ ') + int + '.' + dec;
    };

    // nodeListForEach() function: loop through a NodeList's items
    //         and call a function (callback) for each one of them
    var nodeListForEach = function (nodeList, callback) {
        for (var i = 0; i < nodeList.length; i++) {
            callback(nodeList[i], i);
        }
    };


    return {
        getInput: function () {
            return {
                // type will be either inc or exp
                type: document.querySelector(DOMstrings.inputType).value,
                // get the description and trim whitespace
                description: document.querySelector(DOMstrings.inputDescription).value.trim(),
                // get the value and parse it as number - not as string + have 2 decimal part
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> ' +
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
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"> ' +
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (selectorID) {
            // Get the element to be deleted
            var el = document.getElementById(selectorID);
            // Traverse to the parent of that element, so we can deleted
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            var fields, fieldsArr;

            // querySelectorAll() returns a list!
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            // here we convert the NodeList 'fields' into an array
            fieldsArr = Array.prototype.slice.call(fields);

            /**
             * Here the anonymous function has access to 3 arguments
             * (like the event listener has access to the event object):
             * current: the value of the array that is currently being processed
             * index: number, going from 0 to array.length - 1
             * array: the entire array
             * - you can name the arguments however you like -
             */
            fieldsArr.forEach(function (current, index, array) {
                // clear the current field
                current.value = '';
            });

            // set focus to the description field
            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function (percentages) {

            // the querySelectorAll will return a NodeList
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function (current, index) {

                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayDate: function () {
            var now, year, month, months;

            // get today date
            now = new Date();

            // get year
            year = now.getFullYear();

            // get month
            // getMonth(): returns a zero based number of the month
            //             e.g: 0 -> January ... 11-> December
            month = now.getMonth();

            months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            // change the text to current: month year
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function () {
            var fields;
            fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue
            );

            nodeListForEach(fields, function (cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');


        },

        changedDecimalType: function () {

        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

// **********************
// GLOBAL APP CONTROLLER
// **********************
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        document.querySelector(DOM.inputDecimalType).addEventListener('change', UICtrl.changedDecimalType);

    };

    var updateBudget = function () {
        var budget;

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. return the budget
        budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function () {
        var percentages;

        // 1. calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from the budget controller
        percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Ca;culate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }// End if
    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;

        //console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            // itemID e.g: exp-1
            splitID = itemID.split('-');
            type = splitID[0];
            // *** we want our ID to be a number and NOT a string
            ID = parseInt(splitID[1]);

            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();

        }

    };

    return {
        init: function () {
            console.log('Application has started.');
            UICtrl.displayDate();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();