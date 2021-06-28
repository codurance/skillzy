import mongoose from "mongoose";


// Define model
const CompanySchema = new mongoose.Schema({
	companyName: String
});

// Compile model from schema
const Company = mongoose.model('Company', CompanySchema)


export default Company


