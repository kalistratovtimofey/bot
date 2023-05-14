import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{
  started = false;
  token = this.settings.getToken();
  channelId = this.settings.getChannelId();
  playerName = this.settings.getPlayerName();
  playerId = this.settings.getPlayerId();
  botName = this.settings.getBotName();
  timeout = this.settings.getTimeout();

  constructor(private settings: SettingsService) {
  }

  ngOnInit(): void {
    this.token = this.settings.getToken()
  }

  updateToken(token:string): void {
    this.settings.setSettings({token});
  }

  updateChannelId(channelId: string): void {
    this.settings.setSettings({channelId});
  }

  updatePlayerName(playerName: string): void {
    this.settings.setSettings({playerName});
  }

  updatePlayerId(playerId: string): void {
    this.settings.setSettings({playerId});
  }

  updateBotName(botName: string): void {
    this.settings.setSettings({botName});
  }

  updateTimeout(timeout: number) {
    this.settings.setSettings({timeout});
  }

}
