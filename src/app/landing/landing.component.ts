import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ScrollService } from '../services/scroll.service';
declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  faq: any[] = [];

  constructor(private cs: CommonService, private scroll: ScrollService) {}

  ngOnInit() {
    this.getFaq();
  }
  click(i: any) {
    this.faq[i].status = !this.faq[i].status;
  }
  hamToggle() {
    $('header nav').toggleClass('open');
    $('.nav-ul').toggleClass('new-ul');
  }

  getFaq() {
    let data = {
      page: 1,
      countPerPage: 100,
    };
    this.cs.getFaq(data).subscribe((r: any) => {
      // this.faq = this.faq.concat(r.response.faqList);
      this.faq = r.response.faqList;
    });
  }

  scrollToId(id: string) {
    console.log('element id : ', id);
    this.scroll.scrollToElementById(id);
  }

  scrollToElement(element: HTMLElement) {
    this.scroll.scrollToElement(element);
  }
}
