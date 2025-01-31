import { Player, ITournamentNode } from '../interfaces';

export class MatchNode implements ITournamentNode {
  private _winner: Player | null = null;

  public readonly nodeLeft: ITournamentNode | null = null;
  public readonly nodeRight: ITournamentNode | null = null;

  public get winner() {
    return this._winner;
  }

  constructor(
    nodeLeft: ITournamentNode | null,
    nodeRight: ITournamentNode | null
  ) {
    this.nodeLeft = nodeLeft;
    this.nodeRight = nodeRight;
  }

  public setWinnerLeft() {
    this._winner = this.nodeLeft?.winner || null;
  }

  public setWinnerRight() {
    this._winner = this.nodeRight?.winner || null;
  }

  public resetWinner() {
    this._winner = null;
  }
}

export class PlayerNode implements ITournamentNode {
  public readonly nodeLeft: ITournamentNode | null = null;
  public readonly nodeRight: ITournamentNode | null = null;

  public readonly winner: Player | null = null;

  constructor(player: Player) {
    this.winner = player;
  }
}
