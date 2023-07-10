
import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Observable } from 'rxjs';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isPilote = false;
  isLoggedIn = false;
 
  username?: string;
 
  ispilote = false;
  isAdmin=false;
  
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
      

    //  this.router.navigate(['/home']);


      this.getinfoscollaborateur();
      console.log("user.username :" + user.username);
      console.log("this.colab :" + this.collaborateur.nom);
      this.username = user.username;
    }

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
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
