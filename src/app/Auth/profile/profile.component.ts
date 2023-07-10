import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  currentCollaborateur: any;
  cuid: any;

  constructor(private token: TokenStorageService, private authService: AuthService, private collaborateur: CollaborateurService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

  }
}
