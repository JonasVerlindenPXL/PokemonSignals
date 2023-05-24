import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TeamPageComponent} from "./pages/team-page/team-page.component";
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";
import {SearchingPageComponent} from "./pages/searching-page/searching-page.component";

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'home', component: TeamPageComponent},
  {path: 'search', component: SearchingPageComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
