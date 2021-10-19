import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultBills = [];
    for(const post of value){
      if(post.DocumentoCliente.indexOf(arg) > -1){
        resultBills.push(post);
      };
    };
    return resultBills;
  }
}
