CSSHelper.insertRule('#my-list { display:grid; gap:1em; background:transparent;}');
CSSHelper.insertRule('#my-list .b-list-item { padding:1em;background:#eee;border-radius:1em; }');

new List({
    id       : 'my-list',
    width    : 200,
    appendTo : targetElement,
    itemTpl  : item => `${item.text}`,
    items    : [{
        id   : 1,
        text : 'Eggs'
    }, {
        id   : 2,
        text : 'Beef'
    }, {
        id   : 3,
        text : 'Bread'
    }, {
        id   : 4,
        text : 'Cucumber'
    }, {
        id   : 5,
        text : 'Juice'
    }, {
        id   : 6,
        text : 'Tomatoes'
    }, {
        id   : 7,
        text : 'Bacon'
    }],
    onItem({ record }) {
        Toast.show('You clicked ' + record.text);
    }
});
