import {Component} from '@angular/core';
import {map, take} from "rxjs";
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

  constructor(private teamService: TeamService) {
  }

  simulateFight() {
    this.pokemons$.pipe(
      take(1),
      map(pokemons => {
        pokemons.forEach(pokemon => {
          this.teamService.fightPokemon(pokemon)
        })
      })).subscribe()
  }

  healTeam() {
    this.pokemons$.pipe(
      take(1),
      map(pokemons => {
        pokemons.forEach(pokemon => {
          this.teamService.healPokemon(pokemon)
        })
      })).subscribe()
  }
}
