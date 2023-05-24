import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {ColorDetermineService} from "../../services/color-determine.service";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-pokemon-team-card',
  templateUrl: './pokemon-team-card.component.html',
  styleUrls: ['./pokemon-team-card.component.css']
})
export class PokemonTeamCardComponent implements OnInit{
  @Input() pokemon!: Pokemon;
  errorMessage: string = "";
  combatActionsAllowed: boolean = false;


  constructor(private teamService: TeamService, private colorDetermineService: ColorDetermineService) {
  }

  getHpBarWidth(pokemon: Pokemon): string {
    const percentage = (pokemon.currentHpSignal() / pokemon.baseHp) * 100;
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
    this.teamService.removeFromTeam(pokemonToDelete);
  }

  healPokemon(pokemon: Pokemon) {
    this.teamService.healPokemon(pokemon)
    this.errorMessage = ""
  }

  fightWithPokemon(pokemon: Pokemon) {
    if (pokemon.currentHpSignal() > 0) {
      this.teamService.fightPokemon(pokemon);
    } else {
      this.errorMessage = "Your pokemon has fainted. Heal it to fight again!"
    }
  }

  ngOnInit(): void {
    this.combatActionsAllowed = window.location.pathname == "/home"
    console.log(this.combatActionsAllowed)
    console.log(window.location.pathname)
  }
}
