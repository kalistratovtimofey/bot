import { Component } from '@angular/core';
import {AntibotStopperService} from "../../service/core/antibot-stopper.service";

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent {

  constructor(public antibot: AntibotStopperService) {
  }

}
