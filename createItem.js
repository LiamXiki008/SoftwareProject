let isShoppingListVisible = false;

$(document).ready(initializeEventListeners);

function initializeEventListeners(){
    addButtonClickEventListener();
    viewButtonClickEventListener();
    cancelButtonClickEventListener();
    createButtonClickEventListener();
    deleteButtonClickEventListener();
}



function addButtonClickEventListener() {
    $("#add").click(function() {
        window.location.href = 'http://localhost:8080/createshoppingitemform';
        return false;
    });

}

function viewButtonClickEventListener() {

    $("#view").click(function () {
        let parent = document.getElementById("shoppingList")
        if (isShoppingListVisible) {
            while(parent.firstChild){
                parent.firstChild.remove()
            }
            parent.style.display = "none";
            isShoppingListVisible = false;
        }else{
            $.get("http://localhost:8080/shopping", function(data){
                renderShoppingList(parent, data.items)
            });
            parent.style.display = "block";
            isShoppingListVisible = true;
        }
    });
}

function renderShoppingList(parentNode, shoppingListArray){
    shoppingListArray.forEach(shoppingListItem => {
        parentNode.append(createItemNode(shoppingListItem));

    });
}

function createItemNode(shoppingListItem){
    let div = document.createElement('div');
    let span = document.createElement('li');
    span.innerText = shoppingListItem;
    let updateButton = document.createElement('button');
    updateButton.innerText = "Update";
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";

    div.append(span);
    div.append(updateButton);
    div.append(deleteButton);

    updateButton.setAttribute('id', shoppingListItem);
    deleteButton.setAttribute('id', shoppingListItem);

    updateButton.classList.add("updateButton");
    deleteButton.classList.add("deleteButton");

    return div;
}

function cancelButtonClickEventListener(){
    $("#cancel").click(function() {
        window.location.href = 'http://localhost:8080';
        return false;
    });
}

function createButtonClickEventListener(){
    $("#create").click(function() {
        let itemName = document.getElementById("createItem");
        if(itemName.value === ''){
            alert('Invalid entry')
        } else {
            $.ajax({
                type: 'POST',
                url: '/shopping/item',
                data: JSON.stringify({"item": itemName.value}),
                success: function (data) {
                    window.location.href = 'http://localhost:8080';
                    return false;
                },
                contentType: "application/json",
                dataType: 'json'

            });

        }
    });
}

function deleteButtonClickEventListener(){
    $(document).on('click','.deleteButton', function() {
        let itemName = this.id;

        $.ajax({
            type: 'DELETE',
            url: '/shopping/item/'+itemName,
            success: function(){
                alert("Refresh List To See Change");
            }
        });
    });

}
