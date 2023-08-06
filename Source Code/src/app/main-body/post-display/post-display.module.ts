import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostBoxSummaryComponent } from './post-box-summary/post-box-summary.component';
import { PostBoxFullComponent } from './post-box-full/post-box-full.component';
import { HomepagePostFeedComponent } from './homepage-post-feed/homepage-post-feed.component';
import { SortingBoxComponent } from './sorting-box/sorting-box.component';
import { CreatePostComponent } from './community-post-feed/create-post/create-post.component';
import { CommunityPostFeedComponent } from './community-post-feed/community-post-feed.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { CommentDisplayModule } from '../comment-display/comment-display.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SearchPagePostFeedComponent } from './search-page-post-feed/search-page-post-feed.component';
import { PostOptionsModalComponent } from './post-box-full/post-options-modal/post-options-modal.component';
import { EditPostModalComponent } from './post-box-full/post-options-modal/edit-post-modal/edit-post-modal.component';
import { DeletePostModalComponent } from './post-box-full/post-options-modal/delete-post-modal/delete-post-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        PostBoxSummaryComponent,
        PostBoxFullComponent,
        HomepagePostFeedComponent,
        SortingBoxComponent, 
        CreatePostComponent, 
        CommunityPostFeedComponent, 
        ViewPostComponent, 
        SearchPagePostFeedComponent,
        PostOptionsModalComponent, 
        EditPostModalComponent, 
        DeletePostModalComponent
    ],
    imports: [
        CommonModule,
        CommentDisplayModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        HomepagePostFeedComponent,
        CommunityPostFeedComponent,
        ViewPostComponent,
        PostBoxSummaryComponent,
        SearchPagePostFeedComponent
    ]
})
export class PostDisplayModule { }
