import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  bracket$ = this.tournamentService.bracket$;
  numberOfRounds: number = 0;
  numberOfPlayers: number = 0;
  numberOfMatches: number = 0;
  numberOfByes: number = 0;

  columnRoundWidth?: string;

  constructor(private readonly tournamentService: TournamentService) {
    this.numberOfRounds = this.tournamentService.numberOfRounds;
    this.numberOfPlayers = this.tournamentService.numberOfPlayers;
    this.numberOfMatches = this.tournamentService.numberOfMatches;
    this.numberOfByes = this.tournamentService.numberOfByes;

  }

  ngOnInit() {
    this.columnRoundWidth = `${window.innerWidth / this.numberOfRounds}px`;
    console.log(this.columnRoundWidth);
  }

}
