import {Component, Input} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {ColorDetermineService} from "../../services/color-determine.service";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-pokemon-team-card',
  templateUrl: './pokemon-team-card.component.html',
  styleUrls: ['./pokemon-team-card.component.css']
})
export class PokemonTeamCardComponent {
  @Input() pokemon!: Pokemon;
  errorMessage: string = "";
  fighting$ = this.teamService.fightingStatus$;
  healing$ = this.teamService.healingStatus$;
  releasing$ = this.teamService.releasingStatus$;

  constructor(private teamService: TeamService, private colorDetermineService: ColorDetermineService) {
  }

  getHpBarWidth(pokemon: Pokemon): string {
    const percentage = (pokemon.currentHp$.getValue() / pokemon.baseHp) * 100;
    const barWidth = (percentage / 100) * 200;
    return `${barWidth}px`;
  }

  getCardStyles(): { [key: string]: string } {
    const typeNames = this.pokemon.types.map(type => type.type.name);
    if (typeNames.length > 1) {
      // Apply gradient background for multiple types
      return {'background-image': this.getTypeColorBorder('')};
    } else if (typeNames.length === 1) {
      // Apply solid color for a single type
      return {'background-color': this.getTypeColorBorder(typeNames[0])};
    } else {
      // Default background color if no types are available
      return {'background-color': '#ffffff'};
    }
  }

  getTypeColorBorder(typeName: string): string {
    return this.colorDetermineService.getTypeColorBorder(typeName, this.pokemon);
  }

  getTypeColor(typeName: string): string {
    return this.colorDetermineService.getTypeColor(typeName);
  }

  deleteClickedPokemon(pokemonToDelete: Pokemon) {
    this.teamService.releasingStatus$.next(true);
    this.teamService.removeFromTeam(pokemonToDelete);
  }

  healPokemon(pokemon: Pokemon) {
    this.teamService.healingStatus$.next(true);
    this.teamService.healPokemon(pokemon)
    this.errorMessage = ""
  }

  fightWithPokemon(pokemon: Pokemon) {
    if (pokemon.currentHp$.getValue() > 0){
      this.teamService.fightingStatus$.next(true);
      this.teamService.fightPokemon(pokemon);
    } else {
      this.errorMessage = "Your pokemon has fainted. Heal it to fight again!"
    }
  }
}
