import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  ],
  goals: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Goal",
      required: true
    }
  ]
});

export default mongoose.model("User", userSchema);
