import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";
class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message);
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
export default InternalServerError;
