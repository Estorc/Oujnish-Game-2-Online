/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/splashscreen/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Creates a splash screen before the title screen
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.1.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: Creates a splash screen before the title screen. It can handle
 * multiple splashes, and splashes can be skipped with input.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin does not support plugin commands.
 *
 * Fade speed is how much is added/subtracted from opacity each frame during
 * fade.
 *
 * Images that do not fill the screen completely will be centered
 *
 * For the sound delay and display time parameters, 60f = 1 second
 *
 * Version History:
 * 1.0 - Initial release
 *
 * 1.1.0:
 * - Added ability to play a sound effect for each splash
 * - Added sound delay property sound effect
 * - Optimized plugin code
 *
 * @param Display Time
 * @type number
 * @min 1
 * @desc Determines amount of time (in frames) splash is shown for.
 * @default 360
 * 
 * @param Fade Speed
 * @type number
 * @min 1
 * @max 255
 * @desc Determines how fast each splash fades
 * @default 2
 *
 * @param Splashes
 * @type struct<Splash>[]
 * @default []
 * @desc Set up splash image/sound properties
*/
 /*~struct~Splash:
 * @param Image
 * @type file
 * @dir img/
 * @default
 * @desc The image to show on the splash screen
 * 
 * @param Sound Effect
 * @type file
 * @dir audio/se
 * @desc Sound to play when the splash is shown
 *
 * @param Sound Delay
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of time (in frames) to wait before playing the sound effect
*/
var Imported = Imported || {};
Imported.CGMZ_SplashScreen = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Splash Screen"] = "1.1.0";
CGMZ.SplashScreen = CGMZ.SplashScreen || {};
CGMZ.SplashScreen.parameters = PluginManager.parameters('CGMZ_SplashScreen');
CGMZ.SplashScreen.DisplayTime = Number(CGMZ.SplashScreen.parameters["Display Time"]) || 480;
CGMZ.SplashScreen.FadeSpeed = Number(CGMZ.SplashScreen.parameters["Fade Speed"]) || 2;
CGMZ.SplashScreen.Splashes = JSON.parse(CGMZ.SplashScreen.parameters["Splashes"]);
//=============================================================================
// CGMZ_Splash
//-----------------------------------------------------------------------------
// Object which stores splash data
//=============================================================================
function CGMZ_Splash() {
    this.initialize(...arguments);
}
CGMZ_Splash.prototype.constructor = CGMZ_Splash;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.initialize = function(splashData) {
	const splash = JSON.parse(splashData);
	this._imagePath = splash["Image"];
	this._se = splash["Sound Effect"];
	this._soundDelay = splash["Sound Delay"];
	this.initImage();
};
//-----------------------------------------------------------------------------
// Initialize the image
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.initImage = function() {
	const separator = this._imagePath.lastIndexOf("/");
	const filename = this._imagePath.slice(separator+1);
	const folder = "img/" + this._imagePath.slice(0, separator+1);
	this._image = ImageManager.loadBitmap(folder, filename);
};
//-----------------------------------------------------------------------------
// Determine if this splash has sound
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.hasSound = function() {
	return this._se !== "";
};
//-----------------------------------------------------------------------------
// Get the splash image
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.getImage = function() {
	return this._image;
};
//-----------------------------------------------------------------------------
// Get the splash sound effect
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.getSe = function() {
	return this._se;
};
//-----------------------------------------------------------------------------
// Get the splash sound effect delay
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.getSoundDelay = function() {
	return this._soundDelay;
};
//=============================================================================
// CGMZ_Scene_SplashScreen
//-----------------------------------------------------------------------------
// Scene to show splash images and then transfer to title scene.
//=============================================================================
function CGMZ_Scene_SplashScreen() {
    this.initialize(...arguments);
}
CGMZ_Scene_SplashScreen.prototype = Object.create(Scene_Base.prototype);
CGMZ_Scene_SplashScreen.prototype.constructor = CGMZ_Scene_SplashScreen;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._timer = 0;
	this._fadeMode = 'none';
	this._fastFade = false;
	this._isReady = true;
	this._image = null;
	this._index = 0;
	this._hasSound = false;
	this._se = "";
	this._soundDelay = 0;
	this._soundPlayed = false;
	this._splashes = this.initSplashes();
};
//-----------------------------------------------------------------------------
// Initialize splash objects
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.initSplashes = function() {
    let splashes = [];
	CGMZ.SplashScreen.Splashes.forEach((splash) => {
		splashes.push(new CGMZ_Splash(splash));
	});
	return splashes;
};
//-----------------------------------------------------------------------------
// Create splash scene assets
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createImage();
};
//-----------------------------------------------------------------------------
// Create first splash image
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.createImage = function() {
    this._image = new Sprite(this._splashes[0].getImage());
	this._image.opacity = 0;
	this.addChild(this._image);
};
//-----------------------------------------------------------------------------
// Change image bitmap to next image
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.splash = function() {
	return this._splashes[this._index];
};
//-----------------------------------------------------------------------------
// Change image bitmap to next image
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.setNewImage = function() {
	const splash = this.splash();
    this._image.bitmap = splash.getImage();
	this._image.opacity = 0;
	this._hasSound = splash.hasSound();
	this._soundDelay = splash.getSoundDelay();
	this._se = {name: splash.getSe(), pan: 0, pitch: 100, volume: 100};
	this._soundPlayed = false;
	AudioManager.stopSe();
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if(this._timer === 0) {
		this.updateLoad();
	} else {
		this.updateFade();
	}
	if(Input.isTriggered('ok') || TouchInput.isPressed()) {
		this._fadeMode = 'out';
		this._fastFade = true;
	}
	this.updateAudio();
};
//-----------------------------------------------------------------------------
// Update image loading (if none left, leave scene)
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.updateLoad = function() {
	if(this._isReady) {
		if(this._index >= CGMZ.SplashScreen.Splashes.length) {
			SceneManager.goto(Scene_Title);
			Window_TitleCommand.initCommandPosition();
		} else {
			this.setNewImage();
			this._isReady = false;
			this._index++;
		}
	}
	if(ImageManager.isReady()) {
		this.centerSprite(this._image);
		this._fadeMode = 'in';
		this._timer++;
	}
};
//-----------------------------------------------------------------------------
// Update image fade in/out
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.updateFade = function() {
	if(this._fadeMode === 'in') {
		if(this._image.opacity < 255) {
			this._image.opacity += CGMZ.SplashScreen.FadeSpeed;
		}
		this._timer++;
		if(this._timer >= CGMZ.SplashScreen.DisplayTime) {
			this._fadeMode = 'out';
		}
	}
	else if(this._fadeMode ==='out') {
		this._image.opacity -= CGMZ.SplashScreen.FadeSpeed;
		if(this._fastFade) {
			this._image.opacity -= CGMZ.SplashScreen.FadeSpeed*3;
		}
		if(this._image.opacity <= 0) {
			this._timer = 0;
			this._fadeMode = 'none';
			this._isReady = true;
			this._fastFade = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Update image loading (if none left, leave scene)
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.updateAudio = function() {
	if(this._hasSound && !this._soundPlayed && this._timer > this._soundDelay) {
		this._soundPlayed = true;
		AudioManager.playSe(this._se);
	}
};
//-----------------------------------------------------------------------------
// Center Sprite
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.centerSprite = function(sprite) {
	sprite.x = (Graphics._width - sprite.width) / 2;
	sprite.y = (Graphics._height - sprite.height) / 2;
};
//=============================================================================
// Scene_Boot
//-----------------------------------------------------------------------------
// Change which scene begins the game
// Modifies: startNormalGame
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Change first scene unless no splash images
//-----------------------------------------------------------------------------
var alias_CGMZ_SplashScreen_SceneBoot_startNormalGame = Scene_Boot.prototype.start;
Scene_Boot.prototype.startNormalGame = function() {
	if(CGMZ.SplashScreen.Splashes.length < 1) {
		alias_CGMZ_SplashScreen_SceneBoot_startNormalGame.call(this);
	} else {
		this.checkPlayerLocation();
		DataManager.setupNewGame();
		SceneManager.goto(CGMZ_Scene_SplashScreen);
	}
};