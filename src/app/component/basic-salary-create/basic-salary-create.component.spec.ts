import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSalaryCreateComponent } from './basic-salary-create.component';

describe('BasicSalaryCreateComponent', () => {
  let component: BasicSalaryCreateComponent;
  let fixture: ComponentFixture<BasicSalaryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicSalaryCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSalaryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
