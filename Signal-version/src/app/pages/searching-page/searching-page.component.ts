import {Component} from '@angular/core';
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-searching-page',
  templateUrl: './searching-page.component.html',
  styleUrls: ['./searching-page.component.css']
})
export class SearchingPageComponent {
  pokemons$ = this.teamService.pokemons$

  constructor(private teamService: TeamService) {
  }
}
