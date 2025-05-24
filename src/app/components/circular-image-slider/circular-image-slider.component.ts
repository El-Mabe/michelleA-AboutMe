import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-circular-image-slider',
  imports: [CommonModule],
  templateUrl: './circular-image-slider.component.html',
  styleUrl: './circular-image-slider.component.scss',
})
export class CircularImageSliderComponent {
  @ViewChildren('orbitImage') orbitImages!: QueryList<ElementRef>;
  private http = inject(HttpClient)

  images: any;
  imagesRight: any;
  @ViewChild('circularContainerLeft') containerRefL!: ElementRef;
  @ViewChild('circularContainerRight') containerRefR!: ElementRef;

  activeIndex: number = 0;
  activeIndexRight: number = 0;
  radius: number = 0;
  radiusRight = 0;
  containerWidth: number = 0;
  containerHeight: number = 0;


  strSelected = signal<string>("")
  btnSelected = signal<number>(1)
  titles = signal<Record<number, string>>({
    1: 'Roll 1: Beginnings',
    2: 'Roll 2: Growth',
    3: 'Roll 3: Impact',

    // Agrega más si necesitas
  })

  titlesText = signal<Record<number, any>>({
    1: {
      title: `My early days 1993-2004`,
      description: `Growing up as a Girl Scout, I immersed myself in nature and learned invaluable survival skills,
                    discovering the power of true collaboration and empathy. This early fascination with the environment led
                    me to pursue a bachelor’s degree in Chemical Engineering with a minor in Environmental Sciences at the
                    Universidad Pontificia Bolivariana. During my time there, I transformed wastewater sludge into
                    construction materials, championed water reuse technologies, and participated in the EcoBrick Innovate
                    project—an initiative recognized by COLCIENCIAS. I even travelled to Madrid’s Instituto de Cerámica y
                    Vidrio to deepen my research and joined the Bayer Young Environmental Envoy program in Germany,
                    broadening my perspective on environmental protection.`
    },
    2: {
      title: "My U.S. Research Journey: From Water to Biomaterials 2005 - 2012",
      description: `Eager to expand my horizons, I lived in the United States for six years, beginning with research in Puerto
Rico on advanced adsorbent materials to remove contaminants from wastewater. Later, at Kansas State
University, I focused on soil and environmental sciences, using fieldwork, lab experiments, and GIS
modeling to improve nutrient management in agricultural watersheds. These experiences cultivated my
technical skills and reinforced my commitment to sustainable innovation.`
    },
    3: {
      title: `Colombia: Environmental Leadership in Motion 2011 - 2017 `,
      description: `Returning to Colombia, I became an Assistant Professor at the University of Medellín, teaching and
researching soil pollution and solid waste management. Yearning to apply my expertise in a broader
context, I led Environmental Impact Assessments at Integral S.A. before transitioning to PwC, where I
guided clients on renewable energy strategies, greenhouse gas inventories, and ESG best practices.`
    },
    4: {
      title: `Australia: Expanding Horizons in Renewable Energy 2017 - 2021`,
      description: `A pivotal chapter of my life
unfolded when I moved to Australia, traveling solo and immersing myself in a vibrant, multicultural
environment. Working on wind energy projects at Senvion and Someva honed my leadership and contract
management skills, solidifying my belief that organizational success and positive environmental impact
can—and must—move forward together.`
    },
    5: {
      title: `A Journey Toward Conscious Leadership 2021- Present`,
      description: `In 2021, I returned to PwC to lead the Climate Change Unit, overseeing a multidisciplinary team
dedicated to decarbonization, climate finance, ESG compliance, and broader sustainability
transformations. Drawing on frameworks like TCFD, TNFD, and the GHG Protocol, I help organizations
strengthen their climate disclosures, manage risks, and seize opportunities in the low-carbon economy.
Looking back, each milestone—from my time as a Girl Scout to my roles in academia, research, project
development, and global consultancy—has influenced who I am today. I’ve learned that sustainability
isn’t just a concept or a buzzword; it’s something I’ve lived, experienced, and witnessed firsthand in
tangible, real-world scenarios. My journey is a testament to the idea that when we combine purpose with
strategic action—grounded in genuine, hands-on learning—we can create lasting change for people,
businesses, and the planet. I’m excited to continue learning, innovating, and collaborating to build a more
sustainable future for all of us.`
    }
  })

  hasAppendedSpan = false;

  descripTitle = signal<string>("")
  descripText = signal<string>("")

  constructor() {
    this.setData(1)
  }


  ngAfterViewInit() {

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
    window.addEventListener('resize', this.handleResize);
  }


  setActive(index: number) {
    this.activeIndex = index;

    const selectedImage = this.images[index];
    this.strSelected.set(this.images[index].title)
    const matchIndex = this.imagesRight.findIndex((img: any) => img.id === selectedImage.tupla);
    if (matchIndex !== -1) {
      console.log(matchIndex);
      console.log(matchIndex.title);

      this.activeIndexRight = matchIndex;

    }
  }

  setActiveRight(index: number) {
    this.activeIndexRight = index;
    const selectedImage = this.imagesRight[index];
    const matchIndex = this.images.findIndex((img: any) => img.id === selectedImage.tupla);
    if (matchIndex !== -1) {
      this.activeIndex = matchIndex;
    }
  }


  getImagePositionL(index: number): string {
    if (!this.images.length) return '';

    const totalImages = this.images.length;
    let angle = ((index - this.activeIndex) / totalImages) * 2 * Math.PI;
    const x = Math.cos(angle) * this.radius * 1.1; // cos → derecha
    const y = Math.sin(angle) * this.radius * 1.1;
    const scale = index === this.activeIndex ? ' scale(2.5)' : '';

    const rotationAngle = (angle * 180 / Math.PI) + 90; // +90 para orientar correctamente
    const rotation = index === this.activeIndex ? " " : ` rotate(${rotationAngle}deg)`;
    return `translate(${x}px, ${y}px)${scale}${rotation}`;
  }

  getImagePositionR(index: number): string {
    if (!this.imagesRight.length) return '';

    const totalImages = this.imagesRight.length;
    const angle = ((index - this.activeIndexRight) / totalImages) * 2 * Math.PI;
    const x = -Math.cos(angle) * this.radiusRight * 1.1;
    const y = Math.sin(angle) * this.radiusRight * 1.1;
    const scale = index === this.activeIndexRight ? ' scale(2.5)' : '';
    const rotationAngle = -(angle * 180 / Math.PI) + 90; // Negativo para invertir
    const rotation = index === this.activeIndexRight ? "rotate(0)" : ` rotate(${rotationAngle}deg)`;
    const offsetX = this.radiusRight;
    return `translate(${x + offsetX}px, ${y}px)${scale}${rotation}`;
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

  /**
   * carpeta assets
   * 1. My early days 1993-2004 -> id:1 
   * 2. My U.S. Research Journey_ From Water to Biomaterials ->id:2
   * 3. Colombia_ Environmental Leadership in Motion 2011 - 2017 -> id:3
   */

  setData(id: number) {
    const map = this.titles()
    this.btnSelected.set(id)
    this.descripTitle.set(this.titlesText()[id].title)
    this.descripText.set(this.titlesText()[id].description)
    this.http.get<any>(`assets/data/${id}.json`)
      .subscribe(data => {
        const allImages = data.country;
        this.images = allImages.filter((img: any) => img.column === 'A');
        this.imagesRight = allImages.filter((img: any) => img.column === 'B');
        // setTimeout(() => this.appendSpanToImage(), 0);
        this.strSelected.set(this.images[0].title)
      });

  }

}