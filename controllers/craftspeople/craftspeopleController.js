import Craftsperson from "../../models/craftsperson.js";
import Skill from "../../models/skill.js";
import Company from "../../models/company.js";

export const index = (req, res, next) => {
	Craftsperson
		.find({})
		.populate('company', 'companyName')
		.populate('skills', 'skillName')
		.exec((err, craftspeople) => {
		if (err) return next(err);
		res.render('craftspeople', { title: 'Craftspeople List', craftspeople: craftspeople })
	})
}

export const show = async (req, res, next) => {
	const { id } = req.params
	try {
		const craftsperson = await Craftsperson
			.findById(id)
			.populate('company', 'companyName')
			.populate('skills', 'skillName')
			.exec()
			res.render('craftspeople/show', { craftsperson: craftsperson })
	} catch (e) {
		console.error(e)
	}
}

export const edit = async (req, res, next) => {
	const { id } = req.params;
	 try {
		const craftsperson = await Craftsperson
			.findById(id)
			.populate('company', 'companyName')
			.populate('skills', 'skillName')
			.exec()
		res.render('craftspeople/edit', {title: 'Edit', craftsperson: craftsperson})
	} catch (e) {
		 console.log(e)
	 }

}

export const update = async (req, res, next) => {
	const {id} = req.params;
	const {firstname, lastname, skills, onProject, company} = req.body;
	const updates = Object.keys(req.body);
	const allowedUpdates = ['firstname', 'lastname', 'skills', 'onProject', 'company'];

	console.log(`Updating craftsperson with id: ${id} and firstname: ${firstname}`)

	console.log(`Validating updated form fields: ${updates}`)
	if (!isValidOperation(updates, allowedUpdates)) {
		return res.status(400).json({error: 'Invalid updates!'});
	}
	console.log(`Form fields validated! ${updates}`)


	try {
		const skillsSplit = skills.split(' ')
		let skillsList = [];
		for (const skill of skillsSplit) {
			skillsList.push(await new Skill({skillName: skill}).save())
		}

		const updatedCompany = await new Company({companyName: company}).save()

		const craftsperson = new Craftsperson({
			firstname: firstname,
			lastname: lastname,
			skills: skillsList,
			onProject: onProject,
			company: updatedCompany,
			_id: id
		})

		const aCraftsperson = await Craftsperson.findByIdAndUpdate(id, craftsperson, {});
		if (!aCraftsperson) {
			return res.status(404).json({error: 'Craftsperson does not exist'});
		}

		res.redirect(aCraftsperson.url);
	} catch (e) {
		res.render('error')
	}
}

export const newCraftsperson = (req, res, next) => {
	res.render('craftspeople/new', { title: 'Add Craftsperson'})
}


export const create = async (req, res, next) => {
	const data = Object.keys(req.body);
	const allowedData = ['firstname', 'lastname', 'skills', 'onProject', 'company'];
	const { firstname, lastname, skills, onProject, company } = req.body;

	if (!isValidOperation(data, allowedData)) {
		res.status(400).render('error')
	}


	try {
		const newSkills = skills.split(' ')
		let savedSkills = []
		for (const skill of newSkills) {
			savedSkills.push(await new Skill({skillName: skill}).save())
		}

		const newCompany = await new Company({companyName: company}).save()
		const craftsperson = new Craftsperson({firstname, lastname, skills: savedSkills, onProject, company: newCompany});
		await craftsperson.save()
		res.redirect('/craftspeople');
	} catch (e) {
		console.error(e)
	}
}


const isValidOperation = (data, allowedData) => data.every(attribute => allowedData.includes(attribute))