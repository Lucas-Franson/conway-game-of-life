import { Component,  inject,  OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableFieldComponent } from './components/table-field/table-field.component';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TableFieldComponent,
    MatButtonModule,
    MatInputModule,
    HistoryTableComponent,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'conway-game-of-life';
  private _snackBar = inject(MatSnackBar);

  @ViewChild(HistoryTableComponent) historyTable!: HistoryTableComponent;
  
  cells: number[][] = [];
  running = false;
  interval: any = null;

  size = new FormGroup({
    xsize: new FormControl(100),
    ysize: new FormControl(100)
  });
  
  ngOnInit(): void {
    this.draw();
  }

  changeCells(cells: any) {
    this.cells = cells;
    let y = cells.length;
    let x = cells[0].length;
    this.size.setValue({ xsize: x, ysize: y });
  }

  draw() {
    this.cells = [];
    let max = Math.pow(2, 64);
    let min = 50;
    if (!this.size.valid) return;
    let sizeGroup = this.size.value;
    if (sizeGroup.xsize! >= min && sizeGroup.xsize! < max && sizeGroup.ysize! >= min && sizeGroup.ysize! < max) {
      for (var i = 0; i < sizeGroup.ysize!; i++) {
        this.cells[i] = [];
        for (var j = 0; j < sizeGroup.xsize!; j++) {
          this.cells[i][j] = 0;
        }
      }
    } else {
      this._snackBar.open("Size is incorrect", "Close");
    }
  }

  onStart() {
    if (!this.running) {
      this.interval = setInterval(this.newGeneration.bind(this), 100);
    } else {
      clearInterval(this.interval);
    }
    this.running = !this.running;
  }

  newGeneration() {
    var newCells = [];
    for (var i = 0; i < this.cells.length; i++) {
      newCells.push(new Array(this.cells.length).fill(0));
    }
    for (var y = 0; y < this.cells.length; y++) {
      for (var x = 0; x < this.cells.length; x++) {
        var neighbours = this.countNeighbours(x, y);
        if (this.cells[y][x] == 0 && neighbours == 3) {
          newCells[y][x] = 1;
        }
        if (this.cells[y][x] == 1 && (neighbours == 2 || neighbours == 3)) {
          newCells[y][x] = 1;
        }
      }
    }
    this.cells = newCells;
  }

  countNeighbours(x: number, y: number) {
    var count = 0;
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        var nx = x + dx, 
              ny = y + dy;
        if (nx > 0 && nx < this.cells[0].length && ny > 0 && ny < this.cells.length) {
          count = count + this.cells[ny][nx];
        }
      }
    }
    return count - this.cells[y][x];
  }

  onStore() {
    let tmp:any = localStorage.getItem('cells');
    let position = 1;
    if (tmp) {
      tmp = JSON.parse(tmp);
      position = tmp.length + 1;
    } else {
      tmp = [];
    }
    tmp.push({ position, date: new Date().toLocaleString(), cells: this.cells });
    localStorage.setItem('cells', JSON.stringify(tmp));
    this.historyTable.search();
  }


}
