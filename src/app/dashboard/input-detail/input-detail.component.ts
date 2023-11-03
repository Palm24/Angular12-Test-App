import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe} from '@angular/common';

interface Month {
  id: number;
  name: string;
}

interface Year {
  id: number;
  year: number;
}

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
  selector: 'app-input-detail',
  templateUrl: './input-detail.component.html',
  styleUrls: ['./input-detail.component.css']
})
export class InputDetailComponent implements OnInit {
  @Output() isErrors = new EventEmitter<boolean>();
  @Output() model = new EventEmitter<modelDetail>();
  // @Input() sendTypeFill!: string;

  formTaxFill = new FormGroup({
    selectMonth: new FormControl('', Validators.required),
    selectYear: new FormControl('', Validators.required)
  });

  // selectMonth = new FormControl('', Validators.required);
  // selectYear = new FormControl('', Validators.required);

  formVatFill = new FormGroup({
    vat: new FormControl('', Validators.required),
    totalVat: new FormControl('', Validators.required)
  });

  // vat = new FormControl('', Validators.required);
  // totalVat = new FormControl('', Validators.required);
  oldTotal: any;

  surCharge: any;
  penalty: any;
  lastTotal: any;

  TypeFill: string = '0';

  errorMessage!: string;

  detailModel: modelDetail = {
    fillType: '',
    month: '',
    year: '',
    saleAmount: 0,
    taxAmount: 0,
    surCharge: 0,
    penalty: 0,
    totalAmount: 0,
  }

  months: Month[] = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ];
  conditionMonth: Month[] = [];

  years: Year[] = [
    { id: 1, year: 2020 },
    { id: 2, year: 2021 },
    { id: 3, year: 2022 },
    { id: 4, year: 2023 }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const y = new Date().getFullYear();
    const m = new Date().getMonth();
    var filterM = this.months.filter(data => data.id <= m)
    this.conditionMonth = filterM;

    // this.selectMonth.setValue(m);
    // this.selectYear.setValue(y);

    this.formTaxFill.controls.selectMonth.setValue(m);
    this.formTaxFill.controls.selectYear.setValue(y);

    if (this.formVatFill.controls.vat.value == "") {
      this.isErrors.emit(true);
    } else {
      this.isErrors.emit(false);
    }
  }

  // sendItems(data: string) {
  //   this.errors.emit(data);
  // }

  changeTypeItem(data: string) {
    this.TypeFill = data;
    
    if (this.TypeFill == "1") {
      this.formVatFill.controls.vat.setValue(null);
      this.formVatFill.controls.totalVat.setValue(null);
    }
    else if (this.TypeFill == "0") {
      this.surCharge = null;
      this.penalty = null;
      this.lastTotal = null;
    }
  }
  
  calculateVat() {
    if (this.formVatFill.controls.vat.value > 0) {
      var dataSet = this.formVatFill.controls.vat.value.toFixed(2);
      this.formVatFill.controls.vat.setValue(dataSet);

      var dataSetTotal = (this.formVatFill.controls.vat.value * 0.07).toFixed(2);
      this.formVatFill.controls.totalVat.setValue(dataSetTotal);
      this.oldTotal = this.formVatFill.controls.totalVat.value;
      this.isErrors.emit(false);
      
      if (this.TypeFill == '1') {
        this.surCharge = (this.formVatFill.controls.totalVat.value * 0.1).toFixed(2);
        this.penalty = (200).toFixed(2);  
        this.lastTotal = (parseFloat(this.formVatFill.controls.totalVat.value) + parseFloat(this.surCharge) + parseFloat(this.penalty)).toFixed(2);
      } else {
        this.lastTotal = this.formVatFill.controls.totalVat.value;
      }
    }
    else {
      this.formVatFill.controls.totalVat.setValue("");
      this.isErrors.emit(true);
      // alert("Please input your tax!");
    }
    this.sendDataToDisplay();
  }

  checkCondition() {
    var result = 0;
    if (this.formVatFill.controls.totalVat.value) {
      if (this.formVatFill.controls.totalVat.value > this.oldTotal) {
        result = parseFloat(this.formVatFill.controls.totalVat.value.toFixed(2)) - parseFloat(this.oldTotal);
        if (result > 20) {
          this.formVatFill.controls.totalVat.setErrors(Validators);
          this.errorMessage = "Tax more than change!";
          this.isErrors.emit(true);
        } else {
          this.formVatFill.controls.totalVat.clearValidators;
          this.isErrors.emit(false);
        }
      }
      else if (this.formVatFill.controls.totalVat.value < this.oldTotal) {
        result = parseFloat(this.oldTotal) - parseFloat(this.formVatFill.controls.totalVat.value.toFixed(2));
        if (result > 20) {
          this.formVatFill.controls.totalVat.setErrors(Validators);
          this.errorMessage = "Tax more than change!";
          this.isErrors.emit(true);
        } else {
          this.formVatFill.controls.totalVat.clearValidators;
          this.isErrors.emit(false);
        }
      }
    }
  }

  sendDataToDisplay() {
    this.detailModel.fillType = this.TypeFill;
    this.detailModel.month = this.formTaxFill.controls.selectMonth.value;
    this.detailModel.year = this.formTaxFill.controls.selectYear.value;
    this.detailModel.saleAmount = this.formVatFill.controls.vat.value;
    this.detailModel.taxAmount = this.formVatFill.controls.totalVat.value;
    this.detailModel.surCharge = this.surCharge;
    this.detailModel.penalty = this.penalty;
    this.detailModel.totalAmount = this.lastTotal;
    this.model.emit(this.detailModel);
  }

  logTestData() {
  }
}

