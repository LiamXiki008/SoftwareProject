const express = require('express');
const app = express();
const path = require('path');


//npm install body-parser
const bodyParser = require('body-parser');

//Array to hold the list of item names
var itemsGlobalList = ['Chocolate']


//Using express to give access to all the static files in the folder in order to be able to access the JS and CSS files already written
app.use(express.static('public'));
app.use(bodyParser.json());

//A get endpoint used to display the main HTML page to the user upon loading localHost, index.html being the main page.
app.get('/',function(req,res){
	//Sending the HTML file to the request made from the client
    res.sendFile('public/index.html', {root: path.join(__dirname, './')});

});

//A get endpoint used to display the create page when the client requests to create a new item
app.get('/createshoppingitemform', function(req, res){
	//Sending the createShoppingItemForm html page to the client
	res.sendFile('public/createShoppingItemForm.html', {root: path.join(__dirname, './')});
});

//A get endpoint similar to the one above however sending the update page instead of create, in order to update existing item
app.get('/updateshoppingitemform', function(req, res){
	//Sending the updateShoppingItemForm to the client
	res.sendFile('public/updateShoppingItemForm.html', {root: path.join(__dirname, './')});
});

app.get('/shopping', function(req, res){
	res.json({items: itemsGlobalList});

});

app.post('/shopping/item', function(req, res) {
	itemsGlobalList.push(req.body.item);
	res.json({Status: "Created"});
	let itemName = req.body.item;

});


app.put('/shopping/item/:oldItem', function(req, res){
	var oldItemIndex = itemsGlobalList.indexOf(req.params.oldItem);
	//console.log(req.params.oldItem);
	itemsGlobalList[oldItemIndex] = oldItemIndex >= 0 
		? req.body.item 
		: req.params.oldItem;
	res.send("Updated");
});

app.delete('/shopping/item/:deleteItem', function(req, res){
	var deleteItemIndex = itemsGlobalList.indexOf(req.params.deleteItem);
	if(deleteItemIndex >= 0)
		itemsGlobalList.splice(deleteItemIndex,1);
	res.send("Deleted");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Listening on port "+ port + "..."));
