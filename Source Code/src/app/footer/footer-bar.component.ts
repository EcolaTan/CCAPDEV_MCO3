import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.css']
})
export class FooterBarComponent {
    constructor(private router: Router) {}

    goToAbout() {
        this.router.navigateByUrl('/about/RecurveSpecs')
    }
}
