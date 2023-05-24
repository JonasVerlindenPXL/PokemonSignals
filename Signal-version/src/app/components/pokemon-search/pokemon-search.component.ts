import {Component} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {Pokemon} from "../../models/pokemon.model";
import {PokemonApiService} from "../../services/pokemon-api.service";
import {TeamService} from "../../services/team.service";
import {Team} from "../../models/team.model";

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent {
  pokemon$: Observable<Pokemon> | undefined;
  errorMessage: string = '';
  team!: Team;


  constructor(private pokemonApiService: PokemonApiService, private teamService: TeamService) {
  }

  searchPokemon(name: string): void {
    this.errorMessage = ''
    this.pokemon$ = this.pokemonApiService.searchPokemon(name).pipe(
      catchError((error: any) => {
        this.errorMessage = `Pokemon with name "${name}" not found.`;
        return throwError(error);
      })
    );
  }

  addPokemon(pokemon: Pokemon) {
    this.teamService.addToTeam(pokemon);
    this.pokemon$ = undefined
  }

}
