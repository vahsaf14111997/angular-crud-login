import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { max } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm !: FormGroup;
  user_id: any;
  editdata: any;
  action='';
  constructor(private service: UserService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router : Router) {
    this.user_id = this.route.snapshot.paramMap.get('id');
    if(this.user_id != null){
      this.action = 'Update';
    }
    else{
      this.action = 'Register'
    }
    if (this.user_id != null) {
      this.editUserdata(this.user_id);
    }
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  postUserdata() {
    if (this.registrationForm.valid) {
      this.service.postUser(this.registrationForm.value)
        .subscribe(res => {
          alert("Successfully added");
          this.registrationForm.reset();
          this.router.navigate(['login'])
        })
    }
    else {
      alert("Please fill all the fields");
    }
  }
  editUserdata(id: any) {
    this.service.getCurrentUser(this.user_id)
      .subscribe(res => {
        this.editdata = res;
        this.registrationForm = this.formBuilder.group({
          name: [this.editdata.name],
          mobile: [this.editdata.mobile],
          email: [this.editdata.email],
          password: [this.editdata.password]
        })
      })
  }
  updateData() {
    this.service.updateUser(this.user_id, this.registrationForm.value)
      .subscribe(res => {
        alert("Successfully updated");
        this.router.navigate(['/dashboard']);
      })
  }
}
