import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import axios from 'axios';
import * as DetectRTC from 'detectrtc';
import { io } from 'socket.io-client';
import tippy from 'tippy.js';
import { LocalstorageService } from '../../service-front/localstorage.service';
import { TranscriptionService } from '../../service-front/transcription.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit,OnDestroy {
   private localAudioEl: any;
   private remoteAudioEl: any;
   private videoMediaContainer: any;
   private videoPinMediaContainer: any;
   private mediasoupClient: any;
   private peer_id: any;
   private _moderator: { 
        audio_start_muted: boolean; 
        video_start_hidden: boolean;
         audio_cant_unmute: boolean;
          video_cant_unhide: boolean; 
          screen_cant_share: boolean;
           chat_cant_privately: boolean;
            chat_cant_chatgpt: boolean;
        };
 private   chatMessageLengthCheck: boolean;
 private   chatMessageLength: number;
 private   chatMessageTimeLast: number;
 private   chatMessageTimeBetween: number;
 private   chatMessageNotifyDelay: number;
 private   chatMessageSpamCount: number;
 private   chatMessageSpamCountToBan: number;
 private   videoAIContainer: null;
 private   videoAIElement: null;
 private   canvasAIElement: null;
 private   renderAIToken: null;
 private   peerConnection: null;
 private   producerTransport: null;
 private   consumerTransport: null;
 private   device: null;
 private   isMobileDevice: any;
 private   isScreenShareSupported: boolean;
 private   isMySettingsOpen: boolean;
 private   _isConnected: boolean;
 private   isVideoOnFullScreen: boolean;
 private   isVideoFullScreenSupported: any;
 private   isVideoPictureInPictureSupported: boolean;
 private   isZoomCenterMode: boolean;
 private   isChatOpen: boolean;
 private   isChatEmojiOpen: boolean;
 private   speechInMessages: boolean;
 private   showChatOnMessage: boolean;
 private   isChatBgTransparent: boolean;
 private   isVideoPinned: boolean;
 private   isChatPinned: boolean;
 private   isChatMaximized: boolean;
 private   isToggleUnreadMsg: boolean;
 private   isToggleRaiseHand: boolean;
 private   pinnedVideoPlayerId: null;
 private   camVideo: boolean;
 private   camera: string;
 private   videoQualitySelectedIndex: number;
 private   chatGPTContext: never[];
 private   chatMessages: never[];
 private   leftMsgAvatar: null;
 private   rightMsgAvatar: null;
 private   localVideoStream: null;
 private   localAudioStream: null;
 private   localScreenStream: null;
 private   RoomPassword: boolean;
 private   fileToSend: null;
 private   fileReader: null;
 private   receiveBuffer: never[];
 private   receivedSize: number;
 private   incomingFileInfo: null;
 private   incomingFileData: null;
 private   sendInProgress: boolean;
 private   receiveInProgress: boolean;
 private   fileSharingInput: string;
 private   chunkSize: number;
 private   _isRecording: boolean;
 private   mediaRecorder: null;
 private   audioRecorder: null;
 private   recScreenStream: null;
 private   recSyncServerRecording: boolean;
 private   recSyncTime: number;
 private   recSyncChunkSize: number;
 private   forceVP8: boolean;
 private   forceVP9: boolean;
 private   forceH264: boolean;
 private   enableWebcamLayers: boolean;
 private   enableSharingLayers: boolean;
 private   numSimulcastStreamsWebcam: number;
 private   numSimulcastStreamsSharing: number;
 private   webcamScalabilityMode: string;
 private   sharingScalabilityMode: string;
 private   myVideoEl: null;
 private   myAudioEl: null;
 private   showPeerInfo: boolean;
 private   videoProducerId: null;
 private   screenProducerId: null;
 private   audioProducerId: null;
 private   audioConsumers: Map<any, any>;
 private   consumers: Map<any, any>;
 private   producers: Map<any, any>;
 private   producerLabel: Map<any, any>;
 private   eventListeners: Map<any, any>;
 private   debug: boolean;
    getId(arg0: string) {
        throw new Error('Method not implemented.');
    }
  
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }
  ngOnInit(): void {
    this.isScreenShareSupported =  navigator.getDisplayMedia || (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia);
    this.transcriptionService.resizeVideoMedia();
    this.transcriptionService.resizeMainButtons();

    // Adding window resize event listener
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }
  const socket = io({ transports: ['websocket'] });

 survey = {
    enabled: true,
    url: 'https://www.questionpro.com/t/AUs7VZq02P',
  };

    redirect = {
    enabled: true,
    url: '/newroom',
 };

const recCodecs = null;
const recPrioritizeH264 = false;

const _PEER = {
    presenter: '<i class="fa-solid fa-user-shield"></i>',
    guest: '<i class="fa-solid fa-signal"></i>',
    audioOn: '<i class="fas fa-microphone"></i>',
    audioOff: '<i style="color: red;" class="fas fa-microphone-slash"></i>',
    videoOn: '<i class="fas fa-video"></i>',
    videoOff: '<i style="color: red;" class="fas fa-video-slash"></i>',
    screenOn: '<i class="fas fa-desktop"></i>',
    screenOff: '<i style="color: red;" class="fas fa-desktop"></i>',
    raiseHand: '<i style="color: rgb(0, 255, 71);" class="fas fa-hand-paper pulsate"></i>',
    lowerHand: '',
    acceptPeer: '<i class="fas fa-check"></i>',
    banPeer: '<i class="fas fa-ban"></i>',
    ejectPeer: '<i class="fas fa-times"></i>',
    geoLocation: '<i class="fas fa-location-dot"></i>',
    sendFile: '<i class="fas fa-upload"></i>',
    sendMsg: '<i class="fas fa-paper-plane"></i>',
    sendVideo: '<i class="fab fa-youtube"></i>',
};

const initUser = document.getElementById('initUser');
const initVideoContainerClass = document.querySelector('.init-video-container');
const bars = document.querySelectorAll('.volume-bar');

const userAgent = navigator.userAgent.toLowerCase();
const isTabletDevice = isTablet(this.userAgent);
const isIPadDevice = isIpad(this.userAgent);

const Base64Prefix = 'data:application/pdf;base64,';

const wbImageInput = 'image/*';
const wbPdfInput = 'application/pdf';
const wbWidth = 1200;
const wbHeight = 600;

const swalImageUrl = '../images/pricing-illustration.svg';

// Media
const sinkId = 'sinkId' in HTMLMediaElement.prototype;

// ####################################################
// LOCAL STORAGE
// ####################################################

 lS = new this.LocalstorageService();

const localStorageSettings = this.lS.getLocalStorageSettings() || this.lS.SFU_SETTINGS;

const localStorageDevices = this.lS.getLocalStorageDevices() || this.lS.LOCAL_STORAGE_DEVICES;

const localStorageInitConfig = this.lS.getLocalStorageInitConfig() || this.lS.INIT_CONFIG;



// ####################################################
// THEME CUSTOM COLOR - PICKER
// ####################################################

 const themeCustom = {
    input: document.getElementById('themeColorPicker'),
    color: this.localStorageSettings.theme_color ? this.localStorageSettings.theme_color : '#000000',
    keep: this.localStorageSettings.theme_custom ? this.localStorageSettings.theme_custom : false,
};

const pickr = Pickr.create({
    el: this.themeCustom.input,
    theme: 'classic', // or 'monolith', or 'nano'
    default: this.themeCustom.color,
    useAsButton: true,

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)',
    ],

    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: false,
            clear: false,
            save: false,
        },
    },
})
    .on('init', (pickr) => {
        this.themeCustom.input.value = pickr.getSelectedColor().toHEXA().toString(0);
    })
    .on('change', (color) => {
        this.themeCustom.color = color.toHEXA().toString();
        this.themeCustom.input.value = this.themeCustom.color;
        setCustomTheme();
    })
    .on('changestop', () => {
        this.localStorageSettings.theme_color = this.themeCustom.color;
        this.lS.setSettings(this.localStorageSettings);
    });

// ####################################################
// ENUMERATE DEVICES SELECTS
// ####################################################

private videoSelect = this.getId('videoSelect');
private initVideoSelect =this.getId('initVideoSelect');
private microphoneSelect =this.getId('microphoneSelect');
private initMicrophoneSelect = this.getId('initMicrophoneSelect');
private speakerSelect = this.getId('speakerSelect');
private initSpeakerSelect = this.getId('initSpeakerSelect');

// ####################################################
// DYNAMIC SETTINGS
// ####################################################

private swalBackground = 'radial-gradient(#393939, #000000)'; //'rgba(0, 0, 0, 0.7)';
private rc = null;
private producer = null;
private participantsCount = 0;
private lobbyParticipantsCount = 0;
private chatMessagesId = 0;
private room_id = getRoomId();
private room_password = getRoomPassword();
private peer_name = getPeerName();
private peer_uuid = getPeerUUID();
private peer_token = getPeerToken();
private isScreenAllowed = getScreen();
private isHideMeActive = getHideMeActive();
private notify = getNotify();
private isPresenter = isPeerPresenter();

 private peer_info = null;
private isPushToTalkActive = false;
private isSpaceDown = false;
private isPitchBarEnabled = true;
private isSoundEnabled = true;
private isBroadcastingEnabled = false;
private isLobbyEnabled = false;
private isLobbyOpen = false;
private hostOnlyRecording = false;
private isEnumerateAudioDevices = false;
private isEnumerateVideoDevices = false;
private isAudioAllowed = false;
private isVideoAllowed = false;
private isVideoPrivacyActive = false;
private isRecording = false;
private isAudioVideoAllowed = false;
private isParticipantsListOpen = false;
private isVideoControlsOn = false;
private isChatPasteTxt = false;
private isChatMarkdownOn = false;
private isChatGPTOn = false;
private isSpeechSynthesisSupported = 'speechSynthesis' in window;
private joinRoomWithoutAudioVideo = true;
private joinRoomWithScreen = false;
private recTimer = null;
private recElapsedTime = null;

private wbCanvas = null;
private wbIsLock = false;
private wbIsDrawing = false;
private wbIsOpen = false;
private wbIsRedoing = false;
private wbIsEraser = false;
private wbIsBgTransparent = false;
private wbPop = [];
private coords = {};
private isButtonsVisible = false;
private isButtonsBarOver = false;
private isRoomLocked = false;
private initStream = null;
private scriptProcessor = null;
private RoomURL = window.location.origin + '/join/' + this.room_id; // window.location.origin + '/join/?room=' + roomId + '&token=' + myToken
private transcription: any;
 private showFreeAvatars = true;
const cfg = {
  useAvatarSvg: true,
};

private html = {
  newline: '\n', //'<br />',
  hideMeOn: 'fas fa-user-slash',
  hideMeOff: 'fas fa-user',
  audioOn: 'fas fa-microphone',
  audioOff: 'fas fa-microphone-slash',
  videoOn: 'fas fa-video',
  videoOff: 'fas fa-video-slash',
  userName: 'username',
  userHand: 'fas fa-hand-paper pulsate',
  pip: 'fas fa-images',
  fullScreen: 'fas fa-expand',
  snapshot: 'fas fa-camera-retro',
  sendFile: 'fas fa-upload',
  sendMsg: 'fas fa-paper-plane',
  sendVideo: 'fab fa-youtube',
  geolocation: 'fas fa-location-dot',
  ban: 'fas fa-ban',
  kickOut: 'fas fa-times',
  ghost: 'fas fa-ghost',
  undo: 'fas fa-undo',
  bg: 'fas fa-circle-half-stroke',
  pin: 'fas fa-map-pin',
  videoPrivacy: 'far fa-circle',
  expand: 'fas fa-ellipsis-vertical',
};

private icons = {
  room: '<i class="fas fa-home"></i>',
  chat: '<i class="fas fa-comments"></i>',
  user: '<i class="fas fa-user"></i>',
  transcript: '<i class="fas fa-closed-captioning"></i>',
  speech: '<i class="fas fa-volume-high"></i>',
  share: '<i class="fas fa-share-alt"></i>',
  ptt: '<i class="fa-solid fa-hand-pointer"></i>',
  lobby: '<i class="fas fa-shield-halved"></i>',
  lock: '<i class="fa-solid fa-lock"></i>',
  unlock: '<i class="fa-solid fa-lock-open"></i>',
  pitchBar: '<i class="fas fa-microphone-lines"></i>',
  sounds: '<i class="fas fa-music"></i>',
  fileSend: '<i class="fa-solid fa-file-export"></i>',
  fileReceive: '<i class="fa-solid fa-file-import"></i>',
  recording: '<i class="fas fa-record-vinyl"></i>',
  moderator: '<i class="fas fa-m"></i>',
  broadcaster: '<i class="fa-solid fa-wifi"></i>',
  codecs: '<i class="fa-solid fa-film"></i>',
  theme: '<i class="fas fa-fill-drip"></i>',
  recSync: '<i class="fa-solid fa-cloud-arrow-up"></i>',
  refresh: '<i class="fas fa-rotate"></i>',
};

private icons = {
    image = {
  about: '../assets/images/mirotalk-logo.gif',
  avatar: '../assets/images/mirotalksfu-logo.png',
  audio: '../assets/images/audio.gif',
  poster: '../assets/images/loader.gif',
  rec: '../assets/images/rec.png',
  recording: '../assets/images/recording.png',
  delete: '../assets/images/delete.png',
  locked: '../assets/images/locked.png',
  mute: '../assets/images/mute.png',
  hide: '../assets/images/hide.png',
  stop: '../assets/images/stop.png',
  unmute: '../assets/images/unmute.png',
  unhide: '../assets/images/unhide.png',
  start: '../assets/images/start.png',
  users: '../assets/images/participants.png',
  user: '../assets/images/participant.png',
  username: '../assets/images/user.png',
  videoShare: '../assets/images/video-share.png',
  message: '../assets/images/message.png',
  share: '../assets/images/share.png',
  exit: '../assets/images/exit.png',
  feedback: '../assets/images/feedback.png',
  lobby: '../assets/images/lobby.png',
  email: '../assets/images/email.png',
  chatgpt: '../assets/images/chatgpt.png',
  all: '../assets/images/all.png',
  forbidden: '../assets/images/forbidden.png',
  broadcasting: '../assets/images/broadcasting.png',
  geolocation: '../assets/images/geolocation.png',
  network: '../assets/images/network.gif',
}};

private mediaType = {
  audio: 'audioType',
  audioTab: 'audioTab',
  video: 'videoType',
  camera: 'cameraType',
  screen: 'screenType',
  speaker: 'speakerType',
};

const _EVENTS = {
  openRoom: 'openRoom',
  exitRoom: 'exitRoom',
  startRec: 'startRec',
  pauseRec: 'pauseRec',
  resumeRec: 'resumeRec',
  stopRec: 'stopRec',
  raiseHand: 'raiseHand',
  lowerHand: 'lowerHand',
  startVideo: 'startVideo',
  pauseVideo: 'pauseVideo',
  resumeVideo: 'resumeVideo',
  stopVideo: 'stopVideo',
  startAudio: 'startAudio',
  pauseAudio: 'pauseAudio',
  resumeAudio: 'resumeAudio',
  stopAudio: 'stopAudio',
  startScreen: 'startScreen',
  pauseScreen: 'pauseScreen',
  resumeScreen: 'resumeScreen',
  stopScreen: 'stopScreen',
  roomLock: 'roomLock',
  lobbyOn: 'lobbyOn',
  lobbyOff: 'lobbyOff',
  roomUnlock: 'roomUnlock',
  hostOnlyRecordingOn: 'hostOnlyRecordingOn',
  hostOnlyRecordingOff: 'hostOnlyRecordingOff',
};

// Enums
const enums = {
  recording: {
      started: 'Started conference recording',
      start: 'Start conference recording',
      stop: 'Stop conference recording',
  },
  //...
};

// HeyGen config
const VideoAI = {
  enabled: true,
  active: false,
  info: {},
  avatar: null,
  avatarName: 'Monica',
  avatarVoice: '',
  quality: 'medium',
  virtualBackground: true,
  background: '../images/virtual/1.jpg',
};

// Recording
 private recordedBlobs = [];

  constructor(
    localAudioEl: any,
    remoteAudioEl: any,
    videoMediaContainer: any,
    videoPinMediaContainer: any,
    mediasoupClient: any,
    socket: any,
    room_id: string,
    peer_name: string,
    peer_uuid: string,
    peer_info: any,
    isAudioAllowed: boolean,
    isVideoAllowed: boolean,
    isScreenAllowed: boolean,
    joinRoomWithScreen: boolean,
    isSpeechSynthesisSupported: boolean,
    transcription: any,
    successCallback: Function,
    private http: HttpClient,
    private transcriptionService: TranscriptionService,
    private LocalstorageService: LocalstorageService

  ) { 
    
    this.localAudioEl =  localAudioEl;
        this.remoteAudioEl =  remoteAudioEl;
        this.videoMediaContainer =  videoMediaContainer;
        this.videoPinMediaContainer =  videoPinMediaContainer;
        this.mediasoupClient =  mediasoupClient;

        this.socket =  socket;
        this.room_id = room_id;
        this.peer_id = socket.id;
        this.peer_name = peer_name;
        this.peer_uuid = peer_uuid;
        this.peer_info = peer_info;

        // Moderator
        this._moderator = {
            audio_start_muted: false,
            video_start_hidden: false,
            audio_cant_unmute: false,
            video_cant_unhide: false,
            screen_cant_share: false,
            chat_cant_privately: false,
            chat_cant_chatgpt: false,
        };

        // Chat messages
        this.chatMessageLengthCheck = false;
        this.chatMessageLength = 4000; // chars
        this.chatMessageTimeLast = 0;
        this.chatMessageTimeBetween = 1000; // ms
        this.chatMessageNotifyDelay = 10000; // ms
        this.chatMessageSpamCount = 0;
        this.chatMessageSpamCountToBan = 10;

        // HeyGen Video AI
        this.videoAIContainer = null;
        this.videoAIElement = null;
        this.canvasAIElement = null;
        this.renderAIToken = null;
        this.peerConnection = null;

        this.isAudioAllowed = isAudioAllowed;
        this.isVideoAllowed = isVideoAllowed;
        this.isScreenAllowed = isScreenAllowed;
        this.joinRoomWithScreen = joinRoomWithScreen;
        this.producerTransport = null;
        this.consumerTransport = null;
        this.device = null;

        this.isMobileDevice = DetectRTC.isMobileDevice;
        this.isScreenShareSupported =
            navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia ? true : false;

        this.isMySettingsOpen = false;

        this._isConnected = false;
        this.isVideoOnFullScreen = false;
        this.isVideoFullScreenSupported = this.isFullScreenSupported();
        this.isVideoPictureInPictureSupported = document.pictureInPictureEnabled;
        this.isZoomCenterMode = false;
        this.isChatOpen = false;
        this.isChatEmojiOpen = false;
        this.isSpeechSynthesisSupported = isSpeechSynthesisSupported;
        this.speechInMessages = false;
        this.showChatOnMessage = true;
        this.isChatBgTransparent = false;
        this.isVideoPinned = false;
        this.isChatPinned = false;
        this.isChatMaximized = false;
        this.isToggleUnreadMsg = false;
        this.isToggleRaiseHand = false;
        this.pinnedVideoPlayerId = null;
        this.camVideo = false;
        this.camera = 'user';
        this.videoQualitySelectedIndex = 0;

        this.chatGPTContext = [];
        this.chatMessages = [];
        this.leftMsgAvatar = null;
        this.rightMsgAvatar = null;

        this.localVideoStream = null;
        this.localAudioStream = null;
        this.localScreenStream = null;

        this.RoomPassword = false;

        this.transcription = transcription;

        // File transfer settings
        this.fileToSend = null;
        this.fileReader = null;
        this.receiveBuffer = [];
        this.receivedSize = 0;
        this.incomingFileInfo = null;
        this.incomingFileData = null;
        this.sendInProgress = false;
        this.receiveInProgress = false;
        this.fileSharingInput = '*';
        this.chunkSize = 1024 * 16; // 16kb/s

        // Recording
        this._isRecording = false;
        this.mediaRecorder = null;
        this.audioRecorder = null;
        this.recScreenStream = null;
        this.recSyncServerRecording = false;
        this.recSyncTime = 4000; // 4 sec
        this.recSyncChunkSize = 1000000; // 1MB

        // Encodings
        this.forceVP8 = false; // Force VP8 codec for webcam and screen sharing
        this.forceVP9 = false; // Force VP9 codec for webcam and screen sharing
        this.forceH264 = false; // Force H264 codec for webcam and screen sharing
        this.enableWebcamLayers = true; // Enable simulcast or SVC for webcam
        this.enableSharingLayers = true; // Enable simulcast or SVC for screen sharing
        this.numSimulcastStreamsWebcam = 3; // Number of streams for simulcast in webcam
        this.numSimulcastStreamsSharing = 1; // Number of streams for simulcast in screen sharing
        this.webcamScalabilityMode = 'L3T3'; // Scalability Mode for webcam | 'L1T3' for VP8/H264 (in each simulcast encoding), 'L3T3_KEY' for VP9
        this.sharingScalabilityMode = 'L1T3'; // Scalability Mode for screen sharing | 'L1T3' for VP8/H264 (in each simulcast encoding), 'L3T3' for VP9

        this.myVideoEl = null;
        this.myAudioEl = null;
        this.showPeerInfo = false; // on peerName mouse hover

        this.videoProducerId = null;
        this.screenProducerId = null;
        this.audioProducerId = null;
        this.audioConsumers = new Map();

        this.consumers = new Map();
        this.producers = new Map();
        this.producerLabel = new Map();
        this.eventListeners = new Map();

        this.debug = false;
        this.debug ? window.localStorage.setItem('debug', 'mediasoup*') : window.localStorage.removeItem('debug');

        console.log('06 ----> Load MediaSoup Client v', mediasoupClient.version);
        console.log('06.1 ----> PEER_ID', this.peer_id);

        Object.keys(this._EVENTS).forEach((evt) => {
            this.eventListeners.set(evt, []);
        });

        this.socket.request = function request(type: any, data = {}) {
            return new Promise((resolve, reject) => {
                socket.emit(type, data, (data: unknown) => {
                    if (data.error) {
                        reject(data.error);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        // ####################################################
        // CREATE ROOM AND JOIN
        // ####################################################

        this.createRoom(this.room_id).then(async () => {
            const data = {
                room_id: this.room_id,
                peer_info: this.peer_info,
            };
            await this.join(data);
            this.initSockets();
            this._isConnected = true;
            successCallback();
        });
    }
    isFullScreenSupported(): any {
        throw new Error('Method not implemented.');
    }
    createRoom(room_id: any) {
        throw new Error('Method not implemented.');
    }
    join(data: { room_id: any; peer_info: null; }) {
        throw new Error('Method not implemented.');
    }
    initSockets() {
        throw new Error('Method not implemented.');
    }

 


// ####################################################
// INIT ROOM
// ####################################################

document: any.addEventListener('DOMContentLoaded', function () {
    initClient();
});

function initClient() {
    setTheme();

    // Transcription
    transcription = new transcription();
   transcription.init();

    if (!DetectRTC.isMobileDevice) {
        refreshMainButtonsToolTipPlacement();
        setTippy('closeEmojiPickerContainer', 'Close', 'bottom');
    setTippy('mySettingsCloseBtn', 'Close', 'bottom');
        setTippy(
            'switchPushToTalk',
            'If Active, When SpaceBar keydown the microphone will be resumed, on keyup will be paused, like a walkie-talkie.',
            'right',
        );
        setTippy('lobbyAcceptAllBtn', 'Accept', 'top');
        setTippy('lobbyRejectAllBtn', 'Reject', 'top');
        setTippy(
            'switchBroadcasting',
            'Broadcasting is the dissemination of audio or video content to a large audience (one to many)',
            'right',
        );
        setTippy(
            'switchLobby',
            'Lobby mode lets you protect your meeting by only allowing people to enter after a formal approval by a moderator',
            'right',
        );
        setTippy('initVideoAudioRefreshButton', 'Refresh audio/video devices', 'top');
        setTippy('switchPitchBar', 'Toggle audio pitch bar', 'right');
        setTippy('switchSounds', 'Toggle the sounds notifications', 'right');
        setTippy('switchShare', "Show 'Share Room' popup on join", 'right');
        setTippy('roomId', 'Room name (click to copy)', 'right');
        setTippy('sessionTime', 'Session time', 'right');
        setTippy('recordingImage', 'Toggle recording', 'right');
        setTippy(
            'switchHostOnlyRecording',
            'Only the host (presenter) has the capability to record the meeting',
        'right',
        );
        setTippy(
            'switchH264Recording',
            'Prioritize h.264 with AAC or h.264 with Opus codecs over VP8 with Opus or VP9 with Opus codecs',
            'right',
        );
        setTippy('switchServerRecording', 'The recording will be stored on the server rather than locally', 'right');
        setTippy('whiteboardGhostButton', 'Toggle transparent background', 'bottom');
        setTippy('wbBackgroundColorEl', 'Background color', 'bottom');
        setTippy('wbDrawingColorEl', 'Drawing color', 'bottom');
        setTippy('whiteboardPencilBtn', 'Drawing mode', 'bottom');
        setTippy('whiteboardObjectBtn', 'Object mode', 'bottom');
        setTippy('whiteboardUndoBtn', 'Undo', 'bottom');
        setTippy('whiteboardRedoBtn', 'Redo', 'bottom');
        setTippy('whiteboardImgFileBtn', 'Add image file', 'bottom');
    setTippy('whiteboardPdfFileBtn', 'Add pdf file', 'bottom');
setTippy('whiteboardImgUrlBtn', 'Add image url', 'bottom');
setTippy('whiteboardTextBtn', 'Add text', 'bottom');
setTippy('whiteboardLineBtn', 'Add line', 'bottom');
setTippy('whiteboardRectBtn', 'Add rectangle', 'bottom');
setTippy('whiteboardTriangleBtn', 'Add triangle', 'bottom');
setTippy('whiteboardCircleBtn', 'Add circle', 'bottom');
setTippy('whiteboardSaveBtn', 'Save', 'bottom');
setTippy('whiteboardEraserBtn', 'Eraser', 'bottom');
    setTippy('whiteboardCleanBtn', 'Clean', 'bottom');
    setTippy('whiteboardLockButton', 'If enabled, participants cannot interact', 'right');
    setTippy('whiteboardCloseBtn', 'Close', 'right');
    setTippy('chatCleanTextButton', 'Clean', 'top');
    setTippy('chatPasteButton', 'Paste', 'top');
    setTippy('chatSendButton', 'Send', 'top');
    setTippy('showChatOnMsg', 'Show chat on new message comes', 'bottom');
    setTippy('speechIncomingMsg', 'Speech the incoming messages', 'bottom');
    setTippy('chatSpeechStartButton', 'Start speech recognition', 'top');
    setTippy('chatSpeechStopButton', 'Stop speech recognition', 'top');
    setTippy('chatEmojiButton', 'Emoji', 'top');
    setTippy('chatMarkdownButton', 'Markdown', 'top');
    setTippy('chatCloseButton', 'Close', 'bottom');
    setTippy('chatTogglePin', 'Toggle pin', 'bottom');
    setTippy('chatHideParticipantsList', 'Hide', 'bottom');
    setTippy('chatShowParticipantsList', 'Toggle participants list', 'bottom');
    setTippy('chatMaxButton', 'Maximize', 'bottom');
    setTippy('chatMinButton', 'Minimize', 'bottom');
    setTippy('participantsSaveBtn', 'Save participants info', 'bottom');
    setTippy('participantsRaiseHandBtn', 'Toggle raise hands', 'bottom');
    setTippy('participantsUnreadMessagesBtn', 'Toggle unread messages', 'bottom');
    setTippy('transcriptionCloseBtn', 'Close', 'bottom');
        setTippy('transcriptionTogglePinBtn', 'Toggle pin', 'bottom');
        setTippy('transcriptionMaxBtn', 'Maximize', 'bottom');
    setTippy('transcriptionMinBtn', 'Minimize', 'bottom');
    setTippy('transcriptionSpeechStatus', 'Status', 'bottom');
    setTippy('transcriptShowOnMsg', 'Show transcript on new message comes', 'bottom');
    setTippy('transcriptPersistentMode', 'Prevent stopping in the absence of speech', 'bottom');
    setTippy('transcriptionSpeechStart', 'Start transcription', 'top');
    setTippy('transcriptionSpeechStop', 'Stop transcription', 'top');
    }
    setupWhiteboard();
    initEnumerateDevices();
    setupInitButtons();
}

// ####################################################
// HANDLE MAIN BUTTONS TOOLTIP
// ####################################################

function refreshMainButtonsToolTipPlacement() {
    if (!DetectRTC.isMobileDevice) {
        const placement = BtnsBarPosition.options[BtnsBarPosition.selectedIndex].value == 'vertical' ? 'right' : 'top';
    setTippy('shareButton', 'Share room', placement);
setTippy('hideMeButton', 'Toggle hide self view', placement);
setTippy('startAudioButton', 'Start the audio', placement);
setTippy('stopAudioButton', 'Stop the audio', placement);
setTippy('startVideoButton', 'Start the video', placement);
setTippy('stopVideoButton', 'Stop the video', placement);
setTippy('startScreenButton', 'Start screen share', placement);
setTippy('stopScreenButton', 'Stop screen share', placement);
setTippy('startRecButton', 'Start recording', placement);
setTippy('stopRecButton', 'Stop recording', placement);
setTippy('raiseHandButton', 'Raise your hand', placement);
setTippy('lowerHandButton', 'Lower your hand', placement);
setTippy('emojiRoomButton', 'Toggle emoji reaction', placement);
setTippy('swapCameraButton', 'Swap the camera', placement);
setTippy('chatButton', 'Toggle the chat', placement);
setTippy('transcriptionButton', 'Toggle transcription', placement);
setTippy('whiteboardButton', 'Toggle the whiteboard', placement);
setTippy('settingsButton', 'Toggle the settings', placement);
setTippy('aboutButton', 'About this project', placement);
setTippy('exitButton', 'Leave room', placement);
}
}

// ####################################################
// HANDLE TOOLTIP
// ####################################################

function setTippy(elem: string, content: string, placement: string, allowHTML = false) {
    const element = document.getElementById(elem);
if (element) {
    if (element._tippy) {
        element._tippy.destroy();
    }
try {
            tippy(element, {
                content: content,
                placement: placement,
                allowHTML: allowHTML,
            });
        } catch (err) {
            console.error('setTippy error', err.message);
        }
    } else {
        console.warn('setTippy element not found with content', content);
    }
}

// ####################################################
// GET ROOM ID
// ####################################################

function getRoomId() {
    const qs = new URLSearchParams(window.location.search);
const queryRoomId = qs.get('room');
let roomId = queryRoomId ? queryRoomId : location.pathname.substring(6);
if (roomId == '') {
    roomId = makeId(12);
}
console.log('Direct join', { room: roomId });
window.localStorage['lastRoom'] = roomId;
return roomId;
}

function makeId(length: number) {
    let result = '';
let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
return result;
}

// ####################################################
// INIT ROOM
// ####################################################

async function initRoom() {
    if (!isAudioAllowed && !isVideoAllowed && !joinRoomWithoutAudioVideo) {
        openURL(`/permission?room_id=${room_id}&message=Not allowed both Audio and Video`);
    } else {
        setButtonsInit();
    handleSelectsInit();
await whoAreYou();
await setSelectsInit();
}
}

// ####################################################
// ENUMERATE DEVICES
// ####################################################

async function initEnumerateDevices() {
    console.log('01 ----> init Enumerate Devices');
await initEnumerateVideoDevices();
await initEnumerateAudioDevices();
    await initRoom();
}

async function refreshMyAudioVideoDevices() {
    await refreshMyVideoDevices();
    await refreshMyAudioDevices();
}

async function refreshMyVideoDevices(this: any) {
    if (!isVideoAllowed) return;
const initVideoSelectIndex = initVideoSelect ? initVideoSelect.selectedIndex : 0;
    const videoSelectIndex = videoSelect ? this.videoSelect.selectedIndex : 0;
await initEnumerateVideoDevices();
    if (initVideoSelect) initVideoSelect.selectedIndex = initVideoSelectIndex;
if (videoSelect) videoSelect.selectedIndex = videoSelectIndex;
}

async function refreshMyAudioDevices() {
    if (!isAudioAllowed) return;
const initMicrophoneSelectIndex = initMicrophoneSelect ? initMicrophoneSelect.selectedIndex : 0;
    const initSpeakerSelectIndex = initSpeakerSelect ? initSpeakerSelect.selectedIndex : 0;
    const microphoneSelectIndex = microphoneSelect ? microphoneSelect.selectedIndex : 0;
const speakerSelectIndex = speakerSelect ? speakerSelect.selectedIndex : 0;
await initEnumerateAudioDevices();
if (initMicrophoneSelect) initMicrophoneSelect.selectedIndex = initMicrophoneSelectIndex;
if (initSpeakerSelect) initSpeakerSelect.selectedIndex = initSpeakerSelectIndex;
if (microphoneSelect) microphoneSelect.selectedIndex = microphoneSelectIndex;
if (speakerSelect) speakerSelect.selectedIndex = speakerSelectIndex;
}

async function initEnumerateVideoDevices() {
    // allow the video
await navigator.mediaDevices
.getUserMedia({ video: true })
.then(async (stream) => {
            await enumerateVideoDevices(stream);
        isVideoAllowed = true;
        })
        .catch(() => {
            isVideoAllowed = false;
        });
}

async function enumerateVideoDevices(stream: MediaStream) {
    console.log('02 ----> Get Video Devices');

if (videoSelect) videoSelect.innerHTML = '';
if (initVideoSelect) initVideoSelect.innerHTML = '';

await navigator.mediaDevices
.enumerateDevices()
.then((devices) =>
            devices.forEach(async (device) => {
                let el,
                    eli = null;
                if ('videoinput' === device.kind) {
                    if (videoSelect) el = videoSelect;
                    if (initVideoSelect) eli = initVideoSelect;
                    lS.DEVICES_COUNT.video++;
                }
            if (!el) return;
                await addChild(device, [el, eli]);
            }),
        )
        .then(async () => {
            await stopTracks(stream);
            isEnumerateVideoDevices = true;
        });
}

async function initEnumerateAudioDevices() {
    // allow the audio
    await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(async (stream) => {
            await enumerateAudioDevices(stream);
            await getMicrophoneVolumeIndicator(stream);
            isAudioAllowed = true;
        })
        .catch(() => {
            isAudioAllowed = false;
        });
}

async function enumerateAudioDevices(stream: MediaStream) {
    console.log('03 ----> Get Audio Devices');

    if (microphoneSelect) microphoneSelect.innerHTML = '';
    if (initMicrophoneSelect) initMicrophoneSelect.innerHTML = '';

    if (speakerSelect) speakerSelect.innerHTML = '';
    if (initSpeakerSelect) initSpeakerSelect.innerHTML = '';

    await navigator.mediaDevices
        .enumerateDevices()
        .then((devices) =>
            devices.forEach(async (device) => {
                let el,
                    eli = null;
                if ('audioinput' === device.kind) {
                    if (microphoneSelect) el = microphoneSelect;
                    if (initMicrophoneSelect) eli = initMicrophoneSelect;
                    lS.DEVICES_COUNT.audio++;
                } else if ('audiooutput' === device.kind) {
                    if (speakerSelect) el = speakerSelect;
                    if (initSpeakerSelect) eli = initSpeakerSelect;
                    lS.DEVICES_COUNT.speaker++;
                }
                if (!el) return;
                await addChild(device, [el, eli]);
            }),
        )
        .then(async () => {
            await stopTracks(stream);
            isEnumerateAudioDevices = true;
            speakerSelect.disabled = !sinkId;
            // Check if there is speakers
            if (!sinkId || initSpeakerSelect.options.length === 0) {
                hide(initSpeakerSelect);
                hide(speakerSelectDiv);
            }
        });
}

async function stopTracks(stream: { getTracks: () => any[]; }) {
    stream.getTracks().forEach((track: { stop: () => void; }) => {
        track.stop();
    });
}

async function addChild(device: MediaDeviceInfo, els: any[]) {
    let kind = device.kind;
    els.forEach((el: { length: number; appendChild: (arg0: HTMLOptionElement) => void; }) => {
        let option = document.createElement('option');
        option.value = device.deviceId;
        switch (kind) {
            case 'videoinput':
                option.innerText = `📹 ` + device.label || `📹 camera ${el.length + 1}`;
                break;
            case 'audioinput':
                option.innerText = `🎤 ` + device.label || `🎤 microphone ${el.length + 1}`;
                break;
            case 'audiooutput':
                option.innerText = `🔈 ` + device.label || `🔈 speaker ${el.length + 1}`;
                break;
            default:
                break;
        }
        el.appendChild(option);
    });
}

// ####################################################
// INIT AUDIO/VIDEO/SCREEN BUTTONS
// ####################################################

function setupInitButtons() {
    initVideoAudioRefreshButton.onclick = () => {
        refreshMyAudioVideoDevices();
    };
    initVideoButton.onclick = () => {
        handleVideo();
    };
    initAudioButton.onclick = () => {
        handleAudio();
    };
    initAudioVideoButton.onclick = async () => {
        await handleAudioVideo(e);
    };
    initStartScreenButton.onclick = async () => {
        await toggleScreenSharing();
    };
    initStopScreenButton.onclick = async () => {
        await toggleScreenSharing();
    };
}

// ####################################################
// MICROPHONE VOLUME INDICATOR
// ####################################################

async function getMicrophoneVolumeIndicator(stream: MediaStream) {
    if (isAudioContextSupported() && hasAudioTrack(stream)) {
        stopMicrophoneProcessing();
        const audioContext = new (window.AudioContext || window.AudioContext)();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(1024, 1, 1);
        scriptProcessor.onaudioprocess = function (event) {
            const inputBuffer = event.inputBuffer.getChannelData(0);
            let sum = 0;
        for (let i = 0; i < inputBuffer.length; i++) {
                sum += inputBuffer[i] * inputBuffer[i];
            }
            const rms = Math.sqrt(sum / inputBuffer.length);
        const volume = Math.max(0, Math.min(1, rms * 10));
    updateVolumeIndicator(volume);
};
        microphone.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);
    }
}

function stopMicrophoneProcessing() {
    if (scriptProcessor) {
        scriptProcessor.disconnect();
    const scriptProcessor = null;
}
bars.forEach((bar: { classList: { toggle: (arg0: string) => void; }; }) => {
        bar.classList.toggle('inactive');
    });
}

function updateVolumeIndicator(volume: number) {
    const activeBars = Math.ceil(volume * bars.length);
bars.forEach((bar: { classList: { toggle: (arg0: string, arg1: boolean) => void; }; }, index: number) => {
        bar.classList.toggle('active', index < activeBars);
    });
}

function isAudioContextSupported() {
    return !!(window.AudioContext || window.webkitAudioContext);
}

function hasAudioTrack(mediaStream: { getAudioTracks: () => any; }) {
    const audioTracks = mediaStream.getAudioTracks();
return audioTracks.length > 0;
}

function hasVideoTrack(mediaStream: { getVideoTracks: () => any; }) {
    const videoTracks = mediaStream.getVideoTracks();
return videoTracks.length > 0;
}

// ####################################################
// API CHECK
// ####################################################

function getScreen() {
    let qs = new URLSearchParams(window.location.search);
let screen = qs.get('screen');
if (screen) {
    screen = screen.toLowerCase();
let queryScreen = screen === '1' || screen === 'true';
if (queryScreen != null && (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia)) {
    console.log('Direct join', { screen: queryScreen });
return queryScreen;
}
}
console.log('Direct join', { screen: false });
return false;
}

function getNotify() {
    let qs = new URLSearchParams(window.location.search);
let notify = qs.get('notify');
    if (notify) {
        notify = notify.toLowerCase();
        let queryNotify = notify === '1' || notify === 'true';
        if (queryNotify != null) {
            console.log('Direct join', { notify: queryNotify });
        return queryNotify;
    }
}
notify = localStorageSettings.share_on_join;
console.log('Direct join', { notify: notify });
return notify;
}

function getHideMeActive() {
    let qs = new URLSearchParams(window.location.search);
let hide = qs.get('hide');
let queryHideMe = false;
if (hide) {
    hide = hide.toLowerCase();
queryHideMe = hide === '1' || hide === 'true';
}
    console.log('Direct join', { hide: queryHideMe });
return queryHideMe;
}

function isPeerPresenter() {
    let qs = new URLSearchParams(window.location.search);
let presenter = qs.get('isPresenter');
if (presenter) {
    presenter = presenter.toLowerCase();
let queryPresenter = presenter === '1' || presenter === 'true';
if (queryPresenter != null) {
    console.log('Direct join Reconnect', { isPresenter: queryPresenter });
return queryPresenter;
}
}
console.log('Direct join Reconnect', { presenter: false });
return false;
}

function getPeerName() {
    qs = new URLSearchParams(window.location.search);
const name = qs.get('name');
if (isHtml(name!)) {
    console.log('Direct join', { name: 'Invalid name' });
return 'Invalid name';
    }
    console.log('Direct join', { name: name });
    return name;
}

function getPeerUUID() {
    if (lS.getItemLocalStorage('peer_uuid')) {
        return lS.getItemLocalStorage('peer_uuid');
    }
const peer_uuid = getUUID();
lS.setItemLocalStorage('peer_uuid', peer_uuid);
return peer_uuid;
}

function getPeerToken() {
    if (window.sessionStorage.peer_token) return window.sessionStorage.peer_token;
let qs = new URLSearchParams(window.location.search);
let token = qs.get('token');
let queryToken = false;
if (token) {
    queryToken = token;
    }
console.log('Direct join', { token: queryToken });
return queryToken;
}

function getRoomPassword() {
    let qs = new URLSearchParams(window.location.search);
let roomPassword = qs.get('roomPassword');
if (roomPassword) {
    let queryNoRoomPassword = roomPassword === '0' || roomPassword === 'false';
if (queryNoRoomPassword) {
    roomPassword = false;
}
console.log('Direct join', { password: roomPassword });
return roomPassword;
}
return false;
}

// ####################################################
// INIT CONFIG
// ####################################################

async function checkInitConfig() {
    const localStorageInitConfig = lS.getLocalStorageInitConfig();
console.log('04.5 ----> Get init config', localStorageInitConfig);
if (localStorageInitConfig) {
    if (isAudioVideoAllowed && !localStorageInitConfig.audioVideo) {
        await handleAudioVideo();
    } else {
        if (isAudioAllowed && !localStorageInitConfig.audio) handleAudio();
            if (isVideoAllowed && !localStorageInitConfig.video) handleVideo();
        }
    }
}


// ####################################################
// SOME PEER INFO
// ####################################################

function getPeerInfo() {
    const peer_info = {
        join_data_time: getDataTimeString(),
        peer_uuid: peer_uuid,
        peer_id: socket.id,
        peer_name: peer_name,
        peer_token: peer_token,
        peer_presenter: isPresenter,
        peer_audio: isAudioAllowed,
        peer_video: isVideoAllowed,
        peer_screen: isScreenAllowed,
        peer_recording: isRecording,
        peer_video_privacy: isVideoPrivacyActive,
        peer_hand: false,
        is_desktop_device: !DetectRTC.isMobileDevice && !isTabletDevice && !isIPadDevice,
        is_mobile_device: DetectRTC.isMobileDevice,
        is_tablet_device: isTabletDevice,
        is_ipad_pro_device: isIPadDevice,
        os_name: DetectRTC.osName,
        os_version: DetectRTC.osVersion,
        browser_name: DetectRTC.browser.name,
        browser_version: DetectRTC.browser.version,
        user_agent: userAgent,
    };
}

// ####################################################
// ENTER YOUR NAME | Enable/Disable AUDIO/VIDEO
// ####################################################

async function whoAreYou() {
    console.log('04 ----> Who are you?');

    hide(loadingDiv);
    document.body.style.background = 'var(--body-bg)';

    try {
        const response = await axios.get('/config', {
            timeout: 5000,
        });
        const serverButtons = response.data.message;
        if (serverButtons) {
            const BUTTONS = serverButtons;
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

    initUser.classList.toggle('hidden');

    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: swalBackground,
        title: 'tdc',
        input: 'text',
        inputPlaceholder: 'Enter your name',
        inputAttributes: { maxlength: 32 },
        inputValue: default_name,
        html: initUser, // Inject HTML
        confirmButtonText: `Join meeting`,
        customClass: { popup: 'init-modal-size' },
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        inputValidator: (name: string | any[]) => {
            if (!name) return 'Please enter your name';
            if (name.length > 30) return 'Name must be max 30 char';
       
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

    if (!isVideoAllowed) {
        elemDisplay('initVideo', false);
        initVideoContainerShow(false);
        hide(initVideoSelect);
    }
    if (!isAudioAllowed) {
        hide(initMicrophoneSelect);
        hide(initSpeakerSelect);
    }
}

function handleAudio() {
      isAudioAllowed = isAudioAllowed ? false : true;
    initAudioButton.className = 'fas fa-microphone' + (isAudioAllowed ? '' : '-slash');
    setColor(initAudioButton, isAudioAllowed ? 'white' : 'red');
    setColor(startAudioButton, isAudioAllowed ? 'white' : 'red');
    checkInitAudio(isAudioAllowed);
    lS.setInitConfig(lS.MEDIA_TYPE.audio, isAudioAllowed);
}

function handleVideo() {
  const isVideoAllowed = isVideoAllowed ? false : true;
    initVideoButton.className = 'fas fa-video' + (isVideoAllowed ? '' : '-slash');
    setColor(initVideoButton, isVideoAllowed ? 'white' : 'red');
    setColor(startVideoButton, isVideoAllowed ? 'white' : 'red');
    checkInitVideo(isVideoAllowed);
    lS.setInitConfig(lS.MEDIA_TYPE.video, isVideoAllowed);
}

async function handleAudioVideo() {
   const isAudioVideoAllowed = isAudioVideoAllowed ? false : true;
    isAudioAllowed = isAudioVideoAllowed;
    isVideoAllowed = isAudioVideoAllowed;
    lS.setInitConfig(lS.MEDIA_TYPE.audio, isAudioVideoAllowed);
    lS.setInitConfig(lS.MEDIA_TYPE.video, isAudioVideoAllowed);
    lS.setInitConfig(lS.MEDIA_TYPE.audioVideo, isAudioVideoAllowed);
    initAudioButton.className = 'fas fa-microphone' + (isAudioVideoAllowed ? '' : '-slash');
    initVideoButton.className = 'fas fa-video' + (isAudioVideoAllowed ? '' : '-slash');
    initAudioVideoButton.className = 'fas fa-eye' + (isAudioVideoAllowed ? '' : '-slash');
    if (!isAudioVideoAllowed) {
        hide(initAudioButton);
        hide(initVideoButton);
        hide(initVideoAudioRefreshButton);
    }
    if (isAudioAllowed && isVideoAllowed && !DetectRTC.isMobileDevice) show(initVideoAudioRefreshButton);
    setColor(initAudioVideoButton, isAudioVideoAllowed ? 'white' : 'red');
    setColor(initAudioButton, isAudioAllowed ? 'white' : 'red');
    setColor(initVideoButton, isVideoAllowed ? 'white' : 'red');
    setColor(startAudioButton, isAudioAllowed ? 'white' : 'red');
    setColor(startVideoButton, isVideoAllowed ? 'white' : 'red');
    await checkInitVideo(isVideoAllowed);
    checkInitAudio(isAudioAllowed);
}

async function checkInitVideo(isVideoAllowed: boolean) {
    if (isVideoAllowed && BUTTONS.main.startVideoButton) {
        if (initVideoSelect.value) {
            initVideoContainerShow();
            await changeCamera(initVideoSelect.value);
        }
        sound('joined');
    } else {
        if (initStream) {
            stopTracks(initStream);
            elemDisplay('initVideo', false);
            initVideoContainerShow(false);
            sound('left');
        }
    }
    initVideoSelect.disabled = !isVideoAllowed;
}

function checkInitAudio(isAudioAllowed: any) {
    initMicrophoneSelect.disabled = !isAudioAllowed;
    initSpeakerSelect.disabled = !isAudioAllowed;
    isAudioAllowed ? sound('joined') : sound('left');
}

function initVideoContainerShow(show = true) {
    initVideoContainerClass.style.width = show ? '100%' : 'auto';
}

function checkMedia() {
    let qs = new URLSearchParams(window.location.search);
    let audio = qs.get('audio');
    let video = qs.get('video');
    if (audio) {
        audio = audio.toLowerCase();
        let queryPeerAudio = audio === '1' || audio === 'true';
        if (queryPeerAudio != null) isAudioAllowed = queryPeerAudio;
    }
    if (video) {
        video = video.toLowerCase();
        let queryPeerVideo = video === '1' || video === 'true';
        if (queryPeerVideo != null) isVideoAllowed = queryPeerVideo;
    }
    // elemDisplay('tabVideoDevicesBtn', isVideoAllowed);
    // elemDisplay('tabAudioDevicesBtn', isAudioAllowed);

    console.log('Direct join', {
        audio: isAudioAllowed,
        video: isVideoAllowed,
    });
}

// ####################################################
// SHARE ROOM
// ####################################################

async function shareRoom(useNavigator = false) {
    if (navigator.share && useNavigator) {
        try {
            await navigator.share({ url: RoomURL });
            userLog('info', 'Room Shared successfully', 'top-end');
        } catch (err) {
            share();
        }
    } else {
        share();
    }
    function share() {
        sound('open');

        Swal.fire({
            background: swalBackground,
            position: 'center',
            title: 'Share the room',
            html: `
            <div id="qrRoomContainer">
                <canvas id="qrRoom"></canvas>
            </div>
            <br/>
            <p style="background:transparent; color:rgb(8, 189, 89);">Join from your mobile device</p>
            <p style="background:transparent; color:white; font-family: Arial, Helvetica, sans-serif;">No need for apps, simply capture the QR code with your mobile camera Or Invite someone else to join by sending them the following URL</p>
            <p style="background:transparent; color:rgb(8, 189, 89);">${RoomURL}</p>`,
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonColor: 'red',
            denyButtonColor: 'green',
            confirmButtonText: `Copy URL`,
            denyButtonText: `Email invite`,
            cancelButtonText: `Close`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; isDenied: any; }) => {
            if (result.isConfirmed) {
                copyRoomURL();
            } else if (result.isDenied) {
                shareRoomByEmail();
            }
            // share screen on join
            if (isScreenAllowed) {
                rc.shareScreen();
            }
        });
        makeRoomQR();
    }
}

// ####################################################
// ROOM UTILITY
// ####################################################

 makeRoomQR() : {
     qr = new QRious({
        element: document.getElementById('qrRoom'),
        value: RoomURL,
    });
    qr.set({
        size: 256,
    });
}

function copyRoomURL() {
    let tmpInput = document.createElement('input');
    document.body.appendChild(tmpInput);
    tmpInput.value = RoomURL;
    tmpInput.select();
    tmpInput.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(tmpInput.value);
    document.body.removeChild(tmpInput);
    userLog('info', 'Meeting URL copied to clipboard 👍', 'top-end');
}

function shareRoomByEmail() {
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: swalBackground,
        imageUrl: image.email,
        position: 'center',
        title: 'Select a Date and Time',
        html: '<input type="text" id="datetimePicker" class="flatpickr" />',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonColor: 'red',
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        preConfirm: () => {
            const newLine = '%0D%0A%0D%0A';
            const selectedDateTime = document.getElementById('datetimePicker').value;
            const roomPassword =
                isRoomLocked && (room_password || rc.RoomPassword)
                    ? 'Password: ' + (room_password || rc.RoomPassword) + newLine
                    : '';
            const email = '';
            const emailSubject = `Please join our ${Title} Video Chat Meeting`;
            const emailBody = `The meeting is scheduled at: ${newLine} DateTime: ${selectedDateTime} ${newLine}${roomPassword}Click to join: ${RoomURL} ${newLine}`;
            document.location = 'mailto:' + email + '?subject=' + emailSubject + '&body=' + emailBody;
        },
    });
    flatpickr('#datetimePicker', {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true,
    });
}

// ####################################################
// JOIN ROOM
// ####################################################

function joinRoom(peer_name: any, room_id: string) {
    if (rc && rc.isConnected()) {
        console.log('Already connected to a room');
    } else {
        console.log('05 ----> join Room ' + room_id);
        room_Id.innerText = room_id;
        userName.innerText = peer_name;
        isUserPresenter.innerText =         rc = new RoomClient(
            localAudio,
            remoteAudios,
            videoMediaContainer,
            videoPinMediaContainer,
            window.mediasoupClient,
            socket,
            room_id,
            peer_name,
            peer_uuid,
            peer_info,
            isAudioAllowed,
            isVideoAllowed,
            isScreenAllowed,
            joinRoomWithScreen,
            isSpeechSynthesisSupported,
            transcription,
            roomIsReady,
        );
        handleRoomClientEvents();
        //notify ? shareRoom() : sound('joined');
    }
}

function  roomIsReady() {
    if (rc.isValidEmail(peer_name)) {
        myProfileAvatar.style.borderRadius = `50px`;
        myProfileAvatar.setAttribute('src', rc.genGravatar(peer_name));
    } else {
        myProfileAvatar.setAttribute('src', rc.genAvatarSvg(peer_name, 64));
    }
    BUTTONS.main.exitButton && show(exitButton);
    BUTTONS.main.shareButton && show(shareButton);
    BUTTONS.main.hideMeButton && show(hideMeButton);
    if (BUTTONS.settings.tabRecording) {
        show(startRecButton);
    } else {
        hide(startRecButton);
        hide(tabRecordingBtn);
    }
    BUTTONS.main.chatButton && show(chatButton);
    BUTTONS.main.raiseHandButton && show(raiseHandButton);
    BUTTONS.main.emojiRoomButton && show(emojiRoomButton);
    !BUTTONS.chat.chatSaveButton && hide(chatSaveButton);
    BUTTONS.chat.chatEmojiButton && show(chatEmojiButton);
    BUTTONS.chat.chatMarkdownButton && show(chatMarkdownButton);

    isWebkitSpeechRecognitionSupported && BUTTONS.chat.chatSpeechStartButton
        ? show(chatSpeechStartButton)
        : (BUTTONS.chat.chatSpeechStartButton = false);

    transcription.isSupported() && BUTTONS.main.transcriptionButton
        ? show(transcriptionButton)
        : (BUTTONS.main.transcriptionButton = false);

    show(chatCleanTextButton);
    show(chatPasteButton);
    show(chatSendButton);
    if (DetectRTC.isMobileDevice) {
        hide(initVideoAudioRefreshButton);
        hide(refreshVideoDevices);
        hide(refreshAudioDevices);
        BUTTONS.main.swapCameraButton && show(swapCameraButton);
        rc.chatMaximize();
        hide(chatTogglePin);
        hide(chatMaxButton);
        hide(chatMinButton);
        transcription.maximize();
        hide(transcriptionTogglePinBtn);
        hide(transcriptionMaxBtn);
        hide(transcriptionMinBtn);
    } else {
        rc.makeDraggable(emojiPickerContainer, emojiPickerHeader);
        rc.makeDraggable(chatRoom, chatHeader);
        rc.makeDraggable(mySettings, mySettingsHeader);
        rc.makeDraggable(whiteboard, whiteboardHeader);
        rc.makeDraggable(sendFileDiv, imgShareSend);
        rc.makeDraggable(receiveFileDiv, imgShareReceive);
        rc.makeDraggable(lobby, lobbyHeader);
        rc.makeDraggable(transcriptionRoom, transcriptionHeader);
        if (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
            if (BUTTONS.main.startScreenButton) {
                show(startScreenButton);
                show(ScreenFpsDiv);
            }
        }
        BUTTONS.chat.chatPinButton && show(chatTogglePin);
        BUTTONS.chat.chatMaxButton && show(chatMaxButton);
        BUTTONS.settings.pushToTalk && show(pushToTalkDiv);
    }
    if (DetectRTC.browser.name != 'Safari') {
        document.onfullscreenchange = () => {
            if (!document.fullscreenElement) rc.isDocumentOnFullScreen = false;
        };
        show(fullScreenButton);
    }
    BUTTONS.main.whiteboardButton && show(whiteboardButton);
    BUTTONS.main.settingsButton && show(settingsButton);
    isAudioAllowed ? show(stopAudioButton) : BUTTONS.main.startAudioButton && show(startAudioButton);
    isVideoAllowed ? show(stopVideoButton) : BUTTONS.main.startVideoButton && show(startVideoButton);
    BUTTONS.settings.fileSharing && show(fileShareButton);
    BUTTONS.settings.lockRoomButton && show(lockRoomButton);
    BUTTONS.settings.broadcastingButton && show(broadcastingButton);
    BUTTONS.settings.lobbyButton && show(lobbyButton);
    BUTTONS.settings.sendEmailInvitation && show(sendEmailInvitation);
    if (rc.recSyncServerRecording) show(roomRecordingServer);
    BUTTONS.main.aboutButton && show(aboutButton);
    if (!DetectRTC.isMobileDevice) show(pinUnpinGridDiv);
    if (!isSpeechSynthesisSupported) hide(speechMsgDiv);
    handleButtons();
    handleSelects();
    handleInputs();
    handleChatEmojiPicker();
    handleRoomEmojiPicker();
    loadSettingsFromLocalStorage();
    startSessionTimer();
    document.body.addEventListener('mousemove', () => {
        showButtons();
    });
    checkButtonsBar();
    if (room_password) {
        lockRoomButton.click();
    }
}

function elemDisplay(element: string, display: boolean, mode = 'block') {
    const elem = document.getElementById(element);
    elem ? (elem.style.display = display ? mode : 'none') : console.error('elemDisplay not found', element);
}

function hide(elem: HTMLElement | null) {
    if (!elem.classList.contains('hidden')) elem.classList.toggle('hidden');
}

function show(elem: HTMLElement | null) {
    if (elem.classList.contains('hidden')) elem.classList.toggle('hidden');
}

function disable(elem: { disabled: any; }, disabled: boolean) {
    elem.disabled = disabled;
}

function setColor(elem: { style: { color: any; }; }, color: string) {
    elem.style.color = color;
}

// ####################################################
// SESSION TIMER
// ####################################################

function startSessionTimer() {
    sessionTime.style.display = 'inline';
    let callStartTime = Date.now();
    setInterval(function printTime() {
        let callElapsedTime = Date.now() - callStartTime;
        sessionTime.innerText = getTimeToString(callElapsedTime);
    }, 1000);
}

function getTimeToString(time: number) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    let formattedHH = hh.toString().padStart(2, '0');
    let formattedMM = mm.toString().padStart(2, '0');
    let formattedSS = ss.toString().padStart(2, '0');
    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

// ####################################################
// RECORDING TIMER
// ####################################################

function secondsToHms(d: number) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);
    let hDisplay = h > 0 ? h + 'h' : '';
    let mDisplay = m > 0 ? m + 'm' : '';
    let sDisplay = s > 0 ? s + 's' : '';
    return hDisplay + ' ' + mDisplay + ' ' + sDisplay;
}

function startRecordingTimer() {
    recElapsedTime = 0;
    recTimer = setInterval(function printTime() {
        if (rc.isRecording()) {
            recElapsedTime++;
            recordingStatus.innerText = secondsToHms(recElapsedTime);
        }
    }, 1000);
}
function stopRecordingTimer() {
    clearInterval(recTimer);
}

// ####################################################
// HTML BUTTONS
// ####################################################

function handleButtons() {
    // Lobby...
    document.getElementById('lobbyUsers').addEventListener('click', function (event) {
        switch (event.target.id) {
            case 'lobbyAcceptAllBtn':
                rc.lobbyAcceptAll();
                break;
            case 'lobbyRejectAllBtn':
                rc.lobbyRejectAll();
                break;
            default:
                break;
        }
    });
    control.onmouseover = () => {
        isButtonsBarOver = true;
    };
    control.onmouseout = () => {
        isButtonsBarOver = false;
    };
    exitButton.onclick = () => {
        rc.exitRoom();
    };
    shareButton.onclick = () => {
        shareRoom(true);
    };
    hideMeButton.onclick = () => {
        isHideMeActive = !isHideMeActive;
        rc.handleHideMe();
    };
    settingsButton.onclick = () => {
        rc.toggleMySettings();
    };
    mySettingsCloseBtn.onclick = () => {
        rc.toggleMySettings();
    };
    tabVideoDevicesBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabVideoDevices');
    };
    tabAudioDevicesBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabAudioDevices');
    };
    tabRecordingBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabRecording');
    };
    tabRoomBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabRoom');
    };
    tabVideoShareBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabVideoShare');
    };
    tabAspectBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabAspect');
    };
    tabModeratorBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabModerator');
    };
    tabProfileBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabProfile');
    };
    tabStylingBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabStyling');
    };
    tabLanguagesBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabLanguages');
    };
    tabVideoAIBtn.onclick = (e: any) => {
        rc.openTab(e, 'tabVideoAI');
        rc.getAvatarList();
        rc.getVoiceList();
    };
    avatarVideoAIStart.onclick = () => {
        rc.stopSession();
        rc.handleVideoAI();
        rc.toggleMySettings();
    };
    switchAvatars.onchange = (e: { currentTarget: { checked: any; }; }) => {
        showFreeAvatars = e.currentTarget.checked;
        rc.getAvatarList();
    };
    refreshVideoDevices.onclick = async () => {
        await refreshMyVideoDevices();
        userLog('info', 'Refreshed video devices', 'top-end');
    };
    refreshAudioDevices.onclick = async () => {
        await refreshMyAudioDevices();
        userLog('info', 'Refreshed audio devices', 'top-end');
    };
    applyAudioOptionsButton.onclick = () => {
        rc.closeThenProduce(RoomClient.mediaType.audio, microphoneSelect.value);
    };
    speakerTestBtn.onclick = () => {
        sound('ring', true);
    };
    roomId.onclick = () => {
        DetectRTC.isMobileDevice ? shareRoom(true) : copyRoomURL();
    };
    roomSendEmail.onclick = () => {
        shareRoomByEmail();
    };
    chatButton.onclick = () => {
        rc.toggleChat();
        if (DetectRTC.isMobileDevice) {
            rc.toggleShowParticipants();
        }
    };
    transcriptionButton.onclick = () => {
        transcription.toggle();
    };
    transcriptionCloseBtn.onclick = () => {
        transcription.toggle();
    };
    transcriptionTogglePinBtn.onclick = () => {
        transcription.togglePinUnpin();
    };
    transcriptionMaxBtn.onclick = () => {
        transcription.maximize();
    };
    transcriptionMinBtn.onclick = () => {
        transcription.minimize();
    };
    transcriptionGhostBtn.onclick = () => {
        transcription.toggleBg();
    };
    transcriptionSaveBtn.onclick = () => {
        transcription.save();
    };
    transcriptionCleanBtn.onclick = () => {
        transcription.delete();
    };
    chatHideParticipantsList.onclick = () => {
        rc.toggleShowParticipants();
    };
    chatShowParticipantsList.onclick = () => {
        rc.toggleShowParticipants();
    };
    chatShareRoomBtn.onclick = () => {
        shareRoom(true);
    };
    chatGhostButton.onclick = () => {
        rc.chatToggleBg();
    };
    chatCleanButton.onclick = () => {
        rc.chatClean();
    };
    chatSaveButton.onclick = () => {
        rc.chatSave();
    };
    chatCloseButton.onclick = () => {
        rc.toggleChat();
    };
    chatTogglePin.onclick = () => {
        rc.toggleChatPin();
    };
    chatMaxButton.onclick = () => {
        rc.chatMaximize();
    };
    chatMinButton.onclick = () => {
        rc.chatMinimize();
    };
    chatCleanTextButton.onclick = () => {
        rc.cleanMessage();
    };
    chatPasteButton.onclick = () => {
        rc.pasteMessage();
    };
    chatSendButton.onclick = () => {
        rc.sendMessage();
    };
    chatEmojiButton.onclick = () => {
        rc.toggleChatEmoji();
    };
    chatMarkdownButton.onclick = () => {
        isChatMarkdownOn = !isChatMarkdownOn;
        setColor(chatMarkdownButton, isChatMarkdownOn ? 'lime' : 'white');
    };
    chatSpeechStartButton.onclick = () => {
        startSpeech();
    };
    chatSpeechStopButton.onclick = () => {
        stopSpeech();
    };
    transcriptionSpeechStart.onclick = () => {
        transcription.start();
    };
    transcriptionSpeechStop.onclick = () => {
        transcription.stop();
    };
    fullScreenButton.onclick = () => {
        rc.toggleFullScreen();
    };
    recordingImage.onclick = () => {
        isRecording ? stopRecButton.click() : startRecButton.click();
    };
    startRecButton.onclick = () => {
        rc.startRecording();
    };
    stopRecButton.onclick = () => {
        rc.stopRecording();
    };
    pauseRecButton.onclick = () => {
        rc.pauseRecording();
    };
    resumeRecButton.onclick = () => {
        rc.resumeRecording();
    };
    swapCameraButton.onclick = () => {
        if (isHideMeActive) rc.handleHideMe();
        rc.closeThenProduce(RoomClient.mediaType.video, null, true);
    };
    raiseHandButton.onclick = () => {
        rc.updatePeerInfo(peer_name, socket.id, 'hand', true);
    };
    lowerHandButton.onclick = () => {
        rc.updatePeerInfo(peer_name, socket.id, 'hand', false);
    };
    startAudioButton.onclick = async () => {
        const moderator = rc.getModerator();
        if (moderator.audio_cant_unmute) {
            return userLog('warning', 'The moderator does not allow you to unmute', 'top-end', 6000);
        }
        if (isPushToTalkActive) return;
        setAudioButtonsDisabled(true);
        if (!isEnumerateAudioDevices) await initEnumerateAudioDevices();

        const producerExist = rc.producerExist(RoomClient.mediaType.audio);
        console.log('START AUDIO producerExist --->', producerExist);

        producerExist
            ? await rc.resumeProducer(RoomClient.mediaType.audio)
            : await rc.produce(RoomClient.mediaType.audio, microphoneSelect.value);

        rc.updatePeerInfo(peer_name, socket.id, 'audio', true);
    };
    stopAudioButton.onclick = async () => {
        if (isPushToTalkActive) return;
        setAudioButtonsDisabled(true);

        const producerExist = rc.producerExist(RoomClient.mediaType.audio);
        console.log('STOP AUDIO producerExist --->', producerExist);

        producerExist
            ? await rc.pauseProducer(RoomClient.mediaType.audio)
            : await rc.closeProducer(RoomClient.mediaType.audio);

        rc.updatePeerInfo(peer_name, socket.id, 'audio', false);
    };
    startVideoButton.onclick = async () => {
        const moderator = rc.getModerator();
        if (moderator.video_cant_unhide) {
            return userLog('warning', 'The moderator does not allow you to unhide', 'top-end', 6000);
        }
        setVideoButtonsDisabled(true);
        if (!isEnumerateVideoDevices) await initEnumerateVideoDevices();
        await rc.produce(RoomClient.mediaType.video, videoSelect.value);
        // await rc.resumeProducer(RoomClient.mediaType.video);
    };
    stopVideoButton.onclick = () => {
        setVideoButtonsDisabled(true);
        rc.closeProducer(RoomClient.mediaType.video);
        // await rc.pauseProducer(RoomClient.mediaType.video);
    };
    startScreenButton.onclick = async () => {
        const moderator = rc.getModerator();
        if (moderator.screen_cant_share) {
            return userLog('warning', 'The moderator does not allow you to share the screen', 'top-end', 6000);
        }
        await rc.produce(RoomClient.mediaType.screen);
    };
    stopScreenButton.onclick = () => {
        rc.closeProducer(RoomClient.mediaType.screen);
    };
    fileShareButton.onclick = () => {
        rc.selectFileToShare(socket.id, true);
    };
    videoShareButton.onclick = () => {
        rc.shareVideo('all');
    };
    videoCloseBtn.onclick = () => {
        rc.closeVideo(true);
    };
    sendAbortBtn.onclick = () => {
        rc.abortFileTransfer();
    };
    receiveHideBtn.onclick = () => {
        rc.hideFileTransfer();
    };
    whiteboardButton.onclick = () => {
        toggleWhiteboard();
    };
    whiteboardPencilBtn.onclick = () => {
        whiteboardIsDrawingMode(true);
    };
    whiteboardObjectBtn.onclick = () => {
        whiteboardIsDrawingMode(false);
    };
    whiteboardUndoBtn.onclick = () => {
        whiteboardAction(getWhiteboardAction('undo'));
    };
    whiteboardRedoBtn.onclick = () => {
        whiteboardAction(getWhiteboardAction('redo'));
    };
    whiteboardSaveBtn.onclick = () => {
        wbCanvasSaveImg();
    };
    whiteboardImgFileBtn.onclick = () => {
        whiteboardAddObj('imgFile');
    };
    whiteboardPdfFileBtn.onclick = () => {
        whiteboardAddObj('pdfFile');
    };
    whiteboardImgUrlBtn.onclick = () => {
        whiteboardAddObj('imgUrl');
    };
    whiteboardTextBtn.onclick = () => {
        whiteboardAddObj('text');
    };
    whiteboardLineBtn.onclick = () => {
        whiteboardAddObj('line');
    };
    whiteboardRectBtn.onclick = () => {
        whiteboardAddObj('rect');
    };
    whiteboardTriangleBtn.onclick = () => {
        whiteboardAddObj('triangle');
    };
    whiteboardCircleBtn.onclick = () => {
        whiteboardAddObj('circle');
    };
    whiteboardEraserBtn.onclick = () => {
        whiteboardIsEraser(true);
    };
    whiteboardCleanBtn.onclick = () => {
        confirmClearBoard();
    };
    whiteboardLockButton.onchange = () => {
        wbIsLock = !wbIsLock;
        whiteboardAction(getWhiteboardAction(wbIsLock ? 'lock' : 'unlock'));
    };
    whiteboardCloseBtn.onclick = () => {
        whiteboardAction(getWhiteboardAction('close'));
    };
    participantsSaveBtn.onclick = () => {
        saveRoomPeers();
    };
    participantsUnreadMessagesBtn.onclick = () => {
        rc.toggleUnreadMsg();
    };
    participantsRaiseHandBtn.onclick = () => {
        rc.toggleRaiseHands();
    };
    searchParticipantsFromList.onkeyup = () => {
        rc.searchPeer();
    };
    lockRoomButton.onclick = () => {
        rc.roomAction('lock');
    };
    unlockRoomButton.onclick = () => {
        rc.roomAction('unlock');
    };
    aboutButton.onclick = () => {
        showAbout();
    };
    // restartICE.onclick = async () => {
    //     await rc.restartIce();
    // };
}

// ####################################################
// HANDLE INIT USER
// ####################################################

function setButtonsInit() {
    if (!DetectRTC.isMobileDevice) {
        setTippy('initAudioButton', 'Toggle the audio', 'top');
        setTippy('initVideoButton', 'Toggle the video', 'top');
        setTippy('initAudioVideoButton', 'Toggle the audio & video', 'top');
        setTippy('initStartScreenButton', 'Toggle screen sharing', 'top');
        setTippy('initStopScreenButton', 'Toggle screen sharing', 'top');
    }
    if (!isAudioAllowed) hide(initAudioButton);
    if (!isVideoAllowed) hide(initVideoButton);
    if (!isAudioAllowed || !isVideoAllowed) hide(initAudioVideoButton);
    if ((!isAudioAllowed && !isVideoAllowed) || DetectRTC.isMobileDevice) hide(initVideoAudioRefreshButton);
    isAudioVideoAllowed = isAudioAllowed && isVideoAllowed;
}

function handleSelectsInit() {
    // devices init options
    initVideoSelect.onchange = async () => {
        await changeCamera(initVideoSelect.value);
        videoSelect.selectedIndex = initVideoSelect.selectedIndex;
        refreshLsDevices();
    };
    initMicrophoneSelect.onchange = () => {
        microphoneSelect.selectedIndex = initMicrophoneSelect.selectedIndex;
        refreshLsDevices();
    };
    initSpeakerSelect.onchange = () => {
        speakerSelect.selectedIndex = initSpeakerSelect.selectedIndex;
        refreshLsDevices();
    };
}

async function setSelectsInit() {
    if (localStorageDevices) {
        console.log('04.0 ----> Get Local Storage Devices before', localStorageDevices);
        //
        const initMicrophoneExist = selectOptionByValueExist(initMicrophoneSelect, localStorageDevices.audio.select);
        const initSpeakerExist = selectOptionByValueExist(initSpeakerSelect, localStorageDevices.speaker.select);
        const initVideoExist = selectOptionByValueExist(initVideoSelect, localStorageDevices.video.select);
        //
        const microphoneExist = selectOptionByValueExist(microphoneSelect, localStorageDevices.audio.select);
        const speakerExist = selectOptionByValueExist(speakerSelect, localStorageDevices.speaker.select);
        const videoExist = selectOptionByValueExist(videoSelect, localStorageDevices.video.select);

        console.log('Check for audio changes', {
            previous: localStorageDevices.audio.select,
            current: microphoneSelect.value,
        });

        if (!initMicrophoneExist || !microphoneExist) {
            console.log('04.1 ----> Audio devices seems changed, use default index 0');
            initMicrophoneSelect.selectedIndex = 0;
            microphoneSelect.selectedIndex = 0;
            refreshLsDevices();
        }

        console.log('Check for speaker changes', {
            previous: localStorageDevices.speaker.select,
            current: speakerSelect.value,
        });

        if (!initSpeakerExist || !speakerExist) {
            console.log('04.2 ----> Speaker devices seems changed, use default index 0');
            initSpeakerSelect.selectedIndex = 0;
            speakerSelect.selectedIndex = 0;
            refreshLsDevices();
        }

        console.log('Check for video changes', {
            previous: localStorageDevices.video.select,
            current: videoSelect.value,
        });

        if (!initVideoExist || !videoExist) {
            console.log('04.3 ----> Video devices seems changed, use default index 0');
            initVideoSelect.selectedIndex = 0;
            videoSelect.selectedIndex = 0;
            refreshLsDevices();
        }

        //
        console.log('04.4 ----> Get Local Storage Devices after', lS.getLocalStorageDevices());
    }
    if (initVideoSelect.value) await changeCamera(initVideoSelect.value);
}

function selectOptionByValueExist(selectElement: { options: string | any[]; selectedIndex: number; }, value: any) {
    let foundValue = false;
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === value) {
            selectElement.selectedIndex = i;
            foundValue = true;
            break;
        }
    }
    return foundValue;
}

function refreshLsDevices() {
    lS.setLocalStorageDevices(lS.MEDIA_TYPE.video, videoSelect.selectedIndex, videoSelect.value);
    lS.setLocalStorageDevices(lS.MEDIA_TYPE.audio, microphoneSelect.selectedIndex, microphoneSelect.value);
    lS.setLocalStorageDevices(lS.MEDIA_TYPE.speaker, speakerSelect.selectedIndex, speakerSelect.value);
}

async function changeCamera(deviceId: any) {
    if (initStream) {
        await stopTracks(initStream);
        elemDisplay('initVideo', true);
        initVideoContainerShow();
        if (!initVideo.classList.contains('mirror')) {
            initVideo.classList.toggle('mirror');
        }
    }
    const videoConstraints = {
        audio: false,
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            deviceId: deviceId,
            aspectRatio: 1.777,
        },
    };
    await navigator.mediaDevices
        .getUserMedia(videoConstraints)
        .then((camStream) => {
            initVideo.className = 'mirror';
            initVideo.srcObject = camStream;
            const initStream = camStream;
            console.log(
                '04.5 ----> Success attached init cam video stream',
                initStream.getVideoTracks()[0].getSettings(),
            );
            checkInitConfig();
            handleCameraMirror(initVideo);
        })
        .catch((error) => {
            console.error('[Error] changeCamera', error);
            handleMediaError('video/audio', error);
        });
}

// ####################################################
// HANDLE MEDIA ERROR
// ####################################################

function handleMediaError(mediaType: string, err: unknown) {
    sound('alert');

     errMessage = err;
     getUserMediaError = true;
    switch (err.name) {
        case 'NotFoundError':
        case 'DevicesNotFoundError':
            errMessage = 'Required track is missing';
            break;
        case 'NotReadableError':
        case 'TrackStartError':
            errMessage = 'Already in use';
            break;
        case 'OverconstrainedError':
        case 'ConstraintNotSatisfiedError':
            errMessage = 'Constraints cannot be satisfied by available devices';
            break;
        case 'NotAllowedError':
        case 'PermissionDeniedError':
            errMessage = 'Permission denied in browser';
            break;
        case 'TypeError':
            errMessage = 'Empty constraints object';
            break;
        default:
            getUserMediaError = false;
            break;
    }

     html = `
    <ul style="text-align: left">
        <li>Media type: ${mediaType}</li>
        <li>Error name: ${err.name}</li>
        <li>
            <p>Error message:</p>
            <p style="color: red">${errMessage}</p>
        </li>`;

    if (getUserMediaError) {
        html += `
        <li>Common: <a href="https://blog.addpipe.com/common-getusermedia-errors" target="_blank">getUserMedia errors</a></li>`;
    }
    html += `
        </ul>
    `;

    const redirectURL = ['screen', 'screenType'].includes(mediaType) || !getUserMediaError ? false : '/';

    popupHtmlMessage(null, image.forbidden, 'Access denied', html, 'center', redirectURL);

    throw new Error(
        `Access denied for ${mediaType} device [${err.name}]: ${errMessage} check the common getUserMedia errors: https://blog.addpipe.com/common-getusermedia-errors/`,
    );
}

function popupHtmlMessage(icon: null, imageUrl: any, title: string, html: string, position: string, redirectURL = false) {
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        background: swalBackground,
        position: position,
        icon: icon,
        imageUrl: imageUrl,
        title: title,
        html: html,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed && redirectURL) {
            openURL(redirectURL);
        }
    });
}

async function toggleScreenSharing() {
    if (initStream) {
        await stopTracks(initStream);
        elemDisplay('initVideo', true);
        initVideoContainerShow();
    }
    joinRoomWithScreen = !joinRoomWithScreen;
    if (joinRoomWithScreen) {
        await navigator.mediaDevices
            .getDisplayMedia({ audio: true, video: true })
            .then((screenStream) => {
                if (initVideo.classList.contains('mirror')) {
                    initVideo.classList.toggle('mirror');
                }
                initVideo.srcObject = screenStream;
                const initStream = screenStream;
                console.log('04.6 ----> Success attached init screen video stream', initStream);
                show(initStopScreenButton);
                hide(initStartScreenButton);
                disable(initVideoSelect, true);
                disable(initVideoButton, true);
                disable(initAudioVideoButton, true);
                disable(initVideoAudioRefreshButton, true);
            })
            .catch((error) => {
                console.error('[Error] toggleScreenSharing', error);
                joinRoomWithScreen = false;
                return checkInitVideo(isVideoAllowed);
            });
    } else {
        checkInitVideo(isVideoAllowed);
        hide(initStopScreenButton);
        show(initStartScreenButton);
        disable(initVideoSelect, false);
        disable(initVideoButton, false);
        disable(initAudioVideoButton, false);
        disable(initVideoAudioRefreshButton, false);
    }
}

function handleCameraMirror(video: { classList: { contains: (arg0: string) => any; toggle: (arg0: string) => void; remove: (arg0: string) => void; }; }) {
    const isDesktopDevice = !DetectRTC.isMobileDevice && !isTabletDevice && !isIPadDevice;
    if (isDesktopDevice) {
        // Desktop devices...
        if (!video.classList.contains('mirror')) {
            video.classList.toggle('mirror');
        }
    } else {
        // Mobile, Tablet, IPad devices...
        if (video.classList.contains('mirror')) {
            video.classList.remove('mirror');
        }
    }
}

function handleSelects() {
    // devices options
    videoSelect.onchange = () => {
        videoQuality.selectedIndex = 0;
        rc.closeThenProduce(RoomClient.mediaType.video, videoSelect.value);
        refreshLsDevices();
    };
    videoQuality.onchange = () => {
        rc.closeThenProduce(RoomClient.mediaType.video, videoSelect.value);
    };
    videoFps.onchange = () => {
        rc.closeThenProduce(RoomClient.mediaType.video, videoSelect.value);
        localStorageSettings.video_fps = videoFps.selectedIndex;
        lS.setSettings(localStorageSettings);
    };
    screenFps.onchange = () => {
        rc.closeThenProduce(RoomClient.mediaType.screen);
        localStorageSettings.screen_fps = screenFps.selectedIndex;
        lS.setSettings(localStorageSettings);
    };
    microphoneSelect.onchange = () => {
        rc.closeThenProduce(RoomClient.mediaType.audio, microphoneSelect.value);
        refreshLsDevices();
    };
    speakerSelect.onchange = () => {
        rc.changeAudioDestination();
        refreshLsDevices();
    };
    switchPushToTalk.onchange = async (e: { target: { blur: () => void; }; }) => {
        const producerExist = rc.producerExist(RoomClient.mediaType.audio);
        if (!producerExist && !isPushToTalkActive) {
            console.log('Push-to-talk: start audio producer');
            setAudioButtonsDisabled(true);
            if (!isEnumerateAudioDevices) initEnumerateAudioDevices();
            await rc.produce(RoomClient.mediaType.audio, microphoneSelect.value);
            setTimeout(async function () {
                await rc.pauseProducer(RoomClient.mediaType.audio);
                rc.updatePeerInfo(peer_name, socket.id, 'audio', false);
            }, 1000);
        }
        isPushToTalkActive = !isPushToTalkActive;
        if (producerExist && !isPushToTalkActive) {
            console.log('Push-to-talk: resume audio producer');
            await rc.resumeProducer(RoomClient.mediaType.audio);
            rc.updatePeerInfo(peer_name, socket.id, 'audio', true);
        }
        e.target.blur(); // Removes focus from the element
        rc.roomMessage('ptt', isPushToTalkActive);
        console.log(`Push-to-talk enabled: ${isPushToTalkActive}`);
    };
    document.addEventListener('keydown', async (e) => {
        if (!isPushToTalkActive) return;
        if (e.code === 'Space') {
            if (isSpaceDown) return;
            await rc.resumeProducer(RoomClient.mediaType.audio);
            rc.updatePeerInfo(peer_name, socket.id, 'audio', true);
            isSpaceDown = true;
            console.log('Push-to-talk: audio resumed');
        }
    });
    document.addEventListener('keyup', async (e) => {
        if (!isPushToTalkActive) return;
        if (e.code === 'Space') {
            await rc.pauseProducer(RoomClient.mediaType.audio);
            rc.updatePeerInfo(peer_name, socket.id, 'audio', false);
            isSpaceDown = false;
            console.log('Push-to-talk: audio paused');
        }
    });
    // room
    switchBroadcasting.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        isBroadcastingEnabled = e.currentTarget.checked;
        rc.roomAction('broadcasting');
        localStorageSettings.broadcasting = isBroadcastingEnabled;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchLobby.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        isLobbyEnabled = e.currentTarget.checked;
        rc.roomAction(isLobbyEnabled ? 'lobbyOn' : 'lobbyOff');
        rc.lobbyToggle();
        localStorageSettings.lobby = isLobbyEnabled;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchPitchBar.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        isPitchBarEnabled = e.currentTarget.checked;
        rc.roomMessage('pitchBar', isPitchBarEnabled);
        localStorageSettings.pitch_bar = isPitchBarEnabled;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchSounds.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        isSoundEnabled = e.currentTarget.checked;
        rc.roomMessage('sounds', isSoundEnabled);
        localStorageSettings.sounds = isSoundEnabled;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchShare.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        notify = e.currentTarget.checked;
        rc.roomMessage('notify', notify);
        localStorageSettings.share_on_join = notify;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    // audio options
    switchAutoGainControl.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        localStorageSettings.mic_auto_gain_control = e.currentTarget.checked;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchEchoCancellation.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        localStorageSettings.mic_echo_cancellations = e.currentTarget.checked;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchNoiseSuppression.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        localStorageSettings.mic_noise_suppression = e.currentTarget.checked;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    sampleRateSelect.onchange = (e: { currentTarget: { selectedIndex: any; }; target: { blur: () => void; }; }) => {
        localStorageSettings.mic_sample_rate = e.currentTarget.selectedIndex;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    sampleSizeSelect.onchange = (e: { currentTarget: { selectedIndex: any; }; target: { blur: () => void; }; }) => {
        localStorageSettings.mic_sample_size = e.currentTarget.selectedIndex;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    channelCountSelect.onchange = (e: { currentTarget: { selectedIndex: any; }; target: { blur: () => void; }; }) => {
        localStorageSettings.mic_channel_count = e.currentTarget.selectedIndex;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    micLatencyRange.oninput = (e: { currentTarget: { value: any; }; target: { blur: () => void; }; }) => {
        localStorageSettings.mic_latency = e.currentTarget.value;
        lS.setSettings(localStorageSettings);
        micLatencyValue.innerText = e.currentTarget.value;
        e.target.blur();
    };
    micVolumeRange.oninput = (e: { currentTarget: { value: any; }; target: { blur: () => void; }; }) => {
        localStorageSettings.mic_volume = e.currentTarget.value;
        lS.setSettings(localStorageSettings);
        micVolumeValue.innerText = e.currentTarget.value;
        e.target.blur();
    };
    // recording
    switchHostOnlyRecording.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        hostOnlyRecording = e.currentTarget.checked;
        rc.roomAction(hostOnlyRecording ? 'hostOnlyRecordingOn' : 'hostOnlyRecordingOff');
        localStorageSettings.host_only_recording = hostOnlyRecording;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchH264Recording.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        recPrioritizeH264 = e.currentTarget.checked;
        rc.roomMessage('recPrioritizeH264', recPrioritizeH264);
        localStorageSettings.rec_prioritize_h264 = recPrioritizeH264;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchServerRecording.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        rc.recSyncServerRecording = e.currentTarget.checked;
        rc.roomMessage('recSyncServer', rc.recSyncServerRecording);
        localStorageSettings.rec_server = rc.recSyncServerRecording;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    // styling
    keepCustomTheme.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        themeCustom.keep = e.currentTarget.checked;
        selectTheme.disabled = themeCustom.keep;
        rc.roomMessage('customThemeKeep', themeCustom.keep);
        localStorageSettings.theme_custom = themeCustom.keep;
        localStorageSettings.theme_color = themeCustom.color;
        lS.setSettings(localStorageSettings);
        setTheme();
        e.target.blur();
    };
    BtnAspectRatio.onchange = () => {
        setAspectRatio(BtnAspectRatio.value);
    };
    BtnVideoObjectFit.onchange = () => {
        rc.handleVideoObjectFit(BtnVideoObjectFit.value);
        localStorageSettings.video_obj_fit = BtnVideoObjectFit.selectedIndex;
        lS.setSettings(localStorageSettings);
    }; // cover
    BtnVideoControls.onchange = () => {
        rc.handleVideoControls(BtnVideoControls.value);
        localStorageSettings.video_controls = BtnVideoControls.selectedIndex;
        lS.setSettings(localStorageSettings);
    };
    selectTheme.onchange = () => {
        localStorageSettings.theme = selectTheme.selectedIndex;
        lS.setSettings(localStorageSettings);
        setTheme();
    };
    BtnsBarPosition.onchange = () => {
        rc.changeBtnsBarPosition(BtnsBarPosition.value);
        localStorageSettings.buttons_bar = BtnsBarPosition.selectedIndex;
        lS.setSettings(localStorageSettings);
        refreshMainButtonsToolTipPlacement();
        resizeMainButtons();
    };
    pinVideoPosition.onchange = () => {
        rc.toggleVideoPin(pinVideoPosition.value);
        localStorageSettings.pin_grid = pinVideoPosition.selectedIndex;
        lS.setSettings(localStorageSettings);
    };
    // chat
    showChatOnMsg.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        rc.showChatOnMessage = e.currentTarget.checked;
        rc.roomMessage('showChat', rc.showChatOnMessage);
        localStorageSettings.show_chat_on_msg = rc.showChatOnMessage;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    speechIncomingMsg.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        rc.speechInMessages = e.currentTarget.checked;
        rc.roomMessage('speechMessages', rc.speechInMessages);
        localStorageSettings.speech_in_msg = rc.speechInMessages;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    // transcript
    transcriptPersistentMode.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        transcription.isPersistentMode = e.currentTarget.checked;
        rc.roomMessage('transcriptIsPersistentMode', transcription.isPersistentMode);
        localStorageSettings.transcript_persistent_mode = transcription.isPersistentMode;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    transcriptShowOnMsg.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        transcription.showOnMessage = e.currentTarget.checked;
        rc.roomMessage('transcriptShowOnMsg', transcription.showOnMessage);
        localStorageSettings.transcript_show_on_msg = transcription.showOnMessage;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    // whiteboard options
    wbDrawingColorEl.onchange = () => {
        wbCanvas.freeDrawingBrush.color = wbDrawingColorEl.value;
        whiteboardIsDrawingMode(true);
    };
    wbBackgroundColorEl.onchange = () => {
        setWhiteboardBgColor(wbBackgroundColorEl.value);
    };
    whiteboardGhostButton.onclick = () => {
        wbIsBgTransparent = !wbIsBgTransparent;
        wbIsBgTransparent ? wbCanvasBackgroundColor('rgba(0, 0, 0, 0.100)') : setTheme();
    };
    // room moderator rules
    switchEveryoneMute.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        const audioStartMuted = e.currentTarget.checked;
        rc.updateRoomModerator({ type: 'audio_start_muted', status: audioStartMuted });
        rc.roomMessage('audio_start_muted', audioStartMuted);
        localStorageSettings.moderator_audio_start_muted = audioStartMuted;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchEveryoneHidden.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        const videoStartHidden = e.currentTarget.checked;
        rc.updateRoomModerator({ type: 'video_start_hidden', status: videoStartHidden });
        rc.roomMessage('video_start_hidden', videoStartHidden);
        localStorageSettings.moderator_video_start_hidden = videoStartHidden;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchEveryoneCantUnmute.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        const audioCantUnmute = e.currentTarget.checked;
        rc.updateRoomModerator({ type: 'audio_cant_unmute', status: audioCantUnmute });
        rc.roomMessage('audio_cant_unmute', audioCantUnmute);
        localStorageSettings.moderator_audio_cant_unmute = audioCantUnmute;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchEveryoneCantUnhide.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        const videoCantUnhide = e.currentTarget.checked;
        rc.updateRoomModerator({ type: 'video_cant_unhide', status: videoCantUnhide });
        rc.roomMessage('video_cant_unhide', videoCantUnhide);
        localStorageSettings.moderator_video_cant_unhide = videoCantUnhide;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchEveryoneCantShareScreen.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        const screenCantShare = e.currentTarget.checked;
        rc.updateRoomModerator({ type: 'screen_cant_share', status: screenCantShare });
        rc.roomMessage('screen_cant_share', screenCantShare);
        localStorageSettings.moderator_screen_cant_share = screenCantShare;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchEveryoneCantChatPrivately.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        const chatCantPrivately = e.currentTarget.checked;
        rc.updateRoomModerator({ type: 'chat_cant_privately', status: chatCantPrivately });
        rc.roomMessage('chat_cant_privately', chatCantPrivately);
        localStorageSettings.moderator_chat_cant_privately = chatCantPrivately;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchEveryoneCantChatChatGPT.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        const chatCantChatGPT = e.currentTarget.checked;
        rc.updateRoomModerator({ type: 'chat_cant_chatgpt', status: chatCantChatGPT });
        rc.roomMessage('chat_cant_chatgpt', chatCantChatGPT);
        localStorageSettings.moderator_chat_cant_chatgpt = chatCantChatGPT;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
    switchDisconnectAllOnLeave.onchange = (e: { currentTarget: { checked: any; }; target: { blur: () => void; }; }) => {
        const disconnectAll = e.currentTarget.checked;
        rc.roomMessage('disconnect_all_on_leave', disconnectAll);
        localStorageSettings.moderator_disconnect_all_on_leave = disconnectAll;
        lS.setSettings(localStorageSettings);
        e.target.blur();
    };
}

// ####################################################
// HTML INPUTS
// ####################################################

function handleInputs() {
    chatMessage.onkeyup = (e: { keyCode: number; shiftKey: any; preventDefault: () => void; }) => {
        if (e.keyCode === 13 && (DetectRTC.isMobileDevice || !e.shiftKey)) {
            e.preventDefault();
            chatSendButton.click();
        }
    };
    chatMessage.oninput = function () {
        const chatInputEmoji = {
            '<3': '❤️',
            '</3': '💔',
            ':D': '😀',
            ':)': '😃',
            ';)': '😉',
            ':(': '😒',
            ':p': '😛',
            ';p': '😜',
            ":'(": '😢',
            ':+1:': '👍',
            ':*': '😘',
            ':O': '😲',
            ':|': '😐',
            ':*(': '😭',
            XD: '😆',
            ':B': '😎',
            ':P': '😜',
            '<(': '👎',
            '>:(': '😡',
            ':S': '😟',
            ':X': '🤐',
            ';(': '😥',
            ':T': '😖',
            ':@': '😠',
            ':$': '🤑',
            ':&': '🤗',
            ':#': '🤔',
            ':!': '😵',
            ':W': '😷',
            ':%': '🤒',
            ':*!': '🤩',
            ':G': '😬',
            ':R': '😋',
            ':M': '🤮',
            ':L': '🥴',
            ':C': '🥺',
            ':F': '🥳',
            ':Z': '🤢',
            ':^': '🤓',
            ':K': '🤫',
            ':D!': '🤯',
            ':H': '🧐',
            ':U': '🤥',
            ':V': '🤪',
            ':N': '🥶',
            ':J': '🥴',
        };
        // Create a regular expression pattern for all keys in chatInputEmoji
        const regexPattern = new RegExp(
            Object.keys(chatInputEmoji)
                .map((key) => key.replace(/([()[{*+.$^\\|?])/g, '\\$1'))
                .join('|'),
            'gim',
        );
        // Replace matching patterns with corresponding emojis
        this.value = this.value.replace(regexPattern, (match: string | number) => chatInputEmoji[match]);

        rc.checkLineBreaks();
    };

    chatMessage.onpaste = () => {
        isChatPasteTxt = true;
        rc.checkLineBreaks();
    };
}

// ####################################################
// EMOJI PIKER
// ####################################################

function handleChatEmojiPicker() {
    const pickerOptions = {
        theme: 'dark',
        onEmojiSelect: addEmojiToMsg,
    };
    const emojiPicker = new EmojiMart.Picker(pickerOptions);
    rc.this.getId('chatEmoji').appendChild(emojiPicker);

    function addEmojiToMsg(data: { native: any; }) {
        chatMessage.value += data.native;
        rc.toggleChatEmoji();
    }
}

function handleRoomEmojiPicker() {
    const pickerRoomOptions = {
        theme: 'dark',
        onEmojiSelect: sendEmojiToRoom,
    };

    const emojiRoomPicker = new EmojiMart.Picker(pickerRoomOptions);
    emojiPickerContainer.appendChild(emojiRoomPicker);
    emojiPickerContainer.style.display = 'none';

    emojiRoomButton.onclick = () => {
        toggleEmojiPicker();
    };
    closeEmojiPickerContainer.onclick = () => {
        toggleEmojiPicker();
    };

    function sendEmojiToRoom(data: { native: any; }) {
        console.log('Selected Emoji', data.native);
        const cmd = {
            type: 'roomEmoji',
            peer_name: peer_name,
            emoji: data.native,
            broadcast: true,
        };
        if (rc.thereAreParticipants()) {
            rc.emitCmd(cmd);
        }
        rc.handleCmd(cmd);
        // toggleEmojiPicker();
    }

    function toggleEmojiPicker() {
        if (emojiPickerContainer.style.display === 'block') {
            emojiPickerContainer.style.display = 'none';
            setColor(emojiRoomButton, 'white');
        } else {
            emojiPickerContainer.style.display = 'block';
            setColor(emojiRoomButton, 'yellow');
        }
    }
}

// ####################################################
// LOAD SETTINGS FROM LOCAL STORAGE
// ####################################################

function loadSettingsFromLocalStorage() {
    rc.showChatOnMessage = localStorageSettings.show_chat_on_msg;
    transcription.isPersistentMode = localStorageSettings.transcript_persistent_mode;
    transcription.showOnMessage = localStorageSettings.transcript_show_on_msg;
    rc.speechInMessages = localStorageSettings.speech_in_msg;
    isPitchBarEnabled = localStorageSettings.pitch_bar;
    isSoundEnabled = localStorageSettings.sounds;
    showChatOnMsg.checked = rc.showChatOnMessage;
    transcriptPersistentMode.checked = transcription.isPersistentMode;
    transcriptShowOnMsg.checked = transcription.showOnMessage;
    speechIncomingMsg.checked = rc.speechInMessages;
    switchPitchBar.checked = isPitchBarEnabled;
    switchSounds.checked = isSoundEnabled;
    switchShare.checked = notify;

    recPrioritizeH264 = localStorageSettings.rec_prioritize_h264;
    switchH264Recording.checked = recPrioritizeH264;

    switchServerRecording.checked = localStorageSettings.rec_server;

    keepCustomTheme.checked = themeCustom.keep;
    selectTheme.disabled = themeCustom.keep;
    themeCustom.input.value = themeCustom.color;

    switchAutoGainControl.checked = localStorageSettings.mic_auto_gain_control;
    switchEchoCancellation.checked = localStorageSettings.mic_echo_cancellations;
    switchNoiseSuppression.checked = localStorageSettings.mic_noise_suppression;
    sampleRateSelect.selectedIndex = localStorageSettings.mic_sample_rate;
    sampleSizeSelect.selectedIndex = localStorageSettings.mic_sample_size;
    channelCountSelect.selectedIndex = localStorageSettings.mic_channel_count;

    micLatencyRange.value = localStorageSettings.mic_latency || 50;
    micLatencyValue.innerText = localStorageSettings.mic_latency || 50;
    micVolumeRange.value = localStorageSettings.mic_volume || 100;
    micVolumeValue.innerText = localStorageSettings.mic_volume || 100;

    videoFps.selectedIndex = localStorageSettings.video_fps;
    screenFps.selectedIndex = localStorageSettings.screen_fps;
    BtnVideoObjectFit.selectedIndex = localStorageSettings.video_obj_fit;
    BtnVideoControls.selectedIndex = localStorageSettings.video_controls;
    BtnsBarPosition.selectedIndex = localStorageSettings.buttons_bar;
    pinVideoPosition.selectedIndex = localStorageSettings.pin_grid;
    rc.handleVideoObjectFit(BtnVideoObjectFit.value);
    rc.handleVideoControls(BtnVideoControls.value);
    rc.changeBtnsBarPosition(BtnsBarPosition.value);
    rc.toggleVideoPin(pinVideoPosition.value);
    refreshMainButtonsToolTipPlacement();
    resizeMainButtons();
}

// ####################################################
// ROOM CLIENT EVENT LISTNERS
// ####################################################

function handleRoomClientEvents() {
    rc.on(RoomClient.EVENTS.startRec, () => {
        console.log('Room event: Client start recoding');
        hide(startRecButton);
        show(stopRecButton);
        show(pauseRecButton);
        show(recordingTime);
        startRecordingTimer();
        isRecording = true;
        rc.updatePeerInfo(peer_name, socket.id, 'recording', true);
    });
    rc.on(RoomClient.EVENTS.pauseRec, () => {
        console.log('Room event: Client pause recoding');
        hide(pauseRecButton);
        show(resumeRecButton);
    });
    rc.on(RoomClient.EVENTS.resumeRec, () => {
        console.log('Room event: Client resume recoding');
        hide(resumeRecButton);
        show(pauseRecButton);
    });
    rc.on(RoomClient.EVENTS.stopRec, () => {
        console.log('Room event: Client stop recoding');
        hide(stopRecButton);
        hide(pauseRecButton);
        hide(resumeRecButton);
        hide(recordingTime);
        show(startRecButton);
        stopRecordingTimer();
        isRecording = false;
        rc.updatePeerInfo(peer_name, socket.id, 'recording', false);
    });
    rc.on(RoomClient.EVENTS.raiseHand, () => {
        console.log('Room event: Client raise hand');
        hide(raiseHandButton);
        show(lowerHandButton);
        setColor(lowerHandIcon, 'lime');
    });
    rc.on(RoomClient.EVENTS.lowerHand, () => {
        console.log('Room event: Client lower hand');
        hide(lowerHandButton);
        show(raiseHandButton);
        setColor(lowerHandIcon, 'white');
    });
    rc.on(RoomClient.EVENTS.startAudio, () => {
        console.log('Room event: Client start audio');
        hide(startAudioButton);
        show(stopAudioButton);
        setColor(startAudioButton, 'red');
        setAudioButtonsDisabled(false);
    });
    rc.on(RoomClient.EVENTS.pauseAudio, () => {
        console.log('Room event: Client pause audio');
        hide(stopAudioButton);
        show(startAudioButton);
        setColor(startAudioButton, 'red');
        setAudioButtonsDisabled(false);
    });
    rc.on(RoomClient.EVENTS.resumeAudio, () => {
        console.log('Room event: Client resume audio');
        hide(startAudioButton);
        show(stopAudioButton);
        setAudioButtonsDisabled(false);
    });
    rc.on(RoomClient.EVENTS.stopAudio, () => {
        console.log('Room event: Client stop audio');
        hide(stopAudioButton);
        show(startAudioButton);
        setAudioButtonsDisabled(false);
        stopMicrophoneProcessing();
    });
    rc.on(RoomClient.EVENTS.startVideo, () => {
        console.log('Room event: Client start video');
        hide(startVideoButton);
        show(stopVideoButton);
        setColor(startVideoButton, 'red');
        setVideoButtonsDisabled(false);
        // if (isParticipantsListOpen) getRoomParticipants();
    });
    rc.on(RoomClient.EVENTS.pauseVideo, () => {
        console.log('Room event: Client pause video');
        hide(stopVideoButton);
        show(startVideoButton);
        setColor(startVideoButton, 'red');
        setVideoButtonsDisabled(false);
    });
    rc.on(RoomClient.EVENTS.resumeVideo, () => {
        console.log('Room event: Client resume video');
        hide(startVideoButton);
        show(stopVideoButton);
        setVideoButtonsDisabled(false);
        isVideoPrivacyActive = false;
    });
    rc.on(RoomClient.EVENTS.stopVideo, () => {
        console.log('Room event: Client stop video');
        hide(stopVideoButton);
        show(startVideoButton);
        setVideoButtonsDisabled(false);
        isVideoPrivacyActive = false;
        // if (isParticipantsListOpen) getRoomParticipants();
    });
    rc.on(RoomClient.EVENTS.startScreen, () => {
        console.log('Room event: Client start screen');
        hide(startScreenButton);
        show(stopScreenButton);
        // if (isParticipantsListOpen) getRoomParticipants();
    });
    rc.on(RoomClient.EVENTS.pauseScreen, () => {
        console.log('Room event: Client pause screen');
        hide(startScreenButton);
        show(stopScreenButton);
    });
    rc.on(RoomClient.EVENTS.resumeScreen, () => {
        console.log('Room event: Client resume screen');
        hide(stopScreenButton);
        show(startScreenButton);
    });
    rc.on(RoomClient.EVENTS.stopScreen, () => {
        console.log('Room event: Client stop screen');
        hide(stopScreenButton);
        show(startScreenButton);
        // if (isParticipantsListOpen) getRoomParticipants();
    });
    rc.on(RoomClient.EVENTS.roomLock, () => {
        console.log('Room event: Client lock room');
        hide(lockRoomButton);
        show(unlockRoomButton);
        setColor(unlockRoomButton, 'red');
    });
    rc.on(RoomClient.EVENTS.roomUnlock, () => {
        console.log('Room event: Client unlock room');
        hide(unlockRoomButton);
        show(lockRoomButton);
    });
    rc.on(RoomClient.EVENTS.lobbyOn, () => {
        console.log('Room event: Client room lobby enabled');
        if (isRulesActive && !isPresenter) {
            hide(lobbyButton);
        }
        sound('lobby');
        isLobbyEnabled = true;
    });
    rc.on(RoomClient.EVENTS.lobbyOff, () => {
        console.log('Room event: Client room lobby disabled');
        isLobbyEnabled = false;
    });
    rc.on(RoomClient.EVENTS.hostOnlyRecordingOn, () => {
        if (isRulesActive && !isPresenter) {
            console.log('Room event: host only recording enabled');
            // Stop recording ...
            if (rc.isRecording() || recordingStatus.innerText != '0s') {
                rc.saveRecording('Room event: host only recording enabled, going to stop recording');
            }
            hide(startRecButton);
            hide(recordingImage);
            hide(roomHostOnlyRecording);
            hide(roomRecordingOptions);
            hide(roomRecordingServer);
            show(recordingMessage);
            hostOnlyRecording = true;
        }
    });
    rc.on(RoomClient.EVENTS.hostOnlyRecordingOff, () => {
        if (isRulesActive && !isPresenter) {
            console.log('Room event: host only recording disabled');
            show(startRecButton);
            show(recordingImage);
            hide(roomHostOnlyRecording);
            hide(recordingMessage);
            hostOnlyRecording = false;
        }
    });
    rc.on(RoomClient.EVENTS.exitRoom, () => {
        console.log('Room event: Client leave room');
        if (rc.isRecording() || recordingStatus.innerText != '0s') {
            rc.saveRecording('Room event: Client save recording before to exit');
        }
        if (survey && survey.enabled) {
            leaveFeedback();
        } else {
            redirectOnLeave();
        }
    });
}

// ####################################################
// UTILITY
// ####################################################

function leaveFeedback() {
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        showDenyButton: true,
        background: swalBackground,
        imageUrl: image.feedback,
        title: 'Leave a feedback',
        text: 'Do you want to rate your MiroTalk experience?',
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
            openURL(survey.url);
        } else {
            redirectOnLeave();
        }
    });
}

function redirectOnLeave() {
    redirect && redirect.enabled ? openURL(redirect.url) : openURL('/newroom');
}

function userLog(icon: string, message: string, position: string | undefined, timer = 3000) {
    const Toast = Swal.mixin({
        background: swalBackground,
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
    });
    Toast.fire({
        icon: icon,
        title: message,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    });
}

function saveDataToFile(dataURL: string, fileName: string) {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = dataURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(dataURL);
    }, 100);
}

function saveObjToJsonFile(dataObj: any[], name: string) {
    console.log('Save data', { dataObj: dataObj, name: name });
    const dataTime = getDataTimeString();
    let a = document.createElement('a');
    a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataObj, null, 1));
    a.download = `${dataTime}-${name}.txt`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
    sound('download');
}

function getDataTimeString() {
    const d = new Date();
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date}-${time}`;
}

function getDataTimeStringFormat() {
    const d = new Date();
    const date = d.toISOString().split('T')[0].replace(/-/g, '_');
    const time = d.toTimeString().split(' ')[0].replace(/:/g, '_');
    return `${date}_${time}`;
}

function getUUID() {
    const uuid4 = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
    );
    if (window.localStorage.uuid) {
        return window.localStorage.uuid;
    }
    window.localStorage.uuid = uuid4;
    return uuid4;
}

function showButtons() {
    if (
        isButtonsBarOver ||
        isButtonsVisible ||
        (rc.isMobileDevice && rc.isChatOpen) ||
        (rc.isMobileDevice && rc.isMySettingsOpen)
    )
        return;
    toggleClassElements('videoMenuBar', 'inline');
    control.style.display = 'flex';
    const isButtonsVisible = true;
}

function checkButtonsBar() {
    if (!isButtonsBarOver) {
        toggleClassElements('videoMenuBar', 'none');
        control.style.display = 'none';
    }
    setTimeout(() => {
        checkButtonsBar();
    }, 10000);
}

function toggleClassElements(className: string, displayState: string) {
    let elements = rc.getEcN(className);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = displayState;
    }
}

function setAudioButtonsDisabled(disabled: boolean) {
    startAudioButton.disabled = disabled;
    stopAudioButton.disabled = disabled;
}

function setVideoButtonsDisabled(disabled: boolean) {
    startVideoButton.disabled = disabled;
    stopVideoButton.disabled = disabled;
}

async function sound(name: string, force = false) {
    if (!isSoundEnabled && !force) return;
    let sound = '../sounds/' + name + '.wav';
    let audio = new Audio(sound);
    try {
        audio.volume = 0.5;
        await audio.play();
    } catch (err) {
        return false;
    }
}

function isImageURL(url: { match: (arg0: RegExp) => null; }) {
    return url.match(/\.(jpeg|jpg|gif|png|tiff|bmp)$/) != null;
}


function isTablet(userAgent: string) {
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        userAgent,
    );
}

function isIpad(userAgent: string) {
    return /macintosh/.test(userAgent) && 'ontouchend' in document;
}

function openURL(url: string | boolean | URL | undefined, blank = false) {
    blank ? window.open(url, '_blank') : (window.location.href = url);
}

function bytesToSize(bytes: number) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function setCookie(name: string, value: string, expDays: number) {
    let date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
}

function getCookie(cName: string) {
    const name = cName + '=';
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
}

function isHtml(str: string) {
    var a = document.createElement('div');
    a.innerHTML = str;
    for (var c = a.childNodes, i = c.length; i--; ) {
        if (c[i].nodeType == 1) return true;
    }
    return false;
}

function getId(id: string) {
    return document.getElementById(id);
}

// ####################################################
// HANDLE WHITEBOARD
// ####################################################

function toggleWhiteboard() {
    if (!wbIsOpen) rc.sound('open');
    whiteboardCenter();
    whiteboard.classList.toggle('show');
    wbIsOpen = !wbIsOpen;
}

function whiteboardCenter() {
    whiteboard.style.top = '50%';
    whiteboard.style.left = '50%';
}

function setupWhiteboard() {
    setupWhiteboardCanvas();
    setupWhiteboardCanvasSize();
    setupWhiteboardLocalListners();
}

function setupWhiteboardCanvas() {
    wbCanvas = new fabric.Canvas('wbCanvas');
    wbCanvas.freeDrawingBrush.color = '#FFFFFF';
    wbCanvas.freeDrawingBrush.width = 3;
    whiteboardIsDrawingMode(true);
}

function setupWhiteboardCanvasSize() {
    let optimalSize = [wbWidth, wbHeight];
    let scaleFactorX = window.innerWidth / optimalSize[0];
    let scaleFactorY = window.innerHeight / optimalSize[1];
    if (scaleFactorX < scaleFactorY && scaleFactorX < 1) {
        wbCanvas.setWidth(optimalSize[0] * scaleFactorX);
        wbCanvas.setHeight(optimalSize[1] * scaleFactorX);
        wbCanvas.setZoom(scaleFactorX);
        setWhiteboardSize(optimalSize[0] * scaleFactorX, optimalSize[1] * scaleFactorX);
    } else if (scaleFactorX > scaleFactorY && scaleFactorY < 1) {
        wbCanvas.setWidth(optimalSize[0] * scaleFactorY);
        wbCanvas.setHeight(optimalSize[1] * scaleFactorY);
        wbCanvas.setZoom(scaleFactorY);
        setWhiteboardSize(optimalSize[0] * scaleFactorY, optimalSize[1] * scaleFactorY);
    } else {
        wbCanvas.setWidth(optimalSize[0]);
        wbCanvas.setHeight(optimalSize[1]);
        wbCanvas.setZoom(1);
        setWhiteboardSize(optimalSize[0], optimalSize[1]);
    }
    wbCanvas.calcOffset();
    wbCanvas.renderAll();
}

function setWhiteboardSize(w: string | number | null, h: string | number | null) {
    document.documentElement.style.setProperty('--wb-width', w);
    document.documentElement.style.setProperty('--wb-height', h);
}

function setWhiteboardBgColor(color: any) {
    let data = {
        peer_name: peer_name,
        action: 'bgcolor',
        color: color,
    };
    whiteboardAction(data);
}

function whiteboardIsDrawingMode(status: boolean) {
    wbCanvas.isDrawingMode = status;
    if (status) {
        setColor(whiteboardPencilBtn, 'green');
        setColor(whiteboardObjectBtn, 'white');
        setColor(whiteboardEraserBtn, 'white');
        wbIsEraser = false;
    } else {
        setColor(whiteboardPencilBtn, 'white');
        setColor(whiteboardObjectBtn, 'green');
    }
}

function whiteboardIsEraser(status: boolean) {
    whiteboardIsDrawingMode(false);
    wbIsEraser = status;
    setColor(whiteboardEraserBtn, wbIsEraser ? 'green' : 'white');
}

function whiteboardAddObj(type: string) {
    switch (type) {
        case 'imgUrl':
            Swal.fire({
                background: swalBackground,
                title: 'Image URL',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'OK',
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result: { isConfirmed: any; value: any; }) => {
                if (result.isConfirmed) {
                    let wbCanvasImgURL = result.value;
                    if (isImageURL(wbCanvasImgURL)) {
                        fabric.Image.fromURL(wbCanvasImgURL, function (myImg: any) {
                            addWbCanvasObj(myImg);
                        });
                    } else {
                        userLog('error', 'The URL is not a valid image', 'top-end');
                    }
                }
            });
            break;
        case 'imgFile':
            Swal.fire({
                allowOutsideClick: false,
                background: swalBackground,
                position: 'center',
                title: 'Select the image',
                input: 'file',
                inputAttributes: {
                    accept: wbImageInput,
                    'aria-label': 'Select the image',
                },
                showDenyButton: true,
                confirmButtonText: `OK`,
                denyButtonText: `Cancel`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result: { isConfirmed: any; value: any; }) => {
                if (result.isConfirmed) {
                    let wbCanvasImg = result.value;
                    if (wbCanvasImg && wbCanvasImg.size > 0) {
                        let reader = new FileReader();
                        reader.onload = function (event) {
                            let imgObj = new Image();
                            imgObj.src = event.target.result;
                            imgObj.onload = function () {
                                let image = new fabric.Image(imgObj);
                                image.set({ top: 0, left: 0 }).scale(0.3);
                                addWbCanvasObj(image);
                            };
                        };
                        reader.readAsDataURL(wbCanvasImg);
                    } else {
                        userLog('error', 'File not selected or empty', 'top-end');
                    }
                }
            });
            break;
        case 'pdfFile':
            Swal.fire({
                allowOutsideClick: false,
                background: swalBackground,
                position: 'center',
                title: 'Select the PDF',
                input: 'file',
                inputAttributes: {
                    accept: wbPdfInput,
                    'aria-label': 'Select the PDF',
                },
                showDenyButton: true,
                confirmButtonText: `OK`,
                denyButtonText: `Cancel`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result: { isConfirmed: any; value: any; }) => {
                if (result.isConfirmed) {
                    let wbCanvasPdf = result.value;
                    if (wbCanvasPdf && wbCanvasPdf.size > 0) {
                        let reader = new FileReader();
                        reader.onload = async function (event) {
                            wbCanvas.requestRenderAll();
                            await pdfToImage(event.target.result, wbCanvas);
                            whiteboardIsDrawingMode(false);
                            wbCanvasToJson();
                        };
                        reader.readAsDataURL(wbCanvasPdf);
                    } else {
                        userLog('error', 'File not selected or empty', 'top-end');
                    }
                }
            });
            break;
        case 'text':
            const text = new fabric.IText('Lorem Ipsum', {
                top: 0,
                left: 0,
                fontFamily: 'Comfortaa',
                fill: wbCanvas.freeDrawingBrush.color,
                strokeWidth: wbCanvas.freeDrawingBrush.width,
                stroke: wbCanvas.freeDrawingBrush.color,
            });
            addWbCanvasObj(text);
            break;
        case 'line':
            const line = new fabric.Line([50, 100, 200, 200], {
                top: 0,
                left: 0,
                fill: wbCanvas.freeDrawingBrush.color,
                strokeWidth: wbCanvas.freeDrawingBrush.width,
                stroke: wbCanvas.freeDrawingBrush.color,
            });
            addWbCanvasObj(line);
            break;
        case 'circle':
            const circle = new fabric.Circle({
                radius: 50,
                fill: 'transparent',
                stroke: wbCanvas.freeDrawingBrush.color,
                strokeWidth: wbCanvas.freeDrawingBrush.width,
            });
            addWbCanvasObj(circle);
            break;
        case 'rect':
            const rect = new fabric.Rect({
                top: 0,
                left: 0,
                width: 150,
                height: 100,
                fill: 'transparent',
                stroke: wbCanvas.freeDrawingBrush.color,
                strokeWidth: wbCanvas.freeDrawingBrush.width,
            });
            addWbCanvasObj(rect);
            break;
        case 'triangle':
            const triangle = new fabric.Triangle({
                top: 0,
                left: 0,
                width: 150,
                height: 100,
                fill: 'transparent',
                stroke: wbCanvas.freeDrawingBrush.color,
                strokeWidth: wbCanvas.freeDrawingBrush.width,
            });
            addWbCanvasObj(triangle);
            break;
        default:
            break;
    }
}

function readBlob(blob: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.addEventListener('error', reject);
        reader.readAsDataURL(blob);
    });
}

async function loadPDF(pdfData: string, pages: number[] | undefined) {
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfData = pdfData instanceof Blob ? await readBlob(pdfData) : pdfData;
    const data = atob(pdfData.startsWith(Base64Prefix) ? pdfData.substring(Base64Prefix.length) : pdfData);
    try {
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        const numPages = pdf.numPages;
        const canvases = await Promise.all(
            Array.from({ length: numPages }, (_, i) => {
                const pageNumber = i + 1;
                if (pages && pages.indexOf(pageNumber) === -1) return null;
                return pdf.getPage(pageNumber).then(async (page: { getViewport: (arg0: { scale: number; }) => any; render: (arg0: { canvasContext: CanvasRenderingContext2D | null; viewport: any; }) => { (): any; new(): any; promise: any; }; }) => {
                    const viewport = page.getViewport({ scale: window.devicePixelRatio });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    await page.render(renderContext).promise;
                    return canvas;
                });
            }),
        );
        return canvases.filter((canvas) => canvas !== null);
    } catch (error) {
        console.error('Error loading PDF', error.message);
        throw error.message;
    }
}

async function pdfToImage(pdfData: string | ArrayBuffer | null, canvas: { add: (arg0: any) => void; }) {
    const scale = 1 / window.devicePixelRatio;
    try {
        const canvases = await loadPDF(pdfData);
        canvases.forEach(async (c) => {
            canvas.add(
                new fabric.Image(await c, {
                    scaleX: scale,
                    scaleY: scale,
                }),
            );
        });
    } catch (error) {
        console.error('Error converting PDF to images', error.message);
        throw error.message;
    }
}

function addWbCanvasObj(obj: any) {
    if (obj) {
        wbCanvas.add(obj).setActiveObject(obj);
        whiteboardIsDrawingMode(false);
        wbCanvasToJson();
    } else {
        console.error('Invalid input. Expected an obj of canvas elements');
    }
}

function setupWhiteboardLocalListners() {
    wbCanvas.on('mouse:down', function (e: any) {
        mouseDown(e);
    });
    wbCanvas.on('mouse:up', function () {
        mouseUp();
    });
    wbCanvas.on('mouse:move', function () {
        mouseMove();
    });
    wbCanvas.on('object:added', function () {
        objectAdded();
    });
}

function mouseDown(e: { target: any; }) {
    wbIsDrawing = true;
    if (wbIsEraser && e.target) {
        wbCanvas.remove(e.target);
        return;
    }
}

function mouseUp() {
    wbIsDrawing = false;
    wbCanvasToJson();
}

function mouseMove() {
    if (wbIsEraser) {
        wbCanvas.hoverCursor = 'not-allowed';
        return;
    } else {
        wbCanvas.hoverCursor = 'move';
    }
    if (!wbIsDrawing) return;
}

function objectAdded() {
    if (!wbIsRedoing) wbPop = [];
    wbIsRedoing = false;
}

function wbCanvasBackgroundColor(color: string | null) {
    document.documentElement.style.setProperty('--wb-bg', color);
    wbBackgroundColorEl.value = color;
    wbCanvas.setBackgroundColor(color);
    wbCanvas.renderAll();
}

function wbCanvasUndo() {
    if (wbCanvas._objects.length > 0) {
        wbPop.push(wbCanvas._objects.pop());
        wbCanvas.renderAll();
    }
}

function wbCanvasRedo() {
    if (wbPop.length > 0) {
        wbIsRedoing = true;
        wbCanvas.add(wbPop.pop());
    }
}

function wbCanvasSaveImg() {
    const dataURL = wbCanvas.toDataURL({
        width: wbCanvas.getWidth(),
        height: wbCanvas.getHeight(),
        left: 0,
        top: 0,
        format: 'png',
    });
    const dataNow = getDataTimeString();
    const fileName = `whiteboard-${dataNow}.png`;
    saveDataToFile(dataURL, fileName);
}

function wbUpdate() {
    if (wbIsOpen && (!isRulesActive || isPresenter)) {
        console.log('IsPresenter: update whiteboard canvas to the participants in the room');
        wbCanvasToJson();
        whiteboardAction(getWhiteboardAction(wbIsLock ? 'lock' : 'unlock'));
    }
}

function wbCanvasToJson() {
    if (!isPresenter && wbIsLock) return;
    if (rc.thereAreParticipants()) {
        let wbCanvasJson = JSON.stringify(wbCanvas.toJSON());
        rc.socket.emit('wbCanvasToJson', wbCanvasJson);
    }
}

function JsonToWbCanvas(json: any) {
    if (!wbIsOpen) toggleWhiteboard();
    wbCanvas.loadFromJSON(json);
    wbCanvas.renderAll();
    if (!isPresenter && !wbCanvas.isDrawingMode && wbIsLock) {
        wbDrawing(false);
    }
}

function getWhiteboardAction(action: string) {
    return {
        peer_name: peer_name,
        action: action,
    };
}

function confirmClearBoard() {
    Swal.fire({
        background: swalBackground,
        imageUrl: image.delete,
        position: 'center',
        title: 'Clean the board',
        text: 'Are you sure you want to clean the board?',
        showDenyButton: true,
        confirmButtonText: `Yes`,
        denyButtonText: `No`,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
            whiteboardAction(getWhiteboardAction('clear'));
            sound('delete');
        }
    });
}

function whiteboardAction(data: { peer_name: any; action: any; color?: any; }, emit = true) {
    if (emit) {
        if (rc.thereAreParticipants()) {
            rc.socket.emit('whiteboardAction', data);
        }
    } else {
        userLog(
            'info',
            `${data.peer_name} <i class="fas fa-chalkboard-teacher"></i> whiteboard action: ${data.action}`,
            'top-end',
        );
    }

    switch (data.action) {
        case 'bgcolor':
            wbCanvasBackgroundColor(data.color);
            break;
        case 'undo':
            wbCanvasUndo();
            break;
        case 'redo':
            wbCanvasRedo();
            break;
        case 'clear':
            wbCanvas.clear();
            break;
        case 'lock':
            if (!isPresenter) {
                elemDisplay('whiteboardTitle', false);
                elemDisplay('whiteboardOptions', false);
                elemDisplay('whiteboardButton', false);
                wbDrawing(false);
                wbIsLock = true;
            }
            break;
        case 'unlock':
            if (!isPresenter) {
                elemDisplay('whiteboardTitle', true, 'flex');
                elemDisplay('whiteboardOptions', true, 'inline');
                elemDisplay('whiteboardButton', true);
                wbDrawing(true);
                wbIsLock = false;
            }
            break;
        case 'close':
            if (wbIsOpen) toggleWhiteboard();
            break;
        default:
            break;
        //...
    }
}

function wbDrawing(status: boolean) {
    wbCanvas.isDrawingMode = status; // Disable free drawing
    wbCanvas.selection = status; // Disable object selection
    wbCanvas.forEachObject(function (obj: { selectable: any; }) {
        obj.selectable = status; // Make all objects unselectable
    });
}

// ####################################################
// HANDLE PARTICIPANTS
// ####################################################

async function getRemotePeerInfo(peer_id: unknown) {
    const peers = await getRoomPeers();
    for (let peer of Array.from(peers.keys()).filter((id) => id === peer_id)) {
        return peers.get(peer).peer_info;
    }
    return false;
}

async function getRoomPeers() {
    let room_info = await rc.getRoomInfo();
    return new Map(JSON.parse(room_info.peers));
}

async function saveRoomPeers() {
    const peers = await getRoomPeers();
    let peersToSave = [];
    for (let peer of Array.from(peers.keys())) {
        peersToSave.push(peers.get(peer).peer_info);
    }
    saveObjToJsonFile(peersToSave, 'PARTICIPANTS');
}

async function getRoomParticipants() {
    const peers = await getRoomPeers();
    const lists = getParticipantsList(peers);
    participantsCount = peers.size;
    participantsList.innerHTML = lists;
    refreshParticipantsCount(participantsCount, false);
    setParticipantsTippy(peers);
    console.log('*** Refresh Chat participant lists ***');
}

function getParticipantsList(peers: Map<unknown, unknown>) {
    let li = '';

    const chatGPT = BUTTONS.chat.chatGPT !== undefined ? BUTTONS.chat.chatGPT : true;

    // CHAT-GPT
    if (chatGPT) {
        li = `
        <li 
            id="ChatGPT" 
            data-to-id="ChatGPT"
            data-to-name="ChatGPT"
            class="clearfix" 
            onclick="rc.showPeerAboutAndMessages(this.id, 'ChatGPT', event)"
        >
            <img 
                src="${image.chatgpt}"
                alt="avatar"
            />
            <div class="about">
                <div class="name">ChatGPT</div>
                <div class="status"><i class="fa fa-circle online"></i> online</div>
            </div>
        </li>`;
    }

    // ALL
    li += `
    <li id="all"
        data-to-id="all"
        data-to-name="all"
        class="clearfix active" 
        onclick="rc.showPeerAboutAndMessages(this.id, 'all', event)"
    >
        <img 
            src="${image.all}"
            alt="avatar"
        />
        <div class="about">
            <div class="name">Public chat</div>
            <div class="status"> <i class="fa fa-circle online"></i> online ${participantsCount}</div>
        </div>`;

    // ONLY PRESENTER CAN EXECUTE THIS CMD
    if (!isRulesActive || isPresenter) {
        li += `
        <div style="class="dropdown">
            <button 
                class="dropdown-toggle" 
                type="button" 
                id="${socket.id}-chatDropDownMenu" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                style="float: right"
            >
            <!-- <i class="fas fa-bars"></i> -->
            <i class="fas fa-ellipsis-vertical"></i>
            </button>
            <ul class="dropdown-menu text-start" aria-labelledby="${socket.id}-chatDropDownMenu">`;

        if (BUTTONS.participantsList.sendFileAllButton) {
            li += `<li><button class="btn-sm ml5" id="sendAllButton" onclick="rc.selectFileToShare('${socket.id}', true)">${_PEER.sendFile} Share file to all</button></li>`;
        }

        li += `<li><button class="btn-sm ml5" id="sendVideoToAll" onclick="rc.shareVideo('all');">${_PEER.sendVideo} Share audio/video to all</button></li>`;

        if (BUTTONS.participantsList.ejectAllButton) {
            li += `<li><button class="btn-sm ml5" id="ejectAllButton" onclick="rc.peerAction('me','${socket.id}','eject',true,true)">${_PEER.ejectPeer} Eject all participants</button></li>`;
        }

        li += `</ul>
        </div>

        <br/>

        <div class="about-buttons mt5">
            <button class="ml5" id="muteAllButton" onclick="rc.peerAction('me','${socket.id}','mute',true,true)">${_PEER.audioOff}</button>
            <button class="ml5" id="hideAllButton" onclick="rc.peerAction('me','${socket.id}','hide',true,true)">${_PEER.videoOff}</button>
            <button class="ml5" id="stopAllButton" onclick="rc.peerAction('me','${socket.id}','stop',true,true)">${_PEER.screenOff}</button>
        </div>`;
    }

    li += `
    </li>
    `;

    // PEERS IN THE CURRENT ROOM
    for (const peer of Array.from(peers.keys())) {
        const peer_info = peers.get(peer).peer_info;
        const peer_name = peer_info.peer_name;
        const peer_name_limited = peer_name.length > 15 ? peer_name.substring(0, 10) + '*****' : peer_name;
        //const peer_presenter = peer_info.peer_presenter ? _PEER.presenter : _PEER.guest;
        const peer_audio = peer_info.peer_audio ? _PEER.audioOn : _PEER.audioOff;
        const peer_video = peer_info.peer_video ? _PEER.videoOn : _PEER.videoOff;
        const peer_screen = peer_info.peer_screen ? _PEER.screenOn : _PEER.screenOff;
        const peer_hand = peer_info.peer_hand ? _PEER.raiseHand : _PEER.lowerHand;
        const peer_ban = _PEER.banPeer;
        const peer_eject = _PEER.ejectPeer;
        const peer_geoLocation = _PEER.geoLocation;
        const peer_sendFile = _PEER.sendFile;
        const peer_id = peer_info.peer_id;
        const avatarImg = getParticipantAvatar(peer_name);

        // NOT ME
        if (socket.id !== peer_id) {
            // PRESENTER HAS MORE OPTIONS
            if (isRulesActive && isPresenter) {
                li += `
                <li 
                    id='${peer_id}'
                    data-to-id="${peer_id}" 
                    data-to-name="${peer_name}"
                    class="clearfix" 
                    onclick="rc.showPeerAboutAndMessages(this.id, '${peer_name}', event)"
                >
                    <img
                        src="${avatarImg}"
                        alt="avatar" 
                    />
                    <div class="about">
                        <div class="name">${peer_name_limited}</div>
                        <div class="status"> <i class="fa fa-circle online"></i> online <i id="${peer_id}-unread-msg" class="fas fa-comments hidden"></i> </div>
                    </div>

                    <div style="class="dropdown">
                        <button 
                            class="dropdown-toggle" 
                            type="button" 
                            id="${peer_id}-chatDropDownMenu" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            style="float: right"
                        >
                        <!-- <i class="fas fa-bars"></i> -->
                        <i class="fas fa-ellipsis-vertical"></i>
                        </button>
                        <ul class="dropdown-menu text-start" aria-labelledby="${peer_id}-chatDropDownMenu">`;

                if (BUTTONS.participantsList.sendFileButton) {
                    li += `<li><button class="btn-sm ml5" id='${peer_id}___shareFile' onclick="rc.selectFileToShare('${peer_id}', false)">${peer_sendFile} Share file</button></li>`;
                }

                li += `<li><button class="btn-sm ml5" id="${peer_id}___sendVideoTo" onclick="rc.shareVideo('${peer_id}');">${_PEER.sendVideo} Share audio/video</button></li>`;

                if (BUTTONS.participantsList.geoLocationButton) {
                    li += `<li><button class="btn-sm ml5" id='${peer_id}___geoLocation' onclick="rc.askPeerGeoLocation(this.id)">${peer_geoLocation} Get geolocation</button></li>`;
                }
                if (BUTTONS.participantsList.banButton) {
                    li += `<li><button class="btn-sm ml5" id='${peer_id}___pBan' onclick="rc.peerAction('me',this.id,'ban')">${peer_ban} Ban participant</button></li>`;
                }
                if (BUTTONS.participantsList.ejectButton) {
                    li += `<li><button class="btn-sm ml5" id='${peer_id}___pEject' onclick="rc.peerAction('me',this.id,'eject')">${peer_eject} Eject participant</button></li>`;
                }

                li += `</ul>
                    </div>

                    <br/>

                    <div class="about-buttons mt5"> 
                        <button class="ml5" id='${peer_id}___pAudio' onclick="rc.peerAction('me',this.id,'mute')">${peer_audio}</button>
                        <button class="ml5" id='${peer_id}___pVideo' onclick="rc.peerAction('me',this.id,'hide')">${peer_video}</button>
                        <button class="ml5" id='${peer_id}___pScreen' onclick="rc.peerAction('me',this.id,'stop')">${peer_screen}</button>
                `;

                // li += `
                //         <button class="ml5" >${peer_presenter}</button>`;

                if (peer_info.peer_hand) {
                    li += `
                        <button class="ml5" >${peer_hand}</button>`;
                }

                li += ` 
                    </div>
                </li>
                `;
            } else {
                // GUEST USER
                li += `
                <li 
                    id='${peer_id}' 
                    data-to-id="${peer_id}"
                    data-to-name="${peer_name}"
                    class="clearfix" 
                    onclick="rc.showPeerAboutAndMessages(this.id, '${peer_name}', event)"
                >
                <img 
                    src="${avatarImg}"
                    alt="avatar" 
                />
                    <div class="about">
                        <div class="name">${peer_name_limited}</div>
                        <div class="status"> <i class="fa fa-circle online"></i> online <i id="${peer_id}-unread-msg" class="fas fa-comments hidden"></i> </div>
                    </div>
                `;

                // NO ROOM BROADCASTING
                if (!isBroadcastingEnabled) {
                    li += `
                    <div style="class="dropdown">
                        <button 
                            class="dropdown-toggle" 
                            type="button" 
                            id="${peer_id}-chatDropDownMenu" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                            style="float: right"
                        >
                        <!-- <i class="fas fa-bars"></i> -->
                        <i class="fas fa-ellipsis-vertical"></i>
                        </button>
                        <ul class="dropdown-menu text-start" aria-labelledby="${peer_id}-chatDropDownMenu">`;

                    if (BUTTONS.participantsList.sendFileButton) {
                        li += `<li><button class="btn-sm ml5" id='${peer_id}___shareFile' onclick="rc.selectFileToShare('${peer_id}', false)">${peer_sendFile} Share file</button></li>`;
                    }

                    li += `<li><button class="btn-sm ml5" id="${peer_id}___sendVideoTo" onclick="rc.shareVideo('${peer_id}');">${_PEER.sendVideo} Share Audio/Video</button></li>
                        </ul>
                    </div>
                    `;
                }

                li += `
                    <br/>

                    <div class="about-buttons mt5"> 
                        <button class="ml5" id='${peer_id}___pAudio' onclick="rc.peerGuestNotAllowed('audio')">${peer_audio}</button>
                        <button class="ml5" id='${peer_id}___pVideo' onclick="rc.peerGuestNotAllowed('video')">${peer_video}</button>
                        <button class="ml5" id='${peer_id}___pScreen' onclick="rc.peerGuestNotAllowed('screen')">${peer_screen}</button>
                        `;

                // li += `
                //         <button class="ml5" >${peer_presenter}</button>`;

                if (peer_info.peer_hand) {
                    li += ` 
                        <button class="ml5" >${peer_hand}</button>`;
                }

                li += ` 
                    </div>
                </li>
                `;
            }
        }
    }
    return li;
}

function setParticipantsTippy(peers: Map<unknown, unknown>) {
    //
    if (!DetectRTC.isMobileDevice) {
        setTippy('muteAllButton', 'Mute all participants', 'top');
        setTippy('hideAllButton', 'Hide all participants', 'top');
        setTippy('stopAllButton', 'Stop screen share to all participants', 'top');
        //
        for (let peer of Array.from(peers.keys())) {
            const peer_info = peers.get(peer).peer_info;
            const peer_id = peer_info.peer_id;

            const peerAudioBtn = rc.getId(peer_id + '___pAudio');
            const peerVideoBtn = rc.getId(peer_id + '___pVideo');
            const peerScreenBtn = rc.getId(peer_id + '___pScreen');

            if (peerAudioBtn) setTippy(peerAudioBtn.id, 'Mute', 'top');
            if (peerVideoBtn) setTippy(peerVideoBtn.id, 'Hide', 'top');
            if (peerScreenBtn) setTippy(peerScreenBtn.id, 'Stop', 'top');
        }
    }
}

function refreshParticipantsCount(count: undefined, adapt = true) {
    if (adapt) adaptAspectRatio(count);
}

function getParticipantAvatar(peerName: any) {
    if (rc.isValidEmail(peerName)) {
        return rc.genGravatar(peerName);
    }
    return rc.genAvatarSvg(peerName, 32);
}

// ####################################################
// SET THEME
// ####################################################

function setCustomTheme() {
    const color = themeCustom.color;
    swalBackground = `radial-gradient(${color}, ${color})`;
    document.documentElement.style.setProperty('--body-bg', `radial-gradient(${color}, ${color})`);
    document.documentElement.style.setProperty('--transcription-bg', `radial-gradient(${color}, ${color})`);
    document.documentElement.style.setProperty('--msger-bg', `radial-gradient(${color}, ${color})`);
    document.documentElement.style.setProperty('--left-msg-bg', `${color}`);
    document.documentElement.style.setProperty('--right-msg-bg', `${color}`);
    document.documentElement.style.setProperty('--select-bg', `${color}`);
    document.documentElement.style.setProperty('--tab-btn-active', `${color}`);
    document.documentElement.style.setProperty('--settings-bg', `radial-gradient(${color}, ${color})`);
    document.documentElement.style.setProperty('--wb-bg', `radial-gradient(${color}, ${color})`);
    document.documentElement.style.setProperty('--btns-bg-color', 'rgba(0, 0, 0, 0.7)');
    document.body.style.background = `radial-gradient(${color}, ${color})`;
}

function setTheme() {
    if (themeCustom.keep) return setCustomTheme();

    selectTheme.selectedIndex = localStorageSettings.theme;
    const theme = selectTheme.value;
    switch (theme) {
        case 'dark':
            swalBackground = 'radial-gradient(#393939, #000000)';
            document.documentElement.style.setProperty('--body-bg', 'radial-gradient(#393939, #000000)');
            document.documentElement.style.setProperty('--transcription-bg', 'radial-gradient(#393939, #000000)');
            document.documentElement.style.setProperty('--msger-bg', 'radial-gradient(#393939, #000000)');
            document.documentElement.style.setProperty('--left-msg-bg', '#056162');
            document.documentElement.style.setProperty('--right-msg-bg', '#252d31');
            document.documentElement.style.setProperty('--select-bg', '#2c2c2c');
            document.documentElement.style.setProperty('--tab-btn-active', '#393939');
            document.documentElement.style.setProperty('--settings-bg', 'radial-gradient(#393939, #000000)');
            document.documentElement.style.setProperty('--wb-bg', 'radial-gradient(#393939, #000000)');
            document.documentElement.style.setProperty('--btns-bg-color', 'rgba(0, 0, 0, 0.7)');
            document.body.style.background = 'radial-gradient(#393939, #000000)';
            selectTheme.selectedIndex = 0;
            break;
        case 'grey':
            swalBackground = 'radial-gradient(#666, #333)';
            document.documentElement.style.setProperty('--body-bg', 'radial-gradient(#666, #333)');
            document.documentElement.style.setProperty('--transcription-bg', 'radial-gradient(#666, #333)');
            document.documentElement.style.setProperty('--msger-bg', 'radial-gradient(#666, #333)');
            document.documentElement.style.setProperty('--left-msg-bg', '#056162');
            document.documentElement.style.setProperty('--right-msg-bg', '#252d31');
            document.documentElement.style.setProperty('--select-bg', '#2c2c2c');
            document.documentElement.style.setProperty('--tab-btn-active', '#666');
            document.documentElement.style.setProperty('--settings-bg', 'radial-gradient(#666, #333)');
            document.documentElement.style.setProperty('--wb-bg', 'radial-gradient(#797979, #000)');
            document.documentElement.style.setProperty('--btns-bg-color', 'rgba(0, 0, 0, 0.7)');
            document.body.style.background = 'radial-gradient(#666, #333)';
            selectTheme.selectedIndex = 1;
            break;
        case 'green':
            swalBackground = 'radial-gradient(#003934, #001E1A)';
            document.documentElement.style.setProperty('--body-bg', 'radial-gradient(#003934, #001E1A)');
            document.documentElement.style.setProperty('--transcription-bg', 'radial-gradient(#003934, #001E1A)');
            document.documentElement.style.setProperty('--msger-bg', 'radial-gradient(#003934, #001E1A)');
            document.documentElement.style.setProperty('--left-msg-bg', '#001E1A');
            document.documentElement.style.setProperty('--right-msg-bg', '#003934');
            document.documentElement.style.setProperty('--select-bg', '#001E1A');
            document.documentElement.style.setProperty('--tab-btn-active', '#003934');
            document.documentElement.style.setProperty('--settings-bg', 'radial-gradient(#003934, #001E1A)');
            document.documentElement.style.setProperty('--wb-bg', 'radial-gradient(#003934, #001E1A)');
            document.documentElement.style.setProperty('--btns-bg-color', 'radial-gradient(#003934, #001E1A)');
            document.body.style.background = 'radial-gradient(#003934, #001E1A)';
            selectTheme.selectedIndex = 2;
            break;
        case 'blue':
            swalBackground = 'radial-gradient(#306bac, #141B41)';
            document.documentElement.style.setProperty('--body-bg', 'radial-gradient(#306bac, #141B41)');
            document.documentElement.style.setProperty('--transcription-bg', 'radial-gradient(#306bac, #141B41)');
            document.documentElement.style.setProperty('--msger-bg', 'radial-gradient(#306bac, #141B41)');
            document.documentElement.style.setProperty('--left-msg-bg', '#141B41');
            document.documentElement.style.setProperty('--right-msg-bg', '#306bac');
            document.documentElement.style.setProperty('--select-bg', '#141B41');
            document.documentElement.style.setProperty('--tab-btn-active', '#306bac');
            document.documentElement.style.setProperty('--settings-bg', 'radial-gradient(#306bac, #141B41)');
            document.documentElement.style.setProperty('--wb-bg', 'radial-gradient(#306bac, #141B41)');
            document.documentElement.style.setProperty('--btns-bg-color', 'radial-gradient(#141B41, #306bac)');
            document.body.style.background = 'radial-gradient(#306bac, #141B41)';
            selectTheme.selectedIndex = 3;
            break;
        case 'red':
            swalBackground = 'radial-gradient(#69140E, #3C1518)';
            document.documentElement.style.setProperty('--body-bg', 'radial-gradient(#69140E, #3C1518)');
            document.documentElement.style.setProperty('--transcription-bg', 'radial-gradient(#69140E, #3C1518)');
            document.documentElement.style.setProperty('--msger-bg', 'radial-gradient(#69140E, #3C1518)');
            document.documentElement.style.setProperty('--left-msg-bg', '#3C1518');
            document.documentElement.style.setProperty('--right-msg-bg', '#69140E');
            document.documentElement.style.setProperty('--select-bg', '#3C1518');
            document.documentElement.style.setProperty('--tab-btn-active', '#69140E');
            document.documentElement.style.setProperty('--settings-bg', 'radial-gradient(#69140E, #3C1518)');
            document.documentElement.style.setProperty('--wb-bg', 'radial-gradient(#69140E, #3C1518)');
            document.documentElement.style.setProperty('--btns-bg-color', 'radial-gradient(#69140E, #3C1518)');
            document.body.style.background = 'radial-gradient(#69140E, #3C1518)';
            selectTheme.selectedIndex = 4;
            break;
        default:
            break;
        //...
    }
    wbIsBgTransparent = false;
    if (rc) rc.isChatBgTransparent = false;
}

// ####################################################
// HANDLE ASPECT RATIO
// ####################################################

function handleAspectRatio() {
    if (participantsCount > 1) {
        adaptAspectRatio(videoMediaContainer.childElementCount);
    } else {
        resizeVideoMedia();
    }
}

function adaptAspectRatio(participantsCount: number) {
    /* 
        ['0:0', '4:3', '16:9', '1:1', '1:2'];
    */
    let desktop,
        mobile = 1;
    // desktop aspect ratio
    switch (participantsCount) {
        case 1:
        case 3:
        case 4:
        case 7:
        case 9:
            desktop = 2; // (16:9)
            break;
        case 5:
        case 6:
        case 10:
        case 11:
            desktop = 1; // (4:3)
            break;
        case 2:
        case 8:
            desktop = 3; // (1:1)
            break;
        default:
            desktop = 0; // (0:0)
    }
    // mobile aspect ratio
    switch (participantsCount) {
        case 3:
        case 9:
        case 10:
            mobile = 2; // (16:9)
            break;
        case 2:
        case 7:
        case 8:
        case 11:
            mobile = 1; // (4:3)
            break;
        case 1:
        case 4:
        case 5:
        case 6:
            mobile = 3; // (1:1)
            break;
        default:
            mobile = 3; // (1:1)
    }
    if (participantsCount > 11) {
        desktop = 1; // (4:3)
        mobile = 3; // (1:1)
    }
    BtnAspectRatio.selectedIndex = DetectRTC.isMobileDevice ? mobile : desktop;
    setAspectRatio(BtnAspectRatio.selectedIndex);
}

// ####################################################
// ABOUT
// ####################################################

function showAbout(this: any) {
    sound('open');

    Swal.fire({
        background: swalBackground,
        imageUrl: image.about,
        customClass: { image: 'img-about' },
        position: 'center',
        title: 'WebRTC SFU',
        html: `
        <br/>
        <div id="about">
            <button 
                id="support-button" 
                data-umami-event="Support button" 
                class="pulsate" 
                onclick="window.open('https://codecanyon.net/user/miroslavpejic85')">
                <i class="fas fa-heart"></i> 
                Support
            </button>
            <br /><br />
            Author: <a 
                id="linkedin-button" 
                data-umami-event="Linkedin button" 
                href="https://www.linkedin.com/in/miroslav-pejic-976a07101/" target="_blank"> 
                Miroslav Pejic
            </a>
            <br /><br />
            Email:<a 
                id="email-button" 
                data-umami-event="Email button" 
                href="mailto:miroslav.pejic.85@gmail.com?subject=MiroTalk SFU info"> 
                miroslav.pejic.85@gmail.com
            </a>
        </div>
        `,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    });






    // ####################################################
    // GET STARTED
    // ####################################################

    async function createRoom(this: any, room_id: any) {
        await this.socket
            .request('createRoom', {
                room_id,
            })
            .catch((err: any) => {
                console.log('Create room:', err);
            });
    }

    async function join(this: any, data: any) {
        this.socket
            .request('join', data)
            .then(async (room: string) => {
                console.log('##### JOIN ROOM #####', room);
                if (room === 'unauthorized') {
                    console.log(
                        '00-WARNING ----> Room is Unauthorized for current user, please provide a valid username and password',
                    );
                    return this.userUnauthorized();
                }
                if (room === 'isLocked') {
                    this.event(_EVENTS.roomLock);
                    console.log('00-WARNING ----> Room is Locked, Try to unlock by the password');
                    return this.unlockTheRoom();
                }
                if (room === 'isLobby') {
                    this.event(_EVENTS.lobbyOn);
                    console.log('00-WARNING ----> Room Lobby Enabled, Wait to confirm my join');
                    return this.waitJoinConfirm();
                }
                if (room === 'isBanned') {
                    console.log('00-WARNING ----> You are Banned from the Room!');
                    return this.isBanned();
                }
                const peers = new Map(JSON.parse(room.peers));
                if (!peer_info.peer_token) {
                    // hack...
                    for (let peer of Array.from(peers.keys()).filter((id) => id !== this.peer_id)) {
                        let peer_info = peers.get(peer).peer_info;
                        if (peer_info.peer_name == this.peer_name) {
                            console.log('00-WARNING ----> Username already in use');
                            return this.userNameAlreadyInRoom();
                        }
                    }
                }
                await this.joinAllowed(room);
            })
            .catch((error: any) => {
                console.error('Join error:', error);
            });
    }

    async function joinAllowed(this: any, room: any) {
        console.log('07 ----> Join Room allowed');
        await this.handleRoomInfo(room);
        const routerRtpCapabilities = await this.socket.request('getRouterRtpCapabilities');
        routerRtpCapabilities.headerExtensions = routerRtpCapabilities.headerExtensions.filter(
            (ext: { uri: string; }) => ext.uri !== 'urn:3gpp:video-orientation',
        );
        this.device = await this.loadDevice(routerRtpCapabilities);
        console.log('07.3 ----> Get Router Rtp Capabilities codecs: ', this.device.rtpCapabilities.codecs);
        await this.initTransports(this.device);
        // ###################################
        this.socket.emit('getProducers');
        // ###################################
        if (isBroadcastingEnabled) {
            isPresenter ? await this.startLocalMedia() : this.handleRoomBroadcasting();
        } else {
            await this.startLocalMedia();
        }
    }

    async function handleRoomInfo(this: any, room: { survey: any; redirect: any; peers: string; broadcasting: any; config: { hostOnlyRecording: any; }; recSyncServerRecording: any; moderator: { audio_start_muted: any; video_start_hidden: any; audio_cant_unmute: any; video_cant_unhide: any; screen_cant_share: any; chat_cant_privately: any; chat_cant_chatgpt: any; }; videoAIEnabled: any; }) {
        console.log('07.0 ----> Room Survey', room.survey);
        survey = room.survey;
        console.log('07.0 ----> Room Leave Redirect', room.redirect);
        redirect = room.redirect;
        let peers = new Map(JSON.parse(room.peers));
        participantsCount = peers.size;
        // ME
        for (let peer of Array.from(peers.keys()).filter((id) => id == this.peer_id)) {
            let my_peer_info = peers.get(peer).peer_info;
            console.log('07.1 ----> My Peer info', my_peer_info);
            const isPresenter = window.localStorage.isReconnected === 'true' ? isPresenter : my_peer_info.peer_presenter;
            this.peer_info.peer_presenter =  isPresenter;
            this.getId('isUserPresenter').innerText =  isPresenter;
            window.localStorage.isReconnected = false;
            handleRules(isPresenter);

            // ###################################################################################################
            isBroadcastingEnabled = isPresenter && !room.broadcasting ? isBroadcastingEnabled : room.broadcasting;
            console.log('07.1 ----> ROOM BROADCASTING', isBroadcastingEnabled);
            // ###################################################################################################

            if (BUTTONS.settings.tabRecording) {
                room.config.hostOnlyRecording
                    ? (console.log('07.1 ----> WARNING Room Host only recording enabled'),
                      this.event(_EVENTS.hostOnlyRecordingOn))
                    : this.event(_EVENTS.hostOnlyRecordingOff);
            }

            // ###################################################################################################
            if (room.recSyncServerRecording) {
                console.log('07.1 WARNING ----> SERVER SYNC RECORDING ENABLED!');
                this.recSyncServerRecording = localStorageSettings.rec_server;
                if (BUTTONS.settings.tabRecording && !room.config.hostOnlyRecording) {
                    show(roomRecordingServer);
                }
                switchServerRecording.checked = this.recSyncServerRecording;
            }
            console.log('07.1 ----> SERVER SYNC RECORDING', this.recSyncServerRecording);
            // ###################################################################################################

            // Handle Room moderator rules
            if (room.moderator && (!isRulesActive || !isPresenter)) {
                console.log('07.2 ----> ROOM MODERATOR', room.moderator);
                const {
                    audio_start_muted,
                    video_start_hidden,
                    audio_cant_unmute,
                    video_cant_unhide,
                    screen_cant_share,
                    chat_cant_privately,
                    chat_cant_chatgpt,
                } = room.moderator;

                this._moderator.audio_start_muted = audio_start_muted;
                this._moderator.video_start_hidden = video_start_hidden;
                this._moderator.audio_cant_unmute = audio_cant_unmute;
                this._moderator.video_cant_unhide = video_cant_unhide;
                this._moderator.screen_cant_share = screen_cant_share;
                this._moderator.chat_cant_privately = chat_cant_privately;
                this._moderator.chat_cant_chatgpt = chat_cant_chatgpt;
                //
                if (this._moderator.audio_start_muted && this._moderator.video_start_hidden) {
                    this.userLog('warning', 'The Moderator disabled your audio and video', 'top-end');
                } else {
                    if (this._moderator.audio_start_muted && !this._moderator.video_start_hidden) {
                        this.userLog('warning', 'The Moderator disabled your audio', 'top-end');
                    }
                    if (!this._moderator.audio_start_muted && this._moderator.video_start_hidden) {
                        this.userLog('warning', 'The Moderator disabled your video', 'top-end');
                    }
                }
                //
                this._moderator.audio_cant_unmute ? hide(tabAudioDevicesBtn) : show(tabAudioDevicesBtn);
                this._moderator.video_cant_unhide ? hide(tabVideoDevicesBtn) : show(tabVideoDevicesBtn);
            }
            // Check if VideoAI is enabled
            if (!room.videoAIEnabled) {
                VideoAI.enabled = false;
                elemDisplay('tabVideoAIBtn', false);
            }
        }

        // PARTICIPANTS
        for (let peer of Array.from(peers.keys()).filter((id) => id !== this.peer_id)) {
            let peer_info = peers.get(peer).peer_info;
            // console.log('07.1 ----> Remote Peer info', peer_info);
            const canSetVideoOff = !isBroadcastingEnabled || (isBroadcastingEnabled && peer_info.peer_presenter);

            if (!peer_info.peer_video && canSetVideoOff) {
                console.log('Detected peer video off ' + peer_info.peer_name);
                this.setVideoOff(peer_info, true);
            }

            if (peer_info.peer_recording) {
                this.handleRecordingAction({
                    peer_id: peer_info.id,
                    peer_name: peer_info.peer_name,
                    action: enums.recording.started,
                });
            }
        }

        this.refreshParticipantsCount();

        console.log('07.2 Participants Count ---->', participantsCount);

        // notify && participantsCount == 1 ? shareRoom() : sound('joined');
        if (notify && participantsCount == 1) {
            shareRoom();
        } else {
            if (this.isScreenAllowed) {
                this.shareScreen();
            }
            sound('joined');
        }
    }

    async  function loadDevice(this: any, routerRtpCapabilities: any) {
        let device;
        try {
            device = new this.mediasoupClient.Device();
        } catch (error) {
            if (error.name === 'UnsupportedError') {
                console.error('Browser not supported');
                this.userLog('error', 'Browser not supported', 'center', 6000);
            } else {
                console.error('Browser not supported: ', error);
                this.userLog('error', 'Browser not supported: ' + error, 'center', 6000);
            }
        }
        await device.load({
            routerRtpCapabilities,
        });
        return device;
    }

    // ####################################################
    // TRANSPORTS
    // ####################################################

    async function initTransports(device: { rtpCapabilities: any; createSendTransport: (arg0: any) => any; createRecvTransport: (arg0: any) => any; }) {
        // ####################################################
        // PRODUCER TRANSPORT
        // ####################################################

        const producerTransportData = await this.socket.request('createWebRtcTransport', {
            forceTcp: false,
            rtpCapabilities: device.rtpCapabilities,
        });

        if (producerTransportData.error) {
            console.error(producerTransportData.error);
            return;
        }

        this.producerTransport = device.createSendTransport(producerTransportData);

        console.info('07.4 producerTransportData ---->', {
            producerTransportId: this.producerTransport.id,
            producerTransportData: producerTransportData,
        });

        this.producerTransport.on('connect', async ({ dtlsParameters }: any, callback: () => void, errback: (arg0: unknown) => void) => {
            try {
                await this.socket.request('connectTransport', {
                    transport_id: this.producerTransport.id,
                    dtlsParameters,
                });
                callback();
            } catch (err) {
                errback(err);
            }
        });

        this.producerTransport.on('produce', async ({ kind, appData, rtpParameters }: any, callback: (arg0: { id: any; }) => void, errback: (arg0: unknown) => void) => {
            console.log('Going to produce', { kind, appData, rtpParameters });
            try {
                const { producer_id } = await this.socket.request('produce', {
                    producerTransportId: this.producerTransport.id,
                    kind,
                    appData,
                    rtpParameters,
                });
                callback({
                    id: producer_id,
                });
            } catch (err) {
                errback(err);
            }
        });

        this.producerTransport.on('connectionstatechange', (state: any) => {
            switch (state) {
                case 'connecting':
                    console.log('Producer Transport connecting...');
                    break;
                case 'connected':
                    console.log('Producer Transport connected', { id: this.producerTransport.id });
                    break;
                case 'disconnected':
                    console.log('Producer Transport disconnected', { id: this.producerTransport.id });
                    /*
                    this.restartIce();

                    popupHtmlMessage(
                        null,
                        image.network,
                        'Producer Transport disconnected',
                        'Check Your Network Connectivity (Restarted ICE)',
                        'center',
                    );
                    */
                    break;
                case 'failed':
                    console.warn('Producer Transport failed', { id: this.producerTransport.id });

                    this.producerTransport.close();

                    popupHtmlMessage(
                        null,
                        image.network,
                        'Producer Transport failed',
                        'Check Your Network Connectivity',
                        'center',
                    );
                    break;
                default:
                    console.log('Producer transport connection state changes', {
                        state: state,
                        id: this.producerTransport.id,
                    });
                    break;
            }
        });

        this.producerTransport.on('icegatheringstatechange', (state: any) => {
            console.log('Producer icegatheringstatechange', {
                state: state,
                id: this.producerTransport.id,
            });
        });

        // ####################################################
        // CONSUMER TRANSPORT
        // ####################################################

        const consumerTransportData = await this.socket.request('createWebRtcTransport', {
            forceTcp: false,
        });

        if (consumerTransportData.error) {
            console.error(consumerTransportData.error);
            return;
        }

        this.consumerTransport = device.createRecvTransport(consumerTransportData);

        console.info('07.5 consumerTransportData ---->', {
            consumerTransportId: this.consumerTransport.id,
            consumerTransportData: consumerTransportData,
        });

        this.consumerTransport.on('connect', async ({ dtlsParameters }: any, callback: () => void, errback: (arg0: unknown) => void) => {
            try {
                await this.socket.request('connectTransport', {
                    transport_id: this.consumerTransport.id,
                    dtlsParameters,
                });
                callback();
            } catch (err) {
                errback(err);
            }
        });

        this.consumerTransport.on('connectionstatechange', (state: any) => {
            switch (state) {
                case 'connecting':
                    console.log('Consumer Transport connecting...');
                    break;
                case 'connected':
                    console.log('Consumer Transport connected', { id: this.consumerTransport.id });
                    break;
                case 'disconnected':
                    console.log('Consumer Transport disconnected', { id: this.consumerTransport.id });
                /*
                    this.restartIce();

                    popupHtmlMessage(
                        null,
                        image.network,
                        'Consumer Transport disconnected',
                        'Check Your Network Connectivity (Restarted ICE)',
                        'center',
                    );
                    */
                case 'failed':
                    console.warn('Consumer Transport failed', { id: this.consumerTransport.id });

                    this.consumerTransport.close();

                    popupHtmlMessage(
                        null,
                        image.network,
                        'Consumer Transport failed',
                        'Check Your Network Connectivity',
                        'center',
                    );
                    break;
                default:
                    console.log('Consumer transport connection state changes', {
                        state: state,
                        id: this.consumerTransport.id,
                    });
                    break;
            }
        });

        this.consumerTransport.on('icegatheringstatechange', (state: any) => {
            console.log('Consumer icegatheringstatechange', {
                state: state,
                id: this.consumerTransport.id,
            });
        });

        // ####################################################
        // TODO: DATA TRANSPORT
        // ####################################################

        //
    }

    // ####################################################
    // RESTART ICE
    // ####################################################

  

    // ####################################################
    // SOCKET ON
    // ####################################################

   function initSockets(this: any) {
        this.socket.on('consumerClosed', this.handleConsumerClosed);
        this.socket.on('setVideoOff', this.handleSetVideoOff);
        this.socket.on('removeMe', this.handleRemoveMe);
        this.socket.on('refreshParticipantsCount', this.handleRefreshParticipantsCount);
        this.socket.on('newProducers', this.handleNewProducers);
        this.socket.on('message', this.handleMessage);
        this.socket.on('roomAction', this.handleRoomAction);
        this.socket.on('roomPassword', this.handleRoomPassword);
        this.socket.on('roomLobby', this.handleRoomLobby);
        this.socket.on('cmd', this.handleCmdData);
        this.socket.on('peerAction', this.handlePeerAction);
        this.socket.on('updatePeerInfo', this.handleUpdatePeerInfo);
        this.socket.on('fileInfo', this.handleFileInfoData);
        this.socket.on('file', this.handleFileData);
        this.socket.on('shareVideoAction', this.handleShareVideoAction);
        this.socket.on('fileAbort', this.handleFileAbortData);
        this.socket.on('wbCanvasToJson', this.handleWbCanvasToJson);
        this.socket.on('whiteboardAction', this.handleWhiteboardAction);
        this.socket.on('audioVolume', this.handleAudioVolumeData);
        this.socket.on('dominantSpeaker', this.handleDominantSpeakerData);
        this.socket.on('updateRoomModerator', this.handleUpdateRoomModeratorData);
        this.socket.on('updateRoomModeratorALL', this.handleUpdateRoomModeratorALLData);
        this.socket.on('recordingAction', this.handleRecordingActionData);
        this.socket.on('connect', this.handleSocketConnect);
        this.socket.on('disconnect', this.handleSocketDisconnect);
    }

    // ####################################################
    // HANDLE SOCKET DATA
    // ####################################################

    handleConsumerClosed = ({ consumer_id, consumer_kind }) => {
        console.log('SocketOn Closing consumer', { consumer_id, consumer_kind });
        this.removeConsumer(consumer_id, consumer_kind);
    };

    handleSetVideoOff = (data: { peer_presenter: any; peer_name: any; }) => {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && data.peer_presenter)) {
            console.log('SocketOn setVideoOff', {
                peer_name: data.peer_name,
                peer_presenter: data.peer_presenter,
            });
            this.setVideoOff(data, true);
        }
    };

    handleRemoveMe = (data: { peer_id: any; peer_counts: any; isPresenter: any; peer_name: any; }) => {
        console.log('SocketOn Remove me:', data);
        this.removeVideoOff(data.peer_id);
        this.lobbyRemoveMe(data.peer_id);
        participantsCount = data.peer_counts;
        if (!isBroadcastingEnabled) adaptAspectRatio(participantsCount);
        if (isParticipantsListOpen) getRoomParticipants();
        if (isBroadcastingEnabled && data.isPresenter) {
            this.userLog('info', `${icons.broadcaster} ${data.peer_name} disconnected`, 'top-end', 6000);
        }
    };

    handleRefreshParticipantsCount = (data: { peer_counts: any; }) => {
        console.log('SocketOn Participants Count:', data);
        participantsCount = data.peer_counts;
        if (isBroadcastingEnabled) {
            if (isParticipantsListOpen) getRoomParticipants();
            wbUpdate();
        } else {
            adaptAspectRatio(participantsCount);
        }
    };

    handleNewProducers = async (data: string | any[]) => {
        if (data.length > 0) {
            console.log('SocketOn New producers', data);
            for (let { producer_id, peer_name, peer_info, type } of data) {
                await this.consume(producer_id, peer_name, peer_info, type);
            }
        }
    };

    handleMessage = (data: any) => {
        console.log('SocketOn New message:', data);
        this.showMessage(data);
    };

    handleRoomAction = (data: any) => {
        console.log('SocketOn Room action:', data);
        this.roomAction(data, false);
    };

    handleRoomPassword = (data: { password: any; }) => {
        console.log('SocketOn Room password:', data.password);
        this.roomPassword(data);
    };

    handleRoomLobby = (data: any) => {
        console.log('SocketOn Room lobby:', data);
        this.roomLobby(data);
    };

    handleCmdData = (data: any) => {
        console.log('SocketOn Peer cmd:', data);
        this.handleCmd(data);
    };

    handlePeerAction = (data: { from_peer_name: any; peer_id: any; action: any; broadcast: any; message: any; }) => {
        console.log('SocketOn Peer action:', data);
        this.peerAction(data.from_peer_name, data.peer_id, data.action, false, data.broadcast, true, data.message);
    };

    handleUpdatePeerInfo = (data: { peer_name: any; peer_id: any; type: any; status: any; peer_presenter: any; }) => {
        console.log('SocketOn Peer info update:', data);
        this.updatePeerInfo(data.peer_name, data.peer_id, data.type, data.status, false, data.peer_presenter);
    };

    handleFileInfoData = (data: any) => {
        console.log('SocketOn File info:', data);
        this.handleFileInfo(data);
    };

    handleFileData = (data: any) => {
        this.handleFile(data);
    };

    handleShareVideoAction = (data: any) => {
        this.shareVideoAction(data);
    };

    handleFileAbortData = (data: any) => {
        this.handleFileAbort(data);
    };

    handleWbCanvasToJson = (data: any) => {
        console.log('SocketOn Received whiteboard canvas JSON');
        JsonToWbCanvas(data);
    };

    handleWhiteboardAction = (data: any) => {
        console.log('Whiteboard action', data);
        whiteboardAction(data, false);
    };

    function  handleAudioVolumeData (this: any, data: any){
        this.handleAudioVolume(data);
    };

    function  handleDominantSpeakerData (this: any, data: any) {
        this.handleDominantSpeaker(data);
    };

    function   handleUpdateRoomModeratorData(this: any, data: any):void {
        console.log('SocketOn Update room moderator', data);
        this.handleUpdateRoomModerator(data);
    };

    function   handleUpdateRoomModeratorALLData = (data: any) => {
        console.log('SocketOn Update room moderator ALL', data);
        this.handleUpdateRoomModeratorALL(data);
    };

    function  handleRecordingActionData = (data: any) => {
        console.log('SocketOn Recording action:', data);
        this.handleRecordingAction(data);
    };

    function  handleSocketConnect = () => {
        console.log('SocketOn Connected to signaling server!');
        this._isConnected = true;
        this.refreshBrowser();
    };

    function  handleSocketDisconnect = () => {
        this.exit(true);
        this.ServerAway();
        this.saveRecording('Socket disconnected');
    };

    // ####################################################
    // SERVER AWAY/MAINTENANCE
    // ####################################################

    function  ServerAway(this: any) {
        this.sound('alert');
        window.localStorage.isReconnected = true;
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: true,
            showConfirmButton: false,
            background: swalBackground,
            imageUrl: image.poster,
            title: 'Server away',
            text: 'The server seems away or in maintenance, please wait until it come back up.',
            denyButtonText: `Leave room`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; }) => {
            if (!result.isConfirmed) {
                this.event(_EVENTS.exitRoom);
            }
        });
    }

    function  refreshBrowser(this: any) {
        this.exit(true);
        getPeerName() ? location.reload() : openURL(this.getReconnectDirectJoinURL());
    }

    function   getReconnectDirectJoinURL(this: any) {
        const { peer_audio, peer_video, peer_screen, peer_token } = this.peer_info;
        const baseUrl = `${window.location.origin}/join`;
        const queryParams = {
            room: this.room_id,
            roomPassword: this.RoomPassword,
            name: this.peer_name,
            audio: peer_audio,
            video: peer_video,
            screen: peer_screen,
            notify: 0,
            isPresenter: isPresenter,
        };
        if (peer_token) queryParams.token = peer_token;
        const url = `${baseUrl}?${Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`;
        return url;
    }

    // ####################################################
    // CHECK USER
    // ####################################################

    function  userNameAlreadyInRoom(this: any) {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.user,
            position: 'center',
            title: 'Username',
            html: `The Username is already in use. <br/> Please try with another one`,
            showDenyButton: false,
            confirmButtonText: `OK`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                openURL((window.location.href = '/join/' + this.room_id));
            }
        });
    }

    // ####################################################
    // HANDLE ROOM BROADCASTING
    // ####################################################

    function   handleRoomBroadcasting(this: any) {
        console.log('07.4 ----> Room Broadcasting is currently active, and you are not the designated presenter');

        this.peer_info.peer_audio = false;
        this.peer_info.peer_video = false;
        this.peer_info.peer_screen = false;

        const mediaTypes = ['audio', 'video', 'screen'];

        mediaTypes.forEach((type) => {
            const data = {
                room_id: this.room_id,
                peer_name: this.peer_name,
                peer_id: this.peer_id,
                peer_presenter: isPresenter,
                type: type,
                status: false,
                broadcast: true,
            };
            this.socket.emit('updatePeerInfo', data);
        });

        handleRulesBroadcasting();
    }

    function   toggleRoomBroadcasting() {
        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.broadcasting,
            title: 'Room broadcasting Enabled',
            text: 'Would you like to continue the room broadcast?',
            showDenyButton: true,
            confirmButtonColor: '#18392B',
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isDenied: any; }) => {
            if (result.isDenied) {
                switchBroadcasting.click();
            }
        });
    }

    // ####################################################
    // START LOCAL AUDIO VIDEO MEDIA
    // ####################################################

    async  function startLocalMedia(this: any) {
        console.log('08 ----> START LOCAL MEDIA...');
        const audioProducerExist = this.producerExist(mediaType.audio);
        if (this.isAudioAllowed) {
            if (!audioProducerExist) {
                await this.produce(mediaType.audio, microphoneSelect.value);
                console.log('09 ----> START AUDIO MEDIA');
            }
            if (this._moderator.audio_start_muted) {
                await this.pauseAudioProducer();
            }
        } else {
            if (isEnumerateAudioDevices && !audioProducerExist) {
                await this.produce(mediaType.audio, microphoneSelect.value);
                console.log('09 ----> START AUDIO MEDIA');
                await this.pauseAudioProducer();
            }
        }

        if (this.isVideoAllowed && !this._moderator.video_start_hidden) {
            await this.produce(mediaType.video, videoSelect.value);
            console.log('10 ----> START VIDEO MEDIA');
        } else {
            setColor(startVideoButton, 'red');
            this.setVideoOff(this.peer_info, false);
            this.sendVideoOff();
            if (BUTTONS.main.startVideoButton) this.event(_EVENTS.stopVideo);
            this.updatePeerInfo(this.peer_name, this.peer_id, 'video', false);
            console.log('10 ----> VIDEO IS OFF');
        }

        if (this.joinRoomWithScreen && !this._moderator.screen_cant_share) {
            await this.produce(mediaType.screen, null, false, true);
            console.log('11 ----> START SCREEN MEDIA');
        }
        // if (this.isScreenAllowed) {
        //     this.shareScreen();
        // }
        console.log('[startLocalMedia] - PRODUCER LABEL', this.producerLabel);
    }

    async function pauseAudioProducer(this: any) {
        setColor(startAudioButton, 'red');
        this.setIsAudio(this.peer_id, false);
        if (BUTTONS.main.startAudioButton) this.event(_EVENTS.stopAudio);
        await this.pauseProducer(mediaType.audio);
        console.log('09 ----> PAUSE AUDIO MEDIA');
        this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', false);
    }

    // ####################################################
    // PRODUCER
    // ####################################################

    async function produce(this: any, type: string, deviceId = null, swapCamera = false, init = false) {
        let mediaConstraints = {};
        let audio = false;
        let screen = false;
        switch (type) {
            case mediaType.audio:
                this.isAudioAllowed = true;
                mediaConstraints = this.getAudioConstraints(deviceId);
                audio = true;
                break;
            case mediaType.video:
                this.isVideoAllowed = true;
                swapCamera
                    ? (mediaConstraints = this.getCameraConstraints())
                    : (mediaConstraints = this.getVideoConstraints(deviceId));
                break;
            case mediaType.screen:
                mediaConstraints = this.getScreenConstraints();
                screen = true;
                break;
            default:
                return;
        }
        if (!this.device.canProduce('video') && !audio) {
            return console.error('Cannot produce video');
        }
        if (this.producerLabel.has(type)) {
            return console.warn('Producer already exists for this type ' + type);
        }

        const videoPrivacyBtn = this.getId(this.peer_id + '__vp');
        if (videoPrivacyBtn) videoPrivacyBtn.style.display = screen ? 'none' : 'inline';

        console.log(`Media constraints ${type}:`, mediaConstraints);

        let stream;
        try {
            if (init) {
                stream =             } else {
                stream = screen
                    ? await navigator.mediaDevices.getDisplayMedia(mediaConstraints)
                    : await navigator.mediaDevices.getUserMedia(mediaConstraints);
            }

            console.log('Supported Constraints', navigator.mediaDevices.getSupportedConstraints());

            const track = audio ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];

            console.log(`${type} settings ->`, track.getSettings());

            const params = {
                track,
                appData: {
                    mediaType: type,
                },
            };

            if (audio) {
                console.log('AUDIO ENABLE OPUS');
                params.codecOptions = {
                    opusStereo: true,
                    opusDtx: true,
                    opusFec: true,
                    opusNack: true,
                };
            }

            if (!audio && !screen) {
                const { encodings, codec } = this.getWebCamEncoding();
                console.log('GET WEBCAM ENCODING', {
                    encodings: encodings,
                    codecs: codec,
                });
                params.encodings = encodings;
                params.codecs = codec;
                params.codecOptions = {
                    videoGoogleStartBitrate: 1000,
                };
            }

            if (!audio && screen) {
                const { encodings, codec } = this.getScreenEncoding();
                console.log('GET SCREEN ENCODING', {
                    encodings: encodings,
                    codecs: codec,
                });
                params.encodings = encodings;
                params.codecs = codec;
                params.codecOptions = {
                    videoGoogleStartBitrate: 1000,
                };
            }

            console.log('PRODUCER TYPE AND PARAMS', {
                type: type,
                params: params,
            });

            const producer = await this.producerTransport.produce(params);

            if (!producer) {
                throw new Error('Producer not found!');
            }

            this.producers.set(producer.id, producer);
            this.producerLabel.set(type, producer.id);

            // if screen sharing produce the tab audio + microphone
            if (screen && stream.getAudioTracks()[0]) {
                this.produceScreenAudio(stream);
            }

            const elem: { srcObject: { getTracks: () => any[]; }; parentNode: { removeChild: (arg0: any) => void; }; }, au: { srcObject: { getTracks: () => any[]; }; parentNode: { removeChild: (arg0: any) => void; }; };
            if (!audio) {
                this.localVideoStream = stream;
                if (type == mediaType.video) this.videoProducerId = producer.id;
                if (type == mediaType.screen) this.screenProducerId = producer.id;
                elem = await this.handleProducer(producer.id, type, stream);
                //if (!screen && !isEnumerateDevices) enumerateVideoDevices(stream);
            } else {
                this.localAudioStream = stream;
                this.audioProducerId = producer.id;
                au = await this.handleProducer(producer.id, type, stream);
                //if (!isEnumerateDevices) enumerateAudioDevices(stream);
                getMicrophoneVolumeIndicator(stream);
            }

            if (type == mediaType.video) {
                this.handleHideMe();
            }

            producer.on('trackended', () => {
                console.log('Producer track ended', { id: producer.id });
                this.closeProducer(type);
            });

            producer.on('transportclose', () => {
                console.log('Producer transport close', { id: producer.id });
                if (!audio) {
                    const d = this.getId(producer.id + '__video');
                    elem.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                        track.stop();
                    });
                    elem.parentNode.removeChild(elem);
                    d.parentNode.removeChild(d);

                    handleAspectRatio();
                    console.log('[transportClose] Video-element-count', this.videoMediaContainer.childElementCount);
                } else {
                    au.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                        track.stop();
                    });
                    au.parentNode.removeChild(au);
                    console.log('[transportClose] audio-element-count', this.localAudioEl.childElementCount);
                }
                this.closeProducer(type);
            });

            producer.on('close', () => {
                console.log('Closing producer', { id: producer.id });
                if (!audio) {
                    const d = this.getId(producer.id + '__video');
                    elem.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                        track.stop();
                    });
                    elem.parentNode.removeChild(elem);
                    d.parentNode.removeChild(d);

                    handleAspectRatio();
                    console.log('[closingProducer] Video-element-count', this.videoMediaContainer.childElementCount);
                } else {
                    au.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                        track.stop();
                    });
                    au.parentNode.removeChild(au);
                    console.log('[closingProducer] audio-element-count', this.localAudioEl.childElementCount);
                }
                this.closeProducer(type);
            });

            switch (type) {
                case mediaType.audio:
                    this.setIsAudio(this.peer_id, true);
                    this.event(_EVENTS.startAudio);
                    break;
                case mediaType.video:
                    this.setIsVideo(true);
                    this.event(_EVENTS.startVideo);
                    break;
                case mediaType.screen:
                    this.setIsScreen(true);
                    this.event(_EVENTS.startScreen);
                    break;
                default:
                    break;
            }

            this.sound('joined');
            return producer;
        } catch (err) {
            console.error('Produce error:', err);

            handleMediaError(type, err);

            if (!audio && !screen && videoQuality.selectedIndex != 0) {
                videoQuality.selectedIndex = this.videoQualitySelectedIndex;
                this.sound('alert');
                this.userLog(
                    'error',
                    `Your device doesn't support the selected video quality (${videoQuality.value}), please select the another one.`,
                    'top-end',
                );
            }
        }
    }

    // ####################################################
    // AUDIO/VIDEO CONSTRAINTS
    // ####################################################

    function   getAudioConstraints(deviceId: any) {
        let constraints = {
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                deviceId: deviceId,
            },
            video: false,
        };
        if (isRulesActive && isPresenter) {
            constraints = {
                audio: {
                    autoGainControl: switchAutoGainControl.checked,
                    echoCancellation: switchNoiseSuppression.checked,
                    noiseSuppression: switchEchoCancellation.checked,
                    sampleRate: parseInt(sampleRateSelect.value),
                    sampleSize: parseInt(sampleSizeSelect.value),
                    channelCount: parseInt(channelCountSelect.value),
                    latency: parseInt(micLatencyRange.value),
                    volume: parseInt(micVolumeRange.value / 100),
                    deviceId: deviceId,
                },
                video: false,
            };
        }
        return constraints;
    }

    function   getCameraConstraints(this: any) {
        this.camera = this.camera == 'user' ? 'environment' : 'user';
        if (this.camera != 'user') this.camVideo = { facingMode: { exact: this.camera } };
        else this.camVideo = true;
        return {
            audio: false,
            video: this.camVideo,
        };
    }

    function   getVideoConstraints(this: any, deviceId: any) {
        const defaultFrameRate = {
            min: 5,
            ideal: 15,
            max: 30,
        };
        const selectedValue = this.getSelectedIndexValue(videoFps);
        const customFrameRate = parseInt(selectedValue, 10);
        const frameRate = selectedValue == 'max' ? defaultFrameRate : customFrameRate;
        let videoConstraints = {
            audio: false,
            video: {
                width: {
                    min: 640,
                    ideal: 1920,
                    max: 3840,
                },
                height: {
                    min: 480,
                    ideal: 1080,
                    max: 2160,
                },
                deviceId: deviceId,
                aspectRatio: 1.777, // 16:9
                frameRate: frameRate,
            },
        }; // Init auto detect max cam resolution and fps

        videoFps.disabled = false;

        switch (videoQuality.value) {
            case 'default':
                // This will make the browser use HD Video and 30fps as default.
                videoConstraints = {
                    audio: false,
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        deviceId: deviceId,
                        aspectRatio: 1.777,
                    },
                };
                videoFps.selectedIndex = 0;
                videoFps.disabled = true;
                break;
            case 'qvga':
                videoConstraints = {
                    audio: false,
                    video: {
                        width: { exact: 320 },
                        height: { exact: 240 },
                        deviceId: deviceId,
                        aspectRatio: 1.777,
                        frameRate: frameRate,
                    },
                }; // video cam constraints low bandwidth
                break;
            case 'vga':
                videoConstraints = {
                    audio: false,
                    video: {
                        width: { exact: 640 },
                        height: { exact: 480 },
                        deviceId: deviceId,
                        aspectRatio: 1.777,
                        frameRate: frameRate,
                    },
                }; // video cam constraints medium bandwidth
                break;
            case 'hd':
                videoConstraints = {
                    audio: false,
                    video: {
                        width: { exact: 1280 },
                        height: { exact: 720 },
                        deviceId: deviceId,
                        aspectRatio: 1.777,
                        frameRate: frameRate,
                    },
                }; // video cam constraints high bandwidth
                break;
            case 'fhd':
                videoConstraints = {
                    audio: false,
                    video: {
                        width: { exact: 1920 },
                        height: { exact: 1080 },
                        deviceId: deviceId,
                        aspectRatio: 1.777,
                        frameRate: frameRate,
                    },
                }; // video cam constraints very high bandwidth
                break;
            case '2k':
                videoConstraints = {
                    audio: false,
                    video: {
                        width: { exact: 2560 },
                        height: { exact: 1440 },
                        deviceId: deviceId,
                        aspectRatio: 1.777,
                        frameRate: frameRate,
                    },
                }; // video cam constraints ultra high bandwidth
                break;
            case '4k':
                videoConstraints = {
                    audio: false,
                    video: {
                        width: { exact: 3840 },
                        height: { exact: 2160 },
                        deviceId: deviceId,
                        aspectRatio: 1.777,
                        frameRate: frameRate,
                    },
                }; // video cam constraints ultra high bandwidth
                break;
            default:
                break;
        }
        this.videoQualitySelectedIndex = videoQuality.selectedIndex;
        return videoConstraints;
    }

    function   getScreenConstraints(this: any) {
        const selectedValue = this.getSelectedIndexValue(screenFps);
        const frameRate = selectedValue == 'max' ? 30 : parseInt(selectedValue, 10);
        return {
            audio: true,
            video: {
                width: { max: 1920 },
                height: { max: 1080 },
                frameRate: frameRate,
            },
        };
    }

    // ####################################################
    // WEBCAM ENCODING
    // ####################################################

    function   getWebCamEncoding(this: any) {
        let encodings;
        let codec;

        console.log('WEBCAM ENCODING', {
            forceVP8: this.forceVP8,
            forceVP9: this.forceVP9,
            forceH264: this.forceH264,
            numSimulcastStreamsWebcam: this.numSimulcastStreamsWebcam,
            enableWebcamLayers: this.enableWebcamLayers,
            webcamScalabilityMode: this.webcamScalabilityMode,
        });

        if (this.forceVP8) {
            codec = this.device.rtpCapabilities.codecs.find((c: { mimeType: string; }) => c.mimeType.toLowerCase() === 'video/vp8');
            if (!codec) throw new Error('Desired VP8 codec+configuration is not supported');
        } else if (this.forceH264) {
            codec = this.device.rtpCapabilities.codecs.find((c: { mimeType: string; }) => c.mimeType.toLowerCase() === 'video/h264');
            if (!codec) throw new Error('Desired H264 codec+configuration is not supported');
        } else if (this.forceVP9) {
            codec = this.device.rtpCapabilities.codecs.find((c: { mimeType: string; }) => c.mimeType.toLowerCase() === 'video/vp9');
            if (!codec) throw new Error('Desired VP9 codec+configuration is not supported');
        }

        if (this.enableWebcamLayers) {
            console.log('WEBCAM SIMULCAST/SVC ENABLED');

            const firstVideoCodec = this.device.rtpCapabilities.codecs.find((c: { kind: string; }) => c.kind === 'video');
            console.log('WEBCAM ENCODING: first codec available', { firstVideoCodec: firstVideoCodec });

            // If VP9 is the only available video codec then use SVC.
            if ((this.forceVP9 && codec) || firstVideoCodec.mimeType.toLowerCase() === 'video/vp9') {
                console.log('WEBCAM ENCODING: VP9 with SVC');
                encodings = [
                    {
                        maxBitrate: 5000000,
                        scalabilityMode: this.webcamScalabilityMode || 'L3T3_KEY',
                    },
                ];
            } else {
                console.log('WEBCAM ENCODING: VP8 or H264 with simulcast');
                encodings = [
                    {
                        scaleResolutionDownBy: 1,
                        maxBitrate: 5000000,
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    },
                ];
                if (this.numSimulcastStreamsWebcam > 1) {
                    encodings.unshift({
                        scaleResolutionDownBy: 2,
                        maxBitrate: 1000000,
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    });
                }
                if (this.numSimulcastStreamsWebcam > 2) {
                    encodings.unshift({
                        scaleResolutionDownBy: 4,
                        maxBitrate: 500000,
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    });
                }
            }
        }
        return { encodings, codec };
    }

    // ####################################################
    // SCREEN ENCODING
    // ####################################################

    function   getScreenEncoding(this: any) {
        let encodings;
        let codec;

        console.log('SCREEN ENCODING', {
            forceVP8: this.forceVP8,
            forceVP9: this.forceVP9,
            forceH264: this.forceH264,
            numSimulcastStreamsSharing: this.numSimulcastStreamsSharing,
            enableSharingLayers: this.enableSharingLayers,
            sharingScalabilityMode: this.sharingScalabilityMode,
        });

        if (this.forceVP8) {
            codec = this.device.rtpCapabilities.codecs.find((c: { mimeType: string; }) => c.mimeType.toLowerCase() === 'video/vp8');
            if (!codec) throw new Error('Desired VP8 codec+configuration is not supported');
        } else if (this.forceH264) {
            codec = this.device.rtpCapabilities.codecs.find((c: { mimeType: string; }) => c.mimeType.toLowerCase() === 'video/h264');
            if (!codec) throw new Error('Desired H264 codec+configuration is not supported');
        } else if (this.forceVP9) {
            codec = this.device.rtpCapabilities.codecs.find((c: { mimeType: string; }) => c.mimeType.toLowerCase() === 'video/vp9');
            if (!codec) throw new Error('Desired VP9 codec+configuration is not supported');
        }

        if (this.enableSharingLayers) {
            console.log('SCREEN SIMULCAST/SVC ENABLED');

            const firstVideoCodec = this.device.rtpCapabilities.codecs.find((c: { kind: string; }) => c.kind === 'video');
            console.log('SCREEN ENCODING: first codec available', { firstVideoCodec: firstVideoCodec });

            // If VP9 is the only available video codec then use SVC.
            if ((this.forceVP9 && codec) || firstVideoCodec.mimeType.toLowerCase() === 'video/vp9') {
                console.log('SCREEN ENCODING: VP9 with SVC');
                encodings = [
                    {
                        maxBitrate: 5000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L3T3',
                        dtx: true,
                    },
                ];
            } else {
                console.log('SCREEN ENCODING: VP8 or H264 with simulcast.');
                encodings = [
                    {
                        scaleResolutionDownBy: 1,
                        maxBitrate: 5000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    },
                ];
                if (this.numSimulcastStreamsSharing > 1) {
                    encodings.unshift({
                        scaleResolutionDownBy: 2,
                        maxBitrate: 1000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    });
                }
                if (this.numSimulcastStreamsSharing > 2) {
                    encodings.unshift({
                        scaleResolutionDownBy: 4,
                        maxBitrate: 500000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    });
                }
            }
        }
        return { encodings, codec };
    }

    // ####################################################
    // PRODUCER
    // ####################################################

    function   handleHideMe(this: any) {
        //const myScreenWrap = this.getId(this.screenProducerId + '__video');
        const myVideoWrap = this.getId(this.videoProducerId + '__video');
        const myVideoWrapOff = this.getId(this.peer_id + '__videoOff');
        const myVideoPinBtn = this.getId(this.videoProducerId + '__pin');
        const myScreenPinBtn = this.getId(this.screenProducerId + '__pin');
        console.log('handleHideMe', {
            isHideMeActive: isHideMeActive,
            //myScreenWrap: myScreenWrap ? myScreenWrap.id : null,
            myVideoWrap: myVideoWrap ? myVideoWrap.id : null,
            myVideoWrapOff: myVideoWrapOff ? myVideoWrapOff.id : null,
            myVideoPinBtn: myVideoPinBtn ? myVideoPinBtn.id : null,
            myScreenPinBtn: myScreenPinBtn ? myScreenPinBtn.id : null,
        });
        //if (myScreenWrap) myScreenWrap.style.display = isHideMeActive ? 'none' : 'block';
        if (isHideMeActive && this.isVideoPinned && myVideoPinBtn) myVideoPinBtn.click();
        if (isHideMeActive && this.isVideoPinned && myScreenPinBtn) myScreenPinBtn.click();
        if (myVideoWrap) myVideoWrap.style.display = isHideMeActive ? 'none' : 'block';
        if (myVideoWrapOff) myVideoWrapOff.style.display = isHideMeActive ? 'none' : 'block';
        hideMeIcon.className = isHideMeActive ? html.hideMeOn : html.hideMeOff;
        hideMeIcon.style.color = isHideMeActive ? 'red' : 'white';
        isHideMeActive ? this.sound('left') : this.sound('joined');
        resizeVideoMedia();
    }

    function  producerExist(this: any, type: any) {
        return this.producerLabel.has(type);
    }

    function closeThenProduce(this: any, type: any, deviceId = null, swapCamera = false) {
        this.closeProducer(type);
        setTimeout(async function () {
            await rc.produce(type, deviceId, swapCamera);
        }, 1000);
    }

    async  function handleProducer(this: any, id: string, type: any, stream: any) {
        let elem, vb, vp, ts, d, p, i, au, pip, fs, pm, pb, pn;
        switch (type) {
            case mediaType.video:
            case mediaType.screen:
                let isScreen = type === mediaType.screen;
                this.removeVideoOff(this.peer_id);
                d = document.createElement('div');
                d.className = 'Camera';
                d.id = id + '__video';
                elem = document.createElement('video');
                elem.setAttribute('id', id);
                !isScreen && elem.setAttribute('name', this.peer_id);
                elem.setAttribute('playsinline', true);
                elem.controls = isVideoControlsOn;
                elem.autoplay = true;
                elem.muted = true;
                elem.volume = 0;
                elem.poster = image.poster;
                elem.style.objectFit = isScreen || isBroadcastingEnabled ? 'contain' : 'var(--videoObjFit)';
                elem.className = this.isMobileDevice || isScreen ? '' : 'mirror';
                vb = document.createElement('div');
                vb.setAttribute('id', this.peer_id + '__vb');
                vb.className = 'videoMenuBar fadein';
                pip = document.createElement('button');
                pip.id = id + '__pictureInPicture';
                pip.className = html.pip;
                fs = document.createElement('button');
                fs.id = id + '__fullScreen';
                fs.className = html.fullScreen;
                ts = document.createElement('button');
                ts.id = id + '__snapshot';
                ts.className = html.snapshot;
                pn = document.createElement('button');
                pn.id = id + '__pin';
                pn.className = html.pin;
                vp = document.createElement('button');
                vp.id = this.peer_id + +'__vp';
                vp.className = html.videoPrivacy;
                au = document.createElement('button');
                au.id = this.peer_id + '__audio';
                au.className = this.peer_info.peer_audio ? html.audioOn : html.audioOff;
                au.style.cursor = 'default';
                p = document.createElement('p');
                p.id = this.peer_id + '__name';
                p.className = html.userName;
                p.innerText = (isPresenter ? '⭐️ ' : '') + this.peer_name + ' (me)';
                i = document.createElement('i');
                i.id = this.peer_id + '__hand';
                i.className = html.userHand;
                pm = document.createElement('div');
                pb = document.createElement('div');
                pm.setAttribute('id', this.peer_id + '_pitchMeter');
                pb.setAttribute('id', this.peer_id + '_pitchBar');
                pm.className = 'speechbar';
                pb.className = 'bar';
                pb.style.height = '1%';
                pm.appendChild(pb);
                BUTTONS.producerVideo.muteAudioButton && vb.appendChild(au);
                BUTTONS.producerVideo.videoPrivacyButton && !isScreen && vb.appendChild(vp);
                BUTTONS.producerVideo.snapShotButton && vb.appendChild(ts);
                BUTTONS.producerVideo.videoPictureInPicture &&
                    this.isVideoPictureInPictureSupported &&
                    vb.appendChild(pip);
                BUTTONS.producerVideo.fullScreenButton && this.isVideoFullScreenSupported && vb.appendChild(fs);
                if (!this.isMobileDevice) vb.appendChild(pn);
                d.appendChild(elem);
                d.appendChild(pm);
                d.appendChild(i);
                d.appendChild(p);
                d.appendChild(vb);
                this.videoMediaContainer.appendChild(d);
                this.attachMediaStream(elem, stream, type, 'Producer');
                this.myVideoEl = elem;
                this.isVideoPictureInPictureSupported && this.handlePIP(elem.id, pip.id);
                this.isVideoFullScreenSupported && this.handleFS(elem.id, fs.id);
                this.handleDD(elem.id, this.peer_id, true);
                this.handleTS(elem.id, ts.id);
                this.handlePN(elem.id, pn.id, d.id, isScreen);
                this.handleZV(elem.id, d.id, this.peer_id);
                if (!isScreen) this.handleVP(elem.id, vp.id);
                this.popupPeerInfo(p.id, this.peer_info);
                this.checkPeerInfoStatus(this.peer_info);
                if (isScreen) pn.click();
                handleAspectRatio();
                if (!this.isMobileDevice) {
                    this.setTippy(pn.id, 'Toggle Pin', 'bottom');
                    this.setTippy(pip.id, 'Toggle picture in picture', 'bottom');
                    this.setTippy(ts.id, 'Snapshot', 'bottom');
                    this.setTippy(vp.id, 'Toggle video privacy', 'bottom');
                    this.setTippy(au.id, 'Audio status', 'bottom');
                }
                console.log('[addProducer] Video-element-count', this.videoMediaContainer.childElementCount);
                break;
            case mediaType.audio:
                elem = document.createElement('audio');
                elem.id = id + '__localAudio';
                elem.controls = false;
                elem.autoplay = true;
                elem.muted = true;
                elem.volume = 0;
                this.myAudioEl = elem;
                this.localAudioEl.appendChild(elem);
                this.attachMediaStream(elem, stream, type, 'Producer');
                console.log('[addProducer] audio-element-count', this.localAudioEl.childElementCount);
                break;
            default:
                break;
        }
        return elem;
    }

    async function pauseProducer(this: any, type: string) {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);
        this.producers.get(producer_id).pause();

        try {
            const response = await this.socket.request('pauseProducer', { producer_id: producer_id });
            console.log('Producer paused', response);
        } catch (error) {
            console.error('Error pausing producer', error);
        }

        switch (type) {
            case mediaType.audio:
                this.event(_EVENTS.pauseAudio);
                this.setIsAudio(this.peer_id, false);
                break;
            case mediaType.video:
                this.event(_EVENTS.pauseVideo);
                break;
            case mediaType.screen:
                this.event(_EVENTS.pauseScreen);
                break;
            default:
                return;
        }
    }

    async function resumeProducer(this: any, type: string) {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);
        this.producers.get(producer_id).resume();

        try {
            const response = await this.socket.request('resumeProducer', { producer_id: producer_id });
            console.log('Producer resumed', response);
        } catch (error) {
            console.error('Error resuming producer', error);
        }

        switch (type) {
            case mediaType.audio:
                this.event(_EVENTS.resumeAudio);
                this.setIsAudio(this.peer_id, true);
                break;
            case mediaType.video:
                this.event(_EVENTS.resumeVideo);
                break;
            case mediaType.screen:
                this.event(_EVENTS.resumeScreen);
                break;
            default:
                return;
        }
    }

    function   closeProducer(this: any, type: string) {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);

        const data = {
            peer_name: this.peer_name,
            producer_id: producer_id,
            type: type,
            status: false,
        };
        console.log(`Close producer ${type}`, data);

        this.socket.emit('producerClosed', data);

        this.producers.get(producer_id).close();
        this.producers.delete(producer_id);
        this.producerLabel.delete(type);

        console.log('[closeProducer] - PRODUCER LABEL', this.producerLabel);

        if (type !== mediaType.audio) {
            const elem = this.getId(producer_id);
            const d = this.getId(producer_id + '__video');
            elem.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                track.stop();
            });
            d.parentNode.removeChild(d);

            //alert(this.pinnedVideoPlayerId + '==' + producer_id);
            if (this.isVideoPinned && this.pinnedVideoPlayerId == producer_id) {
                this.removeVideoPinMediaContainer();
                console.log('Remove pin container due the Producer close', {
                    producer_id: producer_id,
                    producer_type: type,
                });
            }

            handleAspectRatio();

            console.log('[producerClose] Video-element-count', this.videoMediaContainer.childElementCount);
        }

        if (type === mediaType.audio) {
            const au = this.getId(producer_id + '__localAudio');
            au.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                track.stop();
            });
            this.localAudioEl.removeChild(au);
            console.log('[producerClose] Audio-element-count', this.localAudioEl.childElementCount);
        }

        switch (type) {
            case mediaType.audio:
                this.setIsAudio(this.peer_id, false);
                this.event(_EVENTS.stopAudio);
                break;
            case mediaType.video:
                this.setIsVideo(false);
                this.event(_EVENTS.stopVideo);
                break;
            case mediaType.screen:
                this.setIsScreen(false);
                this.event(_EVENTS.stopScreen);
                break;
            default:
                break;
        }

        this.sound('left');
    }

    async function produceScreenAudio(this: any, stream: { getAudioTracks: () => any[]; }) {
        try {
            if (this.producerLabel.has(mediaType.audioTab)) {
                return console.warn('Producer already exists for this type ' + mediaType.audioTab);
            }

            const track = stream.getAudioTracks()[0];
            const params = {
                track,
                appData: {
                    mediaType: mediaType.audio,
                },
            };

            const producerSa = await this.producerTransport.produce(params);

            console.log('PRODUCER SCREEN AUDIO', producerSa);

            this.producers.set(producerSa.id, producerSa);
            this.producerLabel.set(mediaType.audioTab, producerSa.id);

            console.log('[produceScreenAudio] - PRODUCER LABEL', this.producerLabel);

            const sa = await this.handleProducer(producerSa.id, mediaType.audio, stream);

            producerSa.on('trackended', () => {
                console.log('Producer Screen audio track ended', { id: producerSa.id });
                this.closeProducer(mediaType.audioTab);
            });

            producerSa.on('transportclose', () => {
                console.log('Producer Screen audio transport close', { id: producerSa.id });
                sa.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                    track.stop();
                });
                sa.parentNode.removeChild(sa);
                console.log('[transportClose] audio-element-count', this.localAudioEl.childElementCount);
                this.closeProducer(mediaType.audioTab);
            });

            producerSa.on('close', () => {
                console.log('Closing Screen audio producer', { id: producerSa.id });
                sa.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                    track.stop();
                });
                sa.parentNode.removeChild(sa);
                console.log('[closingProducer] audio-element-count', this.localAudioEl.childElementCount);
                this.closeProducer(mediaType.audioTab);
            });
        } catch (err) {
            console.error('Produce error:', err);
        }
    }

    // ####################################################
    // CONSUMER
    // ####################################################

    async function consume(this: any, producer_id: any, peer_name: any, peer_info: { peer_id: any; }, type: string) {
        try {
            wbUpdate();

            const { consumer, stream, kind } = await this.getConsumeStream(producer_id, peer_info.peer_id, type);

            console.log('CONSUMER MEDIA TYPE ----> ' + type);
            console.log('CONSUMER', consumer);

            this.consumers.set(consumer.id, consumer);

            consumer.on('trackended', () => {
                console.log('Consumer track end', { id: consumer.id });
                this.removeConsumer(consumer.id, consumer.kind);
            });

            consumer.on('transportclose', () => {
                console.log('Consumer transport close', { id: consumer.id });
                this.removeConsumer(consumer.id, consumer.kind);
            });

            this.handleConsumer(consumer.id, type, stream, peer_name, peer_info);

            if (kind === 'video' && isParticipantsListOpen) {
                await getRoomParticipants();
            }
        } catch (error) {
            console.error('Error in consume', error);
        }
    }

    async  function getConsumeStream(this: any, producerId: any, peer_id: string | number, type: any) {
        const { rtpCapabilities } = this.device;

        const data = await this.socket.request('consume', {
            rtpCapabilities,
            consumerTransportId: this.consumerTransport.id,
            producerId,
        });

        console.log('DATA', data);

        const { id, kind, rtpParameters } = data;
        const codecOptions = {};
        const streamId = peer_id + (type == mediaType.screen ? '-screen-sharing' : '-mic-webcam');
        const consumer = await this.consumerTransport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
            codecOptions,
            streamId,
        });

        const stream = new MediaStream();
        stream.addTrack(consumer.track);

        return {
            consumer,
            stream,
            kind,
        };
    }

    function  handleConsumer(this: any, id: string, type: any, stream: any, peer_name: string | number, peer_info: { peer_id: any; peer_audio: any; peer_video_privacy: any; peer_presenter: any; }) {
        let elem, vb, d, p, i, cm, au, pip, fs, ts, sf, sm, sv, gl, ban, ko, pb, pm, pv, pn;

        let eDiv, eBtn, eVc; // expand buttons

        console.log('PEER-INFO', peer_info);

        const remotePeerId = peer_info.peer_id;
        const remoteIsScreen = type == mediaType.screen;
        const remotePeerAudio = peer_info.peer_audio;
        const remotePrivacyOn = peer_info.peer_video_privacy;
        const remotePeerPresenter = peer_info.peer_presenter;

        switch (type) {
            case mediaType.video:
            case mediaType.screen:
                this.removeVideoOff(remotePeerId);
                d = document.createElement('div');
                d.className = 'Camera';
                d.id = id + '__video';
                elem = document.createElement('video');
                elem.setAttribute('id', id);
                !remoteIsScreen && elem.setAttribute('name', remotePeerId);
                elem.setAttribute('playsinline', true);
                elem.controls = isVideoControlsOn;
                elem.autoplay = true;
                elem.className = '';
                elem.poster = image.poster;
                elem.style.objectFit = remoteIsScreen || isBroadcastingEnabled ? 'contain' : 'var(--videoObjFit)';
                vb = document.createElement('div');
                vb.setAttribute('id', remotePeerId + '__vb');
                vb.className = 'videoMenuBar fadein';

                eDiv = document.createElement('div');
                eDiv.className = 'expand-video';
                eBtn = document.createElement('button');
                eBtn.id = remotePeerId + '_videoExpandBtn';
                eBtn.className = html.expand;
                eVc = document.createElement('div');
                eVc.className = 'expand-video-content';

                pv = document.createElement('input');
                pv.id = remotePeerId + '___pVolume';
                pv.type = 'range';
                pv.min = 0;
                pv.max = 100;
                pv.value = 100;
                pip = document.createElement('button');
                pip.id = id + '__pictureInPicture';
                pip.className = html.pip;
                fs = document.createElement('button');
                fs.id = id + '__fullScreen';
                fs.className = html.fullScreen;
                ts = document.createElement('button');
                ts.id = id + '__snapshot';
                ts.className = html.snapshot;
                pn = document.createElement('button');
                pn.id = id + '__pin';
                pn.className = html.pin;
                sf = document.createElement('button');
                sf.id = id + '___' + remotePeerId + '___sendFile';
                sf.className = html.sendFile;
                sm = document.createElement('button');
                sm.id = id + '___' + remotePeerId + '___sendMsg';
                sm.className = html.sendMsg;
                sv = document.createElement('button');
                sv.id = id + '___' + remotePeerId + '___sendVideo';
                sv.className = html.sendVideo;
                cm = document.createElement('button');
                cm.id = id + '___' + remotePeerId + '___video';
                cm.className = html.videoOn;
                au = document.createElement('button');
                au.id = remotePeerId + '__audio';
                au.className = remotePeerAudio ? html.audioOn : html.audioOff;
                gl = document.createElement('button');
                gl.id = id + '___' + remotePeerId + '___geoLocation';
                gl.className = html.geolocation;
                ban = document.createElement('button');
                ban.id = id + '___' + remotePeerId + '___ban';
                ban.className = html.ban;
                ko = document.createElement('button');
                ko.id = id + '___' + remotePeerId + '___kickOut';
                ko.className = html.kickOut;
                i = document.createElement('i');
                i.id = remotePeerId + '__hand';
                i.className = html.userHand;
                p = document.createElement('p');
                p.id = remotePeerId + '__name';
                p.className = html.userName;
                p.innerText = (remotePeerPresenter ? '⭐️ ' : '') + peer_name;
                pm = document.createElement('div');
                pb = document.createElement('div');
                pm.setAttribute('id', remotePeerId + '__pitchMeter');
                pb.setAttribute('id', remotePeerId + '__pitchBar');
                pm.className = 'speechbar';
                pb.className = 'bar';
                pb.style.height = '1%';
                pm.appendChild(pb);

                BUTTONS.consumerVideo.sendMessageButton && eVc.appendChild(sm);
                BUTTONS.consumerVideo.sendFileButton && eVc.appendChild(sf);
                BUTTONS.consumerVideo.sendVideoButton && eVc.appendChild(sv);
                BUTTONS.consumerVideo.geolocationButton && eVc.appendChild(gl);
                BUTTONS.consumerVideo.banButton && eVc.appendChild(ban);
                BUTTONS.consumerVideo.ejectButton && eVc.appendChild(ko);
                eDiv.appendChild(eBtn);
                eDiv.appendChild(eVc);

                vb.appendChild(eDiv);
                BUTTONS.consumerVideo.audioVolumeInput && !this.isMobileDevice && vb.appendChild(pv);
                vb.appendChild(au);
                vb.appendChild(cm);
                BUTTONS.consumerVideo.snapShotButton && vb.appendChild(ts);
                BUTTONS.consumerVideo.videoPictureInPicture &&
                    this.isVideoPictureInPictureSupported &&
                    vb.appendChild(pip);
                BUTTONS.consumerVideo.fullScreenButton && this.isVideoFullScreenSupported && vb.appendChild(fs);
                if (!this.isMobileDevice) vb.appendChild(pn);
                d.appendChild(elem);
                d.appendChild(i);
                d.appendChild(p);
                d.appendChild(pm);
                d.appendChild(vb);
                this.videoMediaContainer.appendChild(d);
                this.attachMediaStream(elem, stream, type, 'Consumer');
                this.isVideoPictureInPictureSupported && this.handlePIP(elem.id, pip.id);
                this.isVideoFullScreenSupported && this.handleFS(elem.id, fs.id);
                this.handleDD(elem.id, remotePeerId);
                this.handleTS(elem.id, ts.id);
                this.handleSF(sf.id);
                this.handleSM(sm.id, peer_name);
                this.handleSV(sv.id);
                BUTTONS.consumerVideo.muteVideoButton && this.handleCM(cm.id);
                BUTTONS.consumerVideo.muteAudioButton && this.handleAU(au.id);
                this.handlePV(id + '___' + pv.id);
                this.handleGL(gl.id);
                this.handleBAN(ban.id);
                this.handleKO(ko.id);
                this.handlePN(elem.id, pn.id, d.id, remoteIsScreen);
                this.handleZV(elem.id, d.id, remotePeerId);
                this.popupPeerInfo(p.id, peer_info);
                this.checkPeerInfoStatus(peer_info);
                if (!remoteIsScreen && remotePrivacyOn) this.setVideoPrivacyStatus(remotePeerId, remotePrivacyOn);
                if (remoteIsScreen) pn.click();
                this.sound('joined');
                handleAspectRatio();
                console.log('[addConsumer] Video-element-count', this.videoMediaContainer.childElementCount);
                if (!this.isMobileDevice) {
                    this.setTippy(pn.id, 'Toggle Pin', 'bottom');
                    this.setTippy(pip.id, 'Toggle picture in picture', 'bottom');
                    this.setTippy(ts.id, 'Snapshot', 'bottom');
                    this.setTippy(sf.id, 'Send file', 'bottom');
                    this.setTippy(sm.id, 'Send message', 'bottom');
                    this.setTippy(sv.id, 'Send video', 'bottom');
                    this.setTippy(cm.id, 'Hide', 'bottom');
                    this.setTippy(au.id, 'Mute', 'bottom');
                    this.setTippy(pv.id, '🔊 Volume', 'bottom');
                    this.setTippy(gl.id, 'Geolocation', 'bottom');
                    this.setTippy(ban.id, 'Ban', 'bottom');
                    this.setTippy(ko.id, 'Eject', 'bottom');
                }
                this.setPeerAudio(remotePeerId, remotePeerAudio);
                break;
            case mediaType.audio:
                elem = document.createElement('audio');
                elem.id = id;
                elem.autoplay = true;
                elem.audio = 1.0;
                this.remoteAudioEl.appendChild(elem);
                this.attachMediaStream(elem, stream, type, 'Consumer');
                let audioConsumerId = remotePeerId + '___pVolume';
                this.audioConsumers.set(audioConsumerId, id);
                let inputPv = this.getId(audioConsumerId);
                if (inputPv) {
                    this.handlePV(id + '___' + audioConsumerId);
                    this.setPeerAudio(remotePeerId, remotePeerAudio);
                }
                if (sinkId && speakerSelect.value) {
                    this.changeAudioDestination(elem);
                }
                //elem.addEventListener('play', () => { elem.volume = 0.1 });
                console.log('[Add audioConsumers]', this.audioConsumers);
                break;
            default:
                break;
        }
        return elem;
    }

    function   removeConsumer(this: any, consumer_id: string, consumer_kind: string) {
        console.log('Remove consumer', { consumer_id: consumer_id, consumer_kind: consumer_kind });

        const elem = this.getId(consumer_id);
        if (elem) {
            elem.srcObject.getTracks().forEach(function (track: { stop: () => void; }) {
                track.stop();
            });
            elem.parentNode.removeChild(elem);
        }

        if (consumer_kind === 'video') {
            const d = this.getId(consumer_id + '__video');
            if (d) {
                d.parentNode.removeChild(d);
                //alert(this.pinnedVideoPlayerId + '==' + consumer_id);
                if (this.isVideoPinned && this.pinnedVideoPlayerId == consumer_id) {
                    this.removeVideoPinMediaContainer();
                    console.log('Remove pin container due the Consumer close', {
                        consumer_id: consumer_id,
                        consumer_kind: consumer_kind,
                    });
                }
            }

            handleAspectRatio();
            console.log(
                '[removeConsumer - ' + consumer_kind + '] Video-element-count',
                this.videoMediaContainer.childElementCount,
            );
        }

        if (consumer_kind === 'audio') {
            const audioConsumerPlayerId = this.getMapKeyByValue(this.audioConsumers, consumer_id);
            if (audioConsumerPlayerId) {
                const inputPv = this.getId(audioConsumerPlayerId);
                if (inputPv) inputPv.style.display = 'none';
                this.audioConsumers.delete(audioConsumerPlayerId);
                console.log('Remove audio Consumer', {
                    consumer_id: consumer_id,
                    audioConsumerPlayerId: audioConsumerPlayerId,
                    audioConsumers: this.audioConsumers,
                });
            }
        }

        this.consumers.delete(consumer_id);
        this.sound('left');
    }

    // ####################################################
    // HANDLE VIDEO OFF
    // ####################################################

    function   setVideoOff(this: any, peer_info: { peer_id: any; peer_name: any; peer_audio: any; peer_presenter: any; }, remotePeer = false) {
        //console.log('setVideoOff', peer_info);
        let d, vb, i, h, au, sf, sm, sv, gl, ban, ko, p, pm, pb, pv;

        const { peer_id, peer_name, peer_audio, peer_presenter } = peer_info;

        this.removeVideoOff(peer_id);
        d = document.createElement('div');
        d.className = 'Camera';
        d.id = peer_id + '__videoOff';
        vb = document.createElement('div');
        vb.setAttribute('id', peer_id + 'vb');
        vb.className = 'videoMenuBar fadein';
        au = document.createElement('button');
        au.id = peer_id + '__audio';
        au.className = peer_audio ? html.audioOn : html.audioOff;
        if (remotePeer) {
            pv = document.createElement('input');
            pv.id = peer_id + '___pVolume';
            pv.type = 'range';
            pv.min = 0;
            pv.max = 100;
            pv.value = 100;
            sf = document.createElement('button');
            sf.id = 'remotePeer___' + peer_id + '___sendFile';
            sf.className = html.sendFile;
            sm = document.createElement('button');
            sm.id = 'remotePeer___' + peer_id + '___sendMsg';
            sm.className = html.sendMsg;
            sv = document.createElement('button');
            sv.id = 'remotePeer___' + peer_id + '___sendVideo';
            sv.className = html.sendVideo;
            gl = document.createElement('button');
            gl.id = 'remotePeer___' + peer_id + '___geoLocation';
            gl.className = html.geolocation;
            ban = document.createElement('button');
            ban.id = 'remotePeer___' + peer_id + '___ban';
            ban.className = html.ban;
            ko = document.createElement('button');
            ko.id = 'remotePeer___' + peer_id + '___kickOut';
            ko.className = html.kickOut;
        }
        i = document.createElement('img');
        i.className = 'videoAvatarImage center'; // pulsate
        i.id = peer_id + '__img';
        p = document.createElement('p');
        p.id = peer_id + '__name';
        p.className = html.userName;
        p.innerText = (peer_presenter ? '⭐️ ' : '') + peer_name + (remotePeer ? '' : ' (me) ');
        h = document.createElement('i');
        h.id = peer_id + '__hand';
        h.className = html.userHand;
        pm = document.createElement('div');
        pb = document.createElement('div');
        pm.setAttribute('id', peer_id + '__pitchMeter');
        pb.setAttribute('id', peer_id + '__pitchBar');
        pm.className = 'speechbar';
        pb.className = 'bar';
        pb.style.height = '1%';
        pm.appendChild(pb);
        if (remotePeer) {
            BUTTONS.videoOff.ejectButton && vb.appendChild(ko);
            BUTTONS.videoOff.banButton && vb.appendChild(ban);
            BUTTONS.videoOff.geolocationButton && vb.appendChild(gl);
            BUTTONS.videoOff.sendVideoButton && vb.appendChild(sv);
            BUTTONS.videoOff.sendFileButton && vb.appendChild(sf);
            BUTTONS.videoOff.sendMessageButton && vb.appendChild(sm);
            BUTTONS.videoOff.audioVolumeInput && !this.isMobileDevice && vb.appendChild(pv);
        }
        vb.appendChild(au);
        d.appendChild(i);
        d.appendChild(p);
        d.appendChild(h);
        d.appendChild(pm);
        d.appendChild(vb);
        this.videoMediaContainer.appendChild(d);
        BUTTONS.videoOff.muteAudioButton && this.handleAU(au.id);
        if (remotePeer) {
            this.handlePV('remotePeer___' + pv.id);
            this.handleSM(sm.id);
            this.handleSF(sf.id);
            this.handleSV(sv.id);
            this.handleGL(gl.id);
            this.handleBAN(ban.id);
            this.handleKO(ko.id);
        }
        this.handleDD(d.id, peer_id, !remotePeer);
        this.popupPeerInfo(p.id, peer_info);
        this.setVideoAvatarImgName(i.id, peer_name);
        this.getId(i.id).style.display = 'block';
        handleAspectRatio();
        if (isParticipantsListOpen) getRoomParticipants();
        if (!this.isMobileDevice && remotePeer) {
            this.setTippy(sm.id, 'Send message', 'bottom');
            this.setTippy(sf.id, 'Send file', 'bottom');
            this.setTippy(sv.id, 'Send video', 'bottom');
            this.setTippy(au.id, 'Mute', 'bottom');
            this.setTippy(pv.id, '🔊 Volume', 'bottom');
            this.setTippy(gl.id, 'Geolocation', 'bottom');
            this.setTippy(ban.id, 'Ban', 'bottom');
            this.setTippy(ko.id, 'Eject', 'bottom');
        }
        remotePeer ? this.setPeerAudio(peer_id, peer_audio) : this.setIsAudio(peer_id, peer_audio);

        console.log('[setVideoOff] Video-element-count', this.videoMediaContainer.childElementCount);
        //
        wbUpdate();

        this.handleHideMe();
    }

    function removeVideoOff(this: any, peer_id: string) {
        let pvOff = this.getId(peer_id + '__videoOff');
        if (pvOff) {
            pvOff.parentNode.removeChild(pvOff);
            handleAspectRatio();
            console.log('[removeVideoOff] Video-element-count', this.videoMediaContainer.childElementCount);
            if (peer_id != this.peer_id) this.sound('left');
        }
    }

    // ####################################################
    // SHARE SCREEN ON JOIN
    // ####################################################

    function shareScreen(this: any) {
        if (!this.isMobileDevice && (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia)) {
            this.sound('open');
            // startScreenButton.click(); // Chrome - Opera - Edge - Brave
            // handle error: getDisplayMedia requires transient activation from a user gesture on Safari - FireFox
            Swal.fire({
                background: swalBackground,
                position: 'center',
                icon: 'question',
                text: 'Do you want to share your screen?',
                showDenyButton: true,
                confirmButtonText: `Yes`,
                denyButtonText: `No`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result: { isConfirmed: any; }) => {
                if (result.isConfirmed) {
                    startScreenButton.click();
                    console.log('11 ----> Screen is on');
                } else {
                    console.log('11 ----> Screen is on');
                }
            });
        } else {
            console.log('11 ----> Screen is off');
        }
    }

    // ####################################################
    // EXIT ROOM
    // ####################################################

    function  exit(this: any, offline = false) {
        const clean = () => {
            this._isConnected = false;
            if (this.consumerTransport) this.consumerTransport.close();
            if (this.producerTransport) this.producerTransport.close();
            this.socket.off('disconnect');
            this.socket.off('newProducers');
            this.socket.off('consumerClosed');
        };

        if (!offline) {
            this.socket
                .request('exitRoom')
                .then((e: any) => console.log('Exit Room', e))
                .catch((e: any) => console.warn('Exit Room ', e))
                .finally(() => {
                    clean();
                    this.event(_EVENTS.exitRoom);
                });
        } else {
            clean();
        }
    }

    function  exitRoom(this: any) {
        //...
        if (isPresenter && switchDisconnectAllOnLeave.checked) {
            this.ejectAllOnLeave();
        }
        this.exit();
    }

    // ####################################################
    // EJECT ALL ON LEAVE ROOM
    // ####################################################

    function  ejectAllOnLeave(this: any) {
        const cmd = {
            type: 'ejectAll',
            peer_name: this.peer_name,
            peer_uuid: this.peer_uuid,
            broadcast: true,
        };
        this.emitCmd(cmd);
    }

    // ####################################################
    // HELPERS
    // ####################################################

    function  attachMediaStream(elem: { srcObject: MediaStream; }, stream: { getAudioTracks: () => any[]; getVideoTracks: () => any[]; }, type: string, who: string) {
        let track;
        switch (type) {
            case mediaType.audio:
                track = stream.getAudioTracks()[0];
                break;
            case mediaType.video:
            case mediaType.screen:
                track = stream.getVideoTracks()[0];
                break;
            default:
                break;
        }
        const consumerStream = new MediaStream();
        consumerStream.addTrack(track);
        elem.srcObject = consumerStream;
        console.log(who + ' Success attached media ' + type);
    }

    async function changeAudioDestination(this: any, audioElement = false) {
        const audioDestination = speakerSelect.value;
        if (audioElement) {
            await this.attachSinkId(audioElement, audioDestination);
        } else {
            const audioElements = this.remoteAudioEl.querySelectorAll('audio');
            audioElements.forEach(async (audioElement: any) => {
                await this.attachSinkId(audioElement, audioDestination);
            });
        }
    }

    async function attachSinkId(this: any, elem: { sinkId: any; setSinkId: (arg0: any) => Promise<any>; }, sinkId: any) {
        if (typeof elem.sinkId !== 'undefined') {
            elem.setSinkId(sinkId)
                .then(() => {
                    console.log(`Success, audio output device attached: ${sinkId}`);
                })
                .catch((err: { name: string; }) => {
                    let errorMessage = err;
                    let speakerSelect = this.getId('speakerSelect');
                    if (err.name === 'SecurityError')
                        errorMessage = `You need to use HTTPS for selecting audio output device: ${err}`;
                    console.error('Attach SinkId error: ', errorMessage);
                    this.userLog('error', errorMessage, 'top-end', 6000);
                    speakerSelect.selectedIndex = 0;
                    refreshLsDevices();
                });
        } else {
            const error = `Browser seems doesn't support output device selection.`;
            console.warn(error);
            this.userLog('error', error, 'top-end', 6000);
        }
    }

    function   event(this: any, evt: any) {
        if (this.eventListeners.has(evt)) {
            this.eventListeners.get(evt).forEach((callback: () => any) => callback());
        }
    }

    function  on(this: any, evt: any, callback: any) {
        this.eventListeners.get(evt).push(callback);
    }

    // ####################################################
    // SET
    // ####################################################

    function   setTippy(this: any, elem: string, content: string, placement: string, allowHTML = false) {
        if (DetectRTC.isMobileDevice) return;
        const element = this.getId(elem);
        if (element) {
            if (element._tippy) {
                element._tippy.destroy();
            }
            try {
                tippy(element, {
                    content: content,
                    placement: placement,
                    allowHTML: allowHTML,
                });
            } catch (err) {
                console.error('setTippy error', err.message);
            }
        } else {
            console.warn('setTippy element not found with content', content);
        }
    }

    function   setVideoAvatarImgName(this: any, elemId: any, peer_name: any) {
        let elem = this.getId(elemId);
        if (cfg.useAvatarSvg) {
            rc.isValidEmail(peer_name)
                ? elem.setAttribute('src', this.genGravatar(peer_name))
                : elem.setAttribute('src', this.genAvatarSvg(peer_name, 250));
        } else {
            elem.setAttribute('src', image.avatar);
        }
    }

    function  genGravatar(email: string, size = false) {
        const hash = md5(email.toLowerCase().trim());
        const gravatarURL = `https://www.gravatar.com/avatar/${hash}` + (size ? `?s=${size}` : '?s=250') + '?d=404';
        return gravatarURL;
        function md5(input: any) {
            return CryptoJS.MD5(input).toString();
        }
    }

    function  isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function  genAvatarSvg(peerName: string, avatarImgSize: number) {
        const charCodeRed = peerName.charCodeAt(0);
        const charCodeGreen = peerName.charCodeAt(1) || charCodeRed;
        const red = Math.pow(charCodeRed, 7) % 200;
        const green = Math.pow(charCodeGreen, 7) % 200;
        const blue = (red + green) % 200;
        const bgColor = `rgb(${red}, ${green}, ${blue})`;
        const textColor = '#ffffff';
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        width="${avatarImgSize}px" 
        height="${avatarImgSize}px" 
        viewBox="0 0 ${avatarImgSize} ${avatarImgSize}" 
        version="1.1">
            <circle 
                fill="${bgColor}" 
                width="${avatarImgSize}" 
                height="${avatarImgSize}" 
                cx="${avatarImgSize / 2}" 
                cy="${avatarImgSize / 2}" 
                r="${avatarImgSize / 2}"
            />
            <text 
                x="50%" 
                y="50%" 
                style="color:${textColor}; 
                line-height:1; 
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                alignment-baseline="middle" 
                text-anchor="middle" 
                font-size="${Math.round(avatarImgSize * 0.4)}" 
                font-weight="normal" 
                dy=".1em" 
                dominant-baseline="middle" 
                fill="${textColor}">${peerName.substring(0, 2).toUpperCase()}
            </text>
        </svg>`;
        return 'data:image/svg+xml,' + svg.replace(/#/g, '%23').replace(/"/g, "'").replace(/&/g, '&amp;');
    }

    function  setPeerAudio(this: any, peer_id: any, status: string) {
        console.log('Set peer audio enabled: ' + status);
        const audioStatus = this.getPeerAudioBtn(peer_id); // producer, consumers
        const audioVolume = this.getPeerAudioVolumeBtn(peer_id); // consumers
        if (audioStatus) audioStatus.className = status ? html.audioOn : html.audioOff;
        if (audioVolume) status ? show(audioVolume) : hide(audioVolume);
    }

    function  setIsAudio(this: any, peer_id: any, status: string) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            console.log('Set audio enabled: ' + status);
            this.peer_info.peer_audio = status;
            const audioStatus = this.getPeerAudioBtn(peer_id); // producer, consumers
            if (audioStatus) audioStatus.className = status ? html.audioOn : html.audioOff;
        }
    }

    function   setIsVideo(this: any, status: string) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            this.peer_info.peer_video = status;
            if (!this.peer_info.peer_video) {
                console.log('Set video enabled: ' + status);
                this.setVideoOff(this.peer_info, false);
                this.sendVideoOff();
            }
        }
    }

    function  setIsScreen(this: any, status: string) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            this.peer_info.peer_screen = status;
            if (!this.peer_info.peer_screen && !this.peer_info.peer_video) {
                console.log('Set screen enabled: ' + status);
                this.setVideoOff(this.peer_info, false);
                this.sendVideoOff();
            }
        }
    }

    function  sendVideoOff(this: any) {
        this.socket.emit('setVideoOff', this.peer_info);
    }

    // ####################################################
    // GET
    // ####################################################

    function  isConnected(this: any) {
        return this._isConnected;
    }

    function isRecording(this: any) {
        return this._isRecording;
    }

    static get  mediaType() {
        return mediaType;
    }

    static get EVENTS() {
        return _EVENTS;
    }

    function  getTimeNow() {
        return new Date().toTimeString().split(' ')[0];
    }

    function getId(id: string) {
              return document.getElementById(id);
    }

    function  getName(name: string) {
        return document.getElementsByName(name);
    }

    function  getEcN(cn: string) {
        return document.getElementsByClassName(cn);
    }

    async  function getRoomInfo(this: any) {
        let room_info = await this.socket.request('getRoomInfo');
        return room_info;
    }

  function  refreshParticipantsCount(this: any) {
        this.socket.emit('refreshParticipantsCount');
    }

    function  getPeerAudioBtn(this: any, peer_id: string) {
        return this.getId(peer_id + '__audio');
    }

    function   getPeerAudioVolumeBtn(this: any, peer_id: string) {
        return this.getId(peer_id + '___pVolume');
    }

    function  getPeerHandBtn(this: any, peer_id: string) {
        return this.getId(peer_id + '__hand');
    }

    function  getMapKeyByValue(map: any[], searchValue: any) {
        for (let [key, value] of map.entries()) {
            if (value === searchValue) return key;
        }
    }

    function getSelectedIndexValue(elem: { options: { [x: string]: { value: any; }; }; selectedIndex: string | number; }) {
        return elem.options[elem.selectedIndex].value;
    }

    // ####################################################
    // UTILITY
    // ####################################################

    async  function sound(name: string, force = false) {
        if (!isSoundEnabled && !force) return;
        let sound = '../sounds/' + name + '.wav';
        let audio = new Audio(sound);
        try {
            audio.volume = 0.5;
            await audio.play();
        } catch (err) {
            return false;
        }
    }

    function  userLog(icon: string, message: string, position: string | undefined, timer = 5000) {
        const Toast = Swal.mixin({
            background: swalBackground,
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
        });
        switch (icon) {
            case 'html':
                Toast.fire({
                    icon: icon,
                    html: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            default:
                Toast.fire({
                    icon: icon,
                    title: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
        }
    }

    function   msgPopup(this: any, type: any, message: any) {
        switch (type) {
            case 'warning':
            case 'error':
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    icon: type,
                    title: type,
                    text: message,
                    showClass: { popup: 'animate__animated animate__rubberBand' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                this.sound('alert');
                break;
            case 'info':
            case 'success':
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    icon: type,
                    title: type,
                    text: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            case 'html':
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    icon: type,
                    html: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            case 'toast':
                const Toast = Swal.mixin({
                    background: swalBackground,
                    position: 'top-end',
                    icon: 'info',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    toast: true,
                    timer: 3000,
                });
                Toast.fire({
                    icon: 'info',
                    title: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            // ......
            default:
                alert(message);
        }
    }

   function msgHTML(this: any, data: { type: any; action: any; peer_name: any; }, icon: any, imageUrl: any, title: any, html: string, position = 'center') {
        switch (data.type) {
            case 'recording':
                switch (data.action) {
                    case enums.recording.started:
                    case enums.recording.start:
                        html = html + '<br/> Your presence implies you agree to being recorded';
                        toastMessage(6000);
                        break;
                    case enums.recording.stop:
                        toastMessage(3000);
                        break;
                    //...
                    default:
                        break;
                }
                if (!this.speechInMessages) this.speechText(`${data.peer_name} ${data.action}`);
                break;
            //...
            default:
                defaultMessage();
                break;
        }
        // TOAST less invasive
        function toastMessage(duration = 3000) {
            const Toast = Swal.mixin({
                background: swalBackground,
                position: 'top-end',
                icon: icon,
                showConfirmButton: false,
                timerProgressBar: true,
                toast: true,
                timer: duration,
            });
            Toast.fire({
                title: title,
                html: html,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
        }
        // DEFAULT
        function defaultMessage() {
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                background: swalBackground,
                position: position,
                icon: icon,
                imageUrl: imageUrl,
                title: title,
                html: html,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
        }
        //...
    }

    function   thereAreParticipants(this: any) {
        // console.log('participantsCount ---->', participantsCount);
        if (this.consumers.size > 0 || participantsCount > 1) {
            return true;
        }
        return false;
    }

    // ####################################################
    // MY SETTINGS
    // ####################################################

    function   toggleMySettings(this: any) {
        let mySettings = this.getId('mySettings');
        mySettings.style.top = '50%';
        mySettings.style.left = '50%';
        if (this.isMobileDevice) {
            mySettings.style.width = '100%';
            mySettings.style.height = '100%';
        }
        mySettings.classList.toggle('show');
        this.isMySettingsOpen = this.isMySettingsOpen ? false : true;
    }

    function   openTab(this: any, evt: { currentTarget: { className: string; }; }, tabName: any) {
        let i, tabcontent, tablinks;
        tabcontent = this.getEcN('tabcontent');
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        tablinks = this.getEcN('tablinks');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
        this.getId(tabName).style.display = 'block';
        evt.currentTarget.className += ' active';
    }

    function   changeBtnsBarPosition(position: any) {
        switch (position) {
            case 'vertical':
                document.documentElement.style.setProperty('--btns-top', '50%');
                document.documentElement.style.setProperty('--btns-right', '0%');
                document.documentElement.style.setProperty('--btns-left', '10px');
                document.documentElement.style.setProperty('--btns-margin-left', '0px');
                document.documentElement.style.setProperty('--btns-width', '60px');
                document.documentElement.style.setProperty('--btns-flex-direction', 'column');
                break;
            case 'horizontal':
                document.documentElement.style.setProperty('--btns-top', '95%');
                document.documentElement.style.setProperty('--btns-right', '25%');
                document.documentElement.style.setProperty('--btns-left', '50%');
                document.documentElement.style.setProperty('--btns-margin-left', '-160px');
                document.documentElement.style.setProperty('--btns-width', '320px');
                document.documentElement.style.setProperty('--btns-flex-direction', 'row');
                break;
            default:
                break;
        }
    }

    // ####################################################
    // PICTURE IN PICTURE
    // ####################################################

    function   handlePIP(this: any, elemId: any, pipId: any) {
        let videoPlayer = this.getId(elemId);
        let btnPIP = this.getId(pipId);
        if (btnPIP) {
            btnPIP.addEventListener('click', () => {
                if (videoPlayer.pictureInPictureElement) {
                    videoPlayer.exitPictureInPicture();
                } else if (document.pictureInPictureEnabled) {
                    videoPlayer.requestPictureInPicture().catch((error: { message: any; }) => {
                        console.error('Failed to enter Picture-in-Picture mode:', error);
                        this.userLog('warning', error.message, 'top-end', 6000);
                        elemDisplay(btnPIP.id, false);
                    });
                }
            });
        }
    }

    // ####################################################
    // FULL SCREEN
    // ####################################################

    function   isFullScreenSupported() {
        return (
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
        );
    }

    function   toggleFullScreen(this: any, elem = null) {
        let el = elem ? elem : document.documentElement;
        document.fullscreenEnabled =
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled;
        document.exitFullscreen =
            document.exitFullscreen ||
            document.webkitExitFullscreen ||
            document.mozCancelFullScreen ||
            document.msExitFullscreen;
        el.requestFullscreen =
            el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullScreen;
        if (document.fullscreenEnabled) {
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
                ? document.exitFullscreen()
                : el.requestFullscreen();
        }
        if (elem == null) this.isVideoOnFullScreen = document.fullscreenEnabled;
    }

    function   handleFS(this: any, elemId: any, fsId: any) {
        let videoPlayer = this.getId(elemId);
        let btnFs = this.getId(fsId);
        if (btnFs) {
            this.setTippy(fsId, 'Full screen', 'bottom');
            btnFs.addEventListener('click', () => {
                if (videoPlayer.classList.contains('videoCircle')) {
                    return userLog('info', 'Full Screen not allowed if video on privacy mode', 'top-end');
                }
                videoPlayer.style.pointerEvents = this.isVideoOnFullScreen ? 'auto' : 'none';
                this.toggleFullScreen(videoPlayer);
                this.isVideoOnFullScreen = this.isVideoOnFullScreen ? false : true;
            });
        }
        if (videoPlayer) {
            videoPlayer.addEventListener('click', () => {
                if (videoPlayer.classList.contains('videoCircle')) {
                    return userLog('info', 'Full Screen not allowed if video on privacy mode', 'top-end');
                }
                if (!videoPlayer.hasAttribute('controls')) {
                    if ((this.isMobileDevice && this.isVideoOnFullScreen) || !this.isMobileDevice) {
                        videoPlayer.style.pointerEvents = this.isVideoOnFullScreen ? 'auto' : 'none';
                        this.toggleFullScreen(videoPlayer);
                        this.isVideoOnFullScreen = this.isVideoOnFullScreen ? false : true;
                    }
                }
            });
            videoPlayer.addEventListener('fullscreenchange', () => {
                if (!document.fullscreenElement) {
                    videoPlayer.style.pointerEvents = 'auto';
                    this.isVideoOnFullScreen = false;
                }
            });
            videoPlayer.addEventListener('webkitfullscreenchange', () => {
                if (!document.webkitIsFullScreen) {
                    videoPlayer.style.pointerEvents = 'auto';
                    this.isVideoOnFullScreen = false;
                }
            });
        }
    }

    // ####################################################
    // HANDLE VIDEO | OBJ FIT | CONTROLS | PIN-UNPIN
    // ####################################################

    function   handleVideoObjectFit(value: string | null) {
        document.documentElement.style.setProperty('--videoObjFit', value);
    }

    function   handleVideoControls(this: any, value: string) {
        isVideoControlsOn = value == 'on' ? true : false;
        let cameras = this.getEcN('Camera');
        for (let i = 0; i < cameras.length; i++) {
            let cameraId = cameras[i].id.replace('__video', '');
            let videoPlayer = this.getId(cameraId);
            videoPlayer.hasAttribute('controls')
                ? videoPlayer.removeAttribute('controls')
                : videoPlayer.setAttribute('controls', isVideoControlsOn);
        }
    }

    function   handlePN(this: any, elemId: any, pnId: any, camId: any, isScreen = false) {
        let videoPlayer = this.getId(elemId);
        let btnPn = this.getId(pnId);
        let cam = this.getId(camId);
        if (btnPn && videoPlayer && cam) {
            btnPn.addEventListener('click', () => {
                if (this.isMobileDevice) return;
                this.sound('click');
                this.isVideoPinned = !this.isVideoPinned;
                if (this.isVideoPinned) {
                    if (!videoPlayer.classList.contains('videoCircle')) {
                        videoPlayer.style.objectFit = 'contain';
                    }
                    cam.className = '';
                    cam.style.width = '100%';
                    cam.style.height = '100%';
                    this.toggleVideoPin(pinVideoPosition.value);
                    this.videoPinMediaContainer.appendChild(cam);
                    this.videoPinMediaContainer.style.display = 'block';
                    this.pinnedVideoPlayerId = elemId;
                    setColor(btnPn, 'lime');
                } else {
                    if (this.pinnedVideoPlayerId != videoPlayer.id) {
                        this.isVideoPinned = true;
                        if (this.isScreenAllowed) return;
                        return this.msgPopup('toast', 'Another video seems pinned, unpin it before to pin this one');
                    }
                    if (!isScreen && !isBroadcastingEnabled) videoPlayer.style.objectFit = 'var(--videoObjFit)';
                    this.videoPinMediaContainer.removeChild(cam);
                    cam.className = 'Camera';
                    this.videoMediaContainer.appendChild(cam);
                    this.removeVideoPinMediaContainer();
                    setColor(btnPn, 'white');
                }
                handleAspectRatio();
            });
        }
    }

    function   toggleVideoPin(this: any, position: any) {
        if (!this.isVideoPinned) return;
        switch (position) {
            case 'top':
                this.videoPinMediaContainer.style.top = '25%';
                this.videoPinMediaContainer.style.width = '100%';
                this.videoPinMediaContainer.style.height = '75%';
                this.videoMediaContainer.style.top = '0%';
                this.videoMediaContainer.style.right = null;
                this.videoMediaContainer.style.width = null;
                this.videoMediaContainer.style.width = '100% !important';
                this.videoMediaContainer.style.height = '25%';
                break;
            case 'vertical':
                this.videoPinMediaContainer.style.top = 0;
                this.videoPinMediaContainer.style.width = '75%';
                this.videoPinMediaContainer.style.height = '100%';
                this.videoMediaContainer.style.top = 0;
                this.videoMediaContainer.style.width = '25%';
                this.videoMediaContainer.style.height = '100%';
                this.videoMediaContainer.style.right = 0;
                break;
            case 'horizontal':
                this.videoPinMediaContainer.style.top = 0;
                this.videoPinMediaContainer.style.width = '100%';
                this.videoPinMediaContainer.style.height = '75%';
                this.videoMediaContainer.style.top = '75%';
                this.videoMediaContainer.style.right = null;
                this.videoMediaContainer.style.width = null;
                this.videoMediaContainer.style.width = '100% !important';
                this.videoMediaContainer.style.height = '25%';
                break;
            default:
                break;
        }
        resizeVideoMedia();
    }

    // ####################################################
    // HANDLE VIDEO ZOOM-IN/OUT
    // ####################################################

    function   handleZV(this: any, elemId: any, divId: any, peerId: any) {
        let videoPlayer = this.getId(elemId);
        let videoWrap = this.getId(divId);
        let videoPeerId = peerId;
        let zoom = 1;

        const ZOOM_IN_FACTOR = 1.1;
        const ZOOM_OUT_FACTOR = 0.9;
        const MAX_ZOOM = 15;
        const MIN_ZOOM = 1;

        if (this.isZoomCenterMode) {
            if (videoPlayer) {
                videoPlayer.addEventListener('wheel', (e: { preventDefault: () => void; wheelDelta: any; deltaY: number; }) => {
                    e.preventDefault();
                    let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                    delta > 0 ? (zoom *= 1.2) : (zoom /= 1.2);
                    if (zoom < 1) zoom = 1;
                    videoPlayer.style.scale = zoom;
                });
            }
        } else {
            if (videoPlayer && videoWrap) {
                videoPlayer.addEventListener('wheel', (e: { preventDefault: () => void; clientX: number; clientY: number; deltaY: number; }) => {
                    e.preventDefault();
                    if (isVideoPrivacyActive) return;
                    const rect = videoWrap.getBoundingClientRect();
                    const cursorX = e.clientX - rect.left;
                    const cursorY = e.clientY - rect.top;
                    const zoomDirection = e.deltaY > 0 ? 'zoom-out' : 'zoom-in';
                    const scaleFactor = zoomDirection === 'zoom-out' ? ZOOM_OUT_FACTOR : ZOOM_IN_FACTOR;
                    zoom *= scaleFactor;
                    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
                    videoPlayer.style.transformOrigin = `${cursorX}px ${cursorY}px`;
                    videoPlayer.style.transform = `scale(${zoom})`;
                    videoPlayer.style.cursor = zoom === 1 ? 'pointer' : zoomDirection;
                });

                videoWrap.addEventListener('mouseleave', () => {
                    videoPlayer.style.cursor = 'pointer';
                    if (videoPeerId === this.peer_id) {
                        zoom = 1;
                        videoPlayer.style.transform = '';
                        videoPlayer.style.transformOrigin = 'center';
                    }
                });
                videoPlayer.addEventListener('mouseleave', () => {
                    videoPlayer.style.cursor = 'pointer';
                });
            }
        }
    }

    // ####################################################
    // REMOVE VIDEO PIN MEDIA CONTAINER
    // ####################################################

    function   removeVideoPinMediaContainer(this: any) {
        this.videoPinMediaContainer.style.display = 'none';
        this.videoMediaContainer.style.top = 0;
        this.videoMediaContainer.style.right = null;
        this.videoMediaContainer.style.width = '100%';
        this.videoMediaContainer.style.height = '100%';
        this.pinnedVideoPlayerId = null;
        this.isVideoPinned = false;
        if (this.isChatPinned) {
            this.chatPin();
        }
        if (this.transcription.isPin()) {
            this.transcription.pinned();
        }
    }

    function  adaptVideoObjectFit(index: any) {
        // 1 (cover) 2 (contain)
        BtnVideoObjectFit.selectedIndex = index;
        BtnVideoObjectFit.onchange();
    }

    // ####################################################
    // TAKE SNAPSHOT
    // ####################################################

    function handleTS(this: any, elemId: any, tsId: any) {
        let videoPlayer = this.getId(elemId);
        let btnTs = this.getId(tsId);
        if (btnTs && videoPlayer) {
            btnTs.addEventListener('click', () => {
                if (videoPlayer.classList.contains('videoCircle')) {
                    return this.userLog('info', 'SnapShoot not allowed if video on privacy mode', 'top-end');
                }
                this.sound('snapshot');
                let context, canvas, width, height, dataURL;
                width = videoPlayer.videoWidth;
                height = videoPlayer.videoHeight;
                canvas = canvas || document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                context = canvas.getContext('2d');
                context.drawImage(videoPlayer, 0, 0, width, height);
                dataURL = canvas.toDataURL('image/png');
                // console.log(dataURL);
                saveDataToFile(dataURL, getDataTimeString() + '-SNAPSHOT.png');
            });
        }
    }

    // ####################################################
    // VIDEO CIRCLE - PRIVACY MODE
    // ####################################################

    function   handleVP(this: any, elemId: any, vpId: any) {
        let videoPlayer = this.getId(elemId);
        let btnVp = this.getId(vpId);
        if (btnVp && videoPlayer) {
            btnVp.addEventListener('click', () => {
                this.sound('click');
                isVideoPrivacyActive = !isVideoPrivacyActive;
                this.setVideoPrivacyStatus(this.peer_id, isVideoPrivacyActive);
                this.emitCmd({
                    type: 'privacy',
                    peer_id: this.peer_id,
                    active: isVideoPrivacyActive,
                    broadcast: true,
                });
            });
        }
    }

    function   setVideoPrivacyStatus(this: any, elemName: any, privacy: any) {
        let videoPlayer = this.getName(elemName)[0];
        if (privacy) {
            videoPlayer.classList.remove('videoDefault');
            videoPlayer.classList.add('videoCircle');
            videoPlayer.style.objectFit = 'cover';
        } else {
            videoPlayer.classList.remove('videoCircle');
            videoPlayer.classList.add('videoDefault');
            videoPlayer.style.objectFit = 'var(--videoObjFit)';
        }
    }

    // ####################################################
    // DRAGGABLE
    // ####################################################

    function   makeDraggable(elmnt: { onmousedown: (e: Event | undefined) => void; style: { top: string; left: string; }; offsetTop: number; offsetLeft: number; }, dragObj: { onmousedown: (e: Event | undefined) => void; }) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (dragObj) {
            dragObj.onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e: Event | undefined) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function elementDrag(e: Event | undefined) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
            elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function  makeUnDraggable(elmnt: { onmousedown: null; style: { top: string; left: string; }; }, dragObj: { onmousedown: null; }) {
        if (dragObj) {
            dragObj.onmousedown = null;
        } else {
            elmnt.onmousedown = null;
        }
        elmnt.style.top = '';
        elmnt.style.left = '';
    }

    // ####################################################
    // CHAT
    // ####################################################

    function  handleSM(this: any, uid: string, name: any) {
        const words = uid.split('___');
        let peer_id = words[1];
        let peer_name = name;
        let btnSm = this.getId(uid);
        if (btnSm) {
            btnSm.addEventListener('click', () => {
                this.sendMessageTo(peer_id, peer_name);
            });
        }
    }

    function  isPlistOpen(this: any) {
        const plist = this.getId('plist');
        return !plist.classList.contains('hidden');
    }

    async  function toggleChat(this: any) {
        const chatRoom = this.getId('chatRoom');
        chatRoom.classList.toggle('show');
        if (!this.isChatOpen) {
            await getRoomParticipants();
            hide(chatMinButton);
            if (!this.isMobileDevice) {
                BUTTONS.chat.chatMaxButton && show(chatMaxButton);
            }
            this.chatCenter();
            this.sound('open');
            this.showPeerAboutAndMessages('all', 'all');
        }
        isParticipantsListOpen = !isParticipantsListOpen;
        this.isChatOpen = !this.isChatOpen;
        if (this.isChatPinned) this.chatUnpin();
        resizeChatRoom();
    }

    function   toggleShowParticipants(this: any) {
        const plist = this.getId('plist');
        const chat = this.getId('chat');
        plist.classList.toggle('hidden');
        const isParticipantsListHidden = !this.isPlistOpen();
        chat.style.marginLeft = isParticipantsListHidden ? 0 : '300px';
        chat.style.borderLeft = isParticipantsListHidden ? 'none' : '1px solid rgb(255 255 255 / 32%)';
        if (this.isChatPinned) elemDisplay(chat.id, isParticipantsListHidden);
        if (!this.isChatPinned) elemDisplay(chat.id, true);
        this.toggleChatHistorySize(isParticipantsListHidden && (this.isChatPinned || this.isChatMaximized));
        plist.style.width = this.isChatPinned || this.isMobileDevice ? '100%' : '300px';
        plist.style.position = this.isMobileDevice ? 'fixed' : 'absolute';
    }

    function   toggleChatHistorySize(this: any, max = true) {
        const chatHistory = this.getId('chatHistory');
        chatHistory.style.minHeight = max ? 'calc(100vh - 210px)' : '490px';
        chatHistory.style.maxHeight = max ? 'calc(100vh - 210px)' : '490px';
    }

    function toggleChatPin(this: any) {
        if (transcription.isPin()) {
            return userLog('info', 'Please unpin the transcription that appears to be currently pinned', 'top-end');
        }
        this.isChatPinned ? this.chatUnpin() : this.chatPin();
        this.sound('click');
    }

    function  chatMaximize(this: any) {
        this.isChatMaximized = true;
        hide(chatMaxButton);
        BUTTONS.chat.chatMaxButton && show(chatMinButton);
        this.chatCenter();
        document.documentElement.style.setProperty('--msger-width', '100%');
        document.documentElement.style.setProperty('--msger-height', '100%');
        this.toggleChatHistorySize(true);
    }

    function  chatMinimize(this: any) {
        this.isChatMaximized = false;
        hide(chatMinButton);
        BUTTONS.chat.chatMaxButton && show(chatMaxButton);
        if (this.isChatPinned) {
            this.chatPin();
        } else {
            this.chatCenter();
            document.documentElement.style.setProperty('--msger-width', '800px');
            document.documentElement.style.setProperty('--msger-height', '700px');
            this.toggleChatHistorySize(false);
        }
    }

    function chatPin(this: any) {
        if (!this.isVideoPinned) {
            this.videoMediaContainer.style.top = 0;
            this.videoMediaContainer.style.width = '75%';
            this.videoMediaContainer.style.height = '100%';
        }
        this.chatPinned();
        this.isChatPinned = true;
        setColor(chatTogglePin, 'lime');
        resizeVideoMedia();
        chatRoom.style.resize = 'none';
        if (!this.isMobileDevice) this.makeUnDraggable(chatRoom, chatHeader);
        if (this.isPlistOpen()) this.toggleShowParticipants();
        if (chatRoom.classList.contains('container')) chatRoom.classList.remove('container');
    }

    function chatUnpin(this: any) {
        if (!this.isVideoPinned) {
            this.videoMediaContainer.style.top = 0;
            this.videoMediaContainer.style.right = null;
            this.videoMediaContainer.style.width = '100%';
            this.videoMediaContainer.style.height = '100%';
        }
        document.documentElement.style.setProperty('--msger-width', '800px');
        document.documentElement.style.setProperty('--msger-height', '700px');
        hide(chatMinButton);
        BUTTONS.chat.chatMaxButton && show(chatMaxButton);
        this.chatCenter();
        this.isChatPinned = false;
        setColor(chatTogglePin, 'white');
        resizeVideoMedia();
        if (!this.isMobileDevice) this.makeDraggable(chatRoom, chatHeader);
        if (!this.isPlistOpen()) this.toggleShowParticipants();
        if (!chatRoom.classList.contains('container')) chatRoom.classList.add('container');
        resizeChatRoom();
    }

    function  chatCenter() {
        chatRoom.style.position = 'fixed';
        chatRoom.style.transform = 'translate(-50%, -50%)';
        chatRoom.style.top = '50%';
        chatRoom.style.left = '50%';
    }

    function chatPinned() {
        chatRoom.style.position = 'absolute';
        chatRoom.style.top = 0;
        chatRoom.style.right = 0;
        chatRoom.style.left = null;
        chatRoom.style.transform = null;
        document.documentElement.style.setProperty('--msger-width', '25%');
        document.documentElement.style.setProperty('--msger-height', '100%');
    }

    function  toggleChatEmoji(this: any) {
        this.getId('chatEmoji').classList.toggle('show');
        this.isChatEmojiOpen = this.isChatEmojiOpen ? false : true;
        this.getId('chatEmojiButton').style.color = this.isChatEmojiOpen ? '#FFFF00' : '#FFFFFF';
    }

   function addEmojiToMsg(this: any, data: { native: any; }) {
        msgerInput.value += data.native;
        this.toggleChatEmoji();
    }

   function cleanMessage() {
        chatMessage.value = '';
        chatMessage.setAttribute('rows', '1');
    }

   function pasteMessage() {
        navigator.clipboard
            .readText()
            .then((text) => {
                chatMessage.value += text;
                isChatPasteTxt = true;
                this.checkLineBreaks();
            })
            .catch((err) => {
                console.error('Failed to read clipboard contents: ', err);
            });
    }

  function  sendMessage(this: any) {
        if (!this.thereAreParticipants() && !isChatGPTOn) {
            this.cleanMessage();
            isChatPasteTxt = false;
            return this.userLog('info', 'No participants in the room', 'top-end');
        }

        // Prevent long messages
        if (this.chatMessageLengthCheck && chatMessage.value.length > this.chatMessageLength) {
            return this.userLog(
                'warning',
                `The message seems too long, with a maximum of ${this.chatMessageLength} characters allowed`,
                'top-end',
            );
        }

        // Spamming detected ban the user from the room
        if (this.chatMessageSpamCount == this.chatMessageSpamCountToBan) {
            return this.roomAction('isBanned', true);
        }

        // Prevent Spam messages
        const currentTime = Date.now();
        if (chatMessage.value && currentTime - this.chatMessageTimeLast <= this.chatMessageTimeBetween) {
            this.cleanMessage();
            chatMessage.readOnly = true;
            chatSendButton.disabled = true;
            setTimeout(function () {
                chatMessage.readOnly = false;
                chatSendButton.disabled = false;
            }, this.chatMessageNotifyDelay);
            this.chatMessageSpamCount++;
            return this.userLog(
                'warning',
                `Kindly refrain from spamming. Please wait ${this.chatMessageNotifyDelay / 1000} seconds before sending another message`,
                'top-end',
                this.chatMessageNotifyDelay,
            );
        }
        this.chatMessageTimeLast = currentTime;

        chatMessage.value = chatMessage.value.trim();
        const peer_msg = this.formatMsg(chatMessage.value);
        if (!peer_msg) {
            return this.cleanMessage();
        }
        this.peer_name = this.peer_name;

        const data = {
            room_id: this.room_id,
            peer_name: this.peer_name,
            peer_id: this.peer_id,
            to_peer_id: 'ChatGPT',
            to_peer_name: 'ChatGPT',
            peer_msg: peer_msg,
        };

        if (isChatGPTOn) {
            console.log('Send message:', data);
            this.socket.emit('message', data);
            this.setMsgAvatar('left', this.peer_name);
            this.appendMessage(
                'left',
                this.leftMsgAvatar,
                this.peer_name,
                this.peer_id,
                peer_msg,
                data.to_peer_id,
                data.to_peer_name,
            );
            this.cleanMessage();

            this.socket
                .request('getChatGPT', {
                    time: getDataTimeString(),
                    room: this.room_id,
                    name: this.peer_name,
                    prompt: peer_msg,
                    context: this.chatGPTContext,
                })
                .then((completion: { message: any; context: any; }) => {
                    if (!completion) return;
                    const { message, context } = completion;
                    this.chatGPTContext = context ? context : [];
                    console.log('Receive message:', message);
                    this.setMsgAvatar('right', 'ChatGPT');
                    this.appendMessage('right', image.chatgpt, 'ChatGPT', this.peer_id, message, 'ChatGPT', 'ChatGPT');
                    this.cleanMessage();
                    this.streamingTask(message); // Video AI avatar speak
                    this.speechInMessages ? this.speechMessage(true, 'ChatGPT', message) : this.sound('message');
                })
                .catch((err: any) => {
                    console.log('ChatGPT error:', err);
                });
        } else {
            const participantsList = this.getId('participantsList');
            const participantsListItems = participantsList.getElementsByTagName('li');
            for (let i = 0; i < participantsListItems.length; i++) {
                const li = participantsListItems[i];
                if (li.classList.contains('active')) {
                    data.to_peer_id = li.getAttribute('data-to-id');
                    data.to_peer_name = li.getAttribute('data-to-name');
                    console.log('Send message:', data);
                    this.socket.emit('message', data);
                    this.setMsgAvatar('left', this.peer_name);
                    this.appendMessage(
                        'left',
                        this.leftMsgAvatar,
                        this.peer_name,
                        this.peer_id,
                        peer_msg,
                        data.to_peer_id,
                        data.to_peer_name,
                    );
                    this.cleanMessage();
                }
            }
        }
    }

 function   sendMessageTo(this: any, to_peer_id: any, to_peer_name: any) {
        if (!this.thereAreParticipants()) {
            isChatPasteTxt = false;
            this.cleanMessage();
            return this.userLog('info', 'No participants in the room except you', 'top-end');
        }
        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.message,
            input: 'text',
            inputPlaceholder: '💬 Enter your message...',
            showCancelButton: true,
            confirmButtonText: `Send`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { value: string; }) => {
            if (result.value) {
                result.value = result.value.trim();
                let peer_msg = this.formatMsg(result.value);
                if (!peer_msg) {
                    return this.cleanMessage();
                }
                this.peer_name = this.peer_name;
                const toPeerName = to_peer_name;
                let data = {
                    peer_name: this.peer_name,
                    peer_id: this.peer_id,
                    to_peer_id: to_peer_id,
                    to_peer_name: toPeerName,
                    peer_msg: peer_msg,
                };
                console.log('Send message:', data);
                this.socket.emit('message', data);
                this.setMsgAvatar('left', this.peer_name);
                this.appendMessage(
                    'left',
                    this.leftMsgAvatar,
                    this.peer_name,
                    this.peer_id,
                    peer_msg,
                    to_peer_id,
                    toPeerName,
                );
                if (!this.isChatOpen) this.toggleChat();
            }
        });
    }

    async  function showMessage(this: any, data: { peer_name: any; peer_id: any; peer_msg: any; to_peer_id: string; to_peer_name: any; }) {
        if (!this.isChatOpen && this.showChatOnMessage) await this.toggleChat();
        this.setMsgAvatar('right', data.peer_name);
        this.appendMessage(
            'right',
            this.rightMsgAvatar,
            data.peer_name,
            data.peer_id,
            data.peer_msg,
            data.to_peer_id,
            data.to_peer_name,
        );
        if (!this.showChatOnMessage) {
            this.userLog('info', `💬 New message from: ${data.peer_name}`, 'top-end');
        }
        this.speechInMessages ? this.speechMessage(true, data.peer_name, data.peer_msg) : this.sound('message');
        //this.speechInMessages ? this.streamingTask(data.peer_msg) : this.sound('message');

        const participantsList = this.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');
        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            // INCOMING PRIVATE MESSAGE
            if (li.id === data.peer_id && data.to_peer_id != 'all') {
                li.classList.add('pulsate');
                if (!['all', 'ChatGPT'].includes(data.to_peer_id)) {
                    this.getId(`${data.peer_id}-unread-msg`).classList.remove('hidden');
                }
            }
        }
    }

   function setMsgAvatar(this: any, avatar: string, peerName: any) {
        let avatarImg = rc.isValidEmail(peerName) ? this.genGravatar(peerName) : this.genAvatarSvg(peerName, 32);
        avatar === 'left' ? (this.leftMsgAvatar = avatarImg) : (this.rightMsgAvatar = avatarImg);
    }

 function  appendMessage(this: any, side: any, img: any, fromName: any, fromId: any, msg: any, toId: any, toName: any) {

        const getSide = side;
        const getImg = img;
        const getFromName = fromName;
        const getFromId = fromId;
        const getMsg = msg;
        const getToId = toId;
        const getToName = toName;
        const time = this.getTimeNow();

        const myMessage = getSide === 'left';
        const messageClass = myMessage ? 'my-message' : 'other-message float-right';
        const messageData = myMessage ? 'text-start' : 'text-end';
        const timeAndName = myMessage
            ? `<span class="message-data-time">${time}, ${getFromName} ( me ) </span>`
            : `<span class="message-data-time">${time}, ${getFromName} </span>`;

        const speechButton = this.isSpeechSynthesisSupported
            ? `<button 
                    id="msg-speech-${chatMessagesId}" 
                    class="mr5" 
                    onclick="rc.speechMessage(false, '${getFromName}', '${this.formatMsg(getMsg)}')">
                    <i class="fas fa-volume-high"></i>
                </button>`
            : '';

        const positionFirst = myMessage
            ? `<img src="${getImg}" alt="avatar" />${timeAndName}`
            : `${timeAndName}<img src="${getImg}" alt="avatar" />`;

        const message = getFromName === 'ChatGPT' ? `<pre>${getMsg}</pre>` : getMsg;

        const newMessageHTML = `
            <li id="msg-${chatMessagesId}"  
                data-from-id="${getFromId}" 
                data-from-name="${getFromName}"
                data-to-id="${getToId}" 
                data-to-name="${getToName}"
                class="clearfix"
            >
                <div class="message-data ${messageData}">
                    ${positionFirst}
                </div>
                <div class="message ${messageClass}">
                    <span class="text-start " id="${chatMessagesId}">${message}</span>
                    <hr/>
                    <div class="about-buttons mt5">
                        <button 
                            id="msg-copy-${chatMessagesId}" 
                            class="mr5" 
                            onclick="rc.copyToClipboard('${chatMessagesId}')">
                            <i class="fas fa-paste"></i>
                        </button>
                        ${speechButton}
                        <button 
                            id="msg-delete-${chatMessagesId}"   
                            class="mr5" 
                            onclick="rc.deleteMessage('msg-${chatMessagesId}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </li>
        `;

        this.collectMessages(time, getFromName, getMsg);

        console.log('Append message to:', { to_id: getToId, to_name: getToName });

        switch (getToId) {
            case 'ChatGPT':
                chatGPTMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
            case 'all':
                chatPublicMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
            default:
                chatPrivateMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
        }

        chatHistory.scrollTop += 500;

        if (!this.isMobileDevice) {
            this.setTippy('msg-delete-' + chatMessagesId, 'Delete', 'top');
            this.setTippy('msg-copy-' + chatMessagesId, 'Copy', 'top');
            this.setTippy('msg-speech-' + chatMessagesId, 'Speech', 'top');
        }

        chatMessagesId++;
    }

 function  deleteMessage(id: any) {
        Swal.fire({
            background: swalBackground,
            position: 'center',
            title: 'Delete this Message?',
            imageUrl: image.delete,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                this.getId(id).remove();
                this.sound('delete');
            }
        });
    }

   function copyToClipboard(this: any, id: any) {
        const text = this.getId(id).innerText;
        navigator.clipboard
            .writeText(text)
            .then(() => {
                this.userLog('success', 'Message copied!', 'top-end', 1000);
            })
            .catch((err) => {
                this.userLog('error', err, 'top-end', 6000);
            });
    }

   function formatMsg(this: any, msg: any) {
        const message = msg;
        if (message.trim().length == 0) return;
        if (this.isHtml(message)) return this.sanitizeHtml(message);
        if (this.isValidHttpURL(message)) {
            if (this.isImageURL(message)) return this.getImage(message);
            //if (this.isVideoTypeSupported(message)) return this.getIframe(message);
            return this.getLink(message);
        }
        if (isChatMarkdownOn) return marked.parse(message);
        if (isChatPasteTxt && this.getLineBreaks(message) > 1) {
            isChatPasteTxt = false;
            return this.getPre(message);
        }
        if (this.getLineBreaks(message) > 1) return this.getPre(message);
        console.log('FormatMsg', message);
        return message;
    }

  function  sanitizeHtml(input: string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '/': '&#x2F;',
        };
        return input.replace(/[&<>"'/]/g, (m: string | number) => map[m]);
    }

  function  isHtml(str: string) {
        var a = document.createElement('div');
        a.innerHTML = str;
        for (var c = a.childNodes, i = c.length; i--; ) {
            if (c[i].nodeType == 1) return true;
        }
        return false;
    }

 function   isValidHttpURL(input: string) {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$',
            'i',
        ); // fragment locator
        return pattern.test(input);
    }

  function  isImageURL(input: string): boolean {
        return input.match(/\.(jpeg|jpg|gif|png|tiff|bmp)$/) != null;
    }

  function  getImage(input: string): string{
        const url = input;
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute('src', url);
        img.setAttribute('width', '200px');
        img.setAttribute('height', 'auto');
        div.appendChild(img);
        console.log('GetImg', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

  function  getLink(input: any) {
        const url = input;
        const a = document.createElement('a');
        const div = document.createElement('div');
        const linkText = document.createTextNode(url);
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.appendChild(linkText);
        div.appendChild(a);
        console.log('GetLink', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

  function  getPre(input: any) {
        const text = input;
        const pre = document.createElement('pre');
        const div = document.createElement('div');
        pre.textContent = text;
        div.appendChild(pre);
        console.log('GetPre', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

 function   getIframe(this: any, input: any) {
        const url = input;
        const iframe = document.createElement('iframe');
        const div = document.createElement('div');
        const is_youtube = this.getVideoType(url) == 'na' ? true : false;
        const video_audio_url = is_youtube ? this.getYoutubeEmbed(url) : url;
        iframe.setAttribute('title', 'Chat-IFrame');
        iframe.setAttribute('src', video_audio_url);
        iframe.setAttribute('width', 'auto');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute(
            'allow',
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        );
        iframe.setAttribute('allowfullscreen', 'allowfullscreen');
        div.appendChild(iframe);
        console.log('GetIFrame', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    function   getLineBreaks(message: string) {
        return (message.match(/\n/g) || []).length;
    }

    function    checkLineBreaks(this: any): void {
        chatMessage.style.height = '';
        if (this.getLineBreaks(chatMessage.value) > 0 || chatMessage.value.length > 50) {
            chatMessage.setAttribute('rows', '2');
        }
    }

    function    collectMessages(this: any, time: any, from: any, msg: any) {
        this.chatMessages.push({
            time: time,
            from: from,
            msg: msg,
        });
    }

    function   speechMessage(newMsg = true, from: string, msg: string) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = (newMsg ? 'New' : '') + ' message from:' + from + '. The message is:' + msg;
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    }

    function   speechText(msg: string) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = msg;
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    }

    function  chatToggleBg(this: any) {
        this.isChatBgTransparent = !this.isChatBgTransparent;
        this.isChatBgTransparent
            ? document.documentElement.style.setProperty('--msger-bg', 'rgba(0, 0, 0, 0.100)')
            : setTheme();
    }

    function  chatClean(this: any) {
        if (this.chatMessages.length === 0) {
            return userLog('info', 'No chat messages to clean', 'top-end');
        }
        Swal.fire({
            background: swalBackground,
            position: 'center',
            title: 'Clean up all chat Messages?',
            imageUrl: image.delete,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                function removeAllChildNodes(parentNode: { firstChild: any; removeChild: (arg0: any) => void; }) {
                    while (parentNode.firstChild) {
                        parentNode.removeChild(parentNode.firstChild);
                    }
                }
                // Remove child nodes from different message containers
                removeAllChildNodes(chatGPTMessages);
                removeAllChildNodes(chatPublicMessages);
                removeAllChildNodes(chatPrivateMessages);
                this.chatMessages = [];
                this.chatGPTContext = [];
                this.sound('delete');
            }
        });
    }

    function   chatSave(this: any) {
        if (this.chatMessages.length === 0) {
            return userLog('info', 'No chat messages to save', 'top-end');
        }
        saveObjToJsonFile(this.chatMessages, 'CHAT');
    }

    // ####################################################
    // RECORDING
    // ####################################################

    function    handleRecordingError(this: any, error: any, popupLog = true) {
        console.error('Recording error', error);
        if (popupLog) this.userLog('error', error, 'top-end', 6000);
    }

    function  getSupportedMimeTypes() {
        const possibleTypes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/mp4'];
        possibleTypes.splice(recPrioritizeH264 ? 0 : 2, 0, 'video/mp4;codecs=h264,aac', 'video/webm;codecs=h264,opus');
        console.log('POSSIBLE CODECS', possibleTypes);
        return possibleTypes.filter((mimeType) => {
            return MediaRecorder.isTypeSupported(mimeType);
        });
    }

    function    startRecording(this: any) {
        recordedBlobs = [];

        // Get supported MIME types and set options
        const supportedMimeTypes = this.getSupportedMimeTypes();
        console.log('MediaRecorder supported options', supportedMimeTypes);
        const options = { mimeType: supportedMimeTypes[0] };

        recCodecs = supportedMimeTypes[0];

        try {
            this.audioRecorder = new MixedAudioRecorder();
            const audioStreams = this.getAudioStreamFromAudioElements();
            console.log('Audio streams tracks --->', audioStreams.getTracks());

            const audioMixerStreams = this.audioRecorder.getMixedAudioStream(
                audioStreams
                    .getTracks()
                    .filter((track: { kind: string; }) => track.kind === 'audio')
                    .map((track: MediaStreamTrack) => new MediaStream([track])),
            );

            const audioMixerTracks = audioMixerStreams.getTracks();
            console.log('Audio mixer tracks --->', audioMixerTracks);

            this.isMobileDevice
                ? this.startMobileRecording(options, audioMixerTracks)
                : this.recordingOptions(options, audioMixerTracks);
        } catch (err) {
            this.handleRecordingError('Exception while creating MediaRecorder: ' + err);
        }
    }

    function  recordingOptions(options: any, audioMixerTracks: any) {
        Swal.fire({
            background: swalBackground,
            position: 'top',
            imageUrl: image.recording,
            title: 'Recording options',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonColor: 'red',
            denyButtonColor: 'green',
            confirmButtonText: `Camera`,
            denyButtonText: `Screen/Window`,
            cancelButtonText: `Cancel`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; isDenied: any; }) => {
            if (result.isConfirmed) {
                this.startMobileRecording(options, audioMixerTracks);
            } else if (result.isDenied) {
                this.startDesktopRecording(options, audioMixerTracks);
            }
        });
    }

    function   startMobileRecording(this: any, options: MediaRecorderOptions | undefined, audioMixerTracks: any) {
        try {
            // Combine audioMixerTracks and videoTracks into a single array
            const combinedTracks = [];

            if (Array.isArray(audioMixerTracks)) {
                combinedTracks.push(...audioMixerTracks);
            }

            if (this.localVideoStream !== null) {
                const videoTracks = this.localVideoStream.getVideoTracks();
                console.log('Cam video tracks --->', videoTracks);

                if (Array.isArray(videoTracks)) {
                    combinedTracks.push(...videoTracks);
                }
            }

            const recCamStream = new MediaStream(combinedTracks);
            console.log('New Cam Media Stream tracks  --->', recCamStream.getTracks());

            this.mediaRecorder = new MediaRecorder(recCamStream, options);
            console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);

            this.getId('swapCameraButton').className = 'hidden';

            this.initRecording();
        } catch (err) {
            this.handleRecordingError('Unable to record the camera + audio: ' + err, false);
        }
    }

    function   startDesktopRecording(options: MediaRecorderOptions | undefined, audioMixerTracks: any) {
        // On desktop devices, record camera or screen/window... + all audio tracks
        const constraints = { video: true };
        navigator.mediaDevices
            .getDisplayMedia(constraints)
            .then((screenStream) => {
                const screenTracks = screenStream.getVideoTracks();
                console.log('Screen video tracks --->', screenTracks);

                const combinedTracks = [];

                if (Array.isArray(screenTracks)) {
                    combinedTracks.push(...screenTracks);
                }
                if (Array.isArray(audioMixerTracks)) {
                    combinedTracks.push(...audioMixerTracks);
                }

                const recScreenStream = new MediaStream(combinedTracks);
                console.log('New Screen/Window Media Stream tracks  --->', recScreenStream.getTracks());

                this.recScreenStream = recScreenStream;
                this.mediaRecorder = new MediaRecorder(recScreenStream, options);
                console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options);

                this.initRecording();
            })
            .catch((err) => {
                this.handleRecordingError('Unable to record the screen + audio: ' + err, false);
            });
    }

    function   initRecording(this: any) {
        this._isRecording = true;
        this.handleMediaRecorder();
        this.event(_EVENTS.startRec);
        this.recordingAction(enums.recording.start);
        this.sound('recStart');
    }

    function   hasAudioTrack(mediaStream: { getAudioTracks: () => any; }) {
        if (!mediaStream) return false;
        const audioTracks = mediaStream.getAudioTracks();
        return audioTracks.length > 0;
    }

    function   hasVideoTrack(mediaStream: { getVideoTracks: () => any; }) {
        if (!mediaStream) return false;
        const videoTracks = mediaStream.getVideoTracks();
        return videoTracks.length > 0;
    }

    function   getAudioTracksFromAudioElements() {
        const audioElements = document.querySelectorAll('audio');
        const audioTracks: any[] = [];
        audioElements.forEach((audio) => {
            const audioTrack = audio.srcObject.getAudioTracks()[0];
            if (audioTrack) {
                audioTracks.push(audioTrack);
            }
        });
        return audioTracks;
    }

    function  getAudioStreamFromAudioElements() {
        const audioElements = document.querySelectorAll('audio');
        const audioStream = new MediaStream();
        audioElements.forEach((audio) => {
            const audioTrack = audio.srcObject.getAudioTracks()[0];
            if (audioTrack) {
                audioStream.addTrack(audioTrack);
            }
        });
        return audioStream;
    }

    function  handleMediaRecorder(this: any) {
        if (this.mediaRecorder) {
            this.recServerFileName = this.getServerRecFileName();
            rc.recSyncServerRecording ? this.mediaRecorder.start(this.recSyncTime) : this.mediaRecorder.start();
            this.mediaRecorder.addEventListener('start', this.handleMediaRecorderStart);
            this.mediaRecorder.addEventListener('dataavailable', this.handleMediaRecorderData);
            this.mediaRecorder.addEventListener('stop', this.handleMediaRecorderStop);
        }
    }

    function  getServerRecFileName(this: any) {
        const dateTime = getDataTimeStringFormat();
        const roomName = this.room_id.trim();
        return `Rec_${roomName}_${dateTime}.webm`;
    }

    function  handleMediaRecorderStart(evt: any) {
        console.log('MediaRecorder started: ', evt);
        rc.cleanLastRecordingInfo();
        rc.disableRecordingOptions();
    }

    function  handleMediaRecorderData(evt: { data: { size: number; }; }) {
        // console.log('MediaRecorder data: ', evt);
        if (evt.data && evt.data.size > 0) {
            rc.recSyncServerRecording ? rc.syncRecordingInCloud(evt.data) : recordedBlobs.push(evt.data);
        }
    }

    async function syncRecordingInCloud(data: { arrayBuffer: () => any; }) {
        const arrayBuffer = await data.arrayBuffer();
        const chunkSize = rc.recSyncChunkSize;
        const totalChunks = Math.ceil(arrayBuffer.byteLength / chunkSize);
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const chunk = arrayBuffer.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);
            try {
                await axios.post('/recSync?fileName=' + rc.recServerFileName, chunk, {
                    headers: {
                        'Content-Type': 'application/octet-stream',
                    },
                });
            } catch (error) {
                console.error('Error syncing chunk:', error.message);
            }
        }
    }

    function   handleMediaRecorderStop(evt: any) {
        try {
            console.log('MediaRecorder stopped: ', evt);
            rc.recSyncServerRecording ? rc.handleServerRecordingStop() : rc.handleLocalRecordingStop();
            rc.disableRecordingOptions(false);
        } catch (err) {
            console.error('Recording save failed', err);
        }
    }

    function disableRecordingOptions(disabled = true) {
        switchH264Recording.disabled = disabled;
        switchServerRecording.disabled = disabled;
        switchHostOnlyRecording.disabled = disabled;
    }

    function handleLocalRecordingStop(this: any) {

        const dateTime = getDataTimeString();
        const type = recordedBlobs[0].type.includes('mp4') ? 'mp4' : 'webm';
        const blob = new Blob(recordedBlobs, { type: 'video/' + type });
        const recFileName = `Rec_${dateTime}.${type}`;
        const currentDevice = DetectRTC.isMobileDevice ? 'MOBILE' : 'PC';
        const blobFileSize = bytesToSize(blob.size);
        const recTime = document.getElementById('recordingStatus');
        const recType = 'Locally';
        const recordingInfo = `
        <br/><br/>
        <ul>
            <li>Stored: ${recType}</li>
            <li>Time: ${recTime.innerText}</li>
            <li>File: ${recFileName}</li>
            <li>Codecs: ${recCodecs}</li>
            <li>Size: ${blobFileSize}</li>
        </ul>
        <br/>
        `;
        const recordingMsg = `Please wait to be processed, then will be downloaded to your ${currentDevice} device.`;

        this.saveLastRecordingInfo(recordingInfo);
        this.showRecordingInfo(recType, recordingInfo, recordingMsg);
        this.saveRecordingInLocalDevice(blob, recFileName, recTime);
    }

    function   handleServerRecordingStop(this: any) {
        console.log('MediaRecorder Stop');
        const recTime = document.getElementById('recordingStatus');
        const recType = 'Server';
        const recordingInfo = `
        <br/><br/>
        <ul>
            <li>Stored: ${recType}</li>
            <li>Time: ${recTime.innerText}</li>
            <li>File: ${this.recServerFileName}</li>
            <li>Codecs: ${recCodecs}</li>
        </ul>
        <br/>
        `;
        this.saveLastRecordingInfo(recordingInfo);
        this.showRecordingInfo(recType, recordingInfo);
    }

    function saveLastRecordingInfo(recordingInfo: any) {
        const lastRecordingInfo = document.getElementById('lastRecordingInfo');
        lastRecordingInfo.style.color = '#FFFFFF';
        lastRecordingInfo.innerHTML = `Last Recording Info: ${recordingInfo}`;
        show(lastRecordingInfo);
    }

    function cleanLastRecordingInfo() {
        const lastRecordingInfo = document.getElementById('lastRecordingInfo');
        lastRecordingInfo.innerHTML = '';
        hide(lastRecordingInfo);
    }

    function  showRecordingInfo(recType: any, recordingInfo: any, recordingMsg = '') {
        if (window.localStorage.isReconnected === 'false') {
            Swal.fire({
                background: swalBackground,
                position: 'center',
                icon: 'success',
                title: 'Recording',
                html: `<div style="text-align: left;">
                🔴 ${recType} Recording Info: 
                ${recordingInfo}
                ${recordingMsg}
                </div>`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
        }
    }

    function   saveRecordingInLocalDevice(blob: Blob | MediaSource, recFileName: string, recTime: { innerText: string; }) {
        console.log('MediaRecorder Download Blobs');
        const url = window.URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.style.display = 'none';
        downloadLink.href = url;
        downloadLink.download = recFileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();

        setTimeout(() => {
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(url);
            console.log(`🔴 Recording FILE: ${recFileName} done 👍`);
            recordedBlobs = [];
            recTime.innerText = '0s';
        }, 100);
    }

    function  pauseRecording(this: any) {
        if (this.mediaRecorder) {
            this._isRecording = false;
            this.mediaRecorder.pause();
            this.event(_EVENTS.pauseRec);
            this.recordingAction('Pause recording');
        }
    }

    function   resumeRecording(this: any) {
        if (this.mediaRecorder) {
            this._isRecording = true;
            this.mediaRecorder.resume();
            this.event(_EVENTS.resumeRec);
            this.recordingAction('Resume recording');
        }
    }

    function   stopRecording(this: any) {
        if (this.mediaRecorder) {
            this._isRecording = false;
            this.mediaRecorder.stop();
            this.mediaRecorder = null;
            if (this.recScreenStream) {
                this.recScreenStream.getTracks().forEach((track: { kind: string; stop: () => void; }) => {
                    if (track.kind === 'video') track.stop();
                });
            }
            if (this.isMobileDevice) this.getId('swapCameraButton').className = '';
            this.event(_EVENTS.stopRec);
            this.audioRecorder.stopMixedAudioStream();
            this.recordingAction(enums.recording.stop);
            this.sound('recStop');
        }
    }

    function   recordingAction(this: any, action: any) {
        if (!this.thereAreParticipants()) return;
        this.socket.emit('recordingAction', {
            peer_name: this.peer_name,
            peer_id: this.peer_id,
            action: action,
        });
    }

    function   handleRecordingAction(this: any, data: { peer_name: any; peer_id: any; action: any; }) {
        console.log('Handle recording action', data);

        const { peer_name, peer_id, action } = data;

        const recAction = {
            side: 'left',
            img: this.leftMsgAvatar,
            peer_name: peer_name,
            peer_id: peer_id,
            peer_msg: `🔴 ${action}`,
            to_peer_id: 'all',
            to_peer_name: 'all',
        };
        this.showMessage(recAction);

        const recData = {
            type: 'recording',
            action: action,
            peer_name: peer_name,
        };

        this.msgHTML(
            recData,
            null,
            image.recording,
            null,
            `${icons.user} ${peer_name} 
            <br /><br /> 
            <span>🔴 ${action}</span>
            <br />`,
        );
    }

    function  saveRecording(this: any, reason: any) {
        if (this._isRecording || recordingStatus.innerText != '0s') {
            console.log(`Save recording: ${reason}`);
            this.stopRecording();
        }
    }

    // ####################################################
    // FILE SHARING
    // ####################################################

    function  handleSF(this: any, uid: string) {
        const words = uid.split('___');
        let peer_id = words[1];
        let btnSf = this.getId(uid);
        if (btnSf) {
            btnSf.addEventListener('click', () => {
                this.selectFileToShare(peer_id);
            });
        }
    }

    function   handleDD(this: any, uid: any, peer_id: any, itsMe = false) {
        let videoPlayer = this.getId(uid);
        if (videoPlayer) {
            videoPlayer.addEventListener('dragover', function (e: { preventDefault: () => void; }) {
                e.preventDefault();
            });
            videoPlayer.addEventListener('drop', function (e: { preventDefault: () => void; dataTransfer: { items: string | any[]; files: any[]; }; }) {
                e.preventDefault();
                if (itsMe) {
                    return userLog('warning', 'You cannot send files to yourself.', 'top-end');
                }
                if (this.sendInProgress) {
                    return userLog('warning', 'Please wait for the previous file to be sent.', 'top-end');
                }
                if (e.dataTransfer.items && e.dataTransfer.items.length > 1) {
                    return userLog('warning', 'Please drag and drop a single file.', 'top-end');
                }
                if (e.dataTransfer.items) {
                    let item = e.dataTransfer.items[0].webkitGetAsEntry();
                    console.log('Drag and drop', item);
                    if (item.isDirectory) {
                        return userLog('warning', 'Please drag and drop a single file not a folder.', 'top-end');
                    }
                    var file = e.dataTransfer.items[0].getAsFile();
                    rc.sendFileInformations(file, peer_id);
                } else {
                    rc.sendFileInformations(e.dataTransfer.files[0], peer_id);
                }
            });
        }
    }

    function   selectFileToShare(this: any, peer_id: any, broadcast = false) {
        this.sound('open');

        Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            imageAlt: 'mirotalksfu-file-sharing',
            imageUrl: image.share,
            position: 'center',
            title: 'Share file',
            input: 'file',
            inputAttributes: {
                accept: this.fileSharingInput,
                'aria-label': 'Select file',
            },
            showDenyButton: true,
            confirmButtonText: `Send`,
            denyButtonText: `Cancel`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; value: any; }) => {
            if (result.isConfirmed) {
                this.sendFileInformations(result.value, peer_id, broadcast);
            }
        });
    }

    function  sendFileInformations(this: any, file: any, peer_id: any, broadcast = false) {
        this.fileToSend = file;
        //
        if (this.fileToSend && this.fileToSend.size > 0) {
            if (!this.thereAreParticipants()) {
                return userLog('info', 'No participants detected', 'top-end');
            }
            // prevent XSS injection
            if (this.isHtml(this.fileToSend.name) || !this.isValidFileName(this.fileToSend.name))
                return userLog('warning', 'Invalid file name!', 'top-end', 5000);

            const fileInfo = {
                peer_id: peer_id,
                broadcast: broadcast,
                peer_name: this.peer_name,
                fileName: this.fileToSend.name,
                fileSize: this.fileToSend.size,
                fileType: this.fileToSend.type,
            };
            this.setMsgAvatar('left', this.peer_name);
            this.appendMessage(
                'left',
                this.leftMsgAvatar,
                this.peer_name,
                this.peer_id,
                `${icons.fileSend} File send: 
                <br/> 
                <ul>
                    <li>Name: ${this.fileToSend.name}</li>
                    <li>Size: ${this.bytesToSize(this.fileToSend.size)}</li>
                </ul>`,
                'all',
                'all',
            );
            // send some metadata about our file to peers in the room
            this.socket.emit('fileInfo', fileInfo);
            setTimeout(() => {
                this.sendFileData(peer_id, broadcast);
            }, 1000);
        } else {
            userLog('error', 'File not selected or empty.', 'top-end');
        }
    }

    function    handleFileInfo(this: any, data: any) {
        this.incomingFileInfo = data;
        this.incomingFileData = [];
        this.receiveBuffer = [];
        this.receivedSize = 0;
        let fileToReceiveInfo =
            ' From: ' +
            this.incomingFileInfo.peer_name +
            html.newline +
            ' Incoming file: ' +
            this.incomingFileInfo.fileName +
            html.newline +
            ' File type: ' +
            this.incomingFileInfo.fileType +
            html.newline +
            ' File size: ' +
            this.bytesToSize(this.incomingFileInfo.fileSize);
        this.setMsgAvatar('right', this.incomingFileInfo.peer_name);
        this.appendMessage(
            'right',
            this.rightMsgAvatar,
            this.incomingFileInfo.peer_name,
            this.incomingFileInfo.peer_id,
            `${icons.fileReceive} File receive: 
            <br/> 
            <ul>
                <li>From: ${this.incomingFileInfo.peer_name}</li>
                <li>Name: ${this.incomingFileInfo.fileName}</li>
                <li>Size: ${this.bytesToSize(this.incomingFileInfo.fileSize)}</li>
            </ul>`,
            'all',
            'all',
        );
        receiveFileInfo.innerText = fileToReceiveInfo;
        receiveFileDiv.style.display = 'inline';
        receiveProgress.max = this.incomingFileInfo.fileSize;
        this.userLog('info', fileToReceiveInfo, 'top-end');
        this.receiveInProgress = true;
    }

    function  sendFileData(this: any, peer_id: any, broadcast: any) {
        console.log('Send file ', {
            name: this.fileToSend.name,
            size: this.bytesToSize(this.fileToSend.size),
            type: this.fileToSend.type,
        });

        this.sendInProgress = true;

        sendFileInfo.innerText =
            'File name: ' +
            this.fileToSend.name +
            html.newline +
            'File type: ' +
            this.fileToSend.type +
            html.newline +
            'File size: ' +
            this.bytesToSize(this.fileToSend.size) +
            html.newline;

        sendFileDiv.style.display = 'inline';
        sendProgress.max = this.fileToSend.size;

        this.fileReader = new FileReader();
        let offset = 0;

        this.fileReader.addEventListener('error', (err: any) => console.error('fileReader error', err));
        this.fileReader.addEventListener('abort', (e: any) => console.log('fileReader aborted', e));
        this.fileReader.addEventListener('load', (e: { target: { result: any; }; }) => {
            if (!this.sendInProgress) return;

            let data = {
                peer_id: peer_id,
                broadcast: broadcast,
                fileData: e.target.result,
            };
            this.sendFSData(data);
            offset += data.fileData.byteLength;

            sendProgress.value = offset;
            sendFilePercentage.innerText = 'Send progress: ' + ((offset / this.fileToSend.size) * 100).toFixed(2) + '%';

            // send file completed
            if (offset === this.fileToSend.size) {
                this.sendInProgress = false;
                sendFileDiv.style.display = 'none';
                userLog('success', 'The file ' + this.fileToSend.name + ' was sent successfully.', 'top-end');
            }

            if (offset < this.fileToSend.size) readSlice(offset);
        });
        const readSlice = (o: number) => {
            const slice = this.fileToSend.slice(offset, o + this.chunkSize);
            this.fileReader.readAsArrayBuffer(slice);
        };
        readSlice(0);
    }

    function  sendFSData(this: any, data: any) {
        if (data) this.socket.emit('file', data);
    }

    function  abortFileTransfer(this: any) {
        if (this.fileReader && this.fileReader.readyState === 1) {
            this.fileReader.abort();
            sendFileDiv.style.display = 'none';
            this.sendInProgress = false;
            this.socket.emit('fileAbort', {
                peer_name: this.peer_name,
            });
        }
    }

    function   hideFileTransfer() {
        receiveFileDiv.style.display = 'none';
    }

    function   handleFileAbort(this: any, data: { peer_name: string; }) {
        this.receiveBuffer = [];
        this.incomingFileData = [];
        this.receivedSize = 0;
        this.receiveInProgress = false;
        receiveFileDiv.style.display = 'none';
        console.log(data.peer_name + ' aborted the file transfer');
        userLog('info', data.peer_name + ' ⚠️ aborted the file transfer', 'top-end');
    }

    function   handleFile(this: any, data: { fileData: { byteLength: any; }; }) {
        if (!this.receiveInProgress) return;
        this.receiveBuffer.push(data.fileData);
        this.receivedSize += data.fileData.byteLength;
        receiveProgress.value = this.receivedSize;
        receiveFilePercentage.innerText =
            'Receive progress: ' + ((this.receivedSize / this.incomingFileInfo.fileSize) * 100).toFixed(2) + '%';
        if (this.receivedSize === this.incomingFileInfo.fileSize) {
            receiveFileDiv.style.display = 'none';
            this.incomingFileData = this.receiveBuffer;
            this.receiveBuffer = [];
            this.endFileDownload();
        }
    }

    function  endFileDownload(this: any) {
        this.sound('download');

        // save received file into Blob
        const blob = new Blob(this.incomingFileData);
        const file = this.incomingFileInfo.fileName;

        this.incomingFileData = [];

        // if file is image, show the preview
        if (isImageURL(this.incomingFileInfo.fileName)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    allowOutsideClick: false,
                    background: swalBackground,
                    position: 'center',
                    title: 'Received file',
                    text: this.incomingFileInfo.fileName + ' size ' + this.bytesToSize(this.incomingFileInfo.fileSize),
                    imageUrl: e.target.result,
                    imageAlt: 'mirotalksfu-file-img-download',
                    showDenyButton: true,
                    confirmButtonText: `Save`,
                    denyButtonText: `Cancel`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                }).then((result: { isConfirmed: any; }) => {
                    if (result.isConfirmed) this.saveBlobToFile(blob, file);
                });
            };
            // blob where is stored downloaded file
            reader.readAsDataURL(blob);
        } else {
            // not img file
            Swal.fire({
                allowOutsideClick: false,
                background: swalBackground,
                position: 'center',
                title: 'Received file',
                text: this.incomingFileInfo.fileName + ' size ' + this.bytesToSize(this.incomingFileInfo.fileSize),
                showDenyButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Cancel`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result: { isConfirmed: any; }) => {
                if (result.isConfirmed) this.saveBlobToFile(blob, file);
            });
        }
    }

    function saveBlobToFile(blob: Blob | MediaSource, file: string) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
    function  bytesToSize(bytes: number) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    function   toHtmlJson(obj: any) {
        return '<pre>' + JSON.stringify(obj, null, 4) + '</pre>';
    }

    function   isValidFileName(fileName: string) {
        const invalidChars = /[\\\/\?\*\|:"<>]/;
        return !invalidChars.test(fileName);
    }

    // ####################################################
    // SHARE VIDEO YOUTUBE - MP4 - WEBM - OGG or AUDIO mp3
    // ####################################################

    function  handleSV(this: any, uid: string) {
        const words = uid.split('___');
        let peer_id = words[1];
        let btnSv = this.getId(uid);
        if (btnSv) {
            btnSv.addEventListener('click', () => {
                this.shareVideo(peer_id);
            });
        }
    }

    function   shareVideo(this: any, peer_id = 'all') {
        this.sound('open');

        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.videoShare,
            title: 'Share a Video or Audio',
            text: 'Paste a Video or Audio URL',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: `Share`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { value: any; }) => {
            if (result.value) {
                result.value = result.value;
                if (!this.thereAreParticipants()) {
                    return userLog('info', 'No participants detected', 'top-end');
                }
                if (!this.isVideoTypeSupported(result.value)) {
                    return userLog('warning', 'Something wrong, try with another Video or audio URL');
                }
                /*
                    https://www.youtube.com/watch?v=RT6_Id5-7-s
                    https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
                    https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3
                */
                let is_youtube = this.getVideoType(result.value) == 'na' ? true : false;
                let video_url = is_youtube ? this.getYoutubeEmbed(result.value) : result.value;
                if (video_url) {
                    let data = {
                        peer_id: peer_id,
                        peer_name: this.peer_name,
                        video_url: video_url,
                        is_youtube: is_youtube,
                        action: 'open',
                    };
                    console.log('Video URL: ', video_url);
                    this.socket.emit('shareVideoAction', data);
                    this.openVideo(data);
                } else {
                    this.userLog('error', 'Not valid video URL', 'top-end', 6000);
                }
            }
        });
    }

    function   getVideoType(url: string) {
        if (url.endsWith('.mp4')) return 'video/mp4';
        if (url.endsWith('.mp3')) return 'video/mp3';
        if (url.endsWith('.webm')) return 'video/webm';
        if (url.endsWith('.ogg')) return 'video/ogg';
        return 'na';
    }

    function  isVideoTypeSupported(url: string) {
        if (
            url.endsWith('.mp4') ||
            url.endsWith('.mp3') ||
            url.endsWith('.webm') ||
            url.endsWith('.ogg') ||
            url.includes('youtube.com')
        )
            return true;
        return false;
    }

    function   getYoutubeEmbed(url: string) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = url.match(regExp);
        return match && match[7].length == 11 ? 'https://www.youtube.com/embed/' + match[7] + '?autoplay=1' : false;
    }

    function   shareVideoAction(this: any, data: { peer_name: any; action: any; }) {
        let peer_name = data.peer_name;
        let action = data.action;
        switch (action) {
            case 'open':
                this.userLog('info', `${peer_name} <i class="fab fa-youtube"></i> opened the video`, 'top-end');
                this.openVideo(data);
                break;
            case 'close':
                this.userLog('info', `${peer_name} <i class="fab fa-youtube"></i> closed the video`, 'top-end');
                this.closeVideo();
                break;
            default:
                break;
        }
    }

    function  openVideo(this: any, data: { peer_name: any; video_url: any; is_youtube: any; }) {
               let d, vb, e, video, pn;
        let peer_name = data.peer_name;
        let video_url = data.video_url;
        let is_youtube = data.is_youtube;
        let video_type = this.getVideoType(video_url);
        this.closeVideo();
        show(videoCloseBtn);
        d = document.createElement('div');
        d.className = 'Camera';
        d.id = '__shareVideo';
        vb = document.createElement('div');
        vb.setAttribute('id', '__videoBar');
        vb.className = 'videoMenuBar fadein';
        e = document.createElement('button');
        e.className = 'fas fa-times';
        e.id = '__videoExit';
        pn = document.createElement('button');
        pn.id = '__pinUnpin';
        pn.className = html.pin;
        if (is_youtube) {
            video = document.createElement('iframe');
            video.setAttribute('title', peer_name);
            video.setAttribute(
                'allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
            );
            video.setAttribute('frameborder', '0');
            video.setAttribute('allowfullscreen', true);
        } else {
            video = document.createElement('video');
            video.type = video_type;
            video.autoplay = true;
            video.controls = true;
            if (video_type == 'video/mp3') {
                video.poster = image.audio;
            }
        }
        video.setAttribute('id', '__videoShare');
        video.setAttribute('src', video_url);
        video.setAttribute('width', '100%');
        video.setAttribute('height', '100%');
        vb.appendChild(e);
        if (!this.isMobileDevice) vb.appendChild(pn);
        d.appendChild(video);
        d.appendChild(vb);
        this.videoMediaContainer.appendChild(d);
        handleAspectRatio();
        let exitVideoBtn = this.getId(e.id);
        exitVideoBtn.addEventListener('click', (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            this.closeVideo(true);
        });
        this.handlePN(video.id, pn.id, d.id);
        if (!this.isMobileDevice) {
            this.setTippy(pn.id, 'Toggle Pin video player', 'bottom');
            this.setTippy(e.id, 'Close video player', 'bottom');
        }
        console.log('[openVideo] Video-element-count', this.videoMediaContainer.childElementCount);
        this.sound('joined');
    }

    function   closeVideo(this: any, emit = false, peer_id = 'all') {
        if (emit) {
            let data = {
                peer_id: peer_id,
                peer_name: this.peer_name,
                action: 'close',
            };
            this.socket.emit('shareVideoAction', data);
        }
        let shareVideoDiv = this.getId('__shareVideo');
        if (shareVideoDiv) {
            hide(videoCloseBtn);
            shareVideoDiv.parentNode.removeChild(shareVideoDiv);
            //alert(this.isVideoPinned + ' - ' + this.pinnedVideoPlayerId);
            if (this.isVideoPinned && this.pinnedVideoPlayerId == '__videoShare') {
                this.removeVideoPinMediaContainer();
                console.log('Remove pin container due the Video player close');
            }
            handleAspectRatio();
            console.log('[closeVideo] Video-element-count', this.videoMediaContainer.childElementCount);
            this.sound('left');
        }
    }

    // ####################################################
    // ROOM ACTION
    // ####################################################

    function   roomAction(this: any, action: any, emit = true, popup = true) {
        const data = {
            room_broadcasting: isBroadcastingEnabled,
            room_id: this.room_id,
            peer_id: this.peer_id,
            peer_name: this.peer_name,
            peer_uuid: this.peer_uuid,
            action: action,
            password: null,
        };
        if (emit) {
            switch (action) {
                case 'broadcasting':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lock':
                    if (room_password) {
                        this.socket
                            .request('getPeerCounts')
                            .then(async (res: { peerCounts: number; }) => {
                                // Only the presenter can lock the room
                                if (isPresenter || res.peerCounts == 1) {
                                    this.peer_info.peer_presenter = isPresenter;
                                    this.getId('isUserPresenter').innerText =  isPresenter;
                                    data.password = room_password;
                                    this.socket.emit('roomAction', data);
                                    if (popup) this.roomStatus(action);
                                }
                            })
                            .catch((err: any) => {
                                console.log('Get peer counts:', err);
                            });
                    } else {
                        Swal.fire({
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showDenyButton: true,
                            background: swalBackground,
                            imageUrl: image.locked,
                            input: 'text',
                            inputPlaceholder: 'Set Room password',
                            confirmButtonText: `OK`,
                            denyButtonText: `Cancel`,
                            showClass: { popup: 'animate__animated animate__fadeInDown' },
                            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                            inputValidator: (pwd: any) => {
                                if (!pwd) return 'Please enter the Room password';
                                this.RoomPassword = pwd;
                            },
                        }).then((result: { isConfirmed: any; }) => {
                            if (result.isConfirmed) {
                                data.password = this.RoomPassword;
                                this.socket.emit('roomAction', data);
                                this.roomStatus(action);
                            }
                        });
                    }
                    break;
                case 'unlock':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lobbyOn':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lobbyOff':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'hostOnlyRecordingOn':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'hostOnlyRecordingOff':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'isBanned':
                    this.socket.emit('roomAction', data);
                    this.isBanned();
                    break;
                default:
                    break;
            }
        } else {
            this.roomStatus(action);
        }
    }

    function    roomStatus(this: any, action: any) {
        switch (action) {
            case 'broadcasting':
                this.userLog('info', `${icons.room} BROADCASTING ${isBroadcastingEnabled ? 'On' : 'Off'}`, 'top-end');
                break;
            case 'lock':
                this.sound('locked');
                this.event(_EVENTS.roomLock);
                this.userLog('info', `${icons.lock} LOCKED the room by the password`, 'top-end');
                break;
            case 'unlock':
                this.event(_EVENTS.roomUnlock);
                this.userLog('info', `${icons.unlock} UNLOCKED the room`, 'top-end');
                break;
            case 'lobbyOn':
                this.event(_EVENTS.lobbyOn);
                this.userLog('info', `${icons.lobby} Lobby is enabled`, 'top-end');
                break;
            case 'lobbyOff':
                this.event(_EVENTS.lobbyOff);
                this.userLog('info', `${icons.lobby} Lobby is disabled`, 'top-end');
                break;
            case 'hostOnlyRecordingOn':
                this.event(_EVENTS.hostOnlyRecordingOn);
                this.userLog('info', `${icons.recording} Host only recording is enabled`, 'top-end');
                break;
            case 'hostOnlyRecordingOff':
                this.event(_EVENTS.hostOnlyRecordingOff);
                this.userLog('info', `${icons.recording} Host only recording is disabled`, 'top-end');
                break;
            default:
                break;
        }
    }

    function  roomMessage(this: any, action: any, active = false) {
        const status = active ? 'ON' : 'OFF';
        this.sound('switch');
        switch (action) {
            case 'pitchBar':
                this.userLog('info', `${icons.pitchBar} Audio pitch bar ${status}`, 'top-end');
                break;
            case 'sounds':
                this.userLog('info', `${icons.sounds} Sounds notification ${status}`, 'top-end');
                break;
            case 'ptt':
                this.userLog('info', `${icons.ptt} Push to talk ${status}`, 'top-end');
                break;
            case 'notify':
                this.userLog('info', `${icons.share} Share room on join ${status}`, 'top-end');
                break;
            case 'hostOnlyRecording':
                this.userLog('info', `${icons.recording} Only host recording ${status}`, 'top-end');
                break;
            case 'showChat':
                active
                    ? userLog('info', `${icons.chat} Chat will be shown, when you receive a message`, 'top-end')
                    : userLog('info', `${icons.chat} Chat not will be shown, when you receive a message`, 'top-end');
                break;
            case 'speechMessages':
                this.userLog('info', `${icons.speech} Speech incoming messages ${status}`, 'top-end');
                break;
            case 'transcriptIsPersistentMode':
                userLog('info', `${icons.transcript} Persistent transcription mode active: ${active}`, 'top-end');
                break;
            case 'transcriptShowOnMsg':
                active
                    ? userLog(
                          'info',
                          `${icons.transcript} Transcript will be shown, when you receive a message`,
                          'top-end',
                      )
                    : userLog(
                          'info',
                          `${icons.transcript} Transcript not will be shown, when you receive a message`,
                          'top-end',
                      );
                break;
            case 'audio_start_muted':
                this.userLog('info', `${icons.moderator} Moderator: everyone starts muted ${status}`, 'top-end');
                break;
            case 'video_start_hidden':
                this.userLog('info', `${icons.moderator} Moderator: everyone starts hidden ${status}`, 'top-end');
                break;
            case 'audio_cant_unmute':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't unmute themselves ${status}`,
                    'top-end',
                );
                break;
            case 'video_cant_unhide':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't unhide themselves ${status}`,
                    'top-end',
                );
                break;
            case 'screen_cant_share':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't share the screen ${status}`,
                    'top-end',
                );
                break;
            case 'chat_cant_privately':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't chat privately ${status}`,
                    'top-end',
                );
                break;
            case 'chat_cant_chatgpt':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't chat with ChatGPT ${status}`,
                    'top-end',
                );
                break;
            case 'disconnect_all_on_leave':
                this.userLog('info', `${icons.moderator} Moderator: disconnect all on leave room ${status}`, 'top-end');
                break;
            case 'recPrioritizeH264':
                this.userLog('info', `${icons.codecs} Recording prioritize h.264  ${status}`, 'top-end');
                break;
            case 'recSyncServer':
                this.userLog('info', `${icons.recSync} Server Sync Recording ${status}`, 'top-end');
                break;
            case 'customThemeKeep':
                this.userLog('info', `${icons.theme} Custom theme keep ${status}`, 'top-end');
                break;
            default:
                break;
        }
    }

    function   roomPassword(this: any, data: { password: any; room: any; }) {
        switch (data.password) {
            case 'OK':
                this.joinAllowed(data.room);
                break;
            case 'KO':
                this.roomIsLocked();
                break;
            default:
                break;
        }
    }

    // ####################################################
    // ROOM LOBBY
    // ####################################################

    async function roomLobby(this: any, data: { lobby_status: any; peer_id: any; peer_name: any; room: any; }) {
        console.log('LOBBY--->', data);
        switch (data.lobby_status) {
            case 'waiting':
                if (!isRulesActive || isPresenter) {
                    let lobbyTr = '';
                    let peer_id = data.peer_id;
                    let peer_name = data.peer_name;
                    let avatarImg = rc.isValidEmail(peer_name)
                        ? this.genGravatar(peer_name)
                        : this.genAvatarSvg(peer_name, 32);
                    let lobbyTb = this.getId('lobbyTb');
                    let lobbyAccept = _PEER.acceptPeer;
                    let lobbyReject = _PEER.ejectPeer;
                    let lobbyAcceptId = `${peer_name}___${peer_id}___lobbyAccept`;
                    let lobbyRejectId = `${peer_name}___${peer_id}___lobbyReject`;

                    lobbyTr += `
                    <tr id='${peer_id}'>
                        <td><img src="${avatarImg}" /></td>
                        <td>${peer_name}</td>
                        <td><button id='${lobbyAcceptId}' onclick="rc.lobbyAction(this.id, 'accept')">${lobbyAccept}</button></td>
                        <td><button id='${lobbyRejectId}' onclick="rc.lobbyAction(this.id, 'reject')">${lobbyReject}</button></td>
                    </tr>
                    `;

                    lobbyTb.innerHTML += lobbyTr;
                    lobbyParticipantsCount++;
                    lobbyHeaderTitle.innerText = 'Lobby users (' + lobbyParticipantsCount + ')';
                    if (!isLobbyOpen) this.lobbyToggle();
                    if (!this.isMobileDevice) {
                        setTippy(lobbyAcceptId, 'Accept', 'top');
                        setTippy(lobbyRejectId, 'Reject', 'top');
                    }
                    this.userLog('info', peer_name + ' wants to join the meeting', 'top-end');
                }
                break;
            case 'accept':
                await this.joinAllowed(data.room);
                control.style.display = 'flex';
                this.msgPopup('info', 'Your join meeting was be accepted by moderator');
                break;
            case 'reject':
                this.sound('eject');
                Swal.fire({
                    icon: 'warning',
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    showDenyButton: false,
                    showConfirmButton: true,
                    background: swalBackground,
                    title: 'Rejected',
                    text: 'Your join meeting was be rejected by moderator',
                    confirmButtonText: `Ok`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                }).then((result: { isConfirmed: any; }) => {
                    if (result.isConfirmed) {
                        this.exit();
                    }
                });
                break;
            default:
                break;
        }
    }

    function   lobbyAction(this: any, id: string, lobby_status: any) {
        const words = id.split('___');
        const peer_name = words[0];
        const peer_id = words[1];
        const data = {
            room_id: this.room_id,
            peer_id: peer_id,
            peer_name: peer_name,
            lobby_status: lobby_status,
            broadcast: false,
        };
        this.socket.emit('roomLobby', data);
        const trElem = this.getId(peer_id);
        trElem.parentNode.removeChild(trElem);
        lobbyParticipantsCount--;
        lobbyHeaderTitle.innerText = 'Lobby users (' + lobbyParticipantsCount + ')';
        if (lobbyParticipantsCount == 0) this.lobbyToggle();
    }

    function lobbyAcceptAll(this: any) {
        if (lobbyParticipantsCount > 0) {
            const data = this.lobbyGetData('accept', this.lobbyGetPeerIds());
            this.socket.emit('roomLobby', data);
            this.lobbyRemoveAll();
        } else {
            this.userLog('info', 'No participants in lobby detected', 'top-end');
        }
    }

    function  lobbyRejectAll(this: any) {
        if (lobbyParticipantsCount > 0) {
            const data = this.lobbyGetData('reject', this.lobbyGetPeerIds());
            this.socket.emit('roomLobby', data);
            this.lobbyRemoveAll();
        } else {
            this.userLog('info', 'No participants in lobby detected', 'top-end');
        }
    }

    function   lobbyRemoveAll(this: any) {
        let tr = lobbyTb.getElementsByTagName('tr');
        for (let i = tr.length - 1; i >= 0; i--) {
            if (tr[i].id && tr[i].id != 'lobbyAll') {
                console.log('REMOVE LOBBY PEER ID ' + tr[i].id);
                if (tr[i] && tr[i].parentElement) {
                    tr[i].parentElement.removeChild(tr[i]);
                }
                lobbyParticipantsCount--;
            }
        }
        lobbyHeaderTitle.innerText = 'Lobby users (' + lobbyParticipantsCount + ')';
        if (lobbyParticipantsCount == 0) this.lobbyToggle();
    }

    function  lobbyRemoveMe(this: any, peer_id: any) {
        let tr = lobbyTb.getElementsByTagName('tr');
        for (let i = tr.length - 1; i >= 0; i--) {
            if (tr[i].id && tr[i].id == peer_id) {
                console.log('REMOVE LOBBY PEER ID ' + tr[i].id);
                if (tr[i] && tr[i].parentElement) {
                    tr[i].parentElement.removeChild(tr[i]);
                }
                lobbyParticipantsCount--;
            }
        }
        lobbyHeaderTitle.innerText = 'Lobby users (' + lobbyParticipantsCount + ')';
        if (lobbyParticipantsCount == 0) this.lobbyToggle();
    }

    function lobbyGetPeerIds() {
        let peers_id = [];
        let tr = lobbyTb.getElementsByTagName('tr');
        for (let i = tr.length - 1; i >= 0; i--) {
            if (tr[i].id && tr[i].id != 'lobbyAll') {
                peers_id.push(tr[i].id);
            }
        }
        return peers_id;
    }

    function   lobbyGetData(this: any, status: any, peers_id = []) {
        return {
            room_id: this.room_id,
            peer_id: this.peer_id,
            peer_name: this.peer_name,
            peers_id: peers_id,
            lobby_status: status,
            broadcast: true,
        };
    }

    function lobbyToggle(this: any) {
        if (lobbyParticipantsCount > 0 && !isLobbyOpen) {
            lobby.style.display = 'block';
            lobby.style.top = '50%';
            lobby.style.left = '50%';
            if (this.isMobileDevice) {
                lobby.style.width = '100%';
                lobby.style.height = '100%';
            }
            isLobbyOpen = true;
            this.sound('lobby');
        } else {
            lobby.style.display = 'none';
            isLobbyOpen = false;
        }
    }

    // ####################################################
    // HANDLE ROOM ACTION
    // ####################################################

    function userUnauthorized(this: any) {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: 'Oops, Unauthorized',
            text: 'The host has user authentication enabled',
            confirmButtonText: `Login`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            // Login required to join room
            openURL(`/login/?room=${this.room_id}`);
        });
    }

    function unlockTheRoom(this: any) {
        if (room_password) {
            this.RoomPassword = room_password;
            let data = {
                action: 'checkPassword',
                password: this.RoomPassword,
            };
            this.socket.emit('roomAction', data);
        } else {
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                background: swalBackground,
                imageUrl: image.locked,
                title: 'Oops, Room is Locked',
                input: 'text',
                inputPlaceholder: 'Enter the Room password',
                confirmButtonText: `OK`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                inputValidator: (pwd: any) => {
                    if (!pwd) return 'Please enter the Room password';
                    this.RoomPassword = pwd;
                },
            }).then(() => {
                let data = {
                    action: 'checkPassword',
                    password: this.RoomPassword,
                };
                this.socket.emit('roomAction', data);
            });
        }
    }

    function   roomIsLocked(this: any) {
        this.sound('eject');
        this.event(_EVENTS.roomLock);
        console.log('Room is Locked, try with another one');
        Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            position: 'center',
            imageUrl: image.locked,
            title: 'Oops, Wrong Room Password',
            text: 'The room is locked, try with another one.',
            showDenyButton: false,
            confirmButtonText: `Ok`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) this.exit();
        });
    }

    function  waitJoinConfirm(this: any) {
        this.sound('lobby');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: true,
            showConfirmButton: false,
            background: swalBackground,
            imageUrl: image.poster,
            title: 'Room has lobby enabled',
            text: 'Asking to join meeting...',
            confirmButtonText: `Ok`,
            denyButtonText: `Leave room`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                control.style.display = 'none';
            } else {
                this.exit();
            }
        });
    }

    function   isBanned(this: any) {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: false,
            showConfirmButton: true,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: 'Banned',
            text: 'You are banned from this room!',
            confirmButtonText: `Ok`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            this.exit();
        });
    }

    // ####################################################
    // HANDLE AUDIO VOLUME
    // ####################################################

    function   handleAudioVolume(this: any, data: { peer_id: any; audioVolume: number; }) {
        if (!isPitchBarEnabled) return;
        let peerId = data.peer_id;
        let producerAudioBtn = this.getId(peerId + '_audio');
        let consumerAudioBtn = this.getId(peerId + '__audio');
        let pbProducer = this.getId(peerId + '_pitchBar');
        let pbConsumer = this.getId(peerId + '__pitchBar');
        let audioVolume = data.audioVolume * 10; //10-100
        let audioColor = 'lime';
        //console.log('Active speaker', { peer_name: peerName, peer_id: peerId, audioVolume: audioVolume });
        if ([50, 60, 70].includes(audioVolume)) audioColor = 'orange';
        if ([80, 90, 100].includes(audioVolume)) audioColor = 'red';
        if (producerAudioBtn) producerAudioBtn.style.color = audioColor;
        if (consumerAudioBtn) consumerAudioBtn.style.color = audioColor;
        if (pbProducer) pbProducer.style.backgroundColor = audioColor;
        if (pbConsumer) pbConsumer.style.backgroundColor = audioColor;
        if (pbProducer) pbProducer.style.height = audioVolume + '%';
        if (pbConsumer) pbConsumer.style.height = audioVolume + '%';
        setTimeout(function () {
            audioColor = 'white';
            if (producerAudioBtn) producerAudioBtn.style.color = audioColor;
            if (consumerAudioBtn) consumerAudioBtn.style.color = audioColor;
            if (pbProducer) pbProducer.style.height = '0%';
            if (pbConsumer) pbConsumer.style.height = '0%';
        }, 200);
    }

    // ####################################################
    // HANDLE PEER VOLUME
    // ###################################################

    function handlePV(uid: any); {
        const words = uid.split('___');
        let peer_id = words[1] + '___pVolume';
        let audioConsumerId = this.audioConsumers.get(peer_id);
        let audioConsumerPlayer = this.getId(audioConsumerId);
        let inputPv = this.getId(peer_id);
        if (inputPv && audioConsumerPlayer) {
            inputPv.style.display = 'inline';
            inputPv.value = 100;
            // Not work on Mobile?
            inputPv.addEventListener('input', () => {
                audioConsumerPlayer.volume = inputPv.value / 100;
            });
        }
    }

    // ####################################################
    // HANDLE DOMINANT SPEAKER
    // ###################################################

    function  handleDominantSpeaker(this: any, data: { peer_id: any; }) {
        console.log('Dominant Speaker', data);
        const { peer_id } = data;
        const peerNameElement = this.getId(peer_id + '__name');
        if (peerNameElement) {
            peerNameElement.style.color = 'lime';
            setTimeout(function () {
                peerNameElement.style.color = '#FFFFFF';
            }, 5000);
        }
        //...
    }

    // ####################################################
    // HANDLE BAN
    // ###################################################
    function handleGL(this: any, uid: string) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pGeoLocation';
        let btnGl = this.getId(uid);
        if (btnGl) {
            btnGl.addEventListener('click', () => {
                isPresenter
                    ? this.askPeerGeoLocation(peer_id)
                    : this.userLog('warning', 'Only the presenter can ask geolocation to the participants', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE BAN
    // ###################################################

    function  handleBAN(uid: any) ;{
        const words = uid.split('___');
        let peer_id = words[1] + '___pBan';
        let btnBan = this.getId(uid);
        if (btnBan) {
            btnBan.addEventListener('click', () => {
                isPresenter
                    ? this.peerAction('me', peer_id, 'ban')
                    : this.userLog('warning', 'Only the presenter can ban the participants', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE KICK-OUT
    // ###################################################

    function  handleKO(this: any, uid: string) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pEject';
        let btnKo = this.getId(uid);
        if (btnKo) {
            btnKo.addEventListener('click', () => {
                isPresenter
                    ? this.peerAction('me', peer_id, 'eject')
                    : this.userLog('warning', 'Only the presenter can eject the participants', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE VIDEO
    // ###################################################

    function   handleCM(this: any, uid: string) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pVideo';
        let btnCm = this.getId(uid);
        if (btnCm) {
            btnCm.addEventListener('click', (e: { target: { className: any; }; }) => {
                if (e.target.className === html.videoOn) {
                    isPresenter
                        ? this.peerAction('me', peer_id, 'hide')
                        : this.userLog('warning', 'Only the presenter can hide the participants', 'top-end');
                } else {
                    isPresenter
                        ? this.peerAction('me', peer_id, 'unhide')
                        : this.userLog('warning', 'Only the presenter can unhide the participants', 'top-end');
                }
            });
        }
    }

    // ####################################################
    // HANDLE AUDIO
    // ###################################################

    function   handleAU(this: any, uid: string) {
        const words = uid.split('__');
        let peer_id = words[0] + '___pAudio';
        let btnAU = this.getId(uid);
        if (btnAU) {
            btnAU.addEventListener('click', (e: { target: { className: any; }; }) => {
                if (e.target.className === html.audioOn) {
                    isPresenter
                        ? this.peerAction('me', peer_id, 'mute')
                        : this.userLog('warning', 'Only the presenter can mute the participants', 'top-end');
                } else {
                    isPresenter
                        ? this.peerAction('me', peer_id, 'unmute')
                        : this.userLog('warning', 'Only the presenter can unmute the participants', 'top-end');
                }
            });
        }
    }

    // ####################################################
    // HANDLE COMMANDS
    // ####################################################

    function   emitCmd(this: any, cmd: any) {
        this.socket.emit('cmd', cmd);
    }

    function handleCmd(this: any, cmd: { type: any; peer_id: any; active: any; data: any; }) {
        switch (cmd.type) {
            case 'privacy':
                this.setVideoPrivacyStatus(cmd.peer_id, cmd.active);
                break;
            case 'roomEmoji':
                this.handleRoomEmoji(cmd);
                break;
            case 'transcript':
                this.transcription.handleTranscript(cmd);
                break;
            case 'geoLocation':
                this.confirmPeerGeoLocation(cmd);
                break;
            case 'geoLocationOK':
                this.handleGeoPeerLocation(cmd);
                break;
            case 'geoLocationKO':
                this.sound('alert');
                this.userLog('warning', cmd.data, 'top-end', 5000);
                break;
            case 'ejectAll':
                this.exit();
                break;
            default:
                break;
            //...
        }
    }

    function handleRoomEmoji(cmd: { emoji: any; peer_name: any; }, duration = 5000) {
        const userEmoji = document.getElementById(`userEmoji`);
        if (userEmoji) {
            const emojiDisplay = document.createElement('div');
            emojiDisplay.className = 'animate__animated animate__backInUp';
            emojiDisplay.style.padding = '10px';
            emojiDisplay.style.fontSize = '3vh';
            emojiDisplay.style.color = '#FFF';
            emojiDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            emojiDisplay.style.borderRadius = '10px';
            emojiDisplay.innerText = `${cmd.emoji} ${cmd.peer_name}`;
            userEmoji.appendChild(emojiDisplay);
            setTimeout(() => {
                emojiDisplay.remove();
            }, duration);
        }
    }

    // ####################################################
    // PEER ACTION
    // ####################################################

    async function peerAction(this: any, from_peer_name: string, id: string, action: any, emit = true, broadcast = false, info = true, msg = '') {
        const words = id.split('___');
        const peer_id = words[0];

        if (emit) {
            // send...
            const data = {
                from_peer_name: this.peer_name,
                from_peer_id: this.peer_id,
                from_peer_uuid: this.peer_uuid,
                to_peer_uuid: '',
                peer_id: peer_id,
                action: action,
                message: '',
                broadcast: broadcast,
            };
            console.log('peerAction', data);

            if (!this.thereAreParticipants()) {
                if (info) return this.userLog('info', 'No participants detected', 'top-end');
            }
            if (!broadcast) {
                switch (action) {
                    case 'mute':
                        const audioMessage =
                            'The participant has been muted, and only they have the ability to unmute themselves';
                        if (isBroadcastingEnabled) {
                            const peerAudioButton = this.getId(data.peer_id + '___pAudio');
                            if (peerAudioButton) {
                                const peerAudioIcon = peerAudioButton.querySelector('i');
                                if (peerAudioIcon && peerAudioIcon.style.color == 'red') {
                                    if (isRulesActive && isPresenter) {
                                        data.action = 'unmute';
                                        return this.confirmPeerAction(data.action, data);
                                    }
                                    return this.userLog('info', audioMessage, 'top-end');
                                }
                            }
                        } else {
                            const peerAudioStatus = this.getId(data.peer_id + '__audio');
                            if (!peerAudioStatus || peerAudioStatus.className == html.audioOff) {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'unmute';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', audioMessage, 'top-end');
                            }
                        }
                        break;
                    case 'hide':
                        const videoMessage =
                            'The participant is currently hidden, and only they have the option to unhide themselves';
                        if (isBroadcastingEnabled) {
                            const peerVideoButton = this.getId(data.peer_id + '___pVideo');
                            if (peerVideoButton) {
                                const peerVideoIcon = peerVideoButton.querySelector('i');
                                if (peerVideoIcon && peerVideoIcon.style.color == 'red') {
                                    if (isRulesActive && isPresenter) {
                                        data.action = 'unhide';
                                        return this.confirmPeerAction(data.action, data);
                                    }
                                    return this.userLog('info', videoMessage, 'top-end');
                                }
                            }
                        } else {
                            const peerVideoOff = this.getId(data.peer_id + '__videoOff');
                            if (peerVideoOff) {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'unhide';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', videoMessage, 'top-end');
                            }
                        }
                    case 'stop':
                        const screenMessage =
                            'The participant screen is not shared, only the participant can initiate sharing';
                        const peerScreenButton = this.getId(id);
                        if (peerScreenButton) {
                            const peerScreenStatus = peerScreenButton.querySelector('i');
                            if (peerScreenStatus && peerScreenStatus.style.color == 'red') {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'start';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', screenMessage, 'top-end');
                            }
                        }
                        break;
                    case 'ban':
                        if (!isRulesActive || isPresenter) {
                            const peer_info = await getRemotePeerInfo(peer_id);
                            console.log('BAN PEER', peer_info);
                            if (peer_info) {
                                data.to_peer_uuid = peer_info.peer_uuid;
                                return this.confirmPeerAction(data.action, data);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            this.confirmPeerAction(data.action, data);
        } else {
            // receive...
            const peerActionAllowed = peer_id === this.peer_id || broadcast;
            switch (action) {
                case 'ban':
                    if (peerActionAllowed) {
                        const message = `Will ban you from the room${
                            msg ? `<br><br><span class="red">Reason: ${msg}</span>` : ''
                        }`;
                        this.exit(true);
                        this.sound(action);
                        this.peerActionProgress(from_peer_name, message, 5000, action);
                    }
                    break;
                case 'eject':
                    if (peerActionAllowed) {
                        const message = `Will eject you from the room${
                            msg ? `<br><br><span class="red">Reason: ${msg}</span>` : ''
                        }`;
                        this.exit(true);
                        this.sound(action);
                        this.peerActionProgress(from_peer_name, message, 5000, action);
                    }
                    break;
                case 'mute':
                    if (peerActionAllowed) {
                        if (this.producerExist(mediaType.audio)) {
                            await this.pauseProducer(mediaType.audio);
                            this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', false);
                            this.userLog(
                                'warning',
                                from_peer_name + '  ' + _PEER.audioOff + ' has closed yours audio',
                                'top-end',
                                10000,
                            );
                        }
                    }
                    break;
                case 'unmute':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.audio,
                            image.unmute,
                            'Enable Microphone',
                            'Allow the presenter to enable your microphone?',
                        );
                    }
                    break;
                case 'hide':
                    if (peerActionAllowed) {
                        this.closeProducer(mediaType.video);
                        this.userLog(
                            'warning',
                            from_peer_name + '  ' + _PEER.videoOff + ' has closed yours video',
                            'top-end',
                            10000,
                        );
                    }
                    break;
                case 'unhide':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.video,
                            image.unhide,
                            'Enable Camera',
                            'Allow the presenter to enable your camera?',
                        );
                    }
                    break;
                case 'stop':
                    if (this.isScreenShareSupported) {
                        if (peerActionAllowed) {
                            this.closeProducer(mediaType.screen);
                            this.userLog(
                                'warning',
                                from_peer_name + '  ' + _PEER.screenOff + ' has closed yours screen share',
                                'top-end',
                                10000,
                            );
                        }
                    }
                    break;
                case 'start':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.screen,
                            image.start,
                            'Start Screen share',
                            'Allow the presenter to start your screen share?',
                        );
                    }
                    break;
                default:
                    break;
                //...
            }
        }
    }

    function peerMediaStartConfirm(type: any, imageUrl: any, title: any, text: any) {
        sound('notify');
        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: imageUrl,
            title: title,
            text: text,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(async (result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                switch (type) {
                    case mediaType.audio:
                        this.producerExist(mediaType.audio)
                            ? await this.resumeProducer(mediaType.audio)
                            : await this.produce(mediaType.audio, microphoneSelect.value);
                        this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', true);
                        break;
                    case mediaType.video:
                        await this.produce(mediaType.video, videoSelect.value);
                        break;
                    case mediaType.screen:
                        await this.produce(mediaType.screen);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    function  peerActionProgress(tt: any, msg: any, time: any, action = 'na') {
        Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            icon: action == 'eject' ? 'warning' : 'success',
            title: tt,
            html: msg,
            timer: time,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then(() => {
            switch (action) {
                case 'refresh':
                    getRoomParticipants();
                    break;
                case 'ban':
                case 'eject':
                    this.exit();
                    break;
                default:
                    break;
            }
        });
    }

    function confirmPeerAction(action: string, data: { message: any; peer_id: string; broadcast: any; }) {
        console.log('Confirm peer action', action);
        switch (action) {
            case 'ban':
                let banConfirmed = false;
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: image.forbidden,
                    title: 'Ban current participant',
                    input: 'text',
                    inputPlaceholder: 'Ban reason',
                    showDenyButton: true,
                    confirmButtonText: `Yes`,
                    denyButtonText: `No`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result: { isConfirmed: any; value: any; }) => {
                        if (result.isConfirmed) {
                            banConfirmed = true;
                            const message = result.value;
                            if (message) data.message = message;
                            this.socket.emit('peerAction', data);
                            let peer = this.getId(data.peer_id);
                            if (peer) {
                                peer.parentNode.removeChild(peer);
                                participantsCount--;
                                refreshParticipantsCount(participantsCount);
                            }
                        }
                    })
                    .then(() => {
                        if (banConfirmed) this.peerActionProgress(action, 'In progress, wait...', 6000, 'refresh');
                    });
                break;
            case 'eject':
                let ejectConfirmed = false;
                let whoEject = data.broadcast ? 'All participants except yourself?' : 'current participant?';
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: data.broadcast ? image.users : image.user,
                    title: 'Eject ' + whoEject,
                    input: 'text',
                    inputPlaceholder: 'Eject reason',
                    showDenyButton: true,
                    confirmButtonText: `Yes`,
                    denyButtonText: `No`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result: { isConfirmed: any; value: any; }) => {
                        if (result.isConfirmed) {
                            ejectConfirmed = true;
                            const message = result.value;
                            if (message) data.message = message;
                            if (!data.broadcast) {
                                this.socket.emit('peerAction', data);
                                let peer = this.getId(data.peer_id);
                                if (peer) {
                                    peer.parentNode.removeChild(peer);
                                    participantsCount--;
                                    refreshParticipantsCount(participantsCount);
                                }
                            } else {
                                this.socket.emit('peerAction', data);
                                let actionButton = this.getId(action + 'AllButton');
                                if (actionButton) actionButton.style.display = 'none';
                                participantsCount = 1;
                                refreshParticipantsCount(participantsCount);
                            }
                        }
                    })
                    .then(() => {
                        if (ejectConfirmed) this.peerActionProgress(action, 'In progress, wait...', 6000, 'refresh');
                    });
                break;
            case 'mute':
            case 'unmute':
            case 'hide':
            case 'unhide':
            case 'stop':
            case 'start':
                let muteHideStopConfirmed = false;
                let who = data.broadcast ? 'everyone except yourself?' : 'current participant?';
                let imageUrl, title, text;
                switch (action) {
                    case 'mute':
                        imageUrl = image.mute;
                        title = 'Mute ' + who;
                        text =
                            'Once muted, only the presenter will be able to unmute participants, but participants can unmute themselves at any time';
                        break;
                    case 'unmute':
                        imageUrl = image.unmute;
                        title = 'Unmute ' + who;
                        text = 'A pop-up message will appear to prompt and allow this action.';
                        break;
                    case 'hide':
                        title = 'Hide ' + who;
                        imageUrl = image.hide;
                        text =
                            'Once hidden, only the presenter will be able to unhide participants, but participants can unhide themselves at any time';
                        break;
                    case 'unhide':
                        title = 'Unhide ' + who;
                        imageUrl = image.unhide;
                        text = 'A pop-up message will appear to prompt and allow this action.';
                        break;
                    case 'stop':
                        imageUrl = image.stop;
                        title = 'Stop screen share to the ' + who;
                        text =
                            "Once stopped, only the presenter will be able to start the participants' screens, but participants can start their screens themselves at any time";
                        break;
                    case 'start':
                        imageUrl = image.start;
                        title = 'Start screen share to the ' + who;
                        text = 'A pop-up message will appear to prompt and allow this action.';
                        break;
                    default:
                        break;
                }
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: imageUrl,
                    title: title,
                    text: text,
                    showDenyButton: true,
                    confirmButtonText: `Yes`,
                    denyButtonText: `No`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result: { isConfirmed: any; }) => {
                        if (result.isConfirmed) {
                            muteHideStopConfirmed = true;
                            if (!data.broadcast) {
                                switch (action) {
                                    case 'mute':
                                        let peerAudioButton = this.getId(data.peer_id + '___pAudio');
                                        if (peerAudioButton) peerAudioButton.innerHTML = _PEER.audioOff;
                                        break;
                                    case 'hide':
                                        let peerVideoButton = this.getId(data.peer_id + '___pVideo');
                                        if (peerVideoButton) peerVideoButton.innerHTML = _PEER.videoOff;
                                        break;
                                    case 'stop':
                                        let peerScreenButton = this.getId(data.peer_id + '___pScreen');
                                        if (peerScreenButton) peerScreenButton.innerHTML = _PEER.screenOff;
                                        break;
                                    default:
                                        break;
                                }
                                this.socket.emit('peerAction', data);
                            } else {
                                this.socket.emit('peerAction', data);
                                let actionButton = this.getId(action + 'AllButton');
                                if (actionButton) actionButton.style.display = 'none';
                            }
                        }
                    })
                    .then(() => {
                        if (muteHideStopConfirmed)
                            this.peerActionProgress(action, 'In progress, wait...', 2000, 'refresh');
                    });
                break;
            default:
                break;
            //...
        }
    }

    function  peerGuestNotAllowed(this: any, action: any) {
        console.log('peerGuestNotAllowed', action);
        switch (action) {
            case 'audio':
                this.userLog('warning', 'Only the presenter can mute/unmute participants', 'top-end');
                break;
            case 'video':
                this.userLog('warning', 'Only the presenter can hide/show participants', 'top-end');
                break;
            case 'screen':
                this.userLog('warning', 'Only the presenter can start/stop the screen of participants', 'top-end');
                break;
            default:
                break;
        }
    }

    // ####################################################
    // SEARCH PEER FILTER
    // ####################################################

    function searchPeer(this: any) {
        const searchParticipantsFromList = this.getId('searchParticipantsFromList');
        const searchFilter = searchParticipantsFromList.value.toUpperCase();
        const participantsList = this.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');

        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            const participantName = li.getAttribute('data-to-name').toUpperCase();
            const shouldDisplay = participantName.includes(searchFilter);
            li.style.display = shouldDisplay ? '' : 'none';
        }
    }

    // ####################################################
    // FILTER PEER WITH RAISE HAND
    // ####################################################

    function toggleRaiseHands(this: any) {
        const participantsList = this.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');

        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            const hasPulsateClass = li.querySelector('i.pulsate') !== null;
            const shouldDisplay = (hasPulsateClass && !this.isToggleRaiseHand) || this.isToggleRaiseHand;
            li.style.display = shouldDisplay ? '' : 'none';
        }
        this.isToggleRaiseHand = !this.isToggleRaiseHand;
        setColor(participantsRaiseHandBtn, this.isToggleRaiseHand ? 'lime' : 'white');
    }

    // ####################################################
    // FILTER PEER WITH UNREAD MESSAGES
    // ####################################################

    function toggleUnreadMsg(this: any) {
        const participantsList = this.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');

        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            const shouldDisplay =
                (li.classList.contains('pulsate') && !this.isToggleUnreadMsg) || this.isToggleUnreadMsg;
            li.style.display = shouldDisplay ? '' : 'none';
        }
        this.isToggleUnreadMsg = !this.isToggleUnreadMsg;
        setColor(participantsUnreadMessagesBtn, this.isToggleUnreadMsg ? 'lime' : 'white');
    }

    // ####################################################
    // SHOW PEER ABOUT AND MESSAGES
    // ####################################################

    function showPeerAboutAndMessages(this: any, peer_id: string, peer_name: string, event = null) {
        this.hidePeerMessages();

        const chatAbout = this.getId('chatAbout');
        const participant = this.getId(peer_id);
        const participantsList = this.getId('participantsList');
        const chatPrivateMessages = this.getId('chatPrivateMessages');
        const messagePrivateListItems = chatPrivateMessages.getElementsByTagName('li');
        const participantsListItems = participantsList.getElementsByTagName('li');
        const avatarImg = getParticipantAvatar(peer_name);

        const generateChatAboutHTML = (imgSrc: any, title: string, status = 'online', participants = '') => {
            const isSensitiveChat = !['all', 'ChatGPT'].includes(peer_id) && title.length > 15;
            const truncatedTitle = isSensitiveChat ? `${title.substring(0, 10)}*****` : title;
            return `
                <img class="all-participants-img" 
                    style="border: var(--border); width: 43px; margin-right: 5px; cursor: pointer;"
                    id="chatShowParticipantsList" 
                    src="${image.users}"
                    alt="participants"
                    onclick="rc.toggleShowParticipants()" 
                />
                <a data-toggle="modal" data-target="#view_info">
                    <img src="${imgSrc}" alt="avatar" />
                </a>
                <div class="chat-about">
                    <h6 class="mb-0">${truncatedTitle}</h6>
                    <span class="status">
                        <i class="fa fa-circle ${status}"></i> ${status} ${participants}
                    </span>
                </div>
            `;
        };

        // CURRENT SELECTED PEER
        for (let i = 0; i < participantsListItems.length; i++) {
            participantsListItems[i].classList.remove('active');
            participantsListItems[i].classList.remove('pulsate'); // private new message to read
            if (!['all', 'ChatGPT'].includes(peer_id)) {
                // icon private new message to read
                this.getId(`${peer_id}-unread-msg`).classList.add('hidden');
            }
        }
        participant.classList.add('active');

        isChatGPTOn = false;
        console.log('Display messages', peer_id);

        switch (peer_id) {
            case 'ChatGPT':
                if (this._moderator.chat_cant_chatgpt) {
                    return userLog('warning', 'The moderator does not allow you to chat with ChatGPT', 'top-end', 6000);
                }
                isChatGPTOn = true;
                chatAbout.innerHTML = generateChatAboutHTML(image.chatgpt, 'ChatGPT');
                this.getId('chatGPTMessages').style.display = 'block';
                break;
            case 'all':
                chatAbout.innerHTML = generateChatAboutHTML(image.all, 'Public chat', 'online', participantsCount);
                this.getId('chatPublicMessages').style.display = 'block';
                break;
            default:
                if (this._moderator.chat_cant_privately) {
                    return userLog('warning', 'The moderator does not allow you to chat privately', 'top-end', 6000);
                }
                chatAbout.innerHTML = generateChatAboutHTML(avatarImg, peer_name);
                chatPrivateMessages.style.display = 'block';
                for (let i = 0; i < messagePrivateListItems.length; i++) {
                    const li = messagePrivateListItems[i];
                    const itemFromId = li.getAttribute('data-from-id');
                    const itemToId = li.getAttribute('data-to-id');
                    const shouldDisplay = itemFromId.includes(peer_id) || itemToId.includes(peer_id);
                    li.style.display = shouldDisplay ? '' : 'none';
                }
                break;
        }

        if (!this.isMobileDevice) setTippy('chatShowParticipantsList', 'Toggle participants list', 'bottom');

        const clickedElement = event ? event.target : null;
        if (!event || (clickedElement.tagName != 'BUTTON' && clickedElement.tagName != 'I')) {
            if ((this.isMobileDevice || this.isChatPinned) && (!plist || !plist.classList.contains('hidden'))) {
                this.toggleShowParticipants();
            }
        }
    }

    function hidePeerMessages() {
        elemDisplay('chatGPTMessages', false);
        elemDisplay('chatPublicMessages', false);
        elemDisplay('chatPrivateMessages', false);
    }

    // ####################################################
    // UPDATE ROOM MODERATOR
    // ####################################################

    function  updateRoomModerator(this: any, data: any) {
        if (!isRulesActive || isPresenter) {
            const moderator = this.getModeratorData(data);
            this.socket.emit('updateRoomModerator', moderator);
        }
    }

    function  updateRoomModeratorALL(this: any, data: any) {
        if (!isRulesActive || isPresenter) {
            const moderator = this.getModeratorData(data);
            this.socket.emit('updateRoomModeratorALL', moderator);
        }
    }

    function   getModeratorData(this: any, data: any) {
        return {
            peer_name: this.peer_name,
            peer_uuid: this.peer_uuid,
            moderator: data,
        };
    }

    function handleUpdateRoomModerator(this: any, data: { type: any; status: any; }) {
        switch (data.type) {
            case 'audio_cant_unmute':
                this._moderator.audio_cant_unmute = data.status;
                this._moderator.audio_cant_unmute ? hide(tabAudioDevicesBtn) : show(tabAudioDevicesBtn);
                rc.roomMessage('audio_cant_unmute', data.status);
                break;
            case 'video_cant_unhide':
                this._moderator.video_cant_unhide = data.status;
                this._moderator.video_cant_unhide ? hide(tabVideoDevicesBtn) : show(tabVideoDevicesBtn);
                rc.roomMessage('video_cant_unhide', data.status);
                break;
            case 'screen_cant_share':
                this._moderator.screen_cant_share = data.status;
                rc.roomMessage('screen_cant_share', data.status);
                break;
            case 'chat_cant_privately':
                this._moderator.chat_cant_privately = data.status;
                rc.roomMessage('chat_cant_privately', data.status);
                break;
            case 'chat_cant_chatgpt':
                this._moderator.chat_cant_chatgpt = data.status;
                rc.roomMessage('chat_cant_chatgpt', data.status);
                break;
            default:
                break;
        }
    }

    function  handleUpdateRoomModeratorALL(this: any, data: any) {
        this._moderator = data;
        console.log('Update Room Moderator data all', this._moderator);
    }

    function  getModerator(this: any) {
        console.log('Get Moderator', this._moderator);
        return this._moderator;
    }

    // ####################################################
    // UPDATE PEER INFO
    // ####################################################

    function updatePeerInfo(this: any, peer_name: string, peer_id: any, type: any, status: any, emit = true, presenter = false) {
        if (emit) {
            switch (type) {
                case 'audio':
                    this.setIsAudio(peer_id, status);
                    break;
                case 'video':
                    this.setIsVideo(status);
                    break;
                case 'screen':
                    this.setIsScreen(status);
                    break;
                case 'hand':
                    this.peer_info.peer_hand = status;
                    let peer_hand = this.getPeerHandBtn(peer_id);
                    if (status) {
                        if (peer_hand) peer_hand.style.display = 'flex';
                        this.event(_EVENTS.raiseHand);
                        this.sound('raiseHand');
                    } else {
                        if (peer_hand) peer_hand.style.display = 'none';
                        this.event(_EVENTS.lowerHand);
                    }
                    break;
                default:
                    break;
            }
            const data = {
                room_id: this.room_id,
                peer_name: peer_name,
                peer_id: peer_id,
                type: type,
                status: status,
                broadcast: true,
            };
            this.socket.emit('updatePeerInfo', data);
        } else {
            const canUpdateMediaStatus = !isBroadcastingEnabled || (isBroadcastingEnabled && presenter);
            switch (type) {
                case 'audio':
                    if (canUpdateMediaStatus) this.setPeerAudio(peer_id, status);
                    break;
                case 'video':
                    break;
                case 'screen':
                    break;
                case 'hand':
                    let peer_hand = this.getPeerHandBtn(peer_id);
                    if (status) {
                        if (peer_hand) peer_hand.style.display = 'flex';
                        this.userLog(
                            'warning',
                            peer_name + '  ' + _PEER.raiseHand + ' has raised the hand',
                            'top-end',
                            10000,
                        );
                        this.sound('raiseHand');
                    } else {
                        if (peer_hand) peer_hand.style.display = 'none';
                    }
                    break;
                default:
                    break;
            }
        }
        if (isParticipantsListOpen) getRoomParticipants();
    }

    function  checkPeerInfoStatus(this: any, peer_info: { peer_id: any; peer_hand: any; }) {
        let peer_id = peer_info.peer_id;
        let peer_hand_status = peer_info.peer_hand;
        if (peer_hand_status) {
            let peer_hand = this.getPeerHandBtn(peer_id);
            if (peer_hand) peer_hand.style.display = 'flex';
        }
        //...
    }

    function popupPeerInfo(this: any, id: any, peer_info: any) {
        if (this.showPeerInfo && !this.isMobileDevice) {
            this.setTippy(
                id,
                '<pre>' +
                    JSON.stringify(
                        peer_info,
                        [
                            'join_data_time',
                            'peer_id',
                            'peer_name',
                            'peer_audio',
                            'peer_video',
                            'peer_video_privacy',
                            'peer_screen',
                            'peer_hand',
                            'is_desktop_device',
                            'is_mobile_device',
                            'is_tablet_device',
                            'is_ipad_pro_device',
                            'os_name',
                            'os_version',
                            'browser_name',
                            'browser_version',
                            //'user_agent',
                        ],
                        2,
                    ) +
                    '<pre/>',
                'top-start',
                true,
            );
        }
    }

    // ####################################################
    // HANDLE PEER GEOLOCATION
    // ####################################################

  function  askPeerGeoLocation(this: any, id: string) {
        const words = id.split('___');
        const peer_id = words[0];
        const cmd = {
            type: 'geoLocation',
            from_peer_name: this.peer_name,
            from_peer_id: this.peer_id,
            peer_id: peer_id,
            broadcast: false,
        };
        this.emitCmd(cmd);
        this.peerActionProgress(
            'Geolocation',
            'Geolocation requested. Please wait for confirmation...',
            6000,
            'geolocation',
        );
    }

 function   sendPeerGeoLocation(this: any, peer_id: any, type: any, data: any) {
        const cmd = {
            type: type,
            from_peer_name: this.peer_name,
            from_peer_id: this.peer_id,
            peer_id: peer_id,
            data: data,
            broadcast: false,
        };
        this.emitCmd(cmd);
    }

  function  confirmPeerGeoLocation(this: any, cmd: { from_peer_name: any; from_peer_id: any; }) {
        this.sound('notify');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.geolocation,
            position: 'center',
            title: 'Geo Location',
            html: `Would you like to share your location to ${cmd.from_peer_name}?`,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; }) => {
            result.isConfirmed ? this.getPeerGeoLocation(cmd.from_peer_id) : this.denyPeerGeoLocation(cmd.from_peer_id);
        });
    }

     function getPeerGeoLocation(peer_id: any) {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const geoLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    console.log('GeoLocation --->', geoLocation);

                    rc.sendPeerGeoLocation(peer_id, 'geoLocationOK', geoLocation);
                    // openURL(`https://www.openstreetmap.org/?mlat=${geoLocation.latitude}&mlon=${geoLocation.longitude}`, true);
                    // openURL(`http://maps.apple.com/?ll=${geoLocation.latitude},${geoLocation.longitude}`, true);
                    // openURL(`https://www.google.com/maps/search/?api=1&query=${geoLocation.latitude},${geoLocation.longitude}`, true);
                },
                function (error) {
                    let geoError = error;
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            geoError = 'User denied the request for Geolocation';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            geoError = 'Location information is unavailable';
                            break;
                        case error.TIMEOUT:
                            geoError = 'The request to get user location timed out';
                            break;
                        case error.UNKNOWN_ERROR:
                            geoError = 'An unknown error occurred';
                            break;
                        default:
                            break;
                    }
                    rc.sendPeerGeoLocation(peer_id, 'geoLocationKO', `${rc.peer_name}: ${geoError}`);
                    rc.userLog('warning', geoError, 'top-end', 5000);
                },
            );
        } else {
            rc.sendPeerGeoLocation(
                peer_id,
                'geoLocationKO',
                `${rc.peer_name}: Geolocation is not supported by this browser`,
            );
            rc.userLog('warning', 'Geolocation is not supported by this browser', 'top-end', 5000);
        }
    }

    function  denyPeerGeoLocation(peer_id: any) {
        rc.sendPeerGeoLocation(peer_id, 'geoLocationKO', `${rc.peer_name}: Has declined permission for geolocation`);
    }

    function   handleGeoPeerLocation(this: any, cmd: { data: any; from_peer_name: any; }) {
        const geoLocation = cmd.data;
        this.sound('notify');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.geolocation,
            position: 'center',
            title: 'Geo Location',
            html: `Would you like to open ${cmd.from_peer_name} geolocation?`,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                // openURL(`https://www.openstreetmap.org/?mlat=${geoLocation.latitude}&mlon=${geoLocation.longitude}`, true);
                // openURL(`http://maps.apple.com/?ll=${geoLocation.latitude},${geoLocation.longitude}`, true);
                openURL(
                    `https://www.google.com/maps/search/?api=1&query=${geoLocation.latitude},${geoLocation.longitude}`,
                    true,
                );
            }
        });
    }

    // ##############################################
    // HeyGen Video AI
    // ##############################################

   function getAvatarList(this: any) {
        this.socket
            .request('getAvatarList')
            .then(function (completion: { response: { avatars: any[]; }; }) {
                const avatarVideoAIPreview = document.getElementById('avatarVideoAIPreview');
                const avatarVideoAIcontainer = document.getElementById('avatarVideoAIcontainer');
                avatarVideoAIcontainer.innerHTML = ''; // cleanup the avatar container

                const excludedIds = [
                    'josh_lite3_20230714',
                    'josh_lite_20230714',
                    'Lily_public_lite1_20230601',
                    'Brian_public_lite1_20230601',
                    'Brian_public_lite2_20230601',
                    'Eric_public_lite1_20230601',
                    'Mido-lite-20221128',
                ];

                const freeAvatars = [
                    'Kristin in Black Suit',
                    'Angela in Black Dress',
                    'Kayla in Casual Suit',
                    'Anna in Brown T-shirt',
                    'Briana in Brown suit',
                    'Justin in White Shirt',
                    'Leah in Black Suit',
                    'Wade in Black Jacket',
                    'Tyler in Casual Suit',
                    'Tyler in Shirt',
                    'Tyler in Suit',
                    'default',
                ];

                completion.response.avatars.forEach((avatar: { avatar_states: any[]; name: string; }) => {
                    avatar.avatar_states.forEach((avatarUi: { id: string; pose_name: string; normal_thumbnail_medium: string; default_voice: { free: { voice_id: string; }; }; video_url: string; }) => {
                        if (
                            !excludedIds.includes(avatarUi.id) &&
                            (showFreeAvatars ? freeAvatars.includes(avatarUi.pose_name) : true)
                        ) {
                            const div = document.createElement('div');
                            div.style.float = 'left';
                            div.style.padding = '5px';
                            div.style.width = '100px';
                            div.style.height = '200px';
                            const img = document.createElement('img');
                            const hr = document.createElement('hr');
                            const label = document.createElement('label');
                            const textContent = document.createTextNode(avatarUi.pose_name);
                            label.appendChild(textContent);
                            //label.style.fontSize = '12px';
                            img.setAttribute('id', avatarUi.id);
                            img.setAttribute('class', 'avatarImg');
                            img.setAttribute('src', avatarUi.normal_thumbnail_medium);
                            img.setAttribute('width', '100%');
                            img.setAttribute('height', 'auto');
                            img.setAttribute('alt', avatarUi.pose_name);
                            img.setAttribute('style', 'cursor:pointer; padding: 2px; border-radius: 5px;');
                            img.setAttribute(
                                'avatarData',
                                avatarUi.id +
                                    '|' +
                                    avatar.name +
                                    '|' +
                                    avatarUi.default_voice.free.voice_id +
                                    '|' +
                                    avatarUi.video_url.grey,
                            );
                            img.onclick = () => {
                                const avatarImages = document.querySelectorAll('.avatarImg');
                                avatarImages.forEach((image) => {
                                    image.style.border = 'none';
                                });
                                img.style.border = 'var(--border)';
                                const avatarData = img.getAttribute('avatarData');
                                const avatarDataArr = avatarData.split('|');
                                VideoAI.avatar = avatarDataArr[0];
                                VideoAI.avatarName = avatarDataArr[1];
                                VideoAI.avatarVoice = avatarDataArr[2] ? avatarDataArr[2] : '';
                                avatarVideoAIPreview.src = avatarUi.video_url.grey;
                                avatarVideoAIPreview.play();
                                console.log('Avatar image click event', {
                                    avatar,
                                    avatarUi,
                                    avatarDataArr,
                                });
                            };
                            div.append(img);
                            div.append(hr);
                            div.append(label);
                            avatarVideoAIcontainer.append(div);
                            // Show the first available free avatar
                            if (showFreeAvatars && avatarUi.pose_name === 'Kristin in Black Suit') {
                                avatarVideoAIPreview.src = avatarUi.video_url.grey;
                                avatarVideoAIPreview.play();
                            }
                        }
                    });
                });
            })
            .catch((err: any) => {
                console.error('Video AI getAvatarList error:', err);
            });
    }

   function getVoiceList(this: any) {
        this.socket
            .request('getVoiceList')
            .then(function (completion: { response: { list: any[]; }; }) {
                const selectElement = document.getElementById('avatarVoiceIDs');
                selectElement.innerHTML = '<option value="">Select Avatar Voice</option>'; // Reset options with default

                // Sort the list alphabetically by language
                const sortedList = completion.response.list.sort((a: { language: string; }, b: { language: any; }) => a.language.localeCompare(b.language));

                sortedList.forEach((flag: { is_paid: any; voice_id: any; language: any; display_name: any; gender: any; }) => {
                    // console.log('flag', flag);
                    const { is_paid, voice_id, language, display_name, gender } = flag;
                    if (showFreeAvatars ? is_paid == false : true) {
                        const option = document.createElement('option');
                        option.value = voice_id;
                        option.text = `${language}, ${display_name} (${gender})`; // You can customize the display text
                        selectElement.appendChild(option);
                    }
                });

                // Event listener for changes on select element
                selectElement.addEventListener('change', (event) => {
                    const selectedVoiceID = event.target.value;
                    const selectedPreviewURL = completion.response.list.find(
                        (flag: { voice_id: any; }) => flag.voice_id === selectedVoiceID,
                    )?.preview?.movio;
                    VideoAI.avatarVoice = selectedVoiceID;
                    if (selectedPreviewURL) {
                        const previewAudio = document.getElementById('previewAudio');
                        previewAudio.src = selectedPreviewURL;
                        previewAudio.play();
                    }
                });
            })
            .catch((err: any) => {
                console.error('Video AI getVoiceList error:', err);
            });
    }

    async function handleVideoAI(this: any) {
        const vb = document.createElement('div');
        vb.setAttribute('id', 'avatar__vb');
        vb.className = 'videoMenuBar fadein';

        const fs = document.createElement('button');
        fs.id = 'avatar__fs';
        fs.className = html.fullScreen;

        const pin = document.createElement('button');
        pin.id = 'avatar__pin';
        pin.className = html.pin;

        const ss = document.createElement('button');
        ss.id = 'avatar__stopSession';
        ss.className = html.kickOut;

        const avatarName = document.createElement('div');
        const an = document.createElement('span');
        an.id = 'avatar__name';
        an.className = html.userName;
        an.innerText = VideoAI.avatarName;

        // Create video container element
        this.videoAIContainer = document.createElement('div');
        this.videoAIContainer.className = 'Camera';
        this.videoAIContainer.id = 'videoAIContainer';

        // Create canvas element for video rendering
        this.canvasAIElement = document.createElement('canvas');
        this.canvasAIElement.className = '';
        this.canvasAIElement.id = 'canvasAIElement';
        this.canvasAIElement.style.objectFit = this.isMobileDevice ? 'cover' : 'contain';

        // Create video element for avatar
        this.videoAIElement = document.createElement('video');
        this.videoAIElement.id = 'videoAIElement';
        this.videoAIElement.setAttribute('playsinline', true);
        this.videoAIElement.autoplay = true;
        this.videoAIElement.className = '';
        this.videoAIElement.poster = image.poster;
        this.videoAIElement.style.objectFit = this.isMobileDevice ? 'cover' : 'contain';

        // Append elements to video container
        vb.appendChild(ss);
        this.isVideoFullScreenSupported && vb.appendChild(fs);
        !this.isMobileDevice && vb.appendChild(pin);
        avatarName.appendChild(an);

        this.videoAIContainer.appendChild(this.videoAIElement);
        VideoAI.virtualBackground && this.videoAIContainer.appendChild(this.canvasAIElement);
        this.videoAIContainer.appendChild(vb);
        this.videoAIContainer.appendChild(avatarName);
        this.videoMediaContainer.appendChild(this.videoAIContainer);

        // Hide canvas initially
        this.canvasAIElement.hidden = true;

        // Use video avatar virtual background
        if (VideoAI.virtualBackground) {
            this.isVideoFullScreenSupported && this.handleFS(this.canvasAIElement.id, fs.id);
            this.handlePN(this.canvasAIElement.id, pin.id, this.videoAIContainer.id, true);
        } else {
            this.isVideoFullScreenSupported && this.handleFS(this.videoAIElement.id, fs.id);
            this.handlePN(this.videoAIElement.id, pin.id, this.videoAIContainer.id, true);
        }

        ss.onclick = () => {
            this.stopSession();
        };

        if (!this.isMobileDevice) {
            this.setTippy(pin.id, 'Toggle Pin', 'bottom');
            this.setTippy(fs.id, 'Toggle full screen', 'bottom');
            this.setTippy(ss.id, 'Stop VideoAI session', 'bottom');
        }

        handleAspectRatio();

        await this.streamingNew();
    }

    async  function streamingNew(this: any) {
        try {
            const { quality, avatar, avatarVoice } = VideoAI;

            const response = await this.socket.request('streamingNew', {
                quality: quality,
                avatar_name: avatar,
                voice_id: avatarVoice,
            });

            if (!response || Object.keys(response).length === 0 || response.error) {
                this.userLog('error', 'Error to creating the avatar', 'top-end');
                this.stopSession();
                return;
            }

            if (response.response.code !== 100) {
                this.userLog('warning', response.response.message, 'top-end');
                this.stopSession();
                return;
            }

            VideoAI.info = response.response.data;

            console.log('Video AI streamingNew', VideoAI);

            const { sdp, ice_servers2 } = VideoAI.info;

            await this.setupPeerConnection(sdp, ice_servers2);

            await this.startSession();
        } catch (error) {
            this.userLog('error', error, 'top-end');
            console.error('Video AI streamingNew error:', error);
            this.stopSession();
        }
    }

    async  function setupPeerConnection(this: any, sdp: RTCSessionDescriptionInit, iceServers: any) {
        this.peerConnection = new RTCPeerConnection({ iceServers: iceServers });

        this.peerConnection.ontrack = (event: { track: { kind: string; }; streams: any[]; }) => {
            if (event.track.kind === 'audio' || event.track.kind === 'video') {
                this.videoAIElement.srcObject = event.streams[0];
            }
        };

        this.peerConnection.ondatachannel = (event: { channel: { onmessage: any; }; }) => {
            event.channel.onmessage = this.handleVideoAIMessage;
        };

        const remoteDescription = new RTCSessionDescription(sdp);
        this.peerConnection.setRemoteDescription(remoteDescription);
    }

 function   handleVideoAIMessage(event: { data: any; }) {
        console.log('handleVideoAIMessage', event.data);
    }

    async function startSession(this: any) {
        if (!VideoAI.info) {
            this.userLog('warning', 'Please create a connection first', 'top-end');
            return;
        }
        this.userLog('info', 'Starting session... please wait', 'top-end');
        try {
            const answer = await this.peerConnection.createAnswer();

            await this.peerConnection.setLocalDescription(answer);

            await this.streamingStart(VideoAI.info.session_id, answer);

            this.peerConnection.onicecandidate = async ({ candidate }) => {
                if (candidate) {
                    await this.streamingICE(candidate);
                }
            };
        } catch (error) {
            this.userLog('error', error, 'top-end');
            console.error('Video AI startSession error:', error);
        }
    }

    async function streamingICE(this: any, candidate: { toJSON: () => any; }) {
        try {
            const response = await this.socket.request('streamingICE', {
                session_id: VideoAI.info.session_id,
                candidate: candidate.toJSON(),
            });

            if (response && !response.error) {
                return response.response;
            }
        } catch (error) {
            console.error('Video AI streamingICE error:', error);
        }
    }

    async  function streamingStart(sessionId: any, sdp: any); {
        try {
            const response = await this.socket.request('streamingStart', {
                session_id: sessionId,
                sdp: sdp,
            });

            if (!response || response.error) return;

            this.startRendering();

            VideoAI.active = true;

            this.userLog('info', 'Video AI streaming started', 'top-end');
        } catch (error) {
            console.error('Video AI streamingStart error:', error);
        }
    }

    function  streamingTask(message: any); {
        if (VideoAI.enabled && VideoAI.active && message) {
            const response = this.socket.request('streamingTask', {
                session_id: VideoAI.info.session_id,
                text: message,
            });
            console.log('Video AI streamingTask', response);
        }
    }

    function   startRendering() ;{
        if (!VideoAI.virtualBackground) return;

        let frameCounter = 0;

        this.renderAIToken = Math.trunc(1e9 * Math.random());
        frameCounter = this.renderAIToken;

        this.videoAIElement.hidden = true;
        this.canvasAIElement.hidden = false;

        const context = this.canvasAIElement.getContext('2d', { willReadFrequently: true });

        const renderFrame = () => {
            if (this.renderAIToken !== frameCounter) return;

            this.canvasAIElement.width = this.videoAIElement.videoWidth;
            this.canvasAIElement.height = this.videoAIElement.videoHeight;

            context.drawImage(this.videoAIElement, 0, 0, this.canvasAIElement.width, this.canvasAIElement.height);

            const imageData = context.getImageData(0, 0, this.canvasAIElement.width, this.canvasAIElement.height);
            const pixels = imageData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                if (shouldHidePixel([pixels[i], pixels[i + 1], pixels[i + 2]])) {
                    pixels[i + 3] = 0; // Make pixel transparent
                }
            }

            function shouldHidePixel([r, g, b]) {
                // Adjust the thresholds to match the green screen background
                const greenThreshold = 90;
                const redThreshold = 90;
                const blueThreshold = 90;
                return g > greenThreshold && r < redThreshold && b < blueThreshold;
            }

            context.putImageData(imageData, 0, 0);
            requestAnimationFrame(renderFrame);
        };

        // Set the background of the canvas' parent element to an image or color of your choice
        this.canvasAIElement.parentElement.style.background = `url("${VideoAI.background}") center / cover no-repeat`;

        setTimeout(renderFrame, 1000);
    }

    function  stopRendering() ;{
        this.renderAIToken = null;
    }

    function   stopSession(); {
        const videoAIElement = this.getId('videoAIElement');
        if (videoAIElement) {
            videoAIElement.parentNode.removeChild(videoAIElement);
        }
        const videoAIContainer = this.getId('videoAIContainer');
        if (videoAIContainer) {
            videoAIContainer.parentNode.removeChild(videoAIContainer);
            const removeVideoAI = ['videoAIElement', 'canvasAIElement'];
            if (this.isVideoPinned && removeVideoAI.includes(this.pinnedVideoPlayerId)) {
                this.removeVideoPinMediaContainer();
            }
        }

        handleAspectRatio();

        this.streamingStop();
    }

    function   streamingStop();  {
        if (this.peerConnection) {
            console.info('Video AI streamingStop peerConnection close done!');
            this.peerConnection.close();
            this.peerConnection = null;
        }
        if (VideoAI.info && VideoAI.info.session_id) {
            const sessionId = VideoAI.info.session_id;
            this.socket
                .request('streamingStop', { session_id: sessionId })
                .then(() => {
                    console.info('Video AI streamingStop done!');
                })
                .catch((error: any) => {
                    console.error('Video AI streamingStop error:', error);
                });
        }

        this.stopRendering();

        VideoAI.active = false;
    }

    sleep(ms); {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
} ;// End