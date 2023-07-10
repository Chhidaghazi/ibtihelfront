import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, Input, OnChanges } from "@angular/core";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NropmService } from 'src/app/services/nropm.service';
import { Router } from '@angular/router';

import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

import { Collaborateur } from 'src/app/models/Collaborateur';

import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import Swal from "sweetalert2";

declare var $: any;



@Component({
  selector: 'app-gestion-comptes',
  templateUrl: './gestion-comptes.component.html',
  styleUrls: ['./gestion-comptes.component.css']
})
export class GestionComptesComponent implements OnInit {


  private roles: string[] = [];

  rolesColab: string[]=[];

  isLoggedIn = false;
  
  username?: string;

  isPilote=false;
  isAdmin=false;
  isProducteur=false;

  collaborateur=new Collaborateur();

  current_collaborateur=new Collaborateur();

  colabs?: Collaborateur[];


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  
  
  constructor(private tokenStorageService: TokenStorageService,
    private collaborateurService: CollaborateurService, private location: Location, private router: Router) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

  
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;


      this.isAdmin = this.roles.includes('ROLE_ADMIN');
     
      this.isPilote = this.roles.includes('ROLE_PILOTE');

      this.isProducteur=  this.roles.includes('ROLE_PRODUCTEUR')
    


      console.log("user.username :"+user.username);
      this.username = user.username;

      this.getinfoscollaborateur();
      this.getAllColabs();
  
    }



   
    this.dtOptions = {
      destroy: true,
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: false,
  };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getinfoscollaborateur(): void {
    const user = this.tokenStorageService.getUser();
    this.collaborateurService.getcolabinfosbycuid(user.username)
      .subscribe(data => {
        this.collaborateur = data;
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }


  getAllColabs(): void {

    this.collaborateurService.getAllCollaborateurs()
      .subscribe(
        data => {
          this.colabs = data;
          this.dtTrigger.next(); 
          console.log(data);        
        },
        error => {
          console.log(error);
        });
  }


  activerCompte(collab: Collaborateur): void {

    Swal.fire({
      title: 'Voulez-vous activer ce compte?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Swal.fire('Le compte est activé!', '', 'success');

        this.collaborateurService.activerCompte(collab.cuid, collab)
       .subscribe(
        response => {
          console.log(response);
          $('#example').DataTable().destroy();
          this.getAllColabs();
       
          
        },
        error => {
          console.log(error);
        });

        

        
      } else if (result.isDenied) {
        Swal.fire("Le compte n'est pas activé!", '', 'info')
      }
    })

    


  }


  desactiverCompte(collab: Collaborateur): void {

    
    Swal.fire({
      title: 'Voulez-vous désactiver ce compte?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Swal.fire('Le compte est désactivé!', '', 'success');

        this.collaborateurService.desactiverCompte(collab.cuid, collab)
       .subscribe(
        response => {
          console.log(response);
          $('#example').DataTable().destroy();
          this.getAllColabs();
         
          
        },
        error => {
          console.log(error);
        });

       

        
      } else if (result.isDenied) {
        Swal.fire("Le compte n'est pas désaactivé!", '', 'info')
      }
    })

    

  }

  

 

}
