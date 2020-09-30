import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const URL = 'MY_URL';
const path = {
  mixed: {
    total: {
      price: '48',
      duration: '22 hours 15 minutes',
    },
    details: [
      {
        from: 'Antwerp',
        to: 'Bratislava',
        price: '48',
        transportation: 'Bus',
        duration: '22 hours 15 minutes',
      },
    ],
  },
  flyingRouts: {
    total: {
      price: '94',
      duration: '13 hours 25 minutes',
    },
    details: [
      {
        from: 'Antwerp',
        to: 'Bordeaux',
        price: '49',
        transportation: 'Flight',
        duration: '4 h 43 minutes',
      },
      {
        from: 'Bordeaux',
        to: 'Bratislava',
        price: '45',
        transportation: 'Flight',
        duration: '8 h 40minutes',
      },
    ],
  },
  groundRouts: {
    total: {
      price: '94',
      duration: '22 hours 25 minutes',
    },
    details: [
      {
        from: 'Antwerp',
        to: 'Bratislava',
        price: '94',
        transportation: 'Bus',
        duration: '22 hours 25 minutes',
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
