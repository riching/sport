window.AM = {};
AM.updownInit = function(canvas, ball) {
	ball.angle = 0;
	ball.scaleX = 1;
	ball.scaleY = 1;
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	return AM.updown;
}
AM.updown = function(canvas, context, ball) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ball.y = canvas.height / 2 + Math.sin(ball.angle) * canvas.height / 2;
	if (ball.angle >= 360) {
		ball.angle = 0;
	}
	ball.angle = ball.angle + 0.1;
	ball.draw(context);
}
AM.leftrightInit = function(canvas, ball) {
	ball.angle = 0;
	ball.scaleX = 1;
	ball.scaleY = 1;
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	return AM.leftright;
}
AM.leftright = function(canvas, context, ball) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ball.x = canvas.width / 2 + Math.sin(ball.angle) * canvas.width / 2;
	if (ball.angle >= 360) {
		ball.angle = 0;
	}
	ball.angle = ball.angle + 0.1;
	ball.draw(context);
}
AM.waveInit = function(canvas, ball) {
	ball.scaleX = ball.scaleY = 1;
	ball.angle = 0;
	ball.xspeed = 3;
	ball.yspeed = 0.2;
	ball.x = 0;

	return AM.wave;
}
AM.wave = function(canvas, context, ball) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (ball.x >= canvas.width) {
		ball.xspeed = ball.xspeed * -1;
	}
	if (ball.x < 0) {
		ball.xspeed = ball.xspeed * -1;
	}
	ball.x += ball.xspeed;
	ball.y = canvas.height / 2 + Math.sin(ball.angle) * canvas.height / 4;
	ball.angle += ball.yspeed;
	ball.draw(context);
}
AM.pulseInit = function(canvas, ball) {
	ball.angle = 0;
	ball.centerScale = 1;
	ball.range = 5;
	ball.speed = 0.1;
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;

	return AM.pulse;
}
AM.pulse = function(canvas, context, ball) {
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	context.clearRect(0, 0, canvas.width, canvas.height);
	ball.scaleX = ball.scaleY = ball.centerScale + Math.sin(ball.angle) * 10;
	ball.angle += ball.speed;
	ball.draw(context);
}

AM.randomMoveInit = function(canvas, ball) {
	ball.angleX = 0;
	ball.angleY = 0;
	ball.range = 250;
	ball.xspeed = 0.07;
	ball.yspeed = 0.11;
	ball.scaleX = ball.scaleY = 1;
	ball.radius = 10;
	return AM.randomMove;
}
AM.randomMove = function(canvas, context, ball) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ball.x = canvas.width / 2 + Math.sin(ball.angleX) * ball.range;
	ball.y = canvas.height / 2 + Math.sin(ball.angleY) * ball.range;
	ball.angleX += ball.xspeed;
	ball.angleY += ball.yspeed;
	ball.draw(context);
}

AM.circleInit = function(canvas, ball) {
	ball.angle = 0;
	ball.radius = 10;
	ball.speed = 0.2;
	ball.inc = 1;
	ball.scaleX = ball.scaleY = 1;
	return AM.circle;
}
AM.circle = function(canvas, context, ball) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (ball.radius > 250 || ball.radius < 10) {
		ball.inc *= -1;
	}
	ball.radius += ball.inc;

	ball.x = canvas.width / 2 + Math.cos(ball.angle) * ball.radius;
	ball.y = canvas.height / 2 + Math.sin(ball.angle) * ball.radius;
	ball.angle += ball.speed;
	ball.draw(context);
}

AM.ovalInit = function(canvas, ball) {
	ball.scaleX = ball.scaleY = 1;
	ball.radius = 10;
	ball.angle = 0;
	ball.radiusX = 350;
	ball.radiusY = 150;
	ball.speed = 0.05;

	return AM.oval;
}
AM.oval = function(canvas, context, ball) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	ball.x = canvas.width / 2 + Math.cos(ball.angle) * ball.radiusX;
	ball.y = canvas.height / 2 + Math.sin(ball.angle) * ball.radiusY;
	ball.angle += ball.speed;
	ball.draw(context);
}