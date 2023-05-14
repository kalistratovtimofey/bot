import { Injectable } from '@angular/core';
import {WebsocketService} from "./core/websocket.service";
import {filter, map} from "rxjs/operators";
import {SettingsService} from "./core/settings.service";
import {DiscordMessage} from "./core/model/discord-message";
import {TrainService} from "./train.service";
import {HuntService} from "./hunt.service";
import {AdvService} from "./adv.service";
import {FarmService} from "./farm.service";
import {WorkService} from "./work.service";
import {PetsService} from "./pets.service";
import {AbstractCommandService} from "./core/abstract-command.service";
import * as moment from 'moment';
import {DiscordWriterService} from "./core/discord-writer.service";
import {DiscordReaderService} from "./core/discord-reader.service";

@Injectable({
  providedIn: 'root'
})
export class StartService {

  private services: Record<string, AbstractCommandService> = {
    hunt: this.huntService,
    adventure: this.advService,
    training: this.trainService,
    chop: this.workService,
    farm: this.farmService
  };

  constructor(
    private reader: DiscordReaderService,
    private writer: DiscordWriterService,
    private settings: SettingsService,
    private trainService: TrainService,
    private huntService: HuntService,
    private advService: AdvService,
    private farmService: FarmService,
    private workService: WorkService,
    private petsService: PetsService,
  ) { }

  start() {
    this.reader.botRichMessages
    .pipe(
      filter(message => this.isCooldownMessage(message)),
      map(message => message.embeds?.[0]!)
    ).subscribe(embed => {
      for (const field of embed.fields!) {
        for (const line of field.value.split("\n")) {
          for(const serviceName in this.services) {
            if (line.includes(serviceName)) {
              const service = this.services[serviceName];
              if (line.includes('white_check_mark')) {
                service.start();
              } else {
                //example of string:
                // ~-~ **`lootbox`** (**0h 46m 50s**)
                const regex = /\(\*\*(.*)\*\*\)/;
                const timeString = line.match(regex)![1];
                const time = moment.duration('PT'+timeString.toUpperCase().replaceAll(' ', '')).asMilliseconds();
                service.startIn(time);
              }
            }
          }
        }
      }
    });

    this.writer.pushMessage('rpg cd');
    this.writer.pushMessage('rpg guild raid');
    this.petsService.start();
  }

  private isCooldownMessage(message: DiscordMessage): boolean {
    const embed = message.embeds?.[0];
    return embed?.author?.name === this.settings.getPlayerName() + ' — cooldowns';
  }
}
