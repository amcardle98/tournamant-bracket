export interface ITournamentNode {
  nodeLeft: ITournamentNode | null;
  nodeRight: ITournamentNode | null;
  winner: Player | null;
}
