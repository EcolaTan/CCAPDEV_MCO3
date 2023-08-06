import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CommunityPageComponent } from './pages/community-page/community-page.component';
import { ProfileSettingsPageComponent } from './pages/profile-settings-page/profile-settings-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { ViewPostPageComponent } from './pages/view-post-page/view-post-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
    {
        path: "signup",
        component: SignupPageComponent,
    }, 
    {
        path: "search/:query/:page",
        component: SearchPageComponent,
    }, 
    {
        path: "community/:community/view/:post",
        component: ViewPostPageComponent
    },
    {
        path: "user/:username/settings",
        component: ProfileSettingsPageComponent
    },
    {
        path: "view/user/:username",
        component: UserProfilePageComponent,
    },
    {
        path: "community/:community/:page",
        component: CommunityPageComponent,
    },
    {
        path: "home/:page",
        component: HomepageComponent
    },
    {
        path: "home",
        redirectTo: "home/1",
        pathMatch: 'full'
    },
    {
        path: "",
        redirectTo: "home/1",
        pathMatch: 'full'
    },
    {
        path: "**",
        redirectTo: "home/1",
        pathMatch: 'full',
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
