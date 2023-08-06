import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommunityService } from 'src/app/data-services/community.service';
import { PostService } from 'src/app/data-services/post.service';
import { UserService } from 'src/app/data-services/user.service';
import { Community } from 'src/app/data_types/community';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
    activeUser!: User | undefined
    communities!: Array<Community>
    posts!: Array<Post>
    community!: Community
    count!: number
    page!: number

    constructor(private route: ActivatedRoute, private postService: PostService, private userService: UserService, private communityService: CommunityService, private router: Router) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.page = parseInt(params.get("page")!)
            this.postService.getAllPosts(this.page, 0).subscribe((data) => {
                this.posts = data
            })
    
        })

        this.postService.getAllPostCount().subscribe((data) => {
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
        

        this.communityService.getCurrentCommunity(null).subscribe((data) => {
            this.community = data
        })
    }

    async changeSort(event: number) {
        this.posts = await firstValueFrom(this.postService.getAllPosts(this.page, event))
        this.router.navigateByUrl('/home/1')
    }
}
