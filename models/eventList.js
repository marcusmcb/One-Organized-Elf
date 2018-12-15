module.exports = function(sequelize, DataTypes) {

     var eventList = sequelize.define("eventList", {
          eventName: DataTypes.STRING,
          eventDate: DataTypes.STRING,
          eventTime: DataTypes.STRING,
          eventLocation: DataTypes.STRING,
          eventInstructions: DataTypes.STRING,
          complete: DataTypes.BOOLEAN
          },
          {
               freezeTableName: true,
               tableName: 'eventList'
          }
     );
     return eventList;
}