import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ValidService } from '../auth/validation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
private authListenerSubs: Subscription;

  constructor(private validService: ValidService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.validService.getIsAuth();
    this.authListenerSubs = this.validService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

  }

  onLogout() {
    this.validService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
