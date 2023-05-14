import { Injectable } from '@angular/core';
import {DiscordApiService} from "./discord-api.service";
import {combineLatest, interval, Subject, throttleTime} from "rxjs";
import {AntibotStopperService} from "./antibot-stopper.service";

@Injectable({
  providedIn: 'root'
})
export class DiscordWriterService {

  private messageQueue: string[] = [];
  _pushEvent = new Subject<void>();

  constructor(private api: DiscordApiService, private stopper: AntibotStopperService) {
    combineLatest([this.stopper.isAllowed$, interval(1300)])
      .subscribe(([isAllowed]) => {
        if (isAllowed) {
          const message = this.messageQueue.shift();
          if (message) {
            this.api.write(message!);
          }
        }
      }
    )
  }

  pushMessage(message: string): void {
    this.messageQueue.push(message);
  }

  pushReaction(message: string): void {
    this.api.write(message);
  }
}
