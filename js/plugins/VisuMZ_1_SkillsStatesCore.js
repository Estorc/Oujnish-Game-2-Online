//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.18] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x570a=['StackBuffMax','tPCDx','rgba(0,\x200,\x200,\x201)','_actor','addStateTurns','setItem','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','LUK','text','<actor-%1>','Parse_Notetags_State_PassiveJS','RBBOY','Game_Unit_isAllDead','ParseAllNotetags','SkillsStatesCore','vzNqP','retrieveStateColor','isStateAffected','isPassiveStateStackable','onAddDebuffGlobalJS','Parse_Notetags_State_SlipEffectJS','index','item','Game_Battler_addState','_states','commandNameWindowDrawText','isStateExpired','stateHpSlipHealJS','isStateAddable','innerHeight','passiveStates','skillTypes','stateMaximumTurns','getStateDisplay','refresh','Window_SkillList_setActor','yfIyX','outlineColor','<member-%1>','Settings','gaugeBackColor','shopStatusWidth','onAddStateGlobalJS','rqHCW','mainAreaTop','PassiveStates','getCurrentStateOriginKey','HxUuX','slipMp','_battler','initialize','iconWidth','bxORp','hasState','jHCMZ','heal','changeOutlineColor','VisuMZ_1_ItemsEquipsCore','Game_BattlerBase_overwriteBuffTurns','clearStateRetainType','xgIoU','setup','shift','grqXN','_checkingPassiveStates','Dprlw','isAllDead','dsXRp','priority','_checkingVisuMzPassiveStateObjects','iWRCk','Parse_Notetags_Skill_JS','getSkillTypes','STqAo','isStateRestrict','helpWindowRectSkillsStatesCore','getSkillIdWithName','setStateRetainType','onAddState','createTurnDisplaySprite','updateCommandNameWindow','TurnOffsetY','parse','Game_Actor_skillTypes','fWhyw','SkillSceneAdjustSkillList','644TYXsDc','ARRAYSTR','inBattle','onExpireDebuff','success','recover\x20all','GaugeMaxJS','die','BattleManager_endAction','checkShowHideNotetags','multiclasses','LKavk','autoRemovalTiming','fKCRt','applySkillsStatesCoreEffects','_tempBattler','drawExtendedParameter','buttonAssistSwitch','skill','process_VisuMZ_SkillsStatesCore_Notetags','isLearnedSkill','mainAreaHeight','CmdStyle','nltQt','isDebuffAffected','allowCreateShopStatusWindow','fillRect','ColorBuff','gaugeLineHeight','endAction','isRightInputMode','getStateOrigin','paramBuffRate','pocDy','Game_BattlerBase_decreaseBuff','anchor','fQKms','actions','WCAJr','removeStatesByCategoryAll','xkpxi','TurnOffsetX','addChild','isUseModernControls','_stateOrigin','pavGT','regenerateAll','getStateOriginByKey','onExpireDebuffJS','onEraseBuff','onDatabaseLoaded','commandStyle','convertPassiveStates','Scene_Boot_onDatabaseLoaded','fontBold','addBuffTurns','mhVVJ','maxSlipDamage','passiveStateObjects','INSFV','meetsSkillConditionsGlobalJS','enemy','isPartyAllAffectedByGroupDefeatStates','gainHp','iIvjl','removeState','MaxTurns','meetsPassiveStateConditionClasses','khKtL','parameters','_stypeId','addPassiveStatesByPluginParameters','stateHpSlipDamageJS','onAddStateMakeCustomSlipValues','useDigitGrouping','createCommandNameWindow','iconText','boxWidth','INGpL','qjEUw','icon','Window_SkillList_includes','<enemy-%1>','_categoryWindow','Costs','CXmNW','RJJjj','call','rFgzt','helpWindowRect','states','checkCacheKey','setStatusWindow','setStateOrigin','callUpdateHelp','learnSkill','drawActorBuffRates','enemyId','checkSkillTypeMatch','Game_Actor_learnSkill','isAlive','itemWindowRectSkillsStatesCore','MWElw','onEraseDebuffGlobalJS','addPassiveStatesByNotetag','ceil','CalcJS','skills','ShowShopStatus','onEraseDebuff','lfDHD','innerWidth','paySkillCost','getStateRetainType','VqNOK','stateEraseJS','VKTVi','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','ParseStateNotetags','version','getStateIdWithName','mainFontFace','KfvtB','getCurrentTroopUniqueID','maxItems','SXlSj','Sprite_Gauge_setup','skillTypeWindowRect','makeCommandName','setPassiveStateSlipDamageJS','totalStateCategoryAffected','concat','Game_BattlerBase_refresh','_stateIDs','getStypeIdWithName','canUse','applyItemUserEffect','hasSkill','CgVbf','zvdel','Game_BattlerBase_buffIconIndex','getStateReapplyRulings','_itemWindow','LPPsg','_subject','Game_BattlerBase_meetsSkillConditions','FUNC','drawItemStyleIcon','skillVisibleJS','nbJHc','process_VisuMZ_SkillsStatesCore_State_Notetags','Sprite_Gauge_currentMaxValue','onAddBuffGlobalJS','vCubU','xObCL','KoVLG','onExpireBuffJS','152183zMLLFP','GtmVq','TcjrD','TurnFontSize','slipHp','updateTurnDisplaySprite','FazJr','uiHelpPosition','clear','meetsPassiveStateGlobalConditionJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','Sprite_Gauge_gaugeRate','_buffTurns','HnEzV','recoverAll','RjNMu','Name','onExpireStateJS','createAllSkillCostText','aliveMembers','alterSkillName','Game_Action_testApply','Window_SkillList_maxCols','log','changePaintOpacity','Game_BattlerBase_initMembers','Game_BattlerBase_skillMpCost','XExYA','paramValueByName','BsrQZ','stateExpireJS','DataFontSize','uiMenuStyle','Game_Action_applyItemUserEffect','zQZsz','RytUN','UWRSH','scrollTo','members','reset','100381CDXENe','windowPadding','setStateData','pmUhY','VisuMZ_2_ClassChangeSystem','removeStatesByCategory','MAT','isActor','256397oQeIzG','229eAETmC','Nfnfa','checkShowHideSkillNotetags','fnubl','onExpireBuffGlobalJS','death','itemAt','_stateSteps','Buffs','shopStatusWindowRectSkillsStatesCore','categories','name','setActor','XjnGA','DEF','getClassIdWithName','Param','82832ZsNyzj','ezecy','floor','\x5cI[%1]%2','iconHeight','qmSeC','Game_BattlerBase_increaseBuff','ZKIzO','statusWidth','erWsa','_commandNameWindow','setDebuffTurns','isCommandEnabled','JIuMW','meetsPassiveStateConditions','eraseBuff','stateMpSlipDamageJS','MAXHP','makeCommandList','ParseSkillNotetags','dbrYG','actor','note','_result','RxIwu','_classIDs','_turnDisplaySprite','length','SkillConditionJS','updateFrame','indexOf','forgetSkill','dLVrz','drawActorIconsAllTurnCounters','Window_SkillType_initialize','match','stateColor','applyStateCategoryRemovalEffects','_currentActor','width','gaugeRate','ZQIQv','%1\x20%2\x20%3','66017anlzPF','Scene_Skill_createItemWindow','NUM','overwriteBuffTurns','buff','ShowData','resetTextColor','fontSize','ConvertParams','dWLLe','_stateTurns','getCurrentStateActiveUser','drawTextEx','EcPHR','Parse_Notetags_State_Category','drawActorStateTurns','Game_Battler_addBuff','addState','placeExactGauge','ATK','lineHeight','2phYKzG','hlSoS','testSkillStatesCoreNotetags','DOLdI','#%1','right','Sprite_StateIcon_loadBitmap','ZWaHC','exit','groupDefeat','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','frameCount','nxzNj','yWlLi','checkShowHideJS','skillEnableJS','Window_SkillStatus_refresh','addDebuff','VisuMZ_1_MainMenuCore','QIArk','aLEBM','currentDisplayedValue','VakwC','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','addDebuffTurns','setupSkillsStatesCore','addPassiveStates','removeStatesAuto','onExpireState','damage','ReapplyRules','Scene_Skill_skillTypeWindowRect','_stateMaxTurns','meetsSkillConditionsEnableJS','tpCost','constructor','stateMpSlipHealJS','IZSmx','qJchz','buffColor','JOvWS','round','_buffs','Game_BattlerBase_eraseState','stateTpSlipHealJS','clearStatesWithStateRetain','makeCurrentTroopUniqueID','center','Fnadc','States','split','VisuMZ_0_CoreEngine','debuffTurns','drawItemStyleIconText','avUvC','isStateRemoved','lDrmC','STR','Skills','onAddDebuff','filter','_cache','ActionEndUpdate','Game_BattlerBase_skillTpCost','max','decreaseBuff','stateAddJS','shopStatusWindowRect','jekdG','KrbJU','addBuff','Game_Troop_setup','BTYRh','iconIndex','MAXMP','apASU','ZBlCk','gradientFillRect','toUpperCase','auto','pLeqk','buttonAssistText1','_stateDisplay','AUmzN','ODMTp','EJxev','onEraseStateGlobalJS','yTFwR','ZvhzV','MrIni','drawText','PhuJd','IRHcg','buffTurns','DataOffsetY','clamp','drawActorStateData','add','makeSuccess','ePqrM','isBottomHelpMode','_stateData','GaugeCurrentJS','bitmap','checkSkillConditionsSwitchNotetags','VisuMZ_1_ElementStatusCore','buffIconIndex','setStateDisplay','includesSkillsStatesCore','removeBuff','DmYrS','onExpireDebuffGlobalJS','placeGauge','regenerateAllSkillsStatesCore','SkillSceneStatusBgType','replace','convertTargetToStateOriginKey','meetsPassiveStateConditionSwitches','EkhBt','uTSkk','_tempActor','mainCommandWidth','meetsPassiveStateConditionJS','Window_SkillList_updateHelp','itemWindowRect','GroupDigits','user','SkillMenuStatusRect','applyBuffTurnManipulationEffects','checkShowHideSwitchNotetags','oRMqi','uGtJu','stateData','Game_BattlerBase_resetStateCounts','meetsStateCondition','isSkillCostShown','EVAL','Alzuo','status','qbUfc','drawExtendedSkillsStatesCoreStatus','Game_Battler_addDebuff','Parse_Notetags_Skill_Cost','Game_Battler_isStateAddable','Global','onEraseDebuffJS','PassiveConditionJS','isUseSkillsStatesCoreUpdatedLayout','ColorNeutral','commandName','IconStypeNorm','toLowerCase','menuActor','XgrzL','addWindow','AGI','tMBMD','Game_BattlerBase_recoverAll','commandNameWindowDrawBackground','value','HuxSt','CqjED','hide','meetsSkillConditions','colSpacing','_animationIndex','textColor','WoRuz','updateStateTurns','Scene_Skill_itemWindowRect','skillId','keys','ignore','loadBitmap','none','drawActorIcons','mfiFv','contents','3LALUZL','canClearState','Game_BattlerBase_eraseBuff','BlLiD','drawSkillCost','504137SNKyzV','cEIBU','onEraseBuffJS','StackDebuffMax','Sprite_StateIcon_updateFrame','slipTp','xBbDk','_stypeIDs','equips','makeAdditionalSkillCostText','LayoutStyle','itemTextAlign','totalStateCategory','currentMaxValue','cxVwZ','updateStatesActionEnd','Scene_Skill_helpWindowRect','OZHfV','gainSilentTp','_shopStatusWindow','UNjaf','isStateCategoryAffected','Sprite_Gauge_currentValue','sYfzT','helpAreaTop','ShowTurns','Window_StatusBase_drawActorIcons','push','testApply','nYsJw','_stateRetainType','ANY','eraseState','createItemWindow','getStateData','onEraseStateJS','YjONw','DataOffsetX','itemLineRect','number','onAddStateJS','vaNTs','Game_Battler_regenerateAll','YEqHd','skillCostSeparator','drawIcon','isSkillUsableForAutoBattle','jiGBq','resetStateCounts','_scene','isBuffAffected','format','onRegenerateCustomStateDamageOverTime','SCVsB','initMembers','onAddDebuffJS','checkSkillConditionsNotetags','recalculateSlipDamageJS','state','setStypeId','redrawSkillsStatesCore','trim','onRemoveState','currentValue','active','uiInputPosition','QpebE','ARRAYJSON','ARRAYSTRUCT','MDF','onExpireStateCustomJS','resetFontSettings','debuffColor','ColorPositive','height','_skillIDs','ALL','QKtoD','test','ARRAYNUM','Window_SkillList_drawItem','LvQNi','includes','Game_BattlerBase_clearStates','WKVnx','BattleHiddenSkillTypes','_statusWindow','setBuffTurns','onExpireStateGlobalJS','opacity','isMaxBuffAffected','leERJ','process_VisuMZ_SkillsStatesCore_Skill_Notetags','onAddBuff','updateHelp','isStateResist','commandNameWindowCenter','seuBu','clearStateDisplay','Window_StatusBase_placeGauge','stateTurns','addCommand','FNPLI','isBuffPrevented','getColorDataFromPluginParameters','map','GrfSD','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','chtol','ParseClassIDs','nWdOB','UtWVw','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','getColor','_colorCache','CanPayJS','applyStateTurnManipulationEffects','CHvmO','gainMp','CmdTextAlign','Sprite_Gauge_initMembers','weDoC','tArHW','Parse_Notetags_State_ApplyRemoveLeaveJS','isPlaytest','OrRDL','createSkillCostText','Hpttm','Game_BattlerBase_states','setBackgroundType','clearStateData','changeTextColor','statesByCategory','_costSettings','STRUCT','ARRAYEVAL','updatedLayoutStyle','removeBuffsAuto','dGPML','QuVzo','stateId','ColorNegative','PayJS','mCtlH','skillMpCost','prototype','drawItem','setStateTurns','skillTypeWindowRectSkillsStatesCore','uTpFv','1CZbZGf','redraw','isGroupDefeatStateAffected','clearStates','BoWBT','swzkf','textSizeEx','Enemy','increaseBuff','zWxRC','statePassiveConditionJS','zZjtW','currentMaxValueSkillsStatesCore','sort','description','CoreEngine','skillTpCost','bbOYU','MultiplierJS','lOQdM','isBuffExpired','createShopStatusWindow','statusWindowRect','TextJS','bAjWz','Game_Actor_forgetSkill','_skillTypeWindow','_stored_state-%1-color','POSITIVE','isBuffOrDebuffAffected','commandStyleCheck','LCzap','currentClass','onEraseStateCustomJS','drawActorBuffTurns','acioW','onAddStateCustomJS','_currentTroopUniqueID','convertGaugeTypeSkillsStatesCore','xXmCe','VhNqk','checkShowHideBattleNotetags','ZYUDh','initMembersSkillsStatesCore','ARRAYFUNC','helpAreaHeight','_hidden','stateTpSlipDamageJS','adjustItemWidthByShopStatus','normalColor','lPAKR'];const _0x2043a5=_0x1e0b;(function(_0x34670a,_0x275a7d){const _0x2ded88=_0x1e0b;while(!![]){try{const _0xa148e6=parseInt(_0x2ded88(0x448))*-parseInt(_0x2ded88(0x37a))+parseInt(_0x2ded88(0x417))*-parseInt(_0x2ded88(0x499))+-parseInt(_0x2ded88(0x484))*-parseInt(_0x2ded88(0x256))+parseInt(_0x2ded88(0x43f))+-parseInt(_0x2ded88(0x2f1))*parseInt(_0x2ded88(0x447))+parseInt(_0x2ded88(0x459))+parseInt(_0x2ded88(0x25b));if(_0xa148e6===_0x275a7d)break;else _0x34670a['push'](_0x34670a['shift']());}catch(_0x35abf6){_0x34670a['push'](_0x34670a['shift']());}}}(_0x570a,0x2b40a));var label=_0x2043a5(0x332),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2043a5(0x1e0)](function(_0x476a94){const _0x329c09=_0x2043a5;return _0x476a94[_0x329c09(0x22e)]&&_0x476a94[_0x329c09(0x2ff)][_0x329c09(0x2ad)]('['+label+']');})[0x0];function _0x1e0b(_0x37882c,_0x49097b){_0x37882c=_0x37882c-0x1ae;let _0x570ab7=_0x570a[_0x37882c];return _0x570ab7;}VisuMZ[label][_0x2043a5(0x34b)]=VisuMZ[label][_0x2043a5(0x34b)]||{},VisuMZ[_0x2043a5(0x48c)]=function(_0x868f60,_0x2dce6e){const _0x25f1fb=_0x2043a5;for(const _0x50e340 in _0x2dce6e){if(_0x25f1fb(0x28a)!==_0x25f1fb(0x455)){if(_0x50e340[_0x25f1fb(0x47c)](/(.*):(.*)/i)){if(_0x25f1fb(0x278)==='PBuhC'){function _0x196890(){const _0xe1c815=_0x25f1fb,_0x13dcc7=_0x1b26f4[_0xe1c815(0x376)]('['+_0x53caec['$1'][_0xe1c815(0x47c)](/\d+/g)+']');for(const _0x17e1c5 of _0x13dcc7){if(_0x140073[_0xe1c815(0x243)](_0x17e1c5))return![];}return!![];}}else{const _0x3397ea=String(RegExp['$1']),_0x3bfaa1=String(RegExp['$2'])['toUpperCase']()[_0x25f1fb(0x298)]();let _0x539309,_0x2f1078,_0x4a8cfd;switch(_0x3bfaa1){case _0x25f1fb(0x486):_0x539309=_0x2dce6e[_0x50e340]!==''?Number(_0x2dce6e[_0x50e340]):0x0;break;case _0x25f1fb(0x2aa):_0x2f1078=_0x2dce6e[_0x50e340]!==''?JSON[_0x25f1fb(0x376)](_0x2dce6e[_0x50e340]):[],_0x539309=_0x2f1078[_0x25f1fb(0x2c4)](_0x6ec14d=>Number(_0x6ec14d));break;case _0x25f1fb(0x22c):_0x539309=_0x2dce6e[_0x50e340]!==''?eval(_0x2dce6e[_0x50e340]):null;break;case _0x25f1fb(0x2e2):_0x2f1078=_0x2dce6e[_0x50e340]!==''?JSON[_0x25f1fb(0x376)](_0x2dce6e[_0x50e340]):[],_0x539309=_0x2f1078[_0x25f1fb(0x2c4)](_0xb22079=>eval(_0xb22079));break;case'JSON':_0x539309=_0x2dce6e[_0x50e340]!==''?JSON[_0x25f1fb(0x376)](_0x2dce6e[_0x50e340]):'';break;case _0x25f1fb(0x29e):_0x2f1078=_0x2dce6e[_0x50e340]!==''?JSON['parse'](_0x2dce6e[_0x50e340]):[],_0x539309=_0x2f1078[_0x25f1fb(0x2c4)](_0x251a42=>JSON[_0x25f1fb(0x376)](_0x251a42));break;case _0x25f1fb(0x40c):_0x539309=_0x2dce6e[_0x50e340]!==''?new Function(JSON[_0x25f1fb(0x376)](_0x2dce6e[_0x50e340])):new Function('return\x200');break;case _0x25f1fb(0x31d):_0x2f1078=_0x2dce6e[_0x50e340]!==''?JSON[_0x25f1fb(0x376)](_0x2dce6e[_0x50e340]):[],_0x539309=_0x2f1078['map'](_0x34443e=>new Function(JSON[_0x25f1fb(0x376)](_0x34443e)));break;case _0x25f1fb(0x1dd):_0x539309=_0x2dce6e[_0x50e340]!==''?String(_0x2dce6e[_0x50e340]):'';break;case _0x25f1fb(0x37b):_0x2f1078=_0x2dce6e[_0x50e340]!==''?JSON[_0x25f1fb(0x376)](_0x2dce6e[_0x50e340]):[],_0x539309=_0x2f1078[_0x25f1fb(0x2c4)](_0x1fb680=>String(_0x1fb680));break;case _0x25f1fb(0x2e1):_0x4a8cfd=_0x2dce6e[_0x50e340]!==''?JSON[_0x25f1fb(0x376)](_0x2dce6e[_0x50e340]):{},_0x868f60[_0x3397ea]={},VisuMZ[_0x25f1fb(0x48c)](_0x868f60[_0x3397ea],_0x4a8cfd);continue;case _0x25f1fb(0x29f):_0x2f1078=_0x2dce6e[_0x50e340]!==''?JSON[_0x25f1fb(0x376)](_0x2dce6e[_0x50e340]):[],_0x539309=_0x2f1078[_0x25f1fb(0x2c4)](_0x16f41b=>VisuMZ[_0x25f1fb(0x48c)]({},JSON[_0x25f1fb(0x376)](_0x16f41b)));break;default:continue;}_0x868f60[_0x3397ea]=_0x539309;}}}else{function _0x4709d4(){const _0x176ef9=_0x25f1fb,_0x4b89f6=_0x1220e1['parse']('['+_0x93ee8d['$1'][_0x176ef9(0x47c)](/\d+/g)+']');for(const _0x1f3216 of _0x4b89f6){if(!_0x1e5c2b[_0x176ef9(0x243)](_0x1f3216))return!![];}return![];}}}return _0x868f60;},(_0x7a07d1=>{const _0x266457=_0x2043a5,_0x554cb7=_0x7a07d1['name'];for(const _0x403f32 of dependencies){if(!Imported[_0x403f32]){alert(_0x266457(0x1ae)[_0x266457(0x28e)](_0x554cb7,_0x403f32)),SceneManager[_0x266457(0x4a1)]();break;}}const _0x110fb8=_0x7a07d1[_0x266457(0x2ff)];if(_0x110fb8[_0x266457(0x47c)](/\[Version[ ](.*?)\]/i)){const _0x252490=Number(RegExp['$1']);if(_0x252490!==VisuMZ[label][_0x266457(0x3f1)]){if(_0x266457(0x360)==='xgIoU')alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x266457(0x28e)](_0x554cb7,_0x252490)),SceneManager[_0x266457(0x4a1)]();else{function _0x3c33bc(){const _0x1550c6=_0x266457;_0xb2a942[_0x1550c6(0x332)]['Sprite_StateIcon_updateFrame']['call'](this),this['updateTurnDisplaySprite']();}}}}if(_0x110fb8[_0x266457(0x47c)](/\[Tier[ ](\d+)\]/i)){const _0x27caad=Number(RegExp['$1']);if(_0x27caad<tier)alert(_0x266457(0x32a)[_0x266457(0x28e)](_0x554cb7,_0x27caad,tier)),SceneManager[_0x266457(0x4a1)]();else{if(_0x266457(0x466)!==_0x266457(0x466)){function _0x1cf3a3(){const _0x5f4cdf=_0x266457;if(typeof _0x51400e!==_0x5f4cdf(0x282))_0x3569e9=_0xd0d6ee['id'];if(this['isStateAffected'](_0x3a918c)){const _0x291db3=_0x34ae1a[_0x5f4cdf(0x344)](_0x310b8f);this[_0x5f4cdf(0x48e)][_0x5d6795]=_0x56ba2a['clamp'](0x0,_0x291db3);if(this[_0x5f4cdf(0x48e)][_0x2ce0f3]<=0x0)this['removeState'](_0x5e08e6);}}}else tier=Math[_0x266457(0x1e4)](_0x27caad,tier);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x7a07d1[_0x266457(0x3bf)]);})(pluginData),VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x3af)]=Scene_Boot[_0x2043a5(0x2ec)][_0x2043a5(0x3ac)],Scene_Boot[_0x2043a5(0x2ec)][_0x2043a5(0x3ac)]=function(){const _0x152d40=_0x2043a5;VisuMZ['SkillsStatesCore'][_0x152d40(0x3af)]['call'](this),this[_0x152d40(0x38d)]();},Scene_Boot[_0x2043a5(0x2ec)][_0x2043a5(0x38d)]=function(){const _0x119733=_0x2043a5;if(VisuMZ[_0x119733(0x331)])return;this['process_VisuMZ_SkillsStatesCore_Skill_Notetags'](),this[_0x119733(0x410)]();},Scene_Boot[_0x2043a5(0x2ec)][_0x2043a5(0x2b7)]=function(){const _0x31f9b7=_0x2043a5;for(const _0x352ced of $dataSkills){if(!_0x352ced)continue;VisuMZ[_0x31f9b7(0x332)][_0x31f9b7(0x232)](_0x352ced),VisuMZ['SkillsStatesCore'][_0x31f9b7(0x36b)](_0x352ced);}},Scene_Boot[_0x2043a5(0x2ec)][_0x2043a5(0x410)]=function(){const _0x28b3e2=_0x2043a5;for(const _0x125580 of $dataStates){if(!_0x125580)continue;VisuMZ[_0x28b3e2(0x332)][_0x28b3e2(0x492)](_0x125580),VisuMZ[_0x28b3e2(0x332)][_0x28b3e2(0x32e)](_0x125580),VisuMZ[_0x28b3e2(0x332)][_0x28b3e2(0x338)](_0x125580),VisuMZ[_0x28b3e2(0x332)][_0x28b3e2(0x2d6)](_0x125580);}},VisuMZ[_0x2043a5(0x332)]['ParseSkillNotetags']=VisuMZ[_0x2043a5(0x46c)],VisuMZ[_0x2043a5(0x46c)]=function(_0x39ebb4){const _0x126559=_0x2043a5;VisuMZ['SkillsStatesCore'][_0x126559(0x46c)][_0x126559(0x3d1)](this,_0x39ebb4),VisuMZ[_0x126559(0x332)][_0x126559(0x232)](_0x39ebb4),VisuMZ['SkillsStatesCore'][_0x126559(0x36b)](_0x39ebb4);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x3f0)]=VisuMZ['ParseStateNotetags'],VisuMZ['ParseStateNotetags']=function(_0x427779){const _0x36767d=_0x2043a5;VisuMZ[_0x36767d(0x332)][_0x36767d(0x3f0)][_0x36767d(0x3d1)](this,_0x427779),VisuMZ[_0x36767d(0x332)][_0x36767d(0x492)](_0x427779),VisuMZ[_0x36767d(0x332)][_0x36767d(0x32e)](_0x427779),VisuMZ[_0x36767d(0x332)]['Parse_Notetags_State_SlipEffectJS'](_0x427779),VisuMZ[_0x36767d(0x332)][_0x36767d(0x2d6)](_0x427779);},VisuMZ[_0x2043a5(0x332)]['Parse_Notetags_Skill_Cost']=function(_0x55bc2c){const _0x4b9dda=_0x2043a5,_0x4830cc=_0x55bc2c[_0x4b9dda(0x46f)];_0x4830cc[_0x4b9dda(0x47c)](/<MP COST:[ ](\d+)>/i)&&(_0x55bc2c['mpCost']=Number(RegExp['$1'])),_0x4830cc[_0x4b9dda(0x47c)](/<TP COST:[ ](\d+)>/i)&&(_0x55bc2c[_0x4b9dda(0x1c6)]=Number(RegExp['$1']));},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x1b3)]={},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x40e)]={},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x36b)]=function(_0x128312){const _0x439eff=_0x2043a5,_0x445f50=_0x128312['note'];if(_0x445f50[_0x439eff(0x47c)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x2ed626=String(RegExp['$1']),_0x5b4b14=_0x439eff(0x1bb)['format'](_0x2ed626);VisuMZ[_0x439eff(0x332)][_0x439eff(0x1b3)][_0x128312['id']]=new Function(_0x439eff(0x38c),_0x5b4b14);}if(_0x445f50[_0x439eff(0x47c)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if('pKlAB'===_0x439eff(0x310)){function _0x5515f1(){const _0x11afad=_0x439eff;if(_0x4acdb1[_0x11afad(0x2d7)]())_0x3c7f0d[_0x11afad(0x42e)](_0x571e7f);}}else{const _0x1e5f0c=String(RegExp['$1']),_0x351b8c=_0x439eff(0x2c6)['format'](_0x1e5f0c);VisuMZ[_0x439eff(0x332)][_0x439eff(0x40e)][_0x128312['id']]=new Function(_0x439eff(0x38c),_0x351b8c);}}},VisuMZ[_0x2043a5(0x332)]['Parse_Notetags_State_Category']=function(_0x226f5c){const _0x165c22=_0x2043a5;_0x226f5c[_0x165c22(0x452)]=[_0x165c22(0x2a7),_0x165c22(0x27a)];const _0x851e47=_0x226f5c[_0x165c22(0x46f)],_0x2f52e4=_0x851e47[_0x165c22(0x47c)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x2f52e4)for(const _0x2b08e4 of _0x2f52e4){_0x2b08e4[_0x165c22(0x47c)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3e7b62=String(RegExp['$1'])[_0x165c22(0x1f2)]()[_0x165c22(0x298)]()[_0x165c22(0x1d6)](',');for(const _0x5e1dd4 of _0x3e7b62){_0x226f5c['categories'][_0x165c22(0x276)](_0x5e1dd4[_0x165c22(0x298)]());}}if(_0x851e47[_0x165c22(0x47c)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if('HVCce'==='HVCce'){const _0x5d8085=RegExp['$1']['split'](/[\r\n]+/);for(const _0x218efb of _0x5d8085){_0x226f5c[_0x165c22(0x452)][_0x165c22(0x276)](_0x218efb[_0x165c22(0x1f2)]()[_0x165c22(0x298)]());}}else{function _0x3462b0(){const _0x2d8094=_0x165c22;let _0x2ab23a=this[_0x2d8094(0x335)](_0x11ba78);_0x1034d9['SkillsStatesCore'][_0x2d8094(0x1cf)][_0x2d8094(0x3d1)](this,_0x572bd2);if(_0x2ab23a&&!this[_0x2d8094(0x335)](_0x345c1d))this[_0x2d8094(0x299)](_0x36ed8b);}}}_0x851e47[_0x165c22(0x47c)](/<POSITIVE STATE>/i)&&_0x226f5c[_0x165c22(0x452)][_0x165c22(0x276)]('POSITIVE');if(_0x851e47[_0x165c22(0x47c)](/<NEGATIVE STATE>/i)){if(_0x165c22(0x1f7)!==_0x165c22(0x419))_0x226f5c[_0x165c22(0x452)]['push']('NEGATIVE');else{function _0x37db41(){const _0x1604ab=_0x165c22;return _0x3e0223[_0x1604ab(0x38b)];}}}},VisuMZ['SkillsStatesCore'][_0x2043a5(0x2fb)]={},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x32e)]=function(_0x561b74){const _0x24f832=_0x2043a5,_0x506c84=_0x561b74[_0x24f832(0x46f)];if(_0x506c84['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){if(_0x24f832(0x415)===_0x24f832(0x482)){function _0x86cc6e(){const _0x53e7bb=_0x24f832,_0x8702b2=this['_actor']!==_0x349e0d;_0x3a53c7[_0x53e7bb(0x332)][_0x53e7bb(0x347)]['call'](this,_0x5115cf),_0x8702b2&&(this['_statusWindow']&&this['_statusWindow'][_0x53e7bb(0x1c7)]===_0x3f0b34&&this[_0x53e7bb(0x2b1)][_0x53e7bb(0x329)](this['itemAt'](0x0)));}}else{const _0x44b1f7=String(RegExp['$1']),_0x35466e=_0x24f832(0x2cb)[_0x24f832(0x28e)](_0x44b1f7);VisuMZ[_0x24f832(0x332)][_0x24f832(0x2fb)][_0x561b74['id']]=new Function(_0x24f832(0x295),_0x35466e);}}},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x3c2)]={},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x33f)]={},VisuMZ[_0x2043a5(0x332)]['stateMpSlipDamageJS']={},VisuMZ['SkillsStatesCore']['stateMpSlipHealJS']={},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x320)]={},VisuMZ[_0x2043a5(0x332)]['stateTpSlipHealJS']={},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x338)]=function(_0x3ab127){const _0x59eb6b=_0x2043a5,_0x11c067=_0x3ab127[_0x59eb6b(0x46f)],_0x50adc5=_0x59eb6b(0x421);if(_0x11c067['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x308e22=String(RegExp['$1']),_0x3e6c9a=_0x50adc5[_0x59eb6b(0x28e)](_0x308e22,_0x59eb6b(0x1c1),-0x1,'slipHp');VisuMZ[_0x59eb6b(0x332)][_0x59eb6b(0x3c2)][_0x3ab127['id']]=new Function(_0x59eb6b(0x2e7),_0x3e6c9a);}else{if(_0x11c067['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if('BPUBP'!==_0x59eb6b(0x3e8)){const _0x53574a=String(RegExp['$1']),_0x1a8e05=_0x50adc5[_0x59eb6b(0x28e)](_0x53574a,_0x59eb6b(0x35b),0x1,'slipHp');VisuMZ[_0x59eb6b(0x332)][_0x59eb6b(0x33f)][_0x3ab127['id']]=new Function('stateId',_0x1a8e05);}else{function _0x103c19(){const _0x251e94=_0x59eb6b;return _0x3c23c4[_0x251e94(0x35d)]?_0x28d356[_0x251e94(0x2ec)]['statusWidth']():0x0;}}}}if(_0x11c067['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if('ybYen'===_0x59eb6b(0x1b8)){function _0x5996d4(){const _0x16a02e=_0x59eb6b;for(const _0x4ec0f0 of _0x3642a6){_0x4ec0f0[_0x16a02e(0x47c)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x37b42d=_0x1a414b[_0x16a02e(0x477)](_0x4f0954(_0x5a9ed7['$1'])['toUpperCase']()),_0x295568=_0x2c5cb1(_0x2085f4['$2']);_0x37b42d>=0x0&&(_0x5508db['addBuffTurns'](_0x37b42d,_0x295568),this[_0x16a02e(0x206)](_0x4553bc));}}}else{const _0x664c94=String(RegExp['$1']),_0x2c2a22=_0x50adc5[_0x59eb6b(0x28e)](_0x664c94,'damage',-0x1,'slipMp');VisuMZ[_0x59eb6b(0x332)][_0x59eb6b(0x469)][_0x3ab127['id']]=new Function(_0x59eb6b(0x2e7),_0x2c2a22);}}else{if(_0x11c067['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x5b5a3f=String(RegExp['$1']),_0x5924f7=_0x50adc5[_0x59eb6b(0x28e)](_0x5b5a3f,_0x59eb6b(0x35b),0x1,'slipMp');VisuMZ[_0x59eb6b(0x332)][_0x59eb6b(0x1c8)][_0x3ab127['id']]=new Function('stateId',_0x5924f7);}}if(_0x11c067['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x2e35da=String(RegExp['$1']),_0x2c683f=_0x50adc5[_0x59eb6b(0x28e)](_0x2e35da,_0x59eb6b(0x1c1),-0x1,_0x59eb6b(0x260));VisuMZ[_0x59eb6b(0x332)][_0x59eb6b(0x320)][_0x3ab127['id']]=new Function(_0x59eb6b(0x2e7),_0x2c683f);}else{if(_0x11c067[_0x59eb6b(0x47c)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x299b7b=String(RegExp['$1']),_0x266b14=_0x50adc5[_0x59eb6b(0x28e)](_0x299b7b,_0x59eb6b(0x35b),0x1,_0x59eb6b(0x260));VisuMZ[_0x59eb6b(0x332)][_0x59eb6b(0x1d0)][_0x3ab127['id']]=new Function('stateId',_0x266b14);}}},VisuMZ[_0x2043a5(0x332)]['stateAddJS']={},VisuMZ['SkillsStatesCore'][_0x2043a5(0x3ed)]={},VisuMZ['SkillsStatesCore'][_0x2043a5(0x435)]={},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x2d6)]=function(_0x330944){const _0x5023b8=_0x2043a5,_0x1e84ce=_0x330944[_0x5023b8(0x46f)],_0xbd0e6d=_0x5023b8(0x3ef);if(_0x1e84ce[_0x5023b8(0x47c)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x338c7d=String(RegExp['$1']),_0x1ccce=_0xbd0e6d[_0x5023b8(0x28e)](_0x338c7d);VisuMZ[_0x5023b8(0x332)][_0x5023b8(0x1e6)][_0x330944['id']]=new Function(_0x5023b8(0x2e7),_0x1ccce);}if(_0x1e84ce[_0x5023b8(0x47c)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x44711b=String(RegExp['$1']),_0x564002=_0xbd0e6d[_0x5023b8(0x28e)](_0x44711b);VisuMZ[_0x5023b8(0x332)][_0x5023b8(0x3ed)][_0x330944['id']]=new Function(_0x5023b8(0x2e7),_0x564002);}if(_0x1e84ce['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if(_0x5023b8(0x1fc)!==_0x5023b8(0x1fc)){function _0x26e51f(){const _0x147e60=_0x5023b8;let _0xb3842c=_0x63ee47[_0x147e60(0x332)][_0x147e60(0x2db)]['call'](this);if(this[_0x147e60(0x364)])return _0xb3842c;return this['_checkingPassiveStates']=!![],this['addPassiveStates'](_0xb3842c),this[_0x147e60(0x364)]=_0x4d1d43,_0xb3842c;}}else{const _0x50f206=String(RegExp['$1']),_0x4c0c90=_0xbd0e6d['format'](_0x50f206);VisuMZ[_0x5023b8(0x332)][_0x5023b8(0x435)][_0x330944['id']]=new Function('stateId',_0x4c0c90);}}},DataManager[_0x2043a5(0x457)]=function(_0x167242){const _0x3ef427=_0x2043a5;_0x167242=_0x167242[_0x3ef427(0x1f2)]()[_0x3ef427(0x298)](),this['_classIDs']=this[_0x3ef427(0x472)]||{};if(this[_0x3ef427(0x472)][_0x167242])return this['_classIDs'][_0x167242];for(const _0x35a125 of $dataClasses){if(!_0x35a125)continue;let _0x15d958=_0x35a125[_0x3ef427(0x453)];_0x15d958=_0x15d958['replace'](/\x1I\[(\d+)\]/gi,''),_0x15d958=_0x15d958[_0x3ef427(0x217)](/\\I\[(\d+)\]/gi,''),this[_0x3ef427(0x472)][_0x15d958[_0x3ef427(0x1f2)]()[_0x3ef427(0x298)]()]=_0x35a125['id'];}return this[_0x3ef427(0x472)][_0x167242]||0x0;},DataManager[_0x2043a5(0x36c)]=function(_0x392e17){const _0x572ca9=_0x2043a5;this['_stypeIDs']=this[_0x572ca9(0x262)]||{};if(this['_stypeIDs'][_0x392e17['id']])return this[_0x572ca9(0x262)][_0x392e17['id']];this[_0x572ca9(0x262)][_0x392e17['id']]=[_0x392e17['stypeId']];if(_0x392e17['note'][_0x572ca9(0x47c)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x448815=JSON[_0x572ca9(0x376)]('['+RegExp['$1']['match'](/\d+/g)+']');this['_stypeIDs'][_0x392e17['id']]=this[_0x572ca9(0x262)][_0x392e17['id']]['concat'](_0x448815);}else{if(_0x392e17['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x24ff7e=RegExp['$1'][_0x572ca9(0x1d6)](',');for(const _0x43267e of _0x24ff7e){const _0x50cd05=DataManager[_0x572ca9(0x400)](_0x43267e);if(_0x50cd05)this['_stypeIDs'][_0x392e17['id']][_0x572ca9(0x276)](_0x50cd05);}}}return this[_0x572ca9(0x262)][_0x392e17['id']];},DataManager[_0x2043a5(0x400)]=function(_0x34e3cb){const _0x1cb79a=_0x2043a5;_0x34e3cb=_0x34e3cb['toUpperCase']()[_0x1cb79a(0x298)](),this['_stypeIDs']=this[_0x1cb79a(0x262)]||{};if(this[_0x1cb79a(0x262)][_0x34e3cb])return this[_0x1cb79a(0x262)][_0x34e3cb];for(let _0x5e4792=0x1;_0x5e4792<0x64;_0x5e4792++){if(!$dataSystem['skillTypes'][_0x5e4792])continue;let _0x49cdcb=$dataSystem[_0x1cb79a(0x343)][_0x5e4792][_0x1cb79a(0x1f2)]()[_0x1cb79a(0x298)]();_0x49cdcb=_0x49cdcb[_0x1cb79a(0x217)](/\x1I\[(\d+)\]/gi,''),_0x49cdcb=_0x49cdcb[_0x1cb79a(0x217)](/\\I\[(\d+)\]/gi,''),this[_0x1cb79a(0x262)][_0x49cdcb]=_0x5e4792;}return this[_0x1cb79a(0x262)][_0x34e3cb]||0x0;},DataManager['getSkillIdWithName']=function(_0x1cfcc2){const _0x6bb3d9=_0x2043a5;_0x1cfcc2=_0x1cfcc2[_0x6bb3d9(0x1f2)]()[_0x6bb3d9(0x298)](),this['_skillIDs']=this['_skillIDs']||{};if(this['_skillIDs'][_0x1cfcc2])return this['_skillIDs'][_0x1cfcc2];for(const _0x1b396c of $dataSkills){if(!_0x1b396c)continue;this[_0x6bb3d9(0x2a6)][_0x1b396c[_0x6bb3d9(0x453)][_0x6bb3d9(0x1f2)]()[_0x6bb3d9(0x298)]()]=_0x1b396c['id'];}return this[_0x6bb3d9(0x2a6)][_0x1cfcc2]||0x0;},DataManager[_0x2043a5(0x3f2)]=function(_0x112999){const _0x4136ee=_0x2043a5;_0x112999=_0x112999['toUpperCase']()[_0x4136ee(0x298)](),this[_0x4136ee(0x3ff)]=this['_stateIDs']||{};if(this[_0x4136ee(0x3ff)][_0x112999])return this['_stateIDs'][_0x112999];for(const _0x47e4b8 of $dataStates){if('HWlsu'!=='DRovV'){if(!_0x47e4b8)continue;this[_0x4136ee(0x3ff)][_0x47e4b8['name'][_0x4136ee(0x1f2)]()[_0x4136ee(0x298)]()]=_0x47e4b8['id'];}else{function _0x5927c3(){const _0x538a5c=_0x4136ee;_0x2ce93b[_0x538a5c(0x3b1)](_0x5a4ebf,_0x3f6e9f),this[_0x538a5c(0x206)](_0x3fd144);}}}return this[_0x4136ee(0x3ff)][_0x112999]||0x0;},DataManager[_0x2043a5(0x344)]=function(_0x5da08d){const _0x1e552c=_0x2043a5;this[_0x1e552c(0x1c4)]=this[_0x1e552c(0x1c4)]||{};if(this['_stateMaxTurns'][_0x5da08d])return this[_0x1e552c(0x1c4)][_0x5da08d];if($dataStates[_0x5da08d]['note'][_0x1e552c(0x47c)](/<MAX TURNS:[ ](\d+)>/i)){if(_0x1e552c(0x462)!=='CqdPK')this[_0x1e552c(0x1c4)][_0x5da08d]=Number(RegExp['$1']);else{function _0x246b50(){const _0x18c05d=_0x1e552c;if(!_0x159ca8[_0x18c05d(0x243)](_0xc97a15))return![];}}}else this[_0x1e552c(0x1c4)][_0x5da08d]=VisuMZ[_0x1e552c(0x332)][_0x1e552c(0x34b)][_0x1e552c(0x1d5)][_0x1e552c(0x3bc)];return this[_0x1e552c(0x1c4)][_0x5da08d];},ColorManager['getColorDataFromPluginParameters']=function(_0xe8b3a1,_0x3c09b3){const _0x4fc636=_0x2043a5;return _0x3c09b3=String(_0x3c09b3),this[_0x4fc636(0x2cd)]=this[_0x4fc636(0x2cd)]||{},_0x3c09b3[_0x4fc636(0x47c)](/#(.*)/i)?this[_0x4fc636(0x2cd)][_0xe8b3a1]='#%1'[_0x4fc636(0x28e)](String(RegExp['$1'])):this[_0x4fc636(0x2cd)][_0xe8b3a1]=this[_0x4fc636(0x24a)](Number(_0x3c09b3)),this['_colorCache'][_0xe8b3a1];},ColorManager[_0x2043a5(0x2cc)]=function(_0x2d3d2){const _0x35faf3=_0x2043a5;return _0x2d3d2=String(_0x2d3d2),_0x2d3d2['match'](/#(.*)/i)?_0x35faf3(0x49d)[_0x35faf3(0x28e)](String(RegExp['$1'])):this[_0x35faf3(0x24a)](Number(_0x2d3d2));},ColorManager[_0x2043a5(0x47d)]=function(_0x44bfb3){const _0x46af5d=_0x2043a5;if(typeof _0x44bfb3===_0x46af5d(0x282))_0x44bfb3=$dataStates[_0x44bfb3];const _0x409dff=_0x46af5d(0x30c)[_0x46af5d(0x28e)](_0x44bfb3['id']);this[_0x46af5d(0x2cd)]=this[_0x46af5d(0x2cd)]||{};if(this[_0x46af5d(0x2cd)][_0x409dff])return this['_colorCache'][_0x409dff];const _0x2ee695=this['retrieveStateColor'](_0x44bfb3);return this['getColorDataFromPluginParameters'](_0x409dff,_0x2ee695);},ColorManager[_0x2043a5(0x334)]=function(_0x485d4e){const _0x38338d=_0x2043a5,_0x489b49=_0x485d4e[_0x38338d(0x46f)];if(_0x489b49[_0x38338d(0x47c)](/<TURN COLOR:[ ](.*)>/i)){if(_0x38338d(0x2bc)!==_0x38338d(0x348))return String(RegExp['$1']);else{function _0xbd9852(){const _0x3404f1=_0x38338d;if(typeof _0x8b8e42!==_0x3404f1(0x282))_0x114a94=_0x329002['id'];return this['_stateDisplay']=this[_0x3404f1(0x1f6)]||{},this[_0x3404f1(0x1f6)][_0x2218d3]===_0x5c4571&&(this[_0x3404f1(0x1f6)][_0x44ab99]=''),this[_0x3404f1(0x1f6)][_0x52ee1e];}}}else{if(_0x489b49[_0x38338d(0x47c)](/<POSITIVE STATE>/i))return VisuMZ['SkillsStatesCore'][_0x38338d(0x34b)][_0x38338d(0x1d5)][_0x38338d(0x2a4)];else{if(_0x489b49[_0x38338d(0x47c)](/<NEGATIVE STATE>/i)){if(_0x38338d(0x1b0)===_0x38338d(0x1b0))return VisuMZ[_0x38338d(0x332)]['Settings'][_0x38338d(0x1d5)][_0x38338d(0x2e8)];else{function _0x1f7dcf(){const _0x409ec9=_0x38338d;_0x14d8cc[_0x409ec9(0x2ec)][_0x409ec9(0x493)][_0x409ec9(0x3d1)](this,_0x5c3d55,_0x2d20ae,0x0,0x0),_0x2a26ec[_0x409ec9(0x2ec)]['drawActorStateData']['call'](this,_0x427ee9,_0x372af8,0x0,0x0);}}}else return VisuMZ['SkillsStatesCore'][_0x38338d(0x34b)][_0x38338d(0x1d5)][_0x38338d(0x238)];}}},ColorManager[_0x2043a5(0x1cb)]=function(){const _0x2e2ec5=_0x2043a5,_0x4ae450='_stored_buffColor';this[_0x2e2ec5(0x2cd)]=this['_colorCache']||{};if(this['_colorCache'][_0x4ae450])return this[_0x2e2ec5(0x2cd)][_0x4ae450];const _0x1e91eb=VisuMZ['SkillsStatesCore']['Settings'][_0x2e2ec5(0x450)][_0x2e2ec5(0x395)];return this['getColorDataFromPluginParameters'](_0x4ae450,_0x1e91eb);},ColorManager[_0x2043a5(0x2a3)]=function(){const _0x258aca=_0x2043a5,_0x170b66='_stored_debuffColor';this[_0x258aca(0x2cd)]=this[_0x258aca(0x2cd)]||{};if(this['_colorCache'][_0x170b66])return this[_0x258aca(0x2cd)][_0x170b66];const _0xa6ba53=VisuMZ['SkillsStatesCore']['Settings'][_0x258aca(0x450)]['ColorDebuff'];return this[_0x258aca(0x2c3)](_0x170b66,_0xa6ba53);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x382)]=BattleManager['endAction'],BattleManager[_0x2043a5(0x397)]=function(){const _0x5a5c5c=_0x2043a5;this[_0x5a5c5c(0x26a)](),VisuMZ['SkillsStatesCore']['BattleManager_endAction'][_0x5a5c5c(0x3d1)](this);},BattleManager[_0x2043a5(0x26a)]=function(){const _0x4d6e07=_0x2043a5,_0x3e26e7=VisuMZ[_0x4d6e07(0x332)]['Settings'][_0x4d6e07(0x1d5)];if(!_0x3e26e7)return;if(_0x3e26e7[_0x4d6e07(0x1e2)]===![])return;if(!this[_0x4d6e07(0x40a)])return;this[_0x4d6e07(0x40a)][_0x4d6e07(0x26a)]();},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x26a)]=function(){const _0x3fef2b=_0x2043a5;for(const _0x1b4192 of this[_0x3fef2b(0x33c)]){if(_0x3fef2b(0x272)!==_0x3fef2b(0x2c9)){const _0x33d930=$dataStates[_0x1b4192];if(!_0x33d930)continue;if(_0x33d930[_0x3fef2b(0x386)]!==0x1)continue;this[_0x3fef2b(0x48e)][_0x1b4192]>0x0&&this['_stateTurns'][_0x1b4192]--;}else{function _0x11a6ae(){const _0x26e499=_0x3fef2b;_0x3b7cd0['SkillsStatesCore'][_0x26e499(0x30a)][_0x26e499(0x3d1)](this,_0x41db68),this[_0x26e499(0x1e1)]={};}}}this[_0x3fef2b(0x1bf)](0x1);},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x24c)]=function(){const _0x4ee8ad=_0x2043a5,_0x1e1828=VisuMZ[_0x4ee8ad(0x332)][_0x4ee8ad(0x34b)][_0x4ee8ad(0x1d5)];for(const _0x3808fd of this[_0x4ee8ad(0x33c)]){const _0x313fe8=$dataStates[_0x3808fd];if(_0x1e1828&&_0x1e1828['ActionEndUpdate']!==![]){if('NGKoi'!=='NGKoi'){function _0xd20848(){const _0x2affac=_0x4ee8ad;_0x3d964d[_0x2affac(0x332)][_0x2affac(0x1eb)][_0x2affac(0x3d1)](this,_0x4d5071),this['makeCurrentTroopUniqueID']();}}else{if(_0x313fe8&&_0x313fe8['autoRemovalTiming']===0x1)continue;}}if(this['_stateTurns'][_0x3808fd]>0x0){if(_0x4ee8ad(0x29d)===_0x4ee8ad(0x304)){function _0xf20788(){const _0x38a691=_0x4ee8ad;return _0x38a691(0x49d)['format'](_0xb6f382(_0x351046['$1']));}}else this[_0x4ee8ad(0x48e)][_0x3808fd]--;}}},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x438)]=Game_Action[_0x2043a5(0x2ec)][_0x2043a5(0x402)],Game_Action[_0x2043a5(0x2ec)][_0x2043a5(0x402)]=function(_0x32a967){const _0x5d10ad=_0x2043a5;VisuMZ[_0x5d10ad(0x332)][_0x5d10ad(0x438)][_0x5d10ad(0x3d1)](this,_0x32a967),this[_0x5d10ad(0x388)](_0x32a967);},Game_Action[_0x2043a5(0x2ec)][_0x2043a5(0x388)]=function(_0x1c6cf6){const _0x14ff0b=_0x2043a5;this[_0x14ff0b(0x47e)](_0x1c6cf6),this['applyStateTurnManipulationEffects'](_0x1c6cf6),this[_0x14ff0b(0x224)](_0x1c6cf6),this['applyDebuffTurnManipulationEffects'](_0x1c6cf6);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x42c)]=Game_Action[_0x2043a5(0x2ec)][_0x2043a5(0x277)],Game_Action[_0x2043a5(0x2ec)]['testApply']=function(_0x4d1094){const _0x1b4116=_0x2043a5;if(this[_0x1b4116(0x49b)](_0x4d1094)){if(_0x1b4116(0x261)!==_0x1b4116(0x261)){function _0x433beb(){const _0x188112=_0x1b4116,_0xc2280c=_0x4e5018[_0x188112(0x3c7)]-this[_0x188112(0x34d)](),_0x5c464b=this[_0x188112(0x38f)]()-this[_0x188112(0x2b1)][_0x188112(0x2a5)],_0x545e89=this['isRightInputMode']()?_0x3737fc[_0x188112(0x3c7)]-_0xc2280c:0x0,_0x224d64=this[_0x188112(0x2b1)]['y']+this['_statusWindow'][_0x188112(0x2a5)];return new _0x21d028(_0x545e89,_0x224d64,_0xc2280c,_0x5c464b);}}else return!![];}return VisuMZ['SkillsStatesCore']['Game_Action_testApply'][_0x1b4116(0x3d1)](this,_0x4d1094);},Game_Action['prototype']['testSkillStatesCoreNotetags']=function(_0x31eec8){const _0x4dbec0=_0x2043a5,_0x303291=this[_0x4dbec0(0x33a)]()[_0x4dbec0(0x46f)];if(_0x303291[_0x4dbec0(0x47c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x4dbec0(0x3c8)===_0x4dbec0(0x3c8)){const _0x43a0c6=String(RegExp['$1']);if(_0x31eec8[_0x4dbec0(0x270)](_0x43a0c6))return!![];}else{function _0x2e71e4(){const _0x5117a5=_0x4dbec0,_0xdd7d69=_0x52be24[_0x5117a5(0x376)]('['+_0x45e506['$1'][_0x5117a5(0x47c)](/\d+/g)+']');for(const _0x56606a of _0xdd7d69){if(!_0x8a21dd[_0x5117a5(0x243)](_0x56606a))return!![];}return![];}}}if(_0x303291[_0x4dbec0(0x47c)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if('OzqXC'!=='OzqXC'){function _0x18f779(){const _0x584207=_0x4dbec0;if(this[_0x584207(0x21c)]||this[_0x584207(0x389)])return;try{_0x496e51[_0x584207(0x332)]['Settings']['States'][_0x584207(0x27e)]['call'](this,_0x19a541);}catch(_0x44dc12){if(_0x12a6b4[_0x584207(0x2d7)]())_0x2eca49['log'](_0x44dc12);}}}else{const _0x455742=Number(RegExp['$1']);if(_0x31eec8['isStateAffected'](_0x455742))return!![];}}else{if(_0x303291['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x4be62b=DataManager[_0x4dbec0(0x3f2)](RegExp['$1']);if(_0x31eec8[_0x4dbec0(0x335)](_0x4be62b))return!![];}}return![];},Game_Action[_0x2043a5(0x2ec)][_0x2043a5(0x47e)]=function(_0x9f1449){const _0x566529=_0x2043a5;if(_0x9f1449['states']()['length']<=0x0)return;const _0x5072b5=this['item']()['note'];if(_0x5072b5[_0x566529(0x47c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){const _0x1fe701=String(RegExp['$1']);_0x9f1449[_0x566529(0x3a1)](_0x1fe701);}const _0x209b79=_0x5072b5[_0x566529(0x47c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x209b79){if(_0x566529(0x2e5)===_0x566529(0x290)){function _0x1764c7(){const _0x3def29=_0x566529;this[_0x3def29(0x47e)](_0x100391),this[_0x3def29(0x2cf)](_0x15a0a0),this['applyBuffTurnManipulationEffects'](_0x51b13c),this['applyDebuffTurnManipulationEffects'](_0x34f9a7);}}else for(const _0xf1c5f2 of _0x209b79){_0xf1c5f2[_0x566529(0x47c)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x26041f=String(RegExp['$1']),_0x52cb85=Number(RegExp['$2']);_0x9f1449[_0x566529(0x444)](_0x26041f,_0x52cb85);}}},Game_Action[_0x2043a5(0x2ec)][_0x2043a5(0x2cf)]=function(_0x2cba4a){const _0x27c4d7=_0x2043a5,_0x29dbe8=this[_0x27c4d7(0x33a)]()['note'],_0x4c4f88=_0x29dbe8['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x4c4f88)for(const _0x7fa5b5 of _0x4c4f88){if(_0x27c4d7(0x26c)!=='VMmkp'){let _0x1b0385=0x0,_0xa28f38=0x0;if(_0x7fa5b5[_0x27c4d7(0x47c)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x27c4d7(0x1e8)===_0x27c4d7(0x1e8))_0x1b0385=Number(RegExp['$1']),_0xa28f38=Number(RegExp['$2']);else{function _0x5121a3(){const _0x5bef29=_0x27c4d7,_0x17f74e=_0x307467[_0x5bef29(0x46f)];if(_0x17f74e[_0x5bef29(0x47c)](/<HIDE IN BATTLE>/i)&&_0x22763f['inBattle']())return![];else return _0x17f74e['match'](/<HIDE OUTSIDE BATTLE>/i)&&!_0x391058[_0x5bef29(0x37c)]()?![]:!![];}}}else{if(_0x7fa5b5[_0x27c4d7(0x47c)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)){if(_0x27c4d7(0x22f)===_0x27c4d7(0x240)){function _0x2edfdf(){const _0x42e32f=_0x27c4d7;this[_0x42e32f(0x412)](_0x39b0ee,_0x39f4a0);}}else _0x1b0385=DataManager[_0x27c4d7(0x3f2)](RegExp['$1']),_0xa28f38=Number(RegExp['$2']);}}_0x2cba4a[_0x27c4d7(0x2ee)](_0x1b0385,_0xa28f38),this[_0x27c4d7(0x206)](_0x2cba4a);}else{function _0x215575(){const _0x41789b=_0x27c4d7;if(!_0x21428e[_0x41789b(0x243)](_0x4fd2ee))return![];}}}const _0x4949ba=_0x29dbe8['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4949ba)for(const _0x149c9e of _0x4949ba){let _0x571521=0x0,_0x444c5e=0x0;if(_0x149c9e[_0x27c4d7(0x47c)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x27c4d7(0x314)==='acioW')_0x571521=Number(RegExp['$1']),_0x444c5e=Number(RegExp['$2']);else{function _0x22d4cb(){const _0x1888a4=_0x27c4d7;return this[_0x1888a4(0x237)]()?this[_0x1888a4(0x36f)]():_0x3b1192['SkillsStatesCore']['Scene_Skill_helpWindowRect'][_0x1888a4(0x3d1)](this);}}}else{if(_0x149c9e[_0x27c4d7(0x47c)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x27c4d7(0x269)===_0x27c4d7(0x479)){function _0x5bbb41(){const _0x13d22d=_0x27c4d7;return _0x21a5ba[_0x13d22d(0x332)][_0x13d22d(0x34b)][_0x13d22d(0x1de)][_0x13d22d(0x3e6)];}}else _0x571521=DataManager[_0x27c4d7(0x3f2)](RegExp['$1']),_0x444c5e=Number(RegExp['$2']);}}_0x2cba4a[_0x27c4d7(0x328)](_0x571521,_0x444c5e),this[_0x27c4d7(0x206)](_0x2cba4a);}},Game_Action['prototype']['applyBuffTurnManipulationEffects']=function(_0x2470d8){const _0x608b04=_0x2043a5,_0x4b4c2c=[_0x608b04(0x46a),_0x608b04(0x1ee),_0x608b04(0x497),_0x608b04(0x456),'MAT',_0x608b04(0x2a0),_0x608b04(0x23f),_0x608b04(0x32b)],_0x49e886=this['item']()[_0x608b04(0x46f)],_0x49e58=_0x49e886[_0x608b04(0x47c)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x49e58)for(const _0x52e90d of _0x49e58){if(_0x608b04(0x2d5)!==_0x608b04(0x2d5)){function _0x349ba6(){return _0x5cadcf[_0x5cb01c['id']]['call'](this,_0x365d54);}}else{_0x52e90d[_0x608b04(0x47c)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0xb24171=_0x4b4c2c['indexOf'](String(RegExp['$1'])['toUpperCase']()),_0xde8d28=Number(RegExp['$2']);if(_0xb24171>=0x0){if('HRCiD'==='KxDYt'){function _0x5ac56c(){const _0x4e5c0a=_0x608b04;return _0x232e8d[_0x4e5c0a(0x332)][_0x4e5c0a(0x26b)]['call'](this);}}else _0x2470d8[_0x608b04(0x2b2)](_0xb24171,_0xde8d28),this['makeSuccess'](_0x2470d8);}}}const _0x3c8e39=_0x49e886[_0x608b04(0x47c)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3c8e39){if(_0x608b04(0x21b)!=='zlfln')for(const _0x86cec0 of _0x49e58){_0x86cec0[_0x608b04(0x47c)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2aad74=_0x4b4c2c[_0x608b04(0x477)](String(RegExp['$1'])[_0x608b04(0x1f2)]()),_0x2f25f0=Number(RegExp['$2']);if(_0x2aad74>=0x0){if('GHdmH'!==_0x608b04(0x333))_0x2470d8[_0x608b04(0x3b1)](_0x2aad74,_0x2f25f0),this['makeSuccess'](_0x2470d8);else{function _0x15fc7a(){const _0xf4c4fc=_0x608b04;this[_0xf4c4fc(0x239)](_0x2d1cef)[_0xf4c4fc(0x47c)](/\\I\[(\d+)\]/i);const _0x58803f=_0x5a5ad9(_0x270a91['$1'])||0x0,_0xe04238=this[_0xf4c4fc(0x281)](_0x442f43),_0x182dca=_0xe04238['x']+_0xf512c6[_0xf4c4fc(0x45b)]((_0xe04238[_0xf4c4fc(0x480)]-_0x2fea1f['iconWidth'])/0x2),_0x1ef3c7=_0xe04238['y']+(_0xe04238[_0xf4c4fc(0x2a5)]-_0x3fb260['iconHeight'])/0x2;this['drawIcon'](_0x58803f,_0x182dca,_0x1ef3c7);}}}}else{function _0x5c7e7a(){const _0x5d5b24=_0x608b04,_0x2966f9=this['_commandNameWindow'],_0x21e6b3=_0x5c42fa[_0x5d5b24(0x440)](),_0x3b0b1f=_0x1cf27b['x']+_0x594ecb[_0x5d5b24(0x45b)](_0x184546['width']/0x2)+_0x21e6b3;_0x2966f9['x']=_0x2966f9['width']/-0x2+_0x3b0b1f,_0x2966f9['y']=_0xd5310e['floor'](_0x471e57[_0x5d5b24(0x2a5)]/0x2);}}}},Game_Action['prototype']['applyDebuffTurnManipulationEffects']=function(_0x53fc21){const _0x319083=_0x2043a5,_0x5a02c3=[_0x319083(0x46a),_0x319083(0x1ee),'ATK','DEF',_0x319083(0x445),_0x319083(0x2a0),_0x319083(0x23f),_0x319083(0x32b)],_0x5578ce=this['item']()[_0x319083(0x46f)],_0x5e6bc8=_0x5578ce[_0x319083(0x47c)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x5e6bc8){if('KBaeJ'!==_0x319083(0x367))for(const _0x51bb3c of _0x5e6bc8){_0x51bb3c['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x4c3537=_0x5a02c3[_0x319083(0x477)](String(RegExp['$1'])[_0x319083(0x1f2)]()),_0x14d700=Number(RegExp['$2']);_0x4c3537>=0x0&&(_0x53fc21[_0x319083(0x464)](_0x4c3537,_0x14d700),this[_0x319083(0x206)](_0x53fc21));}else{function _0x254850(){return _0x5379e4['_subject'];}}}const _0x4eaf69=_0x5578ce[_0x319083(0x47c)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4eaf69)for(const _0x80e572 of _0x5e6bc8){if('HZLbI'===_0x319083(0x3c9)){function _0x51e5f7(){const _0x377817=_0x319083;this['_cache']={},_0x3ab4a4[_0x377817(0x332)][_0x377817(0x3fe)][_0x377817(0x3d1)](this);}}else{_0x80e572['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x51c03b=_0x5a02c3[_0x319083(0x477)](String(RegExp['$1'])['toUpperCase']()),_0x3567f9=Number(RegExp['$2']);_0x51c03b>=0x0&&(_0x53fc21[_0x319083(0x1bc)](_0x51c03b,_0x3567f9),this['makeSuccess'](_0x53fc21));}}},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x430)]=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x291)],Game_BattlerBase[_0x2043a5(0x2ec)]['initMembers']=function(){const _0x3918b1=_0x2043a5;this['_cache']={},this[_0x3918b1(0x31c)](),VisuMZ[_0x3918b1(0x332)]['Game_BattlerBase_initMembers'][_0x3918b1(0x3d1)](this);},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x31c)]=function(){const _0x3b8fd3=_0x2043a5;this['_stateRetainType']='',this[_0x3b8fd3(0x209)]={},this[_0x3b8fd3(0x1f6)]={},this[_0x3b8fd3(0x3a6)]={};},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x3d5)]=function(_0x107ee1){const _0x390c64=_0x2043a5;return this[_0x390c64(0x1e1)]=this['_cache']||{},this[_0x390c64(0x1e1)][_0x107ee1]!==undefined;},VisuMZ[_0x2043a5(0x332)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x346)],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x346)]=function(){const _0x14e2ae=_0x2043a5;this[_0x14e2ae(0x1e1)]={},VisuMZ[_0x14e2ae(0x332)][_0x14e2ae(0x3fe)]['call'](this);},VisuMZ[_0x2043a5(0x332)]['Game_BattlerBase_eraseState']=Game_BattlerBase['prototype']['eraseState'],Game_BattlerBase[_0x2043a5(0x2ec)]['eraseState']=function(_0x41adcb){const _0x59ec16=_0x2043a5;let _0x596ca4=this[_0x59ec16(0x335)](_0x41adcb);VisuMZ[_0x59ec16(0x332)][_0x59ec16(0x1cf)][_0x59ec16(0x3d1)](this,_0x41adcb);if(_0x596ca4&&!this[_0x59ec16(0x335)](_0x41adcb))this[_0x59ec16(0x299)](_0x41adcb);},Game_BattlerBase['prototype']['onRemoveState']=function(_0x3e09da){const _0x2ba1cc=_0x2043a5;this[_0x2ba1cc(0x2dd)](_0x3e09da),this['clearStateDisplay'](_0x3e09da),this['clearStateOrigin'](_0x3e09da);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x229)]=Game_BattlerBase['prototype'][_0x2043a5(0x28b)],Game_BattlerBase[_0x2043a5(0x2ec)]['resetStateCounts']=function(_0x4f71e4){const _0x3eba67=_0x2043a5,_0x1c90ba=$dataStates[_0x4f71e4],_0x5b66c9=this[_0x3eba67(0x2bf)](_0x4f71e4),_0x1223dd=this['getStateReapplyRulings'](_0x1c90ba)[_0x3eba67(0x23b)]()['trim']();switch(_0x1223dd){case _0x3eba67(0x250):if(_0x5b66c9<=0x0)VisuMZ[_0x3eba67(0x332)]['Game_BattlerBase_resetStateCounts']['call'](this,_0x4f71e4);break;case _0x3eba67(0x43e):VisuMZ['SkillsStatesCore'][_0x3eba67(0x229)]['call'](this,_0x4f71e4);break;case'greater':VisuMZ[_0x3eba67(0x332)][_0x3eba67(0x229)][_0x3eba67(0x3d1)](this,_0x4f71e4),this[_0x3eba67(0x48e)][_0x4f71e4]=Math[_0x3eba67(0x1e4)](this[_0x3eba67(0x48e)][_0x4f71e4],_0x5b66c9);break;case _0x3eba67(0x205):VisuMZ[_0x3eba67(0x332)][_0x3eba67(0x229)]['call'](this,_0x4f71e4),this['_stateTurns'][_0x4f71e4]+=_0x5b66c9;break;default:VisuMZ['SkillsStatesCore'][_0x3eba67(0x229)][_0x3eba67(0x3d1)](this,_0x4f71e4);break;}},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x407)]=function(_0x11131d){const _0x413efd=_0x2043a5,_0x663cb4=_0x11131d[_0x413efd(0x46f)];if(_0x663cb4[_0x413efd(0x47c)](/<REAPPLY RULES:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x413efd(0x3ec)==='VqNOK')return VisuMZ[_0x413efd(0x332)][_0x413efd(0x34b)][_0x413efd(0x1d5)][_0x413efd(0x1c2)];else{function _0x5abbe8(){const _0xcbecea=_0x413efd;_0x2286cf[_0xcbecea(0x332)]['Game_Battler_addDebuff']['call'](this,_0x4718b6,_0x5401fa),this[_0xcbecea(0x392)](_0x333158)&&this[_0xcbecea(0x1df)](_0x5cac7a,_0x3f1832);}}}},VisuMZ[_0x2043a5(0x332)]['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x487)],Game_BattlerBase['prototype'][_0x2043a5(0x487)]=function(_0x941b66,_0x145f96){const _0x431e75=_0x2043a5,_0x1719e1=VisuMZ[_0x431e75(0x332)]['Settings'][_0x431e75(0x450)][_0x431e75(0x1c2)],_0x2e0889=this[_0x431e75(0x201)](_0x941b66);switch(_0x1719e1){case _0x431e75(0x250):if(_0x2e0889<=0x0)this[_0x431e75(0x423)][_0x941b66]=_0x145f96;break;case _0x431e75(0x43e):this['_buffTurns'][_0x941b66]=_0x145f96;break;case'greater':this[_0x431e75(0x423)][_0x941b66]=Math[_0x431e75(0x1e4)](_0x2e0889,_0x145f96);break;case'add':this['_buffTurns'][_0x941b66]+=_0x145f96;break;default:VisuMZ[_0x431e75(0x332)][_0x431e75(0x35e)][_0x431e75(0x3d1)](this,_0x941b66,_0x145f96);break;}const _0x19a4b6=VisuMZ[_0x431e75(0x332)][_0x431e75(0x34b)][_0x431e75(0x450)]['MaxTurns'];this['_buffTurns'][_0x941b66]=this[_0x431e75(0x423)][_0x941b66][_0x431e75(0x203)](0x0,_0x19a4b6);},Game_BattlerBase[_0x2043a5(0x2ec)]['isGroupDefeatStateAffected']=function(){const _0x1c084e=_0x2043a5;if(this['_cache'][_0x1c084e(0x4a2)]!==undefined)return this[_0x1c084e(0x1e1)][_0x1c084e(0x4a2)];this[_0x1c084e(0x1e1)][_0x1c084e(0x4a2)]=![];const _0x16dea4=this[_0x1c084e(0x3d4)]();for(const _0x135693 of _0x16dea4){if(!_0x135693)continue;if(_0x135693[_0x1c084e(0x46f)][_0x1c084e(0x47c)](/<GROUP DEFEAT>/i)){this[_0x1c084e(0x1e1)]['groupDefeat']=!![];break;}}return this['_cache']['groupDefeat'];},VisuMZ['SkillsStatesCore'][_0x2043a5(0x2ae)]=Game_BattlerBase['prototype']['clearStates'],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x2f4)]=function(){const _0x546f0f=_0x2043a5;if(this[_0x546f0f(0x3eb)]()!==''){if(_0x546f0f(0x35a)!==_0x546f0f(0x414))this[_0x546f0f(0x1d1)]();else{function _0x449484(){const _0x4d14f9=_0x546f0f;if(_0x33449b[_0x4d14f9(0x47c)](/<member-(\d+)>/i))return _0x54b55e[_0x4d14f9(0x43d)]()[_0x1e12c3(_0x7ce90c['$1'])];}}}else{if(_0x546f0f(0x34f)==='rqHCW')VisuMZ[_0x546f0f(0x332)][_0x546f0f(0x2ae)][_0x546f0f(0x3d1)](this),this[_0x546f0f(0x31c)]();else{function _0xcf50fa(){const _0x16c608=_0x546f0f,_0x575e75=_0x400a25(_0x4d0582['$1']),_0x33aa78=_0x16c608(0x2c6)[_0x16c608(0x28e)](_0x575e75);_0x97a43d[_0x16c608(0x332)][_0x16c608(0x40e)][_0x410fa4['id']]=new _0x55538a(_0x16c608(0x38c),_0x33aa78);}}}},Game_Actor[_0x2043a5(0x2ec)][_0x2043a5(0x2f4)]=function(){const _0x163db8=_0x2043a5;this[_0x163db8(0x44f)]=this[_0x163db8(0x44f)]||{},Game_Battler[_0x163db8(0x2ec)]['clearStates']['call'](this);},Game_BattlerBase['prototype'][_0x2043a5(0x1d1)]=function(){const _0x46e276=_0x2043a5,_0x2a5949=this[_0x46e276(0x3d4)]();for(const _0x3ac834 of _0x2a5949){if(_0x3ac834&&this[_0x46e276(0x257)](_0x3ac834))this[_0x46e276(0x27b)](_0x3ac834['id']);}this[_0x46e276(0x1e1)]={};},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x257)]=function(_0x1dab8e){const _0x4064b5=_0x2043a5,_0x34e2b2=this[_0x4064b5(0x3eb)]();if(_0x34e2b2!==''){if(_0x4064b5(0x353)!==_0x4064b5(0x2c5)){const _0x1716ba=_0x1dab8e[_0x4064b5(0x46f)];if(_0x34e2b2===_0x4064b5(0x44d)&&_0x1716ba[_0x4064b5(0x47c)](/<NO DEATH CLEAR>/i))return![];if(_0x34e2b2===_0x4064b5(0x37f)&&_0x1716ba[_0x4064b5(0x47c)](/<NO RECOVER ALL CLEAR>/i))return![];}else{function _0x2ea649(){const _0xe7de2c=_0x4064b5,_0x274f56=_0x506f4d[_0xe7de2c(0x376)]('['+_0x498bad['$1']['match'](/\d+/g)+']');for(const _0x51be34 of _0x274f56){if(!_0x2951c2[_0xe7de2c(0x243)](_0x51be34))return![];}return!![];}}}return this[_0x4064b5(0x335)](_0x1dab8e['id']);},Game_BattlerBase[_0x2043a5(0x2ec)]['getStateRetainType']=function(){return this['_stateRetainType'];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x371)]=function(_0x477e25){this['_stateRetainType']=_0x477e25;},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x35f)]=function(){const _0x2235de=_0x2043a5;this[_0x2235de(0x279)]='';},VisuMZ[_0x2043a5(0x332)]['Game_BattlerBase_die']=Game_BattlerBase[_0x2043a5(0x2ec)]['die'],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x381)]=function(){const _0x4e7f27=_0x2043a5;this[_0x4e7f27(0x371)](_0x4e7f27(0x44d)),VisuMZ[_0x4e7f27(0x332)]['Game_BattlerBase_die'][_0x4e7f27(0x3d1)](this),this[_0x4e7f27(0x35f)]();},VisuMZ[_0x2043a5(0x332)]['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x425)],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x425)]=function(){const _0x40e228=_0x2043a5;this[_0x40e228(0x371)](_0x40e228(0x37f)),VisuMZ[_0x40e228(0x332)][_0x40e228(0x241)]['call'](this),this[_0x40e228(0x35f)]();},Game_BattlerBase[_0x2043a5(0x2ec)]['canPaySkillCost']=function(_0x558c31){const _0x5cd406=_0x2043a5;for(settings of VisuMZ[_0x5cd406(0x332)][_0x5cd406(0x34b)]['Costs']){const _0x1f7146=settings['CalcJS'][_0x5cd406(0x3d1)](this,_0x558c31);if(!settings[_0x5cd406(0x2ce)][_0x5cd406(0x3d1)](this,_0x558c31,_0x1f7146))return![];}return!![];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x3ea)]=function(_0x326c0c){const _0x1bf999=_0x2043a5;for(settings of VisuMZ[_0x1bf999(0x332)][_0x1bf999(0x34b)][_0x1bf999(0x3ce)]){const _0x30135d=settings[_0x1bf999(0x3e4)]['call'](this,_0x326c0c);settings['PayJS'][_0x1bf999(0x3d1)](this,_0x326c0c,_0x30135d);}},VisuMZ['SkillsStatesCore'][_0x2043a5(0x40b)]=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x247)],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x247)]=function(_0x163610){const _0x399c86=_0x2043a5;if(!_0x163610)return![];if(!VisuMZ[_0x399c86(0x332)]['Game_BattlerBase_meetsSkillConditions'][_0x399c86(0x3d1)](this,_0x163610))return![];if(!this[_0x399c86(0x293)](_0x163610))return![];if(!this[_0x399c86(0x1c5)](_0x163610))return![];if(!this[_0x399c86(0x3b6)](_0x163610))return![];return!![];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x293)]=function(_0x4566c2){const _0xfef6e1=_0x2043a5;if(!this[_0xfef6e1(0x20c)](_0x4566c2))return![];return!![];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x20c)]=function(_0x17b109){const _0x39c6f7=_0x2043a5,_0x53c0e3=_0x17b109['note'];if(_0x53c0e3[_0x39c6f7(0x47c)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x39c6f7(0x3a2)!=='ERKZE'){const _0x550b22=JSON[_0x39c6f7(0x376)]('['+RegExp['$1'][_0x39c6f7(0x47c)](/\d+/g)+']');for(const _0x1b0dd0 of _0x550b22){if(_0x39c6f7(0x449)!==_0x39c6f7(0x245)){if(!$gameSwitches[_0x39c6f7(0x243)](_0x1b0dd0))return![];}else{function _0x1eb49f(){const _0x5e20da=_0x39c6f7;return this[_0x5e20da(0x24a)](_0x22b51f(_0x5acb65));}}}return!![];}else{function _0x5fce5b(){const _0x3552f3=_0x39c6f7;if(!_0x16604c[_0x3552f3(0x243)](_0x450a52))return!![];}}}if(_0x53c0e3['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('IdDVx'!=='tADPf'){const _0x5ec0b0=JSON[_0x39c6f7(0x376)]('['+RegExp['$1'][_0x39c6f7(0x47c)](/\d+/g)+']');for(const _0x5ebf41 of _0x5ec0b0){if(_0x39c6f7(0x26f)==='UNjaf'){if(!$gameSwitches[_0x39c6f7(0x243)](_0x5ebf41))return![];}else{function _0x21790d(){const _0x5b5bca=_0x39c6f7,_0x28b45b=_0x36b3cf[_0x5b5bca(0x46f)];if(_0x28b45b[_0x5b5bca(0x47c)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x1efc72=_0x1e2e20(_0x43d0b4['$1']),_0x1fed30=_0x5b5bca(0x2cb)[_0x5b5bca(0x28e)](_0x1efc72);_0xe079f8['SkillsStatesCore'][_0x5b5bca(0x2fb)][_0x481780['id']]=new _0x58904d(_0x5b5bca(0x295),_0x1fed30);}}}}return!![];}else{function _0x55e73a(){return _0x2e7a6c;}}}if(_0x53c0e3[_0x39c6f7(0x47c)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('XTlLz'!==_0x39c6f7(0x1e9)){const _0x331cc4=JSON[_0x39c6f7(0x376)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3e2c13 of _0x331cc4){if($gameSwitches[_0x39c6f7(0x243)](_0x3e2c13))return!![];}return![];}else{function _0x2a7c47(){const _0x333138=_0x39c6f7;if(this[_0x333138(0x327)][_0x333138(0x38e)](_0x1ed08a))return!![];}}}if(_0x53c0e3[_0x39c6f7(0x47c)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x46ac8c=JSON[_0x39c6f7(0x376)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2df447 of _0x46ac8c){if(!$gameSwitches[_0x39c6f7(0x243)](_0x2df447))return!![];}return![];}if(_0x53c0e3['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13464b=JSON[_0x39c6f7(0x376)]('['+RegExp['$1'][_0x39c6f7(0x47c)](/\d+/g)+']');for(const _0x40cb30 of _0x13464b){if(!$gameSwitches[_0x39c6f7(0x243)](_0x40cb30))return!![];}return![];}if(_0x53c0e3['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x301f34=JSON['parse']('['+RegExp['$1'][_0x39c6f7(0x47c)](/\d+/g)+']');for(const _0x828ed of _0x301f34){if(_0x39c6f7(0x365)===_0x39c6f7(0x391)){function _0x3fd760(){const _0x1f4302=_0x39c6f7;this['isStateExpired'](_0x596574['id'])&&_0x186b9a[_0x1f4302(0x386)]===_0x561edd&&(this[_0x1f4302(0x3bb)](_0x1c2f03['id']),this[_0x1f4302(0x1c0)](_0x3b12ea['id']),this['onExpireStateGlobalJS'](_0x1e833e['id']));}}else{if($gameSwitches[_0x39c6f7(0x243)](_0x828ed))return![];}}return!![];}return!![];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x1c5)]=function(_0x3bfd29){const _0x4cfd17=_0x2043a5,_0x3b76d2=_0x3bfd29[_0x4cfd17(0x46f)],_0x3a1ac7=VisuMZ[_0x4cfd17(0x332)][_0x4cfd17(0x1b3)];if(_0x3a1ac7[_0x3bfd29['id']]){if(_0x4cfd17(0x27f)!==_0x4cfd17(0x3b5))return _0x3a1ac7[_0x3bfd29['id']][_0x4cfd17(0x3d1)](this,_0x3bfd29);else{function _0x3f61f5(){const _0x55a349=_0x4cfd17;this[_0x55a349(0x1bd)](_0x33443e,_0x5d24c2),_0x56d356=_0x25826b['toLowerCase'](),_0x258ba1[_0x55a349(0x332)]['Sprite_Gauge_setup'][_0x55a349(0x3d1)](this,_0x4f5873,_0x5eeae3);}}}else return!![];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x3b6)]=function(_0x2d4084){const _0x36db0e=_0x2043a5;return VisuMZ[_0x36db0e(0x332)][_0x36db0e(0x34b)]['Skills'][_0x36db0e(0x475)][_0x36db0e(0x3d1)](this,_0x2d4084);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x431)]=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x2eb)],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x2eb)]=function(_0x2f15f5){const _0x15c68c=_0x2043a5;for(settings of VisuMZ[_0x15c68c(0x332)][_0x15c68c(0x34b)][_0x15c68c(0x3ce)]){if(settings['Name'][_0x15c68c(0x1f2)]()==='MP')return settings[_0x15c68c(0x3e4)][_0x15c68c(0x3d1)](this,_0x2f15f5);}return VisuMZ[_0x15c68c(0x332)][_0x15c68c(0x431)][_0x15c68c(0x3d1)](this,_0x2f15f5);},VisuMZ['SkillsStatesCore'][_0x2043a5(0x1e3)]=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x301)],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x301)]=function(_0x59328b){const _0x10eb62=_0x2043a5;for(settings of VisuMZ['SkillsStatesCore'][_0x10eb62(0x34b)][_0x10eb62(0x3ce)]){if(settings['Name'][_0x10eb62(0x1f2)]()==='TP'){if(_0x10eb62(0x3f4)!==_0x10eb62(0x43b))return settings[_0x10eb62(0x3e4)][_0x10eb62(0x3d1)](this,_0x59328b);else{function _0x172b65(){const _0x19da87=_0x10eb62;return this[_0x19da87(0x2e0)][_0x19da87(0x380)][_0x19da87(0x3d1)](this[_0x19da87(0x355)]);}}}}return VisuMZ['SkillsStatesCore'][_0x10eb62(0x1e3)]['call'](this,_0x59328b);},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x359)]=function(_0x264c3a){const _0x17c943=_0x2043a5;if(typeof _0x264c3a===_0x17c943(0x282))_0x264c3a=$dataStates[_0x264c3a];return this[_0x17c943(0x3d4)]()[_0x17c943(0x2ad)](_0x264c3a);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_states']=Game_BattlerBase['prototype'][_0x2043a5(0x3d4)],Game_BattlerBase['prototype'][_0x2043a5(0x3d4)]=function(){const _0x2ceda9=_0x2043a5;let _0x6483f1=VisuMZ[_0x2ceda9(0x332)][_0x2ceda9(0x2db)][_0x2ceda9(0x3d1)](this);if(this['_checkingPassiveStates'])return _0x6483f1;return this['_checkingPassiveStates']=!![],this[_0x2ceda9(0x1be)](_0x6483f1),this['_checkingPassiveStates']=undefined,_0x6483f1;},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x1be)]=function(_0x38d55d){const _0x2cfdd2=_0x2043a5,_0x4b5daa=this['passiveStates']();for(state of _0x4b5daa){if(_0x2cfdd2(0x323)!==_0x2cfdd2(0x413)){if(!state)continue;if(!this[_0x2cfdd2(0x336)](state)&&_0x38d55d[_0x2cfdd2(0x2ad)](state))continue;_0x38d55d[_0x2cfdd2(0x276)](state);}else{function _0x3541e1(){const _0x140115=_0x2cfdd2,_0x3b9aee=this[_0x140115(0x30f)](_0x4748cc);if(_0x3b9aee==='iconText')this[_0x140115(0x1d9)](_0x17c16b);else _0x3b9aee==='icon'?this['drawItemStyleIcon'](_0x4c178d):_0x892109[_0x140115(0x2ec)]['drawItem'][_0x140115(0x3d1)](this,_0x1a7f80);}}}_0x4b5daa[_0x2cfdd2(0x474)]>0x0&&_0x38d55d[_0x2cfdd2(0x2fe)]((_0x3e6b10,_0x15e4a9)=>{const _0x231f93=_0x2cfdd2,_0x44b75b=_0x3e6b10[_0x231f93(0x368)],_0x1ff39d=_0x15e4a9[_0x231f93(0x368)];if(_0x44b75b!==_0x1ff39d)return _0x1ff39d-_0x44b75b;return _0x3e6b10-_0x15e4a9;});},Game_BattlerBase['prototype'][_0x2043a5(0x336)]=function(_0x24bc9a){const _0x210e60=_0x2043a5;return _0x24bc9a[_0x210e60(0x46f)][_0x210e60(0x47c)](/<PASSIVE STACKABLE>/i);},Game_BattlerBase[_0x2043a5(0x2ec)]['convertPassiveStates']=function(){const _0xcdb079=_0x2043a5,_0x7c4fa8=[];for(const _0x335b77 of this[_0xcdb079(0x1e1)][_0xcdb079(0x342)]){const _0x214b5e=$dataStates[_0x335b77];if(!_0x214b5e)continue;if(!this[_0xcdb079(0x467)](_0x214b5e))continue;_0x7c4fa8['push'](_0x214b5e);}return _0x7c4fa8;},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x467)]=function(_0x157055){const _0x35757e=_0x2043a5;if(!this[_0x35757e(0x3bd)](_0x157055))return![];if(!this[_0x35757e(0x219)](_0x157055))return![];if(!this['meetsPassiveStateConditionJS'](_0x157055))return![];if(!this[_0x35757e(0x420)](_0x157055))return![];return!![];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x3bd)]=function(_0x1481a1){return!![];},Game_Actor[_0x2043a5(0x2ec)]['meetsPassiveStateConditionClasses']=function(_0x3560f6){const _0x2f85b6=_0x2043a5,_0x3a4830=_0x3560f6[_0x2f85b6(0x46f)];if(_0x3a4830[_0x2f85b6(0x47c)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x295a56=String(RegExp['$1'])[_0x2f85b6(0x1d6)](',')[_0x2f85b6(0x2c4)](_0x5ad47b=>_0x5ad47b[_0x2f85b6(0x298)]()),_0x4bc6df=VisuMZ[_0x2f85b6(0x332)][_0x2f85b6(0x2c8)](_0x295a56);return _0x4bc6df[_0x2f85b6(0x2ad)](this['currentClass']());}if(_0x3a4830[_0x2f85b6(0x47c)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x2f85b6(0x319)!==_0x2f85b6(0x319)){function _0xef6a89(){return this['statusWindowRectSkillsStatesCore']();}}else{const _0x3df0ba=String(RegExp['$1'])[_0x2f85b6(0x1d6)](',')[_0x2f85b6(0x2c4)](_0x2b12d4=>_0x2b12d4[_0x2f85b6(0x298)]()),_0x518413=VisuMZ[_0x2f85b6(0x332)][_0x2f85b6(0x2c8)](_0x3df0ba);let _0x43a6af=[this[_0x2f85b6(0x311)]()];if(Imported[_0x2f85b6(0x443)]&&this[_0x2f85b6(0x384)]){if('XExYA'===_0x2f85b6(0x432))_0x43a6af=this[_0x2f85b6(0x384)]();else{function _0x495dba(){const _0x3ada2e=_0x2f85b6;if(typeof _0x2271e2!==_0x3ada2e(0x282))_0x15a9d0=_0x413c9c['id'];return this[_0x3ada2e(0x209)]=this[_0x3ada2e(0x209)]||{},this[_0x3ada2e(0x209)][_0x1c61b2]=this[_0x3ada2e(0x209)][_0xc2ad00]||{},this[_0x3ada2e(0x209)][_0xdce00e];}}}return _0x518413['filter'](_0x310c96=>_0x43a6af['includes'](_0x310c96))['length']>0x0;}}return Game_BattlerBase[_0x2f85b6(0x2ec)][_0x2f85b6(0x3bd)][_0x2f85b6(0x3d1)](this,_0x3560f6);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x2c8)]=function(_0x499418){const _0xd5c307=_0x2043a5,_0x5a8ec5=[];for(let _0x52fc25 of _0x499418){if(_0xd5c307(0x40f)!==_0xd5c307(0x409)){_0x52fc25=(String(_0x52fc25)||'')[_0xd5c307(0x298)]();const _0x22c25b=/^\d+$/[_0xd5c307(0x2a9)](_0x52fc25);if(_0x22c25b)_0x5a8ec5[_0xd5c307(0x276)](Number(_0x52fc25));else{if(_0xd5c307(0x1c9)!=='sPBUR')_0x5a8ec5['push'](DataManager[_0xd5c307(0x457)](_0x52fc25));else{function _0x31a7a6(){const _0x451a64=_0xd5c307;this[_0x451a64(0x3c3)](_0x19b403['id']);}}}}else{function _0x47e6a1(){_0x3a9de4=_0x475741(_0x54b7e2['$1']),_0xd73276=_0x523f22(_0x4ac3d9['$2']);}}}return _0x5a8ec5['map'](_0x8ccedd=>$dataClasses[Number(_0x8ccedd)])['remove'](null);},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x219)]=function(_0x5651ae){const _0x20904a=_0x2043a5,_0xd0f0b0=_0x5651ae[_0x20904a(0x46f)];if(_0xd0f0b0['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x20904a(0x471)!==_0x20904a(0x471)){function _0x4f5014(){const _0x1820a0=_0x20904a;this[_0x1820a0(0x2b1)][_0x1820a0(0x329)](this['item']());}}else{const _0x3e8b7d=JSON['parse']('['+RegExp['$1'][_0x20904a(0x47c)](/\d+/g)+']');for(const _0x131c41 of _0x3e8b7d){if(!$gameSwitches[_0x20904a(0x243)](_0x131c41))return![];}return!![];}}if(_0xd0f0b0['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11e79d=JSON[_0x20904a(0x376)]('['+RegExp['$1'][_0x20904a(0x47c)](/\d+/g)+']');for(const _0x350269 of _0x11e79d){if(!$gameSwitches[_0x20904a(0x243)](_0x350269))return![];}return!![];}if(_0xd0f0b0[_0x20904a(0x47c)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x20904a(0x2da)!==_0x20904a(0x2b6)){const _0x45e5da=JSON[_0x20904a(0x376)]('['+RegExp['$1'][_0x20904a(0x47c)](/\d+/g)+']');for(const _0x337696 of _0x45e5da){if($gameSwitches[_0x20904a(0x243)](_0x337696))return!![];}return![];}else{function _0x7c94ee(){const _0xcd561d=_0x20904a;this[_0xcd561d(0x20b)][_0xcd561d(0x41f)](),this[_0xcd561d(0x297)]();}}}if(_0xd0f0b0['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23f26a=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x7aa3e7 of _0x23f26a){if(!$gameSwitches[_0x20904a(0x243)](_0x7aa3e7))return!![];}return![];}if(_0xd0f0b0[_0x20904a(0x47c)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x20904a(0x385)==='ORjlH'){function _0x923c18(){const _0x385c0f=_0x20904a;if(!_0x59223c[_0x385c0f(0x35d)])return![];else return this[_0x385c0f(0x237)]()?!![]:_0x3aeb23['SkillsStatesCore'][_0x385c0f(0x34b)]['Skills'][_0x385c0f(0x3e6)];}}else{const _0x13befc=JSON[_0x20904a(0x376)]('['+RegExp['$1'][_0x20904a(0x47c)](/\d+/g)+']');for(const _0x40b44b of _0x13befc){if(_0x20904a(0x2a8)!==_0x20904a(0x2a8)){function _0x34e6db(){const _0x4de40d=_0x20904a,_0x3d7260=_0x3451dc(_0x2c6dab['$1']),_0x2af750=_0x566c55[_0x4de40d(0x28e)](_0x3d7260,'damage',-0x1,_0x4de40d(0x41b));_0xdee2d8[_0x4de40d(0x332)][_0x4de40d(0x3c2)][_0x3f78b5['id']]=new _0x515f0d('stateId',_0x2af750);}}else{if(!$gameSwitches[_0x20904a(0x243)](_0x40b44b))return!![];}}return![];}}if(_0xd0f0b0['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12cfc0=JSON[_0x20904a(0x376)]('['+RegExp['$1'][_0x20904a(0x47c)](/\d+/g)+']');for(const _0x2bc797 of _0x12cfc0){if($gameSwitches[_0x20904a(0x243)](_0x2bc797))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x2043a5(0x21e)]=function(_0x4f3e08){const _0x3dbfbb=_0x2043a5,_0x56a301=VisuMZ[_0x3dbfbb(0x332)][_0x3dbfbb(0x2fb)];if(_0x56a301[_0x4f3e08['id']]&&!_0x56a301[_0x4f3e08['id']][_0x3dbfbb(0x3d1)](this,_0x4f3e08))return![];return!![];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x420)]=function(_0x506431){const _0x454b91=_0x2043a5;return VisuMZ[_0x454b91(0x332)][_0x454b91(0x34b)]['PassiveStates'][_0x454b91(0x236)][_0x454b91(0x3d1)](this,_0x506431);},Game_BattlerBase['prototype'][_0x2043a5(0x342)]=function(){const _0x5880da=_0x2043a5;if(this[_0x5880da(0x3d5)](_0x5880da(0x342)))return this['convertPassiveStates']();if(this[_0x5880da(0x369)])return[];return this[_0x5880da(0x369)]=!![],this[_0x5880da(0x1e1)][_0x5880da(0x342)]=[],this['addPassiveStatesFromOtherPlugins'](),this['addPassiveStatesByNotetag'](),this['addPassiveStatesByPluginParameters'](),this[_0x5880da(0x369)]=undefined,this[_0x5880da(0x3ae)]();},Game_BattlerBase[_0x2043a5(0x2ec)]['addPassiveStatesFromOtherPlugins']=function(){const _0x3cb4b7=_0x2043a5;if(Imported[_0x3cb4b7(0x20d)])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x3b4)]=function(){return[];},Game_BattlerBase['prototype'][_0x2043a5(0x3e2)]=function(){const _0xecac2d=_0x2043a5,_0x5917c8=this[_0xecac2d(0x3b4)]();for(const _0x29b8f0 of _0x5917c8){if(!_0x29b8f0)continue;const _0x25e989=_0x29b8f0[_0xecac2d(0x46f)][_0xecac2d(0x47c)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x25e989)for(const _0x3463e3 of _0x25e989){_0x3463e3[_0xecac2d(0x47c)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0xbfecc7=RegExp['$1'];if(_0xbfecc7[_0xecac2d(0x47c)](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0xecac2d(0x25c)===_0xecac2d(0x25c)){const _0x5a992e=JSON[_0xecac2d(0x376)]('['+RegExp['$1'][_0xecac2d(0x47c)](/\d+/g)+']');this[_0xecac2d(0x1e1)]['passiveStates']=this[_0xecac2d(0x1e1)][_0xecac2d(0x342)][_0xecac2d(0x3fd)](_0x5a992e);}else{function _0x37772d(){const _0x4ac813=_0xecac2d;return _0x337889=_0x25ee61(_0x283d3a),_0x117c72[_0x4ac813(0x47c)](/#(.*)/i)?_0x4ac813(0x49d)[_0x4ac813(0x28e)](_0x2cf026(_0x45b70e['$1'])):this[_0x4ac813(0x24a)](_0x499e35(_0x23bd34));}}}else{if(_0xecac2d(0x22d)!==_0xecac2d(0x1fb)){const _0x38e713=_0xbfecc7[_0xecac2d(0x1d6)](',');for(const _0x271341 of _0x38e713){const _0x5bb2d5=DataManager[_0xecac2d(0x3f2)](_0x271341);if(_0x5bb2d5)this[_0xecac2d(0x1e1)][_0xecac2d(0x342)]['push'](_0x5bb2d5);}}else{function _0x8ee762(){const _0x20b608=_0xecac2d;return _0xb1da8e[_0x20b608(0x332)][_0x20b608(0x34b)][_0x20b608(0x1de)][_0x20b608(0x265)];}}}}}},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x3c1)]=function(){const _0x310cb2=_0x2043a5,_0x33260c=VisuMZ[_0x310cb2(0x332)]['Settings'][_0x310cb2(0x351)][_0x310cb2(0x234)];this[_0x310cb2(0x1e1)]['passiveStates']=this[_0x310cb2(0x1e1)][_0x310cb2(0x342)]['concat'](_0x33260c);},Game_BattlerBase['prototype']['stateTurns']=function(_0x4d5ef5){const _0x1b1a46=_0x2043a5;if(typeof _0x4d5ef5!==_0x1b1a46(0x282))_0x4d5ef5=_0x4d5ef5['id'];return this[_0x1b1a46(0x48e)][_0x4d5ef5]||0x0;},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x2ee)]=function(_0x20cdef,_0x37510d){const _0x4b921a=_0x2043a5;if(typeof _0x20cdef!==_0x4b921a(0x282))_0x20cdef=_0x20cdef['id'];if(this['isStateAffected'](_0x20cdef)){const _0x594421=DataManager[_0x4b921a(0x344)](_0x20cdef);this[_0x4b921a(0x48e)][_0x20cdef]=_0x37510d[_0x4b921a(0x203)](0x0,_0x594421);if(this['_stateTurns'][_0x20cdef]<=0x0)this[_0x4b921a(0x3bb)](_0x20cdef);}},Game_BattlerBase['prototype'][_0x2043a5(0x328)]=function(_0x2a663b,_0x26a391){const _0x5773cc=_0x2043a5;if(typeof _0x2a663b!==_0x5773cc(0x282))_0x2a663b=_0x2a663b['id'];if(this[_0x5773cc(0x335)](_0x2a663b)){if(_0x5773cc(0x39e)!==_0x5773cc(0x39e)){function _0x4ed6de(){const _0x54985a=_0x5773cc;_0x791bbe[_0x54985a(0x332)][_0x54985a(0x34b)]['Buffs'][_0x54985a(0x292)]['call'](this,_0x544d22,_0x4b5df2);}}else _0x26a391+=this[_0x5773cc(0x2bf)](_0x2a663b),this[_0x5773cc(0x2ee)](_0x2a663b,_0x26a391);}},VisuMZ['SkillsStatesCore'][_0x2043a5(0x258)]=Game_BattlerBase[_0x2043a5(0x2ec)]['eraseBuff'],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x468)]=function(_0x96e12){const _0x65de4d=_0x2043a5,_0x121af8=this[_0x65de4d(0x1ce)][_0x96e12];VisuMZ[_0x65de4d(0x332)][_0x65de4d(0x258)][_0x65de4d(0x3d1)](this,_0x96e12);if(_0x121af8>0x0)this[_0x65de4d(0x3ab)](_0x96e12);if(_0x121af8<0x0)this['onEraseDebuff'](_0x96e12);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x45f)]=Game_BattlerBase['prototype'][_0x2043a5(0x2f9)],Game_BattlerBase['prototype'][_0x2043a5(0x2f9)]=function(_0x2079f6){const _0x1b8c7b=_0x2043a5;VisuMZ['SkillsStatesCore']['Game_BattlerBase_increaseBuff'][_0x1b8c7b(0x3d1)](this,_0x2079f6);if(!this[_0x1b8c7b(0x30e)](_0x2079f6))this[_0x1b8c7b(0x468)](_0x2079f6);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x39c)]=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x1e5)],Game_BattlerBase['prototype'][_0x2043a5(0x1e5)]=function(_0x40723f){const _0x83db72=_0x2043a5;VisuMZ[_0x83db72(0x332)][_0x83db72(0x39c)][_0x83db72(0x3d1)](this,_0x40723f);if(!this[_0x83db72(0x30e)](_0x40723f))this[_0x83db72(0x468)](_0x40723f);},Game_BattlerBase[_0x2043a5(0x2ec)]['onEraseBuff']=function(_0x5ac0a9){},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x3e7)]=function(_0x3f3be1){},Game_BattlerBase['prototype'][_0x2043a5(0x2b5)]=function(_0x3b66e6){const _0x1428c1=_0x2043a5;return this['_buffs'][_0x3b66e6]===VisuMZ[_0x1428c1(0x332)][_0x1428c1(0x34b)]['Buffs'][_0x1428c1(0x324)];},Game_BattlerBase['prototype']['isMaxDebuffAffected']=function(_0x14f067){const _0xb70c4c=_0x2043a5;return this[_0xb70c4c(0x1ce)][_0x14f067]===-VisuMZ[_0xb70c4c(0x332)][_0xb70c4c(0x34b)][_0xb70c4c(0x450)][_0xb70c4c(0x25e)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x20e)],Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x20e)]=function(_0x2a0a61,_0x4e369f){const _0x36d364=_0x2043a5;return _0x2a0a61=_0x2a0a61[_0x36d364(0x203)](-0x2,0x2),VisuMZ[_0x36d364(0x332)][_0x36d364(0x406)]['call'](this,_0x2a0a61,_0x4e369f);},Game_BattlerBase[_0x2043a5(0x2ec)]['paramBuffRate']=function(_0x31668e){const _0x4d77bc=_0x2043a5,_0x23a7c6=this[_0x4d77bc(0x1ce)][_0x31668e];return VisuMZ[_0x4d77bc(0x332)][_0x4d77bc(0x34b)][_0x4d77bc(0x450)][_0x4d77bc(0x303)]['call'](this,_0x31668e,_0x23a7c6);},Game_BattlerBase['prototype']['buffTurns']=function(_0x15b3f4){return this['_buffTurns'][_0x15b3f4]||0x0;},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x1d8)]=function(_0x575889){const _0x317d89=_0x2043a5;return this[_0x317d89(0x201)](_0x575889);},Game_BattlerBase['prototype'][_0x2043a5(0x2b2)]=function(_0x228d21,_0x30956d){const _0x9d3851=_0x2043a5;if(this[_0x9d3851(0x28d)](_0x228d21)){const _0x1ccec7=VisuMZ[_0x9d3851(0x332)][_0x9d3851(0x34b)]['Buffs']['MaxTurns'];this[_0x9d3851(0x423)][_0x228d21]=_0x30956d[_0x9d3851(0x203)](0x0,_0x1ccec7);}},Game_BattlerBase['prototype'][_0x2043a5(0x3b1)]=function(_0x4da49f,_0x4c757d){const _0x5c5599=_0x2043a5;if(this['isBuffAffected'](_0x4da49f)){if(_0x5c5599(0x460)!=='KjFJj')_0x4c757d+=this[_0x5c5599(0x201)](stateId),this[_0x5c5599(0x2ee)](_0x4da49f,_0x4c757d);else{function _0xc9bb94(){const _0x4b6c8e=_0x5c5599;if(!this['meetsPassiveStateConditionClasses'](_0x58474c))return![];if(!this[_0x4b6c8e(0x219)](_0x1e8691))return![];if(!this[_0x4b6c8e(0x21e)](_0x5c74e1))return![];if(!this[_0x4b6c8e(0x420)](_0x5ab7c1))return![];return!![];}}}},Game_BattlerBase[_0x2043a5(0x2ec)]['setDebuffTurns']=function(_0x22b9df,_0x8c8e3e){const _0x5d1394=_0x2043a5;if(this['isDebuffAffected'](_0x22b9df)){if('RBBOY'===_0x5d1394(0x32f)){const _0x396650=VisuMZ[_0x5d1394(0x332)]['Settings']['Buffs'][_0x5d1394(0x3bc)];this['_buffTurns'][_0x22b9df]=_0x8c8e3e['clamp'](0x0,_0x396650);}else{function _0x1f5ef0(){const _0x171df3=_0x5d1394,_0x49675f=_0xd0ae3a['SkillsStatesCore'][_0x171df3(0x34b)][_0x171df3(0x450)][_0x171df3(0x3bc)];this[_0x171df3(0x423)][_0x3668a2]=_0x5076c9['clamp'](0x0,_0x49675f);}}}},Game_BattlerBase['prototype'][_0x2043a5(0x1bc)]=function(_0x3de991,_0x6912a9){const _0x3a20b9=_0x2043a5;this[_0x3a20b9(0x392)](_0x3de991)&&(_0x6912a9+=this[_0x3a20b9(0x201)](stateId),this[_0x3a20b9(0x2ee)](_0x3de991,_0x6912a9));},Game_BattlerBase[_0x2043a5(0x2ec)]['stateData']=function(_0x13cb68){const _0x388b9a=_0x2043a5;if(typeof _0x13cb68!==_0x388b9a(0x282))_0x13cb68=_0x13cb68['id'];return this[_0x388b9a(0x209)]=this['_stateData']||{},this[_0x388b9a(0x209)][_0x13cb68]=this['_stateData'][_0x13cb68]||{},this[_0x388b9a(0x209)][_0x13cb68];},Game_BattlerBase['prototype'][_0x2043a5(0x27d)]=function(_0x345e9a,_0x157db5){const _0x5f01c1=_0x2043a5;if(typeof _0x345e9a!=='number')_0x345e9a=_0x345e9a['id'];const _0x3ea0fc=this[_0x5f01c1(0x228)](_0x345e9a);return _0x3ea0fc[_0x157db5];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x441)]=function(_0x17d8fd,_0x56a167,_0x46e866){const _0x2b6e80=_0x2043a5;if(typeof _0x17d8fd!==_0x2b6e80(0x282))_0x17d8fd=_0x17d8fd['id'];const _0x57c884=this['stateData'](_0x17d8fd);_0x57c884[_0x56a167]=_0x46e866;},Game_BattlerBase['prototype'][_0x2043a5(0x2dd)]=function(_0x33497b){const _0x23e03a=_0x2043a5;if(typeof _0x33497b!==_0x23e03a(0x282))_0x33497b=_0x33497b['id'];this[_0x23e03a(0x209)]=this[_0x23e03a(0x209)]||{},this[_0x23e03a(0x209)][_0x33497b]={};},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x345)]=function(_0x4815f6){const _0x3009cb=_0x2043a5;if(typeof _0x4815f6!==_0x3009cb(0x282))_0x4815f6=_0x4815f6['id'];return this[_0x3009cb(0x1f6)]=this[_0x3009cb(0x1f6)]||{},this[_0x3009cb(0x1f6)][_0x4815f6]===undefined&&(this[_0x3009cb(0x1f6)][_0x4815f6]=''),this['_stateDisplay'][_0x4815f6];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x20f)]=function(_0x513541,_0x391440){const _0x5349e6=_0x2043a5;if(typeof _0x513541!=='number')_0x513541=_0x513541['id'];this[_0x5349e6(0x1f6)]=this[_0x5349e6(0x1f6)]||{},this[_0x5349e6(0x1f6)][_0x513541]=_0x391440;},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x2bd)]=function(_0x6679d2){const _0x502000=_0x2043a5;if(typeof _0x6679d2!==_0x502000(0x282))_0x6679d2=_0x6679d2['id'];this[_0x502000(0x1f6)]=this[_0x502000(0x1f6)]||{},this['_stateDisplay'][_0x6679d2]='';},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x399)]=function(_0x223b9d){const _0x12b64a=_0x2043a5;if(typeof _0x223b9d!==_0x12b64a(0x282))_0x223b9d=_0x223b9d['id'];this[_0x12b64a(0x3a6)]=this[_0x12b64a(0x3a6)]||{},this[_0x12b64a(0x3a6)][_0x223b9d]=this[_0x12b64a(0x3a6)][_0x223b9d]||_0x12b64a(0x222);const _0x36c844=this[_0x12b64a(0x3a6)][_0x223b9d];return this[_0x12b64a(0x3a9)](_0x36c844);},Game_BattlerBase['prototype'][_0x2043a5(0x3d7)]=function(_0xf71597,_0x14a663){const _0x506e65=_0x2043a5;this[_0x506e65(0x3a6)]=this[_0x506e65(0x3a6)]||{};const _0x672072=_0x14a663?this['convertTargetToStateOriginKey'](_0x14a663):this[_0x506e65(0x352)]();this[_0x506e65(0x3a6)][_0xf71597]=_0x672072;},Game_BattlerBase[_0x2043a5(0x2ec)]['clearStateOrigin']=function(_0x15c348){const _0x123445=_0x2043a5;this['_stateOrigin']=this[_0x123445(0x3a6)]||{},delete this[_0x123445(0x3a6)][_0x15c348];},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x352)]=function(){const _0x2a678e=_0x2043a5,_0x16c248=this[_0x2a678e(0x48f)]();return this[_0x2a678e(0x218)](_0x16c248);},Game_BattlerBase['prototype']['getCurrentStateActiveUser']=function(){const _0x1eb0c6=_0x2043a5;if($gameParty[_0x1eb0c6(0x37c)]()){if(_0x1eb0c6(0x31b)!=='CPzDW'){if(BattleManager[_0x1eb0c6(0x40a)])return BattleManager[_0x1eb0c6(0x40a)];else{if(BattleManager[_0x1eb0c6(0x47f)]){if('nxTME'!=='MaEkn')return BattleManager[_0x1eb0c6(0x47f)];else{function _0x202c9e(){const _0x25c447=_0x1eb0c6;this['_stateMaxTurns']=this[_0x25c447(0x1c4)]||{};if(this[_0x25c447(0x1c4)][_0x47609c])return this['_stateMaxTurns'][_0xd925f8];return _0x2a66b7[_0x222466][_0x25c447(0x46f)]['match'](/<MAX TURNS:[ ](\d+)>/i)?this[_0x25c447(0x1c4)][_0x50f13c]=_0x3986a3(_0x3b03c2['$1']):this['_stateMaxTurns'][_0x143a0d]=_0x24af0e[_0x25c447(0x332)][_0x25c447(0x34b)]['States'][_0x25c447(0x3bc)],this['_stateMaxTurns'][_0x1183ea];}}}}}else{function _0x2f8a49(){const _0x953ea2=_0x1eb0c6;return this['skills']()[_0x953ea2(0x1e0)](_0x3a1f55=>this[_0x953ea2(0x289)](_0x3a1f55));}}}else{const _0x59b27e=SceneManager[_0x1eb0c6(0x28c)];if(![Scene_Map,Scene_Item]['includes'](_0x59b27e[_0x1eb0c6(0x1c7)]))return $gameParty[_0x1eb0c6(0x23c)]();}return this;},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x218)]=function(_0x14410e){const _0x3082ab=_0x2043a5;if(!_0x14410e)return _0x3082ab(0x222);if(_0x14410e[_0x3082ab(0x446)]()){if('iNYWw'!==_0x3082ab(0x1f4))return _0x3082ab(0x32d)[_0x3082ab(0x28e)](_0x14410e['actorId']());else{function _0x4d3b53(){const _0x17905f=_0x3082ab;for(const _0x1f063f of _0x6ef36b){_0x1f063f['match'](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x49c832=_0xcc2e07[_0x17905f(0x477)](_0x207928(_0x808c74['$1'])['toUpperCase']()),_0x1782f8=_0x4311b2(_0x2ffd17['$2']);_0x49c832>=0x0&&(_0x77693b['setDebuffTurns'](_0x49c832,_0x1782f8),this[_0x17905f(0x206)](_0x4c3e7b));}}}}else{const _0x563854=_0x3082ab(0x3cc)[_0x3082ab(0x28e)](_0x14410e[_0x3082ab(0x3db)]()),_0x4a4ef6=_0x3082ab(0x34a)[_0x3082ab(0x28e)](_0x14410e[_0x3082ab(0x339)]()),_0x3cfa00='<troop-%1>'[_0x3082ab(0x28e)]($gameTroop[_0x3082ab(0x3f5)]());return _0x3082ab(0x483)['format'](_0x563854,_0x4a4ef6,_0x3cfa00);}return'user';},Game_BattlerBase[_0x2043a5(0x2ec)][_0x2043a5(0x3a9)]=function(_0x33ac46){const _0x10fa16=_0x2043a5;if(_0x33ac46===_0x10fa16(0x222))return this;else{if(_0x33ac46[_0x10fa16(0x47c)](/<actor-(\d+)>/i)){if('zZeNd'!==_0x10fa16(0x2c1))return $gameActors[_0x10fa16(0x46e)](Number(RegExp['$1']));else{function _0x12e892(){const _0x4d74f4=_0x10fa16;if(this[_0x4d74f4(0x3b8)]())return!![];return _0xb9a017[_0x4d74f4(0x332)]['Game_Unit_isAllDead']['call'](this);}}}else{if(_0x10fa16(0x227)!==_0x10fa16(0x227)){function _0x34d24b(){if(_0xed29fa['value'](_0x24820b))return!![];}}else{if($gameParty[_0x10fa16(0x37c)]()&&_0x33ac46[_0x10fa16(0x47c)](/<troop-(\d+)>/i)){if('RyCUr'===_0x10fa16(0x2c7)){function _0x1fbedf(){return!![];}}else{const _0x5a81f9=Number(RegExp['$1']);if(_0x5a81f9===$gameTroop[_0x10fa16(0x3f5)]()){if(_0x10fa16(0x302)===_0x10fa16(0x302)){if(_0x33ac46[_0x10fa16(0x47c)](/<member-(\d+)>/i)){if(_0x10fa16(0x325)!=='tPCDx'){function _0x3b19d1(){const _0x23f0b3=_0x10fa16,_0xa56a65=this['itemLineRect'](this[_0x23f0b3(0x339)]());let _0x57bbbe=this['commandName'](this[_0x23f0b3(0x339)]());_0x57bbbe=_0x57bbbe[_0x23f0b3(0x217)](/\\I\[(\d+)\]/gi,''),_0x2cd772[_0x23f0b3(0x2a2)](),this['commandNameWindowDrawBackground'](_0x57bbbe,_0xa56a65),this['commandNameWindowDrawText'](_0x57bbbe,_0xa56a65),this[_0x23f0b3(0x2bb)](_0x57bbbe,_0xa56a65);}}else return $gameTroop[_0x10fa16(0x43d)]()[Number(RegExp['$1'])];}}else{function _0x215ea3(){const _0x57b3f6=_0x10fa16;if(this['_tempActor']||this['_tempBattler'])return;const _0x5291e0=_0x17762e[_0x57b3f6(0x332)]['stateExpireJS'];if(_0x5291e0[_0x3b4846])_0x5291e0[_0x4eaf59][_0x57b3f6(0x3d1)](this,_0x6f1b63);}}}}}if(_0x33ac46[_0x10fa16(0x47c)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}}return this;},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x33b)]=Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x495)],Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x495)]=function(_0x53f22f){const _0x244079=_0x2043a5,_0x86221e=this[_0x244079(0x340)](_0x53f22f);VisuMZ[_0x244079(0x332)][_0x244079(0x33b)][_0x244079(0x3d1)](this,_0x53f22f);if(_0x86221e&&this['hasState']($dataStates[_0x53f22f])){if('PYqpu'===_0x244079(0x254)){function _0x451402(){const _0x4dbd77=_0x244079;if(typeof _0x3d4fc2!==_0x4dbd77(0x282))_0x457f75=_0x4a0fcb['id'];return this[_0x4dbd77(0x48e)][_0x4005f5]||0x0;}}else{this[_0x244079(0x372)](_0x53f22f);;}}},VisuMZ[_0x2043a5(0x332)]['Game_Battler_isStateAddable']=Game_Battler['prototype'][_0x2043a5(0x340)],Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x340)]=function(_0x23333c){const _0x35761f=_0x2043a5,_0x2bec85=$dataStates[_0x23333c];if(_0x2bec85&&_0x2bec85[_0x35761f(0x46f)]['match'](/<NO DEATH CLEAR>/i)){if(_0x35761f(0x2ea)===_0x35761f(0x3a7)){function _0x45d186(){const _0x30e071=_0x35761f;return!this[_0x30e071(0x2ba)](_0x263aab)&&!this[_0x30e071(0x36e)](_0x105b2e)&&!this['_result'][_0x30e071(0x1db)](_0x49ec62);}}else return!this[_0x35761f(0x2ba)](_0x23333c)&&!this[_0x35761f(0x36e)](_0x23333c)&&!this[_0x35761f(0x470)][_0x35761f(0x1db)](_0x23333c);}return VisuMZ[_0x35761f(0x332)][_0x35761f(0x233)][_0x35761f(0x3d1)](this,_0x23333c);},Game_Battler['prototype'][_0x2043a5(0x372)]=function(_0x2577a9){const _0x2cc018=_0x2043a5;this[_0x2cc018(0x3d7)](_0x2577a9),this[_0x2cc018(0x3c3)](_0x2577a9),this[_0x2cc018(0x315)](_0x2577a9),this[_0x2cc018(0x34e)](_0x2577a9);},Game_Battler[_0x2043a5(0x2ec)]['onRemoveState']=function(_0xb78801){const _0x325f2e=_0x2043a5;Game_BattlerBase[_0x325f2e(0x2ec)][_0x325f2e(0x299)][_0x325f2e(0x3d1)](this,_0xb78801),this[_0x325f2e(0x312)](_0xb78801),this[_0x325f2e(0x1fa)](_0xb78801);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x1bf)]=function(_0x4c095d){const _0x1b4db7=_0x2043a5;for(const _0x16d204 of this['states']()){if(_0x1b4db7(0x24b)===_0x1b4db7(0x3a0)){function _0x5ebe32(){const _0x542f7b=_0x1b4db7;if(!_0x37c21b)return;_0x50296d[_0x542f7b(0x332)][_0x542f7b(0x275)][_0x542f7b(0x3d1)](this,_0x3e51df,_0x2ed8fe,_0x575a7a,_0x4dc244),this[_0x542f7b(0x47a)](_0x40f73c,_0x58728f,_0x553549,_0x4d3e08);}}else{if(this[_0x1b4db7(0x33e)](_0x16d204['id'])&&_0x16d204[_0x1b4db7(0x386)]===_0x4c095d){if(_0x1b4db7(0x2fc)!==_0x1b4db7(0x2fc)){function _0x4b2a7e(){const _0x12fa1f=_0x1b4db7;this['recalculateSlipDamageJS'](),_0x52b0e8[_0x12fa1f(0x332)][_0x12fa1f(0x285)][_0x12fa1f(0x3d1)](this),this[_0x12fa1f(0x3fb)](),this[_0x12fa1f(0x215)]();}}else this[_0x1b4db7(0x3bb)](_0x16d204['id']),this[_0x1b4db7(0x1c0)](_0x16d204['id']),this['onExpireStateGlobalJS'](_0x16d204['id']);}}}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x1c0)]=function(_0x10eff3){const _0x811fad=_0x2043a5;this[_0x811fad(0x2a1)](_0x10eff3);},Game_Battler['prototype'][_0x2043a5(0x315)]=function(_0x38be07){const _0x3e68c8=_0x2043a5;if(this[_0x3e68c8(0x21c)]||this[_0x3e68c8(0x389)])return;const _0xd833d7=VisuMZ[_0x3e68c8(0x332)][_0x3e68c8(0x1e6)];if(_0xd833d7[_0x38be07])_0xd833d7[_0x38be07]['call'](this,_0x38be07);},Game_Battler[_0x2043a5(0x2ec)]['onEraseStateCustomJS']=function(_0x1d080c){const _0x1bc713=_0x2043a5;if(this[_0x1bc713(0x21c)]||this['_tempBattler'])return;const _0x465288=VisuMZ[_0x1bc713(0x332)][_0x1bc713(0x3ed)];if(_0x465288[_0x1d080c])_0x465288[_0x1d080c][_0x1bc713(0x3d1)](this,_0x1d080c);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x2a1)]=function(_0x19e7eb){const _0x3408aa=_0x2043a5;if(this[_0x3408aa(0x21c)]||this[_0x3408aa(0x389)])return;const _0x564074=VisuMZ['SkillsStatesCore'][_0x3408aa(0x435)];if(_0x564074[_0x19e7eb])_0x564074[_0x19e7eb]['call'](this,_0x19e7eb);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x34e)]=function(_0x3d2a3d){const _0x4477f1=_0x2043a5;if(this[_0x4477f1(0x21c)]||this[_0x4477f1(0x389)])return;try{VisuMZ[_0x4477f1(0x332)][_0x4477f1(0x34b)]['States'][_0x4477f1(0x283)][_0x4477f1(0x3d1)](this,_0x3d2a3d);}catch(_0x1aa7a5){if($gameTemp[_0x4477f1(0x2d7)]())console[_0x4477f1(0x42e)](_0x1aa7a5);}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x1fa)]=function(_0x28a1a8){const _0x11e6a5=_0x2043a5;if(this[_0x11e6a5(0x21c)]||this[_0x11e6a5(0x389)])return;try{VisuMZ[_0x11e6a5(0x332)][_0x11e6a5(0x34b)][_0x11e6a5(0x1d5)][_0x11e6a5(0x27e)]['call'](this,_0x28a1a8);}catch(_0x3f4a4a){if($gameTemp[_0x11e6a5(0x2d7)]())console[_0x11e6a5(0x42e)](_0x3f4a4a);}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x2b3)]=function(_0x498f56){const _0x36c245=_0x2043a5;if(this[_0x36c245(0x21c)]||this['_tempBattler'])return;try{VisuMZ[_0x36c245(0x332)][_0x36c245(0x34b)][_0x36c245(0x1d5)][_0x36c245(0x428)][_0x36c245(0x3d1)](this,_0x498f56);}catch(_0x2ffdfa){if($gameTemp[_0x36c245(0x2d7)]())console['log'](_0x2ffdfa);}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x2df)]=function(_0x5ad4a8){const _0x4a9f8b=_0x2043a5;return _0x5ad4a8=_0x5ad4a8[_0x4a9f8b(0x1f2)]()[_0x4a9f8b(0x298)](),this[_0x4a9f8b(0x3d4)]()[_0x4a9f8b(0x1e0)](_0x474549=>_0x474549['categories'][_0x4a9f8b(0x2ad)](_0x5ad4a8));},Game_Battler['prototype'][_0x2043a5(0x444)]=function(_0x31ea97,_0x1df9fa){const _0x464dda=_0x2043a5;_0x31ea97=_0x31ea97[_0x464dda(0x1f2)]()[_0x464dda(0x298)](),_0x1df9fa=_0x1df9fa||0x0;const _0x17404b=this[_0x464dda(0x2df)](_0x31ea97),_0x56ad2a=[];for(const _0x27326a of _0x17404b){if(!_0x27326a)continue;if(_0x1df9fa<=0x0)return;_0x56ad2a[_0x464dda(0x276)](_0x27326a['id']),this[_0x464dda(0x470)][_0x464dda(0x37e)]=!![],_0x1df9fa--;}while(_0x56ad2a['length']>0x0){this[_0x464dda(0x3bb)](_0x56ad2a[_0x464dda(0x362)]());}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x3a1)]=function(_0x24505d){const _0x2f90cd=_0x2043a5;_0x24505d=_0x24505d[_0x2f90cd(0x1f2)]()[_0x2f90cd(0x298)]();const _0x3509f3=this[_0x2f90cd(0x2df)](_0x24505d),_0xc734e8=[];for(const _0x5c2c6c of _0x3509f3){if(!_0x5c2c6c)continue;_0xc734e8[_0x2f90cd(0x276)](_0x5c2c6c['id']),this['_result'][_0x2f90cd(0x37e)]=!![];}while(_0xc734e8[_0x2f90cd(0x474)]>0x0){this[_0x2f90cd(0x3bb)](_0xc734e8[_0x2f90cd(0x362)]());}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x270)]=function(_0x376b7b){const _0x318247=_0x2043a5;return this[_0x318247(0x3fc)](_0x376b7b)>0x0;},Game_Battler[_0x2043a5(0x2ec)]['hasStateCategory']=function(_0x71b606){const _0x192924=_0x2043a5;return this[_0x192924(0x267)](_0x71b606)>0x0;},Game_Battler[_0x2043a5(0x2ec)]['totalStateCategoryAffected']=function(_0x11b6e1){const _0x14177f=_0x2043a5,_0xdcf452=this[_0x14177f(0x2df)](_0x11b6e1)['filter'](_0x33ff57=>this['isStateAffected'](_0x33ff57['id']));return _0xdcf452[_0x14177f(0x474)];},Game_Battler['prototype'][_0x2043a5(0x267)]=function(_0x342641){const _0xbf4afc=_0x2043a5,_0xafc0ad=this[_0xbf4afc(0x2df)](_0x342641);return _0xafc0ad[_0xbf4afc(0x474)];},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x494)]=Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x1ea)],Game_Battler['prototype'][_0x2043a5(0x1ea)]=function(_0x103159,_0x53672c){const _0x3b0e02=_0x2043a5;VisuMZ[_0x3b0e02(0x332)][_0x3b0e02(0x494)][_0x3b0e02(0x3d1)](this,_0x103159,_0x53672c),this['isBuffAffected'](_0x103159)&&this[_0x3b0e02(0x2b8)](_0x103159,_0x53672c);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x2c2)]=function(_0x4fc8dd){},VisuMZ[_0x2043a5(0x332)]['Game_Battler_addDebuff']=Game_Battler[_0x2043a5(0x2ec)]['addDebuff'],Game_Battler['prototype'][_0x2043a5(0x1b5)]=function(_0x4ec8dd,_0x6f282f){const _0x2778b8=_0x2043a5;VisuMZ[_0x2778b8(0x332)][_0x2778b8(0x231)][_0x2778b8(0x3d1)](this,_0x4ec8dd,_0x6f282f);if(this[_0x2778b8(0x392)](_0x4ec8dd)){if('NdhlZ'!=='VWgdh')this[_0x2778b8(0x1df)](_0x4ec8dd,_0x6f282f);else{function _0x6fee2c(){const _0x25191a=_0x2778b8,_0x28126d=_0x5b3471(_0x518346['$1']);_0x28126d<_0x322222?(_0x21233b(_0x25191a(0x32a)[_0x25191a(0x28e)](_0xad1d4e,_0x28126d,_0x5dd903)),_0x3016ea['exit']()):_0x3c9d20=_0x30cbc0[_0x25191a(0x1e4)](_0x28126d,_0x45bfa3);}}}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x2e4)]=function(){const _0x21c8cb=_0x2043a5;for(let _0xc68c1a=0x0;_0xc68c1a<this['buffLength']();_0xc68c1a++){if(_0x21c8cb(0x41d)!==_0x21c8cb(0x36a)){if(this[_0x21c8cb(0x305)](_0xc68c1a)){const _0x202d8a=this[_0x21c8cb(0x1ce)][_0xc68c1a];this[_0x21c8cb(0x211)](_0xc68c1a);if(_0x202d8a>0x0)this['onExpireBuff'](_0xc68c1a);if(_0x202d8a<0x0)this['onExpireDebuff'](_0xc68c1a);}}else{function _0x2fce04(){const _0x3363b3=_0x21c8cb,_0x3c3d9d=_0x1798c2[_0x3363b3(0x376)]('['+_0x866e9c['$1'][_0x3363b3(0x47c)](/\d+/g)+']');for(const _0x53f49f of _0x3c3d9d){if(!_0x592e74[_0x3363b3(0x243)](_0x53f49f))return![];}return!![];}}}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x2b8)]=function(_0x3cf54c,_0x4514c7){const _0x5455b1=_0x2043a5;this[_0x5455b1(0x412)](_0x3cf54c,_0x4514c7);},Game_Battler[_0x2043a5(0x2ec)]['onAddDebuff']=function(_0x48216e,_0x4b6e49){const _0x37c7fc=_0x2043a5;this[_0x37c7fc(0x337)](_0x48216e,_0x4b6e49);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x3ab)]=function(_0x44deb7){const _0x93fe99=_0x2043a5;Game_BattlerBase[_0x93fe99(0x2ec)][_0x93fe99(0x3ab)][_0x93fe99(0x3d1)](this,_0x44deb7),this['onEraseBuffGlobalJS'](_0x44deb7);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x3e7)]=function(_0x403f8b){const _0x3259bb=_0x2043a5;Game_BattlerBase['prototype'][_0x3259bb(0x3e7)][_0x3259bb(0x3d1)](this,_0x403f8b),this[_0x3259bb(0x3e1)](_0x403f8b);},Game_Battler[_0x2043a5(0x2ec)]['onExpireBuff']=function(_0x1288cf){const _0x38c449=_0x2043a5;this[_0x38c449(0x44c)](_0x1288cf);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x37d)]=function(_0x461d5b){const _0x438b33=_0x2043a5;this[_0x438b33(0x213)](_0x461d5b);},Game_Battler[_0x2043a5(0x2ec)]['onAddBuffGlobalJS']=function(_0x3cdb38,_0x464a70){const _0x2e1643=_0x2043a5;VisuMZ[_0x2e1643(0x332)][_0x2e1643(0x34b)][_0x2e1643(0x450)]['onAddBuffJS'][_0x2e1643(0x3d1)](this,_0x3cdb38,_0x464a70);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x337)]=function(_0x283539,_0x10bff1){const _0x831852=_0x2043a5;VisuMZ[_0x831852(0x332)][_0x831852(0x34b)][_0x831852(0x450)][_0x831852(0x292)][_0x831852(0x3d1)](this,_0x283539,_0x10bff1);},Game_BattlerBase[_0x2043a5(0x2ec)]['onEraseBuffGlobalJS']=function(_0x384af2){const _0x3f6014=_0x2043a5;VisuMZ[_0x3f6014(0x332)]['Settings'][_0x3f6014(0x450)][_0x3f6014(0x25d)][_0x3f6014(0x3d1)](this,_0x384af2);},Game_BattlerBase['prototype'][_0x2043a5(0x3e1)]=function(_0x1627b4){const _0x1eee23=_0x2043a5;VisuMZ['SkillsStatesCore'][_0x1eee23(0x34b)]['Buffs'][_0x1eee23(0x235)][_0x1eee23(0x3d1)](this,_0x1627b4);},Game_Battler[_0x2043a5(0x2ec)]['onExpireBuffGlobalJS']=function(_0x3904c2){const _0xa7af48=_0x2043a5;VisuMZ['SkillsStatesCore'][_0xa7af48(0x34b)][_0xa7af48(0x450)]['onExpireBuffJS'][_0xa7af48(0x3d1)](this,_0x3904c2);},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x213)]=function(_0x193355){const _0x115c4=_0x2043a5;VisuMZ[_0x115c4(0x332)]['Settings']['Buffs'][_0x115c4(0x3aa)][_0x115c4(0x3d1)](this,_0x193355);},Game_Battler[_0x2043a5(0x2ec)]['onAddStateMakeCustomSlipValues']=function(_0xfa16d3){const _0x483be2=_0x2043a5,_0x222247=VisuMZ[_0x483be2(0x332)],_0x1e3ff5=[_0x483be2(0x3c2),_0x483be2(0x33f),'stateMpSlipDamageJS','stateMpSlipHealJS',_0x483be2(0x320),_0x483be2(0x1d0)];for(const _0x91d2ff of _0x1e3ff5){_0x222247[_0x91d2ff][_0xfa16d3]&&_0x222247[_0x91d2ff][_0xfa16d3][_0x483be2(0x3d1)](this,_0xfa16d3);}},VisuMZ['SkillsStatesCore'][_0x2043a5(0x285)]=Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x3a8)],Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x3a8)]=function(){const _0x2bf428=_0x2043a5;this['recalculateSlipDamageJS'](),VisuMZ[_0x2bf428(0x332)][_0x2bf428(0x285)]['call'](this),this[_0x2bf428(0x3fb)](),this[_0x2bf428(0x215)]();},Game_Battler['prototype']['setPassiveStateSlipDamageJS']=function(){const _0x108f4a=_0x2043a5;for(const _0x48a9d1 of this['passiveStates']()){if(!_0x48a9d1)continue;this[_0x108f4a(0x3c3)](_0x48a9d1['id']);}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x294)]=function(){const _0x5e09d2=_0x2043a5;for(const _0x2a0ed5 of this[_0x5e09d2(0x3d4)]()){if(!_0x2a0ed5)continue;if(_0x2a0ed5[_0x5e09d2(0x46f)]['match'](/<JS SLIP REFRESH>/i)){if('bAjWz'!==_0x5e09d2(0x309)){function _0x5981d4(){const _0x80929=_0x5e09d2;for(const _0x2145de of _0x21665e){_0x2145de[_0x80929(0x47c)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x3e3d15=_0x489beb[_0x80929(0x477)](_0x490808(_0x23a802['$1'])[_0x80929(0x1f2)]()),_0x4d4a8e=_0x328341(_0x597425['$2']);_0x3e3d15>=0x0&&(_0x5bf3e[_0x80929(0x1bc)](_0x3e3d15,_0x4d4a8e),this[_0x80929(0x206)](_0x40a403));}}}else this['onAddStateMakeCustomSlipValues'](_0x2a0ed5['id']);}}},Game_Battler[_0x2043a5(0x2ec)][_0x2043a5(0x215)]=function(){const _0x1c26f3=_0x2043a5;if(!this[_0x1c26f3(0x3de)]())return;const _0x579376=this['states']();for(const _0x35f0e6 of _0x579376){if(_0x1c26f3(0x259)!=='BlLiD'){function _0x3535e(){const _0xc2eedb=_0x1c26f3;return this[_0xc2eedb(0x3df)]();}}else{if(!_0x35f0e6)continue;this[_0x1c26f3(0x28f)](_0x35f0e6);}}},Game_Battler[_0x2043a5(0x2ec)]['onRegenerateCustomStateDamageOverTime']=function(_0x35f20c){const _0x68007e=_0x2043a5,_0x3afe36=this[_0x68007e(0x27d)](_0x35f20c['id'],_0x68007e(0x41b))||0x0,_0x3881d5=-this[_0x68007e(0x3b3)](),_0x25128c=Math['max'](_0x3afe36,_0x3881d5);if(_0x25128c!==0x0)this[_0x68007e(0x3b9)](_0x25128c);const _0x4b6e96=this['getStateData'](_0x35f20c['id'],_0x68007e(0x354))||0x0;if(_0x4b6e96!==0x0)this[_0x68007e(0x2d1)](_0x4b6e96);const _0x326301=this['getStateData'](_0x35f20c['id'],_0x68007e(0x260))||0x0;if(_0x326301!==0x0)this[_0x68007e(0x26d)](_0x326301);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x377)]=Game_Actor[_0x2043a5(0x2ec)][_0x2043a5(0x343)],Game_Actor[_0x2043a5(0x2ec)][_0x2043a5(0x343)]=function(){const _0xd7a266=_0x2043a5,_0x55f4c3=VisuMZ[_0xd7a266(0x332)][_0xd7a266(0x377)][_0xd7a266(0x3d1)](this),_0x5c6f76=VisuMZ['SkillsStatesCore'][_0xd7a266(0x34b)][_0xd7a266(0x1de)];let _0x59e53d=_0x5c6f76['HiddenSkillTypes'];return $gameParty[_0xd7a266(0x37c)]()&&(_0x59e53d=_0x59e53d[_0xd7a266(0x3fd)](_0x5c6f76[_0xd7a266(0x2b0)])),_0x55f4c3[_0xd7a266(0x1e0)](_0x186e44=>!_0x59e53d[_0xd7a266(0x2ad)](_0x186e44));},Game_Actor[_0x2043a5(0x2ec)]['usableSkills']=function(){const _0x4f20dd=_0x2043a5;return this[_0x4f20dd(0x3e5)]()[_0x4f20dd(0x1e0)](_0x1756d1=>this[_0x4f20dd(0x289)](_0x1756d1));},Game_Actor[_0x2043a5(0x2ec)][_0x2043a5(0x289)]=function(_0x249a67){const _0x807a05=_0x2043a5;if(!this[_0x807a05(0x401)](_0x249a67))return![];const _0x525bbc=this[_0x807a05(0x343)](),_0x312833=DataManager[_0x807a05(0x36c)](_0x249a67),_0x220728=_0x525bbc[_0x807a05(0x1e0)](_0x39a5b4=>_0x312833[_0x807a05(0x2ad)](_0x39a5b4));return _0x220728[_0x807a05(0x474)]>0x0;},Game_Actor[_0x2043a5(0x2ec)][_0x2043a5(0x3b4)]=function(){const _0x4776e8=_0x2043a5;let _0x8b590a=[this['actor'](),this[_0x4776e8(0x311)]()];_0x8b590a=_0x8b590a[_0x4776e8(0x3fd)](this[_0x4776e8(0x263)]()[_0x4776e8(0x1e0)](_0x46e76a=>_0x46e76a));for(const _0x5dc42b of this['_skills']){if(_0x4776e8(0x2e6)!==_0x4776e8(0x3b2)){const _0x1edfd3=$dataSkills[_0x5dc42b];if(_0x1edfd3)_0x8b590a[_0x4776e8(0x276)](_0x1edfd3);}else{function _0xbe959(){const _0x4499b7=_0x4776e8;if(typeof _0x5222a6!=='number')_0x585279=_0x2a87cb['id'];const _0x41a998=this[_0x4499b7(0x228)](_0x588c84);return _0x41a998[_0xdc745f];}}}return _0x8b590a;},Game_Actor[_0x2043a5(0x2ec)]['addPassiveStatesByPluginParameters']=function(){const _0x9a101=_0x2043a5;Game_Battler[_0x9a101(0x2ec)][_0x9a101(0x3c1)][_0x9a101(0x3d1)](this);const _0x531ee1=VisuMZ[_0x9a101(0x332)][_0x9a101(0x34b)][_0x9a101(0x351)]['Actor'];this['_cache'][_0x9a101(0x342)]=this['_cache']['passiveStates']['concat'](_0x531ee1);},VisuMZ['SkillsStatesCore'][_0x2043a5(0x3dd)]=Game_Actor[_0x2043a5(0x2ec)][_0x2043a5(0x3d9)],Game_Actor[_0x2043a5(0x2ec)][_0x2043a5(0x3d9)]=function(_0x1938b3){const _0x39abe9=_0x2043a5;VisuMZ[_0x39abe9(0x332)][_0x39abe9(0x3dd)][_0x39abe9(0x3d1)](this,_0x1938b3),this['_cache']={};},VisuMZ[_0x2043a5(0x332)]['Game_Actor_forgetSkill']=Game_Actor[_0x2043a5(0x2ec)]['forgetSkill'],Game_Actor['prototype'][_0x2043a5(0x478)]=function(_0x5d12c4){const _0x33270b=_0x2043a5;VisuMZ['SkillsStatesCore'][_0x33270b(0x30a)][_0x33270b(0x3d1)](this,_0x5d12c4),this[_0x33270b(0x1e1)]={};},Game_Enemy['prototype'][_0x2043a5(0x3b4)]=function(){const _0x2b2a5b=_0x2043a5;let _0x2a5956=[this['enemy']()];return _0x2a5956['concat'](this[_0x2b2a5b(0x3e5)]());},Game_Enemy[_0x2043a5(0x2ec)][_0x2043a5(0x3c1)]=function(){const _0x51e1f3=_0x2043a5;Game_Battler[_0x51e1f3(0x2ec)][_0x51e1f3(0x3c1)][_0x51e1f3(0x3d1)](this);const _0x4d0890=VisuMZ[_0x51e1f3(0x332)][_0x51e1f3(0x34b)]['PassiveStates'][_0x51e1f3(0x2f8)];this[_0x51e1f3(0x1e1)]['passiveStates']=this[_0x51e1f3(0x1e1)][_0x51e1f3(0x342)][_0x51e1f3(0x3fd)](_0x4d0890);},Game_Enemy[_0x2043a5(0x2ec)][_0x2043a5(0x3e5)]=function(){const _0xaf8e6a=_0x2043a5,_0x544f10=[];for(const _0x3b9705 of this[_0xaf8e6a(0x3b7)]()[_0xaf8e6a(0x39f)]){const _0x4e4888=$dataSkills[_0x3b9705[_0xaf8e6a(0x24e)]];if(_0x4e4888&&!_0x544f10[_0xaf8e6a(0x2ad)](_0x4e4888))_0x544f10['push'](_0x4e4888);}return _0x544f10;},Game_Enemy['prototype'][_0x2043a5(0x22a)]=function(_0x3f5ea7){return this['hasState']($dataStates[_0x3f5ea7]);},VisuMZ[_0x2043a5(0x332)]['Game_Unit_isAllDead']=Game_Unit[_0x2043a5(0x2ec)][_0x2043a5(0x366)],Game_Unit['prototype'][_0x2043a5(0x366)]=function(){const _0x47d17a=_0x2043a5;if(this[_0x47d17a(0x3b8)]())return!![];return VisuMZ[_0x47d17a(0x332)][_0x47d17a(0x330)]['call'](this);},Game_Unit['prototype'][_0x2043a5(0x3b8)]=function(){const _0x3e9aeb=_0x2043a5,_0x3b0810=this[_0x3e9aeb(0x42a)]();for(const _0x113d75 of _0x3b0810){if(!_0x113d75[_0x3e9aeb(0x2f3)]())return![];}return!![];},VisuMZ['SkillsStatesCore'][_0x2043a5(0x1eb)]=Game_Troop[_0x2043a5(0x2ec)]['setup'],Game_Troop['prototype'][_0x2043a5(0x361)]=function(_0x4c2e1c){const _0x4fff29=_0x2043a5;VisuMZ[_0x4fff29(0x332)]['Game_Troop_setup'][_0x4fff29(0x3d1)](this,_0x4c2e1c),this[_0x4fff29(0x1d2)]();},Game_Troop[_0x2043a5(0x2ec)][_0x2043a5(0x1d2)]=function(){const _0x5f0925=_0x2043a5;this[_0x5f0925(0x316)]=Graphics['frameCount'];},Game_Troop[_0x2043a5(0x2ec)]['getCurrentTroopUniqueID']=function(){const _0x5b4ea3=_0x2043a5;return this[_0x5b4ea3(0x316)]=this[_0x5b4ea3(0x316)]||Graphics[_0x5b4ea3(0x1af)],this[_0x5b4ea3(0x316)];},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x208)]=function(){const _0x45efab=_0x2043a5;if(ConfigManager[_0x45efab(0x437)]&&ConfigManager[_0x45efab(0x41e)]!==undefined)return ConfigManager[_0x45efab(0x41e)];else{if(this[_0x45efab(0x237)]())return this[_0x45efab(0x2e3)]()['match'](/LOWER/i);else{if(_0x45efab(0x200)!==_0x45efab(0x200)){function _0x455f75(){const _0x2b8de7=_0x45efab,_0x533dd9=this['_commandNameWindow'];_0x533dd9['drawText'](_0x1571d6,0x0,_0x280396['y'],_0x533dd9[_0x2b8de7(0x3e9)],_0x2b8de7(0x1d3));}}else Scene_ItemBase['prototype'][_0x45efab(0x398)][_0x45efab(0x3d1)](this);}}},Scene_Skill['prototype'][_0x2043a5(0x398)]=function(){const _0x1d65c6=_0x2043a5;if(ConfigManager[_0x1d65c6(0x437)]&&ConfigManager[_0x1d65c6(0x29c)]!==undefined){if(_0x1d65c6(0x1f8)===_0x1d65c6(0x1f8))return ConfigManager[_0x1d65c6(0x29c)];else{function _0x580b70(){const _0x1ab4cc=_0x1d65c6;this[_0x1ab4cc(0x2a2)](),this[_0x1ab4cc(0x255)]['clear']();const _0x372b6e=this[_0x1ab4cc(0x355)];if(!_0x372b6e)return;const _0x4e7ba0=_0x372b6e[_0x1ab4cc(0x3d4)]()[_0x1ab4cc(0x1e0)](_0x3d11cb=>_0x3d11cb[_0x1ab4cc(0x1ed)]>0x0),_0x5c5d5f=[..._0x29a976(0x8)[_0x1ab4cc(0x24f)]()]['filter'](_0x2d9e5e=>_0x372b6e['buff'](_0x2d9e5e)!==0x0),_0x1e1e9d=this[_0x1ab4cc(0x249)],_0x7fd336=_0x4e7ba0[_0x1e1e9d];if(_0x7fd336)_0x463f9b[_0x1ab4cc(0x2ec)][_0x1ab4cc(0x493)][_0x1ab4cc(0x3d1)](this,_0x372b6e,_0x7fd336,0x0,0x0),_0x43e959['prototype'][_0x1ab4cc(0x204)]['call'](this,_0x372b6e,_0x7fd336,0x0,0x0);else{const _0x24584b=_0x5c5d5f[_0x1e1e9d-_0x4e7ba0['length']];if(_0x24584b===_0x2bacf5)return;_0xc07b87[_0x1ab4cc(0x2ec)]['drawActorBuffTurns']['call'](this,_0x372b6e,_0x24584b,0x0,0x0),_0x33908d[_0x1ab4cc(0x2ec)][_0x1ab4cc(0x3da)][_0x1ab4cc(0x3d1)](this,_0x372b6e,_0x24584b,0x0,0x0);}}}}else return this[_0x1d65c6(0x237)]()?this['updatedLayoutStyle']()['match'](/RIGHT/i):Scene_ItemBase[_0x1d65c6(0x2ec)][_0x1d65c6(0x398)]['call'](this);},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x2e3)]=function(){const _0x18ac4a=_0x2043a5;return VisuMZ[_0x18ac4a(0x332)]['Settings'][_0x18ac4a(0x1de)][_0x18ac4a(0x265)];},Scene_Skill[_0x2043a5(0x2ec)]['isUseModernControls']=function(){const _0x328516=_0x2043a5;return this[_0x328516(0x3cd)]&&this[_0x328516(0x3cd)][_0x328516(0x3a5)]();},Scene_Skill['prototype'][_0x2043a5(0x237)]=function(){const _0x3d5bf9=_0x2043a5;return VisuMZ[_0x3d5bf9(0x332)][_0x3d5bf9(0x34b)][_0x3d5bf9(0x1de)]['EnableLayout'];},VisuMZ['SkillsStatesCore'][_0x2043a5(0x26b)]=Scene_Skill['prototype'][_0x2043a5(0x3d3)],Scene_Skill['prototype'][_0x2043a5(0x3d3)]=function(){const _0x29cf6f=_0x2043a5;return this[_0x29cf6f(0x237)]()?this[_0x29cf6f(0x36f)]():VisuMZ[_0x29cf6f(0x332)][_0x29cf6f(0x26b)]['call'](this);},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x36f)]=function(){const _0x5d250f=_0x2043a5,_0x1aaf2d=0x0,_0x3b5e1c=this[_0x5d250f(0x273)](),_0x2df5d0=Graphics['boxWidth'],_0x57f9a7=this[_0x5d250f(0x31e)]();return new Rectangle(_0x1aaf2d,_0x3b5e1c,_0x2df5d0,_0x57f9a7);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x1c3)]=Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x3f9)],Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x3f9)]=function(){const _0x1c7dda=_0x2043a5;return this[_0x1c7dda(0x237)]()?this[_0x1c7dda(0x2ef)]():VisuMZ[_0x1c7dda(0x332)][_0x1c7dda(0x1c3)][_0x1c7dda(0x3d1)](this);},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x2ef)]=function(){const _0xb68659=_0x2043a5,_0x344156=this[_0xb68659(0x21d)](),_0x287cb5=this['calcWindowHeight'](0x3,!![]),_0x55dc22=this[_0xb68659(0x398)]()?Graphics[_0xb68659(0x3c7)]-_0x344156:0x0,_0x4f642a=this[_0xb68659(0x350)]();return new Rectangle(_0x55dc22,_0x4f642a,_0x344156,_0x287cb5);},VisuMZ[_0x2043a5(0x332)]['Scene_Skill_statusWindowRect']=Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x307)],Scene_Skill['prototype'][_0x2043a5(0x307)]=function(){const _0x496661=_0x2043a5;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if('zQZsz'!==_0x496661(0x439)){function _0x323671(){const _0x459c96=_0x496661;let _0x34f576=this[_0x459c96(0x29a)]();return _0x3039ee[_0x459c96(0x1d7)]&&this[_0x459c96(0x3c4)]()&&(_0x34f576=_0x2bfe8b[_0x459c96(0x221)](_0x34f576)),_0x34f576;}}else return this['statusWindowRectSkillsStatesCore']();}else return VisuMZ[_0x496661(0x332)]['Scene_Skill_statusWindowRect'][_0x496661(0x3d1)](this);},Scene_Skill[_0x2043a5(0x2ec)]['statusWindowRectSkillsStatesCore']=function(){const _0x7d3e7d=_0x2043a5,_0x1ac83e=Graphics[_0x7d3e7d(0x3c7)]-this[_0x7d3e7d(0x21d)](),_0x4b6e37=this['_skillTypeWindow'][_0x7d3e7d(0x2a5)],_0x1cf471=this['isRightInputMode']()?0x0:Graphics[_0x7d3e7d(0x3c7)]-_0x1ac83e,_0x445ba4=this['mainAreaTop']();return new Rectangle(_0x1cf471,_0x445ba4,_0x1ac83e,_0x4b6e37);},VisuMZ[_0x2043a5(0x332)]['Scene_Skill_createItemWindow']=Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x27c)],Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x27c)]=function(){const _0x4a3728=_0x2043a5;VisuMZ['SkillsStatesCore'][_0x4a3728(0x485)][_0x4a3728(0x3d1)](this),this[_0x4a3728(0x393)]()&&this[_0x4a3728(0x306)]();},VisuMZ[_0x2043a5(0x332)]['Scene_Skill_itemWindowRect']=Scene_Skill['prototype'][_0x2043a5(0x220)],Scene_Skill['prototype'][_0x2043a5(0x220)]=function(){const _0x4cd92a=_0x2043a5;if(this[_0x4cd92a(0x237)]())return this[_0x4cd92a(0x3df)]();else{if(_0x4cd92a(0x1d4)!==_0x4cd92a(0x2d8)){const _0x14e05e=VisuMZ[_0x4cd92a(0x332)][_0x4cd92a(0x24d)][_0x4cd92a(0x3d1)](this);return this[_0x4cd92a(0x393)]()&&this[_0x4cd92a(0x321)]()&&(_0x14e05e[_0x4cd92a(0x480)]-=this[_0x4cd92a(0x34d)]()),_0x14e05e;}else{function _0x91e66(){const _0x177e5d=_0x4cd92a,_0x59fd08=_0x1f2089['parse']('['+_0x26acf3['$1'][_0x177e5d(0x47c)](/\d+/g)+']');this[_0x177e5d(0x1e1)]['passiveStates']=this[_0x177e5d(0x1e1)][_0x177e5d(0x342)][_0x177e5d(0x3fd)](_0x59fd08);}}}},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x3df)]=function(){const _0x5e5b54=_0x2043a5,_0x101b8c=Graphics['boxWidth']-this[_0x5e5b54(0x34d)](),_0x4a6ff2=this[_0x5e5b54(0x38f)]()-this[_0x5e5b54(0x2b1)][_0x5e5b54(0x2a5)],_0x1e93c9=this[_0x5e5b54(0x398)]()?Graphics['boxWidth']-_0x101b8c:0x0,_0x37155d=this[_0x5e5b54(0x2b1)]['y']+this[_0x5e5b54(0x2b1)][_0x5e5b54(0x2a5)];return new Rectangle(_0x1e93c9,_0x37155d,_0x101b8c,_0x4a6ff2);},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x393)]=function(){const _0x83b658=_0x2043a5;if(!Imported[_0x83b658(0x35d)])return![];else{if(this[_0x83b658(0x237)]()){if('VWjBA'!==_0x83b658(0x3ba))return!![];else{function _0x374d7e(){const _0x30895c=_0x83b658,_0x3c87a5=this[_0x30895c(0x1e7)]();this[_0x30895c(0x26e)]=new _0x408a17(_0x3c87a5),this[_0x30895c(0x23e)](this[_0x30895c(0x26e)]),this[_0x30895c(0x408)][_0x30895c(0x3d6)](this[_0x30895c(0x26e)]);const _0x185dcd=_0x8c4403['SkillsStatesCore'][_0x30895c(0x34b)][_0x30895c(0x1de)]['SkillSceneStatusBgType'];this[_0x30895c(0x26e)][_0x30895c(0x2dc)](_0x185dcd||0x0);}}}else return VisuMZ[_0x83b658(0x332)][_0x83b658(0x34b)][_0x83b658(0x1de)][_0x83b658(0x3e6)];}},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x321)]=function(){const _0x1b1e9b=_0x2043a5;return VisuMZ[_0x1b1e9b(0x332)]['Settings'][_0x1b1e9b(0x1de)][_0x1b1e9b(0x379)];},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x306)]=function(){const _0x4770a1=_0x2043a5,_0xbe4e59=this['shopStatusWindowRect']();this[_0x4770a1(0x26e)]=new Window_ShopStatus(_0xbe4e59),this[_0x4770a1(0x23e)](this[_0x4770a1(0x26e)]),this[_0x4770a1(0x408)]['setStatusWindow'](this[_0x4770a1(0x26e)]);const _0x38d353=VisuMZ[_0x4770a1(0x332)][_0x4770a1(0x34b)]['Skills'][_0x4770a1(0x216)];this['_shopStatusWindow'][_0x4770a1(0x2dc)](_0x38d353||0x0);},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x1e7)]=function(){const _0x1f6a09=_0x2043a5;if(this[_0x1f6a09(0x237)]()){if(_0x1f6a09(0x207)!==_0x1f6a09(0x207)){function _0x17ce3c(){const _0x2c88a1=_0x1f6a09,_0x150e76=this[_0x2c88a1(0x429)](_0x1622e6,_0xbec5af),_0x1b128c=this['textSizeEx'](_0x150e76,_0x2c88ef,_0x59b896,_0x54f5e1),_0x3642f3=_0x5b98da+_0x32119e-_0x1b128c[_0x2c88a1(0x480)];this['drawTextEx'](_0x150e76,_0x3642f3,_0x2d002f,_0x106217),this[_0x2c88a1(0x2a2)]();}}else return this['shopStatusWindowRectSkillsStatesCore']();}else return VisuMZ[_0x1f6a09(0x332)][_0x1f6a09(0x34b)][_0x1f6a09(0x1de)][_0x1f6a09(0x223)][_0x1f6a09(0x3d1)](this);},Scene_Skill[_0x2043a5(0x2ec)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x3826d2=_0x2043a5,_0x50919c=this[_0x3826d2(0x34d)](),_0x4e4801=this[_0x3826d2(0x408)][_0x3826d2(0x2a5)],_0x1213ba=this[_0x3826d2(0x398)]()?0x0:Graphics[_0x3826d2(0x3c7)]-this[_0x3826d2(0x34d)](),_0x1194fd=this[_0x3826d2(0x408)]['y'];return new Rectangle(_0x1213ba,_0x1194fd,_0x50919c,_0x4e4801);},Scene_Skill[_0x2043a5(0x2ec)][_0x2043a5(0x34d)]=function(){const _0x40844d=_0x2043a5;if(Imported[_0x40844d(0x35d)])return Scene_Shop['prototype'][_0x40844d(0x461)]();else{if(_0x40844d(0x363)!==_0x40844d(0x1ef))return 0x0;else{function _0x3beec3(){const _0x3822c5=_0x40844d;if(!this[_0x3822c5(0x20c)](_0x4bdea9))return![];return!![];}}}},Scene_Skill['prototype'][_0x2043a5(0x1f5)]=function(){const _0x5ebaa5=_0x2043a5;if(this[_0x5ebaa5(0x30b)]&&this[_0x5ebaa5(0x30b)][_0x5ebaa5(0x29b)])return TextManager[_0x5ebaa5(0x38b)];else{if(_0x5ebaa5(0x3be)!=='khKtL'){function _0x5df898(){const _0x3a8db4=_0x5ebaa5;return this[_0x3a8db4(0x451)]();}}else return'';}},VisuMZ['SkillsStatesCore'][_0x2043a5(0x2d3)]=Sprite_Gauge[_0x2043a5(0x2ec)][_0x2043a5(0x291)],Sprite_Gauge[_0x2043a5(0x2ec)][_0x2043a5(0x291)]=function(){const _0x9cc475=_0x2043a5;VisuMZ[_0x9cc475(0x332)][_0x9cc475(0x2d3)][_0x9cc475(0x3d1)](this),this[_0x9cc475(0x2e0)]=null;},VisuMZ[_0x2043a5(0x332)]['Sprite_Gauge_setup']=Sprite_Gauge[_0x2043a5(0x2ec)][_0x2043a5(0x361)],Sprite_Gauge[_0x2043a5(0x2ec)]['setup']=function(_0x30c82d,_0x1e9b6e){const _0xa81b53=_0x2043a5;this['setupSkillsStatesCore'](_0x30c82d,_0x1e9b6e),_0x1e9b6e=_0x1e9b6e[_0xa81b53(0x23b)](),VisuMZ[_0xa81b53(0x332)][_0xa81b53(0x3f8)][_0xa81b53(0x3d1)](this,_0x30c82d,_0x1e9b6e);},Sprite_Gauge[_0x2043a5(0x2ec)]['setupSkillsStatesCore']=function(_0x40c88c,_0x259c04){const _0x5ec92a=_0x2043a5,_0x2d537d=VisuMZ[_0x5ec92a(0x332)][_0x5ec92a(0x34b)]['Costs']['filter'](_0x7d309e=>_0x7d309e[_0x5ec92a(0x427)][_0x5ec92a(0x1f2)]()===_0x259c04[_0x5ec92a(0x1f2)]());if(_0x2d537d[_0x5ec92a(0x474)]>=0x1)this['_costSettings']=_0x2d537d[0x0];else{if('dYLiI'==='dYLiI')this['_costSettings']=null;else{function _0x57a3e4(){const _0x42eb70=_0x5ec92a;return _0x49a483[_0x42eb70(0x332)]['Settings'][_0x42eb70(0x1de)][_0x42eb70(0x2d2)];}}}},VisuMZ['SkillsStatesCore'][_0x2043a5(0x271)]=Sprite_Gauge[_0x2043a5(0x2ec)][_0x2043a5(0x29a)],Sprite_Gauge['prototype'][_0x2043a5(0x29a)]=function(){const _0xaa9876=_0x2043a5;if(this[_0xaa9876(0x355)]&&this[_0xaa9876(0x2e0)])return this['currentValueSkillsStatesCore']();else{if(_0xaa9876(0x48d)!==_0xaa9876(0x48d)){function _0x586bc3(){const _0x43d713=_0xaa9876;if(this[_0x43d713(0x237)]())return this[_0x43d713(0x3df)]();else{const _0x301333=_0x1a68b6[_0x43d713(0x332)][_0x43d713(0x24d)]['call'](this);return this[_0x43d713(0x393)]()&&this[_0x43d713(0x321)]()&&(_0x301333[_0x43d713(0x480)]-=this['shopStatusWidth']()),_0x301333;}}}else return VisuMZ[_0xaa9876(0x332)][_0xaa9876(0x271)][_0xaa9876(0x3d1)](this);}},Sprite_Gauge[_0x2043a5(0x2ec)]['currentValueSkillsStatesCore']=function(){const _0x2d6576=_0x2043a5;return this[_0x2d6576(0x2e0)][_0x2d6576(0x20a)]['call'](this[_0x2d6576(0x355)]);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x411)]=Sprite_Gauge['prototype'][_0x2043a5(0x268)],Sprite_Gauge[_0x2043a5(0x2ec)][_0x2043a5(0x268)]=function(){const _0x58ff14=_0x2043a5;if(this[_0x58ff14(0x355)]&&this[_0x58ff14(0x2e0)]){if(_0x58ff14(0x49a)===_0x58ff14(0x49a))return this[_0x58ff14(0x2fd)]();else{function _0x1c8a99(){const _0x50c44d=_0x58ff14;if(_0x55c09c[_0x50c44d(0x243)](_0x5d5830))return![];}}}else return VisuMZ['SkillsStatesCore'][_0x58ff14(0x411)]['call'](this);},Sprite_Gauge[_0x2043a5(0x2ec)]['currentMaxValueSkillsStatesCore']=function(){const _0x50aa2d=_0x2043a5;return this[_0x50aa2d(0x2e0)][_0x50aa2d(0x380)][_0x50aa2d(0x3d1)](this[_0x50aa2d(0x355)]);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x422)]=Sprite_Gauge['prototype'][_0x2043a5(0x481)],Sprite_Gauge[_0x2043a5(0x2ec)][_0x2043a5(0x481)]=function(){const _0x49bc1f=_0x2043a5,_0x463238=VisuMZ[_0x49bc1f(0x332)]['Sprite_Gauge_gaugeRate'][_0x49bc1f(0x3d1)](this);return _0x463238[_0x49bc1f(0x203)](0x0,0x1);},VisuMZ[_0x2043a5(0x332)]['Sprite_Gauge_redraw']=Sprite_Gauge[_0x2043a5(0x2ec)][_0x2043a5(0x2f2)],Sprite_Gauge['prototype'][_0x2043a5(0x2f2)]=function(){const _0x1ff54b=_0x2043a5;if(this[_0x1ff54b(0x355)]&&this[_0x1ff54b(0x2e0)])this[_0x1ff54b(0x20b)][_0x1ff54b(0x41f)](),this[_0x1ff54b(0x297)]();else{if('dbrYG'!==_0x1ff54b(0x46d)){function _0x3b913c(){const _0x3e5a8e=_0x1ff54b;this[_0x3e5a8e(0x255)]['drawText'](_0x3b855a,_0x47ec7c,_0xe52b35,_0x1dc57f,this[_0x3e5a8e(0x255)][_0x3e5a8e(0x2a5)],_0x1b9d93);}}else VisuMZ[_0x1ff54b(0x332)]['Sprite_Gauge_redraw'][_0x1ff54b(0x3d1)](this);}},Sprite_Gauge[_0x2043a5(0x2ec)][_0x2043a5(0x1b9)]=function(){const _0x2709da=_0x2043a5;let _0x605406=this['currentValue']();return Imported[_0x2709da(0x1d7)]&&this[_0x2709da(0x3c4)]()&&(_0x605406=VisuMZ['GroupDigits'](_0x605406)),_0x605406;},Sprite_Gauge[_0x2043a5(0x2ec)]['redrawSkillsStatesCore']=function(){const _0x3226ef=_0x2043a5;this[_0x3226ef(0x2e0)]['GaugeDrawJS'][_0x3226ef(0x3d1)](this);},Sprite_Gauge[_0x2043a5(0x2ec)]['drawFullGauge']=function(_0x22498e,_0x325bd1,_0x30ee58,_0x3f4838,_0x982607,_0x54b9af){const _0x2eef50=_0x2043a5,_0x2c00f4=this[_0x2eef50(0x481)](),_0x5692f5=Math[_0x2eef50(0x45b)]((_0x982607-0x2)*_0x2c00f4),_0x3aa92f=_0x54b9af-0x2,_0x36f437=this[_0x2eef50(0x34c)]();this[_0x2eef50(0x20b)][_0x2eef50(0x394)](_0x30ee58,_0x3f4838,_0x982607,_0x54b9af,_0x36f437),this['bitmap'][_0x2eef50(0x1f1)](_0x30ee58+0x1,_0x3f4838+0x1,_0x5692f5,_0x3aa92f,_0x22498e,_0x325bd1);},VisuMZ['SkillsStatesCore'][_0x2043a5(0x49f)]=Sprite_StateIcon['prototype']['loadBitmap'],Sprite_StateIcon[_0x2043a5(0x2ec)][_0x2043a5(0x251)]=function(){const _0x4b6d65=_0x2043a5;VisuMZ[_0x4b6d65(0x332)][_0x4b6d65(0x49f)][_0x4b6d65(0x3d1)](this),this[_0x4b6d65(0x373)]();},Sprite_StateIcon[_0x2043a5(0x2ec)][_0x2043a5(0x373)]=function(){const _0x198c7c=_0x2043a5,_0x3ee3df=Window_Base[_0x198c7c(0x2ec)][_0x198c7c(0x498)]();this[_0x198c7c(0x473)]=new Sprite(),this['_turnDisplaySprite']['bitmap']=new Bitmap(ImageManager['iconWidth'],_0x3ee3df),this[_0x198c7c(0x473)][_0x198c7c(0x39d)]['x']=this[_0x198c7c(0x39d)]['x'],this['_turnDisplaySprite'][_0x198c7c(0x39d)]['y']=this[_0x198c7c(0x39d)]['y'],this[_0x198c7c(0x3a4)](this[_0x198c7c(0x473)]),this[_0x198c7c(0x255)]=this[_0x198c7c(0x473)][_0x198c7c(0x20b)];},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x25f)]=Sprite_StateIcon['prototype'][_0x2043a5(0x476)],Sprite_StateIcon[_0x2043a5(0x2ec)]['updateFrame']=function(){const _0x133afc=_0x2043a5;VisuMZ['SkillsStatesCore'][_0x133afc(0x25f)][_0x133afc(0x3d1)](this),this[_0x133afc(0x41c)]();},Sprite_StateIcon[_0x2043a5(0x2ec)]['drawText']=function(_0x9bbe1c,_0x187134,_0x39b592,_0xffe89d,_0x59213e){const _0x31261b=_0x2043a5;this[_0x31261b(0x255)][_0x31261b(0x1fe)](_0x9bbe1c,_0x187134,_0x39b592,_0xffe89d,this['contents'][_0x31261b(0x2a5)],_0x59213e);},Sprite_StateIcon[_0x2043a5(0x2ec)][_0x2043a5(0x41c)]=function(){const _0x40206f=_0x2043a5;this[_0x40206f(0x2a2)](),this[_0x40206f(0x255)][_0x40206f(0x41f)]();const _0x31ee4a=this['_battler'];if(!_0x31ee4a)return;const _0x4895d7=_0x31ee4a[_0x40206f(0x3d4)]()[_0x40206f(0x1e0)](_0xd9268a=>_0xd9268a[_0x40206f(0x1ed)]>0x0),_0x21bcf8=[...Array(0x8)[_0x40206f(0x24f)]()][_0x40206f(0x1e0)](_0xdf65a9=>_0x31ee4a[_0x40206f(0x488)](_0xdf65a9)!==0x0),_0xbb9b85=this[_0x40206f(0x249)],_0x166702=_0x4895d7[_0xbb9b85];if(_0x166702)Window_Base[_0x40206f(0x2ec)][_0x40206f(0x493)][_0x40206f(0x3d1)](this,_0x31ee4a,_0x166702,0x0,0x0),Window_Base[_0x40206f(0x2ec)][_0x40206f(0x204)][_0x40206f(0x3d1)](this,_0x31ee4a,_0x166702,0x0,0x0);else{if(_0x40206f(0x3d2)===_0x40206f(0x3d2)){const _0x573f8a=_0x21bcf8[_0xbb9b85-_0x4895d7['length']];if(_0x573f8a===undefined)return;Window_Base[_0x40206f(0x2ec)][_0x40206f(0x313)]['call'](this,_0x31ee4a,_0x573f8a,0x0,0x0),Window_Base['prototype'][_0x40206f(0x3da)][_0x40206f(0x3d1)](this,_0x31ee4a,_0x573f8a,0x0,0x0);}else{function _0x530718(){_0x1d37ea+=_0x3b003b+0x18;}}}},Sprite_StateIcon[_0x2043a5(0x2ec)]['resetFontSettings']=function(){const _0x268cb7=_0x2043a5;this[_0x268cb7(0x255)]['fontFace']=$gameSystem[_0x268cb7(0x3f3)](),this['contents'][_0x268cb7(0x48b)]=$gameSystem['mainFontSize'](),this[_0x268cb7(0x48a)]();},Sprite_StateIcon[_0x2043a5(0x2ec)][_0x2043a5(0x48a)]=function(){const _0x51d2e9=_0x2043a5;this['changeTextColor'](ColorManager['normalColor']()),this[_0x51d2e9(0x35c)](ColorManager[_0x51d2e9(0x349)]());},Sprite_StateIcon[_0x2043a5(0x2ec)][_0x2043a5(0x2de)]=function(_0x158560){const _0x471a0f=_0x2043a5;this[_0x471a0f(0x255)][_0x471a0f(0x24a)]=_0x158560;},Sprite_StateIcon['prototype'][_0x2043a5(0x35c)]=function(_0x47018e){const _0x27c1c5=_0x2043a5;this[_0x27c1c5(0x255)][_0x27c1c5(0x349)]=_0x47018e;},Sprite_StateIcon['prototype'][_0x2043a5(0x246)]=function(){const _0x2095b7=_0x2043a5;this[_0x2095b7(0x31f)]=!![],this['updateVisibility']();},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x25a)]=function(_0x43ce11,_0xb3d6d2,_0x11d660,_0x1bcf26,_0x3ca4c3){const _0x57c0f3=_0x2043a5,_0x484c7a=this['createAllSkillCostText'](_0x43ce11,_0xb3d6d2),_0xf51b73=this['textSizeEx'](_0x484c7a,_0x11d660,_0x1bcf26,_0x3ca4c3),_0x36cc33=_0x11d660+_0x3ca4c3-_0xf51b73[_0x57c0f3(0x480)];this[_0x57c0f3(0x490)](_0x484c7a,_0x36cc33,_0x1bcf26,_0x3ca4c3),this['resetFontSettings']();},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x429)]=function(_0x57778e,_0x27f09c){const _0x4032ad=_0x2043a5;let _0x3668f8='';for(settings of VisuMZ[_0x4032ad(0x332)][_0x4032ad(0x34b)]['Costs']){if(!this['isSkillCostShown'](_0x57778e,_0x27f09c,settings))continue;if(_0x3668f8[_0x4032ad(0x474)]>0x0)_0x3668f8+=this['skillCostSeparator']();_0x3668f8+=this[_0x4032ad(0x2d9)](_0x57778e,_0x27f09c,settings);}_0x3668f8=this['makeAdditionalSkillCostText'](_0x57778e,_0x27f09c,_0x3668f8);if(_0x27f09c[_0x4032ad(0x46f)][_0x4032ad(0x47c)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x3668f8[_0x4032ad(0x474)]>0x0)_0x3668f8+=this[_0x4032ad(0x287)]();_0x3668f8+=String(RegExp['$1']);}return _0x3668f8;},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x264)]=function(_0x1684ff,_0x1fc8a0,_0x52c3c9){return _0x52c3c9;},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x22b)]=function(_0x3b50eb,_0x405fdf,_0x34f08c){const _0xf22173=_0x2043a5,_0x3971c3=_0x34f08c[_0xf22173(0x3e4)][_0xf22173(0x3d1)](_0x3b50eb,_0x405fdf);return _0x34f08c['ShowJS'][_0xf22173(0x3d1)](_0x3b50eb,_0x405fdf,_0x3971c3,_0x34f08c);},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x2d9)]=function(_0x74cb0e,_0x47b499,_0xa539e){const _0x4e90ea=_0x2043a5,_0x136247=_0xa539e[_0x4e90ea(0x3e4)][_0x4e90ea(0x3d1)](_0x74cb0e,_0x47b499);return _0xa539e[_0x4e90ea(0x308)][_0x4e90ea(0x3d1)](_0x74cb0e,_0x47b499,_0x136247,_0xa539e);},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x287)]=function(){return'\x20';},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x253)]=function(_0x541b58,_0x4dac3b,_0x36d0f6,_0x32f171){const _0x498dea=_0x2043a5;if(!_0x541b58)return;VisuMZ[_0x498dea(0x332)][_0x498dea(0x275)]['call'](this,_0x541b58,_0x4dac3b,_0x36d0f6,_0x32f171),this[_0x498dea(0x47a)](_0x541b58,_0x4dac3b,_0x36d0f6,_0x32f171);},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x47a)]=function(_0x4420a0,_0x33bca3,_0x43d45b,_0x385d19){const _0x503b89=_0x2043a5;_0x385d19=_0x385d19||0x90;const _0x59e233=ImageManager[_0x503b89(0x357)],_0x4c0b53=_0x4420a0['allIcons']()['slice'](0x0,Math[_0x503b89(0x45b)](_0x385d19/_0x59e233)),_0x1b19b3=_0x4420a0[_0x503b89(0x3d4)]()[_0x503b89(0x1e0)](_0x510cbb=>_0x510cbb['iconIndex']>0x0),_0x304379=[...Array(0x8)[_0x503b89(0x24f)]()][_0x503b89(0x1e0)](_0x575daa=>_0x4420a0['buff'](_0x575daa)!==0x0),_0x41dc4c=[];let _0x3cde28=_0x33bca3;for(let _0x5c72b3=0x0;_0x5c72b3<_0x4c0b53[_0x503b89(0x474)];_0x5c72b3++){this[_0x503b89(0x2a2)]();const _0x4542ce=_0x1b19b3[_0x5c72b3];if(_0x4542ce)!_0x41dc4c[_0x503b89(0x2ad)](_0x4542ce)&&this[_0x503b89(0x493)](_0x4420a0,_0x4542ce,_0x3cde28,_0x43d45b),this[_0x503b89(0x204)](_0x4420a0,_0x4542ce,_0x3cde28,_0x43d45b),_0x41dc4c[_0x503b89(0x276)](_0x4542ce);else{if(_0x503b89(0x378)!==_0x503b89(0x378)){function _0x4220c0(){return'';}}else{const _0x47183f=_0x304379[_0x5c72b3-_0x1b19b3[_0x503b89(0x474)]];this[_0x503b89(0x313)](_0x4420a0,_0x47183f,_0x3cde28,_0x43d45b),this[_0x503b89(0x3da)](_0x4420a0,_0x47183f,_0x3cde28,_0x43d45b);}}_0x3cde28+=_0x59e233;}},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x493)]=function(_0x16258f,_0x125332,_0x23a73a,_0xbaeac5){const _0x1920ae=_0x2043a5;if(!VisuMZ[_0x1920ae(0x332)][_0x1920ae(0x34b)][_0x1920ae(0x1d5)]['ShowTurns'])return;if(!_0x16258f[_0x1920ae(0x335)](_0x125332['id']))return;if(_0x125332[_0x1920ae(0x386)]===0x0)return;if(_0x125332[_0x1920ae(0x46f)][_0x1920ae(0x47c)](/<HIDE STATE TURNS>/i))return;const _0x77e968=_0x16258f[_0x1920ae(0x2bf)](_0x125332['id']),_0x31d9b0=ImageManager[_0x1920ae(0x357)],_0x32a15f=ColorManager[_0x1920ae(0x47d)](_0x125332);this[_0x1920ae(0x2de)](_0x32a15f),this[_0x1920ae(0x35c)](_0x1920ae(0x326)),this[_0x1920ae(0x255)][_0x1920ae(0x3b0)]=!![],this[_0x1920ae(0x255)][_0x1920ae(0x48b)]=VisuMZ[_0x1920ae(0x332)][_0x1920ae(0x34b)]['States']['TurnFontSize'],_0x23a73a+=VisuMZ[_0x1920ae(0x332)][_0x1920ae(0x34b)]['States'][_0x1920ae(0x3a3)],_0xbaeac5+=VisuMZ[_0x1920ae(0x332)][_0x1920ae(0x34b)][_0x1920ae(0x1d5)][_0x1920ae(0x375)],this['drawText'](_0x77e968,_0x23a73a,_0xbaeac5,_0x31d9b0,_0x1920ae(0x49e)),this['contents'][_0x1920ae(0x3b0)]=![],this[_0x1920ae(0x2a2)]();},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x204)]=function(_0x423133,_0x231037,_0x12c646,_0x485496){const _0xd20af2=_0x2043a5;if(!VisuMZ[_0xd20af2(0x332)][_0xd20af2(0x34b)]['States'][_0xd20af2(0x489)])return;const _0x53375b=ImageManager[_0xd20af2(0x357)],_0x403fc5=ImageManager[_0xd20af2(0x45d)]/0x2,_0xa8a3d4=ColorManager[_0xd20af2(0x322)]();this[_0xd20af2(0x2de)](_0xa8a3d4),this[_0xd20af2(0x35c)](_0xd20af2(0x326)),this[_0xd20af2(0x255)][_0xd20af2(0x3b0)]=!![],this[_0xd20af2(0x255)]['fontSize']=VisuMZ['SkillsStatesCore'][_0xd20af2(0x34b)]['States']['DataFontSize'],_0x12c646+=VisuMZ[_0xd20af2(0x332)][_0xd20af2(0x34b)][_0xd20af2(0x1d5)][_0xd20af2(0x280)],_0x485496+=VisuMZ['SkillsStatesCore']['Settings'][_0xd20af2(0x1d5)][_0xd20af2(0x202)];const _0x4fcc1f=String(_0x423133[_0xd20af2(0x345)](_0x231037['id']));this['drawText'](_0x4fcc1f,_0x12c646,_0x485496,_0x53375b,'center'),this[_0xd20af2(0x255)][_0xd20af2(0x3b0)]=![],this[_0xd20af2(0x2a2)]();},Window_Base[_0x2043a5(0x2ec)]['drawActorBuffTurns']=function(_0x15291f,_0x638336,_0x178672,_0x16bb03){const _0x1434d3=_0x2043a5;if(!VisuMZ[_0x1434d3(0x332)][_0x1434d3(0x34b)][_0x1434d3(0x450)][_0x1434d3(0x274)])return;const _0x4d11e9=_0x15291f[_0x1434d3(0x488)](_0x638336);if(_0x4d11e9===0x0)return;const _0x502230=_0x15291f[_0x1434d3(0x201)](_0x638336),_0x10b873=ImageManager['iconWidth'],_0x3dee2c=_0x4d11e9>0x0?ColorManager[_0x1434d3(0x1cb)]():ColorManager[_0x1434d3(0x2a3)]();this[_0x1434d3(0x2de)](_0x3dee2c),this[_0x1434d3(0x35c)](_0x1434d3(0x326)),this[_0x1434d3(0x255)][_0x1434d3(0x3b0)]=!![],this[_0x1434d3(0x255)]['fontSize']=VisuMZ[_0x1434d3(0x332)]['Settings'][_0x1434d3(0x450)]['TurnFontSize'],_0x178672+=VisuMZ[_0x1434d3(0x332)]['Settings'][_0x1434d3(0x450)]['TurnOffsetX'],_0x16bb03+=VisuMZ[_0x1434d3(0x332)][_0x1434d3(0x34b)][_0x1434d3(0x450)][_0x1434d3(0x375)],this[_0x1434d3(0x1fe)](_0x502230,_0x178672,_0x16bb03,_0x10b873,_0x1434d3(0x49e)),this[_0x1434d3(0x255)][_0x1434d3(0x3b0)]=![],this[_0x1434d3(0x2a2)]();},Window_Base[_0x2043a5(0x2ec)][_0x2043a5(0x3da)]=function(_0x20a6ad,_0x2d1adf,_0x35854b,_0x28ac6b){const _0x27767e=_0x2043a5;if(!VisuMZ[_0x27767e(0x332)][_0x27767e(0x34b)][_0x27767e(0x450)][_0x27767e(0x489)])return;const _0x274fba=_0x20a6ad[_0x27767e(0x39a)](_0x2d1adf),_0x1a72bf=_0x20a6ad['buff'](_0x2d1adf),_0xade64d=ImageManager[_0x27767e(0x357)],_0x414d3c=ImageManager['iconHeight']/0x2,_0x386df6=_0x1a72bf>0x0?ColorManager[_0x27767e(0x1cb)]():ColorManager[_0x27767e(0x2a3)]();this[_0x27767e(0x2de)](_0x386df6),this[_0x27767e(0x35c)]('rgba(0,\x200,\x200,\x201)'),this[_0x27767e(0x255)][_0x27767e(0x3b0)]=!![],this[_0x27767e(0x255)][_0x27767e(0x48b)]=VisuMZ['SkillsStatesCore'][_0x27767e(0x34b)]['Buffs'][_0x27767e(0x436)],_0x35854b+=VisuMZ[_0x27767e(0x332)][_0x27767e(0x34b)][_0x27767e(0x450)][_0x27767e(0x280)],_0x28ac6b+=VisuMZ[_0x27767e(0x332)][_0x27767e(0x34b)][_0x27767e(0x450)][_0x27767e(0x202)];const _0x469df6='%1%'['format'](Math[_0x27767e(0x1cd)](_0x274fba*0x64));this[_0x27767e(0x1fe)](_0x469df6,_0x35854b,_0x28ac6b,_0xade64d,_0x27767e(0x1d3)),this['contents'][_0x27767e(0x3b0)]=![],this['resetFontSettings']();},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x2be)]=Window_StatusBase[_0x2043a5(0x2ec)][_0x2043a5(0x214)],Window_StatusBase[_0x2043a5(0x2ec)][_0x2043a5(0x214)]=function(_0x4bb4bc,_0x34df71,_0x52da29,_0x41bfb3){const _0x597c2a=_0x2043a5;if(_0x4bb4bc['isActor']())_0x34df71=this[_0x597c2a(0x317)](_0x4bb4bc,_0x34df71);this[_0x597c2a(0x496)](_0x4bb4bc,_0x34df71,_0x52da29,_0x41bfb3);},Window_StatusBase[_0x2043a5(0x2ec)][_0x2043a5(0x496)]=function(_0x508c38,_0x33af2a,_0x5762b4,_0x205562){const _0x4c6dee=_0x2043a5;if([_0x4c6dee(0x252),'untitled'][_0x4c6dee(0x2ad)](_0x33af2a[_0x4c6dee(0x23b)]()))return;VisuMZ[_0x4c6dee(0x332)][_0x4c6dee(0x2be)][_0x4c6dee(0x3d1)](this,_0x508c38,_0x33af2a,_0x5762b4,_0x205562);},Window_StatusBase['prototype'][_0x2043a5(0x317)]=function(_0x300b69,_0x370050){const _0x151a43=_0x2043a5,_0x413e77=_0x300b69[_0x151a43(0x311)]()[_0x151a43(0x46f)];if(_0x370050==='hp'&&_0x413e77[_0x151a43(0x47c)](/<REPLACE HP GAUGE:[ ](.*)>/i)){if(_0x151a43(0x404)===_0x151a43(0x3ee)){function _0x369882(){const _0x530d3a=_0x151a43;_0x48d4ec[_0x530d3a(0x332)][_0x530d3a(0x494)]['call'](this,_0x1614ad,_0x525ff1),this['isBuffAffected'](_0x19e83b)&&this[_0x530d3a(0x2b8)](_0x59cdc5,_0x15c28b);}}else return String(RegExp['$1']);}else{if(_0x370050==='mp'&&_0x413e77[_0x151a43(0x47c)](/<REPLACE MP GAUGE:[ ](.*)>/i)){if('BsrQZ'===_0x151a43(0x434))return String(RegExp['$1']);else{function _0x5a1409(){const _0xdfd37e=_0x151a43;_0x3d5d43[_0xdfd37e(0x47c)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x3c29d7=_0x185f9a['indexOf'](_0x54c106(_0x2e4f42['$1'])[_0xdfd37e(0x1f2)]()),_0x18c0d1=_0x16e50c(_0x2a608c['$2']);_0x3c29d7>=0x0&&(_0x1d07ee[_0xdfd37e(0x464)](_0x3c29d7,_0x18c0d1),this['makeSuccess'](_0x569f8a));}}}else return _0x370050==='tp'&&_0x413e77[_0x151a43(0x47c)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x370050;}},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x275)]=Window_StatusBase[_0x2043a5(0x2ec)][_0x2043a5(0x253)],Window_StatusBase[_0x2043a5(0x2ec)][_0x2043a5(0x253)]=function(_0x56e146,_0x43b538,_0x5607ba,_0x28e4e1){const _0x233a63=_0x2043a5;if(!_0x56e146)return;Window_Base[_0x233a63(0x2ec)][_0x233a63(0x253)][_0x233a63(0x3d1)](this,_0x56e146,_0x43b538,_0x5607ba,_0x28e4e1);},VisuMZ['SkillsStatesCore'][_0x2043a5(0x47b)]=Window_SkillType[_0x2043a5(0x2ec)]['initialize'],Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x356)]=function(_0x1760bc){const _0x360419=_0x2043a5;VisuMZ[_0x360419(0x332)][_0x360419(0x47b)][_0x360419(0x3d1)](this,_0x1760bc),this[_0x360419(0x3c5)](_0x1760bc);},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x3c5)]=function(_0x429bfb){const _0x35466d=_0x2043a5,_0x454060=new Rectangle(0x0,0x0,_0x429bfb[_0x35466d(0x480)],_0x429bfb[_0x35466d(0x2a5)]);this[_0x35466d(0x463)]=new Window_Base(_0x454060),this[_0x35466d(0x463)][_0x35466d(0x2b4)]=0x0,this[_0x35466d(0x3a4)](this[_0x35466d(0x463)]),this[_0x35466d(0x374)]();},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x3d8)]=function(){const _0x41a085=_0x2043a5;Window_Command[_0x41a085(0x2ec)]['callUpdateHelp'][_0x41a085(0x3d1)](this);if(this[_0x41a085(0x463)])this[_0x41a085(0x374)]();},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x374)]=function(){const _0xa27c28=_0x2043a5,_0x782b2d=this['_commandNameWindow'];_0x782b2d[_0xa27c28(0x255)]['clear']();const _0x288f81=this[_0xa27c28(0x30f)](this[_0xa27c28(0x339)]());if(_0x288f81===_0xa27c28(0x3ca)&&this['maxItems']()>0x0){const _0x53ccc3=this['itemLineRect'](this[_0xa27c28(0x339)]());let _0x3c46b1=this[_0xa27c28(0x239)](this[_0xa27c28(0x339)]());_0x3c46b1=_0x3c46b1[_0xa27c28(0x217)](/\\I\[(\d+)\]/gi,''),_0x782b2d[_0xa27c28(0x2a2)](),this[_0xa27c28(0x242)](_0x3c46b1,_0x53ccc3),this['commandNameWindowDrawText'](_0x3c46b1,_0x53ccc3),this[_0xa27c28(0x2bb)](_0x3c46b1,_0x53ccc3);}},Window_SkillType['prototype'][_0x2043a5(0x242)]=function(_0x22209e,_0x587a5c){},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x33d)]=function(_0x54fb41,_0x2cf259){const _0x12be36=_0x2043a5,_0x16dc0e=this[_0x12be36(0x463)];_0x16dc0e[_0x12be36(0x1fe)](_0x54fb41,0x0,_0x2cf259['y'],_0x16dc0e[_0x12be36(0x3e9)],_0x12be36(0x1d3));},Window_SkillType['prototype']['commandNameWindowCenter']=function(_0x4117a2,_0x4436af){const _0x57313b=_0x2043a5,_0x49f15b=this[_0x57313b(0x463)],_0x36ec8a=$gameSystem[_0x57313b(0x440)](),_0x111579=_0x4436af['x']+Math['floor'](_0x4436af[_0x57313b(0x480)]/0x2)+_0x36ec8a;_0x49f15b['x']=_0x49f15b['width']/-0x2+_0x111579,_0x49f15b['y']=Math['floor'](_0x4436af[_0x57313b(0x2a5)]/0x2);},Window_SkillType['prototype']['isUseModernControls']=function(){const _0x57a0ea=_0x2043a5;return Imported[_0x57a0ea(0x1d7)]&&Window_Command['prototype']['isUseModernControls'][_0x57a0ea(0x3d1)](this);},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x46b)]=function(){const _0x59e6f8=_0x2043a5;if(!this[_0x59e6f8(0x327)])return;const _0x3a51ee=this[_0x59e6f8(0x327)]['skillTypes']();for(const _0x2ee84f of _0x3a51ee){const _0x2a249f=this['makeCommandName'](_0x2ee84f);this[_0x59e6f8(0x2c0)](_0x2a249f,'skill',!![],_0x2ee84f);}},Window_SkillType['prototype'][_0x2043a5(0x3fa)]=function(_0x207bbe){const _0x527ecb=_0x2043a5;let _0x4df1d1=$dataSystem[_0x527ecb(0x343)][_0x207bbe];if(_0x4df1d1[_0x527ecb(0x47c)](/\\I\[(\d+)\]/i))return _0x4df1d1;if(this[_0x527ecb(0x3ad)]()===_0x527ecb(0x32c))return _0x4df1d1;const _0x1d8230=VisuMZ[_0x527ecb(0x332)][_0x527ecb(0x34b)][_0x527ecb(0x1de)],_0x4d5c09=$dataSystem['magicSkills']['includes'](_0x207bbe),_0x4c46b3=_0x4d5c09?_0x1d8230['IconStypeMagic']:_0x1d8230[_0x527ecb(0x23a)];return _0x527ecb(0x45c)[_0x527ecb(0x28e)](_0x4c46b3,_0x4df1d1);},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x266)]=function(){const _0x8ceab9=_0x2043a5;return VisuMZ[_0x8ceab9(0x332)][_0x8ceab9(0x34b)][_0x8ceab9(0x1de)][_0x8ceab9(0x2d2)];},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x2ed)]=function(_0x19866d){const _0x47499c=_0x2043a5,_0x46fd8b=this[_0x47499c(0x30f)](_0x19866d);if(_0x46fd8b==='iconText')this[_0x47499c(0x1d9)](_0x19866d);else{if(_0x46fd8b===_0x47499c(0x3ca)){if(_0x47499c(0x318)!==_0x47499c(0x318)){function _0x139d8d(){const _0x579ca4=_0x47499c;this[_0x579ca4(0x279)]='',this[_0x579ca4(0x209)]={},this[_0x579ca4(0x1f6)]={},this['_stateOrigin']={};}}else this[_0x47499c(0x40d)](_0x19866d);}else Window_Command[_0x47499c(0x2ec)][_0x47499c(0x2ed)][_0x47499c(0x3d1)](this,_0x19866d);}},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x3ad)]=function(){const _0x4a975b=_0x2043a5;return VisuMZ[_0x4a975b(0x332)][_0x4a975b(0x34b)][_0x4a975b(0x1de)][_0x4a975b(0x390)];},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x30f)]=function(_0x27dee0){const _0x48319e=_0x2043a5;if(_0x27dee0<0x0)return _0x48319e(0x32c);const _0x40224d=this[_0x48319e(0x3ad)]();if(_0x40224d!==_0x48319e(0x1f3))return _0x40224d;else{if(this[_0x48319e(0x3f6)]()>0x0){if(_0x48319e(0x2ac)===_0x48319e(0x2ac)){const _0x325eef=this[_0x48319e(0x239)](_0x27dee0);if(_0x325eef[_0x48319e(0x47c)](/\\I\[(\d+)\]/i)){if(_0x48319e(0x212)===_0x48319e(0x2f0)){function _0x4f6af6(){const _0x462768=_0x48319e;_0x2b52aa[_0x462768(0x332)][_0x462768(0x34b)]['Buffs'][_0x462768(0x416)][_0x462768(0x3d1)](this,_0x1b40a5);}}else{const _0x2619a4=this[_0x48319e(0x281)](_0x27dee0),_0x21ae40=this[_0x48319e(0x2f7)](_0x325eef)[_0x48319e(0x480)];return _0x21ae40<=_0x2619a4[_0x48319e(0x480)]?_0x48319e(0x3c6):_0x48319e(0x3ca);}}}else{function _0x12d66e(){return _0x4e241e['SkillsStatesCore']['Scene_Skill_skillTypeWindowRect']['call'](this);}}}}return _0x48319e(0x32c);},Window_SkillType['prototype'][_0x2043a5(0x1d9)]=function(_0x2cbdd6){const _0x47ad40=_0x2043a5,_0x3bdaa0=this[_0x47ad40(0x281)](_0x2cbdd6),_0x28c759=this[_0x47ad40(0x239)](_0x2cbdd6),_0xef285d=this[_0x47ad40(0x2f7)](_0x28c759)[_0x47ad40(0x480)];this[_0x47ad40(0x42f)](this[_0x47ad40(0x465)](_0x2cbdd6));const _0x4b7ff=this[_0x47ad40(0x266)]();if(_0x4b7ff===_0x47ad40(0x49e))this[_0x47ad40(0x490)](_0x28c759,_0x3bdaa0['x']+_0x3bdaa0['width']-_0xef285d,_0x3bdaa0['y'],_0xef285d);else{if(_0x4b7ff==='center'){const _0x4b8578=_0x3bdaa0['x']+Math[_0x47ad40(0x45b)]((_0x3bdaa0[_0x47ad40(0x480)]-_0xef285d)/0x2);this[_0x47ad40(0x490)](_0x28c759,_0x4b8578,_0x3bdaa0['y'],_0xef285d);}else{if(_0x47ad40(0x4a0)!=='bqYTj')this[_0x47ad40(0x490)](_0x28c759,_0x3bdaa0['x'],_0x3bdaa0['y'],_0xef285d);else{function _0x531472(){const _0x151cf3=_0x47ad40;_0x10523e[_0xf91c09][_0x110993]&&_0x34bfdd[_0x3fde97][_0x543137][_0x151cf3(0x3d1)](this,_0x2b723a);}}}}},Window_SkillType[_0x2043a5(0x2ec)][_0x2043a5(0x40d)]=function(_0x37bdea){const _0x43daf8=_0x2043a5;this[_0x43daf8(0x239)](_0x37bdea)[_0x43daf8(0x47c)](/\\I\[(\d+)\]/i);const _0x3dde8e=Number(RegExp['$1'])||0x0,_0x311959=this[_0x43daf8(0x281)](_0x37bdea),_0x18a898=_0x311959['x']+Math[_0x43daf8(0x45b)]((_0x311959[_0x43daf8(0x480)]-ImageManager[_0x43daf8(0x357)])/0x2),_0x517a49=_0x311959['y']+(_0x311959[_0x43daf8(0x2a5)]-ImageManager[_0x43daf8(0x45d)])/0x2;this[_0x43daf8(0x288)](_0x3dde8e,_0x18a898,_0x517a49);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x1b4)]=Window_SkillStatus[_0x2043a5(0x2ec)][_0x2043a5(0x346)],Window_SkillStatus[_0x2043a5(0x2ec)][_0x2043a5(0x346)]=function(){const _0x23ee6d=_0x2043a5;VisuMZ[_0x23ee6d(0x332)][_0x23ee6d(0x1b4)]['call'](this);if(this[_0x23ee6d(0x327)])this[_0x23ee6d(0x230)]();},Window_SkillStatus[_0x2043a5(0x2ec)][_0x2043a5(0x230)]=function(){const _0x38e51e=_0x2043a5;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0x38e51e(0x1b6)])return;const _0x32e728=this['gaugeLineHeight']();let _0x1186be=this[_0x38e51e(0x248)]()/0x2+0xb4+0xb4+0xb4,_0x27e8d8=this['innerWidth']-_0x1186be-0x2;if(_0x27e8d8>=0x12c){const _0x6d35f3=VisuMZ[_0x38e51e(0x300)][_0x38e51e(0x34b)][_0x38e51e(0x458)]['DisplayedParams'],_0x53aab4=Math[_0x38e51e(0x45b)](_0x27e8d8/0x2)-0x18;let _0x3bc784=_0x1186be,_0x1519d1=Math[_0x38e51e(0x45b)]((this[_0x38e51e(0x341)]-Math[_0x38e51e(0x3e3)](_0x6d35f3[_0x38e51e(0x474)]/0x2)*_0x32e728)/0x2),_0x558c77=0x0;for(const _0xe4b667 of _0x6d35f3){this[_0x38e51e(0x38a)](_0x3bc784,_0x1519d1,_0x53aab4,_0xe4b667),_0x558c77++;if(_0x558c77%0x2===0x0){if(_0x38e51e(0x387)!==_0x38e51e(0x387)){function _0x23d258(){const _0x38df9c=_0x38e51e,_0x9b396a=_0x5c7c22[_0x38df9c(0x376)]('['+_0x56bc6d['$1'][_0x38df9c(0x47c)](/\d+/g)+']');for(const _0x33293c of _0x9b396a){if(!this['_actor']['isLearnedSkill'](_0x33293c))return!![];}return![];}}else _0x3bc784=_0x1186be,_0x1519d1+=_0x32e728;}else _0x3bc784+=_0x53aab4+0x18;}}this['resetFontSettings']();},Window_SkillStatus[_0x2043a5(0x2ec)][_0x2043a5(0x38a)]=function(_0xb406a2,_0x32a0e1,_0x61154a,_0x2634b1){const _0x51d84a=_0x2043a5,_0x51e5d8=this[_0x51d84a(0x396)]();this[_0x51d84a(0x2a2)](),this['drawParamText'](_0xb406a2,_0x32a0e1,_0x61154a,_0x2634b1,!![]),this['resetTextColor'](),this['contents'][_0x51d84a(0x48b)]-=0x8;const _0x3e7c26=this[_0x51d84a(0x327)][_0x51d84a(0x433)](_0x2634b1,!![]);this['contents'][_0x51d84a(0x1fe)](_0x3e7c26,_0xb406a2,_0x32a0e1,_0x61154a,_0x51e5d8,_0x51d84a(0x49e));},VisuMZ['SkillsStatesCore'][_0x2043a5(0x3cb)]=Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x2ad)],Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x2ad)]=function(_0x9434a9){const _0x400ad6=_0x2043a5;return this[_0x400ad6(0x210)](_0x9434a9);},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x42d)]=Window_SkillList[_0x2043a5(0x2ec)]['maxCols'],Window_SkillList[_0x2043a5(0x2ec)]['maxCols']=function(){const _0x162524=_0x2043a5;if(SceneManager[_0x162524(0x28c)]['constructor']===Scene_Battle){if(_0x162524(0x226)===_0x162524(0x405)){function _0x26d86c(){const _0x3a1119=_0x162524;_0x360146['categories'][_0x3a1119(0x276)](_0x53ad17[_0x3a1119(0x298)]());}}else return VisuMZ['SkillsStatesCore'][_0x162524(0x42d)][_0x162524(0x3d1)](this);}else{if(_0x162524(0x491)!==_0x162524(0x358))return VisuMZ['SkillsStatesCore']['Settings'][_0x162524(0x1de)]['ListWindowCols'];else{function _0x172df1(){const _0x1868a8=_0x162524;_0x4858d3[_0x1868a8(0x452)][_0x1868a8(0x276)](_0x1868a8(0x30d));}}}},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x347)]=Window_SkillList[_0x2043a5(0x2ec)]['setActor'],Window_SkillList['prototype'][_0x2043a5(0x454)]=function(_0x342bc0){const _0x2bac90=_0x2043a5,_0x550d9c=this[_0x2bac90(0x327)]!==_0x342bc0;VisuMZ[_0x2bac90(0x332)]['Window_SkillList_setActor']['call'](this,_0x342bc0);if(_0x550d9c){if(_0x2bac90(0x1cc)!==_0x2bac90(0x1cc)){function _0x21da71(){const _0x250465=_0x2bac90;_0x21a9ed[_0x250465(0x452)]['push'](_0x4fbbe8[_0x250465(0x1f2)]()['trim']());}}else this[_0x2bac90(0x2b1)]&&this[_0x2bac90(0x2b1)]['constructor']===Window_ShopStatus&&this[_0x2bac90(0x2b1)][_0x2bac90(0x329)](this['itemAt'](0x0));}},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x296)]=function(_0x24cafd){const _0x337182=_0x2043a5;if(this[_0x337182(0x3c0)]===_0x24cafd)return;this[_0x337182(0x3c0)]=_0x24cafd,this['refresh'](),this[_0x337182(0x43c)](0x0,0x0);if(this[_0x337182(0x2b1)]&&this[_0x337182(0x2b1)]['constructor']===Window_ShopStatus){if('LZvSm'!=='LZvSm'){function _0x4296cd(){const _0x5e2ffe=_0x337182;_0x4a1bd0[_0x5e2ffe(0x332)][_0x5e2ffe(0x3f0)][_0x5e2ffe(0x3d1)](this,_0x19b648),_0x35076d[_0x5e2ffe(0x332)][_0x5e2ffe(0x492)](_0x44a2fb),_0x29d2cd[_0x5e2ffe(0x332)]['Parse_Notetags_State_PassiveJS'](_0x3d338e),_0x41befa[_0x5e2ffe(0x332)]['Parse_Notetags_State_SlipEffectJS'](_0x2e2179),_0x566d25[_0x5e2ffe(0x332)][_0x5e2ffe(0x2d6)](_0x4fa71a);}}else this[_0x337182(0x2b1)][_0x337182(0x329)](this[_0x337182(0x44e)](0x0));}},Window_SkillList['prototype'][_0x2043a5(0x210)]=function(_0x56ee79){const _0x384bdf=_0x2043a5;if(!_0x56ee79)return VisuMZ[_0x384bdf(0x332)][_0x384bdf(0x3cb)][_0x384bdf(0x3d1)](this,_0x56ee79);if(!this[_0x384bdf(0x3dc)](_0x56ee79))return![];if(!this[_0x384bdf(0x383)](_0x56ee79))return![];if(!this['checkShowHideJS'](_0x56ee79))return![];return!![];},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x3dc)]=function(_0x288a94){const _0xebc5ec=_0x2043a5;return DataManager[_0xebc5ec(0x36c)](_0x288a94)['includes'](this['_stypeId']);},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x383)]=function(_0x36e568){const _0x651ded=_0x2043a5;if(!this[_0x651ded(0x31a)](_0x36e568))return![];if(!this[_0x651ded(0x225)](_0x36e568))return![];if(!this[_0x651ded(0x44a)](_0x36e568))return![];return!![];},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x31a)]=function(_0x3ad848){const _0x23cab5=_0x2043a5,_0x65560c=_0x3ad848[_0x23cab5(0x46f)];if(_0x65560c[_0x23cab5(0x47c)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x23cab5(0x37c)]())return![];else return _0x65560c[_0x23cab5(0x47c)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x23cab5(0x37c)]()?![]:!![];},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x225)]=function(_0x417f7d){const _0x19405d=_0x2043a5,_0x71850=_0x417f7d[_0x19405d(0x46f)];if(_0x71850['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x19405d(0x1ec)!=='BTYRh'){function _0x314ba0(){return this['skillTypeWindowRectSkillsStatesCore']();}}else{const _0xeeff69=JSON[_0x19405d(0x376)]('['+RegExp['$1'][_0x19405d(0x47c)](/\d+/g)+']');for(const _0x523463 of _0xeeff69){if(_0x19405d(0x2af)!==_0x19405d(0x1da)){if(!$gameSwitches[_0x19405d(0x243)](_0x523463))return![];}else{function _0x908022(){const _0xf75957=_0x19405d;if(!_0x4f6361)return![];if(!_0x5f8e09['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions'][_0xf75957(0x3d1)](this,_0x1f55cf))return![];if(!this[_0xf75957(0x293)](_0x2059fa))return![];if(!this[_0xf75957(0x1c5)](_0x3f39e8))return![];if(!this[_0xf75957(0x3b6)](_0x2b036a))return![];return!![];}}}return!![];}}if(_0x71850[_0x19405d(0x47c)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x589bfd=JSON[_0x19405d(0x376)]('['+RegExp['$1'][_0x19405d(0x47c)](/\d+/g)+']');for(const _0x20d42c of _0x589bfd){if(!$gameSwitches[_0x19405d(0x243)](_0x20d42c))return![];}return!![];}if(_0x71850[_0x19405d(0x47c)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3af8b4=JSON[_0x19405d(0x376)]('['+RegExp['$1'][_0x19405d(0x47c)](/\d+/g)+']');for(const _0x1f23cd of _0x3af8b4){if($gameSwitches[_0x19405d(0x243)](_0x1f23cd))return!![];}return![];}if(_0x71850[_0x19405d(0x47c)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x19405d(0x3d0)===_0x19405d(0x3d0)){const _0x168726=JSON[_0x19405d(0x376)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x451f34 of _0x168726){if(_0x19405d(0x2ca)===_0x19405d(0x2d0)){function _0xc9ada3(){const _0x36d8a6=_0x19405d,_0x45539c=_0x1e3112[_0x36d8a6(0x3e4)][_0x36d8a6(0x3d1)](this,_0x37f073);_0x2f4cb5[_0x36d8a6(0x2e9)][_0x36d8a6(0x3d1)](this,_0x5aff76,_0x45539c);}}else{if(!$gameSwitches[_0x19405d(0x243)](_0x451f34))return!![];}}return![];}else{function _0x3ee9f3(){const _0x26330f=_0x19405d;if(typeof _0x473699!==_0x26330f(0x282))_0x35694d=_0x4b6724['id'];this[_0x26330f(0x3a6)]=this['_stateOrigin']||{},this[_0x26330f(0x3a6)][_0x247969]=this['_stateOrigin'][_0x5706da]||'user';const _0x3e7b58=this[_0x26330f(0x3a6)][_0x2e8a1a];return this[_0x26330f(0x3a9)](_0x3e7b58);}}}if(_0x71850[_0x19405d(0x47c)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e6bc5=JSON[_0x19405d(0x376)]('['+RegExp['$1'][_0x19405d(0x47c)](/\d+/g)+']');for(const _0x141a48 of _0x1e6bc5){if(!$gameSwitches[_0x19405d(0x243)](_0x141a48))return!![];}return![];}if(_0x71850['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x464bb5=JSON['parse']('['+RegExp['$1'][_0x19405d(0x47c)](/\d+/g)+']');for(const _0x481bb6 of _0x464bb5){if(_0x19405d(0x1f9)===_0x19405d(0x1f9)){if($gameSwitches[_0x19405d(0x243)](_0x481bb6))return![];}else{function _0x485341(){const _0x217c19=_0x19405d;return this[_0x217c19(0x3fc)](_0x243cbb)>0x0;}}}return!![];}return!![];},Window_SkillList['prototype'][_0x2043a5(0x44a)]=function(_0x1794ce){const _0x301895=_0x2043a5,_0x259e00=_0x1794ce[_0x301895(0x46f)];if(_0x259e00['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3f4273=JSON[_0x301895(0x376)]('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x2cb4c4 of _0x3f4273){if(_0x301895(0x418)===_0x301895(0x442)){function _0x530703(){const _0x4e9eff=_0x301895,_0x3f584d=_0x329acc['parse']('['+_0x24f910['$1']['match'](/\d+/g)+']');for(const _0xf99010 of _0x3f584d){if(!this[_0x4e9eff(0x327)][_0x4e9eff(0x403)](_0xf99010))return!![];}return![];}}else{if(!this[_0x301895(0x327)]['isLearnedSkill'](_0x2cb4c4))return![];}}return!![];}else{if(_0x259e00[_0x301895(0x47c)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x301895(0x1dc)!==_0x301895(0x1dc)){function _0x1ef13d(){const _0x1ccc91=_0x301895;_0xdb26bd[_0x1ccc91(0x332)]['Settings'][_0x1ccc91(0x1d5)][_0x1ccc91(0x283)]['call'](this,_0x275a74);}}else{const _0x274950=RegExp['$1']['split'](',');for(const _0x333514 of _0x274950){const _0x5466a0=DataManager[_0x301895(0x370)](_0x333514);if(!_0x5466a0)continue;if(!this[_0x301895(0x327)][_0x301895(0x38e)](_0x5466a0))return![];}return!![];}}}if(_0x259e00[_0x301895(0x47c)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x58e57d=JSON['parse']('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x4ba956 of _0x58e57d){if(!this[_0x301895(0x327)]['isLearnedSkill'](_0x4ba956))return![];}return!![];}else{if(_0x259e00[_0x301895(0x47c)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x479809=RegExp['$1']['split'](',');for(const _0x12bd11 of _0x479809){const _0x3952d2=DataManager['getSkillIdWithName'](_0x12bd11);if(!_0x3952d2)continue;if(!this[_0x301895(0x327)][_0x301895(0x38e)](_0x3952d2))return![];}return!![];}}if(_0x259e00[_0x301895(0x47c)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12a3ef=JSON['parse']('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x52b3bd of _0x12a3ef){if(_0x301895(0x2f6)!==_0x301895(0x1ff)){if(this[_0x301895(0x327)][_0x301895(0x38e)](_0x52b3bd))return!![];}else{function _0x180c10(){const _0x17e863=_0x301895;this[_0x17e863(0x2b1)]&&this[_0x17e863(0x2b1)][_0x17e863(0x1c7)]===_0x1c9693&&this[_0x17e863(0x2b1)][_0x17e863(0x329)](this[_0x17e863(0x44e)](0x0));}}}return![];}else{if(_0x259e00[_0x301895(0x47c)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x301895(0x2d4)===_0x301895(0x2d4)){const _0x138b6c=RegExp['$1'][_0x301895(0x1d6)](',');for(const _0x4cf125 of _0x138b6c){const _0x559ae3=DataManager[_0x301895(0x370)](_0x4cf125);if(!_0x559ae3)continue;if(this[_0x301895(0x327)][_0x301895(0x38e)](_0x559ae3))return!![];}return![];}else{function _0x4b3147(){const _0x56b819=_0x301895,_0x5ef3b7=_0x1e38a0[_0x56b819(0x46f)];if(_0x5ef3b7[_0x56b819(0x47c)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x664d5f=_0x1702db(_0x29a419['$1']),_0x139b17=_0x56b819(0x1bb)[_0x56b819(0x28e)](_0x664d5f);_0x474aff[_0x56b819(0x332)]['skillEnableJS'][_0x3980e2['id']]=new _0x180df7(_0x56b819(0x38c),_0x139b17);}if(_0x5ef3b7[_0x56b819(0x47c)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x218240=_0x36dfcb(_0xc9e442['$1']),_0x1e203=_0x56b819(0x2c6)[_0x56b819(0x28e)](_0x218240);_0x3f31d4[_0x56b819(0x332)][_0x56b819(0x40e)][_0x33d226['id']]=new _0x2f3c32(_0x56b819(0x38c),_0x1e203);}}}}}if(_0x259e00['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x35fc94=JSON[_0x301895(0x376)]('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x254ad8 of _0x35fc94){if(_0x301895(0x3cf)==='HWkTz'){function _0x54767b(){const _0x300703=_0x301895,_0x2e3886='_stored_buffColor';this[_0x300703(0x2cd)]=this[_0x300703(0x2cd)]||{};if(this[_0x300703(0x2cd)][_0x2e3886])return this[_0x300703(0x2cd)][_0x2e3886];const _0x78064d=_0x26148b['SkillsStatesCore'][_0x300703(0x34b)][_0x300703(0x450)][_0x300703(0x395)];return this[_0x300703(0x2c3)](_0x2e3886,_0x78064d);}}else{if(!this[_0x301895(0x327)]['isLearnedSkill'](_0x254ad8))return!![];}}return![];}else{if(_0x259e00[_0x301895(0x47c)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x301895(0x21a)===_0x301895(0x21a)){const _0x2f8dcd=RegExp['$1']['split'](',');for(const _0x170981 of _0x2f8dcd){const _0x49de4d=DataManager[_0x301895(0x370)](_0x170981);if(!_0x49de4d)continue;if(!this[_0x301895(0x327)]['isLearnedSkill'](_0x49de4d))return!![];}return![];}else{function _0x14858c(){const _0x55937d=_0x301895;for(const _0x5d62ed of this[_0x55937d(0x3d4)]()){this[_0x55937d(0x33e)](_0x5d62ed['id'])&&_0x5d62ed[_0x55937d(0x386)]===_0x5d50d7&&(this['removeState'](_0x5d62ed['id']),this[_0x55937d(0x1c0)](_0x5d62ed['id']),this[_0x55937d(0x2b3)](_0x5d62ed['id']));}}}}}if(_0x259e00['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x122846=JSON[_0x301895(0x376)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x475939 of _0x122846){if(!this[_0x301895(0x327)]['isLearnedSkill'](_0x475939))return!![];}return![];}else{if(_0x259e00[_0x301895(0x47c)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x301895(0x45a)!==_0x301895(0x284)){const _0x4c9d9d=RegExp['$1']['split'](',');for(const _0x7e346c of _0x4c9d9d){const _0x4d5d1c=DataManager['getSkillIdWithName'](_0x7e346c);if(!_0x4d5d1c)continue;if(!this[_0x301895(0x327)][_0x301895(0x38e)](_0x4d5d1c))return!![];}return![];}else{function _0xdc7a6d(){const _0x55f8cb=_0x301895;this[_0x55f8cb(0x3bb)](_0x7d1a77['id']),this['onExpireState'](_0x48b4c3['id']),this[_0x55f8cb(0x2b3)](_0x2d1314['id']);}}}}if(_0x259e00[_0x301895(0x47c)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x335e1d=JSON[_0x301895(0x376)]('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x2a57a1 of _0x335e1d){if(this[_0x301895(0x327)][_0x301895(0x38e)](_0x2a57a1))return![];}return!![];}else{if(_0x259e00[_0x301895(0x47c)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x301895(0x45e)!==_0x301895(0x45e)){function _0x6b9f4a(){const _0x7123cd=_0x301895;return this[_0x7123cd(0x2e3)]()['match'](/RIGHT/i);}}else{const _0x5a41b3=RegExp['$1']['split'](',');for(const _0x25b12b of _0x5a41b3){const _0x229438=DataManager['getSkillIdWithName'](_0x25b12b);if(!_0x229438)continue;if(this[_0x301895(0x327)]['isLearnedSkill'](_0x229438))return![];}return!![];}}}if(_0x259e00[_0x301895(0x47c)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3acbd4=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2f5415 of _0x3acbd4){if(!this[_0x301895(0x327)][_0x301895(0x403)](_0x2f5415))return![];}return!![];}else{if(_0x259e00[_0x301895(0x47c)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x499dad=RegExp['$1'][_0x301895(0x1d6)](',');for(const _0x447b82 of _0x499dad){if(_0x301895(0x1b7)!==_0x301895(0x1b7)){function _0x47d9e8(){const _0x386229=_0x301895;if(typeof _0xff2fd0===_0x386229(0x282))_0x56f577=_0xfa2bde[_0x515267];const _0x5a4123=_0x386229(0x30c)[_0x386229(0x28e)](_0x4f0df4['id']);this[_0x386229(0x2cd)]=this[_0x386229(0x2cd)]||{};if(this[_0x386229(0x2cd)][_0x5a4123])return this['_colorCache'][_0x5a4123];const _0xd0c976=this[_0x386229(0x334)](_0x1d15ca);return this[_0x386229(0x2c3)](_0x5a4123,_0xd0c976);}}else{const _0x299316=DataManager[_0x301895(0x370)](_0x447b82);if(!_0x299316)continue;if(!this[_0x301895(0x327)][_0x301895(0x403)](_0x299316))return![];}}return!![];}}if(_0x259e00[_0x301895(0x47c)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x166c91=JSON[_0x301895(0x376)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1defda of _0x166c91){if(!this[_0x301895(0x327)][_0x301895(0x403)](_0x1defda))return![];}return!![];}else{if(_0x259e00[_0x301895(0x47c)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x68e16e=RegExp['$1'][_0x301895(0x1d6)](',');for(const _0x5acd90 of _0x68e16e){if(_0x301895(0x36d)==='ptmed'){function _0x21e8dc(){const _0x27ac2a=_0x301895;if(typeof _0x1d130f!==_0x27ac2a(0x282))_0x1f1c4c=_0x26aea9['id'];this[_0x27ac2a(0x209)]=this[_0x27ac2a(0x209)]||{},this['_stateData'][_0x386c3f]={};}}else{const _0x1dd8ed=DataManager[_0x301895(0x370)](_0x5acd90);if(!_0x1dd8ed)continue;if(!this['_actor']['hasSkill'](_0x1dd8ed))return![];}}return!![];}}if(_0x259e00[_0x301895(0x47c)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x301895(0x424)==='HnEzV'){const _0x3dba00=JSON[_0x301895(0x376)]('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x38ed33 of _0x3dba00){if('QLjHd'===_0x301895(0x23d)){function _0x5366ac(){const _0x5a1f25=_0x301895;if(_0x358172['Name'][_0x5a1f25(0x1f2)]()==='MP')return _0x511974[_0x5a1f25(0x3e4)]['call'](this,_0x466a25);}}else{if(this[_0x301895(0x327)]['hasSkill'](_0x38ed33))return!![];}}return![];}else{function _0x468811(){const _0xe70784=_0x301895;if(!_0x2518c0[_0xe70784(0x332)][_0xe70784(0x34b)][_0xe70784(0x450)][_0xe70784(0x274)])return;const _0x24572b=_0x5e8699[_0xe70784(0x488)](_0x1fe0c4);if(_0x24572b===0x0)return;const _0x571f0a=_0x282bf9['buffTurns'](_0x178995),_0x2161e5=_0x3ad02e[_0xe70784(0x357)],_0x7187da=_0x24572b>0x0?_0x1a6d66[_0xe70784(0x1cb)]():_0x3b812d['debuffColor']();this[_0xe70784(0x2de)](_0x7187da),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0xe70784(0x255)]['fontBold']=!![],this[_0xe70784(0x255)][_0xe70784(0x48b)]=_0x2b7129[_0xe70784(0x332)][_0xe70784(0x34b)][_0xe70784(0x450)][_0xe70784(0x41a)],_0x12ad54+=_0x3db215[_0xe70784(0x332)]['Settings'][_0xe70784(0x450)]['TurnOffsetX'],_0x125bb3+=_0x2950d9['SkillsStatesCore'][_0xe70784(0x34b)][_0xe70784(0x450)][_0xe70784(0x375)],this[_0xe70784(0x1fe)](_0x571f0a,_0x20e460,_0x2d2fd2,_0x2161e5,_0xe70784(0x49e)),this[_0xe70784(0x255)][_0xe70784(0x3b0)]=![],this['resetFontSettings']();}}}else{if(_0x259e00[_0x301895(0x47c)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x301895(0x1ca)!==_0x301895(0x49c)){const _0xc33076=RegExp['$1'][_0x301895(0x1d6)](',');for(const _0x427c04 of _0xc33076){if(_0x301895(0x39b)!==_0x301895(0x1f0)){const _0x2ba6a=DataManager[_0x301895(0x370)](_0x427c04);if(!_0x2ba6a)continue;if(this[_0x301895(0x327)][_0x301895(0x403)](_0x2ba6a))return!![];}else{function _0x1a51ed(){return!![];}}}return![];}else{function _0x1d9336(){const _0x168e56=_0x301895,_0x1ace51=this[_0x168e56(0x281)](_0x54444c),_0x2dcbd2=this[_0x168e56(0x239)](_0x508019),_0x422208=this['textSizeEx'](_0x2dcbd2)['width'];this[_0x168e56(0x42f)](this[_0x168e56(0x465)](_0x360723));const _0x560b1c=this['itemTextAlign']();if(_0x560b1c===_0x168e56(0x49e))this[_0x168e56(0x490)](_0x2dcbd2,_0x1ace51['x']+_0x1ace51[_0x168e56(0x480)]-_0x422208,_0x1ace51['y'],_0x422208);else{if(_0x560b1c===_0x168e56(0x1d3)){const _0x3eaa32=_0x1ace51['x']+_0x2bb0ef[_0x168e56(0x45b)]((_0x1ace51[_0x168e56(0x480)]-_0x422208)/0x2);this['drawTextEx'](_0x2dcbd2,_0x3eaa32,_0x1ace51['y'],_0x422208);}else this[_0x168e56(0x490)](_0x2dcbd2,_0x1ace51['x'],_0x1ace51['y'],_0x422208);}}}}}if(_0x259e00[_0x301895(0x47c)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('KMuqD'!==_0x301895(0x2fa)){const _0x296d84=JSON[_0x301895(0x376)]('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x3d36f2 of _0x296d84){if(_0x301895(0x3f7)!==_0x301895(0x44b)){if(!this['_actor'][_0x301895(0x403)](_0x3d36f2))return!![];}else{function _0x372769(){const _0x324d91=_0x301895;if(!_0x4a0c60[_0x324d91(0x332)][_0x324d91(0x34b)][_0x324d91(0x1d5)][_0x324d91(0x274)])return;if(!_0x9df3ef[_0x324d91(0x335)](_0x2ff89f['id']))return;if(_0x387a38[_0x324d91(0x386)]===0x0)return;if(_0x37fd51[_0x324d91(0x46f)][_0x324d91(0x47c)](/<HIDE STATE TURNS>/i))return;const _0x31166e=_0xb1f799[_0x324d91(0x2bf)](_0x577b76['id']),_0x2f49fe=_0x4eede1[_0x324d91(0x357)],_0x1594d9=_0x56f58a['stateColor'](_0x4b7c85);this[_0x324d91(0x2de)](_0x1594d9),this[_0x324d91(0x35c)](_0x324d91(0x326)),this['contents'][_0x324d91(0x3b0)]=!![],this[_0x324d91(0x255)][_0x324d91(0x48b)]=_0x1a1283[_0x324d91(0x332)][_0x324d91(0x34b)][_0x324d91(0x1d5)][_0x324d91(0x41a)],_0x3051c7+=_0x1648b7[_0x324d91(0x332)][_0x324d91(0x34b)][_0x324d91(0x1d5)][_0x324d91(0x3a3)],_0x206b90+=_0x1cdec0[_0x324d91(0x332)][_0x324d91(0x34b)][_0x324d91(0x1d5)][_0x324d91(0x375)],this[_0x324d91(0x1fe)](_0x31166e,_0x584dd3,_0x213df3,_0x2f49fe,'right'),this['contents']['fontBold']=![],this[_0x324d91(0x2a2)]();}}}return![];}else{function _0x40489c(){const _0x97ee35=_0x301895;return _0x1b8e59=_0x14a0f7[_0x97ee35(0x1f2)]()[_0x97ee35(0x298)](),this[_0x97ee35(0x3d4)]()[_0x97ee35(0x1e0)](_0x3ace32=>_0x3ace32[_0x97ee35(0x452)][_0x97ee35(0x2ad)](_0x4c0bef));}}}else{if(_0x259e00['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x301895(0x3e0)===_0x301895(0x3e0)){const _0x1393ec=RegExp['$1'][_0x301895(0x1d6)](',');for(const _0x5ec024 of _0x1393ec){const _0x586f20=DataManager[_0x301895(0x370)](_0x5ec024);if(!_0x586f20)continue;if(!this[_0x301895(0x327)][_0x301895(0x403)](_0x586f20))return!![];}return![];}else{function _0x1f384d(){const _0x52d837=_0x301895,_0x47a897=_0x117f53[_0x52d837(0x376)]('['+_0x3fce65['$1'][_0x52d837(0x47c)](/\d+/g)+']');for(const _0x59c098 of _0x47a897){if(!_0x28b2a4[_0x52d837(0x243)](_0x59c098))return![];}return!![];}}}}if(_0x259e00['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5f1496=JSON['parse']('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x21597f of _0x5f1496){if(!this[_0x301895(0x327)][_0x301895(0x403)](_0x21597f))return!![];}return![];}else{if(_0x259e00['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if('NAiOn'!==_0x301895(0x1fd)){const _0x589ef1=RegExp['$1'][_0x301895(0x1d6)](',');for(const _0x57c2e8 of _0x589ef1){const _0x17b615=DataManager[_0x301895(0x370)](_0x57c2e8);if(!_0x17b615)continue;if(!this['_actor'][_0x301895(0x403)](_0x17b615))return!![];}return![];}else{function _0x3d8b09(){const _0xfc1290=_0x301895;if(_0x4e66d1[_0xfc1290(0x243)](_0x59f04a))return!![];}}}}if(_0x259e00[_0x301895(0x47c)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x301895(0x43a)!=='OPXQy'){const _0xd98d21=JSON[_0x301895(0x376)]('['+RegExp['$1'][_0x301895(0x47c)](/\d+/g)+']');for(const _0x13aa25 of _0xd98d21){if(this['_actor']['hasSkill'](_0x13aa25))return![];}return!![];}else{function _0x3938e7(){const _0x35ada0=_0x301895,_0x318c50=_0x259c9d[_0x17abf8];if(_0x318c50&&_0x318c50[_0x35ada0(0x46f)][_0x35ada0(0x47c)](/<NO DEATH CLEAR>/i))return!this[_0x35ada0(0x2ba)](_0x26a3dc)&&!this[_0x35ada0(0x36e)](_0x507c4b)&&!this[_0x35ada0(0x470)][_0x35ada0(0x1db)](_0x354fdb);return _0x5a124d[_0x35ada0(0x332)][_0x35ada0(0x233)]['call'](this,_0x234e0e);}}}else{if(_0x259e00[_0x301895(0x47c)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x301895(0x2f5)===_0x301895(0x1ba)){function _0x1a7ed6(){const _0x4fd498=_0x301895;for(const _0x7e91af of _0x4917d8){_0x7e91af[_0x4fd498(0x47c)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x496c03=_0x8577ea(_0x153c01['$1'])[_0x4fd498(0x1f2)]()['trim']()['split'](',');for(const _0x289eaa of _0x496c03){_0x25a1d8[_0x4fd498(0x452)]['push'](_0x289eaa[_0x4fd498(0x298)]());}}}}else{const _0x3dda73=RegExp['$1']['split'](',');for(const _0x29147b of _0x3dda73){const _0x1c3589=DataManager[_0x301895(0x370)](_0x29147b);if(!_0x1c3589)continue;if(this[_0x301895(0x327)][_0x301895(0x403)](_0x1c3589))return![];}return!![];}}}return!![];},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x1b2)]=function(_0x5ade17){const _0x23a3de=_0x2043a5,_0x545d0e=_0x5ade17[_0x23a3de(0x46f)],_0x195cc9=VisuMZ[_0x23a3de(0x332)]['skillVisibleJS'];if(_0x195cc9[_0x5ade17['id']]){if('egzyb'!==_0x23a3de(0x1b1))return _0x195cc9[_0x5ade17['id']][_0x23a3de(0x3d1)](this,_0x5ade17);else{function _0x59f166(){const _0x4f69b5=_0x23a3de;_0x52a3d9+=this['buffTurns'](_0x121bed),this[_0x4f69b5(0x2ee)](_0x194aeb,_0x52d66a);}}}else{if(_0x23a3de(0x286)===_0x23a3de(0x286))return!![];else{function _0x3d0113(){this['_stateRetainType']=_0x992909;}}}},VisuMZ['SkillsStatesCore'][_0x2043a5(0x2ab)]=Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x2ed)],Window_SkillList['prototype'][_0x2043a5(0x2ed)]=function(_0x91a642){const _0x4826b1=_0x2043a5,_0x26aa40=this['itemAt'](_0x91a642),_0x19f8c0=_0x26aa40[_0x4826b1(0x453)];if(_0x26aa40)this['alterSkillName'](_0x26aa40);VisuMZ[_0x4826b1(0x332)][_0x4826b1(0x2ab)][_0x4826b1(0x3d1)](this,_0x91a642);if(_0x26aa40)_0x26aa40[_0x4826b1(0x453)]=_0x19f8c0;},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x42b)]=function(_0x435126){const _0x12ad14=_0x2043a5;if(_0x435126&&_0x435126[_0x12ad14(0x46f)][_0x12ad14(0x47c)](/<LIST NAME:[ ](.*)>/i)){if(_0x12ad14(0x426)===_0x12ad14(0x426)){_0x435126[_0x12ad14(0x453)]=String(RegExp['$1'])[_0x12ad14(0x298)]();for(;;){if(_0x12ad14(0x244)!=='HuxSt'){function _0x36e8be(){return!![];}}else{if(_0x435126[_0x12ad14(0x453)][_0x12ad14(0x47c)](/\\V\[(\d+)\]/gi))_0x435126['name']=_0x435126[_0x12ad14(0x453)][_0x12ad14(0x217)](/\\V\[(\d+)\]/gi,(_0x10207d,_0x1b4ed8)=>$gameVariables[_0x12ad14(0x243)](parseInt(_0x1b4ed8)));else{if('SatFy'!=='xAdmW')break;else{function _0x1cf825(){const _0x48accd=_0x12ad14;if(!this['canUse'](_0x321a9d))return![];const _0x1f2950=this[_0x48accd(0x343)](),_0x21dd36=_0x49536f[_0x48accd(0x36c)](_0x55801d),_0x196b2a=_0x1f2950[_0x48accd(0x1e0)](_0x203079=>_0x21dd36[_0x48accd(0x2ad)](_0x203079));return _0x196b2a[_0x48accd(0x474)]>0x0;}}}}}}else{function _0x566011(){const _0x26cd46=_0x12ad14;return _0x3b883a[_0x26cd46(0x332)][_0x26cd46(0x34b)][_0x26cd46(0x1de)][_0x26cd46(0x475)][_0x26cd46(0x3d1)](this,_0x3b12fe);}}}},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x25a)]=function(_0x50f952,_0x3c3f48,_0x4b455a,_0x39291f){const _0x383aaf=_0x2043a5;Window_Base[_0x383aaf(0x2ec)]['drawSkillCost'][_0x383aaf(0x3d1)](this,this[_0x383aaf(0x327)],_0x50f952,_0x3c3f48,_0x4b455a,_0x39291f);},Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x3d6)]=function(_0x5309b7){const _0x54cc61=_0x2043a5;this[_0x54cc61(0x2b1)]=_0x5309b7,this[_0x54cc61(0x3d8)]();},VisuMZ[_0x2043a5(0x332)][_0x2043a5(0x21f)]=Window_SkillList['prototype']['updateHelp'],Window_SkillList[_0x2043a5(0x2ec)][_0x2043a5(0x2b9)]=function(){const _0x4dc07f=_0x2043a5;VisuMZ[_0x4dc07f(0x332)]['Window_SkillList_updateHelp']['call'](this),this[_0x4dc07f(0x2b1)]&&this[_0x4dc07f(0x2b1)][_0x4dc07f(0x1c7)]===Window_ShopStatus&&this[_0x4dc07f(0x2b1)][_0x4dc07f(0x329)](this[_0x4dc07f(0x33a)]());};