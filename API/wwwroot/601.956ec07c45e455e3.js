"use strict";(self.webpackChunkClient=self.webpackChunkClient||[]).push([[601],{7601:(A,u,s)=>{s.r(u),s.d(u,{UnitsModule:()=>k});var m=s(6814),_=s(7157),d=s(8109),r=s(6223),t=s(9212),h=s(3611),g=s(2051),a=s(2500),b=s(9947),f=s(2296);const C=(o,l)=>l.id;function x(o,l){if(1&o){const n=t.EpF();t.TgZ(0,"ul",16)(1,"li",17)(2,"a",18),t.NdJ("click",function(){t.CHM(n);const e=t.oxw().$implicit,c=t.oxw(2),p=t.MAs(19);return t.KtG(c.openModal(p,e))}),t._uU(3,"Editar"),t.qZA()(),t._UZ(4,"li",19),t.TgZ(5,"li",17)(6,"a",20),t.NdJ("click",function(){t.CHM(n);const e=t.oxw().$implicit,c=t.oxw(2);return t.KtG(c.onDelete(e.id))}),t._uU(7,"Deletar"),t.qZA()()()}}function U(o,l){if(1&o&&(t.TgZ(0,"tr")(1,"th",7)(2,"strong",8),t._uU(3),t.qZA()(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td",9)(7,"div",10)(8,"button",11)(9,"span",12),t._UZ(10,"i",13),t.qZA(),t.TgZ(11,"span",14),t._uU(12,"Split button!"),t.qZA()(),t.YNc(13,x,8,0,"ul",15),t.qZA()()()),2&o){const n=l.$implicit;t.xp6(3),t.hij("# ",n.id,""),t.xp6(2),t.hij(" ",n.name," ")}}function Z(o,l){if(1&o&&t.SjG(0,U,14,2,"tr",null,C),2&o){const n=t.oxw();t.wJu(n.units)}}function v(o,l){if(1&o){const n=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(2);return t.KtG(e.onEdit())}),t._uU(1,"Editar"),t.qZA()}if(2&o){const n=t.oxw(2);t.Q6J("disabled",n.unitForm.invalid)}}function T(o,l){if(1&o){const n=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(2);return t.KtG(e.onSubmit())}),t._uU(1,"Criar"),t.qZA()}if(2&o){const n=t.oxw(2);t.Q6J("disabled",n.unitForm.invalid)}}function M(o,l){if(1&o){const n=t.EpF();t.TgZ(0,"div",21)(1,"h4",22),t._uU(2,"Unidade"),t.qZA(),t.TgZ(3,"button",23),t.NdJ("click",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.closeModal())}),t.TgZ(4,"span",24),t._uU(5,"\xd7"),t.qZA()()(),t.TgZ(6,"div",25)(7,"form",26),t._UZ(8,"app-text-input",27),t.TgZ(9,"div",28),t.YNc(10,v,2,1,"button",29)(11,T,2,1),t.qZA()()(),t.TgZ(12,"div",30)(13,"button",31),t.NdJ("click",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.closeModal())}),t._uU(14,"Fechar"),t.qZA()()}if(2&o){const n=t.oxw();t.xp6(7),t.Q6J("formGroup",n.unitForm),t.xp6(),t.Q6J("formControl",n.unitForm.controls.name)("label","Nome da Unidade"),t.xp6(2),t.um2(10,n.isEdit?10:11)}}const w=[{path:"",component:(()=>{class o{constructor(n,i,e,c){this.fb=n,this.unitsService=i,this.modalService=e,this.router=c,this.isEdit=!1,this.config={backdrop:!0,ignoreBackdropClick:!1},this.unitForm=this.createForm()}ngOnInit(){this.getUnits()}getUnits(){this.unitsService.getUnits().subscribe({next:n=>this.units=n})}onSubmit(){this.unitsService.createUnit(this.unitForm.value).subscribe({next:()=>{this.getUnits(),this.modalRef.hide(),this.isEdit=!1}})}onEdit(){this.unitsService.updateUnit(this.unitForm.value).subscribe({next:()=>{this.getUnits(),this.modalRef.hide(),this.clearEntity()}})}onDelete(n){this.unitsService.deleteUnit(n).subscribe({next:()=>{this.getUnits(),this.modalRef.hide()}})}openModal(n,i){this.modalRef=this.modalService.show(n,this.config),this.modalRef.onHide?.subscribe(e=>{"backdrop-click"===e&&this.clearEntity()}),this.modalRef.setClass("modal-lg"),i&&(this.isEdit=!0,this.unitForm.setValue({id:i.id,name:i.name}))}closeModal(){this.modalRef.hide(),this.clearEntity()}clearEntity(){this.unitForm=this.createForm(),this.isEdit=!1}createForm(){return this.fb.group({id:0,name:["",r.kI.required]})}static#t=this.\u0275fac=function(i){return new(i||o)(t.Y36(r.qu),t.Y36(h.X),t.Y36(g.tT),t.Y36(d.F0))};static#n=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-units"]],decls:20,vars:1,consts:[[1,"container"],["type","button",1,"btn","btn-light","new",3,"click"],[1,"table"],[1,"table","shadow-lg","p-1","mb-5","bg-white","rounded"],[1,"thead-dark","text-uppercase"],["scope","col"],["template",""],["scope","row"],[1,"ps-2"],[2,"width","200px"],["dropdown","",1,"btn-group"],["id","button-split","type","button","dropdownToggle","","aria-controls","dropdown-split",1,"dropdown-toggle","dropdown-toggle-split"],[1,"pe-1"],["aria-hidden","true",1,"fa","fa-ellipsis-h"],[1,"sr-only","visually-hidden"],["id","dropdown-split","class","dropdown-menu","role","menu","aria-labelledby","button-split",4,"dropdownMenu"],["id","dropdown-split","role","menu","aria-labelledby","button-split",1,"dropdown-menu"],["role","menuitem"],[1,"dropdown-item",3,"click"],[1,"divider","dropdown-divider"],[1,"dropdown-item","delete",3,"click"],[1,"modal-header"],[1,"modal-title","pull-left"],["type","button","aria-label","Close",1,"btn","close","pull-right",3,"click"],["aria-hidden","true"],[1,"modal-body"],[3,"formGroup"],[3,"formControl","label"],[1,"d-grid"],["mat-flat-button","","color","primary","type","submit",3,"disabled"],[1,"modal-footer"],["type","button",1,"btn","btn-default",3,"click"],["mat-flat-button","","color","primary","type","submit",3,"disabled","click"]],template:function(i,e){if(1&i){const c=t.EpF();t.TgZ(0,"div",0)(1,"button",1),t.NdJ("click",function(){t.CHM(c);const y=t.MAs(19);return t.KtG(e.openModal(y))}),t._uU(2,"Nova Unidade"),t.qZA(),t.TgZ(3,"div",2)(4,"table",3)(5,"thead",4)(6,"tr")(7,"th",5)(8,"strong"),t._uU(9,"C\xf3digo"),t.qZA()(),t.TgZ(10,"th",5)(11,"strong"),t._uU(12,"Descri\xe7\xe3o"),t.qZA()(),t.TgZ(13,"th",5)(14,"strong"),t._uU(15,"A\xe7\xe3o"),t.qZA()()()(),t.TgZ(16,"tbody"),t.YNc(17,Z,2,0),t.qZA()()(),t.YNc(18,M,15,4,"ng-template",null,6,t.W1O),t.qZA()}2&i&&(t.xp6(17),t.um2(17,e.units?17:-1))},dependencies:[r._Y,r.JJ,r.JL,r.oH,r.sg,a.Hz,a.Mq,a.TO,b.t,f.lW],styles:[".container[_ngcontent-%COMP%]{margin-top:.8rem;height:100vh}.delete[_ngcontent-%COMP%]:hover{background-color:red}.new[_ngcontent-%COMP%]{border-radius:0;background-color:#000;color:#fff}.new[_ngcontent-%COMP%]:hover{background-color:#fff;color:#000;border:1px solid black}.modal[_ngcontent-%COMP%]{width:60vw;height:60vh}table[_ngcontent-%COMP%]{margin-top:.5rem}tbody[_ngcontent-%COMP%]{min-height:400px}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{font-size:.8rem;padding:5px 15px;margin:0}td[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:20px;align-content:center;border:none}#button-split[_ngcontent-%COMP%]{border-radius:0}#button-split[_ngcontent-%COMP%]:hover{border:2px solid blue}#dropdown-split[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{text-align:center}"]})}return o})()},{path:"**",redirectTo:"",pathMatch:"full"}];let F=(()=>{class o{static#t=this.\u0275fac=function(i){return new(i||o)};static#n=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[d.Bz.forChild(w),d.Bz]})}return o})(),k=(()=>{class o{static#t=this.\u0275fac=function(i){return new(i||o)};static#n=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[m.ez,_.m,F]})}return o})()}}]);