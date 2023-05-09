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
    private websocket: WebsocketService,
    private writer: DiscordWriterService,
    private settings: SettingsService,
    private trainService: TrainService,
    private huntService: HuntService,
    private advService: AdvService,
    private farmService: FarmService,
    private workService: WorkService,
    private petsServie: PetsService,
  ) { }

  start() {
    this.websocket.messages$
    .pipe(
      filter(message => message.author.username === this.settings.getBotName()),
      filter(message => this.isCooldownMessage(message)),
      map(message => message.embeds?.[0]!)
    ).subscribe(embed => {
      console.log('got cd', embed);
      for (const field of embed.fields!) {
        for (const line of field.value.split("\n")) {
          for(const serviceName in this.services) {
            if (line.includes(serviceName)) {
              const service = this.services[serviceName];
              if (line.includes('white_check_mark')) {
                console.log(line);
                service.start();
              } else {
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
    this.petsServie.start();
  }

  private isCooldownMessage(message: DiscordMessage): boolean {
    console.log('checking message', message);
    const embed = message.embeds?.[0];
    return embed?.author?.name === this.settings.getPlayerName() + ' — cooldowns';
  }
}
