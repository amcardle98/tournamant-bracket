import { Component, inject } from '@angular/core';
import { Player } from 'src/app/models/player';
import { TournamentService } from 'src/app/lib/services/tournament.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PlayerListComponent } from 'src/app/lib/components/player-list/player-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { shuffle } from 'src/app/helper/tournament';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    PlayerListComponent,
    MatButtonModule,
    MatInputModule,
  ],
})
export class HomeComponent {
  players: Player[] = [];
  currentPlayerName: string = '';
  displayedColumns: string[] = ['name', 'actions'];
  numberOfPlayers: number = 0;
  bracketType: string = 'single';
  bracketSeed: string = 'random';
  canStartTournament: boolean = false;

  tournamentService = inject(TournamentService);

  addPlayer() {
    const trimmedName = this.currentPlayerName.trim();
    if (!trimmedName) {
      return;
    }

    if (this.players.some((player) => player.name === trimmedName)) {
      return;
    }

    this.players = [
      ...this.players,
      new Player(trimmedName, this.players.length),
    ];
    this.numberOfPlayers = this.players.length;
    this.currentPlayerName = '';
    this.canStartTournament = this.numberOfPlayers >= 2;

    console.log(this.players);
  }

  removePlayer(player: Player) {
    const newPlayers = [...this.players];
    newPlayers.splice(newPlayers.indexOf(player), 1);
    this.players = newPlayers;
  }

  removeAll() {
    this.players = [];
    this.numberOfPlayers = 0;
    this.canStartTournament = false;
  }

  generateTournament() {
    if (this.bracketSeed === 'random') {
      const randomizedPlayers = shuffle(this.players);

      this.tournamentService.generateBracket(randomizedPlayers);
    }

    console.log('Generating tournament');
  }
}
