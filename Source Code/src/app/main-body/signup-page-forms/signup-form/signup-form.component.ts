import { Component, EventEmitter, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/data-services/user.service';
import { LoginInfo } from 'src/app/data_types/loginInfo';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.css', './../signup-page-forms.css']
})
export class SignupFormComponent {
    @Output() swapEvent = new EventEmitter<number>()
    signupInfo = this.formBuilder.group({
        sign_username: ['', [Validators.required]],
        sign_password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]]
    })

    constructor(private formBuilder: NonNullableFormBuilder, private userService: UserService, private router: Router) {}

    swap() {
        this.swapEvent.emit(1)
    }

    async submit(event: Event) {
        event.preventDefault()      
        if(this.signupInfo.value.sign_password !== this.signupInfo.value.confirm_password) {
            alert("Passwords do not match")
        } else {
            const signup = new LoginInfo(this.signupInfo.value.sign_username!, this.signupInfo.value.sign_password!, true)
            const valid = await this.userService.signup(signup)

            if(!valid) {
                alert('Username already taken')
            } else {
                this.router.navigateByUrl('/home/1')
            }
        }
    }
}
