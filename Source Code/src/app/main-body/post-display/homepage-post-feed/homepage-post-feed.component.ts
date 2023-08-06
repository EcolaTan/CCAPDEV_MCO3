import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/data_types/post';

@Component({
    selector: 'app-homepage-post-feed',
    templateUrl: './homepage-post-feed.component.html',
    styleUrls: ['./homepage-post-feed.component.css']
})
export class HomepagePostFeedComponent {
    @Input() posts!: Array<Post>
    @Input() page!: number
    @Input() count!: number
    @Output() sortEvent = new EventEmitter<number>()
    communityId!: string

    constructor(private router: Router) {}

    goBack() {
        this.router.navigateByUrl('/home/' + (this.page - 1).toString())
    }

    goNext() {
        this.router.navigateByUrl('/home/' + (this.page + 1).toString())
    }

    relaySortEvent(event: number) {
        this.sortEvent.emit(event)
    }
}
