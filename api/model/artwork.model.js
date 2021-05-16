const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('artwork', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        artwork_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist_name: {
            type: DataTypes.STRING
        },
        sizes: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING,
            defaultValue: "BSTR"
        },
        purchase_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        purchase_location: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DOUBLE
        },
        tax_price: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.00
        },
        transport_price: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.00
        },
        framing: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.00
        },
        arr: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        artwork_desc: {
            type: DataTypes.STRING
        },
        notes: {
            type: DataTypes.STRING
        }
    });
};