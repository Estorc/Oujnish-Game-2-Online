
BulletHell.prototype.easeOutSine = function (t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

BulletHell.prototype.getRandomInt = function(max) {
	  return Math.floor(Math.random() * max);
}


BulletHell.prototype.openBlackBars = function (condition) {
	
	if (condition) {
				params = [8, "CutsceneBlacksBars", 1, 0, 640, 360, 150, 150, 0, 0]
				
				point = Game_Interpreter.prototype.picturePoint.call(null, params);
				// prettier-ignore
				$gameScreen.showPicture(
					params[0], params[1], params[2], point.x, point.y,
					params[6], params[7], params[8], params[9]
				);
				
				params = [8, 3, 1, 0, 640, 360, 100, 100, 255, 0, 60, false, 0]
				
				point = Game_Interpreter.prototype.picturePoint.call(null, params);
				
				$gameScreen.movePicture(
					params[0], params[2], point.x, point.y, params[6], params[7],
					params[8], params[9], params[10], params[12] || 0
				);
				if (params[11]) {
					thisTurn.wait(params[10]);
				}
	}
	
}



BulletHell.prototype.closeBlackBars = function (condition) {
	
	if (condition) {
				params = [8, 3, 1, 0, 640, 360, 150, 150, 0, 0, 60, false, 0]
				
				point = Game_Interpreter.prototype.picturePoint.call(null, params);
				
				$gameScreen.movePicture(
					params[0], params[2], point.x, point.y, params[6], params[7],
					params[8], params[9], params[10], params[12] || 0
				);
				if (params[11]) {
					thisTurn.wait(params[10]);
				}
	}
	
}


BulletHell.prototype.deleteBlackBars = function (condition) {
	
	if (condition) {
				params = [8, "CutsceneBlacksBars", 1, 1, 640, 360, 150, 150, 0, 0]
				
				point = Game_Interpreter.prototype.picturePoint.call(null, params);
				// prettier-ignore
				$gameScreen.showPicture(
					params[0], params[1], params[2], point.x, point.y,
					params[6], params[7], params[8], params[9]
				);
				$gameScreen.erasePicture(8);
	}
	
}