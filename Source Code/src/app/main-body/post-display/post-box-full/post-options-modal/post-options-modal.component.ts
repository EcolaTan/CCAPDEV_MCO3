import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/data-services/user.service';
import { Post } from 'src/app/data_types/post';

@Component({
  selector: 'app-post-options-modal',
  templateUrl: './post-options-modal.component.html',
  styleUrls: ['./post-options-modal.component.css']
})
export class PostOptionsModalComponent {
    @Input() post!: Post
    @Output() closeEvent = new EventEmitter<boolean>()
    @Output() editEvent = new EventEmitter<boolean>()
    edit_post_modal_open = false
    delete_post_modal_open = false

    open_edit_post() {
      this.edit_post_modal_open = true
    }

    open_delete_post() {
      this.delete_post_modal_open = true
    }

    listenCloseEvent(closeEvent: boolean) {
        this.delete_post_modal_open = closeEvent
        this.edit_post_modal_open = closeEvent
        this.closeEvent.emit(false)
    }

    listenEditEvent(editEvent: boolean) {
        this.editEvent.emit(editEvent)
    }
}
