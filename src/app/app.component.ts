import {Component, OnInit} from '@angular/core';
import {DiscordApiService} from "./service/core/discord-api.service";
import {WebsocketService} from "./service/core/websocket.service";
import {HuntService} from "./service/hunt.service";
import {DiscordReaderService} from "./service/core/discord-reader.service";
import {TrainService} from "./service/train.service";
import {AdvService} from "./service/adv.service";
import {FarmService} from "./service/farm.service";
import {WorkService} from "./service/work.service";
import {PetsService} from "./service/pets.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'epic-rpg-bot';

  constructor(
    private trainService: TrainService,
    private huntService: HuntService,
    private advService: AdvService,
    private farmService: FarmService,
    private workService: WorkService,
    private petsServie: PetsService,
    private reader: DiscordReaderService) {
  }

  ngOnInit(): void {
    this.reader.myBotMessages.subscribe(message => console.log(message));
    // this.petsServie.start();
    // this.trainService.start();
    // this.huntService.start();
    // this.advService.start();
    // this.workService.start();
    // this.farmService.start();
  }


}
