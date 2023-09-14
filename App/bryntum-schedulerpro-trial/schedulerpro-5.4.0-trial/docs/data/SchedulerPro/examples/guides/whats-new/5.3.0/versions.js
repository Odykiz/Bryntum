const scheduler = new SchedulerPro({
    enableUndoRedoKeys : true,
    flex               : 2,

    project : {

        resourcesData : [
            { id : 1, name : 'Resource 1' },
            { id : 2, name : 'Resource 2' },
            { id : 3, name : 'Resource 3' }
        ],

        autoHeight : true,

        eventsData : [
            {
                id         : 11,
                name       : 'Design website',
                startDate  : new Date(2022, 10, 7),
                duration   : 5,
                resourceId : 1
            },
            {
                id         : 12,
                name       : 'Lease office space',
                startDate  : new Date(2022, 10, 9),
                duration   : 4,
                resourceId : 1
            },
            {
                id         : 13,
                name       : 'Buy coffee machine',
                startDate  : new Date(2022, 10, 13),
                duration   : 3,
                resourceId : 3
            },
            {
                id         : 14,
                name       : 'Hire designer',
                startDate  : new Date(2022, 10, 17),
                duration   : 3,
                resourceId : 2
            },
            {
                id         : 15,
                name       : 'Write design handbook',
                startDate  : new Date(2022, 10, 27),
                duration   : 3,
                resourceId : 2
            }
        ],

        // dependenciesData : [
        //     {
        //         id       : 1,
        //         fromTask : 11,
        //         toTask   : 12
        //     },
        //     {
        //         id       : 2,
        //         fromTask : 13,
        //         toTask   : 14
        //     },
        //     {
        //         id       : 3,
        //         fromTask : 14,
        //         toTask   : 15
        //     }
        // ],
        stm : {
            autoRecord : true
        }
    },

    columns : [
        { field : 'name', text : 'Name', width : 250 },
        { field : 'startDate', text : 'Start date' },
        { field : 'duration', text : 'Duration' }
    ],

    subGridConfigs : {
        locked : {
            width : 300
        }
    },

    features : {
        versions       : true,
        dependencies   : true,
        dependencyEdit : true
    },

    listeners : {
        /**
         * Demonstrates overriding the default transaction description to provide more detail
         * about which user action initiated the transaction. In this case, we set a custom
         * description for transactions involving a task drag event.
         */
        taskDrop({ taskRecords }) {
            this.features.versions.transactionDescription = taskRecords.length === 1
                ? `Dragged task ${taskRecords[0].name}` : `Dragged ${taskRecords.length} tasks`;
        },

        taskResizeEnd({ taskRecord }) {
            this.features.versions.transactionDescription = `Resized task ${taskRecord.name}`;
        },

        afterDependencyCreateDrop() {
            this.features.versions.transactionDescription = `Drew a link`;
        }
    }
});

const app = new Container({
    appendTo : targetElement,

    layout : 'box',
    height : 600,

    items : {
        scheduler,
        splitter    : { type : 'splitter' },
        versionGrid : {
            type                       : 'versiongrid',
            flex                       : 1,
            emptyText                  : 'No versions to display',
            project                    : scheduler.project,
            showUnattachedTransactions : true,
            selectionMode              : {
                row  : true,
                cell : false
            },
            features : {
                cellMenu : {
                    /**
                     * Add a button to the version row context menu.
                     */
                    items : {
                        compareButton   : undefined,
                        duplicateButton : {
                            text   : 'Duplicate',
                            icon   : 'b-fa b-fa-copy',
                            onItem : async({ record, source : grid }) => {
                                const result = await MessageDialog.confirm({
                                    title   : 'Duplicate Version?',
                                    message : `This will create a new project from the content of the selected version.
                                        Do you want to continue?`
                                });
                                if (result === MessageDialog.yesButton) {
                                    // Sample code demonstrating cloning a saved version
                                    await scheduler.features.versions.getVersionContent(record.versionModel);
                                    const clonedProject = new ProjectModel(record.versionModel.content);
                                    scheduler.project = clonedProject;
                                }
                            }
                        }
                    }
                }
            },
            dateFormat : 'M/D/YY h:mm a',
            tbar       : {
                items : [
                    {
                        ref       : 'saveButton',
                        text      : 'Save Version',
                        icon      : 'b-fa b-fa-plus',
                        listeners : {
                            click : () => {
                                scheduler.features.versions.saveVersion();
                            }
                        }
                    },
                    '->',
                    {
                        ref       : 'onlyNamedToggle',
                        type      : 'slidetoggle',
                        text      : 'Show named versions only',
                        listeners : {
                            change : ({ checked }) => {
                                app.widgetMap.versionGrid.showNamedVersionsOnly = checked;
                            }
                        }
                    },
                    {
                        ref       : 'showVersionsToggle',
                        type      : 'slidetoggle',
                        text      : 'Changes only',
                        checked   : false,
                        listeners : {
                            change : ({ checked }) => {
                                app.widgetMap.versionGrid.showVersions = !checked;
                            }
                        }
                    }
                ]
            },

            listeners : {
                // Handle the user asking to restore a given version
                restore : async({ version }) => {
                    const result = await MessageDialog.confirm({
                        title   : 'Restore Version?',
                        message : `Are you sure you want to restore the selected version, replacing the
                            current project? You will lose any unsaved changes.`
                    });
                    if (result === MessageDialog.yesButton) {
                        await gantt.features.versions.restoreVersion(version);
                        gantt.features.baselines.disabled = true;
                        // FIXME known issue with Undo after restoring version
                        project.stm.resetQueue();
                    }
                }
            }
        }
    }
});

scheduler.project.stm.enable();
