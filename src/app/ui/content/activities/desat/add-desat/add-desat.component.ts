import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Desat } from 'src/app/models/Desat';
import { DesatService } from 'src/app/services/desat.service';
import Swal from "sweetalert2";
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Prestation } from 'src/app/models/Prestation';
import { TypeElement } from 'src/app/models/TypeElement';
import { Motif } from 'src/app/models/Motif';
import { TypeElementService } from 'src/app/services/type-element.service';
import { MotifService } from 'src/app/services/motif.service';
import { Tarification } from 'src/app/models/Tarification';
import { PrestationService } from 'src/app/services/prestation.service';



@Component({
  selector: 'app-add-desat',
  templateUrl: './add-desat.component.html',
  styleUrls: ['./add-desat.component.css']
 
})
export class AddDesatComponent implements OnInit {


  
 //Variables
 private roles: string[] = [];
 isPilote = false;
 isLoading= false;
 colabsteam?: Collaborateur[];
 motifs: Motif[] = [];
 typesElements: TypeElement[]=[];
nomPrestation: String="Désaturations Coupleurs";
 selectedFiles?: FileList;
 currentFile?: File;
 progress = 0;
 message = '';
fileInfos?: Observable<any>;

  cuid ='';

 //Error variables 0 : ok / 1,2 : not ok
 fi_err = 0;
 cog_err = 0;
 dateVerification_err = 0;
 quantite_err = 0;
 motif_err = 0;
 motif_desat_err = 0;
 duree_err = 0;
 commentaire_err = 0;
 dateLivraison_err = 0;
 commentairetechnique_err = 0;
 commentairedemandeur_err = 0;


 submitted = false;
 

//instance collaborateur 
collaborateur=new Collaborateur();


currentDesat : Desat = {
  idacte: '',
  refTacheBPU: '',
  type_prestation: new Prestation(),
  type_element: 'Coupleurs',
  quantite: 1,
  dateReception: new Date (),
  dateLivraison: new Date(),
  dateValidation: new Date (),
  affectation: '',
  duree: 1,
  commentaire: null,
  motif: 'En attente',
  statutFacturation: '',
  dateReprise: '',
  repriseFacturable: '',
  fi: '',
  zone: null,
  date_refus: new Date (),
  motifReaffectation:'',
  statut_operatonnels: '',
  date_reafictation: null,
  cog: '',
  ui: '',
  date_liv_reafictation: new Date (),
  priorite: 'P1',
  tarif: new Tarification(),

};


  today: Date = new Date();
  now = new Date().toISOString().slice(0,10);

 //instance de collaborateur
 collab=new Collaborateur();



  constructor(private desatService: DesatService, private collaborateurService: CollaborateurService,
  private tokenStorageService: TokenStorageService, private motifService: MotifService,
  private typeElementService: TypeElementService,
  private prestService: PrestationService ) { 
  
  }
 

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
      this.currentDesat.affectation = user.username;
      this.collaborateurService.getcolabinfosbycuid(user.username)
      .subscribe(data => { 
                  this.collab = data;
                    console.log(data);
                    
                 },          
       error => {
         console.log(error);
                    
                 });

     this.isLoading = false;
   

    this.currentDesat.dateLivraison = this.today; 
    
    this.getMotifs();
    this.getTypesElements();
    this.getPrestation();

  }

//get Prest
  getPrestation(): void {
    this.prestService.getPrestationByNom(this.nomPrestation)
      .subscribe(
        data => {
          this.currentDesat.type_prestation = data;
        },
        error => {
          console.log(error);
        }
      );
  }

// get type elements

getTypesElements(): void {

  console.log("cuid sent : " + this.cuid);
  this.typeElementService.getTypesElements(this.nomPrestation)
    .subscribe(
      data => {
        this.typesElements = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}

// get mtif 
 
getMotifs(): void {
    
  console.log("cuid sent : " + this.cuid);
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





 //save desat
  saveDesat(): void {
    console.log(this.currentDesat);
    this.isLoading = true;
    if (this.validateForm()){
        this.desatService.save(this.currentDesat)
          .subscribe({
            next: (res) => {
              console.log(res);
              if (res == "ok"){
                this.submitted = true;
                  this.message = res.message ? res.message : 'Cet acte est ajouté avec succès!';
                  Swal.fire('Cet acte est ajouté avec succès.');
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

  newDesat(): void {
    this.submitted = false;
    this.currentDesat = {
    idacte:'',
    refTacheBPU:'',
    type_prestation: new Prestation(),
    type_element:'',
    quantite:1,
    dateReception:new Date (),
    dateLivraison:new Date (),
    dateValidation:new Date (),
    affectation: '',
    duree: 1,
    commentaire: '',
	  motif: '',
    statutFacturation: '',
    dateReprise: '',
    repriseFacturable: '',
    fi: '',
    zone:'',
    date_refus:new Date (),
    motifReaffectation:'',
    statut_operatonnels:'',
    date_reafictation:new Date (),
    cog:'',
    ui:'',
    date_liv_reafictation:new Date (),
    priorite: 'P1',
    dateDeadline:null,
    tarif: new Tarification(),

    };
  }

 //validate form
 validateForm(): boolean {
  let err;
  err = (
        
         this.validateCog()&&
         this.validateDuree()&&
         this.validateFI()&&
         this.validateMotif_Desat()
       ); 
  return err;
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

 //validate Duree
  validateDuree() : boolean {
    if ((this.currentDesat.duree == 0) || (this.currentDesat.duree !> 60) ){
      this.duree_err = 1;
      return false;
    } else {
      this.duree_err = 0;
      return true;
    }
  }

  //validate Quantite
  validateQuantite() : boolean {
    if ((this.currentDesat.quantite == 0)  ){
      this.quantite_err = 1;
      return false;
    } else {
      this.quantite_err= 0;
      return true;
    }
  }

  //validate Motif_Desat
   validateMotif_Desat() : boolean {
    if (this.currentDesat.motif == '') {
      this.motif_desat_err = 1;
      return false;
    }else{
      this.motif_desat_err = 0;
      return true;
    }
  }


  //validate FI
  validateFI() : boolean {
    if (this.currentDesat.fi == '') {
      this.fi_err = 1;
      return false;
    }else{
      this.fi_err = 0;
      return true;
    }
  }

  // validate cog
  validateCog() : boolean {
    if (this.currentDesat.cog == '') {
      this.cog_err = 1;
      return false;
    }else{
      this.cog_err = 0;
      return true;
    }
  }


   onlyNumberKey(event: any) {
     const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
          event.preventDefault();}
    }


    selectFile(event: any): void {

       this.selectedFiles = event.target.files;
      
     }

    
upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.desatService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }



   onChange(e: any) {

    if (e.target.value == "En attente") {

      $("#dateLivraison").val("");
      this.currentDesat.dateLivraison = null;

      this.currentDesat.statutFacturation = "enCoursCds";

    } else {
      var now = new Date();

      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);

      var today = now.getFullYear() + "-" + (month) + "-" + (day);


      $("#dateLivraison").val(today);
      this.currentDesat.statutFacturation = "facturable";
      this.currentDesat.dateLivraison = new Date();

    }

  }

}

