import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';
import { PasswordModalComponent } from './user-settings-form/password-modal/password-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDisplayModule } from 'src/app/error-display/error-display.module';

@NgModule({
    declarations: [
        UserSettingsFormComponent,
        PasswordModalComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ErrorDisplayModule
    ], 
    exports: [
        UserSettingsFormComponent
    ]
})
export class UserSettingsModule { }
