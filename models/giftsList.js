module.exports = function(sequelize, DataTypes) {

     // defines gift list values within table

     var giftsList = sequelize.define("giftsList", {
          whichList: DataTypes.STRING,
          giftName: DataTypes.STRING,
          giftBudget: DataTypes.STRING,
          giftBought: DataTypes.STRING,
          complete: DataTypes.BOOLEAN
          }, 
          {
               freezeTableName: true,
               tableName: 'giftsList'
          }
     );
     return giftsList;
}