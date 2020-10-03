import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';


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
  startPointArr: string[];
  endPointArr: string[];
  startPoint = '';
  endPoint = '';
  obsFrom: Observable<string>;

  directionForm: FormGroup = new FormGroup({
    startPointControl: new FormControl('', Validators.required),
    endPointControl: new FormControl('', Validators.required),
  });
  constructor(private httpSrv: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.startPointArr = [];
    this.endPointArr = [];
    this.obsFrom = new Observable<string>();
  }

  onChangeStartPoint(i: any) {
    this.httpSrv
      .getAutoCompleteData(i, PointType.From)
      .subscribe((response) => (this.startPointArr = [...response]));
  }
  onChangeEndPoint(i: any) {
    this.httpSrv.getAutoCompleteData(i, PointType.To).subscribe((response) => {
      this.endPointArr = [...response];
    });
  }

  changeDirection() {
    [this.startPoint, this.endPoint] = [this.endPoint, this.startPoint];
    this.directionForm.controls['endPointControl'].setValue(this.endPoint);
    this.directionForm.controls['startPointControl'].setValue(this.startPoint);
  }

  onSubmit() {
   
  //  this.httpSrv.selectPath(this.startPoint, this.endPoint);
    const queryParams = {from: this.startPoint, to: this.endPoint};
    this.router.navigate(['/path'], {queryParams});

  }

  getStartPoint(point: string) {
    this.startPoint = point;
  }

  getEndPoint(point: string) {
    this.endPoint = point;
  }
}
