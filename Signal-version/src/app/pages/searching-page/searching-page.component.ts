import {Component, Signal, WritableSignal} from '@angular/core';
import {TeamService} from "../../services/team.service";
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-searching-page',
  templateUrl: './searching-page.component.html',
  styleUrls: ['./searching-page.component.css']
})
export class SearchingPageComponent {
  pokemons: WritableSignal<Pokemon[]> = this.teamService.pokemons

  constructor(private teamService: TeamService) {
  }
}
