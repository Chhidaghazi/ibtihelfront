import { Pm } from '../models/Pm';

import { ActeTraitement } from './ActeTraitement';

export class Nropm extends ActeTraitement {
    uniteIntervention?:String  | null;
    cog?:String  | null;
    dateReafectation?:Date;
    dateLivraisonReaffectation?:Date;
    motifReaffectation?:String;
    statutTravaux?:boolean;
    pms: Pm[]=[];


}