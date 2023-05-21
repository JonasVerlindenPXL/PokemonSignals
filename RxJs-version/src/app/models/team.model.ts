import {Pokemon} from "./pokemon.model";

export interface Team {
  pokemons: Pokemon[]
}

type ActionType = 'add' | 'fight' | 'delete' | 'heal';

export interface Action<T> {
  pokemon: T;
  action: ActionType;
}


