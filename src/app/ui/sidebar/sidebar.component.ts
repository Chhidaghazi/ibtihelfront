import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 //Vriables
 private roles: string[] = [];
  isLoggedIn = false;
  
  username?: string;

  isPilote=false;
  isAdmin=false;
  isProducteur=false;

  collaborateur=new Collaborateur();

  
  constructor(private tokenStorageService: TokenStorageService,
    private collaborateurService: CollaborateurService, private router: Router) { }


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
    }

    this.getinfoscollaborateur();
   


    
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


  

   


}
 

