import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
    private IMAGE_URL: any;

    ngOnInit(): void {
        this.IMAGE_URL = require('../ressources/logo.png');
    }

}