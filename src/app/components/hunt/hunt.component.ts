import { Component } from '@angular/core';
import {SettingsService} from "../../service/core/settings.service";
import {HuntService} from "../../service/hunt.service";
import {AdvService} from "../../service/adv.service";

@Component({
  selector: 'app-hunt',
  templateUrl: './hunt.component.html',
  styleUrls: ['./hunt.component.scss']
})
export class HuntComponent {
  enabled = this.settings.getHuntSettings().enabled;
  useHardmode = this.settings.getHuntSettings().useHardmode;
  useHealing = this.settings.getHuntSettings().useHeal;
  // enabledAdventure = this.settings.getAdvSettings().enabled;
  // useAdventureHardmode = this.settings.getAdvSettings().useHardmode;
  // useHealingAdventure = this.settings.getAdvSettings().useHeal;

  constructor(public settings: SettingsService, public huntService: HuntService) {

  }

  updateHunt() {
    setTimeout(() => {
      this.settings.setSettings({hunt: {enabled:this.enabled, useHardmode: this.useHardmode, useHeal: this.useHealing}});
    }, 1);
  }
  //
  // updateAdv(): void {
  //   setTimeout(() => {
  //     this.settings.setSettings({adventure: {enabled:this.enabledAdventure, useHardmode: this.useAdventureHardmode, useHeal: this.useHealingAdventure}});
  //   }, 1);

  // }

}
