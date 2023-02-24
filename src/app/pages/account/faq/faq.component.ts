import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  faq: any[] = [];
  constructor(private cs: CommonService) {}

  ngOnInit() {
    this.getFaq();
  }

  click(i: any) {
    this.faq[i].status = !this.faq[i].status;
  }

  getFaq() {
    let data = {
      page: 1,
      countPerPage: 100,
    };
    this.cs.getFaq(data).subscribe((r: any) => {
      this.faq = this.faq.concat(r.response.faqList);
      console.error(r);
    });
  }
}
