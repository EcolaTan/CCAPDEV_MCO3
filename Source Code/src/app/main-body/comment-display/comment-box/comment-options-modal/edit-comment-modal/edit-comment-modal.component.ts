import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { IsPathDefaultUndefined } from 'mongoose/types/inferschematype';
import { CommentService } from 'src/app/data-services/comment.service';
import { UserService } from 'src/app/data-services/user.service';
import { Comment } from 'src/app/data_types/comment';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-edit-comment-modal',
  templateUrl: './edit-comment-modal.component.html',
  styleUrls: ['./edit-comment-modal.component.css']
})
export class EditCommentModalComponent implements OnInit{
    @Input() is_open = false
    @Input() comment!: Comment
    @Output() closeEvent = new EventEmitter<boolean>()
    @Output() editEvent = new EventEmitter<boolean>()
    @Output() closeOptions = new EventEmitter<boolean>()
    activeUser!: User | undefined

    edit_comment!: any

    constructor(private commentService: CommentService, private userService: UserService, private formBuilder: NonNullableFormBuilder){}

    ngOnInit() {
        this.userService.activeUser.subscribe((activeUser) => {
            this.activeUser = activeUser
        }) 

        this.edit_comment = this.formBuilder.group({
            text: [this.comment!.text, [Validators.required]]
        })
    }

    close_modal() {
        this.is_open = false
        this.closeEvent.emit(this.is_open)
    }
    
    edit_comment_submit(event:Event) {
        event.preventDefault()
        if(this.edit_comment.value.text != "") {
            var commentinfo = new Comment(
                this.comment._id,
                this.comment.poster,
                this.edit_comment.value.text!,
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
                true
            );
            this.commentService.editComment(commentinfo);

            this.editEvent.emit(true)
        }

        if (this.comment.edited != true){
            this.comment.edited = true
        }
        this.close_modal()
        this.closeOptions.emit(false)
    }
}
