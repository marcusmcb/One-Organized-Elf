module.exports = (app) => {
    require('./htmlRoutes')(app)
    require('./cardRoutes')(app)
    require('./wishRoutes')(app)
    require('./eventRoutes')(app)
    require('./giftRoutes')(app)
    require('./groceryRoutes')(app)
    require('./recipeRoutes')(app)
  }
  