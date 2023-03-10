var FRUITS_CANVAS_CONTEXT = null;
var LEVEL_FRUITS_CANVAS_CONTEXT = null;
var FRUITS_SIZE = 30;

var FRUITS_POSITION_X = 276;
var FRUITS_POSITION_Y = 310;

var FRUIT_MINIMUM_START = 15;
var FRUIT_CANCEL_TIMER = null;
var FRUIT_CANCEL_SPEED = 7500;
var FRUIT = null;
// const Teddy = new Image();
const Ollie = new Image();
const Pilchard = new Image();
const Rocky = new Image();
const Duncan = new Image();
const Oscar = new Image();
const Cheerio = new Image();

function initFruits() {
	var canvas = document.getElementById('canvas-fruits');
	canvas.setAttribute('width', '550');
	canvas.setAttribute('height', '550');
	if (canvas.getContext) {
		FRUITS_CANVAS_CONTEXT = canvas.getContext('2d');
	}
	// loadImages();

	var levelCanvas = document.getElementById('canvas-level-fruits');
	levelCanvas.setAttribute('width', '265');
	levelCanvas.setAttribute('height', '30');
	if (levelCanvas.getContext) {
		LEVEL_FRUITS_CANVAS_CONTEXT = levelCanvas.getContext('2d');
	}

	var ctx = getLevelFruitsCanevasContext();
	ctx.clearRect(0, 0, 265, 30);

	var x = 245;
	var y = 14;
	var i = 0;

	if (LEVEL > 7) {
		var l = LEVEL
		if (l > 13) l = 13;
		i = -(l - 7);
	}

	drawFruit(ctx, "cherry", x - ( i * 37), y, 27);
	i ++;

	if (LEVEL > 1) {
		drawFruit(ctx, "strawberry", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 2) {
		drawFruit(ctx, "orange", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 3) {
		drawFruit(ctx, "orange", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 4) {
		drawFruit(ctx, "apple", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 5) {
		drawFruit(ctx, "apple", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 6) {
		drawFruit(ctx, "melon", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 7) {
		drawFruit(ctx, "melon", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 8) {
		drawFruit(ctx, "galboss", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 9) {
		drawFruit(ctx, "galboss", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 10) {
		drawFruit(ctx, "bell", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 11) {
		drawFruit(ctx, "bell", x - ( i * 37), y, 27);
		i ++;
	}
	if (LEVEL > 12) {
		drawFruit(ctx, "key", x - ( i * 37), y, 27);
		i ++;
	}
}

function getFruitsCanevasContext() {
	return FRUITS_CANVAS_CONTEXT;
}
function getLevelFruitsCanevasContext() {
	return LEVEL_FRUITS_CANVAS_CONTEXT;
}

function eatFruit() {
	playEatFruitSound();

	var s = 0;
	if (FRUIT === "cherry")  s = 100;
	else if (FRUIT === "strawberry")  s = 300;
	else if (FRUIT === "orange")  s = 500;
	else if (FRUIT === "apple")  s = 700;
	else if (FRUIT === "melon")  s = 1000;
	else if (FRUIT === "galboss")  s = 2000;
	else if (FRUIT === "bell")  s = 3000;
	else if (FRUIT === "key")  s = 5000;

	score(s, "fruit");
	cancelFruit();
}

function fruit() {

	if (TIME_FRUITS === 2 && $("#board .fruits").length > 0) {
		$("#board .fruits").remove();
	}
	if (TIME_FRUITS > FRUIT_MINIMUM_START) {
		if (anyGoodIdea() > 3) {
			oneFruit();
		}
	}
}
function oneFruit() {
	if ( FRUIT_CANCEL_TIMER === null ) {
		var ctx = getFruitsCanevasContext();

		if (LEVEL === 1) FRUIT = "cherry";
		else if (LEVEL === 2) FRUIT = "strawberry";
		else if (LEVEL === 3 || LEVEL === 4) FRUIT = "orange";
		else if (LEVEL === 5 || LEVEL === 6) FRUIT = "apple";
		else if (LEVEL === 7 || LEVEL === 8) FRUIT = "melon";
		else if (LEVEL === 9 || LEVEL === 10) FRUIT = "galboss";
		else if (LEVEL === 11 || LEVEL === 12) FRUIT = "bell";
		else if (LEVEL === 13) FRUIT = "key";

		drawFruit(ctx, FRUIT, FRUITS_POSITION_X, FRUITS_POSITION_Y, FRUITS_SIZE);
		FRUIT_CANCEL_TIMER = new Timer("cancelFruit()", FRUIT_CANCEL_SPEED);
	}
}
function cancelFruit() {
	eraseFruit();
	FRUIT_CANCEL_TIMER.cancel();
	FRUIT_CANCEL_TIMER = null;
	TIME_FRUITS = 0;
}

function eraseFruit() {

	var ctx = getFruitsCanevasContext();
	//ctx.translate(FRUITS_POSITION_X - (FRUITS_SIZE / 2), FRUITS_POSITION_Y - (FRUITS_SIZE / 2));
	//ctx.save();
	//ctx.globalCompositeOperation = "destination-out";

	//ctx.beginPath();
	//ctx.translate(FRUITS_POSITION_X - (FRUITS_SIZE / 2), FRUITS_POSITION_Y - (FRUITS_SIZE / 2));
	ctx.clearRect(FRUITS_POSITION_X - (FRUITS_SIZE), FRUITS_POSITION_Y - (FRUITS_SIZE), FRUITS_SIZE * 2, FRUITS_SIZE * 2);
	//ctx.fill();
	//ctx.closePath();

	//ctx.restore();
}

function drawFruit(ctx, f, x, y, size) {
	ctx.save();

	if ( f === "cherry" ) drawCherry(ctx, x, y, size);
	else if ( f === "strawberry" ) drawStrawberry(ctx, x, y, size);
	else if ( f === "orange" ) drawOrange(ctx, x, y, size);
	else if ( f === "apple" ) drawApple(ctx, x, y, size);
	else if ( f === "melon" ) drawMelon(ctx, x, y, size);
	else if ( f === "galboss" ) drawGalboss(ctx, x, y, size);
	else if ( f === "bell" ) drawBell(ctx, x, y, size);
	else if ( f === "key" ) drawKey(ctx, x, y, size);

	ctx.restore();
}

function drawKey(ctx, x, y, size) {
	const Cheerio = document.getElementById("Cheerio");
	Cheerio.addEventListener("load", (e) => {
	});		ctx.drawImage(Cheerio, x-30, y-15, 30, 30);
}

function drawBell(ctx, x, y, size) {

	const Oscar = document.getElementById("Oscar");
	Oscar.addEventListener("load", (e) => {
	});		ctx.drawImage(Oscar, x-30, y-15, 30, 30);
}
function drawGalboss(ctx, x, y, size) {

	const Lily = document.getElementById("Lily");
	Lily.addEventListener("load", (e) => {
	});		ctx.drawImage(Lily, x-30, y-15, 30, 30);

}
function drawMelon(ctx, x, y, size) {
	const Ollie = document.getElementById("Ollie");
	Ollie.addEventListener("load", (e) => {
	});		ctx.drawImage(Ollie, x-30, y-15, 30, 30);
}
function drawApple(ctx, x, y, size) {
	const Pilchard = document.getElementById("Pilchard");
	Pilchard.addEventListener("load", (e) => {
	});		ctx.drawImage(Pilchard, x-30, y-15, 30, 30);
}

function drawOrange(ctx, x, y, size) {
	const Rocky = document.getElementById("Rocky");
	Rocky.addEventListener("load", (e) => {
	});		ctx.drawImage(Rocky, x-30, y-15, 30, 30);
}

function drawStrawberry(ctx, x, y, size) {
	const Duncan = document.getElementById("Duncan");
	Duncan.addEventListener("load", (e) => {
	});		ctx.drawImage(Duncan, x-30, y-15, 30, 30);

}
function drawCherry(ctx, x, y, size) {
	// loadImages();
	const Teddy = document.getElementById("Teddy");
	Teddy.addEventListener("load", (e) => {
	});		ctx.drawImage(Teddy, x-30, y-15, 30, 30);

}
// function loadImages(){
//
// 	// Teddy.src = "img/jas/Teddy.png";
// 	const Ollie = new Image();
// 	Ollie.src = "img/jas/Ollie.png";
// 	const Pilchard = new Image();
// 	Pilchard.src = "img/jas/Pilchard.png";
// 	const Rocky = new Image();
// 	Rocky.src = "img/jas/Rocky.png";
// 	const Duncan = new Image();
// 	Duncan.src = "img/jas/Duncan.png";
// }
