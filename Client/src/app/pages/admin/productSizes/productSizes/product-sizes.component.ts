import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductSizesService } from '../product-sizes.service';
import { Size } from 'src/app/shared/models/size';

@Component({
  selector: 'app-product-sizes',
  templateUrl: './product-sizes.component.html',
  styleUrl: './product-sizes.component.scss'
})
export class ProductSizesComponent implements OnInit{
  sizes: Size[];
  modalRef: BsModalRef;
  isEdit = false;

  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private fb: FormBuilder,public productSizesService: ProductSizesService, private modalService: BsModalService,private router: Router){}


  sizeForm = this.createForm();

  ngOnInit(): void {
    this.getSizes();
  }

  getSizes(){
    this.productSizesService.getSizes().subscribe({
      next: sizes => this.sizes = sizes
    })
  };

  onSubmit(){
    this.productSizesService.createSize(this.sizeForm.value as Size).subscribe({
      next: () => {
        this.getSizes()
        this.modalRef.hide()
        this.clearEntity()
      }
    });
  }

  onEdit() {
    this.productSizesService.updateSize(this.sizeForm.value as Size).subscribe({
      next: () => {
        this.getSizes()
        this.modalRef.hide()
        this.clearEntity()
      }
    });
  }

  onDelete(id: number){
    this.productSizesService.deleteSize(id).subscribe({
      next: () => {
        this.getSizes()
        this.modalRef.hide()
      }
    })
  }

  openModal(template: TemplateRef<any>,entity?:Size) {

    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHide?.subscribe((reason: string | any) => {
      if(reason === 'backdrop-click') {
        this.clearEntity();
      }
    });
    this.modalRef.setClass('modal-lg');

    if(entity){
      this.isEdit = true;
     this.sizeForm.setValue({
       id: entity.id,
       name: entity.name,
       isActive: entity.isActive
     });
    }
 }

 closeModal(){
   this.modalRef.hide();
   this.clearEntity();
 }

 clearEntity() {
  this.sizeForm = this.createForm()
  this.isEdit = false;
}

createForm(){
  return this.fb.group({
    id: 0,
    name: ['', Validators.required],
    isActive: false
  });
}
}
