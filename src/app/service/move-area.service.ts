import { Injectable } from '@angular/core';
import {DiscordWriterService} from "./core/discord-writer.service";

export const areas = [3, 5, 7, 8, 9];

@Injectable({
  providedIn: 'root'
})
export class MoveAreaService {

  actions: Record<number|string, string[]> = {
    3: [
      'rpg dismantle ultra log all',
      'rpg dismantle hyper log all',
      'rpg dismantle mega log all',
      'rpg dismantle super log all',
      'rpg dismantle epic log all',
      'rpg dismantle banana all',
      'rpg trade c all',
      'rpg trade b all',
    ],
    5: [
      'rpg dismantle ultra log all',
      'rpg dismantle hyper log all',
      'rpg dismantle mega log all',
      'rpg dismantle super log all',
      'rpg dismantle epic log all',
      'rpg dismantle epic fish all',
      'rpg dismantle golden fish all',
      'rpg trade a all',
      'rpg trade e all',
      'rpg trade d all',
    ],
    7: [
      'rpg dismantle banana all',
      'rpg trade c all',
    ],
    8: [
      'rpg dismantle hyper log all',
      'rpg dismantle mega log all',
      'rpg dismantle super log all',
      'rpg dismantle epic log all',
      'rpg dismantle epic fish all',
      'rpg dismantle golden fish all',
      'rpg trade a all',
      'rpg trade e all',
      'rpg trade d all',
    ],
    9: [
      'rpg dismantle super log all',
      'rpg dismantle epic log all',
      'rpg dismantle banana all',
      'rpg trade e all',
      'rpg trade c all',
      'rpg trade b all',
    ],
    tt: [
      'rpg sell wooden log all',
      'rpg sell apple all',
      'rpg sell wolf skin all',
      'rpg sell zombie eye all',
      'rpg sell unicorn horn all',
      'rpg sell mermaid hair all',
      'rpg sell chip all',
      'rpg sell dragon scale all',
      'rpg sell carrot all',
      'rpg sell potato all',
      'rpg sell bread all',
      'rpg sell seed all',
      'rpg sell bread seed all',
      'rpg sell carrot seed all',
      'rpg sell potato seed all',
      'rpg sell healing potion all',
      'rpg sell sword',
      'y',
      'rpg sell armor',
      'y'
    ]
  }

  constructor(private writer: DiscordWriterService) { }

  prepareMoving(area: number|string) {
    const commands = this.actions[area];
    if (!commands) {
      return;
    }
    for (const command of commands) {
      this.writer.pushMessage(command);
    }
  }
}
