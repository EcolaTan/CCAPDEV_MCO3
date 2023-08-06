import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
    displayed = 0

    swapDisplay(swapEvent: number) {
        this.displayed = swapEvent
    }
}
