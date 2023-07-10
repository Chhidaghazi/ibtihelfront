import { Prestation } from 'src/app/models/Prestation';

export class Attachement{
    idacte?: String;
    codeIMB?:String;
    codeBanbou?:String;
    type_prestation?: Prestation;
    typeelement?: String;
    quantite?: Number;
    prix_BPU?: Number;
    prix_total?: Number;
    tarif?: String; 
}