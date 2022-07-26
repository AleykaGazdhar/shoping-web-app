"use strict";(self.webpackChunkshopping_website=self.webpackChunkshopping_website||[]).push([[720],{4720:(M,g,i)=>{i.r(g),i.d(g,{RecoveryPasswordModule:()=>T});var u=i(6895),d=i(7087),e=i(1571),p=i(3814),w=i(8423),v=i(7185),l=i(433);function m(t,o){if(1&t&&(e.TgZ(0,"div",12)(1,"div",13)(2,"p",14),e._uU(3),e.qZA()()()),2&t){const s=e.oxw();e.xp6(3),e.hij(" ",s.expiredLinkErrorMsg," ")}}function P(t,o){1&t&&(e.TgZ(0,"p",30),e._uU(1," Use Strong Password min 8 characters,1 lowercase letter,1 uppercase letter,1 number ,1 special character."),e.qZA())}function C(t,o){1&t&&(e.TgZ(0,"p",31),e._uU(1," Confirm Password must match with password. "),e.qZA())}const f=function(t,o){return{"text-danger":t,"text-success":o}},y=function(){return["/login"]};function x(t,o){if(1&t){const s=e.EpF();e.TgZ(0,"div")(1,"h3",15)(2,"span",16),e._uU(3,"Recover Your Password "),e.qZA()(),e.TgZ(4,"div",17)(5,"div",18)(6,"span",19),e._UZ(7,"i",20),e.qZA(),e.TgZ(8,"input",21),e.NdJ("ngModelChange",function(r){e.CHM(s);const c=e.oxw();return e.KtG(c.userResetInfo.newPass=r)})("ngModelChange",function(){e.CHM(s);const r=e.oxw();return e.KtG(r.patternMatchCheck(r.userResetInfo.newPass,"strongPasswordCheck"))}),e.qZA(),e.TgZ(9,"span",22),e.NdJ("click",function(){e.CHM(s);const r=e.oxw();return e.KtG(r.changeInputType("newPassType"))}),e._UZ(10,"i",23),e.qZA(),e.YNc(11,P,2,0,"p",24),e.qZA()(),e.TgZ(12,"div",17)(13,"div",18)(14,"span",19),e._UZ(15,"i",20),e.qZA(),e.TgZ(16,"input",25),e.NdJ("ngModelChange",function(r){e.CHM(s);const c=e.oxw();return e.KtG(c.userResetInfo.newConfPass=r)}),e.qZA(),e.TgZ(17,"span",22),e.NdJ("click",function(){e.CHM(s);const r=e.oxw();return e.KtG(r.changeInputType("newConfType"))}),e._UZ(18,"i",23),e.qZA()(),e.YNc(19,C,2,0,"p",26),e.qZA(),e.TgZ(20,"div",3)(21,"div",27)(22,"button",28),e.NdJ("click",function(){e.CHM(s);const r=e.oxw();return e.KtG(r.resetPassword())}),e._uU(23," Continue "),e.qZA(),e.TgZ(24,"button",29),e._uU(25,"Cancel"),e.qZA()()()()}if(2&t){const s=e.oxw();e.xp6(6),e.Q6J("ngClass",e.WLB(9,f,!s.userResetInfo.newPass,s.userResetInfo.newPass)),e.xp6(2),e.Q6J("type",s.viewInputType.newPassType)("ngModel",s.userResetInfo.newPass),e.xp6(3),e.Q6J("ngIf",s.userResetInfo.newPass&&!s.inValidateCheck.strongPasswordCheck),e.xp6(3),e.Q6J("ngClass",e.WLB(12,f,!s.userResetInfo.newConfPass,s.userResetInfo.newConfPass)),e.xp6(2),e.Q6J("type",s.viewInputType.newConfType)("ngModel",s.userResetInfo.newConfPass),e.xp6(3),e.Q6J("ngIf",s.userResetInfo.newPass&&s.userResetInfo.newConfPass&&s.userResetInfo.newPass!==s.userResetInfo.newConfPass),e.xp6(5),e.Q6J("routerLink",e.DdM(15,y))}}class _{constructor(){this.newPass="",this.newConfPass=""}}const R=[{path:"",component:(()=>{class t{constructor(s,n,r,c,h,a,Z){this.jwtService=s,this.globalService=n,this.spinner=r,this.usersService=c,this.toastr=h,this.router=a,this.route=Z,this.title="Recover Password | Angular Node Training",this.userResetInfo=new _,this.userInfo={},this.expiredLinkErrorMsg="",this.viewInputType={newPassType:"password",newConfType:"password"},this.inValidateCheck={strongPasswordCheck:!1},this.requiredValidation={newPass:"",newConfPass:""}}ngOnInit(){this.route.params.subscribe(s=>{this.userId=s.userId,this.link=s.token,this.userId&&this.link&&(this.jwtService.destroyToken(),this.globalService.logOut(),this.getUserData())})}changeInputType(s){this.viewInputType[s]="password"===this.viewInputType[s]?"text":"password"}patternMatchCheck(s,n){const r=this.globalService.patternMatchRegex(s,n);this.inValidateCheck[n]=r}getUserData(){this.spinner.show(),this.usersService.updatePassword({_id:this.userId,forgotToken:this.link}).subscribe({next:n=>{console.log("data======",n),200===n.status?(this.userInfo=n.data,this.spinner.hide()):(this.spinner.hide(),this.expiredLinkErrorMsg=n.message)},error:n=>{this.spinner.hide(),this.toastr.error(n,"Error")}})}resetPassword(){const s=Object.keys(this.requiredValidation);let n=JSON.parse(JSON.stringify(this.userResetInfo));const r=s.filter(a=>!n[a]);if(this.spinner.show(),r.length||!this.inValidateCheck.strongPasswordCheck||this.userResetInfo.newPass!==this.userResetInfo.newConfPass)return this.toastr.warning("*Please Fill All Fields are mandatory.","Warning"),this.spinner.hide(),!1;let c=JSON.parse(JSON.stringify(this.userResetInfo));this.usersService.doSignUp({_id:this.userInfo._id,password:c.newPass,forgotToken:"",forgotStatus:0}).subscribe({next:a=>{this.spinner.hide(),200===a.status?(this.toastr.success(a.message,"Success!"),this.router.navigate(["/login"])):(this.toastr.error(a.message,"Error"),this.spinner.hide())},error:a=>{this.spinner.hide(),this.toastr.error(a,"Error!")}})}}return t.\u0275fac=function(s){return new(s||t)(e.Y36(p.Tj),e.Y36(p.Uh),e.Y36(w.t2),e.Y36(p.fz),e.Y36(v._W),e.Y36(d.F0),e.Y36(d.gz))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-recovery-password"]],decls:14,vars:2,consts:[[1,"app-body","pt-5"],[1,"main","d-flex","align-items-center","pt-5"],[1,"container"],[1,"row"],[1,"col-xl-6","col-lg-8","mx-auto","p-1"],[1,"card","p-3","position-relative"],[1,"d-flex","custom-border"],[1,"secondary-bg"],[1,"primary-bg"],[1,"card-body"],["class","card-title",4,"ngIf"],[4,"ngIf"],[1,"card-title"],[1,"text-center"],["role","alert",1,"alert","alert-danger","text-left",2,"font-family","initial"],["id","forgotTitle text-left"],[1,""],[1,"mb-3"],[1,"input-group"],[1,"input-group-text",3,"ngClass"],[1,"fa","fa-lock"],["maxlength","10","placeholder","Enter new password","name","newPass",1,"form-control",3,"type","ngModel","ngModelChange"],[1,"input-group-text","cursor-pointer",3,"click"],[1,"fa","fa-eye"],["class","alert fade alert-danger show mt-1","role","alert",4,"ngIf"],["maxlength","10","placeholder","Enter confirm password","name","newConfPass",1,"form-control",3,"type","ngModel","ngModelChange"],["class","alert alert-danger show mt-1","role","alert",4,"ngIf"],[1,"col-12"],["type","button",1,"btn","btn-primary","px-4",3,"click"],["type","button",1,"btn","btn-secondary","px-4","m-2",3,"routerLink"],["role","alert",1,"alert","fade","alert-danger","show","mt-1"],["role","alert",1,"alert","alert-danger","show","mt-1"]],template:function(s,n){1&s&&(e.TgZ(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6),e._UZ(7,"span",7)(8,"span",8)(9,"span",7)(10,"span",8),e.qZA(),e.TgZ(11,"div",9),e.YNc(12,m,4,1,"div",10),e.YNc(13,x,26,16,"div",11),e.qZA()()()()()()()),2&s&&(e.xp6(12),e.Q6J("ngIf",n.expiredLinkErrorMsg),e.xp6(1),e.Q6J("ngIf",!n.expiredLinkErrorMsg))},dependencies:[u.mk,u.O5,l.Fj,l.JJ,l.nD,l.On,d.rH]}),t})()}];let I=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[d.Bz.forChild(R),d.Bz]}),t})(),T=(()=>{class t{}return t.\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[u.ez,p.eY,I]}),t})()}}]);