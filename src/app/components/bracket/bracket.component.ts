import { Component, Input, OnInit } from '@angular/core';
import { BracketNode } from 'src/app/models/bracketNode';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  @Input() bracket!: BracketNode | null;
  @Input() round! : number;

  constructor() {
   }

  ngOnInit(): void {
  }

  


}
