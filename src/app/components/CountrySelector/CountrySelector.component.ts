import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Country } from '../../models/image.model';
import { ImageService } from '../../services/image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-selector',
  imports: [CommonModule],
  templateUrl: './CountrySelector.component.html',
  styleUrl: './CountrySelector.component.scss',
})
export class CountrySelectorComponent { 
  countries: Country[] = ['USA', 'Australia', 'Colombia'];
  selectedCountry: Country = 'Australia';

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.currentCountry$.subscribe(country => {
      this.selectedCountry = country;
    });
  }

  selectCountry(country: Country): void {
    this.imageService.setCountry(country);
  }
}
