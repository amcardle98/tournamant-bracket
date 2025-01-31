import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './lib/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'play',
    loadComponent: () =>
      import('./pages/tournament/tournament.component').then(
        (m) => m.TournamentComponent
      ),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
];
