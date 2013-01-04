this.cassebrik = this.cassebrik || {};

cassebrik.Game = function(ctx, wall, bar, ball, width, height, interval) {
	console.log("Initialize game:");
	console.log(wall);
	console.log(ball);
	console.log(bar);
	this.context = ctx;
	this.wall = wall;
	this.bar = bar;
	this.ball = ball;
	this.width = width;
	this.height = height;
	this.interval = interval;
	this.timer = null;
	this.paused = true;
};

cassebrik.Game.prototype = {
	launch : function() {
		console.log("demarrage");
		this.wall.reset();
		this.refresh();
		this.showMessage("Press p to start");
	},
	refresh : function() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.ball.refresh(this);
		this.wall.show(this.context);
		this.ball.show(this.context);
		this.bar.show(this.context);
		if(this.wall.remainedBricks == 0) {
			this.execute("win");
		}
	},
	play : function() {
		if(this.paused) {
			this.paused = false;
			var game = this;
			this.timer = setInterval(function() {
				game.refresh();
			}, this.interval);
		}
	},
	pause : function() {
		if(!this.paused) {
			this.paused = true;
			clearInterval(this.timer);
			this.showMessage("Pause - press p to continue");
		}
	},
	showMessage : function(msg) {
		alert(msg);
	},
	execute : function(action) {
		if(!(typeof this.actions[action] === 'undefined')) {
			return this.actions[action].apply(this);
		}
		return null;
	},
	actions : {
		"left_movement": function() {
			return this.bar.leftMove(this);
		},
		"right_movement": function() {
			return this.bar.rightMove(this);
		},
		"konami_code": function() {
			alert("konami code executed");
			return true;
		},
		"lose": function() {
			this.pause();
			alert("loser");
			return true;
		},
		"win": function() {
			this.pause();
			alert("winner");
			return true;
		},
		"play_pause": function() {
			if(this.paused) {
				this.play();
			} else {
				this.pause();
			}
		}
	}
};