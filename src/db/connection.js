const  { MongoClient } = require("mongodb");

require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

const connection = async (crudFunc, dataObj) => {
    try{
        await client.connect();
        const db = client.db("testDB");
        const collection = db.collection("movies");
        collection.createIndex({title: "text", actor: "text", genre: "text"});
        await crudFunc(collection, dataObj);
        client.close();
    } catch(error) {
        console.log(error);
    }
}

module.exports = connection;