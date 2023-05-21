import {BehaviorSubject} from "rxjs";

export class Pokemon {
  public currentHp$: BehaviorSubject<number>
  constructor(
    public name: string,
    public types: Types[],
    public moves: Moves[],
    public stats: Stats[],
    public sprites: Sprites,
    public baseHp: number,
    public currentHp: number
  ) {
    this.currentHp$ = new BehaviorSubject<number>(currentHp);
  }
}
export interface Types {
  slot: string;
  type: Type
}

export interface Type {
  name: string;
  url: string;
}

export interface Moves {
  move: Move;
}
export interface Move{
  name:string;
  maxPp: number;
  currentPp: number;
}

export interface Stats {
  base_stat: number;
  effort: number;
  stat: Stat;
}
export interface Stat{
  name: string;
  url: string;
}

export interface Sprites {
  front_default: string;

}
