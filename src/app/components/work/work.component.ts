import { Component } from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";
import {WorkService} from "../../service/work.service";

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {

  enabled = this.settings.getWorkSettings().enabled;
  selectedCommand= this.settings.getWorkSettings().command;

constructor(private settings: SettingsService, public workService: WorkService) {
}

update() {
  this.settings.setSettings({work: {enabled: this.enabled, command: this.selectedCommand}});
}

}
