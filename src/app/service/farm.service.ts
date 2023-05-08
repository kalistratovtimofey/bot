import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {DiscordMessage} from "./core/model/discord-message";
import {AbstractCommandService} from "./core/abstract-command.service";

@Injectable({
  providedIn: 'root'
})
export class FarmService extends AbstractCommandService{

  override timer = 10 * 60 * 1000 + 1000;
  private farmType = '';

  protected updateSettings(): void {
    this.enabled = this.settings.getFarmSettings().enabled
    this.farmType = this.settings.getFarmSettings().type;
  }
  protected filterMessages(messages: Observable<DiscordMessage>): Observable<DiscordMessage> {
    return messages.pipe(
      filter(message => message.content.includes('plants '))
    );
  }

  protected processMessage(text: string): void {

  }

  protected fireCommand() {
    this.writer.pushMessage('rpg farm ' + this.farmType);
  }
}
