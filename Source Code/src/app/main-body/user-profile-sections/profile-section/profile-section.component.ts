import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/data_types/user';

@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.css']
})
export class ProfileSectionComponent {
    activeTab = 0
    @Input() loadedUser!: User
    @Output() changeActive = new EventEmitter<number>()
    formattedDate!: string
    useDefault = false
    
    ngOnInit(){
        this.formattedDate = new Date(this.loadedUser.joinDate).toLocaleString('default', {month:'long',day:'numeric',year:'numeric'})
    }

    setActive(active: number)  {
        this.activeTab = active
        this.changeActive.emit(active)
    }

    swapDefault() {
        this.useDefault = true
    }
}
