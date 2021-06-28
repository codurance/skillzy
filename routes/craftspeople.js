import express from 'express';
import {
	create,
	index,
	show,
	update,
	edit,
	newCraftsperson
} from "../controllers/craftspeople/craftspeopleController.js";
const router = express.Router();

/* GET craftspeople listing. */
router.get('/', index);

/* Show a craftsperson. */
router.get('/show/:id', show)
/* Edit a craftsperson. */
router.get('/:id/edit', edit)
/* Update a craftsperson. */
router.post('/:id/update', update)
/* Get new craftsperson form */
router.get('/new', newCraftsperson)
/* Create a craftsperson. */
router.post('/', create)

/* Delete a craftsperson. */






export default router;
