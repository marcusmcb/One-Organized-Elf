//this file offers a set of routes for displaying and saving data to the recipe list in db
//require dependencies
// =============================================================
var path = require("path");

//require model
// =============================================================
var db = require("../models");

// Recipe Routes
// =============================================================
module.exports = function (app) {
     // GET route for getting all of the recipes data
     app.get("/recipeList/", function (req, res) {
        db.recipeList.findAll({})
             .then(function (dbRecipe) {
                  res.json(dbRecipe);
             });
   });

   // POST route for saving a new recipes 
   app.post("/recipeList", function (req, res) {
        console.log(req.body);
        db.recipeList.create({
            whichList: req.body.whichList,
            recipeImage: req.body.recipeImage,
             recipeLink: req.body.recipeLink,
             recipeName: req.body.recipeName,
             recipeMakes: req.body.recipeMakes,
             complete: req.body.complete               
        })
             .then(function (dbRecipe) {
                  res.json(dbRecipe);
               });
          });

             // DELETE route for deleting recipes
   app.delete("/recipeList/:id", function (req, res) {
     db.recipeList.destroy({where: {id: req.params.id}})
          .then(function (dbRecipe) {
               res.json(dbRecipe);
          });
});

    // PUT route for updating gifts
    app.put("/recipeList/:id", function (req, res) {          
     db.recipeList.update(req.body, { where: { id: req.params.id }})
     .then(() => res.sendStatus(200))
        .catch(e => console.log(e)) 
 });
}



   
   



//    // PUT route for updating recipes
//    app.put("/recipeList", function (req, res) {
//         db.recipeList.update({
//              recipeName: req.body.recipeName,
//              recipeLink: req.body.recipeLink,
//              recipeMakes: req.body.recipeMakes,
//              complete: req.body.complete
//         }, { where: { id: req.body.id }
//              }).then(function (dbRecipe) {
//                   res.json(dbRecipe);
//              });
//    });