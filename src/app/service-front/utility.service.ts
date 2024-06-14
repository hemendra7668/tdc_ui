import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as DOMPurify from 'dompurify';
import tippy, { Instance, Props } from 'tippy.js';
import { RoomComponent } from '../views/room/room.component';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  id: string | undefined;
  isAudioAllowed: boolean = false;
  isVideoAllowed: boolean = false;
  joinRoomWithoutAudioVideo: boolean = false;
  

  constructor(private router: Router,
    private sanitizer: DomSanitizer
  ) { }
  socket: Socket;
  survey = {
    enabled: true,
    url: 'https://www.questionpro.com/t/AUs7VZq02P',
  };
  redirect = {
    enabled: true,
    url: '/newroom',
  };
//   const _PEER = {
//     presenter: '<i class="fa-solid fa-user-shield"></i>',
//     guest: '<i class="fa-solid fa-signal"></i>',
//     audioOn: '<i class="fas fa-microphone"></i>',
//     audioOff: '<i style="color: red;" class="fas fa-microphone-slash"></i>',
//     videoOn: '<i class="fas fa-video"></i>',
//     videoOff: '<i style="color: red;" class="fas fa-video-slash"></i>',
//     screenOn: '<i class="fas fa-desktop"></i>',
//     screenOff: '<i style="color: red;" class="fas fa-desktop"></i>',
//     raiseHand: '<i style="color: rgb(0, 255, 71);" class="fas fa-hand-paper pulsate"></i>',
//     lowerHand: '',
//     acceptPeer: '<i class="fas fa-check"></i>',
//     banPeer: '<i class="fas fa-ban"></i>',
//     ejectPeer: '<i class="fas fa-times"></i>',
//     geoLocation: '<i class="fas fa-location-dot"></i>',
//     sendFile: '<i class="fas fa-upload"></i>',
//     sendMsg: '<i class="fas fa-paper-plane"></i>',
//     sendVideo: '<i class="fab fa-youtube"></i>',
// };
 initUser = document.getElementById('initUser');
 initVideoContainerClass = document.querySelector('.init-video-container');
 bars = document.querySelectorAll('.volume-bar');

 userAgent = navigator.userAgent.toLowerCase();
 isTabletDevice = isTablet(this.userAgent);
 isIPadDevice = isIpad(this.userAgent);
 Base64Prefix = 'data:application/pdf;base64,';

 wbImageInput = 'image/*';
 wbPdfInput = 'application/pdf';
 wbWidth = 1200;
 wbHeight = 600;

 swalImageUrl = '../images/pricing-illustration.svg';


// ####################################################
// ENUMERATE DEVICES SELECTS
// ####################################################

 videoSelect = this.getId('videoSelect');
 initVideoSelect = this.getId('initVideoSelect');
 microphoneSelect = this.getId('microphoneSelect');
 initMicrophoneSelect = this.getId('initMicrophoneSelect');
 speakerSelect = this.getId('speakerSelect');
 initSpeakerSelect = this.getId('initSpeakerSelect');

// Media
 sinkId = 'sinkId' in HTMLMediaElement.prototype;
  recCodecs: any = null;
  recPrioritizeH264 = false;

  themeCustom: any = {
    input: document.getElementById('themeColorPicker') as HTMLInputElement,
    color: '',
    keep: false,
  };

  setTippy(
    elemId: string,
    content: string,
    placement: Props['placement'],
    allowHTML: boolean = false
  ): void {
    const element = document.getElementById(elemId);
    if (element) {
      if ((element as any)._tippy) {
        (element as any)._tippy.destroy();
      }
      try {
        tippy(element, {
          content: content,
          placement: placement,
          allowHTML: allowHTML,
        });
      } catch (err) {
        console.error('setTippy error', (err as Error).message);
      }
    } else {
      console.warn('setTippy element not found with content', content);
    }
  }


  // GET ROOM ID
// ####################################################
  makeId(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private sanitizeInput(input: string | null): string {
    if (!input) return '';
    return DOMPurify.sanitize(input);
  }
  getRoomId(): string {
    const qs = new URLSearchParams(window.location.search);
    const queryRoomId = this.sanitizeInput(qs.get('room'));
    let roomId = queryRoomId ? queryRoomId : location.pathname.substring(6);
    if (!roomId) {
      roomId = this.makeId(12);
    }
    console.log('Direct join', { room: roomId });
    window.localStorage.setItem('lastRoom', roomId);
    return roomId;
  }

  openURL(url: string): void {
    this.router.navigateByUrl(url);
  }
  
  setButtonsInit(): void {
    // Implementation for initializing buttons
    if (!DetectRTC.isMobileDevice) {
      this.setTippy('initAudioButton', 'Toggle the audio', 'top');
      this.setTippy('initVideoButton', 'Toggle the video', 'top');
      this.setTippy('initAudioVideoButton', 'Toggle the audio & video', 'top');
      this.setTippy('initStartScreenButton', 'Toggle screen sharing', 'top');
      this.setTippy('initStopScreenButton', 'Toggle screen sharing', 'top');
  }
  if (!isAudioAllowed) hide(initAudioButton);
  if (!isVideoAllowed) hide(initVideoButton);
  if (!isAudioAllowed || !isVideoAllowed) hide(initAudioVideoButton);
  if ((!isAudioAllowed && !isVideoAllowed) || DetectRTC.isMobileDevice) hide(initVideoAudioRefreshButton);
  isAudioVideoAllowed = isAudioAllowed && isVideoAllowed;
  }

  handleSelectsInit(): void {
    // Implementation for initializing select elements
    this.initVideoSelect.onchange = async () => {
      await changeCamera(this.initVideoSelect.value);
      this.videoSelect.selectedIndex = this.initVideoSelect.selectedIndex;
      refreshLsDevices();
  };
  this.initMicrophoneSelect.onchange = () => {
      this.microphoneSelect.selectedIndex = this.initMicrophoneSelect.selectedIndex;
      refreshLsDevices();
  };
  this.initSpeakerSelect.onchange = () => {
      this.speakerSelect.selectedIndex = this.initSpeakerSelect.selectedIndex;
      refreshLsDevices();
  };
  }
  getId(id: string) {
   
    return document.getElementById(id);
  }
  async whoAreYou(): Promise<void> {
    // Implementation for the whoAreYou logic
    console.log('04 ----> Who are you?');

    hide(loadingDiv);
    document.body.style.background = 'var(--body-bg)';

    try {
        const response = await axios.get('/config', {
            timeout: 5000,
        });
        const serverButtons = response.data.message;
        if (serverButtons) {
            BUTTONS = serverButtons;
            console.log('04 ----> AXIOS ROOM BUTTONS SETTINGS', {
                serverButtons: serverButtons,
                clientButtons: BUTTONS,
            });
        }
    } catch (error) {
        console.error('04 ----> AXIOS GET CONFIG ERROR', error.message);
    }

    if (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
        BUTTONS.main.startScreenButton && show(initStartScreenButton);
    }

    if (peer_name) {
        checkMedia();
        getPeerInfo();
        joinRoom(peer_name, room_id);
        return;
    }

    let default_name = window.localStorage.peer_name ? window.localStorage.peer_name : '';
    if (getCookie(room_id + '_name')) {
        default_name = getCookie(room_id + '_name');
    }

    if (!BUTTONS.main.startVideoButton) {
        isVideoAllowed = false;
        elemDisplay('initVideo', false);
        elemDisplay('initVideoButton', false);
        elemDisplay('initAudioVideoButton', false);
        elemDisplay('initVideoAudioRefreshButton', false);
        elemDisplay('initVideoSelect', false);
        elemDisplay('tabVideoDevicesBtn', false);
        initVideoContainerShow(false);
    }
    if (!BUTTONS.main.startAudioButton) {
        isAudioAllowed = false;
        elemDisplay('initAudioButton', false);
        elemDisplay('initAudioVideoButton', false);
        elemDisplay('initVideoAudioRefreshButton', false);
        elemDisplay('initMicrophoneSelect', false);
        elemDisplay('initSpeakerSelect', false);
        elemDisplay('tabAudioDevicesBtn', false);
    }
    if (!BUTTONS.main.startScreenButton) {
        hide(initStartScreenButton);
    }

    this.initUser.classList.toggle('hidden');

    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: swalBackground,
        title: BRAND.app.name,
        input: 'text',
        inputPlaceholder: 'Enter your name',
        inputAttributes: { maxlength: 32 },
        inputValue: default_name,
        html: this.initUser, // Inject HTML
        confirmButtonText: `Join meeting`,
        customClass: { popup: 'init-modal-size' },
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        inputValidator: (name: string | any[]) => {
            if (!name) return 'Please enter your name';
            if (name.length > 30) return 'Name must be max 30 char';
            name = filterXSS(name);
            if (isHtml(name)) return 'Invalid name!';
            if (!getCookie(room_id + '_name')) {
                window.localStorage.peer_name = name;
            }
            setCookie(room_id + '_name', name, 30);
            peer_name = name;
        },
    }).then(async () => {
        if (initStream && !joinRoomWithScreen) {
            await stopTracks(initStream);
            elemDisplay('initVideo', false);
            initVideoContainerShow(false);
        }
        getPeerInfo();
        joinRoom(peer_name, room_id);
    });

    if (!this.isVideoAllowed) {
        elemDisplay('initVideo', false);
        initVideoContainerShow(false);
        hide(this.initVideoSelect);
    }
    if (!this.isAudioAllowed) {
        hide(this.initMicrophoneSelect);
        hide(this.initSpeakerSelect);
    }
  }

  async setSelectsInit(): Promise<void> {
    // Implementation for initializing select elements
  }
}
