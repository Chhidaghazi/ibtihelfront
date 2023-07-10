import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';


import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { NropmService } from 'src/app/services/nropm.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { Nropm } from 'src/app/models/Nropm';
import { PmService } from 'src/app/services/pm.service';
import { Pm } from 'src/app/models/Pm';
import { MotifService } from 'src/app/services/motif.service';
import { TypeElementService } from 'src/app/services/type-element.service';

import { Prestation } from 'src/app/models/Prestation';
import { Motif } from 'src/app/models/Motif';
import { TypeElement } from 'src/app/models/TypeElement';

import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Tarification } from 'src/app/models/Tarification';
declare var $: any;





@Component({
  selector: 'app-nropm-historique',
  templateUrl: './nropm-historique.component.html',
  styleUrls: ['./nropm-historique.component.css']
})
export class NropmHistoriqueComponent implements OnInit {


  isLoggedIn = false;
  private roles: string[] = [];
  isPilote = false;
  role = '';
  cuid = '';
  colabsteam?: Collaborateur[];
  nropms?: Nropm[];
  pms: Pm[] = [];


  motifs: Motif[] = [];

  typesElements: TypeElement[]=[];
  
  nomPrestation: String="Lien NRO-PM";


  current_nropm: Nropm = {

    refTacheBPU: "",
    type_prestation: new Prestation,
    type_element: "FIBRE",
    quantite: 1,
    dateReception: new Date(),
    dateLivraison: new Date(),
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
    priorite: "",
    tarif: new Tarification,

  }

  numberOfPms = 1;


  searchby?= 'uiNropm';
  searchValue?: string;

  searchValue2?: string[] = [];


  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;


  selectedFiles2?: FileList;
  currentFile2?: File;
  progress2 = 0;
  message2 = '';

  fileInfos2?: Observable<any>;



  now = new Date().toISOString().slice(0, 10);

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();



  

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService,
    private nropmService: NropmService,
    private pmService: PmService,
    private motifService: MotifService,
    private typeElementService: TypeElementService,
    private collaborateurService: CollaborateurService,
    private location: Location,
    private router: Router) { }

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

      this.getAllNropms();
    }


    this.reserverPms2();

    this.getMotifs();
    this.getTypesElements();

    

   /* $(document).ready(function () {
     ($('#table')as any).DataTable();
  
  });*/

  /*this.dtOptions = {
   
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
    
    deferRender: true,
    destroy:true
   
  };*/

  
  this.dtOptions = {
    destroy: true,
    responsive: true,
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: false,
    ordering: false,
};


  


  }


  getAllNropms(): void {

    console.log("cuid sent : " + this.cuid);
    this.nropmService.getAllNropm()
      .subscribe(
        data => {
          this.nropms = data;
          this.dtTrigger.next(); 
          console.log(data);        
        },
        error => {
          console.log(error);
        });
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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


  getPms(nropm: Nropm): void {


    if (typeof nropm.cog === 'string') {
      this.pmService.getPms(nropm.cog)
        .subscribe(
          data => {
            console.log(this.pms);
            this.pms = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }

  }

  getNropm(nropm: Nropm): void {


    if (typeof nropm.cog === 'string') {
      this.nropmService.getNropm(nropm.cog)
        .subscribe(
          data => {
            console.log(this.current_nropm);
            this.current_nropm = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }

    this.current_nropm.dateLivraison = null;



    var laDate = new Date();
    if (this.current_nropm.dateReception !== undefined) {
      laDate = new Date(this.current_nropm.dateReception);
    }



    if (laDate !== undefined) {


      var day = ("0" + laDate.getDate()).slice(-2);
      var month = ("0" + (laDate.getMonth() + 1)).slice(-2);

      var datereception = laDate.getFullYear() + "-" + (month) + "-" + (day);



      $("#dateReception").val(datereception);
    }

  }

  //Search
  search(): void {
    if (this.searchby == "uiNropm") {
      this.searchByUiNropm();
    } else if (this.searchby == "cogNropm") {
      this.searchByCogNropm();
    } else if (this.searchby == "Affectation") {
      this.searchByAffecttaion();
    } else if (this.searchby == "motif") {
      this.searchByMotif();
    }
  }



  searchByUiNropm(): void {


    if (typeof this.searchValue === 'string') {
      this.nropmService.getNropmByUi(this.searchValue)
        .subscribe(
          data => {
            $('#example').DataTable().destroy();
            this.nropms = data;
            this.dtTrigger.next(); 
            console.log(data);
          },
          error => {
            console.log(error);
          });
      console.log("Search by ui: " + this.searchValue);
    }


  }


  searchByCogNropm(): void {


    if (typeof this.searchValue === 'string') {
      this.nropmService.getNropmByCog(this.searchValue)
        .subscribe(
          data => {
            $('#example').DataTable().destroy();
            this.nropms = data;
            this.dtTrigger.next(); 
            console.log(data);
          },
          error => {
            console.log(error);
          });
      console.log("Search bycog: " + this.searchValue);
    }


  }




  searchByAffecttaion(): void {

    if (typeof this.searchValue === 'string') {
      this.nropmService.getNropmByAffectation(this.searchValue)
        .subscribe(
          data => {
            $('#example').DataTable().destroy();
            this.nropms = data;
            this.dtTrigger.next(); 
            console.log(data);
          },
          error => {
            console.log(error);
          });
      console.log("Search by affectation: " + this.searchValue);
    }



  }

  searchByMotif(): void {


    if (this.searchValue2 !== undefined) {
      this.nropmService.getNropmByMotif(this.searchValue2)
        .subscribe(
          data => {
            $('#example').DataTable().destroy();
           
            this.nropms = data;
            this.dtTrigger.next(); 
            console.log(data);
          },
          error => {
            console.log(error);
          });
      console.log("Search by motif: " + this.searchValue);
    }


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

        this.nropmService.uploadHistorique(this.currentFile).subscribe(
          res => { 
            document.getElementById("importerHistorique")?.click();
            $('#example').DataTable().destroy();
             this.getAllNropms();
           },
          (err: any) => {
            console.log(err);
            
            this.currentFile = undefined;
          });

         
      }

      this.selectedFiles = undefined;
    }


   /* this.nropmService.getNropmstraites()
      .subscribe(
        data => {
          this.nropms = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });*/

      
  }


  onChange(e: any) {

    if (e.target.value == "enAttente") {

      $("#dateLivraison").val("");
      $("#dateLivraison2").val("");
      if (this.current_nropm !== undefined) {
        this.current_nropm.dateLivraison = null;

        this.current_nropm.statutFacturation = "enCoursCds";
      }

    } else {

      var now = new Date();

      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);

      var today = now.getFullYear() + "-" + (month) + "-" + (day);

      $("#dateLivraison").val(today);
      $("#dateLivraison2").val(today);


      if (this.current_nropm !== undefined) {
        this.current_nropm.statutFacturation = "facturable";
        this.current_nropm.dateLivraison = new Date();
      }

    }

  }


  updateNropm(): void {

    if (this.current_nropm !== undefined) {
      this.nropmService.updateNropm(this.current_nropm.cog, this.current_nropm)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message;
            document.getElementById("modifierNropm")?.click();
            $('#example').DataTable().destroy();
            this.getAllNropms();
                 
          },
          error => {
            console.log(error);
          });

    }


  }

  counter(i: number) {
    return new Array(i);
  }

  reserverPms2() {
    for (let i = 0; i < 100; i++) {

      var pm: Pm = {
        refPm: "",
        idActPm: "",
      };

      this.current_nropm.pms.push(pm);
    }

  }

  getNropm2(nropm: Nropm): void {


    if (typeof nropm.cog === 'string') {
      this.nropmService.getNropm(nropm.cog)
        .subscribe(
          data => {
            console.log(this.current_nropm);
            this.current_nropm = data;
            this.reserverPms2();

            this.current_nropm.motif = "enAttente";
            this.current_nropm.duree = 1;
            this.current_nropm.quantite = 1;
            this.current_nropm.dateLivraison = null;
            this.current_nropm.statutFacturation="enCoursCds";


            var laDate = new Date();
            if (this.current_nropm.dateReception !== undefined) {
              laDate = new Date(this.current_nropm.dateReception);
            }



            if (laDate !== undefined) {


              var day = ("0" + laDate.getDate()).slice(-2);
              var month = ("0" + (laDate.getMonth() + 1)).slice(-2);

              var datereception = laDate.getFullYear() + "-" + (month) + "-" + (day);



              $("#dateReception2").val(datereception);
            }




            console.log(data);
          },
          error => {
            console.log(error);
          });


      this.nropmService.mettreEnCours(nropm.cog, nropm)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message;
          },
          error => {
            console.log(error);
          });


    }


  }

  annulerEncours(): void {

    this.nropmService.annulerEnCours(this.current_nropm.cog, this.current_nropm)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });


  }



  updateNropm2(): void {

    this.current_nropm.dateValidation = this.current_nropm.dateLivraison;


    var pm2: Pm[] = [];

    for (var i = 0; i < this.current_nropm.quantite; i++) {

      var pm = this.current_nropm.pms[i];
      pm2.push(pm);

    }

    this.current_nropm.pms = pm2;
    console.log(this.current_nropm.pms.length + "nombre final pms");
    console.log(this.current_nropm.pms);
    for (var pm of this.current_nropm.pms) {
      var idActPm = this.current_nropm.cog + '_' + pm.refPm;
      pm.idActPm = idActPm;

    }
    this.current_nropm.affectation= this.tokenStorageService.getUser().username;

    console.log("hhhhh",this.current_nropm);
    

    if (this.current_nropm !== undefined) {
      this.nropmService.traiterNropm(this.current_nropm.cog, this.current_nropm)
        .subscribe(
          response => {
            console.log(response);
            this.message = response.message;
            document.getElementById("TraiterNropm")?.click();
            $('#example').DataTable().destroy();
            this.getAllNropms();     
          },
          error => {
            console.log(error);
          });

    }

   

  }



  uploadSpi(): void {
    this.progress2 = 0;

    if (this.selectedFiles2) {
      const file: File | null = this.selectedFiles2.item(0);

      if (file) {
        this.currentFile2 = file;

        this.nropmService.upload(this.currentFile2).subscribe(
         
          (successData) => { 
            document.getElementById("importerFichierSpi")?.click();
            $('#example').DataTable().destroy();
            this.getAllNropms();
           },
          (err: any) => {
            console.log(err);
           
            if (err.error && err.error.message2) {
              this.message2 = err.error.message2;
            } else {
              this.message2 = 'Could not upload the file!';
            }

            this.currentFile2 = undefined;
          });
      }

      this.selectedFiles2 = undefined;
    }
  }


  selectFile2(event: any): void {
    this.selectedFiles2 = event.target.files;
  }


  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }

}

