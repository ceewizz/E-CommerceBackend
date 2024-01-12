const router = require('express').Router();
const { Tags, Products, ProductsTag } = require('../../models');



router.get('/', async (req, res) => {

  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'productTag_products'}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
 
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Products, through: ProductsTag, as: 'productsTag_products' }]
    });
    if (!tagData) {
      res.status(400).json({ message: 'Product error' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {

  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {

  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    res.status(200).json(tag);
  }) .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', async (req, res) => {
 
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tagData) {
      res.status(404).json({message: 'Not found'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;