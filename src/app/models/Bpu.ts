import { Prestation } from 'src/app/models/Prestation';

export class Bpu{

    id?:any;
    refTacheBPU?:String;
    type_element?:String;
    pu?:number;
    dateDebut?:String;
    dateValidite?:String;
    dateExpiration?:String;
    type_penalite?: String;
    penalite?:String;
    type_prestation?:Prestation;
    version?: number;
    tarif?: String;

}