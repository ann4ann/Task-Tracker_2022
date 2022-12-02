import mongoose from "mongoose";

const Schema = mongoose.Schema;

const goalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isMainGoal: {
    type: Boolean,
    default: false,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  reward: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  ],
});

export default mongoose.model("Goal", goalSchema);
