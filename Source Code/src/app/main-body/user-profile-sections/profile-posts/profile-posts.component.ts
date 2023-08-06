import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PostService } from 'src/app/data-services/post.service';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent {
    @Input() postList!: Array<Post>
    @Input() loadedUser!: User
    @Input() count!: number
    page = 1

    constructor(private postService: PostService) {}

    async goBack() {
        this.page -= 1
        this.postList = await firstValueFrom(this.postService.getUserPosts(this.loadedUser._id, this.page))
    }

    async goNext() {
        this.page += 1
        this.postList = await firstValueFrom(this.postService.getUserPosts(this.loadedUser._id, this.page))
    }
}
