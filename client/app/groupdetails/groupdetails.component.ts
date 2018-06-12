import {Component, OnInit} from '@angular/core';
import {Analyse, Exercice, Group, User} from "../_models/index";
import {AlertService, GroupService, UserService, AuthenticationService, ExerciceService} from "../_services/index";
import {ActivatedRoute, Params, Router} from "@angular/router";
import 'rxjs/add/operator/filter';


@Component({
    moduleId: module.id,
    templateUrl: 'groupdetails.component.html'
})

export class GroupdetailsComponent implements OnInit {
    currentUser: User;
    group: Group;
    exercices: Exercice[] = [];
    libExo: Exercice[] = [];
    myAnalyses: Analyse[] = [];
    users: User[];
    groupName: string;
    loading = false;

    constructor(private groupService: GroupService,
                private exerciceService: ExerciceService,
                private route: ActivatedRoute,
                private alertService: AlertService,
                private router: Router,
                private authService: AuthenticationService,
                private activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        this.loading = true;
        this.getGroup();
        this.route.queryParams
            .filter(params => params.groupname)
            .subscribe(params => {
                this.groupName = params.groupname;
            });
        this.authService.me().subscribe( user => {
            this.setUser(user);
        });
    }

    private getGroup() {
        this.groupService.getAll().subscribe( groups => {
            for (let group of groups) {
                if (group.groupname === this.groupName) {
                    this.group = group;
                    this.getExercices();
                }
            }
        });
    }

    private getExercices() {
        this.exerciceService.getAll().subscribe( exercices => {
            this.exercices = exercices;
            this.repartExercices();
        })
    }

    private repartExercices() {
        for(let exo of this.exercices) {
            if(!this.groupContains(exo, this.group.exercices)) {
                this.libExo.push(exo);
            }
        }
        this.repartAnalyse();
    }

    private repartAnalyse() {
        if(this.currentUser.id !== this.group.admin.id) {
            for(let exo of this.group.exercices) {
                for(let analyse of exo.resolutions) {
                    if(analyse.user.id === this.currentUser.id) {
                        analyse.titleArticle = exo.title;
                        analyse.idarticle = exo.id;
                        this.myAnalyses.push(analyse);
                    }
                }
            }
        } else {
            for(let exo of this.group.exercices) {
                for(let analyse of exo.resolutions) {
                    if(this.isMember(analyse.user.id)) {
                        analyse.titleArticle = exo.title;
                        analyse.idarticle = exo.id;
                        this.myAnalyses.push(analyse);
                    }
                }
            }
        }
        this.loading = false;
    }

    private groupContains(exo: Exercice, exos: Exercice[]) {
        let isPresent = false;
        for(let e of exos) {
            if (e.id === exo.id) {
                isPresent = true;
            }
        }
        return isPresent;
    }

    private addUserAtGroup(username: string) {
        this.group.users.push( this.users.find( function(user) {
            return user.username === username;
        }));
        this.groupService.update(this.group)
            .subscribe(
            data => {
                this.alertService.success( username + ' ajouté au groupe', true);
                this.goToGroupDetails(this.group.groupname);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    private deleteUserAtGroup(username: string) {
        this.group.users = this.group.users.filter(user => user.username !== username)
        this.groupService.update(this.group)
            .subscribe(
                data => {
                    this.alertService.success( username + ' supprimé au groupe', true);
                    this.goToGroupDetails(this.group.groupname);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    goToGroupDetails(groupname: string) {
        const queryParams: Params = Object.assign({}, this.activatedRoute.snapshot.queryParams);
        queryParams['groupname'] = groupname;
        this.router.navigate(['/group'], { queryParams: queryParams });
    }

    private userInGroup(username: string){
        if (username === this.group.admin.username) {
            return true;
        }
        for (let user of this.group.users) {
            if (user.username === username){
                return true;
            }
        }
        return false;
    }

    deleteGroup() {
        if(confirm("Confirmer la suppresion du groupe ? ")) {
            this.groupService.delete(this.group.id).subscribe(() => { this.router.navigate(['/mygroups']) });
        }
    }

    join() {
        this.groupService.joinGroup(this.group)
            .subscribe(
                data => {
                    this.alertService.success( 'Vous avez rejoint le groupe', true);
                    this.group.users.push(this.currentUser);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    leave() {
        if(confirm('Confirmer le départ du groupe ?')){
            this.groupService.leaveGroup(this.group)
                .subscribe(
                    data => {
                        this.router.navigate(['/mygroups']);
                    },
                    error => {
                        //this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }

    kick(user: User) {
        if(confirm('Confirmer l\'exclusion de ' + user.username + ' ?')){
            this.groupService.kickUser(this.group, user)
                .subscribe(
                    data => {
                        let indiceUser = this.group.users.indexOf(user, 0);
                        if (indiceUser > -1) {
                            this.group.users.splice(indiceUser, 1);
                        }
                        this.alertService.success( user.username + ' a était exclus', true);
                    },
                    error => {
                        //this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }

    delExo(exercice: Exercice) {
        if(confirm('Confirmer la desactivation de l\'exercice ?')) {
            this.exerciceService.unlinkTo(exercice, this.group)
                .subscribe(
                    data => {
                        let indiceExo = this.group.exercices.indexOf(exercice, 0);
                        if (indiceExo > -1) {
                            this.group.exercices.splice(indiceExo, 1);
                            this.libExo.push(exercice);
                        }
                        this.alertService.success( exercice.title + ' a était désactivé', true);
                    },
                    error => {
                        //this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }

    back(){
        this.router.navigate(['/mygroups']);
    }

    beMember() {
        let flag = false;
        for (let user of this.group.users){
            if (user.id === this.currentUser.id) {
                flag = true;
            }
        }
        return flag;
    }

    isMember(userId: string){
        let flag = false;
        for (let user of this.group.users){
            if (user.id === userId) {
                flag = true;
            }
        }
        return flag;
    }

    addExo(exo: Exercice) {
        this.exerciceService.linkTo(exo, this.group)
            .subscribe(
                data => {
                    let indiceExo = this.libExo.indexOf(exo, 0);
                    if (indiceExo > -1) {
                        this.libExo.splice(indiceExo, 1);
                        this.group.exercices.push(exo);
                    }
                    this.alertService.success( exo.title + ' est maintenant visible', true);
                },
                error => {
                    //this.alertService.error(error);
                    this.loading = false;
                });
    }

    goAnalyse(id: string) {
        let analyse: Analyse = null;

        for(let a of this.myAnalyses){
            if(a.idarticle === id) {
                analyse = a;
            }
        }
        if(analyse !== null) {
            const queryParams: Params = Object.assign({});
            queryParams['idAnalyse'] = analyse.id;
            this.router.navigate(['/analyse'], { queryParams: queryParams });
        } else {
            const queryParams: Params = Object.assign({});
            queryParams['idArticle'] = id;
            this.router.navigate(['/analyse'], { queryParams: queryParams });
        }
    }

    modifAnalyse(analyse: Analyse) {
        const queryParams: Params = Object.assign({});
        queryParams['idAnalyse'] = analyse.id;
        this.router.navigate(['/analyse'], { queryParams: queryParams });
    }

    corriger(analyse: Analyse) {
        const queryParams: Params = Object.assign({});
        queryParams['idAnalyse'] = analyse.id;
        this.router.navigate(['/correction'], { queryParams: queryParams });
    }

    private setUser(user: User) {
        this.currentUser = user;
    }
}
