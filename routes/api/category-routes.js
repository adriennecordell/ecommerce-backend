const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    })
    if (categories.length === 0) {
      res.status(404).send(`<p> Not found. </p>`)
      return
    }
    res.status(200).json(categories).send()
  } catch (error) {
    console.log(error)
  }
});

router.get('/:id',  async (req, res) => {
  const ids = (await Category.findAll({ attributes: ["id"] })).map(
    (element) => element.dataValues.id
  )
  if (!ids.includes(Number(req.parama.id))) {
    res.status(400).send(`<p> not a good request</p>`)
    return;
  }
  try {
    const category = await Category.findByPk(req.parama.id, {
      include: Product,
    })
    res.status(200).json(category).send()
  } catch (error) {
    console.log(error)
  }
});

router.post('/', async  (req, res) => {
  try {
    let newCategory = await Category.create(req.body)
    res.status(201).json(newCategory).send()
  } catch (error) {
    console.log(error)
  }

  router.post("/:id", async (req, res) => {
    try {
      const newCategory = await Category.create({
        id: req.params.id,
        category_name: req.body.category_name,
      });
      res.status(201).json(newCategory).send();
    } catch (err) {
      console.error(err);
    }
  });
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;