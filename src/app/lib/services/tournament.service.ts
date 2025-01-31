import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, single } from 'rxjs';
import { Player } from '../models/player';
import * as logic from '../../helper/tournament';
import { ImplicitBracketNode } from '../../models/bracket-node';
import { Router } from '@angular/router';
import { createBracketContext } from '../../helper/generate-bracket-tree';
import { isNonEmptyArray } from '../../types/non-empty-array';
import { BracketContext } from '../../models/bracket-context';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  numberOfMatches!: number;
  numberOfRounds!: number;
  numberOfByes!: number;
  numberOfPlayers!: number;

  private bracketSubject = new BehaviorSubject<ImplicitBracketNode | null>(
    null
  );

  bracket$ = this.bracketSubject.asObservable();

  constructor(private router: Router) {}

  generateBracket(players: Player[]): void {
    if (!isNonEmptyArray(players)) {
      throw new Error(`Players must be a non-empty array!`);
    }

    const bracketContext = createBracketContext(players);

    console.log(bracketContext);
  }
}

function buildBracketTree(players: Player[]): void {}
