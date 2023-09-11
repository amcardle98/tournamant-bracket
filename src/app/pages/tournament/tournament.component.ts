import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BracketNode } from 'src/app/models/bracketNode';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent {
  bracket$: Observable<BracketNode>;

  constructor(private tournamentService: TournamentService) {
    this.bracket$ = this.tournamentService.bracket$;
  }

  ngOnInit() {
    this.bracket$.subscribe((bracket) => {
      console.log(bracket);
    } );
  }

}
