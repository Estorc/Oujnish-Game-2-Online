

BulletHell.prototype.loadImages = function(name) {


if (name == "null") {
	
	return name;
	
}

if (!this.objectsSprite.hasOwnProperty(name)) {
	
	let tempSprite = name.split('@');
	
	this.objectsSprite[name] = {
		bitmap: Bitmap.load("img/bhsprite/" + name + ".png"),
		frames: (tempSprite.length >= 2) ? eval(tempSprite[1]) : 1,
		frameDuration: (tempSprite.length == 3) ? eval(tempSprite[2]) : 10,
		name: name
	}
	
}

return this.objectsSprite[name];


}










BulletHell.prototype.drawPlayerCollision = function() {
		
	if (typeof this.PLcollisionSprite !== 'undefined' && this.PLcollisionRectSprite == this.PLRect) {
		
		return this.PLcollisionSprite;
		
	}
		
	let gr = new PIXI.Graphics();
				
					gr.beginFill(0xFF0000);
					gr.drawRect(this.PLRect.x1, this.PLRect.y1 , this.PLRect.x2-this.PLRect.x1, this.PLRect.y2-this.PLRect.y1);
					gr.endFill();
		
	
		let bitmap = new Bitmap(gr.width, gr.height);
		let collisionTexture = Graphics.app.renderer.generateTexture(gr);
		const canvas = Graphics.app.renderer.extract.canvas(collisionTexture);
		let collisionBitmap = new Bitmap(collisionTexture.width,collisionTexture.height);
        bitmap.context.drawImage(canvas, 0, 0);
        canvas.width = 0;
        canvas.height = 0;
		bitmap.baseTexture.update();
		
		this.PLcollisionSprite = new Sprite(bitmap);
		this.PLcollisionRectSprite = this.PLRect;
		
		return this.PLcollisionSprite;
	
		
}




Spriteset_Base.prototype.createPictures = function() {

};





function Spriteset_BulletHell() {
    this.initialize(...arguments);
}

Spriteset_BulletHell.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_BulletHell.prototype.constructor = Spriteset_BulletHell;

Spriteset_BulletHell.prototype.initialize = function() {
    Spriteset_Base.prototype.initialize.call(this);
	$gameBulletHell.loadImages('laytonmobile');
	$gameBulletHell.loadImages('crystalStar');
	$gameBulletHell.loadImages('Truck');
	this.sprite = [];
	this.colmask = [];
	this.collision = [];
	
	const rect = this.pictureContainerRect();
	this._pictureContainer = new Sprite();
	this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
	for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
		this._pictureContainer.addChild(new Sprite_Picture(i));
	}
};



Spriteset_BulletHell.prototype.pictureContainerRect = function() {
    return new Rectangle(0, 0, Graphics.width, Graphics.height);
};

Spriteset_BulletHell.prototype.createLowerLayer = function() {
    this._baseSprite = new Sprite();
    this.addChild(this._baseSprite);
	this.createBaseFilters();
};

Spriteset_BulletHell.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    if ($gameBulletHell.active) { $gameBulletHell.createBHPictureBitmap(this) };
	if ($gameBulletHell.ppg_action == 0) { this.addChild(this._pictureContainer) };
};


Spriteset_BulletHell.prototype.addPlayerSprite = function(sprite,frames,duration,angle) {
	
		if (sprite != null) {
			
				let frame = $gameBulletHell.PLframe;
				this.PLsprite = new Sprite(sprite);
				this.PLsprite.anchor.x = 0;
				this.PLsprite.anchor.y = 0;
				this.PLsprite.angle = angle;
				this.PLsprite.x = $gameVariables.value(83);
				this.PLsprite.y = $gameVariables.value(84);
				this.PLsprite.opacity = Number.isInteger(Math.ceil($gameVariables.value(97) / 4)/2) ? 255 : 0;
				this.PLsprite.scale.y = 1;
				this.PLsprite.scale.x = 1;
				this.PLsprite.zindex = 1;
				
				this.PLsprite.setFrame(frame*(sprite.width/frames),0,sprite.width/frames, sprite.height);
				
				this.addChild(this.PLsprite);
				
				if ($gameBulletHell.showCollisions) {
					
					let plCollision = $gameBulletHell.drawPlayerCollision();
					plCollision.x = $gameVariables.value(83)+$gameBulletHell.PlayerCollisionX1;
					plCollision.y = $gameVariables.value(84)+$gameBulletHell.PlayerCollisionY1;
					plCollision.zindex = 9;
					this.addChild(plCollision)
					
				}

		if ($gameVariables.value(48) < 1) {

				$gameBulletHell.PLDurationFrame +=1
				if ($gameBulletHell.PLDurationFrame >= duration) {
					frame += 1
					$gameBulletHell.PLDurationFrame = 0;
				}
				
		}
				
				if (frame > frames-1) {
					frame = 0;
				}
				
				$gameBulletHell.PLframe = frame;
				
				
		}
	
}


Spriteset_BulletHell.prototype.addSprite = function(i) {
	
		if ($gameBulletHell.objects[i].sprite != "null") {
					
			$gameBulletHell.objects[i].angle += $gameBulletHell.objects[i].rotationSpeed;
			frames = $gameBulletHell.objects[i].sprite.frames
			bhsprite = $gameBulletHell.objects[i].sprite.bitmap
			
			
			
			if ($gameBulletHell.objects[i].canbetouched == true) {
		
				frames += frames;
		
			}
			
				frame = $gameBulletHell.objects[i].frame;
				
				if ($gameBulletHell.objects[i].hitframetimer > 0) {
					$gameBulletHell.objects[i].hitframetimer -= 1;
					frame += $gameBulletHell.objects[i].sprite.frames;
				}
				
				this.sprite[i] = new Sprite(bhsprite);
				this.sprite[i].anchor.x = $gameBulletHell.objects[i].anchor.x;
				this.sprite[i].anchor.y = $gameBulletHell.objects[i].anchor.y;
				this.sprite[i].angle = $gameBulletHell.objects[i].angle;
				this.sprite[i].blendMode = $gameBulletHell.objects[i].blendMode;
				this.sprite[i].x = (bhsprite.width/frames)*this.sprite[i].anchor.x + $gameBulletHell.objects[i].pos.x + $gameBulletHell.objects[i].offset.x - $gameBulletHell.bhmaxwidth/2;
				this.sprite[i].y = bhsprite.height*this.sprite[i].anchor.y + $gameBulletHell.objects[i].pos.y + $gameBulletHell.objects[i].offset.y - $gameBulletHell.bhmaxheight/2;
				this.sprite[i].opacity = $gameBulletHell.objects[i].opacity;
				this.sprite[i].scale.y = $gameBulletHell.objects[i].scale.y;
				this.sprite[i].scale.x = $gameBulletHell.objects[i].scale.x;
				this.sprite[i].zindex = $gameBulletHell.objects[i].zindex;
				
				
				this.sprite[i].setFrame(frame*(bhsprite.width/frames),0,bhsprite.width/frames, bhsprite.height)
				
				this.addChild(this.sprite[i]);

				
				if ($gameBulletHell.showCollisions) {
					
					let colmaskBitmap = new Bitmap(0,0,bhsprite.width,bhsprite.height)
					this.colmask[i] = new Sprite(colmaskBitmap);
					this.colmask[i].anchor.x = this.sprite[i].anchor.x
					this.colmask[i].anchor.y = this.sprite[i].anchor.y
					this.colmask[i].angle = (($gameBulletHell.objects[i].collision_angle == 'angle') ? this.sprite[i].angle : $gameBulletHell.objects[i].collision_angle)
					this.colmask[i].x = this.sprite[i].x
					this.colmask[i].y = this.sprite[i].y
					this.colmask[i].scale.y = (($gameBulletHell.objects[i].collision_scale.y == 'scale') ? this.sprite[i].scale.y : $gameBulletHell.objects[i].collision_scale.y);
					this.colmask[i].scale.x = (($gameBulletHell.objects[i].collision_scale.x == 'scale') ? this.sprite[i].scale.x : $gameBulletHell.objects[i].collision_scale.x);
					this.colmask[i].zindex = 9;
					
					this.collision[i] = $gameBulletHell.objects[i].drawCollision();
					
					this.collision[i].zindex = 9;
					this.collision[i].x = -(bhsprite.width/frames)*this.colmask[i].anchor.x - $gameBulletHell.objects[i].offset.x
					this.collision[i].y = -bhsprite.height*this.colmask[i].anchor.y - $gameBulletHell.objects[i].offset.y
					this.colmask[i].addChild(this.collision[i]);
					this.addChild(this.colmask[i]);
					
				}


				if ($gameBulletHell.objects[i].canbetouched == true && frame > (frames/2)-1) {
					frame -= frames/2;
				}

		if ($gameVariables.value(48) < 1) {

				$gameBulletHell.objects[i].frametimer +=1
				if ($gameBulletHell.objects[i].frametimer >= $gameBulletHell.objects[i].sprite.frameDuration) {
					frame += 1
					$gameBulletHell.objects[i].frametimer = 0;
				}
				
		}
				
				if ($gameBulletHell.objects[i].canbetouched == true) {
			
					frames = frames/2;
			
				}
				
				if (frame > frames-1) {
					frame = 0;
				}
				
				$gameBulletHell.objects[i].frame = frame;
				
				
		} else {
			
			bhsprite = {"width":0, "height":0}
			
		}
		
		return bhsprite
	
}