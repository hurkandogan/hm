const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('object', {
     id: {
         type: DataTypes.UUID,
         defaultValue: Sequelize.UUIDV1,
         primaryKey: true,
         allowNull: false
     },
     name: {
         type: DataTypes.STRING,
         allowNull: false
     },
     adresse: {
         type: DataTypes.STRING,
         allowNull: true
     },
      objectType: {
          type: DataTypes.STRING,
          allowNull: false
      }
  });
};