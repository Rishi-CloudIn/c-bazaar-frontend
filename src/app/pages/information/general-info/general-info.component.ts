import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css'],
})
export class GeneralInfoComponent implements OnInit {
  categoryList: any[] = [];
  typeList: any[] = [];
  contents: any[] = [];
  selectedCat: any = null;
  selectedType: any = null;
  totalCount: number = 0;
  page: number = 1;
  isLoading: boolean = true;
  selectedCategory: any = null;

  constructor(private cs: CommonService) {}

  ngOnInit() {
    this.getContents();
  }

  getContents() {
    let data = {
      type: this.selectedType,
      category: this.selectedCategory,
      page: this.page,
    };
    this.cs.getContents(data).subscribe((r: any) => {
      this.categoryList = r.response.categoryList;
      if (
        this.selectedCategory === null &&
        r.response.categoryList.length !== 0
      ) {
        this.selectedCategory = r.response.categoryList[0].slug;
      } else this.selectedCategory = this.selectedCategory;
      this.typeList = r.response.typeList;
      this.contents = r.response.contents;
      this.totalCount = r.response.totalCount;
      this.isLoading = false;
      console.log(r);
    });
  }

  switchCat() {
    // this.selectedCat = this.selectedCategory;
    let data = {
      type: this.selectedType,
      category: this.selectedCategory,
      page: this.page,
    };
    this.cs.getContents(data).subscribe((r: any) => {
      this.contents = r.response.contents;
      this.totalCount = r.response.totalCount;
      this.isLoading = false;
      console.log(r);
    });
  }

  switchType(type: string) {
    this.selectedType = type;
    this.selectedCategory = null;
    this.getContents();
  }
}
