const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Flannels',
  },
  {
    category_name: 'Active',
  },
  {
    category_name: 'DJ',
  },
  {
    category_name: 'Tops',
  },
  {
    category_name: 'Boots',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;