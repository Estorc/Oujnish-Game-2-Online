

	BulletHell.prototype.rotatePoint = function(cx, cy, x, y, angle)
	{		
		let sinus   = Math.sin((-angle)*Math.PI/180)
		let cosinus = Math.cos((-angle)*Math.PI/180);
		let tmpx = 0;
		let tmpy = 0;

		x = x - cx;
		y = y - cy;
		tmpx = x * cosinus - y * sinus;
		tmpy = x * sinus   + y * cosinus;
		x = tmpx + cx;
		y = tmpy + cy;

		return {x:x,y:y};
	}
	
	
	BulletHell.prototype.rotateRect = function(rect, cx, cy, angle)
	{
		let tl = this.rotatePoint(cx,cy,rect.x1,rect.y1,angle);
		let tr = this.rotatePoint(cx,cy,rect.x2,rect.y1,angle);
		let bl = this.rotatePoint(cx,cy,rect.x1,rect.y2,angle);
		let br = this.rotatePoint(cx,cy,rect.x2,rect.y2,angle);
		
		return {tl:tl,tr:tr,bl:bl,br:br};
	}
	
	
	
	
	
	BulletHell.prototype.changeDir = function(value,index) {
		
		var direction = 0;
		
		direction = (Math.atan2(this.objects[index].direction.y,this.objects[index].direction.x) * 180 / Math.PI);

		if (direction < 0) {
			direction += 360;
		}
		
		direction += value;
		
		if (direction < 0) {
			direction += 360;
		}
		
		if (direction > 360) {
			direction -= 360;
		}
		
		this.objects[index].direction.x = Math.cos(direction *Math.PI/180);
		this.objects[index].direction.y = Math.sin(direction *Math.PI/180);
		
	}
	
	BulletHell.prototype.getDirectionToPlayer = function(index,offsetx,offsety) {
		
		var direction = 0;
		offsetx = offsetx || 0;
		offsety = offsety || 0;
		
		direction = (Math.atan2(
		this.objects[index].pos.y + offsety - this.bhmaxheight/2 + this.objects[index].height/2 - 
		($gameVariables.value(84) + this.PlayerCollisionY1 + (this.PlayerCollisionY2 - this.PlayerCollisionY1)/2), 
		this.objects[index].pos.x + offsetx - this.bhmaxwidth/2 + this.objects[index].width/2 - 
		($gameVariables.value(83) + this.PlayerCollisionX1 + (this.PlayerCollisionX2 - this.PlayerCollisionX1)/2)) * 180 / Math.PI)-180;
		
		if (direction < 0) {
			direction += 360;
		}
		return direction;
		
	}
	
	
	BulletHell.prototype.getDirectionOfObject = function(index) {
		
		var direction = 0;
		
		direction = (Math.atan2(this.objects[index].direction.y,this.objects[index].direction.x) * 180 / Math.PI);
		if (direction < 0) {
			direction += 360;
		}
		return direction;
		
	}
	
	BulletHell.prototype.getDirectionToPosition = function(x1,y1,x2,y2) {
		
		var direction = 0;
		
		direction = (Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI)-180;
		if (direction < 0) {
			direction += 360;
		}
		return direction;
		
	}
	
	BulletHell.prototype.getDistanceToPlayer = function(index) {
		
		let distance = Math.sqrt(Math.pow(($gameVariables.value(83)-this.objects[index].pos.x),2) + Math.pow(($gameVariables.value(84)-this.objects[index].pos.y),2))
		return distance;
		
	}
	
	BulletHell.prototype.getDistanceBetweenPoints = function(x1,y1,x2,y2) {
		
		let distance = Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2))
		return distance;
		
	}