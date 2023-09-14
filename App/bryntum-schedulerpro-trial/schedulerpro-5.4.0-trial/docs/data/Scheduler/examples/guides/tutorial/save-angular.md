// --- app.component.scss ---
@import "@bryntum/scheduler/scheduler.material.css";

body {
    font-family: sans-serif;
    font-size: 14px;
}

// --- app.component.html
<bryntum-scheduler
  [width]="800"
  [height]="600"
  startDate="2023-04-16"
  endDate="2023-05-15"
  [crudManager]="crudManagerConfig"
></bryntum-scheduler>

// --- app.component.ts
import { Component, ViewEncapsulation } from '@angular/core';
import { CrudManager } from '@bryntum/scheduler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular-tutorial';

  changesHandler = ({ source } : { source : CrudManager }) => {
    const { changes } = source;

    // In a real app you would send the changes to the server here.
    console.log(changes);

    // Then you would call `source.acceptChanges()` to clear local changes
    source.acceptChanges();
  }

  crudManagerConfig = {
    loadUrl   : 'assets/data.json',
    autoLoad  : true,
    listeners : {
      hasChanges: this.changesHandler
    }
  };
}


<p class="last-modified">Last modified on 2023-06-30 9:53:47</p>