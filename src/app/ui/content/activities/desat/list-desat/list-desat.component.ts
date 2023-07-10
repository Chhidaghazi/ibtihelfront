import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { Desat } from 'src/app/models/Desat';
import { DesatService } from 'src/app/services/desat.service';
import { Observable, Subject } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from "sweetalert2";
import { Prestation } from 'src/app/models/Prestation';
import { Motif } from 'src/app/models/Motif';
import { TypeElement } from 'src/app/models/TypeElement';
import { Location } from '@angular/common';
import { MotifService } from 'src/app/services/motif.service';
import { TypeElementService } from 'src/app/services/type-element.service';
import { Tarification } from 'src/app/models/Tarification';


@Component({
  selector: 'app-list-desat',
  templateUrl: './list-desat.component.html',
  styleUrls: ['./list-desat.component.css']
})
export class ListDesatComponent implements OnInit {


  // variables 
  isLoggedIn = false;
  private roles: string[] = [];
  isPilote = false;
  isProductor = false;
  searchby?: string;
  searchValue?: string;
  colabsteam?: Collaborateur[];
  searchValue2?: string[] = [];
  selectedFiles?: FileList;
  selectedFiles2?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  msg = '';
  fileInfos?: Observable<any>;

  desats?: Desat[];
  role = '';
  cuid = '';
  isdesatlist = true;
  //currentDesat?: Desat;
  currentIndex = -1;
  codeBanbou = '';
  codeIMB = '';
  _desats?: Desat[];
  desatNonActive?: Desat[];

  // varible error regles gestion 
  fi_err = 0;
  cog_err = 0;
  dateVerification_err = 0;
  quantite_err = 0;
  motif_err = 0;
  motif_desat_err = 0;
  duree_err = 0;
  commentaire_err = 0;
  dateLivraison_err = 0;
  ui_err = 0;

  fi_err1 = 0;
  cog_err1 = 0;

  motifs: Motif[] = [];

  typesElements: TypeElement[] = [];
  nomPrestation: String = "Désaturations Coupleurs";


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();


  submitted = false;
  isLoading = false;


  //instance collaborateur
  collaborateur=new Collaborateur();

  currentDesat: Desat = {
    idacte: '',
    refTacheBPU: '',
    type_prestation: new Prestation(),
    type_element: '',
    quantite: 1,
    dateReception: new Date(),
    dateLivraison: new Date(),
    dateValidation: new Date(),
    affectation: '',
    duree: 1,
    commentaire: '',
    motif: '',
    statutFacturation: '',
    dateReprise: '',
    repriseFacturable: '',
    motifReaffectation: '',
    fi: '',
    zone: '',
    date_refus: undefined,
    statut_operatonnels: '',
    date_reafictation: new Date(),
    cog: '',
    ui: '',
    date_liv_reafictation: undefined,
    priorite: 'P1',
    tarif: new Tarification(),

  };

  today: Date = new Date();
  now = new Date().toISOString().slice(0, 10);


  constructor(private desatService: DesatService, private router: Router,
    private tokenStorageService: TokenStorageService, private motifService: MotifService, private typeElementService: TypeElementService,
    private collaborateurService: CollaborateurService, private location: Location) {



  }
  ngOnInit(): void {


    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.cuid = user.username;
      this.getteammembersbycuid();
      if (this.roles.includes('ROLE_PILOTE')) {
        this.isPilote = true;
        this.role = 'PILOTE';
        console.log("this is Pilote")
      } else {
        this.isPilote = false;
        console.log("this is not Pilote" + this.roles)
      }
      this.getdesats();
    }

    this.currentDesat.dateLivraison = this.today;
    console.log(this.today);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,

      deferRender: true,
      destroy: true

    };
    this.getMotifs();
    this.getTypesElements();

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

  // teeeeeeeeeest

  onSubmit() {
    if (!this.currentDesat.zone) {
      alert('Le champ Nom est obligatoire');
      return;
    }

  }
  //***** 
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

  setActiveDesat(desat: Desat, index: number): void {
    this.currentDesat = desat;
    this.currentIndex = index;
  }
  //get all desats
  getdesats(): void {
    console.log("cuid sent : " + this.cuid);
    console.log("role sent : " + this.role);
    this.desatService.getAll()
      .subscribe(
        data => {
          this.desats = data;
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


  //Search
  search(): void {
    if (this.searchby == "cog") {
      this.searchByCog();
    } else if (this.searchby == "Affectation") {
      this.searchByAffecttaion();
    } else if (this.searchby == "ui") {
      this.searchByUi();
    } else if (this.searchby == "motif") {
      this.searchByMotifs();
    } else {
      this.searchByFi();
    }
  }






  searchByCog(): void {
    this.desatService.searchByCog(this.searchValue)
      .subscribe(
        data => {
          this.desats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    console.log("Search by cog: " + this.searchValue);
  }
  searchByFi(): void {
    this.desatService.searchByFi(this.searchValue)
      .subscribe(
        data => {
          this.desats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    console.log("Search by fi: " + this.searchValue);
  }
  searchByUi(): void {
    this.desatService.searchByUi(this.searchValue)
      .subscribe(
        data => {
          this.desats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    console.log("Search by ui: " + this.searchValue);
  }

  //Search by affectation
  searchByAffecttaion(): void {
    this.desatService.searchByaffectation(this.searchValue)
      .subscribe(
        data => {
          this.desats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

    console.log("recherche par affectation: " + this.searchValue);
  }

  //Search by affectation
  searchByMotif(): void {


    this.desatService.searchByMotif(this.searchValue)
      .subscribe(
        data => {
          this.desats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

    console.log("recherche par motif: " + this.searchValue);
  }

  //Search by motif order
  searchByMotifs(): void {


    this.desatService.searchByMotifs(this.searchValue)
      .subscribe(
        data => {
          this.desats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });

    console.log("recherche par motif: " + this.searchValue);
  }


  getDesat(desat: Desat): void {


    if (typeof desat.idacte === 'string') {
      this.desatService.getDesat(desat.idacte)
        .subscribe(
          data => {
            console.log(this.currentDesat);
            this.currentDesat = data;
            this.dtTrigger.next();
            console.log(data);

            var laDate = new Date();
            if (this.currentDesat.dateReception !== undefined) {
              laDate = new Date(this.currentDesat.dateReception);
            }
            if (laDate !== undefined) {
              var day = ("0" + laDate.getDate()).slice(-2);
              var month = ("0" + (laDate.getMonth() + 1)).slice(-2);
              var datereception = laDate.getFullYear() + "-" + (month) + "-" + (day);
              $("#dateReception1").val(datereception);
              $("#dateReception2").val(datereception);

            }
          },
          error => {
            console.log(error);
          });
    }

    this.desatService.mettreEnCours(desat.cog, desat)
    .subscribe(
      response => {
        console.log(response);
        this.message = response.message;
      },
      error => {
        console.log(error);
      });

  }
  getDesatNonVide(desat: Desat): void {

    this.desatService.getDesatNonVide()
      .subscribe(
        data => {
          console.log(this.currentDesat);
          this.currentDesat = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  //Importer Historique
  /*uploadHistorique(): void {
   this.progress = 0;
 
   if (this.selectedFiles) {
     const file: File | null = this.selectedFiles.item(0);
 
     if (file) {
       this.currentFile = file;
 
       this.desatService.uploadHistorique(this.currentFile).subscribe(
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
 }*/

  uploadHistorique(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.desatService.uploadHistorique(this.currentFile).subscribe(
          response => {

            document.getElementById("importerHistorique")?.click();
            this.refreshPage();
            this.getdesats();

          },
          (err: any) => {
            console.log(err);

            this.currentFile = undefined;
          });


      }

      this.selectedFiles = undefined;
    }
  }

  //Traiter Desat
  /*TraiterDesat(): void {
  
    console.log("rr");
    if (this.validateForm()) {
  
      this.desatService.traiter(this.currentDesat)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res == "ok") {
              this.submitted = true;
               this.msg = res.msg ? res.msg : 'Cet acte est ajouté avec succès!';
              Swal.fire('Cet acte est ajouté avec succès.');
            } else {
              this.submitted = false;
              Swal.fire('Cet acte de traitement existe déja.');
            }
  
          },
          error: (e) => console.error(e)
        });
  
    }
  
  
  }*/

  //Update Desat
  TraiterDesat(): void {

    if (this.validateFormUpdate()) {
      this.desatService.traiter(this.currentDesat.idacte, this.currentDesat)
        .subscribe(
          response => {
            console.log(response);
            Swal.fire('Cet acte est traiter avec succés');
          },
          error => {
            console.log(error);
          });


         

    }

  }


  annulerEncours(): void {

    this.desatService.annulerEnCours(this.currentDesat.cog, this.currentDesat)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message;
        },
        error => {
          console.log(error);
        });


  }
  //Update Desat
  updateDesat(): void {

    if (this.validateFormUpdate()) {
      this.desatService.Update(this.currentDesat.idacte, this.currentDesat)
        .subscribe(
          response => {
            console.log(response);
            /*this.message = response.message ? response.message : 'Cet acte est mofdifier avec succés';*/
            Swal.fire('Cet acte est modifier avec succés');
          },
          error => {
            console.log(error);
          });

    }

  }




  upload(): void {
    this.progress = 0;

    if (this.selectedFiles2) {
      const file: File | null = this.selectedFiles2.item(0);

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
          }); 2
      }

      this.selectedFiles2 = undefined;
    }
  }


  selectFile2(event: any): void {
    this.selectedFiles2 = event.target.files;
  }
  // validate form update
  validateFormUpdate(): boolean {
    let err;
    err = (
      this.validateDuree() &&
      this.validateMotif_Desat() &&
      this.validateQuantite()

    );
    return err;
  }

  //validate form
  validateForm(): boolean {
    let err;
    err = (
      this.validateDuree() &&
      this.validateMotif_Desat() &&
      this.validateQuantite() &&
      this.validateUI()
    );
    return err;
  }
  //validate Duree
  validateDuree(): boolean {
    if ((this.currentDesat.duree == 0) || (this.currentDesat.duree! > 60)) {
      this.duree_err = 1;
      return false;
    } else {
      this.duree_err = 0;
      return true;
    }
  }

  //validate Motif_Desat
  validateMotif_Desat(): boolean {
    if (this.currentDesat.motif == '') {
      this.motif_desat_err = 1;
      return false;
    } else {
      this.motif_desat_err = 0;
      return true;
    }
  }

  //validate UI
  validateUI(): boolean {
    if (this.currentDesat.ui == '') {
      this.ui_err = 1;
      return false;
    } else {
      this.ui_err = 0;
      return true;
    }
  }

  //validate Quantite
  validateQuantite(): boolean {
    if ((this.currentDesat.quantite == 0)) {
      this.quantite_err = 1;
      return false;
    } else {
      this.quantite_err = 0;
      return true;
    }
  }

  onChange(e: any) {

    if (e.target.value == "En attente") {

      $("#dateLivraison1").val("");
      $("#dateLivraison2").val("");
      $("#daterefus").val("");
      $("#daterefus1").val("");
      if (this.currentDesat !== undefined) {
        this.currentDesat.dateLivraison = null;
        this.currentDesat.date_refus = null;
        this.currentDesat.statutFacturation = "enCoursCds";
      }

    } else {

      var now = new Date();

      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);

      var today = now.getFullYear() + "-" + (month) + "-" + (day);

      $("#dateLivraison1").val(today);
      $("#dateLivraison2").val(today);
      $("#daterefus").val(today);
      $("#daterefus1").val(today);


      if (this.currentDesat !== undefined) {
        this.currentDesat.statutFacturation = "facturable";
        this.currentDesat.dateLivraison = new Date();
        this.currentDesat.date_refus = new Date();
      }

    }

  }

  

  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }





}
