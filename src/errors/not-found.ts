import { StatusCodes } from "http-status-codes";

import CustomError from "./custom-error";

class NotFound extends CustomError {
  constructor(message: string) {
    super(message);
    const statusCode = StatusCodes.NOT_FOUND;
  }
}
export default NotFound;
