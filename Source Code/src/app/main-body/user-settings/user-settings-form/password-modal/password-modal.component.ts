import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/data-services/profile.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.css']
})
export class PasswordModalComponent {
    @Input() is_open = false
    @Output() closeEvent = new EventEmitter<boolean>()
    password_details = this.formBuilder.group({
        new_password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]]
    })

    constructor(private formBuilder: NonNullableFormBuilder, private profileService: ProfileService) {}

    close() {
        this.closeEvent.emit(false)
    }
    
    submit(event: Event) {
        event.preventDefault()
        if(this.password_details.value.new_password === this.password_details.value.confirm_password && this.password_details.value.new_password !== undefined) {
            this.profileService.updatePassword(this.password_details.value.new_password)
            this.close()
        }
    }
}
