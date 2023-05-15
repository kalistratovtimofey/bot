import { Component } from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";
import {AdvService} from "../../service/adv.service";

@Component({
  selector: 'app-adv',
  templateUrl: './adv.component.html',
  styleUrls: ['./adv.component.scss']
})
export class AdvComponent {
  enabled = this.settings.getHuntSettings().enabled;
  enabledAdventure = this.settings.getAdvSettings().enabled;
  useAdventureHardmode = this.settings.getAdvSettings().useHardmode;
  useHealingAdventure = this.settings.getAdvSettings().useHeal;

  constructor(public settings: SettingsService, public advService: AdvService) {

  }

  updateAdv(): void {
    setTimeout(() => {
      this.settings.setSettings({adventure: {enabled:this.enabledAdventure, useHardmode: this.useAdventureHardmode, useHeal: this.useHealingAdventure}});
    }, 1);

  }

}
