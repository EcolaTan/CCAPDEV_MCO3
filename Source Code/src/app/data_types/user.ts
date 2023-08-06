import { Post } from "./post";
import { Comment } from "./comment";

export class User {
    _id: string
    name: string
    password: string
    about: string
    icon: string
    joinDate: Date

    constructor(_id: string, name: string, password: string, about: string, icon: string, joinDate: Date) {
        this._id = _id
        this.name = name
        this.password = password
        this.about = about
        this.icon = icon
        this.joinDate = joinDate
    }

    toSchema(): Object {
        return {
            _id: this._id,
            name: this.name,
            password: this.password,
            about: this.about,
            icon: this.icon,
            joinDate: this.joinDate
        }
    }
}