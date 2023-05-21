import {Injectable} from '@angular/core';
import {Action} from "../models/team.model";
import {Pokemon} from "../models/pokemon.model";
import {scan, shareReplay} from "rxjs/operators";
import {Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // Add pokemon action
  private pokemonSubject$ = new Subject<Action<Pokemon>>();
  pokemonAction$ = this.pokemonSubject$.asObservable();

  pokemons$ = this.pokemonAction$
    .pipe(
      scan((items, itemAction) =>
        this.modifyTeam(items, itemAction), [] as Pokemon[]),
      shareReplay(1)
    );

  addToTeam(pokemon: Pokemon): void {
    this.pokemonSubject$.next({
      pokemon: pokemon,
      action: 'add'
    });
  }

  removeFromTeam(pokemon: Pokemon): void {
    this.pokemonSubject$.next({
      pokemon: pokemon,
      action: 'delete'
    });
  }

  fightPokemon(pokemon: Pokemon) {
    this.pokemonSubject$.next({
      pokemon: pokemon,
      action: 'fight'
    });
  }

  healPokemon(pokemon: Pokemon) {
    this.pokemonSubject$.next({
      pokemon: pokemon,
      action: 'heal'
    })
  }

  private modifyTeam(pokemons: Pokemon[], operation: Action<Pokemon>): Pokemon[] {
    if (operation.action === 'add') {
      if (pokemons.length < 6) {
        return [...pokemons, operation.pokemon];
      }
    } else if (operation.action === 'fight') {
      const pokemonToUpdate = pokemons.find(pokemon => pokemon === operation.pokemon);
      if (pokemonToUpdate) {
        if (pokemonToUpdate.currentHp$.getValue() > 0) {
          const randomDamage = Math.floor(Math.random() * 50) + 1;
          const randomMoveIndex = Math.floor(Math.random() * pokemonToUpdate.moves.length);
          const randomMove = pokemonToUpdate.moves[randomMoveIndex].move;
          const randomPpCost = Math.floor(Math.random() * randomMove.maxPp) + 1;

          const updatedHp = (pokemonToUpdate.currentHp$.getValue() - randomDamage) < 0 ? 0 : pokemonToUpdate.currentHp$.getValue() - randomDamage;
          const updatedPp = (randomMove.currentPp - randomPpCost) < 0 ? 0 : randomMove.currentPp - randomPpCost;

          pokemonToUpdate.currentHp$.next(updatedHp);
          randomMove.currentPp = updatedPp;
        }
      }
      return pokemons;
    } else if (operation.action === 'delete') {
      return pokemons.filter(pokemon => pokemon !== operation.pokemon);
    } else if (operation.action === 'heal') {
      const pokemonToUpdate = pokemons.find(pokemon => pokemon === operation.pokemon);
      if (pokemonToUpdate) {
        const pokemonToUpdate = pokemons.find(pokemon => pokemon === operation.pokemon);
        if (pokemonToUpdate) {
          pokemonToUpdate.currentHp$.next(pokemonToUpdate.baseHp);
          pokemonToUpdate.moves.forEach(move => {
            move.move.currentPp = move.move.maxPp;
          });
        }
        return pokemons;
      }
      return [...pokemons];
    }
    return [...pokemons];
  }
}
