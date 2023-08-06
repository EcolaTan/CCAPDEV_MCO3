import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/data_types/post';
import { Comment } from 'src/app/data_types/comment';
import { Community } from 'src/app/data_types/community';

@Component({
    selector: 'app-view-post',
    templateUrl: './view-post.component.html',
    styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {
    @Input() loadedPost!: Post
    @Input() commentList!: Array<Comment>
    @Input() community! : Community
}
