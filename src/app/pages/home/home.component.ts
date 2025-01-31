import { Component, inject } from '@angular/core';
import { TournamentService } from 'src/app/lib/services/tournament.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlayerListComponent } from 'src/app/lib/components/player-list/player-list.component';
import { Player } from 'src/app/lib/interfaces';
import { shuffle } from 'src/app/lib/utils/tournament/tournament.utils';

//ui-imports
import { uiImports } from './home.imports';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, uiImports, PlayerListComponent],
})
export class HomeComponent {
  currentPlayerName: string = '';
  displayedColumns: string[] = ['name', 'actions'];
  numberOfPlayers: number = 0;
  canStartTournament: boolean = false;

  tournamentService = inject(TournamentService);

  addPlayer() {
    const player = { name: this.currentPlayerName };
    this.tournamentService.addPlayer(player);

    this.currentPlayerName = '';
    this.numberOfPlayers++;
  }

  removePlayer(player: Player) {
    this.tournamentService.removePlayer(player);
    this.numberOfPlayers--;
  }

  removeAll() {
    this.tournamentService.removeAllPlayers();
    this.numberOfPlayers = 0;
  }

  generateTournament() {
    this.tournamentService.generateTournament();

    console.log('Generating tournament');
  }
}
