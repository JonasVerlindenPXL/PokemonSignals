import {Component, Input} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {ColorDetermineService} from "../../services/color-determine.service";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;

  constructor(private colorDetermineService: ColorDetermineService) {
  }

  getTypeColor(typeName: string): string {
    return this.colorDetermineService.getTypeColor(typeName);
  }
}
