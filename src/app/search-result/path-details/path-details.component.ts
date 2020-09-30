import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-path-details',
  templateUrl: './path-details.component.html',
  styleUrls: ['./path-details.component.scss'],
})
export class PathDetailsComponent implements OnInit {
  @Input() path: Object;
  constructor() {}

  ngOnInit(): void {
    console.log('my path',this.path);
  }
}
