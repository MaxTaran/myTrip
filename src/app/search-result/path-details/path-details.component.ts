import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-path-details',
  templateUrl: './path-details.component.html',
  styleUrls: ['./path-details.component.scss'],
})
export class PathDetailsComponent implements OnInit {
  @Input() details: Object;
  constructor() {}

  ngOnInit(): void {}
}
