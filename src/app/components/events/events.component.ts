import { Component } from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  cut = this.settings.getEventsSettings().cut;
  lure = this.settings.getEventsSettings().lure;
  summon = this.settings.getEventsSettings().summon;
  boss = this.settings.getEventsSettings().boss;
  catch = this.settings.getEventsSettings().catch;
  arena = this.settings.getEventsSettings().arena;
  wait = this.settings.getEventsSettings().wait;
  waitSimple = this.settings.getEventsSettings().waitSimple;

  constructor(private settings: SettingsService) {
  }

  update() {
    setTimeout(() => {
      this.settings.setSettings({events: {
          cut: this.cut,
          lure:this.lure,
          catch: this.catch,
          summon: this.summon,
          boss: this.boss,
          arena: this.arena,
          wait: this.wait,
          waitSimple: this.waitSimple,
        }});
    }, 1)
  }

}
