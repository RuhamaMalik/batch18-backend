import { MongoClient } from 'mongodb';


const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri);

const connectDb = async () => {
  await client.connect();
  console.log("DB Connected successfully to server");
  const database = client.db('batch18');

  return database;
}

export default  connectDb;