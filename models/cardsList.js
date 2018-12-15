module.exports = function(sequelize, DataTypes) {

     // defines card list values within table

     var cardsList = sequelize.define("cardsList", {
          whichList: DataTypes.STRING,
          cardName: DataTypes.STRING,
          cardAddress: DataTypes.STRING,
          cardCity: DataTypes.STRING,
          cardState: DataTypes.STRING,
          cardZipCode: DataTypes.STRING,
          complete: DataTypes.BOOLEAN,
          }, 
          {
               freezeTableName: true,
               tableName: 'cardsList'
          }
     );
     return cardsList;
}