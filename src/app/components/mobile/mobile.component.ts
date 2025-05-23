import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';


export interface SliderItem {
  id: string;
  path: string;
  column: string;
  description: string;
  tupla: string;
}

@Component({
  selector: 'app-mobile',
  imports: [CommonModule],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.scss',
})
export class MobileComponent {
  //   private http = inject(HttpClient)

  //   activeIndex: number = 0;
  //   activeIndexRight: number = 0;
  //   images: any;
  //   imagesRight: any;
  //   headerTitle = 'About me';
  //   strSelected = signal<string>("Early Days")
  //   titles = signal<Record<number, string>>({
  //     1: 'Roots',
  //     2: 'Discovery',
  //     3: 'Impact',
  //     4: 'Expansion',
  //     5: 'Leadership'
  //     // Agrega más si necesitas
  //   })
  //   btnActive =1;

  //   titlesText = signal<Record<number, any>>({
  //     1: {
  //       title: `My early days 1993-2004`,
  //       description: `Growing up as a Girl Scout, I immersed myself in nature and learned invaluable survival skills,
  //                     discovering the power of true collaboration and empathy. This early fascination with the environment led
  //                     me to pursue a bachelor’s degree in Chemical Engineering with a minor in Environmental Sciences at the
  //                     Universidad Pontificia Bolivariana. During my time there, I transformed wastewater sludge into
  //                     construction materials, championed water reuse technologies, and participated in the EcoBrick Innovate
  //                     project—an initiative recognized by COLCIENCIAS. I even travelled to Madrid’s Instituto de Cerámica y
  //                     Vidrio to deepen my research and joined the Bayer Young Environmental Envoy program in Germany,
  //                     broadening my perspective on environmental protection.`
  //     },
  //     2: {
  //       title: "My U.S. Research Journey: From Water to Biomaterials 2005 - 2012",
  //       description: `Eager to expand my horizons, I lived in the United States for six years, beginning with research in Puerto
  // Rico on advanced adsorbent materials to remove contaminants from wastewater. Later, at Kansas State
  // University, I focused on soil and environmental sciences, using fieldwork, lab experiments, and GIS
  // modeling to improve nutrient management in agricultural watersheds. These experiences cultivated my
  // technical skills and reinforced my commitment to sustainable innovation.`
  //     },
  //     3: {
  //       title: `Colombia: Environmental Leadership in Motion 2011 - 2017 `,
  //       description: `Returning to Colombia, I became an Assistant Professor at the University of Medellín, teaching and
  // researching soil pollution and solid waste management. Yearning to apply my expertise in a broader
  // context, I led Environmental Impact Assessments at Integral S.A. before transitioning to PwC, where I
  // guided clients on renewable energy strategies, greenhouse gas inventories, and ESG best practices.`
  //     },
  //     4: {
  //       title: `Australia: Expanding Horizons in Renewable Energy 2017 - 2021`,
  //       description: `A pivotal chapter of my life
  // unfolded when I moved to Australia, traveling solo and immersing myself in a vibrant, multicultural
  // environment. Working on wind energy projects at Senvion and Someva honed my leadership and contract
  // management skills, solidifying my belief that organizational success and positive environmental impact
  // can—and must—move forward together.`
  //     },
  //     5: {
  //       title: `A Journey Toward Conscious Leadership 2021- Present`,
  //       description: `In 2021, I returned to PwC to lead the Climate Change Unit, overseeing a multidisciplinary team
  // dedicated to decarbonization, climate finance, ESG compliance, and broader sustainability
  // transformations. Drawing on frameworks like TCFD, TNFD, and the GHG Protocol, I help organizations
  // strengthen their climate disclosures, manage risks, and seize opportunities in the low-carbon economy.
  // Looking back, each milestone—from my time as a Girl Scout to my roles in academia, research, project
  // development, and global consultancy—has influenced who I am today. I’ve learned that sustainability
  // isn’t just a concept or a buzzword; it’s something I’ve lived, experienced, and witnessed firsthand in
  // tangible, real-world scenarios. My journey is a testament to the idea that when we combine purpose with
  // strategic action—grounded in genuine, hands-on learning—we can create lasting change for people,
  // businesses, and the planet. I’m excited to continue learning, innovating, and collaborating to build a more
  // sustainable future for all of us.`
  //     }
  //   })


  //   descripTitle = signal<string>("")
  //   descripText = signal<string>("")

  //   constructor() {
  //     this.setData(1)
  //   }
  //   setActive(index: number) {
  //     this.activeIndex = index;

  //     const selectedImage = this.images[index];
  //     const matchIndex = this.imagesRight.findIndex((img: any) => img.id === selectedImage.tupla);
  //     if (matchIndex !== -1) {
  //       this.activeIndexRight = matchIndex;
  //     }
  //   }

  //   setActiveRight(index: number) {
  //     this.activeIndexRight = index;
  //     const selectedImage = this.imagesRight[index];
  //     const matchIndex = this.images.findIndex((img: any) => img.id === selectedImage.tupla);
  //     if (matchIndex !== -1) {
  //       this.activeIndex = matchIndex;
  //     }
  //   }


  //   setData(id: number) {
  //     this.btnActive = id;
  //     const map = this.titles()
  //     this.strSelected.set(map[id])
  //     this.descripTitle.set(this.titlesText()[id].title)
  //     this.descripText.set(this.titlesText()[id].description)
  //     this.http.get<any>(`assets/data/${id}.json`)
  //       .subscribe(data => {
  //         const allImages = data.country;
  //         this.images = allImages.filter((img: any) => img.column === 'A');
  //         this.imagesRight = allImages.filter((img: any) => img.column === 'B');
  //         // setTimeout(() => this.appendSpanToImage(), 0);
  //       });

  //   }

  originalItems = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco'];
  items: string[] = [];
  currentIndex = 1; // iniciamos en el primer elemento real (después del clon)

  touchStartX = 0;
  touchEndX = 0;

  ngOnInit() {
    this.items = [
      this.originalItems[this.originalItems.length - 1], // clon del último al principio
      ...this.originalItems,
      this.originalItems[0] // clon del primero al final
    ];
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    const delta = this.touchEndX - this.touchStartX;

    if (delta > 50) {
      this.prev();
    } else if (delta < -50) {
      this.next();
    }
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex >= this.items.length - 1) {
      setTimeout(() => {
        this.currentIndex = 1;
      }, 300);
    }
  }

  prev() {
    this.currentIndex--;
    if (this.currentIndex <= 0) {
      setTimeout(() => {
        this.currentIndex = this.items.length - 2;
      }, 300);
    }
  }

  // next() {
  //   this.currentIndex = (this.currentIndex + 1) % this.items.length;
  // }

  // prev() {
  //   this.currentIndex =
  //     (this.currentIndex - 1 + this.items.length) % this.items.length;
  // }

  getTransform() {
    const translateX = -this.currentIndex * (100 / 3); // 3 ítems visibles
    return `translateX(${translateX}%)`;
  }


  // getTransform() {
  //   const slideWidth = 33.3333;
  //   const translateX = -this.currentIndex * slideWidth;
  //   return `translateX(${translateX}%)`;
  // }

  // isActive(index: number): boolean {
  //   return index === this.currentIndex;
  // }

}
