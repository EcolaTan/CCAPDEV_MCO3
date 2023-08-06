import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from 'src/app/data-services/community.service';
import { PostService } from 'src/app/data-services/post.service';
import { QueryService } from 'src/app/data-services/query.service';
import { UserService } from 'src/app/data-services/user.service';
import { Community } from 'src/app/data_types/community';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
    activeUser!: User | undefined
    communities!: Array<Community>
    posts!: Array<Post>
    community!: Community
    count!: number
    no_results = false
    
    query!: string
    page!: number

    constructor(private route: ActivatedRoute, private queryService: QueryService, private userService: UserService, private communityService: CommunityService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.query = params.get('query')!
            this.page = parseInt(params.get("page")!)

            this.queryService.getResultCount().subscribe((data) => {
                this.count = data
            })

            this.queryService.getPosts(this.query, this.page).subscribe((data) => {
                this.posts = data
                if (this.count < 1){
                    this.no_results = true
                } else {
                    this.no_results = false
                }
            })
    
        })

        this.queryService.getPosts(this.query, this.page).subscribe((data) => {
            this.posts = data
        })

        this.userService.sessionManager()

        this.userService.activeUser.subscribe((user) => {
            this.activeUser = user

            this.communities = []

            this.communityService.getAllCommunities().subscribe((data) => {
                this.communities = data
            })
        })
        
        this.communityService.getCurrentCommunity(null).subscribe((data) => {
            this.community = data
        })
    }
}
