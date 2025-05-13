import { Component,HostListener  } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  @HostListener('window:beforeunload', ['$event'])
  handleWindowClose(event: Event) {
    this.authService.logout();
  }
}