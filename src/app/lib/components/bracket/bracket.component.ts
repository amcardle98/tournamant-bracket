import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BracketNode, ImplicitBracketNode } from 'src/app/models/bracket-node';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss'],
  standalone: false,
})
export class BracketComponent implements OnInit {
  @Input() bracket: BracketNode | null | undefined;
  @Input() round: number | null | undefined;

  leftDescendantBracket?: BracketNode;
  rightDescendantBracket?: BracketNode;

  isByeRound: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  //i had a tournament page to render the whole tournament, that using <app-bracket> inside that

  // I saw, But I was thinking it might be easier if the <app-bracket> component recursively rendfered itself.
  // That avoids splitting up rounds, etc.. What do you think?
  // i agree but its gonna get confusing fast, i couldnt figure out how to separet the brackets into rounds thats when
  // i add the round input
  // <app-bracket [bracket]="bracket" [round]="firstRound">
  // and then maybe wrap then around ngIf? but then it would need another for the matches idk

  // I was just going to recursively render into grids/flexboxes, to create a tree graphic of the bracket.
  // Do you need a columnar like global view for the bracket? Like a table or something?
  // i would like something that looks like a bracket lol
  // i guess thats fine and i can adjust styling later. i just dont know how to get the line on there
  // we can do mirrored if its over 8 players :)
  // :thumbsup:

  // Deal. We'll put that conditional logic in the "tournament" component.
  // If it's 8 or less, we'll only use a single display tree. If it's over 8, we'll split the tree into 2 display trees.

  // Could also do a mirrord layout https://static.vecteezy.com/system/resources/previews/014/764/023/non_2x/blank-16-team-tournament-bracket-isolated-on-white-background-vector.jpg
}
