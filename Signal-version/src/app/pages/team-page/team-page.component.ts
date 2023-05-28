import {Component} from '@angular/core';
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent {
  pokemons = this.teamService.pokemons;
  teamSet = this.teamService.pokemons().length > 0;
  money = this.teamService.money;
  fighting = this.teamService.fightingStatus;
  healing = this.teamService.healingStatus;
  releasing = this.teamService.releasingStatus;

  constructor(private teamService: TeamService) {
  }
}
