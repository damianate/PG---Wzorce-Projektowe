/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Lokalny = function(startX, startY) {
	var x = startX,
		y = startY,
		id,
		moveAmount = 2;
	
	// Getters and setters
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	// Update player position
	var update = function(kierunek) {
		// Previous position 
		var prevX = x,
			prevY = y;
			

		// Up key takes priority over down
		if (kierunek==gora) {
			y -= moveAmount;
		 
		} else if (kierunek==dol) {
			 
			y += moveAmount;
		};

		// Left key takes priority over right
		if (kierunek==lewo) {
			x -= moveAmount;
		} else if (kierunek==prawo) {
			x += moveAmount;
		};

		return (prevX != x || prevY != y) ? true : false;
	};
	var img =new Image();

	img.src = './sprite.png';
	img.addEventListener('load',draw,false);
	 
	
	// Draw player
	var draw = function(ctx) {
		//wymiary ludzika jako prostokat ctx.fillRect(x+25, y+12, 60, 102); 
		//wymiary do strefy obrazen
		//ctx.fillRect(x+27, y+27, 55, 88); 
		ctx.drawImage(img,115,0,100,120,x,y,100,120);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		update: update,
		draw: draw
	}
};