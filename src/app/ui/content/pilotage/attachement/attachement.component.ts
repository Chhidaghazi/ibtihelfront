import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FacturationServiceService } from 'src/app/services/facturation-service.service';
import { Prestation } from 'src/app/models/Prestation';
import { Esimb } from 'src/app/models/esimb.model';
import { Grafic_req } from 'src/app/models/Grafic_req';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { Graphic } from 'src/app/models/Graphic';
import { Tarification } from 'src/app/models/Tarification';

@Component({
  selector: 'app-attachement',
  templateUrl: './attachement.component.html',
  styleUrls: ['./attachement.component.css']
})
export class AttachementComponent implements OnInit {

  excelData: any[] = []; // Déclaration de la variable de classe excelData


  dateDebut: string = '';
  dateFin: string = '';
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
  
  //Instance de graphic response
  currentGraphic: Grafic_req= {
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

  //instance of Esimb
 currentEsimb: Esimb= {
  codeBanbou:'',
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
  type_prestation:  new Prestation(),
  dateDeadline:null, 
      priorite:"P1",
  tarif: new Tarification()
};
  
  attachements: any[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private facturationServiceService:FacturationServiceService) { }

  ngOnInit(): void {
    this.search;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,

      deferRender: true,
      destroy: true

    };
    
  }


  search(): void {
    this.attachements = []; // Initialisation de la liste d'attachements
  
    this.facturationServiceService.getAttachements(new Date(this.dateDebut), new Date(this.dateFin))
    .subscribe(
      data => {
        //this.attachements = (this.attachements ?? []).concat(data);  // Concaténer la nouvelle réponse à la valeur existante
        this.attachements = this.attachements.concat(data); // Concaténer la nouvelle réponse à la valeur existante
        console.log(this.attachements); // Afficher la liste complète
      },
      error => {
        console.log(error);
      });
    
  }

  downloadExcel() {
    this.facturationServiceService. generateExc(new Date(this.dateDebut), new Date(this.dateFin))
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'attach.xls';
        link.click();
      });
  }


  getIdActe(attach: any, type_prestation: string): string {
    if (type_prestation === 'Evolution statut IMB') {
      return attach.codeIMB + attach.codeBanbou;
    } else if (type_prestation === 'NROPM') {
      return 'COG';
    } else {
      return attach.idacte;
    }
  }

}
