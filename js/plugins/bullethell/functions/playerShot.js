BulletHell.prototype.doShot = function () {
	let item = {};
	switch (this.playerTypeOfShot) {
		case 0:
			AudioManager.playSe({name: 'Attack2', pan: 0, pitch: 150, volume: 60});
			
			item.name = "PlShot";
			item.posx = $gameVariables.value(83)+14 + this.bhmaxwidth/2;
			item.posy = $gameVariables.value(84)+8 + this.bhmaxheight/2;
			item.sprite = 'PlayerShot';
			item.width = 8;
			item.height = 16;
			item.speed = 8;
			item.offsetx = 0;
			item.offsety = 0;
			item.directioniscircle = "false";
			item.hp = 1;
			item.candie = "true";
			item.canbetouched = "false";
			item.action = 0;
			item.deathaction = 0;
			item.isPlayerShot = "true";
			item.isBonus = "false";
					
			if ($gameVariables.value(94) >= 5) {
				

					item.direction = 0+30;
					this.createBHObject(item)
					item.direction = 0-30;
					this.createBHObject(item)
				
			}
			
			if ($gameVariables.value(94) >= 4) {
				
					item.direction = 0;
					item.posx -= 8;
					this.createBHObject(item)
					item.posx += 16;
					this.createBHObject(item)
				
			} else {
				item.direction = 0;
				this.createBHObject(item)
			}
			

			switch ($gameVariables.value(94)) {
				
				case 0:
					this.plshot_timer = 10;
				break;
				case 1:
					this.plshot_timer = 8;
				break;
				case 2:
					this.plshot_timer = 5;
				break;
				default:
					this.plshot_timer = 3;
				break;
			}
		
			break;
			
		case 1:
			AudioManager.playSe({name: 'Attack2', pan: 0, pitch: 150, volume: 60});
			
			item.name = "PlShot";
			switch (this.soulDirection) {
				
				case 2:
					item.posx = $gameVariables.value(83)+14 + this.bhmaxwidth/2;
					item.posy = $gameVariables.value(84)+16 + this.bhmaxheight/2;
					item.sprite = 'ppg_pshot';
					item.direction = 180;
					item.width = 8;
					item.height = 16;
				break;
				case 4:
					item.posx = $gameVariables.value(83)-7 + this.bhmaxwidth/2;
					item.posy = $gameVariables.value(84)+39 + this.bhmaxheight/2;
					item.sprite = 'ppg_leftpshot';
					item.direction = 270;
					item.width = 16;
					item.height = 8;
				break;
				case 6:
			
				break;
				case 8:
					item.posx = $gameVariables.value(83)+14 + this.bhmaxwidth/2;
					item.posy = $gameVariables.value(84)+16 + this.bhmaxheight/2;
					item.sprite = 'ppg_pshot';
					item.direction = 0;
					item.width = 8;
					item.height = 16;
				break;
			}
			item.offsetx = 0;
			item.offsety = 0;
			item.speed = 8;
			item.directioniscircle = "false";
			item.hp = 1;
			item.candie = "true";
			item.canbetouched = "false";
			item.action = 0;
			item.deathaction = 0;
			item.isPlayerShot = "true";
			item.isBonus = "false";
			this.createBHObject(item)
			
			this.plshot_timer = 10;
			
			break;
			
			
	}
}