import {AfterViewInit, Component, Input} from '@angular/core';
import {Move, Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-move-tile',
  templateUrl: './move-tile.component.html',
  styleUrls: ['./move-tile.component.css']
})
export class MoveTileComponent{
  @Input() move!: Move;


}
