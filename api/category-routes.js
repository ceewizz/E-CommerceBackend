const router = require('express').Router();
const { Products, Category, Tags, ProductsTag } = require('../../models');

router.get('/', async (req, res) => {
    // searching for all the products with category and tag dats
     try {
             const productsData = await Products.findAll({
            include: [{ model: Category}, { model: Tags, attributes: ['tags_name'], through: ProductsTag, as: 'productsTag_products'}]
        });
        res.status(200).json(productsData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

    router.get('/:id', async (req, res) => {
        try {
            const productsData = await Products.findByPk(req.params.id, {
                include: [{ model: Category }, { model: Tags, attributes: ['tags_name'], through: ProductsTag, as: 'productsTag_products'}]
            });

            if (!productsData) {
                res.status(400).json({message: 'No Product found with this name'});
                return;
            }
            res.status(200).json(productsData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    });

    router.post('/', (req, res) => {
        {
            products_name: "Soccer",
            price: 350.00,
            stock: 5,
            tagsIds: [1, 2, 3, 4]
        }

        Products.create(req.body)
        .then((products) => {
            // Create pairings for ProductsTag models
            if (req.body.tagsIds.length) {
                const productsTagIdArr = req.body.tagsIds.map((tags_id) => {
                    return {
                        products_id: products.id,
                        tags_id,

                    };
                });
                return ProductsTag.bulkCreate(productsTagIdArr);
            }
            res.status(200).json(product);
        })
        .then((productsTagIds) => res.status(200).json(productsTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);

        });
                });

                // updating the products
                router.put('/:id', (req, res) => { 

                    // data updating
                    Products.update(req.body, {
                        where: {
                            id: req.params.id,


                        },

                    })
                    .then((products) => {
                        // Finding tags associated from the ProductsTag
                        return ProductsTag.findAll({ where:   { products_id: req.params.id} });
                        })
                        .then((product) => {
                            const productsTagIds = productsTag.map(({ tags_id }) => tags_id);

                            const newProductTags = req.body.tagsIds
                            .filter((tags_id) => !productsTagIds.includes(tags_id))
                            .map((tags_id) => {
                                return {
                                    products_id: req.params.id,
                                    tags_id,
                                };
                            });

                            const productTagsToRemove = productTags
                            .filter(({ tags_id} => !req.body.tagsIds.includes(tags_id))
                            .map(({ id }) => id);

                            return Promise.all([
                                ProductsTag.destroy({ where: { id: productTagsToremove} }),
                                ProductsTag.bulkCreate(newProductTags),
                            ]);
                        })
                        .then((updateProductTags) => res.json(updatedProductTags))
                        .catch((err) =>{
                            res.json(err);

                        });
                    });
                    router.delete(':/id', async (req, res) => {
                        try {
                            const productsData = await Products.destroy({ where: { id: req.params.id } });
                        if(!productsData) {
                            res.status(404).json({ message: 'Product not found' });
                            return;
                        }
                        res.status(200).json(productsData);
                    } catch(err) {
                        res.status(500).json(err)
                    }
                });

                module.exports = router;
                


