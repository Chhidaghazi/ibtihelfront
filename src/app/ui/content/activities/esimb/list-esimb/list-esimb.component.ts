import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { Esimb } from 'src/app/models/esimb.model';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { EsimbService } from 'src/app/services/esimb.service';
import { Esimb_req } from 'src/app/models/Esimb_req';
import { nextTick } from 'q';
import { Prestation } from 'src/app/models/Prestation';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MotifService } from 'src/app/services/motif.service';
import { TypeElementService } from 'src/app/services/type-element.service';
import { Motif } from 'src/app/models/Motif';
import { TypeElement } from 'src/app/models/TypeElement';
import { Location } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { Tarification } from 'src/app/models/Tarification';



@Component({
  selector: 'app-list-esimb',
  templateUrl: './list-esimb.component.html',
  styleUrls: ['./list-esimb.component.css']
})
export class ListEsimbComponent implements OnInit {
  //variables


  isLoggedIn = false;
  private roles: string[] = [];
  isPilote = false;
  isProductor = false;
  searchby?: string;
  searchValue?: string;
  searchValue2?: string[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  colabsteam?: Collaborateur[];
  esimbs?: Esimb[];
  role = '';
  cuid = '';
  isesimblist = true;
  //currentEsimb?: Esimb;
  currentIndex = -1;
  codeBanbou = '';
  codeIMB = '';
  _esimbs?: Esimb_req[];
  esimbsNonActive?: Esimb_req[];

  message = '';


  motifs: Motif[] = [];
  typesElements: TypeElement[] = [];
  nomPrestation: String = "Evolution statut IMB";

  //instance collaborateur
  collaborateur=new Collaborateur();



  //Instance de esimb response
  _esimb: Esimb_req = {
    codeBanbou: '',
    codeIMB: '',
    dateVerification: undefined,
    idacte: '',
    affectation: '',
    duree: 1,
    quantite: 1,
    dateLivraison: undefined,
    commentaire: '',
    motif: ''
  }
  //instance of Esimb
  currentEsimb: Esimb = {
    codeBanbou: '',
    codeIMB: '',
    dateVerification: new Date(),
    affectation: '',
    commentaire: '',
    dateLivraison: new Date(),
    dateReception: new Date(),
    dateReprise: undefined,
    dateValidation: undefined,
    duree: 1,
    quantite: 1,
    motif: '',
    refTacheBPU: '',
    repriseFacturable: '',
    statutFacturation: '',
    type_element: '',
    type_prestation: new Prestation(),
    dateDeadline: null,
    priorite: "P1",
    tarif: new Tarification(),

  };

  today: Date = new Date();
  now = new Date().toISOString().slice(0, 10);
  now2 = new Date().toISOString().slice(0, 10);


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  //Constructeur
  constructor(private esimbService: EsimbService, private router: Router,
    private tokenStorageService: TokenStorageService,
    private collaborateurService: CollaborateurService,
    private motifService: MotifService,
    private typeElementService: TypeElementService,
    private location: Location, ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.cuid = user.username;
      this.getteammembersbycuid();
      if (this.roles.includes('ROLE_PILOTE')) {
        this.retrieveEsimbs();
        this.isPilote = true;
        this.role = 'PILOTE';
        console.log("this is Pilote")
      } else {
        this.isPilote = false;
        this.getEsimbs();
        console.log("this is not Pilote" + this.roles)
      }
    }

    this.currentEsimb.dateVerification = this.today;
    this.currentEsimb.dateValidation = this.today;


    this.getMotifs();

    this.dtOptions = {
      destroy: true,
    responsive: true,
    pagingType: 'full_numbers',
    pageLength: 10,
    searching: true,
    ordering: false,

    };
  }
  //get all esimbs 
  retrieveEsimbs(): void {
    this.esimbService.getAll()
      .subscribe(
      data => {
        this.esimbs = data.sort(this.compare);
        setTimeout(() => {
          this.dtTrigger.next();
        });
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  //get esimbs by collab
  getEsimbs(): void {
    console.log("cuid sent : " + this.cuid);
    this.esimbService.getActesByCollaborateur(this.cuid)
      .subscribe(
      data => {
        this.esimbs = data.sort(this.compare);
        setTimeout(() => {
          this.dtTrigger.next();
        });
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  compare(a: Esimb, b: Esimb) {
    const dateA = a.dateLivraison ? new Date(a.dateLivraison) : new Date();
    const dateB = b.dateLivraison ? new Date(b.dateLivraison) : new Date();

    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
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



  setActiveEsimb(esimb: Esimb, index: number): void {
    this.currentEsimb = esimb;
    this.currentIndex = index;
  }

  //Search
  search(): void {
    if (this.searchby == "codeBanbou") {
      this.searchByCodeBanbou();
    } else if (this.searchby == "Affectation") {
      this.searchByAffecttaion();
    } else if (this.searchby == "motif") {
      this.searchByMotifs();
    }
    else {
      this.searchByCodeIMB();
    }
  }

  //Search by code Banbou
  searchByCodeBanbou(): void {
    this.esimbService.searchByCodeBanbou(this.searchValue)
      .subscribe(
      data => {
        this.esimbs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
    console.log("Search by codeBanbou: " + this.searchValue);
  }

  //Search by codeIMB
  searchByCodeIMB(): void {
    this.esimbService.searchBycodeIMB(this.searchValue)
      .subscribe(
      data => {
        this.esimbs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });

    console.log("Search by codeIMB: " + this.searchValue);
  }

  //Search by affectation
  searchByAffecttaion(): void {
    this.esimbService.searchByaffectation(this.searchValue)
      .subscribe(
      data => {
        this.esimbs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });

    console.log("Search by affectation: " + this.searchValue);
  }

  searchByMotif(): void {


    if (this.searchValue2 !== undefined) {
      this.esimbService.getEsimbByMotif(this.searchValue2)
        .subscribe(
        data => {
          this.esimbs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
      console.log("Search by motif: " + this.searchValue);
    }
  }


  //Search by motif order
  searchByMotifs(): void {
    this.esimbService.searchByMotifs(this.searchValue2)
      .subscribe(
      data => {
        this.esimbs = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });

    console.log("recherche par motif: " + this.searchValue2);
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

  //Update Esimb
  updateEsimb(): void {
    this.esimbService.Update(this.currentEsimb.idacte, this.currentEsimb)
      .subscribe(
      response => {
        console.log(response);
        this.message = response.message ? response.message : 'This Acte was updated successfully!';
      },
      error => {
        console.log(error);
      });
  }

  onMotifChang(): void {
    if (this.currentEsimb.motif === 'En attente') {
      this.now = ''; // Si le motif est "En attente", la date de livraison est vide
    } else {
      this.now = new Date().toISOString().slice(0, 10);
      // Si le motif est différent de "En attente", la date de livraison est la date du jour
    }
  }

  onMotifChange(): void {
    if (this.currentEsimb.motif === 'En attente') {
      this.currentEsimb.dateLivraison = undefined; // Si le motif est "En attente", la date de livraison est vide
    } else {
      this.currentEsimb.dateLivraison = this.today; // Si le motif est différent de "En attente", la date de livraison est la date du jour
    }
  }


  getEsimb(esimb: Esimb): void {
    if (typeof esimb.codeBanbou === 'string') {
      this.esimbService.getEsimb(esimb.codeBanbou)
        .subscribe(
        data => {
          console.log(this.currentEsimb);
          this.currentEsimb = data;
          console.log(data);

          this.currentEsimb.dateLivraison = null;



          var laDate = new Date();
          if (this.currentEsimb.dateReception !== undefined) {
            laDate = new Date(this.currentEsimb.dateReception);
          }



          if (laDate !== undefined) {


            var day = ("0" + laDate.getDate()).slice(-2);
            var month = ("0" + (laDate.getMonth() + 1)).slice(-2);

            var dateReception = laDate.getFullYear() + "-" + (month) + "-" + (day);



            $("#datereception").val(dateReception);
          }


        },
        error => {
          console.log(error);
        });
    }


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
  
        this.esimbService.uploadHistorique(this.currentFile).subscribe(
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

        this.esimbService.uploadHistorique(this.currentFile).subscribe(
          response => {

            document.getElementById("importerHistorique") ?.click();
            this.retrieveEsimbs();
            this.refreshPage();


          },
          (err: any) => {
            console.log(err);

            this.currentFile = undefined;
          });


      }

      this.selectedFiles = undefined;
    }
  }




  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }


  onChange(e: any) {

    if (e.target.value == "En attente") {

      $("#dateLivraison").val("");
      $("#dateLivraison2").val("");
      if (this.currentEsimb !== undefined) {
        this.currentEsimb.dateLivraison = null;

        this.currentEsimb.statutFacturation = "en cours CDS";
      }

    } else {

      var now = new Date();

      var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2);

      var today = now.getFullYear() + "-" + (month) + "-" + (day);

      $("#dateLivraison").val(today);
      $("#dateLivraison2").val(today);


      if (this.currentEsimb !== undefined) {
        this.currentEsimb.statutFacturation = "facturable";
        this.currentEsimb.dateLivraison = new Date();
      }

    }

  }


}
