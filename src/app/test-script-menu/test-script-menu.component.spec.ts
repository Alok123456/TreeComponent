import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScriptMenuComponent } from './test-script-menu.component';

describe('TestScriptMenuComponent', () => {
  let component: TestScriptMenuComponent;
  let fixture: ComponentFixture<TestScriptMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestScriptMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestScriptMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
