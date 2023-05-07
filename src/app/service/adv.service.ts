import { Injectable } from '@angular/core';
import {Subscription, timer} from "rxjs";
import {DiscordReaderService} from "./core/discord-reader.service";
import {DiscordWriterService} from "./core/discord-writer.service";
import {filter} from "rxjs/operators";
import {adventureMonsters} from "./model/AdventureMobList";

@Injectable({
  providedIn: 'root'
})
export class AdvService {

  private isHardmode = true;
  private subscription: Subscription | null = null;
  private timer: Subscription | null = null;
  private advTime = 60 * 60 * 1000;
  private needHealing = false;

  constructor(private reader: DiscordReaderService, private writer: DiscordWriterService) { }

  start() {
    if (!this.subscription) {
      this. subscription = this.reader.myBotMessages.pipe(
        filter(message => message.content.includes('found ') && this.isAdventureMessage(message.content))
      ).subscribe(
        message => {
          this.timer = timer(this.advTime).subscribe(_ => this.post());
          if (this.needHealing) {
            this.writer.pushMessage('rpg heal');
          }
        }
      )
    }
    this.post();
  }

  private post() {
    this.writer.pushMessage('rpg adv ' + (this.isHardmode ? 'h' : ''));
  }

  private isAdventureMessage(text: string) {
    for (const monster in adventureMonsters) {
      if (text.includes('**' + monster.toUpperCase() + '**')) {
        return true;
      }
    }
    return false;
  }
}
