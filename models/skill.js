import mongoose from "mongoose";

// Define model
const SkillSchema = new mongoose.Schema({
	skillName: String
});

// Compile model from schema
const Skill = mongoose.model('Skill', SkillSchema);

export default Skill