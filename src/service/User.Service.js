import bcrypt from 'bcrypt';

import config from '../config';
import UserModel from '../models/User.Model';

class UserService {
    constructor(data) {
        this.name = data.name;
        this.username = data.username;
        this.password = data.password;
        this.providers = data.providers;
    }

    changeInfo() {
        const userQuery = { username: this.username };
        const userUpdate = {
            name: this.name,
            providers: this.providers,
        };

        return UserModel.updateOne(userQuery, userUpdate);
    }

    changePassword(newPassword, callback) {
        const userQuery = { username: this.username };
        const userUpdate = { password: this.createPassword(newPassword) };

        return UserModel.updateOne(userQuery, userUpdate, callback);
    }

    createPassword(password) {
        const salt = bcrypt.genSaltSync(+config.secret.password);
        return bcrypt.hashSync(password, salt);
    }

    create() {
        if (this.password) {
            this.password = this.createPassword(this.password);
        }
        const user = new UserModel(this);
        return user.save();
    }
}

export default UserService;
