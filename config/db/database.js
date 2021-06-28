import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const connectDb = async () => {
	await mongoose.connect(`${process.env.DATABASE_URL}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});
}


export { connectDb }