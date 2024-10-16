import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-field',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './table-field.component.html',
  styleUrl: './table-field.component.css'
})
export class TableFieldComponent {

  @Input() cells: number[][] = [];

  onClick(x: number, y: number) {
    this.cells[x][y] = this.cells[x][y] == 0 ? 1 : 0;
  }

}
