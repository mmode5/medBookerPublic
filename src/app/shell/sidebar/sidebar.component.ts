import { Component, Input, OnInit } from '@angular/core';
import { Entity, Role } from 'src/app/models/entity.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() currentUser: Entity | undefined;

  roles = Role;

  ngOnInit() {}
}
