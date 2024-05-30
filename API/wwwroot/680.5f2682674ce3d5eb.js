"use strict";(self.webpackChunkClient=self.webpackChunkClient||[]).push([[680],{4680:(E,p,i)=>{i.r(p),i.d(p,{BrandsModule:()=>A});var m=i(6814),h=i(7157),l=i(8109),s=i(6223),t=i(9212),b=i(5516),_=i(9862);let g=(()=>{class o{constructor(n){this.http=n,this.baseUrl=b.N.apiUrl}getBrands(){return this.http.get(this.baseUrl+"productbrands")}getBrand(n){return this.http.get(this.baseUrl+"productbrands/"+n)}createBrand(n){return this.http.post(this.baseUrl+"productbrands/create",n)}updateBrand(n){return this.http.post(this.baseUrl+"productbrands/update",n)}deleteBrand(n){return this.http.delete(this.baseUrl+"productbrands/delete/"+n)}static#t=this.\u0275fac=function(e){return new(e||o)(t.LFG(_.eN))};static#n=this.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"})}return o})();var f=i(2051),c=i(2500),C=i(9947),x=i(2296);const v=(o,a)=>a.id;function Z(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"ul",16)(1,"li",17)(2,"a",18),t.NdJ("click",function(){t.CHM(n);const r=t.oxw().$implicit,d=t.oxw(2),u=t.MAs(19);return t.KtG(d.openModal(u,r))}),t._uU(3,"Editar"),t.qZA()(),t._UZ(4,"li",19),t.TgZ(5,"li",17)(6,"a",20),t.NdJ("click",function(){t.CHM(n);const r=t.oxw().$implicit,d=t.oxw(2);return t.KtG(d.onDelete(r.id))}),t._uU(7,"Deletar"),t.qZA()()()}}function M(o,a){if(1&o&&(t.TgZ(0,"tr")(1,"th",7)(2,"strong",8),t._uU(3),t.qZA()(),t.TgZ(4,"td"),t._uU(5),t.qZA(),t.TgZ(6,"td",9)(7,"div",10)(8,"button",11)(9,"span",12),t._UZ(10,"i",13),t.qZA(),t.TgZ(11,"span",14),t._uU(12,"Split button!"),t.qZA()(),t.YNc(13,Z,8,0,"ul",15),t.qZA()()()),2&o){const n=a.$implicit;t.xp6(3),t.hij("# ",n.id,""),t.xp6(2),t.hij(" ",n.name," ")}}function B(o,a){if(1&o&&t.SjG(0,M,14,2,"tr",null,v),2&o){const n=t.oxw();t.wJu(n.brands)}}function T(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(n);const r=t.oxw(2);return t.KtG(r.onEdit())}),t._uU(1,"Editar"),t.qZA()}if(2&o){const n=t.oxw(2);t.Q6J("disabled",n.brandForm.invalid)}}function w(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(n);const r=t.oxw(2);return t.KtG(r.onSubmit())}),t._uU(1,"Criar"),t.qZA()}if(2&o){const n=t.oxw(2);t.Q6J("disabled",n.brandForm.invalid)}}function F(o,a){if(1&o){const n=t.EpF();t.TgZ(0,"div",21)(1,"h4",22),t._uU(2,"Marca"),t.qZA(),t.TgZ(3,"button",23),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.closeModal())}),t.TgZ(4,"span",24),t._uU(5,"\xd7"),t.qZA()()(),t.TgZ(6,"div",25)(7,"form",26),t._UZ(8,"app-text-input",27),t.TgZ(9,"div",28),t.YNc(10,T,2,1,"button",29)(11,w,2,1),t.qZA()()(),t.TgZ(12,"div",30)(13,"button",31),t.NdJ("click",function(){t.CHM(n);const r=t.oxw();return t.KtG(r.closeModal())}),t._uU(14,"Fechar"),t.qZA()()}if(2&o){const n=t.oxw();t.xp6(7),t.Q6J("formGroup",n.brandForm),t.xp6(),t.Q6J("formControl",n.brandForm.controls.name)("label","Marca"),t.xp6(2),t.um2(10,n.isEdit?10:11)}}const y=[{path:"",component:(()=>{class o{constructor(n,e,r,d){this.fb=n,this.brandsService=e,this.modalService=r,this.router=d,this.lastId=0,this.isEdit=!1,this.config={backdrop:!0,ignoreBackdropClick:!1},this.brandForm=this.createForm()}ngOnInit(){this.getBrands(),this.lastId=this.brands[this.brands.length-1].id+1}getBrands(){this.brandsService.getBrands().subscribe({next:n=>this.brands=n})}onSubmit(){this.brandsService.createBrand(this.brandForm.value).subscribe({next:()=>{this.getBrands(),this.modalRef.hide(),this.isEdit=!1}})}onEdit(){this.brandsService.updateBrand(this.brandForm.value).subscribe({next:()=>{this.getBrands(),this.modalRef.hide(),this.clearEntity()}})}onDelete(n){this.brandsService.deleteBrand(n).subscribe({next:()=>{this.getBrands(),this.modalRef.hide()}})}openModal(n,e){this.modalRef=this.modalService.show(n,this.config),this.modalRef.onHide?.subscribe(r=>{"backdrop-click"===r&&this.clearEntity()}),this.modalRef.setClass("modal-lg"),e&&(this.isEdit=!0,this.brandForm.setValue({id:e.id,name:e.name}))}closeModal(){this.modalRef.hide(),this.clearEntity()}clearEntity(){this.brandForm=this.createForm(),this.isEdit=!1}createForm(){return this.fb.group({id:this.lastId,name:["",s.kI.required]})}static#t=this.\u0275fac=function(e){return new(e||o)(t.Y36(s.qu),t.Y36(g),t.Y36(f.tT),t.Y36(l.F0))};static#n=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-brands"]],decls:20,vars:1,consts:[[1,"container"],["type","button",1,"btn","btn-light","new",3,"click"],[1,"table"],[1,"table","shadow-lg","p-1","mb-5","bg-white","rounded"],[1,"thead-dark","text-uppercase"],["scope","col"],["template",""],["scope","row"],[1,"ps-2"],[2,"width","200px"],["dropdown","",1,"btn-group"],["id","button-split","type","button","dropdownToggle","","aria-controls","dropdown-split",1,"dropdown-toggle","dropdown-toggle-split"],[1,"pe-1"],["aria-hidden","true",1,"fa","fa-ellipsis-h"],[1,"sr-only","visually-hidden"],["id","dropdown-split","class","dropdown-menu","role","menu","aria-labelledby","button-split",4,"dropdownMenu"],["id","dropdown-split","role","menu","aria-labelledby","button-split",1,"dropdown-menu"],["role","menuitem"],[1,"dropdown-item",3,"click"],[1,"divider","dropdown-divider"],[1,"dropdown-item","delete",3,"click"],[1,"modal-header"],[1,"modal-title","pull-left"],["type","button","aria-label","Close",1,"btn","close","pull-right",3,"click"],["aria-hidden","true"],[1,"modal-body"],[3,"formGroup"],[3,"formControl","label"],[1,"d-grid"],["mat-flat-button","","color","primary","type","submit",3,"disabled"],[1,"modal-footer"],["type","button",1,"btn","btn-default",3,"click"],["mat-flat-button","","color","primary","type","submit",3,"disabled","click"]],template:function(e,r){if(1&e){const d=t.EpF();t.TgZ(0,"div",0)(1,"button",1),t.NdJ("click",function(){t.CHM(d);const U=t.MAs(19);return t.KtG(r.openModal(U))}),t._uU(2,"Nova Marca"),t.qZA(),t.TgZ(3,"div",2)(4,"table",3)(5,"thead",4)(6,"tr")(7,"th",5)(8,"strong"),t._uU(9,"C\xf3digo"),t.qZA()(),t.TgZ(10,"th",5)(11,"strong"),t._uU(12,"Descri\xe7\xe3o"),t.qZA()(),t.TgZ(13,"th",5)(14,"strong"),t._uU(15,"A\xe7\xe3o"),t.qZA()()()(),t.TgZ(16,"tbody"),t.YNc(17,B,2,0),t.qZA()()(),t.YNc(18,F,15,4,"ng-template",null,6,t.W1O),t.qZA()}2&e&&(t.xp6(17),t.um2(17,r.brands?17:-1))},dependencies:[s._Y,s.JJ,s.JL,s.oH,s.sg,c.Hz,c.Mq,c.TO,C.t,x.lW],styles:[".container[_ngcontent-%COMP%]{margin-top:.8rem;height:100vh}.delete[_ngcontent-%COMP%]:hover{background-color:red}.new[_ngcontent-%COMP%]{border-radius:0;background-color:#000;color:#fff}.new[_ngcontent-%COMP%]:hover{background-color:#fff;color:#000;border:1px solid black}.modal[_ngcontent-%COMP%]{width:60vw;height:60vh}table[_ngcontent-%COMP%]{margin-top:.5rem}tbody[_ngcontent-%COMP%]{min-height:400px}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{font-size:.8rem;padding:5px 15px;margin:0}td[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{height:20px;align-content:center;border:none}#button-split[_ngcontent-%COMP%]{border-radius:0}#button-split[_ngcontent-%COMP%]:hover{border:2px solid blue}#dropdown-split[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{text-align:center}"]})}return o})()},{path:"**",redirectTo:"",pathMatch:"full"}];let k=(()=>{class o{static#t=this.\u0275fac=function(e){return new(e||o)};static#n=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[l.Bz.forChild(y),l.Bz]})}return o})(),A=(()=>{class o{static#t=this.\u0275fac=function(e){return new(e||o)};static#n=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[m.ez,h.m,k]})}return o})()}}]);