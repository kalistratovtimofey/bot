import { Injectable } from '@angular/core';
import {DiscordReaderService} from "./core/discord-reader.service";
import {DiscordWriterService} from "./core/discord-writer.service";
import {Observable, Subscription, timer} from "rxjs";
import {filter, tap} from "rxjs/operators";
import {adventureMonsters} from "./model/AdventureMobList";
import {SettingsService} from "./core/settings.service";

@Injectable({
  providedIn: 'root'
})
export class HuntService {

  private isHardmode = true;
  private subscription: Subscription | null = null;
  private timer: Subscription | null = null;
  private huntTime = 60 * 1000;
  private needHealing = false;

  constructor(private reader: DiscordReaderService, private writer: DiscordWriterService, private settings: SettingsService) { }

  start() {
    if (!this.settings.getAdvSettings().enabled) {
      return;
    }
    this.isHardmode = this.settings.getAdvSettings().useHardmode;
    this.needHealing = this.settings.getAdvSettings().useHeal;
    if (!this.subscription) {
      this. subscription = this.reader.myBotMessages.pipe(
        filter(message => message.content.includes('found ') && this.isNotAdventureMessage(message.content))
      ).subscribe(
        message => {
          this.timer = timer(this.huntTime).subscribe(_ => this.post());
          if (this.needHealing) {
            this.writer.pushMessage('rpg heal');
          }
        }
      )
    }
    this.post();
  }

  private post() {
    this.writer.pushMessage('rpg hunt ' + (this.isHardmode ? 'h' : ''));
  }

  private isNotAdventureMessage(text: string) {
    for (const monster in adventureMonsters) {
      if (text.includes('**' + monster.toUpperCase() + '**')) {
        return false;
      }
    }
    return true;
  }
}
