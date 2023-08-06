import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HeaderBarComponent } from './header-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileOptionsComponent } from './profile/profile-options/profile-options.component';
import { LoginBoxComponent } from './profile/login-box/login-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    SearchBarComponent,
    HeaderBarComponent,
    ProfileComponent,
    ProfileOptionsComponent,
    LoginBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    HeaderBarComponent
  ]
})
export class HeaderModule { }
