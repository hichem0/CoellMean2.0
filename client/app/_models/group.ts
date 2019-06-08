import {User} from "./user";
import {Exercice} from "./exercice";

export class Group {
    admin : User;
    id: string;
    groupname: string;
    users: User[];
    exercices: Exercice[];
}