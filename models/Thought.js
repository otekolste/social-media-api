const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => createdAt.toLocaleDateString("en-US"), // Getter to format date
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    // Include virtuals
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

// Initialize the User model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
