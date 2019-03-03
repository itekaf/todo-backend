import CourseModel from '../models/Course.Model';

class CoursesService {
    constructor(data) {
        this._id = data._id;
        this.name = data.name;
        this.length = data.length;
        this.isTopRated = data.isTopRated;
        this.date = data.date;
        this.deleteAt = data.deleteAt;
        this.description = data.description;

        this.playlist = data.playlist || [];
    }

    changeInfo() {
        const userQuery = { _id: this._id };
        const userUpdate = {
            name: this.name,
            length: this.length,
            isTopRated: this.isTopRated,
            date: this.date,
            deleteAt: this.deleteAt,
            description: this.description,

            playlist: this.playlist,
        };

        return CourseModel.updateOne(userQuery, userUpdate);
    }


    create() {
        const user = new CourseModel(this);
        return user.save();
    }
}

export default CoursesService;
