import { Injectable } from '@angular/core';
import {WebsocketService} from "./service/core/websocket.service";
import {filter} from "rxjs/operators";
import {DiscordApiService} from "./service/core/discord-api.service";
import {SettingsService} from "./service/core/settings.service";
import {DiscordMessage} from "./service/core/model/discord-message";

@Injectable({
  providedIn: 'root'
})
export class CustomEventsService {

  constructor(private websocket: WebsocketService, private api: DiscordApiService, private settingsService: SettingsService) {

  }

  start() {
    this.websocket.allBotMessages$
      .pipe(
        filter(message => message.embeds.length > 0),
      )
      .subscribe(message => this.processMessage(message))
  }

  private processMessage(message: DiscordMessage): void {
    const event = message.embeds?.[0]?.fields?.[0].name?.toLowerCase();
    if (!event) {
      return;
    }
    if (event.includes('a megalodon') && this.settingsService.getEventsSettings().lure) {
      this.fireMessage(message.channel_id!, 'lure');
    }
    if (event.includes('an epic tree') && this.settingsService.getEventsSettings().cut) {
      this.fireMessage(message.channel_id!, 'cut');
    }
    if (event.includes('raining coins') && this.settingsService.getEventsSettings().catch) {
      this.fireMessage(message.channel_id!, 'catch');
    }
    if (event.includes('lootbox summoning') && this.settingsService.getEventsSettings().summon) {
      this.fireMessage(message.channel_id!, 'summon');
    }
    if (event.includes('legendary boss') && this.settingsService.getEventsSettings().boss) {
      this.fireMessage(message.channel_id!, 'time to fight');
    }
    if (event.includes('the arena') && this.settingsService.getEventsSettings().arena) {
      this.fireMessage(message.channel_id!, 'join');
    }
  }

  private fireMessage(channelId: string, message: string) {
    setTimeout(() => this.api.writeToChannel(channelId, message), this.settingsService.getEventsSettings().wait);
  }
}
