import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { Grafic_req } from 'src/app/models/Grafic_req';
import { Graphic } from 'src/app/models/Graphic';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { GraphicService } from 'src/app/services/graphic.service';
import { Prestation } from 'src/app/models/Prestation';
import { Tarification } from 'src/app/models/Tarification';

@Component({
  selector: 'app-listgraficnonactive',
  templateUrl: './listgraficnonactive.component.html',
  styleUrls: ['./listgraficnonactive.component.css']
})
export class ListgraficnonactiveComponent implements OnInit {
 //Variables
 isLoggedIn = false;
 private roles: string[] = [];
 isPilote = false;
 searchby?='IdGraphic';
 searchValue?: string;
 graphics?: Graphic[];
 actes?: ActeTraitement[];
 colabsteam?: Collaborateur[];
 currentIndex = -1;
 idacte= '';
 codeIMB = '';
 grafics? : Grafic_req[];
 graficsNonActive? : Grafic_req[];
 role = '';
 cuid = '';
 isgraphiclist = false;
 isgraphiclisnonactive = true;
 graficactiveok = false;
 graficactiveerr = false;
 


//Instance de ActeTraitement
 _actetraitement: ActeTraitement= {
  idacte:'',
  refTacheBPU:'',
  type_prestation:new Prestation(),
  type_element:'',
  quantite:1,
 dateReception:undefined,
 dateLivraison:undefined,
 dateValidation:undefined,
 affectation: '',
 duree: 0,
 commentaire: '',
 motif: '',
 statutFacturation: '',
 dateReprise: undefined,
 repriseFacturable: '',
 dateDeadline:null, 
        priorite:"P1",
    tarif: new Tarification(),

};

//Instance de graphic 
_graphic: Graphic = {
  idGrafic: '',
  iar: '',
  code_imb: '',
  groupe_operation: '',
  dateTraitement: new Date(),
  statut_graphic: '',
  traitement_effectue: '',
  type_traitement: '',
  dateDeadline:null, 
      priorite:"P1",
  type_prestation: new Prestation(),
  quantite: 1,
  duree:1,
  tarif: new Tarification(),

}

//Instance de graphic response
currentGraphic: Grafic_req = {
  idGrafic: '',
  iar: '',
  code_imb: '',
  groupe_operation: '',
  dateTraitement: undefined,
  statut_graphic: '',
  traitement_effectue: '',
  type_traitement: '',
  idacte: '',
  affectation: '',
  duree: 1,
  commentaire: '',
}

dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

 //Constructor
 constructor(private tokenStorageService: TokenStorageService,
  private graphicService: GraphicService,
  private collaborateurService:CollaborateurService) {}
 
 //OnInit
 ngOnInit(): void {
   //this.retrieveGraphics();
   this.isLoggedIn = !!this.tokenStorageService.getToken();
   if (this.isLoggedIn) {
     const user = this.tokenStorageService.getUser();
     this.roles = user.roles;
     this.cuid = user.username;

     if (this.roles.includes('ROLE_PILOTE')){
      this.getteammembersbycuid();
       this.isPilote = true;
       this.role = 'PILOTE';
       console.log("this is Piloteeeeeeeeeeeeeeeeeeeee")
     }else{
       this.isPilote = false;
       console.log("this is not Piloteeeee" + this.roles)
     }
     
     this.getgrafics();
   }

   this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
    
    deferRender: true,
    destroy:true
   
  };

 }

// ------------- Done -------------- //
 //get all grafics
 getgrafics(): void {
  console.log("cuid sent : " + this.cuid);
  console.log("role sent : " + this.role);
  this.graphicService.getGraficsNonActive(this.cuid)
     .subscribe(
       data => {
         this.grafics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
}


//Search
search(): void {
  if (this.searchby == "IdGraphic"){
    this.searchByIdGraphic();
  }else if(this.searchby == "Affectation"){
   this.searchByAffecttaion();
  }else{
   this.searchByDateTraitement();
  }
 }
 
 
 //Search by date Traitement
  searchByIdGraphic(): void {
    this.graphicService.searchByIdGraphic(this.searchValue,this.cuid,false)
      .subscribe(
        data => {
          this.grafics = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        console.log("Search by graphic id: " + this.searchValue);
  }
  
 
  //Search by date Traitement
  searchByDateTraitement(): void {
    this.graphicService.searchByDateTraitement(this.searchValue,this.cuid,false)
      .subscribe(
        data => {
          this.grafics = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
 
        console.log("Search by date de traitement: " + this.searchValue);
  }
 
 //Search by Affectaion
 searchByAffecttaion(): void {
   this.graphicService.searchByAffectation(this.searchValue,this.cuid,false)
     .subscribe(
       data => {
         this.grafics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
       console.log("Search by affectation: " + this.searchValue);
 }

 
 setActivegrafic(grafic_req: Grafic_req, index: number): void {
  this.currentGraphic = grafic_req;
  this.currentIndex = index;
 // this.getActebyIdActe();
  //this.searchActe();
}
//Active grafic
activeGrafic(): void {
  this.graphicService.activeGrafic(this.currentGraphic)
                .subscribe(
                  data => {
                    console.log(data);
                      this.graficactiveok = true;
                    },
                    error => {
                      console.log(error);
                      this.graficactiveerr = true;
                  }
                )


}
 
okmodal(): void {
  this.graficactiveok = false;
  this.graficactiveerr = false;
  window.location.reload();
}

 

 //get team members
 getteammembersbycuid(): void {
  const user = this.tokenStorageService.getUser();
  this.collaborateurService.getteammembersbycuid(user.username)
  .subscribe(
    data => {
      this.colabsteam = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
 }

 //Update Graphic
 UpdateGraphic(): void {
 
  
 }

 listgrafic(): void{
  this.isgraphiclisnonactive = false;
  this.isgraphiclist = true;
}

}
