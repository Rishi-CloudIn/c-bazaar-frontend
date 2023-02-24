/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DsaSignComponent } from './dsa-sign.component';

describe('DsaSignComponent', () => {
  let component: DsaSignComponent;
  let fixture: ComponentFixture<DsaSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsaSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsaSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
