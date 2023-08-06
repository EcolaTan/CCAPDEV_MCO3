import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/data_types/post';
import { PostService } from 'src/app/data-services/post.service';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostInfo } from 'src/app/data_types/postInfo';
import { UserService } from 'src/app/data-services/user.service';
import { User } from 'src/app/data_types/user';
import { Community } from 'src/app/data_types/community';
import { CommunityService } from 'src/app/data-services/community.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css']
})
export class EditPostModalComponent implements OnInit{
    @Input() is_open = false
    @Input() post!: Post
    @Output() closeEvent = new EventEmitter<boolean>()
    @Output() editEvent = new EventEmitter<boolean>()

    activeUser: User | undefined
    
    post_id!: string
    community_id!: string
    community!: Community

    edit_post!: any
    
    constructor(private userService: UserService, private postService: PostService, private formBuilder: NonNullableFormBuilder, private route: ActivatedRoute, private communityService: CommunityService){}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.post_id = params.get("post")!
            this.community_id = params.get("community")!
        })

        this.userService.activeUser.subscribe((data) => {
          this.activeUser = data
        })

        this.communityService.getCurrentCommunity(this.community_id).subscribe((data) => {
          this.community = data
        })

        this.edit_post = this.formBuilder.group({
            title: [this.post?.title, [Validators.required]],
            body: [this.post?.body, [Validators.required]]
        })
    }

    close_modal() {
      this.is_open = false
      this.closeEvent.emit(this.is_open)
    }

    async edit_post_submit(event: Event){
        event.preventDefault()
        var editedInfo = new PostInfo((this.edit_post.value.title === "") ? this.post.title: this.edit_post.value.title, (this.edit_post.value.body === "") ? this.post.body : this.edit_post.value.body)
        var valid = this.postService.validateData(editedInfo)
        if(valid) {
            var isEdited = false
            if(this.post.title !== this.edit_post.value.title || this.post.body !== this.edit_post.value.body) {
                isEdited = true
            }
            const editedPost = this.postService.editTitleAndBody(this.post, editedInfo.title!, editedInfo.body!)
            await firstValueFrom(this.postService.editPost(new Post(editedPost._id, editedPost.community, editedPost.title, editedPost.body,editedPost.poster,editedPost.upvotes,editedPost.upvoters,editedPost.downvotes,editedPost.downvoters,editedPost.comments,editedPost.commenters,editedPost.postDate,true)))
            this.editEvent.emit(isEdited)
        } else {
            alert("Error!")
        }
        
        this.close_modal()
    }
}
