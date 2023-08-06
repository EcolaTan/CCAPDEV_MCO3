import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitySidebarComponent } from './community-sidebar/community-sidebar.component';
import { InfoSidebarComponent } from './info-sidebar/info-sidebar.component';
import { CommentDisplayModule } from './comment-display/comment-display.module';
import { PostDisplayModule } from './post-display/post-display.module';
import { AboutModalComponent } from './info-sidebar/about-modal/about-modal.component';
import { RuleModalComponent } from './info-sidebar/rule-modal/rule-modal.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CommunitySidebarComponent,
        InfoSidebarComponent,
        AboutModalComponent,
        RuleModalComponent,
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
		CommunitySidebarComponent,
		InfoSidebarComponent,
		CommentDisplayModule,
        PostDisplayModule,
        UserSettingsModule
    ]
})

export class MainBodyModule {}
