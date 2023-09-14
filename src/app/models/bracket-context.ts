import { BottomBracketNode, ImplicitBracketNode } from "./bracket-node";
import { Player } from "./player";

export interface BracketContext {
  numberOfMatches: number;
  numberOfRounds: number;
  topBracket: ImplicitBracketNode;
  bottomBrackets: BottomBracketNode[];
  players: Player[];
}