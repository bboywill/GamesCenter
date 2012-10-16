(function($) {
	// Logger Handlers
	$.bh.msg_handler = new Object();

	$.bh.msg_handler.log = function(msg) {
		if(typeof console.log === 'undefined'){
			$.bh.msg(msg, "debug");
		} else {
			console.log(msg);
		}
	};

	// Afficheur des messages
	$.bh.msg = function(msg, clazz) {
		var handler = $.bh.msg_handler[(clazz || "info")]
		if(typeof handler === 'undefined') {
			$(".bh-msg-container").append("<li class='bh-msg-message " + clazz + "'><span class='bh-message-close'>x</span>" + msg + "</li>");
		} else {
			handler(msg);
		}
	};

	// Behaviors
	$.bh.register("msg", {
		container : function(thiz) {
			$(".bh-msg-message .bh-message-close", thiz).live("click", function() {
				$(this).parent().remove();
			});
		}
	});
})(jQuery);
