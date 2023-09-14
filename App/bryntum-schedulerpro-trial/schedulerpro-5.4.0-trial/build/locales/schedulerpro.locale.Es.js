/*!
 *
 * Bryntum Scheduler Pro 5.4.0 (TRIAL VERSION)
 *
 * Copyright(c) 2023 Bryntum AB
 * https://bryntum.com/contact
 * https://bryntum.com/license
 *
 */
(function(l,t){var i=typeof exports=="object";if(typeof define=="function"&&define.amd)define([],t);else if(typeof module=="object"&&module.exports)module.exports=t();else{var c=t(),m=i?exports:l;for(var p in c)m[p]=c[p]}})(typeof self<"u"?self:void 0,()=>{var l={},t={exports:l},i=Object.defineProperty,c=Object.getOwnPropertyDescriptor,m=Object.getOwnPropertyNames,p=Object.prototype.hasOwnProperty,g=(e,a,o)=>a in e?i(e,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[a]=o,v=(e,a)=>{for(var o in a)i(e,o,{get:a[o],enumerable:!0})},b=(e,a,o,n)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of m(a))!p.call(e,r)&&r!==o&&i(e,r,{get:()=>a[r],enumerable:!(n=c(a,r))||n.enumerable});return e},h=e=>b(i({},"__esModule",{value:!0}),e),f=(e,a,o)=>(g(e,typeof a!="symbol"?a+"":a,o),o),u={};v(u,{default:()=>R}),t.exports=h(u);var d=class{static mergeLocales(...e){let a={};return e.forEach(o=>{Object.keys(o).forEach(n=>{typeof o[n]=="object"?a[n]={...a[n],...o[n]}:a[n]=o[n]})}),a}static trimLocale(e,a){let o=(n,r)=>{e[n]&&(r?e[n][r]&&delete e[n][r]:delete e[n])};Object.keys(a).forEach(n=>{Object.keys(a[n]).length>0?Object.keys(a[n]).forEach(r=>o(n,r)):o(n)})}static normalizeLocale(e,a){if(!e)throw new Error('"nameOrConfig" parameter can not be empty');if(typeof e=="string"){if(!a)throw new Error('"config" parameter can not be empty');a.locale?a.name=e||a.name:a.localeName=e}else a=e;let o={};if(a.name||a.locale)o=Object.assign({localeName:a.name},a.locale),a.desc&&(o.localeDesc=a.desc),a.code&&(o.localeCode=a.code),a.path&&(o.localePath=a.path);else{if(!a.localeName)throw new Error(`"config" parameter doesn't have "localeName" property`);o=Object.assign({},a)}for(let n of["name","desc","code","path"])o[n]&&delete o[n];if(!o.localeName)throw new Error("Locale name can not be empty");return o}static get locales(){return globalThis.bryntum.locales||{}}static set locales(e){globalThis.bryntum.locales=e}static get localeName(){return globalThis.bryntum.locale||"En"}static set localeName(e){globalThis.bryntum.locale=e||d.localeName}static get locale(){return d.localeName&&this.locales[d.localeName]||this.locales.En||Object.values(this.locales)[0]||{localeName:"",localeDesc:"",localeCoode:""}}static publishLocale(e,a){let{locales:o}=globalThis.bryntum,n=d.normalizeLocale(e,a),{localeName:r}=n;return!o[r]||a===!0?o[r]=n:o[r]=this.mergeLocales(o[r]||{},n||{}),o[r]}},s=d;f(s,"skipLocaleIntegrityCheck",!1),globalThis.bryntum=globalThis.bryntum||{},globalThis.bryntum.locales=globalThis.bryntum.locales||{},s._$name="LocaleHelper";var D={localeName:"Es",localeDesc:"Español",localeCode:"es",RemoveDependencyCycleEffectResolution:{descriptionTpl:"Eliminar dependencia"},DeactivateDependencyCycleEffectResolution:{descriptionTpl:"Desactivar dependencia"},CycleEffectDescription:{descriptionTpl:"Se ha encontrado un ciclo formado por: {0}"},EmptyCalendarEffectDescription:{descriptionTpl:'el calendario "{0}" no proporciona intervalos de tiempo de trabajo.'},Use24hrsEmptyCalendarEffectResolution:{descriptionTpl:"Use un calendario de 24 con los sábados y dominngos no lectivos."},Use8hrsEmptyCalendarEffectResolution:{descriptionTpl:"Use un calendario de 8 horas (08:00-12:00, 13:00-17:00) con sábados y domingos no lectivos."},ConflictEffectDescription:{descriptionTpl:"Se ha detectado un conflicto de programación: {0} está en conflicto con {1}"},ConstraintIntervalDescription:{dateFormat:"LLL"},ProjectConstraintIntervalDescription:{startDateDescriptionTpl:"Fecha de inicio del proyecto {0}",endDateDescriptionTpl:"Fecha de finalización del proyecto {0}"},DependencyType:{long:["De inicio a inicio","De inicio a finalización","De finalización a inicio","De finalización a finalización"]},ManuallyScheduledParentConstraintIntervalDescription:{startDescriptionTpl:'"{2}" programado manualmente fuerza a sus dependientes a no empezar antes de {0}',endDescriptionTpl:'"{2}" programado manualmente fuerza a sus dependientes a no empezar antes de {1}'},DisableManuallyScheduledConflictResolution:{descriptionTpl:'Desactivar programación manual para "{0}"'},DependencyConstraintIntervalDescription:{descriptionTpl:'Dependencia ({2}) desde "{3}" hasta "{4}"'},RemoveDependencyResolution:{descriptionTpl:'Eliminar dependencia de "{1}" a "{2}"'},DeactivateDependencyResolution:{descriptionTpl:'Desactivar dependencia desde "{1}" hasta "{2}"'},DateConstraintIntervalDescription:{startDateDescriptionTpl:'Limitación de tareas "{2}" {3} {0}',endDateDescriptionTpl:'Limitación de tareas "{2}" {3} {1}',constraintTypeTpl:{startnoearlierthan:"Empezar no antes del",finishnoearlierthan:"Terminar no antes del",muststarton:"Debe empezar el",mustfinishon:"Debe terminar el",startnolaterthan:"Empezar no después del",finishnolaterthan:"Terminar no después del"}},RemoveDateConstraintConflictResolution:{descriptionTpl:'Eliminar limitación "{1}" de la tarea "{0}"'}},A=s.publishLocale(D),y={localeName:"Es",localeDesc:"Español",localeCode:"es",Object:{Yes:"Sí",No:"No",Cancel:"Cancelar",Ok:"Correcto",Week:"Semana"},ColorPicker:{noColor:"Sin color"},Combo:{noResults:"Sin resultados",recordNotCommitted:"No se ha podido añadir un registro",addNewValue:e=>`Agregar ${e}`},FilePicker:{file:"Archivo"},Field:{badInput:"Valor de campo no válido",patternMismatch:"El valor debe coincidir con un patrón específico",rangeOverflow:e=>`El valor debe ser inferior o igual a ${e.max}`,rangeUnderflow:e=>`El valor debe ser superior o igual a ${e.min}`,stepMismatch:"El valor debe adaptarse al paso",tooLong:"El valor debe ser más corto",tooShort:"El valor debe ser más largo",typeMismatch:"El valor debe estar en un formato especial",valueMissing:"Este campo es obligatorio",invalidValue:"Valor de campo no válido",minimumValueViolation:"Infracción de valor mínimo",maximumValueViolation:"Infracción de valor máximo",fieldRequired:"Este campo es obligatorio",validateFilter:"El valor debe seleccionarse de la lista"},DateField:{invalidDate:"Entrada de fecha no válida"},DatePicker:{gotoPrevYear:"Ir al año anterior",gotoPrevMonth:"Ir al mes anterior",gotoNextMonth:"Ir al mes siguiente",gotoNextYear:"Ir al año siguiente"},NumberFormat:{locale:"es",currency:"EUR"},DurationField:{invalidUnit:"Unidad no válida"},TimeField:{invalidTime:"Entrada de hora no válida"},TimePicker:{hour:"Hora",minute:"Minuto",second:"Segundo"},List:{loading:"Cargando...",selectAll:"Seleccionar todo"},GridBase:{loadMask:"Cargando...",syncMask:"Guardando cambios, espere..."},PagingToolbar:{firstPage:"Ir a la primera página",prevPage:"Ir a la página anterior",page:"Página",nextPage:"Ir a la página siguiente",lastPage:"Ir a la última página",reload:"Refrescar la página actual",noRecords:"Sin registros que mostrar",pageCountTemplate:e=>`de ${e.lastPage}`,summaryTemplate:e=>`Mostrando registros ${e.start} - ${e.end} de ${e.allCount}`},PanelCollapser:{Collapse:"Contrar",Expand:"Expandir"},Popup:{close:"Cerrar desplegable"},UndoRedo:{Undo:"Deshacer",Redo:"Rehacer",UndoLastAction:"Deshacer la última acción",RedoLastAction:"Rehacer la última acción deshecha",NoActions:"Sin elementos en la cola de deshacer"},FieldFilterPicker:{equals:"equivale a",doesNotEqual:"no equivale a",isEmpty:"está vacío",isNotEmpty:"no está vacío",contains:"contiene",doesNotContain:"no contiene",startsWith:"empieza por",endsWith:"termina por",isOneOf:"es uno de",isNotOneOf:"no es uno de",isGreaterThan:"es mayor que",isLessThan:"es menor que",isGreaterThanOrEqualTo:"es mayor que o igual a",isLessThanOrEqualTo:"es menor que o igual a",isBetween:"está entre",isNotBetween:"no está entre",isBefore:"es anterior",isAfter:"es posterior",isToday:"es hoy",isTomorrow:"es mañana",isYesterday:"fue ayer",isThisWeek:"es esta semana",isNextWeek:"es la semana que viene",isLastWeek:"fue la semana pasada",isThisMonth:"es este mes",isNextMonth:"es el mes que viene",isLastMonth:"fue el mes pasado",isThisYear:"es este año",isNextYear:"es el año que viene",isLastYear:"fue el año pasado",isYearToDate:"es el año hasta la fecha",isTrue:"es cierto",isFalse:"es falso",selectAProperty:"Seleccionar una propiedad",selectAnOperator:"Seleccionar un operador",caseSensitive:"Diferencia entre mayúsculas y minúsculas",and:"y",dateFormat:"D/M/YY",selectOneOrMoreValues:"Seleccionar uno o más valores",enterAValue:"Introducir un valor",enterANumber:"Introducir un número",selectADate:"Seleccionar una fecha"},FieldFilterPickerGroup:{addFilter:"Añadir filtro"},DateHelper:{locale:"es",weekStartDay:1,nonWorkingDays:{0:!0,6:!0},weekends:{0:!0,6:!0},unitNames:[{single:"milisegundo",plural:"ms",abbrev:"ms"},{single:"segundo",plural:"segundos",abbrev:"s"},{single:"minuto",plural:"minutos",abbrev:"min"},{single:"hora",plural:"horas",abbrev:"h"},{single:"día",plural:"días",abbrev:"d"},{single:"semana",plural:"semanas",abbrev:"sem."},{single:"mes",plural:"meses",abbrev:"mes"},{single:"trimestre",plural:"trimestres",abbrev:"trim."},{single:"año",plural:"años",abbrev:"a."},{single:"década",plural:"décadas",abbrev:"déc."}],unitAbbreviations:[["mil"],["s","seg"],["m","min"],["h","hr"],["d"],["sem.","sem"],["m","mes"],["T","trim"],["a","añ"],["déc"]],parsers:{L:"DD/MM/YYYY",LT:"HH:mm",LTS:"HH:mm:ss A"},ordinalSuffix:e=>e+"°"}},N=s.publishLocale(y),E=new String,C={localeName:"Es",localeDesc:"Español",localeCode:"es",ColumnPicker:{column:"Columna",columnsMenu:"Columnas",hideColumn:"Ocultar columna",hideColumnShort:"Ocultar",newColumns:"Nuevas columnas"},Filter:{applyFilter:"Aplicar filtro",filter:"Filtro",editFilter:"Editar filtro",on:"Activo",before:"Antes",after:"Después",equals:"Equivale a",lessThan:"Inferior a",moreThan:"Superior a",removeFilter:"Quitar filtro",disableFilter:"Deshabilitar filtro"},FilterBar:{enableFilterBar:"Mostrar barra de filtro",disableFilterBar:"Ocultar barra de filtro"},Group:{group:"Agrupar",groupAscending:"Agrupar ascendentes",groupDescending:"Agrupar descendentes",groupAscendingShort:"Ascendentes",groupDescendingShort:"Descendentes",stopGrouping:"Dejar de agrupar",stopGroupingShort:"Dejar"},HeaderMenu:{moveBefore:e=>`Mover delante de "${e}"`,moveAfter:e=>`Mover detrás de "${e}"`,collapseColumn:"Comprimir columna",expandColumn:"Expandir columna"},ColumnRename:{rename:"Renombrar"},MergeCells:{mergeCells:"Combinar celdas",menuTooltip:"Combinar celdas con el mismo valor al ordenarlas por esta columna"},Search:{searchForValue:"Buscar valor"},Sort:{sort:"Ordenar",sortAscending:"Orden ascendente",sortDescending:"Orden descendente",multiSort:"Orden múltiple",removeSorter:"Eliminar criterio de orden",addSortAscending:"Añadir criterio ascendente",addSortDescending:"Añadir criterio ascendente",toggleSortAscending:"Cambiar a ascendente",toggleSortDescending:"Cambiar a descendente",sortAscendingShort:"Ascendente",sortDescendingShort:"Descendente",removeSorterShort:"Eliminar",addSortAscendingShort:"+ Ascendente",addSortDescendingShort:"+ Descendente"},Split:{split:"Dividir",unsplit:"No dividir",horizontally:"Horizontalmente",vertically:"Verticalmente",both:"Ambos"},Column:{columnLabel:e=>`${e.text?`${e.text} columna. `:""}ESPACIO para el menú contextual${e.sortable?", INTRO para ordenar":""}`,cellLabel:E},Checkbox:{toggleRowSelect:"Alternar selección de filas",toggleSelection:"Alternar selección de todo el conjunto de datos"},RatingColumn:{cellLabel:e=>{var a;return`${e.text?e.text:""} ${(a=e.location)!=null&&a.record?`clasificación : ${e.location.record.get(e.field)||0}`:""}`}},GridBase:{loadFailedMessage:"Fallo al cargar los datos",syncFailedMessage:"Fallo al sincronizar los datos",unspecifiedFailure:"Fallo no especificado",networkFailure:"Error de red",parseFailure:"Fallo al analizar la respuesta del servidor",serverResponse:"Respuesta del servidor:",noRows:"Sin registros que mostrar",moveColumnLeft:"Mover a la sección izquierda",moveColumnRight:"Mover a la sección derecha",moveColumnTo:e=>`Mover columna a ${e}`},CellMenu:{removeRow:"Eliminar"},RowCopyPaste:{copyRecord:"Copiar",cutRecord:"Cortar",pasteRecord:"Pegar",rows:"filas",row:"fila"},CellCopyPaste:{copy:"Copiar",cut:"Cortar",paste:"Pegar"},PdfExport:{"Waiting for response from server":"Esperando respuesta del servidor...","Export failed":"Fallo al exportar","Server error":"Error del servidor","Generating pages":"Generando páginas...","Click to abort":"Cancelar"},ExportDialog:{width:"40em",labelWidth:"12em",exportSettings:"Exportar ajustes",export:"Exportar",exporterType:"Controlar la paginación",cancel:"Cancelar",fileFormat:"Formato de archivo",rows:"Filas",alignRows:"Alinear filas",columns:"Columnas",paperFormat:"Formato de papel",orientation:"Orientación",repeatHeader:"Repetir encabezado"},ExportRowsCombo:{all:"Todas las filas",visible:"Filas visibles"},ExportOrientationCombo:{portrait:"Retrato",landscape:"Panorámica"},SinglePageExporter:{singlepage:"Una sola página"},MultiPageExporter:{multipage:"Páginas múltiples",exportingPage:({currentPage:e,totalPages:a})=>`Exportando página ${e}/${a}`},MultiPageVerticalExporter:{multipagevertical:"Páginas múltiples (vertical)",exportingPage:({currentPage:e,totalPages:a})=>`Exportando página  ${e}/${a}`},RowExpander:{loading:"Cargando",expand:"Expandir",collapse:"Contrar"},TreeGroup:{group:"Agrupar por",stopGrouping:"Detener agrupación",stopGroupingThisColumn:"Desagrupar esta columna"}},P=s.publishLocale(C),T={localeName:"Es",localeDesc:"Español",localeCode:"es",Object:{newEvent:"Nuevo evento"},ResourceInfoColumn:{eventCountText:e=>e+" evento"+(e!==1?"s":"")},Dependencies:{from:"Desde",to:"a",valid:"Válido",invalid:"No válido"},DependencyType:{SS:"II",SF:"IF",FS:"FI",FF:"FF",StartToStart:"De inicio a inicio",StartToEnd:"De inicio a finalización",EndToStart:"De finalización a inicio",EndToEnd:"De finalización a finalización",short:["II","IF","FI","FF"],long:["De inicio a inicio","De inicio a finalización","De finalización a inicio","De finalización a finalización"]},DependencyEdit:{From:"Desde",To:"Hasta",Type:"Tipo",Lag:"Retraso","Edit dependency":"Editar dependencia",Save:"Guardar",Delete:"Eliminar",Cancel:"Cancelar",StartToStart:"De inicio a inicio",StartToEnd:"De inicio a finalización",EndToStart:"De finalización a inicio",EndToEnd:"De finalización a finalización"},EventEdit:{Name:"Nombre",Resource:"Recurso",Start:"Inicio",End:"Finalización",Save:"Guardar",Delete:"Eliminar",Cancel:"Cancelar","Edit event":"Editar evento",Repeat:"Repetir"},EventDrag:{eventOverlapsExisting:"El evento se superpone con un evento existente para este recurso",noDropOutsideTimeline:"No se puede soltar el evento completamente fuera de la línea temporal"},SchedulerBase:{"Add event":"Añadir evento","Delete event":"Eliminar evento","Unassign event":"Desasignar evento",color:"Color"},TimeAxisHeaderMenu:{pickZoomLevel:"Zoom",activeDateRange:"Rango de fechas",startText:"Fecha de inicio",endText:"Fecha de finalización",todayText:"Hoy"},EventCopyPaste:{copyEvent:"Copiar evento",cutEvent:"Cortar evento",pasteEvent:"Pegar evento"},EventFilter:{filterEvents:"Filtrar tareas",byName:"Por nombre"},TimeRanges:{showCurrentTimeLine:"Mostrar línea temporal actual"},PresetManager:{secondAndMinute:{displayDateFormat:"ll LTS",name:"Segundos"},minuteAndHour:{topDateFormat:"ddd DD/MM, H",displayDateFormat:"ll LST"},hourAndDay:{topDateFormat:"ddd DD/MM",middleDateFormat:"LST",displayDateFormat:"ll LST",name:"Día"},day:{name:"Día/horas"},week:{name:"Semana/horas"},dayAndWeek:{displayDateFormat:"ll LST",name:"Semana/días"},dayAndMonth:{name:"Mes"},weekAndDay:{displayDateFormat:"ll LST",name:"Semana"},weekAndMonth:{name:"Semanas"},weekAndDayLetter:{name:"Semanas/días laborables"},weekDateAndMonth:{name:"Meses/semanas"},monthAndYear:{name:"Mes"},year:{name:"Años"},manyYears:{name:"Múltiples años"}},RecurrenceConfirmationPopup:{"delete-title":"Está eliminando un evento","delete-all-message":"¿Desea eliminar todas las instancias de este evento?","delete-further-message":"Desea eliminar esta y toda otra futura instancia de este evento o solo la instancia selecccionada?","delete-further-btn-text":"Eliminar todos los eventos futuros","delete-only-this-btn-text":"Eliminar solo este evento","update-title":"Está cambiando un evento recurrente","update-all-message":"¿Desea cambiar todas las instancias de este evento?","update-further-message":"¿Desea cambiar solo esta instancia del evento o esta instancia y toda otra futura instancia?","update-further-btn-text":"Todos los futuros eventos","update-only-this-btn-text":"Solo este evento",Yes:"Sí",Cancel:"Cancelar",width:600},RecurrenceLegend:{" and ":"y",Daily:"Diariamente","Weekly on {1}":({days:e})=>`Semanalmente los ${e}`,"Monthly on {1}":({days:e})=>`Mensualmente el ${e}`,"Yearly on {1} of {2}":({days:e,months:a})=>`Anualmente el ${e} de ${a}`,"Every {0} days":({interval:e})=>`Cada ${e} días`,"Every {0} weeks on {1}":({interval:e,days:a})=>`Cada ${e} semanas el ${a}`,"Every {0} months on {1}":({interval:e,days:a})=>`Cada ${e} meses el ${a}`,"Every {0} years on {1} of {2}":({interval:e,days:a,months:o})=>`Cada ${e} años el ${a} de ${o}`,position1:"el primero",position2:"el segundo",position3:"el tercero",position4:"el cuarto",position5:"el quinto","position-1":"el último",day:"día",weekday:"día laborable","weekend day":"día del fin de semana",daysFormat:({position:e,days:a})=>`${e} ${a}`},RecurrenceEditor:{"Repeat event":"Repetir evento",Cancel:"Cancelar",Save:"Guardar",Frequency:"Frecuencia",Every:"Cada",DAILYintervalUnit:"día(s)",WEEKLYintervalUnit:"semana(s)",MONTHLYintervalUnit:"mes(es)",YEARLYintervalUnit:"año(s)",Each:"Cada","On the":"El","End repeat":"Repetir finalización","time(s)":"vez(es)"},RecurrenceDaysCombo:{day:"día",weekday:"día de la semana","weekend day":"día del fin de semana"},RecurrencePositionsCombo:{position1:"primero",position2:"segundo",position3:"tercero",position4:"cuarto",position5:"quinto","position-1":"último"},RecurrenceStopConditionCombo:{Never:"Nunca",After:"Después","On date":"En fecha"},RecurrenceFrequencyCombo:{None:"No repetir",Daily:"Diariamente",Weekly:"Semanalmente",Monthly:"Mensualmente",Yearly:"Anualmente"},RecurrenceCombo:{None:"Ninguno",Custom:"Personalizar..."},Summary:{"Summary for":e=>`Resumen para ${e}`},ScheduleRangeCombo:{completeview:"Programa completo",currentview:"Programa visible",daterange:"Rango de fechas",completedata:"Programa completo (para todos los eventos)"},SchedulerExportDialog:{"Schedule range":"Rango del programa","Export from":"Desde","Export to":"a"},ExcelExporter:{"No resource assigned":"Sin recursos asignados"},CrudManagerView:{serverResponseLabel:"Respuesta del servidor:"},DurationColumn:{Duration:"Duración"}},M=s.publishLocale(T),S={localeName:"Es",localeDesc:"Español",localeCode:"es",ConstraintTypePicker:{none:"Ninguno",assoonaspossible:"Lo antes posible",aslateaspossible:"Lo más tarde posible",muststarton:"Debe empezar el",mustfinishon:"Debe terminar el",startnoearlierthan:"Empezar no antes del",startnolaterthan:"Empezar no después del",finishnoearlierthan:"Terminar no antes del",finishnolaterthan:"Terminar no después del"},SchedulingDirectionPicker:{Forward:"Adelante",Backward:"Atrás",inheritedFrom:"Heredado de",enforcedBy:"Impuesto por"},CalendarField:{"Default calendar":"Calendario predeterminado"},TaskEditorBase:{Information:"Información",Save:"Guardar",Cancel:"Cancelar",Delete:"Eliminar",calculateMask:"Calculando...",saveError:"No se puede guardar, corrija antes los errores",repeatingInfo:"Viendo una evento que se repite",editRepeating:"Editar"},TaskEdit:{"Edit task":"Editar tarea",ConfirmDeletionTitle:"Confirmar eliminación",ConfirmDeletionMessage:"¿Seguro que desea eliminar el evento?"},GanttTaskEditor:{editorWidth:"44em"},SchedulerTaskEditor:{editorWidth:"32em"},SchedulerGeneralTab:{labelWidth:"6em",General:"General",Name:"Nombre",Resources:"Recursos","% complete":"% realizado",Duration:"Duración",Start:"Inicio",Finish:"Finalización",Effort:"Trabajo",Preamble:"Prólogo",Postamble:"Epílogo"},GeneralTab:{labelWidth:"6.5em",General:"General",Name:"Nombre","% complete":"% realizado",Duration:"Duración",Start:"Inicio",Finish:"Finalización",Effort:"Trabajo",Dates:"Fechas"},SchedulerAdvancedTab:{labelWidth:"13em",Advanced:"Avanzado",Calendar:"Calendario","Scheduling mode":"Modo de programación","Effort driven":"Trabajo invertido","Manually scheduled":"Programado manualmente","Constraint type":"Tipo de restricción","Constraint date":"Fecha de la restricción",Inactive:"Inactivo","Ignore resource calendar":"Ignorar calendario de recursos"},AdvancedTab:{labelWidth:"11.5em",Advanced:"Avanzado",Calendar:"Calendario","Scheduling mode":"Modo de programación","Effort driven":"Trabajo invertido","Manually scheduled":"Programado manualmente","Constraint type":"Tipo de restricción","Constraint date":"Fecha de la restricción",Constraint:"Restricción",Rollup:"Aplazamiento al resumen",Inactive:"Inactivo","Ignore resource calendar":"Ignorar calendario de recursos","Scheduling direction":"Dirección de programación"},DependencyTab:{Predecessors:"Anteriores",Successors:"Posteriores",ID:"DNI",Name:"Nombre",Type:"Tipo",Lag:"Retraso",cyclicDependency:"Dependencia cíclica",invalidDependency:"Dependencia no válida"},NotesTab:{Notes:"Notas"},ResourcesTab:{unitsTpl:({value:e})=>`${e}%`,Resources:"Recursos",Resource:"Recurso",Units:"Unidades"},RecurrenceTab:{title:"Repetir"},SchedulingModePicker:{Normal:"Normal","Fixed Duration":"Duración","Fixed Units":"Unidades fijas","Fixed Effort":"Trabajo fijo"},ResourceHistogram:{barTipInRange:'<b>{resource}</b> {startDate} - {endDate}<br><span class="{cls}">{allocated} de {available}</span> asignados',barTipOnDate:'<b>{resource}</b> on {startDate}<br><span class="{cls}">{allocated} de {available}</span> asignados',groupBarTipAssignment:'<b>{resource}</b> - <span class="{cls}">{allocated} de {available}</span>',groupBarTipInRange:'{startDate} - {endDate}<br><span class="{cls}">{allocated} de {available}</span> allocated:<br>{assignments}',groupBarTipOnDate:'El {startDate}<br><span class="{cls}">{allocated} de {available}</span> asignado:<br>{assignments}',plusMore:"+{value} más"},ResourceUtilization:{barTipInRange:'<b>{event}</b> {startDate} - {endDate}<br><span class="{cls}">{allocated}</span> asignado',barTipOnDate:'<b>{event}</b> el {startDate}<br><span class="{cls}">{allocated}</span> asignado',groupBarTipAssignment:'<b>{event}</b> - <span class="{cls}">{allocated}</span>',groupBarTipInRange:'{startDate} - {endDate}<br><span class="{cls}">{allocated} de {available}</span> asignado:<br>{assignments}',groupBarTipOnDate:'El {startDate}<br><span class="{cls}">{allocated} de {available}</span> asignado:<br>{assignments}',plusMore:"+{value} más",nameColumnText:"Recurso/Evento"},SchedulingIssueResolutionPopup:{"Cancel changes":"Cancelar el cambio y no hacer nada",schedulingConflict:"Conflicto de programación",emptyCalendar:"Error de configuración del calendario",cycle:"Programando ciclo",Apply:"Aplicar"},CycleResolutionPopup:{dependencyLabel:"Seleccione una dependencia:",invalidDependencyLabel:"Hay dependencias no válidas implicadas que deben ser corregidas:"},DependencyEdit:{Active:"Activa"},SchedulerProBase:{propagating:"Calculando proyecto",storePopulation:"Cargando datos",finalizing:"Finalizando resultados"},EventSegments:{splitEvent:"Dividir evento",renameSegment:"Renombrar"},NestedEvents:{deNestingNotAllowed:"Desagrupado no permitido",nestingNotAllowed:"Agrupado permitido"},VersionGrid:{compare:"Comparar",description:"Descripción",occurredAt:"Ocurrió en",rename:"Renombrar",restore:"Restaurar",stopComparing:"Detener comparación"},Versions:{entityNames:{TaskModel:"tarea",AssignmentModel:"asignación",DependencyModel:"enlace",ProjectModel:"proyecto",ResourceModel:"recurso",other:"objeto"},entityNamesPlural:{TaskModel:"tares",AssignmentModel:"asignaciones",DependencyModel:"enlaces",ProjectModel:"proyectos",ResourceModel:"recursos",other:"objetos"},transactionDescriptions:{update:"Se han cambiado {n} {entities}",add:"Se han añadido {n} {entities}",remove:"Se han quitado {n} {entities}",move:"Se han movido {n} {entities}",mixed:"Se han cambiado {n} {entities}"},addEntity:"Se ha añadido {type} **{name}**",removeEntity:"Se ha quitado {type} **{name}**",updateEntity:"Se ha cambiado {type} **{name}**",moveEntity:"Se ha movido {type} **{name}** de {from} a {to}",addDependency:"Se ha añadido el enlace de **{from}** a **{to}**",removeDependency:"Se ha quitado el enlace de **{from}** a **{to}**",updateDependency:"Se ha editado el enlace de **{from}** a **{to}**",addAssignment:"Se ha asignado **{resource}** a **{event}**",removeAssignment:"Se ha quitado la asignación de **{resource}** a **{event}**",updateAssignment:"Se ha editado la asignación de **{resource}** a **{event}**",noChanges:"Sin cambios",nullValue:"ninguno",versionDateFormat:"M/D/YYYY h:mm a",undid:"Se han deshecho los cambios",redid:"Se han rehecho los cambios",editedTask:"Se han editado las propiedades de tarea",deletedTask:"Se ha eliminado una tarea",movedTask:"Se ha movido una tarea",movedTasks:"Se han movido tareas"}},R=s.publishLocale(S);if(typeof t.exports=="object"&&typeof l=="object"){var F=(e,a,o,n)=>{if(a&&typeof a=="object"||typeof a=="function")for(let r of Object.getOwnPropertyNames(a))!Object.prototype.hasOwnProperty.call(e,r)&&r!==o&&Object.defineProperty(e,r,{get:()=>a[r],enumerable:!(n=Object.getOwnPropertyDescriptor(a,r))||n.enumerable});return e};t.exports=F(t.exports,l)}return t.exports});
