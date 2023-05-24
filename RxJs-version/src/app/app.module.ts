import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TeamPageComponent} from './pages/team-page/team-page.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PokemonCardComponent} from './components/pokemon-card/pokemon-card.component';
import {MoveTileComponent} from './components/move-tile/move-tile.component';
import {PokemonSearchComponent} from './components/pokemon-search/pokemon-search.component';
import {WelcomePageComponent} from './pages/welcome-page/welcome-page.component';
import {AppRoutingModule} from './app-routing.module';
import {SearchingPageComponent} from './pages/searching-page/searching-page.component';
import {PokemonTeamCardComponent} from './components/pokemon-team-card/pokemon-team-card.component';
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    AppComponent,
    TeamPageComponent,
    PokemonCardComponent,
    MoveTileComponent,
    PokemonSearchComponent,
    WelcomePageComponent,
    SearchingPageComponent,
    PokemonTeamCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
