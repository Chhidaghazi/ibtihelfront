import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Auth/services/user.service';
import { Bpu } from 'src/app/models/Bpu';
import { BpuService } from 'src/app/services/bpu.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Prestation } from 'src/app/models/Prestation';



@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css'],
  template: `
  <p>La date d'expiration est : {{ dateExpiration: 'MM/DD/yyyy' }}</p>
  <p>Date d'aujourd'hui : {{ today | date:'MM/DD/yyyy' }}</p>
  <form (ngSubmit)="onSubmit()">
      <label for="refTacheBPU">Ref Tache BPU</label>
      <input id="refTacheBPU" type="text" [(ngModel)]="bpu.refTacheBPU" name="refTacheBPU">
      <label for="type_element">Type Element</label>
      <input id="type_element" type="text" [(ngModel)]="bpu.type_element" name="type_element">
      <label for="PU">PU</label>
      <input id="PU" type="number" [(ngModel)]="bpu.PU" name="PU">
      <label for="tarif">Tarif</label>
      <input id="tarif" type="number" [(ngModel)]="bpu.tarif" name="tarif">
      <label for="type_penalite">Type Penalite</label>
      <input id="type_penalite" type="text" [(ngModel)]="bpu.type_penalite" name="type_penalite">
      <label for="penalite">Penalite</label>
      <input id="penalite" type="number" [(ngModel)]="bpu.penalite" name="penalite">
      <label for="type_prestation">Type Prestation</label>
      <input id="type_prestation" type="text" [(ngModel)]="bpu.type_prestation" name="type_prestation">
      <button type="submit">Créer BPU</button>
      </form> 
`
})
export class AdminBoardComponent implements OnInit {

  isAdmin = false;
  content?: string;
  bpus?: Bpu[];
  bpu: Bpu = new Bpu();
  errorMessage= '';
  inputValue = '';
  value?: number;
  submitted = false;
  message = '';

  //currentEsimb?: Esimb;
  currentIndex = -1;
  dateDebut= '';
  type_prestation = new Prestation();
  type_element='';
  penalite='';
  type_penalite='';

  dateExpiration: string; // variable pour la date d'expiration calculée

  today: Date = new Date();
  now = new Date().toDateString();




   //instance of BPU
   currentBpu: Bpu= {
    refTacheBPU:'',
    type_element: '',
    type_prestation: new Prestation(),
    pu: 0,
    dateDebut: '',
    dateValidite: '',
    dateExpiration:'',
    type_penalite: '',
    penalite: '',
    version:1
    };

   // refTacheBPU: string = 'V' + this.currentBpu.type_prestation + ' ' + this.currentBpu.pu;


  constructor(private userService: UserService, private bpuService: BpuService, private http: HttpClient
    ,private router: Router) {
      const dateDebut: Date = new Date();
      const anneeExpiration: number = dateDebut.getFullYear() + 1;
      const moisExpiration: number = dateDebut.getMonth();
      const jourExpiration: number = dateDebut.getDate();
      this.dateExpiration = `${anneeExpiration}-${moisExpiration + 1}-${jourExpiration}`;

      /*const bpu = this.bpu.find(Bpu => ligne.id === idToUpdate);
bpu.type_prestation= '';
bpu.type_element = 'newDescription';
bpu.version += 1;*/
    }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.getBpus();
    this.currentBpu.dateDebut=this.now;
    this.currentBpu.dateExpiration= this.dateExpiration;

    this.retrieveBpus();

    // récupérez l'ID de l'objet BPU à partir de l'URL ou d'un autre composant
    const id = 1;
    this.bpuService.getBpuById(id).subscribe(data => {
      this.bpu = data;
    });

  }

  generateRef(): String {
    return this.currentBpu.type_prestation+ '-'+ this.currentBpu.tarif;
}

generateVersion(): any{
return this.updatebpu(this.bpu);
}

save(): void {
  const data = {
  refTacheBPU : this.generateRef(),
  type_prestation : this.currentBpu.type_prestation,
  type_element:this.currentBpu.type_element,
  pu:this.currentBpu.pu,
  type_penalite:this.currentBpu.type_penalite,
  dateDebut:this.currentBpu.dateDebut,
  dateValidite:this.currentBpu.dateValidite,
  dateExpiration:this.currentBpu.dateExpiration,
  penalite:this.currentBpu.penalite,
  version:this.generateVersion() 
  };
  
  this.bpuService.create(data, this.currentBpu)
    .subscribe({
      next: (res) => {
        console.log(res);
        if (res == "ok"){
          this.submitted = true;
        }else{
          this.submitted = false;
        }
        
      },
      error: (e) => console.error(e)
    });
}



retrieveBpus(): void {
  this.bpuService.getAll()
    .subscribe(
      data => {
        this.bpus = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}

setActiveBpu(bpu: Bpu, index: number): void {
  this.currentBpu = bpu;
  this.currentIndex = index;
}

  private getBpus(){
    this.bpuService.getBpusList()
    .subscribe(data => {
      this.bpus = data;
    });
  }


   //save BPU
   saveBPU(): void {
        this.bpuService.save(this.currentBpu)
          .subscribe({
            next: (res) => {
              if (res == "ok"){
                this.submitted = true;
              }else{
                this.submitted = false;
              }
            },
            
            error: (e) => console.error(e)
          });
    }

    //MAJ BPU
 updateBPU(): void {
  this.generateRef();
  this.bpuService.Update(this.currentBpu.id, this.currentBpu)
    .subscribe(
      response => {
        console.log(response);
        this.message = response.message ? response.message : 'This BPU was updated successfully!';
      },
      error => {
        console.log(error);
      });
}

  onlyNumberKey(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getSymbol(): any {
    if (this.currentBpu.type_penalite === 'variable') {
      return '%';
    } else if (this.currentBpu.type_penalite === 'fixe') {
      return '$';
    }
  }

  recupererValeur() { 
       this.currentBpu.refTacheBPU = this.currentBpu.refTacheBPU;
    }

  /*calculerDateExpiration() {
    if (this.currentBpu.dateDebut) {
        // Ajouter un an à la date de début
        const expiration = new Date(this.currentBpu.dateDebut);
        expiration.setFullYear(expiration.getFullYear() + 1);
  
        // Mettre à jour la date d'expiration
        this.currentBpu.dateExpiration = expiration;
      }
    }*/

    onPrestationChange() {
      if (this.currentBpu.type_prestation === 'ESIMB') {
        this.currentBpu.type_element = 'Forfait';
      } else if (this.currentBpu.type_prestation === 'NROPM') {
        this.currentBpu.type_element = 'FI';
      } else if (this.currentBpu.type_prestation === 'DESAT') {
        this.currentBpu.type_element = 'Coupleur';
      } 
    }

    onPenaliteChange() {
      if (this.currentBpu.type_penalite === 'variable') {
        this.currentBpu.penalite ='%'; 
      } else if (this.currentBpu.type_penalite === 'fixe') {
        this.currentBpu.penalite = '€';
      } 
      
    }

    updatebpu(bpu: Bpu) {
      // Effectuer la mise à jour de la ligne
      bpu.type_element = '';
      bpu.type_prestation = new Prestation();
      bpu.dateDebut= '';
      bpu.dateExpiration='';
      bpu.type_penalite='';
      bpu.penalite='';

      // Incrémenter la propriété "version"
      if (bpu && bpu.version) {
      bpu.version = bpu.version + 1; 
      }     
      
    }
    // ...


    /*onUpdate(bpu: Bpu) {
      this.bpuService.updateB(bpu).subscribe(
        data => {
          console.log(data);
        },
        error =>{
        console.error(error);
      }
    ); 
  }*/

}
