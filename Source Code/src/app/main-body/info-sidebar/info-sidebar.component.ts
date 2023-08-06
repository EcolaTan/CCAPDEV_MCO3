import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { CommunityService } from 'src/app/data-services/community.service';
import { UserService } from 'src/app/data-services/user.service';
import { Community } from 'src/app/data_types/community';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-info-sidebar',
  templateUrl: './info-sidebar.component.html',
  styleUrls: ['./info-sidebar.component.css']
})
export class InfoSidebarComponent implements OnInit {
    about_modal_open = false
    rules_modal_open = false
    @Input() community!: Community
    @Input() activeUser!: User | undefined
    community_id!: string

    constructor(private userService: UserService, private route: ActivatedRoute, private communityService: CommunityService){}

    ngOnInit (){
      this.route.paramMap.subscribe((data) => {
        this.community_id = data.get("community")!
      })
    }

    open_about() {
      this.about_modal_open = true
    }

    open_rules() {
      this.rules_modal_open = true
    }

    listenCloseEvent(closeEvent: boolean) {
      this.about_modal_open = closeEvent
      this.rules_modal_open = closeEvent
    }
}
