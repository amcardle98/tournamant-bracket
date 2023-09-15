import { BracketContext } from '../models/bracket-context';
import {
  LeafBracketNode,
  BracketNode,
  ImplicitBracketNode,
  ByeBracketNode,
} from '../models/bracket-node';
import { Player } from '../models/player';
import { NonEmptyArray, isNonEmptyArray } from '../types/non-empty-array';

export function createBracketTreeFromPlayers(
  players: NonEmptyArray<Player>
): BracketNode {
  if (players.length === 1) {
    return new ByeBracketNode(players[0]);
  }

  if (players.length === 2) {
    return new LeafBracketNode(players[0], players[1]);
  }

  const middleIndex = Math.ceil(players.length / 2);
  const leftPlayers = players.slice(0, middleIndex);
  const rightPlayers = players.slice(middleIndex);

  if (isNonEmptyArray(leftPlayers) && isNonEmptyArray(rightPlayers)) {
    const leftBracket = createBracketTreeFromPlayers(leftPlayers);
    const rightBracket = createBracketTreeFromPlayers(rightPlayers);

    return new ImplicitBracketNode(leftBracket, rightBracket);
  } else {
    throw new Error(
      `The player array was not split correctly! Left players: ${leftPlayers}, right players: ${rightPlayers}`
    );
  }
}

export function getMatchCountFromBracketTree(bracketTree: BracketNode): number {
  //If this is a bracket node, assume this match counts.
  let matchCount = 1;

  if (bracketTree instanceof ImplicitBracketNode) {
    matchCount += getMatchCountFromBracketTree(bracketTree.leftBracket);
    matchCount += getMatchCountFromBracketTree(bracketTree.rightBracket);
  }
  // while loops and `let` variables
  // nightmare fuel
  return matchCount;
}

export function getBottomBracketsFromTree(
  bracketTree: BracketNode
): LeafBracketNode[] {
  const bottomBrackets: LeafBracketNode[] = [];

  if (bracketTree instanceof LeafBracketNode) {
    bottomBrackets.push(bracketTree);
  } else if (bracketTree instanceof ImplicitBracketNode) {
    bottomBrackets.push(...getBottomBracketsFromTree(bracketTree.leftBracket));
  }

  return bottomBrackets;
}

/**
 * @deprecated math
 */
export function getNumberOfRoundsFromTree(bracketTree: BracketNode) {
  // The number of rounds depends on the levels of nesting the tree has.
  // We simply want to follow the longest branch on the tree, even though
  // the tree **should** be symmetrical.

  // We can use that, I was going to calculate it from the tree, but
  // there's probably a mathmatecal relation I didn't learn about yet.
  // Use that?

  //thats what i looked up and it seemed like it was working
  // 2-4 was 3 rounds
  //5 -8 was 4 rounds
  //etc
  //9 -11
  // this.numberOfRounds = Math.ceil(Math.log2(this.numberOfPlayers));

  //how are you calculating the player length
  //user input?
  // yes
  // did you see the ui i had on this before

  // Player length is the length of the array of players.?? Right?

  let numberOfRounds = 0;

  if (bracketTree instanceof ImplicitBracketNode) {
    const leftNestingLevels = getNumberOfRoundsFromTree(
      bracketTree.leftBracket
    );
    const rightNestingLevels = getNumberOfRoundsFromTree(
      bracketTree.rightBracket
    );
  }
}

export function createBracketContext(
  players: NonEmptyArray<Player>
): BracketContext {
  const topBracket = createBracketTreeFromPlayers(players);

  // Assert that the top node here is an ImplicitBracketNode, not a bottom node.
  if (!(topBracket instanceof ImplicitBracketNode)) {
    throw new Error(`The bracket tree should be a calculated bracket node!`);
  }

  const numberOfMatches = getMatchCountFromBracketTree(topBracket);
  const bottomBrackets = getBottomBracketsFromTree(topBracket);
  const numberOfRounds = Math.ceil(Math.log2(players.length));

  const bracketContext: BracketContext = {
    topBracket: topBracket,
    numberOfMatches,
    bottomBrackets,
    numberOfRounds,
    players,
  };

  return bracketContext;
}
