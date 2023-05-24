import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs';
import {TeamService} from './team.service';
import {Pokemon} from '../models/pokemon.model';
import {effect, signal} from "@angular/core";

describe('TeamService', () => {
  let service: TeamService;
  let pokemon: Pokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamService);
    pokemon = {
      name: 'Pikachu',
      types: [],
      moves: [],
      stats: [],
      sprites: {front_default: ''},
      baseHp: 60,
      currentHp: 60,
      currentHpSignal: signal(60),
    };
  });

  // it('should add a Pokemon to the team with delay used fakeAsync', fakeAsync(() => {
  //
  //   service.addToTeam(pokemon);
  //
  //   expect(service.pokemons).toBeUndefined();
  //   tick(800);
  //   expect(service.pokemons).toContain(pokemon);
  // }));
  //
  // it('should add a Pokemon to the team with delay (used done)', (done) => {
  //   service.pokemons.mutate((pokemons) => {
  //     expect(pokemons).toContain(pokemon);
  //     done();
  //   });
  //   service.addToTeam(pokemon);
  // });

  it('should remove a Pokemon from the team', () => {
    service.addToTeam(pokemon);
    service.removeFromTeam(pokemon);

    expect(service.pokemons()).toContain(pokemon);
    service.pokemons.mutate((pokemons) => {
      expect(pokemons).not.toContain(pokemon);
    });
  });

  // it('should update the current HP of a Pokemon when fighting', () => {
  //   service.addToTeam(pokemon);
  //
  //   const initialHp = pokemon.currentHpSignal;
  //   service.fightPokemon(pokemon);
  //
  //     const updatedPokemon = service.pokemons().find((p) => p === pokemon);
  //     expect(updatedPokemon?.currentHpSignal()).toBeLessThan(initialHp());
  // });
  //
  // it('should reset the current HP and moves PP of a Pokemon when healing', () => {
  //   const pokemon: Pokemon = {
  //     name: 'Venusaur',
  //     types: [],
  //     moves: [
  //       {move: {name: 'Razor Leaf', maxPp: 10, currentPp: 0}},
  //     ],
  //     stats: [],
  //     sprites: {front_default: ''},
  //     baseHp: 80,
  //     currentHp: 80,
  //     currentHpSignal: signal(40),
  //   };
  //
  //   service.addToTeam(pokemon);
  //
  //   service.healPokemon(pokemon);
  //
  //   service.pokemons.mutate((pokemons) => {
  //     const updatedPokemon = pokemons.find((p) => p === pokemon);
  //     expect(updatedPokemon?.currentHpSignal()).toEqual(pokemon.baseHp);
  //     expect(updatedPokemon?.moves[0].move.currentPp).toEqual(pokemon.moves[0].move.maxPp);
  //   });
  // });
});
