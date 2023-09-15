import { Player } from './player';

/**
 * General shape of any bracket node in the tree.
 */
export interface BracketNode {
  leftPlayer?: Player;
  rightPlayer?: Player;
  winner?: Player;
}

/**
 * Represents a bracket node that has child nodes that will fill in the data here.
 *
 * The winner of the left node will be the left player, and the winner of the right node
 * will be the right player.
 */
export class ImplicitBracketNode implements BracketNode {
  /** Player 1 is the winner of `bracket1` */
  get leftPlayer() {
    return this.leftBracket?.winner;
  }
  get rightPlayer() {
    return this.rightBracket?.winner;
  }

  private _winner?: Player;

  get winner() {
    return this._winner;
  }

  leftBracket: BracketNode;
  rightBracket: BracketNode;

  constructor(leftBracket: BracketNode, rightBracket: BracketNode) {
    this.leftBracket = leftBracket;
    this.rightBracket = rightBracket;
  }

  isEmpty(): boolean {
    return (
      this.leftPlayer === null &&
      this.rightPlayer === null &&
      this.leftBracket === null &&
      this.rightBracket === null
    );
  }

  //TODO: Do we need this setter? Maybe some special emission logic can happen here
  //TODO: to notifiy things that the winner has been set? Maybe change
  //TODO: winner to be an observable?
  setWinner(player: Player): void {
    this._winner = player;
  }

  hasPlayers(): boolean {
    return !!this.leftPlayer && !!this.rightPlayer;
  }
}

/**
 * Represents a bracket pairing that has no more children. This is the start of
 * a tournament, or the leaf of the bracket tree.
 */
export class LeafBracketNode implements BracketNode {
  leftPlayer?: Player;
  rightPlayer?: Player;

  private _winner?: Player;
  get winner() {
    return this._winner;
  }

  constructor(
    leftPlayer: Player | undefined | null,
    rightPlayer: Player | undefined | null
  ) {
    this.leftPlayer = leftPlayer ?? undefined;
    this.rightPlayer = rightPlayer ?? undefined;
  }

  //TODO: Do we need this setter? Maybe some special emission logic can happen here
  //TODO: to notifiy things that the winner has been set? Maybe change
  //TODO: winner to be an observable?
  setWinner(player: Player): void {
    this._winner = player;
  }
}

export class ByeBracketNode extends LeafBracketNode {
  override rightPlayer: undefined = undefined;

//HEYADADAADAADAAM

  override get winner() {
    return this.leftPlayer;
  }

  constructor(leftPlayer: Player) {
    super(leftPlayer, undefined);
  }
}
