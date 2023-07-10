import { Prestation } from '../models/Prestation';
import { Tarification } from 'src/app/models/Tarification';

export class ActeTraitement{
    idacte?:any;
    refTacheBPU?:String;
    type_prestation= new Prestation() ;
    type_element?:String;
    quantite=1;
    dateReception?: Date;
    dateLivraison?: Date | null;
    dateValidation?: Date | null;
    affectation?:String;
    duree=1;
    commentaire?:String | null;
    motif?: String  ;
    statutFacturation?:String;
    dateReprise?:String;
    repriseFacturable?:String;
    dateDeadline?: Date | null;
    priorite="P1";
    tarif= new Tarification();


}