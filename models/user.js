module.exports = function(sequelize, DataTypes) {
     
     // defines username value from log-in
     
     var userName = sequelize.define("userName", {
          name: DataTypes.STRING
     }, {
          freezeTableName: true,
          tableName: 'userName'
     });

     // associates username with corresponding lists/tables as they are created

     // userName.associate = function(models) {

     //      userName.hasMany(models.giftsList, {
     //           onDelete: "cascade"
     //      });

     //      userName.hasMany(models.wishList, {
     //           onDelete: "casdade"
     //      });

     //      userName.hasMany(models.cardsList, {
     //           onDelete: "cascade"
     //      });

     //      userName.hasMany(models.recipesList, {
     //           onDelete: "cascade"
     //      });

     //      userName.hasMany(models.groceryList, {
     //           onDelete: "cascade"
     //      });

     //      userName.hasMany(models.eventList), {
     //           onDelete: "cascade"
     //      }
     // };
     
     return userName;
}