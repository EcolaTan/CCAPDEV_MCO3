import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from 'src/app/data-services/community.service';
import { PostService } from 'src/app/data-services/post.service';
import { UserService } from 'src/app/data-services/user.service';
import { Community } from 'src/app/data_types/community';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.css']
})
export class CommunityPageComponent implements OnInit {
    activeUser!: User | undefined
    communities!: Array<Community>
    posts!: Array<Post>
    community!: Community
    count!: number
    communityId!: string
    page!: number

    constructor(private route: ActivatedRoute, private postService: PostService, private userService: UserService, private communityService: CommunityService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.communityId = params.get("community")!
            this.page = parseInt(params.get("page")!)

            this.postService.getCommunityPosts(this.communityId, this.page).subscribe((data) => {
                this.posts = data
            })

            this.communityService.getCurrentCommunity(this.communityId).subscribe((data) => {
                this.community = data
            })
        })

        this.postService.getAllCommunityPostCount(this.communityId).subscribe((data) => {
            this.count = data
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
