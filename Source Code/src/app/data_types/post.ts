import { Community } from "./community";
import { User } from "./user";

export class Post {
    _id: string
    community: Community
    title: string
    body: string
    poster: User
    upvotes: number
    upvoters: Array<string>
    downvotes: number
    downvoters: Array<string>
    comments: number
    commenters: Array<User>
    postDate: Date
    edited: boolean

    constructor(_id: string, community: Community, title: string, body: string, poster: User, upvotes: number, upvoters: Array<string>, downvotes: number, downvoters: Array<string>, comments: number, commenters: Array<User>, postDate: Date, edited: boolean) {
        this._id = _id
        this.community = community
        this.title = title
        this.body = body
        this.poster = poster
        this.upvotes = upvotes
        this.upvoters = upvoters
        this.downvotes = downvotes
        this.downvoters = downvoters
        this.comments = comments
        this.commenters = commenters
        this.postDate = postDate
        this.edited = edited
    }

    toSchema(): Object {
        let commentersList = this.commenters.map((commenter: User) => {
            return commenter._id
        })

        return {
            _id: this._id,
            community: this.community,
            title: this.title,
            body: this.body,
            poster: this.poster._id,
            upvotes: this.upvotes,
            upvoters: this.upvoters,
            downvotes: this.downvotes,
            downvoters: this.downvoters,
            comments: this.comments,
            commenters: commentersList,
            postDate: this.postDate,
            edited: this.edited
        }
    }
}