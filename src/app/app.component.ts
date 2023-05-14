import {Component, OnInit} from '@angular/core';
import {DiscordApiService} from "./service/core/discord-api.service";
import {DiscordReaderService} from "./service/core/discord-reader.service";
import {StartService} from "./service/start.service";
import {CustomEventsService} from "./service/custom-events.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'epic-rpg-bot';

  constructor(
    private startService: StartService,
    private reader: DiscordReaderService,
    private customEventService: CustomEventsService,
    api: DiscordApiService
  ) {
    // api.read(30).subscribe(messages => console.log(messages));
  }

  ngOnInit(): void {
    this.reader.myBotMessages.subscribe(message => console.log(message));
  }

  start() {
    this.startService.start();
    this.customEventService.start();
  }


}
