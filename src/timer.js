/**
 * Class to provide a simle canvas based graphical timer.
 * 
 * @class Timer
 * @constructor
 *
 * @param {Object} [options] Options
 * @param {Number} [options.size] Width & height in px.
 * @param {String} [options.color] Color (all HTML/Canvas compatible color formats)
 * @param {String} [options.borderColor] Border color (all HTML/Canvas compatible color formats)
 * @param {Number} [options.boderWidth] Border width in px.
 * @param {String} [options.id] ID of the canvas-element the timer is drawn upon.
 * @param {String} [options.className] ClassName of the canvas-element the timer is drawn upon.
 *
 * @example
 * 	var myTimer = new Timer( {
 * 		size: 300,
 * 		color: "rgba(125, 70, 70, .3)",
 * 		borderWidth: 10,
 * 		borderColor: "#000"
 * 	} );
 **/		
var Timer = (function ( window, undefined ) {
	"use strict";
	var defaults = {
		size: 300,
		color: "#f00",
		borderColor: "#000",
		borderWidth: 3,
		className: "timer_canvas"
	};
	
	// create a propably unique ID if none was given at instantiation
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
		
/**
* Stores the Timer`s size (width/height).
* Assignment after instantiation changes nothing.
*
* @attribute size
* @type Number
**/
		this.size = opts.size;
		
/**
* Stores the Timer`s color.
* Assignment after instantiation changes nothing.
*
* @attribute color
* @type String
**/
		this.color = opts.color;
		
/**
* Stores the Timer`s border color.
* Assignment after instantiation changes nothing.
*
* @attribute borderColor
* @type String
**/
		this.borderColor = opts.borderColor;
		
/**
* Stores the Timer`s border width.
* Assignment after instantiation changes nothing.
*
* @attribute borderWidth
* @type Number
**/
		this.borderWidth = opts.borderWidth;
		
/**
* Stores the timespan the timer counts down.
* Assignment after instantiation changes nothing.
*
* @attribute timer
* @type Number
**/
		this.time = null;
		
/**
* Stores the ID of the canvas-alement the timer is drawn upon
* Assignment after instantiation changes nothing.
*
* @attribute id
* @type String
**/
		this.id = opts.id || randID( "timer" );
		
/**
* Stores the canvas element on which the timer is drawn.
*
* @attribute canvas
* @type HTMLCanvasElement
**/
		this.canvas = document.createElement( "canvas" );
		this.canvas.width = this.size;
		this.canvas.height = this.size;
		this.canvas.id = this.id;
		this.canvas.className = opts.className;
		
/**
* Stores the rendering context of the canvas element on whicht the timer is drawn.
*
* @attribute context
* @type CanvasRenderingContext2D
**/
		this.context = this.canvas.getContext( "2d" );
		this.context.fillStyle = this.color;
		this.context.strokeStyle = this.borderColor;
		this.context.lineWidth = this.borderWidth;
		this.context.lineJoin = "round";
		
		drawTimer( 0 );
		
/**
* Start or restart the timer.
*
* @method start
* @paran {Number} time Timespan to count down.
* @param {Function} [callback] Callback function to  be executed when the timer is done.
*
* @example
* 	var myTimer = new Timer( options );
* 		myTimer.start( 30, function ( timer ) {
* 		console.log( "%s`s done!", timer.id );
* 	} );
**/
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
