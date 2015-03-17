var Timer = (function ( window, undefined ) {
	"use strict";
	var defaults = {
		size: 300,
		color: "#f00",
		borderColor: "#000",
		borderWidth: 3,
		className: "timer_canvas"
	};
	
	// create a propably unique ID if none was given at instatiation
	function randID( key, len ) {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
		l = len || 4, i,
		id = key + "_";
		
		for ( i = 0; i < l; i += 1 ) {
			id += chars[ Math.floor( Math.random() * chars.length ) ];
		}
		return id;
	}
	
	// transfom degrees into radians
	function radians( deg ) {
		return ( Math.PI / 180 ) * deg;
	}
	
	// merge options with defaults (and keep both unchanged).
	function simpleMerge( options, defaults ) {
		var merged = {},
		prop;
		
		for ( prop in defaults ) {
			if ( defaults.hasOwnProperty( prop ) ) {
				merged[ prop ] = defaults[ prop ];
			}
		}
		for ( prop in options ) {
			if ( options.hasOwnProperty( prop ) ) {
				merged[ prop ] = options[ prop ];
			}
		}
		
		return merged;
	}
	
	function ClassTimer( options ) {
		var that = this,
		opts = simpleMerge( options, defaults ),
		targetTime, fn,
		running = false;
		
		function drawTimer( ratio ) {
			var ctx = that.context,
			d = that.size,
			r = d / 2,
			startAngle = radians( 270 ),
			endAngle = radians( 360 * ( 1 - ratio ) + 270.01 );
			
			ctx.clearRect( 0, 0, d, d );
			ctx.beginPath();
			ctx.moveTo( r, r );
			ctx.arc( r, r, r - that.borderWidth, startAngle, endAngle, true );
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
		
		function frame() {
			var currentTime = new Date().getTime(),
			delta = targetTime - currentTime,
			ratio = delta / that.time;
			if ( running ) {
				if ( delta > 0 ) {
					drawTimer( ratio );
					window.setTimeout( frame, 40 );
				}
				else {
					that.context.clearRect( 0, 0, that.size, that.size );
					running = false;
					fn.call( window, that );
				}
			}
		}
		
		this.size = opts.size;
		this.color = opts.color;
		this.borderColor = opts.borderColor;
		this.borderWidth = opts.borderWidth;
		
		this.time = null;
		
		this.id = opts.id || randID( "timer" );
		this.canvas = null;
		this.context = null;
		
		// create canvas
		this.canvas = document.createElement( "canvas" );
		this.canvas.width = this.size;
		this.canvas.height = this.size;
		this.canvas.id = this.id;
		this.canvas.className = opts.className;
		
		// setup context
		this.context = this.canvas.getContext( "2d" );
		this.context.fillStyle = this.color;
		this.context.strokeStyle = this.borderColor;
		this.context.lineWidth = this.borderWidth;
		this.context.lineJoin = "round";
		drawTimer( 0 );
		
		this.start = function ( time, callback ) {
			if ( !running ) {
				that.time = time * 1000;
				targetTime = new Date().getTime() + that.time;
				running = true;
				fn = callback || function () {};
				frame();
			}
			
		};
		
		
	}
	
	return ClassTimer;	
}(window));
