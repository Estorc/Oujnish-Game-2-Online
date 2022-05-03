//=============================================================================
// RPG Maker MZ - Bullet Hell Drawing
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays text as a picture.
 * @author Yoji Ojima
 *
 * @help TextPicture.js
 *
 * This plugin provides a command to show text as a picture.
 *
 * Use it in the following procedure.
 *   1. Call the plugin command "Set Text Picture".
 *   2. Execute "Show Picture" without specifying an image.
 *
 * @command set
 * @text Set Text Picture
 * @desc Sets text to display as a picture.
 *       After this, execute "Show Picture" without specifying an image.
 * @arg text
 * @type multiline_string
 * @text Text
 * @desc 
 *
 * @command add
 * @text Add Object
 * @desc 
 * @arg name
 * @type string
 * @text Name
 * @desc 
 * @arg posx
 * @type variable
 * @text PosX
 * @desc 
 * @arg posy
 * @type variable
 * @text PosY
 * @desc 
 * @arg width
 * @type number
 * @text Width
 * @desc 
 * @arg height
 * @type number
 * @text Height
 * @desc 
 * @arg speed
 * @type variable
 * @text Speed
 * @desc 
 * @arg direction
 * @type variable
 * @text Direction
 * @desc 
 * @arg directioniscircle
 * @type boolean
 * @text DirectionIsCircle
 * @desc 
 * @arg sprite
 * @type file
 * @dir img/bhsprite/
 * @require 1
 * @text Sprite
 * @desc 
 * @arg hp
 * @type number
 * @text HP
 * @desc 
 * @arg candie
 * @type boolean
 * @text CanDie
 * @desc 
 * @arg canbetouched
 * @type boolean
 * @text CanBeTouched
 * @desc 
 * @arg action
 * @type number
 * @text ActionID
 * @desc 
 * @arg deathaction
 * @type number
 * @text DeathActionID
 * @desc 
 * @arg isPlayerShot
 * @type boolean
 * @text IsPlayerShot
 * @desc 
 * @arg isBonus
 * @type boolean
 * @text IsBonus
 * @desc
 * @arg BonusPower
 * @type number
 * @text BonusPower
 * @desc 
 *
 * @command remove
 * @text Remove Object
 * @desc 
 * @arg id
 * @type number
 * @text ID
 * @desc 
 *
 * @command removename
 * @text Remove Name
 * @desc 
 * @arg name
 * @type string
 * @text Name
 * @desc 
 *
 * @command clear
 * @text Clear Object
 * @desc 
 *
 * @command resetppg
 * @text Reset PPG
 * @desc 
 * @arg id
 * @type number
 * @text ID
 * @desc 
 */
 

(() => {
    const pluginName = "BulletHellDrawing";
	
	$BHWaitFrames = 0;
	$ppgDeathCounter = [0,0,0,0,0,0];
	$ppgDeathCounterSaveID = [0,0,0,0,0,0];
	$ppgIsDead = 0;
	$tempAniSpeed = 0;
	
	Input.keyMapper[112] = "collisionDebug";
	


	BulletHell = function() {
		this.initialize(...arguments);
	}
	
	
	BulletHell.prototype.initialize = function() {
		
	this.showCollisions = false;
	
	this.active = false;
	
	this.PLframe = 0;
	this.PLDurationFrame = 1;
	this.ppg_action = 0;
	this.ppg_stop = 0;
	this.plshot_timer = 0;
	this.TruckPursuit = 0;
	this.lastX = 0;
	this.lastY = 0;
	this.playerCanShot = 0;
	this.playerTypeOfShot = 0;
	
	this.actions = [];
	
	this.playerHasMove = 0;
	this.bhpage = 0;
	this.bhmaxwidth = 200;
	this.bhmaxheight = 200;
	this.isBlueSoul = 0;
	this.soulGravity = 0;
	this.soulJumpPower = 0;
	this.soulHasJump = 0;
	this.lastY = 0;
	this.soulOnPlatform = 0;
	this.vorid = 0;
	this.PlayerCollisionX1 = 10;
	this.PlayerCollisionX2 = 24;
	this.PlayerCollisionY1 = 37;
	this.PlayerCollisionY2 = 52;
	this.ppg_attackPaternID = 0;
	this.ppg_attackPaternWillChange = 0;
	this.spinningAttackType = 0;
	this.soulDirection = 8;
	this.ppg_attack15_timer = 0;
	this.GenosID = null;
	this.ppg_lastdialogue = 0;
	this.ppg_currentSubject = null;
	this.BeastMusic = {};
	this.bhdisplay = new Bitmap (1280 + this.bhmaxwidth,720 + this.bhmaxheight)
	this.BHBitmap = new Bitmap(1280 + this.bhmaxwidth,720 + this.bhmaxheight);
	this.objectsSprite = {};
	//this.objectssprite = [Bitmap.load("img/bhsprite/thanoscarbullet.png"),Bitmap.load("img/bhsprite/danger.png"),Bitmap.load("img/bhsprite/thanoscarlaser.png"),Bitmap.load("img/bhsprite/thanoscarportal.png"),Bitmap.load("img/bhsprite/bigthanoscarbullet.png"),Bitmap.load("img/bhsprite/PlayerShot.png"),Bitmap.load("img/bhsprite/blueangel.png"),Bitmap.load("img/bhsprite/SmallBonus.png"),Bitmap.load("img/bhsprite/BigBonus.png"),Bitmap.load("img/bhsprite/boss.png"),Bitmap.load("img/bhsprite/UltraBonus.png"),Bitmap.load("img/bhsprite/redangel.png"),Bitmap.load("img/bhsprite/beast.png"),Bitmap.load("img/bhsprite/beastdanger.png"),Bitmap.load("img/bhsprite/beastbiglaser.png"),Bitmap.load("img/bhsprite/beastbiglaser2.png"),Bitmap.load("img/bhsprite/THEDISK.png"),Bitmap.load("img/bhsprite/DeathAppearI.png"),Bitmap.load("img/bhsprite/DeathAppear-.png"),Bitmap.load("img/bhsprite/DeathI.png"),Bitmap.load("img/bhsprite/Death-.png"),Bitmap.load("img/bhsprite/WarudoBullet.png"),Bitmap.load("img/bhsprite/HellBullet.png"),Bitmap.load("img/bhsprite/ppg_pshot.png"),Bitmap.load("img/bhsprite/gaster_blaster.png"),Bitmap.load("img/bhsprite/gaster_blaster_left.png"),Bitmap.load("img/bhsprite/gaster_blaster_opening.png"),Bitmap.load("img/bhsprite/gaster_blaster_opening_left.png"),Bitmap.load("img/bhsprite/gaster_blaster_laser.png"),Bitmap.load("img/bhsprite/gaster_blaster_laser_left.png"),Bitmap.load("img/bhsprite/smallPlatform.png"),Bitmap.load("img/bhsprite/ppg_tophat_bottom.png"),Bitmap.load("img/bhsprite/ppg_tophat_right.png"),Bitmap.load("img/bhsprite/ppg_tophat_left.png"),Bitmap.load("img/bhsprite/ppg_letter1.png"),Bitmap.load("img/bhsprite/ppg_letter2.png"),Bitmap.load("img/bhsprite/ppg_letter3.png"),Bitmap.load("img/bhsprite/ppg_letter4.png"),Bitmap.load("img/bhsprite/ppg_letter5.png"),Bitmap.load("img/bhsprite/ppg_smallBunny_left.png"),Bitmap.load("img/bhsprite/ppg_smallBunny_right.png"),Bitmap.load("img/bhsprite/ppg_bigBunny_left.png"),Bitmap.load("img/bhsprite/ppg_bigBunny_right.png"),Bitmap.load("img/bhsprite/ppg_commonbullet.png"),Bitmap.load("img/bhsprite/ppg_explosivebullet.png"),Bitmap.load("img/bhsprite/ppg_explosivebulletWarning.png"),Bitmap.load("img/bhsprite/crystalStar.png"),Bitmap.load("img/bhsprite/crystalStarCursor.png"),Bitmap.load("img/bhsprite/ppg_bigbullet.png"),Bitmap.load("img/bhsprite/laytonmobile.png"),Bitmap.load("img/bhsprite/ppg_leftpshot.png"),Bitmap.load("img/bhsprite/crystalStarCursorLeft.png"),Bitmap.load("img/bhsprite/Genos.png"),Bitmap.load("img/bhsprite/ppg_aura.png"),Bitmap.load("img/bhsprite/Phantasmal_Sphere.png"),Bitmap.load("img/bhsprite/GenosRight.png"),Bitmap.load("img/bhsprite/ppg_laser.png"),Bitmap.load("img/bhsprite/MicroPhantasmal_Sphere.png")];
	//this.objectsspriteframes = [1,1,1,1,1,1,4,1,1,1,16,4,1,1,1,1,20,5,5,1,1,1,2,1,1,1,6,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,10,1,1,1,1,1,1,4,19,2,4,1,1];
	//this.objectsspriteframesduration = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,3,3,3,3,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,3,10,10,10,10,10,10,7,5,5,7,3,10];
	this.objects = [];
	
	};
	

	BulletHell.loadScript = function(filename) {
		const url = ("js/plugins/bullethell/"+ filename +".js");
		const script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.async = false;
		script.defer = true;
		script._url = url;
		document.body.appendChild(script);
	}

	BulletHell.loadScript("functions/utils")
	BulletHell.loadScript("functions/transform")
	BulletHell.loadScript("functions/main")
	BulletHell.loadScript("functions/objects")
	BulletHell.loadScript("functions/sprites")
	BulletHell.loadScript("functions/playerShot")
	BulletHell.loadScript("functions/actions/actions_main")
	BulletHell.loadScript("functions/ppg/ppg_main")
	
	
	$gameBulletHell = new BulletHell();




	
	_Scene_Gameover_terminate = Scene_Gameover.prototype.terminate;
	Scene_Gameover.prototype.terminate = function() {
		_Scene_Gameover_terminate.call(this);
		
		$gameBulletHell.ppg_action = 0;
		$gameBulletHell.ppg_stop = 0;
		$gameBulletHell.soulGravity = 0;
		$gameBulletHell.soulJumpPower = 0;
		$gameBulletHell.objects = [];
		$gameBulletHell.active = false;
		
	};
	
	
    PluginManager.registerCommand(pluginName, "resetppg", args => {
		
		$gameBulletHell.ppg_attackPaternID = eval(args.id);
		$ppgIsDead = 0;

    });




	Game_Interpreter.prototype.updateWait = function() {
		return this.updateWaitCount() || this.updateWaitMode() || $gameBulletHell.updateBHWaitFrames(this);
	};




	

    PluginManager.registerCommand(pluginName, "add", args => {
		
		bhargs = {};
		bhargs.name = args.name;
		bhargs.posx = $gameVariables.value(args.posx) + $gameBulletHell.bhmaxwidth/2;
		bhargs.posy = $gameVariables.value(args.posy) + $gameBulletHell.bhmaxheight/2;
		bhargs.width = parseFloat(args.width);
		bhargs.height = parseFloat(args.height);
		bhargs.speed = $gameVariables.value(args.speed);
		bhargs.direction = $gameVariables.value(args.direction);
		bhargs.sprite = args.sprite;
		bhargs.hp = parseFloat(args.hp);
		bhargs.candie = args.candie;
		bhargs.canbetouched = args.canbetouched;
		bhargs.action = parseFloat(args.action);
		bhargs.deathaction = parseFloat(args.deathaction);
		bhargs.directioniscircle = args.directioniscircle;
		bhargs.isPlayerShot = args.isPlayerShot;
		bhargs.isBonus = args.isBonus;
		bhargs.BonusPower = parseFloat(args.BonusPower);
		$gameBulletHell.createBHObject(bhargs);

    });
	
    PluginManager.registerCommand(pluginName, "remove", args => {
		$gameBulletHell.objects[args.id] = null;
        $gameBulletHell.objects.splice(args.id);
    });
	
    PluginManager.registerCommand(pluginName, "removename", args => {
		
		$gameBulletHell.removeObjectByName(args.name);
		
    });
	
	

	
    PluginManager.registerCommand(pluginName, "clear", args => {
        $gameBulletHell.objects = [];
		$gameBulletHell.BHBitmap = new Bitmap(1280 + $gameBulletHell.bhmaxwidth,720 + $gameBulletHell.bhmaxheight);
    });

    PluginManager.registerCommand(pluginName, "set", args => {
        textPictureText = String(args.text);
    });


	
	
	
	

_Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset
Scene_Battle.prototype.createSpriteset = function() {
	_Scene_Battle_createSpriteset.call(this)
    this._bhspriteset = new Spriteset_BulletHell();
    this.addChild(this._bhspriteset);
};


_Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset
Scene_Map.prototype.createSpriteset = function() {
	_Scene_Map_createSpriteset.call(this)
    this._bhspriteset = new Spriteset_BulletHell();
    this.addChild(this._bhspriteset);
};
	
	
	
	
_Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
Window_BattleLog.prototype.showAnimation = function(subject, targets, animationId) {
	_Window_BattleLog_showAnimation.call(this, subject, targets, animationId);
	if (typeof targets[0] !== 'undefined' && typeof targets[0]._enemyId !== 'undefined' && $dataEnemies[targets[0]._enemyId].meta.dodge && $ppgIsDead == 0) {
				
			$dataEnemies[targets[0]._enemyId].dodgeSwitch = 1;
			
			if ($gameBulletHell.ppg_currentSubject != subject) {
				$gameBulletHell.ppg_attackPaternWillChange += 0.25;
				$gameBulletHell.ppg_currentSubject = subject;
			}

	}	
};
	
	
_Sprite_Enemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
Sprite_Enemy.prototype.updateFrame = function() {
	
	if(typeof this.movedur === 'undefined') {
		this.movedur = 0;
		this.movedir = Math.random() * 360;
	}	
	
	if($gameBulletHell.ppg_action == 1) {
		
		this._offsetY = -2000;
		
	} else if ($dataEnemies[this._enemy._enemyId].meta.dodge) {
		
		this._offsetY = 0;
		
	}
	
	if($dataEnemies[this._enemy._enemyId].meta.InfTP) {
		this._enemy.setTp(100);
	}	
	
	if(typeof this.dodgedur === 'undefined' && $dataEnemies[this._enemy._enemyId].meta.dodge) {
		this.dodgedur = eval($dataEnemies[this._enemy._enemyId].meta.dodge)[0];
	}		
	
	if(typeof this._enemy.dodgeSwitch === 'undefined') {
		this._enemy.dodgeSwitch = 0;
	}		
	
		if ($dataEnemies[this._enemy._enemyId].meta.levitate) {
			let levitateData = eval($dataEnemies[this._enemy._enemyId].meta.levitate)
			this.movedur += levitateData[0];
			this._offsetY = this._offsetY+Math.cos(this.movedur)*levitateData[1];
		}
		if ($dataEnemies[this._enemy._enemyId].meta.transcendance) {
			let transcendanceData = eval($dataEnemies[this._enemy._enemyId].meta.transcendance)
			let power = transcendanceData[0];
			let duration = transcendanceData[1];
			let targetX = Math.cos(this.movedir * Math.PI/180)*power;
			let targetY = Math.sin(this.movedir * Math.PI/180)*power;
			let distanceToZero = getDistanceBetweenPoints(this._offsetX,this._offsetY,0,0);
			this.movedir += (Math.random() * 360 -180) / power * distanceToZero;
			let dir = getDirectionToPosition(this._offsetX,this._offsetY,targetX,targetY);
			this._offsetX += Math.cos(dir * Math.PI/180)*power/(distanceToZero+1)/duration;
			this._offsetY += Math.sin(dir * Math.PI/180)*power/(distanceToZero+1)/duration;
		}
		if ($dataEnemies[this._enemy._enemyId].meta.dodge && $dataEnemies[this._enemy._enemyId].dodgeSwitch) {
			let dodgeData = eval($dataEnemies[this._enemy._enemyId].meta.dodge)
			this._mainSprite.anchor.x = this._mainSprite.anchor.x+Math.cos(this.dodgedur)*0.1;
			this.dodgedur += dodgeData[2];
			
			if (this.dodgedur >= dodgeData[1]) {
				this.dodgedur = dodgeData[0];
				$dataEnemies[this._enemy._enemyId].dodgeSwitch = 0;
			}
			
		}
		
    _Sprite_Enemy_updateFrame.call(this);
};
	
	
	
	
	
	
_BattleManager_processTurn = BattleManager.processTurn
BattleManager.processTurn = function() {
	if (typeof this._subject._enemyId !== 'undefined' && $dataEnemies[this._subject._enemyId].meta.ppg_action) {
		$gameBulletHell.PPGTurn(this);
	} else {
	_BattleManager_processTurn.call(this);
	}
};

	
})();
