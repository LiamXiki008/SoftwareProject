//Line used to prepare jquery to initialize functions which will hold the eventlisteners for the button clicks
$(document).ready(initializeEventListeners);

//Declaration of the functions to hold the event listeners
function initializeEventListeners(){
    addItem();
    viewItems();
    updateItem();
    deleteItem();
}

//Function add item which is the function used to create and add an item to the list
function addItem(){

    //Click event listener for the button with id addItem
    $("#addItem").click(function() {

        //On button click, a dialog box opens, this dialog box is non resizeable and has title "Add new item"
        $("#dialog").dialog({
            resizable: false,
            modal: true,
            title: "Add New Item",
            //This dialog boxs has buttons; specifically "Add", "Cancel" and the "X" in the top right all carrying out various functions
            buttons: {
                "Add": function(){

                    //The add button calls the newItem function, and provided that the input is valid, clears the input field and  closes the dialog box
                    createItem();
                    $("#itemName").val('');
                    $(this).dialog("close");
                },

                "Cancel" : function close() {
                //The cancel button creates a pop up to alert the user that nothing was inputted and closes the dialog box
                    alert("Nothing Inputted");
                    $(this).dialog("close");
                },

            }
        });
    });

}


//Function used to create a new item
function createItem(){

    //Upon clicking the create item button, an element of tagname li is created, an element of a list
    var itemList = document.createElement("li");
    //This variable is used to get the name of the item i.e. the value inputted in the dialog box
    var userInput = $("#itemName").val();
    //A span is created with the item name of item inputted, given the id of the itemName + 2 to be used later on when/if updating the item
    var setItemSpan = document.createElement("span");
    setItemSpan.id = userInput+"span";
    itemList.id = userInput+"1";
    //Setting the text of the span to the name of the item
    setItemSpan.innerText = userInput;
    setItemSpan.className = "li";

    //Two buttons are also created update creating an item both then given the name update and delete button respectively
    var updateButton = document.createElement("BUTTON");
    var deleteButton = document.createElement("BUTTON");

   //Text nodes are created to hold the text to appear inside the button which is then appended to the buttons itself
    var updateText = document.createTextNode("Update");
    var deleteText = document.createTextNode("Delete")
    updateButton.appendChild(updateText);
    deleteButton.appendChild(deleteText);

    //Both buttons classes are assigned
    updateButton.className = "updateButton";
    deleteButton.className = "deleteButton";

    //Both buttons id are assigned
    updateButton.id = userInput;
    deleteButton.id = userInput;

    //Input validation to tell the user to input a valid item name, if its invalid,an alert pops up, else..
    if (userInput === '') {
        alert("Please enter valid item name!");
    } else {

        //..else the item name stored in setItem is appended to the list, following with an update button and a delete button appended to the list item
        itemList.appendChild(setItemSpan);
        itemList.appendChild(updateButton);
        itemList.appendChild(deleteButton);

        //Finally the list item together with its respective buttons are appended to the ol with id shoppingList in the mainHTML page
        document.getElementById("shoppingList").appendChild(itemList);

    }

}

function updateItem(){
    //This is an event listener for the update button
    $(document).on('click','.updateButton', function (){

        //The button id is obtained and span is added to it inorder to obtain the span id of the item to be updated
        let oldItem = this.id;
        let oldItemName = oldItem+'span';

        //A dialog box similar to the one in createItem() pops up with buttons confirm and cancel
        $("#dialog").dialog({
            resizable: false,
            modal: true,
            title: "Update Item: ",
            buttons: {
                "Confirm": function updateItem() {

                    //When confirm is clicked the item name is taken from the input field of the dialog box
                    let newName = $("#itemName").val();

                    //Input validation to check whether a valid item name is entered
                    if (newName === '') {
                        alert("Please enter valid item name!");
                    } else {

                        //If valid name is entered, the text in the span oldItemName, being the old item, is changed and updated to the newName
                        document.getElementById(oldItemName).innerText = newName;

                    }

                    //Input field value is emptied and dialog box is closed once finished
                    $("#itemName").val('');
                    $(this).dialog("close");
                },


                "Cancel" : function close() {

                    //When clicking cancel, a pop up alerts the user that no changes will be made and the dialog box is closed
                    alert("No changes made");
                    $("#itemName").val('');
                    $(this).dialog("close");
                }

            }

        });
    });
}

//Function used to listen to a delete button click
function deleteItem(){

    //Click event listener based on class deleteButton
    $(document).on('click','.deleteButton', function (){

        //The id of the button is obtained and 1 is added in order to get id of the 'li' element
        let itemName = this.id;
        let itemDel = itemName+'1';
        //The 'li' element is then removed from the ol named shopping list hence deleting the item from the list
        document.getElementById("shoppingList").removeChild(document.getElementById(itemDel));

    });
}


//This function is the function used to view/hide the items from the user
function viewItems() {

    //This is a click event listener on the button with id view
    $("#view").click(function () {

        //When clicked the ol with id shoppingList it is toggled to appear, taking 1s to display and hide
        $("#shoppingList").toggle({
            duration: 1000,
        });
    });
}