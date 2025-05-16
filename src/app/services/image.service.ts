import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country, ImageItem } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private countrySubject = new BehaviorSubject<Country>('Australia');
  private selectedImageSubject = new BehaviorSubject<ImageItem | null>(null);
  
  // Mapa de imágenes por país
  private imageMap: Record<Country, ImageItem[]> = {
    'USA': [],
    'Australia': [],
    'Colombia': []
  };

  constructor() {
    this.initializeImages();
  }

  private initializeImages() {
    // Creamos datos de ejemplo, en una app real esto podría venir de una API
    const countries: Country[] = ['USA', 'Australia', 'Colombia'];
    // assets/images/colombia/a-1.jpeg
    countries.forEach(country => {
      
      // Generamos 10 imágenes de tipo 'a' y 10 de tipo 'b' por país
      for (let i = 1; i <= 10; i++) {
        console.log(`assets/images/${country.toLowerCase()}/a-${i}.jpeg`);
        this.imageMap[country].push({
          id: `a-${i}`,
          path: `assets/images/${country.toLowerCase()}/a-${i}.jpeg`,
          type: 'a',
          number: i
        });
        
        this.imageMap[country].push({
          id: `b-${i}`,
          path: `assets/images/${country.toLowerCase()}/b-${i}.jpeg`,
          type: 'b',
          number: i
        });
      }
    });
  }

  // Obtener el país actualmente seleccionado
  get currentCountry$(): Observable<Country> {
    return this.countrySubject.asObservable();
  }

  // Obtener la imagen seleccionada actualmente
  get selectedImage$(): Observable<ImageItem | null> {
    return this.selectedImageSubject.asObservable();
  }

  // Cambiar el país seleccionado
  setCountry(country: Country): void {
    this.countrySubject.next(country);
    this.selectedImageSubject.next(null); // Resetear imagen seleccionada al cambiar país
  }

  // Seleccionar una imagen 
  selectImage(image: ImageItem): void {
    this.selectedImageSubject.next(image);
  }

  // Obtener todas las imágenes del país actual
  getImagesByCountry(country: Country): ImageItem[] {
    return this.imageMap[country] || [];
  }

  // Obtener la imagen pareja de una imagen dada
  getPairedImage(image: ImageItem): ImageItem | null {
    const country = this.countrySubject.value;
    const oppositeType = image.type === 'a' ? 'b' : 'a';
    
    return this.imageMap[country].find(
      item => item.type === oppositeType && item.number === image.number
    ) || null;
  }

  // Obtener imágenes de tipo 'a' para el país seleccionado
  getTypeAImages(country: Country): ImageItem[] {
    return this.imageMap[country].filter(image => image.type === 'a');
  }

  // Obtener imágenes de tipo 'b' para el país seleccionado
  getTypeBImages(country: Country): ImageItem[] {
    return this.imageMap[country].filter(image => image.type === 'b');
  }

}
