import mongoose from "mongoose";
import { ROLES } from "../constans/roles.js";

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: ROLES.USER,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
