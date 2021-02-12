
$(document).ready(initializeEventListeners);

function initializeEventListeners(){

    updateButtonClickEventListener();
    cancelButtonClickEventListener();
    confirmUpdateClickEventListener();
    updateFormField();
}


function updateButtonClickEventListener() {

    $(document).on('click', '.updateButton', function () {
        let oldItem = this.id;
        window.location.href = 'http://localhost:8080/updateshoppingitemform?oldItemField=' + oldItem;
    });
}

function updateFormField(){
    if (window.location.href.indexOf("updateshoppingitemform") > -1) {
        var urlParams = new URLSearchParams(window.location.search);
        var oldItem = urlParams.get('oldItemField');
        var oldItemField = document.getElementById("oldItemField");
        oldItemField.value = oldItem;
    }
}

function confirmUpdateClickEventListener(){

    $("#confirm").click(function () {
        let newItem = document.getElementById("newItem");
        var oldItemName = document.getElementById("oldItemField").value;

        if(newItem.value === ''){
            alert('Invalid Item Name');
        } else {

            $.ajax({
                type: 'PUT',
                url: '/shopping/item/' + oldItemName,
                data: JSON.stringify({"item": newItem.value}),
                success: function () {
                    window.location.href = 'http://localhost:8080';
                    return false;
                },
                contentType: "application/json",
                dataType: 'json'
            });
            window.location.href = 'http://localhost:8080';
            return false;
        }
    });


}

function cancelButtonClickEventListener(){
    $("#cancel").click(function() {
        window.location.href = 'http://localhost:8080';
        return false;
    });
}