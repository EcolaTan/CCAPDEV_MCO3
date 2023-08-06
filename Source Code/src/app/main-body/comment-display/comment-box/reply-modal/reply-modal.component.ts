import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/data-services/comment.service';
import { Comment } from 'src/app/data_types/comment';
import { CommentInfo } from 'src/app/data_types/commentInfo';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-reply-modal',
  templateUrl: './reply-modal.component.html',
  styleUrls: ['./reply-modal.component.css']
})
export class ReplyModalComponent{
    @Input() activeUser!: User | undefined
    @Input() is_open = false
    @Input() comment_parent!: Comment
    
    reply = this.formBuilder.group({
        body: ["", [Validators.required]]
    })
    @Output() closeEvent = new EventEmitter<boolean>()

    communityId!: string
    postId!: string
    

    constructor(private route: ActivatedRoute, private commentService: CommentService, private formBuilder: NonNullableFormBuilder){}
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.postId = params.get("post")!
            this.communityId = params.get("community")!
        })
    }

    close_modal() {
      this.is_open = false
      this.closeEvent.emit(this.is_open)
    }

    async reply_submit(event: Event){
        event.preventDefault()
        var commentInfo = new CommentInfo(this.reply.value.body!, this.comment_parent.layer + 1)
        var valid = this.commentService.validateData(commentInfo)

        if(valid) {
            const comment = this.commentService.generateComment(commentInfo,this.activeUser!, this.communityId,this.postId, this.comment_parent._id)
            const reply = await this.commentService.replyComment(comment, this.comment_parent._id)
            this.comment_parent.replies.push(reply)
        } else {
            alert("Error!")
        }
      
        this.close_modal()
    }
}
