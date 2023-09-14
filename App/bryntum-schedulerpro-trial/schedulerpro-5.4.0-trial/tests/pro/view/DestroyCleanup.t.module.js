
StartTest(t => {

    let schedulerPro;

    t.beforeEach(() => {
        schedulerPro?.destroy();
    });

    t.it('Should not crash when destroying and recreating the Scheduler', async t => {
        const resources = [
            {
                id       : '1',
                name     : 'asdfasdf',
                expanded : false,
                children : [
                    {
                        id   : '1-1',
                        name : 'asdfasdf'
                    }
                ]
            }
        ];

        const events = [
            {
                id         : '1',
                resourceId : '1',
                name       : '',
                startDate  : '2020-11-30 00:00',
                endDate    : '2020-12-11 00:00',
                draggable  : false
            }
        ];

        const conf = {
            events,
            appendTo : document.body
        };

        schedulerPro = new SchedulerPro(conf);

        await schedulerPro.project.commitAsync();

        schedulerPro.resourceStore.relayAll(schedulerPro, 'resources');
        schedulerPro.eventStore.relayAll(schedulerPro, 'events');

        schedulerPro.resourceStore.add(resources);
        schedulerPro.events = events;

        schedulerPro.destroy();

        schedulerPro = new SchedulerPro(conf);

        schedulerPro.destroy();
    });
});
