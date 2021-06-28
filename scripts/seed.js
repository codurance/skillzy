import mongoose from "mongoose";
import faker from 'faker';
const { models } = mongoose;
async function createCraftspeopleWithSkillsAndNoProject() {
	let nodejs = new models.Skill({skillName: 'Nodejs'});
	let java = new models.Skill({skillName: 'Java'});
	let csharp = new models.Skill({skillName: 'C#'});
	let ruby = new models.Skill({skillName: 'Ruby'});
	let company = new models.Company({
		companyName: faker.company.companyName()
	});
	let bench = new models.Company({
		companyName: 'Bench'
	});





	// const firstname = faker.name.firstName();
	// const lastname = faker.name.lastName();
	await nodejs.save()
	await java.save()
	await csharp.save()
	await ruby.save()
	await company.save()

	try {
		for (let i = 0; i < 50; i++) {
			const firstname = faker.name.firstName();
			const lastname = faker.name.lastName();
			const dataType = faker.datatype.boolean();
			 await new models.Craftsperson({
				firstname: firstname,
				lastname: lastname,
				skills: [nodejs._id, java._id, ruby._id],
				onProject: dataType,
				company: company._id
			}).save()

		}
 } catch (e) {
		console.error(e)
	}
}

export const seedDb = async () => {
	await createCraftspeopleWithSkillsAndNoProject()
}