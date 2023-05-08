import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {adventureMonsters} from "./model/AdventureMobList";
import {AbstractCommandService} from "./core/abstract-command.service";
import {DiscordMessage} from "./core/model/discord-message";

@Injectable({
  providedIn: 'root'
})
export class AdvService extends AbstractCommandService{

  private isHardmode = true;
  override timer = 60 * 60 * 1000 + 1000;
  private needHealing = false;

  protected updateSettings(): void {
    this.enabled = this.settings.getAdvSettings().enabled;
    this.isHardmode = this.settings.getAdvSettings().useHardmode;
    this.needHealing = this.settings.getAdvSettings().useHeal;
  }
  protected filterMessages(messages: Observable<DiscordMessage>): Observable<DiscordMessage> {
    return messages.pipe(
      filter(message => message.content.includes('found ') && this.isAdventureMessage(message.content))
    )
  }
  protected processMessage(text: string): void {
    if (this.needHealing) {
      this.writer.pushMessage('rpg heal');
    }
  }

  protected fireCommand() {
    this.writer.pushMessage('rpg adv ' + (this.isHardmode ? 'h' : ''));
  }

  private isAdventureMessage(text: string) {
    for (const monster in adventureMonsters) {
      if (text.includes('**' + monster.toUpperCase() + '**')) {
        return true;
      }
    }
    return false;
  }
}
