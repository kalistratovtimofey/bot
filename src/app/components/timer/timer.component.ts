import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AbstractCommandService} from "../../service/core/abstract-command.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnChanges{
  @Input() timeToFire: number|null = null;
  @Input() commandService: AbstractCommandService|null = null;

  startInMin = 0;
  startInSec = 0;

  format = (percent: number): string => {
    if (!this.timeToFire) {
      return '';
    }
    let seconds = this.timeToFire / 1000;
    const minutes = Math.floor(seconds/60);
    seconds = Math.round(seconds - minutes*60);
    let result = '';
    if (minutes < 10) {
      result = '0';
    }
    result = result + minutes + ':';
    if (seconds < 10) {
      result = result + '0';
    }
    result = result + seconds;
    return result;
  };

  percent = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.percent = this.timeToFire ? (this.timeToFire / this.totalDelay * 100) : 0;
  }

  schedule() {
    this.commandService?.startIn(((+this.startInMin)*60 + (+this.startInSec)) * 1000);
  }

  get totalDelay() {
    return this.commandService?.timer || 0;
  }

}
