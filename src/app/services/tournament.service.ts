import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, single } from 'rxjs';
import { Player } from '../models/player';
import * as logic from '../helper/tournament';
import { BracketNode } from '../models/bracketNode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  numberOfMatches!: number;
  numberOfRounds!: number;
  numberOfByes!: number;
  numberOfPlayers!: number;

  private bracketSubject = new BehaviorSubject<BracketNode>(new BracketNode());
  bracket$: Observable<BracketNode> = this.bracketSubject.asObservable();

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

    const bracket = this.generateBracket(players);
    this.bracketSubject.next(bracket);

    this.router.navigate(['/play']);
  }

  doubleElimination(players: Player[]) {
    throw new Error('Not implemented yet');
  }

  roundRobin(players: Player[]) {
    throw new Error('Not implemented yet');
  }

  generateBracket(players: Player[]): BracketNode {
    if (players.length === 0) {
      this.router.navigate(['/play']);
    }

    if (players.length === 1) {
      return new BracketNode(players[0]);
    }

    if (players.length === 2) {
      return new BracketNode(players[0], players[1]);
    }

    const mid = Math.ceil(players.length / 2);
    const leftBracket = this.generateBracket(players.slice(0, mid));
    const rightBracket = this.generateBracket(players.slice(mid));

    return new BracketNode(null, null, leftBracket, rightBracket);
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
