import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private playerName: string|null = null;
  private playerId: string|null = null;
  private token: string|null = null;
  private channelId: string|null = null;


  constructor() {
    // todo config, local-storage, setter
    this.playerName = 'stubby';
    this.channelId = '1058469312077250590';
    this.token = 'ODkxNzIwMjM3ODA2OTE5OTY0.GIEC2o.bjiUwKTUMP1QHT0_UqRSPfXLWgoEqI9rVRf4_s';
    this.playerId = '891720237806919964';
  }

  getPlayerName(): string|null {
    return this.playerName;
  }

  getToken(): string|null {
    return this.token;
  }

  getChannelId(): string|null {
    return this.channelId;
  }

  getPlayerId(): string|null {
    return this.playerId;
  }
}
