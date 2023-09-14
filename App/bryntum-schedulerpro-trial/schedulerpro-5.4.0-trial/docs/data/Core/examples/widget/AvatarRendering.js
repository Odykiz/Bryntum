const avatarRendering = new AvatarRendering({
    element : targetElement
});

class Resource extends Model {
    static fields = [
        'name',
        'imageUrl'
    ];

    get initials() {
        return this.name?.split(' ').map(part => part[0]).join('') || '';
    }
}

const
    person  = new Resource({
        name : 'Johnny Rocker'
    }),
    person2 = new Resource({
        name : 'Babe Ruth'
    });

DomHelper.createElement({
    parent   : targetElement,
    class    : 'b-resource-info',
    style    : 'margin-inline-end:1em',
    children : [avatarRendering.getResourceAvatar(person)]
});

DomHelper.createElement({
    parent   : targetElement,
    class    : 'b-resource-info',
    children : [avatarRendering.getResourceAvatar(person2)]
});
