import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../data_types/comment';
import { CommentService } from 'src/app/data-services/comment.service';
import { User } from 'src/app/data_types/user';
import { UserService } from 'src/app/data-services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/data_types/post';
import { Community } from 'src/app/data_types/community';
import { PostService } from 'src/app/data-services/post.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
    /* Variables */
    input: string = ""
    activeUser: User | undefined
    @Input() comment_list: Array<Comment> = []
    @Input() community! : Community
    @Input() post! : Post
    level = 0

    constructor(private route: ActivatedRoute, private userService: UserService, private commentService : CommentService, private postService : PostService) {}

    ngOnInit() {
        this.userService.activeUser.subscribe((activeUser) => {
            this.activeUser = activeUser
        })
    }

    async new_comment() {
        if(this.input !== "") {
            var commnetinfo = new Comment('Add comment',this.activeUser!, this.input , 1, 0,[] ,0 ,[] ,[], "", this.post._id, this.community._id, new Date(), false);
            await firstValueFrom(this.commentService.newComment(commnetinfo));
            this.post.comments = this.post.comments+1;
            this.post.commenters.push(this.activeUser!);
            const editedPost = new Post(this.post._id, this.post.community, this.post.title, this.post.body, this.post.poster, this.post.upvotes, this.post.upvoters, this.post.downvotes, this.post.downvoters, this.post.comments, this.post.commenters, this.post.postDate, this.post.edited)
            await firstValueFrom(this.postService.editPost(editedPost))
            this.comment_list = await firstValueFrom(this.commentService.getPostComments(this.post._id))
            this.input = ""
        }
    }

    reloadDisplay(event: boolean) {
        setTimeout(async () => {
            this.comment_list = await firstValueFrom(this.commentService.getPostComments(this.post._id))
        }, 500)
    }   

    async manualReloadDisplay() {
        this.level = 0
        this.comment_list = await firstValueFrom(this.commentService.getPostComments(this.post._id))
    } 

    async refreshDisplay(event: string) {
        this.comment_list = await firstValueFrom(this.commentService.getFromRootComment(event))
        this.level = Math.floor(this.comment_list[0].layer / 3)
    }
}
