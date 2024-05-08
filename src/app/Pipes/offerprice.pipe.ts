import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Offerprice' })
export class OfferpricePipe implements PipeTransform {
 
    transform(value: number, multiply: string): number { 
        let mul = parseFloat(multiply); 
        return mul * value 
    } 
}