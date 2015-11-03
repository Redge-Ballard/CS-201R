var c = document.getElementById("c");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth-20;
var h = c.height = window.innerHeight-40;
var particles = [];
var max = 1000;

//Background
var red = 0;
var blue = 0;
var green = 0;
var redChange = 0;
var greenChange = 0;
var blueChange = 0;
var clearColor = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";

var density = 3;
var cubeH = 1;
var cubeW = 1;
var speed = 2;
var heightChange = 0;

var alpha = 0.4;
var alphaChange = 0;
var hue = 0;
var hueChange = 0.1;
var cubeSize = 20;

var input1 = "";

var fov = 15;
var camAngle = 0;

var frame = 0;
var start = 310;
var height = 500;

function random(min, max) {
		return (Math.random() * (max - min)) + min;
}

function P() {
		this.startZ = start;
		start += .18;
}

P.prototype.init = function() {
		this.x = random(-w * 8, w * 8); //width of stream 1-8
		this.y = height;
		this.z = this.startZ || 500;
		this.startZ = null;
		this.vx = 0; //horz pos of camera
		this.vy = camAngle; //vert pos of camera   -100-100
		this.vz = speed; //speed towards cam  0.1-10
		this.color = "hsla(" + hue + ", 100%, 50%, .8)"; //color of dots
		this.size = cubeSize; //cube size
};

P.prototype.draw = function() {
		var scale = fov / (fov + this.z);
		var x2d = this.x * scale + w / 2;
		var y2d = this.y * scale + h / 2;
		ctx.fillStyle = this.color;
		ctx.fillRect(x2d, y2d, this.size * scale * cubeW, this.size * scale * cubeH);
		//Height/width - 1-20
		if (x2d < 0 || x2d > w || y2d < 0 || y2d > h) {
				this.init();
		}

		this.update();
};

P.prototype.update = function() {
		this.z -= this.vz;
		this.x += this.vx;
		this.y += this.vy;
		if (this.z < -fov) {
				this.init();
		}
};

for (var i = 0; i < max; i++) {
		(function(x) {
				setTimeout(function() {
								var p = new P();
								p.init();
								particles.push(p);
						}, x * density) //density of particles 0.1-10
		})(i)
}

window.addEventListener("resize", function() {
		w = c.width = window.innerWidth;
		h = c.height = window.innerHeight;
})

function anim() {
		ctx.fillStyle = clearColor;
		ctx.globalCompositeOperation = "source-over";
		ctx.fillRect(0, 0, w, h);

		for (var i in particles) {
				particles[i].draw();
		}

		hue += hueChange;
		blue += blueChange;
		red += redChange;
		green += greenChange;
		alpha += alphaChange;
		height += heightChange;
		clearColor = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
		if (height > 6500 || height < -6500) //top and bot bounds
		{
				heightChange = heightChange * (-1);
		}
		if (red > 255 || red < -50) //top and bot bounds
		{
				redChange = redChange * (-1);
		}
		if (green > 255 || green < -50) //top and bot bounds
		{
				greenChange = greenChange * (-1);
		}
		if (blue > 255 || blue < -50) //top and bot bounds
		{
				blueChange = blueChange * (-1);
		}
		if (alpha > 1 || alpha < 0) //top and bot bounds
		{
				alphaChange = alphaChange * (-1);
		}
		window.requestAnimationFrame(anim);
}

function applySeedBG() {
		var seed = document.getElementById("input1").value;
		Math.seedrandom(seed);
		redChange = Math.round(Math.random() * 5);
		greenChange = Math.round(Math.random() * 5);
		blueChange = Math.round(Math.random() * 5);
}

function applySeedMove() {
		var seed = document.getElementById("input1").value;
		Math.seedrandom(seed);
		density = Math.random() * 5;
		heightChange = Math.random() * 200;
		speed = Math.random() * 8;
}

function applySeedColor() {
		var seed = document.getElementById("input1").value;
		Math.seedrandom(seed);
		alphaChange = Math.random() * .1;
		hueChange = Math.random() * 5;
		cubeSize = Math.random() * 100;
		cubeW = Math.random() * 5;
		cubeH = Math.random() * 5;
}

function applySeedView() {
		var seed = document.getElementById("input1").value;
		Math.seedrandom(seed);
		camAngle = Math.random() * 100;
		if (Math.random > 0.5) {
				camAngle = camAngle * (-1);
		}
		fov = Math.random() * 100;
		if (fov < 15) {
				fov = 15;
		}
}

function resetAll() {
		red = 0;
		blue = 0;
		green = 0;
		redChange = 0;
		greenChange = 0;
		blueChange = 0;
		density = 3;
		cubeH = 1;
		cubeW = 1;
		speed = 2;
		heightChange = 0;
		alpha = 0.4;
		alphaChange = 0;
		hue = 0;
		hueChange = 0.1;
		cubeSize = 20;
		fov = 15;
		camAngle = 0;
		frame = 0;
		start = 310;
		height = 500;
}

anim();