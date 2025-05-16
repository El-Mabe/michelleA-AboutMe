import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { CircularImageSliderComponent } from './components/circular-image-slider/circular-image-slider.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AboutMeComponent, CircularImageSliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'about-me';

  imageList = [
    'assets/images/colombia/a-1.jpg',
    'assets/images/colombia/b-1.jpeg',
    'assets/images/colombia/a-2.jpeg',
    'assets/images/colombia/b-2.jpeg',
    'assets/images/colombia/a-3.jpeg',
    'assets/images/colombia/b-3.jpeg',
    'assets/images/colombia/a-4.jpeg',
    'assets/images/colombia/b-4.jpeg',
    'assets/images/colombia/a-5.jpg',
    'assets/images/colombia/b-5.jpg',
  ];
}
