import { Injectable } from '@angular/core';
import {Subscription, timer} from "rxjs";
import {DiscordReaderService} from "./core/discord-reader.service";
import {DiscordWriterService} from "./core/discord-writer.service";
import {filter} from "rxjs/operators";
import {SettingsService} from "./core/settings.service";

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private subscription: Subscription | null = null;
  private timer: Subscription | null = null;
  private workTime = 5 * 60 * 1000;
  private workType = 'chainsaw';

  constructor(private reader: DiscordReaderService, private writer: DiscordWriterService, private settings: SettingsService) { }

  start() {
    if (!this.subscription) {
      this. subscription = this.reader.myBotMessages.pipe(
        filter(message => message.content.includes('plants '))
      ).subscribe(
        message => {
          this.timer = timer(this.workTime).subscribe(_ => this.post());
          if (this.workType === 'dynamite') {
            this.writer.pushMessage('rpg trade e all');
          }
        }
      )
    }
    this.post();
  }

  private post() {
    this.writer.pushMessage('rpg ' + this.workType);
  }

  private isWorkCommandResult(text: string): boolean {
    return text.includes('is chopping') || text.includes('is fishing') || text.includes('is collection') || text.includes('is mining')
    || text.indexOf('**' + this.settings.getPlayerName() + '** found') === 0;
  }
}
