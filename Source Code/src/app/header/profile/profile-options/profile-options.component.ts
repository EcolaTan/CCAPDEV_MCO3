import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/data_types/user';
import { UserService } from 'src/app/data-services/user.service';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css']
})
export class ProfileOptionsComponent implements OnInit {
    @Output() logoutEvent: EventEmitter<boolean> = new EventEmitter<boolean>()
    activeUser!: User
    
    constructor(private userService: UserService) {}    

    ngOnInit() {
        this.userService.activeUser.subscribe((user) => {
            this.activeUser = user!
        })
    }

    logout() {
        this.logoutEvent.emit(false)
        this.userService.logout()
    }
}
