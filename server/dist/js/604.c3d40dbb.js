"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[604],{6604:function(e,a,l){l.r(a),l.d(a,{default:function(){return _}});l(4114);var s=l(6768),i=l(144),n=l(4232),r=l(5130),o=l(6807),t=l(1387),u=(l(9336),l(4783));const c={class:"forgot_pass_form"},d={id:"validation_msg"},m={class:"err"},f=["disabled"];var v={__name:"Forgot-Password",setup(e){const a=(0,u.k)(),l=((0,t.lq)(),(0,t.rd)());(0,i.KR)(!1);let v=(0,i.KR)(!1),p=(0,i.KR)(!1),k=((0,i.KR)(void 0),(0,i.KR)(!1)),_=(0,i.Kh)({email:""}),b=(0,i.Kh)({email_err:""});function g(){let e=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;if(""===_.email)b.email_err="Please fill field";else{if(!1!==e.test(_.email))return b.email_err="",!0;b.email_err="Invalid email"}}async function R(){if(g()){p.value=!0,v.value=!0;const e=await o.A.send_reset_pass_email(_);switch(e.message){case"mail sent":k.value=e.message,p.value=!1,v.value=!1;break;case"We cannot find your email":k.value=e.message,p.value=!1,v.value=!1;break;case"error occured":k.value=e.message,p.value=!1,v.value=!1;break}}}return a.isAuthenticated&&l.push({name:"home"}),(0,s.$u)((()=>{g()})),(e,a)=>{const l=(0,s.g2)("font-awesome-icon");return(0,s.uX)(),(0,s.CE)("div",c,[a[2]||(a[2]=(0,s.Lk)("h1",null,"Forgot Password",-1)),a[3]||(a[3]=(0,s.Lk)("p",null,"Enter your email and we'll send you a link to reset your password.",-1)),(0,i.R1)(k)?((0,s.uX)(),(0,s.CE)("div",{key:0,class:"validation_msg",style:(0,n.Tr)("mail sent"===(0,i.R1)(k)?{"background-color":"green",border:"1px solid green"}:{"background-color":"#b93c3c",border:"1px solid #b93c3c"})},[(0,s.Lk)("p",d,(0,n.v_)((0,i.R1)(k)),1)],4)):(0,s.Q3)("",!0),(0,s.Lk)("form",null,[(0,s.bo)((0,s.Lk)("input",{type:"email","onUpdate:modelValue":a[0]||(a[0]=e=>(0,i.R1)(_).email=e),name:"email",id:"email",placeholder:"Email"},null,512),[[r.Jo,(0,i.R1)(_).email]]),(0,s.Lk)("small",m,(0,n.v_)((0,i.R1)(b).email_err),1),(0,s.Lk)("button",{type:"submit",onClick:(0,r.D$)(R,["prevent"]),id:"loginbtn",disabled:(0,i.R1)(p)},[(0,i.R1)(v)?((0,s.uX)(),(0,s.Wv)(l,{key:0,class:"fa-solid fa-spinner fa-spin",id:"spinner",icon:"fa-solid fa-spinner"})):(0,s.Q3)("",!0),a[1]||(a[1]=(0,s.eW)(" Next"))],8,f)])])}}},p=l(1241);const k=(0,p.A)(v,[["__scopeId","data-v-14afff5c"]]);var _=k}}]);
//# sourceMappingURL=604.c3d40dbb.js.map