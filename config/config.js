// import { MongoClient } from 'mongodb';

import mongoose from "mongoose";


// const uri = process.env.MONGO_DB_URI;
// const client = new MongoClient(uri);

// const connectDb = async () => {
//   await client.connect();
//   console.log("DB Connected successfully to server");
//   const database = client.db('batch18');

//   return database;
// }

// export default  connectDb;



const connectDb = async () => {
  try {

    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Mongo DB connected');

  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export default connectDb;