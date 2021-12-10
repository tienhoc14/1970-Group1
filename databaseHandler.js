const { MongoClient, ObjectId } = require('mongodb');

const URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = "GCH0805-ApplicationDev"

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertObject(collectionName, objectToInsert) {
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}

async function checkUserRole(nameI, passI) {
    const dbo = await getDB();
    const user = await dbo.collection("Users").findOne({ userName: nameI, password: passI });
    if (user == null) {
        return "-1"
    } else {
        console.log(user)
        return user.role;
    }
}


async function InsertTrainee(newTrainee) {
    const db = await getDB();
    await db.collection("trainees").insertOne(newTrainee)
}
async function DeleteTrainee(id) {
    const db = await getDB();
    await db.collection("trainees").deleteOne({ _id: ObjectId(id) })
}
async function GetIDTrainee(id) {
    const db = await getDB();
    const t = await db.collection("trainees").findOne({ _id: ObjectId(id) })
    return t;
}
// <<<<<<< HEAD
// async function UpdateTrainee(updateTrainee) {
//     const traineeID = { _id: ObjectId(id) }
//     const value = { $set: updateTrainee }
// =======
async function UpdateTrainee(id, name, email, specialty, address) {
    const traineeID = { _id: ObjectId(id) }
    const value = { $set: { name: name, email: email, specialty: specialty, address: address } }
        // >>>>>>> a72078628f56cd5364e2492a97f7e7fb9e8060a4

    const db = await getDB();
    await db.collection("trainee").updateOne(value, traineeID)
}
module.exports = {
    getDB,
    insertObject,
    checkUserRole,
    InsertTrainee,
    DeleteTrainee,
    GetIDTrainee,
    UpdateTrainee
}