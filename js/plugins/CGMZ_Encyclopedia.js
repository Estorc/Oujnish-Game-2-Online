/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/encyclopedia/
 * @target MZ
 * @plugindesc Creates an encyclopedia scene for your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.1.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.0.0
 * ----------------------------------------------------------------------------
 * Description: This plugin creates a powerful encyclopedia for your game,
 * with default categories including bestiary, items, armors, weapons, skills,
 * and states. It can also handle as many custom categories as desired with
 * their own custom entries.
 * ----------------------------------------------------------------------------
 * Documentation:
 * To easily call the encyclopedia from the main menu, use CGMZ Menu Command 
 * Window and use the following script in its parameters:
 * SceneManager.push(CGMZ_Scene_Encyclopedia);
 * 
 * This plugin supports the following Plugin Commands:
 * Discover Enemy: This command discovers the enemy with the ID provided
 * Discover Item: This command discovers the item with the ID provided
 * Discover Weapon: This command discovers the weapon with the ID provided
 * Discover Armor: This command discovers the armor with the ID provided
 * Discover Skill: This command discovers the skill with the ID provided
 * Discover State: This command discovers the state with the ID provided
 * Discover Custom: This command discovers the custom entry with the ID and 
 * symbol provided
 *
 * Call Scene: This command will call the encyclopedia scene
 * * to call the scene with JS, use SceneManager.push(CGMZ_Scene_Encyclopedia);
 *
 * Reinitialize: This command reinitializes ALL encyclopedia data as if you
 * had started a new game. This is useful for testing with saved games as new
 * database entries are not automatically recognized until initialization.
 *
 * Custom categories must be manually tracked. Default categories (bestiary,
 * item, weapon, armor, skill, state) will all be automatically tracked if
 * included except for some uncommon circumstances.
 *
 * This plugin supports the following notetags:
 * <cgmzdesc:[description]> - Puts a "note" in the encyclopedia display page
 *
 * <cgmzencyclopediahide> - Does not include the item in the encyclopedia
 *
 * Large Icon Multiplier Option Help:
 * This option changes the size of the icon displayed by default for items,
 * armors, weapons, states, and skills. It displaces text to the right based
 * on its height. Here are some common multiplier sizes that play nice with
 * text:
 * Lines displaced: 1, use multiplier size: 1.1
 * Lines displaced: 2, use multiplier size: 2.2
 * Lines displaced: 3, use multiplier size: 3.3
 *
 * Version History:
 * 1.0 - Initial release
 *
 * 1.1.0:
 * - Added additional checks during battle to discover enemies
 *
 * 1.1.1:
 * - Fixed totals window being too large in some cases
 * - Fixed list window items having no padding
 * - Fixed bug with the list window not scrolling up after cancel
 *
 * 1.1.2:
 * - This plugin now initiates a check for CGMZ Achievements after discovery
 *
 * @command DiscoverEnemy
 * @text Discover Enemy
 * @desc Discovers an enemy manually in the encyclopedia
 *
 * @arg id
 * @type enemy
 * @text ID
 * @desc The id number of the enemy to discover
 * @default 1
 *
 * @command DiscoverItem
 * @text Discover Item
 * @desc Discovers an item manually in the encyclopedia
 *
 * @arg id
 * @type item
 * @text ID
 * @desc The id number of the item to discover
 * @default 1
 *
 * @command DiscoverArmor
 * @text Discover Armor
 * @desc Discovers an armor manually in the encyclopedia
 *
 * @arg id
 * @type armor
 * @text ID
 * @desc The id number of the armor to discover
 * @default 1
 *
 * @command DiscoverWeapon
 * @text Discover Weapon
 * @desc Discovers a weapon manually in the encyclopedia
 *
 * @arg id
 * @type weapon
 * @text ID
 * @desc The id number of the weapon to discover
 * @default 1
 *
 * @command DiscoverSkill
 * @text Discover Skill
 * @desc Discovers a skill manually in the encyclopedia
 *
 * @arg id
 * @type skill
 * @text ID
 * @desc The id number of the skill to discover
 * @default 1
 *
 * @command DiscoverState
 * @text Discover State
 * @desc Discovers a state manually in the encyclopedia
 *
 * @arg id
 * @type state
 * @text ID
 * @desc The id number of the state to discover
 * @default 1
 *
 * @command DiscoverCustom
 * @text Discover Custom
 * @desc Discovers a custom entry in the encyclopedia
 *
 * @arg id
 * @type number
 * @text ID
 * @desc The id number of the entry to discover
 * @default 1
 *
 * @arg symbol
 * @type text
 * @text Symbol
 * @desc The Category Symbol of the entry to discover
 * @default 
 *
 * @command Call Scene
 * @text Call Scene
 * @desc Calls the Encyclopedia Scene
 *
 * @arg callScene
 * @type boolean
 * @text Call Scene
 * @desc Calls the Encyclopedia scene if true. No functionality if false.
 * @default true
 *
 * @command Reinitialize
 * @text Reinitialize
 * @desc Resets all of the encyclopedia data. Use for saved games to recognize newly added data
 *
 * @arg reinitialize
 * @type boolean
 * @text Reinitialize
 * @desc Resets all of the encyclopedia data as if you started a new game.
 * @default true
 *
 * @param Category Options
 * 
 * @param Include Bestiary
 * @type boolean
 * @desc Determines if the scene should include the bestiary part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Items
 * @type boolean
 * @desc Determines if the scene should include the items part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Armors
 * @type boolean
 * @desc Determines if the scene should include the armors part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Weapons
 * @type boolean
 * @desc Determines if the scene should include the weapons part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include Skills
 * @type boolean
 * @desc Determines if the scene should include the skills part of the encyclopedia
 * @default true
 * @parent Category Options
 * 
 * @param Include States
 * @type boolean
 * @desc Determines if the scene should include the states part of the encyclopedia
 * @default true
 * @parent Category Options
 *
 * @param Categories
 * @type struct<Category>[]
 * @default ["{\"Category Name\":\"Bestiary\",\"Category Symbol\":\"bestiary\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Items\",\"Category Symbol\":\"items\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Armors\",\"Category Symbol\":\"armors\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Weapons\",\"Category Symbol\":\"weapons\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"Skills\",\"Category Symbol\":\"skills\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}","{\"Category Name\":\"States\",\"Category Symbol\":\"states\",\"Category Display Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\",\"Category Enable Requirements\":\"{\\\"Item\\\":\\\"0\\\",\\\"Switch\\\":\\\"0\\\"}\"}"]
 * @desc Categories for the encyclopedia to select from in the encyclopedia scene.
 * @parent Category Options
 *
 * @param Custom Entry Options
 *
 * @param Custom Entries
 * @parent Custom Entry Options
 * @type struct<Custom>[]
 * @default []
 * @desc Custom entries not already covered in the encyclopedia
 *
 * @param Encyclopedia Scene Options
 *
 * @param Unknown Entry
 * @desc Text to put in the list window for an unknown entry
 * @default ? ? ? ? ?
 * @parent Encyclopedia Scene Options
 *
 * @param Unknown Entry Display
 * @desc Text to put in the display window for an unknown entry
 * @default This has not yet been discovered.
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Text
 * @desc Text to put for the total completion %
 * @default Total
 * @parent Encyclopedia Scene Options
 *
 * @param Total Window Rounding
 * @desc How many decimals to round to.
 * @type number
 * @min 1
 * @default 2
 * @parent Encyclopedia Scene Options
 *
 * @param Number Entries
 * @type boolean
 * @desc Number each entry in the list window?
 * @default true
 * @parent Encyclopedia Scene Options
 *
 * @param Display Window Options
 *
 * @param Scroll Wait
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Speed
 * @parent Display Window Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * @default 1
 *
 * @param Scroll Deceleration
 * @parent Display Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Display Window Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Large Icon Multiplier
 * @desc Determines the factor to increase the icon size by for a large icon
 * @type number
 * @decimals 1
 * @min 0.1
 * @default 3.3
 * @parent Display Window Options
 *
 * @param Text Options
 *
 * @param Yes Text
 * @desc Word to use for a yes answer
 * @default Yes
 * @parent Text Options
 *
 * @param No Text
 * @desc Word to use for a no answer
 * @default No
 * @parent Text Options
 *
 * @param Price Text
 * @desc Text to show when describing the price
 * @default Price
 * @parent Text Options
 *
 * @param No Price Text
 * @desc Text to show when describing the price when the item is unsellable
 * @default Not for sale
 * @parent Text Options
 *
 * @param Key Item Text
 * @desc Text to show when describing a key item or not key item
 * @default Key Item
 * @parent Text Options
 *
 * @param Possession Text
 * @desc Text to show when describing how many of an item the player has
 * @default Possession
 * @parent Text Options
 *
 * @param Equip Type Text
 * @desc Text to show when describing what slot the equipment goes in (equip type)
 * @default Equip Slot
 * @parent Text Options
 *
 * @param Armor Type Text
 * @desc Text to show when describing what type of armor it is (armor type)
 * @default Armor Type
 * @parent Text Options
 *
 * @param No Armor Type Text
 * @desc Text to show when armor has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Weapon Type Text
 * @desc Text to show when describing what type of weapon it is (weapon type)
 * @default Weapon Type
 * @parent Text Options
 *
 * @param No Weapon Type Text
 * @desc Text to show when weapon has no type in database
 * @default None
 * @parent Text Options
 *
 * @param Skill Type Text
 * @desc Text to show when describing what type of skill it is (skill type)
 * @default Skill Type
 * @parent Text Options
 *
 * @param No Skill Type Text
 * @desc Text to show when skill has no type in database
 * @default Basic
 * @parent Text Options
 *
 * @param Drops Text
 * @desc Text to show when describing rewards from an enemy
 * @default Drops
 * @parent Text Options
 *
 * @param Show Drop Chances
 * @desc Determine whether drop chances are shown in the encyclopedia
 * @type boolean
 * @default true
 * @parent Text Options
 *
 * @param Drop Chance Text
 * @desc Text to show when describing drop chance for an item
 * @default Chance
 * @parent Text Options
 *
 * @param Sketch Text
 * @desc Text to show when describing a sketch for an item
 * @default Sketch
 * @parent Text Options
 *
 * @param Note Text
 * @desc Text to describe what is found in meta notes
 * @default Note
 * @parent Text Options
 *
 * @param Success Rate Text
 * @desc Text to describe success rate of an item
 * @default Success Rate
 * @parent Text Options
 *
 * @param Consumable Text
 * @desc Text to describe whether an item is consumable
 * @default Consumable
 * @parent Text Options
 *
 * @param Effects Text
 * @desc Text to describe effects
 * @default Item Effects
 * @parent Text Options
 *
 * @param HP Effect Text
 * @desc Text to describe when an item has an HP effect
 * @default HP Effect
 * @parent Text Options
 *
 * @param MP Effect Text
 * @desc Text to describe when an item has an MP effect
 * @default MP Effect
 * @parent Text Options
 *
 * @param TP Effect Text
 * @desc Text to describe when an item has a TP effect
 * @default TP Effect
 * @parent Text Options
 *
 * @param Add State Text
 * @desc Text to describe when an item has an add state effect
 * @default Causes
 * @parent Text Options
 *
 * @param Remove State Text
 * @desc Text to describe when an item has a remove state effect
 * @default Cures
 * @parent Text Options
 *
 * @param Add Buff Text
 * @desc Text to describe when an item has a buff effect
 * @default Buffs
 * @parent Text Options
 *
 * @param Add Debuff Text
 * @desc Text to describe when an item has a debuff effect
 * @default Debuffs
 * @parent Text Options
 *
 * @param Remove Buff Text
 * @desc Text to describe when an item removes a buff effect
 * @default Remove Buffs
 * @parent Text Options
 *
 * @param Remove Debuff Text
 * @desc Text to describe when an item removes a debuff effect
 * @default Clear Debuffs
 * @parent Text Options
 *
 * @param Grow Text
 * @desc Text to describe when an item has a grow effect
 * @default Trains
 * @parent Text Options
 *
 * @param Learn Spell Text
 * @desc Text to describe when an item has a learn skill effect
 * @default Teaches
 * @parent Text Options
 *
 * @param Party Ability Text
 * @desc Text to describe when an armor or weapon has a party ability trait
 * @default Special Effect
 * @parent Text Options
 *
 * @param Half Encounter Text
 * @desc Text to describe party ability half encounter
 * @default Half Encounter Rate
 * @parent Text Options
 *
 * @param No Encounter Text
 * @desc Text to describe party ability no encounter
 * @default No Encounters
 * @parent Text Options
 *
 * @param Cancel Surprise Text
 * @desc Text to describe party ability cancel surprise
 * @default Cancel Surprise
 * @parent Text Options
 *
 * @param Raise Preemptive Text
 * @desc Text to describe party ability raise preemptive
 * @default Raise Preemptive
 * @parent Text Options
 *
 * @param Gold Double Text
 * @desc Text to describe party ability gold double
 * @default 2x Gold Drops
 * @parent Text Options
 *
 * @param Drop Item Double Text
 * @desc Text to describe party ability drop item double
 * @default 2x Item Drops
 * @parent Text Options
 *
 * @param Description Text
 * @desc Text to describe item description
 * @default Description
 * @parent Text Options
 *
 * @param Element Text
 * @desc Text to describe attack element trait
 * @default Element
 * @parent Text Options
 *
 * @param Attack Speed Text
 * @desc Text to describe attack speed trait
 * @default Speed Effect
 * @parent Text Options
 *
 * @param Attack Times Text
 * @desc Text to describe attack times + trait
 * @default Additional Attacks
 * @parent Text Options
 *
 * @param Attack State Text
 * @desc Text to describe attack apply state trait
 * @default Applies
 * @parent Text Options
 *
 * @param MP Cost Text
 * @desc Text to describe MP Cost
 * @default MP Cost
 * @parent Text Options
 *
 * @param TP Cost Text
 * @desc Text to describe TP Cost
 * @default TP Cost
 * @parent Text Options
 *
 * @param User TP Gain Text
 * @desc Text to describe user TP Gain
 * @default User TP Gain
 * @parent Text Options
 *
 * @param Battle Removal Text
 * @desc Text to describe state removal after battle property
 * @default Removed after battle
 * @parent Text Options
 *
 * @param Walking Removal Text
 * @desc Text to describe state removal after walking property
 * @default Removed after walking
 * @parent Text Options
 *
 * @param Damage Removal Text
 * @desc Text to describe state removal after damage property
 * @default Removed after damage
 * @parent Text Options
 *
 * @param Duration Text
 * @desc Text to describe state auto-removal duration
 * @default Duration
 * @parent Text Options
 *
 * @param Infinite Text
 * @desc Text to describe when state not automatically removed after some number of turns
 * @default Infinite
 * @parent Text Options
 *
 * @param Turns Text
 * @desc Text to describe turns in battle
 * @default Turns
 * @parent Text Options
 *
 * @param Seal Skill Types Text
 * @desc Text to describe trait that seals skill types
 * @default Locks
 * @parent Text Options
 *
 * @param Add Skill Types Text
 * @desc Text to describe trait that adds skill types
 * @default Unlocks
 * @parent Text Options
 *
 * @param Seal Skill Text
 * @desc Text to describe trait that seals skills
 * @default Locks
 * @parent Text Options
 *
 * @param Add Skill Text
 * @desc Text to describe trait that adds skills
 * @default Grants
 * @parent Text Options
 *
 * @param State Resist Text
 * @desc Text to describe trait that resists states
 * @default Resists
 * @parent Text Options
*/
/*~struct~Category:
 * @param Category Name
 * @type text
 * @desc Text to show for category name
 * 
 * @param Category Symbol
 * @type text
 * @desc Internal recognition of category, see documentation for help
 *
 * @param Category Display Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to show up in category window
 * 
 * @param Category Enable Requirements
 * @type struct<Requirements>
 * @default {"Item":"0","Switch":"0"}
 * @desc Requirements for the category to be enabled and selectable
 */
 /*~struct~Requirements:
 * @param Item
 * @type item
 * 
 * @param Switch
 * @type switch
 */
  /*~struct~Custom:
 * @param Name
 * @type text
 * @desc The entry name.
 * 
 * @param Category Symbol
 * @type text
 * @desc Category this entry belongs to.
 *
 * @param Description
 * @type note
 * @desc Description to display for the entry.
 * 
 * @param Sketch
 * @dir img/
 * @type file
 * @desc image to show at bottom of entry.
 */
var Imported = Imported || {};
Imported.CGMZ_Encyclopedia = true;
var CGMZ = CGMZ || {};
CGMZ.Encyclopedia = CGMZ.Encyclopedia || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Encyclopedia and Bestiary"] = "1.1.2";
CGMZ.Encyclopedia.parameters = PluginManager.parameters('CGMZ_Encyclopedia');
CGMZ.Encyclopedia.IncludeBestiary = (CGMZ.Encyclopedia.parameters["Include Bestiary"] === "true") ? true : false;
CGMZ.Encyclopedia.IncludeItems = (CGMZ.Encyclopedia.parameters["Include Items"] === "true") ? true : false;
CGMZ.Encyclopedia.IncludeArmors = (CGMZ.Encyclopedia.parameters["Include Armors"] === "true") ? true : false;
CGMZ.Encyclopedia.IncludeWeapons = (CGMZ.Encyclopedia.parameters["Include Weapons"] === "true") ? true : false;
CGMZ.Encyclopedia.IncludeSkills = (CGMZ.Encyclopedia.parameters["Include Skills"] === "true") ? true : false;
CGMZ.Encyclopedia.IncludeStates = (CGMZ.Encyclopedia.parameters["Include States"] === "true") ? true : false;
CGMZ.Encyclopedia.NumberEntries = (CGMZ.Encyclopedia.parameters["Number Entries"] === "true") ? true : false;
CGMZ.Encyclopedia.ShowDropChances = (CGMZ.Encyclopedia.parameters["Show Drop Chances"] === "true") ? true : false;
CGMZ.Encyclopedia.UnknownEntry = CGMZ.Encyclopedia.parameters["Unknown Entry"] || "? ? ? ? ?";
CGMZ.Encyclopedia.UnknownEntryDisplay = CGMZ.Encyclopedia.parameters["Unknown Entry Display"] || "This has not yet been discovered.";
CGMZ.Encyclopedia.TotalText = CGMZ.Encyclopedia.parameters["Total Window Text"] || "Total";
CGMZ.Encyclopedia.PriceText = CGMZ.Encyclopedia.parameters["Price Text"] || "Price";
CGMZ.Encyclopedia.NoPriceText = CGMZ.Encyclopedia.parameters["No Price Text"] || "Not for sale";
CGMZ.Encyclopedia.KeyItemText = CGMZ.Encyclopedia.parameters["Key Item Text"] || "Key Item";
CGMZ.Encyclopedia.PossessionText = CGMZ.Encyclopedia.parameters["Possession Text"] || "Possession";
CGMZ.Encyclopedia.EquipTypeText = CGMZ.Encyclopedia.parameters["Equip Type Text"] || "Equip Slot";
CGMZ.Encyclopedia.ArmorTypeText = CGMZ.Encyclopedia.parameters["Armor Type Text"] || "Armor Type";
CGMZ.Encyclopedia.NoArmorTypeText = CGMZ.Encyclopedia.parameters["No Armor Type Text"] || "None";
CGMZ.Encyclopedia.WeaponTypeText = CGMZ.Encyclopedia.parameters["Weapon Type Text"] || "Weapon Type";
CGMZ.Encyclopedia.NoWeaponTypeText = CGMZ.Encyclopedia.parameters["No Weapon Type Text"] || "None";
CGMZ.Encyclopedia.SkillTypeText = CGMZ.Encyclopedia.parameters["Skill Type Text"] || "Skill Type";
CGMZ.Encyclopedia.NoSkillTypeText = CGMZ.Encyclopedia.parameters["No Skill Type Text"] || "Basic";
CGMZ.Encyclopedia.DropsText = CGMZ.Encyclopedia.parameters["Drops Text"] || "Drops";
CGMZ.Encyclopedia.DropChanceText = CGMZ.Encyclopedia.parameters["Drop Chance Text"] || "Chance";
CGMZ.Encyclopedia.SketchText = CGMZ.Encyclopedia.parameters["Sketch Text"] || "Sketch";
CGMZ.Encyclopedia.NoteText = CGMZ.Encyclopedia.parameters["Note Text"] || "Note";
CGMZ.Encyclopedia.SuccessRateText = CGMZ.Encyclopedia.parameters["Success Rate Text"] || "Success Rate";
CGMZ.Encyclopedia.ConsumableText = CGMZ.Encyclopedia.parameters["Consumable Text"] || "Consumable";
CGMZ.Encyclopedia.EffectsText = CGMZ.Encyclopedia.parameters["Effects Text"] || "Effects";
CGMZ.Encyclopedia.HPEffectText = CGMZ.Encyclopedia.parameters["HP Effect Text"] || "HP Effect";
CGMZ.Encyclopedia.MPEffectText = CGMZ.Encyclopedia.parameters["MP Effect Text"] || "MP Effect";
CGMZ.Encyclopedia.TPEffectText = CGMZ.Encyclopedia.parameters["TP Effect Text"] || "TP Effect";
CGMZ.Encyclopedia.AddStateText = CGMZ.Encyclopedia.parameters["Add State Text"] || "Causes";
CGMZ.Encyclopedia.RemoveStateText = CGMZ.Encyclopedia.parameters["Remove State Text"] || "Cures";
CGMZ.Encyclopedia.AddBuffText = CGMZ.Encyclopedia.parameters["Add Buff Text"] || "Buffs";
CGMZ.Encyclopedia.AddDebuffText = CGMZ.Encyclopedia.parameters["Add Debuff Text"] || "Debuffs";
CGMZ.Encyclopedia.BuffRemovalText = CGMZ.Encyclopedia.parameters["Remove Buff Text"] || "Remove Buffs";
CGMZ.Encyclopedia.DebuffRemovalText = CGMZ.Encyclopedia.parameters["Remove Debuff Text"] || "Clear Debuffs";
CGMZ.Encyclopedia.GrowText = CGMZ.Encyclopedia.parameters["Grow Text"] || "Trains";
CGMZ.Encyclopedia.LearnSkillText = CGMZ.Encyclopedia.parameters["Learn Skill Text"] || "Teaches";
CGMZ.Encyclopedia.PartyAbilityText = CGMZ.Encyclopedia.parameters["Party Ability Text"] || "Special Effect";
CGMZ.Encyclopedia.HalfEncounterText = CGMZ.Encyclopedia.parameters["Half Encounter Text"] || "Half Encounter Rate";
CGMZ.Encyclopedia.NoEncounterText = CGMZ.Encyclopedia.parameters["No Encounter Text"] || "No Encounters";
CGMZ.Encyclopedia.CancelSurpriseText = CGMZ.Encyclopedia.parameters["Cancel Surprise Text"] || "Cancel Surprise";
CGMZ.Encyclopedia.RaisePreemptiveText = CGMZ.Encyclopedia.parameters["Raise Preemptive Text"] || "Raise Preemptive";
CGMZ.Encyclopedia.GoldDoubleText = CGMZ.Encyclopedia.parameters["Gold Double Text"] || "2x Gold Drops";
CGMZ.Encyclopedia.DropItemDoubleText = CGMZ.Encyclopedia.parameters["Drop item Double Text"] || "2x Item Drops";
CGMZ.Encyclopedia.DescriptionText = CGMZ.Encyclopedia.parameters["Description Text"] || "Description";
CGMZ.Encyclopedia.ElementText = CGMZ.Encyclopedia.parameters["Element Text"] || "Element";
CGMZ.Encyclopedia.AttackSpeedText = CGMZ.Encyclopedia.parameters["Attack Speed Text"] || "Speed Bonus";
CGMZ.Encyclopedia.AttackTimesText = CGMZ.Encyclopedia.parameters["Attack Times Text"] || "Additional Attacks";
CGMZ.Encyclopedia.AttackStateText = CGMZ.Encyclopedia.parameters["Attack State Text"] || "Applies";
CGMZ.Encyclopedia.MPCostText = CGMZ.Encyclopedia.parameters["MP Cost Text"] || "MP Cost";
CGMZ.Encyclopedia.TPCostText = CGMZ.Encyclopedia.parameters["TP Cost Text"] || "TP Cost";
CGMZ.Encyclopedia.UserTPGainText = CGMZ.Encyclopedia.parameters["User TP Gain Text"] || "User TP Gain";
CGMZ.Encyclopedia.BattleRemovalText = CGMZ.Encyclopedia.parameters["Battle Removal Text"] || "Removed after battle";
CGMZ.Encyclopedia.WalkingRemovalText = CGMZ.Encyclopedia.parameters["Walking Removal Text"] || "Removed after walking";
CGMZ.Encyclopedia.DamageRemovalText = CGMZ.Encyclopedia.parameters["Damage Removal Text"] || "Removed after damage";
CGMZ.Encyclopedia.DurationText = CGMZ.Encyclopedia.parameters["Duration Text"] || "Duration";
CGMZ.Encyclopedia.InfiniteText = CGMZ.Encyclopedia.parameters["Infinite Text"] || "Infinite";
CGMZ.Encyclopedia.TurnsText = CGMZ.Encyclopedia.parameters["Turns Text"] || "Turns";
CGMZ.Encyclopedia.SealSkillTypesText = CGMZ.Encyclopedia.parameters["Seal Skill Types Text"] || "Locks";
CGMZ.Encyclopedia.AddSkillTypesText = CGMZ.Encyclopedia.parameters["Add Skill Types Text"] || "Unlocks";
CGMZ.Encyclopedia.SealSkillText = CGMZ.Encyclopedia.parameters["Seal Skill Text"] || "Locks";
CGMZ.Encyclopedia.AddSkillText = CGMZ.Encyclopedia.parameters["Add Skill Text"] || "Grants";
CGMZ.Encyclopedia.StateResistText = CGMZ.Encyclopedia.parameters["State Resist Text"] || "Resists";
CGMZ.Encyclopedia.YesText = CGMZ.Encyclopedia.parameters["Yes Text"] || "Yes";
CGMZ.Encyclopedia.NoText = CGMZ.Encyclopedia.parameters["No Text"] || "No";
CGMZ.Encyclopedia.DecimalSpots = Number(CGMZ.Encyclopedia.parameters["Total Window Rounding"]) || 2;
CGMZ.Encyclopedia.ScrollWait = Number(CGMZ.Encyclopedia.parameters["Scroll Wait"]) || 300;
CGMZ.Encyclopedia.ScrollSpeed = Number(CGMZ.Encyclopedia.parameters["Scroll Speed"]) || 1;
CGMZ.Encyclopedia.ScrollDeceleration = parseFloat(CGMZ.Encyclopedia.parameters["Scroll Deceleration"]) || 0.92;
CGMZ.Encyclopedia.AutoScroll = (CGMZ.Encyclopedia.parameters["Auto Scroll"] === "true") ? true : false;
CGMZ.Encyclopedia.LargeIconMultiplier = parseFloat(CGMZ.Encyclopedia.parameters["Large Icon Multiplier"]) || 3.0;
CGMZ.Encyclopedia.Categories = JSON.parse(CGMZ.Encyclopedia.parameters["Categories"]);
CGMZ.Encyclopedia.CustomEntries = JSON.parse(CGMZ.Encyclopedia.parameters["Custom Entries"]);
//=============================================================================
// CGMZ_EncyclopediaData
//-----------------------------------------------------------------------------
// Class that stores the id and discovery of built-in encyclopedia classes
// such as enemies or items. Not for custom category data.
//=============================================================================
function CGMZ_EncyclopediaData(id, index) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMZ_EncyclopediaData.prototype.initialize = function(id, index) {
	this._id = id;
	this._index = index;
	this._discovered = false;
};
//=============================================================================
// CGMZ_CustomEncyclopediaData
//-----------------------------------------------------------------------------
// Class that stores the data of custom entries in the encyclopedia
//=============================================================================
function CGMZ_CustomEncyclopediaData(id, data) {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Data
//-----------------------------------------------------------------------------
CGMZ_CustomEncyclopediaData.prototype.initialize = function(id, data) {
	this._id = id+1;
	this._index = id+1;
	this._discovered = false;
	this._name = data.Name;
	this._sketch = (data.Sketch == "") ? null : "img/" + data.Sketch;
	this._description = data.Description;
};
//=============================================================================
// CGMZ_Encyclopedia
//-----------------------------------------------------------------------------
// Store and manage encyclopedia data.
//=============================================================================
function CGMZ_Encyclopedia() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Encyclopedia
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initialize = function() {
	this._bestiary = [];
	this._items = [];
	this._armors = [];
	this._weapons = [];
	this._skills = [];
	this._states = [];
	this.initializeData(this._bestiary, $dataEnemies.length-1, 'bestiary'); // -1 because $data are not
	this.initializeData(this._items, $dataItems.length-1, 'items');      // 0-indexed, but have null
	this.initializeData(this._armors, $dataArmors.length-1, 'armors');    // for first value instead
	this.initializeData(this._weapons, $dataWeapons.length-1, 'weapons');
	this.initializeData(this._skills, $dataSkills.length-1, 'skills');
	this.initializeData(this._states, $dataStates.length-1, 'states');
	this._totalDiscovered = 0;
	this._bestiaryDiscovered = 0;
	this._itemsDiscovered = 0;
	this._armorsDiscovered = 0;
	this._weaponsDiscovered = 0;
	this._skillsDiscovered = 0;
	this._statesDiscovered = 0;
	this._customData = {};
	this._customDiscovered = {};
	this.initializeCustomData();
	this._totalEntries = this.calculateTotalEntries();
};
//-----------------------------------------------------------------------------
// Initialize any encyclopedia data array to all undiscovered.
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initializeData = function(array, length, symbol) {
	switch(symbol) {
		case 'bestiary':
			if(!CGMZ.Encyclopedia.IncludeBestiary) return;
			var gameData = $dataEnemies;
			break;
		case 'items':
			if(!CGMZ.Encyclopedia.IncludeItems) return;
			var gameData = $dataItems;
			break;
		case 'armors':
			if(!CGMZ.Encyclopedia.IncludeArmors) return;
			var gameData = $dataArmors;
			break;
		case 'weapons':
			if(!CGMZ.Encyclopedia.IncludeWeapons) return;
			var gameData = $dataWeapons;
			break;
		case 'skills':
			if(!CGMZ.Encyclopedia.IncludeSkills) return;
			var gameData = $dataSkills;
			break;
		case 'states':
			if(!CGMZ.Encyclopedia.IncludeStates) return;
			var gameData = $dataStates;
	}
	let index = 1;
	for(let i = 0; i < length; i++) {
		if(gameData[i+1] && gameData[i+1].meta && gameData[i+1].meta.cgmzencyclopediahide) continue;
		var data = new CGMZ_EncyclopediaData(i+1, index); // i+1 because $data are not 0-indexed
		array.push(data);
		index++;
	}
};
//-----------------------------------------------------------------------------
// Initialize custom data
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.initializeCustomData = function() {
	const customData = CGMZ.Encyclopedia.CustomEntries;
	for(let i = 0; i < customData.length; i++) {
		var data = JSON.parse(customData[i]);
		var symbol = data["Category Symbol"];
		if(!this._customData.hasOwnProperty(symbol)) {
			this._customData[symbol] = [];
			this._customDiscovered[symbol] = 0;
		}
		var obj = new CGMZ_CustomEncyclopediaData(this._customData[symbol].length, data);
		this._customData[symbol].push(obj);
	}
};
//-----------------------------------------------------------------------------
// Calculate total amount of entries
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.calculateTotalEntries = function() {
	let total = 0;
	if(CGMZ.Encyclopedia.IncludeBestiary) total += this._bestiary.length;
	if(CGMZ.Encyclopedia.IncludeItems) total += this._items.length;
	if(CGMZ.Encyclopedia.IncludeArmors) total += this._armors.length;
	if(CGMZ.Encyclopedia.IncludeWeapons) total += this._weapons.length;
	if(CGMZ.Encyclopedia.IncludeSkills) total += this._skills.length;
	if(CGMZ.Encyclopedia.IncludeStates) total += this._states.length;
	if(this._customData) {
		let keyArray = Object.keys(this._customData);
		for(let i = 0; i < keyArray.length; i++) {
			total += this._customData[keyArray[i]].length;
		}
	}
	return total;
};
//-----------------------------------------------------------------------------
// Processing a (potential) new discovery
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.processDiscovery = function(symbol, id) {
	symbol = symbol.toLowerCase();
	let dataArray = this.getEncyclopediaData(symbol);
	if(dataArray.length < 1) return;
	let dataObject = this.getEncyclopediaObject(dataArray, Number(id));
	if(dataObject && !dataObject._discovered) { // Actually is new discovery
		this._totalDiscovered++;
		switch(symbol) {
			case 'bestiary':
				this._bestiaryDiscovered++;
				break;
			case 'items':
				this._itemsDiscovered++;
				break;
			case 'armors':
				this._armorsDiscovered++;
				break;
			case 'weapons':
				this._weaponsDiscovered++;
				break;
			case 'skills':
				this._skillsDiscovered++;
				break;
			case 'states':
				this._statesDiscovered++;
				break;
			default:
				this._customDiscovered[symbol]++;
		}
		dataObject._discovered = true;
		if(Imported.CGMZ_Achievements) {
			$cgmz.checkAchievementEncyclopediaCriteria();
		}
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Object from Array
// Possible that arrays are not in order of the ID, in this case it will find proper ID.
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getEncyclopediaObject = function(array, id) {
	if(array[id-1] && array[id-1]._id === id) return array[id-1];
	for(let i = 0; i < array.length; i++) {
		if(array[i]._id === id) return array[i];
	}
	return null;
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getAmountDiscovered = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalDiscovered;
		case 'bestiary': return this._bestiaryDiscovered;
		case 'items': return this._itemsDiscovered;
		case 'armors': return this._armorsDiscovered;
		case 'weapons': return this._weaponsDiscovered;
		case 'skills': return this._skillsDiscovered;
		case 'states': return this._statesDiscovered;
		default: return (this._customDiscovered[symbol] || this._customDiscovered[symbol] === 0) ? this._customDiscovered[symbol] : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getAmountEntries = function(symbol) {
	switch(symbol) {
		case 'total': return this._totalEntries;
		case 'bestiary': return this._bestiary.length;
		case 'items': return this._items.length;
		case 'armors': return this._armors.length;
		case 'weapons': return this._weapons.length;
		case 'skills': return this._skills.length;
		case 'states': return this._states.length;
		default: return (this._customData[symbol]) ? this._customData[symbol].length : -1;
	}
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Data
// Returns data array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.getEncyclopediaData = function(symbol) {
	switch(symbol) {
		case 'bestiary': return this._bestiary;
		case 'items': return this._items;
		case 'armors': return this._armors;
		case 'weapons': return this._weapons;
		case 'skills': return this._skills;
		case 'states': return this._states;
		default: return (this._customData[symbol]) ? this._customData[symbol] : [];
	}
};
//-----------------------------------------------------------------------------
// Discover troop enemies
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverTroop = function(troopId) {
	if(!CGMZ.Encyclopedia.IncludeBestiary) return;
	let troop = $dataTroops[troopId];
	troop.members.forEach(function(member) {
		if ($dataEnemies[member.enemyId]) {
			this.processDiscovery('bestiary', member.enemyId);
		}
	}, this);
};
//-----------------------------------------------------------------------------
// Discover items, weapons, or armors
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverItem = function(id, symbol) {
	if(symbol == "item") {
		if(!CGMZ.Encyclopedia.IncludeItems) return;
		this.processDiscovery('items', id);
	}
	else if(symbol == "weapon") {
		if(!CGMZ.Encyclopedia.IncludeWeapons) return;
		this.processDiscovery('weapons', id);
	}
	else if(symbol == "armor") {
		if(!CGMZ.Encyclopedia.IncludeArmors) return;
		this.processDiscovery('armors', id);
	}
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverSkill = function(id) {
	if(!CGMZ.Encyclopedia.IncludeSkills) return;
	this.processDiscovery('skills', id);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Encyclopedia.prototype.discoverState = function(id) {
	if(!CGMZ.Encyclopedia.IncludeStates) return;
	this.processDiscovery('states', id);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handling for encyclopedia plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Encyclopedia_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Reinitialize", this.pluginCommandEncyclopediaReinitialize);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "Call Scene", this.pluginCommandEncyclopediaCallScene);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverEnemy", this.pluginCommandEncyclopediaDiscoverEnemy);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverItem", this.pluginCommandEncyclopediaDiscoverItem);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverArmor", this.pluginCommandEncyclopediaDiscoverArmor);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverWeapon", this.pluginCommandEncyclopediaDiscoverWeapon);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverSkill", this.pluginCommandEncyclopediaDiscoverSkill);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverState", this.pluginCommandEncyclopediaDiscoverState);
	PluginManager.registerCommand("CGMZ_Encyclopedia", "DiscoverCustom", this.pluginCommandEncyclopediaDiscoverCustom);
};
//-----------------------------------------------------------------------------
// Reinitialize the encyclopedia data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaReinitialize = function(args) {
	if (args.reinitialize === "true") {
		$cgmz.initializeEncyclopediaData(true);
	}
};
//-----------------------------------------------------------------------------
// Call the Encyclopedia Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaCallScene = function(args) {
	if (args.callScene === "true") {
		SceneManager.push(CGMZ_Scene_Encyclopedia);
	}
};
//-----------------------------------------------------------------------------
// Discover an enemy
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverEnemy = function(args) {
	$cgmz.encyclopediaDiscovery("bestiary", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover an item
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverItem = function(args) {
	$cgmz.encyclopediaDiscovery("items", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover an armor
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverArmor = function(args) {
	$cgmz.encyclopediaDiscovery("armors", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover a weapon
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverWeapon = function(args) {
	$cgmz.encyclopediaDiscovery("weapons", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover a skill
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverSkill = function(args) {
	$cgmz.encyclopediaDiscovery("skills", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover a state
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverState = function(args) {
	$cgmz.encyclopediaDiscovery("states", Number(args.id));
};
//-----------------------------------------------------------------------------
// Discover a custom entry
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEncyclopediaDiscoverCustom = function(args) {
	$cgmz.encyclopediaDiscovery(args.symbol, Number(args.id));
};
//=============================================================================
// CGMZ
//-----------------------------------------------------------------------------
// Manage encyclopedia data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize encyclopedia data
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Encyclopedia_createPluginData.call(this);
	this.initializeEncyclopediaData(false);
};
//-----------------------------------------------------------------------------
// Initialize encyclopedia data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeEncyclopediaData = function(reinitialize) {
	if(!this._encyclopedia || reinitialize) {
		this.setupEncyclopediaVariables();
	}
};
//-----------------------------------------------------------------------------
// Initialize encyclopedia variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setupEncyclopediaVariables = function() {
	this._encyclopedia = new CGMZ_Encyclopedia();
};
//-----------------------------------------------------------------------------
// Discover encyclopedia entry manually
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.encyclopediaDiscovery = function(symbol, id) {
	this._encyclopedia.processDiscovery(symbol, id);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Discovered
// Returns amount discovered if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaDiscovered = function(symbol) {
	return this._encyclopedia.getAmountDiscovered(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Entries
// Returns amount of entries if possible, otherwise returns -1
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaEntries = function(symbol) {
	return this._encyclopedia.getAmountEntries(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Data Array
// Returns proper array if possible, otherwise returns []
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaData = function(symbol) {
	return this._encyclopedia.getEncyclopediaData(symbol);
};
//-----------------------------------------------------------------------------
// Get Encyclopedia Object
// Returns data object from array
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaObject = function(symbol, id) {
	const array = this._encyclopedia.getEncyclopediaData(symbol);
	return this._encyclopedia.getEncyclopediaObject(array, id);
};
//-----------------------------------------------------------------------------
// Discover enemies from a troop
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverTroop = function(troopId) {
	this._encyclopedia.discoverTroop(troopId);
};
//-----------------------------------------------------------------------------
// Discover items, weapons, and armors (symbol = "item", "weapon", "armor")
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverItem = function(id, symbol) {
	this._encyclopedia.discoverItem(id, symbol);
};
//-----------------------------------------------------------------------------
// Discover skills
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverSkill = function(skillId) {
	this._encyclopedia.discoverSkill(skillId);
};
//-----------------------------------------------------------------------------
// Discover states
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.EncyclopediaDiscoverState = function(stateId) {
	this._encyclopedia.discoverState(stateId);
};
//-----------------------------------------------------------------------------
// Get total discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaTotalPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('total') / this._encyclopedia.getAmountEntries('total');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get bestiary discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaBestiaryPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('bestiary') / this._encyclopedia.getAmountEntries('bestiary');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get items discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaItemsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('items') / this._encyclopedia.getAmountEntries('items');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get weapons discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaWeaponsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('weapons') / this._encyclopedia.getAmountEntries('weapons');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get armors discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaArmorsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('armors') / this._encyclopedia.getAmountEntries('armors');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get skills discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaSkillsPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('skills') / this._encyclopedia.getAmountEntries('skills');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get states discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaStatesPercent = function() {
	let percentage = this._encyclopedia.getAmountDiscovered('states') / this._encyclopedia.getAmountEntries('states');
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//-----------------------------------------------------------------------------
// Get custom discovered %
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getEncyclopediaCustomPercent = function(symbol) {
	let percentage = this._encyclopedia.getAmountDiscovered(symbol) / this._encyclopedia.getAmountEntries(symbol);
	percentage *= 100;
	return parseFloat(percentage.toFixed(CGMZ.Encyclopedia.DecimalSpots));
};
//=============================================================================
// CGMZ_Scene_Encyclopedia
//-----------------------------------------------------------------------------
// Handle the encyclopedia scene
//=============================================================================
function CGMZ_Scene_Encyclopedia() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Encyclopedia.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Encyclopedia.prototype.constructor = CGMZ_Scene_Encyclopedia;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create encyclopedia windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCategoryWindow();
	this.createTotalsWindow();
	this.createListWindow();
	this.createDummyWindow();
	this.createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Create encyclopedia category window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createCategoryWindow = function() {
    this._categoryWindow = new CGMZ_Window_EncyclopediaCategory(this.categoryWindowRect());
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Category Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.mainAreaTop();
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true);
    return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create Totals Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createTotalsWindow = function() {
    this._totalsWindow = new CGMZ_Window_EncyclopediaTotals(this.totalsWindowRect());
	this._categoryWindow.setTotalWindow(this._totalsWindow);
    this.addWindow(this._totalsWindow);
};
//-----------------------------------------------------------------------------
// Totals Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.totalsWindowRect = function() {
    const x = 0;
	const y = Graphics.boxHeight - this.calcWindowHeight(2, false);
	const width = Graphics.boxWidth/3;
	const height = this.calcWindowHeight(2, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create List Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createListWindow = function() {
    this._listWindow = new CGMZ_Window_EncyclopediaList(this.listWindowRect());
	this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._categoryWindow.setListWindow(this._listWindow);
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// List Window Rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.listWindowRect = function() {
	const width = Graphics.boxWidth/3;
	const height = Graphics.boxHeight - (this._categoryWindow.y + this._categoryWindow.height) - this._totalsWindow.height;
	const y = this._categoryWindow.y + this._categoryWindow.height;
	const x = 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create Dummy Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createDummyWindow = function() {
    this._dummyWindow = new Window_Base(this.displayWindowRect());
    this.addWindow(this._dummyWindow);
};
//-----------------------------------------------------------------------------
// Create Display Window
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.createDisplayWindow = function() {
    this._displayWindow = new CGMZ_Window_EncyclopediaDisplay(this.displayWindowRect());
	this._listWindow.setDisplayWindow(this._displayWindow);
	this._displayWindow.hide();
	this._displayWindow.deactivate();
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Display window (and dummy window) rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.displayWindowRect = function() {
    const x = this._listWindow.width;
	const y = this._categoryWindow.height + this.mainAreaTop();
	const width = Graphics.boxWidth - x;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On category OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onCategoryOk = function() {
	this._dummyWindow.hide();
	this._displayWindow.show();
    this._categoryWindow.deactivate();
	this._listWindow.activate();
	this._listWindow.select(0);
};
//-----------------------------------------------------------------------------
// On list cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onListCancel = function() {
	this._dummyWindow.show();
	this._displayWindow.hide();
    this._categoryWindow.activate();
	this._listWindow.deactivate();
	this._listWindow.deselect();
};
//-----------------------------------------------------------------------------
// On list OK
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On display cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Encyclopedia.prototype.onDisplayCancel = function() {
    this._displayWindow.deactivate();
	this._listWindow.activate();
};
//=============================================================================
// CGMZ_Window_EncyclopediaCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category in the encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaCategory(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaCategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_EncyclopediaCategory.prototype.constructor = CGMZ_Window_EncyclopediaCategory;
//-----------------------------------------------------------------------------
// Window Width
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.makeCommandList = function() {
	for(let i = 0; i < CGMZ.Encyclopedia.Categories.length; i++) {
		var categoryData = JSON.parse(CGMZ.Encyclopedia.Categories[i]);
		if(this.canShowCommand(categoryData)) {
			var name = categoryData["Category Name"];
			var symbol = categoryData["Category Symbol"];
			this.addCommand(name, symbol, this.enableEncyclopediaCommand(categoryData));
		}
	}
};
//-----------------------------------------------------------------------------
// Can Show Category?
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.canShowCommand = function(categoryData) {
	if(categoryData["Category Symbol"] === "bestiary" && !CGMZ.Encyclopedia.IncludeBestiary) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "items" && !CGMZ.Encyclopedia.IncludeItems) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "armors" && !CGMZ.Encyclopedia.IncludeArmors) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "weapons" && !CGMZ.Encyclopedia.IncludeWeapons) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "skills" && !CGMZ.Encyclopedia.IncludeSkills) {
		return false;
	}
	else if(categoryData["Category Symbol"] === "states" && !CGMZ.Encyclopedia.IncludeStates) {
		return false;
	}
	const showReqs = JSON.parse(categoryData["Category Display Requirements"]);
	const itemID = Number(showReqs["Item"]);
	const switchID = Number(showReqs["Switch"]);
	if(itemID > 0 && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID > 0 && $gameSwitches.value(switchID) != true) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Command Enabled?
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.enableEncyclopediaCommand = function(categoryData) {
	const enableReqs = JSON.parse(categoryData["Category Enable Requirements"]);
	const itemID = Number(enableReqs["Item"]);
	const switchID = Number(enableReqs["Switch"]);
	if(itemID > 0 && !$gameParty.hasItem($dataItems[itemID])) {
		return false;
	}
	if(switchID > 0 && $gameSwitches.value(switchID) != true) {
		return false;
	}
	return true;
};
//-----------------------------------------------------------------------------
// Set total (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.setTotalWindow = function(totalWindow) {
	this._totalWindow = totalWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.callUpdateHelp = function() {
	if(this.active) {
		this.updateHelperWindows();
	}
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) {
		this._listWindow.setItem(this.currentData());
	}
	if(this._totalWindow) {
		this._totalWindow.setItem(this.currentData());
	}
};
//=============================================================================
// CGMZ_Window_EncyclopediaTotals
//-----------------------------------------------------------------------------
// Shows completion % for encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaTotals(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaTotals.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_EncyclopediaTotals.prototype.constructor = CGMZ_Window_EncyclopediaTotals;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this._symbol = null;
	this._name = null;
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.setItem = function(data) {
	this._symbol = data.symbol;
	this._name =  data.name;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.refresh = function() {
	this.contents.clear();
	this.drawSpecificCompletion(this._symbol, this._name);
	this.drawTotalCompletion();
};
//-----------------------------------------------------------------------------
// Draw overall completion %
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.drawTotalCompletion = function() {
	let descriptor = CGMZ.Encyclopedia.TotalText + ": ";
	let totalWidth = this.contents.width - $gameSystem.windowPadding()*2;
	let x = this.textWidth(descriptor);
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, 0, this.lineHeight(), totalWidth, 'left');
	this.changeTextColor(ColorManager.normalColor());
	let totalDiscovered = $cgmz.getEncyclopediaDiscovered('total');
	let totalEntries = $cgmz.getEncyclopediaEntries('total');
	let completion = Number((totalDiscovered/totalEntries)*100).toFixed(CGMZ.Encyclopedia.DecimalSpots);
	if(completion == 100) completion = 100;
	this.drawText(completion + "%", x, this.lineHeight(), totalWidth-x, 'left');
};
//-----------------------------------------------------------------------------
// Draw specific category completion
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaTotals.prototype.drawSpecificCompletion = function(symbol, name) {
	let descriptor = name + ": ";
	let totalWidth = this.contents.width - $gameSystem.windowPadding()*2;
	let x = this.textWidth(descriptor);
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, 0, 0, totalWidth*0.75, 'left');
	let discovered = $cgmz.getEncyclopediaDiscovered(symbol);
	let entries = $cgmz.getEncyclopediaEntries(symbol);
	let completion = Number((discovered/entries)*100).toFixed(CGMZ.Encyclopedia.DecimalSpots);
	if(completion == 100) completion = 100;
	if(totalWidth-x > totalWidth*0.25) {
		width = totalWidth-x
	}
	else {
		width = totalWidth*0.25;
		x = totalWidth*0.75;
	}
	this.changeTextColor(ColorManager.normalColor());
	this.drawText(completion + "%", x, 0, width, 'left');
};
//=============================================================================
// CGMZ_Window_EncyclopediaList
//-----------------------------------------------------------------------------
// Selectable window for choosing an entry in a list.
//=============================================================================
function CGMZ_Window_EncyclopediaList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_EncyclopediaList.prototype.constructor = CGMZ_Window_EncyclopediaList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this._symbol = null;
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.setItem = function(data) {
	this._symbol = data.symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
	this.select(0);
	this.ensureCursorVisible(true);
	this.deselect();
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.makeItemList = function() {
    this._data = $cgmz.getEncyclopediaData(this._symbol);
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.drawItem = function(index) {
    let item = this._data[index];
    let rect = this.itemRectWithPadding(index);
    rect.width -= $gameSystem.windowPadding();
    this.changePaintOpacity(this.isEnabled(item));
	let number = CGMZ.Encyclopedia.NumberEntries ? item._index + ". " : "";
	let name = item._discovered ? this.getItemName(this._symbol, item._id) : CGMZ.Encyclopedia.UnknownEntry;
    this.drawText(number + name, rect.x, rect.y, rect.width, 'left');
    this.changePaintOpacity(true);
};
//-----------------------------------------------------------------------------
// Determine if item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.isEnabled = function(item) {
    return item._discovered;
};
//-----------------------------------------------------------------------------
// Get the name of the object
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.getItemName = function(symbol, id) {
    switch(symbol) {
		case 'bestiary': return $dataEnemies[id].name;
		case 'items': return $dataItems[id].name;
		case 'armors': return $dataArmors[id].name;
		case 'weapons': return $dataWeapons[id].name;
		case 'skills': return $dataSkills[id].name;
		case 'states': return $dataStates[id].name;
		default:
			let obj = $cgmz.getEncyclopediaObject(symbol, id);
			return (obj) ? obj._name : CGMZ.Encyclopedia.UnknownEntry;
	}
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this.updateHelp();
	}
};
//-----------------------------------------------------------------------------
// Update display window
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaList.prototype.updateHelp = function() {
    this._displayWindow.setItem(this.item(), this._symbol);
};
//=============================================================================
// CGMZ_Window_EncyclopediaDisplay
//-----------------------------------------------------------------------------
// Shows completion % for encyclopedia
//=============================================================================
function CGMZ_Window_EncyclopediaDisplay(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_EncyclopediaDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_EncyclopediaDisplay.prototype.constructor = CGMZ_Window_EncyclopediaDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.initialize = function(rect) {
	let heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Encyclopedia.ScrollWait, CGMZ.Encyclopedia.ScrollSpeed, CGMZ.Encyclopedia.AutoScroll, CGMZ.Encyclopedia.ScrollDeceleration);
	this._data = null;
	this._iconBitmap = ImageManager.loadSystem('IconSet'); //only load this once
	this._largeIconWidth = ImageManager.iconWidth*CGMZ.Encyclopedia.LargeIconMultiplier;
	this._largeIconHeight = ImageManager.iconHeight*CGMZ.Encyclopedia.LargeIconMultiplier;
	this.createContents();
	this.createBattlerSprite(rect);
};
//-----------------------------------------------------------------------------
// Create the battler sprite
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.createBattlerSprite = function(rect) {
	this._battlerSprite = new Sprite();
	this._battlerSprite.anchor.x = 0.5;
	this.addInnerChild(this._battlerSprite);
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.setItem = function(item, symbol) {
	if(!item) return;
	this._data = item;
	this._symbol = symbol;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.refresh = function() {
	this.setupWindowForNewEntry();
	if(this._data) this.drawEncyclopediaEntry();
};
//-----------------------------------------------------------------------------
// Draw Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaEntry = function() {
	this._battlerSprite.hide();
	if(!this._data._discovered) {
		this.drawUnknownItem();
	}
	else {
		switch(this._symbol) {
			case 'bestiary': this.drawBestiary();
							 break;
			case 'items':	 this.drawItem();
							 break;
			case 'armors': 	 this.drawArmor();
							 break;
			case 'weapons':	 this.drawWeapon();
							 break;
			case 'skills': 	 this.drawSkill();
							 break;
			case 'states': 	 this.drawState();
							 break;
			default: 		 this.drawCustom();
		}
	}
	this._neededHeight += $gameSystem.windowPadding()*2;
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Draw Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawUnknownItem = function() {
	this.drawText(CGMZ.Encyclopedia.UnknownEntryDisplay, 0, 0, this.contents.width, 'center');
	this._neededHeight = this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Bestiary Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawBestiary = function() {
	let enemy = $dataEnemies[this._data._id];
	this.drawEncyclopediaName(enemy.name);
	this.drawEncyclopediaStats(enemy.params, this.lineHeight());
	this.drawEncyclopediaCenteredText(CGMZ.Encyclopedia.DropsText, this.lineHeight()*5, true);
	this.drawEncyclopediaBestiaryRewards(enemy.exp, enemy.gold);
	let y = this.drawEncyclopediaBestiaryDrops(enemy.dropItems);
	y = this.drawEncyclopediaMeta(enemy.meta.cgmzdesc, y);
	y = this.drawEncyclopediaBestiarySketch(enemy.battlerHue, enemy.battlerName, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Item Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawItem = function() {
	let item = $dataItems[this._data._id];
	this.drawEncyclopediaName(item.name);
	this.drawEncyclopediaLargeIcon(item.iconIndex);
	this.drawEncyclopediaPrice(item.price);
	this.drawEncyclopediaKeyItem(item.itypeId);
	this.drawEncyclopediaPossession($gameParty.numItems(item));
	this.drawEncyclopediaSuccessRate(item.successRate);
	this.drawEncyclopediaConsumable(item.consumable);
	let y = this.drawUserTPGain(item.tpGain, this.lineHeight()*6);
	y = this.drawEncyclopediaEffects(item.effects, y);
	y = this.drawEncyclopediaDescription(item.description, y);
	y = this.drawEncyclopediaMeta(item.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Armor Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawArmor = function() {
	let armor = $dataArmors[this._data._id];
	this.drawEncyclopediaName(armor.name);
	this.drawEncyclopediaLargeIcon(armor.iconIndex);
	this.drawEncyclopediaPrice(armor.price);
	this.drawEncyclopediaType($dataSystem.equipTypes[armor.etypeId], 'equip', this.lineHeight()*2);
	this.drawEncyclopediaPossession($gameParty.numItems(armor));
	this.drawEncyclopediaType($dataSystem.armorTypes[armor.atypeId], 'armor', this.lineHeight()*4);
	this.drawEncyclopediaStats(armor.params, this.lineHeight()*5, true);
	let y = this.drawEncyclopediaTrait(armor.traits, this.lineHeight()*9);
	y = this.drawEncyclopediaDescription(armor.description, y);
	y = this.drawEncyclopediaMeta(armor.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Weapon Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawWeapon = function() {
	let weapon = $dataWeapons[this._data._id];
	this.drawEncyclopediaName(weapon.name);
	this.drawEncyclopediaLargeIcon(weapon.iconIndex);
	this.drawEncyclopediaPrice(weapon.price);
	this.drawEncyclopediaType($dataSystem.equipTypes[weapon.etypeId], 'equip', this.lineHeight()*2);
	this.drawEncyclopediaPossession($gameParty.numItems(weapon));
	this.drawEncyclopediaType($dataSystem.weaponTypes[weapon.wtypeId], 'weapon', this.lineHeight()*4);
	this.drawEncyclopediaStats(weapon.params, this.lineHeight()*5, true);
	let y = this.drawEncyclopediaTrait(weapon.traits, this.lineHeight()*9);
	y = this.drawEncyclopediaDescription(weapon.description, y);
	y = this.drawEncyclopediaMeta(weapon.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Skill Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawSkill = function() {
	let skill = $dataSkills[this._data._id];
	this.drawEncyclopediaName(skill.name);
	this.drawEncyclopediaLargeIcon(skill.iconIndex);
	this.drawEncyclopediaType($dataSystem.skillTypes[skill.stypeId], 'skill', this.lineHeight());
	this.drawSkillCosts(skill.mpCost, skill.tpCost);
	this.drawEncyclopediaSuccessRate(skill.successRate);
	let y = this.drawUserTPGain(skill.tpGain, this.lineHeight()*5);
	y = this.drawEncyclopediaEffects(skill.effects, y);
	y = this.drawEncyclopediaDescription(skill.description, y);
	y = this.drawEncyclopediaMeta(skill.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw State Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawState = function() {
	let state = $dataStates[this._data._id];
	this.drawEncyclopediaName(state.name);
	this.drawEncyclopediaLargeIcon(state.iconIndex);
	this.drawStateDuration(state.autoRemovalTiming, state.minTurns, state.maxTurns);
	this.drawStateRemoval(state.removeAtBattleEnd, CGMZ.Encyclopedia.BattleRemovalText, this.lineHeight()*2);
	this.drawStateRemoval(state.removeByWalking, CGMZ.Encyclopedia.WalkingRemovalText, this.lineHeight()*3);
	this.drawStateRemoval(state.removeByDamage, CGMZ.Encyclopedia.DamageRemovalText, this.lineHeight()*4);
	let y = this.drawEncyclopediaTrait(state.traits, this.lineHeight()*5);
	y = this.drawEncyclopediaMeta(state.meta.cgmzdesc, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Custom Encyclopedia Entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawCustom = function() {
	let item = this._data;
	this.drawEncyclopediaName(item._name);
	let y = this.drawCustomDescription(item._description);
	y = this.drawCustomBitmap(item._sketch, y);
	this._neededHeight = y;
};
//-----------------------------------------------------------------------------
// Draw Name - Always used for all categories
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaName = function(name) {
	this.contents.fontBold = true;
	this.drawText(name, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draws Centered Text
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaCenteredText = function(txt, y, useColor) {
	useColor = useColor || false;
	if(useColor) this.changeTextColor(ColorManager.systemColor());
	this.drawText(txt, 0, y, this.contents.width, 'center');
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Draws a standard Encyclopedia line - used for all categories
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaStandardLine = function(descriptor1, descriptor2, x, y, width) {
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor1, x, y, width-x, 'left');
	x += this.textWidth(descriptor1);
	this.changeTextColor(ColorManager.normalColor());
	this.drawText(descriptor2, x, y, width-x, 'left');
};
//-----------------------------------------------------------------------------
// Draws text array with descriptor in first line.
// Makes sure to have enough space for each item.
// Returns y-value of line below lowest line drawn.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawTextArray = function(y, descriptor, array, separator) {
	separator = separator || " ";
	var descriptor = descriptor + ": ";
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	let x = this.textWidth(descriptor);
	this.changeTextColor(ColorManager.normalColor());
	for(let i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		if(array[i].includes(" ")) {
			var xy = this.drawWords(y, x, array[i]);
			x = xy[0];
			y = xy[1];
			this.drawText(separator, x, y, this.contents.width, 'left');
			x += this.textWidth(separator);
		}
		else {
			var tempWidth = this.textWidth(array[i] + separator);
			if(tempWidth + x > this.contents.width) {
				if(tempWidth <= this.contents.width) {
					y += this.lineHeight();
					x = 0;
				}
			}
			this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
			x += tempWidth;
		}
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws words. Makes sure to have enough space for each word.
// Returns x-value past last word drawn and y-value of lowest line drawn.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawWords = function(y, x, string) {
	let array = string.split(" ");
	let separator = " ";
	for(let i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		var tempWidth = this.textWidth(array[i] + separator);
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return [x, y];
};
//-----------------------------------------------------------------------------
// Draw Items (skill, state, etc) - Draws skills with icon with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawItemNames = function(descriptor, x, y, width, itemIds, symbol) {
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, x, y, width, 'left');
	this.changeTextColor(ColorManager.normalColor());
	x += this.textWidth(descriptor);
	for(let i = 0; i < itemIds.length; i++) {
		if(symbol == 'skill') var item = $dataSkills[itemIds[i]];
		else if(symbol == 'state') var item = $dataStates[itemIds[i]];
		var widthNeeded = this.textWidth(item.name) + ImageManager.iconWidth + 4;
		if(itemIds.length > i+1) widthNeeded += this.textWidth(", ");
		if(widthNeeded + x > width) {
			y += this.lineHeight();
			x = 0;
		}
		this.drawItemName(item, x, y, width)
		x += widthNeeded;
		if(itemIds.length > i+1) this.drawText(", ", x-this.textWidth(", "), y, width, 'left');
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Large icon - Always used for item, armor, weapon, skill, state.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaLargeIcon = function(iconIndex) {
	let bitmap = this._iconBitmap;
	let pw = ImageManager.iconWidth;
    let ph = ImageManager.iconHeight;
    let sx = iconIndex % 16 * pw;
    let sy = Math.floor(iconIndex / 16) * ph;
	let dw = this._largeIconWidth;
	let dh = this._largeIconHeight;
	let x = 0;
	let y = this.lineHeight();
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
};
//-----------------------------------------------------------------------------
// Draw Price - Always used for item, armor, weapon
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaPrice = function(price) {
	let y = this.lineHeight();
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = CGMZ.Encyclopedia.PriceText + ": ";
	let descriptor2 = (price == 0) ? CGMZ.Encyclopedia.NoPriceText : $cgmzTemp.numberSplit(price) + " " + TextManager.currencyUnit;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Key item - Always used for item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaKeyItem = function(itype) {
	let y = this.lineHeight()*2;
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = CGMZ.Encyclopedia.KeyItemText + ": ";
	let descriptor2 = (itype == 2) ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Type - Always used for armor, weapon, skill
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaType = function(typeName, typeSymbol, y) {
	switch(typeSymbol) {
		case 'equip':
			var descriptor1 = CGMZ.Encyclopedia.EquipTypeText + ": ";
			break;
		case 'armor':
			var descriptor1 = CGMZ.Encyclopedia.ArmorTypeText + ": ";
			if(typeName === "") typeName = CGMZ.Encyclopedia.NoArmorTypeText;
			break;
		case 'weapon':
			var descriptor1 = CGMZ.Encyclopedia.WeaponTypeText + ": ";
			if(typeName === "") typeName = CGMZ.Encyclopedia.NoWeaponTypeText;
			break;
		case 'skill':
			var descriptor1 = CGMZ.Encyclopedia.SkillTypeText + ": ";
			if(typeName === "") typeName = CGMZ.Encyclopedia.NoSkillTypeText;
	}
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor2 = typeName;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Possession - Always used for item
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaPossession = function(amount) {
	let y = this.lineHeight()*3;
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = CGMZ.Encyclopedia.PossessionText + ": ";
	let descriptor2 = $cgmzTemp.numberSplit(amount);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw Stats - Always used by armors and bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaStats = function(params, yStart, useSign) {
	useSign = useSign || false;
	let sign = "";
	let width = this.contents.width/2; // 2 column display
	for(let i = 0; i < 8; i++) {
		var y = this.lineHeight()*(Math.trunc(i/2));
		var x = (i%2 == 0) ? 0 : width;
		var descriptor1 = TextManager.param(i) + ": ";
		var descriptor2 = $cgmzTemp.numberSplit(params[i]);
		sign = (useSign && params[i] > 0) ? "+" : "";
		this.drawEncyclopediaStandardLine(descriptor1, sign + descriptor2, x, yStart + y, width*(1+i%2));
	}
};
//-----------------------------------------------------------------------------
// Draw exp and gold of an enemy - Always used by the Bestiary
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryRewards = function(exp, gold) {
	let y = this.lineHeight()*6;
	let x = 0;
	let descriptor1 = TextManager.basic(8) + ": "; // full EXP string (not abbr)
	let descriptor2 = $cgmzTemp.numberSplit(exp);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	descriptor1 = TextManager.currencyUnit + ": ";
	descriptor2 = $cgmzTemp.numberSplit(gold);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw dropped items of an enemy - Always used by Bestiary
// Returns y-value of line past last drop.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiaryDrops = function(drops) {
	let width = this.contents.width/2;
	let y = this.lineHeight()*8;
	for(let i =0; i < drops.length; i++) {
		if(drops[i].kind == 0) continue;
		switch(drops[i].kind) {
			case 1: var drop = $dataItems[drops[i].dataId];
				    break;
			case 2: var drop = $dataWeapons[drops[i].dataId];
				    break;
			case 3: var drop = $dataArmors[drops[i].dataId];
		}
		var x = 0;
		this.drawItemName(drop, x, y, width);
		if(CGMZ.Encyclopedia.ShowDropChances) {
			x = width;
			var descriptor = CGMZ.Encyclopedia.DropChanceText + ": ";
			this.changeTextColor(ColorManager.systemColor());
			this.drawText(descriptor, x, y, this.contents.width-x, 'left');
			this.changeTextColor(ColorManager.normalColor());
			x += this.textWidth(descriptor);
			descriptor = ((1/drops[i].denominator)*100).toFixed(2) + "%";
			this.drawText(descriptor, x, y, this.contents.width, 'left');
		}
		y += this.lineHeight();
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw dropped items of an enemy - Always used by Bestiary
// Returns y-value of line past last drop.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaBestiarySketch = function(battlerHue, battlerName, y) {
	let descriptor = CGMZ.Encyclopedia.SketchText + ": ";
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(ColorManager.normalColor());
	y += this.lineHeight();
	if ($gameSystem.isSideView()) {
		this._battlerSprite.bitmap = ImageManager.loadSvEnemy(battlerName);
	} else {
		this._battlerSprite.bitmap = ImageManager.loadEnemy(battlerName);
	}
	let scale = 1;
	if(this._battlerSprite.width > this.contents.width) {
		scale = this.contents.width/this._battlerSprite.width;
	}
	this._battlerSprite.scale.x = scale;
	this._battlerSprite.scale.y = scale;
	this._battlerSprite.setHue(battlerHue);
	this._battlerSprite.y = y;
	this._battlerSprite.x = this.contents.width / 2;
	this._battlerSprite.show();
	y += this._battlerSprite.height;
	return y;
};
//-----------------------------------------------------------------------------
// Draws meta note if applicable. Returns y-value past last line.
// <cgmzdesc:Description Here>
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaMeta = function(meta, y) {
	if(!meta) return y;
	let txtArray = meta.split(" ");
	return this.drawTextArray(y, CGMZ.Encyclopedia.NoteText, txtArray);
};
//-----------------------------------------------------------------------------
// Draws description if applicable. Returns y-value past last line.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaDescription = function(description, y) {
	if(description === "") return y;
	let txtArray = description.split(" ");
	return this.drawTextArray(y, CGMZ.Encyclopedia.DescriptionText, txtArray);
};
//-----------------------------------------------------------------------------
// Draws success rate of an item - used for item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaSuccessRate = function(rate) {
	let y = this.lineHeight()*4;
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = CGMZ.Encyclopedia.SuccessRateText + ": ";
	let descriptor2 = rate + "%";
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws whether item is consumed on use - used for item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaConsumable = function(consumable) {
	let y = this.lineHeight()*5;
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = CGMZ.Encyclopedia.ConsumableText + ": ";
	let descriptor2 = consumable ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws item effects as needed - used for item entries
// Returns y value after drawing the last effect
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaEffects = function(effects, y) {
	if(effects.length < 1) return this.lineHeight()*6;
	let tracker = {"HPv1": 0, "HPv2": 0, "MPv1": 0, "MPv2": 0, "TP": 0, "ADDSTATE": [], "REMOVESTATE": [], "BUFFS": [], "DEBUFFS": [],
				   "REMOVEDBUFFS": [], "REMOVEDDEBUFFS": [], "GROW": [], "LEARNS": []};
	for(let i = 0; i < effects.length; i++) {
		if(effects[i].code == 11) { // HP effect
			tracker.HPv1 += effects[i].value1*100;
			tracker.HPv2 += effects[i].value2;
		}
		else if(effects[i].code == 12) { // MP effect
			tracker.MPv1 += effects[i].value1*100;
			tracker.MPv2 += effects[i].value2;
		}
		else if(effects[i].code == 13) { // TP effect
			tracker.TP += effects[i].value1;
		}
		else if(effects[i].code == 21) { // Add State effect
			if(effects[i].dataId != 0) {
				tracker.ADDSTATE.push(effects[i].dataId);
			}
		}
		else if(effects[i].code == 22) { // Remove State effect
			if(effects[i].dataId != 0) {
				tracker.REMOVESTATE.push(effects[i].dataId);
			}
		}
		else if(effects[i].code == 31) { // Add buff effect
			tracker.BUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 32) { // Add debuff effect
			tracker.DEBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 33) { // Remove buff effect
			tracker.REMOVEDBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 34) { // Remove debuff effect
			tracker.REMOVEDDEBUFFS.push(effects[i].dataId);
		}
		else if(effects[i].code == 42) { // Grow effect
			tracker.GROW.push(effects[i].dataId);
		}
		else if(effects[i].code == 43) { // Learn Skill effect
			tracker.LEARNS.push(effects[i].dataId);
		}
	}
	if(!(tracker.HPv1 != 0 || tracker.HPv2 != 0 || tracker.MPv1 != 0 || tracker.MPv2 != 0 || tracker.TP != 0 || 
	   tracker.ADDSTATE.length > 0 || tracker.REMOVESTATE.length > 0 || tracker.BUFFS.length > 0 || tracker.DEBUFFS.length > 0 || 
	   tracker.REMOVEDBUFFS.length > 0 || tracker.REMOVEDDEBUFFS.length > 0 || tracker.GROW.length > 0 || tracker.LEARNS.length > 0)) {
			return this.lineHeight()*6;
	}
	this.drawEncyclopediaCenteredText(CGMZ.Encyclopedia.EffectsText, y, true);
	y += this.lineHeight();
	let x = 0;
	let width = this.contents.width;
	let descriptor1 = "";
	let descriptor2 = "";
	if(tracker.HPv1 != 0 || tracker.HPv2 != 0) {
		descriptor1 = CGMZ.Encyclopedia.HPEffectText + ": ";
		if(tracker.HPv1 > 100) tracker.HPv1 = 100;
		if(tracker.HPv1 < -100) tracker.HPv1 = -100;
		if(tracker.HPv1 != 0 && tracker.HPv2 != 0) {
			var sign = (tracker.HPv2 > 0) ? "+ " : "- ";
			descriptor2 = tracker.HPv1 + "% " + sign + $cgmzTemp.numberSplit(Math.abs(tracker.HPv2));
		}
		else if(tracker.HPv1 != 0) {
			descriptor2 = tracker.HPv1 + "%";
			if(tracker.HPv1 > 0) descriptor2 = "+" + descriptor2;
		}
		else {
			descriptor2 = $cgmzTemp.numberSplit(tracker.HPv2);
			if(tracker.HPv2 > 0) descriptor2 = "+" + descriptor2;
		}
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.MPv1 != 0 || tracker.MPv2 != 0) {
		descriptor1 = CGMZ.Encyclopedia.MPEffectText + ": ";
		if(tracker.MPv1 > 100) tracker.MPv1 = 100;
		if(tracker.MPv1 < -100) tracker.MPv1 = -100;
		if(tracker.MPv1 != 0 && tracker.MPv2 != 0) {
			var sign = (tracker.MPv2 > 0) ? "+ " : "- ";
			descriptor2 = tracker.MPv1 + "% " + sign + $cgmzTemp.numberSplit(Math.abs(tracker.MPv2));
		}
		else if(tracker.MPv1 != 0) {
			descriptor2 = tracker.MPv1 + "%";
			if(tracker.MPv1 > 0) descriptor2 = "+" + descriptor2;
		}
		else {
			descriptor2 = $cgmzTemp.numberSplit(tracker.MPv2);
			if(tracker.MPv2 > 0) descriptor2 = "+" + descriptor2;
		}
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.TP != 0) {
		descriptor1 = CGMZ.Encyclopedia.TPEffectText + ": ";
		descriptor2 = $cgmzTemp.numberSplit(tracker.TP);
		if(tracker.TP > 0) descriptor2 = "+" + descriptor2;
		this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, width);
		y += this.lineHeight();
	}
	if(tracker.ADDSTATE.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.AddStateText + ": ", x, y, width, tracker.ADDSTATE, 'state');
	}
	if(tracker.REMOVESTATE.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.RemoveStateText + ": ", x, y, width, tracker.REMOVESTATE, 'state');
	}
	if(tracker.BUFFS.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.AddBuffText + ": ", x, y, width, tracker.BUFFS);
	}
	if(tracker.DEBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.AddDebuffText + ": ", x, y, width, tracker.DEBUFFS);
	}
	if(tracker.REMOVEDBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.BuffRemovalText + ": ", x, y, width, tracker.REMOVEDBUFFS);
	}
	if(tracker.REMOVEDDEBUFFS.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.DebuffRemovalText + ": ", x, y, width, tracker.REMOVEDDEBUFFS);
	}
	if(tracker.GROW.length > 0) {
		y = this.drawBuffParameters(CGMZ.Encyclopedia.GrowText + ": ", x, y, width, tracker.GROW);
	}
	if(tracker.LEARNS.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.LearnSkillText + ": ", x, y, width, tracker.LEARNS, 'skill');
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draw Buff Parameters - Draws buffs/debuffs with enough space on line
// Returns y value below last line drawn
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawBuffParameters = function(descriptor, x, y, width, buffArray) {
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, x, y, width, 'left');
	this.changeTextColor(ColorManager.normalColor());
	x += this.textWidth(descriptor);
	for(let i = 0; i < buffArray.length; i++) {
		var txt = TextManager.param(buffArray[i]);
		if(buffArray.length > i+1) txt += ", ";
		if(this.textWidth(txt) + x > width) {
			y += this.lineHeight();
			x = 0;
		}
		this.drawText(txt, x, y, width, 'left');
		x += this.textWidth(txt);
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw Trait - draws a trait such as attack element or party ability
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawEncyclopediaTrait = function(traits, y) {
	if(traits.length < 1) return y;
	let tracker = {"ATKSPEED": 0, "ATKTIMES": 0, "ATKELEMENT": [], "ATKSTATES": [], "PARTYABILITY": [],
				   "ADDSKILLTYPES": [], "SEALSKILLTYPES": [], "ADDSKILLS": [], "SEALSKILLS": [], "STATERESIST": []}
	for(let i = 0; i < traits.length; i++) {
		if(traits[i].code == 31) { // Attack Element
			tracker.ATKELEMENT.push($dataSystem["elements"][traits[i].dataId]);
		}
		else if(traits[i].code == 32) { // Attack State
			tracker.ATKSTATES.push(traits[i].dataId);
		}
		else if(traits[i].code == 33) { // Attack Speed
			tracker.ATKSPEED += traits[i].value;
		}
		else if(traits[i].code == 34) { // Attack Times
			tracker.ATKTIMES += traits[i].value;
		}
		else if(traits[i].code == 41) { // Add Skill Type
			tracker.ADDSKILLTYPES.push($dataSystem.skillTypes[traits[i].dataId]);
		}
		else if(traits[i].code == 42) { // Seal Skill Type
			tracker.SEALSKILLTYPES.push($dataSystem.skillTypes[traits[i].dataId]);
		}
		else if(traits[i].code == 43) { // Add Skill
			tracker.ADDSKILLS.push(traits[i].dataId);
		}
		else if(traits[i].code == 44) { // Seal Skill
			tracker.SEALSKILLS.push(traits[i].dataId);
		}
		else if(traits[i].code == 14) { // State Resist
			tracker.STATERESIST.push(traits[i].dataId);
		}
		else if(traits[i].code == 64) { // party ability
			switch(traits[i].dataId) {
				case 0: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.HalfEncounterText);
						break;
				case 1: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.NoEncounterText);
						break;
				case 2: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.CancelSurpriseText);
						break;
				case 3: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.RaisePreemptiveText);
						break;
				case 4: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.GoldDoubleText);
						break;
				case 5: tracker.PARTYABILITY.push(CGMZ.Encyclopedia.DropItemDoubleText);
			}
		}
	}
	if(!(tracker.ATKSPEED != 0 || tracker.ATKTIMES != 0 || tracker.ATKELEMENT.length > 0 || tracker.ATKSTATES.length > 0 ||
	     tracker.PARTYABILITY.length > 0 || tracker.ADDSKILLTYPES.length > 0 || tracker.SEALSKILLTYPES.length > 0 || 
		 tracker.ADDSKILLS.length > 0 || tracker.SEALSKILLS.length > 0 || tracker.STATERESIST.length > 0)) {
		return y;
	}
	if(tracker.ATKSPEED != 0) {
		this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.AttackSpeedText + ": ", tracker.ATKSPEED, 0, y, this.contents.width);
		y += this.lineHeight();
	}
	if(tracker.ATKTIMES != 0) {
		this.drawEncyclopediaStandardLine(CGMZ.Encyclopedia.AttackTimesText + ": ", tracker.ATKTIMES, 0, y, this.contents.width);
		y += this.lineHeight();
	}
	if(tracker.ATKELEMENT.length > 0) {
		y = this.drawTextArray(y, CGMZ.Encyclopedia.ElementText, tracker.ATKELEMENT, ", ");
	}
	if(tracker.ATKSTATES.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.AttackStateText + ": ", 0, y, this.contents.width, tracker.ATKSTATES, 'state');
	}
	if(tracker.PARTYABILITY.length > 0) {
		y = this.drawTextArray(y, CGMZ.Encyclopedia.PartyAbilityText, tracker.PARTYABILITY, ", ");
	}
	if(tracker.SEALSKILLTYPES.length > 0) {
		y = this.drawTextArray(y, CGMZ.Encyclopedia.SealSkillTypesText, tracker.SEALSKILLTYPES, ", ");
	}
	if(tracker.ADDSKILLTYPES.length > 0) {
		y = this.drawTextArray(y, CGMZ.Encyclopedia.AddSkillTypesText, tracker.ADDSKILLTYPES, ", ");
	}
	if(tracker.ADDSKILLS.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.AddSkillText + ": ", 0, y, this.contents.width, tracker.ADDSKILLS, 'skill');
	}
	if(tracker.SEALSKILLS.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.SealSkillText + ": ", 0, y, this.contents.width, tracker.SEALSKILLS, 'skill');
	}
	if(tracker.STATERESIST.length > 0) {
		y = this.drawItemNames(CGMZ.Encyclopedia.StateResistText + ": ", 0, y, this.contents.width, tracker.STATERESIST, 'state');
	}
	return y;
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawSkillCosts = function(mpCost, tpCost) {
	let y = this.lineHeight()*2;
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = CGMZ.Encyclopedia.MPCostText + ": ";
	let descriptor3 = CGMZ.Encyclopedia.TPCostText + ": ";
	let descriptor2 = $cgmzTemp.numberSplit(mpCost);
	let descriptor4 = $cgmzTemp.numberSplit(tpCost);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	this.drawEncyclopediaStandardLine(descriptor3, descriptor4, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws skill tp and mp costs - used for skill/item entries
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawUserTPGain = function(tpGain, y) {
	if(tpGain == 0) return y;
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = CGMZ.Encyclopedia.UserTPGainText + ": ";
	let descriptor2 = $cgmzTemp.numberSplit(tpGain);
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
	y += this.lineHeight();
	return y;
};
//-----------------------------------------------------------------------------
// Draw generic state removal - Always used state entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawStateRemoval = function(removed, descriptor, y) {
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = descriptor + ": ";
	let descriptor2 = (removed) ? CGMZ.Encyclopedia.YesText : CGMZ.Encyclopedia.NoText;
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw auto removal - Always used state entry
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawStateDuration = function(auto, min, max) {
	let y = this.lineHeight();
	let x = (this._largeIconHeight + this.lineHeight() > y) ? this._largeIconWidth + $gameSystem.windowPadding() : 0;
	let descriptor1 = CGMZ.Encyclopedia.DurationText + ": ";
	if(auto) {
		var descriptor2 = (min == max) ? min + " " + CGMZ.Encyclopedia.TurnsText : min + " - " + max + " " + CGMZ.Encyclopedia.TurnsText;
	}
	else {
		var descriptor2 =  CGMZ.Encyclopedia.InfiniteText;
	}
	this.drawEncyclopediaStandardLine(descriptor1, descriptor2, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draws custom description. Some additional parsing required.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawCustomDescription = function(description) {
	let y = this.lineHeight();
	let descriptor = CGMZ.Encyclopedia.DescriptionText + ": ";
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(ColorManager.normalColor());
	let x = this.textWidth(descriptor);
	description = description.substring(1, description.length-1);
	description = description.replace(/\\n/g, " \\n ");
	description = description.replace(/  \\n/g, " \\n");
	let array = description.split(" ");
	let separator = " ";
	for(let i = 0; i < array.length; i++) {
		if(i == array.length - 1) separator = "";
		var tempWidth = this.textWidth(array[i] + separator);
		if(array[i] == "\\n") {
			x = 0;
			y += this.lineHeight();
			continue;
		}
		if(tempWidth + x > this.contents.width) {
			if(tempWidth <= this.contents.width) {
				y += this.lineHeight();
				x = 0;
			}
		}
		this.drawText(array[i] + separator, x, y, this.contents.width-x, 'left');
		x += tempWidth;
	}
	return y + this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draws custom sketch image as sprite.
//-----------------------------------------------------------------------------
CGMZ_Window_EncyclopediaDisplay.prototype.drawCustomBitmap = function(bitmap, y) {
	if(!bitmap) return y;
	let descriptor = CGMZ.Encyclopedia.SketchText + ": ";
	this.changeTextColor(ColorManager.systemColor());
	this.drawText(descriptor, 0, y, this.contents.width, 'left');
	this.changeTextColor(ColorManager.normalColor());
	y += this.lineHeight();
	let split = bitmap.split("/");
	let folder = split[0] + "/" + split[1] + "/";
	let filename = split[2];
	this._battlerSprite.bitmap = ImageManager.loadBitmap(folder, filename);
	let scale = 1;
	if(this._battlerSprite.width > this.contents.width) {
		scale = this.contents.width/this._battlerSprite.width;
	}
	this._battlerSprite.scale.x = scale;
	this._battlerSprite.scale.y = scale;
	this._battlerSprite.y = y;
	this._battlerSprite.x = this.contents.width / 2;
	this._battlerSprite.setHue(0);
	this._battlerSprite.show();
	y += this._battlerSprite.height * scale;
	return y;
};
//=============================================================================
// BattleManager
//-----------------------------------------------------------------------------
// Discover enemies automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover the enemies when battle starts
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    alias_CGMZ_Encyclopedia_BattleManager_setup.call(this, troopId, canEscape, canLose);
	$cgmz.EncyclopediaDiscoverTroop(troopId);
};
//-----------------------------------------------------------------------------
// Alias. Discover the enemies when a turn starts
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    alias_CGMZ_Encyclopedia_BattleManager_startTurn.call(this);
	$gameTroop.members().forEach((enemy) => {
		$cgmz.encyclopediaDiscovery("bestiary", enemy._enemyId);
	});
};
//-----------------------------------------------------------------------------
// Alias. Discover enemies when they are the target of an attack or they attack
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
	alias_CGMZ_Encyclopedia_BattleManager_invokeAction.call(this, subject, target);
	if(target.isEnemy()) {
		$cgmz.encyclopediaDiscovery("bestiary", target._enemyId);
	} else if(subject.isEnemy()) {
		$cgmz.encyclopediaDiscovery("bestiary", subject._enemyId);
	}
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Discover items, weapons, armors automatically.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover items, weapons, armors when party gains them.
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameParty_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
	alias_CGMZ_Encyclopedia_GameParty_gainItem.call(this, item, amount, includeEquip);
    if (DataManager.isItem(item)) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "item");
    } else if (DataManager.isWeapon(item)) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "weapon");
    } else if (DataManager.isArmor(item)) {
        $cgmz.EncyclopediaDiscoverItem(item.id, "armor");
    }
};
//=============================================================================
// Game_Actor
//-----------------------------------------------------------------------------
// Discover skills automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover skills when actor learns skill.
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameActor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    alias_CGMZ_Encyclopedia_GameActor_learnSkill.call(this, skillId);
	$cgmz.EncyclopediaDiscoverSkill(skillId);
};
//=============================================================================
// Game_Battler
//-----------------------------------------------------------------------------
// Discover states automatically
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Discover state when actor or enemy afflicted with one
//-----------------------------------------------------------------------------
const alias_CGMZ_Encyclopedia_GameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
	alias_CGMZ_Encyclopedia_GameBattler_addState.call(this, stateId);
    if(this.isStateAddable(stateId)) {
        $cgmz.EncyclopediaDiscoverState(stateId);
    }
};