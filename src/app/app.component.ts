import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CircularImageSliderComponent } from './components/circular-image-slider/circular-image-slider.component';
import { MobileComponent } from './components/mobile/mobile.component';

@Component({
  selector: 'app-root',
  imports: [CircularImageSliderComponent, MobileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'about-me';
}
