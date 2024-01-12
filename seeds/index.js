const seedCategories = require('./category-seeds');
const seedProducts = require('./products-seeds');
const seedTags = require('./tags-seeds');
const seedProductTags = require('./products-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n DATABASE SYNCED \n');
  await seedCategories();
  console.log('\n CATEGORIES SEEDED\n');

  await seedProducts();
  console.log('\nPRODUCTS SEEDED\n');

  await seedTags();
  console.log('\nTAGS SEEDED\n');

  await seedProductTags();
  console.log('\n PRODUCT TAGS SEEDED \n');

  process.exit(0);
};

seedAll();