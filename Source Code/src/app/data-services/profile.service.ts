import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../data_types/user';
import { Settings } from '../data_types/settings';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    user!: User | undefined
    
    constructor(private userService: UserService) {
        this.userService.activeUser.subscribe((data) => {
            this.user = data
        })
    }

    async updateUserSettings(settings: Settings) {
        if(this.user !== undefined) {
            const user = new User(this.user._id, settings.name, this.user.password, settings.about, this.user.icon, this.user.joinDate)
            this.userService.editUser(user)
            this.reload(user._id)
        }
    }

    updatePassword(password: string) {
        if(this.user !== undefined) {
            this.userService.updatePassword(this.user._id, password)
        } 
    }

    private reload(userId: string) {
        this.userService.reloadActiveUser(userId)
    }
}
