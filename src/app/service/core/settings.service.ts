import { Injectable } from '@angular/core';
import {FarmSettings, HuntSettings, Settings, TrainSettings, WorkSettings} from "./model/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: Settings

  private playerName: string|null = null;
  private playerId: string|null = null;
  private token: string|null = null;
  private channelId: string|null = null;


  constructor() {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      this.settings = JSON.parse(storedSettings);
    } else {
      this.settings = {
        token: '',
        playerName: '',
        playerId: '',
        channelId: '',
        botName: 'EPIC RPG',

        hunt: {
          enabled: true,
          useHardmode: true,
          useHeal: false,
        },

        adventure: {
          enabled: true,
          useHardmode: true,
          useHeal: false,
        },

        work: {
          enabled: true,
          command: 'chainsaw',
        },

        farm: {
          enabled: true,
          type: ''
        },

        train: {
          enabled: true,
          enabledPetCapture: true,
        }
      };
    }
  }

  getPlayerName(): string {
    return this.settings.playerName;
  }

  getToken(): string {
    return this.settings.token;
  }

  getChannelId(): string {
    return this.settings.channelId;
  }

  getPlayerId(): string {
    return this.settings.playerId;
  }

  getBotName(): string {
    return this.settings.botName;
  }

  getHuntSettings(): HuntSettings {
    return this.settings.hunt;
  }

  getAdvSettings(): HuntSettings {
    return this.settings.adventure;
  }

  getWorkSettings(): WorkSettings {
    return this.settings.work;
  }

  getFarmSettings(): FarmSettings {
    return this.settings.farm;
  }

  getTrainSettings(): TrainSettings {
    return this.settings.train;
  }

  setSettings(settings: Partial<Settings>): void {
    this.settings = { ...this.settings, ...settings};
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
}
