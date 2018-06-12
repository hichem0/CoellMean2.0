import {User} from "./user";
import {Paire} from "./paire";
import {Exercice} from "./exercice";

export class Analyse {
    id: string;
    user: User;
    idarticle: string;
    langue: string;
    argumentation: string;
    vocabulaire: Paire[];
    tradution: Paire[];
    grammaire: Paire[];
    globalIdea: string[];
    liensExterne: string[];
    argumentationScore: string;
    vocabulaireScore: string;
    traductionScore: string;
    grammaireScore: string;
    igScore: string;
    liensExterneScore: string;
    totalScore: string;
    titleArticle?: string;
    exercice?: Exercice;
}