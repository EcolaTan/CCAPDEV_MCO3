import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { User } from 'src/app/data_types/user';
import { UserService } from 'src/app/data-services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	@ViewChild('profileOptions') profileOptions!: ElementRef;
	@ViewChild('profile') profile!: ElementRef
	login_modal_open = false
    logged_in!: boolean
    profile_actions_active = false;
    activeUser: User | undefined
    useDefault = false
    
	constructor(private renderer: Renderer2, private userService: UserService) {
		this.renderer.listen("window", "click", (e: Event) => {
			if(this.profileOptions !== undefined && this.profile !== undefined){
				if(e.target === this.profile.nativeElement || e.target === this.profileOptions.nativeElement || (<HTMLElement>e.target).parentNode === this.profile.nativeElement) {
					this.show()
				} else {
					this.hide()
				}
			} else {
                this.hide()
            }
		})
	}

    ngOnInit() {
        this.userService.activeUser.subscribe((activeUser) => {
            this.activeUser = activeUser

            if(this.activeUser !== undefined) {
                this.logged_in = true
            } else {
                this.logged_in = false
            }

            this.useDefault = false
        }) 
    }

    hide() {
		this.profile_actions_active = false
	}
    
    show() {
		this.profile_actions_active = true
	}

	open_login() {
		this.login_modal_open = true
	}

    listenCloseEvent(closeEvent: boolean) {
        this.login_modal_open = closeEvent
    }

    listenLogoutEvent(logoutEvent: boolean) {
        this.logged_in = logoutEvent
    }

    listenLoginSuccess(loginEvent: boolean) {
        this.logged_in = loginEvent
    }

    swapDefault() {
        this.useDefault = true
    }
}
