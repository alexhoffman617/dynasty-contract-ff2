import { Injectable } from '@angular/core';

@Injectable()
export class MobileDetectorService {
    isMobile;
    constructor() { 
        var ua = navigator.userAgent;
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
         this.isMobile = true;
        } else{
         this.isMobile = false;
        }
    }
}