Better Event Delegation
===========

This extension is a fresh look at event delegation, taking into consideration limitations of the current MooTools event delegation approach.

![Screenshot](http://www.sixtyseconds.co.za/playground/eventdelegation/screen.png)

How to use
----------

    document.body.delegateEvent('click', {
		'.link': function(e)
		{
			console.log('clicked .link element');
		},		
		'img': function(e)
		{
			console.log('clicked image element');
		}
    });

    document.body.delegateEvent('click', {
		'submit': function(e)
		{
			console.log('clicked submit element');
		}
    });
    
    document.body.delegateEvents({
        'click': {
            'li.first': function(e) {
                console.log('first clicked!');
            },
            'li.second': function(e) {
                console.log('second clicked!');
            }
        },
        'mouseover': {
            'li.first': function(e) {
                console.log('first hovered!');
            },
            'li.second': function(e) {
                console.log('second hovered!');
            }
        }
    });
	
This code illustrates how to add event delegates to mulitple elements with a single event. The second call to document.body.delegateEvent doesn't attach a new click event but simply adds the event delegates to the current list. You can also use delegateEvents() to setup delegates for mulitple event types at the same time. The syntax is also a lot less ambiguous than the current :relay pseudo-selector.

Please note, however, that due to current limitations in Element.match (MooTools 1.2.4) element decendency is not taken into account so you will need to be specific with id's/classes because 'ul#main > li a' is not properly handled with Element.match. This should be fixed in MooTools 2.