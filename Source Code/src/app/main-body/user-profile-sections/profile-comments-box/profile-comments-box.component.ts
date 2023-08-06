import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/data_types/comment';
import { User } from 'src/app/data_types/user';
import { UserService } from 'src/app/data-services/user.service';
import { CommentService } from 'src/app/data-services/comment.service';

@Component({
  selector: 'app-profile-comments-box',
  templateUrl: './profile-comments-box.component.html',
  styleUrls: ['./profile-comments-box.component.css']
})
export class ProfileCommentsBoxComponent {
    /* Attributes */
    activeUser: User | undefined
    @Input() comment!: Comment
    vote: number = 0
    requestBuffer: ReturnType<typeof setTimeout> | null = null
    useDefault = false

    /* Constructor */
    constructor(private userService: UserService, private commentService: CommentService) {}

    /* Initialization */
    ngOnInit() {
        this.userService.activeUser.subscribe((user) => {
            this.activeUser = user
        })

        if(this.activeUser !== undefined) {
            if(this.comment.upvoters.includes(this.activeUser!._id)) {
                this.vote = 1
            } else if(this.comment.downvoters.includes(this.activeUser!._id)) {
                this.vote = -1
            } else {
                this.vote = 0
            }
        }
    }

    /* Methods */
    upvote() {
        if(this.activeUser !== undefined) {
            switch(this.vote) {
                case 1:
                    this.vote = 0
                    this.comment.upvoters.splice(this.comment.upvoters.indexOf(this.activeUser!._id), 1)
                    this.comment.upvotes--
                    break
                case -1: 
                    this.vote = 1
                    this.comment.upvoters.push(this.activeUser!._id)
                    this.comment.downvoters.splice(this.comment.downvoters.indexOf(this.activeUser!._id), 1)
                    this.comment.upvotes++
                    this.comment.downvotes--
                    break
                default:
                    this.vote = 1
                    this.comment.upvoters.push(this.activeUser!._id)    
                    this.comment.upvotes++ 
            }
            
            if(this.requestBuffer !== null) {
                clearTimeout(this.requestBuffer)
            }

            this.requestBuffer = setTimeout(() => {
                const editedComment = new Comment(
                    this.comment._id,
                    this.comment.poster,
                    this.comment.text,
                    this.comment.layer,
                    this.comment.upvotes,
                    this.comment.upvoters,
                    this.comment.downvotes,
                    this.comment.downvoters,
                    this.comment.replies,
                    this.comment.replyingTo,
                    this.comment.parent_post_id,
                    this.comment.parent_community,
                    this.comment.postDate,
                    this.comment.edited
                )

                this.commentService.editComment(editedComment)
            }, 1000)
        }
        
    }
    
    downvote() {
        if(this.activeUser !== undefined) {
            switch(this.vote) {
                case 1:
                    this.vote = -1
                    this.comment.downvoters.push(this.activeUser!._id)
                    this.comment.upvoters.splice(this.comment.upvoters.indexOf(this.activeUser!._id), 1)
                    this.comment.upvotes--
                    this.comment.downvotes++
                    break
                case -1: 
                    this.vote = 0
                    this.comment.downvoters.splice(this.comment.downvoters.indexOf(this.activeUser!._id), 1)
                    this.comment.downvotes--
                    break
                default:
                    this.vote = -1 
                    this.comment.downvoters.push(this.activeUser!._id)
                    this.comment.downvotes++
            }

            if(this.requestBuffer !== null) {
                clearTimeout(this.requestBuffer)
            }

            this.requestBuffer = setTimeout(() => {
                const editedComment = new Comment(
                    this.comment._id,
                    this.comment.poster,
                    this.comment.text,
                    this.comment.layer,
                    this.comment.upvotes,
                    this.comment.upvoters,
                    this.comment.downvotes,
                    this.comment.downvoters,
                    this.comment.replies,
                    this.comment.replyingTo,
                    this.comment.parent_post_id,
                    this.comment.parent_community,
                    this.comment.postDate,
                    this.comment.edited
                )

                this.commentService.editComment(editedComment)
            }, 1000)
        }
    }

    swapDefault() {
        this.useDefault = true
    }
}
