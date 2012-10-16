(function($) {
	// Mécanisme d'enregistrement des comportements
	$.bh = new Object();
	$.bh.behaviors = new Object();
	$.bh.register = function(name, functions) {
		name = $.trim(name.toLowerCase());
		if(typeof $.bh.behaviors[name] === 'undefined') {
			$.bh.behaviors[name] = functions;
		} else {
			$.extend($.bh.behaviors[name], (functions || {}));
		}
	};

	// Plugin jQuery d'initialisation des comportements pour une portion du DOM
	var methods = {
		init : function(params) {
			var allNamespaces = new Array();
			for (var namespace in $.bh.behaviors){
				allNamespaces.push(namespace);
			}
			params = $.extend({
				include : allNamespaces.join(","),
				exclude : ""
			}, (params || {}));
			var includedNamespaces = params.include.split(",");
			var exludedNamespaces = params.exclude.split(",");
			var behaviors = new Object();
			for(var i = 0; i < includedNamespaces.length; i++) {
				var namespace = $.trim(includedNamespaces[i]);
				if($.inArray(namespace, exludedNamespaces) == -1) {
					behaviors[namespace] = $.bh.behaviors[namespace];
				}
			}
			this.each(function() {
				var node = $(this);
				for (var namespace in behaviors){
					var functions = $.bh.behaviors[namespace];
					for (var functionName in functions) {
						var functionBehavior = functions[functionName];
						var behaviorClass = ".bh-" + namespace + "-" + functionName;
						$(behaviorClass, node).each(function() {
							var box = $(this);
							if(!box.attr("data-bh")) {
								functionBehavior(box);
								box.attr("data-bh", "true");
							}
						});
					}
				}
			});
			return this;
		}
	};

	// Mécanisme d'appel au plugin
	$.fn.bh = function(method) {
		var args = arguments;
		if (methods[method]) {
			args = Array.prototype.slice.call(args, 1);
		} else if (typeof method === 'object' || !method) {
			method = "init";
		} else {
			$.error("Method " +  method + " does not exist on jQuery behavior.");
		}
		methods[method].apply(this, args);
		return this;
	};
})(jQuery);
