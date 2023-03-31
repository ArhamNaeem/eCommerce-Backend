import { UserModel } from "../../models/auth/User";
import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { BadRequest, InternalServerError } from "../../errors";
export const register = async (req: any, res: any) => {
  const user = await UserModel.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).send({ user: user.name, token });
};
export const login = async (req: any, res: any) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    throw new BadRequest("Please provide required credentials");
  }
  //check via regex if user has entered username or an email on the frontend
  const user = username
    ? await UserModel.findOne({ username })
    : await UserModel.findOne({ email });
  if (!user) {
    throw new BadRequest("Invalid credentials");
  }
  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    throw new BadRequest("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ name: user.username, token });
};
