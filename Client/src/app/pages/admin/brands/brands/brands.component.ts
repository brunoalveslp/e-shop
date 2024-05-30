import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandsService } from '../brands.service';
import { Brand } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brands: Brand[];
  lastId = 0;
  modalRef: BsModalRef;
  isEdit: boolean = false;

  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };

  constructor(
    private fb: FormBuilder,
    public brandsService: BrandsService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  brandForm = this.createForm()

  ngOnInit(): void {
    this.getBrands();
    this.lastId = this.brands[this.brands.length - 1].id + 1;
  }

  getBrands() {
    this.brandsService.getBrands().subscribe({
      next: (brands) => (this.brands = brands),
    });
  }

  onSubmit() {
    this.brandsService.createBrand(this.brandForm.value as Brand).subscribe({
      next: () => {
        this.getBrands();
        this.modalRef.hide();
        this.isEdit = false;
      },
    });
  }

  onEdit() {
    this.brandsService.updateBrand(this.brandForm.value as Brand).subscribe({
      next: () => {
        this.getBrands();
        this.modalRef.hide();
        this.clearEntity();
      },
    });
  }

  onDelete(id: number) {
    this.brandsService.deleteBrand(id).subscribe({
      next: () => {
        this.getBrands();
        this.modalRef.hide();
      },
    });
  }

  openModal(template: TemplateRef<any>, entity?: Brand) {
    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHide?.subscribe((reason: string | any) => {
      if (reason === 'backdrop-click') {
        this.clearEntity();
      }
    });
    this.modalRef.setClass('modal-lg');

    if (entity) {
      this.isEdit = true;
      this.brandForm.setValue({
        id: entity.id,
        name: entity.name,
      });
    }
  }

  closeModal() {
    this.modalRef.hide();
    this.clearEntity();
  }

  clearEntity() {
    this.brandForm = this.createForm()
    this.isEdit = false;
  }

  createForm(){
    return this.fb.group({
      id: this.lastId,
      name: ['', Validators.required],
    });
  }
}
