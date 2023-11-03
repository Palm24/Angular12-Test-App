import { Component, Input, OnInit } from '@angular/core';

interface Month {
  id: number;
  name: string;
}

@Component({
  selector: 'app-review-confirm',
  templateUrl: './review-confirm.component.html',
  styleUrls: ['./review-confirm.component.css']
})
export class ReviewConfirmComponent implements OnInit {
  @Input() modelItemsDetail: any = {};

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

  constructor() { }

  ngOnInit(): void {
  }

  checkMonth() {
    var findM = this.months.find((data) => data.id == this.modelItemsDetail.month);
    var nameMonth = findM?.name;
    return nameMonth;
  }
}
