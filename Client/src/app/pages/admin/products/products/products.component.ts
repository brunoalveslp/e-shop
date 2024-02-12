import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/pages/shop/shop.service';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ProductsService } from '../products.service';
import { Unit } from 'src/app/shared/models/unit';
import { Brand } from 'src/app/shared/models/brand';
import { Type } from 'src/app/shared/models/type';
import { UnitsService } from '../../units/units.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  @ViewChild('search') searchTerm? : ElementRef;
  public products: Product[] = [];
  public types: Type[] = [];
  public brands: Brand[] = [];
  public units: Unit[] = [];
  public shopParams: ShopParams = new ShopParams();
  public totalCount: number = 0;

  modalRef: BsModalRef;
  isEdit = false;

  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  productForm = this.createForm();

  constructor(private shopService: ShopService, private UnitsService: UnitsService, private productsService: ProductsService, private fb: FormBuilder,  private modalService: BsModalService,private router: Router){}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
    this.getUnits();
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response => this.brands = response,
      error: error => console.assert(error)
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe({
      next: response => this.types = response,
      error: error => console.assert(error)
    });
  }

  getUnits(){
    this.UnitsService.getUnits().subscribe({
      next: response => this.units = response,
      error: error => console.assert(error)
    });
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        this.shopParams.pageSize = response.pageSize;
        this.shopParams.pageNumber = response.pageIndex;
        this.totalCount = response.count;
      },
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

  onDelete(id: number){
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.getProducts()
        this.modalRef.hide()
      }
    })
  }

  openModal(template: TemplateRef<any>,entity?:Product) {

    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHide?.subscribe((reason: string | any) => {
      if(reason === 'backdrop-click') {
        this.clearEntity();
      }
    });
    this.modalRef.setClass('modal-lg');

    if(entity){
      this.isEdit = true;
     this.productForm.setValue({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      pictureUrl: entity.pictureUrl,
      aditionalPicturesUrls: entity.aditionalPicturesUrls,
      weight: entity.weight,
      quantity: entity.quantity,
      productType: entity.productType,
      productUnit: entity.productUnit,
      productBrand: entity.productBrand,
     });
     console.log(entity.productType)
    }
 }

 closeModal(){
   this.modalRef.hide();
   this.clearEntity();
 }

 onSubmit(){
  this.productsService.updateProduct(this.productForm.value as Product).subscribe({
    next: () => {
      this.getProducts()
      this.modalRef.hide()
    }
  });
}

onEdit() {
  this.productsService.updateProduct(this.productForm.value as Product).subscribe({
    next: () => {
      this.getProducts()
      this.modalRef.hide()
      this.clearEntity()
    }
  });
}

 clearEntity() {
  this.productForm = this.createForm()
  this.isEdit = false;
}

createForm(){
  return this.fb.group({
    id: 0,
    name: '',
    description: '',
    price: 0,
    pictureUrl: '',
    aditionalPicturesUrls: [['']],
    weight: 0,
    quantity:0,
    productUnit: undefined,
    productType: undefined,
    productBrand: undefined,
  });
}
}
