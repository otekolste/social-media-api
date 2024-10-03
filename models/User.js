const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid email format",
      ], // Match valid email format (using RegEx)
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // Include virtuals
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of friends an user has
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });

userSchema.pre("findOneAndDelete", async function (next) {
  // Middleware; this function gets called before 'findOneAndDelete' gets called on an User document, and deletes all the thoughts written by the user
  const doc = await User.findOne(this.getQuery());
  console.log(`Deleting thoughts brainstormed by ${doc.username}`);
  await Thought.deleteMany({ username: doc.username });
  next();
});

// Initialize the User model
const User = model("user", userSchema);

module.exports = User;
