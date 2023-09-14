/*!
 *
 * Bryntum Scheduler Pro 5.4.0 (TRIAL VERSION)
 *
 * Copyright(c) 2023 Bryntum AB
 * https://bryntum.com/contact
 * https://bryntum.com/license
 *
 */
(function(s,l){var i=typeof exports=="object";if(typeof define=="function"&&define.amd)define([],l);else if(typeof module=="object"&&module.exports)module.exports=l();else{var g=l(),c=i?exports:s;for(var p in g)c[p]=g[p]}})(typeof self<"u"?self:void 0,()=>{var s={},l={exports:s},i=Object.defineProperty,g=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames,p=Object.prototype.hasOwnProperty,u=(e,t,n)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,v=(e,t)=>{for(var n in t)i(e,n,{get:t[n],enumerable:!0})},f=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of c(t))!p.call(e,a)&&a!==n&&i(e,a,{get:()=>t[a],enumerable:!(r=g(t,a))||r.enumerable});return e},k=e=>f(i({},"__esModule",{value:!0}),e),b=(e,t,n)=>(u(e,typeof t!="symbol"?t+"":t,n),n),m={};v(m,{default:()=>E}),l.exports=k(m);var d=class{static mergeLocales(...e){let t={};return e.forEach(n=>{Object.keys(n).forEach(r=>{typeof n[r]=="object"?t[r]={...t[r],...n[r]}:t[r]=n[r]})}),t}static trimLocale(e,t){let n=(r,a)=>{e[r]&&(a?e[r][a]&&delete e[r][a]:delete e[r])};Object.keys(t).forEach(r=>{Object.keys(t[r]).length>0?Object.keys(t[r]).forEach(a=>n(r,a)):n(r)})}static normalizeLocale(e,t){if(!e)throw new Error('"nameOrConfig" parameter can not be empty');if(typeof e=="string"){if(!t)throw new Error('"config" parameter can not be empty');t.locale?t.name=e||t.name:t.localeName=e}else t=e;let n={};if(t.name||t.locale)n=Object.assign({localeName:t.name},t.locale),t.desc&&(n.localeDesc=t.desc),t.code&&(n.localeCode=t.code),t.path&&(n.localePath=t.path);else{if(!t.localeName)throw new Error(`"config" parameter doesn't have "localeName" property`);n=Object.assign({},t)}for(let r of["name","desc","code","path"])n[r]&&delete n[r];if(!n.localeName)throw new Error("Locale name can not be empty");return n}static get locales(){return globalThis.bryntum.locales||{}}static set locales(e){globalThis.bryntum.locales=e}static get localeName(){return globalThis.bryntum.locale||"En"}static set localeName(e){globalThis.bryntum.locale=e||d.localeName}static get locale(){return d.localeName&&this.locales[d.localeName]||this.locales.En||Object.values(this.locales)[0]||{localeName:"",localeDesc:"",localeCoode:""}}static publishLocale(e,t){let{locales:n}=globalThis.bryntum,r=d.normalizeLocale(e,t),{localeName:a}=r;return!n[a]||t===!0?n[a]=r:n[a]=this.mergeLocales(n[a]||{},r||{}),n[a]}},o=d;b(o,"skipLocaleIntegrityCheck",!1),globalThis.bryntum=globalThis.bryntum||{},globalThis.bryntum.locales=globalThis.bryntum.locales||{},o._$name="LocaleHelper";var h={localeName:"Da",localeDesc:"Dansk",localeCode:"da",RemoveDependencyCycleEffectResolution:{descriptionTpl:"Fjern afhængighed"},DeactivateDependencyCycleEffectResolution:{descriptionTpl:"Deaktiver afhængighed"},CycleEffectDescription:{descriptionTpl:"En cyklus er blevet fundet, dannet af: {0}"},EmptyCalendarEffectDescription:{descriptionTpl:'"{0}" Kalender giver ikke nogen tidstidsintervaller.'},Use24hrsEmptyCalendarEffectResolution:{descriptionTpl:"Brug 24 timers kalender med ikke-arbejdende lørdage og søndage."},Use8hrsEmptyCalendarEffectResolution:{descriptionTpl:"Brug 8 timers kalender (kl. 08.00 til 22.00, 13: 00-17: 00) med ikke-arbejdende lørdage og søndage."},ConflictEffectDescription:{descriptionTpl:"Der er fundet en planlægningskonflikt: {0} er modstrid med {1}"},ConstraintIntervalDescription:{dateFormat:"LLL"},ProjectConstraintIntervalDescription:{startDateDescriptionTpl:"Projektstartdato {0}",endDateDescriptionTpl:"Projektledning {0}"},DependencyType:{long:["Start-til-Start","Start-til-Slut","Slut-til-Start","Slut-til-Slut"]},ManuallyScheduledParentConstraintIntervalDescription:{startDescriptionTpl:'Manuelt planlagt "{2}" tvinger sine børn til ikke at starte nr. Tidligere end {0}',endDescriptionTpl:'Manuelt planlagt "{2}" tvinger sine børn til at afslutte senest {1}'},DisableManuallyScheduledConflictResolution:{descriptionTpl:'Deaktiver manuel planlægning for "{0}"'},DependencyConstraintIntervalDescription:{descriptionTpl:'Afhængighed ({2}) fra "{3}" til "{4}"'},RemoveDependencyResolution:{descriptionTpl:'Fjern afhængighed fra "{1}" til "{2}"'},DeactivateDependencyResolution:{descriptionTpl:'Deaktiver afhængighed fra "{1}" til "{2}"'},DateConstraintIntervalDescription:{startDateDescriptionTpl:'Opgave "{2}" {3} {0} begrænsning',endDateDescriptionTpl:'Opgave "{2}" {3} {1} begrænsning',constraintTypeTpl:{startnoearlierthan:"Start-no-tidligere-end",finishnoearlierthan:"Er færdig-No-tidligere end",muststarton:"Skal begynde",mustfinishon:"Skal man have pålæg på",startnolaterthan:"Start-ikke-sidst-nu",finishnolaterthan:"Færdig-ikke-sidst-nu"}},RemoveDateConstraintConflictResolution:{descriptionTpl:'Fjern begrænsningen "{1}" for opgaven "{0}"'}},R=o.publishLocale(h),y={localeName:"Da",localeDesc:"Dansk",localeCode:"da",Object:{Yes:"Ja",No:"Nej",Cancel:"Aflyse",Ok:"OK",Week:"Uge"},ColorPicker:{noColor:"Ingen farve"},Combo:{noResults:"Ingen resultater",recordNotCommitted:"Posten kunne ikke tilføjes",addNewValue:e=>`Tilføj ${e}`},FilePicker:{file:"Fil"},Field:{badInput:"Ugyldig feltværdi",patternMismatch:"Værdien skal matche et bestemt mønster",rangeOverflow:e=>`Værdien skal være mindre end eller lig med ${e.max}`,rangeUnderflow:e=>`Værdien skal være større end eller lig med ${e.min}`,stepMismatch:"Værdien skal passe til trinnet",tooLong:"Værdien skal være kortere",tooShort:"Værdien skal være længere",typeMismatch:"Værdien skal være i et særligt format",valueMissing:"dette felt er påkrævet",invalidValue:"Ugyldig feltværdi",minimumValueViolation:"Overtrædelse af minimumsværdien",maximumValueViolation:"Maksimal værdikrænkelse",fieldRequired:"Dette felt er påkrævet",validateFilter:"Værdien skal vælges på listen"},DateField:{invalidDate:"Ugyldig datoinput"},DatePicker:{gotoPrevYear:"Gå til forrige år",gotoPrevMonth:"Gå til forrige måned",gotoNextMonth:"Gå til næste måned",gotoNextYear:"Gå til næste år"},NumberFormat:{locale:"da",currency:"DKK"},DurationField:{invalidUnit:"Ugyldig enhed"},TimeField:{invalidTime:"Ugyldig tidsindtastning"},TimePicker:{hour:"timer",minute:"minutter",second:"Anden"},List:{loading:"Indlæser...",selectAll:"Vælg alle"},GridBase:{loadMask:"Indlæser...",syncMask:"Gemmer ændringer, vent venligst..."},PagingToolbar:{firstPage:"Gå til første side",prevPage:"Gå til forrige side",page:"Side",nextPage:"Gå til næste side",lastPage:"Gå til sidste side",reload:"Genindlæs den aktuelle side",noRecords:"Ingen poster at vise",pageCountTemplate:e=>`af ${e.lastPage}`,summaryTemplate:e=>`Viser poster ${e.start} - ${e.end} af ${e.allCount}`},PanelCollapser:{Collapse:"Samle",Expand:"Udvide"},Popup:{close:"Luk popup"},UndoRedo:{Undo:"Fortryd",Redo:"Gentag",UndoLastAction:"Fortryd sidste handling",RedoLastAction:"Gentag sidst fortrudte handling",NoActions:"Ingen elementer i fortrydelseskøen"},FieldFilterPicker:{equals:"lig med",doesNotEqual:"er ikke lig",isEmpty:"er tom",isNotEmpty:"er ikke tom",contains:"indeholder",doesNotContain:"indeholder ikke",startsWith:"starter med",endsWith:"slutter med",isOneOf:"er en af",isNotOneOf:"er ikke en af",isGreaterThan:"er større end",isLessThan:"er mindre end",isGreaterThanOrEqualTo:"er større end eller lig med",isLessThanOrEqualTo:"er mindre end eller lig med",isBetween:"er mellem",isNotBetween:"er ikke mellem",isBefore:"er før",isAfter:"er efter",isToday:"er i dag",isTomorrow:"er i morgen",isYesterday:"er i går",isThisWeek:"er denne uge",isNextWeek:"er i næste uge",isLastWeek:"er i sidste uge",isThisMonth:"er denne måned",isNextMonth:"er næste måned",isLastMonth:"er sidste måned",isThisYear:"er i år",isNextYear:"er næste år",isLastYear:"er sidste år",isYearToDate:"er år til dato",isTrue:"er sand",isFalse:"er falsk",selectAProperty:"Vælg en ejendom",selectAnOperator:"Vælg en operatør",caseSensitive:"Stillende mellem store og små bogstaver",and:"og",dateFormat:"D/M/YY",selectOneOrMoreValues:"Vælg en eller flere værdier",enterAValue:"Indtast en værdi",enterANumber:"Indtast et tal",selectADate:"Vælg en dato"},FieldFilterPickerGroup:{addFilter:"Tilføj filter"},DateHelper:{locale:"da",weekStartDay:1,nonWorkingDays:{0:!0,6:!0},weekends:{0:!0,6:!0},unitNames:[{single:"millisekund",plural:"ms",abbrev:"ms"},{single:"sekund",plural:"sekunder",abbrev:"s"},{single:"minut",plural:"minutter",abbrev:"min"},{single:"timer",plural:"timer",abbrev:"t"},{single:"dag",plural:"dage",abbrev:"d"},{single:"uge",plural:"uger",abbrev:"u"},{single:"måned",plural:"måneder",abbrev:"mån"},{single:"kvartal",plural:"kvartaler",abbrev:"k"},{single:"år",plural:"år",abbrev:"år"},{single:"årti",plural:"årtier",abbrev:"dek"}],unitAbbreviations:[["mil"],["s","sek"],["m","min"],["t","tr"],["d"],["u","ugr"],["må","mån","måndr"],["k","kvar","kvart"],["å","år"],["dek"]],parsers:{L:"DD.MM.YYYY",LT:"HH.mm",LTS:"HH.mm.ss"},ordinalSuffix:e=>e+"."}},j=o.publishLocale(y),S=new String,D={localeName:"Da",localeDesc:"Dansk",localeCode:"da",ColumnPicker:{column:"Kolonne",columnsMenu:"Kolonner",hideColumn:"Skjul kolonne",hideColumnShort:"Skjul",newColumns:"Nye kolonner"},Filter:{applyFilter:"Anvend filter",filter:"Filter",editFilter:"Rediger filter",on:"On",before:"Før",after:"Efter",equals:"Lige med",lessThan:"Mindre end",moreThan:"Mere end",removeFilter:"Fjern filteret",disableFilter:"Deaktiver filter"},FilterBar:{enableFilterBar:"Vis filterbjælke",disableFilterBar:"skjul filterbjælken"},Group:{group:"Gruppér",groupAscending:"Gruppér stigende",groupDescending:"Gruppér faldende",groupAscendingShort:"stigende",groupDescendingShort:"faldende",stopGrouping:"Stop gruppering",stopGroupingShort:"Stop"},HeaderMenu:{moveBefore:e=>`Flyt før "${e}"`,moveAfter:e=>`Flyt efter "${e}"`,collapseColumn:"Skjul kolonne",expandColumn:"Skjul kolonne"},ColumnRename:{rename:"Omdøb"},MergeCells:{mergeCells:"Flet celler",menuTooltip:"Flet celler med samme værdi, når de sorteres efter denne kolonne"},Search:{searchForValue:"Søg efter værdi"},Sort:{sort:"Sortér",sortAscending:"Sorter stigende",sortDescending:"Sorter faldende",multiSort:"Multi sortering",removeSorter:"Fjern sorteringsenheden",addSortAscending:"Tilføj stigende sortering",addSortDescending:"Tilføj faldende sortering",toggleSortAscending:"Skift til stigende",toggleSortDescending:"Skift til faldende",sortAscendingShort:"Stigende",sortDescendingShort:"Faldende",removeSorterShort:"Fjerne",addSortAscendingShort:"+ Stigende",addSortDescendingShort:"+ Faldende"},Split:{split:"Opdel",unsplit:"Ikke opdelt",horizontally:"Vandret",vertically:"Lodret",both:"Begge"},Column:{columnLabel:e=>`${e.text?`${e.text} kolonne. `:""}MELLEMRUM for kontekstmenu${e.sortable?",ENTER for at sortere":""}`,cellLabel:S},Checkbox:{toggleRowSelect:"Skift rækkevalg",toggleSelection:"Skift valg af hele datasættet"},RatingColumn:{cellLabel:e=>{var t;return`${e.text?e.text:""} ${(t=e.location)!=null&&t.record?` bedømmelse : ${e.location.record.get(e.field)||0}`:""}`}},GridBase:{loadFailedMessage:"Dataindlæsning mislykkedes!",syncFailedMessage:"Datasynkronisering mislykkedes!",unspecifiedFailure:"Uspecificeret fejl",networkFailure:"Netværksfejl",parseFailure:"Kunne ikke parse serversvar",serverResponse:"Serversvar:",noRows:"Ingen poster at vise",moveColumnLeft:"Flyt til venstre sektion",moveColumnRight:"Flyt til højre sektion",moveColumnTo:e=>`Flyt kolonne til ${e}`},CellMenu:{removeRow:"Slet"},RowCopyPaste:{copyRecord:"Kopi",cutRecord:"klip",pasteRecord:"sæt ind",rows:"rækker",row:"række"},CellCopyPaste:{copy:"Kopi",cut:"Skære",paste:"Sæt ind"},PdfExport:{"Waiting for response from server":"Venter på svar fra serveren...","Export failed":"Eksporten mislykkedes","Server error":"Serverfejl","Generating pages":"Generering af sider...","Click to abort":"Afbestille"},ExportDialog:{width:"40em",labelWidth:"12em",exportSettings:"Eksporter indstillinger",export:"Eksport",exporterType:"Styr paginering",cancel:"Afbestille",fileFormat:"Filformat",rows:"Rækker",alignRows:"Juster rækker",columns:"Kolonner",paperFormat:"Papirformat",orientation:"Orientering",repeatHeader:"Gentag overskriften"},ExportRowsCombo:{all:"Alle rækker",visible:"Synlige rækker"},ExportOrientationCombo:{portrait:"Portræt",landscape:"Landskab"},SinglePageExporter:{singlepage:"Enkelt side"},MultiPageExporter:{multipage:"Flere sider",exportingPage:({currentPage:e,totalPages:t})=>`Eksporterer side ${e}/${t}`},MultiPageVerticalExporter:{multipagevertical:"Flere sider (lodret)",exportingPage:({currentPage:e,totalPages:t})=>`Eksporterer side ${e}/${t}`},RowExpander:{loading:"Indlæser",expand:"Udvide",collapse:"Samle"},TreeGroup:{group:"Gruppér efter",stopGrouping:"Stop gruppering",stopGroupingThisColumn:"Fjern gruppe på kolonne"}},M=o.publishLocale(D),T={localeName:"Da",localeDesc:"Dansk",localeCode:"da",Object:{newEvent:"ny begivenhed"},ResourceInfoColumn:{eventCountText:e=>e+" begivenhed"+(e!==1?"er":"")},Dependencies:{from:"Fra",to:"Til",valid:"Gyldig",invalid:"Ugyldig"},DependencyType:{SS:"SS",SF:"SF",FS:"FS",FF:"FF",StartToStart:"Start-til-Start",StartToEnd:"Start-til-slut",EndToStart:"Slut-til-Start",EndToEnd:"slut-til-Slut",short:["SS","SF","FS","FF"],long:["Start-til-Start","Start-til-slut","slut-til-Start","slut-til-slut"]},DependencyEdit:{From:"Fra",To:"Til",Type:"Typ",Lag:"Lag","Edit dependency":"Rediger afhængighed",Save:"Gemme",Delete:"Slet",Cancel:"Afbestille",StartToStart:"Start til Start",StartToEnd:"Start til Slut",EndToStart:"Slut til Start",EndToEnd:"Slut til Slut"},EventEdit:{Name:"Navn",Resource:"Ressource",Start:"Start",End:"Slut",Save:"Gemme",Delete:"Slet",Cancel:"Afbestille","Edit event":"Rediger begivenhed",Repeat:"Gentage"},EventDrag:{eventOverlapsExisting:"Hændelse overlapper eksisterende hændelse for denne ressource",noDropOutsideTimeline:"Begivenheden må ikke droppes helt uden for tidslinjen"},SchedulerBase:{"Add event":"Tilføj begivenhed","Delete event":"Slet begivenhed","Unassign event":"Fjern tildeling af begivenhed",color:"Farve"},TimeAxisHeaderMenu:{pickZoomLevel:"Zoom",activeDateRange:"Datointerval",startText:"Start dato",endText:"Slut dato",todayText:"I dag"},EventCopyPaste:{copyEvent:"Kopiér begivenhed",cutEvent:"Klip begivenhed",pasteEvent:"Indsæt begivenhed"},EventFilter:{filterEvents:"Filtrer opgaver",byName:"Ved navn"},TimeRanges:{showCurrentTimeLine:"Vis den aktuelle tidslinje"},PresetManager:{secondAndMinute:{displayDateFormat:"ll LTS",name:"Sekunder"},minuteAndHour:{topDateFormat:"ddd DD.MM, H",displayDateFormat:"ll LST"},hourAndDay:{topDateFormat:"ddd DD.MM",middleDateFormat:"LST",displayDateFormat:"ll LST",name:"Dag"},day:{name:"Dag/timer"},week:{name:"Uge/timer"},dayAndWeek:{displayDateFormat:"ll LST",name:"Uge/dage"},dayAndMonth:{name:"Måned"},weekAndDay:{displayDateFormat:"ll LST",name:"Uge"},weekAndMonth:{name:"Uger"},weekAndDayLetter:{name:"Uger/hverdage"},weekDateAndMonth:{name:"Måneder/uger"},monthAndYear:{name:"Måneder"},year:{name:"Flere år"},manyYears:{name:"Flere år"}},RecurrenceConfirmationPopup:{"delete-title":"du sletter en begivenhed","delete-all-message":"Vil du slette alle forekomster af denne begivenhed?","delete-further-message":"Ønsker du at slette denne og alle fremtidige forekomster af denne begivenhed, eller kun den valgte forekomst?","delete-further-btn-text":"Slet alle fremtidige begivenheder","delete-only-this-btn-text":"Slet kun denne begivenhed","update-title":"Du ændrer en gentagende begivenhed","update-all-message":"Vil du ændre alle forekomster af denne begivenhed?","update-further-message":"Vil du kun ændre denne forekomst af begivenheden, eller denne og alle fremtidige begivenheder?","update-further-btn-text":"Alle fremtidige begivenheder","update-only-this-btn-text":"Kun denne begivenhed",Yes:"ja",Cancel:"Afbestille",width:600},RecurrenceLegend:{" and ":" og ",Daily:"Daglige","Weekly on {1}":({days:e})=>`Ugentligt på ${e}`,"Monthly on {1}":({days:e})=>`Månedligt ${e}`,"Yearly on {1} of {2}":({days:e,months:t})=>`Årligt på ${e} af ${t}`,"Every {0} days":({interval:e})=>`Hver ${e} dage`,"Every {0} weeks on {1}":({interval:e,days:t})=>`Hver ${e} uger efter ${t}`,"Every {0} months on {1}":({interval:e,days:t})=>`Hver${e} måneder på ${t}`,"Every {0} years on {1} of {2}":({interval:e,days:t,months:n})=>`Hver ${e} år efter ${t} af ${n}`,position1:"den første",position2:"den anden",position3:"den tredje",position4:"den fjerde",position5:"den femte","position-1":"den sidste",day:"dage",weekday:"hverdag","weekend day":"weekenddag",daysFormat:({position:e,days:t})=>`${e} ${t}`},RecurrenceEditor:{"Repeat event":"Gentag begivenhed",Cancel:"Afbestille",Save:"Gemme",Frequency:"Frekvens",Every:"Hver",DAILYintervalUnit:"dage(r)",WEEKLYintervalUnit:"uge(r)",MONTHLYintervalUnit:"måned(er)",YEARLYintervalUnit:"år(er)",Each:"Hver","On the":"På den","End repeat":"Afslut gentagelse","time(s)":"tid(er)"},RecurrenceDaysCombo:{day:"dag",weekday:"hverdag","weekend day":"weekenddag"},RecurrencePositionsCombo:{position1:"første",position2:"anden",position3:"tredje",position4:"fjerde",position5:"femte","position-1":"sidste"},RecurrenceStopConditionCombo:{Never:"Aldrig",After:"Efter","On date":"På dato"},RecurrenceFrequencyCombo:{None:"Ingen gentagelse",Daily:"Daglige",Weekly:"Ugentlig",Monthly:"Månedlige",Yearly:"Årligt"},RecurrenceCombo:{None:"Ingen",Custom:"Brugerdefinerede..."},Summary:{"Summary for":e=>`Resumé for ${e}`},ScheduleRangeCombo:{completeview:"Komplet tidsplan",currentview:"Synlig tidsplan",daterange:"Datointerval",completedata:"Komplet tidsplan (for alle arrangementer)"},SchedulerExportDialog:{"Schedule range":"Tidsplan rækkevidde","Export from":"Fra","Export to":"Til"},ExcelExporter:{"No resource assigned":"Ingen ressource tildelt"},CrudManagerView:{serverResponseLabel:"Serversvar:"},DurationColumn:{Duration:"Varighed"}},A=o.publishLocale(T),F={localeName:"Da",localeDesc:"Dansk",localeCode:"da",ConstraintTypePicker:{none:"Ingen",assoonaspossible:"Så hurtigt som muligt",aslateaspossible:"Så sent som muligt",muststarton:"Skal starte på",mustfinishon:"Skal slutte på",startnoearlierthan:"Start tidligst kl",startnolaterthan:"Start senest kl",finishnoearlierthan:"Afslut tidligst",finishnolaterthan:"Afslut senest kl"},SchedulingDirectionPicker:{Forward:"Fremad",Backward:"Bagud",inheritedFrom:"Arvet fra",enforcedBy:"Pålagt af"},CalendarField:{"Default calendar":"Standard kalender"},TaskEditorBase:{Information:"Information",Save:"Gemme",Cancel:"Afbestille",Delete:"Slet",calculateMask:"Beregner...",saveError:"Kan ikke gemme. Ret venligst fejl først",repeatingInfo:"Viser en gentagende begivenhed",editRepeating:"Redigere"},TaskEdit:{"Edit task":"Rediger opgave",ConfirmDeletionTitle:"Bekræft sletning",ConfirmDeletionMessage:"Er du sikker på, at du vil slette begivenheden?"},GanttTaskEditor:{editorWidth:"44em"},SchedulerTaskEditor:{editorWidth:"32em"},SchedulerGeneralTab:{labelWidth:"6em",General:"Generel",Name:"Navn",Resources:"Ressourcer","% complete":"% komplet",Duration:"Varighed",Start:"Start",Finish:"slut",Effort:"Indsats",Preamble:"Præambel",Postamble:"Postamble"},GeneralTab:{labelWidth:"6.5em",General:"Generel",Name:"Navn","% complete":"% komplet",Duration:"Varighed",Start:"Start",Finish:"slut",Effort:"Indsats",Dates:"Dato"},SchedulerAdvancedTab:{labelWidth:"13em",Advanced:"Fremskreden",Calendar:"kalender","Scheduling mode":"Planlægningstilstand","Effort driven":"Indsatsdrevet","Manually scheduled":"Manuelt planlagt","Constraint type":"Begrænsning type","Constraint date":"Begrænsning dato",Inactive:"Inaktiv","Ignore resource calendar":"Ignorer ressourcekalender"},AdvancedTab:{labelWidth:"11.5em",Advanced:"Fremskreden",Calendar:"Kalender","Scheduling mode":"Planlægningstilstand","Effort driven":"Indsatsdrevet","Manually scheduled":"Manuelt planlagt","Constraint type":"Begrænsningstype","Constraint date":"Begrænsningsdato",Constraint:"Begrænsning",Rollup:"Rul op",Inactive:"Inaktiv","Ignore resource calendar":"Ignorer ressourcekalender","Scheduling direction":"Planlægningsretning"},DependencyTab:{Predecessors:"Forgængere",Successors:"Efterfølgere",ID:"identitet",Name:"Navn",Type:"Type",Lag:"Lag",cyclicDependency:"Cyklisk afhængighed",invalidDependency:"Ugyldig afhængighed"},NotesTab:{Notes:"Noter"},ResourcesTab:{unitsTpl:({value:e})=>`${e}%`,Resources:"Ressourcer",Resource:"Ressourcer",Units:"Enheder"},RecurrenceTab:{title:"Gentage"},SchedulingModePicker:{Normal:"Normal","Fixed Duration":"Fast varighed","Fixed Units":"Faste enheder","Fixed Effort":"Fast indsats"},ResourceHistogram:{barTipInRange:'<b>{resource}</b> {startDate} - {endDate}<br><span class="{cls}">{allocated} af {available}</span> tildelt',barTipOnDate:'<b>{resource}</b> on {startDate}<br><span class="{cls}">{allocated} af {available}</span> tildelt',groupBarTipAssignment:'<b>{resource}</b> - <span class="{cls}">{allocated} af {available}</span>',groupBarTipInRange:'{startDate} - {endDate}<br><span class="{cls}">{allocated}af {available}</span> allocated:<br>{assignments}',groupBarTipOnDate:'på {startDate}<br><span class="{cls}">{allocated} af {available}</span> tildelt:<br>{assignments}',plusMore:"+{value} mere"},ResourceUtilization:{barTipInRange:'<b>{event}</b> {startDate} - {endDate}<br><span class="{cls}">{allocated}</span> tildelt',barTipOnDate:'<b>{event}</b> på {startDate}<br><span class="{cls}">{allocated}</span> tildelt',groupBarTipAssignment:'<b>{event}</b> - <span class="{cls}">{allocated}</span>',groupBarTipInRange:'{startDate} - {endDate}<br><span class="{cls}">{allocated} af {available}</span> tildelt:<br>{assignments}',groupBarTipOnDate:'på {startDate}<br><span class="{cls}">{allocated} af {available}</span> tildelt:<br>{assignments}',plusMore:"+{value} mere",nameColumnText:"Ressource / begivenhed"},SchedulingIssueResolutionPopup:{"Cancel changes":"Annuller ændringen og gør ingenting",schedulingConflict:"Planlægningskonflikt",emptyCalendar:"Kalender konfigurationsfejl",cycle:"Planlægningscyklus",Apply:"ansøge"},CycleResolutionPopup:{dependencyLabel:"Vælg venligst en afhængighed:",invalidDependencyLabel:"Der er ugyldige afhængigheder involveret, som skal løses:"},DependencyEdit:{Active:"Aktiv"},SchedulerProBase:{propagating:"Beregningsprojekt",storePopulation:"Indlæser data",finalizing:"Afsluttende resultater"},EventSegments:{splitEvent:"Opdelt begivenhed",renameSegment:"Omdøb"},NestedEvents:{deNestingNotAllowed:"Af-nestning ikke tilladt",nestingNotAllowed:"Nesting ikke tilladt"},VersionGrid:{compare:"Sammenlign",description:"Beskrivelse",occurredAt:"Skete ved",rename:"Omdøb",restore:"Gendan",stopComparing:"Stop sammenligning"},Versions:{entityNames:{TaskModel:"opgave",AssignmentModel:"opgave",DependencyModel:"link",ProjectModel:"projekt",ResourceModel:"ressource",other:"objekt"},entityNamesPlural:{TaskModel:"opgave",AssignmentModel:"opgave",DependencyModel:"link",ProjectModel:"projekt",ResourceModel:"ressource",other:"objekt"},transactionDescriptions:{update:"Ændret {n} {entities}",add:"Tilføjet {n} {entities}",remove:"Fjernede {n} {entities}",move:"Flyttet {n} {entities}",mixed:"Ændret {n} {entities}"},addEntity:"Tilføjede {type} **{navn}**",removeEntity:"Fjernet {type} **{navn}**",updateEntity:"Ændret {type} **{navn}**",moveEntity:"Flyttede {type} **{navn}** fra {from} til {to}",addDependency:"Tilføjet link fra **{from}** til **{to}**",removeDependency:"Fjernet link fra **{from}** til **{to}**",updateDependency:"Redigeret link fra **{from}** til **{to}**",addAssignment:"Tildelt **{ressource}** til **{event}**",removeAssignment:"Fjernet tildeling af **{ressource}** fra **{event}**",updateAssignment:"Redigeret tildeling af **{ressource}** til **{event}**",noChanges:"Ingen ændringer",nullValue:"ingen",versionDateFormat:"M/D/YYYY h:mm a",undid:"Undrede ændringer",redid:"Generede ændringer",editedTask:"Redigerede opgaveegenskaber",deletedTask:"Slettede en opgave",movedTask:"Flyttet en opgave",movedTasks:"Flyttede opgaver"}},E=o.publishLocale(F);if(typeof l.exports=="object"&&typeof s=="object"){var C=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Object.getOwnPropertyNames(t))!Object.prototype.hasOwnProperty.call(e,a)&&a!==n&&Object.defineProperty(e,a,{get:()=>t[a],enumerable:!(r=Object.getOwnPropertyDescriptor(t,a))||r.enumerable});return e};l.exports=C(l.exports,s)}return l.exports});
