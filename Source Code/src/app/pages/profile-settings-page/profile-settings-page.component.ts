import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/data-services/user.service';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrls: ['./profile-settings-page.component.css']
})
export class ProfileSettingsPageComponent implements OnInit {
    activeUser: User | undefined
    loadedUser!: User
    username!: string
    authorized: boolean = false

    constructor(private route: ActivatedRoute, private userService: UserService) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.username = params.get("username")!
        })

        this.userService.sessionManager()

        this.userService.getUser(this.username).subscribe((user) => {
            this.loadedUser = user
            this.authorized = this.activeUser?._id === this.loadedUser?._id
        })

        this.userService.activeUser.subscribe((user) => {
            this.activeUser = user!
            this.authorized = this.activeUser?._id === this.loadedUser?._id
        })
    }
}
