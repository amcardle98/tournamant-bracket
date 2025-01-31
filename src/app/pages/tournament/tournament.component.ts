import { Component, HostBinding, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from 'src/app/lib/services/tournament.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
  standalone: true,
})
export class TournamentComponent {
  private tournamentService = inject(TournamentService);
  private activatedRoute = inject(ActivatedRoute);

  bracketTree = this.tournamentService.bracketTree;

  constructor() {}

  ngOnInit() {
    console.log('Bracket Tree:', this.bracketTree);
  }
}
