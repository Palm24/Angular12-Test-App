import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

interface modelDetail {
  fillType: string,
  month: string,
  year: string,
  saleAmount: number,
  taxAmount: number,
  surCharge: number,
  penalty: number,
  totalAmount: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isErrors!: boolean;
  model!: modelDetail;

  test: any = {
    fillType: '',
    month: '',
    year: '',
    saleAmount: 0,
    taxAmount: 0,
    surCharge: 0,
    penalty: 0,
    totalAmount: 0
  }

  isLinear = false;

  currentDate: Date = new Date();

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ''
  });
  stepperOrientation!: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
    .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
   }

  ngOnInit(): void {}

  reciveItem(newItem: boolean) {
    this.isErrors = newItem;
    if (this.isErrors == true) {
      this.isLinear = true;
    } else {
      this.isLinear = false;
    }
  }

  modelData(items: modelDetail) {
    this.model = items;
    this.test.fillType = items.fillType;
    this.test.month = items.month;
    this.test.year = items.year;
    this.test.saleAmount = items.saleAmount;
    this.test.taxAmount = items.taxAmount;
    this.test.surCharge = items.surCharge;
    this.test.penalty = items.penalty;
    this.test.totalAmount = items.totalAmount;
  }
}
