const { Tags } = require('../models');

const tagData = [
  {
    tag_name: 'R&B',
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'silver',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'asian culture',
  },
];

const seedTags = () => Tags.bulkCreate(tagData);

module.exports = seedTags;