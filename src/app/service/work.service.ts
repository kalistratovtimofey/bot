import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {DiscordMessage} from "./core/model/discord-message";
import {AbstractCommandService} from "./core/abstract-command.service";

@Injectable({
  providedIn: 'root'
})
export class WorkService extends AbstractCommandService{

  override timer = 5 * 60 * 1000 + 1000;
  private workType = 'chainsaw';

  private isWorkCommandResult(text: string): boolean {
    return text.includes('is chopping') || text.includes('is fishing') || text.includes('is collecting') || text.includes('is mining')
    || text.indexOf('**' + this.settings.getPlayerName() + '** got') === 0;
  }

  protected updateSettings(): void {
    this.workType = this.settings.getWorkSettings().command;
    this.enabled = this.settings.getWorkSettings().enabled;
  }
  protected filterMessages(messages: Observable<DiscordMessage>): Observable<DiscordMessage> {
    return messages.pipe(
      filter(message =>this.isWorkCommandResult(message.content))
    );
  }
  protected processMessage(text: string): void {
  }

  protected fireCommand() {
    this.writer.pushMessage('rpg ' + this.workType);
  }
}
