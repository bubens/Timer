Timer - a (very) simple canvas based graphical timer
====================================================

Timer (with no .js at the end [!!!]) is a class to provide a simple canvas based graphical timer. It has some configuration abbilities but wants to be very simple and small.

Installation
------------

Get the `src/timer.js` file and include it in your project. Then create a timer.

`<script src="path/to/timer.js"></script>`

Usage
-----

Create a new Timer in three easy steps (and one optional fourth step).

1. Create and customize it at your own will.

	```javascript
	var myTimer = new Timer( options );
	```

	The following options are available. If an option is not given it falls back to the default.

	* **size**: width and height of the timer in px. [defaul: 300px]
	* **color**: color of the timer (all css-color definitions are possible). [default: #f00]
	* **borderColor**: come on... (see above). [default: #000]
	* **borderWidth**: in px [default: 3px]
	* **className**: class-name of the canvas element. [default: 'timer_canvas']
	* **id**: id for the timer _and_ the canvas element. [default: random ID in the form of "timer_" + 4 digit ID. Example: 'timer_7Fgw']
	

2. Append the element to the DOM. Use your favorite library if you like (none is required).

3. Start it by giving it a duration. Pass a callback if you like:

	```javascript
	myTimer.start( duration, callback );
	```
	
	The `duration` is given in seconds.
	
	The `callback` has the global-object as context and gets the timer object passed as an argument.

4. Optional: simply re-use your timer by starting it over again after its finished.
	
	**Attention**: a passed-in callback _**is not**_ persistant. Pass a callback for every start of the timer.

Example
-------

Create a timer with the following options:

* Width/Height: 200px
* Color: blue
* Border-Color: black
* Border-Width: 5px

Also give it the class-name "my_timer" and the id "my_timer01". Then start it for 5 seconds and alert "Done: " with the timer's ID after the timer is finished.

```javascript
// create it:
var myTimer = new Timer( {
	size: 200,
	color: "rgb(0,0,256)",
	borderWidth: 5,
	borderColor: "#000",
	className: "my_timer",
	id: "my_timer01"
} );

// append it:
document.getElementById( "test_timer" ).appendChild( myTimer.canvas );

// start it:
myTimer.start( 5, function ( timer ) {
	alert( "Done: " + timer.id );
} );
```

Play around with a live demo [here](http://jsfiddle.net/t418sekv/).

To-Do-List
----------

Things I might add some day:

* Define your own defaults for your timers.
* Make the callback given at the first start persistant until another is given.
* Give a way to draw your own stuff on the canvas in sync with the drawing of the timer.
* More flexible way to pass durations.
* Make the whole thing nicer.

Disclaimer
----------

I'm just an amateur coding around at home. This timer is part of a project I'm currently working on. I know, there are probably other libraries and scripts out there that do the same thing better. But I wanted to do it on my own and in vanilla JS. This is what came out of it... no big thing, but it works!

If you read this I'm already surprised. If you like it I'm also a little delighted. If you have something to say about it I'm even excited.

