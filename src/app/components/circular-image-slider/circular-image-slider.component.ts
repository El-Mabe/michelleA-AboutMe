import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-circular-image-slider',
  imports: [CommonModule],
  templateUrl: './circular-image-slider.component.html',
  styleUrl: './circular-image-slider.component.scss',
})
export class CircularImageSliderComponent {

  @Input() images: string[] = [];
  @Input() imagesRight: string[] = [];
  @Input() captions: string[] = [];
  @Input() title: string = '';
  @ViewChild('circularContainerLeft') containerRefL!: ElementRef;
  @ViewChild('circularContainerRight') containerRefR!: ElementRef;

  activeIndex: number = 0;
  activeIndexRight: number = 0;
  radius: number = 0;
  radiusRight = 0;
  containerWidth: number = 0;
  containerHeight: number = 0;
  autoplayInterval: any;

  constructor() { }

  ngAfterViewInit() {
    // Calculate container dimensions
    if (this.containerRefL && this.containerRefL.nativeElement) {
      this.containerWidth = this.containerRefL.nativeElement.offsetWidth;
      this.containerHeight = this.containerRefL.nativeElement.offsetHeight;
      this.radius = Math.min(this.containerWidth, this.containerHeight) * 0.5;
    }

    if (this.containerRefR && this.containerRefR.nativeElement) {
      this.containerWidth = this.containerRefR.nativeElement.offsetWidth;
      this.containerHeight = this.containerRefR.nativeElement.offsetHeight;
      this.radiusRight = Math.min(this.containerWidth, this.containerHeight) * 0.5;
    }


    // Handle window resize
    window.addEventListener('resize', this.handleResize);
  }

  setActive(index: number) {
    this.activeIndex = index;
    // this.stopAutoplay();
    // this.startAutoplay();
  }

  setActiveRight(index: number) {
    this.activeIndexRight = index;
  }
  

  getImagePositionL(index: number): string {
    if (!this.images.length) return '';

    const totalImages = this.images.length;
    let angle = ((index - this.activeIndex) / totalImages) * 2 * Math.PI;
    const x = Math.cos(angle) * this.radius * 1.3; // cos → derecha
    const y = Math.sin(angle) * this.radius * 0.8;
    const scale = index === this.activeIndex ? ' scale(1.5)' : '';

    return `translate(${x}px, ${y}px)${scale}`;
  }

  // getImagePositionR(index: number): string {
  //   if (!this.imagesRight.length) return '';
  //   const totalImages = this.imagesRight.length;
  //   let angle = ((index - this.activeIndexRight) / totalImages) * 2 * Math.PI;
  //   const x = -Math.cos(angle) * this.radiusRight * 1.3;
  //   const y = Math.sin(angle) * this.radiusRight * 0.8;
  //   const scale = index === this.activeIndexRight ? ' scale(1.4)' : '';
  
  //   return `translate(${x}px, ${y}px)${scale}`;
  // }

  getImagePositionR(index: number): string {
    if (!this.imagesRight.length) return '';
    
    const totalImages = this.imagesRight.length;
    const angle = ((index - this.activeIndexRight) / totalImages) * 2 * Math.PI;
    const x = -Math.cos(angle) * this.radiusRight * 1.3;
    const y = Math.sin(angle) * this.radiusRight * 0.8;
    const scale = index === this.activeIndexRight ? ' scale(1.4)' : '';
  
    const offsetX = this.radiusRight * 2.5; // Ajusta este valor según lo "pegado" que lo quieras al borde
  
    return `translate(${x + offsetX}px, ${y}px)${scale}`;
  }
  

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    if (this.containerRefL && this.containerRefL.nativeElement) {
      this.containerWidth = this.containerRefL.nativeElement.offsetWidth;
      this.containerHeight = this.containerRefL.nativeElement.offsetHeight;
      this.radius = Math.min(this.containerWidth, this.containerHeight) * 0.5;
    }

    if (this.containerRefR && this.containerRefR.nativeElement) {
      this.containerWidth = this.containerRefR.nativeElement.offsetWidth;
      this.containerHeight = this.containerRefR.nativeElement.offsetHeight;
      this.radiusRight = Math.min(this.containerWidth, this.containerHeight) * 0.5;
    }

  }
}
