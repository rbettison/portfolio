import mongoose from 'mongoose';
const uri = process.env.MONGODB_URI;

export default async function connectToDatabase() {
    console.log('connecting to db');
   try {
    await mongoose
    .connect(uri);
   } catch(err) {
    console.log('Error connecting to db: ' + err);
   }
  console.log('connected to db');
}