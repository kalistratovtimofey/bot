import { Injectable } from '@angular/core';
import {interval, Observable, Subject, timer} from "rxjs";
import {filter, map, tap} from "rxjs/operators";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {SettingsService} from "./settings.service";
import {DiscordMessage} from "./model/discord-message";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private subject: WebSocketSubject<unknown>|null = null;
  private lastMessageId: number = 0;

  private messages: Subject<DiscordMessage> = new Subject<DiscordMessage>();
  public messages$ = this.messages.asObservable();

  constructor(private settings: SettingsService) {
    this.connect();
  }

  private connect() {
    const url = 'wss://gateway.discord.gg/?encoding=json&v=9'
    this.lastMessageId=0;
    this.subject = webSocket(url);
    this.subject.subscribe();
    this.subject.next({
      "op": 2,
      "d": {
        "token": this.settings.getToken(),
        "properties": {
          "$os": "linux",
          "$browser": "ubuntu",
          "$device": "ubuntu"
        },
      }
    });

    interval(30*1000).subscribe(
      () => this.subject?.next({
        op: 1,
        d: this.lastMessageId,
      })
    );

    this.subject.asObservable().pipe(
      tap(msg => this.updateMessageid(msg)),
      filter(msg => this.isCreateMessage(msg)),
      map((msg: any) => msg.d as DiscordMessage),
      filter(message => !!message.channel_id && message.channel_id === this.settings.getChannelId())
    ).subscribe(
      msg=> this.messages.next(msg)
    );

    this.subject?.subscribe({complete: () => this.connect()})
  }

  private isCreateMessage(msg: unknown): boolean {
    return typeof msg === 'object' && !!msg && 't' in msg && msg.t === 'MESSAGE_CREATE';
  }

  private updateMessageid(msg:unknown): void {
    if (typeof msg === 'object' && !!msg && 's' in msg && typeof msg.s === 'number') {
      this.lastMessageId = msg.s;
    }
  }
}
