/*
---
description: Better event delegation for MooTools.

license: MIT-style

authors:
- Christopher Pitt
- Arieh Glazer

requires:
- core/1.2.4: Element.Event
- core/1.2.4: Selectors

provides: [Element.delegateEvent, Element.delegateEvents, Element.denyEvent, Element.denyEvents]

...
*/

Element.implement({
	'delegateEvent': function(type, delegates, prevent, propagate)
	{	
		//get stored delegates
		var key = type + '-delegates',
			stored = this.retrieve(key) || false,
			parent = this;
		// if stored delegates; extend with
		// new delegates and return self.
		if (stored){
            Hash.each(delegates, function(fn, selector) {
                if (stored[selector])
                {
                    stored[selector].push(fn);
                }
                else
                {
                    stored[selector] = [fn];
                }
            });
            
            return this;
		}
		else
		{
			stored = new Hash();
            Hash.each(delegates, function(fn, selector) {
                stored[selector] = [fn];
            });
			this.store(key, stored);
		}
		
		return this.addEvent(type, function(e)
		{
			// Get target and set defaults
			var target = document.id(e.target),
				prevent = prevent || true,
				propagate = propagate || false
				stored = this.retrieve(key),
                args = arguments;
			
			// Cycle through rules
            Hash.each(stored, function(delegates, selector){
				var match = selector.test(/[+>\s]/) 
							? parent.getElements(selector).contains(target)
							: target.match(selector);
				
				if (match){
					if (prevent) e.preventDefault();
					if (!propagate) e.stopPropagation();
 
					Array.each(delegates, function(fn) {
						if (fn.apply) fn.apply(target, args);
					});
				}
			});
            
            return this;
		});		
	},
    
    'delegateEvents': function(delegates, prevent, propagate)
    {
        for (key in delegates)
        {
            this.delegateEvent(key, delegates[key], prevent, propagate);
        }
        
        return this;
    },
    
    'denyEvent': function(type, selector, fn)
    {
        var key = type + '-delegates',
            stored = this.retrieve(key) || false;
            
        if (stored && stored[selector])
        {
            stored[selector].erase(fn);
        }
        
        return this;
    },
    
    'denyEvents': function(type, selector)
    {
        var key = type + '-delegates',
            stored = this.retrieve(key) || false;    
        if (stored && stored[selector])
        {
            delete stored[selector];
        }
        
        return this;
    }
});

Element.alias('delegateEvent','relay');
Element.alias('delegateEvents','relayEvents');
Element.alias('denyEvent','deny');