import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherHeadsComponent } from './other-heads.component';

describe('OtherHeadsComponent', () => {
  let component: OtherHeadsComponent;
  let fixture: ComponentFixture<OtherHeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherHeadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherHeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
