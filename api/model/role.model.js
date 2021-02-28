const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Role",{
        id: {
            type: DataTypes.UUID,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};