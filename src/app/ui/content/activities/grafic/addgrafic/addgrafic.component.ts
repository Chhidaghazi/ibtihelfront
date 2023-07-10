import { Component, OnInit } from '@angular/core';
import { Esimb } from 'src/app/models/esimb.model';
import { ActeTraitement } from 'src/app/models/ActeTraitement'; 
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { Graphic } from 'src/app/models/Graphic';
import { GraphicService } from 'src/app/services/graphic.service';
import { Grafic_req } from 'src/app/models/Grafic_req';
import { Api_Response } from 'src/app/models/Api_Response';
import { Prestation } from 'src/app/models/Prestation';
import { Tarification } from 'src/app/models/Tarification';

@Component({
  selector: 'app-addgrafic',
  templateUrl: './addgrafic.component.html',
  styleUrls: ['./addgrafic.component.css']
})
export class AddgraficComponent implements OnInit {
//Variables
 private roles: string[] = [];
 isPilote = false;
 isLoading= false;
 colabsteam?: Collaborateur[];

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

 submittedok = false;
 submittederr = false;

 //response api instance
 api_Response: Api_Response={
  code_response:'',
  message_response:''
 }
//instance de collaborateur
collab=new Collaborateur();



//Instance de graphic response
currentGraphic: Graphic = {
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
  refTacheBPU: '',
  type_prestation: new Prestation(),
  type_element: '',
  quantite: 1,
  dateReception: undefined,
  dateLivraison: undefined,
  dateValidation: undefined,
  motif: '',
  statutFacturation: '',
  dateReprise: undefined,
  repriseFacturable: '',
  dateDeadline:null, 
        priorite:"P1",
    tarif: new Tarification(),

}



  //Constructor
  constructor(private tokenStorageService: TokenStorageService,private collaborateurservice:CollaborateurService,private graphicService:GraphicService  ) { }

  //ON Init Function
  ngOnInit(): void {

    this.isLoading = true;
      //get user
      const user = this.tokenStorageService.getUser();
  
      //check the roles if PILOT
      this.roles = user.roles;
      if (this.roles.includes('ROLE_PILOTE')){
        this.getteammembersbycuid();
        this.isPilote = true;
        console.log("this is Pilote")
      }else{
        this.isPilote = false;
        console.log("this is not Pilote" + this.roles)
      }
  
      //get user Informations
      this.currentGraphic.affectation = user.username;
      this.collaborateurservice.getcolabinfosbycuid(user.username)
      .subscribe(data => { 
                  this.collab = data;
                    console.log(data);
                 },          
       error => {
         console.log(error);
                    
                 });

    this.isLoading = false;
    }

//save grafic
  savegraphic(): void {
    this.isLoading = true;
    if (this.validateForm()){
        this.graphicService.save(this.currentGraphic)
          .subscribe(data => {
            //this.api_Response = data;
            console.log("date is : " +data);
            if (data == "0") {
              this.submittedok = true;
            } else {
              this.submittederr = true;
            }
            //console.log("this.api_Response is : " + this.api_Response );
            //console.log("this.api_Response.code_response is : " +this.api_Response.code_response);

            /*if (this.api_Response.code_response == "ok") {
              this.submittedok = true;
            } else {
              this.submittederr = true;
            }*/
      
          },
          error => {
            console.log(error);
          });
    }
    this.isLoading = false;
  }

 //New Insert Grafic
 newInsertGrafic(): void {
  this.submittedok = false;
  this.submittederr = false;
  this.currentGraphic = {
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
    refTacheBPU: '',
    type_prestation: new Prestation(),
    type_element: '',
    quantite: 1,
    dateReception: undefined,
    dateLivraison: undefined,
    dateValidation: undefined,
    motif: '',
    statutFacturation: '',
    dateReprise: undefined,
    repriseFacturable: '',
    dateDeadline:null, 
        priorite:"P1",
    tarif: new Tarification()

  }
 }
  //get team members
 getteammembersbycuid(): void {
  const user = this.tokenStorageService.getUser();
  this.collaborateurservice.getteammembersbycuid(user.username)
  .subscribe(
    data => {
      this.colabsteam = data;
      console.log(data);

    },
    error => {
      console.log(error);
    });
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
}
