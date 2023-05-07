import { Component } from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {

  enabled = this.settings.getWorkSettings().enabled;
  selectedCommand= this.settings.getWorkSettings().command;

constructor(private settings: SettingsService) {
}

update() {
  this.settings.setSettings({farm: {enabled: this.enabled, type: this.selectedCommand}});
}

}
