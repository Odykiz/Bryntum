const
    emailAddresses = new Store({
        data : [
            { id : 10, name : 'Mike McGregor',    email : 'mike@facebook.com' },
            { id : 11, name : 'Linda Ewans',      email : 'l.evans@orange.com' },
            { id : 12, name : 'Don Scott',        email : 'd.scott@me.com' },
            { id : 13, name : 'Karen Smith',      email : 'karen.smith@oracle.com' },
            { id : 14, name : 'Doug Johnson',     email : 'doug.johnson@nhs.co.uk' },
            { id : 15, name : 'Jenny Adams',      email : 'jenny@theblock.com' },
            { id : 16, name : 'Daniel Williams',  email : 'dwilliams01@bofa.com' },
            { id : 17, name : 'Melissa Brown',    email : 'mel@parrot.com' },
            { id : 18, name : 'John Jones',       email : 'jjones@brynrtum.com' },
            { id : 19, name : 'Jane Miller',      email : 'jmiller@example.com' },
            { id : 20, name : 'Theo Davis',       email : 'tdavis@synergex.com' },
            { id : 21, name : 'Lisa More',        email : 'lisa.more@twitter.com' },
            { id : 22, name : 'Adam Wilson',      email : 'adam.wilson@wilson.com' },
            { id : 23, name : 'Mary Taylor',      email : 'mtaylor@apple.com' },
            { id : 24, name : 'Barbara Anderson', email : 'eanderson@google.com' },
            { id : 25, name : 'James Thomas',     email : 'james.thomas@facebook.com' },
            { id : 26, name : 'David Jackson',    email : 'djackson@twitter.com' }
        ]
    }),
    comboConfig = {
        type         : 'combo',
        label        : 'To',
        multiSelect  : true,
        store        : emailAddresses,
        displayField : 'name',
        chipView     : {
            tooltip : {
                cls         : 'b-recipient-card',
                newInstance : true,
                forSelector : '.b-chip',
                getHtml     : 'up.emailChipTooltip'
            }
        }
    };

new Panel({
    appendTo : targetElement,
    title    : 'Compose',
    height   : 700,
    items    : {
        // Three almost identical Combos
        to  : { ...comboConfig, required : true },
        cc  : { ...comboConfig, label : 'CC' },
        bcc : { ...comboConfig, label : 'BCC' },

        // A text field for the subject
        subject : {
            type    : 'textfield',
            label   : 'Subject',
            onInput : 'up.onSubjectInput'
        },

        // And the body textaera
        body : {
            type     : 'textarea',
            required : true
        }
    },

    bbar : {
        items : {
            send : {
                text    : 'Send',
                onClick : 'up.onSendClick'
            }
        }
    },

    onSendClick() {
        this.items.forEach(i => i.syncInvalid());
        if (!this.items.every(i => i.isValid)) {
            Toast.show('Please complete the mandatory fields');
        }
        else {
            MessageDialog.alert({
                title   : 'Email system',
                message : 'Sent'
            });
        }
    },

    onSubjectInput({ value }) {
        this.title = value || 'Subject';
    },

    emailChipTooltip({ tip, activeTarget }) {
        const person = tip.owner.getRecordFromElement(activeTarget);

        return {
            children : [{
                className : 'b-recipient-card-name',
                text      : person.name
            }, {
                className : 'b-recipient-card-email',
                text      : person.email
            }]
        };
    }
});
