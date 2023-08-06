import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ResourceNotFoundComponent } from './resource-not-found/resource-not-found.component';



@NgModule({
  declarations: [
    UnauthorizedComponent,
    ResourceNotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UnauthorizedComponent,
    ResourceNotFoundComponent
  ]
})
export class ErrorDisplayModule { }
