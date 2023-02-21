import express from "express";
import { Sequelize } from "sequelize";
const router = express.Router();
import { Category, Product } from "../../models";

router.get("/", async (req, res) => {
	try {
		const categories = await Category.findAll({
			include: Product,
		});
		if (categories.length === 0) {
			res.status(404)
			return;
		}
		res.status(200).json(categories).send();
	} catch (err) {
		console.error(err);
  }
});

router.get("/:id", async (req, res) => {
	const ids = (await Category.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);
	if (!ids.includes(Number(req.params.id))) {
		res.status(400)
		return;
	}
	try {
		const category = await Category.findByPk(req.params.id, {
			include: Product,
		});
		res.status(200).json(category).send();
	} catch (err) {
		console.error(err);
	}
});

router.post("/", async (req, res) => {
	try {
		let newCategory = await Category.create(req.body);
		res.status(201).json(newCategory).send();
	} catch (err) {
		if (err instanceof Sequelize.ValidationError) {
			res.status(400)
		} else {
			console.error(err);
		}
	}
});

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

router.put("/:id", async (req, res) => {
	const ids = (await Category.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);
	if (ids.includes(Number(req.params.id))) {
		try {
			const updatedCategory = await Category.update(
				{ category_name: req.body.category_name },
				{ where: { id: req.params.id } }
			);
			
			if (updatedCategory[0]) {
				res.status(204).send();
			} else {
				res.status(304).send();
			}
		} catch (err) {
			console.error(err);
		}
	} else {
		try {
			const newCategory = await Category.create({
				id: req.params.id,
				category_name: req.body.category_name,
			});
			res.status(201).json(newCategory).send();
		} catch (err) {
			console.error(err);
			}
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const exists = await Category.findOne({ where: { id: req.params.id } });
		if (exists) {
			await Category.destroy({ where: { id: req.params.id } });
			res.status(204).send();
		} else {
			res.status(404)
		}
	} catch (err) {
		console.error(err);
	}
});

export default router;