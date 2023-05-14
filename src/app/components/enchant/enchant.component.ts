import { Component } from '@angular/core';
import {EnchantService} from "../../service/enchant.service";
import {SettingsService} from "../../service/core/settings.service";
import {EnchantValues} from "../../service/core/model/settings";

@Component({
  selector: 'app-enchant',
  templateUrl: './enchant.component.html',
  styleUrls: ['./enchant.component.scss']
})
export class EnchantComponent {

  command = this.settings.getEnchantSettings().command;
  value = this.settings.getEnchantSettings().value;
  type: 'sword'|'armor' = 'sword';

  constructor(private enchantService: EnchantService, private settings: SettingsService) {
  }

  update() {
    setTimeout(() => {
      this.settings.setSettings({enchant: {command: this.command, value: this.value}});
    });
  }

  start() {
    this.enchantService.start(this.type);
  }

  protected readonly EnchantValues = EnchantValues;
}
