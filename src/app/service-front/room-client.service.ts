
// // src/app/services/room-client.service.ts
// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
// import * as mediasoupClient from 'mediasoup-client';
// // import { cfg, html } from './room-client.config';

// @Injectable({
//   providedIn: 'root',
// })
// export class RoomClientService {
//   // src/app/services/room-client.config.ts
//   cfg = {
//   useAvatarSvg: true,
// };

//  html = {
//   newline: '\n',
//   hideMeOn: 'fas fa-user-slash',
//   hideMeOff: 'fas fa-user',
//   audioOn: 'fas fa-microphone',
//   audioOff: 'fas fa-microphone-slash',
//   videoOn: 'fas fa-video',
//   videoOff: 'fas fa-video-slash',
//   userName: 'username',
//   userHand: 'fas fa-hand-paper pulsate',
//   pip: 'fas fa-images',
//   fullScreen: 'fas fa-expand',
//   snapshot: 'fas fa-camera-retro',
//   sendFile: 'fas fa-upload',
//   sendMsg: 'fas fa-paper-plane',
//   sendVideo: 'fab fa-youtube',
//   geolocation: 'fas fa-location-dot',
//   ban: 'fas fa-ban',
//   kickOut: 'fas fa-times',
//   ghost: 'fas fa-ghost',
//   undo: 'fas fa-undo',
//   bg: 'fas fa-circle-half-stroke',
//   pin: 'fas fa-map-pin',
//   videoPrivacy: 'far fa-circle',
//   expand: 'fas fa-ellipsis-vertical',
// };
// icons = {
//   room: '<i class="fas fa-home"></i>',
//   chat: '<i class="fas fa-comments"></i>',
//   user: '<i class="fas fa-user"></i>',
//   transcript: '<i class="fas fa-closed-captioning"></i>',
//   speech: '<i class="fas fa-volume-high"></i>',
//   share: '<i class="fas fa-share-alt"></i>',
//   ptt: '<i class="fa-solid fa-hand-pointer"></i>',
//   lobby: '<i class="fas fa-shield-halved"></i>',
//   lock: '<i class="fa-solid fa-lock"></i>',
//   unlock: '<i class="fa-solid fa-lock-open"></i>',
//   pitchBar: '<i class="fas fa-microphone-lines"></i>',
//   sounds: '<i class="fas fa-music"></i>',
//   fileSend: '<i class="fa-solid fa-file-export"></i>',
//   fileReceive: '<i class="fa-solid fa-file-import"></i>',
//   recording: '<i class="fas fa-record-vinyl"></i>',
//   moderator: '<i class="fas fa-m"></i>',
//   broadcaster: '<i class="fa-solid fa-wifi"></i>',
//   codecs: '<i class="fa-solid fa-film"></i>',
//   theme: '<i class="fas fa-fill-drip"></i>',
//   recSync: '<i class="fa-solid fa-cloud-arrow-up"></i>',
//   refresh: '<i class="fas fa-rotate"></i>',
// };

//  image = {
//   about: '../images/mirotalk-logo.gif',
//   avatar: '../images/mirotalksfu-logo.png',
//   audio: '../images/audio.gif',
//   poster: '../images/loader.gif',
//   rec: '../images/rec.png',
//   recording: '../images/recording.png',
//   delete: '../images/delete.png',
//   locked: '../images/locked.png',
//   mute: '../images/mute.png',
//   hide: '../images/hide.png',
//   stop: '../images/stop.png',
//   unmute: '../images/unmute.png',
//   unhide: '../images/unhide.png',
//   start: '../images/start.png',
//   users: '../images/participants.png',
//   user: '../images/participant.png',
//   username: '../images/user.png',
//   videoShare: '../images/video-share.png',
//   message: '../images/message.png',
//   share: '../images/share.png',
//   exit: '../images/exit.png',
//   feedback: '../images/feedback.png',
//   lobby: '../images/lobby.png',
//   email: '../images/email.png',
//   chatgpt: '../images/chatgpt.png',
//   all: '../images/all.png',
//   forbidden: '../images/forbidden.png',
//   broadcasting: '../images/broadcasting.png',
//   geolocation: '../images/geolocation.png',
//   network: '../images/network.gif',
// };

//  mediaType = {
//   audio: 'audioType',
//   audioTab: 'audioTab',
//   video: 'videoType',
//   camera: 'cameraType',
//   screen: 'screenType',
//   speaker: 'speakerType',
// };

// _EVENTS = {
//   openRoom: 'openRoom',
//   exitRoom: 'exitRoom',
//   startRec: 'startRec',
//   pauseRec: 'pauseRec',
//   resumeRec: 'resumeRec',
//   stopRec: 'stopRec',
//   raiseHand: 'raiseHand',
//   lowerHand: 'lowerHand',
//   startVideo: 'startVideo',
//   pauseVideo: 'pauseVideo',
//   resumeVideo: 'resumeVideo',
//   stopVideo: 'stopVideo',
//   startAudio: 'startAudio',
//   pauseAudio: 'pauseAudio',
//   resumeAudio: 'resumeAudio',
//   stopAudio: 'stopAudio',
//   startScreen: 'startScreen',
//   pauseScreen: 'pauseScreen',
//   resumeScreen: 'resumeScreen',
//   stopScreen: 'stopScreen',
//   roomLock: 'roomLock',
//   lobbyOn: 'lobbyOn',
//   lobbyOff: 'lobbyOff',
//   roomUnlock: 'roomUnlock',
//   hostOnlyRecordingOn: 'hostOnlyRecordingOn',
//   hostOnlyRecordingOff: 'hostOnlyRecordingOff',
// };

// // Enums
//  enums = {
//   recording: {
//       started: 'Started conference recording',
//       start: 'Start conference recording',
//       stop: 'Stop conference recording',
//   },
//   //...
// };

// // HeyGen config
// VideoAI = {
//   enabled: true,
//   active: false,
//   info: {},
//   avatar: null,
//   avatarName: 'Monica',
//   avatarVoice: '',
//   quality: 'medium',
//   virtualBackground: true,
//   background: '../images/virtual/1.jpg',
// };

// // Recording
//  recordedBlobs = [];



// // Add icons, image, mediaType, _EVENTS, enums, VideoAI similarly...

//   constructor(
//     private localAudioEl: any,
//     private remoteAudioEl: any,
//     private videoMediaContainer: any,
//     private videoPinMediaContainer: any,
//     private mediasoupClient: any,
//     private socket: any,
//     private room_id: string,
//     private peer_name: string,
//     private peer_uuid: string,
//     private peer_info: any,
//     private isAudioAllowed: boolean,
//     private isVideoAllowed: boolean,
//     private isScreenAllowed: boolean,
//     private joinRoomWithScreen: boolean,
//     private isSpeechSynthesisSupported: boolean,
//     private transcription: any,
//     private successCallback: Function
//   ) {
//     // this.initialize();
//     this.localAudioEl = localAudioEl;
//     this.remoteAudioEl = remoteAudioEl;
//     this.videoMediaContainer = videoMediaContainer;
//     this.videoPinMediaContainer = videoPinMediaContainer;
//     this.mediasoupClient = mediasoupClient;

//     this.socket = socket;
//     this.room_id = room_id;
//     this.peer_id = socket.id;
//     this.peer_name = peer_name;
//     this.peer_uuid = peer_uuid;
//     this.peer_info = peer_info;

//     // Moderator
//     this._moderator = {
//         audio_start_muted: false,
//         video_start_hidden: false,
//         audio_cant_unmute: false,
//         video_cant_unhide: false,
//         screen_cant_share: false,
//         chat_cant_privately: false,
//         chat_cant_chatgpt: false,
//     };

//     // Chat messages
//     this.chatMessageLengthCheck = false;
//     this.chatMessageLength = 4000; // chars
//     this.chatMessageTimeLast = 0;
//     this.chatMessageTimeBetween = 1000; // ms
//     this.chatMessageNotifyDelay = 10000; // ms
//     this.chatMessageSpamCount = 0;
//     this.chatMessageSpamCountToBan = 10;

//     // HeyGen Video AI
//     this.videoAIContainer = null;
//     this.videoAIElement = null;
//     this.canvasAIElement = null;
//     this.renderAIToken = null;
//     this.peerConnection = null;

//     this.isAudioAllowed = isAudioAllowed;
//     this.isVideoAllowed = isVideoAllowed;
//     this.isScreenAllowed = isScreenAllowed;
//     this.joinRoomWithScreen = joinRoomWithScreen;
//     this.producerTransport = null;
//     this.consumerTransport = null;
//     this.device = null;

//     this.isMobileDevice = DetectRTC.isMobileDevice;
//     this.isScreenShareSupported =
//         navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia ? true : false;

//     this.isMySettingsOpen = false;

//     this._isConnected = false;
//     this.isVideoOnFullScreen = false;
//     this.isVideoFullScreenSupported = this.isFullScreenSupported();
//     this.isVideoPictureInPictureSupported = document.pictureInPictureEnabled;
//     this.isZoomCenterMode = false;
//     this.isChatOpen = false;
//     this.isChatEmojiOpen = false;
//     this.isSpeechSynthesisSupported = isSpeechSynthesisSupported;
//     this.speechInMessages = false;
//     this.showChatOnMessage = true;
//     this.isChatBgTransparent = false;
//     this.isVideoPinned = false;
//     this.isChatPinned = false;
//     this.isChatMaximized = false;
//     this.isToggleUnreadMsg = false;
//     this.isToggleRaiseHand = false;
//     this.pinnedVideoPlayerId = null;
//     this.camVideo = false;
//     this.camera = 'user';
//     this.videoQualitySelectedIndex = 0;

//     this.chatGPTContext = [];
//     this.chatMessages = [];
//     this.leftMsgAvatar = null;
//     this.rightMsgAvatar = null;

//     this.localVideoStream = null;
//     this.localAudioStream = null;
//     this.localScreenStream = null;

//     this.RoomPassword = false;

//     this.transcription = transcription;

//     // File transfer settings
//     this.fileToSend = null;
//     this.fileReader = null;
//     this.receiveBuffer = [];
//     this.receivedSize = 0;
//     this.incomingFileInfo = null;
//     this.incomingFileData = null;
//     this.sendInProgress = false;
//     this.receiveInProgress = false;
//     this.fileSharingInput = '*';
//     this.chunkSize = 1024 * 16; // 16kb/s

//     // Recording
//     this._isRecording = false;
//     this.mediaRecorder = null;
//     this.audioRecorder = null;
//     this.recScreenStream = null;
//     this.recSyncServerRecording = false;
//     this.recSyncTime = 4000; // 4 sec
//     this.recSyncChunkSize = 1000000; // 1MB

//     // Encodings
//     this.forceVP8 = false; // Force VP8 codec for webcam and screen sharing
//     this.forceVP9 = false; // Force VP9 codec for webcam and screen sharing
//     this.forceH264 = false; // Force H264 codec for webcam and screen sharing
//     this.enableWebcamLayers = true; // Enable simulcast or SVC for webcam
//     this.enableSharingLayers = true; // Enable simulcast or SVC for screen sharing
//     this.numSimulcastStreamsWebcam = 3; // Number of streams for simulcast in webcam
//     this.numSimulcastStreamsSharing = 1; // Number of streams for simulcast in screen sharing
//     this.webcamScalabilityMode = 'L3T3'; // Scalability Mode for webcam | 'L1T3' for VP8/H264 (in each simulcast encoding), 'L3T3_KEY' for VP9
//     this.sharingScalabilityMode = 'L1T3'; // Scalability Mode for screen sharing | 'L1T3' for VP8/H264 (in each simulcast encoding), 'L3T3' for VP9

//     this.myVideoEl = null;
//     this.myAudioEl = null;
//     this.showPeerInfo = false; // on peerName mouse hover

//     this.videoProducerId = null;
//     this.screenProducerId = null;
//     this.audioProducerId = null;
//     this.audioConsumers = new Map();

//     this.consumers = new Map();
//     this.producers = new Map();
//     this.producerLabel = new Map();
//     this.eventListeners = new Map();

//     this.debug = false;
//     this.debug ? window.localStorage.setItem('debug', 'mediasoup*') : window.localStorage.removeItem('debug');

//     console.log('06 ----> Load MediaSoup Client v', mediasoupClient.version);
//     console.log('06.1 ----> PEER_ID', this.peer_id);

//     Object.keys(_EVENTS).forEach((evt) => {
//         this.eventListeners.set(evt, []);
//     });

//     this.socket.request = function request(type, data = {}) {
//         return new Promise((resolve, reject) => {
//             socket.emit(type, data, (data) => {
//                 if (data.error) {
//                     reject(data.error);
//                 } else {
//                     resolve(data);
//                 }
//             });
//         });
//     };

//     // ####################################################
//     // CREATE ROOM AND JOIN
//     // ####################################################

//     this.createRoom(this.room_id).then(async () => {
//         const data = {
//             room_id: this.room_id,
//             peer_info: this.peer_info,
//         };
//         await this.join(data);
//         this.initSockets();
//         this._isConnected = true;
//         successCallback();
//     });

//   }

//   private initialize() {
//     // Your initialization logic here
//   }

//   private async createRoom(room_id: string) {
//     await this.socket.request('createRoom', { room_id }).catch((err: any) => {
//       console.log('Create room:', err);
//     });
//   }

//   async join(data: any) {
//     this.socket
//       .request('join', data)
//       .then(async (room: any) => {
//         console.log('##### JOIN ROOM #####', room);
//         if (room === 'unauthorized') {
//           console.log('00-WARNING ----> Room is Unauthorized for current user');
//           return this.userUnauthorized();
//         }
//         // Handle other cases...
//         await this.joinAllowed(room);
//       })
//       .catch((error: any) => {
//         console.error('Join error:', error);
//       });
//   }

//   // Other methods...

//   private userUnauthorized() {
//     // Implementation for userUnauthorized
//   }

//   private joinAllowed(room: any) {
//     // Implementation for joinAllowed
//   }
// }
