import express from "express";
const router = express.Router();
import { Tag, Product, ProductTag } from "../../models";

router.get("/", async (req, res) => {
	try {
		const tags = await Tag.findAll({ include: Product });
		if (tags.length === 0) {
			res.status(404)
			return;
		}
		res.status(200).json(tags).send();
	} catch (err) {
		console.error(err);
	}
});

router.get("/:id", async (req, res) => {
	const ids = (await Tag.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);
	if (!ids.includes(Number(req.params.id))) {
		res.status(400)
		return;
	}
	try {
		const tag = await Tag.findByPk(req.params.id, { include: Product });
		res.status(200).json(tag).send();
	} catch (err) {
		console.error(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const newTag = await Tag.create(req.body);
		res.status(201).json(newTag).send();
	} catch (err) {
		console.error(err);
	}
});

router.post("/:id", async (req, res) => {
	try {
		const newTag = await Tag.create({
			id: req.params.id,
			tag_name: req.body.tag_name,
		});
		res.status(201).json(newTag).send();
	} catch (err) {
		console.error(err);
	}
});

router.put("/:id", async (req, res) => {
	const ids = (await Tag.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);
	if (ids.includes(Number(req.params.id))) {
		try {
			const updatedTag = await Tag.update(
				{ tag_name: req.body.tag_name },
				{ where: { id: req.params.id } }
			);
			if (updatedTag[0]) {
				res.status(204).send();
			} else {
				res.status(304).send();
			}
		} catch (err) {
			console.error(err);
		}
	} else {
		try {
			const newTag = await Tag.create({
				id: req.params.id,
				tag_name: req.body.tag_name,
			});
			res.status(201).json(newTag).send();
		} catch (err) {
			console.error(err);
		}
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const exists = await Tag.findOne({ where: { id: req.params.id } });
		if (exists) {
			await Tag.destroy({ where: { id: req.params.id } });
			res.status(204).send();
		} else {
			res.status(404)
		}
	} catch (err) {
		console.error(err);
	}
});

export default router;