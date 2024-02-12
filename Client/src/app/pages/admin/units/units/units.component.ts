import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitsService } from '../units.service';
import { Unit } from 'src/app/shared/models/unit';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
})
export class UnitsComponent implements OnInit {
  units: Unit[];
  modalRef: BsModalRef;
  isEdit: boolean = false;

  config = {
    backdrop: true,
    ignoreBackdropClick: false,
  };

  constructor(
    private fb: FormBuilder,
    public unitsService: UnitsService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  unitForm = this.createForm()

  ngOnInit(): void {
    this.getUnits();
  }

  getUnits() {
    this.unitsService.getUnits().subscribe({
      next: (units) => (this.units = units),
    });
  }

  onSubmit() {
    this.unitsService.createUnit(this.unitForm.value as Unit).subscribe({
      next: () => {
        this.getUnits();
        this.modalRef.hide();
        this.isEdit = false;
      },
    });
  }

  onEdit() {
    this.unitsService.updateUnit(this.unitForm.value as Unit).subscribe({
      next: () => {
        this.getUnits();
        this.modalRef.hide();
        this.clearEntity();
      },
    });
  }

  onDelete(id: number) {
    this.unitsService.deleteUnit(id).subscribe({
      next: () => {
        this.getUnits();
        this.modalRef.hide();
      },
    });
  }

  openModal(template: TemplateRef<any>, entity?: Unit) {
    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHide?.subscribe((reason: string | any) => {
      if (reason === 'backdrop-click') {
        this.clearEntity();
      }
    });
    this.modalRef.setClass('modal-lg');

    if (entity) {
      this.isEdit = true;
      this.unitForm.setValue({
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
    this.unitForm = this.createForm()
    this.isEdit = false;
  }

  createForm(){
    return this.fb.group({
      id: 0,
      name: ['', Validators.required],
    });
  }
}
