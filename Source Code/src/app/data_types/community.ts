import { User } from "./user"

export class Community {
    _id: string
    name: string
    about: string
    members: Array<User>
    memberCount: number
    icon: string
    rules: Array<string>
    createdOn: Date

    constructor(_id: string, name: string, members: Array<User>, icon: string, rules: Array<string>, about: string, createdOn: Date) {
        this._id = _id
        this.name = name
        this.members = members
        this.memberCount = this.members.length
        this.icon = icon
        this.rules = rules
        this.about = about
        this.createdOn = createdOn
    } 

    toSchema(): Object {
        var memberList = this.members.map((member: User) => {
            return member._id
        })
        
        return {
            _id: this._id,
            name: this.name,
            about: this.about,
            members: memberList,
            icon: this.icon,
            rules: this.rules
        }
    }
}