const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId, // id of the events user created
      ref: "Event", // name of the model you want to connect
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
