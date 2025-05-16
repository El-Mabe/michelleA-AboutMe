import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { CountrySelectorComponent } from '../CountrySelector/CountrySelector.component';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  imports: [CommonModule,CountrySelectorComponent, ImageCarouselComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent { 
  constructor(private imageService: ImageService) {}

  isAustraliaSelected(): boolean {
    let result = false;
    this.imageService.currentCountry$.subscribe(country => {
      result = country === 'Australia';
    });
    return result;
  }
}
