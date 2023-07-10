import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { Grafic_req } from 'src/app/models/Grafic_req';
import { Graphic } from 'src/app/models/Graphic';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Router } from '@angular/router'; 
import { GraphicService } from 'src/app/services/graphic.service';
import { Prestation } from 'src/app/models/Prestation';

@Component({
  selector: 'app-listgrafic',
  templateUrl: './listgrafic.component.html',
  styleUrls: ['./listgrafic.component.css']
})
export class ListgraficComponent implements OnInit {

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
 isgraphiclist = true;
 isgraphiclisnonactive = false;
 graficactiveok = false;
 graficactiveerr = false;

 //Error variables 0 : ok / 1,2 : not ok
 idgrafic_err = 0;
 codeIMB_err = 0;
 iar_err = 0;
 groupeOperateur_err = 0;
 dateTraitement_err = 0;
 duree_err = 0;
 statut_graphic_err = 0;
 traitement_effectue_err = 0;
 type_traitement_err = 0;
 commentaire_err = 0;
 
 //instance de collaborateur
 collab=new Collaborateur();



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
  private collaborateurService:CollaborateurService,
  private router: Router) {}
 
 //OnInit
 ngOnInit(): void {
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
     
     this.getActivegrafics();
   }

   this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
    
    deferRender: true,
    destroy:true
   
  };

 }




// ------ Done ---------------------------------------//
 //get all grafics
 getActivegrafics(): void {
  console.log("cuid sent : " + this.cuid);
  this.graphicService.getGraficsActive(this.cuid)
     .subscribe(
       data => {
         this.grafics = data;
         console.log(data);
       },
       error => {
         console.log(error);
       });
  }

  deactiveGrafic(): void {
    this.graphicService.deactiveGrafic(this.currentGraphic)
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

  //this.getActivegrafics();
  }

  okmodal(): void {
    this.graficactiveok = false;
    this.graficactiveerr = false;
  }


  setActivegrafic(grafic_req: Grafic_req, index: number): void {
    this.currentGraphic = grafic_req;
    this.currentIndex = index;
   // this.getActebyIdActe();
    //this.searchActe();
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
    this.graphicService.searchByIdGraphic(this.searchValue,this.cuid,true)
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
    this.graphicService.searchByDateTraitement(this.searchValue,this.cuid,true)
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
   this.graphicService.searchByAffectation(this.searchValue,this.cuid,true)
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

   listgrafic(): void{
    this.isgraphiclisnonactive = false;
    this.isgraphiclist = true;
  }
  
   listnonactivegrafic(): void{
    this.isgraphiclisnonactive = true;
    this.isgraphiclist = false;
  }

  updateGrafic(): void {
    if(this.validateForm()){
      this.graphicService.updateGrafic(this.currentGraphic)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
    }
  }


  //validate form
 validateForm(): boolean {
  let err;
  err = (this.validateIdGrafic() && 
         this.validateCodeImb()  && 
         this.validateIar()  && 
         this.validateGroupOperateur()  && 
         this.validateDateTraitement()  && 
         this.validateDuree() &&
         this.validatetype_traitement() &&
         this.validateStatut_graphic() &&
         this.validatetraitement_effectue());
  return err;
 }

 //validate Id grafic
 validateIdGrafic() : boolean {
  if(!(this.currentGraphic.idGrafic?.toString().length === 8) ){
    this.idgrafic_err = 1;
    return false;
  }else{
    this.idgrafic_err = 0;
    return true;
  }
 }

  //validate Code IMB
  validateCodeImb() : boolean {
    if( this.currentGraphic.code_imb?.toString().length !< 5 ){
      this.codeIMB_err = 1;
      return false;
    }else if(!(this.currentGraphic.code_imb?.startsWith('IMB/'))){
      this.codeIMB_err = 2;
      return false;
    }else{
      this.codeIMB_err = 0;
      return true;
    }
   }

  //validate IAR
  validateIar() : boolean {
    if(!(this.currentGraphic.iar?.toString().length === 10) ){
      this.iar_err = 1;
      return false;
    }else{
      this.iar_err = 0;
      return true;
    }
  }

  //validate Groupe d'operateur
  validateGroupOperateur() : boolean {
    if(this.currentGraphic.groupe_operation?.toString().length === 0) {
      this.groupeOperateur_err = 1;
      return false;
    }else{
      this.groupeOperateur_err = 0;
      return true;
    }
  }

  //validate Date de traitement
  validateDateTraitement() : boolean {
    return true;
  }

  //validate Date de traitement
  validateDuree() : boolean {
    if ((this.currentGraphic.duree == 0) || (this.currentGraphic.duree !> 60) ){
      this.duree_err = 1;
      return false;
    } else {
      this.duree_err = 0;
      return true;
    }
  }

  //validate Date de traitement
  validatetype_traitement() : boolean {

    if (this.currentGraphic.type_traitement == '') {
      this.type_traitement_err = 1;
      return false;
    } else {
      this.type_traitement_err = 0;
      return true;
    }
    
  }

  //validate Date de traitement
  validateStatut_graphic() : boolean {
    if (this.currentGraphic.statut_graphic == '') {
      this.statut_graphic_err = 1;
      return false;
    } else {
      this.statut_graphic_err = 0;
      return true;
    }
  }

  //validate Date de traitement
  validatetraitement_effectue() : boolean {
    if (this.currentGraphic.traitement_effectue == '') {
      this.traitement_effectue_err = 1;
      return false;
    } else {
      this.traitement_effectue_err = 0;
      return true;
    }
  }
// ------ end Done ---------------------------------------//


}
