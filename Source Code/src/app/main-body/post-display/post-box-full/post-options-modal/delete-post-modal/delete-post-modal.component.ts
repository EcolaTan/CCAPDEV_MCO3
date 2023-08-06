import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/data-services/post.service';
import { Post } from 'src/app/data_types/post';

@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: ['./delete-post-modal.component.css']
})
export class DeletePostModalComponent implements OnInit {
  @Input() is_open = false
  @Output() closeEvent = new EventEmitter<boolean>()
  @Input() post!: Post
  
  post_id!: string

  constructor(private postService: PostService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        this.post_id = params.get("post")!
    })
  }

  close_modal() {
      this.is_open = false
      this.closeEvent.emit(this.is_open)
  }

  delete_post(event: Event){
    this.postService.deletePost(this.post_id)
    this.close_modal()
  }
}
