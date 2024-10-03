const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
  
        if (!user) {
          return res.status(404).json({
            message: 'Thought created, but no user could be found!',
          });
        }
  
        res.json('Brainstormed!');
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  
  },
  async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
        console.log(user);
        res.json({ message: 'Thought successfully deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
  },
  async updateThought(req, res) {
    try {
        const result = await Thought
          .findOneAndUpdate(
            // Finds document with corresponding thought ID
            { _id: req.params.thoughtId },
            // Updates document from req.body
            req.body,
            // Sets to true so updated document is returned; Otherwise original document will be returned
            { new: true }
          );
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } catch (err) {
          console.log('Sorry, something went wrong!');
          res.status(500).json({ error: err });
  }      
  }
}
