import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherHeadsCreateComponent } from './other-heads-create.component';

describe('OtherHeadsCreateComponent', () => {
  let component: OtherHeadsCreateComponent;
  let fixture: ComponentFixture<OtherHeadsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherHeadsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherHeadsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
