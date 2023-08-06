import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/data-services/comment.service';
import { PostService } from 'src/app/data-services/post.service';
import { UserService } from 'src/app/data-services/user.service';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';
import { Comment } from 'src/app/data_types/comment';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
    activeTab = 0
    userId!: string 
    loadedUser!: User
    activeUser!: User | undefined
    postList!: Array<Post>
    commentList!: Array<Comment>
    postCount!: number
    commentCount!: number

    constructor(private route: ActivatedRoute, private postService: PostService, private userServices: UserService, private commentService: CommentService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.userId = params.get('username')!
        })

        this.userServices.getUser(this.userId)?.subscribe((data) => [
            this.loadedUser = data
        ])

        this.userServices.sessionManager()

        this.userServices.activeUser.subscribe((user) => {
            this.activeUser = user
        })

        this.postService.getUserPosts(this.userId, 1).subscribe((data) => {
            this.postList = data
        })

        this.commentService.getUserComments(this.userId, 1).subscribe((data) => {
            this.commentList = data
        })

        this.commentService.getCountUserComments(this.userId).subscribe((data) => {
            this.commentCount = data
        })

        this.postService.getUserPostCount(this.userId).subscribe((data) => {
            this.postCount = data
        })
    }

    listenSwap(swapEvent: number) {
        this.activeTab = swapEvent
    }
}
