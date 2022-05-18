import { MongoClient } from "mongodb";
export async function databaseConnection() {
    const url = process.env.MONGO_DB;
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Server is Connected Successfully!");
    return client;
}

export async function insertDataToDatabase(client, collection, insertData) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(insertData);
    return result;
}

export async function findDataToDatabase(client, collection, filter) {
    const db = client.db();
    const filteredData = await db.collection(collection).findOne(filter);
    return filteredData;
}

export async function updateDataToDatabase(
    client,
    collection,
    filter,
    updateObject
) {
    const db = client.db();
    const updatedData = await db
        .collection(collection)
        .updateOne(filter, updateObject);
    return updatedData;
}
