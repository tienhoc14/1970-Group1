<<<<<<< Updated upstream
const {MongoClient,ObjectId} = require('mongodb');

const URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = "GCH0805-ApplicationDev"

async function getDB() {
    const client = await MongoClient.connect(URL);
=======
const {MongoClient,ObjectID} = require('mongodb');

const URL = 'mongodb://locahost:27017';
const DATABASE_NAME = ""

async function getDB() {
    const client = await MongoClient.connect(URL)
>>>>>>> Stashed changes
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

<<<<<<< Updated upstream
async function insertObject(collectionName,objectToInsert){
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}

async function checkUserRole(nameI,passI){
    const dbo = await getDB();
    const user= await dbo.collection("Users").findOne({userName:nameI,password:passI});
    if (user==null) {
        return "-1"
    }else{
        console.log(user)
        return user.role;
    }
}

async function InsertStaff(newStaff){
    const db = await getDB();
    await db.collection("staff").insertOne(newStaff)
}

async function DeleteTrainee(id) {
    const db = await getDB();
    await db.collection("staff").deleteOne({_id:ObjectId(id)})
}
async function GetIDStaff(id){
    const db = await getDB();
    const t = await db.collection("staff").findOne({_id:ObjectId(id)})
    return t;
}
async function UpdateStaff(UpdateStaff){
    const traineeID  = {_id:ObjectId(id)}
    const value = {$set: UpdateStaff}

    const db = await getDB();
    await db.collection("staff").updateOne(value, staffID)
}

module.exports = {insertObject,checkUserRole,InsertTrainee}

=======
async function insertObject(colecctionName,objecttoInsert){
    const dbo = await getDB();
    const newObject = await dbo.collection(colecctionName).insertOne(objecttoInsert);
    console.log("Gia tri moi duoc insert la: ", newObject.insertedId.toHexString());
}

module.exports = {insertObject}
>>>>>>> Stashed changes
