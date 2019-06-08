"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./home/index");
var index_2 = require("./login/index");
var index_3 = require("./register/index");
var index_4 = require("./_guards/index");
var index_5 = require("./mygroups/index");
var index_6 = require("./groupform/index");
var index_7 = require("./groupdetails/index");
var index_8 = require("./exerciceform/index");
var index_9 = require("./profil/index");
var analyseform_component_1 = require("./analyseform/analyseform.component");
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [index_4.AuthGuard] },
    { path: 'login', component: index_2.LoginComponent },
    { path: 'register', component: index_3.RegisterComponent },
    { path: 'mygroups', component: index_5.MygroupsComponent },
    { path: 'group/create', component: index_6.GroupformComponent },
    { path: 'group', component: index_7.GroupdetailsComponent },
    { path: 'exercice/create', component: index_8.ExerciceformComponent },
    { path: 'profil', component: index_9.ProfilComponent },
    { path: 'analyse', component: analyseform_component_1.AnalyseformComponent },
    { path: 'correction', component: analyseform_component_1.AnalyseformComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map