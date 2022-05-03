//-----------------------------------------------------------------------------
//  Galv's Dynamic Traits
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_DynamicTraits.js
//-----------------------------------------------------------------------------
//  2016-10-30 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_DynamicTraits = true;

var Galv = Galv || {};                  // Galv's main object
Galv.DTRAITS = Galv.DTRAITS || {};          // Galv's stuff

// Galv Notetag setup (Add notes required for this plugin if not already added)
Galv.noteFunctions = Galv.noteFunctions || [];       // Add note function to this.

//-----------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc (v.1.0) Add traits to an actor during game or gain traits on level up.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Display Trait On Level
 * @desc true or false if trait gains are displayed in default level up message
 * @default true
 *
 * @param Trait Gained Text
 * @desc The text displayed before gaining a trait on level up
 * @default Gained Trait:
 *
 *
 * @help
 *   Galv's Dynamic Traits
 * ----------------------------------------------------------------------------
 * This plugin allows you to manually add new traits to actors during the game
 * or to set up actors and classes to give new traits when actors level up.
 * Actors and classes have notetags that control which traits will be gained
 * when reaching certain levels and a notification of traits gained can be
 * added to the level up message if desired.
 *
 * Customizing the trait level-up text more in detail is possible but must be
 * done by editing the plugin file and requires a little bit of javascript
 * understanding to see how it works. Please do not ask Galv to teach you this.
 *
 * ----------------------------------------------------------------------------
 *   NOTE TAG for ACTORS and CLASSES
 * ----------------------------------------------------------------------------
 * Traits gained at level
 * ----------------------
 * Actors and classes can be tagged with the following note tag to specify a
 * list of traits that will be gained on each designated level-up. You can have
 * as many lvl,code,id,val traits each separated by |.
 *
 *       <traits:lvl,code,id,val|lvl,code,id,val|lvl,code,id,val>
 *
 * lvl is the level that the trait will be aquired at
 * code, id and val settings can be seen in the below table.
 *
 * TRAIT                      CODE         ID               VAL
 * ------------------         -------      -----------      -------------
 * Element Rate               11           elementId        % as decimal
 * Debuff Rate                12           paramId*         % as decimal
 * State Rate                 13           stateId          % as decimal
 * State Resist               14           stateId          N/A
 *
 * Parameter                  21           paramId*         % as decimal
 * Ex-Parameter               22           ExParamId*       % as decimal
 * Sp-Parameter               23           SpParamId*       % as decimal
 *
 * Attack Element             31           elementId        N/A
 * Attack State               32           stateId          % as decimal
 * Attack Speed               33           integer          N/A
 * Attack Times +             34           0                integer
 *
 * Add Skill Type             41           skillTypeId      N/A
 * Seal Skill Type            42           skillTypeId      N/A
 * Add Skill                  43           skillId          N/A
 * Seal Skill                 44           skillId          N/A
 *
 * Equip Weapon               51           weaponTypeId     N/A
 * Equip Armor                52           armorTypeId      N/A     
 * Lock Equip                 53           equipTypeId      N/A
 * Seal Equip                 54           equipTypeId      N/A  
 * Slot Type                  55           0 norm 1 dual    N/A
 *
 * Action Times +             61           0                % as decimal
 * Special Flag               62           flagId*          N/A
 * Collapse Effect            63           collapseId*      N/A
 * Party Ability              64           partyAbilityId*  N/A
 * ----------------------------------------------------------------------------
 * NOTES:
 *   ID's generally start at 1 for values that can be seen in the database.
 *   Where there is a * above, the first id in their list is 0 instead of 1.
 *
 *   Where VAL is N/A, simply put 0 in the val position of the notetag/script
 *
 *   Actors will use the highest level trait if multiple level ups have the
 *   same trait (same trait code).
 *   Classes will use the highest level trait if multiple level ups have the
 *   same trait (same trait code).
 *   This means that if an actor has the same trait code as class class's trait
 *   then the actor will use BOTH traits but only the highest from each.
 * ----------------------------------------------------------------------------
 * 
 * ----------------------------------------------------------------------------
 *  SCRIPT CALLS
 * ----------------------------------------------------------------------------
 * Actors can have traits added to them manually via script calls. Script calls
 * can also be used to remove these added traits from the actor again (but it
 * cannot remove traits added via level or from actors/items/states/etc/ from
 * the database).
 * Adding traits using this method will replace any previous traits also added
 * by this method that have the same code. (So only one of each trait can exist
 * on an actor from these manually added traits).
 *
 *    Galv.DTRAITS.addTrait(actorId,code,id,value);
 *
 *    Galv.DTRAITS.removeTrait(actorId,code);
 *
 * ----------------------------------------------------------------------------
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {


//-----------------------------------------------------------------------------
//  OTHER STUFF
//-----------------------------------------------------------------------------

Galv.DTRAITS.createTrait = function(code,id,value) {
	return {code: Number(code), dataId: Number(id), value: Number(value)};
};

Galv.DTRAITS.addTrait = function(actorId,code,id,value) {
	var actor = $gameActors.actor(actorId);
	if (actor) actor._dTraits[code] = Galv.DTRAITS.createTrait(code,id,value);
};

Galv.DTRAITS.removeTrait = function(actorId,code) {
	var actor = $gameActors.actor(actorId);
	if (actor) delete(actor._dTraits[code]);
};


//-----------------------------------------------------------------------------
//  GAME ACTOR
//-----------------------------------------------------------------------------

Galv.DTRAITS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
	Galv.DTRAITS.Game_Actor_initMembers.call(this);
	this._dTraits = {};
};

Galv.DTRAITS.Game_Actor_allTraits = Game_Actor.prototype.allTraits;
Game_Actor.prototype.allTraits = function() {
	var traits = Galv.DTRAITS.Game_Actor_allTraits.call(this);

	var cTraits = [];  // class traits by level
	var aTraits = [];  // actor traits by level
	
	
	// ACTOR MANUALLY ADDED TRAITS
	for (var trait in this._dTraits) {
		traits.push(this._dTraits[trait]);
	}
	
	// MERGE TRAIT ARRAYS
	traits = traits.concat(aTraits,cTraits);

	return traits;
};

})();
