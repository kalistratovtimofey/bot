import {Injectable} from '@angular/core';
import {
  EnchantSettings,
  EnchantValues,
  EventsSettings,
  FarmSettings,
  HuntSettings,
  Settings,
  TrainSettings,
  WorkSettings
} from "./model/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: Settings

  constructor() {
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      this.settings = JSON.parse(storedSettings);
      // backport compatibility
      if (!this.settings.randomEvents) {
        this.settings.randomEvents = {
          lure: {
            enabled: false,
              timer: 1500,
          },
          cut: {
            enabled: false,
              timer: 1500,
          },
          catch: {
            enabled: false,
              timer: 1500,
          },
          summon: {
            enabled: false,
              timer: 1500,
          },
          boss: {
            enabled: false,
              timer: 1500,
          },
          arena: {
            enabled: false,
              timer: 1500,
          },
        };
      }
      if (!this.settings.enchant) {
        this.settings.enchant = {
          command: 'enchant',
          value: EnchantValues.epic,
        };
      }
      if (!this.settings.timeout) {
        this.settings.timeout = 1100;
      }
    } else {
      this.settings = {
        token: '',
        playerName: '',
        playerId: '',
        channelId: '',
        botName: 'EPIC RPG',
        timeout: 11100,

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
          tradeBefore: false,
        },
        randomEvents: {
          lure: {
            enabled: false,
            timer: 1500,
          },
          cut: {
            enabled: false,
            timer: 1500,
          },
          catch: {
            enabled: false,
            timer: 1500,
          },
          summon: {
            enabled: false,
            timer: 1500,
          },
          boss: {
            enabled: false,
            timer: 1500,
          },
          arena: {
            enabled: false,
            timer: 1500,
          },
        },
        enchant: {
          command: 'enchant',
          value: EnchantValues.epic,
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

  getTimeout(): number {
    return this.settings.timeout;
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

  getEventsSettings(): EventsSettings {
    return this.settings.randomEvents;
}

getEnchantSettings(): EnchantSettings {
    return this.settings.enchant;
}

  setSettings(settings: Partial<Settings>): void {
    this.settings = { ...this.settings, ...settings};
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
}
