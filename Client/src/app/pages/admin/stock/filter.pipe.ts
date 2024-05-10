import { Pipe, PipeTransform } from '@angular/core';
import { StockMoviment } from 'src/app/shared/models/stockMoviment';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: StockMoviment[], filter: string): StockMoviment[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item =>
      item.sizeName.toLowerCase().includes(filter.toLowerCase()) ||
      (item.productName.toLowerCase().includes(filter) &&
              item.sizeName.toLowerCase() == filter) ||
      item.productId.toString().includes(filter.toLowerCase()) ||
      item.id.toString().includes(filter.toLowerCase()) ||
      item.quantity.toString().includes(filter.toLowerCase()) ||
      item.movimentType.toLowerCase().includes(filter.toLowerCase())
    );
  }

}
