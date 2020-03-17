import { Component, OnInit } from '@angular/core';
import { HttpService, Payload } from 'src/app/services/http.service';
import { data, localAPI, serverAPI } from 'src/app/utils/global.constant';
import { isArray } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  saleData;
  purchaseData;
  bYear = {
    selectedValue: null,
    list: null
  }
  category = {
    selectedValue: null,
    list: null
  }
  toggler = {
    purchase: true,
    sell: true,
  }
  toggleType = toggleType;
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
      url: serverAPI.categories,
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
      url: serverAPI.financialYear,
    }
    this.httpService.doApiCall(payload).subscribe(res => {
      if (isArray(res)) {
        this.bYear.list = res;
        this.bYear.selectedValue = res[0].name;
      };
    });
  }

  getCategoryWiseData() {
    let payload: Payload = {
      url: serverAPI.categoryWiseData,
      params: {
        categoryId: this.category.selectedValue,
        financialYear: this.bYear.selectedValue
      }
    }
    this.httpService.doApiCall(payload).subscribe(res => {
      if (!isArray(res)) {
        return null;
      }

      this.purchaseData = [];
      this.saleData = [];
      res.forEach(element => {
        let purchaseItem = {
          month: element.month,
          value: element.purchase
        }
        let saleItem = {
          month: element.month,
          value: element.sell
        }
        this.purchaseData.push(purchaseItem);
        this.saleData.push(saleItem);
      });
    });
  }

  dropdownSelectOnChange(which: any) {

  }

  toogleCharts(which:toggleType) {
    this.toggler[which] = !this.toggler[which]
  }
}

export enum toggleType {
  PURCHASE = "purchase",
  SELL = "sell"
}