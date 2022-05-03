	BulletHell.prototype.getActionByID = function(index,actionid,maxhp) {
		
		switch (actionid) {
			case 1: // Lose Life progressively

this.objects[index].hp -= 1;
break;

			case 2: // Thanos Car Bullet Explosion


for (n=0;n<30;n++) {
	args = {};
	args.name = "";
	args.posx = this.objects[index].pos.x;
	args.posy = this.objects[index].pos.y;
	args.width = 16;
	args.height = 16;
	args.speed = 7;
	args.direction = this.getRandomInt(360);
	args.directioniscircle = "true";
	args.sprite = 'thanoscarbullet';
	args.hp = 0;
	args.candie = "false";
	args.canbetouched = "false";
	args.action = 0;
	args.deathaction = 0;
	args.isPlayerShot = "false";
	args.isBonus = "false";
	this.createBHObject(args)
}
break;

			case 3: // Appear and Dispear Enemy 1 Type A

	if (this.objects[index].pos.y > 160 && this.objects[index].speed != -5) {
		this.objects[index].speed = 0;
		if (typeof this.objects[index].timer === 'undefined') {
			this.objects[index].timer = 0;
		}
		this.objects[index].timer += 1;
		
	}
	
	if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 30)) {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x + this.objects[index].width/2 - 8;
		args.posy = this.objects[index].pos.y + this.objects[index].height/2 - 8;
		args.width = 16;
		args.height = 16;
		args.speed = 7;
		args.direction = this.getDirectionToPlayer(index);
		args.directioniscircle = "true";
		args.sprite = 'thanoscarbullet';
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.action = 0;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		this.createBHObject(args)
		
	}
	
	if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer > 240) {
		
		this.objects[index].speed = 5;
		this.objects[index].direction.y = -1;
		this.objects[index].direction.x = 0;
		
	}
		
break;
		
			case 4: // Death Enemy 1
			
		$gameSwitches.setValue(517, "true");
		
		this.spawnBonus("MinusBonus", this.objects[index].pos.x + this.objects[index].width/2 - 8, this.objects[index].pos.y + this.objects[index].height/2 - 8, 12, 12, 'SmallBonus', 1)
		
break;

			case 5: // Appear and Dispear Enemy 2 Type A

	if (typeof this.objects[index].timer === 'undefined') {
		this.objects[index].timer = 0;
	}
	this.objects[index].timer += 1;
	
	if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 60)) {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x + this.objects[index].width/2 - 8;
		args.posy = this.objects[index].pos.y + this.objects[index].height/2 - 8;
		args.width = 16;
		args.height = 16;
		args.speed = 7;
		args.direction = this.getDirectionToPlayer(index);
		args.directioniscircle = "true";
		args.sprite = 'thanoscarbullet';
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.action = 0;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		this.createBHObject(args)
		args.direction += 30;
		this.createBHObject(args)
		args.direction -= 60;
		this.createBHObject(args)
		
	}
		
break;
		
			case 6: // Death Enemy 2
			
		$gameSwitches.setValue(517, "true");
		
		this.spawnBonus("BigBonus", this.objects[index].pos.x + this.objects[index].width/2 - 8, this.objects[index].pos.y + this.objects[index].height/2 - 8, 16, 16, 'BigBonus', 3)
		
break;

			case 7: // Appear and Dispear Enemy 2 Type B

	if (this.objects[index].pos.y > 150 && this.objects[index].speed != -5) {
		this.objects[index].speed = 0;
		if (typeof this.objects[index].timer === 'undefined') {
			this.objects[index].timer = 0;
		}
		this.objects[index].timer += 1;
		
	}
	
	if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer == 60) {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x + this.objects[index].width/2 - 8;
		args.posy = this.objects[index].pos.y + this.objects[index].height/2 - 8;
		args.width = 16;
		args.height = 16;
		args.speed = 7;
		args.direction = 0;
		args.directioniscircle = "true";
		args.sprite = 'thanoscarbullet';
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.action = 0;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		for (n=0;n<7;n++) {
			this.createBHObject(args)
			args.direction += 45;
		}
		
	}
	
	if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer > 120) {
		
		this.objects[index].speed = 2;
		this.objects[index].direction.y = -1;
		this.objects[index].direction.x = 0;
		
	}
break;

			case 8: // Appear and Dispear Enemy 1 Type B

	if (typeof this.objects[index].timer === 'undefined') {
		this.objects[index].timer = 0;
	}
	this.objects[index].timer += 1;
	
	if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 120)) {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x + this.objects[index].width/2 - 8;
		args.posy = this.objects[index].pos.y + this.objects[index].height/2 - 8;
		args.width = 16;
		args.height = 16;
		args.speed = 7;
		args.direction = this.getDirectionToPlayer(index);
		args.directioniscircle = "true";
		args.sprite = 'thanoscarbullet';
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.action = 0;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		this.createBHObject(args)
		
	}
		
break;


			case 9: // Appear and Dispear Enemy 1 Type C

	if (this.objects[index].pos.y > 500 && this.objects[index].direction.y > 0) {
		
		if (this.objects[index].pos.x < 640) {
			
			this.changeDir(1,index);
			
		} else {
			
			this.changeDir(-1,index);
			
		}
		
	}
	
	if (typeof this.objects[index].timer === 'undefined') {
		this.objects[index].timer = 0;
	}
	this.objects[index].timer += 1;
	
	if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 240)) {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x + this.objects[index].width/2 - 8;
		args.posy = this.objects[index].pos.y + this.objects[index].height/2 - 8;
		args.width = 16;
		args.height = 16;
		args.speed = 7;
		args.direction = this.getDirectionToPlayer(index);
		args.directioniscircle = "true";
		args.sprite = 'thanoscarbullet';
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.action = 0;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		this.createBHObject(args)
		
	}
		
break;


			case 10: // Appear and Dispear Boss

	if (this.objects[index].pos.y > (this.bhmaxheight/2)-2 && this.objects[index].speed != -5) {
		this.objects[index].speed = 0;
		if (typeof this.objects[index].timer === 'undefined') {
			this.objects[index].timer = 0;
		}
		
		if (typeof this.objects[index].temptimer === 'undefined') {
			this.objects[index].temptimer = 0;
		}
		
		if (typeof this.objects[index].canshot === 'undefined') {
			this.objects[index].canshot = "true";
		}
		
		this.objects[index].timer += 1;
		this.objects[index].temptimer += 1;
		
	}
	
	$gameVariables.setValue(96,this.objects[index].hp);
	
	if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 60) && this.objects[index].canshot == "true") {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x + 120-8;
		args.posy = this.objects[index].pos.y + 242-8;
		args.width = 16;
		args.height = 16;
		args.speed = 7;
		args.direction = this.getDirectionToPlayer(index);
		args.directioniscircle = "true";
		args.sprite = 'thanoscarbullet';
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.action = 0;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		this.createBHObject(args)
		args.posx = this.objects[index].pos.x + 30-8;
		args.posy = this.objects[index].pos.y + 171-8;
		this.createBHObject(args)
		args.posx = this.objects[index].pos.x + 210-8;
		args.posy = this.objects[index].pos.y + 171-8;
		this.createBHObject(args)
		
	}
	
	
	
	if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 1000)) {
		
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 32, 32, 32, 'UltraBonus@16', 10)
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 64, 32, 32, 'UltraBonus@16', 10)
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 96, 32, 32, 'UltraBonus@16', 10)
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 128, 32, 32, 'UltraBonus@16', 10)
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 160, 32, 32, 'UltraBonus@16', 10)
	}
	
	
	
	if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer < 1000) {

			args = {};
			args.name = "";
			args.posy = -32;
			args.width = 36;
			args.height = 32;
			args.speed = 3;
			args.direction = 180;
			args.directioniscircle = "false";
			args.sprite = 'blueangel@4';
			args.hp = 3;
			args.candie = "true";
			args.canbetouched = "true";
			args.action = 9;
			args.deathaction = 4;
			args.isPlayerShot = "false";
			args.isBonus = "false";

		if (typeof this.objects[index].temptimer !== 'undefined' && this.objects[index].temptimer == 120) {
			args.posx = 200 - 18;
			this.createBHObject(args)
			args.posx = 260 - 18;
			this.createBHObject(args)
		}
		
		if (typeof this.objects[index].temptimer !== 'undefined' && this.objects[index].temptimer == 240) {
			args.posx = 1080 - 18;
			this.createBHObject(args)
			args.posx = 1020 - 18;
			this.createBHObject(args)
			
			this.objects[index].temptimer = 0;
		}
	}
	
	
	
	
	else if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer < 2000) {
		
			args = {};
			args.name = "";
			args.posy = -32;
			args.width = 36;
			args.height = 32;
			args.speed = 2;
			args.direction = 180;
			args.directioniscircle = "false";
			args.sprite = 'redangel@4';
			args.hp = 3;
			args.candie = "true";
			args.canbetouched = "true";
			args.action = 7;
			args.deathaction = 6;
			args.isPlayerShot = "false";
			args.isBonus = "false";

		if (typeof this.objects[index].temptimer !== 'undefined' && Number.isInteger(this.objects[index].temptimer / 30)) {
			
			varTemp = this.getRandomInt(2);
			
			args.posx = (varTemp == 1) ? this.getRandomInt(440) - 18 : this.getRandomInt(440) + 840 -18;
			this.createBHObject(args)
		}
	}
	
	
	else if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer < 3000) {
		
		this.objects[index].canshot = "false";
		
		if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].temptimer / 20)) {
			
			args = {};
			args.name = "";
			args.posx = this.objects[index].pos.x + 120-8;
			args.posy = this.objects[index].pos.y + 242-8;
			args.width = 16;
			args.height = 16;
			args.speed = 7;
			args.direction = this.getRandomInt(360);
			args.directioniscircle = "true";
			args.sprite = 'thanoscarbullet';
			args.hp = 0;
			args.candie = "false";
			args.canbetouched = "false";
			args.action = 0;
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			for (n=0;n<8;n++) {
				this.createBHObject(args)
				args.direction += 45;
				if (args.direction > 360) {
					args.direction -= 360;
				}
			}
			
		}
		
		
		if (this.objects[index].temptimer > 80) {
			args = {};
			args.name = "";
			args.posx = this.getRandomInt(1264);
			args.posy = 0;
			args.width = 0;
			args.height = 0;
			args.speed = 0;
			args.direction = 0;
			args.directioniscircle = "false";
			args.sprite = 'danger';
			args.hp = 180;
			args.candie = "true";
			args.canbetouched = "false";
			args.action = 11;
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			this.createBHObject(args)
			this.objects[index].temptimer = 0;
		}
	}
	
	
	
	else if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer < 4000) {
		
		if (this.objects[index].canshot != "true") {
			varTemp = 0;
			this.objects[index].temptimer = 0;
			this.objects[index].canshot = "true";
		}

		if (typeof this.objects[index].temptimer !== 'undefined' && Number.isInteger(this.objects[index].temptimer / 60) && varTemp <= 480) {

			args = {};
			args.name = "";
			args.posx = 80 + varTemp -18 + this.bhmaxwidth/2;
			args.posy = -32;
			args.width = 36;
			args.height = 32;
			args.speed = 5;
			args.direction = 180;
			args.directioniscircle = "false";
			args.sprite = 'blueangel@4';
			args.hp = 3;
			args.candie = "true";
			args.canbetouched = "true";
			args.action = 3;
			args.deathaction = 4;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			
			this.createBHObject(args)
			
			args.posx = 1200 - varTemp -18;
			
			varTemp += 120;
			
			this.createBHObject(args)
		}
	} else if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer > 4000) {

		varTemp = 0;
		this.objects[index].temptimer = 0;
		this.objects[index].canshot = "true";
		this.objects[index].timer = 0;

	}
		
break;

			case 11: // Laser Danger
			

this.objects[index].hp -= 1;

if (this.objects[index].hp != 0) {
	if (Number.isInteger(this.objects[index].hp / 30)) {
				
	this.objects[index].pos.y = 0;

	}

	if (Number.isInteger(this.objects[index].hp / 60)) {
				
	this.objects[index].pos.y = this.bhmaxheight/2;
	AudioManager.playSe({name: 'Siren', pan: 0, pitch: 150, volume: 100});

	}
}

if (this.objects[index].hp == 0) {
	
if (typeof this.objects[index].timer === 'undefined') {
	this.objects[index].timer = 0;
	AudioManager.playSe({name: 'Darkness4', pan: 0, pitch: 100, volume: 90});
}
this.objects[index].timer += 1;
	
	args = {};
	args.name = "";
	args.posx = this.objects[index].pos.x;
	args.posy = this.objects[index].pos.y-32;
	args.width = 16;
	args.height = 16;
	args.speed = 16;
	args.direction = 180;
	args.directioniscircle = "false";
	args.sprite = 'thanoscarlaser';
	args.hp = 0;
	args.candie = "false";
	args.canbetouched = "false";
	args.action = 0;
	args.deathaction = 0;
	args.isPlayerShot = "false";
	args.isBonus = "false";
	this.createBHObject(args)
	
	
if (this.objects[index].timer <= 60) {
	
	this.objects[index].hp = 1;
	
}
	
}

break;


			case 12: // Boss Death
			
	$gameVariables.setValue(96,0);
	this.objects[index].candie = false;
			
break;




			case 13: // Appear and Dispear Beast

	if (this.objects[index].pos.y > (this.bhmaxheight/2)-2 && this.objects[index].speed != -5) {
		this.objects[index].speed = 0;
		if (typeof this.objects[index].timer === 'undefined') {
			this.objects[index].timer = 0;
		}
		
		if (typeof this.objects[index].temptimer === 'undefined') {
			this.objects[index].temptimer = 0;
		}
		
		if (typeof this.objects[index].canshot === 'undefined') {
			this.objects[index].canshot = 0;
			if (this.objects[index].timer == 0) {
				
				args = {};
				args.name = "";
				args.width = 0;
				args.height = 0;
				args.speed = 0;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.posx = 1380;
				args.posy = 0;
				args.directioniscircle = "true";
				args.sprite = 'THEDISK@20';
				args.direction = 90;
				args.action = 18;
				args.hp = 800;
				args.zindex = -1;
				this.createBHObject(args)
			}
		}
		
		if (this.objects[index].hp < 3000 && this.objects[index].canshot == 0) {
			
				args = {};
				args.name = "";
				args.width = 0;
				args.height = 0;
				args.speed = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.posx = 1380;
				args.posy = 0;
				args.directioniscircle = "true";
				args.sprite = 'THEDISK@20';
				args.direction = 90;
				args.action = 18;
				args.hp = 800;
				args.zindex = -1;
				this.createBHObject(args)
			this.objects[index].canshot += 1;
			
		}
		
		if (this.objects[index].hp < 1500 && this.objects[index].canshot <= 1 && $gameVariables.value(1000) > 1) {
			
				args = {};
				args.name = "";
				args.posx = this.objects[index].pos.x + 120-8;
				args.posy = this.objects[index].pos.y + 242-8;
				args.width = 16;
				args.height = 16;
				if ($gameVariables.value(1000) >= 4) {
					args.speed = 2;
				} else {
					args.speed = 1;
				}
				args.direction = 0;
				args.directioniscircle = "true";
				args.sprite = 'HellBullet@2';
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.action = 23;
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				this.createBHObject(args)
			this.objects[index].canshot += 1;
			
		}
		
		this.objects[index].timer += 1;
		this.objects[index].temptimer += 1;
		
	}
	
	$gameVariables.setValue(96,this.objects[index].hp);
	
	if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 60) && this.objects[index].canshot == "true") {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x + 120-8;
		args.posy = this.objects[index].pos.y + 242-8;
		args.width = 16;
		args.height = 16;
		args.speed = 7;
		args.direction = this.getDirectionToPlayer(index);
		args.directioniscircle = "true";
		args.sprite = 'thanoscarbullet';
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.action = 0;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		this.createBHObject(args)
		args.posx = this.objects[index].pos.x + 30-8;
		args.posy = this.objects[index].pos.y + 171-8;
		this.createBHObject(args)
		args.posx = this.objects[index].pos.x + 210-8;
		args.posy = this.objects[index].pos.y + 171-8;
		this.createBHObject(args)
		
	}
	
	
	
	if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 1000) && (this.objects[index].timer != 3000)) {
		
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 32, 32, 32, 'UltraBonus@16', 10)
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 64, 32, 32, 'UltraBonus@16', 10)
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 96, 32, 32, 'UltraBonus@16', 10)
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 128, 32, 32, 'UltraBonus@16', 10)
		this.spawnBonus("UltraBonus", this.getRandomInt(1280) - 8, this.bhmaxheight/2 - 160, 32, 32, 'UltraBonus@16', 10)
	}
	
	
	
	if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer < 1000) {

		if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer == 1) {
			args = {};
			args.name = "";
			args.width = 0;
			args.height = 0;
			args.speed = 0;
			args.direction = 0;
			args.directioniscircle = "false";
			args.sprite = 'beastdanger';
			args.hp = 180;
			args.candie = "true";
			args.canbetouched = "false";
			args.action = 14;
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			args.posx = this.objects[index].pos.x + 89;
			args.posy = this.objects[index].pos.y + 118;
			this.createBHObject(args)
		}
		
		
		
		
		
		
		
			args = {};
			args.name = "";
			args.posy = -32;
			args.width = 36;
			args.height = 32;
			args.speed = 3;
			args.direction = 180;
			args.directioniscircle = "false";
			args.sprite = 'blueangel@4';
			args.hp = 3;
			args.candie = "true";
			args.canbetouched = "true";
			args.action = 9;
			args.deathaction = 4;
			args.isPlayerShot = "false";
			args.isBonus = "false";

		if (typeof this.objects[index].temptimer !== 'undefined' && this.objects[index].temptimer == 120) {
			args.posx = 200 - 18;
			this.createBHObject(args)
			args.posx = 260 - 18;
			this.createBHObject(args)
		}
		
		if (typeof this.objects[index].temptimer !== 'undefined' && this.objects[index].temptimer == 240) {
			args.posx = 1080 - 18;
			this.createBHObject(args)
			args.posx = 1020 - 18;
			this.createBHObject(args)
			
			this.objects[index].temptimer = 0;
		}
	}
	
	
	
	
	else if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer < 2000) {
		
		
		if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer == 1200) {
			args = {};
			args.name = "";
			args.width = 0;
			args.height = 0;
			args.speed = 0;
			args.direction = 0;
			args.directioniscircle = "false";
			args.sprite = 'thanoscarbullet';
			args.hp = 1;
			args.candie = "true";
			args.canbetouched = "false";
			args.action = 20;
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			args.posx = 0;
			args.posy = 0;
			this.createBHObject(args)
		}
		
		if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 6)) {
			
			args = {};
			args.name = "bossbulletd";
			args.posx = this.bhmaxwidth/2 + this.getRandomInt(1281);
			args.posy = this.bhmaxheight/2 - 16;
			args.width = 16;
			args.height = 16;
			args.speed = 2;
			args.direction = 180;
			args.directioniscircle = "false";
			args.sprite = 'thanoscarbullet';
			args.hp = 1;
			args.candie = "true";
			args.canbetouched = "false";
			args.action = 0;
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			this.createBHObject(args)
			args.posx = this.bhmaxwidth/2 - 16;
			args.posy = this.bhmaxheight/2 + this.getRandomInt(721);
			args.direction = 90;
			this.createBHObject(args)
			
		}
		

	}
	
	
	else if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer < 4000) {
				
				
		if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer == 2000) {
		
			$gameSwitches.setValue(517, "true");
			varTemp = 0;
		
			for (k=0; k<this.objects.length; k++) {
				if (this.objects[k].name == "bossbulletd") {
					this.objects[k].hp = 0;
					
				}	
			}
			
		}
		
		
		
		if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 1) && varTemp == 0) {
			
			args = {};
			args.name = "WaruBullet";
			args.posx = this.objects[index].pos.x + 120-8;
			args.posy = this.objects[index].pos.y + 242-8;
			args.width = 16;
			args.height = 16;
			args.speed = 2;
			args.direction = -5 + this.getRandomInt(180);
			args.directioniscircle = "true";
			args.sprite = 'thanoscarbullet';
			args.hp = 0;
			args.candie = "false";
			args.canbetouched = "false";
			args.action = 0;
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			this.createBHObject(args)
			
		}
		
		
		if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 150)) {
			
			varTemp += 1;
			
			switch (varTemp) {
				case 1:
					$gameSwitches.setValue(517, "true");
					AudioManager.playSe({name: 'The-World', pan: 0, pitch: 100, volume: 20});
					BeastMusic = AudioManager.saveBgm();
					AudioManager.stopBgm();
				
					for (k=0; k<this.objects.length; k++) {
						if (this.objects[k].name == "WaruBullet") {
							this.objects[k].sprite = this.loadImages('WarudoBullet');
							this.objects[k].speed = 0;
							
						}	
					}
				
				break;
			
				case 2:
					$gameSwitches.setValue(517, "true");
					AudioManager.replayBgm(BeastMusic);
					
					for (k=0; k<this.objects.length; k++) {
						if (this.objects[k].name == "WaruBullet") {
							this.objects[k].sprite = this.loadImages('thanoscarbullet');
							this.objects[k].speed = 16;
							this.objects[k].direction.x = Math.cos(this.getDirectionToPlayer(k) *Math.PI/180);
							this.objects[k].direction.y = Math.sin(this.getDirectionToPlayer(k) *Math.PI/180);
							
						}	
					}
					
				break;
				
				case 3:
				if (this.objects[index].timer < 3500) {
					varTemp = 0;
				}
				
				break;
			}
			
			
		}
		
		
		if (typeof this.objects[index].timer !== 'undefined' && Number.isInteger(this.objects[index].timer / 50)) {
			
			
			if (varTemp == 1) {
				
				AudioManager.playSe({name: 'Switch1', pan: 0, pitch: 90, volume: 100});
				
			}
			
			
		}
	}
	
	
	
	else if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer < 5000) {
		
		if (typeof varTemp === 'undefined' || this.objects[index].timer == 3000) {
			varTemp = 0;
			this.objects[index].temptimer = 0;
		}

		if (typeof this.objects[index].temptimer !== 'undefined' && Number.isInteger(this.objects[index].temptimer / 60) && varTemp <= 480) {

			args = {};
			args.name = "";
			args.posx = 80 + varTemp -18 + this.bhmaxwidth/2;
			args.posy = -32;
			args.width = 36;
			args.height = 32;
			args.speed = 5;
			args.direction = 180;
			args.directioniscircle = "false";
			args.sprite = 'blueangel@4';
			args.hp = 3;
			args.candie = "true";
			args.canbetouched = "true";
			args.action = 3;
			args.deathaction = 4;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			
			this.createBHObject(args)
			
			args.posx = 1200 - varTemp -18;
			
			varTemp += 120;
			
			this.createBHObject(args)
		}
	} else if (typeof this.objects[index].timer !== 'undefined' && this.objects[index].timer > 5000) {

		varTemp = 0;
		this.objects[index].temptimer = 0;
		this.objects[index].timer = 0;

	}
		
break;



			case 14: // Beast Big Laser Danger
			

if (this.objects[index].hp != 0) {
	if (Number.isInteger(this.objects[index].hp / 30)) {
				
	this.objects[index].offset.y -= 1000;

	}

	if (Number.isInteger(this.objects[index].hp / 60)) {
				
	this.objects[index].offset.y = 0;
	AudioManager.playSe({name: 'Siren', pan: 0, pitch: 130, volume: 100});

	}
}

this.objects[index].hp -= 1;

if (this.objects[index].hp == 0) {
	
	this.objects[index].offset.y = 0;
	
if (typeof this.objects[index].timer === 'undefined') {
	this.objects[index].timer = 0;
	AudioManager.playSe({name: 'Darkness4', pan: 0, pitch: 100, volume: 90});
}
	
	args = {};
	args.name = "";
	args.posx = this.objects[index].pos.x;
	args.posy = this.objects[index].pos.y;
	args.offsetx = -8;
	args.offsety = 0;
	args.width = 64;
	args.height = 128;
	args.speed = 0;
	args.direction = 0;
	args.directioniscircle = "false";
	args.sprite = 'beastbiglaser';
	args.hp = 300;
	args.candie = "true";
	args.canbetouched = "false";
	args.action = 15;
	args.deathaction = 0;
	args.isPlayerShot = "false";
	args.isBonus = "false";
	this.createBHObject(args)
	
}

break;



			case 15: // Beast Big Laser
			
if (this.objects[index].hp == 299) {

	args = {};
	args.name = "";
	args.posx = this.objects[index].pos.x;
	args.posy = this.objects[index].pos.y+this.objects[index].height;
	args.offsetx = -8;
	args.offsety = 0;
	args.width = 64;
	args.height = 32;
	args.speed = 0;
	args.direction = 0;
	args.directioniscircle = "false";
	args.sprite = 'beastbiglaser2';
	args.hp = 300;
	args.candie = "true";
	args.canbetouched = "false";
	args.action = 15;
	args.deathaction = 0;
	args.isPlayerShot = "false";
	args.cantbeinstakill = "true";
	args.isBonus = "false";
	this.createBHObject(args)

}



	if (Number.isInteger(this.objects[index].hp / 5) && this.getRandomInt(5) == 0) {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x + this.objects[index].width/2-8;
		args.posy = this.objects[index].pos.y + Math.random()*this.objects[index].height;
		args.width = 16;
		args.height = 16;
		args.speed = 6;
		args.direction = (Math.floor(Math.random()*2) * 180)-90;
		if (args.direction < 0) {
			args.direction += 360;
		}
		args.directioniscircle = "false";
		args.sprite = 'thanoscarbullet';
		args.hp = 1;
		args.candie = "true";
		args.canbetouched = "false";
		args.action = 16;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		this.createBHObject(args)
		
	}



this.objects[index].hp -= 1;

break;

			case 16: // Beast Big Laser Bullet
			
this.objects[index].speed -= 0.05;


if (this.objects[index].speed <= 0) {
	
	this.objects[index].hp = 0;
	
}

break;



			case 17: // Cross bullet Spawner
			
this.objects[index].hp -= 1;


	if (Number.isInteger(this.objects[index].hp / 1)) {
		
		args = {};
		args.name = "";
		args.posx = this.objects[index].pos.x;
		args.posy = this.objects[index].pos.y;
		args.width = 16;
		args.height = 16;
		args.speed = 4;
		args.directioniscircle = "true";
		args.sprite = 'thanoscarbullet';
		args.hp = 1;
		args.candie = "true";
		args.canbetouched = "false";
		args.action = 16;
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.direction = 0+this.objects[index].hp*2;
		this.createBHObject(args)
		args.direction = 90+this.objects[index].hp*2;
		this.createBHObject(args)
		args.direction = 180+this.objects[index].hp*2;
		this.createBHObject(args)
		args.direction = 270+this.objects[index].hp*2;
		this.createBHObject(args)
		
	}



break;




			case 18: // THE DISK
			
this.objects[index].hp -= 1;
	

	if (this.objects[index].hp == 798 && this.objects[index].pos.x > this.bhmaxwidth/2-16) {
		
		args = {};
		args.name = "";
		args.width = 16;
		args.height = 720;
		args.speed = 0;
		args.directioniscircle = "true";
		args.sprite = 'THEDISK@20';
		args.hp = 800;
		args.candie = this.objects[index].candie;
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.zindex = -1;
		
		args.action = 19;
		args.posx = this.objects[index].pos.x;
		args.posy = this.objects[index].pos.y - 1000;
		this.createBHObject(args)
		
		
		args.action = 18;
		this.changeDir(1.41,index);
		_direction = (Math.atan2(this.objects[index].direction.y,this.objects[index].direction.x) * 180 / Math.PI);

		if (_direction < 0) {
			_direction += 360;
		}
		args.direction = _direction;
		args.posx = this.objects[index].pos.x + 16*this.objects[index].direction.x;
		args.posy = this.objects[index].pos.y + 16*this.objects[index].direction.y;
		this.createBHObject(args)
		
	}



break;


			case 19: // THE DISK2
			
this.objects[index].hp -= 1;


break;

			case 20: // DEATH INIT
			

		if (this.objects[index].hp == 1) {

		args = {};
		args.name = "";
		args.width = 0;
		args.height = 0;
		args.speed = 0;
		args.directioniscircle = "false";
		args.hp = 180;
		args.candie = "true";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 21;
		
		
		args.sprite = 'DeathAppearI@5';
		for (d=1;d<8;d++) {
			args.posx = this.bhmaxwidth/2 + d*1280/8;
			args.posy = this.bhmaxheight/2;
			this.createBHObject(args)
		}
		
		
		args.sprite = 'DeathAppear-@5';
		for (d=1;d<5;d++) {
			args.posx = this.bhmaxwidth/2
			args.posy = this.bhmaxheight/2 + d*720/5;;
			this.createBHObject(args)
		}
		
		}


this.objects[index].hp = 0;


break;

			case 21: // DEATH APPEAR
			
			

this.objects[index].hp -= 1;

if (this.objects[index].hp == 0) {
	
	
	AudioManager.playSe({name: 'Darkness4', pan: 0, pitch: 100, volume: 90});
	
		args = {};
		args.name = "";
		args.speed = 0;
		args.directioniscircle = "false";
		args.hp = 60;
		args.candie = "true";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 22;
	
	
	if (this.objects[index].sprite.name == 'DeathAppearI@5') {
		
		args.sprite = 'DeathI';
		args.width = 8;
		args.height = 720;
		for (d=1;d<8;d++) {
			args.posx = this.bhmaxwidth/2 + d*1280/8;
			args.posy = this.bhmaxheight/2;
			this.createBHObject(args)
		}
		
	}
	
	if (this.objects[index].sprite.name == 'DeathAppear-@5') {
		
		args.sprite = 'Death-';
		args.width = 1280;
		args.height = 8;
		for (d=1;d<5;d++) {
			args.posx = this.bhmaxwidth/2
			args.posy = this.bhmaxheight/2 + d*720/5;;
			this.createBHObject(args)
		}
		
	}
	
}


break;

			case 22: // DEATH
			
			

this.objects[index].hp -= 1;

if (this.objects[index].hp == 0) {
	
	$gameSwitches.setValue(517, "true");
	
}


break;




			case 23: // Hell Bullet
			
		this.objects[index].direction.x = Math.cos(this.getDirectionToPlayer(index) *Math.PI/180);
		this.objects[index].direction.y = Math.sin(this.getDirectionToPlayer(index) *Math.PI/180);

break;


			case 31: // Gaster Blaster
			
if(typeof this.objects[index].begin === 'undefined') {
	

	AudioManager.playSe({name: 'ppg_gasterblaster', pan: 0, pitch: 100, volume: 80});
	if (this.objects[index].direction.x > 0) {
		this.objects[index].sprite = this.loadImages('gaster_blaster');
	} else {
		this.objects[index].sprite = this.loadImages('gaster_blaster_left');
	}
	this.objects[index].begin = 0;
	
}

this.objects[index].speed /= 2;	
if (this.objects[index].speed < 1 && this.objects[index].speed > 0)	 {
	
	this.objects[index].speed = 0;
	this.objects[index].pos.x = Math.ceil(this.objects[index].pos.x);
	this.objects[index].pos.y = Math.ceil(this.objects[index].pos.y);
	
}
this.objects[index].hp -= 1;

if (this.objects[index].hp == 0) {
	
		args = {};
		args.name = "";
		args.speed = 0;
		args.directioniscircle = "false";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 32;
		args.sprite = (this.objects[index].sprite.name == 'gaster_blaster') ? 'gaster_blaster_opening@6@3' : 'gaster_blaster_opening_left@6@3';
		args.width = 114;
		args.height = 96;
		args.posx = this.objects[index].pos.x;
		args.posy = this.objects[index].pos.y;
		let _direction = (Math.atan2(this.objects[index].direction.y,this.objects[index].direction.x) * 180 / Math.PI);
		if (_direction < 0) { _direction += 360; }
		args.direction = _direction;
		this.createBHObject(args)
	
}

break;

			case 32: // Gaster Blaster Opening


if (this.objects[index].frame >= 5 && this.objects[index].frametimer >= 2) {
	
		this.objects[index].candie = true;
		this.objects[index].hp = 0;
		
		args = {};
		args.name = "";
		args.speed = 10;
		args.directioniscircle = "false";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 33;
		args.sprite = (this.objects[index].sprite.name == 'gaster_blaster_opening@6@3') ? 'gaster_blaster_laser' : 'gaster_blaster_laser_left';
		args.width = 1470*2;
		args.height = 26*2;
		args.offsety = -4;
		args.offsetx = 0;
		args.opacity = 0;
		args.scaley = 0;
		args.posx = (this.objects[index].sprite.name == 'gaster_blaster_opening@6@3') ? this.objects[index].pos.x+55*2 : this.objects[index].pos.x - 1470*2 + 4
		args.posy = this.objects[index].pos.y+22;
		args.direction = this.objects[index].getDirection();
		this.createBHObject(args)
		
		
		args = {};
		args.name = "";
		args.speed = 10;
		args.directioniscircle = "false";
		args.hp = 0;
		args.candie = "false";
		args.canbetouched = "false";
		args.deathaction = 0;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 34;
		args.sprite = this.objects[index].sprite.name;
		args.width = 57*2;
		args.height = 48*2;
		args.posx = this.objects[index].pos.x;
		args.posy = this.objects[index].pos.y;
		_direction = (Math.atan2(this.objects[index].direction.y,this.objects[index].direction.x) * 180 / Math.PI);
		if (_direction < 0) { _direction += 360; }
		args.direction = _direction;
		this.createBHObject(args)
	
}

break;

			case 33: // Gaster Blaster Laser
			
if(typeof this.objects[index].begin === 'undefined') {

	AudioManager.playSe({name: 'ppg_gasterblasterlaser', pan: 0, pitch: 100, volume: 80});
	this.objects[index].begin = 0;
	
}

this.objects[index].begin += 1;

if (this.objects[index].begin < 10) {
	
	this.objects[index].scale.y += 1/10
	this.objects[index].opacity += 255/10
	
}
			
if (this.objects[index].begin > 18) {
	
	this.objects[index].scale.y -= 1/20
	this.objects[index].opacity -= 255/10
	
	if (this.objects[index].opacity <= 0) {
	
		this.objects[index].candie = true;
		this.objects[index].hp = 0;
		
	}
	
}

break;

			case 34: // Gaster Blaster End
			
if(typeof this.objects[index].begin === 'undefined') {
			
		this.objects[index].frame = 5;
		this.objects[index].frametimer = 0;
}

break;


			case 35: // Top Hat Letter Bottom
			
		if (typeof this.objects[index].letters === 'undefined') { 

			if (this.objects[index].pos.x > 1280/2 + this.bhmaxwidth/2 + 16) {
				
				this.objects[index].letters = ['ppg_letter1','ppg_letter2','ppg_letter3','ppg_letter4','ppg_letter5'];
				
			} else {
				
				this.objects[index].letters = ['ppg_letter5','ppg_letter4','ppg_letter3','ppg_letter2','ppg_letter1'];
				
			}

		}
			
		if (typeof this.objects[index].maxhp === 'undefined') { this.objects[index].maxhp = this.objects[index].hp }
			
		
		if (this.objects[index].speed > 0 && this.objects[index].direction.y != -1) {
			if (this.objects[index].pos.y > 100) {
				if (this.objects[index].speed <= 1) {
					
					this.objects[index].speed = 0;
					this.objects[index].pos.y = Math.ceil(this.objects[index].pos.y);
					this.objects[index].pos.x = Math.ceil(this.objects[index].pos.x);
					
				} else {
				
					this.objects[index].speed *= 0.25;
				
				}
			}
		} else {
			
			this.objects[index].hp -= 1;
			
			
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.9)) {
				
					this.createPlayerDirigedBullet(this.objects[index].pos.x+8,this.objects[index].pos.y+48,this.objects[index].letters[0],32,32,5,index,0,0,[{'type':'circle','x':32/2,'y':32/2,'radius': (64)/4}])
					AudioManager.playSe({name: 'Shot2', pan: 0, pitch: 150, volume: 100});
					
			}
				
				
				
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.7)) {
				
					this.createPlayerDirigedBullet(this.objects[index].pos.x+8,this.objects[index].pos.y+48,this.objects[index].letters[1],32,32,5,index,0,0,[{'type':'circle','x':32/2,'y':32/2,'radius': (64)/4}])
					AudioManager.playSe({name: 'Shot2', pan: 0, pitch: 150, volume: 100});
					
			}
				
				
				
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.5)) {
				
					this.createPlayerDirigedBullet(this.objects[index].pos.x+8,this.objects[index].pos.y+48,this.objects[index].letters[2],32,32,5,index,0,0,[{'type':'circle','x':32/2,'y':32/2,'radius': (64)/4}])
					AudioManager.playSe({name: 'Shot2', pan: 0, pitch: 150, volume: 100});
					
			}
				
				
				
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.3)) {
				
					this.createPlayerDirigedBullet(this.objects[index].pos.x+8,this.objects[index].pos.y+48,this.objects[index].letters[3],32,32,5,index,0,0,[{'type':'circle','x':32/2,'y':32/2,'radius': (64)/4}])
					AudioManager.playSe({name: 'Shot2', pan: 0, pitch: 150, volume: 100});
					
			}
				
				
				
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.1)) {
				
					this.createPlayerDirigedBullet(this.objects[index].pos.x+8,this.objects[index].pos.y+48,this.objects[index].letters[4],32,32,5,index,0,0,[{'type':'circle','x':32/2,'y':32/2,'radius': (64)/4}])
					AudioManager.playSe({name: 'Damage2', pan: 0, pitch: 150, volume: 100});
					
			}
			
			if (this.objects[index].hp <= 0) {
				
				if (this.objects[index].speed == 0) {this.objects[index].direction.y *= -1; this.objects[index].speed = 1}
				this.objects[index].speed *= 1.25;
			}
			
		}
	
	
	

break;



			case 36: // Top Hat Bunny
			
		if (typeof this.objects[index].maxhp === 'undefined') { this.objects[index].maxhp = this.objects[index].hp }
			
		
		if (this.objects[index].speed > 0 && ((this.objects[index].direction.x < 0 && this.objects[index].sprite.name == 'ppg_tophat_left') || (this.objects[index].direction.x > 0 && this.objects[index].sprite.name == 'ppg_tophat_right'))) {
			if (this.objects[index].pos.x > this.bhmaxwidth/2 + 300 && this.objects[index].pos.x < 1280 - 300) {
				if (this.objects[index].speed <= 1) {
					
					this.objects[index].speed = 0;
					this.objects[index].pos.y = Math.ceil(this.objects[index].pos.y);
					this.objects[index].pos.x = Math.ceil(this.objects[index].pos.x);
					
				} else {
				
					this.objects[index].speed *= 0.25;
				
				}
			}
		} else {
			
			this.objects[index].hp -= 1;
			
			
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.9)) {
				
					if (this.objects[index].direction.x < 0) {
						this.createGroundJumpingBullet(this.objects[index].pos.x-3,this.objects[index].pos.y-3+16,28,26,5,270,'ppg_smallBunny_left',-4,-6);
					}
					else {
						this.createGroundJumpingBullet(this.objects[index].pos.x-1+28,this.objects[index].pos.y-3+16,28,26,5,90,'ppg_smallBunny_right',-4,-6);
					}
			}
				
				
				
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.7)) {
				
					if (this.objects[index].direction.x < 0) {
						this.createGroundJumpingBullet(this.objects[index].pos.x-3,this.objects[index].pos.y-3+16,28,26,5,270,'ppg_smallBunny_left',-4,-6);
					}
					else {
						this.createGroundJumpingBullet(this.objects[index].pos.x-1+28,this.objects[index].pos.y-3+16,28,26,5,90,'ppg_smallBunny_right',-4,-6);
					}
				
			}
				
				
				
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.5)) {
				
					if (this.objects[index].direction.x < 0) {
						this.createGroundJumpingBullet(this.objects[index].pos.x-3,this.objects[index].pos.y-3+16,28,26,5,270,'ppg_smallBunny_left',-4,-6);
					}
					else {
						this.createGroundJumpingBullet(this.objects[index].pos.x-1+28,this.objects[index].pos.y-3+16,28,26,5,90,'ppg_smallBunny_right',-4,-6);
					}
				
			}
				
				
				
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.3)) {
				
					if (this.objects[index].direction.x < 0) {
						this.createGroundJumpingBullet(this.objects[index].pos.x-3,this.objects[index].pos.y-3+16,28,26,5,270,'ppg_smallBunny_left',-4,-6);
					}
					else {
						this.createGroundJumpingBullet(this.objects[index].pos.x-1+28,this.objects[index].pos.y-3+16,28,26,5,90,'ppg_smallBunny_right',-4,-6);
					}
				
			}
				
				
				
			if (this.objects[index].hp == Math.floor(this.objects[index].maxhp*0.1)) {
				
					if (this.objects[index].direction.x < 0) {
						this.createGroundJumpingBullet(this.objects[index].pos.x-3,this.objects[index].pos.y-3+16,28,26,5,270,'ppg_smallBunny_left',-4,-6);
					}
					else {
						this.createGroundJumpingBullet(this.objects[index].pos.x-1+28,this.objects[index].pos.y-3+16,28,26,5,90,'ppg_smallBunny_right',-4,-6);
					}
				
			}
			
			if (this.objects[index].hp <= 0) {
				
				if (this.objects[index].speed == 0) {this.objects[index].direction.x *= -1; this.objects[index].speed = 1}
				this.objects[index].speed *= 1.25;
			}
			
		}
	
	
	

break;


			case 37: // Ground Bounce Prop
			

			if (typeof this.objects[index].gravity === 'undefined') { this.objects[index].gravity = 0 }
			this.objects[index].gravity -= 0.25;
			
			this.objects[index].pos.y -= this.objects[index].gravity;
			
		
		if (this.objects[index].pos.y > 460+this.bhmaxheight/2-this.objects[index].height && this.objects[index].pos.x < 828 + this.bhmaxwidth/2 - this.objects[index].width && this.objects[index].pos.x > 452 + this.bhmaxwidth/2) {
			
				this.objects[index].pos.y = 460+this.bhmaxheight/2-this.objects[index].height;
				this.objects[index].gravity = Math.abs(this.objects[index].gravity*0.75);
				if (this.objects[index].direction.y < 0) {
					this.objects[index].gravity /= 1+Math.abs(this.objects[index].direction.y);
				}
				this.objects[index].direction.y = 0;
			
		}
			
			
	

break;


			case 38: // Explosive Bullet
			

		this.objects[index].explodePower = this.objects[index].hp;

		if (this.objects[index].pos.y-this.bhmaxheight/2+16 >=460) {
			
				this.objects[index].pos.y = 460+this.bhmaxheight/2-16;
				this.objects[index].hp = 0;
			
		} else if (typeof this.objects[i].collideWithPlayer !== 'undefined' && this.objects[i].collideWithPlayer == 1) {
			
				this.objects[index].hp = 0;
			
		}
			
			
	

break;

			case 39: // Explosive Bullet Explosion
			

		AudioManager.playSe({name: 'Explosion4', pan: 0, pitch: 150, volume: 100});
		$gameScreen.startShake(5, 5, 10);
		
		
		let direction = (Math.atan2(this.objects[index].direction.y,this.objects[index].direction.x) * 180 / Math.PI)+90;
		
		
		for (n=0;n<this.objects[index].explodePower;n++) {
			
			this.createGroundJumpingBullet(this.objects[index].pos.x,this.objects[index].pos.y,16,16,2+Math.random()*this.objects[index].speed,direction-180 + 70-Math.random()*55,'ppg_commonbullet');
		}
		
		for (n=0;n<this.objects[index].explodePower;n++) {
			
			this.createGroundJumpingBullet(this.objects[index].pos.x,this.objects[index].pos.y,16,16,2+Math.random()*this.objects[index].speed,direction-180 + 290+Math.random()*55,'ppg_commonbullet');
		}
			
			
	

break;


			case 40: // Explosive Bullet Warning

		if (this.objects[index].frame >= 9 && this.objects[index].frametimer >= 2) {
			
				if (this.objects[index].name == "ForcedSpeed") {
					this.createExplosiveBullet(this.objects[index].pos.x+8,this.objects[index].hp,25);
				} else {
					this.createExplosiveBullet(this.objects[index].pos.x+8,5+Math.random()*10,25);
				}
				AudioManager.playSe({name: 'Fire1', pan: 0, pitch: 150, volume: 100});
				this.objects[index].hp = 0;
			
		}
			
			
	

break;


			case 41: // Crystal Star Pointer
			
			
		if(typeof this.objects[index].begin === 'undefined') {

			this.objects[index].x = 0;
			this.objects[index].y = 0;
			this.objects[index].originx = this.objects[index].pos.x;
			this.objects[index].originy = this.objects[index].pos.y;
			this.objects[index].begin = 0;
			
		}
		
		this.objects[index].hp -= 1;
			
		this.objects[index].direction.x = Math.cos(this.getDirectionToPosition(this.objects[index].x,this.objects[index].y,$gameVariables.value(83)+9+this.bhmaxwidth/2,$gameVariables.value(84)+34+this.bhmaxheight/2) *Math.PI/180);
		this.objects[index].direction.y = Math.sin(this.getDirectionToPosition(this.objects[index].x,this.objects[index].y,$gameVariables.value(83)+9+this.bhmaxwidth/2,$gameVariables.value(84)+34+this.bhmaxheight/2) *Math.PI/180);
		
		this.objects[index].direction.x = (this.objects[index].x == $gameVariables.value(83)+9+this.bhmaxheight/2) ? 0 : this.objects[index].direction.x
		this.objects[index].direction.y = (this.objects[index].y == $gameVariables.value(84)+34+this.bhmaxheight/2) ? 0 : this.objects[index].direction.y
		
		if (this.getDistanceBetweenPoints(this.objects[index].x,this.objects[index].y,$gameVariables.value(83)+9+this.bhmaxwidth/2,$gameVariables.value(84)+34+this.bhmaxheight/2) <= this.objects[index].speed) {
			
			this.objects[index].x = $gameVariables.value(83)+9+this.bhmaxwidth/2;
			this.objects[index].y = $gameVariables.value(84)+34+this.bhmaxheight/2;
			
		} else {
			
		this.objects[index].x += this.objects[index].pos.x;
		this.objects[index].y += this.objects[index].pos.y;
		
		}
		
		
		this.objects[index].offset.x = Math.ceil(this.objects[index].x);
		this.objects[index].offset.y = Math.ceil(this.objects[index].y);
		
		this.objects[index].pos.x = 0;
		this.objects[index].pos.y = 0;
		
		if (this.objects[index].hp <= 150 && this.objects[index].hp % 30 == 0 && this.objects[index].hp != 0) {
			
			AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 70, volume: 80});
			this.objects[index].sprite = "null";
			
		} else if (this.objects[index].hp % 10 == 0) {
			
				if (this.objects[index].name.contains("LaytonMobile")) {
					this.objects[index].sprite = this.loadImages('crystalStarCursorLeft');
				} else {
					this.objects[index].sprite = this.loadImages('crystalStarCursor');
				}
			
		}
		
		if (this.objects[index].hp <= 0) {
			
			AudioManager.playSe({name: 'Ice2', pan: 0, pitch: 100, volume: 200});
			
			for (n=0;n<80;n++) {
				
				if (this.objects[index].name.contains("LaytonMobile")) {
					this.createPositionDirigedBullet(
					this.objects[index].originx+1,
					this.objects[index].originy+1,
					this.objects[index].offset.x+1+(Math.random()*5-5/2),
					this.objects[index].offset.y+1+(Math.random()*5-5/2),
					'ppg_commonbullet',16,16,10+Math.random()*4,0,0);
				} else {
					this.createPositionDirigedBullet(
					this.objects[index].originx+1,
					this.objects[index].originy+1,
					this.objects[index].offset.x+1+(Math.random()*5-5/2),
					this.objects[index].offset.y+1+(Math.random()*5-5/2),
					'ppg_commonbullet',16,16,2+Math.random()*5,0,0);
				}
				
			}
			
		args = {};
		if (this.objects[index].name.contains("LaytonMobile")) {
			args.name = "268";
		} else {
			args.name = "2468";
		}
		args.speed = 12;
		args.directioniscircle = "true";
		args.hp = 25;
		args.candie = "true";
		args.canbetouched = "false";
		args.deathaction = 39;
		args.isPlayerShot = "false";
		args.isBonus = "false";
		args.cantbeinstakill = "true";
		args.action = 42;
		args.sprite = 'ppg_commonbullet';
		args.width = 16;
		args.height = 16;
		args.posx = this.objects[index].originx+1;
		args.posy = this.objects[index].originy+1;
		args.direction = this.getDirectionToPosition(this.objects[index].originx+1,this.objects[index].originy+1,this.objects[index].offset.x+1,this.objects[index].offset.y+1);
		this.createBHObject(args)
			
		}
			
			
	

break;

			case 42: // Explosive Bullet All Direction
			

		this.objects[index].explodePower = this.objects[index].hp;

		if (this.objects[index].pos.y-this.bhmaxheight/2+16 >=460 && this.objects[index].name.contains("2")) {
			
			this.objects[index].pos.y = 460+this.bhmaxheight/2-16;
			this.objects[index].hp = 0;
			
		}
		if (this.objects[index].pos.x-this.bhmaxwidth/2+16 >=828 && this.objects[index].name.contains("6")) {
			
			this.objects[index].pos.x = 828+this.bhmaxwidth/2-16;
			this.objects[index].hp = 0;
			
		}
		if (this.objects[index].pos.x-this.bhmaxwidth/2+16 <=452 && this.objects[index].name.contains("4")) {
			
			this.objects[index].pos.x = 452+this.bhmaxwidth/2+16;
			this.objects[index].hp = 0;
			
		}
		if (this.objects[index].pos.y-this.bhmaxheight/2+16 <=84 && this.objects[index].name.contains("8")) {
			
			this.objects[index].pos.y = 84+this.bhmaxheight/2+16;
			this.objects[index].hp = 0;
			
		} 
		if (typeof this.objects[i].collideWithPlayer !== 'undefined' && this.objects[i].collideWithPlayer == 1) {
			
				this.objects[index].hp = 0;
			
		}
			
			
	

break;


			case 43: // Crystal Star
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 0; 
			this.objects[index].maxhp = this.objects[index].hp;
			this.objects[index].animt = 0; 
			this.objects[index].animy = this.objects[index].pos.y;
			this.objects[index].begin = 0;
		}
			
		
		if (this.objects[index].animt <= 60) {
			this.objects[index].animt += 1;
			this.objects[index].pos.y = this.easeOutSine(this.objects[index].animt,this.objects[index].animy,272+44,60);
		} else {
			
			if (this.objects[index].timer % 360 == 0) {
			
				this.createHeartPointer(this.bhmaxwidth/2+640-9,this.bhmaxwidth/2+272-9,3,360,`${this.objects[index].name + this.objects[index].pos.x}`);
				
			}
			
			this.objects[index].timer += 1;
			
		}
		
		
		if (this.objects[index].hp <= 0) {
						
			AudioManager.playSe({name: 'Earth4', pan: 0, pitch: 150, volume: 200});
			AudioManager.playSe({name: 'Fire2', pan: 0, pitch: 100, volume: 200});
			this.removeObjectByName(`${this.objects[index].name + this.objects[index].pos.x}`);
			for (n = 0; n<100; n++) {
				
				args = {};
				args.name = "";
				args.posx = this.objects[index].pos.x + 43-8;
				args.posy = this.objects[index].pos.y + 43-8;
				args.width = 16;
				args.height = 16;
				args.speed = 2+Math.random()*5;
				args.direction = Math.random()*360;
				args.directioniscircle = "true";
				args.sprite = 'ppg_commonbullet';
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.action = 0;
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				this.createBHObject(args)
				
			}
			
			this.objects[index].candie = true;
			
		}
			
			
	

break;


			case 44: // Big Bullet Explosion


AudioManager.playSe({name: 'Ice2', pan: 0, pitch: 150, volume: 70});

for (n=0;n<this.objects[index].explosionPower;n++) {
	args = {};
	args.name = "";
	args.posx = this.objects[index].pos.x+8;
	args.posy = this.objects[index].pos.y+8;
	args.width = 16;
	args.height = 16;
	args.speed = 7;
	args.direction = this.getRandomInt(360);
	args.directioniscircle = "true";
	args.sprite = 'ppg_commonbullet';
	args.hp = 0;
	args.candie = "false";
	args.canbetouched = "false";
	args.action = 0;
	args.deathaction = 0;
	args.isPlayerShot = "false";
	args.isBonus = "false";
	this.createBHObject(args)
}
break;


			case 45: // Big Bullet
			
			if(typeof this.objects[index].begin === 'undefined') {

				this.objects[index].explosionPower = this.objects[index].hp;
				this.objects[index].begin = 0;
				
			}
			
		this.objects[index].direction.x = Math.cos(this.getDirectionToPlayer(index) *Math.PI/180);
		this.objects[index].direction.y = Math.sin(this.getDirectionToPlayer(index) *Math.PI/180);
		
		if (this.objects[index].pos.y-this.bhmaxheight/2+16 <=460 &&
		    this.objects[index].pos.x-this.bhmaxwidth/2+16 <=828 &&
			this.objects[index].pos.x-this.bhmaxwidth/2+16 >=452 &&
			this.objects[index].pos.y-this.bhmaxheight/2+16 >=84) {
			
			this.objects[index].hp = 0;
			
		}
		if (typeof this.objects[i].collideWithPlayer !== 'undefined' && this.objects[i].collideWithPlayer == 1) {
			
				this.objects[index].hp = 0;
			
		}

break;


			case 46: // Layton Mobile
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 0; 
			this.objects[index].subtimer = 0; 
			this.objects[index].subtimer2 = 0; 
			this.objects[index].maxhp = this.objects[index].hp;
			this.objects[index].animt = 0; 
			this.objects[index].animx = this.objects[index].pos.x;
			this.objects[index].begin = 0;
		}
			
		
		if (this.objects[index].animt <= 60) {
			this.objects[index].animt += 1;
			this.objects[index].pos.x = this.easeOutSine(this.objects[index].animt,this.objects[index].animx,242+this.bhmaxwidth/2,60);
		} else {
			
			if (this.objects[index].timer % 360 == 0) {
			
				this.createHeartPointer(this.objects[index].pos.x+246-8,this.objects[index].pos.y+144-8,3,360,`${this.objects[index].name + this.objects[index].pos.y}`);
				
			}
			

			if (this.objects[index].timer % 250 == 0) {
			
				AudioManager.playSe({name: 'Thunder10', pan: 0, pitch: 150, volume: 100});
				this.objects[index].subtimer = 15;
				
				
			}
			
			if (this.objects[index].timer % 230 == 0) {
			
				this.objects[index].subtimer2 = 7;
				
			}
			
			
			if (this.objects[index].subtimer > 0 && this.objects[index].timer % 4 == 0) {
			
				this.objects[index].subtimer -= 1;
				args = {};
				args.name = "";
				args.posx = this.objects[index].pos.x + 90;
				args.posy = this.objects[index].pos.y + 110-16;
				args.width = 32;
				args.height = 32;
				args.speed = 3;
				args.direction = 90;
				args.directioniscircle = "false";
				args.sprite = 'ppg_bigbullet';
				args.candie = "false";
				args.canbetouched = "false";
				args.action = 47;
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				
				args.hp = 1;
				this.createBHObject(args)
				args.hp = 2;
				this.createBHObject(args)
				args.hp = 3;
				this.createBHObject(args)
				
				
			}
			
			if (this.objects[index].subtimer2 > 0 && this.objects[index].timer % 20 == 0) {
			
				AudioManager.playSe({name: 'Water1', pan: 0, pitch: 180, volume: 80});
				this.objects[index].subtimer2 -= 1;
				args = {};
				args.name = "";
				args.posx = this.objects[index].pos.x + 234;
				args.posy = this.objects[index].pos.y + 215-8;
				args.width = 16;
				args.height = 16;
				args.speed = 5;
				args.direction = Math.random()*30-15;
				args.directioniscircle = "true";
				args.sprite = 'ppg_commonbullet';
				args.candie = "false";
				args.canbetouched = "false";
				args.action = 48;
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.hp = 0;
				this.createBHObject(args)
				
				
			}
			
			this.objects[index].timer += 1;
			
		}
		
		if (this.objects[index].hp <= 0) {
						
			AudioManager.playSe({name: 'Earth4', pan: 0, pitch: 150, volume: 200});
			AudioManager.playSe({name: 'Fire2', pan: 0, pitch: 100, volume: 200});
			this.removeObjectByName(`${this.objects[index].name + this.objects[index].pos.y}`);
			for (n = 0; n<100; n++) {
				
				args = {};
				args.name = "";
				args.posx = this.objects[index].pos.x + 242/2-8;
				args.posy = this.objects[index].pos.y + 264/2-8;
				args.width = 16;
				args.height = 16;
				args.speed = 2+Math.random()*5;
				args.direction = Math.random()*360;
				args.directioniscircle = "true";
				args.sprite = 'ppg_commonbullet';
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.action = 0;
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				this.createBHObject(args)
				
			}
			
			this.objects[index].candie = true;
			
		}
			
			
	

break;


			case 47: // Layton Mobile Triple Laser
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 0; 
			this.objects[index].maxhp = this.objects[index].hp;
			this.objects[index].animt = 0; 
			this.objects[index].animy = this.objects[index].pos.y;
			this.objects[index].begin = 0;
		}
			
		
		if (this.objects[index].animt <= 60 && this.objects[index].hp == 1) {
			this.objects[index].animt += 1;
			this.objects[index].pos.y = this.easeOutSine(this.objects[index].animt,this.objects[index].animy,(84+376-200-32+this.bhmaxheight/2)-this.objects[index].animy,60);
		}
		if (this.objects[index].animt <= 60 && this.objects[index].hp == 2) {
			this.objects[index].animt += 1;
			this.objects[index].pos.y = this.easeOutSine(this.objects[index].animt,this.objects[index].animy,(84+376-100-32+this.bhmaxheight/2)-this.objects[index].animy,60);
		}
		if (this.objects[index].animt <= 60 && this.objects[index].hp == 3) {
			this.objects[index].animt += 1;
			this.objects[index].pos.y = this.easeOutSine(this.objects[index].animt,this.objects[index].animy,(84+376-32+this.bhmaxheight/2)-this.objects[index].animy,60);
		}
			
	

break;




			case 48: // Layton Mobile Ballon Bullet
			

		if (this.objects[index].direction.x > 0.05) {
			this.changeDir(-0.5,index);
		}
			
	

break;



			case 50: // PPG Attack Stop
			
			for (z=0; z<this.objects.length; z++) {
				if (this.objects[z].name == "ppgPlatform") {
					this.objects[z].destroy();
					this.objects.splice(z,1);
					z -= 1;
					
				}	
			}	
			this.ppg_stop = 1;

break;


			case 51: // PPG Attack 1
			
			if(typeof this.objects[index].begin === 'undefined') {

				this.swapSoul("blue");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				
			}
			
			this.objects[index].hp -= 1;
			
			if (this.objects[index].hp % 40 == 0 && this.objects[index].hp < this.objects[index].maxhp-200) {
			this.createGasterBlaster(336-96/2 + this.bhmaxwidth/2, 406 + this.bhmaxheight/2, 20, 60)
			this.createGasterBlaster(1280-336-96/2 + this.bhmaxwidth/2, 406 + this.bhmaxheight/2, 20, 60)
			}
			
			if (this.objects[index].hp % 80 == 0) {
			this.createSmallPlatform(-32 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)
			this.createSmallPlatform(-64 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)
			/*this.createSmallPlatform(1280 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)
			this.createSmallPlatform(1280 +32 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)*/
			}
			
			
			if (this.objects[index].hp % 240 == 0) {
			
			this.createTopHatLetter(1280 - 494 + this.bhmaxwidth/2,20,60)
			
			}
			else if (this.objects[index].hp % 120 == 0) {
			this.createTopHatLetter(494 + this.bhmaxwidth/2,20,60)
			/*this.createSmallPlatform(1280 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)
			this.createSmallPlatform(1280 +32 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)*/
			}

break;



			case 52: // PPG Attack 2
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.PlayerCollisionX1 = 17;
				this.PlayerCollisionX2 = 19;
				this.PlayerCollisionY1 = 42;
				this.PlayerCollisionY2 = 44;
				this.objects[index].hammer = [];
				
			}
			
			if (this.objects[index].hp == this.objects[index].maxhp-100) {
				
				this.objects[index].hammer[0] = this.createGiantHammer(1,this.objects[index].maxhp,120,272,270,20)
				this.objects[index].hammer[1] = this.createGiantHammer(-1,this.objects[index].maxhp,1280-120,272,90,21)
				
			}


			if (typeof this.objects[index].hammer[0] !== 'undefined' && typeof this.objects[index].hammer[0].angle !== 'undefined' &&(
			this.objects[index].hammer[0].angle - Math.floor(this.objects[index].hammer[0].angle/360)*360 == 270+44 || 
				 this.objects[index].hammer[1].angle - Math.floor(this.objects[index].hammer[1].angle/360)*360 == 270-44 )) {
				
				AudioManager.playSe({name: 'Wind1', pan: 0, pitch: 50, volume: 70});
				
			}

			
			this.objects[index].hp -= 1;
			
			if (this.objects[index].hp % 4 == 0) {
				let percent = (this.objects[index].maxhp-this.objects[index].hp)*3;
				while (percent > 100) {
					
					percent -= 100;
					
				}
				
				this.createInvertVortex(640,272,1.5,'ppg_commonbullet',percent);
			}

break;

			case 53: // PPG Attack 3
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("blue");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				
				
				for (n = 2; n < 10; n++) {
					this.createSmallPlatform(-4+this.bhmaxwidth/2+452+32*n, 460-70 + this.bhmaxheight/2, 0)
				}
				
			}

			
			this.objects[index].hp -= 1;
			
			if (this.objects[index].hp % 120 == 0) {
				AudioManager.playSe({name: 'Raise3', pan: 0, pitch: 150, volume: 80});
				
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 1;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 40;
				args.sprite = 'ppg_explosivebulletWarning@10@3';
				args.width = 0;
				args.height = 0;
				args.posx = this.bhmaxwidth/2+452+Math.random()*376-32;
				args.posy = 0;
				args.offsety = 84+this.bhmaxheight/2;
				args.direction = 0;
				this.createBHObject(args)
			}

break;



			case 54: // PPG Attack 4
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("blue");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				
			}

			
			this.objects[index].hp -= 1;
			
			if (this.objects[index].hp % 60 == 0) {
				
				AudioManager.playSe({name: 'Raise3', pan: 0, pitch: 150, volume: 100});
				
				this.createTopHatBunny(Math.random()*300 + this.bhmaxheight/2,Math.floor(Math.random()*2),20,60)
				
			}
			
			if (this.objects[index].hp % 480 == 0) {
			
			this.createTopHatLetter(1280 - 494 + this.bhmaxwidth/2,20,60)
			
			}
			else if (this.objects[index].hp % 240 == 0) {
				
			this.createTopHatLetter(494 + this.bhmaxwidth/2,20,60)
			
			}

break;



			case 55: // PPG Attack 5
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("blue");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				
			}
			
			
			if (this.objects[index].hp % 40 == 0) {
			this.createSmallPlatform(-32 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)
			this.createSmallPlatform(-64 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)
			this.createSmallPlatform(1280 + this.bhmaxwidth/2, 200 + this.bhmaxheight/2, 3)
			this.createSmallPlatform(1280+32 + this.bhmaxwidth/2, 200 + this.bhmaxheight/2, 3)
			}
			
			if (this.objects[index].hp % 60 == 0 && this.objects[index].hp < this.objects[index].maxhp-200) {
			let randomy = Math.floor(Math.random()*3);
			this.createGasterBlaster(1280-336-96/2 + this.bhmaxwidth/2, 406 + this.bhmaxheight/2-(138*randomy), 20, 60)
			this.createGasterBlaster(1280-336-96/2 + this.bhmaxwidth/2, 406-64 + this.bhmaxheight/2-(138*randomy), 20, 60)
			}

			
			this.objects[index].hp -= 1;

break;



			case 56: // PPG Attack 6
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.createCrystalStar(this.bhmaxwidth/2+640-43,this.bhmaxheight/2-87,100)

				
			}
			
			
			if (!this.getObjectByName("CrystalStar") && this.objects[index].hp > 30) {
				
				this.objects[index].hp = 30;
				
			}
			
			this.objects[index].hp -= 1;

break;



			case 57: // PPG Attack 7
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.PlayerCollisionX1 = 17;
				this.PlayerCollisionX2 = 19;
				this.PlayerCollisionY1 = 42;
				this.PlayerCollisionY2 = 44;

				
			}
			
			
			if (this.objects[index].hp % 120 == 0) {
				
				args = {};
				args.name = "";
				if (Math.random() < 0.25) {
					args.posx = this.bhmaxwidth/2-32;
					args.posy = this.bhmaxheight/2+Math.random()*720;
				} else if (Math.random() < 0.5) {
					args.posx = this.bhmaxwidth/2+Math.random()*1280;
					args.posy = this.bhmaxheight/2-32;
				} else if (Math.random() < 0.75) {
					args.posx = this.bhmaxwidth/2+1280;
					args.posy = this.bhmaxheight/2+Math.random()*720;
				} else {
					args.posx = this.bhmaxwidth/2+Math.random()*1280;
					args.posy = this.bhmaxheight/2+720;
				}
				args.width = 16;
				args.height = 16;
				args.speed = 1.5;
				args.direction = 0;
				args.directioniscircle = "false";
				args.sprite = 'ppg_bigbullet';
				args.hp = 10;
				args.candie = "true";
				args.canbetouched = "false";
				args.cantbeinstakill = "true";
				args.action = 45;
				args.deathaction = 44;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				
				this.createBHObject(args)

			}
			
			
			if (this.objects[index].hp % 8 == 0) {
				
				args = {};
				args.name = "";
				args.posx = this.bhmaxwidth/2-16;
				args.posy = this.bhmaxheight/2+Math.random()*720;
				args.width = 16;
				args.height = 16;
				args.speed = 1.5;
				args.direction = 90;
				args.directioniscircle = "false";
				args.sprite = 'ppg_commonbullet';
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.action = 0;
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				
				this.createBHObject(args)
				
				args.posx = this.bhmaxwidth/2+Math.random()*1280;
				args.posy = this.bhmaxheight/2-16;
				args.direction = 180;
				
				this.createBHObject(args)
				
			}
			
			this.objects[index].hp -= 1;

break;



			case 58: // PPG Attack 8
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.PlayerCollisionX1 = 17;
				this.PlayerCollisionX2 = 19;
				this.PlayerCollisionY1 = 42;
				this.PlayerCollisionY2 = 44;
				this.objects[index].hammer = [];
				
			}
			
			if (this.objects[index].hp > this.objects[index].maxhp-50 && this.objects[index].hp % 4 == 0) {
				
				AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 70});
				if ($gameScreen.picture(2)._name != "ppg_attackbgorange") {
					
					$gameScreen.picture(2)._name = "ppg_attackbgorange";
					
				} else {
					
					$gameScreen.picture(2)._name = "ppg_attackbgblue";
					
				}
				
			}
	
			if (this.objects[index].hp == this.objects[index].maxhp-50) {
				
				AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 70});
				$gameScreen.picture(2)._name = "ppg_attackbg";
				
			}
			
			if (this.objects[index].hp == this.objects[index].maxhp-100) {
				
				$gameScreen.picture(2)._name = "ppg_attackbg";
				this.objects[index].hammer[0] = this.createGiantHammer(4,this.objects[index].maxhp,200,272,90,20)
				
				
				spinningAttackType = 2;
				
			}
			
			if (this.objects[index].hp == this.objects[index].maxhp-145) {
				
				this.objects[index].hammer[1] = this.createGiantHammer(-4,this.objects[index].maxhp,1280-200,272,90,21)
				
				
				spinningAttackType = 2;
				
			}


			if (typeof this.objects[index].hammer[0] !== 'undefined' && typeof this.objects[index].hammer[0].angle !== 'undefined' && typeof this.objects[index].hammer[1] !== 'undefined' && typeof this.objects[index].hammer[1].angle !== 'undefined' &&(
			this.objects[index].hammer[0].angle - Math.floor(this.objects[index].hammer[0].angle/360)*360 == 270+48 || 
				 this.objects[index].hammer[1].angle - Math.floor(this.objects[index].hammer[1].angle/360)*360 == 270-48 )) {
				
				AudioManager.playSe({name: 'Wind1', pan: 0, pitch: 50, volume: 70});
				
			}
			
			if (typeof this.objects[index].hammer[0] !== 'undefined' && typeof this.objects[index].hammer[0].angle !== 'undefined' &&(
			this.objects[index].hammer[0].angle - Math.floor(this.objects[index].hammer[0].angle/360)*360 == 270-96)) {
				
				AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 70});
				
				if (Math.random() > 0.5) {
					this.objects[index].hammer[0].sprite = this.loadImages("ppg_hammerorange");
					$gameScreen.picture(2)._name = "ppg_attackbgorange";
				} else {
					this.objects[index].hammer[0].sprite = this.loadImages("ppg_hammerblue");
					$gameScreen.picture(2)._name = "ppg_attackbgblue";
				}
				
			}
			
			if (typeof this.objects[index].hammer[1] !== 'undefined' && typeof this.objects[index].hammer[1].angle !== 'undefined' &&(
			this.objects[index].hammer[1].angle - Math.floor(this.objects[index].hammer[1].angle/360)*360 == 6)) {
				
				AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 70});
				
				if (Math.random() > 0.5) {
					this.objects[index].hammer[1].sprite = this.loadImages("ppg_hammerorange");
					$gameScreen.picture(2)._name = "ppg_attackbgorange";
				} else {
					this.objects[index].hammer[1].sprite = this.loadImages("ppg_hammerblue");
					$gameScreen.picture(2)._name = "ppg_attackbgblue";
				}
				
			}

			
			this.objects[index].hp -= 1;

break;


			case 59: // PPG Attack 9
			
			if(typeof this.objects[index].begin === 'undefined') {

				this.swapSoul("blue");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				
			}
			
			this.objects[index].hp -= 1;
			
			if (this.objects[index].hp % 40 == 0 && this.objects[index].hp < this.objects[index].maxhp-200) {
			this.createGasterBlaster(336-96/2 + this.bhmaxwidth/2, 406 + this.bhmaxheight/2, 20, 60)
			this.createGasterBlaster(1280-336-96/2 + this.bhmaxwidth/2, 406 + this.bhmaxheight/2, 20, 60)
			}
			
			if (this.objects[index].hp % 80 == 0) {
			this.createSmallPlatform(-32 + this.bhmaxwidth/2, 348 + this.bhmaxheight/2, 3)
			this.createSmallPlatform(-64 + this.bhmaxwidth/2, 348 + this.bhmaxheight/2, 3)
			/*this.createSmallPlatform(1280 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)
			this.createSmallPlatform(1280 +32 + this.bhmaxwidth/2, 338 + this.bhmaxheight/2, 3)*/
			}
			
			if (this.objects[index].hp % 480 == 0) {
			
			this.createTopHatLetter(1280 - 452 - 376/2 - 32 + this.bhmaxwidth/2,20,60)
			
			}
			
			
			if (this.objects[index].hp % 120 == 0 && this.objects[index].hp < this.objects[index].maxhp-200) {
				AudioManager.playSe({name: 'Raise3', pan: 0, pitch: 150, volume: 80});
				
				args = {};
				args.name = "ForcedSpeed";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 4+Math.random()*3;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 40;
				args.sprite = 'ppg_explosivebulletWarning@10@3';
				args.width = 0;
				args.height = 0;
				args.posx = this.bhmaxwidth/2+452+Math.random()*376-32;
				args.posy = 0;
				args.offsety = 84+this.bhmaxheight/2;
				args.direction = 0;
				this.createBHObject(args)
			}

break;

			case 60: // PPG Attack 10
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.createCrystalStar(this.bhmaxwidth/2+640-43,this.bhmaxheight/2-87,100)
				this.objects[index].hammer = [];

				
			}
			
			
			if (!this.getObjectByName("CrystalStar") && this.objects[index].hp > 30) {
				
				this.objects[index].hp = 30;
				
			}
			
		
				if (this.objects[index].hp > this.objects[index].maxhp-50 && this.objects[index].hp % 4 == 0) {
				
				AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 70});
				if ($gameScreen.picture(2)._name != "ppg_attackbgorange") {
					
					$gameScreen.picture(2)._name = "ppg_attackbgorange";
					
				} else {
					
					$gameScreen.picture(2)._name = "ppg_attackbgblue";
					
				}
				
			}
	
			if (this.objects[index].hp == this.objects[index].maxhp-50) {
				
				AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 70});
				$gameScreen.picture(2)._name = "ppg_attackbg";
				
			}
			
			if (this.objects[index].hp == this.objects[index].maxhp-100) {
				
				$gameScreen.picture(2)._name = "ppg_attackbg";
				this.objects[index].hammer[0] = this.createGiantHammer(1,this.objects[index].maxhp,200,272,90,20)
				
				
				spinningAttackType = 2;
				
			}
			
			if (this.objects[index].hp == this.objects[index].maxhp-280) {
				
				this.objects[index].hammer[1] = this.createGiantHammer(-1,this.objects[index].maxhp,1280-200,272,90,21)
				
				
				spinningAttackType = 2;
				
			}


			if (typeof this.objects[index].hammer[0] !== 'undefined' && typeof this.objects[index].hammer[0].angle !== 'undefined' && typeof this.objects[index].hammer[1] !== 'undefined' && typeof this.objects[index].hammer[1].angle !== 'undefined' &&(
			this.objects[index].hammer[0].angle - Math.floor(this.objects[index].hammer[0].angle/360)*360 == 270+48 || 
				 this.objects[index].hammer[1].angle - Math.floor(this.objects[index].hammer[1].angle/360)*360 == 270-48 )) {
				
				AudioManager.playSe({name: 'Wind1', pan: 0, pitch: 50, volume: 70});
				
			}
			
			if (typeof this.objects[index].hammer[0] !== 'undefined' && typeof this.objects[index].hammer[0].angle !== 'undefined' &&(
			this.objects[index].hammer[0].angle - Math.floor(this.objects[index].hammer[0].angle/360)*360 == 270-96)) {
				
				AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 70});
				
				if (Math.random() > 0.5) {
					this.objects[index].hammer[0].sprite = this.loadImages("ppg_hammerorange");
					$gameScreen.picture(2)._name = "ppg_attackbgorange";
				} else {
					this.objects[index].hammer[0].sprite = this.loadImages("ppg_hammerblue");
					$gameScreen.picture(2)._name = "ppg_attackbgblue";
				}
				
			}
			
			if (typeof this.objects[index].hammer[1] !== 'undefined' && typeof this.objects[index].hammer[1].angle !== 'undefined' &&(
			this.objects[index].hammer[1].angle - Math.floor(this.objects[index].hammer[1].angle/360)*360 == 6)) {
				
				AudioManager.playSe({name: 'ppg_soulchange', pan: 0, pitch: 100, volume: 70});
				
				if (Math.random() > 0.5) {
					this.objects[index].hammer[1].sprite = this.loadImages("ppg_hammerorange");
					$gameScreen.picture(2)._name = "ppg_attackbgorange";
				} else {
					this.objects[index].hammer[1].sprite = this.loadImages("ppg_hammerblue");
					$gameScreen.picture(2)._name = "ppg_attackbgblue";
				}
				
			}
			
			
			this.objects[index].hp -= 1;

break;


			case 61: // PPG Attack 11
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.PlayerCollisionX1 = 17;
				this.PlayerCollisionX2 = 19;
				this.PlayerCollisionY1 = 42;
				this.PlayerCollisionY2 = 44;
				this.objects[index].hammer = [];
				
			}
			
			
			if (this.objects[index].hp == this.objects[index].maxhp-100) {
				
				this.objects[index].hammer[0] = this.createGiantHammer(1.5,this.objects[index].maxhp,120,272,270,20)
				this.objects[index].hammer[1] = this.createGiantHammer(-1.5,this.objects[index].maxhp,1280-120,272,90,21)
				
			}


			if (typeof this.objects[index].hammer[0] !== 'undefined' && typeof this.objects[index].hammer[0].angle !== 'undefined' &&(
			this.objects[index].hammer[0].angle - Math.floor(this.objects[index].hammer[0].angle/360)*360 == 270+45 || 
				 this.objects[index].hammer[1].angle - Math.floor(this.objects[index].hammer[1].angle/360)*360 == 270-45 )) {
				
				AudioManager.playSe({name: 'Wind1', pan: 0, pitch: 50, volume: 70});
				
			}

			
			this.objects[index].hp -= 1;
			
			if (this.objects[index].hp % 4 == 0) {
				let percent = (this.objects[index].maxhp-this.objects[index].hp)*6;
				while (percent > 100) {
					
					percent -= 100;
					
				}
				
				this.createInvertVortex(640,272,1.5,'ppg_commonbullet',percent);
			}
			
			if (this.objects[index].hp % 4 == 0) {
				let percent = (this.objects[index].maxhp-this.objects[index].hp)*6;
				while (percent > 100) {
					
					percent -= 100;
					
				}
				
				this.createInvertVortex(640,272,1.5,'ppg_commonbullet',-percent);
			}

break;



			case 62: // PPG Attack 12
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.soulDirection = 4;
				this.createLaytonMobile(this.bhmaxheight/2+200,100)

				
			}
			
			
			if (!this.getObjectByName("LaytonMobile") && this.objects[index].hp > 120) {
				
				this.objects[index].hp = 120;
				
			}
			
			
			this.objects[index].hp -= 1;

break;


			case 63: // PPG Attack 13
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("blue");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				
				
				for (n = 1; n < 6; n++) {
					this.createSmallPlatform(-4+this.bhmaxwidth/2+452-16+64*n, 460-70 + this.bhmaxheight/2, 0)
				}
				
			}

			
			this.objects[index].hp -= 1;
			
			if (this.objects[index].hp % 80 == 0 && this.objects[index].hp > 700) {
				AudioManager.playSe({name: 'Raise3', pan: 0, pitch: 150, volume: 80});
				
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 1;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 40;
				args.sprite = 'ppg_explosivebulletWarning@10@3';
				args.width = 0;
				args.height = 0;
				args.posx = this.bhmaxwidth/2+452+Math.random()*376-32;
				args.posy = 0;
				args.offsety = 84+this.bhmaxheight/2;
				args.direction = 0;
				this.createBHObject(args)
			}
			
			if (this.objects[index].hp % 50 == 0 && this.objects[index].hp <= 700 && this.objects[index].hp >= 200) {
				AudioManager.playSe({name: 'Raise3', pan: 0, pitch: 150, volume: 80});
				
				args = {};
				args.name = "ForcedSpeed";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 7;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 40;
				args.sprite = 'ppg_explosivebulletWarning@10@3';
				args.width = 0;
				args.height = 0;
				args.posy = 0;
				args.offsety = 84+this.bhmaxheight/2;
				args.direction = 0;
				args.posx = this.bhmaxwidth/2+452-16+37.6*((this.objects[index].hp-200)/50);
				this.createBHObject(args)
				args.posx = this.bhmaxwidth/2+452-16+376-37.6*((this.objects[index].hp-200)/50);
				this.createBHObject(args)
			}

break;



			case 64: // PPG Attack 14
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.PlayerCollisionX1 = 17;
				this.PlayerCollisionX2 = 19;
				this.PlayerCollisionY1 = 42;
				this.PlayerCollisionY2 = 44;

				
			}
			
			
			if (this.objects[index].hp % 120 == 0) {
				
				args = {};
				args.name = "";
				if (Math.random() < 0.25) {
					args.posx = this.bhmaxwidth/2-32;
					args.posy = this.bhmaxheight/2+Math.random()*720;
				} else if (Math.random() < 0.5) {
					args.posx = this.bhmaxwidth/2+Math.random()*1280;
					args.posy = this.bhmaxheight/2-32;
				} else if (Math.random() < 0.75) {
					args.posx = this.bhmaxwidth/2+1280;
					args.posy = this.bhmaxheight/2+Math.random()*720;
				} else {
					args.posx = this.bhmaxwidth/2+Math.random()*1280;
					args.posy = this.bhmaxheight/2+720;
				}
				args.width = 16;
				args.height = 16;
				args.speed = 1.5;
				args.direction = 0;
				args.directioniscircle = "false";
				args.sprite = 'ppg_bigbullet';
				args.hp = 10;
				args.candie = "true";
				args.canbetouched = "false";
				args.cantbeinstakill = "true";
				args.action = 45;
				args.deathaction = 44;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				
				this.createBHObject(args)

			}
			
			if (this.objects[index].hp % 400 == 0) {
				
				args = {};
				args.name = "";
				if (Math.random() < 0.25) {
					args.posx = this.bhmaxwidth/2-32;
					args.posy = this.bhmaxheight/2+Math.random()*720;
				} else if (Math.random() < 0.5) {
					args.posx = this.bhmaxwidth/2+Math.random()*1280;
					args.posy = this.bhmaxheight/2-32;
				} else if (Math.random() < 0.75) {
					args.posx = this.bhmaxwidth/2+1280;
					args.posy = this.bhmaxheight/2+Math.random()*720;
				} else {
					args.posx = this.bhmaxwidth/2+Math.random()*1280;
					args.posy = this.bhmaxheight/2+720;
				}
				args.width = 16;
				args.height = 16;
				args.speed = 1.5;
				args.direction = 0;
				args.directioniscircle = "false";
				args.sprite = 'ppg_bigbullet';
				args.hp = 25;
				args.candie = "true";
				args.canbetouched = "false";
				args.cantbeinstakill = "true";
				args.action = 45;
				args.deathaction = 44;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				
				this.createBHObject(args)

			}
			
			
			if (this.objects[index].hp % 6 == 0) {
				
				args = {};
				args.name = "";
				args.posx = this.bhmaxwidth/2-16;
				args.posy = this.bhmaxheight/2+Math.random()*720;
				args.width = 16;
				args.height = 16;
				args.speed = 1.5;
				args.direction = 90;
				args.directioniscircle = "false";
				args.sprite = 'ppg_commonbullet';
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.action = 0;
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				
				this.createBHObject(args)
				
				args.posx = this.bhmaxwidth/2+Math.random()*1280;
				args.posy = this.bhmaxheight/2-16;
				args.direction = 180;
				
				this.createBHObject(args)
				
			}
			
			this.objects[index].hp -= 1;

break;


			case 65: // PPG Attack 15
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.swapSoul("blue");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				
				
				for (n = 1; n < 6; n++) {
					this.createSmallPlatform(-4+this.bhmaxwidth/2+452-16+64*n, 460-70 + this.bhmaxheight/2, 0)
				}
				
			}

			
			this.objects[index].hp -= 1;
			
			if (this.objects[index].hp % 60 == 0 && this.objects[index].hp > 700) {
				AudioManager.playSe({name: 'Raise3', pan: 0, pitch: 150, volume: 80});
				
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 1;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 40;
				args.sprite = 'ppg_explosivebulletWarning@10@3';
				args.width = 0;
				args.height = 0;
				args.posx = this.bhmaxwidth/2+452+Math.random()*376-32;
				args.posy = 0;
				args.offsety = 84+this.bhmaxheight/2;
				args.direction = 0;
				this.createBHObject(args)
			}
			
			if (this.objects[index].hp % 50 == 0 && this.objects[index].hp <= 700 && this.objects[index].hp >= 200) {
				AudioManager.playSe({name: 'Raise3', pan: 0, pitch: 150, volume: 80});
				
				args = {};
				args.name = "ForcedSpeed";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 7;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 40;
				args.sprite = 'ppg_explosivebulletWarning@10@3';
				args.width = 0;
				args.height = 0;
				args.posy = 0;
				args.offsety = 84+this.bhmaxheight/2;
				args.direction = 0;
				args.posx = this.bhmaxwidth/2+452-16+37.6*((this.objects[index].hp-200)/50);
				this.createBHObject(args)
				args.posx = this.bhmaxwidth/2+452-16+376-37.6*((this.objects[index].hp-200)/50);
				this.createBHObject(args)
			}

break;



			case 66: // PPG Final Attack
			
			if(typeof this.objects[index].begin === 'undefined') {

				$gameScreen.picture(2)._name = "ppg_finalattackbg";
				$gameVariables.setValue(83,640-36/2)
				$gameVariables.setValue(84,500)
				this.PlayerCollisionX1 = 17;
				this.PlayerCollisionX2 = 19;
				this.PlayerCollisionY1 = 42;
				this.PlayerCollisionY2 = 44;				
				this.swapSoul("yellow");
				this.objects[index].maxhp = this.objects[index].hp;
				this.objects[index].begin = 0;
				this.summonGenos(828+this.bhmaxwidth/2,460+this.bhmaxheight/2-88)
				GenosID = this.getObjectByName("Genos");
				this.changeDir(180,GenosID);
				this.objects[GenosID].attack = 0;
				
			}
			
			if (this.objects[index].hp == this.objects[index].maxhp-100) {
			
				this.objects[GenosID].speed = 25;
				this.objects[GenosID].attack = 1;
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "true";
				args.hp = 1;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 33;
				args.sprite = 'ppg_laser';
				args.width = 2940;
				args.height = 30;
				args.posx = 0;
				args.posy = this.objects[GenosID].pos.y+15;
				args.direction = 0;
				this.createBHObject(args)
				
			}
			
			if (this.objects[GenosID].attack == 1 && 
			   ((this.objects[GenosID].pos.x < this.bhmaxwidth/2 + 452 - 90 && this.objects[GenosID].direction.x < 0) || 
			   (this.objects[GenosID].pos.x > this.bhmaxwidth/2 + 828 && this.objects[GenosID].direction.x > 0))) {
				
				this.objects[GenosID].speed /= 1.5;
				if (this.objects[GenosID].speed < 1) {
					this.objects[GenosID].speed = 0;
					this.objects[GenosID].pos.x = Math.ceil(this.objects[GenosID].pos.x);
					this.objects[GenosID].attack = 2;
					this.objects[GenosID].dirxtemp = this.objects[GenosID].direction.x;
				}
				
			}
			
			if (this.objects[GenosID].attack == 1 && this.objects[index].hp % 10 == 0) {
				
				args = {};
				args.name = "";
				args.speed = 5;
				args.directioniscircle = "false";
				args.hp = 0.1;
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
				args.posx = this.objects[GenosID].pos.x;
				args.posy = this.objects[GenosID].pos.y;
				args.direction = 180;
				this.createBHObject(args)
				
			}
			
			if (this.objects[GenosID].attack == 2) {
				
				if (this.objects[GenosID].dirxtemp < 0) {
					this.changeDir(10,GenosID);
				} else {
					this.changeDir(-10,GenosID);
				}
				this.objects[GenosID].speed = 5;
				if (this.objects[GenosID].pos.y + this.bhmaxheight/2 - 88 < 84) {
					
					this.objects[GenosID].animt = 0; 
					this.objects[GenosID].attack = 3;
					
				}
				else if (this.objects[GenosID].direction.x == -this.objects[GenosID].dirxtemp) {

					this.objects[GenosID].speed = 25;
					this.objects[GenosID].attack = 1;
					args = {};
					args.name = "";
					args.speed = 0;
					args.directioniscircle = "true";
					args.hp = 1;
					args.candie = "true";
					args.canbetouched = "false";
					args.deathaction = 0;
					args.isPlayerShot = "false";
					args.isBonus = "false";
					args.cantbeinstakill = "true";
					args.action = 33;
					args.sprite = 'ppg_laser';
					args.width = 2940;
					args.height = 30;
					args.posx = 0;
					args.posy = this.objects[GenosID].pos.y+15;
					args.direction = 0;
					this.createBHObject(args)					

				}
				
			}
			
			
			if (this.objects[GenosID].attack == 3) {
				
				this.objects[GenosID].speed = 0;
				this.objects[GenosID].animx = this.objects[GenosID].pos.x;
				this.objects[GenosID].animy = this.objects[GenosID].pos.y;
					
				
				if (this.objects[GenosID].animt <= 60) {
					this.objects[GenosID].animt += 1;
					this.objects[GenosID].pos.x = this.easeOutSine(this.objects[GenosID].animt,this.objects[GenosID].animx,452+376/2-20+this.bhmaxwidth/2-this.objects[GenosID].animx,60);
					this.objects[GenosID].pos.y = this.easeOutSine(this.objects[GenosID].animt,this.objects[GenosID].animy,84+376/2-45+this.bhmaxheight/2-this.objects[GenosID].animy,60);
				
					if (this.objects[GenosID].animt == 60) {
						
						this.objects[index].temphp = this.objects[index].hp;
						
						this.createSmallHammer(1.5,360*3+60,452+376/2,84+376/2-30,270)
						
					}
				
				} 
				
				
			}
			
			
			
			if (this.objects[GenosID].attack == 3 && this.objects[index].hp <= this.objects[index].temphp-360*3) {
				
				this.clearSpinningAttack();
				this.objects[GenosID].attack = 4;
				this.objects[index].temphp = this.objects[index].hp;
				
			}
			
			if ((this.objects[index].temphp - this.objects[index].hp) % 360 == 0 && this.objects[GenosID].attack == 3) {
				
				this.createHeartPointer(this.bhmaxwidth/2+640-9,this.bhmaxwidth/2+272-9,3,360,"GenosPointer");
				
			}


			if ( this.objects[GenosID].attack == 3 && this.objects[index].hp % 60 == 0 ) {
				
				AudioManager.playSe({name: 'Wind1', pan: 0, pitch: 50, volume: 70});
				
			}
			
			
			if ( this.objects[GenosID].attack == 4 && this.objects[index].hp % 10 == 0 ) {
				
				let maxSpawn = 4;
				
				for (n = 0; n < maxSpawn; n++) {
					for (k = 0; k < 2; k++) {
						args = {};
						args.name = "RotateLock";
						args.speed = 2.5;
						args.directioniscircle = "true";
						args.hp = 1;
						args.candie = "true";
						args.canbetouched = "false";
						args.deathaction = 0;
						args.isPlayerShot = "false";
						args.isBonus = "false";
						args.cantbeinstakill = "true";
						args.action = 69 + k;
						args.sprite = "null";
						args.width = 58;
						args.height = 58;
						args.offsetx = -29;
						args.offsety = -29;
						args.scalex = 0;
						args.scaley = 0;
						args.posx = this.objects[GenosID].pos.x+20-29;
						args.posy = this.objects[GenosID].pos.y+44-29;
						args.direction = n * (360/maxSpawn) + this.objects[index].hp/2.5;
						args.collision = [{'type':'circle','x':args.width/2,'y':args.height/2,'radius': (args.width + args.height)/4}];
						this.createBHObject(args)	
					}
				}
				
			}
			
			if (this.objects[GenosID].attack == 4 && this.objects[index].hp <= this.objects[index].temphp-800) {
				
				this.objects[GenosID].attack = 5;
				this.objects[index].temphp = this.objects[index].hp;
				
			}
			
			
			if ( this.objects[GenosID].attack == 5 && this.objects[index].hp % 10 == 0 && this.objects[index].hp <= this.objects[index].temphp-100 && this.objects[index].hp >= this.objects[index].temphp-1500) {
				
				let maxSpawn = 12;
				this.objects[GenosID].animt = 0;
				
				for (n = 0; n < maxSpawn; n++) {
					args = {};
					args.name = "";
					args.speed = 1.5;
					args.directioniscircle = "true";
					args.hp = 1;
					args.candie = "true";
					args.canbetouched = "false";
					args.deathaction = 0;
					args.isPlayerShot = "false";
					args.isBonus = "false";
					args.cantbeinstakill = "false";
					args.action = 0;
					args.sprite = 'MicroPhantasmal_Sphere';
					args.width = 8;
					args.height = 8;
					args.offsetx = -12;
					args.offsety = -12;
					args.posx = this.objects[GenosID].pos.x+20-12;
					args.posy = this.objects[GenosID].pos.y+44-12;
					args.direction = this.getDirectionToPlayer(GenosID) + n * (360/maxSpawn) + this.objects[index].hp*5.489;
					this.createBHObject(args)	
				}
				
			}
			
			
			if ( this.objects[GenosID].attack == 5 && this.objects[index].hp <= this.objects[index].temphp-1600) {
				
				
				this.objects[GenosID].speed = 0;
				this.objects[GenosID].animx = this.objects[GenosID].pos.x;
				this.objects[GenosID].animy = this.objects[GenosID].pos.y;
					
				
				if (this.objects[GenosID].animt <= 60) {
					this.objects[GenosID].animt += 1;
					this.objects[GenosID].pos.x = this.easeOutSine(this.objects[GenosID].animt,this.objects[GenosID].animx,828+this.bhmaxwidth/2-this.objects[GenosID].animx,60);
					this.objects[GenosID].pos.y = this.easeOutSine(this.objects[GenosID].animt,this.objects[GenosID].animy,460+this.bhmaxheight/2-88-this.objects[GenosID].animy,60);
				
					if (this.objects[GenosID].animt == 60) {
						
						this.objects[GenosID].direction.y = 0;
						this.objects[GenosID].direction.x = -1;
						this.objects[GenosID].speed = 25;
						this.objects[GenosID].attack = 6;
						args = {};
						args.name = "";
						args.speed = 0;
						args.directioniscircle = "true";
						args.hp = 1;
						args.candie = "true";
						args.canbetouched = "false";
						args.deathaction = 0;
						args.isPlayerShot = "false";
						args.isBonus = "false";
						args.cantbeinstakill = "true";
						args.action = 33;
						args.sprite = 'ppg_laser';
						args.width = 2940;
						args.height = 30;
						args.posx = 0;
						args.posy = this.objects[GenosID].pos.y+15;
						args.direction = 0;
						this.createBHObject(args)	
						
					}
				
				} 
				
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			if (this.objects[GenosID].attack == 6 && 
			   ((this.objects[GenosID].pos.x < this.bhmaxwidth/2 + 452 - 90 && this.objects[GenosID].direction.x < 0) || 
			   (this.objects[GenosID].pos.x > this.bhmaxwidth/2 + 828 && this.objects[GenosID].direction.x > 0))) {
				
				this.objects[GenosID].speed /= 1.5;
				if (this.objects[GenosID].speed < 1) {
					this.objects[GenosID].speed = 0;
					this.objects[GenosID].pos.x = Math.ceil(this.objects[GenosID].pos.x);
					this.objects[GenosID].attack = 7;
					this.objects[GenosID].dirxtemp = this.objects[GenosID].direction.x;
				}
				
			}
			
			if (this.objects[GenosID].attack == 6 && this.objects[index].hp % 10 == 0) {
				
				args = {};
				args.name = "";
				args.speed = 5;
				args.directioniscircle = "false";
				args.hp = 0.1;
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
				args.posx = this.objects[GenosID].pos.x;
				args.posy = this.objects[GenosID].pos.y;
				args.direction = 180;
				this.createBHObject(args)
				
			}
			
			if (this.objects[GenosID].attack == 7) {
				
				this.objects[GenosID].animt = 0;
				
				if (this.objects[GenosID].dirxtemp < 0) {
					this.changeDir(10,GenosID);
				} else {
					this.changeDir(-10,GenosID);
				}
				this.objects[GenosID].speed = 5;
				if (this.objects[GenosID].pos.y + this.bhmaxheight/2 - 88 < 84) {
					
					this.objects[GenosID].animt = 0; 
					this.objects[GenosID].attack = 8;
					
				}
				else if (this.objects[GenosID].direction.x == -this.objects[GenosID].dirxtemp) {

					this.objects[GenosID].speed = 25;
					this.objects[GenosID].attack = 6;
					args = {};
					args.name = "";
					args.speed = 0;
					args.directioniscircle = "true";
					args.hp = 1;
					args.candie = "true";
					args.canbetouched = "false";
					args.deathaction = 0;
					args.isPlayerShot = "false";
					args.isBonus = "false";
					args.cantbeinstakill = "true";
					args.action = 33;
					args.sprite = 'ppg_laser';
					args.width = 2940;
					args.height = 30;
					args.posx = 0;
					args.posy = this.objects[GenosID].pos.y+15;
					args.direction = 0;
					this.createBHObject(args)					

				}
				
			}
			
			
			if (this.objects[GenosID].attack == 8) {
				
				this.objects[GenosID].speed = 0;
				this.objects[GenosID].animx = this.objects[GenosID].pos.x;
				this.objects[GenosID].animy = this.objects[GenosID].pos.y;
					
				
				if (this.objects[GenosID].animt <= 60) {
					this.objects[GenosID].animt += 1;
					this.objects[GenosID].pos.x = this.easeOutSine(this.objects[GenosID].animt,this.objects[GenosID].animx,452+376/2-20+this.bhmaxwidth/2-this.objects[GenosID].animx,60);
					this.objects[GenosID].pos.y = this.easeOutSine(this.objects[GenosID].animt,this.objects[GenosID].animy,84+376/2-45+this.bhmaxheight/2-this.objects[GenosID].animy,60);
				
					if (this.objects[GenosID].animt == 60) {
						
						this.objects[index].temphp = this.objects[index].hp;
						
						this.objects[GenosID].attack = 9;
						
					}
				
				} 
				
				
			}
			
			
			
			if ( this.objects[GenosID].attack == 9 && this.objects[index].hp % 180 == 0 && this.objects[index].temphp - this.objects[index].hp < 1150-60 ) {
				
				let maxSpawn = 5;
				
				for (n = 0; n < maxSpawn; n++) {
					for (k = 0; k < 2; k++) {
						args = {};
						args.name = "FinalRotate";
						args.speed = 0;
						args.directioniscircle = "true";
						args.hp = 1;
						args.candie = "true";
						args.canbetouched = "false";
						args.deathaction = 0;
						args.isPlayerShot = "false";
						args.isBonus = "false";
						args.cantbeinstakill = "true";
						args.action = 69 + k;
						args.sprite = "null";
						args.width = 58;
						args.height = 58;
						args.offsetx = -29;
						args.offsety = -29;
						args.scalex = 0;
						args.scaley = 0;
						args.posx = this.objects[GenosID].pos.x+20-29;
						args.posy = this.objects[GenosID].pos.y+44-29;
						args.direction = n * (360/maxSpawn);
						args.collision = [{'type':'circle','x':args.width/2,'y':args.height/2,'radius': (args.width + args.height)/4}];
						this.createBHObject(args)	
					}
				}
				
			}
			

			if ( this.objects[GenosID].attack == 9 && this.objects[index].temphp - this.objects[index].hp == 150 ) {
				
				AudioManager.playSe({name: 'ppg_gasterblaster', pan: 0, pitch: 50, volume: 100});
				AudioManager.playSe({name: 'ppg_gasterblasterlaser', pan: 0, pitch: 50, volume: 100});
				this.createDoomFinalLaser(2.5/2,1000,this.objects[GenosID].pos.x+20-this.bhmaxwidth/2,this.objects[GenosID].pos.y+44+10-this.bhmaxheight/2,this.getDirectionToPlayer(index)-90);
				
			}
			
			
			if ( this.objects[GenosID].attack == 9 && this.objects[index].temphp - this.objects[index].hp == 1150 ) {
				
				this.clearSpinningAttack();
				
			}
			
			
			if ( this.objects[GenosID].attack == 9 && this.objects[index].temphp - this.objects[index].hp == 1500 ) {
				
				AudioManager.playSe({name: 'ppg_gasterblaster', pan: 0, pitch: 50, volume: 100});
				AudioManager.playSe({name: 'ppg_gasterblasterlaser', pan: 0, pitch: 50, volume: 100});
				this.createDoomFinalLaser(0,500,this.objects[GenosID].pos.x+20-this.bhmaxwidth/2,this.objects[GenosID].pos.y+44-this.bhmaxheight/2,-90,[{}]);
				this.objects[GenosID].collision = [{}];
				
			}
			
			
			if ( this.objects[GenosID].attack == 9 && this.objects[index].temphp - this.objects[index].hp == 2000-60 ) {
				
				this.objects[GenosID].animt = 0;
				
			}
			
			
			if ( this.objects[GenosID].attack == 9 && this.objects[index].temphp - this.objects[index].hp >= 2000 ) {
				
				this.objects[GenosID].speed = 0;
				this.objects[GenosID].animx = this.objects[GenosID].pos.x;
				this.objects[GenosID].animy = this.objects[GenosID].pos.y;
					
				
				if (this.objects[GenosID].animt <= 300) {
					this.objects[GenosID].animt += 1;
					this.objects[GenosID].pos.y = this.easeOutSine(this.objects[GenosID].animt,this.objects[GenosID].animy,460+this.bhmaxheight/2-88-this.objects[GenosID].animy,300);
				
				} else {
					
					this.objects[index].hp = 0;
					
				}
				
			}
			
			
			this.objects[index].hp -= 1;

break;


			case 67: // PPG Aura
			
			
		if(typeof this.objects[index].begin === 'undefined') {

			this.objects[index].x = 0;
			this.objects[index].y = 0;
			this.objects[index].originx = this.objects[index].pos.x;
			this.objects[index].originy = this.objects[index].pos.y;
			this.objects[index].begin = 0;
			this.objects[index].genosid = this.getObjectByName("Genos");
			
		}
		
		this.objects[index].x = this.objects[this.objects[index].genosid].pos.x-9;
		this.objects[index].y = this.objects[this.objects[index].genosid].pos.y-2;
		
		
		this.objects[index].offset.x = Math.ceil(this.objects[index].x);
		this.objects[index].offset.y = Math.ceil(this.objects[index].y);
		
		this.objects[index].pos.x = 0;
		this.objects[index].pos.y = 0;

			
			
	

break;


			case 68: // Genos
			
			
		if(typeof this.objects[index].begin === 'undefined') {

			this.objects[index].begin = 0;
			
		}
		
		if (this.objects[index].direction.x > 0) {
			
			this.objects[index].sprite = this.loadImages('GenosRight@4@7');
			this.collisionSprite = null;
			this.objects[index].offset.x = -49;
			
		} else if (this.objects[index].direction.x < 0) {
			
			this.objects[index].sprite = this.loadImages('Genos@4@7'); 
			this.collisionSprite = null;
			this.objects[index].offset.x = 0;
			
		}

			
			
	

break;


			case 69: // EyeGoRight
			
			
		if(typeof this.objects[index].begin === 'undefined') {

			this.objects[index].begin = 0;
			this.objects[index].timer = 0;
			this.objects[index].originx = this.objects[index].pos.x;
			this.objects[index].originy = this.objects[index].pos.y;
			
		}
		if (this.objects[index].timer == 12) {
			
			this.objects[index].sprite = this.loadImages('Phantasmal_Sphere@2@5');
			
		}
		
		if (this.objects[index].name == "FinalRotate") {
			
			this.changeDir(this.objects[index].hp,index)
			this.objects[index].pos.x = this.objects[index].originx;
			this.objects[index].pos.y = this.objects[index].originy;
			this.objects[index].speed = this.objects[index].timer;
			this.objects[index].pos.x += this.objects[i].speed*this.objects[index].direction.x
			this.objects[index].pos.y += this.objects[i].speed*this.objects[index].direction.y
			this.objects[index].speed = 0;
			
		} else {
		
			if (!(this.objects[index].name == "RotateLock" && (this.objects[index].timer * this.objects[index].hp) > 180)) {
				this.changeDir(this.objects[index].hp,index)
			}
		
		}
		this.objects[index].opacity -= 0.3;
		if (this.objects[index].scale.x < 1) {
			this.objects[index].scale.x += 0.05;
			this.objects[index].scale.y += 0.05;
		}
		this.objects[index].timer += 1;
			
			
	

break;


			case 70: // EyeGoLeft
			
			
		if(typeof this.objects[index].begin === 'undefined') {

			this.objects[index].begin = 0;
			this.objects[index].timer = 0;
			this.objects[index].originx = this.objects[index].pos.x;
			this.objects[index].originy = this.objects[index].pos.y;
			
		}
		if (this.objects[index].timer == 12) {
			
			this.objects[index].sprite = this.loadImages('Phantasmal_Sphere@2@5');
			
		}
		
		if (this.objects[index].name == "FinalRotate") {
			
			this.changeDir(-this.objects[index].hp,index)
			this.objects[index].pos.x = this.objects[index].originx;
			this.objects[index].pos.y = this.objects[index].originy;
			this.objects[index].speed = this.objects[index].timer;
			this.objects[index].pos.x += this.objects[i].speed*this.objects[index].direction.x
			this.objects[index].pos.y += this.objects[i].speed*this.objects[index].direction.y
			this.objects[index].speed = 0;
			
		} else {
		
			if (!(this.objects[index].name == "RotateLock" && (this.objects[index].timer * this.objects[index].hp) > 180)) {
				this.changeDir(-this.objects[index].hp,index)
			}
		
		}
		this.objects[index].opacity -= 0.3;
		if (this.objects[index].scale.x < 1) {
			this.objects[index].scale.x += 0.05;
			this.objects[index].scale.y += 0.05;
		}
		this.objects[index].timer += 1;

			
			
	

break;



			case 71: // Rotating Appear Desapear Object
			
			
		if(typeof this.objects[index].begin === 'undefined') {

			this.objects[index].begin = 0;
			this.objects[index].maxhp = this.objects[index].hp;
			this.objects[index].oldCollision = this.objects[index].collision
			
		}
		
		this.objects[index].hp -= 1;
		
		if (this.objects[index].maxhp - this.objects[index].hp <= 60) {
			
			this.objects[index].opacity += 255/60;
			if(this.objects[index].name == 'ppg_finalDoomLaser') {
				this.objects[index].scale.y += 1/60;
			}
			
		}
		
		if (this.objects[index].sprite.name == 'ppg_hammerorange') {
			switch (this.playerHasMove) {
				
				case 1:

					this.objects[index].collision = [{}];
				
				break;
				
				case 0:
				
					this.objects[index].collision = this.objects[index].oldCollision;
				
				break;
				
			}
		}
		
		if (this.objects[index].sprite.name == 'ppg_hammerblue') {
			switch (this.playerHasMove) {
			
				case 1:

					this.objects[index].collision = this.objects[index].oldCollision;
				
				break;
				
				case 0:
				
					this.objects[index].collision = [{}];
				
				break;
			
			}
		}
		
		if (this.objects[index].hp <= 60) {
			
			this.objects[index].opacity -= 255/60;
			if(this.objects[index].name == 'ppg_finalDoomLaser') {
				this.objects[index].scale.y -= 1/60;
			}
			
		}
			
			
	

break;


			case 80: // Mafia Core
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 0; 
			this.objects[index].timerSpeed = 1; 
			this.objects[index].begin = 0;
		}
			
			if (this.objects[index].timer % (Math.floor(240*this.objects[index].timerSpeed)+1) == 0) {
			
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				let random = Math.floor(Math.random()*2);
				args.action = (random) ? 81 : 82;
				args.sprite = (random) ? 'Mafia1@2' : 'Mafia2@2';
				args.width = 48;
				args.height = 96;
				args.offsety = 0;
				args.offsetx = 0;
				random = Math.floor(Math.random()*2);
				args.posx = 640+48*((random) ? -4 : 3) + $gameBulletHell.bhmaxwidth/2+((random) ? -20 : 20) + ((random) ? -1 : 1)*Math.floor(Math.random()*108);
				args.posy = 720;
				args.direction = 0;
				this.createBHObject(args)
				
			}
			
			
			if (this.objects[index].timer % (Math.floor(1500*this.objects[index].timerSpeed)+1) == 0) {
			
				args = {};
				args.name = "";
				args.speed = 5;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				args.action = 83;
				args.sprite = 'Mafia5@2';
				let random = Math.floor(Math.random()*2);
				args.scalex = (random) ? -1 : 1
				args.direction = (random) ? 270 : 90;
				args.posx = (random) ? 1280+this.bhmaxwidth/2 : -48+this.bhmaxwidth/2;
				args.posy = 150+Math.floor(Math.random()*350);
				args.width = 48;
				args.height = 48;
				args.offsety = 0;
				args.offsetx = 0;
				args.zindex = 10;
				args.collision = [{}];
				this.createBHObject(args)
				
			}
			
			if (this.objects[index].timer % (Math.floor(400*this.objects[index].timerSpeed)+1) == 0) {
			
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				args.action = 88;
				args.sprite = 'Mafia4@2';
				args.direction = 180;
				args.posx = Math.random()*1328+this.bhmaxwidth/2-48;
				args.posy = -48;
				args.width = 48;
				args.height = 48;
				args.offsety = 0;
				args.offsetx = 0;
				args.zindex = 10;
				args.collision = [{}];
				this.createBHObject(args)
				
			}
			
				this.objects[index].timerSpeed -= this.objects[index].timer/1000000000
				if (this.objects[index].timerSpeed < 0.25) {
					
					this.objects[index].timerSpeed = 0.25
					
				}
			
			this.objects[index].timer += 1;
			
			
	

break;


			case 81: // Mafia 1
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 0; 
			this.objects[index].maxhp = this.objects[index].hp;
			this.objects[index].animt = 0; 
			this.objects[index].animy = this.objects[index].pos.y;
			this.objects[index].begin = 0;
			this.objects[index].randomy = Math.random()*(-200);
		}
			
		
		if (this.objects[index].animt <= 60) {
			this.objects[index].animt += 1;
			this.objects[index].pos.y = this.easeOutSine(this.objects[index].animt,this.objects[index].animy,this.objects[index].randomy-72-44,60);
		} else {
			
			if (this.objects[index].timer == 0) {
				
				this.objects[index].pos.y = Math.floor(this.objects[index].pos.y);
				
			}
			
		if (typeof this.objects[index].flash !== 'undefined') {
			
			
			this.objects[index].flash.hp = 0;
			
		}
			
			if (this.objects[index].timer % 60 == 0) {
			
				AudioManager.playSe({name: 'Gun1', pan: 0, pitch: 100, volume: 100});
				args = {};
				args.name = "";
				args.speed = 10;
				args.directioniscircle = "true";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				args.action = 87;
				args.sprite = 'MafiaBullet';
				args.width = 2;
				args.height = 2;
				args.offsety = 0;
				args.offsetx = 0;
				args.anchorx = 1;
				args.scalex = 0;
				args.posx = this.objects[index].pos.x - this.objects[index].width/2-16;
				args.posy = this.objects[index].pos.y + this.objects[index].height/2+24;
				args.angle = this.getDirectionToPlayer(index,64 - this.objects[index].width-16,24);
				args.direction = this.getDirectionToPlayer(index,64 - this.objects[index].width-16,24);
				args.collision =[{type:'rect',x1:60,y1:0,x2:2,y2:2}];
				args.zindex = 10;
				this.createBHObject(args)
				
					args = {};
					args.name = "";
					args.speed = 0;
					args.directioniscircle = "false";
					args.hp = 1;
					args.candie = "true";
					args.canbetouched = "false";
					args.deathaction = 0;
					args.isPlayerShot = "false";
					args.isBonus = "false";
					args.cantbeinstakill = "false";
					args.action = 0;
					args.sprite = 'MafiaBulletFlash';
					args.width = 0;
					args.height = 0;
					args.offsety = -80;
					args.offsetx = -16;
					args.posx = this.objects[index].pos.x - this.objects[index].width/2;
					args.posy = this.objects[index].pos.y + this.objects[index].height/2+24;
					args.collision = [{}];
					args.zindex = 15;
					this.objects[index].flash = this.createBHObject(args)
				
			}
			
			if (this.objects[index].timer == 500) {
			
				this.objects[index].direction.x = 0;
				this.objects[index].direction.y = 1;
				this.objects[index].speed = 2;
				
			}
			
			this.objects[index].timer += 1;
			
		}
			this.objects[index].zindex = this.objects[index].pos.y/10000
			
			
	

break;




			case 82: // Mafia 2
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 0; 
			this.objects[index].maxhp = this.objects[index].hp;
			this.objects[index].animt = 0; 
			this.objects[index].animy = this.objects[index].pos.y;
			this.objects[index].begin = 0;
			this.objects[index].randomy = Math.random()*(-200);
		}
		
		if (typeof this.objects[index].flash !== 'undefined') {
			
			
			this.objects[index].flash.hp = 0;
			
		}
			
		
		if (this.objects[index].animt <= 60) {
			this.objects[index].animt += 1;
			this.objects[index].pos.y = this.easeOutSine(this.objects[index].animt,this.objects[index].animy,this.objects[index].randomy-72-44,60);
		} else {
			
			if (this.objects[index].timer == 0) {
				
				this.objects[index].pos.y = Math.floor(this.objects[index].pos.y);
				
			}
			
			if (this.objects[index].timer % 360 == 0 || this.objects[index].timer % 360 == 30) {
			
				AudioManager.playSe({name: 'Gun2', pan: 0, pitch: 120+Math.random()*30, volume: 100});
				
			}
			if (this.objects[index].timer % 360 < 60) {
				
				
				if (this.objects[index].timer % 6 == 0) {
				
					args = {};
					args.name = "";
					args.speed = 10;
					args.directioniscircle = "true";
					args.hp = 0;
					args.candie = "false";
					args.canbetouched = "false";
					args.deathaction = 0;
					args.isPlayerShot = "false";
					args.isBonus = "false";
					args.cantbeinstakill = "false";
					args.action = 87;
					args.sprite = 'MafiaBullet';
					args.width = 2;
					args.height = 2;
					args.offsety = 0;
					args.offsetx = 0;
					args.anchorx = 1;
					args.scalex = 0;
					args.posx = this.objects[index].pos.x - this.objects[index].width/2-10;
					args.posy = this.objects[index].pos.y + this.objects[index].height/2+24;
					args.angle = this.getDirectionToPlayer(index,64 - this.objects[index].width,24);
					args.direction = this.getDirectionToPlayer(index,64 - this.objects[index].width-10,24);
					args.collision =[{type:'rect',x1:60,y1:0,x2:2,y2:2}];
					args.zindex = 10;
					this.createBHObject(args)
					
					args = {};
					args.name = "";
					args.speed = 0;
					args.directioniscircle = "false";
					args.hp = 1;
					args.candie = "true";
					args.canbetouched = "false";
					args.deathaction = 0;
					args.isPlayerShot = "false";
					args.isBonus = "false";
					args.cantbeinstakill = "false";
					args.action = 0;
					args.sprite = 'MafiaBulletFlash';
					args.width = 0;
					args.height = 0;
					args.offsety = -80;
					args.offsetx = -16;
					args.posx = this.objects[index].pos.x - this.objects[index].width/2;
					args.posy = this.objects[index].pos.y + this.objects[index].height/2+24;
					args.collision = [{}];
					args.zindex = 15;
					this.objects[index].flash = this.createBHObject(args)
					
				}
				
			}
			
			if (this.objects[index].timer == 500) {
			
				this.objects[index].direction.x = 0;
				this.objects[index].direction.y = 1;
				this.objects[index].speed = 2;
				
			}
			
			this.objects[index].timer += 1;
		}
			this.objects[index].zindex = this.objects[index].pos.y/10000
			
			
	

break;



			case 83: // Mafia 3
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 0; 
			this.objects[index].begin = 0;
		}
			
		
		if (this.objects[index].pos.x < 640 + 160-48 + $gameBulletHell.bhmaxwidth/2 && this.objects[index].pos.x > 640 - 160 + $gameBulletHell.bhmaxwidth/2) {
			
				if (this.objects[index].timer % 20 == 0) {
				
					args = {};
					args.name = "";
					args.speed = 5;
					args.directioniscircle = "false";
					args.hp = 25;
					args.candie = "true";
					args.canbetouched = "false";
					args.deathaction = 85;
					args.isPlayerShot = "false";
					args.isBonus = "false";
					args.cantbeinstakill = "true";
					args.action = 84;
					args.sprite = 'Bomb@4';
					args.width = 48;
					args.height = 48;
					args.offsety = 0;
					args.offsetx = 0;
					args.posx = this.objects[index].pos.x;
					args.posy = this.objects[index].pos.y;
					args.direction = 180;
					args.zindex = 5;
					args.collision = [{}];
					this.createBHObject(args)
					
				}
			
			this.objects[index].timer += 1;
		}
			
	

break;

			case 84: // Explosive Bullet
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].maxY = this.objects[index].pos.y + 304-48;
			this.objects[index].begin = 0;
			
			args = {};
			args.name = "";
			args.speed = 0;
			args.directioniscircle = "false";
			args.hp = 1;
			args.candie = "true";
			args.canbetouched = "false";
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			args.cantbeinstakill = "true";
			args.action = 0;
			args.sprite = 'BombShadow';
			args.width = 0;
			args.height = 0;
			args.offsety = 0;
			args.offsetx = 0;
			args.posx = this.objects[index].pos.x;
			args.posy = this.objects[index].maxY+10;
			args.direction = 0;
			args.zindex = -0.5;
			args.collision = [{}];
			this.objects[index].shadow = this.createBHObject(args)
		}

		this.objects[index].explodePower = this.objects[index].hp;

		if (this.objects[index].pos.y >=this.objects[index].maxY) {
			
				this.objects[index].shadow.hp = 0;
				this.objects[index].hp = 0;
			
		}
			
			
	

break;

			case 85: // Explosive Bullet Explosion
			

		AudioManager.playSe({name: 'Explosion4', pan: 0, pitch: 150, volume: 100});
		$gameScreen.startShake(5, 5, 10);
		
			args = {};
			args.name = "";
			args.speed = 0;
			args.directioniscircle = "false";
			args.hp = 29;
			args.candie = "true";
			args.canbetouched = "false";
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			args.cantbeinstakill = "true";
			args.action = 90;
			args.sprite = 'Explosion@29@1';
			args.width = 0;
			args.height = 0;
			args.offsety = -75+24;
			args.offsetx = -45+24;
			args.posx = this.objects[index].pos.x;
			args.posy = this.objects[index].pos.y;
			args.direction = 0;
			args.zindex = 0.5;
			args.collision = [{}];
			this.createBHObject(args)
			
			args = {};
			args.name = "";
			args.speed = 0;
			args.directioniscircle = "false";
			args.hp = 2;
			args.candie = "true";
			args.canbetouched = "false";
			args.deathaction = 0;
			args.isPlayerShot = "false";
			args.isBonus = "false";
			args.cantbeinstakill = "false";
			args.action = 1;
			args.sprite = 'MafiaBulletFlash';
			args.width = 0;
			args.height = 0;
			args.offsety = -64+24;
			args.offsetx = -64+24;
			args.posx = this.objects[index].pos.x;
			args.posy = this.objects[index].pos.y;
			args.collision = [{}];
			args.zindex = 15;
			this.createBHObject(args)
		
		this.objects[index].directionS = (Math.atan2(this.objects[index].direction.y,this.objects[index].direction.x) * 180 / Math.PI)+90;
		
		
		for (n=0;n<this.objects[index].explodePower;n++) {
			
			this.createGroundJumpingBullet(this.objects[index].pos.x,this.objects[index].pos.y,16,16,2+Math.random()*this.objects[index].speed,this.objects[index].directionS-180 + 70-Math.random()*55,'BombBullet',-8,-8,null,86);
		}
		
		for (n=0;n<this.objects[index].explodePower;n++) {
			
			this.createGroundJumpingBullet(this.objects[index].pos.x,this.objects[index].pos.y,16,16,2+Math.random()*this.objects[index].speed,this.objects[index].directionS-180 + 290+Math.random()*55,'BombBullet',-8,-8,null,86);
		}
			
			
	

break;


			case 86: // Ground Bounce Prop
			

			if (typeof this.objects[index].gravity === 'undefined') { 
				this.objects[index].random = Math.floor(Math.random()*2);
				this.objects[index].baseX = this.objects[index].pos.x;
				this.objects[index].maxY = this.objects[index].pos.y+20;
				this.objects[index].gravity = 5
				this.objects[index].zindex = 3;
				this.objects[index].oldCollision = this.objects[index].collision;				
				
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 1;
				args.candie = "true";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "true";
				args.action = 0;
				args.sprite = 'BombBulletShadow';
				args.width = 0;
				args.height = 0;
				args.offsety = 0;
				args.offsetx = 0;
				args.posx = this.objects[index].pos.x;
				args.posy = this.objects[index].maxY-16;
				args.direction = 0;
				args.zindex = -0.5;
				args.collision = [{}];
				this.objects[index].shadow = this.createBHObject(args)
				this.objects[index].cantbeinstakill = true;
				this.objects[index].hp = 1;
			}
			this.objects[index].gravity -= 0.25;
			this.objects[index].maxY += ((this.objects[index].random) ? 2 : -1)/(1+Math.abs(this.objects[index].baseX-this.objects[index].pos.x)/10);
			
			this.objects[index].pos.y -= this.objects[index].gravity;
			if (typeof this.objects[index].shadow !== 'undefined' && typeof this.objects[index].shadow.pos.y !== 'undefined') {
				this.objects[index].shadow.pos.y = this.objects[index].maxY-16;
				this.objects[index].shadow.pos.x = this.objects[index].pos.x
			}
		
		if (this.objects[index].pos.y < this.objects[index].maxY-48) {
			
			this.objects[index].collision = [{}]
			this.objects[index].zindex = 3;
			
		} else {
			
			this.objects[index].collision = this.objects[index].oldCollision;
			this.objects[index].zindex = 0.5;
			
		}
		
		if (this.objects[index].pos.y > this.objects[index].maxY-this.objects[index].height && this.objects[index].pos.x < 808 + this.bhmaxwidth/2 - this.objects[index].width && this.objects[index].pos.x > 472 + this.bhmaxwidth/2) {
			
				this.objects[index].pos.y = this.objects[index].maxY-this.objects[index].height;
				this.objects[index].gravity = Math.abs(this.objects[index].gravity*((this.objects[index].random) ? 0.75 : 1));
				if (this.objects[index].direction.y < 0) {
					this.objects[index].gravity /= 1+Math.abs(this.objects[index].direction.y);
				}
				this.objects[index].direction.y = 0;
			
		}
		if ((this.objects[index].pos.x > 808 + this.bhmaxwidth/2 - this.objects[index].width || this.objects[index].pos.x < 472 + this.bhmaxwidth/2) || this.objects[index].pos.y > 720+$gameBulletHell.bhmaxheight/2) {
			
				this.objects[index].shadow.hp = 0;
			
		}
		
		
		let maxYTruck = 302;
		
		if (this.objects[index].pos.x > 808-90 + this.bhmaxwidth/2 - this.objects[index].width && !(this.objects[index].pos.x > 808 + this.bhmaxwidth/2 - this.objects[index].width)) {
			
				maxYTruck = 302;
				maxYTruck += 73 * ((this.objects[index].pos.x-(808-90 + this.bhmaxwidth/2 - this.objects[index].width))/(808 + this.bhmaxwidth/2 - this.objects[index].width -(808-90 + this.bhmaxwidth/2 - this.objects[index].width)));
			
		}
		
		if (this.objects[index].pos.x < 472+90 + this.bhmaxwidth/2 && !(this.objects[index].pos.x < 472 + this.bhmaxwidth/2)) {
			
				maxYTruck = 375;
				maxYTruck -= 73 * ((this.objects[index].pos.x-(472 + this.bhmaxwidth/2))/((472+90 + this.bhmaxwidth/2) - (472 + this.bhmaxwidth/2)));
			
		}
		
		if (this.objects[i].collideWithPlayer || (this.objects[index].maxY < maxYTruck+$gameBulletHell.bhmaxheight/2 && this.objects[index].pos.y > this.objects[index].maxY-32)) {
			
			this.objects[index].shadow.hp = 0;
			this.objects[index].hp = 0;
			this.objects[index].candie = true;
			
		}
			
			
	

break;


			case 87: // Mafia Bullet
			
		if (this.objects[index].scale.x < 1) {
			
			this.objects[index].scale.x += (this.objects[index].speed/64)
			
		}
		
		if (this.objects[index].scale.x > 1) {
			
			this.objects[index].scale.x = 1
			
		}
			
	

break;


			case 88: // Mafia 4
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 0; 
			this.objects[index].maxhp = this.objects[index].hp;
			this.objects[index].animt = 0; 
			this.objects[index].animy = this.objects[index].pos.y;
			this.objects[index].begin = 0;
		}
			
		
		if (this.objects[index].animt <= 60) {
			this.objects[index].animt += 1;
			this.objects[index].pos.y = this.easeOutSine(this.objects[index].animt,this.objects[index].animy,200,60);
		} else {
			
			if (this.objects[index].timer == 0) {
				
				this.objects[index].pos.y = Math.floor(this.objects[index].pos.y);
				
			}
			
		if (typeof this.objects[index].flash !== 'undefined') {
			
			
			this.objects[index].flash.hp = 0;
			
		}
			
			if (this.objects[index].timer % 60 == 0 && this.objects[index].timer < 500) {
			
				AudioManager.playSe({name: 'Thunder5', pan: 0, pitch: 150, volume: 70});
				AudioManager.playSe({name: 'Wind3', pan: 0, pitch: 100, volume: 70});
				args = {};
				args.name = "";
				args.speed = 6;
				args.directioniscircle = "true";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				args.action = 89;
				args.sprite = 'forceFieldCore@3';
				args.width = 16;
				args.height = 16;
				args.offsety = -16;
				args.offsetx = -16;
				args.posx = this.objects[index].pos.x + this.objects[index].width/2;
				args.posy = this.objects[index].pos.y + this.objects[index].height/2;
				let random = Math.random()
				args.direction = this.getDirectionToPlayer(index,this.objects[index].width/2-8)+random*10
				this.createBHObject(args)
				args.direction = this.getDirectionToPlayer(index,this.objects[index].width/2-8)-random*10
				this.createBHObject(args)
				
					args = {};
					args.name = "";
					args.speed = 0;
					args.directioniscircle = "false";
					args.hp = 1;
					args.candie = "true";
					args.canbetouched = "false";
					args.deathaction = 0;
					args.isPlayerShot = "false";
					args.isBonus = "false";
					args.cantbeinstakill = "false";
					args.action = 0;
					args.sprite = 'MafiaBulletFlash';
					args.width = 0;
					args.height = 0;
					args.offsety = -80;
					args.offsetx = -16;
					args.posx = this.objects[index].pos.x - this.objects[index].width/2;
					args.posy = this.objects[index].pos.y + this.objects[index].height/2+24;
					args.collision = [{}];
					args.zindex = 15;
					this.objects[index].flash = this.createBHObject(args)
				
			}
			
			if (this.objects[index].timer >= 500) {
			
				let objDir = this.objects[index].getDirection()
			
				if (this.objects[index].pos.x+24 > 640 + this.bhmaxwidth/2 && objDir > 0 && objDir <=90)  {
					this.objects[index].direction = this.objects[index].initDir(objDir-2,true);
				}
				if (this.objects[index].pos.x+24 < 640 + this.bhmaxwidth/2 && objDir < 180 && objDir >=90)  {
					this.objects[index].direction = this.objects[index].initDir(objDir+2,true);
				}
				this.objects[index].speed = 4;
				
			}
			
			this.objects[index].timer += 1;
			
		}
			this.objects[index].zindex = this.objects[index].pos.y/10000
			
			
	

break;



			case 89: // Force Field
			
			
			if (typeof this.objects[index].timer === 'undefined') {
				this.objects[index].timer = 0;
				this.objects[index].FFframe = 0;
				this.objects[index].connected = [];
				this.objects[index].timerFF = []
			}
			
			this.objects[index].forcesFields = this.objects.filter(object => object.action == 89);
			this.objects[index].selfFFid = this.objects[index].forcesFields.findIndex(item => item == this.objects[index]);
			

			this.objects[index].timer += 1;
			
			if (this.objects[index].timer % 4 == 0) {
				
				this.objects[index].FFframe += 1;
				if (this.objects[index].FFframe >= 3) {
					this.objects[index].FFframe = 0;
				}
				
			}
			
				for (let z = 0; z<this.objects[index].forcesFields.length; z++) {
					let selfID = this.objects[index].selfFFid;
					let obj = this.objects[index].forcesFields[z];
					if (obj !== this.objects[index] && typeof this.objects[index].connected !== 'undefined' && (typeof this.objects[index].connected[z] === 'undefined' || !this.objects[index].connected[z]) && this.getDistanceBetweenPoints(this.objects[index].pos.x,this.objects[index].pos.y,obj.pos.x,obj.pos.y) < 200) {
						if (typeof obj.connected === 'undefined') {
							obj.connected = [];
							obj.timerFF = [];
						}
						if (typeof obj.connected[selfID] === 'undefined') {
							AudioManager.playSe({name: 'Paralyze2', pan: 0, pitch: 100, volume: 70});
							obj.connected[selfID] = true;
							obj.timerFF[selfID] = 100;
						}
						args = {};
						args.name = "";
						args.speed = 0;
						args.directioniscircle = "true";
						args.hp = 0;
						args.candie = "true";
						args.canbetouched = "false";
						args.deathaction = 0;
						args.isPlayerShot = "false";
						args.isBonus = "false";
						args.cantbeinstakill = "false";
						args.action = 0;
						args.sprite = 'forceField@3';
						args.width = 48;
						args.height = 32;
						args.offsety = 0;
						args.offsetx = 0;
						args.posx = this.objects[index].pos.x+this.objects[index].width/2;
						args.posy = this.objects[index].pos.y-this.objects[index].height/2;
						args.anchorx = 0;
						args.scalex = this.getDistanceBetweenPoints(this.objects[index].pos.x,this.objects[index].pos.y,obj.pos.x,obj.pos.y)/48
						args.angle = this.getDirectionToPosition(this.objects[index].pos.x,this.objects[index].pos.y,obj.pos.x,obj.pos.y+8);
						args.collision_scalex = 'scale';
						args.collision_angle = 'angle';
						args.zindex = -0.1;
						let forceField = this.createBHObject(args)
						forceField.frame = this.objects[index].FFframe;
					}
					else if (obj !== this.objects[index] && typeof this.objects[index].connected !== 'undefined' && (typeof this.objects[index].connected[z] !== 'undefined' && this.objects[index].connected[z]) && this.getDistanceBetweenPoints(this.objects[index].pos.x,this.objects[index].pos.y,obj.pos.x,obj.pos.y) >= 200 && this.objects[index].timerFF[z] > 0) {
						
						if (this.objects[index].timerFF[z] == 100) {
							AudioManager.playSe({name: 'Paralyze1', pan: 0, pitch: 150, volume: 70});
						}
						this.objects[index].timerFF[z] -= 10;
						args = {};
						args.name = "";
						args.speed = 0;
						args.directioniscircle = "true";
						args.hp = 0;
						args.candie = "true";
						args.canbetouched = "false";
						args.deathaction = 0;
						args.isPlayerShot = "false";
						args.isBonus = "false";
						args.cantbeinstakill = "false";
						args.action = 0;
						args.sprite = 'forceField@3';
						args.width = 48;
						args.height = 32;
						args.offsety = 0;
						args.offsetx = 0;
						args.posx = this.objects[index].pos.x+this.objects[index].width/2;
						args.posy = this.objects[index].pos.y-this.objects[index].height/2;
						args.anchorx = 0;
						args.scalex = this.getDistanceBetweenPoints(this.objects[index].pos.x,this.objects[index].pos.y,obj.pos.x,obj.pos.y)/48
						args.scaley = this.objects[index].timerFF[z]/100
						args.opacity = (this.objects[index].timerFF[z]/100)*255
						args.angle = this.getDirectionToPosition(this.objects[index].pos.x,this.objects[index].pos.y,obj.pos.x,obj.pos.y+8);
						args.collision_scalex = 'scale';
						args.collision_scaley = 0;
						args.collision_angle = 'angle';
						args.zindex = -0.1;
						let forceField = this.createBHObject(args)
						forceField.frame = this.objects[index].FFframe;
						
					}
				}
			
	

break;


			case 90: // Explosion

this.objects[index].hp -= 1;

if (this.objects[index].pos.y + this.objects[index].offset.y < $gameVariables.value(84) + 44) {
	
	this.objects[index].zindex = 0.5;
	
} else {
	
	this.objects[index].zindex = 1.5;
	
}

if (this.objects[index].frame < 9) {
	
	this.objects[index].collision = [{type:'circle',x:24,y:24,radius:16}]
	
} else {
	
	this.objects[index].zindex = 1.5;
	this.objects[index].collision = [{}]
	
}
break;


			case 100: // Mafia Core Quest
			
		if(typeof this.objects[index].begin === 'undefined') {
			this.objects[index].timer = 1; 
			this.objects[index].timerSpeed = 1; 
			this.objects[index].begin = 0;
			this.objects[index].dialogue = 0;
		}
		
		let timer = this.objects[index].timer;
		
		
		
		this.openBlackBars(timer == 240);
		
		
			if (timer == 300) {
				if (this.objects[index].dialogue < 1) {
					$gameMessage.setFaceImage("Oujnish6", 7);
					$gameMessage.setSpeakerName("Louis Émile de Réac");
					$gameMessage.add("Les sous-fifres de Giovanno sont à nos trousses !");
					$gameMessage.add("Fais attention !");
					this.objects[index].dialogue += 1;
				
				} 
				if ($gameMessage.isBusy())	{
					
					$gameVariables.setValue(83,this.lastX);
					$gameVariables.setValue(84,this.lastY); 
					this.objects[2].animt -= 1;
					break;
					
				}
				
			this.closeBlackBars(true);
			}
			
			this.deleteBlackBars(timer == 360);
			
			if (timer % 240 == 0 && timer < 2000) {
				
			
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				let random = Math.floor(Math.random()*2);
				args.action = (random) ? 81 : 82;
				args.sprite = (random) ? 'Mafia1@2' : 'Mafia2@2';
				args.width = 48;
				args.height = 96;
				args.offsety = 0;
				args.offsetx = 0;
				random = Math.floor(Math.random()*2);
				args.posx = 640+48*((random) ? -4 : 3) + $gameBulletHell.bhmaxwidth/2+((random) ? -20 : 20) + ((random) ? -1 : 1)*Math.floor(Math.random()*108);
				args.posy = 720;
				args.direction = 0;
				this.createBHObject(args)
				
			}

			if (timer >= 2000 && timer <= 2100 && timer % 10 == 0) {
				 
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				let random = Math.floor(Math.random()*2);
				args.action = (random) ? 81 : 82;
				args.sprite = (random) ? 'Mafia1@2' : 'Mafia2@2';
				args.width = 48;
				args.height = 96;
				args.offsety = 0;
				args.offsetx = 0;
				random = Math.floor(Math.random()*2);
				args.posx = 640+48*((random) ? -4 : 3) + $gameBulletHell.bhmaxwidth/2+((random) ? -20 : 20) + ((random) ? -1 : 1)*Math.floor(Math.random()*108);
				args.posy = 720;
				args.direction = 0;
				this.createBHObject(args)
				
			}
			
			if (timer % 500 == 0 && timer > 2500 && timer < 3500) {
				
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				let random = Math.floor(Math.random()*2);
				args.action = (random) ? 81 : 82;
				args.sprite = (random) ? 'Mafia1@2' : 'Mafia2@2';
				args.width = 48;
				args.height = 96;
				args.offsety = 0;
				args.offsetx = 0;
				random = Math.floor(Math.random()*2);
				args.posx = 640+48*((random) ? -4 : 3) + $gameBulletHell.bhmaxwidth/2+((random) ? -20 : 20) + ((random) ? -1 : 1)*Math.floor(Math.random()*108);
				args.posy = 720;
				args.direction = 0;
				this.createBHObject(args)
				
			}
			
			
			if (timer % 800 == 0 && timer > 2500 && timer < 3500) {
				
				args = {};
				args.name = "";
				args.speed = 5;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				args.action = 83;
				args.sprite = 'Mafia5@2';
				let random = Math.floor(Math.random()*2);
				args.scalex = (random) ? -1 : 1
				args.direction = (random) ? 270 : 90;
				args.posx = (random) ? 1280+this.bhmaxwidth/2 : -48+this.bhmaxwidth/2;
				args.posy = 150+Math.floor(Math.random()*350);
				args.width = 48;
				args.height = 48;
				args.offsety = 0;
				args.offsetx = 0;
				args.zindex = 10;
				args.collision = [{}];
				this.createBHObject(args)
				
			}
			
			
			if (timer % 50 == 0 && timer >= 3500 && timer <= 3600) {
				
				args = {};
				args.name = "";
				args.speed = 5;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				args.action = 83;
				args.sprite = 'Mafia5@2';
				let random = Math.floor(Math.random()*2);
				args.scalex = (random) ? -1 : 1
				args.direction = (random) ? 270 : 90;
				args.posx = (random) ? 1280+this.bhmaxwidth/2 : -48+this.bhmaxwidth/2;
				args.posy = 150+Math.floor(Math.random()*350);
				args.width = 48;
				args.height = 48;
				args.offsety = 0;
				args.offsetx = 0;
				args.zindex = 10;
				args.collision = [{}];
				this.createBHObject(args)
				
			}
			
			if (timer % 400 == 0 && timer > 4000 && timer < 8000) {
			
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				args.action = 88;
				args.sprite = 'Mafia4@2';
				args.direction = 180;
				args.posx = Math.random()*1328+this.bhmaxwidth/2-48;
				args.posy = -48;
				args.width = 48;
				args.height = 48;
				args.offsety = 0;
				args.offsetx = 0;
				args.zindex = 10;
				args.collision = [{}];
				this.createBHObject(args)
				
			}
			
			if (timer % 240 == 0 && timer > 6000 && timer < 8000) {
				
			
				args = {};
				args.name = "";
				args.speed = 0;
				args.directioniscircle = "false";
				args.hp = 0;
				args.candie = "false";
				args.canbetouched = "false";
				args.deathaction = 0;
				args.isPlayerShot = "false";
				args.isBonus = "false";
				args.cantbeinstakill = "false";
				let random = Math.floor(Math.random()*2);
				args.action = (random) ? 81 : 82;
				args.sprite = (random) ? 'Mafia1@2' : 'Mafia2@2';
				args.width = 48;
				args.height = 96;
				args.offsety = 0;
				args.offsetx = 0;
				random = Math.floor(Math.random()*2);
				args.posx = 640+48*((random) ? -4 : 3) + $gameBulletHell.bhmaxwidth/2+((random) ? -20 : 20) + ((random) ? -1 : 1)*Math.floor(Math.random()*108);
				args.posy = 720;
				args.direction = 0;
				this.createBHObject(args)
				
			}
			
			this.objects[index].timer += 1;
			
			
	

break;


		
		}
	}