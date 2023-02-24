import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  colors: string[];
};

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.component.html',
  styleUrls: ['./emi-calculator.component.css'],
})
export class EmiCalculatorComponent implements OnInit {
  public chartOptions: ChartOptions;

  year = new Date().getFullYear();
  principalAmt: number = 10000;
  floteMonthlyEMI: number = 0;
  isSubmitted: boolean = false;
  calculated: boolean = false;
  emiForm!: FormGroup;
  principal = {
    min: 100000,
    max: 10000000,
    step: 10000,
    interest: 6.7,
  };
  tenure = {
    max: 360,
    min: 12,
    step: 1,
  };
  loanType: string = 'Home Loan';
  isLoading: boolean = true;
  tableData: any;
  loanAmountScale: any[] = [];
  tenureScale: any[] = [];
  totalPayable: string = '';
  monthlyEMI: number = 0;

  constructor(private fb: FormBuilder) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                // console.error(w);
                return '100%';
              },
            },
          },
        },
      },
      labels: ['Intrest', 'Principal'],
      colors: ['#20bf55', '#01baef'],
    };
  }
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  ngOnInit() {
    this.initForm();
    this.emiForm = this.fb.group({
      principal: [
        100000,
        [
          Validators.required,
          Validators.min(50000),
          Validators.maxLength(8),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      principalRange: [
        10000,
        [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],

      tenure: [
        12,
        [
          Validators.required,
          Validators.min(12),
          Validators.max(360),
          Validators.minLength(1),
          Validators.maxLength(3),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      tenureRange: [
        12,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(360),
          Validators.minLength(1),
          Validators.maxLength(3),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      rate: [
        13.0,
        [
          Validators.required,
          Validators.min(0.1),
          Validators.max(99.99),
          Validators.maxLength(5),
          Validators.pattern(/^[0-9.]+$/),
        ],
      ],
    });

    this.isLoading = false;
    // this.intrestCalculation(24, 100000, 20);
    console.error(this.year);
  }

  get form() {
    return this.emiForm.controls;
  }
  initForm() {
    this.loanAmountScale = [];
    this.tenureScale = [];
    for (let i = 0; i <= 100; i++) {
      this.loanAmountScale.push(i * 1 + 'L');
    }
    for (let i = 0; i <= 30; i++) {
      this.tenureScale.push(i + 'Y');
    }
  }
  initFormPL() {
    this.loanAmountScale = [];
    this.tenureScale = [];
    for (let i = 0; i <= 50; i++) {
      this.loanAmountScale.push(i * 1 + 'L');
    }
    for (let i = 12; i <= 60; i++) {
      this.tenureScale.push(i + 'M');
    }
  }
  intrestCalculation(duration: number, prin: number, inter: number): any {
    let tableData: any[] = [];
    const d = new Date();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let year = this.year;
    let R = inter / 12 / 100;
    let monthlyEMI =
      (prin * R * Math.pow(1 + R, duration)) / (Math.pow(1 + R, duration) - 1);
    let PA = prin;
    this.floteMonthlyEMI = monthlyEMI;
    this.monthlyEMI = Math.round(monthlyEMI);
    for (
      let i = 1;
      duration % 12 == 0 ? i <= duration / 12 : i - 1 <= duration / 12 + 1;
      i++
    ) {
      let tempObj: any = {
        year: year,
        principalPaid: 0,
        intrerstPaid: 0,
        totalPayment: 0,
        balance: 0,
        monthData: [],
      };
      for (let j = 1; j <= 12; j++) {
        if (i == 1 && j - 1 < d.getMonth() && d.getMonth() !== 0) {
          continue;
        }
        let interest = (PA * inter) / 1200;
        let tempObj2 = {
          month: monthNames[j - 1],
          // principalPaid: Math.round(monthlyEMI - interest),
          // intrerstPaid: Math.round(interest),
          // totalPayment: Math.round(monthlyEMI),
          // balance: Math.round(PA - monthlyEMI + interest),
          // month: monthNames[j - 1],
          principalPaid: monthlyEMI - interest,
          intrerstPaid: interest,
          totalPayment: monthlyEMI,
          balance: PA - monthlyEMI + interest,
          // type: typeof tempObj.principalPaid,
        };
        if (Math.round(tempObj2.balance) >= 0) tempObj.monthData.push(tempObj2);
        PA = PA - monthlyEMI + interest;
      }
      tempObj.monthData.forEach((element: { principalPaid: number }) => {
        tempObj.principalPaid += Number(element.principalPaid);
      });
      tempObj.monthData.forEach((element: { intrerstPaid: number }) => {
        tempObj.intrerstPaid += Number(element.intrerstPaid);
      });
      tempObj.monthData.forEach((element: { totalPayment: number }) => {
        tempObj.totalPayment += Number(element.totalPayment);
      });
      if (d.getMonth() !== 0) {
        tempObj.balance =
          tempObj.monthData[tempObj.monthData.length - 1].balance;
      }
      tableData.push(tempObj);

      year++;
      prin = prin - monthlyEMI * 12;
    }
    console.error(tableData);
    let totalPayable = monthlyEMI * duration;
    let chartData: any[] = [
      (
        ((totalPayable - this.emiForm.controls['principal'].value) /
          totalPayable) *
        100
      ).toFixed(2),
      ((this.emiForm.controls['principal'].value / totalPayable) * 100).toFixed(
        2
      ),
    ];
    console.error(chartData);
    this.chartOptions.series = chartData;
    // this.chartOptions.series.push(65);

    this.tableData = tableData;
    this.calculated = true;
    return tableData;
  }
  toggleLoanType(type: string) {
    this.loanType = type;
    if (type == 'Home Loan') {
      this.emiForm.controls['principal'].setValue(100000);
      this.emiForm.controls['principalRange'].setValue(100000);
      this.emiForm.controls['rate'].setValue(6.7);
      this.principal.max = 10000000;
      this.principal.min = 100000;
      this.principal.interest = 6.7;
      this.tenure.max = 360;
      this.tenure.min = 12;
      this.initForm();
    } else {
      this.emiForm.controls['principal'].setValue(50000);
      this.emiForm.controls['principalRange'].setValue(50000);
      this.emiForm.controls['rate'].setValue(13);
      this.principal.max = 5000000;
      this.principal.min = 100000;
      this.principal.interest = 6.7;
      this.tenure.max = 60;
      this.tenure.min = 12;
      this.initFormPL();
    }
  }

  scaleChange(scaleType: string, changeType: number) {
    this.calculated = false;
    if (scaleType == 'amount') {
      if (changeType == 1)
        this.emiForm.controls['principalRange'].setValue(
          this.emiForm.controls['principal'].value
        );
      else {
        this.emiForm.controls['principal'].setValue(
          this.emiForm.controls['principalRange'].value
        );
        console.log(
          this.emiForm.controls['principal'].value,
          this.emiForm.controls['principalRange'].value
        );
      }
    } else {
      if (changeType == 1)
        this.emiForm.controls['tenureRange'].setValue(
          this.emiForm.controls['tenure'].value
        );
      else
        this.emiForm.controls['tenure'].setValue(
          this.emiForm.controls['tenureRange'].value
        );
    }
  }

  calculate() {
    if (this.emiForm.invalid) {
      this.isSubmitted = true;
      this.calculated = false;
      return;
    }
    this.intrestCalculation(
      this.emiForm.controls['tenure'].value,
      this.emiForm.controls['principal'].value,
      this.emiForm.controls['rate'].value
    );
  }

  public keyPressNumbers(w: any) {
    var charCode = w.which ? w.which : w.keyCode;
    if (
      (charCode < 48 || (charCode > 57 && charCode < 96) || charCode > 105) &&
      charCode !== 8
    ) {
      w.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
