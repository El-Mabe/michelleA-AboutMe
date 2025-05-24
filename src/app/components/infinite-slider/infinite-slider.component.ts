export interface SliderItem {
  id: string;
  path: string;
  column: string;
  description: string;
  tupla: string;
}

// infinite-slider.component.ts
import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-infinite-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-slider.component.html',
  styleUrls: ['./infinite-slider.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(33%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-33%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class InfiniteSliderComponent implements OnInit, AfterViewInit {
  @Input() items: SliderItem[] = [];
  @Input() sliderTitle: string = '';
  @Input() buttonColor: string = '#3366cc';
  
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  
  displayItems: SliderItem[] = [];
  currentIndex = 0;
  animationState = 0;
  touchStartX = 0;
  isSwiping = false;

    tags = [
    { name: 'Australia', class: 'tag-primary' },
    { name: 'U.S.A', class: 'tag-secondary' },
    { name: 'Colombia', class: 'tag-tertiary' },
    { name: 'Beginnings', class: 'tag-quaternary' }
  ];

   bioText = `A pivotal chapter of my life unfolded when I moved to Australia:
  
  Traveling solo and immersing myself in a vibrant, multicultural environment.
  Working on wind energy projects at`;
  
  constructor() { }

  ngOnInit(): void {
    if (this.items.length < 3) {
      console.error('Slider needs at least 3 items to work properly');
      return;
    }
    
    // Initialize display items with current, prev and next
    this.updateDisplayItems();
  }

  ngAfterViewInit(): void {
    // Add any post-render initialization if needed
  }

  updateDisplayItems(): void {
    const prevIndex = this.getPrevIndex();
    const nextIndex = this.getNextIndex();
    
    this.displayItems = [
      this.items[prevIndex],
      this.items[this.currentIndex],
      this.items[nextIndex]
    ];
  }

  getPrevIndex(): number {
    return this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
  }

  getNextIndex(): number {
    return this.currentIndex === this.items.length - 1 ? 0 : this.currentIndex + 1;
  }

  next(): void {
    this.animationState++;
    this.currentIndex = this.getNextIndex();
    this.updateDisplayItems();
  }

  prev(): void {
    this.animationState--;
    this.currentIndex = this.getPrevIndex();
    this.updateDisplayItems();
  }

  onItemClick(index: number): void {
    if (index === 0) {
      this.prev();
    } else if (index === 2) {
      this.next();
    }
    // Center item (index 1) doesn't need action as it's already centered
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.isSwiping = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isSwiping) return;
    
    const touchCurrentX = event.touches[0].clientX;
    const diff = this.touchStartX - touchCurrentX;
    
    // Optional: Add visual feedback during swipe
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.isSwiping) return;
    
    const touchEndX = event.changedTouches[0].clientX;
    const diff = this.touchStartX - touchEndX;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.next(); // Swipe left
      } else {
        this.prev(); // Swipe right
      }
    }
    
    this.isSwiping = false;
  }

  getTagClass(item: SliderItem): string {
    // Map column to a CSS class for styling tags differently
    switch(item.column) {
      case 'A': return 'tag-primary';
      case 'B': return 'tag-secondary';
      case 'C': return 'tag-tertiary';
      default: return 'tag-default';
    }
  }
}