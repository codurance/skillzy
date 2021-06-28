import mongoose from "mongoose";
import Skill from "./skill.js";
import Company  from "./company.js";

const { Schema } = mongoose;
// Define model
const CraftspersonSchema = new Schema({
	firstname: {
		type: String,
		index: true,
		required: true
	},
	lastname: {
		type: String,
		index: true,
		required: true
	},
	skills: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
	onProject: Boolean,
	company: {type: Schema.Types.ObjectId, ref: 'Company'}
})

CraftspersonSchema
	.virtual('name')
	.get(function () {
		return `${this.firstname} ${this.lastname}`;
	})

CraftspersonSchema
	.virtual('url')
	.get(function () {
		return `/craftspeople/show/${this._id}`;
	});

CraftspersonSchema
	.virtual('baseUrl')
	.get(function () {
		return `http://localhost:3000/craftspeople`;
	});

CraftspersonSchema
	.virtual('bench')
	.get(function () {
		if (!this.onProject) {
			return 'Bench'
		}
	})


// Compile model from schema
const Craftsperson = mongoose.model('Craftsperson', CraftspersonSchema)

export default Craftsperson