import { Injectable } from '@angular/core';
import {Subscription, timer} from "rxjs";
import {DiscordReaderService} from "./core/discord-reader.service";
import {DiscordWriterService} from "./core/discord-writer.service";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private subscription: Subscription | null = null;

  constructor(private reader: DiscordReaderService, private writer: DiscordWriterService) { }

  start() {
    if (!this.subscription) {
      this. subscription = this.reader.myBotMessages.pipe(
        filter(message => message.content.toLowerCase().includes('suddenly, a '))
      ).subscribe(
        message => {
          const happinessRegex = /hapiness\*\*: ([0-9]+)/;
          const hungerRegex = /hunger\*\*: ([0-9]+)/;
          const happiness = +message.content.match(happinessRegex)![1];
          const hunger = +message.content.match(hungerRegex)![1];
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
