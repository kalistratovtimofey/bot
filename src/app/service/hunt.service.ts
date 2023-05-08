import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {adventureMonsters} from "./model/AdventureMobList";
import {DiscordMessage} from "./core/model/discord-message";
import {AbstractCommandService} from "./core/abstract-command.service";

@Injectable({
  providedIn: 'root'
})
export class HuntService extends AbstractCommandService{

  private isHardmode = true;
  override timer = 61 * 1000;
  private needHealing = false;

  private isNotAdventureMessage(text: string) {
    for (const monster in adventureMonsters) {
      if (text.includes('**' + monster.toUpperCase() + '**')) {
        return false;
      }
    }
    return true;
  }

  protected updateSettings(): void {
    this.isHardmode = this.settings.getHuntSettings().useHardmode;
    this.needHealing = this.settings.getHuntSettings().useHeal;
    this.enabled = this.settings.getHuntSettings().enabled;
  }

  protected filterMessages(messages: Observable<DiscordMessage>): Observable<DiscordMessage> {
    return messages.pipe(
      filter(message => message.content.includes('found ') && this.isNotAdventureMessage(message.content))
    )
  }

  protected processMessage(text: string): void {
    if (this.needHealing) {
      this.writer.pushMessage('rpg heal');
    }
  }

  protected fireCommand() {
    this.writer.pushMessage('rpg hunt ' + (this.isHardmode ? 'h' : ''));
  }
}
