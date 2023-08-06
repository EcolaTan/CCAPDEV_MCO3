import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Post } from 'src/app/data_types/post';
import { User } from 'src/app/data_types/user';
import { PostService } from 'src/app/data-services/post.service';
import { UserService } from 'src/app/data-services/user.service';

@Component({
    selector: 'app-post-box-full',
    templateUrl: './post-box-full.component.html',
    styleUrls: ['./post-box-full.component.css', './../post-box.css']
})
export class PostBoxFullComponent implements OnInit {
    @ViewChild('postOptionsButton') postOptionsButton!: ElementRef;
    @ViewChild('postOptions') postOptions!: ElementRef;
    @ViewChild('postOptionsModal') postOptionsModal!: ElementRef;
    @Input() post!: Post
    vote = 0
    activeUser: User | undefined
    post_options_active = false
    requestBuffer: ReturnType<typeof setTimeout> | null = null
    formattedDate!: string

    constructor(private renderer: Renderer2, private userService: UserService, private postService: PostService) {
        this.hide_post_options();
    }

    ngOnInit() {
        this.userService.activeUser.subscribe((data) => {
            this.activeUser = data

            if(this.activeUser !== undefined) {  
                if(this.post.upvoters.includes(this.activeUser!._id)) {
                    this.vote = 1
                } else if(this.post.downvoters.includes(this.activeUser!._id)) {
                    this.vote = -1
                } else {
                    this.vote = 0
                }
            }
        }) 
        
        this.formattedDate = new Date(this.post.postDate).toLocaleString('default', {month:'long',day:'numeric',year:'numeric'})
    }

    /* Methods */
    hide_post_options(){
        this.renderer.listen("window", "click", (e: Event) => {
            if(this.postOptions !== undefined){
              if((<HTMLElement>e.target).parentNode === this.postOptionsButton.nativeElement && this.post_options_active == false) {
                this.show()
              } else if((<HTMLElement>e.target).parentNode === this.postOptionsButton.nativeElement && this.post_options_active == true){
                this.hide()
              }
            } else {
                this.hide()
            }
          })
    }

    open_post_options() {
        this.post_options_active = true
    }

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
                    break
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
                    break
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

    hide() {
		this.post_options_active = false
	}
    
    show() {
		this.post_options_active = true
	}

    listenCloseEvent(event: boolean) {
        this.post_options_active = event
    }

    listenEditEvent($event: boolean) {
        this.post.edited = $event
    }
}
