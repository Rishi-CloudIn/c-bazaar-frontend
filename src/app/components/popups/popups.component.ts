import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.css'],
})
export class PopupsComponent implements OnInit {
  @Input('info')
  info: string = 'No Data Found';

  constructor() {}

  ngOnInit() {}
}
