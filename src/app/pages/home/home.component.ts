import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { FormGroup, FormControl } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  players: Player[] = [
  ];
  currentPlayerName: string = '';
  displayedColumns: string[] = ['name', 'actions'];
  numberOfPlayers: number = 0;
  bracketType = 'single';
  canStartTournament: boolean = false;

  constructor(private tournamentService: TournamentService) {

  }

  ngOnInit() {  
  }

  addPlayer() {
    //probably not the best way to do this
    if(this.currentPlayerName.trim() === '' || this.currentPlayerName === null) {
      return;
    }

    //check if player already exists
    for(let i = 0; i < this.players.length; i++) {
      if(this.players[i].name === this.currentPlayerName) {
        return;
      }
    }

    const newPlayers = [...this.players];
    newPlayers.push(new Player(this.currentPlayerName));
    this.players = newPlayers;
    this.numberOfPlayers = this.players.length;

    this.currentPlayerName = '';

    if(this.numberOfPlayers >= 2) {
      this.canStartTournament = true;
    } 
  }

  removePlayer(player: Player) {  
    const newPlayers = [...this.players];
    newPlayers.splice(newPlayers.indexOf(player), 1);
    this.players = newPlayers;
  }

  removeAll() {
    this.players = [];
    this.numberOfPlayers = 0;
    this.canStartTournament = false;
  }
  
  generateBracket() {
    this.tournamentService.determineGame(this.players, this.bracketType);

    
  }
}
