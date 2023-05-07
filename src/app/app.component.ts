import {Component, OnInit} from '@angular/core';
import {DiscordApiService} from "./service/core/discord-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'epic-rpg-bot';

  constructor(private api: DiscordApiService) {
  }

  ngOnInit(): void {
    // this.api.read(10).subscribe(
    //   messages => console.log(messages)
    // );
    // this.api.write('test');
  }


}
