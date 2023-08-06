import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentService } from 'src/app/data-services/comment.service';
import { Comment } from 'src/app/data_types/comment';

@Component({
  selector: 'app-comment-options-modal',
  templateUrl: './comment-options-modal.component.html',
  styleUrls: ['./comment-options-modal.component.css']
})
export class CommentOptionsModalComponent {
    @Input() comment!: Comment
    @Output() close = new EventEmitter<boolean>()
    @Output() editEvent = new EventEmitter<boolean>()
    @Output() deleteEvent = new EventEmitter<boolean>()
    edit_comment_modal_open = false

    constructor(private commentService: CommentService) {}

    open_edit_comment(){
      this.edit_comment_modal_open = true
    }

    listenCloseEvent(closeEvent: boolean) {
        this.edit_comment_modal_open = closeEvent
    }

    delete() {
        this.commentService.deleteComment(this.comment._id)
        this.close.emit(false)
        this.deleteEvent.emit(false)
    }

    listenEditEvent(editEvent: boolean) {
        this.editEvent.emit(false)
    }

    listenOptionClose(event: boolean) {
        this.close.emit(false)
    }
}
