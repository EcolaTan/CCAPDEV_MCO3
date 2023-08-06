import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Community } from 'src/app/data_types/community';
import { User } from 'src/app/data_types/user';
import { CommunityService } from 'src/app/data-services/community.service';
import { PostService } from 'src/app/data-services/post.service';
import { UserService } from 'src/app/data-services/user.service';
import { PostInfo } from 'src/app/data_types/postInfo';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
    @Input() activeUser!: User
    @Input() activeCommunity!: Community
    @Output() newPostEvent = new EventEmitter<Event>() 
    post = this.formBuilder.group({
        title: ["", [Validators.required]],
        body: ["", [Validators.required]]
    })

    constructor(private formBuilder: NonNullableFormBuilder, private postService: PostService) {}

    async new_post(event: Event) {
        event.preventDefault()
        var postInfo = new PostInfo(this.post.value.title!, this.post.value.body!)
        var valid = this.postService.validateData(postInfo)

        if(valid) {
            const post = this.postService.generatePost(postInfo, this.activeUser!, this.activeCommunity!)
            this.postService.newPost(post)
            setTimeout(() => {
                this.newPostEvent.emit();
                this.post.reset(); // Reset the form to clear the entries after creating a new post
            }, 50)
        } else {
            alert("Error!")
        }
    }
}