/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/toastmanager/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Manages CGMZ toast (or pop up) windows for your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This plugin creates up to 3 toast windows in each scene (some
 * exceptions) which will display brief information or images to the player
 * for a short amount of time. Windows will be shown as they are freed in the
 * case of a queue of more than 3 toasts.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin supports Plugin commands:
 * Create Text Toast: Creates a new text toast with options, adds it to queue
 * Create Image Toast: Creates a new image toast with options, adds it to
 *                     queue
 *
 * Image dimensions should be 336x72 by default (if changing width,
 * subtract 24 from width value).
 *
 * Update History:
 * Version 1.0.0 - Initial Release
 *
 * Version 1.0.1:
 * SE are no longer mandatory on toasts
 *
 * Version 1.0.2:
 * Toast windows no longer update if they are not visible
 * Fix crash with VS Debugger (hopefully)
 *
 * @command Create Text Toast
 * @text Create Text Toast
 * @desc Creates a text-based toast window
 *
 * @arg lineOne
 * @type text
 * @text Line 1
 * @desc Text to display in Line 1 of the toast. \v, \n, \p, and \g text codes supported.
 * @default 
 *
 * @arg lineOneAlignment
 * @type combo
 * @text Line 1 Alignment
 * @option left
 * @option center
 * @option right
 * @desc Align the text in line 1 left, center, or right
 * @default center
 *
 * @arg lineOneColor
 * @type number
 * @min 0
 * @text Line One Color
 * @desc The color of line 1's text (same as in show text event command)
 * @default 0
 *
 * @arg lineTwo
 * @type text
 * @text Line 2
 * @desc Text to display in Line 2 of the toast. \v, \n, \p, and \g text codes supported.
 * @default 
 *
 * @arg lineTwoAlignment
 * @type combo
 * @text Line 2 Alignment
 * @option left
 * @option center
 * @option right
 * @desc Align the text in line 2 left, center, or right
 * @default center
 *
 * @arg lineTwoColor
 * @type number
 * @min 0
 * @text Line Two Color
 * @desc The color of line 2's text (same as in show text event command)
 * @default 0
 *
 * @arg width
 * @type number
 * @min 1
 * @text Width
 * @desc Width (in pixels) to make the toast window if not using fixed width plugin parameter
 * @default 360
 *
 * @arg SE
 * @type file
 * @dir audio/se
 * @text Sound Effect
 * @desc Sound effect to play when the toast appears
 * @default 
 *
 * @command Create Image Toast
 * @text Create Image Toast
 * @desc Creates an image-based toast window
 *
 * @arg image
 * @type file
 * @dir img/pictures
 * @text Image
 * @desc Image to display in the toast
 * @default 
 *
 * @arg showBackground
 * @type boolean
 * @text Show Background
 * @desc Whether to show the window background or not
 * @default false
 *
 * @arg width
 * @type number
 * @min 1
 * @text Width
 * @desc Width (in pixels) to make the toast window if not using fixed width plugin parameter
 * @default 360
 *
 * @arg SE
 * @type file
 * @dir audio/se
 * @text Sound Effect
 * @desc Sound effect to play when the toast appears
 * @default 
 * 
 * @param Max Window Count
 * @type number
 * @min 1
 * @max 3
 * @desc Determines max amount of toast windows shown at once
 * @default 1
 *
 * @param Spacing
 * @type number
 * @min 0
 * @desc Determines pixels between each toast window if showing multiple.
 * @default 12
 *
 * @param Width
 * @type number
 * @min 0
 * @desc Determines default width (in pixels) of the toast windows
 * @default 360
 *
 * @param Fixed Width
 * @type boolean
 * @desc Determines if toasts should adjust width or not. If true, toasts always use the above width parameter.
 * @default false
 *
 * @param Display Time
 * @type number
 * @min 0
 * @desc Length of time toast is displayed for (in frames)
 * @default 240
 *
 * @param Display From Bottom
 * @type boolean
 * @desc Determines if toasts should display from the bottom of the screen up, or from top down.
 * @default true
*/
var Imported = Imported || {};
Imported.CGMZ_ToastManager = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Toast Manager"] = "1.0.2";
CGMZ.ToastManager = CGMZ.ToastManager || {};
CGMZ.ToastManager.parameters = PluginManager.parameters('CGMZ_ToastManager');
CGMZ.ToastManager.MaxWindowCount = Number(CGMZ.ToastManager.parameters["Max Window Count"]) || 1;
CGMZ.ToastManager.Spacing = Number(CGMZ.ToastManager.parameters["Spacing"]) || 12;
CGMZ.ToastManager.Width = Number(CGMZ.ToastManager.parameters["Width"]) || 360;
CGMZ.ToastManager.DisplayTime = Number(CGMZ.ToastManager.parameters["Display Time"]) || 240;
CGMZ.ToastManager.FixedWidth = (CGMZ.ToastManager.parameters["Fixed Width"] === "true") ? true : false;
CGMZ.ToastManager.DisplayFromBottom = (CGMZ.ToastManager.parameters["Display From Bottom"] === "true") ? true : false;
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Store data to be used for toast windows.
// modified functions: createPluginData
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Create toast window array.
//-----------------------------------------------------------------------------
const alias_CGMZ_ToastManager_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_ToastManager_createPluginData.call(this);
	this._toastWindows = [];
};
//-----------------------------------------------------------------------------
// Alias. Create toast window array.
//-----------------------------------------------------------------------------
const alias_CGMZ_ToastManager_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_ToastManager_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_ToastManager", "Create Text Toast", this.pluginCommandCreateTextToast);
	PluginManager.registerCommand("CGMZ_ToastManager", "Create Image Toast", this.pluginCommandCreateImageToast);
};
//-----------------------------------------------------------------------------
// Creates a text-based toast object from a plugin command
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCreateTextToast = function(args) {
	let toast = {};
	toast.isText = true;
	toast.width = Number(args.width);
	toast.SE = {name: args.SE, pan: 0, pitch: 100, volume: 100};
	toast.lineOne = args.lineOne;
	toast.lineOneColor = Number(args.lineOneColor);
	toast.lineOneAlignment = args.lineOneAlignment;
	toast.lineTwo = args.lineTwo;
	toast.lineTwoColor = Number(args.lineTwoColor);
	toast.lineTwoAlignment = args.lineTwoAlignment;
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Creates an image-based toast object from a plugin command
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCreateImageToast = function(args) {
	let toast = {};
	toast.isImage = true;
	toast.width = Number(args.width);
	toast.SE = {name: args.SE, pan: 0, pitch: 100, volume: 100};
	toast.showBackground = (args.showBackground === "true") ? true : false;
	toast.picture = args.image
	$cgmzTemp.createNewToast(toast);
};
//-----------------------------------------------------------------------------
// Add new toast object to toast queue
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createNewToast = function(toastObject) {
	this._toastWindows.push(toastObject);
};
//-----------------------------------------------------------------------------
// Get first toast from queue
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getToast = function() {
	return this._toastWindows.shift();
};
//-----------------------------------------------------------------------------
// Determine if toast waiting for display exists
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.hasToast = function() {
	return this._toastWindows.length > 0;
};
//=============================================================================
// SceneManager
//-----------------------------------------------------------------------------
// Determine if the scene should have toast windows made
//=============================================================================
//-----------------------------------------------------------------------------
// Determine if the scene should make toast windows
//-----------------------------------------------------------------------------
SceneManager.CGMZ_ToastManager_canCreateToasts = function() {
	if(this._scene.constructor === Scene_File || this._scene.constructor === Scene_Boot || this._scene.constructor === Scene_Gameover ||
	   this._scene.constructor === Scene_Save || this._scene.constructor === Scene_Load || this._scene.constructor === Scene_Options ||
	   this._scene.constructor === Scene_Title) {
		return false;
	}
	return true;
};
//=============================================================================
// Scene_Base
//-----------------------------------------------------------------------------
// Modify the base scene to add handling for the toast windows.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Initialize whether the scene has toasts to false
//-----------------------------------------------------------------------------
const alias_CGMZ_ToastManager_SceneBase_initialize = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function() {
    alias_CGMZ_ToastManager_SceneBase_initialize.call(this);
	this._cgmz_hasToastWindows = false;
};
//-----------------------------------------------------------------------------
// Alias. Create toast windows after scene makes the window layer (if needed)
//-----------------------------------------------------------------------------
const alias_CGMZ_ToastManager_SceneBase_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    alias_CGMZ_ToastManager_SceneBase_createWindowLayer.call(this);
	if(SceneManager.CGMZ_ToastManager_canCreateToasts()) {
		this._cgmz_toastLayer = new WindowLayer();
		this._cgmz_toastLayer.x = (Graphics.width - Graphics.boxWidth) / 2;
		this._cgmz_toastLayer.y = (Graphics.height - Graphics.boxHeight) / 2;
		this.addChild(this._cgmz_toastLayer);
		this.CGMZ_ToastManager_createToastWindows();
	}
};
//-----------------------------------------------------------------------------
// Alias. Remove toast window layer.
//-----------------------------------------------------------------------------
const alias_CGMZ_ToastManager_SceneBase_terminate = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function() {
	alias_CGMZ_ToastManager_SceneBase_terminate.call(this);
	this.removeChild(this._cgmz_toastLayer);
};
//-----------------------------------------------------------------------------
// Add toast window
//-----------------------------------------------------------------------------
Scene_Base.prototype.CGMZ_ToastManager_addToast = function(window) {
    this._cgmz_toastLayer.addChild(window);
};
//-----------------------------------------------------------------------------
// Alias. Update toast windows
//-----------------------------------------------------------------------------
const alias_CGMZ_ToastManager_SceneBase_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
	alias_CGMZ_ToastManager_SceneBase_update.call(this);
	if(this._cgmz_hasToastWindows && this.isActive() && !this.isBusy()) {
        this.CGMZ_ToastManager_updateToastWindows();
    }
};
//-----------------------------------------------------------------------------
// Create amount of toast windows depending on need.
//-----------------------------------------------------------------------------
Scene_Base.prototype.CGMZ_ToastManager_createToastWindows = function() {
    this._cgmz_toastWindow1 = new CGMZ_Window_Toast(0);
    this.CGMZ_ToastManager_addToast(this._cgmz_toastWindow1);
	if(CGMZ.ToastManager.MaxWindowCount > 1) {
		this._cgmz_toastWindow2 = new CGMZ_Window_Toast(1);
		this.CGMZ_ToastManager_addToast(this._cgmz_toastWindow2);
	}
	if(CGMZ.ToastManager.MaxWindowCount > 2) {
		this._cgmz_toastWindow3 = new CGMZ_Window_Toast(2);
		this.CGMZ_ToastManager_addToast(this._cgmz_toastWindow3);
	}
	this._cgmz_hasToastWindows = true;
};
//-----------------------------------------------------------------------------
// Create amount of toast windows depending on need.
//-----------------------------------------------------------------------------
Scene_Base.prototype.CGMZ_ToastManager_updateToastWindows = function() {
	if($cgmzTemp.hasToast()) {
		if(!this._cgmz_toastWindow1.isDisplaying()) {
			this._cgmz_toastWindow1.open($cgmzTemp.getToast());
		}
		else if(CGMZ.ToastManager.MaxWindowCount > 1 && !this._cgmz_toastWindow2.isDisplaying()) {
			this._cgmz_toastWindow2.open($cgmzTemp.getToast());
		}
		else if(CGMZ.ToastManager.MaxWindowCount > 2 && !this._cgmz_toastWindow3.isDisplaying()) {
			this._cgmz_toastWindow3.open($cgmzTemp.getToast());
		}
	}
};
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// The toast window, handles displaying the toast information
//=============================================================================
function CGMZ_Window_Toast() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_Toast.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_Toast.prototype.constructor = CGMZ_Window_Toast;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.initialize = function(winNum) {
	const rect = this.getWindowRect(winNum);
    Window_Base.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
	this._isDisplaying = false;
	this._showBG = true;
	this._bitmap = ImageManager._emptyBitmap;
	this._bitmapLoading = false;
    this.contents.clear();
};
//-----------------------------------------------------------------------------
// Get the window's rect
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.getWindowRect = function(winNum) {
    const width = this.windowWidth();
    const height = this.windowHeight();
	const x = Graphics.boxWidth/2 - width/2;
	let y = 0;
	if(CGMZ.ToastManager.DisplayFromBottom) {
		y = Graphics.boxHeight - height - winNum*(height + CGMZ.ToastManager.Spacing);
	} else {
		y = 0 + winNum*(height + CGMZ.ToastManager.Spacing);
	}
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Default Window Width
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.windowWidth = function() {
    return CGMZ.ToastManager.Width;
};
//-----------------------------------------------------------------------------
// Default Window height
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.windowHeight = function() {
    return this.fittingHeight(2);
};
//-----------------------------------------------------------------------------
// Update for fade in/out
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.update = function() {
	if(this.isDisplaying()) {
		Window_Base.prototype.update.call(this);
		if (this._showCount > 0 && this.canDisplay()) {
			this.updateFadeIn();
			this._showCount--;
		} else {
			this.updateFadeOut();
		}
		if(this.contentsOpacity <= 0 && !this._bitmapLoading) {
			this._isDisplaying = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Check if everything is ready for displaying the toast.
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.canDisplay = function() {
	return this.isBitmapReady();
};
//-----------------------------------------------------------------------------
// Check if this is currently displaying
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.isDisplaying = function() {
	return this._isDisplaying
};
//-----------------------------------------------------------------------------
// Check if the bitmap is loaded. Perform a blt if so.
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.isBitmapReady = function() {
	if(!this._bitmapLoading) {
		return true;
	}
	else {
		if(this._bitmap.width === 0) {
			return false;
		}
		else {
			this._bitmapLoading = false;
			const sx = 0;
			const sy = 0;
			const sw = this._bitmap.width;
			const sh = this._bitmap.height;
			const dx = 0;
			const dy = 0;
			const dw = this.contents.width;
			const dh = this.contents.height;
			this.contents.blt(this._bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
			this._bitmap = ImageManager._emptyBitmap;
			return true;
		}
	}
};
//-----------------------------------------------------------------------------
// Fade in
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.updateFadeIn = function() {
	this.opacity += 16*(this._showBG);
    this.contentsOpacity += 16;
};
//-----------------------------------------------------------------------------
// Fade out
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.updateFadeOut = function() {
	this.opacity -= 16*(this._showBG);
    this.contentsOpacity -= 16;
};
//-----------------------------------------------------------------------------
// Open the window
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.open = function(toastObject) {
	this._isDisplaying = true;
    this.refresh(toastObject);
    this._showCount = CGMZ.ToastManager.DisplayTime;
};
//-----------------------------------------------------------------------------
// Close the window
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.close = function() {
    this._showCount = 0;
};
//-----------------------------------------------------------------------------
// Refresh the window
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.refresh = function(toastObject) {
	if(!toastObject) return;
	this._showBG = true;
	this.doCommonEffects(toastObject);
	this.contents.clear();
	this.resetTextColor();
	//Default text toast
	if(toastObject.isText) {
		const x = 0;
		let y = 0;
		const width = this.contents.width;
		this.changeTextColor(ColorManager.textColor(toastObject.lineOneColor));
		this.drawText(this.convertEscapeCharacters(toastObject.lineOne), x, y, width, toastObject.lineOneAlignment);
		y += this.lineHeight();
		this.resetTextColor();
		this.changeTextColor(ColorManager.textColor(toastObject.lineTwoColor));
		this.drawText(this.convertEscapeCharacters(toastObject.lineTwo), x, y, width, toastObject.lineTwoAlignment);
	}
	//Default image toast
	if(toastObject.isImage) {
		this._showBG = toastObject.showBackground;
		this._bitmap = ImageManager.loadPicture(toastObject.picture);
		this._bitmapLoading = true;
	}
	this.processCustomToast(toastObject);
};
//-----------------------------------------------------------------------------
// Perform common effects for all toast types (resize Width and play SE)
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.doCommonEffects = function(toastObject) {
	if(toastObject.hasOwnProperty('width') && !CGMZ.ToastManager.FixedWidth && toastObject.width != this.width) {
		this.updateWidth(toastObject.width);
	}
	else {
		this.updateWidth(CGMZ.ToastManager.Width);
	}
	if(toastObject.hasOwnProperty('SE')) {
		AudioManager.playSe(toastObject.SE);
	}
};
//-----------------------------------------------------------------------------
// Change window width
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.updateWidth = function(width) {
	if(width != this.width) {
		this.width = width;
		this.createContents();
	}
};
//-----------------------------------------------------------------------------
// Processing for custom toasts. To be used by other plugins for toast behavior
//-----------------------------------------------------------------------------
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	// Put toast behavior here
};