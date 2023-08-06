import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/data-services/user.service';
import { LoginInfo } from 'src/app/data_types/loginInfo';

@Component({
	selector: 'app-login-box',
	templateUrl: './login-box.component.html',
	styleUrls: ['./login-box.component.css']
})

export class LoginBoxComponent {
	@Input() is_open = false
    @Output() closeEvent = new EventEmitter<boolean>()
    @Output() loginSuccessEvent = new EventEmitter<boolean>()
	
	login_info = this.formBuilder.group({
		userId: '',
		password: '',
		rememberFlag: false,
	})

    constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {}

    async submit() {
        const credentials = new LoginInfo(this.login_info.value.userId!, this.login_info.value.password!, (this.login_info.value.rememberFlag) ? this.login_info.value.rememberFlag : false)
        const login_successful: boolean = await this.userService.login(credentials).then((value) => {
            return value
        })

        if(login_successful) {
            this.is_open = false
            this.loginSuccessEvent.emit(true)
            this.closeEvent.emit(false)
            this.router.navigate([''])
        } else {
            alert("INVALID")
        }
        
        this.login_info.reset()
    }

    close_modal() {
        this.is_open = false
        this.closeEvent.emit(false)
        this.login_info.reset()
    }
}
