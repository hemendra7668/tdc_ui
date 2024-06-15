import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideogridService {
  static resizeVideoMedia() {
      throw new Error('Method not implemented.');
  }
  customRatio = true;
  ratios = ['0:0', '4:3', '16:9', '1:1', '1:2'];
  aspect = 2;
  ratio: number;

  constructor() {
    this.ratio = this.getAspectRatio();
    window.addEventListener('load', this.onWindowLoad.bind(this), false);
  }

  getAspectRatio(): number {
    this.customRatio = this.aspect === 0;
    const ratio = this.ratios[this.aspect].split(':');
    return parseInt(ratio[1]) / parseInt(ratio[0]);
  }

  setAspectRatio(i: number): void {
    this.aspect = i;
    this.ratio = this.getAspectRatio();
    this.resizeVideoMedia();
  }

  Area(Increment: number, Count: number, Width: number, Height: number, Margin = 10): number | false {
    this.ratio = this.customRatio ? 0.75 : this.ratio;
    let i = 0;
    let w = 0;
    let h = Increment * this.ratio + Margin * 2;
    while (i < Count) {
      if (w + Increment > Width) {
        w = 0;
        h += Increment * this.ratio + Margin * 2;
      }
      w += Increment + Margin * 2;
      i++;
    }
    return h > Height ? false : Increment;
  }

  resizeVideoMedia(): void {
    const Margin = 5;
    const videoMediaContainer = document.getElementById('videoMediaContainer');
    const Cameras = document.getElementsByClassName('Camera');
    if (!videoMediaContainer || !Cameras) return;

    let Width = videoMediaContainer.offsetWidth - Margin * 2;
    let Height = videoMediaContainer.offsetHeight - Margin * 2;
    let max = 0;
    const optional = this.isHideMeActive && videoMediaContainer.childElementCount <= 2 ? 1 : 0;
    const isOneVideoElement = videoMediaContainer.childElementCount - optional === 1;

    const bigWidth = Width * 4;
    if (isOneVideoElement) {
      Width -= bigWidth;
    }

    this.resetZoom();

    let i = 1;
    while (i < 5000) {
      const w = this.Area(i, Cameras.length, Width, Height, Margin);
      if (w === false) {
        max = i - 1;
        break;
      }
      i++;
    }

    max -= Margin * 2;
    this.setWidth(Cameras, max, bigWidth, Margin, Height, isOneVideoElement);
    document.documentElement.style.setProperty('--vmi-wh', `${max / 3}px`);
  }

  resetZoom(): void {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach((video) => {
      video.style.transform = '';
      video.style.transformOrigin = 'center';
    });
  }

  setWidth(Cameras: HTMLCollectionOf<Element>, width: number, bigWidth: number, margin: number, maxHeight: number, isOneVideoElement: boolean): void {
    this.ratio = this.customRatio ? 0.68 : this.ratio;
    for (let s = 0; s < Cameras.length; s++) {
      const camera = Cameras[s] as HTMLElement;
      camera.style.width = `${width}px`;
      camera.style.margin = `${margin}px`;
      camera.style.height = `${width * this.ratio}px`;
      if (isOneVideoElement) {
        camera.style.width = `${bigWidth}px`;
        camera.style.height = `${bigWidth * this.ratio}px`;
        const camHeight = parseFloat(camera.style.height);
        if (camHeight >= maxHeight) camera.style.height = `${maxHeight - 2}px`;
      }
    }
  }

  onWindowLoad(): void {
    this.resizeVideoMedia();
    this.resizeMainButtons();
    window.onresize = () => {
      this.resizeVideoMedia();
      this.resizeMainButtons();
      this.resizeChatRoom();
      this.resizeTranscriptionRoom();
    };
  }

  resizeMainButtons(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const isButtonsBarVertical = BtnsBarPosition.selectedIndex === 0;
    if (isButtonsBarVertical) {
      if (windowHeight <= MOBILE_BREAKPOINT) {
        this.setStyles(mainButtonsBar, '0.7rem', '4px', mainButtonsIcon, '0.8rem', '40px');
      } else if (windowHeight <= TABLET_BREAKPOINT) {
        this.setStyles(mainButtonsBar, '0.9rem', '4px', mainButtonsIcon, '1rem', '45px');
      } else if (windowHeight <= DESKTOP_BREAKPOINT) {
        this.setStyles(mainButtonsBar, '1rem', '5px', mainButtonsIcon, '1.1rem', '50px');
      } else {
        this.setStyles(mainButtonsBar, '1rem', '10px', mainButtonsIcon, '1.2rem', '60px');
      }
    } else {
      if (windowWidth <= MOBILE_BREAKPOINT) {
        this.setStyles(mainButtonsBar, '0.7rem', '4px', mainButtonsIcon, '0.8rem');
      } else if (windowWidth <= TABLET_BREAKPOINT) {
        this.setStyles(mainButtonsBar, '0.9rem', '4px', mainButtonsIcon, '1rem');
      } else if (windowWidth <= DESKTOP_BREAKPOINT) {
        this.setStyles(mainButtonsBar, '1rem', '5px', mainButtonsIcon, '1.1rem');
      } else {
        this.setStyles(mainButtonsBar, '1rem', '10px', mainButtonsIcon, '1.2rem');
      }
    }
  }

  setStyles(elements: NodeListOf<HTMLElement>, fontSize: string, padding: string, icons: NodeListOf<HTMLElement>, fontSizeIcon: string, bWidth: string | null = null): void {
    if (bWidth) {
      document.documentElement.style.setProperty('--btns-width', bWidth);
    }

    elements.forEach((element) => {
      element.style.fontSize = fontSize;
      element.style.padding = padding;
    });

    icons.forEach((icon) => {
      icon.style.fontSize = fontSizeIcon;
    });
  }

  resizeChatRoom(): void {
    if (!rc || rc.isMobileDevice || !rc.isChatOpen || rc.isChatPinned) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth <= DESKTOP_BREAKPOINT || windowHeight <= DESKTOP_BREAKPOINT) {
      rc.chatMaximize();
    } else {
      rc.chatMinimize();
    }
  }

  resizeTranscriptionRoom(): void {
    if (
      DetectRTC.isMobileDevice ||
      !Boolean(transcription.speechTranscription) ||
      transcription.isHidden ||
      transcription.isPinned
    ) {
      return;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth <= CUSTOM_BREAKPOINT || windowHeight <= CUSTOM_BREAKPOINT) {
      transcription.maximize();
    } else {
      transcription.minimize();
    }
  }
}

// ####################################################
// BREAKPOINTS
// ####################################################

const MOBILE_BREAKPOINT = 500;
const TABLET_BREAKPOINT = 580;
const DESKTOP_BREAKPOINT = 730;
const CUSTOM_BREAKPOINT = 680;

// ####################################################
// RESPONSIVE MAIN BUTTONS
// ####################################################

const mainButtonsBar = document.querySelectorAll('#control button') as NodeListOf<HTMLElement>;
const mainButtonsIcon = document.querySelectorAll('#control button i') as NodeListOf<HTMLElement>;
