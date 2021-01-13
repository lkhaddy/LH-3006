import { Component, OnInit } from '@angular/core';
import { ValidService } from './auth/validation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: ValidService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
