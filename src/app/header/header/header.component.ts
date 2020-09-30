import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  topMenu = ['item-1', 'item-2'];
  userIsAuthenticated = false;
  constructor() {}

  ngOnInit(): void {}
}
