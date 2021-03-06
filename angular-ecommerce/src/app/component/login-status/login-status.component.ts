import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean;
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthService) {}

  ngOnInit(): void {
    //Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe((state) => {
      this.isAuthenticated = state;
      this.getUserDetails();
    });

  }

  getUserDetails() {
    if (this.isAuthenticated) {
      this.oktaAuthService.getUser().then((res) => {
        this.userFullName = res.name;
      });
    }
  }

  logout(){
    this.oktaAuthService.signOut();
  }
}
