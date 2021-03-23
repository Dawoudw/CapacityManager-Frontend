import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userServ: UsersService,
    private commonSrv: CommonService
  ) {}
  ngAfterViewInit(): void {
    this.reset();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    // this.submitted = true;
    // if (this.loginForm.valid) {
    //   await this.userServ
    //     .userLogin(this.loginForm.value.email, this.loginForm.value.password)
    //     .then((user) => {
    //       console.log('onSubmit userLogin', user);
    //       if (user) {
    //         // user ?? localStorage.setItem('current_user', JSON.stringify(user));
    //         this.userServ.redirectToHome();
    //       } else {
    //         this.commonSrv.showMessage('Wrong UserName Or Password ..', 'warn');
    //       }
    //     })
    //     .catch((err) => {
    //       this.commonSrv.showMessage(err.message, 'error');
    //     });
    // }


    this.reset();
  }
  reset() {
    this.loginForm.reset();
  }
}
