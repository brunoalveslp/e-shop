import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Type } from 'src/app/shared/models/type';
import { TypesService } from '../user-roles.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/shared/models/roles';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss'
})



export class UserRolesComponent implements OnInit{



  roles: Role[];
  modalRef: BsModalRef;
  isEdit = false;

  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private fb: FormBuilder,public typesService: TypesService, private modalService: BsModalService,private router: Router){}


  typeForm = this.createForm();

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes(){
    this.typesService.getTypes().subscribe({
      next: types => this.types = types
    })
  };

  onSubmit(){
    this.typesService.updateType(this.typeForm.value as Type).subscribe({
      next: () => {
        this.getTypes()
        this.modalRef.hide()
      }
    });
  }

  onEdit() {
    this.typesService.updateType(this.typeForm.value as Type).subscribe({
      next: () => {
        this.getTypes()
        this.modalRef.hide()
        this.clearEntity()
      }
    });
  }

  onDelete(id: number){
    this.typesService.deleteType(id).subscribe({
      next: () => {
        this.getTypes()
        this.modalRef.hide()
      }
    })
  }

  openModal(template: TemplateRef<any>,entity?:Type) {

    this.modalRef = this.modalService.show(template, this.config);
    this.modalRef.onHide?.subscribe((reason: string | any) => {
      if(reason === 'backdrop-click') {
        this.clearEntity();
      }
    });
    this.modalRef.setClass('modal-lg');

    if(entity){
      this.isEdit = true;
     this.typeForm.setValue({
       id: entity.id,
       name: entity.name
     });
    }
 }

 closeModal(){
   this.modalRef.hide();
   this.clearEntity();
 }

 clearEntity() {
  this.typeForm = this.createForm()
  this.isEdit = false;
}

createForm(){
  return this.fb.group({
    id: 0,
    name: ['', Validators.required],
  });
}
}
