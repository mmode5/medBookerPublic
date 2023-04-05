import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public currentUser: Entity | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.currentUser = this.activatedRoute.snapshot.data['username'];
    this.authService.currentUser = this.currentUser;
  }
}
