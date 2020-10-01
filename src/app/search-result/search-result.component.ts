import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { HttpService, IPath } from '../service/http.service';

export interface ITile {
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  currentPaths: IPath[];
  length: number;

  asideRows = 1;
  asideColumns = 1;
  mainRows = 1;
  mainColumns = 3;
  constructor(
    private httpService: HttpService,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.activateHandsetLayout();
        }
      });
  }

  private activateHandsetLayout() {
  
    console.log('activateHandsetLayout', this.asideRows);
    this.asideColumns = 4;
    this.mainRows = 0;
    this.mainColumns = 0;
  }

  ngOnInit(): void {
    this.currentPaths = this.httpService.currentPaths;
    this.activateHandsetLayout();
  }
}
