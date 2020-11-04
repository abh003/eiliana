import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumeLeftComponent } from './colume-left.component';

describe('ColumeLeftComponent', () => {
  let component: ColumeLeftComponent;
  let fixture: ComponentFixture<ColumeLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumeLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumeLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
