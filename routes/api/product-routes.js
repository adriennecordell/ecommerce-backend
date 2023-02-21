import express from "express";
const router = express.Router();
import { Product, Category, Tag, ProductTag } from "../../models";

router.get("/", async (req, res) => {
	try {
		const products = await Product.findAll({ include: [Category, Tag] });
		if (products.length === 0) {
			res.status(404)
			return;
		}
		res.status(200).json(products).send();
	} catch (err) {
		console.error(err);
		res.status(500)
  }
});

router.get("/:id", async (req, res) => {
	const ids = (await Product.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);
	if (!ids.includes(Number(req.params.id))) {
		res.status(400)
		return;
	}
	try {
		const product = await Product.findByPk(req.params.id, {
			include: [Category, Tag],
		});
		res.status(200).json(product).send();
	} catch (err) {
		console.error(err);
	}
});

router.post("/", (req, res) => {
	Product.create(req.body)
		.then((product) => {
			if (req.body.tagIds.length) {
				const productTagIdArr = req.body.tagIds.map((tag_id) => {
					return { product_id: product.id, tag_id };
				});
				return ProductTag.bulkCreate(productTagIdArr);
			}
			res.status(200).json(product);
		})
		.then((productTagIds) => res.status(200).json(productTagIds))
		.catch((err) => {
			console.error(err);
		});
});

router.put("/:id", (req, res) => {
	Product.update(req.body, { where: { id: req.params.id } })
		.then((product) => {
			return ProductTag.findAll({ where: { product_id: req.params.id } });
		})
		.then((productTags) => {
			const productTagIds = productTags.map(({ tag_id }) => tag_id);
			const newProductTags = req.body.tagIds
				.filter((tag_id) => !productTagIds.includes(tag_id))
				.map((tag_id) => {
					return { product_id: req.params.id, tag_id };
				});
			const productTagsToRemove = productTags
				.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
				.map(({ id }) => id);

			return Promise.all([
				ProductTag.destroy({ where: { id: productTagsToRemove } }),
				ProductTag.bulkCreate(newProductTags),
			]);
		})
		.then((updatedProductTags) => res.json(updatedProductTags))
		.catch((err) => {
			console.error(err);
		});
});

router.delete("/:id", async (req, res) => {
	try {
		const exists = await Product.findOne({ where: { id: req.params.id } });
		if (exists) {
			await Product.destroy({ where: { id: req.params.id } });
			res.status(204).send();
		} else {
			res.status(404)
		}
	} catch (err) {
		console.error(err);
	}
});

export default router;