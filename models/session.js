import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  uid: { type: mongoose.Types.ObjectId, required: true },
});

export default mongoose.model('Session', sessionSchema);