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
    if (event.includes('a megalodon') && this.settingsService.getEventsSettings().lure.enabled) {
      this.fireMessage(message.channel_id!, 'lure', this.settingsService.getEventsSettings().lure.timer);
    }
    if (event.includes('an epic tree') && this.settingsService.getEventsSettings().cut.enabled) {
      this.fireMessage(message.channel_id!, 'cut', this.settingsService.getEventsSettings().cut.timer);
    }
    if (event.includes('raining coins') && this.settingsService.getEventsSettings().catch.enabled) {
      this.fireMessage(message.channel_id!, 'catch', this.settingsService.getEventsSettings().catch.timer);
    }
    if (event.includes('lootbox summoning') && this.settingsService.getEventsSettings().summon.enabled) {
      this.fireMessage(message.channel_id!, 'summon', this.settingsService.getEventsSettings().summon.timer);
    }
    if (event.includes('legendary boss just spawned') && this.settingsService.getEventsSettings().boss.enabled) {
      this.fireMessage(message.channel_id!, 'time to fight', this.settingsService.getEventsSettings().boss.timer);
    }
    if (event.includes('the arena') && this.settingsService.getEventsSettings().arena.enabled) {
      this.fireMessage(message.channel_id!, 'join', this.settingsService.getEventsSettings().arena.timer);
    }
  }

  private fireMessage(channelId: string, message: string, wait: number) {
    timer(wait).pipe(
      withLatestFrom(this.antiGuard.isAllowed$),
      filter(([_, isAllowed]) => isAllowed)
    )
    setTimeout(() => this.api.writeToChannel(channelId, message), wait);
  }
}
