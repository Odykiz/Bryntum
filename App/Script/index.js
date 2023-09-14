import { LocaleHelper, PresetManager, SchedulerPro, LocaleManager, StringHelper, DateHelper, AsyncHelper, WidgetHelper, Scheduler, Toast, Splitter, DragHelper, Grid, EventModel, DomHelper, Combo, Tooltip, EventStore, ResourceModel } from '../bryntum-schedulerpro-trial/schedulerpro-5.4.0-trial/build/schedulerpro.module.js';
import dataset from '../Resource/dataset.json' assert { type: "json"};
import dataGenEvents from '../Resource/dataGenEvent.json' assert { type: "json"};
import unplanned from '../Resource/unplanned.json' assert { type: "json"};

const
    //socket = io(),
    statusArr = [
        'rgb(255,0,0)',
        'rgb(0,0,255)',
        'green',
        'yellow',
        'cyan',
        'rgb(255,0,128)',
        'rgb(0,0,0)',
        'rgb(255,127,127)',
        'purple',
        'rgb(255,0,255)',
        'rgb(255,255,255)',
        'rgb(192,192,192)',
        'rgb(255,128,64)',
        'rgb(96,0,0)',
        'rgb(204,204,255)',
        'rgb(96,96,96)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
    ],
    statusStringArr = [
        "Unvollständig",
        "Vollständig",
        "Eingeplant",
        "Rapport gedruckt",
        "Einsatz begonnen",
        "Rechnung freigabe",
        "Einsatz ende",
        "Rechnung gedruckt",
        "Fakturajournal gedruckt",
        "Freimeldung",
        "Reservierung",
        "Werkstatt Reservierung",
        "Werkstatt Auftrag",
        "Einsatz erhalten",
        "Klärung",
        "Nicht Abrechenbar",
        "Storniert",
        "Werkstattres. erfasst",
        "Werkstattres. in Bearbeitung",
        "Werkstattres. frei",
        "Werkstattres. frei",
        "Werkstattres. frei",
        "Werkstattres. frei",
        "Werkstattres. frei",
        "Werkstattres. frei",
        "Werkstattres. frei"
    ],
    today = DateHelper.clearTime(new Date());
const serverAdress = "ws://localhost:5000";
var socket = new WebSocket(serverAdress);
let jsonhelper = 0;

const locale = {

    localeName: 'De',
    localeDesc: 'Deutsch',
    localeCode: 'de-DE',
    localePath: '../bryntum-schedulerpro-trial/schedulerpro-5.4.0-trial/build/locales/schedulerpro.locale.De.js',
}

LocaleHelper.publishLocale(locale);
LocaleManager.applyLocale('De');
/*
socket.on('message', message => {
    console.log(message);
})*/


async function generateResources() {
    const
        mask = WidgetHelper.mask(scheduler.element, 'Generating records'),
        ressoArr = [],
        eventArr = [],
        assignments = [],
        clsHelper = 'dark';

    let i, x = 0, statusHelper;

    console.time('generate');

    i = 0;
    do {
        ressoArr.push({
            id: i,
            nr: (i + 1),
            fzNr: dataset.FAHRZEUG[i].FA_NUMM,
            name: dataset.FAHRZEUG[i].FA_NAME,
            fzGr: dataset.FAHRZEUG[i].FA_FZGRUP,
            SerNr: dataset.FAHRZEUG[i].FA_SERIEN_NR,
            cls: 'dark'
        });
        i++;
        x++;

    } while (dataset.FAHRZEUG[i]);

    let a = ressoArr.map(el => el.fzNr);

    i = 0;
    do {
        switch (Math.round(dataset.MAINDATA[i].STATUS)) {
            case 51:
                statusHelper = 9
                break;

            case 0:
                statusHelper = 11
                break;

            case 100:
                statusHelper = 11
                break;

            case 101:
                statusHelper = 12
                break;

            case 41:
                statusHelper = 13
                break;

            case 31:
                statusHelper = 14
                break;

            case 71:
                statusHelper = 15
                break;

            case 10:
                statusHelper = 16
                break;

            case 1001:
                statusHelper = 17
                break;

            case 1002:
                statusHelper = 18
                break;

            case 1003:
                statusHelper = 19
                break;

            case 1004:
                statusHelper = 20
                break;

            case 1005:
                statusHelper = 21
                break;

            case 1006:
                statusHelper = 22
                break;

            case 1007:
                statusHelper = 23
                break;

            case 1008:
                statusHelper = 24
                break;

            case 1009:
                statusHelper = 25
                break;

            case 1010:
                statusHelper = 25
                break;

            default:
                statusHelper = Math.round(dataset.MAINDATA[i].STATUS) - 1;
                break;
        }

        /*
            Event Daten aus der dataEvents Datei werden im richtiger Form in eventArr gepeichert.
            Für die Übergabe der Event Daten aus der Datengrundlage zur Oberfläche
        */
        const nameHelper = [
            dataset.MAINDATA[i].FAHRZEUGGRUPPE,
            dataset.MAINDATA[i].EINSATZORT,
            dataset.MAINDATA[i].KUNDENNAME1,
            dataset.MAINDATA[i].FAHRERNAME,
            dataset.MAINDATA[i].LIEFERANT
        ],
            anfahrtHelper = dataset.MAINDATA[i].ANFAHRT * 60 + 'min',
            abfartHelper = dataset.MAINDATA[i].ABFAHRT * 60 + 'min';

        for (let i = 0; i < nameHelper.length; i++) {
            nameHelper[i] = (nameHelper[i] === null) ? '' : nameHelper[i];
        }

        eventArr.push({
            //id : Math.round(dataset.MAINDATA[i].TIMESTAMP),
            id: i,
            name: nameHelper[0] +
                '   |   ' + nameHelper[1] +
                '   |   ' + nameHelper[2] +
                '   |   ' + nameHelper[3] +
                '   |   ' + nameHelper[4],
            startDate: dataset.MAINDATA[i].VDAT,
            endDate: dataset.MAINDATA[i].BDAT,
            eventColor: statusArr[statusHelper],
            eventStyle: 'plain',
            preamble: anfahrtHelper,
            postamble: abfartHelper,
            fzNr: dataset.MAINDATA[i].FAHRZEUGNUMMER,
            statusHelper: statusHelper,
            kunde: dataset.MAINDATA[i].KUNDENNAME1,
            aufNr: dataset.MAINDATA[i].AUFTRAGSNUMMER,
            einsatzort: dataset.MAINDATA[i].EINSATZORT,
            fahrer: dataset.MAINDATA[i].FAHRERNAME,
            sachbearbeiter: '',
            posNr: '',
            cls: ''

        });
        /*
            Assigment Daten aus der dataEvents Datei werden im richtiger Form in eventArr gepeichert.
            Für die Übergabe der Event Daten aus der Datengrundlage zur Oberfläche
        */
        assignments.push({
            event: i,
            resource: (a.indexOf(dataset.MAINDATA[i].FAHRZEUGNUMMER))
        });


        if (ressoArr.length % 2000 === 0) {
            mask.text = `Generated ${ressoArr.length * eventCount} of ${resourceCount * eventCount} records`;

            await AsyncHelper.animationFrame();
        }
        i++;

    } while (dataset.MAINDATA[i]);

    console.timeEnd('generate');
    console.log("Events:" + i);
    mask.text = "Loading data";

    // Give the UI a chance to catch up, to update the mask before proceeding
    await AsyncHelper.sleep(100);
    console.time('data');

    scheduler.suspendRefresh();
    //scheduler.startDate = new Date(DateHelper.format(DateHelper.clearTime(new Date()), 'YYYY MMM D'))
    //scheduler.endDate = new Date(2023, 11, 20);
    scheduler.project = {
        assignmentStore: {
            // Boost record creation performance a bit, by not cloning the raw data object
            useRawData: true,
            data: assignments
        },
        resourceStore: {
            useRawData: true,
            data: ressoArr
        },
        events: eventArr,

    };
    scheduler.resumeRefresh(true);
    await scheduler.project.await('refresh');
    console.timeEnd('data');
    mask.close();
};

export async function messageResources(msgData) {
    const
        mask = WidgetHelper.mask(scheduler.element, 'Generating records'),
        ressoArr = [],
        eventArr = [],
        assignments = [],
        clsHelper = 'dark';

    let i, x = 0, statusHelper;

    console.time('generate');

    i = 0;
    do {
        ressoArr.push({
            id: i,
            nr: (i + 1),
            fzNr: msgData.FAHRZEUG[i].FA_NUMM,
            name: msgData.FAHRZEUG[i].FA_NAME,
            fzGr: msgData.FAHRZEUG[i].FA_FZGRUP,
            SerNr: msgData.FAHRZEUG[i].FA_SERIEN_NR,
            cls: 'dark'
        });
        i++;
        x++;

    } while (msgData.FAHRZEUG[i]);

    let a = ressoArr.map(el => el.fzNr);

    i = 0;
    do {
        switch (Math.round(msgData.MAINDATA[i].STATUS)) {
            case 51:
                statusHelper = 9
                break;

            case 0:
                statusHelper = 11
                break;

            case 100:
                statusHelper = 11
                break;

            case 101:
                statusHelper = 12
                break;

            case 41:
                statusHelper = 13
                break;

            case 31:
                statusHelper = 14
                break;

            case 71:
                statusHelper = 15
                break;

            case 10:
                statusHelper = 16
                break;

            case 1001:
                statusHelper = 17
                break;

            case 1002:
                statusHelper = 18
                break;

            case 1003:
                statusHelper = 19
                break;

            case 1004:
                statusHelper = 20
                break;

            case 1005:
                statusHelper = 21
                break;

            case 1006:
                statusHelper = 22
                break;

            case 1007:
                statusHelper = 23
                break;

            case 1008:
                statusHelper = 24
                break;

            case 1009:
                statusHelper = 25
                break;

            case 1010:
                statusHelper = 25
                break;

            default:
                statusHelper = Math.round(msgData.MAINDATA[i].STATUS) - 1;
                break;
        }

        /*
            Event Daten aus der dataEvents Datei werden im richtiger Form in eventArr gepeichert.
            Für die Übergabe der Event Daten aus der Datengrundlage zur Oberfläche
        */
        const nameHelper = [
            msgData.MAINDATA[i].FAHRZEUGGRUPPE,
            msgData.MAINDATA[i].EINSATZORT,
            msgData.MAINDATA[i].KUNDENNAME1,
            msgData.MAINDATA[i].FAHRERNAME,
            msgData.MAINDATA[i].LIEFERANT
        ],
            anfahrtHelper = msgData.MAINDATA[i].ANFAHRT * 60 + 'min',
            abfartHelper = msgData.MAINDATA[i].ABFAHRT * 60 + 'min';

        for (let i = 0; i < nameHelper.length; i++) {
            nameHelper[i] = (nameHelper[i] === null) ? '' : nameHelper[i];
        }

        eventArr.push({
            //id : Math.round(dataset.MAINDATA[i].TIMESTAMP),
            id: i,
            name: nameHelper[0] +
                '   |   ' + nameHelper[1] +
                '   |   ' + nameHelper[2] +
                '   |   ' + nameHelper[3] +
                '   |   ' + nameHelper[4],
            startDate: msgData.MAINDATA[i].VDAT,
            endDate: msgData.MAINDATA[i].BDAT,
            eventColor: statusArr[statusHelper],
            eventStyle: 'plain',
            preamble: anfahrtHelper,
            postamble: abfartHelper,
            fzNr: msgData.MAINDATA[i].FAHRZEUGNUMMER,
            statusHelper: statusHelper,
            kunde: msgData.MAINDATA[i].KUNDENNAME1,
            aufNr: msgData.MAINDATA[i].AUFTRAGSNUMMER,
            einsatzort: msgData.MAINDATA[i].EINSATZORT,
            fahrer: msgData.MAINDATA[i].FAHRERNAME,
            sachbearbeiter: '',
            posNr: '',
            cls: ''

        });
        /*
            Assigment Daten aus der dataEvents Datei werden im richtiger Form in eventArr gepeichert.
            Für die Übergabe der Event Daten aus der Datengrundlage zur Oberfläche
        */
        assignments.push({
            event: i,
            resource: (a.indexOf(msgData.MAINDATA[i].FAHRZEUGNUMMER))
        });


        if (ressoArr.length % 2000 === 0) {
            mask.text = `Generated ${ressoArr.length * eventCount} of ${resourceCount * eventCount} records`;

            await AsyncHelper.animationFrame();
        }
        i++;

    } while (msgData.MAINDATA[i]);

    console.timeEnd('generate');
    console.log("Events:" + i);
    mask.text = "Loading data";

    // Give the UI a chance to catch up, to update the mask before proceeding
    await AsyncHelper.sleep(100);
    console.time('data');

    scheduler.suspendRefresh();
    //scheduler.startDate = new Date(DateHelper.format(DateHelper.clearTime(new Date()), 'YYYY MMM D'))
    //scheduler.endDate = new Date(2023, 11, 20);
    scheduler.project = {
        assignmentStore: {
            // Boost record creation performance a bit, by not cloning the raw data object
            useRawData: true,
            data: assignments
        },
        resourceStore: {
            useRawData: true,
            data: ressoArr
        },
        events: eventArr,

    };
    scheduler.resumeRefresh(true);
    await scheduler.project.await('refresh');
    console.timeEnd('data');
    mask.close();
};

async function getdata() {

    socket.send("get");


    socket.onmessage = function (event) {
        if (event.data === "fertig") {
            generateGenResources();

        }

    }
    //outputMessage(event.data);


    /*
    socket.onmessage = function(event) {
        if (jsonhelper === 0) {
          console.log("Daten Erhalten:", event.data);
          ausg.value = event.data;
                    
        }
        if (jsonhelper === 1) {
          let obj = JSON.parse(event.data);
          console.log(obj[0])
          getGenResources(obj)
          jsonhelper = 0;
        }
        event.data == "get" ? jsonhelper = 1 : jsonhelper = 0;
        console.log(jsonhelper);
        //outputMessage(event.data);
      };*/

};

export async function getGenResources(msgData) {
    const
        today = DateHelper.clearTime(new Date()),
        mask = WidgetHelper.mask(scheduler.element, 'Generating records'),
        ressoArr = [],
        eventArr = [],
        assignments = [],
        timeRanges = []

    let schedulerEndDate = today, i;

    console.time('generate');

    i = 0;
    do {

        ressoArr.push({
            id: i,
            nr: (i + 1),
            fzNr: dataset.FAHRZEUG[i].FA_NUMM,
            name: dataset.FAHRZEUG[i].FA_NAME,
            fzGr: dataset.FAHRZEUG[i].FA_FZGRUP,
            SerNr: dataset.FAHRZEUG[i].FA_SERIEN_NR,
        });

        i++;

    } while (dataset.FAHRZEUG[i + 500] || i < 0);

    i = 0;
    do {

        /*
            Event Daten aus der dataEvents Datei werden im richtiger Form in eventArr gepeichert.
            Für die Übergabe der Event Daten aus der Datengrundlage zur Oberfläche
        */
        eventArr.push({
            id: msgData[i].id,
            name: msgData[i].name,
            startDate: msgData[i].startDate,
            duration: msgData[i].duration,
            durationUnit: msgData[i].durationUnit,
            eventColor: msgData[i].eventColor
        });

        /*
            Assigment Daten aus der dataEvents Datei werden im richtiger Form in eventArr gepeichert.
            Für die Übergabe der Event Daten aus der Datengrundlage zur Oberfläche
        */
        assignments.push({
            event: msgData[i].id,
            resource: msgData[i].resource
        });

        if (ressoArr.length % 2000 === 0) {
            mask.text = `Generated ${ressoArr.length * eventCount} of ${resourceCount * eventCount} records`;

            await AsyncHelper.animationFrame();
        }

        i++;

    } while (msgData[i]);

    console.timeEnd('generate');

    console.log("Events:" + i);

    mask.text = "Loading data";

    // Give the UI a chance to catch up, to update the mask before proceeding
    await AsyncHelper.sleep(100);

    console.time('data');

    scheduler.suspendRefresh();
    scheduler.project = {
        assignmentStore: {
            // Boost record creation performance a bit, by not cloning the raw data object
            useRawData: true,
            data: assignments
        },
        resourceStore: {
            useRawData: true,
            data: ressoArr
        },
        events: getdata,

        timeRangeStore: {
            useRawData: true,
            data: timeRanges
        }

    };
    scheduler.resumeRefresh(true);

    await scheduler.project.await('refresh');

    console.timeEnd('data');

    mask.close();
}

async function generateGenResources() {
    const
        today = DateHelper.clearTime(new Date()),
        mask = WidgetHelper.mask(scheduler.element, 'Generating records'),
        ressoArr = [],
        eventArr = [],
        assignments = [],
        timeRanges = []

    let schedulerEndDate = today, i;

    console.time('generate');

    i = 0;
    do {

        ressoArr.push({
            id: i,
            nr: (i + 1),
            fzNr: dataset.FAHRZEUG[i].FA_NUMM,
            name: dataset.FAHRZEUG[i].FA_NAME,
            fzGr: dataset.FAHRZEUG[i].FA_FZGRUP,
            SerNr: dataset.FAHRZEUG[i].FA_SERIEN_NR,
        });

        i++;

    } while (dataset.FAHRZEUG[i + 500] || i < 0);

    i = 0;
    do {

        /*
            Event Daten aus der dataEvents Datei werden im richtiger Form in eventArr gepeichert.
            Für die Übergabe der Event Daten aus der Datengrundlage zur Oberfläche
        */
        eventArr.push({
            id: dataGenEvents[i].id,
            name: dataGenEvents[i].name,
            startDate: dataGenEvents[i].startDate,
            duration: dataGenEvents[i].duration,
            durationUnit: dataGenEvents[i].durationUnit,
            eventColor: dataGenEvents[i].eventColor
        });

        /*
            Assigment Daten aus der dataEvents Datei werden im richtiger Form in eventArr gepeichert.
            Für die Übergabe der Event Daten aus der Datengrundlage zur Oberfläche
        */
        assignments.push({
            event: dataGenEvents[i].id,
            resource: dataGenEvents[i].resource
        });

        if (ressoArr.length % 2000 === 0) {
            mask.text = `Generated ${ressoArr.length * eventCount} of ${resourceCount * eventCount} records`;

            await AsyncHelper.animationFrame();
        }

        i++;

    } while (dataGenEvents[i]);

    console.timeEnd('generate');

    console.log("Events:" + i);

    mask.text = "Loading data";

    // Give the UI a chance to catch up, to update the mask before proceeding
    await AsyncHelper.sleep(100);

    console.time('data');

    scheduler.suspendRefresh();
    scheduler.project = {
        assignmentStore: {
            // Boost record creation performance a bit, by not cloning the raw data object
            useRawData: true,
            data: assignments
        },
        resourceStore: {
            useRawData: true,
            data: ressoArr
        },
        events: eventArr,

        timeRangeStore: {
            useRawData: true,
            data: timeRanges
        }

    };
    scheduler.resumeRefresh(true);

    await scheduler.project.await('refresh');

    console.timeEnd('data');

    mask.close();
}

class Drag extends DragHelper {
    static get configurable() {
        return {
            callOnFunctions: true,
            // Don't drag the actual row element, clone it
            cloneTarget: true,
            // We size the cloned element manually
            autoSizeClonedTarget: false,
            // Only allow drops on the schedule area
            dropTargetSelector: '.b-timeline-subgrid',
            // Only allow drag of row elements inside on the unplanned grid
            targetSelector: '.b-grid-row:not(.b-group-row)'
        };
    }

    afterConstruct() {
        // Configure DragHelper with schedule's scrollManager to allow scrolling while dragging
        //this.scrollManager = this.schedule.scrollManager;
    }

    createProxy(element) {
        const
            proxy = document.createElement('div'),
            { schedule } = this,
            task = this.grid.getRecordFromElement(element),
            durationInPx = schedule.timeAxisViewModel.getDistanceForDuration(task.durationMS);

        // Fake an event bar
        proxy.classList.add('b-sch-event-wrap', 'b-sch-event', 'b-unassigned-class', `b-sch-${schedule.mode}`);
        proxy.innerHTML = `<div class="b-sch-event b-has-content b-sch-event-withicon">
            <div class="b-sch-event-content">
                <i class="${task.iconCls}"></i> ${task.name}
            </div>
        </div>`;

        if (schedule.isHorizontal) {
            proxy.style.height = `${schedule.rowHeight - (2 * schedule.resourceMargin)}px`;
            proxy.style.width = `${durationInPx}px`;
        }
        else {
            proxy.style.height = `${durationInPx}px`;
            proxy.style.width = `${schedule.resourceColumnWidth}px`;
        }

        return proxy;
    }

    onDragStart({ context }) {
        const
            me = this,
            { schedule } = me,
            { eventTooltip, eventDrag } = schedule.features;

        // save a reference to the task so we can access it later
        context.task = me.grid.getRecordFromElement(context.grabbed);

        // Prevent tooltips from showing while dragging
        eventTooltip.disabled = true;

        schedule.enableScrollingCloseToEdges(schedule.timeAxisSubGrid);

        if (eventDrag.showTooltip && !me.tip) {
            me.tip = new Tooltip({
                align: 'b-t',
                clippedBy: [schedule.timeAxisSubGridElement, schedule.bodyContainer],
                forElement: context.element,

                cls: 'b-popup b-sch-event-tooltip'
            });
        }
    }

    onDrag({ event, context }) {
        const
            me = this,
            { schedule } = me,
            { task } = context,
            coordinate = DomHelper[`getTranslate${schedule.isHorizontal ? 'X' : 'Y'}`](context.element),
            startDate = schedule.getDateFromCoordinate(coordinate, 'round', false),
            endDate = startDate && DateHelper.add(startDate, task.duration, task.durationUnit),
            eventColor = 'blue',
            // Coordinates required when used in vertical mode, since it does not use actual columns
            resource = context.target && schedule.resolveResourceRecord(context.target, [event.offsetX, event.offsetY]);

        // Don't allow drops anywhere, only allow drops if the drop is on the timeaxis and on top of a Resource
        context.valid = Boolean(startDate && resource) &&
            (schedule.allowOverlap || schedule.isDateRangeAvailable(startDate, endDate, null, resource));

        // Save reference to resource so we can use it in onTaskDrop
        context.resource = resource;

        if (me.tip && context.valid) {
            const
                dateFormat = schedule.displayDateFormat,
                formattedStartDate = DateHelper.format(startDate, dateFormat),
                formattedEndDate = DateHelper.format(endDate, dateFormat);

            me.tip.html = `
                <div class="b-sch-event-title">${task.name}</div>
                <div class="b-sch-tooltip-startdate">Starts: ${formattedStartDate}</div>
                <div class="b-sch-tooltip-enddate">Ends: ${formattedEndDate}</div>
            `;
            me.tip.showBy(context.element);
        }
        else {
            me.tip?.hide();
        }
    }

    onDrop({ context, event }) {
        const
            me = this,
            { schedule } = me,
            { task, target, resource, valid, element } = context;

        me.tip?.hide();

        schedule.disableScrollingCloseToEdges(me.schedule.timeAxisSubGrid);

        // If drop was done in a valid location, set the startDate and transfer the task to the Scheduler event store
        if (valid && target) {
            const
                coordinate = DomHelper[`getTranslate${schedule.isHorizontal ? 'X' : 'Y'}`](element),
                date = schedule.getDateFromCoordinate(coordinate, 'round', false),
                // Try resolving event record from target element, to determine if drop was on another event
                targetEventRecord = schedule.resolveEventRecord(target);

            if (date) {
                // Remove from grid first so that the data change
                // below does not fire events into the grid.
                me.grid.store.remove(task);

                task.startDate = date;

                task.assign(resource);
                //schedule.eventStore.add(task);
            }

            // Dropped on a scheduled event, display toast
            if (targetEventRecord) {
                Toast.show(`Dropped on ${targetEventRecord.name}`);
            }
        }

        if (resource) {
            resource.cls = '';
        }

        schedule.features.eventTooltip.disabled = false;
    }

    set schedule(schedule) {
        this._schedule = schedule;

        // Configure DragHelper with schedule's scrollManager to allow scrolling while dragging
        this.scrollManager = schedule.scrollManager;
    }

    get schedule() {
        return this._schedule;
    }

    onDragAbort() {
        this.tip?.hide();
    }

};

class Task extends EventModel {

    static get fields() {
        return [
            { name: 'durationUnit', defaultValue: 'h' },
            'orderId'
        ];
    }

    get order() {
        return this.project?.getCrudStore('orders').getById(this.orderId);
    }

    get orderSize() {
        return this.order?.size;
    }

    get eventColor() {
        return this.order?.eventColor;
    }
}

class TaskStore extends EventStore {

    static $name = 'TaskStore';

    static get defaultConfig() {
        return {
            modelClass: Task
        };
    }

    // Override add to reschedule any overlapping events caused by the add
    add(records, silent = false) {
        const me = this;

        if (me.autoRescheduleTasks) {
            // Flag to avoid rescheduling during rescheduling
            me.isRescheduling = true;
            me.beginBatch();
        }

        if (!Array.isArray(records)) {
            records = [records];
        }

        super.add(records, silent);

        if (me.autoRescheduleTasks) {
            me.endBatch();
            me.isRescheduling = false;
        }
    }

    // Auto called when triggering the update event.
    // Reschedule if the update caused the event to overlap any others.
    onUpdate({ record }) {
        if (this.autoRescheduleTasks && !this.isRescheduling) {
            this.rescheduleOverlappingTasks(record);
        }
    }

    rescheduleOverlappingTasks(eventRecord) {
        if (eventRecord.resource) {
            const
                futureEvents = [],
                earlierEvents = [];

            // Split tasks into future and earlier tasks
            eventRecord.resource.events.forEach(event => {
                if (event !== eventRecord) {
                    if (event.startDate >= eventRecord.startDate) {
                        futureEvents.push(event);
                    }
                    else {
                        earlierEvents.push(event);
                    }
                }
            });

            if (futureEvents.length || earlierEvents.length) {
                futureEvents.sort((a, b) => a.startDate > b.startDate ? 1 : -1);
                earlierEvents.sort((a, b) => a.startDate > b.startDate ? -1 : 1);

                futureEvents.forEach((ev, i) => {
                    const prev = futureEvents[i - 1] || eventRecord;

                    ev.startDate = DateHelper.max(prev.endDate, ev.startDate);
                });

                // Walk backwards and remove any overlap
                [eventRecord, ...earlierEvents].forEach((ev, i, all) => {
                    const prev = all[i - 1];

                    if (ev.endDate > Date.now() && ev !== eventRecord && prev) {
                        ev.setEndDate(DateHelper.min(prev.startDate, ev.endDate), true);
                    }
                });

                this.isRescheduling = false;
            }
        }
    }
};

class UnplannedGrid extends Grid {
    /**
     * Original class name getter. See Widget.$name docs for the details.
     * @returns {string}
     */
    static get $name() {
        return 'UnplannedGrid';
    }

    // Factoryable type name
    static get type() {
        return 'unplannedgrid';
    }

    static get configurable() {
        return {
            features: {
                stripe: true,
                sort: 'name',
                filterBar: true,
            },

            columns: [{
                text: 'Aufträge',
                flex: 1,
                field: 'name',
                htmlEncode: false,
                minWidth: 200,
                filterable: {
                    filterField: {
                        triggers: {
                            search: {
                                cls: 'b-icon b-fa-search'
                            }
                        },
                        placeholder: 'Suchen'
                    }
                },
                renderer: data => StringHelper.xss`<i class="${data.record.iconCls}"></i>${data.record.name}`
            },
            {
                type: 'duration',
                text: 'Laufzeit',
                width: 80,
                align: 'right',
                filterable: false

            }],
            cls: 'ungrid',
            rowHeight: 50
        };
    }
};

class Schedule extends SchedulerPro {
    static get $name() {
        return 'Schedule';
    }

    static get type() {
        return 'schedule';
    }
};


// Register this widget type with its Factory
UnplannedGrid.initClass();
Schedule.initClass();

const scheduler = new SchedulerPro({

    ref: 'schedule',
    //insertFirst : 'container',

    timeZone: 'Europe/Berlin',

    multiEventSelect: true,
    appendTo: 'plantafel-container',
    eventStyle: 'border',
    viewPreset: 'monthAndYear',
    rowHeight: 70,
    eventColor: 'blue',

    /*
    listeners : {
        beforeEventDrag({ eventRecord  }) {
            const startDate = eventRecord.startDate
            // Don't allow dragging events that have already started
            return new <= eventRecord.resource.id;
        }
    },*/

    generateResources,

    tbar: [

        {
            type: 'button',
            text: 'Einstellungen',
            color: 'b-gray',
        },
        {
            type: 'combo',
            label: 'Ansicht',
            placeholder: 'Fahrzeuge',
            value: 'Fahrzeuge',
            items: [
                [0, 'Fahrzeuge'],
                [1, 'Personal']
            ],
            onAction: ({ value }) => {
                switch (value) {
                    case 1:
                        getdata();
                        //generateGenResources();
                        break;

                    default:
                        generateResources();
                        break;
                }
            }
        },
        {
            type: 'combo',
            label: 'Niederlasung',
            placeholder: '1',
            value: '1',
            items: [
                '',
                '1'

            ]
        },
        {
            type: 'datefield',
            label: 'Datum wählen',
            inputWidth: '10em',
            width: 'auto',
            value: today,
            step: '1d',
            toggleGroup: true,
            listeners: {
                change({ userAction, value }) {
                    if (userAction) {
                        scheduler.scrollToDate(DateHelper.set(value, 'hour', 12), { block: 'center', animate: 500 });
                    }
                }
            },
            highlightExternalChange: false,
        },
        {
            type: 'viewpresetcombo',
            label: 'Zeitraum',
            presets: ['customHourAndDay', 'customTwoDayAndWeek', 'customThreeDayAndWeek',
                'customDayAndWeek_shiftWeek', 'customTwoDayAndWeek_shiftWeek', 'customFourDayAndWeek_shiftWeek', 'monthAndYear', 'customyear']
        },
        '->',
        {
            width: '3em',
            height: '3em',
            color: 'b-gray',
            icon: 'b-fa-sync b-fa-fw',
            onClick: () => {
                generateResources();
            }

        },
        {
            width: '3em',
            height: '3em',
            color: 'b-gray',
            icon: 'b-fa-brush b-fa-fw',
            menu: {
                items: {
                    classic: {
                        text: 'Classic',
                        checked: false,
                        closeParent: true,
                        onItem: () => {
                            import('../../bryntum-schedulerpro-trial/schedulerpro-5.4.0-trial/build/schedulerpro.classic.css',
                                { assert: { type: 'css' } }).then((style) => {
                                    document.adoptedStyleSheets = [style.default];
                                });
                        }
                    },
                    classicLight: {
                        text: 'Classic-Light',
                        checked: false,
                        closeParent: true,
                        onItem: () => {
                            import('../../bryntum-schedulerpro-trial/schedulerpro-5.4.0-trial/build/schedulerpro.classic-light.css',
                                { assert: { type: 'css' } }).then((style) => {
                                    document.adoptedStyleSheets = [style.default];
                                });
                        }
                    },
                    classicDark: {
                        text: 'Classic-Dark',
                        checked: false,
                        closeParent: true,
                        onItem: () => {
                            import('../../bryntum-schedulerpro-trial/schedulerpro-5.4.0-trial/build/schedulerpro.classic-dark.css',
                                { assert: { type: 'css' } }).then((style) => {
                                    document.adoptedStyleSheets = [style.default];
                                });
                        }
                    },
                    material: {
                        text: 'Material',
                        checked: true,
                        closeParent: true,
                        onItem: () => {
                            import('../../bryntum-schedulerpro-trial/schedulerpro-5.4.0-trial/build/schedulerpro.material.css',
                                { assert: { type: 'css' } }).then((style) => {
                                    document.adoptedStyleSheets = [style.default];
                                });
                        }
                    }
                },

                onItem({ source: item }) {
                    const { classic, classicLight, classicDark, material } = item.owner.widgetMap;

                    classic.checked = item.ref === 'classic';
                    classicLight.checked = item.ref === 'classicLight';
                    classicDark.checked = item.ref === 'classicDark';
                    material.checked = item.ref === 'material';
                    scheduler.eventLayout = item.ref;
                }
            },
        },
        {
            width: '3em',
            height: '3em',
            hidden: true,
            color: 'b-gray',
            icon: 'b-fa-hashtag b-fa-fw',
            menu: {
                items: {
                    unvollständig: {
                        type: 'radio',
                        text: 'Unvollständig',
                        checked: true,
                        color: 'b-blue'
                    },
                },
            },
        }

    ],

    presets: [
        {
            id: 'customHourAndDay',
            name: '1 Tag',
            base: 'hourAndDay',
            yoomTo: today,
            start: 0,
            defaultSpan: 23,
            tickWidth: 45,
            headers: [
                {
                    unit: 'day',
                    dateFormat: 'dd Do MMM YYYY',
                    //dateFormat : 'HH'
                },
                {
                    unit: 'hour',
                    dateFormat: 'LT'
                }
            ]
        },
        {
            id: 'customTwoDayAndWeek',
            name: '2 Tage',
            base: 'dayAndWeek',
            defaultSpan: 2,
            mainHeaderLevel: 0,
            tickWidth: 30,
            headers: [
                {
                    unit: 'd',
                    dateFormat: 'dd Do MMM YYYY'
                },
                {
                    unit: 'hour',
                    dateFormat: 'HH'
                }
            ]
        },
        {
            id: 'customThreeDayAndWeek',
            name: '3 Tage',
            base: 'dayAndWeek',
            defaultSpan: 3,
            mainHeaderLevel: 0,
            tickWidth: 25,
            headers: [
                {
                    unit: 'd',
                    dateFormat: 'dd Do MMM YYYY'
                },
                {
                    unit: 'hour',
                    dateFormat: 'HH'
                }
            ]
        },
        {
            id: 'customDayAndWeek_shiftWeek',
            name: '1 Woche',
            base: 'dayAndWeek',
            shiftIncrement: 1,
            shiftUnit: 'day',
            mainHeaderLevel: 0,
            defaultSpan: 1,
            headers: [
                {
                    unit: 'week',
                    renderer: (startDate, endDate) => `Week ${DateHelper.format(startDate, 'WW')}`
                },
                {
                    unit: 'day',
                    dateFormat: 'dd'
                },
                {
                    unit: 'd',
                    dateFormat: 'Do MMM'
                }
            ]
        },
        {
            id: 'customTwoDayAndWeek_shiftWeek',
            name: '2 Wochen',
            base: 'dayAndWeek',
            shiftIncrement: 2,
            shiftUnit: 'day',
            mainHeaderLevel: 0,
            defaultSpan: 2,
            headers: [
                {
                    unit: 'week',
                    renderer: (startDate, endDate) => `Week ${DateHelper.format(startDate, 'WW')}`
                },
                {
                    unit: 'day',
                    dateFormat: 'dd'
                },
                {
                    unit: 'd',
                    dateFormat: 'Do MMM'
                }
            ]
        },
        {
            id: 'customFourDayAndWeek_shiftWeek',
            name: '4 Wochen',
            base: 'dayAndWeek',
            shiftIncrement: 4,
            shiftUnit: 'day',
            mainHeaderLevel: 0,
            defaultSpan: 4,
            headers: [
                {
                    unit: 'week',
                    renderer: (startDate, endDate) => `Week ${DateHelper.format(startDate, 'WW')}`
                },
                {
                    unit: 'day',
                    dateFormat: 'dd'
                },
                {
                    unit: 'd',
                    dateFormat: 'Do MMM'
                }
            ]
        },
        {
            id: 'custommonthAndYear_shiftWeek',
            name: 'Monat',
            base: 'monthAndYear',
            shiftIncrement: 1,
            shiftUnit: 'day',
            mainHeaderLevel: 0,
            defaultSpan: 1,
            headers: [
                {
                    unit: 'd',
                    dateFormat: 'Do MMM'
                }
            ]
        },
        {
            id: 'customyear',
            name: 'Jahr',
            shiftIncrement: 1,
            mainHeaderLevel: 0,
            defaultSpan: 1,
            base: 'year'
        },
        {
            id: 'customyear',
            name: '2 Jahre',
            shiftIncrement: 2,
            mainHeaderLevel: 0,
            defaultSpan: 2,
            base: 'year'
        }
    ],

    startDate: today,
    endDate: DateHelper.add(today, 450, 'days'),

    features: {

        timeRanges: {
            showHeaderElements: true,
            showCurrentTimeLine: true
        },

        eventDrag: {
            constrainDragToTimeSlot: true
        },

        stripe: true,
        sort: 'fzGr',

        scheduleTooltip: false,

        resourceTimeRanges: {
            enableMouseEvents: true
        },
        eventBuffer: {
            tooltipTemplate: ({ duration }) => `<i class="b-icon b-fa-car"></i> Fahrtzeit: ${duration}`
        },

        filterBar: true,

        eventTooltip: {
            width: '28em',
            maxHeight: '38em',
            allowOver: true,

            template: ({ eventRecord }) => `
            <style>
                #info-container {
                    padding-left: 1rem;
                    flex-direction: column;
                    display: flex;
                    flex-direction: row;
                    padding-bottom: 0.2rem;
                    margin: 1px;
                    box-shadow:  1px 1px 1px rgba(0,0,0,1);
                    background-color: #535352;
                    font-size      : 12px;
                }

                #info-container a{
                    color : #fff;
                }

                #elementEins-container {
                    padding-left: 0.1rem;
                    padding-top: 0.2rem;
                    width: 10em;
                    font-weight: bold;
                    font-size      : 13px;                    
                }

                #elementZwei-container {
                    flex-direction: column;
                    padding-right: 0.1rem;
                    padding-top: 0.2rem;
                    max-width: 15em;
                    hyphens: auto;                    
                }
            
            </style>
            
            <div id="hover-container">
            
                <div id="info-container" style="color: #fff;">
                    <div id="elementEins-container">
                        <a>Auftrag:</a>
                    </div>
                    <div id="elementZwei-container">
                        <a>${StringHelper.encodeHtml(eventRecord.aufNr) === null ? '' : StringHelper.encodeHtml(eventRecord.aufNr)}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Kunde:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(eventRecord.kunde) === null ? '' : StringHelper.encodeHtml(eventRecord.kunde)}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>FZ-Gruppe:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(eventRecord.resource.fzGr) === null ? '' : StringHelper.encodeHtml(eventRecord.resource.fzGr)}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Menge:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${Math.round(eventRecord.duration)}</a><br>
                        <a>Preis: ${eventRecord.duration.toFixed(2) * 21}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Datum:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${DateHelper.format(today, 'D MMM YYYY')}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Fahrzeug:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(eventRecord.resource.fzNr) === null ? '' : StringHelper.encodeHtml(eventRecord.resource.fzNr)} 
                        ${StringHelper.encodeHtml(eventRecord.resource.name)}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Fahrer:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(eventRecord.fahrer) === null ? '' : StringHelper.encodeHtml(eventRecord.fahrer)}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Einsatzort:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(eventRecord.einsatzort) === null ? '' : StringHelper.encodeHtml(eventRecord.einsatzort)}</a><br>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Einsatzbeginn:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${DateHelper.format(eventRecord.startDate, 'D MMM YY LT')}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Einsatzende:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${DateHelper.format(eventRecord.endDate, 'D MMM YY LT')}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Status:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(statusStringArr[eventRecord.statusHelper])}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Sachbearbeiter:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(eventRecord.sachbearbeiter) === null ? '' : StringHelper.encodeHtml(eventRecord.sachbearbeiter)}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>PosNr:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(eventRecord.posNr) === null ? '' : StringHelper.encodeHtml(eventRecord.posNr)}</a>
                    </div>
                </div>
                <div id="info-container" style="">
                    <div id="elementEins-container" style="">
                        <a>Stichwort:</a>
                    </div>
                    <div id="elementZwei-container" style="">
                        <a>${StringHelper.encodeHtml(eventRecord.resource.fzGr) === null ? '' : StringHelper.encodeHtml(eventRecord.resource.fzGr)}/0,00/</a>
                    </div>
                </div>            
            </div>
           `
        },

    },

    columns: [
        {
            text: 'Nr',
            field: 'nr',

            width: 5,
            filterable: false
        },
        {
            text: 'FZ Gruppe',
            field: 'fzGr',
            width: 120,
            filterable: {
                filterField: {
                    triggers: {
                        search: {
                            cls: 'b-icon b-fa-search'
                        }
                    },
                    placeholder: 'Suchen'
                }
            }
        },
        {
            text: 'FZ Nummer',
            field: 'fzNr',

            width: 100,
            filterable: {
                filterField: {
                    triggers: {
                        search: {
                            cls: 'b-icon b-fa-search'
                        }
                    },
                    placeholder: 'Suchen'
                }
            }
        },
        {
            text: 'Name',
            field: 'name',
            width: 200,

            hidden: true,
            filterable: {
                filterField: {
                    triggers: {
                        search: {
                            cls: 'b-icon b-fa-search'
                        }
                    },
                    placeholder: 'Suchen'
                }
            },
        },
        {
            text: 'Seriennummer',
            field: 'SerNr',
            width: 100,

            hidden: true,
            filterable: {
                filterField: {
                    triggers: {
                        search: {
                            cls: 'b-icon b-fa-search'
                        }
                    },
                    placeholder: 'Suchen'
                }
            },
        },
        {
            text: 'Fahrer',
            field: 'fahrer',
            width: 100,

            hidden: true,
            filterable: {
                filterField: {
                    triggers: {
                        search: {
                            cls: 'b-icon b-fa-search'
                        }
                    },
                    placeholder: 'Suchen'
                }
            },
        }
    ],

    eventRenderer({ eventRecord, renderData }) {
        renderData.style = 'font-weight: 900; border-radius: 12px; box-shadow:  2px 2px 2px rgba(0,0,0,1);';
        return eventRecord.name;
    },

    responsiveLevels: {
        small: 800,
        medium: 1000,
        normal: '*'
    },
});

new Splitter({
    appendTo: 'plantafel-container'
});

async function unplannedEvent() {

    const fs = require('fs');

    const
        unplannedEventArr = [];

    i = 0;
    do {

        unplannedEventArr.push({
            id: unplanned[i].id,
            name: unplanned[i].name,
            duration: unplanned[i].duration,
            durationUnit: unplanned[i].durationUnit,
            note: unplanned[i].note
        });

        if (ressoArr.length % 2000 === 0) {
            mask.text = `Generated ${ressoArr.length * eventCount} of ${resourceCount * eventCount} records`;

            await AsyncHelper.animationFrame();
        }
        i++;

    } while (unplanned[i]);

    console.timeEnd('generate');
    console.log("Events:" + i);
    mask.text = "Loading data";

    // Give the UI a chance to catch up, to update the mask before proceeding
    await AsyncHelper.sleep(100);
    console.time('data');

    fs.writeFile('/Resource/pufferUnplanned.json', JSON.stringify(unplannedEventArr, null, 2), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    console.timeEnd('data');
}


const unplannedGrid = new UnplannedGrid({
    ref: 'unplanned',
    appendTo: 'plantafel-container',
    title: 'Ungeplante Aufträge',
    collapsible: true,
    flex: '0 0 300px',
    ui: 'toolbar',
    cls: 'ungrid',
    store: {
        modelClass: Task,
        reapplySortersOnAdd: true,
        readUrl: 'Resource/unplanned.json',
        autoLoad: true
    }

    // Schedulers stores are contained by a project, pass it to the grid to allow it to access them
    //project : schedule.project,

});


const drag = new Drag({
    grid: unplannedGrid,
    schedule: scheduler,
    constrain: false,
    outerElement: unplannedGrid.element
});


generateResources();