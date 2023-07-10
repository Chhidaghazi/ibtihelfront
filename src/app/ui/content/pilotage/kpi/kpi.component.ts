import { Component, OnInit , ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { ActeTraitementService } from 'src/app/services/acte-traitement.service';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

import { Router } from '@angular/router';
import { Collaborateur } from 'src/app/models/Collaborateur';
import { ActeTraitement } from 'src/app/models/ActeTraitement';
import { KpiService } from 'src/app/services/kpi.service';
import { DatePipe } from '@angular/common';
import {Prestation} from '../../../../models/Prestation';
import {Tarification} from '../../../../models/Tarification';
import {PrestationService} from '../../../../services/prestation.service';







@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private  acteTraitementService: ActeTraitementService,
              private collaborateurService: CollaborateurService,
              private router: Router,
              private kpiService: KpiService,
              private datePipe: DatePipe,
              private prestationService: PrestationService , private cdr: ChangeDetectorRef
  ) {
  }

  @Output() dataEvent = new EventEmitter<string>();
  showReceiver = false;
  data = 'Hello from parent component';

   idpres: any;
  searchby ?= 'IdGraphic';
  selectedTarif: any;
  show = false;
  dateDebut = '';
  dateFin = '';
  sortedGroupedActsByMonth !: unknown[];
  pres !: Prestation;
  tarifs: Tarification[] = [];
  isLoggedIn = false;
  dropYear: any;
  nbjour: any;
  private roles: string[] = [];
  isPilote = false;
  role = '';
  cuid = '';
  colabsteam?: Collaborateur[];
  actes: any[] = [];
  januaryData  !: any;
  februaryData !: any;
  marchData !: any;
  aprilData !: any;
  mayData !: any;
  juneData !: any;
  julyData !: any;
  augustData !: any;
  septemberData !: any;
  octoberData !: any;
  novemberData !: any;
  decemberData !: any;

  januaryDatalength  !: any;
  februaryDatalength !: any;
  marchDatalength !: any;
  aprilDatalength !: any;
  mayDatalength !: any;
  juneDatalength !: any;
  julyDatalength !: any;
  augustDatalength !: any;
  septemberDatalength !: any;
  octoberDatalength !: any;
  novemberDatalength !: any;
  decemberDatalength !: any;
// typePrestation="Lien NRO-PM";
  id = '';

  januaryCTJ  !: any;
  februaryCTJ !: any;
  marchCTJ !: any;
  aprilCTJ !: any;
  mayCTJ !: any;
  juneCTJ !: any;
  julyCTJ !: any;
  augustCTJ !: any;
  septemberCTJ !: any;
  octoberCTJ !: any;
  novemberCTJ !: any;
  decemberCTJ !: any;



  januaryETP !: any;
  februaryETP!: any;
  marchETP!: any;
  aprilETP!: any;
  mayETP!: any;
  juneETP!: any;
  julyETP!: any;
  augustETP!: any;
  septemberETP!: any;
  octoberETP!: any;
  novemberETP!: any;
  decemberETP!: any;



  januaryStaff !: any;
  februaryStaff!: any;
  marchStaff!: any;
  aprilStaff!: any;
  mayStaff!: any;
  juneStaff!: any;
  julyStaff!: any;
  augustStaff!: any;
  septemberStaff!: any;
  octoberStaff!: any;
  novemberStaff!: any;
  decemberStaff!: any;


  januaryCap !: any;
  februaryCap!: any;
  marchCap!: any;
  aprilCap!: any;
  mayCap!: any;
  juneCap!: any;
  julyCap!: any;
  augustCap!: any;
  septemberCap!: any;
  octoberCap!: any;
  novemberCap!: any;
  decemberCap!: any;

  januaryDMTDec !: any;
  februaryDMTDec!: any;
  marchDMTDec!: any;
  aprilDMTDec!: any;
  mayDMTDec!: any;
  juneDMTDec!: any;
  julyDMTDec!: any;
  augustDMTDec!: any;
  septemberDMTDec!: any;
  octoberDMTDec!: any;
  novemberDMTDec!: any;
  decemberDMTDec!: any;

  januaryDMTCalc !: any;
  februaryDMTCalc!: any;
  marchDMTCalc!: any;
  aprilDMTCalc!: any;
  mayDMTCalc!: any;
  juneDMTCalc!: any;
  julyDMTCalc!: any;
  augustDMTCalc!: any;
  septemberDMTCalc!: any;
  octoberDMTCalc!: any;
  novemberDMTCalc!: any;
  decemberDMTCalc!: any;

  januaryRealise !: any;
  februaryRealise!: any;
  marchRealise !: any;
  aprilRealise  !: any;
  avrilRealise !: any ;
  mayRealise !: any;
  juneRealise !: any;
  julyRealise !: any;
  augustRealise !: any;
  septemberRealise !: any;
  octoberRealis !: any;
  novemberRealise !: any;
  decemberRealise !: any;



  januarProd !: any ;
  februarProd !: any ;
  marcProd !: any ;
  apriProd !: any ;
  avriProd !: any ;
  maProd !: any ;
  junProd !: any ;
  julProd !: any ;
  augusProd !: any ;
  septembeProd !: any ;
  octobProd !: any ;
  novembeProd !: any ;
  decembeProd !: any ;


  januaryReaSurCapa!: any ;
  februaryReaSurCapa !: any ;
  marchReaSurCapa!: any ;

  avrilReaSurCapa !: any ;
  mayReaSurCapa !: any ;
  juinReaSurCapa !: any ;
  julyReaSurCapa !: any ;
  augustReaSurCapa !: any ;
  septembreReaSurCapa !: any ;
  octobreReaSurCapa !: any ;
  novembreReaSurCapa !: any ;
  decembrReaSurCapae !: any ;

  monthOrder = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
  };
  staffing = 0;
  capacite = 0;

  groupedActs?: any[];
  groupedActsByMonth?: Map<string, ActeTraitement[]>;
  sortedMonths: { month: string; act: ActeTraitement[] }[] = [];

  months: string[] = [];
  dropTar: any[] = [];



  /* getStaffing(): void {
     this.kpiService.getStaff(new Date(this.dateDebut), new Date(this.dateFin))
     .subscribe(
       (staffing: any) => {
         const staffingValue = parseFloat(staffing);
         this.staffing=staffing;
         console.log('Staffing:', staffingValue);
         // Handle the staffing value as needed
       },
       (error: any) => {
         console.error('An error occurred:', error);
         // Handle the error message as needed
       }
     );
   }*/


  /*getCapacite(): void {
    this.kpiService.getCapacite(new Date(this.dateDebut), new Date(this.dateFin))

    .subscribe(
      (staffing: any) => {
        const staffingValue = parseFloat(staffing);
        this.capacite=staffingValue;
        console.log('Capacite:', staffingValue);
        // Handle the staffing value as needed
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle the error message as needed
      }
    );
  }*/
  dropPres: any;
  prix: any;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.cuid = user.username;

      if (this.roles.includes('ROLE_PILOTE')){
        this.getteammembersbycuid();
        this.isPilote = true;
        this.role = 'PILOTE';
        console.log('this is Pilote');

      }else{
        this.isPilote = false;
        console.log('this is not Pilote' + this.roles);

      }
      this.getAllActes();
      // this.getProd(1, 1, 2023 , 10 , 1, 'Tarif 1') ;
    //  this.getRealiseQte_MoisParequipe();
      // this.getbymonth();
    //  this.getbyymonth();
  //    this.getMonths();
     // this.getByMonth(1, 1);
    }

  }




  /*getbymonth(): void {
  this.kpiService.getGroupedActsByMonth().subscribe(
    data => {
      this.groupedActs = data.map((date: Date) => this.datePipe.transform(date, 'yyyy-MM-dd'));
    },
    error => {
      console.log('An error occurred:', error);
    }
  );
}*/


  getMonthIndex(month: string): number {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames.indexOf(month);
  }
/*  getMonths(): void {
    const monthOrder = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    };
    const sortedArray = this.groupedActsByMonth;
    console.log(sortedArray);


  }

 */
  getbyymonth( idpres: number , tarifcode: any , year: number): void {
    this.kpiService.getActsByMonth(idpres, tarifcode, year).subscribe(
      data => {
        console.log(data);
        const monthsArray = Object.entries(data);
        console.log(monthsArray);

        const januaryData = monthsArray.find(([month]) => month === 'JANUARY')?.[1];
        if (januaryData === undefined){
          this.januaryData = [];
        }
        else {
          this.januaryData = januaryData;
          const len = (januaryData as any[]).length;
          this.januaryDatalength = len;
          console.log(len);
          console.log(januaryData);
        }
        // [/* array elements */]

        const februaryData = monthsArray.find(([month]) => month === 'FEBRUARY')?.[1];
        if (februaryData === undefined){
          this.februaryData = [];
        }
        else {
          this.februaryData = februaryData;
          const len = (februaryData as any[]).length;
          this.februaryDatalength = len ;
          console.log(februaryData);
        }
        // [/* array elements */]

        const marchData = monthsArray.find(([month]) => month === 'MARCH')?.[1];
        if (marchData === undefined){
          this.marchData = [];
        }
        else {
          this.marchData = marchData;
          const len = (januaryData as any[]).length;
          this.marchDatalength = len ;
          console.log(marchData);
        }
        // [/* array elements */]

        const aprilData = monthsArray.find(([month]) => month === 'APRIL')?.[1];
        if (aprilData === undefined){
          this.aprilData = [];
        }
        else {
          this.aprilData = aprilData;
          const len = (aprilData as any[]).length;
          this.aprilDatalength = len ;
          console.log(aprilData);
        }
        // [/* array elements */]

        const mayData = monthsArray.find(([month]) => month === 'MAY')?.[1];
        if (mayData === undefined){
          this.mayData = [];
        }
        else {
          this.mayData = mayData;
          const len = (mayData as any[]).length;
          this.mayDatalength = len ;
          console.log(mayData);
        } // [/* array elements */]

        const juneData = monthsArray.find(([month]) => month === 'JUNE')?.[1];
        if (juneData === undefined){
          this.juneData = [];
        }
        else {
          this.juneData = juneData;
          const len = (juneData as any[]).length;
          this.juneDatalength = len ;
          console.log(juneData);
        }
        // [/* array elements */]

        const julyData = monthsArray.find(([month]) => month === 'JULY')?.[1];
        if (julyData === undefined){
          this.julyData = [];
        }
        else {
          this.julyData = julyData;
          const len = (julyData as any[]).length;
          this.julyDatalength = len ;
          console.log(julyData);
        }
        // [/* array elements */]

        const augustData = monthsArray.find(([month]) => month === 'AUGUST')?.[1];
        if (augustData === undefined){
          this.augustData = [];
        }
        else {
          this.augustData = augustData;
          const len = (augustData as any[]).length;
          this.augustDatalength = len ;
          console.log(augustData);
        }
        // [/* array elements */]

        const septemberData = monthsArray.find(([month]) => month === 'SEPTEMBER')?.[1];
        if (septemberData === undefined){
          this.septemberData = [];
        }
        else {
          this.septemberData = septemberData;
          const len = (septemberData as any[]).length;
          this.septemberDatalength = len ;
          console.log(septemberData);
        }
        // [/* array elements */]

        const octoberData = monthsArray.find(([month]) => month === 'OCTOBER')?.[1];
        if (octoberData === undefined){
          this.octoberData = [];
        }
        else {
          this.octoberData = octoberData;
          const len = (octoberData as any[]).length;
          this.octoberDatalength = len ;
          console.log(octoberData);
        }
        // [/* array elements */]

        const novemberData = monthsArray.find(([month]) => month === 'NOVEMBER')?.[1];
        if (novemberData === undefined){
          this.novemberData = [];
        }
        else {
          this.novemberData = novemberData;
          const len = (novemberData as any[]).length;
          this.novemberDatalength = len ;
          console.log(novemberData);
        }
        // [/* array elements */]

        const decemberData = monthsArray.find(([month]) => month === 'DECEMBER')?.[1];
        if (decemberData === undefined){
          this.decemberData = [];
        }
        else {
          this.decemberData = decemberData;
          const len = (decemberData as any[]).length;
          this.decemberDatalength = len ;
          console.log(decemberData);
        } // [/* array elements */]

        this.groupedActsByMonth = new Map<string, ActeTraitement[]>();
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const actes = data[key] as ActeTraitement[];
            if (actes !== undefined) {
              this.groupedActsByMonth.set(key, actes);
            }
          }
        }
      },
      error => {
        console.log('An error occurred:', error);
      }
    );
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
  getdur(): void {


    this.kpiService.getSM(this.januaryData)
      .subscribe(
        data => {

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }




  /*getCTJ(): void {
    const dateeeD = this.datePipe.transform(this.dateDebut ,'yyyy-MM-dd') ;
    const dateeeF = this.datePipe.transform(this.dateDebut ,'yyyy-MM-dd') ;
    this.kpiService.getCTJ(dateeeD, dateeeF)
    .subscribe(
      (staffing: any) => {
        const staffingValue = parseFloat(staffing); // Convert the staffing value to float
        console.log('CTJ:', staffingValue);
        // Handle the staffing value as needed
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle the error message as needed
      }
    );
  }*/


  getCTJ(): void {
    this.kpiService.getCTJ(this.januaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.januaryCTJ = staffingValue ;

          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj jan ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getCTJ(this.februaryData)
      .subscribe(
        (staffing: any) => {
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.februaryCTJ = staffingValue ;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj feb ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getCTJ(this.marchData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.marchCTJ = staffingValue ;

          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj march ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getCTJ(this.aprilData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.aprilCTJ = staffingValue;

          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj april ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCTJ(this.mayData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.mayCTJ = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj mai ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCTJ(this.juneData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.juneCTJ = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj juin ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCTJ(this.julyData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.julyCTJ = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj july ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCTJ(this.augustData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.augustCTJ = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj aug ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCTJ(this.septemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.septemberCTJ = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj sep ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCTJ(this.octoberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.octoberCTJ = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj october ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCTJ(this.novemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.novemberCTJ = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj november ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getCTJ(this.decemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.decemberCTJ = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( 'ctj decembre ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
  }
  getStaffing(): void {
    this.kpiService.getStaff(this.januaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.januaryStaff = staffingValue;
          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' jan ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getStaff(this.februaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.februaryStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' feb ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getStaff(this.marchData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.marchStaff = staffingValue ;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' march ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getStaff(this.aprilData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.aprilStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' april ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getStaff(this.mayData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.mayStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' mai ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getStaff(this.juneData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.juneStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' juin ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getStaff(this.julyData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.julyStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' july ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getStaff(this.augustData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.augustStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' aug ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getStaff(this.septemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.septemberStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' sep ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getStaff(this.octoberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.octoberStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' october ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getStaff(this.novemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.novemberStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' november ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getStaff(this.decemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.decemberStaff = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' decembre ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
  }
  getCapacite(): void {
    this.kpiService.getCapacite(this.januaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.januaryCap = staffingValue;
          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' jan ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getCapacite(this.februaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.februaryCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' feb ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getCapacite(this.marchData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.marchCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' march ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getCapacite(this.aprilData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.aprilCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' april ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCapacite(this.mayData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.mayCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' mai ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCapacite(this.juneData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.juneCap = staffingValue ;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' juin ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCapacite(this.julyData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.julyCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' july ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCapacite(this.augustData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.augustCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' aug ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCapacite(this.septemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.septemberCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' sep ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCapacite(this.octoberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.octoberCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' october ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getCapacite(this.novemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.novemberCap = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' november ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getCapacite(this.decemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.decemberCap =  staffingValue ;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' decembre ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
  }

  getDMTDeclaree(): void {
    this.kpiService.getDmtDeclaree(this.januaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.januaryDMTDec = staffingValue;
          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' jan ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getDmtDeclaree(this.februaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.februaryDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' feb ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getDmtDeclaree(this.marchData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.marchDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' march ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getDmtDeclaree(this.aprilData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.aprilDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' april ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtDeclaree(this.mayData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.mayDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' mai ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtDeclaree(this.juneData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.juneDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' juin ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtDeclaree(this.julyData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.julyDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' july ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtDeclaree(this.augustData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.augustDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' aug ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtDeclaree(this.septemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.septemberDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' sep ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtDeclaree(this.octoberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.octoberDMTDec =  staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' october ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtDeclaree(this.novemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.novemberDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' november ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getDmtDeclaree(this.decemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.decemberDMTDec = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' decembre ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
  }

  getDMTCalculee(): void {
    this.kpiService.getDmtCalculee(this.januaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.januaryDMTCalc = staffingValue;
          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' jan ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getDmtCalculee(this.februaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.februaryDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' feb ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getDmtCalculee(this.marchData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.marchDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' march ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getDmtCalculee(this.aprilData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.aprilDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' april ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtCalculee(this.mayData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.mayDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' mai ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtCalculee(this.juneData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.juneDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' juin ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtCalculee(this.julyData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.julyDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' july ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtCalculee(this.augustData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.augustDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' aug ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtCalculee(this.septemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.septemberDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' sep ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtCalculee(this.octoberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.octoberDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' october ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getDmtCalculee(this.novemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.novemberDMTCalc = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' november ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getDmtCalculee(this.decemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.decemberDMTCalc =  staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' decembre ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
  }

  getETP(): void {
    this.kpiService.getEtp(this.januaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.januaryETP = staffingValue;
          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' jan ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getEtp(this.februaryData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.februaryETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' feb ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getEtp(this.marchData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.marchETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' march ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getEtp(this.aprilData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.aprilETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' april ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getEtp(this.mayData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.mayETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' mai ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getEtp(this.juneData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.juneETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' juin ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getEtp(this.julyData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.julyETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' july ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getEtp(this.augustData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.augustETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' aug ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getEtp(this.septemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.septemberETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' sep ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getEtp(this.octoberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.octoberETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' october ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
    this.kpiService.getEtp(this.novemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.novemberETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' november ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );

    this.kpiService.getEtp(this.decemberData)
      .subscribe(
        (staffing: any) => {
          // Convert the staffing value to float
          // tslint:disable-next-line:triple-equals
          let staffingValue = 0 ;
          if ( typeof (staffing) === 'number'){

            staffingValue = parseFloat(String(staffing));
            this.decemberETP = staffingValue;


          }
          else
          {
            staffingValue = 0 ;


          }
          console.log( ' decembre ' + staffingValue);

          // Handle the staffing value as needed
        },
        (error: any) => {
          console.error('An error occurred:', error);
          // Handle the error message as needed
        }
      );
  }


  getPrestTarif(): void{
    this.kpiService.getActesByPrestTarif(1, 'Tarif 1').subscribe(
      (actes: any) => {

        console.log('actes:', actes);
        // Handle the staffing value as needed
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle the error message as needed
      }
    );
  }


  getAllActes(): void {

    console.log('cuid sent : ' + this.cuid);
    this.acteTraitementService.getActesKpis(new Date(this.dateDebut), new Date(this.dateFin))
      .subscribe(
        data => {
          this.actes = this.actes.concat(data);
          console.log(this.actes);
        },
        error => {
          console.log(error);

        });

// this.getStaffing();
// this.getCapacite();
    this.show = true;
  }

  changeDropdownPrest(event: any): void {
    console.log(event);
    this.getPres();
   // this.dropPres = event;
      // this.getTarifPres(event);

   // console.log(this.pres);


  }

  changeDropdownTarf(event: any): void {
    console.log(this.selectedTarif);
    this.getbyymonth(this.idpres , this.selectedTarif , 2023 ) ;
    this.cdr.detectChanges();
   // this.dropTar = event;
 //   console.log(this.dropTar);

  }
  getTarifPres(data: any): void{
    this.kpiService.getTarifBypres(data).subscribe(
      (tarif: any[]) => {
   this.tarifs  = tarif ;
   this.dropTar = tarif;
   if (typeof (tarif) === undefined){
     console.log('il ya un prob') ;
   }
   else {
     this.tarifs = [];
     console.log('tarifs:', tarif);
     this.idpres = data.idPrestation ;

   }

        // Handle the staffing value as needed
      },
      (error: any) => {
       // console.log('error');
        this.tarifs = [];
        console.log(this.tarifs) ;

        console.error('An error occurred:', error);
        // Handle the error message as needed
      }
    );
  }
  getPres(): void{
    this.prestationService.getPrestationByNom(this.dropPres).subscribe(
      (pres: any) => {
        this.getTarifPres(pres);
        this.pres  = pres ;
        console.log('pres:', pres);
        console.log('pres:', this.pres);
        // Handle the staffing value as needed
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle the error message as needed
      }
    );
    console.log('pres:', this.pres);
  /*  if (typeof (this.pres) === undefined){
      console.log('undef');
    }
    else {


    }

   */

  }


  /*
  getTarifByprest(): void{
    this.kpiService.getTarifBypres(this.pres).subscribe(
      (pres: any) => {
        this.tarifs  = pres ;
        console.log('pres:', pres);
        // Handle the staffing value as needed
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle the error message as needed
      }
    );
  }

   */



  Calculer(): void {
    this.cdr.detectChanges();
    this.getRealiseQte_MoisParequipe( 1 , this.dropYear , this.nbjour , this.idpres , this.selectedTarif   );

    this.getCTJ();
    this.getETP();
    this.getStaffing();
    this.getCapacite();
    this.getDMTDeclaree();
    this.getDMTCalculee();
    this.getProd(this.idpres, 1, this.dropYear , this.prix , this.nbjour, this.selectedTarif ) ;
    this.getReaSurCapa(this.idpres , this.dropYear, this.nbjour, this.selectedTarif , 1);


  }


  getRealiseQte_MoisParequipe( idEquipe: number, year: number , nbjours: number , idPrest: number,  codeTarif: string): void {


    this.kpiService.getRealiseQte_MoisParequipe1(1  , 2023 , 1, 1 , 'Tarif 1').subscribe(
      (data) => {
        console.log('real' , data) ;
        const monthsArray = Object.entries(data);

        const januaryData = monthsArray.find(([month]) => month === 'JANUARY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (januaryData !== undefined))
        {
          this.januaryRealise = januaryData ;
        }

        const febData = monthsArray.find(([month]) => month === 'FEBRUARY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (febData !== undefined))
        {
          this.februaryRealise = febData ;
        }

        const marData = monthsArray.find(([month]) => month === 'MARCH')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (marData !== undefined))
        {
          this.marchRealise = marData ;

        }

        const avrData = monthsArray.find(([month]) => month === 'APRIL')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (avrData !== undefined))
        {
          this.avrilRealise = avrData ;


        }

        const maiData = monthsArray.find(([month]) => month === 'MAY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (maiData !== undefined))
        {
          this.mayRealise = maiData ;

        }
        const juinyData = monthsArray.find(([month]) => month === 'JUNE')?.[1];
        if (typeof (juinyData !== undefined))
        {
          this.juneRealise = juinyData ;

        }

        const julyData = monthsArray.find(([month]) => month === 'JULY')?.[1];
        if (typeof (julyData !== undefined))
        {
          this.julyRealise = julyData ;

        }

        const aoutData = monthsArray.find(([month]) => month === 'AUGUST')?.[1];
        if (typeof (aoutData !== undefined))
        {
          this.augustRealise = aoutData ;

        }

        const sepData = monthsArray.find(([month]) => month === 'SEPTEMBER')?.[1];
        if (typeof (sepData === undefined))
        {
          this.septemberRealise = sepData ;

        }
        const octData = monthsArray.find(([month]) => month === 'OCTOBER')?.[1];
        if (typeof (octData !== undefined))
        {
          this.octoberRealis = octData ;

        }

        const novData = monthsArray.find(([month]) => month === 'NOVEMBER')?.[1];
        if (typeof (novData !== undefined))
        {
          this.novemberRealise = novData ;

        }




        const decData = monthsArray.find(([month]) => month === 'DECEMBER')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (decData !== undefined))
        {             this.decemberRealise = decData ;


        }





      }
      , error => {
        console.error('An error occurred:', error);

      }
    );
  }


  getProd( idPrestation: number , idEquipe: number, year: number , prix: number,  staffingdef: number  , codTarif: string): void {


    this.kpiService.getProd(idPrestation  , idEquipe , year, prix , staffingdef  , codTarif).subscribe(
      (data) => {
        console.log('PROD' , data) ;
        const monthsArray = Object.entries(data);

        const januaryData = monthsArray.find(([month]) => month === 'JANUARY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (januaryData !== undefined))
        {
          this.januarProd = januaryData ;
        }

        const febData = monthsArray.find(([month]) => month === 'FEBRUARY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (febData !== undefined))
        {
          this.februarProd =  febData ;
        }

        const marData = monthsArray.find(([month]) => month === 'MARCH')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (marData !== undefined))
        {
          this.marcProd = marData ;

        }

        const avrData = monthsArray.find(([month]) => month === 'APRIL')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (avrData !== undefined))
        {
          this.avriProd = avrData ;


        }

        const maiData = monthsArray.find(([month]) => month === 'MAY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (maiData !== undefined))
        {
          this.maProd = maiData ;

        }
        const juinyData = monthsArray.find(([month]) => month === 'JUNE')?.[1];
        if (typeof (juinyData !== undefined))
        {
          this.junProd = juinyData ;

        }

        const julyData = monthsArray.find(([month]) => month === 'JULY')?.[1];
        if (typeof (julyData !== undefined))
        {
          this.julProd = julyData ;

        }

        const aoutData = monthsArray.find(([month]) => month === 'AUGUST')?.[1];
        if (typeof (aoutData !== undefined))
        {
          this.augusProd = aoutData ;

        }

        const sepData = monthsArray.find(([month]) => month === 'SEPTEMBER')?.[1];
        if (typeof (sepData === undefined))
        {
          this.septembeProd = sepData ;

        }
        const octData = monthsArray.find(([month]) => month === 'OCTOBER')?.[1];
        if (typeof (octData !== undefined))
        {
          this.octobProd = octData ;

        }

        const novData = monthsArray.find(([month]) => month === 'NOVEMBER')?.[1];
        if (typeof (novData !== undefined))
        {
          this.novembeProd = novData ;

        }




        const decData = monthsArray.find(([month]) => month === 'DECEMBER')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (decData !== undefined))
        {             this.decemberRealise = decData ;


        }





      }
      , error => {
        console.error('An error occurred:', error);

      }
    );
  }

  getReaSurCapa( idPrestation: number , year: number ,  nbjours: number  ,  codeTarif: string , idEq :number): void {


    this.kpiService.getReaSurCapa(idPrestation, year, nbjours, codeTarif ,idEq ).subscribe(
      (data) => {
        console.log('raeSurCapa' , data) ;
        const monthsArray = Object.entries(data);

        const januaryData = monthsArray.find(([month]) => month === 'JANUARY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (januaryData !== undefined))
        {
          this.januaryReaSurCapa = januaryData ;
        }

        const febData = monthsArray.find(([month]) => month === 'FEBRUARY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (febData !== undefined))
        {
          this.februaryReaSurCapa =  febData ;
        }

        const marData = monthsArray.find(([month]) => month === 'MARCH')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (marData !== undefined))
        {
          this.marchReaSurCapa = marData ;

        }

        const avrData = monthsArray.find(([month]) => month === 'APRIL')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (avrData !== undefined))
        {
          this.avrilReaSurCapa = avrData ;


        }

        const maiData = monthsArray.find(([month]) => month === 'MAY')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (maiData !== undefined))
        {
          this.mayReaSurCapa = maiData ;

        }
        const juinyData = monthsArray.find(([month]) => month === 'JUNE')?.[1];
        if (typeof (juinyData !== undefined))
        {
          this.juinReaSurCapa = juinyData ;

        }

        const julyData = monthsArray.find(([month]) => month === 'JULY')?.[1];
        if (typeof (julyData !== undefined))
        {
          this.julyReaSurCapa = julyData ;

        }

        const aoutData = monthsArray.find(([month]) => month === 'AUGUST')?.[1];
        if (typeof (aoutData !== undefined))
        {
          this.augustReaSurCapa = aoutData ;

        }

        const sepData = monthsArray.find(([month]) => month === 'SEPTEMBER')?.[1];
        if (typeof (sepData === undefined))
        {
          this.septembreReaSurCapa = sepData ;

        }
        const octData = monthsArray.find(([month]) => month === 'OCTOBER')?.[1];
        if (typeof (octData !== undefined))
        {
          this.octobreReaSurCapa = octData ;

        }

        const novData = monthsArray.find(([month]) => month === 'NOVEMBER')?.[1];
        if (typeof (novData !== undefined))
        {
          this.novembreReaSurCapa = novData ;

        }




        const decData = monthsArray.find(([month]) => month === 'DECEMBER')?.[1];
        // tslint:disable-next-line:triple-equals
        if (typeof (decData !== undefined))
        {             this.decembrReaSurCapae = decData ;


        }





      }
      , error => {
        console.error('An error occurred:', error);

      }
    );
  }
  changeDropdownYear($event: any) {

  }
}
