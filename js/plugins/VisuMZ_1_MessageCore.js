//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.34;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.34] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
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
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
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
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
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
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
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
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
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
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x1f0508=_0x47a7;function _0x47a7(_0x489d37,_0x40833f){const _0x35e97e=_0x35e9();return _0x47a7=function(_0x47a724,_0x270a64){_0x47a724=_0x47a724-0xf4;let _0x2a14e8=_0x35e97e[_0x47a724];return _0x2a14e8;},_0x47a7(_0x489d37,_0x40833f);}(function(_0x5f235c,_0x4c376e){const _0x36b476=_0x47a7,_0x43688a=_0x5f235c();while(!![]){try{const _0x19ae65=parseInt(_0x36b476(0x140))/0x1*(parseInt(_0x36b476(0x373))/0x2)+parseInt(_0x36b476(0x2ce))/0x3+-parseInt(_0x36b476(0x186))/0x4*(-parseInt(_0x36b476(0x2cd))/0x5)+parseInt(_0x36b476(0x1f9))/0x6*(-parseInt(_0x36b476(0x310))/0x7)+-parseInt(_0x36b476(0x144))/0x8+-parseInt(_0x36b476(0x32c))/0x9*(parseInt(_0x36b476(0x263))/0xa)+parseInt(_0x36b476(0x279))/0xb*(parseInt(_0x36b476(0x139))/0xc);if(_0x19ae65===_0x4c376e)break;else _0x43688a['push'](_0x43688a['shift']());}catch(_0x56dd2f){_0x43688a['push'](_0x43688a['shift']());}}}(_0x35e9,0x2b5a8));function _0x35e9(){const _0xf2335f=['map\x20player','TextMacros','match','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isSceneMap','PliPw','ExhAs','_autoColorActorNames','qHIxl','_wordWrap','actorName','itemHeight','getConfigValue','\x1bITALIC[1]','\x1bi[%1]%2','prepareWordWrapEscapeCharacters','selectDefault','battle\x20actor','processColorLock','messageWidth','461098wkvwOZ','_textColorStack','helpWordWrap','xuPgM','RTVPn','XxEtP','YgBYq','ARRAYEVAL','processTextAlignmentX','RjdzY','CENTERPICTURE','drawItem','getChoiceListTextAlign','boxWidth','jBIBb','clearFlags','_indent','Instant','shift','postConvertEscapeCharacters','textSpeedStatusText','_commonEventId','MBSnX','adjustShowChoiceExtension','Window_Message_updatePlacement','_pictureTextCache','format','applyMoveEasing','updateMove','StretchDimmedBg','qTcre','updateBitmap','MsgWindowOffsetY','FPFul','autoPositionOffsetX','anyPictureTextChanges','ParseAddedText','_data','VZDEj','CreateAutoColorFor','MUZSg','ohseD','open','fiymY','WORD_WRAP_PADDING','onChoice','length','choices','createContents','updateRelativePosition','choiceTextAlign','processTextAlignmentChange','value','applyDatabaseAutoColor','_moveTargetWidth','obtainGold','defeat','addExtraShowChoices','battle\x20party','statusText','MaxRows','updateOverlappingY','FontBiggerCap','fontBold','resizePictureText','calcWindowHeight','HJWcg','ParseAllNotetags','isVolumeSymbol','Window_Message_isTriggered','Armors','parseChoiceText','commandSymbol','applyData','obtainEscapeString','ParseStateNotetags','changeTextSpeed','right','knUUd','Enemies','ConvertParams','setupItemChoice','resetTextColor','mgXUW','80bElNOb','665304BjBMbo','battleTargetName','default','choicePositionType','HpYUP','isPressed','ojSQL','setChoiceListLineHeight','isArmor','XmvKe','setLastGainedItemData','item','refresh','Window_Base_initialize','upperleft','_pictureId','IXjzi','XZokZ','gainItem','ParseItemNotetags','\x1bITALIC[0]','SHOW','placeCancelButton','TextStr','processPyTextCode','</WORDWRAP>','contents','maxLines','_resetRect','oQOAW','_action','Window_Base_processAllText','event','messagePositionReset','_moveEasingType','partyMemberName','_target','ActionJS','\x1bTEXTALIGNMENT[3]','process_VisuMZ_MessageCore_TextMacros','convertTextMacros','messageWindowRect','findTargetSprite','makeData','_cancelButton','addedWidth','iZnjx','convertNewPageTextStateMacros','textSizeExTextAlignment','HelpWindow','Window_Base_processControlCharacter','_macroBypassWordWrap','drawTextEx','eraseAllPictureTexts','_messageOffsetY','ParseWeaponNotetags','updatePlacement','Scene_Options_maxCommands','choiceLineHeight','</B>','faceWidth','resetPositionX','Window_ChoiceList_updatePlacement','_autoSizeCheck','min','parameters','14CyWJJF','Settings','process_VisuMZ_MessageCore_TextCodes_Action','LineBreakSpace','follower','PICTURE','hZitc','setupChoices','moveTo','maxCommands','Game_System_initialize','unshift','inBattle','PREVCOLOR','easeIn','MessageTextDelay','iacMM','clampPlacementPosition','setupEvents','map\x20party','HRMok','initMessageCore','Name',')))','MessageWindow','isMessageWindowWordWrap','convertLockColorsEscapeCharacters','lineHeight','678843tRNIcP','openness','SortObjectByKeyLength','MessageWidth','convertFontSettingsEscapeCharacters','_dimmerSprite','synchronizeNameBox','easeInOut','TSviQ','lWwsB','registerCommand','updateXyOffsets','JtPgd','UPtHc','getMessageWindowRows','</RIGHT>','resetRect','ParseEnemyNotetags','suxfi','COMMONEVENT','changeTextColor','convertVariableEscapeCharacters','lsfqq','isWeapon','registerActorNameAutoColorChanges','onNewPageMessageCore','lqvSa','_relativePosition','_moveTargetY','test','processFontChangeItalic','KJVUq','<CENTER>','QmqsF','returnPreservedFontSettings','textCodeResult','launchMessageCommonEvent','_textDelayCount','_eventId','</I>','textWidth','processAutoPosition','processActorNameAutoColorChanges','WAIT','updateBackground','[0]','Ldqjf','Window_ChoiceList_windowX','HIDE','Window_Base_update','setChoiceListMaxRows','SVTne','itemRectWithPadding','mpIhs','setMessageWindowXyOffsets','drawBackPicture','filter','round','getPictureTextData','processMessageCoreEscapeActions','AddAutoColor','calcMoveEasing','_list','height','<B>','outlineColor','upperright','CommonEvent','setHelpWindowWordWrap','tqOVp','drawBackCenteredPicture','11794meHxBX','updateMessageCommonEvents','NUM','processEscapeCharacter','gDoxI','isInputting','</COLORLOCK>','Window_Message_synchronizeNameBox','lowerleft','_autoSizeRegexp','actor','outLineColor','fontItalic','eHJUN','IrdBO','list','FontSmallerCap','currentCommand','TightWrap','Width','isRunning','indent','ConfigManager_makeData','adjustShowChoiceCancel','hrAwy','_lastGainedItemData','_index','\x1bCOLORLOCK[0]','FZaux','stretchDimmerSprite','RWUXj','textSpeed','</LEFT>','resetWordWrap','_messageCommonEvents','UQGJV','none','LVRmb','ClBRV','registerResetRect','slice','makeCommandList','obtainEscapeParam','textSizeEx','realPictureId','Sprite_Picture_update','nKvgK','FlaeA','_positionType','boxHeight','changeVolume','DmQMy','clearActorNameAutoColor','uuqRh','outlineWidth','processPxTextCode','processControlCharacter','ParseSkillNotetags','startWait','LkeaS','updateEvents','split','getTextAlignment','CreateAutoColorRegExpListEntries','sDCEE','BOLD','Game_Interpreter_setupChoices','WrywP','Window_Options_statusText','close','colSpacing','textColor','TZqco','processDrawPicture','_interpreter','changeValue','Window_Options_changeVolume','setBackground','convertBackslashCharacters','PictureIDs','commandName','_textAlignment','updateNameBoxMove','TextCodeReplace','OEWfZ','replace','NameBoxWindowOffsetX','return\x200','_autoPositionTarget','textSizeExWordWrap','ParseClassNotetags','prepareForcedPositionEscapeCharacters','zRFSm','processWrapBreak','PuBAy','_targets','members','oWVGn','processAllText','lastGainedObjectName','addGeneralOptions','substring','loadPicture','convertHardcodedEscapeReplacements','innerWidth','clearAllPictureTexts','innerHeight','<LINE\x20BREAK>','_moveTargetX','EndPadding','evZnN','Rtgly','onProcessCharacter','addContinuousShowChoices','followers','isChoiceEnabled','canMove','\x1bCOLORLOCK[1]','TXoBB','_MessageCoreSettings','<COLORLOCK>','createPictureText','grrnM','convertEscapeCharacters','MaxCols','<RIGHT>','Game_Screen_erasePicture','victory','_pictureTextHeight','<I>','convertMessageCoreEscapeReplacements','name','return\x20\x27','_pictureText','\x1bTEXTALIGNMENT[2]','Window_Base_processNewLine','newPage','Default','_pictureTextWindow','floor','KbOTI','ParseArmorNotetags','<LEFT>','constructor','Padding','_pictureTextWidth','nextEventCode','XIauL','map\x20actor','Actors','\x1bWrapBreak[0]','getPreservedFontSettings','activate','setFaceImage','Rows','FbJie','convertTextAlignmentEscapeCharacters','ITALIC','addedHeight','obtainExp','map','remove','EVAL','MessageRows','quantity','anchor','preFlushTextState','levelUp','CreateAutoColorRegExpLists','messageCoreTextSpeed','12yaMPvE','description','textCodeCheck','Undefined','General','isTriggered','FontChangeValue','9tVVJtJ','<%1>','\x1bI[%1]','getChoiceListLineHeight','427856UezSrx','update','oRKKI','makeFontSmaller','startY','normalColor','startX','Game_Party_initialize','ARRAYJSON','inputtingAction','ChoiceWindowLineHeight','initialize','clearPictures','nGmvJ','easeOut','_moveDuration','preConvertEscapeCharacters','addMessageCoreCommands','push','outputWidth','HetcB','ConvertTextAutoColorRegExpFriendly','HkvSX','mjNEx','version','mainFontFace','addContinuousShowTextCommands','processDrawCenteredPicture','clear','convertChoiceMacros','choiceRows','PictureTextChange','isRTL','exit','_showFast','LineHeight','true','Weapons','cCzRK','visible','itemPadding','Window_Options_isVolumeSymbol','bind','choiceCols','splice','FUNC','isChoiceVisible','_subject','Sprite_Picture_updateBitmap','TextSpeed','call','windowPadding','ISSfO','isColorLocked','Window_Message_processEscapeCharacter','EtfGQ','<WORDWRAP>','setTextAlignment','KgNIs','center','currentExt','eZphv','down','WRAPBREAK','updateOffsetPosition','JSON','84116EzTOZB','battleUserName','setWordWrap','Window_Base_processEscapeCharacter','ITqOC','SWITCHES','processAutoSize','QcYmF','Window_Message_clearFlags','drawing','TextCodeActions','contentsHeight','rxWBK','Items','defaultColor','setup','processCommonEvent','\x1bC[%1]%2\x1bPREVCOLOR[0]','prototype','toLowerCase','setPictureTextBuffer','max','TbELb','Window_Base_textSizeEx','isBreakShowTextCommands','outputHeight','Game_Map_initialize','_textMacroFound','Skills','eMQyJ','erasePicture','NameBoxWindowDefaultColor','WordWrap','processPreviousColor','processCharacter','createTextState','_messageWindow','addLoadListener','EQaFC','contentsBack','\x1bTEXTALIGNMENT[0]','_texts','index','AutoColorRegExp','messageRows','adjustShowChoiceDefault','terminateMessage','postFlushTextState','choice','messageWordWrap','DISABLE','\x1bTEXTALIGNMENT','processCustomWait','faceName','registerSelfEvent','scale','start','drawPictureText','_messageOffsetX','erasePictureTextBuffer','_autoPosRegExp','autoPositionOffsetY','TextAlign','Game_Screen_clearPictures','setColorLock','getStartingChoiceWidth','rKdco','isSceneBattle','processFontChangeBold','setRelativePosition','_pictureTextSprite','preemptive','updateAutoPosition','COLORLOCK','width','maxCols','processAutoColorWords','_colorLock','MessageWindowXyOffsets','makeFontBigger','ceil','updateForcedPlacement','rtl','AddOption','prepareShowTextFollowups','Match','_textDelay','updateTransform','message','bWLBa','OffsetX','isContinuePrepareShowTextCommands','FastForwardKey','getMessageWindowXyOffsets','addMessageCoreTextSpeedCommand','processFsTextCode','clearCommandList','HaMBx','Window_Help_refresh','ChoiceWindowProperties','getChoiceListMaxRows','addChildAt','process_VisuMZ_MessageCore_AutoColor','HlZXp','trim','includes','getLastGainedItemData','_nameBoxWindow','instantTextSpeed','convertShowChoiceEscapeCodes','Game_Map_setupEvents','drawPictureTextZone','updateAutoSizePosition','WvjIc','_centerMessageWindow','587652eZRGtF','exec','numVisibleRows','Window_Message_newPage','States','maxChoiceWidth','obtainItem','ChoiceWindowMaxRows','MuVdi','join','initTextAlignement','paintOpacity','HAyuH','HATli','lowerright','RUOtT','flushTextState','left','NlWgr','battleActionName','getChoiceIndent','Window_Message_terminateMessage','setChoiceListTextAlign','yCWJq','code','getChoiceListMaxColumns','databaseObjectName','_spriteset','windowX','Window_Base_changeTextColor','isWordWrapEnabled','clamp','fontFace','convertBaseEscapeCharacters','dLBtJ','Classes','iconIndex','prepareShowTextCommand','type','padding','MsgWindowOffsetX','PxMdJ','isAutoColorAffected','setMessageWindowRows','vIQBN','MessageCore','Game_Party_gainItem','parse','processStoredAutoColorChanges','battle\x20enemy','ALL','messageCoreWindowX','getPictureText','fontSize','map\x20event','ARRAYNUM','RelativePXPY','setMessageWindowWordWrap','dQkEg','status','addCommand','Window_NameBox_refresh','toUpperCase','_forcedPosition','akZcR','text','Game_Map_updateEvents','VisuMZ_1_EventsMoveCore','Window_Options_addGeneralOptions','VCOtG','attachPictureText','ConfigManager_applyData','makeDeepCopy','vSOWS','refreshDimmerBitmap','addMessageCommonEvent','_moveTargetHeight','_messagePositionReset','WdVFH','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_pictureTextBuffer','AutoColorBypassList','AdjustRect','NameBoxWindowOffsetY','yzwNy','indexOf','updateDimensions','dMQBd','isHelpWindowWordWrap','ARRAYSTRUCT','substr','_wholeMoveDuration','changeOutlineColor','addWrapBreakAfterPunctuation','AutoColor','mainFontSize','setTextDelay','DefaultOutlineWidth','_scene','AbFHg','windowWidth','NZNXQ','getMessageWindowWidth','setMessageWindowWidth','onDatabaseLoaded','sort','30flZFlm','ARRAYSTR'];_0x35e9=function(){return _0xf2335f;};return _0x35e9();}var label=_0x1f0508(0x226),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1f0508(0x364)](function(_0x1d5262){const _0x240c8b=_0x1f0508;return _0x1d5262[_0x240c8b(0x234)]&&_0x1d5262[_0x240c8b(0x13a)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1f0508(0x311)]=VisuMZ[label][_0x1f0508(0x311)]||{},VisuMZ['ConvertParams']=function(_0x1dffba,_0x554d37){const _0x4dba8b=_0x1f0508;for(const _0x4da2e9 in _0x554d37){if('RUOtT'!==_0x4dba8b(0x208)){let _0xf0f98d=0x60;const _0x3a1b57=_0x5733cc[_0x4dba8b(0x2a8)]();for(const _0x4489cd of _0x3a1b57){_0x4489cd[_0x4dba8b(0x267)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0xf0f98d=_0x5d918e[_0x4dba8b(0x19b)](_0xf0f98d,_0x532b4e(_0x4852a2['$1'])));}return _0xf0f98d;}else{if(_0x4da2e9['match'](/(.*):(.*)/i)){const _0x5e41ee=String(RegExp['$1']),_0x677239=String(RegExp['$2'])[_0x4dba8b(0x237)]()[_0x4dba8b(0x1ee)]();let _0x305f0b,_0x4c922f,_0x10025c;switch(_0x677239){case _0x4dba8b(0x375):_0x305f0b=_0x554d37[_0x4da2e9]!==''?Number(_0x554d37[_0x4da2e9]):0x0;break;case _0x4dba8b(0x230):_0x4c922f=_0x554d37[_0x4da2e9]!==''?JSON[_0x4dba8b(0x228)](_0x554d37[_0x4da2e9]):[],_0x305f0b=_0x4c922f['map'](_0x1045f3=>Number(_0x1045f3));break;case _0x4dba8b(0x131):_0x305f0b=_0x554d37[_0x4da2e9]!==''?eval(_0x554d37[_0x4da2e9]):null;break;case _0x4dba8b(0x280):_0x4c922f=_0x554d37[_0x4da2e9]!==''?JSON[_0x4dba8b(0x228)](_0x554d37[_0x4da2e9]):[],_0x305f0b=_0x4c922f['map'](_0x55200d=>eval(_0x55200d));break;case _0x4dba8b(0x185):_0x305f0b=_0x554d37[_0x4da2e9]!==''?JSON['parse'](_0x554d37[_0x4da2e9]):'';break;case _0x4dba8b(0x14c):_0x4c922f=_0x554d37[_0x4da2e9]!==''?JSON['parse'](_0x554d37[_0x4da2e9]):[],_0x305f0b=_0x4c922f['map'](_0x39854e=>JSON[_0x4dba8b(0x228)](_0x39854e));break;case _0x4dba8b(0x171):_0x305f0b=_0x554d37[_0x4da2e9]!==''?new Function(JSON[_0x4dba8b(0x228)](_0x554d37[_0x4da2e9])):new Function(_0x4dba8b(0x3ca));break;case'ARRAYFUNC':_0x4c922f=_0x554d37[_0x4da2e9]!==''?JSON[_0x4dba8b(0x228)](_0x554d37[_0x4da2e9]):[],_0x305f0b=_0x4c922f[_0x4dba8b(0x12f)](_0x5228f8=>new Function(JSON[_0x4dba8b(0x228)](_0x5228f8)));break;case'STR':_0x305f0b=_0x554d37[_0x4da2e9]!==''?String(_0x554d37[_0x4da2e9]):'';break;case _0x4dba8b(0x264):_0x4c922f=_0x554d37[_0x4da2e9]!==''?JSON['parse'](_0x554d37[_0x4da2e9]):[],_0x305f0b=_0x4c922f[_0x4dba8b(0x12f)](_0x411dc5=>String(_0x411dc5));break;case'STRUCT':_0x10025c=_0x554d37[_0x4da2e9]!==''?JSON[_0x4dba8b(0x228)](_0x554d37[_0x4da2e9]):{},_0x1dffba[_0x5e41ee]={},VisuMZ[_0x4dba8b(0x2c9)](_0x1dffba[_0x5e41ee],_0x10025c);continue;case _0x4dba8b(0x252):_0x4c922f=_0x554d37[_0x4da2e9]!==''?JSON['parse'](_0x554d37[_0x4da2e9]):[],_0x305f0b=_0x4c922f['map'](_0x1a2324=>VisuMZ[_0x4dba8b(0x2c9)]({},JSON[_0x4dba8b(0x228)](_0x1a2324)));break;default:continue;}_0x1dffba[_0x5e41ee]=_0x305f0b;}}}return _0x1dffba;},(_0x552b94=>{const _0x2ced80=_0x1f0508,_0x289001=_0x552b94[_0x2ced80(0x112)];for(const _0xcbbafe of dependencies){if(!Imported[_0xcbbafe]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2ced80(0x293)](_0x289001,_0xcbbafe)),SceneManager[_0x2ced80(0x165)]();break;}}const _0x4e5080=_0x552b94['description'];if(_0x4e5080[_0x2ced80(0x267)](/\[Version[ ](.*?)\]/i)){const _0x379be2=Number(RegExp['$1']);_0x379be2!==VisuMZ[label][_0x2ced80(0x15c)]&&(alert(_0x2ced80(0x248)[_0x2ced80(0x293)](_0x289001,_0x379be2)),SceneManager[_0x2ced80(0x165)]());}if(_0x4e5080['match'](/\[Tier[ ](\d+)\]/i)){const _0x33aa9e=Number(RegExp['$1']);if(_0x33aa9e<tier){if(_0x2ced80(0x27c)==='xuPgM')alert(_0x2ced80(0x268)[_0x2ced80(0x293)](_0x289001,_0x33aa9e,tier)),SceneManager[_0x2ced80(0x165)]();else return 0x0;}else tier=Math[_0x2ced80(0x19b)](_0x33aa9e,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x2ced80(0x311)],_0x552b94[_0x2ced80(0x30f)]);})(pluginData),PluginManager[_0x1f0508(0x336)](pluginData[_0x1f0508(0x112)],_0x1f0508(0x1e9),_0x5828d0=>{const _0x3ec595=_0x1f0508;VisuMZ['ConvertParams'](_0x5828d0,_0x5828d0);const _0x563b68=_0x5828d0[_0x3ec595(0x167)]||$gameSystem[_0x3ec595(0x143)]()||0x1,_0x484e4b=_0x5828d0[_0x3ec595(0x2b5)]||$gameSystem[_0x3ec595(0x1ea)]()||0x1,_0x4735e7=_0x5828d0[_0x3ec595(0x10b)]||$gameSystem[_0x3ec595(0x212)]()||0x1,_0x3c98c8=_0x5828d0[_0x3ec595(0x1c4)][_0x3ec595(0x199)]()||_0x3ec595(0x2d0);$gameSystem[_0x3ec595(0x2d5)](_0x563b68),$gameSystem[_0x3ec595(0x35e)](_0x484e4b),$gameSystem['setChoiceListMaxColumns'](_0x4735e7),$gameSystem[_0x3ec595(0x20f)](_0x3c98c8);}),PluginManager[_0x1f0508(0x336)](pluginData[_0x1f0508(0x112)],'MessageWindowProperties',_0x493498=>{const _0x1ac5cc=_0x1f0508;VisuMZ['ConvertParams'](_0x493498,_0x493498);const _0x50689e=_0x493498[_0x1ac5cc(0x129)]||$gameSystem[_0x1ac5cc(0x33a)]()||0x1,_0x332528=_0x493498['Width']||$gameSystem[_0x1ac5cc(0x25f)]()||0x1;$gameTemp[_0x1ac5cc(0x1f8)]=!![];const _0x5358a0=_0x493498['WordWrap']['toLowerCase']();$gameSystem[_0x1ac5cc(0x224)](_0x50689e),$gameSystem[_0x1ac5cc(0x260)](_0x332528);if([_0x1ac5cc(0x168),'false'][_0x1ac5cc(0x1ef)](_0x5358a0)){if(_0x1ac5cc(0x26d)===_0x1ac5cc(0x3b3)){if(_0x515a78['Match']===_0x59f3b3){if(_0x53f138['Type']==='')this['obtainEscapeParam'](_0x4e5f02);_0x27ff28[_0x1ac5cc(0x2f3)][_0x1ac5cc(0x176)](this,_0x12e86f);if(this['constructor']===_0x2e3eb5){const _0x49b7da=_0x3f2596[_0x1ac5cc(0x36f)]||0x0;if(_0x49b7da>0x0)this['launchMessageCommonEvent'](_0x49b7da);}}}else $gameSystem['setMessageWindowWordWrap'](eval(_0x5358a0));}const _0x1e139b=SceneManager[_0x1ac5cc(0x25b)][_0x1ac5cc(0x1aa)];if(_0x1e139b){if(_0x1ac5cc(0x222)===_0x1ac5cc(0x15a))return'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x1ac5cc(0x293)](_0x255e7a,_0x2c849e);else _0x1e139b[_0x1ac5cc(0x394)](),_0x1e139b[_0x1ac5cc(0x24f)](),_0x1e139b[_0x1ac5cc(0x2a9)]();}}),PluginManager[_0x1f0508(0x336)](pluginData[_0x1f0508(0x112)],_0x1f0508(0x1d4),_0x56c578=>{const _0x193f82=_0x1f0508;VisuMZ['ConvertParams'](_0x56c578,_0x56c578),$gameSystem[_0x193f82(0x362)](_0x56c578[_0x193f82(0x1e0)],_0x56c578['OffsetY']);const _0x1c1a5e=SceneManager['_scene'][_0x193f82(0x1aa)];_0x1c1a5e&&(_0x1c1a5e[_0x193f82(0x394)](),_0x1c1a5e[_0x193f82(0x24f)](),_0x1c1a5e['createContents']());}),PluginManager[_0x1f0508(0x336)](pluginData['name'],_0x1f0508(0x163),_0x5d317d=>{const _0x810f0d=_0x1f0508;VisuMZ[_0x810f0d(0x2c9)](_0x5d317d,_0x5d317d);const _0x32a4d0=_0x5d317d[_0x810f0d(0x3c2)]||[],_0xce7ad9=_0x5d317d[_0x810f0d(0x11f)]||0x0,_0x161617=[_0x810f0d(0x2dc),'up',_0x810f0d(0x36e),_0x810f0d(0x20a),'center','right',_0x810f0d(0x37b),'down',_0x810f0d(0x207)];for(const _0x155853 of _0x32a4d0){if('BXxiT'!=='KsFCJ'){$gameScreen['setPictureTextBuffer'](_0x155853,_0xce7ad9);for(const _0x5a6f57 of _0x161617){if(_0x810f0d(0x24d)!==_0x810f0d(0x380)){if(_0x5d317d[_0x5a6f57]===undefined)continue;$gameScreen['setPictureText'](_0x155853,_0x5d317d[_0x5a6f57],_0x5a6f57);}else{if(_0x9452d8[_0x810f0d(0x30f)][0x2]<0x0)return;const _0x2cfee7=_0x2ac4a9[_0x810f0d(0x30f)][0x2]+_0x9bdee5;this['_list'][_0x1e4743][_0x810f0d(0x30f)][0x2]=_0x2cfee7;}}}else this['_interpreter'][_0x810f0d(0x145)]();}}),PluginManager[_0x1f0508(0x336)](pluginData['name'],'PictureTextErase',_0x29faf9=>{const _0x1afda1=_0x1f0508;VisuMZ[_0x1afda1(0x2c9)](_0x29faf9,_0x29faf9);const _0x189c4c=_0x29faf9['PictureIDs']||[];for(const _0x3020fe of _0x189c4c){_0x1afda1(0x20b)==='NlWgr'?($gameScreen['eraseAllPictureTexts'](_0x3020fe),$gameScreen[_0x1afda1(0x1c1)](_0x3020fe)):(this[_0x1afda1(0x1e6)](),this[_0x1afda1(0x39c)](),this['_messageWindow']&&(this['updatePlacement'](),this[_0x1afda1(0x2e4)]()),this['createContents'](),this[_0x1afda1(0x358)](),this[_0x1afda1(0x243)](),_0x32a9ab['prototype'][_0x1afda1(0x2da)][_0x1afda1(0x176)](this));}}),VisuMZ[_0x1f0508(0x226)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x1f0508(0x198)][_0x1f0508(0x261)],Scene_Boot[_0x1f0508(0x198)]['onDatabaseLoaded']=function(){const _0x5b1bcc=_0x1f0508;VisuMZ[_0x5b1bcc(0x226)]['Scene_Boot_onDatabaseLoaded'][_0x5b1bcc(0x176)](this),this[_0x5b1bcc(0x312)](),this['process_VisuMZ_MessageCore_TextCodes_Replace'](),this['process_VisuMZ_MessageCore_TextMacros'](),this[_0x5b1bcc(0x1ec)]();},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x32e)]=function(_0x3ee756){const _0x5f4779=_0x1f0508,_0x1b2718=VisuMZ[_0x5f4779(0x226)][_0x5f4779(0x311)][_0x3ee756];_0x1b2718[_0x5f4779(0x262)]((_0x1a7d44,_0x53a145)=>{const _0x349e34=_0x5f4779;if(!_0x1a7d44||!_0x53a145)return-0x1;return _0x53a145['Match'][_0x349e34(0x2a7)]-_0x1a7d44[_0x349e34(0x1db)][_0x349e34(0x2a7)];});},Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextCodes_Action']=function(){const _0x3ae3ca=_0x1f0508;VisuMZ[_0x3ae3ca(0x226)]['SortObjectByKeyLength'](_0x3ae3ca(0x190));for(const _0x5c8459 of VisuMZ[_0x3ae3ca(0x226)][_0x3ae3ca(0x311)]['TextCodeActions']){_0x5c8459[_0x3ae3ca(0x1db)]=_0x5c8459[_0x3ae3ca(0x1db)][_0x3ae3ca(0x237)](),_0x5c8459[_0x3ae3ca(0x13b)]=new RegExp('\x1b'+_0x5c8459[_0x3ae3ca(0x1db)],'gi'),_0x5c8459['textCodeResult']='\x1b'+_0x5c8459['Match'];if(_0x5c8459['Type']==='')_0x5c8459[_0x3ae3ca(0x34f)]+=_0x3ae3ca(0x359);}},Scene_Boot['prototype']['process_VisuMZ_MessageCore_TextCodes_Replace']=function(){const _0x507e00=_0x1f0508;VisuMZ[_0x507e00(0x226)]['SortObjectByKeyLength'](_0x507e00(0x3c6));for(const _0x442da5 of VisuMZ['MessageCore'][_0x507e00(0x311)]['TextCodeReplace']){if(_0x507e00(0x19c)!=='KLvUO'){_0x442da5[_0x507e00(0x13b)]=new RegExp('\x1b'+_0x442da5[_0x507e00(0x1db)]+_0x442da5['Type'],'gi');if(_0x442da5[_0x507e00(0x2e5)]!==''&&_0x442da5[_0x507e00(0x2e5)]!=='Undefined'){if(_0x507e00(0x17b)==='EtfGQ')_0x442da5[_0x507e00(0x34f)]=new Function(_0x507e00(0x113)+_0x442da5[_0x507e00(0x2e5)]['replace'](/\\/g,'\x1b')+'\x27');else return this[_0x507e00(0x121)]()===0x191;}else _0x442da5['textCodeResult']=_0x442da5['TextJS'];}else{const _0x556e93=this[_0x507e00(0x39d)](_0x526186);if(_0x438d3b[_0x507e00(0x18f)])this[_0x507e00(0x1c6)](_0x556e93>0x0);}}},Scene_Boot['prototype'][_0x1f0508(0x2f5)]=function(){const _0x5e0670=_0x1f0508;for(const _0xe2cb8e of VisuMZ[_0x5e0670(0x226)]['Settings'][_0x5e0670(0x266)]){_0xe2cb8e[_0x5e0670(0x13b)]=new RegExp('\x5c['+_0xe2cb8e[_0x5e0670(0x1db)]+'\x5c]','gi'),_0xe2cb8e[_0x5e0670(0x2e5)]!==''&&_0xe2cb8e[_0x5e0670(0x2e5)]!==_0x5e0670(0x13c)?_0xe2cb8e[_0x5e0670(0x34f)]=new Function(_0x5e0670(0x113)+_0xe2cb8e['TextStr'][_0x5e0670(0x3c8)](/\\/g,'\x1b')+'\x27'):_0x5e0670(0x122)==='XIauL'?_0xe2cb8e[_0x5e0670(0x34f)]=_0xe2cb8e['TextJS']:this[_0x5e0670(0x3be)](_0x4e809f,0x1);}},Scene_Boot['prototype']['process_VisuMZ_MessageCore_AutoColor']=function(){const _0x3b2e3e=_0x1f0508,_0x52fc2b=VisuMZ['MessageCore'][_0x3b2e3e(0x311)][_0x3b2e3e(0x257)];if(!VisuMZ[_0x3b2e3e(0x2bc)]){if(_0x3b2e3e(0x206)!==_0x3b2e3e(0x18d))VisuMZ['MessageCore']['AddAutoColor']($dataClasses,_0x52fc2b[_0x3b2e3e(0x21c)]),VisuMZ['MessageCore'][_0x3b2e3e(0x368)]($dataSkills,_0x52fc2b[_0x3b2e3e(0x1a2)]),VisuMZ[_0x3b2e3e(0x226)][_0x3b2e3e(0x368)]($dataItems,_0x52fc2b['Items']),VisuMZ[_0x3b2e3e(0x226)][_0x3b2e3e(0x368)]($dataWeapons,_0x52fc2b[_0x3b2e3e(0x169)]),VisuMZ[_0x3b2e3e(0x226)][_0x3b2e3e(0x368)]($dataArmors,_0x52fc2b[_0x3b2e3e(0x2bf)]),VisuMZ[_0x3b2e3e(0x226)][_0x3b2e3e(0x368)]($dataEnemies,_0x52fc2b[_0x3b2e3e(0x2c8)]),VisuMZ['MessageCore']['AddAutoColor']($dataStates,_0x52fc2b[_0x3b2e3e(0x1fd)]);else{const _0x42c34c=_0xe30999[_0x3b2e3e(0x198)][_0x3b2e3e(0x196)][_0x3b2e3e(0x176)](this,_0x22e0d);_0x161886[_0x3b2e3e(0x18f)]&&this[_0x3b2e3e(0x350)](_0x42c34c);}}VisuMZ[_0x3b2e3e(0x226)][_0x3b2e3e(0x137)]();},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x24a)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x1f0508(0x36c),_0x1f0508(0x309),_0x1f0508(0x110),_0x1f0508(0x353),_0x1f0508(0x11d),_0x1f0508(0x393),_0x1f0508(0x34c),'</CENTER>',_0x1f0508(0x10c),_0x1f0508(0x33b),_0x1f0508(0x107),_0x1f0508(0x379),'(((',_0x1f0508(0x327),_0x1f0508(0x17c),_0x1f0508(0x2e7),'<BR>',_0x1f0508(0xfa),_0x1f0508(0x315),_0x1f0508(0x283),_0x1f0508(0x33f),_0x1f0508(0x357),_0x1f0508(0x2e3),_0x1f0508(0x35c),'ENABLE',_0x1f0508(0x1b8),'SWITCH',_0x1f0508(0x18b),_0x1f0508(0x22b),'ANY'],VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x368)]=function(_0x1543ce,_0x3e8477){const _0xd0e2c4=_0x1f0508;if(_0x3e8477<=0x0)return;const _0x2d2f51=_0x1543ce;for(const _0x5c09f2 of _0x2d2f51){if(!_0x5c09f2)continue;VisuMZ['MessageCore'][_0xd0e2c4(0x2a0)](_0x5c09f2,_0x3e8477);}},VisuMZ[_0x1f0508(0x226)]['CreateAutoColorRegExpLists']=function(){const _0x219d5b=_0x1f0508;VisuMZ[_0x219d5b(0x226)]['AutoColorRegExp']=[];for(let _0x17b285=0x1;_0x17b285<=0x1f;_0x17b285++){const _0x31aec4='TextColor%1'['format'](_0x17b285),_0x444047=VisuMZ[_0x219d5b(0x226)]['Settings'][_0x219d5b(0x257)][_0x31aec4];_0x444047[_0x219d5b(0x262)]((_0x53a4b5,_0x766663)=>{const _0x54b081=_0x219d5b;if(!_0x53a4b5||!_0x766663)return-0x1;return _0x766663[_0x54b081(0x2a7)]-_0x53a4b5['length'];}),this[_0x219d5b(0x3b2)](_0x444047,_0x17b285);}},VisuMZ[_0x1f0508(0x226)]['CreateAutoColorRegExpListEntries']=function(_0x196fab,_0x1b082c){const _0x188a14=_0x1f0508;for(const _0xa78b7b of _0x196fab){if(_0xa78b7b[_0x188a14(0x2a7)]<=0x0)continue;if(/^\d+$/['test'](_0xa78b7b))continue;let _0x3ab7d8=VisuMZ[_0x188a14(0x226)][_0x188a14(0x159)](_0xa78b7b);if(_0xa78b7b[_0x188a14(0x267)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x188a14(0xfd)!==_0x188a14(0x3c7))var _0x1707f9=new RegExp(_0x3ab7d8,'i');else _0x2dddff['y']=this[_0x188a14(0x39d)](_0x152c73),_0x5cff6b[_0x188a14(0x226)][_0x188a14(0x311)][_0x188a14(0x13d)][_0x188a14(0x231)]&&(_0x342589['y']+=_0x14579a[_0x188a14(0x148)]);}else{if(_0x188a14(0x339)==='ibvfc')return this[_0x188a14(0x121)]()===0x65&&_0x23330f[_0x188a14(0x33a)]()>0x4?!![]:this['nextEventCode']()===0x191;else var _0x1707f9=new RegExp('\x5cb'+_0x3ab7d8+'\x5cb','g');}VisuMZ[_0x188a14(0x226)][_0x188a14(0x1b1)][_0x188a14(0x156)]([_0x1707f9,'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x188a14(0x293)](_0x1b082c,_0xa78b7b)]);}},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x159)]=function(_0x358e53){const _0x5cda8d=_0x1f0508;return _0x358e53=_0x358e53['replace'](/(\W)/gi,(_0x4fc9ad,_0x56722f)=>'\x5c%1'[_0x5cda8d(0x293)](_0x56722f)),_0x358e53;},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x3cd)]=VisuMZ['ParseClassNotetags'],VisuMZ[_0x1f0508(0x3cd)]=function(_0x1c4437){const _0x1c81a1=_0x1f0508;VisuMZ[_0x1c81a1(0x226)]['ParseClassNotetags'][_0x1c81a1(0x176)](this,_0x1c4437);const _0x24ff96=VisuMZ[_0x1c81a1(0x226)]['Settings']['AutoColor'];VisuMZ[_0x1c81a1(0x226)]['CreateAutoColorFor'](_0x1c4437,_0x24ff96['Classes']);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x3ac)]=VisuMZ[_0x1f0508(0x3ac)],VisuMZ[_0x1f0508(0x3ac)]=function(_0x2f5ecc){const _0x18fbee=_0x1f0508;VisuMZ[_0x18fbee(0x226)][_0x18fbee(0x3ac)][_0x18fbee(0x176)](this,_0x2f5ecc);const _0x4f79f0=VisuMZ[_0x18fbee(0x226)][_0x18fbee(0x311)][_0x18fbee(0x257)];VisuMZ[_0x18fbee(0x226)][_0x18fbee(0x2a0)](_0x2f5ecc,_0x4f79f0[_0x18fbee(0x1a2)]);},0x7,VisuMZ['MessageCore'][_0x1f0508(0x2e1)]=VisuMZ[_0x1f0508(0x2e1)],VisuMZ[_0x1f0508(0x2e1)]=function(_0x72b8ff){const _0x345e8d=_0x1f0508;VisuMZ[_0x345e8d(0x226)][_0x345e8d(0x2e1)][_0x345e8d(0x176)](this,_0x72b8ff);const _0x5b52cb=VisuMZ['MessageCore'][_0x345e8d(0x311)][_0x345e8d(0x257)];VisuMZ[_0x345e8d(0x226)]['CreateAutoColorFor'](_0x72b8ff,_0x5b52cb[_0x345e8d(0x193)]);},VisuMZ['MessageCore'][_0x1f0508(0x305)]=VisuMZ[_0x1f0508(0x305)],VisuMZ[_0x1f0508(0x305)]=function(_0x58938c){const _0x5af6c5=_0x1f0508;VisuMZ[_0x5af6c5(0x226)][_0x5af6c5(0x305)][_0x5af6c5(0x176)](this,_0x58938c);const _0x53ae58=VisuMZ[_0x5af6c5(0x226)][_0x5af6c5(0x311)]['AutoColor'];VisuMZ['MessageCore'][_0x5af6c5(0x2a0)](_0x58938c,_0x53ae58[_0x5af6c5(0x169)]);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x11c)]=VisuMZ[_0x1f0508(0x11c)],VisuMZ['ParseArmorNotetags']=function(_0x2f87a1){const _0x18bab6=_0x1f0508;VisuMZ[_0x18bab6(0x226)][_0x18bab6(0x11c)][_0x18bab6(0x176)](this,_0x2f87a1);const _0x5cdeda=VisuMZ[_0x18bab6(0x226)][_0x18bab6(0x311)][_0x18bab6(0x257)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x2f87a1,_0x5cdeda[_0x18bab6(0x2bf)]);},VisuMZ[_0x1f0508(0x226)]['ParseEnemyNotetags']=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x1f0508(0x33d)]=function(_0xda578e){const _0x3436b6=_0x1f0508;VisuMZ[_0x3436b6(0x226)]['ParseEnemyNotetags'][_0x3436b6(0x176)](this,_0xda578e);const _0x23e764=VisuMZ[_0x3436b6(0x226)][_0x3436b6(0x311)][_0x3436b6(0x257)];VisuMZ[_0x3436b6(0x226)]['CreateAutoColorFor'](_0xda578e,_0x23e764[_0x3436b6(0x2c8)]);},VisuMZ['MessageCore']['ParseStateNotetags']=VisuMZ[_0x1f0508(0x2c4)],VisuMZ[_0x1f0508(0x2c4)]=function(_0x12c6c2){const _0x58142d=_0x1f0508;VisuMZ[_0x58142d(0x226)][_0x58142d(0x2c4)][_0x58142d(0x176)](this,_0x12c6c2);const _0x56c48a=VisuMZ[_0x58142d(0x226)]['Settings'][_0x58142d(0x257)];VisuMZ[_0x58142d(0x226)][_0x58142d(0x2a0)](_0x12c6c2,_0x56c48a['States']);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x2a0)]=function(_0x522819,_0x4c470a){const _0x4ea91d=_0x1f0508;if(_0x4c470a<=0x0)return;const _0x40c40c=VisuMZ[_0x4ea91d(0x226)][_0x4ea91d(0x311)][_0x4ea91d(0x257)]['TextColor'+_0x4c470a];let _0xc42043=_0x522819['name'][_0x4ea91d(0x1ee)]();if(/^\d+$/[_0x4ea91d(0x349)](_0xc42043))return;if(VisuMZ[_0x4ea91d(0x226)]['AutoColorBypassList'][_0x4ea91d(0x1ef)](_0xc42043[_0x4ea91d(0x237)]()))return;_0xc42043=_0xc42043['replace'](/\\I\[(\d+)\]/gi,''),_0xc42043=_0xc42043[_0x4ea91d(0x3c8)](/\x1bI\[(\d+)\]/gi,'');if(_0xc42043[_0x4ea91d(0x2a7)]<=0x0)return;if(_0xc42043[_0x4ea91d(0x267)](/-----/i))return;_0x40c40c[_0x4ea91d(0x156)](_0xc42043);},SceneManager[_0x1f0508(0x1c9)]=function(){const _0xca83c0=_0x1f0508;return this['_scene']&&this[_0xca83c0(0x25b)][_0xca83c0(0x11e)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x31d538=_0x1f0508;return this['_scene']&&this[_0x31d538(0x25b)]['constructor']===Scene_Map;},VisuMZ[_0x1f0508(0x226)]['TextManager_message']=TextManager[_0x1f0508(0x1de)],TextManager[_0x1f0508(0x1de)]=function(_0x46ec23){const _0x2e66a2=_0x1f0508,_0x12c893=[_0x2e66a2(0x136),'emerge',_0x2e66a2(0x1cd),'surprise',_0x2e66a2(0x10e),_0x2e66a2(0x2b1),'escapeStart',_0x2e66a2(0x12e),_0x2e66a2(0x2b0),_0x2e66a2(0x1ff)];let _0x2ba7ba=VisuMZ[_0x2e66a2(0x226)]['TextManager_message'][_0x2e66a2(0x176)](this,_0x46ec23);return _0x12c893[_0x2e66a2(0x1ef)](_0x46ec23)&&(_0x2ba7ba=_0x2e66a2(0x2e7)+_0x2ba7ba),_0x2ba7ba;},ConfigManager[_0x1f0508(0x392)]=VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x311)][_0x1f0508(0x175)]['Default'],VisuMZ[_0x1f0508(0x226)]['ConfigManager_makeData']=ConfigManager[_0x1f0508(0x2f9)],ConfigManager[_0x1f0508(0x2f9)]=function(){const _0x34f890=_0x1f0508,_0x3fcdea=VisuMZ[_0x34f890(0x226)][_0x34f890(0x389)][_0x34f890(0x176)](this);return _0x3fcdea[_0x34f890(0x392)]=this[_0x34f890(0x392)],_0x3fcdea;},VisuMZ['MessageCore'][_0x1f0508(0x240)]=ConfigManager['applyData'],ConfigManager[_0x1f0508(0x2c2)]=function(_0x18f9a7){const _0x47eb05=_0x1f0508;VisuMZ[_0x47eb05(0x226)][_0x47eb05(0x240)]['call'](this,_0x18f9a7),_0x47eb05(0x392)in _0x18f9a7?this[_0x47eb05(0x392)]=Number(_0x18f9a7[_0x47eb05(0x392)])[_0x47eb05(0x218)](0x1,0xb):this[_0x47eb05(0x392)]=VisuMZ[_0x47eb05(0x226)][_0x47eb05(0x311)]['TextSpeed'][_0x47eb05(0x118)];},TextManager[_0x1f0508(0x138)]=VisuMZ[_0x1f0508(0x226)]['Settings']['TextSpeed'][_0x1f0508(0x326)],TextManager[_0x1f0508(0x1f2)]=VisuMZ[_0x1f0508(0x226)]['Settings'][_0x1f0508(0x175)][_0x1f0508(0x28a)],VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x31a)]=Game_System[_0x1f0508(0x198)]['initialize'],Game_System[_0x1f0508(0x198)][_0x1f0508(0x14f)]=function(){const _0x2083d5=_0x1f0508;VisuMZ['MessageCore'][_0x2083d5(0x31a)][_0x2083d5(0x176)](this),this[_0x2083d5(0x325)]();},Game_System[_0x1f0508(0x198)]['initMessageCore']=function(){const _0x221d14=_0x1f0508,_0x36ee4a=VisuMZ['MessageCore'][_0x221d14(0x311)][_0x221d14(0x13d)],_0x44c134=VisuMZ[_0x221d14(0x226)][_0x221d14(0x311)][_0x221d14(0x1a6)];this[_0x221d14(0x106)]={'messageRows':_0x36ee4a[_0x221d14(0x132)],'messageWidth':_0x36ee4a[_0x221d14(0x32f)],'messageWordWrap':_0x44c134[_0x221d14(0x328)],'helpWordWrap':_0x44c134[_0x221d14(0x2ff)],'choiceLineHeight':_0x36ee4a[_0x221d14(0x14e)],'choiceRows':_0x36ee4a[_0x221d14(0x200)],'choiceCols':_0x36ee4a['ChoiceWindowMaxCols'],'choiceTextAlign':_0x36ee4a['ChoiceWindowTextAlign']},this[_0x221d14(0x1c0)]===undefined&&(this[_0x221d14(0x1c0)]=_0x36ee4a['MsgWindowOffsetX'],this['_messageOffsetY']=_0x36ee4a[_0x221d14(0x299)]);},Game_System[_0x1f0508(0x198)]['getMessageWindowRows']=function(){const _0x36df3a=_0x1f0508;if(this[_0x36df3a(0x106)]===undefined)this[_0x36df3a(0x325)]();if(this[_0x36df3a(0x106)][_0x36df3a(0x1b2)]===undefined)this['initMessageCore']();return this[_0x36df3a(0x106)][_0x36df3a(0x1b2)];},Game_System[_0x1f0508(0x198)][_0x1f0508(0x224)]=function(_0x3eeab3){const _0x18dc26=_0x1f0508;if(this[_0x18dc26(0x106)]===undefined)this[_0x18dc26(0x325)]();if(this[_0x18dc26(0x106)][_0x18dc26(0x1b2)]===undefined)this[_0x18dc26(0x325)]();this[_0x18dc26(0x106)][_0x18dc26(0x1b2)]=_0x3eeab3||0x1;},Game_System[_0x1f0508(0x198)][_0x1f0508(0x25f)]=function(){const _0x573131=_0x1f0508;if(this[_0x573131(0x106)]===undefined)this[_0x573131(0x325)]();if(this['_MessageCoreSettings'][_0x573131(0x278)]===undefined)this[_0x573131(0x325)]();return this['_MessageCoreSettings'][_0x573131(0x278)];},Game_System[_0x1f0508(0x198)][_0x1f0508(0x260)]=function(_0x14151d){const _0x43b936=_0x1f0508;if(this[_0x43b936(0x106)]===undefined)this['initMessageCore']();if(this[_0x43b936(0x106)][_0x43b936(0x278)]===undefined)this[_0x43b936(0x325)]();_0x14151d=Math[_0x43b936(0x1d6)](_0x14151d);if(_0x14151d%0x2!==0x0)_0x14151d+=0x1;this[_0x43b936(0x106)][_0x43b936(0x278)]=_0x14151d||0x2;},Game_System['prototype'][_0x1f0508(0x329)]=function(){const _0x5780c3=_0x1f0508;if(this[_0x5780c3(0x106)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['messageWordWrap']===undefined)this[_0x5780c3(0x325)]();return this[_0x5780c3(0x106)][_0x5780c3(0x1b7)];},Game_System[_0x1f0508(0x198)]['setMessageWindowWordWrap']=function(_0x104c4b){const _0x4a5215=_0x1f0508;if(this[_0x4a5215(0x106)]===undefined)this[_0x4a5215(0x325)]();if(this[_0x4a5215(0x106)][_0x4a5215(0x1b7)]===undefined)this[_0x4a5215(0x325)]();this['_MessageCoreSettings'][_0x4a5215(0x1b7)]=_0x104c4b;},Game_System[_0x1f0508(0x198)][_0x1f0508(0x1e3)]=function(){const _0x48c8e5=_0x1f0508;if(this['_messageOffsetX']===undefined){const _0x414cba=VisuMZ['MessageCore'][_0x48c8e5(0x311)][_0x48c8e5(0x13d)];this[_0x48c8e5(0x1c0)]=_0x414cba[_0x48c8e5(0x221)],this['_messageOffsetY']=_0x414cba[_0x48c8e5(0x299)];}return{'x':this[_0x48c8e5(0x1c0)]||0x0,'y':this[_0x48c8e5(0x304)]||0x0};},Game_System[_0x1f0508(0x198)][_0x1f0508(0x362)]=function(_0x3046bc,_0xb62157){const _0x1ae3f9=_0x1f0508;if(this['_MessageCoreSettings']===undefined)this[_0x1ae3f9(0x325)]();this[_0x1ae3f9(0x1c0)]=_0x3046bc,this[_0x1ae3f9(0x304)]=_0xb62157;},Game_System[_0x1f0508(0x198)]['isHelpWindowWordWrap']=function(){const _0x4c66e6=_0x1f0508;if(this['_MessageCoreSettings']===undefined)this[_0x4c66e6(0x325)]();if(this[_0x4c66e6(0x106)][_0x4c66e6(0x27b)]===undefined)this[_0x4c66e6(0x325)]();return this[_0x4c66e6(0x106)][_0x4c66e6(0x27b)];},Game_System[_0x1f0508(0x198)][_0x1f0508(0x370)]=function(_0x18f731){const _0x13cdba=_0x1f0508;if(this['_MessageCoreSettings']===undefined)this[_0x13cdba(0x325)]();if(this['_MessageCoreSettings'][_0x13cdba(0x27b)]===undefined)this[_0x13cdba(0x325)]();this['_MessageCoreSettings'][_0x13cdba(0x27b)]=_0x18f731;},Game_System[_0x1f0508(0x198)]['getChoiceListLineHeight']=function(){const _0x1073e4=_0x1f0508;if(this[_0x1073e4(0x106)]===undefined)this['initMessageCore']();if(this[_0x1073e4(0x106)]['choiceLineHeight']===undefined)this[_0x1073e4(0x325)]();return this[_0x1073e4(0x106)]['choiceLineHeight'];},Game_System[_0x1f0508(0x198)][_0x1f0508(0x2d5)]=function(_0x5343fd){const _0x57e47b=_0x1f0508;if(this[_0x57e47b(0x106)]===undefined)this[_0x57e47b(0x325)]();if(this[_0x57e47b(0x106)]['choiceLineHeight']===undefined)this[_0x57e47b(0x325)]();this[_0x57e47b(0x106)][_0x57e47b(0x308)]=_0x5343fd||0x1;},Game_System[_0x1f0508(0x198)][_0x1f0508(0x1ea)]=function(){const _0x1f4e88=_0x1f0508;if(this[_0x1f4e88(0x106)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings']['choiceRows']===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x1f4e88(0x162)];},Game_System['prototype'][_0x1f0508(0x35e)]=function(_0x3941ba){const _0x5d0684=_0x1f0508;if(this[_0x5d0684(0x106)]===undefined)this[_0x5d0684(0x325)]();if(this[_0x5d0684(0x106)]['choiceRows']===undefined)this[_0x5d0684(0x325)]();this['_MessageCoreSettings'][_0x5d0684(0x162)]=_0x3941ba||0x1;},Game_System[_0x1f0508(0x198)][_0x1f0508(0x212)]=function(){const _0x36117c=_0x1f0508;if(this[_0x36117c(0x106)]===undefined)this[_0x36117c(0x325)]();if(this[_0x36117c(0x106)][_0x36117c(0x16f)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0x36117c(0x16f)];},Game_System[_0x1f0508(0x198)]['setChoiceListMaxColumns']=function(_0x38c1d4){const _0x167bdc=_0x1f0508;if(this[_0x167bdc(0x106)]===undefined)this[_0x167bdc(0x325)]();if(this[_0x167bdc(0x106)][_0x167bdc(0x16f)]===undefined)this[_0x167bdc(0x325)]();this[_0x167bdc(0x106)][_0x167bdc(0x16f)]=_0x38c1d4||0x1;},Game_System[_0x1f0508(0x198)]['getChoiceListTextAlign']=function(){const _0x1217f7=_0x1f0508;if(this['_MessageCoreSettings']===undefined)this['initMessageCore']();if(this[_0x1217f7(0x106)][_0x1217f7(0x2ab)]===undefined)this[_0x1217f7(0x325)]();return this['_MessageCoreSettings'][_0x1217f7(0x2ab)];},Game_System[_0x1f0508(0x198)][_0x1f0508(0x20f)]=function(_0x301dc5){const _0x30ee72=_0x1f0508;if(this['_MessageCoreSettings']===undefined)this[_0x30ee72(0x325)]();if(this[_0x30ee72(0x106)][_0x30ee72(0x2ab)]===undefined)this[_0x30ee72(0x325)]();this[_0x30ee72(0x106)][_0x30ee72(0x2ab)]=_0x301dc5[_0x30ee72(0x199)]();},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x1c5)]=Game_Screen[_0x1f0508(0x198)][_0x1f0508(0x150)],Game_Screen[_0x1f0508(0x198)]['clearPictures']=function(){const _0x365cd5=_0x1f0508;VisuMZ[_0x365cd5(0x226)][_0x365cd5(0x1c5)][_0x365cd5(0x176)](this),this[_0x365cd5(0xf8)]();},Game_Screen[_0x1f0508(0x198)][_0x1f0508(0xf8)]=function(){const _0x418bb0=_0x1f0508;this[_0x418bb0(0x114)]=[],this[_0x418bb0(0x249)]=[];},Game_Screen[_0x1f0508(0x198)]['getPictureTextData']=function(_0x375c3c){const _0x10aa09=_0x1f0508;if(this['_pictureText']===undefined)this[_0x10aa09(0xf8)]();const _0x234ace=this[_0x10aa09(0x39f)](_0x375c3c);return this[_0x10aa09(0x114)][_0x234ace]=this[_0x10aa09(0x114)][_0x234ace]||{},this[_0x10aa09(0x114)][_0x234ace];},Game_Screen[_0x1f0508(0x198)][_0x1f0508(0x22d)]=function(_0x10c016,_0x3386a9){const _0x4bc20b=_0x1f0508;return _0x3386a9=_0x3386a9['toLowerCase']()['trim'](),this[_0x4bc20b(0x366)](_0x10c016)[_0x3386a9]||'';},Game_Screen[_0x1f0508(0x198)]['setPictureText']=function(_0x1dfd62,_0x340334,_0x22a7c1){const _0x289864=_0x1f0508;_0x22a7c1=_0x22a7c1['toLowerCase']()[_0x289864(0x1ee)](),this[_0x289864(0x366)](_0x1dfd62)[_0x22a7c1]=_0x340334||'';},Game_Screen[_0x1f0508(0x198)][_0x1f0508(0x303)]=function(_0x1cd6b4){const _0x1e91ba=_0x1f0508;if(this[_0x1e91ba(0x114)]===undefined)this[_0x1e91ba(0xf8)]();const _0x342978=this['realPictureId'](_0x1cd6b4);this[_0x1e91ba(0x114)][_0x342978]=null;},Game_Screen[_0x1f0508(0x198)]['getPictureTextBuffer']=function(_0x39f32b){const _0x58c9e9=_0x1f0508;if(this[_0x58c9e9(0x114)]===undefined)this[_0x58c9e9(0xf8)]();const _0x2913ba=this['realPictureId'](_0x39f32b);return this[_0x58c9e9(0x249)][_0x2913ba]||0x0;},Game_Screen['prototype'][_0x1f0508(0x19a)]=function(_0x105275,_0x4e5483){const _0x5065f9=_0x1f0508;if(this[_0x5065f9(0x114)]===undefined)this[_0x5065f9(0xf8)]();const _0xe69537=this[_0x5065f9(0x39f)](_0x105275);this[_0x5065f9(0x249)][_0xe69537]=Math[_0x5065f9(0x19b)](0x0,_0x4e5483);},Game_Screen[_0x1f0508(0x198)][_0x1f0508(0x1c1)]=function(_0x1a4671){const _0x2657b3=_0x1f0508;if(this['_pictureText']===undefined)this['clearAllPictureTexts']();const _0x53de5f=this['realPictureId'](_0x1a4671);this[_0x2657b3(0x249)][_0x53de5f]=undefined;},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x10d)]=Game_Screen[_0x1f0508(0x198)][_0x1f0508(0x1a4)],Game_Screen[_0x1f0508(0x198)][_0x1f0508(0x1a4)]=function(_0x26cfd5){const _0x496b28=_0x1f0508;VisuMZ[_0x496b28(0x226)][_0x496b28(0x10d)]['call'](this,_0x26cfd5),this[_0x496b28(0x303)](_0x26cfd5),this[_0x496b28(0x1c1)](_0x26cfd5);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x14b)]=Game_Party[_0x1f0508(0x198)][_0x1f0508(0x14f)],Game_Party[_0x1f0508(0x198)]['initialize']=function(){const _0x17b5b3=_0x1f0508;VisuMZ['MessageCore']['Game_Party_initialize']['call'](this),this[_0x17b5b3(0x325)]();},Game_Party[_0x1f0508(0x198)][_0x1f0508(0x325)]=function(){const _0x4095fc=_0x1f0508;this[_0x4095fc(0x38c)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party['prototype'][_0x1f0508(0x1f0)]=function(){const _0x352740=_0x1f0508;if(this[_0x352740(0x38c)]===undefined)this[_0x352740(0x325)]();return this[_0x352740(0x38c)];},Game_Party['prototype'][_0x1f0508(0x2d8)]=function(_0x42fbe9,_0x11131b){const _0x2594a9=_0x1f0508;if(this['_lastGainedItemData']===undefined)this['initMessageCore']();if(!_0x42fbe9)return;if(DataManager['isItem'](_0x42fbe9))_0x2594a9(0x3a2)!==_0x2594a9(0x3a2)?this[_0x2594a9(0x3cb)]=_0x1d2906[_0x2594a9(0x101)]()['follower'](_0x381e5a-0x2):this['_lastGainedItemData']['type']=0x0;else{if(DataManager[_0x2594a9(0x343)](_0x42fbe9))this[_0x2594a9(0x38c)][_0x2594a9(0x21f)]=0x1;else DataManager[_0x2594a9(0x2d6)](_0x42fbe9)&&('uuqRh'!==_0x2594a9(0x3a8)?(_0x288bf1['x']=this[_0x2594a9(0x39d)](_0xe80938),_0x30c615['MessageCore'][_0x2594a9(0x311)][_0x2594a9(0x13d)][_0x2594a9(0x231)]&&(_0x1575fe['x']+=_0x18d976[_0x2594a9(0x14a)])):this[_0x2594a9(0x38c)]['type']=0x2);}this[_0x2594a9(0x38c)]['id']=_0x42fbe9['id'],this[_0x2594a9(0x38c)][_0x2594a9(0x133)]=_0x11131b;},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x227)]=Game_Party[_0x1f0508(0x198)][_0x1f0508(0x2e0)],Game_Party[_0x1f0508(0x198)][_0x1f0508(0x2e0)]=function(_0x1bd1ce,_0x524aed,_0xd68164){const _0x39b11d=_0x1f0508;VisuMZ[_0x39b11d(0x226)][_0x39b11d(0x227)][_0x39b11d(0x176)](this,_0x1bd1ce,_0x524aed,_0xd68164),_0x524aed>0x0&&this[_0x39b11d(0x2d8)](_0x1bd1ce,_0x524aed);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x1a0)]=Game_Map['prototype'][_0x1f0508(0x14f)],Game_Map[_0x1f0508(0x198)]['initialize']=function(){const _0x5413c2=_0x1f0508;VisuMZ[_0x5413c2(0x226)][_0x5413c2(0x1a0)][_0x5413c2(0x176)](this),this['_messageCommonEvents']=[];},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x1f4)]=Game_Map[_0x1f0508(0x198)]['setupEvents'],Game_Map[_0x1f0508(0x198)][_0x1f0508(0x322)]=function(){const _0x28e61c=_0x1f0508;VisuMZ[_0x28e61c(0x226)][_0x28e61c(0x1f4)][_0x28e61c(0x176)](this),this[_0x28e61c(0x395)]=[];},VisuMZ[_0x1f0508(0x226)]['Game_Map_updateEvents']=Game_Map['prototype'][_0x1f0508(0x3af)],Game_Map['prototype'][_0x1f0508(0x3af)]=function(){const _0x324847=_0x1f0508;VisuMZ['MessageCore'][_0x324847(0x23b)][_0x324847(0x176)](this),this['updateMessageCommonEvents']();},Game_Map[_0x1f0508(0x198)][_0x1f0508(0x244)]=function(_0x1a1c87){const _0x50e7c6=_0x1f0508;if(!$dataCommonEvents[_0x1a1c87])return;this[_0x50e7c6(0x395)]=this[_0x50e7c6(0x395)]||[];const _0x4766ee=this[_0x50e7c6(0x3bd)]['_eventId'],_0xcc5692=new Game_MessageCommonEvent(_0x1a1c87,_0x4766ee);this['_messageCommonEvents']['push'](_0xcc5692);},Game_Map[_0x1f0508(0x198)][_0x1f0508(0x374)]=function(){const _0x91f12c=_0x1f0508;this[_0x91f12c(0x395)]=this[_0x91f12c(0x395)]||[];for(const _0x452598 of this[_0x91f12c(0x395)]){if(!_0x452598[_0x91f12c(0x3bd)]){if(_0x91f12c(0x35f)!==_0x91f12c(0x35f)){if(_0x3a5c5a[_0x91f12c(0x2ad)](_0x540aec))return![];}else this[_0x91f12c(0x395)][_0x91f12c(0x130)](_0x452598);}else _0x452598[_0x91f12c(0x145)]();}},Game_Interpreter[_0x1f0508(0x198)]['command101']=function(_0x53f904){const _0x2ba308=_0x1f0508;if($gameMessage['isBusy']())return![];return this[_0x2ba308(0x21e)](_0x53f904),this['addContinuousShowTextCommands'](_0x53f904),this[_0x2ba308(0x1da)](_0x53f904),this['setWaitMode'](_0x2ba308(0x1de)),!![];},Game_Interpreter[_0x1f0508(0x198)][_0x1f0508(0x21e)]=function(_0xa88719){const _0x32ac3f=_0x1f0508;$gameMessage[_0x32ac3f(0x128)](_0xa88719[0x0],_0xa88719[0x1]),$gameMessage[_0x32ac3f(0x3c0)](_0xa88719[0x2]),$gameMessage['setPositionType'](_0xa88719[0x3]),$gameMessage['setSpeakerName'](_0xa88719[0x4]);},Game_Interpreter[_0x1f0508(0x198)][_0x1f0508(0x15e)]=function(_0x1eee8c){const _0x7e9c24=_0x1f0508;while(this['isContinuePrepareShowTextCommands']()){if(_0x7e9c24(0x342)===_0x7e9c24(0x181))_0x13a99c=_0x126ad6['floor']((this[_0x7e9c24(0x1d0)]-_0x107667[_0x7e9c24(0x1d0)])/0x2);else{this['_index']++;if(this['currentCommand']()[_0x7e9c24(0x211)]===0x191){let _0x5939cc=this['currentCommand']()[_0x7e9c24(0x30f)][0x0];_0x5939cc=VisuMZ[_0x7e9c24(0x226)]['ParseAddedText'](_0x5939cc),$gameMessage['add'](_0x5939cc);}if(this['isBreakShowTextCommands']()){if(_0x7e9c24(0x335)===_0x7e9c24(0x12a))this[_0x7e9c24(0x392)]=_0x4c9c51(_0x4c41a5[_0x7e9c24(0x392)])[_0x7e9c24(0x218)](0x1,0xb);else break;}}}},Game_Interpreter['prototype'][_0x1f0508(0x1e1)]=function(){const _0x1f7a29=_0x1f0508;if(this[_0x1f7a29(0x121)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4){if('jGXrw'!=='jGXrw')this['launchMessageCommonEvent'](_0x120530);else return!![];}else return this[_0x1f7a29(0x121)]()===0x191;},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x29d)]=function(_0x2069ec){const _0x29027f=_0x1f0508;return _0x2069ec=_0x2069ec[_0x29027f(0x3c8)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x2069ec;},Game_Interpreter['prototype'][_0x1f0508(0x19e)]=function(){const _0x321122=_0x1f0508;if(this[_0x321122(0x384)]()&&this[_0x321122(0x384)]()[_0x321122(0x30f)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x321122(0x1af)][_0x321122(0x2a7)]>=$gameSystem['getMessageWindowRows']()&&this[_0x321122(0x121)]()!==0x191;},Game_Interpreter[_0x1f0508(0x198)][_0x1f0508(0x1da)]=function(_0x543845){const _0x1c6014=_0x1f0508;switch(this[_0x1c6014(0x121)]()){case 0x66:this[_0x1c6014(0x38d)]++,this[_0x1c6014(0x317)](this[_0x1c6014(0x384)]()[_0x1c6014(0x30f)]);break;case 0x67:this[_0x1c6014(0x38d)]++,this['setupNumInput'](this[_0x1c6014(0x384)]()[_0x1c6014(0x30f)]);break;case 0x68:this[_0x1c6014(0x38d)]++,this[_0x1c6014(0x2ca)](this[_0x1c6014(0x384)]()[_0x1c6014(0x30f)]);break;}},VisuMZ[_0x1f0508(0x226)]['Game_Interpreter_setupChoices']=Game_Interpreter[_0x1f0508(0x198)][_0x1f0508(0x317)],Game_Interpreter['prototype'][_0x1f0508(0x317)]=function(_0x5179c0){const _0x3356cf=_0x1f0508;_0x5179c0=this[_0x3356cf(0x100)](),VisuMZ[_0x3356cf(0x226)][_0x3356cf(0x3b5)][_0x3356cf(0x176)](this,_0x5179c0);},Game_Interpreter[_0x1f0508(0x198)][_0x1f0508(0x100)]=function(){const _0x463704=_0x1f0508,_0x17e8ea=this[_0x463704(0x38d)],_0x32d2e3=[];let _0x4fcc70=0x0;this['_index']++;while(this['_index']<this[_0x463704(0x36a)][_0x463704(0x2a7)]){if(this[_0x463704(0x384)]()[_0x463704(0x388)]===this[_0x463704(0x289)]){if(this[_0x463704(0x384)]()[_0x463704(0x211)]===0x194&&this['nextEventCode']()!==0x66){if('LVStm'===_0x463704(0x1e7))_0x19b0fc=_0x73a7e2[_0x463704(0x37d)]();else break;}else{if(this[_0x463704(0x384)]()[_0x463704(0x211)]===0x66)_0x463704(0x146)==='jsufC'?(_0x2c7b71[_0x463704(0x226)][_0x463704(0x174)]['call'](this),this[_0x463704(0x108)]()):(this[_0x463704(0x290)](_0x4fcc70,this[_0x463704(0x384)](),_0x17e8ea),this['_index']-=0x2);else this[_0x463704(0x384)]()[_0x463704(0x211)]===0x192&&(this[_0x463704(0x384)]()[_0x463704(0x30f)][0x0]=_0x4fcc70,_0x4fcc70++);}}this[_0x463704(0x38d)]++;}return this['_index']=_0x17e8ea,this[_0x463704(0x384)]()['parameters'];},Game_Interpreter[_0x1f0508(0x198)]['adjustShowChoiceExtension']=function(_0x21b411,_0x3552e7,_0x101ffc){const _0x599f08=_0x1f0508;this[_0x599f08(0x1b3)](_0x21b411,_0x3552e7,_0x101ffc),this[_0x599f08(0x38a)](_0x21b411,_0x3552e7,_0x101ffc),this['addExtraShowChoices'](_0x3552e7,_0x101ffc);},Game_Interpreter[_0x1f0508(0x198)]['adjustShowChoiceDefault']=function(_0x4be1fc,_0x3828ea,_0x5867c7){const _0x344aa9=_0x1f0508;if(_0x3828ea[_0x344aa9(0x30f)][0x2]<0x0)return;const _0x1639b1=_0x3828ea[_0x344aa9(0x30f)][0x2]+_0x4be1fc;this[_0x344aa9(0x36a)][_0x5867c7][_0x344aa9(0x30f)][0x2]=_0x1639b1;},Game_Interpreter['prototype'][_0x1f0508(0x38a)]=function(_0x14d97,_0x3b5201,_0x3646d7){const _0x114826=_0x1f0508;if(_0x3b5201[_0x114826(0x30f)][0x1]>=0x0){if(_0x114826(0x25c)!=='ppeeu'){var _0x560309=_0x3b5201[_0x114826(0x30f)][0x1]+_0x14d97;this['_list'][_0x3646d7][_0x114826(0x30f)][0x1]=_0x560309;}else{if(this[_0x114826(0x106)]===_0x38b2b0)this['initMessageCore']();if(this['_MessageCoreSettings']['messageWidth']===_0x490914)this[_0x114826(0x325)]();return this['_MessageCoreSettings'][_0x114826(0x278)];}}else _0x3b5201[_0x114826(0x30f)][0x1]===-0x2&&(this[_0x114826(0x36a)][_0x3646d7]['parameters'][0x1]=_0x3b5201['parameters'][0x1]);},Game_Interpreter[_0x1f0508(0x198)][_0x1f0508(0x2b2)]=function(_0x36a386,_0x23cff0){const _0x369123=_0x1f0508;for(const _0x281f1f of _0x36a386[_0x369123(0x30f)][0x0]){this[_0x369123(0x36a)][_0x23cff0][_0x369123(0x30f)][0x0][_0x369123(0x156)](_0x281f1f);}this[_0x369123(0x36a)][_0x369123(0x170)](this[_0x369123(0x38d)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x6dd1f8=_0x1f0508;this[_0x6dd1f8(0x14f)](...arguments);}Game_MessageCommonEvent[_0x1f0508(0x198)][_0x1f0508(0x14f)]=function(_0x185bc2,_0x2ecc19){const _0x58da75=_0x1f0508;this[_0x58da75(0x28e)]=_0x185bc2,this[_0x58da75(0x352)]=_0x2ecc19||0x0,this[_0x58da75(0x2da)]();},Game_MessageCommonEvent[_0x1f0508(0x198)][_0x1f0508(0x2ee)]=function(){const _0x184153=_0x1f0508;return $dataCommonEvents[this[_0x184153(0x28e)]];},Game_MessageCommonEvent[_0x1f0508(0x198)][_0x1f0508(0x382)]=function(){const _0x25590d=_0x1f0508;return this[_0x25590d(0x2ee)]()['list'];},Game_MessageCommonEvent[_0x1f0508(0x198)][_0x1f0508(0x2da)]=function(){const _0x4008b1=_0x1f0508;this[_0x4008b1(0x3bd)]=new Game_Interpreter(),this['_interpreter'][_0x4008b1(0x195)](this[_0x4008b1(0x382)](),this[_0x4008b1(0x352)]);},Game_MessageCommonEvent[_0x1f0508(0x198)][_0x1f0508(0x145)]=function(){const _0x3e35a2=_0x1f0508;if(this['_interpreter']){if(_0x3e35a2(0x178)!==_0x3e35a2(0x297)){if(this[_0x3e35a2(0x3bd)][_0x3e35a2(0x387)]())_0x3e35a2(0xfe)===_0x3e35a2(0x2cc)?this[_0x3e35a2(0x3bd)]=null:this[_0x3e35a2(0x3bd)][_0x3e35a2(0x145)]();else{if(_0x3e35a2(0x38f)!==_0x3e35a2(0x2a1))this[_0x3e35a2(0x160)]();else return _0x43b3a4[_0x3e35a2(0x198)][_0x3e35a2(0x154)][_0x3e35a2(0x176)](this,_0x2c439e);}}else{if(!this[_0x3e35a2(0x3cb)])return;const _0x2d99af=_0xb1816[_0x3e35a2(0x25b)];if(!_0x2d99af)return;if(!_0x2d99af[_0x3e35a2(0x214)])return;const _0x1f7aff=_0x2d99af[_0x3e35a2(0x214)][_0x3e35a2(0x2f8)](this[_0x3e35a2(0x3cb)]);if(!_0x1f7aff)return;let _0x254ba1=_0x1f7aff['x'];_0x254ba1-=this[_0x3e35a2(0x1d0)]/0x2,_0x254ba1-=(_0x432854[_0x3e35a2(0x1d0)]-_0x412083[_0x3e35a2(0x286)])/0x2,_0x254ba1+=this[_0x3e35a2(0x29b)]();let _0x755064=_0x1f7aff['y'];_0x755064-=this[_0x3e35a2(0x36b)],_0x755064-=(_0x1fbf84[_0x3e35a2(0x36b)]-_0x2ed45a[_0x3e35a2(0x3a4)])/0x2,_0x755064+=this[_0x3e35a2(0x1c3)](),_0x755064-=_0x1f7aff[_0x3e35a2(0x36b)]+0x8;const _0x453b31=_0xec0e3f[_0x3e35a2(0x1e3)]();_0x254ba1+=_0x453b31['x'],_0x755064+=_0x453b31['y'],this['x']=_0x235e6d['round'](_0x254ba1),this['y']=_0x1610ae[_0x3e35a2(0x365)](_0x755064),this[_0x3e35a2(0x321)](!![],![]),this[_0x3e35a2(0x238)]=this[_0x3e35a2(0x238)]||{},this['_forcedPosition']['x']=this['x'],this[_0x3e35a2(0x238)]['y']=this['y'],this[_0x3e35a2(0x238)][_0x3e35a2(0x1d0)]=this[_0x3e35a2(0x1d0)],this[_0x3e35a2(0x238)][_0x3e35a2(0x36b)]=this[_0x3e35a2(0x36b)],this['_nameBoxWindow'][_0x3e35a2(0x306)]();}}},Game_MessageCommonEvent[_0x1f0508(0x198)]['clear']=function(){const _0x23cb89=_0x1f0508;this[_0x23cb89(0x3bd)]=null;},Scene_Message['prototype'][_0x1f0508(0x2f7)]=function(){const _0x310b3c=_0x1f0508,_0x537d87=Math[_0x310b3c(0x30e)](Graphics[_0x310b3c(0x1d0)],$gameSystem['getMessageWindowWidth']()),_0x244149=$gameSystem[_0x310b3c(0x33a)](),_0xa9a042=this[_0x310b3c(0x2ba)](_0x244149,![]),_0x2c1606=(Graphics[_0x310b3c(0x286)]-_0x537d87)/0x2,_0x5aadab=0x0;return new Rectangle(_0x2c1606,_0x5aadab,_0x537d87,_0xa9a042);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x307)]=Scene_Options[_0x1f0508(0x198)][_0x1f0508(0x319)],Scene_Options[_0x1f0508(0x198)][_0x1f0508(0x319)]=function(){const _0x3b0dc4=_0x1f0508;let _0x1387c7=VisuMZ[_0x3b0dc4(0x226)][_0x3b0dc4(0x307)][_0x3b0dc4(0x176)](this);const _0x486ba4=VisuMZ[_0x3b0dc4(0x226)]['Settings'];if(_0x486ba4['TextSpeed'][_0x3b0dc4(0x1d9)]&&_0x486ba4[_0x3b0dc4(0x175)][_0x3b0dc4(0x24b)])_0x1387c7++;return _0x1387c7;},VisuMZ['MessageCore'][_0x1f0508(0x174)]=Sprite_Picture[_0x1f0508(0x198)][_0x1f0508(0x298)],Sprite_Picture[_0x1f0508(0x198)]['updateBitmap']=function(){const _0x9d3193=_0x1f0508;VisuMZ[_0x9d3193(0x226)][_0x9d3193(0x174)][_0x9d3193(0x176)](this),this[_0x9d3193(0x108)]();},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x3a0)]=Sprite_Picture[_0x1f0508(0x198)][_0x1f0508(0x145)],Sprite_Picture[_0x1f0508(0x198)][_0x1f0508(0x145)]=function(){const _0x1dfd44=_0x1f0508;VisuMZ['MessageCore'][_0x1dfd44(0x3a0)][_0x1dfd44(0x176)](this),this['updatePictureText']();},Sprite_Picture[_0x1f0508(0x198)]['updatePictureText']=function(){const _0x72a4dd=_0x1f0508;if(!this[_0x72a4dd(0x16b)])return;this[_0x72a4dd(0x2b9)](),this['anchorPictureText'](),this[_0x72a4dd(0x1bf)](),this[_0x72a4dd(0x23f)]();},Sprite_Picture['prototype'][_0x1f0508(0x108)]=function(){const _0x4ba788=_0x1f0508;if(this[_0x4ba788(0x119)])return;if(this[_0x4ba788(0x1cc)])return;const _0x185c0f=new Rectangle(0x0,0x0,0x0,0x0);this[_0x4ba788(0x119)]=new Window_Base(_0x185c0f),this[_0x4ba788(0x119)][_0x4ba788(0x220)]=0x0,this[_0x4ba788(0x1cc)]=new Sprite(),this[_0x4ba788(0x1eb)](this['_pictureTextSprite'],0x0),this[_0x4ba788(0x120)]=0x0,this['_pictureTextHeight']=0x0,this[_0x4ba788(0x292)]={};},Sprite_Picture[_0x1f0508(0x198)]['resizePictureText']=function(){const _0x56ba8a=_0x1f0508;if(!this['_pictureTextWindow'])return;if(this['_pictureTextWidth']===this[_0x56ba8a(0x1d0)]&&this[_0x56ba8a(0x10f)]===this[_0x56ba8a(0x36b)])return;this[_0x56ba8a(0x120)]=this['width'],this[_0x56ba8a(0x10f)]=this[_0x56ba8a(0x36b)],this[_0x56ba8a(0x292)]={},this[_0x56ba8a(0x119)]['move'](0x0,0x0,this['width'],this['height']);},Sprite_Picture[_0x1f0508(0x198)]['anchorPictureText']=function(){const _0x441cff=_0x1f0508;if(!this[_0x441cff(0x1cc)])return;this[_0x441cff(0x1cc)][_0x441cff(0x134)]['x']=this[_0x441cff(0x134)]['x'],this['_pictureTextSprite'][_0x441cff(0x134)]['y']=this[_0x441cff(0x134)]['y'];},Sprite_Picture[_0x1f0508(0x198)][_0x1f0508(0x1bf)]=function(){const _0x41ae09=_0x1f0508;if(!this[_0x41ae09(0x119)])return;if(!this[_0x41ae09(0x29c)]())return;const _0x11c0b9=[_0x41ae09(0x2dc),'up',_0x41ae09(0x36e),_0x41ae09(0x20a),_0x41ae09(0x17f),_0x41ae09(0x2c6),_0x41ae09(0x37b),'down','lowerright'];this[_0x41ae09(0x119)][_0x41ae09(0x2a9)]();for(const _0x57b054 of _0x11c0b9){if(_0x41ae09(0x371)===_0x41ae09(0x105)){if(this['_MessageCoreSettings']===_0xea7e93)this[_0x41ae09(0x325)]();if(this[_0x41ae09(0x106)][_0x41ae09(0x308)]===_0x1eca79)this['initMessageCore']();this[_0x41ae09(0x106)][_0x41ae09(0x308)]=_0x36a1ba||0x1;}else this[_0x41ae09(0x1f5)](_0x57b054);}},Sprite_Picture[_0x1f0508(0x198)]['anyPictureTextChanges']=function(){const _0xee8d0a=_0x1f0508,_0x36fc4b=[_0xee8d0a(0x2dc),'up','upperright',_0xee8d0a(0x20a),_0xee8d0a(0x17f),_0xee8d0a(0x2c6),_0xee8d0a(0x37b),_0xee8d0a(0x182),'lowerright'];for(const _0x2d3e15 of _0x36fc4b){if(_0xee8d0a(0x151)===_0xee8d0a(0x151)){const _0x3a486b=$gameScreen[_0xee8d0a(0x22d)](this[_0xee8d0a(0x2dd)],_0x2d3e15);if(this['_pictureTextCache'][_0x2d3e15]===_0x3a486b)continue;return!![];}else _0x2f7ff3=_0x369d46[_0xee8d0a(0x19b)](_0x287d2f,_0x41535b(_0x2d041f['$1']));}return![];},Sprite_Picture['prototype'][_0x1f0508(0x1f5)]=function(_0x1b8191){const _0x16a205=_0x1f0508,_0x249e94=$gameScreen[_0x16a205(0x22d)](this[_0x16a205(0x2dd)],_0x1b8191);this[_0x16a205(0x292)][_0x1b8191]=_0x249e94;const _0x5db167=this['_pictureTextWindow'][_0x16a205(0x39e)](_0x249e94);let _0x4ebb34=$gameScreen['getPictureTextBuffer'](this[_0x16a205(0x2dd)]),_0x20ec67=_0x4ebb34,_0x4f47fd=_0x4ebb34;if(['up',_0x16a205(0x17f),_0x16a205(0x182)]['includes'](_0x1b8191)){if(_0x16a205(0x2a2)!==_0x16a205(0x2a2)){if(this[_0x16a205(0x106)]===_0x5ab9db)this[_0x16a205(0x325)]();if(this[_0x16a205(0x106)][_0x16a205(0x162)]===_0x44b9b8)this[_0x16a205(0x325)]();return this[_0x16a205(0x106)][_0x16a205(0x162)];}else _0x20ec67=Math[_0x16a205(0x11a)]((this[_0x16a205(0x1d0)]-_0x5db167[_0x16a205(0x1d0)])/0x2);}else[_0x16a205(0x36e),_0x16a205(0x2c6),_0x16a205(0x207)][_0x16a205(0x1ef)](_0x1b8191)&&(_0x20ec67=Math[_0x16a205(0x11a)](this['width']-_0x5db167[_0x16a205(0x1d0)]-_0x4ebb34));if([_0x16a205(0x20a),_0x16a205(0x17f),_0x16a205(0x2c6)][_0x16a205(0x1ef)](_0x1b8191))_0x4f47fd=Math[_0x16a205(0x11a)]((this[_0x16a205(0x36b)]-_0x5db167[_0x16a205(0x36b)])/0x2);else[_0x16a205(0x37b),_0x16a205(0x182),_0x16a205(0x207)]['includes'](_0x1b8191)&&(_0x4f47fd=Math[_0x16a205(0x11a)](this['height']-_0x5db167[_0x16a205(0x36b)]-_0x4ebb34));this[_0x16a205(0x119)][_0x16a205(0x302)](_0x249e94,_0x20ec67,_0x4f47fd);},Sprite_Picture[_0x1f0508(0x198)]['attachPictureText']=function(){const _0x32cafb=_0x1f0508;if(!this[_0x32cafb(0x119)])return;if(!this[_0x32cafb(0x1cc)])return;this[_0x32cafb(0x1cc)]['bitmap']=this[_0x32cafb(0x119)][_0x32cafb(0x2e8)];},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x2db)]=Window_Base[_0x1f0508(0x198)]['initialize'],Window_Base[_0x1f0508(0x198)]['initialize']=function(_0x40559b){const _0x39a29b=_0x1f0508;this[_0x39a29b(0x325)](_0x40559b),VisuMZ[_0x39a29b(0x226)]['Window_Base_initialize'][_0x39a29b(0x176)](this,_0x40559b);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x325)]=function(_0x585057){const _0x5d6372=_0x1f0508;this[_0x5d6372(0x203)](),this[_0x5d6372(0x394)](),this[_0x5d6372(0x39a)](_0x585057);},Window_Base[_0x1f0508(0x198)]['initTextAlignement']=function(){this['setTextAlignment']('default');},Window_Base[_0x1f0508(0x198)]['setTextAlignment']=function(_0x1fbf04){this['_textAlignment']=_0x1fbf04;},Window_Base[_0x1f0508(0x198)]['getTextAlignment']=function(){const _0x146a03=_0x1f0508;return this[_0x146a03(0x3c4)];},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x19d)]=Window_Base[_0x1f0508(0x198)]['textSizeEx'],Window_Base[_0x1f0508(0x198)][_0x1f0508(0x39e)]=function(_0x265b0f){const _0x50cc34=_0x1f0508;return this[_0x50cc34(0x394)](),VisuMZ[_0x50cc34(0x226)][_0x50cc34(0x19d)][_0x50cc34(0x176)](this,_0x265b0f);},VisuMZ['MessageCore'][_0x1f0508(0x2ed)]=Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3d5)],Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3d5)]=function(_0x5a0038){const _0x306fc2=_0x1f0508;VisuMZ['MessageCore'][_0x306fc2(0x2ed)]['call'](this,_0x5a0038);if(_0x5a0038[_0x306fc2(0x18f)])this[_0x306fc2(0x17d)](_0x306fc2(0x2d0));},Window_Base['prototype'][_0x1f0508(0x394)]=function(){this['setWordWrap'](![]);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x217)]=function(){const _0x44edf0=_0x1f0508;return this[_0x44edf0(0x26e)];},Window_Base['prototype'][_0x1f0508(0x188)]=function(_0x5552b3){const _0x46b942=_0x1f0508;return this[_0x46b942(0x26e)]=_0x5552b3,'';},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x39a)]=function(_0xde5cf7){const _0x5d5a09=_0x1f0508;this[_0x5d5a09(0x2ea)]=JsonEx[_0x5d5a09(0x241)](_0xde5cf7);},Window_Base[_0x1f0508(0x198)]['resetFontSettings']=function(){const _0x4bb2fa=_0x1f0508;this[_0x4bb2fa(0x2e8)][_0x4bb2fa(0x219)]=$gameSystem[_0x4bb2fa(0x15d)](),this['contents'][_0x4bb2fa(0x22e)]=$gameSystem[_0x4bb2fa(0x258)](),this[_0x4bb2fa(0x2e8)]['fontBold']=![],this[_0x4bb2fa(0x2e8)]['fontItalic']=![],this[_0x4bb2fa(0x2cb)]();},Window_Base[_0x1f0508(0x198)]['resetTextColor']=function(){const _0x31cd73=_0x1f0508;this[_0x31cd73(0x340)](ColorManager[_0x31cd73(0x149)]()),this[_0x31cd73(0x255)](ColorManager[_0x31cd73(0x36d)]());const _0x21ee48=VisuMZ[_0x31cd73(0x226)][_0x31cd73(0x311)][_0x31cd73(0x13d)];_0x21ee48[_0x31cd73(0x25a)]===undefined&&(_0x21ee48[_0x31cd73(0x25a)]=0x3),this['contents'][_0x31cd73(0x3a9)]=_0x21ee48['DefaultOutlineWidth'],this[_0x31cd73(0x1c6)](![]);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x1c6)]=function(_0x2a84bf){const _0x46acd6=_0x1f0508;this[_0x46acd6(0x1d3)]=_0x2a84bf;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x179)]=function(){const _0x45fd6c=_0x1f0508;return this[_0x45fd6c(0x1d3)];},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x223)]=function(){return![];},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x126)]=function(){const _0x1d38ac=_0x1f0508,_0x52e409=[_0x1d38ac(0x219),_0x1d38ac(0x22e),_0x1d38ac(0x2b8),_0x1d38ac(0x37f),'textColor',_0x1d38ac(0x37e),_0x1d38ac(0x3a9),_0x1d38ac(0x204)];let _0x1fcc98={};for(const _0x4c81b5 of _0x52e409){_0x1fcc98[_0x4c81b5]=this[_0x1d38ac(0x2e8)][_0x4c81b5];}return _0x1fcc98;},Window_Base['prototype'][_0x1f0508(0x34e)]=function(_0x8ddb3d){const _0x2e8334=_0x1f0508;for(const _0x12571d in _0x8ddb3d){this[_0x2e8334(0x2e8)][_0x12571d]=_0x8ddb3d[_0x12571d];}},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x35d)]=Window_Base[_0x1f0508(0x198)][_0x1f0508(0x145)],Window_Base['prototype'][_0x1f0508(0x145)]=function(){const _0x5a7712=_0x1f0508;VisuMZ['MessageCore'][_0x5a7712(0x35d)][_0x5a7712(0x176)](this),this[_0x5a7712(0x295)]();},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x103)]=function(){return![];},Window_Base['prototype']['updateMove']=function(){const _0x4ec71a=_0x1f0508;this[_0x4ec71a(0x153)]>0x0&&(this[_0x4ec71a(0x103)]()&&(_0x4ec71a(0x210)!==_0x4ec71a(0x210)?_0xb5fde0=this[_0x4ec71a(0x2e8)][_0x4ec71a(0x22e)]:(this['x']=this[_0x4ec71a(0x294)](this['x'],this[_0x4ec71a(0xfb)]),this['y']=this[_0x4ec71a(0x294)](this['y'],this['_moveTargetY']),this[_0x4ec71a(0x1d0)]=this[_0x4ec71a(0x294)](this['width'],this['_moveTargetWidth']),this[_0x4ec71a(0x36b)]=this[_0x4ec71a(0x294)](this[_0x4ec71a(0x36b)],this[_0x4ec71a(0x245)]),this[_0x4ec71a(0x321)]())),this['_moveDuration']--);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x321)]=function(_0x354020,_0x26825d){const _0x2701e0=_0x1f0508;!_0x354020&&(this[_0x2701e0(0x1d0)]=Math[_0x2701e0(0x30e)](this[_0x2701e0(0x1d0)],Graphics[_0x2701e0(0x1d0)]),this[_0x2701e0(0x36b)]=Math[_0x2701e0(0x30e)](this[_0x2701e0(0x36b)],Graphics['height']));if(!_0x26825d){const _0x528ab2=-(Math[_0x2701e0(0x11a)](Graphics[_0x2701e0(0x1d0)]-Graphics[_0x2701e0(0x286)])/0x2),_0x41a6f9=_0x528ab2+Graphics[_0x2701e0(0x1d0)]-this[_0x2701e0(0x1d0)],_0x3b8494=-(Math[_0x2701e0(0x11a)](Graphics[_0x2701e0(0x36b)]-Graphics['boxHeight'])/0x2),_0x28ee6e=_0x3b8494+Graphics['height']-this[_0x2701e0(0x36b)];this['x']=this['x']['clamp'](_0x528ab2,_0x41a6f9),this['y']=this['y'][_0x2701e0(0x218)](_0x3b8494,_0x28ee6e);}},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x294)]=function(_0x165b91,_0x1b92aa){const _0x3301ca=_0x1f0508,_0x30189c=this['_moveDuration'],_0x555da6=this[_0x3301ca(0x254)],_0x1ec3ef=this['calcMoveEasing']((_0x555da6-_0x30189c)/_0x555da6),_0x6a7331=this[_0x3301ca(0x369)]((_0x555da6-_0x30189c+0x1)/_0x555da6),_0x3b3fe3=(_0x165b91-_0x1b92aa*_0x1ec3ef)/(0x1-_0x1ec3ef);return _0x3b3fe3+(_0x1b92aa-_0x3b3fe3)*_0x6a7331;},Window_Base['prototype'][_0x1f0508(0x369)]=function(_0x566c61){const _0x3ee77c=_0x1f0508,_0xb19623=0x2;switch(this[_0x3ee77c(0x2f0)]){case 0x0:return _0x566c61;case 0x1:return this[_0x3ee77c(0x31e)](_0x566c61,_0xb19623);case 0x2:return this[_0x3ee77c(0x152)](_0x566c61,_0xb19623);case 0x3:return this[_0x3ee77c(0x333)](_0x566c61,_0xb19623);default:if(Imported['VisuMZ_0_CoreEngine'])return VisuMZ[_0x3ee77c(0x294)](_0x566c61,this[_0x3ee77c(0x2f0)]);else{if(_0x3ee77c(0x2d7)===_0x3ee77c(0x338)){if(!_0xc37836[_0x3ee77c(0x2ad)](_0x2b1e72))return![];}else return _0x566c61;}}},Window_Base['prototype']['moveTo']=function(_0x4d4b0e,_0xa9966,_0x151c37,_0x23369d,_0x222a3b,_0x18d1d0){const _0x527de4=_0x1f0508;this['_moveTargetX']=_0x4d4b0e,this[_0x527de4(0x348)]=_0xa9966,this[_0x527de4(0x2af)]=_0x151c37||this['width'],this[_0x527de4(0x245)]=_0x23369d||this['height'],this[_0x527de4(0x153)]=_0x222a3b||0x1;if(this[_0x527de4(0x153)]<=0x0)this[_0x527de4(0x153)]=0x1;this[_0x527de4(0x254)]=this[_0x527de4(0x153)],this[_0x527de4(0x2f0)]=_0x18d1d0||0x0;if(_0x222a3b<=0x0)this['updateMove']();},Window_Base[_0x1f0508(0x198)]['moveBy']=function(_0x4a52a0,_0x1572a3,_0x6f9c2b,_0x3bc80d,_0x22df81,_0x5794d5){const _0x143e15=_0x1f0508;this[_0x143e15(0xfb)]=this['x']+_0x4a52a0,this['_moveTargetY']=this['y']+_0x1572a3,this[_0x143e15(0x2af)]=this[_0x143e15(0x1d0)]+(_0x6f9c2b||0x0),this[_0x143e15(0x245)]=this[_0x143e15(0x36b)]+(_0x3bc80d||0x0),this['_moveDuration']=_0x22df81||0x1;if(this[_0x143e15(0x153)]<=0x0)this['_moveDuration']=0x1;this[_0x143e15(0x254)]=this['_moveDuration'],this[_0x143e15(0x2f0)]=_0x5794d5||0x0;if(_0x22df81<=0x0)this[_0x143e15(0x295)]();},Window_Base['prototype'][_0x1f0508(0x33c)]=function(_0x1cf049,_0x27be79){const _0x4a426a=_0x1f0508;this[_0x4a426a(0x318)](this[_0x4a426a(0x2ea)]['x'],this[_0x4a426a(0x2ea)]['y'],this['_resetRect']['width'],this['_resetRect']['height'],_0x1cf049,_0x27be79);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x216)]=Window_Base['prototype'][_0x1f0508(0x340)],Window_Base[_0x1f0508(0x198)][_0x1f0508(0x340)]=function(_0x11340a){const _0x1decf0=_0x1f0508;if(this['isColorLocked']())return;_0x11340a=_0x11340a['replace'](/\,/g,''),this['_textColorStack']=this[_0x1decf0(0x27a)]||[],this['_textColorStack'][_0x1decf0(0x31b)](this[_0x1decf0(0x2e8)][_0x1decf0(0x3ba)]),VisuMZ[_0x1decf0(0x226)][_0x1decf0(0x216)][_0x1decf0(0x176)](this,_0x11340a);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x1a7)]=function(_0x1c4599){const _0x2b8e49=_0x1f0508;this[_0x2b8e49(0x39d)](_0x1c4599);if(this[_0x2b8e49(0x179)]())return;_0x1c4599[_0x2b8e49(0x18f)]&&(this['_textColorStack']=this['_textColorStack']||[],this[_0x2b8e49(0x2e8)][_0x2b8e49(0x3ba)]=this['_textColorStack']['shift']()||ColorManager[_0x2b8e49(0x149)]());},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x10a)]=function(_0x339d25){const _0x4925c3=_0x1f0508;return _0x339d25=this[_0x4925c3(0x2f6)](_0x339d25),_0x339d25=this[_0x4925c3(0x3c1)](_0x339d25),_0x339d25=this['convertVariableEscapeCharacters'](_0x339d25),_0x339d25=this[_0x4925c3(0x154)](_0x339d25),_0x339d25=this[_0x4925c3(0x1f3)](_0x339d25),_0x339d25=this[_0x4925c3(0x330)](_0x339d25),_0x339d25=this[_0x4925c3(0x12b)](_0x339d25),_0x339d25=this['convertLockColorsEscapeCharacters'](_0x339d25),_0x339d25=this[_0x4925c3(0x21a)](_0x339d25),_0x339d25=this['convertHardcodedEscapeReplacements'](_0x339d25),_0x339d25=this['convertMessageCoreEscapeActions'](_0x339d25),_0x339d25=this['convertMessageCoreEscapeReplacements'](_0x339d25),_0x339d25=this[_0x4925c3(0x28c)](_0x339d25),_0x339d25=this[_0x4925c3(0x341)](_0x339d25),_0x339d25=this[_0x4925c3(0x1d2)](_0x339d25),_0x339d25=this['prepareWordWrapEscapeCharacters'](_0x339d25),_0x339d25;},Window_Base[_0x1f0508(0x198)]['convertTextMacros']=function(_0x13a03c){const _0x9919b2=_0x1f0508;this[_0x9919b2(0x1a1)]=![];for(const _0x41342e of VisuMZ[_0x9919b2(0x226)][_0x9919b2(0x311)][_0x9919b2(0x266)]){_0x9919b2(0x2fc)!=='qgmlv'?_0x13a03c[_0x9919b2(0x267)](_0x41342e['textCodeCheck'])&&(this[_0x9919b2(0x1a1)]=!![],_0x13a03c=_0x13a03c[_0x9919b2(0x3c8)](_0x41342e[_0x9919b2(0x13b)],_0x41342e['textCodeResult'][_0x9919b2(0x16e)](this))):_0x2107c0['x']-=_0x4fd947[_0x9919b2(0x14a)];}return _0x13a03c;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3c1)]=function(_0x42603d){const _0x57b296=_0x1f0508;return _0x42603d=_0x42603d[_0x57b296(0x3c8)](/\\/g,'\x1b'),_0x42603d=_0x42603d[_0x57b296(0x3c8)](/\x1b\x1b/g,'\x5c'),_0x42603d;},Window_Base[_0x1f0508(0x198)]['convertVariableEscapeCharacters']=function(_0xc2bd74){const _0x41086d=_0x1f0508;for(;;){if(_0xc2bd74[_0x41086d(0x267)](/\\V\[(\d+)\]/gi)){if('vSOWS'===_0x41086d(0x242))_0xc2bd74=_0xc2bd74[_0x41086d(0x3c8)](/\\V\[(\d+)\]/gi,(_0x21f1ac,_0x5bc539)=>this[_0x41086d(0x3c1)](String($gameVariables[_0x41086d(0x2ad)](parseInt(_0x5bc539)))));else return this[_0x41086d(0x18c)](_0x30f1c3,!![],!![]),this[_0x41086d(0x355)](_0x41086d(0x265),0x0),'';}else{if(_0xc2bd74[_0x41086d(0x267)](/\x1bV\[(\d+)\]/gi))_0xc2bd74=_0xc2bd74[_0x41086d(0x3c8)](/\x1bV\[(\d+)\]/gi,(_0x395cd8,_0x5831bc)=>this[_0x41086d(0x3c1)](String($gameVariables['value'](parseInt(_0x5831bc)))));else break;}}return _0xc2bd74;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x154)]=function(_0x5388e8){return this['registerActorNameAutoColorChanges'](),_0x5388e8;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x28c)]=function(_0x22b622){return _0x22b622;},Window_Base[_0x1f0508(0x198)]['convertShowChoiceEscapeCodes']=function(_0x2bf182){const _0x52ab6e=_0x1f0508;return _0x2bf182=_0x2bf182[_0x52ab6e(0x3c8)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x2bf182=_0x2bf182['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x2bf182=_0x2bf182['replace'](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x2bf182=_0x2bf182[_0x52ab6e(0x3c8)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x2bf182=_0x2bf182[_0x52ab6e(0x3c8)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x2bf182;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x330)]=function(_0xbfd001){const _0xc8d39f=_0x1f0508;return _0xbfd001=_0xbfd001['replace'](/<B>/gi,'\x1bBOLD[1]'),_0xbfd001=_0xbfd001[_0xc8d39f(0x3c8)](/<\/B>/gi,'\x1bBOLD[0]'),_0xbfd001=_0xbfd001[_0xc8d39f(0x3c8)](/<I>/gi,_0xc8d39f(0x272)),_0xbfd001=_0xbfd001[_0xc8d39f(0x3c8)](/<\/I>/gi,_0xc8d39f(0x2e2)),_0xbfd001;},Window_Base[_0x1f0508(0x198)]['convertTextAlignmentEscapeCharacters']=function(_0x1701a7){const _0x35c1f9=_0x1f0508;return _0x1701a7=_0x1701a7[_0x35c1f9(0x3c8)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x1701a7=_0x1701a7[_0x35c1f9(0x3c8)](/<\/LEFT>/gi,_0x35c1f9(0x1ae)),_0x1701a7=_0x1701a7['replace'](/<CENTER>/gi,_0x35c1f9(0x115)),_0x1701a7=_0x1701a7['replace'](/<\/CENTER>/gi,_0x35c1f9(0x1ae)),_0x1701a7=_0x1701a7[_0x35c1f9(0x3c8)](/<RIGHT>/gi,_0x35c1f9(0x2f4)),_0x1701a7=_0x1701a7[_0x35c1f9(0x3c8)](/<\/RIGHT>/gi,_0x35c1f9(0x1ae)),_0x1701a7;},Window_Base['prototype'][_0x1f0508(0x32a)]=function(_0x4a4145){const _0x544cca=_0x1f0508;return _0x4a4145=_0x4a4145[_0x544cca(0x3c8)](/<COLORLOCK>/gi,'\x1bCOLORLOCK[1]'),_0x4a4145=_0x4a4145[_0x544cca(0x3c8)](/<\/COLORLOCK>/gi,_0x544cca(0x38e)),_0x4a4145=_0x4a4145[_0x544cca(0x3c8)](/\(\(\(/gi,_0x544cca(0x104)),_0x4a4145=_0x4a4145['replace'](/\)\)\)/gi,'\x1bCOLORLOCK[0]'),_0x4a4145;},Window_Base['prototype'][_0x1f0508(0x21a)]=function(_0x4db6b0){const _0x560c36=_0x1f0508;return _0x4db6b0=_0x4db6b0[_0x560c36(0x3c8)](/\x1bN\[(\d+)\]/gi,(_0x341747,_0x2437bd)=>this[_0x560c36(0x26f)](parseInt(_0x2437bd))),_0x4db6b0=_0x4db6b0['replace'](/\x1bP\[(\d+)\]/gi,(_0x3840c9,_0x46e62e)=>this[_0x560c36(0x2f1)](parseInt(_0x46e62e))),_0x4db6b0=_0x4db6b0[_0x560c36(0x3c8)](/\x1bG/gi,TextManager['currencyUnit']),_0x4db6b0;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0xf6)]=function(_0xe6d651){const _0x1713e7=_0x1f0508;return _0xe6d651=_0xe6d651['replace'](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0xe6d651=_0xe6d651[_0x1713e7(0x3c8)](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this[_0x1713e7(0x187)]()),_0xe6d651=_0xe6d651[_0x1713e7(0x3c8)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x1713e7(0x20c)](!![])),_0xe6d651=_0xe6d651['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0x1713e7(0x20c)](![])),_0xe6d651;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x2cf)]=function(){const _0x34fcf5=_0x1f0508;if(!SceneManager[_0x34fcf5(0x1c9)]())return'';if(BattleManager[_0x34fcf5(0x2f2)])return BattleManager['_target']['name']();if(BattleManager[_0x34fcf5(0x3d2)][0x0])return BattleManager[_0x34fcf5(0x3d2)][0x0][_0x34fcf5(0x112)]();return'';},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x187)]=function(){const _0x416d5d=_0x1f0508;if(!SceneManager[_0x416d5d(0x1c9)]())return'';let _0x3812a5=null;return _0x3812a5=BattleManager[_0x416d5d(0x173)],!_0x3812a5&&BattleManager[_0x416d5d(0x378)]()&&(_0x3812a5=BattleManager['actor']()),_0x3812a5?_0x3812a5[_0x416d5d(0x112)]():'';},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x20c)]=function(_0x408419){const _0x3d536c=_0x1f0508;if(!SceneManager['isSceneBattle']())return'';let _0x2bd21c=BattleManager[_0x3d536c(0x2ec)]||null;!_0x2bd21c&&BattleManager[_0x3d536c(0x378)]()&&(_0x3d536c(0x1df)!=='bWLBa'?_0x495d03['x']+=_0x484964[_0x3d536c(0x14a)]:_0x2bd21c=BattleManager[_0x3d536c(0x14d)]());if(_0x2bd21c&&_0x2bd21c[_0x3d536c(0x2d9)]()){if(_0x3d536c(0x3d1)!==_0x3d536c(0x3d1)){_0x5c6f02[_0x3d536c(0x2c9)](_0x3775e3,_0x449ebe);const _0x1aedbd=_0x15f30f[_0x3d536c(0x129)]||_0x4c01e8[_0x3d536c(0x33a)]()||0x1,_0x3b3c6b=_0x47748f[_0x3d536c(0x386)]||_0x375b7c[_0x3d536c(0x25f)]()||0x1;_0x48821c[_0x3d536c(0x1f8)]=!![];const _0x2d4559=_0x59aa78[_0x3d536c(0x1a6)][_0x3d536c(0x199)]();_0x15188a[_0x3d536c(0x224)](_0x1aedbd),_0x241e92[_0x3d536c(0x260)](_0x3b3c6b);[_0x3d536c(0x168),'false'][_0x3d536c(0x1ef)](_0x2d4559)&&_0x1a4f80[_0x3d536c(0x232)](_0x3f9631(_0x2d4559));const _0xe26e6e=_0x20331b[_0x3d536c(0x25b)]['_messageWindow'];_0xe26e6e&&(_0xe26e6e[_0x3d536c(0x394)](),_0xe26e6e[_0x3d536c(0x24f)](),_0xe26e6e[_0x3d536c(0x2a9)]());}else{let _0x8e5018='';if(_0x408419)_0x8e5018+=_0x3d536c(0x142)['format'](_0x2bd21c['item']()[_0x3d536c(0x21d)]);return _0x8e5018+=_0x2bd21c[_0x3d536c(0x2d9)]()[_0x3d536c(0x112)],_0x8e5018;}}return'';},Window_Base[_0x1f0508(0x198)]['convertMessageCoreEscapeActions']=function(_0x392370){const _0x34490b=_0x1f0508;for(const _0x10bb22 of VisuMZ['MessageCore'][_0x34490b(0x311)][_0x34490b(0x190)]){_0x34490b(0x21b)==='Gifib'?(this['x']=this[_0x34490b(0x294)](this['x'],this[_0x34490b(0xfb)]),this['y']=this[_0x34490b(0x294)](this['y'],this[_0x34490b(0x348)]),this['width']=this[_0x34490b(0x294)](this[_0x34490b(0x1d0)],this['_moveTargetWidth']),this[_0x34490b(0x36b)]=this[_0x34490b(0x294)](this['height'],this[_0x34490b(0x245)]),this['clampPlacementPosition']()):_0x392370[_0x34490b(0x267)](_0x10bb22[_0x34490b(0x13b)])&&(_0x392370=_0x392370[_0x34490b(0x3c8)](_0x10bb22[_0x34490b(0x13b)],_0x10bb22[_0x34490b(0x34f)]),_0x392370=this[_0x34490b(0x341)](_0x392370));}return _0x392370;},Window_Base['prototype'][_0x1f0508(0x111)]=function(_0x13edc7){const _0x58519b=_0x1f0508;for(const _0x12ce25 of VisuMZ[_0x58519b(0x226)][_0x58519b(0x311)][_0x58519b(0x3c6)]){if(_0x58519b(0x17e)==='koQWi')return!![];else _0x13edc7[_0x58519b(0x267)](_0x12ce25['textCodeCheck'])&&(_0x13edc7=_0x13edc7[_0x58519b(0x3c8)](_0x12ce25['textCodeCheck'],_0x12ce25[_0x58519b(0x34f)][_0x58519b(0x16e)](this)),_0x13edc7=this['convertVariableEscapeCharacters'](_0x13edc7));}return _0x13edc7;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x26f)]=function(_0x300523){const _0x57f971=_0x1f0508,_0x56ccf8=_0x300523>=0x1?$gameActors[_0x57f971(0x37d)](_0x300523):null,_0x136f0f=_0x56ccf8?_0x56ccf8[_0x57f971(0x112)]():'',_0x21d66c=Number(VisuMZ[_0x57f971(0x226)][_0x57f971(0x311)][_0x57f971(0x257)]['Actors']);return this[_0x57f971(0x223)]()&&_0x21d66c!==0x0?_0x57f971(0x197)['format'](_0x21d66c,_0x136f0f):_0x136f0f;},Window_Base['prototype'][_0x1f0508(0x2f1)]=function(_0x406c95){const _0x4cd3ff=_0x1f0508,_0x4d7b01=_0x406c95>=0x1?$gameParty[_0x4cd3ff(0x3d3)]()[_0x406c95-0x1]:null,_0xcf8bdc=_0x4d7b01?_0x4d7b01[_0x4cd3ff(0x112)]():'',_0x21ff22=Number(VisuMZ[_0x4cd3ff(0x226)]['Settings'][_0x4cd3ff(0x257)][_0x4cd3ff(0x124)]);return this[_0x4cd3ff(0x223)]()&&_0x21ff22!==0x0?_0x4cd3ff(0x197)['format'](_0x21ff22,_0xcf8bdc):_0xcf8bdc;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x1d2)]=function(_0x53b230){const _0x202e29=_0x1f0508;return this[_0x202e29(0x223)]()&&(_0x53b230=this[_0x202e29(0x229)](_0x53b230),_0x53b230=this[_0x202e29(0x356)](_0x53b230)),_0x53b230;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x229)]=function(_0x4aa1c1){const _0x2ed35b=_0x1f0508;for(autoColor of VisuMZ[_0x2ed35b(0x226)][_0x2ed35b(0x1b1)]){if(_0x2ed35b(0x35a)!==_0x2ed35b(0x35a)){const _0x18f625=_0x153183(_0x98125d['$1']);_0x18f625!==_0x3a5da3[_0x39ac07][_0x2ed35b(0x15c)]&&(_0x510bb4('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2ed35b(0x293)](_0x5aec99,_0x18f625)),_0x3c0ca1['exit']());}else _0x4aa1c1=_0x4aa1c1['replace'](autoColor[0x0],autoColor[0x1]);}return _0x4aa1c1;},Window_Base[_0x1f0508(0x198)]['clearActorNameAutoColor']=function(){const _0x3517f9=_0x1f0508;this[_0x3517f9(0x26c)]=[];},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x344)]=function(){const _0x359ef9=_0x1f0508;this[_0x359ef9(0x3a7)]();const _0x4acdf3=VisuMZ['MessageCore']['Settings']['AutoColor'],_0x3d2cce=_0x4acdf3[_0x359ef9(0x124)];if(_0x3d2cce<=0x0)return;for(const _0x4c585b of $gameActors[_0x359ef9(0x29e)]){if(_0x359ef9(0x15b)===_0x359ef9(0x34d))_0x16db65[_0x359ef9(0x226)]['Game_Map_initialize'][_0x359ef9(0x176)](this),this[_0x359ef9(0x395)]=[];else{if(!_0x4c585b)continue;const _0x5d78cf=_0x4c585b[_0x359ef9(0x112)]();if(_0x5d78cf['trim']()['length']<=0x0)continue;if(/^\d+$/[_0x359ef9(0x349)](_0x5d78cf))continue;if(_0x5d78cf[_0x359ef9(0x267)](/-----/i))continue;let _0x18ca9b=VisuMZ['MessageCore'][_0x359ef9(0x159)](_0x5d78cf);const _0xca8c52=new RegExp('\x5cb'+_0x18ca9b+'\x5cb','g'),_0x41b03c=_0x359ef9(0x197)[_0x359ef9(0x293)](_0x3d2cce,_0x5d78cf);this[_0x359ef9(0x26c)]['push']([_0xca8c52,_0x41b03c]);}}},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x356)]=function(_0x1a38ac){const _0x1021c3=_0x1f0508;this[_0x1021c3(0x26c)]===undefined&&this['registerActorNameAutoColorChanges']();for(autoColor of this[_0x1021c3(0x26c)]){_0x1a38ac=_0x1a38ac[_0x1021c3(0x3c8)](autoColor[0x0],autoColor[0x1]);}return _0x1a38ac;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x213)]=function(_0x7be93c,_0x596f12,_0x3d8814){const _0xccb8fc=_0x1f0508;if(!_0x7be93c)return'';const _0x4ee93c=_0x7be93c[_0x596f12];let _0xa714f9='';if(_0x4ee93c&&_0x3d8814&&_0x4ee93c[_0xccb8fc(0x21d)]){const _0x5c874d=_0xccb8fc(0x273);_0xa714f9=_0x5c874d[_0xccb8fc(0x293)](_0x4ee93c[_0xccb8fc(0x21d)],_0x4ee93c[_0xccb8fc(0x112)]);}else _0x4ee93c?_0xa714f9=_0x4ee93c[_0xccb8fc(0x112)]:_0xccb8fc(0x3cf)!=='zRFSm'?(this[_0xccb8fc(0x27a)]=this[_0xccb8fc(0x27a)]||[],this[_0xccb8fc(0x2e8)][_0xccb8fc(0x3ba)]=this[_0xccb8fc(0x27a)][_0xccb8fc(0x28b)]()||_0x14c557[_0xccb8fc(0x149)]()):_0xa714f9='';return this[_0xccb8fc(0x223)]()&&(_0xa714f9=this[_0xccb8fc(0x2ae)](_0xa714f9,_0x7be93c)),_0xa714f9;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3d6)]=function(_0x54c2d7){const _0x35fb55=_0x1f0508,_0x15116e=$gameParty['getLastGainedItemData']();if(_0x15116e['id']<0x0)return'';let _0x8fb906=null;if(_0x15116e[_0x35fb55(0x21f)]===0x0)_0x8fb906=$dataItems[_0x15116e['id']];if(_0x15116e[_0x35fb55(0x21f)]===0x1)_0x8fb906=$dataWeapons[_0x15116e['id']];if(_0x15116e[_0x35fb55(0x21f)]===0x2)_0x8fb906=$dataArmors[_0x15116e['id']];if(!_0x8fb906)return'';return _0x54c2d7?_0x35fb55(0x273)[_0x35fb55(0x293)](_0x8fb906[_0x35fb55(0x21d)],_0x8fb906[_0x35fb55(0x112)]):_0x8fb906[_0x35fb55(0x112)];},Window_Base[_0x1f0508(0x198)]['lastGainedObjectQuantity']=function(){const _0x462d9b=_0x1f0508,_0xc52e3b=$gameParty[_0x462d9b(0x1f0)]();if(_0xc52e3b['id']<=0x0)return'';return _0xc52e3b[_0x462d9b(0x133)];},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x2ae)]=function(_0x32b621,_0x228462){const _0x163952=_0x1f0508,_0x45a080=VisuMZ[_0x163952(0x226)]['Settings'][_0x163952(0x257)];let _0x4b027f=0x0;if(_0x228462===$dataActors)_0x4b027f=_0x45a080[_0x163952(0x124)];if(_0x228462===$dataClasses)_0x4b027f=_0x45a080[_0x163952(0x21c)];if(_0x228462===$dataSkills)_0x4b027f=_0x45a080[_0x163952(0x1a2)];if(_0x228462===$dataItems)_0x4b027f=_0x45a080[_0x163952(0x193)];if(_0x228462===$dataWeapons)_0x4b027f=_0x45a080['Weapons'];if(_0x228462===$dataArmors)_0x4b027f=_0x45a080[_0x163952(0x2bf)];if(_0x228462===$dataEnemies)_0x4b027f=_0x45a080[_0x163952(0x2c8)];if(_0x228462===$dataStates)_0x4b027f=_0x45a080[_0x163952(0x1fd)];return _0x4b027f>0x0&&(_0x32b621='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x4b027f,_0x32b621)),_0x32b621;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x274)]=function(_0x2a7785){const _0x21a339=_0x1f0508;_0x2a7785=_0x2a7785[_0x21a339(0x3c8)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x10f9c4,_0x267017)=>this['setWordWrap'](!![])),_0x2a7785=_0x2a7785[_0x21a339(0x3c8)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x5b6074,_0x1f8b9a)=>this[_0x21a339(0x188)](![])),_0x2a7785=_0x2a7785[_0x21a339(0x3c8)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x363224,_0x5fb2ba)=>this[_0x21a339(0x188)](![]));if(_0x2a7785['match'](Window_Message[_0x21a339(0x37c)]))this[_0x21a339(0x188)](![]);else _0x2a7785[_0x21a339(0x267)](Window_Message['_autoPosRegExp'])&&this[_0x21a339(0x188)](![]);if(!this[_0x21a339(0x217)]())return _0x2a7785;if(_0x2a7785[_0x21a339(0x2a7)]<=0x0)return _0x2a7785;return VisuMZ[_0x21a339(0x226)][_0x21a339(0x311)][_0x21a339(0x1a6)][_0x21a339(0x313)]?(_0x2a7785=_0x2a7785[_0x21a339(0x3c8)](/[\n\r]+/g,'\x20'),_0x2a7785=_0x2a7785[_0x21a339(0x3c8)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x2a7785=_0x2a7785[_0x21a339(0x3c8)](/[\n\r]+/g,''),_0x2a7785=_0x2a7785[_0x21a339(0x3c8)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x2a7785=this[_0x21a339(0x256)](_0x2a7785),_0x2a7785=_0x2a7785[_0x21a339(0x3b0)]('\x20')[_0x21a339(0x202)](_0x21a339(0x125)),_0x2a7785=_0x2a7785['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x2a7785=_0x2a7785[_0x21a339(0x3c8)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x2a7785;},Window_Base['prototype'][_0x1f0508(0x256)]=function(_0x31c548){return _0x31c548;},VisuMZ[_0x1f0508(0x226)]['Window_Base_processNewLine']=Window_Base[_0x1f0508(0x198)]['processNewLine'],Window_Base[_0x1f0508(0x198)]['processNewLine']=function(_0x4cde8b){const _0x233c69=_0x1f0508;VisuMZ[_0x233c69(0x226)][_0x233c69(0x116)][_0x233c69(0x176)](this,_0x4cde8b),this['processTextAlignmentX'](_0x4cde8b);},VisuMZ['MessageCore'][_0x1f0508(0x300)]=Window_Base['prototype'][_0x1f0508(0x3ab)],Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3ab)]=function(_0x19a36b,_0x1733f1){const _0x239692=_0x1f0508;VisuMZ[_0x239692(0x226)][_0x239692(0x300)][_0x239692(0x176)](this,_0x19a36b,_0x1733f1),_0x1733f1===_0x239692(0x125)&&(_0x239692(0x2de)===_0x239692(0x34b)?(this[_0x239692(0x135)](_0x3b11d9),_0x5d6b75[_0x239692(0x198)][_0x239692(0x209)][_0x239692(0x176)](this,_0x4cd38e),this[_0x239692(0x1b5)](_0x347a6c)):this[_0x239692(0x3d0)](_0x19a36b));},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x2c3)]=function(_0x1cd570){const _0x204244=_0x1f0508;var _0x372f6f=/^\<(.*?)\>/[_0x204244(0x1fa)](_0x1cd570['text'][_0x204244(0x39b)](_0x1cd570[_0x204244(0x1b0)]));return _0x372f6f?(_0x1cd570[_0x204244(0x1b0)]+=_0x372f6f[0x0]['length'],String(_0x372f6f[0x0][_0x204244(0x39b)](0x1,_0x372f6f[0x0][_0x204244(0x2a7)]-0x1))):'';},VisuMZ[_0x1f0508(0x226)]['Window_Base_processEscapeCharacter']=Window_Base[_0x1f0508(0x198)]['processEscapeCharacter'],Window_Base[_0x1f0508(0x198)][_0x1f0508(0x376)]=function(_0x1c2183,_0x122395){const _0x414082=_0x1f0508;switch(_0x1c2183){case'C':_0x122395[_0x414082(0x18f)]?VisuMZ[_0x414082(0x226)][_0x414082(0x189)][_0x414082(0x176)](this,_0x1c2183,_0x122395):_0x414082(0x334)===_0x414082(0x334)?this[_0x414082(0x39d)](_0x122395):this[_0x414082(0x2e8)][_0x414082(0x22e)]=_0x2a3300(_0x1f419a[0x3])[_0x414082(0x218)](_0x5d08ab[_0x414082(0x226)][_0x414082(0x311)][_0x414082(0x13d)]['FontSmallerCap'],_0x46188c[_0x414082(0x226)][_0x414082(0x311)][_0x414082(0x13d)][_0x414082(0x2b7)]);break;case'I':case'{':case'}':VisuMZ[_0x414082(0x226)][_0x414082(0x189)][_0x414082(0x176)](this,_0x1c2183,_0x122395);break;case'FS':this['processFsTextCode'](_0x122395);break;case'PX':this[_0x414082(0x3aa)](_0x122395);break;case'PY':this[_0x414082(0x2e6)](_0x122395);break;case _0x414082(0x3b4):this[_0x414082(0x1ca)](this[_0x414082(0x39d)](_0x122395));break;case _0x414082(0x283):this['processDrawCenteredPicture'](_0x122395);break;case _0x414082(0x1cf):this['processColorLock'](_0x122395);break;case _0x414082(0x33f):this[_0x414082(0x196)](_0x122395);break;case _0x414082(0x12c):this[_0x414082(0x34a)](this[_0x414082(0x39d)](_0x122395));break;case'PICTURE':this[_0x414082(0x3bc)](_0x122395);break;case _0x414082(0x31d):this['processPreviousColor'](_0x122395);break;case'TEXTALIGNMENT':this[_0x414082(0x2ac)](_0x122395);break;case _0x414082(0x357):this[_0x414082(0x1ba)](_0x122395);break;case _0x414082(0x183):this['processWrapBreak'](_0x122395);break;default:this[_0x414082(0x367)](_0x1c2183,_0x122395);}},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x367)]=function(_0x54023f,_0x4767b9){const _0x13050e=_0x1f0508;for(const _0x13f379 of VisuMZ[_0x13050e(0x226)]['Settings']['TextCodeActions']){if(_0x13f379[_0x13050e(0x1db)]===_0x54023f){if(_0x13f379['Type']==='')this[_0x13050e(0x39d)](_0x4767b9);_0x13f379['ActionJS'][_0x13050e(0x176)](this,_0x4767b9);if(this['constructor']===Window_Message){const _0x41d907=_0x13f379['CommonEvent']||0x0;if(_0x41d907>0x0)this[_0x13050e(0x350)](_0x41d907);}}}},Window_Base[_0x1f0508(0x198)]['makeFontBigger']=function(){const _0x366e13=_0x1f0508;this['contents'][_0x366e13(0x22e)]+=VisuMZ[_0x366e13(0x226)]['Settings'][_0x366e13(0x13d)][_0x366e13(0x13f)],this[_0x366e13(0x2e8)][_0x366e13(0x22e)]=Math[_0x366e13(0x30e)](this[_0x366e13(0x2e8)]['fontSize'],VisuMZ[_0x366e13(0x226)]['Settings'][_0x366e13(0x13d)]['FontBiggerCap']);},Window_Base['prototype']['makeFontSmaller']=function(){const _0x8d221d=_0x1f0508;this[_0x8d221d(0x2e8)][_0x8d221d(0x22e)]-=VisuMZ[_0x8d221d(0x226)]['Settings'][_0x8d221d(0x13d)][_0x8d221d(0x13f)],this[_0x8d221d(0x2e8)][_0x8d221d(0x22e)]=Math[_0x8d221d(0x19b)](this[_0x8d221d(0x2e8)][_0x8d221d(0x22e)],VisuMZ[_0x8d221d(0x226)][_0x8d221d(0x311)][_0x8d221d(0x13d)]['FontSmallerCap']);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x1e5)]=function(_0x433061){const _0x301409=_0x1f0508,_0x54c098=this[_0x301409(0x39d)](_0x433061);this['contents'][_0x301409(0x22e)]=_0x54c098[_0x301409(0x218)](VisuMZ['MessageCore'][_0x301409(0x311)][_0x301409(0x13d)][_0x301409(0x383)],VisuMZ[_0x301409(0x226)]['Settings'][_0x301409(0x13d)][_0x301409(0x2b7)]);},Window_Base['prototype']['maxFontSizeInLine']=function(_0x2b3562){const _0x40483d=_0x1f0508;let _0x2aaf04=this[_0x40483d(0x2e8)][_0x40483d(0x22e)];const _0x375550=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x2adbc9=_0x375550[_0x40483d(0x1fa)](_0x2b3562);if(!_0x2adbc9){if(_0x40483d(0x33e)==='suxfi')break;else return this[_0x40483d(0x26e)];}const _0x218a41=String(_0x2adbc9[0x1])[_0x40483d(0x237)]();if(_0x218a41==='{'){if('HpYUP'!==_0x40483d(0x2d2)){_0x40acaa[_0x40483d(0x226)][_0x40483d(0x3cd)][_0x40483d(0x176)](this,_0x215313);const _0x5ab700=_0x21183b[_0x40483d(0x226)][_0x40483d(0x311)][_0x40483d(0x257)];_0x3b4d8f[_0x40483d(0x226)][_0x40483d(0x2a0)](_0x590bc3,_0x5ab700[_0x40483d(0x21c)]);}else this['makeFontBigger']();}else{if(_0x218a41==='}')_0x40483d(0x225)===_0x40483d(0x225)?this[_0x40483d(0x147)]():_0x2da954[_0x40483d(0x226)][_0x40483d(0x189)][_0x40483d(0x176)](this,_0x2a5505,_0x56b841);else _0x218a41==='FS'&&(this[_0x40483d(0x2e8)][_0x40483d(0x22e)]=parseInt(_0x2adbc9[0x3])[_0x40483d(0x218)](VisuMZ[_0x40483d(0x226)]['Settings'][_0x40483d(0x13d)][_0x40483d(0x383)],VisuMZ[_0x40483d(0x226)][_0x40483d(0x311)]['General'][_0x40483d(0x2b7)]));}this['contents'][_0x40483d(0x22e)]>_0x2aaf04&&(_0x2aaf04=this[_0x40483d(0x2e8)][_0x40483d(0x22e)]);}return _0x2aaf04;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3aa)]=function(_0x2a9963){const _0x30a183=_0x1f0508;_0x2a9963['x']=this[_0x30a183(0x39d)](_0x2a9963),VisuMZ[_0x30a183(0x226)][_0x30a183(0x311)][_0x30a183(0x13d)][_0x30a183(0x231)]&&(_0x2a9963['x']+=_0x2a9963[_0x30a183(0x14a)]);},Window_Base[_0x1f0508(0x198)]['processPyTextCode']=function(_0x43b275){const _0x4f3339=_0x1f0508;_0x43b275['y']=this[_0x4f3339(0x39d)](_0x43b275);if(VisuMZ[_0x4f3339(0x226)][_0x4f3339(0x311)]['General']['RelativePXPY']){if(_0x4f3339(0x239)!==_0x4f3339(0x239))return _0x3a327e;else _0x43b275['y']+=_0x43b275[_0x4f3339(0x148)];}},Window_Base[_0x1f0508(0x198)]['processFontChangeBold']=function(_0x392da7){const _0x21538d=_0x1f0508;this[_0x21538d(0x2e8)]['fontBold']=!!_0x392da7;},Window_Base[_0x1f0508(0x198)]['processFontChangeItalic']=function(_0x297139){const _0x379f1b=_0x1f0508;this[_0x379f1b(0x2e8)][_0x379f1b(0x37f)]=!!_0x297139;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x2ac)]=function(_0x5d520b){const _0x4c001e=_0x1f0508,_0x106ad4=this[_0x4c001e(0x39d)](_0x5d520b);if(!_0x5d520b[_0x4c001e(0x18f)])return;switch(_0x106ad4){case 0x0:this['setTextAlignment'](_0x4c001e(0x2d0));return;case 0x1:this['setTextAlignment'](_0x4c001e(0x20a));break;case 0x2:this[_0x4c001e(0x17d)]('center');break;case 0x3:this['setTextAlignment'](_0x4c001e(0x2c6));break;}this['processTextAlignmentX'](_0x5d520b);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x281)]=function(_0x557dd5){const _0x50a18b=_0x1f0508;if(!_0x557dd5[_0x50a18b(0x18f)])return;if(_0x557dd5[_0x50a18b(0x1d8)])return;if(this[_0x50a18b(0x3b1)]()===_0x50a18b(0x2d0))return;let _0x64bdd9=_0x557dd5[_0x50a18b(0x23a)]['indexOf'](_0x50a18b(0x1b9),_0x557dd5[_0x50a18b(0x1b0)]+0x1),_0x27765b=_0x557dd5[_0x50a18b(0x23a)][_0x50a18b(0x24e)]('\x0a',_0x557dd5['index']+0x1);if(_0x64bdd9<0x0)_0x64bdd9=_0x557dd5['text'][_0x50a18b(0x2a7)]+0x1;if(_0x27765b>0x0)_0x64bdd9=Math['min'](_0x64bdd9,_0x27765b);const _0x23f9ef=_0x557dd5['text'][_0x50a18b(0xf4)](_0x557dd5['index'],_0x64bdd9),_0x5a4874=this[_0x50a18b(0x2fe)](_0x23f9ef)['width'],_0x25c654=_0x557dd5['width']||this[_0x50a18b(0xf7)]-0x8,_0xc098d6=this[_0x50a18b(0x11e)]===Window_Message&&$gameMessage[_0x50a18b(0x1bb)]()!=='';switch(this[_0x50a18b(0x3b1)]()){case'left':_0x557dd5['x']=_0x557dd5['startX'];break;case _0x50a18b(0x17f):_0x557dd5['x']=_0x557dd5[_0x50a18b(0x14a)],_0x557dd5['x']+=Math['floor']((_0x25c654-_0x5a4874)/0x2);_0xc098d6&&(_0x557dd5['x']-=_0x557dd5[_0x50a18b(0x14a)]/0x2);break;case'right':_0x557dd5['x']=_0x25c654-_0x5a4874+_0x557dd5[_0x50a18b(0x14a)];if(_0xc098d6){if(_0x50a18b(0x16a)===_0x50a18b(0x16a))_0x557dd5['x']-=_0x557dd5[_0x50a18b(0x14a)];else{!_0x5eba59&&(this[_0x50a18b(0x1d0)]=_0x2606fc[_0x50a18b(0x30e)](this[_0x50a18b(0x1d0)],_0x34358f[_0x50a18b(0x1d0)]),this[_0x50a18b(0x36b)]=_0x3cb166['min'](this[_0x50a18b(0x36b)],_0x39dd11[_0x50a18b(0x36b)]));if(!_0x5b3ef1){const _0x5152b4=-(_0xcc203a[_0x50a18b(0x11a)](_0x3a4cd1[_0x50a18b(0x1d0)]-_0x818236[_0x50a18b(0x286)])/0x2),_0x52fb3f=_0x5152b4+_0x55c8dd[_0x50a18b(0x1d0)]-this[_0x50a18b(0x1d0)],_0x3d4d7b=-(_0x4e00e6['floor'](_0x31de38['height']-_0x147c3b[_0x50a18b(0x3a4)])/0x2),_0x4a84c1=_0x3d4d7b+_0x18b16c[_0x50a18b(0x36b)]-this[_0x50a18b(0x36b)];this['x']=this['x'][_0x50a18b(0x218)](_0x5152b4,_0x52fb3f),this['y']=this['y'][_0x50a18b(0x218)](_0x3d4d7b,_0x4a84c1);}}}break;}},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x2fe)]=function(_0xdc9a05){const _0x3b8f92=_0x1f0508;_0xdc9a05=_0xdc9a05[_0x3b8f92(0x3c8)](/\x1b!/g,''),_0xdc9a05=_0xdc9a05[_0x3b8f92(0x3c8)](/\x1b\|/g,''),_0xdc9a05=_0xdc9a05['replace'](/\x1b\./g,'');const _0x5676bf=this[_0x3b8f92(0x1a9)](_0xdc9a05,0x0,0x0,0x0),_0x4487c3=this[_0x3b8f92(0x126)]();return _0x5676bf[_0x3b8f92(0x18f)]=![],this['processAllText'](_0x5676bf),this[_0x3b8f92(0x34e)](_0x4487c3),{'width':_0x5676bf['outputWidth'],'height':_0x5676bf[_0x3b8f92(0x19f)]};},Window_Base['WORD_WRAP_PADDING']=VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x311)][_0x1f0508(0x1a6)][_0x1f0508(0xfc)]||0x0,Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3d0)]=function(_0x48cfdb){const _0x1d8a10=_0x1f0508,_0x495503=(_0x48cfdb['rtl']?-0x1:0x1)*this[_0x1d8a10(0x354)]('\x20');_0x48cfdb['x']+=_0x495503;if(this[_0x1d8a10(0x39d)](_0x48cfdb)>0x0)_0x48cfdb['x']+=_0x495503;if(_0x48cfdb['rtl'])return;let _0x482721=_0x48cfdb['text'][_0x1d8a10(0x24e)](_0x1d8a10(0x125),_0x48cfdb[_0x1d8a10(0x1b0)]+0x1),_0x3acb52=_0x48cfdb[_0x1d8a10(0x23a)][_0x1d8a10(0x24e)]('\x0a',_0x48cfdb[_0x1d8a10(0x1b0)]+0x1);if(_0x482721<0x0)_0x482721=_0x48cfdb[_0x1d8a10(0x23a)][_0x1d8a10(0x2a7)]+0x1;if(_0x3acb52>0x0)_0x482721=Math[_0x1d8a10(0x30e)](_0x482721,_0x3acb52);const _0x6ff7dd=_0x48cfdb['text']['substring'](_0x48cfdb[_0x1d8a10(0x1b0)],_0x482721),_0x20cc04=this[_0x1d8a10(0x3cc)](_0x6ff7dd)[_0x1d8a10(0x1d0)];let _0x1c7946=_0x48cfdb[_0x1d8a10(0x1d0)]||this[_0x1d8a10(0xf7)];_0x1c7946-=Window_Base[_0x1d8a10(0x2a5)];if(this[_0x1d8a10(0x11e)]===Window_Message){if('dkJNf'!=='dkJNf')return _0x40e8fb[_0x1d8a10(0x226)][_0x1d8a10(0x2be)][_0x1d8a10(0x176)](this)||_0x2f4c13['isPressed'](_0x55a3de[_0x1d8a10(0x226)][_0x1d8a10(0x311)][_0x1d8a10(0x13d)][_0x1d8a10(0x1e2)]);else{const _0x47ac31=$gameMessage[_0x1d8a10(0x1bb)]()===''?0x0:ImageManager['faceWidth']+0x14;_0x1c7946-=_0x47ac31,VisuMZ[_0x1d8a10(0x226)]['Settings']['WordWrap'][_0x1d8a10(0x385)]&&(_0x1c7946-=_0x47ac31);}}let _0x5f238d=![];if(_0x48cfdb['x']+_0x20cc04>_0x48cfdb[_0x1d8a10(0x14a)]+_0x1c7946)_0x5f238d=!![];if(_0x20cc04===0x0)_0x5f238d=!![];_0x5f238d&&(_0x48cfdb['text']=_0x48cfdb[_0x1d8a10(0x23a)][_0x1d8a10(0x39b)](0x0,_0x48cfdb[_0x1d8a10(0x1b0)])+'\x0a'+_0x48cfdb[_0x1d8a10(0x23a)][_0x1d8a10(0x253)](_0x48cfdb[_0x1d8a10(0x1b0)]));},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3cc)]=function(_0x2506ae){const _0x3af233=_0x1f0508,_0x550198=this[_0x3af233(0x1a9)](_0x2506ae,0x0,0x0,0x0),_0x436057=this[_0x3af233(0x126)]();return _0x550198[_0x3af233(0x18f)]=![],this[_0x3af233(0x188)](![]),this['processAllText'](_0x550198),this[_0x3af233(0x188)](!![]),this[_0x3af233(0x34e)](_0x436057),{'width':_0x550198[_0x3af233(0x157)],'height':_0x550198[_0x3af233(0x19f)]};},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x196)]=function(_0x3497a6){const _0x52274e=_0x1f0508;return this[_0x52274e(0x39d)](_0x3497a6);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x3bc)]=function(_0x499ec8){const _0x52dc83=_0x1f0508,_0x10c987=this[_0x52dc83(0x2c3)](_0x499ec8)[_0x52dc83(0x3b0)](',');if(!_0x499ec8[_0x52dc83(0x18f)])return;const _0x5d3e31=_0x10c987[0x0][_0x52dc83(0x1ee)](),_0x525a28=_0x10c987[0x1]||0x0,_0x5ddd57=_0x10c987[0x2]||0x0,_0x363226=ImageManager['loadPicture'](_0x5d3e31),_0x1c87b6=this[_0x52dc83(0x2e8)][_0x52dc83(0x204)];_0x363226['addLoadListener'](this[_0x52dc83(0x363)]['bind'](this,_0x363226,_0x499ec8['x'],_0x499ec8['y'],_0x525a28,_0x5ddd57,_0x1c87b6));},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x363)]=function(_0x4475ac,_0x15a3ba,_0x24a0dc,_0x3a5ef5,_0xf8b9b3,_0x2dcc6b){const _0x2e6567=_0x1f0508;_0x3a5ef5=_0x3a5ef5||_0x4475ac[_0x2e6567(0x1d0)],_0xf8b9b3=_0xf8b9b3||_0x4475ac['height'],this[_0x2e6567(0x1ad)][_0x2e6567(0x204)]=_0x2dcc6b,this[_0x2e6567(0x1ad)]['blt'](_0x4475ac,0x0,0x0,_0x4475ac['width'],_0x4475ac[_0x2e6567(0x36b)],_0x15a3ba,_0x24a0dc,_0x3a5ef5,_0xf8b9b3),this['contentsBack'][_0x2e6567(0x204)]=0xff;},Window_Base['prototype'][_0x1f0508(0x15f)]=function(_0x5342ed){const _0x1237e3=_0x1f0508,_0x5e50c8=this['obtainEscapeString'](_0x5342ed)['split'](',');if(!_0x5342ed[_0x1237e3(0x18f)])return;const _0x22f3be=_0x5e50c8[0x0][_0x1237e3(0x1ee)](),_0x5f4e79=ImageManager[_0x1237e3(0xf5)](_0x22f3be),_0x3da9d6=JsonEx[_0x1237e3(0x241)](_0x5342ed),_0x2e07b5=this['contents'][_0x1237e3(0x204)];_0x5f4e79[_0x1237e3(0x1ab)](this[_0x1237e3(0x372)]['bind'](this,_0x5f4e79,_0x3da9d6,_0x2e07b5));},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x372)]=function(_0x1f4c23,_0x117c67,_0x375d28){const _0x265317=_0x1f0508,_0x35174d=_0x117c67[_0x265317(0x1d0)]||this[_0x265317(0xf7)],_0x1ceec2=this[_0x265317(0x38d)]!==undefined?this[_0x265317(0x270)]():this[_0x265317(0xf9)],_0x59857f=_0x35174d/_0x1f4c23[_0x265317(0x1d0)],_0x5973ce=_0x1ceec2/_0x1f4c23[_0x265317(0x36b)],_0x3c087d=Math[_0x265317(0x30e)](_0x59857f,_0x5973ce,0x1),_0x283e3a=this['_index']!==undefined?(this[_0x265317(0x360)](0x0)[_0x265317(0x36b)]-this[_0x265317(0x32b)]())/0x2:0x0,_0x14da16=_0x1f4c23[_0x265317(0x1d0)]*_0x3c087d,_0x17467d=_0x1f4c23[_0x265317(0x36b)]*_0x3c087d,_0x4f1ae1=Math[_0x265317(0x11a)]((_0x35174d-_0x14da16)/0x2)+_0x117c67['startX'],_0x3209bd=Math[_0x265317(0x11a)]((_0x1ceec2-_0x17467d)/0x2)+_0x117c67[_0x265317(0x148)]-_0x283e3a*0x2;this[_0x265317(0x1ad)][_0x265317(0x204)]=_0x375d28,this[_0x265317(0x1ad)]['blt'](_0x1f4c23,0x0,0x0,_0x1f4c23[_0x265317(0x1d0)],_0x1f4c23['height'],_0x4f1ae1,_0x3209bd,_0x14da16,_0x17467d),this[_0x265317(0x1ad)][_0x265317(0x204)]=0xff;},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x277)]=function(_0x142cdf){const _0x414954=_0x1f0508,_0x376560=this[_0x414954(0x39d)](_0x142cdf);if(_0x142cdf[_0x414954(0x18f)])this[_0x414954(0x1c6)](_0x376560>0x0);},Window_Base[_0x1f0508(0x198)][_0x1f0508(0x1ba)]=function(_0x101a6b){const _0x43317e=_0x1f0508,_0x5b4769=this[_0x43317e(0x39d)](_0x101a6b);this[_0x43317e(0x11e)]===Window_Message&&_0x101a6b[_0x43317e(0x18f)]&&this[_0x43317e(0x3ad)](_0x5b4769);},Window_Help[_0x1f0508(0x198)][_0x1f0508(0x394)]=function(){const _0xc5103f=_0x1f0508;this[_0xc5103f(0x188)]($gameSystem[_0xc5103f(0x251)]());},Window_Help[_0x1f0508(0x198)][_0x1f0508(0x223)]=function(){return!![];},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x1e8)]=Window_Help[_0x1f0508(0x198)][_0x1f0508(0x2da)],Window_Help[_0x1f0508(0x198)]['refresh']=function(){const _0x4ead55=_0x1f0508;this[_0x4ead55(0x3a7)](),VisuMZ[_0x4ead55(0x226)]['Window_Help_refresh'][_0x4ead55(0x176)](this),this[_0x4ead55(0x394)]();},VisuMZ[_0x1f0508(0x226)]['Window_Options_addGeneralOptions']=Window_Options[_0x1f0508(0x198)][_0x1f0508(0x3d7)],Window_Options[_0x1f0508(0x198)][_0x1f0508(0x3d7)]=function(){const _0x2373d5=_0x1f0508;VisuMZ[_0x2373d5(0x226)][_0x2373d5(0x23d)][_0x2373d5(0x176)](this),this[_0x2373d5(0x155)]();},Window_Options['prototype'][_0x1f0508(0x155)]=function(){const _0x23ccc0=_0x1f0508;if(VisuMZ['MessageCore'][_0x23ccc0(0x311)][_0x23ccc0(0x175)]['AddOption']){if(_0x23ccc0(0x396)===_0x23ccc0(0x396))this[_0x23ccc0(0x1e4)]();else{const _0xfe4aff=0x2;switch(this[_0x23ccc0(0x2f0)]){case 0x0:return _0x2b517f;case 0x1:return this[_0x23ccc0(0x31e)](_0x8b2a6,_0xfe4aff);case 0x2:return this['easeOut'](_0x25e9bd,_0xfe4aff);case 0x3:return this[_0x23ccc0(0x333)](_0x3d49e7,_0xfe4aff);default:return _0x4a9d8c['VisuMZ_0_CoreEngine']?_0xf53b70[_0x23ccc0(0x294)](_0x1b3f42,this['_moveEasingType']):_0x3b66e6;}}}},Window_Options['prototype'][_0x1f0508(0x1e4)]=function(){const _0xd294d1=_0x1f0508,_0x1db64f=TextManager[_0xd294d1(0x138)],_0xa59b62=_0xd294d1(0x392);this[_0xd294d1(0x235)](_0x1db64f,_0xa59b62);},VisuMZ['MessageCore']['Window_Options_statusText']=Window_Options['prototype'][_0x1f0508(0x2b4)],Window_Options[_0x1f0508(0x198)][_0x1f0508(0x2b4)]=function(_0x390960){const _0x36815b=_0x1f0508,_0x5a556f=this[_0x36815b(0x2c1)](_0x390960);if(_0x5a556f===_0x36815b(0x392))return this[_0x36815b(0x28d)]();return VisuMZ['MessageCore'][_0x36815b(0x3b7)][_0x36815b(0x176)](this,_0x390960);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x16d)]=Window_Options[_0x1f0508(0x198)][_0x1f0508(0x2bd)],Window_Options[_0x1f0508(0x198)][_0x1f0508(0x2bd)]=function(_0x1f8f0c){const _0x23ce3c=_0x1f0508;if(_0x1f8f0c==='textSpeed')return!![];return VisuMZ['MessageCore'][_0x23ce3c(0x16d)][_0x23ce3c(0x176)](this,_0x1f8f0c);},Window_Options['prototype']['textSpeedStatusText']=function(){const _0x467327=_0x1f0508,_0x4501bb=this[_0x467327(0x271)](_0x467327(0x392));if(_0x4501bb>0xa){if('JRZnS'===_0x467327(0x2eb)){const _0x49c1f9=_0x3b0e8a[_0x467327(0x226)][_0x467327(0x311)]['General'][_0x467327(0x1a5)];return _0x3d4269[_0x467327(0x3ba)](_0x49c1f9);}else return TextManager[_0x467327(0x1f2)];}else{if(_0x467327(0x3d4)!==_0x467327(0x158))return _0x4501bb;else{if(!_0x34adbe[_0x3e71fb])return;this['_messageCommonEvents']=this[_0x467327(0x395)]||[];const _0x3c881c=this[_0x467327(0x3bd)]['_eventId'],_0x108355=new _0x3965ce(_0x25a323,_0x3c881c);this[_0x467327(0x395)][_0x467327(0x156)](_0x108355);}}},VisuMZ[_0x1f0508(0x226)]['Window_Options_changeVolume']=Window_Options['prototype'][_0x1f0508(0x3a5)],Window_Options['prototype'][_0x1f0508(0x3a5)]=function(_0x3634f3,_0x29b134,_0xbee83a){const _0x126349=_0x1f0508;if(_0x3634f3===_0x126349(0x392))return this[_0x126349(0x2c5)](_0x3634f3,_0x29b134,_0xbee83a);VisuMZ[_0x126349(0x226)][_0x126349(0x3bf)][_0x126349(0x176)](this,_0x3634f3,_0x29b134,_0xbee83a);},Window_Options[_0x1f0508(0x198)][_0x1f0508(0x2c5)]=function(_0x1870a0,_0x441358,_0x4757a7){const _0x3db0e8=_0x1f0508,_0x2a9b6e=this['getConfigValue'](_0x1870a0),_0xc927df=0x1,_0x359d96=_0x2a9b6e+(_0x441358?_0xc927df:-_0xc927df);if(_0x359d96>0xb&&_0x4757a7)_0x3db0e8(0x3a1)!==_0x3db0e8(0x3a6)?this[_0x3db0e8(0x3be)](_0x1870a0,0x1):this['_autoColorActorNames']=[];else{if(_0x3db0e8(0x377)===_0x3db0e8(0x377))this[_0x3db0e8(0x3be)](_0x1870a0,_0x359d96[_0x3db0e8(0x218)](0x1,0xb));else{const _0x2175b0=_0x49a689['choices']();let _0x1f1c30=0x0;for(let _0x52be90 of _0x2175b0){_0x52be90=this['convertChoiceMacros'](_0x52be90);if(this[_0x3db0e8(0x172)](_0x52be90)){const _0x57df19=this[_0x3db0e8(0x2c0)](_0x52be90),_0xe34833=this[_0x3db0e8(0x102)](_0x52be90);this['addCommand'](_0x57df19,'choice',_0xe34833,_0x1f1c30);}_0x1f1c30++;}}}},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x191)]=function(){const _0x40ef85=_0x1f0508;let _0x7e72f8=Window_Base[_0x40ef85(0x198)][_0x40ef85(0x191)][_0x40ef85(0x176)](this);return _0x7e72f8-=this[_0x40ef85(0x12d)](),_0x7e72f8;},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x243)]=function(){const _0x50a383=_0x1f0508;Window_Base[_0x50a383(0x198)]['refreshDimmerBitmap'][_0x50a383(0x176)](this),VisuMZ['MessageCore'][_0x50a383(0x311)][_0x50a383(0x13d)][_0x50a383(0x296)]&&this[_0x50a383(0x390)]();},Window_Message[_0x1f0508(0x198)]['stretchDimmerSprite']=function(){const _0x448a2d=_0x1f0508;this[_0x448a2d(0x331)]['x']=Math['round'](this[_0x448a2d(0x1d0)]/0x2),this[_0x448a2d(0x331)][_0x448a2d(0x134)]['x']=0.5,this['_dimmerSprite'][_0x448a2d(0x1bd)]['x']=Graphics[_0x448a2d(0x1d0)];},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x18e)]=Window_Message[_0x1f0508(0x198)][_0x1f0508(0x288)],Window_Message[_0x1f0508(0x198)][_0x1f0508(0x288)]=function(){const _0x2eb188=_0x1f0508;VisuMZ[_0x2eb188(0x226)]['Window_Message_clearFlags']['call'](this),this[_0x2eb188(0x3a7)](),this[_0x2eb188(0x394)](),this[_0x2eb188(0x1c6)](![]),this[_0x2eb188(0x17d)](_0x2eb188(0x2d0)),this['setTextDelay'](VisuMZ[_0x2eb188(0x226)]['Settings'][_0x2eb188(0x13d)][_0x2eb188(0x31f)]);},Window_Message['prototype']['resetWordWrap']=function(){this['setWordWrap']($gameSystem['isMessageWindowWordWrap']());},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x223)]=function(){return!![];},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x259)]=function(_0xdf2f4f){const _0x57282a=_0x1f0508,_0x3d38cd=0xb-ConfigManager[_0x57282a(0x392)];_0xdf2f4f=Math[_0x57282a(0x365)](_0xdf2f4f*_0x3d38cd),this[_0x57282a(0x351)]=_0xdf2f4f,this[_0x57282a(0x1dc)]=_0xdf2f4f;},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x2be)]=Window_Message[_0x1f0508(0x198)][_0x1f0508(0x13e)],Window_Message[_0x1f0508(0x198)][_0x1f0508(0x13e)]=function(){const _0x596b78=_0x1f0508;return VisuMZ['MessageCore']['Window_Message_isTriggered'][_0x596b78(0x176)](this)||Input[_0x596b78(0x2d3)](VisuMZ[_0x596b78(0x226)][_0x596b78(0x311)][_0x596b78(0x13d)][_0x596b78(0x1e2)]);},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x291)]=Window_Message[_0x1f0508(0x198)][_0x1f0508(0x306)],Window_Message[_0x1f0508(0x198)][_0x1f0508(0x306)]=function(){const _0x4154dc=_0x1f0508;let _0x192809=this['y'];this['x']=Math[_0x4154dc(0x365)]((Graphics[_0x4154dc(0x286)]-this[_0x4154dc(0x1d0)])/0x2),VisuMZ[_0x4154dc(0x226)][_0x4154dc(0x291)][_0x4154dc(0x176)](this);if(this[_0x4154dc(0x3cb)])this['y']=_0x192809;this[_0x4154dc(0x337)](),this[_0x4154dc(0x1d7)](),this['clampPlacementPosition']();},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x1fc)]=Window_Message[_0x1f0508(0x198)][_0x1f0508(0x117)],Window_Message[_0x1f0508(0x198)]['newPage']=function(_0x38db98){const _0x56b0f4=_0x1f0508;this[_0x56b0f4(0x2fd)](_0x38db98),this[_0x56b0f4(0x345)](_0x38db98),VisuMZ[_0x56b0f4(0x226)][_0x56b0f4(0x1fc)]['call'](this,_0x38db98),this[_0x56b0f4(0x2a9)]();},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x2fd)]=function(_0x357ed7){const _0x16be20=_0x1f0508;if(!_0x357ed7)return;this['_macroBypassWordWrap']=![],_0x357ed7[_0x16be20(0x23a)]=this[_0x16be20(0x2f6)](_0x357ed7[_0x16be20(0x23a)]);if(this['_textMacroFound']){if(_0x16be20(0x361)!==_0x16be20(0x361)){const _0x549c52=this['parseChoiceText'](_0x4e8280),_0x19a9c8=this[_0x16be20(0x102)](_0x2e60a3);this['addCommand'](_0x549c52,_0x16be20(0x1b6),_0x19a9c8,_0x1c29db);}else _0x357ed7[_0x16be20(0x23a)]=this[_0x16be20(0x274)](_0x357ed7['text']),this[_0x16be20(0x301)]=!![];}},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x274)]=function(_0x363759){const _0x4b4b30=_0x1f0508;if(this[_0x4b4b30(0x301)])return _0x363759;return Window_Base[_0x4b4b30(0x198)][_0x4b4b30(0x274)][_0x4b4b30(0x176)](this,_0x363759);},Window_Message['prototype'][_0x1f0508(0x345)]=function(_0x4d779c){const _0x351d0e=_0x1f0508;this[_0x351d0e(0x3ce)](_0x4d779c),this['prepareAutoSizeEscapeCharacters'](_0x4d779c),this[_0x351d0e(0x24f)]();},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x20e)]=Window_Message[_0x1f0508(0x198)][_0x1f0508(0x1b4)],Window_Message[_0x1f0508(0x198)][_0x1f0508(0x1b4)]=function(){const _0x7b33d=_0x1f0508;VisuMZ[_0x7b33d(0x226)][_0x7b33d(0x20e)][_0x7b33d(0x176)](this),this[_0x7b33d(0x288)]();if(this['_messagePositionReset'])this[_0x7b33d(0x2ef)]();},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x24f)]=function(){const _0x383145=_0x1f0508;this[_0x383145(0x1d0)]=$gameSystem[_0x383145(0x25f)]()+this[_0x383145(0x2fb)]();;this[_0x383145(0x1d0)]=Math[_0x383145(0x30e)](Graphics[_0x383145(0x1d0)],this['width']);const _0x300b57=$gameSystem[_0x383145(0x33a)]();this[_0x383145(0x36b)]=SceneManager['_scene'][_0x383145(0x2ba)](_0x300b57,![])+this[_0x383145(0x12d)](),this['height']=Math[_0x383145(0x30e)](Graphics[_0x383145(0x36b)],this[_0x383145(0x36b)]);if($gameTemp[_0x383145(0x1f8)])this['resetPositionX']();},Window_Message[_0x1f0508(0x198)]['addedWidth']=function(){return 0x0;},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x12d)]=function(){return 0x0;},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x30b)]=function(){const _0x5c4108=_0x1f0508;this['x']=(Graphics['boxWidth']-this[_0x5c4108(0x1d0)])/0x2,$gameTemp[_0x5c4108(0x1f8)]=undefined,this[_0x5c4108(0x321)]();},Window_Message['prototype'][_0x1f0508(0x295)]=function(){const _0x4e6eb2=_0x1f0508,_0x303edb={'x':this['x'],'y':this['y']};Window_Base[_0x4e6eb2(0x198)]['updateMove'][_0x4e6eb2(0x176)](this),this[_0x4e6eb2(0x3c5)](_0x303edb);},Window_Message[_0x1f0508(0x198)]['canMove']=function(){return!![];},Window_Message['prototype'][_0x1f0508(0x3c5)]=function(_0x37b791){const _0x494c09=_0x1f0508;this[_0x494c09(0x1f1)]&&(this['_nameBoxWindow']['x']+=this['x']-_0x37b791['x'],this[_0x494c09(0x1f1)]['y']+=this['y']-_0x37b791['y']);},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x33c)]=function(_0x5149e3,_0x2b4cbf){const _0x1b2d4e=_0x1f0508;this['moveTo'](this[_0x1b2d4e(0x2ea)]['x'],this[_0x1b2d4e(0x3a3)]*(Graphics[_0x1b2d4e(0x3a4)]-this[_0x1b2d4e(0x36b)])/0x2,this[_0x1b2d4e(0x2ea)][_0x1b2d4e(0x1d0)],this[_0x1b2d4e(0x2ea)][_0x1b2d4e(0x36b)],_0x5149e3,_0x2b4cbf);},Window_Message[_0x1f0508(0x198)]['processCommonEvent']=function(_0x1c6ab1){const _0x2aaf7e=_0x1f0508,_0x359dd1=Window_Base['prototype'][_0x2aaf7e(0x196)][_0x2aaf7e(0x176)](this,_0x1c6ab1);if(_0x1c6ab1[_0x2aaf7e(0x18f)]){if('QOcSV'!==_0x2aaf7e(0x28f))this[_0x2aaf7e(0x350)](_0x359dd1);else{if(this[_0x2aaf7e(0x301)])return _0x5b05f0;return _0x434998[_0x2aaf7e(0x198)][_0x2aaf7e(0x274)][_0x2aaf7e(0x176)](this,_0x2c4099);}}},Window_Message[_0x1f0508(0x198)]['launchMessageCommonEvent']=function(_0x4b8cd5){const _0x2205bc=_0x1f0508;if($gameParty[_0x2205bc(0x31c)]()){}else $gameMap[_0x2205bc(0x244)](_0x4b8cd5);},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x1a8)]=function(_0x502b0a){const _0x53c705=_0x1f0508;this['_textDelayCount']--,this[_0x53c705(0x351)]<=0x0&&(this[_0x53c705(0xff)](_0x502b0a),Window_Base[_0x53c705(0x198)]['processCharacter'][_0x53c705(0x176)](this,_0x502b0a));},Window_Message[_0x1f0508(0x198)][_0x1f0508(0xff)]=function(_0x336902){const _0x4bf2c4=_0x1f0508;this[_0x4bf2c4(0x351)]=this['_textDelay'];if(this[_0x4bf2c4(0x1dc)]<=0x0)this[_0x4bf2c4(0x166)]=!![];},VisuMZ['MessageCore'][_0x1f0508(0x17a)]=Window_Message[_0x1f0508(0x198)][_0x1f0508(0x376)],Window_Message[_0x1f0508(0x198)][_0x1f0508(0x376)]=function(_0x474802,_0x52b06f){const _0x282723=_0x1f0508;if(!_0x52b06f[_0x282723(0x18f)]){if(_0x282723(0x11b)===_0x282723(0x25e))return this[_0x282723(0x18c)](_0x389f60,!![],!![]),this[_0x282723(0x355)](_0x282723(0x323),_0xf76a2a(_0x2be6cc)||0x0),'';else Window_Base[_0x282723(0x198)][_0x282723(0x376)][_0x282723(0x176)](this,_0x474802,_0x52b06f);}else _0x282723(0x26b)===_0x282723(0x26b)?VisuMZ[_0x282723(0x226)][_0x282723(0x17a)][_0x282723(0x176)](this,_0x474802,_0x52b06f):(_0x3fb041[_0x282723(0x226)][_0x282723(0x35d)]['call'](this),this[_0x282723(0x295)]());},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x3ce)]=function(_0x351acc){const _0x81a2a3=_0x1f0508;let _0x58b567=_0x351acc[_0x81a2a3(0x23a)];this['_forcedPosition']={};if(this[_0x81a2a3(0x217)]())return _0x58b567;_0x58b567=_0x58b567[_0x81a2a3(0x3c8)](/<POSITION:[ ]*(.*)>/gi,(_0x4417d9,_0x34f989)=>{const _0x21d2cf=_0x81a2a3,_0x3c5111=_0x34f989[_0x21d2cf(0x3b0)](',')[_0x21d2cf(0x12f)](_0x5f1b29=>Number(_0x5f1b29)||0x0);if(_0x3c5111[0x0]!==undefined)this[_0x21d2cf(0x238)]['x']=Number(_0x3c5111[0x0]);if(_0x3c5111[0x1]!==undefined)this[_0x21d2cf(0x238)]['y']=Number(_0x3c5111[0x1]);if(_0x3c5111[0x2]!==undefined)this[_0x21d2cf(0x238)][_0x21d2cf(0x1d0)]=Number(_0x3c5111[0x2]);if(_0x3c5111[0x3]!==undefined)this['_forcedPosition'][_0x21d2cf(0x36b)]=Number(_0x3c5111[0x3]);return'';}),_0x58b567=_0x58b567[_0x81a2a3(0x3c8)](/<COORDINATES:[ ]*(.*)>/gi,(_0x4c3e84,_0x3ca168)=>{const _0x2d3ce3=_0x81a2a3;if(_0x2d3ce3(0x29f)!==_0x2d3ce3(0x29f))return![];else{const _0x5539e9=_0x3ca168[_0x2d3ce3(0x3b0)](',')['map'](_0x367e69=>Number(_0x367e69)||0x0);if(_0x5539e9[0x0]!==undefined)this['_forcedPosition']['x']=Number(_0x5539e9[0x0]);if(_0x5539e9[0x1]!==undefined)this[_0x2d3ce3(0x238)]['y']=Number(_0x5539e9[0x1]);return'';}}),_0x58b567=_0x58b567['replace'](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x2fc046,_0x4a8fb7)=>{const _0x2ca134=_0x81a2a3;if('ojSQL'===_0x2ca134(0x2d4)){const _0x54dfe0=_0x4a8fb7[_0x2ca134(0x3b0)](',')[_0x2ca134(0x12f)](_0x17661a=>Number(_0x17661a)||0x0);if(_0x54dfe0[0x0]!==undefined)this['_forcedPosition'][_0x2ca134(0x1d0)]=Number(_0x54dfe0[0x2]);if(_0x54dfe0[0x1]!==undefined)this[_0x2ca134(0x238)][_0x2ca134(0x36b)]=Number(_0x54dfe0[0x3]);return'';}else this[_0x2ca134(0x331)]['x']=_0x25aefa[_0x2ca134(0x365)](this[_0x2ca134(0x1d0)]/0x2),this[_0x2ca134(0x331)]['anchor']['x']=0.5,this[_0x2ca134(0x331)]['scale']['x']=_0x51527c[_0x2ca134(0x1d0)];}),_0x58b567=_0x58b567['replace'](/<OFFSET:[ ]*(.*)>/gi,(_0x506e2a,_0x482c34)=>{const _0x66b9ff=_0x81a2a3,_0x4c869d=_0x482c34['split'](',')[_0x66b9ff(0x12f)](_0x34d3d7=>Number(_0x34d3d7)||0x0);let _0x256ed9=_0x4c869d[0x0]||0x0,_0x5a354f=_0x4c869d[0x1]||0x0;return $gameSystem[_0x66b9ff(0x362)](_0x256ed9,_0x5a354f),'';}),_0x351acc[_0x81a2a3(0x23a)]=_0x58b567;},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x337)]=function(){const _0x1517e6=_0x1f0508,_0x5ca985=$gameSystem[_0x1517e6(0x1e3)]();this['x']+=_0x5ca985['x'],this['y']+=_0x5ca985['y'];},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x1d7)]=function(){const _0x38e127=_0x1f0508;this[_0x38e127(0x238)]=this['_forcedPosition']||{};const _0x35d532=['x','y',_0x38e127(0x1d0),_0x38e127(0x36b)];for(const _0x23e5b6 of _0x35d532){this[_0x38e127(0x238)][_0x23e5b6]!==undefined&&(this[_0x23e5b6]=Number(this[_0x38e127(0x238)][_0x23e5b6]));}},Window_Message['prototype']['prepareAutoSizeEscapeCharacters']=function(_0x4a88f2){const _0x500612=_0x1f0508;let _0x594751=_0x4a88f2[_0x500612(0x23a)];_0x594751=_0x594751['replace'](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x102f25=_0x500612;if(_0x102f25(0x27f)==='YgBYq')return this[_0x102f25(0x18c)](_0x594751,!![],!![]),this[_0x102f25(0x355)](_0x102f25(0x397)),'';else _0x49cc1c['x']=-_0x1f04b2['width']-_0x44b936;}),_0x594751=_0x594751[_0x500612(0x3c8)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x58207a=_0x500612;if('usIAv'!==_0x58207a(0x201))return this[_0x58207a(0x18c)](_0x594751,!![],![]),this[_0x58207a(0x355)]('none'),'';else this['_list'][_0x5d41b2][_0x58207a(0x30f)][0x1]=_0x820f37[_0x58207a(0x30f)][0x1];}),_0x594751=_0x594751['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x403ee1=_0x500612;if(_0x403ee1(0x346)!==_0x403ee1(0x27d))return this[_0x403ee1(0x18c)](_0x594751,![],!![]),this['processAutoPosition'](_0x403ee1(0x397)),'';else{if(this[_0x403ee1(0x106)]===_0x32ac55)this[_0x403ee1(0x325)]();if(this[_0x403ee1(0x106)][_0x403ee1(0x16f)]===_0x57fd13)this[_0x403ee1(0x325)]();this['_MessageCoreSettings']['choiceCols']=_0x492b20||0x1;}});if(SceneManager[_0x500612(0x1c9)]()){if(_0x500612(0x1f7)===_0x500612(0x109)){const _0x5a4c4d=this[_0x500612(0x271)](_0x3fa16d),_0x2a4b1f=0x1,_0x1aef19=_0x5a4c4d+(_0x2b680d?_0x2a4b1f:-_0x2a4b1f);_0x1aef19>0xb&&_0x4494ba?this['changeValue'](_0x1512b9,0x1):this[_0x500612(0x3be)](_0x5a4b90,_0x1aef19[_0x500612(0x218)](0x1,0xb));}else _0x594751=_0x594751[_0x500612(0x3c8)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x3254ff,_0x341d01)=>{const _0x345ba7=_0x500612;return this[_0x345ba7(0x18c)](_0x594751,!![],!![]),this['processAutoPosition'](_0x345ba7(0x276),Number(_0x341d01)||0x1),'';}),_0x594751=_0x594751['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x19fd73,_0x559f70)=>{const _0x1e8cc5=_0x500612;return this[_0x1e8cc5(0x18c)](_0x594751,!![],!![]),this[_0x1e8cc5(0x355)](_0x1e8cc5(0x2b3),Number(_0x559f70)||0x0),'';}),_0x594751=_0x594751[_0x500612(0x3c8)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x2ab3b6,_0x2a5e94)=>{const _0x153a04=_0x500612;if('kvUZt'==='DndzR'){if(this[_0x153a04(0x106)]===_0x39ab6d)this[_0x153a04(0x325)]();if(this[_0x153a04(0x106)][_0x153a04(0x16f)]===_0x201617)this[_0x153a04(0x325)]();return this['_MessageCoreSettings'][_0x153a04(0x16f)];}else return this[_0x153a04(0x18c)](_0x594751,!![],!![]),this[_0x153a04(0x355)](_0x153a04(0x22a),Number(_0x2a5e94)||0x0),'';});}else{if(SceneManager[_0x500612(0x269)]()){if('ENJNL'===_0x500612(0x391)){const _0x2ab9c3=_0x591739['$1'][_0x500612(0x3b0)](',')[_0x500612(0x12f)](_0x23e5de=>_0x365d2e(_0x23e5de)||0x0);for(const _0x3a043e of _0x2ab9c3){if(!_0x26372b[_0x500612(0x2ad)](_0x3a043e))return![];}return!![];}else _0x594751=_0x594751[_0x500612(0x3c8)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x89748a,_0x33fe72)=>{const _0x302add=_0x500612;return this[_0x302add(0x18c)](_0x594751,!![],!![]),this[_0x302add(0x355)](_0x302add(0x265),0x0),'';}),_0x594751=_0x594751[_0x500612(0x3c8)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x4f0c8f,_0x245b0b)=>{const _0x3b5a33=_0x500612;if('BUPpa'!==_0x3b5a33(0x233))return this[_0x3b5a33(0x18c)](_0x594751,!![],!![]),this[_0x3b5a33(0x355)](_0x3b5a33(0x123),Number(_0x245b0b)||0x1),'';else{var _0x1b65bd=/^\<(.*?)\>/[_0x3b5a33(0x1fa)](_0x4abfc9[_0x3b5a33(0x23a)][_0x3b5a33(0x39b)](_0x356110[_0x3b5a33(0x1b0)]));return _0x1b65bd?(_0x3e16a0[_0x3b5a33(0x1b0)]+=_0x1b65bd[0x0][_0x3b5a33(0x2a7)],_0x144e33(_0x1b65bd[0x0][_0x3b5a33(0x39b)](0x1,_0x1b65bd[0x0]['length']-0x1))):'';}}),_0x594751=_0x594751['replace'](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x1b6f45,_0x5c7249)=>{const _0x5e769a=_0x500612;return this['processAutoSize'](_0x594751,!![],!![]),this[_0x5e769a(0x355)]('map\x20party',Number(_0x5c7249)||0x0),'';}),_0x594751=_0x594751[_0x500612(0x3c8)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x5512c5,_0x29e762)=>{const _0x5b25ab=_0x500612;if('XZokZ'!==_0x5b25ab(0x2df))this[_0x5b25ab(0x3d0)](_0x19cf0b);else return this[_0x5b25ab(0x18c)](_0x594751,!![],!![]),this[_0x5b25ab(0x355)](_0x5b25ab(0x22f),Number(_0x29e762)||0x0),'';});}}_0x4a88f2['text']=_0x594751;},Window_Message[_0x1f0508(0x37c)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x1f0508(0x1c2)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x1f0508(0x198)][_0x1f0508(0x18c)]=function(_0x120404,_0x498521,_0x29774a){const _0x4cef6e=_0x1f0508;_0x120404=_0x120404[_0x4cef6e(0x3c8)](Window_Message[_0x4cef6e(0x37c)],''),_0x120404=_0x120404['replace'](Window_Message[_0x4cef6e(0x1c2)],''),this[_0x4cef6e(0x30d)]=!![];const _0x5b536f=this[_0x4cef6e(0x39e)](_0x120404);if(_0x498521){if('domfT'==='gWule')this[_0x4cef6e(0x188)](_0x45b1a6[_0x4cef6e(0x251)]());else{let _0x29a23f=_0x5b536f[_0x4cef6e(0x1d0)]+$gameSystem[_0x4cef6e(0x177)]()*0x2+0x6;const _0x5afbcd=$gameMessage[_0x4cef6e(0x1bb)]()!=='',_0x46a571=ImageManager[_0x4cef6e(0x30a)],_0xe1f061=0x14;_0x29a23f+=_0x5afbcd?_0x46a571+_0xe1f061:0x4;if(_0x29a23f%0x2!==0x0)_0x29a23f+=0x1;$gameSystem[_0x4cef6e(0x260)](_0x29a23f);}}if(_0x29774a){if(_0x4cef6e(0x23e)!==_0x4cef6e(0x3b6)){let _0xe119c0=Math[_0x4cef6e(0x1d6)](_0x5b536f['height']/this[_0x4cef6e(0x32b)]());$gameSystem[_0x4cef6e(0x224)](_0xe119c0);}else!_0x4d6d4a[_0x4cef6e(0x18f)]?_0x3f39f3[_0x4cef6e(0x198)][_0x4cef6e(0x376)]['call'](this,_0x24cab6,_0x2772f5):_0x4be631[_0x4cef6e(0x226)][_0x4cef6e(0x17a)][_0x4cef6e(0x176)](this,_0x260871,_0x13adb3);}this['updateAutoSizePosition'](),this[_0x4cef6e(0x30d)]=![],this['_messagePositionReset']=!![];},Window_Message[_0x1f0508(0x198)]['updateAutoSizePosition']=function(){const _0x5d621a=_0x1f0508;this[_0x5d621a(0x24f)](),this[_0x5d621a(0x306)](),this[_0x5d621a(0x30b)](),this[_0x5d621a(0x1dd)](),this[_0x5d621a(0x2e8)][_0x5d621a(0x160)](),this[_0x5d621a(0x2a9)]();},Window_Message['prototype'][_0x1f0508(0x355)]=function(_0x4eb314,_0x2890f4){const _0x1b5ec1=_0x1f0508;switch(_0x4eb314[_0x1b5ec1(0x199)]()['trim']()){case _0x1b5ec1(0x276):this[_0x1b5ec1(0x3cb)]=$gameActors[_0x1b5ec1(0x37d)](_0x2890f4);break;case _0x1b5ec1(0x2b3):this[_0x1b5ec1(0x3cb)]=$gameParty[_0x1b5ec1(0x3d3)]()[_0x2890f4-0x1];break;case _0x1b5ec1(0x22a):this['_autoPositionTarget']=$gameTroop[_0x1b5ec1(0x3d3)]()[_0x2890f4-0x1];break;case _0x1b5ec1(0x265):this[_0x1b5ec1(0x3cb)]=$gamePlayer;break;case _0x1b5ec1(0x123):const _0x1ba407=$gameActors[_0x1b5ec1(0x37d)](_0x2890f4)[_0x1b5ec1(0x1b0)]();_0x1ba407===0x0?_0x1b5ec1(0x381)!==_0x1b5ec1(0x381)?_0x2c02e9=_0xe59238[_0x1b5ec1(0x14d)]():this[_0x1b5ec1(0x3cb)]=$gamePlayer:this[_0x1b5ec1(0x3cb)]=$gamePlayer[_0x1b5ec1(0x101)]()[_0x1b5ec1(0x314)](_0x1ba407-0x1);break;case _0x1b5ec1(0x323):_0x2890f4===0x1?_0x1b5ec1(0x18a)!==_0x1b5ec1(0x316)?this['_autoPositionTarget']=$gamePlayer:this[_0x1b5ec1(0x2ea)]=_0x115074[_0x1b5ec1(0x241)](_0xb73f49):this['_autoPositionTarget']=$gamePlayer['followers']()[_0x1b5ec1(0x314)](_0x2890f4-0x2);break;case _0x1b5ec1(0x22f):this[_0x1b5ec1(0x3cb)]=$gameMap[_0x1b5ec1(0x2ee)](_0x2890f4);break;}this['_autoPositionTarget']&&this['updateAutoPosition']();},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x37a)]=Window_Message[_0x1f0508(0x198)][_0x1f0508(0x332)],Window_Message['prototype'][_0x1f0508(0x332)]=function(){const _0x5b78d0=_0x1f0508;this['updateAutoPosition'](),VisuMZ['MessageCore'][_0x5b78d0(0x37a)][_0x5b78d0(0x176)](this);},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x1ce)]=function(){const _0x41f5cc=_0x1f0508;if(!this[_0x41f5cc(0x3cb)])return;const _0x2153d8=SceneManager[_0x41f5cc(0x25b)];if(!_0x2153d8)return;if(!_0x2153d8[_0x41f5cc(0x214)])return;const _0x574a96=_0x2153d8[_0x41f5cc(0x214)][_0x41f5cc(0x2f8)](this[_0x41f5cc(0x3cb)]);if(!_0x574a96)return;let _0x4a394a=_0x574a96['x'];_0x4a394a-=this['width']/0x2,_0x4a394a-=(Graphics[_0x41f5cc(0x1d0)]-Graphics[_0x41f5cc(0x286)])/0x2,_0x4a394a+=this[_0x41f5cc(0x29b)]();let _0x49b127=_0x574a96['y'];_0x49b127-=this[_0x41f5cc(0x36b)],_0x49b127-=(Graphics[_0x41f5cc(0x36b)]-Graphics[_0x41f5cc(0x3a4)])/0x2,_0x49b127+=this['autoPositionOffsetY'](),_0x49b127-=_0x574a96[_0x41f5cc(0x36b)]+0x8;const _0x426535=$gameSystem[_0x41f5cc(0x1e3)]();_0x4a394a+=_0x426535['x'],_0x49b127+=_0x426535['y'],this['x']=Math[_0x41f5cc(0x365)](_0x4a394a),this['y']=Math[_0x41f5cc(0x365)](_0x49b127),this[_0x41f5cc(0x321)](!![],![]),this[_0x41f5cc(0x238)]=this['_forcedPosition']||{},this[_0x41f5cc(0x238)]['x']=this['x'],this[_0x41f5cc(0x238)]['y']=this['y'],this[_0x41f5cc(0x238)][_0x41f5cc(0x1d0)]=this[_0x41f5cc(0x1d0)],this[_0x41f5cc(0x238)][_0x41f5cc(0x36b)]=this[_0x41f5cc(0x36b)],this[_0x41f5cc(0x1f1)][_0x41f5cc(0x306)]();},Window_Message[_0x1f0508(0x198)][_0x1f0508(0x29b)]=function(){return 0x0;},Window_Message['prototype'][_0x1f0508(0x1c3)]=function(){return 0x0;},Window_Message[_0x1f0508(0x198)]['messagePositionReset']=function(){const _0x146939=_0x1f0508;this[_0x146939(0x246)]=![],this['_autoPositionTarget']=undefined,$gameSystem['initMessageCore'](),this[_0x146939(0x1f6)](),this[_0x146939(0x32d)]=0x0;},Window_Message['prototype']['preConvertEscapeCharacters']=function(_0x5754da){const _0x4527e6=_0x1f0508;return Window_Base[_0x4527e6(0x198)][_0x4527e6(0x154)][_0x4527e6(0x176)](this,_0x5754da);},Window_Message[_0x1f0508(0x198)]['postConvertEscapeCharacters']=function(_0x3fb1ef){const _0x54d093=_0x1f0508;return Window_Base[_0x54d093(0x198)][_0x54d093(0x28c)][_0x54d093(0x176)](this,_0x3fb1ef);},Window_Message['prototype'][_0x1f0508(0x209)]=function(_0x441eef){const _0x4c0bae=_0x1f0508;this[_0x4c0bae(0x135)](_0x441eef),Window_Base['prototype'][_0x4c0bae(0x209)][_0x4c0bae(0x176)](this,_0x441eef),this[_0x4c0bae(0x1b5)](_0x441eef);},Window_Message['prototype'][_0x1f0508(0x135)]=function(_0x3113b3){},Window_Message['prototype']['postFlushTextState']=function(_0x2975c6){},Window_NameBox[_0x1f0508(0x198)]['isAutoColorAffected']=function(){return![];},Window_NameBox['prototype'][_0x1f0508(0x2cb)]=function(){const _0x5de6cc=_0x1f0508;Window_Base[_0x5de6cc(0x198)]['resetTextColor']['call'](this),this[_0x5de6cc(0x340)](this[_0x5de6cc(0x194)]());},Window_NameBox[_0x1f0508(0x198)]['defaultColor']=function(){const _0x23440c=_0x1f0508,_0x192b67=VisuMZ['MessageCore'][_0x23440c(0x311)][_0x23440c(0x13d)]['NameBoxWindowDefaultColor'];return ColorManager['textColor'](_0x192b67);},VisuMZ['MessageCore']['Window_NameBox_updatePlacement']=Window_NameBox['prototype'][_0x1f0508(0x306)],Window_NameBox['prototype'][_0x1f0508(0x306)]=function(){const _0x1ab164=_0x1f0508;VisuMZ['MessageCore']['Window_NameBox_updatePlacement'][_0x1ab164(0x176)](this),this[_0x1ab164(0x2aa)](),this['updateOffsetPosition'](),this[_0x1ab164(0x321)](),this[_0x1ab164(0x2b6)]();},Window_NameBox[_0x1f0508(0x198)][_0x1f0508(0x154)]=function(_0x4ed733){const _0x420fed=_0x1f0508;return _0x4ed733=_0x4ed733[_0x420fed(0x3c8)](/<LEFT>/gi,this['setRelativePosition'][_0x420fed(0x16e)](this,0x0)),_0x4ed733=_0x4ed733[_0x420fed(0x3c8)](/<CENTER>/gi,this[_0x420fed(0x1cb)]['bind'](this,0x5)),_0x4ed733=_0x4ed733[_0x420fed(0x3c8)](/<RIGHT>/gi,this[_0x420fed(0x1cb)][_0x420fed(0x16e)](this,0xa)),_0x4ed733=_0x4ed733['replace'](/<POSITION:[ ](\d+)>/gi,(_0x2e3c4f,_0x35c40d)=>this[_0x420fed(0x1cb)](parseInt(_0x35c40d))),_0x4ed733=_0x4ed733['replace'](/<\/LEFT>/gi,''),_0x4ed733=_0x4ed733[_0x420fed(0x3c8)](/<\/CENTER>/gi,''),_0x4ed733=_0x4ed733[_0x420fed(0x3c8)](/<\/RIGHT>/gi,''),Window_Base[_0x420fed(0x198)][_0x420fed(0x154)][_0x420fed(0x176)](this,_0x4ed733);},Window_NameBox[_0x1f0508(0x198)][_0x1f0508(0x1cb)]=function(_0x5c00cc){const _0x46bc2d=_0x1f0508;return this[_0x46bc2d(0x347)]=_0x5c00cc,'';},Window_NameBox[_0x1f0508(0x198)][_0x1f0508(0x2aa)]=function(){const _0x2fe21d=_0x1f0508;if($gameMessage[_0x2fe21d(0x164)]())return;this['_relativePosition']=this[_0x2fe21d(0x347)]||0x0;const _0x2434b3=this[_0x2fe21d(0x1aa)],_0x2df5bc=Math[_0x2fe21d(0x11a)](_0x2434b3[_0x2fe21d(0x1d0)]*this['_relativePosition']/0xa);this['x']=_0x2434b3['x']+_0x2df5bc-Math['floor'](this[_0x2fe21d(0x1d0)]/0x2),this['x']=this['x']['clamp'](_0x2434b3['x'],_0x2434b3['x']+_0x2434b3[_0x2fe21d(0x1d0)]-this[_0x2fe21d(0x1d0)]);},Window_NameBox[_0x1f0508(0x198)][_0x1f0508(0x184)]=function(){const _0x285b1b=_0x1f0508;if($gameMessage[_0x285b1b(0x164)]())return;this['_relativePosition']=this[_0x285b1b(0x347)]||0x0;const _0x568247=VisuMZ['MessageCore'][_0x285b1b(0x311)][_0x285b1b(0x13d)][_0x285b1b(0x3c9)],_0x32cace=VisuMZ[_0x285b1b(0x226)]['Settings'][_0x285b1b(0x13d)]['NameBoxWindowOffsetY'],_0x1b8c43=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x285b1b(0x11a)](_0x568247*_0x1b8c43),this['y']+=_0x32cace;},Window_NameBox[_0x1f0508(0x198)][_0x1f0508(0x2b6)]=function(){const _0x484813=_0x1f0508,_0x1b8c48=this[_0x484813(0x1aa)],_0x1bf3cf=_0x1b8c48['y'],_0xdb4fc1=VisuMZ[_0x484813(0x226)][_0x484813(0x311)]['General'][_0x484813(0x24c)];if(_0x1bf3cf>this['y']&&_0x1bf3cf<this['y']+this['height']-_0xdb4fc1){if(_0x484813(0x3ae)!==_0x484813(0x2bb))this['y']=_0x1b8c48['y']+_0x1b8c48[_0x484813(0x36b)];else{const _0x2d3c6f=_0x242b22[_0x484813(0x36f)]||0x0;if(_0x2d3c6f>0x0)this[_0x484813(0x350)](_0x2d3c6f);}}},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x236)]=Window_NameBox['prototype'][_0x1f0508(0x2da)],Window_NameBox[_0x1f0508(0x198)][_0x1f0508(0x2da)]=function(){const _0x4001c2=_0x1f0508;this[_0x4001c2(0x347)]=0x0,VisuMZ[_0x4001c2(0x226)][_0x4001c2(0x236)]['call'](this);},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x217)]=function(){return![];},Window_ChoiceList[_0x1f0508(0x198)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x270)]=function(){return $gameSystem['getChoiceListLineHeight']()+0x8;},Window_ChoiceList['prototype'][_0x1f0508(0x1d1)]=function(){const _0xdd61da=_0x1f0508;return $gameSystem[_0xdd61da(0x212)]();},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x1be)]=function(){const _0x3769e9=_0x1f0508;this[_0x3769e9(0x2da)](),this[_0x3769e9(0x275)](),this[_0x3769e9(0x2a3)](),this[_0x3769e9(0x127)]();},Window_ChoiceList['prototype']['refresh']=function(){const _0x1ed234=_0x1f0508;this[_0x1ed234(0x1e6)](),this[_0x1ed234(0x39c)](),this['_messageWindow']&&(this[_0x1ed234(0x306)](),this[_0x1ed234(0x2e4)]()),this[_0x1ed234(0x2a9)](),this[_0x1ed234(0x358)](),this[_0x1ed234(0x243)](),Window_Selectable[_0x1ed234(0x198)]['refresh']['call'](this);},Window_ChoiceList['prototype'][_0x1f0508(0x39c)]=function(){const _0x2bff44=_0x1f0508,_0x2be592=$gameMessage[_0x2bff44(0x2a8)]();let _0x17bc52=0x0;for(let _0x3512a7 of _0x2be592){if('TZqco'===_0x2bff44(0x3bb)){_0x3512a7=this['convertChoiceMacros'](_0x3512a7);if(this['isChoiceVisible'](_0x3512a7)){if('ClBRV'===_0x2bff44(0x399)){const _0x3303d2=this['parseChoiceText'](_0x3512a7),_0x27985d=this[_0x2bff44(0x102)](_0x3512a7);this['addCommand'](_0x3303d2,'choice',_0x27985d,_0x17bc52);}else return this['registerActorNameAutoColorChanges'](),_0x242e0a;}_0x17bc52++;}else this['changeValue'](_0xc48897,_0x58158b[_0x2bff44(0x218)](0x1,0xb));}},Window_ChoiceList['prototype'][_0x1f0508(0x161)]=function(_0x148aa7){const _0xe3efae=_0x1f0508;return Window_Base[_0xe3efae(0x198)]['convertTextMacros'][_0xe3efae(0x176)](this,_0x148aa7);},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x172)]=function(_0xc7d948){const _0xaaa871=_0x1f0508;if(Imported[_0xaaa871(0x23c)])$gameMessage[_0xaaa871(0x1bc)]();if(_0xc7d948['match'](/<HIDE>/i))return![];if(_0xc7d948[_0xaaa871(0x267)](/<SHOW>/i))return!![];if(_0xc7d948[_0xaaa871(0x267)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x10dbb8=RegExp['$1'][_0xaaa871(0x3b0)](',')[_0xaaa871(0x12f)](_0x5aaab=>Number(_0x5aaab)||0x0);for(const _0x5a4ee3 of _0x10dbb8){if(_0xaaa871(0x1ed)===_0xaaa871(0x1ed)){if(!$gameSwitches[_0xaaa871(0x2ad)](_0x5a4ee3))return![];}else this[_0xaaa871(0x318)](this[_0xaaa871(0x2ea)]['x'],this['_resetRect']['y'],this[_0xaaa871(0x2ea)][_0xaaa871(0x1d0)],this[_0xaaa871(0x2ea)]['height'],_0x44f4ad,_0x4ef464);}return!![];}if(_0xc7d948['match'](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2d90c0=RegExp['$1'][_0xaaa871(0x3b0)](',')['map'](_0x11b608=>Number(_0x11b608)||0x0);for(const _0x27b0a1 of _0x2d90c0){if(_0xaaa871(0x38b)!==_0xaaa871(0x38b))return 0x4;else{if(!$gameSwitches[_0xaaa871(0x2ad)](_0x27b0a1))return![];}}return!![];}if(_0xc7d948['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x58c7b7=RegExp['$1']['split'](',')[_0xaaa871(0x12f)](_0x4ff9ae=>Number(_0x4ff9ae)||0x0);for(const _0x447e51 of _0x58c7b7){if($gameSwitches[_0xaaa871(0x2ad)](_0x447e51))return!![];}return![];}if(_0xc7d948[_0xaaa871(0x267)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5c12b7=RegExp['$1'][_0xaaa871(0x3b0)](',')[_0xaaa871(0x12f)](_0x7835d5=>Number(_0x7835d5)||0x0);for(const _0x2efe85 of _0x5c12b7){if(!$gameSwitches[_0xaaa871(0x2ad)](_0x2efe85))return!![];}return![];}if(_0xc7d948[_0xaaa871(0x267)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0xaaa871(0x27e)===_0xaaa871(0x27e)){const _0x3fbe90=RegExp['$1'][_0xaaa871(0x3b0)](',')[_0xaaa871(0x12f)](_0x2a42bc=>Number(_0x2a42bc)||0x0);for(const _0x14bf7f of _0x3fbe90){if(!$gameSwitches['value'](_0x14bf7f))return!![];}return![];}else{if(_0x235214==='textSpeed')return!![];return _0xf5f494[_0xaaa871(0x226)][_0xaaa871(0x16d)][_0xaaa871(0x176)](this,_0x2fce75);}}if(_0xc7d948[_0xaaa871(0x267)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x2fb609=RegExp['$1']['split'](',')[_0xaaa871(0x12f)](_0xd47ebf=>Number(_0xd47ebf)||0x0);for(const _0x77d6d4 of _0x2fb609){if($gameSwitches['value'](_0x77d6d4))return![];}return!![];}return!![];},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x2c0)]=function(_0x5ed4e3){const _0x3de727=_0x1f0508;let _0x721c48=_0x5ed4e3;return _0x721c48=_0x721c48[_0x3de727(0x3c8)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x721c48=_0x721c48[_0x3de727(0x3c8)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x721c48;},Window_ChoiceList['prototype']['isChoiceEnabled']=function(_0x211934){const _0x4efaec=_0x1f0508;if(Imported[_0x4efaec(0x23c)])$gameMessage['registerSelfEvent']();if(_0x211934['match'](/<DISABLE>/i))return![];if(_0x211934[_0x4efaec(0x267)](/<ENABLE>/i))return!![];if(_0x211934['match'](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x196011=RegExp['$1']['split'](',')[_0x4efaec(0x12f)](_0x1e27ab=>Number(_0x1e27ab)||0x0);for(const _0x361e17 of _0x196011){if(!$gameSwitches[_0x4efaec(0x2ad)](_0x361e17))return![];}return!![];}if(_0x211934[_0x4efaec(0x267)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x51a3ed=RegExp['$1'][_0x4efaec(0x3b0)](',')[_0x4efaec(0x12f)](_0x3da1e6=>Number(_0x3da1e6)||0x0);for(const _0x4cd18e of _0x51a3ed){if(_0x4efaec(0x1c8)!=='zpxvE'){if(!$gameSwitches['value'](_0x4cd18e))return![];}else this[_0x4efaec(0x1c0)]=_0x2a2d04[_0x4efaec(0x221)],this[_0x4efaec(0x304)]=_0x33353c[_0x4efaec(0x299)];}return!![];}if(_0x211934[_0x4efaec(0x267)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4efaec(0x192)!=='oqzVO'){const _0x4ec4ab=RegExp['$1'][_0x4efaec(0x3b0)](',')[_0x4efaec(0x12f)](_0x1f7c95=>Number(_0x1f7c95)||0x0);for(const _0x4f24c8 of _0x4ec4ab){if(_0x4efaec(0x324)!==_0x4efaec(0x324))return _0x4a7dde=_0x4ee697[_0x4efaec(0x3c8)](/<LEFT>/gi,this[_0x4efaec(0x1cb)]['bind'](this,0x0)),_0x1f9c99=_0x1a01dc['replace'](/<CENTER>/gi,this[_0x4efaec(0x1cb)]['bind'](this,0x5)),_0x55750c=_0x11bc5d[_0x4efaec(0x3c8)](/<RIGHT>/gi,this[_0x4efaec(0x1cb)]['bind'](this,0xa)),_0x41a3bf=_0x269f74['replace'](/<POSITION:[ ](\d+)>/gi,(_0x2bbac3,_0x2401f7)=>this['setRelativePosition'](_0x4719c7(_0x2401f7))),_0x535826=_0x56a278[_0x4efaec(0x3c8)](/<\/LEFT>/gi,''),_0x3ec264=_0x406b59[_0x4efaec(0x3c8)](/<\/CENTER>/gi,''),_0x223bc1=_0x1d3311[_0x4efaec(0x3c8)](/<\/RIGHT>/gi,''),_0x2514eb[_0x4efaec(0x198)]['preConvertEscapeCharacters'][_0x4efaec(0x176)](this,_0x4b3326);else{if($gameSwitches[_0x4efaec(0x2ad)](_0x4f24c8))return!![];}}return![];}else return this[_0x4efaec(0x18c)](_0x1ed90d,!![],!![]),this[_0x4efaec(0x355)](_0x4efaec(0x123),_0x5661b2(_0x541a59)||0x1),'';}if(_0x211934['match'](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4efaec(0x29a)!==_0x4efaec(0x205)){const _0x3a7de=RegExp['$1']['split'](',')[_0x4efaec(0x12f)](_0x328fa4=>Number(_0x328fa4)||0x0);for(const _0x55e274 of _0x3a7de){if(_0x4efaec(0x1a3)!==_0x4efaec(0x1a3)){this[_0x4efaec(0x39d)](_0x43f08a);if(this[_0x4efaec(0x179)]())return;_0x362c2e[_0x4efaec(0x18f)]&&(this[_0x4efaec(0x27a)]=this['_textColorStack']||[],this[_0x4efaec(0x2e8)][_0x4efaec(0x3ba)]=this[_0x4efaec(0x27a)][_0x4efaec(0x28b)]()||_0x18d86a[_0x4efaec(0x149)]());}else{if(!$gameSwitches['value'](_0x55e274))return!![];}}return![];}else{_0xcb5c2e['ConvertParams'](_0x2a0831,_0x545020);const _0x2e852d=_0x5dd93f[_0x4efaec(0x167)]||_0x4fa37d[_0x4efaec(0x143)]()||0x1,_0x3559f8=_0x543213['MaxRows']||_0x38b306[_0x4efaec(0x1ea)]()||0x1,_0x1672a2=_0x42a77e['MaxCols']||_0x29f5f4[_0x4efaec(0x212)]()||0x1,_0x1b9e6c=_0x31da89[_0x4efaec(0x1c4)][_0x4efaec(0x199)]()||'default';_0x53ade5[_0x4efaec(0x2d5)](_0x2e852d),_0x4f7560['setChoiceListMaxRows'](_0x3559f8),_0x914094['setChoiceListMaxColumns'](_0x1672a2),_0x21f9eb['setChoiceListTextAlign'](_0x1b9e6c);}}if(_0x211934['match'](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x1b4484=RegExp['$1'][_0x4efaec(0x3b0)](',')[_0x4efaec(0x12f)](_0x1364bd=>Number(_0x1364bd)||0x0);for(const _0x50f311 of _0x1b4484){if(!$gameSwitches[_0x4efaec(0x2ad)](_0x50f311))return!![];}return![];}if(_0x211934[_0x4efaec(0x267)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x4efaec(0x2a4)!==_0x4efaec(0x2a4)){let _0x519f5d=_0x1ced6c[_0x4efaec(0x1d6)](_0x313380[_0x4efaec(0x36b)]/this['lineHeight']());_0x3dfe9f['setMessageWindowRows'](_0x519f5d);}else{const _0x37c61d=RegExp['$1'][_0x4efaec(0x3b0)](',')[_0x4efaec(0x12f)](_0x2b51a0=>Number(_0x2b51a0)||0x0);for(const _0x2a2dd3 of _0x37c61d){if($gameSwitches[_0x4efaec(0x2ad)](_0x2a2dd3))return![];}return!![];}}return!![];},VisuMZ['MessageCore']['Window_ChoiceList_updatePlacement']=Window_ChoiceList[_0x1f0508(0x198)]['updatePlacement'],Window_ChoiceList['prototype'][_0x1f0508(0x306)]=function(){const _0x2216f0=_0x1f0508;VisuMZ['MessageCore'][_0x2216f0(0x30c)][_0x2216f0(0x176)](this),this['clampPlacementPosition']();},Window_ChoiceList['prototype']['placeCancelButton']=function(){const _0x5c56fc=_0x1f0508;if(!this[_0x5c56fc(0x2fa)])return;const _0x53ff50=0x8,_0x647dd7=this[_0x5c56fc(0x2fa)],_0x2f2acb=this['x']+this['width'],_0x1de725=Math[_0x5c56fc(0x11a)]((Graphics[_0x5c56fc(0x1d0)]-Graphics[_0x5c56fc(0x286)])/0x2);if(_0x2f2acb>=Graphics[_0x5c56fc(0x286)]+_0x1de725-_0x647dd7['width']+_0x53ff50)_0x647dd7['x']=-_0x647dd7[_0x5c56fc(0x1d0)]-_0x53ff50;else{if(_0x5c56fc(0x26a)===_0x5c56fc(0x26a))_0x647dd7['x']=this[_0x5c56fc(0x1d0)]+_0x53ff50;else return![];}_0x647dd7['y']=this[_0x5c56fc(0x36b)]/0x2-_0x647dd7[_0x5c56fc(0x36b)]/0x2;},VisuMZ[_0x1f0508(0x226)][_0x1f0508(0x35b)]=Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x215)],Window_ChoiceList['prototype'][_0x1f0508(0x215)]=function(){const _0x3542eb=_0x1f0508;if(this[_0x3542eb(0x1aa)])return this[_0x3542eb(0x22c)]();else{if('LVRmb'===_0x3542eb(0x398))return VisuMZ[_0x3542eb(0x226)]['Window_ChoiceList_windowX'][_0x3542eb(0x176)](this);else{const _0x1462a3=_0x8dab08[_0x3542eb(0x30e)](_0x8f09cf['width'],_0x2158a9[_0x3542eb(0x25f)]()),_0x4f5136=_0x127002[_0x3542eb(0x33a)](),_0xedc6ad=this[_0x3542eb(0x2ba)](_0x4f5136,![]),_0x529f3d=(_0x573a2e[_0x3542eb(0x286)]-_0x1462a3)/0x2,_0x3bf70f=0x0;return new _0x29a722(_0x529f3d,_0x3bf70f,_0x1462a3,_0xedc6ad);}}},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x22c)]=function(){const _0x10442a=_0x1f0508,_0x1e5e0e=$gameMessage[_0x10442a(0x2d1)]();if(_0x1e5e0e===0x1)return(Graphics[_0x10442a(0x286)]-this['windowWidth']())/0x2;else{if(_0x1e5e0e===0x2){if(_0x10442a(0x287)!=='jBIBb')this[_0x10442a(0x188)](![]);else return this[_0x10442a(0x1aa)]['x']+this['_messageWindow'][_0x10442a(0x1d0)]-this['windowWidth']();}else return this['_messageWindow']['x'];}},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x25d)]=function(){const _0x385e50=_0x1f0508,_0x33d034=(this[_0x385e50(0x1fe)]()+this[_0x385e50(0x3b9)]())*this[_0x385e50(0x1d1)]()+this[_0x385e50(0x220)]*0x2;return Math[_0x385e50(0x30e)](_0x33d034,Graphics[_0x385e50(0x1d0)]);},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x1fb)]=function(){const _0x2e62d3=_0x1f0508,_0x437b3b=$gameMessage[_0x2e62d3(0x2a8)]()['map'](_0x5ee36d=>this[_0x2e62d3(0x161)](_0x5ee36d))[_0x2e62d3(0x364)](_0x587464=>this['isChoiceVisible'](_0x587464)),_0x515528=Math[_0x2e62d3(0x1d6)](_0x437b3b[_0x2e62d3(0x2a7)]/this[_0x2e62d3(0x1d1)]());return Math[_0x2e62d3(0x19b)](0x1,Math[_0x2e62d3(0x30e)](_0x515528,this[_0x2e62d3(0x2e9)]()));},Window_ChoiceList[_0x1f0508(0x198)]['maxLines']=function(){const _0x990d2=_0x1f0508,_0x218f7b=this['_messageWindow'],_0x4ed5fd=_0x218f7b?_0x218f7b['y']:0x0,_0x4e92e7=_0x218f7b?_0x218f7b[_0x990d2(0x36b)]:0x0,_0x5630b0=Graphics[_0x990d2(0x3a4)]/0x2;if(_0x4ed5fd<_0x5630b0&&_0x4ed5fd+_0x4e92e7>_0x5630b0)return 0x4;else{if(_0x990d2(0x250)==='xrSQG')_0x4bad22=_0x2cc369['replace'](/\\V\[(\d+)\]/gi,(_0x3ac753,_0x166462)=>this[_0x990d2(0x3c1)](_0x2d687e(_0x3c0103[_0x990d2(0x2ad)](_0x12d83a(_0x166462)))));else return $gameSystem[_0x990d2(0x1ea)]();}},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x1fe)]=function(){const _0x322869=_0x1f0508;let _0x279811=this['getStartingChoiceWidth']();for(const _0x268d41 of this[_0x322869(0x36a)]){if('Jkdwk'!==_0x322869(0x247)){const _0x38ab05=_0x268d41[_0x322869(0x112)],_0x323bed=this['getChoiceIndent'](_0x38ab05),_0x3915a5=this['textSizeEx'](_0x38ab05)[_0x322869(0x1d0)]+_0x323bed,_0x529c24=Math[_0x322869(0x1d6)](_0x3915a5)+this[_0x322869(0x16c)]()*0x2;_0x279811=Math['max'](_0x279811,_0x529c24);}else{const _0x325576=this[_0x322869(0x1a9)](_0x1c052d,0x0,0x0,0x0),_0x2e0e14=this['getPreservedFontSettings']();return _0x325576[_0x322869(0x18f)]=![],this[_0x322869(0x188)](![]),this[_0x322869(0x3d5)](_0x325576),this[_0x322869(0x188)](!![]),this['returnPreservedFontSettings'](_0x2e0e14),{'width':_0x325576[_0x322869(0x157)],'height':_0x325576[_0x322869(0x19f)]};}}return _0x279811;},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x1c7)]=function(){const _0x552cbb=_0x1f0508;let _0xcf9444=0x60;const _0x407bb1=$gameMessage[_0x552cbb(0x2a8)]();for(const _0x4a18b1 of _0x407bb1){if(_0x552cbb(0x2c7)===_0x552cbb(0x282)){const _0x417ea4={'x':this['x'],'y':this['y']};_0x281762[_0x552cbb(0x198)]['updateMove'][_0x552cbb(0x176)](this),this[_0x552cbb(0x3c5)](_0x417ea4);}else _0x4a18b1[_0x552cbb(0x267)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x552cbb(0x320)!==_0x552cbb(0x1ac)?_0xcf9444=Math['max'](_0xcf9444,Number(RegExp['$1'])):this[_0x552cbb(0x1d5)]());}return _0xcf9444;},Window_ChoiceList[_0x1f0508(0x198)][_0x1f0508(0x284)]=function(_0x563af5){const _0xa63878=_0x1f0508,_0x45e551=this[_0xa63878(0x360)](_0x563af5),_0x3bf402=$gameSystem[_0xa63878(0x285)]()!==_0xa63878(0x2d0)?_0xa63878(0x141)[_0xa63878(0x293)]($gameSystem[_0xa63878(0x285)]()):'',_0x2f3c94=_0x3bf402+this[_0xa63878(0x3c3)](_0x563af5);this['changePaintOpacity'](this['isCommandEnabled'](_0x563af5));const _0x3b8ca4=this[_0xa63878(0x39e)](_0x2f3c94)[_0xa63878(0x36b)],_0x54cc3a=_0x45e551['x']+this[_0xa63878(0x20d)](_0x2f3c94),_0x459551=Math['max'](_0x45e551['y'],_0x45e551['y']+Math['round']((_0x45e551['height']-_0x3b8ca4)/0x2));this[_0xa63878(0x302)](_0x2f3c94,_0x54cc3a,_0x459551,_0x45e551[_0xa63878(0x1d0)]);},Window_ChoiceList['prototype'][_0x1f0508(0x20d)]=function(_0x219cc2){const _0x5ba42e=_0x1f0508;let _0x153cc8=0x0;return _0x219cc2[_0x5ba42e(0x267)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x153cc8=Number(RegExp['$1'])),_0x153cc8;},Window_ChoiceList[_0x1f0508(0x198)]['callOkHandler']=function(){const _0x13e6c5=_0x1f0508;$gameMessage[_0x13e6c5(0x2a6)](this[_0x13e6c5(0x180)]()),this[_0x13e6c5(0x1aa)][_0x13e6c5(0x1b4)](),this[_0x13e6c5(0x3b8)]();};