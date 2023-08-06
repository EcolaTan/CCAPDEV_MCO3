import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSectionComponent } from './profile-section/profile-section.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileCommentsComponent } from './profile-comments/profile-comments.component';
import { CommentDisplayModule } from '../comment-display/comment-display.module';
import { PostDisplayModule } from '../post-display/post-display.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProfileCommentsBoxComponent } from './profile-comments-box/profile-comments-box.component';

@NgModule({
  declarations: [
    ProfileSectionComponent,
    ProfilePostsComponent,
    ProfileCommentsComponent,
    ProfileCommentsBoxComponent
  ],
  imports: [
    CommonModule,
    CommentDisplayModule,
    PostDisplayModule,
    AppRoutingModule
  ],
  exports: [
    ProfileSectionComponent,
    ProfilePostsComponent,
    ProfileCommentsComponent
  ]
})
export class UserProfileSectionsModule { }
