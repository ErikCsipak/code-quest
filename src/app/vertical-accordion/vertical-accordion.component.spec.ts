import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalAccordionComponent } from './vertical-accordion.component';

describe('VerticalAccordionComponent', () => {
  let component: VerticalAccordionComponent;
  let fixture: ComponentFixture<VerticalAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
