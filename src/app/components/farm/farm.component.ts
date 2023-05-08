import { Component } from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";
import {FarmService} from "../../service/farm.service";

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent {

  enabled = this.settings.getFarmSettings().enabled;
  suffix = this.settings.getFarmSettings().type;

  constructor(private settings: SettingsService, public farmService: FarmService) {
  }

  update() {
    setTimeout(() => {
      this.settings.setSettings({farm: {enabled: this.enabled, type: this.suffix}});
    });
  }

}
