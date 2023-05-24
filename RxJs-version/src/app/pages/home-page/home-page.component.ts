import {Component} from '@angular/core';
import {map} from "rxjs";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  pokemons$ = this.teamService.pokemons$;
  teamSet$ = this.teamService.pokemons$
    .pipe(
      map(pokemons => pokemons.length > 0));
  money$ = this.teamService.money$;

  constructor(private teamService: TeamService) {
  }
}
