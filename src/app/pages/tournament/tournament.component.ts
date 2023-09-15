import { Component, HostBinding, OnInit } from '@angular/core';
import { ImplicitBracketNode } from 'src/app/models/bracket-node';
import { TournamentService } from 'src/app/services/tournament.service';

function isImplicitBracketNode(
  bracketNode: any
): bracketNode is ImplicitBracketNode {
  return bracketNode instanceof ImplicitBracketNode;
}

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  @HostBinding('style.--column-round-width')
  columnRoundWidth?: string;

  isImplicitBracketNode = isImplicitBracketNode;

  bracket$ = this.tournamentService.bracket$;
  numberOfRounds: number = 0;
  numberOfPlayers: number = 0;
  numberOfMatches: number = 0;
  numberOfByes: number = 0;

  constructor(private readonly tournamentService: TournamentService) {
    this.numberOfRounds = this.tournamentService.numberOfRounds;
    this.numberOfPlayers = this.tournamentService.numberOfPlayers;
    this.numberOfMatches = this.tournamentService.numberOfMatches;
    this.numberOfByes = this.tournamentService.numberOfByes;
  }

  ngOnInit() {
    const useSplitView = this.numberOfPlayers > 8;

    // If we're using the split view, one round will be broken
    // apart to create the split, we're not displaying
    // that in the tree on each side.
    const numberOfRoundsDisplayed = useSplitView
      ? this.numberOfRounds
      : this.numberOfRounds;

    const winnerGridGap = 20;
    const winnerWidth = 200;

    const gridGaps = useSplitView
      ? (numberOfRoundsDisplayed - 1) * 2
      : numberOfRoundsDisplayed - 1;
    const gridGapWidths = gridGaps * 10 + winnerGridGap + winnerWidth;

    let remainingWidthForColumns = window.innerWidth - gridGapWidths;
    if (useSplitView) {
      remainingWidthForColumns /= 2;
    }

    // The column round width should be the width of the window
    // divided by the number of rounds.
    let columnRoundWidth = remainingWidthForColumns / numberOfRoundsDisplayed;

    this.columnRoundWidth = `${columnRoundWidth}px`;
    console.log(window.innerWidth);
    console.log(this.numberOfRounds);
    console.log(this.columnRoundWidth);
  }
}
