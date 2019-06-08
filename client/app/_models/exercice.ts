import {User} from "./user";
import {Analyse} from "./analyse";

export class Exercice {
    id: string;
    title: string;
    articleContenu: string;
    publishDate: string;
    source: string;
    creator: User;
    domain: string;
    lang: string;
    maxGradeVocab: number;
    maxGradeTrad: number;
    maxGradeGramar: number;
    maxGradeGlobalIdee: number;
    maxGradeArgumentation: number;
    maxGradeExternalLinks: number;
    resolutions: Analyse[];
}