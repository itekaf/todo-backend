import AnswerModel from '../models/Answer.Model';

const answerUtils = {
    token: (status, token, message = 'OK') => {
        const answer = AnswerModel.create(status);
        answer.setToken(token);
        answer.setMessage(message);
        return answer;
    },
    message: (status, message) => {
        const answer = AnswerModel.create(status);
        answer.setMessage(message);
        return answer;
    },
    data: (status, data, message = '') => {
        const answer = AnswerModel.create(status);
        answer.setData(data);
        answer.setMessage(message);
        return answer;
    },
    error: (status, message, data = {}) => {
        const answer = AnswerModel.create(status);
        answer.setData(data);
        answer.pushError(message);
        return answer;
    },
    errors: (status, errors, data = {}, query = null) => {
        const answer = AnswerModel.create(status);
        answer.setData(data);
        errors.forEach(error => answer.pushError(query ? query(error) : error));
        return answer;
    },
};

export default answerUtils;
