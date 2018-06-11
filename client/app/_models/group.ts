import {User} from "./user";

export class Group {
    admin : User;
    id: string;
    groupname: string;
    users: User[];
}