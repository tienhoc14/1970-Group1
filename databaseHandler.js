const { MongoClient,ObjectID } = require("mongodb")

const URL = 'mongodb://localhost:27017';
const DATABASE_NAME = "GCH0805-ApplicationDev"

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertObject(collectionName,objectToInsert){
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert)

}

module.exports = {insertObject}
