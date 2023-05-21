import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { TeamService } from './team.service';
import { Pokemon } from '../models/pokemon.model';
import {map} from "rxjs/operators";

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
      sprites: { front_default: '' },
      baseHp: 60,
      currentHp: 60,
      currentHp$: new BehaviorSubject<number>(60),
    };
  });

  it('should add a Pokemon to the team with delay', fakeAsync(() => {
    let pokemons: Pokemon[] | undefined = undefined;

    service.pokemons$.subscribe((pokemonsInTeam) => {
      pokemons = pokemonsInTeam;
    });
    service.addToTeam(pokemon);

    expect(pokemons).toBeUndefined();
    tick(800);
    expect(pokemons).toContain(pokemon);
  }));

  it('should remove a Pokemon from the team', () => {
    service.addToTeam(pokemon);
    service.removeFromTeam(pokemon);

    service.pokemons$.subscribe((pokemons) => {
      expect(pokemons).not.toContain(pokemon);
    });
  });

  it('should update the current HP of a Pokemon when fighting', () => {
    service.addToTeam(pokemon);

    const initialHp = pokemon.currentHp$.getValue();
    service.fightPokemon(pokemon);

    service.pokemons$.subscribe((pokemons) => {
      const updatedPokemon = pokemons.find((p) => p === pokemon);
      expect(updatedPokemon?.currentHp$.getValue()).toBeLessThan(initialHp);
    });
  });

  it('should reset the current HP and moves PP of a Pokemon when healing', () => {
    const pokemon: Pokemon = {
      name: 'Venusaur',
      types: [],
      moves: [
        { move: { name: 'Razor Leaf', maxPp: 10, currentPp: 0 } },
      ],
      stats: [],
      sprites: { front_default: '' },
      baseHp: 80,
      currentHp: 80,
      currentHp$: new BehaviorSubject<number>(40),
    };

    service.addToTeam(pokemon);

    service.healPokemon(pokemon);

    service.pokemons$.subscribe((pokemons) => {
      const updatedPokemon = pokemons.find((p) => p === pokemon);
      expect(updatedPokemon?.currentHp$.getValue()).toEqual(pokemon.baseHp);
      expect(updatedPokemon?.moves[0].move.currentPp).toEqual(pokemon.moves[0].move.maxPp);
    });
  });
});
