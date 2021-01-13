import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidService } from '../validation.service';

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public validService: ValidService) {}

  ngOnInit() {
    this.authStatusSub = this.validService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onLogin(form: NgForm) {
    console.log(form.value);
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    this.validService.loginUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
