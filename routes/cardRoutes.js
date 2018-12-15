//this file offers a set of routes for displaying and saving data to the card list in db
//require dependencies
// =============================================================
var path = require("path");

//require model
// =============================================================
var db = require("../models");

// Card Routes
// =============================================================
module.exports = function (app) {
     //GET route for getting all of the cards data
     app.get("/cardsList/", function (req, res) {
        db.cardsList.findAll({})
             .then(function (dbCard) {
                  res.json(dbCard);
             });
   });

   // POST route for saving a new card 
   app.post("/cardsList", function (req, res) {
        console.log(req.body.whichList);
        db.cardsList.create({
             whichList: req.body.whichList,
             cardName: req.body.cardName,
             cardAddress: req.body.cardAddress,
             cardCity: req.body.cardCity,
             cardState: req.body.cardState,
             cardZipCode: req.body.cardZipCode,
             complete: req.body.complete,               
        })
             .then(function (dbCard) {
                  res.json(dbCard);
             });
   });

      // DELETE route for deleting cards
      app.delete("/cardsList/:id", function (req, res) {
          db.cardsList.destroy({where: {id: req.params.id}})
               .then(function (dbCard) {
                    res.json(dbCard);
               });
     });

     app.put("/cardsList/:id", function (req, res) {
          db.cardsList.update(req.body, { where: { id: req.params.id }})
          .then(function (dbCard) {
              res.json(dbCard);
          });
      });
}