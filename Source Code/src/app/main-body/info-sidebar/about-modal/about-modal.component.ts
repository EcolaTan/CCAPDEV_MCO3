import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Community } from 'src/app/data_types/community';
import { CommunityService } from 'src/app/data-services/community.service';

@Component({
    selector: 'app-about-modal',
    templateUrl: './about-modal.component.html',
    styleUrls: ['./about-modal.component.css']
})
export class AboutModalComponent {
    @Input() activeCommunity!: Community
    @Input() is_open = false
    @Output() closeEvent = new EventEmitter<boolean>()

    close_modal() {
        this.is_open = false
        this.closeEvent.emit(this.is_open)
    }
}
