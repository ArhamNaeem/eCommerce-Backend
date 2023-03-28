import CustomError from "./custom-error";

class BadRequest extends CustomError{
    constructor(message: string) {
        super(message)
        const statusCode = 400
    }
}
export default BadRequest