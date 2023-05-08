import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {DiscordMessage} from "./core/model/discord-message";
import {AbstractCommandService} from "./core/abstract-command.service";

@Injectable({
  providedIn: 'root'
})
export class TrainService extends AbstractCommandService{

  override timer = 15 * 60 * 1000 + 1000;

  protected fireCommand() {
    this.writer.pushMessage('rpg tr ');
  }

  protected processMessage(text: string) {
    console.log('solving training ', text);
    if (text.includes('casino')) {
      console.log('casino training');
      const pairs: Record<string, string> = {
        'diamond' : ':gem:',
        'gift': ':gift:',
        'coin': ':coin:',
        'four leaf clover': ':four_leaf_clover:',
        'dice': 'game_die',

      }
      let foundPair = false;
      for(const name in pairs) {
        if (text.toLowerCase().includes('this a **' + name) && text.includes(pairs[name])) {
          this.writer.pushReaction('yes');
          foundPair = true;
        }
      }
      if (!foundPair) {
        this.writer.pushReaction('no');
      }
    }

    if (text.includes('river')) {
      console.log('river training');
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
      console.log('mine training');
      this.writer.pushReaction('no');
    }

    if (text.includes('field')) {
      console.log('field training');
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
      console.log('forest training');
      const regex = /how many <:([a-z]+):/;
      const item = text.toLowerCase().match(regex)![1];
      const count = text.toLowerCase().split(item).length - 2;
      this.writer.pushReaction(String(count));
    }
  }

  protected updateSettings(): void {
    this.enabled = this.settings.getTrainSettings().enabled
  }

  protected filterMessages(messages: Observable<DiscordMessage>): Observable<DiscordMessage> {
    return messages.pipe(
      filter(message => message.content.includes('is training '))
    );
  }
}
