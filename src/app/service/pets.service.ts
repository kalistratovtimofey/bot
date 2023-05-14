import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription, timer} from "rxjs";
import {DiscordReaderService} from "./core/discord-reader.service";
import {DiscordWriterService} from "./core/discord-writer.service";
import {filter, map} from "rxjs/operators";
import {SettingsService} from "./core/settings.service";

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private subscription: Subscription | null = null;

  constructor(private reader: DiscordReaderService, private writer: DiscordWriterService, private settings: SettingsService) { }

  start() {
    if (!this.settings.getTrainSettings().enabledPetCapture) {
      return;
    }

    if (!this.subscription) {
      this. subscription = this.reader.botRichMessages
        .pipe(
          filter(message => message.embeds?.[0]?.fields?.[0].name.includes(this.settings.getPlayerName()!) || false),
          map(message => message.embeds?.[0]?.fields?.[0].value),
          filter(message => !!message)
      ).subscribe(
        message => {
          console.log('try to catch pet', message)
          const happinessRegex = /happiness\*\*: ([0-9]+)/;
          const hungerRegex = /hunger\*\*: ([0-9]+)/;
          const happiness = +message!.toLowerCase().match(happinessRegex)![1];
          const hunger = +message!.toLowerCase().match(hungerRegex)![1];
          let feeds = 0
          if (hunger > 10) {
            feeds = 1;
          }
          if (hunger > 30) {
            feeds = 2
          }
          if (hunger > 50) {
            feeds = 3;
          }
          if (hunger > 70) {
            feeds = 4;
          }
          if (hunger > 90) {
            feeds = 5;
          }
          const possiblePats = 6 - feeds;
          const patsNeeded = Math.round((80-happiness) / 10);
          const pats = Math.min(possiblePats, patsNeeded);
          let command = '';
          for (let i=0; i< feeds; ++i) {
           command += 'feed ';
          }
          for (let i=0; i< pats; ++i) {
            command += 'pat ';
          }
          this.writer.pushReaction(command);
        }
      )
    }
  }
}
