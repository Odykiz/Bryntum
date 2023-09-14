/*!
 *
 * Bryntum Scheduler Pro 5.4.0 (TRIAL VERSION)
 *
 * Copyright(c) 2023 Bryntum AB
 * https://bryntum.com/contact
 * https://bryntum.com/license
 *
 */
(function(s,r){var l=typeof exports=="object";if(typeof define=="function"&&define.amd)define([],r);else if(typeof module=="object"&&module.exports)module.exports=r();else{var d=r(),u=l?exports:s;for(var p in d)u[p]=d[p]}})(typeof self<"u"?self:void 0,()=>{var s={},r={exports:s},l=Object.defineProperty,d=Object.getOwnPropertyDescriptor,u=Object.getOwnPropertyNames,p=Object.prototype.hasOwnProperty,g=(e,t,a)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,y=(e,t)=>{for(var a in t)l(e,a,{get:t[a],enumerable:!0})},b=(e,t,a,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of u(t))!p.call(e,n)&&n!==a&&l(e,n,{get:()=>t[n],enumerable:!(o=d(t,n))||o.enumerable});return e},v=e=>b(l({},"__esModule",{value:!0}),e),h=(e,t,a)=>(g(e,typeof t!="symbol"?t+"":t,a),a),m={};y(m,{default:()=>R}),r.exports=v(m);var c=class{static mergeLocales(...e){let t={};return e.forEach(a=>{Object.keys(a).forEach(o=>{typeof a[o]=="object"?t[o]={...t[o],...a[o]}:t[o]=a[o]})}),t}static trimLocale(e,t){let a=(o,n)=>{e[o]&&(n?e[o][n]&&delete e[o][n]:delete e[o])};Object.keys(t).forEach(o=>{Object.keys(t[o]).length>0?Object.keys(t[o]).forEach(n=>a(o,n)):a(o)})}static normalizeLocale(e,t){if(!e)throw new Error('"nameOrConfig" parameter can not be empty');if(typeof e=="string"){if(!t)throw new Error('"config" parameter can not be empty');t.locale?t.name=e||t.name:t.localeName=e}else t=e;let a={};if(t.name||t.locale)a=Object.assign({localeName:t.name},t.locale),t.desc&&(a.localeDesc=t.desc),t.code&&(a.localeCode=t.code),t.path&&(a.localePath=t.path);else{if(!t.localeName)throw new Error(`"config" parameter doesn't have "localeName" property`);a=Object.assign({},t)}for(let o of["name","desc","code","path"])a[o]&&delete a[o];if(!a.localeName)throw new Error("Locale name can not be empty");return a}static get locales(){return globalThis.bryntum.locales||{}}static set locales(e){globalThis.bryntum.locales=e}static get localeName(){return globalThis.bryntum.locale||"En"}static set localeName(e){globalThis.bryntum.locale=e||c.localeName}static get locale(){return c.localeName&&this.locales[c.localeName]||this.locales.En||Object.values(this.locales)[0]||{localeName:"",localeDesc:"",localeCoode:""}}static publishLocale(e,t){let{locales:a}=globalThis.bryntum,o=c.normalizeLocale(e,t),{localeName:n}=o;return!a[n]||t===!0?a[n]=o:a[n]=this.mergeLocales(a[n]||{},o||{}),a[n]}},i=c;h(i,"skipLocaleIntegrityCheck",!1),globalThis.bryntum=globalThis.bryntum||{},globalThis.bryntum.locales=globalThis.bryntum.locales||{},i._$name="LocaleHelper";var D={localeName:"He",localeDesc:"עִברִית",localeCode:"he",RemoveDependencyCycleEffectResolution:{descriptionTpl:"הסר תלות"},DeactivateDependencyCycleEffectResolution:{descriptionTpl:"בטל את הפעלת התלות"},CycleEffectDescription:{descriptionTpl:'נמצא מחזור אשר נוצר ע"י: {0}'},EmptyCalendarEffectDescription:{descriptionTpl:'לוח שנה "{0}" אינו מספק מרווחי זמן עבודה כלשהם.'},Use24hrsEmptyCalendarEffectResolution:{descriptionTpl:"השתמש בלוח שנה 24 שעות עם ימי שבת וראשון ללא עבודה."},Use8hrsEmptyCalendarEffectResolution:{descriptionTpl:"השתמש בלוח שנה של 8 שעות (08:00-12:00, 13:00-17:00) עם ימי שבת וראשון ללא עבודה."},ConflictEffectDescription:{descriptionTpl:"נמצאה התנגשות בקביעת לוח שנה: {0} מתנגש עם {1}"},ConstraintIntervalDescription:{dateFormat:"LLL"},ProjectConstraintIntervalDescription:{startDateDescriptionTpl:"תאריך תחילת הפרויקט {0}",endDateDescriptionTpl:"תאריך סיום הפרויקט {0}"},DependencyType:{long:["מההתחלה להתחלה","מהסוף להתחלה","מהסוף להתחלה","מהסוף לסוף"]},ManuallyScheduledParentConstraintIntervalDescription:{startDescriptionTpl:'"{2}" שנקבע ידנית מאלץ את הילדים שלו להתחיל לא לפני {0}',endDescriptionTpl:'"{2}" שנקבע ידנית מאלץ את הילדים שלו לסיים לא יאוחר מ {1}'},DisableManuallyScheduledConflictResolution:{descriptionTpl:'השבת תזמון ידני עבור "{0}"'},DependencyConstraintIntervalDescription:{descriptionTpl:'תלות ({2}) מ-"{3}" ל-"{4}"'},RemoveDependencyResolution:{descriptionTpl:'הסר תלות מ-"{1}" ל-"{2}"'},DeactivateDependencyResolution:{descriptionTpl:'בטל את הפעלת התלות מ-"{1}" ל-"{2}"'},DateConstraintIntervalDescription:{startDateDescriptionTpl:'אילוץ משימה "{2}" {3‏} {0}',endDateDescriptionTpl:'אילוץ משימה "{2}" {‏3} {1}',constraintTypeTpl:{startnoearlierthan:"התחל לא לפני",finishnoearlierthan:"סיים לא לפני",muststarton:"חייב להתחיל ב-",mustfinishon:"חייב להסתיים ב-",startnolaterthan:"התחל לא יאוחר מ-",finishnolaterthan:"סיים לא יאוחר מ-"}},RemoveDateConstraintConflictResolution:{descriptionTpl:'הסר אילוץ "{1}" של משימה "{0}"'}},x=i.publishLocale(D),f={localeName:"He",localeDesc:"עִברִית",localeCode:"he",Object:{Yes:"כן",No:"לא",Cancel:"בטל",Ok:"אוקיי",Week:"שבוע"},ColorPicker:{noColor:"אין צבע"},Combo:{noResults:"אין תוצאות",recordNotCommitted:"לא תאפשר להוסיף את הרשומה",addNewValue:e=>`${e} הוסף`},FilePicker:{file:"קובץ"},Field:{badInput:"ערך שדה בלתי-חוקי",patternMismatch:"הערך נדרש להתאים לתבנית מסוימת",rangeOverflow:e=>`${e.max}-הערך חייב להיות קטן או שווה ל`,rangeUnderflow:e=>`${e.min}-הערך חייב להיות גדול או שווה ל`,stepMismatch:"הערך אמור להתאים לשלב",tooLong:"הערכים חייבים להיות קצרים יותר",tooShort:"הערך חייב להיות ארוך יותר",typeMismatch:"הערך נדרש להיות בפורמט מיוחד",valueMissing:"שדה זה נדרש",invalidValue:"ערך שדה בלתי-חוקי",minimumValueViolation:"הפרת ערך מינימום",maximumValueViolation:"הפרת ערך מקסימום",fieldRequired:"שדה זה נדרש",validateFilter:"יש לבחור את הערך מרשימה"},DateField:{invalidDate:"הזנת תאריך בלתי-חוקי"},DatePicker:{gotoPrevYear:"עבור לשנה הקודמת",gotoPrevMonth:"עבור לחודש הקודם",gotoNextMonth:"עבור לחודש הבא",gotoNextYear:"עבור לשנה הבאה"},NumberFormat:{locale:"he",currency:"דולר ארה”ב"},DurationField:{invalidUnit:"יחידה בלתי-חוקית"},TimeField:{invalidTime:"הזנת זמן בלתי-חוקי"},TimePicker:{hour:"שעה",minute:"דקה",second:"שנייה"},List:{loading:"מתבצעת טעינה...",selectAll:"בחר הכל"},GridBase:{loadMask:"...מתבצעת טעינה",syncMask:"...שומר שינויים, אנא המתן"},PagingToolbar:{firstPage:"עבור לעמוד הראשון",prevPage:"עבור לעמוד הקודם",page:"עמוד",nextPage:"עבור לעמוד הבא",lastPage:"עבור לעמוד האחרון",reload:"טען מחדש את העמוד הנוכחי",noRecords:"אין רשומות להצגה",pageCountTemplate:e=>`${e.lastPage} מתוך`,summaryTemplate:e=>`${e.allCount} מתוך ${e.end}-${e.start} מציג רשומות`},PanelCollapser:{Collapse:"מזער",Expand:"הרחב"},Popup:{close:"סגור חלון קופץ"},UndoRedo:{Undo:"בטל",Redo:"בצע שוב",UndoLastAction:"בטל פעולה אחרונה",RedoLastAction:"בצע שוב את הפעולה האחרונה שלא בוצעה",NoActions:"אין פריטים בטור הפעולות לביטול"},FieldFilterPicker:{equals:"שווה",doesNotEqual:"לא שווה",isEmpty:"ריק",isNotEmpty:"אינו ריק",contains:"מכיל",doesNotContain:"אינו מכיל",startsWith:"מתחיל עם",endsWith:"מסתיים עם",isOneOf:"הוא אחד מ-",isNotOneOf:"אינו אחד מ-",isGreaterThan:"גדול מ-",isLessThan:"קטן מ-",isGreaterThanOrEqualTo:"גדול או שווה ל-",isLessThanOrEqualTo:"קטן או שווה ל-",isBetween:"נמצא בין",isNotBetween:"אינו נמצא בין",isBefore:"נמצא לפני",isAfter:"נמצא אחרי",isToday:"מתקיים היום",isTomorrow:"יתקיים מחר",isYesterday:"התקיים אתמול",isThisWeek:"יתקיים השבוע",isNextWeek:"יתקיים בשבוע הבא",isLastWeek:"התקיים בשבוע שעבר",isThisMonth:"יתקיים החודש",isNextMonth:"יתקיים בחודש הבא",isLastMonth:"התקיים בחודש שעבר",isThisYear:"יתקיים השנה",isNextYear:"יתקיים בשנה הבאה",isLastYear:"התקיים בשנה שעברה",isYearToDate:"מתחילת השנה עד היום",isTrue:"נכון",isFalse:"לא נכון",selectAProperty:"בחר תכונה",selectAnOperator:"בחר אופרטור",caseSensitive:"תלוי רישיות",and:"ו-",dateFormat:"D/M/YY",selectOneOrMoreValues:"בחר ערך אחד או יותר",enterAValue:"הזן ערך",enterANumber:"הזן מספר",selectADate:"בחר תאריך"},FieldFilterPickerGroup:{addFilter:"הוסף פילטר"},DateHelper:{locale:"he",weekStartDay:0,nonWorkingDays:{0:!0,6:!0},weekends:{0:!0,6:!0},unitNames:[{single:"מילי-שנייה",plural:"מ”ש",abbrev:"מ”ש"},{single:"שנייה",plural:"שניות",abbrev:"ש"},{single:"דקה",plural:"דקות",abbrev:"דקה"},{single:"שעה",plural:"שעות",abbrev:"ש"},{single:"יום",plural:"ימים",abbrev:"י"},{single:"שבוע",plural:"שבועות",abbrev:"ש"},{single:"חודש",plural:"חודשים",abbrev:"חודש"},{single:"רבעון",plural:"רבעונים",abbrev:"ר"},{single:"שנה",plural:"שנים",abbrev:"שנה"},{single:"עשור",plural:"עשורים",abbrev:"עש"}],unitAbbreviations:[["מיל"],["ש","שנ"],["ד","דק"],["ש","שע"],["י"],["ש","שב"],["חו","חוד","חודש"],["ר","רבעון","רבעון"],["ש","שנה"],["עשור"]],parsers:{L:"DD/MM/YYYY",LT:"HH:mm",LTS:"HH:mm:ss A"},ordinalSuffix:e=>e}},P=i.publishLocale(f),T=new String,E={localeName:"He",localeDesc:"עִברִית",localeCode:"he",ColumnPicker:{column:"עמודה",columnsMenu:"עמודות",hideColumn:"הסתר עמודה",hideColumnShort:"הסתר",newColumns:"עמודות חדשות"},Filter:{applyFilter:"השתמש בפילטר",filter:"פילטר",editFilter:"ערוך פילטר",on:"ב-",before:"לפני",after:"אחרי",equals:"שווה",lessThan:"קטן מ",moreThan:"גדול מ",removeFilter:"הסר פילטר",disableFilter:"נטרל פילטר"},FilterBar:{enableFilterBar:"הצג סרגל פילטרים",disableFilterBar:"הסתר סרגל פילטרים"},Group:{group:"קבוצה",groupAscending:"קבץ בסדר עולה",groupDescending:"קבץ בסדר יורד",groupAscendingShort:"עלייה",groupDescendingShort:"ירידה",stopGrouping:"עצירת תהליך קיבוץ",stopGroupingShort:"עצור"},HeaderMenu:{moveBefore:e=>`"${e}" הזז ללפני`,moveAfter:e=>`"${e}" הזז לאחרי`,collapseColumn:"כווץ עמודה",expandColumn:"הרחב עמודה"},ColumnRename:{rename:"שינוי שם"},MergeCells:{mergeCells:"מזג תאים",menuTooltip:"מזג תאים עם אותו ערך כאשר ממיינים באמצעות עמודה זו"},Search:{searchForValue:"חפש ערך"},Sort:{sort:"מיין",sortAscending:"מיין בסדר עולה",sortDescending:"מיין בסדר יורד",multiSort:"מיון מרובה",removeSorter:"הסר ממיין",addSortAscending:"הוסף ממיין בסדר עולה",addSortDescending:"הוסף ממיין בסדר יורד",toggleSortAscending:"שנה לסדר עולה",toggleSortDescending:"שנה לסדר יורד",sortAscendingShort:"עלייה",sortDescendingShort:"ירידה",removeSorterShort:"הסר",addSortAscendingShort:"+ עלייה",addSortDescendingShort:"+ ירידה"},Split:{split:"חלק",unsplit:"אל תחלק",horizontally:"באופן אופקי",vertically:"באופן אנכי",both:"שניהם"},Column:{columnLabel:e=>`${e.text?`.עמודה ${e.text}`:""} לתפריט ההקשר SPACE הקש על${e.sortable?", על מקש ENTER למיון":""}`,cellLabel:T},Checkbox:{toggleRowSelect:"החלף בין מצבי בחירת שורות",toggleSelection:"החלף בין מצבי בחירת מלוא אוסף הנתונים"},RatingColumn:{cellLabel:e=>{var t;return`${e.text?e.text:""} ${(t=e.location)!=null&&t.record?`: ${e.location.record.get(e.field)||0} : דירוג'`:""}`}},GridBase:{loadFailedMessage:"טעינת הנתונים נכשלה!",syncFailedMessage:"סנכרון הנתונים נכשל!",unspecifiedFailure:"תקלה בלתי-מוגדרת",networkFailure:"שגיאת רשת",parseFailure:"תקלה בניתוח תגובת השרת",serverResponse:":תגובת השרת",noRows:"אין רשומות להצגה",moveColumnLeft:"הזז למקטע השמאלי",moveColumnRight:"הזז למקטע הימני",moveColumnTo:e=>`${e}-הזז את העמודה ל`},CellMenu:{removeRow:"מחוק"},RowCopyPaste:{copyRecord:"העתק",cutRecord:"גזור",pasteRecord:"הדבק",rows:"שורות",row:"שורה"},CellCopyPaste:{copy:"העתק",cut:"גזור",paste:"הדבק"},PdfExport:{"Waiting for response from server":"...ממתין לתגובה מהשרת","Export failed":"הייצוא נכשל","Server error":"שגיאת שרת","Generating pages":"...יוצר עמודים","Click to abort":"ביטול"},ExportDialog:{width:"40em",labelWidth:"12em",exportSettings:"ייצוא הגדרות",export:"ייצוא",exporterType:"שליטה על דפדוף",cancel:"ביטול",fileFormat:"פורמט קובץ",rows:"שורות",alignRows:"יישור שורות",columns:"עמודות",paperFormat:"פורמט נייר",orientation:"אוריינטציה",repeatHeader:"חזרה על כותרת"},ExportRowsCombo:{all:"כל השורות",visible:"שורות נראות לעין"},ExportOrientationCombo:{portrait:"דיוקן",landscape:"נוף"},SinglePageExporter:{singlepage:"עמוד יחיד"},MultiPageExporter:{multipage:"מספר עמודים",exportingPage:({currentPage:e,totalPages:t})=>`${t}/${e} מייצא עמוד`},MultiPageVerticalExporter:{multipagevertical:"מספר עמודים (אנכי)",exportingPage:({currentPage:e,totalPages:t})=>`${t}/${e} מייצא עמוד`},RowExpander:{loading:"טוען",expand:"הרחב",collapse:"מזער"},TreeGroup:{group:"קיבוץ לפי",stopGrouping:"הפסק קיבוץ",stopGroupingThisColumn:"בטל קיבוץ עמודה זו"}},w=i.publishLocale(E),C={localeName:"He",localeDesc:"עִברִית",localeCode:"he",Object:{newEvent:"אירוע חדש"},ResourceInfoColumn:{eventCountText:e=>(e!==1?"ים":"")+"אירוע "+e},Dependencies:{from:"מ",to:"אל",valid:"חוקי",invalid:"בלתי-חוקי"},DependencyType:{SS:"SS",SF:"SF",FS:"FS",FF:"FF",StartToStart:"מההתחלה להתחלה",StartToEnd:"מההתחלה לסוף",EndToStart:"מהסוף להתחלה",EndToEnd:"מהסוף לסוף",short:["SS","SF","FS","FF"],long:["מההתחלה להתחלה","מהסוף להתחלה","מהסוף להתחלה","מהסוף לסוף"]},DependencyEdit:{From:"מ",To:"אל",Type:"סוג",Lag:"עיכוב","Edit dependency":"ערוך תלות",Save:"שמור",Delete:"מחוק",Cancel:"בטל",StartToStart:"מההתחלה להתחלה",StartToEnd:"מההתחלה לסוף",EndToStart:"מהסוף להתחלה",EndToEnd:"מהסוף לסוף"},EventEdit:{Name:"שם",Resource:"משאב",Start:"התחלה",End:"סוף",Save:"שמור",Delete:"מחוק",Cancel:"בטלl","Edit event":"ערוך אירוע",Repeat:"חזור"},EventDrag:{eventOverlapsExisting:"האירוע חופף לאירוע קיים במשאב זה",noDropOutsideTimeline:"לא ניתן לסלק את האירוע לחלוטין אל מחוץ לקו הזמן"},SchedulerBase:{"Add event":"הוספת אירוע","Delete event":"מחיקת אירוע","Unassign event":"בטל הקצאת אירוע",color:"צבע"},TimeAxisHeaderMenu:{pickZoomLevel:"זום",activeDateRange:"טווח תאריכים",startText:"תאריך התחלה",endText:"תאריך סיום",todayText:"היום"},EventCopyPaste:{copyEvent:"העתק אירוע",cutEvent:"גזור אירוע",pasteEvent:"הדבק אירוע"},EventFilter:{filterEvents:"סינון משימות",byName:"עפ”י שם"},TimeRanges:{showCurrentTimeLine:"הצג את קו הזמן הנוכחי"},PresetManager:{secondAndMinute:{displayDateFormat:"ll LTS",name:"שניות"},minuteAndHour:{topDateFormat:"ddd DD/MM, H",displayDateFormat:"ll LST"},hourAndDay:{topDateFormat:"ddd DD/MM",middleDateFormat:"LST",displayDateFormat:"ll LST",name:"יום"},day:{name:"יום/שעות"},week:{name:"שבוע/שעות"},dayAndWeek:{displayDateFormat:"ll LST",name:"שבוע/ימים"},dayAndMonth:{name:"חודש"},weekAndDay:{displayDateFormat:"ll LST",name:"שבוע"},weekAndMonth:{name:"שבועות"},weekAndDayLetter:{name:"שבועות/ימי השבוע"},weekDateAndMonth:{name:"חודשים/שבועות"},monthAndYear:{name:"חודשים"},year:{name:"שנים"},manyYears:{name:"מספר שנים"}},RecurrenceConfirmationPopup:{"delete-title":"הנך מוחק/ת כעת אירוע","delete-all-message":"?האם ברצונך למחוק את כל המופעים של אירוע זה","delete-further-message":"?האם ברצונך למחוק מופע זה וכל המופעים העתידיים של אירוע זה, או רק את המופע הנבחר","delete-further-btn-text":"מחוק את כל האירועים העתידיים","delete-only-this-btn-text":"מחק רק את האירוע הזה","update-title":"הנך משנה כעת אירוע חוזר","update-all-message":"?האם ברצונך לשנות את כל המופעים של אירוע זה","update-further-message":"?האם ברצונך לשנות רק את המופע הזה של האירוע, או גם את המופע הזה וגם מופעים עתידיים","update-further-btn-text":"כל האירועים העתידיים","update-only-this-btn-text":"רק את האירוע הזה",Yes:"כן",Cancel:"בטל",width:600},RecurrenceLegend:{" and ":" וגם ",Daily:"יומי","Weekly on {1}":({days:e})=>`${e}-מדי שבוע ב`,"Monthly on {1}":({days:e})=>`${e}-מדי חודש ב`,"Yearly on {1} of {2}":({days:e,months:t})=>`${t} מתוך ${e}-מדי שנה ב`,"Every {0} days":({interval:e})=>`ימים ${e} מדי`,"Every {0} weeks on {1}":({interval:e,days:t})=>`${t} שבועות מדי ${e}-ב`,"Every {0} months on {1}":({interval:e,days:t})=>`${t} חודשים מדי ${e}-ב`,"Every {0} years on {1} of {2}":({interval:e,days:t,months:a})=>`מתוך ${a} מדי ${t}-שנים ב ${e}-ב`,position1:"הראשון",position2:"השני",position3:"השלישי",position4:"הרביעי",position5:"החמישי","position-1":"האחרון",day:"יום",weekday:"היום בשבוע","weekend day":"היום בסופ”ש",daysFormat:({position:e,days:t})=>`${e} ${t}`},RecurrenceEditor:{"Repeat event":"אירוע חוזר",Cancel:"בטל",Save:"שמור",Frequency:"תדירות",Every:"מדי",DAILYintervalUnit:"יום/ימים",WEEKLYintervalUnit:"שבוע/שבועות",MONTHLYintervalUnit:"חודש/ים",YEARLYintervalUnit:"שנה/שנים",Each:"כל","On the":"-ב","End repeat":"סוף החזרה","time(s)":"פעם/פעמים"},RecurrenceDaysCombo:{day:"יום",weekday:"היום בשבוע","weekend day":"היום בסופ”ש"},RecurrencePositionsCombo:{position1:"ראשון",position2:"שני",position3:"שלישי",position4:"רביעי",position5:"חמישי","position-1":"אחרון"},RecurrenceStopConditionCombo:{Never:"לעולם לא",After:"לאחר","On date":"בתאריך"},RecurrenceFrequencyCombo:{None:"ללא חזרה",Daily:"מדי יום",Weekly:"מדי שבוע",Monthly:"מדי חודש",Yearly:"מדי שנה"},RecurrenceCombo:{None:"אין",Custom:"...מותאם אישית"},Summary:{"Summary for":e=>`${e} סיכום עבור`},ScheduleRangeCombo:{completeview:"לו”ז מלא",currentview:"לו”ז נראה לעין",daterange:"טווח תאריכים",completedata:"הלו”ז המלא (לכל האירועים)"},SchedulerExportDialog:{"Schedule range":"טווח לו”ז","Export from":"מ","Export to":"אל"},ExcelExporter:{"No resource assigned":"לא הוקצה שום משאב"},CrudManagerView:{serverResponseLabel:":תגובת השרת"},DurationColumn:{Duration:"משך"}},M=i.publishLocale(C),S={localeName:"He",localeDesc:"עִברִית",localeCode:"he",ConstraintTypePicker:{none:"אין",assoonaspossible:"בהקדם האפשרי",aslateaspossible:"בהקדם האפשרי",muststarton:"חייב להתחיל ב",mustfinishon:"חייב להסתיים ב",startnoearlierthan:"התחל לא לפני",startnolaterthan:"התחל לא יאוחר מ",finishnoearlierthan:"סיים לא לפני",finishnolaterthan:"סיים לא יאוחר מ"},SchedulingDirectionPicker:{Forward:"קדימה",Backward:"אחורה",inheritedFrom:"מורש מ",enforcedBy:"מוטל בכוח על ידי"},CalendarField:{"Default calendar":"לוח שנה ברירת מחדל"},TaskEditorBase:{Information:"מידע",Save:"שמור",Cancel:"בטל",Delete:"מחוק",calculateMask:"...חישוב",saveError:"לא ניתן לשמור, אנא תקן לפני כן את השגיאות",repeatingInfo:"צופה באירוע חוזר",editRepeating:"עריכה"},TaskEdit:{"Edit task":"ערוך משימה",ConfirmDeletionTitle:"אשר מחיקה",ConfirmDeletionMessage:"?האם הנך בטוח/ה שברצונך למחוק את האירוע"},GanttTaskEditor:{editorWidth:"44em"},SchedulerTaskEditor:{editorWidth:"32em"},SchedulerGeneralTab:{labelWidth:"6em",General:"כללי",Name:"שם",Resources:"משאבים","% complete":"% הושלם",Duration:"משך",Start:"התחלה",Finish:"סוף",Effort:"מאמץ",Preamble:"מבוא",Postamble:"אחרית"},GeneralTab:{labelWidth:"6.5em",General:"כללי",Name:"שם","% complete":"% הושלם",Duration:"משך",Start:"התחל",Finish:"סוף",Effort:"מאמץ",Dates:"תאריכים"},SchedulerAdvancedTab:{labelWidth:"13em",Advanced:"מתקדם",Calendar:"לוח שנה","Scheduling mode":"מצב תזמון","Effort driven":"מונע מאמץ","Manually scheduled":"מתוזמן ידנית","Constraint type":"סוג אילוץ","Constraint date":"תאריך אילוץ",Inactive:"בלתי-פעיל","Ignore resource calendar":"התעלם מלוח משאבים"},AdvancedTab:{labelWidth:"11.5em",Advanced:"מתקדם",Calendar:"לוח שנה","Scheduling mode":"מצב תזמון","Effort driven":"מונע מאמץ","Manually scheduled":"מתוזמן ידנית","Constraint type":"סוף אילוץ","Constraint date":"תאריך אילוץ",Constraint:"אילוץ",Rollup:"גלילה מעלה",Inactive:"בלתי-פעיל","Ignore resource calendar":"התעלם מלוח משאבים","Scheduling direction":"כיוון תזמון"},DependencyTab:{Predecessors:"אירועים קודמים",Successors:"אירועים יורשים",ID:"מזהה",Name:"שם",Type:"סוג",Lag:"עיכוב",cyclicDependency:"תלות ציקלית",invalidDependency:"תלות בלתי-חוקית"},NotesTab:{Notes:"הערות"},ResourcesTab:{unitsTpl:({value:e})=>`${e}%`,Resources:"משאבים",Resource:"משאב",Units:"יחידות"},RecurrenceTab:{title:"חזרה"},SchedulingModePicker:{Normal:"נורמלי","Fixed Duration":"משך קבוע","Fixed Units":"יחידות קבועות","Fixed Effort":"מאמץ קבוע"},ResourceHistogram:{barTipInRange:'<b>{resource}</b> {startDate} - {endDate}<br><span class="{cls}">{allocated} מתוך {available}</span> הוקצו',barTipOnDate:'<b>{resource}</b> ב {startDate}<br><span class="{cls}">{allocated} מתוך {available}</span> הוקצו',groupBarTipAssignment:'<b>{resource}</b> - <span class="{cls}">{allocated} מתוך {available}</span>',groupBarTipInRange:'{startDate} - {endDate}<br><span class="{cls}">{allocated} מתוך {available}</span> הוקצו:<br>{assignments}',groupBarTipOnDate:'ב {startDate}<br><span class="{cls}">{allocated} מתוך {available}</span> הוקצו:<br>{assignments}',plusMore:"+{value} יותר"},ResourceUtilization:{barTipInRange:'<b>{event}</b> {startDate} - {endDate}<br><span class="{cls}">{allocated}</span> הוקצו',barTipOnDate:'<b>{event}</b> מתוך {startDate}<br><span class="{cls}">{allocated}</span> הוקצו',groupBarTipAssignment:'<b>{event}</b> - <span class="{cls}">{allocated}</span>',groupBarTipInRange:'{startDate} - {endDate}<br><span class="{cls}">{allocated} מתוך {available}</span> הוקצו:<br>{assignments}',groupBarTipOnDate:'ב {startDate}<br><span class="{cls}">{allocated} מתוך {available}</span> הוקצו:<br>{assignments}',plusMore:"+{value} יותר",nameColumnText:"משאב / אירוע"},SchedulingIssueResolutionPopup:{"Cancel changes":"בטל את השינוי ואל תבצע שום פעולה",schedulingConflict:"קונפליקט תזמון",emptyCalendar:"שגיאה בקביעת תצורת לוח שנה",cycle:"מחזור תזמון",Apply:"החל"},CycleResolutionPopup:{dependencyLabel:":אנא בחר תלות",invalidDependencyLabel:":ישנה מעורבות/נוכחות של תלויות בלתי-חוקיות שיש לטפל בהן"},DependencyEdit:{Active:"פעיל"},SchedulerProBase:{propagating:"מחשב פרויקט",storePopulation:"טוען נתונים",finalizing:"משלים תוצאות"},EventSegments:{splitEvent:"פיצול אירוע",renameSegment:"שינוי שם"},NestedEvents:{deNestingNotAllowed:"ביטול קינון אינו מותר",nestingNotAllowed:"קינון אינו מותר"},VersionGrid:{compare:"השווה",description:"תיאור",occurredAt:"קרה בתאריך",rename:"שינוי שם",restore:"שחזר",stopComparing:"הפסק השוואה"},Versions:{entityNames:{TaskModel:"משימה",AssignmentModel:"הקצאה",DependencyModel:"קישור",ProjectModel:"פרויקט",ResourceModel:"משאב",other:"אוביקט"},entityNamesPlural:{TaskModel:"משימות",AssignmentModel:"הקצאות",DependencyModel:"קישורים",ProjectModel:"פרויקטים",ResourceModel:"משאבים",other:"אוביקטים"},transactionDescriptions:{update:"שונו {n} ‏{entities}",add:"הוספו {n} ‏{entities}",remove:"הוסרו {n} ‏{entities}",move:"הועברו {n} ‏{entities}",mixed:"שונו {n} ‏{entities}"},addEntity:"התווסף {type} **{name}**",removeEntity:"הוסר {type} **{name}**",updateEntity:"שונה {type} **{name}**",moveEntity:"הועבר {type} **{name}** מ- {from} ל- {to}",addDependency:"התווסף קישור מ- **{from}** ל- **{to}**",removeDependency:"הוסר קישור מ- **{from}** ל- **{to}**",updateDependency:"נערך קישור מ- **{from}** ל- **{to}**",addAssignment:"הוקצה **{resource}** ל- **{event}**",removeAssignment:"הוסרה הקצאת **{resource}** מ- **{event}**",updateAssignment:"נערכה הקצאת **{resource}**  ל-  **{event}**",noChanges:"אין שינויים",nullValue:"אין",versionDateFormat:"M/D/YYYY h:mm a",undid:"שינויים בוטלו",redid:"שינויים בוצעו מחדש",editedTask:"תכונות משימה נערכו",deletedTask:"משימה נמחקה",movedTask:"משימה הוזזה",movedTasks:"משימות הוזזו"}},R=i.publishLocale(S);if(typeof r.exports=="object"&&typeof s=="object"){var F=(e,t,a,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Object.getOwnPropertyNames(t))!Object.prototype.hasOwnProperty.call(e,n)&&n!==a&&Object.defineProperty(e,n,{get:()=>t[n],enumerable:!(o=Object.getOwnPropertyDescriptor(t,n))||o.enumerable});return e};r.exports=F(r.exports,s)}return r.exports});
