//this file offers a set of routes for displaying and saving data to the wish list in db
//require dependencies
// =============================================================
var path = require("path");

//require model
// =============================================================
var db = require("../models");

// Wish Routes
// =============================================================
module.exports = function (app) {
    // GET route for getting all of the wishes data
    app.get("/wishList/", function (req, res) {
        db.wishList.findAll({})
            .then(function (dbWish) {
                res.json(dbWish);                    
            });
    });

    // POST route for saving a new wishes 
    app.post("/wishList", function (req, res) {
        db.wishList.create({
            whichList: req.body.whichList,
            itemName: req.body.itemName,
            itemLocation: req.body.itemLocation,
            itemPrice: req.body.itemPrice,
            itemOptions: req.body.itemOptions,
            complete: req.body.complete
        })
            .then(function (dbWish) {                    
                res.json(dbWish);
            });
    });
    
    // DELETE route for deleting wishes
app.delete("/wishList/:id", function (req, res) {
    db.wishList.destroy({where: {id: req.params.id}})
         .then(function (dbWish) {
              res.json(dbWish);
         });               
});

    // PUT route for updating gifts
    app.put("/wishList/:id", function (req, res) {          
        db.wishList.update(req.body, { where: { id: req.params.id }})
        .then(function (dbWish) {
            res.json(dbWish);
       });  
    })
}





// // PUT route for updating wishes
// app.put("/wishList", function (req, res) {
//     db.wishList.update({
//          itemName: req.body.itemName,
//          itemLocation: req.body.itemLocation,
//          itemPrice: req.body.itemPrice,
//          itemOptions: req.body.itemOptions,
//          complete: req.body.complete
//     }, { where: { id: req.body.id }
//          }).then(function (dbWish) {
//               res.json(dbWish);
//          });
// });
// };