import { MongoClient } from 'mongodb';
const uri = 'mongodb://localhost:27017/portfolio';
const client = new MongoClient(uri);
export default async function connectToDatabase() {
    console.log('connecting to db');
   try {
    await client.connect();
   } catch(err) {
    console.log('Error connecting to db: ' + err);
   }
  console.log('connected to db');
  return client.db();
}

// let dbConnection;

// module.exports = {
//     connectToDb: (cb) => {
//         new MongoClient("mongodb://localhost:27017/bookstore")
//             .then((client) => {
//                 dbConnection = client.db();
//                 return cb();
//             })
//             .catch((err) => {
//                 console.log('Error connecting to db: ' + err);
//                 return cb(err);
//             })
//     },
//     getDb: () => dbConnection
// }