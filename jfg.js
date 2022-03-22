
// mongo
const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "fruitsDB";

// Current Date and Time
const now = new Date();

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server on " + now.toUTCString());
  const db = client.db(dbName);

  // the following code examples can be pasted here...
  // await insertDocuments(db);
  await findDocuments(db);
  return "done on " + now.toUTCString();
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

const insertDocuments = async function (db) {
  const collection = db.collection("fruits");
  const result = await collection.insertMany([
    { name: "Apple", score: 8, review: "Great fruit" },
    { name: "Orange", score: 6, review: "sour" },
    { name: "Banana", score: 9, review: "Best Best Best" }
  ]);
  console.log(`A document was inserted with the _id: ${result.insertedId} on ` + now.toUTCString());
};

const findDocuments = async function (db) {
  const collection = db.collection("fruits");
  const cursor = collection.find({});
  await cursor.forEach((element) => {
    console.log(element);
  });
};
