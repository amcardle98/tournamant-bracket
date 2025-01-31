import { Player } from './player.interface';

export interface ITournamentNode {
  nodeLeft: ITournamentNode | null;
  nodeRight: ITournamentNode | null;
  winner: Player | null;
}
