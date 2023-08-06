import { Injectable } from '@angular/core';
import { User } from '../data_types/user';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { LoginService } from './login.service';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginInfo } from '../data_types/loginInfo';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly rootUrl = "https://ccpadev-mco3.onrender.com/"
    private activeUserSource = new BehaviorSubject<User | undefined>(undefined)
    activeUser = this.activeUserSource.asObservable()

    constructor(private loginService: LoginService, private http: HttpClient) { }

    /* DB Access */
    getUser(userId: string | undefined) {
        const endpoint = "/user/"

        if(userId === undefined) {
            return new Observable<User>(undefined)
        } else {
            return this.http.get<User>(`${this.rootUrl}${endpoint}${userId}`)
        }
    }

    getCommunityUsers(communityId: string) {
        const endpoint = "/user/community/" 
        return this.http.get<User>(`${this.rootUrl}${endpoint}${communityId}`)
    }

    private newUser(user: User) {
        const endpoint = "/user" 
        return this.http.post<User>(`${this.rootUrl}${endpoint}`, user.toSchema())
    }

    editUser(user: User) {
        const endpoint = "/user/" 
        return this.http.patch(`${this.rootUrl}${endpoint}${user._id}`, user.toSchema()).subscribe()
    }

    updatePassword(userId: string, password: string) {
        const endpoint = "/user/password/" 
        return this.http.patch(`${this.rootUrl}${endpoint}${userId}`, {"password": password}).subscribe()
    }

    deleteUser(userId: string) {
        const endpoint = "/user/" 
        return this.http.delete(`${this.rootUrl}${endpoint}${userId}`).subscribe()
    }

    private async setActiveUser(userId: string | undefined) {
        if(userId !== undefined) {
            const res = await firstValueFrom(this.getUser(userId))
            this.activeUserSource.next(res)
        } else {
            this.activeUserSource.next(undefined)
        }
    }

    async reloadActiveUser(userId: string) {
        const res = await firstValueFrom(this.getUser(userId))
        this.activeUserSource.next(res)
    }

    async login(loginInfo: LoginInfo): Promise<boolean> {
        const userId = await this.loginService.validate_login(loginInfo)

        if(userId === "") {
            return false
        } else {
            await this.setActiveUser(userId)
            return true
        }
    }

    async logout() {
        this.setActiveUser(undefined)
        const endpoint = "/logout" 
        await firstValueFrom(this.http.get(`${this.rootUrl}${endpoint}`))
    }

    async signup(signup_info: LoginInfo): Promise<boolean> {
        const valid = await this.loginService.validate_signup(signup_info)
        
        if(valid) {
            const user = await firstValueFrom(this.newUser(new User(signup_info.userId, signup_info.userId, signup_info.password, "Write anything you'd like about yourself", `${signup_info.userId}.png`, new Date())))
            this.activeUserSource.next(user)
            return true
        } else {
            return false
        }
    }

    async sessionManager() {
        const hasUser = await firstValueFrom(this.loginService.checkForActiveSession())

        if(hasUser) {
            this.activeUserSource.next(hasUser)
        }
    }
}
