// importing the models
const Products = require('./Products');
const Category = require('./Category');
const Tag = require('./Tags');
const ProductsTag = require('./ProductsTag');

// Products in the category
Products.belongsTo(Category {
    foreignKey: 'category_id'
});

// Category have multiple products
Category.hasMany(Products, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',


});

// Products with many tags 
Products.hasMany(Tags, {
    through: ProductsTag,
    as: 'productTag_products',
    foreignKey:'products_id'

});

// Tags with many Products
Tags.belongsToMany(Products, {
    through: ProductsTag,
    as: 'productTag_products',
    foreignKey:'tags_id'

})

module.exports = {
    Products,
    Category,
    Tags,
    ProductsTag,
};




