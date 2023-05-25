import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsersModel } from '../models/users.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj = new UsersModel();

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  get Email() {
    return this.loginForm.get('email');
  }
  get Password() {
    return this.loginForm.get('password');
  }
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  loginMethod() {
    console.log(this.loginObj.email, this.loginObj.password);
    this.authService.validate(this.loginObj.email, this.loginObj.password).subscribe({
      next: this.handleSucess.bind(this),
      error: this.handleError.bind(this)
    });
  }
  handleSucess(response: any) {
    let Users = response.map((data: any) => {
      return {
        id: data.payload.doc.id,
        ...data.payload.doc.data() as UsersModel
      }
    });
    if (Users && Users.length > 0) {

      let userDetails = Users.shift();
      localStorage.setItem('displayUsername', userDetails!.username);
      localStorage.setItem('loggedUserId', userDetails!.id);
      localStorage.setItem('isAdmin', userDetails!.isAdmin ? 'true' : 'false');

      this.toastr.success('Login successfully..!!');
      this.router.navigate(['/home']);
    }
    else {
      this.toastr.error('In-valid credentials..!!');
    }
  }

  handleError(response: any) {
    this.toastr.error('In-valid credentials..!!');
  }

}
