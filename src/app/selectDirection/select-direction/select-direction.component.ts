import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Observable, Subject } from 'rxjs';

const TOP_MENU = ['Transport', 'Hotels', 'Other'];
enum PointType {
  From = 'from',
  To = 'to',
}

@Component({
  selector: 'app-select-direction',
  templateUrl: './select-direction.component.html',
  styleUrls: ['./select-direction.component.scss'],
})
export class SelectDirectionComponent implements OnInit {
  topMenu: string[];
  directionFromArr: string[];
  directionToArr: string[];
  directionFrom = '';
  directionTo = '';
  obsFrom: Observable<string>;

  directionForm: FormGroup = new FormGroup({
    fromControl: new FormControl('', Validators.required),
    toControl: new FormControl('', Validators.required),
  });
  constructor(private httpSrv: HttpService) {}

  ngOnInit(): void {
    this.topMenu = TOP_MENU;
    this.directionFromArr = [];
    this.directionToArr = [];
    this.obsFrom = new Observable<string>();
  }

  onChangeFrom(i: any) {
    this.httpSrv
      .getAutoCompleteData(i, PointType.From)
      .subscribe((response) => (this.directionFromArr = [...response]));
  }
  onChangeTo(i: any) {
    this.httpSrv.getAutoCompleteData(i, PointType.To).subscribe((response) => {
      this.directionToArr = [...response];
    });
  }

  changeDirection() {
    console.log('on change Direction');
    [this.directionFrom, this.directionTo] = [
      this.directionTo,
      this.directionFrom,
    ];
  }

  onSubmit() {
    console.log('directionForm', this.directionFrom);
    console.log('directionTo', this.directionTo);
    this.httpSrv.selectPath(this.directionFrom, this.directionTo);
  }
}
