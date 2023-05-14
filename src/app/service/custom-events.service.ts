import { Injectable } from '@angular/core';
import {WebsocketService} from "./core/websocket.service";
import {filter, withLatestFrom} from "rxjs/operators";
import {DiscordApiService} from "./core/discord-api.service";
import {SettingsService} from "./core/settings.service";
import {DiscordMessage} from "./core/model/discord-message";
import {AntibotStopperService} from "./core/antibot-stopper.service";
import {timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomEventsService {

  constructor(private websocket: WebsocketService, private api: DiscordApiService, private settingsService: SettingsService, private antiGuard: AntibotStopperService) {

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
      this.fireMessage(message.channel_id!, 'lure', 'simple');
    }
    if (event.includes('an epic tree') && this.settingsService.getEventsSettings().cut) {
      this.fireMessage(message.channel_id!, 'cut', 'simple');
    }
    if (event.includes('raining coins') && this.settingsService.getEventsSettings().catch) {
      this.fireMessage(message.channel_id!, 'catch', 'simple');
    }
    if (event.includes('lootbox summoning') && this.settingsService.getEventsSettings().summon) {
      this.fireMessage(message.channel_id!, 'summon', 'popular');
    }
    if (event.includes('legendary boss just spawned') && this.settingsService.getEventsSettings().boss) {
      this.fireMessage(message.channel_id!, 'time to fight', 'popular');
    }
    if (event.includes('the arena') && this.settingsService.getEventsSettings().arena) {
      this.fireMessage(message.channel_id!, 'join', 'popular');
    }
  }

  private fireMessage(channelId: string, message: string, type: 'simple'|'popular') {
    const wait = type === 'simple' ? this.settingsService.getEventsSettings().waitSimple : this.settingsService.getEventsSettings().wait;
    timer(wait).pipe(
      withLatestFrom(this.antiGuard.isAllowed$),
      filter(([_, isAllowed]) => isAllowed)
    )
    setTimeout(() => this.api.writeToChannel(channelId, message), wait);
  }
}
