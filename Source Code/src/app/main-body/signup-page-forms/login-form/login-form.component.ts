import { Component, EventEmitter, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/data-services/user.service';
import { LoginInfo } from 'src/app/data_types/loginInfo';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css', './../signup-page-forms.css']
})
export class LoginFormComponent {
    @Output() swapEvent = new EventEmitter<number>()
    loginInfo = this.formBuilder.group({
        userId: ['', [Validators.required]],
        password: ['', [Validators.required]],
        rememberFlag: [false],
    })

    constructor(private route: Router, private formBuilder: NonNullableFormBuilder, private userService: UserService) {}

    swap() {
        this.swapEvent.emit(0)
    }

    async submit() {
        const credentials = new LoginInfo(this.loginInfo.value.userId!, this.loginInfo.value.password!, (this.loginInfo.value.rememberFlag) ? this.loginInfo.value.rememberFlag : false)
        const login_successful: boolean = await this.userService.login(credentials).then((value) => {
            return value
        })

        if(login_successful) {
            this.route.navigate([""])
        } else {
            alert("INVALID")
        }
    }
}
