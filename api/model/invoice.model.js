const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('invoice',{
        id : {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        objectId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        costTypeId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        firm: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        payment: {
            type: DataTypes.BOOLEAN,
        },
        invoiceLink: {
            type: DataTypes.STRING
        }
    });
};