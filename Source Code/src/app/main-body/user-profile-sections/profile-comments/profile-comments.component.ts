import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommentService } from 'src/app/data-services/comment.service';
import { Comment } from 'src/app/data_types/comment';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.css']
})
export class ProfileCommentsComponent {
    @Input() commentList!: Array<Comment>
    @Input() loadedUser!: User
    @Input() count!: number
    page = 1

    constructor(private commentService: CommentService) {}

    async goBack() {
        this.page -= 1
        this.commentList = await firstValueFrom(this.commentService.getUserComments(this.loadedUser._id, this.page))
    }

    async goNext() {
        this.page += 1
        this.commentList = await firstValueFrom(this.commentService.getUserComments(this.loadedUser._id, this.page))
    }
}
