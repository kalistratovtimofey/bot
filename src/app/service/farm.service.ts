import { Injectable } from '@angular/core';
import {Subscription, timer} from "rxjs";
import {DiscordReaderService} from "./core/discord-reader.service";
import {DiscordWriterService} from "./core/discord-writer.service";
import {filter} from "rxjs/operators";
import {SettingsService} from "./core/settings.service";

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  private subscription: Subscription | null = null;
  private timer: Subscription | null = null;
  private farmTime = 10 * 60 * 1000;
  private farmType = '';

  constructor(private reader: DiscordReaderService, private writer: DiscordWriterService, private settings: SettingsService) { }

  start() {
    if (!this.settings.getFarmSettings().enabled) {
      return;
    }
    this.farmType = this.settings.getFarmSettings().type;
    if (!this.subscription) {
      this. subscription = this.reader.myBotMessages.pipe(
        filter(message => message.content.includes('plants '))
      ).subscribe(
        message => {
          this.timer = timer(this.farmTime).subscribe(_ => this.post());
        }
      )
    }
    this.post();
  }

  private post() {
    this.writer.pushMessage('rpg farm ' + this.farmType);
  }
}
