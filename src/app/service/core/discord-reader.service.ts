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
  myRichMessages: Observable<DiscordMessage>;

  private botUsername = 'EPIC RPG';

  constructor(private settings: SettingsService, private ws: WebsocketService) {
    this.myBotMessages = this.ws.messages$.pipe(
      filter(message => message.author.username === this.botUsername),
      filter(message => message.content.includes('**'+this.settings.getPlayerName()+ '**') || message.content.includes(this.settings.getPlayerId()!))
    )

    this.myRichMessages = this.ws.messages$.pipe(
      filter(message => message.author.username === this.botUsername),
      filter(message => this.isMyRichMessage(message))
    )
  }

  private isMyRichMessage(message: DiscordMessage): boolean {
    if (message.embeds) {
      console.log('possibly rich message', message);
    }
    const field = message.embeds?.[0]?.fields?.[0];
    return !!field && field.name.includes(this.settings.getPlayerId()!);
  }
}
