import { Injectable } from '@angular/core';
import {Subscription, timer} from "rxjs";
import {DiscordReaderService} from "./core/discord-reader.service";
import {DiscordWriterService} from "./core/discord-writer.service";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  private subscription: Subscription | null = null;
  private timer: Subscription | null = null;
  private trainTime = 15 * 60 * 1000;


  constructor(private reader: DiscordReaderService, private writer: DiscordWriterService) { }

  start() {
    if (!this.subscription) {
      this. subscription = this.reader.myBotMessages.pipe(
        filter(message => message.content.includes('is training '))
      ).subscribe(
        message => {
          this.timer = timer(this.trainTime).subscribe(_ => this.post());
          this.solveTraining(message.content);
        }
      )
    }
    this.post();
  }

  private post() {
    this.writer.pushMessage('rpg tr ');
  }

  private solveTraining(text: string) {
    if (text.includes('casino')) {
      const pairs: Record<string, string> = {
        'diamond' : ':gem:',
        'gift': ':gift:',
        'coin': ':coin:',
        'four leaf clover': ':four_leaf_clover:',
        'dice': 'game_die',

      }
      let foundPair = false;
      for(const name in pairs) {
        if (text.toLowerCase().includes('this a ' + name) && text.includes(pairs[name])) {
          this.writer.pushReaction('yes');
          foundPair = true;
        }
      }
      if (!foundPair) {
        this.writer.pushReaction('no');
      }
    }

    if (text.includes('river')) {
      if (text.toLowerCase().includes(':epicfish:')) {
        this.writer.pushReaction('3');
      }
      if (text.toLowerCase().includes(':goldenfish:')) {
        this.writer.pushReaction('2');
      }
      if (text.toLowerCase().includes(':normiefish:')) {
        this.writer.pushReaction('1');
      }
    }

    if (text.includes('mine')) {
      this.writer.pushReaction('no');
    }

    if (text.includes('field')) {
      const word = text.toLowerCase().includes('apple') ? 'apple' : 'banana';
      if (text.includes('first')) {
        this.writer.pushReaction(word[0]);
      }
      if (text.includes('second')) {
        this.writer.pushReaction(word[1]);
      }
      if (text.includes('third')) {
        this.writer.pushReaction(word[2]);
      }
      if (text.includes('fourth')) {
        this.writer.pushReaction(word[3]);
      }
      if (text.includes('fifth')) {
        this.writer.pushReaction(word[4]);
      }
      if (text.includes('sixth')) {
        this.writer.pushReaction(word[5]);
      }
    }

    if (text.includes('forest')) {
      const regex = /how many <:([a-z]+):/;
      const item = text.match(regex)![1];
      const count = text.split(item).length - 2;
      this.writer.pushReaction(String(count));
    }
  }
}
