import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-sorting-box',
    templateUrl: './sorting-box.component.html',
    styleUrls: ['./sorting-box.component.css']
})
export class SortingBoxComponent {
    sort_code: number = 0
    /*
        1 - new
        2 - top
    */
    @Output() sortEvent: EventEmitter<number> = new EventEmitter<number>()

    sort(code: number) {
        this.sortEvent.emit(code)
    }
}
