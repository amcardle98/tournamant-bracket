import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, single } from 'rxjs';
import { Router } from '@angular/router';
import { Player } from '../interfaces';
import { tournamentUtils } from '../utils/tournament/tournament.utils';

import { MatchNode, PlayerNode } from '../classes/bracket-nodes';
@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$: Observable<Player[]> = this.playersSubject.asObservable();
  bracketTree: any;

  constructor(private router: Router) {}

  addPlayer(player: Player) {
    this.playersSubject.next([...this.playersSubject.value, player]);
  }

  removePlayer(player: Player) {
    const newPlayers = this.playersSubject.value.filter(
      (p) => p.name !== player.name
    );
    this.playersSubject.next(newPlayers);
  }

  removeAllPlayers() {
    this.playersSubject.next([]);
  }

  generateTournament() {
    const players = this.playersSubject.value;
    const bracketType = 'single';
    const bracketSeed = 'random';

    this.bracketTree = buildBrcketTree(players, bracketType);
    this.router.navigate(['/play']);
  }
}

function buildBrcketTree(players: Player[], bracketType: string) {
  const shuffledPlayers = tournamentUtils.shuffle(players);

  // perfect bracket (2^n players)
  const isBracketPerfect =
    shuffledPlayers.length ===
    Math.pow(2, Math.ceil(Math.log2(shuffledPlayers.length)));

  let currentNodes = shuffledPlayers.map((player) => new PlayerNode(player));

  //first iteration builds the first level of the bracket, which in in a case a 4 players, it is 4 player nodes, with 2 matche nodes
  while (currentNodes.length > 1) {
    const nextNodes = [];
    for (let i = 0; i < currentNodes.length; i += 2) {
      nextNodes.push(new MatchNode(currentNodes[i], currentNodes[i + 1]));
    }
    currentNodes = nextNodes;
  }

  return currentNodes;
}
