import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private playerName: string|null = null;
  private token: string|null = null;
  private channelId: string|null = null;


  constructor() {
    // todo config, local-storage, setter

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
}
