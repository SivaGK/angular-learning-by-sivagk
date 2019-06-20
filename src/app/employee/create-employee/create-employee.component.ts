import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });
  }
  onSubmit(): void {
    console.log(this.employeeForm.value);
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
}