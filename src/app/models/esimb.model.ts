import { ActeTraitement } from 'src/app/models/ActeTraitement';

export class Esimb extends ActeTraitement {
  
  codeBanbou?: String;
  codeIMB?:String;
  dateVerification?: Date;
  commentairetechnique?: String;
  commentairedemandeur?: String;
}