import {User} from "./user";
import {Paire} from "./paire";

export class Analyse {
    _id: string;
    utilisateur: User;
    idarticle: string;
    langue: string;
    argumentation: string;
    vocabulaire: Paire[];
    tradution: Paire[];
    grammaire: Paire[];
    ig: string[];
    liensExterne: string[];
    argumentationScore: string;
    vocabulaireScore: string;
    traductionScore: string;
    grammaireScore: string;
    igScore: string;
    liensExterneScore: string;
    totalScore: string;
}