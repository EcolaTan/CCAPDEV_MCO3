import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterBarComponent } from './footer-bar.component';

@NgModule({
    declarations: [
        FooterBarComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FooterBarComponent
    ]
})
export class FooterModule { }