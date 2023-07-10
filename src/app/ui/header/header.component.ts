import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //Vraiables
  private roles: string[] = [];
  isLoggedIn = false;

  username?: string;

  isPilote = false;
  isAdmin = false;
 
  
  collaborateur=new Collaborateur();



  constructor(private sidebarComponent: SidebarComponent, private tokenStorageService: TokenStorageService, private collaborateurService: CollaborateurService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
     
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
