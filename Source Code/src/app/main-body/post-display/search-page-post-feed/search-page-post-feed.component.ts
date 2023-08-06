import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/data_types/post';

@Component({
  selector: 'app-search-page-post-feed',
  templateUrl: './search-page-post-feed.component.html',
  styleUrls: ['./search-page-post-feed.component.css']
})
export class SearchPagePostFeedComponent {
    @Input() posts!: Array<Post>
    @Input() count!: number
    @Input() page!: number
    @Input() query!: string

    constructor(private router: Router) {}

    goBack() {
        this.router.navigateByUrl(`search/${this.query}/${this.page - 1}`)
    }

    goNext() {
        this.router.navigateByUrl(`search/${this.query}/${this.page + 1}`)
    }

}
