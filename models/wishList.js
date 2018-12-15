module.exports = function(sequelize, DataTypes) {

     // defines wish list values within table

     var wishList = sequelize.define("wishList", {
          whichList: DataTypes.STRING,
          itemName: DataTypes.STRING,
          itemLocation: DataTypes.STRING,
          itemPrice: DataTypes.STRING,
          itemOptions: DataTypes.STRING,
          complete: DataTypes.BOOLEAN,
          }, 
          {
               freezeTableName: true,
               tableName: 'wishList'
          });
     return wishList;     
}