import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: String,
  prompt: String,
  responses: {
    model1: String,
    model2: String,
    model3: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Chat", chatSchema);
