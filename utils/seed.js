const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  generateRandomEmail,
  generateRandomUser,
  getRandomThoughts,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const thoughts = getRandomThoughts(10); // Generates 10 random thoughts
  const users = [];

  for (let i = 0; i < 20; i++) {
    // Generates 20 random users
    const username = generateRandomUser();
    const email = generateRandomEmail();

    users.push({
      username,
      email,
    });
  }
  // Insert random users and thoughts into database
  await User.insertMany(users);
  await Thought.insertMany(thoughts);

  // Print info to console
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
