"use strict";(self.webpackChunkshopping_website=self.webpackChunkshopping_website||[]).push([[273],{1273:(D,u,a)=>{a.r(u),a.d(u,{ProductDetailsModule:()=>M});var g=a(6895),l=a(1300),c=a(1983),t=a(1571),h=a(7151),m=a(673),P=a(334),_=a(7185),s=a(433);const f=function(){return["/home"]};class p{constructor(){this.fullName="",this.amount="0",this.email="",this.userId="",this.razorpayOrderId="",this.razorpayPaymentId=""}}const O=[{path:"",component:(()=>{class o{constructor(e,n,r,i,Z,y,b,v){this.route=e,this.router=n,this.productService=r,this.apiService=i,this.spinner=Z,this.toastr=y,this._GlobalService=b,this.jwtService=v,this.orderDetails=new p,this.currentUser=new l.ar,this.productData={},this.quantity=1,this.RAZORPAY_OPTIONS={key:"rzp_test_Cl5FzNaTJyToxF",amount:"",name:"Novopay",order_id:"",description:"Load Wallet",image:"https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",handler:A=>{},prefill:{name:"",email:"",contact:"",method:""},modal:{},theme:{color:"#0096C5"}}}ngOnInit(){this.currentUser=this.jwtService.getCurrentUser(),this.currentUser&&this.currentUser._id&&(this.orderDetails.fullName=this.currentUser.fullName,this.orderDetails.email=this.currentUser.email,this.orderDetails.userId=this.currentUser._id),this.route.paramMap.subscribe(e=>{this.productID=e.get("id"),this.getProductDetails()})}getProductDetails(){this.spinner.show(),this.productService.getProductsList({_id:this.productID}).subscribe({next:e=>{this.spinner.hide(),200==e.status&&(this.productData=e.data[0])},error:e=>{this.spinner.hide(),this.toastr.error(e.message,"Error!")}})}calculateMargin(){if(Number(this.productData.productmargin)){let e=this.productData.productprice*(this.productData.productmargin/100);return e=this.productData.productprice-e,e=(e*this.quantity).toFixed(2),this.orderDetails.amount=e,e}{let e=this.productData.productprice*this.quantity;return this.orderDetails.amount=e,e}}commingSoon(){this.toastr.info("This feature is Comming Soon...")}razorPay(){if(this.currentUser&&this.currentUser._id){let e=Object.assign({},this.orderDetails);e.amount=Number(e.amount).toFixed(2),this.productService.razorPayCreateOrder(e).subscribe(n=>{this.RAZORPAY_OPTIONS.key=n.razor_key_id,this.RAZORPAY_OPTIONS.amount=n.order.amount,this.RAZORPAY_OPTIONS.name=this.orderDetails.fullName,this.RAZORPAY_OPTIONS.order_id=n.order.id,this.RAZORPAY_OPTIONS.email=this.currentUser.email,this.RAZORPAY_OPTIONS.handler=this.razorPaySuccessHandler.bind(this),console.log("this.RAZORPAY_OPTIONS: ",this.RAZORPAY_OPTIONS),this.rzp1=new Razorpay(this.RAZORPAY_OPTIONS),this.rzp1.open()})}else this._GlobalService.productViewid=this.productData._id,this.router.navigate(["/login"])}razorPaySuccessHandler(e){if(e&&e.razorpay_payment_id){const n=Object.assign({},this.orderDetails);n.razorpayOrderId=e.razorpay_order_id,n.razorpayPaymentId=e.razorpay_payment_id,n.amount=Number(n.amount).toFixed(2),this.toastr.success("Payment has been done Successfully"),this.toastr.success("Payment has been done Successfully"),this.savePaymentData(n)}else this.toastr.error("Payment Failed")}savePaymentData(e){const n=this;this.spinner.show();let r=e;r.productDetails=this.productData,r.quantity=this.quantity,e.size=this.size,this.productService.razorPayOrdayPayment(r).subscribe(i=>{this.spinner.hide(),200===i.status?(n.toastr.success("Payment has been succesfully.","Success!"),this.orderDetails=new p,this.router.navigate(["/order-list"])):this.toastr.error("Payment Failed")},i=>{console.log("error: ",i)})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(c.gz),t.Y36(c.F0),t.Y36(h.M),t.Y36(m.s),t.Y36(P.t2),t.Y36(_._W),t.Y36(l.Uh),t.Y36(l.Tj))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-product-details"]],decls:77,vars:15,consts:[[1,"container",2,"margin-top","40px","margin-bottom","80px"],[1,"col-lg-8","border","p-3","bg-white",2,"margin","0 auto"],[1,"clearfix"],[1,"float-left","row","hedding","m-0","pl-3","pt-0","pb-3"],[1,"float-right",3,"routerLink"],[1,"fa","fa-long-arrow-left"],[1,"ml-1"],[1,"row","m-0"],[1,"col-lg-4","left-side-product-box","pb-3"],[1,"shadow-lg","p-3","mb-5","bg-body","rounded",2,"cursor","pointer",3,"src","title"],[1,"col-lg-8"],[1,"right-side-pro-detail","p-3","m-0"],[1,"row"],[1,"col-lg-10"],[1,"name"],[1,"col-lg-2"],[1,"btn","btn-secondary","btn-lg","w-100","float-left",3,"click"],[1,"fa","fa-heart"],[1,"product-price"],[1,"last-price"],[1,"new-price"],[1,"col-lg-12","pt-2"],[1,"m-0","pt-2","mt-2"],[1,"col-md-9"],[1,"sizes","mt-3"],[1,"text-uppercase"],[1,"radio","mr-1"],["type","radio","name","size","value","S","checked","",3,"ngModel","ngModelChange"],["type","radio","name","size","value","M",3,"ngModel","ngModelChange"],["type","radio","name","size","value","L",3,"ngModel","ngModelChange"],["type","radio","name","size","value","XL"],["type","radio","name","size","value","XXL",3,"ngModel","ngModelChange"],[1,"col"],[1,"col-lg-12","mt-3"],["type","number","value","1","min","1",1,"form-control","text-center","w-100",3,"ngModel","ngModelChange"],[1,"col-lg-6","pb-2"],[1,"btn","btn-danger","w-100",3,"click"],[1,"col-lg-6"],["href","#",1,"btn","btn-success","w-100",3,"disabled","click"]],template:function(e,n){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._uU(4,"Product Details"),t.qZA(),t.TgZ(5,"div",4),t._UZ(6,"i",5),t.TgZ(7,"span",6),t._uU(8,"Back"),t.qZA()()(),t.TgZ(9,"div",7)(10,"div",8),t._UZ(11,"img",9),t.qZA(),t.TgZ(12,"div",10)(13,"div",11)(14,"div",12)(15,"div",12)(16,"div",13)(17,"span"),t._uU(18,"Who What Wear"),t.qZA(),t.TgZ(19,"p",14),t._uU(20),t.qZA()(),t.TgZ(21,"div",15)(22,"a",16),t.NdJ("click",function(){return n.commingSoon()}),t._UZ(23,"i",17),t.qZA()()(),t.TgZ(24,"div",18)(25,"h4",19),t._uU(26,"Old Price: "),t.TgZ(27,"span"),t._uU(28),t.qZA()(),t.TgZ(29,"h4",20),t._uU(30,"New Price: "),t.TgZ(31,"span"),t._uU(32),t.qZA()()(),t.TgZ(33,"div",21)(34,"h5"),t._uU(35,"Product Detail"),t.qZA(),t.TgZ(36,"span"),t._uU(37),t.qZA(),t._UZ(38,"hr",22),t.qZA(),t.TgZ(39,"div",12)(40,"div",23)(41,"div",24)(42,"h6",25),t._uU(43,"Size"),t.qZA(),t.TgZ(44,"label",26)(45,"input",27),t.NdJ("ngModelChange",function(i){return n.size=i}),t.qZA(),t.TgZ(46,"span"),t._uU(47,"S"),t.qZA()(),t.TgZ(48,"label",26)(49,"input",28),t.NdJ("ngModelChange",function(i){return n.size=i}),t.qZA(),t.TgZ(50,"span"),t._uU(51,"M"),t.qZA()(),t.TgZ(52,"label",26)(53,"input",29),t.NdJ("ngModelChange",function(i){return n.size=i}),t.qZA(),t.TgZ(54,"span"),t._uU(55,"L"),t.qZA()(),t.TgZ(56,"label",26),t._UZ(57,"input",30),t.TgZ(58,"span"),t._uU(59,"XL"),t.qZA()(),t.TgZ(60,"label",26)(61,"input",31),t.NdJ("ngModelChange",function(i){return n.size=i}),t.qZA(),t.TgZ(62,"span"),t._uU(63,"XXL"),t.qZA()()()(),t.TgZ(64,"div",32)(65,"div",33)(66,"h6"),t._uU(67," QUANTITY:"),t.qZA(),t.TgZ(68,"input",34),t.NdJ("ngModelChange",function(i){return n.quantity=i}),t.qZA()()()(),t.TgZ(69,"div",33)(70,"div",12)(71,"div",35)(72,"a",36),t.NdJ("click",function(){return n.commingSoon()}),t._uU(73,"Add To Cart"),t.qZA()(),t.TgZ(74,"div",37)(75,"button",38),t.NdJ("click",function(){return n.razorPay()}),t._uU(76,"Buy Now"),t.qZA()()()()()()()()()()),2&e&&(t.xp6(5),t.Q6J("routerLink",t.DdM(14,f)),t.xp6(6),t.Q6J("src",n.productData.productImg,t.LSH)("title",n.productData.Productdescription),t.xp6(9),t.Oqu(n.productData.productname),t.xp6(8),t.hij("\u20b9",n.productData.productprice,""),t.xp6(4),t.AsE("\u20b9",n.calculateMargin()," (",n.productData.productmargin,"% off)"),t.xp6(5),t.Oqu(n.productData.Productdescription),t.xp6(8),t.Q6J("ngModel",n.size),t.xp6(4),t.Q6J("ngModel",n.size),t.xp6(4),t.Q6J("ngModel",n.size),t.xp6(8),t.Q6J("ngModel",n.size),t.xp6(7),t.Q6J("ngModel",n.quantity),t.xp6(7),t.Q6J("disabled",!n.quantity))},dependencies:[c.rH,s.Fj,s.wV,s._,s.JJ,s.qQ,s.On],styles:["body[_ngcontent-%COMP%]{font-family:Roboto Condensed,sans-serif;background-color:#f5f5f5}.hedding[_ngcontent-%COMP%]{font-size:20px;color:#ab8181}.main-section[_ngcontent-%COMP%]{position:relative;left:50%;right:50%;transform:translate(-50%,5%)}.left-side-product-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.left-side-product-box[_ngcontent-%COMP%]   .sub-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:5px;width:83px;height:100px}.right-side-pro-detail[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:25px}.right-side-pro-detail[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:19px;color:#717171}.right-side-pro-detail[_ngcontent-%COMP%]   .price-pro[_ngcontent-%COMP%]{color:#e45641}.right-side-pro-detail[_ngcontent-%COMP%]   .tag-section[_ngcontent-%COMP%]{font-size:18px;color:#5d4c46}.right-side-pro-detail[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{color:#000;font-size:25px}.pro-box-section[_ngcontent-%COMP%]   .pro-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:200px}.float-right[_ngcontent-%COMP%]{cursor:pointer}@media (min-width: 360px) and (max-width: 640px){.pro-box-section[_ngcontent-%COMP%]   .pro-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:auto}}.product-price[_ngcontent-%COMP%]{margin:.5rem 0;font-size:.5rem;font-weight:600}.product-price[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500}.last-price[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#f64749;text-decoration:line-through}.new-price[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#256eff}.color[_ngcontent-%COMP%]{margin-bottom:10px}label.radio[_ngcontent-%COMP%]{cursor:pointer}label.radio[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;top:0;left:0;visibility:hidden;pointer-events:none}label.radio[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:2px 9px;border:2px solid #ff0000;display:inline-block;color:red;border-radius:3px;text-transform:uppercase}label.radio[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked + span[_ngcontent-%COMP%]{border-color:red;background-color:red;color:#fff}"]}),o})()}];let C=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[c.Bz.forChild(O),c.Bz]}),o})(),M=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[g.ez,C,l.eY]}),o})()}}]);