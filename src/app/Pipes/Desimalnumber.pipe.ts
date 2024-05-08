import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'desimalnumber' })


export class DesimalnumberPipe implements PipeTransform {
    transform(value: any, exponent = 1): any {
        var y :any  = Number.parseFloat(value).toFixed(2);
        var x :any=''+y;
        x=x.toString();
        var afterPoint = '';
        if(x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'),x.length);
        x = Math.floor(x);
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '') lastThree = ',' + lastThree;
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        
    }
}