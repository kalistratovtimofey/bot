import { Injectable } from '@angular/core';
import {DiscordReaderService} from "./discord-reader.service";
import {DiscordWriterService} from "./discord-writer.service";
import {SettingsService} from "./settings.service";
import {filter} from "rxjs/operators";
import {BehaviorSubject, interval, Observable, Subject, Subscription} from "rxjs";
import {DiscordMessage} from "./model/discord-message";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractCommandService {

  protected enabled = true;
  protected timer = 0;
  private fireAt = 0;
  private subscription: Subscription | null = null;
  private message = new Subject<DiscordMessage>();
  private timeToFire = new BehaviorSubject<number|null>(null);

  message$ = this.message.asObservable();
  timeToFire$ = this.timeToFire.asObservable();

  constructor(private reader: DiscordReaderService, protected writer: DiscordWriterService, protected settings: SettingsService) {
    interval(1000).pipe(
      filter(_ => this.fireAt > 0 && this.fireAt < Date.now())
    ).subscribe( _ => {
      if (this.fireAt === 0) {
        return;
      }
      if (this.fireAt < Date.now()) {
        this.timeToFire.next(null);
        this.fireAt = 0;
        this.fireCommand();
      } else {
        this.timeToFire.next(this.fireAt - Date.now());
      }
  }
    );
  }

  start() {
    this.updateSettings();
    if (!this.enabled) {
      console.log('disabled');
      return;
    }

    if (!this.subscription) {
      this. subscription = this.filterMessages(this.reader.myBotMessages)
        .subscribe(
        message => {
          this.message.next(message);
          this.processMessage(message.content);
          this.fireAt = Date.now() + this.timer;
        }
      )
    }

    this.fireCommand();
  }

  protected abstract updateSettings(): void;
  protected abstract filterMessages(messages: Observable<DiscordMessage>): Observable<DiscordMessage>;
  protected abstract fireCommand(): void;
  protected abstract processMessage(text: string): void;
}
