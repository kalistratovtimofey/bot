import { Injectable } from '@angular/core';
import {DiscordReaderService} from "./discord-reader.service";
import {BehaviorSubject, Subject} from "rxjs";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AntibotStopperService {

  private isAllowed: Subject<boolean> = new BehaviorSubject(true);
  isAllowed$ = this.isAllowed.asObservable();

  constructor(private reader: DiscordReaderService) {
    reader.myBotMessages.pipe(
      filter(message => message.content.includes('We have to check you are actually playing'))
    ).subscribe(_ => this.isAllowed.next(false));
    reader.myBotMessages.pipe(
      filter(message => message.content.includes('Everything seems fine'))
    ).subscribe(_ => this.isAllowed.next(true));
  }
}
