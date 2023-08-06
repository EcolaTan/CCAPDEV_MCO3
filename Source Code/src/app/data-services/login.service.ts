import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo } from '../data_types/loginInfo';
import { firstValueFrom } from 'rxjs';
import { User } from '../data_types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private readonly rootUrl = "http://localhost:2000"

    constructor(private http: HttpClient) { }

    async validate_login(login_info: LoginInfo): Promise<string> {
        const userId = await firstValueFrom(this.http.post<string>(`${this.rootUrl}/login`, login_info))

        if(userId !== "") {
            return userId
        } else {
            return ""
        }
    }

    async validate_signup(signup_info: LoginInfo): Promise<boolean> {
        const response = await firstValueFrom(this.http.get<boolean>(`${this.rootUrl}/signup/${signup_info.userId}`))
        return response
    }

    checkForActiveSession() {
        return this.http.get<User | null>(`${this.rootUrl}/get/sessions`)
    }
}
