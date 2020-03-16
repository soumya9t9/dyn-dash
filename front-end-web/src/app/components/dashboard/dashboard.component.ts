import { Component, OnInit } from '@angular/core';
import { HttpService, Payload } from 'src/app/services/http.service';
import { data, localAPI } from 'src/app/utils/global.constant';
import { isArray } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data = data;
  bYear = {
    selectedValue: null,
    list: ["2019-20", "2018-19", "2017-18", "2016-17"]
  }
  category = {
    selectedValue: null,
    list: null
  }
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllCategories();
    this.getCategoryWiseData();
  }

  getAllCategories() {
    let payload: Payload = {
      url: localAPI.categories,
      isLocal: true
    }
    this.httpService.doApiCall(payload).subscribe(res => {
      if (isArray(res)) {
        this.category.list = res;
      };
    });;
  }

  getAllFinancialYears() {
    let payload: Payload = {
      url: localAPI.financialYear,
      isLocal: true
    }
    this.httpService.doApiCall(payload).subscribe(res => {
      if (isArray(res)) {
        this.bYear.list = res;
      };
    });
  }

  getCategoryWiseData() {
    let payload: Payload = {
      url: localAPI.categoryWiseData,
      isLocal: true,
      params: {
        category: this.category.selectedValue,
        financialYear: this.bYear.selectedValue
      }
    }
    this.httpService.doApiCall(payload).subscribe(res => {
      
    });
  }

  dropdownSelectOnChange(which: any) {

  }
}
