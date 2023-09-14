import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, single } from 'rxjs';
import { Player } from '../models/player';
import * as logic from '../helper/tournament';
import { ImplicitBracketNode } from '../models/bracket-node';
import { Router } from '@angular/router';
import { createBracketContext } from '../helper/generate-bracket-tree';
import { isNonEmptyArray } from '../types/non-empty-array';
import { BracketContext } from '../models/bracket-context';

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
  
  bracket$ =
    this.bracketSubject.asObservable();

  constructor(private router: Router) {}

  determineGame(players: Player[], bracketType: string) {
    const shuffledPlayers = this.shufflePlayers(players);

    switch (bracketType) {
      case 'single':
        //do single elimination logic
        this.singleElimination(shuffledPlayers);
        break;
      case 'double':
        //do double elimination logic
        this.doubleElimination(shuffledPlayers);
        break;
      case 'round-robin':
        //do round robin logic
        this.roundRobin(shuffledPlayers);
        break;
      default:
    }
  }

  //not sure if i should do tournament logic here or somewhere else

  shufflePlayers(players: Player[]) {
    let currentIndex = players.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = players[currentIndex];
      players[currentIndex] = players[randomIndex];
      players[randomIndex] = temporaryValue;
    }

    return players;
  }

  singleElimination(players: Player[]) {
    this.numberOfPlayers = players.length; // 8
    this.numberOfRounds = Math.ceil(Math.log2(this.numberOfPlayers)); // 3
    this.numberOfMatches = this.numberOfPlayers - 1; // 7
    this.numberOfByes = logic.calculateByeSingleElimination(
      this.numberOfPlayers
    ); // 0

    const bracketContext = this.generateBracket(players);
    const topBracket = bracketContext.topBracket;
    this.bracketSubject.next(topBracket);

    this.router.navigate(['/play']);
  }

  doubleElimination(players: Player[]) {
    throw new Error('Not implemented yet');
  }

  roundRobin(players: Player[]) {
    throw new Error('Not implemented yet');
  }

  generateBracket(players: Player[]): BracketContext {

    if (!isNonEmptyArray(players)) {
      throw new Error(`Players must be a non-empty array!`);
    }
    
    const bracketContext = createBracketContext(players);

    return bracketContext;
  }

  getNumberOfRounds(): number {
    return this.numberOfRounds;
  }

  getNumberOfMatches(): number {
    return this.numberOfMatches;
  }

  getNumberOfByes(): number {
    return this.numberOfByes;
  }

  getNumberOfPlayers(): number {
    return this.numberOfPlayers;
  }
}
