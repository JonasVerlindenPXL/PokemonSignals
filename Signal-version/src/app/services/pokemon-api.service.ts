import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Moves, Pokemon} from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/';

  searchPokemon(name: string): Observable<Pokemon> {
    return this.getPokemonByName(name).pipe(
      map((response: any) => {
        const pokemon = new Pokemon(
          response.name,
          response.types,
          response.moves,
          response.stats,
          response.sprites,
          response.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat || 0, // Set baseHp value
          response.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat || 0  // Set currentHp value
        );

        pokemon.moves = this.getRandomMoves(pokemon.moves, 4);
        pokemon.moves = pokemon.moves.map((move) => {
          move.move.maxPp = Math.floor(Math.random() * 20) + 1;
          move.move.currentPp = move.move.maxPp;
          return move;
        });

        return pokemon;
      }),
      catchError((error: any) => {
        const errorMessage = `Pokemon with name "${name}" not found.`;
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  private getPokemonByName(name: string): Observable<any> {
    const url = `${this.apiUrl}pokemon/${name}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        const errorMessage = `Error getting Pokemon with name "${name}".`;
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  private getRandomMoves(moves: Moves[], count: number): Moves[] {
    const randomIndices = Array.from({ length: moves.length }, (_, index) => index)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    return randomIndices.map((index) => moves[index]);
  }
  constructor(private http: HttpClient) {
  }

}
