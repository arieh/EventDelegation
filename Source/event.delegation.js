/*
---
description: Better event delegation for MooTools.

license: MIT-style

authors:
- Christopher Pitt

requires:
- core/1.2.4: Element.Event
- core/1.2.4: Selectors

provides: [Element.delegateEvent]

...
*/

Element.implement({
	'delegateEvent': function(type, delegates, prevent, propagate)
	{	
		//get stored delegates
		var key = type + '-delegates',
			stored = this.retrieve(key) || false;
		// if stored delegates; extend with
		// new delegates and return self.
		if (stored)
		{
			$each(delegates,function(fnc,selector){
				if (stored[selector]) stored[selector].push(fnc);
				else stored[selector] = [fnc];
			});
			this.store(key, stored);			
			return this;
		}
		else
		{
			stored = {}; 
			$each(delegates,function(fnc,selector){
				stored[selector]=[fnc];
			});
			this.store(key, stored);
		}
		
		return this.addEvent(type, function(e)
		{			
			// Get target and set defaults
			var target = document.id(e.target),
				prevent = prevent || true,
				propagate = propagate || false,
				delegates = this.retrieve(key),
				args = $A(arguments);
			
			// Cycle through rules
			$each(delegates,function(arr,selector){
				if (target.match(selector)){
					if (prevent) e.preventDefault();
					if (!propagate) e.stopPropagation();
					
					arr.each(function(fnc){
						if (fnc.apply) return fnc.apply(target, args);
					});
				}
			});
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
	
	'removeDelegatedEvent' : function(type,delegated,fn){
		var key = type + '-delegates',
			stored = this.retrieve(key) || false;
		
		if (stored && stored[delegated]) stored[delegated].erase(fn);
		return this;
	},
	'removeDelegatedEvents' : function(type,delegated){
		var key = type + '-delegates',
			stored = this.retrieve(key) || false;
		if (stored && stored[delegated]) delete stored[delegated];
		return this;
	}
});