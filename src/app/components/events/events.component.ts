import { Component } from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";
import {CustomEventsService} from "../../service/custom-events.service";
import {EventsSettings} from "../../service/core/model/settings";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  settings = this.settingsService.getEventsSettings();

  // cut = this.settings.getEventsSettings().cut;
  // lure = this.settings.getEventsSettings().lure;
  // summon = this.settings.getEventsSettings().summon;
  // boss = this.settings.getEventsSettings().boss;
  // catch = this.settings.getEventsSettings().catch;
  // arena = this.settings.getEventsSettings().arena;


  constructor(private settingsService: SettingsService) {
  }

  update() {
    setTimeout(() => {
      this.settingsService.setSettings({randomEvents: this.settings});
    }, 1)
  }

  keys() {
    return Object.keys(this.settings);
  }

}
