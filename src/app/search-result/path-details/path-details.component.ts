import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IPath } from '../../service/http.service';


@Component({
  selector: 'app-path-details',
  templateUrl: './path-details.component.html',
  styleUrls: ['./path-details.component.scss'],
})
export class PathDetailsComponent implements OnInit {
@Input() paths: IPath[];
  constructor() {}

  ngOnInit(): void {
    console.log('my path', this.paths);
  }
}
