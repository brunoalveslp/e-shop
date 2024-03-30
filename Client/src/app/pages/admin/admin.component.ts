import { Component} from '@angular/core';
import { ListOfLinks } from 'src/app/shared/models/listOfLinks';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  public listOfProductslinks: ListOfLinks[] = [
    {route: 'products', title: 'Produtos'},
    {route: 'types', title: 'Tipos'},
    {route: 'brands', title: 'Marcas'},
    {route: 'units', title: 'Unidades'},
  ];

  public listOfOrderslinks: ListOfLinks[] = [
    {route: 'deliveryMethod', title: 'Tipo de Entrega'},
  ];
}

interface tamanho {
  id: number;
  name: string;
  isActive: boolean;
}


interface grade {
  id: string;
  name: string;
  tamanhos: tamanho[]
}
