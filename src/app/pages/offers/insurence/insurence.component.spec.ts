/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InsurenceComponent } from './insurence.component';

describe('InsurenceComponent', () => {
  let component: InsurenceComponent;
  let fixture: ComponentFixture<InsurenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
