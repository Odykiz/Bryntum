
StartTest(async t => {

    await t.waitForSelector('.maploaded');

    const
        schedulerPro = bryntum.query('schedule'),
        mapPanel     = bryntum.query('mappanel');

    window.AjaxHelper = AjaxHelper;

    t.beforeEach(() => {
        mapPanel.map.setCenter([mapPanel.lon, mapPanel.lat]);
    });

    const searchResponse = [
        {
            place_id     : 235620763,
            licence      : 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
            osm_type     : 'relation',
            osm_id       : 1543125,
            boundingbox  : ['20.2145811', '35.8984245', '135.8536855', '154.205541'],
            lat          : '35.6828387',
            lon          : '139.7594549',
            display_name : 'Tokyo, Japan',
            class        : 'boundary',
            type         : 'administrative'
        }, {
            place_id     : 75096810,
            licence      : 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
            osm_type     : 'node',
            osm_id       : 6397207541,
            boundingbox  : ['35.6770996', '35.6870996', '139.7605792', '139.7705792'],
            lat          : '35.6820996',
            lon          : '139.7655792',
            display_name : 'Tōkyō, Tokyo, 1-chome, Marunouchi, Chiyoda, 100-0005, Japan',
            class        : 'railway',
            type         : 'station'
        }, {
            place_id     : 21025706,
            licence      : 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
            osm_type     : 'node',
            osm_id       : 2149761647,
            boundingbox  : ['35.6760912', '35.6860912', '139.7621861', '139.7721861'],
            lat          : '35.6810912',
            lon          : '139.7671861',
            display_name : 'Tōkyō, Keiyo Street, 1-chome, Marunouchi, Chiyoda, 100-0005, Japan',
            class        : 'railway',
            type         : 'station'
        }, {
            place_id     : 72627398,
            licence      : 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
            osm_type     : 'node',
            osm_id       : 6396868334,
            boundingbox  : ['35.6727691', '35.6827691', '139.7596365', '139.7696365'],
            lat          : '35.6777691',
            lon          : '139.7646365',
            display_name : 'Tōkyō, Kajibashi-dori, 2-chome, Marunouchi, Chiyoda, 100-0005, Japan',
            class        : 'railway',
            type         : 'station'
        }
    ];

    AjaxHelper.mockUrl('https://nominatim.openstreetmap.org/search/tokyo', url => {
        return {
            responseText : JSON.stringify({
                success : true,
                data    : searchResponse
            })
        };
    });

    t.it('Should find tasks + markers rendered', async t => {
        await t.waitForSelector('.b-sch-event');
        await t.waitForSelector('.mapboxgl-marker');

        t.selectorCountIs('.b-sch-event', 7, 'Task elements found');
        t.selectorCountIs('.mapboxgl-marker', 7, 'Map markers found');
        t.pass('No crash');
    });

    t.it('Should not crash after task editor is hidden', t => {
        t.chain(
            { doubleClick : '.b-sch-event' },
            { type : '[ESCAPE]' }
        );
    });

    t.it('Should be possible to edit address', async t => {
        t.chain(
            { doubleClick : '.b-sch-event' },
            { click : '.b-addresssearchfield input' },
            async() => window.foo = 1,

            { type : 'tokyo[ENTER]', clearExisting : true },

            next => {
                t.is(bryntum.query('addresssearchfield').input.value, 'tokyo');
                next();
            },

            { click : '.b-list-item:contains(Tokyo)' },
            { click : '.b-button:contains(Save)' },

            { waitForSelector : '.b-sch-event:contains(Tokyo)' }
        );
    });

    // https://github.com/bryntum/support/issues/4156
    t.it('Should not crash after changing resource', async t => {
        await t.dragBy({
            source : '.b-sch-event:contains(Drain flooded)',
            delta  : [0, -schedulerPro.rowHeight]
        });

        await t.doubleClick('.b-sch-event:contains(Drain flooded)');
        await t.click('[data-ref="resourcesField"] .b-icon-picker');
        await t.click('.b-list-item:contains(Linda)');
        await t.type(null, '[ESCAPE]');
    });

    t.it('Should show time field with correct time format', async t => {
        await t.doubleClick('.b-sch-event');

        await t.waitForSelector('.b-schedulertaskeditor');

        t.is(t.query('#b-timefield-1-input')[0].value, '8:00 AM');

        await t.click('.b-icon-clock-live');
        await t.waitForSelector('.b-timepicker.b-content-element');

        t.is(parseInt(t.query('[data-ref=hour] input')[0].value, 10), 8);
        await t.click('.b-button:contains(Cancel)');
    });

    t.it('Should not crash if a task has no lat / lon', t => {
        t.firesOnce(schedulerPro.eventStore, 'add');

        t.chain(
            { doubleClick : '.b-grid-row[data-index="2"] .b-sch-timeaxis-cell', offset : [20, 20] },
            { type : 'foo' },
            { click : '.b-button:contains(Save)' },
            async() => {
                await schedulerPro.project.commitAsync();

                schedulerPro.project.eventStore.last.remove();
            }
        );
    });

    t.it('Should update marker color after drag drop', async t => {
        const blueEventsBeforeDrop = t.query(schedulerPro.unreleasedEventSelector + ' [style*="background-color: rgb(49, 131, 254);"] .b-fa-map-marker-alt').length;

        await t.dragBy('.b-sch-event:contains(Covid)', [0, -300]);
        await t.waitForSelectorNotFound('.mapboxgl-marker [fill="#a0a0a0"]');

        t.selectorCountIs('.mapboxgl-marker [fill="#3183fe"]', blueEventsBeforeDrop + 1); // 1 more blue task after this drop

        // Drag back for further tests to pass
        await t.dragBy('.b-sch-event:contains(Covid)', [0, 300]);
    });

    t.it('Should update markers after filtering', async t => {
        await schedulerPro.timeAxisSubGrid.scrollable.scrollTo(0, 0, false);

        await t.click('[data-ref=filterByName]');
        await t.type(null, 'tunn');

        await t.waitForSelectorNotFound(`${schedulerPro.unreleasedEventSelector}:contains(Bridge)`);

        await t.click('[data-ref=filterByName] .b-icon-remove');
        await t.waitForSelector(`${schedulerPro.unreleasedEventSelector}:contains(Bridge)`);
    });

    t.it('Should only show markers for viewed date range', async t => {
        const checkEvents = async() => {
            const
                eventsInRange = schedulerPro.eventStore.getEvents({
                    startDate : schedulerPro.startDate,
                    endDate   : schedulerPro.endDate
                }),
                withAddress   = eventsInRange.filter(task => task.address.display_name);

            await t.waitForSelectorCount(schedulerPro.unreleasedEventSelector, eventsInRange.length).then(() =>
                t.pass(`${eventsInRange.length} Task elements found`));

            await t.waitForSelectorCount('.mapboxgl-marker', withAddress.length).then(() =>
                t.pass(`${withAddress.length} Map markers found`));
        };

        await t.click('.b-icon-angle-left');
        await checkEvents();

        await t.click('.b-icon-angle-right');
        await checkEvents();

        await t.click('.b-icon-angle-right');
        await checkEvents();

        await t.click('.b-icon-angle-left');
        await checkEvents();
    });

    t.it('Should add new event on button click', async t => {
        await schedulerPro.timeAxisSubGrid.scrollable.scrollTo(0, 0, false);

        await t.click('.b-button:contains(New event)');
        await t.type(null, 'Mapilicious');

        await t.click('.b-addresssearchfield');

        await t.type(null, 'tokyo[ENTER]');
        await t.click('.b-list-item:contains(Tokyo)');

        await t.click('.b-resources');
        await t.type(null, 'Chan');
        await t.click('.b-list-item:contains(Chang)');

        await t.click('.b-button:contains(Save)');

        await t.waitForSelector('.b-sch-event:contains(Mapilicious):contains(Tokyo)');
    });

    t.it('Should zoom on zoom controls click', async t => {
        const initialZoom = mapPanel.map.getZoom();

        await t.click('.b-mappanel .b-fa-plus');
        await t.waitFor(() => mapPanel.map.getZoom() === initialZoom + 1);

        t.pass('Zoomed in');

        await t.click('.b-mappanel .b-fa-minus');
        await t.waitFor(() => mapPanel.map.getZoom() === initialZoom);

        t.pass('Zoomed out');
    });

    t.it('Should scroll event into view when clicking marker', async t => {
        await schedulerPro.timeAxisSubGrid.scrollable.scrollTo(0, 0, false);

        await t.click('.widget-title'); // hide hints
        await t.click('#6');

        await t.waitForAnimations();

        await t.waitForElementTop('[data-event-id="6"]');
        t.pass('Event scrolled into in view');
        t.ok(schedulerPro.timeAxisSubGrid.scrollable.y > 0, 'Scheduler scrolled');
    });

    t.it('Should scroll map marker into view when clicking event', async t => {
        await schedulerPro.scrollRowIntoView(schedulerPro.resourceStore.first);

        await t.waitForSelector('[id="1"]');
        t.pass('First event map marker in view');

        schedulerPro.eventStore.first.address = {
            lat          : '35.6828387',
            lon          : '139.7594549',
            display_name : 'Tokyo, Japan'
        };

        await t.waitForElementNotTop('[id="1"]');

        await t.click(schedulerPro.unreleasedEventSelector + ':contains(Bridge repair)');

        await t.waitForSelector('[id="1"]');
        t.pass('Map marker scrolled into in view');

        await t.waitForSelector('.mapboxgl-popup:contains(Bridge repair):contains(Tokyo)');
        await t.waitForSelector('.mapboxgl-popup:contains(Bridge repair):contains(Tokyo) .event-name');
        await t.waitForElementNotTop('.mapboxgl-popup:contains(Bridge repair):contains(Tokyo) .event-name');

        await t.click({
            el     : '.mapboxgl-canvas',
            offset : [10, 10]
        });
        t.waitForSelectorNotFound('.mapboxgl-popup:contains(Bridge repair):contains(Tokyo)');
        t.pass('Tooltip is hidden when clicking map');
    });

    t.it('Should remove marker when event is removed', async t => {
        schedulerPro.eventStore.remove(schedulerPro.eventStore.getById(2));
        await t.waitForSelectorNotFound('[id="2"]');
    });

    t.it('Should handle removing a resource', async t => {
        schedulerPro.resourceStore.remove(schedulerPro.resourceStore.getById(1));
        await t.waitForSelector('.mapboxgl-marker [fill="#f0f0f0"]'); // unassigned markers get 'f0f0f0' color
    });

    t.it('Should remove marker when clearing the event address', async t => {
        await t.doubleClick('.b-sch-event:contains(Drain)');
        await t.click('.b-addresssearchfield .b-fieldtrigger');
        await t.click('.b-button:contains(Save)');

        await t.waitForSelectorNotFound('[id="4"]');
    });

    t.it('Should scroll marker into view after updating event address', async t => {
        await schedulerPro.scrollEventIntoView(schedulerPro.eventStore.getById(5));
        await t.doubleClick('.b-sch-event:contains(coffee)');
        await t.click('.b-addresssearchfield');
        await t.type(null, 'tokyo[ENTER]', null, null, null, true);
        await t.click('.b-list-item:contains(Tokyo)');

        t.selectorExists('.b-sch-event:contains(coffee):contains(Tokyo)');

        await t.click('.b-button:contains(Save)');

        t.selectorExists('.b-sch-event:contains(coffee):contains(Tokyo)');

        await t.waitForSelector('.mapboxgl-marker[id="5"]');

        await t.waitForElementNotTop('.mapboxgl-marker[id="6"]');
        t.pass('Other markers not in view');
    });

    t.it('Should no throw errors on double click button to show editor', async t => {
        await t.doubleClick('.b-button:contains(New event)');
        t.pass('No errors');
    });

});
