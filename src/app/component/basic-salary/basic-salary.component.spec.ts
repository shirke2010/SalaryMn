import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSalaryComponent } from './basic-salary.component';

describe('BasicSalaryComponent', () => {
  let component: BasicSalaryComponent;
  let fixture: ComponentFixture<BasicSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
