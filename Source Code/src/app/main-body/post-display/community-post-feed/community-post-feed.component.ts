import { Component, Input } from '@angular/core';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';
import { Community } from 'src/app/data_types/community';
import { PostService } from 'src/app/data-services/post.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-post-feed',
  templateUrl: './community-post-feed.component.html',
  styleUrls: ['./community-post-feed.component.css']
})
export class CommunityPostFeedComponent {
    @Input() posts!: Array<Post>
    @Input() activeUser!: User | undefined
    @Input() currentCommunity!: Community
    @Input() page!: number
    @Input() count!: number

    constructor(private postService: PostService, private router: Router) {}

    async listenReload(event: Event) {
        this.posts = await firstValueFrom(this.postService.getCommunityPosts(this.currentCommunity._id, this.page))
    }

    goBack() {
        this.router.navigateByUrl(`community/${this.currentCommunity._id}/${(this.page - 1)}`)
    }

    goNext() {
        this.router.navigateByUrl(`community/${this.currentCommunity._id}/${(this.page + 1)}`)
    }
}
