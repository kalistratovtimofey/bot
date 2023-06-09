import { Injectable } from '@angular/core';
import {SettingsService} from "./settings.service";
import {Observable} from "rxjs";
import {DiscordMessage} from "./model/discord-message";
import {WebsocketService} from "./websocket.service";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DiscordReaderService {

  myBotMessages: Observable<DiscordMessage>;
  botRichMessages: Observable<DiscordMessage>;

  private botUsername = 'EPIC RPG';

  constructor(private settings: SettingsService, private ws: WebsocketService) {
    this.myBotMessages = this.ws.messages$.pipe(
      filter(message => message.author.username === this.botUsername),
      filter(message => message.content.includes('**'+this.settings.getPlayerName()+ '**') || message.content.includes(this.settings.getPlayerId()!))
    )

    this.botRichMessages = this.ws.messages$.pipe(
      filter(message => message.author.username === this.botUsername),
      filter(message => message.content === '' && message.embeds.length > 0),
    )
  }
}
