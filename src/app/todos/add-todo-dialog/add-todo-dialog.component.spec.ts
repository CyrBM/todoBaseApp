import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoDialogComponent } from './add-todo-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormControlDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AddTodoDialogComponent', () => {
  let component: AddTodoDialogComponent;
  let fixture: ComponentFixture<AddTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      declarations: [AddTodoDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(
      fixture.debugElement.query(By.css('h1')).nativeElement.innerText
    ).toEqual('Add new TODO');
  });

  describe('Test global of fields and button', () => {
    it('should have correct label for forms fields', () => {
      const formField1 = fixture.debugElement.query(By.css('mat-form-field'));
      const formField2 = fixture.debugElement.query(
        By.css('mat-form-field:nth-of-type(2)')
      );
      expect(
        formField1.query(By.css('mat-label')).nativeElement.innerText
      ).toEqual('Title');

      expect(
        formField2.query(By.css('mat-label')).nativeElement.innerText
      ).toEqual('Description');
    });

    it('should have submit btn disabled and correctly described', () => {
      const btnSubmitDisabled = fixture.debugElement.query(
        By.css('button:nth-of-type(2)')
      );
      expect(btnSubmitDisabled).toBeTruthy();
      expect(btnSubmitDisabled.nativeElement.disabled).toBeTrue();
      expect(btnSubmitDisabled.nativeElement.innerText).toEqual('Ok');
    });
    it('should have cancel btn and correctly described', () => {
      const btnCancel = fixture.debugElement.query(By.css('button'));
      expect(btnCancel).toBeTruthy();
      expect(btnCancel.nativeElement.innerText).toEqual('Cancel');
    });
  });
});
