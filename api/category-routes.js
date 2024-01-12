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

        }
    })

        }
            }
        })

    )