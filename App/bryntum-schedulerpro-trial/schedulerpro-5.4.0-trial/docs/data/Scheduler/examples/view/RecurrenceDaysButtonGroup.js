const button = new RecurrenceDaysButtonGroup({
    label    : 'Choose days',
    appendTo : targetElement,
    onAction() {
        Toast.show(`You selected ${this.value || 'no days'}`);
    }
});
