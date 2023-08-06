import { Component, OnInit } from '@angular/core';
import { User } from './data_types/user';
import { Comment } from './data_types/comment';
import { UserService } from './data-services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    readonly title = "Recurve"

    constructor(private userService: UserService){}
    ngOnInit(): void {

    }
    
}
