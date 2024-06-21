import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
        passwordConform: {
            type: Number,
            required: [true, 'Password must be confirmed']
        },
        weight: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['male', 'female']
        },
        activeTimeSport: {
            type: String,
        },
        dailyWaterRate: {
            type: Number,
    },
    name: {
          type: String,
        },
  token: {
    type: String,
    default: null,
    },
    avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, {
    versionKey: false
  }
);

export default mongoose.model("User", contactSchema);