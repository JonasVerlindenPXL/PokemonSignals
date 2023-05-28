import {Injectable} from '@angular/core';
import {Action} from "../models/team.model";
import {Pokemon} from "../models/pokemon.model";
import {debounceTime, scan, shareReplay} from "rxjs/operators";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private pokemonSubject$ = new Subject<Action<Pokemon>>();
  pokemonAction$ = this.pokemonSubject$.asObservable();
  money$ = new BehaviorSubject<number>(0);
  catchingStatus$ = new BehaviorSubject<boolean>(false);
  fightingStatus$ = new BehaviorSubject<boolean>(false);
  healingStatus$ = new BehaviorSubject<boolean>(false);
  releasingStatus$ = new BehaviorSubject<boolean>(false);

  pokemons$ = this.pokemonAction$
    .pipe(
      debounceTime(800),
      scan((items, pokemonAction) =>
        this.modifyTeam(items, pokemonAction), [] as Pokemon[]),
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
        this.catchingStatus$.next(false);
        return [...pokemons, operation.pokemon];
      }
    } else if (operation.action === 'fight') {
      const pokemonToUpdate = pokemons.find(pokemon => pokemon === operation.pokemon);
      if (pokemonToUpdate) {
        this.fightingStatus$.next(false);
        if (pokemonToUpdate.currentHp$.getValue() > 0) {
          const randomDamage = Math.floor(Math.random() * 50) + 1;
          const randomMoveIndex = Math.floor(Math.random() * pokemonToUpdate.moves.length);
          const randomMove = pokemonToUpdate.moves[randomMoveIndex].move;
          const randomPpCost = Math.floor(Math.random() * randomMove.maxPp) + 1;

          const updatedHp = (pokemonToUpdate.currentHp$.getValue() - randomDamage) < 0 ? 0 : pokemonToUpdate.currentHp$.getValue() - randomDamage;
          const updatedPp = (randomMove.currentPp - randomPpCost) < 0 ? 0 : randomMove.currentPp - randomPpCost;

          pokemonToUpdate.currentHp$.next(updatedHp);
          randomMove.currentPp = updatedPp;
          this.money$.next(this.money$.getValue() + 10);
        }
      }
      return pokemons;
    } else if (operation.action === 'delete') {
      this.releasingStatus$.next(false);
      return pokemons.filter(pokemon => pokemon !== operation.pokemon);
    } else if (operation.action === 'heal') {
      this.healingStatus$.next(false);
      const pokemonToUpdate = pokemons.find(pokemon => pokemon === operation.pokemon);
      if (pokemonToUpdate) {
        pokemonToUpdate.currentHp$.next(pokemonToUpdate.baseHp);
        pokemonToUpdate.moves.forEach(move => {
          move.move.currentPp = move.move.maxPp;
        });
        this.money$.next(this.money$.getValue() - 10);
      }
      return pokemons;
    }
    return [...pokemons];
  }

}
