import { Component } from '@angular/core';
import {MoveAreaService} from "../../service/move-area.service";

@Component({
  selector: 'app-moving',
  templateUrl: './moving.component.html',
  styleUrls: ['./moving.component.scss']
})
export class MovingComponent {

  constructor(private moveService: MoveAreaService) {
  }

  prepare(area: number) {
    this.moveService.prepareMoving(area);
  }

}
