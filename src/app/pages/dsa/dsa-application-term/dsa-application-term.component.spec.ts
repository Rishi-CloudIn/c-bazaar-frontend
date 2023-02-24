/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DsaApplicationTermComponent } from './dsa-application-term.component';

describe('DsaApplicationTermComponent', () => {
  let component: DsaApplicationTermComponent;
  let fixture: ComponentFixture<DsaApplicationTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaApplicationTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsaApplicationTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
