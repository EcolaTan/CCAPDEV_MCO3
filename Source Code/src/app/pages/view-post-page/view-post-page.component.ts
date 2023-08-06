import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/data-services/comment.service';
import { CommunityService } from 'src/app/data-services/community.service';
import { PostService } from 'src/app/data-services/post.service';
import { UserService } from 'src/app/data-services/user.service';
import { Community } from 'src/app/data_types/community';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';
import { Comment } from 'src/app/data_types/comment';

@Component({
    selector: 'app-view-post-page',
    templateUrl: './view-post-page.component.html',
    styleUrls: ['./view-post-page.component.css']
})
export class ViewPostPageComponent {
    activeUser!: User | undefined
    communities!: Array<Community>
    loadedPost!: Post
    community!: Community
    commentList!: Array<Comment>
    
    communityId!: string
    postId!: string

    constructor(private route: ActivatedRoute, private postService: PostService, private userService: UserService, private communityService: CommunityService, private commentService: CommentService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.communityId = params.get("community")!
            this.postId = params.get("post")!
        })

        this.commentService.getPostComments(this.postId).subscribe((data) => {
            this.commentList = data
        })

        this.postService.getCurrentPost(this.postId).subscribe((data) => {
            this.loadedPost = data
        })

        this.userService.sessionManager()

        this.userService.activeUser.subscribe((user) => {
            this.activeUser = user

            this.communities = []

            this.communityService.getAllCommunities().subscribe((data) => {
                this.communities = data
            })
        })
        
        this.communityService.getCurrentCommunity(this.communityId).subscribe((data) => {
            this.community = data
        })
    }
}
