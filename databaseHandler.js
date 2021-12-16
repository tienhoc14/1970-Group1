const async = require('hbs/lib/async');
const { MongoClient, ObjectId } = require('mongodb');

const URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = "GCH0805-ApplicationDev"

async function getDB() {
    const client = await MongoClient.connect(URL)
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

//trainer function

async function DeleteTrainer(username) {
    const dbo = await getDB();
    await dbo.collection("Trainers").deleteOne({ userName: username })
    await dbo.collection("Users").deleteOne({ userName: username })
}

//end trainer function

//trainee
async function DeleteTrainee(username) {
    const db = await getDB();
    await db.collection("trainees").deleteOne({ userName: username })
    await db.collection("Users").deleteOne({ userName: username })
}

async function UpdateTrainee(id, name, email, age, specialty, address) {
    const traineeID = { _id: ObjectId(id) }
    const value = { $set: { name: name, email: email, age: age, specialty: specialty, address: address } };

    const db = await getDB();
    await db.collection("trainees").updateOne(traineeID, value)
}

// Staff function

async function DeleteStaff(username) {
    const dbo = await getDB();
    await dbo.collection("Staff").deleteOne({ userName: username })
    await dbo.collection("Users").deleteOne({ userName: username })
}

module.exports = {
    getDB,
    insertObject,
    checkUserRole,
    DeleteTrainee,
    UpdateTrainee,
    DeleteTrainer,
    DeleteStaff,
    ObjectId,
}