const User = require("../models/User");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndDelete({ _id: req.params.userId });
      res.status(200).json(result);
      console.log(`Deleted ${result}`);
    } catch (err) {
      console.log("Sorry, something went wrong!");
      res.status(500).json({ error: err });
    }
  },
  async updateUser(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        // Finds document with corresponding user ID
        { _id: req.params.userId },
        // Updates document from req.body
        req.body,
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { new: true }
      );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log("Sorry, something went wrong!");
      res.status(500).json({ error: err });
    }
  },
  // ---------- FRIEND ROUTES ---------------

  async addFriend(req, res) {
    try {
      const friendToAdd = await User.findOne({ _id: req.params.friendId });
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: friendToAdd } },
        { new: true }
      );
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } catch (err) {
      console.log("Sorry, something went wrong!");
      res.status(500).json({ error: err });
    }
  },
  async removeFriend(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } catch (err) {
      console.log("Sorry, something went wrong!");
      res.status(500).json({ error: err });
    }
  },
};
