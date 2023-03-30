import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: [true, "Name must be provided"],
  },
  username: {
    type: String,
    minLength: 3,
    maxLength: 15,
    required: [true, "Username must be provided"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
    minLength: 6,
  },
});

export const UserModel = mongoose.model('User',UserSchema)
