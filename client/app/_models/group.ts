import {User} from "./user";

export class Group {
    _id: string;
    groupname: string;
    adminname: string;
    users: User[];
}