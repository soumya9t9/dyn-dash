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
  saleData = data;
  purchaseData = data;
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
    this.getAllFinancialYears();
    // this.getCategoryWiseData();
  }

  getAllCategories() {
    let payload: Payload = {
      url: localAPI.categories,
      isLocal: true
    }
    this.httpService.doApiCall(payload).subscribe(res => {
      if (isArray(res)) {
        this.category.list = res;
        this.category.selectedValue = res[0].id;
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
        this.bYear.selectedValue = res[0].id;
      };
    });
  }

  getCategoryWiseData() {
    let payload: Payload = {
      url: localAPI.categoryWiseData,
      isLocal: true,
      params: {
        categoryId: this.category.selectedValue,
        financialYear: this.bYear.selectedValue
      }
    }
    this.httpService.doApiCall(payload).subscribe(res => {
      res.forEach(element => {
        let purchaseItem = {
          month:element.name,
          value: element.buy
        }
        let saleItem = {
          month:element.name,
          value: element.sale
        }
        this.purchaseData.push(purchaseItem);
        this.saleData.push(saleItem);
      });
    });
  }

  dropdownSelectOnChange(which: any) {

  }
}
