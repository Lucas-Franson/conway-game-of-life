import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

export interface HistoryTable {
  position: number;
  date: string;
  action: string;
}

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.css'
})
export class HistoryTableComponent implements OnInit {
  
  @Output() onChangeCells = new EventEmitter<any>();
  
  displayedColumns: string[] = ['position', 'date', 'action'];
  dataSource = [];
  
  onLoad(pos: number) {
    let cells = localStorage.getItem('cells');
    if (cells) {
      let history = JSON.parse(cells);
      let tmp = history.find((x:any) => x.position === pos);
      this.onChangeCells.emit(tmp.cells);
    }
  }

  search() {
    let cells = localStorage.getItem('cells');
    if (cells) {
      let history = JSON.parse(cells);
      if (history.length > 0) {
        this.dataSource = history
          .map(({ position, date }: HistoryTable) => ({ position, date, action: '' }))
          .sort((a:any, b:any) => b.position - a.position);  
      }
    }
  }

  ngOnInit(): void {
    this.search();
  }

}
