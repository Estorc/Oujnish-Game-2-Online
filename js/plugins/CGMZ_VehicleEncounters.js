/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/vehicleencounters/
 * @target MZ
 * @plugindesc Allows you to have encounters while on a vehicle
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
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This plugin lets you have encounters on the boat, ship, and
 * airship. It allows for custom encounter steps, battlebacks, and encounter
 * lists per vehicle.
 * ----------------------------------------------------------------------------
 * Documentation:
 *
 * Version History:
 * 1.0.0 - Initial release
 * 
 * @param Boat Options
 * @param Ship Options
 * @param Airship Options
 *
 * @param Boat Encounters
 * @type troop[]
 * @default []
 * @parent Boat Options
 * @desc Troop IDs that the vehicle can encounter. Leaving this empty means no encounters.
 *
 * @param Boat Encounter Steps
 * @type number
 * @min 1
 * @default 60
 * @parent Boat Options
 * @desc Average steps before encounter in this vehicle.
 *
 * @param Boat Battleback1
 * @type file
 * @dir img/battlebacks1
 * @default 
 * @parent Boat Options
 * @desc Battle back 1 to use for encounters in this vehicle.
 
 * @param Boat Battleback2
 * @type file
 * @dir img/battlebacks2
 * @default 
 * @parent Boat Options
 * @desc Battle back 2 to use for encounters in this vehicle.
 *
 * @param Boat Encounter Switch
 * @type switch
 * @parent Boat Options
 * @default 0
 * @desc Switch that turns on/off encounters in this vehicle.
 *
 * @param Ship Encounters
 * @type troop[]
 * @min 0
 * @default []
 * @parent Ship Options
 * @desc Troop IDs that the vehicle can encounter. Leaving this empty means no encounters.
 *
 * @param Ship Encounter Steps
 * @type number
 * @min 1
 * @default 60
 * @parent Ship Options
 * @desc Average steps before encounter in this vehicle.
 *
 * @param Ship Battleback1
 * @type file
 * @dir img/battlebacks1
 * @default 
 * @parent Ship Options
 * @desc Battle back 1 to use for encounters in this vehicle.
 
 * @param Ship Battleback2
 * @type file
 * @dir img/battlebacks2
 * @default 
 * @parent Ship Options
 * @desc Battle back 2 to use for encounters in this vehicle.
 *
 * @param Ship Encounter Switch
 * @type switch
 * @parent Ship Options
 * @default 0
 * @desc Switch that turns on/off encounters in this vehicle.
 *
 * @param Airship Encounters
 * @type troop[]
 * @default []
 * @parent Airship Options
 * @desc Troop IDs that the vehicle can encounter. Leaving this empty means no encounters.
 *
 * @param Airship Encounter Steps
 * @type number
 * @min 1
 * @default 60
 * @parent Airship Options
 * @desc Average steps before encounter in this vehicle.
 *
 * @param Airship Battleback1
 * @type file
 * @dir img/battlebacks1
 * @default 
 * @parent Airship Options
 * @desc Battle back 1 to use for encounters in this vehicle.
 
 * @param Airship Battleback2
 * @type file
 * @dir img/battlebacks2
 * @default 
 * @parent Airship Options
 * @desc Battle back 2 to use for encounters in this vehicle.
 *
 * @param Airship Encounter Switch
 * @type switch
 * @parent Airship Options
 * @default 0
 * @desc Switch that turns on/off encounters in this vehicle.
*/
var Imported = Imported || {};
Imported.CGMZ_VehicleEncounters = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Vehicle Encounters"] = "1.0.0";
CGMZ.VehicleEncounters = CGMZ.VehicleEncounters || {};
CGMZ.VehicleEncounters.parameters = PluginManager.parameters('CGMZ_VehicleEncounters');
CGMZ.VehicleEncounters.BoatEncounters = JSON.parse(CGMZ.VehicleEncounters.parameters["Boat Encounters"]);
CGMZ.VehicleEncounters.ShipEncounters = JSON.parse(CGMZ.VehicleEncounters.parameters["Ship Encounters"]);
CGMZ.VehicleEncounters.AirshipEncounters = JSON.parse(CGMZ.VehicleEncounters.parameters["Airship Encounters"]);
CGMZ.VehicleEncounters.BoatEncounterSteps = Number(CGMZ.VehicleEncounters.parameters["Boat Encounter Steps"]);
CGMZ.VehicleEncounters.ShipEncounterSteps = Number(CGMZ.VehicleEncounters.parameters["Ship Encounter Steps"]);
CGMZ.VehicleEncounters.AirshipEncounterSteps = Number(CGMZ.VehicleEncounters.parameters["Airship Encounter Steps"]);
CGMZ.VehicleEncounters.BoatEncounterSwitch = Number(CGMZ.VehicleEncounters.parameters["Boat Encounter Switch"]);
CGMZ.VehicleEncounters.ShipEncounterSwitch = Number(CGMZ.VehicleEncounters.parameters["Ship Encounter Switch"]);
CGMZ.VehicleEncounters.AirshipEncounterSwitch = Number(CGMZ.VehicleEncounters.parameters["Airship Encounter Switch"]);
CGMZ.VehicleEncounters.BoatBattleback1 = CGMZ.VehicleEncounters.parameters["Boat Battleback1"];
CGMZ.VehicleEncounters.BoatBattleback2 = CGMZ.VehicleEncounters.parameters["Boat Battleback2"];
CGMZ.VehicleEncounters.ShipBattleback1 = CGMZ.VehicleEncounters.parameters["Ship Battleback1"];
CGMZ.VehicleEncounters.ShipBattleback2 = CGMZ.VehicleEncounters.parameters["Ship Battleback2"];
CGMZ.VehicleEncounters.AirshipBattleback1 = CGMZ.VehicleEncounters.parameters["Airship Battleback1"];
CGMZ.VehicleEncounters.AirshipBattleback2 = CGMZ.VehicleEncounters.parameters["Airship Battleback2"];
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Update to check if vehicle interior map should be called, encounters in vehicle
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Make encounter count (avg steps differ based on vehicle)
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_makeEncounterCount = Game_Player.prototype.makeEncounterCount;
Game_Player.prototype.makeEncounterCount = function() {
	let n = this.isInBoat()*CGMZ.VehicleEncounters.BoatEncounterSteps +
			this.isInShip()*CGMZ.VehicleEncounters.ShipEncounterSteps +
			this.isInAirship()*CGMZ.VehicleEncounters.AirshipEncounterSteps;
    if(n > 0) {
		this._encounterCount = Math.randomInt(n) + Math.randomInt(n) + 1;
	} else {
		alias_CGMZ_VehicleEncounters_makeEncounterCount.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Can encounter on all vehicles, if switch is on.
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_canEncounter = Game_Player.prototype.canEncounter;
Game_Player.prototype.canEncounter = function() {
	if(this._vehicleGettingOn || this._vehicleGettingOff) {
		return false;
	}
	if(!$gameParty.hasEncounterNone() && $gameSystem.isEncounterEnabled() && !this.isMoveRouteForcing() && !this.isDebugThrough()) {
		if(this.isInBoat() && (CGMZ.VehicleEncounters.BoatEncounterSwitch === 0 || $gameSwitches.value(CGMZ.VehicleEncounters.BoatEncounterSwitch))) {
			return true;
		} else if(this.isInShip() && (CGMZ.VehicleEncounters.ShipEncounterSwitch === 0 || $gameSwitches.value(CGMZ.VehicleEncounters.ShipEncounterSwitch))) {
			return true;
		} else if(this.isInAirship() && (CGMZ.VehicleEncounters.AirshipEncounterSwitch === 0 || $gameSwitches.value(CGMZ.VehicleEncounters.AirshipEncounterSwitch))) {
			return true;
		}
	}
	if(!this.isInBoat() && !this.isInShip()) {
		return alias_CGMZ_VehicleEncounters_canEncounter.call(this);
	}
	return false;
};
//-----------------------------------------------------------------------------
// Alias. Different encounter lists for vehicles
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
Game_Player.prototype.makeEncounterTroopId = function() {
	let encounterId = 0;
	if(this.isInBoat()) {
		encounterId = Math.randomInt(CGMZ.VehicleEncounters.BoatEncounters.length);
		return Number(CGMZ.VehicleEncounters.BoatEncounters[encounterId]);
	} else if(this.isInShip()) {
		encounterId = Math.randomInt(CGMZ.VehicleEncounters.ShipEncounters.length);
		return Number(CGMZ.VehicleEncounters.ShipEncounters[encounterId]);
	} else if(this.isInAirship()) {
		encounterId = Math.randomInt(CGMZ.VehicleEncounters.AirshipEncounters.length);
		return Number(CGMZ.VehicleEncounters.AirshipEncounters[encounterId]);
	} else {
		return alias_CGMZ_VehicleEncounters_makeEncounterTroopId.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Undo 1/2 encounter rate for ship
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_encounterProgressValue = Game_Player.prototype.encounterProgressValue;
Game_Player.prototype.encounterProgressValue = function() {
    let val = alias_CGMZ_VehicleEncounters_encounterProgressValue.call(this);
	if(this.isInShip()) val *= 2;
	return val;
};
//=============================================================================
// Sprite_Battleback
//-----------------------------------------------------------------------------
// Show battlebacks for vehicle encounters
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Show different battleback1 depending on vehicle
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_battleback1Name = Sprite_Battleback.prototype.battleback1Name
Sprite_Battleback.prototype.battleback1Name = function() {
    if($gamePlayer.isInBoat()) {
		return CGMZ.VehicleEncounters.BoatBattleback1;
	} else if($gamePlayer.isInShip()) {
		return CGMZ.VehicleEncounters.ShipBattleback1;
	} else if($gamePlayer.isInAirship()) {
		return CGMZ.VehicleEncounters.AirshipBattleback1;
	} else {
		return alias_CGMZ_VehicleEncounters_battleback1Name.call(this);
	}
};
//-----------------------------------------------------------------------------
// Alias. Show different battleback2 depending on vehicle
//-----------------------------------------------------------------------------
const alias_CGMZ_VehicleEncounters_battleback2Name = Sprite_Battleback.prototype.battleback2Name
Sprite_Battleback.prototype.battleback2Name = function() {
    if($gamePlayer.isInBoat()) {
		return CGMZ.VehicleEncounters.BoatBattleback2;
	} else if($gamePlayer.isInShip()) {
		return CGMZ.VehicleEncounters.ShipBattleback2;
	} else if($gamePlayer.isInAirship()) {
		return CGMZ.VehicleEncounters.AirshipBattleback2;
	} else {
		return alias_CGMZ_VehicleEncounters_battleback2Name.call(this);
	}
};