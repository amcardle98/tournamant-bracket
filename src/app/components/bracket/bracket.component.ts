import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player';
import { BracketNode } from 'src/app/models/bracketNode';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent {
  @Input() bracket!: BracketNode | null;

  constructor() { }


}
