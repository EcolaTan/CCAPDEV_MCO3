import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Community } from 'src/app/data_types/community';
import { CommunityService } from 'src/app/data-services/community.service';

@Component({
  selector: 'app-rule-modal',
  templateUrl: './rule-modal.component.html',
  styleUrls: ['./rule-modal.component.css']
})
export class RuleModalComponent {
    @Input() is_open = false
    @Input() activeCommunity!: Community
    @Output() closeEvent = new EventEmitter<boolean>()

    close_modal() {
        this.is_open = false
        this.closeEvent.emit(this.is_open)
    }
}
