import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { MainBodyModule } from '../main-body/main-body.module';
import { CommunityPageComponent } from './community-page/community-page.component';
import { ProfileSettingsPageComponent } from './profile-settings-page/profile-settings-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { ViewPostPageComponent } from './view-post-page/view-post-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { SignupPageFormsModule } from '../main-body/signup-page-forms/signup-page-forms.module';
import { UserProfileSectionsModule } from '../main-body/user-profile-sections/user-profile-sections.module';
import { ErrorDisplayModule } from '../error-display/error-display.module';
import { AboutPageComponent } from './about-page/about-page.component';


@NgModule({
    declarations: [
        HomepageComponent,
        CommunityPageComponent,
        ProfileSettingsPageComponent,
        SearchPageComponent,
        SignupPageComponent,
        UserProfilePageComponent,
        ViewPostPageComponent,
        AboutPageComponent,
    ],
    imports: [
        CommonModule,
        HeaderModule,
        FooterModule,
        MainBodyModule,
        AppRoutingModule,
        SignupPageFormsModule,
        UserProfileSectionsModule,
        ErrorDisplayModule
    ],
})
export class PagesModule { }
