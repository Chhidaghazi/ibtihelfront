import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Equipe } from 'src/app/models/Equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  wrong = false; //check if wrong password or username
  form: any = {
    username: null,
    nom: null,
    prenom: null,
    idEquipe: 2,
    email: null,
    telephone: null,
    password: null
  };

  password2 = null;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  submitted = false;

  isMdpErr = false;
  isCuidExiste = false;
  isEmailExiste = false;

  equipes: Equipe[] = [];



  constructor(private authService: AuthService,
    private equipeService: EquipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllEquipes();
  }

  getAllEquipes(): void {

    this.equipeService.getAllEquipe()
      .subscribe(
        data => {
          this.equipes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  register(): void {
    if (this.form.password !== this.password2) {
      
      this.isMdpErr = true;
    } else {
      this.authService.register(this.form)
        .subscribe(
          response => {
           
            Swal.fire({
              icon: 'success',
              title: 'Votre inscription a été bien enregistré!',
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['']);
              }
            })
            
           
          

          },
          error => {
            if (error.error.message == 'cuidUtilise') {
            
              this.isCuidExiste = true;
            } else if (error.error.message == 'emailUtilise') {
             
              this.isEmailExiste = true;
            } 

            console.log(error.error.message);
          });
    }
  }




}
