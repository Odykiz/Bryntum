/*!
 *
 * Bryntum Scheduler Pro 5.4.0 (TRIAL VERSION)
 *
 * Copyright(c) 2023 Bryntum AB
 * https://bryntum.com/contact
 * https://bryntum.com/license
 *
 */
(function(a,b){const c=a();function k(a,b){return _cmpb(a- -0x120,b);}while(!![]){try{const d=parseInt(k(0x4c,0x69))/0x1*(parseInt(k(0x2c,0x26))/0x2)+-parseInt(k(0x15,0x18))/0x3*(-parseInt(k(0x37,0x3f))/0x4)+parseInt(k(0x3b,0x37))/0x5+parseInt(k(0x13,0x25))/0x6*(-parseInt(k(0x3e,0x31))/0x7)+parseInt(k(0x42,0x3e))/0x8*(parseInt(k(0x1a,0x26))/0x9)+parseInt(k(0x49,0x48))/0xa*(-parseInt(k(0x39,0x43))/0xb)+-parseInt(k(0x3c,0x3f))/0xc;if(d===b){break;}else{c['push'](c['shift']());}}catch(e){c['push'](c['shift']());}}}(_cmpa,0x95b1c));import{Widget,Rectangle,Tooltip,ObjectHelper}from'./Editor.js';const arrowKeys={'ArrowUp':0x1,'ArrowDown':0x1,'ArrowLeft':0x1,'ArrowRight':0x1};class Slider extends Widget{static get['$name'](){function l(a,b){return _cmpb(a- -0x153,b);}return l(0x10,0x1);}static get[_cmpm(0xd2,0xd7)](){return'slider';}static get[_cmpm(0xe3,0xd5)](){function n(a,b){return _cmpm(b,a- -0x2ce);}return{'text':null,'showValue':!![],'showTooltip':![],'min':0x0,'max':0x64,'step':0x1,'value':0x32,'unit':null,'thumbSize':0x14,'tooltip':{'$config':[n(-0x215,-0x229),n(-0x21d,-0x213)],'value':{'type':n(-0x1f1,-0x206),'align':'b-t','anchor':![],'axisLock':!![]}},'localizableProperties':[n(-0x204,-0x212)],'triggerChangeOnInput':null,'defaultBindProperty':n(-0x220,-0x22d)};}[_cmpm(0xdd,0xc5)](){const {id:a,min:b,max:c,showValue:d,step:e,text:f,value:g,unit:unit='',disabled:h}=this,i=a+'-input',j=Boolean(f||d);function o(a,b){return _cmpm(a,b- -0xfc);}return{'class':{'b-has-label':j,'b-text':j,'b-disabled':h},'children':{'input':{'tag':o(-0x3,-0x1c),'type':o(-0x37,-0x26),'id':i,'reference':o(-0x36,-0x1c),'disabled':h,'min':b,'max':c,'step':e,'value':g,'listeners':{'input':'onInternalInput','change':o(-0x36,-0x20),'mouseover':o(-0x1e,-0x39),'mouseout':o(-0x23,-0x3b)}},'label':{'tag':'label','for':i,'html':d?f?f+'\x20('+g+unit+')':g+unit:f}}};}get[_cmpm(0xdf,0xcc)](){function p(a,b){return _cmpm(b,a-0x37c);}return this[p(0x45c,0x472)];}get[_cmpm(0xe7,0xc9)](){function q(a,b){return _cmpm(a,b-0xac);}return(this['value']-this[q(0x15e,0x168)])/(this[q(0x14f,0x15b)]-this[q(0x157,0x168)])*0x64;}['onInternalKeyDown'](a){function r(a,b){return _cmpm(a,b-0x1ab);}if(!this['readOnly']&&arrowKeys[a[r(0x285,0x26f)]]){a[r(0x283,0x276)]();}}['onInternalChange'](){this['updateUI']();function s(a,b){return _cmpm(b,a- -0x278);}this[s(-0x1c4,-0x1d7)](!![]);this['trigger']('action',{'value':this[s(-0x1ca,-0x1e4)]});}[_cmpm(0xf0,0xdb)](){const a=this;if(a[t(0x28c,0x271)]){a[t(0x296,0x2a5)][t(0x256,0x273)]=a[t(0x269,0x273)];return;}a[t(0x282,0x273)]=parseInt(a[t(0x298,0x2a5)]['value'],0xa);a[t(0x26f,0x280)](t(0x2af,0x2a5),{'value':a[t(0x280,0x273)]});function t(a,b){return _cmpm(a,b-0x1c5);}if(a[t(0x28d,0x298)]){a[t(0x295,0x279)](a);}}[_cmpm(0xc7,0xc3)](){var a;const b=this,c=b[u(0x1da,0x1d3)]?0x64-b['percentProgress']:b['percentProgress'];function u(a,b){return _cmpm(a,b-0x10c);}(a=b[u(0x1fe,0x1e9)])===null||a===void 0x0?void 0x0:a[u(0x1c9,0x1c6)]({'target':Rectangle[u(0x1cb,0x1b3)](b[u(0x1ce,0x1ec)])[u(0x1df,0x1e6)](b[u(0x1a8,0x1be)]/0x2,-b[u(0x1a6,0x1be)]/0x2),'align':'b-t'+Math[u(0x1c3,0x1d2)](c)});}['onInternalMouseOut'](){var a;function v(a,b){return _cmpm(a,b-0xbf);}(a=this[v(0x1ae,0x19c)])===null||a===void 0x0?void 0x0:a[v(0x181,0x167)]();}['triggerChange'](a){function w(a,b){return _cmpm(a,b-0x26f);}this[w(0x32c,0x324)]({'value':this[w(0x329,0x31d)],'valid':!![],'userAction':a});}[_cmpm(0xb0,0xb7)](a){function x(a,b){return _cmpm(a,b- -0x175);}const b=this;if(b[x(-0xa0,-0x95)]&&b[x(-0xc3,-0xb5)]>a){b[x(-0xcb,-0xc7)]=a;b['trigger'](x(-0x7b,-0x95),{'value':b[x(-0xd7,-0xc7)]});}}['updateMin'](a){function y(a,b){return _cmpm(b,a-0x288);}const b=this;if(b[y(0x368,0x37d)]&&b[y(0x348,0x358)]<a){b[y(0x336,0x33b)]=a;b['trigger'](y(0x368,0x350),{'value':b['value']});}}['changeTooltip'](a,b){if(a){a[z(0x2b7,0x2cc)]=this;}function z(a,b){return _cmpm(a,b-0x214);}return this[z(0x30b,0x2f2)]?Tooltip['reconfigure'](b,a,{'owner':this,'defaults':{'forElement':this['input'],'html':String(this[z(0x2a9,0x2c2)])+(this[z(0x2c9,0x2d2)]??'')}}):null;}[_cmpm(0x96,0xb3)](a){const b=this,{min:c,step:d}=b;a=Math['min'](Math[A(0x361,0x361)](a,c),b['max']);function A(a,b){return _cmpm(a,b-0x2b2);}if(a>c){return c+ObjectHelper[A(0x352,0x368)](a-c,d);}return ObjectHelper[A(0x356,0x368)](a,d);}[_cmpm(0xaf,0xbf)](a){const b=this,{input:c,_tooltip:d}=b;if(d){d[B(-0x20a,-0x200)]=b[B(-0x1e7,-0x1fc)]+(b['unit']??'');}function B(a,b){return _cmpm(a,b- -0x2aa);}if(c&&c[B(-0x201,-0x1fc)]!==String(a)){c['value']=a;b[B(-0x1d8,-0x1f6)](![]);}b[B(-0x1cd,-0x1c9)]();}[_cmpm(0xfa,0xe1)](){var a,b;function C(a,b){return _cmpm(b,a- -0x292);}const c=this;((a=c[C(-0x1d5,-0x1c6)])===null||a===void 0x0?void 0x0:a[C(-0x1e5,-0x1de)])&&((b=c['_tooltip'])===null||b===void 0x0?void 0x0:b[C(-0x1c2,-0x1a8)]({'target':Rectangle[C(-0x1eb,-0x1eb)](c[C(-0x1b2,-0x1b9)])['inflate'](c[C(-0x1e0,-0x1cd)]/0x2,-c[C(-0x1e0,-0x1e6)]/0x2),'align':'b-t'+Math[C(-0x1cc,-0x1e2)](c['percentProgress'])}));}}function _cmpb(a,b){const c=_cmpa();_cmpb=function(d,e){d=d-0x131;let f=c[d];return f;};return _cmpb(a,b);}function _cmpm(a,b){return _cmpb(b- -0x8a,a);}Slider[_cmpm(0xea,0xce)]();function _cmpa(){const D=['range','type','7591600NCcIQS','Slider','inflate','onInternalInput','onInternalChange','tooltip','showTooltip','2030220RwPOOs','input','updateUI','18722gKfSQf','from','hide','208998PvfNbp','html','676473YNnYpD','readOnly','isVisible','value','max','9CCTVWY','nullify','thumbSize','changeValue','triggerChange','triggerFieldChange','roundTo','updateMax','owner','lazy','showBy','trigger','min','_tooltip','unit','updateValue','_value','onInternalMouseOut','20pzPQvg','onInternalMouseOver','key','compose','round','rtl','_$name','percentProgress','text','stopImmediatePropagation','focusElement','8YvIMYu','initClass','33uoRblD','alignTo','3365400vvDdnS','9530244zptYHx','triggerChangeOnInput','49tKbkXd','configurable'];_cmpa=function(){return D;};return _cmpa();}Slider[_cmpm(0xbf,0xc8)]=_cmpm(0xee,0xd9);export{Slider};