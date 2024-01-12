const router = require('express').Router();
const { Products, Category, Tags, ProductsTag } = require('../../models');


router.get('/', async (req, res) => {

  try {
    const productData = await Products.findAll({
      include: [{ model: Category}, { model: Tags, attributes: ['tag_name'], through: ProductTag, as: 'productTag_products'}]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {

  try {
    const productData = await Products.findByPk(req.params.id, {
      include: [{ model: Category}, { model: Tags, attributes: ['tag_name'], through: ProductTag, as: 'productTag_products'}]
    });

    if (!productData) {
      res.status(400).json({ message: 'Not found' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {

  Products.create(req.body)
    .then((product) => {
  
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductsTag.bulkCreate(productTagIdArr);
    },
 
      res.status(200).json(Products));
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });


router.put('/:id', (req, res) => {

  Products.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
  
      return ProductsTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
  
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
 
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
   
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductsTag.destroy({ where: { id: productTagsToRemove } }),
        ProductsTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
    
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {

  try {
    const productData = await Products.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!productData) {
      res.status(404).json({message: 'No Product found with that ID'});
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;