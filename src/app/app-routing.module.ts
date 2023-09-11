import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TournamentComponent } from './pages/tournament/tournament.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'play', component: TournamentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
