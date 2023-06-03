import { Injectable } from '@angular/core';
import {DiscordReaderService} from "./core/discord-reader.service";
import {DiscordWriterService} from "./core/discord-writer.service";
import {SettingsService} from "./core/settings.service";
import {filter, map} from "rxjs/operators";
import {DiscordMessage} from "./core/model/discord-message";
import {BehaviorSubject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnchantService {

  private command = this.settings.getEnchantSettings().command;
  private subscription: Subscription | null = null;
  private processing = new BehaviorSubject<boolean>(false);
  processing$ = this.processing.asObservable();

  constructor(
    private reader: DiscordReaderService,
    private writer: DiscordWriterService,
    private settings: SettingsService
    ) { }

  start(type: 'sword'|'armor') {
    this.command = this.settings.getEnchantSettings().command;
    const minValue = this.settings.getEnchantSettings().value;
    const command = 'rpg ' + this.command + ' ' +  type;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.reader.botRichMessages.pipe(
      filter(message => this.isMyEnchantMessage(message)),
      map(message => message.embeds?.[0]!.fields?.[0].value!)
    ).subscribe(value => {
      const regex = /\+([0-9]+)%/;
      const val = +value.match(regex)![1];
      if (val < minValue) {
        this.writer.pushMessage(command);
      } else {
        this.processing.next(false);
        this.subscription?.unsubscribe();
      }
    });

    this.writer.pushMessage(command);
    this.processing.next(true);
  }

  private isMyEnchantMessage(message: DiscordMessage): boolean {
    const embed = message.embeds?.[0];
    return embed?.author?.name === this.settings.getPlayerName() + ' — ' + this.command;
  }
}
