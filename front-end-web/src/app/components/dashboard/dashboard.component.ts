import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data = [
    {
      month: "Jan",
      value: 99,
    },
    {
      month: "Feb",
      value: 54,
    },{
      month: "March",
      value: 21,
    },
    {
      month: "April",
      value: 21,
    },
    {
      month: "May",
      value: 21,
    },
    {
      month: "June",
      value: 21,
    },
    {
      month: "July",
      value: 21,
    },
    {
      month: "August",
      value: 21,
    },
    {
      month: "September",
      value: 21,
    },
    {
      month: "October",
      value: 21,
    },{
      month: "November",
      value: 21,
    },
    {
      month: "December",
      value: 21,
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
