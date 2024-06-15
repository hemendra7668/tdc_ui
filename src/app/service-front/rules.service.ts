import { Injectable } from '@angular/core';
import { RoomComponent } from '../views/room/room.component';
@Injectable({
  providedIn: 'root'
})
export class RulesService {
  isPresenter = false;
  isRulesActive = true;

  BUTTONS: {
    main: {
      [key: string]: boolean;
    };
    settings: {
      [key: string]: boolean;
    };
    producerVideo: {
      [key: string]: boolean;
    };
    consumerVideo: {
      [key: string]: boolean;
    };
    videoOff: {
      [key: string]: boolean;
    };
    chat: {
      [key: string]: boolean;
    };
    participantsList: {
      [key: string]: boolean;
    };
    whiteboard: {
      [key: string]: boolean;
    };
  } = {
    main: {
      shareButton: true,
      hideMeButton: true,
      startAudioButton: true,
      startVideoButton: true,
      startScreenButton: true,
      swapCameraButton: true,
      chatButton: true,
      raiseHandButton: true,
      transcriptionButton: true,
      whiteboardButton: true,
      emojiRoomButton: true,
      settingsButton: true,
      aboutButton: true,
      exitButton: true,
    },
    settings: {
      fileSharing: true,
      lockRoomButton: true,
      unlockRoomButton: true,
      broadcastingButton: true,
      lobbyButton: true,
      sendEmailInvitation: true,
      micOptionsButton: true,
      tabModerator: true,
      tabRecording: true,
      host_only_recording: true,
      pushToTalk: true,
    },
    producerVideo: {
      videoPictureInPicture: true,
      fullScreenButton: true,
      snapShotButton: true,
      muteAudioButton: true,
      videoPrivacyButton: true,
    },
    consumerVideo: {
      videoPictureInPicture: true,
      fullScreenButton: true,
      snapShotButton: true,
      sendMessageButton: true,
      sendFileButton: true,
      sendVideoButton: true,
      muteVideoButton: true,
      muteAudioButton: true,
      audioVolumeInput: true,
      geolocationButton: true,
      banButton: true,
      ejectButton: true,
    },
    videoOff: {
      sendMessageButton: true,
      sendFileButton: true,
      sendVideoButton: true,
      muteAudioButton: true,
      audioVolumeInput: true,
      geolocationButton: true,
      banButton: true,
      ejectButton: true,
    },
    chat: {
      chatPinButton: true,
      chatMaxButton: true,
      chatSaveButton: true,
      chatEmojiButton: true,
      chatMarkdownButton: true,
      chatSpeechStartButton: true,
      chatGPT: true,
    },
    participantsList: {
      saveInfoButton: true,
      sendFileAllButton: true,
      ejectAllButton: true,
      sendFileButton: false,
      geoLocationButton: true,
      banButton: true,
      ejectButton: true,
    },
    whiteboard: {
      whiteboardLockButton: true,
    },
  };
  constructor(private roomcompnent: RoomComponent){
  }
  handleRules(isPresenter: boolean) {
    console.log('07.1 ----> IsPresenter: ' + isPresenter);
    if (!this.isRulesActive) return;

    if (!isPresenter) {
      this.BUTTONS.participantsList['saveInfoButton'] = false;
      this.BUTTONS.settings['lockRoomButton'] = false;
      this.BUTTONS.settings['unlockRoomButton'] = false;
      this.BUTTONS.settings['broadcastingButton'] = false;
      this.BUTTONS.settings['lobbyButton'] = false;
      this.BUTTONS.settings['sendEmailInvitation'] = false;
      this.BUTTONS.settings['micOptionsButton'] = false;
      this.BUTTONS.settings['tabModerator'] = false;
      this.BUTTONS.videoOff['muteAudioButton'] = false;
      this.BUTTONS.videoOff['geolocationButton'] = false;
      this.BUTTONS.videoOff['banButton'] = false;
      this.BUTTONS.videoOff['ejectButton'] = false;
      this.BUTTONS.consumerVideo['geolocationButton'] = false;
      this.BUTTONS.consumerVideo['banButton'] = false;
      this.BUTTONS.consumerVideo['ejectButton'] = false;
      this.BUTTONS.whiteboard['whiteboardLockButton'] = false;
    } else {
      this.BUTTONS.main['shareButton'] = true;
      this.BUTTONS.settings['lockRoomButton'] = this.BUTTONS.settings['lockRoomButton'] && !this.isRoomLocked();
      this.BUTTONS.settings['unlockRoomButton'] = this.BUTTONS.settings['lockRoomButton'] && this.isRoomLocked();
      this.BUTTONS.settings['sendEmailInvitation'] = true;

      // Update buttons and other rules for presenter

       // Room broadcasting
       const isBroadcastingEnabled = this.roomcompnent.localStorageSettings.broadcasting;
       switchBroadcasting.checked = isBroadcastingEnabled;
       this.roomcompnent.rc.roomAction('broadcasting', true, false);
       if (isBroadcastingEnabled) rc.toggleRoomBroadcasting();
       // Room lobby
       const isLobbyEnabled = this.roomcompnent.localStorageSettings.lobby;
       switchLobby.checked =  isLobbyEnabled;
       rc.roomAction(isLobbyEnabled ? 'lobbyOn' : 'lobbyOff', true, false);
       // Room host-only-recording
       const hostOnlyRecording = this.roomcompnent.localStorageSettings.host_only_recording;
       switchHostOnlyRecording.checked = hostOnlyRecording;
       rc.roomAction(hostOnlyRecording ? 'hostOnlyRecordingOn' : 'hostOnlyRecordingOff', true, false);
       // Room moderator
       switchEveryoneMute.checked = localStorageSettings.moderator_audio_start_muted;
       switchEveryoneHidden.checked = localStorageSettings.moderator_video_start_hidden;
       switchEveryoneCantUnmute.checked = localStorageSettings.moderator_audio_cant_unmute;
       switchEveryoneCantUnhide.checked = localStorageSettings.moderator_video_cant_unhide;
       switchEveryoneCantShareScreen.checked = localStorageSettings.moderator_screen_cant_share;
       switchEveryoneCantChatPrivately.checked = localStorageSettings.moderator_chat_cant_privately;
       switchEveryoneCantChatChatGPT.checked = localStorageSettings.moderator_chat_cant_chatgpt;
       switchDisconnectAllOnLeave.checked = localStorageSettings.moderator_disconnect_all_on_leave;

       // Update moderator settings...
       const moderatorData = {
           audio_start_muted: switchEveryoneMute.checked,
           video_start_hidden: switchEveryoneHidden.checked,
           audio_cant_unmute: switchEveryoneCantUnmute.checked,
           video_cant_unhide: switchEveryoneCantUnhide.checked,
           screen_cant_share: switchEveryoneCantShareScreen.checked,
           chat_cant_privately: switchEveryoneCantChatPrivately.checked,
           chat_cant_chatgpt: switchEveryoneCantChatChatGPT.checked,
       };
       console.log('Rules moderator data ---->', moderatorData);
       rc.updateRoomModeratorALL(moderatorData);
    }

    // main. settings...
    this.updateButtonVisibility('main.shareButton', this.BUTTONS.main['shareButton']);
    this.updateButtonVisibility('settings.lockRoomButton', this.BUTTONS.settings['lockRoomButton']);
    this.updateButtonVisibility('settings.unlockRoomButton', this.BUTTONS.settings['unlockRoomButton']);
    this.updateButtonVisibility('settings.broadcastingButton', this.BUTTONS.settings['broadcastingButton']);
    this.updateButtonVisibility('settings.lobbyButton', this.BUTTONS.settings['lobbyButton']);
    this.updateButtonVisibility('settings.sendEmailInvitation', this.BUTTONS.settings['sendEmailInvitation']);
    this.updateButtonVisibility('settings.micOptionsButton', this.BUTTONS.settings['micOptionsButton'], false);
    this.updateButtonVisibility('settings.tabModerator', this.BUTTONS.settings['tabModerator'], false);
  }

  handleRulesBroadcasting() {
    console.log('07.2 ----> handleRulesBroadcasting');
    this.BUTTONS.main['shareButton'] = false;
    this.BUTTONS.main['hideMeButton'] = false;
    this.BUTTONS.main['startAudioButton'] = false;
    this.BUTTONS.main['startVideoButton'] = false;
    this.BUTTONS.main['startScreenButton'] = false;
    this.BUTTONS.main['swapCameraButton'] = false;
    this.BUTTONS.main['whiteboardButton'] = false;
    this.BUTTONS.main['transcriptionButton'] = false;
    this.BUTTONS.main['settingsButton'] = false;
    this.BUTTONS.participantsList['saveInfoButton'] = false;
    this.BUTTONS.settings['lockRoomButton'] = false;
    this.BUTTONS.settings['unlockRoomButton'] = false;
    this.BUTTONS.settings['lobbyButton'] = false;
    this.BUTTONS.videoOff['muteAudioButton'] = false;
    this.BUTTONS.videoOff['geolocationButton'] = false;
    this.BUTTONS.videoOff['banButton'] = false;
    this.BUTTONS.videoOff['ejectButton'] = false;
    this.BUTTONS.consumerVideo['sendMessageButton'] = false;
    this.BUTTONS.consumerVideo['sendFileButton'] = false;
    this.BUTTONS.consumerVideo['sendVideoButton'] = false;
    this.BUTTONS.consumerVideo['geolocationButton'] = false;
    this.BUTTONS.consumerVideo['banButton'] = false;
    this.BUTTONS.consumerVideo['ejectButton'] = false;
    this.BUTTONS.consumerVideo['muteAudioButton'] = false;
    this.BUTTONS.consumerVideo['muteVideoButton'] = false;
    this.BUTTONS.whiteboard['whiteboardLockButton'] = false;

    this.updateButtonVisibility('shareButton', false);
    this.updateButtonVisibility('hideMeButton', false);
    this.updateButtonVisibility('startAudioButton', false);
    this.updateButtonVisibility('stopAudioButton', false);
    this.updateButtonVisibility('startVideoButton', false);
    this.updateButtonVisibility('stopVideoButton', false);
    this.updateButtonVisibility('startScreenButton', false);
    this.updateButtonVisibility('stopScreenButton', false);
    this.updateButtonVisibility('swapCameraButton', false);
    this.updateButtonVisibility('whiteboardButton', false);
    this.updateButtonVisibility('transcriptionButton', false);
    this.updateButtonVisibility('lockRoomButton', false);
    this.updateButtonVisibility('unlockRoomButton', false);
    this.updateButtonVisibility('lobbyButton', false);
    this.updateButtonVisibility('settingsButton', false);
  }

  private isRoomLocked(): boolean {
    // Implement logic to check if the room is locked
    return false;
  }

  private updateButtonVisibility(buttonId: string, isVisible: boolean, shouldHide: boolean = true) {
    const element = document.getElementById(buttonId);
    if (element) {
      if (isVisible) {
        element.style.display = 'block';
      } else if (shouldHide) {
        element.style.display = 'none';
      }
    }
  }
}
