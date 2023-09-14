import { Component, Input, OnInit } from '@angular/core';
import { ImplicitBracketNode } from 'src/app/models/bracket-node';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
})
export class BracketComponent implements OnInit {
  @Input() bracket: ImplicitBracketNode | null | undefined;
  @Input() round: number | null | undefined;

  constructor() {}

  ngOnInit(): void {}
}
