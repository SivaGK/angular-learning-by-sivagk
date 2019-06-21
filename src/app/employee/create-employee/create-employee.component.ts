import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';

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
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner']
      })
    });
    
    // Subscribe to valueChanges observable for one controle.
    //this.employeeForm.get('fullName').valueChanges.subscribe(v => { console.log(v); })

    // Subscribe to valueChange observable for Form
    //this.employeeForm.valueChanges.subscribe(f => { console.log(JSON.stringify(f)); });

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
    this.logKeyValuePairs(this.employeeForm);
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
  }
  logKeyValuePairs(group: FormGroup): void {
  // loop through each key in the FormGroup
  Object.keys(group.controls).forEach((key: string) => {
    // Get a reference to the control using the FormGroup.get() method
    const abstractControl = group.get(key);
    // If the control is an instance of FormGroup i.e a nested FormGroup
    // then recursively call this same method (logKeyValuePairs) passing it
    // the FormGroup so we can get to the form controls in it
    if (abstractControl instanceof FormGroup) {
      this.logKeyValuePairs(abstractControl);
      // If the control is not a FormGroup then we know it's a FormControl
    } else {
      console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
    }
  });
}
}