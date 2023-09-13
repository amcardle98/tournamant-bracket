import { Player } from './player';

export class BracketNode {
  player1: Player | null;
  player2: Player | null;
  winner: Player | null;
  left: BracketNode | null;
  right: BracketNode | null;

  constructor(
    player1: Player | null = null,
    player2: Player | null = null,
    left: BracketNode | null = null,
    right: BracketNode | null = null
  ) {
    this.player1 = player1;
    this.player2 = player2;
    this.winner = null; // Initialize winner as null
    this.left = left;
    this.right = right;
  }

  isEmpty(): boolean {
    return ((this.player1 === null && this.player2 === null) && (this.left === null && this.right === null));
  }

  isLeaf(): boolean {
    return (this.left === null && this.right === null);
  }

  setWinner(player: Player): void {
    this.winner = player;
  }

  getWinner(): Player | null {
    return this.winner;
  }

  hasPlayers(): boolean {
    return (this.player1 !== null && this.player2 !== null);
  }
}
