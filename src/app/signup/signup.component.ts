import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsersModel } from '../models/users.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = new UsersModel();
  imgUrl: string = 'assets/background.png';

  registrationForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });
  get userName() {
    return this.registrationForm.get('username');
  }
  get Email() {
    return this.registrationForm.get('email');
  }
  get Mobile() {
    return this.registrationForm.get('gender');
  }
  get Password() {
    return this.registrationForm.get('password');
  }
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  signUp() {
    this.authService.signUp(this.user).then(response => {
      this.toastr.success('Signup successfully..!');
      this.router.navigate(['/login'])
    });
  }




}
