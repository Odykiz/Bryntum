/*!
 *
 * Bryntum Scheduler Pro 5.4.0 (TRIAL VERSION)
 *
 * Copyright(c) 2023 Bryntum AB
 * https://bryntum.com/contact
 * https://bryntum.com/license
 *
 */
function _cmpw(a,b){return _cmpb(b- -0x15e,a);}(function(a,b){const c=a();function v(a,b){return _cmpb(a-0x3b5,b);}while(!![]){try{const d=-parseInt(v(0x4d7,0x4b5))/0x1+parseInt(v(0x59d,0x586))/0x2*(-parseInt(v(0x55d,0x5b2))/0x3)+-parseInt(v(0x546,0x51a))/0x4+-parseInt(v(0x4ed,0x48a))/0x5*(-parseInt(v(0x4ac,0x42e))/0x6)+parseInt(v(0x4de,0x4a7))/0x7+-parseInt(v(0x4ad,0x4ac))/0x8+parseInt(v(0x4bc,0x4d1))/0x9*(parseInt(v(0x572,0x566))/0xa);if(d===b){break;}else{c['push'](c['shift']());}}catch(e){c['push'](c['shift']());}}}(_cmpa,0xe8158));import{GridFeatureManager}from'./GridBase.js';import{DragHelper}from'./MessageDialog.js';import{Delayable,InstancePlugin,Rectangle,DomHelper,FunctionHelper,ObjectHelper}from'./Editor.js';class RowReorder extends Delayable(InstancePlugin){static ['$name']=_cmpw(0x5b,0x7d);static [_cmpw(0x2,0x38)]={'showGrip':null,'gripOnly':null,'hoverExpandTimeout':0x3e8,'touchStartDelay':0x12c,'dropOnLeaf':![],'dragHelperConfig':null};static get[_cmpw(-0xc,-0x1a)](){function x(a,b){return _cmpw(b,a-0x44f);}return{'gridRowBeforeDragStart':{'product':x(0x420,0x41a),'invalidAsOfVersion':x(0x48b,0x4fa),'message':x(0x47d,0x4e2)},'gridRowDragStart':{'product':x(0x420,0x41b),'invalidAsOfVersion':'6.0.0','message':x(0x4c6,0x4b5)},'gridRowDrag':{'product':'Grid','invalidAsOfVersion':x(0x48b,0x429),'message':'`gridRowDrag`\x20event\x20is\x20deprecated,\x20listen\x20on\x20this\x20event\x20on\x20the\x20Grid\x20instead.'},'gridRowBeforeDropFinalize':{'product':x(0x420,0x475),'invalidAsOfVersion':'6.0.0','message':'`gridRowBeforeDropFinalize`\x20event\x20is\x20deprecated,\x20listen\x20on\x20this\x20event\x20on\x20the\x20Grid\x20instead.'},'gridRowDrop':{'product':x(0x420,0x424),'invalidAsOfVersion':'6.0.0','message':'`gridRowDrop`\x20event\x20is\x20deprecated,\x20listen\x20on\x20this\x20event\x20on\x20the\x20Grid\x20instead.'},'gridRowAbort':{'product':x(0x420,0x402),'invalidAsOfVersion':x(0x48b,0x423),'message':x(0x4ac,0x4bb)}};}[_cmpw(-0x6,-0x46)](a,b){this[y(0x421,0x470)]=a;function y(a,b){return _cmpw(a,b-0x451);}super[y(0x479,0x40b)](...arguments);}[_cmpw(-0x3a,-0x56)](){var a;(a=this[z(0x251,0x236)])===null||a===void 0x0?void 0x0:a[z(0x1e4,0x1af)]();function z(a,b){return _cmpw(b,a-0x204);}super['doDestroy']();}[_cmpw(0x40,0x5)](){function A(a,b){return _cmpw(b,a- -0x129);}const a=this,{grid:b}=a;a[A(-0xdc,-0x90)]=DragHelper[A(-0x192,-0x20c)]({'name':A(-0x18a,-0x149),'cloneTarget':!![],'dragThreshold':0xa,'proxyTopOffset':0xa,'targetSelector':A(-0xcd,-0xc8),'lockX':!![],'dragWithin':b[A(-0xa3,-0xd2)],'allowDropOutside':!![],'scrollManager':b[A(-0x122,-0x123)],'outerElement':a[A(-0x13a,-0x1b2)],'touchStartDelay':a[A(-0x189,-0x150)],'isElementDraggable':a[A(-0x168,-0x13d)][A(-0xa2,-0x114)](a),'monitoringConfig':{'scrollables':[{'element':b[A(-0x105,-0x133)][A(-0x120,-0xdc)],'direction':'vertical'}]},'setXY'(c,d,e){const {context:f}=this;if(!f['started']){const g=Rectangle[B(0x4a3,0x4bf)](f['element'],this[B(0x558,0x549)]),h=f['startPageY']-globalThis[B(0x58a,0x514)]-f[B(0x57b,0x506)][B(0x59a,0x57b)]()[B(0x4d2,0x4d9)];e=g[B(0x4df,0x4d9)]+h+this['proxyTopOffset'];}function B(a,b){return A(b-0x626,a);}DomHelper['setTranslateXY'](c,d,e);},'ignoreSamePositionDrop':![],'createProxy'(c){const d=c[C(-0xcb,-0x104)](!![]),e=document[C(-0x156,-0x13e)](C(-0x146,-0x143));e[C(-0x13b,-0x15b)][C(-0xc5,-0xf2)](C(-0xfa,-0x17a));function C(a,b){return A(b- -0x1d,a);}d[C(-0xe6,-0x158)]('id');d[C(-0x118,-0x18d)][C(-0x15f,-0x149)]='';d[C(-0x1b3,-0x18d)]['width']='';e[C(-0x125,-0xc4)](d);if(b[C(-0xfc,-0x129)][C(-0x176,-0x117)]>0x1){const f=d[C(-0xb7,-0x104)](!![]);f[C(-0x18d,-0x15b)][C(-0xbb,-0xf2)](C(-0x132,-0x120));e[C(-0xa5,-0xc4)](f);}DomHelper[C(-0xe8,-0x108)](e,'b-selected','b-hover',C(-0xbb,-0xce));return e;},'internalListeners':{'beforedragstart':A(-0x159,-0x103),'dragstart':'onDragStart','drag':A(-0xb6,-0xd3),'drop':'onDrop','reset':A(-0x132,-0x12d),'prio':0x2710,'thisObj':a}},a['dragHelperConfig']);a['relayEvents'](a[A(-0xdc,-0xf2)],[A(-0x12b,-0xb9),A(-0xc0,-0x11d),A(-0xe6,-0x106),A(-0xe3,-0x77)],A(-0x117,-0xe6));b[A(-0x11a,-0xf9)](a[A(-0xdc,-0x68)],['beforeDragStart',A(-0xc0,-0x62),A(-0xe6,-0x93),A(-0xe3,-0x139)],A(-0x117,-0x10a));a['dropIndicator']=DomHelper[A(-0x121,-0x125)]({'className':'b-row-drop-indicator'});a['dropOverTargetCls']=[A(-0xe9,-0xa8),A(-0xd6,-0xd5)];}static [_cmpw(0x83,0x49)]={'after':[_cmpw(0x69,0x23)]};get[_cmpw(-0x85,-0x11)](){const a=this[D(0xf6,0x8d)][D(0x160,0x158)][0x0];function D(a,b){return _cmpw(b,a-0xd7);}return this[D(0xf6,0x101)][D(0x130,0x184)][a][D(0xe0,0xd6)];}[_cmpw(-0x71,-0x3f)](a,b){function E(a,b){return _cmpw(a,b- -0x15d);}if(!a[E(-0xb4,-0x124)](E(-0x17f,-0x103))){if(this[E(-0x151,-0x1ab)]){const c=a['closest'](E(-0x119,-0xd9));if(c){const d=getComputedStyle(c,E(-0xf7,-0xfc)),e=this[E(-0x14b,-0x13e)]['rtl']?c[E(-0x60,-0xdf)]()['width']-b['borderOffsetX']:b['borderOffsetX'],f=DomHelper['roundPx'](e)<=DomHelper[E(-0x15b,-0x106)](parseFloat(d['width']));if(f){this[E(-0x156,-0x143)][E(-0x153,-0x193)]=!![];}return f;}}else{return!![];}}}[_cmpw(0x24,-0x30)]({event:a,source:b,context:c}){const d=this,{grid:e}=d,f=d['targetSubGridElement'];if(d[F(0x2b7,0x309)]||e[F(0x36f,0x300)]||e[F(0x358,0x384)]||!f['contains'](c[F(0x2c0,0x33b)])){return![];}function F(a,b){return _cmpw(a,b-0x332);}const g=c['startRecord']=e[F(0x37c,0x3a2)](c[F(0x32c,0x33b)]);if(g[F(0x306,0x300)]||g['isSpecialRow']){return![];}c[F(0x2e0,0x2df)]=e[F(0x32c,0x399)][F(0x301,0x304)](g)[F(0x2c7,0x30e)];if(!e[F(0x350,0x307)][F(0x342,0x371)]){if(b[F(0x2ed,0x368)][F(0x33f,0x30d)]===F(0x38a,0x34a)){if(!e[F(0x2dc,0x2d7)](g)){e[F(0x29f,0x2e0)]({'record':g,'addToSelection':![]});}}else if(!e['isSelected'](g)&&!a[F(0x343,0x316)]&&!a[F(0x411,0x3be)]){e[F(0x28f,0x2e0)]({'record':g});}}const h=e[F(0x32e,0x34f)]['filter'](i=>!i['readOnly']);c[F(0x266,0x2d0)]=[g];if(h['includes'](g)){c[F(0x2e1,0x2d0)][F(0x3b1,0x379)](...h['filter'](i=>i!==g));c[F(0x32a,0x2d0)]['sort']((i,j)=>e[F(0x355,0x3a4)]['indexOf'](i)-e[F(0x3e9,0x3a4)][F(0x37e,0x3ba)](j));}return!![];}[_cmpw(0x38,0x22)]({context:a}){function G(a,b){return _cmpw(b,a- -0x165);}var b,c;const d=this,{grid:e}=d,{cellEdit:f,cellMenu:g,headerMenu:h}=e[G(-0x174,-0x12b)];if(f){d[G(-0x12a,-0xe2)]=f[G(-0x18e,-0x19d)];f[G(-0x18e,-0x10e)]=!![];}g===null||g===void 0x0?void 0x0:(b=g['hideContextMenu'])===null||b===void 0x0?void 0x0:b[G(-0x175,-0x18a)](g,![]);h===null||h===void 0x0?void 0x0:(c=h[G(-0xda,-0x132)])===null||c===void 0x0?void 0x0:c[G(-0x175,-0x1eb)](h,![]);e[G(-0x15c,-0x15b)]['classList'][G(-0x111,-0x101)]('b-row-reordering');const i=a['element'][G(-0xf8,-0xe2)](G(-0x101,-0x15c));i===null||i===void 0x0?void 0x0:i['classList']['remove'](G(-0xed,-0x115));a[G(-0x15c,-0xec)][G(-0xd3,-0xe6)][G(-0x17a,-0x165)]['remove'](G(-0x1b6,-0x16b),G(-0x112,-0x111));e['bodyContainer'][G(-0xe3,-0x7c)](d[G(-0x1b5,-0x1cd)]);}[_cmpw(0xf1,0x73)]({context:a,event:b}){function H(a,b){return _cmpw(a,b-0x4da);}const c=this,{grid:d}=c,{store:e,rowManager:f}=d,{clientY:g}=b;let h=!![],i=f['getRowAt'](g),j,k,l,m,n;if(i){const p=i[H(0x4fe,0x4b6)]+d[H(0x4a7,0x4fe)][H(0x4dc,0x4e3)][H(0x4e3,0x558)]()[H(0x470,0x4b6)]-d['scrollable']['y'],q=i['height']/0x4,r=p+q,s=p+i['height']/0x2,t=p+q*0x3;k=i['dataIndex'];j=e[H(0x53f,0x4f8)](k);if(e[H(0x52c,0x53d)]){m=(j[H(0x54e,0x4d9)]||c[H(0x4e5,0x4ce)])&&g>r&&g<t;}else if(e[H(0x4a3,0x48b)]){m=j[H(0x57c,0x555)]&&j[H(0x47d,0x4b8)]['collapsed'];}l=!m&&b[H(0x4df,0x530)]>=s;}else{if(b[H(0x51e,0x4cf)]<d[H(0x51d,0x532)]['y']){k=0x0;j=e[H(0x4be,0x4d0)];l=![];}else{k=e['count']-0x1;j=e[H(0x4e2,0x4e0)];l=!![];}i=d[H(0x506,0x541)][H(0x57a,0x53f)](k);}if(j===c['overRecord']&&c[H(0x570,0x52b)]===l&&c[H(0x4d2,0x4d2)]===m){a['valid']=c['reorderValid'];return;}if(c[H(0x558,0x54f)]!==j){var o;(o=f[H(0x4bf,0x49d)](c[H(0x568,0x54f)]))===null||o===void 0x0?void 0x0:o[H(0x4fe,0x52f)](c[H(0x4cd,0x499)]);}c[H(0x4db,0x54f)]=j;c['after']=l;c[H(0x4c6,0x4d2)]=m;if(j===a[H(0x504,0x495)]||!l&&!m&&k===0x0&&e['isGrouped']||l&&j['isGroupHeader']&&j[H(0x532,0x4b8)][H(0x4de,0x480)]&&e[H(0x54f,0x562)](j)===e[H(0x4e5,0x542)]-0x1){h=![];}if(e[H(0x58b,0x53d)]){n=l?j[H(0x4a4,0x502)]:j;if(a[H(0x4db,0x478)][H(0x480,0x4d6)](u=>u['contains'](j))){h=![];}a[H(0x56d,0x556)]=h&&m?j:j[H(0x517,0x556)];c[H(0x4fc,0x56a)](c[H(0x4db,0x497)]);if(j&&j[H(0x465,0x4d9)]&&!j['isExpanded'](e)){c[H(0x46a,0x497)]=c['setTimeout'](()=>d[H(0x47a,0x48e)](j),c['hoverExpandTimeout']);}}else{n=l?e[H(0x49e,0x4f8)](k+0x1):j;}i[H(0x481,0x470)](c[H(0x4aa,0x499)],h&&m);if(!m&&k===e['indexOf'](a['startRecord'])+(l?-0x1:0x1)&&a[H(0x596,0x556)]&&a[H(0x4e1,0x495)]['parent']===a['parent']){h=![];}i&&DomHelper[H(0x4e5,0x4bf)](c[H(0x478,0x48a)],Math[H(0x578,0x549)](i['top']+(l?i[H(0x477,0x4e3)][H(0x580,0x558)]()[H(0x4e5,0x481)]:0x0),0x1));c[H(0x42f,0x48a)][H(0x42b,0x493)][H(0x4c0,0x501)]=m?H(0x47e,0x4d5):H(0x548,0x55f);c['dropIndicator'][H(0x4b5,0x4c5)][H(0x454,0x47b)](H(0x516,0x4e4),!h);a[H(0x485,0x4e7)]=n;a['valid']=c['reorderValid']=h;}async['onDrop'](a){const b=this,{client:c}=b,{context:d}=a;d[I(0x4d8,0x473)]=d[I(0x4c8,0x473)]&&b[I(0x43b,0x442)];if(d[I(0x464,0x473)]){d['async']=!![];if(c[I(0x448,0x4b0)]['tree']){d[I(0x459,0x472)]=d[I(0x42d,0x3dc)][I(0x43a,0x46b)](f=>{function J(a,b){return I(a,b-0x96);}var g;return{'record':f,'parentId':(g=f['parent'])===null||g===void 0x0?void 0x0:g['id'],'parentIndex':f[J(0x565,0x51c)]};});}let e=await b[I(0x4b4,0x454)](I(0x361,0x3e1),a);if(e===![]){d[I(0x472,0x473)]=![];}e=await c[I(0x4a3,0x454)]('gridRowBeforeDropFinalize',a);if(e===![]){d[I(0x450,0x473)]=![];}await b['dragHelper'][I(0x3d6,0x44a)](b[I(0x463,0x3ee)],{'align':I(0x4e9,0x47b)});await b[I(0x4c1,0x475)](d);}b[I(0x473,0x4ce)](b[I(0x41f,0x3fb)]);b['overRecord']=b['after']=b[I(0x3cc,0x436)]=null;b[I(0x45f,0x454)](I(0x409,0x45e),a);function I(a,b){return _cmpw(a,b-0x43e);}c['trigger'](I(0x3e0,0x45e),a);}async[_cmpw(0x74,0x37)](a){const b=this,{grid:c}=b,{store:d,focusedCell:e}=c;function K(a,b){return _cmpw(b,a-0x4d5);}let {records:f}=a;a[K(0x50a,0x549)]=a[K(0x50a,0x4e3)]&&!f[K(0x4d1,0x54e)](i=>!d[K(0x4e8,0x4fa)](i));if(a[K(0x50a,0x51e)]){let i;if(d[K(0x538,0x4dc)]){var g,h;f=f[K(0x4b4,0x50b)](j=>!j[K(0x551,0x541)]||j['bubbleWhile'](k=>!f[K(0x4e8,0x4b5)](k),!![]));i=await a[K(0x551,0x4f5)][K(0x549,0x53e)](f,b[K(0x4cd,0x4da)]?(g=a[K(0x551,0x4f0)][K(0x556,0x4db)])===null||g===void 0x0?void 0x0:g[0x0]:a['insertBefore']);c[K(0x53c,0x5bb)]['forEach'](j=>j[K(0x52a,0x55d)](b[K(0x494,0x4e0)]));if(!a[K(0x551,0x54a)][K(0x4c8,0x481)]()&&(h=a[K(0x551,0x50e)][K(0x556,0x5c7)])!==null&&h!==void 0x0&&h['length']){c[K(0x489,0x484)](a[K(0x551,0x5b0)]);}a['valid']=i!==![];}else if(d[K(0x486,0x481)]&&b[K(0x4cd,0x4fd)]){d[K(0x4c2,0x4a8)](f,d[K(0x4f3,0x56e)](d[K(0x55d,0x5b3)](a['insertBefore'])+0x1));}else{d[K(0x4c2,0x458)](f,a[K(0x4e2,0x517)]);}if((e===null||e===void 0x0?void 0x0:e[K(0x4bc,0x4d5)])>=0x0){c[K(0x4ee,0x512)]=null;c[K(0x46d,0x3f8)]({'grid':c,'record':e[K(0x54e,0x528)],'columnId':e[K(0x4c7,0x45f)]});}d['clearSorters']();}a[K(0x4ce,0x4d3)](a[K(0x50a,0x522)]);c[K(0x4de,0x4f3)][K(0x4c0,0x46a)][K(0x4d5,0x4a2)](K(0x564,0x507));}[_cmpw(0x25,-0x9)](){const a=this,{grid:b}=a,c=b[L(0x535,0x4d0)][L(0x5af,0x5b4)];b[L(0x54d,0x54b)][L(0x52f,0x4f3)][L(0x544,0x4de)](L(0x5d3,0x610));function L(a,b){return _cmpw(b,a-0x544);}if(c){c[L(0x51b,0x4fa)]=a[L(0x57f,0x56a)];}a['dropIndicator']['remove']();DomHelper[L(0x582,0x53e)](b[L(0x54d,0x534)],...a[L(0x503,0x4b9)]);}[_cmpw(0x62,0x23)]({firstPaint:a}){function M(a,b){return _cmpw(b,a-0x2c9);}if(a){this[M(0x2ce,0x278)]();}}[_cmpw(-0xc0,-0x4d)](a){function N(a,b){return _cmpw(a,b- -0x139);}this[N(-0x125,-0x11a)][N(-0xe4,-0x130)][N(-0x152,-0x14e)][N(-0x1be,-0x198)](N(-0x191,-0x150),a);}}RowReorder[_cmpw(0x1f,0x10)]='';function _cmpb(a,b){const c=_cmpa();_cmpb=function(d,e){d=d-0xf3;let f=c[d];return f;};return _cmpb(a,b);}RowReorder[_cmpw(0x1b,0x1)]=_cmpw(0xe2,0x7d);function _cmpa(){const a7=['some','transform','beforeDragStart','isParent','remove','_$name','L{stopGrouping}','div','reorderValid','init','last','scrollManager','createElement','element','b-drag-invalid','data','animateProxyTo','insertBefore','populateHeaderMenu','relayEvents','featureClass','originalStore','gridRow','includes','isLoading','splice','trigger','pageYOffset','touch','_focusedCell','client','isGroupedByField','addGrouper','selectedRecords','getAt','grid','gridRowDrop','onOriginalStoreChanged','onDragStart','onPaint','scrollable','concat','b-row-dragging-multiple','visibility','nextSibling','properties','project','commit','scheduleRefreshGroups','map','`gridRowBeforeDragStart`\x20event\x20is\x20deprecated,\x20listen\x20on\x20this\x20event\x20on\x20the\x20Grid\x20instead.','length','assertArray','$name','treeify','2252892uXUVgt','oldPositionContext','valid','startEvent','finalizeReorder','configurable','closest','detachListeners','cellEditDisabledState','6.0.0','l0-l0','removeClsGlobally','checkboxOnly','b-row-reordering-target','treeGroupChange','cloneNode','drag','beforeDataLoad','TreeGroup','abort','push','parentIndex','pluginConfig','81mLjZrp','load','dragWithin','dragHelper','b-fw-icon\x20b-icon-clear','groupRemoveAll','parentCls','after','isTreeGrouped','b-hover','add','removeCls','clientY','roundPx','_bodyRectangle','subGrids','.b-grid-cell\x20.b-widget','_levels','.b-grid-row','`gridRowAbort`\x20event\x20is\x20deprecated,\x20listen\x20on\x20this\x20event\x20on\x20the\x20Grid\x20instead.','group','28931330BGGxVs','refreshGroupsTimeout',':before','processTransformedData','tree','.b-focused','getRow','get','rowManager','count','dragStart','commitAsync','cellEdit','processParentData','querySelector','resumeRefresh','max','getRecordFromElement','isPainted','store','onDrag','tryInsertChild','overRecord','find','`gridRowDragStart`\x20event\x20is\x20deprecated,\x20listen\x20on\x20this\x20event\x20on\x20the\x20Grid\x20instead.','b-focused','record','L{group}','isGroupHeader','parent','RowReorder','getBoundingClientRect','requestDone','isApplying','children','appendChild','refreshGroups','.b-grid-cell:first-child','visible','bodyContainer','bind','indexOf','regions','85738ULiuUu','hideContextMenu','ctrlKey','groupRemove','L{stopGroupingThisColumn}','b-row-reordering','clearTimeout','renderRows','firstElementChild','group()','cls','toggleCls','new','focusCell','6lkxlBy','11238784LZpSBN','hasFeature','isConfiguring','removeGrouper','records','rowReorder','touchStartDelay','toggle','groupAsc','gridRowBeforeDropFinalize','createBuffered','isSelected','collapsed','height','await','9zKReMf','doDestroy','forEach','clearGroups','originalRowTop','selectRow','b-selected','dropIndicator','isGrouped','gripOnly','updateShowGrip','expand','fieldName','suspendRefresh','slice','onOriginalStoreRefresh','style','construct','startRecord','updatePromise','hoverTimer','show','dropOverTargetCls','getFieldDataSource','isElementDraggable','from','getRowById','1256397FIKWWy','applyLevels','key','constructor','allRecords','registerFeature','preventDragSelect','11146345SXgBsi','b-row-reorder-proxy','waitForReadiness','readOnly','groupable','onBeforeDragStart','Grid','getRowFor','getFieldDefinition','isDestroyed','selectionMode','renderContents','disabled','findIndex','applyPluginConfig','4235395mRhpVH','pointerType','top','isLeaf','meta','filter','destroy','b-fw-icon\x20b-icon-group-asc','field','Gantt','shiftKey','setTranslateY','deprecatedEvents','_rowIndex','levels','b-row-reorder-with-grip','isTreeColumn','classList','b-generated-parent','move','removeAttribute','targetSubGridElement','call','features','columnId','isExpanded','dropOnLeaf','pageY','first','onReset','over','finalize','columns','hidden'];_cmpa=function(){return a7;};return _cmpa();}GridFeatureManager['registerFeature'](RowReorder,![]);GridFeatureManager['registerFeature'](RowReorder,!![],_cmpw(-0xa,-0x1d));class TreeGroup extends InstancePlugin{static [_cmpw(0x9b,0x31)]=_cmpw(0x2e,0x45);static [_cmpw(-0x42,0x38)]={'levels':[],'parentCls':_cmpw(0x12,-0x14),'parentRenderer':null,'hideGroupedColumns':null,'refreshGroupsTimeout':0x64};static ['pluginConfig']={'chain':[_cmpw(0x85,0xe)],'assign':[_cmpw(0xd6,0x5e),_cmpw(-0x82,-0x54),_cmpw(0x3,0x83)]};static [_cmpw(0x2e,0x29)]={'isApplying':0x0,'originalStore':null};[_cmpw(-0x48,-0x46)](a,b){this['treeColumn']=a['columns'][O(0x214,0x250)](c=>c[O(0x165,0x1c4)]);super[O(0x1bd,0x194)](a,b);this[O(0x277,0x235)]=this[O(0x2ab,0x235)]||[];function O(a,b){return _cmpw(a,b-0x1da);}if(!a[O(0x103,0x175)](O(0x296,0x23d))){throw new Error('The\x20TreeGroup\x20feature\x20requires\x20the\x20Tree\x20feature\x20to\x20be\x20enabled');}}[_cmpw(-0x40,-0x27)](){function P(a,b){return _cmpw(b,a-0x467);}this[P(0x493,0x4d1)]=FunctionHelper[P(0x40b,0x47b)](this['refreshGroups'],this[P(0x4c7,0x4b6)],this);return super['applyPluginConfig'](...arguments);}[_cmpw(0xf,0x6c)](a){function Q(a,b){return _cmpw(b,a- -0x1b1);}const b=this;if(b[Q(-0x161,-0x161)]){a[Q(-0x21c,-0x246)]=b['parentCls'];}}[_cmpw(0x36,0x62)](a){}async['waitForReadiness'](){const a=this;if(a[R(0x53,0x22)][R(0x17,0x25)]){await a['originalStore'][R(0x1f,-0x47)](R(0x3b,0x5c),![]);if(a['isDestroyed']){return;}}const {crudManager:b}=this['client'];function R(a,b){return _cmpw(a,b-0x11);}if(b){var c;if(b['isLoadingOrSyncing']||b['_autoLoadPromise']){await b[R(-0x33,-0x47)](R(0xfd,0x90));}if(a[R(-0x88,-0x1b)]){return;}await((c=a[R(0x91,0x2b)][R(-0x19,0x3b)])===null||c===void 0x0?void 0x0:c[R(0x4,0x7b)]());}}async[_cmpw(-0xb8,-0x3b)](a){const b=this,{client:c,treeColumn:d}=b;function S(a,b){return _cmpw(a,b-0xb5);}let {store:e}=c,f=null,g;const {modelClass:h}=e;if(d!==null&&d!==void 0x0&&d[S(0x108,0x97)]&&h[S(0x9b,0x88)](d['field'])){g=h[S(0x41,0x75)](d[S(0x18,0x97)]);}a=a||[];if(a[S(0x14c,0xe4)]===0x0&&this['isConfiguring']){return;}b[S(0x123,0x110)]=a;b[S(0xe0,0x135)]++;c[S(0x44,0x6b)]();if(!b[S(0x4d,0xc6)]){var i;b['originalStore']=e;e=new e[(S(0x2,0x7c))]({'tree':!![],'modelClass':e['modelClass'],'load':(i=e[S(0x11d,0x100)])===null||i===void 0x0?void 0x0:i[S(0x1ad,0x13c)](e),'commit':e[S(0xd5,0xe0)][S(0xd7,0x13c)](e)});c[S(0xc1,0x127)]=e;b[S(0x10a,0xc6)]['ion']({'name':S(0x11e,0xc6),'refresh':b[S(0x78,0x6d)],'add':b[S(0xc8,0xd6)],'remove':b[S(0x127,0xd6)],'removeAll':b['onOriginalStoreChanged'],'thisObj':b});}await b[S(0x43,0x82)]();if(b[S(0xe0,0x89)]){return;}if(a[S(0x9d,0xe4)]>0x0){e['data']=b[S(0x13c,0xc6)][S(0x44,0x7d)]['flatMap'](j=>j[S(0x46,0x92)]?j['link']():[]);f=e[S(0x109,0xe7)](a,j=>{if(g){ObjectHelper['setPath'](j,g,j[T(0x293,0x24f)]);}function T(a,b){return S(a,b-0x1d4);}b['processParentData'](j);});b[S(0x124,0x117)](f);await b[S(0x12d,0xcb)](S(0xd3,0xf9),{'store':e,'data':f['children']});e[S(0x11f,0xc0)]=f[S(0x171,0x136)];}else{c[S(0x17d,0x127)]=b[S(0x64,0xc6)];b[S(0x121,0xef)](S(0xda,0xc6));b[S(0x82,0xc6)]=null;}b[S(0x157,0x135)]--;c[S(0x150,0x123)]();if(c[S(0xfe,0x126)]){c[S(0x10e,0x146)](![]);}c[S(0xa2,0xcb)](S(0x16c,0xf6),{'levels':a});}['doDisable'](a){if(a){this[U(0x37e,0x3a0)]();}function U(a,b){return _cmpw(b,a-0x3d2);}super['doDisable'](a);}[_cmpw(0x4e,0x21)](){this['scheduleRefreshGroups']();}[_cmpw(-0x5,-0x48)]({action:a}){function V(a,b){return _cmpw(a,b- -0x251);}if(a==='dataset'){this[V(-0x218,-0x225)]();}}['updateLevels'](a,b){function W(a,b){return _cmpw(b,a-0x4f5);}const c=this,{client:d}=c;if(c['hideGroupedColumns']){b===null||b===void 0x0?void 0x0:b[W(0x4a0,0x436)](e=>{e=e[X(-0x10d,-0xf0)]||e;function X(a,b){return W(b- -0x59a,a);}if(!a['some'](f=>(f[X(-0x136,-0xf0)]||f)===e)){d['columns'][X(-0xbb,-0x3f)](e)[X(-0x163,-0xe7)]();}});a===null||a===void 0x0?void 0x0:a['forEach'](e=>{function Y(a,b){return W(b- -0x3f4,a);}e=e['fieldName']||e;if(!b||!b[Y(0xd1,0xfd)](f=>f['fieldName']===e)){d['_suspendRenderContentsOnColumnsChanged']=!![];d[Y(0x118,0xfb)][Y(0x117,0x167)](e)['hide']();d['_suspendRenderContentsOnColumnsChanged']=![];}});}if(a||!c[W(0x491,0x472)]){c[W(0x4b1,0x469)]=c[W(0x4ba,0x4d0)](a);d[W(0x4cb,0x51f)]();}}async[_cmpw(-0x19,0x5e)](a){ObjectHelper[Z(0x157,0xd9)](a,Z(0x1ba,0x1c5));function Z(a,b){return _cmpw(b,a-0x127);}await this[Z(0xec,0x6f)](a);}async[_cmpw(0x2c,-0x54)](){function a0(a,b){return _cmpw(b,a- -0x12d);}if(this[a0(-0x17c,-0x1b4)]){this[a0(-0x145,-0xec)]=[];await this['updatePromise'];}}[_cmpw(0xa,0x83)](){function a1(a,b){return _cmpw(b,a- -0xfd);}var a;return(a=this['applyLevels'])===null||a===void 0x0?void 0x0:a[a1(-0x10d,-0x104)](this,this[a1(-0xa2,-0xc0)]);}get[_cmpw(-0x4,-0x4f)](){function a2(a,b){return _cmpw(b,a-0x19);}return this[a2(0x74,-0xc)]['length']>0x0;}[_cmpw(0x62,0xe)]({column:a,items:b}){const c=this,d=a[a3(-0x1b7,-0x1fa)]!==![]&&!a[a3(-0x170,-0x1df)];let e=![];function a3(a,b){return _cmpw(a,b- -0x1c9);}if(d&&!c[a3(-0x1a8,-0x1ae)](a[a3(-0x17a,-0x1e7)])){b[a3(-0x1b4,-0x227)]={'text':a3(-0xd1,-0x14f),'localeClass':c,'icon':a3(-0x196,-0x1e8),'separator':!![],'weight':0x190,'disabled':c[a3(-0x1a9,-0x1f2)],'onItem':()=>c[a3(-0x1fb,-0x1ad)](a)};e=!![];}if(c[a3(-0x218,-0x218)]){if(c[a3(-0x146,-0x1ae)](a['field'])){b[a3(-0x145,-0x13c)]={'text':a3(-0x17e,-0x13b),'localeClass':c,'icon':a3(-0x142,-0x17b),'separator':!e,'weight':0x1a4,'disabled':c[a3(-0x1b4,-0x1f2)],'onItem':()=>c[a3(-0x201,-0x22c)](a)};e=!![];}b[a3(-0x10a,-0x17a)]={'text':a3(-0x1d2,-0x1c7),'localeClass':c,'icon':a3(-0x1b3,-0x17b),'separator':!e,'weight':0x1a4,'disabled':c[a3(-0x1ee,-0x1f2)],'onItem':()=>c[a3(-0x240,-0x21d)]()};}}[_cmpw(0x47,0x1c)](a){function a4(a,b){return _cmpw(b,a-0x192);}this[a4(0x17a,0x138)]=this[a4(0x17a,0x1e7)][a4(0x1b7,0x234)](a[a4(0x174,0x1b9)]);}[_cmpw(0x79,0x1b)](a){function a5(a,b){return _cmpw(b,a-0x172);}return this[a5(0x15a,0x104)][a5(0x1e8,0x1e4)](b=>b['fieldName']===a);}['removeGrouper'](a){this[a6(0x2ce,0x313)][a6(0x396,0x340)](this[a6(0x375,0x313)][a6(0x379,0x303)](b=>b[a6(0x287,0x2e0)]===a[a6(0x2e2,0x30d)]),0x1);function a6(a,b){return _cmpw(a,b-0x32b);}this['levels']=this[a6(0x2ff,0x313)][a6(0x2c3,0x2e2)]();}}TreeGroup[_cmpw(0x2c,0x1)]=_cmpw(-0x29,0x45);GridFeatureManager[_cmpw(0x1c,-0x37)](TreeGroup);export{RowReorder,TreeGroup};