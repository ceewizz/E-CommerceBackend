// Importing the important properties of the seq lib
const { Model, DataTypes } = require('sequelize');

// Importing db from config.js connection
const sequelize = require('../config/connection');


// Intialization of Product model table by expanding seq model class

class Products extends Model {}

// Setting up policies for model of products
Products.init(
    {
        // column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate: {
                isDecimal: true
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                isNumeric: true
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'

            }
        }
    },
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'products',

}
);
module.exports = Products;