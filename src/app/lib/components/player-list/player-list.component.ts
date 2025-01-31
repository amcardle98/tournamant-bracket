import { DataSource } from '@angular/cdk/collections';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Player } from '../../interfaces';
import { TournamentService } from '../../services/tournament.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-list',
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent {
  tournamentService = inject(TournamentService);
  displayedColumns: string[] = ['name'];
  players$ = this.tournamentService.players$;

  constructor() {}
}
