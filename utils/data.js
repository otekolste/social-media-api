const parts = [
  // Array from which thoughts will be created
  "do",
  "re",
  "mi",
  "fa",
  "so",
  "la",
  "ti",
];

const userNameParts = [
  // Array of parts from which usernames will be created
  "june",
  "bug",
  "friend",
  "fly",
  "butter",
  "lady",
  "dog",
  "cat",
  "blue",
  "green",
  "red",
  "orange",
  "yellow",
  "violet",
  "daisy",
  "pumpkin",
  "frog",
  "lamp",
  "bird",
];

const reactionBodies = [
  // Array of possible reactions
  "This is cool",
  "I agree!",
  "NO!!!!!!!!!!",
  "Why would you say this",
  "Hmmmm...",
];

function generateThoughtText(length) {
  // Function to generate a random string from the provided array of parts
  let thoughtText = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * parts.length);
    thoughtText += parts[randomIndex] + " ";
  }
  return thoughtText;
}

function generateRandomUser() {
  // Function to generate a random username
  return `${getRandomArrItem(userNameParts)}${getRandomArrItem(userNameParts)}`;
}

function generateRandomEmail() {
  // Function to generate a random email in email format
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomEmail = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomEmail += charset[randomIndex];
  }
  randomEmail += "@";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomEmail += charset[randomIndex];
  }
  randomEmail += ".";
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomEmail += charset[randomIndex];
  }
  return randomEmail;
}

// The following functions (getRandomArrItem, getRandomThoughts, getReactions) are based off of example code provided by edX:

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)]; // Function that gets a random item from a given array

const getRandomThoughts = (int) => {
  // Function that creates an array of thought objects
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      username: generateRandomUser(),
      thoughtText: generateThoughtText(15),
      reactions: [...getReactions(3)],
    });
  }
  return results;
};

// Create the reactions that will be added to each thought
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(reactionBodies);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactionBodies),
      username: generateRandomUser(),
    });
  }
  return results;
};

module.exports = { generateRandomEmail, generateRandomUser, getRandomThoughts };
