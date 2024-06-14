import { Component, OnDestroy, OnInit } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ SvgIconComponent, ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit, OnDestroy{
  adjectives: string[] = [
    // your adjectives here...
    'small',
    'big',
    'large',
    'smelly',
    'new',
    'happy',
    'shiny',
    'old',
    'clean',
    'nice',
    'bad',
    'cool',
    'hot',
    'cold',
    'warm',
    'hungry',
    'slow',
    'fast',
    'red',
    'white',
    'black',
    'blue',
    'green',
    'basic',
    'strong',
    'cute',
    'poor',
    'nice',
    'huge',
    'rare',
    'lucky',
    'weak',
    'tall',
    'short',
    'tiny',
    'great',
    'long',
    'single',
    'rich',
    'young',
    'dirty',
    'fresh',
    'brown',
    'dark',
    'crazy',
    'sad',
    'loud',
    'brave',
    'calm',
    'silly',
    'smart',
  ];
  nouns: string[] = [
    // your nouns here...

    'dog',
    'bat',
    'wrench',
    'apple',
    'pear',
    'ghost',
    'cat',
    'wolf',
    'squid',
    'goat',
    'snail',
    'hat',
    'sock',
    'plum',
    'bear',
    'snake',
    'turtle',
    'horse',
    'spoon',
    'fork',
    'spider',
    'tree',
    'chair',
    'table',
    'couch',
    'towel',
    'panda',
    'bread',
    'grape',
    'cake',
    'brick',
    'rat',
    'mouse',
    'bird',
    'oven',
    'phone',
    'photo',
    'frog',
    'bear',
    'camel',
    'sheep',
    'shark',
    'tiger',
    'zebra',
    'duck',
    'eagle',
    'fish',
    'kitten',
    'lobster',
    'monkey',
    'owl',
    'puppy',
    'pig',
    'rabbit',
    'fox',
    'whale',
    'beaver',
    'gorilla',
    'lizard',
    'parrot',
    'sloth',
    'swan',
  ];

  snowEnabled = false;
   snowContent = ['❄', '❅', '❆'];
     snowContainer: HTMLElement | null = null;
     constructor() { }
        random(num: number): number {
          return Math.floor(Math.random() * num);
        }

        getRandomStyles(): string {
          const top = this.random(100);
          const left = this.random(100);
          const dur = this.random(10) + 10;
          const size = this.random(25) + 25;
          return `
            top: -${top}%;
            left: ${left}%;
            font-size: ${size}px;
            animation-duration: ${dur}s;
          `;
        }

        createSnow(num: number): void {
          for (let i = num; i > 0; i--) {
            let snow = document.createElement('div');
            snow.className = 'snow';
            snow.style.cssText = this.getRandomStyles();
            snow.innerHTML = this.snowContent[this.random(3)];
            this.snowContainer?.append(snow);
          }
        }

        removeSnow(): void {
          if (this.snowContainer) {
            this.snowContainer.style.opacity = '0';
            setTimeout(() => {
              this.snowContainer?.remove();
            }, 500);
          }
        }

        ngOnInit(): void {
          let adjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
          let noun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
          let num = this.getRandomNumber(5);
          noun = noun.charAt(0).toUpperCase() + noun.substring(1);
          adjective = adjective.charAt(0).toUpperCase() + adjective.substring(1);
          const roomName = document.getElementById('roomName') as HTMLInputElement;
      
          let i = 0;
          let txt = num + adjective + noun;
          let speed = 100;
      
          if (roomName) {
            roomName.value = '';
            this.typeWriter(i, txt, speed, roomName);
          }
      
          // your other code here...

          this.snowContainer = document.getElementById('snow-container');
          if (this.snowEnabled) {
            this.createSnow(30);
            setTimeout(() => this.removeSnow(), 1000 * 60);
          }
          window.addEventListener('click', () => {
            if (this.snowEnabled) {
              this.removeSnow();
            }
          });

          // ####################################################################
// LANDING | NEW ROOM
// ####################################################################
const lastRoomContainer = document.getElementById('lastRoomContainer') as HTMLElement;
const lastRoom = document.getElementById('lastRoom') as HTMLAnchorElement;
const lastRoomName = window.localStorage['lastRoom'] ? window.localStorage['lastRoom'] : '';
if (lastRoomContainer && lastRoom && lastRoomName) {
    lastRoomContainer.style.display = 'inline-flex';
    lastRoom.setAttribute('href', '/join/' + lastRoomName);
    lastRoom.innerText = lastRoomName;
}

const genRoomButton = document.getElementById('genRoomButton') as HTMLButtonElement;
const joinRoomButton = document.getElementById('joinRoomButton') as HTMLButtonElement;
const adultCnt = document.getElementById('adultCnt') as HTMLButtonElement;

if (genRoomButton) {
    genRoomButton.onclick = () => {
        this.genRoom();
    };
}

if (joinRoomButton) {
    joinRoomButton.onclick = () => {
        this.joinRoom();
    };
}

if (adultCnt) {
    adultCnt.onclick = () => {
        this.adultContent();
    };
}


roomName.onkeyup = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        this.joinRoom();
    }
};

   }
      
        ngOnDestroy(): void {
          // your cleanup code here...

          this.removeSnow();
        }
      
        getRandomNumber(length: number): string {
          let result = '';
          let characters = '0123456789';
          let charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
        }
      
        typeWriter(i: number, txt: string, speed: number, roomName: HTMLInputElement): void {
          if (i < txt.length) {
            roomName.value += txt.charAt(i);
            i++;
            setTimeout(() => this.typeWriter(i, txt, speed, roomName), speed);
          }
        }
        genRoom(): void {
          const roomName = document.getElementById('roomName') as HTMLInputElement;
          roomName.value = this.getUUID4();
        }
     
        getUUID4(): string {
          return ((1e7).toString() + (-1e3).toString() + (-4e3).toString() + (-8e3).toString() + (-1e11).toString()).replace(/[018]/g, c =>
            (parseInt(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))).toString(16)
          );
        }
      
        joinRoom(): void {
          const roomName = document.getElementById('roomName') as HTMLInputElement;
          const roomNameValue =roomName.value;
          if (roomNameValue) {
              window.location.href = '/join/' + roomNameValue;
              window.localStorage['lastRoom'] = roomNameValue;
          } else {
              alert('Room name empty!\nPlease pick a room name.');
          }
        }
      
        adultContent(): void {
          if (
              confirm(
                  '18+ WARNING! ADULTS ONLY!\n\nExplicit material for viewing by adults 18 years of age or older. You must be at least 18 years old to access to this site!\n\nProceeding you are agree and confirm to have 18+ year.',
              )
          ) {
              window.open('https://luvlounge.ca', '_blank');
          }
        }
      
       
}


// @Component({
//   selector: 'app-snow',
//   templateUrl: './snow.component.html',
//   styleUrls: ['./snow.component.css']
// })


  // ngOnInit(): void {
  //   this.snowContainer = document.getElementById('snow-container');
  //   if (this.snowEnabled) {
  //     this.createSnow(30);
  //     setTimeout(() => this.removeSnow(), 1000 * 60);
  //   }
  //   window.addEventListener('click', () => {
  //     if (this.snowEnabled) {
  //       this.removeSnow();
  //     }
  //   });
  // }



  // getRandomStyles(): string {
  //  
  // }

  // createSnow(num: number): void {
  //  
  //   }
  // }

//   removeSnow(): void {
//   
//     }
//   }
// }


// @Component({
//   selector: 'app-room',
//   templateUrl: './room.component.html',
//   styleUrls: ['./room.component.css']
// })
// export class RoomComponent implements OnInit, OnDestroy {
//   adjectives: string[] = [
//     // your adjectives here...
//   ];

//   nouns: string[] = [
//     // your nouns here...
//   ];

//   // constructor() { }

//   ngOnInit(): void {
//     let adjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
//     let noun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
//     let num = this.getRandomNumber(5);
//     noun = noun.charAt(0).toUpperCase() + noun.substring(1);
//     adjective = adjective.charAt(0).toUpperCase() + adjective.substring(1);

//     let i = 0;
//     let txt = num + adjective + noun;
//     let speed = 100;

//     const roomName = document.getElementById('roomName');
//     if (roomName) {
//       roomName.value = '';
//       this.typeWriter(i, txt, speed, roomName);
//     }

//     // your other code here...
//   }

//   ngOnDestroy(): void {
//     // your cleanup code here...
//   }

//   getRandomNumber(length: number): string {
//     let result = '';
//     let characters = '0123456789';
//     let charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   }

//   typeWriter(i: number, txt: string, speed: number, roomName: HTMLInputElement): void {
//     if (i < txt.length) {
//       roomName.value += txt.charAt(i);
//       i++;
//       setTimeout(() => this.typeWriter(i, txt, speed, roomName), speed);
//     }
//   }

//   // your other functions here...
// }


// ####################################################################
// LANDING | NEW ROOM
// ####################################################################

// import { Component, OnInit, OnDestroy } from '@angular/core';

// @Component({
//   selector: 'app-room',
//   templateUrl: './room.component.html',
//   styleUrls: ['./room.component.css']
// })
// export class RoomComponent implements OnInit, OnDestroy {

//   constructor() { }

  // ngOnInit(): void {
  //   const lastRoomContainer = document.getElementById('lastRoomContainer') as HTMLElement;
  //   const lastRoom = document.getElementById('lastRoom') as HTMLAnchorElement;
  //   const lastRoomName = window.localStorage.lastRoom ? window.localStorage.lastRoom : '';
  //   if (lastRoomContainer && lastRoom && lastRoomName) {
  //       lastRoomContainer.style.display = 'inline-flex';
  //       lastRoom.setAttribute('href', '/join/' + lastRoomName);
  //       lastRoom.innerText = lastRoomName;
  //   }

  //   const genRoomButton = document.getElementById('genRoomButton') as HTMLButtonElement;
  //   const joinRoomButton = document.getElementById('joinRoomButton') as HTMLButtonElement;
  //   const adultCnt = document.getElementById('adultCnt') as HTMLButtonElement;

  //   if (genRoomButton) {
  //       genRoomButton.onclick = () => {
  //           this.genRoom();
  //       };
  //   }

  //   if (joinRoomButton) {
  //       joinRoomButton.onclick = () => {
  //           this.joinRoom();
  //       };
  //   }

  //   if (adultCnt) {
  //       adultCnt.onclick = () => {
  //           this.adultContent();
  //       };
  //   }

  //   const roomName = document.getElementById('roomName') as HTMLInputElement;
  //   roomName.onkeyup = (e) => {
  //       if (e.keyCode === 13) {
  //           e.preventDefault();
  //           this.joinRoom();
  //       }
  //   };
  // }



//   genRoom(): void {
//     const roomName = document.getElementById('roomName') as HTMLInputElement;
//     roomName.value = this.getUUID4();
//   }

//   getUUID4(): string {
//     return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//         (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
//     );
//   }

//   joinRoom(): void {
//     const roomName = document.getElementById('roomName') as HTMLInputElement;
//     const roomNameValue = this.filterXSS(roomName.value);
//     if (roomNameValue) {
//         window.location.href = '/join/' + roomNameValue;
//         window.localStorage.lastRoom = roomNameValue;
//     } else {
//         alert('Room name empty!\nPlease pick a room name.');
//     }
//   }

//   adultContent(): void {
//     if (
//         confirm(
//             '18+ WARNING! ADULTS ONLY!\n\nExplicit material for viewing by adults 18 years of age or older. You must be at least 18 years old to access to this site!\n\nProceeding you are agree and confirm to have 18+ year.',
//         )
//     ) {
//         window.open('https://luvlounge.ca', '_blank');
//     }
//   }


// }
