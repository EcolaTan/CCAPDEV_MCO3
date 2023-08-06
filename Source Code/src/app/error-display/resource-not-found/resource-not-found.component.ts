import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-not-found',
  templateUrl: './resource-not-found.component.html',
  styleUrls: ['./resource-not-found.component.css']
})
export class ResourceNotFoundComponent {
    constructor(private router: Router) {}

    returnHome() {
        this.router.navigate([""])
    }
}
