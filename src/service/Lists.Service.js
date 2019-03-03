import ListsModel from '../models/Lists.Model';

class ListsService {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.deleteAt = data.deleteAt;
        this.description = data.description;

        this.todos = data.todos || [];
        this.users = data.users || [];
    }

    changeInfo() {
        const userQuery = { _id: this._id };
        const userUpdate = {
            name: this.name,
            description: this.description,

            todos: this.todos,
            users: this.users,
        };

        return ListsModel.updateOne(userQuery, userUpdate);
    }


    create() {
        const user = new ListsModel(this);
        return user.save();
    }
}

export default ListsService;
