import { Injectable } from '@angular/core';
import {DiscordWriterService} from "./core/discord-writer.service";
import {DiscordReaderService} from "./core/discord-reader.service";
import {SettingsService} from "./core/settings.service";
import {WebsocketService} from "./core/websocket.service";
import {filter, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AutoSettingsService {

  constructor(private settingsService: SettingsService, private writer: DiscordWriterService, private websocket: WebsocketService) { }

  update() {
    const rnd = '' + Math.random();
    this.websocket.messages$.pipe(
      filter(message => message.content === rnd),
      take(1)
    ).subscribe(
      message => {
        this.settingsService.setSettings({
          playerName: message.author.username,
          playerId: message.author.id
          });
        window.location.reload();
      }
    );
    this.writer.pushReaction(rnd);
  }
}
