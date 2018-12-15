// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

     // Each of the below routes just handles the HTML page that the user gets sent to.

     // index route loads index.html
     app.get("/", function (req, res) {
          res.sendFile(path.join(__dirname, "../public/index.html"));
     });

     // cards route loads cards.html
     app.get("/cards", function (req, res) {
          res.sendFile(path.join(__dirname, "../public/cards.html"));
     });

     // events route loads events.html
     app.get("/events", function (req, res) {
          res.sendFile(path.join(__dirname, "../public/events.html"));
     });

     // gifts route loads gifts.html
     app.get("/gifts", function (req, res) {
          res.sendFile(path.join(__dirname, "../public/gifts.html"));
     });

     // groceries route loads groceries.html
     app.get("/groceries", function (req, res) {
          res.sendFile(path.join(__dirname, "../public/groceries.html"));
     });

     // recipes route loads recipes.html
     app.get("/recipes", function (req, res) {
          res.sendFile(path.join(__dirname, "../public/recipes.html"));
     });

     // wishes route loads wishes.html
     app.get("/wishes", function (req, res) {
          res.sendFile(path.join(__dirname, "../public/wishes.html"));
     });

};