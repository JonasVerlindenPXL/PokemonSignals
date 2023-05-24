import {Injectable, signal} from '@angular/core';
import {Pokemon} from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  money = signal(0);
  pokemons = signal<Pokemon[]>([]);
  catchingStatus = signal(false);
  fightingStatus = signal(false)
  healingStatus = signal(false);
  releasingStatus = signal(false);


  addToTeam(pokemonToAdd: Pokemon): void {
    this.catchingStatus.set(true);
    setTimeout(() => {
      this.pokemons.mutate(pokemons => pokemons.push(pokemonToAdd));
      this.catchingStatus.set(false);
    }, 800);
  }


  removeFromTeam(pokemonToRemove: Pokemon): void {
    this.releasingStatus.set(true);
    setTimeout(() => {
      this.pokemons.update(pokemons => pokemons.filter(pokemon =>
        pokemon.name !== pokemonToRemove.name));
      this.releasingStatus.set(false);
    }, 800);
  }

  fightPokemon(pokemonToUpdate: Pokemon): void {
    this.fightingStatus.set(true);
    setTimeout(() => {
      this.pokemons.update(pokemons =>
        pokemons.map(pokemon =>
          pokemon.name === pokemonToUpdate.name ? this.calculateDamageAndPpUsage(pokemon) : pokemon));
      this.fightingStatus.set(false);
    }, 800);
  }

  healPokemon(pokemonToHeal: Pokemon) {
    this.healingStatus.set(true);
    setTimeout(() => {
      this.pokemons.update(pokemons =>
        pokemons.map(pokemon => pokemon.name === pokemonToHeal.name ? this.healGivenPokemon(pokemon) : pokemon));
      this.healingStatus.set(false);
    }, 800);
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

  private healGivenPokemon(pokemonToHeal: Pokemon) {
    pokemonToHeal.currentHpSignal.set(pokemonToHeal.baseHp);
    pokemonToHeal.moves.forEach(move => {
      move.move.currentPp = move.move.maxPp;
    });
    this.money.set(this.money() - 10);
    return pokemonToHeal;

  }
}
