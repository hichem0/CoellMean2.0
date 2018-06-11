import {User} from "./user";

export class Exercice {
    id: string;
    title: string;
    articleContenu: string;
    publishDate: string;
    source: string;
    creator: User;
    domain: string;
    lang: string;
    maxGradeVocab: string;
    maxGradeTrad: string;
    maxGradeGramar: string;
    maxGradeGlobalIdee: string;
    maxGradeArgumentation: string;
    maxGradeExternalLinks: string;
}