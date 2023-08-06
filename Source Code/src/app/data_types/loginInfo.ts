export class LoginInfo {
    userId: string
    password: string
    rememberFlag: boolean
    
    constructor(userId: string, password: string, rememberFlag: boolean) {
        this.userId = userId
        this.password = password
        this.rememberFlag = rememberFlag
    }
}