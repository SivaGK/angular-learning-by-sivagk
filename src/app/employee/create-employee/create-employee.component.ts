import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      email: ['', [Validators.required, emailDomain('xtglobal.com')]],
      phone: [''],
      skills: this.fb.group({
        skillName: ['', [Validators.required]],
        experienceInYears: ['', [Validators.required]],
        proficiency: ['', Validators.required]
      })
    });

    // Subscribe to valueChanges observable for one controle.
    //this.employeeForm.get('fullName').valueChanges.subscribe(v => { console.log(v); })

    // Subscribe to valueChange observable for Form
    this.employeeForm.valueChanges.subscribe(f => { this.logValidationErrors(this.employeeForm) });

    // Using Forma Group/Control using new key work.
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });
  }
  onSubmit(): void {
    console.log(this.employeeForm.value);
    //Loop through all form controls in formgroup in reactive form
    //this.logValidationErrors(this.employeeForm);
  }
  onLoadDataClick(): void {
    //use setValue() to update all form controls and patchValue() to update a sub-set of form controls 
    //this.employeeForm.setValue({
    this.employeeForm.patchValue({
      fullName: 'Pragim Technologies',
      email: 'pragim@pragimtech.com',
      // skills: {
      //   skillName: 'C#',
      //   experienceInYears: 5,
      //   proficiency: 'beginner'
      // }
    });
    //this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }
  logValidationErrors(group: FormGroup = this.employeeForm): void {
    // loop through each key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);
      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (logKeyValuePairs) passing it
      // the FormGroup so we can get to the form controls in it
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        // If the control is not a FormGroup then we know it's a FormControl
      } else {
        // Clear the existing validation errors
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          // Get all the validation messages of the form control
          // that has failed the validation
          const messages = this.validationMessages[key];
          // Find which validation has failed. For example required,
          // minlength or maxlength. Store that error message in the
          // formErrors object. The UI will bind to this object to
          // display the validation errors
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
  //move validation messages to the component class
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };
  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be xtglobal.com'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'proficiency is required.',
    },
  };

  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');
    const emailFormControl = this.employeeForm.get('email');
    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
      emailFormControl.clearValidators();
    } else {
      phoneFormControl.clearValidators();
      emailFormControl.setValidators([Validators.required, emailDomain('xtglobal.com')]);
    }
    emailFormControl.updateValueAndValidity();
    phoneFormControl.updateValueAndValidity();
  }
}
//Java Script closures 
//In simple terms, you can thinks of a closure as, a function inside another function i.e an inner function and an outer function. //The inner function has access to the outer function’s variables and parameters in addition to it's own variables and parameters.
function emailDomain(domianName: string) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (email === '' || domain.toLowerCase() === domianName.toLowerCase()) {
      return null;
    } else {
      return { 'emailDomain': true };
    }
  };
}