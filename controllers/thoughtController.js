const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    // GET route to get all thoughts
    try {
      const thoughts = await Thought.find(); // Find all thoughts
      res.json(thoughts); // Return thoughts as JSON response
    } catch (err) {
      res.status(500).json(err); // Handle error
    }
  },
  async getSingleThought(req, res) {
    // GET route to get a single thought by a given ID
    try {
      const thought = await Thought.findOne({
        // Find thought from ID given in request parameter
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" }); // Handle error of invalid thought ID
      }
      res.json(thought); // Return thought as response
    } catch (err) {
      res.status(500).json(err); // Handle error
    }
  },
  async createThought(req, res) {
    // POST route to create a new thought
    try {
      const thought = await Thought.create(req.body); // Create thought, passing in request body
      const user = await User.findOneAndUpdate(
        // Find the corresponding user, from the username provided in the request body, and add thought to the user's array
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true } // Set to new to ensure we return the updated document
      );

      if (!user) {
        return res.status(404).json({
          // Handle error of invalid username provided
          message: "Thought created, but no user could be found!",
        });
      }
      res.json("Brainstormed!"); // Send confirmation
    } catch (err) {
      res.status(500).json(err); // Handle error
    }
  },
  async deleteThought(req, res) {
    // DELETE route to delete thought by provided thought ID
    try {
      const thought = await Thought.findOneAndDelete({
        // Find and delete thought from request parameter
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" }); // Handle error of invalid ID
      }

      const user = await User.findOneAndUpdate(
        // Find corresponding user based on the thought ID
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }, // Remove thought from user's array
        { new: true } // Ensure we return the updated document
      );
      res.json({ message: "Thought successfully deleted!" }); // Send confirmation
    } catch (err) {
      res.status(500).json(err); // Handle error
    }
  },
  async updateThought(req, res) {
    // PUT route to update a thought by provided ID
    try {
      const result = await Thought.findOneAndUpdate(
        // Finds document with corresponding thought ID
        { _id: req.params.thoughtId },
        // Updates document from req.body
        req.body,
        // Sets to true so updated document is returned; Otherwise original document will be returned
        { new: true }
      );
      res.status(200).json(result); // Send updated thought as confirmation
    } catch (err) {
      res.status(500).json({ error: err }); // Handle error
    }
  },
  //-------------- REACTION ROUTES-----------------
  async addReaction(req, res) {
    // POST route to add a new reaction
    try {
      const thought = await Thought.findOneAndUpdate(
        // Find the thought from the provided thought ID and add the reaction to the array
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true } // Set new to true so updated document gets returned
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" }); // Handle error of invalid thought ID
      }
      res.json(thought); // Return updated thought as response
    } catch (err) {
      res.status(500).json(err); // Handle error
    }
  },
  async deleteReaction(req, res) {
    // DELETE route to delete a reaction
    try {
      const thought = await Thought.findOneAndUpdate(
        // Find thought from the provided ID, and remove the reaction (from reaction ID) from its reactions array
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true } // Set new to true so updated document gets returned
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" }); // Handle error of invalid thought ID
      }

      res.json(thought); // Return updated thought as response
    } catch (err) {
      res.status(500).json(err); // Handle error
    }
  },
};
