import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentSectionComponent } from './comment-section.component';
import { CommentOptionsModalComponent } from './comment-box/comment-options-modal/comment-options-modal.component';
import { EditCommentModalComponent } from './comment-box/comment-options-modal/edit-comment-modal/edit-comment-modal.component';
import { ReplyModalComponent } from './comment-box/reply-modal/reply-modal.component';

@NgModule({
  declarations: [
    CommentBoxComponent,
    CommentSectionComponent,
    CommentOptionsModalComponent,
    EditCommentModalComponent,
    ReplyModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommentSectionComponent,
    CommentBoxComponent
  ]
})
export class CommentDisplayModule { }
