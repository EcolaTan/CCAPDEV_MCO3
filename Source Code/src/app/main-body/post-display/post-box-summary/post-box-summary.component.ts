import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';
import { PostService } from 'src/app/data-services/post.service';
import { UserService } from 'src/app/data-services/user.service';

@Component({
    selector: 'app-post-box-summary',
    templateUrl: './post-box-summary.component.html',
    styleUrls: ['./post-box-summary.component.css', './../post-box.css']
})
export class PostBoxSummaryComponent implements OnInit {
    @Input() post!: Post
    vote: number = 0
    activeUser: User | undefined
    requestBuffer: ReturnType<typeof setTimeout> | null = null
    formattedDate!: string

    constructor(private userService: UserService, private postService: PostService) {}

    ngOnInit() {
        this.userService.activeUser.subscribe((data) => {
            this.activeUser = data
        })
        
        if(this.activeUser !== undefined) {
            if(this.post.upvoters.includes(this.activeUser!._id)) {
                this.vote = 1
            } else if(this.post.downvoters.includes(this.activeUser!._id)) {
                this.vote = -1
            } else {
                this.vote = 0
            }
        }

        this.formattedDate = new Date(this.post.postDate).toLocaleString('default', {month:'long',day:'numeric',year:'numeric'})
    }

    /* Methods */
    upvote() {
        if(this.activeUser !== undefined) {
            switch(this.vote) {
                case 1:
                    this.vote = 0
                    this.post.upvoters.splice(this.post.upvoters.indexOf(this.activeUser!._id), 1)
                    this.post.upvotes--
                    break
                case -1: 
                    this.vote = 1
                    this.post.upvoters.push(this.activeUser!._id)
                    this.post.downvoters.splice(this.post.downvoters.indexOf(this.activeUser!._id), 1)
                    this.post.upvotes++
                    this.post.downvotes--
                    break
                default:
                    this.vote = 1
                    this.post.upvoters.push(this.activeUser!._id)    
                    this.post.upvotes++ 
            }

            if(this.requestBuffer !== null) {
                clearTimeout(this.requestBuffer)
            }

            this.requestBuffer = setTimeout(() => {
                const editedPost = new Post(this.post._id, this.post.community, this.post.title, this.post.body, this.post.poster, this.post.upvotes, this.post.upvoters, this.post.downvotes, this.post.downvoters, this.post.comments, this.post.commenters, this.post.postDate, this.post.edited)
                this.postService.editPost(editedPost).subscribe()
            }, 1000)
            
        }
    }

    downvote() {
        if(this.activeUser !== undefined) { 
            switch(this.vote) {
                case 1:
                    this.vote = -1
                    this.post.downvoters.push(this.activeUser!._id)
                    this.post.upvoters.splice(this.post.upvoters.indexOf(this.activeUser!._id), 1)
                    this.post.upvotes--
                    this.post.downvotes++
                    break
                case -1: 
                    this.vote = 0
                    this.post.downvoters.splice(this.post.downvoters.indexOf(this.activeUser!._id), 1)
                    this.post.downvotes--
                    break
                default:
                    this.vote = -1 
                    this.post.downvoters.push(this.activeUser!._id)
                    this.post.downvotes++
            }

            if(this.requestBuffer !== null) {
                clearTimeout(this.requestBuffer)
            }

            this.requestBuffer = setTimeout(() => {
                const editedPost = new Post(this.post._id, this.post.community, this.post.title, this.post.body, this.post.poster, this.post.upvotes, this.post.upvoters, this.post.downvotes, this.post.downvoters, this.post.comments, this.post.commenters, this.post.postDate, this.post.edited)
                this.postService.editPost(editedPost).subscribe()
            }, 1000)
            
        }
    }
}
