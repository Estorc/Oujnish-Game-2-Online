/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/vehicleinteriors/
 * @target MZ
 * @plugindesc Allows you to enter vehicle interior with button input
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.2.0
 * ----------------------------------------------------------------------------
 * Description: Allows you to enter the interior of the boat, ship, or airship
 * which is another map the player will be transferred to. It supports
 * keyboard and touch input.
 * ----------------------------------------------------------------------------
 * Documentation:
 * The interior key is case sensitive, it is recommended to use a lowercase
 * character.
 *
 * For touch UI button, you can get a "home" icon button to use from my website
 * and add it to your button sheet:
 * https://www.caspergaming.com/resources/
 * You will need to add this icon to the right side of your existing button
 * sheet. Alternatively, you can get a ready-made button sheet from the demo.
 * 
 * To exit the vehicle interiors, use the following Plugin Command in an
 * event:
 * CGMZ VehicleExit
 *
 * To enter the vehicle interiors you can use the following Plugin Command in
 * an event:
 * CGMZ VehicleEnter
 *
 * Version History:
 * 1.0.0 - Initial release
 *
 * @command Enter Vehicle
 * @desc Enters the vehicle the player is currently in
 *
 * @command Exit Vehicle
 * @desc Exits the vehicle interior the player is currently inside
 * 
 * @param General Options
 * @param Boat Options
 * @param Ship Options
 * @param Airship Options
 *
 * @param Interior Key
 * @parent General Options
 * @default a
 * @desc Key that will trigger entering the vehicle's interior.
 *
 * @param Interior Button Offset
 * @parent General Options
 * @type number
 * @min 0
 * @default 11
 * @desc Vehicle Interior Button index on the button sheet
 *
 * @param Interior Button Width
 * @parent General Options
 * @type number
 * @min 1
 * @default 1
 * @desc Vehicle Interior Button width (in multiple of 48 pixels)
 *
 * @param Interior Enable Switch
 * @parent General Options
 * @type switch
 * @default 1
 * @desc Switch which enables/disables ability to enter vehicle interiors.
 *
 * @param Boat Interior Map
 * @type number
 * @min 0
 * @default 0
 * @parent Boat Options
 * @desc Map to transport player to when visit interior button is pressed.
 *
 * @param Boat Interior X
 * @type number
 * @min 0
 * @default 0
 * @parent Boat Options
 * @desc X coordinate of interior map
 *
 * @param Boat Interior Y
 * @type number
 * @min 0
 * @default 0
 * @parent Boat Options
 * @desc Y coordinate of interior map
 *
 * @param Boat Interior Direction
 * @type number
 * @min 0
 * @default 0
 * @parent Boat Options
 * @desc starting direction for interior map
 *
 * @param Ship Interior Map
 * @type number
 * @min 0
 * @default 0
 * @parent Ship Options
 * @desc Map to transport player to when visit interior button is pressed.
 *
 * @param Ship Interior X
 * @type number
 * @min 0
 * @default 0
 * @parent Ship Options
 * @desc X coordinate of interior map
 *
 * @param Ship Interior Y
 * @type number
 * @min 0
 * @default 0
 * @parent Ship Options
 * @desc Y coordinate of interior map
 *
 * @param Ship Interior Direction
 * @type number
 * @min 0
 * @default 0
 * @parent Ship Options
 * @desc starting direction for interior map
 *
 * @param Airship Interior Map
 * @type number
 * @min 0
 * @default 0
 * @parent Airship Options
 * @desc Map to transport player to when visit interior button is pressed.
 *
 * @param Airship Interior X
 * @type number
 * @min 0
 * @default 0
 * @parent Airship Options
 * @desc X coordinate of interior map
 *
 * @param Airship Interior Y
 * @type number
 * @min 0
 * @default 0
 * @parent Airship Options
 * @desc Y coordinate of interior map
 *
 * @param Airship Interior Direction
 * @type number
 * @min 0
 * @default 0
 * @parent Airship Options
 * @desc starting direction for interior map
*/
var Imported = Imported || {};
Imported.CGMZ_VehicleInteriors = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Vehicle Interiors"] = "1.0.0";
CGMZ.VehicleInteriors = CGMZ.VehicleInteriors || {};
CGMZ.VehicleInteriors.parameters = PluginManager.parameters('CGMZ_VehicleInteriors');
CGMZ.VehicleInteriors.BoatInteriorMapId = Number(CGMZ.VehicleInteriors.parameters["Boat Interior Map"]);
CGMZ.VehicleInteriors.BoatInteriorMapX = Number(CGMZ.VehicleInteriors.parameters["Boat Interior X"]);
CGMZ.VehicleInteriors.BoatInteriorMapY = Number(CGMZ.VehicleInteriors.parameters["Boat Interior Y"]);
CGMZ.VehicleInteriors.BoatInteriorMapDir = Number(CGMZ.VehicleInteriors.parameters["Boat Interior Direction"]);
CGMZ.VehicleInteriors.ShipInteriorMapId = Number(CGMZ.VehicleInteriors.parameters["Ship Interior Map"]);
CGMZ.VehicleInteriors.ShipInteriorMapX = Number(CGMZ.VehicleInteriors.parameters["Ship Interior X"]);
CGMZ.VehicleInteriors.ShipInteriorMapY = Number(CGMZ.VehicleInteriors.parameters["Ship Interior Y"]);
CGMZ.VehicleInteriors.ShipInteriorMapDir = Number(CGMZ.VehicleInteriors.parameters["Ship Interior Direction"]);
CGMZ.VehicleInteriors.AirshipInteriorMapId = Number(CGMZ.VehicleInteriors.parameters["Airship Interior Map"]);
CGMZ.VehicleInteriors.AirshipInteriorMapX = Number(CGMZ.VehicleInteriors.parameters["Airship Interior X"]);
CGMZ.VehicleInteriors.AirshipInteriorMapY = Number(CGMZ.VehicleInteriors.parameters["Airship Interior Y"]);
CGMZ.VehicleInteriors.AirshipInteriorMapDir = Number(CGMZ.VehicleInteriors.parameters["Airship Interior Direction"]);
CGMZ.VehicleInteriors.InteriorKey = CGMZ.VehicleInteriors.parameters["Interior Key"];
CGMZ.VehicleInteriors.InteriorButtonOffset = Number(CGMZ.VehicleInteriors.parameters["Interior Button Offset"]);
CGMZ.VehicleInteriors.InteriorButtonWidth = Number(CGMZ.VehicleInteriors.parameters["Interior Button Width"]);
CGMZ.VehicleInteriors.InteriorSwitch = Number(CGMZ.VehicleInteriors.parameters["Interior Enable Switch"]);
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// New plugin commands for enter / exit vehicles
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_VehicleInteriors_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_VehicleInteriors", "Enter Vehicle", this.pluginCommandVehicleInteriorsEnter);
	PluginManager.registerCommand("CGMZ_VehicleInteriors", "Exit Vehicle", this.pluginCommandVehicleInteriorsExit);
};
//-----------------------------------------------------------------------------
// Processing for the enter vehicle plugin command
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandVehicleInteriorsEnter = function() {
	$gamePlayer.CGMZ_forceVehicleInteriorEnter();
};
//-----------------------------------------------------------------------------
// Processing for the exit vehicle plugin command
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandVehicleInteriorsExit = function() {
	$gamePlayer.CGMZ_vehicleInteriorExit();
};
//=============================================================================
// Game_Vehicle
//-----------------------------------------------------------------------------
// Modify the vehicle object for additional options
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Do not save BGM if in interior
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_getOn = Game_Vehicle.prototype.getOn;
Game_Vehicle.prototype.getOn = function() {
	if($gamePlayer.CGMZ_VehicleInteriors_isInInterior()) {
		this._driving = true;
		this.setWalkAnime(true);
		this.setStepAnime(true);
		this.playBgm();
	}
	else {
		alias_CGMZ_VehicleInteriors_getOn.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Do not replay BGM if in interior
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_getOff = Game_Vehicle.prototype.getOff;
Game_Vehicle.prototype.getOff = function() {
	if($gamePlayer.CGMZ_VehicleInteriors_isInInterior()) {
		this._driving = false;
		this.setWalkAnime(false);
		this.setStepAnime(false);
		this.resetDirection();
	}
    else {
		alias_CGMZ_VehicleInteriors_getOff.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Do not land Airship if going to interior
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_updateAirshipAltitude = Game_Vehicle.prototype.updateAirshipAltitude;
Game_Vehicle.prototype.updateAirshipAltitude = function() {
    if(!$gamePlayer.CGMZ_VehicleInteriors_isInInterior()) {
		alias_CGMZ_VehicleInteriors_updateAirshipAltitude.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Hide shadow if inside vehicle interior
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_shadowOpacity = Game_Vehicle.prototype.shadowOpacity;
Game_Vehicle.prototype.shadowOpacity = function() {
	if(!$gamePlayer.CGMZ_VehicleInteriors_isInInterior()) {
		return alias_CGMZ_VehicleInteriors_shadowOpacity.call(this);
	}
	return 0;
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Update to check if vehicle interior map should be called, encounters in vehicle
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Set some interior variables to defaultt values
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    alias_CGMZ_VehicleInteriors_initMembers.call(this);
	this._CGMZ_vehicleInteriorRecall = '';
	this._CGMZ_isInInterior = false;
	this._CGMZ_vehicleRecallX = 0;
	this._CGMZ_vehicleRecallY = 0;
	this._CGMZ_vehicleRecallD = 0;
	this._CGMZ_transferringToInterior = false;
};
//-----------------------------------------------------------------------------
// Alias. Check for vehicle interior input
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_updateVehicle = Game_Player.prototype.updateVehicle;
Game_Player.prototype.updateVehicle = function() {
	alias_CGMZ_VehicleInteriors_updateVehicle.call(this);
    if(this.CGMZ_VehicleInteriors_canEnterVehicle()) {
        this.CGMZ_updateVehicleInterior(false);
    }
};
//-----------------------------------------------------------------------------
// Determine if the player is currently in a vehicle interior
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_VehicleInteriors_isInInterior = function() {
	return this._CGMZ_isInInterior;
};
//-----------------------------------------------------------------------------
// Determine if the player can enter a vehicle interior
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_VehicleInteriors_canEnterVehicle = function() {
	const canEnter = !this._CGMZ_transferringToInterior && (CGMZ.VehicleInteriors.InteriorSwitch === 0 || 
					 $gameSwitches.value(CGMZ.VehicleInteriors.InteriorSwitch)) && !this.CGMZ_VehicleInteriors_isInInterior() && 
					 this.isInVehicle() && !this.areFollowersGathering() && !this._vehicleGettingOn && !this._vehicleGettingOff;
	return canEnter;
};
//-----------------------------------------------------------------------------
// Check for vehicle interior input, execute transfer if input detected
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_updateVehicleInterior = function(usingEventCommand) {
    if(($cgmzTemp.isKeyPressed(CGMZ.VehicleInteriors.InteriorKey) || usingEventCommand)) {
        this._CGMZ_transferringToInterior = true;
		this._CGMZ_vehicleRecallX = this.x;
		this._CGMZ_vehicleRecallY = this.y;
		this._CGMZ_vehicleRecallD = this.direction();
		this._vehicleRecallMap = $gameMap.mapId();
		if(this.isInBoat()) {
			this._CGMZ_vehicleInteriorRecall = 'boat';
			var mapId = CGMZ.VehicleInteriors.BoatInteriorMapId;
			var x = CGMZ.VehicleInteriors.BoatInteriorMapX;
			var y = CGMZ.VehicleInteriors.BoatInteriorMapY;
			var dir = CGMZ.VehicleInteriors.BoatInteriorMapDir;
		}
		else if(this.isInShip()) {
			this._CGMZ_vehicleInteriorRecall = 'ship';
			var mapId = CGMZ.VehicleInteriors.ShipInteriorMapId;
			var x = CGMZ.VehicleInteriors.ShipInteriorMapX;
			var y = CGMZ.VehicleInteriors.ShipInteriorMapY;
			var dir = CGMZ.VehicleInteriors.ShipInteriorMapDir;
		}
		else if(this.isInAirship()) {
			this._CGMZ_vehicleInteriorRecall = 'airship';
			var mapId = CGMZ.VehicleInteriors.AirshipInteriorMapId;
			var x = CGMZ.VehicleInteriors.AirshipInteriorMapX;
			var y = CGMZ.VehicleInteriors.AirshipInteriorMapY;
			var dir = CGMZ.VehicleInteriors.AirshipInteriorMapDir;
		}
		this._CGMZ_isInInterior = true;
		this._vehicleGettingOff = true;
		this.vehicle().getOff();
		this.setMoveSpeed(4);
        this.setThrough(false);
		this.reserveTransfer(mapId, x, y, dir, 0);
		this._CGMZ_transferringToInterior = false;
    }
};
//-----------------------------------------------------------------------------
// Force Enter Interior of Vehicle
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_forceVehicleInteriorEnter = function() {
	if(this.CGMZ_VehicleInteriors_canEnterVehicle()) {
		this.CGMZ_updateVehicleInterior(true);
	}
};
//-----------------------------------------------------------------------------
// Exit Interior of Vehicle
//-----------------------------------------------------------------------------
Game_Player.prototype.CGMZ_vehicleInteriorExit = function() {
	if(this._CGMZ_isInInterior) {
		this.gatherFollowers();
		this._vehicleType = this._CGMZ_vehicleInteriorRecall;
		const x  = this._CGMZ_vehicleRecallX;
		const y  = this._CGMZ_vehicleRecallY;
		const dir = this._CGMZ_vehicleRecallD;
		const mapId = this._vehicleRecallMap;
		this._vehicleGettingOn = true;
		this.reserveTransfer(mapId, x, y, dir, 0);
	}
};
//-----------------------------------------------------------------------------
// Alias. Clear vehicle interior flag only after vehicle is boarded
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_updateVehicleGetOn = Game_Player.prototype.updateVehicleGetOn;
Game_Player.prototype.updateVehicleGetOn = function() {
	alias_CGMZ_VehicleInteriors_updateVehicleGetOn.call(this);
    if (!this.areFollowersGathering() && !this.isMoving()) {
        this._CGMZ_isInInterior = false;
    }
	this.makeEncounterCount();
};
//-----------------------------------------------------------------------------
// Alias. No need for checking altitude for airship interior
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_updateVehicleGetOff = Game_Player.prototype.updateVehicleGetOff;
Game_Player.prototype.updateVehicleGetOff = function() {
	if(this.CGMZ_VehicleInteriors_isInInterior()) {
		this._vehicleGettingOff = false;
        this._vehicleType = 'walk';
	}
    else {
		alias_CGMZ_VehicleInteriors_updateVehicleGetOff.call(this);
	}
	this.makeEncounterCount();
};
//-----------------------------------------------------------------------------
// Alias. Set transparency after transfer to vehicle interior
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
    alias_CGMZ_VehicleInteriors_performTransfer.call(this);
	if(this.CGMZ_VehicleInteriors_isInInterior()) {
		this.setTransparent(false);
	}
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Also add vehicle interior touch UI + handling
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also create vehicle interior button if touch UI
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_SceneMap_createButtons = Scene_Map.prototype.createButtons;
Scene_Map.prototype.createButtons = function() {
	alias_CGMZ_VehicleInteriors_SceneMap_createButtons.call(this);
    if (ConfigManager.touchUI) {
        this.CGMZ_VehicleInteriors_createVehicleInteriorButton();
    }
};
//-----------------------------------------------------------------------------
// Create the vehicle interior button
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_VehicleInteriors_createVehicleInteriorButton = function() {
	this._CGMZ_vehicleInteriorButton = new Sprite_Button("cgmzVehicleInterior");
    this._CGMZ_vehicleInteriorButton.x = Graphics.boxWidth - (this._CGMZ_vehicleInteriorButton.width + 4) * 2;
    this._CGMZ_vehicleInteriorButton.y = this.buttonY();
    this._CGMZ_vehicleInteriorButton.visible = false;
	this._CGMZ_vehicleInteriorButton.setClickHandler(this.CGMZ_VehicleInteriorButtonOnClick);
    this.addWindow(this._CGMZ_vehicleInteriorButton);
};
//-----------------------------------------------------------------------------
// Vehicle Interior Button click handler method
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_VehicleInteriorButtonOnClick = function() {
	$gamePlayer.CGMZ_forceVehicleInteriorEnter();
};
//-----------------------------------------------------------------------------
// Alias. Vehicle interior button might be touched
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_SceneMap_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function() {
    return alias_CGMZ_VehicleInteriors_SceneMap_isAnyButtonPressed.call(this) || (this._CGMZ_vehicleInteriorButton && this._CGMZ_vehicleInteriorButton.isPressed());
};
//-----------------------------------------------------------------------------
// Alias. Also update vehicle interior button
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    alias_CGMZ_VehicleInteriors_SceneMap_update.call(this);
	this.CGMZ_updateVehicleInteriorButton();
};
//-----------------------------------------------------------------------------
// Update vehicle interior button
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_updateVehicleInteriorButton = function() {
    if (this._CGMZ_vehicleInteriorButton) {
        const buttonEnabled = this.CGMZ_isVehicleInteriorButtonEnabled();
        if (buttonEnabled !== this._CGMZ_vehicleInteriorButton.visible) {
            this._CGMZ_vehicleInteriorButton.visible = buttonEnabled;
        }
    }
};
//-----------------------------------------------------------------------------
// Check if vehicle interior button should display
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_isVehicleInteriorButtonEnabled = function() {
    return this._CGMZ_vehicleInteriorButton && !$gameMap.isEventRunning() && $gamePlayer.CGMZ_VehicleInteriors_canEnterVehicle();
};
//-----------------------------------------------------------------------------
// Alias. Also hide vehicle interior button if not battle scene next
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_SceneMap_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
	this.CGMZ_hideVehicleInteriorButton();
    alias_CGMZ_VehicleInteriors_SceneMap_terminate.call(this);
};
//-----------------------------------------------------------------------------
// Hide the vehicle interior button
//-----------------------------------------------------------------------------
Scene_Map.prototype.CGMZ_hideVehicleInteriorButton = function() {
    if (this._CGMZ_vehicleInteriorButton) {
        this._CGMZ_vehicleInteriorButton.visible = false;
    }
};
//=============================================================================
// Sprite_Button
//-----------------------------------------------------------------------------
// Add vehicle interior button
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. If undefined, check if vehicle interior button and return expected results
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleInteriors_SpriteButton_buttonData = Sprite_Button.prototype.buttonData;
Sprite_Button.prototype.buttonData = function() {
    data = alias_CGMZ_VehicleInteriors_SpriteButton_buttonData.call(this);
	if(data) {
		return data;
	}
	const vehicleInteriorButtonTable = {
		cgmzVehicleInterior: { x: CGMZ.VehicleInteriors.InteriorButtonOffset, w: CGMZ.VehicleInteriors.InteriorButtonWidth }
	};
	return vehicleInteriorButtonTable[this._buttonType];
};