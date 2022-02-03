import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, Location } from '@angular/common'
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  fg: FormGroup;
  submitted = false;

  bsValue = new Date();
  minDate = new Date();

  dateConfig: Partial<BsDatepickerConfig> = {
    isAnimated: true,
    adaptivePosition: true,
    rangeInputFormat: 'D/M/YY',
    containerClass: 'theme-default',
    showWeekNumbers: false,
  };

  dropdownList = [
    { item_id: 1, item_text: 'January' },
    { item_id: 2, item_text: 'February' },
    { item_id: 3, item_text: 'March' },
    { item_id: 4, item_text: 'April' },
    { item_id: 5, item_text: 'May' },
    { item_id: 6, item_text: 'June' },
    { item_id: 7, item_text: 'July' },
    { item_id: 8, item_text: 'August' },
    { item_id: 9, item_text: 'September' },
    { item_id: 10, item_text: 'October' },
    { item_id: 11, item_text: 'November' },
    { item_id: 12, item_text: 'December' }
  ];

  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'item_text',
    textField: 'item_text',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    limitSelection: 1 
  };

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private currencyPipe: CurrencyPipe
  ) { 
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.initForm()
  }

  ngOnInit(): void {
  }

  validatorErrorMessage() {
    return ReactiveFormConfig.set({
      validationMessage: {
        required: 'This field is required',
        alpha: 'Only alphabet are allowed',
        alphaNumeric: 'Only alphanumeric are allowed',
        numeric: 'Only numeric are allowed',
        url: 'Only URL are allowed (www.example.com)',
        email: 'Please input correct email format (ex: someone@example.com)',
        phonenumber: 'Please input correct phone number format (ex: 08123456789)',
        minLength: 'Minimum 9 character',
        maxLength: 'Maximum 13 character',
        digit: 'Only digit are allowed',
        minNumber: 'Minimum number value is ',
        maxNumber: 'Maximum number value is ',
      },
    });
  }

  initForm() {
    this.validatorErrorMessage();
    this.fg = this.fb.group({
      username: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      firstName: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      lastName: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      email: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required(),RxwebValidators.email()],
        }),
      ],
      birthDate: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      basicSalary: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      status: [
        "",
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      group: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
      description: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
    });

    this.fg.valueChanges.subscribe(form => {
      if(form.basicSalary){
        this.fg.patchValue({
          basicSalary: this.currencyPipe.transform(form.basicSalary.replace(/\D/g, ''), 'Rp. ', 'symbol', '3.0')
        }, {emitEvent: false})
      }
    })
  }

  submitForm(){
    this.submitted = true;
    if (this.fg.invalid) {
      this.toastr.error('Error', 'Please Fill All Field', {
        timeOut: 3000,
      });
      return;
    } else {
      this.toastr.success('success', 'success', {
        timeOut: 3000,
      });
      this.location.back()
    }
  }

  back(): void {
    this.location.back()
  }

}
