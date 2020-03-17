import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import * as d3 from 'd3';
import * as $ from 'jquery';
import { Data } from 'src/app/utils/global.constant';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @ViewChild('lineChart', { static: true }) private chartContainer: ElementRef;

  @Input() data: any[];
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  constructor(private hostRef: ElementRef) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (!this.data) { return null; }

    this.createChart();
  }

  createChart() {
    // let data:any = [{month:"March", value:222}, {month:"April", value:22}, {month:"May", value:111},]
    let data= this.data;

    
    const element = this.chartContainer.nativeElement;

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 650 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var svg = d3.select(element)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    //Read the data
    // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv",
    //   // When reading the csv, I must format variables:
    //   function (d: any):RequestInit {
    //     return d
    //     // return { month: d3.timeParse("%Y-%m-%d")(d.month), value: d.value }
    //   },
    //   // Now I can use this dataset:
    //   function (data: any) {
    //     // Add X axis --> it is a month format
        var x = d3
        // .scaleTime()
          .scaleBand()
          .domain(data.map(d => d.month))
          .padding(0.1)
          // .domain(d3.extent(data, function (d) { return d.month; }))
          .range([0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
        // Add Y axis
        var y = d3.scaleLinear()
          .domain([parseInt(d3.min(data, (d:any) => d.value)), parseInt(d3.max(data, (d:any) => d.value))])
          .range([height, 0]);
        svg.append("g")
          .call(d3.axisLeft(y));
        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function (d:any) { return x(d.month) })
          .y(function (d:any) { return y(d.value) })
        )
        // Add the points
        svg
          .append("g")
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function (d:any) { return x(d.month) })
          .attr("cy", function (d:any) { return y(d.value) })
          .attr("r", 5)
          .attr("fill", "#69b3a2")
      // })
  }

}
