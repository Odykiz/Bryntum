// --- app.component.scss ---
@import "@bryntum/scheduler/scheduler.material.css";

body {
    font-family: sans-serif;
    font-size: 14px;
}

// --- app.component.html
<bryntum-scheduler
  #scheduler
  [width]="800"
  [height]="600"
  startDate="2023-04-16"
  endDate="2023-05-15"
  [crudManager]="crudManagerConfig"
  [columns]="columnsConfig"
  [stripeFeature]="true"
  [viewPreset]="viewPresetConfig"
></bryntum-scheduler>

// --- app.component.ts
import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { BryntumSchedulerComponent } from '@bryntum/scheduler-angular';
import { CrudManager, EventModel, Scheduler, Toast } from '@bryntum/scheduler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  title = 'angular-tutorial';

  @ViewChild('scheduler') schedulerComponent! : BryntumSchedulerComponent;
  private scheduler! : Scheduler;

  ngAfterViewInit(): void {
    this.scheduler = this.schedulerComponent.instance;
    this.scheduler.on({
      beforeEventEdit:this.beforeEventEditHandler
    });
  };

  beforeEventEditHandler({ eventRecord } : { eventRecord : EventModel }) : void {
    Toast.show(`Editing ${eventRecord.name}`);
  };

  changesHandler = ({ source } : { source : CrudManager }) => {
    const { changes } = source;

    // In a real app you would send the changes to the server here.
    console.log(changes);

    // Then you would call `source.acceptChanges()` to clear local changes
    source.acceptChanges();
  };

  eventClickHandler(event : { eventRecord? : EventModel }) : void {
    const { eventRecord } = event;
    Toast.show(`Clicked ${eventRecord!.name}`)
  };

  crudManagerConfig = {
    loadUrl   : 'assets/data.json',
    autoLoad  : true,
    listeners : {
      hasChanges: this.changesHandler
    }
  };

  columnsConfig = [
    {
        field : 'name',
        text  : 'Name'
    },
    {
        field : 'role',
        text  : 'Role'
    }
  ];

  viewPresetConfig = {
    base : 'weekAndDayLetter',

    // Customize the header
    headers : [
       // Week 16 ... on the top level
       {
         unit       : 'week',
         dateFormat : 'Wp'
       },
       // M, T, W ... on the bottom level
       {
         unit       : 'day',
         dateFormat : 'd1'
       }
    ]
  };
}



<p class="last-modified">Last modified on 2023-06-30 9:53:47</p>