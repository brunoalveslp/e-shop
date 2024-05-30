import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from 'src/app/pages/shop/shop.service';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ProductsService } from '../products.service';
import { Unit } from 'src/app/shared/models/unit';
import { Brand } from 'src/app/shared/models/brand';
import { Type } from 'src/app/shared/models/type';
import { UnitsService } from '../../units/units.service';
import { ProductSize } from 'src/app/shared/models/productSize';
import { Size } from 'src/app/shared/models/size';
import { SizesComponent } from 'src/app/shared/components/sizes/sizes.component';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  public products: Product[] = [];
  public types: Type[] = [];
  public brands: Brand[] = [];
  public units: Unit[] = [];
  public sizes: Size[] = []
  public productSizes: ProductSize[] = [];
  public shopParams: ShopParams = new ShopParams();
  public totalCount: number = 0;
  public productImage: File | undefined;
  public productAditionalImages: File[] = [];
  public quantityOfAditionalImages: number = 0;
  lastId = 0;
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'action'];


  modalRef: BsModalRef;
  isEdit = false;

  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };

  productForm = this.createForm();

  constructor(
    private shopService: ShopService,
    private UnitsService: UnitsService,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
    this.getUnits();
    this.getSizes();
    this.getProducts();
    this.lastId = this.products[this.products.length - 1].id + 1;
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) =>
        (this.brands = [{ id: 0, name: 'Selecionar...' }, ...response.sort((a, b) => a.id - b.id)]),
      error: (error) => console.assert(error),
    });
  }

  getSizes() {
    this.productsService.getSizes().subscribe({
      next: (response) =>
        (this.sizes = [{ id: 0, name: 'Selecionar...', isActive: true }, ...response.sort((a, b) => a.id - b.id)]),
      error: (error) => console.assert(error),
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) =>
        (this.types = [{ id: 0, name: 'Selecionar...' }, ...response.sort((a, b) => a.id - b.id)]),
      error: (error) => console.assert(error),
    });
  }

  getUnits() {
    this.UnitsService.getUnits().subscribe({
      next: (response) =>
        (this.units = [{ id: 0, name: 'Selecionar...' }, ...response.sort((a, b) => a.id - b.id)]),
      error: (error) => console.assert(error),
    });

    this.productForm.patchValue({
      productUnit: 'Selecionar...',
      productBrand: 'Selecionar...',
      productType: 'Selecionar...',
    });
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data.sort((a, b) => a.id - b.id);
        this.shopParams.pageSize = response.pageSize;
        this.shopParams.pageNumber = response.pageIndex;
        this.totalCount = response.count;
      },
      error: (error) => console.assert(error),
    });
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';

    this.shopParams = new ShopParams();

    this.getProducts();
  }

  onDelete(id: number) {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.toastr.success('Produto deletado com sucesso!');
        this.getProducts();
      },
      error: () => this.toastr.error('Erro ao deletar produto!')
    });
  }

  openModal(template: TemplateRef<any>, entity?: Product) {
    if(entity?.productSizes){

      this.productSizes = entity.productSizes.map((size) => ({
        productSizeId: entity.id,
        sizeId: size.sizeId,
        size: size.size,
        quantity: size.quantity,
        isActive: size.isActive,
      }));
    }
    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHide?.subscribe((reason: string | any) => {
      if (reason === 'backdrop-click') {
        this.clearEntity();
      }
    });
    this.modalRef.setClass('modal-lg');


    if (entity) {
      this.isEdit = true;
      this.productForm.patchValue({
          id: entity.id,
          name: entity.name,
          description: entity.description,
          price: entity.price,
          pictureUrl: entity.pictureUrl,
          aditionalPicturesUrls: entity.aditionalPicturesUrls,
          weight: entity.weight,
          productSizes: entity.productSizes.map((size) => ({
              sizeId: size.sizeId,
              size: size.size,
              quantity: size.quantity,
              isActive: size.isActive,
          })),
          productType: entity.productType,
          productUnit: entity.productUnit,
          productBrand: entity.productBrand,
      });
  }
  }

  closeModal() {
    this.modalRef.hide();
    this.clearEntity();
  }

  onSubmit() {

    let formData = new FormData();

    Object.keys(this.productForm.controls).forEach((formControlName) => {
      if (formControlName == 'pictureUrl') {
        if (this.productImage) {
          formData.append('picture', this.productImage, this.productImage.name);
        }
      } else if (formControlName == 'aditionalPicturesUrls') {
        this.productAditionalImages.forEach((file) => {
          if (file) {
            formData.append('aditionalPictures', file, file.name);
          }
        });
      } else if(formControlName == 'productSizes'){
        formData.append(formControlName, JSON.stringify(this.productSizes))
      } else if (
        formControlName == 'productType' ||
        formControlName == 'productBrand' ||
        formControlName == 'productUnit'
      ) {
        formData.append(
          formControlName + 'Name',
          this.productForm.get(formControlName)?.value
        );
      }
      formData.append(
        formControlName,
        this.productForm.get(formControlName)?.value
      );
    });

    this.productsService.createProduct(formData).subscribe({
      next: () => {
        this.getProducts();
        this.modalRef.hide();
        this.clearEntity();
      },
    });
  }

  onEdit() {
    console.log(this.productImage);
  console.log(this.productAditionalImages);
    let formData = new FormData();
    Object.keys(this.productForm.controls).forEach((formControlName) => {
      if (formControlName == 'pictureUrl') {
        if (this.productImage) {
          formData.append('picture', this.productImage, this.productImage.name);
        }
      } else if (formControlName == 'aditionalPicturesUrls') {
        this.productAditionalImages.forEach((file) => {
          if (file) {
            formData.append('aditionalPictures', file, file.name);
          }
        });
      } else if(formControlName == 'productSizes'){
          formData.append(formControlName, JSON.stringify(this.productSizes))
      } else if (
        formControlName == 'productType' ||
        formControlName == 'productBrand' ||
        formControlName == 'productUnit'
      ) {
        formData.append(
          formControlName + 'Name',
          this.productForm.get(formControlName)?.value
        );
      } else {
        formData.append(
          formControlName,
          this.productForm.get(formControlName)?.value
        );
      }
    });
    if (formData) {
      this.productsService.updateProduct(formData).subscribe({
        next: () => {
          this.getProducts();
          this.modalRef.hide();
          this.clearEntity();
        },
      });
    }
  }

  clearEntity() {
    this.productForm = this.createForm();
    this.isEdit = false;
    this.quantityOfAditionalImages = 0;
    this.productSizes = [];
  }

  onAddImage(img: File) {
    this.productImage = img;
  }

  onAddAditionalImage(img: File) {
    this.productAditionalImages.push(img);
  }

  onRemoveImage(){
    this.productImage = undefined;
  }

  onRemoveAditionalImage(index: number, url: string | undefined){
    this.productAditionalImages.splice(index, 1);
    this.quantityOfAditionalImages -= 1;
    if(url) {
      this.productForm.value.aditionalPicturesUrls?.splice(this.productForm.value.aditionalPicturesUrls?.indexOf(url), 1);
    }
  }

  onAddIndex() {
    this.quantityOfAditionalImages += 1;
  }

  createRange(number: number) {
    // return new Array(number);
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

    createForm() {
      return this.fb.group({
        id: this.lastId,
        name: '',
        pictureUrl: '',
        description: '',
        price: 0.0,
        aditionalPicturesUrls: [['']],
        weight: 0.0,
        productUnit: new FormControl(),
        productType: new FormControl(),
        productBrand: new FormControl(),
        productSizes: this.fb.array([]),
      });
    }

  compareUnits(unit1: any, unit2: any) {
    return unit1 && unit2 ? unit1.id === unit2.id : unit1 === unit2;
  }
}
