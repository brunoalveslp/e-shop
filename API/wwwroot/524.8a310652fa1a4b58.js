"use strict";(self.webpackChunkClient=self.webpackChunkClient||[]).push([[524],{8524:(O,d,s)=>{s.r(d),s.d(d,{TypesModule:()=>U});var m=s(6814),c=s(8109),l=s(6223),t=s(9212),h=s(5516),_=s(9862);let g=(()=>{class o{constructor(e){this.http=e,this.baseUrl=h.N.apiUrl}getTypes(){return this.http.get(this.baseUrl+"producttypes")}getType(e){return this.http.get(this.baseUrl+"producttypes/"+e)}createType(e){return this.http.post(this.baseUrl+"producttypes/create",e)}updateType(e){return this.http.put(this.baseUrl+"producttypes/update",e)}deleteType(e){return this.http.delete(this.baseUrl+"producttypes/delete/"+e)}static#t=this.\u0275fac=function(n){return new(n||o)(t.LFG(_.eN))};static#e=this.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var y=s(2051),a=s(2500),b=s(9947),f=s(2296);const T=(o,r)=>r.id;function C(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"ul",16)(1,"li",17)(2,"a",18),t.NdJ("click",function(){t.CHM(e);const i=t.oxw().$implicit,p=t.oxw(2),u=t.MAs(19);return t.KtG(p.openModal(u,i))}),t._uU(3,"Editar"),t.qZA()(),t._UZ(4,"li",19),t.TgZ(5,"li",17)(6,"a",20),t.NdJ("click",function(){t.CHM(e);const i=t.oxw().$implicit,p=t.oxw(2);return t.KtG(p.onDelete(i.id))}),t._uU(7,"Deletar"),t.qZA()()()}}function x(o,r){if(1&o&&(t.TgZ(0,"tr")(1,"th",7)(2,"strong",8),t._uU(3),t.qZA()(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td",9)(7,"div",10)(8,"button",11)(9,"span",12),t._UZ(10,"i",13),t.qZA(),t.TgZ(11,"span",14),t._uU(12,"Split button!"),t.qZA()(),t.YNc(13,C,8,0,"ul",15),t.qZA()()()),2&o){const e=r.$implicit;t.xp6(3),t.hij("# ",e.id,""),t.xp6(2),t.hij(" ",e.name," ")}}function v(o,r){if(1&o&&t.SjG(0,x,14,2,"tr",null,T),2&o){const e=t.oxw();t.wJu(e.types)}}function Z(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(2);return t.KtG(i.onEdit())}),t._uU(1,"Editar"),t.qZA()}if(2&o){const e=t.oxw(2);t.Q6J("disabled",e.typeForm.invalid)}}function M(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(e);const i=t.oxw(2);return t.KtG(i.onSubmit())}),t._uU(1,"Criar"),t.qZA()}if(2&o){const e=t.oxw(2);t.Q6J("disabled",e.typeForm.invalid)}}function w(o,r){if(1&o){const e=t.EpF();t.TgZ(0,"div",21)(1,"h4",22),t._uU(2,"Tipo"),t.qZA(),t.TgZ(3,"button",23),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.closeModal())}),t.TgZ(4,"span",24),t._uU(5,"\xd7"),t.qZA()()(),t.TgZ(6,"div",25)(7,"form",26),t._UZ(8,"app-text-input",27),t.TgZ(9,"div",28),t.YNc(10,Z,2,1,"button",29)(11,M,2,1),t.qZA()()(),t.TgZ(12,"div",30)(13,"button",31),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.closeModal())}),t._uU(14,"Fechar"),t.qZA()()}if(2&o){const e=t.oxw();t.xp6(7),t.Q6J("formGroup",e.typeForm),t.xp6(),t.Q6J("formControl",e.typeForm.controls.name)("label","Nome do Tipo"),t.xp6(2),t.um2(10,e.isEdit?10:11)}}const F=[{path:"",component:(()=>{class o{constructor(e,n,i,p){this.fb=e,this.typesService=n,this.modalService=i,this.router=p,this.isEdit=!1,this.config={backdrop:!0,ignoreBackdropClick:!1},this.typeForm=this.createForm()}ngOnInit(){this.getTypes()}getTypes(){this.typesService.getTypes().subscribe({next:e=>this.types=e})}onSubmit(){this.typesService.createType(this.typeForm.value).subscribe({next:()=>{this.getTypes(),this.modalRef.hide()}})}onEdit(){this.typesService.updateType(this.typeForm.value).subscribe({next:()=>{this.getTypes(),this.modalRef.hide(),this.clearEntity()}})}onDelete(e){this.typesService.deleteType(e).subscribe({next:()=>{this.getTypes(),this.modalRef.hide()}})}openModal(e,n){this.modalRef=this.modalService.show(e,this.config),this.modalRef.onHide?.subscribe(i=>{"backdrop-click"===i&&this.clearEntity()}),this.modalRef.setClass("modal-lg"),n&&(this.isEdit=!0,this.typeForm.setValue({id:n.id,name:n.name}))}closeModal(){this.modalRef.hide(),this.clearEntity()}clearEntity(){this.typeForm=this.createForm(),this.isEdit=!1}createForm(){return this.fb.group({id:0,name:["",l.kI.required]})}static#t=this.\u0275fac=function(n){return new(n||o)(t.Y36(l.qu),t.Y36(g),t.Y36(y.tT),t.Y36(c.F0))};static#e=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-types"]],decls:20,vars:1,consts:[[1,"container"],["type","button",1,"btn","btn-light","new",3,"click"],[1,"table"],[1,"table","shadow-lg","p-1","mb-5","bg-white","rounded"],[1,"thead-dark","text-uppercase"],["scope","col"],["template",""],["scope","row"],[1,"ps-2"],[2,"width","200px"],["dropdown","",1,"btn-group"],["id","button-split","type","button","dropdownToggle","","aria-controls","dropdown-split",1,"dropdown-toggle","dropdown-toggle-split"],[1,"pe-1"],["aria-hidden","true",1,"fa","fa-ellipsis-h"],[1,"sr-only","visually-hidden"],["id","dropdown-split","class","dropdown-menu","role","menu","aria-labelledby","button-split",4,"dropdownMenu"],["id","dropdown-split","role","menu","aria-labelledby","button-split",1,"dropdown-menu"],["role","menuitem"],[1,"dropdown-item",3,"click"],[1,"divider","dropdown-divider"],[1,"dropdown-item","delete",3,"click"],[1,"modal-header"],[1,"modal-title","pull-left"],["type","button","aria-label","Close",1,"btn","close","pull-right",3,"click"],["aria-hidden","true"],[1,"modal-body"],[3,"formGroup"],[3,"formControl","label"],[1,"d-grid"],["mat-flat-button","","color","primary","type","submit",3,"disabled"],[1,"modal-footer"],["type","button",1,"btn","btn-default",3,"click"],["mat-flat-button","","color","primary","type","submit",3,"disabled","click"]],template:function(n,i){if(1&n){const p=t.EpF();t.TgZ(0,"div",0)(1,"button",1),t.NdJ("click",function(){t.CHM(p);const E=t.MAs(19);return t.KtG(i.openModal(E))}),t._uU(2,"Novo Tipo"),t.qZA(),t.TgZ(3,"div",2)(4,"table",3)(5,"thead",4)(6,"tr")(7,"th",5)(8,"strong"),t._uU(9,"C\xf3digo"),t.qZA()(),t.TgZ(10,"th",5)(11,"strong"),t._uU(12,"Descri\xe7\xe3o"),t.qZA()(),t.TgZ(13,"th",5)(14,"strong"),t._uU(15,"A\xe7\xe3o"),t.qZA()()()(),t.TgZ(16,"tbody"),t.YNc(17,v,2,0),t.qZA()()(),t.YNc(18,w,15,4,"ng-template",null,6,t.W1O),t.qZA()}2&n&&(t.xp6(17),t.um2(17,i.types?17:-1))},dependencies:[l._Y,l.JJ,l.JL,l.oH,l.sg,a.Hz,a.Mq,a.TO,b.t,f.lW],styles:[".container[_ngcontent-%COMP%]{margin-top:.8rem;height:100vh}.delete[_ngcontent-%COMP%]:hover{background-color:red}.new[_ngcontent-%COMP%]{border-radius:0;background-color:#000;color:#fff}.new[_ngcontent-%COMP%]:hover{background-color:#fff;color:#000;border:1px solid black}.modal[_ngcontent-%COMP%]{width:60vw;height:60vh}table[_ngcontent-%COMP%]{margin-top:.5rem}tbody[_ngcontent-%COMP%]{min-height:400px}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{font-size:.8rem;padding:5px 15px;margin:0}td[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:20px;align-content:center;border:none}#button-split[_ngcontent-%COMP%]{border-radius:0}#button-split[_ngcontent-%COMP%]:hover{border:2px solid blue}#dropdown-split[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{text-align:center}"]})}return o})()},{path:"**",redirectTo:"",pathMatch:"full"}];let k=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#e=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[c.Bz.forChild(F),c.Bz]})}return o})();var A=s(7157);let U=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#e=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[m.ez,A.m,k]})}return o})()}}]);