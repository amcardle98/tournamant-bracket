import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {
  /**
   * This will be one single bracket component which will contain 2 players 
   * My idea is to have something like
   *  
   * <Bracket [matchPlayers]="players*2"></bracket> 
   * 
   * Where it takes in 2 players passed in from the parent component
   * the parent component will contain a shuffled list of players.
   * Im not sure if the best option is to just pass in the first 2 players or select 2 randomly 
   * since the list will already be shuffled.
   * 
   */

  @Input() matchPlayers: Player[] = [];



}
