const { Sequelize, DataTypes } = require('sequelize');
const Object = require('./object.model');
const CostType = require('./costTypes.model');

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
            allowNull: false,
            references: {
                model: Object,
                key: 'id'
            }
        },
        costTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: CostType,
                key: 'id'
            }
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