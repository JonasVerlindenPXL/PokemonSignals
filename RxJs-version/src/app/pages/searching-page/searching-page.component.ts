import {Component} from '@angular/core';
import {TeamService} from "../../services/team.service";
import {Observable} from "rxjs";
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-searching-page',
  templateUrl: './searching-page.component.html',
  styleUrls: ['./searching-page.component.css']
})
export class SearchingPageComponent {
  pokemons$: Observable<Pokemon[]> = this.teamService.pokemons$

  constructor(private teamService: TeamService) {
  }
}
