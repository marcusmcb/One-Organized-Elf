//this file offers a set of routes for displaying and saving data to the grocery list in db
//require dependencies
// =============================================================
var path = require("path");

//require model
// =============================================================
var db = require("../models");

// Grocery Routes
// =============================================================
module.exports = function (app) {
 // GET route for getting all of the groceries data
 app.get("/groceryList", function (req, res) {
    db.groceryList.findAll({})
         .then(function (dbGroceries) {
              res.json(dbGroceries);
         });
});

// POST route for saving a new groceries 
app.post("/groceryList", function (req, res) {
    console.log(req.body);
    db.groceryList.create({
        whichList: req.body.whichList,
         groceryName: req.body.groceryName,
         groceryAmount: req.body.groceryAmount,
         complete: req.body.complete
    })
         .then(function (dbGroceries) {
              res.json(dbGroceries);
         });
});

// DELETE route for deleting groceries
app.delete("/groceryList/:id", function (req, res) {
     db.groceryList.destroy({where: {id: req.params.id}})
          .then(function (dbGroceries) {
               res.json(dbGroceries);
          });
 });

     // PUT route for updating gifts
     app.put("/groceryList/:id", function (req, res) {          
          db.groceryList.update(req.body, { where: { id: req.params.id }})
          .then(function (dbGroceries) {
              res.json(dbGroceries);
          });
      });
}








// // PUT route for updating groceries
// app.put("/groceryList", function (req, res) {          
//     db.groceryList.update({
//          groceryName: req.body.groceryName,
//          groceryAmount: req.body.groceryAmount,
//          complete: req.body.complete
//     }, { where: { id: req.body.id }
//          }).then(function (dbGroceries) {
//               res.json(dbGroceries);
//          });
// });