/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/achievements/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Creates a powerful achievement system
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.2.1
 * ----------------------------------------------------------------------------
 * Description: Adds an achievements system including achievement points,
 * secret achievements, difficulty, and more. Achievements offer automatic
 * tracking as well as manual unlocking. Achievements can also have rewards
 * such as items or gold, or even switches/variables. This plugin works well
 * with CGMZ Toast Manager for pop ups when an achievement is earned. This
 * plugin also allows for achievements based off of CGMZ Encyclopedia and
 * Bestiary completion percentage.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin supports the following plugin commands:
 * Earn Achievement by Name - This earns the achievement with the name
 * provided, case sensitive
 *
 * Earn Achievement by ID - This earns the achievement with the provided ID.
 * IDs are the order the achievements are listed in the plugin manager and
 * start at 1.
 *
 * Call Scene - This calls the achievement scene.
 *
 * Change Description - This will let you change the pre and post description
 *                      of an achievement
 *
 * Reinitialize - This will reset all achievement progress as if you had
 * started a new game.
 *
 * To call the achievement scene via JavaScript command, use:
 * SceneManager.push(CGMZ_Scene_Achievements);
 *
 * ADDITIONAL NOTES:
 * CGMZ Toast Manager
 * This plugin has additional functionality when using CGMZ Toast Manager.
 * CGMZ Toast allows for the display of a pop-up window on the map screen when
 * an achievement is earned. Settings for this can be found under the popup
 * settings for an achievement.
 *
 * CGMZ Encyclopedia
 * This plugin has additional functionality when using CGMZ Encyclopedia.
 * CGMZ Encyclopedia can be used for achievements, such as "Discover the
 * entire encyclopedia"
 *
 * Date Format Option help:
 * 0: MM/DD/YYYY     (ex: 1/20/2001)
 * 1: DD/MM/YYYY     (ex: 20/1/2001)
 * 2: YYYY/MM/DD     (ex: 2001/1/20)
 * 3: Month DD, YYYY (ex: January 20, 2001)
 * 4: DD Month YYYY  (ex: 20 January 2001)
 * 5: Mon. DD, YYYY  (ex: Jan 20, 2001)
 * 6: DD Mon. YYYY   (ex: 20 Jan 2001)
 * 7: MM/DD          (ex: 1/20)
 * 8: DD/MM          (ex: 20/1)
 *
 * Version History:
 * Version 1.0 - Initial Release
 *
 * Version 1.1.0:
 * - Fixed crash if there are no achievements
 * - Added support for CGMZ Professions
 *
 * Version 1.1.1:
 * - Fixed bug with variable tracking when using the "=" operator
 *
 * Version 1.2.0:
 * - Added ability to use text codes in achievement descriptions
 * - New achievements should now be automatically recognized by saved games
 * - Added ability to change pre and post descriptions
 * - Added option to change the label / header text color
 * - Added option to change text alignment of list window
 * - Added option to change text alignment of totals window
 * - Fixed bug with toast audio on achievement earn
 * - Fixed bug with padding on list window
 * - Removed plugin command to manually recognize new achievements in saved
 *   game
 *
 * Version 1.2.1:
 * - Fixed crash when not using CGMZ Encyclopedia
 *
 * Version 1.2.2:
 * - Fixed bug with variable achievements not auto completing when they should
 *
 * @command Earn Achievement By Name
 * @desc Earns an achievement by its name
 *
 * @arg name
 * @type text
 * @text Achievement Name
 * @desc The name of the achievement to earn
 * @default
 *
 * @command Earn Achievement By ID
 * @desc Earns an achievement by its id
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to earn.
 * @default 0
 *
 * @command Call Scene
 * @desc Calls the Achievement Scene
 *
 * @command Change Description
 * @desc Chbanges the pre or post description of an achievement
 *
 * @arg name
 * @type text
 * @text Achievement Name
 * @desc The name of the achievement to change description. Leave blank if using ID.
 * @default
 *
 * @arg id
 * @type number
 * @text Achievement ID
 * @desc The id of the achievement to change description. Not used if using name instead.
 * @default 0
 *
 * @arg Pre Description
 * @type note
 * @default ""
 * @desc Achievement description before it is earned. Leave blank for no change
 *
 * @arg Post Description
 * @type note
 * @default ""
 * @desc Achievement description after it is earned. Leave blank for no change
 *
 * @command Reinitialize
 * @desc Resets all of the achievement data. Use for saved games to recognize changed data
 *
 * @param CGMZ Achievements
 *
 * @param Achievements
 * @parent CGMZ Achievements
 * @type struct<Achievement>[]
 * @default []
 * @desc Achievements
 *
 * @param Requires CGMZ Toast Plugin
 * 
 * @param ShowAchievementPop
 * @parent Requires CGMZ Toast Plugin
 * @type boolean
 * @desc Determines whether a pop window is shown when achievement is earned.
 * @default false
 *
 * @param AchievementEarnedText
 * @parent Requires CGMZ Toast Plugin
 * @desc Text to show on first line of achievement pop window
 * @default Achievement Earned
 *
 * @param AchievementEarnedColor
 * @parent Requires CGMZ Toast Plugin
 * @type number
 * @min 0
 * @max 31
 * @desc Color for text on the first line of achievement pop window. Uses windowskin colors. Range: 0-31
 * @default 3
 *
 * @param AchievementEarnedAlignment
 * @parent Requires CGMZ Toast Plugin
 * @desc Alignment for pop text. Valid values: left, right, center
 * @default center
 *
 * @param AchievementEarnedSound
 * @parent Requires CGMZ Toast Plugin
 * @type file
 * @dir audio/se/
 * @desc Default sound to play when achievement pop-up window pops
 * @default Applause1
 *
 * @param Achievement Scene Options
 *
 * @param ShowSecretAchievements
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine whether secret achievements are displayed in the achievement scene
 * @default false
 *
 * @param SecretText
 * @parent Achievement Scene Options
 * @desc Text to show as achievement name if secret achievement is displayed in scene
 * @default ??????
 *
 * @param ShowCriteriaAfterCompletion
 * @parent Achievement Scene Options
 * @type boolean
 * @desc true = still show criteria, false = stop showing criteria after completion.
 * @default true
 *
 * @param DateFormat
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @max 8
 * @desc Number specifying date format. See documentation for help. Valid Range: 0-8
 * @default 0
 *
 * @param ScrollSpeed
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc speed at which the achievement window display scrolls (if needed)
 * @default 1
 *
 * @param ScrollWait
 * @parent Achievement Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Achievement Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Achievement Scene Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Text Options
 * @parent Achievement Scene Options
 *
 * @param Reward Text
 * @parent Text Options
 * @desc Text to describe Rewards
 * @default Rewards:
 *
 * @param Requirement Text
 * @parent Text Options
 * @desc Text to describe Requirements
 * @default Requirements:
 *
 * @param Difficulty Text
 * @parent Text Options
 * @desc Text to describe Difficulty
 * @default Difficulty:
 *
 * @param Description Text
 * @parent Text Options
 * @desc Text to describe Description
 * @default Description:
 *
 * @param Points Text
 * @parent Text Options
 * @desc Text to describe Points
 * @default Points:
 *
 * @param Unearned Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when unearned
 * @default Keep playing to earn this achievement
 *
 * @param Earned Text
 * @parent Text Options
 * @desc Text to appear at the top of the achievement window when earned
 * @default Achievement earned on:
 *
 * @param Earned Count Text
 * @parent Text Options
 * @desc Text to appear when counting earned achievements
 * @default Earned:
 *
 * @param Total Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the totals window
 * @default left
 *
 * @param List Window Alignment
 * @parent Text Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the text in the achievement list window
 * @default left
 *
 * @param Currency Unit Space
 * @parent Text Options
 * @type boolean
 * @desc Add a space between the Currency Value and Currency Unit?
 * @default false
 *
 * @param Label Color
 * @parent Text Options
 * @type number
 * @min 0
 * @desc Color to draw label text in.
 * @default 16
 * 
 * @param Gauge Colors
 * @parent Achievement Scene Options
 * 
 * @param CurrencyGaugeColor1
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 1 for currency gauge
 * @default 6
 *
 * @param CurrencyGaugeColor2
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 2 for currency gauge
 * @default 17
 *
 * @param GenericGaugeColor1
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 1 for miscellaneous gauges
 * @default 28
 *
 * @param GenericGaugeColor2
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 2 for miscellaneous gauges
 * @default 29
 *
 * @param ItemGaugeColor1
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 1 for item gauges
 * @default 22
 *
 * @param ItemGaugeColor2
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 2 for item gauges
 * @default 23
 *
 * @param SwitchVarGaugeColor1
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 1 for switch and variable gauges
 * @default 20
 *
 * @param SwitchVarGaugeColor2
 * @type number
 * @min 0
 * @parent Gauge Colors
 * @desc Color 2 for switch and variable gauges
 * @default 21
*/
/*~struct~Item:
 * @param Item
 * @type item
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
 */
/*~struct~Weapon:
 * @param Weapon
 * @type weapon
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
 */
/*~struct~Armor:
 * @param Armor
 * @type armor
 * 
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @default 1
 */
/*~struct~Switch:
 * @param Switch
 * @type switch
 * 
 * @param On/Off
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 *
 * @param Description
 * @type text
 * @default
 * @desc description for this switch
 */
/*~struct~Variable:
 * @param Variable
 * @type variable
 * 
 * @param Operator
 * @type text
 * @desc Valid operators for criteria: < <= > >= =
 * Valid operators for reward: + - / * % =
 * @default >
 *
 * @param Amount
 * @type number
 * @default 0
 * @desc Criteria: the value to check the variable against
 * Reward: the value to award to the variable
 *
 * @param Description
 * @type text
 * @default
 * @desc description for this variable
 */
/*~struct~Requirement:
 * @param Currency
 * @type number
 * @min 0
 * @default 0
 * @desc Amount of currency needed to earn the achievement
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items needed to earn the achievement
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons needed to earn the achievement
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors needed to earn the achievement
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches needed to earn the achievement
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables needed to earn the achievement
 * @default []
 *
 * @param Saves
 * @type number
 * @min 0
 * @default 0
 * @desc Save count needed to earn the achievement
 *
 * @param Playtime
 * @type number
 * @min 0
 * @default 0
 * @desc Playtime needed to earn the achievement. In frames (60f/1sec)
 *
 * @param Steps
 * @type number
 * @min 0
 * @default 0
 * @desc Step count needed to earn the achievement
 *
 * @param Battles
 * @type number
 * @min 0
 * @default 0
 * @desc Battle count needed to earn the achievement
 *
 * @param Wins
 * @type number
 * @min 0
 * @default 0
 * @desc Win count needed to earn the achievement
 *
 * @param Escapes
 * @type number
 * @min 0
 * @default 0
 * @desc Escape count needed to earn the achievement
 *
 * @param Achievements Earned
 * @type number
 * @min 0
 * @default 0
 * @desc Earned achievements needed to earn the achievement
 *
 * @param Achievement Points
 * @type number
 * @min 0
 * @default 0
 * @desc Achievement points needed to earn the achievement
 *
 * @param Encyclopedia Total
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia discovered % needed to earn the achievement
 *
 * @param Encyclopedia Bestiary
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia bestiary discovered % needed to earn the achievement
 *
 * @param Encyclopedia Items
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia items discovered % needed to earn the achievement
 *
 * @param Encyclopedia Armors
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia armors discovered % needed to earn the achievement
 *
 * @param Encyclopedia Weapons
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia weapons discovered % needed to earn the achievement
 *
 * @param Encyclopedia Skills
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia skills discovered % needed to earn the achievement
 *
 * @param Encyclopedia States
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @desc Total Encyclopedia states discovered % needed to earn the achievement
 *
 * @param Professions
 * @type struct<Profession>[]
 * @default []
 * @desc profession requirements
 */
 /*~struct~Reward:
 * @param Currency
 * @type number
 * @default 0
 * @desc Amount of currency to award upon achievement earn
 * 
 * @param Items
 * @type struct<Item>[]
 * @desc Items to award upon achievement earn
 * @default []
 *
 * @param Weapons
 * @type struct<Weapon>[]
 * @desc Weapons to award upon achievement earn
 * @default []
 *
 * @param Armors
 * @type struct<Armor>[]
 * @desc Armors to award upon achievement earn
 * @default []
 *
 * @param Switches
 * @type struct<Switch>[]
 * @desc Switches to manipulate upon achievement earn
 * @default []
 *
 * @param Variables
 * @type struct<Variable>[]
 * @desc Variables to manipulate upon achievement earn
 * @default []
 */
/*~struct~Popup:
 * @param Display?
 * @type boolean
 * @default true
 * @desc Display a pop up window on the map on achievement earn? No popup will display if not using CGMZ Toast Manager
 *
 * @param Sound
 * @type file
 * @dir audio/se/
 * @desc Sound to play on achievement earn
 * 
 * @param Image
 * @type file
 * @dir img/pictures
 * @desc Image to show on achievement earn. Leave blank to show a text window instead
 * 
 * @param Color
 * @type number
 * @min 0
 * @default 0
 * @desc Color to show achievement name with in text window upon earn. No effect if showing image instead.
 */
 /*~struct~Achievement:
 * @param Name
 * @type text
 * @desc Name of the achievement
 * 
 * @param Points
 * @type number
 * @min 0
 * @default 10
 * @desc Amount of points the achievement is worth
 *
 * @param Pre Description
 * @type note
 * @default ""
 * @desc Achievement description before it is earned
 *
 * @param Post Description
 * @type note
 * @default ""
 * @desc Achievement description after it is earned. Leave blank to always use Pre Description
 *
 * @param Difficulty
 * @type text
 * @default Easy
 * @desc Achievement difficulty
 *
 * @param Secret
 * @type boolean
 * @default false
 * @desc Is the achievement a secret achievement?
 *
 * @param Automatic
 * @type boolean
 * @default false
 * @desc Automatically track the achievement progress?
 *
 * @param Rewards
 * @type struct<Reward>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]"}
 * @desc Achievement Rewards
 *
 * @param Requirements
 * @type struct<Requirement>
 * @default {"Currency":"0","Items":"[]","Weapons":"[]","Armors":"[]","Switches":"[]","Variables":"[]","Saves":"0","Playtime":"0","Steps":"0","Battles":"0","Wins":"0","Escapes":"0","Achievements Earned":"0","Achievement Points":"0","Encyclopedia Total":"0","Encyclopedia Bestiary":"0","Encyclopedia Items":"0","Encyclopedia Armors":"0","Encyclopedia Weapons":"0","Encyclopedia Skills":"0","Encyclopedia States":"0","Professions":"[]"}
 * @desc Achievement Requirements
 *
 * @param Popup
 * @type struct<Popup>
 * @default {"Display?":"true","Sound":"Applause1","Image":"","Color":"0"}
 * @desc Settings for the pop up window if using CGMZ Toast Manager
 */
 /*~struct~Profession:
 * @param Name
 * @type text
 * @desc The name of the profession to track
 * 
 * @param Level Requirement
 * @type number
 * @min 1
 * @default 1
 * @desc The level requirement for the profession.
 */
var Imported = Imported || {};
Imported.CGMZ_Achievements = true;
var CGMZ = CGMZ || {};
CGMZ.Achievements = CGMZ.Achievements || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Achievements"] = "1.2.2";
CGMZ.Achievements.parameters = PluginManager.parameters('CGMZ_Achievements');
CGMZ.Achievements.ShowAchievementPop = (CGMZ.Achievements.parameters["ShowAchievementPop"] === "true");
CGMZ.Achievements.AchievementEarnedText = CGMZ.Achievements.parameters["AchievementEarnedText"];
CGMZ.Achievements.AchievementEarnedColor = Number(CGMZ.Achievements.parameters["AchievementEarnedColor"]);
CGMZ.Achievements.AchievementEarnedAlignment = CGMZ.Achievements.parameters["AchievementEarnedAlignment"];
CGMZ.Achievements.AchievementEarnedSound = CGMZ.Achievements.parameters["AchievementEarnedSound"];
CGMZ.Achievements.ShowSecretAchievements = (CGMZ.Achievements.parameters["ShowSecretAchievements"] === "true");
CGMZ.Achievements.SecretText = CGMZ.Achievements.parameters["SecretText"];
CGMZ.Achievements.ShowCriteriaAfterCompletion = (CGMZ.Achievements.parameters["ShowCriteriaAfterCompletion"] === "true");
CGMZ.Achievements.DateFormat = Number(CGMZ.Achievements.parameters["DateFormat"]);
CGMZ.Achievements.CurrencyGaugeColor1 = Number(CGMZ.Achievements.parameters["CurrencyGaugeColor1"]);
CGMZ.Achievements.CurrencyGaugeColor2 = Number(CGMZ.Achievements.parameters["CurrencyGaugeColor2"]);
CGMZ.Achievements.GenericGaugeColor1 = Number(CGMZ.Achievements.parameters["GenericGaugeColor1"]);
CGMZ.Achievements.GenericGaugeColor2 = Number(CGMZ.Achievements.parameters["GenericGaugeColor2"]);
CGMZ.Achievements.ItemGaugeColor1 = Number(CGMZ.Achievements.parameters["ItemGaugeColor1"]);
CGMZ.Achievements.ItemGaugeColor2 = Number(CGMZ.Achievements.parameters["ItemGaugeColor2"]);
CGMZ.Achievements.SwitchVarGaugeColor1 = Number(CGMZ.Achievements.parameters["SwitchVarGaugeColor1"]);
CGMZ.Achievements.SwitchVarGaugeColor2 = Number(CGMZ.Achievements.parameters["SwitchVarGaugeColor2"]);
CGMZ.Achievements.ScrollSpeed = Number(CGMZ.Achievements.parameters["ScrollSpeed"]);
CGMZ.Achievements.ScrollWait = Number(CGMZ.Achievements.parameters["ScrollWait"]);
CGMZ.Achievements.ScrollDeceleration = parseFloat(CGMZ.Achievements.parameters["Scroll Deceleration"]);
CGMZ.Achievements.AutoScroll = (CGMZ.Achievements.parameters["Auto Scroll"] === "true");
CGMZ.Achievements.CurrencyUnitSpace = (CGMZ.Achievements.parameters["Currency Unit Space"] === "true");
CGMZ.Achievements.RewardText = CGMZ.Achievements.parameters["Reward Text"];
CGMZ.Achievements.RequirementText = CGMZ.Achievements.parameters["Requirement Text"];
CGMZ.Achievements.DifficultyText = CGMZ.Achievements.parameters["Difficulty Text"];
CGMZ.Achievements.DescriptionText = CGMZ.Achievements.parameters["Description Text"];
CGMZ.Achievements.PointsText = CGMZ.Achievements.parameters["Points Text"];
CGMZ.Achievements.UnearnedText = CGMZ.Achievements.parameters["Unearned Text"];
CGMZ.Achievements.EarnedText = CGMZ.Achievements.parameters["Earned Text"];
CGMZ.Achievements.EarnedCountText = CGMZ.Achievements.parameters["Earned Count Text"];
CGMZ.Achievements.TotalWindowAlignment = CGMZ.Achievements.parameters["Total Window Alignment"];
CGMZ.Achievements.ListWindowAlignment = CGMZ.Achievements.parameters["List Window Alignment"];
CGMZ.Achievements.LabelColor = Number(CGMZ.Achievements.parameters["Label Color"]);
CGMZ.Achievements.Achievements = JSON.parse(CGMZ.Achievements.parameters["Achievements"]);
//=============================================================================
// CGMZ_Achievement
//-----------------------------------------------------------------------------
// Store and manage achievement data.
//=============================================================================
function CGMZ_Achievement() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Achievement
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initialize = function(achievementData, id) {
	this._id = id;
	this._earned = false;
	this._earndate = "";
	achievementData = JSON.parse(achievementData);
	this._name = achievementData["Name"];
	this._points = Number(achievementData["Points"]);
	this._difficulty = achievementData["Difficulty"];
	this._predesc = JSON.parse(achievementData["Pre Description"]);
	this._postdesc = JSON.parse(achievementData["Post Description"]);
	if(this._postdesc === "") {
		this._postdesc = this._predesc;
	}
	this._automatic = (achievementData["Automatic"] === "true");
	this._secret = (achievementData["Secret"] === "true");
	const popupData = JSON.parse(achievementData["Popup"]);
	this._popup = {"display": (popupData["Display?"] === "true"), "sound": popupData["Sound"],
					"image": popupData["Image"], "color": Number(popupData["Color"])};
	const rewards = JSON.parse(achievementData["Rewards"]);
	this._rewards = {};
	this._rewards["items"] = [];
	this._rewards["switches"] = [];
	this._rewards["variables"] = [];
	this._rewards["currency"] = Number(rewards["Currency"]);
	this.initializeItems(this._rewards.items, rewards["Items"], "Item", "Amount", "item");
	this.initializeItems(this._rewards.items, rewards["Weapons"], "Weapon", "Amount", "weapon");
	this.initializeItems(this._rewards.items, rewards["Armors"], "Armor", "Amount", "armor");
	this.initializeSwitches(this._rewards.switches, rewards["Switches"], "Switch", "On/Off", "Description");
	this.initializeVariables(this._rewards.variables, rewards["Variables"], "Variable", "Amount", "Description", "Operator");
	const requirements = JSON.parse(achievementData["Requirements"]);
	this._requirements = {};
	this._requirements["items"] = [];
	this._requirements["switches"] = [];
	this._requirements["variables"] = [];
	this._requirements["currency"] = Number(requirements["Currency"]);
	this.initializeItems(this._requirements.items, requirements["Items"], "Item", "Amount", "item");
	this.initializeItems(this._requirements.items, requirements["Weapons"], "Weapon", "Amount", "weapon");
	this.initializeItems(this._requirements.items, requirements["Armors"], "Armor", "Amount", "armor");
	this.initializeSwitches(this._requirements.switches, requirements["Switches"], "Switch", "On/Off", "Description");
	this.initializeVariables(this._requirements.variables, requirements["Variables"], "Variable", "Amount", "Description", "Operator");
	this._requirements["saves"] = Number(requirements["Saves"]);
	this._requirements["steps"] = Number(requirements["Steps"]);
	this._requirements["battles"] = Number(requirements["Battles"]);
	this._requirements["wins"] = Number(requirements["Wins"]);
	this._requirements["escapes"] = Number(requirements["Escapes"]);
	this._requirements["achievetotal"] = Number(requirements["Achievements Earned"]);
	this._requirements["achievepts"] = Number(requirements["Achievement Points"]);
	this._requirements["playtime"] = Math.floor(Number(requirements["Playtime"]) / 60);
	this._requirements["encyclopediatotal"] = Number(requirements["Encyclopedia Total"]);
	this._requirements["encyclopediabestiary"] = Number(requirements["Encyclopedia Bestiary"]);
	this._requirements["encyclopediaitems"] = Number(requirements["Encyclopedia Items"]);
	this._requirements["encyclopediaweapons"] = Number(requirements["Encyclopedia Weapons"]);
	this._requirements["encyclopediaarmors"] = Number(requirements["Encyclopedia Armors"]);
	this._requirements["encyclopediaskills"] = Number(requirements["Encyclopedia Skills"]);
	this._requirements["encyclopediastates"] = Number(requirements["Encyclopedia States"]);
	this._requirements["professions"] = this.initializeProfessionRequirements(requirements["Professions"]);
	this.setRewardFlag(this._rewards);
	this.setRequirementFlag(this._requirements);
};
//-----------------------------------------------------------------------------
// Initialize Achievement items (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initializeItems = function(itemArray, JSONtext, idText, amtText, type) {
	let parsedItems = JSON.parse(JSONtext);
	for(let i = 0; i < parsedItems.length; i++) {
		const obj = JSON.parse(parsedItems[i]);
		const id = Number(obj[idText]);
		const amt = Number(obj[amtText]);
		itemArray.push({"type": type, "id": id, "amt": amt});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initializeSwitches = function(switchArray, JSONtext, idText, valueText, descText) {
	let parsedItems = JSON.parse(JSONtext);
	for(let i = 0; i < parsedItems.length; i++) {
		const obj = JSON.parse(parsedItems[i]);
		const id = Number(obj[idText]);
		const value = (obj[valueText] === "true");
		const description = obj[descText];
		switchArray.push({"value": value, "id": id, "description": description});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement switches (requirement or reward)
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initializeVariables = function(variableArray, JSONtext, idText, valueText, descText, opText) {
	let parsedItems = JSON.parse(JSONtext);
	for(let i = 0; i < parsedItems.length; i++) {
		const obj = JSON.parse(parsedItems[i]);
		const id = Number(obj[idText]);
		const value = Number(obj[valueText]);
		const operator = obj[opText];
		const description = obj[descText];
		variableArray.push({"value": value, "id": id, "description": description, "operator": operator});
	}
};
//-----------------------------------------------------------------------------
// Initialize Achievement profession requirements
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.initializeProfessionRequirements = function(reqs) {
	if(!Imported.CGMZ_Professions) return [];
	let required = [];
	reqs = JSON.parse(reqs);
	for(let i = 0; i < reqs.length; i++) {
		const reqTemp = JSON.parse(reqs[i]);
		const req = {"name": reqTemp.Name, "level": Number(reqTemp["Level Requirement"])};
		required.push(req);
	}
	return required;
};
//-----------------------------------------------------------------------------
// Set flag if achievement has rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setRewardFlag = function(rewards) {
	this._hasRewards = (rewards.currency > 0 || rewards.items.length > 0 || rewards.switches.length > 0 || rewards.variables.length > 0);
};
//-----------------------------------------------------------------------------
// Set flag if achievement has requirements
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setRequirementFlag = function(req) {
	this._hasRequirements = (req.currency > 0 || req.items.length > 0 || req.switches.length > 0 || req.variables.length > 0 || req.saves > 0 || req.steps > 0 ||
							req.playtime > 0 || req.wins > 0 || req.battles > 0 || req.escapes > 0 || req.achievepts > 0 || req.achievetotal > 0 || req.encyclopediatotal ||
							req.encyclopediaarmors || req.encyclopediabestiary || req.encyclopediaitems ||
							req.encyclopediaweapons || req.encyclopediaskills || req.encyclopediastates || req.professions.length > 0);
};
//-----------------------------------------------------------------------------
// Set achievement descriptions
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.setDescriptions = function(pre, post) {
	if(pre) this._predesc = pre;
	if(post) this._postdesc = post;
};
//-----------------------------------------------------------------------------
// Get achievement name
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.getName = function() {
	return this._name;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.isAutomatic = function() {
	return this._automatic;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.isSecret = function() {
	return this._secret;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.isEarned = function() {
	return this._earned;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.hasRewards = function() {
	return this._hasRewards;
};
//-----------------------------------------------------------------------------
// Determine if achievement should be automatically tracked
//-----------------------------------------------------------------------------
CGMZ_Achievement.prototype.hasRequirements = function() {
	return this._hasRequirements;
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage achievement data. Stored as an array of achievement objects.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Call Initialize for achievements
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Achievements_createPluginData.call(this);
	this.initializeAchievements(false);
};
//-----------------------------------------------------------------------------
// Alias. Load new achievements after saved game load
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_CGMZCore_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Achievements_CGMZCore_onAfterLoad.call(this);
	this.initializeAchievements(false);
};
//-----------------------------------------------------------------------------
// Initializes achievements
// If new achievements have been added, these will be added onto the end of the
// existing array.
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeAchievements = function(reinitialize) {
	if(!this._achievements || reinitialize) {
		this.setupAchievementVariables();
	}
	let id = this._achievements.length + 1;
	for(let i = 0; i < CGMZ.Achievements.Achievements.length; i++) {
		const achievement = new CGMZ_Achievement(CGMZ.Achievements.Achievements[i], id);
		if(!this.getAchievementByName(achievement.getName())) {
			this.commitAchievement(achievement);
			id++;
		}
	}
	
};
//-----------------------------------------------------------------------------
// Set up variables for achievements
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupAchievementVariables = function() {
	this._achievements = [];
	this.setupAchievementCriteriaTypeArrays();
	this._usingAchievementPoints = false;
	this._achievetotal = 0;
	this._achievepts = 0;
};
//-----------------------------------------------------------------------------
// Commit the achievement to the achievement array
// Also store achievement criteria informations
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.commitAchievement = function(achievement) {
	this._achievements.push(achievement);
	if(achievement._points > 0) {
		this._usingAchievementPoints = true;
	}
	if(achievement.hasRequirements() && achievement.isAutomatic()) {
		const req = achievement._requirements
		if(req.currency > 0) {
			this._achievementTypes.currency.push(achievement._id);
		}
		if(req.steps > 0) {
			this._achievementTypes.steps.push(achievement._id);
		}
		if(req.saves > 0) {
			this._achievementTypes.saves.push(achievement._id);
		}
		if(req.playtime > 0) {
			this._achievementTypes.playtime.push(achievement._id);
		}
		if(req.battles > 0) {
			this._achievementTypes.battles.push(achievement._id);
		}
		if(req.escapes > 0) {
			this._achievementTypes.escapes.push(achievement._id);
		}
		if(req.wins > 0) {
			this._achievementTypes.wins.push(achievement._id);
		}
		if(req.achievepts > 0) {
			this._achievementTypes.achievepts.push(achievement._id);
		}
		if(req.achievetotal > 0) {
			this._achievementTypes.achievetotal.push(achievement._id);
		}
		if(req.encyclopediatotal > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediabestiary > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediaarmors > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediaitems > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediaweapons > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediaskills > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.encyclopediastates > 0) {
			this._achievementTypes.encyclopedia.push(achievement._id);
		}
		if(req.items.length > 0) {
			this._achievementTypes.items.push(achievement._id);
		}
		if(req.switches.length > 0) {
			this._achievementTypes.switches.push(achievement._id);
		}
		if(req.variables.length > 0) {
			this._achievementTypes.variables.push(achievement._id);
		}
		if(req.professions.length > 0) {
			this._achievementTypes.professions.push(achievement._id);
		}
	}
};
//-----------------------------------------------------------------------------
// Setup Achievement Type Arrays (for faster checking criteria)
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupAchievementCriteriaTypeArrays = function() {
	this._achievementTypes = {}; // each property stores IDs of achievements with those criteria
	this._achievementTypes.currency = [];
	this._achievementTypes.steps = [];
	this._achievementTypes.battles = [];
	this._achievementTypes.escapes = [];
	this._achievementTypes.wins = [];
	this._achievementTypes.playtime = [];
	this._achievementTypes.saves = [];
	this._achievementTypes.achievetotal = [];
	this._achievementTypes.achievepts = [];
	this._achievementTypes.items = [];
	this._achievementTypes.switches = [];
	this._achievementTypes.variables = [];
	this._achievementTypes.encyclopedia = [];
	this._achievementTypes.professions = [];
};
//-----------------------------------------------------------------------------
// Earn achievement
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.earnAchievement = function(id) {
	const achievement = this.getAchievementByID(id);
	if(achievement.isEarned()) return;
	achievement._earned = true;
	this._achievetotal++;
	this._achievepts += achievement._points;
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	achievement._earndate = $cgmzTemp.createDateText(day, month, year, CGMZ.Achievements.DateFormat, "/");
	if(achievement.hasRewards()) {
		this.giveAchievementRewards(achievement._rewards);
	}
	if(Imported.CGMZ_ToastManager && CGMZ.Achievements.ShowAchievementPop && achievement._popup.display) {
		this.setupAchievementToast(achievement);
	}
	this.checkAchievementAchieveptsCriteria();
	this.checkAchievementAchievetotalCriteria();
};
//-----------------------------------------------------------------------------
// Give achievement rewards
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.giveAchievementRewards = function(reward) {
	if(reward.currency > 0) {
		$gameParty.gainGold(reward.currency);
	}
	for(const itemObj of reward.items) {
		const item = $cgmzTemp.lookupItem(itemObj.type, itemObj.id)
		$gameParty.gainItem(item, itemObj.amt);
	}
	for(const switchObj of reward.switches) {
		$gameSwitches.setValue(switchobj.id, switchobj.value);
	}
	for(const variableObj of reward.variables) {
		try {
			oldValue = $gameVariables.value(variableobj.id);
			switch(variableobj.operator) {
				case "=": $gameVariables.setValue(variableobj.id, variableobj.value); break;
				case "+": $gameVariables.setValue(variableobj.id, oldValue + variableobj.value); break;
				case "-": $gameVariables.setValue(variableobj.id, oldValue - variableobj.value); break;
				case "*": $gameVariables.setValue(variableobj.id, oldValue * variableobj.value); break;
				case "/": $gameVariables.setValue(variableobj.id, oldValue / variableobj.value); break;
				case "%": $gameVariables.setValue(variableobj.id, oldValue % variableobj.value); break;
			}
		} catch (e) {
			$gameVariables.setValue(variableobj.id, 0);
		}
	}
};
//-----------------------------------------------------------------------------
// Sets up achievement toast window
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupAchievementToast = function(achievement) {
	let toastobj = {};
	const pop = achievement._popup;
	const seName = (pop.sound === "") ? CGMZ.Achievements.AchievementEarnedSound : pop.sound;
	toastobj.SE = {name: seName, pan: 0, pitch: 100, volume: 100};
	if(pop.image !== "") {
		toastobj.isImage = true;
		toastobj.picture = pop.image;
		toastobj.showBackground = false;
	} else {
		toastobj.isText = true;
		toastobj.lineOneAlignment = CGMZ.Achievements.AchievementEarnedAlignment;
		toastobj.lineOne = CGMZ.Achievements.AchievementEarnedText;
		toastobj.lineOneColor = CGMZ.Achievements.AchievementEarnedColor;
		toastobj.lineTwoAlignment = CGMZ.Achievements.AchievementEarnedAlignment;
		toastobj.lineTwo = achievement._name;
		toastobj.lineTwoColor = pop.color;
	}
	$cgmzTemp.createNewToast(toastobj);
};
//-----------------------------------------------------------------------------
// Check Achievement Criteria and Award if achievement is earned
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementForEarn = function(achievement) {
	if(!this.needCriteriaCheck(achievement)) return;
	const criteria = achievement._requirements;
	if(criteria.currency > 0 && $gameParty.gold() < criteria.currency) return;
	if(criteria.steps > 0 && $gameParty.steps() < criteria.steps) return;
	if(criteria.saves > 0 && $gameSystem.saveCount() < criteria.saves) return;
	if(criteria.battles > 0 && $gameSystem.battleCount() < criteria.battles) return;
	if(criteria.wins > 0 && $gameSystem.winCount() < criteria.wins) return;
	if(criteria.escapes > 0 && $gameSystem.escapeCount() < criteria.escapes) return;
	if(criteria.achievepts > 0 && this._achievepts < criteria.achievepts) return;
	if(criteria.achievetotal > 0 && this._achievetotal < criteria.achievetotal) return;
	if(criteria.playtime > 0 && $gameSystem.playtime() < criteria.playtime) return;
	if(criteria.encyclopediatotal > 0 && this.getEncyclopediaTotalPercent() < criteria.encyclopediatotal) return;
	if(criteria.encyclopediabestiary > 0 && this.getEncyclopediaBestiaryPercent() < criteria.encyclopediabestiary) return;
	if(criteria.encyclopediaitems > 0 && this.getEncyclopediaItemsPercent() < criteria.encyclopediaitems) return;
	if(criteria.encyclopediaarmors > 0 && this.getEncyclopediaArmorsPercent() < criteria.encyclopediaarmors) return;
	if(criteria.encyclopediaweapons > 0 && this.getEncyclopediaWeaponsPercent() < criteria.encyclopediaweapons) return;
	if(criteria.encyclopediaskills > 0 && this.getEncyclopediaSkillsPercent() < criteria.encyclopediaskills) return;
	if(criteria.encyclopediastates > 0 && this.getEncyclopediaStatesPercent() < criteria.encyclopediastates) return;
	for(let i = 0; i < criteria.professions.length; i++) {
		const profession = $cgmz.getProfession(criteria.professions[i].name);
		if(profession._level < criteria.professions[i].level) return;
	}
	for(const itemObj of criteria.items) {
		const item = $cgmzTemp.lookupItem(itemObj.type, itemObj.id);
		if($gameParty.numItems(item) < itemObj.amt) return;
	}
	for(const switchObj of criteria.switches) {
		if(switchObj.value != $gameSwitches.value(switchObj.id)) return;
	}
	for(const variableObj of criteria.variables) {
		const gameVariable = $gameVariables.value(variableObj.id);
		switch(variableObj.operator) {
			case ">": if(gameVariable <= variableObj.value) return; break;
			case ">=": if(gameVariable < variableObj.value) return; break;
			case "=": if(gameVariable != variableObj.value) return; break;
			case "<=": if(gameVariable > variableObj.value) return; break;
			case "<": if(gameVariable >= variableObj.value) return;
		}
	}
	this.earnAchievement(achievement._id);
};
//-----------------------------------------------------------------------------
// Determine if need to check for criteria?
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.needCriteriaCheck = function(achievement) {
	return !achievement._earned && achievement.hasRequirements();
};
//-----------------------------------------------------------------------------
// Check Achievement Currency Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementCurrencyCriteria = function() {
	for(const id of this._achievementTypes.currency) {
		const achievement = this.getAchievementByID(id);
		if($gameParty.gold() >= achievement._requirements.currency) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Steps Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementStepsCriteria = function() {
	for(const id of this._achievementTypes.steps) {
		const achievement = this.getAchievementByID(id);
		if($gameParty.steps() >= achievement._requirements.steps) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Saves Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementSavesCriteria = function() {
	for(const id of this._achievementTypes.saves) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.saveCount() >= achievement._requirements.saves) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Battles Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementBattlesCriteria = function() {
	for(const id of this._achievementTypes.battles) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.battleCount() >= achievement._requirements.battles) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Wins Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementWinsCriteria = function() {
	for(const id of this._achievementTypes.wins) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.winCount() >= achievement._requirements.wins) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Escapes Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementEscapesCriteria = function() {
	for(const id of this._achievementTypes.escapes) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.escapeCount() >= achievement._requirements.escapes) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Playtime Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementPlaytimeCriteria = function() {
	for(const id of this._achievementTypes.playtime) {
		const achievement = this.getAchievementByID(id);
		if($gameSystem.playtime() >= achievement._requirements.playtime) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Achievepts Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementAchieveptsCriteria = function() {
	for(const id of this._achievementTypes.achievepts) {
		const achievement = this.getAchievementByID(id);
		if($cgmz.countEarnedAchievementPoints() >= achievement._requirements.achievepts) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Achievetotal Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementAchievetotalCriteria = function() {
	for(const id of this._achievementTypes.achievetotal) {
		const achievement = this.getAchievementByID(id);
		if($cgmz.countEarnedAchievements() >= achievement._requirements.achievetotal) {
			this.checkAchievementForEarn(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Check Achievement Encyclopedia Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementEncyclopediaCriteria = function() {
	this._achievementTypes.encyclopedia.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		if(achievement._requirements.encyclopediatotal > 0 && $cgmz.getEncyclopediaTotalPercent() >= achievement._requirements.encyclopediatotal) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediabestiary > 0 && $cgmz.getEncyclopediaBestiaryPercent() >= achievement._requirements.encyclopediabestiary) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediaitems > 0 && $cgmz.getEncyclopediaItemsPercent() >= achievement._requirements.encyclopediaitems) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediaarmors > 0 && $cgmz.getEncyclopediaArmorsPercent() >= achievement._requirements.encyclopediaarmors) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediaweapons > 0 && $cgmz.getEncyclopediaWeaponsPercent() >= achievement._requirements.encyclopediaweapons) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediaskills > 0 && $cgmz.getEncyclopediaSkillsPercent() >= achievement._requirements.encyclopediaskills) {
			this.checkAchievementForEarn(achievement);
		}
		else if(achievement._requirements.encyclopediastates > 0 && $cgmz.getEncyclopediaStatesPercent() >= achievement._requirements.encyclopediastates) {
			this.checkAchievementForEarn(achievement);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Items Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementItemsCriteria = function() {
	this._achievementTypes.items.forEach(function(id) {
		const achievement = this.getAchievementByID(id);
		const criteria = achievement._requirements;
		for(const itemObj of criteria.items) {
			const item = $cgmzTemp.lookupItem(itemObj.type, itemObj.id);
			if($gameParty.numItems(item) >= itemObj.amt) {
				this.checkAchievementForEarn(achievement);
				return;
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Switches Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementSwitchesCriteria = function() {
	this._achievementTypes.switches.forEach(function(id) {
		const achievement = this.getAchievementByID(id);
		const criteria = achievement._requirements;
		for(const switchObj of criteria.switches) {
			if(switchObj.value == $gameSwitches.value(switchObj.id)) {
				this.checkAchievementForEarn(achievement);
				return;
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Variables Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementVariablesCriteria = function() {
	this._achievementTypes.variables.forEach(function(id) {
		const achievement = this.getAchievementByID(id);
		const criteria = achievement._requirements;
		for(const variableObj of criteria.variables) {
			const gameVariable = $gameVariables.value(variableObj.id);
			if(variableObj.operator === ">") {
				if(gameVariable > variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === ">=") {
				if(gameVariable >= variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "=") {
				if(gameVariable === variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "<=") {
				if(gameVariable <= variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
			else if(variableObj.operator === "<") {
				if(gameVariable < variableObj.value) {
					this.checkAchievementForEarn(achievement);
					return;
				}
			}
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Check Achievement Professions Criteria
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.checkAchievementProfessionCriteria = function() {
	this._achievementTypes.professions.forEach(function(id) {
		var achievement = this.getAchievementByID(id);
		var needCheck = true;
		for(var i = 0; i < achievement._requirements.professions.length; i++) {
			var profession = $cgmz.getProfession(achievement._requirements.professions[i].name);
			if(achievement._requirements.professions[i].level > profession._level) {
				needCheck = false;
			}
		}
		if(needCheck) this.checkAchievementForEarn(achievement);
	}, this);
};
//-----------------------------------------------------------------------------
// Get achievement array
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievements = function() {
	return this._achievements;
};
//-----------------------------------------------------------------------------
// Get achievement by ID, returns undefined if no achievement found
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievementByID = function(id) {
	return this._achievements.find(achievement => achievement._id === id);
};
//-----------------------------------------------------------------------------
// Get achievement by name, returns undefined if no achievement found
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAchievementByName = function(name) {
	return this._achievements.find(achievement => achievement.getName() === name);
};
//-----------------------------------------------------------------------------
// Get achievement earned count
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countEarnedAchievements = function() {
	return this._achievetotal;
};
//-----------------------------------------------------------------------------
// Get achievement point count
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.countEarnedAchievementPoints = function() {
	return this._achievepts;
};
//-----------------------------------------------------------------------------
// Achievements have points?
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.usingAchievementPoints = function() {
	return this._usingAchievementPoints;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Adds plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Achievements_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Achievements", "Reinitialize", this.pluginCommandAchievementsReinitialize);
	PluginManager.registerCommand("CGMZ_Achievements", "Call Scene", this.pluginCommandAchievementsCallScene);
	PluginManager.registerCommand("CGMZ_Achievements", "Earn Achievement By Name", this.pluginCommandAchievementsEarnByName);
	PluginManager.registerCommand("CGMZ_Achievements", "Earn Achievement By ID", this.pluginCommandAchievementsEarnByID);
	PluginManager.registerCommand("CGMZ_Achievements", "Change Description", this.pluginCommandAchievementsChangeDescription);
};
//-----------------------------------------------------------------------------
// Earn an achievement by its name
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsEarnByName = function(args) {
	const achievement = $cgmz.getAchievementByName(args.name);
	if(achievement) {
		$cgmz.earnAchievement(achievement._id);
	}
};
//-----------------------------------------------------------------------------
// Earn an achievement by its ID
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsEarnByID = function(args) {
	const achievement = $cgmz.getAchievementByID(Number(args.id));
	if(achievement) {
		$cgmz.earnAchievement(achievement._id);
	}
};
//-----------------------------------------------------------------------------
// Reinitialize the achievement data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsReinitialize = function() {
	for(let i = 0; i < $cgmz._achievements.length; i++) {
		if(!$cgmz._achievements[i].isEarned()) {
			$cgmz._achievements[i] = new CGMZ_Achievement(CGMZ.Achievements.Achievements[i], i+1)
		} else {
			$cgmz._achievements[i] = new CGMZ_Achievement(CGMZ.Achievements.Achievements[i], i+1)
			$cgmz._achievements[i]._earned = true;
		}
	}
};
//-----------------------------------------------------------------------------
// Call the Achievements Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsCallScene = function() {
	SceneManager.push(CGMZ_Scene_Achievements);
};
//-----------------------------------------------------------------------------
// Change an achievement description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAchievementsChangeDescription = function(args) {
	const achievement = (args.name) ? $cgmz.getAchievementByName(args.name) : $cgmz.getAchievementByID(Number(args.id));
	if(achievement) {
		const pre = JSON.parse(args["Pre Description"]);
		const post = JSON.parse(args["Post Description"]);
		achievement.setDescriptions(pre, post);
	}
};
//=============================================================================
// CGMZ_Scene_Achievements
//-----------------------------------------------------------------------------
// Scene that controls achievement display windows.
// Call with SceneManager.push(CGMZ_Scene_Achievements);
//=============================================================================
function CGMZ_Scene_Achievements() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Achievements.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Achievements.prototype.constructor = CGMZ_Scene_Achievements;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create achievement windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createListWindow();
	this.createTotalsWindow();
	this.createAchievementWindow();
};
//-----------------------------------------------------------------------------
// Create achievement list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Achievement_Window_List(rect);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.activate();
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.listWindowRect = function() {
	const x = 0;
	const y = this.mainAreaTop();
	const width = Graphics.boxWidth / 3;
	const lines = 1 + ($cgmz.usingAchievementPoints())*1;
	const height = Graphics.boxHeight - y - this.calcWindowHeight(lines, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create achievement totals window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createTotalsWindow = function() {
	const rect = this.totalsWindowRect();
    this._totalsWindow = new CGMZ_Achievement_Window_Totals(rect);
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Get totals window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.totalsWindowRect = function() {
	const x = 0;
	const y = this._listWindow.y + this._listWindow.height;
	const width = this._listWindow.width;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create achievement window
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.createAchievementWindow = function() {
	const rect = this.achievementWindowRect();
    this._achievementWindow = new CGMZ_Achievement_Window_Display(rect);
	this._listWindow.setHelpWindow(this._achievementWindow);
	this._achievementWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
	this._achievementWindow.deactivate();
    this.addWindow(this._achievementWindow);
};
//-----------------------------------------------------------------------------
// Get achievement window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.achievementWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - x;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.onListOk = function() {
	this._achievementWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Achievements.prototype.onDisplayCancel = function() {
    this._achievementWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMZ_Achievement_Window_List
//-----------------------------------------------------------------------------
// Selectable window for choosing an achievement in a list.
// Will not show hidden achievements.
//=============================================================================
function CGMZ_Achievement_Window_List() {
    this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_List.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Achievement_Window_List.prototype.constructor = CGMZ_Achievement_Window_List;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
    this.select(0);
};
//-----------------------------------------------------------------------------
// Max achievements to be shown
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Currently selected achievement
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Determine if achievement is enabled
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.isEnabled = function(achievement) {
    return (achievement && achievement.isEarned());
};
//-----------------------------------------------------------------------------
// Refresh window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make list of achievements
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.makeItemList = function() {
    this._data = [];
	for(const achievement of $cgmz.getAchievements()) {
		if(!achievement.isSecret() || achievement.isEarned() || CGMZ.Achievements.ShowSecretAchievements) {
			this._data.push(achievement);
		}
	}
};
//-----------------------------------------------------------------------------
// Draw achievement names
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.drawItem = function(index) {
    const achievement = this._data[index];
    const rect = this.itemRectWithPadding(index);
	const name = (achievement.isSecret() && !achievement.isEarned()) ? CGMZ.Achievements.SecretText : achievement.getName();
    this.changePaintOpacity(this.isEnabled(achievement));
	this.drawText(name, rect.x, rect.y, rect.width, CGMZ.Achievements.ListWindowAlignment);
};
//-----------------------------------------------------------------------------
// Update helper window
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_List.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};
//=============================================================================
// CGMZ_Achievement_Window_Totals
//-----------------------------------------------------------------------------
// Window displaying total achievements earned and points (if applicable)
//=============================================================================
function CGMZ_Achievement_Window_Totals() {
    this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_Totals.prototype = Object.create(Window_Base.prototype);
CGMZ_Achievement_Window_Totals.prototype.constructor = CGMZ_Achievement_Window_Totals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Totals.prototype.refresh = function() {
    this.contents.clear();
	const earned = $cgmz.countEarnedAchievements();
	let text = CGMZ.Achievements.EarnedCountText + earned;
    this.drawText(text, 0, 0, this.contents.width, CGMZ.Achievements.TotalWindowAlignment);
	if($cgmz.usingAchievementPoints()) {
		const points = $cgmz.countEarnedAchievementPoints();
		text = CGMZ.Achievements.PointsText + points;
		this.drawText(text, 0, this.lineHeight(), this.contents.width, CGMZ.Achievements.TotalWindowAlignment);
	}
};
//=============================================================================
// CGMZ_Achievement_Window_Display
//-----------------------------------------------------------------------------
// Window displaying total achievements earned and points (if applicable)
//=============================================================================
function CGMZ_Achievement_Window_Display() {
    this.initialize.apply(this, arguments);
}
CGMZ_Achievement_Window_Display.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Achievement_Window_Display.prototype.constructor = CGMZ_Achievement_Window_Display;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Achievements.ScrollWait, CGMZ.Achievements.ScrollSpeed, CGMZ.Achievements.AutoScroll, CGMZ.Achievements.ScrollDeceleration);
	this._achievement = null;
};
//-----------------------------------------------------------------------------
// Set the achievement to be displayed
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.setItem = function(achievement) {
	if(this._achievement === achievement) return;
	this._achievement = achievement;
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.refresh = function() {
	if(!this._achievement) return;
	this.setupWindowForNewEntry();
	const achievement = this._achievement;
	const achieveName = (achievement.isSecret() && !achievement.isEarned()) ? CGMZ.Achievements.SecretText : achievement.getName();
	this.drawText(achieveName, 0, 0, this.contents.width, 'center');
	let y = this.lineHeight();
	if(achievement.isEarned()) {
		this.drawStandardLine(CGMZ.Achievements.EarnedText, achievement._earndate, 0, y);
	} else {
		this.drawText(CGMZ.Achievements.UnearnedText, 0, y, this.contents.width, 'left');
	}
	if(achievement._difficulty) {
		y += this.lineHeight();
		this.drawStandardLine(CGMZ.Achievements.DifficultyText, achievement._difficulty, 0, y);
	}
	if(achievement._points) {
		y += this.lineHeight();
		this.drawStandardLine(CGMZ.Achievements.PointsText, achievement._points, 0, y);
	}
	if(achievement._predesc && !achievement.isEarned()) {
		y += this.lineHeight();
		y += this.drawAchievementDescription(achievement._predesc, y);
	} else if(achievement._postdesc && achievement.isEarned()) {
		y += this.lineHeight();
		y += this.drawAchievementDescription(achievement._postdesc, y);
	}
	const currencyColor1 = ColorManager.textColor(CGMZ.Achievements.CurrencyGaugeColor1);
	const currencyColor2 = ColorManager.textColor(CGMZ.Achievements.CurrencyGaugeColor2);
	const itemGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.ItemGaugeColor1);
	const itemGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.ItemGaugeColor2);
	const switchVarGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.SwitchVarGaugeColor1);
	const switchVarGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.SwitchVarGaugeColor2);
	const genericGaugeColor1 = ColorManager.textColor(CGMZ.Achievements.GenericGaugeColor1);
	const genericGaugeColor2 = ColorManager.textColor(CGMZ.Achievements.GenericGaugeColor2);
	// Draw criteria
	if(this.canShowCriteria(achievement)) {
		const req = achievement._requirements;
		this.drawLabel(CGMZ.Achievements.RequirementText, 0, y, 'center');
		y += this.lineHeight();
		y = this.drawCriteriaProgress(0, y, $gameParty.gold(), req.currency, currencyColor1, currencyColor2, TextManager.currencyUnit, achievement);
		y = this.drawCriteriaProgress(0, y, $gameParty.steps(), req.steps, genericGaugeColor1, genericGaugeColor2, "Steps", achievement);
		y = this.drawCriteriaProgress(0, y, $gameSystem.saveCount(), req.saves, genericGaugeColor1, genericGaugeColor2, "Saves", achievement);
		y = this.drawCriteriaProgress(0, y, $gameSystem.battleCount(), req.battles, genericGaugeColor1, genericGaugeColor2, "Battles", achievement);
		y = this.drawCriteriaProgress(0, y, $gameSystem.winCount(), req.wins, genericGaugeColor1, genericGaugeColor2, "Wins", achievement);
		y = this.drawCriteriaProgress(0, y, $gameSystem.escapeCount(), req.escapes, genericGaugeColor1, genericGaugeColor2, "Escapes", achievement);
		y = this.drawCriteriaProgress(0, y, $cgmz.countEarnedAchievements(), req.achievetotal, genericGaugeColor1, genericGaugeColor2, "Achievements", achievement);
		y = this.drawCriteriaProgress(0, y, $cgmz.countEarnedAchievementPoints(), req.achievepts, genericGaugeColor1, genericGaugeColor2, "Points", achievement);
		if(Imported.CGMZ_Encyclopedia) {
			y = this.drawCriteriaProgress(0, y, $cgmz.getEncyclopediaTotalPercent(), req.encyclopediatotal, genericGaugeColor1, genericGaugeColor2, "% Enc. Total", achievement);
			y = this.drawCriteriaProgress(0, y, $cgmz.getEncyclopediaBestiaryPercent(), req.encyclopediabestiary, genericGaugeColor1, genericGaugeColor2, "% Enc. Bestiary", achievement);
			y = this.drawCriteriaProgress(0, y, $cgmz.getEncyclopediaItemsPercent(), req.encyclopediaitems, genericGaugeColor1, genericGaugeColor2, "% Enc. Items", achievement);
			y = this.drawCriteriaProgress(0, y, $cgmz.getEncyclopediaWeaponsPercent(), req.encyclopediaweapons, genericGaugeColor1, genericGaugeColor2, "% Enc. Weapons", achievement);
			y = this.drawCriteriaProgress(0, y, $cgmz.getEncyclopediaArmorsPercent(), req.encyclopediaarmors, genericGaugeColor1, genericGaugeColor2, "% Enc. Armors", achievement);
			y = this.drawCriteriaProgress(0, y, $cgmz.getEncyclopediaSkillsPercent(), req.encyclopediaskills, genericGaugeColor1, genericGaugeColor2, "% Enc. Skills", achievement);
			y = this.drawCriteriaProgress(0, y, $cgmz.getEncyclopediaStatesPercent(), req.encyclopediastates, genericGaugeColor1, genericGaugeColor2, "% Enc. States", achievement);
		}
		for(let i = 0; i < req.professions.length; i++) {
			const name = req.professions[i].name;
			const profession = $cgmz.getProfession(name);
			y = this.drawCriteriaProgress(0, y, profession._level, req.professions[i].level, genericGaugeColor1, genericGaugeColor2, " " + name + " Level", achievement);
		}
		if(req.playtime) {
			let max = $gameSystem.playtime();
			if(achievement.isEarned() || max > req.playtime) {
				max = req.playtime;
			}
			const timeArray1 = $cgmzTemp.approximateTimeValue(req.playtime);
			const timeArray2 = $cgmzTemp.approximateTimeValue(max);
			let descriptor = timeArray2[0] + " " + timeArray2[1] + " / " + timeArray1[0] + " " + timeArray1[1] + " Played";
			this.drawGauge(0, y, this.contents.width, genericGaugeColor1, genericGaugeColor2, max, req.playtime, descriptor);
			y += this.lineHeight();
		}
		y = this.drawCriteriaItems(achievement.isEarned(), req.items, 0, y, itemGaugeColor1, itemGaugeColor2);
		y = this.drawCriteriaSwitches(achievement.isEarned(), req.switches, 0, y, switchVarGaugeColor1, switchVarGaugeColor2);
		y = this.drawCriteriaVariables(achievement.isEarned(), req.variables, 0, y, switchVarGaugeColor1, switchVarGaugeColor2);
	}
	if(this.canShowRewards(achievement)) {
		const rewards = achievement._rewards;
		this.drawLabel(CGMZ.Achievements.RewardText, 0, y, 'center');
		y += this.lineHeight();
		if(rewards.currency) {
			const space = CGMZ.Achievements.CurrencyUnitSpace ? " " : "";
			this.drawText(rewards.currency + space + TextManager.currencyUnit, 0, y, this.contents.width, 'left');
			y += this.lineHeight();
		}
		y = this.drawRewardsItems(rewards.items, 0, y);
		y = this.drawRewardsSwitchesAndVariables(rewards.switches, 0, y);
		y = this.drawRewardsSwitchesAndVariables(rewards.variables, 0, y);
	}
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw a standard line of 1 label + 1 piece of text
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawStandardLine = function(label, text, x, y) {
	this.drawLabel(label, x, y);
	x = this.textWidth(label);
	this.drawText(text, x, y, this.contents.width - x, "left");
};
//-----------------------------------------------------------------------------
// Draw label / header text
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawLabel = function(label, x, y, alignment = "left") {
	this.changeTextColor(ColorManager.textColor(CGMZ.Achievements.LabelColor));
	this.drawText(label, x, y, this.contents.width - x, alignment);
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Draw criteria progress with gauge
// Returns the line counter + 1 (this function draws 1 line when called)
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaProgress = function(x, y, numerator, denominator, color1, color2, criteriaText, achievement) {
	if(denominator <= 0) return y;
	let max = numerator;
	if(achievement.isEarned() || numerator > denominator) {
		max = denominator;
	}
	const descriptor = max + " / " + denominator + " " + criteriaText;
	this.drawGauge(x, y, this.contents.width - x, color1, color2, max, denominator, descriptor);
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw criteria items progress
// Returns the line counter + amount of lines drawn via this function
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaItems = function(earned, itemArray, x, y, color1, color2) {
	for(const criteriaObj of itemArray) {
		const item = $cgmzTemp.lookupItem(criteriaObj.type, criteriaObj.id);
		const denominator = criteriaObj.amt;
		let max = $gameParty.numItems(item);
		if(earned || max > denominator) max = denominator;
		const descriptor = max + " / " + criteriaObj.amt;
		this.drawGauge(x, y, this.contents.width - x, color1, color2, max, denominator, descriptor, item);
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw criteria switches progress
// Returns the line counter + amount of lines drawn via this function
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaSwitches = function(earned, switchArray, x, y, color1, color2) {
	for(const switchObj of switchArray) {
		const switchval = $gameSwitches.value(switchObj.id);
		const max = (earned) ? 1 : (switchval == switchObj.value) ? 1 : 0;
		const descriptor = switchObj.description + " " + max + " / 1";
		this.drawGauge(x, y, this.contents.width - x, color1, color2, max, 1, descriptor);
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw criteria variables progress
// Due to so many options for variables and not really making sense for gauges,
// it treats it like a switch.
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawCriteriaVariables = function(earned, variableArray, x, y, color1, color2) {
	for(const variableObj of variableArray) {
		let max = 0;
		let denominator = 1;
		let descriptor = "";
		if(variableObj.operator !== ">" && variableObj.operator !== ">=") {
			max = 0
			if(earned || ($gameVariables.value(variableObj.id) <= variableObj.value && variableObj.operator !== "=") ||
			   (variableObj.operator === "=" && $gameVariables.value(variableObj.id) === variableObj.value)) {
				max = 1;
			}
			denominator = 1;
			descriptor = variableObj.description + " " + max + " / 1";
		}
		else {
			denominator = (variableObj.operator === '>') ? variableObj.value + 1 : variableObj.value;
			max = $gameVariables.value(variableObj.id);
			if(earned || max > denominator) {
				max = denominator;
			}
			descriptor = variableObj.description + " " + max + " / " + denominator;
		}
		this.drawGauge(x, y, this.contents.width - x, color1, color2, max, denominator, descriptor);
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw item rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawRewardsItems = function(itemArray, x, y, width) {
	for(const rewardObj of itemArray) {
		const item = $cgmzTemp.lookupItem(rewardObj.type, rewardObj.id)
		const descriptor = rewardObj.amt + "x ";
		this.drawText(descriptor, x, y, this.contents.width, 'left');
		const amtWidth = this.textWidth(descriptor);
		this.drawItemName(item, amtWidth, y, this.contents.width - amtWidth);
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw switch rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawRewardsSwitchesAndVariables = function(objArray, x, y) {
	for(const obj of objArray) {
		this.drawText(obj.description, x, y, this.contents.width, 'left');
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Determine if the window should show criteria
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.canShowCriteria = function(achievement) {
	if(achievement.isEarned() && !CGMZ.Achievements.ShowCriteriaAfterCompletion) return false;
	if(achievement.isSecret() && !achievement.isEarned()) return false;
	return achievement.hasRequirements();
};
//-----------------------------------------------------------------------------
// Determine if the window should show rewards
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.canShowRewards = function(achievement) {
	if(achievement.isSecret() && !achievement.isEarned()) return false;
	return achievement.hasRewards();
};
//-----------------------------------------------------------------------------
// Draw achievement description - returns y-value of line below last line drawn
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawAchievementDescription = function(description, y) {
	this.drawLabel(CGMZ.Achievements.DescriptionText, 0, y);
	const xOffset = this.textWidth(CGMZ.Achievements.DescriptionText);
	const outputHeight = this.CGMZ_drawText(description, 0, xOffset, y, this.contents.width, 'left');
	return outputHeight;
};
//-----------------------------------------------------------------------------
// Draw a gauge
//-----------------------------------------------------------------------------
CGMZ_Achievement_Window_Display.prototype.drawGauge = function(x, y, width, color1, color2, numerator, denominator, descriptor, item = null) {
	const gaugeHeight = 12;
	const gaugeRect = new Rectangle(x, y + this.lineHeight() - gaugeHeight, width, gaugeHeight);
	const rate = (denominator !== 0) ? numerator/denominator : 0;
	this.CGMZ_drawGauge(gaugeRect, rate, color1, color2);
	const padding = 10;
	this.drawText(descriptor, x + padding, y, width);
	if(item) {
		const itemX = x + padding + this.textWidth(descriptor + " ");
		this.drawItemName(item, itemX, y, width-x);
	}
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Automatic tracking for gold, steps, and items
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have currency criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    alias_CGMZ_Achievements_GameParty_gainGold.call(this, amount);
	if(amount > 0) $cgmz.checkAchievementCurrencyCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have steps criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function() {
	alias_CGMZ_Achievements_GameParty_increaseSteps.call(this);
	$cgmz.checkAchievementStepsCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have items criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    alias_CGMZ_Achievements_GameParty_gainItem.call(this, item, amount, includeEquip);
	if(amount > 0) $cgmz.checkAchievementItemsCriteria();
};
//=============================================================================
// Game_System
//-----------------------------------------------------------------------------
// Automatic tracking for battles, wins, escapes, saves
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have battles criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleStart = Game_System.prototype.onBattleStart;
Game_System.prototype.onBattleStart = function() {
    alias_CGMZ_Achievements_GameSystem_onBattleStart.call(this);
	$cgmz.checkAchievementBattlesCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have wins criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleWin = Game_System.prototype.onBattleWin;
Game_System.prototype.onBattleWin = function() {
    alias_CGMZ_Achievements_GameSystem_onBattleWin.call(this);
	$cgmz.checkAchievementWinsCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have escapes criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBattleEscape = Game_System.prototype.onBattleEscape;
Game_System.prototype.onBattleEscape = function() {
	alias_CGMZ_Achievements_GameSystem_onBattleEscape.call(this);
    $cgmz.checkAchievementEscapesCriteria();
};
//-----------------------------------------------------------------------------
// Alias: Check achievements that have saves criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSystem_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
	alias_CGMZ_Achievements_GameSystem_onBeforeSave.call(this);
    $cgmz.checkAchievementSavesCriteria();
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Automatic tracking for playtime (Using Scene Map so playtime achievements do
// not update in battle or mid-scene
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have playtime criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_SceneMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	alias_CGMZ_Achievements_SceneMap_update.call(this);
	if(Graphics.frameCount % 60 == 0) $cgmz.checkAchievementPlaytimeCriteria();
};
//=============================================================================
// Game_Switches
//-----------------------------------------------------------------------------
// Automatic tracking for switches
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have switch criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameSwitches_onChange = Game_Switches.prototype.onChange;
Game_Switches.prototype.onChange = function() {
    alias_CGMZ_Achievements_GameSwitches_onChange.call(this);
	$cgmz.checkAchievementSwitchesCriteria();
};
//=============================================================================
// Game_Variables
//-----------------------------------------------------------------------------
// Automatic tracking for variables
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Check achievements that have variable criteria
//-----------------------------------------------------------------------------
const alias_CGMZ_Achievements_GameVariables_onChange = Game_Variables.prototype.onChange;
Game_Variables.prototype.onChange = function() {
    alias_CGMZ_Achievements_GameVariables_onChange.call(this);
	$cgmz.checkAchievementVariablesCriteria();
};