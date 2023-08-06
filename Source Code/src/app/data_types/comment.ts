import { User } from "./user"

export class Comment {
    _id: string;
    poster: User
    text: string
    layer: number
    upvotes: number
    upvoters: Array<String> 
    downvotes: number
    downvoters: Array<String>
    replies: Array<Comment>
    replyingTo: string
    parent_post_id: string
    parent_community: string
    postDate: Date
    edited: boolean

    constructor(_id: string, poster: User, text: string, layer: number, upvotes: number, upvoters: Array<String>, downvotes: number, downvoters: Array<String>, replies: Array<Comment>, replyingTo: string, parent: string, community: string, postDate: Date, edited: boolean) {
        this._id = _id;
        this.poster = poster
        this.text = text
        this.layer = layer
        this.upvotes = upvotes
        this.upvoters = upvoters
        this.downvotes = downvotes
        this.downvoters = downvoters
        this.replies = replies
        this.replyingTo = replyingTo
        this.parent_post_id = parent
        this.parent_community = community
        this.postDate = postDate
        this.edited = edited
    }

    toSchema(): Object {
        let repliesList = this.replies.map((reply: Comment) => {
            return reply._id
        })

        return {
            _id: this._id,
            poster: this.poster._id,
            text: this.text, 
            layer: this.layer,
            upvotes: this.upvotes,
            upvoters: this.upvoters,
            downvotes: this.downvotes,
            downvoters: this.downvoters,
            replies: repliesList,
            replyingTo: this.replyingTo,
            parentPostId: this.parent_post_id,
            parentCommunity: this.parent_community,
            postDate: this.postDate,
            edited: this.edited
        }
    }
}
