import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class SearchResultComponent implements OnInit, OnDestroy {
  currentPaths: IPath[];
  length: number;
  startPoint: string;
  endPoint: string;

  asideRows = 1;
  asideColumns = 1;
  mainRows = 1;
  mainColumns = 3;

  private querySubscription: Subscription;
  private pathsSubsciption: Subscription;
  constructor(
    private httpSrv: HttpService,
    breakpointObserver: BreakpointObserver,
    route: ActivatedRoute
  ) {
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.activateHandsetLayout();
        }
      });

    this.querySubscription = route.queryParams.subscribe((queryParam: any) => {
      this.startPoint = queryParam['from'];
      this.endPoint = queryParam['to'];
      this.pathsSubsciption = this.httpSrv
        .getPaths(this.startPoint, this.endPoint)
        .subscribe((res) =>   this.currentPaths = res);
    });
  }

  private activateHandsetLayout() {
    this.asideColumns = 4;
    this.mainRows = 0;
    this.mainColumns = 0;
  }

  ngOnInit(): void {
    this.currentPaths = this.httpSrv.currentPaths;
    this.activateHandsetLayout();
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
    this.pathsSubsciption.unsubscribe
  }
}
