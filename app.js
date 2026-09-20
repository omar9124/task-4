const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "app_db";

async function addUser() {
  try {
    await client.connect();
    console.log("connected to DB successfully!!");

    const db = client.db(dbName);
    const users = db.collection("users");

    const result = await users.insertOne({
      name: "islam",
      age: 29,
      city: "mansoura"
    });

    console.log("Inserted document Id :", result.insertedId);

    await addNewUser(users);
    await addUser2(users);
    await addMany(users);
    await findUser(users, "69ac9d65b7dad3c84ec2d5e0");
    await countUsers(users);
    await limitUsers(users);
    await updateUser(users, "69b5c7c157f0c7da82f62673");
    await updateManyUsers(users);
    await deleteUser(users, "69b5c7c157f0c7da82f62673");
    await deleteManyUsers(users);

  } catch (err) {
    console.log(err);
  }
}

async function addNewUser(users) {
  const result = await users.insertOne({
    name: "hossam",
    age: 35,
    city: "cairo"
  });

  console.log("Inserted document Id :", result.insertedId);
}

async function addUser2(users) {
  const result = await users.insertOne({
    name: "aya",
    age: 40,
    city: "alex"
  });

  console.log("Inserted document Id :", result.insertedId);
}

async function addMany(users) {
  const result = await users.insertMany([
    {
      name: "mustafa",
      age: 18,
      city: "alex"
    },
    {
      name: "manem",
      age: 25,
      city: "cairo"
    },
    {
      name: "mona",
      age: 30,
      city: "tanta"
    },
    {
      name: "adel",
      age: 15,
      city: "mansoura"
    }
  ]);

  console.log("Inserted documents :", result.insertedCount);
}

async function findUser(users, id) {
  const user = await users.findOne({ _id: new ObjectId(id) });

  if (user) {
    console.log("found user :", user);
  } else {
    console.log("user not found");
  }
}

async function countUsers(users) {
  const count = await users.countDocuments({ age: 29 });
  console.log("users with the same age :", count);
}

async function limitUsers(users) {
  const data = await users.find({ age: 29 }).limit(3).toArray();
  console.log("Limited users :", data);
}

async function updateUser(users, id) {
  const result = await users.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { name: "marwan" },
      $inc: { age: 100 }
    }
  );
  console.log("Modified :", result.modifiedCount);
}

async function updateManyUsers(users) {
  const result = await users.updateMany(
    {},
    {
      $inc: { age: 500 }
    }
  );
  console.log("Modified Docs :", result.modifiedCount);
}

async function deleteUser(users, id) {
  const result = await users.deleteOne({
    _id: new ObjectId(id)
  });
  console.log("deleted Docs :", result.deletedCount);
}

async function deleteManyUsers(users) {
  const result = await users.deleteMany({
    name: "islam"
  });
  console.log("Deleted Docs :", result.deletedCount);
}

addUser();