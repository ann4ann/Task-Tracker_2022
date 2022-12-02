import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  isImportant: {
    type: Boolean,
    default: false,
    required: true,
  },
  isUrgent: {
    type: Boolean,
    default: false,
    required: true,
  },
  deadline: {
    type: Date,
  },
  estimatedDuration: {
    type: Number,
  },
  durationInWork: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goal: {
    type: mongoose.Types.ObjectId,
    ref: "Goal",
    default: null,
  },
});

export default mongoose.model("Task", taskSchema);
