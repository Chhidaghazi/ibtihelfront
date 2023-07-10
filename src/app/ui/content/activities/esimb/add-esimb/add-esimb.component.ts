import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { Api_Response } from 'src/app/models/Api_Response';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { Esimb } from 'src/app/models/esimb.model';
import { Graphic } from 'src/app/models/Graphic';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { EsimbService } from 'src/app/services/esimb.service';
import { GraphicService } from 'src/app/services/graphic.service';
import Swal from "sweetalert2";
import { Prestation } from 'src/app/models/Prestation';
import { Motif } from 'src/app/models/Motif';
import { MotifService } from 'src/app/services/motif.service';
import { Tarification } from 'src/app/models/Tarification';
import { PrestationService } from 'src/app/services/prestation.service';


@Component({
  selector: 'app-add-esimb',
  templateUrl: './add-esimb.component.html',
  styleUrls: ['./add-esimb.component.css'],
  template: `
  <p>Date d'aujourd'hui : {{ today | date:'MM/DD/yyyy' }}</p>
`
})
export class AddEsimbComponent implements OnInit {

  
 //Variables
 private roles: string[] = [];
 isPilote = false;
 isLoading= false;
 colabsteam?: Collaborateur[];

  //Error variables 0 : ok / 1,2 : not ok
 codeBanbou_err = 0;
 codeIMB_err = 0;
 dateReception_err = 0;
 quantite_err = 0;
 motif_err = 0;
 duree_err = 0;
 commentaire_err = 0;
 dateLivraison_err = 0;
 commentairetechnique_err = 0;
 commentairedemandeur_err = 0;
 

 submitted = false;
 message='';

 motifs: Motif[] = [];
 nomPrestation: String="Evolution statut IMB";



   //instance collaborateur 
   collaborateur=new Collaborateur();

  currentEsimb: Esimb = {
    idacte: '',
    codeBanbou:'',
    affectation: '',
    commentaire: '',
    dateLivraison: new Date(),
    dateReception: new Date(),
    dateReprise: undefined,
    dateValidation: undefined,
    duree: 1,
    quantite: 1,
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: 'Forfait',
    type_prestation: new Prestation(),
    codeIMB: '',
    dateVerification: undefined,
    commentairetechnique: '',
    commentairedemandeur:'',
    dateDeadline:null, 
        priorite:"P1",
    motif: "En attente",
    tarif: new Tarification(),
  };

  today: Date = new Date();
  now = new Date().toISOString().slice(0,10);
  now2= new Date().toISOString().slice(0,10);


   //instance de collaborateur
   collab=new Collaborateur();

  

  constructor(private esimbService: EsimbService, private collaborateurService: CollaborateurService,
  private tokenStorageService: TokenStorageService,
  private motifService: MotifService,
  private prestService: PrestationService ) { }

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
      this.currentEsimb.affectation = user.username;
      this.collaborateurService.getcolabinfosbycuid(user.username)
      .subscribe(data => { 
                  this.collab = data;
                    console.log(data);
                    
                 },          
       error => {
         console.log(error);
                    
                 });

    this.isLoading = false;
    this.currentEsimb.dateLivraison=this.today;
    this.currentEsimb.dateVerification=this.today;

    
    this.getMotifs();
    this.getPrestation();

    }


    //get Prest
  getPrestation(): void {
    this.prestService.getPrestationByNom(this.nomPrestation)
      .subscribe(
        data => {
          this.currentEsimb.type_prestation = data;
        },
        error => {
          console.log(error);
        }
      );
  }

    getMotifs(): void {
    
      //console.log("cuid sent : " + this.cuid);
      this.motifService.getMotifs(this.nomPrestation)
        .subscribe(
          data => {
            this.motifs = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }

  //Save Esimb
  saveEsimb(): void {
    console.log("rr");
    this.isLoading = true;

    if (this.validateForm()) {

        if (this.currentEsimb.motif === 'En attente') {
            this.currentEsimb.dateLivraison = undefined; // Si le motif est "en attente", la dateLivraison est vide
        } else {
            this.currentEsimb.dateLivraison = this.today; // Si non, la dateLivraison est la date du jour
        }

        if (this.currentEsimb.motif === 'En attente') {
          this.currentEsimb.statutFacturation = "en cours CDS"; // Si le motif est "en attente", la dateLivraison est vide
      } else {
          this.currentEsimb.statutFacturation= "facturable"; // Si non, la dateLivraison est la date du jour
      }

        this.esimbService.save(this.currentEsimb)
          .subscribe({
            next: (res) => {
              console.log(res);
              if (res == "ok"){
                this.submitted = true;
                  this.message = res.message ? res.message : 'This acte was added successfully!';
                  Swal.fire('This acte was added successfully! .');
              }else{
                this.submitted = false;
                Swal.fire('Cet acte de traitement existe déja.');
              }
            },
            error: (e) => console.error(e)
          });
    }
    this.isLoading = false;
}

  newEsimb(): void {
    this.submitted = false;
    const today = new Date(); // Obtenir la date du jour
    this.currentEsimb = {
      idacte: '',
      affectation: '',
      commentaire: '',
      dateLivraison: new Date(), // Date de livraison est la date du jour
      dateReception: new Date(),
      dateReprise: undefined,
      dateValidation: undefined,
      duree: 1,
      quantite: 1,
      refTacheBPU: '',
      repriseFacturable: '',
      statutFacturation: '',
      type_element: 'Forfait',
      type_prestation: new Prestation(),
      codeBanbou:'',
      codeIMB: '',
      dateVerification: today, // Date de vérification est la date du jour
      commentairetechnique: '',
      commentairedemandeur:'',
      dateDeadline:null, 
        priorite:"P1",
    motif: "En attente",
    tarif: new Tarification(),

    };
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



    //validate form
 validateForm(): boolean {
  let err;
  err = (
         this.validateCodeImb()  && 
         //this.validateDateReception()&&
         //this.validateMotif()&&
         this.validateDuree()); 
  return err;
 }


  //validate Code IMB
  validateCodeImb() : boolean {
    let pattern = /^IMB\/[a-z A-Z 0-9][a-z A-Z 0-9][a-z A-Z 0-9][a-z A-Z 0-9][a-z A-Z 0-9]\/[X|S|A|C]\/[a-z A-Z 0-9][a-z A-Z 0-9][a-z A-Z 0-9][a-z A-Z 0-9]$/;
      if((this.currentEsimb.motif == 'Inexistence IMB Banbou')){
          this.codeIMB_err = 0;
          return true;  }
        if((this.currentEsimb.motif == 'En attente') && (this.currentEsimb.codeIMB=='')){
            this.codeIMB_err = 0;
            return true;  
      } else  
      if(!(pattern.test(String(this.currentEsimb.codeIMB)))){ 
             this.codeIMB_err = 2;
                 return false;
             }else{       this.codeIMB_err = 0;
                  return true;
              }
   }

  //validate Date reception
  /*validateDateReception() : boolean {
    if(!(this.currentEsimb.dateReception?.toString().length === 10) ){
      this.dateReception_err = 1;
      return false;
    }else{
      this.dateReception_err = 0;
      return true;
    }
  }*/

   //validate Motif
  /*validateMotif(): boolean {
    if (!this.currentEsimb.motif || this.currentEsimb.motif === ""){
      this.motif_err = 1;
      return false;
    } else {
      this.motif_err = 0;
      return true;
    }
  }*/
  

  //validate Duree
  validateDuree() : boolean {
    if ((this.currentEsimb.duree == 0) || (this.currentEsimb.duree !> 60) ){
      this.duree_err = 1;
      return false;
    } else {
      this.duree_err = 0;
      return true;
    }
  }


  onlyNumberKey(event: any) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
          event.preventDefault();}
    }

    

    onChange(e: any) {
      if (e.target.value == "En attente") {
        $("#dateLivraison").val("");
        $("#dateLivraison3").val("");
        this.currentEsimb.dateLivraison = null;
        this.currentEsimb.statutFacturation = "en cours CDS";
  
      } else {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
  
  
        $("#dateLivraison").val(today);
        $("#dateLivraison3").val(today);
        this.currentEsimb.statutFacturation = "facturable";
        this.currentEsimb.dateLivraison = new Date();
      }
  
    }

    onChangee(e: any) {
      if (e.target.value == "En attente") {
        $("#dateLivraison2").val("");
        this.currentEsimb.dateLivraison = null;
        this.currentEsimb.statutFacturation = "en cours CDS";
  
      } else {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
  
  
        $("#dateLivraison2").val(today);
        this.currentEsimb.statutFacturation = "facturable";
        this.currentEsimb.dateLivraison = new Date();
      }
    }

    


}

