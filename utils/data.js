

  const reactionBodies = [
    "This is cool",
    "I agree!",
    "NO!!!!!!!!!!",
    "Why would you say this",
    "Hmmmm..."
  ]
  // Below function sourced from: https://www.devtoolsdaily.com/blog/random-text-javascript/
  function generateRandomText(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomText += charset[randomIndex];
    }
  
    return randomText;
  }
  

  function generateRandomEmail() {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomEmail = '';
  
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomEmail += charset[randomIndex];
    }
    randomEmail+= '@';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomEmail += charset[randomIndex];
      }
    randomEmail+='.';
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomEmail += charset[randomIndex];
      }
    return randomEmail;
  }

  // The following functions (getRandomArrItem, getRandomThoughts, getReactions) are based off of example code provided by edX:

  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        username: generateRandomText(10),
        thoughtText: generateRandomText(50),
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
        username: generateRandomText(10),
      });
    }
    return results;
  };
  
  module.exports = { generateRandomEmail, generateRandomText, getRandomThoughts };

