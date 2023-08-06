import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Comment } from '../../../data_types/comment';
import { User } from 'src/app/data_types/user';
import { UserService } from 'src/app/data-services/user.service'
import { CommentService } from 'src/app/data-services/comment.service';
import { Community } from 'src/app/data_types/community';
import { CommunityService } from 'src/app/data-services/community.service';
import { firstValueFrom } from 'rxjs';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
    /* Attributes */
    comment_options_active = false
    reply_modal_open = false
    activeUser: User | undefined
    @Input() comment!: Comment
    @Input() level!: number
    //-1 is downvote, 0 is no vote, 1 is upvote 
    vote: number = 0
    requestBuffer: ReturnType<typeof setTimeout> | null = null
    @Output() deleteRelay = new EventEmitter<boolean>()
    @Output() viewEvent = new EventEmitter<string>()
    useDefault = false

    /* Constants */
    private static readonly max_width = 850

    /* CSS Variables */
    effective_layer!: number
    private left_margin!: number
    private width!: number
    style!: Object
    
    /* Constructor */
    constructor(private renderer: Renderer2, private userService: UserService, private commentService: CommentService, private communityService: CommunityService, private router: Router) {}

    /* Initialization */
    ngOnInit() {
        this.effective_layer = this.comment.layer - (this.level * 3)
        this.left_margin = this.effective_layer * 25
        this.width = CommentBoxComponent.max_width - this.left_margin
        this.style = {
            "margin-left.px": this.left_margin,
            "width.px": this.width
        }
        
        this.userService.activeUser.subscribe((activeUser) => {
            this.activeUser = activeUser
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

    hide() {
		this.comment_options_active = false
	}
    
    show() {
        if(!this.comment_options_active){
		    this.comment_options_active = true
        } else {
            this.hide()
        }
	}

    show_comment_options() {
        this.comment_options_active = true
	}

    open_reply_modal() {
        this.reply_modal_open= true
    }

    listenCloseEvent(closeEvent: boolean) {
        this.reply_modal_open = closeEvent
    }

    listenOptionClose(e: boolean) {
        this.comment_options_active = e
    }

    async listenEditEvent(event: boolean) {
        this.comment = await firstValueFrom(this.commentService.reloadComment(this.comment._id))
    }

    listenDeleteEvent(event: boolean) {
        this.deleteRelay.emit(false)
    }

    listenChaining(event: boolean) {
        this.deleteRelay.emit(false)
    }

    goToUserProfile() {
        this.router.navigateByUrl('/user/'+this.comment.poster._id)
    }

    viewMore() {
        this.viewEvent.emit(this.comment._id)
    }

    viewChainer(event: string) {
        this.viewEvent.emit(event)
    }

    swapDefault() {
        this.useDefault = true
    }
}
