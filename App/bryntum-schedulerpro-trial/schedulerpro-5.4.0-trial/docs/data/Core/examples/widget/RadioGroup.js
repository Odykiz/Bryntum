new RadioGroup({
    appendTo : targetElement,
    name     : 'resolution',
    title    : 'Resolve Conflict',
    value    : 'A',  // the default choice
    options  : {
        A : 'Keep the original version',
        B : 'Use the new version',
        C : 'Reconcile individual conflicts'
    }
});
