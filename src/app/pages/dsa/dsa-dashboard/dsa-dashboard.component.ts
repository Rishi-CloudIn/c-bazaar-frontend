import { Component, ViewChild, OnInit } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
} from 'ng-apexcharts';
import { DsaService } from 'src/app/services/dsa.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dsa-dashboard',
  templateUrl: './dsa-dashboard.component.html',
  styleUrls: ['./dsa-dashboard.component.css'],
})
export class DsaDashboardComponent implements OnInit {
  isLoading: boolean = true;
  countList: any[] = [];
  loanList: any[] = [];
  role: string = '';
  disbursementGraph = [
    {
      name: 'Amount',
      data: [],
    },
  ];
  rejectedGraph = [
    {
      name: 'Amount',
      data: [],
    },
  ];
  chartOptions: any = {
    series: [
      {
        name: 'Likes',
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: 7,
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      // title: {
      //   text: 'Engagement',
      // },
    },
    title: {
      text: 'Social Media',
      align: 'left',
      style: {
        fontSize: '16px',
        color: '#666',
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
    markers: {
      size: 4,
      colors: ['#FFA41B'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    yaxis: {
      min: 0,
      title: {
        text: 'Number of Loans',
      },
    },
  };

  constructor(private dsa: DsaService) {}

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    let data = {};
    this.dsa.dsaDashboard(data).subscribe((r: any) => {
      this.role = r.role;
      console.error(r);
      let temp = r.response.dashboard;
      for (let res of temp) {
        console.error(res);
        switch (res.type) {
          case 'countList':
            this.countList = res.values;
            break;
          // case 'loanList':
          //   this.loanList = res.values;
          //   break;

          case 'disburseGraph':
            this.disbursementGraph[0].data = res.graphValue;
            break;

          case 'rejectionGraph':
            this.rejectedGraph[0].data = res.graphValue;
            break;

          default:
            break;
        }
      }
      this.isLoading = false;
    });
  }
}
