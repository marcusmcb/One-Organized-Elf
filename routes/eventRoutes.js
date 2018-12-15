//this file offers a set of routes for displaying and saving data to the event list in db
//require dependencies
// =============================================================
var path = require("path");

//require model
// =============================================================
var db = require("../models");

// Event Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the events data
app.get("/eventList", function (req, res) {
    db.eventList.findAll({})
         .then(function (dbEvent) {
              res.json(dbEvent);
         });
});

    // POST route for saving a new event 
app.post("/eventList", function (req, res) {
    db.eventList.create({
         eventName: req.body.eventName,
         eventDate: req.body.eventDate,
         eventTime: req.body.eventTime,
         eventLocation: req.body.eventLocation,
         eventInstructions: req.body.eventInstructions,
         complete: req.body.complete,    
         
    })
         .then(function (dbEvent) {
              res.json(dbEvent);
         });
});

// DELETE route for deleting events
app.delete("/eventList/:id", function (req, res) {
     db.eventList.destroy({where: {id: req.params.id}})
          .then(function (dbEvent) {
               res.json(dbEvent);
          });
 });

     // PUT route for updating gifts
     app.put("/eventList/:id", function (req, res) {          
          db.eventList.update(req.body, { where: { id: req.params.id }})
          .then(() => res.sendStatus(200))
          .catch(e => console.log(e))
      });
}











// // PUT route for updating events
// app.put("/eventList", function (req, res) {         
//     db.eventList.update({
//          eventName: req.body.eventName,
//          eventDate: req.body.eventDate,
//          eventTime: req.body.eventTime,
//          eventLocation: req.body.eventLocation,
//          complete: req.body.complete
//     }, { where: { id: req.body.id }
//          }).then(function (dbEvent) {
//               res.json(dbEvent);
//          });
// });
