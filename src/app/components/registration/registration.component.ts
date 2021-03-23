import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CommonService,
  ConfirmedValidator,
} from 'src/app/services/common.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userServ: UsersService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        repassword: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'repassword'),
      }
    );

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    // this.submitted = true;
    // let user = new User();
    // user.email = this.f.email.value;
    // user.fname = this.f.fname.value;
    // user.lname = this.f.lname.value;
    // user.password = this.f.password.value;
    // user.role = 'system';


    // this.userServ.findUserByEmail(this.f.email.value).then(async (u) => {
    //   if (!u) {
    //     await this.userServ
    //       .createUser(user)
    //       .then((res) => {
    //         this.registerForm.reset();
    //       })
    //       .then(() => {
    //         this.commonService.showMessage(
    //           'User has been added successfully ',
    //           'success'
    //         );
    //         this.router.navigateByUrl('login');
    //       })
    //       .catch((err) => {
    //         this.commonService.showMessage(
    //           `Oops!,something went wrong , ${err}`,
    //           'error'
    //         );
    //       });
    //   } else {
    //     this.commonService.showMessage(
    //       `Oops!,the email address is not available , ${this.f.email.value}`,
    //       'error'
    //     );
    //   }
    // });


  }
}
