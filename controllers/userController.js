const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    // GET route to get all users
    try {
      const users = await User.find(); // Find all users
      res.json(users); // Return list of users
    } catch (err) {
      // Handle error
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    // GET route to get a single user from ID
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      ); // Find one user from the ID provided

      if (!user) {
        // Handle error of invalid user ID
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user); // Return user as response
    } catch (err) {
      res.status(500).json(err); // Handle error
    }
  },
  // POST route to create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body); // Create user from request body
      res.json(dbUserData); // Return created user as response
    } catch (err) {
      res.status(500).json(err); // Handle error
    }
  },
  async deleteUser(req, res) {
    // DELETE route to delete single user from provided user ID
    try {
      const result = await User.findOneAndDelete({ _id: req.params.userId }); // Find and delete user from ID provided as parameter
      res.status(200).json(result); // Return deleted user
    } catch (err) {
      res.status(500).json({ error: err }); // Handle error
    }
  },
  async updateUser(req, res) {
    // PUT route to update a user from given user ID
    try {
      const result = await User.findOneAndUpdate(
        // Finds document with corresponding user ID
        { _id: req.params.userId },
        // Updates document from req.body
        req.body,
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { new: true }
      );
      res.status(200).json(result); // Return updated user as response
    } catch (err) {
      res.status(500).json({ error: err }); // Handle error
    }
  },
  // ---------- FRIEND ROUTES ---------------

  async addFriend(req, res) {
    // POST route to add a friend
    try {
      const friendToAdd = await User.findOne({ _id: req.params.friendId }); // Find user to be added as a friend from given ID
      const result = await User.findOneAndUpdate(
        // Add the friend to the user's array of friends
        { _id: req.params.userId },
        { $addToSet: { friends: friendToAdd } },
        { new: true } // Set new to true so that updated document is returned
      );
      res.status(200).json(result); // Return updated user
    } catch (err) {
      res.status(500).json({ error: err }); // Handle error
    }
  },
  async removeFriend(req, res) {
    // DELETE route to delete a friend from an user's friend list
    try {
      const result = await User.findOneAndUpdate(
        // Find the user provided and remove the friend from their friends array
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true } // Set new to true to ensure updated document is returned
      );
      res.status(200).json(result); // Return updated user as result
    } catch (err) {
      res.status(500).json({ error: err }); // Handle error
    }
  },
};
