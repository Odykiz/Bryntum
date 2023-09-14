const project = new ProjectModel({
    startDate : new Date(2020, 0, 1)
});

const endDateField = new EndDateField({
    label    : 'Choose end date',
    appendTo : targetElement,
    project
});
