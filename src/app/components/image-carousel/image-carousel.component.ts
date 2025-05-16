import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country, ImageItem } from '../../models/image.model';
import { Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent { 

  @Input() position: 'left' | 'right' = 'left';
  @Input() type: 'a' | 'b' = 'a';
  
  images: ImageItem[] = [];
  currentIndex = 0;
  translateX = 0;
  selectedImage: ImageItem | null = null;
  
  private countrySubscription: Subscription = new Subscription();
  private selectedImageSubscription: Subscription = new Subscription();

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    // Suscribirse a cambios de país
    this.countrySubscription = this.imageService.currentCountry$.subscribe(country => {
      this.loadImages(country);
      this.currentIndex = 0;
      this.updateTranslateX();
    });

    // Suscribirse a cambios en la imagen seleccionada
    this.selectedImageSubscription = this.imageService.selectedImage$.subscribe(image => {
      if (image && image.type !== this.type) {
        // Si la imagen seleccionada es del tipo opuesto,
        // necesitamos buscar y mostrar la imagen emparejada
        const pairedImage = this.imageService.getPairedImage(image);
        if (pairedImage && pairedImage.type === this.type) {
          this.showImage(pairedImage);
        }
      } else if (image && image.type === this.type) {
        this.selectedImage = image;
      }
    });
  }

  ngOnDestroy(): void {
    this.countrySubscription.unsubscribe();
    this.selectedImageSubscription.unsubscribe();
  }

  private loadImages(country: Country): void {
    if (this.type === 'a') {
      this.images = this.imageService.getTypeAImages(country);
    } else {
      this.images = this.imageService.getTypeBImages(country);
    }
  }

  selectImage(image: ImageItem): void {
    this.imageService.selectImage(image);
  }

  showImage(image: ImageItem): void {
    const index = this.images.findIndex(img => img.id === image.id);
    if (index !== -1) {
      this.currentIndex = index;
      this.updateTranslateX();
      this.selectedImage = image;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTranslateX();
      this.selectImage(this.images[this.currentIndex]);
    }
  }

  next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.updateTranslateX();
      this.selectImage(this.images[this.currentIndex]);
    }
  }

  private updateTranslateX(): void {
    this.translateX = -this.currentIndex * 100;
  }

  isImageActive(image: ImageItem): boolean {
    return this.selectedImage?.id === image.id;
  }
}
