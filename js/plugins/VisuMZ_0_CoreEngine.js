//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.37;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.37] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x4cdd=['WIN_OEM_PA1','pMSVQ','vertJS','opacity','processKeyboardEnd','HelpBgType','STENCIL_TEST','Version','VmaCO','stretch','evaluate','onXhrError','_hp','dummyWindowRect','zdHNV','Rnqxm','exec','_destroyInternalTextures','nooEd','isGamepadConnected','original','onload','Renderer','NUMPAD8','Bitmap_gradientFillRect','picture','removeChild','IconSParam8','bgmVolume','_shakeSpeed','ENTER','isItemStyle','yHvbk','PHA','helpAreaTopSideButtonLayout','Scene_MenuBase_helpAreaTop','initialBattleSystem','statusWindowRect','charAt','ColorTPGauge1','IconXParam8','buttonAssistSwitch','toFixed','yxlbA','TimeProgress','IypJy','initCoreEasing','FINAL','Sprite_Button_initialize','_width','initButtonHidden','rZQOE','SystemSetWindowPadding','createButtonAssistWindow','dtiuZ','EYEPV','bgs','CommandBgType','SaveMenu','ParseActorNotetags','isCursorMovable','_mp','WIN_OEM_FJ_LOYA','item','MGthd','Padding','QMQBU','_mapNameWindow','Sprite_Gauge_gaugeRate','buttonAssistWindowSideRect','drawIcon','IconParam2','ItemBackColor2','_pauseSignSprite','font-smooth','indexOf','_listWindow','Spriteset_Base_update','dimColor2','_changingClass','paramFlat','meVolume','XParamVocab9','isSpecialCode','_clickHandler','_sellWindow','checkCacheKey','strokeRect','format','exit','Rate2','writeFile','INQUINT','_shakeDuration','wceoW','Window_Selectable_itemRect','LineHeight','#%1','HASH','clearRect','createSpriteset','Scene_Item_create','InputRect','_onKeyPress','buttonAssistText5','IconSParam9','ParseAllNotetags','ModernControls','Window_NameInput_cursorPageup','SParamVocab8','itemHeight','cursorUp','INQUART','currentExp','_buttonAssistWindow','KeyUnlisted','rowSpacing','VisuMZ_2_BattleSystemSTB','ColorDeath','ARRAYSTRUCT','ParamMax','paramValueByName','WIN_OEM_FJ_TOUROKU','Exported_Script_%1.txt','QoL','Graphics','setEasingType','jjrwM','isFullDocumentTitle','itemBackColor1','updateOpacity','isNwjs','drawActorExpGauge','OPEN_CURLY_BRACKET','CRsHj','xdg-open','OTB','oJkiR','onDatabaseLoaded','performMiss','_storedStack','HIT','OoJZh','none','isPhysical','systemColor','getBattleSystem','Window_Base_drawFace','IDs','applyCoreEasing','cHUmC','MAXHP','COMMA','onKeyDownKeysF6F7','openness','pagedown','Gcyjt','Game_Map_setup','initCoreEngine','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','YhYxK','mainAreaTopSideButtonLayout','26IwVmUM','move','VeZyw','PFOJG','textColor','maxLvGaugeColor1','VceZN','OBAjC','MgbVn','_onKeyDown','_hideTileShadows','clamp','PIRAX','drawRightArrow','_stored_tpGaugeColor1','sin','isPlaytest','targets','adjustSprite','Plus2','ColorTPCost','FZCLD','%1〘Choice\x20%2〙\x20%3%1','oZpPj','GoldOverlap','ObwIH','tab','processKeyboardHome','GRD','UFmko','allowShiftScrolling','buttonAssistKey5','ZnbHJ','ColorExpGauge2','DOWN','text','XParamVocab7','_setupEventHandlers','SideView','CANCEL','SXLKk','viewport','LqRYn','ExportString','atbActive','_closing','startNormalGame','745995eUCDMI','EfgDw','isAlive','buttonAssistOk','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Game_Picture_y','param','getBackgroundOpacity','Bitmap_drawTextOutline','_coreEasingType','AULvH','_forcedBattleSys','Input_shouldPreventDefault','pOTtJ','_movementDuration','FummV','EQUALS','ItemStyle','registerCommand','oSXmT','_backgroundFilter','NUM','repeat','CTB','BTestWeapons','_itemWindow','FontSize','processMoveCommand','LevelUpFullMp','DigitGroupingStandardText','QwertyLayout','setLastPluginCommandInterpreter','_slotWindow','applyForcedGameTroopSettingsCoreEngine','itemHit','LevelUpFullHp','down2','isExpGaugeDrawn','_viewportSize','start','ExtractStrFromList','TextCodeNicknames','makeEncounterCount','shift','PictureFilename','Duration','NONCONVERT','uHbxD','note','getGamepads','OPEN_PAREN','_spriteset','_addShadow','Window_NameInput_processTouch','gameTitle','INOUTELASTIC','forceStencil','hnRHJ','F16','events','drawItem','INOUTQUINT','EQUAL','platform','_refreshBack','Game_Interpreter_command355','ATTN','QGJsC','Game_Picture_x','PGDN','initDigitGrouping','deathColor','command122','updateFauxAnimations','_mode','qOXhU','1094338sCbemU','padZero','command357','catchException','contentsOpacity','Flat2','tcMBa','right','Spriteset_Base_destroy','equips','IconParam3','SCALE_MODES','Chance','areButtonsOutsideMainUI','Bitmap_measureTextWidth','cursorPageup','showDevTools','Window_Base_initialize','_blank','process_VisuMZ_CoreEngine_RegExp','loadTitle2','nzHTU','mapId','updateMove','WindowLayer_render','SParameterFormula','requestMotion','xparamPlus2','setHome','oSIJP','Bitmap_drawCircle','mQQXn','width','Window_StatusBase_drawActorLevel','remove','Game_Picture_initBasic','vTFdP','buttonAreaHeight','MenuBg','Game_Picture_move','openingSpeed','SELECT','consumeItem','children','WIN_OEM_FINISH','randomJS','_clientArea','Symbol','576970uPNtOb','_storedMapText','alpha','stringKeyMap','F12','LUK','rKKPZ','isPressed','Bitmap_blt','length','NameMenu','FdAWB','RequireFocus','MODECHANGE','paramBaseAboveLevel99','$dataMap','_movementWholeDuration','blt','ExtJS','test','sv_enemies','KeyItemProtect','drawSegment','HZsuH','Bitmap_clearRect','onNameOk','SwitchToggleOne','Wait','Input_clear','WIN_ICO_HELP','mev','ParseWeaponNotetags','Game_Picture_show','FZlhT','ZOOM','paramMax','SceneManager_isGameActive','ImgLoad','PWcCD','inbounce','list','setActorHomeRepositioned','PGUP','sparamFlatJS','enableDigitGroupingEx','PictureEasingType','Sprite_AnimationMV_processTimingData','Color','expGaugeColor2','GhZEr','updateDocumentTitle','XgMHB','NewGameCommonEventAll','xZwTI','_cache','responseText','eventsXyNt','WASD','keyMapper','DxzTU','value','ESC','startMove','_profileWindow','QWDna','isItem','drawParamName','Scene_Title_drawGameTitle','Window_Selectable_cursorUp','textWidth','sTFGV','MRF','moveCancelButtonSideButtonLayout','LxxKh','VOUew','SjUmf','ParseClassNotetags','max','F7key','Max','tilesets','initialize','updateAnchor','waiting','CallHandlerJS','isMapScrollLinked','isRepeated','CancelText','F20','setTargetAnchor','Game_Action_itemEva','push','gaugeLineHeight','_stored_hpGaugeColor2','_offsetY','processKeyboardHandling','abs','pagedownShowButton','setupNewGame','setFrame','sv_actors','isGamepadTriggered','INOUTQUAD','Window_Gold_refresh','_number','EYjgJ','SkillMenu','TPB\x20ACTIVE','updateMotion','baLsV','HELP','EnableJS','STB','MAX_GL_TEXTURES','Window_Base_drawText','buttonAssistOffset5','Location','Game_Actor_paramBase','ZERO','Conditional\x20Branch\x20Script\x20Error','INOUTBOUNCE','RdjFw','default','CommandList','XParamVocab5','buttonAssistText3','Window_Selectable_cursorDown','_customModified','isUseModernControls','_refreshPauseSign','Rate1','vertical','Window_NameInput_cursorPagedown','setWindowPadding','join','targetScaleX','StartID','Control\x20Variables\x20Script\x20Error','ProfileRect','RqOcI','ColorMPGauge1','Scene_GameEnd_createBackground','enemy','Rate','RepositionActors','WIN_OEM_PA3','Plus1','powerUpColor','FBuJy','down','process_VisuMZ_CoreEngine_Functions','ihkHm','keyRepeatWait','Scene_MenuBase_createPageButtons','Game_Temp_initialize','_CoreEngineSettings','ColorMaxLvGauge2','gKsbH','pictureButtons','%2%1%3','isEnabled','_statusEquipWindow','InputBgType','optionsWindowRect','ParseTilesetNotetags','ExtractStrFromTroop','ActorRect','NUMPAD4','CodeJS','CustomParamAbb','RepositionEnemies','PeBBK','NewGameCommonEvent','daTXb','itemSuccessRate','dashToggle','LAfMY','battlebacks2','AnimationMirrorOffset','drawGauge','isBusy','framebuffer','aCBez','CustomParamType','EuxGa','itemWindowRect','NBIqA','VszCC','_stored_ctGaugeColor1','OnLoadJS','setupValueFont','%1\x0a','Wtxek','buttonAssistKey4','isHandled','DefaultMode','Game_Interpreter_command122','buttonAssistWindowRect','destroyed','drawCircle','XRYvK','canUse','FREbf','expRate','fadeSpeed','TAB','_baseTexture','RIGHT','GoldChange','setMute','WekFF','Window_NameInput_refresh','ItemBgType','WMSJd','ewjoq','END','MJGfS','fnXno','MAXMP','ParseItemNotetags','NUMPAD5','MenuLayout','UDKql','createFauxAnimationQueue','_offsetX','WIN_OEM_FJ_JISHO','initBasic','retreat','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','replace','playMiss','smallParamFontSize','BgType','oZLXY','ParamChange','Kuksv','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','AgICr','onClick','_registerKeyInput','clearStencil','ihMfF','BTB','Scene_MenuBase_createBackground','IconXParam1','ENTER_SPECIAL','bsZKe','_lastPluginCommandInterpreter','fVomN','OkText','send','onKeyDown','applyEasing','SellBgType','padding','runCombinedScrollingTextAsCode','Window_NameInput_cursorUp','Plus','moveMenuButtonSideButtonLayout','gKDrV','backspace','rgba(0,\x200,\x200,\x200.7)','xparamFlat1','aOssE','mainAreaHeight','DataManager_setupNewGame','COLON','traitObjects','isTriggered','IconParam1','Scene_MenuBase_mainAreaHeight','constructor','enable','name','xfaes','oSCUL','Untitled','processTimingData','Map%1.json','QTiZw','setAnchor','ctrlKey','drawParamText','REC','makeInputButtonString','loadTitle1','AGI','process_VisuMZ_CoreEngine_Notetags','lJhhN','zCaxv','Spriteset_Battle_createEnemies','processKeyboardBackspace','pendingColor','ItnAL','outlineColorDmg','42998GgIytg','DefaultStyle','mzQPQ','EnableNumberInput','aUspQ','_isWindow','application/json','bkBHI','hPrVc','uBSvi','setActionState','Game_Picture_updateMove','paramPlus','dimColor1','calcCoreEasing','PRINT','setBackgroundType','repositionCancelButtonSideButtonLayout','updatePositionCoreEngineShakeRand','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','refresh','OpenConsole','jSdrF','drawTextEx','contents','apply','actor','paramMaxJS','F6key','CategoryRect','KRGKh','save','PAoxE','actorWindowRect','_stored_mpCostColor','tileWidth','smoothSelect','buttonY','originalJS','mainAreaTop','1maiuYx','_currentMap','fGeZx','WIN_OEM_ATTN','OUTBACK','MAT','alwaysDash','gkuRn','OutlineColor','setColorTone','buttonAssistCancel','ColorMaxLvGauge1','NUMPAD3','kvRSV','_upArrowSprite','_internalTextures','ALTGR','PJXGW','IconSet','apOtA','targetY','Sprite_Animation_setViewport','_hovered','ePtuw','Troop%1','WIN_OEM_WSCTRL','_realScale','keypress','PIPE','\x5c}❪SHIFT❫\x5c{','_refreshArrows','darwin','INCUBIC','WIN_OEM_ENLW','Game_Actor_levelUp','categoryWindowRect','zFjgH','Scene_Name_onInputOk','catchLoadError','954658jrkEwU','playOk','Scene_Battle_createCancelButton','PkQWx','levelUpRecovery','_stored_deathColor','LRBit','doesNameContainBannedWords','ParamName','loadGameImagesCoreEngine','_pollGamepads','Type','SUBTRACT','startShake','targetScaleY','SideButtons','dtuTJ','MULTIPLY','terms','Scene_Skill_create','calcEasing','mpColor','_stored_expGaugeColor1','connected','HzYjf','XParamVocab4','isSideView','skillTypes','PreserveNumbers','JsbiI','JXtym','successRate','isMenuButtonAssistEnabled','_stored_pendingColor','442224RsZXVu','ctGaugeColor1','_pressed','REPLACE','startAnimation','drawBackgroundRect','Scene_Battle_createSpriteset','BACK_QUOTE','ColorManager_loadWindowskin','backgroundBitmap','BannedWords','updatePositionCoreEngineShakeOriginal','QZyTe','SHIFT','XParameterFormula','AnZMQ','Keyboard','_paramPlus','text%1','keyboard','Scene_Map_updateScene','PDR','vfTBF','Icon','bitmapWidth','xparamRate2','snapForBackground','GqFrM','missed','lWFhs','YVclj','isMaskingEnabled','isNormalPriority','ArbWw','SwitchRandomizeRange','IconSParam0','xparam','KzsbZ','jEgXh','xparamRate','Flat1','LrlqQ','OptionsRect','drawActorLevel','OhIAM','_stored_ctGaugeColor2','ojBaG','_context','isBottomButtonMode','IconXParam5','cursorRight','_targetOffsetY','FUNC','normalColor','SceneManager_initialize','updateCoreEasing','Game_Event_isCollidedWithEvents','OGyqm','_skillTypeWindow','VOLUME_MUTE','uVRke','xScrollLinkedOffset','ParseArmorNotetags','xquyt','nickname','currentLevelExp','processTouchModernControls','inBattle','MRG','sgDku','Scene_Name_create','makeAutoBattleActions','Unnamed','updateDashToggle','RKuqj','Gold','EJXIl','PositionJS','Scene_Boot_onDatabaseLoaded','fAWGw','GoldMax','_statusWindow','PA1','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','GyJeh','ExportStrFromAllMaps','processKeyboardDigitChange','StatusEquipBgType','uyALv','(\x5cd+)>','SCROLL_LOCK','GoldRect','BcgVj','HYPHEN_MINUS','innerWidth','Map%1','displayX','drawGoldItemStyle','xparamFlatBonus','random','initMembers','_stored_maxLvGaugeColor2','Game_Actor_changeClass','xnrUC','_inputWindow','eva','BattleSystem','RKbFS','markCoreEngineModified','refreshDimmerBitmap','areTileShadowsHidden','MDF','playTestF7','updateKeyText','LtAAD','OUTELASTIC','ASTERISK','powerDownColor','subjectHitRate','SystemLoadAudio','Graphics_centerElement','createTitleButtons','XrZPK','Game_Interpreter_command111','fgcpN','zAbRW','ALWAYS','boxHeight','zbDuE','([\x5c+\x5c-]\x5cd+)([%％])>','wlDQw','option','ParamArrow','isBottomHelpMode','_inputString','Key%1','processHandling','tjcwk','updateShadow','CommandRect','RevertPreserveNumbers','CRI','buttonAssistText1','buttonAssistKey%1','ctrl','createTextState','maxBattleMembers','updatePositionCoreEngineShakeHorz','pHeOk','OpenSpeed','fillStyle','ioEur','mZPfo','filter','OUTQUAD','crgBj','origin','ConvertNumberToString','VisuMZ_2_BattleSystemBTB','SellRect','1134045eBsUuz','bitmap','titles2','xysIt','getButtonAssistLocation','isNextScene','_coreEasing','MWVmB','substring','Scene_MenuBase_createCancelButton','WvMys','Total','buttonAssistOffset1','IconSParam5','LINEAR','ttSEX','goldWindowRect','loadPicture','playTestF6','MAX_SAFE_INTEGER','ListRect','_cancelButton','outlineColorGauge','Ixbbi','loxWv','Spriteset_Base_initialize','IconSParam2','IpQpl','processDigitChange','deselect','RowSpacing','levelUp','ewXgK','CAPSLOCK','<%1\x20%2:[\x20]','xparamFlat2','Scene_Boot_updateDocumentTitle','Game_Picture_calcEasing','setEnemyAction','updatePictureAntiZoom','Window_ShopSell_isEnabled','ZQFkl','params','Page','getLevel','initCoreEngineScreenShake','includes','aCEvR','GameEnd','OHJqy','MEV','outlineColor','aDZhI','checkSmartEventCollision','translucentOpacity','kSHdf','endAnimation','jsQuickFunc','BHFxT','NUMPAD0','EncounterRateMinimum','makeCoreEngineCommandList','CTRL','setViewportCoreEngineFix','targetSpritePosition','command105','sqrt','hHpKe','SwitchRandomizeOne','_backSprite1','ColorMPCost','command111','requestFauxAnimation','QuEfE','dFJdb','numActions','resetFontSettings','_dimmerSprite','DigitGroupingExText','createCustomParameter','TCR','ColorCrisis','match','〘Common\x20Event\x20%1:\x20%2〙\x20End','QUOTE','enemies','cancel','_createInternalTextures','Tyous','_fauxAnimationSprites','movePageButtonSideButtonLayout','escape','Game_System_initialize','setBattleSystem','RegExp','WIN_OEM_RESET','buttonAssistWindowButtonRect','PJgPz','paramFlatJS','SystemSetBattleSystem','outbounce','SPACE','RightMenus','paramName','anchor','isMaxLevel','image-rendering','PRINTSCREEN','Game_Character_processMoveCommand','_moveEasingType','SParamVocab3','Sprite_Picture_updateOrigin','Game_Interpreter_command105','uiAreaHeight','KANA','scaleMode','DisplayedParams','ParseStateNotetags','isAnimationForEach','data/','Window_NameInput_processHandling','INOUTBACK','updateOrigin','processCursorMove','ActorBgType','drawText','%1〘Choice\x20Cancel〙%1','iconHeight','_battlerName','clearCachedKeys','offsetX','centerSprite','QbNdO','oTNrR','INBACK','style','DhcMB','isFauxAnimationPlaying','setValue','ItemHeight','iconWidth','CreateBattleSystemID','_data','XParamVocab6','isArrowPressed','showFauxAnimations','mainAreaHeightSideButtonLayout','dBiWX','EscapeAlways','FDR','kiaQg','_colorTone','hit','forceOutOfPlaytest','DECIMAL','qWzEz','ListBgType','filterArea','MCR','OUTQUINT','tJcoL','getLastPluginCommandInterpreter','reservePlayTestNewGameCommonEvent','PLAY','Window_NumberInput_processDigitChange','BottomButtons','Input_update','VSien','isRightInputMode','titles1','buttonAssistText2','initMembersCoreEngine','_coreEngineShakeStyle','horizontal','_opening','StatusBgType','pictureId','INOUTSINE','PnGJK','INSERT','_digitGroupingEx','ARRAYSTR','IconSParam3','setAction','bOgaj','_anchor','ImprovedAccuracySystem','update','useDigitGrouping','GetParamIcon','sDAri','updatePlayTestF7','canEquip','Scene_Boot_loadSystemImages','updateMain','usableSkills','toLowerCase','setClickHandler','maxLevel','child_process','keyCode','SnapshotOpacity','XjPaX','EvZYl','SkucB','Sprite_Battler_startMove','makeDeepCopy','WIN_ICO_CLEAR','BattleManager_processEscape','dZonB','_playTestFastMode','Tilemap_addShadow','ButtonAssist','_maxDigits','iWMzE','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','VisuMZ_2_BattleSystemFTB','Scene_Map_updateMainMultiply','XParamVocab1','_isPlaytest','optSideView','sparamPlus1','onEscapeSuccess','MainMenu','F21','XParamVocab2','toUpperCase','AHcEK','LEFT','Window_Base_update','CategoryBgType','rzOTy','BoxMargin','SParamVocab4','Input_setupEventHandlers','TitleCommandList','DashToggleR','offsetY','EVA','%1/','split','guardSkillId','SceneManager_onKeyDown','DATABASE','tpColor','DamageColor','WqZTS','AutoStretch','_goldWindow','Scene_Equip_create','CustomParamNames','ctGaugeColor2','createCustomBackgroundImages','ubAvN','EXECUTE','ShowDevTools','_centerElement','drawAllParams','_updateFilterArea','jwcOS','BasicParameterFormula','tpGaugeColor1','duration','BackOpacity','_commonEventLayers','setupCoreEasing','level','home','VisuMZ_2_BattleSystemCTB','BTestItems','EndingID','OUTCIRC','_fauxAnimationQueue','HdmOy','numberShowButton','useDigitGroupingEx','inputWindowRect','altKey','erasePicture','updateEffekseer','SlotBgType','wKANM','NuqmH','CLEAR','enter','_isButtonHidden','itemLineRect','onInputOk','changeTextColor','LESS_THAN','yScrollLinkedOffset','gSGRa','sparamFlatBonus','enableDigitGrouping','SystemLoadImages','createDigits','_backSprite2','_bitmap','traitsPi','MGbvr','cos','height','_drawTextShadow','_repositioned','ShowButtons','_forcedTroopView','isAnimationOffsetXMirrored','process_VisuMZ_CoreEngine_CustomParameters','LZybE','doByB','buttonAssistOffset4','worldTransform','initialLevel','HelpRect','qbgmf','createPageButtons','isMVAnimation','Sprite_Button_updateOpacity','process_VisuMZ_CoreEngine_Settings','FJnut','AntiZoomPictures','LTxkG','log','animationShouldMirror','_pictureContainer','DEF','command355','left','imageSmoothingEnabled','zIYOi','makeTargetSprites','paramRateJS','TextFmt','HvyyL','determineSideButtonLayoutValid','_muteSound','makeCommandList','_backgroundSprite','isGameActive','vQsfN','DimColor2','_actor','WIN_OEM_CLEAR','edHtz','playCursor','_actorWindow','XuBFd','ceil','Window_NameInput_cursorDown','aEecA','drawActorSimpleStatus','StatusMenu','setSkill','ACtne','status','Window_Selectable_processTouch','JSON','dMvTq','Graphics_defaultStretchMode','F19','Window_StatusBase_drawActorSimpleStatus','drawFace','startAutoNewGame','setupCoreEngine','isGamepadButtonPressed','INBOUNCE','_digitGrouping','ONE','loadWindowskin','mainAreaBottom','HRG','isEnemy','paramchangeTextColor','onInputBannedWords','isCancelled','currentValue','zYQIk','repositionEnemiesByResolution','KeyboardInput','CIRCUMFLEX','pressed','GoldIcon','integer','OptionsMenu','OutlineColorGauge','_centerElementCoreEngine','rgba(0,\x200,\x200,\x201.0)','rirgO','_scene','paramRate','pop','SystemSetFontSize','result','setSideView','buttonAssistText4','damageColor','parameters','OutlineColorDmg','Sprite_Gauge_currentValue','commandWindowRows','isKeyItem','hideButtonFromView','stypeId','QNHTd','ShopMenu','STRUCT','dbzAq','valueOutlineColor','currencyUnit','_dummyWindow','HPZXW','Game_BattlerBase_refresh','description','createEnemies','key%1','volume','WIN_OEM_COPY','rflih','createFauxAnimationSprite','buttons','INOUTCUBIC','trim','MINUS','menuShowButton','_stored_normalColor','parse','makeDocumentTitle','QEzxI','isCollidedWithEvents','drawCurrencyValue','_helpWindow','Window_EquipItem_isEnabled','CustomParamIcons','HCDjr','StatusRect','targetOpacity','randomInt','ColorNormal','_inputSpecialKeyCode','UwJIQ','fUcOg','Game_Interpreter_PluginCommand','_windowskin','reduce','NumberBgType','(\x5cd+\x5c.?\x5cd+)>','addWindow','IconParam5','characters','_sideButtonLayout','pvknn','YNvvQ','ScreenShake','LoadMenu','en-US','_defaultStretchMode','stencilOp','CEV','Bitmap_fillRect','TextCodeClassNames','PictureEraseAll','nniNA','Scene_Map_createMenuButton','helpAreaTop','_downArrowSprite','retrieveFauxAnimation','_gamepadWait','onerror','skillTypeWindowRect','JvLqI','ccIqx','_cacheScaleX','ExportCurTroopText','mpGaugeColor1','XParamVocab0','pages','Power','_active','rightArrowWidth','process_VisuMZ_CoreEngine_jsQuickFunctions','WIN_ICO_00','helpAreaHeight','BgFilename2','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','ARRAYEVAL','KEEP','_stored_expGaugeColor2','QyPgT','goto','Spriteset_Base_updatePosition','GET','EnableNameInput','map','DOLLAR','processCursorHomeEndTrigger','_screenX','META','pWEMU','CNT','ONE_MINUS_SRC_ALPHA','ItemPadding','makeFontSmaller','_stored_hpGaugeColor1','_screenY','SystemSetSideView','getCustomBackgroundSettings','BLnIh','ParseSkillNotetags','ShowJS','IconParam6','seVolume','gainGold','processKeyboardDelete','maxCols','ZOZma','isPlaying','IconXParam0','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','Scene_Battle_update','OUTCUBIC','concat','battlebacks1','_shakePower','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','TextStr','UhEzm','SwitchActorText','helpAreaBottom','hpGaugeColor2','OMXYY','Graphics_printError','xSlzG','catchUnknownError','performEscape','background','LSbVx','Scene_Base_createWindowLayer','createWindowLayer','QfahS','ApplyEasing','yfjCy','faces','learnings','drawGameSubtitle','_editWindow','sellWindowRect','round','drawGameVersion','ColorHPGauge1','listWindowRect','pageup','RCNyJ','processEscape','bwZpg','cursorPagedown','AINip','innerHeight','Bitmap_drawText','targetContentsOpacity','DrawItemBackgroundJS','Window_Selectable_processCursorMove','active','destroy','EXSEL','OUTQUART','itemPadding','pow','addChild','targetBackOpacity','Scene_Shop_create','drawValue','iIDYn','WIN_OEM_CUSEL','renderNoMask','INSINE','MXzes','_tempActor','OUTEXPO','NEAREST','Window_NumberInput_start','button','itemRect','McoXQ','EXR','sparamRate','layoutSettings','code','BlurFilter','ButtonFadeSpeed','img/%1/','wAkoC','Scene_MenuBase_mainAreaTop','fromCharCode','tpCostColor','DrawIcons','ColSpacing','ErFHH','windowPadding','TextJS','clear','PixelateImageRendering','openURL','WIN_OEM_FJ_ROYA','Enemy','DmDuK','number','BuyRect','buttonAssistKey1','ZWMaX','ExportAllTroopText','ExportStrFromAllTroops','MQxxF','index','skipBranch','StatusEquipRect','Scene_Boot_startNormalGame','_categoryWindow','paramFlatBonus','ACCEPT','sparamPlusJS','〘Common\x20Event\x20%1:\x20%2〙\x20Start','SParamVocab7','_list','MDR','Window_NameInput_cursorRight','fillRect','ACWrh','wBuFp','itemBackColor2','visible','BgFilename1','areButtonsHidden','crisisColor','OpenURL','clearForcedGameTroopSettingsCoreEngine','pictures','obmXy','NumberRect','paramWidth','ColorSystem','sdOnb','BACKSPACE','defaultInputMode','playCursorSound','maxItems','win32','toString','resetBattleSystem','ExtractStrFromMap','Enable','_optionsWindow','parseForcedGameTroopSettingsCoreEngine','show','isNumpadPressed','VisuMZ_2_BattleSystemOTB','setViewport','PERCENT','removeFauxAnimation','Bitmap_strokeRect','SParamVocab2','commandWindowRect','Manual','Settings','PPCfD','setupButtonImage','buttonAssistKey3','ActorMPColor','【%1】\x0a','CrisisRate','SEMICOLON','menu','UDpgw','toLocaleString','_hideButtons','playBuzzer','ATK','_effectsContainer','Scene_Map_initialize','IconXParam9','buttonAssistOffset%1','render','faceWidth','context','Window','ColorGaugeBack','defineProperty','Script\x20Call\x20Error','_cacheScaleY','updateClose','exportAllTroopStrings','makeActionList','playEscape','title','Game_BattlerBase_initMembers','Scene_Menu_create','ConvertParams','ParseEnemyNotetags','isWindowMaskingEnabled','mNdGb','moveRelativeToResolutionChange','xparamRate1','(\x5cd+)([%％])>','min','sparamPlus','itemEva','getColorDataFromPluginParameters','fontSize','Flat','mainFontSize','xnMVu','TILDE','WNQiE','Window_Base_drawCharacter','STttQ','TranslucentOpacity','_animation','\x5c}❪TAB❫\x5c{','targetObjects','gaugeBackColor','sparamPlus2','getInputMultiButtonStrings','initVisuMZCoreEngine','_timerSprite','clearZoom','subject','wusUS','OhpGq','addCommand','lineHeight','CommandWidth','select','WpXyJ','updateLastTarget','createJsQuickFunction','gaugeRate','WIN_OEM_JUMP','evade','isDying','Window_Base_createTextState','updatePositionCoreEngineShakeVert','FadeSpeed','processFauxAnimationRequests','TRG','TextManager_param','XUxay','_playtestF7Looping','advanced','updatePosition','mmp','pffJL','INELASTIC','_commandWindow','buttonAssistText%1','skills','XParamVocab3','bind','AkRwz','WTYbI','top','valueOutlineWidth','blockWidth','TitlePicButtons','createCommandWindow','animationId','Basic','DigitGroupingGaugeSprites','_colorCache','processTouch','add','GoldFontSize','drawCharacter','Subtitle','sparam','Game_Troop_setup','DISoK','create','createDimmerSprite','Scene_Map_createSpriteset','EditBgType','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','_commandList','_mirror','NewGameBoot','DummyBgType','xparamPlusJS','createCancelButton','isOpenAndActive','SlotRect','xparamPlus1','shake','createFauxAnimation','jHesp','animations','LzzDF','QUESTION_MARK','printError','jwFth','removeAllFauxAnimations','Window_Base_drawIcon','cursorLeft','Actor','getCombinedScrollingText','setCoreEngineUpdateWindowBg','BaseTexture','TfIpS','setMoveEasingType','call','_stored_mpGaugeColor2','isSideButtonLayout','Scene_Status_create','blendFunc','itemHitImprovedAccuracy','_height','contains','Bitmap_resize','processSoundTimings','Linear','ActorTPColor','STENCIL_BUFFER_BIT','FontShadows','DigitGroupingDamageSprites','setHandler','Window_Selectable_drawBackgroundRect','xparamPlus','open','getInputButtonString','getCoreEngineScreenShakeStyle','0.00','helpWindowRect','floor','_statusParamsWindow','Param','skillId','paramX','CEmjF','uJHlJ','reserveNewGameCommonEvent','gradientFillRect','measureTextWidth','isSmartEventCollisionOn','pNSGm','onButtonImageLoad','subtitle','AccuracyBoost','_duration','stencilFunc','GoldBgType','_numberWindow','tileHeight','MZdoX','NUMPAD2','IconSParam6','Sprite_destroy','animationBaseDelay','ARRAYNUM','FmWii','boxWidth','Game_Action_updateLastTarget','center','updatePositionCoreEngine','\x0a\x0a\x0a\x0a\x0a','expGaugeColor1','filters','slice','maxGold','Game_Action_itemHit','GroupDigits','changeClass','INOUTCIRC','version','loadBitmap','mpGaugeColor2','_stored_powerUpColor','PERIOD','OUTSINE','storeMapData','ItemMenu','processCursorMoveModernControls','createBackground','isOptionValid','TGR','JUNJA','VoDdz','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','SwitchToggleRange','Sprite_Animation_processSoundTimings','SParamVocab0','sparamRate2','resize','DIVIDE','paramY','processAlwaysEscape','CONTEXT_MENU','OptionsBgType','HZESg','tIDAu','Lohfo','jyJKp','prototype','switchModes','URL','numberWindowRect','adjustPictureAntiZoom','beenq','CoreEngine','ItemRect','isActor','PLUS','xparamRateJS','Game_Party_consumeItem','OPEN_BRACKET','Input_pollGamepads','isTpb','gainItem','bgsVolume','normal','FERGr','SLEEP','currentClass','KeyTAB','maxLvGaugeColor2','_drawTextOutline','loadMapData','pkQnL','system','nw.gui','paramBase','Title','bitmapHeight','setAttack','DummyRect','end','flush','focus','Window_NameInput_initialize','quARW','batch','MultiKeyFmt','scaleSprite','transform','drawIconBySize','mainCommandWidth','sparamFlat1','NUMPAD6','textSizeEx','_baseSprite','scale','Sprite_Actor_setActorHome','lWXvi','createBuffer','asin','_targetOffsetX','backOpacity','_pageupButton','charCode','_index','MtyHa','DELETE','processBack','INOUTQUART','AllTroops','horzJS','resetTextColor','_targetAnchor','drawGameTitle','addChildToBack','KeySHIFT','_stored_systemColor','VOLUME_DOWN','_buyWindow','loadSystemImages','cursorDown','encounterStep','PAUSE','createMenuButton','setMainFontSize','setBackgroundOpacity','addLoadListener','LvExpGauge','cSpBj','_stored_crisisColor','setCoreEngineScreenShakeStyle','isTouchedInsideFrame','encounterStepsMinimum','setup','INOUTEXPO','NameInputMessage','<JS\x20%1\x20%2:[\x20](.*)>','FTB','updateBackOpacity','type','isMagical','hAZTD','reserveCommonEvent','Scene_Options_create','parallaxes','FunctionName','VzMIx','onMoveEnd','_windowLayer'];const _0x2ef904=_0xd003;function _0xd003(_0x55712b,_0xd77410){_0x55712b=_0x55712b-0x13d;let _0x4cdd82=_0x4cdd[_0x55712b];return _0x4cdd82;}(function(_0x20c69c,_0x93430f){const _0x32d49b=_0xd003;while(!![]){try{const _0x22cd2a=parseInt(_0x32d49b(0x262))+-parseInt(_0x32d49b(0x829))*-parseInt(_0x32d49b(0x23b))+-parseInt(_0x32d49b(0x324))+parseInt(_0x32d49b(0x859))+parseInt(_0x32d49b(0x7ae))*-parseInt(_0x32d49b(0x213))+parseInt(_0x32d49b(0x7dd))+-parseInt(_0x32d49b(0x284));if(_0x22cd2a===_0x93430f)break;else _0x20c69c['push'](_0x20c69c['shift']());}catch(_0x5c47e3){_0x20c69c['push'](_0x20c69c['shift']());}}}(_0x4cdd,0xa5770));var label=_0x2ef904(0x6ac),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2ef904(0x31d)](function(_0x505b82){const _0x1abd20=_0x2ef904;return _0x505b82[_0x1abd20(0x486)]&&_0x505b82[_0x1abd20(0x4c0)][_0x1abd20(0x352)]('['+label+']');})[0x0];VisuMZ[label][_0x2ef904(0x5ba)]=VisuMZ[label][_0x2ef904(0x5ba)]||{},VisuMZ['ConvertParams']=function(_0x532235,_0x13f479){const _0x2fb451=_0x2ef904;for(const _0x443fa2 in _0x13f479){if(_0x443fa2['match'](/(.*):(.*)/i)){if(_0x2fb451(0x485)===_0x2fb451(0x1a6)){function _0x24c463(){const _0x44d8ce=_0x2fb451;_0x51c956&&_0x52ccfd&&_0x4ec18c[_0x44d8ce(0x80d)]&&this[_0x44d8ce(0x5af)](_0x49ae90[_0x44d8ce(0x80d)]);const _0x1ef077=_0x1b1658[_0x58de1f];_0x1ef077&&this['parseForcedGameTroopSettingsCoreEngine'](_0x1ef077[_0x44d8ce(0x1fd)]);}}else{const _0x44c00c=String(RegExp['$1']),_0x468ae9=String(RegExp['$2'])[_0x2fb451(0x406)]()[_0x2fb451(0x4c9)]();let _0x451238,_0x15b750,_0x544d05;switch(_0x468ae9){case _0x2fb451(0x7f2):_0x451238=_0x13f479[_0x443fa2]!==''?Number(_0x13f479[_0x443fa2]):0x0;break;case _0x2fb451(0x67a):_0x15b750=_0x13f479[_0x443fa2]!==''?JSON[_0x2fb451(0x4cd)](_0x13f479[_0x443fa2]):[],_0x451238=_0x15b750[_0x2fb451(0x510)](_0x2776ba=>Number(_0x2776ba));break;case'EVAL':_0x451238=_0x13f479[_0x443fa2]!==''?eval(_0x13f479[_0x443fa2]):null;break;case _0x2fb451(0x508):_0x15b750=_0x13f479[_0x443fa2]!==''?JSON[_0x2fb451(0x4cd)](_0x13f479[_0x443fa2]):[],_0x451238=_0x15b750[_0x2fb451(0x510)](_0x4b7bec=>eval(_0x4b7bec));break;case _0x2fb451(0x488):_0x451238=_0x13f479[_0x443fa2]!==''?JSON[_0x2fb451(0x4cd)](_0x13f479[_0x443fa2]):'';break;case'ARRAYJSON':_0x15b750=_0x13f479[_0x443fa2]!==''?JSON[_0x2fb451(0x4cd)](_0x13f479[_0x443fa2]):[],_0x451238=_0x15b750['map'](_0x3f1ca5=>JSON[_0x2fb451(0x4cd)](_0x3f1ca5));break;case _0x2fb451(0x2b8):_0x451238=_0x13f479[_0x443fa2]!==''?new Function(JSON['parse'](_0x13f479[_0x443fa2])):new Function('return\x200');break;case'ARRAYFUNC':_0x15b750=_0x13f479[_0x443fa2]!==''?JSON['parse'](_0x13f479[_0x443fa2]):[],_0x451238=_0x15b750['map'](_0x3957bc=>new Function(JSON[_0x2fb451(0x4cd)](_0x3957bc)));break;case'STR':_0x451238=_0x13f479[_0x443fa2]!==''?String(_0x13f479[_0x443fa2]):'';break;case _0x2fb451(0x3d9):_0x15b750=_0x13f479[_0x443fa2]!==''?JSON[_0x2fb451(0x4cd)](_0x13f479[_0x443fa2]):[],_0x451238=_0x15b750['map'](_0x1f69fb=>String(_0x1f69fb));break;case _0x2fb451(0x4b9):_0x544d05=_0x13f479[_0x443fa2]!==''?JSON[_0x2fb451(0x4cd)](_0x13f479[_0x443fa2]):{},_0x532235[_0x44c00c]={},VisuMZ[_0x2fb451(0x5db)](_0x532235[_0x44c00c],_0x544d05);continue;case _0x2fb451(0x783):_0x15b750=_0x13f479[_0x443fa2]!==''?JSON[_0x2fb451(0x4cd)](_0x13f479[_0x443fa2]):[],_0x451238=_0x15b750[_0x2fb451(0x510)](_0x191e04=>VisuMZ[_0x2fb451(0x5db)]({},JSON['parse'](_0x191e04)));break;default:continue;}_0x532235[_0x44c00c]=_0x451238;}}}return _0x532235;},(_0x7cd8d6=>{const _0x5594c8=_0x2ef904,_0x60e7b6=_0x7cd8d6['name'];for(const _0x4757cc of dependencies){if(!Imported[_0x4757cc]){alert(_0x5594c8(0x7e1)[_0x5594c8(0x764)](_0x60e7b6,_0x4757cc)),SceneManager[_0x5594c8(0x765)]();break;}}const _0x1615f6=_0x7cd8d6[_0x5594c8(0x4c0)];if(_0x1615f6[_0x5594c8(0x376)](/\[Version[ ](.*?)\]/i)){if(_0x5594c8(0x7d8)!==_0x5594c8(0x7d8)){function _0x561f0a(){const _0x580a5c=_0x5594c8;return this['areButtonsHidden']()||this[_0x580a5c(0x64c)]();}}else{const _0x598e9b=Number(RegExp['$1']);if(_0x598e9b!==VisuMZ[label]['version']){if(_0x5594c8(0x421)===_0x5594c8(0x3ee)){function _0x1c9a7b(){const _0x40129b=_0x5594c8;return this[_0x40129b(0x74b)]()[_0x40129b(0x281)]*0.01;}}else alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x5594c8(0x764)](_0x60e7b6,_0x598e9b)),SceneManager['exit']();}}}if(_0x1615f6[_0x5594c8(0x376)](/\[Tier[ ](\d+)\]/i)){if(_0x5594c8(0x203)!==_0x5594c8(0x5a4)){const _0x3e0233=Number(RegExp['$1']);_0x3e0233<tier?(alert(_0x5594c8(0x52f)[_0x5594c8(0x764)](_0x60e7b6,_0x3e0233,tier)),SceneManager['exit']()):tier=Math[_0x5594c8(0x8a6)](_0x3e0233,tier);}else{function _0x14af09(){const _0x4eab7b=_0x5594c8,_0x289976=_0x22a37d[_0x4eab7b(0x2e4)]()*_0x421095[_0x4eab7b(0x236)]();return this['_x']-_0x289976;}}}VisuMZ[_0x5594c8(0x5db)](VisuMZ[label]['Settings'],_0x7cd8d6['parameters']);})(pluginData),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],'ExportAllMapText',_0x49d28f=>{const _0x344c5e=_0x2ef904;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x344c5e(0x78f)]())return;SceneManager[_0x344c5e(0x4a8)][_0x344c5e(0x501)]=![],VisuMZ['CoreEngine'][_0x344c5e(0x2d9)]();}),PluginManager[_0x2ef904(0x7ef)](pluginData['name'],_0x2ef904(0x585),_0x2fd4cf=>{const _0x471109=_0x2ef904;if(!$gameTemp[_0x471109(0x7be)]())return;if(!Utils[_0x471109(0x78f)]())return;SceneManager[_0x471109(0x4a8)][_0x471109(0x501)]=![],VisuMZ[_0x471109(0x6ac)]['ExportStrFromAllTroops']();}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],'ExportCurMapText',_0xc741bc=>{const _0x5b2012=_0x2ef904;if(!$gameTemp[_0x5b2012(0x7be)]())return;if(!Utils[_0x5b2012(0x78f)]())return;if(!$gameMap)return;if($gameMap[_0x5b2012(0x83f)]()<=0x0)return;VisuMZ[_0x5b2012(0x5db)](_0xc741bc,_0xc741bc);const _0xf67274=_0x5b2012(0x2e3)[_0x5b2012(0x764)]($gameMap[_0x5b2012(0x83f)]()[_0x5b2012(0x82a)](0x3)),_0x19298e=VisuMZ[_0x5b2012(0x6ac)]['ExtractStrFromMap']($gameMap[_0x5b2012(0x83f)]());VisuMZ[_0x5b2012(0x6ac)][_0x5b2012(0x7d9)](_0x19298e,_0xf67274,!![]);}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x4fc),_0x4c18a9=>{const _0x3358f4=_0x2ef904;if(!$gameTemp[_0x3358f4(0x7be)]())return;if(!Utils[_0x3358f4(0x78f)]())return;if(!$gameParty[_0x3358f4(0x2c7)]())return;VisuMZ[_0x3358f4(0x5db)](_0x4c18a9,_0x4c18a9);const _0x49d0f8=_0x3358f4(0x253)['format']($gameTroop['_troopId'][_0x3358f4(0x82a)](0x4)),_0x4d1275=VisuMZ[_0x3358f4(0x6ac)][_0x3358f4(0x191)]($gameTroop['_troopId']);VisuMZ[_0x3358f4(0x6ac)][_0x3358f4(0x7d9)](_0x4d1275,_0x49d0f8,!![]);}),VisuMZ[_0x2ef904(0x6ac)]['ExportString']=function(_0x4e47f8,_0x2ec563,_0x25a2f8){const _0x2ee262=_0x2ef904,_0x1b9601=require('fs');let _0x5772a7='Exported_Script_%1.txt'[_0x2ee262(0x764)](_0x2ec563||'0');_0x1b9601[_0x2ee262(0x767)](_0x5772a7,_0x4e47f8,_0x2540f6=>{const _0x25d375=_0x2ee262;if(_0x2540f6)throw err;else{if(_0x25a2f8){if(_0x25d375(0x8a2)!==_0x25d375(0x3a8))alert('Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.'[_0x25d375(0x764)](_0x5772a7));else{function _0x27f66e(){const _0x4ff861=_0x25d375;return _0x514738[_0x4ff861(0x6ac)][_0x4ff861(0x5ba)][_0x4ff861(0x788)]['EncounterRateMinimum'];}}}}});},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x2d9)]=function(){const _0x59ce49=_0x2ef904,_0x3dcc7d=[];for(const _0x4709aa of $dataMapInfos){if(!_0x4709aa)continue;_0x3dcc7d[_0x59ce49(0x147)](_0x4709aa['id']);}const _0x3eedfc=_0x3dcc7d[_0x59ce49(0x862)]*0x64+Math[_0x59ce49(0x4d8)](0x64);alert(_0x59ce49(0x697)[_0x59ce49(0x764)](_0x3eedfc)),this[_0x59ce49(0x85a)]=[],this[_0x59ce49(0x23c)]=$dataMap;for(const _0x56f2e5 of _0x3dcc7d){if(_0x59ce49(0x56a)==='McoXQ')VisuMZ[_0x59ce49(0x6ac)][_0x59ce49(0x6be)](_0x56f2e5);else{function _0x28e27d(){const _0x5db6b4=_0x59ce49;let _0x6462f8=0x0;for(const _0x58763e of _0x564a4a['CoreEngine']['Settings'][_0x5db6b4(0x663)][_0x5db6b4(0x398)]){const _0x313076=this['itemPadding'](),_0x9a1e77=this['paramY'](_0x6462f8);this['drawItem'](_0x313076,_0x9a1e77,_0x58763e),_0x6462f8++;}}}}setTimeout(VisuMZ[_0x59ce49(0x6ac)]['exportAllMapStrings'][_0x59ce49(0x617)](this),_0x3eedfc);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x6be)]=function(_0x38a6cc){const _0x90f266=_0x2ef904,_0xb7424c=_0x90f266(0x202)[_0x90f266(0x764)](_0x38a6cc[_0x90f266(0x82a)](0x3)),_0x2b0ed5=new XMLHttpRequest(),_0x489a1d=_0x90f266(0x39b)+_0xb7424c;_0x2b0ed5[_0x90f266(0x65c)](_0x90f266(0x50e),_0x489a1d),_0x2b0ed5['overrideMimeType'](_0x90f266(0x219)),_0x2b0ed5[_0x90f266(0x721)]=()=>this['storeMapData'](_0x2b0ed5,_0x38a6cc,_0xb7424c,_0x489a1d),_0x2b0ed5[_0x90f266(0x4f7)]=()=>DataManager[_0x90f266(0x717)](_0x90f266(0x868),_0xb7424c,_0x489a1d),_0x2b0ed5[_0x90f266(0x1e6)]();},VisuMZ['CoreEngine'][_0x2ef904(0x68f)]=function(_0x486708,_0x18eae1,_0x2800d2,_0x11fec3){const _0x48edad=_0x2ef904;$dataMap=JSON[_0x48edad(0x4cd)](_0x486708[_0x48edad(0x890)]),DataManager['onLoad']($dataMap),this[_0x48edad(0x85a)][_0x18eae1]=VisuMZ[_0x48edad(0x6ac)]['ExtractStrFromMap'](_0x18eae1),$dataMap=this['_currentMap'];},VisuMZ[_0x2ef904(0x6ac)]['exportAllMapStrings']=function(){const _0x410c23=_0x2ef904,_0x25ab99='AllMaps';this[_0x410c23(0x85a)]['remove'](undefined)[_0x410c23(0x84b)]('')[_0x410c23(0x84b)](null);const _0x31d42a=this[_0x410c23(0x85a)]['join']('\x0a\x0a\x0a\x0a\x0a')[_0x410c23(0x4c9)]();VisuMZ[_0x410c23(0x6ac)][_0x410c23(0x7d9)](_0x31d42a,_0x25ab99,!![]),SceneManager['_scene'][_0x410c23(0x501)]=!![];},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ac)]=function(_0x22892d){const _0x1b2b94=_0x2ef904;if(!$dataMap)return'';let _0x14f6d8='█'['repeat'](0x46)+'\x0a\x0a',_0x45f345='═'[_0x1b2b94(0x7f3)](0x46)+'\x0a\x0a',_0xef35a5='';this[_0x1b2b94(0x42c)]=0x0;for(const _0x1492bc of $dataMap[_0x1b2b94(0x818)]){if(!_0x1492bc)continue;let _0x2856d8=_0x1492bc['id'],_0x151b51=_0x1492bc[_0x1b2b94(0x1fd)],_0x19c4b3=_0x1492bc[_0x1b2b94(0x4ff)];for(const _0xa70d02 of _0x19c4b3){if(_0x1b2b94(0x21c)!==_0x1b2b94(0x21c)){function _0x4c09be(){const _0x535e5a=_0x1b2b94;return _0x55c569['layoutSettings'][_0x535e5a(0x45d)][_0x535e5a(0x64a)](this);}}else{const _0x253f1c=_0x19c4b3['indexOf'](_0xa70d02)+0x1;let _0x310fa6=_0x45f345+_0x1b2b94(0x2d7),_0x196b53=VisuMZ[_0x1b2b94(0x6ac)][_0x1b2b94(0x805)](_0xa70d02[_0x1b2b94(0x881)]);if(_0x196b53[_0x1b2b94(0x862)]>0x0){if(_0x1b2b94(0x248)===_0x1b2b94(0x248)){if(_0xef35a5[_0x1b2b94(0x862)]>0x0){if(_0x1b2b94(0x367)===_0x1b2b94(0x367))_0xef35a5+=_0x45f345+_0x1b2b94(0x680);else{function _0x321b7b(){const _0x16406e=_0x1b2b94;_0x3e158c['playOk']();if(!_0x79730[_0x16406e(0x78f)]()){const _0x12783a=_0x594f15[_0x16406e(0x65c)](_0xa5ea5,_0x16406e(0x83b));}else{const _0x555ec4=_0x17f87d[_0x16406e(0x81c)]==_0x16406e(0x25a)?_0x16406e(0x65c):_0x4b4ddd[_0x16406e(0x81c)]==_0x16406e(0x5a9)?'start':_0x16406e(0x793);_0x4c3ca9(_0x16406e(0x3eb))['exec'](_0x555ec4+'\x20'+_0x5aa980);}}}}else{const _0x48efbc=$dataMapInfos[_0x22892d][_0x1b2b94(0x1fd)];_0xef35a5+=_0x14f6d8+_0x1b2b94(0x529)[_0x1b2b94(0x764)](_0x22892d,_0x48efbc||_0x1b2b94(0x2cc))+_0x14f6d8;}_0xef35a5+=_0x310fa6[_0x1b2b94(0x764)](_0x2856d8,_0x151b51,_0x253f1c,_0x196b53);}else{function _0x409eeb(){const _0x5a9ec6=_0x1b2b94;this[_0x5a9ec6(0x455)]='FV';}}}}}}return _0xef35a5[_0x1b2b94(0x862)]>0x0&&(_0xef35a5+=_0x45f345),_0xef35a5;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x586)]=function(){const _0x190c64=_0x2ef904,_0x29e5fb=$dataTroops['length']*0xa+Math[_0x190c64(0x4d8)](0xa);alert(_0x190c64(0x62f)[_0x190c64(0x764)](_0x29e5fb));const _0x3403fc=[];for(const _0x1d4789 of $dataTroops){if(!_0x1d4789)continue;const _0x1878cb=_0x1d4789['id'];_0x3403fc[_0x1878cb]=VisuMZ[_0x190c64(0x6ac)]['ExtractStrFromTroop'](_0x1878cb);}setTimeout(VisuMZ[_0x190c64(0x6ac)]['exportAllTroopStrings'][_0x190c64(0x617)](this,_0x3403fc),_0x29e5fb);},VisuMZ[_0x2ef904(0x6ac)]['ExtractStrFromTroop']=function(_0x2a9c91){const _0x592924=_0x2ef904;if(!$dataTroops[_0x2a9c91])return'';let _0x3390e8='█'['repeat'](0x46)+'\x0a\x0a',_0x38ad3d='═'['repeat'](0x46)+'\x0a\x0a',_0x2d2025='';this[_0x592924(0x42c)]=0x0;const _0x462249=$dataTroops[_0x2a9c91];let _0x40214e=_0x462249['pages'];for(const _0x231480 of _0x40214e){if(_0x592924(0x2c0)===_0x592924(0x2c0)){const _0x15a83e=_0x40214e['indexOf'](_0x231480)+0x1;let _0x523bf5=_0x38ad3d+_0x592924(0x7ab),_0x5eecec=VisuMZ[_0x592924(0x6ac)]['ExtractStrFromList'](_0x231480[_0x592924(0x881)]);if(_0x5eecec[_0x592924(0x862)]>0x0){if(_0x592924(0x87f)!==_0x592924(0x87f)){function _0x46bec9(){const _0x23d913=_0x592924;let _0x105223=_0x638504[_0x23d913(0x14c)](_0x197f5e)[_0x23d913(0x5aa)]();this['useDigitGrouping']()&&(_0x105223=_0x4083a0[_0x23d913(0x686)](_0x105223));const _0x4ca89e=this[_0x23d913(0x5e6)](),_0x1c7c44=_0x592248[_0x23d913(0x661)](_0x4ca89e*0.75);for(let _0x32816b=0x0;_0x32816b<_0x105223[_0x23d913(0x862)];_0x32816b++){const _0x2fa2cd=this['createChildSprite'](_0x1c7c44,_0x4ca89e);_0x2fa2cd[_0x23d913(0x325)][_0x23d913(0x3a1)](_0x105223[_0x32816b],0x0,0x0,_0x1c7c44,_0x4ca89e,_0x23d913(0x67e)),_0x2fa2cd['x']=(_0x32816b-(_0x105223[_0x23d913(0x862)]-0x1)/0x2)*_0x1c7c44,_0x2fa2cd['dy']=-_0x32816b;}}}else{if(_0x2d2025['length']>0x0){if(_0x592924(0x3ac)!==_0x592924(0x3ac)){function _0x1633e3(){const _0x3e452e=_0x592924;return this[_0x3e452e(0x1e3)];}}else _0x2d2025+=_0x38ad3d+_0x592924(0x680);}else{if('GBtBL'!==_0x592924(0x290))_0x2d2025+=_0x3390e8+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x2a9c91,_0x462249[_0x592924(0x1fd)]||_0x592924(0x2cc))+_0x3390e8;else{function _0x3c77ec(){this['opacity']=0xff;}}}_0x2d2025+=_0x523bf5['format'](_0x15a83e,_0x5eecec);}}}else{function _0x22d365(){const _0x5b8dbc=_0x592924;_0xdc16e[_0x5b8dbc(0x671)](_0x208e71[_0x5b8dbc(0x81b)],0x0,~0x0),_0x2bd2e7['stencilOp'](_0x1d5fec[_0x5b8dbc(0x509)],_0x1f21bb[_0x5b8dbc(0x509)],_0x1f25ca[_0x5b8dbc(0x509)]),_0xb42427[_0x5b8dbc(0x5cc)](_0x1b6a57),_0x28f538[_0x5b8dbc(0x6cc)][_0x5b8dbc(0x6c8)](),_0x508a2f['clear'](),_0xc6bb82[_0x5b8dbc(0x671)](_0x2f8db[_0x5b8dbc(0x302)],0x1,~0x0),_0x1df9ac['stencilOp'](_0x2495a6[_0x5b8dbc(0x287)],_0x277126[_0x5b8dbc(0x287)],_0x1d9413[_0x5b8dbc(0x287)]),_0x72c18d[_0x5b8dbc(0x64e)](_0x518225['ZERO'],_0x4fd4de[_0x5b8dbc(0x493)]),_0x26713b[_0x5b8dbc(0x5cc)](_0x204613),_0x42592a[_0x5b8dbc(0x6cc)][_0x5b8dbc(0x6c8)](),_0x23cccb[_0x5b8dbc(0x64e)](_0x311168[_0x5b8dbc(0x493)],_0x176cb6[_0x5b8dbc(0x517)]);}}}return _0x2d2025[_0x592924(0x862)]>0x0&&(_0x2d2025+=_0x38ad3d),_0x2d2025;},VisuMZ['CoreEngine'][_0x2ef904(0x5d5)]=function(_0x5e402a){const _0x590fe4=_0x2ef904,_0x20eeb5=_0x590fe4(0x6e4);_0x5e402a['remove'](undefined)[_0x590fe4(0x84b)]('')[_0x590fe4(0x84b)](null);const _0x4c5f30=_0x5e402a[_0x590fe4(0x172)](_0x590fe4(0x680))[_0x590fe4(0x4c9)]();VisuMZ['CoreEngine']['ExportString'](_0x4c5f30,_0x20eeb5,!![]),SceneManager[_0x590fe4(0x4a8)][_0x590fe4(0x501)]=!![];},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x805)]=function(_0x4cb43d){const _0x1ed47f=_0x2ef904;let _0x3bd6a1='\x0a'+'─'[_0x1ed47f(0x7f3)](0x46)+'\x0a',_0x2df905='\x0a'+'┄'[_0x1ed47f(0x7f3)](0x46)+'\x0a',_0x2b3178='';for(const _0x60e819 of _0x4cb43d){if(!_0x60e819)continue;if(_0x60e819['code']===0x65){_0x2b3178+=_0x3bd6a1+'\x0a',_0x2b3178+='〘Show\x20Text〙\x0a';if(_0x60e819[_0x1ed47f(0x4b0)][0x4]!==''&&_0x60e819[_0x1ed47f(0x4b0)][0x4]!==undefined){if('PJgPz'!==_0x1ed47f(0x385)){function _0x3f9cf2(){const _0x1c2b39=_0x1ed47f;return _0x35d5c6[_0x1c2b39(0x56d)][_0x1c2b39(0x4d6)][_0x1c2b39(0x64a)](this);}}else _0x2b3178+=_0x1ed47f(0x5bf)[_0x1ed47f(0x764)](_0x60e819[_0x1ed47f(0x4b0)][0x4]);}}else{if(_0x60e819['code']===0x191){if(_0x1ed47f(0x165)===_0x1ed47f(0x5f9)){function _0x446250(){const _0x535542=_0x1ed47f;_0x37e460=_0x386723['round'](_0x721b94),_0x3abcaf=_0x3fec14[_0x535542(0x546)](_0x31fcd0),_0x4260b7=_0x555e48['round'](_0x1088a5),_0x1ee7f0[_0x535542(0x6ac)][_0x535542(0x847)][_0x535542(0x64a)](this,_0x319781,_0x25be85,_0x5730e7,_0x412e3b),this[_0x535542(0x2f0)]();}}else _0x2b3178+=_0x1ed47f(0x1ab)[_0x1ed47f(0x764)](_0x60e819[_0x1ed47f(0x4b0)][0x0]);}else{if(_0x60e819['code']===0x192){if('nIrVN'!==_0x1ed47f(0x580))_0x2b3178+=_0x3bd6a1,_0x2b3178+=_0x1ed47f(0x7c4)['format'](_0x2df905,_0x60e819[_0x1ed47f(0x4b0)][0x0]+0x1,_0x60e819[_0x1ed47f(0x4b0)][0x1]);else{function _0x38e6a4(){const _0x16ee43=_0x1ed47f;this['_actorWindow'][_0x16ee43(0x223)](_0x6b251f[_0x16ee43(0x56d)][_0x16ee43(0x3a0)]);}}}else{if(_0x60e819[_0x1ed47f(0x56e)]===0x193)_0x2b3178+=_0x3bd6a1,_0x2b3178+=_0x1ed47f(0x3a2)[_0x1ed47f(0x764)](_0x2df905);else{if(_0x60e819['code']===0x194){if(_0x1ed47f(0x25f)==='OCVnc'){function _0x4bc736(){const _0x5be1d6=_0x1ed47f,_0x1f7e31=['animations','battlebacks1',_0x5be1d6(0x19d),_0x5be1d6(0x4e4),'enemies','faces',_0x5be1d6(0x707),_0x5be1d6(0x59f),_0x5be1d6(0x150),'sv_enemies','system',_0x5be1d6(0x8a9),_0x5be1d6(0x3cd),_0x5be1d6(0x326)];for(const _0x4d1559 of _0x1f7e31){const _0x4b96f1=_0x5be0c7[_0x5be1d6(0x6ac)]['Settings'][_0x5be1d6(0x87e)][_0x4d1559],_0x3b244e=_0x5be1d6(0x571)[_0x5be1d6(0x764)](_0x4d1559);for(const _0x3e8a26 of _0x4b96f1){_0x24a669[_0x5be1d6(0x68a)](_0x3b244e,_0x3e8a26);}}}}else _0x2b3178+=_0x3bd6a1,_0x2b3178+='%1〘End\x20Choice\x20Selection〙%1'[_0x1ed47f(0x764)](_0x2df905);}else{if(_0x60e819[_0x1ed47f(0x56e)]===0x69)_0x2b3178+=_0x3bd6a1+'\x0a',_0x2b3178+='〘Scrolling\x20Text〙\x0a';else{if(_0x60e819[_0x1ed47f(0x56e)]===0x6c){if('mZPfo'===_0x1ed47f(0x31c))_0x2b3178+=_0x3bd6a1+'\x0a',_0x2b3178+='》Comment《\x0a%1\x0a'[_0x1ed47f(0x764)](_0x60e819['parameters'][0x0]);else{function _0x13f953(){const _0x31716c=_0x1ed47f;return _0x51d8f0['CoreEngine']['Settings']['QoL'][_0x31716c(0x66f)]&&this['subject']()[_0x31716c(0x6ae)]()?this[_0x31716c(0x5f8)]()[_0x31716c(0x3bc)]+0.05:this['subject']()[_0x31716c(0x3bc)];}}}else{if(_0x60e819[_0x1ed47f(0x56e)]===0x198){if(_0x1ed47f(0x33b)!==_0x1ed47f(0x1c1))_0x2b3178+=_0x1ed47f(0x1ab)['format'](_0x60e819[_0x1ed47f(0x4b0)][0x0]);else{function _0x2b4d04(){const _0x3f701c=_0x1ed47f;_0xf7c31[_0x3f701c(0x45c)]=_0x3e2c27[_0x3f701c(0x5e2)](_0x5626dc(_0x319f43['$1']),_0x59702a['maxLevel']);}}}else{if(_0x60e819['code']===0x75){if(_0x1ed47f(0x531)===_0x1ed47f(0x531)){const _0x4e8215=$dataCommonEvents[_0x60e819['parameters'][0x0]];if(_0x4e8215&&this[_0x1ed47f(0x42c)]<=0xa){if(_0x1ed47f(0x7de)!==_0x1ed47f(0x7de)){function _0x117a35(){const _0x18ec8b=_0x1ed47f;this[_0x18ec8b(0x7e8)]='FTB';}}else{this[_0x1ed47f(0x42c)]++;let _0x214943=VisuMZ[_0x1ed47f(0x6ac)]['ExtractStrFromList'](_0x4e8215['list']);_0x214943['length']>0x0&&(_0x2b3178+=_0x3bd6a1,_0x2b3178+=_0x2df905,_0x2b3178+='〘Common\x20Event\x20%1:\x20%2〙\x20Start'[_0x1ed47f(0x764)](_0x4e8215['id'],_0x4e8215[_0x1ed47f(0x1fd)]),_0x2b3178+=_0x2df905,_0x2b3178+=_0x214943,_0x2b3178+=_0x2df905,_0x2b3178+=_0x1ed47f(0x377)[_0x1ed47f(0x764)](_0x4e8215['id'],_0x4e8215[_0x1ed47f(0x1fd)]),_0x2b3178+=_0x2df905),this['_commonEventLayers']--;}}}else{function _0x45c1a4(){const _0x3d8298=_0x1ed47f;this[_0x3d8298(0x224)]();}}}}}}}}}}}}return _0x2b3178[_0x1ed47f(0x862)]>0x0&&(_0x2b3178+=_0x3bd6a1),_0x2b3178;},PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x59d),_0x5b2795=>{const _0x170d7b=_0x2ef904;VisuMZ[_0x170d7b(0x5db)](_0x5b2795,_0x5b2795);const _0x4f314f=_0x5b2795[_0x170d7b(0x6a8)];VisuMZ[_0x170d7b(0x57d)](_0x4f314f);}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x1bc),_0x2adcd5=>{const _0x20b726=_0x2ef904;VisuMZ[_0x20b726(0x5db)](_0x2adcd5,_0x2adcd5);const _0x4dea05=_0x2adcd5[_0x20b726(0x895)]||0x0;$gameParty[_0x20b726(0x523)](_0x4dea05);}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x886),_0x27d7ec=>{const _0x1e7e68=_0x2ef904;VisuMZ[_0x1e7e68(0x5db)](_0x27d7ec,_0x27d7ec);const _0x4efc40=_0x27d7ec[_0x1e7e68(0x3d4)]||0x1,_0x5b602b=_0x27d7ec['easingType']||_0x1e7e68(0x654),_0x4c022d=$gameScreen[_0x1e7e68(0x725)](_0x4efc40);if(_0x4c022d){if('rZQOE'!==_0x1e7e68(0x73f)){function _0x56260d(){const _0xa65f2e=_0x1e7e68;if(_0x1c845e===_0x27a2e0&&_0x323318%0x1===0x0)return _0x2ce035;if(_0x34ad67!==_0x4bce95&&['MAXHP',_0xa65f2e(0x1c6),_0xa65f2e(0x5c7),_0xa65f2e(0x469),_0xa65f2e(0x240),_0xa65f2e(0x2f3),_0xa65f2e(0x20a),'LUK']['includes'](_0x2c669c(_0x501241)[_0xa65f2e(0x406)]()[_0xa65f2e(0x4c9)]()))return _0x1f0752;_0x4f8f5f=_0xef6ba1||0x0;if(_0x4df3a5[_0xa65f2e(0x6ac)][_0xa65f2e(0x195)][_0x1b3b94])return _0x3ab684[_0xa65f2e(0x6ac)][_0xa65f2e(0x1a3)][_0x4891ae]===_0xa65f2e(0x4a2)?_0x5521a0:_0x43eb24((_0x45d049*0x64)[_0xa65f2e(0x736)](_0x5e9e25))+'%';return _0x4bc169((_0x972e99*0x64)['toFixed'](_0x3fe411))+'%';}}else _0x4c022d[_0x1e7e68(0x78a)](_0x5b602b);}}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x4f0),_0x489dbd=>{const _0x3481f5=_0x2ef904;for(let _0xb85ab5=0x1;_0xb85ab5<=0x64;_0xb85ab5++){if(_0x3481f5(0x1f3)!==_0x3481f5(0x27a))$gameScreen[_0x3481f5(0x43a)](_0xb85ab5);else{function _0xf0468d(){const _0x52da29=_0x3481f5,_0xee04ab=_0x4dd8aa['displayY']()*_0x20d090[_0x52da29(0x674)]();return this['_y']-_0xee04ab;}}}}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],'PictureEraseRange',_0x57867b=>{const _0x3e32c8=_0x2ef904;VisuMZ[_0x3e32c8(0x5db)](_0x57867b,_0x57867b);const _0xa84239=Math[_0x3e32c8(0x5e2)](_0x57867b[_0x3e32c8(0x174)],_0x57867b[_0x3e32c8(0x432)]),_0x48b392=Math[_0x3e32c8(0x8a6)](_0x57867b['StartID'],_0x57867b[_0x3e32c8(0x432)]);for(let _0x244b6c=_0xa84239;_0x244b6c<=_0x48b392;_0x244b6c++){$gameScreen[_0x3e32c8(0x43a)](_0x244b6c);}}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x4e8),_0xda2cdb=>{const _0x5c3f24=_0x2ef904;VisuMZ[_0x5c3f24(0x5db)](_0xda2cdb,_0xda2cdb);const _0x476817=_0xda2cdb[_0x5c3f24(0x26d)]||'random',_0x24b227=_0xda2cdb[_0x5c3f24(0x500)][_0x5c3f24(0x7b9)](0x1,0x9),_0xc76e94=_0xda2cdb['Speed']['clamp'](0x1,0x9),_0x2b6c60=_0xda2cdb[_0x5c3f24(0x80a)]||0x1,_0x4b3554=_0xda2cdb[_0x5c3f24(0x874)];$gameScreen['setCoreEngineScreenShakeStyle'](_0x476817),$gameScreen[_0x5c3f24(0x26f)](_0x24b227,_0xc76e94,_0x2b6c60);if(_0x4b3554){const _0x7c857c=$gameTemp[_0x5c3f24(0x3c5)]();if(_0x7c857c)_0x7c857c['wait'](_0x2b6c60);}}),PluginManager[_0x2ef904(0x7ef)](pluginData['name'],_0x2ef904(0x4ab),_0xc932f5=>{const _0x4cbc65=_0x2ef904;VisuMZ[_0x4cbc65(0x5db)](_0xc932f5,_0xc932f5);const _0x573177=_0xc932f5[_0x4cbc65(0x307)]||0x1;$gameSystem[_0x4cbc65(0x6f3)](_0x573177);}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x51c),_0x4fcaec=>{const _0x2ec8c7=_0x2ef904;if($gameParty[_0x2ec8c7(0x2c7)]())return;VisuMZ['ConvertParams'](_0x4fcaec,_0x4fcaec);const _0x2c16b9=_0x4fcaec[_0x2ec8c7(0x307)];if(_0x2c16b9['match'](/Front/i)){if(_0x2ec8c7(0x4db)!==_0x2ec8c7(0x2d8))$gameSystem[_0x2ec8c7(0x4ad)](![]);else{function _0xdd2c8a(){var _0x23c054=_0x14b319(_0x3f92a8['$1']);_0x48ee5a+=_0x23c054;}}}else{if(_0x2c16b9[_0x2ec8c7(0x376)](/Side/i)){if(_0x2ec8c7(0x2ef)===_0x2ec8c7(0x3fa)){function _0xd384eb(){const _0x1c8c2e=_0x2ec8c7;if(this[_0x1c8c2e(0x490)](_0x4f6727))return!![];}}else $gameSystem[_0x2ec8c7(0x4ad)](!![]);}else{if('XuBFd'!==_0x2ec8c7(0x47e)){function _0x38871c(){const _0x268f31=_0x2ec8c7;_0x528666[_0x268f31(0x288)]();}}else $gameSystem[_0x2ec8c7(0x4ad)](!$gameSystem['isSideView']());}}}),PluginManager['registerCommand'](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x2fb),_0x46f8b6=>{const _0x39b51e=_0x2ef904;if($gameParty[_0x39b51e(0x2c7)]())return;VisuMZ[_0x39b51e(0x5db)](_0x46f8b6,_0x46f8b6);const _0x46a290=['bgm',_0x39b51e(0x744),'me','se'];for(const _0x4b8466 of _0x46a290){const _0x3cfd31=_0x46f8b6[_0x4b8466],_0x3dc2e6=_0x39b51e(0x413)[_0x39b51e(0x764)](_0x4b8466);for(const _0x521260 of _0x3cfd31){AudioManager[_0x39b51e(0x6d9)](_0x3dc2e6,_0x521260);}}}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x44a),_0x4037ca=>{const _0x5de3d4=_0x2ef904;if($gameParty[_0x5de3d4(0x2c7)]())return;VisuMZ['ConvertParams'](_0x4037ca,_0x4037ca);const _0x127f6e=[_0x5de3d4(0x63c),'battlebacks1',_0x5de3d4(0x19d),_0x5de3d4(0x4e4),_0x5de3d4(0x379),'faces','parallaxes',_0x5de3d4(0x59f),'sv_actors',_0x5de3d4(0x86d),'system','tilesets',_0x5de3d4(0x3cd),'titles2'];for(const _0x1095c1 of _0x127f6e){if('LUVeI'!==_0x5de3d4(0x578)){const _0x1db454=_0x4037ca[_0x1095c1],_0x5ddfcd=_0x5de3d4(0x571)[_0x5de3d4(0x764)](_0x1095c1);for(const _0x518bd5 of _0x1db454){ImageManager[_0x5de3d4(0x68a)](_0x5ddfcd,_0x518bd5);}}else{function _0x473ef6(){const _0x591229=_0x5de3d4;if(_0x3283d0===0x8)return![];return _0x21a7bc['CoreEngine'][_0x591229(0x7e9)]['call'](this,_0x52fdd4);}}}}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x368),_0x38cfc4=>{const _0x7dc630=_0x2ef904;if($gameParty[_0x7dc630(0x2c7)]())return;VisuMZ[_0x7dc630(0x5db)](_0x38cfc4,_0x38cfc4);const _0x548143=_0x38cfc4['IDs'],_0x51bc85=(_0x38cfc4[_0x7dc630(0x835)]||0x0)/0x64;for(const _0xd95feb of _0x548143){if('iIDYn'!==_0x7dc630(0x55f)){function _0x5b34db(){const _0x5785f5=_0x7dc630;_0x457bfc[_0x5785f5(0x6ac)][_0x5785f5(0x812)][_0x5785f5(0x64a)](this);}}else{const _0x4bc8e1=Math[_0x7dc630(0x2e7)]()<=_0x51bc85;$gameSwitches[_0x7dc630(0x3ae)](_0xd95feb,_0x4bc8e1);}}}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x2a6),_0x44e52d=>{const _0x4d26eb=_0x2ef904;if($gameParty[_0x4d26eb(0x2c7)]())return;VisuMZ['ConvertParams'](_0x44e52d,_0x44e52d);const _0x46c893=Math[_0x4d26eb(0x5e2)](_0x44e52d['StartID'],_0x44e52d['EndingID']),_0x179331=Math[_0x4d26eb(0x8a6)](_0x44e52d['StartID'],_0x44e52d['EndingID']),_0x34c115=(_0x44e52d[_0x4d26eb(0x835)]||0x0)/0x64;for(let _0x3d25c9=_0x46c893;_0x3d25c9<=_0x179331;_0x3d25c9++){const _0x935bdb=Math[_0x4d26eb(0x2e7)]()<=_0x34c115;$gameSwitches[_0x4d26eb(0x3ae)](_0x3d25c9,_0x935bdb);}}),PluginManager[_0x2ef904(0x7ef)](pluginData['name'],_0x2ef904(0x873),_0x55ac94=>{const _0x520d7e=_0x2ef904;if($gameParty['inBattle']())return;VisuMZ[_0x520d7e(0x5db)](_0x55ac94,_0x55ac94);const _0x67f427=_0x55ac94[_0x520d7e(0x7a0)];for(const _0x1f0607 of _0x67f427){const _0x498fea=$gameSwitches[_0x520d7e(0x895)](_0x1f0607);$gameSwitches['setValue'](_0x1f0607,!_0x498fea);}}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x698),_0x20a397=>{const _0x56f032=_0x2ef904;if($gameParty[_0x56f032(0x2c7)]())return;VisuMZ[_0x56f032(0x5db)](_0x20a397,_0x20a397);const _0x24bdde=Math[_0x56f032(0x5e2)](_0x20a397[_0x56f032(0x174)],_0x20a397[_0x56f032(0x432)]),_0x317c2d=Math['max'](_0x20a397[_0x56f032(0x174)],_0x20a397[_0x56f032(0x432)]);for(let _0x18e047=_0x24bdde;_0x18e047<=_0x317c2d;_0x18e047++){const _0x4c4aee=$gameSwitches['value'](_0x18e047);$gameSwitches[_0x56f032(0x3ae)](_0x18e047,!_0x4c4aee);}}),PluginManager[_0x2ef904(0x7ef)](pluginData[_0x2ef904(0x1fd)],_0x2ef904(0x387),_0x3b74d5=>{const _0x4d2f28=_0x2ef904;if($gameParty[_0x4d2f28(0x2c7)]())return;VisuMZ[_0x4d2f28(0x5db)](_0x3b74d5,_0x3b74d5);const _0x381605=_0x3b74d5[_0x4d2f28(0x307)][_0x4d2f28(0x406)]()['trim'](),_0x5e88d1=VisuMZ[_0x4d2f28(0x6ac)][_0x4d2f28(0x3b1)](_0x381605);$gameSystem[_0x4d2f28(0x381)](_0x5e88d1);}),VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x3b1)]=function(_0x4219e5){const _0x19c98e=_0x2ef904;_0x4219e5=_0x4219e5||'DATABASE',_0x4219e5=String(_0x4219e5)[_0x19c98e(0x406)]()[_0x19c98e(0x4c9)]();switch(_0x4219e5){case'DTB':return 0x0;case _0x19c98e(0x157):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager['atbActive']=!![]);return 0x1;case'TPB\x20WAIT':Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x19c98e(0x7da)]=![]);return 0x2;case _0x19c98e(0x7f4):if(Imported[_0x19c98e(0x430)])return _0x19c98e(0x7f4);break;case _0x19c98e(0x15c):if(Imported[_0x19c98e(0x781)])return _0x19c98e(0x15c);break;case _0x19c98e(0x1de):if(Imported[_0x19c98e(0x322)])return _0x19c98e(0x1de);break;case'FTB':if(Imported['VisuMZ_2_BattleSystemFTB'])return _0x19c98e(0x700);break;case _0x19c98e(0x794):if(Imported[_0x19c98e(0x5b2)]){if('tJIgb'!=='njeeZ')return _0x19c98e(0x794);else{function _0x46a87b(){const _0x1de9f0=_0x19c98e;return _0x3b44be[_0x1de9f0(0x56d)][_0x1de9f0(0x30f)][_0x1de9f0(0x64a)](this);}}}break;}return $dataSystem['battleSystem'];},PluginManager[_0x2ef904(0x7ef)](pluginData['name'],_0x2ef904(0x740),_0x1ed150=>{const _0x2cee76=_0x2ef904;VisuMZ['ConvertParams'](_0x1ed150,_0x1ed150);const _0x454f7f=_0x1ed150[_0x2cee76(0x307)]||0x1;$gameSystem['setWindowPadding'](_0x454f7f);}),VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x2d2)]=Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x796)],Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x796)]=function(){const _0x136934=_0x2ef904;VisuMZ[_0x136934(0x6ac)][_0x136934(0x2d2)][_0x136934(0x64a)](this),this[_0x136934(0x83c)](),this[_0x136934(0x20b)](),this[_0x136934(0x462)](),this[_0x136934(0x182)](),this[_0x136934(0x457)](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x2ef904(0x6ac)]['RegExp']={},Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x83c)]=function(){const _0x8c7757=_0x2ef904,_0x3ce8a6=['MAXHP',_0x8c7757(0x1c6),'ATK',_0x8c7757(0x469),_0x8c7757(0x240),_0x8c7757(0x2f3),_0x8c7757(0x20a),_0x8c7757(0x85e)],_0x2feebd=['HIT',_0x8c7757(0x412),_0x8c7757(0x311),_0x8c7757(0x4ed),_0x8c7757(0x356),'MRF',_0x8c7757(0x516),_0x8c7757(0x496),_0x8c7757(0x2c8),'TRG'],_0xa0e387=[_0x8c7757(0x694),_0x8c7757(0x7ca),_0x8c7757(0x207),_0x8c7757(0x72d),'MCR',_0x8c7757(0x374),_0x8c7757(0x299),_0x8c7757(0x593),_0x8c7757(0x3b9),_0x8c7757(0x56b)],_0x5920d1=[_0x3ce8a6,_0x2feebd,_0xa0e387],_0x4babb6=[_0x8c7757(0x1ed),_0x8c7757(0x17e),_0x8c7757(0x7c1),'Max',_0x8c7757(0x17b),'Rate1',_0x8c7757(0x766),_0x8c7757(0x5e7),_0x8c7757(0x2ac),_0x8c7757(0x82e)];for(const _0x40be83 of _0x5920d1){if(_0x8c7757(0x355)!==_0x8c7757(0x435)){let _0xb9c199='';if(_0x40be83===_0x3ce8a6)_0xb9c199=_0x8c7757(0x7e3);if(_0x40be83===_0x2feebd)_0xb9c199=_0x8c7757(0x2a8);if(_0x40be83===_0xa0e387)_0xb9c199=_0x8c7757(0x628);for(const _0x864725 of _0x4babb6){if('fgcpN'===_0x8c7757(0x300)){let _0x3ea4f6='%1%2'[_0x8c7757(0x764)](_0xb9c199,_0x864725);VisuMZ[_0x8c7757(0x6ac)]['RegExp'][_0x3ea4f6]=[],VisuMZ[_0x8c7757(0x6ac)][_0x8c7757(0x382)][_0x3ea4f6+'JS']=[];let _0x172d1d=_0x8c7757(0x346);if([_0x8c7757(0x1ed),'Flat']['includes'](_0x864725))_0x172d1d+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x8c7757(0x17e),_0x8c7757(0x2ac)][_0x8c7757(0x352)](_0x864725))_0x172d1d+=_0x8c7757(0x305);else{if([_0x8c7757(0x7c1),'Flat2'][_0x8c7757(0x352)](_0x864725))_0x172d1d+=_0x8c7757(0x1d0);else{if(_0x864725===_0x8c7757(0x8a8))_0x172d1d+=_0x8c7757(0x2dd);else{if(_0x864725===_0x8c7757(0x16e)){if('GjmIb'!=='vkfuj')_0x172d1d+=_0x8c7757(0x5e1);else{function _0x360c3c(){const _0x28759e=_0x8c7757;_0x145cfa=_0x8c7088[_0x28759e(0x52c)](_0x18af43);}}}else{if(_0x864725===_0x8c7757(0x766)){if(_0x8c7757(0x88e)!==_0x8c7757(0x215))_0x172d1d+=_0x8c7757(0x4e1);else{function _0x151faf(){const _0x305cce=_0x8c7757;_0x5c0f97[_0x305cce(0x6ac)]['ParseClassNotetags']['call'](this,_0x4b5f8e);if(_0x1d6a36[_0x305cce(0x542)])for(const _0x108a46 of _0x3e757b[_0x305cce(0x542)]){_0x108a46[_0x305cce(0x80d)][_0x305cce(0x376)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x108a46[_0x305cce(0x42e)]=_0x213647[_0x305cce(0x8a6)](_0x315cdd(_0x197376['$1']),0x1));}}}}}}}}}for(const _0xb4246f of _0x40be83){let _0x575fa4=_0x864725[_0x8c7757(0x1d1)](/[\d+]/g,'')['toUpperCase']();const _0x51f6a4=_0x172d1d[_0x8c7757(0x764)](_0xb4246f,_0x575fa4);VisuMZ[_0x8c7757(0x6ac)][_0x8c7757(0x382)][_0x3ea4f6][_0x8c7757(0x147)](new RegExp(_0x51f6a4,'i'));const _0x3a92ab=_0x8c7757(0x6ff)['format'](_0xb4246f,_0x575fa4);VisuMZ[_0x8c7757(0x6ac)][_0x8c7757(0x382)][_0x3ea4f6+'JS'][_0x8c7757(0x147)](new RegExp(_0x3a92ab,'i'));}}else{function _0x127e81(){const _0x49e0fa=_0x8c7757;return _0x1ec002[_0x49e0fa(0x79e)]()===0x1;}}}}else{function _0x4a2303(){this['setAttack']();}}}},Scene_Boot[_0x2ef904(0x6a6)]['process_VisuMZ_CoreEngine_Notetags']=function(){const _0x4421bf=_0x2ef904;if(VisuMZ[_0x4421bf(0x776)])return;},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Settings']=function(){const _0x164b37=_0x2ef904;VisuMZ['CoreEngine']['Settings'][_0x164b37(0x788)][_0x164b37(0x228)]&&VisuMZ[_0x164b37(0x423)](!![]);if(VisuMZ[_0x164b37(0x6ac)][_0x164b37(0x5ba)][_0x164b37(0x788)][_0x164b37(0x777)]){if(_0x164b37(0x252)!=='ePtuw'){function _0x11a9b8(){const _0x5cb110=_0x164b37;if(_0x668413[_0x5cb110(0x7be)]())_0x5e5328[_0x5cb110(0x466)](_0x23d8cc);}}else Input[_0x164b37(0x893)][0x23]=_0x164b37(0x6c7),Input[_0x164b37(0x893)][0x24]=_0x164b37(0x42f);}if(VisuMZ[_0x164b37(0x6ac)]['Settings'][_0x164b37(0x3f8)]){if(_0x164b37(0x155)===_0x164b37(0x155)){const _0x11964e=VisuMZ[_0x164b37(0x6ac)][_0x164b37(0x5ba)]['ButtonAssist'];_0x11964e[_0x164b37(0x6ea)]=_0x11964e[_0x164b37(0x6ea)]||_0x164b37(0x258),_0x11964e[_0x164b37(0x6bb)]=_0x11964e['KeyTAB']||_0x164b37(0x5f0);}else{function _0x480576(){const _0x2342e0=_0x164b37;this['_helpWindow'][_0x2342e0(0x223)](_0x189242[_0x2342e0(0x56d)][_0x2342e0(0x711)]);}}}if(VisuMZ[_0x164b37(0x6ac)][_0x164b37(0x5ba)]['KeyboardInput'][_0x164b37(0x892)]){if(_0x164b37(0x2b0)===_0x164b37(0x7b0)){function _0x247cef(){const _0x1b8e35=_0x164b37;if(this[_0x1b8e35(0x4f6)])return;_0x2f868b[_0x1b8e35(0x6ac)][_0x1b8e35(0x6b3)][_0x1b8e35(0x64a)](this);}}else Input[_0x164b37(0x893)][0x57]='up',Input[_0x164b37(0x893)][0x41]=_0x164b37(0x46b),Input[_0x164b37(0x893)][0x53]=_0x164b37(0x181),Input[_0x164b37(0x893)][0x44]=_0x164b37(0x830),Input[_0x164b37(0x893)][0x45]=_0x164b37(0x7a7);}if(VisuMZ['CoreEngine']['Settings'][_0x164b37(0x49e)][_0x164b37(0x410)]){if(_0x164b37(0x1ef)!==_0x164b37(0x29a))Input[_0x164b37(0x893)][0x52]='dashToggle';else{function _0x222604(){const _0x4ad204=_0x164b37,_0x1de32d=_0x4977c0[_0x5d82ea],_0x61f6ab=_0x4ad204(0x571)[_0x4ad204(0x764)](_0x1876a0);for(const _0x43200c of _0x1de32d){_0x164b1b[_0x4ad204(0x68a)](_0x61f6ab,_0x43200c);}}}}},Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x182)]=function(){const _0x405489=_0x2ef904;this[_0x405489(0x503)]();},Scene_Boot['prototype'][_0x2ef904(0x503)]=function(){const _0x34b4d3=_0x2ef904,_0x3140c9=VisuMZ[_0x34b4d3(0x6ac)]['Settings'][_0x34b4d3(0x35d)];for(const _0x27bbe3 of _0x3140c9){if(_0x34b4d3(0x23d)===_0x34b4d3(0x265)){function _0x4bac85(){const _0x20522f=_0x34b4d3;_0x4d7b2c[_0x20522f(0x6ac)][_0x20522f(0x53c)][_0x20522f(0x64a)](this),this[_0x20522f(0x741)](),this['_windowLayer']['x']=_0x593564['round'](this[_0x20522f(0x70b)]['x']),this['_windowLayer']['y']=_0x7b304b['round'](this['_windowLayer']['y']);}}else{const _0x19667c=_0x27bbe3[_0x34b4d3(0x708)]['replace'](/[ ]/g,''),_0x1196ad=_0x27bbe3[_0x34b4d3(0x194)];VisuMZ[_0x34b4d3(0x6ac)][_0x34b4d3(0x601)](_0x19667c,_0x1196ad);}}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x601)]=function(_0x5643bb,_0x258aa3){const _0x3cfc05=_0x2ef904;if(!!window[_0x5643bb]){if($gameTemp['isPlaytest']())console[_0x3cfc05(0x466)](_0x3cfc05(0x507)[_0x3cfc05(0x764)](_0x5643bb));}const _0x291f57=_0x3cfc05(0x3fb)[_0x3cfc05(0x764)](_0x5643bb,_0x258aa3);window[_0x5643bb]=new Function(_0x291f57);},Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x457)]=function(){const _0x54f8e3=_0x2ef904,_0x584b48=VisuMZ[_0x54f8e3(0x6ac)][_0x54f8e3(0x5ba)]['CustomParam'];if(!_0x584b48)return;for(const _0x2df660 of _0x584b48){if(_0x54f8e3(0x70d)!==_0x54f8e3(0x3f5)){if(!_0x2df660)continue;VisuMZ[_0x54f8e3(0x6ac)]['createCustomParameter'](_0x2df660);}else{function _0x51d030(){const _0xa7555=_0x54f8e3;_0x1ed78b[_0x4bb839]=_0x1dfe68[_0xa7555(0x85c)][_0x2ac22f[_0x50e665]];}}}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ['CoreEngine']['CustomParamIcons']={},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x1a3)]={},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x195)]={},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x373)]=function(_0x25c244){const _0x5d44e3=_0x2ef904,_0x1c630c=_0x25c244['Abbreviation'],_0x158e01=_0x25c244[_0x5d44e3(0x26a)],_0xb52a61=_0x25c244[_0x5d44e3(0x29b)],_0x1ee362=_0x25c244[_0x5d44e3(0x26d)],_0x458906=new Function(_0x25c244['ValueJS']);VisuMZ['CoreEngine'][_0x5d44e3(0x41e)][_0x1c630c[_0x5d44e3(0x406)]()[_0x5d44e3(0x4c9)]()]=_0x158e01,VisuMZ[_0x5d44e3(0x6ac)][_0x5d44e3(0x4d4)][_0x1c630c['toUpperCase']()[_0x5d44e3(0x4c9)]()]=_0xb52a61,VisuMZ[_0x5d44e3(0x6ac)][_0x5d44e3(0x1a3)][_0x1c630c['toUpperCase']()[_0x5d44e3(0x4c9)]()]=_0x1ee362,VisuMZ[_0x5d44e3(0x6ac)]['CustomParamAbb'][_0x1c630c[_0x5d44e3(0x406)]()[_0x5d44e3(0x4c9)]()]=_0x1c630c,Object[_0x5d44e3(0x5d1)](Game_BattlerBase['prototype'],_0x1c630c,{'get'(){const _0x30a045=_0x5d44e3,_0x1092b5=_0x458906[_0x30a045(0x64a)](this);return _0x1ee362===_0x30a045(0x4a2)?Math[_0x30a045(0x546)](_0x1092b5):_0x1092b5;}});},VisuMZ['ParseAllNotetags']=function(){const _0x203d47=_0x2ef904;for(const _0x3e2e6f of $dataActors){if(_0x203d47(0x54b)===_0x203d47(0x5fa)){function _0x136392(){const _0x577dc6=_0x203d47;_0x17e813=_0x438a4d||0xa8,this[_0x577dc6(0x6e6)]();if(_0xb420d3[_0x577dc6(0x6ac)][_0x577dc6(0x5ba)]['UI'][_0x577dc6(0x4ef)])this[_0x577dc6(0x22a)](_0x1331eb[_0x577dc6(0x6ba)]()[_0x577dc6(0x1fd)],_0x140d85,_0x2b88f3,_0x22e5a7);else{const _0x55dcfb=_0x480f0c[_0x577dc6(0x6ba)]()[_0x577dc6(0x1fd)][_0x577dc6(0x1d1)](/\\I\[(\d+)\]/gi,'');this[_0x577dc6(0x3a1)](_0x55dcfb,_0x5688c3,_0x3f9546,_0x40f32b);}}}else{if(_0x3e2e6f)VisuMZ['ParseActorNotetags'](_0x3e2e6f);}}for(const _0x5d8c37 of $dataClasses){if(_0x203d47(0x4e6)!==_0x203d47(0x737)){if(_0x5d8c37)VisuMZ[_0x203d47(0x8a5)](_0x5d8c37);}else{function _0x26cabe(){const _0x46ea49=_0x203d47;return _0x5e1164[_0x46ea49(0x56d)][_0x46ea49(0x192)][_0x46ea49(0x64a)](this);}}}for(const _0x5643c7 of $dataSkills){if(_0x5643c7)VisuMZ['ParseSkillNotetags'](_0x5643c7);}for(const _0x21a7b7 of $dataItems){if('AnZMQ'!==_0x203d47(0x293)){function _0x56c47b(){const _0x3feb52=_0x203d47;this[_0x3feb52(0x88f)]={},_0x3eff1c[_0x3feb52(0x6ac)][_0x3feb52(0x5d9)][_0x3feb52(0x64a)](this);}}else{if(_0x21a7b7)VisuMZ[_0x203d47(0x1c7)](_0x21a7b7);}}for(const _0x18dd84 of $dataWeapons){if(_0x18dd84)VisuMZ[_0x203d47(0x878)](_0x18dd84);}for(const _0x1c3531 of $dataArmors){if(_0x203d47(0x44f)!==_0x203d47(0x44f)){function _0xbaa815(){const _0x598b90=_0x203d47;this[_0x598b90(0x4d2)][_0x598b90(0x223)](_0x761428[_0x598b90(0x56d)][_0x598b90(0x711)]);}}else{if(_0x1c3531)VisuMZ[_0x203d47(0x2c2)](_0x1c3531);}}for(const _0x76749 of $dataEnemies){if(_0x76749)VisuMZ[_0x203d47(0x5dc)](_0x76749);}for(const _0xa01423 of $dataStates){if(_0xa01423)VisuMZ[_0x203d47(0x399)](_0xa01423);}for(const _0x18a1af of $dataTilesets){if(_0x203d47(0x2ad)!==_0x203d47(0x2ad)){function _0x45508c(){const _0xdbc05c=_0x203d47;this['_dimmerSprite']=new _0x334169(),this[_0xdbc05c(0x371)][_0xdbc05c(0x325)]=new _0x43b456(0x0,0x0),this[_0xdbc05c(0x371)]['x']=0x0,this[_0xdbc05c(0x6e9)](this[_0xdbc05c(0x371)]);}}else{if(_0x18a1af)VisuMZ[_0x203d47(0x190)](_0x18a1af);}}},VisuMZ[_0x2ef904(0x747)]=function(_0x26267f){},VisuMZ[_0x2ef904(0x8a5)]=function(_0x4d52b4){},VisuMZ[_0x2ef904(0x51f)]=function(_0x444b08){},VisuMZ[_0x2ef904(0x1c7)]=function(_0x1181e4){},VisuMZ['ParseWeaponNotetags']=function(_0x2dce73){},VisuMZ[_0x2ef904(0x2c2)]=function(_0x102ede){},VisuMZ[_0x2ef904(0x5dc)]=function(_0x5e341f){},VisuMZ['ParseStateNotetags']=function(_0x320903){},VisuMZ[_0x2ef904(0x190)]=function(_0x281b9c){},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x747)]=VisuMZ['ParseActorNotetags'],VisuMZ[_0x2ef904(0x747)]=function(_0x402337){const _0x5720a8=_0x2ef904;VisuMZ['CoreEngine']['ParseActorNotetags']['call'](this,_0x402337);const _0x411f28=_0x402337[_0x5720a8(0x80d)];if(_0x411f28[_0x5720a8(0x376)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x5720a8(0x4e7)!=='WrMKp'){_0x402337[_0x5720a8(0x3ea)]=Number(RegExp['$1']);if(_0x402337[_0x5720a8(0x3ea)]===0x0)_0x402337['maxLevel']=Number[_0x5720a8(0x337)];}else{function _0x2f923e(){const _0x48c42d=_0x5720a8;this[_0x48c42d(0x473)]=_0x4f2139;}}}if(_0x411f28[_0x5720a8(0x376)](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x5720a8(0x7ea)===_0x5720a8(0x21a)){function _0x22ebe6(){const _0x55b90a=_0x5720a8;_0x413cd6[_0x55b90a(0x6ac)][_0x55b90a(0x348)][_0x55b90a(0x64a)](this);}}else _0x402337[_0x5720a8(0x45c)]=Math[_0x5720a8(0x5e2)](Number(RegExp['$1']),_0x402337[_0x5720a8(0x3ea)]);}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x8a5)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x2ef904(0x8a5)]=function(_0x6db9ed){const _0x5d19c4=_0x2ef904;VisuMZ[_0x5d19c4(0x6ac)][_0x5d19c4(0x8a5)]['call'](this,_0x6db9ed);if(_0x6db9ed[_0x5d19c4(0x542)])for(const _0x50f18c of _0x6db9ed['learnings']){_0x50f18c[_0x5d19c4(0x80d)][_0x5d19c4(0x376)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x50f18c[_0x5d19c4(0x42e)]=Math[_0x5d19c4(0x8a6)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5dc)]=VisuMZ[_0x2ef904(0x5dc)],VisuMZ[_0x2ef904(0x5dc)]=function(_0x1d46bf){const _0x49482f=_0x2ef904;VisuMZ[_0x49482f(0x6ac)][_0x49482f(0x5dc)][_0x49482f(0x64a)](this,_0x1d46bf),_0x1d46bf['level']=0x1;const _0x4d6757=_0x1d46bf['note'];if(_0x4d6757[_0x49482f(0x376)](/<LEVEL:[ ](\d+)>/i))_0x1d46bf[_0x49482f(0x42e)]=Number(RegExp['$1']);if(_0x4d6757['match'](/<MAXHP:[ ](\d+)>/i))_0x1d46bf['params'][0x0]=Number(RegExp['$1']);if(_0x4d6757[_0x49482f(0x376)](/<MAXMP:[ ](\d+)>/i))_0x1d46bf[_0x49482f(0x34e)][0x1]=Number(RegExp['$1']);if(_0x4d6757[_0x49482f(0x376)](/<ATK:[ ](\d+)>/i))_0x1d46bf[_0x49482f(0x34e)][0x2]=Number(RegExp['$1']);if(_0x4d6757[_0x49482f(0x376)](/<DEF:[ ](\d+)>/i))_0x1d46bf[_0x49482f(0x34e)][0x3]=Number(RegExp['$1']);if(_0x4d6757[_0x49482f(0x376)](/<MAT:[ ](\d+)>/i))_0x1d46bf[_0x49482f(0x34e)][0x4]=Number(RegExp['$1']);if(_0x4d6757['match'](/<MDF:[ ](\d+)>/i))_0x1d46bf[_0x49482f(0x34e)][0x5]=Number(RegExp['$1']);if(_0x4d6757['match'](/<AGI:[ ](\d+)>/i))_0x1d46bf['params'][0x6]=Number(RegExp['$1']);if(_0x4d6757[_0x49482f(0x376)](/<LUK:[ ](\d+)>/i))_0x1d46bf[_0x49482f(0x34e)][0x7]=Number(RegExp['$1']);if(_0x4d6757['match'](/<EXP:[ ](\d+)>/i))_0x1d46bf['exp']=Number(RegExp['$1']);if(_0x4d6757[_0x49482f(0x376)](/<GOLD:[ ](\d+)>/i))_0x1d46bf['gold']=Number(RegExp['$1']);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x48a)]=Graphics[_0x2ef904(0x4eb)],Graphics[_0x2ef904(0x4eb)]=function(){const _0x2fa8e0=_0x2ef904;switch(VisuMZ['CoreEngine'][_0x2fa8e0(0x5ba)][_0x2fa8e0(0x788)][_0x2fa8e0(0x41b)]){case _0x2fa8e0(0x715):return!![];case _0x2fa8e0(0x6b7):return![];default:return VisuMZ[_0x2fa8e0(0x6ac)][_0x2fa8e0(0x48a)][_0x2fa8e0(0x64a)](this);}},VisuMZ['CoreEngine'][_0x2ef904(0x536)]=Graphics[_0x2ef904(0x63f)],Graphics[_0x2ef904(0x63f)]=function(_0x391a93,_0x1aae91,_0x47813a=null){const _0x2be143=_0x2ef904;VisuMZ[_0x2be143(0x6ac)]['Graphics_printError']['call'](this,_0x391a93,_0x1aae91,_0x47813a),VisuMZ[_0x2be143(0x423)](![]);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x2fc)]=Graphics[_0x2ef904(0x424)],Graphics[_0x2ef904(0x424)]=function(_0xac8137){const _0x3013bc=_0x2ef904;VisuMZ[_0x3013bc(0x6ac)][_0x3013bc(0x2fc)][_0x3013bc(0x64a)](this,_0xac8137),this[_0x3013bc(0x4a5)](_0xac8137);},Graphics[_0x2ef904(0x4a5)]=function(_0x538a1e){const _0x266f25=_0x2ef904;VisuMZ[_0x266f25(0x6ac)]['Settings'][_0x266f25(0x788)]['FontSmoothing']&&(_0x538a1e['style'][_0x266f25(0x756)]=_0x266f25(0x79b));VisuMZ[_0x266f25(0x6ac)][_0x266f25(0x5ba)]['QoL'][_0x266f25(0x57c)]&&(_0x538a1e[_0x266f25(0x3ab)][_0x266f25(0x38e)]='pixelated');const _0x9abc49=Math[_0x266f25(0x8a6)](0x0,Math[_0x266f25(0x661)](_0x538a1e['width']*this[_0x266f25(0x255)])),_0x5b94d7=Math[_0x266f25(0x8a6)](0x0,Math['floor'](_0x538a1e[_0x266f25(0x451)]*this['_realScale']));_0x538a1e[_0x266f25(0x3ab)][_0x266f25(0x849)]=_0x9abc49+'px',_0x538a1e[_0x266f25(0x3ab)][_0x266f25(0x451)]=_0x5b94d7+'px';},Bitmap['prototype'][_0x2ef904(0x2f0)]=function(){const _0x1bf9c6=_0x2ef904;this[_0x1bf9c6(0x16b)]=!![];},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x678)]=Sprite[_0x2ef904(0x6a6)]['destroy'],Sprite['prototype'][_0x2ef904(0x556)]=function(){const _0x1abfb2=_0x2ef904;VisuMZ[_0x1abfb2(0x6ac)][_0x1abfb2(0x678)][_0x1abfb2(0x64a)](this),this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x2ef904(0x6a6)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x436248=_0x2ef904;if(!this[_0x436248(0x325)])return;if(!this['bitmap'][_0x436248(0x16b)])return;this['bitmap'][_0x436248(0x1ba)]&&!this[_0x436248(0x44d)][_0x436248(0x1ba)][_0x436248(0x1b2)]&&this['bitmap'][_0x436248(0x556)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x652)]=Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x69c)],Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x69c)]=function(_0x32eaae,_0x3d5bd6){const _0x3a12bc=_0x2ef904;VisuMZ[_0x3a12bc(0x6ac)]['Bitmap_resize'][_0x3a12bc(0x64a)](this,_0x32eaae,_0x3d5bd6),this[_0x3a12bc(0x2f0)]();},VisuMZ['CoreEngine'][_0x2ef904(0x861)]=Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x86a)],Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x86a)]=function(_0xff0216,_0x322fd5,_0xc79c8a,_0x53332e,_0x27aea6,_0x1c85ec,_0x2366d7,_0x5ef027,_0x16698b){const _0x1dc0b0=_0x2ef904;VisuMZ['CoreEngine'][_0x1dc0b0(0x861)][_0x1dc0b0(0x64a)](this,_0xff0216,_0x322fd5,_0xc79c8a,_0x53332e,_0x27aea6,_0x1c85ec,_0x2366d7,_0x5ef027,_0x16698b),this[_0x1dc0b0(0x2f0)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x871)]=Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x76f)],Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x76f)]=function(_0x1a1751,_0x1ed32e,_0x180ed9,_0x3b312b){const _0x2b50fb=_0x2ef904;VisuMZ[_0x2b50fb(0x6ac)][_0x2b50fb(0x871)][_0x2b50fb(0x64a)](this,_0x1a1751,_0x1ed32e,_0x180ed9,_0x3b312b),this[_0x2b50fb(0x2f0)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x4ee)]=Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x595)],Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x595)]=function(_0x376dec,_0x3ce9af,_0x289cba,_0x1f05a2,_0x4d147d){const _0x35ea06=_0x2ef904;VisuMZ[_0x35ea06(0x6ac)]['Bitmap_fillRect'][_0x35ea06(0x64a)](this,_0x376dec,_0x3ce9af,_0x289cba,_0x1f05a2,_0x4d147d),this[_0x35ea06(0x2f0)]();},VisuMZ['CoreEngine']['Bitmap_strokeRect']=Bitmap['prototype'][_0x2ef904(0x763)],Bitmap[_0x2ef904(0x6a6)]['strokeRect']=function(_0x8771c5,_0x518747,_0x41ddc5,_0x1f750c,_0x3f8676){const _0x1c90a3=_0x2ef904;VisuMZ[_0x1c90a3(0x6ac)][_0x1c90a3(0x5b6)][_0x1c90a3(0x64a)](this,_0x8771c5,_0x518747,_0x41ddc5,_0x1f750c,_0x3f8676),this[_0x1c90a3(0x2f0)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x724)]=Bitmap['prototype'][_0x2ef904(0x669)],Bitmap[_0x2ef904(0x6a6)]['gradientFillRect']=function(_0x4a378b,_0x2d4ebe,_0x2153c8,_0x33eebb,_0x33816d,_0x4cf35b,_0x365f2f){const _0x11a124=_0x2ef904;VisuMZ[_0x11a124(0x6ac)][_0x11a124(0x724)][_0x11a124(0x64a)](this,_0x4a378b,_0x2d4ebe,_0x2153c8,_0x33eebb,_0x33816d,_0x4cf35b,_0x365f2f),this[_0x11a124(0x2f0)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x847)]=Bitmap['prototype'][_0x2ef904(0x1b3)],Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x1b3)]=function(_0x29c961,_0x170cdf,_0x28f1c1,_0x4f2370){const _0x3b9b1d=_0x2ef904;_0x29c961=Math[_0x3b9b1d(0x546)](_0x29c961),_0x170cdf=Math[_0x3b9b1d(0x546)](_0x170cdf),_0x28f1c1=Math[_0x3b9b1d(0x546)](_0x28f1c1),VisuMZ[_0x3b9b1d(0x6ac)]['Bitmap_drawCircle'][_0x3b9b1d(0x64a)](this,_0x29c961,_0x170cdf,_0x28f1c1,_0x4f2370),this[_0x3b9b1d(0x2f0)]();},VisuMZ['CoreEngine'][_0x2ef904(0x837)]=Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x66a)],Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x66a)]=function(_0x5cda59){const _0x2e35fa=_0x2ef904;return Math[_0x2e35fa(0x546)](VisuMZ[_0x2e35fa(0x6ac)][_0x2e35fa(0x837)][_0x2e35fa(0x64a)](this,_0x5cda59));},VisuMZ['CoreEngine'][_0x2ef904(0x551)]=Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x3a1)],Bitmap[_0x2ef904(0x6a6)]['drawText']=function(_0x436776,_0x4435a6,_0x392d33,_0x244cb3,_0x4db01b,_0x4012f1){const _0x27a747=_0x2ef904;_0x4435a6=Math[_0x27a747(0x546)](_0x4435a6),_0x392d33=Math[_0x27a747(0x546)](_0x392d33),_0x244cb3=Math[_0x27a747(0x546)](_0x244cb3),_0x4db01b=Math[_0x27a747(0x546)](_0x4db01b),VisuMZ[_0x27a747(0x6ac)][_0x27a747(0x551)]['call'](this,_0x436776,_0x4435a6,_0x392d33,_0x244cb3,_0x4db01b,_0x4012f1),this[_0x27a747(0x2f0)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x7e5)]=Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x6bd)],Bitmap[_0x2ef904(0x6a6)][_0x2ef904(0x6bd)]=function(_0x1f97bb,_0x8b0efb,_0x34b391,_0x55455a){const _0x1bdf81=_0x2ef904;if(VisuMZ['CoreEngine']['Settings'][_0x1bdf81(0x788)][_0x1bdf81(0x657)])this[_0x1bdf81(0x452)](_0x1f97bb,_0x8b0efb,_0x34b391,_0x55455a);else{if(_0x1bdf81(0x242)==='gkuRn')VisuMZ[_0x1bdf81(0x6ac)][_0x1bdf81(0x7e5)]['call'](this,_0x1f97bb,_0x8b0efb,_0x34b391,_0x55455a);else{function _0x2b72ae(){const _0x98d60f=_0x1bdf81;this[_0x98d60f(0x2d5)][_0x98d60f(0x223)](_0x322a54['layoutSettings'][_0x98d60f(0x3d3)]);}}}},Bitmap['prototype']['_drawTextShadow']=function(_0x329c88,_0x19175a,_0x38d173,_0x1b3619){const _0xf28596=_0x2ef904,_0x5163c2=this[_0xf28596(0x5ce)];_0x5163c2[_0xf28596(0x31a)]=this[_0xf28596(0x357)],_0x5163c2['fillText'](_0x329c88,_0x19175a+0x2,_0x38d173+0x2,_0x1b3619);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x875)]=Input[_0x2ef904(0x57b)],Input[_0x2ef904(0x57b)]=function(){const _0x17c80f=_0x2ef904;VisuMZ['CoreEngine']['Input_clear'][_0x17c80f(0x64a)](this),this[_0x17c80f(0x30a)]=undefined,this[_0x17c80f(0x4da)]=undefined,this['_gamepadWait']=Input[_0x17c80f(0x184)];},VisuMZ['CoreEngine'][_0x2ef904(0x3ca)]=Input['update'],Input[_0x2ef904(0x3df)]=function(){const _0x2715a7=_0x2ef904;VisuMZ['CoreEngine']['Input_update']['call'](this);if(this[_0x2715a7(0x4f6)])this['_gamepadWait']--;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x6b3)]=Input[_0x2ef904(0x26c)],Input[_0x2ef904(0x26c)]=function(){const _0x12c9b3=_0x2ef904;if(this[_0x12c9b3(0x4f6)])return;VisuMZ[_0x12c9b3(0x6ac)][_0x12c9b3(0x6b3)][_0x12c9b3(0x64a)](this);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x40e)]=Input[_0x2ef904(0x7d3)],Input[_0x2ef904(0x7d3)]=function(){const _0x308fb6=_0x2ef904;VisuMZ[_0x308fb6(0x6ac)][_0x308fb6(0x40e)]['call'](this),document['addEventListener'](_0x308fb6(0x256),this[_0x308fb6(0x773)][_0x308fb6(0x617)](this));},VisuMZ[_0x2ef904(0x6ac)]['Input_onKeyDown']=Input[_0x2ef904(0x7b7)],Input['_onKeyDown']=function(_0x4b0853){const _0x16925d=_0x2ef904;this['_inputSpecialKeyCode']=_0x4b0853[_0x16925d(0x3ec)],VisuMZ['CoreEngine']['Input_onKeyDown'][_0x16925d(0x64a)](this,_0x4b0853);},Input[_0x2ef904(0x773)]=function(_0x832754){const _0x446af5=_0x2ef904;this[_0x446af5(0x1db)](_0x832754);},Input[_0x2ef904(0x1db)]=function(_0x507d0d){const _0x940652=_0x2ef904;this[_0x940652(0x4da)]=_0x507d0d[_0x940652(0x3ec)];let _0x3fec5f=String[_0x940652(0x574)](_0x507d0d[_0x940652(0x6de)]);this[_0x940652(0x30a)]===undefined?this[_0x940652(0x30a)]=_0x3fec5f:this[_0x940652(0x30a)]+=_0x3fec5f;},VisuMZ['CoreEngine'][_0x2ef904(0x7e9)]=Input['_shouldPreventDefault'],Input['_shouldPreventDefault']=function(_0x133a10){const _0x288bda=_0x2ef904;if(_0x133a10===0x8)return![];return VisuMZ[_0x288bda(0x6ac)][_0x288bda(0x7e9)]['call'](this,_0x133a10);},Input['isSpecialCode']=function(_0x33ff3a){const _0x409e23=_0x2ef904;if(_0x33ff3a[_0x409e23(0x376)](/backspace/i))return this[_0x409e23(0x4da)]===0x8;if(_0x33ff3a[_0x409e23(0x376)](/enter/i))return this[_0x409e23(0x4da)]===0xd;if(_0x33ff3a[_0x409e23(0x376)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x2ef904(0x5b1)]=function(){const _0x36a650=_0x2ef904;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x36a650(0x651)](this[_0x36a650(0x4da)]);},Input['isArrowPressed']=function(){const _0x4f4c3d=_0x2ef904;return[0x25,0x26,0x27,0x28][_0x4f4c3d(0x651)](this[_0x4f4c3d(0x4da)]);},Input[_0x2ef904(0x71f)]=function(){const _0x385fdf=_0x2ef904;if(navigator[_0x385fdf(0x80e)]){if(_0x385fdf(0x33c)!==_0x385fdf(0x33c)){function _0x10aab8(){const _0x451e94=_0x385fdf;_0x493c50[_0x451e94(0x6ac)][_0x451e94(0x5ba)]['QoL'][_0x451e94(0x657)]?this[_0x451e94(0x452)](_0x4263ad,_0x10982d,_0x2bc89e,_0x577281):_0x271a76[_0x451e94(0x6ac)][_0x451e94(0x7e5)][_0x451e94(0x64a)](this,_0x5ab9e9,_0x20aa14,_0x1fac28,_0x484834);}}else{const _0x2af896=navigator[_0x385fdf(0x80e)]();if(_0x2af896)for(const _0xa52c78 of _0x2af896){if(_0xa52c78&&_0xa52c78[_0x385fdf(0x279)])return!![];}}}return![];},Input[_0x2ef904(0x151)]=function(){const _0x4bc4cf=_0x2ef904;if(navigator[_0x4bc4cf(0x80e)]){const _0x280616=navigator[_0x4bc4cf(0x80e)]();if(_0x280616){if(_0x4bc4cf(0x3d6)==='PnGJK')for(const _0x271b7e of _0x280616){if('FERGr'!==_0x4bc4cf(0x6b8)){function _0x5622c6(){return 0x0;}}else{if(_0x271b7e&&_0x271b7e['connected']){if(_0x4bc4cf(0x5de)===_0x4bc4cf(0x47b)){function _0x51e9cd(){return _0x25d4aa(_0x17b6ae)['toLocaleString'](_0x183b95,_0x4b58c6);}}else{if(this['isGamepadButtonPressed'](_0x271b7e))return!![];}}}}else{function _0x3f7d96(){this['catchLoadError'](_0x248e96);}}}}return![];},Input['isGamepadButtonPressed']=function(_0x4e3f39){const _0x55b145=_0x2ef904,_0x26ef6e=_0x4e3f39[_0x55b145(0x4c7)];for(let _0x167348=0x0;_0x167348<_0x26ef6e[_0x55b145(0x862)];_0x167348++){if(_0x26ef6e[_0x167348][_0x55b145(0x4a0)])return!![];}return![];},VisuMZ[_0x2ef904(0x6ac)]['Tilemap_addShadow']=Tilemap[_0x2ef904(0x6a6)]['_addShadow'],Tilemap[_0x2ef904(0x6a6)][_0x2ef904(0x811)]=function(_0x31c99f,_0x10f023,_0x6c0261,_0x1cea1f){const _0x1e1090=_0x2ef904;if($gameMap&&$gameMap[_0x1e1090(0x2f2)]())return;VisuMZ[_0x1e1090(0x6ac)][_0x1e1090(0x3f7)][_0x1e1090(0x64a)](this,_0x31c99f,_0x10f023,_0x6c0261,_0x1cea1f);},Tilemap[_0x2ef904(0x722)][_0x2ef904(0x6a6)][_0x2ef904(0x37b)]=function(){const _0x178bb5=_0x2ef904;this[_0x178bb5(0x71d)]();for(let _0x500316=0x0;_0x500316<Tilemap['Layer'][_0x178bb5(0x15d)];_0x500316++){const _0x56a7d0=new PIXI[(_0x178bb5(0x647))]();_0x56a7d0['setSize'](0x800,0x800),VisuMZ['CoreEngine'][_0x178bb5(0x5ba)]['QoL'][_0x178bb5(0x57c)]&&(_0x56a7d0[_0x178bb5(0x397)]=PIXI[_0x178bb5(0x834)][_0x178bb5(0x566)]),this[_0x178bb5(0x24a)][_0x178bb5(0x147)](_0x56a7d0);}},WindowLayer['prototype'][_0x2ef904(0x2a3)]=function(){const _0x1fbf6c=_0x2ef904;if(SceneManager&&SceneManager['_scene'])return SceneManager[_0x1fbf6c(0x4a8)][_0x1fbf6c(0x5dd)]();else{if(_0x1fbf6c(0x3cb)===_0x1fbf6c(0x3e2)){function _0x258e7d(){const _0x43ecda=_0x1fbf6c;_0x3b4d98[_0x43ecda(0x43a)](_0x280736);}}else return!![];}},VisuMZ['CoreEngine'][_0x2ef904(0x841)]=WindowLayer['prototype'][_0x2ef904(0x5cc)],WindowLayer['prototype'][_0x2ef904(0x5cc)]=function render(_0x27696c){const _0x3a6f98=_0x2ef904;if(this[_0x3a6f98(0x2a3)]()){if('BlNNO'===_0x3a6f98(0x1ac)){function _0x999471(){const _0x4d92a7=_0x3a6f98;_0x448166[_0x4d92a7(0x7be)]()&&(_0x346163[_0x4d92a7(0x466)](_0x4d92a7(0x175)),_0xb762b[_0x4d92a7(0x466)](_0x2b498d));}}else VisuMZ[_0x3a6f98(0x6ac)]['WindowLayer_render'][_0x3a6f98(0x64a)](this,_0x27696c);}else{if(_0x3a6f98(0x540)===_0x3a6f98(0x1d5)){function _0x3f1eaa(){const _0x2d79b1=_0x3a6f98;_0x4fb286[_0x2d79b1(0x6ac)][_0x2d79b1(0x58b)][_0x2d79b1(0x64a)](this);}}else this[_0x3a6f98(0x561)](_0x27696c);}},WindowLayer[_0x2ef904(0x6a6)]['renderNoMask']=function render(_0x2e6e18){const _0x42e9ef=_0x2ef904;if(!this[_0x42e9ef(0x599)])return;const _0x1c5154=new PIXI[(_0x42e9ef(0x789))](),_0x301c9e=_0x2e6e18['gl'],_0x1d111a=this[_0x42e9ef(0x854)]['clone']();_0x2e6e18[_0x42e9ef(0x1a1)][_0x42e9ef(0x815)](),_0x1c5154[_0x42e9ef(0x6cf)]=this[_0x42e9ef(0x6cf)],_0x2e6e18[_0x42e9ef(0x6cc)][_0x42e9ef(0x6c8)](),_0x301c9e[_0x42e9ef(0x1fc)](_0x301c9e[_0x42e9ef(0x712)]);while(_0x1d111a['length']>0x0){if('rtZss'!=='rtZss'){function _0x135bea(){return![];}}else{const _0x6512ad=_0x1d111a[_0x42e9ef(0x808)]();_0x6512ad['_isWindow']&&_0x6512ad['visible']&&_0x6512ad['openness']>0x0&&(_0x301c9e['stencilFunc'](_0x301c9e[_0x42e9ef(0x81b)],0x0,~0x0),_0x301c9e['stencilOp'](_0x301c9e[_0x42e9ef(0x509)],_0x301c9e[_0x42e9ef(0x509)],_0x301c9e['KEEP']),_0x6512ad['render'](_0x2e6e18),_0x2e6e18[_0x42e9ef(0x6cc)][_0x42e9ef(0x6c8)](),_0x1c5154[_0x42e9ef(0x57b)](),_0x301c9e[_0x42e9ef(0x671)](_0x301c9e[_0x42e9ef(0x302)],0x1,~0x0),_0x301c9e[_0x42e9ef(0x4ec)](_0x301c9e[_0x42e9ef(0x287)],_0x301c9e[_0x42e9ef(0x287)],_0x301c9e[_0x42e9ef(0x287)]),_0x301c9e[_0x42e9ef(0x64e)](_0x301c9e[_0x42e9ef(0x162)],_0x301c9e[_0x42e9ef(0x493)]),_0x1c5154[_0x42e9ef(0x5cc)](_0x2e6e18),_0x2e6e18[_0x42e9ef(0x6cc)][_0x42e9ef(0x6c8)](),_0x301c9e['blendFunc'](_0x301c9e[_0x42e9ef(0x493)],_0x301c9e['ONE_MINUS_SRC_ALPHA']));}}_0x301c9e['disable'](_0x301c9e[_0x42e9ef(0x712)]),_0x301c9e[_0x42e9ef(0x57b)](_0x301c9e[_0x42e9ef(0x656)]),_0x301c9e[_0x42e9ef(0x1dc)](0x0),_0x2e6e18[_0x42e9ef(0x6cc)]['flush']();for(const _0x3816c2 of this[_0x42e9ef(0x854)]){if(_0x42e9ef(0x7c5)!==_0x42e9ef(0x7c5)){function _0x3bb2e8(){const _0x3e38f3=_0x42e9ef,_0x4d919a=_0x397ddb[_0x3e38f3(0x895)](_0x2a5d5a);_0x2f457a[_0x3e38f3(0x3ae)](_0x20cddf,!_0x4d919a);}}else!_0x3816c2[_0x42e9ef(0x218)]&&_0x3816c2[_0x42e9ef(0x599)]&&_0x3816c2[_0x42e9ef(0x5cc)](_0x2e6e18);}_0x2e6e18[_0x42e9ef(0x6cc)][_0x42e9ef(0x6c8)]();},DataManager[_0x2ef904(0x4b4)]=function(_0x695a07){const _0x4ba0d1=_0x2ef904;return this[_0x4ba0d1(0x89a)](_0x695a07)&&_0x695a07['itypeId']===0x2;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x1f5)]=DataManager['setupNewGame'],DataManager[_0x2ef904(0x14e)]=function(){const _0x474b77=_0x2ef904;VisuMZ['CoreEngine']['DataManager_setupNewGame'][_0x474b77(0x64a)](this),this[_0x474b77(0x3c6)](),this['reserveNewGameCommonEvent']();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x3893e5=_0x2ef904;if($gameTemp['isPlaytest']()){if(_0x3893e5(0x32e)!==_0x3893e5(0x32e)){function _0x3bf654(){const _0x103f0e=_0x3893e5;if(_0x26acdc[_0x103f0e(0x71f)]())return _0x103f0e(0x166);return _0xff9130[_0x103f0e(0x6ac)]['Settings'][_0x103f0e(0x49e)][_0x103f0e(0x1af)]||_0x103f0e(0x297);}}else{const _0x1c6968=VisuMZ[_0x3893e5(0x6ac)][_0x3893e5(0x5ba)][_0x3893e5(0x788)]['NewGameCommonEvent'];if(_0x1c6968>0x0)$gameTemp[_0x3893e5(0x705)](_0x1c6968);}}},DataManager[_0x2ef904(0x668)]=function(){const _0x1efe6e=_0x2ef904,_0x9027f9=VisuMZ['CoreEngine']['Settings'][_0x1efe6e(0x788)][_0x1efe6e(0x88d)]||0x0;if(_0x9027f9>0x0)$gameTemp['reserveCommonEvent'](_0x9027f9);},TextManager['stringKeyMap']=['','','',_0x2ef904(0x7d5),'','',_0x2ef904(0x15a),'',_0x2ef904(0x5a5),_0x2ef904(0x1b9),'','',_0x2ef904(0x43f),_0x2ef904(0x72a),_0x2ef904(0x1e1),'',_0x2ef904(0x291),_0x2ef904(0x362),'ALT',_0x2ef904(0x6f1),_0x2ef904(0x345),_0x2ef904(0x396),'EISU',_0x2ef904(0x695),_0x2ef904(0x73b),'HANJA','',_0x2ef904(0x896),'CONVERT',_0x2ef904(0x80b),_0x2ef904(0x58e),_0x2ef904(0x866),_0x2ef904(0x389),_0x2ef904(0x883),_0x2ef904(0x822),_0x2ef904(0x1c3),'HOME',_0x2ef904(0x408),'UP',_0x2ef904(0x1bb),_0x2ef904(0x7d0),_0x2ef904(0x852),_0x2ef904(0x222),_0x2ef904(0x422),_0x2ef904(0x38f),_0x2ef904(0x3d7),_0x2ef904(0x6e1),'','0','1','2','3','4','5','6','7','8','9',_0x2ef904(0x1f6),_0x2ef904(0x5c1),_0x2ef904(0x445),_0x2ef904(0x7ed),'GREATER_THAN',_0x2ef904(0x63e),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x2ef904(0x6a0),'',_0x2ef904(0x6b9),_0x2ef904(0x35f),'NUMPAD1',_0x2ef904(0x676),_0x2ef904(0x247),_0x2ef904(0x193),_0x2ef904(0x1c8),_0x2ef904(0x6d3),'NUMPAD7',_0x2ef904(0x723),'NUMPAD9',_0x2ef904(0x273),'ADD','SEPARATOR',_0x2ef904(0x26e),_0x2ef904(0x3be),_0x2ef904(0x69d),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11',_0x2ef904(0x85d),'F13','F14','F15',_0x2ef904(0x817),'F17','F18',_0x2ef904(0x48b),_0x2ef904(0x144),_0x2ef904(0x404),'F22','F23','F24','','','','','','','','','NUM_LOCK',_0x2ef904(0x2de),_0x2ef904(0x1cd),'WIN_OEM_FJ_MASSHOU',_0x2ef904(0x786),_0x2ef904(0x74a),_0x2ef904(0x57e),'','','','','','','','','',_0x2ef904(0x49f),'EXCLAMATION','DOUBLE_QUOTE',_0x2ef904(0x76e),_0x2ef904(0x511),_0x2ef904(0x5b4),'AMPERSAND','UNDERSCORE',_0x2ef904(0x80f),'CLOSE_PAREN',_0x2ef904(0x2f8),_0x2ef904(0x6af),_0x2ef904(0x257),_0x2ef904(0x2e1),_0x2ef904(0x791),'CLOSE_CURLY_BRACKET',_0x2ef904(0x5ea),'','','','',_0x2ef904(0x2bf),_0x2ef904(0x6ec),'VOLUME_UP','','',_0x2ef904(0x5c1),_0x2ef904(0x7ed),_0x2ef904(0x7a4),_0x2ef904(0x4ca),_0x2ef904(0x68d),'SLASH',_0x2ef904(0x28b),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x2ef904(0x6b2),'BACK_SLASH','CLOSE_BRACKET',_0x2ef904(0x378),'',_0x2ef904(0x514),_0x2ef904(0x24b),'',_0x2ef904(0x876),_0x2ef904(0x504),'',_0x2ef904(0x3f3),'','',_0x2ef904(0x383),_0x2ef904(0x603),_0x2ef904(0x70c),'WIN_OEM_PA2',_0x2ef904(0x17d),_0x2ef904(0x254),_0x2ef904(0x560),_0x2ef904(0x23e),_0x2ef904(0x855),_0x2ef904(0x4c4),'WIN_OEM_AUTO',_0x2ef904(0x25c),'WIN_OEM_BACKTAB',_0x2ef904(0x81f),'CRSEL',_0x2ef904(0x557),'EREOF',_0x2ef904(0x3c7),_0x2ef904(0x87b),'',_0x2ef904(0x2d6),_0x2ef904(0x47a),''],TextManager['buttonAssistOk']=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x3f8)][_0x2ef904(0x1e5)],TextManager['buttonAssistCancel']=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x3f8)][_0x2ef904(0x143)],TextManager['buttonAssistSwitch']=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x3f8)][_0x2ef904(0x532)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x60b)]=TextManager[_0x2ef904(0x7e3)],TextManager['param']=function(_0x4a657a){const _0x5a74f3=_0x2ef904;if(typeof _0x4a657a===_0x5a74f3(0x581)){if(_0x5a74f3(0x24e)!==_0x5a74f3(0x24e)){function _0x14aa33(){const _0x5cc72d=_0x5a74f3;_0x5b40e6['isPressed'](_0x5cc72d(0x808))&&this[_0x5cc72d(0x7cc)]()?this[_0x5cc72d(0x838)]():this[_0x5cc72d(0x77b)](_0x2777e7[_0x5cc72d(0x1f8)]('up'));}}else return VisuMZ[_0x5a74f3(0x6ac)][_0x5a74f3(0x60b)][_0x5a74f3(0x64a)](this,_0x4a657a);}else return this['paramName'](_0x4a657a);},TextManager[_0x2ef904(0x38b)]=function(_0x561319){const _0x38aefd=_0x2ef904;_0x561319=String(_0x561319||'')[_0x38aefd(0x406)]();const _0x4c9413=VisuMZ['CoreEngine'][_0x38aefd(0x5ba)][_0x38aefd(0x663)];if(_0x561319==='MAXHP')return $dataSystem['terms'][_0x38aefd(0x34e)][0x0];if(_0x561319==='MAXMP')return $dataSystem[_0x38aefd(0x274)]['params'][0x1];if(_0x561319==='ATK')return $dataSystem[_0x38aefd(0x274)][_0x38aefd(0x34e)][0x2];if(_0x561319===_0x38aefd(0x469))return $dataSystem[_0x38aefd(0x274)]['params'][0x3];if(_0x561319===_0x38aefd(0x240))return $dataSystem['terms'][_0x38aefd(0x34e)][0x4];if(_0x561319==='MDF')return $dataSystem[_0x38aefd(0x274)][_0x38aefd(0x34e)][0x5];if(_0x561319===_0x38aefd(0x20a))return $dataSystem['terms'][_0x38aefd(0x34e)][0x6];if(_0x561319==='LUK')return $dataSystem['terms'][_0x38aefd(0x34e)][0x7];if(_0x561319===_0x38aefd(0x799))return _0x4c9413[_0x38aefd(0x4fe)];if(_0x561319==='EVA')return _0x4c9413[_0x38aefd(0x3fe)];if(_0x561319==='CRI')return _0x4c9413[_0x38aefd(0x405)];if(_0x561319==='CEV')return _0x4c9413[_0x38aefd(0x616)];if(_0x561319===_0x38aefd(0x356))return _0x4c9413[_0x38aefd(0x27b)];if(_0x561319===_0x38aefd(0x8a0))return _0x4c9413[_0x38aefd(0x168)];if(_0x561319===_0x38aefd(0x516))return _0x4c9413[_0x38aefd(0x3b3)];if(_0x561319==='HRG')return _0x4c9413[_0x38aefd(0x7d2)];if(_0x561319===_0x38aefd(0x2c8))return _0x4c9413['XParamVocab8'];if(_0x561319===_0x38aefd(0x60a))return _0x4c9413[_0x38aefd(0x75e)];if(_0x561319==='TGR')return _0x4c9413[_0x38aefd(0x69a)];if(_0x561319==='GRD')return _0x4c9413['SParamVocab1'];if(_0x561319===_0x38aefd(0x207))return _0x4c9413[_0x38aefd(0x5b7)];if(_0x561319==='PHA')return _0x4c9413[_0x38aefd(0x392)];if(_0x561319==='MCR')return _0x4c9413[_0x38aefd(0x40d)];if(_0x561319===_0x38aefd(0x374))return _0x4c9413['SParamVocab5'];if(_0x561319==='PDR')return _0x4c9413['SParamVocab6'];if(_0x561319==='MDR')return _0x4c9413[_0x38aefd(0x591)];if(_0x561319===_0x38aefd(0x3b9))return _0x4c9413[_0x38aefd(0x779)];if(_0x561319===_0x38aefd(0x56b))return _0x4c9413['SParamVocab9'];if(VisuMZ['CoreEngine'][_0x38aefd(0x41e)][_0x561319]){if('lWWPQ'!==_0x38aefd(0x84d))return VisuMZ['CoreEngine']['CustomParamNames'][_0x561319];else{function _0x38960c(){const _0x1b5b23=_0x38aefd;this['_clickHandler']&&this[_0x1b5b23(0x760)]();}}}return'';},TextManager['getInputButtonString']=function(_0x231b99){const _0x42d575=_0x2ef904;if(_0x231b99===_0x42d575(0x37a))_0x231b99=_0x42d575(0x37f);let _0x22c2cc=[];for(let _0x27c7ff in Input[_0x42d575(0x893)]){_0x27c7ff=Number(_0x27c7ff);if(_0x27c7ff>=0x60&&_0x27c7ff<=0x69)continue;if([0x12,0x20][_0x42d575(0x352)](_0x27c7ff))continue;_0x231b99===Input[_0x42d575(0x893)][_0x27c7ff]&&_0x22c2cc[_0x42d575(0x147)](_0x27c7ff);}for(let _0x567a2f=0x0;_0x567a2f<_0x22c2cc['length'];_0x567a2f++){_0x22c2cc[_0x567a2f]=TextManager[_0x42d575(0x85c)][_0x22c2cc[_0x567a2f]];}return this['makeInputButtonString'](_0x22c2cc);},TextManager[_0x2ef904(0x208)]=function(_0x1df8b9){const _0x5926e9=_0x2ef904,_0x1e8295=VisuMZ[_0x5926e9(0x6ac)][_0x5926e9(0x5ba)][_0x5926e9(0x3f8)],_0x44151a=_0x1e8295[_0x5926e9(0x77f)],_0x9d8cce=_0x1df8b9[_0x5926e9(0x4aa)](),_0x2dade2=_0x5926e9(0x30b)[_0x5926e9(0x764)](_0x9d8cce);return _0x1e8295[_0x2dade2]?_0x1e8295[_0x2dade2]:_0x44151a['format'](_0x9d8cce);},TextManager[_0x2ef904(0x5f4)]=function(_0x357df4,_0x1a5cd1){const _0x25fc66=_0x2ef904,_0x36c989=VisuMZ[_0x25fc66(0x6ac)][_0x25fc66(0x5ba)][_0x25fc66(0x3f8)],_0xccd412=_0x36c989[_0x25fc66(0x6cd)],_0x195a3e=this[_0x25fc66(0x65d)](_0x357df4),_0x4b790a=this[_0x25fc66(0x65d)](_0x1a5cd1);return _0xccd412[_0x25fc66(0x764)](_0x195a3e,_0x4b790a);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x28c)]=ColorManager[_0x2ef904(0x494)],ColorManager[_0x2ef904(0x494)]=function(){const _0x302bf0=_0x2ef904;VisuMZ['CoreEngine'][_0x302bf0(0x28c)][_0x302bf0(0x64a)](this),this[_0x302bf0(0x622)]=this[_0x302bf0(0x622)]||{};},ColorManager[_0x2ef904(0x5e5)]=function(_0x4ec92b,_0x3e1d23){const _0x3bb783=_0x2ef904;_0x3e1d23=String(_0x3e1d23),this[_0x3bb783(0x622)]=this[_0x3bb783(0x622)]||{};if(_0x3e1d23['match'](/#(.*)/i)){if('wEXwh'!==_0x3bb783(0x1c5))this[_0x3bb783(0x622)][_0x4ec92b]=_0x3bb783(0x76d)['format'](String(RegExp['$1']));else{function _0x1b4365(){const _0x41d937=_0x3bb783;for(const _0x1c614a of _0x4c1d5b){if(_0x1c614a&&_0x1c614a[_0x41d937(0x279)])return!![];}}}}else{if(_0x3bb783(0x864)!=='XGviQ')this[_0x3bb783(0x622)][_0x4ec92b]=this[_0x3bb783(0x7b2)](Number(_0x3e1d23));else{function _0x209f01(){const _0x5c11fd=_0x3bb783;return this[_0x5c11fd(0x37d)]['length']>0x0;}}}return this[_0x3bb783(0x622)][_0x4ec92b];},ColorManager['getColor']=function(_0x2f99bd){const _0x1716d7=_0x2ef904;return _0x2f99bd=String(_0x2f99bd),_0x2f99bd[_0x1716d7(0x376)](/#(.*)/i)?_0x1716d7(0x76d)[_0x1716d7(0x764)](String(RegExp['$1'])):this[_0x1716d7(0x7b2)](Number(_0x2f99bd));},ColorManager[_0x2ef904(0x3a5)]=function(){const _0x2efe7b=_0x2ef904;this[_0x2efe7b(0x622)]={};},ColorManager[_0x2ef904(0x2b9)]=function(){const _0x43083c=_0x2ef904,_0x48cbb1=_0x43083c(0x4cc);this[_0x43083c(0x622)]=this[_0x43083c(0x622)]||{};if(this[_0x43083c(0x622)][_0x48cbb1])return this[_0x43083c(0x622)][_0x48cbb1];const _0x5bc23f=VisuMZ[_0x43083c(0x6ac)][_0x43083c(0x5ba)]['Color']['ColorNormal'];return this[_0x43083c(0x5e5)](_0x48cbb1,_0x5bc23f);},ColorManager[_0x2ef904(0x79d)]=function(){const _0x10f12b=_0x2ef904,_0x2c8217=_0x10f12b(0x6eb);this[_0x10f12b(0x622)]=this[_0x10f12b(0x622)]||{};if(this[_0x10f12b(0x622)][_0x2c8217])return this['_colorCache'][_0x2c8217];const _0x3c61d5=VisuMZ[_0x10f12b(0x6ac)][_0x10f12b(0x5ba)]['Color'][_0x10f12b(0x5a3)];return this['getColorDataFromPluginParameters'](_0x2c8217,_0x3c61d5);},ColorManager[_0x2ef904(0x59c)]=function(){const _0x5e45a9=_0x2ef904,_0x24132a=_0x5e45a9(0x6f8);this[_0x5e45a9(0x622)]=this['_colorCache']||{};if(this[_0x5e45a9(0x622)][_0x24132a])return this[_0x5e45a9(0x622)][_0x24132a];const _0x472f59=VisuMZ['CoreEngine'][_0x5e45a9(0x5ba)][_0x5e45a9(0x888)][_0x5e45a9(0x375)];return this[_0x5e45a9(0x5e5)](_0x24132a,_0x472f59);},ColorManager[_0x2ef904(0x824)]=function(){const _0x4a5d3f=_0x2ef904,_0x1bc90b=_0x4a5d3f(0x267);this[_0x4a5d3f(0x622)]=this[_0x4a5d3f(0x622)]||{};if(this[_0x4a5d3f(0x622)][_0x1bc90b])return this[_0x4a5d3f(0x622)][_0x1bc90b];const _0x1170a1=VisuMZ[_0x4a5d3f(0x6ac)][_0x4a5d3f(0x5ba)][_0x4a5d3f(0x888)][_0x4a5d3f(0x782)];return this[_0x4a5d3f(0x5e5)](_0x1bc90b,_0x1170a1);},ColorManager[_0x2ef904(0x5f2)]=function(){const _0x3cf4cb=_0x2ef904,_0x10a64c='_stored_gaugeBackColor';this[_0x3cf4cb(0x622)]=this[_0x3cf4cb(0x622)]||{};if(this['_colorCache'][_0x10a64c])return this[_0x3cf4cb(0x622)][_0x10a64c];const _0x5a4bd1=VisuMZ[_0x3cf4cb(0x6ac)]['Settings'][_0x3cf4cb(0x888)][_0x3cf4cb(0x5d0)];return this[_0x3cf4cb(0x5e5)](_0x10a64c,_0x5a4bd1);},ColorManager['hpGaugeColor1']=function(){const _0x5b8991=_0x2ef904,_0x46870b=_0x5b8991(0x51a);this[_0x5b8991(0x622)]=this[_0x5b8991(0x622)]||{};if(this[_0x5b8991(0x622)][_0x46870b])return this[_0x5b8991(0x622)][_0x46870b];const _0x2ca8e9=VisuMZ[_0x5b8991(0x6ac)][_0x5b8991(0x5ba)]['Color']['ColorHPGauge1'];return this[_0x5b8991(0x5e5)](_0x46870b,_0x2ca8e9);},ColorManager[_0x2ef904(0x534)]=function(){const _0x5795c1=_0x2ef904,_0x3e007b=_0x5795c1(0x149);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x3e007b])return this[_0x5795c1(0x622)][_0x3e007b];const _0x3e9da9=VisuMZ[_0x5795c1(0x6ac)][_0x5795c1(0x5ba)][_0x5795c1(0x888)]['ColorHPGauge2'];return this['getColorDataFromPluginParameters'](_0x3e007b,_0x3e9da9);},ColorManager[_0x2ef904(0x4fd)]=function(){const _0x1a4aa4=_0x2ef904,_0x29f312='_stored_mpGaugeColor1';this[_0x1a4aa4(0x622)]=this[_0x1a4aa4(0x622)]||{};if(this[_0x1a4aa4(0x622)][_0x29f312])return this[_0x1a4aa4(0x622)][_0x29f312];const _0x3458df=VisuMZ[_0x1a4aa4(0x6ac)][_0x1a4aa4(0x5ba)][_0x1a4aa4(0x888)][_0x1a4aa4(0x178)];return this[_0x1a4aa4(0x5e5)](_0x29f312,_0x3458df);},ColorManager[_0x2ef904(0x68b)]=function(){const _0x4714d6=_0x2ef904,_0x27f290=_0x4714d6(0x64b);this[_0x4714d6(0x622)]=this['_colorCache']||{};if(this['_colorCache'][_0x27f290])return this[_0x4714d6(0x622)][_0x27f290];const _0x1617f1=VisuMZ[_0x4714d6(0x6ac)][_0x4714d6(0x5ba)][_0x4714d6(0x888)]['ColorMPGauge2'];return this[_0x4714d6(0x5e5)](_0x27f290,_0x1617f1);},ColorManager['mpCostColor']=function(){const _0x32c7c8=_0x2ef904,_0xa40adb=_0x32c7c8(0x235);this[_0x32c7c8(0x622)]=this[_0x32c7c8(0x622)]||{};if(this['_colorCache'][_0xa40adb])return this[_0x32c7c8(0x622)][_0xa40adb];const _0x1ff624=VisuMZ[_0x32c7c8(0x6ac)][_0x32c7c8(0x5ba)][_0x32c7c8(0x888)][_0x32c7c8(0x36a)];return this['getColorDataFromPluginParameters'](_0xa40adb,_0x1ff624);},ColorManager[_0x2ef904(0x17f)]=function(){const _0x408fa8=_0x2ef904,_0x2e408d=_0x408fa8(0x68c);this[_0x408fa8(0x622)]=this[_0x408fa8(0x622)]||{};if(this[_0x408fa8(0x622)][_0x2e408d])return this[_0x408fa8(0x622)][_0x2e408d];const _0x465871=VisuMZ['CoreEngine'][_0x408fa8(0x5ba)][_0x408fa8(0x888)]['ColorPowerUp'];return this['getColorDataFromPluginParameters'](_0x2e408d,_0x465871);},ColorManager[_0x2ef904(0x2f9)]=function(){const _0x2a47ef=_0x2ef904,_0x3d5656='_stored_powerDownColor';this[_0x2a47ef(0x622)]=this[_0x2a47ef(0x622)]||{};if(this['_colorCache'][_0x3d5656])return this[_0x2a47ef(0x622)][_0x3d5656];const _0x58000c=VisuMZ[_0x2a47ef(0x6ac)][_0x2a47ef(0x5ba)][_0x2a47ef(0x888)]['ColorPowerDown'];return this[_0x2a47ef(0x5e5)](_0x3d5656,_0x58000c);},ColorManager[_0x2ef904(0x285)]=function(){const _0x4045e6=_0x2ef904,_0x45854c=_0x4045e6(0x1a8);this[_0x4045e6(0x622)]=this[_0x4045e6(0x622)]||{};if(this[_0x4045e6(0x622)][_0x45854c])return this[_0x4045e6(0x622)][_0x45854c];const _0x5ba17b=VisuMZ[_0x4045e6(0x6ac)][_0x4045e6(0x5ba)][_0x4045e6(0x888)]['ColorCTGauge1'];return this['getColorDataFromPluginParameters'](_0x45854c,_0x5ba17b);},ColorManager[_0x2ef904(0x41f)]=function(){const _0x126bde=_0x2ef904,_0x3f82a1=_0x126bde(0x2b1);this[_0x126bde(0x622)]=this[_0x126bde(0x622)]||{};if(this[_0x126bde(0x622)][_0x3f82a1])return this['_colorCache'][_0x3f82a1];const _0x15bfbd=VisuMZ[_0x126bde(0x6ac)]['Settings'][_0x126bde(0x888)]['ColorCTGauge2'];return this[_0x126bde(0x5e5)](_0x3f82a1,_0x15bfbd);},ColorManager[_0x2ef904(0x429)]=function(){const _0x1ab704=_0x2ef904,_0x5ebc30=_0x1ab704(0x7bc);this['_colorCache']=this['_colorCache']||{};if(this[_0x1ab704(0x622)][_0x5ebc30])return this['_colorCache'][_0x5ebc30];const _0x4d3d19=VisuMZ[_0x1ab704(0x6ac)]['Settings'][_0x1ab704(0x888)]['ColorTPGauge1'];return this[_0x1ab704(0x5e5)](_0x5ebc30,_0x4d3d19);},ColorManager['tpGaugeColor2']=function(){const _0x2059d8=_0x2ef904,_0x202296='_stored_tpGaugeColor2';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x202296])return this['_colorCache'][_0x202296];const _0x36c2af=VisuMZ[_0x2059d8(0x6ac)][_0x2059d8(0x5ba)]['Color']['ColorTPGauge2'];return this[_0x2059d8(0x5e5)](_0x202296,_0x36c2af);},ColorManager[_0x2ef904(0x575)]=function(){const _0x4f8437=_0x2ef904,_0xfe8b05='_stored_tpCostColor';this['_colorCache']=this[_0x4f8437(0x622)]||{};if(this[_0x4f8437(0x622)][_0xfe8b05])return this[_0x4f8437(0x622)][_0xfe8b05];const _0x352b84=VisuMZ[_0x4f8437(0x6ac)][_0x4f8437(0x5ba)][_0x4f8437(0x888)][_0x4f8437(0x7c2)];return this['getColorDataFromPluginParameters'](_0xfe8b05,_0x352b84);},ColorManager[_0x2ef904(0x210)]=function(){const _0x2d1b67=_0x2ef904,_0x267724=_0x2d1b67(0x283);this[_0x2d1b67(0x622)]=this[_0x2d1b67(0x622)]||{};if(this[_0x2d1b67(0x622)][_0x267724])return this[_0x2d1b67(0x622)][_0x267724];const _0x598547=VisuMZ[_0x2d1b67(0x6ac)][_0x2d1b67(0x5ba)][_0x2d1b67(0x888)][_0x2d1b67(0x7c2)];return this['getColorDataFromPluginParameters'](_0x267724,_0x598547);},ColorManager[_0x2ef904(0x681)]=function(){const _0x76e11b=_0x2ef904,_0x2e9dcb=_0x76e11b(0x278);this[_0x76e11b(0x622)]=this[_0x76e11b(0x622)]||{};if(this[_0x76e11b(0x622)][_0x2e9dcb])return this[_0x76e11b(0x622)][_0x2e9dcb];const _0x2d47dd=VisuMZ[_0x76e11b(0x6ac)][_0x76e11b(0x5ba)]['Color']['ColorExpGauge1'];return this[_0x76e11b(0x5e5)](_0x2e9dcb,_0x2d47dd);},ColorManager[_0x2ef904(0x889)]=function(){const _0x5555bd=_0x2ef904,_0x5a0fe4=_0x5555bd(0x50a);this['_colorCache']=this['_colorCache']||{};if(this[_0x5555bd(0x622)][_0x5a0fe4])return this[_0x5555bd(0x622)][_0x5a0fe4];const _0x25ddc7=VisuMZ[_0x5555bd(0x6ac)][_0x5555bd(0x5ba)]['Color'][_0x5555bd(0x7cf)];return this[_0x5555bd(0x5e5)](_0x5a0fe4,_0x25ddc7);},ColorManager['maxLvGaugeColor1']=function(){const _0x403fe7=_0x2ef904,_0x9afaea='_stored_maxLvGaugeColor1';this['_colorCache']=this['_colorCache']||{};if(this[_0x403fe7(0x622)][_0x9afaea])return this['_colorCache'][_0x9afaea];const _0x52ec94=VisuMZ[_0x403fe7(0x6ac)][_0x403fe7(0x5ba)][_0x403fe7(0x888)][_0x403fe7(0x246)];return this[_0x403fe7(0x5e5)](_0x9afaea,_0x52ec94);},ColorManager[_0x2ef904(0x6bc)]=function(){const _0x1133b7=_0x2ef904,_0x36cea2=_0x1133b7(0x2e9);this[_0x1133b7(0x622)]=this['_colorCache']||{};if(this[_0x1133b7(0x622)][_0x36cea2])return this['_colorCache'][_0x36cea2];const _0x5a0e91=VisuMZ[_0x1133b7(0x6ac)]['Settings'][_0x1133b7(0x888)][_0x1133b7(0x188)];return this['getColorDataFromPluginParameters'](_0x36cea2,_0x5a0e91);},ColorManager['hpColor']=function(_0x4b46a6){const _0x5a27cc=_0x2ef904;return VisuMZ[_0x5a27cc(0x6ac)][_0x5a27cc(0x5ba)][_0x5a27cc(0x888)]['ActorHPColor']['call'](this,_0x4b46a6);},ColorManager[_0x2ef904(0x277)]=function(_0x3d32ec){const _0x1a0527=_0x2ef904;return VisuMZ['CoreEngine'][_0x1a0527(0x5ba)][_0x1a0527(0x888)][_0x1a0527(0x5be)][_0x1a0527(0x64a)](this,_0x3d32ec);},ColorManager[_0x2ef904(0x418)]=function(_0x1deca6){const _0x13b7c8=_0x2ef904;return VisuMZ[_0x13b7c8(0x6ac)]['Settings'][_0x13b7c8(0x888)][_0x13b7c8(0x655)][_0x13b7c8(0x64a)](this,_0x1deca6);},ColorManager[_0x2ef904(0x498)]=function(_0x834afa){const _0x4b803c=_0x2ef904;return VisuMZ[_0x4b803c(0x6ac)][_0x4b803c(0x5ba)][_0x4b803c(0x888)]['ParamChange'][_0x4b803c(0x64a)](this,_0x834afa);},ColorManager[_0x2ef904(0x4af)]=function(_0x479b43){const _0x82b0ff=_0x2ef904;return VisuMZ[_0x82b0ff(0x6ac)][_0x82b0ff(0x5ba)][_0x82b0ff(0x888)][_0x82b0ff(0x419)][_0x82b0ff(0x64a)](this,_0x479b43);},ColorManager[_0x2ef904(0x357)]=function(){const _0x3bfb59=_0x2ef904;return VisuMZ['CoreEngine'][_0x3bfb59(0x5ba)]['Color'][_0x3bfb59(0x243)];},ColorManager[_0x2ef904(0x212)]=function(){const _0x4652e6=_0x2ef904;return VisuMZ[_0x4652e6(0x6ac)][_0x4652e6(0x5ba)][_0x4652e6(0x888)][_0x4652e6(0x4b1)]||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x2ef904(0x33a)]=function(){const _0x54977f=_0x2ef904;return VisuMZ[_0x54977f(0x6ac)][_0x54977f(0x5ba)][_0x54977f(0x888)][_0x54977f(0x4a4)]||_0x54977f(0x4a6);},ColorManager[_0x2ef904(0x220)]=function(){const _0x53fe52=_0x2ef904;return VisuMZ[_0x53fe52(0x6ac)][_0x53fe52(0x5ba)][_0x53fe52(0x888)]['DimColor1'];},ColorManager[_0x2ef904(0x75a)]=function(){const _0x5cf595=_0x2ef904;return VisuMZ[_0x5cf595(0x6ac)][_0x5cf595(0x5ba)][_0x5cf595(0x888)][_0x5cf595(0x478)];},ColorManager[_0x2ef904(0x78d)]=function(){const _0x20549a=_0x2ef904;return VisuMZ[_0x20549a(0x6ac)][_0x20549a(0x5ba)][_0x20549a(0x888)]['ItemBackColor1'];},ColorManager[_0x2ef904(0x598)]=function(){const _0x4bb1ac=_0x2ef904;return VisuMZ[_0x4bb1ac(0x6ac)][_0x4bb1ac(0x5ba)]['Color'][_0x4bb1ac(0x754)];},SceneManager[_0x2ef904(0x798)]=[],VisuMZ[_0x2ef904(0x6ac)]['SceneManager_initialize']=SceneManager[_0x2ef904(0x13d)],SceneManager[_0x2ef904(0x13d)]=function(){const _0x481dd8=_0x2ef904;VisuMZ['CoreEngine'][_0x481dd8(0x2ba)]['call'](this),this[_0x481dd8(0x5f5)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x416)]=SceneManager[_0x2ef904(0x1e7)],SceneManager[_0x2ef904(0x1e7)]=function(_0xa6cb06){const _0x38f941=_0x2ef904;if($gameTemp)this[_0x38f941(0x7a5)](_0xa6cb06);VisuMZ[_0x38f941(0x6ac)][_0x38f941(0x416)][_0x38f941(0x64a)](this,_0xa6cb06);},SceneManager[_0x2ef904(0x7a5)]=function(_0x1c876c){const _0x2137a6=_0x2ef904;if(!_0x1c876c[_0x2137a6(0x205)]&&!_0x1c876c[_0x2137a6(0x439)])switch(_0x1c876c[_0x2137a6(0x3ec)]){case 0x75:this['playTestF6']();break;case 0x76:if(Input[_0x2137a6(0x860)]('shift')||Input[_0x2137a6(0x860)](_0x2137a6(0x314)))return;this[_0x2137a6(0x2f4)]();break;}},SceneManager[_0x2ef904(0x336)]=function(){const _0x203c4c=_0x2ef904;if($gameTemp['isPlaytest']()&&VisuMZ[_0x203c4c(0x6ac)][_0x203c4c(0x5ba)][_0x203c4c(0x788)][_0x203c4c(0x22f)]){if('lyFmh'!==_0x203c4c(0x31b)){ConfigManager[_0x203c4c(0x522)]!==0x0?(ConfigManager[_0x203c4c(0x728)]=0x0,ConfigManager[_0x203c4c(0x6b6)]=0x0,ConfigManager[_0x203c4c(0x75d)]=0x0,ConfigManager[_0x203c4c(0x522)]=0x0):(ConfigManager[_0x203c4c(0x728)]=0x64,ConfigManager[_0x203c4c(0x6b6)]=0x64,ConfigManager[_0x203c4c(0x75d)]=0x64,ConfigManager[_0x203c4c(0x522)]=0x64);ConfigManager[_0x203c4c(0x232)]();if(this[_0x203c4c(0x4a8)][_0x203c4c(0x1fb)]===Scene_Options){if(this['_scene']['_optionsWindow'])this[_0x203c4c(0x4a8)]['_optionsWindow'][_0x203c4c(0x227)]();if(this[_0x203c4c(0x4a8)][_0x203c4c(0x758)])this[_0x203c4c(0x4a8)][_0x203c4c(0x758)][_0x203c4c(0x227)]();}}else{function _0x21f9d3(){var _0x33a326=_0xbe336e(_0x5d45c6['$1']);_0x93d1b0*=_0x33a326;}}}},SceneManager[_0x2ef904(0x2f4)]=function(){const _0x9535f0=_0x2ef904;if($gameTemp[_0x9535f0(0x7be)]()&&VisuMZ[_0x9535f0(0x6ac)][_0x9535f0(0x5ba)][_0x9535f0(0x788)]['F7key']){if(_0x9535f0(0x1ca)===_0x9535f0(0x7ac)){function _0x562423(){const _0x404e2f=_0x9535f0,_0x877b2d=_0x32ca6c(this[_0x404e2f(0x1fb)][_0x404e2f(0x1fd)]),_0x2f4302=this[_0x404e2f(0x51d)](_0x877b2d);return _0x2f4302?_0x2f4302[_0x404e2f(0x3ed)]:0xc0;}}else $gameTemp[_0x9535f0(0x3f6)]=!$gameTemp[_0x9535f0(0x3f6)];}},SceneManager['initVisuMZCoreEngine']=function(){const _0x4bf18e=_0x2ef904;this[_0x4bf18e(0x4e5)]=![],this[_0x4bf18e(0x5c5)]=!VisuMZ[_0x4bf18e(0x6ac)][_0x4bf18e(0x5ba)]['UI'][_0x4bf18e(0x454)];},SceneManager['setSideButtonLayout']=function(_0x9c5e7d){const _0x4c54fb=_0x2ef904;if(VisuMZ['CoreEngine'][_0x4c54fb(0x5ba)]['UI'][_0x4c54fb(0x271)]){if(_0x4c54fb(0x407)===_0x4c54fb(0x407))this[_0x4c54fb(0x4e5)]=_0x9c5e7d;else{function _0x2688e0(){return 7.5625*_0x337e60*_0x47b97d;}}}},SceneManager['isSideButtonLayout']=function(){const _0x2eaabb=_0x2ef904;return this[_0x2eaabb(0x4e5)];},SceneManager['areButtonsHidden']=function(){const _0x415183=_0x2ef904;return this[_0x415183(0x5c5)];},SceneManager[_0x2ef904(0x836)]=function(){const _0x47a323=_0x2ef904;return this[_0x47a323(0x59b)]()||this[_0x47a323(0x64c)]();},VisuMZ['CoreEngine']['SceneManager_isGameActive']=SceneManager['isGameActive'],SceneManager[_0x2ef904(0x476)]=function(){const _0x272933=_0x2ef904;return VisuMZ[_0x272933(0x6ac)]['Settings'][_0x272933(0x788)][_0x272933(0x865)]?VisuMZ[_0x272933(0x6ac)][_0x272933(0x87d)][_0x272933(0x64a)](this):!![];},SceneManager[_0x2ef904(0x82c)]=function(_0x24e640){const _0x2b96ba=_0x2ef904;if(_0x24e640 instanceof Error)this['catchNormalError'](_0x24e640);else _0x24e640 instanceof Array&&_0x24e640[0x0]==='LoadError'?this[_0x2b96ba(0x261)](_0x24e640):this[_0x2b96ba(0x538)](_0x24e640);this['stop']();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x3f4)]=BattleManager[_0x2ef904(0x54c)],BattleManager[_0x2ef904(0x54c)]=function(){const _0xbb5c4a=_0x2ef904;if(VisuMZ[_0xbb5c4a(0x6ac)][_0xbb5c4a(0x5ba)]['QoL'][_0xbb5c4a(0x3b8)])this[_0xbb5c4a(0x69f)]();else return VisuMZ[_0xbb5c4a(0x6ac)][_0xbb5c4a(0x3f4)][_0xbb5c4a(0x64a)](this);},BattleManager[_0x2ef904(0x69f)]=function(){const _0x5da25b=_0x2ef904;return $gameParty[_0x5da25b(0x539)](),SoundManager[_0x5da25b(0x5d7)](),this[_0x5da25b(0x402)](),!![];},BattleManager[_0x2ef904(0x6b4)]=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager['isActiveTpb']=function(){const _0x150cb1=_0x2ef904;return $gameSystem[_0x150cb1(0x79e)]()===0x1;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x186)]=Game_Temp[_0x2ef904(0x6a6)][_0x2ef904(0x13d)],Game_Temp['prototype'][_0x2ef904(0x13d)]=function(){const _0x4b8509=_0x2ef904;VisuMZ[_0x4b8509(0x6ac)][_0x4b8509(0x186)][_0x4b8509(0x64a)](this),this[_0x4b8509(0x3bd)](),this[_0x4b8509(0x1cb)]();},Game_Temp[_0x2ef904(0x6a6)][_0x2ef904(0x3bd)]=function(){const _0x2a29d8=_0x2ef904;VisuMZ[_0x2a29d8(0x6ac)][_0x2a29d8(0x5ba)][_0x2a29d8(0x788)]['ForceNoPlayTest']&&(this[_0x2a29d8(0x3ff)]=![]);},Game_Temp[_0x2ef904(0x6a6)][_0x2ef904(0x1cb)]=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x2ef904(0x6a6)][_0x2ef904(0x36c)]=function(_0x27788e,_0x3dd756,_0x9bf7b4,_0x46f7e3){const _0x3d57a8=_0x2ef904;if(!this[_0x3d57a8(0x3b5)]())return;_0x9bf7b4=_0x9bf7b4||![],_0x46f7e3=_0x46f7e3||![];if($dataAnimations[_0x3dd756]){if(_0x3d57a8(0x233)===_0x3d57a8(0x233)){const _0x12ee7a={'targets':_0x27788e,'animationId':_0x3dd756,'mirror':_0x9bf7b4,'mute':_0x46f7e3};this['_fauxAnimationQueue'][_0x3d57a8(0x147)](_0x12ee7a);for(const _0x166b14 of _0x27788e){_0x166b14['startAnimation']&&_0x166b14[_0x3d57a8(0x288)]();}}else{function _0x5d667c(){const _0x11a673=_0x3d57a8;_0x389ce9[_0x11a673(0x7be)]()&&_0x21e3da[_0x11a673(0x6ac)][_0x11a673(0x5ba)][_0x11a673(0x788)][_0x11a673(0x8a7)]&&(_0x4baaf5[_0x11a673(0x3f6)]=!_0xbc7b26[_0x11a673(0x3f6)]);}}}},Game_Temp[_0x2ef904(0x6a6)][_0x2ef904(0x3b5)]=function(){return!![];},Game_Temp['prototype'][_0x2ef904(0x4f5)]=function(){const _0x30fdd4=_0x2ef904;return this[_0x30fdd4(0x434)][_0x30fdd4(0x808)]();},Game_Temp[_0x2ef904(0x6a6)][_0x2ef904(0x7fc)]=function(_0x5210a4){const _0x12ccfc=_0x2ef904;this[_0x12ccfc(0x1e3)]=_0x5210a4;},Game_Temp[_0x2ef904(0x6a6)][_0x2ef904(0x3c5)]=function(){return this['_lastPluginCommandInterpreter'];},Game_Temp['prototype'][_0x2ef904(0x59e)]=function(){const _0x4b074b=_0x2ef904;this[_0x4b074b(0x455)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp[_0x2ef904(0x6a6)]['applyForcedGameTroopSettingsCoreEngine']=function(_0x4c5e09){const _0x3ecc30=_0x2ef904;if($gameMap&&$dataMap&&$dataMap[_0x3ecc30(0x80d)]){if(_0x3ecc30(0x353)!==_0x3ecc30(0x596))this[_0x3ecc30(0x5af)]($dataMap[_0x3ecc30(0x80d)]);else{function _0x3d38c0(){const _0x33ac4d=_0x3ecc30;_0x3af8bc[_0x33ac4d(0x3ab)]['font-smooth']=_0x33ac4d(0x79b);}}}const _0x39f69d=$dataTroops[_0x4c5e09];if(_0x39f69d){if(_0x3ecc30(0x7b4)===_0x3ecc30(0x6e0)){function _0x5f40fd(){const _0x13c1df=_0x3ecc30;return _0x3ea765[_0x13c1df(0x6ac)][_0x13c1df(0x5ba)]['UI'][_0x13c1df(0x3c9)];}}else this['parseForcedGameTroopSettingsCoreEngine'](_0x39f69d[_0x3ecc30(0x1fd)]);}},Game_Temp[_0x2ef904(0x6a6)][_0x2ef904(0x5af)]=function(_0x1c64b0){const _0x48cce9=_0x2ef904;if(!_0x1c64b0)return;if(_0x1c64b0[_0x48cce9(0x376)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i)){if(_0x48cce9(0x199)===_0x48cce9(0x199))this[_0x48cce9(0x455)]='FV';else{function _0x4938ae(){const _0x4857e4=_0x48cce9,_0x4350b1=_0x4ddccf[_0x4857e4(0x6a6)]['traitObjects'][_0x4857e4(0x64a)](this);for(const _0x2d92ba of this['equips']()){_0x2d92ba&&_0x4350b1[_0x4857e4(0x147)](_0x2d92ba);}return _0x4350b1['push'](this['currentClass'](),this[_0x4857e4(0x22d)]()),_0x4350b1;}}}else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x1ba4b3=String(RegExp['$1']);if(_0x1ba4b3[_0x48cce9(0x376)](/(?:FRONTVIEW|FRONT VIEW|FV)/i)){if('HZsuH'===_0x48cce9(0x870))this[_0x48cce9(0x455)]='FV';else{function _0x505585(){const _0x13116f=_0x48cce9;_0x5d05ca[_0x13116f(0x6ac)][_0x13116f(0x4ee)][_0x13116f(0x64a)](this,_0x5c2797,_0x92e330,_0x6d12da,_0x103a12,_0x5b38aa),this[_0x13116f(0x2f0)]();}}}else _0x1ba4b3[_0x48cce9(0x376)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x48cce9(0x455)]='SV');}}}if(_0x1c64b0['match'](/<(?:DTB)>/i)){if(_0x48cce9(0x229)!==_0x48cce9(0x229)){function _0x49bb48(){const _0x1e1c81=_0x48cce9;_0x45b044+=_0x12a3e3,_0x41db6a+=_0x14e90d,_0x1bc253+=_0x1e1c81(0x590)[_0x1e1c81(0x764)](_0x22fea0['id'],_0x3f6440[_0x1e1c81(0x1fd)]),_0xc8bf4f+=_0x50c7b2,_0x1b79b2+=_0x386eb4,_0x4b3108+=_0x24af91,_0x4177e3+='〘Common\x20Event\x20%1:\x20%2〙\x20End'[_0x1e1c81(0x764)](_0x4ce417['id'],_0x3b9e5f[_0x1e1c81(0x1fd)]),_0x3fd28d+=_0x5592f2;}}else this[_0x48cce9(0x7e8)]=0x0;}else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:TPB|ATB)[ ]ACTIVE>/i)){if(_0x48cce9(0x74c)===_0x48cce9(0x29f)){function _0x8ff060(){const _0x199c49=_0x48cce9;return _0x42ee2f[_0x199c49(0x6ac)][_0x199c49(0x5ba)][_0x199c49(0x888)]['DamageColor'][_0x199c49(0x64a)](this,_0x13711d);}}else this['_forcedBattleSys']=0x1;}else{if(_0x1c64b0['match'](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x48cce9(0x7e8)]=0x2;else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:CTB)>/i)){if(Imported[_0x48cce9(0x430)]){if('JDzjL'===_0x48cce9(0x49c)){function _0x42c538(){const _0x196b1d=_0x48cce9;return _0x4bf3bf['CoreEngine'][_0x196b1d(0x5ba)]['UI']['BottomHelp'];}}else this[_0x48cce9(0x7e8)]=_0x48cce9(0x7f4);}}else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:STB)>/i))Imported[_0x48cce9(0x781)]&&(this[_0x48cce9(0x7e8)]=_0x48cce9(0x15c));else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:BTB)>/i)){if(_0x48cce9(0x74e)!=='jPbZS'){if(Imported[_0x48cce9(0x322)]){if(_0x48cce9(0x51e)===_0x48cce9(0x51e))this[_0x48cce9(0x7e8)]=_0x48cce9(0x1de);else{function _0x1d4df8(){const _0x143045=_0x48cce9;this['_inputWindow'][_0x143045(0x223)](_0x1a85be['layoutSettings'][_0x143045(0x18e)]);}}}}else{function _0x2e9ecd(){const _0x10d986=_0x48cce9;this[_0x10d986(0x455)]='FV';}}}else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:FTB)>/i)){if(Imported[_0x48cce9(0x3fc)]){if(_0x48cce9(0x180)===_0x48cce9(0x180))this['_forcedBattleSys']='FTB';else{function _0xade245(){const _0xc84713=_0x48cce9;this[_0xc84713(0x13d)](...arguments);}}}}else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:OTB)>/i))Imported[_0x48cce9(0x5b2)]&&(this[_0x48cce9(0x7e8)]='OTB');else{if(_0x1c64b0[_0x48cce9(0x376)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x48cce9(0x272)===_0x48cce9(0x792)){function _0x19fa49(){const _0x5aa032=_0x48cce9;return _0x5e659e[_0x5aa032(0x6ac)][_0x5aa032(0x5ba)][_0x5aa032(0x3f8)][_0x5aa032(0x5ad)];}}else{const _0x3314ea=String(RegExp['$1']);if(_0x3314ea[_0x48cce9(0x376)](/DTB/i)){if(_0x48cce9(0x183)==='INcnC'){function _0x44de20(){const _0x50454f=_0x48cce9;if(this[_0x50454f(0x4a8)][_0x50454f(0x5ae)])this[_0x50454f(0x4a8)]['_optionsWindow'][_0x50454f(0x227)]();if(this[_0x50454f(0x4a8)][_0x50454f(0x758)])this[_0x50454f(0x4a8)]['_listWindow'][_0x50454f(0x227)]();}}else this[_0x48cce9(0x7e8)]=0x0;}else{if(_0x3314ea['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x48cce9(0x7e8)]=0x1;else{if(_0x3314ea[_0x48cce9(0x376)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x48cce9(0x7e8)]=0x2;else{if(_0x3314ea[_0x48cce9(0x376)](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x48cce9(0x7e8)]=_0x48cce9(0x7f4));else{if(_0x3314ea[_0x48cce9(0x376)](/STB/i)){if(Imported[_0x48cce9(0x781)]){if(_0x48cce9(0x2bd)===_0x48cce9(0x50b)){function _0x528a2b(){const _0x3e5bab=_0x48cce9;return _0x244c20[_0x3e5bab(0x53f)](_0x29c9e4,this[_0x3e5bab(0x7e6)]);}}else this[_0x48cce9(0x7e8)]='STB';}}else{if(_0x3314ea[_0x48cce9(0x376)](/BTB/i))Imported[_0x48cce9(0x322)]&&(this['_forcedBattleSys']=_0x48cce9(0x1de));else{if(_0x3314ea[_0x48cce9(0x376)](/FTB/i))Imported[_0x48cce9(0x3fc)]&&(this['_forcedBattleSys']=_0x48cce9(0x700));else{if(_0x3314ea[_0x48cce9(0x376)](/OTB/i)){if(_0x48cce9(0x465)!==_0x48cce9(0x477))Imported['VisuMZ_2_BattleSystemOTB']&&(this['_forcedBattleSys']=_0x48cce9(0x794));else{function _0x1d0f24(){const _0x134154=_0x48cce9;return _0x128a5e['CoreEngine'][_0x134154(0x5ba)][_0x134154(0x5cf)][_0x134154(0x319)];}}}}}}}}}}}}}}}}}}}}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x380)]=Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x13d)],Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x13d)]=function(){const _0x54173a=_0x2ef904;VisuMZ[_0x54173a(0x6ac)][_0x54173a(0x380)][_0x54173a(0x64a)](this),this['initCoreEngine']();},Game_System['prototype']['initCoreEngine']=function(){const _0x4131a8=_0x2ef904;this[_0x4131a8(0x187)]={'SideView':$dataSystem[_0x4131a8(0x400)],'BattleSystem':this[_0x4131a8(0x730)](),'FontSize':$dataSystem[_0x4131a8(0x60e)][_0x4131a8(0x5e6)],'Padding':0xc};},Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x27c)]=function(){const _0x214fc9=_0x2ef904;if($gameTemp[_0x214fc9(0x455)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x214fc9(0x187)]===undefined)this[_0x214fc9(0x7aa)]();if(this[_0x214fc9(0x187)][_0x214fc9(0x7d4)]===undefined)this[_0x214fc9(0x7aa)]();return this[_0x214fc9(0x187)]['SideView'];},Game_System[_0x2ef904(0x6a6)]['setSideView']=function(_0x24809a){const _0x3a1e86=_0x2ef904;if(this['_CoreEngineSettings']===undefined)this[_0x3a1e86(0x7aa)]();if(this[_0x3a1e86(0x187)][_0x3a1e86(0x7d4)]===undefined)this[_0x3a1e86(0x7aa)]();this[_0x3a1e86(0x187)][_0x3a1e86(0x7d4)]=_0x24809a;},Game_System['prototype'][_0x2ef904(0x5ab)]=function(){const _0x3d8409=_0x2ef904;if(this[_0x3d8409(0x187)]===undefined)this[_0x3d8409(0x7aa)]();this[_0x3d8409(0x187)]['BattleSystem']=this[_0x3d8409(0x730)]();},Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x730)]=function(){const _0x589a4f=_0x2ef904,_0x186807=(VisuMZ['CoreEngine'][_0x589a4f(0x5ba)][_0x589a4f(0x2ee)]||_0x589a4f(0x417))[_0x589a4f(0x406)]()[_0x589a4f(0x4c9)]();return VisuMZ[_0x589a4f(0x6ac)][_0x589a4f(0x3b1)](_0x186807);},Game_System['prototype'][_0x2ef904(0x79e)]=function(){const _0x56487d=_0x2ef904;if($gameTemp[_0x56487d(0x7e8)]!==undefined){if(_0x56487d(0x427)==='XsgjX'){function _0x4ddbd7(){const _0x41cc0d=_0x56487d,_0x579747=_0x3e0286[_0x41cc0d(0x6ac)][_0x41cc0d(0x5ba)]['ScreenShake'];this['_coreEngineShakeStyle']=_0x579747?.[_0x41cc0d(0x214)]||_0x41cc0d(0x2e7);}}else return $gameTemp[_0x56487d(0x7e8)];}if(this[_0x56487d(0x187)]===undefined)this[_0x56487d(0x7aa)]();if(this[_0x56487d(0x187)][_0x56487d(0x2ee)]===undefined)this[_0x56487d(0x5ab)]();return this[_0x56487d(0x187)][_0x56487d(0x2ee)];},Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x381)]=function(_0x45afab){const _0x10a46b=_0x2ef904;if(this[_0x10a46b(0x187)]===undefined)this[_0x10a46b(0x7aa)]();if(this[_0x10a46b(0x187)][_0x10a46b(0x2ee)]===undefined)this[_0x10a46b(0x5ab)]();this[_0x10a46b(0x187)]['BattleSystem']=_0x45afab;},Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x5e8)]=function(){const _0x2d1b43=_0x2ef904;if(this[_0x2d1b43(0x187)]===undefined)this['initCoreEngine']();if(this[_0x2d1b43(0x187)]['FontSize']===undefined)this['initCoreEngine']();return this[_0x2d1b43(0x187)][_0x2d1b43(0x7f7)];},Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x6f3)]=function(_0x5d83d2){const _0x35bfdb=_0x2ef904;if(this[_0x35bfdb(0x187)]===undefined)this[_0x35bfdb(0x7aa)]();if(this[_0x35bfdb(0x187)][_0x35bfdb(0x738)]===undefined)this[_0x35bfdb(0x7aa)]();this[_0x35bfdb(0x187)][_0x35bfdb(0x7f7)]=_0x5d83d2;},Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x579)]=function(){const _0x2ad802=_0x2ef904;if(this[_0x2ad802(0x187)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x2ad802(0x74d)]===undefined)this[_0x2ad802(0x7aa)]();return this[_0x2ad802(0x187)][_0x2ad802(0x74d)];},Game_System[_0x2ef904(0x6a6)][_0x2ef904(0x171)]=function(_0x1970ed){const _0x3ac0da=_0x2ef904;if(this[_0x3ac0da(0x187)]===undefined)this[_0x3ac0da(0x7aa)]();if(this['_CoreEngineSettings'][_0x3ac0da(0x738)]===undefined)this['initCoreEngine']();this[_0x3ac0da(0x187)][_0x3ac0da(0x74d)]=_0x1970ed;},VisuMZ['CoreEngine']['Game_Screen_initialize']=Game_Screen['prototype'][_0x2ef904(0x13d)],Game_Screen['prototype']['initialize']=function(){const _0x28c6a0=_0x2ef904;VisuMZ[_0x28c6a0(0x6ac)]['Game_Screen_initialize'][_0x28c6a0(0x64a)](this),this[_0x28c6a0(0x351)]();},Game_Screen[_0x2ef904(0x6a6)][_0x2ef904(0x351)]=function(){const _0x1ed3ec=_0x2ef904,_0x1273ba=VisuMZ['CoreEngine'][_0x1ed3ec(0x5ba)]['ScreenShake'];this['_coreEngineShakeStyle']=_0x1273ba?.[_0x1ed3ec(0x214)]||'random';},Game_Screen[_0x2ef904(0x6a6)][_0x2ef904(0x65e)]=function(){const _0x47b1be=_0x2ef904;if(this[_0x47b1be(0x3d0)]===undefined)this[_0x47b1be(0x351)]();return this['_coreEngineShakeStyle'];},Game_Screen['prototype'][_0x2ef904(0x6f9)]=function(_0x647c8c){const _0x2b528c=_0x2ef904;if(this['_coreEngineShakeStyle']===undefined)this[_0x2b528c(0x351)]();this['_coreEngineShakeStyle']=_0x647c8c[_0x2b528c(0x3e8)]()[_0x2b528c(0x4c9)]();},Game_Picture[_0x2ef904(0x6a6)]['isMapScrollLinked']=function(){const _0x4d4cf2=_0x2ef904;if($gameParty[_0x4d4cf2(0x2c7)]())return![];return this[_0x4d4cf2(0x1fd)]()&&this[_0x4d4cf2(0x1fd)]()[_0x4d4cf2(0x732)](0x0)==='!';},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x821)]=Game_Picture[_0x2ef904(0x6a6)]['x'],Game_Picture[_0x2ef904(0x6a6)]['x']=function(){const _0x298cc4=_0x2ef904;if(this['isMapScrollLinked']())return this[_0x298cc4(0x2c1)]();else{if(_0x298cc4(0x344)!==_0x298cc4(0x4a7))return VisuMZ[_0x298cc4(0x6ac)][_0x298cc4(0x821)][_0x298cc4(0x64a)](this);else{function _0x57378f(){const _0x2f9d4e=_0x298cc4;this['_goldWindow'][_0x2f9d4e(0x223)](_0x175ba9['layoutSettings'][_0x2f9d4e(0x672)]);}}}},Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x2c1)]=function(){const _0x30c29b=_0x2ef904,_0x68837c=$gameMap['displayX']()*$gameMap[_0x30c29b(0x236)]();return this['_x']-_0x68837c;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x7e2)]=Game_Picture[_0x2ef904(0x6a6)]['y'],Game_Picture[_0x2ef904(0x6a6)]['y']=function(){const _0x275508=_0x2ef904;if(this[_0x275508(0x141)]()){if('tAOOI'!=='tAOOI'){function _0x3a4144(){const _0x62f585=_0x275508;if(this[_0x62f585(0x473)])return;_0x192063[_0x62f585(0x6ac)][_0x62f585(0x699)][_0x62f585(0x64a)](this);}}else return this[_0x275508(0x446)]();}else return VisuMZ[_0x275508(0x6ac)]['Game_Picture_y'][_0x275508(0x64a)](this);},Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x446)]=function(){const _0x4437a4=_0x2ef904,_0x216ca4=$gameMap['displayY']()*$gameMap[_0x4437a4(0x674)]();return this['_y']-_0x216ca4;},Game_Picture['prototype'][_0x2ef904(0x78a)]=function(_0x8424dd){const _0x200d29=_0x2ef904;this[_0x200d29(0x7e6)]=_0x8424dd;},VisuMZ['CoreEngine'][_0x2ef904(0x349)]=Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x276)],Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x276)]=function(_0x4f911b){const _0x2afa7c=_0x2ef904;return this['_coreEasingType']=this['_coreEasingType']||0x0,[0x0,0x1,0x2,0x3][_0x2afa7c(0x352)](this['_coreEasingType'])?VisuMZ[_0x2afa7c(0x6ac)][_0x2afa7c(0x349)]['call'](this,_0x4f911b):VisuMZ[_0x2afa7c(0x53f)](_0x4f911b,this[_0x2afa7c(0x7e6)]);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x685)]=Game_Action[_0x2ef904(0x6a6)]['itemHit'],Game_Action['prototype']['itemHit']=function(_0x5dc698){const _0x5adbce=_0x2ef904;if(VisuMZ[_0x5adbce(0x6ac)]['Settings']['QoL'][_0x5adbce(0x3de)])return this['itemHitImprovedAccuracy'](_0x5dc698);else{if(_0x5adbce(0x3bf)==='qWzEz')return VisuMZ[_0x5adbce(0x6ac)]['Game_Action_itemHit'][_0x5adbce(0x64a)](this,_0x5dc698);else{function _0x25bf2a(){const _0x1126b6=_0x5adbce;return _0x3a2b4d[_0x1126b6(0x836)]()?this[_0x1126b6(0x7ad)]():_0x572438[_0x1126b6(0x6ac)][_0x1126b6(0x573)][_0x1126b6(0x64a)](this);}}}},Game_Action[_0x2ef904(0x6a6)][_0x2ef904(0x64f)]=function(_0x1c7f41){const _0x3afe75=_0x2ef904,_0x1f4fe9=this[_0x3afe75(0x19a)](_0x1c7f41),_0x53142e=this[_0x3afe75(0x2fa)](_0x1c7f41),_0x3fa773=this['targetEvaRate'](_0x1c7f41);return _0x1f4fe9*(_0x53142e-_0x3fa773);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x146)]=Game_Action[_0x2ef904(0x6a6)][_0x2ef904(0x5e4)],Game_Action[_0x2ef904(0x6a6)][_0x2ef904(0x5e4)]=function(_0x7a3724){const _0x445880=_0x2ef904;if(VisuMZ[_0x445880(0x6ac)][_0x445880(0x5ba)][_0x445880(0x788)][_0x445880(0x3de)]){if(_0x445880(0x2f6)===_0x445880(0x306)){function _0x3d6c76(){const _0x48d119=_0x445880,_0xc84803=_0x2b37c3[_0x48d119(0x849)]-_0x4b4f52[_0x48d119(0x67c)]-_0x3af612[_0x48d119(0x6ac)]['Settings']['UI']['BoxMargin']*0x2,_0x86772b=_0x2b24f6[_0x48d119(0x6a6)][_0x48d119(0x61c)][_0x48d119(0x64a)](this)*0x4;if(_0xc84803>=_0x86772b)_0x2bbb04['setSideButtonLayout'](!![]);}}else return 0x0;}else return VisuMZ[_0x445880(0x6ac)][_0x445880(0x146)]['call'](this,_0x7a3724);},Game_Action[_0x2ef904(0x6a6)]['itemSuccessRate']=function(_0x7abeb1){const _0x37964b=_0x2ef904;return this[_0x37964b(0x74b)]()[_0x37964b(0x281)]*0.01;},Game_Action[_0x2ef904(0x6a6)][_0x2ef904(0x2fa)]=function(_0x29debc){const _0x448037=_0x2ef904;if(VisuMZ[_0x448037(0x6ac)][_0x448037(0x5ba)][_0x448037(0x788)][_0x448037(0x66f)]&&this[_0x448037(0x89a)]())return 0x1;if(this[_0x448037(0x79c)]()){if(VisuMZ[_0x448037(0x6ac)][_0x448037(0x5ba)][_0x448037(0x788)][_0x448037(0x66f)]&&this[_0x448037(0x5f8)]()[_0x448037(0x6ae)]())return this[_0x448037(0x5f8)]()[_0x448037(0x3bc)]+0.05;else{if(_0x448037(0x6a4)!=='ByYMw')return this['subject']()[_0x448037(0x3bc)];else{function _0x103021(){const _0x3c8a3b=_0x448037,_0x24a581=_0x3c8a3b(0x7bc);this[_0x3c8a3b(0x622)]=this[_0x3c8a3b(0x622)]||{};if(this[_0x3c8a3b(0x622)][_0x24a581])return this['_colorCache'][_0x24a581];const _0x3eaa19=_0x147088[_0x3c8a3b(0x6ac)][_0x3c8a3b(0x5ba)][_0x3c8a3b(0x888)][_0x3c8a3b(0x733)];return this[_0x3c8a3b(0x5e5)](_0x24a581,_0x3eaa19);}}}}else{if(_0x448037(0x2fe)!==_0x448037(0x2fe)){function _0x2e9a11(){const _0x3f2526=_0x448037;return _0x373762[_0x3f2526(0x6ac)]['Settings'][_0x3f2526(0x1c9)][_0x3f2526(0x6c3)][_0x3f2526(0x570)];}}else return 0x1;}},Game_Action['prototype']['targetEvaRate']=function(_0x5a016b){const _0x5147f6=_0x2ef904;if(this[_0x5147f6(0x5f8)]()[_0x5147f6(0x6ae)]()===_0x5a016b[_0x5147f6(0x6ae)]())return 0x0;if(this['isPhysical']())return VisuMZ[_0x5147f6(0x6ac)][_0x5147f6(0x5ba)][_0x5147f6(0x788)][_0x5147f6(0x66f)]&&_0x5a016b['isEnemy']()?_0x5a016b[_0x5147f6(0x2ed)]-0.05:_0x5a016b[_0x5147f6(0x2ed)];else{if(this[_0x5147f6(0x703)]()){if(_0x5147f6(0x5bb)!=='hyItp')return _0x5a016b[_0x5147f6(0x877)];else{function _0x200af4(){const _0x394c17=_0x5147f6,_0x58f482=this[_0x394c17(0x371)]['bitmap'],_0x1aba66=this['width'],_0x51bae8=this[_0x394c17(0x451)],_0x4a91d6=this[_0x394c17(0x1ea)],_0x40ba00=_0x1b995d[_0x394c17(0x220)](),_0x52cf37=_0x597e6f[_0x394c17(0x75a)]();_0x58f482[_0x394c17(0x69c)](_0x1aba66,_0x51bae8),_0x58f482[_0x394c17(0x669)](0x0,0x0,_0x1aba66,_0x4a91d6,_0x52cf37,_0x40ba00,!![]),_0x58f482['fillRect'](0x0,_0x4a91d6,_0x1aba66,_0x51bae8-_0x4a91d6*0x2,_0x40ba00),_0x58f482[_0x394c17(0x669)](0x0,_0x51bae8-_0x4a91d6,_0x1aba66,_0x4a91d6,_0x40ba00,_0x52cf37,!![]),this[_0x394c17(0x371)][_0x394c17(0x14f)](0x0,0x0,_0x1aba66,_0x51bae8);}}}else{if(_0x5147f6(0x535)===_0x5147f6(0x78b)){function _0x402ae0(){const _0x4b8af5=_0x5147f6;return _0x2ece7d[_0x4b8af5(0x56d)][_0x4b8af5(0x5a1)][_0x4b8af5(0x64a)](this);}}else return 0x0;}}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x67d)]=Game_Action[_0x2ef904(0x6a6)][_0x2ef904(0x600)],Game_Action[_0x2ef904(0x6a6)][_0x2ef904(0x600)]=function(_0x212ba9){const _0x36c3ae=_0x2ef904;VisuMZ['CoreEngine'][_0x36c3ae(0x67d)][_0x36c3ae(0x64a)](this,_0x212ba9);if(VisuMZ[_0x36c3ae(0x6ac)]['Settings'][_0x36c3ae(0x788)][_0x36c3ae(0x3de)])return;const _0x1b658c=_0x212ba9[_0x36c3ae(0x4ac)]();if(_0x1b658c['missed']){if(_0x36c3ae(0x62a)===_0x36c3ae(0x62a))0x1-this[_0x36c3ae(0x5e4)](_0x212ba9)>this[_0x36c3ae(0x7ff)](_0x212ba9)&&(_0x1b658c[_0x36c3ae(0x2a0)]=![],_0x1b658c['evaded']=!![]);else{function _0x4dd0c0(){const _0x5f1a79=_0x36c3ae;_0x1577d6[_0x5f1a79(0x553)][_0x5f1a79(0x64a)](this,_0x43aa70);}}}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5d9)]=Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x2e8)],Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x2e8)]=function(){const _0x1aa67d=_0x2ef904;this['_cache']={},VisuMZ[_0x1aa67d(0x6ac)][_0x1aa67d(0x5d9)][_0x1aa67d(0x64a)](this);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x4bf)]=Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x227)],Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x227)]=function(){const _0x93a82e=_0x2ef904;this[_0x93a82e(0x88f)]={},VisuMZ[_0x93a82e(0x6ac)][_0x93a82e(0x4bf)][_0x93a82e(0x64a)](this);},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x762)]=function(_0x10258c){const _0x12c017=_0x2ef904;return this[_0x12c017(0x88f)]=this[_0x12c017(0x88f)]||{},this[_0x12c017(0x88f)][_0x10258c]!==undefined;},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x21f)]=function(_0x360c5e){const _0x2f59d0=_0x2ef904,_0x4bac4e=(_0x20811c,_0x456f1d)=>{const _0x24c2e1=_0xd003;if(!_0x456f1d)return _0x20811c;if(_0x456f1d[_0x24c2e1(0x80d)][_0x24c2e1(0x376)](VisuMZ[_0x24c2e1(0x6ac)][_0x24c2e1(0x382)][_0x24c2e1(0x21f)][_0x360c5e])){var _0x73acb3=Number(RegExp['$1']);_0x20811c+=_0x73acb3;}if(_0x456f1d[_0x24c2e1(0x80d)][_0x24c2e1(0x376)](VisuMZ['CoreEngine'][_0x24c2e1(0x382)]['paramPlusJS'][_0x360c5e])){if(_0x24c2e1(0x7a8)===_0x24c2e1(0x7a8)){var _0x1255fe=String(RegExp['$1']);try{_0x20811c+=eval(_0x1255fe);}catch(_0x5c2929){if(_0x24c2e1(0x667)!==_0x24c2e1(0x2a5)){if($gameTemp['isPlaytest']())console[_0x24c2e1(0x466)](_0x5c2929);}else{function _0x50cd86(){const _0x315b7b=_0x24c2e1;if(!this[_0x315b7b(0x748)]())return;_0x2575d9[_0x315b7b(0x5b1)]()?this[_0x315b7b(0x2da)]():_0x21be7b[_0x315b7b(0x6a6)]['processCursorMove'][_0x315b7b(0x64a)](this);}}}}else{function _0x48c603(){const _0x46e12d=_0x24c2e1;!_0x2d27a2[_0x46e12d(0x527)]()&&this[_0x46e12d(0x5b5)](_0x588106);}}}return _0x20811c;};return this['traitObjects']()[_0x2f59d0(0x4df)](_0x4bac4e,this[_0x2f59d0(0x295)][_0x360c5e]);},Game_BattlerBase['prototype'][_0x2ef904(0x87c)]=function(_0x485a6d){const _0x2865be=_0x2ef904;var _0x2a4ba0=_0x2865be(0x620)+(this[_0x2865be(0x6ae)]()?_0x2865be(0x644):_0x2865be(0x57f))+_0x2865be(0x784)+_0x485a6d;if(this['checkCacheKey'](_0x2a4ba0))return this[_0x2865be(0x88f)][_0x2a4ba0];this['_cache'][_0x2a4ba0]=eval(VisuMZ[_0x2865be(0x6ac)][_0x2865be(0x5ba)][_0x2865be(0x663)][_0x2a4ba0]);const _0x18b95e=(_0x22f5c0,_0x14bb2f)=>{const _0x3f1dfb=_0x2865be;if('iZePJ'===_0x3f1dfb(0x71a)){function _0x4f3192(){const _0x424d8e=_0x3f1dfb;_0x1486a1[_0x424d8e(0x6ac)][_0x424d8e(0x487)][_0x424d8e(0x64a)](this);}}else{if(!_0x14bb2f)return _0x22f5c0;if(_0x14bb2f['note'][_0x3f1dfb(0x376)](VisuMZ[_0x3f1dfb(0x6ac)][_0x3f1dfb(0x382)]['paramMax'][_0x485a6d])){var _0x213c99=Number(RegExp['$1']);if(_0x213c99===0x0)_0x213c99=Number[_0x3f1dfb(0x337)];_0x22f5c0=Math[_0x3f1dfb(0x8a6)](_0x22f5c0,_0x213c99);}if(_0x14bb2f[_0x3f1dfb(0x80d)][_0x3f1dfb(0x376)](VisuMZ[_0x3f1dfb(0x6ac)][_0x3f1dfb(0x382)][_0x3f1dfb(0x22e)][_0x485a6d])){if('ZWMaX'===_0x3f1dfb(0x584)){var _0x109911=String(RegExp['$1']);try{_0x22f5c0=Math[_0x3f1dfb(0x8a6)](_0x22f5c0,Number(eval(_0x109911)));}catch(_0x3e2d35){if($gameTemp[_0x3f1dfb(0x7be)]())console['log'](_0x3e2d35);}}else{function _0x503afe(){const _0x2290da=_0x3f1dfb,_0x3bce6=_0x2290da(0x4cc);this['_colorCache']=this[_0x2290da(0x622)]||{};if(this[_0x2290da(0x622)][_0x3bce6])return this[_0x2290da(0x622)][_0x3bce6];const _0x3bcafb=_0x17dc9d[_0x2290da(0x6ac)]['Settings'][_0x2290da(0x888)][_0x2290da(0x4d9)];return this[_0x2290da(0x5e5)](_0x3bce6,_0x3bcafb);}}}return _0x22f5c0;}};if(this[_0x2865be(0x88f)][_0x2a4ba0]===0x0)this[_0x2865be(0x88f)][_0x2a4ba0]=Number['MAX_SAFE_INTEGER'];return this[_0x2865be(0x88f)][_0x2a4ba0]=this[_0x2865be(0x1f7)]()[_0x2865be(0x4df)](_0x18b95e,this['_cache'][_0x2a4ba0]),this['_cache'][_0x2a4ba0];},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x4a9)]=function(_0x319a00){const _0x581de8=_0x2ef904,_0x427992=this[_0x581de8(0x44e)](Game_BattlerBase['TRAIT_PARAM'],_0x319a00),_0x54a0af=(_0x45c428,_0xdd643f)=>{const _0x5823e9=_0x581de8;if(!_0xdd643f)return _0x45c428;if(_0xdd643f[_0x5823e9(0x80d)][_0x5823e9(0x376)](VisuMZ['CoreEngine'][_0x5823e9(0x382)]['paramRate1'][_0x319a00])){if(_0x5823e9(0x2c3)===_0x5823e9(0x4ba)){function _0x22563c(){const _0x539c65=_0x5823e9;this[_0x539c65(0x5a7)]();}}else{var _0x1b45e4=Number(RegExp['$1'])/0x64;_0x45c428*=_0x1b45e4;}}if(_0xdd643f[_0x5823e9(0x80d)][_0x5823e9(0x376)](VisuMZ[_0x5823e9(0x6ac)][_0x5823e9(0x382)]['paramRate2'][_0x319a00])){var _0x1b45e4=Number(RegExp['$1']);_0x45c428*=_0x1b45e4;}if(_0xdd643f['note'][_0x5823e9(0x376)](VisuMZ[_0x5823e9(0x6ac)][_0x5823e9(0x382)][_0x5823e9(0x46f)][_0x319a00])){if(_0x5823e9(0x739)===_0x5823e9(0x1d9)){function _0x1b4999(){return'';}}else{var _0x5f2e06=String(RegExp['$1']);try{_0x45c428*=eval(_0x5f2e06);}catch(_0x478919){if('FdSqJ'!=='FdSqJ'){function _0x44d49a(){const _0xdacab4=_0x5823e9;_0x1ca387[_0xdacab4(0x43a)](_0x222c5a);}}else{if($gameTemp[_0x5823e9(0x7be)]())console[_0x5823e9(0x466)](_0x478919);}}}}return _0x45c428;};return this['traitObjects']()[_0x581de8(0x4df)](_0x54a0af,_0x427992);},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x58d)]=function(_0x45a29d){const _0x246f2c=_0x2ef904,_0x38da5a=(_0x520e56,_0x1c1b31)=>{const _0x30bbbb=_0xd003;if(_0x30bbbb(0x24c)===_0x30bbbb(0x36d)){function _0x3b420b(){const _0x4b9b29=_0x30bbbb;this['bitmap']=_0x285356['loadPicture'](this[_0x4b9b29(0x3b2)][_0x4b9b29(0x809)]),this['bitmap'][_0x4b9b29(0x6f5)](this[_0x4b9b29(0x66d)][_0x4b9b29(0x617)](this));}}else{if(!_0x1c1b31)return _0x520e56;if(_0x1c1b31[_0x30bbbb(0x80d)]['match'](VisuMZ[_0x30bbbb(0x6ac)][_0x30bbbb(0x382)][_0x30bbbb(0x75c)][_0x45a29d])){var _0x49a794=Number(RegExp['$1']);_0x520e56+=_0x49a794;}if(_0x1c1b31['note'][_0x30bbbb(0x376)](VisuMZ[_0x30bbbb(0x6ac)]['RegExp'][_0x30bbbb(0x386)][_0x45a29d])){var _0x210d60=String(RegExp['$1']);try{if(_0x30bbbb(0x318)!=='pHeOk'){function _0x555a62(){this['processKeyboardHome']();}}else _0x520e56+=eval(_0x210d60);}catch(_0x1d2572){if('KzsbZ'===_0x30bbbb(0x2a9)){if($gameTemp[_0x30bbbb(0x7be)]())console[_0x30bbbb(0x466)](_0x1d2572);}else{function _0x3990bf(){const _0x1098fe=_0x30bbbb;return _0x3a6fd3['actor']()[_0x1098fe(0x1b5)](_0x48759a);}}}}return _0x520e56;}};return this[_0x246f2c(0x1f7)]()[_0x246f2c(0x4df)](_0x38da5a,0x0);},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x7e3)]=function(_0x4da1a0){const _0x4e6f7f=_0x2ef904;let _0x5e4d18=_0x4e6f7f(0x7e3)+_0x4da1a0+'Total';if(this[_0x4e6f7f(0x762)](_0x5e4d18))return this[_0x4e6f7f(0x88f)][_0x5e4d18];return this['_cache'][_0x5e4d18]=Math['round'](VisuMZ[_0x4e6f7f(0x6ac)][_0x4e6f7f(0x5ba)][_0x4e6f7f(0x663)][_0x4e6f7f(0x428)][_0x4e6f7f(0x64a)](this,_0x4da1a0)),this['_cache'][_0x5e4d18];},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x65b)]=function(_0xadab3d){const _0xfaecce=_0x2ef904,_0x25399=(_0x313279,_0xe2a526)=>{const _0x28ff71=_0xd003;if(_0x28ff71(0x211)!==_0x28ff71(0x1b4)){if(!_0xe2a526)return _0x313279;if(_0xe2a526[_0x28ff71(0x80d)][_0x28ff71(0x376)](VisuMZ[_0x28ff71(0x6ac)][_0x28ff71(0x382)][_0x28ff71(0x638)][_0xadab3d])){var _0x4e962b=Number(RegExp['$1'])/0x64;_0x313279+=_0x4e962b;}if(_0xe2a526['note']['match'](VisuMZ[_0x28ff71(0x6ac)][_0x28ff71(0x382)][_0x28ff71(0x844)][_0xadab3d])){var _0x4e962b=Number(RegExp['$1']);_0x313279+=_0x4e962b;}if(_0xe2a526[_0x28ff71(0x80d)][_0x28ff71(0x376)](VisuMZ[_0x28ff71(0x6ac)][_0x28ff71(0x382)][_0x28ff71(0x634)][_0xadab3d])){if('hnRHJ'!==_0x28ff71(0x816)){function _0x160355(){var _0x4874af=_0x129ac3(_0x21bbff['$1'])/0x64;_0x562752+=_0x4874af;}}else{var _0x3a0fda=String(RegExp['$1']);try{_0x313279+=eval(_0x3a0fda);}catch(_0xdf4679){if(_0x28ff71(0x85f)!=='zIdYx'){if($gameTemp[_0x28ff71(0x7be)]())console[_0x28ff71(0x466)](_0xdf4679);}else{function _0x1d8e01(){const _0x1ca11a=_0x28ff71;return-0.5*(_0x18bd3b[_0x1ca11a(0x55a)](0x2,0xa*_0x3aec25)*_0x28743e[_0x1ca11a(0x7bd)]((_0x371405-_0x47ca33)*(0x2*_0x13597a['PI'])/_0x43add9));}}}}}return _0x313279;}else{function _0x4ff901(){const _0x157fa2=_0x28ff71;this[_0x157fa2(0x22a)](_0x284ec9[_0x157fa2(0x2c4)](),_0x3e3f15,_0x523c08,_0x191b17);}}};return this['traitObjects']()[_0xfaecce(0x4df)](_0x25399,0x0);},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x2ab)]=function(_0x4fe3b8){const _0x3bd727=_0x2ef904,_0x4293c7=(_0x529ff6,_0x448088)=>{const _0x1fdc1e=_0xd003;if(_0x1fdc1e(0x80c)==='TFmkV'){function _0x304050(){const _0x5bd2cd=_0x1fdc1e,_0x40f051=_0x3b1330('fs');let _0x2f1607=_0x5bd2cd(0x787)[_0x5bd2cd(0x764)](_0xfdade4||'0');_0x40f051[_0x5bd2cd(0x767)](_0x2f1607,_0x4ca755,_0x15a7d9=>{const _0x4b50d6=_0x5bd2cd;if(_0x15a7d9)throw _0x582a3f;else _0x56f89e&&_0x1f23bc(_0x4b50d6(0x226)[_0x4b50d6(0x764)](_0x2f1607));});}}else{if(!_0x448088)return _0x529ff6;if(_0x448088['note'][_0x1fdc1e(0x376)](VisuMZ[_0x1fdc1e(0x6ac)][_0x1fdc1e(0x382)][_0x1fdc1e(0x5e0)][_0x4fe3b8])){var _0x5d9da5=Number(RegExp['$1'])/0x64;_0x529ff6*=_0x5d9da5;}if(_0x448088[_0x1fdc1e(0x80d)][_0x1fdc1e(0x376)](VisuMZ[_0x1fdc1e(0x6ac)]['RegExp'][_0x1fdc1e(0x29d)][_0x4fe3b8])){var _0x5d9da5=Number(RegExp['$1']);_0x529ff6*=_0x5d9da5;}if(_0x448088['note'][_0x1fdc1e(0x376)](VisuMZ[_0x1fdc1e(0x6ac)][_0x1fdc1e(0x382)][_0x1fdc1e(0x6b0)][_0x4fe3b8])){var _0x4b9326=String(RegExp['$1']);try{_0x529ff6*=eval(_0x4b9326);}catch(_0x5388ad){if($gameTemp[_0x1fdc1e(0x7be)]())console[_0x1fdc1e(0x466)](_0x5388ad);}}return _0x529ff6;}};return this[_0x3bd727(0x1f7)]()['reduce'](_0x4293c7,0x1);},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x2e6)]=function(_0x342390){const _0x221e50=_0x2ef904,_0x59b7a9=(_0x155a15,_0x36ef1f)=>{const _0x4325d9=_0xd003;if(_0x4325d9(0x6ab)!==_0x4325d9(0x709)){if(!_0x36ef1f)return _0x155a15;if(_0x36ef1f[_0x4325d9(0x80d)][_0x4325d9(0x376)](VisuMZ[_0x4325d9(0x6ac)][_0x4325d9(0x382)][_0x4325d9(0x1f2)][_0x342390])){if('VWWzs'===_0x4325d9(0x20c)){function _0x3c1704(){const _0x18a17e=_0x4325d9;if(this[_0x18a17e(0x187)]===_0x335a27)this['initCoreEngine']();if(this['_CoreEngineSettings']['BattleSystem']===_0x17462c)this[_0x18a17e(0x5ab)]();this[_0x18a17e(0x187)][_0x18a17e(0x2ee)]=_0x45775a;}}else{var _0x1b97db=Number(RegExp['$1'])/0x64;_0x155a15+=_0x1b97db;}}if(_0x36ef1f[_0x4325d9(0x80d)]['match'](VisuMZ[_0x4325d9(0x6ac)][_0x4325d9(0x382)][_0x4325d9(0x347)][_0x342390])){if(_0x4325d9(0x6f7)===_0x4325d9(0x6f7)){var _0x1b97db=Number(RegExp['$1']);_0x155a15+=_0x1b97db;}else{function _0x5dbbe3(){const _0x5cba8c=_0x4325d9;return this[_0x5cba8c(0x66b)]()?this[_0x5cba8c(0x359)](_0x200e1b,_0xfffe7c):_0x32fec[_0x5cba8c(0x6ac)][_0x5cba8c(0x2bc)]['call'](this,_0x1ce27b,_0x613fdd);}}}if(_0x36ef1f[_0x4325d9(0x80d)][_0x4325d9(0x376)](VisuMZ[_0x4325d9(0x6ac)][_0x4325d9(0x382)]['xparamFlatJS'][_0x342390])){var _0x37476e=String(RegExp['$1']);try{if(_0x4325d9(0x3dc)!=='bOgaj'){function _0x5625d8(){const _0x252d68=_0x4325d9;return _0x2101c7[_0x252d68(0x27e)](_0x25e577,'<','>');}}else _0x155a15+=eval(_0x37476e);}catch(_0x1d2f3f){if($gameTemp[_0x4325d9(0x7be)]())console[_0x4325d9(0x466)](_0x1d2f3f);}}return _0x155a15;}else{function _0x86ef59(){const _0x32c42d=_0x4325d9;_0x582cbe[_0x32c42d(0x6ac)]['Scene_Menu_create'][_0x32c42d(0x64a)](this),this[_0x32c42d(0x646)]();}}};return this[_0x221e50(0x1f7)]()[_0x221e50(0x4df)](_0x59b7a9,0x0);},Game_BattlerBase['prototype'][_0x2ef904(0x2a8)]=function(_0x455558){const _0x48cc98=_0x2ef904;let _0x395de3=_0x48cc98(0x2a8)+_0x455558+_0x48cc98(0x32f);if(this[_0x48cc98(0x762)](_0x395de3))return this[_0x48cc98(0x88f)][_0x395de3];return this[_0x48cc98(0x88f)][_0x395de3]=VisuMZ[_0x48cc98(0x6ac)][_0x48cc98(0x5ba)][_0x48cc98(0x663)][_0x48cc98(0x292)][_0x48cc98(0x64a)](this,_0x455558),this[_0x48cc98(0x88f)][_0x395de3];},Game_BattlerBase['prototype'][_0x2ef904(0x5e3)]=function(_0x289877){const _0xe3bbd3=(_0x1d9318,_0x11ac5c)=>{const _0x2ea64f=_0xd003;if(!_0x11ac5c)return _0x1d9318;if(_0x11ac5c[_0x2ea64f(0x80d)][_0x2ea64f(0x376)](VisuMZ[_0x2ea64f(0x6ac)][_0x2ea64f(0x382)][_0x2ea64f(0x401)][_0x289877])){var _0x8184c9=Number(RegExp['$1'])/0x64;_0x1d9318+=_0x8184c9;}if(_0x11ac5c['note']['match'](VisuMZ['CoreEngine']['RegExp'][_0x2ea64f(0x5f3)][_0x289877])){var _0x8184c9=Number(RegExp['$1']);_0x1d9318+=_0x8184c9;}if(_0x11ac5c['note']['match'](VisuMZ['CoreEngine'][_0x2ea64f(0x382)][_0x2ea64f(0x58f)][_0x289877])){var _0x172674=String(RegExp['$1']);try{_0x1d9318+=eval(_0x172674);}catch(_0x109230){if($gameTemp[_0x2ea64f(0x7be)]())console['log'](_0x109230);}}return _0x1d9318;};return this['traitObjects']()['reduce'](_0xe3bbd3,0x0);},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x56c)]=function(_0x58df52){const _0xded90a=_0x2ef904,_0x51c25d=(_0x2c8499,_0x2d8cd8)=>{const _0x4e594f=_0xd003;if('ELVGp'!==_0x4e594f(0x4fa)){if(!_0x2d8cd8)return _0x2c8499;if(_0x2d8cd8['note']['match'](VisuMZ[_0x4e594f(0x6ac)]['RegExp']['sparamRate1'][_0x58df52])){if('kgslR'!=='kgslR'){function _0x20feff(){const _0x5ac3cc=_0x4e594f;return _0x46e3c8['CoreEngine'][_0x5ac3cc(0x394)][_0x5ac3cc(0x64a)](this,_0x58ce5c);}}else{var _0x4a3643=Number(RegExp['$1'])/0x64;_0x2c8499*=_0x4a3643;}}if(_0x2d8cd8[_0x4e594f(0x80d)][_0x4e594f(0x376)](VisuMZ['CoreEngine'][_0x4e594f(0x382)][_0x4e594f(0x69b)][_0x58df52])){if(_0x4e594f(0x63b)===_0x4e594f(0x7ec)){function _0x48f293(){const _0x3cda8d=_0x4e594f,_0x320ad7=this[_0x3cda8d(0x645)]();return _0x320ad7['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x3cda8d(0x1eb)](_0x320ad7):_0x584030[_0x3cda8d(0x6ac)][_0x3cda8d(0x394)][_0x3cda8d(0x64a)](this,_0x46560a);}}else{var _0x4a3643=Number(RegExp['$1']);_0x2c8499*=_0x4a3643;}}if(_0x2d8cd8['note']['match'](VisuMZ['CoreEngine'][_0x4e594f(0x382)]['sparamRateJS'][_0x58df52])){var _0x19752a=String(RegExp['$1']);try{_0x2c8499*=eval(_0x19752a);}catch(_0x49a18a){if(_0x4e594f(0x4d5)===_0x4e594f(0x820)){function _0x22c44e(){const _0x34c421=_0x4e594f;return _0x34c421(0x76d)[_0x34c421(0x764)](_0xd43939(_0x3e8289['$1']));}}else{if($gameTemp[_0x4e594f(0x7be)]())console[_0x4e594f(0x466)](_0x49a18a);}}}return _0x2c8499;}else{function _0x450385(){const _0x326d3b=_0x4e594f,_0x386cd0=_0x5b9beb[_0x326d3b(0x6ac)][_0x326d3b(0x195)][_0x4cbbcd],_0x3c2da6=this[_0x386cd0];return _0x570227[_0x326d3b(0x6ac)][_0x326d3b(0x1a3)][_0x21d11b]==='integer'?_0x3c2da6:_0x27aa45?_0x1f4c14(_0x391fa6['round'](_0x3c2da6*0x64))+'%':_0x3c2da6;}}};return this[_0xded90a(0x1f7)]()[_0xded90a(0x4df)](_0x51c25d,0x1);},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x448)]=function(_0x2f1db4){const _0x493537=_0x2ef904,_0x38642c=(_0x3e3556,_0x564178)=>{const _0x1caff9=_0xd003;if(_0x1caff9(0x1d7)===_0x1caff9(0x280)){function _0x207cfa(){const _0x37c9e8=_0x1caff9;let _0x1a278c=this[_0x37c9e8(0x49b)]();this['useDigitGrouping']()&&(_0x1a278c=_0x12fadb[_0x37c9e8(0x686)](_0x1a278c));const _0x1aafea=this[_0x37c9e8(0x29c)]()-0x1,_0xb5e559=this[_0x37c9e8(0x6c4)]();this[_0x37c9e8(0x1aa)](),this[_0x37c9e8(0x325)]['drawText'](_0x1a278c,0x0,0x0,_0x1aafea,_0xb5e559,'right');}}else{if(!_0x564178)return _0x3e3556;if(_0x564178[_0x1caff9(0x80d)][_0x1caff9(0x376)](VisuMZ[_0x1caff9(0x6ac)][_0x1caff9(0x382)][_0x1caff9(0x6d2)][_0x2f1db4])){var _0x264635=Number(RegExp['$1'])/0x64;_0x3e3556+=_0x264635;}if(_0x564178['note'][_0x1caff9(0x376)](VisuMZ[_0x1caff9(0x6ac)][_0x1caff9(0x382)]['sparamFlat2'][_0x2f1db4])){var _0x264635=Number(RegExp['$1']);_0x3e3556+=_0x264635;}if(_0x564178[_0x1caff9(0x80d)][_0x1caff9(0x376)](VisuMZ['CoreEngine'][_0x1caff9(0x382)][_0x1caff9(0x884)][_0x2f1db4])){if('xnMVu'!==_0x1caff9(0x5e9)){function _0x4f7820(){const _0x332e99=_0x1caff9,_0x2cddd2=(_0x57879e['CoreEngine'][_0x332e99(0x5ba)][_0x332e99(0x2ee)]||'DATABASE')[_0x332e99(0x406)]()['trim']();return _0x43902b[_0x332e99(0x6ac)]['CreateBattleSystemID'](_0x2cddd2);}}else{var _0x3f55be=String(RegExp['$1']);try{_0x3e3556+=eval(_0x3f55be);}catch(_0x2ec635){if($gameTemp[_0x1caff9(0x7be)]())console['log'](_0x2ec635);}}}return _0x3e3556;}};return this['traitObjects']()[_0x493537(0x4df)](_0x38642c,0x0);},Game_BattlerBase[_0x2ef904(0x6a6)]['sparam']=function(_0x54b46e){const _0x4bac2c=_0x2ef904;let _0xe48b83=_0x4bac2c(0x628)+_0x54b46e+'Total';if(this['checkCacheKey'](_0xe48b83))return this[_0x4bac2c(0x88f)][_0xe48b83];return this[_0x4bac2c(0x88f)][_0xe48b83]=VisuMZ[_0x4bac2c(0x6ac)]['Settings']['Param'][_0x4bac2c(0x842)][_0x4bac2c(0x64a)](this,_0x54b46e),this[_0x4bac2c(0x88f)][_0xe48b83];},Game_BattlerBase['prototype'][_0x2ef904(0x785)]=function(_0xeb619c,_0x176304){const _0x537808=_0x2ef904;if(typeof paramId===_0x537808(0x581))return this[_0x537808(0x7e3)](_0xeb619c);_0xeb619c=String(_0xeb619c||'')[_0x537808(0x406)]();if(_0xeb619c===_0x537808(0x7a3))return this['param'](0x0);if(_0xeb619c===_0x537808(0x1c6))return this[_0x537808(0x7e3)](0x1);if(_0xeb619c===_0x537808(0x5c7))return this[_0x537808(0x7e3)](0x2);if(_0xeb619c===_0x537808(0x469))return this[_0x537808(0x7e3)](0x3);if(_0xeb619c==='MAT')return this['param'](0x4);if(_0xeb619c===_0x537808(0x2f3))return this[_0x537808(0x7e3)](0x5);if(_0xeb619c===_0x537808(0x20a))return this[_0x537808(0x7e3)](0x6);if(_0xeb619c===_0x537808(0x85e))return this['param'](0x7);if(_0xeb619c===_0x537808(0x799))return _0x176304?String(Math['round'](this[_0x537808(0x2a8)](0x0)*0x64))+'%':this[_0x537808(0x2a8)](0x0);if(_0xeb619c===_0x537808(0x412))return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x2a8)](0x1)*0x64))+'%':this[_0x537808(0x2a8)](0x1);if(_0xeb619c==='CRI')return _0x176304?String(Math[_0x537808(0x546)](this['xparam'](0x2)*0x64))+'%':this[_0x537808(0x2a8)](0x2);if(_0xeb619c==='CEV')return _0x176304?String(Math['round'](this['xparam'](0x3)*0x64))+'%':this['xparam'](0x3);if(_0xeb619c===_0x537808(0x356))return _0x176304?String(Math['round'](this['xparam'](0x4)*0x64))+'%':this[_0x537808(0x2a8)](0x4);if(_0xeb619c===_0x537808(0x8a0))return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x2a8)](0x5)*0x64))+'%':this[_0x537808(0x2a8)](0x5);if(_0xeb619c===_0x537808(0x516))return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x2a8)](0x6)*0x64))+'%':this[_0x537808(0x2a8)](0x6);if(_0xeb619c==='HRG')return _0x176304?String(Math['round'](this[_0x537808(0x2a8)](0x7)*0x64))+'%':this[_0x537808(0x2a8)](0x7);if(_0xeb619c===_0x537808(0x2c8))return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x2a8)](0x8)*0x64))+'%':this[_0x537808(0x2a8)](0x8);if(_0xeb619c===_0x537808(0x60a))return _0x176304?String(Math[_0x537808(0x546)](this['xparam'](0x9)*0x64))+'%':this['xparam'](0x9);if(_0xeb619c==='TGR')return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x628)](0x0)*0x64))+'%':this[_0x537808(0x628)](0x0);if(_0xeb619c===_0x537808(0x7ca))return _0x176304?String(Math['round'](this[_0x537808(0x628)](0x1)*0x64))+'%':this['sparam'](0x1);if(_0xeb619c==='REC')return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x628)](0x2)*0x64))+'%':this[_0x537808(0x628)](0x2);if(_0xeb619c===_0x537808(0x72d))return _0x176304?String(Math['round'](this[_0x537808(0x628)](0x3)*0x64))+'%':this[_0x537808(0x628)](0x3);if(_0xeb619c===_0x537808(0x3c2))return _0x176304?String(Math['round'](this['sparam'](0x4)*0x64))+'%':this[_0x537808(0x628)](0x4);if(_0xeb619c===_0x537808(0x374))return _0x176304?String(Math[_0x537808(0x546)](this['sparam'](0x5)*0x64))+'%':this[_0x537808(0x628)](0x5);if(_0xeb619c==='PDR')return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x628)](0x6)*0x64))+'%':this[_0x537808(0x628)](0x6);if(_0xeb619c===_0x537808(0x593))return _0x176304?String(Math[_0x537808(0x546)](this['sparam'](0x7)*0x64))+'%':this[_0x537808(0x628)](0x7);if(_0xeb619c===_0x537808(0x3b9))return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x628)](0x8)*0x64))+'%':this['sparam'](0x8);if(_0xeb619c===_0x537808(0x56b))return _0x176304?String(Math[_0x537808(0x546)](this[_0x537808(0x628)](0x9)*0x64))+'%':this[_0x537808(0x628)](0x9);if(VisuMZ[_0x537808(0x6ac)][_0x537808(0x195)][_0xeb619c]){if(_0x537808(0x7c7)===_0x537808(0x7c7)){const _0x28a085=VisuMZ['CoreEngine'][_0x537808(0x195)][_0xeb619c],_0x3f5488=this[_0x28a085];if(VisuMZ[_0x537808(0x6ac)][_0x537808(0x1a3)][_0xeb619c]===_0x537808(0x4a2)){if('bsZKe'!==_0x537808(0x1e2)){function _0x5c0f27(){const _0x3da36c=_0x537808;this['drawText'](_0xbf0cf3['CoreEngine'][_0x3da36c(0x5ba)][_0x3da36c(0x2cf)][_0x3da36c(0x7c6)],_0x30ad97,_0x2a18b2,_0x18ba67,_0x3da36c(0x830));}}else return _0x3f5488;}else{if(_0x537808(0x88c)!==_0x537808(0x597))return _0x176304?String(Math[_0x537808(0x546)](_0x3f5488*0x64))+'%':_0x3f5488;else{function _0x536890(){const _0x231b74=_0x537808;this[_0x231b74(0x513)]-=_0x25aba9['floor']((_0x1049ce[_0x231b74(0x849)]-_0x222f27['boxWidth'])/0x2);}}}}else{function _0x1f99ba(){const _0x3d8e20=_0x537808;return _0x1942ef[_0x3d8e20(0x6ac)][_0x3d8e20(0x5ba)]['QoL']['AccuracyBoost']&&_0x427a23[_0x3d8e20(0x497)]()?_0x5bf016[_0x3d8e20(0x2ed)]-0.05:_0x15ec30['eva'];}}}return'';},Game_BattlerBase[_0x2ef904(0x6a6)][_0x2ef904(0x605)]=function(){const _0x93b743=_0x2ef904;return this[_0x93b743(0x7df)]()&&this[_0x93b743(0x718)]<this['mhp']*VisuMZ[_0x93b743(0x6ac)][_0x93b743(0x5ba)]['Param'][_0x93b743(0x5c0)];},Game_Battler['prototype'][_0x2ef904(0x797)]=function(){const _0x572493=_0x2ef904;SoundManager[_0x572493(0x1d2)](),this[_0x572493(0x843)](_0x572493(0x604));},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x161)]=Game_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x6c2)],Game_Actor['prototype']['paramBase']=function(_0x1e8d96){const _0x4c8591=_0x2ef904;if(this[_0x4c8591(0x42e)]>0x63)return this[_0x4c8591(0x867)](_0x1e8d96);return VisuMZ[_0x4c8591(0x6ac)][_0x4c8591(0x161)]['call'](this,_0x1e8d96);},Game_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x867)]=function(_0x278592){const _0x37fdbd=_0x2ef904,_0x4e1fbd=this[_0x37fdbd(0x6ba)]()[_0x37fdbd(0x34e)][_0x278592][0x63],_0x1c4665=this[_0x37fdbd(0x6ba)]()[_0x37fdbd(0x34e)][_0x278592][0x62];return _0x4e1fbd+(_0x4e1fbd-_0x1c4665)*(this[_0x37fdbd(0x42e)]-0x63);},VisuMZ[_0x2ef904(0x6ac)]['Game_Actor_changeClass']=Game_Actor[_0x2ef904(0x6a6)]['changeClass'],Game_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x687)]=function(_0x22f382,_0x344922){const _0x2a5340=_0x2ef904;$gameTemp['_changingClass']=!![],VisuMZ[_0x2a5340(0x6ac)][_0x2a5340(0x2ea)]['call'](this,_0x22f382,_0x344922),$gameTemp[_0x2a5340(0x75b)]=undefined;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x25d)]=Game_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x343)],Game_Actor['prototype']['levelUp']=function(){const _0x520bdf=_0x2ef904;VisuMZ[_0x520bdf(0x6ac)]['Game_Actor_levelUp'][_0x520bdf(0x64a)](this);if(!$gameTemp[_0x520bdf(0x75b)])this[_0x520bdf(0x266)]();},Game_Actor[_0x2ef904(0x6a6)]['levelUpRecovery']=function(){const _0x549432=_0x2ef904;this[_0x549432(0x88f)]={};if(VisuMZ[_0x549432(0x6ac)]['Settings']['QoL'][_0x549432(0x800)])this['_hp']=this['mhp'];if(VisuMZ['CoreEngine'][_0x549432(0x5ba)][_0x549432(0x788)][_0x549432(0x7f9)])this[_0x549432(0x749)]=this[_0x549432(0x610)];},Game_Actor['prototype'][_0x2ef904(0x1b7)]=function(){const _0x4d1cca=_0x2ef904;if(this[_0x4d1cca(0x38d)]())return 0x1;const _0x50d7d1=this['nextLevelExp']()-this[_0x4d1cca(0x2c5)](),_0x51e5b7=this[_0x4d1cca(0x77d)]()-this[_0x4d1cca(0x2c5)]();return(_0x51e5b7/_0x50d7d1)[_0x4d1cca(0x7b9)](0x0,0x1);},Game_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x1f7)]=function(){const _0x5e89ab=_0x2ef904,_0x1878c0=Game_Battler[_0x5e89ab(0x6a6)][_0x5e89ab(0x1f7)][_0x5e89ab(0x64a)](this);for(const _0x45cd81 of this[_0x5e89ab(0x832)]()){if(_0x5e89ab(0x8a4)===_0x5e89ab(0x87a)){function _0xd5bb54(){const _0x57416e=_0x5e89ab;_0x491711+=_0xbd85d2+'〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x57416e(0x764)](_0x1347a2,_0xcc5d56['name']||_0x57416e(0x2cc))+_0x4f8e4e;}}else{if(_0x45cd81){if('UehYN'===_0x5e89ab(0x8a3)){function _0x30a277(){const _0x5cffa1=_0x5e89ab;return _0x240b1a[_0x5cffa1(0x6ac)]['Settings'][_0x5cffa1(0x788)][_0x5cffa1(0x3de)]?0x0:_0x471748[_0x5cffa1(0x6ac)][_0x5cffa1(0x146)][_0x5cffa1(0x64a)](this,_0x3ca683);}}else _0x1878c0[_0x5e89ab(0x147)](_0x45cd81);}}}return _0x1878c0[_0x5e89ab(0x147)](this[_0x5e89ab(0x6ba)](),this[_0x5e89ab(0x22d)]()),_0x1878c0;},Object[_0x2ef904(0x5d1)](Game_Enemy['prototype'],_0x2ef904(0x42e),{'get':function(){return this['getLevel']();},'configurable':!![]}),Game_Enemy[_0x2ef904(0x6a6)][_0x2ef904(0x350)]=function(){const _0x4df87e=_0x2ef904;return this[_0x4df87e(0x17a)]()['level'];},Game_Enemy['prototype'][_0x2ef904(0x5df)]=function(){const _0x22ab11=_0x2ef904;if(!this[_0x22ab11(0x453)]){if(_0x22ab11(0x33f)!==_0x22ab11(0x714)){this[_0x22ab11(0x51b)]+=Math['round']((Graphics[_0x22ab11(0x451)]-0x270)/0x2),this['_screenY']-=Math[_0x22ab11(0x661)]((Graphics[_0x22ab11(0x451)]-Graphics[_0x22ab11(0x303)])/0x2);if($gameSystem['isSideView']()){if(_0x22ab11(0x563)!==_0x22ab11(0x563)){function _0x37742d(){const _0x3590b5=_0x22ab11;if(!this[_0x3590b5(0x2a4)]())return![];else{const _0x4adcf9=_0x5183bc[_0x3590b5(0x891)](_0x1cd25b,_0x53782a)[_0x3590b5(0x31d)](_0x1d3148=>_0x1d3148['isNormalPriority']());return _0x4adcf9[_0x3590b5(0x862)]>0x0;}}}else this[_0x22ab11(0x513)]-=Math['floor']((Graphics[_0x22ab11(0x849)]-Graphics['boxWidth'])/0x2);}else this['_screenX']+=Math[_0x22ab11(0x546)]((Graphics[_0x22ab11(0x67c)]-0x330)/0x2);}else{function _0x423206(){const _0x57bd76=_0x22ab11;if(_0x5cef66[_0x57bd76(0x7e8)]!==_0x1ea0d0)return _0x20f92e['_forcedBattleSys'];if(this[_0x57bd76(0x187)]===_0x559de6)this[_0x57bd76(0x7aa)]();if(this[_0x57bd76(0x187)][_0x57bd76(0x2ee)]===_0x548a05)this[_0x57bd76(0x5ab)]();return this[_0x57bd76(0x187)][_0x57bd76(0x2ee)];}}}this[_0x22ab11(0x453)]=!![];},Game_Party[_0x2ef904(0x6a6)][_0x2ef904(0x684)]=function(){const _0x26e11e=_0x2ef904;return VisuMZ['CoreEngine'][_0x26e11e(0x5ba)]['Gold'][_0x26e11e(0x2d4)];},VisuMZ[_0x2ef904(0x6ac)]['Game_Party_consumeItem']=Game_Party[_0x2ef904(0x6a6)]['consumeItem'],Game_Party[_0x2ef904(0x6a6)][_0x2ef904(0x853)]=function(_0xf0422e){const _0xafac21=_0x2ef904;if(VisuMZ[_0xafac21(0x6ac)]['Settings'][_0xafac21(0x788)][_0xafac21(0x86e)]&&DataManager[_0xafac21(0x4b4)](_0xf0422e))return;VisuMZ[_0xafac21(0x6ac)][_0xafac21(0x6b1)][_0xafac21(0x64a)](this,_0xf0422e);},Game_Party['prototype']['setupBattleTestItems']=function(){const _0xc62b35=_0x2ef904,_0x1e63b0=VisuMZ['CoreEngine'][_0xc62b35(0x5ba)][_0xc62b35(0x788)],_0x4e4e64=_0x1e63b0['BTestAddedQuantity']??0x63;let _0x4c56ce=[];(_0x1e63b0[_0xc62b35(0x431)]??!![])&&(_0x4c56ce=_0x4c56ce[_0xc62b35(0x52c)]($dataItems));(_0x1e63b0[_0xc62b35(0x7f5)]??!![])&&(_0x4c56ce=_0x4c56ce['concat']($dataWeapons));(_0x1e63b0['BTestArmors']??!![])&&(_0x4c56ce=_0x4c56ce[_0xc62b35(0x52c)]($dataArmors));for(const _0x349ce6 of _0x4c56ce){if(!_0x349ce6)continue;if(_0x349ce6['name'][_0xc62b35(0x4c9)]()<=0x0)continue;if(_0x349ce6[_0xc62b35(0x1fd)]['match'](/-----/i))continue;this[_0xc62b35(0x6b5)](_0x349ce6,_0x4e4e64);}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x629)]=Game_Troop['prototype']['setup'],Game_Troop[_0x2ef904(0x6a6)][_0x2ef904(0x6fc)]=function(_0x324ace){const _0x492b91=_0x2ef904;$gameTemp[_0x492b91(0x59e)](),$gameTemp[_0x492b91(0x7fe)](_0x324ace),VisuMZ[_0x492b91(0x6ac)][_0x492b91(0x629)][_0x492b91(0x64a)](this,_0x324ace);},VisuMZ['CoreEngine'][_0x2ef904(0x7a9)]=Game_Map['prototype'][_0x2ef904(0x6fc)],Game_Map[_0x2ef904(0x6a6)][_0x2ef904(0x6fc)]=function(_0x16e017){const _0x526301=_0x2ef904;VisuMZ[_0x526301(0x6ac)][_0x526301(0x7a9)][_0x526301(0x64a)](this,_0x16e017),this[_0x526301(0x48f)](_0x16e017);},Game_Map[_0x2ef904(0x6a6)][_0x2ef904(0x48f)]=function(){const _0x96cc37=_0x2ef904;this[_0x96cc37(0x7b8)]=VisuMZ[_0x96cc37(0x6ac)]['Settings'][_0x96cc37(0x788)]['NoTileShadows']||![];if($dataMap&&$dataMap['note']){if($dataMap[_0x96cc37(0x80d)][_0x96cc37(0x376)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];if($dataMap[_0x96cc37(0x80d)][_0x96cc37(0x376)](/<HIDE TILE SHADOWS>/i))this[_0x96cc37(0x7b8)]=!![];}},Game_Map[_0x2ef904(0x6a6)][_0x2ef904(0x2f2)]=function(){const _0x497968=_0x2ef904;if(this[_0x497968(0x7b8)]===undefined)this[_0x497968(0x48f)]();return this[_0x497968(0x7b8)];},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x390)]=Game_Character[_0x2ef904(0x6a6)]['processMoveCommand'],Game_Character['prototype'][_0x2ef904(0x7f8)]=function(_0x2ffcdc){const _0x55fe5c=_0x2ef904;try{VisuMZ[_0x55fe5c(0x6ac)]['Game_Character_processMoveCommand'][_0x55fe5c(0x64a)](this,_0x2ffcdc);}catch(_0x2c1ead){if(_0x55fe5c(0x79a)!==_0x55fe5c(0x79a)){function _0x14b870(){const _0x333922=_0x55fe5c;_0x41d48e[_0x333922(0x5b2)]&&(this[_0x333922(0x7e8)]=_0x333922(0x794));}}else{if($gameTemp[_0x55fe5c(0x7be)]())console[_0x55fe5c(0x466)](_0x2c1ead);}}},Game_Player[_0x2ef904(0x6a6)][_0x2ef904(0x807)]=function(){const _0x5325b9=_0x2ef904,_0x565de6=$gameMap[_0x5325b9(0x6f0)]();this['_encounterCount']=Math[_0x5325b9(0x4d8)](_0x565de6)+Math[_0x5325b9(0x4d8)](_0x565de6)+this[_0x5325b9(0x6fb)]();},Game_Player[_0x2ef904(0x6a6)]['encounterStepsMinimum']=function(){const _0x289dc5=_0x2ef904;if($dataMap&&$dataMap[_0x289dc5(0x80d)]&&$dataMap[_0x289dc5(0x80d)][_0x289dc5(0x376)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)){if(_0x289dc5(0x675)===_0x289dc5(0x675))return Number(RegExp['$1']);else{function _0x34485f(){return _0x103bdf(_0x5cf0a4)['toLocaleString'](_0x14a362,_0x3d653b)+',';}}}else{if('elSkf'===_0x289dc5(0x2b2)){function _0x5f14ce(){const _0x278901=_0x289dc5;return _0x1a3121['horzJS'][_0x278901(0x64a)](this);}}else return VisuMZ[_0x289dc5(0x6ac)]['Settings'][_0x289dc5(0x788)][_0x289dc5(0x360)];}},VisuMZ[_0x2ef904(0x6ac)]['Game_Event_isCollidedWithEvents']=Game_Event[_0x2ef904(0x6a6)][_0x2ef904(0x4d0)],Game_Event[_0x2ef904(0x6a6)][_0x2ef904(0x4d0)]=function(_0x3ea443,_0x3c32da){const _0x4190f4=_0x2ef904;return this[_0x4190f4(0x66b)]()?this[_0x4190f4(0x359)](_0x3ea443,_0x3c32da):VisuMZ[_0x4190f4(0x6ac)][_0x4190f4(0x2bc)][_0x4190f4(0x64a)](this,_0x3ea443,_0x3c32da);},Game_Event[_0x2ef904(0x6a6)][_0x2ef904(0x66b)]=function(){const _0x44818e=_0x2ef904;return VisuMZ[_0x44818e(0x6ac)][_0x44818e(0x5ba)][_0x44818e(0x788)]['SmartEventCollisionPriority'];},Game_Event[_0x2ef904(0x6a6)][_0x2ef904(0x359)]=function(_0x1ddbed,_0x3914e4){const _0x4bc800=_0x2ef904;if(!this[_0x4bc800(0x2a4)]())return![];else{const _0x1aeb0c=$gameMap[_0x4bc800(0x891)](_0x1ddbed,_0x3914e4)[_0x4bc800(0x31d)](_0x307ccd=>_0x307ccd[_0x4bc800(0x2a4)]());return _0x1aeb0c[_0x4bc800(0x862)]>0x0;}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x394)]=Game_Interpreter['prototype'][_0x2ef904(0x365)],Game_Interpreter['prototype'][_0x2ef904(0x365)]=function(_0x3f7e60){const _0x2cd975=_0x2ef904,_0x2772a7=this[_0x2cd975(0x645)]();return _0x2772a7['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x2cd975(0x1eb)](_0x2772a7):VisuMZ[_0x2cd975(0x6ac)][_0x2cd975(0x394)][_0x2cd975(0x64a)](this,_0x3f7e60);},Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x645)]=function(){const _0x503186=_0x2ef904;let _0x36feee='',_0x48d615=this[_0x503186(0x6df)]+0x1;while(this[_0x503186(0x592)][_0x48d615]&&this[_0x503186(0x592)][_0x48d615][_0x503186(0x56e)]===0x195){_0x36feee+=this[_0x503186(0x592)][_0x48d615][_0x503186(0x4b0)][0x0]+'\x0a',_0x48d615++;}return _0x36feee;},Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x1eb)]=function(_0x5d7792){const _0x3dff56=_0x2ef904;try{if('AULvH'===_0x3dff56(0x7e7))eval(_0x5d7792);else{function _0x185d8f(){const _0x2f5d94=_0x3dff56;_0x467d65[_0x2f5d94(0x6ac)][_0x2f5d94(0x50d)][_0x2f5d94(0x64a)](this),this[_0x2f5d94(0x67f)]();}}}catch(_0x28507d){if($gameTemp['isPlaytest']()){if(_0x3dff56(0x1a2)==='enJNa'){function _0x1046dc(){const _0x4869b9=_0x3dff56;this[_0x4869b9(0x2da)]();}}else console[_0x3dff56(0x466)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console['log'](_0x28507d);}}return!![];},VisuMZ['CoreEngine'][_0x2ef904(0x2ff)]=Game_Interpreter[_0x2ef904(0x6a6)]['command111'],Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x36b)]=function(_0x19e399){const _0x29ac01=_0x2ef904;try{if(_0x29ac01(0x7b1)===_0x29ac01(0x7b1))VisuMZ[_0x29ac01(0x6ac)][_0x29ac01(0x2ff)][_0x29ac01(0x64a)](this,_0x19e399);else{function _0x14af6d(){const _0x5ac02c=_0x29ac01,_0x13ecaa=_0x5ac02c(0x283);this[_0x5ac02c(0x622)]=this['_colorCache']||{};if(this[_0x5ac02c(0x622)][_0x13ecaa])return this[_0x5ac02c(0x622)][_0x13ecaa];const _0x1cdf73=_0x24c0e7['CoreEngine']['Settings'][_0x5ac02c(0x888)][_0x5ac02c(0x7c2)];return this[_0x5ac02c(0x5e5)](_0x13ecaa,_0x1cdf73);}}}catch(_0x13c83b){$gameTemp[_0x29ac01(0x7be)]()&&(console[_0x29ac01(0x466)](_0x29ac01(0x163)),console[_0x29ac01(0x466)](_0x13c83b)),this[_0x29ac01(0x589)]();}return!![];},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x1b0)]=Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x825)],Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x825)]=function(_0x4a7a4c){const _0x2abbe7=_0x2ef904;try{if('vnTcD'==='vnTcD')VisuMZ[_0x2abbe7(0x6ac)][_0x2abbe7(0x1b0)]['call'](this,_0x4a7a4c);else{function _0x297128(){const _0x53d979=_0x2abbe7;_0x4c2b4b['ConvertParams'](_0x27ee79,_0x22aabc);const _0x5f0167=_0x6e371a[_0x53d979(0x6a8)];_0x932f54[_0x53d979(0x57d)](_0x5f0167);}}}catch(_0x44a3ad){$gameTemp[_0x2abbe7(0x7be)]()&&(console[_0x2abbe7(0x466)](_0x2abbe7(0x175)),console[_0x2abbe7(0x466)](_0x44a3ad));}return!![];},VisuMZ['CoreEngine'][_0x2ef904(0x81e)]=Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x46a)],Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x46a)]=function(){const _0x1a668f=_0x2ef904;try{VisuMZ[_0x1a668f(0x6ac)]['Game_Interpreter_command355']['call'](this);}catch(_0x236a5a){if('NuqmH'!==_0x1a668f(0x43e)){function _0x32e3a6(){const _0x504432=_0x1a668f;this[_0x504432(0x6d6)]['x']!==0x0&&(this['_pictureContainer']['scale']['x']=0x1/this[_0x504432(0x6d6)]['x'],this[_0x504432(0x468)]['x']=-(this['x']/this[_0x504432(0x6d6)]['x'])),this[_0x504432(0x6d6)]['y']!==0x0&&(this[_0x504432(0x468)]['scale']['y']=0x1/this[_0x504432(0x6d6)]['y'],this[_0x504432(0x468)]['y']=-(this['y']/this[_0x504432(0x6d6)]['y']));}}else{if($gameTemp[_0x1a668f(0x7be)]()){if(_0x1a668f(0x21b)===_0x1a668f(0x21b))console['log'](_0x1a668f(0x5d2)),console[_0x1a668f(0x466)](_0x236a5a);else{function _0x510bb4(){const _0x6de03c=_0x1a668f;_0xaec5f5['prototype'][_0x6de03c(0x62b)][_0x6de03c(0x64a)](this),this[_0x6de03c(0x646)]();}}}}}return!![];},VisuMZ['CoreEngine'][_0x2ef904(0x4dd)]=Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x82b)],Game_Interpreter[_0x2ef904(0x6a6)][_0x2ef904(0x82b)]=function(_0x2b941c){const _0x57171e=_0x2ef904;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x57171e(0x6ac)][_0x57171e(0x4dd)][_0x57171e(0x64a)](this,_0x2b941c);},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x1b8)]=function(){const _0x330ef3=_0x2ef904;return VisuMZ[_0x330ef3(0x6ac)]['Settings']['UI'][_0x330ef3(0x608)];},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x309)]=function(){const _0x165f7f=_0x2ef904;return VisuMZ[_0x165f7f(0x6ac)][_0x165f7f(0x5ba)]['UI']['BottomHelp'];},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x2b4)]=function(){const _0x10ad1f=_0x2ef904;return VisuMZ['CoreEngine'][_0x10ad1f(0x5ba)]['UI'][_0x10ad1f(0x3c9)];},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x3cc)]=function(){const _0x455ce8=_0x2ef904;return VisuMZ[_0x455ce8(0x6ac)][_0x455ce8(0x5ba)]['UI'][_0x455ce8(0x38a)];},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x6d1)]=function(){const _0x4606fb=_0x2ef904;return VisuMZ[_0x4606fb(0x6ac)][_0x4606fb(0x5ba)]['UI'][_0x4606fb(0x5fd)];},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x84e)]=function(){const _0x7c89a6=_0x2ef904;return VisuMZ[_0x7c89a6(0x6ac)][_0x7c89a6(0x5ba)]['UI']['ButtonHeight'];},Scene_Base['prototype'][_0x2ef904(0x5dd)]=function(){const _0x2236bd=_0x2ef904;return VisuMZ[_0x2236bd(0x6ac)][_0x2236bd(0x5ba)][_0x2236bd(0x5cf)]['EnableMasking'];},VisuMZ[_0x2ef904(0x6ac)]['Scene_Base_createWindowLayer']=Scene_Base['prototype']['createWindowLayer'],Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x53d)]=function(){const _0x1e2402=_0x2ef904;VisuMZ[_0x1e2402(0x6ac)][_0x1e2402(0x53c)]['call'](this),this[_0x1e2402(0x741)](),this[_0x1e2402(0x70b)]['x']=Math[_0x1e2402(0x546)](this[_0x1e2402(0x70b)]['x']),this['_windowLayer']['y']=Math[_0x1e2402(0x546)](this[_0x1e2402(0x70b)]['y']);},Scene_Base['prototype'][_0x2ef904(0x741)]=function(){},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x583)]=function(){const _0x779430=_0x2ef904;return TextManager[_0x779430(0x5f4)](_0x779430(0x54a),_0x779430(0x7a7));},Scene_Base['prototype']['buttonAssistKey2']=function(){const _0x55709d=_0x2ef904;return TextManager[_0x55709d(0x65d)]('tab');},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x5bd)]=function(){const _0x39b3ee=_0x2ef904;return TextManager[_0x39b3ee(0x65d)](_0x39b3ee(0x808));},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x1ad)]=function(){const _0x7cd691=_0x2ef904;return TextManager[_0x7cd691(0x65d)]('ok');},Scene_Base['prototype'][_0x2ef904(0x7cd)]=function(){const _0x3a4166=_0x2ef904;return TextManager[_0x3a4166(0x65d)]('cancel');},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x312)]=function(){const _0x5a433d=_0x2ef904;if(this[_0x5a433d(0x6dd)]&&this[_0x5a433d(0x6dd)][_0x5a433d(0x599)]){if(_0x5a433d(0x5ff)!=='WpXyJ'){function _0x40bd18(){const _0x43102a=_0x5a433d,_0x215cc1=_0x3b06c4['y']+(this[_0x43102a(0x5fc)]()-_0x144812[_0x43102a(0x3a3)])/0x2;this[_0x43102a(0x752)](_0xe7869d,_0x38f492['x'],_0x215cc1);const _0x42743d=_0x2e1dc0[_0x43102a(0x3b0)]+0x4;_0xcea44a['x']+=_0x42743d,_0x3e7b8c[_0x43102a(0x849)]-=_0x42743d;}}else return TextManager[_0x5a433d(0x735)];}else return'';},Scene_Base['prototype'][_0x2ef904(0x3ce)]=function(){return'';},Scene_Base['prototype'][_0x2ef904(0x169)]=function(){return'';},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x4ae)]=function(){const _0x1aacd0=_0x2ef904;return TextManager[_0x1aacd0(0x7e0)];},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x774)]=function(){const _0x23f861=_0x2ef904;return TextManager[_0x23f861(0x245)];},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x330)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset2']=function(){return 0x0;},Scene_Base[_0x2ef904(0x6a6)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x2ef904(0x6a6)][_0x2ef904(0x45a)]=function(){return 0x0;},Scene_Base['prototype'][_0x2ef904(0x15f)]=function(){return 0x0;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x3e5)]=Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x6ee)],Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x6ee)]=function(){const _0x2e3033=_0x2ef904;VisuMZ[_0x2e3033(0x6ac)][_0x2e3033(0x3e5)][_0x2e3033(0x64a)](this),this[_0x2e3033(0x26b)]();},Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x26b)]=function(){const _0xaf3b1e=_0x2ef904,_0x331d00=[_0xaf3b1e(0x63c),_0xaf3b1e(0x52d),_0xaf3b1e(0x19d),_0xaf3b1e(0x4e4),'enemies',_0xaf3b1e(0x541),_0xaf3b1e(0x707),_0xaf3b1e(0x59f),_0xaf3b1e(0x150),_0xaf3b1e(0x86d),_0xaf3b1e(0x6c0),_0xaf3b1e(0x8a9),_0xaf3b1e(0x3cd),_0xaf3b1e(0x326)];for(const _0xfac635 of _0x331d00){if('jSwvn'==='vFuuE'){function _0x3a1ed3(){const _0x49c0f9=_0xaf3b1e;if(this[_0x49c0f9(0x827)]==='keyboard'&&!_0xfc72e1[_0x49c0f9(0x3b4)]())return;if(_0x5a9464[_0x49c0f9(0x5b1)]())return;_0x2ac813[_0x49c0f9(0x6ac)][_0x49c0f9(0x1ec)][_0x49c0f9(0x64a)](this,_0x87dc8a),this[_0x49c0f9(0x6a7)](_0x49c0f9(0x166));}}else{const _0x2d21f5=VisuMZ['CoreEngine'][_0xaf3b1e(0x5ba)][_0xaf3b1e(0x87e)][_0xfac635],_0x1ce568=_0xaf3b1e(0x571)[_0xaf3b1e(0x764)](_0xfac635);for(const _0x23a01b of _0x2d21f5){if(_0xaf3b1e(0x6bf)===_0xaf3b1e(0x7b6)){function _0x271f42(){const _0x2a1839=_0xaf3b1e,_0x121ed0=_0x4d5a24[_0x2a1839(0x757)](_0x4d07cc)+0x1;let _0x319ee6=_0x253988+_0x2a1839(0x7ab),_0x4fe0ea=_0x35ebb7[_0x2a1839(0x6ac)][_0x2a1839(0x805)](_0x1cf597['list']);_0x4fe0ea['length']>0x0&&(_0xeb7bb7['length']>0x0?_0xc07ab5+=_0x5e3b8b+_0x2a1839(0x680):_0x584e3c+=_0x134984+_0x2a1839(0x1d8)[_0x2a1839(0x764)](_0x4ee519,_0x3c4438[_0x2a1839(0x1fd)]||'Unnamed')+_0xdf82f2,_0x45e108+=_0x319ee6['format'](_0x121ed0,_0x4fe0ea));}}else ImageManager[_0xaf3b1e(0x68a)](_0x1ce568,_0x23a01b);}}}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x58b)]=Scene_Boot[_0x2ef904(0x6a6)]['startNormalGame'],Scene_Boot['prototype'][_0x2ef904(0x7dc)]=function(){const _0x366350=_0x2ef904;if(Utils[_0x366350(0x693)](_0x366350(0x86c))&&VisuMZ[_0x366350(0x6ac)][_0x366350(0x5ba)][_0x366350(0x788)][_0x366350(0x632)])this[_0x366350(0x48e)]();else{if(_0x366350(0x30d)===_0x366350(0x30d))VisuMZ[_0x366350(0x6ac)][_0x366350(0x58b)][_0x366350(0x64a)](this);else{function _0x4462e(){const _0x1bd729=_0x366350;if(!this[_0x1bd729(0x325)])return;if(!this[_0x1bd729(0x325)][_0x1bd729(0x16b)])return;this[_0x1bd729(0x325)][_0x1bd729(0x1ba)]&&!this[_0x1bd729(0x44d)][_0x1bd729(0x1ba)][_0x1bd729(0x1b2)]&&this[_0x1bd729(0x325)][_0x1bd729(0x556)]();}}}},Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x48e)]=function(){const _0x25078e=_0x2ef904;DataManager[_0x25078e(0x14e)](),SceneManager[_0x25078e(0x50c)](Scene_Map);},Scene_Boot[_0x2ef904(0x6a6)]['adjustBoxSize']=function(){const _0x3b9665=_0x2ef904,_0x57b2c6=$dataSystem[_0x3b9665(0x60e)]['uiAreaWidth'],_0x520a3e=$dataSystem['advanced'][_0x3b9665(0x395)],_0x1af35c=VisuMZ['CoreEngine']['Settings']['UI'][_0x3b9665(0x40c)];Graphics[_0x3b9665(0x67c)]=_0x57b2c6-_0x1af35c*0x2,Graphics[_0x3b9665(0x303)]=_0x520a3e-_0x1af35c*0x2,this[_0x3b9665(0x472)]();},VisuMZ['CoreEngine'][_0x2ef904(0x348)]=Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x88b)],Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x88b)]=function(){const _0x3810ac=_0x2ef904;if(this[_0x3810ac(0x78c)]()){if(_0x3810ac(0x60c)!==_0x3810ac(0x60c)){function _0x360238(){const _0x3c7469=_0x3810ac;return _0x2cbab7[_0x3c7469(0x6ac)][_0x3c7469(0x685)][_0x3c7469(0x64a)](this,_0x1eb979);}}else this[_0x3810ac(0x4ce)]();}else VisuMZ['CoreEngine'][_0x3810ac(0x348)]['call'](this);},Scene_Boot[_0x2ef904(0x6a6)][_0x2ef904(0x78c)]=function(){const _0x399734=_0x2ef904;if(Scene_Title[_0x399734(0x66e)]==='')return![];if(Scene_Title['subtitle']===_0x399734(0x627))return![];if(Scene_Title[_0x399734(0x689)]==='')return![];if(Scene_Title[_0x399734(0x689)]===_0x399734(0x65f))return![];return!![];},Scene_Boot[_0x2ef904(0x6a6)]['makeDocumentTitle']=function(){const _0x4e83c5=_0x2ef904,_0x428a8b=$dataSystem[_0x4e83c5(0x813)],_0x535dde=Scene_Title['subtitle']||'',_0x4ef124=Scene_Title[_0x4e83c5(0x689)]||'',_0x2fdcbc=VisuMZ['CoreEngine'][_0x4e83c5(0x5ba)][_0x4e83c5(0x1c9)][_0x4e83c5(0x6c3)]['DocumentTitleFmt'],_0x27f491=_0x2fdcbc[_0x4e83c5(0x764)](_0x428a8b,_0x535dde,_0x4ef124);document[_0x4e83c5(0x5d8)]=_0x27f491;},Scene_Boot[_0x2ef904(0x6a6)]['determineSideButtonLayoutValid']=function(){const _0x11f9c3=_0x2ef904;if(VisuMZ[_0x11f9c3(0x6ac)][_0x11f9c3(0x5ba)]['UI']['SideButtons']){const _0x3b3937=Graphics[_0x11f9c3(0x849)]-Graphics[_0x11f9c3(0x67c)]-VisuMZ[_0x11f9c3(0x6ac)]['Settings']['UI']['BoxMargin']*0x2,_0x22268c=Sprite_Button['prototype'][_0x11f9c3(0x61c)][_0x11f9c3(0x64a)](this)*0x4;if(_0x3b3937>=_0x22268c)SceneManager['setSideButtonLayout'](!![]);}},Scene_Title['subtitle']=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x1c9)]['Title'][_0x2ef904(0x627)],Scene_Title[_0x2ef904(0x689)]=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x1c9)]['Title'][_0x2ef904(0x713)],Scene_Title[_0x2ef904(0x18a)]=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x61d)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x89c)]=Scene_Title['prototype']['drawGameTitle'],Scene_Title[_0x2ef904(0x6a6)][_0x2ef904(0x6e8)]=function(){const _0x40ccb0=_0x2ef904;VisuMZ['CoreEngine'][_0x40ccb0(0x5ba)][_0x40ccb0(0x1c9)]['Title'][_0x40ccb0(0x6e8)][_0x40ccb0(0x64a)](this);if(Scene_Title[_0x40ccb0(0x66e)]!==''&&Scene_Title[_0x40ccb0(0x66e)]!==_0x40ccb0(0x627))this[_0x40ccb0(0x543)]();if(Scene_Title[_0x40ccb0(0x689)]!==''&&Scene_Title[_0x40ccb0(0x689)]!=='0.00')this['drawGameVersion']();},Scene_Title['prototype'][_0x2ef904(0x543)]=function(){const _0x22ab33=_0x2ef904;VisuMZ[_0x22ab33(0x6ac)]['Settings'][_0x22ab33(0x1c9)][_0x22ab33(0x6c3)]['drawGameSubtitle'][_0x22ab33(0x64a)](this);},Scene_Title['prototype'][_0x2ef904(0x547)]=function(){const _0x28fef4=_0x2ef904;VisuMZ['CoreEngine']['Settings'][_0x28fef4(0x1c9)]['Title']['drawGameVersion']['call'](this);},Scene_Title[_0x2ef904(0x6a6)][_0x2ef904(0x61e)]=function(){const _0x14d332=_0x2ef904;this[_0x14d332(0x2fd)]();const _0x1ebae2=$dataSystem['titleCommandWindow'][_0x14d332(0x53a)],_0xa7134f=this[_0x14d332(0x5b8)]();this[_0x14d332(0x613)]=new Window_TitleCommand(_0xa7134f),this['_commandWindow']['setBackgroundType'](_0x1ebae2);const _0x55c92e=this[_0x14d332(0x5b8)]();this['_commandWindow']['move'](_0x55c92e['x'],_0x55c92e['y'],_0x55c92e[_0x14d332(0x849)],_0x55c92e[_0x14d332(0x451)]),this[_0x14d332(0x4e2)](this['_commandWindow']);},Scene_Title[_0x2ef904(0x6a6)][_0x2ef904(0x4b3)]=function(){const _0x57f12f=_0x2ef904;return this['_commandWindow']?this['_commandWindow'][_0x57f12f(0x5a8)]():VisuMZ['CoreEngine'][_0x57f12f(0x5ba)][_0x57f12f(0x40f)][_0x57f12f(0x862)];},Scene_Title[_0x2ef904(0x6a6)][_0x2ef904(0x5b8)]=function(){const _0x361610=_0x2ef904;return VisuMZ[_0x361610(0x6ac)]['Settings'][_0x361610(0x1c9)]['Title'][_0x361610(0x30f)]['call'](this);},Scene_Title[_0x2ef904(0x6a6)][_0x2ef904(0x2fd)]=function(){const _0x4e3a7e=_0x2ef904;for(const _0x4cd3b8 of Scene_Title[_0x4e3a7e(0x18a)]){if(_0x4e3a7e(0x7ce)==='ZnbHJ'){const _0x541274=new Sprite_TitlePictureButton(_0x4cd3b8);this[_0x4e3a7e(0x55b)](_0x541274);}else{function _0x2c0729(){const _0x4eacb6=_0x4e3a7e;if(_0x47e37b[_0x4eacb6(0x862)]>0x0)_0x5786fc+=_0x2e286d+_0x4eacb6(0x680);else{const _0x391484=_0x8bb723[_0x4daa89][_0x4eacb6(0x1fd)];_0x42317d+=_0x5e1c66+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'[_0x4eacb6(0x764)](_0x2f9ed9,_0x391484||_0x4eacb6(0x2cc))+_0xd9545d;}_0x22c2b4+=_0xd13121[_0x4eacb6(0x764)](_0x340ea8,_0xca5c32,_0x319245,_0x489fec);}}}},VisuMZ['CoreEngine'][_0x2ef904(0x5c9)]=Scene_Map[_0x2ef904(0x6a6)][_0x2ef904(0x13d)],Scene_Map[_0x2ef904(0x6a6)]['initialize']=function(){const _0x453888=_0x2ef904;VisuMZ[_0x453888(0x6ac)][_0x453888(0x5c9)][_0x453888(0x64a)](this),$gameTemp[_0x453888(0x59e)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x3fd)]=Scene_Map[_0x2ef904(0x6a6)]['updateMainMultiply'],Scene_Map[_0x2ef904(0x6a6)]['updateMainMultiply']=function(){const _0x426fe1=_0x2ef904;VisuMZ['CoreEngine']['Scene_Map_updateMainMultiply'][_0x426fe1(0x64a)](this);if($gameTemp['_playTestFastMode']&&!$gameMessage[_0x426fe1(0x1a0)]()){if(_0x426fe1(0x795)==='tWsdg'){function _0x382538(){const _0x206056=_0x426fe1,_0x118330=_0x206056(0x6f8);this['_colorCache']=this[_0x206056(0x622)]||{};if(this[_0x206056(0x622)][_0x118330])return this['_colorCache'][_0x118330];const _0x19bad3=_0x292663[_0x206056(0x6ac)][_0x206056(0x5ba)][_0x206056(0x888)][_0x206056(0x375)];return this['getColorDataFromPluginParameters'](_0x118330,_0x19bad3);}}else this[_0x426fe1(0x3e6)](),SceneManager[_0x426fe1(0x43b)]();}},Scene_Map[_0x2ef904(0x6a6)]['terminate']=function(){const _0x1a13ff=_0x2ef904;Scene_Message[_0x1a13ff(0x6a6)]['terminate']['call'](this),!SceneManager[_0x1a13ff(0x329)](Scene_Battle)&&(this[_0x1a13ff(0x810)][_0x1a13ff(0x3df)](),this[_0x1a13ff(0x74f)]['hide'](),this[_0x1a13ff(0x70b)][_0x1a13ff(0x599)]=![],SceneManager[_0x1a13ff(0x29e)]()),$gameScreen[_0x1a13ff(0x5f7)]();},VisuMZ['CoreEngine'][_0x2ef904(0x4f2)]=Scene_Map[_0x2ef904(0x6a6)][_0x2ef904(0x6f2)],Scene_Map[_0x2ef904(0x6a6)]['createMenuButton']=function(){const _0x10b94e=_0x2ef904;VisuMZ['CoreEngine'][_0x10b94e(0x4f2)][_0x10b94e(0x64a)](this);if(SceneManager['isSideButtonLayout']()){if('RKuqj'===_0x10b94e(0x2ce))this['moveMenuButtonSideButtonLayout']();else{function _0x1c4fc3(){const _0x57cc96=_0x10b94e;return _0x4e2540[_0x57cc96(0x6ac)][_0x57cc96(0x5ba)][_0x57cc96(0x888)][_0x57cc96(0x243)];}}}},Scene_Map['prototype'][_0x2ef904(0x1ee)]=function(){const _0x47bad3=_0x2ef904;this['_menuButton']['x']=Graphics[_0x47bad3(0x67c)]+0x4;},VisuMZ['CoreEngine'][_0x2ef904(0x298)]=Scene_Map[_0x2ef904(0x6a6)]['updateScene'],Scene_Map[_0x2ef904(0x6a6)]['updateScene']=function(){const _0x2e6cae=_0x2ef904;VisuMZ[_0x2e6cae(0x6ac)][_0x2e6cae(0x298)]['call'](this),this[_0x2e6cae(0x2cd)]();},Scene_Map['prototype'][_0x2ef904(0x2cd)]=function(){const _0x3f8f41=_0x2ef904;Input['isTriggered'](_0x3f8f41(0x19b))&&(ConfigManager['alwaysDash']=!ConfigManager['alwaysDash'],ConfigManager['save']());},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x72f)]=Scene_MenuBase[_0x2ef904(0x6a6)]['helpAreaTop'],Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x4f3)]=function(){const _0x4cd6cc=_0x2ef904;let _0x29e875=0x0;return SceneManager[_0x4cd6cc(0x836)]()?_0x29e875=this[_0x4cd6cc(0x72e)]():_0x29e875=VisuMZ['CoreEngine'][_0x4cd6cc(0x72f)][_0x4cd6cc(0x64a)](this),this[_0x4cd6cc(0x282)]()&&this[_0x4cd6cc(0x328)]()===_0x4cd6cc(0x61a)&&(_0x29e875+=Window_ButtonAssist['prototype'][_0x4cd6cc(0x5fc)]()),_0x29e875;},Scene_MenuBase[_0x2ef904(0x6a6)]['helpAreaTopSideButtonLayout']=function(){const _0x677ea0=_0x2ef904;if(this[_0x677ea0(0x309)]())return this[_0x677ea0(0x495)]();else{if(_0x677ea0(0x7c3)!==_0x677ea0(0x1ff))return 0x0;else{function _0x2dcd90(){const _0x25793b=_0x677ea0;this[_0x25793b(0x7e8)]='STB';}}}},VisuMZ['CoreEngine'][_0x2ef904(0x573)]=Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x23a)],Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x23a)]=function(){const _0x20989f=_0x2ef904;if(SceneManager[_0x20989f(0x836)]()){if(_0x20989f(0x53b)!=='YaFgS')return this[_0x20989f(0x7ad)]();else{function _0x2a5819(){this['smoothSelect'](0x0);}}}else return VisuMZ['CoreEngine'][_0x20989f(0x573)]['call'](this);},Scene_MenuBase['prototype'][_0x2ef904(0x7ad)]=function(){const _0x2693cf=_0x2ef904;return!this[_0x2693cf(0x309)]()?this[_0x2693cf(0x533)]():0x0;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x1fa)]=Scene_MenuBase['prototype']['mainAreaHeight'],Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x1f4)]=function(){const _0x259861=_0x2ef904;let _0x96ab97=0x0;if(SceneManager['areButtonsOutsideMainUI']()){if('ttSEX'===_0x259861(0x333))_0x96ab97=this[_0x259861(0x3b6)]();else{function _0x310545(){_0x5ba138+=_0x8fbf61(_0x4a8cd4);}}}else{if(_0x259861(0x2e0)===_0x259861(0x76a)){function _0x42c945(){const _0x35d9f6=_0x259861;_0x2fc719[_0x35d9f6(0x6ac)][_0x35d9f6(0x6d7)][_0x35d9f6(0x64a)](this,_0x79275c);}}else _0x96ab97=VisuMZ[_0x259861(0x6ac)][_0x259861(0x1fa)]['call'](this);}if(this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()!==_0x259861(0x568)){if('fqoyu'!==_0x259861(0x5c3))_0x96ab97-=Window_ButtonAssist[_0x259861(0x6a6)]['lineHeight']();else{function _0x3ddf97(){const _0x282953=_0x259861;return _0x23f70b['layoutSettings'][_0x282953(0x176)][_0x282953(0x64a)](this);}}}return _0x96ab97;},Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x3b6)]=function(){const _0x35cc36=_0x2ef904;return Graphics[_0x35cc36(0x303)]-this['helpAreaHeight']();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x1df)]=Scene_MenuBase['prototype'][_0x2ef904(0x692)],Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x692)]=function(){const _0xd21262=_0x2ef904;this[_0xd21262(0x7f1)]=new PIXI[(_0xd21262(0x682))]['BlurFilter'](clamp=!![]),this[_0xd21262(0x475)]=new Sprite(),this['_backgroundSprite'][_0xd21262(0x325)]=SceneManager['backgroundBitmap'](),this[_0xd21262(0x475)][_0xd21262(0x682)]=[this[_0xd21262(0x7f1)]],this[_0xd21262(0x55b)](this['_backgroundSprite']),this[_0xd21262(0x6f4)](0xc0),this['setBackgroundOpacity'](this[_0xd21262(0x7e4)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x7e4)]=function(){const _0x483dd0=_0x2ef904,_0x3c9c09=String(this[_0x483dd0(0x1fb)][_0x483dd0(0x1fd)]),_0x32dc33=this['getCustomBackgroundSettings'](_0x3c9c09);if(_0x32dc33)return _0x32dc33['SnapshotOpacity'];else{if(_0x483dd0(0x4f1)===_0x483dd0(0x1fe)){function _0x1c00b6(){const _0x5ba8d3=_0x483dd0;return this[_0x5ba8d3(0x309)]()?this[_0x5ba8d3(0x495)]():0x0;}}else return 0xc0;}},Scene_MenuBase['prototype'][_0x2ef904(0x420)]=function(){const _0x388ca1=_0x2ef904,_0x22d468=String(this[_0x388ca1(0x1fb)][_0x388ca1(0x1fd)]),_0x356d42=this[_0x388ca1(0x51d)](_0x22d468);_0x356d42&&(_0x356d42[_0x388ca1(0x59a)]!==''||_0x356d42[_0x388ca1(0x506)]!=='')&&(this[_0x388ca1(0x369)]=new Sprite(ImageManager[_0x388ca1(0x209)](_0x356d42['BgFilename1'])),this[_0x388ca1(0x44c)]=new Sprite(ImageManager[_0x388ca1(0x83d)](_0x356d42[_0x388ca1(0x506)])),this[_0x388ca1(0x55b)](this['_backSprite1']),this[_0x388ca1(0x55b)](this[_0x388ca1(0x44c)]),this['_backSprite1']['bitmap'][_0x388ca1(0x6f5)](this[_0x388ca1(0x7c0)]['bind'](this,this[_0x388ca1(0x369)])),this[_0x388ca1(0x44c)][_0x388ca1(0x325)][_0x388ca1(0x6f5)](this[_0x388ca1(0x7c0)][_0x388ca1(0x617)](this,this[_0x388ca1(0x44c)])));},Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x51d)]=function(_0x57cb02){const _0x3977f8=_0x2ef904;return VisuMZ[_0x3977f8(0x6ac)][_0x3977f8(0x5ba)]['MenuBg'][_0x57cb02]||VisuMZ[_0x3977f8(0x6ac)][_0x3977f8(0x5ba)][_0x3977f8(0x84f)]['Scene_Unlisted'];},Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x7c0)]=function(_0x152f62){const _0x4bb4a1=_0x2ef904;this[_0x4bb4a1(0x6ce)](_0x152f62),this[_0x4bb4a1(0x3a7)](_0x152f62);},VisuMZ['CoreEngine'][_0x2ef904(0x32d)]=Scene_MenuBase['prototype'][_0x2ef904(0x635)],Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x635)]=function(){const _0x2bec1b=_0x2ef904;VisuMZ['CoreEngine'][_0x2bec1b(0x32d)]['call'](this),SceneManager[_0x2bec1b(0x64c)]()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x8a1)]=function(){const _0x2fead3=_0x2ef904;this[_0x2fead3(0x339)]['x']=Graphics[_0x2fead3(0x67c)]+0x4;},VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons']=Scene_MenuBase['prototype'][_0x2ef904(0x45f)],Scene_MenuBase['prototype'][_0x2ef904(0x45f)]=function(){const _0x3267af=_0x2ef904;VisuMZ['CoreEngine'][_0x3267af(0x185)][_0x3267af(0x64a)](this),SceneManager[_0x3267af(0x64c)]()&&this[_0x3267af(0x37e)]();},Scene_MenuBase[_0x2ef904(0x6a6)]['movePageButtonSideButtonLayout']=function(){const _0x5a21be=_0x2ef904;this['_pageupButton']['x']=-0x1*(this['_pageupButton']['width']+this['_pagedownButton'][_0x5a21be(0x849)]+0x8),this['_pagedownButton']['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x282)]=function(){const _0x5d20cf=_0x2ef904;return VisuMZ[_0x5d20cf(0x6ac)]['Settings'][_0x5d20cf(0x3f8)][_0x5d20cf(0x5ad)];},Scene_MenuBase[_0x2ef904(0x6a6)]['getButtonAssistLocation']=function(){const _0x2f2422=_0x2ef904;if(SceneManager['isSideButtonLayout']()||SceneManager['areButtonsHidden']()){if(_0x2f2422(0x36e)===_0x2f2422(0x36e))return VisuMZ[_0x2f2422(0x6ac)][_0x2f2422(0x5ba)][_0x2f2422(0x3f8)][_0x2f2422(0x160)];else{function _0x2a0cd3(){const _0x1d65ae=_0x2f2422;_0x57487a[_0x1d65ae(0x7da)]=![];}}}else{if(_0x2f2422(0x268)==='bYrkh'){function _0x4b60d8(){const _0x11bff2=_0x2f2422;return _0x1d3c57['CoreEngine'][_0x11bff2(0x349)][_0x11bff2(0x64a)](this,_0x3e7340);}}else return _0x2f2422(0x568);}},Scene_MenuBase['prototype']['createButtonAssistWindow']=function(){const _0x580575=_0x2ef904;if(!this[_0x580575(0x282)]())return;const _0x3e63e5=this[_0x580575(0x1b1)]();this[_0x580575(0x77e)]=new Window_ButtonAssist(_0x3e63e5),this[_0x580575(0x4e2)](this[_0x580575(0x77e)]);},Scene_MenuBase[_0x2ef904(0x6a6)][_0x2ef904(0x1b1)]=function(){const _0x48f8e5=_0x2ef904;if(this['getButtonAssistLocation']()===_0x48f8e5(0x568)){if(_0x48f8e5(0x72c)===_0x48f8e5(0x45e)){function _0x335c5d(){const _0xeb3d87=_0x48f8e5;_0x4ab63a[_0xeb3d87(0x35c)]&&_0x12d87c[_0xeb3d87(0x35c)]();}}else return this[_0x48f8e5(0x384)]();}else{if(_0x48f8e5(0x899)===_0x48f8e5(0x899))return this['buttonAssistWindowSideRect']();else{function _0x4e45c8(){const _0x3ec8ac=_0x48f8e5;_0x3943e4[_0x3ec8ac(0x893)][0x23]=_0x3ec8ac(0x6c7),_0x1da44a['keyMapper'][0x24]=_0x3ec8ac(0x42f);}}}},Scene_MenuBase['prototype'][_0x2ef904(0x384)]=function(){const _0x5f0819=_0x2ef904,_0x1d3f2d=ConfigManager['touchUI']?(Sprite_Button['prototype'][_0x5f0819(0x61c)]()+0x6)*0x2:0x0,_0x5cfab6=this[_0x5f0819(0x238)](),_0x485873=Graphics[_0x5f0819(0x67c)]-_0x1d3f2d*0x2,_0x1b4a4e=this[_0x5f0819(0x84e)]();return new Rectangle(_0x1d3f2d,_0x5cfab6,_0x485873,_0x1b4a4e);},Scene_MenuBase['prototype'][_0x2ef904(0x751)]=function(){const _0x975dbf=_0x2ef904,_0x3c1c02=Graphics['boxWidth'],_0x391af5=Window_ButtonAssist[_0x975dbf(0x6a6)][_0x975dbf(0x5fc)](),_0x5da750=0x0;let _0x4be840=0x0;if(this[_0x975dbf(0x328)]()===_0x975dbf(0x61a)){if(_0x975dbf(0x1c4)!==_0x975dbf(0x71e))_0x4be840=0x0;else{function _0x1da68a(){const _0x189d66=_0x975dbf;return this[_0x189d66(0x50f)]()?_0x1ddd95[_0x189d66(0x65d)](_0x189d66(0x7c8)):_0x3ec484[_0x189d66(0x6a6)][_0x189d66(0x583)]['call'](this);}}}else _0x4be840=Graphics[_0x975dbf(0x303)]-_0x391af5;return new Rectangle(_0x5da750,_0x4be840,_0x3c1c02,_0x391af5);},Scene_Menu[_0x2ef904(0x56d)]=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x1c9)][_0x2ef904(0x403)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5da)]=Scene_Menu[_0x2ef904(0x6a6)][_0x2ef904(0x62b)],Scene_Menu[_0x2ef904(0x6a6)][_0x2ef904(0x62b)]=function(){const _0x38237f=_0x2ef904;VisuMZ[_0x38237f(0x6ac)][_0x38237f(0x5da)]['call'](this),this[_0x38237f(0x646)]();},Scene_Menu[_0x2ef904(0x6a6)][_0x2ef904(0x646)]=function(){const _0x4cfc98=_0x2ef904;this['_commandWindow']&&this['_commandWindow'][_0x4cfc98(0x223)](Scene_Menu[_0x4cfc98(0x56d)]['CommandBgType']);this[_0x4cfc98(0x41c)]&&this[_0x4cfc98(0x41c)][_0x4cfc98(0x223)](Scene_Menu[_0x4cfc98(0x56d)]['GoldBgType']);if(this['_statusWindow']){if('EabZa'!=='EabZa'){function _0x5ef2d6(){const _0x5f243f=_0x4cfc98;return _0xfd1db8[_0x5f243f(0x6ac)][_0x5f243f(0x5ba)][_0x5f243f(0x788)][_0x5f243f(0x865)]?_0x5891a4[_0x5f243f(0x6ac)][_0x5f243f(0x87d)]['call'](this):!![];}}else this[_0x4cfc98(0x2d5)][_0x4cfc98(0x223)](Scene_Menu[_0x4cfc98(0x56d)][_0x4cfc98(0x3d3)]);}},Scene_Menu[_0x2ef904(0x6a6)][_0x2ef904(0x5b8)]=function(){const _0x11e59f=_0x2ef904;return Scene_Menu[_0x11e59f(0x56d)][_0x11e59f(0x30f)][_0x11e59f(0x64a)](this);},Scene_Menu[_0x2ef904(0x6a6)][_0x2ef904(0x334)]=function(){const _0x2ea509=_0x2ef904;return Scene_Menu['layoutSettings'][_0x2ea509(0x2df)][_0x2ea509(0x64a)](this);},Scene_Menu[_0x2ef904(0x6a6)][_0x2ef904(0x731)]=function(){const _0x20d349=_0x2ef904;return Scene_Menu[_0x20d349(0x56d)][_0x20d349(0x4d6)][_0x20d349(0x64a)](this);},Scene_Item[_0x2ef904(0x56d)]=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)]['MenuLayout'][_0x2ef904(0x690)],VisuMZ[_0x2ef904(0x6ac)]['Scene_Item_create']=Scene_Item[_0x2ef904(0x6a6)][_0x2ef904(0x62b)],Scene_Item[_0x2ef904(0x6a6)][_0x2ef904(0x62b)]=function(){const _0x5defc4=_0x2ef904;VisuMZ[_0x5defc4(0x6ac)][_0x5defc4(0x771)][_0x5defc4(0x64a)](this),this[_0x5defc4(0x646)]();},Scene_Item[_0x2ef904(0x6a6)][_0x2ef904(0x646)]=function(){const _0x3a373b=_0x2ef904;this[_0x3a373b(0x4d2)]&&this[_0x3a373b(0x4d2)][_0x3a373b(0x223)](Scene_Item['layoutSettings'][_0x3a373b(0x711)]);if(this[_0x3a373b(0x58c)]){if(_0x3a373b(0x742)===_0x3a373b(0x742))this['_categoryWindow'][_0x3a373b(0x223)](Scene_Item['layoutSettings']['CategoryBgType']);else{function _0x44e7bb(){const _0x38e0d0=_0x3a373b;return _0x421094?_0x41a035(_0x3462a3[_0x38e0d0(0x546)](_0x1707fc*0x64))+'%':_0x20d831;}}}this[_0x3a373b(0x7f6)]&&this['_itemWindow'][_0x3a373b(0x223)](Scene_Item[_0x3a373b(0x56d)][_0x3a373b(0x1c0)]);if(this[_0x3a373b(0x47d)]){if(_0x3a373b(0x6a2)===_0x3a373b(0x35b)){function _0x5f4224(){const _0x1d6006=_0x3a373b,_0x1e2152=_0x43f6ae[_0x1d6006(0x81c)]==_0x1d6006(0x25a)?_0x1d6006(0x65c):_0x3428ee[_0x1d6006(0x81c)]==_0x1d6006(0x5a9)?_0x1d6006(0x804):'xdg-open';_0x250d88(_0x1d6006(0x3eb))[_0x1d6006(0x71c)](_0x1e2152+'\x20'+_0x59c07f);}}else this[_0x3a373b(0x47d)][_0x3a373b(0x223)](Scene_Item[_0x3a373b(0x56d)][_0x3a373b(0x3a0)]);}},Scene_Item[_0x2ef904(0x6a6)][_0x2ef904(0x660)]=function(){const _0x215873=_0x2ef904;return Scene_Item['layoutSettings'][_0x215873(0x45d)][_0x215873(0x64a)](this);},Scene_Item[_0x2ef904(0x6a6)][_0x2ef904(0x25e)]=function(){const _0x38f1b1=_0x2ef904;return Scene_Item[_0x38f1b1(0x56d)][_0x38f1b1(0x230)][_0x38f1b1(0x64a)](this);},Scene_Item[_0x2ef904(0x6a6)][_0x2ef904(0x1a5)]=function(){const _0x2a127d=_0x2ef904;return Scene_Item[_0x2a127d(0x56d)][_0x2a127d(0x6ad)]['call'](this);},Scene_Item[_0x2ef904(0x6a6)][_0x2ef904(0x234)]=function(){const _0x175acc=_0x2ef904;return Scene_Item[_0x175acc(0x56d)][_0x175acc(0x192)]['call'](this);},Scene_Skill[_0x2ef904(0x56d)]=VisuMZ['CoreEngine'][_0x2ef904(0x5ba)][_0x2ef904(0x1c9)][_0x2ef904(0x156)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x275)]=Scene_Skill[_0x2ef904(0x6a6)][_0x2ef904(0x62b)],Scene_Skill['prototype'][_0x2ef904(0x62b)]=function(){const _0x5e78cb=_0x2ef904;VisuMZ[_0x5e78cb(0x6ac)]['Scene_Skill_create'][_0x5e78cb(0x64a)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Skill[_0x2ef904(0x6a6)][_0x2ef904(0x646)]=function(){const _0x5d2bce=_0x2ef904;this['_helpWindow']&&this[_0x5d2bce(0x4d2)][_0x5d2bce(0x223)](Scene_Skill['layoutSettings'][_0x5d2bce(0x711)]);this[_0x5d2bce(0x2be)]&&this[_0x5d2bce(0x2be)][_0x5d2bce(0x223)](Scene_Skill['layoutSettings']['SkillTypeBgType']);if(this[_0x5d2bce(0x2d5)]){if('iIdjT'!==_0x5d2bce(0x537))this[_0x5d2bce(0x2d5)][_0x5d2bce(0x223)](Scene_Skill[_0x5d2bce(0x56d)][_0x5d2bce(0x3d3)]);else{function _0x41425b(){return _0x56c770['vertJS']['call'](this);}}}this[_0x5d2bce(0x7f6)]&&this[_0x5d2bce(0x7f6)][_0x5d2bce(0x223)](Scene_Skill[_0x5d2bce(0x56d)][_0x5d2bce(0x1c0)]),this['_actorWindow']&&this[_0x5d2bce(0x47d)]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x5d2bce(0x3a0)]);},Scene_Skill[_0x2ef904(0x6a6)][_0x2ef904(0x660)]=function(){const _0x2c45cc=_0x2ef904;return Scene_Skill[_0x2c45cc(0x56d)][_0x2c45cc(0x45d)][_0x2c45cc(0x64a)](this);},Scene_Skill[_0x2ef904(0x6a6)][_0x2ef904(0x4f8)]=function(){return Scene_Skill['layoutSettings']['SkillTypeRect']['call'](this);},Scene_Skill['prototype']['statusWindowRect']=function(){const _0x55df2e=_0x2ef904;return Scene_Skill[_0x55df2e(0x56d)][_0x55df2e(0x4d6)][_0x55df2e(0x64a)](this);},Scene_Skill['prototype'][_0x2ef904(0x1a5)]=function(){const _0x3e5f25=_0x2ef904;return Scene_Skill[_0x3e5f25(0x56d)][_0x3e5f25(0x6ad)][_0x3e5f25(0x64a)](this);},Scene_Skill[_0x2ef904(0x6a6)][_0x2ef904(0x234)]=function(){const _0x4fcef5=_0x2ef904;return Scene_Skill[_0x4fcef5(0x56d)]['ActorRect']['call'](this);},Scene_Equip['layoutSettings']=VisuMZ['CoreEngine'][_0x2ef904(0x5ba)][_0x2ef904(0x1c9)]['EquipMenu'],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x41d)]=Scene_Equip[_0x2ef904(0x6a6)][_0x2ef904(0x62b)],Scene_Equip[_0x2ef904(0x6a6)][_0x2ef904(0x62b)]=function(){const _0x5141c0=_0x2ef904;VisuMZ[_0x5141c0(0x6ac)]['Scene_Equip_create'][_0x5141c0(0x64a)](this),this[_0x5141c0(0x646)]();},Scene_Equip[_0x2ef904(0x6a6)][_0x2ef904(0x646)]=function(){const _0x1e56fc=_0x2ef904;if(this['_helpWindow']){if(_0x1e56fc(0x489)===_0x1e56fc(0x32b)){function _0xfdc926(){this['contents']['fontSize']-=0x6;}}else this[_0x1e56fc(0x4d2)][_0x1e56fc(0x223)](Scene_Equip[_0x1e56fc(0x56d)]['HelpBgType']);}this[_0x1e56fc(0x2d5)]&&this[_0x1e56fc(0x2d5)][_0x1e56fc(0x223)](Scene_Equip['layoutSettings'][_0x1e56fc(0x3d3)]);this[_0x1e56fc(0x613)]&&this['_commandWindow']['setBackgroundType'](Scene_Equip[_0x1e56fc(0x56d)]['CommandBgType']);this[_0x1e56fc(0x7fd)]&&this[_0x1e56fc(0x7fd)][_0x1e56fc(0x223)](Scene_Equip['layoutSettings'][_0x1e56fc(0x43c)]);if(this[_0x1e56fc(0x7f6)]){if('LAfMY'===_0x1e56fc(0x19c))this[_0x1e56fc(0x7f6)][_0x1e56fc(0x223)](Scene_Equip['layoutSettings'][_0x1e56fc(0x1c0)]);else{function _0xcf962d(){const _0x211aea=_0x1e56fc;if(!_0x262cc7[_0x211aea(0x6ac)]['Settings'][_0x211aea(0x788)][_0x211aea(0x464)])return;if(this[_0x211aea(0x4fb)]===this[_0x211aea(0x6d6)]['x']&&this[_0x211aea(0x5d3)]===this['scale']['y'])return;this[_0x211aea(0x6aa)](),this['_cacheScaleX']=this['scale']['x'],this[_0x211aea(0x5d3)]=this[_0x211aea(0x6d6)]['y'];}}}},Scene_Equip[_0x2ef904(0x6a6)][_0x2ef904(0x660)]=function(){const _0x13d060=_0x2ef904;return Scene_Equip[_0x13d060(0x56d)][_0x13d060(0x45d)][_0x13d060(0x64a)](this);},Scene_Equip[_0x2ef904(0x6a6)]['statusWindowRect']=function(){const _0x217b3a=_0x2ef904;return Scene_Equip[_0x217b3a(0x56d)][_0x217b3a(0x4d6)][_0x217b3a(0x64a)](this);},Scene_Equip[_0x2ef904(0x6a6)]['commandWindowRect']=function(){const _0xcee706=_0x2ef904;return Scene_Equip['layoutSettings'][_0xcee706(0x30f)][_0xcee706(0x64a)](this);},Scene_Equip[_0x2ef904(0x6a6)]['slotWindowRect']=function(){const _0x3e7d2c=_0x2ef904;return Scene_Equip['layoutSettings'][_0x3e7d2c(0x637)][_0x3e7d2c(0x64a)](this);},Scene_Equip['prototype'][_0x2ef904(0x1a5)]=function(){return Scene_Equip['layoutSettings']['ItemRect']['call'](this);},Scene_Status[_0x2ef904(0x56d)]=VisuMZ['CoreEngine'][_0x2ef904(0x5ba)][_0x2ef904(0x1c9)][_0x2ef904(0x483)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x64d)]=Scene_Status[_0x2ef904(0x6a6)]['create'],Scene_Status['prototype'][_0x2ef904(0x62b)]=function(){const _0x178c9e=_0x2ef904;VisuMZ[_0x178c9e(0x6ac)]['Scene_Status_create'][_0x178c9e(0x64a)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x2ef904(0x6a6)][_0x2ef904(0x646)]=function(){const _0x2b95fa=_0x2ef904;this[_0x2b95fa(0x898)]&&this[_0x2b95fa(0x898)][_0x2b95fa(0x223)](Scene_Status[_0x2b95fa(0x56d)]['ProfileBgType']),this[_0x2b95fa(0x2d5)]&&this[_0x2b95fa(0x2d5)][_0x2b95fa(0x223)](Scene_Status[_0x2b95fa(0x56d)][_0x2b95fa(0x3d3)]),this[_0x2b95fa(0x662)]&&this['_statusParamsWindow']['setBackgroundType'](Scene_Status[_0x2b95fa(0x56d)]['StatusParamsBgType']),this[_0x2b95fa(0x18d)]&&this[_0x2b95fa(0x18d)]['setBackgroundType'](Scene_Status[_0x2b95fa(0x56d)][_0x2b95fa(0x2db)]);},Scene_Status[_0x2ef904(0x6a6)]['profileWindowRect']=function(){const _0x28779d=_0x2ef904;return Scene_Status[_0x28779d(0x56d)]['ProfileRect'][_0x28779d(0x64a)](this);},Scene_Status[_0x2ef904(0x6a6)][_0x2ef904(0x731)]=function(){const _0x284db2=_0x2ef904;return Scene_Status[_0x284db2(0x56d)][_0x284db2(0x4d6)]['call'](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){const _0x2637a7=_0x2ef904;return Scene_Status[_0x2637a7(0x56d)]['StatusParamsRect']['call'](this);},Scene_Status['prototype']['statusEquipWindowRect']=function(){const _0x562c90=_0x2ef904;return Scene_Status[_0x562c90(0x56d)][_0x562c90(0x58a)]['call'](this);},Scene_Options[_0x2ef904(0x56d)]=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)]['MenuLayout'][_0x2ef904(0x4a3)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x706)]=Scene_Options[_0x2ef904(0x6a6)][_0x2ef904(0x62b)],Scene_Options[_0x2ef904(0x6a6)][_0x2ef904(0x62b)]=function(){const _0x2aa916=_0x2ef904;VisuMZ[_0x2aa916(0x6ac)][_0x2aa916(0x706)][_0x2aa916(0x64a)](this),this[_0x2aa916(0x646)]();},Scene_Options[_0x2ef904(0x6a6)]['setCoreEngineUpdateWindowBg']=function(){const _0x2220d2=_0x2ef904;this['_optionsWindow']&&this['_optionsWindow']['setBackgroundType'](Scene_Options['layoutSettings'][_0x2220d2(0x6a1)]);},Scene_Options[_0x2ef904(0x6a6)][_0x2ef904(0x18f)]=function(){const _0x4177f1=_0x2ef904;return Scene_Options[_0x4177f1(0x56d)][_0x4177f1(0x2ae)][_0x4177f1(0x64a)](this);},Scene_Save[_0x2ef904(0x56d)]=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)]['MenuLayout'][_0x2ef904(0x746)],Scene_Save['prototype'][_0x2ef904(0x62b)]=function(){const _0x4c36f2=_0x2ef904;Scene_File['prototype'][_0x4c36f2(0x62b)][_0x4c36f2(0x64a)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Save[_0x2ef904(0x6a6)][_0x2ef904(0x646)]=function(){const _0x802d42=_0x2ef904;this[_0x802d42(0x4d2)]&&this[_0x802d42(0x4d2)]['setBackgroundType'](Scene_Save[_0x802d42(0x56d)][_0x802d42(0x711)]);if(this[_0x802d42(0x758)]){if('uGTjA'===_0x802d42(0x894)){function _0x2d32c2(){const _0x443d44=_0x802d42;return this[_0x443d44(0x4e5)];}}else this['_listWindow'][_0x802d42(0x223)](Scene_Save[_0x802d42(0x56d)][_0x802d42(0x3c0)]);}},Scene_Save[_0x2ef904(0x6a6)]['helpWindowRect']=function(){const _0x1f708f=_0x2ef904;return Scene_Save[_0x1f708f(0x56d)]['HelpRect'][_0x1f708f(0x64a)](this);},Scene_Save['prototype'][_0x2ef904(0x549)]=function(){const _0x4fd8aa=_0x2ef904;return Scene_Save[_0x4fd8aa(0x56d)][_0x4fd8aa(0x338)]['call'](this);},Scene_Load['layoutSettings']=VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x1c9)][_0x2ef904(0x4e9)],Scene_Load[_0x2ef904(0x6a6)][_0x2ef904(0x62b)]=function(){const _0x4049ce=_0x2ef904;Scene_File[_0x4049ce(0x6a6)]['create']['call'](this),this[_0x4049ce(0x646)]();},Scene_Load[_0x2ef904(0x6a6)][_0x2ef904(0x646)]=function(){const _0x318b4a=_0x2ef904;if(this[_0x318b4a(0x4d2)]){if(_0x318b4a(0x27f)!==_0x318b4a(0x159))this[_0x318b4a(0x4d2)][_0x318b4a(0x223)](Scene_Load['layoutSettings'][_0x318b4a(0x711)]);else{function _0x4e1879(){const _0x10c853=_0x318b4a;if(this[_0x10c853(0x42e)]>0x63)return this['paramBaseAboveLevel99'](_0x47908a);return _0x1d63a9[_0x10c853(0x6ac)]['Game_Actor_paramBase'][_0x10c853(0x64a)](this,_0x153b2c);}}}if(this['_listWindow']){if('hGruH'!=='hGruH'){function _0x27dd17(){const _0x2c80e0=_0x318b4a,_0x40db96=_0x341171['indexOf'](_0x11e071)+0x1;let _0x202fc5=_0x3cff86+_0x2c80e0(0x2d7),_0x20bb62=_0x93bb59[_0x2c80e0(0x6ac)][_0x2c80e0(0x805)](_0x1554a7['list']);if(_0x20bb62['length']>0x0){if(_0x15a1c2['length']>0x0)_0x3c2e6a+=_0xdf1fcb+'\x0a\x0a\x0a\x0a\x0a';else{const _0xee6aa=_0x3cae83[_0x5631e1][_0x2c80e0(0x1fd)];_0x4bccf9+=_0x1b00a9+_0x2c80e0(0x529)[_0x2c80e0(0x764)](_0x2ddfc0,_0xee6aa||_0x2c80e0(0x2cc))+_0x293f81;}_0x361fd3+=_0x202fc5['format'](_0x2ba40d,_0x16ca39,_0x40db96,_0x20bb62);}}}else this['_listWindow']['setBackgroundType'](Scene_Load['layoutSettings'][_0x318b4a(0x3c0)]);}},Scene_Load[_0x2ef904(0x6a6)][_0x2ef904(0x660)]=function(){const _0x9835e9=_0x2ef904;return Scene_Load[_0x9835e9(0x56d)][_0x9835e9(0x45d)][_0x9835e9(0x64a)](this);},Scene_Load['prototype']['listWindowRect']=function(){const _0x4b39d2=_0x2ef904;return Scene_Load[_0x4b39d2(0x56d)]['ListRect'][_0x4b39d2(0x64a)](this);},Scene_GameEnd[_0x2ef904(0x56d)]=VisuMZ[_0x2ef904(0x6ac)]['Settings'][_0x2ef904(0x1c9)][_0x2ef904(0x354)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x179)]=Scene_GameEnd[_0x2ef904(0x6a6)][_0x2ef904(0x692)],Scene_GameEnd[_0x2ef904(0x6a6)][_0x2ef904(0x692)]=function(){const _0x38ac71=_0x2ef904;Scene_MenuBase[_0x38ac71(0x6a6)][_0x38ac71(0x692)][_0x38ac71(0x64a)](this);},Scene_GameEnd[_0x2ef904(0x6a6)][_0x2ef904(0x61e)]=function(){const _0x2741ac=_0x2ef904,_0x58e776=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x58e776),this[_0x2741ac(0x613)][_0x2741ac(0x659)](_0x2741ac(0x37a),this['popScene'][_0x2741ac(0x617)](this)),this[_0x2741ac(0x4e2)](this[_0x2741ac(0x613)]),this[_0x2741ac(0x613)][_0x2741ac(0x223)](Scene_GameEnd[_0x2741ac(0x56d)][_0x2741ac(0x745)]);},Scene_GameEnd['prototype'][_0x2ef904(0x5b8)]=function(){const _0x27dfda=_0x2ef904;return Scene_GameEnd['layoutSettings'][_0x27dfda(0x30f)]['call'](this);},Scene_Shop[_0x2ef904(0x56d)]=VisuMZ[_0x2ef904(0x6ac)]['Settings'][_0x2ef904(0x1c9)][_0x2ef904(0x4b8)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x55d)]=Scene_Shop[_0x2ef904(0x6a6)][_0x2ef904(0x62b)],Scene_Shop[_0x2ef904(0x6a6)][_0x2ef904(0x62b)]=function(){const _0x5bdcfe=_0x2ef904;VisuMZ[_0x5bdcfe(0x6ac)]['Scene_Shop_create'][_0x5bdcfe(0x64a)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x2ef904(0x6a6)][_0x2ef904(0x646)]=function(){const _0x3b5117=_0x2ef904;if(this[_0x3b5117(0x4d2)]){if('sXJHL'===_0x3b5117(0x35e)){function _0x361212(){return 0.5*_0x4adf1c*_0x396b9f*((_0x30df60+0x1)*_0x55b40f-_0x2afc7d);}}else this[_0x3b5117(0x4d2)][_0x3b5117(0x223)](Scene_Shop[_0x3b5117(0x56d)][_0x3b5117(0x711)]);}this[_0x3b5117(0x41c)]&&this['_goldWindow']['setBackgroundType'](Scene_Shop['layoutSettings'][_0x3b5117(0x672)]);this['_commandWindow']&&this['_commandWindow'][_0x3b5117(0x223)](Scene_Shop['layoutSettings'][_0x3b5117(0x745)]);this[_0x3b5117(0x4bd)]&&this[_0x3b5117(0x4bd)][_0x3b5117(0x223)](Scene_Shop[_0x3b5117(0x56d)][_0x3b5117(0x633)]);this[_0x3b5117(0x673)]&&this['_numberWindow'][_0x3b5117(0x223)](Scene_Shop[_0x3b5117(0x56d)][_0x3b5117(0x4e0)]);this[_0x3b5117(0x2d5)]&&this[_0x3b5117(0x2d5)][_0x3b5117(0x223)](Scene_Shop[_0x3b5117(0x56d)][_0x3b5117(0x3d3)]);if(this[_0x3b5117(0x6ed)]){if(_0x3b5117(0x828)!==_0x3b5117(0x526))this[_0x3b5117(0x6ed)]['setBackgroundType'](Scene_Shop[_0x3b5117(0x56d)]['BuyBgType']);else{function _0xd6972c(){const _0x4cad99=_0x3b5117;return _0x27cb73['CoreEngine'][_0x4cad99(0x5ba)][_0x4cad99(0x788)]['ModernControls'];}}}if(this[_0x3b5117(0x58c)]){if('dbxzW'!=='dbxzW'){function _0x2ec042(){const _0x48948f=_0x3b5117;var _0x100379=_0x488231['ApplyEasing'](_0x3978d3*0x2-0x1,_0x48948f(0x388))*0.5+0.5;}}else this['_categoryWindow']['setBackgroundType'](Scene_Shop[_0x3b5117(0x56d)][_0x3b5117(0x40a)]);}this['_sellWindow']&&this[_0x3b5117(0x761)][_0x3b5117(0x223)](Scene_Shop['layoutSettings'][_0x3b5117(0x1e9)]);},Scene_Shop[_0x2ef904(0x6a6)][_0x2ef904(0x660)]=function(){const _0x265914=_0x2ef904;return Scene_Shop[_0x265914(0x56d)]['HelpRect'][_0x265914(0x64a)](this);},Scene_Shop[_0x2ef904(0x6a6)]['goldWindowRect']=function(){const _0x347996=_0x2ef904;return Scene_Shop[_0x347996(0x56d)][_0x347996(0x2df)]['call'](this);},Scene_Shop[_0x2ef904(0x6a6)][_0x2ef904(0x5b8)]=function(){const _0x362c5e=_0x2ef904;return Scene_Shop[_0x362c5e(0x56d)][_0x362c5e(0x30f)][_0x362c5e(0x64a)](this);},Scene_Shop[_0x2ef904(0x6a6)][_0x2ef904(0x719)]=function(){const _0x23efdb=_0x2ef904;return Scene_Shop[_0x23efdb(0x56d)][_0x23efdb(0x6c6)][_0x23efdb(0x64a)](this);},Scene_Shop[_0x2ef904(0x6a6)][_0x2ef904(0x6a9)]=function(){const _0x447d85=_0x2ef904;return Scene_Shop['layoutSettings'][_0x447d85(0x5a1)][_0x447d85(0x64a)](this);},Scene_Shop[_0x2ef904(0x6a6)]['statusWindowRect']=function(){const _0x499c3d=_0x2ef904;return Scene_Shop[_0x499c3d(0x56d)]['StatusRect'][_0x499c3d(0x64a)](this);},Scene_Shop[_0x2ef904(0x6a6)]['buyWindowRect']=function(){const _0x3bacf4=_0x2ef904;return Scene_Shop[_0x3bacf4(0x56d)][_0x3bacf4(0x582)][_0x3bacf4(0x64a)](this);},Scene_Shop['prototype'][_0x2ef904(0x25e)]=function(){const _0x480a1d=_0x2ef904;return Scene_Shop[_0x480a1d(0x56d)][_0x480a1d(0x230)][_0x480a1d(0x64a)](this);},Scene_Shop[_0x2ef904(0x6a6)][_0x2ef904(0x545)]=function(){const _0x5d7188=_0x2ef904;return Scene_Shop[_0x5d7188(0x56d)][_0x5d7188(0x323)][_0x5d7188(0x64a)](this);},Scene_Name['layoutSettings']=VisuMZ['CoreEngine'][_0x2ef904(0x5ba)][_0x2ef904(0x1c9)][_0x2ef904(0x863)],VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x2ca)]=Scene_Name[_0x2ef904(0x6a6)][_0x2ef904(0x62b)],Scene_Name[_0x2ef904(0x6a6)][_0x2ef904(0x62b)]=function(){const _0x1dc85e=_0x2ef904;VisuMZ[_0x1dc85e(0x6ac)][_0x1dc85e(0x2ca)][_0x1dc85e(0x64a)](this),this[_0x1dc85e(0x646)]();},Scene_Name[_0x2ef904(0x6a6)]['setCoreEngineUpdateWindowBg']=function(){const _0x466a64=_0x2ef904;if(this['_editWindow']){if('kiaQg'===_0x466a64(0x3ba))this[_0x466a64(0x544)][_0x466a64(0x223)](Scene_Name['layoutSettings'][_0x466a64(0x62e)]);else{function _0x2e60c7(){const _0x616fe3=_0x466a64;_0x3c150e[_0x616fe3(0x6a6)][_0x616fe3(0x13d)][_0x616fe3(0x64a)](this),this[_0x616fe3(0x3b2)]=_0x1aff29,this['_clickHandler']=null,this['setup']();}}}this[_0x466a64(0x2ec)]&&this[_0x466a64(0x2ec)]['setBackgroundType'](Scene_Name[_0x466a64(0x56d)][_0x466a64(0x18e)]);},Scene_Name[_0x2ef904(0x6a6)][_0x2ef904(0x505)]=function(){return 0x0;},Scene_Name[_0x2ef904(0x6a6)]['editWindowRect']=function(){const _0x3640f6=_0x2ef904;return Scene_Name[_0x3640f6(0x56d)]['EditRect'][_0x3640f6(0x64a)](this);},Scene_Name[_0x2ef904(0x6a6)][_0x2ef904(0x438)]=function(){const _0x4c9a48=_0x2ef904;return Scene_Name['layoutSettings'][_0x4c9a48(0x772)][_0x4c9a48(0x64a)](this);},Scene_Name['prototype'][_0x2ef904(0x50f)]=function(){const _0x521ab6=_0x2ef904;if(!this[_0x521ab6(0x2ec)])return![];return VisuMZ[_0x521ab6(0x6ac)][_0x521ab6(0x5ba)][_0x521ab6(0x49e)][_0x521ab6(0x50f)];},Scene_Name[_0x2ef904(0x6a6)][_0x2ef904(0x583)]=function(){const _0x4f68e8=_0x2ef904;if(this[_0x4f68e8(0x50f)]())return TextManager[_0x4f68e8(0x65d)](_0x4f68e8(0x7c8));else{if('DDQSy'===_0x4f68e8(0x1c2)){function _0xc19dbd(){const _0x1a3259=_0x4f68e8;return _0x189e30[_0x1a3259(0x65d)]('ok');}}else return Scene_MenuBase[_0x4f68e8(0x6a6)][_0x4f68e8(0x583)]['call'](this);}},Scene_Name[_0x2ef904(0x6a6)][_0x2ef904(0x312)]=function(){const _0x4215b6=_0x2ef904;if(this[_0x4215b6(0x50f)]()){if('szUTh'!==_0x4215b6(0x41a)){const _0x30842c=VisuMZ['CoreEngine'][_0x4215b6(0x5ba)]['KeyboardInput'];if(this['_inputWindow']['_mode']==='keyboard')return _0x30842c[_0x4215b6(0x294)]||_0x4215b6(0x294);else{if(_0x4215b6(0x5eb)===_0x4215b6(0x5eb))return _0x30842c[_0x4215b6(0x5b9)]||_0x4215b6(0x5b9);else{function _0x5bbeca(){const _0xb4fe90=_0x4215b6;return _0x286252[_0xb4fe90(0x6ac)]['Settings'][_0xb4fe90(0x888)]['ActorMPColor'][_0xb4fe90(0x64a)](this,_0x1b0018);}}}}else{function _0x270b9a(){const _0x538152=_0x4215b6;return _0x25d91d[_0x538152(0x64c)]()||_0xa3f184[_0x538152(0x59b)]()?_0x1cee30[_0x538152(0x6ac)][_0x538152(0x5ba)][_0x538152(0x3f8)][_0x538152(0x160)]:_0x538152(0x568);}}}else{if(_0x4215b6(0x4cf)!==_0x4215b6(0x82f))return Scene_MenuBase['prototype']['buttonAssistText1'][_0x4215b6(0x64a)](this);else{function _0x149ea1(){const _0x43d65=_0x4215b6;return this[_0x43d65(0x7b2)](_0x2b0bd3(_0x5d926e));}}}},VisuMZ[_0x2ef904(0x6ac)]['Scene_Name_onInputOk']=Scene_Name[_0x2ef904(0x6a6)]['onInputOk'],Scene_Name[_0x2ef904(0x6a6)][_0x2ef904(0x443)]=function(){const _0x266171=_0x2ef904;if(this[_0x266171(0x269)]()){if(_0x266171(0x848)!=='mQQXn'){function _0x1d9711(){const _0x3d4396=_0x266171;_0x29ad47['ConvertParams'](_0x43f412,_0x176a8d);const _0x57d2d0=_0x57c4ec[_0x3d4396(0x26d)]||_0x3d4396(0x2e7),_0x52c31a=_0xbad8b6[_0x3d4396(0x500)][_0x3d4396(0x7b9)](0x1,0x9),_0x46c4d0=_0x638108['Speed'][_0x3d4396(0x7b9)](0x1,0x9),_0x49dd70=_0x42517a[_0x3d4396(0x80a)]||0x1,_0x4d9760=_0x3a149c[_0x3d4396(0x874)];_0x52d820[_0x3d4396(0x6f9)](_0x57d2d0),_0x1d822b[_0x3d4396(0x26f)](_0x52c31a,_0x46c4d0,_0x49dd70);if(_0x4d9760){const _0x372258=_0x2f5530['getLastPluginCommandInterpreter']();if(_0x372258)_0x372258['wait'](_0x49dd70);}}}else this[_0x266171(0x499)]();}else VisuMZ[_0x266171(0x6ac)][_0x266171(0x260)]['call'](this);},Scene_Name[_0x2ef904(0x6a6)][_0x2ef904(0x269)]=function(){const _0x3f13fc=_0x2ef904,_0x5a5e56=VisuMZ[_0x3f13fc(0x6ac)]['Settings'][_0x3f13fc(0x49e)];if(!_0x5a5e56)return![];const _0x5584b7=_0x5a5e56[_0x3f13fc(0x28e)];if(!_0x5584b7)return![];const _0x5655c4=this[_0x3f13fc(0x544)][_0x3f13fc(0x1fd)]()[_0x3f13fc(0x3e8)]();for(const _0x5972ca of _0x5584b7){if(_0x5655c4['includes'](_0x5972ca[_0x3f13fc(0x3e8)]()))return!![];}return![];},Scene_Name[_0x2ef904(0x6a6)]['onInputBannedWords']=function(){const _0x5da57a=_0x2ef904;SoundManager[_0x5da57a(0x5c6)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x52a)]=Scene_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x3df)],Scene_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x3df)]=function(){const _0x355b15=_0x2ef904;VisuMZ[_0x355b15(0x6ac)]['Scene_Battle_update']['call'](this);if($gameTemp[_0x355b15(0x3f6)])this[_0x355b15(0x3e3)]();},Scene_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x3e3)]=function(){const _0x34e22b=_0x2ef904;if(!BattleManager['isInputting']()&&!this[_0x34e22b(0x60d)]&&!$gameMessage[_0x34e22b(0x1a0)]()){if('vjlWv'==='LzQSA'){function _0x107822(){const _0x15a127=_0x34e22b;_0x6e7876[_0x15a127(0x68a)](_0x469a73,_0x57da42);}}else this['_playtestF7Looping']=!![],this[_0x34e22b(0x3df)](),SceneManager[_0x34e22b(0x43b)](),this['_playtestF7Looping']=![];}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x264)]=Scene_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x635)],Scene_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x635)]=function(){const _0x4d2c19=_0x2ef904;VisuMZ[_0x4d2c19(0x6ac)][_0x4d2c19(0x264)]['call'](this),SceneManager['isSideButtonLayout']()&&this[_0x4d2c19(0x224)]();},Scene_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x224)]=function(){const _0x2c98fa=_0x2ef904;this['_cancelButton']['x']=Graphics[_0x2c98fa(0x67c)]+0x4,this['isBottomButtonMode']()?this[_0x2c98fa(0x339)]['y']=Graphics[_0x2c98fa(0x303)]-this[_0x2c98fa(0x84e)]():this[_0x2c98fa(0x339)]['y']=0x0;},VisuMZ['CoreEngine'][_0x2ef904(0x73c)]=Sprite_Button[_0x2ef904(0x6a6)]['initialize'],Sprite_Button['prototype'][_0x2ef904(0x13d)]=function(_0x4af515){const _0x3464e0=_0x2ef904;VisuMZ['CoreEngine']['Sprite_Button_initialize'][_0x3464e0(0x64a)](this,_0x4af515),this[_0x3464e0(0x73e)]();},Sprite_Button[_0x2ef904(0x6a6)]['initButtonHidden']=function(){const _0x13be18=_0x2ef904,_0x4297b0=VisuMZ[_0x13be18(0x6ac)]['Settings']['UI'];this['_isButtonHidden']=![];switch(this['_buttonType']){case _0x13be18(0x37a):this[_0x13be18(0x441)]=!_0x4297b0['cancelShowButton'];break;case _0x13be18(0x54a):case _0x13be18(0x7a7):this[_0x13be18(0x441)]=!_0x4297b0[_0x13be18(0x14d)];break;case _0x13be18(0x181):case'up':case _0x13be18(0x801):case'up2':case'ok':this[_0x13be18(0x441)]=!_0x4297b0[_0x13be18(0x436)];break;case _0x13be18(0x5c2):this[_0x13be18(0x441)]=!_0x4297b0[_0x13be18(0x4cb)];break;}},VisuMZ[_0x2ef904(0x6ac)]['Sprite_Button_updateOpacity']=Sprite_Button['prototype'][_0x2ef904(0x78e)],Sprite_Button[_0x2ef904(0x6a6)][_0x2ef904(0x78e)]=function(){const _0x190066=_0x2ef904;if(SceneManager[_0x190066(0x59b)]()||this[_0x190066(0x441)])this['hideButtonFromView']();else{if('PTPrq'!=='mgacM')VisuMZ[_0x190066(0x6ac)][_0x190066(0x461)][_0x190066(0x64a)](this);else{function _0x25ae0d(){const _0x424e67=_0x190066;return _0x381ab5[_0x424e67(0x6a6)]['isEnabled'][_0x424e67(0x64a)](this,_0xa35b27);}}}},Sprite_Button['prototype'][_0x2ef904(0x4b5)]=function(){const _0x5d9fb3=_0x2ef904;this['visible']=![],this[_0x5d9fb3(0x70f)]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x5d9fb3(0x451)]*0xa;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x3f1)]=Sprite_Battler[_0x2ef904(0x6a6)]['startMove'],Sprite_Battler['prototype']['startMove']=function(_0x533bb4,_0x16ddc3,_0x2d8d38){const _0x30ba15=_0x2ef904;(this['_targetOffsetX']!==_0x533bb4||this[_0x30ba15(0x2b7)]!==_0x16ddc3)&&(this['setMoveEasingType'](_0x30ba15(0x654)),this['_movementWholeDuration']=_0x2d8d38),VisuMZ[_0x30ba15(0x6ac)][_0x30ba15(0x3f1)][_0x30ba15(0x64a)](this,_0x533bb4,_0x16ddc3,_0x2d8d38);},Sprite_Battler[_0x2ef904(0x6a6)][_0x2ef904(0x649)]=function(_0x2056e6){const _0x1b385f=_0x2ef904;this[_0x1b385f(0x391)]=_0x2056e6;},Sprite_Battler[_0x2ef904(0x6a6)][_0x2ef904(0x840)]=function(){const _0xb1c50d=_0x2ef904;if(this[_0xb1c50d(0x7eb)]<=0x0)return;const _0x1aece7=this[_0xb1c50d(0x7eb)],_0x5f500f=this[_0xb1c50d(0x869)],_0x26a88c=this[_0xb1c50d(0x391)];this['_offsetX']=this['applyEasing'](this[_0xb1c50d(0x1cc)],this[_0xb1c50d(0x6db)],_0x1aece7,_0x5f500f,_0x26a88c),this[_0xb1c50d(0x14a)]=this[_0xb1c50d(0x1e8)](this['_offsetY'],this[_0xb1c50d(0x2b7)],_0x1aece7,_0x5f500f,_0x26a88c),this[_0xb1c50d(0x7eb)]--;if(this['_movementDuration']<=0x0)this[_0xb1c50d(0x70a)]();},Sprite_Battler[_0x2ef904(0x6a6)][_0x2ef904(0x1e8)]=function(_0x64d6c1,_0x24ba66,_0x3e7c5f,_0x579dc1,_0x1f81b1){const _0x58aa54=_0x2ef904,_0x52e754=VisuMZ['ApplyEasing']((_0x579dc1-_0x3e7c5f)/_0x579dc1,_0x1f81b1||_0x58aa54(0x654)),_0x4dd263=VisuMZ[_0x58aa54(0x53f)]((_0x579dc1-_0x3e7c5f+0x1)/_0x579dc1,_0x1f81b1||_0x58aa54(0x654)),_0x48d1dd=(_0x64d6c1-_0x24ba66*_0x52e754)/(0x1-_0x52e754);return _0x48d1dd+(_0x24ba66-_0x48d1dd)*_0x4dd263;},VisuMZ[_0x2ef904(0x6ac)]['Sprite_Actor_setActorHome']=Sprite_Actor[_0x2ef904(0x6a6)]['setActorHome'],Sprite_Actor[_0x2ef904(0x6a6)]['setActorHome']=function(_0x57497c){const _0x3f8d76=_0x2ef904;if(VisuMZ[_0x3f8d76(0x6ac)][_0x3f8d76(0x5ba)]['UI'][_0x3f8d76(0x17c)]){if(_0x3f8d76(0x1be)===_0x3f8d76(0x1e4)){function _0x519628(){const _0x23ef91=_0x3f8d76;this[_0x23ef91(0x455)]='SV';}}else this[_0x3f8d76(0x882)](_0x57497c);}else VisuMZ[_0x3f8d76(0x6ac)][_0x3f8d76(0x6d7)]['call'](this,_0x57497c);},Sprite_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x882)]=function(_0x5d349d){const _0x33a81c=_0x2ef904;let _0x29323c=Math['round'](Graphics[_0x33a81c(0x849)]/0x2+0xc0);_0x29323c-=Math['floor']((Graphics[_0x33a81c(0x849)]-Graphics['boxWidth'])/0x2),_0x29323c+=_0x5d349d*0x20;let _0x5ea8ac=Graphics['height']-0xc8-$gameParty[_0x33a81c(0x316)]()*0x30;_0x5ea8ac-=Math[_0x33a81c(0x661)]((Graphics[_0x33a81c(0x451)]-Graphics[_0x33a81c(0x303)])/0x2),_0x5ea8ac+=_0x5d349d*0x30,this[_0x33a81c(0x845)](_0x29323c,_0x5ea8ac);},Sprite_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x1cf)]=function(){const _0x35d085=_0x2ef904;this[_0x35d085(0x897)](0x4b0,0x0,0x78);},Sprite_Animation['prototype']['setMute']=function(_0x4c6f40){const _0x181db3=_0x2ef904;this[_0x181db3(0x473)]=_0x4c6f40;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x699)]=Sprite_Animation['prototype'][_0x2ef904(0x653)],Sprite_Animation[_0x2ef904(0x6a6)][_0x2ef904(0x653)]=function(){const _0x1d10b5=_0x2ef904;if(this[_0x1d10b5(0x473)])return;VisuMZ['CoreEngine'][_0x1d10b5(0x699)][_0x1d10b5(0x64a)](this);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x250)]=Sprite_Animation[_0x2ef904(0x6a6)][_0x2ef904(0x5b3)],Sprite_Animation[_0x2ef904(0x6a6)]['setViewport']=function(_0x231078){const _0x1eecb5=_0x2ef904;this[_0x1eecb5(0x456)]()?this[_0x1eecb5(0x363)](_0x231078):VisuMZ[_0x1eecb5(0x6ac)]['Sprite_Animation_setViewport']['call'](this,_0x231078);},Sprite_Animation[_0x2ef904(0x6a6)][_0x2ef904(0x456)]=function(){const _0x2884d1=_0x2ef904;if(!this[_0x2884d1(0x5ef)])return![];const _0x212d68=this[_0x2884d1(0x5ef)]['name']||'';if(_0x212d68['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x212d68[_0x2884d1(0x376)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ['CoreEngine']['Settings'][_0x2884d1(0x788)][_0x2884d1(0x19e)];},Sprite_Animation[_0x2ef904(0x6a6)][_0x2ef904(0x363)]=function(_0xc2df76){const _0x1e21d1=_0x2ef904,_0x28a886=this['_viewportSize'],_0x393a32=this[_0x1e21d1(0x803)],_0x2b742e=this[_0x1e21d1(0x5ef)][_0x1e21d1(0x3a6)]*(this[_0x1e21d1(0x631)]?-0x1:0x1)-_0x28a886/0x2,_0x2e6f0=this[_0x1e21d1(0x5ef)][_0x1e21d1(0x411)]-_0x393a32/0x2,_0x115fc0=this['targetPosition'](_0xc2df76);_0xc2df76['gl'][_0x1e21d1(0x7d7)](_0x2b742e+_0x115fc0['x'],_0x2e6f0+_0x115fc0['y'],_0x28a886,_0x393a32);},Sprite_Animation[_0x2ef904(0x6a6)][_0x2ef904(0x364)]=function(_0x4fc5e6){const _0x1e7174=_0x2ef904;if(_0x4fc5e6['_mainSprite']){}const _0x26f136=this[_0x1e7174(0x5ef)][_0x1e7174(0x1fd)];let _0x5bb90e=_0x4fc5e6['height']*_0x4fc5e6[_0x1e7174(0x6d6)]['y'],_0x287fb0=0x0,_0x4759f5=-_0x5bb90e/0x2;if(_0x26f136[_0x1e7174(0x376)](/<(?:HEAD|HEADER|TOP)>/i))_0x4759f5=-_0x5bb90e;if(_0x26f136[_0x1e7174(0x376)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x4759f5=0x0;if(_0x26f136[_0x1e7174(0x376)](/<(?:LEFT)>/i))_0x287fb0=-_0x4fc5e6[_0x1e7174(0x849)]/0x2;if(_0x26f136[_0x1e7174(0x376)](/<(?:RIGHT)>/i))_0x4759f5=_0x4fc5e6[_0x1e7174(0x849)]/0x2;if(_0x26f136[_0x1e7174(0x376)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x287fb0=Number(RegExp['$1'])*_0x4fc5e6[_0x1e7174(0x849)];_0x26f136[_0x1e7174(0x376)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x4759f5=(0x1-Number(RegExp['$1']))*-_0x5bb90e);_0x26f136[_0x1e7174(0x376)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x287fb0=Number(RegExp['$1'])*_0x4fc5e6[_0x1e7174(0x849)],_0x4759f5=(0x1-Number(RegExp['$2']))*-_0x5bb90e);if(_0x26f136[_0x1e7174(0x376)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x287fb0+=Number(RegExp['$1']);if(_0x26f136[_0x1e7174(0x376)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x4759f5+=Number(RegExp['$1']);if(_0x26f136[_0x1e7174(0x376)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x1e7174(0x587)!=='MQxxF'){function _0x28d379(){const _0x4c9866=_0x1e7174,_0x511e88=_0x4c9866(0x51a);this[_0x4c9866(0x622)]=this[_0x4c9866(0x622)]||{};if(this['_colorCache'][_0x511e88])return this[_0x4c9866(0x622)][_0x511e88];const _0x5dc1c0=_0x3c8c18[_0x4c9866(0x6ac)][_0x4c9866(0x5ba)][_0x4c9866(0x888)][_0x4c9866(0x548)];return this[_0x4c9866(0x5e5)](_0x511e88,_0x5dc1c0);}}else _0x287fb0+=Number(RegExp['$1']),_0x4759f5+=Number(RegExp['$2']);}const _0xb73e7=new Point(_0x287fb0,_0x4759f5);return _0x4fc5e6['updateTransform'](),_0x4fc5e6[_0x1e7174(0x45b)]['apply'](_0xb73e7);},Sprite_AnimationMV[_0x2ef904(0x6a6)][_0x2ef904(0x1bd)]=function(_0x59776c){const _0x41ab6e=_0x2ef904;this[_0x41ab6e(0x473)]=_0x59776c;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x887)]=Sprite_AnimationMV['prototype'][_0x2ef904(0x201)],Sprite_AnimationMV[_0x2ef904(0x6a6)][_0x2ef904(0x201)]=function(_0x35530e){const _0x4ea363=_0x2ef904;this[_0x4ea363(0x473)]&&(_0x35530e=JsonEx[_0x4ea363(0x3f2)](_0x35530e),_0x35530e['se']&&(_0x35530e['se'][_0x4ea363(0x4c3)]=0x0)),VisuMZ['CoreEngine'][_0x4ea363(0x887)]['call'](this,_0x35530e);},Sprite_Damage[_0x2ef904(0x6a6)][_0x2ef904(0x44b)]=function(_0x384567){const _0x2c5a96=_0x2ef904;let _0x434e0d=Math['abs'](_0x384567)['toString']();this[_0x2c5a96(0x3e0)]()&&(_0x434e0d=VisuMZ[_0x2c5a96(0x686)](_0x434e0d));const _0x31961e=this[_0x2c5a96(0x5e6)](),_0x4e89f6=Math[_0x2c5a96(0x661)](_0x31961e*0.75);for(let _0x333707=0x0;_0x333707<_0x434e0d[_0x2c5a96(0x862)];_0x333707++){const _0x1e699f=this['createChildSprite'](_0x4e89f6,_0x31961e);_0x1e699f['bitmap']['drawText'](_0x434e0d[_0x333707],0x0,0x0,_0x4e89f6,_0x31961e,_0x2c5a96(0x67e)),_0x1e699f['x']=(_0x333707-(_0x434e0d['length']-0x1)/0x2)*_0x4e89f6,_0x1e699f['dy']=-_0x333707;}},Sprite_Damage[_0x2ef904(0x6a6)]['useDigitGrouping']=function(){const _0x57c1df=_0x2ef904;return VisuMZ[_0x57c1df(0x6ac)][_0x57c1df(0x5ba)][_0x57c1df(0x788)]['DigitGroupingDamageSprites'];},Sprite_Damage['prototype'][_0x2ef904(0x4bb)]=function(){const _0x3f368d=_0x2ef904;return ColorManager[_0x3f368d(0x212)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x750)]=Sprite_Gauge['prototype'][_0x2ef904(0x602)],Sprite_Gauge['prototype'][_0x2ef904(0x602)]=function(){const _0x11dd55=_0x2ef904;return VisuMZ[_0x11dd55(0x6ac)]['Sprite_Gauge_gaugeRate'][_0x11dd55(0x64a)](this)[_0x11dd55(0x7b9)](0x0,0x1);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x4b2)]=Sprite_Gauge[_0x2ef904(0x6a6)][_0x2ef904(0x49b)],Sprite_Gauge[_0x2ef904(0x6a6)]['currentValue']=function(){const _0x3fb650=_0x2ef904;let _0x135492=VisuMZ[_0x3fb650(0x6ac)][_0x3fb650(0x4b2)][_0x3fb650(0x64a)](this);return _0x135492;},Sprite_Gauge[_0x2ef904(0x6a6)][_0x2ef904(0x55e)]=function(){const _0x5ba80d=_0x2ef904;let _0x353672=this[_0x5ba80d(0x49b)]();this[_0x5ba80d(0x3e0)]()&&(_0x353672=VisuMZ[_0x5ba80d(0x686)](_0x353672));const _0xf0f192=this['bitmapWidth']()-0x1,_0xdbbf5d=this[_0x5ba80d(0x6c4)]();this['setupValueFont'](),this[_0x5ba80d(0x325)][_0x5ba80d(0x3a1)](_0x353672,0x0,0x0,_0xf0f192,_0xdbbf5d,'right');},Sprite_Gauge[_0x2ef904(0x6a6)][_0x2ef904(0x61b)]=function(){return 0x3;},Sprite_Gauge[_0x2ef904(0x6a6)][_0x2ef904(0x3e0)]=function(){const _0x172f21=_0x2ef904;return VisuMZ[_0x172f21(0x6ac)][_0x172f21(0x5ba)][_0x172f21(0x788)][_0x172f21(0x621)];},Sprite_Gauge[_0x2ef904(0x6a6)][_0x2ef904(0x4bb)]=function(){const _0x3b5871=_0x2ef904;return ColorManager[_0x3b5871(0x33a)]();};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x2ef904(0x6a6)]=Object[_0x2ef904(0x62b)](Sprite_Clickable[_0x2ef904(0x6a6)]),Sprite_TitlePictureButton[_0x2ef904(0x6a6)][_0x2ef904(0x1fb)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x2ef904(0x6a6)]['initialize']=function(_0x4d105b){const _0x281b3f=_0x2ef904;Sprite_Clickable[_0x281b3f(0x6a6)]['initialize'][_0x281b3f(0x64a)](this),this[_0x281b3f(0x3b2)]=_0x4d105b,this[_0x281b3f(0x760)]=null,this[_0x281b3f(0x6fc)]();},Sprite_TitlePictureButton['prototype'][_0x2ef904(0x6fc)]=function(){const _0x2df7d9=_0x2ef904;this['x']=Graphics['width'],this['y']=Graphics[_0x2df7d9(0x451)],this[_0x2df7d9(0x599)]=![],this[_0x2df7d9(0x5bc)]();},Sprite_TitlePictureButton[_0x2ef904(0x6a6)][_0x2ef904(0x5bc)]=function(){const _0x49d4d1=_0x2ef904;this[_0x49d4d1(0x325)]=ImageManager[_0x49d4d1(0x335)](this[_0x49d4d1(0x3b2)][_0x49d4d1(0x809)]),this[_0x49d4d1(0x325)][_0x49d4d1(0x6f5)](this[_0x49d4d1(0x66d)][_0x49d4d1(0x617)](this));},Sprite_TitlePictureButton['prototype'][_0x2ef904(0x66d)]=function(){const _0x3d6309=_0x2ef904;this[_0x3d6309(0x3b2)][_0x3d6309(0x1a9)]['call'](this),this[_0x3d6309(0x3b2)][_0x3d6309(0x2d1)][_0x3d6309(0x64a)](this),this[_0x3d6309(0x3e9)](this['_data']['CallHandlerJS'][_0x3d6309(0x617)](this));},Sprite_TitlePictureButton['prototype'][_0x2ef904(0x3df)]=function(){const _0x496e20=_0x2ef904;Sprite_Clickable[_0x496e20(0x6a6)][_0x496e20(0x3df)][_0x496e20(0x64a)](this),this[_0x496e20(0x78e)](),this['processTouch']();},Sprite_TitlePictureButton[_0x2ef904(0x6a6)][_0x2ef904(0x1b8)]=function(){const _0x2d26a2=_0x2ef904;return VisuMZ[_0x2d26a2(0x6ac)]['Settings']['MenuLayout']['Title'][_0x2d26a2(0x570)];},Sprite_TitlePictureButton[_0x2ef904(0x6a6)][_0x2ef904(0x78e)]=function(){const _0x38fb37=_0x2ef904;this[_0x38fb37(0x286)]||this['_hovered']?this[_0x38fb37(0x70f)]=0xff:(this['opacity']+=this[_0x38fb37(0x599)]?this[_0x38fb37(0x1b8)]():-0x1*this['fadeSpeed'](),this['opacity']=Math[_0x38fb37(0x5e2)](0xc0,this[_0x38fb37(0x70f)]));},Sprite_TitlePictureButton[_0x2ef904(0x6a6)][_0x2ef904(0x3e9)]=function(_0x52a99a){const _0xebb79f=_0x2ef904;this[_0xebb79f(0x760)]=_0x52a99a;},Sprite_TitlePictureButton[_0x2ef904(0x6a6)][_0x2ef904(0x1da)]=function(){const _0x48d9df=_0x2ef904;this['_clickHandler']&&this[_0x48d9df(0x760)]();},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x33d)]=Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x13d)],Spriteset_Base['prototype'][_0x2ef904(0x13d)]=function(){const _0x9c9a3a=_0x2ef904;VisuMZ[_0x9c9a3a(0x6ac)][_0x9c9a3a(0x33d)][_0x9c9a3a(0x64a)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x3cf)]=function(){const _0x2d47c7=_0x2ef904;this[_0x2d47c7(0x37d)]=[],this[_0x2d47c7(0x4fb)]=this['scale']['x'],this['_cacheScaleY']=this['scale']['y'];},VisuMZ['CoreEngine'][_0x2ef904(0x831)]=Spriteset_Base[_0x2ef904(0x6a6)]['destroy'],Spriteset_Base[_0x2ef904(0x6a6)]['destroy']=function(_0x9975bf){const _0x4eccb3=_0x2ef904;this[_0x4eccb3(0x641)](),VisuMZ[_0x4eccb3(0x6ac)][_0x4eccb3(0x831)]['call'](this,_0x9975bf);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x759)]=Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x3df)],Spriteset_Base[_0x2ef904(0x6a6)]['update']=function(){const _0x2224a7=_0x2ef904;VisuMZ[_0x2224a7(0x6ac)]['Spriteset_Base_update'][_0x2224a7(0x64a)](this),this[_0x2224a7(0x34b)](),this[_0x2224a7(0x826)]();},Spriteset_Base['prototype'][_0x2ef904(0x34b)]=function(){const _0x50e99d=_0x2ef904;if(!VisuMZ[_0x50e99d(0x6ac)][_0x50e99d(0x5ba)][_0x50e99d(0x788)][_0x50e99d(0x464)])return;if(this[_0x50e99d(0x4fb)]===this[_0x50e99d(0x6d6)]['x']&&this[_0x50e99d(0x5d3)]===this[_0x50e99d(0x6d6)]['y'])return;this[_0x50e99d(0x6aa)](),this['_cacheScaleX']=this['scale']['x'],this[_0x50e99d(0x5d3)]=this['scale']['y'];},Spriteset_Base[_0x2ef904(0x6a6)]['adjustPictureAntiZoom']=function(){const _0x44a282=_0x2ef904;if(this[_0x44a282(0x6d6)]['x']!==0x0){if(_0x44a282(0x619)===_0x44a282(0x619))this[_0x44a282(0x468)][_0x44a282(0x6d6)]['x']=0x1/this[_0x44a282(0x6d6)]['x'],this[_0x44a282(0x468)]['x']=-(this['x']/this[_0x44a282(0x6d6)]['x']);else{function _0xfc7e9f(){const _0xaba889=_0x44a282;_0x223bc2[_0xaba889(0x6ac)][_0xaba889(0x264)][_0xaba889(0x64a)](this),_0x387880[_0xaba889(0x64c)]()&&this['repositionCancelButtonSideButtonLayout']();}}}if(this['scale']['y']!==0x0){if('qdHms'===_0x44a282(0x54d)){function _0x3ee831(){const _0x26ed07=_0x44a282;this[_0x26ed07(0x154)]=_0x247264(_0xc1e580(this[_0x26ed07(0x154)])[_0x26ed07(0x32c)](0x1)),this['_number']=_0x57e06e[_0x26ed07(0x8a6)](0x0,this[_0x26ed07(0x154)]),_0x1d6e20[_0x26ed07(0x57b)](),this['refresh'](),_0x4823c1['playCursor'](),this['select'](this[_0x26ed07(0x3f9)]-0x1);}}else this['_pictureContainer']['scale']['y']=0x1/this[_0x44a282(0x6d6)]['y'],this[_0x44a282(0x468)]['y']=-(this['y']/this[_0x44a282(0x6d6)]['y']);}},Spriteset_Base[_0x2ef904(0x6a6)]['updateFauxAnimations']=function(){const _0x2a9bce=_0x2ef904;for(const _0x5589c0 of this[_0x2a9bce(0x37d)]){if(_0x2a9bce(0x447)!==_0x2a9bce(0x4dc))!_0x5589c0[_0x2a9bce(0x527)]()&&this[_0x2a9bce(0x5b5)](_0x5589c0);else{function _0x40569e(){const _0x1e2d0c=_0x2a9bce;return _0x2e3c04[_0x1e2d0c(0x56d)][_0x1e2d0c(0x6ad)][_0x1e2d0c(0x64a)](this);}}}this[_0x2a9bce(0x609)]();},Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x609)]=function(){const _0x1954d8=_0x2ef904;for(;;){if(_0x1954d8(0x463)===_0x1954d8(0x71b)){function _0x576d00(){const _0x5def8d=_0x1954d8;_0x5b2160['CoreEngine']['Game_Map_setup'][_0x5def8d(0x64a)](this,_0x1c5482),this[_0x5def8d(0x48f)](_0x1452a6);}}else{const _0xf636d4=$gameTemp[_0x1954d8(0x4f5)]();if(_0xf636d4)this[_0x1954d8(0x63a)](_0xf636d4);else{if('jQdHi'!==_0x1954d8(0x4be))break;else{function _0x2bd534(){const _0x468f97=_0x1954d8;!this[_0x468f97(0x453)]&&(this[_0x468f97(0x51b)]+=_0x5316f5[_0x468f97(0x546)]((_0x16a610['height']-0x270)/0x2),this[_0x468f97(0x51b)]-=_0x3219bf[_0x468f97(0x661)]((_0x3bfdf2[_0x468f97(0x451)]-_0x1280b0[_0x468f97(0x303)])/0x2),_0x707a61[_0x468f97(0x27c)]()?this[_0x468f97(0x513)]-=_0x419d55['floor']((_0x170a87['width']-_0x1d853a[_0x468f97(0x67c)])/0x2):this[_0x468f97(0x513)]+=_0x22f349[_0x468f97(0x546)]((_0x4605c4['boxWidth']-0x330)/0x2)),this[_0x468f97(0x453)]=!![];}}}}}},Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x63a)]=function(_0x8a33e8){const _0x278375=_0x2ef904,_0x549848=$dataAnimations[_0x8a33e8[_0x278375(0x61f)]],_0x5de0c9=_0x8a33e8[_0x278375(0x7bf)],_0x4bd80e=_0x8a33e8['mirror'],_0xcdfc7f=_0x8a33e8['mute'];let _0x32e28b=this[_0x278375(0x679)]();const _0x3a77d7=this['animationNextDelay']();if(this[_0x278375(0x39a)](_0x549848))for(const _0x5b9a1f of _0x5de0c9){if(_0x278375(0x63d)!=='LzzDF'){function _0x174618(){const _0x3713f9=_0x278375;_0xd8d775[_0x3713f9(0x3fc)]&&(this[_0x3713f9(0x7e8)]=_0x3713f9(0x700));}}else this[_0x278375(0x4c6)]([_0x5b9a1f],_0x549848,_0x4bd80e,_0x32e28b,_0xcdfc7f),_0x32e28b+=_0x3a77d7;}else{if(_0x278375(0x66c)!==_0x278375(0x37c))this['createFauxAnimationSprite'](_0x5de0c9,_0x549848,_0x4bd80e,_0x32e28b,_0xcdfc7f);else{function _0x4104e6(){const _0x3962fe=_0x278375;this[_0x3962fe(0x69f)]();}}}},Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x4c6)]=function(_0x230b44,_0x51c472,_0x169b93,_0x7cc719,_0x49ab88){const _0x20534e=_0x2ef904,_0x367f84=this[_0x20534e(0x460)](_0x51c472),_0x3bba8c=new(_0x367f84?Sprite_AnimationMV:Sprite_Animation)(),_0x49b49e=this[_0x20534e(0x46e)](_0x230b44);this[_0x20534e(0x467)](_0x230b44[0x0])&&(_0x169b93=!_0x169b93),_0x3bba8c['targetObjects']=_0x230b44,_0x3bba8c[_0x20534e(0x6fc)](_0x49b49e,_0x51c472,_0x169b93,_0x7cc719),_0x3bba8c[_0x20534e(0x1bd)](_0x49ab88),this['_effectsContainer'][_0x20534e(0x55b)](_0x3bba8c),this[_0x20534e(0x37d)]['push'](_0x3bba8c);},Spriteset_Base[_0x2ef904(0x6a6)]['removeFauxAnimation']=function(_0x304866){const _0x57dd78=_0x2ef904;this[_0x57dd78(0x37d)]['remove'](_0x304866),this[_0x57dd78(0x5c8)][_0x57dd78(0x726)](_0x304866);for(const _0x271a54 of _0x304866[_0x57dd78(0x5f1)]){if(_0x271a54['endAnimation']){if(_0x57dd78(0x89f)==='zlrJK'){function _0xd29b62(){const _0x10a577=_0x57dd78;this['_forcedBattleSys']=_0x10a577(0x1de);}}else _0x271a54[_0x57dd78(0x35c)]();}}_0x304866['destroy']();},Spriteset_Base[_0x2ef904(0x6a6)]['removeAllFauxAnimations']=function(){const _0x87a7a6=_0x2ef904;for(const _0x16b57e of this[_0x87a7a6(0x37d)]){if('LFAai'===_0x87a7a6(0x34d)){function _0xbc64e(){const _0x1b9a16=_0x87a7a6;_0xf8c106[_0x1b9a16(0x466)](_0x1b9a16(0x175)),_0x4d5624[_0x1b9a16(0x466)](_0x1dc2f3);}}else this[_0x87a7a6(0x5b5)](_0x16b57e);}},Spriteset_Base['prototype'][_0x2ef904(0x3ad)]=function(){const _0x3e50fc=_0x2ef904;return this['_fauxAnimationSprites'][_0x3e50fc(0x862)]>0x0;},VisuMZ[_0x2ef904(0x6ac)]['Spriteset_Base_updatePosition']=Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x60f)],Spriteset_Base['prototype'][_0x2ef904(0x60f)]=function(){const _0x337262=_0x2ef904;VisuMZ['CoreEngine'][_0x337262(0x50d)][_0x337262(0x64a)](this),this[_0x337262(0x67f)]();},Spriteset_Base['prototype'][_0x2ef904(0x67f)]=function(){const _0x5c25a2=_0x2ef904;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x5c25a2(0x546)]($gameScreen[_0x5c25a2(0x639)]());const _0x21ae34=$gameScreen[_0x5c25a2(0x65e)]();switch($gameScreen[_0x5c25a2(0x65e)]()){case _0x5c25a2(0x720):this[_0x5c25a2(0x28f)]();break;case _0x5c25a2(0x3d1):this[_0x5c25a2(0x317)]();break;case _0x5c25a2(0x16f):this[_0x5c25a2(0x607)]();break;default:this[_0x5c25a2(0x225)]();break;}},Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x28f)]=function(){const _0x4e7ff7=_0x2ef904,_0x22d273=VisuMZ[_0x4e7ff7(0x6ac)][_0x4e7ff7(0x5ba)][_0x4e7ff7(0x4e8)];if(_0x22d273&&_0x22d273[_0x4e7ff7(0x239)])return _0x22d273['originalJS'][_0x4e7ff7(0x64a)](this);this['x']+=Math['round']($gameScreen[_0x4e7ff7(0x639)]());},Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x225)]=function(){const _0x28f26f=_0x2ef904,_0x511f29=VisuMZ[_0x28f26f(0x6ac)][_0x28f26f(0x5ba)][_0x28f26f(0x4e8)];if(_0x511f29&&_0x511f29[_0x28f26f(0x856)])return _0x511f29[_0x28f26f(0x856)][_0x28f26f(0x64a)](this);const _0x331734=$gameScreen[_0x28f26f(0x52e)]*0.75,_0x2931c=$gameScreen[_0x28f26f(0x729)]*0.6,_0x57ccb5=$gameScreen['_shakeDuration'];this['x']+=Math[_0x28f26f(0x546)](Math[_0x28f26f(0x4d8)](_0x331734)-Math['randomInt'](_0x2931c))*(Math[_0x28f26f(0x5e2)](_0x57ccb5,0x1e)*0.5),this['y']+=Math[_0x28f26f(0x546)](Math[_0x28f26f(0x4d8)](_0x331734)-Math[_0x28f26f(0x4d8)](_0x2931c))*(Math[_0x28f26f(0x5e2)](_0x57ccb5,0x1e)*0.5);},Spriteset_Base[_0x2ef904(0x6a6)][_0x2ef904(0x317)]=function(){const _0x593afb=_0x2ef904,_0x39fc1a=VisuMZ[_0x593afb(0x6ac)][_0x593afb(0x5ba)][_0x593afb(0x4e8)];if(_0x39fc1a&&_0x39fc1a[_0x593afb(0x6e5)]){if(_0x593afb(0x471)!=='HvyyL'){function _0x56f877(){const _0x2aef0c=_0x593afb;_0x1eb3cd[_0x2aef0c(0x6ac)][_0x2aef0c(0x461)][_0x2aef0c(0x64a)](this);}}else return _0x39fc1a['horzJS'][_0x593afb(0x64a)](this);}const _0x5c0d0c=$gameScreen[_0x593afb(0x52e)]*0.75,_0xd26941=$gameScreen[_0x593afb(0x729)]*0.6,_0x5e4f03=$gameScreen[_0x593afb(0x769)];this['x']+=Math['round'](Math[_0x593afb(0x4d8)](_0x5c0d0c)-Math[_0x593afb(0x4d8)](_0xd26941))*(Math['min'](_0x5e4f03,0x1e)*0.5);},Spriteset_Base['prototype'][_0x2ef904(0x607)]=function(){const _0x535988=_0x2ef904,_0x3b8e62=VisuMZ[_0x535988(0x6ac)][_0x535988(0x5ba)][_0x535988(0x4e8)];if(_0x3b8e62&&_0x3b8e62['vertJS']){if(_0x535988(0x6cb)===_0x535988(0x6cb))return _0x3b8e62[_0x535988(0x70e)][_0x535988(0x64a)](this);else{function _0x4d9167(){const _0x5e82f5=_0x535988;for(const _0x34d508 of _0x2953bf[_0x5e82f5(0x542)]){_0x34d508[_0x5e82f5(0x80d)][_0x5e82f5(0x376)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x34d508[_0x5e82f5(0x42e)]=_0x4513ce['max'](_0x156ab5(_0x4bf041['$1']),0x1));}}}}const _0x5223cb=$gameScreen[_0x535988(0x52e)]*0.75,_0x474115=$gameScreen[_0x535988(0x729)]*0.6,_0x538519=$gameScreen[_0x535988(0x769)];this['y']+=Math[_0x535988(0x546)](Math[_0x535988(0x4d8)](_0x5223cb)-Math[_0x535988(0x4d8)](_0x474115))*(Math[_0x535988(0x5e2)](_0x538519,0x1e)*0.5);},Spriteset_Battle[_0x2ef904(0x6a6)]['createBackground']=function(){const _0x442e41=_0x2ef904;this[_0x442e41(0x7f1)]=new PIXI['filters'][(_0x442e41(0x56f))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x442e41(0x475)][_0x442e41(0x325)]=SceneManager[_0x442e41(0x28d)](),this[_0x442e41(0x475)][_0x442e41(0x682)]=[this[_0x442e41(0x7f1)]],this[_0x442e41(0x6d5)][_0x442e41(0x55b)](this['_backgroundSprite']);},VisuMZ[_0x2ef904(0x6ac)]['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x4c1)],Spriteset_Battle[_0x2ef904(0x6a6)]['createEnemies']=function(){const _0x3092d0=_0x2ef904;VisuMZ[_0x3092d0(0x6ac)]['Settings']['UI'][_0x3092d0(0x196)]&&this[_0x3092d0(0x49d)](),VisuMZ[_0x3092d0(0x6ac)][_0x3092d0(0x20e)]['call'](this);},Spriteset_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x49d)]=function(){const _0x19818a=_0x2ef904;for(member of $gameTroop['members']()){member[_0x19818a(0x5df)]();}},VisuMZ[_0x2ef904(0x6ac)]['Window_Base_initialize']=Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x13d)],Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x13d)]=function(_0x4b90b0){const _0x4a325f=_0x2ef904;_0x4b90b0['x']=Math[_0x4a325f(0x546)](_0x4b90b0['x']),_0x4b90b0['y']=Math[_0x4a325f(0x546)](_0x4b90b0['y']),_0x4b90b0[_0x4a325f(0x849)]=Math[_0x4a325f(0x546)](_0x4b90b0[_0x4a325f(0x849)]),_0x4b90b0['height']=Math['round'](_0x4b90b0['height']),this[_0x4a325f(0x823)](),VisuMZ[_0x4a325f(0x6ac)][_0x4a325f(0x83a)][_0x4a325f(0x64a)](this,_0x4b90b0),this[_0x4a325f(0x73a)]();},Window_Base['prototype'][_0x2ef904(0x823)]=function(){const _0x5ec7bd=_0x2ef904;this[_0x5ec7bd(0x492)]=VisuMZ[_0x5ec7bd(0x6ac)]['Settings'][_0x5ec7bd(0x788)][_0x5ec7bd(0x7fa)],this[_0x5ec7bd(0x3d8)]=VisuMZ['CoreEngine'][_0x5ec7bd(0x5ba)][_0x5ec7bd(0x788)][_0x5ec7bd(0x372)];},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x5fc)]=function(){const _0x3695f1=_0x2ef904;return VisuMZ[_0x3695f1(0x6ac)][_0x3695f1(0x5ba)][_0x3695f1(0x5cf)][_0x3695f1(0x76c)];},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x559)]=function(){const _0x365038=_0x2ef904;return VisuMZ['CoreEngine'][_0x365038(0x5ba)][_0x365038(0x5cf)][_0x365038(0x518)];},Window_Base['prototype'][_0x2ef904(0x701)]=function(){const _0x5953d2=_0x2ef904;this[_0x5953d2(0x6dc)]=VisuMZ[_0x5953d2(0x6ac)][_0x5953d2(0x5ba)][_0x5953d2(0x5cf)][_0x5953d2(0x42b)];},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x35a)]=function(){const _0x43267c=_0x2ef904;return VisuMZ[_0x43267c(0x6ac)][_0x43267c(0x5ba)][_0x43267c(0x5cf)][_0x43267c(0x5ee)];},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x851)]=function(){const _0x36f3bd=_0x2ef904;return VisuMZ[_0x36f3bd(0x6ac)][_0x36f3bd(0x5ba)]['Window'][_0x36f3bd(0x319)];},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x409)]=Window_Base['prototype'][_0x2ef904(0x3df)],Window_Base['prototype'][_0x2ef904(0x3df)]=function(){const _0x121167=_0x2ef904;VisuMZ[_0x121167(0x6ac)][_0x121167(0x409)][_0x121167(0x64a)](this),this[_0x121167(0x2bb)]();},Window_Base[_0x2ef904(0x6a6)]['updateOpen']=function(){const _0x3c499d=_0x2ef904;if(this[_0x3c499d(0x3d2)]){if('Lomdy'==='iQitN'){function _0x1e2d27(){const _0x2bedcf=_0x3c499d;let _0x424d31=_0xa32237[_0x5f0dd4],_0x37cf68=this[_0x2bedcf(0x6d4)](_0x424d31)['width'],_0x3ff9d3=_0x11bc6f[_0x2bedcf(0x661)]((this[_0x2bedcf(0x22b)]['width']-_0x37cf68)/0x2);this[_0x2bedcf(0x22a)](_0x424d31,_0x3ff9d3,_0x3bdf32),_0x584a7f+=this['lineHeight']();}}else{this[_0x3c499d(0x7a6)]+=this[_0x3c499d(0x851)]();if(this['isOpen']()){if(_0x3c499d(0x53e)===_0x3c499d(0x53e))this[_0x3c499d(0x3d2)]=![];else{function _0x2b5441(){const _0x17378a=_0x3c499d;return _0x47102d[_0x17378a(0x6ac)][_0x17378a(0x5ba)][_0x17378a(0x888)][_0x17378a(0x4b1)]||_0x17378a(0x1f1);}}}}}},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x5d4)]=function(){const _0x58d77d=_0x2ef904;this[_0x58d77d(0x7db)]&&(this[_0x58d77d(0x7a6)]-=this['openingSpeed'](),this['isClosed']()&&(this['_closing']=![]));},VisuMZ[_0x2ef904(0x6ac)]['Window_Base_drawText']=Window_Base[_0x2ef904(0x6a6)]['drawText'],Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x3a1)]=function(_0xe8e14d,_0x353b4a,_0x3596b0,_0x55ce7c,_0xad7501){const _0x35e8d8=_0x2ef904;if(this[_0x35e8d8(0x3e0)]())_0xe8e14d=VisuMZ[_0x35e8d8(0x686)](_0xe8e14d);VisuMZ[_0x35e8d8(0x6ac)][_0x35e8d8(0x15e)][_0x35e8d8(0x64a)](this,_0xe8e14d,_0x353b4a,_0x3596b0,_0x55ce7c,_0xad7501);},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x3e0)]=function(){return this['_digitGrouping'];},VisuMZ[_0x2ef904(0x6ac)]['Window_Base_createTextState']=Window_Base['prototype']['createTextState'],Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x315)]=function(_0x41a00c,_0x5e7d2b,_0x2dd60a,_0x3eee01){const _0x524f14=_0x2ef904;var _0x5d7bab=VisuMZ[_0x524f14(0x6ac)][_0x524f14(0x606)][_0x524f14(0x64a)](this,_0x41a00c,_0x5e7d2b,_0x2dd60a,_0x3eee01);if(this[_0x524f14(0x437)]())_0x5d7bab[_0x524f14(0x7d1)]=VisuMZ['GroupDigits'](_0x5d7bab['text']);return _0x5d7bab;},Window_Base['prototype']['useDigitGroupingEx']=function(){const _0x575033=_0x2ef904;return this[_0x575033(0x3d8)];},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x449)]=function(_0x2ed307){const _0x365e29=_0x2ef904;this[_0x365e29(0x492)]=_0x2ed307;},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x885)]=function(_0x4c87f4){this['_digitGroupingEx']=_0x4c87f4;},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x642)]=Window_Base['prototype'][_0x2ef904(0x752)],Window_Base[_0x2ef904(0x6a6)]['drawIcon']=function(_0x9f5d32,_0x1fca71,_0x22be8e){const _0x2c7655=_0x2ef904;_0x1fca71=Math[_0x2c7655(0x546)](_0x1fca71),_0x22be8e=Math['round'](_0x22be8e),VisuMZ[_0x2c7655(0x6ac)][_0x2c7655(0x642)][_0x2c7655(0x64a)](this,_0x9f5d32,_0x1fca71,_0x22be8e);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x79f)]=Window_Base['prototype']['drawFace'],Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x48d)]=function(_0x596903,_0x219c4b,_0x5a189f,_0x2702b7,_0x350be3,_0x2f9eb2){const _0x2b74f8=_0x2ef904;_0x350be3=_0x350be3||ImageManager[_0x2b74f8(0x5cd)],_0x2f9eb2=_0x2f9eb2||ImageManager['faceHeight'],_0x5a189f=Math[_0x2b74f8(0x546)](_0x5a189f),_0x2702b7=Math['round'](_0x2702b7),_0x350be3=Math[_0x2b74f8(0x546)](_0x350be3),_0x2f9eb2=Math[_0x2b74f8(0x546)](_0x2f9eb2),VisuMZ[_0x2b74f8(0x6ac)][_0x2b74f8(0x79f)][_0x2b74f8(0x64a)](this,_0x596903,_0x219c4b,_0x5a189f,_0x2702b7,_0x350be3,_0x2f9eb2);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ec)]=Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x626)],Window_Base['prototype'][_0x2ef904(0x626)]=function(_0x1b8294,_0x5f3f8f,_0x4e577b,_0x52a90f){const _0x65be4=_0x2ef904;_0x4e577b=Math[_0x65be4(0x546)](_0x4e577b),_0x52a90f=Math['round'](_0x52a90f),VisuMZ[_0x65be4(0x6ac)][_0x65be4(0x5ec)][_0x65be4(0x64a)](this,_0x1b8294,_0x5f3f8f,_0x4e577b,_0x52a90f);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x76b)]=Window_Selectable['prototype']['itemRect'],Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x569)]=function(_0x364ba6){const _0x53d999=_0x2ef904;let _0x2053fb=VisuMZ[_0x53d999(0x6ac)][_0x53d999(0x76b)][_0x53d999(0x64a)](this,_0x364ba6);return _0x2053fb['x']=Math['round'](_0x2053fb['x']),_0x2053fb['y']=Math[_0x53d999(0x546)](_0x2053fb['y']),_0x2053fb[_0x53d999(0x849)]=Math[_0x53d999(0x546)](_0x2053fb[_0x53d999(0x849)]),_0x2053fb[_0x53d999(0x451)]=Math[_0x53d999(0x546)](_0x2053fb['height']),_0x2053fb;},VisuMZ['CoreEngine'][_0x2ef904(0x48c)]=Window_StatusBase[_0x2ef904(0x6a6)][_0x2ef904(0x482)],Window_StatusBase[_0x2ef904(0x6a6)][_0x2ef904(0x482)]=function(_0x58ec6b,_0x36123c,_0x3d8c63){const _0x4e2d5e=_0x2ef904;_0x36123c=Math[_0x4e2d5e(0x546)](_0x36123c),_0x3d8c63=Math[_0x4e2d5e(0x546)](_0x3d8c63),VisuMZ[_0x4e2d5e(0x6ac)][_0x4e2d5e(0x48c)][_0x4e2d5e(0x64a)](this,_0x58ec6b,_0x36123c,_0x3d8c63);},Window_Base['prototype'][_0x2ef904(0x73a)]=function(){const _0x51f608=_0x2ef904;this[_0x51f608(0x32a)]={'duration':0x0,'wholeDuration':0x0,'type':_0x51f608(0x332),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x51f608(0x6d6)]['x'],'targetScaleY':this[_0x51f608(0x6d6)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x51f608(0x6dc)],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x2ef904(0x6a6)]['updateCoreEasing']=function(){const _0x896fa5=_0x2ef904;if(!this['_coreEasing'])return;if(this[_0x896fa5(0x32a)][_0x896fa5(0x42a)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0x896fa5(0x32a)]['targetX']),this['y']=this[_0x896fa5(0x7a1)](this['y'],this['_coreEasing'][_0x896fa5(0x24f)]),this[_0x896fa5(0x6d6)]['x']=this['applyCoreEasing'](this['scale']['x'],this[_0x896fa5(0x32a)][_0x896fa5(0x173)]),this['scale']['y']=this[_0x896fa5(0x7a1)](this[_0x896fa5(0x6d6)]['y'],this[_0x896fa5(0x32a)]['targetScaleY']),this[_0x896fa5(0x70f)]=this[_0x896fa5(0x7a1)](this[_0x896fa5(0x70f)],this[_0x896fa5(0x32a)][_0x896fa5(0x4d7)]),this['backOpacity']=this[_0x896fa5(0x7a1)](this[_0x896fa5(0x6dc)],this[_0x896fa5(0x32a)][_0x896fa5(0x55c)]),this[_0x896fa5(0x82d)]=this[_0x896fa5(0x7a1)](this[_0x896fa5(0x82d)],this[_0x896fa5(0x32a)][_0x896fa5(0x552)]),this[_0x896fa5(0x32a)][_0x896fa5(0x42a)]--;},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x7a1)]=function(_0x4b1d88,_0x4b3178){const _0x136369=_0x2ef904;if(!this[_0x136369(0x32a)])return _0x4b3178;const _0x9a6e1c=this[_0x136369(0x32a)]['duration'],_0x54975f=this['_coreEasing']['wholeDuration'],_0xa7c4b5=this['calcCoreEasing']((_0x54975f-_0x9a6e1c)/_0x54975f),_0x50ee3f=this[_0x136369(0x221)]((_0x54975f-_0x9a6e1c+0x1)/_0x54975f),_0x3fc33e=(_0x4b1d88-_0x4b3178*_0xa7c4b5)/(0x1-_0xa7c4b5);return _0x3fc33e+(_0x4b3178-_0x3fc33e)*_0x50ee3f;},Window_Base['prototype'][_0x2ef904(0x221)]=function(_0x36aa4e){const _0x5713ad=_0x2ef904;if(!this[_0x5713ad(0x32a)])return _0x36aa4e;return VisuMZ[_0x5713ad(0x53f)](_0x36aa4e,this['_coreEasing'][_0x5713ad(0x702)]||_0x5713ad(0x332));},Window_Base[_0x2ef904(0x6a6)]['anchorCoreEasing']=function(_0x4c8e0c,_0x36762f){const _0x47a37c=_0x2ef904;if(!this['_coreEasing'])return;this['x']=this['_coreEasing']['targetX'],this['y']=this['_coreEasing']['targetY'],this[_0x47a37c(0x6d6)]['x']=this[_0x47a37c(0x32a)][_0x47a37c(0x173)],this[_0x47a37c(0x6d6)]['y']=this[_0x47a37c(0x32a)][_0x47a37c(0x270)],this[_0x47a37c(0x70f)]=this[_0x47a37c(0x32a)][_0x47a37c(0x4d7)],this['backOpacity']=this[_0x47a37c(0x32a)][_0x47a37c(0x55c)],this['contentsOpacity']=this[_0x47a37c(0x32a)][_0x47a37c(0x552)],this[_0x47a37c(0x42d)](_0x4c8e0c,_0x36762f,this['x'],this['y'],this[_0x47a37c(0x6d6)]['x'],this['scale']['y'],this[_0x47a37c(0x70f)],this[_0x47a37c(0x6dc)],this[_0x47a37c(0x82d)]);},Window_Base[_0x2ef904(0x6a6)]['setupCoreEasing']=function(_0x3a5861,_0x19e836,_0x4427af,_0x4910b8,_0x1b3823,_0x5873f4,_0x3ba93b,_0x3e4854,_0xea56b2){this['_coreEasing']={'duration':_0x3a5861,'wholeDuration':_0x3a5861,'type':_0x19e836,'targetX':_0x4427af,'targetY':_0x4910b8,'targetScaleX':_0x1b3823,'targetScaleY':_0x5873f4,'targetOpacity':_0x3ba93b,'targetBackOpacity':_0x3e4854,'targetContentsOpacity':_0xea56b2};},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x4d1)]=function(_0xef4e0c,_0x733ff2,_0x5f0704,_0x1bcb71,_0x1e6a88){const _0x2b866b=_0x2ef904;this[_0x2b866b(0x370)](),this[_0x2b866b(0x22b)][_0x2b866b(0x5e6)]=VisuMZ[_0x2b866b(0x6ac)][_0x2b866b(0x5ba)][_0x2b866b(0x2cf)][_0x2b866b(0x625)];const _0x5e4d5d=VisuMZ['CoreEngine'][_0x2b866b(0x5ba)][_0x2b866b(0x2cf)][_0x2b866b(0x4a1)];if(_0x5e4d5d>0x0&&_0x733ff2===TextManager['currencyUnit']){const _0x28c291=_0x1bcb71+(this['lineHeight']()-ImageManager[_0x2b866b(0x3a3)])/0x2;this['drawIcon'](_0x5e4d5d,_0x5f0704+(_0x1e6a88-ImageManager[_0x2b866b(0x3b0)]),_0x28c291),_0x1e6a88-=ImageManager[_0x2b866b(0x3b0)]+0x4;}else this['changeTextColor'](ColorManager['systemColor']()),this[_0x2b866b(0x3a1)](_0x733ff2,_0x5f0704,_0x1bcb71,_0x1e6a88,_0x2b866b(0x830)),_0x1e6a88-=this[_0x2b866b(0x89e)](_0x733ff2)+0x6;this[_0x2b866b(0x6e6)]();const _0x202e34=this['textWidth'](this[_0x2b866b(0x492)]?VisuMZ[_0x2b866b(0x686)](_0xef4e0c):_0xef4e0c);_0x202e34>_0x1e6a88?this[_0x2b866b(0x3a1)](VisuMZ[_0x2b866b(0x6ac)][_0x2b866b(0x5ba)]['Gold'][_0x2b866b(0x7c6)],_0x5f0704,_0x1bcb71,_0x1e6a88,_0x2b866b(0x830)):this[_0x2b866b(0x3a1)](_0xef4e0c,_0x5f0704,_0x1bcb71,_0x1e6a88,'right'),this[_0x2b866b(0x370)]();},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x6d0)]=function(_0x34bf03,_0x367374,_0x316faa,_0x5166ff,_0x3b5e29){const _0xbbc537=_0x2ef904,_0x3365cf=ImageManager['loadSystem'](_0xbbc537(0x24d)),_0xfce298=ImageManager[_0xbbc537(0x3b0)],_0x177531=ImageManager['iconHeight'],_0x2be8bf=_0x34bf03%0x10*_0xfce298,_0x1ff90a=Math[_0xbbc537(0x661)](_0x34bf03/0x10)*_0x177531,_0x30fcd0=_0x5166ff,_0x38baa0=_0x5166ff;this[_0xbbc537(0x22b)]['_context'][_0xbbc537(0x46c)]=_0x3b5e29,this['contents'][_0xbbc537(0x86a)](_0x3365cf,_0x2be8bf,_0x1ff90a,_0xfce298,_0x177531,_0x367374,_0x316faa,_0x30fcd0,_0x38baa0),this[_0xbbc537(0x22b)][_0xbbc537(0x2b3)][_0xbbc537(0x46c)]=!![];},Window_Base[_0x2ef904(0x6a6)][_0x2ef904(0x19f)]=function(_0x2526ee,_0x12a245,_0x3d5e1b,_0x42129c,_0x59e4cb,_0x4dae90){const _0x498624=_0x2ef904,_0x49ff8b=Math[_0x498624(0x661)]((_0x3d5e1b-0x2)*_0x42129c),_0x3d9f79=Sprite_Gauge['prototype']['gaugeHeight'][_0x498624(0x64a)](this),_0x46180e=_0x12a245+this[_0x498624(0x5fc)]()-_0x3d9f79-0x2;this['contents'][_0x498624(0x595)](_0x2526ee,_0x46180e,_0x3d5e1b,_0x3d9f79,ColorManager[_0x498624(0x5f2)]()),this['contents'][_0x498624(0x669)](_0x2526ee+0x1,_0x46180e+0x1,_0x49ff8b,_0x3d9f79-0x2,_0x59e4cb,_0x4dae90);},Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x6ef)]=function(_0x150a5a){const _0x4eddb8=_0x2ef904;let _0x2fb1eb=this[_0x4eddb8(0x588)]();const _0x5df627=this['maxItems'](),_0x44a6cf=this[_0x4eddb8(0x525)]();if(this[_0x4eddb8(0x16c)]()&&(_0x2fb1eb<_0x5df627||_0x150a5a&&_0x44a6cf===0x1)){_0x2fb1eb+=_0x44a6cf;if(_0x2fb1eb>=_0x5df627)_0x2fb1eb=_0x5df627-0x1;this[_0x4eddb8(0x237)](_0x2fb1eb);}else!this['isUseModernControls']()&&((_0x2fb1eb<_0x5df627-_0x44a6cf||_0x150a5a&&_0x44a6cf===0x1)&&this[_0x4eddb8(0x237)]((_0x2fb1eb+_0x44a6cf)%_0x5df627));},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x16a)]=Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x6ef)],Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x6ef)]=function(_0xa90851){const _0x581d0d=_0x2ef904;if(this[_0x581d0d(0x16c)]()&&_0xa90851&&this[_0x581d0d(0x525)]()===0x1&&this[_0x581d0d(0x588)]()===this['maxItems']()-0x1){if('HCDZE'!==_0x581d0d(0x3f0))this['smoothSelect'](0x0);else{function _0x136ea3(){const _0x4092de=_0x581d0d;this[_0x4092de(0x4bd)][_0x4092de(0x223)](_0x5b21fa['layoutSettings']['DummyBgType']);}}}else{if('nzHTU'!==_0x581d0d(0x83e)){function _0x2bd16c(){const _0x2f3259=_0x581d0d;if(_0x3ef0ed['inBattle']())return;_0x59b1f8['ConvertParams'](_0x56f3ae,_0x514203);const _0x2e36a8=_0x1d7d9d[_0x2f3259(0x7a0)];for(const _0x9ea5a7 of _0x2e36a8){const _0x3d78b3=_0x328495['value'](_0x9ea5a7);_0x385203[_0x2f3259(0x3ae)](_0x9ea5a7,!_0x3d78b3);}}}else VisuMZ[_0x581d0d(0x6ac)]['Window_Selectable_cursorDown'][_0x581d0d(0x64a)](this,_0xa90851);}},Window_Selectable[_0x2ef904(0x6a6)]['cursorUp']=function(_0x126e05){const _0x45b5c=_0x2ef904;let _0x43e75d=Math['max'](0x0,this[_0x45b5c(0x588)]());const _0x51e665=this[_0x45b5c(0x5a8)](),_0x55a43a=this['maxCols']();if(this[_0x45b5c(0x16c)]()&&_0x43e75d>0x0||_0x126e05&&_0x55a43a===0x1){if(_0x45b5c(0x40b)===_0x45b5c(0x5a0)){function _0x195247(){const _0x3af630=_0x45b5c,_0x3a5c01=this[_0x3af630(0x588)]();_0x31ac27[_0x3af630(0x1f8)](_0x3af630(0x42f))&&this[_0x3af630(0x237)](_0x445214[_0x3af630(0x5e2)](this[_0x3af630(0x588)](),0x0)),_0x4d837d[_0x3af630(0x1f8)](_0x3af630(0x6c7))&&this[_0x3af630(0x237)](_0x2ece9c[_0x3af630(0x8a6)](this[_0x3af630(0x588)](),this[_0x3af630(0x5a8)]()-0x1)),this[_0x3af630(0x588)]()!==_0x3a5c01&&this['playCursorSound']();}}else{_0x43e75d-=_0x55a43a;if(_0x43e75d<=0x0)_0x43e75d=0x0;this[_0x45b5c(0x237)](_0x43e75d);}}else{if(!this['isUseModernControls']()){if(_0x43e75d>=_0x55a43a||_0x126e05&&_0x55a43a===0x1){if('WvAvy'==='WvAvy')this[_0x45b5c(0x237)]((_0x43e75d-_0x55a43a+_0x51e665)%_0x51e665);else{function _0x288028(){const _0x4b7ea0=_0x45b5c;return _0x52dee9['CoreEngine']['SceneManager_isGameActive'][_0x4b7ea0(0x64a)](this);}}}}}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x89d)]=Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x77b)],Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x77b)]=function(_0x5bfa19){const _0x1c7889=_0x2ef904;this[_0x1c7889(0x16c)]()&&_0x5bfa19&&this[_0x1c7889(0x525)]()===0x1&&this[_0x1c7889(0x588)]()===0x0?this[_0x1c7889(0x237)](this[_0x1c7889(0x5a8)]()-0x1):VisuMZ[_0x1c7889(0x6ac)][_0x1c7889(0x89d)][_0x1c7889(0x64a)](this,_0x5bfa19);},Window_Selectable[_0x2ef904(0x6a6)]['isUseModernControls']=function(){const _0x16a373=_0x2ef904;return VisuMZ['CoreEngine'][_0x16a373(0x5ba)][_0x16a373(0x788)][_0x16a373(0x777)];},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x554)]=Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x39f)],Window_Selectable['prototype']['processCursorMove']=function(){const _0x3dc15e=_0x2ef904;if(this[_0x3dc15e(0x16c)]()){if(_0x3dc15e(0x327)!==_0x3dc15e(0x327)){function _0x219039(){const _0x4444e1=_0x3dc15e;this[_0x4444e1(0x13d)](...arguments);}}else this['processCursorMoveModernControls'](),this['processCursorHomeEndTrigger']();}else VisuMZ[_0x3dc15e(0x6ac)][_0x3dc15e(0x554)][_0x3dc15e(0x64a)](this);},Window_Selectable['prototype']['allowShiftScrolling']=function(){return!![];},Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x691)]=function(){const _0x2fd489=_0x2ef904;if(this[_0x2fd489(0x748)]()){const _0x27cca6=this[_0x2fd489(0x588)]();if(Input[_0x2fd489(0x142)](_0x2fd489(0x181))){if(Input[_0x2fd489(0x860)](_0x2fd489(0x808))&&this[_0x2fd489(0x7cc)]())this[_0x2fd489(0x54e)]();else{if(_0x2fd489(0x572)===_0x2fd489(0x572))this[_0x2fd489(0x6ef)](Input['isTriggered']('down'));else{function _0x471983(){const _0x2a2af9=_0x2fd489;_0x40d1bd['alwaysDash']=!_0x502a6d[_0x2a2af9(0x241)],_0x390f98[_0x2a2af9(0x232)]();}}}}if(Input[_0x2fd489(0x142)]('up')){if(_0x2fd489(0x5ed)===_0x2fd489(0x458)){function _0x5950b0(){return 0x0;}}else Input[_0x2fd489(0x860)](_0x2fd489(0x808))&&this[_0x2fd489(0x7cc)]()?this['cursorPageup']():this['cursorUp'](Input[_0x2fd489(0x1f8)]('up'));}Input[_0x2fd489(0x142)](_0x2fd489(0x830))&&this['cursorRight'](Input[_0x2fd489(0x1f8)](_0x2fd489(0x830))),Input['isRepeated'](_0x2fd489(0x46b))&&this[_0x2fd489(0x643)](Input[_0x2fd489(0x1f8)](_0x2fd489(0x46b))),!this[_0x2fd489(0x1ae)](_0x2fd489(0x7a7))&&Input[_0x2fd489(0x142)](_0x2fd489(0x7a7))&&this['cursorPagedown'](),!this['isHandled'](_0x2fd489(0x54a))&&Input[_0x2fd489(0x142)](_0x2fd489(0x54a))&&this[_0x2fd489(0x838)](),this[_0x2fd489(0x588)]()!==_0x27cca6&&this[_0x2fd489(0x5a7)]();}},Window_Selectable['prototype'][_0x2ef904(0x512)]=function(){const _0x279f8e=_0x2ef904;if(this['isCursorMovable']()){const _0x4bd0a0=this[_0x279f8e(0x588)]();Input[_0x279f8e(0x1f8)]('home')&&this[_0x279f8e(0x237)](Math[_0x279f8e(0x5e2)](this[_0x279f8e(0x588)](),0x0));if(Input['isTriggered'](_0x279f8e(0x6c7))){if(_0x279f8e(0x648)===_0x279f8e(0x846)){function _0x3726c3(){const _0x4ef346=_0x279f8e;this[_0x4ef346(0x16c)]()?(this[_0x4ef346(0x691)](),this['processCursorHomeEndTrigger']()):_0x3c761b['CoreEngine'][_0x4ef346(0x554)]['call'](this);}}else this[_0x279f8e(0x237)](Math[_0x279f8e(0x8a6)](this[_0x279f8e(0x588)](),this['maxItems']()-0x1));}if(this[_0x279f8e(0x588)]()!==_0x4bd0a0){if(_0x279f8e(0x3c4)!=='AVdEj')this[_0x279f8e(0x5a7)]();else{function _0x20c7aa(){const _0x3d4de9=_0x279f8e,_0x3ca064=_0x23cd80[_0x3d4de9(0x6ac)][_0x3d4de9(0x5ba)]['ScreenShake'];if(_0x3ca064&&_0x3ca064['vertJS'])return _0x3ca064[_0x3d4de9(0x70e)][_0x3d4de9(0x64a)](this);const _0x552422=_0x376d13[_0x3d4de9(0x52e)]*0.75,_0xf4d6=_0x57ffdc[_0x3d4de9(0x729)]*0.6,_0x2c92d6=_0x109177[_0x3d4de9(0x769)];this['y']+=_0x54ccb2[_0x3d4de9(0x546)](_0x284e22['randomInt'](_0x552422)-_0x412682['randomInt'](_0xf4d6))*(_0x2e634d[_0x3d4de9(0x5e2)](_0x2c92d6,0x1e)*0.5);}}}}},VisuMZ['CoreEngine'][_0x2ef904(0x487)]=Window_Selectable['prototype'][_0x2ef904(0x623)],Window_Selectable['prototype'][_0x2ef904(0x623)]=function(){const _0x182be0=_0x2ef904;if(this[_0x182be0(0x16c)]())this[_0x182be0(0x2c6)]();else{if(_0x182be0(0x358)===_0x182be0(0x358))VisuMZ['CoreEngine'][_0x182be0(0x487)][_0x182be0(0x64a)](this);else{function _0x458b41(){const _0x43c1b6=_0x182be0;_0x539f39[_0x43c1b6(0x6ac)][_0x43c1b6(0x3fd)][_0x43c1b6(0x64a)](this),_0x3c7d46[_0x43c1b6(0x3f6)]&&!_0x3738fe[_0x43c1b6(0x1a0)]()&&(this[_0x43c1b6(0x3e6)](),_0x381ff1[_0x43c1b6(0x43b)]());}}}},Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x2c6)]=function(){const _0x5022a7=_0x2ef904;VisuMZ[_0x5022a7(0x6ac)][_0x5022a7(0x487)]['call'](this);},Window_Selectable[_0x2ef904(0x6a6)]['colSpacing']=function(){const _0x95e705=_0x2ef904;return VisuMZ[_0x95e705(0x6ac)][_0x95e705(0x5ba)][_0x95e705(0x5cf)][_0x95e705(0x577)];},Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x780)]=function(){const _0x47fcd2=_0x2ef904;return VisuMZ[_0x47fcd2(0x6ac)]['Settings']['Window'][_0x47fcd2(0x342)];},Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x77a)]=function(){const _0x254ed8=_0x2ef904;return Window_Scrollable['prototype'][_0x254ed8(0x77a)]['call'](this)+VisuMZ[_0x254ed8(0x6ac)][_0x254ed8(0x5ba)][_0x254ed8(0x5cf)][_0x254ed8(0x3af)];;},VisuMZ[_0x2ef904(0x6ac)]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x289)],Window_Selectable[_0x2ef904(0x6a6)][_0x2ef904(0x289)]=function(_0x6585df){const _0x2af388=_0x2ef904,_0x549acb=VisuMZ['CoreEngine'][_0x2af388(0x5ba)]['Window'];if(_0x549acb['ShowItemBackground']===![])return;_0x549acb[_0x2af388(0x553)]?_0x549acb['DrawItemBackgroundJS']['call'](this,_0x6585df):VisuMZ['CoreEngine'][_0x2af388(0x65a)][_0x2af388(0x64a)](this,_0x6585df);},VisuMZ[_0x2ef904(0x6ac)]['Window_Gold_refresh']=Window_Gold[_0x2ef904(0x6a6)][_0x2ef904(0x227)],Window_Gold[_0x2ef904(0x6a6)][_0x2ef904(0x227)]=function(){const _0xfdff7f=_0x2ef904;if(this[_0xfdff7f(0x72b)]()){if('QemCl'==='osyOb'){function _0x263388(){const _0xd9c24=_0xfdff7f;return _0x27339a[_0xd9c24(0x6ac)][_0xd9c24(0x5ba)][_0xd9c24(0x788)][_0xd9c24(0x658)];}}else this[_0xfdff7f(0x2e5)]();}else{if(_0xfdff7f(0x197)!==_0xfdff7f(0x197)){function _0x5b93b4(){const _0x3cf576=_0xfdff7f;_0x1fd528[_0x3cf576(0x6ac)][_0x3cf576(0x3e5)][_0x3cf576(0x64a)](this),this[_0x3cf576(0x26b)]();}}else VisuMZ[_0xfdff7f(0x6ac)][_0xfdff7f(0x153)][_0xfdff7f(0x64a)](this);}},Window_Gold['prototype']['isItemStyle']=function(){const _0x10d1c0=_0x2ef904;if(TextManager['currencyUnit']!==this[_0x10d1c0(0x4bc)]())return![];return VisuMZ[_0x10d1c0(0x6ac)][_0x10d1c0(0x5ba)][_0x10d1c0(0x2cf)][_0x10d1c0(0x7ee)];},Window_Gold['prototype'][_0x2ef904(0x2e5)]=function(){const _0x2f1a42=_0x2ef904;this['resetFontSettings'](),this['contents']['clear'](),this[_0x2f1a42(0x22b)]['fontSize']=VisuMZ[_0x2f1a42(0x6ac)][_0x2f1a42(0x5ba)]['Gold'][_0x2f1a42(0x625)];const _0x81e9ba=VisuMZ[_0x2f1a42(0x6ac)][_0x2f1a42(0x5ba)][_0x2f1a42(0x2cf)]['GoldIcon'],_0x9b1a43=this[_0x2f1a42(0x442)](0x0);if(_0x81e9ba>0x0){if(_0x2f1a42(0x459)===_0x2f1a42(0x2a1)){function _0x21a3a0(){const _0x423af1=_0x2f1a42;this[_0x423af1(0x1db)](_0x4ed536);}}else{const _0x5aae62=_0x9b1a43['y']+(this[_0x2f1a42(0x5fc)]()-ImageManager[_0x2f1a42(0x3a3)])/0x2;this[_0x2f1a42(0x752)](_0x81e9ba,_0x9b1a43['x'],_0x5aae62);const _0x385e49=ImageManager[_0x2f1a42(0x3b0)]+0x4;_0x9b1a43['x']+=_0x385e49,_0x9b1a43['width']-=_0x385e49;}}this[_0x2f1a42(0x444)](ColorManager[_0x2f1a42(0x79d)]()),this['drawText'](this[_0x2f1a42(0x4bc)](),_0x9b1a43['x'],_0x9b1a43['y'],_0x9b1a43[_0x2f1a42(0x849)],'left');const _0x24c566=this[_0x2f1a42(0x89e)](this[_0x2f1a42(0x4bc)]())+0x6;;_0x9b1a43['x']+=_0x24c566,_0x9b1a43[_0x2f1a42(0x849)]-=_0x24c566,this[_0x2f1a42(0x6e6)]();const _0x5eb21c=this[_0x2f1a42(0x895)](),_0x1c44ef=this['textWidth'](this[_0x2f1a42(0x492)]?VisuMZ[_0x2f1a42(0x686)](this[_0x2f1a42(0x895)]()):this[_0x2f1a42(0x895)]());if(_0x1c44ef>_0x9b1a43['width'])this[_0x2f1a42(0x3a1)](VisuMZ[_0x2f1a42(0x6ac)][_0x2f1a42(0x5ba)][_0x2f1a42(0x2cf)][_0x2f1a42(0x7c6)],_0x9b1a43['x'],_0x9b1a43['y'],_0x9b1a43[_0x2f1a42(0x849)],_0x2f1a42(0x830));else{if('DuJKi'===_0x2f1a42(0x43d)){function _0x9600f(){const _0x3ecc45=_0x2f1a42;return this[_0x3ecc45(0x64f)](_0x51153b);}}else this[_0x2f1a42(0x3a1)](this[_0x2f1a42(0x895)](),_0x9b1a43['x'],_0x9b1a43['y'],_0x9b1a43[_0x2f1a42(0x849)],_0x2f1a42(0x830));}this[_0x2f1a42(0x370)]();},Window_StatusBase[_0x2ef904(0x6a6)][_0x2ef904(0x206)]=function(_0x297fb1,_0x1c6cea,_0x3266a9,_0x4b3177,_0x4c5873){const _0x2675a3=_0x2ef904;_0x4b3177=String(_0x4b3177||'')[_0x2675a3(0x406)]();if(VisuMZ[_0x2675a3(0x6ac)][_0x2675a3(0x5ba)][_0x2675a3(0x663)][_0x2675a3(0x576)]){const _0x18627b=VisuMZ['GetParamIcon'](_0x4b3177);_0x4c5873?(this[_0x2675a3(0x6d0)](_0x18627b,_0x297fb1,_0x1c6cea,this[_0x2675a3(0x148)]()),_0x3266a9-=this['gaugeLineHeight']()+0x2,_0x297fb1+=this['gaugeLineHeight']()+0x2):(this[_0x2675a3(0x752)](_0x18627b,_0x297fb1+0x2,_0x1c6cea+0x2),_0x3266a9-=ImageManager['iconWidth']+0x4,_0x297fb1+=ImageManager[_0x2675a3(0x3b0)]+0x4);}const _0x2a1e57=TextManager[_0x2675a3(0x7e3)](_0x4b3177);this[_0x2675a3(0x370)](),this['changeTextColor'](ColorManager[_0x2675a3(0x79d)]());if(_0x4c5873){if('mSxFk'!==_0x2675a3(0x611))this[_0x2675a3(0x22b)][_0x2675a3(0x5e6)]=this[_0x2675a3(0x1d3)](),this[_0x2675a3(0x22b)]['drawText'](_0x2a1e57,_0x297fb1,_0x1c6cea,_0x3266a9,this[_0x2675a3(0x148)](),_0x2675a3(0x46b));else{function _0x4219fb(){const _0x2bda1d=_0x2675a3;this[_0x2bda1d(0x524)]();}}}else{if(_0x2675a3(0x189)==='nBBTM'){function _0xcfceea(){const _0x52f5cc=_0x2675a3;_0x307b58[_0x52f5cc(0x75b)]=!![],_0x3c7cd6['CoreEngine'][_0x52f5cc(0x2ea)][_0x52f5cc(0x64a)](this,_0x369739,_0x494679),_0x24654e[_0x52f5cc(0x75b)]=_0x2ceec2;}}else this[_0x2675a3(0x3a1)](_0x2a1e57,_0x297fb1,_0x1c6cea,_0x3266a9);}this[_0x2675a3(0x370)]();},Window_StatusBase[_0x2ef904(0x6a6)][_0x2ef904(0x1d3)]=function(){const _0x4bb069=_0x2ef904;return $gameSystem[_0x4bb069(0x5e8)]()-0x8;},Window_StatusBase[_0x2ef904(0x6a6)]['drawActorClass']=function(_0x130f39,_0x40a13a,_0x264ac1,_0x27f9c4){const _0x116cd3=_0x2ef904;_0x27f9c4=_0x27f9c4||0xa8,this[_0x116cd3(0x6e6)]();if(VisuMZ[_0x116cd3(0x6ac)][_0x116cd3(0x5ba)]['UI']['TextCodeClassNames'])this[_0x116cd3(0x22a)](_0x130f39[_0x116cd3(0x6ba)]()[_0x116cd3(0x1fd)],_0x40a13a,_0x264ac1,_0x27f9c4);else{const _0x451706=_0x130f39[_0x116cd3(0x6ba)]()[_0x116cd3(0x1fd)][_0x116cd3(0x1d1)](/\\I\[(\d+)\]/gi,'');this[_0x116cd3(0x3a1)](_0x451706,_0x40a13a,_0x264ac1,_0x27f9c4);}},Window_StatusBase[_0x2ef904(0x6a6)]['drawActorNickname']=function(_0x461201,_0x1694ae,_0x1bf2d8,_0x3ed829){const _0x1c6bae=_0x2ef904;_0x3ed829=_0x3ed829||0x10e,this[_0x1c6bae(0x6e6)]();if(VisuMZ['CoreEngine'][_0x1c6bae(0x5ba)]['UI'][_0x1c6bae(0x806)]){if(_0x1c6bae(0x1a4)!==_0x1c6bae(0x7b5))this[_0x1c6bae(0x22a)](_0x461201[_0x1c6bae(0x2c4)](),_0x1694ae,_0x1bf2d8,_0x3ed829);else{function _0x1d5519(){const _0x469eba=_0x1c6bae;this['_cache']={},_0x3bb09b[_0x469eba(0x6ac)][_0x469eba(0x4bf)][_0x469eba(0x64a)](this);}}}else{const _0x8d53f4=_0x461201[_0x1c6bae(0x2c4)]()[_0x1c6bae(0x1d1)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x461201[_0x1c6bae(0x2c4)](),_0x1694ae,_0x1bf2d8,_0x3ed829);}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x84a)]=Window_StatusBase[_0x2ef904(0x6a6)][_0x2ef904(0x2af)],Window_StatusBase['prototype'][_0x2ef904(0x2af)]=function(_0x285393,_0xa40638,_0x433df8){const _0x4fd35b=_0x2ef904;if(this[_0x4fd35b(0x802)]())this[_0x4fd35b(0x790)](_0x285393,_0xa40638,_0x433df8);VisuMZ[_0x4fd35b(0x6ac)][_0x4fd35b(0x84a)]['call'](this,_0x285393,_0xa40638,_0x433df8);},Window_StatusBase[_0x2ef904(0x6a6)]['isExpGaugeDrawn']=function(){const _0xedfe87=_0x2ef904;return VisuMZ[_0xedfe87(0x6ac)]['Settings']['UI'][_0xedfe87(0x6f6)];},Window_StatusBase['prototype']['drawActorExpGauge']=function(_0x4e171b,_0x5bf006,_0x2f995f){const _0x24bc0=_0x2ef904;if(!_0x4e171b)return;if(!_0x4e171b[_0x24bc0(0x6ae)]())return;const _0x49961e=0x80,_0x1a8fe9=_0x4e171b[_0x24bc0(0x1b7)]();let _0x5d6353=ColorManager[_0x24bc0(0x681)](),_0x1e5409=ColorManager[_0x24bc0(0x889)]();_0x1a8fe9>=0x1&&(_0x5d6353=ColorManager[_0x24bc0(0x7b3)](),_0x1e5409=ColorManager['maxLvGaugeColor2']()),this['drawGauge'](_0x5bf006,_0x2f995f,_0x49961e,_0x1a8fe9,_0x5d6353,_0x1e5409);},Window_EquipStatus['prototype'][_0x2ef904(0x425)]=function(){const _0xc50bfc=_0x2ef904;let _0x39205f=0x0;for(const _0x1ca3d4 of VisuMZ[_0xc50bfc(0x6ac)]['Settings'][_0xc50bfc(0x663)]['DisplayedParams']){const _0x2a7dc1=this[_0xc50bfc(0x559)](),_0x22f15d=this[_0xc50bfc(0x69e)](_0x39205f);this[_0xc50bfc(0x819)](_0x2a7dc1,_0x22f15d,_0x1ca3d4),_0x39205f++;}},Window_EquipStatus[_0x2ef904(0x6a6)][_0x2ef904(0x89b)]=function(_0x164a5b,_0x4225cd,_0x14071d){const _0x15fc01=_0x2ef904,_0x380f56=this[_0x15fc01(0x665)]()-this[_0x15fc01(0x559)]()*0x2;this[_0x15fc01(0x206)](_0x164a5b,_0x4225cd,_0x380f56,_0x14071d,![]);},Window_EquipStatus[_0x2ef904(0x6a6)]['drawCurrentParam']=function(_0x477be3,_0x3145f0,_0x5758b5){const _0x52f2dc=_0x2ef904,_0xf6b143=this[_0x52f2dc(0x5a2)]();this[_0x52f2dc(0x6e6)](),this[_0x52f2dc(0x3a1)](this[_0x52f2dc(0x479)][_0x52f2dc(0x785)](_0x5758b5,!![]),_0x477be3,_0x3145f0,_0xf6b143,_0x52f2dc(0x830));},Window_EquipStatus['prototype'][_0x2ef904(0x7bb)]=function(_0x40b594,_0x36e9f0){const _0x36e768=_0x2ef904,_0x5dd187=this[_0x36e768(0x502)]();this[_0x36e768(0x444)](ColorManager[_0x36e768(0x79d)]());const _0x2153d9=VisuMZ[_0x36e768(0x6ac)][_0x36e768(0x5ba)]['UI'][_0x36e768(0x308)];this[_0x36e768(0x3a1)](_0x2153d9,_0x40b594,_0x36e9f0,_0x5dd187,_0x36e768(0x67e));},Window_EquipStatus[_0x2ef904(0x6a6)]['drawNewParam']=function(_0x10867d,_0x19fa3b,_0x193757){const _0x56a4a4=_0x2ef904,_0x101e71=this['paramWidth'](),_0x17e8c4=this[_0x56a4a4(0x564)][_0x56a4a4(0x785)](_0x193757),_0x58674e=_0x17e8c4-this[_0x56a4a4(0x479)]['paramValueByName'](_0x193757);this[_0x56a4a4(0x444)](ColorManager[_0x56a4a4(0x498)](_0x58674e)),this[_0x56a4a4(0x3a1)](this[_0x56a4a4(0x564)][_0x56a4a4(0x785)](_0x193757,!![]),_0x10867d,_0x19fa3b,_0x101e71,'right');},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x4d3)]=Window_EquipItem['prototype'][_0x2ef904(0x18c)],Window_EquipItem[_0x2ef904(0x6a6)][_0x2ef904(0x18c)]=function(_0x20a2c8){const _0x5575cb=_0x2ef904;if(_0x20a2c8&&this[_0x5575cb(0x479)])return this['_actor'][_0x5575cb(0x3e4)](_0x20a2c8);else{if(_0x5575cb(0x7d6)!==_0x5575cb(0x7d6)){function _0x423075(){const _0x12215b=_0x5575cb;if(_0x57920c&&_0x43a236[_0x12215b(0x279)]){if(this[_0x12215b(0x490)](_0x5e71f5))return!![];}}}else return VisuMZ[_0x5575cb(0x6ac)][_0x5575cb(0x4d3)]['call'](this,_0x20a2c8);}},Window_StatusParams[_0x2ef904(0x6a6)]['maxItems']=function(){const _0x410978=_0x2ef904;return VisuMZ[_0x410978(0x6ac)][_0x410978(0x5ba)][_0x410978(0x663)][_0x410978(0x398)][_0x410978(0x862)];},Window_StatusParams[_0x2ef904(0x6a6)][_0x2ef904(0x819)]=function(_0x2c0bb9){const _0xa62cde=_0x2ef904,_0x3dc3b1=this[_0xa62cde(0x442)](_0x2c0bb9),_0x204332=VisuMZ[_0xa62cde(0x6ac)][_0xa62cde(0x5ba)][_0xa62cde(0x663)][_0xa62cde(0x398)][_0x2c0bb9],_0x449b4f=TextManager[_0xa62cde(0x7e3)](_0x204332),_0x4abb10=this[_0xa62cde(0x479)]['paramValueByName'](_0x204332,!![]);this['drawParamText'](_0x3dc3b1['x'],_0x3dc3b1['y'],0xa0,_0x204332,![]),this[_0xa62cde(0x6e6)](),this[_0xa62cde(0x3a1)](_0x4abb10,_0x3dc3b1['x']+0xa0,_0x3dc3b1['y'],0x3c,_0xa62cde(0x830));};if(VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x49e)][_0x2ef904(0x50f)]){VisuMZ[_0x2ef904(0x6ac)]['Settings'][_0x2ef904(0x49e)][_0x2ef904(0x7fb)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x2ef904(0x34f),'OK']);;VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x6ca)]=Window_NameInput[_0x2ef904(0x6a6)]['initialize'],Window_NameInput[_0x2ef904(0x6a6)][_0x2ef904(0x13d)]=function(_0x386692){const _0x438a9b=_0x2ef904;this['_mode']=this[_0x438a9b(0x5a6)](),VisuMZ[_0x438a9b(0x6ac)]['Window_NameInput_initialize'][_0x438a9b(0x64a)](this,_0x386692);if(this[_0x438a9b(0x827)]===_0x438a9b(0x166))this['select'](0x0);else{if('wxdqG'!==_0x438a9b(0x231))Input[_0x438a9b(0x57b)](),this[_0x438a9b(0x341)]();else{function _0x289751(){const _0x428e8c=_0x438a9b;_0x59753a=_0x33a55c[_0x428e8c(0x3f2)](_0x5e4b8a),_0xa5589f['se']&&(_0x52ac7c['se']['volume']=0x0);}}}},Window_NameInput['prototype']['defaultInputMode']=function(){const _0x156373=_0x2ef904;if(Input[_0x156373(0x71f)]())return _0x156373(0x166);return VisuMZ['CoreEngine']['Settings'][_0x156373(0x49e)][_0x156373(0x1af)]||_0x156373(0x297);},VisuMZ['CoreEngine'][_0x2ef904(0x39c)]=Window_NameInput['prototype']['processHandling'],Window_NameInput[_0x2ef904(0x6a6)][_0x2ef904(0x30c)]=function(){const _0x26be7c=_0x2ef904;if(!this['isOpen']())return;if(!this[_0x26be7c(0x555)])return;if(this[_0x26be7c(0x827)]===_0x26be7c(0x297)&&Input['isGamepadTriggered']())this['switchModes'](_0x26be7c(0x166));else{if(Input[_0x26be7c(0x75f)](_0x26be7c(0x1f0)))Input[_0x26be7c(0x57b)](),this[_0x26be7c(0x6e2)]();else{if(Input['isTriggered'](_0x26be7c(0x7c8))){if('aUspQ'!==_0x26be7c(0x217)){function _0x4aa4aa(){const _0x4175a4=_0x26be7c;if(_0x59ea85)_0x244833[_0x4175a4(0x190)](_0x179b6c);}}else{Input['clear']();if(this[_0x26be7c(0x827)]===_0x26be7c(0x297)){if(_0x26be7c(0x2c9)!==_0x26be7c(0x2c9)){function _0x2c699c(){const _0x223a0c=_0x26be7c;if(_0x123349[_0x223a0c(0x7be)]())_0x27e4f4['log'](_0x4a89e6);}}else this[_0x26be7c(0x6a7)](_0x26be7c(0x166));}else this[_0x26be7c(0x6a7)](_0x26be7c(0x297));}}else{if(this['_mode']===_0x26be7c(0x297)){if(_0x26be7c(0x2d0)!==_0x26be7c(0x2d0)){function _0x7d87fd(){const _0x556e78=_0x26be7c;this[_0x556e78(0x622)][_0x38e414]=_0x556e78(0x76d)[_0x556e78(0x764)](_0x474958(_0x303167['$1']));}}else this[_0x26be7c(0x14b)]();}else Input[_0x26be7c(0x75f)](_0x26be7c(0x37f))?(Input[_0x26be7c(0x57b)](),this[_0x26be7c(0x6a7)](_0x26be7c(0x297))):VisuMZ[_0x26be7c(0x6ac)][_0x26be7c(0x39c)][_0x26be7c(0x64a)](this);}}}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x812)]=Window_NameInput['prototype'][_0x2ef904(0x623)],Window_NameInput[_0x2ef904(0x6a6)][_0x2ef904(0x623)]=function(){const _0x1e8169=_0x2ef904;if(!this[_0x1e8169(0x636)]())return;if(this[_0x1e8169(0x827)]===_0x1e8169(0x297)){if(TouchInput[_0x1e8169(0x1f8)]()&&this[_0x1e8169(0x6fa)]())this[_0x1e8169(0x6a7)](_0x1e8169(0x166));else{if(TouchInput[_0x1e8169(0x49a)]()){if(_0x1e8169(0x2aa)!==_0x1e8169(0x20d))this['switchModes']('default');else{function _0x29c9c2(){const _0x5810ae=_0x1e8169;this[_0x5810ae(0x286)]||this[_0x5810ae(0x251)]?this[_0x5810ae(0x70f)]=0xff:(this[_0x5810ae(0x70f)]+=this[_0x5810ae(0x599)]?this[_0x5810ae(0x1b8)]():-0x1*this[_0x5810ae(0x1b8)](),this['opacity']=_0xb01bb1[_0x5810ae(0x5e2)](0xc0,this[_0x5810ae(0x70f)]));}}}}}else VisuMZ[_0x1e8169(0x6ac)][_0x1e8169(0x812)][_0x1e8169(0x64a)](this);},Window_NameInput[_0x2ef904(0x6a6)][_0x2ef904(0x14b)]=function(){const _0x3a72d2=_0x2ef904;if(Input[_0x3a72d2(0x75f)](_0x3a72d2(0x440))){if(_0x3a72d2(0x54f)!=='BymDJ')Input[_0x3a72d2(0x57b)](),this[_0x3a72d2(0x872)]();else{function _0x43eec6(){const _0x272d21=_0x3a72d2;_0x5de65f[_0x272d21(0x57b)](),this[_0x272d21(0x872)]();}}}else{if(Input['_inputString']!==undefined){if(_0x3a72d2(0x88a)!==_0x3a72d2(0x6a3)){let _0x215d5c=Input[_0x3a72d2(0x30a)],_0x1c5b37=_0x215d5c[_0x3a72d2(0x862)];for(let _0x920471=0x0;_0x920471<_0x1c5b37;++_0x920471){if(_0x3a72d2(0x743)!==_0x3a72d2(0x3a9)){if(this[_0x3a72d2(0x544)][_0x3a72d2(0x624)](_0x215d5c[_0x920471])){if('zIYOi'!==_0x3a72d2(0x46d)){function _0xf744b0(){const _0x5f5dbf=_0x3a72d2;this[_0x5f5dbf(0x643)](_0x3e53f7['isTriggered']('left'));}}else SoundManager[_0x3a72d2(0x263)]();}else SoundManager[_0x3a72d2(0x5c6)]();}else{function _0xdebc1(){const _0x38ad21=_0x3a72d2;this['_muteSound']&&(_0x34673c=_0x1ed685[_0x38ad21(0x3f2)](_0xcee67b),_0x10cc69['se']&&(_0x20231f['se']['volume']=0x0)),_0x1310b6['CoreEngine'][_0x38ad21(0x887)][_0x38ad21(0x64a)](this,_0x1a3dc5);}}}Input[_0x3a72d2(0x57b)]();}else{function _0x4ebf11(){const _0x50a718=_0x3a72d2;return _0x16d6e7[_0x50a718(0x6ac)][_0x50a718(0x5ba)][_0x50a718(0x2cf)][_0x50a718(0x2d4)];}}}}},Window_NameInput[_0x2ef904(0x6a6)]['switchModes']=function(_0x2737e3){const _0x226574=_0x2ef904;let _0x36644b=this[_0x226574(0x827)];this[_0x226574(0x827)]=_0x2737e3;if(_0x36644b!==this[_0x226574(0x827)]){if(_0x226574(0x31f)!==_0x226574(0x31f)){function _0x113d1b(){return 0x1;}}else{this[_0x226574(0x227)](),SoundManager['playOk']();if(this[_0x226574(0x827)]===_0x226574(0x166)){if(_0x226574(0x2dc)===_0x226574(0x2dc))this[_0x226574(0x5fe)](0x0);else{function _0x239eb0(){const _0xd9f214=_0x226574;if(_0xbeedb[_0xd9f214(0x7be)]()){const _0x1366b4=_0x473e6f[_0xd9f214(0x6ac)]['Settings']['QoL'][_0xd9f214(0x198)];if(_0x1366b4>0x0)_0xa5b23[_0xd9f214(0x705)](_0x1366b4);}}}}else this[_0x226574(0x5fe)](-0x1);}}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x480)]=Window_NameInput['prototype'][_0x2ef904(0x6ef)],Window_NameInput[_0x2ef904(0x6a6)]['cursorDown']=function(_0x3dd7b0){const _0x54339c=_0x2ef904;if(this['_mode']===_0x54339c(0x297)&&!Input[_0x54339c(0x3b4)]())return;if(Input[_0x54339c(0x5b1)]())return;VisuMZ['CoreEngine'][_0x54339c(0x480)]['call'](this,_0x3dd7b0),this[_0x54339c(0x6a7)]('default');},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x1ec)]=Window_NameInput[_0x2ef904(0x6a6)]['cursorUp'],Window_NameInput[_0x2ef904(0x6a6)][_0x2ef904(0x77b)]=function(_0x26a706){const _0x240d13=_0x2ef904;if(this[_0x240d13(0x827)]===_0x240d13(0x297)&&!Input[_0x240d13(0x3b4)]())return;if(Input[_0x240d13(0x5b1)]())return;VisuMZ[_0x240d13(0x6ac)][_0x240d13(0x1ec)][_0x240d13(0x64a)](this,_0x26a706),this[_0x240d13(0x6a7)]('default');},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x594)]=Window_NameInput['prototype'][_0x2ef904(0x2b6)],Window_NameInput['prototype'][_0x2ef904(0x2b6)]=function(_0x5eff99){const _0x396989=_0x2ef904;if(this[_0x396989(0x827)]==='keyboard'&&!Input[_0x396989(0x3b4)]())return;if(Input[_0x396989(0x5b1)]())return;VisuMZ[_0x396989(0x6ac)][_0x396989(0x594)][_0x396989(0x64a)](this,_0x5eff99),this[_0x396989(0x6a7)]('default');},VisuMZ['CoreEngine']['Window_NameInput_cursorLeft']=Window_NameInput['prototype'][_0x2ef904(0x643)],Window_NameInput[_0x2ef904(0x6a6)][_0x2ef904(0x643)]=function(_0xc60dd6){const _0x2e4938=_0x2ef904;if(this[_0x2e4938(0x827)]===_0x2e4938(0x297)&&!Input['isArrowPressed']())return;if(Input[_0x2e4938(0x5b1)]())return;VisuMZ[_0x2e4938(0x6ac)]['Window_NameInput_cursorLeft'][_0x2e4938(0x64a)](this,_0xc60dd6),this[_0x2e4938(0x6a7)](_0x2e4938(0x166));},VisuMZ[_0x2ef904(0x6ac)]['Window_NameInput_cursorPagedown']=Window_NameInput[_0x2ef904(0x6a6)]['cursorPagedown'],Window_NameInput['prototype'][_0x2ef904(0x54e)]=function(){const _0x4b38f9=_0x2ef904;if(this[_0x4b38f9(0x827)]==='keyboard')return;if(Input[_0x4b38f9(0x5b1)]())return;VisuMZ[_0x4b38f9(0x6ac)][_0x4b38f9(0x170)][_0x4b38f9(0x64a)](this),this[_0x4b38f9(0x6a7)](_0x4b38f9(0x166));},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x778)]=Window_NameInput[_0x2ef904(0x6a6)]['cursorPageup'],Window_NameInput['prototype'][_0x2ef904(0x838)]=function(){const _0x212889=_0x2ef904;if(this[_0x212889(0x827)]==='keyboard')return;if(Input[_0x212889(0x5b1)]())return;VisuMZ[_0x212889(0x6ac)][_0x212889(0x778)][_0x212889(0x64a)](this),this['switchModes'](_0x212889(0x166));},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x1bf)]=Window_NameInput[_0x2ef904(0x6a6)][_0x2ef904(0x227)],Window_NameInput[_0x2ef904(0x6a6)]['refresh']=function(){const _0x5b907c=_0x2ef904;if(this['_mode']==='keyboard'){if(_0x5b907c(0x618)===_0x5b907c(0x304)){function _0x2fad2a(){const _0x441b01=_0x5b907c;this[_0x441b01(0x3b2)]={},_0x3ab8a0[_0x441b01(0x6a6)]['initialize'][_0x441b01(0x64a)](this,_0x881f21),this[_0x441b01(0x223)](_0x8f10b[_0x441b01(0x6ac)][_0x441b01(0x5ba)][_0x441b01(0x3f8)][_0x441b01(0x1d4)]||0x0),this[_0x441b01(0x227)]();}}else{this[_0x5b907c(0x22b)][_0x5b907c(0x57b)](),this['contentsBack'][_0x5b907c(0x57b)](),this[_0x5b907c(0x6e6)]();let _0x70de21=VisuMZ[_0x5b907c(0x6ac)]['Settings'][_0x5b907c(0x49e)][_0x5b907c(0x6fe)][_0x5b907c(0x414)]('\x0a'),_0x1591da=_0x70de21['length'],_0x26e3b3=(this[_0x5b907c(0x550)]-_0x1591da*this['lineHeight']())/0x2;for(let _0x2b5858=0x0;_0x2b5858<_0x1591da;++_0x2b5858){let _0x384a5c=_0x70de21[_0x2b5858],_0x2ebf22=this[_0x5b907c(0x6d4)](_0x384a5c)[_0x5b907c(0x849)],_0x2c5065=Math[_0x5b907c(0x661)]((this[_0x5b907c(0x22b)][_0x5b907c(0x849)]-_0x2ebf22)/0x2);this[_0x5b907c(0x22a)](_0x384a5c,_0x2c5065,_0x26e3b3),_0x26e3b3+=this[_0x5b907c(0x5fc)]();}}}else{if(_0x5b907c(0x2eb)!==_0x5b907c(0x2eb)){function _0x61f1da(){const _0x47bff4=_0x5b907c,_0x1aa0a6=_0x2a0495[_0x47bff4(0x4a8)];for(let _0x151e81=0x1;_0x151e81<=0x5;_0x151e81++){if(this['_data'][_0x47bff4(0x4c2)[_0x47bff4(0x764)](_0x151e81)]!==_0x1aa0a6['buttonAssistKey%1'[_0x47bff4(0x764)](_0x151e81)]())return this[_0x47bff4(0x227)]();if(this[_0x47bff4(0x3b2)][_0x47bff4(0x296)[_0x47bff4(0x764)](_0x151e81)]!==_0x1aa0a6[_0x47bff4(0x614)[_0x47bff4(0x764)](_0x151e81)]())return this[_0x47bff4(0x227)]();}}}else VisuMZ[_0x5b907c(0x6ac)][_0x5b907c(0x1bf)][_0x5b907c(0x64a)](this);}};};VisuMZ[_0x2ef904(0x6ac)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x2ef904(0x6a6)]['isEnabled'],Window_ShopSell[_0x2ef904(0x6a6)][_0x2ef904(0x18c)]=function(_0x15ff2d){const _0x37ac22=_0x2ef904;if(VisuMZ[_0x37ac22(0x6ac)][_0x37ac22(0x5ba)][_0x37ac22(0x788)][_0x37ac22(0x86e)]&&DataManager[_0x37ac22(0x4b4)](_0x15ff2d)){if(_0x37ac22(0x67b)!==_0x37ac22(0x3b7))return![];else{function _0x4b050f(){const _0x2a7d11=_0x37ac22;_0x506a74[_0x2a7d11(0x6d9)](_0x3ec234,_0x35647a);}}}else return VisuMZ['CoreEngine'][_0x37ac22(0x34c)][_0x37ac22(0x64a)](this,_0x15ff2d);},Window_NumberInput[_0x2ef904(0x6a6)][_0x2ef904(0x16c)]=function(){return![];};VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x5ba)][_0x2ef904(0x49e)][_0x2ef904(0x216)]&&(VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x567)]=Window_NumberInput[_0x2ef904(0x6a6)][_0x2ef904(0x804)],Window_NumberInput[_0x2ef904(0x6a6)][_0x2ef904(0x804)]=function(){const _0x1f8ec8=_0x2ef904;VisuMZ['CoreEngine']['Window_NumberInput_start'][_0x1f8ec8(0x64a)](this),this['select'](this[_0x1f8ec8(0x3f9)]-0x1);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x3c8)]=Window_NumberInput[_0x2ef904(0x6a6)][_0x2ef904(0x340)],Window_NumberInput[_0x2ef904(0x6a6)]['processDigitChange']=function(){const _0x55f346=_0x2ef904;if(!this[_0x55f346(0x636)]())return;if(Input[_0x55f346(0x5b1)]())this[_0x55f346(0x2da)]();else{if(Input[_0x55f346(0x75f)](_0x55f346(0x1f0)))this[_0x55f346(0x20f)]();else{if(Input[_0x55f346(0x4da)]===0x2e)this[_0x55f346(0x524)]();else{if(Input[_0x55f346(0x4da)]===0x24)this[_0x55f346(0x7c9)]();else Input[_0x55f346(0x4da)]===0x23?this[_0x55f346(0x710)]():(VisuMZ[_0x55f346(0x6ac)]['Window_NumberInput_processDigitChange']['call'](this),Input[_0x55f346(0x57b)]());}}}},Window_NumberInput['prototype'][_0x2ef904(0x39f)]=function(){const _0x349b47=_0x2ef904;if(!this[_0x349b47(0x748)]())return;if(Input[_0x349b47(0x5b1)]()){if(_0x349b47(0x1a7)==='uCvIX'){function _0x3f069b(){const _0x21643e=_0x349b47,_0x1215f0=_0x26c8c0[_0x21643e(0x891)](_0x554afc,_0x54de77)[_0x21643e(0x31d)](_0x3f15aa=>_0x3f15aa[_0x21643e(0x2a4)]());return _0x1215f0['length']>0x0;}}else this[_0x349b47(0x2da)]();}else Window_Selectable[_0x349b47(0x6a6)][_0x349b47(0x39f)][_0x349b47(0x64a)](this);},Window_NumberInput['prototype'][_0x2ef904(0x512)]=function(){},Window_NumberInput['prototype']['processKeyboardDigitChange']=function(){const _0x531e53=_0x2ef904;if(String(this[_0x531e53(0x154)])['length']>=this[_0x531e53(0x3f9)])return;this[_0x531e53(0x154)]=Number(String(this[_0x531e53(0x154)])+Input[_0x531e53(0x30a)]);const _0x3ba2d='9'[_0x531e53(0x7f3)](this[_0x531e53(0x3f9)]);this['_number']=this['_number'][_0x531e53(0x7b9)](0x0,_0x3ba2d),Input[_0x531e53(0x57b)](),this['refresh'](),SoundManager[_0x531e53(0x47c)](),this[_0x531e53(0x5fe)](this[_0x531e53(0x3f9)]-0x1);},Window_NumberInput[_0x2ef904(0x6a6)]['processKeyboardBackspace']=function(){const _0x3044ca=_0x2ef904;this[_0x3044ca(0x154)]=Number(String(this[_0x3044ca(0x154)])[_0x3044ca(0x683)](0x0,-0x1)),this[_0x3044ca(0x154)]=Math[_0x3044ca(0x8a6)](0x0,this[_0x3044ca(0x154)]),Input[_0x3044ca(0x57b)](),this['refresh'](),SoundManager[_0x3044ca(0x47c)](),this[_0x3044ca(0x5fe)](this['_maxDigits']-0x1);},Window_NumberInput[_0x2ef904(0x6a6)][_0x2ef904(0x524)]=function(){const _0x3e8955=_0x2ef904;this[_0x3e8955(0x154)]=Number(String(this['_number'])[_0x3e8955(0x32c)](0x1)),this[_0x3e8955(0x154)]=Math[_0x3e8955(0x8a6)](0x0,this[_0x3e8955(0x154)]),Input['clear'](),this[_0x3e8955(0x227)](),SoundManager[_0x3e8955(0x47c)](),this[_0x3e8955(0x5fe)](this[_0x3e8955(0x3f9)]-0x1);});;Window_TitleCommand[_0x2ef904(0x630)]=VisuMZ['CoreEngine']['Settings'][_0x2ef904(0x40f)],Window_TitleCommand[_0x2ef904(0x6a6)]['makeCommandList']=function(){const _0x1fd1af=_0x2ef904;this[_0x1fd1af(0x361)]();},Window_TitleCommand[_0x2ef904(0x6a6)][_0x2ef904(0x361)]=function(){const _0x27555e=_0x2ef904;for(const _0x50cd02 of Window_TitleCommand['_commandList']){if(_0x50cd02[_0x27555e(0x520)][_0x27555e(0x64a)](this)){const _0x544868=_0x50cd02[_0x27555e(0x858)];let _0x1ae813=_0x50cd02[_0x27555e(0x530)];if(['',_0x27555e(0x200)][_0x27555e(0x352)](_0x1ae813))_0x1ae813=_0x50cd02[_0x27555e(0x57a)][_0x27555e(0x64a)](this);const _0x5433b3=_0x50cd02[_0x27555e(0x15b)][_0x27555e(0x64a)](this),_0x2843f5=_0x50cd02[_0x27555e(0x86b)][_0x27555e(0x64a)](this);this[_0x27555e(0x5fb)](_0x1ae813,_0x544868,_0x5433b3,_0x2843f5),this['setHandler'](_0x544868,_0x50cd02[_0x27555e(0x140)][_0x27555e(0x617)](this,_0x2843f5));}}},Window_GameEnd[_0x2ef904(0x630)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x2ef904(0x354)][_0x2ef904(0x167)],Window_GameEnd[_0x2ef904(0x6a6)][_0x2ef904(0x474)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd['prototype'][_0x2ef904(0x361)]=function(){const _0x4fd018=_0x2ef904;for(const _0x2a99a5 of Window_GameEnd['_commandList']){if(_0x4fd018(0x7ba)===_0x4fd018(0x4f9)){function _0x27b2bb(){const _0xdc76d5=_0x4fd018;this[_0xdc76d5(0x60d)]=!![],this[_0xdc76d5(0x3df)](),_0x5659af[_0xdc76d5(0x43b)](),this[_0xdc76d5(0x60d)]=![];}}else{if(_0x2a99a5['ShowJS'][_0x4fd018(0x64a)](this)){if(_0x4fd018(0x7cb)!==_0x4fd018(0x7cb)){function _0x5aac90(){const _0x5cbd67=_0x4fd018;_0x438e4d[_0x5cbd67(0x6ac)][_0x5cbd67(0x7e5)][_0x5cbd67(0x64a)](this,_0x3ed463,_0x9838c0,_0x5bf7ce,_0x573fcb);}}else{const _0x380b2f=_0x2a99a5['Symbol'];let _0x4e204f=_0x2a99a5[_0x4fd018(0x530)];if(['','Untitled']['includes'](_0x4e204f))_0x4e204f=_0x2a99a5[_0x4fd018(0x57a)]['call'](this);const _0x54cddf=_0x2a99a5['EnableJS'][_0x4fd018(0x64a)](this),_0x3f5b93=_0x2a99a5[_0x4fd018(0x86b)][_0x4fd018(0x64a)](this);this[_0x4fd018(0x5fb)](_0x4e204f,_0x380b2f,_0x54cddf,_0x3f5b93),this[_0x4fd018(0x659)](_0x380b2f,_0x2a99a5[_0x4fd018(0x140)][_0x4fd018(0x617)](this,_0x3f5b93));}}}}};function Window_ButtonAssist(){const _0x232b96=_0x2ef904;this[_0x232b96(0x13d)](...arguments);}Window_ButtonAssist['prototype']=Object[_0x2ef904(0x62b)](Window_Base[_0x2ef904(0x6a6)]),Window_ButtonAssist[_0x2ef904(0x6a6)][_0x2ef904(0x1fb)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x2ef904(0x13d)]=function(_0x521f11){const _0x4ad72d=_0x2ef904;this[_0x4ad72d(0x3b2)]={},Window_Base['prototype']['initialize'][_0x4ad72d(0x64a)](this,_0x521f11),this[_0x4ad72d(0x223)](VisuMZ[_0x4ad72d(0x6ac)][_0x4ad72d(0x5ba)][_0x4ad72d(0x3f8)][_0x4ad72d(0x1d4)]||0x0),this[_0x4ad72d(0x227)]();},Window_ButtonAssist[_0x2ef904(0x6a6)]['makeFontBigger']=function(){const _0x29ba38=_0x2ef904;if(this[_0x29ba38(0x22b)]['fontSize']<=0x60){if(_0x29ba38(0x696)===_0x29ba38(0x696))this[_0x29ba38(0x22b)][_0x29ba38(0x5e6)]+=0x6;else{function _0x86d86a(){const _0x43de6a=_0x29ba38;this[_0x43de6a(0x561)](_0x604ec7);}}}},Window_ButtonAssist['prototype'][_0x2ef904(0x519)]=function(){const _0x5695d4=_0x2ef904;this['contents'][_0x5695d4(0x5e6)]>=0x18&&(this[_0x5695d4(0x22b)][_0x5695d4(0x5e6)]-=0x6);},Window_ButtonAssist[_0x2ef904(0x6a6)][_0x2ef904(0x3df)]=function(){const _0x2028f4=_0x2ef904;Window_Base[_0x2028f4(0x6a6)][_0x2028f4(0x3df)][_0x2028f4(0x64a)](this),this['updateKeyText']();},Window_ButtonAssist['prototype']['updatePadding']=function(){const _0x31d56c=_0x2ef904;this[_0x31d56c(0x1ea)]=SceneManager[_0x31d56c(0x4a8)][_0x31d56c(0x328)]()!==_0x31d56c(0x568)?0x0:0x8;},Window_ButtonAssist[_0x2ef904(0x6a6)][_0x2ef904(0x2f5)]=function(){const _0xd84fca=_0x2ef904,_0x210922=SceneManager[_0xd84fca(0x4a8)];for(let _0x18671f=0x1;_0x18671f<=0x5;_0x18671f++){if(_0xd84fca(0x1b6)!==_0xd84fca(0x301)){if(this[_0xd84fca(0x3b2)][_0xd84fca(0x4c2)['format'](_0x18671f)]!==_0x210922[_0xd84fca(0x313)[_0xd84fca(0x764)](_0x18671f)]())return this[_0xd84fca(0x227)]();if(this[_0xd84fca(0x3b2)][_0xd84fca(0x296)[_0xd84fca(0x764)](_0x18671f)]!==_0x210922['buttonAssistText%1'['format'](_0x18671f)]()){if(_0xd84fca(0x4c5)===_0xd84fca(0x4c5))return this[_0xd84fca(0x227)]();else{function _0x3eb7e1(){const _0x2e38ab=_0xd84fca;_0x3849c1[_0x2e38ab(0x6ac)][_0x2e38ab(0x73c)][_0x2e38ab(0x64a)](this,_0x111de4),this[_0x2e38ab(0x73e)]();}}}}else{function _0x207771(){const _0xc35631=_0xd84fca;return _0x2735b1[_0xc35631(0x27e)](_0x5de9a9,'[',']');}}}},Window_ButtonAssist[_0x2ef904(0x6a6)][_0x2ef904(0x227)]=function(){const _0x34b0d8=_0x2ef904;this[_0x34b0d8(0x22b)][_0x34b0d8(0x57b)]();for(let _0x142b6b=0x1;_0x142b6b<=0x5;_0x142b6b++){this[_0x34b0d8(0x86f)](_0x142b6b);}},Window_ButtonAssist[_0x2ef904(0x6a6)][_0x2ef904(0x86f)]=function(_0x39ecd0){const _0x3d9c6e=_0x2ef904,_0x5a69f2=this[_0x3d9c6e(0x2e2)]/0x5,_0x146a3a=SceneManager[_0x3d9c6e(0x4a8)],_0x4bf773=_0x146a3a['buttonAssistKey%1'['format'](_0x39ecd0)](),_0x1ece86=_0x146a3a['buttonAssistText%1'[_0x3d9c6e(0x764)](_0x39ecd0)]();this[_0x3d9c6e(0x3b2)]['key%1'[_0x3d9c6e(0x764)](_0x39ecd0)]=_0x4bf773,this['_data'][_0x3d9c6e(0x296)['format'](_0x39ecd0)]=_0x1ece86;if(_0x4bf773==='')return;if(_0x1ece86==='')return;const _0x3cdfce=_0x146a3a[_0x3d9c6e(0x5cb)[_0x3d9c6e(0x764)](_0x39ecd0)](),_0x1eeb0f=this['itemPadding'](),_0x3ac2a1=_0x5a69f2*(_0x39ecd0-0x1)+_0x1eeb0f+_0x3cdfce,_0x311d9e=VisuMZ[_0x3d9c6e(0x6ac)][_0x3d9c6e(0x5ba)][_0x3d9c6e(0x3f8)][_0x3d9c6e(0x470)];this[_0x3d9c6e(0x22a)](_0x311d9e[_0x3d9c6e(0x764)](_0x4bf773,_0x1ece86),_0x3ac2a1,0x0,_0x5a69f2-_0x1eeb0f*0x2);},VisuMZ[_0x2ef904(0x423)]=function(_0x28879b){const _0x225a83=_0x2ef904;if(Utils[_0x225a83(0x693)](_0x225a83(0x86c))){var _0x1190df=require(_0x225a83(0x6c1))[_0x225a83(0x5cf)]['get']();SceneManager[_0x225a83(0x839)]();if(_0x28879b)setTimeout(_0x1190df[_0x225a83(0x6c9)][_0x225a83(0x617)](_0x1190df),0x190);}},VisuMZ[_0x2ef904(0x53f)]=function(_0x167435,_0x2eef72){const _0x5bdb2f=_0x2ef904;_0x2eef72=_0x2eef72['toUpperCase']();var _0x150e0e=1.70158,_0x41477c=0.7;switch(_0x2eef72){case'LINEAR':return _0x167435;case _0x5bdb2f(0x562):return-0x1*Math[_0x5bdb2f(0x450)](_0x167435*(Math['PI']/0x2))+0x1;case _0x5bdb2f(0x68e):return Math[_0x5bdb2f(0x7bd)](_0x167435*(Math['PI']/0x2));case _0x5bdb2f(0x3d5):return-0.5*(Math['cos'](Math['PI']*_0x167435)-0x1);case'INQUAD':return _0x167435*_0x167435;case _0x5bdb2f(0x31e):return _0x167435*(0x2-_0x167435);case _0x5bdb2f(0x152):return _0x167435<0.5?0x2*_0x167435*_0x167435:-0x1+(0x4-0x2*_0x167435)*_0x167435;case _0x5bdb2f(0x25b):return _0x167435*_0x167435*_0x167435;case _0x5bdb2f(0x52b):var _0x587cc2=_0x167435-0x1;return _0x587cc2*_0x587cc2*_0x587cc2+0x1;case _0x5bdb2f(0x4c8):return _0x167435<0.5?0x4*_0x167435*_0x167435*_0x167435:(_0x167435-0x1)*(0x2*_0x167435-0x2)*(0x2*_0x167435-0x2)+0x1;case _0x5bdb2f(0x77c):return _0x167435*_0x167435*_0x167435*_0x167435;case _0x5bdb2f(0x558):var _0x587cc2=_0x167435-0x1;return 0x1-_0x587cc2*_0x587cc2*_0x587cc2*_0x587cc2;case _0x5bdb2f(0x6e3):var _0x587cc2=_0x167435-0x1;return _0x167435<0.5?0x8*_0x167435*_0x167435*_0x167435*_0x167435:0x1-0x8*_0x587cc2*_0x587cc2*_0x587cc2*_0x587cc2;case _0x5bdb2f(0x768):return _0x167435*_0x167435*_0x167435*_0x167435*_0x167435;case _0x5bdb2f(0x3c3):var _0x587cc2=_0x167435-0x1;return 0x1+_0x587cc2*_0x587cc2*_0x587cc2*_0x587cc2*_0x587cc2;case _0x5bdb2f(0x81a):var _0x587cc2=_0x167435-0x1;return _0x167435<0.5?0x10*_0x167435*_0x167435*_0x167435*_0x167435*_0x167435:0x1+0x10*_0x587cc2*_0x587cc2*_0x587cc2*_0x587cc2*_0x587cc2;case'INEXPO':if(_0x167435===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x167435-0x1));case _0x5bdb2f(0x565):if(_0x167435===0x1)return 0x1;return-Math[_0x5bdb2f(0x55a)](0x2,-0xa*_0x167435)+0x1;case _0x5bdb2f(0x6fd):if(_0x167435===0x0||_0x167435===0x1)return _0x167435;var _0x5aa9e7=_0x167435*0x2,_0xfe99df=_0x5aa9e7-0x1;if(_0x5aa9e7<0x1){if(_0x5bdb2f(0x515)!==_0x5bdb2f(0x515)){function _0x53f5da(){const _0x3a8af4=_0x5bdb2f;return _0xa243d1[_0x3a8af4(0x212)]();}}else return 0.5*Math[_0x5bdb2f(0x55a)](0x2,0xa*_0xfe99df);}return 0.5*(-Math[_0x5bdb2f(0x55a)](0x2,-0xa*_0xfe99df)+0x2);case'INCIRC':var _0x5aa9e7=_0x167435/0x1;return-0x1*(Math['sqrt'](0x1-_0x5aa9e7*_0x167435)-0x1);case _0x5bdb2f(0x433):var _0x587cc2=_0x167435-0x1;return Math[_0x5bdb2f(0x366)](0x1-_0x587cc2*_0x587cc2);case _0x5bdb2f(0x688):var _0x5aa9e7=_0x167435*0x2,_0xfe99df=_0x5aa9e7-0x2;if(_0x5aa9e7<0x1)return-0.5*(Math['sqrt'](0x1-_0x5aa9e7*_0x5aa9e7)-0x1);return 0.5*(Math['sqrt'](0x1-_0xfe99df*_0xfe99df)+0x1);case _0x5bdb2f(0x3aa):return _0x167435*_0x167435*((_0x150e0e+0x1)*_0x167435-_0x150e0e);case _0x5bdb2f(0x23f):var _0x5aa9e7=_0x167435/0x1-0x1;return _0x5aa9e7*_0x5aa9e7*((_0x150e0e+0x1)*_0x5aa9e7+_0x150e0e)+0x1;break;case _0x5bdb2f(0x39d):var _0x5aa9e7=_0x167435*0x2,_0x14bdf3=_0x5aa9e7-0x2,_0x16bd8e=_0x150e0e*1.525;if(_0x5aa9e7<0x1){if(_0x5bdb2f(0x177)!==_0x5bdb2f(0x177)){function _0x1a6a0c(){_0x17cc0d+=_0x150b9a+'\x0a',_0x553f4c+='〘Scrolling\x20Text〙\x0a';}}else return 0.5*_0x5aa9e7*_0x5aa9e7*((_0x16bd8e+0x1)*_0x5aa9e7-_0x16bd8e);}return 0.5*(_0x14bdf3*_0x14bdf3*((_0x16bd8e+0x1)*_0x14bdf3+_0x16bd8e)+0x2);case _0x5bdb2f(0x612):if(_0x167435===0x0||_0x167435===0x1)return _0x167435;var _0x5aa9e7=_0x167435/0x1,_0xfe99df=_0x5aa9e7-0x1,_0x641392=0x1-_0x41477c,_0x16bd8e=_0x641392/(0x2*Math['PI'])*Math[_0x5bdb2f(0x6da)](0x1);return-(Math[_0x5bdb2f(0x55a)](0x2,0xa*_0xfe99df)*Math['sin']((_0xfe99df-_0x16bd8e)*(0x2*Math['PI'])/_0x641392));case _0x5bdb2f(0x2f7):var _0x641392=0x1-_0x41477c,_0x5aa9e7=_0x167435*0x2;if(_0x167435===0x0||_0x167435===0x1){if(_0x5bdb2f(0x481)!==_0x5bdb2f(0x666))return _0x167435;else{function _0x29dbec(){const _0x1b0680=_0x5bdb2f;_0x29fc4d-=_0x3b1018;if(_0x1e0612<=0x0)_0xe8b0f1=0x0;this[_0x1b0680(0x237)](_0xc1ec55);}}}var _0x16bd8e=_0x641392/(0x2*Math['PI'])*Math[_0x5bdb2f(0x6da)](0x1);return Math['pow'](0x2,-0xa*_0x5aa9e7)*Math[_0x5bdb2f(0x7bd)]((_0x5aa9e7-_0x16bd8e)*(0x2*Math['PI'])/_0x641392)+0x1;case _0x5bdb2f(0x814):var _0x641392=0x1-_0x41477c;if(_0x167435===0x0||_0x167435===0x1){if('wMZLg'!==_0x5bdb2f(0x2d3))return _0x167435;else{function _0x2b02bf(){const _0x1b8d27=_0x5bdb2f;_0x28de20[_0x1b8d27(0x6ac)][_0x1b8d27(0x33d)][_0x1b8d27(0x64a)](this),this[_0x1b8d27(0x3cf)]();}}}var _0x5aa9e7=_0x167435*0x2,_0xfe99df=_0x5aa9e7-0x1,_0x16bd8e=_0x641392/(0x2*Math['PI'])*Math[_0x5bdb2f(0x6da)](0x1);if(_0x5aa9e7<0x1){if('ZdcAr'===_0x5bdb2f(0x7f0)){function _0x96bf98(){const _0x1f7f6d=_0x5bdb2f;this[_0x1f7f6d(0x544)]&&this[_0x1f7f6d(0x544)]['setBackgroundType'](_0x42b8a8[_0x1f7f6d(0x56d)]['EditBgType']),this[_0x1f7f6d(0x2ec)]&&this[_0x1f7f6d(0x2ec)][_0x1f7f6d(0x223)](_0x217b29[_0x1f7f6d(0x56d)]['InputBgType']);}}else return-0.5*(Math['pow'](0x2,0xa*_0xfe99df)*Math[_0x5bdb2f(0x7bd)]((_0xfe99df-_0x16bd8e)*(0x2*Math['PI'])/_0x641392));}return Math[_0x5bdb2f(0x55a)](0x2,-0xa*_0xfe99df)*Math[_0x5bdb2f(0x7bd)]((_0xfe99df-_0x16bd8e)*(0x2*Math['PI'])/_0x641392)*0.5+0x1;case'OUTBOUNCE':var _0x5aa9e7=_0x167435/0x1;if(_0x5aa9e7<0x1/2.75){if(_0x5bdb2f(0x1dd)==='WraUj'){function _0x25cb0d(){const _0x2da9e2=_0x5bdb2f;return _0x2d5860[_0x2da9e2(0x6ac)]['Settings'][_0x2da9e2(0x788)][_0x2da9e2(0x86e)]&&_0x5937ae[_0x2da9e2(0x4b4)](_0x7cd9c9)?![]:_0x292726[_0x2da9e2(0x6ac)][_0x2da9e2(0x34c)][_0x2da9e2(0x64a)](this,_0x457dbc);}}else return 7.5625*_0x5aa9e7*_0x5aa9e7;}else{if(_0x5aa9e7<0x2/2.75){var _0x14bdf3=_0x5aa9e7-1.5/2.75;return 7.5625*_0x14bdf3*_0x14bdf3+0.75;}else{if(_0x5aa9e7<2.5/2.75){var _0x14bdf3=_0x5aa9e7-2.25/2.75;return 7.5625*_0x14bdf3*_0x14bdf3+0.9375;}else{var _0x14bdf3=_0x5aa9e7-2.625/2.75;return 7.5625*_0x14bdf3*_0x14bdf3+0.984375;}}}case _0x5bdb2f(0x491):var _0x16c324=0x1-VisuMZ['ApplyEasing'](0x1-_0x167435,_0x5bdb2f(0x388));return _0x16c324;case _0x5bdb2f(0x164):if(_0x167435<0.5)var _0x16c324=VisuMZ['ApplyEasing'](_0x167435*0x2,_0x5bdb2f(0x880))*0.5;else var _0x16c324=VisuMZ['ApplyEasing'](_0x167435*0x2-0x1,_0x5bdb2f(0x388))*0.5+0.5;return _0x16c324;default:return _0x167435;}},VisuMZ[_0x2ef904(0x3e1)]=function(_0x37c74f){const _0x192298=_0x2ef904;_0x37c74f=String(_0x37c74f)[_0x192298(0x406)]();const _0x594766=VisuMZ['CoreEngine'][_0x192298(0x5ba)][_0x192298(0x663)];if(_0x37c74f===_0x192298(0x7a3))return _0x594766['IconParam0'];if(_0x37c74f===_0x192298(0x1c6))return _0x594766[_0x192298(0x1f9)];if(_0x37c74f===_0x192298(0x5c7))return _0x594766[_0x192298(0x753)];if(_0x37c74f===_0x192298(0x469))return _0x594766[_0x192298(0x833)];if(_0x37c74f===_0x192298(0x240))return _0x594766['IconParam4'];if(_0x37c74f===_0x192298(0x2f3))return _0x594766[_0x192298(0x4e3)];if(_0x37c74f==='AGI')return _0x594766[_0x192298(0x521)];if(_0x37c74f===_0x192298(0x85e))return _0x594766['IconParam7'];if(_0x37c74f===_0x192298(0x799))return _0x594766[_0x192298(0x528)];if(_0x37c74f===_0x192298(0x412))return _0x594766[_0x192298(0x1e0)];if(_0x37c74f===_0x192298(0x311))return _0x594766['IconXParam2'];if(_0x37c74f===_0x192298(0x4ed))return _0x594766['IconXParam3'];if(_0x37c74f===_0x192298(0x356))return _0x594766['IconXParam4'];if(_0x37c74f===_0x192298(0x8a0))return _0x594766[_0x192298(0x2b5)];if(_0x37c74f===_0x192298(0x516))return _0x594766['IconXParam6'];if(_0x37c74f===_0x192298(0x496))return _0x594766['IconXParam7'];if(_0x37c74f===_0x192298(0x2c8))return _0x594766[_0x192298(0x734)];if(_0x37c74f===_0x192298(0x60a))return _0x594766[_0x192298(0x5ca)];if(_0x37c74f===_0x192298(0x694))return _0x594766[_0x192298(0x2a7)];if(_0x37c74f===_0x192298(0x7ca))return _0x594766['IconSParam1'];if(_0x37c74f===_0x192298(0x207))return _0x594766[_0x192298(0x33e)];if(_0x37c74f===_0x192298(0x72d))return _0x594766[_0x192298(0x3da)];if(_0x37c74f==='MCR')return _0x594766['IconSParam4'];if(_0x37c74f===_0x192298(0x374))return _0x594766[_0x192298(0x331)];if(_0x37c74f===_0x192298(0x299))return _0x594766[_0x192298(0x677)];if(_0x37c74f===_0x192298(0x593))return _0x594766['IconSParam7'];if(_0x37c74f===_0x192298(0x3b9))return _0x594766[_0x192298(0x727)];if(_0x37c74f===_0x192298(0x56b))return _0x594766[_0x192298(0x775)];if(VisuMZ[_0x192298(0x6ac)][_0x192298(0x4d4)][_0x37c74f])return VisuMZ[_0x192298(0x6ac)][_0x192298(0x4d4)][_0x37c74f]||0x0;return 0x0;},VisuMZ[_0x2ef904(0x321)]=function(_0x2f1014,_0x9ba509,_0x3d5e88){const _0x4e2ca5=_0x2ef904;if(_0x3d5e88===undefined&&_0x2f1014%0x1===0x0)return _0x2f1014;if(_0x3d5e88!==undefined&&[_0x4e2ca5(0x7a3),_0x4e2ca5(0x1c6),_0x4e2ca5(0x5c7),_0x4e2ca5(0x469),'MAT',_0x4e2ca5(0x2f3),'AGI',_0x4e2ca5(0x85e)][_0x4e2ca5(0x352)](String(_0x3d5e88)['toUpperCase']()['trim']()))return _0x2f1014;_0x9ba509=_0x9ba509||0x0;if(VisuMZ['CoreEngine'][_0x4e2ca5(0x195)][_0x3d5e88])return VisuMZ[_0x4e2ca5(0x6ac)][_0x4e2ca5(0x1a3)][_0x3d5e88]==='integer'?_0x2f1014:String((_0x2f1014*0x64)['toFixed'](_0x9ba509))+'%';return String((_0x2f1014*0x64)['toFixed'](_0x9ba509))+'%';},VisuMZ[_0x2ef904(0x686)]=function(_0x1951e1){const _0x1d4b53=_0x2ef904;_0x1951e1=String(_0x1951e1);if(!_0x1951e1)return _0x1951e1;if(typeof _0x1951e1!=='string')return _0x1951e1;const _0x5b017e=VisuMZ['CoreEngine'][_0x1d4b53(0x5ba)]['QoL']['DigitGroupingLocale']||_0x1d4b53(0x4ea),_0x584c6b={'maximumFractionDigits':0x6};_0x1951e1=_0x1951e1['replace'](/\[(.*?)\]/g,(_0x3a17d9,_0x13e1ce)=>{const _0x22cb87=_0x1d4b53;return VisuMZ[_0x22cb87(0x27e)](_0x13e1ce,'[',']');}),_0x1951e1=_0x1951e1[_0x1d4b53(0x1d1)](/<(.*?)>/g,(_0x2d17d0,_0x522d89)=>{const _0x5772b3=_0x1d4b53;if('EvZYl'===_0x5772b3(0x3ef))return VisuMZ[_0x5772b3(0x27e)](_0x522d89,'<','>');else{function _0x18ddf0(){const _0x411875=_0x5772b3;if(this[_0x411875(0x187)]===_0x1360e8)this[_0x411875(0x7aa)]();if(this[_0x411875(0x187)][_0x411875(0x74d)]===_0x47c713)this[_0x411875(0x7aa)]();return this['_CoreEngineSettings'][_0x411875(0x74d)];}}}),_0x1951e1=_0x1951e1[_0x1d4b53(0x1d1)](/\{\{(.*?)\}\}/g,(_0x59fcdc,_0x5f1073)=>{const _0x5c95aa=_0x1d4b53;if('QtaJP'!==_0x5c95aa(0x4b7))return VisuMZ[_0x5c95aa(0x27e)](_0x5f1073,'','');else{function _0x597e9c(){this['setSkill'](_0x2865f5);}}}),_0x1951e1=_0x1951e1[_0x1d4b53(0x1d1)](/(\d+\.?\d*)/g,(_0x598f2a,_0x21a226)=>{const _0x5ecf28=_0x1d4b53;let _0x343c7c=_0x21a226;if(_0x343c7c[0x0]==='0')return _0x343c7c;if(_0x343c7c[_0x343c7c[_0x5ecf28(0x862)]-0x1]==='.'){if(_0x5ecf28(0x704)==='TCzwb'){function _0x1eeec6(){const _0x40c91b=_0x5ecf28;_0x18aa1e=_0x455c7d[_0x40c91b(0x303)]-_0x143e0d;}}else return Number(_0x343c7c)[_0x5ecf28(0x5c4)](_0x5b017e,_0x584c6b)+'.';}else{if(_0x343c7c[_0x343c7c[_0x5ecf28(0x862)]-0x1]===',')return Number(_0x343c7c)['toLocaleString'](_0x5b017e,_0x584c6b)+',';else{if(_0x5ecf28(0x640)!==_0x5ecf28(0x640)){function _0x213eaf(){const _0x4a197c=_0x5ecf28;if(_0x17379d[_0x4a197c(0x2c7)]())return;_0x36de06[_0x4a197c(0x5db)](_0x53d268,_0x194a1a);const _0x1e2947=_0x239b8f[_0x4a197c(0x5e2)](_0x285336[_0x4a197c(0x174)],_0x28aa46[_0x4a197c(0x432)]),_0x68f10f=_0x474fee[_0x4a197c(0x8a6)](_0x4ce748[_0x4a197c(0x174)],_0x1afdfe[_0x4a197c(0x432)]);for(let _0x513eb3=_0x1e2947;_0x513eb3<=_0x68f10f;_0x513eb3++){const _0x14a1eb=_0x2273a9['value'](_0x513eb3);_0x55ea64[_0x4a197c(0x3ae)](_0x513eb3,!_0x14a1eb);}}}else return Number(_0x343c7c)[_0x5ecf28(0x5c4)](_0x5b017e,_0x584c6b);}}});let _0x55b674=0x3;while(_0x55b674--){if(_0x1d4b53(0x6d8)!==_0x1d4b53(0x2a2))_0x1951e1=VisuMZ[_0x1d4b53(0x310)](_0x1951e1);else{function _0x365c55(){const _0x374c57=_0x1d4b53,_0x317bcb=this[_0x374c57(0x803)],_0x409a91=this[_0x374c57(0x803)],_0x5d7974=this['_animation'][_0x374c57(0x3a6)]*(this[_0x374c57(0x631)]?-0x1:0x1)-_0x317bcb/0x2,_0x4d1de6=this['_animation'][_0x374c57(0x411)]-_0x409a91/0x2,_0x2120e8=this['targetPosition'](_0x10b415);_0x2a3eb0['gl'][_0x374c57(0x7d7)](_0x5d7974+_0x2120e8['x'],_0x4d1de6+_0x2120e8['y'],_0x317bcb,_0x409a91);}}}return _0x1951e1;},VisuMZ[_0x2ef904(0x27e)]=function(_0x4ed743,_0x1bce44,_0x1500e5){const _0x2c3a04=_0x2ef904;return _0x4ed743=_0x4ed743[_0x2c3a04(0x1d1)](/(\d)/gi,(_0x1ef78b,_0x228933)=>'PRESERVCONVERSION(%1)'[_0x2c3a04(0x764)](Number(_0x228933))),_0x2c3a04(0x18b)[_0x2c3a04(0x764)](_0x4ed743,_0x1bce44,_0x1500e5);},VisuMZ[_0x2ef904(0x310)]=function(_0x3a939f){const _0x1a9e21=_0x2ef904;return _0x3a939f=_0x3a939f[_0x1a9e21(0x1d1)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x5a7c07,_0x18b06f)=>Number(parseInt(_0x18b06f))),_0x3a939f;},VisuMZ[_0x2ef904(0x57d)]=function(_0x4e3bff){const _0x24a7e4=_0x2ef904;SoundManager[_0x24a7e4(0x263)]();if(!Utils[_0x24a7e4(0x78f)]()){const _0xf3638b=window[_0x24a7e4(0x65c)](_0x4e3bff,'_blank');}else{const _0x36d71b=process[_0x24a7e4(0x81c)]==_0x24a7e4(0x25a)?_0x24a7e4(0x65c):process[_0x24a7e4(0x81c)]=='win32'?_0x24a7e4(0x804):_0x24a7e4(0x793);require('child_process')[_0x24a7e4(0x71c)](_0x36d71b+'\x20'+_0x4e3bff);}},Game_Picture['prototype'][_0x2ef904(0x38c)]=function(){const _0x883946=_0x2ef904;return this[_0x883946(0x3dd)];},VisuMZ[_0x2ef904(0x6ac)]['Game_Picture_initBasic']=Game_Picture[_0x2ef904(0x6a6)]['initBasic'],Game_Picture['prototype'][_0x2ef904(0x1ce)]=function(){const _0xeedf3d=_0x2ef904;VisuMZ[_0xeedf3d(0x6ac)][_0xeedf3d(0x84c)][_0xeedf3d(0x64a)](this),this['_anchor']={'x':0x0,'y':0x0},this[_0xeedf3d(0x6e7)]={'x':0x0,'y':0x0};},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x21e)]=Game_Picture['prototype'][_0x2ef904(0x840)],Game_Picture[_0x2ef904(0x6a6)]['updateMove']=function(){const _0x24cfa6=_0x2ef904;this[_0x24cfa6(0x13e)](),VisuMZ['CoreEngine'][_0x24cfa6(0x21e)][_0x24cfa6(0x64a)](this);},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x879)]=Game_Picture[_0x2ef904(0x6a6)]['show'],Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x5b0)]=function(_0x46c2fe,_0x479738,_0xfccbf6,_0x1fafbc,_0x583dc5,_0x332c69,_0x2c193f,_0x3217bf){const _0x55a251=_0x2ef904;VisuMZ[_0x55a251(0x6ac)][_0x55a251(0x879)]['call'](this,_0x46c2fe,_0x479738,_0xfccbf6,_0x1fafbc,_0x583dc5,_0x332c69,_0x2c193f,_0x3217bf),this[_0x55a251(0x204)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x479738]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x2ef904(0x850)]=Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x7af)],Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x7af)]=function(_0x592577,_0x3cccc5,_0x57def2,_0x383f9f,_0x26b2c1,_0x2d80c1,_0x26d154,_0x164ab1,_0x3a0ebe){const _0x27c220=_0x2ef904;VisuMZ[_0x27c220(0x6ac)]['Game_Picture_move'][_0x27c220(0x64a)](this,_0x592577,_0x3cccc5,_0x57def2,_0x383f9f,_0x26b2c1,_0x2d80c1,_0x26d154,_0x164ab1,_0x3a0ebe),this[_0x27c220(0x145)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x592577]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x2ef904(0x13e)]=function(){const _0x2e3825=_0x2ef904;this[_0x2e3825(0x670)]>0x0&&(this[_0x2e3825(0x3dd)]['x']=this[_0x2e3825(0x1e8)](this['_anchor']['x'],this[_0x2e3825(0x6e7)]['x']),this[_0x2e3825(0x3dd)]['y']=this['applyEasing'](this[_0x2e3825(0x3dd)]['y'],this[_0x2e3825(0x6e7)]['y']));},Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x204)]=function(_0x3f7884){const _0x2184c3=_0x2ef904;this['_anchor']=_0x3f7884,this[_0x2184c3(0x6e7)]=JsonEx[_0x2184c3(0x3f2)](this['_anchor']);},Game_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x145)]=function(_0xddcb3d){const _0x1902e2=_0x2ef904;this[_0x1902e2(0x6e7)]=_0xddcb3d;},VisuMZ['CoreEngine'][_0x2ef904(0x393)]=Sprite_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x39e)],Sprite_Picture[_0x2ef904(0x6a6)][_0x2ef904(0x39e)]=function(){const _0x8a19ef=_0x2ef904,_0x106248=this['picture']();!_0x106248[_0x8a19ef(0x38c)]()?VisuMZ['CoreEngine'][_0x8a19ef(0x393)][_0x8a19ef(0x64a)](this):(this['anchor']['x']=_0x106248[_0x8a19ef(0x38c)]()['x'],this[_0x8a19ef(0x38c)]['y']=_0x106248[_0x8a19ef(0x38c)]()['y']);},Game_Action['prototype'][_0x2ef904(0x34a)]=function(_0x5a072c){const _0x2fbc15=_0x2ef904;if(_0x5a072c){if(_0x2fbc15(0x7a2)!=='kGKgl'){const _0x6645af=_0x5a072c[_0x2fbc15(0x664)];if(_0x6645af===0x1&&this[_0x2fbc15(0x5f8)]()['attackSkillId']()!==0x1)this[_0x2fbc15(0x6c5)]();else _0x6645af===0x2&&this['subject']()[_0x2fbc15(0x415)]()!==0x2?this['setGuard']():this[_0x2fbc15(0x484)](_0x6645af);}else{function _0x30175e(){const _0x53f8b8=_0x2fbc15;return _0x27dd36[_0x53f8b8(0x56d)][_0x53f8b8(0x323)][_0x53f8b8(0x64a)](this);}}}else this[_0x2fbc15(0x57b)]();},Game_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x3e7)]=function(){const _0x442c81=_0x2ef904;return this[_0x442c81(0x615)]()[_0x442c81(0x31d)](_0x431319=>this[_0x442c81(0x1b5)](_0x431319)&&this[_0x442c81(0x27d)]()[_0x442c81(0x352)](_0x431319[_0x442c81(0x4b6)]));},Window_Base['prototype'][_0x2ef904(0x62c)]=function(){const _0x255e93=_0x2ef904;this[_0x255e93(0x371)]=new Sprite(),this[_0x255e93(0x371)][_0x255e93(0x325)]=new Bitmap(0x0,0x0),this[_0x255e93(0x371)]['x']=0x0,this[_0x255e93(0x6e9)](this[_0x255e93(0x371)]);},Window_Base['prototype'][_0x2ef904(0x2f1)]=function(){const _0x293cbb=_0x2ef904;if(this[_0x293cbb(0x371)]){const _0x5d7cb1=this[_0x293cbb(0x371)][_0x293cbb(0x325)],_0x2a451e=this[_0x293cbb(0x849)],_0x41389b=this[_0x293cbb(0x451)],_0x333ad7=this[_0x293cbb(0x1ea)],_0x34c27a=ColorManager[_0x293cbb(0x220)](),_0x595cc0=ColorManager[_0x293cbb(0x75a)]();_0x5d7cb1[_0x293cbb(0x69c)](_0x2a451e,_0x41389b),_0x5d7cb1[_0x293cbb(0x669)](0x0,0x0,_0x2a451e,_0x333ad7,_0x595cc0,_0x34c27a,!![]),_0x5d7cb1[_0x293cbb(0x595)](0x0,_0x333ad7,_0x2a451e,_0x41389b-_0x333ad7*0x2,_0x34c27a),_0x5d7cb1[_0x293cbb(0x669)](0x0,_0x41389b-_0x333ad7,_0x2a451e,_0x333ad7,_0x34c27a,_0x595cc0,!![]),this[_0x293cbb(0x371)][_0x293cbb(0x14f)](0x0,0x0,_0x2a451e,_0x41389b);}},Game_Actor[_0x2ef904(0x6a6)][_0x2ef904(0x2cb)]=function(){const _0x2c281c=_0x2ef904;for(let _0x1d2a48=0x0;_0x1d2a48<this[_0x2c281c(0x36f)]();_0x1d2a48++){const _0x3c7891=this[_0x2c281c(0x5d6)]();let _0x1dce91=Number['MIN_SAFE_INTEGER'];this['setAction'](_0x1d2a48,_0x3c7891[0x0]);for(const _0x1a4645 of _0x3c7891){const _0x197630=_0x1a4645[_0x2c281c(0x716)]();_0x197630>_0x1dce91&&(_0x1dce91=_0x197630,this[_0x2c281c(0x3db)](_0x1d2a48,_0x1a4645));}}this[_0x2c281c(0x21d)](_0x2c281c(0x13f));},Window_BattleItem[_0x2ef904(0x6a6)][_0x2ef904(0x18c)]=function(_0xc23b50){const _0x59ec2c=_0x2ef904;if(BattleManager[_0x59ec2c(0x22d)]())return BattleManager[_0x59ec2c(0x22d)]()['canUse'](_0xc23b50);else{if('TxASM'==='CXJkU'){function _0x577640(){const _0x40a370=_0x59ec2c;return _0x3183f1[_0x40a370(0x6ac)]['Game_Picture_x'][_0x40a370(0x64a)](this);}}else return Window_ItemList[_0x59ec2c(0x6a6)][_0x59ec2c(0x18c)]['call'](this,_0xc23b50);}},VisuMZ[_0x2ef904(0x6ac)][_0x2ef904(0x62d)]=Scene_Map[_0x2ef904(0x6a6)][_0x2ef904(0x770)],Scene_Map['prototype'][_0x2ef904(0x770)]=function(){const _0x41b914=_0x2ef904;VisuMZ[_0x41b914(0x6ac)]['Scene_Map_createSpriteset'][_0x41b914(0x64a)](this);const _0x4b8d62=this[_0x41b914(0x810)][_0x41b914(0x5f6)];if(_0x4b8d62)this[_0x41b914(0x55b)](_0x4b8d62);},VisuMZ['CoreEngine'][_0x2ef904(0x28a)]=Scene_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x770)],Scene_Battle[_0x2ef904(0x6a6)][_0x2ef904(0x770)]=function(){const _0x378ca3=_0x2ef904;VisuMZ[_0x378ca3(0x6ac)][_0x378ca3(0x28a)]['call'](this);const _0xf105ac=this[_0x378ca3(0x810)]['_timerSprite'];if(_0xf105ac)this[_0x378ca3(0x55b)](_0xf105ac);},Sprite_Actor['prototype'][_0x2ef904(0x3df)]=function(){const _0x22a08c=_0x2ef904;Sprite_Battler[_0x22a08c(0x6a6)][_0x22a08c(0x3df)]['call'](this),this[_0x22a08c(0x30e)]();if(this['_actor'])this[_0x22a08c(0x158)]();else{if(this[_0x22a08c(0x3a4)]!==''){if('jyJKp'!==_0x22a08c(0x6a5)){function _0x11da31(){const _0x20eee2=_0x22a08c;return _0x1749b9['CoreEngine'][_0x20eee2(0x5ba)][_0x20eee2(0x888)][_0x20eee2(0x1d6)][_0x20eee2(0x64a)](this,_0x505892);}}else this[_0x22a08c(0x3a4)]='';}}},Window[_0x2ef904(0x6a6)][_0x2ef904(0x259)]=function(){const _0xb9397a=_0x2ef904,_0x103b83=this[_0xb9397a(0x73d)],_0x57ebcf=this[_0xb9397a(0x650)],_0x391105=0x18,_0x2b3303=_0x391105/0x2,_0x5d2db5=0x60+_0x391105,_0x4cf29d=0x0+_0x391105;this[_0xb9397a(0x4f4)]['bitmap']=this[_0xb9397a(0x4de)],this[_0xb9397a(0x4f4)][_0xb9397a(0x38c)]['x']=0.5,this[_0xb9397a(0x4f4)][_0xb9397a(0x38c)]['y']=0.5,this[_0xb9397a(0x4f4)][_0xb9397a(0x14f)](_0x5d2db5+_0x2b3303,_0x4cf29d+_0x2b3303+_0x391105,_0x391105,_0x2b3303),this[_0xb9397a(0x4f4)][_0xb9397a(0x7af)](Math[_0xb9397a(0x546)](_0x103b83/0x2),Math[_0xb9397a(0x546)](_0x57ebcf-_0x2b3303)),this[_0xb9397a(0x249)][_0xb9397a(0x325)]=this[_0xb9397a(0x4de)],this[_0xb9397a(0x249)][_0xb9397a(0x38c)]['x']=0.5,this['_upArrowSprite'][_0xb9397a(0x38c)]['y']=0.5,this['_upArrowSprite'][_0xb9397a(0x14f)](_0x5d2db5+_0x2b3303,_0x4cf29d,_0x391105,_0x2b3303),this[_0xb9397a(0x249)][_0xb9397a(0x7af)](Math[_0xb9397a(0x546)](_0x103b83/0x2),Math[_0xb9397a(0x546)](_0x2b3303));},Window[_0x2ef904(0x6a6)][_0x2ef904(0x16d)]=function(){const _0x55fa4b=_0x2ef904,_0xef7464=0x90,_0x54bade=0x60,_0xc3cece=0x18;this[_0x55fa4b(0x755)]['bitmap']=this[_0x55fa4b(0x4de)],this[_0x55fa4b(0x755)]['anchor']['x']=0.5,this[_0x55fa4b(0x755)]['anchor']['y']=0x1,this['_pauseSignSprite'][_0x55fa4b(0x7af)](Math[_0x55fa4b(0x546)](this[_0x55fa4b(0x73d)]/0x2),this['_height']),this[_0x55fa4b(0x755)][_0x55fa4b(0x14f)](_0xef7464,_0x54bade,_0xc3cece,_0xc3cece),this[_0x55fa4b(0x755)][_0x55fa4b(0x85b)]=0x0;},Window[_0x2ef904(0x6a6)][_0x2ef904(0x426)]=function(){const _0x48deae=_0x2ef904,_0x5abbf6=this[_0x48deae(0x857)]['worldTransform'][_0x48deae(0x22c)](new Point(0x0,0x0)),_0x586a39=this[_0x48deae(0x857)][_0x48deae(0x3c1)];_0x586a39['x']=_0x5abbf6['x']+this['origin']['x'],_0x586a39['y']=_0x5abbf6['y']+this[_0x48deae(0x320)]['y'],_0x586a39['width']=Math[_0x48deae(0x47f)](this[_0x48deae(0x2e2)]*this[_0x48deae(0x6d6)]['x']),_0x586a39[_0x48deae(0x451)]=Math[_0x48deae(0x47f)](this[_0x48deae(0x550)]*this[_0x48deae(0x6d6)]['y']);},Window['prototype'][_0x2ef904(0x81d)]=function(){const _0xfd4735=_0x2ef904,_0x2bb6c5=this['_margin'],_0x26c377=Math[_0xfd4735(0x8a6)](0x0,this[_0xfd4735(0x73d)]-_0x2bb6c5*0x2),_0x1052b6=Math[_0xfd4735(0x8a6)](0x0,this['_height']-_0x2bb6c5*0x2),_0x1be8ba=this['_backSprite'],_0x3e03a4=_0x1be8ba[_0xfd4735(0x854)][0x0];_0x1be8ba['bitmap']=this[_0xfd4735(0x4de)],_0x1be8ba[_0xfd4735(0x14f)](0x0,0x0,0x60,0x60),_0x1be8ba[_0xfd4735(0x7af)](_0x2bb6c5,_0x2bb6c5),_0x1be8ba[_0xfd4735(0x6d6)]['x']=_0x26c377/0x60,_0x1be8ba[_0xfd4735(0x6d6)]['y']=_0x1052b6/0x60,_0x3e03a4[_0xfd4735(0x325)]=this['_windowskin'],_0x3e03a4[_0xfd4735(0x14f)](0x0,0x60,0x60,0x60),_0x3e03a4[_0xfd4735(0x7af)](0x0,0x0,_0x26c377,_0x1052b6),_0x3e03a4[_0xfd4735(0x6d6)]['x']=0x60/_0x26c377,_0x3e03a4[_0xfd4735(0x6d6)]['y']=0x60/_0x1052b6,_0x1be8ba[_0xfd4735(0x244)](this[_0xfd4735(0x3bb)]);};