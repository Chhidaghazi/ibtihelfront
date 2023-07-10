import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables
  wrong = false; //check if wrong password or username
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  isDesactivate = false;
  errorMessage = '';
  roles: string[] = [];
  isPilote = false;
  isAdmin = false;
  isProducteur = false;

  collaborateur=new Collaborateur();

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private collaborateurService: CollaborateurService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  change(): void {
    this.wrong = true;
  }
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {

        console.log(data);
       

        if (data.active) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);



          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;

          this.isAdmin = this.roles.includes('ROLE_ADMIN');

          this.isPilote = this.roles.includes('ROLE_PILOTE');

          this.isProducteur = this.roles.includes('ROLE_PRODUCTEUR');

          //this.router.navigate(['/home']);


          if (this.isPilote) {

            this.router.navigate(['/backlog'])
              .then(() => {
                window.location.reload();
              });

          } else if (this.isAdmin) {
            this.router.navigate(['/timesheet'])
              .then(() => {
                window.location.reload();
              });

          } else {
            this.router.navigate(['/backlog']).then(() => {
              window.location.reload();
            });

          }
        } else {
          this.isDesactivate=true;
        }

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );

  }


  getinfoscollaborateur(data:any): void {
    
    this.collaborateurService.getcolabinfosbycuid(data.username)
      .subscribe(data => {
        this.collaborateur = data;
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }

  





}