import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATOR_MESSAGES: any = {
  required: 'This field is required.',
  email: 'Email is not valid.',
};

@Component({
  selector: 'app-input-validation',
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css',
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrsWhen: boolean = true;
  errorMessages: string[] = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidations();
    });

    this.control.valueChanges.subscribe(() => {
      this.checkValidations();
    });
  }

  ngOnChanges(): void {
    this.checkValidations();
  }

  checkValidations() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATOR_MESSAGES[key]);
  }
}
