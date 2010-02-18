Better Event Delegation
===========

This extension is a fresh look at event delegation, taking into consideration limitations of the current MooTools event delegation approach.

![Screenshot](http://www.sixtyseconds.co.za/playground/eventdelegation/screen.png)

How to use
----------

    window.addEvent('domready', function() {
                
        var first_event = function(e)
            {
                console.log('first clicked!');
            },
            second_event = function(e)
            {
                console.log('second clicked!');
                document.body.denyEvent('click', 'li.second', second_event);
            },
            third_event = function(e)
            {
                console.log('third clicked!');
                document.body.denyEvents('mouseover', 'li.third');
            };
        
        document.body.delegateEvents({
            'click': {
                'li.first': first_event,
                'li.second': second_event,
                'li.third': third_event
            },
            'mouseover': {
                'li.first': function(e) {
                    console.log('first hovered!');
                },
                'li.second': function(e) {
                    console.log('second hovered!');
                },
                'li.third': function(e) {
                    console.log('third hovered!');
                }
            }
        });
        
        document.body.delegateEvent('click', {
            'li.first': function(e)
            {
                console.log('second delegate on first item!');
            }
        });
        
        document.body.delegateEvent('mouseover', {
            'li.third': function(e)
            {
                console.log('second delegate on third item!');
            }
        });
    });
	
This code illustrates how to add event delegates to mulitple elements with a single event. The second call to document.body.delegateEvent doesn't attach a new click event but simply adds the event delegates to the current list. You can also use delegateEvents() to setup delegates for mulitple event types at the same time. The syntax is also a lot less ambiguous than the current :relay pseudo-selector.

Please note, however, that due to current limitations in Element.match (MooTools 1.2.4) element decendency is not taken into account so you will need to be specific with id's/classes because 'ul#main > li a' is not properly handled with Element.match. This should be fixed in MooTools 2.