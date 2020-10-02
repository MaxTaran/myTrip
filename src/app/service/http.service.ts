import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';

const URL = 'MY_URL';
const PATHMAP = new Map();
PATHMAP.set('mixed_routes', {
  type: 'Mixed Trip',
  icon: `<span class="material-icons">
commute
</span>`,
});
PATHMAP.set('flying_routes', {
  type: 'Air Trip',
  icon: `<span class="material-icons">
flight
</span>`,
});
PATHMAP.set('ground_routes', {
  type: 'Ground Trip',
  icon: `<span class="material-icons" color="primary">
directions_bus
</span>`,
});

const PATHS = `{"mixed_routes":
{"direct_paths":
[
  {
    "transportation_type":"Bus",
    "euro_price":19.3951,
    "duration_minutes":3360,
    "from":"Bournemouth",
    "to":"Bucharest"},
    {
    "transportation_type":"Bus",
    "euro_price":12.5216,
    "duration_minutes":509,
    "from":"Bucharest",
    "to":"Budapest"}
],
"euro_price":31.0,
"duration_minutes":3869
},

"flying_routes":{"direct_paths":[{"transportation_type":"Flight","euro_price":76.0,"duration_minutes":347,"from":"Bournemouth","to":"Alicante"},{"transportation_type":"Flight","euro_price":47.8124,"duration_minutes":361,"from":"Alicante","to":"Budapest"}],"euro_price":123.0,"duration_minutes":708},"ground_routes":{"direct_paths":[{"transportation_type":"Bus","euro_price":19.3951,"duration_minutes":3360,"from":"Bournemouth","to":"Bucharest"},{"transportation_type":"Bus","euro_price":12.5216,"duration_minutes":509,"from":"Bucharest","to":"Budapest"}],"euro_price":31.0,"duration_minutes":3869}}`;

interface IRout {
  euro_price: string;
  duration_minutes: string;
  transportation_type: string;
  from: string;
  to: string;
}

interface IDetails {
  euro_price: string;
  duration_minutes: string;
  direct_paths: IRout[];
}

export interface IPath {
  pathType: { type: string; icon: SafeHtml };
  details: IDetails;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  currentPaths: IPath[];
  startPoint: string;
  endPoint: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  getAutoCompleteData(data: string, type: string): Observable<string[]> {
    const address =   URL +   'getLocations?type=' +   type + '&search_name=' +   encodeURIComponent(data);
    from(data).subscribe((res) => {
      console.log('HELLO');
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
    this.startPoint = from;
    this.endPoint = to;
    const newPath = JSON.parse(PATHS);
    this.transformObject(newPath);
    this.router.navigate(['/path']);
  }

  private transformObject(obj: object) {
    let objArr: IPath[] = [];
    for (let i in obj) {
      const transformedDetails = this.transformDetails(obj[i]);
      const testObj = { pathType: this.mapSanitazing().get(i), details: transformedDetails };
      const newObj = { pathType: PATHMAP.get(i), details: transformedDetails };
      objArr.push(testObj);
    }
    this.currentPaths = objArr;
  }

  private transformDetails(obj: IDetails): IDetails {
    const newPaths = obj.direct_paths.map((item) => {
      return {
        ...item,
        duration_minutes: this.transformTime(+obj.duration_minutes),
        euro_price: this.transformPrice(+obj.euro_price),
      };
    });
    const newObj = {
      direct_paths: newPaths,
      euro_price: this.transformPrice(+obj.euro_price),
      duration_minutes: this.transformTime(+obj.duration_minutes),
    };
    return newObj;
  }

  private transformTime(minutes: number): string {
    const days = Math.floor(minutes / 60 / 24);
    const dayStr = days == 0 ? '' : days == 1 ? days + ' day' : days + ' days';
    const hours = Math.floor(minutes / 60 - days * 24);
    const hourStr =
      hours == 0 ? '' : hours == 1 ? hours + ' hour' : hours + ' hours';
    const min = minutes - days * 24 * 60 - hours * 60;
    const minStr =
      min == 0 ? '' : min == 1 ? min + ' minute' : min + ' minutes';
    return dayStr + ' ' + hourStr + ' ' + minStr;
  }

  private transformPrice(price: number): string {
    const euro = Math.floor(+price);
    const cent = Math.floor(+price - euro) * 10;
    return euro + ' euro' + ' ' + cent + ' cents';
  }

  private mapSanitazing(): Map<string, { type: string; icon: SafeHtml }> {
    let newMap = new Map<string, { type: string; icon: SafeHtml }>();
    PATHMAP.forEach((value, key, map) => {
      const val = {
        ...value,
        icon: this.sanitizer.bypassSecurityTrustHtml(value.icon),
      };

      newMap.set(key, val);
      return newMap;
    });
    return newMap;
  }
}
