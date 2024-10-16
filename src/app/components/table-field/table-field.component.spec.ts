import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFieldComponent } from './table-field.component';

describe('TableFieldComponent', () => {
  let component: TableFieldComponent;
  let fixture: ComponentFixture<TableFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
