import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as $ from 'jquery';
// declare var $: any;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @ViewChild('barChart', { static: true }) private chartContainer: ElementRef;

  @Input()
  data: Data[];
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  constructor(private hostRef: ElementRef) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    if (!this.data) { return; }

    this.createChart();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data;

    let w = $(this.hostRef.nativeElement).parent().width() || element.offsetWidth;
    let h = 350 ||element.offsetHeight;

    const svg = d3.select(element).append('svg')
      .attr('width', w)
      .attr('height', h);


    const contentWidth = w - this.margin.left - this.margin.right;
    const contentHeight = h - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.month));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.value)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, "%"))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'start')
      .text('value');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.month))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => contentHeight - y(d.value))
      .attr('fill', "#ff9666");
  }
}


export interface Data {
  month: string;
  value: number;
}