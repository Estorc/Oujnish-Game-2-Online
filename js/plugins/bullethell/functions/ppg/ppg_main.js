
BulletHell.prototype.PPGTurn = function (thisTurn) {
	if ($tempAniSpeed == 0) {
		$tempAniSpeed = ConfigManager["battleAniSpeed"]
	}
	ConfigManager["battleAniSpeed"] = 0


	if (this.ppg_attackPaternID == 15 && this.ppg_attackPaternWillChange >= 1 && !$gameMessage.isBusy()) {
		
		this.ppg_lastdialogue += 1;
		
	}

	if (this.ppg_attackPaternID == 15 && this.ppg_attackPaternWillChange >= 1 && this.ppg_lastdialogue == 1) {
		AudioManager.playBgm({name: null, pan: 0, pitch: 100, volume: 100});
		$gameMessage.setFaceImage("Oujnish7", 6);
		$gameMessage.setSpeakerName("Paper Professeur Genos");
		$gameMessage.add("It's not over yet kid !");
	}
	
	if (this.ppg_attackPaternID == 15 && this.ppg_attackPaternWillChange >= 1 && this.ppg_lastdialogue == 2) {
		$gameMessage.setFaceImage("Oujnish7", 6);
		$gameMessage.setSpeakerName("Paper Professeur Genos");
		$gameMessage.add("You ascended beyond our control, I shall");
		$gameMessage.add("demolish all of you.");
	}
	
	if (this.ppg_attackPaternID == 15 && this.ppg_attackPaternWillChange >= 1 && this.ppg_lastdialogue == 3) {
		$gameMessage.setFaceImage("Oujnish7", 6);
		$gameMessage.setSpeakerName("Paper Professeur Genos");
		$gameMessage.add("");
		$gameMessage.add("\\n\\{Y o u   g o n n a   g o   t o   h e l l .");
	}
	
	if (!$gameMessage.isBusy()) {
		
		// Do the actions
		if (this.ppg_action == 0) {
			
			this.active = true;
			ppg_currentSubject = null;
			
			if ((this.ppg_attackPaternWillChange >= 1 && this.ppg_attackPaternID == 15) || this.ppg_attackPaternID < 15) {
			
			if (this.ppg_attackPaternID == 15) {
				
				AudioManager.playBgm({name: "stained-brutal-genophobia", pan: 0, pitch: 100, volume: 100});
				$ppgIsDead = 1;
				
			}
			
			this.ppg_lastdialogue = 0;
			this.soulDirection = 8;
			this.plshot_timer = 2;
			this.PlayerCollisionX1 = 10;
			this.PlayerCollisionX2 = 24;
			this.PlayerCollisionY1 = 37;
			this.PlayerCollisionY2 = 52;
			$gameSwitches.setValue(514, false);
			
			AudioManager.playSe({name: 'ppg_noise', pan: 0, pitch: 100, volume: 100});
			
			this.objects = [];
			this.BHBitmap = new Bitmap(1280 + this.bhmaxwidth,720 + this.bhmaxheight);
			
			params = [2, "ppg_attackbg", 0, 0, 0, 0, 100, 100, 255, 0]
			
			let point = Game_Interpreter.prototype.picturePoint.call(null, params);
			// prettier-ignore
			$gameScreen.showPicture(
				params[0], params[1], params[2], point.x, point.y,
				params[6], params[7], params[8], params[9]
			);
			
			
			this.ppg_action = 1;
			const subject = thisTurn._subject;
			const action = subject.currentAction();
			
			let ppg_attackPaternDuration = [1000,1250,2000,1000,1250,10000,2000,2000,1500,15000,1250,20000,2200,2000,0,10000]

				
			//_______________ ATTACK PATERN _____________________________

				if (this.ppg_attackPaternID != 14) {
					
					ppg_attack15_timer = 0;

					args = {};
					args.posx = 0;args.posy = 0;args.offsetx = 0;args.offsety = 0;args.width = 0;args.height = 0;args.speed = 0;args.direction = 0;args.directioniscircle = "false";args.sprite = "null";args.candie = "true";args.canbetouched = "false";args.isPlayerShot = "false";args.isBonus = "false";
					
					args.name = "ppg_atk";
					args.hp = ppg_attackPaternDuration[this.ppg_attackPaternID];
					args.action = 51 + this.ppg_attackPaternID;
					args.deathaction = 50;
					
					this.createBHObject(args)
					
				} else {
					
					ppg_attack15_timer = 3000;
					
				}


			//___________________________________________________________	

			if (this.ppg_attackPaternID == 999) {
				
				for (k = 0;k < 21; k++) {
					
					args = {};
					args.posx = 0;args.posy = 0;args.offsetx = 0;args.offsety = 0;args.width = 0;args.height = 0;args.speed = 0;args.direction = 0;args.directioniscircle = "false";args.sprite = "null";args.candie = "true";args.canbetouched = "false";args.isPlayerShot = "false";args.isBonus = "false";
					
					args.name = "ppg_atk";
					args.hp = ppg_attackPaternDuration[k];
					args.action = 51 + k;
					args.deathaction = 50;
					
					this.createBHObject(args)
					
				}
				
			}
			
			} else {
				
				this.PlayerCollisionX1 = 0;
				this.PlayerCollisionX2 = 0;
				this.PlayerCollisionY1 = 0;
				this.PlayerCollisionY2 = 0;
				$gameVariables.setValue(83, -50);
				$gameScreen.erasePicture(2);
				$gameScreen.erasePicture(4);
				this.clearSpinningAttack();
				this.ppg_action = 0;
				thisTurn.endAction();
				thisTurn._subject = null;
				bhobjects = {object: new Array(0)};
				
			}

			if (this.ppg_attackPaternWillChange >= 1) {
				this.ppg_attackPaternID += 1;
			}
			this.ppg_attackPaternWillChange = 0;

		}
		
		
		var lastx = $gameVariables.value(83);
		var lasty = $gameVariables.value(84);
		
		this.playerCanShot = 1;
		this.playerTypeOfShot = 1;
		
		
		if (ppg_attack15_timer > 0 && ppg_attack15_timer % 600 == 0) {
			
			let attack15pattern = [4,2,8,7,14]
			
			this.clearSpinningAttack();
			
			this.PlayerCollisionX1 = 10;
			this.PlayerCollisionX2 = 24;
			this.PlayerCollisionY1 = 37;
			this.PlayerCollisionY2 = 52;
			
			AudioManager.playSe({name: 'ppg_noise', pan: 0, pitch: 100, volume: 100});
			this.objects = [];
			
			
			params = [2, "ppg_attackbg", 0, 0, 0, 0, 100, 100, 255, 0]
			
			point = Game_Interpreter.prototype.picturePoint.call(null, params);
			// prettier-ignore
			$gameScreen.showPicture(
				params[0], params[1], params[2], point.x, point.y,
				params[6], params[7], params[8], params[9]
			);
			
			
			
					args = {};
					args.posx = 0;args.posy = 0;args.offsetx = 0;args.offsety = 0;args.width = 0;args.height = 0;args.speed = 0;args.direction = 0;args.directioniscircle = "false";args.sprite = "null";args.candie = "true";args.canbetouched = "false";args.isPlayerShot = "false";args.isBonus = "false";
					
					args.name = "ppg_atk";
					args.hp = 1200;
					args.action = 51 + attack15pattern[5 - (ppg_attack15_timer/600)];
					args.deathaction = 50;
					
					this.createBHObject(args)
			
		}
		
		ppg_attack15_timer -= 1;
		
		let gravModifier = 1;
		if (this.soulOnPlatform != 0) {
			$gameVariables.setValue(83, $gameVariables.value(83)+this.soulOnPlatform);
		}
		
		if (this.isBlueSoul) {
			
			this.soulGravity -= 0.25*gravModifier;
		}
		
		$gameVariables.setValue(97, $gameVariables.value(97)-1)
		
		if ($gameVariables.value(97) < 0) {
			
			$gameVariables.setValue(97, 0)
			
		}
		

			
			if ((Input.isPressed("up") || Input.isPressed("ok")) && this.isBlueSoul && ((this.soulJumpPower > 0 && this.soulHasJump) || ((this.soulJumpPower == 0 && Math.abs(this.soulGravity) < 0.5) && !this.soulHasJump))) {
				
				this.soulHasJump = 1;
				
				this.soulJumpPower = (this.soulJumpPower == 0) ? 3 : this.soulJumpPower;
				
				this.soulJumpPower += 0.5*gravModifier;
				if (this.soulJumpPower > 10*gravModifier) {
					
					this.soulJumpPower = 10*gravModifier;
					
				}
			}
				
		if (Input.isPressed("up") && !this.isBlueSoul) {
			
				if (Input.isPressed("shift")) {
					
					$gameVariables.setValue(84, $gameVariables.value(84)-2)
					
				} else {
					
					$gameVariables.setValue(84, $gameVariables.value(84)-5)
					
				}
				
		}
		
		if (!Input.isPressed("up") && !Input.isPressed("ok")) {
			
			this.soulHasJump = 0;
			
		}

		if (Input.isPressed("down") && !this.isBlueSoul) {
			
			if (Input.isPressed("shift")) {
				
				$gameVariables.setValue(84, $gameVariables.value(84)+2)
				
			} else {
				
				$gameVariables.setValue(84, $gameVariables.value(84)+5)
				
			}
			
		}
		
		if (Input.isPressed("left")) {
			
			if (Input.isPressed("shift")) {
				
				$gameVariables.setValue(83, $gameVariables.value(83)-2)
				
			} else {
				
				$gameVariables.setValue(83, $gameVariables.value(83)-5)
				
			}
			
		}

		if (Input.isPressed("right")) {
			
			if (Input.isPressed("shift")) {
				
				$gameVariables.setValue(83, $gameVariables.value(83)+2)
				
			} else {
				
				$gameVariables.setValue(83, $gameVariables.value(83)+5)
				
			}
			
		}
		
		
		if (this.isBlueSoul) {
			$gameVariables.setValue(84, $gameVariables.value(84) - this.soulGravity - this.soulJumpPower);
		}
		
		
		if ($gameVariables.value(83) < 452-9) {
			
			$gameVariables.setValue(83,452-9);
			
		}
		
		if ($gameVariables.value(83) > 1280-452-27) {
			
			$gameVariables.setValue(83,1280-452-27);
			
		}
		
		if ($gameVariables.value(84) < 84-29-5) {
			
			$gameVariables.setValue(84,84-29-5);
			if (this.isBlueSoul) {
				
				this.soulGravity = 0;
				this.soulJumpPower = 0;
				
			}
			
		}
		
		if ($gameVariables.value(84) > 720-260-47-5) {
			
			$gameVariables.setValue(84,720-260-47-5);
			
			if (this.isBlueSoul) {
				
				this.soulGravity = 0;
				this.soulJumpPower = 0;
				
			}
			
		}
		
		
		
		
		/*if (Input.isPressed("cancel") && Input.isPressed("down") && this.plshot_timer <= 0) {
			
			createSmallPlatform(Math.random()*1280 + this.bhmaxwidth/2, Math.random()*600 + 100, 1)
			this.plshot_timer = 3;
			
		}
		
		if (Input.isPressed("cancel") && Input.isPressed("up") && this.plshot_timer <= 0) {
			
			swapSoul()
			this.plshot_timer = 30;
			
		}


		if (Input.isPressed("cancel") && !Input.isPressed("up") && this.plshot_timer <= 0) {
			
			//createGasterBlaster(Math.random()*1280 + this.bhmaxwidth/2, Math.random()*720 + this.bhmaxheight/2, 20, 60)
			//createTopHatLetter(Math.random()*1280 + this.bhmaxwidth/2,20,60)
			//createTopHatBunny(Math.random()*300 + this.bhmaxheight/2,Math.floor(Math.random()*2),20,60)
			//createDoomFinalLaser(3,10000);
			//createInvertVortex(640,272,2,43,vorid)


			
			
			this.plshot_timer = 20;
			
		}*/
		
		if ($gameSwitches.value(517) == true) {
			
			AudioManager.playSe({name: 'Damage4', pan: 0, pitch: 150, volume: 90});
			$gameScreen.startFlash([255, 255, 255, 221], 20);
			$gameSwitches.setValue(517, false);
			
		}
		
		
		if ($gameSwitches.value(516) == true) {
			
			AudioManager.playSe({name: 'Heal2', pan: 0, pitch: 150, volume: 90});
			$gameScreen.startFlash([119, 255, 119, 221], 20);
			$gameVariables.setValue(71, $gameVariables.value(83) + 17);
			$gameVariables.setValue(72, $gameVariables.value(84) + 31);
			
			PluginManager.callCommand(thisTurn, 'TextPicture', 'set', {
			  text: "\\c[4]+\\V[95]XP"
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
				thisTurn.wait(params[10]);
			}
			
			$gameSwitches.setValue(516, false);
			
		}
		
		
		
		
		if ($gameSwitches.value(514) == true) {
			
			playerIsHit(1)
			
		}
		
		
		if (lastx != $gameVariables.value(83) || lasty != $gameVariables.value(84)) {
			
			this.playerHasMove = 1;
			
		} else {
			
			this.playerHasMove = 0;
			
		}
		
		if (this.ppg_stop) {
			this.PlayerCollisionX1 = 0;
			this.PlayerCollisionX2 = 0;
			this.PlayerCollisionY1 = 0;
			this.PlayerCollisionY2 = 0;
			$gameVariables.setValue(83, -50);
			$gameScreen.erasePicture(2);
			$gameScreen.erasePicture(4);
			this.clearSpinningAttack();
			AudioManager.playSe({name: 'ppg_noise', pan: 0, pitch: 100, volume: 100});
			this.ppg_action = 0;
			thisTurn.endAction();
			thisTurn._subject = null;
			$gameScreen.erasePicture(3);
			this.objects = [];
			ConfigManager["battleAniSpeed"] = $tempAniSpeed;
			$tempAniSpeed = 0;
			this.ppg_stop = 0;
			this.active = false;
		}
	}
}