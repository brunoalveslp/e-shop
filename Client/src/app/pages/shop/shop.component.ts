import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Product } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { Type } from 'src/app/shared/models/type';
import { ShopService } from './shop.service';
import { Size } from 'src/app/shared/models/size';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm? : ElementRef;
  public products: Product[] = [];
  public types: Type[] = [];
  sizes: Size[] = [];
  public brands: Brand[] = [];
  public shopParams: ShopParams = new ShopParams();
  public totalCount: number = 0;
  public sortOptions = [
    {name: 'Alfabeticamente', value: 'name'},
    {name: 'Pre;o: Menor para o Maior', value: 'priceAsc'},
    {name: 'Price: Maior para o Menor', value: 'priceDesc'},
  ]

  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
    this.getSizes();
  }

  getSizes() {
    this.shopService.getSizes().subscribe({
      next: (response) =>
        (this.sizes = response.sort((a, b) => a.id - b.id)),
      error: (error) => console.assert(error),
    });
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.products.forEach(p => {
          p.productSizes.forEach(ps => {
            let size = this.sizes.find(s => s.id == ps.sizeId)
            if(size){
              ps.size = size;
            }
          })
        });
        this.shopParams.pageSize = response.pageSize;
        this.shopParams.pageNumber = response.pageIndex;
        this.totalCount = response.count;
      },
      error: error => console.assert(error)
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{id: 0, name: 'Todas'}, ...response],
      error: error => console.assert(error)
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{id: 0, name:'Todos'}, ...response],
      error: error => console.assert(error)
    });
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any){
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';

    this.shopParams = new ShopParams();

    this.getProducts();
  }
}

