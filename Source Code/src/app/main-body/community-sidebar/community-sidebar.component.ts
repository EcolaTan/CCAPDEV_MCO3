import { Component, Input, OnInit } from '@angular/core';
import { Community } from 'src/app/data_types/community';
import { User } from 'src/app/data_types/user';
import { CommunityService } from 'src/app/data-services/community.service';
import { UserService } from 'src/app/data-services/user.service';

@Component({
    selector: 'app-community-sidebar',
    templateUrl: './community-sidebar.component.html',
    styleUrls: ['./community-sidebar.component.css']
})
export class CommunitySidebarComponent {
    @Input() communities!: Array<Community>
    @Input() activeUser!: User | undefined
}
