import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActeTraitement } from 'src/app/models/ActeTraitement';

import { ActeTraitementService } from 'src/app/services/acte-traitement.service';
import { DesatService } from 'src/app/services/desat.service';
import { EsimbService } from 'src/app/services/esimb.service';
import { GraphicService } from 'src/app/services/graphic.service';
import { KpiService } from 'src/app/services/kpi.service';
import { NropmService } from 'src/app/services/nropm.service';
import {DashboardPiloteService} from '../../../../services/dashboard-pilote.service';
import {PrestationService} from '../../../../services/prestation.service';
import {Tarification} from '../../../../models/Tarification';

@Component({
  selector: 'app-dashboard-pilote',
  templateUrl: './dashboard-pilote.component.html',
  styleUrls: ['./dashboard-pilote.component.css']
})
export class DashboardPiloteComponent implements OnInit {

  dropTar: any[] = [];
  selectedTarif: any;
  tarifs: Tarification[] = [];


  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  dropYear: any;
  chartData: any[] = []; // Declare an array to hold the chart data
  saleData!: any[];
  receivedData: any;
  showReceiver = false;

  single !: any[];
  multi: any[] = [
    {
      name: 'ETP',
      series: [
        {
          name: 'Janvier',
          value: 2500
        },
        {
          name: 'Fevrier',
          value: 3100
        },
        {
          name: 'Mars',
          value: 2350
        },
        {
          name: 'Avril',
          value: 2350
        },
        {
          name: 'Mai',
          value: 2350
        },
        {
          name: 'Juin',
          value: 2350
        },
        {
          name: 'Juillet',
          value: 2500
        },
        {
          name: 'Aout',
          value: 3100
        },
        {
          name: 'September',
          value: 2350
        },
        {
          name: 'October',
          value: 2350
        },
        {
          name: 'November',
          value: 2350
        },
        {
          name: 'December',
          value: 2350
        },
      ]
    },
  {
    name: 'CTJ',
    series: [
      {
        name: 'Janvier',
        value: 3459,
      },
      {
        name: 'Fevrier',
        value: 3100
      },
      {
        name: 'Mars',
        value: 2350
      },
      {
        name: 'Avril',
        value: 2350
      },
      {
        name: 'Mai',
        value: 2350
      },
      {
        name: 'Juin',
        value: 2350
      },
      {
        name: 'Juillet',
        value: 2500
      },
      {
        name: 'Aout',
        value: 3100
      },
      {
        name: 'September',
        value: 2350
      },
      {
        name: 'October',
        value: 2350
      },
      {
        name: 'November',
        value: 2350
      },
      {
        name: 'December',
        value: 2350
      },
    ]
  }
];

  view: any[] = [700, 400];

  showYAxis = true;
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  // options
  showXAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';


  gradient = false;
  showLegend = true;
 timeline = true;
  nbDesat = 0;
  nbEsimb = 0;
  nbNropm =   0;
  nbActes = 0;
  nbGrafic = 0;


  // line, area
  autoScale = true;


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

  groupedActsByMonth?: Map<string, ActeTraitement[]>;
  dropPres: any;


  // tslint:disable-next-line:max-line-length
  nbjour: any;
  prix: any;
   idpres !: number ;
  constructor(private desatService: DesatService, private esimbService: EsimbService, private graphicService: GraphicService, private prestationService: PrestationService ,
              // tslint:disable-next-line:max-line-length
              private nropmService: NropmService, private acteTraitementService: ActeTraitementService, private kpiService: KpiService, private  dashboardPiloteService: DashboardPiloteService) {
  }




  onSelect(event: any): void {
    console.log(event);
  }



  ngOnInit(): void {
    this.getNbre();
 //   this.getbyymonth(1, 'Tarif 1' , 2023);
  //  this. getCTJ();
//    this.countbypres();
  //  this.getCtjYear();

  }
countbypres(): void{
  this.kpiService.getcountbypres(1)
    .subscribe(
      data => {
       console.log(data);
      },
      error => {
        console.log(error);
      });


}


  getNbre(): void {
    this.acteTraitementService.getNbActe().subscribe(
      nbActesData => {
        this.nbActes = nbActesData;
        console.log(nbActesData);

        this.desatService.getNbDesatActe().subscribe(
          nbDesatData => {
            this.nbDesat = nbDesatData;
            console.log(nbDesatData);

            this.esimbService.getNbEsimbActe().subscribe(
              nbEsimbData => {
                this.nbEsimb = nbEsimbData;
                console.log(nbEsimbData);

                this.graphicService.getNbGraficActe().subscribe(
                  nbGraficData => {
                    this.nbGrafic = nbGraficData;
                    console.log(nbGraficData);

                    this.nropmService.getNbNroActe().subscribe(
                      nbNropmData => {
                        this.nbNropm = nbNropmData;
                        console.log(nbNropmData);

                        this.saleData = [

                          { name: 'Nropm', value: this.nbNropm },
                          { name: 'Desat', value: this.nbDesat },
                          { name: 'Esimb', value: this.nbEsimb },
                          { name: 'Grafic', value: this.nbGrafic }
                        ];
                      },
                      error => {
                        console.error('Erreur lors de la récupération du nombre Nropm :', error);
                      }
                    );
                  },
                  error => {
                    console.error('Erreur lors de la récupération du nombre Grafic :', error);
                  }
                );
              },
              error => {
                console.error('Erreur lors de la récupération du nombre Esimb :', error);
              }
            );
          },
          error => {
            console.error('Erreur lors de la récupération du nombre Desat :', error);
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération du nombre Actes :', error);
      }
    );
  }






/*
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

 */


  getbyymonth( idpres: number , tarifcode: any , year: number): void {
    this.kpiService.getActsByMonth(1, 'Tarif 1' , year).subscribe(
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
  getCtjYear(idPrest: number, year: number, nbjour: number, codeTarif: string): void {
    this.dashboardPiloteService.getCtjbyYear(idPrest, year, nbjour, codeTarif).subscribe(
      (ctjData) => {
        console.log('ctjdata' , ctjData);
        const chart = Object.entries(ctjData).map(([key, value]) => ({ name: key, value }));

        const multi: any[] = [
          {
            name: 'CTJ',
            series: chart.map(item => ({
              name: item.name,
              value: item.value,
            })).sort((a, b) => {
              const monthOrder = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
              return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
            })
          }
        ];

        console.log('chart', chart);

        this.dashboardPiloteService.getStaffingbyYear(idPrest, year, codeTarif).subscribe(
          (staffingData) => {
            const staffingChart = Object.entries(staffingData).map(([key, value]) => ({ name: key, value }));

            multi.push({
              name: 'Staffing',
              series: staffingChart.map(item => ({
                name: item.name,
                value: item.value,
              })).sort((a, b) => {
                const monthOrder = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
                return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
              })
            });

            console.log('multi', multi);

            this.dashboardPiloteService.GetDmtDeclare(idPrest, year, codeTarif).subscribe(
              (dmtDeclareData) => {
                const dmtDeclareChart = Object.entries(dmtDeclareData).map(([key, value]) => ({ name: key, value }));

                multi.push({
                  name: 'DMT Declare',
                  series: dmtDeclareChart.map(item => ({
                    name: item.name,
                    value: item.value,
                  })).sort((a, b) => {
                    const monthOrder = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
                    return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
                  })
                });

                console.log('multi', multi);

                this.dashboardPiloteService.GetDmtCalcule(idPrest, year, codeTarif).subscribe(
                  (dmtCalculeData) => {
                    const dmtCalculeChart = Object.entries(dmtCalculeData).map(([key, value]) => ({ name: key, value }));

                    multi.push({
                      name: 'DMT Calcule',
                      series: dmtCalculeChart.map(item => ({
                        name: item.name,
                        value: item.value,
                      })).sort((a, b) => {
                        const monthOrder = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
                        return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
                      })
                    });

                    console.log('multi', multi);
                    this.chartData = multi;
                    console.log(this.chartData);
                  },
                  error => {
                    console.log(error);
                  }
                );
              },
              error => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  getPres( NomPres: any): void{
    this.prestationService.getPrestationByNom(NomPres).subscribe(
      (pres: any) => {
        this.getTarifPres(pres, pres.idPrestation);
       // this.pres  = pres ;
      //  this.idpres = pres.idPrestation;
        console.log('pres:', pres);
      //  this.idpres = pres.idPrestation ;

     //   console.log('pres:', this.pres);
        // Handle the staffing value as needed
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle the error message as needed
      }
    );
  //  console.log('pres:', this.pres);
    /*  if (typeof (this.pres) === undefined){
        console.log('undef');
      }
      else {


      }

     */

  }





  changeDropdownTarf(event: any): void {

  }

  changeDropdownPrest(event: any): void {
    console.log(event);
    this.getPres(event);
    console.log(event.idPrestation) ;

  }

  getTarifPres(data: any, idpres: any): void{
    this.kpiService.getTarifBypres(data).subscribe(
      (tarif: any[]) => {
        console.log(idpres);
        this.idpres = idpres;
        this.tarifs  = tarif ;
        this.dropTar = tarif;
        if (typeof (tarif) === undefined){
          console.log('il ya un prob') ;
        }
        else {
          this.tarifs = [];
          console.log('tarifs:', tarif);
       //   this.idpres = data.idPrestation ;

        }

      });
  }

  show(): void {
    this.getCtjYear( this.idpres , this.dropYear , this.nbjour, this.selectedTarif);
  }

  changeDropdownYear($event: any) {

  }
}
