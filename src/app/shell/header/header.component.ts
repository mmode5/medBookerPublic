import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() currentUser: Entity | undefined;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {}
}
