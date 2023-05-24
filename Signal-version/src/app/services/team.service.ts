import {Injectable, signal} from '@angular/core';
import {Action} from "../models/team.model";
import {Pokemon} from "../models/pokemon.model";
import {debounceTime, scan, shareReplay} from "rxjs/operators";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  money = signal(0);

  pokemons = signal<Pokemon[]>([]);


  addToTeam(pokemonToAdd: Pokemon): void {
    this.pokemons.mutate(pokemons => pokemons.push(pokemonToAdd));
  }

  removeFromTeam(pokemonToRemove: Pokemon): void {
    this.pokemons.update(pokemons => pokemons.filter(pokemon =>
      pokemon.name !== pokemonToRemove.name));
  }

  fightPokemon(pokemonToUpdate: Pokemon): void {
    this.pokemons.update(pokemons =>
      pokemons.map(pokemon =>
        pokemon.name === pokemonToUpdate.name ? this.calculateDamageAndPpUsage(pokemon) : pokemon))
  }

  private calculateDamageAndPpUsage(pokemonToUpdate: Pokemon) {
    if (pokemonToUpdate.currentHpSignal() > 0) {
      const randomDamage = Math.floor(Math.random() * 50) + 1;
      const randomMoveIndex = Math.floor(Math.random() * pokemonToUpdate.moves.length);
      const randomMove = pokemonToUpdate.moves[randomMoveIndex].move;
      const randomPpCost = Math.floor(Math.random() * randomMove.maxPp) + 1;

      const updatedHp = (pokemonToUpdate.currentHpSignal() - randomDamage) < 0 ? 0 : pokemonToUpdate.currentHpSignal() - randomDamage;
      const updatedPp = (randomMove.currentPp - randomPpCost) < 0 ? 0 : randomMove.currentPp - randomPpCost;

      pokemonToUpdate.currentHpSignal.set(updatedHp);
      randomMove.currentPp = updatedPp;
      this.money.set(this.money() + 10);
    }
    return pokemonToUpdate
  }

  healPokemon(pokemonToHeal: Pokemon) {
    this.pokemons.update(pokemons =>
      pokemons.map(pokemon => pokemon.name === pokemonToHeal.name ? this.healGivenPokemon(pokemon) : pokemon));
  }

  healGivenPokemon(pokemonToHeal: Pokemon) {
    pokemonToHeal.currentHpSignal.set(pokemonToHeal.baseHp);
    pokemonToHeal.moves.forEach(move => {
      move.move.currentPp = move.move.maxPp;
    });
    this.money.set(this.money() - 10);
    return pokemonToHeal;

  }
}
