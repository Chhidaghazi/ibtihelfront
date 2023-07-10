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


import { Prestation } from 'src/app/models/Prestation';

import { ActeTraitement } from 'src/app/models/ActeTraitement';

import { ActeTraitementService } from 'src/app/services/acte-traitement.service';

import { Desat } from 'src/app/models/Desat';

import { Esimb } from 'src/app/models/esimb.model';

import { Graphic } from 'src/app/models/Graphic';

import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { Motif } from 'src/app/models/Motif';
import { TypeElement } from 'src/app/models/TypeElement';
import { MotifService } from 'src/app/services/motif.service';
import { TypeElementService } from 'src/app/services/type-element.service';
import { EsimbService } from 'src/app/services/esimb.service';
import { DesatService } from 'src/app/services/desat.service';
import { Tarification } from 'src/app/models/Tarification';

declare var $: any;







@Component({

    selector: 'app-backlog',

    templateUrl: './backlog.component.html',

    styleUrls: ['./backlog.component.css']

})

export class BacklogComponent implements OnInit {





    isLoggedIn = false;

    private roles: string[] = [];

    isPilote = false;

    role = '';

    cuid = '';

    colabsteam?: Collaborateur[];

    actes: any[] = [];



    current_object = new ActeTraitement();

    pms: Pm[] = [];

    current_nropm: Nropm = {

        refTacheBPU: '',
        type_prestation: new Prestation,
        type_element: 'FIBRE',
        quantite: 1,
        dateReception: new Date(),
        dateLivraison: new Date(),
        dateValidation: new Date(),
        affectation: this.tokenStorageService.getUser().username,
        duree: 1,
        commentaire: null,
        motif: 'enAttente',
        statutFacturation: 'enCoursCds',
        dateReprise: '',
        repriseFacturable: '',
        uniteIntervention: null,
        cog: null,
        dateReafectation: new Date(),
        dateLivraisonReaffectation: new Date(),
        motifReaffectation: '',
        statutTravaux: false,
        pms: this.pms,
        dateDeadline: null,
        priorite: 'P1',
        tarif: new Tarification()

    };

    currentEsimb = new Esimb();

    currentDesat = new Desat();




    typePrestation = 'Lien NRO-PM';

    id = '';

    message = '';

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    motifsNropm: Motif[] = [];

    typesElementsnNropm: TypeElement[] = [];

    motifsDesat: Motif[] = [];

    typesElementsnDesat: TypeElement[] = [];

    motifsEsimb: Motif[] = [];

    typesElementsnEsimb: TypeElement[] = [];





    constructor(private tokenStorageService: TokenStorageService,
                private acteTraitementService: ActeTraitementService,
                private pmService: PmService,
                private collaborateurService: CollaborateurService,
                private location: Location,
                private nropmService: NropmService,
                private motifService: MotifService,
                private typeElementService: TypeElementService,
                private esimbService: EsimbService,
                private desatService: DesatService,
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

                console.log('this is Pilote');

            } else {

                this.isPilote = false;

                console.log('this is not Pilote' + this.roles);

            }

            this.getAllActes();
            this.getMotifs();
            this.getTypesElements();
            this.reserverPms2();

        }

        this.dtOptions = {
            destroy: true,
            responsive: true,
            pagingType: 'full_numbers',
            pageLength: 10,
            searching: false,
            ordering: false,

        };


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



    getAllActes(): void {

        console.log('cuid sent : ' + this.cuid);

        this.acteTraitementService.getActesNontraites()

            .subscribe(

                data => {
                    this.actes = data;
                    this.dtTrigger.next();
                    console.log(this.actes);
                },

                error => {

                    console.log(error);

                });


    }


    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }


    updatePriorite(): void {

        if (this.current_object !== undefined) {

            this.acteTraitementService.modifierPriorite(this.current_object.idacte, this.current_object)

                .subscribe(

                    res => {

                        console.log(res);
                        document.getElementById('modifierPriorite')?.click();
                        $('#example').DataTable().destroy();
                        this.getAllActes();

                    },

                    error => {

                        console.log(error);

                    });

        }



    }



    getActe(acteTraitement: any): void {


        if (typeof acteTraitement.idacte === 'string') {

            this.acteTraitementService.getActe(acteTraitement.idacte)

                .subscribe(

                    data => {


                        console.log(data);

                        this.current_object = data;

                        console.log(this.current_object);

                        this.current_object.dateLivraison = null;



                        let laDate = new Date();
                        if (this.current_object.dateReception !== undefined) {
                            laDate = new Date(this.current_object.dateReception);
                        }



                        if (laDate !== undefined) {


                            let day = ('0' + laDate.getDate()).slice(-2);
                            let month = ('0' + (laDate.getMonth() + 1)).slice(-2);

                            let datereception = laDate.getFullYear() + '-' + (month) + '-' + (day);



                            $('#dateReception1').val(datereception);
                            $('#dateReception3').val(datereception);
                            $('#dateReception4').val(datereception);

                        }

                        if (this.current_object.type_prestation.nomPrestation == 'Lien NRO-PM') {
                            this.reserverPms2();
                            this.current_nropm = this.current_object as Nropm;
                        } else if (this.current_object.type_prestation.nomPrestation == 'Evolution statut IMB') {
                            this.currentEsimb = this.current_object as Esimb;
                            let now = new Date();

                            let day = ('0' + now.getDate()).slice(-2);
                            let month = ('0' + (now.getMonth() + 1)).slice(-2);

                            let today = now.getFullYear() + '-' + (month) + '-' + (day);

                            $('#date_verification').val(today);

                            this.currentEsimb.dateVerification = now;


                        } else if (this.current_object.type_prestation.nomPrestation == 'Désaturations Coupleurs') {
                            this.currentDesat = this.current_object as Desat;



                        }










                    },

                    error => {

                        console.log(error);

                    });

        }




    }


    getActe2(acteTraitement: any): void {


        if (typeof acteTraitement.idacte === 'string') {

            this.acteTraitementService.getActe(acteTraitement.idacte)

                .subscribe(

                    data => {


                        console.log(data);

                        this.current_object = data;

                        console.log(this.current_object);

                        this.current_object.dateLivraison = null;



                        let laDate = new Date();
                        if (this.current_object.dateReception !== undefined) {
                            laDate = new Date(this.current_object.dateReception);
                        }



                        if (laDate !== undefined) {


                            let day = ('0' + laDate.getDate()).slice(-2);
                            let month = ('0' + (laDate.getMonth() + 1)).slice(-2);

                            let datereception = laDate.getFullYear() + '-' + (month) + '-' + (day);


                            $('#dateReception2').val(datereception);
                            $('#dateReception5').val(datereception);
                        }

                        if (this.current_object.type_prestation.nomPrestation == 'Lien NRO-PM') {

                            this.current_nropm = this.current_object as Nropm;
                            this.reserverPms2();
                            this.current_nropm.motif = 'enAttente';
                            this.current_nropm.duree = 1;
                            this.current_nropm.quantite = 1;
                            this.current_nropm.dateLivraison = null;
                            this.current_nropm.statutFacturation = 'enCoursCds';


                            this.nropmService.mettreEnCours(this.current_nropm.cog, this.current_nropm)
                                .subscribe(
                                    response => {
                                        console.log(response);
                                        this.message = response.message;
                                    },
                                    error => {
                                        console.log(error);
                                    });


                        }else if (this.current_object.type_prestation.nomPrestation == 'Désaturations Coupleurs'){

                            this.currentDesat = this.current_object as Desat;

                            this.currentDesat.motif = 'enAttente';
                            this.currentDesat.duree = 1;
                            this.currentDesat.quantite = 1;
                            this.currentDesat.dateLivraison = null;
                            this.currentDesat.statutFacturation = 'enCoursCds';


                            this.desatService.mettreEnCours(this.currentDesat.idacte, this.currentDesat)
                                .subscribe(
                                    response => {
                                        console.log(response);
                                        this.message = response.message;
                                    },
                                    error => {
                                        console.log(error);
                                    });

                        }




                    },

                    error => {

                        console.log(error);

                    });

        }




    }




    rechercherParId() {

        let ida = this.id;
        if (this.id == '') {
            ida = 'Pas d\'ID';
        }

        this.acteTraitementService.rechercherParId(this.typePrestation, ida)

            .subscribe(

                data => {

                    $('#example').DataTable().destroy();
                    this.actes = data;
                    this.dtTrigger.next();
                    console.log(this.actes);

                },

                error => {

                    console.log(error);

                });


    }



    refreshPage() {
        this.location.go(this.location.path());
        window.location.reload();
    }

    counter(i: number) {
        return new Array(i);
    }

    reserverPms2() {
        for (let i = 0; i < 100; i++) {

            let pm: Pm = {
                refPm: '',
                idActPm: '',
            };

            this.current_nropm.pms.push(pm);
        }

    }

    onChange(e: any) {

        if (e.target.value == 'enAttente') {

            $('#dateLivraison1').val('');
            $('#dateLivraison2').val('');

            $('#dateLivraison3').val('');

            $('#dateLivraison4').val('');

            $('#dateLivraison5').val('');



            if (this.current_object.type_prestation.nomPrestation == 'Lien NRO-PM') {
                this.current_nropm.dateLivraison = null;

                this.current_nropm.statutFacturation = 'enCoursCds';
            } else if (this.current_object.type_prestation.nomPrestation == 'Evolution statut IMB') {
                this.currentEsimb.dateLivraison = null;
                this.currentEsimb.statutFacturation = 'enCoursCds';
            }else if (this.current_object.type_prestation.nomPrestation == 'Désaturations Coupleurs') {
                this.currentDesat.dateLivraison = null;
                this.currentDesat.statutFacturation = 'enCoursCds';
            }

        } else {

            let now = new Date();

            let day = ('0' + now.getDate()).slice(-2);
            let month = ('0' + (now.getMonth() + 1)).slice(-2);

            let today = now.getFullYear() + '-' + (month) + '-' + (day);

            $('#dateLivraison1').val(today);
            $('#dateLivraison2').val(today);
            $('#dateLivraison3').val(today);
            $('#dateLivraison5').val(today);



            if (this.current_object.type_prestation.nomPrestation == 'Lien NRO-PM') {
                this.current_nropm.statutFacturation = 'facturable';
                this.current_nropm.dateLivraison = new Date();

            } else if (this.current_object.type_prestation.nomPrestation == 'Evolution statut IMB') {
                this.currentEsimb.dateLivraison = new Date();
                this.currentEsimb.statutFacturation = 'facturable';
            } else if (this.current_object.type_prestation.nomPrestation == 'Désaturations Coupleurs') {
                this.currentDesat.dateLivraison = new Date();
                this.currentDesat.statutFacturation = 'facturable';
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
                        document.getElementById('modifierNropm')?.click();
                        $('#example').DataTable().destroy();
                        this.getAllActes();

                    },
                    error => {
                        console.log(error);
                    });

        }


    }



    getMotifs(): void {

        console.log('cuid sent : ' + this.cuid);
        this.motifService.getMotifs('Lien NRO-PM')
            .subscribe(
                data => {
                    this.motifsNropm = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });


        this.motifService.getMotifs('Désaturations Coupleurs')
            .subscribe(
                data => {
                    this.motifsDesat = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });

        this.motifService.getMotifs('Evolution statut IMB')
            .subscribe(
                data => {
                    this.motifsEsimb = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });


    }

    getTypesElements(): void {

        console.log('cuid sent : ' + this.cuid);
        this.typeElementService.getTypesElements('Lien NRO-PM')
            .subscribe(
                data => {
                    this.typesElementsnNropm = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });

        this.typeElementService.getTypesElements('Désaturations Coupleurs')
            .subscribe(
                data => {
                    this.typesElementsnDesat = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });

        this.typeElementService.getTypesElements('Evolution statut IMB')
            .subscribe(
                data => {
                    this.typesElementsnEsimb = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });


    }

    traiterNropm(): void {

        this.current_nropm.dateValidation = this.current_nropm.dateLivraison;


        let pm2: Pm[] = [];

        for (let i = 0; i < this.current_nropm.quantite; i++) {

            let pm = this.current_nropm.pms[i];
            pm2.push(pm);

        }

        this.current_nropm.pms = pm2;
        console.log(this.current_nropm.pms.length + 'nombre final pms');
        console.log(this.current_nropm.pms);
        for (let pm of this.current_nropm.pms) {
            let idActPm = this.current_nropm.cog + '_' + pm.refPm;
            pm.idActPm = idActPm;

        }
        this.current_nropm.affectation = this.tokenStorageService.getUser().username;

        console.log('hhhhh', this.current_nropm);


        if (this.current_nropm !== undefined) {
            this.nropmService.traiterNropm(this.current_nropm.cog, this.current_nropm)
                .subscribe(
                    response => {
                        console.log(response);
                        this.message = response.message;
                        document.getElementById('traiterNropm')?.click();
                        $('#example').DataTable().destroy();
                        this.getAllActes();
                    },
                    error => {
                        console.log(error);
                    });

        }



    }



    annulerEncoursNropm(): void {

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

    annulerEncoursDesat(): void {

        this.desatService.annulerEnCours(this.currentDesat.idacte, this.currentDesat)
            .subscribe(
                response => {
                    console.log(response);
                    this.message = response.message;
                },
                error => {
                    console.log(error);
                });


    }


    updateEsimb(): void {

        this.esimbService.Update(this.currentEsimb.idacte, this.currentEsimb)
            .subscribe(
                response => {
                    console.log(response);
                    this.message = response.message ? response.message : 'This Acte was updated successfully!';
                    document.getElementById('modifierEsimb')?.click();
                    $('#example').DataTable().destroy();
                    this.getAllActes();
                },
                error => {
                    console.log(error);
                });
    }


    updateDesat(): void {

        this.desatService.Update(this.currentDesat.idacte, this.currentDesat)
            .subscribe(
                response => {
                    console.log(response);
                    document.getElementById('modifierDesat')?.click();
                    $('#example').DataTable().destroy();
                    this.getAllActes();

                },
                error => {
                    console.log(error);
                });


    }

    TraiterDesat(): void {

          this.desatService.traiter(this.currentDesat.idacte, this.currentDesat)
            .subscribe(
              response => {
                console.log(response);
                document.getElementById('traiterDesat')?.click();
                $('#example').DataTable().destroy();
                this.getAllActes();

              },
              error => {
                console.log(error);
              });


      }











}
