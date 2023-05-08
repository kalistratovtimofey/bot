import { Component } from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";
import {TrainService} from "../../service/train.service";

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent {

  enabled = this.settings.getTrainSettings().enabled;
  enabledPets = this.settings.getTrainSettings().enabledPetCapture
  constructor(private settings: SettingsService, public trainService: TrainService) {
  }

  update() {
    this.settings.setSettings({train: {enabled: this.enabled, enabledPetCapture: this.enabledPets}})
  }

}
