class ErrorHandler extends Error {
    status;
    errors;
    let errorHandler;
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = status;
    }
    static UnauthorizedError() {
        return errorHandler = new ErrorHandler(401, "User unauthorized");
    }
    static BadRequest(message, errors) {
        return errorHandler = new ErrorHandler(400, message, errors);
    }
}
export default errorHandler;
