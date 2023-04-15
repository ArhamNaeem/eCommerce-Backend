import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { InternalServerError } from "../../errors";

interface UserDocument extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  createJWT: () => string;
  validatePassword: (candidatePassword:string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength:20,
    trim:true,
    required: [true, "Name must be provided"],
  },
  username: {
    type: String,
    minLength: 3,
    maxLength: 15,
    trim:true,
    required: [true, "Username must be provided"],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    sparse:true,
    required: false,
    trim:true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  
  },
  googleId: {
    type: Number,
    trim:true,
    required: false,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: false,
    minLength: 6,
  },
});

UserSchema.pre("save", async function () {
  if (!this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new InternalServerError("JWT SECRET NOT FOUND");
  }
  return jwt.sign({ userId: this._id, name: this.username }, jwtSecret, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.validatePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
