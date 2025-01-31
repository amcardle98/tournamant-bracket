import { DataSource } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-player-list',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent {
  displayedColumns: string[] = ['name'];

  @Input() dataSource: Player[] = [];

  constructor() {}
}
