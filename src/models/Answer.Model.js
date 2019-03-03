import ErrorModel from './Error.Model';

class AnswerModel {
    constructor(status, message = '', token = '') {
        this.data = {};
        this.status = status;
        this.errors = [];
        this.message = message;
        this.token = token;
    }

    get hasErrors() {
        return this.errors.length !== 0;
    }

    pushError(message) {
        const error = new ErrorModel(message);
        this.errors.push(error);
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setMessage(msg) {
        this.message = msg;
        return this;
    }

    setToken(token) {
        this.token = token;
        return this;
    }

    send(response) {
        const result = {
            data: this.data,
            token: this.token,
            errors: this.errors,
            message: this.message,
            hasErrors: this.hasErrors,
        };
        response.status(this.status).json(result);
    }

    static create(status) {
        const answer = new AnswerModel(status);
        return answer;
    }
}

export default AnswerModel;
