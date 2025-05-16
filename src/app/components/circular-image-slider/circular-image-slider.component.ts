import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
 import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-circular-image-slider',
  imports: [CommonModule],
  templateUrl: './circular-image-slider.component.html',
  styleUrl: './circular-image-slider.component.scss',
  // animations: [
  //   trigger('fadeIn', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('300ms ease-in', style({ opacity: 1 }))
  //     ])
  //   ])
  // ]
})
export class CircularImageSliderComponent {

  @Input() images: string[] = [];
  @Input() captions: string[] = [];
  @Input() title: string = '';
  @ViewChild('circularContainer') containerRef!: ElementRef;
  
  activeIndex: number = 0;
  radius: number = 0;
  containerWidth: number = 0;
  containerHeight: number = 0;
  autoplayInterval: any;
  
  constructor() {}
  
  ngAfterViewInit() {
    // Calculate container dimensions
    if (this.containerRef && this.containerRef.nativeElement) {
      this.containerWidth = this.containerRef.nativeElement.offsetWidth;
      this.containerHeight = this.containerRef.nativeElement.offsetHeight;
      // this.radius = Math.min(this.containerWidth, this.containerHeight) * 0.35;
      this.radius = Math.min(this.containerWidth, this.containerHeight) * 0.5;
    }
    
    // Start autoplay
    // this.startAutoplay();
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize);
  }

  setActive(index: number) {
    this.activeIndex = index;
    // this.stopAutoplay();
    // this.startAutoplay();
  }
  
  getImagePosition(index: number): string {
    if (!this.images.length) return '';
    
    const totalImages = this.images.length;
    let angle = ((index - this.activeIndex) / totalImages) * 2 * Math.PI;
    if (angle < 0) angle += 2 * Math.PI;
    
    // const x = Math.sin(angle) * this.radius * 2;
    // const x = Math.sin(angle) * this.radius;
    const x = Math.sin(angle) * this.radius * 1.3;
    // const y = -Math.cos(angle) * this.radius * 1.2; // Flatten the circle to make it more oval
    const y = -Math.cos(angle) * this.radius; // Flatten the circle to make it more oval
    
    return `translate(${x}px, ${y}px)`;
  }
  
  ngOnDestroy() {
    // this.stopAutoplay();
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    if (this.containerRef && this.containerRef.nativeElement) {
      this.containerWidth = this.containerRef.nativeElement.offsetWidth;
      this.containerHeight = this.containerRef.nativeElement.offsetHeight;
      this.radius = Math.min(this.containerWidth, this.containerHeight) * 0.5;
    }
  }
  
  // startAutoplay() {
  //   this.autoplayInterval = setInterval(() => {
  //     this.next();
  //   }, 5000);
  // }
  
  // stopAutoplay() {
  //   if (this.autoplayInterval) {
  //     clearInterval(this.autoplayInterval);
  //   }
  // }
  


 }
