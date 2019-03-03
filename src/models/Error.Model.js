class ErrorModel {
    constructor(message, value, location, param) {
        this.param = param;
        this.value = value;
        this.message = message;
        this.location = location;
    }
}

export default ErrorModel;
