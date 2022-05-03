//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.27;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.27] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for singul column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
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
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
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
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
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
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
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
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
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
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0xd816=['updateChangedSlots','ParamValueFontSize','hide','commandNameWindowDrawBackground','statusWindowRectItemsEquipsCore','DrawParamJS','equipTypes','_handlers','paramPlus','hideAdditionalSprites','ParamChangeFontSize','PurchaseOnly','drawText','_dummyWindow','setShopStatusWindowMode','allowShiftScrolling','BLSED','activate','currencyUnit','limitedPageUpDownSceneCheck','_tempActorA','isMainMenuCoreMenuImageOptionAvailable','hOKzA','getItemDamageAmountLabel','_categoryWindow','commandNameWindowDrawText','QpioG','HiddenItemB','Gkttn','drawItemHitType','isOptimizeCommandEnabled','categoryWindowRectItemsEquipsCore','JsMlg','LabelApply','bind','Window_ShopBuy_price','Scene_Shop_onSellOk','uKniT','forceChangeEquipSlots','MAT','drawItemName','CommandAddClear','CXuUd','prepareNextScene','XNmJu','SpeedNeg2000','buDsm','actorParams','filter','setValue','resetShopSwitches','processCursorSpecialCheckModernControls','BatchShop','CmdIconClear','DrawPortraitJS','weaponTypes','LjAfe','_shopStatusMenuMode','ItemMenuStatusRect','isRightInputMode','paramJS','xPZEb','Scene_Equip_createSlotWindow','WCQSa','isEquipItem','Window_ItemCategory_initialize','uiHelpPosition','Parse_Notetags_ParamValues','gainTP','saUdf','selfTP','meetsItemConditionsNotetags','sellWindowRectItemsEquipsCore','drawItemRepeats','drawActorCharacter','jkSYJ','MDF','commandStyle','removeStateBuffChanges','MzYMM','xnoba','optimize','DamageType%1','paramValueFontSize','GBQfB','setBackgroundType','getItemEffectsMpRecoveryText','drawParamsItemsEquipsCore','numItems','buttonAssistOffset3','splice','scrollTo','equips','Step2End','RtyNA','Icon','AllItems','getItemEffectsHpDamageLabel','createItemWindow','Scene_Shop_commandBuy','DCQmg','#%1','ARRAYJSON','repeats','drawItemCost','OCOBc','drawItemKeyData','Nvkzh','cIoTg','OErTQ','callUpdateHelp','PyjoP','getInputMultiButtonStrings','Game_Actor_changeEquip','177557jTTOaW','_sellWindow','Scene_Shop_commandWindowRect','drawItemEffectsTpRecovery','tnSkV','slqEK','getItemEffectsRemovedStatesBuffsLabel','deselect','hLUMM','qiIqe','isSoleArmorType','ZSrQK','sWqCb','Scene_Load_reloadMapIfUpdated','amrbo','isClearCommandAdded','getItemEffectsRemovedStatesBuffsText','onSellOk','fill','toUpperCase','changeEquip','refresh','createSellWindow','LabelHitType','addWindow','WbcCr','_buyWindowLastIndex','ADDED\x20EFFECTS','isSoleWeaponType','commandWindowRect','UUvZr','cursorUp','playBuzzerSound','(%1)','addCommand','buttonAssistKey2','newLabelEnabled','drawNewLabelText','processShiftRemoveShortcut','members','ItemsEquipsCore','changeEquipById','Game_Party_initialize','LYcLV','contents','iTEUo','getItemDamageAmountTextOriginal','innerWidth','drawEquipData','EFFECT_REMOVE_BUFF','windowPadding','geUpdatedLayoutStatusWidth','elMkC','onTouchOk','drawRemoveItem','LUK','buffIconIndex','clamp','Enable','+%1%','refreshItemsEquipsCoreNoMenuImage','statusWidth','NonOptimizeETypes','doBuy','hMQJD','occasion','Settings','gIgYR','ShopMenuStatusStandard','Scene_Shop_createCategoryWindow','CkjnF','nRKJA','doSell','aEuUd','setTempActor','VjeHn','kcrYr','WFzsi','RegExp','getItemHitTypeLabel','LabelSpeed','effects','setItem','categoryList','rateHP','optKeyItemsNumber','JtCKz','createStatusWindow','TKsFk','BUPSS','_data','left','NeverUsable','postCreateItemWindowModernControls','itypeId','zFWHL','convertInitEquipsToItems','ExtDisplayedParams','flatMP','getItemEffectsMpDamageText','changeTextColor','refreshCursor','processCursorMove','fjXSy','RyVuX','price','cursorPageup','CmdTextAlign','optimizeEquipments','CmdIconEquip','pageup','gjPUc','onSlotOkAutoSelect','Scene_Shop_create','ogZwl','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','EFFECT_REMOVE_STATE','buy','mhp','buyWindowRect','lhvHJ','getColor','_scene','Damage\x20Formula\x20Error\x20for\x20%1','commandNameWindowCenter','isEquipCommandAdded','hpRate','drawUpdatedParamValueDiff','Window_Selectable_refresh','lvmRV','clearNewItem','drawItem','BXJUf','RnVZF','gaugeLineHeight','tNXbb','_newLabelSprites','create','WDPtN','ARRAYNUM','ScopeRandomAllies','Svpoz','bNYEz','isDrawItemNumber','cursorPagedown','loadFaceImages','tLLLf','_shopStatusMenuAlly','isClearCommandEnabled','?????','Game_Actor_tradeItemWithParty','type','LaFIn','VisuMZ_0_CoreEngine','values','right','drawNewLabelIcon','FIPwT','ItemSceneAdjustItemList','active','adjustHiddenShownGoods','ActorResetEquipSlots','updateNewLabelOpacity','drawItemDarkRect','OJIni','isClearEquipOk','addChild','Actors','INOKl','armor-%1','Window_ShopBuy_refresh','FDrMx','qpvEn','EVAL','paramValueByName','QhAta','max','onCategoryCancel','IjjYS','initNewLabelSprites','ASJfl','createCategoryNameWindow','Window_ItemList_colSpacing','actor','bestEquipItem','NPQpi','jyALc','createSlotWindow','bsHzL','lineHeight','replace','ZbRNI','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','checkItemConditionsSwitchNotetags','CmdIconOptimize','_commandNameWindow','_goodsCount','Step3End','damageColor','CmdCancelRename','canConsumeItem','scxcQ','_statusWindow','SellPriceJS','hHAPa','_newLabelOpacityUpperLimit','TKCwZ','LabelRecoverHP','ewmPR','YlrcK','fcmPq','lBhgV','getItemDamageAmountText','params','0000','equipSlots','ItemQuantityFontSize','jWLbh','ZfFCq','process_VisuMZ_ItemsEquipsCore_Notetags','yUbWo','itemWindowRectItemsEquipsCore','NotConsumable','addStateBuffChanges','sEZrH','battleMembers','mainCommandWidth','format','categoryStyleCheck','gRfAb','DAMAGE\x20MULTIPLIER','sellPriceRate','13VPObog','top','drawItemDamage','Qwhst','move','allowCreateStatusWindow','DEF','_calculatingJSParameters','IconSet','AmveF','LabelRecoverMP','Ossag','ElementWeapon','ScopeAlliesButUser','height','armorTypes','Scene_Equip_onSlotCancel','buyWindowRectItemsEquipsCore','FqNKm','allowCommandWindowCursorUp','equip','JSON','onBuyCancel','drawItemDamageElement','eIGMb','730944wCLNoO','Scene_Equip_commandWindowRect','XwaeK','drawParamText','9XiOsls','_doubleTouch','ParseAllNotetags','YxrCp','onAqA','drawItemEffectsMpRecovery','isOptimizeCommandAdded','PbwYy','return\x200','Game_Actor_discardEquip','isCommandEnabled','setMp','MaxHP','drawCurrencyValue','Parse_Notetags_Prices','NKijF','RQhSb','PzuaB','isBattleTest','NHQQH','_commandWindow','commandSellItemsEquipsCore','AllWeapons','sEEqe','clearNewLabelFromItem','revertGlobalNamespaceVariables','Scene_Shop_activateSellWindow','getItemEffectsHpRecoveryText','itemDataFontSize','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','push','5wVVJfW','Slots','BackRectColor','CmdIconSell','_buttonAssistWindow','TP\x20RECOVERY','paMuK','CRohX','categories','processDrawIcon','commandSell','setCategory','ydTLa','setStatusWindow','drawItemCustomEntries','onTouchCancel','_categoryNameWindow','iconHeight','511XaIwWo','Scene_Shop_commandSell','cgIjP','uWkCR','commandBuy','ZUOli','IkLyn','oOxNL','Occasion%1','DrawItemData','oxbPc','addEquipCommand','pagedown','BuyPriceJS','drawItemStyleIcon','mAFYV','12526nHFcSB','Scene_Equip_statusWindowRect','IZXBx','drawIcon','loadPicture','textSizeEx','drawItemDamageAmount','CmdStyle','getItemEffectsMpRecoveryLabel','LAprF','Scene_Shop_doSell','itemWindowRect','commandEquip','buttonAssistKey1','initialize','drawItemEffectsRemovedStatesBuffs','fillRect','shift','onMenuImageLoad','IFzNZ','getItemEffectsAddedStatesBuffsLabel','XfJjJ','TextAlign','elements','mainAreaTop','UQRQt','Window_Selectable_setHelpWindowItem','systemColor','KeyItems','drawItemEquipType','Scene_Equip_slotWindowRect','JIuAO','Text','min','drawTextEx','parameters','getItemEffectsSelfTpGainLabel','drawItemSpeed','Scene_Shop_createSellWindow','SPEED','CannotEquipMarker','tradeItemWithParty','itemLineRect','rLzFG','BGVRZ','WGoWk','isTriggered','isUseParamNamesWithIcons','Window_ItemList_maxCols','drawItemSuccessRate','addSellCommand','layWM','qEAWn','postCreateItemsEquipsCore','postCreateCategoryWindowItemsEquipsCore','getNextAvailableEtypeId','MaxItems','WpTTW','buttonAssistText1','drawItemData','isHoverEnabled','HMGph','drawItemEffects','MP\x20RECOVERY','Window_EquipCommand_initialize','constructor','Scene_ItemBase_activateItemWindow','EquipParams','\x5cI[%1]','categoryNameWindowDrawText','ScopeRandomEnemies','slotWindowRectItemsEquipsCore','makeItemData','isShiftRemoveShortcutEnabled','cancel','jaZNO','XSdOJ','mAnKO','Game_Party_gainItem','EnableLayout','Vgfti','FontFace','etypeId','hideNewLabelSprites','mainFontSize','VMUvM','AllArmors','getItemEffectsAddedStatesBuffsText','drawItemEffectsTpDamage','AjJBh','FieldUsable','setItemWindow','drawItemEffectsAddedStatesBuffs','textColor','weapon-%1','_customItemInfo','Step1Start','mpRate','New','SpeedNeg999','paramPlusItemsEquipsCoreCustomJS','DrawBackRect','Categories','UCMGB','commandStyleCheck','XgSue','prepare','ceil','LabelElement','LabelSelfGainTP','QFvbW','Scene_Shop_categoryWindowRect','resetFontSettings','reloadMapIfUpdated','placeItemNewLabel','CoreEngine','rQCpH','VjWgh','setHelpWindowItem','Game_BattlerBase_meetsItemConditions','gxeKQ','map','getItemQuantityText','addState','Scene_Shop_onBuyCancel','visible','keyItem','isArmor','XzQVZ','name','YHOHj','meetsItemConditions','helpWindowRectItemsEquipsCore','equipSlotIndex','isSceneShop','drawItemCustomEntryLine','isRepeated','BCHqG','RemoveEquipIcon','TP\x20DAMAGE','contentsBack','paramchangeTextColor','isEquipped','icon','IncludeShopItem','STdBW','SUCCESS\x20RATE','ElementNone','Consumable','Scene_Shop_buyWindowRect','ParseItemNotetags','isShiftShortcutKeyForRemove','Scene_Equip_itemWindowRect','getItemDamageElementLabel','AlwaysUsable','defaultItemMax','cursorRight','egBPD','Step1End','releaseUnequippableItems','HcojK','prepareItemCustomData','IaQul','wKczV','CXaDD','ddhDl','LabelRepeats','categoryStyle','updateMoneyAmount','getItemDamageAmountLabelOriginal','removeState','getTextColor','qMeZN','×%1','qYwej','isEquipChangeOk','buttonAssistLargeIncrement','characterName','isBuyCommandEnabled','Speed0','Fmgog','maxItems','addCancelCommand','slotWindowRect','Game_Actor_forceChangeEquip','mTuce','BattleUsable','determineBaseSellingPrice','clDSE','fontSize','buttonAssistText2','parse','canShiftRemoveEquipment','blt','wiXqM','_forcedSlots','YXfjA','index','getItemsEquipsCoreBackColor2','_money','elementId','hitIndex','drawActorParamDifference','shouldCommandWindowExist','NonRemoveETypes','activateSellWindow','sellingPrice','quunh','onSellOkItemsEquipsCore','WwFaC','MaxArmors','EFFECT_REMOVE_DEBUFF','Window_ItemList_drawItem','getMatchingInitEquip','_list','LabelDamageHP','_itemWindow','_itemData','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','QWQdL','Scene_Item_categoryWindowRect','isOpen','drawParamName','addInnerChild','LayoutStyle','nonRemovableEtypes','Scene_Equip_onActorChange','aIvHj','itemEnableJS','prepareNewEquipSlotsOnLoad','LabelDamageTP','Scene_Item_createItemWindow','Scene_Shop_sellWindowRect','isShowNew','PyVFI','msMoj','isGoodShown','processHandling','Window_ItemCategory_setItemWindow','registerCommand','categoryItemTypes','update','nextActor','VuzBU','lIbyw','REMOVED\x20EFFECTS','eyfyh','%1%','buttonAssistItemListRequirement','popScene','pcJZq','indexOf','sFhdM','aqXMd','equip2','CydmJ','rQPCk','drawItemEffectsHpRecovery','colSpacing','cursorLeft','Parse_Notetags_EquipSlots','_equips','drawUpdatedAfterParamValue','background','getItemEffectsHpRecoveryLabel','ShiftShortcutKey','isPressed','mmp','LabelConsume','isCursorMovable','VisuMZ_1_MainMenuCore','textWidth','isDualWield','helpWindowRect','ARRAYEVAL','paintOpacity','version','ydiAj','toLowerCase','flmnH','drawCustomShopGraphic','ConvertParams','adjustItemWidthByStatus','onTouchSelect','zdFcm','calcWindowHeight','isEquipCommandEnabled','BVjnD','LrLfC','ShopScene','vuGCz','innerHeight','drawItemScope','processCursorMoveModernControls','ListWindowCols','CommandAddOptimize','iconWidth','getItemEffectsMpDamageLabel','sWLYD','hUiuf','maxBattleMembers','oWMCv','mNtpz','lJmMX','uiMenuStyle','fBPma','select','Fkjxo','StjdP','IFieD','getMenuImage','HPdyq','Scene_Item_itemWindowRect','isOptimizeEquipOk','hxurp','setHandler','Game_Actor_paramPlus','mnJiY','lyVeS','createBitmap','FontColor','getItemDamageAmountLabelBattleCore','makeCommandList','_newLabelOpacity','getItemSpeedLabel','categoryWindowRect','StatusWindow','statusWindowRect','QoL','SwitchID','EFFECT_GAIN_TP','clearEquipments','AUnLU','paramId','yxPdy','bktsG','xaulw','powerDownColor','Window_ItemList_updateHelp','EGgrl','jHIHs','kgCKh','status','Window_EquipItem_isEnabled','makeDeepCopy','EquipScene','Scene_Shop_goldWindowRect','ParseArmorNotetags','successRate','\x5cI[%1]%2','Width','uUJrD','updateCommandNameWindow','GIktx','Type','A%1','Scene_Shop_onCategoryCancel','getItemRepeatsLabel','yAkOf','urFgB','hfbwc','numberWindowRectItemsEquipsCore','initEquips','damage','USER\x20TP\x20GAIN','Scene_Shop_onSellCancel','width','item','xerZW','formula','activateItemWindow','KeyItemProtect','IwulM','XBPRy','CmdIconCancel','ZzKND','drawItemStyleIconText','VisuMZ_1_BattleCore','STRUCT','isEnabled','drawItemQuantity','helpAreaHeight','hbQSQ','gainItem','categoryNameWindowDrawBackground','drawItemActorMenuImage','goldWindowRect','setObject','CmdHideDisabled','bitmap','commandWindowRectItemsEquipsCore','_tempActorB','RgobJ','translucentOpacity','ODVdo','code','isCancelled','doKrY','EplFs','commandBuyItemsEquipsCore','initNewItemsList','eOALc','DcMwQ','buttonAssistSlotWindowShift','EFFECT_RECOVER_MP','XYzdt','param','MP\x20DAMAGE','drawItemOccasion','call','155qumgBk','getItemEffectsHpDamageText','FadeSpeed','dBngi','addClearCommand','onTouchSelectModern','Window_Selectable_initialize','atypeId','AlreadyEquipMarker','smallParamFontSize','iconText','CJtkR','DjgUE','remove','_item','drawItemConsumable','loadSystem','(+%1)','gIaXb','Window_EquipStatus_refresh','ShowShopStatus','process_VisuMZ_ItemsEquipsCore_EquipSlots','includes','iconIndex','onCategoryOk','postCreateSlotWindowItemsEquipsCore','ueccI','middle','playEquip','note','Step2Start','HiddenItemA','WZqdt','YhYMl','itemPadding','onSlotCancel','isKeyItem','fboqv','dhGsh','value','sIGUG','BSesI','pop','Fmfgx','setHp','2CNuhnj','OffsetX','tpGain','478011uvgODZ','ljHdC','getItemSuccessRateLabel','CZyuE','MANUAL','iCpYc','StatusWindowWidth','iLVtS','_goods','_buyWindow','process_VisuMZ_ItemsEquipsCore_RegExp','opacity','forceResetEquipSlots','onCategoryCancelItemsEquipsCore','boxWidth','olllZ','wsNuZ','aKFly','setupItemDamageTempActors','trim','DEzUs','playOkSound','SpeedNeg1999','wfedy','getItemColor','refreshActorEquipSlotsIfUpdated','hxcpI','round','down','Scope%1','show','ParseWeaponNotetags','drawItemEffectsMpDamage','Window_ShopSell_isEnabled','weapon','TPzqQ','YTRSI','Game_BattlerBase_param','drawing','Style','maxCols','MenuPortraits','itemHasEquipLimit','DbANo','length','LabelSuccessRate','smoothSelect','IuCeU','hwxmW','buttonAssistKey3','getItemsEquipsCoreBackColor1','Scene_Shop_doBuy','getItemScopeText','STR','isSellCommandEnabled','SwitchSell','KGzIL','_resetFontSize','GTNDK','createCategoryWindow','Sthda','GTIUo','Blacklist','wEyst','mainAreaBottom','uvhCh','_resetFontColor','uUAOZ','changeBuff','iDZrJ','YWxEr','_slotId','vrqeb','sell','consumable','removeDebuff','dataId','item-%1','category','onBuyCancelItemsEquipsCore','categoryNameWindowCenter','Scene_Item_createCategoryWindow','Scene_Equip_commandEquip','isItem','numberWindowRect','updatedLayoutStyle','isHandled','UBpGN','GptsT','Speed1000','itemAt','dCjEZ','jnQxP','BorderRegExp','object','setTopRow','isNewItem','_tempActor','split','log','DrawIcons','Parse_Notetags_EnableJS','HP\x20RECOVERY','currentClass','updateCategoryNameWindow','getItemEffectsTpDamageLabel','ObzEK','fontSizeRatio','onActorChange','W%1','versionId','isHovered','%1-%2','MGnVG','VEOET','drawItemNumber','AGI','addLoadListener','UbsRw','_newItemsList','possession','mainAreaHeight','721042LiTJlc','meetsItemConditionsJS','NOSKS','description','prototype','helpAreaTop','PPWwo','getItemConsumableLabel','+%1','center','updateHelp','Translucent','Window_Selectable_update','addOptimizeCommand','addBuyCommand','drawItemEffectsHpDamage','fQnxD','equipAdjustHpMp','armor','LabelRecoverTP','Scene_Shop_numberWindowRect','NvghD','komjo','changePaintOpacity','drawUpdatedParamName','isUseModernControls','resetTextColor','getItemSuccessRateText','itemTextAlign','uiInputPosition','SeXBB','value2','prepareRefreshItemsEquipsCoreLayout','getInputButtonString','Parse_Notetags_Batch','text','modifiedBuyPriceItemsEquipsCore','createNewLabelSprite','clear','tCbRx','Param','cursorDown','getItemHitTypeText','Window_EquipItem_includes','FEJBx','value1','Parse_Notetags_Category','createCommandNameWindow','getItemEffectsTpRecoveryLabel','canEquip','match','tzsDJ','addItemCategory','isBottomHelpMode','_category','forceChangeEquip','QTRqF','wtypeId','Scene_Shop_statusWindowRect','_actor','TGlhM','MaxIcons','EFFECT_ADD_BUFF','getDamageStyle','isPageChangeRequested','ARRAYSTR','OlAzA','drawItemEffectsSelfTpGain','Scene_Equip_onSlotOk','Window_ShopCommand_initialize','MultiplierStandard','IlHyj','isUseItemsEquipsCoreUpdatedLayout','ItemQuantityFmt','Nonconsumable','Scene_Boot_onDatabaseLoaded','CqwxP','HIT\x20TYPE','floor','mainFontFace','duSCb','setNewItem','playCursorSound','Parse_Notetags_ParamJS','muwOr','Step3Start','onTouchSelectModernControls','EFFECT_RECOVER_HP','getItemEffectsTpDamageText','auto','deactivate','previousActor','processCursorHomeEndTrigger','removeBuff','REPEAT','TFJXb','atk','_slotWindow','isClicked','VgKsz','grKvd','ItemScene','gaHgm','CONSUMABLE','PdHdC','FadeLimit','101823EaNTbt','HitType%1','crgcZ','\x5cb%1\x5cb','SwitchBuy','flatHP','postCreateSellWindowItemsEquipsCore','qauPd','_newLabelOpacityChange','hideDisabledCommands','hitType','maxItemAmount','_bypassNewLabel','WfWdr','nonOptimizeEtypes','jrrVX','Scene_Equip_create','exit','isPlaytest','OvUJY','Speed1','SHXGH','JEUZx','checkShiftRemoveShortcut','ParseClassNotetags','jtZoN','onSlotOk','lAWzM','JtHaa','placeNewLabel','OCCASION','maxVisibleItems','bKhiH','FontSize','commandName','RNsfR','sOOZq','CENpC','jzCqh','_numberWindow','SellPriceRate','EquipAdjustHpMp','powerUpColor','BnNJF','isWeapon','rateMP','getItemConsumableText','wbxGm','Speed2000','fLNio','onSellCancel','speed'];function _0x5e88(_0x568458,_0x2a7207){_0x568458=_0x568458-0x1cd;let _0xd81643=_0xd816[_0x568458];return _0xd81643;}const _0x20768d=_0x5e88;(function(_0xf95a94,_0xa4cbc3){const _0x20657e=_0x5e88;while(!![]){try{const _0x449a67=-parseInt(_0x20657e(0x39a))*-parseInt(_0x20657e(0x39d))+parseInt(_0x20657e(0x481))*-parseInt(_0x20657e(0x62c))+parseInt(_0x20657e(0x628))+-parseInt(_0x20657e(0x65d))*-parseInt(_0x20657e(0x36d))+-parseInt(_0x20657e(0x1d3))*parseInt(_0x20657e(0x60f))+parseInt(_0x20657e(0x527))*-parseInt(_0x20657e(0x64b))+parseInt(_0x20657e(0x417));if(_0x449a67===_0xa4cbc3)break;else _0xf95a94['push'](_0xf95a94['shift']());}catch(_0xbd87c){_0xf95a94['push'](_0xf95a94['shift']());}}}(_0xd816,0x7eff7));var label=_0x20768d(0x54f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x20768d(0x4e5)](function(_0x111886){const _0x5e0daf=_0x20768d;return _0x111886['status']&&_0x111886[_0x5e0daf(0x41a)][_0x5e0daf(0x383)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x20768d(0x569)]||{},VisuMZ['ConvertParams']=function(_0x509840,_0x3b78f5){const _0x1d323f=_0x20768d;for(const _0x33ff8a in _0x3b78f5){if(_0x33ff8a[_0x1d323f(0x449)](/(.*):(.*)/i)){const _0x573ab8=String(RegExp['$1']),_0xec7392=String(RegExp['$2'])[_0x1d323f(0x53a)]()[_0x1d323f(0x3b0)]();let _0x58c3eb,_0x56c847,_0x27f3de;switch(_0xec7392){case'NUM':_0x58c3eb=_0x3b78f5[_0x33ff8a]!==''?Number(_0x3b78f5[_0x33ff8a]):0x0;break;case _0x1d323f(0x5b2):_0x56c847=_0x3b78f5[_0x33ff8a]!==''?JSON['parse'](_0x3b78f5[_0x33ff8a]):[],_0x58c3eb=_0x56c847[_0x1d323f(0x24c)](_0x2e77ee=>Number(_0x2e77ee));break;case _0x1d323f(0x5d4):_0x58c3eb=_0x3b78f5[_0x33ff8a]!==''?eval(_0x3b78f5[_0x33ff8a]):null;break;case _0x1d323f(0x2e5):_0x56c847=_0x3b78f5[_0x33ff8a]!==''?JSON[_0x1d323f(0x292)](_0x3b78f5[_0x33ff8a]):[],_0x58c3eb=_0x56c847[_0x1d323f(0x24c)](_0x3c16c5=>eval(_0x3c16c5));break;case _0x1d323f(0x624):_0x58c3eb=_0x3b78f5[_0x33ff8a]!==''?JSON['parse'](_0x3b78f5[_0x33ff8a]):'';break;case _0x1d323f(0x51b):_0x56c847=_0x3b78f5[_0x33ff8a]!==''?JSON[_0x1d323f(0x292)](_0x3b78f5[_0x33ff8a]):[],_0x58c3eb=_0x56c847[_0x1d323f(0x24c)](_0x55b2d6=>JSON['parse'](_0x55b2d6));break;case'FUNC':_0x58c3eb=_0x3b78f5[_0x33ff8a]!==''?new Function(JSON[_0x1d323f(0x292)](_0x3b78f5[_0x33ff8a])):new Function(_0x1d323f(0x634));break;case'ARRAYFUNC':_0x56c847=_0x3b78f5[_0x33ff8a]!==''?JSON[_0x1d323f(0x292)](_0x3b78f5[_0x33ff8a]):[],_0x58c3eb=_0x56c847[_0x1d323f(0x24c)](_0xb8ed9e=>new Function(JSON[_0x1d323f(0x292)](_0xb8ed9e)));break;case _0x1d323f(0x3d2):_0x58c3eb=_0x3b78f5[_0x33ff8a]!==''?String(_0x3b78f5[_0x33ff8a]):'';break;case _0x1d323f(0x458):_0x56c847=_0x3b78f5[_0x33ff8a]!==''?JSON[_0x1d323f(0x292)](_0x3b78f5[_0x33ff8a]):[],_0x58c3eb=_0x56c847[_0x1d323f(0x24c)](_0x591d8f=>String(_0x591d8f));break;case _0x1d323f(0x34d):_0x27f3de=_0x3b78f5[_0x33ff8a]!==''?JSON['parse'](_0x3b78f5[_0x33ff8a]):{},_0x509840[_0x573ab8]={},VisuMZ[_0x1d323f(0x2ec)](_0x509840[_0x573ab8],_0x27f3de);continue;case'ARRAYSTRUCT':_0x56c847=_0x3b78f5[_0x33ff8a]!==''?JSON[_0x1d323f(0x292)](_0x3b78f5[_0x33ff8a]):[],_0x58c3eb=_0x56c847[_0x1d323f(0x24c)](_0x35b503=>VisuMZ[_0x1d323f(0x2ec)]({},JSON[_0x1d323f(0x292)](_0x35b503)));break;default:continue;}_0x509840[_0x573ab8]=_0x58c3eb;}}return _0x509840;},(_0x14eb85=>{const _0x593203=_0x20768d,_0x3c4a93=_0x14eb85[_0x593203(0x254)];for(const _0x160aa7 of dependencies){if(!Imported[_0x160aa7]){alert(_0x593203(0x5e7)[_0x593203(0x60a)](_0x3c4a93,_0x160aa7)),SceneManager[_0x593203(0x492)]();break;}}const _0x308a21=_0x14eb85['description'];if(_0x308a21[_0x593203(0x449)](/\[Version[ ](.*?)\]/i)){if(_0x593203(0x57d)==='JtCKz'){const _0x598d9f=Number(RegExp['$1']);_0x598d9f!==VisuMZ[label][_0x593203(0x2e7)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x593203(0x60a)](_0x3c4a93,_0x598d9f)),SceneManager[_0x593203(0x492)]());}else{function _0x8af73b(){const _0x71e30a=_0x593203,_0x42ca01=new _0x222846();return _0x21b248[_0x1bb2a5]=_0x42ca01,this[_0x71e30a(0x2b2)](_0x42ca01),_0x42ca01;}}}if(_0x308a21[_0x593203(0x449)](/\[Tier[ ](\d+)\]/i)){if(_0x593203(0x660)!==_0x593203(0x660)){function _0x11bf06(){const _0x54d21c=_0x593203;if(!_0x5e9096[_0x54d21c(0x394)](_0x486843))return![];}}else{const _0x5bc04f=Number(RegExp['$1']);_0x5bc04f<tier?(alert(_0x593203(0x59a)[_0x593203(0x60a)](_0x3c4a93,_0x5bc04f,tier)),SceneManager['exit']()):tier=Math[_0x593203(0x5d7)](_0x5bc04f,tier);}}VisuMZ[_0x593203(0x2ec)](VisuMZ[label][_0x593203(0x569)],_0x14eb85[_0x593203(0x1f6)]);})(pluginData),PluginManager[_0x20768d(0x2c2)](pluginData[_0x20768d(0x254)],'ActorChangeEquipSlots',_0x2057cb=>{const _0x50ba24=_0x20768d;VisuMZ['ConvertParams'](_0x2057cb,_0x2057cb);const _0x5bdf1c=_0x2057cb['Actors'][_0x50ba24(0x24c)](_0xd4fe6e=>$gameActors[_0x50ba24(0x5de)](_0xd4fe6e)),_0x4a5bba=_0x2057cb[_0x50ba24(0x64c)]['map'](_0x2986a1=>$dataSystem['equipTypes']['indexOf'](_0x2986a1['trim']()));for(const _0x3cc8f9 of _0x5bdf1c){if(_0x50ba24(0x574)!=='QACno'){if(!_0x3cc8f9)continue;_0x3cc8f9[_0x50ba24(0x4db)](_0x4a5bba);}else{function _0x3aa0b1(){const _0x17a742=_0x50ba24,_0x4f0c17=_0x17a742(0x542);if(!this[_0x17a742(0x2ac)]['addStateBuffChanges']&&!this['_customItemInfo'][_0x4f0c17])return![];const _0x3463f6=this[_0x17a742(0x1e7)]();this[_0x17a742(0x51f)](_0x3463f6,_0x2ca8b9,_0x12682f,_0x3f38f4,!![]);const _0x352b7b=this['getItemEffectsAddedStatesBuffsText']();return this[_0x17a742(0x51f)](_0x352b7b,_0x4d4052,_0x53dc37,_0x3ff43f,![],_0x17a742(0x5c2)),this[_0x17a742(0x5ca)](_0x2af908,_0x461317,_0x2df633),this[_0x17a742(0x243)](),!![];}}}}),PluginManager[_0x20768d(0x2c2)](pluginData[_0x20768d(0x254)],_0x20768d(0x5c8),_0x31e430=>{const _0x3c810b=_0x20768d;VisuMZ[_0x3c810b(0x2ec)](_0x31e430,_0x31e430);const _0x9fc95e=_0x31e430[_0x3c810b(0x5ce)]['map'](_0x2c7f29=>$gameActors[_0x3c810b(0x5de)](_0x2c7f29));for(const _0xbfc209 of _0x9fc95e){if(!_0xbfc209)continue;_0xbfc209[_0x3c810b(0x3a9)]();}}),PluginManager[_0x20768d(0x2c2)](pluginData[_0x20768d(0x254)],_0x20768d(0x4e9),_0xed09e5=>{const _0x5acaa9=_0x20768d;VisuMZ['ConvertParams'](_0xed09e5,_0xed09e5);const _0x2056cd=[],_0x36a519=_0xed09e5[_0x5acaa9(0x3db)][_0x5acaa9(0x24c)](_0x50c638=>_0x50c638[_0x5acaa9(0x53a)]()[_0x5acaa9(0x3b0)]()),_0x5bdca2=_0xed09e5['Whitelist'][_0x5acaa9(0x24c)](_0x8e370f=>_0x8e370f[_0x5acaa9(0x53a)]()['trim']()),_0x56859a=_0xed09e5[_0x5acaa9(0x271)]>=_0xed09e5[_0x5acaa9(0x233)]?_0xed09e5[_0x5acaa9(0x233)]:_0xed09e5[_0x5acaa9(0x271)],_0xbaaea1=_0xed09e5[_0x5acaa9(0x271)]>=_0xed09e5['Step1Start']?_0xed09e5[_0x5acaa9(0x271)]:_0xed09e5[_0x5acaa9(0x233)],_0x38102f=Array(_0xbaaea1-_0x56859a+0x1)[_0x5acaa9(0x539)]()[_0x5acaa9(0x24c)]((_0x4dd994,_0x3e1582)=>_0x56859a+_0x3e1582);for(const _0x5db50b of _0x38102f){const _0x49ecd5=$dataItems[_0x5db50b];if(!_0x49ecd5)continue;if(!VisuMZ[_0x5acaa9(0x54f)][_0x5acaa9(0x263)](_0x49ecd5,_0x36a519,_0x5bdca2))continue;_0x2056cd[_0x5acaa9(0x64a)]([0x0,_0x5db50b,0x0,_0x49ecd5[_0x5acaa9(0x590)]]);}const _0x448370=_0xed09e5['Step2End']>=_0xed09e5[_0x5acaa9(0x38b)]?_0xed09e5[_0x5acaa9(0x38b)]:_0xed09e5[_0x5acaa9(0x512)],_0x1233dc=_0xed09e5[_0x5acaa9(0x512)]>=_0xed09e5[_0x5acaa9(0x38b)]?_0xed09e5['Step2End']:_0xed09e5[_0x5acaa9(0x38b)],_0x25939d=Array(_0x1233dc-_0x448370+0x1)['fill']()[_0x5acaa9(0x24c)]((_0x50442e,_0xc0a6c6)=>_0x448370+_0xc0a6c6);for(const _0x328713 of _0x25939d){const _0x2b73a4=$dataWeapons[_0x328713];if(!_0x2b73a4)continue;if(!VisuMZ[_0x5acaa9(0x54f)]['IncludeShopItem'](_0x2b73a4,_0x36a519,_0x5bdca2))continue;_0x2056cd[_0x5acaa9(0x64a)]([0x1,_0x328713,0x0,_0x2b73a4[_0x5acaa9(0x590)]]);}const _0x15755b=_0xed09e5[_0x5acaa9(0x5ec)]>=_0xed09e5[_0x5acaa9(0x46c)]?_0xed09e5[_0x5acaa9(0x46c)]:_0xed09e5[_0x5acaa9(0x5ec)],_0x30a3a6=_0xed09e5[_0x5acaa9(0x5ec)]>=_0xed09e5['Step3Start']?_0xed09e5['Step3End']:_0xed09e5[_0x5acaa9(0x46c)],_0x1c1fbe=Array(_0x30a3a6-_0x15755b+0x1)['fill']()['map']((_0x33474f,_0x1f3503)=>_0x15755b+_0x1f3503);for(const _0x27c9ad of _0x1c1fbe){if('WIFEg'===_0x5acaa9(0x21e)){function _0x298c64(){const _0x499e48=_0x5acaa9;this[_0x499e48(0x473)]();}}else{const _0x3ee97b=$dataArmors[_0x27c9ad];if(!_0x3ee97b)continue;if(!VisuMZ[_0x5acaa9(0x54f)][_0x5acaa9(0x263)](_0x3ee97b,_0x36a519,_0x5bdca2))continue;_0x2056cd[_0x5acaa9(0x64a)]([0x2,_0x27c9ad,0x0,_0x3ee97b[_0x5acaa9(0x590)]]);}}SceneManager[_0x5acaa9(0x64a)](Scene_Shop),SceneManager[_0x5acaa9(0x4e0)](_0x2056cd,_0xed09e5[_0x5acaa9(0x4c0)]);}),VisuMZ[_0x20768d(0x54f)]['IncludeShopItem']=function(_0x1f9151,_0xfc91c4,_0x1fdd5b){const _0x427867=_0x20768d;if(_0x1f9151[_0x427867(0x254)]['trim']()==='')return![];if(_0x1f9151[_0x427867(0x254)][_0x427867(0x449)](/-----/i))return![];const _0xb4a093=_0x1f9151[_0x427867(0x653)];if(_0xfc91c4[_0x427867(0x3c9)]>0x0)for(const _0x40c881 of _0xfc91c4){if('bKhiH'===_0x427867(0x4a1)){if(!_0x40c881)continue;if(_0xb4a093[_0x427867(0x383)](_0x40c881))return![];}else{function _0x4ca142(){const _0xfd454e=_0x427867;return _0x3e99bb['ItemsEquipsCore'][_0xfd454e(0x569)][_0xfd454e(0x239)]['Style'];}}}if(_0x1fdd5b['length']>0x0){for(const _0x14bd82 of _0x1fdd5b){if(_0x427867(0x5e3)!==_0x427867(0x5e3)){function _0x26ffec(){const _0x421561=_0x427867,_0x5b7e2c=_0x204dab[_0x421561(0x54f)][_0x421561(0x569)][_0x421561(0x319)],_0x319943=_0x421561(0x507)['format'](this[_0x421561(0x37b)][_0x421561(0x33e)][_0x421561(0x5be)]),_0x2243e1=[null,_0x5b3aa7['hp'],_0x558535['mp'],_0x2f3a69['hp'],_0x3b5463['mp'],_0x2eda9f['hp'],_0x10c7f1['mp']][this[_0x421561(0x37b)][_0x421561(0x33e)][_0x421561(0x5be)]];return _0x5b7e2c[_0x319943][_0x421561(0x60a)](_0x2243e1);}}else{if(!_0x14bd82)continue;if(_0xb4a093['includes'](_0x14bd82))return!![];}}return![];}return!![];},VisuMZ[_0x20768d(0x54f)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x20768d(0x41b)]['onDatabaseLoaded'],Scene_Boot[_0x20768d(0x41b)]['onDatabaseLoaded']=function(){const _0x476443=_0x20768d;this[_0x476443(0x3a7)](),VisuMZ[_0x476443(0x54f)]['Scene_Boot_onDatabaseLoaded'][_0x476443(0x36c)](this),this['process_VisuMZ_ItemsEquipsCore_Notetags']();},Scene_Boot[_0x20768d(0x41b)]['process_VisuMZ_ItemsEquipsCore_RegExp']=function(){const _0x415f46=_0x20768d;VisuMZ[_0x415f46(0x54f)][_0x415f46(0x575)]={},VisuMZ['ItemsEquipsCore'][_0x415f46(0x575)][_0x415f46(0x216)]=[],VisuMZ[_0x415f46(0x54f)][_0x415f46(0x575)][_0x415f46(0x3fa)]=[];const _0xcb0f8a=[_0x415f46(0x638),'MaxMP','ATK',_0x415f46(0x615),_0x415f46(0x4dc),_0x415f46(0x501),_0x415f46(0x411),_0x415f46(0x55e)];for(const _0x11988d of _0xcb0f8a){const _0x57da6c='<%1:[\x20]([\x5c+\x5c-]\x5cd+)>'[_0x415f46(0x60a)](_0x11988d);VisuMZ[_0x415f46(0x54f)][_0x415f46(0x575)][_0x415f46(0x216)][_0x415f46(0x64a)](new RegExp(_0x57da6c,'i'));const _0x50d668=_0x415f46(0x484)['format'](_0x11988d);VisuMZ[_0x415f46(0x54f)][_0x415f46(0x575)][_0x415f46(0x3fa)][_0x415f46(0x64a)](new RegExp(_0x50d668,'g'));}},Scene_Boot[_0x20768d(0x41b)][_0x20768d(0x602)]=function(){const _0x58716c=_0x20768d;if(VisuMZ[_0x58716c(0x62e)])return;this[_0x58716c(0x382)]();const _0x582bcf=[$dataItems,$dataWeapons,$dataArmors];for(const _0x25107d of _0x582bcf){if(_0x58716c(0x46b)==='JvHPZ'){function _0x5280e1(){const _0x54800b=_0x58716c;if(_0x18751d[_0x54800b(0x391)](_0x180c61))return _0x5bdf4d[_0x54800b(0x57c)];return!![];}}else for(const _0x2e5566 of _0x25107d){if(!_0x2e5566)continue;VisuMZ['ItemsEquipsCore'][_0x58716c(0x445)](_0x2e5566,_0x25107d),VisuMZ['ItemsEquipsCore'][_0x58716c(0x63a)](_0x2e5566,_0x25107d),VisuMZ[_0x58716c(0x54f)]['Parse_Notetags_ParamValues'](_0x2e5566,_0x25107d),VisuMZ[_0x58716c(0x54f)][_0x58716c(0x46a)](_0x2e5566,_0x25107d),VisuMZ[_0x58716c(0x54f)][_0x58716c(0x402)](_0x2e5566,_0x25107d);}}},Scene_Boot[_0x20768d(0x41b)][_0x20768d(0x382)]=function(){const _0x4c3536=_0x20768d;for(const _0x31454a of $dataClasses){if(_0x4c3536(0x370)!==_0x4c3536(0x370)){function _0x4c59ea(){const _0x2d545b=_0x4c3536,_0x45d66b=this['itemLineRect'](_0x2924c1),_0x1b14fb=this['textSizeEx'](_0x24951d)['width'];return _0x1b14fb<=_0x45d66b[_0x2d545b(0x341)]?'iconText':_0x2d545b(0x262);}}else{if(!_0x31454a)continue;VisuMZ[_0x4c3536(0x54f)][_0x4c3536(0x2d7)](_0x31454a);}}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x499)]=VisuMZ[_0x20768d(0x499)],VisuMZ[_0x20768d(0x499)]=function(_0x21221d){const _0x2427e2=_0x20768d;VisuMZ[_0x2427e2(0x54f)][_0x2427e2(0x499)][_0x2427e2(0x36c)](this,_0x21221d),VisuMZ[_0x2427e2(0x54f)]['Parse_Notetags_EquipSlots'](_0x21221d);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x269)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x20768d(0x269)]=function(_0x2ad4fe){const _0x1cae2b=_0x20768d;VisuMZ[_0x1cae2b(0x54f)]['ParseItemNotetags'][_0x1cae2b(0x36c)](this,_0x2ad4fe),VisuMZ[_0x1cae2b(0x54f)][_0x1cae2b(0x439)](_0x2ad4fe,$dataItems);},VisuMZ['ItemsEquipsCore'][_0x20768d(0x3bc)]=VisuMZ[_0x20768d(0x3bc)],VisuMZ[_0x20768d(0x3bc)]=function(_0x2f6e88){const _0x37e6fa=_0x20768d;VisuMZ[_0x37e6fa(0x54f)]['ParseWeaponNotetags'][_0x37e6fa(0x36c)](this,_0x2f6e88),VisuMZ[_0x37e6fa(0x54f)][_0x37e6fa(0x439)](_0x2f6e88,$dataWeapons);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x32e)]=VisuMZ['ParseArmorNotetags'],VisuMZ[_0x20768d(0x32e)]=function(_0x3ffa0e){const _0x5df0fe=_0x20768d;VisuMZ[_0x5df0fe(0x54f)]['ParseArmorNotetags'][_0x5df0fe(0x36c)](this,_0x3ffa0e),VisuMZ['ItemsEquipsCore'][_0x5df0fe(0x439)](_0x3ffa0e,$dataArmors);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x2d7)]=function(_0x153f52){const _0x2f313a=_0x20768d;_0x153f52[_0x2f313a(0x5fe)]=[];if(!BattleManager[_0x2f313a(0x63e)]()&&_0x153f52[_0x2f313a(0x38a)]['match'](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){if(_0x2f313a(0x5b9)===_0x2f313a(0x5b9)){const _0x3051e8=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x3677e3 of _0x3051e8){if(_0x2f313a(0x334)!==_0x2f313a(0x62a)){const _0x24151a=$dataSystem[_0x2f313a(0x4bb)]['indexOf'](_0x3677e3[_0x2f313a(0x3b0)]());if(_0x24151a>0x0)_0x153f52[_0x2f313a(0x5fe)][_0x2f313a(0x64a)](_0x24151a);}else{function _0x2d4ee6(){const _0x1d302e=_0x2f313a,_0x589276=_0xcdbc78[_0x50d157];_0x589276[_0x1d302e(0x225)]===_0x34c071+0x1&&_0x2ebfe7[_0x1d302e(0x64a)](_0x589276);}}}}else{function _0x1fdcda(){const _0x13d308=_0x2f313a;return _0x3725be[_0x13d308(0x5d7)](0x1,_0x2865f7[_0x13d308(0x227)]()-0x4);}}}else for(const _0x375cae of $dataSystem['equipTypes']){if('pdQnx'!==_0x2f313a(0x513)){const _0x3e8c16=$dataSystem[_0x2f313a(0x4bb)][_0x2f313a(0x2ce)](_0x375cae[_0x2f313a(0x3b0)]());if(_0x3e8c16>0x0)_0x153f52[_0x2f313a(0x5fe)]['push'](_0x3e8c16);}else{function _0x2fdf06(){const _0x238470=_0x2f313a,_0x242877=_0x238470(0x36a);if(this[_0x238470(0x232)][_0x242877])return this['_customItemInfo'][_0x242877];let _0x4d2876='';if(this[_0x238470(0x2ac)][_0x238470(0x4ae)]<0x0)_0x4d2876+=_0x238470(0x2ca)[_0x238470(0x60a)](_0x23e815[_0x238470(0x465)](this[_0x238470(0x2ac)][_0x238470(0x4ae)]*0x64));if(this[_0x238470(0x2ac)][_0x238470(0x4ae)]<0x0&&this[_0x238470(0x2ac)][_0x238470(0x589)]<0x0)_0x4d2876+='\x20';if(this[_0x238470(0x2ac)][_0x238470(0x589)]<0x0)_0x4d2876+='%1'[_0x238470(0x60a)](this[_0x238470(0x2ac)][_0x238470(0x589)]);return _0x4d2876;}}}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x439)]=function(_0x9babe5,_0x23a3dd){const _0x5b8062=_0x20768d;VisuMZ[_0x5b8062(0x54f)][_0x5b8062(0x445)](_0x9babe5,_0x23a3dd),VisuMZ[_0x5b8062(0x54f)][_0x5b8062(0x63a)](_0x9babe5,_0x23a3dd),VisuMZ[_0x5b8062(0x54f)][_0x5b8062(0x4f8)](_0x9babe5,_0x23a3dd),VisuMZ['ItemsEquipsCore'][_0x5b8062(0x46a)](_0x9babe5,_0x23a3dd),VisuMZ[_0x5b8062(0x54f)][_0x5b8062(0x402)](_0x9babe5,_0x23a3dd);},VisuMZ[_0x20768d(0x54f)]['Parse_Notetags_Category']=function(_0x43613e,_0x24b6a6){const _0x3b2d17=_0x20768d;_0x43613e[_0x3b2d17(0x653)]=[];const _0x169311=_0x43613e[_0x3b2d17(0x38a)],_0x4ece66=_0x169311[_0x3b2d17(0x449)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x4ece66)for(const _0x5c3fcf of _0x4ece66){_0x5c3fcf[_0x3b2d17(0x449)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x37ad24=String(RegExp['$1'])[_0x3b2d17(0x53a)]()[_0x3b2d17(0x3b0)]()[_0x3b2d17(0x3ff)](',');for(const _0x2050fc of _0x37ad24){_0x43613e[_0x3b2d17(0x653)]['push'](_0x2050fc[_0x3b2d17(0x3b0)]());}}if(_0x169311['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x2e23c9=RegExp['$1'][_0x3b2d17(0x3ff)](/[\r\n]+/);for(const _0x1b8dce of _0x2e23c9){if(_0x3b2d17(0x302)==='nQNaV'){function _0x1ebc21(){const _0x44bc43=_0x3b2d17;if(this[_0x44bc43(0x5b6)](_0xa90070)){this[_0x44bc43(0x243)]();const _0x584fed=_0x506f49[_0x44bc43(0x54f)][_0x44bc43(0x569)]['ItemScene'],_0x1998a0=_0x584fed[_0x44bc43(0x460)],_0x81142b=_0x1998a0['format'](_0x4b346a[_0x44bc43(0x50d)](_0x8b44f0));this[_0x44bc43(0x553)][_0x44bc43(0x290)]=_0x584fed['ItemQuantityFontSize'],this[_0x44bc43(0x4c1)](_0x81142b,_0xdcbb0,_0x2f0fba,_0x307ac4,_0x44bc43(0x5c2)),this[_0x44bc43(0x243)]();}}}else _0x43613e[_0x3b2d17(0x653)][_0x3b2d17(0x64a)](_0x1b8dce[_0x3b2d17(0x53a)]()[_0x3b2d17(0x3b0)]());}}},VisuMZ['ItemsEquipsCore'][_0x20768d(0x63a)]=function(_0x15a580,_0x33b0a4){const _0x3f55a4=_0x20768d;if(_0x15a580[_0x3f55a4(0x38a)]['match'](/<PRICE:[ ](\d+)>/i)){if(_0x3f55a4(0x396)!==_0x3f55a4(0x396)){function _0x3a9501(){const _0x271661=_0x3f55a4;_0x5003b3[_0x271661(0x54f)][_0x271661(0x569)][_0x271661(0x32c)][_0x271661(0x4eb)][_0x271661(0x36c)](this),this[_0x271661(0x50c)]();}}else _0x15a580[_0x3f55a4(0x590)]=Number(RegExp['$1']);}},VisuMZ['ItemsEquipsCore'][_0x20768d(0x4f8)]=function(_0x3c7ae8,_0x48ba5d){const _0x56e152=_0x20768d;if(_0x48ba5d===$dataItems)return;for(let _0x4d47fc=0x0;_0x4d47fc<0x8;_0x4d47fc++){const _0x8fa798=VisuMZ['ItemsEquipsCore'][_0x56e152(0x575)][_0x56e152(0x216)][_0x4d47fc];_0x3c7ae8[_0x56e152(0x38a)][_0x56e152(0x449)](_0x8fa798)&&(_0x3c7ae8[_0x56e152(0x5fc)][_0x4d47fc]=parseInt(RegExp['$1']));}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x4f1)]={},VisuMZ['ItemsEquipsCore'][_0x20768d(0x46a)]=function(_0xadb60c,_0x564871){const _0x2914bf=_0x20768d;if(_0x564871===$dataItems)return;if(_0xadb60c['note'][_0x2914bf(0x449)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if(_0x2914bf(0x4a6)!=='CENpC'){function _0x480a31(){const _0x187610=_0x2914bf;_0xa5b513[_0x187610(0x25b)](_0x187610(0x1cf))&&!_0x10bf55[_0x187610(0x2dd)](_0x187610(0x1e4))&&this[_0x187610(0x26f)](_0x334d00[_0x187610(0x201)](_0x187610(0x1cf))),_0x179e7c['isRepeated'](_0x187610(0x595))&&!_0x39d196[_0x187610(0x2dd)]('shift')&&this[_0x187610(0x2d6)](_0x493bf1[_0x187610(0x201)](_0x187610(0x595)));}}else{const _0x4f8aed=String(RegExp['$1']),_0x1ba718=(_0x564871===$dataWeapons?_0x2914bf(0x40a):_0x2914bf(0x336))[_0x2914bf(0x60a)](_0xadb60c['id']),_0x5c3af1=_0x2914bf(0x2ad)[_0x2914bf(0x60a)](_0x4f8aed);for(let _0x439fef=0x0;_0x439fef<0x8;_0x439fef++){if(_0x4f8aed[_0x2914bf(0x449)](VisuMZ[_0x2914bf(0x54f)][_0x2914bf(0x575)]['BorderRegExp'][_0x439fef])){const _0x541341=_0x2914bf(0x40d)[_0x2914bf(0x60a)](_0x1ba718,_0x439fef);VisuMZ[_0x2914bf(0x54f)][_0x2914bf(0x4f1)][_0x541341]=new Function('item',_0x2914bf(0x320),_0x5c3af1);}}}}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x2b7)]={},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x402)]=function(_0x314948,_0x26ef19){const _0xe69ec8=_0x20768d;if(_0x26ef19!==$dataItems)return;if(_0x314948[_0xe69ec8(0x38a)][_0xe69ec8(0x449)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){const _0x502e8b=String(RegExp['$1']),_0x540585=_0xe69ec8(0x649)['format'](_0x502e8b);VisuMZ[_0xe69ec8(0x54f)][_0xe69ec8(0x2b7)][_0x314948['id']]=new Function('item',_0x540585);}},DataManager[_0x20768d(0x391)]=function(_0x391c5e){const _0x3ccc4a=_0x20768d;return this[_0x3ccc4a(0x3f0)](_0x391c5e)&&_0x391c5e[_0x3ccc4a(0x585)]===0x2;},DataManager[_0x20768d(0x48c)]=function(_0x4058af){const _0x3e2390=_0x20768d;if(!_0x4058af)return 0x63;else{if(_0x4058af['note']['match'](/<MAX:[ ](\d+)>/i)){if(_0x3e2390(0x5f3)==='hHAPa')return parseInt(RegExp['$1']);else{function _0x1548ec(){const _0x50e7bc=_0x3e2390;for(const _0x6bffdf of _0x27dbc9[_0x50e7bc(0x5c1)](this['_newLabelSprites'])){_0x6bffdf[_0x50e7bc(0x4b7)]();}}}}else return this[_0x3e2390(0x26e)](_0x4058af);}},DataManager[_0x20768d(0x26e)]=function(_0x966fae){const _0x3128b2=_0x20768d;if(this[_0x3128b2(0x3f0)](_0x966fae))return VisuMZ[_0x3128b2(0x54f)][_0x3128b2(0x569)][_0x3128b2(0x47c)][_0x3128b2(0x20b)];else{if(this['isWeapon'](_0x966fae)){if(_0x3128b2(0x365)!==_0x3128b2(0x4a5))return VisuMZ['ItemsEquipsCore'][_0x3128b2(0x569)][_0x3128b2(0x47c)]['MaxWeapons'];else{function _0x124dee(){const _0x32923a=_0x3128b2;if(_0x41e712[_0x32923a(0x394)](_0x1d9f1))return![];}}}else{if(this[_0x3128b2(0x252)](_0x966fae))return VisuMZ[_0x3128b2(0x54f)]['Settings'][_0x3128b2(0x47c)][_0x3128b2(0x2a5)];}}},ColorManager['getItemColor']=function(_0x21e76b){const _0x2f23fa=_0x20768d;if(!_0x21e76b){if(_0x2f23fa(0x5cf)===_0x2f23fa(0x5cf))return this['normalColor']();else{function _0x43b466(){const _0x331053=_0x2f23fa,_0x187af5=this[_0x331053(0x65b)];_0x187af5[_0x331053(0x553)]['clear']();const _0x10ab00=this[_0x331053(0x60b)](this[_0x331053(0x298)]());if(_0x10ab00==='icon'){const _0x2cabe5=this['itemLineRect'](this[_0x331053(0x298)]());let _0x18d727=this[_0x331053(0x4a3)](this[_0x331053(0x298)]());_0x18d727=_0x18d727[_0x331053(0x5e5)](/\\I\[(\d+)\]/gi,''),_0x187af5['resetFontSettings'](),this['categoryNameWindowDrawBackground'](_0x18d727,_0x2cabe5),this[_0x331053(0x218)](_0x18d727,_0x2cabe5),this[_0x331053(0x3ed)](_0x18d727,_0x2cabe5);}}}}else{if(_0x21e76b[_0x2f23fa(0x38a)][_0x2f23fa(0x449)](/<COLOR:[ ](\d+)>/i))return this[_0x2f23fa(0x230)](Number(RegExp['$1'])[_0x2f23fa(0x560)](0x0,0x1f));else return _0x21e76b[_0x2f23fa(0x38a)]['match'](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this['normalColor']();}},ColorManager[_0x20768d(0x5a0)]=function(_0x180cb3){const _0xfcf110=_0x20768d;return _0x180cb3=String(_0x180cb3),_0x180cb3['match'](/#(.*)/i)?_0xfcf110(0x51a)[_0xfcf110(0x60a)](String(RegExp['$1'])):this[_0xfcf110(0x230)](Number(_0x180cb3));},SceneManager['isSceneShop']=function(){const _0x1eaa72=_0x20768d;return this[_0x1eaa72(0x5a1)]&&this[_0x1eaa72(0x5a1)]['constructor']===Scene_Shop;},Game_Temp[_0x20768d(0x41b)][_0x20768d(0x54b)]=function(){const _0x4fe6c0=_0x20768d;if(this[_0x4fe6c0(0x48d)])return![];return VisuMZ[_0x4fe6c0(0x54f)][_0x4fe6c0(0x569)][_0x4fe6c0(0x235)][_0x4fe6c0(0x561)];},VisuMZ[_0x20768d(0x56b)]=VisuMZ['ItemsEquipsCore'][_0x20768d(0x569)]['StatusWindow'][_0x20768d(0x45d)],VisuMZ['ItemsEquipsCore']['Game_BattlerBase_param']=Game_BattlerBase[_0x20768d(0x41b)][_0x20768d(0x369)],Game_BattlerBase['prototype'][_0x20768d(0x369)]=function(_0x438ad1){const _0x14a692=_0x20768d;if(this[_0x14a692(0x4ee)])return this['_shopStatusMenuAlly']?VisuMZ[_0x14a692(0x56b)]:0x1;else{if(_0x14a692(0x42c)===_0x14a692(0x1e8)){function _0x2079ec(){const _0x30069c=_0x14a692;this[_0x30069c(0x1f5)](_0x1172a6,_0x1d51a1['x']+_0x3f3a40[_0x30069c(0x341)]-_0x46f932,_0x50aea1['y'],_0x5b55df);}}else return VisuMZ[_0x14a692(0x54f)][_0x14a692(0x3c2)][_0x14a692(0x36c)](this,_0x438ad1);}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x24a)]=Game_BattlerBase[_0x20768d(0x41b)][_0x20768d(0x256)],Game_BattlerBase[_0x20768d(0x41b)][_0x20768d(0x256)]=function(_0x26db23){const _0x279fe9=_0x20768d;if(!_0x26db23)return![];if(!VisuMZ[_0x279fe9(0x54f)][_0x279fe9(0x24a)]['call'](this,_0x26db23))return![];if(!this[_0x279fe9(0x4fc)](_0x26db23))return![];if(!this[_0x279fe9(0x418)](_0x26db23))return![];return!![];},Game_BattlerBase[_0x20768d(0x41b)][_0x20768d(0x4fc)]=function(_0x100960){const _0x59d50c=_0x20768d;if(!this[_0x59d50c(0x5e8)](_0x100960))return![];return!![];},Game_BattlerBase[_0x20768d(0x41b)]['checkItemConditionsSwitchNotetags']=function(_0x39c0c4){const _0x16b7d0=_0x20768d,_0x317482=_0x39c0c4[_0x16b7d0(0x38a)];if(_0x317482[_0x16b7d0(0x449)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x55c64f=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x39c76f of _0x55c64f){if(!$gameSwitches[_0x16b7d0(0x394)](_0x39c76f))return![];}return!![];}if(_0x317482[_0x16b7d0(0x449)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('grKvd'===_0x16b7d0(0x47b)){const _0x3d6e64=JSON[_0x16b7d0(0x292)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3c22fb of _0x3d6e64){if('xUsqQ'===_0x16b7d0(0x308)){function _0x4db060(){const _0x2f7bdd=_0x16b7d0;this[_0x2f7bdd(0x2a3)]();}}else{if(!$gameSwitches['value'](_0x3c22fb))return![];}}return!![];}else{function _0xc59452(){const _0x19a4ad=_0x16b7d0;_0x2ac06a+=0x1;if(_0x552166['note'][_0x19a4ad(0x449)](_0x19fb5d)){const _0x720144=_0x18cad3(_0x4dc696['$1'])||0x1;if(_0x240830>=_0x720144)return!![];}if(_0x39cb6b[_0x19a4ad(0x38a)]['match'](_0x311005)){const _0x3acb1b=_0x32f7e2(_0x51f121['$1'])||0x1;if(_0x32983c>=_0x3acb1b)return!![];}}}}if(_0x317482[_0x16b7d0(0x449)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x16b7d0(0x3de)===_0x16b7d0(0x276)){function _0x9995a3(){const _0x2c91c7=_0x16b7d0;_0x39258f[_0x2c91c7(0x54f)][_0x2c91c7(0x491)][_0x2c91c7(0x36c)](this),this[_0x2c91c7(0x430)]()&&this[_0x2c91c7(0x1df)]();}}else{const _0x42e21a=JSON['parse']('['+RegExp['$1'][_0x16b7d0(0x449)](/\d+/g)+']');for(const _0x371b92 of _0x42e21a){if($gameSwitches[_0x16b7d0(0x394)](_0x371b92))return!![];}return![];}}if(_0x317482[_0x16b7d0(0x449)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x16b7d0(0x573)===_0x16b7d0(0x573)){const _0x4b7319=JSON[_0x16b7d0(0x292)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x13a615 of _0x4b7319){if('qEAWn'!==_0x16b7d0(0x207)){function _0x275bfd(){const _0x52231a=_0x16b7d0;_0x4397b7===this[_0x52231a(0x298)]()&&(this[_0x52231a(0x62d)]=!![]),this[_0x52231a(0x4c6)](),this['select'](_0x1482ba);}}else{if(!$gameSwitches[_0x16b7d0(0x394)](_0x13a615))return!![];}}return![];}else{function _0x2fe80e(){const _0x351671=_0x16b7d0,_0x574c7b=_0x587032['armorTypes']['indexOf'](_0x3c1d15(_0x5c1846['$1'])[_0x351671(0x3b0)]());return _0x4f2e40[_0x351671(0x252)](_0x160c99)&&_0x2e9a8a[_0x351671(0x374)]===_0x574c7b;}}}if(_0x317482[_0x16b7d0(0x449)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5193d6=JSON[_0x16b7d0(0x292)]('['+RegExp['$1'][_0x16b7d0(0x449)](/\d+/g)+']');for(const _0x3f44b3 of _0x5193d6){if(!$gameSwitches[_0x16b7d0(0x394)](_0x3f44b3))return!![];}return![];}if(_0x317482[_0x16b7d0(0x449)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1061f3=JSON[_0x16b7d0(0x292)]('['+RegExp['$1'][_0x16b7d0(0x449)](/\d+/g)+']');for(const _0x25db95 of _0x1061f3){if(_0x16b7d0(0x223)!==_0x16b7d0(0x281)){if($gameSwitches['value'](_0x25db95))return![];}else{function _0x407d87(){const _0x4dae9b=_0x16b7d0;_0x37c551[_0x4dae9b(0x41b)][_0x4dae9b(0x4f0)][_0x4dae9b(0x36c)](this);}}}return!![];}return!![];},Game_BattlerBase['prototype']['meetsItemConditionsJS']=function(_0x2bef6f){const _0x452ae8=_0x20768d,_0x5d98cc=_0x2bef6f[_0x452ae8(0x38a)],_0xdb8062=VisuMZ[_0x452ae8(0x54f)][_0x452ae8(0x2b7)];return _0xdb8062[_0x2bef6f['id']]?_0xdb8062[_0x2bef6f['id']]['call'](this,_0x2bef6f):!![];},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x33d)]=function(_0x2df435){const _0x5a46e2=_0x20768d;_0x2df435=this[_0x5a46e2(0x587)](_0x2df435);const _0x4e3249=this[_0x5a46e2(0x5fe)]();this[_0x5a46e2(0x2d8)]=[];for(let _0x8c08b7=0x0;_0x8c08b7<_0x4e3249['length'];_0x8c08b7++){this[_0x5a46e2(0x2d8)][_0x8c08b7]=new Game_Item();}for(let _0x494fde=0x0;_0x494fde<_0x4e3249[_0x5a46e2(0x3c9)];_0x494fde++){const _0xf90038=_0x4e3249[_0x494fde],_0x54e316=this[_0x5a46e2(0x2a8)](_0x2df435,_0xf90038);if(this[_0x5a46e2(0x448)](_0x54e316))this['_equips'][_0x494fde][_0x5a46e2(0x356)](_0x54e316);}this[_0x5a46e2(0x272)](!![]),this[_0x5a46e2(0x53c)]();},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x587)]=function(_0x415360){const _0x53fca6=_0x20768d,_0x139a94=[];for(let _0x42d468=0x0;_0x42d468<_0x415360[_0x53fca6(0x3c9)];_0x42d468++){if(_0x53fca6(0x339)===_0x53fca6(0x339)){const _0xac3740=_0x415360[_0x42d468];if(_0xac3740<=0x0)continue;const _0x519848=$dataSystem[_0x53fca6(0x4bb)][_0x42d468+0x1];if(_0x519848===$dataSystem['equipTypes'][0x1]||_0x42d468===0x1&&this[_0x53fca6(0x2e3)]()){if(_0x53fca6(0x3b7)!==_0x53fca6(0x2f2))_0x139a94[_0x53fca6(0x64a)]($dataWeapons[_0xac3740]);else{function _0x3a6038(){const _0xe5461c=_0x53fca6;this['isUseModernControls']()?this[_0xe5461c(0x372)](!![]):_0x2a0ace['prototype'][_0xe5461c(0x2ee)][_0xe5461c(0x36c)](this,_0x25c6a7);}}}else{if(BattleManager[_0x53fca6(0x63e)]()){if(_0x53fca6(0x3cc)!==_0x53fca6(0x241)){const _0xa51a9e=$dataArmors[_0xac3740];_0xa51a9e['etypeId']===_0x42d468+0x1&&_0x139a94['push'](_0xa51a9e);}else{function _0x522e86(){const _0x21b553=_0x53fca6;this[_0x21b553(0x440)](_0x5530ac['isTriggered'](_0x21b553(0x3b9)));}}}else _0x139a94['push']($dataArmors[_0xac3740]);}}else{function _0x5e6d8d(){const _0x943990=_0x53fca6;return'%1%'[_0x943990(0x60a)](_0x15cdf9(_0x5b7bfc['$1']));}}}return _0x139a94;},Game_Actor[_0x20768d(0x41b)]['getMatchingInitEquip']=function(_0x26ec4e,_0x22b97c){const _0x22c1a6=_0x20768d;for(const _0x5ed432 of _0x26ec4e){if(_0x22c1a6(0x419)!=='NOSKS'){function _0x5779c2(){const _0x2439a0=_0x22c1a6;this[_0x2439a0(0x362)]();}}else{if(!_0x5ed432)continue;if(_0x5ed432[_0x22c1a6(0x225)]===_0x22b97c)return _0x26ec4e[_0x22c1a6(0x50f)](_0x26ec4e[_0x22c1a6(0x2ce)](_0x5ed432),0x1),_0x5ed432;}}return null;},Game_Actor['prototype']['equipSlots']=function(){const _0x3acbdc=_0x20768d,_0x24ba7a=JsonEx[_0x3acbdc(0x32b)](this['_forcedSlots']||this[_0x3acbdc(0x404)]()['equipSlots']);if(_0x24ba7a['length']>=0x2&&this[_0x3acbdc(0x2e3)]())_0x24ba7a[0x1]=0x1;return _0x24ba7a;},Game_Actor[_0x20768d(0x41b)]['forceChangeEquipSlots']=function(_0x1cc8e9){const _0x58a9f8=_0x20768d;_0x1cc8e9[_0x58a9f8(0x37a)](0x0),_0x1cc8e9[_0x58a9f8(0x37a)](-0x1),this[_0x58a9f8(0x296)]=_0x1cc8e9,this['refresh'](),this[_0x58a9f8(0x4b5)]();},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x3a9)]=function(){const _0x5bd69b=_0x20768d;this['_forcedSlots']=undefined,this[_0x5bd69b(0x53c)](),this[_0x5bd69b(0x4b5)]();},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x4b5)]=function(){const _0x2edb14=_0x20768d;let _0xd45a58=this[_0x2edb14(0x5fe)]()[_0x2edb14(0x3c9)];while(this[_0x2edb14(0x2d8)][_0x2edb14(0x3c9)]>_0xd45a58){const _0x4109bc=this[_0x2edb14(0x2d8)][this[_0x2edb14(0x2d8)][_0x2edb14(0x3c9)]-0x1];_0x4109bc&&_0x4109bc['object']()&&$gameParty[_0x2edb14(0x352)](_0x4109bc[_0x2edb14(0x3fb)](),0x1),this['_equips'][_0x2edb14(0x397)]();}while(_0xd45a58>this['_equips']['length']){this[_0x2edb14(0x2d8)][_0x2edb14(0x64a)](new Game_Item());}},Game_Actor['prototype'][_0x20768d(0x2b8)]=function(){const _0x25360e=_0x20768d,_0x30da5d=this[_0x25360e(0x5fe)]();for(let _0x39246b=0x0;_0x39246b<_0x30da5d[_0x25360e(0x3c9)];_0x39246b++){if(_0x25360e(0x2cf)!==_0x25360e(0x2cf)){function _0x4a962a(){const _0x4006e3=_0x25360e;this[_0x4006e3(0x5eb)]=0x0;for(const _0x361692 of this[_0x4006e3(0x3a5)]){this[_0x4006e3(0x2bf)](_0x361692)?this[_0x4006e3(0x5eb)]++:_0x361692[0x0]=-0x1;}}}else{if(!this['_equips'][_0x39246b])this[_0x25360e(0x2d8)][_0x39246b]=new Game_Item();}}this[_0x25360e(0x272)](![]),this[_0x25360e(0x53c)]();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x526)]=Game_Actor[_0x20768d(0x41b)]['changeEquip'],Game_Actor[_0x20768d(0x41b)][_0x20768d(0x53b)]=function(_0x519af0,_0x1e9e19){const _0x420e51=_0x20768d;if(!this[_0x420e51(0x3fe)]){if('XgSue'!==_0x420e51(0x23c)){function _0x273dce(){const _0x4b578b=_0x420e51;if(_0x5f4d56['match'](_0x2d9c6b[_0x4b578b(0x54f)][_0x4b578b(0x575)][_0x4b578b(0x3fa)][_0x599867])){const _0x2ca242=_0x4b578b(0x40d)[_0x4b578b(0x60a)](_0x3274e9,_0x57d47d);_0x3f6dfe[_0x4b578b(0x54f)][_0x4b578b(0x4f1)][_0x2ca242]=new _0x25bda2(_0x4b578b(0x342),_0x4b578b(0x320),_0x2fb564);}}}else{const _0xa28520=JsonEx[_0x420e51(0x32b)](this);_0xa28520[_0x420e51(0x3fe)]=!![],VisuMZ[_0x420e51(0x54f)][_0x420e51(0x526)][_0x420e51(0x36c)](this,_0x519af0,_0x1e9e19),this['equipAdjustHpMp'](_0xa28520);}}else{if(_0x420e51(0x42d)===_0x420e51(0x51e)){function _0x2a6588(){const _0xbd9aec=_0x420e51;return this['updatedLayoutStyle']()[_0xbd9aec(0x449)](/RIGHT/i);}}else VisuMZ[_0x420e51(0x54f)][_0x420e51(0x526)][_0x420e51(0x36c)](this,_0x519af0,_0x1e9e19);}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x28b)]=Game_Actor[_0x20768d(0x41b)][_0x20768d(0x44e)],Game_Actor[_0x20768d(0x41b)][_0x20768d(0x44e)]=function(_0x1864a4,_0x226151){const _0x5a8f1d=_0x20768d;if(!this[_0x5a8f1d(0x3fe)]){if(_0x5a8f1d(0x52c)==='spuWx'){function _0x4b5a3e(){this['_shopStatusMenuMode']=!![],this['_shopStatusMenuAlly']=_0x174c5b;}}else{const _0x5f0793=JsonEx[_0x5a8f1d(0x32b)](this);_0x5f0793['_tempActor']=!![],VisuMZ[_0x5a8f1d(0x54f)][_0x5a8f1d(0x28b)]['call'](this,_0x1864a4,_0x226151),this[_0x5a8f1d(0x428)](_0x5f0793);}}else VisuMZ[_0x5a8f1d(0x54f)]['Game_Actor_forceChangeEquip'][_0x5a8f1d(0x36c)](this,_0x1864a4,_0x226151);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x635)]=Game_Actor['prototype']['discardEquip'],Game_Actor['prototype']['discardEquip']=function(_0x3eebf5){const _0x307e5c=_0x20768d;if(!this[_0x307e5c(0x3fe)]){if(_0x307e5c(0x5d6)!==_0x307e5c(0x5d6)){function _0x291355(){const _0x589e3c=_0x307e5c;if(!_0x2516c0)return 0x0;const _0x2034cd=_0x4172a0['ItemsEquipsCore']['Window_ShopBuy_price']['call'](this,_0x3307cc);return this[_0x589e3c(0x43b)](_0x32c722,_0x2034cd);}}else{const _0x3633e6=JsonEx['makeDeepCopy'](this);_0x3633e6[_0x307e5c(0x3fe)]=!![],VisuMZ[_0x307e5c(0x54f)][_0x307e5c(0x635)]['call'](this,_0x3eebf5),this[_0x307e5c(0x428)](_0x3633e6);}}else{if(_0x307e5c(0x63b)!==_0x307e5c(0x47f))VisuMZ['ItemsEquipsCore']['Game_Actor_discardEquip'][_0x307e5c(0x36c)](this,_0x3eebf5);else{function _0x28bbc4(){const _0x443edd=_0x307e5c;this[_0x443edd(0x305)](_0x506874);}}}},Game_Actor[_0x20768d(0x41b)]['releaseUnequippableItems']=function(_0x181644){const _0x46c0a9=_0x20768d;for(;;){const _0x2479eb=this[_0x46c0a9(0x5fe)](),_0x25de76=this[_0x46c0a9(0x511)](),_0x553f2a=_0x25de76['length'];let _0xb93f64=![];for(let _0x52ebae=0x0;_0x52ebae<_0x553f2a;_0x52ebae++){const _0x324f64=_0x25de76[_0x52ebae];if(_0x324f64&&(!this[_0x46c0a9(0x448)](_0x324f64)||_0x324f64[_0x46c0a9(0x225)]!==_0x2479eb[_0x52ebae])){if('AmveF'===_0x46c0a9(0x618)){!_0x181644&&this[_0x46c0a9(0x1fc)](null,_0x324f64);if(!this[_0x46c0a9(0x3fe)]){const _0x5b0b30=JsonEx[_0x46c0a9(0x32b)](this);_0x5b0b30['_tempActor']=!![],this[_0x46c0a9(0x2d8)][_0x52ebae][_0x46c0a9(0x356)](null),this[_0x46c0a9(0x428)](_0x5b0b30);}else this[_0x46c0a9(0x2d8)][_0x52ebae][_0x46c0a9(0x356)](null);_0xb93f64=!![];}else{function _0x5bf0fc(){const _0x63278d=_0x46c0a9;_0x54af8e+=_0x63278d(0x217)[_0x63278d(0x60a)](_0xe7b372),_0x1e6c0b++;if(_0x28a5ce>=_0x381aea)return _0x4d26c5;}}}}if(!_0xb93f64)break;}},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x428)]=function(_0x39b9f1){const _0xe3b0c8=_0x20768d;if(this['_tempActor'])return;if(!VisuMZ['ItemsEquipsCore']['Settings'][_0xe3b0c8(0x32c)][_0xe3b0c8(0x4aa)])return;const _0x308c46=Math[_0xe3b0c8(0x3b8)](_0x39b9f1[_0xe3b0c8(0x5a5)]()*this[_0xe3b0c8(0x59d)]),_0x4408b0=Math[_0xe3b0c8(0x3b8)](_0x39b9f1[_0xe3b0c8(0x234)]()*this[_0xe3b0c8(0x2de)]);if(this['hp']>0x0)this[_0xe3b0c8(0x399)](_0x308c46);if(this['mp']>0x0)this[_0xe3b0c8(0x637)](_0x4408b0);},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x31e)]=function(){const _0x576e40=_0x20768d,_0x4484b1=this[_0x576e40(0x5fe)]()[_0x576e40(0x3c9)];for(let _0xa6a93d=0x0;_0xa6a93d<_0x4484b1;_0xa6a93d++){if(this[_0x576e40(0x5cc)](_0xa6a93d))this[_0x576e40(0x53b)](_0xa6a93d,null);}},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x5cc)]=function(_0x2207e3){const _0x20655c=_0x20768d;if(this[_0x20655c(0x2b4)]()[_0x20655c(0x383)](this[_0x20655c(0x5fe)]()[_0x2207e3]))return![];else{if(_0x20655c(0x5db)!==_0x20655c(0x5db)){function _0x327050(){const _0x57b1ff=_0x20655c;_0x396933=_0x515dd3[_0x57b1ff(0x5d7)](_0x15892f,_0x2b5851);}}else return this[_0x20655c(0x282)](_0x2207e3);}},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x2b4)]=function(){const _0x4ca4ee=_0x20768d;return VisuMZ[_0x4ca4ee(0x54f)][_0x4ca4ee(0x569)][_0x4ca4ee(0x32c)][_0x4ca4ee(0x29f)];},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x593)]=function(){const _0x4dc89e=_0x20768d,_0x1d3ff8=this[_0x4dc89e(0x5fe)]()[_0x4dc89e(0x3c9)];for(let _0x22ecc8=0x0;_0x22ecc8<_0x1d3ff8;_0x22ecc8++){if(this[_0x4dc89e(0x30c)](_0x22ecc8))this[_0x4dc89e(0x53b)](_0x22ecc8,null);}for(let _0xd6625f=0x0;_0xd6625f<_0x1d3ff8;_0xd6625f++){if(this[_0x4dc89e(0x30c)](_0xd6625f))this[_0x4dc89e(0x53b)](_0xd6625f,this[_0x4dc89e(0x5df)](_0xd6625f));}},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x30c)]=function(_0x3dcd47){const _0x235c6b=_0x20768d;if(this[_0x235c6b(0x48f)]()[_0x235c6b(0x383)](this[_0x235c6b(0x5fe)]()[_0x3dcd47]))return![];else{if(_0x235c6b(0x310)===_0x235c6b(0x200)){function _0x3deaf4(){const _0x30ae39=_0x235c6b;return this['_list']?this['_list'][_0x30ae39(0x3c9)]:0x3;}}else return this[_0x235c6b(0x282)](_0x3dcd47);}},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x48f)]=function(){const _0x4b48db=_0x20768d;return VisuMZ[_0x4b48db(0x54f)]['Settings'][_0x4b48db(0x32c)]['NonOptimizeETypes'];},VisuMZ['ItemsEquipsCore'][_0x20768d(0x5bd)]=Game_Actor['prototype'][_0x20768d(0x1fc)],Game_Actor[_0x20768d(0x41b)][_0x20768d(0x1fc)]=function(_0xae7551,_0x3b916b){const _0x936382=_0x20768d;if(this['_tempActor'])return![];$gameTemp[_0x936382(0x48d)]=!![];const _0x4b088d=VisuMZ[_0x936382(0x54f)][_0x936382(0x5bd)][_0x936382(0x36c)](this,_0xae7551,_0x3b916b);return $gameTemp[_0x936382(0x48d)]=![],_0x4b088d;},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x550)]=function(_0x11e2e5,_0x8d8b22){const _0x278ff6=_0x20768d,_0x528b25=this['getNextAvailableEtypeId'](_0x11e2e5);if(_0x528b25<0x0)return;const _0x823303=_0x11e2e5===0x1?$dataWeapons[_0x8d8b22]:$dataArmors[_0x8d8b22];this[_0x278ff6(0x53b)](_0x528b25,_0x823303);},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x20a)]=function(_0x2fb2ec){const _0x4483e8=_0x20768d;let _0x5598f8=0x0;const _0x199767=this[_0x4483e8(0x5fe)](),_0x51534b=this[_0x4483e8(0x511)]();for(let _0x251cb3=0x0;_0x251cb3<_0x199767[_0x4483e8(0x3c9)];_0x251cb3++){if(_0x199767[_0x251cb3]===_0x2fb2ec){_0x5598f8=_0x251cb3;if(!_0x51534b[_0x251cb3])return _0x5598f8;}}return _0x5598f8;},VisuMZ['ItemsEquipsCore'][_0x20768d(0x30f)]=Game_Actor[_0x20768d(0x41b)][_0x20768d(0x4bd)],Game_Actor[_0x20768d(0x41b)][_0x20768d(0x4bd)]=function(_0xff382c){const _0x3f9211=_0x20768d;let _0x33dc4=VisuMZ['ItemsEquipsCore'][_0x3f9211(0x30f)][_0x3f9211(0x36c)](this,_0xff382c);for(const _0x369089 of this['equips']()){if(_0x369089)_0x33dc4+=this[_0x3f9211(0x237)](_0x369089,_0xff382c);}return _0x33dc4;},Game_Actor[_0x20768d(0x41b)][_0x20768d(0x237)]=function(_0x20a603,_0x4d1c78){const _0x4863f0=_0x20768d;if(this[_0x4863f0(0x616)])return 0x0;const _0x4047b6=(DataManager[_0x4863f0(0x4ad)](_0x20a603)?_0x4863f0(0x40a):_0x4863f0(0x336))[_0x4863f0(0x60a)](_0x20a603['id']),_0x5156ec=_0x4863f0(0x40d)[_0x4863f0(0x60a)](_0x4047b6,_0x4d1c78);if(VisuMZ[_0x4863f0(0x54f)][_0x4863f0(0x4f1)][_0x5156ec]){if(_0x4863f0(0x4d1)===_0x4863f0(0x494)){function _0x24eb89(){const _0x5d69cc=_0x4863f0;this[_0x5d69cc(0x5b7)]();}}else{this[_0x4863f0(0x616)]=!![];const _0x5dc6d6=VisuMZ[_0x4863f0(0x54f)][_0x4863f0(0x4f1)][_0x5156ec]['call'](this,_0x20a603,_0x4d1c78);return this['_calculatingJSParameters']=![],_0x5dc6d6;}}else{if(_0x4863f0(0x253)!==_0x4863f0(0x253)){function _0x6c8f32(){const _0x170a45=_0x4863f0;return this['_list']?this[_0x170a45(0x288)]():0x4;}}else return 0x0;}},Game_Actor['prototype'][_0x20768d(0x4c3)]=function(_0x1eca70){const _0x2296a4=_0x20768d;this[_0x2296a4(0x4ee)]=!![],this[_0x2296a4(0x5ba)]=_0x1eca70;},VisuMZ[_0x20768d(0x54f)]['Game_Party_initialize']=Game_Party[_0x20768d(0x41b)][_0x20768d(0x1e1)],Game_Party[_0x20768d(0x41b)][_0x20768d(0x1e1)]=function(){const _0xf52c34=_0x20768d;VisuMZ[_0xf52c34(0x54f)][_0xf52c34(0x551)][_0xf52c34(0x36c)](this),this[_0xf52c34(0x363)]();},Game_Party['prototype'][_0x20768d(0x363)]=function(){this['_newItemsList']=[];},Game_Party['prototype'][_0x20768d(0x3fd)]=function(_0x1afeab){const _0x53e04f=_0x20768d;if(!$gameTemp[_0x53e04f(0x54b)]())return![];if(this[_0x53e04f(0x414)]===undefined)this['initNewItemsList']();let _0x2b7b89='';if(DataManager[_0x53e04f(0x3f0)](_0x1afeab)){if(_0x53e04f(0x4df)==='EoyWd'){function _0x272d49(){const _0x5e2807=_0x53e04f,_0x5b6bb8=this[_0x5e2807(0x65b)],_0x5b52cc=_0x4525e8[_0x5e2807(0x559)](),_0x4c4255=_0x1bdbb0['x']+_0x1e5a83[_0x5e2807(0x465)](_0x5b5933[_0x5e2807(0x341)]/0x2)+_0x5b52cc;_0x5b6bb8['x']=_0x5b6bb8['width']/-0x2+_0x4c4255,_0x5b6bb8['y']=_0x4d1de8[_0x5e2807(0x465)](_0x221fe7[_0x5e2807(0x61d)]/0x2);}}else _0x2b7b89='item-%1'[_0x53e04f(0x60a)](_0x1afeab['id']);}else{if(DataManager['isWeapon'](_0x1afeab))_0x2b7b89=_0x53e04f(0x231)[_0x53e04f(0x60a)](_0x1afeab['id']);else{if(DataManager[_0x53e04f(0x252)](_0x1afeab))_0x2b7b89=_0x53e04f(0x5d0)[_0x53e04f(0x60a)](_0x1afeab['id']);else{if('sWqCb'===_0x53e04f(0x533))return;else{function _0x3bafd3(){const _0x2706ca=_0x53e04f;if(_0x236cde[_0x2706ca(0x5a1)][_0x2706ca(0x214)]===_0x4e8060)return _0x4b6aa7[_0x2706ca(0x54f)]['Window_ItemList_maxCols'][_0x2706ca(0x36c)](this);else return _0x4280d4[_0x2706ca(0x5a1)][_0x2706ca(0x214)]===_0x52b4cf?_0x510f40[_0x2706ca(0x54f)][_0x2706ca(0x203)][_0x2706ca(0x36c)](this):_0x280ddc[_0x2706ca(0x54f)][_0x2706ca(0x569)]['ItemScene'][_0x2706ca(0x2f9)];}}}}}return this[_0x53e04f(0x414)][_0x53e04f(0x383)](_0x2b7b89);},Game_Party['prototype'][_0x20768d(0x468)]=function(_0x52a40b){const _0x518a92=_0x20768d;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x518a92(0x414)]===undefined)this[_0x518a92(0x363)]();let _0x3b9a50='';if(DataManager['isItem'](_0x52a40b))_0x3b9a50=_0x518a92(0x3ea)['format'](_0x52a40b['id']);else{if(DataManager[_0x518a92(0x4ad)](_0x52a40b))_0x3b9a50=_0x518a92(0x231)[_0x518a92(0x60a)](_0x52a40b['id']);else{if(DataManager['isArmor'](_0x52a40b)){if(_0x518a92(0x5e1)===_0x518a92(0x306)){function _0x4e2306(){const _0x58215f=_0x518a92;return _0x21b91f['getInputMultiButtonStrings'](_0x58215f(0x582),_0x58215f(0x5c2));}}else _0x3b9a50=_0x518a92(0x5d0)[_0x518a92(0x60a)](_0x52a40b['id']);}else return;}}if(!this[_0x518a92(0x414)][_0x518a92(0x383)](_0x3b9a50))this[_0x518a92(0x414)][_0x518a92(0x64a)](_0x3b9a50);},Game_Party[_0x20768d(0x41b)][_0x20768d(0x5a9)]=function(_0x1c3092){const _0x28deb1=_0x20768d;if(!$gameTemp[_0x28deb1(0x54b)]())return;if(this[_0x28deb1(0x414)]===undefined)this[_0x28deb1(0x363)]();let _0x8fd5f4='';if(DataManager[_0x28deb1(0x3f0)](_0x1c3092)){if(_0x28deb1(0x552)!=='LYcLV'){function _0x264c9e(){const _0x12139c=_0x28deb1,_0x4f932e=_0x12139c(0x25e);if(this['_itemData'][_0x12139c(0x4f9)]>=0x0&&!this[_0x12139c(0x232)][_0x4f932e])return![];const _0x268709=this[_0x12139c(0x406)]();this[_0x12139c(0x51f)](_0x268709,_0x441126,_0x70e21e,_0x1b7ee9,!![]);const _0x591082=this[_0x12139c(0x46f)]();return this[_0x12139c(0x58b)](_0x1ef12b[_0x12139c(0x324)]()),this['drawItemKeyData'](_0x591082,_0x488d6d,_0x4c77f3,_0xcd954a,![],_0x12139c(0x5c2)),this[_0x12139c(0x5ca)](_0x5492f8,_0x518764,_0x49ff42),this['resetFontSettings'](),!![];}}else _0x8fd5f4=_0x28deb1(0x3ea)[_0x28deb1(0x60a)](_0x1c3092['id']);}else{if(DataManager[_0x28deb1(0x4ad)](_0x1c3092))_0x8fd5f4=_0x28deb1(0x231)[_0x28deb1(0x60a)](_0x1c3092['id']);else{if(DataManager['isArmor'](_0x1c3092))_0x8fd5f4=_0x28deb1(0x5d0)[_0x28deb1(0x60a)](_0x1c3092['id']);else return;}}if(this[_0x28deb1(0x414)][_0x28deb1(0x383)](_0x8fd5f4)){if(_0x28deb1(0x322)!==_0x28deb1(0x2bd))this[_0x28deb1(0x414)]['splice'](this['_newItemsList'][_0x28deb1(0x2ce)](_0x8fd5f4),0x1);else{function _0x164832(){const _0x45251b=_0x28deb1;return _0x41af70[_0x45251b(0x54f)][_0x45251b(0x569)][_0x45251b(0x32c)][_0x45251b(0x29f)];}}}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x221)]=Game_Party['prototype'][_0x20768d(0x352)],Game_Party[_0x20768d(0x41b)][_0x20768d(0x352)]=function(_0x4eb750,_0x2d8955,_0x969f78){const _0x2e46e3=_0x20768d,_0x38445e=this[_0x2e46e3(0x50d)](_0x4eb750);VisuMZ[_0x2e46e3(0x54f)]['Game_Party_gainItem'][_0x2e46e3(0x36c)](this,_0x4eb750,_0x2d8955,_0x969f78);if(this['numItems'](_0x4eb750)>_0x38445e)this[_0x2e46e3(0x468)](_0x4eb750);},Game_Party[_0x20768d(0x41b)][_0x20768d(0x288)]=function(_0x59dcc2){return DataManager['maxItemAmount'](_0x59dcc2);},VisuMZ['ItemsEquipsCore']['Scene_ItemBase_activateItemWindow']=Scene_ItemBase[_0x20768d(0x41b)][_0x20768d(0x345)],Scene_ItemBase[_0x20768d(0x41b)][_0x20768d(0x345)]=function(){const _0x3541d8=_0x20768d;VisuMZ['ItemsEquipsCore'][_0x3541d8(0x215)][_0x3541d8(0x36c)](this),this[_0x3541d8(0x2ab)][_0x3541d8(0x523)]();},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x44c)]=function(){const _0x52de53=_0x20768d;if(ConfigManager[_0x52de53(0x303)]&&ConfigManager[_0x52de53(0x4f7)]!==undefined){if(_0x52de53(0x521)==='cIoTg')return ConfigManager['uiHelpPosition'];else{function _0x74dc00(){const _0x10fe46=_0x52de53,_0x1a5a3f=_0x349f17['ItemsEquipsCore'][_0x10fe46(0x30b)]['call'](this);return this['allowCreateStatusWindow']()&&this[_0x10fe46(0x2ed)]()&&(_0x1a5a3f[_0x10fe46(0x341)]-=this[_0x10fe46(0x564)]()),_0x1a5a3f;}}}else{if(this[_0x52de53(0x45f)]()){if('yUbWo'!==_0x52de53(0x603)){function _0x4316ec(){const _0x1c5942=_0x52de53;this[_0x1c5942(0x5ca)](_0x5d1cf1,_0x388f87,_0x4303d1,_0x175a95);for(let _0x3e4ffc=0x0;_0x3e4ffc<_0x5efb0a;_0x3e4ffc++){const _0x35173e=_0x99bf70+_0x5bc0f5+_0x3e4ffc*_0xe7e3a4;this[_0x1c5942(0x5ca)](_0x35173e,_0x3cb94f,_0xef89e1,_0x273708);}_0x229dbb+=_0x560ad1;}}else return this[_0x52de53(0x3f2)]()['match'](/LOWER/i);}else{if('SHXGH'===_0x52de53(0x496))Scene_ItemBase['prototype']['isRightInputMode'][_0x52de53(0x36c)](this);else{function _0x11e022(){return _0x1de25b(_0x52573d['$1']);}}}}},Scene_Item[_0x20768d(0x41b)]['isRightInputMode']=function(){const _0x4d2533=_0x20768d;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x4d2533(0x434)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x4d2533(0x3f2)]()[_0x4d2533(0x449)](/RIGHT/i);else Scene_ItemBase['prototype']['isRightInputMode'][_0x4d2533(0x36c)](this);}},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x3f2)]=function(){const _0x4fe92=_0x20768d;return VisuMZ[_0x4fe92(0x54f)][_0x4fe92(0x569)]['ItemScene'][_0x4fe92(0x2b3)];},Scene_Item['prototype'][_0x20768d(0x430)]=function(){const _0x4ea656=_0x20768d;return this['_categoryWindow']&&this[_0x4ea656(0x4cd)][_0x4ea656(0x430)]();},Scene_Item['prototype'][_0x20768d(0x45f)]=function(){const _0x402d2b=_0x20768d;return VisuMZ[_0x402d2b(0x54f)][_0x402d2b(0x569)][_0x402d2b(0x47c)][_0x402d2b(0x222)];},VisuMZ[_0x20768d(0x54f)]['Scene_Item_create']=Scene_Item[_0x20768d(0x41b)][_0x20768d(0x5b0)],Scene_Item[_0x20768d(0x41b)][_0x20768d(0x5b0)]=function(){const _0x2c0b0b=_0x20768d;VisuMZ['ItemsEquipsCore']['Scene_Item_create'][_0x2c0b0b(0x36c)](this),this[_0x2c0b0b(0x430)]()&&this[_0x2c0b0b(0x385)]();},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x2e4)]=function(){const _0xb7456=_0x20768d;if(this[_0xb7456(0x45f)]())return this[_0xb7456(0x257)]();else{if('TUufg'==='TUufg')return Scene_ItemBase[_0xb7456(0x41b)][_0xb7456(0x2e4)][_0xb7456(0x36c)](this);else{function _0x306e9e(){_0x48661b+=_0x132724(_0x50ae62['$1']),_0x115dce+=_0x38cb2d(_0x308700['$2']);}}}},Scene_Item['prototype'][_0x20768d(0x257)]=function(){const _0x39e67f=_0x20768d,_0x5211df=0x0,_0x45ecfe=this[_0x39e67f(0x41c)](),_0x3918a6=Graphics[_0x39e67f(0x3ab)],_0x211d52=this[_0x39e67f(0x350)]();return new Rectangle(_0x5211df,_0x45ecfe,_0x3918a6,_0x211d52);},VisuMZ['ItemsEquipsCore'][_0x20768d(0x3ee)]=Scene_Item[_0x20768d(0x41b)][_0x20768d(0x3d8)],Scene_Item[_0x20768d(0x41b)]['createCategoryWindow']=function(){const _0x4c12aa=_0x20768d;VisuMZ['ItemsEquipsCore'][_0x4c12aa(0x3ee)][_0x4c12aa(0x36c)](this),this[_0x4c12aa(0x430)]()&&this['postCreateCategoryWindowItemsEquipsCore']();},Scene_Item['prototype'][_0x20768d(0x209)]=function(){const _0x15aabf=_0x20768d;delete this[_0x15aabf(0x4cd)][_0x15aabf(0x4bc)]['ok'],delete this[_0x15aabf(0x4cd)][_0x15aabf(0x4bc)][_0x15aabf(0x21d)];},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x2af)]=Scene_Item[_0x20768d(0x41b)]['categoryWindowRect'],Scene_Item[_0x20768d(0x41b)][_0x20768d(0x318)]=function(){const _0x2a845a=_0x20768d;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x2a845a(0x4cf)===_0x2a845a(0x4cf))return this[_0x2a845a(0x4d4)]();else{function _0xf5e428(){const _0x422293=_0x2a845a;return _0x373616=_0x5cb032(_0x1c69b2),_0x464c2c[_0x422293(0x449)](/#(.*)/i)?_0x422293(0x51a)[_0x422293(0x60a)](_0x156d1a(_0x78c210['$1'])):this[_0x422293(0x230)](_0x44a77e(_0x40fb6d));}}}else return VisuMZ[_0x2a845a(0x54f)][_0x2a845a(0x2af)][_0x2a845a(0x36c)](this);},Scene_Item[_0x20768d(0x41b)]['categoryWindowRectItemsEquipsCore']=function(){const _0x38f136=_0x20768d,_0x5bcb77=0x0,_0x3f9b72=this['mainAreaTop'](),_0x36284a=Graphics[_0x38f136(0x3ab)],_0x14c2dd=this[_0x38f136(0x2f0)](0x1,!![]);return new Rectangle(_0x5bcb77,_0x3f9b72,_0x36284a,_0x14c2dd);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x2ba)]=Scene_Item[_0x20768d(0x41b)][_0x20768d(0x517)],Scene_Item[_0x20768d(0x41b)][_0x20768d(0x517)]=function(){const _0x1dd978=_0x20768d;VisuMZ[_0x1dd978(0x54f)][_0x1dd978(0x2ba)]['call'](this);if(this[_0x1dd978(0x430)]()){if(_0x1dd978(0x2d0)==='aqXMd')this[_0x1dd978(0x584)]();else{function _0x512084(){const _0x242d19=_0x1dd978,_0x211e2c=this[_0x242d19(0x5ea)],_0x4a361e=_0x46bd87[_0x242d19(0x559)](),_0x23adf8=_0x206374['x']+_0x21dc78[_0x242d19(0x465)](_0x540587['width']/0x2)+_0x4a361e;_0x211e2c['x']=_0x211e2c[_0x242d19(0x341)]/-0x2+_0x23adf8,_0x211e2c['y']=_0xf4ca5c['floor'](_0x4fa86a[_0x242d19(0x61d)]/0x2);}}}if(this['allowCreateStatusWindow']()){if('VjWgh'!==_0x1dd978(0x248)){function _0x540d2f(){const _0x590e3a=_0x1dd978;return _0x3ba735[_0x590e3a(0x4ad)](_0x11984e)&&_0x576822[_0x590e3a(0x450)]===_0x3d2d8e(_0x279268['$1']);}}else this[_0x1dd978(0x57e)]();}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x30b)]=Scene_Item[_0x20768d(0x41b)][_0x20768d(0x1de)],Scene_Item['prototype'][_0x20768d(0x1de)]=function(){const _0x2f8531=_0x20768d;if(this[_0x2f8531(0x45f)]())return this[_0x2f8531(0x604)]();else{if(_0x2f8531(0x3c0)!==_0x2f8531(0x572)){const _0x528576=VisuMZ[_0x2f8531(0x54f)]['Scene_Item_itemWindowRect'][_0x2f8531(0x36c)](this);return this[_0x2f8531(0x614)]()&&this[_0x2f8531(0x2ed)]()&&(_0x528576[_0x2f8531(0x341)]-=this[_0x2f8531(0x564)]()),_0x528576;}else{function _0x1b23bd(){const _0x1b3159=_0x2f8531;_0x24df9d=this['_actor'][_0x1b3159(0x369)](_0x31f2e9);}}}},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x604)]=function(){const _0x4e0980=_0x20768d,_0x59374e=this[_0x4e0980(0x4f0)]()?this[_0x4e0980(0x564)]():0x0,_0x24ec5c=this[_0x4e0980(0x4cd)]['y']+this['_categoryWindow']['height'],_0x2b2c17=Graphics['boxWidth']-this['statusWidth'](),_0x3840c7=this[_0x4e0980(0x3dd)]()-_0x24ec5c;return new Rectangle(_0x59374e,_0x24ec5c,_0x2b2c17,_0x3840c7);},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x584)]=function(){const _0x3272ba=_0x20768d;this[_0x3272ba(0x2ab)][_0x3272ba(0x30e)](_0x3272ba(0x21d),this[_0x3272ba(0x2cc)][_0x3272ba(0x4d7)](this));},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x614)]=function(){const _0x53c627=_0x20768d;if(this['isUseItemsEquipsCoreUpdatedLayout']())return!![];else{if(_0x53c627(0x2c7)==='cGudW'){function _0x8bf842(){const _0x46454e=_0x53c627;return _0x32825f['ItemsEquipsCore'][_0x46454e(0x569)][_0x46454e(0x319)][_0x46454e(0x23f)];}}else return VisuMZ[_0x53c627(0x54f)][_0x53c627(0x569)][_0x53c627(0x47c)][_0x53c627(0x381)];}},Scene_Item['prototype'][_0x20768d(0x2ed)]=function(){const _0x4906c1=_0x20768d;return VisuMZ[_0x4906c1(0x54f)][_0x4906c1(0x569)]['ItemScene'][_0x4906c1(0x5c5)];},Scene_Item[_0x20768d(0x41b)]['createStatusWindow']=function(){const _0x347f89=_0x20768d,_0x12933e=this[_0x347f89(0x31a)]();this[_0x347f89(0x5f1)]=new Window_ShopStatus(_0x12933e),this['addWindow'](this[_0x347f89(0x5f1)]),this['_itemWindow'][_0x347f89(0x658)](this[_0x347f89(0x5f1)]);const _0x507169=VisuMZ[_0x347f89(0x54f)][_0x347f89(0x569)][_0x347f89(0x47c)]['ItemMenuStatusBgType'];this[_0x347f89(0x5f1)][_0x347f89(0x50a)](_0x507169||0x0);},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x31a)]=function(){const _0x2f2211=_0x20768d;if(this[_0x2f2211(0x45f)]())return this[_0x2f2211(0x4b9)]();else{if('rdFPI'===_0x2f2211(0x662)){function _0x15ab66(){const _0x162ee6=_0x2f2211;this[_0x162ee6(0x55d)](_0x1093a3);}}else return VisuMZ[_0x2f2211(0x54f)][_0x2f2211(0x569)][_0x2f2211(0x47c)][_0x2f2211(0x4ef)]['call'](this);}},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x4b9)]=function(){const _0x493b52=_0x20768d,_0x5a5f86=this['statusWidth'](),_0x534a24=this[_0x493b52(0x2ab)][_0x493b52(0x61d)],_0x32d37f=this['isRightInputMode']()?0x0:Graphics['boxWidth']-this[_0x493b52(0x564)](),_0x5f1219=this[_0x493b52(0x2ab)]['y'];return new Rectangle(_0x32d37f,_0x5f1219,_0x5a5f86,_0x534a24);},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x564)]=function(){const _0x2c8dc0=_0x20768d;return Scene_Shop[_0x2c8dc0(0x41b)][_0x2c8dc0(0x564)]();},Scene_Item['prototype'][_0x20768d(0x2cb)]=function(){const _0x4cf923=_0x20768d;if(!this[_0x4cf923(0x3f2)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x4cf923(0x2ab)])return![];if(!this[_0x4cf923(0x2ab)][_0x4cf923(0x5c6)])return![];return this['updatedLayoutStyle']()&&this[_0x4cf923(0x430)]();},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x1e0)]=function(){const _0x38ad69=_0x20768d;if(this[_0x38ad69(0x2cb)]()){if('LrLfC'!==_0x38ad69(0x2f3)){function _0x39cf74(){const _0x132fa8=_0x38ad69;return this[_0x132fa8(0x45f)]()?this[_0x132fa8(0x4d4)]():_0x3bd835[_0x132fa8(0x54f)][_0x132fa8(0x2af)][_0x132fa8(0x36c)](this);}}else return this[_0x38ad69(0x2ab)][_0x38ad69(0x3c5)]()===0x1?TextManager[_0x38ad69(0x525)]('left',_0x38ad69(0x5c2)):TextManager[_0x38ad69(0x525)](_0x38ad69(0x595),_0x38ad69(0x1cf));}return Scene_ItemBase[_0x38ad69(0x41b)][_0x38ad69(0x1e0)][_0x38ad69(0x36c)](this);},Scene_Item[_0x20768d(0x41b)][_0x20768d(0x20d)]=function(){const _0x127700=_0x20768d;if(this['buttonAssistItemListRequirement']()){if(_0x127700(0x3e0)!==_0x127700(0x3e0)){function _0x49e99e(){return!![];}}else return VisuMZ[_0x127700(0x54f)]['Settings'][_0x127700(0x47c)]['buttonAssistCategory'];}return Scene_ItemBase['prototype'][_0x127700(0x20d)][_0x127700(0x36c)](this);},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x44c)]=function(){const _0x5750a9=_0x20768d;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x5750a9(0x4f7)]!==undefined){if(_0x5750a9(0x530)===_0x5750a9(0x21f)){function _0x539174(){const _0x57cc60=_0x5750a9;if(_0x24b945[_0x57cc60(0x303)]&&_0x283894['uiInputPosition']!==_0x2996df)return _0x4ebf23[_0x57cc60(0x434)];else{if(this[_0x57cc60(0x45f)]())return this['updatedLayoutStyle']()[_0x57cc60(0x449)](/RIGHT/i);else _0x3dfe7f[_0x57cc60(0x41b)]['isRightInputMode']['call'](this);}}}else return ConfigManager[_0x5750a9(0x4f7)];}else{if(this[_0x5750a9(0x45f)]())return this[_0x5750a9(0x3f2)]()['match'](/LOWER/i);else{if(_0x5750a9(0x3f8)!==_0x5750a9(0x368))Scene_MenuBase[_0x5750a9(0x41b)]['isRightInputMode'][_0x5750a9(0x36c)](this);else{function _0x43756f(){const _0x1c09f3=_0x5750a9,_0x2ada1f=_0x243456+(this[_0x1c09f3(0x5e4)]()-_0x33ee98[_0x1c09f3(0x65c)])/0x2,_0xc22e31=_0x33a0c7[_0x1c09f3(0x2fb)]+0x4,_0x3142c1=_0x356403[_0x1c09f3(0x5d7)](0x0,_0x45b1bb-_0xc22e31);this[_0x1c09f3(0x58b)](_0x170af0['getItemColor'](_0x3d47cf)),this[_0x1c09f3(0x1d6)](_0x480e97[_0x1c09f3(0x384)],_0x2b11d4,_0x2ada1f),this[_0x1c09f3(0x4c1)](_0x4e4d64[_0x1c09f3(0x254)],_0x3bf62d+_0xc22e31,_0xf3b867,_0x3142c1),this[_0x1c09f3(0x431)]();}}}}},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x4f0)]=function(){const _0x611774=_0x20768d;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x611774(0x434)]!==undefined){if('sMVWt'===_0x611774(0x44a)){function _0x48f51f(){const _0x58bca7=_0x611774;this[_0x58bca7(0x1f5)](_0x514c40,_0x4527f2['x']+_0x31a2d7[_0x58bca7(0x341)]-_0x4cfc2b,_0x2e34fb['y'],_0x4803e8);}}else return ConfigManager['uiInputPosition'];}else{if(this[_0x611774(0x45f)]()){if(_0x611774(0x311)===_0x611774(0x311))return this['updatedLayoutStyle']()[_0x611774(0x449)](/RIGHT/i);else{function _0x2043d1(){_0x321192=_0x53e0f0(_0x645aaa['$1']);}}}else{if(_0x611774(0x570)!==_0x611774(0x45e))Scene_MenuBase[_0x611774(0x41b)]['isRightInputMode']['call'](this);else{function _0x161e79(){const _0x540fa7=_0x611774;this[_0x540fa7(0x62d)]=!![];}}}}},Scene_Equip['prototype'][_0x20768d(0x3f2)]=function(){const _0xfad64=_0x20768d;return VisuMZ[_0xfad64(0x54f)][_0xfad64(0x569)][_0xfad64(0x32c)][_0xfad64(0x2b3)];},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x430)]=function(){const _0x4d3841=_0x20768d;return this[_0x4d3841(0x640)]&&this[_0x4d3841(0x640)][_0x4d3841(0x430)]();},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x45f)]=function(){const _0x2e3077=_0x20768d;return VisuMZ[_0x2e3077(0x54f)]['Settings']['EquipScene'][_0x2e3077(0x222)];},VisuMZ['ItemsEquipsCore'][_0x20768d(0x491)]=Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x5b0)],Scene_Equip['prototype'][_0x20768d(0x5b0)]=function(){const _0x14ef2e=_0x20768d;VisuMZ['ItemsEquipsCore']['Scene_Equip_create']['call'](this),this['isUseModernControls']()&&this[_0x14ef2e(0x1df)]();},Scene_Equip['prototype'][_0x20768d(0x2e4)]=function(){const _0x2ed432=_0x20768d;if(this[_0x2ed432(0x45f)]()){if(_0x2ed432(0x5d2)===_0x2ed432(0x5d2))return this[_0x2ed432(0x257)]();else{function _0xc6ed7(){const _0x56edfd=_0x2ed432,_0x23ae32=_0x2612d2[_0x56edfd(0x292)]('['+_0x2939ed['$1'][_0x56edfd(0x449)](/\d+/g)+']');for(const _0x18578d of _0x23ae32){if(!_0x377e7a[_0x56edfd(0x394)](_0x18578d))return![];}return!![];}}}else return Scene_MenuBase[_0x2ed432(0x41b)][_0x2ed432(0x2e4)][_0x2ed432(0x36c)](this);},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x257)]=function(){const _0x49f10a=_0x20768d,_0x333a21=0x0,_0x586cd7=this[_0x49f10a(0x41c)](),_0x323294=Graphics['boxWidth'],_0x1810be=this[_0x49f10a(0x350)]();return new Rectangle(_0x333a21,_0x586cd7,_0x323294,_0x1810be);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x1d4)]=Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x31a)],Scene_Equip['prototype'][_0x20768d(0x31a)]=function(){const _0x16701c=_0x20768d;if(this[_0x16701c(0x45f)]())return this[_0x16701c(0x4b9)]();else{if('wRsas'!==_0x16701c(0x596))return VisuMZ[_0x16701c(0x54f)]['Scene_Equip_statusWindowRect']['call'](this);else{function _0x11b690(){const _0x583844=_0x16701c;return _0x2cd4fd[_0x583844(0x54f)]['Window_ItemList_maxCols'][_0x583844(0x36c)](this);}}}},Scene_Equip[_0x20768d(0x41b)]['statusWindowRectItemsEquipsCore']=function(){const _0x3f6ecd=_0x20768d,_0x5f594=this[_0x3f6ecd(0x4f0)]()?0x0:Graphics[_0x3f6ecd(0x3ab)]-this[_0x3f6ecd(0x564)](),_0x391f06=this[_0x3f6ecd(0x1eb)](),_0x3fe810=this[_0x3f6ecd(0x564)](),_0x3e8bb8=this['mainAreaHeight']();return new Rectangle(_0x5f594,_0x391f06,_0x3fe810,_0x3e8bb8);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x629)]=Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x544)],Scene_Equip[_0x20768d(0x41b)]['commandWindowRect']=function(){const _0x183aa7=_0x20768d;if(this[_0x183aa7(0x45f)]()){if(_0x183aa7(0x3b1)!=='oQhNW')return this['commandWindowRectItemsEquipsCore']();else{function _0x38e495(){const _0x37a7be=_0x183aa7;return _0x155fe7[_0x37a7be(0x54f)][_0x37a7be(0x569)][_0x37a7be(0x2f4)][_0x37a7be(0x357)];}}}else return VisuMZ[_0x183aa7(0x54f)]['Scene_Equip_commandWindowRect'][_0x183aa7(0x36c)](this);},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x29e)]=function(){const _0x4b4534=_0x20768d,_0x5ed47f=VisuMZ[_0x4b4534(0x54f)][_0x4b4534(0x569)][_0x4b4534(0x32c)];return _0x5ed47f[_0x4b4534(0x2fa)]||_0x5ed47f[_0x4b4534(0x4de)];},Scene_Equip['prototype'][_0x20768d(0x359)]=function(){const _0x3a0083=_0x20768d,_0x59be8a=this['shouldCommandWindowExist'](),_0xe0eb6b=this[_0x3a0083(0x4f0)]()?this[_0x3a0083(0x564)]():0x0,_0x494942=this[_0x3a0083(0x1eb)](),_0x21e699=Graphics['boxWidth']-this[_0x3a0083(0x564)](),_0xe0acab=_0x59be8a?this[_0x3a0083(0x2f0)](0x1,!![]):0x0;return new Rectangle(_0xe0eb6b,_0x494942,_0x21e699,_0xe0acab);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x4f3)]=Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x5e2)],Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x5e2)]=function(){const _0x1b07b9=_0x20768d;VisuMZ[_0x1b07b9(0x54f)]['Scene_Equip_createSlotWindow'][_0x1b07b9(0x36c)](this),this['isUseModernControls']()&&this[_0x1b07b9(0x386)]();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x1f1)]=Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x28a)],Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x28a)]=function(){const _0x3f22e3=_0x20768d;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('KkVXW'==='VOGFG'){function _0x3ae665(){const _0x518eb5=_0x5e88;_0x591f30[_0x518eb5(0x54f)][_0x518eb5(0x4d9)][_0x518eb5(0x36c)](this),this[_0x518eb5(0x45f)]()&&this['onSellOkItemsEquipsCore']();}}else return this[_0x3f22e3(0x21a)]();}else return VisuMZ[_0x3f22e3(0x54f)]['Scene_Equip_slotWindowRect']['call'](this);},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x21a)]=function(){const _0x3216ba=_0x20768d,_0x5d2664=this['commandWindowRect'](),_0x8dbc42=this[_0x3216ba(0x4f0)]()?this[_0x3216ba(0x564)]():0x0,_0x50d2de=_0x5d2664['y']+_0x5d2664[_0x3216ba(0x61d)],_0x4eebfa=Graphics[_0x3216ba(0x3ab)]-this['statusWidth'](),_0x4374b8=this[_0x3216ba(0x416)]()-_0x5d2664['height'];return new Rectangle(_0x8dbc42,_0x50d2de,_0x4eebfa,_0x4374b8);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x26b)]=Scene_Equip[_0x20768d(0x41b)]['itemWindowRect'],Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x1de)]=function(){const _0x1c89f5=_0x20768d;if(this[_0x1c89f5(0x45f)]()){if(_0x1c89f5(0x5f7)==='ewmPR')return this[_0x1c89f5(0x28a)]();else{function _0x452a4f(){const _0x4616ba=_0x1c89f5;return _0x4d40cd['ItemsEquipsCore'][_0x4616ba(0x569)][_0x4616ba(0x47c)][_0x4616ba(0x222)];}}}else{if('ddhDl'===_0x1c89f5(0x278))return VisuMZ[_0x1c89f5(0x54f)][_0x1c89f5(0x26b)][_0x1c89f5(0x36c)](this);else{function _0x5b24c7(){const _0x15709c=_0x1c89f5,_0x2cb396=_0x15709c(0x40d)[_0x15709c(0x60a)](_0xe8e271,_0x1fb668);_0x35be03[_0x15709c(0x54f)][_0x15709c(0x4f1)][_0x2cb396]=new _0x146590('item','paramId',_0x56f29a);}}}},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x564)]=function(){const _0x35d3e2=_0x20768d;return this[_0x35d3e2(0x45f)]()?this[_0x35d3e2(0x55a)]():VisuMZ['ItemsEquipsCore'][_0x35d3e2(0x569)]['EquipScene'][_0x35d3e2(0x3a3)];},Scene_Equip[_0x20768d(0x41b)]['geUpdatedLayoutStatusWidth']=function(){const _0x462dea=_0x20768d;return Math[_0x462dea(0x465)](Graphics[_0x462dea(0x3ab)]/0x2);},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x386)]=function(){const _0x477554=_0x20768d;this['_slotWindow'][_0x477554(0x30e)](_0x477554(0x21d),this[_0x477554(0x2cc)]['bind'](this)),this[_0x477554(0x478)][_0x477554(0x30e)]('pagedown',this[_0x477554(0x2c5)]['bind'](this)),this['_slotWindow'][_0x477554(0x30e)]('pageup',this[_0x477554(0x472)]['bind'](this));},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x3ef)]=Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x1df)],Scene_Equip[_0x20768d(0x41b)]['commandEquip']=function(){const _0x1bfe4b=_0x20768d;this[_0x1bfe4b(0x430)]()&&(this['_commandWindow']['deselect'](),this[_0x1bfe4b(0x640)][_0x1bfe4b(0x471)]()),VisuMZ[_0x1bfe4b(0x54f)][_0x1bfe4b(0x3ef)]['call'](this);},VisuMZ['ItemsEquipsCore'][_0x20768d(0x45b)]=Scene_Equip['prototype']['onSlotOk'],Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x49b)]=function(){const _0x665739=_0x20768d;if(this[_0x665739(0x478)][_0x665739(0x298)]()>=0x0){if(_0x665739(0x22c)!==_0x665739(0x22c)){function _0x3585d7(){return![];}}else VisuMZ[_0x665739(0x54f)][_0x665739(0x45b)][_0x665739(0x36c)](this),this[_0x665739(0x597)]();}else this[_0x665739(0x478)][_0x665739(0x3cb)](0x0),this[_0x665739(0x478)][_0x665739(0x4c6)]();},Scene_Equip[_0x20768d(0x41b)]['onSlotOkAutoSelect']=function(){const _0x5a5286=_0x20768d;this[_0x5a5286(0x2ab)][_0x5a5286(0x53c)]();const _0x4f8b34=this[_0x5a5286(0x478)][_0x5a5286(0x342)](),_0x305a23=this[_0x5a5286(0x2ab)]['_data'][_0x5a5286(0x2ce)](_0x4f8b34),_0x5e6405=Math[_0x5a5286(0x465)](this['_itemWindow'][_0x5a5286(0x4a0)]()/0x2)-0x1;this[_0x5a5286(0x2ab)][_0x5a5286(0x3cb)](_0x305a23>=0x0?_0x305a23:0x0),this['_itemWindow'][_0x5a5286(0x3fc)](this[_0x5a5286(0x2ab)][_0x5a5286(0x298)]()-_0x5e6405);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x61f)]=Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x390)],Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x390)]=function(){const _0x1291a0=_0x20768d;VisuMZ[_0x1291a0(0x54f)]['Scene_Equip_onSlotCancel']['call'](this);if(this[_0x1291a0(0x430)]()){if(_0x1291a0(0x643)!==_0x1291a0(0x5d9))this[_0x1291a0(0x640)]['smoothSelect'](0x0),this[_0x1291a0(0x478)][_0x1291a0(0x471)]();else{function _0xd97546(){const _0x585a47=_0x1291a0;this[_0x585a47(0x58b)](_0xe7d1bb['powerDownColor']());}}}},VisuMZ[_0x20768d(0x54f)]['Scene_Equip_onActorChange']=Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x409)],Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x409)]=function(){const _0x3596d7=_0x20768d;VisuMZ[_0x3596d7(0x54f)][_0x3596d7(0x2b5)]['call'](this),this[_0x3596d7(0x430)]()&&(this[_0x3596d7(0x640)][_0x3596d7(0x471)](),this['_commandWindow']['deselect'](),this[_0x3596d7(0x478)][_0x3596d7(0x3cb)](0x0),this[_0x3596d7(0x478)]['activate']());},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x366)]=function(){const _0x4a20ba=_0x20768d;if(!this[_0x4a20ba(0x478)])return![];if(!this[_0x4a20ba(0x478)][_0x4a20ba(0x5c6)])return![];return this[_0x4a20ba(0x478)][_0x4a20ba(0x21c)]();},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x3ce)]=function(){const _0x143666=_0x20768d;if(this[_0x143666(0x366)]())return TextManager[_0x143666(0x438)]('shift');return Scene_MenuBase['prototype']['buttonAssistKey3']['call'](this);},Scene_Equip[_0x20768d(0x41b)]['buttonAssistText3']=function(){const _0x5d7283=_0x20768d;if(this[_0x5d7283(0x366)]())return VisuMZ[_0x5d7283(0x54f)][_0x5d7283(0x569)]['EquipScene']['buttonAssistRemove'];return Scene_MenuBase[_0x5d7283(0x41b)]['buttonAssistText3'][_0x5d7283(0x36c)](this);},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x50e)]=function(){const _0x3e3f54=_0x20768d;if(this['buttonAssistSlotWindowShift']()){if(_0x3e3f54(0x3ad)===_0x3e3f54(0x3ad))return this[_0x3e3f54(0x64f)][_0x3e3f54(0x341)]/0x5/-0x3;else{function _0xc1e137(){const _0x4a729b=_0x3e3f54;this[_0x4a729b(0x478)][_0x4a729b(0x298)]()>=0x0?(_0x2ba6cd[_0x4a729b(0x54f)][_0x4a729b(0x45b)][_0x4a729b(0x36c)](this),this[_0x4a729b(0x597)]()):(this[_0x4a729b(0x478)][_0x4a729b(0x3cb)](0x0),this[_0x4a729b(0x478)][_0x4a729b(0x4c6)]());}}}return Scene_MenuBase['prototype'][_0x3e3f54(0x50e)][_0x3e3f54(0x36c)](this);},Scene_Equip[_0x20768d(0x41b)][_0x20768d(0x2cc)]=function(){SceneManager['pop']();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x534)]=Scene_Load[_0x20768d(0x41b)][_0x20768d(0x244)],Scene_Load[_0x20768d(0x41b)][_0x20768d(0x244)]=function(){const _0x13e763=_0x20768d;VisuMZ[_0x13e763(0x54f)][_0x13e763(0x534)][_0x13e763(0x36c)](this),this['refreshActorEquipSlotsIfUpdated']();},Scene_Load[_0x20768d(0x41b)][_0x20768d(0x3b6)]=function(){const _0x5df54e=_0x20768d;if($gameSystem[_0x5df54e(0x40b)]()!==$dataSystem[_0x5df54e(0x40b)]){if(_0x5df54e(0x3ae)===_0x5df54e(0x52f)){function _0x476bd1(){const _0x1453ee=_0x5df54e;return this[_0x1453ee(0x4b9)]();}}else for(const _0x382249 of $gameActors[_0x5df54e(0x581)]){if(_0x5df54e(0x519)!==_0x5df54e(0x519)){function _0x476e25(){const _0x3b7d1e=_0x5df54e,_0xb3bafe=_0x2bf7ab[_0x3b7d1e(0x608)]()['indexOf'](_0x507abb),_0x1a5e73=_0xb424d+_0x7dcd7d+_0xb3bafe*_0x4dc118;this[_0x3b7d1e(0x42e)](_0x2637c3[_0x3b7d1e(0x448)](this[_0x3b7d1e(0x37b)])),this[_0x3b7d1e(0x4ff)](_0xf053bf,_0x1a5e73+_0x229993/0x2,_0x45bca9);let _0x4b1c=_0x27ca02;for(const _0x31f155 of _0x480f91){const _0x25719e=_0x4b1c-(_0x2b8de6-_0x849fad)/0x2;this['drawActorParamDifference'](_0x31f2cd,_0x31f155,_0x1a5e73,_0x25719e,_0x5c8010),_0x4b1c+=_0x42f3b9;}}}else{if(_0x382249)_0x382249[_0x5df54e(0x2b8)]();}}}},Scene_Shop[_0x20768d(0x41b)]['isBottomHelpMode']=function(){const _0x331778=_0x20768d;if(ConfigManager[_0x331778(0x303)]&&ConfigManager['uiHelpPosition']!==undefined){if(_0x331778(0x1d5)!==_0x331778(0x1d5)){function _0x349ac6(){const _0x43a96b=_0x331778;this[_0x43a96b(0x65a)]();}}else return ConfigManager[_0x331778(0x4f7)];}else{if(this[_0x331778(0x45f)]())return this[_0x331778(0x3f2)]()[_0x331778(0x449)](/LOWER/i);else{if(_0x331778(0x540)===_0x331778(0x3d9)){function _0x3d6cf7(){const _0xd06f57=_0x331778,_0x5c69aa=this['itemPadding']();let _0x2d7e2f=0x0,_0x19be08=0x0,_0x171202='';if(this['_tempActor']){_0x1b92f3[_0xd06f57(0x5c0)]?(_0x2d7e2f=this['_actor']['paramValueByName'](_0x1948bf,![]),_0x19be08=this['_tempActor'][_0xd06f57(0x5d5)](_0x25a0d2,![]),_0x171202=this['_tempActor']['paramValueByName'](_0x288c49,!![])):(_0x2d7e2f=this[_0xd06f57(0x452)][_0xd06f57(0x369)](_0x101df4),_0x19be08=this[_0xd06f57(0x3fe)]['param'](_0x4eb585),_0x171202=this['_tempActor'][_0xd06f57(0x369)](_0x3972d1));const _0x2e9d36=_0x2d7e2f,_0x5bbf9e=_0x19be08;_0x3dc400=_0x5bbf9e-_0x2e9d36,this['changeTextColor'](_0x29c3d9[_0xd06f57(0x260)](_0xf6cafa)),this[_0xd06f57(0x4c1)](_0x171202,_0x5b510e,_0x5e6d07,_0x454cf6-_0x5c69aa,_0xd06f57(0x5c2));}}}else Scene_MenuBase[_0x331778(0x41b)][_0x331778(0x4f0)][_0x331778(0x36c)](this);}}},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x4f0)]=function(){const _0x141d0d=_0x20768d;if(ConfigManager[_0x141d0d(0x303)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x141d0d(0x434)];else{if(this[_0x141d0d(0x45f)]())return this[_0x141d0d(0x3f2)]()[_0x141d0d(0x449)](/RIGHT/i);else Scene_MenuBase[_0x141d0d(0x41b)][_0x141d0d(0x4f0)]['call'](this);}},Scene_Shop[_0x20768d(0x41b)]['updatedLayoutStyle']=function(){const _0x481a45=_0x20768d;return VisuMZ[_0x481a45(0x54f)][_0x481a45(0x569)][_0x481a45(0x2f4)][_0x481a45(0x2b3)];},Scene_Shop['prototype'][_0x20768d(0x430)]=function(){const _0x5e50a3=_0x20768d;return this[_0x5e50a3(0x4cd)]&&this[_0x5e50a3(0x4cd)][_0x5e50a3(0x430)]();},Scene_Shop[_0x20768d(0x41b)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x17f454=_0x20768d;return VisuMZ[_0x17f454(0x54f)][_0x17f454(0x569)][_0x17f454(0x2f4)][_0x17f454(0x222)];},VisuMZ[_0x20768d(0x54f)]['Scene_Shop_prepare']=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x23d)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x23d)]=function(_0xc92ff7,_0x233044){const _0x3b5830=_0x20768d;_0xc92ff7=JsonEx[_0x3b5830(0x32b)](_0xc92ff7),VisuMZ[_0x3b5830(0x54f)]['Scene_Shop_prepare']['call'](this,_0xc92ff7,_0x233044),this[_0x3b5830(0x5c7)]();},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x5c7)]=function(){const _0x5d3919=_0x20768d;this[_0x5d3919(0x5eb)]=0x0;for(const _0x140879 of this['_goods']){if(this['isGoodShown'](_0x140879)){if(_0x5d3919(0x5cb)===_0x5d3919(0x5a8)){function _0x553257(){const _0x5a6d43=_0x5d3919;return _0x4e3f08[_0x5a6d43(0x54f)][_0x5a6d43(0x569)]['StatusWindow'][_0x5a6d43(0x4bf)];}}else this[_0x5d3919(0x5eb)]++;}else _0x140879[0x0]=-0x1;}},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x2bf)]=function(_0x576ad3){const _0xc996c2=_0x20768d;if(_0x576ad3[0x0]>0x2||_0x576ad3[0x0]<0x0)return![];const _0x106368=[$dataItems,$dataWeapons,$dataArmors][_0x576ad3[0x0]][_0x576ad3[0x1]];if(!_0x106368)return![];const _0x3fb75d=_0x106368['note']||'';if(_0x3fb75d[_0xc996c2(0x449)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1826a8=JSON['parse']('['+RegExp['$1'][_0xc996c2(0x449)](/\d+/g)+']');for(const _0x5636bc of _0x1826a8){if(_0xc996c2(0x379)==='DjgUE'){if(!$gameSwitches[_0xc996c2(0x394)](_0x5636bc))return![];}else{function _0x74c4be(){return'text';}}}return!![];}if(_0x3fb75d[_0xc996c2(0x449)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ea9a8=JSON['parse']('['+RegExp['$1'][_0xc996c2(0x449)](/\d+/g)+']');for(const _0x5c5019 of _0x5ea9a8){if(_0xc996c2(0x5f0)==='scxcQ'){if(!$gameSwitches['value'](_0x5c5019))return![];}else{function _0x5a6acd(){const _0x3fb786=_0xc996c2;if(_0x587816)_0x5ad24c[_0x3fb786(0x2b8)]();}}}return!![];}if(_0x3fb75d[_0xc996c2(0x449)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x16f5a5=JSON[_0xc996c2(0x292)]('['+RegExp['$1'][_0xc996c2(0x449)](/\d+/g)+']');for(const _0x13623d of _0x16f5a5){if($gameSwitches[_0xc996c2(0x394)](_0x13623d))return!![];}return![];}if(_0x3fb75d[_0xc996c2(0x449)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45f75c=JSON[_0xc996c2(0x292)]('['+RegExp['$1'][_0xc996c2(0x449)](/\d+/g)+']');for(const _0x21c48e of _0x45f75c){if(!$gameSwitches['value'](_0x21c48e))return!![];}return![];}if(_0x3fb75d[_0xc996c2(0x449)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x19aa19=JSON[_0xc996c2(0x292)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4b12 of _0x19aa19){if(!$gameSwitches['value'](_0x4b12))return!![];}return![];}if(_0x3fb75d[_0xc996c2(0x449)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4fd544=JSON[_0xc996c2(0x292)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x17e197 of _0x4fd544){if($gameSwitches[_0xc996c2(0x394)](_0x17e197))return![];}return!![];}return!![];},VisuMZ[_0x20768d(0x54f)]['Scene_Shop_create']=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x5b0)],Scene_Shop['prototype'][_0x20768d(0x5b0)]=function(){const _0x31ad93=_0x20768d;VisuMZ[_0x31ad93(0x54f)][_0x31ad93(0x598)][_0x31ad93(0x36c)](this);if(this[_0x31ad93(0x45f)]()){if('fGPlJ'===_0x31ad93(0x3c1)){function _0x2bcf3d(){const _0x419ca8=_0x31ad93;_0x453d3f=_0xc30c37[_0x419ca8(0x4ec)][_0x4a20e2(_0x1d72c7['$1'])]||'';}}else this['postCreateItemsEquipsCore']();}this['resetShopSwitches']();},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x208)]=function(){const _0x441d83=_0x20768d;this[_0x441d83(0x4c2)][_0x441d83(0x4b7)](),this[_0x441d83(0x3a6)]['show'](),this[_0x441d83(0x3a6)]['deselect'](),this['_statusWindow'][_0x441d83(0x3bb)]();},Scene_Shop[_0x20768d(0x41b)]['helpWindowRect']=function(){const _0x5baa8e=_0x20768d;return this[_0x5baa8e(0x45f)]()?this[_0x5baa8e(0x257)]():Scene_MenuBase[_0x5baa8e(0x41b)][_0x5baa8e(0x2e4)]['call'](this);},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x257)]=function(){const _0x44a22b=_0x20768d,_0x4dfd80=0x0,_0x2b316a=this[_0x44a22b(0x41c)](),_0x493b0c=Graphics['boxWidth'],_0xc4a492=this['helpAreaHeight']();return new Rectangle(_0x4dfd80,_0x2b316a,_0x493b0c,_0xc4a492);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x32d)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x355)],Scene_Shop[_0x20768d(0x41b)]['goldWindowRect']=function(){const _0x35579e=_0x20768d;if(this[_0x35579e(0x45f)]()){if(_0x35579e(0x270)===_0x35579e(0x270))return this['goldWindowRectItemsEquipsCore']();else{function _0x5e7ebf(){const _0x233f1a=_0x35579e,_0x1bdc53=_0x5cd7b3['ItemsEquipsCore'][_0x233f1a(0x569)][_0x233f1a(0x32c)];let _0x3fffea=_0x1bdc53[_0x233f1a(0x64d)]!==_0x336e63?_0x1bdc53[_0x233f1a(0x64d)]:0x13;return _0x3e35ca[_0x233f1a(0x5a0)](_0x3fffea);}}}else return VisuMZ['ItemsEquipsCore']['Scene_Shop_goldWindowRect']['call'](this);},Scene_Shop['prototype']['goldWindowRectItemsEquipsCore']=function(){const _0x27e300=_0x20768d,_0xe5cb0e=this['mainCommandWidth'](),_0x59ed34=this['calcWindowHeight'](0x1,!![]),_0x523af6=this[_0x27e300(0x4f0)]()?0x0:Graphics[_0x27e300(0x3ab)]-_0xe5cb0e,_0x16e1af=this['mainAreaTop']();return new Rectangle(_0x523af6,_0x16e1af,_0xe5cb0e,_0x59ed34);},VisuMZ['ItemsEquipsCore'][_0x20768d(0x529)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x544)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x544)]=function(){const _0x1cde50=_0x20768d;return this[_0x1cde50(0x45f)]()?this['commandWindowRectItemsEquipsCore']():VisuMZ[_0x1cde50(0x54f)]['Scene_Shop_commandWindowRect'][_0x1cde50(0x36c)](this);},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x359)]=function(){const _0x280ce8=_0x20768d,_0x5e1e49=this['isRightInputMode']()?this['mainCommandWidth']():0x0,_0xb6afda=this['mainAreaTop'](),_0xffcfa1=Graphics[_0x280ce8(0x3ab)]-this[_0x280ce8(0x609)](),_0x4ecfaf=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x5e1e49,_0xb6afda,_0xffcfa1,_0x4ecfaf);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x42b)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x3f1)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x3f1)]=function(){const _0x48a1f3=_0x20768d;return this[_0x48a1f3(0x45f)]()?this['numberWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore']['Scene_Shop_numberWindowRect']['call'](this);},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x33c)]=function(){const _0x6df94d=_0x20768d,_0x4308ff=this['_commandWindow']['y']+this[_0x6df94d(0x640)]['height'],_0x8dd161=Graphics[_0x6df94d(0x3ab)]-this['statusWidth'](),_0x479b59=this[_0x6df94d(0x4f0)]()?Graphics[_0x6df94d(0x3ab)]-_0x8dd161:0x0,_0x1756c5=this[_0x6df94d(0x416)]()-this[_0x6df94d(0x640)][_0x6df94d(0x61d)];return new Rectangle(_0x479b59,_0x4308ff,_0x8dd161,_0x1756c5);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x451)]=Scene_Shop['prototype'][_0x20768d(0x31a)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x31a)]=function(){const _0x2c8766=_0x20768d;if(this[_0x2c8766(0x45f)]()){if(_0x2c8766(0x47a)===_0x2c8766(0x47a))return this[_0x2c8766(0x4b9)]();else{function _0x3f1eb2(){const _0x5625a7=_0x2c8766;for(const _0x109a75 of _0x28c37f[_0x5625a7(0x4bb)]){const _0x389269=_0x180f0c['equipTypes']['indexOf'](_0x109a75['trim']());if(_0x389269>0x0)_0x1e9259['equipSlots']['push'](_0x389269);}}}}else{if('BVIuo'!=='NaKlq')return VisuMZ[_0x2c8766(0x54f)][_0x2c8766(0x451)][_0x2c8766(0x36c)](this);else{function _0x514163(){const _0x3add6e=_0x2c8766;return _0x131d4d[_0x3add6e(0x54f)][_0x3add6e(0x569)][_0x3add6e(0x319)][_0x3add6e(0x331)];}}}},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x4b9)]=function(){const _0xd28e20=_0x20768d,_0xda136a=this['statusWidth'](),_0x5a8899=this[_0xd28e20(0x416)]()-this['_commandWindow']['height'],_0x3740bb=this[_0xd28e20(0x4f0)]()?0x0:Graphics[_0xd28e20(0x3ab)]-_0xda136a,_0x10b73a=this[_0xd28e20(0x640)]['y']+this[_0xd28e20(0x640)]['height'];return new Rectangle(_0x3740bb,_0x10b73a,_0xda136a,_0x5a8899);},VisuMZ['ItemsEquipsCore'][_0x20768d(0x268)]=Scene_Shop['prototype']['buyWindowRect'],Scene_Shop['prototype'][_0x20768d(0x59e)]=function(){const _0x896585=_0x20768d;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('onAqA'===_0x896585(0x630))return this[_0x896585(0x620)]();else{function _0x17f4db(){const _0x53fa52=_0x896585;return this[_0x53fa52(0x45f)]()?this[_0x53fa52(0x55a)]():_0x1a6bb2[_0x53fa52(0x54f)][_0x53fa52(0x569)][_0x53fa52(0x32c)][_0x53fa52(0x3a3)];}}}else{if('uldjq'!==_0x896585(0x3b4))return VisuMZ['ItemsEquipsCore']['Scene_Shop_buyWindowRect'][_0x896585(0x36c)](this);else{function _0x1fd384(){const _0x4273a0=_0x896585;_0x4e0b8c[_0x4273a0(0x54f)][_0x4273a0(0x24f)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x4273a0(0x3ec)]();}}}},Scene_Shop['prototype']['buyWindowRectItemsEquipsCore']=function(){const _0x1318b6=_0x20768d,_0x3dc797=this[_0x1318b6(0x640)]['y']+this[_0x1318b6(0x640)][_0x1318b6(0x61d)],_0x2b734e=Graphics[_0x1318b6(0x3ab)]-this[_0x1318b6(0x564)](),_0x5f03e2=this[_0x1318b6(0x416)]()-this[_0x1318b6(0x640)]['height'],_0xdb1a1a=this[_0x1318b6(0x4f0)]()?Graphics[_0x1318b6(0x3ab)]-_0x2b734e:0x0;return new Rectangle(_0xdb1a1a,_0x3dc797,_0x2b734e,_0x5f03e2);},VisuMZ['ItemsEquipsCore']['Scene_Shop_createCategoryWindow']=Scene_Shop['prototype'][_0x20768d(0x3d8)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x3d8)]=function(){const _0x36fb11=_0x20768d;VisuMZ[_0x36fb11(0x54f)][_0x36fb11(0x56c)][_0x36fb11(0x36c)](this),this['isUseModernControls']()&&this[_0x36fb11(0x209)]();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x242)]=Scene_Shop['prototype'][_0x20768d(0x318)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x318)]=function(){const _0x18bbab=_0x20768d;if(this[_0x18bbab(0x45f)]()){if(_0x18bbab(0x4fa)!==_0x18bbab(0x4fa)){function _0x5868c5(){const _0x3bfc0d=_0x18bbab;if(this[_0x3bfc0d(0x20f)]()&&_0x4b052d[_0x3bfc0d(0x40c)]())this[_0x3bfc0d(0x46d)](![]);else _0x56c22b[_0x3bfc0d(0x201)]()&&this[_0x3bfc0d(0x46d)](!![]);_0x5332fe[_0x3bfc0d(0x479)]()&&this['onTouchOk']();}}else return this[_0x18bbab(0x4d4)]();}else{if('IkLyn'===_0x18bbab(0x663))return VisuMZ[_0x18bbab(0x54f)][_0x18bbab(0x242)][_0x18bbab(0x36c)](this);else{function _0x1486a8(){const _0x1f026a=_0x18bbab;return _0x39695c[_0x1f026a(0x434)];}}}},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x4d4)]=function(){const _0xd07e45=_0x20768d,_0x121cc7=this[_0xd07e45(0x640)]['y'],_0x2e45f8=this[_0xd07e45(0x640)][_0xd07e45(0x341)],_0x181b9f=this[_0xd07e45(0x2f0)](0x1,!![]),_0x48a36f=this[_0xd07e45(0x4f0)]()?Graphics[_0xd07e45(0x3ab)]-_0x2e45f8:0x0;return new Rectangle(_0x48a36f,_0x121cc7,_0x2e45f8,_0x181b9f);},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x209)]=function(){const _0x5c68f8=_0x20768d;delete this[_0x5c68f8(0x4cd)]['_handlers']['ok'],delete this[_0x5c68f8(0x4cd)][_0x5c68f8(0x4bc)][_0x5c68f8(0x21d)];},VisuMZ[_0x20768d(0x54f)]['Scene_Shop_createSellWindow']=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x53d)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x53d)]=function(){const _0x2715cd=_0x20768d;VisuMZ[_0x2715cd(0x54f)][_0x2715cd(0x1f9)][_0x2715cd(0x36c)](this);if(this[_0x2715cd(0x45f)]()){if('xjJzP'===_0x2715cd(0x5b4)){function _0x515823(){const _0x5b7679=_0x2715cd;_0x9827d4[_0x5b7679(0x3c3)]&&this[_0x5b7679(0x1d6)](_0x227c59,_0x2e3864['x'],_0x4cdd3c['y']+0x2);_0x6ee0ec['x']+=_0x497c06[_0x5b7679(0x23e)](_0x93a5f7[_0x5b7679(0x2fb)]*this[_0x5b7679(0x408)]());if(this[_0x5b7679(0x408)]()===0x1)_0x2bde44['x']+=0x4;}}else this[_0x2715cd(0x487)]();}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x2bb)]=Scene_Shop[_0x20768d(0x41b)]['sellWindowRect'],Scene_Shop['prototype']['sellWindowRect']=function(){const _0xa32909=_0x20768d;return this[_0xa32909(0x45f)]()?this[_0xa32909(0x4fd)]():VisuMZ[_0xa32909(0x54f)]['Scene_Shop_sellWindowRect'][_0xa32909(0x36c)](this);},Scene_Shop['prototype']['sellWindowRectItemsEquipsCore']=function(){const _0x4f730a=_0x20768d,_0x57259c=this[_0x4f730a(0x4cd)]['y']+this[_0x4f730a(0x4cd)]['height'],_0x2f51e4=Graphics['boxWidth']-this[_0x4f730a(0x564)](),_0xb10854=this['mainAreaHeight']()-this['_categoryWindow'][_0x4f730a(0x61d)],_0x245188=this[_0x4f730a(0x4f0)]()?Graphics['boxWidth']-_0x2f51e4:0x0;return new Rectangle(_0x245188,_0x57259c,_0x2f51e4,_0xb10854);},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x487)]=function(){const _0x413d0f=_0x20768d;this[_0x413d0f(0x528)][_0x413d0f(0x658)](this[_0x413d0f(0x5f1)]);},Scene_Shop['prototype'][_0x20768d(0x564)]=function(){const _0x54dfb0=_0x20768d;return VisuMZ[_0x54dfb0(0x54f)]['Settings'][_0x54dfb0(0x319)][_0x54dfb0(0x331)];},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x646)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x2a0)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x2a0)]=function(){const _0x3e15c4=_0x20768d;VisuMZ[_0x3e15c4(0x54f)][_0x3e15c4(0x646)][_0x3e15c4(0x36c)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x3e15c4(0x5f1)][_0x3e15c4(0x3bb)](),this[_0x3e15c4(0x528)][_0x3e15c4(0x421)]();},VisuMZ['ItemsEquipsCore'][_0x20768d(0x518)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x661)],Scene_Shop['prototype']['commandBuy']=function(){const _0x214395=_0x20768d;VisuMZ['ItemsEquipsCore'][_0x214395(0x518)][_0x214395(0x36c)](this),this[_0x214395(0x45f)]()&&this[_0x214395(0x362)]();},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x362)]=function(){const _0x1c4a93=_0x20768d;this['_buyWindowLastIndex']=this[_0x1c4a93(0x541)]||0x0,this[_0x1c4a93(0x3a6)][_0x1c4a93(0x3cb)](this['_buyWindowLastIndex']);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x65e)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x655)],Scene_Shop[_0x20768d(0x41b)]['commandSell']=function(){const _0x3c0898=_0x20768d;VisuMZ[_0x3c0898(0x54f)]['Scene_Shop_commandSell'][_0x3c0898(0x36c)](this);this[_0x3c0898(0x45f)]()&&this[_0x3c0898(0x641)]();if(this['isUseModernControls']()){if('bjTHx'===_0x3c0898(0x326)){function _0x968424(){const _0x2e93fd=_0x3c0898;_0x56d988[_0x2e93fd(0x54f)][_0x2e93fd(0x534)][_0x2e93fd(0x36c)](this),this[_0x2e93fd(0x3b6)]();}}else this[_0x3c0898(0x4cd)][_0x3c0898(0x3cb)](0x0),this['onCategoryOk']();}},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x641)]=function(){const _0x25c907=_0x20768d;this[_0x25c907(0x3a6)]['hide'](),this[_0x25c907(0x640)]['hide']();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x24f)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x625)],Scene_Shop[_0x20768d(0x41b)]['onBuyCancel']=function(){const _0x33d490=_0x20768d;VisuMZ[_0x33d490(0x54f)][_0x33d490(0x24f)][_0x33d490(0x36c)](this);if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x33d490(0x554)===_0x33d490(0x580)){function _0x2b3048(){const _0x4c8ce1=_0x33d490,_0x14c597=this[_0x4c8ce1(0x4f0)]()?this[_0x4c8ce1(0x564)]():0x0,_0x1bafa5=this[_0x4c8ce1(0x4cd)]['y']+this[_0x4c8ce1(0x4cd)]['height'],_0x447bf5=_0x2c6454[_0x4c8ce1(0x3ab)]-this[_0x4c8ce1(0x564)](),_0x2b5b74=this[_0x4c8ce1(0x3dd)]()-_0x1bafa5;return new _0x42ba3b(_0x14c597,_0x1bafa5,_0x447bf5,_0x2b5b74);}}else this[_0x33d490(0x3ec)]();}},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x3ec)]=function(){const _0x1f5d6d=_0x20768d;this['_buyWindowLastIndex']=this[_0x1f5d6d(0x3a6)]['index'](),this[_0x1f5d6d(0x3a6)][_0x1f5d6d(0x3bb)](),this[_0x1f5d6d(0x3a6)][_0x1f5d6d(0x52e)](),this[_0x1f5d6d(0x3a6)]['smoothScrollTo'](0x0,0x0),this[_0x1f5d6d(0x5f1)][_0x1f5d6d(0x3bb)](),this[_0x1f5d6d(0x4c2)][_0x1f5d6d(0x4b7)]();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x337)]=Scene_Shop['prototype'][_0x20768d(0x5d8)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x5d8)]=function(){const _0x45994b=_0x20768d;VisuMZ[_0x45994b(0x54f)][_0x45994b(0x337)][_0x45994b(0x36c)](this),this[_0x45994b(0x45f)]()&&this[_0x45994b(0x3aa)]();},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x3aa)]=function(){const _0x32b5b4=_0x20768d;this[_0x32b5b4(0x3a6)][_0x32b5b4(0x3bb)](),this['_commandWindow'][_0x32b5b4(0x3bb)]();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x4d9)]=Scene_Shop[_0x20768d(0x41b)]['onSellOk'],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x538)]=function(){const _0x44e33e=_0x20768d;VisuMZ[_0x44e33e(0x54f)][_0x44e33e(0x4d9)]['call'](this),this[_0x44e33e(0x45f)]()&&this['onSellOkItemsEquipsCore']();},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x2a3)]=function(){const _0x307e46=_0x20768d;this[_0x307e46(0x4cd)]['show']();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x340)]=Scene_Shop[_0x20768d(0x41b)]['onSellCancel'],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x4b3)]=function(){const _0x120a1a=_0x20768d;VisuMZ[_0x120a1a(0x54f)][_0x120a1a(0x340)][_0x120a1a(0x36c)](this);this[_0x120a1a(0x430)]()&&this['onCategoryCancel']();if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x120a1a(0x52b)!==_0x120a1a(0x52b)){function _0x37eb22(){const _0x2d7e8c=_0x120a1a;return _0x3c373a[_0x2d7e8c(0x54f)][_0x2d7e8c(0x569)][_0x2d7e8c(0x47c)][_0x2d7e8c(0x2b3)];}}else this[_0x120a1a(0x4c2)][_0x120a1a(0x4b7)]();}},VisuMZ[_0x20768d(0x54f)]['Scene_Shop_sellingPrice']=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x2a1)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x2a1)]=function(){const _0x42afe1=_0x20768d;let _0x5c068e=this[_0x42afe1(0x28e)]();const _0x5bc43b=this[_0x42afe1(0x37b)];return _0x5c068e=VisuMZ[_0x42afe1(0x54f)]['Settings']['ShopScene'][_0x42afe1(0x5f2)][_0x42afe1(0x36c)](this,_0x5bc43b,_0x5c068e),_0x5c068e;},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x28e)]=function(){const _0x35d8c6=_0x20768d;if(!this[_0x35d8c6(0x37b)]){if(_0x35d8c6(0x4ed)===_0x35d8c6(0x4ed))return 0x0;else{function _0x13152f(){const _0x2d2c4e=_0x35d8c6;_0x45796a=_0x90d9c2[_0x2d2c4e(0x4bb)][_0x418631(_0x327a28['$1'])]||'';}}}else{if(this[_0x35d8c6(0x37b)][_0x35d8c6(0x38a)][_0x35d8c6(0x449)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if('zFWHL'===_0x35d8c6(0x586)){const _0x1c39b0=String(RegExp['$1']);let _0x334070=this['_item'],_0x22fe8f=_0x334070[_0x35d8c6(0x590)]*this[_0x35d8c6(0x60e)]();try{if(_0x35d8c6(0x505)!==_0x35d8c6(0x361))eval(_0x1c39b0);else{function _0x5ba24d(){const _0x4992d0=_0x35d8c6;if(!_0x4cbd11)return![];if(!_0x1b08c3['ItemsEquipsCore'][_0x4992d0(0x24a)][_0x4992d0(0x36c)](this,_0x153c50))return![];if(!this[_0x4992d0(0x4fc)](_0x5d74fb))return![];if(!this['meetsItemConditionsJS'](_0x10b18c))return![];return!![];}}}catch(_0x33e33f){if(_0x35d8c6(0x5bf)!==_0x35d8c6(0x2fd)){if($gameTemp['isPlaytest']())console[_0x35d8c6(0x400)](_0x33e33f);}else{function _0x445c60(){const _0x3f81de=_0x35d8c6,_0x44a90d=this['_itemData'][_0x3f81de(0x3e1)][_0x583afd],_0x403f79=_0x6417b8[_0x3f81de(0x41b)]['buffIconIndex'](_0x44a90d,_0x1ac71d);if(_0x403f79>0x0){_0x265ab1+='\x5cI[%1]'['format'](_0x403f79),_0x5768c4++;if(_0x4f371e>=_0x257c57)return _0x2f88c2;}}}}if(isNaN(_0x22fe8f))_0x22fe8f=0x0;return Math[_0x35d8c6(0x465)](_0x22fe8f);}else{function _0x13b73b(){const _0x5b103e=_0x35d8c6;!this[_0x5b103e(0x4e8)]()&&_0x516266[_0x5b103e(0x41b)]['processCursorMoveModernControls'][_0x5b103e(0x36c)](this);}}}else return this[_0x35d8c6(0x37b)]['note'][_0x35d8c6(0x449)](/<SELL PRICE:[ ](\d+)>/i)?parseInt(RegExp['$1']):Math['floor'](this['_item'][_0x35d8c6(0x590)]*this['sellPriceRate']());}},Scene_Shop['prototype'][_0x20768d(0x60e)]=function(){const _0x1e3dc4=_0x20768d;return VisuMZ[_0x1e3dc4(0x54f)][_0x1e3dc4(0x569)]['ShopScene'][_0x1e3dc4(0x4a9)];},Scene_Shop[_0x20768d(0x41b)]['buttonAssistItemListRequirement']=function(){const _0x5847ec=_0x20768d;if(!this[_0x5847ec(0x3f2)]())return![];if(!this['isUseModernControls']())return![];if(!this[_0x5847ec(0x528)])return![];if(!this['_sellWindow'][_0x5847ec(0x5c6)])return![];return this[_0x5847ec(0x3f2)]()&&this['isUseModernControls']();},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x1e0)]=function(){const _0x329215=_0x20768d;if(this[_0x329215(0x2cb)]()){if(_0x329215(0x3c8)===_0x329215(0x3c8))return this['_sellWindow']['maxCols']()===0x1?TextManager[_0x329215(0x525)](_0x329215(0x582),_0x329215(0x5c2)):TextManager[_0x329215(0x525)](_0x329215(0x595),'pagedown');else{function _0x140454(){const _0x163151=_0x329215,_0xfb4647=_0x36ae9f['x']+_0x59a559[_0x163151(0x465)]((_0x2bce95[_0x163151(0x341)]-_0x4a8e3c)/0x2);this[_0x163151(0x1f5)](_0x2056b5,_0xfb4647,_0x31ada4['y'],_0x5996fa);}}}else{if(this['_numberWindow']&&this[_0x329215(0x4a8)]['active'])return TextManager['getInputMultiButtonStrings']('left',_0x329215(0x5c2));}return Scene_MenuBase[_0x329215(0x41b)]['buttonAssistKey1'][_0x329215(0x36c)](this);},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x54a)]=function(){const _0x885ef8=_0x20768d;if(this[_0x885ef8(0x4a8)]&&this[_0x885ef8(0x4a8)][_0x885ef8(0x5c6)])return TextManager['getInputMultiButtonStrings']('up',_0x885ef8(0x3b9));return Scene_MenuBase[_0x885ef8(0x41b)][_0x885ef8(0x54a)][_0x885ef8(0x36c)](this);},Scene_Shop['prototype'][_0x20768d(0x20d)]=function(){const _0x27bd5a=_0x20768d;if(this[_0x27bd5a(0x2cb)]()){if(_0x27bd5a(0x392)!=='fboqv'){function _0x3a8c2c(){const _0x15203b=_0x27bd5a;return _0x5943e3[_0x15203b(0x525)]('up',_0x15203b(0x3b9));}}else return VisuMZ[_0x27bd5a(0x54f)][_0x27bd5a(0x569)][_0x27bd5a(0x47c)]['buttonAssistCategory'];}else{if(this[_0x27bd5a(0x4a8)]&&this[_0x27bd5a(0x4a8)][_0x27bd5a(0x5c6)]){if(_0x27bd5a(0x44f)==='QTRqF')return VisuMZ[_0x27bd5a(0x54f)][_0x27bd5a(0x569)][_0x27bd5a(0x2f4)]['buttonAssistSmallIncrement'];else{function _0x149042(){const _0x33b009=_0x27bd5a;return this[_0x33b009(0x3c5)]()<=0x1?_0x503114[_0x33b009(0x41b)]['colSpacing'][_0x33b009(0x36c)](this):_0xc88d2a[_0x33b009(0x54f)][_0x33b009(0x5dd)][_0x33b009(0x36c)](this);}}}}return Scene_MenuBase[_0x27bd5a(0x41b)]['buttonAssistText1'][_0x27bd5a(0x36c)](this);},Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x291)]=function(){const _0xa664bd=_0x20768d;if(this[_0xa664bd(0x4a8)]&&this[_0xa664bd(0x4a8)][_0xa664bd(0x5c6)])return VisuMZ[_0xa664bd(0x54f)][_0xa664bd(0x569)][_0xa664bd(0x2f4)][_0xa664bd(0x283)];return Scene_MenuBase[_0xa664bd(0x41b)][_0xa664bd(0x291)][_0xa664bd(0x36c)](this);},Scene_Shop['prototype'][_0x20768d(0x4e7)]=function(){const _0x2b682e=_0x20768d;if(!SceneManager['isSceneShop']())return;const _0x2d0278=VisuMZ['ItemsEquipsCore'][_0x2b682e(0x569)][_0x2b682e(0x2f4)];if(_0x2d0278[_0x2b682e(0x485)]){if(_0x2b682e(0x55b)===_0x2b682e(0x55b))$gameSwitches[_0x2b682e(0x4e6)](_0x2d0278[_0x2b682e(0x485)],![]);else{function _0x1043b2(){const _0x227f91=_0x2b682e;if(this[_0x227f91(0x4a8)]&&this[_0x227f91(0x4a8)][_0x227f91(0x5c6)])return _0x5f2285[_0x227f91(0x54f)][_0x227f91(0x569)][_0x227f91(0x2f4)][_0x227f91(0x283)];return _0x10ed82[_0x227f91(0x41b)][_0x227f91(0x291)][_0x227f91(0x36c)](this);}}}_0x2d0278[_0x2b682e(0x3d4)]&&$gameSwitches[_0x2b682e(0x4e6)](_0x2d0278['SwitchSell'],![]);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x3d0)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x566)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x566)]=function(_0x4dbc0b){const _0x3769ed=_0x20768d;VisuMZ[_0x3769ed(0x54f)][_0x3769ed(0x3d0)][_0x3769ed(0x36c)](this,_0x4dbc0b);if(_0x4dbc0b<=0x0)return;const _0x17daf8=VisuMZ[_0x3769ed(0x54f)][_0x3769ed(0x569)][_0x3769ed(0x2f4)];_0x17daf8[_0x3769ed(0x485)]&&$gameSwitches[_0x3769ed(0x4e6)](_0x17daf8[_0x3769ed(0x485)],!![]);},VisuMZ['ItemsEquipsCore'][_0x20768d(0x1dd)]=Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x56f)],Scene_Shop[_0x20768d(0x41b)][_0x20768d(0x56f)]=function(_0x2a125f){const _0x5e91cb=_0x20768d;VisuMZ[_0x5e91cb(0x54f)][_0x5e91cb(0x1dd)][_0x5e91cb(0x36c)](this,_0x2a125f);if(_0x2a125f<=0x0)return;const _0x1bbc5b=VisuMZ[_0x5e91cb(0x54f)]['Settings'][_0x5e91cb(0x2f4)];if(_0x1bbc5b['SwitchBuy']){if(_0x5e91cb(0x56a)==='KKgUE'){function _0x546ba1(){const _0x277731=_0x5e91cb,_0x5ce1b7=_0x4aafbb[_0x277731(0x5a1)][_0x277731(0x452)];_0x5ce1b7&&(this[_0x277731(0x293)](this[_0x277731(0x298)]())?(this[_0x277731(0x54d)](),this[_0x277731(0x421)]()):this[_0x277731(0x547)]());}}else $gameSwitches[_0x5e91cb(0x4e6)](_0x1bbc5b[_0x5e91cb(0x3d4)],!![]);}};function Sprite_NewLabel(){const _0x185393=_0x20768d;this[_0x185393(0x1e1)](...arguments);}Sprite_NewLabel[_0x20768d(0x41b)]=Object['create'](Sprite[_0x20768d(0x41b)]),Sprite_NewLabel[_0x20768d(0x41b)][_0x20768d(0x214)]=Sprite_NewLabel,Sprite_NewLabel['prototype'][_0x20768d(0x1e1)]=function(){const _0x37423d=_0x20768d;Sprite[_0x37423d(0x41b)][_0x37423d(0x1e1)][_0x37423d(0x36c)](this),this[_0x37423d(0x312)]();},Sprite_NewLabel[_0x20768d(0x41b)][_0x20768d(0x312)]=function(){const _0x331830=_0x20768d,_0x4190bf=ImageManager['iconWidth'],_0x149673=ImageManager[_0x331830(0x65c)];this['bitmap']=new Bitmap(_0x4190bf,_0x149673),this['drawNewLabelIcon'](),this[_0x331830(0x54c)]();},Sprite_NewLabel[_0x20768d(0x41b)][_0x20768d(0x5c3)]=function(){const _0x99ea8=_0x20768d,_0x36be01=VisuMZ[_0x99ea8(0x54f)][_0x99ea8(0x569)][_0x99ea8(0x235)][_0x99ea8(0x514)];if(_0x36be01<=0x0)return;const _0x2644fe=ImageManager[_0x99ea8(0x37d)](_0x99ea8(0x617)),_0x1c3ca8=ImageManager[_0x99ea8(0x2fb)],_0x38cc17=ImageManager[_0x99ea8(0x65c)],_0x2f8847=_0x36be01%0x10*_0x1c3ca8,_0x4c80c4=Math[_0x99ea8(0x465)](_0x36be01/0x10)*_0x38cc17;this[_0x99ea8(0x358)]['blt'](_0x2644fe,_0x2f8847,_0x4c80c4,_0x1c3ca8,_0x38cc17,0x0,0x0);},Sprite_NewLabel[_0x20768d(0x41b)][_0x20768d(0x54c)]=function(){const _0x3f13e4=_0x20768d,_0x336a3f=VisuMZ['ItemsEquipsCore'][_0x3f13e4(0x569)][_0x3f13e4(0x235)],_0x220fe1=_0x336a3f[_0x3f13e4(0x1f3)];if(_0x220fe1==='')return;const _0x4d07b5=ImageManager[_0x3f13e4(0x2fb)],_0x35a389=ImageManager[_0x3f13e4(0x65c)];this[_0x3f13e4(0x358)]['fontFace']=_0x336a3f[_0x3f13e4(0x224)]||$gameSystem[_0x3f13e4(0x466)](),this[_0x3f13e4(0x358)][_0x3f13e4(0x230)]=this['getTextColor'](),this['bitmap']['fontSize']=_0x336a3f[_0x3f13e4(0x4a2)],this[_0x3f13e4(0x358)]['drawText'](_0x220fe1,0x0,_0x35a389/0x2,_0x4d07b5,_0x35a389/0x2,'center');},Sprite_NewLabel[_0x20768d(0x41b)][_0x20768d(0x27e)]=function(){const _0x2339c8=_0x20768d,_0x2ff567=VisuMZ[_0x2339c8(0x54f)][_0x2339c8(0x569)][_0x2339c8(0x235)][_0x2339c8(0x313)];return _0x2ff567[_0x2339c8(0x449)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x2339c8(0x230)](_0x2ff567);},Window_Base[_0x20768d(0x41b)]['drawItemName']=function(_0x3960fd,_0x1389a0,_0x2916fe,_0x5d589c){const _0x535d2b=_0x20768d;if(_0x3960fd){if(_0x535d2b(0x1ff)!=='XBWBc'){const _0x5ea1e3=_0x2916fe+(this[_0x535d2b(0x5e4)]()-ImageManager['iconHeight'])/0x2,_0x2d5419=ImageManager[_0x535d2b(0x2fb)]+0x4,_0x4279d7=Math[_0x535d2b(0x5d7)](0x0,_0x5d589c-_0x2d5419);this['changeTextColor'](ColorManager[_0x535d2b(0x3b5)](_0x3960fd)),this[_0x535d2b(0x1d6)](_0x3960fd[_0x535d2b(0x384)],_0x1389a0,_0x5ea1e3),this[_0x535d2b(0x4c1)](_0x3960fd['name'],_0x1389a0+_0x2d5419,_0x2916fe,_0x4279d7),this[_0x535d2b(0x431)]();}else{function _0x41ddf6(){const _0x1851fe=_0x535d2b,_0x1d00cd=_0x4cffdd[_0x1851fe(0x32b)](this);_0x1d00cd[_0x1851fe(0x3fe)]=!![],this['_equips'][_0x144c58][_0x1851fe(0x356)](null),this['equipAdjustHpMp'](_0x1d00cd);}}}},Window_Base['prototype'][_0x20768d(0x410)]=function(_0xcb0762,_0x5343e3,_0x4f30be,_0x1ffcc4){const _0xd8a97e=_0x20768d;if(this['isDrawItemNumber'](_0xcb0762)){if(_0xd8a97e(0x1d2)!==_0xd8a97e(0x476)){this['resetFontSettings']();const _0x21eb69=VisuMZ[_0xd8a97e(0x54f)][_0xd8a97e(0x569)][_0xd8a97e(0x47c)],_0x45d6f3=_0x21eb69[_0xd8a97e(0x460)],_0x3abbec=_0x45d6f3[_0xd8a97e(0x60a)]($gameParty[_0xd8a97e(0x50d)](_0xcb0762));this[_0xd8a97e(0x553)][_0xd8a97e(0x290)]=_0x21eb69[_0xd8a97e(0x5ff)],this['drawText'](_0x3abbec,_0x5343e3,_0x4f30be,_0x1ffcc4,_0xd8a97e(0x5c2)),this[_0xd8a97e(0x243)]();}else{function _0xb86f79(){const _0x38c06b=_0xd8a97e;return _0x4868db['ItemsEquipsCore']['Scene_Equip_itemWindowRect'][_0x38c06b(0x36c)](this);}}}},Window_Base[_0x20768d(0x41b)][_0x20768d(0x5b6)]=function(_0x30ffe8){const _0x4b35c8=_0x20768d;if(DataManager[_0x4b35c8(0x391)](_0x30ffe8))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base['prototype'][_0x20768d(0x5ca)]=function(_0x3d72de,_0xb9fa12,_0x12d0c4,_0x3363d0,_0x3bad39){const _0x4b0709=_0x20768d;_0x3bad39=Math['max'](_0x3bad39||0x1,0x1);while(_0x3bad39--){_0x3363d0=_0x3363d0||this[_0x4b0709(0x5e4)](),this[_0x4b0709(0x25f)][_0x4b0709(0x2e6)]=0xa0;const _0x589603=ColorManager['gaugeBackColor']();this[_0x4b0709(0x25f)][_0x4b0709(0x1e3)](_0x3d72de+0x1,_0xb9fa12+0x1,_0x12d0c4-0x2,_0x3363d0-0x2,_0x589603),this[_0x4b0709(0x25f)][_0x4b0709(0x2e6)]=0xff;}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x373)]=Window_Selectable['prototype'][_0x20768d(0x1e1)],Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x1e1)]=function(_0x4f475e){const _0x4ce888=_0x20768d;this[_0x4ce888(0x5da)](),VisuMZ[_0x4ce888(0x54f)][_0x4ce888(0x373)][_0x4ce888(0x36c)](this,_0x4f475e);},Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x5da)]=function(){const _0x13bba4=_0x20768d;this[_0x13bba4(0x5af)]={},this[_0x13bba4(0x316)]=0xff,this[_0x13bba4(0x489)]=VisuMZ[_0x13bba4(0x54f)]['Settings']['New'][_0x13bba4(0x36f)],this['_newLabelOpacityUpperLimit']=VisuMZ[_0x13bba4(0x54f)][_0x13bba4(0x569)][_0x13bba4(0x235)][_0x13bba4(0x480)];},Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x2bc)]=function(){return![];},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x1ed)]=Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x249)],Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x249)]=function(_0x4db35c){const _0x4e59fd=_0x20768d;VisuMZ[_0x4e59fd(0x54f)][_0x4e59fd(0x1ed)]['call'](this,_0x4db35c);if(this['isShowNew']())this[_0x4e59fd(0x644)](_0x4db35c);},Window_Selectable[_0x20768d(0x41b)]['clearNewLabelFromItem']=function(_0x56b740){const _0x2fd148=_0x20768d;if(!_0x56b740)return;$gameParty[_0x2fd148(0x5a9)](_0x56b740);let _0x45d62d='';if(DataManager['isItem'](_0x56b740)){if(_0x2fd148(0x520)===_0x2fd148(0x24b)){function _0x400fc3(){const _0x2e4cbf=_0x2fd148;this[_0x2e4cbf(0x58b)](_0x50db23[_0x2e4cbf(0x260)](_0x3f9d6b)),_0x37c4dd=(_0x2dab80>0x0?_0x2e4cbf(0x37e):_0x2e4cbf(0x548))[_0x2e4cbf(0x60a)](_0x1b0ff9),this[_0x2e4cbf(0x4c1)](_0x560f0e,_0x51c333+_0x413113,_0x18dd99,_0xa2bc93,_0x2e4cbf(0x582));}}else _0x45d62d=_0x2fd148(0x3ea)[_0x2fd148(0x60a)](_0x56b740['id']);}else{if(DataManager[_0x2fd148(0x4ad)](_0x56b740)){if(_0x2fd148(0x3dc)!==_0x2fd148(0x3f5))_0x45d62d=_0x2fd148(0x231)['format'](_0x56b740['id']);else{function _0x560d78(){const _0x2f2fd5=_0x2fd148;this[_0x2f2fd5(0x62d)]=![];if(this[_0x2f2fd5(0x2e0)]()){const _0x552ca5=this[_0x2f2fd5(0x298)](),_0x2574e5=this[_0x2f2fd5(0x29c)]();_0x2574e5>=0x0&&_0x2574e5!==this[_0x2f2fd5(0x298)]()&&this['select'](_0x2574e5),_0x4fbbf5&&this[_0x2f2fd5(0x298)]()!==_0x552ca5&&this['playCursorSound']();}}}}else{if(DataManager['isArmor'](_0x56b740)){if(_0x2fd148(0x664)!==_0x2fd148(0x4ac))_0x45d62d=_0x2fd148(0x5d0)['format'](_0x56b740['id']);else{function _0x3813fb(){const _0x51b594=_0x2fd148,_0x397fb2=_0x3938ce['x']+_0x80e007['floor']((_0x3f671a[_0x51b594(0x341)]-_0x36f119)/0x2);this[_0x51b594(0x1f5)](_0x55805d,_0x397fb2,_0x3bdac6['y'],_0x35cd23);}}}else return;}}const _0xf576a=this['_newLabelSprites'][_0x45d62d];if(_0xf576a)_0xf576a[_0x2fd148(0x4b7)]();},VisuMZ['ItemsEquipsCore'][_0x20768d(0x5a7)]=Window_Selectable['prototype'][_0x20768d(0x53c)],Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x53c)]=function(){const _0x5eef18=_0x20768d;this[_0x5eef18(0x226)](),VisuMZ[_0x5eef18(0x54f)]['Window_Selectable_refresh'][_0x5eef18(0x36c)](this);},Window_Selectable['prototype'][_0x20768d(0x226)]=function(){const _0x35f4ad=_0x20768d;for(const _0x27515a of Object[_0x35f4ad(0x5c1)](this[_0x35f4ad(0x5af)])){_0x27515a[_0x35f4ad(0x4b7)]();}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x423)]=Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x2c4)],Window_Selectable[_0x20768d(0x41b)]['update']=function(){const _0x254ed0=_0x20768d;this[_0x254ed0(0x5c9)](),VisuMZ[_0x254ed0(0x54f)][_0x254ed0(0x423)][_0x254ed0(0x36c)](this);},Window_Selectable[_0x20768d(0x41b)]['updateNewLabelOpacity']=function(){const _0x2f3e1b=_0x20768d;if(!this[_0x2f3e1b(0x2bc)]())return;const _0x873ad5=this[_0x2f3e1b(0x5f4)];this[_0x2f3e1b(0x316)]+=this['_newLabelOpacityChange'];(this[_0x2f3e1b(0x316)]>=_0x873ad5||this[_0x2f3e1b(0x316)]<=0x0)&&(this[_0x2f3e1b(0x489)]*=-0x1);this[_0x2f3e1b(0x316)]=this[_0x2f3e1b(0x316)][_0x2f3e1b(0x560)](0x0,_0x873ad5);for(const _0x5c1c33 of Object[_0x2f3e1b(0x5c1)](this[_0x2f3e1b(0x5af)])){if(_0x2f3e1b(0x3ac)===_0x2f3e1b(0x3ac))_0x5c1c33[_0x2f3e1b(0x3a8)]=this[_0x2f3e1b(0x316)];else{function _0x449590(){return![];}}}},Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x43c)]=function(_0x569654){const _0x4e89e0=_0x20768d,_0x4c7ebf=this[_0x4e89e0(0x5af)];if(_0x4c7ebf[_0x569654])return _0x4c7ebf[_0x569654];else{const _0x10617a=new Sprite_NewLabel();return _0x4c7ebf[_0x569654]=_0x10617a,this[_0x4e89e0(0x2b2)](_0x10617a),_0x10617a;}},Window_Selectable[_0x20768d(0x41b)][_0x20768d(0x49e)]=function(_0x4a805f,_0xd1f1f4,_0x4c5d22){const _0x1add44=_0x20768d;let _0x500706='';if(DataManager[_0x1add44(0x3f0)](_0x4a805f))_0x500706='item-%1'[_0x1add44(0x60a)](_0x4a805f['id']);else{if(DataManager[_0x1add44(0x4ad)](_0x4a805f))_0x500706=_0x1add44(0x231)[_0x1add44(0x60a)](_0x4a805f['id']);else{if(DataManager[_0x1add44(0x252)](_0x4a805f)){if(_0x1add44(0x3cd)==='WlPXQ'){function _0x56553c(){const _0x20325d=_0x1add44;return _0x357d7b[_0x20325d(0x329)]&&_0x568391[_0x20325d(0x41a)][_0x20325d(0x383)]('['+_0x26555d+']');}}else _0x500706=_0x1add44(0x5d0)[_0x1add44(0x60a)](_0x4a805f['id']);}else return;}}const _0x23647a=this[_0x1add44(0x43c)](_0x500706);_0x23647a[_0x1add44(0x613)](_0xd1f1f4,_0x4c5d22),_0x23647a[_0x1add44(0x3bb)](),_0x23647a[_0x1add44(0x3a8)]=this[_0x1add44(0x316)];},Window_ItemCategory[_0x20768d(0x57a)]=VisuMZ['ItemsEquipsCore'][_0x20768d(0x569)][_0x20768d(0x239)]['List'],Window_ItemCategory[_0x20768d(0x2c3)]=[_0x20768d(0x38c),_0x20768d(0x4d0),'Nonconsumable',_0x20768d(0x267),_0x20768d(0x26d),_0x20768d(0x28d),_0x20768d(0x22d),_0x20768d(0x583)],VisuMZ['ItemsEquipsCore'][_0x20768d(0x4f6)]=Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x1e1)],Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x1e1)]=function(_0xc9374e){const _0x214111=_0x20768d;VisuMZ['ItemsEquipsCore'][_0x214111(0x4f6)][_0x214111(0x36c)](this,_0xc9374e),this['createCategoryNameWindow'](_0xc9374e);},Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x5dc)]=function(_0x40e935){const _0x2d96ee=_0x20768d,_0x5daf36=new Rectangle(0x0,0x0,_0x40e935[_0x2d96ee(0x341)],_0x40e935['height']);this['_categoryNameWindow']=new Window_Base(_0x5daf36),this['_categoryNameWindow'][_0x2d96ee(0x3a8)]=0x0,this[_0x2d96ee(0x5cd)](this[_0x2d96ee(0x65b)]),this[_0x2d96ee(0x405)]();},Window_ItemCategory[_0x20768d(0x41b)]['isUseModernControls']=function(){const _0x2c8e73=_0x20768d;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x2c8e73(0x41b)][_0x2c8e73(0x430)]['call'](this);},Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x473)]=function(){},Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x3b2)]=function(){const _0x58292e=_0x20768d;if(!this['isUseModernControls']())Window_HorzCommand[_0x58292e(0x41b)]['playOkSound']['call'](this);},Window_ItemCategory[_0x20768d(0x41b)]['maxCols']=function(){const _0x3056ea=_0x20768d;return this['_list']?this[_0x3056ea(0x288)]():0x4;},Window_ItemCategory[_0x20768d(0x41b)]['update']=function(){const _0x538558=_0x20768d;Window_HorzCommand[_0x538558(0x41b)]['update'][_0x538558(0x36c)](this);if(this[_0x538558(0x2ab)]){if(_0x538558(0x545)===_0x538558(0x545))this[_0x538558(0x2ab)]['setCategory'](this['currentExt']());else{function _0x2caedd(){const _0xf251d0=_0x538558;return _0x35eccb[_0xf251d0(0x54f)][_0xf251d0(0x569)][_0xf251d0(0x319)][_0xf251d0(0x267)];}}}},Window_ItemCategory[_0x20768d(0x41b)]['processCursorMoveModernControls']=function(){const _0x3190c6=_0x20768d;if(this[_0x3190c6(0x2e0)]()){if(_0x3190c6(0x3d7)==='CbqSY'){function _0xc702d8(){const _0xc5564=_0x3190c6,_0xbf6349=this['statusWindowRect']();this['_statusWindow']=new _0x740f92(_0xbf6349),this[_0xc5564(0x53f)](this['_statusWindow']),this['_itemWindow'][_0xc5564(0x658)](this[_0xc5564(0x5f1)]);const _0x4521a4=_0x2aa55f[_0xc5564(0x54f)][_0xc5564(0x569)][_0xc5564(0x47c)]['ItemMenuStatusBgType'];this[_0xc5564(0x5f1)][_0xc5564(0x50a)](_0x4521a4||0x0);}}else{const _0x2dae1f=this[_0x3190c6(0x298)]();if(this[_0x3190c6(0x2ab)]&&this[_0x3190c6(0x2ab)]['maxCols']()<=0x1){if(Input[_0x3190c6(0x25b)](_0x3190c6(0x5c2))){if(_0x3190c6(0x297)!==_0x3190c6(0x297)){function _0x321aa4(){const _0x522e60=_0x3190c6;if(_0x21ab60){const _0x97fb01=_0x1ab114+(this[_0x522e60(0x5e4)]()-_0xf611aa[_0x522e60(0x65c)])/0x2,_0x45ff7b=_0x76285e[_0x522e60(0x2fb)]+0x4,_0x44abe7=_0xc5bfbe[_0x522e60(0x5d7)](0x0,_0x4feb47-_0x45ff7b);this['changeTextColor'](_0x132285['getItemColor'](_0x5871b8)),this[_0x522e60(0x1d6)](_0x1816b9[_0x522e60(0x384)],_0x20e5a1,_0x97fb01),this[_0x522e60(0x4c1)](_0x587add[_0x522e60(0x254)],_0x6489a3+_0x45ff7b,_0x32cdab,_0x44abe7),this[_0x522e60(0x431)]();}}}else this[_0x3190c6(0x26f)](Input['isTriggered'](_0x3190c6(0x5c2)));}Input[_0x3190c6(0x25b)](_0x3190c6(0x582))&&this[_0x3190c6(0x2d6)](Input['isTriggered'](_0x3190c6(0x582)));}else this[_0x3190c6(0x2ab)]&&this[_0x3190c6(0x2ab)][_0x3190c6(0x3c5)]()>0x1&&(Input[_0x3190c6(0x25b)](_0x3190c6(0x1cf))&&!Input[_0x3190c6(0x2dd)](_0x3190c6(0x1e4))&&this['cursorRight'](Input['isTriggered']('pagedown')),Input[_0x3190c6(0x25b)](_0x3190c6(0x595))&&!Input[_0x3190c6(0x2dd)](_0x3190c6(0x1e4))&&this[_0x3190c6(0x2d6)](Input['isTriggered'](_0x3190c6(0x595))));if(this['index']()!==_0x2dae1f){if(_0x3190c6(0x427)==='fQnxD')this['playCursorSound']();else{function _0x452f29(){const _0x476d94=_0x3190c6;return this[_0x476d94(0x37b)][_0x476d94(0x3e7)];}}}}}},Window_ItemCategory[_0x20768d(0x41b)]['processHandling']=function(){const _0x468f50=_0x20768d;if(this[_0x468f50(0x430)]())return;Window_HorzCommand['prototype'][_0x468f50(0x2c0)][_0x468f50(0x36c)](this);},Window_ItemCategory[_0x20768d(0x41b)]['isHoverEnabled']=function(){const _0x4c9d82=_0x20768d;if(this['isUseModernControls']()){if(_0x4c9d82(0x332)===_0x4c9d82(0x467)){function _0x4fea0d(){const _0xd923e9=_0x4c9d82;if(this[_0xd923e9(0x616)])return 0x0;const _0x364aec=(_0x59275b['isWeapon'](_0x4a0145)?_0xd923e9(0x40a):_0xd923e9(0x336))['format'](_0x29fa26['id']),_0x157708='%1-%2'[_0xd923e9(0x60a)](_0x364aec,_0x4cd511);if(_0x4630c9[_0xd923e9(0x54f)]['paramJS'][_0x157708]){this['_calculatingJSParameters']=!![];const _0x1f3a35=_0x476c47[_0xd923e9(0x54f)][_0xd923e9(0x4f1)][_0x157708][_0xd923e9(0x36c)](this,_0x4d8888,_0x132924);return this[_0xd923e9(0x616)]=![],_0x1f3a35;}else return 0x0;}}else return![];}else return Window_HorzCommand[_0x4c9d82(0x41b)][_0x4c9d82(0x20f)][_0x4c9d82(0x36c)](this);},Window_ItemCategory[_0x20768d(0x41b)]['processTouchModernControls']=function(){const _0x255ab7=_0x20768d;if(this['isOpenAndActive']()){if(TouchInput['isTriggered']()){if(_0x255ab7(0x20c)!==_0x255ab7(0x348))this[_0x255ab7(0x2ee)](!![]);else{function _0x2a92cd(){const _0x48b61a=_0x255ab7;_0x3c6cb8[_0x48b61a(0x54f)]['Scene_Shop_onSellCancel'][_0x48b61a(0x36c)](this),this['isUseModernControls']()&&this['onCategoryCancel'](),this[_0x48b61a(0x45f)]()&&this[_0x48b61a(0x4c2)][_0x48b61a(0x4b7)]();}}}if(TouchInput[_0x255ab7(0x479)]())this[_0x255ab7(0x55c)]();else TouchInput[_0x255ab7(0x35f)]()&&this['onTouchCancel']();}},Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x2ee)]=function(_0x12031c){const _0x2dbd9e=_0x20768d;this['isUseModernControls']()?this[_0x2dbd9e(0x372)](!![]):Window_HorzCommand['prototype'][_0x2dbd9e(0x2ee)]['call'](this,_0x12031c);},Window_ItemCategory[_0x20768d(0x41b)]['onTouchSelectModern']=function(_0x1589c4){const _0x321d3a=_0x20768d;this[_0x321d3a(0x62d)]=![];if(this['isCursorMovable']()){if('MwFEk'!==_0x321d3a(0x327)){const _0x41923d=this[_0x321d3a(0x298)](),_0x270110=this['hitIndex']();if(_0x270110>=0x0&&_0x270110!==this['index']()){if('slJcV'!==_0x321d3a(0x398))this['select'](_0x270110);else{function _0x576e50(){const _0x50f7c5=_0x321d3a;_0x5e44a8[_0x50f7c5(0x54f)][_0x50f7c5(0x4f6)][_0x50f7c5(0x36c)](this,_0x1b39e7),this[_0x50f7c5(0x5dc)](_0x102416);}}}_0x1589c4&&this[_0x321d3a(0x298)]()!==_0x41923d&&this[_0x321d3a(0x469)]();}else{function _0x20785d(){const _0x2b64d5=_0x321d3a;_0x410163['ItemsEquipsCore'][_0x2b64d5(0x337)][_0x2b64d5(0x36c)](this),this[_0x2b64d5(0x45f)]()&&this[_0x2b64d5(0x3aa)]();}}}},Window_ItemCategory['prototype'][_0x20768d(0x315)]=function(){const _0x14c96a=_0x20768d;for(const _0x5f079e of Window_ItemCategory['categoryList']){this['addItemCategory'](_0x5f079e);}this[_0x14c96a(0x305)](this[_0x14c96a(0x298)]());},Window_ItemCategory['prototype'][_0x20768d(0x44b)]=function(_0x432141){const _0x2dd45c=_0x20768d,_0x34b3e1=_0x432141[_0x2dd45c(0x335)],_0x49459d=_0x432141['Icon'],_0x69fe1d=_0x432141[_0x2dd45c(0x31c)]||0x0;if(_0x69fe1d>0x0&&!$gameSwitches['value'](_0x69fe1d))return;let _0x164589='',_0x4457a3=_0x2dd45c(0x3eb),_0x4b40b7=_0x34b3e1;if(_0x34b3e1['match'](/Category:(.*)/i))_0x164589=String(RegExp['$1'])[_0x2dd45c(0x3b0)]();else{if(Window_ItemCategory['categoryItemTypes'][_0x2dd45c(0x383)](_0x34b3e1))_0x164589=VisuMZ[_0x2dd45c(0x54f)][_0x2dd45c(0x569)]['Categories'][_0x34b3e1];else{if([_0x2dd45c(0x515),'RegularItems']['includes'](_0x34b3e1))_0x164589=TextManager[_0x2dd45c(0x342)];else{if(_0x34b3e1===_0x2dd45c(0x1ef)){if(_0x2dd45c(0x567)===_0x2dd45c(0x633)){function _0x153115(){const _0x4231de=_0x2dd45c;_0x390dbb[_0x4231de(0x41b)][_0x4231de(0x5aa)][_0x4231de(0x36c)](this,_0x162776);}}else _0x164589=TextManager[_0x2dd45c(0x251)];}else{if(_0x34b3e1===_0x2dd45c(0x642)){if(_0x2dd45c(0x4f4)!==_0x2dd45c(0x33b))_0x164589=TextManager[_0x2dd45c(0x3bf)];else{function _0x518753(){const _0x20227a=_0x2dd45c;return this[_0x20227a(0x5a1)]&&this[_0x20227a(0x5a1)][_0x20227a(0x214)]===_0xe4fd0;}}}else{if(_0x34b3e1===_0x2dd45c(0x229))_0x164589=TextManager[_0x2dd45c(0x429)];else{if(_0x34b3e1[_0x2dd45c(0x449)](/WTYPE:(\d+)/i)){if(_0x2dd45c(0x5d3)===_0x2dd45c(0x490)){function _0x130da1(){const _0x147d12=_0x2dd45c;if(!this['isOptimizeCommandAdded']())return;const _0x4cb553=this['commandStyle'](),_0x260bf9=_0x4f4805[_0x147d12(0x54f)]['Settings'][_0x147d12(0x32c)][_0x147d12(0x5e9)],_0x413ba5=_0x4cb553===_0x147d12(0x43a)?_0xab914f[_0x147d12(0x506)]:_0x147d12(0x330)[_0x147d12(0x60a)](_0x260bf9,_0x41eb92[_0x147d12(0x506)]),_0x1e376f=this[_0x147d12(0x4d3)]();this[_0x147d12(0x549)](_0x413ba5,_0x147d12(0x506),_0x1e376f);}}else _0x164589=$dataSystem[_0x2dd45c(0x4ec)][Number(RegExp['$1'])]||'';}else{if(_0x34b3e1[_0x2dd45c(0x449)](/ATYPE:(\d+)/i))_0x164589=$dataSystem[_0x2dd45c(0x61e)][Number(RegExp['$1'])]||'';else _0x34b3e1[_0x2dd45c(0x449)](/ETYPE:(\d+)/i)&&(_0x164589=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}_0x49459d>0x0&&this[_0x2dd45c(0x27a)]()!==_0x2dd45c(0x43a)&&(_0x164589=_0x2dd45c(0x330)[_0x2dd45c(0x60a)](_0x49459d,_0x164589)),this[_0x2dd45c(0x549)](_0x164589,_0x4457a3,!![],_0x4b40b7);},Window_ItemCategory[_0x20768d(0x41b)]['itemTextAlign']=function(){const _0x1274c4=_0x20768d;return VisuMZ[_0x1274c4(0x54f)][_0x1274c4(0x569)][_0x1274c4(0x239)][_0x1274c4(0x1e9)];},Window_ItemCategory[_0x20768d(0x41b)]['drawItem']=function(_0x30f630){const _0x308b1e=_0x20768d,_0xcbe85e=this[_0x308b1e(0x60b)](_0x30f630);if(_0xcbe85e==='iconText'){if(_0x308b1e(0x5ab)===_0x308b1e(0x652)){function _0xfdd928(){const _0x3aee23=_0x308b1e,_0x58d65e=this[_0x3aee23(0x4cc)]();this['drawItemKeyData'](_0x58d65e,_0x5cfc93,_0x1979cf,_0x36ba62,!![]),this[_0x3aee23(0x3af)]();const _0x379148=this[_0x3aee23(0x5fb)](),_0x12c82e=_0x118450['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x3aee23(0x37b)][_0x3aee23(0x33e)][_0x3aee23(0x5be)]]);return this[_0x3aee23(0x58b)](_0x12c82e),this[_0x3aee23(0x51f)](_0x379148,_0x19f5a3,_0x27bf45,_0x3d8137,![],_0x3aee23(0x5c2)),this[_0x3aee23(0x5ca)](_0x298e61,_0x183c22,_0x44445e),this[_0x3aee23(0x243)](),!![];}}else this[_0x308b1e(0x34b)](_0x30f630);}else{if(_0xcbe85e===_0x308b1e(0x262))this[_0x308b1e(0x1d1)](_0x30f630);else{if(_0x308b1e(0x435)===_0x308b1e(0x435))Window_HorzCommand[_0x308b1e(0x41b)][_0x308b1e(0x5aa)]['call'](this,_0x30f630);else{function _0x36463(){const _0x1a5d3a=_0x308b1e;_0xcbb4a0['ItemsEquipsCore'][_0x1a5d3a(0x2a7)][_0x1a5d3a(0x36c)](this,_0x55e913),this[_0x1a5d3a(0x245)](_0x540112);}}}}},Window_ItemCategory['prototype'][_0x20768d(0x27a)]=function(){const _0x25a0a9=_0x20768d;return VisuMZ[_0x25a0a9(0x54f)][_0x25a0a9(0x569)]['Categories'][_0x25a0a9(0x3c4)];},Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x60b)]=function(_0x49b4c6){const _0x491e39=_0x20768d;if(_0x49b4c6<0x0)return _0x491e39(0x43a);const _0x255897=this[_0x491e39(0x27a)]();if(_0x255897!==_0x491e39(0x470))return _0x255897;else{if(_0x491e39(0x40e)!==_0x491e39(0x4c5)){const _0x2cdfff=this[_0x491e39(0x4a3)](_0x49b4c6);if(_0x2cdfff[_0x491e39(0x449)](/\\I\[(\d+)\]/i)){const _0x13a2f9=this[_0x491e39(0x1fd)](_0x49b4c6),_0x2f2fe6=this['textSizeEx'](_0x2cdfff)['width'];if(_0x2f2fe6<=_0x13a2f9['width']){if(_0x491e39(0x39e)===_0x491e39(0x5fa)){function _0x1a0c22(){const _0x5ee7a7=_0x491e39;if(_0x313e70[_0x5ee7a7(0x303)]&&_0x575105[_0x5ee7a7(0x434)]!==_0x287c12)return _0x23bc19[_0x5ee7a7(0x434)];else{if(this[_0x5ee7a7(0x45f)]())return this['updatedLayoutStyle']()['match'](/RIGHT/i);else _0x5b377d[_0x5ee7a7(0x41b)][_0x5ee7a7(0x4f0)][_0x5ee7a7(0x36c)](this);}}}else return _0x491e39(0x377);}else{if(_0x491e39(0x65f)!==_0x491e39(0x65f)){function _0xfc87d6(){const _0x3a1bbf=_0x491e39,_0x5a21c3=_0x450275[_0x3a1bbf(0x32b)](this['_actor']);_0x5a21c3[_0x3a1bbf(0x3fe)]=!![],_0x5a21c3[_0x3a1bbf(0x44e)](this[_0x3a1bbf(0x3e4)],this[_0x3a1bbf(0x342)]()),this['_statusWindow'][_0x3a1bbf(0x571)](_0x5a21c3);}}else return _0x491e39(0x262);}}else return _0x491e39(0x43a);}else{function _0x3e88c2(){return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}}}},Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x34b)]=function(_0x477002){const _0x3edd7e=_0x20768d,_0x1c38c0=this[_0x3edd7e(0x1fd)](_0x477002),_0x2a0402=this[_0x3edd7e(0x4a3)](_0x477002),_0x229195=this[_0x3edd7e(0x1d8)](_0x2a0402)[_0x3edd7e(0x341)];this['changePaintOpacity'](this[_0x3edd7e(0x636)](_0x477002));const _0x36c8e6=this['itemTextAlign']();if(_0x36c8e6===_0x3edd7e(0x5c2))this['drawTextEx'](_0x2a0402,_0x1c38c0['x']+_0x1c38c0['width']-_0x229195,_0x1c38c0['y'],_0x229195);else{if(_0x36c8e6===_0x3edd7e(0x420)){const _0xa27c6d=_0x1c38c0['x']+Math['floor']((_0x1c38c0['width']-_0x229195)/0x2);this[_0x3edd7e(0x1f5)](_0x2a0402,_0xa27c6d,_0x1c38c0['y'],_0x229195);}else this[_0x3edd7e(0x1f5)](_0x2a0402,_0x1c38c0['x'],_0x1c38c0['y'],_0x229195);}},Window_ItemCategory['prototype'][_0x20768d(0x1d1)]=function(_0x3897a8){const _0x34f75e=_0x20768d,_0x125137=this[_0x34f75e(0x4a3)](_0x3897a8);if(_0x125137[_0x34f75e(0x449)](/\\I\[(\d+)\]/i)){const _0x29d714=Number(RegExp['$1'])||0x0,_0x44fd42=this[_0x34f75e(0x1fd)](_0x3897a8),_0x187a06=_0x44fd42['x']+Math['floor']((_0x44fd42[_0x34f75e(0x341)]-ImageManager['iconWidth'])/0x2),_0x2521c6=_0x44fd42['y']+(_0x44fd42[_0x34f75e(0x61d)]-ImageManager[_0x34f75e(0x65c)])/0x2;this['drawIcon'](_0x29d714,_0x187a06,_0x2521c6);}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x2c1)]=Window_ItemCategory['prototype'][_0x20768d(0x22e)],Window_ItemCategory[_0x20768d(0x41b)]['setItemWindow']=function(_0x441acd){const _0x5636ee=_0x20768d;VisuMZ[_0x5636ee(0x54f)]['Window_ItemCategory_setItemWindow'][_0x5636ee(0x36c)](this,_0x441acd),_0x441acd[_0x5636ee(0x4cd)]=this;},Window_ItemCategory[_0x20768d(0x41b)]['callUpdateHelp']=function(){const _0x5f0369=_0x20768d;Window_HorzCommand['prototype'][_0x5f0369(0x523)][_0x5f0369(0x36c)](this);if(this[_0x5f0369(0x65b)])this[_0x5f0369(0x405)]();},Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x405)]=function(){const _0x1f1208=_0x20768d,_0x3f61a1=this[_0x1f1208(0x65b)];_0x3f61a1[_0x1f1208(0x553)][_0x1f1208(0x43d)]();const _0x397b0f=this[_0x1f1208(0x60b)](this[_0x1f1208(0x298)]());if(_0x397b0f===_0x1f1208(0x262)){if('ZFJmg'!=='PsDgW'){const _0x119716=this['itemLineRect'](this[_0x1f1208(0x298)]());let _0x2631a1=this[_0x1f1208(0x4a3)](this[_0x1f1208(0x298)]());_0x2631a1=_0x2631a1[_0x1f1208(0x5e5)](/\\I\[(\d+)\]/gi,''),_0x3f61a1[_0x1f1208(0x243)](),this['categoryNameWindowDrawBackground'](_0x2631a1,_0x119716),this['categoryNameWindowDrawText'](_0x2631a1,_0x119716),this['categoryNameWindowCenter'](_0x2631a1,_0x119716);}else{function _0x4e30b4(){const _0x4d2752=_0x1f1208;return _0x51980f[_0x4d2752(0x54f)][_0x4d2752(0x569)]['StatusWindow']['SpeedNeg2000'];}}}},Window_ItemCategory['prototype'][_0x20768d(0x353)]=function(_0x2a0a1d,_0x55d497){},Window_ItemCategory['prototype'][_0x20768d(0x218)]=function(_0xd3454,_0x1968f8){const _0x46708b=_0x20768d,_0x112455=this[_0x46708b(0x65b)];_0x112455[_0x46708b(0x4c1)](_0xd3454,0x0,_0x1968f8['y'],_0x112455['innerWidth'],_0x46708b(0x420));},Window_ItemCategory[_0x20768d(0x41b)][_0x20768d(0x3ed)]=function(_0x430c27,_0x35a3f6){const _0xadb116=_0x20768d,_0xe1cf9a=this[_0xadb116(0x65b)],_0x5ac832=$gameSystem[_0xadb116(0x559)](),_0x341b00=_0x35a3f6['x']+Math[_0xadb116(0x465)](_0x35a3f6[_0xadb116(0x341)]/0x2)+_0x5ac832;_0xe1cf9a['x']=_0xe1cf9a[_0xadb116(0x341)]/-0x2+_0x341b00,_0xe1cf9a['y']=Math[_0xadb116(0x465)](_0x35a3f6[_0xadb116(0x61d)]/0x2);},Window_ItemList[_0x20768d(0x41b)][_0x20768d(0x2f8)]=function(){const _0x360fa3=_0x20768d;if(this[_0x360fa3(0x2e0)]()){const _0xf0170b=this[_0x360fa3(0x298)]();if(this[_0x360fa3(0x3c5)]()<=0x1){!this[_0x360fa3(0x3f3)](_0x360fa3(0x1cf))&&Input['isTriggered'](_0x360fa3(0x1cf))&&this[_0x360fa3(0x5b7)]();if(!this[_0x360fa3(0x3f3)](_0x360fa3(0x595))&&Input['isTriggered']('pageup')){if(_0x360fa3(0x1cd)!==_0x360fa3(0x509))this['cursorPageup']();else{function _0x582bb0(){const _0x46a588=_0x360fa3;_0x1fa821['note'][_0x46a588(0x449)](/<PRICE:[ ](\d+)>/i)&&(_0x1bebd8['price']=_0x2b7a46(_0x1f7def['$1']));}}}}else{if(this['maxCols']()>0x1){if(Input['isRepeated']('right')){if(_0x360fa3(0x28f)==='clDSE')this['cursorRight'](Input[_0x360fa3(0x201)](_0x360fa3(0x5c2)));else{function _0x2db4dd(){const _0x289141=_0x360fa3;return _0x98edb4[_0x289141(0x41b)]['helpWindowRect'][_0x289141(0x36c)](this);}}}if(Input['isRepeated'](_0x360fa3(0x582))){if(_0x360fa3(0x28c)!==_0x360fa3(0x28c)){function _0x2de12c(){const _0x332dd4=_0x360fa3,_0x3e2ebf=_0x1d4088[_0x332dd4(0x292)]('['+_0x358ce9['$1'][_0x332dd4(0x449)](/\d+/g)+']');for(const _0x5091e9 of _0x3e2ebf){if(!_0x343cff[_0x332dd4(0x394)](_0x5091e9))return!![];}return![];}}else this[_0x360fa3(0x2d6)](Input['isTriggered'](_0x360fa3(0x582)));}if(this[_0x360fa3(0x4c8)]()){if(Input['isTriggered'](_0x360fa3(0x1cf))&&Input[_0x360fa3(0x2dd)](_0x360fa3(0x1e4))){if(_0x360fa3(0x627)!==_0x360fa3(0x627)){function _0xdcc23e(){const _0x2d6e1c=_0x360fa3;return _0x4b3364[_0x2d6e1c(0x4f7)];}}else this[_0x360fa3(0x5b7)]();}if(Input[_0x360fa3(0x201)](_0x360fa3(0x595))&&Input[_0x360fa3(0x2dd)]('shift')){if(_0x360fa3(0x2ae)===_0x360fa3(0x2ae))this[_0x360fa3(0x591)]();else{function _0x1a19ee(){const _0x38bc6c=_0x360fa3;this[_0x38bc6c(0x34b)](_0x2932d6);}}}}else{if(_0x360fa3(0x3e2)!=='iDZrJ'){function _0x57dbaa(){const _0x1e3a7a=_0x360fa3,_0x61f36=_0x1e3a7a(0x47e);if(this[_0x1e3a7a(0x232)][_0x61f36])return this[_0x1e3a7a(0x232)][_0x61f36];return this[_0x1e3a7a(0x5ef)]()?_0x4130b2['ItemsEquipsCore'][_0x1e3a7a(0x569)][_0x1e3a7a(0x319)][_0x1e3a7a(0x267)]:_0x51f82a[_0x1e3a7a(0x54f)][_0x1e3a7a(0x569)][_0x1e3a7a(0x319)]['NotConsumable'];}}else{if(Input[_0x360fa3(0x201)]('pagedown')){if('jRLSg'!==_0x360fa3(0x524))this['cursorPagedown']();else{function _0x5518af(){const _0x3dbb36=_0x360fa3;this['process_VisuMZ_ItemsEquipsCore_RegExp'](),_0x346282['ItemsEquipsCore'][_0x3dbb36(0x462)][_0x3dbb36(0x36c)](this),this[_0x3dbb36(0x602)]();}}}Input[_0x360fa3(0x201)](_0x360fa3(0x595))&&this[_0x360fa3(0x591)]();}}}}if(Input['isRepeated'](_0x360fa3(0x3b9))){if(Input[_0x360fa3(0x2dd)](_0x360fa3(0x1e4))&&this[_0x360fa3(0x4c4)]()){if(_0x360fa3(0x621)===_0x360fa3(0x651)){function _0x42b196(){const _0x13af3e=_0x360fa3;this[_0x13af3e(0x243)]();const _0x66c6b6=this[_0x13af3e(0x3f7)](_0x4fac6e),_0xdea50e=this[_0x13af3e(0x1fd)](_0x28711d),_0x57dc27=_0xdea50e['width'];this['changePaintOpacity'](this[_0x13af3e(0x34e)](_0x66c6b6)),this[_0x13af3e(0x4dd)](_0x66c6b6,_0xdea50e['x'],_0xdea50e['y'],_0x57dc27),this[_0x13af3e(0x51d)](_0x66c6b6,_0xdea50e),this[_0x13af3e(0x42e)](!![]);}}else this[_0x360fa3(0x5b7)]();}else{if(_0x360fa3(0x301)===_0x360fa3(0x301))this[_0x360fa3(0x440)](Input[_0x360fa3(0x201)](_0x360fa3(0x3b9)));else{function _0x49ae05(){const _0x226e57=_0x360fa3,_0x1aa606=_0x5b74ab[_0x226e57(0x292)]('['+_0x5457ba['$1'][_0x226e57(0x449)](/\d+/g)+']');for(const _0x4c9e8e of _0x1aa606){if(_0x42181f['value'](_0x4c9e8e))return!![];}return![];}}}}Input[_0x360fa3(0x25b)]('up')&&(Input[_0x360fa3(0x2dd)](_0x360fa3(0x1e4))&&this[_0x360fa3(0x4c4)]()?this[_0x360fa3(0x591)]():this[_0x360fa3(0x546)](Input['isTriggered']('up')));if(Imported['VisuMZ_0_CoreEngine']){if(_0x360fa3(0x1e6)===_0x360fa3(0x1e6))this['processCursorHomeEndTrigger']();else{function _0x36bd1a(){this['onTouchOk']();}}}this[_0x360fa3(0x298)]()!==_0xf0170b&&this['playCursorSound']();}},Window_ItemList['prototype']['limitedPageUpDownSceneCheck']=function(){const _0x1d3786=SceneManager['_scene'],_0x4789a3=[Scene_Item,Scene_Shop];return _0x4789a3['includes'](_0x1d3786['constructor']);},Window_ItemList['prototype'][_0x20768d(0x4c6)]=function(){const _0x469eb6=_0x20768d;Window_Selectable[_0x469eb6(0x41b)]['activate'][_0x469eb6(0x36c)](this),this[_0x469eb6(0x4cd)]&&this[_0x469eb6(0x4cd)][_0x469eb6(0x430)]()&&this['_categoryWindow'][_0x469eb6(0x4c6)]();},Window_ItemList[_0x20768d(0x41b)]['deactivate']=function(){const _0x39a74e=_0x20768d;Window_Selectable[_0x39a74e(0x41b)]['deactivate'][_0x39a74e(0x36c)](this);if(this[_0x39a74e(0x4cd)]&&this[_0x39a74e(0x4cd)][_0x39a74e(0x430)]()){if(_0x39a74e(0x47d)!==_0x39a74e(0x47d)){function _0x52f3cd(){const _0x34f29b=_0x39a74e;return _0x19995f[_0x34f29b(0x434)];}}else this[_0x39a74e(0x4cd)]['deactivate']();}},Window_ItemList[_0x20768d(0x41b)][_0x20768d(0x656)]=function(_0x578121){const _0x46404a=_0x20768d;if(this['_category']!==_0x578121){this[_0x46404a(0x44d)]=_0x578121,this[_0x46404a(0x53c)]();if(this[_0x46404a(0x4cd)]&&this[_0x46404a(0x4cd)][_0x46404a(0x430)]())this[_0x46404a(0x3cb)](0x0);else{if(_0x46404a(0x3da)!==_0x46404a(0x3da)){function _0x57cfc4(){const _0x4ca077=_0x46404a;_0x2be048=_0x4ca077(0x5d0)[_0x4ca077(0x60a)](_0x3c5130['id']);}}else this[_0x46404a(0x510)](0x0,0x0);}}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x203)]=Window_ItemList['prototype'][_0x20768d(0x3c5)],Window_ItemList[_0x20768d(0x41b)][_0x20768d(0x3c5)]=function(){const _0x3d2ec2=_0x20768d;if(SceneManager[_0x3d2ec2(0x5a1)][_0x3d2ec2(0x214)]===Scene_Battle){if(_0x3d2ec2(0x228)==='ggCLh'){function _0x56ec10(){const _0x1e9475=_0x3d2ec2;_0x334342[_0x1e9475(0x4e6)](_0x5ac333[_0x1e9475(0x3d4)],!![]);}}else return VisuMZ[_0x3d2ec2(0x54f)][_0x3d2ec2(0x203)][_0x3d2ec2(0x36c)](this);}else{if(SceneManager[_0x3d2ec2(0x5a1)][_0x3d2ec2(0x214)]===Scene_Map){if(_0x3d2ec2(0x328)===_0x3d2ec2(0x328))return VisuMZ[_0x3d2ec2(0x54f)][_0x3d2ec2(0x203)][_0x3d2ec2(0x36c)](this);else{function _0xb45620(){const _0x2969b5=_0x3d2ec2,_0x2980cd=this[_0x2969b5(0x590)](_0x49cd21);this[_0x2969b5(0x639)](_0x2980cd,_0x8a992d[_0x2969b5(0x4c7)],_0x2d67af['x'],_0x55536f['y'],_0x13dde9[_0x2969b5(0x341)]);}}}else{if(_0x3d2ec2(0x3d5)!==_0x3d2ec2(0x3d5)){function _0x10e968(){const _0x5030ee=_0x3d2ec2;return _0x591c29[_0x5030ee(0x54f)][_0x5030ee(0x1f1)]['call'](this);}}else return VisuMZ['ItemsEquipsCore'][_0x3d2ec2(0x569)][_0x3d2ec2(0x47c)]['ListWindowCols'];}}},VisuMZ['ItemsEquipsCore'][_0x20768d(0x5dd)]=Window_ItemList[_0x20768d(0x41b)]['colSpacing'],Window_ItemList[_0x20768d(0x41b)][_0x20768d(0x2d5)]=function(){const _0x9dd13=_0x20768d;if(this[_0x9dd13(0x3c5)]()<=0x1)return Window_Selectable[_0x9dd13(0x41b)][_0x9dd13(0x2d5)][_0x9dd13(0x36c)](this);else{if(_0x9dd13(0x2cd)===_0x9dd13(0x2a2)){function _0x2c9454(){const _0x3faf42=_0x9dd13;return _0x3ea01d['getInputMultiButtonStrings'](_0x3faf42(0x595),_0x3faf42(0x1cf));}}else return VisuMZ['ItemsEquipsCore'][_0x9dd13(0x5dd)][_0x9dd13(0x36c)](this);}},Window_ItemList['prototype'][_0x20768d(0x383)]=function(_0x498313){const _0x57f9df=_0x20768d;switch(this['_category']){case _0x57f9df(0x515):return DataManager[_0x57f9df(0x3f0)](_0x498313);case'RegularItems':return DataManager['isItem'](_0x498313)&&_0x498313['itypeId']===0x1;case _0x57f9df(0x1ef):return DataManager[_0x57f9df(0x3f0)](_0x498313)&&_0x498313[_0x57f9df(0x585)]===0x2;case'HiddenItemA':return DataManager[_0x57f9df(0x3f0)](_0x498313)&&_0x498313['itypeId']===0x3;case'HiddenItemB':return DataManager[_0x57f9df(0x3f0)](_0x498313)&&_0x498313['itypeId']===0x4;case _0x57f9df(0x267):return DataManager['isItem'](_0x498313)&&_0x498313[_0x57f9df(0x3e7)];case _0x57f9df(0x461):return DataManager['isItem'](_0x498313)&&!_0x498313[_0x57f9df(0x3e7)];case _0x57f9df(0x26d):return DataManager['isItem'](_0x498313)&&[0x0][_0x57f9df(0x383)](_0x498313[_0x57f9df(0x568)]);case'BattleUsable':return DataManager[_0x57f9df(0x3f0)](_0x498313)&&[0x0,0x1][_0x57f9df(0x383)](_0x498313[_0x57f9df(0x568)]);case _0x57f9df(0x22d):return DataManager[_0x57f9df(0x3f0)](_0x498313)&&[0x0,0x2]['includes'](_0x498313[_0x57f9df(0x568)]);case _0x57f9df(0x583):return DataManager[_0x57f9df(0x3f0)](_0x498313)&&[0x3]['includes'](_0x498313['occasion']);case _0x57f9df(0x642):return DataManager[_0x57f9df(0x4ad)](_0x498313);case'AllArmors':return DataManager[_0x57f9df(0x252)](_0x498313);default:if(this[_0x57f9df(0x44d)][_0x57f9df(0x449)](/WTYPE:(\d+)/i)){if(_0x57f9df(0x30d)!==_0x57f9df(0x58f))return DataManager[_0x57f9df(0x4ad)](_0x498313)&&_0x498313['wtypeId']===Number(RegExp['$1']);else{function _0x5c4cad(){const _0x13eaaf=_0x57f9df;return _0x260b1e['ItemsEquipsCore'][_0x13eaaf(0x569)]['StatusWindow'][_0x13eaaf(0x236)];}}}else{if(this[_0x57f9df(0x44d)][_0x57f9df(0x449)](/WTYPE:(.*)/i)){const _0x488575=$dataSystem[_0x57f9df(0x4ec)][_0x57f9df(0x2ce)](String(RegExp['$1'])[_0x57f9df(0x3b0)]());return DataManager[_0x57f9df(0x4ad)](_0x498313)&&_0x498313[_0x57f9df(0x450)]===_0x488575;}else{if(this['_category']['match'](/ATYPE:(\d+)/i))return DataManager[_0x57f9df(0x252)](_0x498313)&&_0x498313['atypeId']===Number(RegExp['$1']);else{if(this[_0x57f9df(0x44d)][_0x57f9df(0x449)](/ATYPE:(.*)/i)){const _0x538a4e=$dataSystem[_0x57f9df(0x61e)]['indexOf'](String(RegExp['$1'])['trim']());return DataManager[_0x57f9df(0x252)](_0x498313)&&_0x498313[_0x57f9df(0x374)]===_0x538a4e;}else{if(this[_0x57f9df(0x44d)][_0x57f9df(0x449)](/ETYPE:(\d+)/i)){if(_0x57f9df(0x277)==='JMAfk'){function _0x192e59(){const _0x560900=_0x57f9df;this[_0x560900(0x1f5)](_0x4bffed,_0x40d675['x'],_0x5d05fe['y'],_0xc59840);}}else return!!_0x498313&&_0x498313[_0x57f9df(0x225)]===Number(RegExp['$1']);}else{if(this[_0x57f9df(0x44d)][_0x57f9df(0x449)](/ETYPE:(.*)/i)){if(_0x57f9df(0x38e)===_0x57f9df(0x407)){function _0x14855a(){return this['statusWindowRectItemsEquipsCore']();}}else{const _0xfb7f3a=$dataSystem['equipTypes'][_0x57f9df(0x2ce)](String(RegExp['$1'])[_0x57f9df(0x3b0)]());return DataManager['isArmor'](_0x498313)&&_0x498313['etypeId']===_0xfb7f3a;}}else{if(this[_0x57f9df(0x44d)]['match'](/Category:(.*)/i))return!!_0x498313&&_0x498313[_0x57f9df(0x653)][_0x57f9df(0x383)](String(RegExp['$1'])[_0x57f9df(0x53a)]()['trim']());}}}}}}}return![];},Window_ItemList['prototype'][_0x20768d(0x2bc)]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x20768d(0x2a7)]=Window_ItemList[_0x20768d(0x41b)]['drawItem'],Window_ItemList['prototype'][_0x20768d(0x5aa)]=function(_0x468b2d){VisuMZ['ItemsEquipsCore']['Window_ItemList_drawItem']['call'](this,_0x468b2d),this['placeItemNewLabel'](_0x468b2d);},Window_ItemList[_0x20768d(0x41b)][_0x20768d(0x410)]=function(_0x270c15,_0x50f04,_0x57928a,_0x536f06){const _0x5682cc=_0x20768d;Window_Selectable[_0x5682cc(0x41b)][_0x5682cc(0x410)][_0x5682cc(0x36c)](this,_0x270c15,_0x50f04,_0x57928a,_0x536f06);},Window_ItemList['prototype'][_0x20768d(0x245)]=function(_0x29e2ff){const _0xa188fa=_0x20768d,_0x196d79=this[_0xa188fa(0x3f7)](_0x29e2ff);if(!_0x196d79||!this['isShowNew']())return;if(!$gameParty['isNewItem'](_0x196d79))return;const _0x1c2177=this[_0xa188fa(0x1fd)](_0x29e2ff),_0x3fe318=_0x1c2177['x'],_0x346ad8=_0x1c2177['y']+(this['lineHeight']()-ImageManager[_0xa188fa(0x65c)])/0x2,_0x48bbf4=VisuMZ[_0xa188fa(0x54f)][_0xa188fa(0x569)]['New'][_0xa188fa(0x39b)],_0xed1ffd=VisuMZ[_0xa188fa(0x54f)][_0xa188fa(0x569)][_0xa188fa(0x235)]['OffsetY'];this[_0xa188fa(0x49e)](_0x196d79,_0x3fe318+_0x48bbf4,_0x346ad8+_0xed1ffd);},Window_ItemList[_0x20768d(0x41b)][_0x20768d(0x658)]=function(_0x550804){const _0x14c4c5=_0x20768d;this[_0x14c4c5(0x5f1)]=_0x550804,this[_0x14c4c5(0x523)]();},VisuMZ[_0x20768d(0x54f)]['Window_ItemList_updateHelp']=Window_ItemList[_0x20768d(0x41b)][_0x20768d(0x421)],Window_ItemList[_0x20768d(0x41b)][_0x20768d(0x421)]=function(){const _0x424c54=_0x20768d;VisuMZ[_0x424c54(0x54f)][_0x424c54(0x325)][_0x424c54(0x36c)](this),this[_0x424c54(0x5f1)]&&this[_0x424c54(0x5f1)][_0x424c54(0x214)]===Window_ShopStatus&&this[_0x424c54(0x5f1)][_0x424c54(0x579)](this[_0x424c54(0x342)]());},Window_BattleItem[_0x20768d(0x41b)]['isEnabled']=function(_0x58bebc){const _0x45dd09=_0x20768d;if(BattleManager[_0x45dd09(0x5de)]())return BattleManager[_0x45dd09(0x5de)]()['canUse'](_0x58bebc);else{if('JsMlg'===_0x45dd09(0x4d5))return Window_ItemList[_0x45dd09(0x41b)][_0x45dd09(0x34e)][_0x45dd09(0x36c)](this,_0x58bebc);else{function _0x4c9456(){const _0x152cb9=_0x45dd09;return _0x123ebe[_0x152cb9(0x54f)][_0x152cb9(0x569)][_0x152cb9(0x32c)][_0x152cb9(0x565)];}}}},Window_EventItem[_0x20768d(0x41b)][_0x20768d(0x2bc)]=function(){return![];},Window_EquipStatus[_0x20768d(0x41b)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x117cca=_0x20768d;return VisuMZ[_0x117cca(0x54f)]['Settings'][_0x117cca(0x32c)][_0x117cca(0x222)];},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x380)]=Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x53c)],Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x53c)]=function(){const _0x14aa3f=_0x20768d;this[_0x14aa3f(0x4be)](),this['resetFontSettings']();if(this[_0x14aa3f(0x452)])this[_0x14aa3f(0x452)][_0x14aa3f(0x53c)]();this[_0x14aa3f(0x45f)]()?this['prepareRefreshItemsEquipsCoreLayout']():VisuMZ[_0x14aa3f(0x54f)]['Window_EquipStatus_refresh'][_0x14aa3f(0x36c)](this);},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x437)]=function(){const _0x4b380a=_0x20768d;this['contents'][_0x4b380a(0x43d)]();if(!this['_actor'])return;if(this[_0x4b380a(0x4ca)]()){if('dDhHu'!==_0x4b380a(0x360)){const _0x1a9af8=ImageManager['loadPicture'](this[_0x4b380a(0x452)]['getMenuImage']());_0x1a9af8[_0x4b380a(0x412)](this[_0x4b380a(0x1e5)][_0x4b380a(0x4d7)](this));}else{function _0x21ea76(){const _0x42194e=_0x4b380a;return _0x2b8068[_0x42194e(0x246)]['Settings'][_0x42194e(0x43f)][_0x42194e(0x588)];}}}else this[_0x4b380a(0x563)]();},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x4ca)]=function(){const _0x25c862=_0x20768d;return Imported[_0x25c862(0x2e1)]&&this[_0x25c862(0x452)]['getMenuImage']()!==''&&VisuMZ[_0x25c862(0x54f)][_0x25c862(0x569)][_0x25c862(0x32c)][_0x25c862(0x3c6)];},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x1e5)]=function(){const _0x42c35a=_0x20768d;VisuMZ[_0x42c35a(0x54f)][_0x42c35a(0x569)][_0x42c35a(0x32c)][_0x42c35a(0x4eb)][_0x42c35a(0x36c)](this),this[_0x42c35a(0x50c)]();},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x563)]=function(){const _0x1607a8=_0x20768d;VisuMZ[_0x1607a8(0x54f)]['Settings']['EquipScene']['DrawFaceJS'][_0x1607a8(0x36c)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x50c)]=function(){const _0x37786f=_0x20768d;this[_0x37786f(0x243)](),VisuMZ[_0x37786f(0x54f)][_0x37786f(0x569)]['EquipScene']['DrawParamJS'][_0x37786f(0x36c)](this);},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x354)]=function(_0x258bae,_0x179c15,_0x4136f6,_0x533ae3,_0xbb628e){const _0x5c46dd=_0x20768d,_0x46409f=ImageManager[_0x5c46dd(0x1d7)](_0x258bae[_0x5c46dd(0x309)]()),_0x112c56=this[_0x5c46dd(0x556)]-_0x46409f[_0x5c46dd(0x341)];_0x179c15+=_0x112c56/0x2;if(_0x112c56<0x0)_0x533ae3-=_0x112c56;Window_StatusBase[_0x5c46dd(0x41b)][_0x5c46dd(0x354)][_0x5c46dd(0x36c)](this,_0x258bae,_0x179c15,_0x4136f6,_0x533ae3,_0xbb628e);},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x4e4)]=function(){const _0x1eef71=_0x20768d;return Imported[_0x1eef71(0x5c0)]?VisuMZ[_0x1eef71(0x246)][_0x1eef71(0x569)][_0x1eef71(0x43f)][_0x1eef71(0x588)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x508)]=function(){const _0xf7ee4e=_0x20768d;return VisuMZ[_0xf7ee4e(0x54f)]['Settings'][_0xf7ee4e(0x32c)][_0xf7ee4e(0x4b6)];},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x202)]=function(){const _0x418216=_0x20768d;return Imported[_0x418216(0x5c0)]&&VisuMZ[_0x418216(0x246)][_0x418216(0x569)][_0x418216(0x43f)][_0x418216(0x401)];},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x42f)]=function(_0x1d8353,_0x190512,_0x23476e,_0x2aafe6){const _0x1ea0e3=_0x20768d,_0x528452=this[_0x1ea0e3(0x38f)]();if(Imported[_0x1ea0e3(0x5c0)])this[_0x1ea0e3(0x62b)](_0x190512+_0x528452,_0x23476e,_0x2aafe6,_0x1d8353,![]);else{if(_0x1ea0e3(0x443)!==_0x1ea0e3(0x443)){function _0x187afc(){return this['geUpdatedLayoutStatusWidth']();}}else this[_0x1ea0e3(0x4c1)](TextManager[_0x1ea0e3(0x369)](_0x1d8353),_0x190512+_0x528452,_0x23476e,_0x2aafe6);}},Window_EquipStatus['prototype']['drawUpdatedBeforeParamValue']=function(_0x10caf7,_0x378797,_0x1141c1,_0x212407){const _0xb4c833=_0x20768d,_0xc45d3d=this[_0xb4c833(0x38f)]();let _0x4a9015=0x0;Imported['VisuMZ_0_CoreEngine']?_0x4a9015=this[_0xb4c833(0x452)][_0xb4c833(0x5d5)](_0x10caf7,!![]):_0x4a9015=this[_0xb4c833(0x452)][_0xb4c833(0x369)](_0x10caf7);const _0x3f0fb9=_0x4a9015;this['drawText'](_0x4a9015,_0x378797,_0x1141c1,_0x212407-_0xc45d3d,_0xb4c833(0x5c2));},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x2d9)]=function(_0x575fa7,_0x652cd5,_0x4639c5,_0x419d18){const _0x4339c5=_0x20768d,_0x3fb899=this['itemPadding']();let _0x1147e5=0x0,_0x520f65=0x0,_0x4e2153='';if(this[_0x4339c5(0x3fe)]){if(Imported[_0x4339c5(0x5c0)]){if(_0x4339c5(0x62f)!==_0x4339c5(0x62f)){function _0x81c09f(){const _0x1be788=_0x4339c5;if(_0x15e6d)_0x39adaf+=this[_0x1be788(0x237)](_0x40ee31,_0x124b84);}}else _0x1147e5=this[_0x4339c5(0x452)][_0x4339c5(0x5d5)](_0x575fa7,![]),_0x520f65=this[_0x4339c5(0x3fe)][_0x4339c5(0x5d5)](_0x575fa7,![]),_0x4e2153=this[_0x4339c5(0x3fe)]['paramValueByName'](_0x575fa7,!![]);}else{if(_0x4339c5(0x58e)===_0x4339c5(0x58e))_0x1147e5=this[_0x4339c5(0x452)][_0x4339c5(0x369)](_0x575fa7),_0x520f65=this[_0x4339c5(0x3fe)][_0x4339c5(0x369)](_0x575fa7),_0x4e2153=this[_0x4339c5(0x3fe)][_0x4339c5(0x369)](_0x575fa7);else{function _0x64aa85(){const _0x1025d2=_0x4339c5;_0x454b44[_0x1025d2(0x41b)][_0x1025d2(0x410)][_0x1025d2(0x36c)](this,_0x3f12fd,_0x11183b,_0x32a633,_0x42a2d2);}}}const _0x26beb9=_0x1147e5,_0x13a0c5=_0x520f65;diffValue=_0x13a0c5-_0x26beb9,this[_0x4339c5(0x58b)](ColorManager[_0x4339c5(0x260)](diffValue)),this[_0x4339c5(0x4c1)](_0x4e2153,_0x652cd5,_0x4639c5,_0x419d18-_0x3fb899,_0x4339c5(0x5c2));}},Window_EquipStatus[_0x20768d(0x41b)][_0x20768d(0x5a6)]=function(_0xa4fd20,_0xfec7f5,_0xf411b3,_0x52f43a){const _0x3d42db=_0x20768d,_0x520c6d=this['itemPadding']();let _0x4e7a53=0x0,_0x4c8c06=0x0,_0x4a03a8=![];if(this[_0x3d42db(0x3fe)]){if(Imported[_0x3d42db(0x5c0)]){if(_0x3d42db(0x5ae)!==_0x3d42db(0x5ae)){function _0x3eda8d(){const _0x12300c=_0x3d42db;return _0x2d0fa3['ItemsEquipsCore'][_0x12300c(0x569)]['StatusWindow'][_0x12300c(0x61b)];}}else _0x4e7a53=this['_actor'][_0x3d42db(0x5d5)](_0xa4fd20,![]),_0x4c8c06=this['_tempActor'][_0x3d42db(0x5d5)](_0xa4fd20,![]),_0x4a03a8=String(this[_0x3d42db(0x452)][_0x3d42db(0x5d5)](_0xa4fd20,!![]))[_0x3d42db(0x449)](/([%％])/i);}else _0x4e7a53=this[_0x3d42db(0x452)][_0x3d42db(0x369)](_0xa4fd20),_0x4c8c06=this[_0x3d42db(0x3fe)][_0x3d42db(0x369)](_0xa4fd20),_0x4a03a8=_0x4e7a53%0x1!==0x0||_0x4c8c06%0x1!==0x0;const _0x1571b0=_0x4e7a53,_0x2681f1=_0x4c8c06,_0x51461d=_0x2681f1-_0x1571b0;let _0xa3a3ca=_0x51461d;if(_0x4a03a8)_0xa3a3ca=Math[_0x3d42db(0x3b8)](_0x51461d*0x64)+'%';if(_0x51461d!==0x0){if(_0x3d42db(0x25c)==='DUUnV'){function _0xb34f7(){this['drawEquipData']();}}else this[_0x3d42db(0x58b)](ColorManager['paramchangeTextColor'](_0x51461d)),_0xa3a3ca=(_0x51461d>0x0?'(+%1)':_0x3d42db(0x548))[_0x3d42db(0x60a)](_0xa3a3ca),this[_0x3d42db(0x4c1)](_0xa3a3ca,_0xfec7f5+_0x520c6d,_0xf411b3,_0x52f43a,_0x3d42db(0x582));}}},Window_EquipStatus['prototype'][_0x20768d(0x5ca)]=function(_0x569b26,_0x5d2c82,_0x4b8ba5,_0x2dbc26,_0x376771){const _0x343de9=_0x20768d;if(VisuMZ[_0x343de9(0x54f)][_0x343de9(0x569)][_0x343de9(0x32c)][_0x343de9(0x238)]===![])return;_0x376771=Math[_0x343de9(0x5d7)](_0x376771||0x1,0x1);while(_0x376771--){_0x2dbc26=_0x2dbc26||this[_0x343de9(0x5e4)](),this[_0x343de9(0x553)]['paintOpacity']=0xa0;const _0x480655=ColorManager[_0x343de9(0x299)]();this[_0x343de9(0x553)][_0x343de9(0x1e3)](_0x569b26+0x1,_0x5d2c82+0x1,_0x4b8ba5-0x2,_0x2dbc26-0x2,_0x480655),this['contents'][_0x343de9(0x2e6)]=0xff;}},ColorManager[_0x20768d(0x299)]=function(){const _0x33b76c=_0x20768d,_0x39e9f2=VisuMZ[_0x33b76c(0x54f)][_0x33b76c(0x569)]['EquipScene'];let _0x2866f7=_0x39e9f2[_0x33b76c(0x64d)]!==undefined?_0x39e9f2[_0x33b76c(0x64d)]:0x13;return ColorManager[_0x33b76c(0x5a0)](_0x2866f7);},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x213)]=Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x1e1)],Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x1e1)]=function(_0x599812){const _0x58f21c=_0x20768d;VisuMZ[_0x58f21c(0x54f)][_0x58f21c(0x213)][_0x58f21c(0x36c)](this,_0x599812),this['createCommandNameWindow'](_0x599812);},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x446)]=function(_0x5414ef){const _0x3c44ba=_0x20768d,_0x4e0738=new Rectangle(0x0,0x0,_0x5414ef[_0x3c44ba(0x341)],_0x5414ef['height']);this[_0x3c44ba(0x5ea)]=new Window_Base(_0x4e0738),this[_0x3c44ba(0x5ea)][_0x3c44ba(0x3a8)]=0x0,this[_0x3c44ba(0x5cd)](this[_0x3c44ba(0x5ea)]),this['updateCommandNameWindow']();},Window_EquipCommand['prototype'][_0x20768d(0x523)]=function(){const _0x15c8bf=_0x20768d;Window_HorzCommand[_0x15c8bf(0x41b)]['callUpdateHelp'][_0x15c8bf(0x36c)](this);if(this[_0x15c8bf(0x5ea)])this[_0x15c8bf(0x333)]();},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x333)]=function(){const _0xcb1df7=_0x20768d,_0x3bd8f2=this[_0xcb1df7(0x5ea)];_0x3bd8f2[_0xcb1df7(0x553)][_0xcb1df7(0x43d)]();const _0x3727eb=this[_0xcb1df7(0x23b)](this['index']());if(_0x3727eb==='icon'){const _0x29ba6e=this['itemLineRect'](this['index']());let _0x42fbea=this[_0xcb1df7(0x4a3)](this[_0xcb1df7(0x298)]());_0x42fbea=_0x42fbea['replace'](/\\I\[(\d+)\]/gi,''),_0x3bd8f2[_0xcb1df7(0x243)](),this[_0xcb1df7(0x4b8)](_0x42fbea,_0x29ba6e),this[_0xcb1df7(0x4ce)](_0x42fbea,_0x29ba6e),this['commandNameWindowCenter'](_0x42fbea,_0x29ba6e);}},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x4b8)]=function(_0x3f9d35,_0x150fc1){},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x4ce)]=function(_0x3223f9,_0x5aedd4){const _0x4eac4e=_0x20768d,_0x241ddc=this[_0x4eac4e(0x5ea)];_0x241ddc[_0x4eac4e(0x4c1)](_0x3223f9,0x0,_0x5aedd4['y'],_0x241ddc[_0x4eac4e(0x556)],_0x4eac4e(0x420));},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x5a3)]=function(_0x5cde4f,_0x11c072){const _0x17363f=_0x20768d,_0x178f39=this[_0x17363f(0x5ea)],_0xf27081=$gameSystem[_0x17363f(0x559)](),_0x1f9236=_0x11c072['x']+Math['floor'](_0x11c072[_0x17363f(0x341)]/0x2)+_0xf27081;_0x178f39['x']=_0x178f39[_0x17363f(0x341)]/-0x2+_0x1f9236,_0x178f39['y']=Math['floor'](_0x11c072[_0x17363f(0x61d)]/0x2);},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x430)]=function(){const _0x5dbcb9=_0x20768d;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand['prototype'][_0x5dbcb9(0x430)][_0x5dbcb9(0x36c)](this);},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x3b2)]=function(){const _0x3e43ec=_0x20768d;if(this['currentSymbol']()===_0x3e43ec(0x623))Window_HorzCommand[_0x3e43ec(0x41b)][_0x3e43ec(0x3b2)][_0x3e43ec(0x36c)](this);},Window_EquipCommand[_0x20768d(0x41b)]['processCursorMoveModernControls']=function(){const _0x27e63d=_0x20768d;if(!this[_0x27e63d(0x4e8)]()){if('CJtkR'===_0x27e63d(0x378))Window_HorzCommand['prototype']['processCursorMoveModernControls']['call'](this);else{function _0x2f526d(){return _0x5b88c8(_0x322be9['$1']);}}}},Window_EquipCommand['prototype']['processCursorSpecialCheckModernControls']=function(){const _0x1b0605=_0x20768d;if(!this[_0x1b0605(0x2e0)]())return![];if(SceneManager['_scene'][_0x1b0605(0x214)]!==Scene_Equip)return![];if(Input[_0x1b0605(0x201)](_0x1b0605(0x3b9))){if(_0x1b0605(0x2ea)!=='flmnH'){function _0x2865f4(){const _0x327268=_0x1b0605,_0xdd6d4f=this[_0x327268(0x4a3)](_0x3201c8);if(_0xdd6d4f[_0x327268(0x449)](/\\I\[(\d+)\]/i)){const _0xeb4981=_0x9323e0(_0x3c94ed['$1'])||0x0,_0x12ce6a=this['itemLineRect'](_0x239840),_0x11ec6c=_0x12ce6a['x']+_0x278b1c[_0x327268(0x465)]((_0x12ce6a['width']-_0x2233e3[_0x327268(0x2fb)])/0x2),_0x22760a=_0x12ce6a['y']+(_0x12ce6a[_0x327268(0x61d)]-_0x2845eb['iconHeight'])/0x2;this['drawIcon'](_0xeb4981,_0x11ec6c,_0x22760a);}}}else this[_0x1b0605(0x469)](),SceneManager[_0x1b0605(0x5a1)][_0x1b0605(0x1df)](),SceneManager[_0x1b0605(0x5a1)][_0x1b0605(0x478)][_0x1b0605(0x3cb)](-0x1);}return![];},Window_EquipCommand['prototype'][_0x20768d(0x3c5)]=function(){const _0x155549=_0x20768d;return this[_0x155549(0x2a9)]?this[_0x155549(0x2a9)][_0x155549(0x3c9)]:0x3;},Window_EquipCommand[_0x20768d(0x41b)]['processTouchModernControls']=function(){const _0x137d1f=_0x20768d;if(this['isOpen']()&&this[_0x137d1f(0x250)]&&SceneManager['_scene'][_0x137d1f(0x214)]===Scene_Equip){if(this[_0x137d1f(0x20f)]()&&TouchInput[_0x137d1f(0x40c)]()){if(_0x137d1f(0x30a)===_0x137d1f(0x30a))this[_0x137d1f(0x46d)](![]);else{function _0x503b1b(){const _0x1ffef9=_0x137d1f;return!!_0x236a49&&_0x264772[_0x1ffef9(0x225)]===_0x2c6f7b(_0x593197['$1']);}}}else TouchInput[_0x137d1f(0x201)]()&&this[_0x137d1f(0x46d)](!![]);TouchInput[_0x137d1f(0x479)]()&&this[_0x137d1f(0x55c)]();}},Window_EquipCommand['prototype']['onTouchSelectModernControls']=function(_0x1d0575){const _0x30e45b=_0x20768d;this[_0x30e45b(0x62d)]=![];const _0x57f5bb=this[_0x30e45b(0x298)](),_0x3ebda=this[_0x30e45b(0x29c)](),_0x2745af=SceneManager[_0x30e45b(0x5a1)][_0x30e45b(0x478)];if(_0x2745af[_0x30e45b(0x2b0)]()&&_0x2745af[_0x30e45b(0x250)]){if(_0x3ebda>=0x0){if('qfvIL'===_0x30e45b(0x504)){function _0x171189(){const _0x312b9a=_0x30e45b,_0x29eecb=_0x5ef58e+_0x2db9aa+_0x4fb956*_0x5d20ca;this[_0x312b9a(0x5ca)](_0x29eecb,_0x2d67ed,_0x249904,_0x38cc8b-_0x1c484f);}}else{if(_0x3ebda===this[_0x30e45b(0x298)]()){if(_0x30e45b(0x4da)===_0x30e45b(0x4da))this[_0x30e45b(0x62d)]=!![];else{function _0x3accee(){const _0x4418fb=_0x30e45b;_0x1e05fd[_0x4418fb(0x54f)][_0x4418fb(0x3ee)][_0x4418fb(0x36c)](this),this[_0x4418fb(0x430)]()&&this['postCreateCategoryWindowItemsEquipsCore']();}}}this['activate'](),this['select'](_0x3ebda);}}else{if(_0x2745af[_0x30e45b(0x29c)]()>=0x0){if(_0x30e45b(0x1f2)!=='QaZBG')this[_0x30e45b(0x471)](),this[_0x30e45b(0x52e)]();else{function _0x3c5050(){const _0x498ddb=_0x30e45b;!_0x4906ad&&this[_0x498ddb(0x1fc)](null,_0x87bdd4);if(!this[_0x498ddb(0x3fe)]){const _0x35aec5=_0x49aac3['makeDeepCopy'](this);_0x35aec5[_0x498ddb(0x3fe)]=!![],this[_0x498ddb(0x2d8)][_0x2c0d26][_0x498ddb(0x356)](null),this[_0x498ddb(0x428)](_0x35aec5);}else this[_0x498ddb(0x2d8)][_0x23bbe0][_0x498ddb(0x356)](null);_0x26f688=!![];}}}}}_0x1d0575&&this[_0x30e45b(0x298)]()!==_0x57f5bb&&this['playCursorSound']();},Window_EquipCommand[_0x20768d(0x41b)]['makeCommandList']=function(){const _0xf9391a=_0x20768d;this[_0xf9391a(0x1ce)](),this[_0xf9391a(0x424)](),this[_0xf9391a(0x371)]();},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x53c)]=function(){const _0x2d3aec=_0x20768d;Window_HorzCommand[_0x2d3aec(0x41b)][_0x2d3aec(0x53c)][_0x2d3aec(0x36c)](this),this[_0x2d3aec(0x58c)]();},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x1ce)]=function(){const _0x203a45=_0x20768d;if(!this[_0x203a45(0x5a4)]())return;const _0x56df52=this[_0x203a45(0x502)](),_0x405061=VisuMZ[_0x203a45(0x54f)][_0x203a45(0x569)]['EquipScene'][_0x203a45(0x594)],_0x591ffa=_0x56df52===_0x203a45(0x43a)?TextManager[_0x203a45(0x2d1)]:'\x5cI[%1]%2'['format'](_0x405061,TextManager['equip2']),_0x455081=this[_0x203a45(0x2f1)]();this[_0x203a45(0x549)](_0x591ffa,_0x203a45(0x623),_0x455081);},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x5a4)]=function(){const _0x112620=_0x20768d;return!this[_0x112620(0x430)]();},Window_EquipCommand['prototype'][_0x20768d(0x2f1)]=function(){return!![];},Window_EquipCommand[_0x20768d(0x41b)]['addOptimizeCommand']=function(){const _0x5177b6=_0x20768d;if(!this[_0x5177b6(0x632)]())return;const _0x23f9ed=this[_0x5177b6(0x502)](),_0x4a284b=VisuMZ[_0x5177b6(0x54f)][_0x5177b6(0x569)][_0x5177b6(0x32c)]['CmdIconOptimize'],_0x22701f=_0x23f9ed===_0x5177b6(0x43a)?TextManager[_0x5177b6(0x506)]:_0x5177b6(0x330)[_0x5177b6(0x60a)](_0x4a284b,TextManager['optimize']),_0x401e3d=this[_0x5177b6(0x4d3)]();this[_0x5177b6(0x549)](_0x22701f,_0x5177b6(0x506),_0x401e3d);},Window_EquipCommand[_0x20768d(0x41b)]['isOptimizeCommandAdded']=function(){const _0x30273b=_0x20768d;return VisuMZ['ItemsEquipsCore'][_0x30273b(0x569)]['EquipScene']['CommandAddOptimize'];},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x4d3)]=function(){return!![];},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x371)]=function(){const _0x427b93=_0x20768d;if(!this[_0x427b93(0x536)]())return;const _0x22943f=this['commandStyle'](),_0x500efc=VisuMZ[_0x427b93(0x54f)][_0x427b93(0x569)][_0x427b93(0x32c)][_0x427b93(0x4ea)],_0x5e5949=_0x22943f==='text'?TextManager[_0x427b93(0x43d)]:_0x427b93(0x330)[_0x427b93(0x60a)](_0x500efc,TextManager[_0x427b93(0x43d)]),_0x446504=this[_0x427b93(0x5bb)]();this[_0x427b93(0x549)](_0x5e5949,_0x427b93(0x43d),_0x446504);},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x536)]=function(){const _0x2f6f62=_0x20768d;return VisuMZ['ItemsEquipsCore'][_0x2f6f62(0x569)][_0x2f6f62(0x32c)][_0x2f6f62(0x4de)];},Window_EquipCommand[_0x20768d(0x41b)]['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x433)]=function(){const _0xd8a080=_0x20768d;return VisuMZ[_0xd8a080(0x54f)]['Settings'][_0xd8a080(0x32c)][_0xd8a080(0x592)];},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x5aa)]=function(_0x50966c){const _0x10e3a6=_0x20768d,_0x33b075=this[_0x10e3a6(0x23b)](_0x50966c);if(_0x33b075===_0x10e3a6(0x377))this[_0x10e3a6(0x34b)](_0x50966c);else{if(_0x33b075==='icon'){if('arIXg'!==_0x10e3a6(0x3f9))this[_0x10e3a6(0x1d1)](_0x50966c);else{function _0x40bc07(){return!![];}}}else{if(_0x10e3a6(0x41d)!==_0x10e3a6(0x63c))Window_HorzCommand[_0x10e3a6(0x41b)][_0x10e3a6(0x5aa)]['call'](this,_0x50966c);else{function _0x3b98c7(){const _0x1f1ea6=_0x10e3a6,_0x5c10ec=_0x1e5045(_0x4af9ce['$1']),_0x53adcc=(_0x3405bf===_0xbcea73?_0x1f1ea6(0x40a):_0x1f1ea6(0x336))['format'](_0x503942['id']),_0x58f5c3='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20'[_0x1f1ea6(0x60a)](_0x5c10ec);for(let _0x26eca2=0x0;_0x26eca2<0x8;_0x26eca2++){if(_0x5c10ec[_0x1f1ea6(0x449)](_0x2e42ca[_0x1f1ea6(0x54f)][_0x1f1ea6(0x575)][_0x1f1ea6(0x3fa)][_0x26eca2])){const _0x238eba=_0x1f1ea6(0x40d)[_0x1f1ea6(0x60a)](_0x53adcc,_0x26eca2);_0x5debfb[_0x1f1ea6(0x54f)][_0x1f1ea6(0x4f1)][_0x238eba]=new _0x1f91be(_0x1f1ea6(0x342),_0x1f1ea6(0x320),_0x58f5c3);}}}}}}},Window_EquipCommand['prototype'][_0x20768d(0x502)]=function(){const _0x2e728e=_0x20768d;return VisuMZ['ItemsEquipsCore'][_0x2e728e(0x569)][_0x2e728e(0x32c)][_0x2e728e(0x1da)];},Window_EquipCommand['prototype']['commandStyleCheck']=function(_0x53698e){const _0x3f0a24=_0x20768d;if(_0x53698e<0x0)return _0x3f0a24(0x43a);const _0x6d719e=this[_0x3f0a24(0x502)]();if(_0x6d719e!==_0x3f0a24(0x470)){if(_0x3f0a24(0x35d)===_0x3f0a24(0x4cb)){function _0x3a2e86(){this['cursorPagedown']();}}else return _0x6d719e;}else{if(this['maxItems']()>0x0){const _0x1e44dc=this['commandName'](_0x53698e);if(_0x1e44dc[_0x3f0a24(0x449)](/\\I\[(\d+)\]/i)){if(_0x3f0a24(0x343)!==_0x3f0a24(0x347)){const _0xbea03d=this[_0x3f0a24(0x1fd)](_0x53698e),_0x183fa1=this[_0x3f0a24(0x1d8)](_0x1e44dc)['width'];if(_0x183fa1<=_0xbea03d['width'])return _0x3f0a24(0x377);else{if(_0x3f0a24(0x300)==='oWMCv')return _0x3f0a24(0x262);else{function _0x5a9016(){const _0x42f463=_0x3f0a24;return _0x2a47d3['ItemsEquipsCore'][_0x42f463(0x529)][_0x42f463(0x36c)](this);}}}}else{function _0x1ebcaf(){const _0x2ba255=_0x3f0a24;return _0x16334f['ItemsEquipsCore'][_0x2ba255(0x569)][_0x2ba255(0x319)][_0x2ba255(0x266)];}}}}}return _0x3f0a24(0x43a);},Window_EquipCommand[_0x20768d(0x41b)]['drawItemStyleIconText']=function(_0xded40e){const _0x9d8e2c=_0x20768d,_0x51e8f9=this[_0x9d8e2c(0x1fd)](_0xded40e),_0x3defb3=this['commandName'](_0xded40e),_0x196657=this['textSizeEx'](_0x3defb3)[_0x9d8e2c(0x341)];this[_0x9d8e2c(0x42e)](this['isCommandEnabled'](_0xded40e));const _0x5ad06b=this[_0x9d8e2c(0x433)]();if(_0x5ad06b===_0x9d8e2c(0x5c2)){if('urFgB'!==_0x9d8e2c(0x33a)){function _0x322104(){const _0x550350=_0x9d8e2c;_0x1814f1[_0x550350(0x3a8)]=this[_0x550350(0x316)];}}else this[_0x9d8e2c(0x1f5)](_0x3defb3,_0x51e8f9['x']+_0x51e8f9[_0x9d8e2c(0x341)]-_0x196657,_0x51e8f9['y'],_0x196657);}else{if(_0x5ad06b===_0x9d8e2c(0x420)){const _0x458948=_0x51e8f9['x']+Math[_0x9d8e2c(0x465)]((_0x51e8f9[_0x9d8e2c(0x341)]-_0x196657)/0x2);this[_0x9d8e2c(0x1f5)](_0x3defb3,_0x458948,_0x51e8f9['y'],_0x196657);}else this[_0x9d8e2c(0x1f5)](_0x3defb3,_0x51e8f9['x'],_0x51e8f9['y'],_0x196657);}},Window_EquipCommand[_0x20768d(0x41b)][_0x20768d(0x1d1)]=function(_0x57a12a){const _0x47beb6=_0x20768d;this['commandName'](_0x57a12a)[_0x47beb6(0x449)](/\\I\[(\d+)\]/i);const _0x33d67e=Number(RegExp['$1'])||0x0,_0x4ce396=this[_0x47beb6(0x1fd)](_0x57a12a),_0x2aa6d3=_0x4ce396['x']+Math['floor']((_0x4ce396[_0x47beb6(0x341)]-ImageManager[_0x47beb6(0x2fb)])/0x2),_0x2ba5e8=_0x4ce396['y']+(_0x4ce396['height']-ImageManager[_0x47beb6(0x65c)])/0x2;this[_0x47beb6(0x1d6)](_0x33d67e,_0x2aa6d3,_0x2ba5e8);},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x430)]=function(){const _0x46c64c=_0x20768d;return Imported[_0x46c64c(0x5c0)]&&Window_HorzCommand[_0x46c64c(0x41b)][_0x46c64c(0x430)][_0x46c64c(0x36c)](this);},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x4c6)]=function(){const _0x2599ec=_0x20768d;Window_StatusBase['prototype'][_0x2599ec(0x4c6)]['call'](this),this['callUpdateHelp']();},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x58d)]=function(){const _0x2fc985=_0x20768d;Window_StatusBase['prototype'][_0x2fc985(0x58d)]['call'](this),this[_0x2fc985(0x498)]();},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x498)]=function(){const _0x1b4fe4=_0x20768d;if(!this[_0x1b4fe4(0x21c)]())return;if(Input[_0x1b4fe4(0x201)](_0x1b4fe4(0x1e4))&&this[_0x1b4fe4(0x342)]()){const _0x4e17e3=SceneManager['_scene'][_0x1b4fe4(0x452)];_0x4e17e3&&(this[_0x1b4fe4(0x293)](this[_0x1b4fe4(0x298)]())?(this[_0x1b4fe4(0x54d)](),this['updateHelp']()):this[_0x1b4fe4(0x547)]());}},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x293)]=function(_0x214245){const _0x2bd736=_0x20768d,_0x581d20=SceneManager[_0x2bd736(0x5a1)][_0x2bd736(0x452)];if(!_0x581d20)return;if(!_0x581d20[_0x2bd736(0x282)](this[_0x2bd736(0x298)]()))return![];const _0x3fb726=_0x581d20['equipSlots']()[this[_0x2bd736(0x298)]()];if(_0x581d20[_0x2bd736(0x2b4)]()[_0x2bd736(0x383)](_0x3fb726)){if(_0x2bd736(0x56e)!=='nRKJA'){function _0x5e76d2(){const _0x4c432d=_0x2bd736;this[_0x4c432d(0x2d8)][_0x2d0b18][_0x4c432d(0x356)](null);}}else return![];}return!![];;},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x54d)]=function(){const _0x598afb=_0x20768d;SoundManager[_0x598afb(0x389)]();const _0x4a5c54=SceneManager[_0x598afb(0x5a1)][_0x598afb(0x452)];_0x4a5c54['changeEquip'](this['index'](),null),this['refresh'](),this[_0x598afb(0x2ab)][_0x598afb(0x53c)](),this[_0x598afb(0x523)]();const _0x12c2d6=SceneManager[_0x598afb(0x5a1)][_0x598afb(0x5f1)];if(_0x12c2d6)_0x12c2d6[_0x598afb(0x53c)]();},Window_EquipSlot['prototype'][_0x20768d(0x21c)]=function(){const _0x2dc573=_0x20768d;if(!this['active'])return![];if(!VisuMZ[_0x2dc573(0x54f)][_0x2dc573(0x569)][_0x2dc573(0x32c)]['ShiftShortcutKey'])return![];return!![];},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x2f8)]=function(){const _0x5a3b03=_0x20768d;if(!this[_0x5a3b03(0x4e8)]()){if('CPQXN'===_0x5a3b03(0x2c9)){function _0x4761ae(){const _0x2bf450=_0x5a3b03;return _0x4673de[_0x2bf450(0x246)][_0x2bf450(0x569)][_0x2bf450(0x43f)][_0x2bf450(0x588)];}}else Window_StatusBase['prototype'][_0x5a3b03(0x2f8)][_0x5a3b03(0x36c)](this);}},Window_EquipSlot[_0x20768d(0x41b)]['processCursorSpecialCheckModernControls']=function(){const _0x385f9f=_0x20768d;if(!this['isCursorMovable']())return![];if(SceneManager[_0x385f9f(0x5a1)][_0x385f9f(0x214)]!==Scene_Equip)return![];if(this[_0x385f9f(0x622)]())return this[_0x385f9f(0x469)](),Input[_0x385f9f(0x43d)](),SceneManager[_0x385f9f(0x5a1)][_0x385f9f(0x390)](),![];else{if(Input['isRepeated'](_0x385f9f(0x3b9))){const _0x4a1678=this[_0x385f9f(0x298)]();if(Input[_0x385f9f(0x2dd)]('shift'))this[_0x385f9f(0x5b7)]();else{if(_0x385f9f(0x3a4)!==_0x385f9f(0x3a4)){function _0x160407(){const _0x30b319=_0x385f9f;this[_0x30b319(0x51f)](_0x1f60ae,_0x41e862,_0x38bfba,_0x17675a,!![]),this[_0x30b319(0x51f)](_0x30f56b,_0x5cefa9,_0x2821ac,_0x4eb61e,![],_0x30b319(0x5c2)),this['drawItemDarkRect'](_0x45309a,_0x4bd112,_0x21b487),this[_0x30b319(0x243)]();}}else this['cursorDown'](Input[_0x385f9f(0x201)]('down'));}return this['index']()!==_0x4a1678&&this[_0x385f9f(0x469)](),!![];}else{if(this[_0x385f9f(0x26a)]()&&Input[_0x385f9f(0x201)](_0x385f9f(0x1e4)))return!![];}}return![];},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x622)]=function(){const _0x9db545=_0x20768d;if(this[_0x9db545(0x298)]()!==0x0)return![];const _0xcada88=VisuMZ[_0x9db545(0x54f)][_0x9db545(0x569)][_0x9db545(0x32c)];if(!_0xcada88['CommandAddOptimize']&&!_0xcada88[_0x9db545(0x4de)])return![];return Input[_0x9db545(0x201)]('up');},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x26a)]=function(){const _0x597417=_0x20768d;return VisuMZ[_0x597417(0x54f)]['Settings'][_0x597417(0x32c)][_0x597417(0x2dc)];},Window_EquipSlot[_0x20768d(0x41b)]['processTouchModernControls']=function(){const _0x1f1a5f=_0x20768d;if(this[_0x1f1a5f(0x2b0)]()&&this[_0x1f1a5f(0x250)]&&SceneManager[_0x1f1a5f(0x5a1)]['constructor']===Scene_Equip){if(this['isHoverEnabled']()&&TouchInput[_0x1f1a5f(0x40c)]())this[_0x1f1a5f(0x46d)](![]);else{if(TouchInput[_0x1f1a5f(0x201)]()){if(_0x1f1a5f(0x5e6)===_0x1f1a5f(0x5ac)){function _0x5af441(){this['postCreateItemWindowModernControls']();}}else this[_0x1f1a5f(0x46d)](!![]);}}if(TouchInput[_0x1f1a5f(0x479)]()){if(_0x1f1a5f(0x31f)==='xvKKu'){function _0x357d16(){const _0x107209=_0x1f1a5f;return _0x35158d['ItemsEquipsCore'][_0x107209(0x569)][_0x107209(0x319)][_0x107209(0x577)];}}else this[_0x1f1a5f(0x55c)]();}else{if(TouchInput[_0x1f1a5f(0x35f)]()){if(_0x1f1a5f(0x49a)===_0x1f1a5f(0x488)){function _0x12c27a(){const _0x35e8be=_0x1f1a5f;if(!_0x2b841c[_0x35e8be(0x259)]())return;const _0x161a72=_0x8e8059[_0x35e8be(0x54f)]['Settings'][_0x35e8be(0x2f4)];_0x161a72['SwitchBuy']&&_0x1df331[_0x35e8be(0x4e6)](_0x161a72[_0x35e8be(0x485)],![]),_0x161a72[_0x35e8be(0x3d4)]&&_0x1e10b6[_0x35e8be(0x4e6)](_0x161a72[_0x35e8be(0x3d4)],![]);}}else this['onTouchCancel']();}}}},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x46d)]=function(_0x2521a4){const _0x2259a2=_0x20768d;this[_0x2259a2(0x62d)]=![];const _0x3b8e86=this[_0x2259a2(0x298)](),_0x544850=this['hitIndex'](),_0x2eac81=SceneManager['_scene'][_0x2259a2(0x640)];if(_0x2eac81[_0x2259a2(0x2b0)]()&&_0x2eac81[_0x2259a2(0x250)]){if(_0x544850>=0x0)_0x544850===this[_0x2259a2(0x298)]()&&(this[_0x2259a2(0x62d)]=!![]),this[_0x2259a2(0x4c6)](),this[_0x2259a2(0x305)](_0x544850);else _0x2eac81[_0x2259a2(0x29c)]()>=0x0&&(this[_0x2259a2(0x471)](),this[_0x2259a2(0x52e)]());}_0x2521a4&&this[_0x2259a2(0x298)]()!==_0x3b8e86&&this['playCursorSound']();},Window_EquipSlot[_0x20768d(0x41b)][_0x20768d(0x258)]=function(){const _0x13f054=_0x20768d;return this[_0x13f054(0x298)]();},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x442)]=Window_EquipItem[_0x20768d(0x41b)][_0x20768d(0x383)],Window_EquipItem[_0x20768d(0x41b)][_0x20768d(0x383)]=function(_0x357c66){const _0x47523b=_0x20768d;if(_0x357c66===null&&this[_0x47523b(0x2b4)]()[_0x47523b(0x383)](this['etypeId']()))return![];else{if(_0x47523b(0x657)===_0x47523b(0x657))return VisuMZ['ItemsEquipsCore']['Window_EquipItem_includes'][_0x47523b(0x36c)](this,_0x357c66);else{function _0x4ba2c6(){const _0x38329e=_0x47523b,_0x54dc01=_0x291a3d(_0x9e1764['$1']),_0x135985='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x38329e(0x60a)](_0x54dc01);_0x3a9dd2[_0x38329e(0x54f)][_0x38329e(0x2b7)][_0x1ea0f4['id']]=new _0x179e9b(_0x38329e(0x342),_0x135985);}}}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x32a)]=Window_EquipItem[_0x20768d(0x41b)][_0x20768d(0x34e)],Window_EquipItem['prototype']['isEnabled']=function(_0x42e297){const _0x42c637=_0x20768d;if(_0x42e297&&this[_0x42c637(0x452)]){if('IaQul'===_0x42c637(0x275)){if(this[_0x42c637(0x3c7)](_0x42e297))return![];if(this[_0x42c637(0x543)](_0x42e297))return![];if(this['isSoleArmorType'](_0x42e297))return![];}else{function _0x3d964b(){const _0x2ddf69=_0x42c637;if(!this[_0x2ddf69(0x478)])return![];if(!this[_0x2ddf69(0x478)][_0x2ddf69(0x5c6)])return![];return this[_0x2ddf69(0x478)][_0x2ddf69(0x21c)]();}}}if(!_0x42e297)return!this[_0x42c637(0x2b4)]()[_0x42c637(0x383)](this['etypeId']());return VisuMZ[_0x42c637(0x54f)][_0x42c637(0x32a)][_0x42c637(0x36c)](this,_0x42e297);},Window_EquipItem['prototype']['itemHasEquipLimit']=function(_0x279dde){const _0x386373=_0x20768d,_0x238289=_0x279dde[_0x386373(0x38a)];if(_0x238289['match'](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if(_0x386373(0x220)!==_0x386373(0x43e)){const _0x324e65=Number(RegExp['$1'])||0x1;let _0x4ca7ab=0x0;const _0x3ea6a8=this[_0x386373(0x452)][_0x386373(0x511)](),_0x39122c=SceneManager[_0x386373(0x5a1)]['_slotWindow'][_0x386373(0x258)]();_0x3ea6a8[_0x39122c]=null;for(const _0x377083 of _0x3ea6a8){if(!_0x377083)continue;if(DataManager['isWeapon'](_0x279dde)===DataManager['isWeapon'](_0x377083)){if(_0x386373(0x210)!=='HMGph'){function _0x1bb09f(){const _0x2c1c7d=_0x386373;return _0x2c1c7d(0x51a)[_0x2c1c7d(0x60a)](_0x611c91(_0x4c6d36['$1']));}}else{if(_0x279dde['id']===_0x377083['id'])_0x4ca7ab+=0x1;}}}return _0x4ca7ab>=_0x324e65;}else{function _0x152b49(){const _0xbbfd6d=_0x386373;_0x258f09[_0xbbfd6d(0x54f)][_0xbbfd6d(0x45c)][_0xbbfd6d(0x36c)](this,_0x4019a2),this[_0xbbfd6d(0x446)](_0x33edaa);}}}else{if(_0x386373(0x4a7)===_0x386373(0x5f5)){function _0x130e9e(){const _0x1ffe78=_0x386373;this[_0x1ffe78(0x5d8)]();}}else return![];}},Window_EquipItem[_0x20768d(0x41b)][_0x20768d(0x543)]=function(_0xb81025){const _0x1d4f75=_0x20768d;if(!DataManager[_0x1d4f75(0x4ad)](_0xb81025))return![];const _0x485274=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x18a19d=0x0;const _0xc91cc3=this[_0x1d4f75(0x452)][_0x1d4f75(0x511)](),_0x5c9b2c=SceneManager[_0x1d4f75(0x5a1)][_0x1d4f75(0x478)][_0x1d4f75(0x258)]();_0xc91cc3[_0x5c9b2c]=null;for(const _0x3a7188 of _0xc91cc3){if(!_0x3a7188)continue;if(!DataManager[_0x1d4f75(0x4ad)](_0x3a7188))continue;if(_0xb81025[_0x1d4f75(0x450)]===_0x3a7188[_0x1d4f75(0x450)]){if(_0x1d4f75(0x1ec)==='UQRQt'){_0x18a19d+=0x1;if(_0xb81025[_0x1d4f75(0x38a)][_0x1d4f75(0x449)](_0x485274)){if('kcXxX'===_0x1d4f75(0x56d)){function _0xd09bdf(){const _0x18232d=_0x1d4f75;this['cursorRight'](_0x1b8a7f[_0x18232d(0x201)](_0x18232d(0x1cf)));}}else{const _0x3e8a1c=Number(RegExp['$1'])||0x1;if(_0x18a19d>=_0x3e8a1c)return!![];}}if(_0x3a7188[_0x1d4f75(0x38a)][_0x1d4f75(0x449)](_0x485274)){if(_0x1d4f75(0x2a4)===_0x1d4f75(0x5b5)){function _0xee4463(){const _0x388199=_0x1d4f75;this['addEquipCommand'](),this[_0x388199(0x424)](),this[_0x388199(0x371)]();}}else{const _0x323569=Number(RegExp['$1'])||0x1;if(_0x18a19d>=_0x323569)return!![];}}}else{function _0x5f5d8c(){const _0x5c9b50=_0x1d4f75,_0xb9e4bc=_0x5c9b50(0x36a);if(this[_0x5c9b50(0x2ac)]['rateMP']>=0x0&&this[_0x5c9b50(0x2ac)]['flatMP']>=0x0&&!this['_customItemInfo'][_0xb9e4bc])return![];const _0x339f98=this[_0x5c9b50(0x2fc)]();this[_0x5c9b50(0x51f)](_0x339f98,_0x5c5fa7,_0x463069,_0x5ee9ce,!![]);const _0x412ad6=this[_0x5c9b50(0x58a)]();return this[_0x5c9b50(0x58b)](_0x4bfef6[_0x5c9b50(0x5ed)](0x2)),this[_0x5c9b50(0x51f)](_0x412ad6,_0x2e0ed6,_0xe8b088,_0x311fb6,![],_0x5c9b50(0x5c2)),this['drawItemDarkRect'](_0x263efd,_0x296097,_0x1b90f8),this[_0x5c9b50(0x243)](),!![];}}}}return![];},Window_EquipItem[_0x20768d(0x41b)][_0x20768d(0x531)]=function(_0xeca687){const _0x2ef185=_0x20768d;if(!DataManager['isArmor'](_0xeca687))return![];const _0x5bb1c0=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x17c51a=0x0;const _0xb4c06a=this[_0x2ef185(0x452)][_0x2ef185(0x511)](),_0x25eec4=SceneManager[_0x2ef185(0x5a1)][_0x2ef185(0x478)]['equipSlotIndex']();_0xb4c06a[_0x25eec4]=null;for(const _0x19f5d0 of _0xb4c06a){if(!_0x19f5d0)continue;if(!DataManager[_0x2ef185(0x252)](_0x19f5d0))continue;if(_0xeca687[_0x2ef185(0x374)]===_0x19f5d0[_0x2ef185(0x374)]){_0x17c51a+=0x1;if(_0xeca687[_0x2ef185(0x38a)][_0x2ef185(0x449)](_0x5bb1c0)){const _0x233d2e=Number(RegExp['$1'])||0x1;if(_0x17c51a>=_0x233d2e)return!![];}if(_0x19f5d0['note'][_0x2ef185(0x449)](_0x5bb1c0)){if(_0x2ef185(0x2f5)===_0x2ef185(0x2f5)){const _0x14a953=Number(RegExp['$1'])||0x1;if(_0x17c51a>=_0x14a953)return!![];}else{function _0x493cb7(){const _0x167c77=_0x2ef185;this[_0x167c77(0x243)](),_0xfd7955[_0x167c77(0x54f)][_0x167c77(0x569)][_0x167c77(0x32c)][_0x167c77(0x4ba)][_0x167c77(0x36c)](this);}}}}}return![];},Window_EquipItem[_0x20768d(0x41b)][_0x20768d(0x2b4)]=function(){const _0x1b18d=_0x20768d;return VisuMZ[_0x1b18d(0x54f)]['Settings'][_0x1b18d(0x32c)][_0x1b18d(0x29f)];},Window_EquipItem[_0x20768d(0x41b)][_0x20768d(0x5aa)]=function(_0xe84cc2){const _0x4afa39=_0x20768d,_0x1d8f40=this[_0x4afa39(0x3f7)](_0xe84cc2);_0x1d8f40?Window_ItemList[_0x4afa39(0x41b)][_0x4afa39(0x5aa)][_0x4afa39(0x36c)](this,_0xe84cc2):this[_0x4afa39(0x55d)](_0xe84cc2);},Window_EquipItem[_0x20768d(0x41b)][_0x20768d(0x55d)]=function(_0x2875a0){const _0x2534d1=_0x20768d;this['changePaintOpacity'](this['isEnabled'](null));const _0x3e4bd8=VisuMZ[_0x2534d1(0x54f)][_0x2534d1(0x569)][_0x2534d1(0x32c)],_0x23eebd=this[_0x2534d1(0x1fd)](_0x2875a0),_0x2c652a=_0x23eebd['y']+(this[_0x2534d1(0x5e4)]()-ImageManager[_0x2534d1(0x65c)])/0x2,_0x2b7a99=ImageManager[_0x2534d1(0x2fb)]+0x4,_0x56a8db=Math[_0x2534d1(0x5d7)](0x0,_0x23eebd['width']-_0x2b7a99);this[_0x2534d1(0x431)](),this[_0x2534d1(0x1d6)](_0x3e4bd8[_0x2534d1(0x25d)],_0x23eebd['x'],_0x2c652a),this['drawText'](_0x3e4bd8['RemoveEquipText'],_0x23eebd['x']+_0x2b7a99,_0x23eebd['y'],_0x56a8db),this[_0x2534d1(0x42e)](!![]);},Window_EquipItem['prototype']['updateHelp']=function(){const _0x2678b9=_0x20768d;Window_ItemList[_0x2678b9(0x41b)][_0x2678b9(0x421)][_0x2678b9(0x36c)](this);if(this[_0x2678b9(0x452)]&&this[_0x2678b9(0x5f1)]&&this[_0x2678b9(0x3e4)]>=0x0){const _0x4492c1=JsonEx[_0x2678b9(0x32b)](this[_0x2678b9(0x452)]);_0x4492c1[_0x2678b9(0x3fe)]=!![],_0x4492c1[_0x2678b9(0x44e)](this[_0x2678b9(0x3e4)],this[_0x2678b9(0x342)]()),this[_0x2678b9(0x5f1)]['setTempActor'](_0x4492c1);}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x45c)]=Window_ShopCommand[_0x20768d(0x41b)]['initialize'],Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x1e1)]=function(_0x14c02a){const _0x5d80dc=_0x20768d;VisuMZ[_0x5d80dc(0x54f)][_0x5d80dc(0x45c)]['call'](this,_0x14c02a),this[_0x5d80dc(0x446)](_0x14c02a);},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x446)]=function(_0x91362c){const _0x395d9a=_0x20768d,_0x3e68a4=new Rectangle(0x0,0x0,_0x91362c[_0x395d9a(0x341)],_0x91362c[_0x395d9a(0x61d)]);this[_0x395d9a(0x5ea)]=new Window_Base(_0x3e68a4),this[_0x395d9a(0x5ea)][_0x395d9a(0x3a8)]=0x0,this[_0x395d9a(0x5cd)](this[_0x395d9a(0x5ea)]),this['updateCommandNameWindow']();},Window_ShopCommand['prototype'][_0x20768d(0x523)]=function(){const _0xba6986=_0x20768d;Window_HorzCommand[_0xba6986(0x41b)]['callUpdateHelp'][_0xba6986(0x36c)](this);if(this[_0xba6986(0x5ea)])this[_0xba6986(0x333)]();},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x333)]=function(){const _0xb22b59=_0x20768d,_0x3abb0f=this[_0xb22b59(0x5ea)];_0x3abb0f[_0xb22b59(0x553)][_0xb22b59(0x43d)]();const _0x358300=this[_0xb22b59(0x23b)](this[_0xb22b59(0x298)]());if(_0x358300===_0xb22b59(0x262)){const _0x2c7d3f=this[_0xb22b59(0x1fd)](this['index']());let _0x2cc95c=this[_0xb22b59(0x4a3)](this[_0xb22b59(0x298)]());_0x2cc95c=_0x2cc95c[_0xb22b59(0x5e5)](/\\I\[(\d+)\]/gi,''),_0x3abb0f[_0xb22b59(0x243)](),this[_0xb22b59(0x4b8)](_0x2cc95c,_0x2c7d3f),this['commandNameWindowDrawText'](_0x2cc95c,_0x2c7d3f),this[_0xb22b59(0x5a3)](_0x2cc95c,_0x2c7d3f);}},Window_ShopCommand['prototype'][_0x20768d(0x4b8)]=function(_0x45693d,_0x5014d5){},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x4ce)]=function(_0x4289ee,_0xbd5327){const _0x1f58a8=_0x20768d,_0x215b48=this['_commandNameWindow'];_0x215b48[_0x1f58a8(0x4c1)](_0x4289ee,0x0,_0xbd5327['y'],_0x215b48['innerWidth'],_0x1f58a8(0x420));},Window_ShopCommand['prototype'][_0x20768d(0x5a3)]=function(_0x49fcec,_0x4f11e3){const _0x4c9fcb=_0x20768d,_0x5749e6=this['_commandNameWindow'],_0x341da8=$gameSystem[_0x4c9fcb(0x559)](),_0x478455=_0x4f11e3['x']+Math[_0x4c9fcb(0x465)](_0x4f11e3[_0x4c9fcb(0x341)]/0x2)+_0x341da8;_0x5749e6['x']=_0x5749e6[_0x4c9fcb(0x341)]/-0x2+_0x478455,_0x5749e6['y']=Math[_0x4c9fcb(0x465)](_0x4f11e3[_0x4c9fcb(0x61d)]/0x2);},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x3c5)]=function(){const _0x3bf640=_0x20768d;return this[_0x3bf640(0x2a9)]?this[_0x3bf640(0x2a9)]['length']:0x3;},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x48a)]=function(){const _0xe58d39=_0x20768d;return VisuMZ['ItemsEquipsCore'][_0xe58d39(0x569)][_0xe58d39(0x2f4)][_0xe58d39(0x357)];},Window_ShopCommand[_0x20768d(0x41b)]['makeCommandList']=function(){const _0x374b12=_0x20768d;this[_0x374b12(0x425)](),this[_0x374b12(0x205)](),this[_0x374b12(0x289)]();},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x53c)]=function(){const _0x38cb77=_0x20768d;Window_HorzCommand[_0x38cb77(0x41b)][_0x38cb77(0x53c)][_0x38cb77(0x36c)](this),this[_0x38cb77(0x58c)]();},Window_ShopCommand[_0x20768d(0x41b)]['addBuyCommand']=function(){const _0x4d4f40=_0x20768d,_0x2c3223=this[_0x4d4f40(0x502)](),_0xf80ea0=VisuMZ['ItemsEquipsCore']['Settings'][_0x4d4f40(0x2f4)]['CmdIconBuy'],_0xa20dd9=_0x2c3223==='text'?TextManager[_0x4d4f40(0x59c)]:_0x4d4f40(0x330)[_0x4d4f40(0x60a)](_0xf80ea0,TextManager[_0x4d4f40(0x59c)]),_0x4a8aae=this[_0x4d4f40(0x285)]();if(this[_0x4d4f40(0x48a)]()&&!_0x4a8aae)return;this[_0x4d4f40(0x549)](_0xa20dd9,'buy',_0x4a8aae);},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x285)]=function(){const _0x59f340=_0x20768d;if(SceneManager['_scene'][_0x59f340(0x214)]===Scene_Shop)return SceneManager['_scene'][_0x59f340(0x5eb)]>0x0;else{if(_0x59f340(0x5b1)!==_0x59f340(0x63f))return!![];else{function _0x1b484e(){const _0x150e0d=_0x59f340;_0x439635['isPressed'](_0x150e0d(0x1e4))&&this['allowShiftScrolling']()?this[_0x150e0d(0x591)]():this[_0x150e0d(0x546)](_0x4ca17c['isTriggered']('up'));}}}},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x205)]=function(){const _0x4bf26a=_0x20768d,_0x425a43=this[_0x4bf26a(0x502)](),_0x2d6472=VisuMZ[_0x4bf26a(0x54f)][_0x4bf26a(0x569)]['ShopScene'][_0x4bf26a(0x64e)],_0x4939e3=_0x425a43===_0x4bf26a(0x43a)?TextManager[_0x4bf26a(0x3e6)]:_0x4bf26a(0x330)[_0x4bf26a(0x60a)](_0x2d6472,TextManager['sell']),_0x2d6ee6=this[_0x4bf26a(0x3d3)]();if(this[_0x4bf26a(0x48a)]()&&!_0x2d6ee6)return;this[_0x4bf26a(0x549)](_0x4939e3,'sell',_0x2d6ee6);},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x3d3)]=function(){return!this['_purchaseOnly'];},Window_ShopCommand['prototype'][_0x20768d(0x289)]=function(){const _0x3b09c7=_0x20768d,_0x3b1744=this[_0x3b09c7(0x502)](),_0x4ecf82=VisuMZ[_0x3b09c7(0x54f)][_0x3b09c7(0x569)][_0x3b09c7(0x2f4)][_0x3b09c7(0x349)],_0x3dfc0e=VisuMZ['ItemsEquipsCore'][_0x3b09c7(0x569)][_0x3b09c7(0x2f4)][_0x3b09c7(0x5ee)],_0x22d49f=_0x3b1744===_0x3b09c7(0x43a)?_0x3dfc0e:_0x3b09c7(0x330)[_0x3b09c7(0x60a)](_0x4ecf82,_0x3dfc0e);this['addCommand'](_0x22d49f,_0x3b09c7(0x21d));},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x433)]=function(){const _0x22362b=_0x20768d;return VisuMZ[_0x22362b(0x54f)][_0x22362b(0x569)][_0x22362b(0x2f4)][_0x22362b(0x592)];},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x5aa)]=function(_0x5c5556){const _0x184286=_0x20768d,_0x3db22d=this['commandStyleCheck'](_0x5c5556);if(_0x3db22d===_0x184286(0x377))this[_0x184286(0x34b)](_0x5c5556);else{if(_0x3db22d===_0x184286(0x262)){if(_0x184286(0x48e)===_0x184286(0x535)){function _0x514cf9(){const _0x554b16=_0x184286,_0x2498b0=this['_commandNameWindow'];_0x2498b0[_0x554b16(0x553)]['clear']();const _0x2f6e08=this[_0x554b16(0x23b)](this['index']());if(_0x2f6e08===_0x554b16(0x262)){const _0x184e96=this[_0x554b16(0x1fd)](this[_0x554b16(0x298)]());let _0x4fbdaa=this['commandName'](this[_0x554b16(0x298)]());_0x4fbdaa=_0x4fbdaa[_0x554b16(0x5e5)](/\\I\[(\d+)\]/gi,''),_0x2498b0[_0x554b16(0x243)](),this['commandNameWindowDrawBackground'](_0x4fbdaa,_0x184e96),this[_0x554b16(0x4ce)](_0x4fbdaa,_0x184e96),this[_0x554b16(0x5a3)](_0x4fbdaa,_0x184e96);}}}else this[_0x184286(0x1d1)](_0x5c5556);}else{if(_0x184286(0x4b0)===_0x184286(0x4b0))Window_HorzCommand['prototype'][_0x184286(0x5aa)][_0x184286(0x36c)](this,_0x5c5556);else{function _0x5e4326(){const _0x525262=_0x184286;if(_0x3ea743[_0x525262(0x303)]&&_0x35fa12[_0x525262(0x4f7)]!==_0x590893)return _0x42f917[_0x525262(0x4f7)];else{if(this[_0x525262(0x45f)]())return this['updatedLayoutStyle']()[_0x525262(0x449)](/LOWER/i);else _0x2a71ae[_0x525262(0x41b)]['isRightInputMode']['call'](this);}}}}}},Window_ShopCommand['prototype'][_0x20768d(0x502)]=function(){const _0x4f368c=_0x20768d;return VisuMZ['ItemsEquipsCore'][_0x4f368c(0x569)][_0x4f368c(0x2f4)]['CmdStyle'];},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x23b)]=function(_0x5dd11e){const _0x25e14a=_0x20768d;if(_0x5dd11e<0x0)return'text';const _0x279fe6=this[_0x25e14a(0x502)]();if(_0x279fe6!=='auto'){if('LAprF'===_0x25e14a(0x1dc))return _0x279fe6;else{function _0x366430(){this['cursorPageup']();}}}else{if(this[_0x25e14a(0x288)]()>0x0){if('nWhXQ'===_0x25e14a(0x206)){function _0x2da1a4(){const _0x31ec21=_0x25e14a;this['_commandWindow'][_0x31ec21(0x471)](),this[_0x31ec21(0x640)][_0x31ec21(0x52e)](),this[_0x31ec21(0x478)][_0x31ec21(0x3cb)](0x0),this[_0x31ec21(0x478)][_0x31ec21(0x4c6)]();}}else{const _0x51aa81=this['commandName'](_0x5dd11e);if(_0x51aa81[_0x25e14a(0x449)](/\\I\[(\d+)\]/i)){if('sdzDY'==='sdzDY'){const _0x402cc1=this[_0x25e14a(0x1fd)](_0x5dd11e),_0x30c3e1=this['textSizeEx'](_0x51aa81)[_0x25e14a(0x341)];return _0x30c3e1<=_0x402cc1[_0x25e14a(0x341)]?_0x25e14a(0x377):_0x25e14a(0x262);}else{function _0x12c72e(){_0x134572=_0x478832(_0x51fc3c['$1']);}}}}}}return _0x25e14a(0x43a);},Window_ShopCommand[_0x20768d(0x41b)][_0x20768d(0x34b)]=function(_0x56f108){const _0x29c4de=_0x20768d,_0x5e1ecd=this[_0x29c4de(0x1fd)](_0x56f108),_0x1be98e=this[_0x29c4de(0x4a3)](_0x56f108),_0x5299c9=this['textSizeEx'](_0x1be98e)[_0x29c4de(0x341)];this[_0x29c4de(0x42e)](this[_0x29c4de(0x636)](_0x56f108));const _0x39f2e8=this[_0x29c4de(0x433)]();if(_0x39f2e8==='right')this[_0x29c4de(0x1f5)](_0x1be98e,_0x5e1ecd['x']+_0x5e1ecd[_0x29c4de(0x341)]-_0x5299c9,_0x5e1ecd['y'],_0x5299c9);else{if(_0x39f2e8===_0x29c4de(0x420)){const _0xce9b7e=_0x5e1ecd['x']+Math[_0x29c4de(0x465)]((_0x5e1ecd[_0x29c4de(0x341)]-_0x5299c9)/0x2);this[_0x29c4de(0x1f5)](_0x1be98e,_0xce9b7e,_0x5e1ecd['y'],_0x5299c9);}else{if(_0x29c4de(0x351)!==_0x29c4de(0x600))this[_0x29c4de(0x1f5)](_0x1be98e,_0x5e1ecd['x'],_0x5e1ecd['y'],_0x5299c9);else{function _0x185898(){const _0x311c54=_0x29c4de;_0x4354ad[_0x311c54(0x41b)][_0x311c54(0x4c6)][_0x311c54(0x36c)](this),this['_categoryWindow']&&this[_0x311c54(0x4cd)][_0x311c54(0x430)]()&&this[_0x311c54(0x4cd)][_0x311c54(0x4c6)]();}}}}},Window_ShopCommand['prototype'][_0x20768d(0x1d1)]=function(_0x29c79d){const _0x2fb158=_0x20768d;this[_0x2fb158(0x4a3)](_0x29c79d)[_0x2fb158(0x449)](/\\I\[(\d+)\]/i);const _0x28425d=Number(RegExp['$1'])||0x0,_0x539b03=this[_0x2fb158(0x1fd)](_0x29c79d),_0x350280=_0x539b03['x']+Math[_0x2fb158(0x465)]((_0x539b03[_0x2fb158(0x341)]-ImageManager[_0x2fb158(0x2fb)])/0x2),_0x29f05f=_0x539b03['y']+(_0x539b03[_0x2fb158(0x61d)]-ImageManager[_0x2fb158(0x65c)])/0x2;this[_0x2fb158(0x1d6)](_0x28425d,_0x350280,_0x29f05f);},VisuMZ[_0x20768d(0x54f)]['Window_ShopBuy_refresh']=Window_ShopBuy['prototype'][_0x20768d(0x53c)],Window_ShopBuy[_0x20768d(0x41b)][_0x20768d(0x53c)]=function(){const _0x1e7d2c=_0x20768d;this[_0x1e7d2c(0x27b)](),VisuMZ[_0x1e7d2c(0x54f)][_0x1e7d2c(0x5d1)][_0x1e7d2c(0x36c)](this);},Window_ShopBuy[_0x20768d(0x41b)][_0x20768d(0x27b)]=function(){const _0x1483fb=_0x20768d;if(SceneManager[_0x1483fb(0x5a1)][_0x1483fb(0x214)]===Scene_Shop){if('ydiAj'!==_0x1483fb(0x2e8)){function _0xbb597a(){const _0x5c64d9=_0x1483fb;_0x521c68[_0x5c64d9(0x449)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x276f00=_0xe0b732(_0x4220b9['$1'])[_0x5c64d9(0x53a)]()[_0x5c64d9(0x3b0)]()[_0x5c64d9(0x3ff)](',');for(const _0x5b7127 of _0x276f00){_0x5a0b23[_0x5c64d9(0x653)][_0x5c64d9(0x64a)](_0x5b7127[_0x5c64d9(0x3b0)]());}}}else this[_0x1483fb(0x29a)]=SceneManager[_0x1483fb(0x5a1)]['money']();}},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x4d8)]=Window_ShopBuy[_0x20768d(0x41b)][_0x20768d(0x590)],Window_ShopBuy[_0x20768d(0x41b)][_0x20768d(0x590)]=function(_0x5611cc){const _0x4bf98d=_0x20768d;if(!_0x5611cc)return 0x0;const _0x536956=VisuMZ[_0x4bf98d(0x54f)][_0x4bf98d(0x4d8)]['call'](this,_0x5611cc);return this[_0x4bf98d(0x43b)](_0x5611cc,_0x536956);},Window_ShopBuy[_0x20768d(0x41b)][_0x20768d(0x43b)]=function(_0x4ee98c,_0x4cabbe){const _0x557d8e=_0x20768d,_0x5c74a9=_0x4ee98c['note'];if(_0x5c74a9[_0x557d8e(0x449)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x9a87a7=String(RegExp['$1']);try{if(_0x557d8e(0x60c)===_0x557d8e(0x60c))eval(_0x9a87a7);else{function _0x804017(){if(!_0x115a43['value'](_0x150a79))return![];}}}catch(_0x13c3d0){if($gameTemp[_0x557d8e(0x493)]())console[_0x557d8e(0x400)](_0x13c3d0);}}_0x4cabbe=VisuMZ[_0x557d8e(0x54f)][_0x557d8e(0x569)][_0x557d8e(0x2f4)][_0x557d8e(0x1d0)][_0x557d8e(0x36c)](this,_0x4ee98c,_0x4cabbe);if(isNaN(_0x4cabbe))_0x4cabbe=0x0;return Math['floor'](_0x4cabbe);},Window_ShopBuy[_0x20768d(0x41b)][_0x20768d(0x5aa)]=function(_0x4d26f7){const _0x5c0477=_0x20768d;this[_0x5c0477(0x243)]();const _0x1b4189=this['itemAt'](_0x4d26f7),_0x474158=this['itemLineRect'](_0x4d26f7),_0x559693=_0x474158[_0x5c0477(0x341)];this[_0x5c0477(0x42e)](this[_0x5c0477(0x34e)](_0x1b4189)),this['drawItemName'](_0x1b4189,_0x474158['x'],_0x474158['y'],_0x559693),this[_0x5c0477(0x51d)](_0x1b4189,_0x474158),this['changePaintOpacity'](!![]);},Window_ShopBuy['prototype']['drawItemCost']=function(_0x119d32,_0x42093a){const _0x137568=_0x20768d,_0x1f7a48=this['price'](_0x119d32);this[_0x137568(0x639)](_0x1f7a48,TextManager[_0x137568(0x4c7)],_0x42093a['x'],_0x42093a['y'],_0x42093a['width']);},Window_ShopSell[_0x20768d(0x41b)][_0x20768d(0x3c5)]=function(){const _0x1af1a5=_0x20768d;return SceneManager['_scene'][_0x1af1a5(0x45f)]()?0x1:0x2;},VisuMZ[_0x20768d(0x54f)][_0x20768d(0x3be)]=Window_ShopSell[_0x20768d(0x41b)]['isEnabled'],Window_ShopSell[_0x20768d(0x41b)][_0x20768d(0x34e)]=function(_0x3bc48f){const _0x538500=_0x20768d;if(!_0x3bc48f)return![];const _0x468ac8=_0x3bc48f[_0x538500(0x38a)];if(_0x468ac8[_0x538500(0x449)](/<CANNOT SELL>/i))return![];if(_0x468ac8[_0x538500(0x449)](/<CAN SELL>/i))return!![];if(_0x468ac8[_0x538500(0x449)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x538500(0x483)!=='crgcZ'){function _0x5ed703(){const _0x5f4ea8=_0x538500;return _0x457e4a[_0x5f4ea8(0x54f)][_0x5f4ea8(0x569)][_0x5f4ea8(0x319)]['Speed0'];}}else{const _0x35b50b=JSON[_0x538500(0x292)]('['+RegExp['$1'][_0x538500(0x449)](/\d+/g)+']');for(const _0x48d4dc of _0x35b50b){if(!$gameSwitches[_0x538500(0x394)](_0x48d4dc))return![];}}}if(_0x468ac8[_0x538500(0x449)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x564f45=JSON[_0x538500(0x292)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1421e1 of _0x564f45){if(_0x538500(0x413)!==_0x538500(0x453)){if(!$gameSwitches[_0x538500(0x394)](_0x1421e1))return![];}else{function _0x3ffbe3(){const _0x53c456=_0x538500;_0x2301ff=_0x53c456(0x231)[_0x53c456(0x60a)](_0x1c56e7['id']);}}}}if(_0x468ac8[_0x538500(0x449)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x538500(0x2ef)!==_0x538500(0x2ef)){function _0xc30395(){const _0x58fcc0=_0x538500;return _0x37d24f['ItemsEquipsCore'][_0x58fcc0(0x569)][_0x58fcc0(0x32c)]['LayoutStyle'];}}else{const _0x202cb8=JSON[_0x538500(0x292)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1f1370 of _0x202cb8){if($gameSwitches[_0x538500(0x394)](_0x1f1370))return![];}}}return VisuMZ[_0x538500(0x54f)][_0x538500(0x3be)][_0x538500(0x36c)](this,_0x3bc48f);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x457)]=function(){return![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x5b8)]=function(){const _0x12453d=_0x20768d;Window_StatusBase[_0x12453d(0x41b)]['loadFaceImages'][_0x12453d(0x36c)](this);for(const _0xd02ba0 of $gameParty[_0x12453d(0x54e)]()){ImageManager['loadCharacter'](_0xd02ba0[_0x12453d(0x284)]());}},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x35c)]=function(){const _0x15150c=_0x20768d;return VisuMZ['ItemsEquipsCore'][_0x15150c(0x569)][_0x15150c(0x319)][_0x15150c(0x422)];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x53c)]=function(){const _0x548ab1=_0x20768d;this[_0x548ab1(0x553)]['clear'](),this[_0x548ab1(0x25f)][_0x548ab1(0x43d)]();if(this[_0x548ab1(0x37b)]){if(_0x548ab1(0x2b6)===_0x548ab1(0x2b6))this[_0x548ab1(0x243)](),this[_0x548ab1(0x42e)](!![]),this[_0x548ab1(0x274)](),this[_0x548ab1(0x4f5)]()?this[_0x548ab1(0x557)]():this[_0x548ab1(0x20e)](),this['drawCustomShopGraphic']();else{function _0x2e8bfc(){const _0x4c9d21=_0x548ab1;this[_0x4c9d21(0x471)](),this[_0x4c9d21(0x52e)]();}}}},Window_ShopStatus[_0x20768d(0x41b)]['drawPossession']=function(_0x2c8334,_0x2b7c8c){const _0x46af45=_0x20768d;if(!this['isEquipItem']()&&!DataManager['isItem'](this[_0x46af45(0x37b)]))return;const _0x2f68c0=this['innerWidth']-this['itemPadding']()-_0x2c8334,_0x49384c=this[_0x46af45(0x2e2)](_0x46af45(0x5fd));this[_0x46af45(0x58b)](ColorManager[_0x46af45(0x1ee)]()),this[_0x46af45(0x4c1)](TextManager[_0x46af45(0x415)],_0x2c8334+this['itemPadding'](),_0x2b7c8c,_0x2f68c0-_0x49384c),this[_0x46af45(0x431)](),this[_0x46af45(0x410)](this[_0x46af45(0x37b)],_0x2c8334,_0x2b7c8c,_0x2f68c0);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x5ca)]=function(_0x589253,_0x20f5d2,_0x177a1d,_0x481115,_0x4e8a96){const _0x20e651=_0x20768d;if(VisuMZ[_0x20e651(0x54f)][_0x20e651(0x569)][_0x20e651(0x319)]['DrawBackRect']===![])return;_0x4e8a96=Math[_0x20e651(0x5d7)](_0x4e8a96||0x1,0x1);while(_0x4e8a96--){_0x481115=_0x481115||this[_0x20e651(0x5e4)](),this[_0x20e651(0x25f)][_0x20e651(0x2e6)]=0xa0;const _0x3301c3=ColorManager[_0x20e651(0x3cf)]();this['contentsBack'][_0x20e651(0x1e3)](_0x589253+0x1,_0x20f5d2+0x1,_0x177a1d-0x2,_0x481115-0x2,_0x3301c3),this['contentsBack'][_0x20e651(0x2e6)]=0xff;}},ColorManager[_0x20768d(0x3cf)]=function(){const _0x7b3608=_0x20768d,_0x1f509e=VisuMZ[_0x7b3608(0x54f)]['Settings']['StatusWindow'];let _0x1beeff=_0x1f509e[_0x7b3608(0x64d)]!==undefined?_0x1f509e[_0x7b3608(0x64d)]:0x13;return ColorManager[_0x7b3608(0x5a0)](_0x1beeff);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x557)]=function(){const _0x4d142f=_0x20768d;if(VisuMZ[_0x4d142f(0x54f)][_0x4d142f(0x569)]['StatusWindow']['DrawEquipData']){VisuMZ[_0x4d142f(0x54f)][_0x4d142f(0x569)][_0x4d142f(0x319)]['DrawEquipData'][_0x4d142f(0x36c)](this);return;}const _0x2f4964=this[_0x4d142f(0x5e4)](),_0x3bfac1=this[_0x4d142f(0x5ad)]()+0x8;let _0x2ea51c=0x0,_0x53a392=0x0,_0x12cc56=this[_0x4d142f(0x556)],_0x231203=this['innerHeight'],_0x98d056=Math['floor'](_0x12cc56/0x2),_0x405ac6=_0x2ea51c+_0x12cc56-_0x98d056;this[_0x4d142f(0x4dd)](this[_0x4d142f(0x37b)],_0x2ea51c+this['itemPadding'](),_0x53a392,_0x12cc56-this[_0x4d142f(0x38f)]()*0x2),this['drawItemDarkRect'](_0x2ea51c,_0x53a392,_0x12cc56),_0x53a392+=_0x2f4964;if(this[_0x4d142f(0x1f0)](_0x2ea51c,_0x53a392,_0x98d056))_0x53a392+=0x0;if(this[_0x4d142f(0x34f)](_0x405ac6,_0x53a392,_0x98d056))_0x53a392+=_0x2f4964;const _0x6a3538=this['actorParams'](),_0x11e313=_0x53a392;_0x53a392=_0x231203-_0x6a3538[_0x4d142f(0x3c9)]*_0x3bfac1-0x4;let _0x16e582=_0x2ea51c,_0x37fda0=0x0,_0x20dbd4=_0x53a392;for(const _0x9d9e4a of _0x6a3538){_0x37fda0=Math[_0x4d142f(0x5d7)](this['drawParamName'](_0x9d9e4a,_0x2ea51c+0x4,_0x53a392+0x4,_0x12cc56),_0x37fda0),_0x53a392+=_0x3bfac1;}const _0x5288db=$gameParty[_0x4d142f(0x2ff)](),_0x3630f9=Math[_0x4d142f(0x465)]((_0x12cc56-_0x37fda0)/_0x5288db);_0x37fda0=_0x12cc56-_0x3630f9*_0x5288db;for(const _0x16d205 of $gameParty['battleMembers']()){const _0x2898e2=$gameParty[_0x4d142f(0x608)]()[_0x4d142f(0x2ce)](_0x16d205),_0x4dfef1=_0x16e582+_0x37fda0+_0x2898e2*_0x3630f9;this['changePaintOpacity'](_0x16d205['canEquip'](this[_0x4d142f(0x37b)])),this[_0x4d142f(0x4ff)](_0x16d205,_0x4dfef1+_0x3630f9/0x2,_0x20dbd4);let _0x138373=_0x20dbd4;for(const _0x368a80 of _0x6a3538){if('lhvHJ'!==_0x4d142f(0x59f)){function _0x41ca0b(){const _0x265495=_0x4d142f;this[_0x265495(0x430)]()&&(this['_commandWindow']['deselect'](),this[_0x265495(0x640)][_0x265495(0x471)]()),_0xc9a0a8[_0x265495(0x54f)][_0x265495(0x3ef)][_0x265495(0x36c)](this);}}else{const _0x42da32=_0x138373-(_0x2f4964-_0x3bfac1)/0x2;this['drawActorParamDifference'](_0x16d205,_0x368a80,_0x4dfef1,_0x42da32,_0x3630f9),_0x138373+=_0x3bfac1;}}}this['drawItemDarkRect'](_0x16e582,_0x11e313,_0x37fda0,_0x20dbd4-_0x11e313);for(let _0x46d581=0x0;_0x46d581<_0x5288db;_0x46d581++){if(_0x4d142f(0x459)===_0x4d142f(0x459)){const _0x94a17d=_0x16e582+_0x37fda0+_0x46d581*_0x3630f9;this[_0x4d142f(0x5ca)](_0x94a17d,_0x11e313,_0x3630f9,_0x20dbd4-_0x11e313);}else{function _0x303ebc(){const _0x2454c4=_0x4d142f;_0x53742a[_0x2454c4(0x41b)][_0x2454c4(0x5aa)][_0x2454c4(0x36c)](this,_0x202db9);}}}for(const _0x7adb09 of _0x6a3538){if(_0x4d142f(0x599)==='saALQ'){function _0x4d9c41(){const _0x4a209b=_0x4d142f;return _0x224151[_0x4a209b(0x54f)][_0x4a209b(0x629)]['call'](this);}}else{this[_0x4d142f(0x5ca)](_0x16e582,_0x20dbd4,_0x37fda0,_0x3bfac1);for(let _0x46b407=0x0;_0x46b407<_0x5288db;_0x46b407++){const _0x2e5aaa=_0x16e582+_0x37fda0+_0x46b407*_0x3630f9;this[_0x4d142f(0x5ca)](_0x2e5aaa,_0x20dbd4,_0x3630f9,_0x3bfac1);}_0x20dbd4+=_0x3bfac1;}}},Window_ShopStatus['prototype']['drawItemEquipType']=function(_0x2ec003,_0x5de95e,_0x162b29){const _0x4c2e6f=_0x20768d;if(!this['isEquipItem']())return![];const _0x328aac=$dataSystem[_0x4c2e6f(0x4bb)][this[_0x4c2e6f(0x37b)][_0x4c2e6f(0x225)]];return this[_0x4c2e6f(0x51f)](_0x328aac,_0x2ec003,_0x5de95e,_0x162b29,!![]),this[_0x4c2e6f(0x5ca)](_0x2ec003,_0x5de95e,_0x162b29),this[_0x4c2e6f(0x243)](),!![];},Window_ShopStatus['prototype'][_0x20768d(0x24d)]=function(){const _0x384264=_0x20768d,_0x1c1e67=VisuMZ['ItemsEquipsCore'][_0x384264(0x569)][_0x384264(0x47c)]['ItemQuantityFmt'];return _0x1c1e67['format']($gameParty['numItems'](this[_0x384264(0x37b)]));},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x4e4)]=function(){const _0x5ed1ec=_0x20768d;return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x5ed1ec(0x246)][_0x5ed1ec(0x569)][_0x5ed1ec(0x43f)]['ExtDisplayedParams']:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x376)]=function(){const _0x5d9aef=_0x20768d;return VisuMZ[_0x5d9aef(0x54f)][_0x5d9aef(0x569)][_0x5d9aef(0x319)][_0x5d9aef(0x4bf)];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x2b1)]=function(_0x4bfc24,_0x43a1a3,_0x514a9a,_0x924298){const _0x124864=_0x20768d;this[_0x124864(0x243)](),this[_0x124864(0x553)][_0x124864(0x290)]=this[_0x124864(0x376)]();let _0x319b49=this[_0x124864(0x2e2)](TextManager[_0x124864(0x369)](_0x4bfc24))+0x4+_0x43a1a3;if(Imported[_0x124864(0x5c0)]){if(_0x124864(0x40f)===_0x124864(0x264)){function _0x499eae(){const _0x4e6a87=_0x124864;this[_0x4e6a87(0x1fc)](null,_0x1a99ea);}}else this[_0x124864(0x62b)](_0x43a1a3,_0x514a9a,_0x924298,_0x4bfc24,!![]),VisuMZ[_0x124864(0x246)]['Settings'][_0x124864(0x43f)][_0x124864(0x401)]&&(_0x319b49+=ImageManager[_0x124864(0x2fb)]+0x4);}else this[_0x124864(0x58b)](ColorManager['systemColor']()),this[_0x124864(0x4c1)](TextManager[_0x124864(0x369)](_0x4bfc24),_0x43a1a3,_0x514a9a,_0x924298);return this[_0x124864(0x243)](),_0x319b49;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x29d)]=function(_0x42bb04,_0x6601fc,_0x127622,_0x345078,_0x37917b){const _0x110118=_0x20768d;_0x127622+=this[_0x110118(0x38f)](),_0x37917b-=this[_0x110118(0x38f)]()*0x2;const _0x17284c=VisuMZ['ItemsEquipsCore'][_0x110118(0x569)][_0x110118(0x319)];this['contents']['fontSize']=_0x17284c['ParamChangeFontSize'],this[_0x110118(0x42e)](_0x42bb04[_0x110118(0x448)](this[_0x110118(0x37b)]));if(_0x42bb04[_0x110118(0x261)](this[_0x110118(0x37b)])){if(_0x110118(0x2fe)===_0x110118(0x247)){function _0x5e6ed2(){if(!_0x767f6d['value'](_0x2cb5a4))return![];}}else{const _0x3b6e5c=_0x17284c[_0x110118(0x375)];this[_0x110118(0x4c1)](_0x3b6e5c,_0x127622,_0x345078,_0x37917b,_0x110118(0x420));}}else{if(_0x42bb04[_0x110118(0x448)](this[_0x110118(0x37b)])){const _0x217127=JsonEx['makeDeepCopy'](_0x42bb04);_0x217127[_0x110118(0x3fe)]=!![];const _0x53062a=_0x217127[_0x110118(0x5fe)]()[_0x110118(0x2ce)](this[_0x110118(0x37b)][_0x110118(0x225)]);if(_0x53062a>=0x0)_0x217127[_0x110118(0x44e)](_0x53062a,this['_item']);let _0x2fab41=0x0,_0x39cf44=0x0,_0x516e59=0x0;if(Imported[_0x110118(0x5c0)]){if(_0x110118(0x387)==='ueccI')_0x2fab41=_0x217127[_0x110118(0x5d5)](_0x6601fc),_0x39cf44=_0x2fab41-_0x42bb04[_0x110118(0x5d5)](_0x6601fc),this[_0x110118(0x58b)](ColorManager['paramchangeTextColor'](_0x39cf44)),_0x516e59=(_0x39cf44>=0x0?'+':'')+VisuMZ['ConvertNumberToString'](_0x39cf44,0x0,_0x6601fc);else{function _0x12ec2d(){const _0x56bd53=_0x110118;this[_0x56bd53(0x1d1)](_0x526ecf);}}}else _0x2fab41=_0x217127[_0x110118(0x369)](_0x6601fc),_0x39cf44=_0x2fab41-_0x42bb04['param'](_0x6601fc),this[_0x110118(0x58b)](ColorManager[_0x110118(0x260)](_0x39cf44)),_0x516e59=(_0x39cf44>=0x0?'+':'')+_0x39cf44;if(_0x516e59==='+0')_0x516e59=_0x17284c['NoChangeMarker'];this[_0x110118(0x4c1)](_0x516e59,_0x127622,_0x345078,_0x37917b,_0x110118(0x420));}else{if(_0x110118(0x4a4)!=='acZwH'){const _0x3965db=_0x17284c[_0x110118(0x1fb)];this['drawText'](_0x3965db,_0x127622,_0x345078,_0x37917b,_0x110118(0x420));}else{function _0x508977(){const _0x122aaa=_0x110118,_0x2dcf5b=_0x46daa1[_0x122aaa(0x54f)][_0x122aaa(0x569)]['StatusWindow'][_0x122aaa(0x2aa)];return _0x2dcf5b['format'](_0x15a9b9['hp']);}}}}this[_0x110118(0x243)](),this[_0x110118(0x42e)](!![]);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x20e)]=function(){const _0x5412a1=_0x20768d;VisuMZ['ItemsEquipsCore']['Settings'][_0x5412a1(0x319)][_0x5412a1(0x666)]['call'](this);},Window_ShopStatus['prototype'][_0x20768d(0x274)]=function(){const _0x972776=_0x20768d;this[_0x972776(0x232)]={};if(!this[_0x972776(0x37b)])return;const _0x389a2f=this['_item'][_0x972776(0x38a)];if(_0x389a2f[_0x972776(0x449)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x135738=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0xca69f1 of _0x135738){if(_0x972776(0x304)===_0x972776(0x304)){if(_0xca69f1[_0x972776(0x449)](/(.*):[ ](.*)/i)){const _0x3e645d=String(RegExp['$1'])[_0x972776(0x53a)]()[_0x972776(0x3b0)](),_0x491b6c=String(RegExp['$2'])[_0x972776(0x3b0)]();this['_customItemInfo'][_0x3e645d]=_0x491b6c;}}else{function _0x5d4a7c(){const _0x4b3060=_0x972776;return _0x18784f['ItemsEquipsCore'][_0x4b3060(0x569)][_0x4b3060(0x32c)][_0x4b3060(0x29f)];}}}}},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x648)]=function(){return Math['max'](0x1,$gameSystem['mainFontSize']()-0x4);},Window_ShopStatus[_0x20768d(0x41b)]['resetFontSettings']=function(){const _0x3e84f7=_0x20768d;Window_StatusBase[_0x3e84f7(0x41b)]['resetFontSettings']['call'](this),this['contents'][_0x3e84f7(0x290)]=this[_0x3e84f7(0x3d6)]||this[_0x3e84f7(0x553)][_0x3e84f7(0x290)],this[_0x3e84f7(0x553)]['textColor']=this[_0x3e84f7(0x3df)]||this[_0x3e84f7(0x553)][_0x3e84f7(0x230)];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x408)]=function(){const _0x41d5ba=_0x20768d;return this[_0x41d5ba(0x553)]['fontSize']/$gameSystem[_0x41d5ba(0x227)]();},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x1d6)]=function(_0x1d329e,_0x58bc8e,_0xd18224){const _0x29216b=_0x20768d,_0x4f79b8=ImageManager[_0x29216b(0x37d)](_0x29216b(0x617)),_0x31d65c=ImageManager[_0x29216b(0x2fb)],_0x4798bf=ImageManager['iconHeight'],_0x4e22ac=_0x1d329e%0x10*_0x31d65c,_0x233b4e=Math[_0x29216b(0x465)](_0x1d329e/0x10)*_0x4798bf,_0x3d49af=Math[_0x29216b(0x23e)](_0x31d65c*this[_0x29216b(0x408)]()),_0x290709=Math[_0x29216b(0x23e)](_0x4798bf*this[_0x29216b(0x408)]());this[_0x29216b(0x553)][_0x29216b(0x294)](_0x4f79b8,_0x4e22ac,_0x233b4e,_0x31d65c,_0x4798bf,_0x58bc8e,_0xd18224,_0x3d49af,_0x290709);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x654)]=function(_0x194fff,_0x490f09){const _0x30edaa=_0x20768d;_0x490f09[_0x30edaa(0x3c3)]&&this[_0x30edaa(0x1d6)](_0x194fff,_0x490f09['x'],_0x490f09['y']+0x2);_0x490f09['x']+=Math[_0x30edaa(0x23e)](ImageManager[_0x30edaa(0x2fb)]*this['fontSizeRatio']());if(this[_0x30edaa(0x408)]()===0x1)_0x490f09['x']+=0x4;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x51f)]=function(_0x38c9d4,_0x545682,_0x11780a,_0x568700,_0x218529,_0x37206e){const _0x1e12a6=_0x20768d;_0x38c9d4=_0x38c9d4||'',_0x37206e=_0x37206e||_0x1e12a6(0x582),this['_resetFontSize']=this['itemDataFontSize'](),this[_0x1e12a6(0x3df)]=_0x218529?ColorManager[_0x1e12a6(0x1ee)]():this[_0x1e12a6(0x553)][_0x1e12a6(0x230)],_0x545682+=this[_0x1e12a6(0x38f)](),_0x568700-=this['itemPadding']()*0x2;const _0x3d35c5=this[_0x1e12a6(0x1d8)](_0x38c9d4);if(_0x37206e===_0x1e12a6(0x420))_0x545682=_0x545682+Math[_0x1e12a6(0x465)]((_0x568700-_0x3d35c5[_0x1e12a6(0x341)])/0x2);else _0x37206e==='right'&&(_0x545682=_0x545682+_0x568700-_0x3d35c5[_0x1e12a6(0x341)]);_0x11780a+=(this[_0x1e12a6(0x5e4)]()-_0x3d35c5[_0x1e12a6(0x61d)])/0x2,this[_0x1e12a6(0x1f5)](_0x38c9d4,_0x545682,_0x11780a,_0x568700),this[_0x1e12a6(0x3d6)]=undefined,this['_resetFontColor']=undefined,this[_0x1e12a6(0x243)]();},Window_ShopStatus['prototype'][_0x20768d(0x37c)]=function(_0x171a55,_0x2f37b0,_0x499ea7){const _0x1c3c6d=_0x20768d;if(!DataManager[_0x1c3c6d(0x3f0)](this['_item']))return![];const _0x38e357=this[_0x1c3c6d(0x41e)]();this[_0x1c3c6d(0x51f)](_0x38e357,_0x171a55,_0x2f37b0,_0x499ea7,!![]);const _0x5ac8de=this['getItemConsumableText']();return this['drawItemKeyData'](_0x5ac8de,_0x171a55,_0x2f37b0,_0x499ea7,![],'right'),this['drawItemDarkRect'](_0x171a55,_0x2f37b0,_0x499ea7),this[_0x1c3c6d(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x41e)]=function(){const _0x4bab23=_0x20768d;return VisuMZ['ItemsEquipsCore']['Settings'][_0x4bab23(0x319)][_0x4bab23(0x2df)];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x4af)]=function(){const _0x5f06a8=_0x20768d,_0x4e332e=_0x5f06a8(0x47e);if(this[_0x5f06a8(0x232)][_0x4e332e])return this[_0x5f06a8(0x232)][_0x4e332e];if(this['canConsumeItem']()){if(_0x5f06a8(0x3e3)===_0x5f06a8(0x3e3))return VisuMZ[_0x5f06a8(0x54f)][_0x5f06a8(0x569)][_0x5f06a8(0x319)][_0x5f06a8(0x267)];else{function _0x3c7988(){const _0x43eb46=_0x5f06a8;_0x17d08f[_0x43eb46(0x41b)][_0x43eb46(0x5aa)]['call'](this,_0xd4c393);}}}else{if(_0x5f06a8(0x522)==='OErTQ')return VisuMZ[_0x5f06a8(0x54f)]['Settings']['StatusWindow'][_0x5f06a8(0x605)];else{function _0xfb5cbd(){const _0x4bff3b=_0x5f06a8;return _0x3f7412[_0x4bff3b(0x438)](_0x4bff3b(0x1e4));}}}},Window_ShopStatus['prototype'][_0x20768d(0x5ef)]=function(){const _0x86ec5d=_0x20768d;if(VisuMZ[_0x86ec5d(0x246)]&&VisuMZ[_0x86ec5d(0x246)][_0x86ec5d(0x569)]['QoL']['KeyItemProtect']&&DataManager[_0x86ec5d(0x391)](this['_item'])){if(_0x86ec5d(0x295)===_0x86ec5d(0x393)){function _0xae4bf9(){const _0x3c2463=_0x86ec5d;_0x4a017a[_0x3c2463(0x41b)][_0x3c2463(0x4f0)]['call'](this);}}else return![];}else return this[_0x86ec5d(0x37b)]['consumable'];},Window_ShopStatus['prototype'][_0x20768d(0x34f)]=function(_0x14c30b,_0x15edf6,_0x213b57){const _0x3d45fb=_0x20768d;if(!this[_0x3d45fb(0x4f5)]()&&!DataManager['isItem'](this[_0x3d45fb(0x37b)]))return![];if(DataManager['isKeyItem'](this[_0x3d45fb(0x37b)])&&!$dataSystem[_0x3d45fb(0x57c)]){const _0xac6a10=TextManager[_0x3d45fb(0x251)];this['drawItemKeyData'](_0xac6a10,_0x14c30b,_0x15edf6,_0x213b57,!![],_0x3d45fb(0x420));}else{if(_0x3d45fb(0x601)!==_0x3d45fb(0x601)){function _0x2713e8(){const _0x5547e4=_0x3d45fb;this[_0x5547e4(0x1d1)](_0x17d048);}}else{const _0x413961=TextManager[_0x3d45fb(0x415)];this['drawItemKeyData'](_0x413961,_0x14c30b,_0x15edf6,_0x213b57,!![]);const _0x220204=this[_0x3d45fb(0x24d)]();this[_0x3d45fb(0x51f)](_0x220204,_0x14c30b,_0x15edf6,_0x213b57,![],_0x3d45fb(0x5c2));}}return this[_0x3d45fb(0x5ca)](_0x14c30b,_0x15edf6,_0x213b57),this[_0x3d45fb(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)]['getItemQuantityText']=function(){const _0x48314c=_0x20768d,_0x58ccd3='QUANTITY';if(this[_0x48314c(0x232)][_0x58ccd3])return this[_0x48314c(0x232)][_0x58ccd3];const _0x44bcb9=VisuMZ[_0x48314c(0x54f)]['Settings']['ItemScene']['ItemQuantityFmt'];return _0x44bcb9[_0x48314c(0x60a)]($gameParty[_0x48314c(0x50d)](this[_0x48314c(0x37b)]));},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x36b)]=function(_0x305fb7,_0x467f5f,_0x273c58){const _0x50b9b9=_0x20768d,_0x40e4ad=this['getItemOccasionText']();return this[_0x50b9b9(0x51f)](_0x40e4ad,_0x305fb7,_0x467f5f,_0x273c58,![],_0x50b9b9(0x420)),this['drawItemDarkRect'](_0x305fb7,_0x467f5f,_0x273c58),this[_0x50b9b9(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)]['getItemOccasionText']=function(){const _0x6e6749=_0x20768d,_0x4eb068=_0x6e6749(0x49f);if(this[_0x6e6749(0x232)][_0x4eb068])return this[_0x6e6749(0x232)][_0x4eb068];const _0x4f671a=VisuMZ[_0x6e6749(0x54f)][_0x6e6749(0x569)][_0x6e6749(0x319)],_0x4b1b4b=_0x6e6749(0x665)[_0x6e6749(0x60a)](this[_0x6e6749(0x37b)][_0x6e6749(0x568)]);return _0x4f671a[_0x4b1b4b];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x2f7)]=function(_0x171511,_0x245f55,_0x4b3a2e){const _0x5527e8=_0x20768d,_0x51253b=this[_0x5527e8(0x3d1)]();return this[_0x5527e8(0x51f)](_0x51253b,_0x171511,_0x245f55,_0x4b3a2e,![],_0x5527e8(0x420)),this['drawItemDarkRect'](_0x171511,_0x245f55,_0x4b3a2e),this[_0x5527e8(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x3d1)]=function(){const _0x344dde=_0x20768d,_0xc096e3='SCOPE';if(this[_0x344dde(0x232)][_0xc096e3])return this[_0x344dde(0x232)][_0xc096e3];const _0x116b5a=VisuMZ['ItemsEquipsCore'][_0x344dde(0x569)][_0x344dde(0x319)];if(Imported['VisuMZ_1_BattleCore']){const _0x2c28da=this[_0x344dde(0x37b)][_0x344dde(0x38a)];if(_0x2c28da['match'](/<TARGET:[ ](.*)>/i)){if(_0x344dde(0x5f8)==='GkmNn'){function _0x32a31c(){const _0x3d7a47=_0x344dde;this[_0x3d7a47(0x5f1)][_0x3d7a47(0x3bb)]();}}else{const _0x359c98=String(RegExp['$1']);if(_0x359c98['match'](/(\d+) RANDOM ANY/i)){if('JtHaa'!==_0x344dde(0x49d)){function _0x5090db(){const _0x56caa8=_0x344dde;this[_0x56caa8(0x3aa)]();}}else return _0x116b5a['ScopeRandomAny'][_0x344dde(0x60a)](Number(RegExp['$1']));}else{if(_0x359c98[_0x344dde(0x449)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){if('HtUFH'!=='pBBiR')return _0x116b5a[_0x344dde(0x219)]['format'](Number(RegExp['$1']));else{function _0x49b4c0(){const _0x5291fc=_0x344dde,_0x472207=_0x5291fc(0x475);if(this[_0x5291fc(0x232)][_0x472207])return this[_0x5291fc(0x232)][_0x472207];const _0x1b6d3e=_0x5291fc(0x280);return _0x1b6d3e['format'](this[_0x5291fc(0x37b)][_0x5291fc(0x51c)]);}}}else{if(_0x359c98[_0x344dde(0x449)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x116b5a[_0x344dde(0x5b3)][_0x344dde(0x60a)](Number(RegExp['$1']));else{if(_0x359c98[_0x344dde(0x449)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x344dde(0x2d3)!==_0x344dde(0x5e0))return _0x116b5a[_0x344dde(0x61c)];else{function _0x4153f9(){const _0x782af4=_0x344dde;this[_0x782af4(0x2ac)]['selfTP']=this[_0x782af4(0x37b)][_0x782af4(0x39c)],_0x4b51e3=!![];}}}}}}}}}const _0x2012f6=_0x344dde(0x3ba)[_0x344dde(0x60a)](this['_item']['scope']);return _0x116b5a[_0x2012f6];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x1f8)]=function(_0x5343b1,_0x50076b,_0x400510){const _0x122595=_0x20768d,_0x111af9=this[_0x122595(0x317)]();this[_0x122595(0x51f)](_0x111af9,_0x5343b1,_0x50076b,_0x400510,!![]);const _0x42b443=this['getItemSpeedText']();return this['drawItemKeyData'](_0x42b443,_0x5343b1,_0x50076b,_0x400510,![],'right'),this[_0x122595(0x5ca)](_0x5343b1,_0x50076b,_0x400510),this[_0x122595(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x317)]=function(){const _0x2bfac3=_0x20768d;return VisuMZ['ItemsEquipsCore'][_0x2bfac3(0x569)][_0x2bfac3(0x319)][_0x2bfac3(0x577)];},Window_ShopStatus[_0x20768d(0x41b)]['getItemSpeedText']=function(){const _0x5c8f3e=_0x20768d,_0x4bea00=_0x5c8f3e(0x1fa);if(this[_0x5c8f3e(0x232)][_0x4bea00])return this['_customItemInfo'][_0x4bea00];const _0x3cd38d=this[_0x5c8f3e(0x37b)][_0x5c8f3e(0x4b4)];if(_0x3cd38d>=0x7d0){if(_0x5c8f3e(0x612)!==_0x5c8f3e(0x2be))return VisuMZ[_0x5c8f3e(0x54f)]['Settings'][_0x5c8f3e(0x319)][_0x5c8f3e(0x4b1)];else{function _0x3c3a75(){const _0x5114c5=_0x5c8f3e;this[_0x5114c5(0x3ec)]();}}}else{if(_0x3cd38d>=0x3e8){if(_0x5c8f3e(0x23a)==='UCMGB')return VisuMZ[_0x5c8f3e(0x54f)]['Settings'][_0x5c8f3e(0x319)][_0x5c8f3e(0x3f6)];else{function _0x3f7f6a(){const _0x575e5=_0x5c8f3e;_0x1efdfb['ItemsEquipsCore']['Scene_Shop_commandSell'][_0x575e5(0x36c)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x575e5(0x641)](),this['isUseModernControls']()&&(this[_0x575e5(0x4cd)][_0x575e5(0x3cb)](0x0),this[_0x575e5(0x385)]());}}}else{if(_0x3cd38d>0x0){if('nDSsb'===_0x5c8f3e(0x4e3)){function _0x636b29(){const _0x49c972=_0x5c8f3e;return!this[_0x49c972(0x2b4)]()[_0x49c972(0x383)](this[_0x49c972(0x225)]());}}else return VisuMZ[_0x5c8f3e(0x54f)][_0x5c8f3e(0x569)]['StatusWindow'][_0x5c8f3e(0x495)];}else{if(_0x3cd38d===0x0)return VisuMZ[_0x5c8f3e(0x54f)][_0x5c8f3e(0x569)]['StatusWindow'][_0x5c8f3e(0x286)];else{if(_0x3cd38d>-0x3e8)return VisuMZ['ItemsEquipsCore'][_0x5c8f3e(0x569)][_0x5c8f3e(0x319)]['SpeedNeg999'];else{if(_0x3cd38d>-0x7d0)return VisuMZ[_0x5c8f3e(0x54f)]['Settings']['StatusWindow'][_0x5c8f3e(0x3b3)];else{if(_0x3cd38d<=-0x7d0){if(_0x5c8f3e(0x3a2)==='nFFYO'){function _0x3c1923(){const _0x5b5692=_0x5c8f3e;_0x3aa630['isTriggered'](_0x5b5692(0x1cf))&&_0x5cfa38[_0x5b5692(0x2dd)](_0x5b5692(0x1e4))&&this[_0x5b5692(0x5b7)](),_0x2ff50b[_0x5b5692(0x201)](_0x5b5692(0x595))&&_0x4ae7ef['isPressed'](_0x5b5692(0x1e4))&&this['cursorPageup']();}}else return VisuMZ['ItemsEquipsCore']['Settings'][_0x5c8f3e(0x319)][_0x5c8f3e(0x4e2)];}else{if(_0x5c8f3e(0x27f)===_0x5c8f3e(0x395)){function _0x599dad(){const _0x1712af=_0x5c8f3e,_0x5de346=_0x14b008[_0x1712af(0x5a1)][_0x1712af(0x452)];if(!_0x5de346)return;if(!_0x5de346[_0x1712af(0x282)](this[_0x1712af(0x298)]()))return![];const _0x259267=_0x5de346[_0x1712af(0x5fe)]()[this[_0x1712af(0x298)]()];if(_0x5de346['nonRemovableEtypes']()[_0x1712af(0x383)](_0x259267))return![];return!![];;}}else return _0x5c8f3e(0x5bc);}}}}}}}},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x204)]=function(_0xb207ca,_0x82d59c,_0x4e8f6a){const _0x3f06d0=_0x20768d,_0x542db8=this[_0x3f06d0(0x39f)]();this[_0x3f06d0(0x51f)](_0x542db8,_0xb207ca,_0x82d59c,_0x4e8f6a,!![]);const _0x24ad87=this[_0x3f06d0(0x432)]();return this[_0x3f06d0(0x51f)](_0x24ad87,_0xb207ca,_0x82d59c,_0x4e8f6a,![],_0x3f06d0(0x5c2)),this[_0x3f06d0(0x5ca)](_0xb207ca,_0x82d59c,_0x4e8f6a),this[_0x3f06d0(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x39f)]=function(){const _0xaee040=_0x20768d;return VisuMZ[_0xaee040(0x54f)][_0xaee040(0x569)]['StatusWindow'][_0xaee040(0x3ca)];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x432)]=function(){const _0x43404a=_0x20768d,_0x22d357=_0x43404a(0x265);if(this[_0x43404a(0x232)][_0x22d357])return this['_customItemInfo'][_0x22d357];if(Imported[_0x43404a(0x34c)]){if(_0x43404a(0x3f4)===_0x43404a(0x3f4)){const _0x28e62a=this[_0x43404a(0x37b)][_0x43404a(0x38a)];if(_0x28e62a[_0x43404a(0x449)](/<ALWAYS HIT>/i))return'100%';else{if(_0x28e62a['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x43404a(0x2ca)[_0x43404a(0x60a)](Number(RegExp['$1']));}}else{function _0x586d9e(){const _0x45a7ea=_0x43404a;if(this[_0x45a7ea(0x3fe)])return;if(!_0x1e2f12['ItemsEquipsCore'][_0x45a7ea(0x569)][_0x45a7ea(0x32c)][_0x45a7ea(0x4aa)])return;const _0x45b8b5=_0x3e8b6e[_0x45a7ea(0x3b8)](_0x25ab65[_0x45a7ea(0x5a5)]()*this[_0x45a7ea(0x59d)]),_0x44a1c8=_0x57a24d[_0x45a7ea(0x3b8)](_0x3e532d[_0x45a7ea(0x234)]()*this[_0x45a7ea(0x2de)]);if(this['hp']>0x0)this[_0x45a7ea(0x399)](_0x45b8b5);if(this['mp']>0x0)this[_0x45a7ea(0x637)](_0x44a1c8);}}}return _0x43404a(0x2ca)[_0x43404a(0x60a)](this[_0x43404a(0x37b)][_0x43404a(0x32f)]);},Window_ShopStatus['prototype'][_0x20768d(0x4fe)]=function(_0x5ecdcd,_0x13c008,_0x209f21){const _0x474bcb=_0x20768d,_0xcd3e9f=this[_0x474bcb(0x338)]();this['drawItemKeyData'](_0xcd3e9f,_0x5ecdcd,_0x13c008,_0x209f21,!![]);const _0x1d6cde=this['getItemRepeatsText']();return this['drawItemKeyData'](_0x1d6cde,_0x5ecdcd,_0x13c008,_0x209f21,![],'right'),this['drawItemDarkRect'](_0x5ecdcd,_0x13c008,_0x209f21),this[_0x474bcb(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x338)]=function(){const _0x3a8f22=_0x20768d;return VisuMZ[_0x3a8f22(0x54f)][_0x3a8f22(0x569)][_0x3a8f22(0x319)][_0x3a8f22(0x279)];},Window_ShopStatus[_0x20768d(0x41b)]['getItemRepeatsText']=function(){const _0x2824df=_0x20768d,_0x1a2d4d=_0x2824df(0x475);if(this[_0x2824df(0x232)][_0x1a2d4d])return this['_customItemInfo'][_0x1a2d4d];const _0x20c749=_0x2824df(0x280);return _0x20c749['format'](this[_0x2824df(0x37b)][_0x2824df(0x51c)]);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x4d2)]=function(_0x53d8d8,_0x3142b2,_0x2902c4){const _0x275e7a=_0x20768d,_0x26d089=this[_0x275e7a(0x576)]();this[_0x275e7a(0x51f)](_0x26d089,_0x53d8d8,_0x3142b2,_0x2902c4,!![]);const _0x174fd3=this[_0x275e7a(0x441)]();return this[_0x275e7a(0x51f)](_0x174fd3,_0x53d8d8,_0x3142b2,_0x2902c4,![],'right'),this['drawItemDarkRect'](_0x53d8d8,_0x3142b2,_0x2902c4),this[_0x275e7a(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x576)]=function(){const _0x4f33d9=_0x20768d;return VisuMZ[_0x4f33d9(0x54f)][_0x4f33d9(0x569)]['StatusWindow'][_0x4f33d9(0x53e)];},Window_ShopStatus[_0x20768d(0x41b)]['getItemHitTypeText']=function(){const _0x2948ee=_0x20768d,_0x3c15da=_0x2948ee(0x464);if(this[_0x2948ee(0x232)][_0x3c15da])return this['_customItemInfo'][_0x3c15da];const _0x663da9=VisuMZ[_0x2948ee(0x54f)]['Settings'][_0x2948ee(0x319)],_0x3bbdf0=_0x2948ee(0x482)[_0x2948ee(0x60a)](this[_0x2948ee(0x37b)][_0x2948ee(0x48b)]);return _0x663da9[_0x3bbdf0];},Window_ShopStatus['prototype'][_0x20768d(0x611)]=function(_0x15241c,_0x3c668d,_0x2c2c0d){const _0x4b7471=_0x20768d;if(this[_0x4b7471(0x37b)][_0x4b7471(0x33e)][_0x4b7471(0x5be)]<=0x0)return _0x3c668d;if(this[_0x4b7471(0x626)](_0x15241c,_0x3c668d,_0x2c2c0d))_0x3c668d+=this[_0x4b7471(0x5e4)]();if(this[_0x4b7471(0x1d9)](_0x15241c,_0x3c668d,_0x2c2c0d))_0x3c668d+=this['lineHeight']();return this[_0x4b7471(0x243)](),_0x3c668d;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x626)]=function(_0x30d46b,_0x5e107c,_0xa1f2cf){const _0x36d448=_0x20768d,_0x15316f=this['getItemDamageElementLabel']();this[_0x36d448(0x51f)](_0x15316f,_0x30d46b,_0x5e107c,_0xa1f2cf,!![]);const _0x2bf7ce=this['getItemDamageElementText']();return this[_0x36d448(0x51f)](_0x2bf7ce,_0x30d46b,_0x5e107c,_0xa1f2cf,![],_0x36d448(0x5c2)),this[_0x36d448(0x5ca)](_0x30d46b,_0x5e107c,_0xa1f2cf),this[_0x36d448(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x26c)]=function(){const _0x2f03c8=_0x20768d;return VisuMZ['ItemsEquipsCore'][_0x2f03c8(0x569)][_0x2f03c8(0x319)][_0x2f03c8(0x23f)];},Window_ShopStatus[_0x20768d(0x41b)]['getItemDamageElementText']=function(){const _0x437c6e=_0x20768d,_0x44482a='ELEMENT';if(this['_customItemInfo'][_0x44482a])return this[_0x437c6e(0x232)][_0x44482a];if(this[_0x437c6e(0x37b)][_0x437c6e(0x33e)][_0x437c6e(0x29b)]<=-0x1){if('kYyRZ'!==_0x437c6e(0x34a))return VisuMZ['ItemsEquipsCore'][_0x437c6e(0x569)]['StatusWindow'][_0x437c6e(0x61b)];else{function _0x421b73(){return this['defaultItemMax'](_0x31fe75);}}}else{if(this[_0x437c6e(0x37b)][_0x437c6e(0x33e)]['elementId']===0x0){if('UeFww'!=='lzbKS')return VisuMZ[_0x437c6e(0x54f)][_0x437c6e(0x569)]['StatusWindow'][_0x437c6e(0x266)];else{function _0x58287e(){this['addItemCategory'](_0x52f99e);}}}else return $dataSystem[_0x437c6e(0x1ea)][this[_0x437c6e(0x37b)][_0x437c6e(0x33e)][_0x437c6e(0x29b)]];}},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x1d9)]=function(_0x1b4eff,_0x5d45e7,_0x3a9e3d){const _0x1a8847=_0x20768d,_0x2333bd=this[_0x1a8847(0x4cc)]();this[_0x1a8847(0x51f)](_0x2333bd,_0x1b4eff,_0x5d45e7,_0x3a9e3d,!![]),this['setupItemDamageTempActors']();const _0x268ae4=this['getItemDamageAmountText'](),_0x5a817f=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x1a8847(0x37b)][_0x1a8847(0x33e)][_0x1a8847(0x5be)]]);return this['changeTextColor'](_0x5a817f),this[_0x1a8847(0x51f)](_0x268ae4,_0x1b4eff,_0x5d45e7,_0x3a9e3d,![],_0x1a8847(0x5c2)),this[_0x1a8847(0x5ca)](_0x1b4eff,_0x5d45e7,_0x3a9e3d),this[_0x1a8847(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)]['getItemDamageAmountLabel']=function(){const _0x3b0779=_0x20768d;if(Imported['VisuMZ_1_BattleCore']&&DataManager[_0x3b0779(0x456)](this[_0x3b0779(0x37b)])!==_0x3b0779(0x3a1)){if('zYXXw'!=='zYXXw'){function _0xa0cd87(){const _0x10e581=_0x3b0779;_0x356116['prototype'][_0x10e581(0x523)][_0x10e581(0x36c)](this);if(this[_0x10e581(0x5ea)])this[_0x10e581(0x333)]();}}else return this[_0x3b0779(0x314)]();}else return this[_0x3b0779(0x27c)]();},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x27c)]=function(){const _0x4656d9=_0x20768d,_0x593036=VisuMZ['ItemsEquipsCore']['Settings'][_0x4656d9(0x319)],_0x3b79e3='DamageType%1'[_0x4656d9(0x60a)](this[_0x4656d9(0x37b)][_0x4656d9(0x33e)][_0x4656d9(0x5be)]),_0x1be87a=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x4656d9(0x33e)][_0x4656d9(0x5be)]];return _0x593036[_0x3b79e3][_0x4656d9(0x60a)](_0x1be87a);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x3af)]=function(){const _0x1d5e14=_0x20768d,_0xda755f=$gameActors[_0x1d5e14(0x5de)](0x1);this[_0x1d5e14(0x4c9)]=JsonEx[_0x1d5e14(0x32b)](_0xda755f),this[_0x1d5e14(0x35a)]=JsonEx[_0x1d5e14(0x32b)](_0xda755f);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x5fb)]=function(){const _0x413484=_0x20768d,_0x22e3bd=_0x413484(0x60d);if(this['_customItemInfo'][_0x22e3bd])return this[_0x413484(0x232)][_0x22e3bd];if(Imported['VisuMZ_1_BattleCore']&&DataManager[_0x413484(0x456)](this[_0x413484(0x37b)])!==_0x413484(0x3a1)){if('iyUOk'!==_0x413484(0x287))return this['getItemDamageAmountTextBattleCore']();else{function _0x47f910(){const _0x25b835=_0x413484,_0x56737c=this[_0x25b835(0x3f7)](_0x212640);if(!_0x56737c||!this[_0x25b835(0x2bc)]())return;if(!_0x189eb3[_0x25b835(0x3fd)](_0x56737c))return;const _0x3f1e9b=this[_0x25b835(0x1fd)](_0x22b440),_0x532c92=_0x3f1e9b['x'],_0xfb26be=_0x3f1e9b['y']+(this[_0x25b835(0x5e4)]()-_0x185856[_0x25b835(0x65c)])/0x2,_0x36f8f3=_0x511e60[_0x25b835(0x54f)][_0x25b835(0x569)]['New'][_0x25b835(0x39b)],_0x435f6c=_0x164204[_0x25b835(0x54f)]['Settings']['New']['OffsetY'];this[_0x25b835(0x49e)](_0x56737c,_0x532c92+_0x36f8f3,_0xfb26be+_0x435f6c);}}}else return this[_0x413484(0x555)]();},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x555)]=function(){const _0x296590=_0x20768d;window['a']=this['_tempActorA'],window['b']=this['_tempActorB'],this[_0x296590(0x4c9)]['setShopStatusWindowMode'](!![]),this['_tempActorB'][_0x296590(0x4c3)]([0x3,0x4][_0x296590(0x383)](this[_0x296590(0x37b)]['damage'][_0x296590(0x5be)]));let _0x5a27d8=this[_0x296590(0x37b)]['damage'][_0x296590(0x344)];try{if(_0x296590(0x61a)===_0x296590(0x321)){function _0x38769a(){const _0x48f309=_0x296590;_0x5da97d='weapon-%1'[_0x48f309(0x60a)](_0x10fc0d['id']);}}else{const _0x193220=Math[_0x296590(0x5d7)](eval(_0x5a27d8),0x0)/window['a'][_0x296590(0x477)];this[_0x296590(0x645)]();if(isNaN(_0x193220)){if('fqkLo'===_0x296590(0x38d)){function _0x34c27e(){const _0x24a5de=_0x296590;if(this[_0x24a5de(0x3fe)])return![];_0x258501[_0x24a5de(0x48d)]=!![];const _0x530d48=_0x8b60dc[_0x24a5de(0x54f)][_0x24a5de(0x5bd)][_0x24a5de(0x36c)](this,_0x425b41,_0x5969a1);return _0x234b3d[_0x24a5de(0x48d)]=![],_0x530d48;}}else return _0x296590(0x5bc);}else{if('EksQv'===_0x296590(0x3a0)){function _0x6bc0c3(){const _0x86c06b=_0x296590;this[_0x86c06b(0x232)]={};if(!this[_0x86c06b(0x37b)])return;const _0x8c2f49=this[_0x86c06b(0x37b)]['note'];if(_0x8c2f49[_0x86c06b(0x449)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x14cfa4=_0x28514e(_0x4e3e62['$1'])[_0x86c06b(0x3ff)](/[\r\n]+/);for(const _0x528cb4 of _0x14cfa4){if(_0x528cb4[_0x86c06b(0x449)](/(.*):[ ](.*)/i)){const _0x5ac941=_0x2fecbc(_0xdf1b7b['$1'])[_0x86c06b(0x53a)]()[_0x86c06b(0x3b0)](),_0x1b0db3=_0x47f3b3(_0x22d549['$2'])['trim']();this[_0x86c06b(0x232)][_0x5ac941]=_0x1b0db3;}}}}}else return'%1%'[_0x296590(0x60a)](Math['round'](_0x193220*0x64));}}}catch(_0x1e9490){if($gameTemp['isPlaytest']()){if(_0x296590(0x4e1)!==_0x296590(0x255))console[_0x296590(0x400)](_0x296590(0x5a2)[_0x296590(0x60a)](this['_item'][_0x296590(0x254)])),console[_0x296590(0x400)](_0x1e9490);else{function _0x443af0(){const _0xb0ca6e=_0x296590,_0x449290=_0x9f6a8[_0xb0ca6e(0x375)];this[_0xb0ca6e(0x4c1)](_0x449290,_0x284ef9,_0x2465ff,_0x3ddfef,_0xb0ca6e(0x420));}}}return this['revertGlobalNamespaceVariables'](),_0x296590(0x5bc);}},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x645)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x211)]=function(_0x1679f3,_0x38eee7,_0x414566){const _0x21157e=_0x20768d;if(!this[_0x21157e(0x21b)]())return _0x38eee7;if(this['drawItemEffectsHpRecovery'](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this[_0x21157e(0x5e4)]();if(this[_0x21157e(0x631)](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this[_0x21157e(0x5e4)]();if(this['drawItemEffectsTpRecovery'](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this[_0x21157e(0x5e4)]();if(this[_0x21157e(0x426)](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this[_0x21157e(0x5e4)]();if(this['drawItemEffectsMpDamage'](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this['lineHeight']();if(this[_0x21157e(0x22b)](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this[_0x21157e(0x5e4)]();if(this[_0x21157e(0x45a)](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this[_0x21157e(0x5e4)]();if(this[_0x21157e(0x22f)](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this[_0x21157e(0x5e4)]();if(this[_0x21157e(0x1e2)](_0x1679f3,_0x38eee7,_0x414566))_0x38eee7+=this['lineHeight']();return this[_0x21157e(0x243)](),_0x38eee7;},Window_ShopStatus[_0x20768d(0x41b)]['makeItemData']=function(){const _0x2301dc=_0x20768d;let _0x5b5f9c=![];this[_0x2301dc(0x2ac)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};for(const _0x3df997 of this['_item'][_0x2301dc(0x578)]){switch(_0x3df997[_0x2301dc(0x35e)]){case Game_Action[_0x2301dc(0x46e)]:this[_0x2301dc(0x2ac)][_0x2301dc(0x57b)]+=_0x3df997[_0x2301dc(0x444)],this[_0x2301dc(0x2ac)][_0x2301dc(0x486)]+=_0x3df997[_0x2301dc(0x436)],_0x5b5f9c=!![];break;case Game_Action[_0x2301dc(0x367)]:this['_itemData'][_0x2301dc(0x4ae)]+=_0x3df997[_0x2301dc(0x444)],this[_0x2301dc(0x2ac)]['flatMP']+=_0x3df997[_0x2301dc(0x436)],_0x5b5f9c=!![];break;case Game_Action[_0x2301dc(0x31d)]:this[_0x2301dc(0x2ac)][_0x2301dc(0x4f9)]+=_0x3df997[_0x2301dc(0x444)],_0x5b5f9c=!![];break;case Game_Action['EFFECT_ADD_STATE']:this[_0x2301dc(0x2ac)][_0x2301dc(0x24e)][_0x2301dc(0x64a)](_0x3df997[_0x2301dc(0x3e9)]),_0x5b5f9c=!![];break;case Game_Action[_0x2301dc(0x59b)]:this[_0x2301dc(0x2ac)][_0x2301dc(0x27d)][_0x2301dc(0x64a)](_0x3df997[_0x2301dc(0x3e9)]),this[_0x2301dc(0x2ac)]['removeStateBuffChanges']=!![],_0x5b5f9c=!![];break;case Game_Action[_0x2301dc(0x455)]:this[_0x2301dc(0x2ac)][_0x2301dc(0x3e1)][_0x3df997[_0x2301dc(0x3e9)]]+=0x1,_0x5b5f9c=!![];break;case Game_Action['EFFECT_ADD_DEBUFF']:this[_0x2301dc(0x2ac)]['changeBuff'][_0x3df997[_0x2301dc(0x3e9)]]-=0x1,_0x5b5f9c=!![];break;case Game_Action[_0x2301dc(0x558)]:this[_0x2301dc(0x2ac)][_0x2301dc(0x474)][_0x2301dc(0x64a)](_0x3df997[_0x2301dc(0x3e9)]),this[_0x2301dc(0x2ac)][_0x2301dc(0x503)]=!![],_0x5b5f9c=!![];break;case Game_Action[_0x2301dc(0x2a6)]:this[_0x2301dc(0x2ac)][_0x2301dc(0x3e8)][_0x2301dc(0x64a)](_0x3df997['dataId']),this[_0x2301dc(0x2ac)][_0x2301dc(0x503)]=!![],_0x5b5f9c=!![];break;}}if(this['_itemData'][_0x2301dc(0x24e)][_0x2301dc(0x3c9)]>0x0)this[_0x2301dc(0x2ac)][_0x2301dc(0x606)]=!![];for(let _0x562658=0x0;_0x562658<this[_0x2301dc(0x2ac)][_0x2301dc(0x3e1)][_0x2301dc(0x3c9)];_0x562658++){if(_0x2301dc(0x4f2)===_0x2301dc(0x4f2)){if(this['_itemData'][_0x2301dc(0x3e1)][_0x562658]!==0x0)this[_0x2301dc(0x2ac)][_0x2301dc(0x606)]=!![];}else{function _0x12aa81(){const _0x42f647=_0x2301dc;if(_0x24abd8[_0x42f647(0x303)]&&_0x11038d[_0x42f647(0x434)]!==_0xc7babf)return _0x4b3d0c[_0x42f647(0x434)];else{if(this[_0x42f647(0x45f)]())return this[_0x42f647(0x3f2)]()[_0x42f647(0x449)](/RIGHT/i);else _0x9a3f8e['prototype'][_0x42f647(0x4f0)][_0x42f647(0x36c)](this);}}}}this[_0x2301dc(0x37b)][_0x2301dc(0x39c)]!==0x0&&(this[_0x2301dc(0x2ac)][_0x2301dc(0x4fb)]=this['_item']['tpGain'],_0x5b5f9c=!![]);const _0x518912=[_0x2301dc(0x403),'MP\x20RECOVERY',_0x2301dc(0x650),'HP\x20DAMAGE','MP\x20DAMAGE',_0x2301dc(0x25e),_0x2301dc(0x33f),_0x2301dc(0x542),_0x2301dc(0x2c8)];for(const _0x57e5ad of _0x518912){if(this[_0x2301dc(0x232)][_0x57e5ad]){_0x5b5f9c=!![];break;}}return _0x5b5f9c;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x2d4)]=function(_0x36b5f3,_0x27814a,_0x3709dd){const _0x36ce40=_0x20768d,_0x5df177=_0x36ce40(0x403);if(this[_0x36ce40(0x2ac)][_0x36ce40(0x57b)]<=0x0&&this[_0x36ce40(0x2ac)][_0x36ce40(0x486)]<=0x0&&!this[_0x36ce40(0x232)][_0x5df177])return![];const _0x4750ce=this['getItemEffectsHpRecoveryLabel']();this['drawItemKeyData'](_0x4750ce,_0x36b5f3,_0x27814a,_0x3709dd,!![]);const _0x1dfed3=this[_0x36ce40(0x647)]();return this['changeTextColor'](ColorManager[_0x36ce40(0x5ed)](0x1)),this[_0x36ce40(0x51f)](_0x1dfed3,_0x36b5f3,_0x27814a,_0x3709dd,![],'right'),this['drawItemDarkRect'](_0x36b5f3,_0x27814a,_0x3709dd),this[_0x36ce40(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)]['getItemEffectsHpRecoveryLabel']=function(){const _0x36d039=_0x20768d,_0x4c6f2b=VisuMZ[_0x36d039(0x54f)]['Settings'][_0x36d039(0x319)][_0x36d039(0x5f6)];return _0x4c6f2b[_0x36d039(0x60a)](TextManager['hp']);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x647)]=function(){const _0x3b2374=_0x20768d,_0x3d87bc=_0x3b2374(0x403);if(this['_customItemInfo'][_0x3d87bc])return this['_customItemInfo'][_0x3d87bc];let _0x3149ba='';if(this[_0x3b2374(0x2ac)][_0x3b2374(0x57b)]>0x0)_0x3149ba+=_0x3b2374(0x562)[_0x3b2374(0x60a)](Math[_0x3b2374(0x465)](this[_0x3b2374(0x2ac)][_0x3b2374(0x57b)]*0x64));if(this[_0x3b2374(0x2ac)][_0x3b2374(0x57b)]>0x0&&this[_0x3b2374(0x2ac)][_0x3b2374(0x486)]>0x0)_0x3149ba+='\x20';if(this[_0x3b2374(0x2ac)]['flatHP']>0x0)_0x3149ba+='+%1'[_0x3b2374(0x60a)](this[_0x3b2374(0x2ac)]['flatHP']);return _0x3149ba;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x631)]=function(_0x3e584f,_0xcc39bc,_0x484081){const _0x5df9b8=_0x20768d,_0xdf225=_0x5df9b8(0x212);if(this[_0x5df9b8(0x2ac)][_0x5df9b8(0x4ae)]<=0x0&&this[_0x5df9b8(0x2ac)][_0x5df9b8(0x589)]<=0x0&&!this[_0x5df9b8(0x232)][_0xdf225])return![];const _0x577b69=this[_0x5df9b8(0x1db)]();this['drawItemKeyData'](_0x577b69,_0x3e584f,_0xcc39bc,_0x484081,!![]);const _0x502b65=this['getItemEffectsMpRecoveryText']();return this[_0x5df9b8(0x58b)](ColorManager['damageColor'](0x3)),this['drawItemKeyData'](_0x502b65,_0x3e584f,_0xcc39bc,_0x484081,![],_0x5df9b8(0x5c2)),this[_0x5df9b8(0x5ca)](_0x3e584f,_0xcc39bc,_0x484081),this[_0x5df9b8(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x1db)]=function(){const _0x1dbc2b=_0x20768d,_0x455ce0=VisuMZ[_0x1dbc2b(0x54f)][_0x1dbc2b(0x569)][_0x1dbc2b(0x319)][_0x1dbc2b(0x619)];return _0x455ce0[_0x1dbc2b(0x60a)](TextManager['mp']);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x50b)]=function(){const _0xbec7d5=_0x20768d,_0x2bfe42=_0xbec7d5(0x212);if(this[_0xbec7d5(0x232)][_0x2bfe42])return this[_0xbec7d5(0x232)][_0x2bfe42];let _0x435514='';if(this[_0xbec7d5(0x2ac)][_0xbec7d5(0x4ae)]>0x0)_0x435514+=_0xbec7d5(0x562)['format'](Math[_0xbec7d5(0x465)](this['_itemData'][_0xbec7d5(0x4ae)]*0x64));if(this[_0xbec7d5(0x2ac)][_0xbec7d5(0x4ae)]>0x0&&this[_0xbec7d5(0x2ac)][_0xbec7d5(0x589)]>0x0)_0x435514+='\x20';if(this['_itemData'][_0xbec7d5(0x589)]>0x0)_0x435514+=_0xbec7d5(0x41f)['format'](this[_0xbec7d5(0x2ac)][_0xbec7d5(0x589)]);return _0x435514;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x52a)]=function(_0x2b4f08,_0x126f73,_0x5d75cf){const _0x4d04b8=_0x20768d,_0x36a5b1=_0x4d04b8(0x650);if(this[_0x4d04b8(0x2ac)][_0x4d04b8(0x4f9)]<=0x0&&!this[_0x4d04b8(0x232)][_0x36a5b1])return![];const _0x4a0e24=this[_0x4d04b8(0x447)]();this[_0x4d04b8(0x51f)](_0x4a0e24,_0x2b4f08,_0x126f73,_0x5d75cf,!![]);const _0x26c02d=this['getItemEffectsTpRecoveryText']();return this[_0x4d04b8(0x58b)](ColorManager[_0x4d04b8(0x4ab)]()),this[_0x4d04b8(0x51f)](_0x26c02d,_0x2b4f08,_0x126f73,_0x5d75cf,![],_0x4d04b8(0x5c2)),this['drawItemDarkRect'](_0x2b4f08,_0x126f73,_0x5d75cf),this[_0x4d04b8(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x447)]=function(){const _0x4d6984=_0x20768d,_0x25c82f=VisuMZ[_0x4d6984(0x54f)][_0x4d6984(0x569)]['StatusWindow'][_0x4d6984(0x42a)];return _0x25c82f['format'](TextManager['tp']);},Window_ShopStatus[_0x20768d(0x41b)]['getItemEffectsTpRecoveryText']=function(){const _0x12bce7=_0x20768d,_0x499533='TP\x20RECOVERY';if(this['_customItemInfo'][_0x499533])return this[_0x12bce7(0x232)][_0x499533];let _0x29ec0e='';return _0x29ec0e+='+%1'[_0x12bce7(0x60a)](this[_0x12bce7(0x2ac)][_0x12bce7(0x4f9)]),_0x29ec0e;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x45a)]=function(_0x7bf6ca,_0x28da22,_0x43b263){const _0x4a0c3c=_0x20768d,_0x5a8d88='USER\x20TP\x20GAIN';if(this[_0x4a0c3c(0x2ac)][_0x4a0c3c(0x4fb)]===0x0&&!this['_customItemInfo'][_0x5a8d88])return![];const _0xe489ee=this[_0x4a0c3c(0x1f7)]();this[_0x4a0c3c(0x51f)](_0xe489ee,_0x7bf6ca,_0x28da22,_0x43b263,!![]);const _0x25403c=this['getItemEffectsSelfTpGainText']();if(this['_itemData'][_0x4a0c3c(0x4fb)]>0x0){if('CqwxP'!==_0x4a0c3c(0x463)){function _0x5d04c2(){return _0x59f62c;}}else this[_0x4a0c3c(0x58b)](ColorManager[_0x4a0c3c(0x4ab)]());}else this[_0x4a0c3c(0x58b)](ColorManager['powerDownColor']());return this[_0x4a0c3c(0x51f)](_0x25403c,_0x7bf6ca,_0x28da22,_0x43b263,![],'right'),this[_0x4a0c3c(0x5ca)](_0x7bf6ca,_0x28da22,_0x43b263),this[_0x4a0c3c(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x1f7)]=function(){const _0x4d9288=_0x20768d,_0x1a29ec=VisuMZ[_0x4d9288(0x54f)][_0x4d9288(0x569)]['StatusWindow'][_0x4d9288(0x240)];return _0x1a29ec[_0x4d9288(0x60a)](TextManager['tp']);},Window_ShopStatus['prototype']['getItemEffectsSelfTpGainText']=function(){const _0xa37a48=_0x20768d,_0x2bb744=_0xa37a48(0x33f);if(this['_customItemInfo'][_0x2bb744])return this['_customItemInfo'][_0x2bb744];let _0x33af82='';return this[_0xa37a48(0x2ac)]['selfTP']>0x0?_0x33af82+=_0xa37a48(0x41f)[_0xa37a48(0x60a)](this[_0xa37a48(0x2ac)][_0xa37a48(0x4fb)]):_0x33af82+='%1'[_0xa37a48(0x60a)](this[_0xa37a48(0x2ac)][_0xa37a48(0x4fb)]),_0x33af82;},Window_ShopStatus['prototype'][_0x20768d(0x426)]=function(_0x462fa5,_0x3715dc,_0x2d5619){const _0x539d59=_0x20768d,_0x5b4165='HP\x20DAMAGE';if(this[_0x539d59(0x2ac)][_0x539d59(0x57b)]>=0x0&&this[_0x539d59(0x2ac)][_0x539d59(0x486)]>=0x0&&!this[_0x539d59(0x232)][_0x5b4165])return![];const _0x35f359=this[_0x539d59(0x516)]();this[_0x539d59(0x51f)](_0x35f359,_0x462fa5,_0x3715dc,_0x2d5619,!![]);const _0x5479ca=this[_0x539d59(0x36e)]();return this[_0x539d59(0x58b)](ColorManager[_0x539d59(0x5ed)](0x0)),this[_0x539d59(0x51f)](_0x5479ca,_0x462fa5,_0x3715dc,_0x2d5619,![],_0x539d59(0x5c2)),this[_0x539d59(0x5ca)](_0x462fa5,_0x3715dc,_0x2d5619),this[_0x539d59(0x243)](),!![];},Window_ShopStatus['prototype'][_0x20768d(0x516)]=function(){const _0x17cea3=_0x20768d,_0x3ca03e=VisuMZ[_0x17cea3(0x54f)][_0x17cea3(0x569)][_0x17cea3(0x319)]['LabelDamageHP'];return _0x3ca03e['format'](TextManager['hp']);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x36e)]=function(){const _0x5b4c19=_0x20768d,_0x54b0b0='HP\x20DAMAGE';if(this[_0x5b4c19(0x232)][_0x54b0b0])return this[_0x5b4c19(0x232)][_0x54b0b0];let _0x37bc02='';if(this[_0x5b4c19(0x2ac)][_0x5b4c19(0x57b)]<0x0)_0x37bc02+='%1%'[_0x5b4c19(0x60a)](Math[_0x5b4c19(0x465)](this[_0x5b4c19(0x2ac)]['rateHP']*0x64));if(this[_0x5b4c19(0x2ac)]['rateHP']<0x0&&this[_0x5b4c19(0x2ac)][_0x5b4c19(0x486)]<0x0)_0x37bc02+='\x20';if(this[_0x5b4c19(0x2ac)]['flatHP']<0x0)_0x37bc02+='%1'[_0x5b4c19(0x60a)](this[_0x5b4c19(0x2ac)][_0x5b4c19(0x486)]);return _0x37bc02;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x3bd)]=function(_0x521a00,_0x5cab90,_0x12f007){const _0x4ed31b=_0x20768d,_0x1e611b='MP\x20DAMAGE';if(this[_0x4ed31b(0x2ac)][_0x4ed31b(0x4ae)]>=0x0&&this[_0x4ed31b(0x2ac)][_0x4ed31b(0x589)]>=0x0&&!this[_0x4ed31b(0x232)][_0x1e611b])return![];const _0x27a837=this['getItemEffectsMpDamageLabel']();this[_0x4ed31b(0x51f)](_0x27a837,_0x521a00,_0x5cab90,_0x12f007,!![]);const _0x313dbd=this[_0x4ed31b(0x58a)]();return this['changeTextColor'](ColorManager[_0x4ed31b(0x5ed)](0x2)),this[_0x4ed31b(0x51f)](_0x313dbd,_0x521a00,_0x5cab90,_0x12f007,![],'right'),this[_0x4ed31b(0x5ca)](_0x521a00,_0x5cab90,_0x12f007),this[_0x4ed31b(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x2fc)]=function(){const _0x45238f=_0x20768d,_0x41f928=VisuMZ[_0x45238f(0x54f)][_0x45238f(0x569)]['StatusWindow']['LabelDamageMP'];return _0x41f928[_0x45238f(0x60a)](TextManager['mp']);},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x58a)]=function(){const _0x2504b1=_0x20768d,_0x2fd2b2=_0x2504b1(0x36a);if(this[_0x2504b1(0x232)][_0x2fd2b2])return this[_0x2504b1(0x232)][_0x2fd2b2];let _0x3cdb54='';if(this[_0x2504b1(0x2ac)][_0x2504b1(0x4ae)]<0x0)_0x3cdb54+=_0x2504b1(0x2ca)['format'](Math[_0x2504b1(0x465)](this[_0x2504b1(0x2ac)][_0x2504b1(0x4ae)]*0x64));if(this[_0x2504b1(0x2ac)][_0x2504b1(0x4ae)]<0x0&&this[_0x2504b1(0x2ac)][_0x2504b1(0x589)]<0x0)_0x3cdb54+='\x20';if(this[_0x2504b1(0x2ac)][_0x2504b1(0x589)]<0x0)_0x3cdb54+='%1'[_0x2504b1(0x60a)](this['_itemData'][_0x2504b1(0x589)]);return _0x3cdb54;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x22b)]=function(_0x47598c,_0x35f443,_0x148b09){const _0x294dd8=_0x20768d,_0x1fa9f2=_0x294dd8(0x25e);if(this['_itemData']['gainTP']>=0x0&&!this[_0x294dd8(0x232)][_0x1fa9f2])return![];const _0x2757de=this[_0x294dd8(0x406)]();this[_0x294dd8(0x51f)](_0x2757de,_0x47598c,_0x35f443,_0x148b09,!![]);const _0x31ba85=this[_0x294dd8(0x46f)]();return this['changeTextColor'](ColorManager[_0x294dd8(0x324)]()),this[_0x294dd8(0x51f)](_0x31ba85,_0x47598c,_0x35f443,_0x148b09,![],_0x294dd8(0x5c2)),this[_0x294dd8(0x5ca)](_0x47598c,_0x35f443,_0x148b09),this[_0x294dd8(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x406)]=function(){const _0x31ad53=_0x20768d,_0x4ed4d7=VisuMZ[_0x31ad53(0x54f)][_0x31ad53(0x569)]['StatusWindow'][_0x31ad53(0x2b9)];return _0x4ed4d7['format'](TextManager['tp']);},Window_ShopStatus['prototype'][_0x20768d(0x46f)]=function(){const _0xeca7fd=_0x20768d,_0x18548c=_0xeca7fd(0x25e);if(this['_customItemInfo'][_0x18548c])return this['_customItemInfo'][_0x18548c];let _0xde986f='';return _0xde986f+='%1'['format'](this[_0xeca7fd(0x2ac)][_0xeca7fd(0x4f9)]),_0xde986f;},Window_ShopStatus['prototype'][_0x20768d(0x22f)]=function(_0x2af75e,_0x4b2a78,_0x597bf4){const _0x4adc0d=_0x20768d,_0x2af6d3=_0x4adc0d(0x542);if(!this['_itemData'][_0x4adc0d(0x606)]&&!this[_0x4adc0d(0x232)][_0x2af6d3])return![];const _0x2b532a=this['getItemEffectsAddedStatesBuffsLabel']();this[_0x4adc0d(0x51f)](_0x2b532a,_0x2af75e,_0x4b2a78,_0x597bf4,!![]);const _0x41a8e6=this[_0x4adc0d(0x22a)]();return this['drawItemKeyData'](_0x41a8e6,_0x2af75e,_0x4b2a78,_0x597bf4,![],_0x4adc0d(0x5c2)),this['drawItemDarkRect'](_0x2af75e,_0x4b2a78,_0x597bf4),this[_0x4adc0d(0x243)](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x1e7)]=function(){const _0xd4bfbe=_0x20768d;return VisuMZ[_0xd4bfbe(0x54f)][_0xd4bfbe(0x569)][_0xd4bfbe(0x319)][_0xd4bfbe(0x4d6)];},Window_ShopStatus[_0x20768d(0x41b)]['getItemEffectsAddedStatesBuffsText']=function(){const _0x13edde=_0x20768d,_0x22957a=_0x13edde(0x542);if(this[_0x13edde(0x232)][_0x22957a])return this[_0x13edde(0x232)][_0x22957a];let _0x15fdf9='',_0x53c0dc=0x0;const _0x2575d8=0x8;for(const _0x590fac of this[_0x13edde(0x2ac)][_0x13edde(0x24e)]){if(_0x13edde(0x3e5)==='mFhER'){function _0x51e8d0(){return![];}}else{const _0x1c4373=$dataStates[_0x590fac];if(_0x1c4373&&_0x1c4373[_0x13edde(0x384)]>0x0){_0x15fdf9+=_0x13edde(0x217)['format'](_0x1c4373[_0x13edde(0x384)]),_0x53c0dc++;if(_0x53c0dc>=_0x2575d8)return _0x15fdf9;}}}for(let _0x1582fe=0x0;_0x1582fe<this[_0x13edde(0x2ac)][_0x13edde(0x3e1)][_0x13edde(0x3c9)];_0x1582fe++){if(_0x13edde(0x364)!=='cFapP'){const _0xcc3c05=this[_0x13edde(0x2ac)][_0x13edde(0x3e1)][_0x1582fe],_0x1ba0b8=Game_BattlerBase[_0x13edde(0x41b)][_0x13edde(0x55f)](_0xcc3c05,_0x1582fe);if(_0x1ba0b8>0x0){_0x15fdf9+=_0x13edde(0x217)[_0x13edde(0x60a)](_0x1ba0b8),_0x53c0dc++;if(_0x53c0dc>=_0x2575d8)return _0x15fdf9;}}else{function _0x22ef37(){const _0x1977bf=_0x13edde;return _0x347505['CoreEngine']&&_0x47fc16[_0x1977bf(0x246)][_0x1977bf(0x569)][_0x1977bf(0x31b)][_0x1977bf(0x346)]&&_0xe96f3b[_0x1977bf(0x391)](this[_0x1977bf(0x37b)])?![]:this['_item'][_0x1977bf(0x3e7)];}}}return _0x15fdf9;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x1e2)]=function(_0x18746b,_0x4e0728,_0x3584a9){const _0xe9f0a=_0x20768d,_0x18c8a5='REMOVED\x20EFFECTS';if(!this[_0xe9f0a(0x2ac)][_0xe9f0a(0x503)]&&!this[_0xe9f0a(0x232)][_0x18c8a5])return![];const _0x5d40a6=this['getItemEffectsRemovedStatesBuffsLabel']();this[_0xe9f0a(0x51f)](_0x5d40a6,_0x18746b,_0x4e0728,_0x3584a9,!![]);const _0x2d3fec=this['getItemEffectsRemovedStatesBuffsText']();return this[_0xe9f0a(0x51f)](_0x2d3fec,_0x18746b,_0x4e0728,_0x3584a9,![],_0xe9f0a(0x5c2)),this['drawItemDarkRect'](_0x18746b,_0x4e0728,_0x3584a9),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x52d)]=function(){const _0x290029=_0x20768d;return VisuMZ[_0x290029(0x54f)][_0x290029(0x569)][_0x290029(0x319)]['LabelRemove'];},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x537)]=function(){const _0x41b204=_0x20768d,_0x5c1c07='REMOVED\x20EFFECTS';if(this['_customItemInfo'][_0x5c1c07])return this[_0x41b204(0x232)][_0x5c1c07];let _0x248ae8='',_0xd20ec8=0x0;const _0x43de87=VisuMZ[_0x41b204(0x54f)][_0x41b204(0x569)][_0x41b204(0x319)][_0x41b204(0x454)];for(const _0x2853ec of this[_0x41b204(0x2ac)][_0x41b204(0x27d)]){const _0x1bf76e=$dataStates[_0x2853ec];if(_0x1bf76e&&_0x1bf76e[_0x41b204(0x384)]>0x0){if(_0x41b204(0x49c)===_0x41b204(0x323)){function _0x3d5f3b(){const _0x12bf10=_0x41b204,_0x508756=_0x1e2041[_0x12bf10(0x54f)][_0x12bf10(0x569)]['StatusWindow']['LabelRecoverMP'];return _0x508756[_0x12bf10(0x60a)](_0xea5043['mp']);}}else{_0x248ae8+=_0x41b204(0x217)[_0x41b204(0x60a)](_0x1bf76e[_0x41b204(0x384)]),_0xd20ec8++;if(_0xd20ec8>=_0x43de87)return _0x248ae8;}}}for(let _0x405171=0x0;_0x405171<this[_0x41b204(0x2ac)][_0x41b204(0x474)][_0x41b204(0x3c9)];_0x405171++){const _0x1ed18d=Game_BattlerBase[_0x41b204(0x41b)][_0x41b204(0x55f)](0x1,_0x405171);if(_0x1ed18d>0x0){_0x248ae8+=_0x41b204(0x217)['format'](_0x1ed18d),_0xd20ec8++;if(_0xd20ec8>=_0x43de87)return _0x248ae8;}}for(let _0x287fbd=0x0;_0x287fbd<this[_0x41b204(0x2ac)][_0x41b204(0x3e8)][_0x41b204(0x3c9)];_0x287fbd++){if('tBweG'!==_0x41b204(0x532)){const _0xfad16f=Game_BattlerBase[_0x41b204(0x41b)]['buffIconIndex'](-0x1,_0x287fbd);if(_0xfad16f>0x0){if(_0x41b204(0x607)!=='pYKCi'){_0x248ae8+='\x5cI[%1]'[_0x41b204(0x60a)](_0xfad16f),_0xd20ec8++;if(_0xd20ec8>=_0x43de87)return _0x248ae8;}else{function _0x4ccba0(){const _0x38816d=_0x41b204;return _0x21ecdf[_0x38816d(0x54f)][_0x38816d(0x5dd)]['call'](this);}}}}else{function _0x49b60b(){const _0x140e22=_0x41b204;return this[_0x140e22(0x4cd)]&&this[_0x140e22(0x4cd)][_0x140e22(0x430)]();}}}return _0x248ae8;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x659)]=function(_0x1736d3,_0x3d820c,_0x307182){const _0x288614=_0x20768d;if(this[_0x288614(0x37b)][_0x288614(0x38a)][_0x288614(0x449)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x22902f=String(RegExp['$1'])[_0x288614(0x3ff)](/[\r\n]+/);for(const _0x5bf945 of _0x22902f){if(_0x5bf945[_0x288614(0x449)](/(.*):[ ](.*)/i)){const _0x53633d=String(RegExp['$1'])[_0x288614(0x3b0)](),_0x2e71a2=String(RegExp['$2'])[_0x288614(0x3b0)]();this[_0x288614(0x25a)](_0x53633d,_0x2e71a2,_0x1736d3,_0x3d820c,_0x307182),_0x3d820c+=this[_0x288614(0x5e4)]();}}}return this[_0x288614(0x243)](),_0x3d820c;},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x25a)]=function(_0x3b3ec3,_0x4f7219,_0x317b35,_0xe14c48,_0x2b4d5d){const _0x2705c3=_0x20768d;this[_0x2705c3(0x51f)](_0x3b3ec3,_0x317b35,_0xe14c48,_0x2b4d5d,!![]),this['drawItemKeyData'](_0x4f7219,_0x317b35,_0xe14c48,_0x2b4d5d,![],_0x2705c3(0x5c2)),this[_0x2705c3(0x5ca)](_0x317b35,_0xe14c48,_0x2b4d5d),this['resetFontSettings']();},Window_ShopStatus[_0x20768d(0x41b)][_0x20768d(0x2eb)]=function(){const _0x1ac9a9=_0x20768d;if(!this[_0x1ac9a9(0x37b)])return;const _0xe52315=this[_0x1ac9a9(0x37b)][_0x1ac9a9(0x38a)],_0x24bb74=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x52331f=_0xe52315['match'](_0x24bb74);if(_0x52331f){if(_0x1ac9a9(0x4b2)===_0x1ac9a9(0x500)){function _0x3328bf(){const _0x166c3a=_0x1ac9a9,_0x48a086=_0x476ba8[_0x166c3a(0x32b)](this);_0x48a086[_0x166c3a(0x3fe)]=!![],_0x4e5d07['ItemsEquipsCore'][_0x166c3a(0x526)][_0x166c3a(0x36c)](this,_0xcffcc6,_0x324400),this[_0x166c3a(0x428)](_0x48a086);}}else for(const _0x566b59 of _0x52331f){_0x566b59['match'](_0x24bb74);const _0x2d6dad=String(RegExp['$1'])[_0x1ac9a9(0x3b0)]()||'';if(_0x2d6dad==='')continue;const _0x5bab79=ImageManager[_0x1ac9a9(0x1d7)](_0x2d6dad);_0x5bab79[_0x1ac9a9(0x412)](this['drawCustomShopGraphicLoad'][_0x1ac9a9(0x4d7)](this,_0x5bab79,this[_0x1ac9a9(0x37b)]));}}},Window_ShopStatus[_0x20768d(0x41b)]['drawCustomShopGraphicLoad']=function(_0x3e9d9a,_0x121761){const _0x78f2e0=_0x20768d;if(this[_0x78f2e0(0x37b)]!==_0x121761)return;if(!_0x3e9d9a)return;if(_0x3e9d9a[_0x78f2e0(0x341)]<=0x0||_0x3e9d9a['height']<=0x0)return;const _0x8ef879=_0x121761[_0x78f2e0(0x38a)];let _0x207919='background';_0x8ef879['match'](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x207919='foreground');const _0x3f63fe=_0x207919===_0x78f2e0(0x2da)?this[_0x78f2e0(0x25f)]:this[_0x78f2e0(0x553)];let _0x2baf33=this['innerWidth'],_0x128d83=this['innerHeight'];if(_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)){if(_0x78f2e0(0x5f9)!==_0x78f2e0(0x5f9)){function _0x5810ab(){const _0x1d45f5=_0x78f2e0;return _0x5928fe[_0x1d45f5(0x434)];}}else _0x2baf33=Number(RegExp['$1']);}_0x8ef879['match'](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x128d83=Number(RegExp['$1']));_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x2baf33=Number(RegExp['$1']),_0x128d83=Number(RegExp['$2']));const _0x430cee=Math[_0x78f2e0(0x1f4)](0x1,_0x2baf33/_0x3e9d9a[_0x78f2e0(0x341)],_0x128d83/_0x3e9d9a['height']);let _0x144664=0x0,_0x102921=0x0,_0x2512f8=Math[_0x78f2e0(0x465)](_0x3e9d9a[_0x78f2e0(0x341)]*_0x430cee),_0x30dc33=Math[_0x78f2e0(0x465)](_0x3e9d9a[_0x78f2e0(0x61d)]*_0x430cee),_0x4260af=_0x78f2e0(0x420);if(_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)){if(_0x78f2e0(0x63d)===_0x78f2e0(0x273)){function _0x5527f3(){const _0x499aa3=_0x78f2e0;return this[_0x499aa3(0x45f)]()?this[_0x499aa3(0x359)]():_0x3bd2a6[_0x499aa3(0x54f)]['Scene_Equip_commandWindowRect'][_0x499aa3(0x36c)](this);}}else _0x4260af=String(RegExp['$1'])['toLowerCase']()[_0x78f2e0(0x3b0)]();}if(_0x4260af===_0x78f2e0(0x582)){if(_0x78f2e0(0x35b)===_0x78f2e0(0x2d2)){function _0x3997b9(){const _0x2f8816=_0x78f2e0;_0x3464bb=_0x6da508+_0x23063e[_0x2f8816(0x465)]((_0xb4a330-_0x2eefb5[_0x2f8816(0x341)])/0x2);}}else _0x144664=0x0;}else _0x4260af===_0x78f2e0(0x420)?_0x144664=Math['round']((this[_0x78f2e0(0x556)]-_0x2512f8)/0x2):_0x144664=this[_0x78f2e0(0x556)]-_0x2512f8;let _0x3745d5=_0x78f2e0(0x388);_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x3745d5=String(RegExp['$1'])[_0x78f2e0(0x2e9)]()[_0x78f2e0(0x3b0)]());if(_0x3745d5===_0x78f2e0(0x610))_0x102921=0x0;else{if(_0x3745d5==='middle')_0x102921=Math[_0x78f2e0(0x3b8)]((this['innerHeight']-_0x30dc33)/0x2);else{if(_0x78f2e0(0x57f)==='hoNym'){function _0x14d240(){const _0x456858=_0x78f2e0;return this[_0x456858(0x45f)]()?this[_0x456858(0x257)]():_0x3a1a11[_0x456858(0x41b)][_0x456858(0x2e4)][_0x456858(0x36c)](this);}}else _0x102921=this[_0x78f2e0(0x2f6)]-_0x30dc33;}}_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x144664+=Number(RegExp['$1']));if(_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x78f2e0(0x5c4)===_0x78f2e0(0x37f)){function _0x1cc44d(){const _0x4f8001=_0x78f2e0;_0x20abe4=_0xd72372[_0x4f8001(0x3bf)];}}else _0x102921+=Number(RegExp['$1']);}if(_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)){if('JEUZx'===_0x78f2e0(0x497))_0x144664+=Number(RegExp['$1']),_0x102921+=Number(RegExp['$2']);else{function _0x58ad70(){const _0x3bb505=_0x78f2e0;return this[_0x3bb505(0x45f)]()?this[_0x3bb505(0x28a)]():_0xbf2cdb[_0x3bb505(0x54f)][_0x3bb505(0x26b)][_0x3bb505(0x36c)](this);}}}let _0xd2c420=0xff;if(_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i)){if('wpxmg'!==_0x78f2e0(0x2c6))_0xd2c420=Number(RegExp['$1']);else{function _0x4f5a8b(){const _0x59f4a3=_0x78f2e0;_0x5557ee[_0x59f4a3(0x54f)]['ParseWeaponNotetags'][_0x59f4a3(0x36c)](this,_0x40ca12),_0x1cf99c[_0x59f4a3(0x54f)][_0x59f4a3(0x439)](_0xb66696,_0x56f1fc);}}}else{if(_0x8ef879[_0x78f2e0(0x449)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)){if(_0x78f2e0(0x1fe)!==_0x78f2e0(0x307))_0xd2c420=Math[_0x78f2e0(0x3b8)](Number(RegExp['$1'])*0.01*0xff)[_0x78f2e0(0x560)](0x0,0xff);else{function _0xd414fe(){const _0x514f35=_0x78f2e0,_0x31bd95=_0x514f35(0x403);if(this[_0x514f35(0x2ac)][_0x514f35(0x57b)]<=0x0&&this['_itemData'][_0x514f35(0x486)]<=0x0&&!this[_0x514f35(0x232)][_0x31bd95])return![];const _0x44291c=this[_0x514f35(0x2db)]();this[_0x514f35(0x51f)](_0x44291c,_0x50a1f0,_0x1a34b0,_0x11ace7,!![]);const _0x58796b=this[_0x514f35(0x647)]();return this['changeTextColor'](_0x3017c5['damageColor'](0x1)),this['drawItemKeyData'](_0x58796b,_0x3460ad,_0x3b322f,_0xa22de3,![],_0x514f35(0x5c2)),this[_0x514f35(0x5ca)](_0x2def54,_0x4f6a3c,_0x206fac),this[_0x514f35(0x243)](),!![];}}}}_0x3f63fe[_0x78f2e0(0x2e6)]=_0xd2c420,_0x3f63fe[_0x78f2e0(0x294)](_0x3e9d9a,0x0,0x0,_0x3e9d9a['width'],_0x3e9d9a[_0x78f2e0(0x61d)],_0x144664,_0x102921,_0x2512f8,_0x30dc33),_0x3f63fe['paintOpacity']=0xff;};