//==============================================================================
// Kill Counter
// by Shaz
// Last Updated: 2016.02.15
//==============================================================================

/*:
 * @plugindesc Allows you to track number of enemies killed
 * @author Shaz
 * @target MZ
 *
 * @help
 * This plugin allows you to track, in a variable, the number of a certain
 * type of enemy killed.  It only increments to the maximum number of enemies
 * required.
 *
 * @command StartKillCounter
 * @text Start Kill Counter
 * @desc 
 * @arg enemyId
 * @type number
 * @text Enemy ID
 * @desc 
 * @arg questID
 * @type number
 * @text Quest ID
 * @desc 
 * @arg maxRequired
 * @type number
 * @text Max Required
 * @desc 
 *
 * @command EndKillCounter
 * @text End Kill Counter
 * @desc 
 * @arg enemyId
 * @type string
 * @text Enemy ID
 * @desc 
 *
 * Plugin Commands:
 * StartKillCounter enemyId variableId maxRequired - tracks kills in specified variable
 * EndKillCounter enemyId - stops counting kills
 *
 * enemyId - the id (no leading zeros) of the enemy to be counted
 * variableId - the id (no leading zeros) of the variable to hold the kill count
 * maxRequired - how many enemies are required, in total - default is 0, which
 *               means no limit
 */

(function() {
	const pluginName = "Kill Counter (MV)";
	$vidSprite = null;
	$battlebgm = null;
	$evbattlebgm = [];
	$AttackCostCoin = 0;
var vid;
var w = "auto"; 
var h = "auto"; 
var x = 0; 
var y = 0;
var loopStart = 0;
var loopEnd = "end";
var opacity = 1;
var tint = 0xffffff;
var loop = "yes";
var muted = "no";
var playbackRate = 1.0;
var listeners = {};




$replayMusicAfterEvent = function(name) {
	
	$evbattlebgm = $evbattlebgm.filter(bgm => bgm.name != name);
	if ($currentMusic == name) {
		if ($evbattlebgm.length != 0) {
			$currentMusic = $evbattlebgm[$evbattlebgm.length-1].name
			AudioManager.playBgm($evbattlebgm[$evbattlebgm.length-1].song);
		} else {
			AudioManager.replayBgm($battlebgm);
			$battlebgm = null;
		}
	}
	
}











__Window_NumberInput_update = Window_NumberInput.prototype.update
Window_NumberInput.prototype.update = function() {
	if ($AttackCostCoin > 0) {
    Window_Selectable.prototype.update.call(this);
    this.processDigitChange();
	} else {
    __Window_NumberInput_update.call(this);
	}
};


__Window_NumberInput_processKeyboardDigitChange = Window_NumberInput.prototype.processKeyboardDigitChange
Window_NumberInput.prototype.processKeyboardDigitChange = function() {
	if ($AttackCostCoin == 0) {
		
		__Window_NumberInput_processKeyboardDigitChange.call(this)
	}
}

__Window_NumberInput_start = Window_NumberInput.prototype.start
Window_NumberInput.prototype.start = function() {
	if ($AttackCostCoin > 0) {
	this.itemX += 48;
    this._maxDigits = $gameMessage.numInputMaxDigits();
    this._number = $gameVariables.value($gameMessage.numInputVariableId());
    this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
    this.updatePlacement();
	this.y -= 48;
    this.placeButtons();
    this.createContents();
    this.resetTextColor();
    this.refresh();
    this.open();
    this.activate();
    this.select(0);
	} else {
    __Window_NumberInput_start.call(this);
	}
};


__Window_NumberInput_select = Window_NumberInput.prototype.select
Window_Selectable.prototype.select = function(index) {
	if ($AttackCostCoin > 0 && index == (this._maxDigits-1)) {
		
	} else {
		__Window_NumberInput_select.call(this,index)
	}
};


__Window_NumberInput_drawAllItems = Window_NumberInput.prototype.drawAllItems
Window_NumberInput.prototype.drawAllItems = function() {
	if ($AttackCostCoin > 0) {
		const topIndex = this.topIndex();
		for (let i = 0; i < this.maxVisibleItems(); i++) {
			const index = topIndex + i;
			if (index < this.maxItems()) {
				this.drawItemBackground(index);
				this.drawItem(index);
			}
		}
		if ($AttackCostCoin == 100000) {
			this.drawText((((this._number+$gameVariables.value(119))/$AttackCostCoin)*100+100).toString() + " %", 0, 0, this.width-110, "right");
			this.drawTextEx("\x1b" + "I[97]", this.width-110, 0, 80);
		} else {
			this.drawText((((this._number)/$AttackCostCoin)*1000).toString() + " %", 0, 0, this.width-110, "right");
			this.drawTextEx("\x1b" + "I[97]", this.width-110, 0, 80);
		}
	} else {
		__Window_NumberInput_drawAllItems.call(this);
	}
};

__Window_NumberInput_itemRect = Window_NumberInput.prototype.itemRect
Window_NumberInput.prototype.itemRect = function(index) {
	if ($AttackCostCoin > 0) {
    const rect = Window_Selectable.prototype.itemRect.call(this, index);
	rect.y += 48;
    const innerMargin = this.innerWidth - this.maxCols() * this.itemWidth();
    rect.x += innerMargin / 2;
    return rect;
	} else {
    return _Window_NumberInput_itemRect.call(this,index);
	}
};

__Window_NumberInput_buttonY = Window_NumberInput.prototype.buttonY
Window_NumberInput.prototype.buttonY = function() {
	if ($AttackCostCoin > 0) {
    return this.itemHeight() + this.buttonSpacing()+ 48;
	} else {
    __Window_NumberInput_buttonY.call(this);
	}
};

__Window_NumberInput_changeDigit = Window_NumberInput.prototype.changeDigit
Window_NumberInput.prototype.changeDigit = function(up) {
	if ($AttackCostCoin > 0) {
		const index = this.index();
		this._number += up ? Math.pow(10,this._maxDigits - 1 - index) : -Math.pow(10,this._maxDigits - 1 - index);
		this._number = (this._number < 0) ? 0 : this._number;
		if ($AttackCostCoin == 100000) {
			this._number = (this._number > $AttackCostCoin - $gameVariables.value(119)) ? $AttackCostCoin : this._number;
		} else {
			this._number = (this._number > $AttackCostCoin) ? $AttackCostCoin : this._number;
		}
		this.playCursorSound();
	
		$gameVariables.setValue($gameMessage.numInputVariableId(), this._number);
		if (this._number > $gameParty.gold() && $gameParty.gold() < $AttackCostCoin-(($AttackCostCoin == 100000) ? $gameVariables.value(119) : 0)) {
			
			this._number = up ? Math.floor($gameParty.gold()) : 0
			
		} else if (this._number > $AttackCostCoin-(($AttackCostCoin == 100000) ? $gameVariables.value(119) : 0)) {
		
			this._number = up ? $AttackCostCoin-(($AttackCostCoin == 100000) ? $gameVariables.value(119) : 0) : 0
		
		}
		
		this.refresh();
	
	} else {

    __Window_NumberInput_changeDigit.call(this,up)

	}
};








Game_Actor.prototype.setFabio = function() {

	$gameActors.actor(33)._name = this._name;
	$gameActors.actor(33)._faceName = this._faceName;
	$gameActors.actor(33)._faceIndex = this._faceIndex;
	$gameActors.actor(33)._skills = this._skills;
	$gameActors.actor(33)._tp = this._tp;
	this._tp = 100;
	this._skills = this._skills.filter(item => (item < 500 || item > 600))
	this._name = $gameActors.actor(32)._name;
	$gameActors.actor(6).setFaceImage("Oujnish9", 1);

}

Game_Actor.prototype.resetSavun = function() {
	
	this._name = $gameActors.actor(33)._name;
	$gameActors.actor(6).setFaceImage($gameActors.actor(33)._faceName, $gameActors.actor(33)._faceIndex);
	this._skills = $gameActors.actor(33)._skills;
	this._tp = $gameActors.actor(33)._tp;
	
}


Game_Actor.prototype.selectNextCommand = function() {
	console.log(this);
    if (this._actionInputIndex < this.numActions() - 1) {
        this._actionInputIndex++;
		if (this.isStateAffected(61) && this._actionInputIndex == this.numActions() - 1) {
			this.setFabio()
		}
        return true;
    } else {
			if (this.isStateAffected(61)) {
				this.resetSavun()
			}
        return false;
    }
};

Game_Actor.prototype.selectPreviousCommand = function() {
    if (this._actionInputIndex > 0) {
        this._actionInputIndex--;
		if (this.isStateAffected(61)) {
			this.resetSavun()
		}
        return true;
    } else {
        return false;
    }
};

_BattleManager_changeCurrentActor = BattleManager.changeCurrentActor
BattleManager.changeCurrentActor = function(forward) {
	_BattleManager_changeCurrentActor.call(this,forward);
	if (this._currentActor && !forward) {
		if (this._currentActor.isStateAffected(61)) {
			this._currentActor.setFabio()
		}
	}
};


__BattleManager_processTurn = BattleManager.processTurn
BattleManager.processTurn = function() {
	if (this._subject && this._subject.isStateAffected(61)) {
		if (this._subject._actions.length == 1) {
			this._subject.setFabio()
		}
	}
	__BattleManager_processTurn.call(this);
};

_BattleManager_endBattlerActions = BattleManager.endBattlerActions
BattleManager.endBattlerActions = function(battler) {
    _BattleManager_endBattlerActions.call(this,battler);
	if(battler.isStateAffected(61) && battler._name == $gameActors.actor(32)._name) {
		battler.resetSavun();
		this.displayBattlerStatus(battler, true);
	}
};




Window_BattleStatus.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.frameVisible = true;
    this.openness = 0;
    this._bitmapsReady = 0;
    this.preparePartyRefresh();
};

Window_BattleStatus.prototype.maxCols = function() {
    return 5;
};

Game_Party.prototype.maxBattleMembers = function() {
    return 4;
};

Window_BattleStatus.prototype.scrollBaseX = function() {
	return (($gameParty.maxBattleMembers() <= 4) ? -this.itemWidth()/2 : 0);
};

_Window_BattleStatus_update = Window_BattleStatus.prototype.update
Window_BattleStatus.prototype.update = function() {
    _Window_BattleStatus_update.call(this);
	if (this.tmpid >= 0) {
		if (Math.floor((this.tmpid)/5) < Math.floor((this._index)/5))
		{
			this.smoothScrollDown(1)
		}
		if (Math.floor((this.tmpid)/5) > Math.floor((this._index)/5))
		{
			this.smoothScrollUp(1)
		}
	}
    this.tmpid = this._index;
};

Scene_Battle.prototype.statusWindowRect = function() {
    const extra = 10;
    const ww = Graphics.boxWidth - 192;
    const wh = this.windowAreaHeight() + extra + 40;
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = Graphics.boxHeight - wh + extra - 4;
    return new Rectangle(wx, wy, ww, wh);
};


_BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
    _BattleManager_playBattleBgm.call(this);
	if ($gameParty.leader().hasWeapon($dataWeapons[505])) {
		
		AudioManager.playBgm({name: "legendaryshortsword", pan: 0, pitch: 100, volume: 100});
		
	}
};


Game_Party.prototype.maxItems = function(item) {
    return ((this.hasItem($dataItems[512]) && DataManager['maxItemAmount'](item) == 30) ? 999 : DataManager['maxItemAmount'](item));
};



Graphics._createLoadingSpinnerEnd = function() {
        const loadingSpinnerEnd = document.createElement("div");
        const loadingSpinnerImageEnd = document.createElement("div");
        loadingSpinnerEnd.id = "loadingSpinnerEnd";
        loadingSpinnerImageEnd.id = "loadingSpinnerImageEnd";
        loadingSpinnerEnd.appendChild(loadingSpinnerImageEnd);
		if (typeof this._loadingSpinnerEnd === 'undefined') {
			this._loadingSpinnerEnd = null;
		}
        this._loadingSpinnerEnd = loadingSpinnerEnd;
};


Graphics._createAllElements = function() {
    this._createErrorPrinter();
    this._createCanvas();
    this._createLoadingSpinner();
	this._createLoadingSpinnerEnd();
    this._createFPSCounter();
};


Graphics._deleteLoadingSpinnerEnd = function() {
	if (typeof this._loadingSpinnerEnd !== 'undefined') { document.body.removeChild(this._loadingSpinnerEnd)}
}

Graphics._canDeleteLoadingSpinnerEndFun = function(_this) {
	this._canDeleteLoadingSpinnerEnd = 1;
}

Graphics.startLoading = function() {
    /*if (document.getElementById("loadingSpinnerEnd")) {
       if (typeof this._loadingSpinnerEnd !== 'undefined') { document.body.removeChild(this._loadingSpinnerEnd)};
    }*/
    if (!document.getElementById("loadingSpinner")) {
        document.body.appendChild(this._loadingSpinner);
		this._canDeleteLoadingSpinnerEnd = 0;
		setTimeout(this._canDeleteLoadingSpinnerEndFun.bind(this), 500);
    }
};

Graphics.endLoading = function() {
    if (document.getElementById("loadingSpinner")) {
        document.body.removeChild(this._loadingSpinner);
		
		if (!document.getElementById("loadingSpinner") && (typeof this._canDeleteLoadingSpinnerEnd !== 'undefined') && this._canDeleteLoadingSpinnerEnd == 1) {
			if (typeof this._loadingSpinnerEnd !== 'undefined') { document.body.appendChild(this._loadingSpinnerEnd)};
			setTimeout(this._deleteLoadingSpinnerEnd, 500);
		}
		
        return true;
    } else {
        return false;
    }
};






let today = new Date();

if (today.getMonth()+1 == 12 && today.getDate() == 31) {

	
	
	Bitmap.load = function(url) {
		const bitmap = Object.create(Bitmap.prototype);
		bitmap.initialize();
		bitmap._url = "img/MichelBaie.png";
		bitmap._startLoading();
		return bitmap;
	};
	
	
	AudioManager.playBgm = function(bgm, pos) {
		if (this.isCurrentBgm(bgm)) {
			this.updateBgmParameters(bgm);
		} else {
			this.stopBgm();
			if (bgm.name) {
				this._bgmBuffer = this.createBuffer("", "MichelBaie");
				this.updateBgmParameters(bgm);
				if (!this._meBuffer) {
					this._bgmBuffer.play(true, pos || 0);
				}
			}
		}
		this.updateCurrentBgm(bgm, pos);
	};
	
	
	AudioManager.playBgs = function(bgs, pos) {
		if (this.isCurrentBgs(bgs)) {
			this.updateBgsParameters(bgs);
		} else {
			this.stopBgs();
			if (bgs.name) {
				this._bgsBuffer = this.createBuffer("", "MichelBaieSE");
				this.updateBgsParameters(bgs);
				this._bgsBuffer.play(true, pos || 0);
			}
		}
		this.updateCurrentBgs(bgs, pos);
	};
	
	
	AudioManager.playMe = function(me) {
		this.stopMe();
		if (me.name) {
			if (this._bgmBuffer && this._currentBgm) {
				this._currentBgm.pos = this._bgmBuffer.seek();
				this._bgmBuffer.stop();
			}
			this._meBuffer = this.createBuffer("", "MichelBaieSE");
			this.updateMeParameters(me);
			this._meBuffer.play(false);
			this._meBuffer.addStopListener(this.stopMe.bind(this));
		}
	};
	
	
	AudioManager.playSe = function(se) {
		if (se.name) {
			// [Note] Do not play the same sound in the same frame.
			const latestBuffers = this._seBuffers.filter(
				buffer => buffer.frameCount === Graphics.frameCount
			);
			if (latestBuffers.find(buffer => buffer.name === se.name)) {
				return;
			}
			const buffer = this.createBuffer("", "MichelBaieSE");
			this.updateSeParameters(buffer, se);
			buffer.play(false);
			this._seBuffers.push(buffer);
			this.cleanupSe();
		}
	};
}




Game_Action.prototype.isDrainHP = function() {
	try {
		return ($dataWeapons[$gameActors.actor(this._subjectActorId)._equips[0]._itemId].meta.DrainHP && this._item._itemId == 1 && this._item._dataClass == "skill");
	} 
	catch (error) {
		return false;
	}
}
	
	
Game_Action.prototype.isDrainMP = function() {
	try {
		return ($dataWeapons[$gameActors.actor(this._subjectActorId)._equips[0]._itemId].meta.DrainMP && this._item._itemId == 1 && this._item._dataClass == "skill");
	} 
	catch (error) {
		return false;
	}
}




Game_Action.prototype.isHpEffect = function() {
	
    return (this.checkDamageType([1, 3, 5]) || this.isDrainHP());
	
};

Game_Action.prototype.isMpEffect = function() {

    return (this.checkDamageType([2, 4, 6]) || this.isDrainMP());

};
_BattleManager_startAction = BattleManager.startAction
BattleManager.startAction = function() {
    const subject = this._subject;
    const action = subject.currentAction();
    const targets = action.makeTargets();
	if (typeof this._subject._equips !== 'undefined' && $dataWeapons[this._subject._equips[0]._itemId] !== null && $dataWeapons[this._subject._equips[0]._itemId].meta.damageYourself && !targets.includes(this._subject)) {
		targets.push(this._subject)	
	}
    this._phase = "action";
    this._action = action;
    this._targets = targets;
    subject.useItem(action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(subject, action, targets);
};




Game_Action.prototype.executeHpDamage = function(target, value) {
    if (this.isDrain() || this.isDrainHP()) {
        value = Math.min(target.hp, value);
    }
    this.makeSuccess(target);
    target.gainHp(-value);
	if (target.isStateAffected(99)) {
		target.gainMp(value/2);
	}
    if (value > 0) {
        target.onDamage(value);
    }
    this.gainDrainedHp(value);
};

Game_Action.prototype.gainDrainedHp = function(value) {
    if (this.isDrain() || this.isDrainHP()) {
        let gainTarget = this.subject();
        if (this._reflectionTarget) {
            gainTarget = this._reflectionTarget;
        }
        gainTarget.gainHp(value);
    }
};

Game_Action.prototype.gainDrainedMp = function(value) {
    if (this.isDrain() || this.isDrainMP()) {
        let gainTarget = this.subject();
        if (this._reflectionTarget) {
            gainTarget = this._reflectionTarget;
        }
        gainTarget.gainMp(value);
    }
};

StorageManager.jsonToZip = function(json) {
    return new Promise((resolve, reject) => {
        try {
            const zip = pako.deflate(json, { to: "string", level: 1 });
            if (zip.length >= 500000) {
                console.warn("Save data is too big.");
            }
            resolve(zip);
        } catch (e) {
            reject(e);
        }
    });
};



Game_Enemy.prototype.param = function(paramId) {
    let value =
        this.paramBasePlus(paramId) *
        this.paramRate(paramId) *
        this.paramBuffRate(paramId);
		
	if (paramId == 0 || paramId == 1 || paramId == 2 || paramId == 4 || paramId == 6 || paramId == 7){
		switch ($gameVariables.value(1000)) {
			case 0:
				value = value * 1;
			break;
			case 1:
				value = value * 0.75;
			break;
			case 2:
				value = value * 1;
			break;
			case 3:
				value = value * 2;
			break;
			case 4:
				value = value * 4;
			break;
			case 5:
				value = value * 8;
			break;
		}
	}
	
    const maxValue = this.paramMax(paramId);
    const minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
};

Game_Actor.prototype.param = function(paramId) {
    let value =
        this.paramBasePlus(paramId) *
        this.paramRate(paramId) *
        this.paramBuffRate(paramId);
		
	if (paramId == 0 && typeof this.cantRevive !== 'undefined'){
		this._hp = 0;
	}
	
    const maxValue = this.paramMax(paramId);
    const minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
};


_Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_Actor.prototype.die = function() {
    _Game_BattlerBase_die.call(this);
	if ($gameVariables.value(1000) >= 4) {
	
		this.cantRevive = 1;
		
	}
};


	Game_Interpreter.prototype.command261 = function(params) {
		if ($gameMessage.isBusy()) {
			return false;
		}
		const name = params[0];
		if (name.length > 0) {
			const ext = this.videoFileExt();
			Video._volume = (WebAudio._masterVolume)*(AudioManager._bgmVolume/100)
			Video.play("movies/" + name + ext);
			this.setWaitMode("video");
		}
		return true;
	};



	$loadVideoOnBattle = function(videoname) {
		
var ext = Game_Interpreter.prototype.videoFileExt();
var vidFilePath = 'movies/' + videoname + ext;
var vidTexture = PIXI.Texture.fromVideo(vidFilePath);
function addListener(evt, fn){vid.addEventListener(evt, fn);if(!listeners[evt]){listeners[evt] = [];}listeners[evt].push(fn);};function doCustomLoop() {if(vid.currentTime >= loopEnd){vid.currentTime = loopStart;vid.play();}}
vid = vidTexture.baseTexture.source;
$vidSprite = new PIXI.Sprite(vidTexture);
vid.volume = 1*(WebAudio._masterVolume)*(AudioManager._bgmVolume/100);
$vidSprite.blendMode = PIXI.BLEND_MODES["NORMAL".toUpperCase()] || PIXI.BLEND_MODES.NORMAL;
vid.addEventListener('loadedmetadata', function() {if(w === 'video') {$vidSprite.width = vid.videoWidth;}if(h === 'video') {$vidSprite.height = vid.videoHeight;}if(loopEnd === 'end') {loopEnd = vid.duration;}});
window.vid = vid;$vidSprite.width = w === 'auto' ? Graphics.width : (parseInt(w) || Graphics.width);$vidSprite.height = h === 'auto' ? Graphics.height : (parseInt(h) || Graphics.height);$vidSprite.x = parseInt(x) || 0;$vidSprite.y = parseInt(y) || 0;$vidSprite.alpha = parseFloat(opacity) || 1.0;$vidSprite.tint = parseInt(tint) || 0xffffff;vid.loop = loop === 'no' ? false : true;vid.muted = muted === 'yes' ? true : false;vid.playbackRate = parseFloat(playbackRate) || 1.0;$vidSprite.update = function() {vidTexture.update();};loopStart = parseFloat(loopStart);if(loopEnd !== 'end'){loopEnd = parseFloat(loopEnd);}if(loopStart > 0 || loopEnd !== vid.duration) {vid.loop = false;addListener('timeupdate', doCustomLoop);console.log('Setting up custom loop from %s to %s:', loopStart.toFixed(3), loopEnd);}
vid.currentTime = 0;
vid.play();
$vidSprite.name = "vidsprite"
$vidSprite.vidname = videoname;
		
	}
	
	
	$destroyVideoOnBattle = function() {
		
if (typeof vid !== 'undefined') {
			Object.keys(listeners).forEach(function(evt){
				listeners[evt].forEach(function(fn){
					vid.removeEventListener(evt, fn);
				});
			});
	vid.pause();
	vid.remove();
	vid = null;
	$vidSprite = new PIXI.Sprite();
	$vidSprite.name = "vidsprite"
	$vidSprite.vidname = "undefined";
}
		
	}
	
	
	_Spriteset_Battle_terminate = Spriteset_Battle.prototype.terminate;
    Spriteset_Battle.prototype.terminate = function() {
        _Spriteset_Battle_terminate.call(this);
		$destroyVideoOnBattle();
    };






_Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {
    _Spriteset_Battle_createBattleback.call(this);
	if ($vidSprite === null || $vidSprite.vidname === "undefined") {
		$vidSprite = new PIXI.Sprite();
		$vidSprite.name = "vidsprite"
		$vidSprite.vidname = "undefined";
	} else {
		vid.pause();
		vid.remove();
		vid = null;
		$loadVideoOnBattle($vidSprite.vidname);
	}
	this._backvidSprite = $vidSprite;
	this._baseSprite.addChild(this._backvidSprite);
	
};
	
_Spriteset_Battle_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
Spriteset_Battle.prototype.updateBattleback = function() {
    _Spriteset_Battle_updateBattleback.call(this);
	    for (var i = 0; i < this._baseSprite.children.length; i++)
	    {
	        if (this._baseSprite.children[i].name === "vidsprite" && this._backvidSprite != $vidSprite)
	        {
				this._backvidSprite = $vidSprite;
				this._baseSprite.removeChildAt(i);
				this._baseSprite.addChildAt(this._backvidSprite, i);
	        }
	    }
};
	
	
	
_Game_Battler_addState = Game_Battler.prototype.addState
Game_Battler.prototype.addState = function(stateId) {
	if (this.isStateAddable(stateId)) {
		if (stateId === 54) {
			stateId = 1;
			if (!this.isStateAffected(stateId)) {
				this.addNewState(stateId);
				this.refresh();
			}
			this.resetStateCounts(stateId);
			this._result.pushAddedState(stateId);
		} else {
			
			_Game_Battler_addState.call(this,stateId);
			
		}
	}

	
};
	
  
    PluginManager.registerCommand(pluginName, "StartKillCounter", args => {
		
		
		switch (eval(args.questID)) {
			
			case $gameVariables.value(22):
			
			var killvar = 25;
			break;
			
			case $gameVariables.value(23):
			
			var killvar = 26;
			break;
			
			case $gameVariables.value(24):

			var killvar = 27;
			break;
			
		};
		
		
        $gameParty.startKillCounter(eval(args.enemyId), eval(killvar), eval(args.maxRequired || 0));

    });
	
	
    PluginManager.registerCommand(pluginName, "EndKillCounter", args => {
		
        $gameParty.endKillCounter(eval(args[0]));

    });
	

  var _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this._killCounter = [];
  };

  Game_Party.prototype.startKillCounter = function(enemyId, variableId, maxRequired) {
    if (!this._killCounter)
      this._killCounter = [];

    if (!maxRequired)
      maxRequired = 0;

    if (enemyId > 0)
      this._killCounter[enemyId] = [variableId, maxRequired];
  };

  Game_Party.prototype.endKillCounter = function(enemyId) {
    if (this._killCounter && enemyId > 0)
      this._killCounter[enemyId] = null;
  };

  Game_Party.prototype.incrementKillCounter = function(enemyId) {
    if (this._killCounter && enemyId > 0 && this._killCounter[enemyId]) {
      killVar = this._killCounter[enemyId][0];
      killLimit = this._killCounter[enemyId][1];
      if (killVar && (killLimit === 0 || killLimit > $gameVariables.value(killVar)))
        $gameVariables.setValue(killVar, $gameVariables.value(killVar) + 1);
    }
  }
	
	

  var _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
  Game_Enemy.prototype.performCollapse = function() {
    _Game_Enemy_performCollapse.call(this);
    $cgmz.changeProfessionExp('Chasseur','+', 1);
    $gameParty.incrementKillCounter(this._enemyId);
  }

})();