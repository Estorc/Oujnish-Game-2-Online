

	BulletHell.prototype.updateBHWaitFrames = function(a) {
		
		
		if (typeof a.BHWaitFrames !== 'undefined') {
			if ($gameVariables.value(48) >= 1) {
				return true;
			}
			
			a.BHWaitFrames = $BHWaitFrames;

			return (typeof a.BHWaitFrames !== 'undefined' && a.BHWaitFrames < a.BHWaitFramesEnd);
		} else {
			
			return false;
			
		}
		
	}
	
	
	
    BulletHell.prototype.createBHPictureBitmap = function(Spriteset) {
		
		
		if (Input.isTriggered("collisionDebug")) {
			
			this.showCollisions = this.showCollisions ? false : true;
			
		}
		
		this.plshot_timer -= 1;
		
		
		
		if (Input.isPressed("ok") && this.plshot_timer <= 0 && !this.isBlueSoul && this.playerCanShot) {
			
			this.doShot();
			
		}
		
		
		Spriteset.children = [];
		Spriteset.sprite = [];

		if (this.ppg_action == 1) {Spriteset.addChild(Spriteset._pictureContainer)};

		this.PLRect = {
		x1:this.PlayerCollisionX1,
		x2:this.PlayerCollisionX2,
		y1:this.PlayerCollisionY1,
		y2:this.PlayerCollisionY2
		}
		
		
		this.soulOnPlatform = 0;
		
		if ($gameVariables.value(48) < 1) {
		
			$BHWaitFrames += 1;
			
		}
		
		for (i=0; i<this.objects.length; i++) {
			
			
				if (typeof this.objects[i].frame === 'undefined') {
					this.objects[i].frame = 0;
				}
				
				if (typeof this.objects[i].frametimer === 'undefined') {
					this.objects[i].frametimer = 0;
				}
				
				if (typeof this.objects[i].hitframetimer === 'undefined') {
					this.objects[i].hitframetimer = 0;
				}
		if ($gameVariables.value(48) < 1) {
			
			if (this.objects[i].speed > 0) {
					this.objects[i].pos.x += this.objects[i].speed*this.objects[i].direction.x
					this.objects[i].pos.y += this.objects[i].speed*this.objects[i].direction.y
			}
			
					
					
					
					// Object's Action
			
			if (this.objects[i].action != 0) {
				
				this.getActionByID(i,this.objects[i].action,this.objects[i].hp);
				
			}
			
					// Check Object Collision With Player Shot
			
			if (this.objects[i].canbetouched == true) {
				for (n=0; n<this.objects.length; n++) {
					let rect = {
					x1:this.objects[n].pos.x - this.bhmaxwidth/2,
					x2:this.objects[n].width+this.objects[n].pos.x - this.bhmaxwidth/2,
					y1:this.objects[n].pos.y - this.bhmaxheight/2,
					y2:this.objects[n].height+this.objects[n].pos.y - this.bhmaxheight/2
					}
					if (this.objects[n].isPlayerShot == true && (this.objects[i].collisionWithRectangle(rect)))
					{
						this.objects[i].collideWithShot = 1;
						this.objects[i].hp -= 1;
						this.objects[i].hitframetimer = 3;
						AudioManager.playSe({name: 'Thunder2', pan: 0, pitch: 150, volume: 100});
						this.objects[n].destroy();
						this.objects.splice(n, 1);
						if (n < i) {
							i -= 1;
						}
					}
				}
			}
		}
					
					// Draw Sprite
			
			bhsprite = Spriteset.addSprite(i);

				
		if ($gameVariables.value(48) < 1) {
		
					// Object No more HP ?
			
			if (this.objects[i].hp <= 0 && this.objects[i].deathaction != 0) {
				
				this.getActionByID(i,this.objects[i].deathaction,this.objects[i].hp);
				
			}
			
					// Check Object Collision With Player
					
			let rect = {
			x1:this.PLRect.x1+$gameVariables.value(83),
			x2:this.PLRect.x2+$gameVariables.value(83),
			y1:this.PLRect.y1+$gameVariables.value(84),
			y2:this.PLRect.y2+$gameVariables.value(84)
			}
			
			if (this.objects[i].isPlayerShot != true && (this.objects[i].collisionWithRectangle(rect))) 
			{
				
				this.objects[i].collideWithPlayer = 1;
				
				if (this.objects[i].isBonus == true) {
					$gameSwitches.setValue(516, true);
					$gameVariables.setValue(95, this.objects[i].BonusPower);
					$gameVariables.setValue(93, $gameVariables.value(93) + this.objects[i].BonusPower);
				} else {
										
					if (this.objects[i].isPlatform == true) {
						
						if (lastY + 50 <= this.objects[i].pos.y-this.bhmaxheight/2 && this.isBlueSoul && Math.abs(this.soulGravity) > Math.abs(this.soulJumpPower)) {
							$gameVariables.setValue(84, this.objects[i].pos.y-this.bhmaxheight/2-51);
							
							this.soulGravity = 0;
							this.soulJumpPower = 0;
							this.soulOnPlatform = this.objects[i].speed * this.objects[i].direction.x;
						}
						
					} else {
						
						if (this.ppg_action == 1) {
							this.playerIsHit(this.objects[i].damage);
						} else {
							$gameSwitches.setValue(514, true);
						}
					
					}
				}
				if ((this.objects[i].cantbeinstakill != true) || (this.objects[i].pos.x < -bhsprite.width || this.objects[i].pos.x > 1280 + this.bhmaxwidth + bhsprite.width || this.objects[i].pos.y < -bhsprite.height || this.objects[i].pos.y > 720 + this.bhmaxheight + bhsprite.height || (this.objects[i].hp <= 0 && this.objects[i].candie == true))) {
					this.objects[i].destroy();
					this.objects.splice(i, 1);
					i -= 1;
				}
			}	
			
			
					// Check if Object no more exist
			
			else if (this.objects[i].pos.x < -bhsprite.width || this.objects[i].pos.x > 1280 + this.bhmaxwidth + bhsprite.width || this.objects[i].pos.y < -bhsprite.height-200 || this.objects[i].pos.y > 720 + this.bhmaxheight + bhsprite.height || (this.objects[i].hp <= 0 && this.objects[i].candie == true)) {
				this.objects[i].destroy();
				this.objects.splice(i, 1);
				i -= 1;
			}
		}
		}	
		 this.objects = this.objects.filter(function(n) {
		   return n
		 });
		 lastY = $gameVariables.value(84);
		 
		 
		//this.spinningAttackCollision();
		
		if (this.ppg_action == 1) {
			
			let playerSprite = this.loadImages(this.isBlueSoul ? "ppg_soul_bluesoul" : `ppg_soul${this.soulDirection}`)
			
			Spriteset.addPlayerSprite(playerSprite.bitmap,playerSprite.frames,playerSprite.frameDuration,0);
			
		}
		if (this.TruckPursuit == 1) {
			
			if (this.lastX != $gameVariables.value(83) || this.lastY != $gameVariables.value(84)) {
				let playerSprite = this.loadImages('Thanosnish@4@10')
				Spriteset.addPlayerSprite(playerSprite.bitmap,playerSprite.frames,playerSprite.frameDuration,0);
	
			} else {
				$gameBulletHell.PLframe = 0;
				let playerSprite = this.loadImages('Thanosnish')
				Spriteset.addPlayerSprite(playerSprite.bitmap,playerSprite.frames,playerSprite.frameDuration,0);

			}
			
		}
		
		Spriteset.children.sort((a, b) => a.zindex - b.zindex);

		this.playerCanShot = 0;
		this.lastX = $gameVariables.value(83);
		this.lastY = $gameVariables.value(84);
    }

    BulletHell.prototype.destroyBHPictureBitmap = function(bitmap) {
        if (bitmap && bitmap.mzkp_isTextPicture) {
            bitmap.destroy();
			bhobjects = {object: new Array(0)};
			this.BHBitmap  = new Bitmap(1280 + this.bhmaxwidth,720 + this.bhmaxheight);
        }
    }
	
	
	
	BulletHell.prototype.playerIsHit = function(damage) {
		
			if (damage == "oneshot") {
					this.getHitDamage("oneshot");
					return 0;
			}
		
			switch ($gameVariables.value(1000)) {
				case 0:
					this.getHitDamage(150*damage);
				break;
				case 1:
					this.getHitDamage(150*damage);
				break;
				case 2:
					this.getHitDamage(200*damage);
				break;
				case 3:
					this.getHitDamage(250*damage);
				break;
				case 4:
					this.getHitDamage(500*damage);
				break;
				case 5:
					this.getHitDamage("oneshot");
				break;
			}
			
			$gameSwitches.setValue(514, false);
		
	}


	BulletHell.prototype.getHitDamage = function(damage) {
		
			AudioManager.playSe({name: 'Darkness6', pan: 0, pitch: 150, volume: 90});
			$gameScreen.startFlash([170, 0, 255, 221], 20);
			$gameVariables.setValue(71, $gameVariables.value(83) + 17);
			$gameVariables.setValue(72, $gameVariables.value(84) + 31);
			
			if (damage != "oneshot") {
			
				PluginManager.callCommand(this, 'TextPicture', 'set', {
				  text: "\\c[18]-" + damage.toString()
				});
		
				params = [56, "", 1, 1, 71, 72, 100, 100, 255, 0]
				
				point = Game_Interpreter.prototype.picturePoint.call(null, params);
				// prettier-ignore
				$gameScreen.showPicture(
					params[0], params[1], params[2], point.x, point.y,
					params[6], params[7], params[8], params[9]
				);
				
				$gameVariables.setValue(72,$gameVariables.value(72) -100);
				
				params = [56, 0, 1, 1, 71, 72, 100, 100, 0, 0, 60, false, 0]
				
				point = Game_Interpreter.prototype.picturePoint.call(null, params);
				
				$gameScreen.movePicture(
					params[0], params[2], point.x, point.y, params[6], params[7],
					params[8], params[9], params[10], params[12] || 0
				);
				if (params[11]) {
					this.wait(params[10]);
				}
			
			}
			
			/*if ($gameVariables.value(1000) == 0) {
				$gameVariables.setValue(97, ($gameParty.members()[0].def + $gameParty.members()[1].def + $gameParty.members()[2].def + $gameParty.members()[3].def)/10);
			} else {
			$gameVariables.setValue(97, ($gameParty.members()[0].def + $gameParty.members()[1].def + $gameParty.members()[2].def + $gameParty.members()[3].def)/($gameVariables.value(1000)*10));
			}*/
			
			let value;
			
			if (damage == "oneshot") {
				value = Game_Interpreter.prototype.operateValue(1, 0, 9999999);			
			} else {
				value = Game_Interpreter.prototype.operateValue(1, 0, damage);
			}
			Game_Interpreter.prototype.iterateActorEx(0, 0, actor => {
				Game_Interpreter.prototype.changeHp(actor, value, true);
			});
		
	}
	
	
	
	
	BulletHell.prototype.swapSoul = function(type) {
		
		
		type = type || "none"
		
		AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 100});
		
		if (type == "none") {
			
			type = this.isBlueSoul ? "yellow" : "blue";
			
		}
		
		if (type == "blue") {
			
			this.isBlueSoul = 1;
			
		} else {
			
			this.isBlueSoul = 0;
			this.soulGravity = 0;
			this.soulJumpPower = 0;
			
		}
		
	}