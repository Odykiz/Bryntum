const project = new ProjectModel({
    startDate : new Date(2020, 0, 1)
});

const startDateField = new StartDateField({
    label    : 'Choose start date',
    appendTo : targetElement,
    project
});
