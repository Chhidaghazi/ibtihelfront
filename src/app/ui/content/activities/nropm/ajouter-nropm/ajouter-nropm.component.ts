import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, Input, OnChanges } from "@angular/core";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NropmService } from 'src/app/services/nropm.service';
import { Router } from '@angular/router';
import * as $ from "jquery";

import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

import { Collaborateur } from 'src/app/models/Collaborateur';
import { Nropm } from 'src/app/models/Nropm';
import { PmService } from 'src/app/services/pm.service';
import { Pm } from 'src/app/models/Pm';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Pipe } from '@angular/core';
import { Prestation } from 'src/app/models/Prestation';
import { Motif } from 'src/app/models/Motif';
import { TypeElement } from 'src/app/models/TypeElement';
import { MotifService } from 'src/app/services/motif.service';
import { TypeElementService } from 'src/app/services/type-element.service';
import { Tarification } from 'src/app/models/Tarification';


@Component({
  selector: 'app-ajouter-nropm',
  templateUrl: './ajouter-nropm.component.html',
  styleUrls: ['./ajouter-nropm.component.css']
})
export class AjouterNropmComponent implements OnInit {

  isLoggedIn = false;
  private roles: string[] = [];
  isPilote = false;
  role = '';
  cuid = '';

  colabsteam?: Collaborateur[];

  pms: Pm[] = [];

  motifs: Motif[] = [];

  typesElements: TypeElement[]=[];

  nomPrestation: String="Lien NRO-PM";


  currentNropm: Nropm = {

    refTacheBPU: "",
    type_prestation: new Prestation,
    type_element: "FIBRE",
    quantite: 1,
    dateReception: new Date(),
    dateLivraison: null,
    dateValidation: new Date(),
    affectation: this.tokenStorageService.getUser().username,
    duree: 1,
    commentaire: null,
    motif: "enAttente",
    statutFacturation: "enCoursCds",
    dateReprise: "",
    repriseFacturable: "",
    uniteIntervention: null,
    cog: null,
    dateReafectation: new Date(),
    dateLivraisonReaffectation: new Date(),
    motifReaffectation: "",
    statutTravaux: false,
    pms: this.pms,
    dateDeadline: null,
    priorite: "P1",
    tarif: new Tarification,

  }

  indexPm = 0;

  currentPm: Pm = {};

  submitted = false;


  divMessages = "";


  numberOfPms = 1;



  now = new Date().toISOString().slice(0, 10);


  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private tokenStorageService: TokenStorageService,
    private nropmService: NropmService,
    private collaborateurService: CollaborateurService,
    private motifService: MotifService,
    private typeElementService: TypeElementService,
    private router: Router,
    private cdRef: ChangeDetectorRef,) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.roles = user.roles;
      this.cuid = user.username;

      if (this.roles.includes('ROLE_PILOTE')) {
        this.getteammembersbycuid();
        this.isPilote = true;
        this.role = 'PILOTE';
        console.log("this is Pilote")
      } else {
        this.isPilote = false;
        console.log("this is not Pilote" + this.roles)
      }

      // let testdateReceptionInput : any = document.getElementById("dateReception") as HTMLInputElement | null
      // testdateReceptionInput.value = this.now;   

    }

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#dateReception').val(today);
    this.reserverPms2();

    //this.initialiserPms();


    /* var pm: Pm={
       refPm: "",
       idActPm:"",
     };
     this.currentNropm.pms[this.indexPm]=pm;*/

    // var appendElement = '<div class="form-row"> <div class="form-group col-md-6"> <label >FI</label> <input type="text" id="refPm" class="form-control"  required [(ngModel)]="currentNropm.pms[indexPm].refPm" name="refPm"> </div><div class="form-group col-md-6"></div></div>';

    //$("#pms").append(appendElement);


    this.getMotifs();
    this.getTypesElements();

  }

  
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



  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.nropmService.upload(this.currentFile).subscribe(
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






  genererIdAct(e: any) {
    var cog = $("#cog").val();
    $("#idActPm").val(cog + "_" + e.target.value);

  }

  genererIdAct2(e: any) {
    var fi = $("#refPm").val();
    $("#idActPm").val(e.target.value + "_" + fi);
  }


  onChange(e: any) {

    if (e.target.value == "enAttente") {

      $("#dateLivraison").val("");
      this.currentNropm.dateLivraison = null;

      this.currentNropm.statutFacturation = "enCoursCds";

    } else {
      var now = new Date();

      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);

      var today = now.getFullYear() + "-" + (month) + "-" + (day);


      $("#dateLivraison").val(today);
      this.currentNropm.statutFacturation = "facturable";
      this.currentNropm.dateLivraison = new Date();

    }

  }



  ajouterPm(): void {

    this.indexPm = this.indexPm + 1;

    var pm: Pm = {
      refPm: "",
      idActPm: "",
    };
    this.currentNropm.pms[this.indexPm] = pm;

    var appendElement = '<div class="form-row"> <div class="form-group col-md-6"> <label >FI</label> <input type="text" id="refPm" class="form-control"  required [(ngModel)]="currentNropm.pms[indexPm].refPm" name="refPm"> </div><div class="form-group col-md-6"></div></div>';

    $("#pms").append(appendElement);

  }

  saveNropm(): void {

    /* for (var pm of this.currentNropm.pms) {
       var idActPm= this.currentNropm.cog+'_'+pm.refPm;
       pm.idActPm=idActPm;
      
     }*/


    /*for(var i= 0; i < this.currentNropm.pms.length; i++)
    {
      if(this.currentNropm.pms[i].refPm == ""){
        delete this.currentNropm.pms[i];
       }
    } */






    /* for(var i= this.numberOfPms; i < 100; i++)
    {
      
        delete this.currentNropm.pms[i];
        console.log(i);
      
    } */

    var pm2: Pm[] = [];

    for (var i = 0; i < this.currentNropm.quantite; i++) {

      var pm = this.currentNropm.pms[i];
      pm2.push(pm);

    }

    this.currentNropm.pms = pm2;
    console.log(this.currentNropm.pms.length + "nombre final pms");

    for (var pm of this.currentNropm.pms) {
      var idActPm = this.currentNropm.cog + '_' + pm.refPm;
      pm.idActPm = idActPm;

    }


    /*  for (var pm of this.currentNropm.pms) {
        console.log(typeof pm.refPm);
        console.log(typeof pm.idActPm);
      }*/



    //console.log(this.currentNropm.pms[0].refPm);
    /*const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    }; */

    //console.log(this.currentNropm);
    this.nropmService.create(this.currentNropm)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['traiterNropm']);
          console.log('ajouté');

        },
        error => {
          console.log(error);
        });

  }


  counter(i: number) {
    return new Array(i);
  }

  onClick(e: any) {
    var tmp = e.target.value;

    this.cdRef.detectChanges();
    this.numberOfPms = tmp;
    this.cdRef.detectChanges();
  }





  reserverPm(): void {
    var pm: Pm = {
      refPm: "",
      idActPm: "",
    };

    this.currentNropm.pms.push(pm);
  }

  reserverPms2() {
    for (let i = 0; i < 100; i++) {

      var pm: Pm = {
        refPm: "",
        idActPm: "",
      };

      this.currentNropm.pms.push(pm);
    }

  }


}

