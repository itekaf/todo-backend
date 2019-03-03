import PlaylistModel from '../models/Playlists.Model';

class PlaylistsService {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.deleteAt = data.deleteAt;
        this.description = data.description;

        this.courses = data.courses || [];
        this.users = data.users || [];
    }

    changeInfo() {
        const userQuery = { _id: this._id };
        const userUpdate = {
            name: this.name,
            description: this.description,

            courses: this.courses,
            users: this.users,
        };

        return PlaylistModel.updateOne(userQuery, userUpdate);
    }


    create() {
        const user = new PlaylistModel(this);
        return user.save();
    }
}

export default PlaylistsService;
