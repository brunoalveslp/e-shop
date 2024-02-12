import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { DeliveryMethodsService } from '../delivery-methods.service';

@Component({
  selector: 'app-delivery-methods',
  templateUrl: './delivery-methods.component.html',
  styleUrl: './delivery-methods.component.scss',
})
export class DeliveryMethodsComponent implements OnInit {
  deliveryMethods: DeliveryMethod[];
  modalRef: BsModalRef;
  isEdit: boolean = false;

  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };

  constructor(
    private fb: FormBuilder,
    public deliveryMethodsService: DeliveryMethodsService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  deliveryMethodForm = this.createForm()

  ngOnInit(): void {
    this.getDeliveryNethods();
  }

  getDeliveryNethods() {
    this.deliveryMethodsService.getDeliveryMethods().subscribe({
      next: (deliveryMethods) => (this.deliveryMethods = deliveryMethods),
    });
  }

  onSubmit() {
    this.deliveryMethodsService.createDeliveryMethod(this.deliveryMethodForm.value as DeliveryMethod).subscribe({
      next: () => {
        this.getDeliveryNethods();
        this.modalRef.hide();
        this.isEdit = false;
      },
    });
  }

  onEdit() {
    this.deliveryMethodsService.updateDeliveryMethod(this.deliveryMethodForm.value as DeliveryMethod).subscribe({
      next: () => {
        this.getDeliveryNethods();
        this.modalRef.hide();
        this.clearEntity();
      },
    });
  }

  onDelete(id: number) {
    this.deliveryMethodsService.deleteDeliveryMethod(id).subscribe({
      next: () => {
        this.getDeliveryNethods();
        this.modalRef.hide();
      },
    });
  }

  openModal(template: TemplateRef<any>, entity?: DeliveryMethod) {
    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHide?.subscribe((reason: string | any) => {
      if (reason === 'backdrop-click') {
        this.clearEntity();
      }
    });
    this.modalRef.setClass('modal-lg');

    if (entity) {
      this.isEdit = true;
      this.deliveryMethodForm.setValue({
        shortName: entity.shortName,
        deliveryTime: entity.deliveryTime,
        description: entity.description,
        price: entity.price,
        id: entity.id
      });
    }
  }

  closeModal() {
    this.modalRef.hide();
    this.clearEntity();
  }

  clearEntity() {
    this.deliveryMethodForm = this.createForm()
    this.isEdit = false;
  }

  createForm(){
    return this.fb.group({
      shortName: ['', Validators.required],
      deliveryTime: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      id: 0
    });
  }
}
