import { Component, OnInit } from '@angular/core';
import { Bpu } from 'src/app/models/Bpu';
import { BpuService } from 'src/app/services/bpu.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Prestation } from 'src/app/models/Prestation';


@Component({
  selector: 'app-add-bpu',
  templateUrl: './add-bpu.component.html',
  styleUrls: ['./add-bpu.component.css'],
  template: `
  <p>La date d'expiration est : {{ dateExpiration: 'MM/DD/yyyy' }}</p>
  <p>Date d'aujourd'hui : {{ today | date:'MM/DD/yyyy' }}</p>
`
})
export class AddBpuComponent implements OnInit {

  myForm: FormGroup;
  dateExpiration: string; // variable pour la date d'expiration calculée

  today: Date = new Date();
  now = new Date().toISOString().slice(0,10);


  inputValue = '';
  content?: string;
  value?: number;
  bpus?: Bpu[];
  bpu: Bpu = new Bpu();
  submitted = false;
  message = '';
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
    version:1,
    tarif:''
    };

  constructor(private bpuService: BpuService, private router: Router, private http: HttpClient) {
    this.myForm = new FormGroup({
      refTacheBPU: new FormControl(''),
      type_element: new FormControl(''),
      PU: new FormControl(''),
      tarif: new FormControl(''),
      dateValidite: new FormControl(''),
      type_penalite: new FormControl(''),
      penalite: new FormControl(''),
      type_prestation: new FormControl('')
    });
    const dateDebut: Date = new Date();
      const anneeExpiration: number = dateDebut.getFullYear() + 1;
      const moisExpiration: number = dateDebut.getMonth();
      const jourExpiration: number = dateDebut.getDate();
      this.dateExpiration = `${anneeExpiration}-${moisExpiration + 1}-${jourExpiration}`;
   }

  ngOnInit(): void {
    this.currentBpu.dateDebut=this.now;
    this.currentBpu.dateExpiration= this.dateExpiration;
  }

   // Function de génération de ref
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


updateBPU(id: number): void {
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

/*getSymbol(): any {
  if (this.currentBpu.type_penalite === 'variable') {
    return '%';
  } else if (this.currentBpu.type_penalite === 'fixe') {
    return '€';
  }
}*/

onElementChange() {
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

onTarifChange() {
  if (this.currentBpu.type_prestation === 'ESIMB') {
    this.currentBpu.tarif ='tarif1'; 
    this.currentBpu.tarif ='tarif2'; 
  } else if (this.currentBpu.type_prestation === 'NROPM') {
    this.currentBpu.tarif ='tarif3'; 
    this.currentBpu.tarif ='tarif4'; 

  } 
}

onTariChange() {
  if (this.currentBpu.type_prestation === 'ESIMB') {
    if ( "condition pour choisir tarif1") {
      this.currentBpu.tarif = 'tarif1';
    } else {
      this.currentBpu.tarif = 'tarif2';
    }
  } else if (this.currentBpu.type_prestation === 'NROPM') {
    if ("condition pour choisir tarif3") {
      this.currentBpu.tarif = 'tarif3';
    } else {
      this.currentBpu.tarif = 'tarif4';
    }
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


/*onSubmit() {
  const bpu1 = {
    refTacheBPU: this.myForm.value.refTacheBPU,
    type_element: this.myForm.value.type_element,
    PU: this.myForm.value.PU,
    tarif: this.myForm.value.tarif,
    dateDebut: new Date().toISOString(),
    dateValidite: this.myForm.value.dateValidite,
    dateExpiration: '',
    type_penalite: this.myForm.value.type_penalite,
    penalite: this.myForm.value.penalite,
    type_prestation: this.myForm.value.type_prestation,
    version: 'V1'
  };
  this.http.post('http://localhost:8080/bpus', bpu1).subscribe(response => {
    console.log(response);
    // faire quelque chose avec la réponse
  });
}
onUpdate() {
  const bpu2 = {
    refTacheBPU: this.myForm2.value.refTacheBPU,
    type_element: this.myForm2.value.type_element,
    PU: this.myForm2.value.PU,
    tarif: this.myForm2.value.tarif,
    dateDebut: new Date().toISOString(),
    dateValidite: this.myForm2.value.dateValidite,
    dateExpiration: '',
    type_penalite: this.myForm2.value.type_penalite,
    penalite: this.myForm2.value.penalite,
    type_prestation: this.myForm2.value.type_prestation,
    version: 'V2'
  };
  this.http.post('http://localhost:8080/bpus', bpu2).subscribe(response => {
    console.log(response);
    // faire quelque chose avec la réponse
    const bpu1 = {
      ...this.bpu1,
      dateExpiration: new Date(new Date(bpu2.dateDebut).getTime() - 24 * 60 * 60 * 1000).toISOString()
    };
    this.http.put('http://localhost:8080/bpus/' + this.bpu1.id, bpu1).subscribe(response => {
      console.log(response);
      // faire quelque chose avec la réponse
    });
  });
}*/


}
