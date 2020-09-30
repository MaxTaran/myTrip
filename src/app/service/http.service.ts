import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const URL = 'MY_URL';
const path = {
  Mixed: {
    total: {
      Price: '48',
      Duration: '22 hours 15 minutes',
    },
    details: [
      {
        From: 'Antwerp',
        To: 'Bratislava',
        Price: '48',
        Transportation: 'Bus',
        Duration: '22 hours 15 minutes',
      },
    ],
  },
  FlyingRouts: {
    total: {
      Price: '94',
      Duration: '13 hours 25 minutes',
    },
    details: [
      {
        From: 'Antwerp',
        To: 'Bordeaux',
        Price: '49',
        Transportation: 'Flight',
        Duration: '4 h 43 minutes',
      },
      {
        From: 'Bordeaux',
        To: 'Bratislava',
        Price: '45',
        Transportation: 'Flight',
        Duration: '8 h 40minutes',
      },
    ],
  },
  GroundRouts: {
    total: {
      Price: '94',
      Duration: '22 hours 25 minutes',
    },
    details: [
      {
        From: 'Antwerp',
        To: 'Bratislava',
        Price: '94',
        Transportation: 'Bus',
        Duration: '22 hours 25 minutes',
      },
    ],
  },
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  currentPath: object;
  constructor(private http: HttpClient, private router: Router) {}

  getAutoCompleteData(data: string, type: string, ): Observable<string[]> {
    const address =
      URL +
      'getLocations?type=' +
      type +
      '&search_name=' +
      encodeURIComponent(data);

    //  this.http.get(address );
    from(data).subscribe((res) => {
      console.log;
    });
    const DIRECTIONS_FROM = [
      'Moscow',
      'Tel-Aviv',
      'London',
      'Viena',
      'San-Paolo',
      'Krakow',
      'Bansko',
    ];
    return of(DIRECTIONS_FROM);
  }

  selectPath(from: string, to: string): void {
    console.log('from', from);
   this.currentPath = path;
   this.router.navigate(['/path']);
  }
}
