import { Injectable } from '@angular/core';
import {Pokemon} from "../models/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class ColorDetermineService {
  typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  };
  constructor() { }
  getTypeColorBorder(typeName: string, pokemon: Pokemon): string {
    // Check if the Pokemon has multiple types
    if (pokemon.types.length > 1) {
      // Generate a gradient based on the types
      const gradientColors = pokemon.types
        .map(type => this.typeColors[type.type.name])
        .join(', ');
      return `linear-gradient(to right, ${gradientColors})`;
    } else {
      // Use a solid color for a single type
      return this.typeColors[typeName] || '';
    }
  }
  getTypeColor(typeName: string): string {

    // Check if the type name exists in the typeColors object
    if (this.typeColors.hasOwnProperty(typeName.toLowerCase())) {
      return this.typeColors[typeName.toLowerCase()];
    }

    // Default color if the type is not found
    return '#000000';
  }
}
