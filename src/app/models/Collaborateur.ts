import { Equipe } from "./Equipe";

export class Collaborateur{
    cuid?: String;
    nom?: String;
    prenom?: String;
    adresse?: String;
    mdp?: String;
    dateInscription?: Date | null;
    fonction?: String;
    equipe: Equipe=new Equipe();
    photo?: String;
    telephone?: String;
    active= false;
    email?: String;

    

}