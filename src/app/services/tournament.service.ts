import { Injectable } from '@angular/core';
import { single } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor() { }

  generateBracket(players: Player[], bracketType: string) {
    const shuffledPlayers = this.shufflePlayers(players);
    
    switch(bracketType) {
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
    const numberOfPlayers = players.length; // 8 
    const numberOfRounds = Math.log2(numberOfPlayers); // 3
    const numberOfMatches = numberOfPlayers - 1; // 7
    const numberOfByes = numberOfMatches - numberOfPlayers; // 0

  }

  doubleElimination(players: Player[]) {
    throw new Error('Not implemented yet');
  }

  roundRobin(players: Player[]) {
    throw new Error('Not implemented yet');
  }


}
