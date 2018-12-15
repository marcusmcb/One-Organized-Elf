module.exports = function (sequelize, DataTypes) {
     
     // defines grocery list values within table
     
     var groceryList = sequelize.define("groceryList", {
          whichList: DataTypes.STRING,
          groceryName: DataTypes.STRING,
          groceryAmount: DataTypes.STRING,
          complete: DataTypes.BOOLEAN,
          }, 
          {
               freezeTableName: true,
               tableName: 'groceryList'
          }
     );
     return groceryList;
};