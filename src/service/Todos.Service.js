import TodosModel from '../models/Todos.Model';

class TodosService {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.done = data.done;
        this.dateTo = data.dateTo;
        this.deleteAt = data.deleteAt;
        this.description = data.description;

        this.list = data.list;
    }

    changeInfo() {
        const userQuery = { _id: this._id };
        const userUpdate = {
            name: this.name,
            done: this.done,
            dateTo: this.dateTo,
            description: this.description,
        };

        return TodosModel.updateOne(userQuery, userUpdate);
    }


    create() {
        const user = new TodosModel(this);
        return user.save();
    }
}

export default TodosService;
