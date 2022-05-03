
	BulletHellObject = function() {
		this.initialize(...arguments);	
	}
	
	
	
	
	BulletHellObject.prototype.drawCollision = function() {
		
	if (typeof this.collisionSprite !== 'undefined') {
		
		return this.collisionSprite;
		
	}
		
	let gr = new PIXI.Graphics();
		
	gr.beginFill(0x000000);
	gr.drawRect(0, 0 , 1, 1);
	gr.endFill();
		
	let x = this.pos.x - $gameBulletHell.bhmaxwidth/2
	let y = this.pos.y - $gameBulletHell.bhmaxheight/2
		
		for (let k=0;k<this.collision.length;k++) {
			
			let collision = this.collision[k]
			
			switch (collision.type) {
				
				case 'rect':
				
					gr.beginFill(0x00FF00);
					gr.drawRect(collision.x1, collision.y1 , collision.x2, collision.y2);
					gr.endFill();
					gr.beginHole();
					gr.drawRect(collision.x1+2, collision.y1+2 , collision.x2-4, collision.y2-4);
					gr.endHole();
				
				case 'circle':
				
					gr.beginFill(0x0000FF);
					gr.drawCircle(collision.x, collision.y, collision.radius);
					gr.endFill();
					gr.beginHole();
					gr.drawCircle(collision.x, collision.y, collision.radius-2);
					gr.endHole();
				
				
				
			}
			
		}
		
	
		const bitmap = new Bitmap(gr.width, gr.height);
		let collisionTexture = Graphics.app.renderer.generateTexture(gr);
		const canvas = Graphics.app.renderer.extract.canvas(collisionTexture);
		let collisionBitmap = new Bitmap(collisionTexture.width,collisionTexture.height);
        bitmap.context.drawImage(canvas, 0, 0);
        canvas.width = 0;
        canvas.height = 0;
		bitmap.baseTexture.update();
		
		this.collisionSprite = new Sprite(bitmap);
		
		return this.collisionSprite;
	
		
	}
	
	
	function rectangleCollision(rect1,rect2) {
		
		if (rect1.x1 < rect2.x2 &&
		rect1.x2 > rect2.x1 &&
		rect1.y1 < rect2.y2 &&
		rect1.y2 > rect2.y1) {
			
			return true;
			
		}
		
	}
	
	function rectangleCollisionWithPoint(point,rect) {
		
		if (point.x > rect.x1 &&
		point.x < rect.x2 &&
		point.y > rect.y1 &&
		point.y < rect.y2) {
			
			return true;
			
		}
		
	}
	
	BulletHellObject.prototype.collisionWithRectangle = function(rect) {
		
	let x = this.pos.x - $gameBulletHell.bhmaxwidth/2
	let y = this.pos.y - $gameBulletHell.bhmaxheight/2
	let this_angle = ((this.collision_angle == 'angle') ? this.angle : this.collision_angle)
	
		/*for (let k=0;k<this.collision.length;k++) {
			if (typeof this.grCol !== 'undefined') {Graphics.app.stage.removeChild(Graphics.app.stage.children[Graphics.app.stage.children.length-1]);}
		}*/
		
		for (let k=0;k<this.collision.length;k++) {
			
			let collision = this.collision[k]
			
			switch (collision.type) {
				
				case 'rect':
						let collisionRect ={
						x1:x + (collision.x1)*((this.collision_scale.x == 'scale') ? this.scale.x : this.collision_scale.x),
						y1:y + (collision.y1)*((this.collision_scale.y == 'scale') ? this.scale.y : this.collision_scale.y),
						x2:x + (collision.x1 + collision.x2)*((this.collision_scale.x == 'scale') ? this.scale.x : this.collision_scale.x), 
						y2:y + (collision.y1 + collision.y2)*((this.collision_scale.y == 'scale') ? this.scale.y : this.collision_scale.y)
						}

					if (this_angle == 0) {
						if (rectangleCollision(collisionRect,rect)) {
							
						return true;
							
						}
					} else {
						
						if (typeof this.sprite.bitmap === 'undefined') {
						
							return false;
						
						}
						
						let rotatedCollision = $gameBulletHell.rotateRect(collisionRect,x + this.offset.x + (this.anchor.x * (this.sprite.bitmap.width/(this.sprite.frames*((this.canbetouched) ? 2 : 1)))), y + this.offset.y + (this.anchor.y * this.sprite.bitmap.height),-this_angle);
						
						let rotatedCollisionRect = [{
						x1:((rotatedCollision.tl.x > rotatedCollision.tr.x) ? rotatedCollision.tr.x : rotatedCollision.tl.x),
						x2:((rotatedCollision.tl.x < rotatedCollision.tr.x) ? rotatedCollision.tr.x : rotatedCollision.tl.x),
						y1:((rotatedCollision.tl.y > rotatedCollision.tr.y) ? rotatedCollision.tr.y : rotatedCollision.tl.y),
						y2:((rotatedCollision.tl.y < rotatedCollision.tr.y) ? rotatedCollision.tr.y : rotatedCollision.tl.y),
						xyf1:rotatedCollision.tl,
						xyf2:rotatedCollision.tr
						},{
						x1:((rotatedCollision.tr.x > rotatedCollision.br.x) ? rotatedCollision.br.x : rotatedCollision.tr.x),
						x2:((rotatedCollision.tr.x < rotatedCollision.br.x) ? rotatedCollision.br.x : rotatedCollision.tr.x),
						y1:((rotatedCollision.tr.y > rotatedCollision.br.y) ? rotatedCollision.br.y : rotatedCollision.tr.y),
						y2:((rotatedCollision.tr.y < rotatedCollision.br.y) ? rotatedCollision.br.y : rotatedCollision.tr.y),
						xyf1:rotatedCollision.tr,
						xyf2:rotatedCollision.br
						},{
						x1:((rotatedCollision.tl.x > rotatedCollision.bl.x) ? rotatedCollision.bl.x : rotatedCollision.tl.x),
						x2:((rotatedCollision.tl.x < rotatedCollision.bl.x) ? rotatedCollision.bl.x : rotatedCollision.tl.x),
						y1:((rotatedCollision.tl.y > rotatedCollision.bl.y) ? rotatedCollision.bl.y : rotatedCollision.tl.y),
						y2:((rotatedCollision.tl.y < rotatedCollision.bl.y) ? rotatedCollision.bl.y : rotatedCollision.tl.y),
						xyf1:rotatedCollision.tl,
						xyf2:rotatedCollision.bl
						},{
						x1:((rotatedCollision.bl.x > rotatedCollision.br.x) ? rotatedCollision.br.x : rotatedCollision.bl.x),
						x2:((rotatedCollision.bl.x < rotatedCollision.br.x) ? rotatedCollision.br.x : rotatedCollision.bl.x),
						y1:((rotatedCollision.bl.y > rotatedCollision.br.y) ? rotatedCollision.br.y : rotatedCollision.bl.y),
						y2:((rotatedCollision.bl.y < rotatedCollision.br.y) ? rotatedCollision.br.y : rotatedCollision.bl.y),
						xyf1:rotatedCollision.bl,
						xyf2:rotatedCollision.br
						}];
						
						let plPoints = [{
						x:rect.x1,
						y:rect.y1
						},{
						x:rect.x2,
						y:rect.y1
						},{
						x:rect.x1,
						y:rect.y2
						},{
						x:rect.x2,
						y:rect.y2
						}]
						
						
						for (let d = 0; d<plPoints.length; d++) {
							
							let tmprotatedCollision = {
								x1:$gameBulletHell.rotatePoint(plPoints[d].x,plPoints[d].y,rotatedCollision.tl.x,rotatedCollision.tl.y,this_angle).x,
								x2:$gameBulletHell.rotatePoint(plPoints[d].x,plPoints[d].y,rotatedCollision.br.x,rotatedCollision.br.y,this_angle).x,
								y1:$gameBulletHell.rotatePoint(plPoints[d].x,plPoints[d].y,rotatedCollision.tl.x,rotatedCollision.tl.y,this_angle).y,
								y2:$gameBulletHell.rotatePoint(plPoints[d].x,plPoints[d].y,rotatedCollision.br.x,rotatedCollision.br.y,this_angle).y
							}								
							//console.log(tmprotatedCollision);
							if (rectangleCollision(tmprotatedCollision,rect)) {
								
							return true;
								
							}
						}
						
						
						
						/*if (rotatedCollision.tl.x < rect.x2 &&
						rotatedCollision.br.x > rect.x1 &&
						rotatedCollision.tr.y < rect.y2 &&
						rotatedCollision.bl.y > rect.y1) {
							
						return true;
							
						}*/
						
					/*this.grCol = new PIXI.Graphics();
	
					this.grCol.beginFill(0x0000FF);
					this.grCol.drawCircle(x + this.offset.x, y + this.offset.y, 2);
					this.grCol.drawCircle(x + this.offset.x + this.sprite.bitmap.width/(this.sprite.frames*((this.canbetouched) ? 2 : 1)), y + this.offset.y + (this.sprite.bitmap.height), 2);
					this.grCol.beginFill(0xFF0000);
					this.grCol.drawCircle(x + this.offset.x + (this.anchor.x * (this.sprite.bitmap.width/(this.sprite.frames*((this.canbetouched) ? 2 : 1)))),y + this.offset.y + (this.anchor.y * this.sprite.bitmap.height), 2);
					this.grCol.beginFill(0x00FF00);
					this.grCol.drawCircle(rotatedCollision.tl.x, rotatedCollision.tl.y, 2);
					this.grCol.drawCircle(rotatedCollision.tr.x, rotatedCollision.tr.y, 2);
					this.grCol.drawCircle(rotatedCollision.bl.x, rotatedCollision.bl.y, 2);
					this.grCol.drawCircle(rotatedCollision.br.x, rotatedCollision.br.y, 2);
					this.grCol.endFill();
					
					Graphics.app.stage.addChild(this.grCol);*/
						
						
						/*for (let c = 0; c<rotatedCollisionRect.length; c++) {
							for (let d = 0; d<plPoints.length; d++) {
								if (rectangleCollisionWithPoint(plPoints[d],rotatedCollisionRect[c])) {
									
									
									let xRatio = (plPoints[d].x-rotatedCollisionRect[c].x1)/(rotatedCollisionRect[c].x2-rotatedCollisionRect[c].x1)
									let yRatio = (plPoints[d].y-rotatedCollisionRect[c].y1)/(rotatedCollisionRect[c].y2-rotatedCollisionRect[c].y1)
									
									if (((rotatedCollisionRect[c].x1 == rotatedCollisionRect[c].xyf1.x && rotatedCollisionRect[c].y1 == rotatedCollisionRect[c].xyf1.y) ||
										(rotatedCollisionRect[c].x1 == rotatedCollisionRect[c].xyf2.x && rotatedCollisionRect[c].y1 == rotatedCollisionRect[c].xyf2.y)) && rotatedCollisionRect[(c < 2) ? c+2 : c-2].y1 > rotatedCollisionRect[c].y1 ) {
											
											if (yRatio > xRatio) {
												
												return true;
												
											}
											
										}
										
									if (((rotatedCollisionRect[c].x1 == rotatedCollisionRect[c].xyf1.x && rotatedCollisionRect[c].y2 == rotatedCollisionRect[c].xyf1.y) ||
										(rotatedCollisionRect[c].x1 == rotatedCollisionRect[c].xyf2.x && rotatedCollisionRect[c].y2 == rotatedCollisionRect[c].xyf2.y)) && rotatedCollisionRect[(c < 2) ? c+2 : c-2].x1 > rotatedCollisionRect[c].x1 ) {
											
											if (xRatio > yRatio) {
												
												return true;
												
											}
											
										}
										
									if (((rotatedCollisionRect[c].x1 == rotatedCollisionRect[c].xyf1.x && rotatedCollisionRect[c].y1 == rotatedCollisionRect[c].xyf1.y) ||
										(rotatedCollisionRect[c].x1 == rotatedCollisionRect[c].xyf2.x && rotatedCollisionRect[c].y1 == rotatedCollisionRect[c].xyf2.y)) && rotatedCollisionRect[(c < 2) ? c+2 : c-2].y1 < rotatedCollisionRect[c].y1 ) {
											
											if (yRatio < xRatio) {
												
												return true;
												
											}
											
										}
										
									if (((rotatedCollisionRect[c].x1 == rotatedCollisionRect[c].xyf1.x && rotatedCollisionRect[c].y2 == rotatedCollisionRect[c].xyf1.y) ||
										(rotatedCollisionRect[c].x1 == rotatedCollisionRect[c].xyf2.x && rotatedCollisionRect[c].y2 == rotatedCollisionRect[c].xyf2.y)) && rotatedCollisionRect[(c < 2) ? c+2 : c-2].x1 < rotatedCollisionRect[c].x1 ) {
											
											if (xRatio < yRatio) {
												
												return true;
												
											}
											
										}
									
								}
								
							}
						}*/
						
					}
					break;
				
				case 'circle':
					  // temporary variables to set edges for testing
					  				  
					  let collisionCenter ={
						x:x + (collision.x)*((this.collision_scale.x == 'scale') ? this.scale.x : this.collision_scale.x),
						y:y + (collision.y)*((this.collision_scale.y == 'scale') ? this.scale.y : this.collision_scale.y)
					  }
					  
						if (typeof this.sprite.bitmap === 'undefined') {
						
							return false;
						
						}
						
						//console.log(x + (this.anchor.x * (this.sprite.bitmap.width/this.sprite.frames)),y + (this.anchor.y * this.sprite.bitmap.height),collisionCenter.x,collisionCenter.y,this_angle);
						
						if (this_angle != 0) {

							collisionCenter = $gameBulletHell.rotatePoint(x + this.offset.x + (this.anchor.x * (this.sprite.bitmap.width/(this.sprite.frames*((this.canbetouched) ? 2 : 1)))), y + this.offset.y + (this.anchor.y * this.sprite.bitmap.height),collisionCenter.x,collisionCenter.y,-this_angle)

						}
						
						
					/*this.grCol = new PIXI.Graphics();
	
					this.grCol.beginFill(0x0000FF);
					this.grCol.drawCircle(x + this.offset.x, y + this.offset.y, 2);
					this.grCol.drawCircle(x + this.offset.x + ((this.sprite.bitmap.width/(this.sprite.frames*((this.canbetouched) ? 2 : 1)))), y + this.offset.y + (this.sprite.bitmap.height), 2);
					this.grCol.beginFill(0xFF0000);
					this.grCol.drawCircle(x + this.offset.x + (this.anchor.x * (this.sprite.bitmap.width/(this.sprite.frames*((this.canbetouched) ? 2 : 1)))), y + this.offset.y + (this.anchor.y * this.sprite.bitmap.height), 2);
					this.grCol.beginFill(0x00FF00);
					this.grCol.drawCircle(collisionCenter.x, collisionCenter.y, 2);
					this.grCol.endFill();
					
					Graphics.app.stage.addChild(this.grCol);*/
					  
					  let testX = collisionCenter.x;
					  let testY = collisionCenter.y;

					  // which edge is closest?
					  if (collisionCenter.x < rect.x1)         testX = rect.x1;      // test left edge
					  else if (collisionCenter.x > rect.x2) testX = rect.x2;   // right edge
					  if (collisionCenter.y < rect.y1)         testY = rect.y1;      // top edge
					  else if (collisionCenter.y > rect.y2) testY = rect.y2;   // bottom edge

					  // get distance from closest edges
					  let distX = (collisionCenter.x-testX)/((this.collision_scale.x == 'scale') ? this.scale.x : this.collision_scale.x);
					  let distY = (collisionCenter.y-testY)/((this.collision_scale.y == 'scale') ? this.scale.y : this.collision_scale.y);
					  let distance = Math.sqrt( (distX*distX) + (distY*distY) );

					  // if the distance is less than the radius, collision!
					  if (distance <= collision.radius) {
						return true;
					  }
					  break;
				
				
				
			}
			
		}
		
	}
	
	BulletHellObject.prototype._getDirection = function() {
	
		return (Math.atan2(this.direction.y,this.direction.x) * 180 / Math.PI)
	
	}

	BulletHellObject.prototype.initDir = function(dir, isCircle) {
		
		let direction = dir;
		
		while (direction > 360) {direction -= 360}
		while (direction < 0) {direction += 360}
		
		if (isCircle) {
		
				return {
					x:Math.cos(direction *Math.PI/180), 
					y:Math.sin(direction *Math.PI/180)
				}
		
		} else {
		
				if (direction <= 90) {
					return {
						x:(direction/90),
						y:-((90-direction)/90)
					}
				} else if (direction <= 180) {
					return {
						x:((180-direction)/90),
						y:((direction-90)/90)
					}
				} else if (direction <= 270) {
					return {
						x:-((direction-180)/90),
						y:((270-direction)/90)
					}
				} else if (direction <= 360) {
					return {
						x:-((360-direction)/90),
						y:-((direction-270)/90)
					}
				}
				
		}
		
	}



	BulletHellObject.prototype.initialize = function(args) {		
	
		this.name = args.name, 
		
		this.damage = (typeof args.damage !== 'undefined') ? args.damage : 1,
		
		this.pos = {},
		this.pos.x = args.posx,
		this.pos.y = args.posy,
		
		this.offset = {},
		this.offset.x = (typeof args.offsetx !== 'undefined') ? args.offsetx : 0,
		this.offset.y = (typeof args.offsety !== 'undefined') ? args.offsety : 0,
		
		this.width = args.width,
		this.height = args.height,
		this.speed = args.speed,
		
		this.direction = this.initDir(args.direction,eval(args.directioniscircle));
		this.getDirection = this._getDirection, 
		
		this.sprite = $gameBulletHell.loadImages(args.sprite),
		this.action = args.action,
		this.hp = args.hp,
		this.candie = eval(args.candie),
		this.canbetouched = eval(args.canbetouched),
		this.deathaction = args.deathaction, 
		this.isPlayerShot = eval(args.isPlayerShot), 
		this.isBonus = eval(args.isBonus), 
		this.BonusPower = args.BonusPower, 
		this.tone = [0, 0, 0, 0];
		this.scale = {};
		this.scale.x = (typeof args.scalex !== 'undefined') ? args.scalex : 1,
		this.scale.y = (typeof args.scaley !== 'undefined') ? args.scaley : 1,
			
		this.collision_scale = {};
		this.collision_scale.x = (typeof args.collision_scalex !== 'undefined') ? args.collision_scalex : 1,
		this.collision_scale.y = (typeof args.collision_scaley !== 'undefined') ? args.collision_scaley : 1,
		
		this.zindex = (typeof args.zindex !== 'undefined') ? args.zindex : 0;
		
		this.rotationSpeed = (typeof args.rotationSpeed !== 'undefined') ? args.rotationSpeed : 0;
		this.angle = (typeof args.angle !== 'undefined') ? args.angle : 0;
		this.collision_angle = (typeof args.collision_angle !== 'undefined') ? args.collision_angle : 0;
		
		
		this.blendMode = (typeof args.blendMode !== 'undefined') ? args.blendMode : 0;
		this.anchor = {};
		this.anchor.x = (typeof args.anchorx !== 'undefined') ? args.anchorx : 0.5;
		this.anchor.y = (typeof args.anchory !== 'undefined') ? args.anchory : 0.5;
		
		this.collision = (typeof args.collision !== 'undefined' && args.collision !== null) ? args.collision : [{'type':'rect','x1':0,'y1':0,'x2':this.width,'y2':this.height}],
		
		this.cantbeinstakill = (typeof args.cantbeinstakill !== 'undefined') ? eval(args.cantbeinstakill) : this.canbetouched,
		this.opacity = (typeof args.opacity !== 'undefined') ? args.opacity : 255,
		this.isPlatform = (typeof args.isPlatform !== 'undefined') ? eval(args.isPlatform) : false
	};
	
	
	
	BulletHellObject.prototype.destroy = function() {		
	
		this.name = null
		if (this.action == 89) {
			this.forcesFields = $gameBulletHell.objects.filter(object => object.action == 89);
			this.selfFFid = this.forcesFields.findIndex(item => item == this);
				
			for (let z = 0; z<this.forcesFields.length; z++) {
				let selfID = this.selfFFid;
				let obj = this.forcesFields[z];
				if (typeof obj.connected !== 'undefined') {
					obj.connected.splice(selfID, 1);
					obj.timerFF.splice(selfID, 1);
				}
			}
		}
	};




	BulletHell.prototype.createBHObject = function(args) {
		
		var object = new BulletHellObject(args);
		this.objects.push(object)
		return object;
	}



	BulletHell.prototype.spawnBonus = function(name, x, y, width, height, sprite, power, collision) {
		
	args = {};
	args.name = name;
	args.posx = x;
	args.posy = y;
	args.width = width;
	args.height = height;
	args.speed = 4;
	args.direction = 180;
	args.directioniscircle = "false";
	args.sprite = sprite;
	args.hp = 0;
	args.candie = "false";
	args.canbetouched = "false";
	args.action = 0;
	args.deathaction = 0;
	args.isPlayerShot = "false";
	args.isBonus = "true";
	args.BonusPower = power;
	args.collision = collision || null;
	this.createBHObject(args)

	}
	
	
	
	
	BulletHell.prototype.removeObjectByName = function(name) {
		for (n=0; n<this.objects.length; n++) {
			if (this.objects[n].name == name) {
				this.objects.splice(n,1);
				n -= 1;
				
			}	
		}	
	}
	
	
	
	BulletHell.prototype.getObjectByName = function(name) {
		for (n=0; n<this.objects.length; n++) {
			if (this.objects[n].name == name) {
				return n;
			}
		}	
		return 0;
    };
	
	
	
	BulletHell.prototype.createGasterBlaster = function(x,y,speed,time,collision) {
		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "false";
		args.hp = time;
		args.candie = "true";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 31;
		args.sprite = "null";
		args.width = 96;
		args.height = 114;
		args.posx = x;
		args.posy = y;
		args.direction = (1280/2 + this.bhmaxwidth/2 > x) ? 90 : 270;
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	BulletHell.prototype.createVortex = function(x,y,speed,sprite,percent,collision) {
		
		
		if (percent < 25) {
			tmpy = this.bhmaxheight/2-8;
			tmpx = this.bhmaxwidth/2-8 + (percent/25)*1280;
		}
		else if (percent < 50) {
			tmpy = this.bhmaxheight/2-8 + ((percent-25)/25)*720;
			tmpx = this.bhmaxwidth/2-8 + 1280;
		}
		else if (percent < 75) {
			tmpy = this.bhmaxheight/2-8 + 720;
			tmpx = this.bhmaxwidth/2-8 + 1280 - ((percent-50)/25)*1280;
		}
		else {
			tmpy = this.bhmaxheight/2-8 + 720 - ((percent-75)/25)*720;
			tmpx = this.bhmaxwidth/2-8;
		}

		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "true";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "false";
		args.action = 0;
		args.sprite = sprite;
		args.width = 16;
		args.height = 16;
		args.posx = tmpx;
		args.posy = tmpy;
		args.direction = this.getDirectionToPosition(tmpx-8,tmpy-8,x+this.bhmaxwidth/2,y+this.bhmaxheight/2);
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	BulletHell.prototype.createInvertVortex = function(x,y,speed,sprite,percent,collision) {
		

		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "true";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "false";
		args.action = 0;
		args.sprite = sprite;
		args.width = 16;
		args.height = 16;
		args.posx = x + this.bhmaxwidth/2-8;
		args.posy = y + this.bhmaxheight/2-8;
		args.direction = (percent/100)*359-90;
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	BulletHell.prototype.createGroundJumpingBullet = function(x,y,width,height,speed,direction,sprite,offsetx,offsety,collision,type) {
		
		
		offsetx = offsetx || 0;
		offsety = offsety || 0;
		type = type || 37;
		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "false";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "false";
		args.action = type;
		args.sprite = sprite;
		args.width = width;
		args.height = height;
		args.posx = x;
		args.posy = y;
		args.offsetx = offsetx
		args.offsety = offsety
		args.direction = direction;
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	
	BulletHell.prototype.createExplosiveBullet = function(x,speed,explodePower,collision) {
		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "false";
		args.hp = explodePower;
		args.candie = "true";
		args.canbetouched = "false";
		args.deathaction = 39;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 38;
		args.sprite = 'ppg_explosivebullet@2';
		args.width = 16;
		args.height = 16;
		args.offsety = -32;
		args.offsetx = -8;
		args.posx = x;
		args.posy = this.bhmaxheight/2-16;
		args.direction = 180;
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	
	BulletHell.prototype.createTopHatLetter = function(x,speed,time,collision) {
		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "false";
		args.hp = time;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 35;
		args.sprite = 'ppg_tophat_bottom';
		args.width = 64;
		args.height = 64;
		args.posx = x;
		args.posy = this.bhmaxheight/2-32;
		args.direction = 180;
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	BulletHell.prototype.createCrystalStar = function(x,y,hp,collision) {
		
		args = {};
		args.name = "CrystalStar";
		args.speed = 0;
		args.directioniscircle = "false";
		args.hp = hp;
		args.candie = "false";
		args.canbetouched = "true";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 43;
		args.sprite = 'crystalStar';
		args.width = 87;
		args.height = 87;
		args.posx = x;
		args.posy = y;
		args.direction = 180;
		args.collision = collision || [
		{'type':'circle','x':args.width/2+4,'y':args.height/2+6,'radius': 30},
		{'type':'circle','x':30,'y':71,'radius': 15},
		{'type':'circle','x':64,'y':71,'radius': 15},
		{'type':'circle','x':19,'y':39,'radius': 15},
		{'type':'circle','x':75,'y':39,'radius': 15},
		{'type':'circle','x':47,'y':21,'radius': 15}];
		this.createBHObject(args)
		
	}
	
	BulletHell.prototype.createLaytonMobile = function(y,hp,collision) {
		
		args = {};
		args.name = "LaytonMobile";
		args.speed = 0;
		args.directioniscircle = "false";
		args.hp = hp;
		args.candie = "false";
		args.canbetouched = "true";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 46;
		args.sprite = 'laytonmobile';
		args.width = 242;
		args.height = 264;
		args.posx = -243;
		args.posy = y;
		args.direction = 90;
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	BulletHell.prototype.createTopHatBunny = function(y,direction,speed,time,collision) {
		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "false";
		args.hp = time;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 36;
		args.sprite = direction ? 'ppg_tophat_left' : 'ppg_tophat_right';
		args.width = 64;
		args.height = 64;
		args.posx = direction ? 1280+this.bhmaxwidth/2+32 : this.bhmaxwidth/2-32;
		args.posy = y;
		args.direction = direction ? 270 : 90;
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	

	BulletHell.prototype.createSmallPlatform = function(x,y,speed,collision) {
		
		args = {};
		args.name = "ppgPlatform";
		args.speed = speed;
		args.directioniscircle = "false";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 0;
		args.sprite = 'smallPlatform';
		args.width = 32;
		args.height = 1;
		args.offsety = -3;
		args.offsetx = 0;
		args.posx = x;
		args.posy = y + 3;
		args.direction = (1280/2 + this.bhmaxwidth/2 > x) ? 90 : 270;
		args.isPlatform = "true";
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	BulletHell.prototype.clearSpinningAttack = function() {
		
		for (n=20;n<30;n++) {

			$gameScreen.erasePicture(n);

		}
		
	}
	
	
	BulletHell.prototype.createGiantHammer = function(speed,time,posx,posy,angle,collision) {
		
		args = {};
		args.name = "BigHammer";
		args.speed = 0;
		args.directioniscircle = "true";
		args.hp = time;
		args.candie = "true";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 71;
		args.sprite = "ppg_hammer";
		args.width = 640;
		args.height = 500;
		args.offsetx = 0;
		args.offsety = 0;
		args.anchorx = 0;
		args.posx = posx+100;
		args.posy = posy;
		args.direction = 6;
		args.angle = angle;
		args.collision_angle = 'angle';
		args.rotationSpeed = speed;
		args.opacity = 0;
		args.zindex = 2;
		args.collision = [
		{'type':'rect','x1':0,'y1':229,'x2':640,'y2':43},
		{'type':'rect','x1':387,'y1':0,'x2':215,'y2':500}];
		return this.createBHObject(args)	
		
	}
	
	
	BulletHell.prototype.createSmallHammer = function(speed,time,posx,posy,angle) {
		
				args = {};
				args.name = "SmallHammer";
				args.speed = 0;
				args.directioniscircle = "true";
				args.hp = time;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 71;
				args.sprite = "ppg_smallhammer";
				args.width = 380;
				args.height = 250;
				args.offsetx = 0;
				args.offsety = 0;
				args.anchorx = 0;
				args.posx = posx+100;
				args.posy = posy;
				args.direction = 6;
				args.angle = angle;
				args.collision_angle = 'angle';
				args.rotationSpeed = speed;
				args.opacity = 0;
				args.zindex = 2;
				args.collision = [
				/*{'type':'rect','x1':0,'y1':229,'x2':640,'y2':43},
				{'type':'rect','x1':387,'y1':0,'x2':215,'y2':500}];*/
				{'type':'rect','x1':30,'y1':114,'x2':320,'y2':22},
				{'type':'rect','x1':193+30,'y1':0,'x2':108,'y2':250}];
				this.createBHObject(args)	
		
	}
	
	
	BulletHell.prototype.createDoomFinalLaser = function(speed,time,posx,posy,angle,collision) {
		
		
		args = {};
		args.name = "ppg_finalDoomLaser";
		args.speed = 0;
		args.directioniscircle = "true";
		args.hp = time;
		args.candie = "true";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 71;
		args.sprite = "ppg_finalDoomLaser";
		args.width = 1280;
		args.height = 144;
		args.offsetx = 0;
		args.offsety = 0;
		args.scaley = 0;
		args.anchorx = 0;
		args.posx = posx+100;
		args.posy = posy;
		args.direction = 6;
		args.angle = angle;
		args.collision_angle = 'angle';
		args.rotationSpeed = speed;
		args.opacity = 0;
		args.zindex = 2;
		args.blendMode = 1;
		args.collision = collision || null;
		args.damage = "oneshot";
		this.createBHObject(args)	
		
		$gameScreen.startShake(3, 2, time);
		
	}
	
	
	
	BulletHell.prototype.createPlayerDirigedBullet = function(x,y,sprite,width,height,speed,originId,offsetx,offsety,collision) {
		
		offsetx = offsetx || 0;
		offsety = offsety || 0;
		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "true";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "false";
		args.action = 0;
		args.sprite = sprite;
		args.width = width;
		args.height = height;
		args.offsety = offsety;
		args.offsetx = offsetx;
		args.posx = x;
		args.posy = y;
		args.direction = this.getDirectionToPlayer(originId);
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	
	BulletHell.prototype.createPositionDirigedBullet = function(x,y,targetx,targety,sprite,width,height,speed,offsetx,offsety,collision) {
		
		offsetx = offsetx || 0;
		offsety = offsety || 0;
		
		args = {};
		args.name = "";
		args.speed = speed;
		args.directioniscircle = "true";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "false";
		args.action = 0;
		args.sprite = sprite;
		args.width = width;
		args.height = height;
		args.offsety = offsety;
		args.offsetx = offsetx;
		args.posx = x;
		args.posy = y;
		args.direction = this.getDirectionToPosition(x,y,targetx,targety);
		args.collision = collision || null;
		this.createBHObject(args)
		
	}
	
	
	BulletHell.prototype.createHeartPointer = function(x,y,speed,timer,name,collision) {
		
				args = {};
				args.name = name;
				args.speed = speed;
				args.directioniscircle = "true";
				args.hp = timer;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 41;
				if (name.contains("LaytonMobile")) {
					args.sprite = 'crystalStarCursorLeft';
				} else {
					args.sprite = 'crystalStarCursor';
				}
				args.width = 0;
				args.height = 0;
				args.posx = x;
				args.posy = y;
				args.direction = 0;
				args.collision = collision || null;
				this.createBHObject(args)
		
	}
	
	
	
	BulletHell.prototype.summonGenos = function(x,y,collision) {
		
				args = {};
				args.name = "Genos";
				args.speed = 0;
				args.directioniscircle = "true";
				args.hp = 1;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 68;
				args.sprite = 'Genos@4@7';
				args.width = 41;
				args.height = 88;
				args.posx = x;
				args.posy = y;
				args.direction = 0;
				args.collision = collision || null;
				this.createBHObject(args)
				
				
				args = {};
				args.name = "Genos Aura";
				args.speed = 0;
				args.directioniscircle = "true";
				args.hp = 1;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 67;
				args.sprite = 'ppg_aura@19@5';
				args.width = 0;
				args.height = 0;
				args.posx = x;
				args.posy = y;
				args.direction = 0;
				this.createBHObject(args)
		
	}