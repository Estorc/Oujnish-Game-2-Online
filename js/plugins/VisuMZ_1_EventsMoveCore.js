//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.23] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x1454=['posNt','width','FollowerSetGlobalChase','Step2EventId','LYKsG','_spriteOffsetY','kXozv','RandomMoveWeight','addChild','jYxgp','Game_Event_refresh','setAllowEventAutoMovement','parse','BalloonOffsetY','clearEventCache','isLandOk','updateOpacity','Game_Map_event','BoatSpeed','fontSize','_moveSpeed','create','setFrame','metCPC','setupSaveEventLocations','Sprite_Balloon_setup','Game_Map_parallelCommonEvents','requestAnimation','processMoveSynchRandom','_selfEvent','CDTqA','uPYHj','StpJI','Game_Map_update','ocPHn','_chaseOff','onCancel','startMessage','reverseDir','BULB','processMoveRouteMoveRepeat','startMapCommonEventOnOK','tszbb','parallelCommonEvents','activationProximityDistance','_characterName','updateBitmapSmoothing','turnAwayFromPoint','isPlaytest','_scene','prepareSpawnedEventAtRegion','opacitySpeed','_counter','COLLAPSE','setTileBitmap','AiFiU','OFF','Toggle','setDestination','setWaitMode','EventTimerFramesSet','column','deltaX','abs','default','OePkQ','start','PostCopyJS','correctFacingDirection','Speed','_eventOverloadThreshold','tuaeA','hasClickTrigger','addLoadListener','initEventsMoveCore','_needsPeriodicRefresh','setupCopyEvent','Step2Preserve','bmasp','hYwHv','_paused','isDashing','_EventsMoveCoreSettings','fittingHeight','increaseSteps','prepareSpawnedEventAtTerrainTag','canMove','Game_CharacterBase_screenX','xzFIc','loadSystem','AnFbB','setDirection','convertSelfVariableValuesInScriptCall','ConvertParams','setupMorphEvent','CustomPageConditions','labelWindowRange','Game_Troop_meetsConditions','vbPMy','processMoveSynchReverseMimic','clearDestination','target','executeCommand','PlayerMovementChange','WalkForbid','hasAdvancedSwitchVariable','_labelWindows','setFrames','reverse','bind','UhwkO','Game_Interpreter_PluginCommand','visible','checkEventTriggerThere','DiagonalSpeedMultiplier','meetsConditions','isBusy','template','IconIndex','Game_CharacterBase_realMoveSpeed','EEQIy','tLdzr','NmCPX','531007dShrFF','NUM','onDatabaseLoaded','zMfbl','_interpreter','_eventLabelOffsetY','Game_CharacterBase_isDashing','SPIN\x20CLOCKWISE','XfUJG','makeDeepCopy','loadDataFile','textSizeEx','EnableDashTilt','opacity','isInVehicle','getPosingCharacterDirection','clearSpriteOffsets','iconSize','_callEventData','hasEventIcon','updateMoveSynch','RHPyH','_eventCache','startCallEvent','BalloonOffsetX','EventLocationSave','setCharacterBitmap','CallEvent','timer','createContents','221365JIZqyk','FollowerSetTargetChase','Game_Player_increaseSteps','advancedValue','jHOxI','6frOjWP','requestBalloon','distance','YIRPR','STRUCT','iconIndex','text','Ship','_forceCarrying','checkEventTriggerEventsMoveCore','updateMove','UPPER\x20RIGHT','setOpacity','clearPose','_regionRules','autoEventIconBuffer','code','characterName','isRegionDockable','convertVariableValuesInScriptCall','processMoveSynchCustom','LOWER\x20LEFT','vert\x20mirror','%1Allow','lastMovedDirection','bitmap','SelfVariableID','Scene_Load_onLoadSuccess','IconSize','firstSpawnedEvent','Game_Timer_initialize','region','Game_Temp_setDestination','USER-DEFINED\x204','_alwaysUpdateMove','isShadowVisible','Region%1','findProperPageIndex','_forceDashing','onOk','PosY','processMoveRouteSelfSwitch','isMoveOnlyRegionPassable','jdLpi','siRLA','Game_Vehicle_isLandOk','removeTemporaryMapSpawnedEvents','hdEUZ','roundXWithDirection','createSpawnedEvent','setupPageSettings','spriteId','_selfTargetNumberInput','Window_Message_startMessage','refreshIfNeeded','Game_Troop_meetsConditionsCPC','Map%1.json','Game_Character_setMoveRoute','checkRegionEventTrigger','PlayerAllow','none','roundY','return\x200','clamp','isJumping','isRegionAllowPass','despawnEverything','_reflection','LhNYA','_moveRoute','StopAutoMoveMessages','_addedHitbox','EventTimerExpireClear','Map%1-Event%2','yZymh','conditions','PtkjU','TerrainTag','_eventCopyData','RegionTouch','Game_Map_events','Boat','Iatgi','Letter','EventsMoveCore','LIGHT','length','checkEventTriggerAuto','QUESTION','CaIgW','needsUpdate','TerrainTags','ShowShadows','SpawnEventDespawnEverything','bnyNU','mirror\x20horizontal','SILENCE','EventTimerResume','FollowerID','isDashingAndMoving','getDirectionToPoint','AdvancedSwitches','forceDashing','Game_Interpreter_executeCommand','XCqGS','COBWEB','_periodicRefreshTimer','toLowerCase','EXCLAMATION','Game_Event_checkEventTriggerAuto','initFollowerController','SpawnEventAtXY','KPkRO','registerCommand','_moveRouteIndex','Game_Interpreter_character','LIGHT-BULB','setEventLabelsVisible','moveAwayFromCharacter','krrcz','processMoveRouteFadeIn','qKYhk','KvqbC','TargetSwitchId','BPdYi','executeMoveDir8','MapID','processDrawIcon','bBeuo','uKiWm','bXgSM','Walk','_cpc','zoomScale','variables','Game_CharacterBase_setDirection','getMapSpawnedEventData','_eventScreenY','status','isTile','processMoveRouteStepFrom','_patternLocked','isAdvancedSwitch','createLabelWindowForTarget','_pattern','MorphEventRemove','findDiagonalDirectionTo','VisuMZ_2_DragonbonesUnion','findDirectionTo','_DisablePlayerControl','_randomHomeY','determineCommonEventsWithCPC','Game_Player_checkEventTriggerThere','AdvancedVariables','selfValue','smooth','isDashingEnabled','_type','turnTowardPoint','Game_Event_updateParallel','isNormalPriority','EVAL','contents','uxKds','Event','VisuMZ_Setup_Preload_Map','KAxEE','deletePreservedMorphEventDataKey','Region','Stop','Game_Event_moveTypeRandom','AutoBuffer','_saveEventLocations','_selfTargetItemChoice','setDashingEnabled','getPose','YMsTQ','parent','CEaZb','$callEventMap','setMovementSuccess','processMoveRouteMoveUntilStop','_callEventMap','forceCarrying','processMoveCommandEventsMoveCore','CommonEventID','SPIN\x20ANTICLOCKWISE','setSelfValue','Game_Character_processMoveCommand','MoveRouteIndex','rotation','AutoBalloon','pos','Game_CharacterBase_moveStraight','refresh','moveSynchTarget','updateWaitMode','Airship','anchor','locate','deleteSavedEventLocationKey','isEventOverloaded','moveForward','despawnAtXY','GtHtx','oRYCt','Forbid','EventAutoMovement','setMoveSpeed','DDyZe','zmKOv','setStopFollowerChasing','meetActivationProximityConditions','_spawnPreserved','pnjGE','VisibleRange','KxROD','Game_Event_meetsConditions','SpawnEventAtRegion','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_Event_clearPageSettings','EnableDir8','setNumberInput','onLoadSuccess','FKPDZ','IconBufferY','VariableGetSelfVariableID','ARRAYSTRUCT','frameCount','Hours','mVBrc','...','character','isPassableByAnyDirection','match','_shadowGraphic','AllForbid','add','onExpire','Game_Message_setItemChoice','_eventSpawnData','Game_CharacterBase_hasStepAnime','moveSynchType','Game_Character_forceMoveRoute','setupEvents','deltaXFrom','note','KNEEL','SelfVariables','process_VisuMZ_EventsMoveCore_Switches_Variables','savePreservedMorphEventDataKey','GlzkH','_dragonbones','MtEyi','radius','initMembersEventsMoveCore','jRGQN','description','adjustDir8MovementSpeed','height','createCharacterShadow','offsetY','ijWja','lYovR','%1:%2','Operation','RIGHT\x20TO\x20LEFT','eventId','EAFAL','unlockEvent','copy','setItemChoice','splice','Template','RSZFG','prototype','isDestinationValid','remove','_PreservedEventMorphData','jump','_mapId','Scene_Boot_onDatabaseLoaded','getPosingCharacterIndex','uqDnM','processMoveRouteTeleportToCharacter','xxyeY','eKtoy','createLabelWindows','Game_CharacterBase_increaseSteps','VS8','TRUE','_eventId','MUSIC\x20NOTE','processMoveCommand','clear','VICTORY','mLSzK','Oghbb','VariableId','characterPatternY','directionOnLadderSpriteVS8dir','832557GQPLql','PageId','setValue','CxeSV','_CPCs','processMoveRouteSelfVariable','isPreventSelfMovement','WFHtJ','Sprite_Character_characterPatternY','_eventIcon','xoVyz','registerSelfTarget','sIlFG','pattern','_visibleEventX','boxWidth','fPVKQ','xBUnP','chaseCharacter','player','updateRoutineMove','slice','innerWidth','setChaseOff','WVAOt','checkEventTriggerHere','blt','ROUTE_SCRIPT','isShadowShrink','padZero','LIsRz','processMoveSynch','17veLdcG','_visiblePlayerX','processMoveSynchApproach','call','includes','Game_Enemy_meetsSwitchCondition','initEventsMoveCoreEffects','lastSpawnedEventID','isSupportDiagonalMovement','checkValidEventerMap','_eventOverload','760685ZbgcjG','Setting','getSelfTarget','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getInputDirection','filter','EventTimerExpireEvent','_lastMovedDirection','Game_CharacterBase_pattern','deleteIconsOnEventsDataKey','479762kCndQK','isMapPassable','_randomHomeX','Chase','reserveCommonEvent','VehicleAllow','_duration','event','row','drawing','wNeRt','_filename','bMefk','_MapSpawnedEventData','turnAwayFromCharacter','follower','EventTemplates','processMoveRouteStepTo','meetsSwitchCondition','_eventErased','Game_Event_setupPageSettings','NJDkK','sumcX','Preserve','IconSet','Step2MapId','regionList','Settings','dashSpeedModifier','SeHzm','SelfSwitchABCD','startEncounterEffect','BufferX','CHNGx','iqVfc','isAllowCharacterTilt','command108','deleteEventLocation','pages','toUpperCase','_saveEventLocation','EventForbid','_pose','approach','Game_Timer_onExpire','Sprite_Character_setTileBitmap','Gptyo','_eventScreenX','Step1MapId','Game_Event_initialize','Game_Map_unlockEvent','_visibleEventY','_cacheVisibility','_eventPageIndex','RABOo','EiyII','setup','_character','right','Rope','destinationY','MapId','_speed','_eventIconSprite','pageId','lastSpawnedEvent','MorphEventTo','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','value','qXkLS','WduDL','_text','isMovementSucceeded','updateParallel','updateSelfMovement','Disable','dir8','Pxxgq','uhTxO','Game_CharacterBase_screenY','BitmapSmoothing','SPIN\x20COUNTERCLOCKWISE','isSmartEventCollisionOn','DefaultShadow','List','SwitchId','events','RegionOk','BlendMode','_stopCount','LPpHH','realMoveSpeed','eMFgu','absDistance','UstHb','_spriteset','setBalloonPose','SlowerSpeed','update','switch2Id','DashingEnable','djrVT','despawnEventId','YNmzI','ndKmf','DQCEv','_moveOnlyRegions','PosX','charAt','hasDragonbones','_isObjectCharacter','MoveAllSynchTargets','iYQUq','split','SwitchGetSelfSwitchID','tRegk','initMembers','useCarryPoseForIcons','checkSmartEventCollision','canStartLocalEvents','Kqagl','return\x20%1','Game_Variables_value','Label','MPomk','%1%2','UEfaL','zwbgX','randomInt','updateEventIconSprite','constructor','ship','deleteIconsOnEventsData','checkExistingEntitiesAt','UNFiH','canPass','isEventRunning','shadowFilename','StopAutoMoveEvents','delay','dVjEs','moveRouteIndex','isOnLadder','setDiagonalDirection','custom','_cacheSystemVisible','isAllowEventAutoMovement','_followerChaseOff','SelfSwitches','Vehicle','screenX','Spriteset_Map_createShadow','setupSpawn','26067tXdSZA','setMoveRoute','forceMoveRoute','airship','updateShadowChanges','removeChild','_event','meetsCPC','_characterSprites','loadCPC','_spawnedEvents','YFZJj','TcjoR','processMoveRouteSetIndex','sXZSa','screenY','cDUBj','_commonEvents','stop','PJECE','type','updatePatternEventsMoveCore','moveAwayFromPoint','RjzjP','initialize','_selfTarget','TargetVariableId','Game_SelfSwitches_value','horizontal\x20mirror','PreMorphJS','CPCsMet','Game_Interpreter_updateWaitMode','Qqozx','pluginCommandCallEvent','JSON','fontFace','aJeaM','_PlayerDiagonalSetting','NvQHA','_inputTime','SpawnEventDespawnEventID','FNhjb','Value','isAutoBufferIcon','qRpIq','Hidden','processMoveRouteMoveToCharacter','Game_Switches_setValue','CbdIm','away','checkEventsMoveCoreStringTags','byCBm','_moveSynch','Game_Switches_value','gainFrames','spawnPreserved','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_SavedEventLocations','Seconds','_diagonalSupport','HURT','execute','BWnCG','VisuMZ_0_CoreEngine','executeMove','VisibleEventLabels','vehicle','processMoveRouteHugWall','OffsetX','TaBca','LOVE','Window_NumberInput_processOk','posEventsMoveCore','clearSelfTarget','Game_Map_refresh','Game_CharacterBase_updatePattern','Visible','fIceE','isOnRope','Sprite_Character_update','Movement','SWEAT','windowPadding','Spriteset_Map_createLowerLayer','iconWidth','isMoving','UzhBt','_followerControlID','isSelfVariable','GohVJ','checkActivationProximity','HEART','registerSelfEvent','Game_Message_setNumberInput','vertical\x20mirror','resetFontSettings','Game_Player_isMapPassable','NOTE','Game_Map_setupEvents','replace','pJNSR','MUSICNOTE','processMoveRouteStepToCharacter','despawnTerrainTags','_lastPluginCommandInterpreter','createShadow','indexOf','KeokA','ITEM','%1Forbid','ARRAYEVAL','updateText','morphIntoTemplate','processMoveRouteAnimation','XBnHR','roundYWithDirection','findTargetSprite','initEventsMoveCoreSettings','Game_Player_isDashing','Sprite_Character_initMembers','Game_System_initialize','switchId','processMoveSynchMimic','updateShadow','activationProximityType','setupEventsMoveCoreNotetags','Game_Event_event','turn180','setCommonEvent','Game_Event_updateSelfMovement','_working','ETSVb','Game_Vehicle_initMoveSpeed','Game_Map_setup','_activationProximityAutoTriggerBypass','Scene_Map_startEncounterEffect','mjWcH','turnLeft90','ARRAYJSON','deltaY','parameters','uLKCG','xDqqT','Sprite_Character_setCharacterBitmap','cdlEn','deltaYFrom','isAdvancedVariable','_labelWindow','left','moveTowardPoint','offsetX','moveByInput','isStopFollowerChasing','OperateValues','_activationProximity','setupDiagonalSupport','updateVS8BalloonOffsets','Minutes','oHzhS','mirror\x20vertical','Game_CharacterBase_canPass','_stepPattern','_randomMoveWeight','XJhrw','Window_EventItem_onOk','EventId','outlineColor','isDashDisabled','setControlledFollowerID','changeSpeed','getEventIconIndex','followers','lineHeight','turnRight90','moveBackToRandomHome','Game_CharacterBase_moveDiagonally','SPIN\x20CCW','nElDg','vuVLx','hDbAi','isNearTheScreen','EventID','PreSpawnJS','_spawnData','moveStraight','shadowX','_trigger','isTargetEventValidForLabelWindow','Sprite_Balloon_updatePosition','xNidY','StrictCollision','Game_Follower_initialize','zZjAG','log','Window_EventItem_onCancel','frontX','AllAllow','variableId','IMPNY','DOWN','ANNOYED','shadowY','clearPageSettings','visibleRange','contentsOpacity','Step1EventId','onChange','trim','_spriteOffsetX','BevJG','_pageIndex','ZYgEb','_poseDuration','unlock','_target','sAfnY','PostMorphJS','isSaveEventLocation','isPassable','name','list','_characterIndex','EPGuT','isLabelVisible','UOTHn','PreloadedMaps','hideShadows','activationRegionList','scale','HMPH','removeMorph','_EventIcons','string','WVjHL','createBitmap','SCREEN','Self\x20Variable\x20%1','CPC','Game_Event_meetsConditionsCPC','updateEventsMoveCoreTagChanges','getControlledFollowerID','_data','_frames','front','characterIndexVS8','setupEventsMoveCoreCommentTags','ZWirU','pause','isPosing','push','wYuXf','eventsXyNt','_seconds','NqEtD','map','some','getPosingCharacterPattern','processMoveSynchMirrorVert','SpawnEventAtTerrainTag','onClickTrigger','clearDashing','Game_Player_getInputDirection','_shadowSprite','ShipSpeed','eventLabelsVisible','deleteSavedEventLocation','EventAllow','Visibility','eventsXy','checkAdvancedSwitchVariablePresent','random','direction','Enable','processMoveRouteFadeOut','eoRbr','PostSpawnJS','XtAoW','SLEEP','Game_CharacterBase_direction','Button','searchLimit','processMoveRouteJumpTo','round','turnTowardCharacter','BufferY','updatePeriodicRefresh','ZZZ','Game_Follower_chaseCharacter','moveTowardCharacter','RegionOkTarget','_eventLabelOffsetX','checkNeedForPeriodicRefresh','floor','XhvDR','down','Self\x20Switch\x20%1','Icon','processMoveRouteMoveTo','SpawnEventDespawnRegions','NORMAL','hasCPCs','startMapCommonEventOnOKTarget','enable','Game_Event_findProperPageIndex','hkjUI','LiQVc','defaultFontSize','oZxeR','ANGER','regionId','isEventTest','SuccessSwitchId','TiltLeft','getEventIconData','meetActivationRegionConditions','despawnRegions','labelWindowText','mirror\x20horz','isBattleTest','XXBUV','DhqqE','UPPER\x20LEFT','processMoveRouteBalloon','isSelfSwitch','processMoveRouteTeleportTo','Window_NumberInput_start','setupEventsMoveCoreEffects','createSpawnedEventWithData','jLZZU','_clickTrigger','updatePose','mirror\x20vert','EJWdi','RhDjC','EventLocationDelete','format','isWorking','FRUSTRATION','startMapCommonEventOnTouch','USER-DEFINED\x201','Game_CharacterBase_initMembers','1655jvkqBW','ZjjaH','EltiM','dRcdt','clearCarrying','ZRNJj','isBoat','Game_Player_executeMove','getPlayerDiagonalSetting','timerText','Game_Map_isDashDisabled','kEupe','max','acIXi','square','PlayerMovementDiagonal','HpEEA','getDirectionFromPoint','mzRhH','setPlayerDiagonalSetting','_expireCommonEvent','MUSIC-NOTE','resizeWindow','isSpawnHitboxCollisionOk','FontSize','EventIconChange','Game_CharacterBase_update','_vehicleType','USER-DEFINED\x205','concat','updateScale','_waitMode','PlayerForbid','nBvev','TemplateName','characterPatternYVS8','ZUJtX','moveDiagonally','isEventClickTriggered','Game_CharacterBase_characterIndex','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','iconHeight','filename','Game_Event_start','_erased','avasQ','Game_CommonEvent_isActive','TAtdp','saveEventLocation','moveTypeRandom','min','setupSpawnedEvents','getSavedEventLocation','isActive','_advancedSwitchVariable','advancedFunc','switch1Id','VkLhu','disable','isShip','setPattern','processMoveRoutePatternLock','XyOql','mLVCv','ZDLtG','sDfln','updatePosition','LOWER\x20RIGHT','kuGqm','Game_Player_checkEventTriggerHere','setBackgroundType','aqXDo','EtTNz','IconBlendMode','jumpHeight','_tilemap','LEFT','Name','getInputDir8','backY','updateTilt','isPressed','SBYZH','UNTITLED','frontY','erase','apply','CuHpw','isCollidedWithEvents','getPreservedMorphEventData','IconBufferX','isAirshipPassable','bufferY','TiltVert','exit','ZJxrB','getLastPluginCommandInterpreter','AirshipSpeed','IJzrG','processMoveSynchAway','SPIN\x20ACW','_encounterEffectDuration','Collision','_opacity','sHDlQ','cfRLb','FALSE','clearStepPattern','STR','bufferX','GrQhJ','Game_Timer_stop','resume','Game_SelfSwitches_setValue','restoreSavedEventPosition','Game_Message_add','setPose','vvbHp','EventIconDelete','switches','chNtd','version','horz\x20mirror','WalkAllow','PreloadMaps','processMoveRouteJumpToCharacter','FLPwd','GetMoveSynchTarget','reverse\x20copy','drawTextEx','LIGHT\x20BULB','setImage','canPassDiagonally','Game_Vehicle_isMapPassable','OpacitySpeed','createSaveEventLocationData','RemovePreserve','2FDnTnU','FollowerSetControl','tmLsu','Game_Variables_setValue','Player','ARRAYSTR','_shadowOpacity','morphInto','setEventIconDataKey','_eventMorphData','isPlayerControlDisabled','processMoveSynchMirrorHorz','drawIcon','setupChild','isSpriteVS8dir','_screenZoomScale','Game_Timer_start','processOk','blendMode','isSaveEventLocations','command357','AijpU','createShadows','BPhVt','Passability','mapId','isDiagonalDirection','EventLabelRefresh','setEventIconData','Frames','_comments','autosaveEventLocation','setLastPluginCommandInterpreter','boat','isSpawnedEvent','YUhxd','Game_Event_locate','_visiblePlayerY','hasStepAnime','isRegionForbidPass','sMODx','isAnyEventStarting','kXwAm','createIconSprite'];const _0x5f1364=_0x48c3;(function(_0x4800b8,_0x264196){const _0x2dec22=_0x48c3;while(!![]){try{const _0x24084b=parseInt(_0x2dec22(0x3e9))*parseInt(_0x2dec22(0x4ae))+-parseInt(_0x2dec22(0x15d))*-parseInt(_0x2dec22(0x360))+-parseInt(_0x2dec22(0x4b3))*-parseInt(_0x2dec22(0x20b))+-parseInt(_0x2dec22(0x172))+-parseInt(_0x2dec22(0x168))+parseInt(_0x2dec22(0x13d))+parseInt(_0x2dec22(0x490));if(_0x24084b===_0x264196)break;else _0x4800b8['push'](_0x4800b8['shift']());}catch(_0x30377c){_0x4800b8['push'](_0x4800b8['shift']());}}}(_0x1454,0xb7330));var label=_0x5f1364(0x507),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x126bc6){const _0x90d88d=_0x5f1364;return _0x126bc6[_0x90d88d(0x53d)]&&_0x126bc6[_0x90d88d(0x5b4)][_0x90d88d(0x161)]('['+label+']');})[0x0];VisuMZ[label][_0x5f1364(0x18d)]=VisuMZ[label][_0x5f1364(0x18d)]||{},VisuMZ[_0x5f1364(0x472)]=function(_0x44d4ed,_0x51dbfc){const _0x57535a=_0x5f1364;for(const _0x14fd0f in _0x51dbfc){if(_0x14fd0f[_0x57535a(0x59d)](/(.*):(.*)/i)){const _0x56c2bf=String(RegExp['$1']),_0x58037c=String(RegExp['$2'])[_0x57535a(0x199)]()[_0x57535a(0x2da)]();let _0x33e537,_0x119c84,_0x1f7853;switch(_0x58037c){case _0x57535a(0x491):_0x33e537=_0x51dbfc[_0x14fd0f]!==''?Number(_0x51dbfc[_0x14fd0f]):0x0;break;case'ARRAYNUM':_0x119c84=_0x51dbfc[_0x14fd0f]!==''?JSON[_0x57535a(0x421)](_0x51dbfc[_0x14fd0f]):[],_0x33e537=_0x119c84[_0x57535a(0x309)](_0x5cccbc=>Number(_0x5cccbc));break;case _0x57535a(0x554):_0x33e537=_0x51dbfc[_0x14fd0f]!==''?eval(_0x51dbfc[_0x14fd0f]):null;break;case _0x57535a(0x279):_0x119c84=_0x51dbfc[_0x14fd0f]!==''?JSON['parse'](_0x51dbfc[_0x14fd0f]):[],_0x33e537=_0x119c84[_0x57535a(0x309)](_0x991fdd=>eval(_0x991fdd));break;case _0x57535a(0x22d):_0x33e537=_0x51dbfc[_0x14fd0f]!==''?JSON[_0x57535a(0x421)](_0x51dbfc[_0x14fd0f]):'';break;case _0x57535a(0x295):_0x119c84=_0x51dbfc[_0x14fd0f]!==''?JSON[_0x57535a(0x421)](_0x51dbfc[_0x14fd0f]):[],_0x33e537=_0x119c84['map'](_0x2e86ee=>JSON[_0x57535a(0x421)](_0x2e86ee));break;case'FUNC':_0x33e537=_0x51dbfc[_0x14fd0f]!==''?new Function(JSON[_0x57535a(0x421)](_0x51dbfc[_0x14fd0f])):new Function(_0x57535a(0x4f1));break;case'ARRAYFUNC':_0x119c84=_0x51dbfc[_0x14fd0f]!==''?JSON[_0x57535a(0x421)](_0x51dbfc[_0x14fd0f]):[],_0x33e537=_0x119c84[_0x57535a(0x309)](_0x187497=>new Function(JSON[_0x57535a(0x421)](_0x187497)));break;case _0x57535a(0x3cc):_0x33e537=_0x51dbfc[_0x14fd0f]!==''?String(_0x51dbfc[_0x14fd0f]):'';break;case _0x57535a(0x3ee):_0x119c84=_0x51dbfc[_0x14fd0f]!==''?JSON[_0x57535a(0x421)](_0x51dbfc[_0x14fd0f]):[],_0x33e537=_0x119c84[_0x57535a(0x309)](_0xf001ae=>String(_0xf001ae));break;case _0x57535a(0x4b7):_0x1f7853=_0x51dbfc[_0x14fd0f]!==''?JSON[_0x57535a(0x421)](_0x51dbfc[_0x14fd0f]):{},_0x44d4ed[_0x56c2bf]={},VisuMZ[_0x57535a(0x472)](_0x44d4ed[_0x56c2bf],_0x1f7853);continue;case _0x57535a(0x596):_0x119c84=_0x51dbfc[_0x14fd0f]!==''?JSON[_0x57535a(0x421)](_0x51dbfc[_0x14fd0f]):[],_0x33e537=_0x119c84['map'](_0x27749e=>VisuMZ[_0x57535a(0x472)]({},JSON['parse'](_0x27749e)));break;default:continue;}_0x44d4ed[_0x56c2bf]=_0x33e537;}}return _0x44d4ed;},(_0x170974=>{const _0x8272c=_0x5f1364,_0x9eae29=_0x170974[_0x8272c(0x2e6)];for(const _0x41f897 of dependencies){if(!Imported[_0x41f897]){alert(_0x8272c(0x388)['format'](_0x9eae29,_0x41f897)),SceneManager[_0x8272c(0x3be)]();break;}}const _0x12bf15=_0x170974[_0x8272c(0x5b4)];if(_0x12bf15[_0x8272c(0x59d)](/\[Version[ ](.*?)\]/i)){const _0x3a31c2=Number(RegExp['$1']);_0x3a31c2!==VisuMZ[label][_0x8272c(0x3d9)]&&(alert(_0x8272c(0x16b)[_0x8272c(0x35a)](_0x9eae29,_0x3a31c2)),SceneManager[_0x8272c(0x3be)]());}if(_0x12bf15[_0x8272c(0x59d)](/\[Tier[ ](\d+)\]/i)){const _0x41dec4=Number(RegExp['$1']);_0x41dec4<tier?(alert(_0x8272c(0x58e)[_0x8272c(0x35a)](_0x9eae29,_0x41dec4,tier)),SceneManager[_0x8272c(0x3be)]()):tier=Math[_0x8272c(0x36c)](_0x41dec4,tier);}VisuMZ[_0x8272c(0x472)](VisuMZ[label][_0x8272c(0x18d)],_0x170974[_0x8272c(0x297)]);})(pluginData),VisuMZ['OperateValues']=function(_0x2beb14,_0x340e4e,_0x4be30b){switch(_0x4be30b){case'=':return _0x340e4e;break;case'+':return _0x2beb14+_0x340e4e;break;case'-':return _0x2beb14-_0x340e4e;break;case'*':return _0x2beb14*_0x340e4e;break;case'/':return _0x2beb14/_0x340e4e;break;case'%':return _0x2beb14%_0x340e4e;break;}return _0x2beb14;},PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],'AutoMoveEvents',_0x5c3c63=>{const _0x4778bf=_0x5f1364;VisuMZ['ConvertParams'](_0x5c3c63,_0x5c3c63);switch(_0x5c3c63[_0x4778bf(0x235)]){case'Allow':$gameSystem['setAllowEventAutoMovement'](!![]);break;case _0x4778bf(0x55c):$gameSystem[_0x4778bf(0x420)](![]);break;case _0x4778bf(0x44e):$gameSystem['setAllowEventAutoMovement'](!$gameSystem[_0x4778bf(0x204)]());break;}}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],'CallEvent',_0x394eed=>{const _0x2a3c64=_0x5f1364;VisuMZ[_0x2a3c64(0x472)](_0x394eed,_0x394eed);const _0x23fd62=$gameTemp[_0x2a3c64(0x3c0)](),_0x34c2b9={'mapId':_0x394eed['MapId'],'eventId':_0x394eed[_0x2a3c64(0x2b0)]||_0x23fd62['eventId'](),'pageId':_0x394eed[_0x2a3c64(0x13e)]};if(_0x34c2b9[_0x2a3c64(0x402)]<=0x0)_0x34c2b9[_0x2a3c64(0x402)]=$gameMap?$gameMap[_0x2a3c64(0x402)]():0x1;$gameTemp['getLastPluginCommandInterpreter']()['pluginCommandCallEvent'](_0x34c2b9);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],'DashEnableToggle',_0x42c1c7=>{const _0x31c6d7=_0x5f1364;VisuMZ[_0x31c6d7(0x472)](_0x42c1c7,_0x42c1c7);switch(_0x42c1c7['Value']){case _0x31c6d7(0x31b):$gameSystem[_0x31c6d7(0x561)](!![]);break;case _0x31c6d7(0x1bd):$gameSystem['setDashingEnabled'](![]);break;case'Toggle':$gameSystem['setDashingEnabled'](!$gameSystem[_0x31c6d7(0x54f)]());break;}}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x379),_0x2c8e79=>{const _0x4c0c1f=_0x5f1364;VisuMZ[_0x4c0c1f(0x472)](_0x2c8e79,_0x2c8e79);const _0x2ddebb=$gameTemp[_0x4c0c1f(0x3c0)]();_0x2c8e79['MapId']=_0x2c8e79[_0x4c0c1f(0x1af)]||$gameMap[_0x4c0c1f(0x402)](),$gameSystem[_0x4c0c1f(0x3f1)](_0x2c8e79['MapId'],_0x2c8e79[_0x4c0c1f(0x2b0)]||_0x2ddebb[_0x4c0c1f(0x5be)](),_0x2c8e79['IconIndex'],_0x2c8e79[_0x4c0c1f(0x3ba)],_0x2c8e79[_0x4c0c1f(0x594)],_0x2c8e79[_0x4c0c1f(0x3a9)]);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x3d6),_0x44b0e2=>{const _0x28c57d=_0x5f1364;VisuMZ[_0x28c57d(0x472)](_0x44b0e2,_0x44b0e2);const _0x51ffb3=$gameTemp[_0x28c57d(0x3c0)]();_0x44b0e2[_0x28c57d(0x1af)]=_0x44b0e2[_0x28c57d(0x1af)]||$gameMap[_0x28c57d(0x402)](),$gameSystem['deleteIconsOnEventsDataKey'](_0x44b0e2[_0x28c57d(0x1af)],_0x44b0e2[_0x28c57d(0x2b0)]||_0x51ffb3[_0x28c57d(0x5be)]());}),PluginManager['registerCommand'](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x404),_0x30c237=>{const _0x4e2d1d=_0x5f1364;if($gameMap)for(const _0x26fd5e of $gameMap[_0x4e2d1d(0x1c8)]()){_0x26fd5e[_0x4e2d1d(0x575)]();}}),PluginManager['registerCommand'](pluginData['name'],'EventLabelVisible',_0x3f62be=>{const _0x515659=_0x5f1364;VisuMZ['ConvertParams'](_0x3f62be,_0x3f62be);switch(_0x3f62be[_0x515659(0x316)]){case _0x515659(0x257):$gameSystem['setEventLabelsVisible'](!![]);break;case _0x515659(0x238):$gameSystem[_0x515659(0x528)](![]);break;case _0x515659(0x44e):$gameSystem[_0x515659(0x528)](!$gameSystem['eventLabelsVisible']());break;}}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x4a9),_0x1409da=>{const _0x19b917=_0x5f1364;VisuMZ['ConvertParams'](_0x1409da,_0x1409da);const _0x30b286=$gameTemp[_0x19b917(0x3c0)]();if(!$gameMap)return;const _0x57fcb4=$gameMap[_0x19b917(0x179)](_0x1409da[_0x19b917(0x2b0)]||_0x30b286['eventId']());if(_0x57fcb4)_0x57fcb4[_0x19b917(0x390)]();}),PluginManager['registerCommand'](pluginData[_0x5f1364(0x2e6)],'EventLocationCreate',_0x303f8b=>{const _0x20163f=_0x5f1364;VisuMZ[_0x20163f(0x472)](_0x303f8b,_0x303f8b);const _0x3b428b=$gameTemp['getLastPluginCommandInterpreter'](),_0x57fea2=_0x303f8b['MapId']||$gameMap['mapId'](),_0x593e5f=_0x303f8b[_0x20163f(0x2b0)]||_0x3b428b[_0x20163f(0x5be)](),_0x39e946=_0x303f8b[_0x20163f(0x1dd)]||0x0,_0x11fc4f=_0x303f8b[_0x20163f(0x4db)]||0x0,_0x4ee4b4=_0x303f8b['Direction']||0x2,_0x265965=((_0x303f8b[_0x20163f(0x13e)]||0x1)-0x1)['clamp'](0x0,0x13),_0x4cefee=_0x303f8b[_0x20163f(0x570)]||0x0;$gameSystem[_0x20163f(0x3e7)](_0x57fea2,_0x593e5f,_0x39e946,_0x11fc4f,_0x4ee4b4,_0x265965,_0x4cefee);}),PluginManager['registerCommand'](pluginData['name'],_0x5f1364(0x359),_0x240f04=>{const _0x51a04b=_0x5f1364;VisuMZ['ConvertParams'](_0x240f04,_0x240f04);const _0x50f493=$gameTemp[_0x51a04b(0x3c0)](),_0x54ea14=_0x240f04[_0x51a04b(0x1af)]||$gameMap[_0x51a04b(0x402)](),_0x16cb49=_0x240f04[_0x51a04b(0x2b0)]||_0x50f493[_0x51a04b(0x5be)]();$gameSystem[_0x51a04b(0x57b)](_0x54ea14,_0x16cb49);}),PluginManager[_0x5f1364(0x524)](pluginData['name'],_0x5f1364(0x16e),_0x22225a=>{const _0x423093=_0x5f1364;VisuMZ[_0x423093(0x472)](_0x22225a,_0x22225a);const _0xede464=_0x22225a[_0x423093(0x56c)];$gameTimer['setCommonEvent'](_0xede464);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x4fb),_0x30567d=>{const _0x415beb=_0x5f1364;$gameTimer[_0x415beb(0x28b)](0x0);}),PluginManager['registerCommand'](pluginData['name'],'EventTimerFramesGain',_0x2a75a2=>{const _0x4cb0b0=_0x5f1364;if(!$gameTimer[_0x4cb0b0(0x35b)]())return;VisuMZ['ConvertParams'](_0x2a75a2,_0x2a75a2);let _0x5ba958=0x0;_0x5ba958+=_0x2a75a2[_0x4cb0b0(0x406)],_0x5ba958+=_0x2a75a2[_0x4cb0b0(0x245)]*0x3c,_0x5ba958+=_0x2a75a2[_0x4cb0b0(0x2a8)]*0x3c*0x3c,_0x5ba958+=_0x2a75a2['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x4cb0b0(0x241)](_0x5ba958);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x451),_0x6fbe81=>{const _0xa8727d=_0x5f1364;if(!$gameTimer[_0xa8727d(0x35b)]())return;VisuMZ[_0xa8727d(0x472)](_0x6fbe81,_0x6fbe81);let _0xb35878=0x0;_0xb35878+=_0x6fbe81[_0xa8727d(0x406)],_0xb35878+=_0x6fbe81['Seconds']*0x3c,_0xb35878+=_0x6fbe81[_0xa8727d(0x2a8)]*0x3c*0x3c,_0xb35878+=_0x6fbe81[_0xa8727d(0x598)]*0x3c*0x3c*0x3c,$gameTimer[_0xa8727d(0x480)](_0xb35878);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],'EventTimerPause',_0x867177=>{if(!$gameTimer['isWorking']())return;$gameTimer['pause']();}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x514),_0x20c9b7=>{const _0x2d91af=_0x5f1364;if(!$gameTimer[_0x2d91af(0x35b)]())return;$gameTimer[_0x2d91af(0x3d0)]();}),PluginManager[_0x5f1364(0x524)](pluginData['name'],'EventTimerSpeed',_0x1b5f9f=>{const _0x36115d=_0x5f1364;VisuMZ[_0x36115d(0x472)](_0x1b5f9f,_0x1b5f9f);const _0x2227ac=_0x1b5f9f[_0x36115d(0x45a)]||0x0;$gameTimer['changeSpeed'](_0x2227ac);}),PluginManager[_0x5f1364(0x524)](pluginData['name'],_0x5f1364(0x417),_0x4508bd=>{const _0x1c2da0=_0x5f1364;VisuMZ[_0x1c2da0(0x472)](_0x4508bd,_0x4508bd);const _0x1b2216=!_0x4508bd[_0x1c2da0(0x175)];$gameSystem[_0x1c2da0(0x586)](_0x1b2216);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x4af),_0x1e7453=>{const _0x15f74d=_0x5f1364;VisuMZ[_0x15f74d(0x472)](_0x1e7453,_0x1e7453);const _0x14eeb0=(_0x1e7453['FollowerID']||0x0)-0x1,_0x3424cf=!_0x1e7453[_0x15f74d(0x175)],_0x438473=$gamePlayer[_0x15f74d(0x2b6)]()[_0x15f74d(0x181)](_0x14eeb0);if(_0x438473)_0x438473[_0x15f74d(0x154)](_0x3424cf);}),PluginManager['registerCommand'](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x3ea),_0x4ab779=>{const _0x2d23c1=_0x5f1364;VisuMZ[_0x2d23c1(0x472)](_0x4ab779,_0x4ab779);const _0x4c567c=_0x4ab779[_0x2d23c1(0x515)];$gameSystem[_0x2d23c1(0x2b3)](_0x4c567c);}),PluginManager['registerCommand'](pluginData[_0x5f1364(0x2e6)],'FollowerReset',_0x24b346=>{const _0x48d2e5=_0x5f1364;VisuMZ[_0x48d2e5(0x472)](_0x24b346,_0x24b346),$gameSystem['setControlledFollowerID'](0x0),$gameSystem['setStopFollowerChasing'](![]);for(const _0x29e194 of $gamePlayer[_0x48d2e5(0x2b6)]()[_0x48d2e5(0x2fc)]){if(_0x29e194)_0x29e194['setChaseOff'](![]);}}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],'SwitchGetSelfSwitchABCD',_0x1f49fc=>{const _0xebe9ba=_0x5f1364;VisuMZ[_0xebe9ba(0x472)](_0x1f49fc,_0x1f49fc);const _0x2f4722=$gameTemp['getLastPluginCommandInterpreter']();_0x1f49fc[_0xebe9ba(0x1af)]=_0x1f49fc['MapId']||$gameMap[_0xebe9ba(0x402)]();const _0x4f6919=[_0x1f49fc[_0xebe9ba(0x1af)],_0x1f49fc['EventId']||_0x2f4722[_0xebe9ba(0x5be)](),_0x1f49fc[_0xebe9ba(0x506)]],_0x260376=_0x1f49fc['TargetSwitchId'],_0x998720=$gameSelfSwitches[_0xebe9ba(0x1b6)](_0x4f6919)||![];$gameSwitches[_0xebe9ba(0x13f)](_0x260376,_0x998720);}),PluginManager[_0x5f1364(0x524)](pluginData['name'],_0x5f1364(0x1e4),_0x4509b0=>{const _0x15c044=_0x5f1364;VisuMZ[_0x15c044(0x472)](_0x4509b0,_0x4509b0);const _0x4c67b2=$gameTemp[_0x15c044(0x3c0)]();_0x4509b0[_0x15c044(0x1af)]=_0x4509b0[_0x15c044(0x1af)]||$gameMap['mapId']();const _0x19aad3=[_0x4509b0[_0x15c044(0x1af)],_0x4509b0[_0x15c044(0x2b0)]||_0x4c67b2[_0x15c044(0x5be)](),'Self\x20Switch\x20%1'[_0x15c044(0x35a)](_0x4509b0[_0x15c044(0x1c7)])],_0xf76881=_0x4509b0[_0x15c044(0x52e)],_0x2bff6c=$gameSelfSwitches['value'](_0x19aad3)||![];$gameSwitches['setValue'](_0xf76881,_0x2bff6c);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x595),_0x1ececb=>{const _0x18126c=_0x5f1364;VisuMZ[_0x18126c(0x472)](_0x1ececb,_0x1ececb);const _0x55efcb=$gameTemp['getLastPluginCommandInterpreter']();_0x1ececb[_0x18126c(0x1af)]=_0x1ececb[_0x18126c(0x1af)]||$gameMap['mapId']();const _0xc12666=[_0x1ececb[_0x18126c(0x1af)],_0x1ececb['EventId']||_0x55efcb['eventId'](),_0x18126c(0x2f7)[_0x18126c(0x35a)](_0x1ececb[_0x18126c(0x13a)])],_0x2f00a5=_0x1ececb[_0x18126c(0x225)],_0x3646f0=$gameSelfSwitches[_0x18126c(0x1b6)](_0xc12666)||![];$gameVariables[_0x18126c(0x13f)](_0x2f00a5,_0x3646f0);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x1b4),_0x3bc947=>{const _0x58c5d8=_0x5f1364;VisuMZ['ConvertParams'](_0x3bc947,_0x3bc947);if(!$gameMap)return;const _0x44ef9c=$gameTemp[_0x58c5d8(0x3c0)](),_0x2a4540=_0x3bc947[_0x58c5d8(0x462)];_0x3bc947[_0x58c5d8(0x1a2)]=_0x3bc947[_0x58c5d8(0x1a2)]||$gameMap['mapId'](),_0x3bc947[_0x58c5d8(0x18b)]=_0x3bc947[_0x58c5d8(0x18b)]||$gameMap[_0x58c5d8(0x402)](),_0x3bc947[_0x58c5d8(0x382)]=_0x3bc947[_0x58c5d8(0x382)][_0x58c5d8(0x199)]()['trim']();if(!_0x2a4540&&_0x3bc947[_0x58c5d8(0x1a2)]!==$gameMap[_0x58c5d8(0x402)]())return;if($gameMap['mapId']()===_0x3bc947['Step1MapId']){if(_0x58c5d8(0x1f0)!=='UEfaL'){function _0x35689c(){const _0xad4c8a=_0x58c5d8;_0x21ca67[0x2]=_0xad4c8a(0x332)[_0xad4c8a(0x35a)](_0xa441ba);}}else{const _0xf348b0=$gameMap['event'](_0x3bc947[_0x58c5d8(0x2d8)]||_0x44ef9c['eventId']());if(!_0xf348b0)return;_0x3bc947['TemplateName']!==_0x58c5d8(0x3b3)?_0xf348b0[_0x58c5d8(0x27b)](_0x3bc947[_0x58c5d8(0x382)]):_0xf348b0[_0x58c5d8(0x3f0)](_0x3bc947[_0x58c5d8(0x18b)],_0x3bc947['Step2EventId']||_0x44ef9c[_0x58c5d8(0x5be)]());}}_0x2a4540&&$gameSystem[_0x58c5d8(0x5ad)](_0x3bc947['Step1MapId'],_0x3bc947[_0x58c5d8(0x2d8)],_0x3bc947['TemplateName'],_0x3bc947[_0x58c5d8(0x18b)],_0x3bc947[_0x58c5d8(0x418)]);}),PluginManager['registerCommand'](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x544),_0x38b96c=>{const _0x41c5f7=_0x5f1364;VisuMZ[_0x41c5f7(0x472)](_0x38b96c,_0x38b96c);if(!$gameMap)return;const _0x38639e=$gameTemp[_0x41c5f7(0x3c0)]();_0x38b96c['MapId']=_0x38b96c[_0x41c5f7(0x1af)]||$gameMap[_0x41c5f7(0x402)]();if($gameMap[_0x41c5f7(0x402)]()===_0x38b96c['MapId']){const _0x33773f=$gameMap[_0x41c5f7(0x179)](_0x38b96c[_0x41c5f7(0x2b0)]||_0x38639e[_0x41c5f7(0x5be)]());_0x33773f[_0x41c5f7(0x2f1)]();}_0x38b96c[_0x41c5f7(0x3e8)]&&$gameSystem['deletePreservedMorphEventDataKey'](_0x38b96c[_0x41c5f7(0x1af)],_0x38b96c[_0x41c5f7(0x2b0)]||_0x38639e['eventId']());}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x47c),_0xec2427=>{VisuMZ['ConvertParams'](_0xec2427,_0xec2427),$gameSystem['setPlayerControlDisable'](!_0xec2427['Enable']);}),PluginManager['registerCommand'](pluginData['name'],_0x5f1364(0x36f),_0x33f6de=>{const _0x416bab=_0x5f1364;VisuMZ[_0x416bab(0x472)](_0x33f6de,_0x33f6de),$gameSystem[_0x416bab(0x373)](_0x33f6de[_0x416bab(0x169)]);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],'PlayerIconChange',_0x347b67=>{const _0x13c74e=_0x5f1364;VisuMZ[_0x13c74e(0x472)](_0x347b67,_0x347b67),$gameSystem['setEventIconData']($gamePlayer,_0x347b67[_0x13c74e(0x48b)],_0x347b67[_0x13c74e(0x3ba)],_0x347b67['IconBufferY'],_0x347b67[_0x13c74e(0x3a9)]);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],'PlayerIconDelete',_0x3c0f18=>{const _0x585bcd=_0x5f1364;VisuMZ[_0x585bcd(0x472)](_0x3c0f18,_0x3c0f18),$gameSystem['deleteIconsOnEventsData']($gamePlayer);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x190),_0x5deed6=>{const _0x471f77=_0x5f1364;VisuMZ['ConvertParams'](_0x5deed6,_0x5deed6);const _0x4d9968=$gameTemp[_0x471f77(0x3c0)]();_0x5deed6[_0x471f77(0x1af)]=_0x5deed6[_0x471f77(0x1af)]||$gameMap[_0x471f77(0x402)]();const _0x2cddf1=[_0x5deed6[_0x471f77(0x1af)],_0x5deed6[_0x471f77(0x2b0)]||_0x4d9968['eventId'](),_0x5deed6[_0x471f77(0x506)]];switch(_0x5deed6[_0x471f77(0x235)]){case'ON':$gameSelfSwitches['setValue'](_0x2cddf1,!![]);break;case'OFF':$gameSelfSwitches[_0x471f77(0x13f)](_0x2cddf1,![]);break;case _0x471f77(0x44e):$gameSelfSwitches[_0x471f77(0x13f)](_0x2cddf1,!$gameSelfSwitches[_0x471f77(0x1b6)](_0x2cddf1));break;}}),PluginManager[_0x5f1364(0x524)](pluginData['name'],'SelfSwitchID',_0x576612=>{const _0xe3ec33=_0x5f1364;VisuMZ['ConvertParams'](_0x576612,_0x576612);const _0x248ffb=$gameTemp[_0xe3ec33(0x3c0)]();_0x576612['MapId']=_0x576612[_0xe3ec33(0x1af)]||$gameMap[_0xe3ec33(0x402)]();const _0x1d9ef3=[_0x576612[_0xe3ec33(0x1af)],_0x576612[_0xe3ec33(0x2b0)]||_0x248ffb[_0xe3ec33(0x5be)](),_0xe3ec33(0x332)[_0xe3ec33(0x35a)](_0x576612[_0xe3ec33(0x1c7)])];switch(_0x576612[_0xe3ec33(0x235)]){case'ON':$gameSelfSwitches[_0xe3ec33(0x13f)](_0x1d9ef3,!![]);break;case _0xe3ec33(0x44d):$gameSelfSwitches[_0xe3ec33(0x13f)](_0x1d9ef3,![]);break;case _0xe3ec33(0x44e):$gameSelfSwitches[_0xe3ec33(0x13f)](_0x1d9ef3,!$gameSelfSwitches['value'](_0x1d9ef3));break;}}),PluginManager[_0x5f1364(0x524)](pluginData['name'],_0x5f1364(0x4cd),_0x50ab82=>{const _0x32ce36=_0x5f1364;VisuMZ['ConvertParams'](_0x50ab82,_0x50ab82);const _0x5c6b47=$gameTemp['getLastPluginCommandInterpreter']();_0x50ab82[_0x32ce36(0x1af)]=_0x50ab82['MapId']||$gameMap[_0x32ce36(0x402)]();const _0x288bfe=[_0x50ab82[_0x32ce36(0x1af)],_0x50ab82[_0x32ce36(0x2b0)]||_0x5c6b47['eventId'](),_0x32ce36(0x2f7)[_0x32ce36(0x35a)](_0x50ab82[_0x32ce36(0x13a)])],_0xd47b95=VisuMZ[_0x32ce36(0x2a4)]($gameSelfSwitches[_0x32ce36(0x1b6)](_0x288bfe),_0x50ab82['Value'],_0x50ab82[_0x32ce36(0x5bc)]);$gameSelfSwitches[_0x32ce36(0x13f)](_0x288bfe,_0xd47b95);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x522),_0x404a17=>{const _0x11e0f4=_0x5f1364;VisuMZ['ConvertParams'](_0x404a17,_0x404a17);const _0x23430a=$gameTemp[_0x11e0f4(0x3c0)](),_0x354f5b={'template':_0x404a17[_0x11e0f4(0x382)],'mapId':_0x404a17['MapId']||$gameMap[_0x11e0f4(0x402)](),'eventId':_0x404a17['EventId']||_0x23430a[_0x11e0f4(0x5be)](),'x':_0x404a17[_0x11e0f4(0x1dd)],'y':_0x404a17[_0x11e0f4(0x4db)],'spawnPreserved':_0x404a17[_0x11e0f4(0x189)],'spawnEventId':$gameMap[_0x11e0f4(0x215)][_0x11e0f4(0x509)]+0x3e8},_0xb84bf6=_0x404a17[_0x11e0f4(0x342)]||0x0,_0x14c346=$gameMap['prepareSpawnedEventAtXY'](_0x354f5b,_0x404a17['Collision'],_0x404a17[_0x11e0f4(0x401)]);_0xb84bf6&&$gameSwitches['setValue'](_0xb84bf6,!!_0x14c346);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x58d),_0x2d2fc1=>{const _0x32d510=_0x5f1364;VisuMZ[_0x32d510(0x472)](_0x2d2fc1,_0x2d2fc1);const _0x45ec76=$gameTemp[_0x32d510(0x3c0)](),_0x4e37eb={'template':_0x2d2fc1[_0x32d510(0x382)],'mapId':_0x2d2fc1['MapId']||$gameMap[_0x32d510(0x402)](),'eventId':_0x2d2fc1[_0x32d510(0x2b0)]||_0x45ec76['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x2d2fc1[_0x32d510(0x189)],'spawnEventId':$gameMap[_0x32d510(0x215)][_0x32d510(0x509)]+0x3e8},_0x545a49=_0x2d2fc1[_0x32d510(0x342)]||0x0,_0x3ab513=$gameMap['prepareSpawnedEventAtRegion'](_0x4e37eb,_0x2d2fc1['Region'],_0x2d2fc1[_0x32d510(0x3c6)],_0x2d2fc1[_0x32d510(0x401)]);_0x545a49&&$gameSwitches[_0x32d510(0x13f)](_0x545a49,!!_0x3ab513);}),PluginManager['registerCommand'](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x30d),_0x308f2a=>{const _0x487625=_0x5f1364;VisuMZ['ConvertParams'](_0x308f2a,_0x308f2a);const _0x38671b=$gameTemp[_0x487625(0x3c0)](),_0x54cb8c={'template':_0x308f2a[_0x487625(0x382)],'mapId':_0x308f2a[_0x487625(0x1af)]||$gameMap['mapId'](),'eventId':_0x308f2a['EventId']||_0x38671b[_0x487625(0x5be)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x308f2a['Preserve'],'spawnEventId':$gameMap['_spawnedEvents'][_0x487625(0x509)]+0x3e8},_0x42a7bc=_0x308f2a[_0x487625(0x342)]||0x0,_0xd9bc3b=$gameMap[_0x487625(0x46a)](_0x54cb8c,_0x308f2a['TerrainTags'],_0x308f2a[_0x487625(0x3c6)],_0x308f2a[_0x487625(0x401)]);_0x42a7bc&&$gameSwitches[_0x487625(0x13f)](_0x42a7bc,!!_0xd9bc3b);}),PluginManager['registerCommand'](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x233),_0x509e99=>{const _0x74fd35=_0x5f1364;VisuMZ[_0x74fd35(0x472)](_0x509e99,_0x509e99);const _0x286192=$gameTemp[_0x74fd35(0x3c0)]();$gameMap[_0x74fd35(0x1d8)](_0x509e99[_0x74fd35(0x2c0)]||_0x286192[_0x74fd35(0x5be)]());}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],'SpawnEventDespawnAtXY',_0x3ee760=>{const _0x3d611d=_0x5f1364;VisuMZ[_0x3d611d(0x472)](_0x3ee760,_0x3ee760);const _0x51a718=_0x3ee760[_0x3d611d(0x1dd)],_0x59ba92=_0x3ee760[_0x3d611d(0x4db)];$gameMap['despawnAtXY'](_0x51a718,_0x59ba92);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x335),_0x258797=>{const _0x3b539b=_0x5f1364;VisuMZ[_0x3b539b(0x472)](_0x258797,_0x258797),$gameMap[_0x3b539b(0x346)](_0x258797[_0x3b539b(0x55b)]);}),PluginManager['registerCommand'](pluginData[_0x5f1364(0x2e6)],'SpawnEventDespawnTerrainTags',_0x355484=>{const _0xda0406=_0x5f1364;VisuMZ[_0xda0406(0x472)](_0x355484,_0x355484),$gameMap[_0xda0406(0x272)](_0x355484[_0xda0406(0x50e)]);}),PluginManager[_0x5f1364(0x524)](pluginData[_0x5f1364(0x2e6)],_0x5f1364(0x510),_0x1033d0=>{const _0x2e4341=_0x5f1364;VisuMZ['ConvertParams'](_0x1033d0,_0x1033d0),$gameMap[_0x2e4341(0x4f5)]();}),VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x5cc)]=Scene_Boot[_0x5f1364(0x5c6)][_0x5f1364(0x492)],Scene_Boot[_0x5f1364(0x5c6)][_0x5f1364(0x492)]=function(){const _0x181f32=_0x5f1364;VisuMZ['EventsMoveCore'][_0x181f32(0x5cc)][_0x181f32(0x160)](this),this['process_VisuMZ_EventsMoveCore_LoadTemplateMaps'](),this[_0x181f32(0x5ac)]();if(VisuMZ[_0x181f32(0x507)][_0x181f32(0x474)])VisuMZ[_0x181f32(0x507)][_0x181f32(0x474)][_0x181f32(0x223)]();},VisuMZ[_0x5f1364(0x2ec)]=[],VisuMZ[_0x5f1364(0x182)]={},Scene_Boot['prototype'][_0x5f1364(0x243)]=function(){const _0xd75c67=_0x5f1364;if(DataManager[_0xd75c67(0x349)]()||DataManager[_0xd75c67(0x341)]())return;const _0x365dc5=VisuMZ['EventsMoveCore'][_0xd75c67(0x18d)][_0xd75c67(0x5c4)],_0x4dfbd4=_0x365dc5[_0xd75c67(0x3dc)][_0xd75c67(0x152)](0x0);for(const _0x4df7bd of _0x365dc5[_0xd75c67(0x1c6)]){if(_0xd75c67(0x1ea)!=='IEOnL'){_0x4df7bd[_0xd75c67(0x3ad)]=_0x4df7bd[_0xd75c67(0x3ad)][_0xd75c67(0x199)]()[_0xd75c67(0x2da)](),VisuMZ[_0xd75c67(0x182)][_0x4df7bd[_0xd75c67(0x3ad)]]=_0x4df7bd;if(!_0x4dfbd4[_0xd75c67(0x161)](_0x4df7bd[_0xd75c67(0x531)]))_0x4dfbd4[_0xd75c67(0x304)](_0x4df7bd[_0xd75c67(0x531)]);}else{function _0x4ad96b(){const _0x396e46=_0xd75c67;_0x874b9f[_0x396e46(0x5c6)][_0x396e46(0x26a)][_0x396e46(0x160)](this),this['contents']['fontSize']=this['defaultFontSize']();}}}for(const _0x4cb2e5 of _0x4dfbd4){if(VisuMZ[_0xd75c67(0x2ec)][_0x4cb2e5])continue;const _0x52fb4c=_0xd75c67(0x4eb)['format'](_0x4cb2e5['padZero'](0x3)),_0x585ddd='$preloadedMap_%1'[_0xd75c67(0x35a)](_0x4cb2e5);DataManager[_0xd75c67(0x49a)](_0x585ddd,_0x52fb4c),setTimeout(this['VisuMZ_Setup_Preload_Map'][_0xd75c67(0x482)](this,_0x4cb2e5,_0x585ddd),0x64);}},Scene_Boot[_0x5f1364(0x5c6)][_0x5f1364(0x558)]=function(_0x4c9b86,_0x5d5df9){const _0x54f398=_0x5f1364;if(window[_0x5d5df9]){if(_0x54f398(0x1db)!==_0x54f398(0x1db)){function _0x4afd82(){const _0x100ad4=_0x54f398;_0x75f3e9[_0x100ad4(0x3f0)](_0x7c92b6[_0x100ad4(0x18b)],_0x4ac646[_0x100ad4(0x418)]||_0x481796[_0x100ad4(0x5be)]());}}else VisuMZ[_0x54f398(0x2ec)][_0x4c9b86]=window[_0x5d5df9],window[_0x5d5df9]=undefined;}else setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x54f398(0x482)](this,_0x4c9b86,_0x5d5df9),0x64);},VisuMZ['AdvancedSwitches']=[],VisuMZ[_0x5f1364(0x206)]=[],VisuMZ[_0x5f1364(0x54c)]=[],VisuMZ['SelfVariables']=[],Scene_Boot[_0x5f1364(0x5c6)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x3a3adf=_0x5f1364;for(let _0x8570f6=0x1;_0x8570f6<$dataSystem[_0x3a3adf(0x3d7)]['length'];_0x8570f6++){if($dataSystem['switches'][_0x8570f6][_0x3a3adf(0x59d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3a3adf(0x518)][_0x3a3adf(0x304)](_0x8570f6);if($dataSystem[_0x3a3adf(0x3d7)][_0x8570f6][_0x3a3adf(0x59d)](/<SELF>/i))VisuMZ[_0x3a3adf(0x206)][_0x3a3adf(0x304)](_0x8570f6);}for(let _0x8a3e6a=0x1;_0x8a3e6a<$dataSystem[_0x3a3adf(0x539)][_0x3a3adf(0x509)];_0x8a3e6a++){if($dataSystem[_0x3a3adf(0x539)][_0x8a3e6a][_0x3a3adf(0x59d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x3a3adf(0x54c)][_0x3a3adf(0x304)](_0x8a3e6a);if($dataSystem['variables'][_0x8a3e6a]['match'](/<SELF>/i))VisuMZ[_0x3a3adf(0x5ab)][_0x3a3adf(0x304)](_0x8a3e6a);}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x474)]={},VisuMZ[_0x5f1364(0x507)]['CustomPageConditions'][_0x5f1364(0x223)]=function(){const _0x3fc761=_0x5f1364;this[_0x3fc761(0x494)]=new Game_CPCInterpreter(),this[_0x3fc761(0x54a)]();},VisuMZ['EventsMoveCore'][_0x5f1364(0x474)][_0x5f1364(0x54a)]=function(){const _0x1fefc6=_0x5f1364;this[_0x1fefc6(0x21c)]=[];for(const _0x1bd59a of $dataCommonEvents){if(!_0x1bd59a)continue;VisuMZ[_0x1fefc6(0x507)][_0x1fefc6(0x474)]['loadCPC'](_0x1bd59a);if(_0x1bd59a[_0x1fefc6(0x2f8)]['length']>0x0)this[_0x1fefc6(0x21c)]['push'](_0x1bd59a['id']);}},VisuMZ['EventsMoveCore'][_0x5f1364(0x474)][_0x5f1364(0x42c)]=function(_0x5d0ad7,_0x42320d){const _0x1aa623=_0x5f1364;return this['_interpreter']['setup'](_0x5d0ad7,_0x42320d),this[_0x1aa623(0x494)][_0x1aa623(0x248)](),this[_0x1aa623(0x494)][_0x1aa623(0x537)];},VisuMZ[_0x5f1364(0x507)]['CustomPageConditions'][_0x5f1364(0x214)]=function(_0x549605){const _0x4da5a3=_0x5f1364;let _0x27273e=![];_0x549605['CPC']=[];for(const _0x2d0bf5 of _0x549605['list']){if([0x6c,0x198][_0x4da5a3(0x161)](_0x2d0bf5['code'])){if(_0x4da5a3(0x4f7)!==_0x4da5a3(0x4f7)){function _0x4012f4(){const _0x42e91a=_0x4da5a3;_0x5048d0['EventsMoveCore'][_0x42e91a(0x19e)][_0x42e91a(0x160)](this);}}else{const _0x5c0538=_0x2d0bf5[_0x4da5a3(0x297)][0x0];if(_0x5c0538['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x4da5a3(0x353)!==_0x4da5a3(0x58b))_0x27273e=!![];else{function _0x4ea3ff(){const _0x161f0d=_0x4da5a3;_0x34feca[_0x161f0d(0x472)](_0x5cd37c,_0x3499b1);const _0x58f22=_0x5887ec[_0x161f0d(0x56c)];_0x2fb074[_0x161f0d(0x28b)](_0x58f22);}}}else{if(_0x5c0538['match'](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x4da5a3(0x1a9)==='yFIEM'){function _0x227f27(){const _0x314a8f=_0x4da5a3,_0x5da597=_0x2ff4f0[_0x314a8f(0x179)](_0x2473b4(_0x4bfd63['$1']));return this[_0x314a8f(0x180)](_0x5da597);}}else _0x27273e=![];}}}}_0x27273e&&_0x549605['CPC'][_0x4da5a3(0x304)](_0x2d0bf5);}},getSelfSwitchValue=function(_0x555e53,_0x3c0fe5,_0x5d8e86){const _0x168364=_0x5f1364;let _0x4a7076=[_0x555e53,_0x3c0fe5,_0x168364(0x332)[_0x168364(0x35a)](_0x5d8e86)];if(typeof _0x5d8e86==='string'){if(_0x168364(0x2e9)===_0x168364(0x3c9)){function _0x28a549(){const _0x188047=_0x168364;_0x5e3411[_0x188047(0x165)]()?this[_0x188047(0x530)](_0x1ea27b):_0x299c91['EventsMoveCore'][_0x188047(0x367)]['call'](this,_0x4e8ce8);}}else _0x4a7076=[_0x555e53,_0x3c0fe5,_0x5d8e86[_0x168364(0x199)]()['trim']()];}return $gameSelfSwitches[_0x168364(0x1b6)](_0x4a7076);},getSelfVariableValue=function(_0xf5b565,_0x30e8fd,_0x427343){const _0x34e935=_0x5f1364,_0x4e1894=[_0xf5b565,_0x30e8fd,'Self\x20Variable\x20%1'['format'](_0x427343)];return $gameSelfSwitches[_0x34e935(0x1b6)](_0x4e1894);},setSelfSwitchValue=function(_0x4418d6,_0x28162d,_0x362c2d,_0xc0303f){const _0x63a37f=_0x5f1364;let _0x20d321=[_0x4418d6,_0x28162d,_0x63a37f(0x332)[_0x63a37f(0x35a)](_0x362c2d)];if(typeof _0x362c2d==='string'){if(_0x63a37f(0x3b2)==='SBYZH')_0x20d321=[_0x4418d6,_0x28162d,_0x362c2d[_0x63a37f(0x199)]()[_0x63a37f(0x2da)]()];else{function _0x266f3b(){const _0x2ca8ac=_0x63a37f;if(!_0xdaa7f0[_0x2ca8ac(0x54f)]())return!![];return _0x441b48[_0x2ca8ac(0x507)][_0x2ca8ac(0x36a)][_0x2ca8ac(0x160)](this);}}}},setSelfVariableValue=function(_0x23a0cf,_0x232516,_0xe1cb8d,_0x42918e){const _0x1aa391=_0x5f1364,_0x5bfca2=[_0x23a0cf,_0x232516,_0x1aa391(0x2f7)[_0x1aa391(0x35a)](_0xe1cb8d)];},DataManager[_0x5f1364(0x541)]=function(_0x7f5da0){const _0x43bc3a=_0x5f1364;if(SceneManager['_scene']['constructor']===Scene_Debug)return![];return VisuMZ[_0x43bc3a(0x518)][_0x43bc3a(0x161)](_0x7f5da0);},DataManager[_0x5f1364(0x29d)]=function(_0x252787){const _0x4200a7=_0x5f1364;if(SceneManager[_0x4200a7(0x446)][_0x4200a7(0x1f4)]===Scene_Debug)return![];return VisuMZ[_0x4200a7(0x54c)][_0x4200a7(0x161)](_0x252787);},DataManager[_0x5f1364(0x34e)]=function(_0x4b3e0c){const _0x451cf3=_0x5f1364;if(SceneManager[_0x451cf3(0x446)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x451cf3(0x206)]['includes'](_0x4b3e0c);},DataManager['isSelfVariable']=function(_0x4b8ba2){const _0x323285=_0x5f1364;if(SceneManager[_0x323285(0x446)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x323285(0x5ab)][_0x323285(0x161)](_0x4b8ba2);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x4d3)]=Game_Temp[_0x5f1364(0x5c6)][_0x5f1364(0x44f)],Game_Temp[_0x5f1364(0x5c6)][_0x5f1364(0x44f)]=function(_0x195a91,_0x55d853){const _0x368f62=_0x5f1364;if(this[_0x368f62(0x386)](_0x195a91,_0x55d853))return;VisuMZ[_0x368f62(0x507)][_0x368f62(0x4d3)][_0x368f62(0x160)](this,_0x195a91,_0x55d853);},Game_Temp['prototype']['isEventClickTriggered']=function(_0x3d4126,_0x25931e){const _0x192e1b=_0x5f1364,_0x4ccb9d=$gameMap['eventsXy'](_0x3d4126,_0x25931e);for(const _0x2c6c55 of _0x4ccb9d){if(_0x192e1b(0x5b0)!=='Altdn'){if(_0x2c6c55&&_0x2c6c55[_0x192e1b(0x45d)]()){if(_0x192e1b(0x41b)==='foVVk'){function _0x103af6(){const _0x30f0fa=_0x192e1b;if(_0x4f23f4[_0x30f0fa(0x4f4)](_0x278560,_0x5dd2f9,_0x3fed7a,'player'))return this[_0x30f0fa(0x49e)]()&&this['vehicle']()?this[_0x30f0fa(0x24d)]()[_0x30f0fa(0x173)](_0x375a27,_0x411df8,_0x57cad8):!![];if(_0x4006aa['isRegionForbidPass'](_0x221b31,_0x5dea6e,_0x4680af,_0x30f0fa(0x150)))return![];return _0x4857ae['EventsMoveCore'][_0x30f0fa(0x26b)][_0x30f0fa(0x160)](this,_0x581070,_0x2d59d6,_0x56acd2);}}else return _0x2c6c55[_0x192e1b(0x30e)](),!![];}}else{function _0x403ce2(){const _0xa91a9a=_0x192e1b;_0x238437['EventsMoveCore'][_0xa91a9a(0x3f9)][_0xa91a9a(0x160)](this,_0x503534);if(this['_paused']===_0x1f89ed)this[_0xa91a9a(0x45f)]();this[_0xa91a9a(0x465)]=![];}}}return![];},Game_Temp[_0x5f1364(0x5c6)][_0x5f1364(0x409)]=function(_0x5aba85){const _0xdc2ae4=_0x5f1364;this[_0xdc2ae4(0x273)]=_0x5aba85;},Game_Temp['prototype'][_0x5f1364(0x3c0)]=function(){const _0x3dc288=_0x5f1364;return this[_0x3dc288(0x273)];},Game_Temp[_0x5f1364(0x5c6)][_0x5f1364(0x148)]=function(_0xe296d7){const _0x25db58=_0x5f1364;this[_0x25db58(0x224)]=_0xe296d7;},Game_Temp[_0x5f1364(0x5c6)]['clearSelfTarget']=function(){const _0x4ed765=_0x5f1364;this[_0x4ed765(0x224)]=undefined;},Game_Temp[_0x5f1364(0x5c6)]['getSelfTarget']=function(){const _0x55b5aa=_0x5f1364;return this[_0x55b5aa(0x224)];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x283)]=Game_System[_0x5f1364(0x5c6)]['initialize'],Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x223)]=function(){const _0x37eecf=_0x5f1364;VisuMZ[_0x37eecf(0x507)]['Game_System_initialize'][_0x37eecf(0x160)](this),this[_0x37eecf(0x45f)](),this['initFollowerController']();},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x45f)]=function(){const _0x375709=_0x5f1364;this[_0x375709(0x467)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x375709(0x2f2)]={},this['_MapSpawnedEventData']=[],this[_0x375709(0x5c9)]={},this[_0x375709(0x244)]={},this[_0x375709(0x548)]=![],this[_0x375709(0x230)]=_0x375709(0x455);},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x54f)]=function(){const _0x160b5d=_0x5f1364;if(this[_0x160b5d(0x467)]===undefined)this[_0x160b5d(0x45f)]();if(this[_0x160b5d(0x467)][_0x160b5d(0x1d6)]===undefined)this[_0x160b5d(0x45f)]();return this['_EventsMoveCoreSettings'][_0x160b5d(0x1d6)];},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x561)]=function(_0x4e5180){const _0x1d8c07=_0x5f1364;if(this[_0x1d8c07(0x467)]===undefined)this[_0x1d8c07(0x45f)]();if(this[_0x1d8c07(0x467)][_0x1d8c07(0x1d6)]===undefined)this['initEventsMoveCore']();this[_0x1d8c07(0x467)][_0x1d8c07(0x1d6)]=_0x4e5180;},Game_System[_0x5f1364(0x5c6)]['isAllowEventAutoMovement']=function(){const _0x10d70d=_0x5f1364;if(this[_0x10d70d(0x467)]===undefined)this[_0x10d70d(0x45f)]();if(this[_0x10d70d(0x467)][_0x10d70d(0x582)]===undefined)this[_0x10d70d(0x45f)]();return this[_0x10d70d(0x467)][_0x10d70d(0x582)];},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x420)]=function(_0x3a53d5){const _0x43ee78=_0x5f1364;if(this[_0x43ee78(0x467)]===undefined)this[_0x43ee78(0x45f)]();if(this[_0x43ee78(0x467)][_0x43ee78(0x582)]===undefined)this[_0x43ee78(0x45f)]();this['_EventsMoveCoreSettings'][_0x43ee78(0x582)]=_0x3a53d5;},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x313)]=function(){const _0x27e096=_0x5f1364;if(this[_0x27e096(0x467)]===undefined)this[_0x27e096(0x45f)]();if(this['_EventsMoveCoreSettings'][_0x27e096(0x24c)]===undefined)this[_0x27e096(0x45f)]();return this[_0x27e096(0x467)]['VisibleEventLabels'];},Game_System['prototype'][_0x5f1364(0x528)]=function(_0x26bf7e){const _0x852aff=_0x5f1364;if(this[_0x852aff(0x467)]===undefined)this[_0x852aff(0x45f)]();if(this[_0x852aff(0x467)][_0x852aff(0x24c)]===undefined)this['initEventsMoveCore']();this['_EventsMoveCoreSettings'][_0x852aff(0x24c)]=_0x26bf7e;},Game_System[_0x5f1364(0x5c6)]['isPlayerControlDisabled']=function(){const _0x440ac3=_0x5f1364;return this[_0x440ac3(0x548)]===undefined&&(this[_0x440ac3(0x548)]=![]),this[_0x440ac3(0x548)];},Game_System[_0x5f1364(0x5c6)]['setPlayerControlDisable']=function(_0x1a39bd){const _0x5ef2ce=_0x5f1364;this[_0x5ef2ce(0x548)]=_0x1a39bd;},Game_System[_0x5f1364(0x5c6)]['getPlayerDiagonalSetting']=function(){const _0x49af7a=_0x5f1364;return this[_0x49af7a(0x230)];},Game_System['prototype'][_0x5f1364(0x373)]=function(_0x5db486){const _0x123f4e=_0x5f1364;this['_PlayerDiagonalSetting']=String(_0x5db486)[_0x123f4e(0x51e)]()['trim']();},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x344)]=function(_0x2cdea4){const _0x1a7fb3=_0x5f1364;if(this[_0x1a7fb3(0x2f2)]===undefined)this[_0x1a7fb3(0x45f)]();if(!_0x2cdea4)return null;if(_0x2cdea4===$gamePlayer){if(_0x1a7fb3(0x17c)!=='wNeRt'){function _0x4564e8(){const _0x372a48=_0x1a7fb3;return _0x20943c[_0x372a48(0x5c6)][_0x372a48(0x196)][_0x372a48(0x160)](this,_0x598f18),this[_0x372a48(0x407)][_0x372a48(0x30a)](_0x39972a=>_0x39972a['match'](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this['_cpc']=!![]),!![];}}else return this['_EventIcons'][_0x1a7fb3(0x3ed)];}else{if(_0x1a7fb3(0x52c)!==_0x1a7fb3(0x52c)){function _0x330b4d(){const _0x1b0538=_0x1a7fb3;_0x445810[_0x1b0538(0x148)](_0x207022[_0x1b0538(0x560)]),_0x18fb1c[_0x1b0538(0x507)][_0x1b0538(0x2cd)][_0x1b0538(0x160)](this),_0x4a94ac[_0x1b0538(0x254)](),_0xde2c4d['_selfTargetItemChoice']=_0x14ff4a;}}else{const _0x44dde4=VisuMZ[_0x1a7fb3(0x507)][_0x1a7fb3(0x18d)],_0xd1e426=_0x1a7fb3(0x4fc)[_0x1a7fb3(0x35a)](_0x2cdea4[_0x1a7fb3(0x5cb)],_0x2cdea4[_0x1a7fb3(0x133)]);return this[_0x1a7fb3(0x2f2)][_0xd1e426]=this['_EventIcons'][_0xd1e426]||{'iconIndex':0x0,'bufferX':_0x44dde4[_0x1a7fb3(0x333)][_0x1a7fb3(0x192)],'bufferY':_0x44dde4[_0x1a7fb3(0x333)]['BufferY'],'blendMode':_0x44dde4['Icon'][_0x1a7fb3(0x1ca)]},this[_0x1a7fb3(0x2f2)][_0xd1e426];}}},Game_System['prototype'][_0x5f1364(0x405)]=function(_0x31b7f9,_0x5e1d96,_0x58cf00,_0x50058e,_0x563f70){const _0x918e58=_0x5f1364;if(this[_0x918e58(0x2f2)]===undefined)this[_0x918e58(0x45f)]();const _0x3d3e25=_0x31b7f9===$gamePlayer?'Player':_0x918e58(0x4fc)[_0x918e58(0x35a)](_0x31b7f9[_0x918e58(0x5cb)],_0x31b7f9[_0x918e58(0x133)]);this[_0x918e58(0x2f2)][_0x3d3e25]={'iconIndex':_0x5e1d96,'bufferX':_0x58cf00,'bufferY':_0x50058e,'blendMode':_0x563f70};},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x3f1)]=function(_0x36c3b8,_0x5f33d6,_0x487ba9,_0xf0e7e7,_0x2dfc48,_0x5d981b){const _0x3ede9b=_0x5f1364;if(this[_0x3ede9b(0x2f2)]===undefined)this[_0x3ede9b(0x45f)]();const _0x59edda=_0x3ede9b(0x4fc)[_0x3ede9b(0x35a)](_0x36c3b8,_0x5f33d6);this[_0x3ede9b(0x2f2)][_0x59edda]={'iconIndex':_0x487ba9,'bufferX':_0xf0e7e7,'bufferY':_0x2dfc48,'blendMode':_0x5d981b};},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x1f6)]=function(_0x2fc283){const _0x4f6717=_0x5f1364;if(this[_0x4f6717(0x2f2)]===undefined)this[_0x4f6717(0x45f)]();if(!_0x2fc283)return null;if(_0x2fc283===$gamePlayer){if(_0x4f6717(0x34b)!==_0x4f6717(0x34b)){function _0x2be153(){const _0x194548=_0x4f6717;return this[_0x194548(0x23f)][_0x194548(0x21f)];}}else delete this['_EventIcons'][_0x4f6717(0x3ed)];}else this[_0x4f6717(0x171)](_0x2fc283[_0x4f6717(0x5cb)],_0x2fc283[_0x4f6717(0x133)]);},Game_System[_0x5f1364(0x5c6)]['deleteIconsOnEventsDataKey']=function(_0x659c07,_0x3d361e){const _0x302817=_0x5f1364;if(this[_0x302817(0x2f2)]===undefined)this[_0x302817(0x45f)]();const _0x553055=_0x302817(0x4fc)[_0x302817(0x35a)](_0x659c07,_0x3d361e);delete this[_0x302817(0x2f2)][_0x553055];},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x394)]=function(_0x3a67c8){const _0x3aa57d=_0x5f1364;if(this[_0x3aa57d(0x244)]===undefined)this[_0x3aa57d(0x45f)]();if(!_0x3a67c8)return null;const _0x565bf6=_0x3aa57d(0x4fc)[_0x3aa57d(0x35a)](_0x3a67c8[_0x3aa57d(0x5cb)],_0x3a67c8['_eventId']);return this[_0x3aa57d(0x244)][_0x565bf6];},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x390)]=function(_0x38faaf){const _0x3e9224=_0x5f1364;if(this['_SavedEventLocations']===undefined)this[_0x3e9224(0x45f)]();if(!_0x38faaf)return;const _0x122586=_0x3e9224(0x4fc)['format'](_0x38faaf[_0x3e9224(0x5cb)],_0x38faaf[_0x3e9224(0x133)]);this[_0x3e9224(0x244)][_0x122586]={'direction':_0x38faaf['direction'](),'x':Math[_0x3e9224(0x325)](_0x38faaf['x']),'y':Math[_0x3e9224(0x325)](_0x38faaf['y']),'pageIndex':_0x38faaf[_0x3e9224(0x2dd)],'moveRouteIndex':_0x38faaf[_0x3e9224(0x525)]};},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x314)]=function(_0x4fc75c){const _0x4f87a3=_0x5f1364;if(this['_SavedEventLocations']===undefined)this['initEventsMoveCore']();if(!_0x4fc75c)return;this['deleteSavedEventLocationKey'](_0x4fc75c['_mapId'],_0x4fc75c[_0x4f87a3(0x133)]);},Game_System[_0x5f1364(0x5c6)]['deleteSavedEventLocationKey']=function(_0x59821e,_0x7c94f9){const _0x2361ef=_0x5f1364;if(this[_0x2361ef(0x244)]===undefined)this[_0x2361ef(0x45f)]();const _0x312b77=_0x2361ef(0x4fc)['format'](_0x59821e,_0x7c94f9);delete this['_SavedEventLocations'][_0x312b77];},Game_System[_0x5f1364(0x5c6)]['createSaveEventLocationData']=function(_0x30bae6,_0x181cfd,_0x1eb4f7,_0x2632f3,_0x1ee809,_0x3605f8,_0x35cd30){const _0x2e1518=_0x5f1364;if(this[_0x2e1518(0x244)]===undefined)this[_0x2e1518(0x45f)]();const _0x17a53c=_0x2e1518(0x4fc)['format'](_0x30bae6,_0x181cfd);this['_SavedEventLocations'][_0x17a53c]={'direction':_0x1ee809,'x':Math['round'](_0x1eb4f7),'y':Math['round'](_0x2632f3),'pageIndex':_0x3605f8,'moveRouteIndex':_0x35cd30};},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x3b9)]=function(_0x39bb16){const _0xfc5b0c=_0x5f1364;if(this[_0xfc5b0c(0x5c9)]===undefined)this['initEventsMoveCore']();if(!_0x39bb16)return;const _0x4bbaac=_0xfc5b0c(0x4fc)[_0xfc5b0c(0x35a)](_0x39bb16['_mapId'],_0x39bb16[_0xfc5b0c(0x133)]);return this[_0xfc5b0c(0x5c9)][_0x4bbaac];},Game_System['prototype']['savePreservedMorphEventDataKey']=function(_0x27eeca,_0x9a3e7e,_0x842809,_0x588a46,_0x410d04){const _0x5e1852=_0x5f1364;if(this[_0x5e1852(0x5c9)]===undefined)this[_0x5e1852(0x45f)]();const _0x59d0a2=_0x5e1852(0x4fc)[_0x5e1852(0x35a)](_0x27eeca,_0x9a3e7e);this[_0x5e1852(0x5c9)][_0x59d0a2]={'template':_0x842809,'mapId':_0x588a46,'eventId':_0x410d04};},Game_System['prototype'][_0x5f1364(0x55a)]=function(_0x4ef93c,_0x2a01c1){const _0x520830=_0x5f1364;if(this[_0x520830(0x5c9)]===undefined)this[_0x520830(0x45f)]();const _0xe81042=_0x520830(0x4fc)['format'](_0x4ef93c,_0x2a01c1);delete this[_0x520830(0x5c9)][_0xe81042];},Game_System[_0x5f1364(0x5c6)]['getMapSpawnedEventData']=function(_0x3abb38){const _0x24cc51=_0x5f1364;if(this[_0x24cc51(0x17f)]===undefined)this[_0x24cc51(0x45f)]();return this[_0x24cc51(0x17f)][_0x3abb38]=this['_MapSpawnedEventData'][_0x3abb38]||[],this[_0x24cc51(0x17f)][_0x3abb38];},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x4e1)]=function(_0x1eb5f8){const _0x91f61c=_0x5f1364,_0x3f229c=this[_0x91f61c(0x53b)](_0x1eb5f8);for(const _0x1da586 of _0x3f229c){if(!_0x1da586)continue;if(_0x1da586[_0x91f61c(0x588)])continue;const _0x3f6d60=_0x3f229c['indexOf'](_0x1da586);_0x3f229c[_0x3f6d60]=null;}},Game_System['prototype'][_0x5f1364(0x521)]=function(){const _0xda8a36=_0x5f1364;this[_0xda8a36(0x262)]=0x0,this[_0xda8a36(0x205)]=![];},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x2fb)]=function(){const _0x5dfd75=_0x5f1364;if(this[_0x5dfd75(0x262)]===undefined)this[_0x5dfd75(0x521)]();return this[_0x5dfd75(0x262)];},Game_System['prototype']['setControlledFollowerID']=function(_0x3f53f8){const _0x5516d8=_0x5f1364;if(this[_0x5516d8(0x262)]===undefined)this['initFollowerController']();this['_followerControlID']=_0x3f53f8;;},VisuMZ[_0x5f1364(0x507)]['Game_Interpreter_character']=Game_Interpreter[_0x5f1364(0x5c6)][_0x5f1364(0x59b)],Game_Interpreter[_0x5f1364(0x5c6)][_0x5f1364(0x59b)]=function(_0x365d07){const _0x47d3e2=_0x5f1364;if(!$gameParty['inBattle']()&&_0x365d07<0x0){let _0x157f2d=$gameSystem[_0x47d3e2(0x2fb)]();if(_0x157f2d>0x0){if(_0x47d3e2(0x2be)!==_0x47d3e2(0x2be)){function _0x280fd4(){const _0x1250dd=_0x47d3e2,_0x33e451=[_0x26ecac[_0x1250dd(0x5cb)],_0xaaccb1[_0x1250dd(0x133)],_0x1250dd(0x2f7)['format'](_0x3360a5)];_0x5337e4[_0x1250dd(0x13f)](_0x33e451,_0x387026);}}else return $gamePlayer[_0x47d3e2(0x2b6)]()[_0x47d3e2(0x181)](_0x157f2d-0x1);}}return VisuMZ[_0x47d3e2(0x507)][_0x47d3e2(0x526)][_0x47d3e2(0x160)](this,_0x365d07);},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x2a3)]=function(){const _0x18bddf=_0x5f1364;if(this[_0x18bddf(0x205)]===undefined)this[_0x18bddf(0x521)]();return this[_0x18bddf(0x205)];},Game_System[_0x5f1364(0x5c6)][_0x5f1364(0x586)]=function(_0x5690c4){const _0xb0f8a5=_0x5f1364;if(this[_0xb0f8a5(0x205)]===undefined)this[_0xb0f8a5(0x521)]();this['_followerChaseOff']=_0x5690c4;;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x4d1)]=Game_Timer[_0x5f1364(0x5c6)][_0x5f1364(0x223)],Game_Timer['prototype'][_0x5f1364(0x223)]=function(){const _0x17e2e6=_0x5f1364;VisuMZ[_0x17e2e6(0x507)][_0x17e2e6(0x4d1)][_0x17e2e6(0x160)](this),this[_0x17e2e6(0x45f)]();},Game_Timer['prototype'][_0x5f1364(0x45f)]=function(){const _0x537332=_0x5f1364;this['_paused']=![],this[_0x537332(0x1b0)]=-0x1,this['_expireCommonEvent']=0x0;},Game_Timer[_0x5f1364(0x5c6)][_0x5f1364(0x1d4)]=function(_0x5be079){const _0x1c67da=_0x5f1364;if(!_0x5be079)return;if(!this[_0x1c67da(0x28d)])return;if(this[_0x1c67da(0x465)])return;if(this[_0x1c67da(0x2fd)]<=0x0)return;if(this[_0x1c67da(0x1b0)]===undefined)this[_0x1c67da(0x45f)]();this[_0x1c67da(0x2fd)]+=this[_0x1c67da(0x1b0)];if(this[_0x1c67da(0x2fd)]<=0x0){if(_0x1c67da(0x4de)===_0x1c67da(0x2cb)){function _0x348737(){const _0x94c685=_0x1c67da;this[_0x94c685(0x56e)](_0x1bb6af,_0x285aee);}}else this[_0x1c67da(0x5a1)]();}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x3f9)]=Game_Timer[_0x5f1364(0x5c6)]['start'],Game_Timer['prototype'][_0x5f1364(0x457)]=function(_0xe5b7f){const _0x5cc694=_0x5f1364;VisuMZ[_0x5cc694(0x507)][_0x5cc694(0x3f9)][_0x5cc694(0x160)](this,_0xe5b7f);if(this[_0x5cc694(0x465)]===undefined)this['initEventsMoveCore']();this[_0x5cc694(0x465)]=![];},VisuMZ['EventsMoveCore'][_0x5f1364(0x3cf)]=Game_Timer[_0x5f1364(0x5c6)][_0x5f1364(0x21d)],Game_Timer[_0x5f1364(0x5c6)][_0x5f1364(0x21d)]=function(){const _0x2c0a7b=_0x5f1364;VisuMZ[_0x2c0a7b(0x507)]['Game_Timer_stop']['call'](this);if(this[_0x2c0a7b(0x465)]===undefined)this[_0x2c0a7b(0x45f)]();this[_0x2c0a7b(0x465)]=![];},Game_Timer[_0x5f1364(0x5c6)][_0x5f1364(0x302)]=function(){const _0x207ef0=_0x5f1364;if(this[_0x207ef0(0x2fd)]<=0x0)return;this[_0x207ef0(0x465)]=!![],this[_0x207ef0(0x28d)]=!![];},Game_Timer['prototype'][_0x5f1364(0x3d0)]=function(){const _0x15eab9=_0x5f1364;if(this[_0x15eab9(0x2fd)]<=0x0)return;this[_0x15eab9(0x465)]=![],this[_0x15eab9(0x28d)]=!![];},Game_Timer[_0x5f1364(0x5c6)]['gainFrames']=function(_0x5c0c4e){const _0x2eadff=_0x5f1364;this['_frames']=this['_frames']||0x0,this['_frames']+=_0x5c0c4e,this[_0x2eadff(0x28d)]=!![],this[_0x2eadff(0x2fd)]=Math[_0x2eadff(0x36c)](0x1,this['_frames']);},Game_Timer['prototype'][_0x5f1364(0x480)]=function(_0x26c7b4){const _0x327ef7=_0x5f1364;this['_frames']=this['_frames']||0x0,this['_frames']=_0x26c7b4,this[_0x327ef7(0x28d)]=!![],this[_0x327ef7(0x2fd)]=Math[_0x327ef7(0x36c)](0x1,this['_frames']);},Game_Timer[_0x5f1364(0x5c6)]['changeSpeed']=function(_0x1cea0d){const _0x2a5e12=_0x5f1364;this[_0x2a5e12(0x1b0)]=_0x1cea0d,this['_working']=!![],_0x1cea0d>0x0&&(this[_0x2a5e12(0x2fd)]=Math['max'](this[_0x2a5e12(0x2fd)],0x1));},Game_Timer[_0x5f1364(0x5c6)][_0x5f1364(0x28b)]=function(_0x566473){const _0x9f8e87=_0x5f1364;if(this[_0x9f8e87(0x374)]===undefined)this[_0x9f8e87(0x45f)]();this[_0x9f8e87(0x374)]=_0x566473;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x19e)]=Game_Timer[_0x5f1364(0x5c6)][_0x5f1364(0x5a1)],Game_Timer[_0x5f1364(0x5c6)]['onExpire']=function(){const _0x1be2e3=_0x5f1364;if(this[_0x1be2e3(0x374)]===undefined)this['initEventsMoveCore']();if(this[_0x1be2e3(0x374)]){if(_0x1be2e3(0x493)===_0x1be2e3(0x464)){function _0x53fb7a(){const _0x129057=_0x1be2e3,_0x34ab16=_0x9b8dd(_0xfefd31['$1'])[_0x129057(0x51e)]()[_0x129057(0x2da)](),_0x2caa6f=_0x28ef61(_0x3f7e95['$2']);this[_0x129057(0x4fa)][_0x34ab16]=_0x2caa6f;}}else $gameTemp['reserveCommonEvent'](this[_0x1be2e3(0x374)]);}else VisuMZ[_0x1be2e3(0x507)]['Game_Timer_onExpire'][_0x1be2e3(0x160)](this);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x3d3)]=Game_Message['prototype'][_0x5f1364(0x5a0)],Game_Message[_0x5f1364(0x5c6)]['add']=function(_0xba3d23){const _0x50f274=_0x5f1364;VisuMZ[_0x50f274(0x507)][_0x50f274(0x3d3)][_0x50f274(0x160)](this,_0xba3d23),this[_0x50f274(0x432)]=$gameTemp[_0x50f274(0x16a)]();},Game_Message[_0x5f1364(0x5c6)]['registerSelfEvent']=function(){const _0x3ee238=_0x5f1364;$gameTemp[_0x3ee238(0x148)](this[_0x3ee238(0x432)]);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x240)]=Game_Switches[_0x5f1364(0x5c6)][_0x5f1364(0x1b6)],Game_Switches['prototype'][_0x5f1364(0x1b6)]=function(_0x3cb281){const _0x4140c8=_0x5f1364;if(DataManager['isAdvancedSwitch'](_0x3cb281))return!!this[_0x4140c8(0x4b1)](_0x3cb281);else return DataManager['isSelfSwitch'](_0x3cb281)?!!this[_0x4140c8(0x54d)](_0x3cb281):VisuMZ[_0x4140c8(0x507)]['Game_Switches_value'][_0x4140c8(0x160)](this,_0x3cb281);},Game_Switches[_0x5f1364(0x397)]={},Game_Switches['prototype'][_0x5f1364(0x4b1)]=function(_0x2e9659){const _0x2cebb4=_0x5f1364;if(!Game_Switches['advancedFunc'][_0x2e9659]){$dataSystem[_0x2cebb4(0x3d7)][_0x2e9659][_0x2cebb4(0x59d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5f2674=_0x2cebb4(0x1eb)['format'](String(RegExp['$1']));Game_Switches['advancedFunc'][_0x2e9659]=new Function(_0x2cebb4(0x284),_0x5f2674);}const _0x50af8e=$gameTemp[_0x2cebb4(0x16a)]()||this;return Game_Switches[_0x2cebb4(0x397)][_0x2e9659][_0x2cebb4(0x160)](_0x50af8e,_0x2e9659);},Game_Switches['prototype'][_0x5f1364(0x54d)]=function(_0x410233){const _0x3216bc=_0x5f1364,_0x19e4e6=$gameTemp[_0x3216bc(0x16a)]()||this;if(_0x19e4e6['constructor']!==Game_Event)return VisuMZ[_0x3216bc(0x507)][_0x3216bc(0x240)][_0x3216bc(0x160)](this,_0x410233);else{const _0x48b3cb=[_0x19e4e6[_0x3216bc(0x5cb)],_0x19e4e6[_0x3216bc(0x133)],_0x3216bc(0x332)[_0x3216bc(0x35a)](_0x410233)];return $gameSelfSwitches[_0x3216bc(0x1b6)](_0x48b3cb);}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x23a)]=Game_Switches[_0x5f1364(0x5c6)]['setValue'],Game_Switches[_0x5f1364(0x5c6)]['setValue']=function(_0x3ca793,_0x5080f0){const _0x811363=_0x5f1364;if(DataManager['isSelfSwitch'](_0x3ca793)){if(_0x811363(0x26f)!=='kWNsn')this[_0x811363(0x56e)](_0x3ca793,_0x5080f0);else{function _0x24f82b(){const _0x50e454=_0x811363;this[_0x50e454(0x4f8)]['list']['splice'](this[_0x50e454(0x525)]+0x1,0x0,_0x32d385);}}}else{if(_0x811363(0x23e)!=='qAUfz')VisuMZ[_0x811363(0x507)][_0x811363(0x23a)]['call'](this,_0x3ca793,_0x5080f0);else{function _0x379b4c(){const _0x60d2ca=_0x811363;if(!_0x357b9e)return;if(!this[_0x60d2ca(0x28d)])return;if(this[_0x60d2ca(0x465)])return;if(this['_frames']<=0x0)return;if(this[_0x60d2ca(0x1b0)]===_0x1a6168)this['initEventsMoveCore']();this[_0x60d2ca(0x2fd)]+=this[_0x60d2ca(0x1b0)],this[_0x60d2ca(0x2fd)]<=0x0&&this['onExpire']();}}}},Game_Switches[_0x5f1364(0x5c6)][_0x5f1364(0x56e)]=function(_0x24a9e8,_0x11db46){const _0x343519=_0x5f1364,_0x437d2d=$gameTemp['getSelfTarget']()||this;if(_0x437d2d['constructor']!==Game_Event){if(_0x343519(0x1fe)!==_0x343519(0x1fe)){function _0x8cfdff(){const _0xbff392=_0x343519;if(this[_0xbff392(0x4d5)])return!![];return _0x393a69[_0xbff392(0x5c6)][_0xbff392(0x2bf)][_0xbff392(0x160)](this);}}else VisuMZ[_0x343519(0x507)]['Game_Switches_setValue'][_0x343519(0x160)](this,_0x24a9e8,_0x11db46);}else{if(_0x343519(0x357)===_0x343519(0x357)){const _0x805871=[_0x437d2d[_0x343519(0x5cb)],_0x437d2d['_eventId'],_0x343519(0x332)['format'](_0x24a9e8)];$gameSelfSwitches[_0x343519(0x13f)](_0x805871,_0x11db46);}else{function _0x24eb86(){const _0x128a2a=_0x343519;if(_0xbec416[_0x128a2a(0x29d)](_0x4aa41e))return this[_0x128a2a(0x4b1)](_0x9b6f9a);else return _0x565fa3[_0x128a2a(0x263)](_0x34ceef)?this['selfValue'](_0xa12ba1):_0x51ab72[_0x128a2a(0x507)][_0x128a2a(0x1ec)][_0x128a2a(0x160)](this,_0x22e871);}}}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x1ec)]=Game_Variables[_0x5f1364(0x5c6)][_0x5f1364(0x1b6)],Game_Variables['prototype'][_0x5f1364(0x1b6)]=function(_0x4d8c8f){const _0x1ec27e=_0x5f1364;if(DataManager['isAdvancedVariable'](_0x4d8c8f)){if('aECUC'!==_0x1ec27e(0x599))return this['advancedValue'](_0x4d8c8f);else{function _0x4c2111(){_0x18abf9=_0x4ab3ca(_0x3675be['$1']),_0x2db055=_0x226775(_0x4c2127['$2']);}}}else return DataManager[_0x1ec27e(0x263)](_0x4d8c8f)?this[_0x1ec27e(0x54d)](_0x4d8c8f):VisuMZ[_0x1ec27e(0x507)]['Game_Variables_value'][_0x1ec27e(0x160)](this,_0x4d8c8f);},Game_Variables[_0x5f1364(0x397)]={},Game_Variables[_0x5f1364(0x5c6)][_0x5f1364(0x4b1)]=function(_0x548a6f){const _0x5e6ee8=_0x5f1364;if(!Game_Variables[_0x5e6ee8(0x397)][_0x548a6f]){$dataSystem['variables'][_0x548a6f][_0x5e6ee8(0x59d)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x1097bd=_0x5e6ee8(0x1eb)[_0x5e6ee8(0x35a)](String(RegExp['$1']));Game_Variables['advancedFunc'][_0x548a6f]=new Function(_0x5e6ee8(0x2d0),_0x1097bd);}const _0x2e66e8=$gameTemp[_0x5e6ee8(0x16a)]()||this;return Game_Variables[_0x5e6ee8(0x397)][_0x548a6f][_0x5e6ee8(0x160)](_0x2e66e8,_0x548a6f);},Game_Variables[_0x5f1364(0x5c6)][_0x5f1364(0x54d)]=function(_0x234474){const _0x278eb9=_0x5f1364,_0x18a686=$gameTemp[_0x278eb9(0x16a)]()||this;if(_0x18a686['constructor']!==Game_Event){if(_0x278eb9(0x52d)==='KvqbC')return VisuMZ['EventsMoveCore'][_0x278eb9(0x1ec)]['call'](this,_0x234474);else{function _0x533953(){const _0x79b729=_0x278eb9,_0x36202c=this[_0x79b729(0x31a)](),_0x2af953=_0x213c67['roundXWithDirection'](this['x'],_0x36202c),_0x8ff5d7=_0x40b892['roundYWithDirection'](this['y'],_0x36202c);this[_0x79b729(0x43e)](_0x2af953,_0x8ff5d7);}}}else{const _0x332f9b=[_0x18a686[_0x278eb9(0x5cb)],_0x18a686[_0x278eb9(0x133)],'Self\x20Variable\x20%1'[_0x278eb9(0x35a)](_0x234474)];return $gameSelfSwitches[_0x278eb9(0x1b6)](_0x332f9b);}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x3ec)]=Game_Variables[_0x5f1364(0x5c6)][_0x5f1364(0x13f)],Game_Variables['prototype'][_0x5f1364(0x13f)]=function(_0x5826ad,_0x50b5cb){const _0x581ce4=_0x5f1364;if(DataManager[_0x581ce4(0x263)](_0x5826ad))this[_0x581ce4(0x56e)](_0x5826ad,_0x50b5cb);else{if(_0x581ce4(0x237)!==_0x581ce4(0x3d8))VisuMZ[_0x581ce4(0x507)][_0x581ce4(0x3ec)][_0x581ce4(0x160)](this,_0x5826ad,_0x50b5cb);else{function _0x5964fd(){const _0x5ecab6=_0x581ce4;this[_0x5ecab6(0x460)]=!![];return;}}}},Game_Variables[_0x5f1364(0x5c6)][_0x5f1364(0x56e)]=function(_0x30527e,_0x5114f0){const _0xa4f5d=_0x5f1364,_0x3f1d63=$gameTemp['getSelfTarget']()||this;if(_0x3f1d63[_0xa4f5d(0x1f4)]!==Game_Event){if(_0xa4f5d(0x250)!==_0xa4f5d(0x250)){function _0x227c56(){_0x718fa5=!![];}}else VisuMZ['EventsMoveCore'][_0xa4f5d(0x3ec)][_0xa4f5d(0x160)](this,_0x30527e,_0x5114f0);}else{const _0x123a1a=[_0x3f1d63[_0xa4f5d(0x5cb)],_0x3f1d63[_0xa4f5d(0x133)],'Self\x20Variable\x20%1'[_0xa4f5d(0x35a)](_0x30527e)];$gameSelfSwitches[_0xa4f5d(0x13f)](_0x123a1a,_0x5114f0);}},VisuMZ['EventsMoveCore'][_0x5f1364(0x226)]=Game_SelfSwitches['prototype'][_0x5f1364(0x1b6)],Game_SelfSwitches['prototype'][_0x5f1364(0x1b6)]=function(_0x54830d){const _0x1a775f=_0x5f1364;if(_0x54830d[0x2][_0x1a775f(0x59d)](/SELF/i))return this[_0x1a775f(0x54d)](_0x54830d);else{if('xoVyz'!==_0x1a775f(0x147)){function _0x2fa528(){const _0x4169ab=_0x1a775f;if(_0x14985e[_0x4169ab(0x427)])this[_0x4169ab(0x583)](_0x5ad4bf[_0x4169ab(0x427)]);}}else{return VisuMZ['EventsMoveCore'][_0x1a775f(0x226)]['call'](this,_0x54830d);;}}},Game_SelfSwitches[_0x5f1364(0x5c6)][_0x5f1364(0x54d)]=function(_0x24d1dd){const _0x292076=_0x5f1364;return _0x24d1dd[0x2][_0x292076(0x59d)](/VAR/i)?this[_0x292076(0x2fc)][_0x24d1dd]||0x0:!!this[_0x292076(0x2fc)][_0x24d1dd];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x3d1)]=Game_SelfSwitches[_0x5f1364(0x5c6)][_0x5f1364(0x13f)],Game_SelfSwitches['prototype'][_0x5f1364(0x13f)]=function(_0x115281,_0x1184a8){const _0x589cad=_0x5f1364;_0x115281[0x2][_0x589cad(0x59d)](/SELF/i)?this[_0x589cad(0x56e)](_0x115281,_0x1184a8):VisuMZ[_0x589cad(0x507)][_0x589cad(0x3d1)][_0x589cad(0x160)](this,_0x115281,_0x1184a8);},Game_SelfSwitches[_0x5f1364(0x5c6)][_0x5f1364(0x56e)]=function(_0xd5352f,_0x54b683){const _0x4253bc=_0x5f1364;this['_data'][_0xd5352f]=_0xd5352f[0x2][_0x4253bc(0x59d)](/VAR/i)?_0x54b683:!!_0x54b683,this[_0x4253bc(0x2d9)]();},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x162)]=Game_Enemy[_0x5f1364(0x5c6)]['meetsSwitchCondition'],Game_Enemy[_0x5f1364(0x5c6)][_0x5f1364(0x184)]=function(_0x3f28bc){const _0x5aaa64=_0x5f1364;$gameTemp['registerSelfTarget'](this);const _0x16c3ab=VisuMZ[_0x5aaa64(0x507)][_0x5aaa64(0x162)]['call'](this,_0x3f28bc);return $gameTemp[_0x5aaa64(0x254)](),_0x16c3ab;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x476)]=Game_Troop[_0x5f1364(0x5c6)][_0x5f1364(0x488)],Game_Troop[_0x5f1364(0x5c6)][_0x5f1364(0x488)]=function(_0x2283a2){const _0xc8260=_0x5f1364;$gameTemp[_0xc8260(0x148)](this);const _0x1a357a=VisuMZ[_0xc8260(0x507)][_0xc8260(0x476)][_0xc8260(0x160)](this,_0x2283a2);return $gameTemp[_0xc8260(0x254)](),_0x1a357a;},VisuMZ['EventsMoveCore'][_0x5f1364(0x290)]=Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x1aa)],Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x1aa)]=function(_0x6ace6d){const _0x2b58ab=_0x5f1364;this[_0x2b58ab(0x4e1)](_0x6ace6d),this['clearEventCache'](),VisuMZ['EventsMoveCore'][_0x2b58ab(0x290)][_0x2b58ab(0x160)](this,_0x6ace6d),this[_0x2b58ab(0x423)](),this['setupDiagonalSupport'](),this['setupRegionRestrictions'](),this[_0x2b58ab(0x42d)](),this[_0x2b58ab(0x393)](),this[_0x2b58ab(0x423)]();},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x26d)]=Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x5a7)],Game_Map[_0x5f1364(0x5c6)]['setupEvents']=function(){const _0x392c25=_0x5f1364;VisuMZ[_0x392c25(0x507)][_0x392c25(0x26d)]['call'](this),this[_0x392c25(0x4e9)]();},Game_Map[_0x5f1364(0x45b)]=0xc8,Game_Map['prototype']['determineEventOverload']=function(){const _0x1d2ca0=_0x5f1364,_0x313032=Game_Map['_eventOverloadThreshold'];this[_0x1d2ca0(0x167)]=this['events']()[_0x1d2ca0(0x509)]>_0x313032;if(this['_eventOverload']&&$gameTemp['isPlaytest']()){}},Game_Map['prototype'][_0x5f1364(0x57c)]=function(){const _0x8c2930=_0x5f1364;return this[_0x8c2930(0x167)];},Game_Map['prototype'][_0x5f1364(0x423)]=function(){const _0x5c9177=_0x5f1364;this[_0x5c9177(0x4a6)]=undefined;},Game_Map['prototype'][_0x5f1364(0x2a6)]=function(){const _0xbe85f3=_0x5f1364;this[_0xbe85f3(0x246)]=VisuMZ['EventsMoveCore']['Settings'][_0xbe85f3(0x25b)][_0xbe85f3(0x590)];const _0x10ce14=$dataMap[_0xbe85f3(0x5a9)]||'';if(_0x10ce14[_0xbe85f3(0x59d)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x10ce14[_0xbe85f3(0x59d)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0xbe85f3(0x246)]=![]);},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x165)]=function(){const _0x12acc9=_0x5f1364,_0x155f5a=$gameSystem[_0x12acc9(0x368)]();if(_0x155f5a===_0x12acc9(0x339))return!![];if(_0x155f5a===_0x12acc9(0x39a))return![];if(this[_0x12acc9(0x246)]===undefined)this[_0x12acc9(0x2a6)]();return this[_0x12acc9(0x246)];},Game_Map['prototype'][_0x5f1364(0x4e3)]=function(_0x142a0b,_0x450720){const _0x1bcb1a=_0x5f1364;if([0x1,0x4,0x7]['includes'](_0x450720))_0x142a0b-=0x1;if([0x3,0x6,0x9][_0x1bcb1a(0x161)](_0x450720))_0x142a0b+=0x1;return this['roundX'](_0x142a0b);},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x27e)]=function(_0x52c3c6,_0x3a32b2){const _0x4a9a61=_0x5f1364;if([0x1,0x2,0x3][_0x4a9a61(0x161)](_0x3a32b2))_0x52c3c6+=0x1;if([0x7,0x8,0x9][_0x4a9a61(0x161)](_0x3a32b2))_0x52c3c6-=0x1;return this[_0x4a9a61(0x4f0)](_0x52c3c6);},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x1cf)]=function(_0x4ab6b6,_0x311368,_0x4db7fd,_0x49ef63){const _0x63f16a=_0x5f1364;return Math[_0x63f16a(0x36c)](Math['abs'](this['deltaX'](_0x4ab6b6,_0x4db7fd)),Math[_0x63f16a(0x454)](this[_0x63f16a(0x296)](_0x311368,_0x49ef63)));},Game_Map['prototype']['setupRegionRestrictions']=function(){const _0x2b0aad=_0x5f1364,_0x557fee=VisuMZ['EventsMoveCore'][_0x2b0aad(0x18d)][_0x2b0aad(0x55b)],_0x412af5={},_0x211fdc=['Allow',_0x2b0aad(0x581),'Dock'],_0x2cb824=['All',_0x2b0aad(0x536),_0x2b0aad(0x3ed),_0x2b0aad(0x557),_0x2b0aad(0x207),_0x2b0aad(0x504),_0x2b0aad(0x4ba),_0x2b0aad(0x578)];for(const _0x20e4a4 of _0x211fdc){if(_0x2b0aad(0x456)!==_0x2b0aad(0x456)){function _0x26783e(){const _0x45c013=_0x2b0aad;if(_0xc0272e)_0xc0862f[_0x45c013(0x423)]();_0x4bf6ed[_0x45c013(0x507)]['Scene_Load_onLoadSuccess'][_0x45c013(0x160)](this);}}else for(const _0x434e11 of _0x2cb824){if('ZRNJj'!==_0x2b0aad(0x365)){function _0x457849(){const _0x14483c=_0x2b0aad;this['_labelWindow'][_0x14483c(0x2d6)]=_0x417f76(_0x51654f['$1']);}}else{const _0x53fbdf=_0x2b0aad(0x1ef)[_0x2b0aad(0x35a)](_0x434e11,_0x20e4a4);_0x557fee[_0x53fbdf]&&(_0x412af5[_0x53fbdf]=_0x557fee[_0x53fbdf]['slice'](0x0));}}}const _0x34b86a=$dataMap[_0x2b0aad(0x5a9)]||'',_0x434f01=_0x34b86a['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);if(_0x434f01){if(_0x2b0aad(0x293)!==_0x2b0aad(0x28e))for(const _0x25c947 of _0x434f01){_0x25c947[_0x2b0aad(0x59d)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x5d1461=String(RegExp['$1'])[_0x2b0aad(0x51e)]()[_0x2b0aad(0x2da)](),_0x3ee61a=String(RegExp['$2'])['toLowerCase']()[_0x2b0aad(0x2da)]();const _0x2bc930=JSON[_0x2b0aad(0x421)]('['+RegExp['$3']['match'](/\d+/g)+']');_0x5d1461=_0x5d1461[_0x2b0aad(0x1de)](0x0)['toUpperCase']()+_0x5d1461[_0x2b0aad(0x152)](0x1),_0x3ee61a=_0x3ee61a[_0x2b0aad(0x1de)](0x0)[_0x2b0aad(0x199)]()+_0x3ee61a[_0x2b0aad(0x152)](0x1);const _0x1f68a9=_0x2b0aad(0x1ef)[_0x2b0aad(0x35a)](_0x5d1461,_0x3ee61a);if(_0x412af5[_0x1f68a9])_0x412af5[_0x1f68a9]=_0x412af5[_0x1f68a9][_0x2b0aad(0x37d)](_0x2bc930);}else{function _0xa47af5(){_0x6a5a4b['PreloadedMaps'][_0x488f7e]=_0x4214fe[_0x350264],_0x3e2ef0[_0x4b6971]=_0x5bea81;}}}this['_regionRules']=_0x412af5;},Game_Map['prototype']['isRegionAllowPass']=function(_0x3fcab5,_0xfadf0a,_0x2e9dff,_0x86a59a){const _0x4a543b=_0x5f1364,_0x3a57e1=this[_0x4a543b(0x4e3)](_0x3fcab5,_0x2e9dff),_0x4c4e32=this[_0x4a543b(0x27e)](_0xfadf0a,_0x2e9dff),_0x11c117=this[_0x4a543b(0x340)](_0x3a57e1,_0x4c4e32),_0x3539b6=this[_0x4a543b(0x4c1)];if(_0x3539b6[_0x4a543b(0x2cf)][_0x4a543b(0x161)](_0x11c117)){if('YkYUP'===_0x4a543b(0x21e)){function _0x299fc9(){const _0x330449=_0x4a543b,_0x5a8069=_0x286016(_0x54ff02['$1'])['toUpperCase']()['trim']();return this[_0x330449(0x3d4)](_0x5a8069);}}else return!![];}else{if(_0x86a59a===_0x4a543b(0x150))return _0x3539b6[_0x4a543b(0x4ee)][_0x4a543b(0x161)](_0x11c117)||_0x3539b6[_0x4a543b(0x3db)][_0x4a543b(0x161)](_0x11c117);else{if(_0x86a59a===_0x4a543b(0x179)){if('EEQIy'===_0x4a543b(0x48d))return _0x3539b6[_0x4a543b(0x315)][_0x4a543b(0x161)](_0x11c117)||_0x3539b6[_0x4a543b(0x3db)][_0x4a543b(0x161)](_0x11c117);else{function _0xabdf9(){const _0x152723=_0x4a543b;this[_0x152723(0x530)](_0x46f30b);}}}else{if(_0x3539b6[_0x4a543b(0x177)][_0x4a543b(0x161)](_0x11c117)){if(_0x4a543b(0x1ee)===_0x4a543b(0x1ee))return!![];else{function _0x3d7c1e(){return!![];}}}else{const _0x5bff7d=_0x4a543b(0x4ca)[_0x4a543b(0x35a)](_0x86a59a[_0x4a543b(0x1de)](0x0)[_0x4a543b(0x199)]()+_0x86a59a[_0x4a543b(0x152)](0x1));if(_0x3539b6[_0x5bff7d])return _0x3539b6[_0x5bff7d]['includes'](_0x11c117);}}}}return![];},Game_Map['prototype'][_0x5f1364(0x410)]=function(_0x1b8814,_0x3fc30e,_0x51c433,_0x16b3ca){const _0x1d5a3e=_0x5f1364,_0x8d0dfc=this[_0x1d5a3e(0x4e3)](_0x1b8814,_0x51c433),_0x2c0555=this[_0x1d5a3e(0x27e)](_0x3fc30e,_0x51c433),_0x36d241=this[_0x1d5a3e(0x340)](_0x8d0dfc,_0x2c0555),_0x20279e=this['_regionRules'];if(_0x20279e[_0x1d5a3e(0x59f)][_0x1d5a3e(0x161)](_0x36d241))return!![];else{if(_0x16b3ca===_0x1d5a3e(0x150))return _0x20279e[_0x1d5a3e(0x380)]['includes'](_0x36d241)||_0x20279e[_0x1d5a3e(0x47d)][_0x1d5a3e(0x161)](_0x36d241);else{if(_0x16b3ca==='event')return _0x20279e[_0x1d5a3e(0x19b)][_0x1d5a3e(0x161)](_0x36d241)||_0x20279e[_0x1d5a3e(0x47d)][_0x1d5a3e(0x161)](_0x36d241);else{if(_0x20279e['VehicleForbid'][_0x1d5a3e(0x161)](_0x36d241))return!![];else{const _0x475bb=_0x1d5a3e(0x278)['format'](_0x16b3ca[_0x1d5a3e(0x1de)](0x0)[_0x1d5a3e(0x199)]()+_0x16b3ca['slice'](0x1));if(_0x20279e[_0x475bb])return _0x20279e[_0x475bb][_0x1d5a3e(0x161)](_0x36d241);}}}}return![];},Game_Map['prototype'][_0x5f1364(0x4c5)]=function(_0xdf9f3,_0x5f0774,_0x16fd51,_0x5f41ec){const _0x56049a=_0x5f1364;_0x16fd51=_0x5f41ec===_0x56049a(0x20e)?0x5:_0x16fd51;const _0x217407=this['roundXWithDirection'](_0xdf9f3,_0x16fd51),_0xb12799=this[_0x56049a(0x27e)](_0x5f0774,_0x16fd51),_0x347e81=this[_0x56049a(0x340)](_0x217407,_0xb12799),_0x185c39=this[_0x56049a(0x4c1)];if(_0x185c39['VehicleDock'][_0x56049a(0x161)](_0x347e81))return!![];else{if(_0x56049a(0x434)!==_0x56049a(0x434)){function _0x2ef175(){const _0x3aafaa=_0x56049a;if(_0x1f3e6e[_0x3aafaa(0x24a)]&&this[_0x3aafaa(0x1c4)]())return this['checkSmartEventCollision'](_0x23d67a,_0x594b93);else{const _0x4cab1c=_0xb04b34[_0x3aafaa(0x306)](_0x2521da,_0x2c1081)[_0x3aafaa(0x16d)](_0x4745aa=>_0x4745aa!==this);return _0x4cab1c[_0x3aafaa(0x509)]>0x0;}}}else{const _0x219112='%1Dock'[_0x56049a(0x35a)](_0x5f41ec[_0x56049a(0x1de)](0x0)[_0x56049a(0x199)]()+_0x5f41ec['slice'](0x1));if(_0x185c39[_0x219112])return _0x185c39[_0x219112][_0x56049a(0x161)](_0x347e81);}}return![];},VisuMZ[_0x5f1364(0x507)]['Game_Map_refresh']=Game_Map['prototype']['refresh'],Game_Map['prototype']['refresh']=function(){const _0x45e93a=_0x5f1364;VisuMZ[_0x45e93a(0x507)][_0x45e93a(0x255)][_0x45e93a(0x160)](this),this['checkNeedForPeriodicRefresh']();},Game_Map['prototype'][_0x5f1364(0x32e)]=function(){const _0x4f0bd3=_0x5f1364;this[_0x4f0bd3(0x460)]=![];if(this[_0x4f0bd3(0x1c8)]()['some'](_0x33e310=>_0x33e310[_0x4f0bd3(0x47e)]())){if(_0x4f0bd3(0x44c)!=='AiFiU'){function _0x27ee1c(){const _0x1b0ec6=_0x4f0bd3;if(this[_0x1b0ec6(0x2f2)]===_0x279a73)this['initEventsMoveCore']();const _0x5aef62=_0x1b0ec6(0x4fc)[_0x1b0ec6(0x35a)](_0x5c74bd,_0x665fd7);delete this[_0x1b0ec6(0x2f2)][_0x5aef62];}}else{this['_needsPeriodicRefresh']=!![];return;}}if(this[_0x4f0bd3(0x1c8)]()['some'](_0x4aa919=>_0x4aa919['hasCPCs']())){this['_needsPeriodicRefresh']=!![];return;}if(this[_0x4f0bd3(0x21c)][_0x4f0bd3(0x30a)](_0x195ee7=>_0x195ee7[_0x4f0bd3(0x47e)]())){this[_0x4f0bd3(0x460)]=!![];return;}if(this[_0x4f0bd3(0x21c)][_0x4f0bd3(0x30a)](_0x4de12f=>_0x4de12f[_0x4f0bd3(0x337)]())){this['_needsPeriodicRefresh']=!![];return;}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x436)]=Game_Map[_0x5f1364(0x5c6)]['update'],Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x1d4)]=function(_0x19dc0a){const _0x21ef7b=_0x5f1364;this[_0x21ef7b(0x328)](),VisuMZ[_0x21ef7b(0x507)]['Game_Map_update'][_0x21ef7b(0x160)](this,_0x19dc0a);},Game_Map['prototype'][_0x5f1364(0x328)]=function(){const _0x457bc4=_0x5f1364;if(!this[_0x457bc4(0x460)])return;this['_periodicRefreshTimer']=this['_periodicRefreshTimer']||0x3c,this[_0x457bc4(0x51d)]--,this['_periodicRefreshTimer']<=0x0&&(this['requestRefresh'](),this[_0x457bc4(0x51d)]=0x3c);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x36a)]=Game_Map['prototype'][_0x5f1364(0x2b2)],Game_Map[_0x5f1364(0x5c6)]['isDashDisabled']=function(){const _0x448b05=_0x5f1364;if(!$gameSystem[_0x448b05(0x54f)]())return!![];return VisuMZ['EventsMoveCore'][_0x448b05(0x36a)][_0x448b05(0x160)](this);},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x42d)]=function(){const _0x3e475c=_0x5f1364;this[_0x3e475c(0x55f)]=![];const _0x424c75=$dataMap[_0x3e475c(0x5a9)]||'';_0x424c75[_0x3e475c(0x59d)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map['prototype']['isSaveEventLocations']=function(){const _0x1d55c3=_0x5f1364;if(this[_0x1d55c3(0x55f)]===undefined)this[_0x1d55c3(0x42d)]();return this['_saveEventLocations'];},Game_Map['prototype']['removeTemporaryMapSpawnedEvents']=function(_0x216361){const _0x54676c=_0x5f1364;_0x216361!==this['mapId']()&&$gamePlayer&&$gameSystem['removeTemporaryMapSpawnedEvents'](this[_0x54676c(0x402)]());},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x393)]=function(){const _0x53083d=_0x5f1364;this[_0x53083d(0x215)]=$gameSystem[_0x53083d(0x53b)](this[_0x53083d(0x402)]()),this['_needsRefresh']=!![];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x503)]=Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x1c8)],Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x1c8)]=function(){const _0x2bb629=_0x5f1364;if(this[_0x2bb629(0x4a6)])return this['_eventCache'];const _0x3df65a=VisuMZ['EventsMoveCore'][_0x2bb629(0x503)][_0x2bb629(0x160)](this),_0x2ac2b5=_0x3df65a[_0x2bb629(0x37d)](this['_spawnedEvents']||[]);return this[_0x2bb629(0x4a6)]=_0x2ac2b5['filter'](_0x52c121=>!!_0x52c121),this[_0x2bb629(0x4a6)];},VisuMZ['EventsMoveCore'][_0x5f1364(0x426)]=Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x179)],Game_Map['prototype'][_0x5f1364(0x179)]=function(_0x7e7fda){const _0x2868ce=_0x5f1364;if(_0x7e7fda>=0x3e8){if('CaIgW'!==_0x2868ce(0x50c)){function _0x261f24(){const _0x595694=_0x2868ce,_0x44d5f2=[0x2,0x4,0x6,0x8];_0x16c8da[_0x595694(0x165)]()&&_0x44d5f2[_0x595694(0x304)](0x1,0x3,0x7,0x9);const _0x26c5f2=[];for(const _0x55f17d of _0x44d5f2){if(this[_0x595694(0x1f9)](this['x'],this['y'],_0x55f17d))_0x26c5f2['push'](_0x55f17d);}if(_0x26c5f2['length']>0x0){const _0x12a489=_0x26c5f2[_0x162005['randomInt'](_0x26c5f2[_0x595694(0x509)])];this[_0x595694(0x530)](_0x12a489);}}}else return _0x7e7fda-=0x3e8,this[_0x2868ce(0x215)][_0x7e7fda];}else{if(_0x2868ce(0x23b)!==_0x2868ce(0x23b)){function _0xe26fa8(){const _0x2db2f8=_0x2868ce,_0x1103ba=_0x1f13e9['getSelfTarget']()||this;if(_0x1103ba['constructor']!==_0x195d2b)_0x259284['EventsMoveCore'][_0x2db2f8(0x3ec)][_0x2db2f8(0x160)](this,_0xc7813f,_0xa47520);else{const _0x67a7f8=[_0x1103ba[_0x2db2f8(0x5cb)],_0x1103ba[_0x2db2f8(0x133)],_0x2db2f8(0x2f7)[_0x2db2f8(0x35a)](_0x237f6e)];_0x5f5d43[_0x2db2f8(0x13f)](_0x67a7f8,_0x5f3cb4);}}}else return VisuMZ['EventsMoveCore'][_0x2868ce(0x426)][_0x2868ce(0x160)](this,_0x7e7fda);}},Game_Map[_0x5f1364(0x5c6)]['eraseEvent']=function(_0x3a74ef){const _0x2fa8cf=this['event'](_0x3a74ef);if(_0x2fa8cf)_0x2fa8cf['erase']();},Game_Map[_0x5f1364(0x5c6)]['setupSpawnTest']=function(){const _0x373725=_0x5f1364,_0x2099c1={'template':_0x373725(0x322),'mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x373725(0x215)]['length']+0x3e8};this[_0x373725(0x352)](_0x2099c1);},Game_Map[_0x5f1364(0x5c6)]['checkExistingEntitiesAt']=function(_0x20d9c3,_0x247484){const _0x739eb2=_0x5f1364;if(this[_0x739eb2(0x317)](_0x20d9c3,_0x247484)[_0x739eb2(0x509)]>0x0)return!![];if($gamePlayer['x']===_0x20d9c3&&$gamePlayer['y']===_0x247484)return!![];if(this[_0x739eb2(0x40a)]()['posNt'](_0x20d9c3,_0x247484))return!![];if(this[_0x739eb2(0x1f5)]()[_0x739eb2(0x415)](_0x20d9c3,_0x247484))return!![];return![];},Game_Map['prototype'][_0x5f1364(0x377)]=function(_0x263e07,_0x299115,_0x3b7f64){const _0x9bff36=_0x5f1364;$gameTemp[_0x9bff36(0x2c2)]=_0x263e07;const _0x2f4004=new Game_Event(_0x263e07[_0x9bff36(0x402)],_0x263e07[_0x9bff36(0x5be)]);$gameTemp[_0x9bff36(0x2c2)]=undefined,_0x2f4004[_0x9bff36(0x575)]();let _0x263b27=_0x299115-_0x2f4004[_0x9bff36(0x4fa)][_0x9bff36(0x29f)],_0x4640f1=_0x299115+_0x2f4004[_0x9bff36(0x4fa)][_0x9bff36(0x29f)],_0x53eb27=_0x3b7f64-_0x2f4004['_addedHitbox']['up'],_0x4c0f6e=_0x3b7f64+_0x2f4004[_0x9bff36(0x4fa)][_0x9bff36(0x331)];for(let _0x255a37=_0x263b27;_0x255a37<=_0x4640f1;_0x255a37++){for(let _0x7282c3=_0x53eb27;_0x7282c3<=_0x4c0f6e;_0x7282c3++){if(this[_0x9bff36(0x1f7)](_0x255a37,_0x7282c3))return![];}}return!![];},Game_Map['prototype'][_0x5f1364(0x352)]=function(_0x23c7ff){const _0x43e370=_0x5f1364;$gameTemp[_0x43e370(0x2c2)]=_0x23c7ff;const _0x5cd9f1=new Game_Event(_0x23c7ff[_0x43e370(0x402)],_0x23c7ff[_0x43e370(0x5be)]);$gameTemp['_spawnData']=undefined,this[_0x43e370(0x215)][_0x43e370(0x304)](_0x5cd9f1),_0x5cd9f1['setupSpawn'](_0x23c7ff),this[_0x43e370(0x423)]();},Game_Map['prototype']['prepareSpawnedEventAtXY']=function(_0x2e4ebc,_0x56a085,_0x2d9ed0){const _0x135045=_0x5f1364,_0x434d30=_0x2e4ebc['x'],_0x11f75f=_0x2e4ebc['y'];if(!this['isValid'](_0x434d30,_0x11f75f))return![];if(_0x56a085){if(this[_0x135045(0x1f7)](_0x434d30,_0x11f75f))return![];if(!this[_0x135045(0x377)](_0x2e4ebc,_0x434d30,_0x11f75f))return![];}if(_0x2d9ed0){if('uzmXz'!==_0x135045(0x4ff)){if(!this[_0x135045(0x59c)](_0x434d30,_0x11f75f))return![];}else{function _0x37e134(){return _0x32182d>0x0?0x8:0x2;}}}return this[_0x135045(0x352)](_0x2e4ebc),!![];},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x447)]=function(_0x332062,_0x50b38d,_0x54673e,_0x218ff1){const _0x426438=_0x5f1364,_0x4351a5=[],_0x202010=this[_0x426438(0x416)](),_0xbf33c4=this[_0x426438(0x5b6)]();for(let _0x58ad5e=0x0;_0x58ad5e<_0x202010;_0x58ad5e++){for(let _0x578280=0x0;_0x578280<_0xbf33c4;_0x578280++){if(!_0x50b38d[_0x426438(0x161)](this['regionId'](_0x58ad5e,_0x578280)))continue;if(!this['isValid'](_0x58ad5e,_0x578280))continue;if(_0x54673e){if(this[_0x426438(0x1f7)](_0x58ad5e,_0x578280))continue;if(!this['isSpawnHitboxCollisionOk'](_0x332062,_0x58ad5e,_0x578280))continue;}if(_0x218ff1){if(!this[_0x426438(0x59c)](_0x58ad5e,_0x578280))continue;}_0x4351a5[_0x426438(0x304)]([_0x58ad5e,_0x578280]);}}if(_0x4351a5['length']>0x0){if(_0x426438(0x187)===_0x426438(0x29b)){function _0xcfd944(){const _0x535000=_0x426438;_0x371ba4['EventsMoveCore'][_0x535000(0x1a4)][_0x535000(0x160)](this,_0x4f4495);if(_0x533edf>=0x3e8){const _0x2a5325=this['event'](_0x5bb6eb);if(_0x2a5325)_0x2a5325[_0x535000(0x2e0)]();}}}else{const _0x57c9e3=_0x4351a5[Math[_0x426438(0x1f2)](_0x4351a5['length'])];return _0x332062['x']=_0x57c9e3[0x0],_0x332062['y']=_0x57c9e3[0x1],this[_0x426438(0x352)](_0x332062),!![];}}return![];},Game_Map['prototype'][_0x5f1364(0x46a)]=function(_0xbccb86,_0x49fbd2,_0x41aeee,_0x3d7e8f){const _0x389123=_0x5f1364,_0x551b37=[],_0x39e5c=this[_0x389123(0x416)](),_0x241a0f=this[_0x389123(0x5b6)]();for(let _0x428f61=0x0;_0x428f61<_0x39e5c;_0x428f61++){if(_0x389123(0x33e)===_0x389123(0x33e))for(let _0x26f77f=0x0;_0x26f77f<_0x241a0f;_0x26f77f++){if('gtdSo'===_0x389123(0x3d5)){function _0x141287(){const _0x1ba74f=_0x389123;if(_0x274dae)this[_0x1ba74f(0x551)](_0x202494['x'],_0x231cb2['y']);}}else{if(!_0x49fbd2['includes'](this['terrainTag'](_0x428f61,_0x26f77f)))continue;if(!this['isValid'](_0x428f61,_0x26f77f))continue;if(_0x41aeee){if(this['checkExistingEntitiesAt'](_0x428f61,_0x26f77f))continue;if(!this[_0x389123(0x377)](_0xbccb86,_0x428f61,_0x26f77f))continue;}if(_0x3d7e8f){if(!this[_0x389123(0x59c)](_0x428f61,_0x26f77f))continue;}_0x551b37[_0x389123(0x304)]([_0x428f61,_0x26f77f]);}}else{function _0x124006(){const _0x5e1bff=_0x389123;return this[_0x5e1bff(0x54d)](_0x2c0350);}}}if(_0x551b37['length']>0x0){const _0x3741fe=_0x551b37[Math[_0x389123(0x1f2)](_0x551b37[_0x389123(0x509)])];return _0xbccb86['x']=_0x3741fe[0x0],_0xbccb86['y']=_0x3741fe[0x1],this['createSpawnedEventWithData'](_0xbccb86),!![];}return![];},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x59c)]=function(_0x3e46af,_0x414758){const _0x2dc818=_0x5f1364;if(this[_0x2dc818(0x2e5)](_0x3e46af,_0x414758,0x2))return!![];if(this[_0x2dc818(0x2e5)](_0x3e46af,_0x414758,0x4))return!![];if(this[_0x2dc818(0x2e5)](_0x3e46af,_0x414758,0x6))return!![];if(this[_0x2dc818(0x2e5)](_0x3e46af,_0x414758,0x8))return!![];return![];},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x1d8)]=function(_0x56f393){const _0x303c61=_0x5f1364;if(_0x56f393<0x3e8)return;if(!this[_0x303c61(0x215)])return;const _0x87ae90=this['event'](_0x56f393);_0x87ae90['locate'](-0x1,-0x1),_0x87ae90[_0x303c61(0x3b5)](),this[_0x303c61(0x215)][_0x56f393-0x3e8]=null,this[_0x303c61(0x423)]();},Game_Map['prototype']['firstSpawnedEvent']=function(){const _0x20cc23=_0x5f1364;for(const _0x42d4eb of this[_0x20cc23(0x215)]){if(_0x20cc23(0x5ae)!==_0x20cc23(0x5ae)){function _0x41e890(){const _0x3bd062=_0x20cc23;return!!this[_0x3bd062(0x4b1)](_0x587bc9);}}else{if(_0x42d4eb)return _0x42d4eb;}}return null;},Game_Map['prototype']['firstSpawnedEventID']=function(){const _0x28e9e1=_0x5f1364,_0xf9839c=this[_0x28e9e1(0x4d0)]();return _0xf9839c?_0xf9839c[_0x28e9e1(0x133)]:0x0;},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x1b3)]=function(){const _0x161467=_0x5f1364,_0x478585=this[_0x161467(0x215)][_0x161467(0x152)](0x0)[_0x161467(0x481)]();for(const _0x4757e2 of _0x478585){if(_0x4757e2)return _0x4757e2;}return null;},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x164)]=function(){const _0x5ee22d=_0x5f1364,_0x14f326=this[_0x5ee22d(0x1b3)]();return _0x14f326?_0x14f326['_eventId']:0x0;},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x57e)]=function(_0x18f840,_0x39633e){const _0x3996f7=_0x5f1364,_0x4e536a=this[_0x3996f7(0x317)](_0x18f840,_0x39633e);for(const _0x1666c5 of _0x4e536a){if(!_0x1666c5)continue;if(_0x1666c5[_0x3996f7(0x40b)]())this[_0x3996f7(0x1d8)](_0x1666c5['_eventId']);}},Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x346)]=function(_0x166c39){const _0x4127e6=_0x5f1364;for(const _0x139eb5 of this['_spawnedEvents']){if(!_0x139eb5)continue;_0x166c39[_0x4127e6(0x161)](_0x139eb5[_0x4127e6(0x340)]())&&this[_0x4127e6(0x1d8)](_0x139eb5['_eventId']);}},Game_Map['prototype'][_0x5f1364(0x272)]=function(_0xa62e0d){const _0xc8f527=_0x5f1364;for(const _0x5553c2 of this[_0xc8f527(0x215)]){if(!_0x5553c2)continue;_0xa62e0d[_0xc8f527(0x161)](_0x5553c2['terrainTag']())&&this[_0xc8f527(0x1d8)](_0x5553c2['_eventId']);}},Game_Map[_0x5f1364(0x5c6)]['despawnEverything']=function(){const _0x535a6e=_0x5f1364;for(const _0x3337b7 of this[_0x535a6e(0x215)]){if(!_0x3337b7)continue;this[_0x535a6e(0x1d8)](_0x3337b7['_eventId']);}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x1a4)]=Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x5c0)],Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x5c0)]=function(_0x280ad5){const _0x2caafd=_0x5f1364;VisuMZ['EventsMoveCore'][_0x2caafd(0x1a4)]['call'](this,_0x280ad5);if(_0x280ad5>=0x3e8){const _0x3563c7=this[_0x2caafd(0x179)](_0x280ad5);if(_0x3563c7)_0x3563c7['unlock']();}},Game_CommonEvent[_0x5f1364(0x5c6)]['hasAdvancedSwitchVariable']=function(){const _0x39927e=_0x5f1364,_0x3931bf=this['event']();return this[_0x39927e(0x395)]()&&_0x3931bf['trigger']>=0x1&&DataManager[_0x39927e(0x541)](_0x3931bf[_0x39927e(0x284)]);},Game_CommonEvent[_0x5f1364(0x5c6)][_0x5f1364(0x337)]=function(){const _0x1993ea=_0x5f1364;return VisuMZ['EventsMoveCore'][_0x1993ea(0x474)][_0x1993ea(0x21c)]['includes'](this['_commonEventId']);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x38e)]=Game_CommonEvent['prototype'][_0x5f1364(0x395)],Game_CommonEvent[_0x5f1364(0x5c6)][_0x5f1364(0x395)]=function(){const _0x18bfc1=_0x5f1364;return VisuMZ['EventsMoveCore']['Game_CommonEvent_isActive'][_0x18bfc1(0x160)](this)?!![]:VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x18bfc1(0x42c)](this[_0x18bfc1(0x179)]()['CPC'],this['_commonEventId']);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x42f)]=Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x440)],Game_Map[_0x5f1364(0x5c6)][_0x5f1364(0x440)]=function(){const _0x5ad225=_0x5f1364,_0x16740b=VisuMZ[_0x5ad225(0x507)][_0x5ad225(0x42f)][_0x5ad225(0x160)](this),_0x413252=VisuMZ[_0x5ad225(0x507)]['CustomPageConditions']['_commonEvents'][_0x5ad225(0x309)](_0x59c6a0=>$dataCommonEvents[_0x59c6a0]);return _0x16740b[_0x5ad225(0x37d)](_0x413252)[_0x5ad225(0x16d)]((_0x246d1d,_0x4cb79a,_0x4a08d7)=>_0x4a08d7['indexOf'](_0x246d1d)===_0x4cb79a);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x35f)]=Game_CharacterBase['prototype'][_0x5f1364(0x1e6)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1e6)]=function(){const _0x21e8b1=_0x5f1364;VisuMZ[_0x21e8b1(0x507)][_0x21e8b1(0x35f)][_0x21e8b1(0x160)](this),this[_0x21e8b1(0x280)]();},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x280)]=function(){const _0x4fec72=_0x5f1364;this['_patternLocked']=![],this[_0x4fec72(0x4c0)](),this[_0x4fec72(0x30f)](),this[_0x4fec72(0x4a0)](),this[_0x4fec72(0x3cb)]();},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x3f7)]=function(){const _0x1dc3d0=_0x5f1364;if(this[_0x1dc3d0(0x1f4)]===Game_Player&&this[_0x1dc3d0(0x49e)]()){if('TpHtM'!==_0x1dc3d0(0x52f))return this[_0x1dc3d0(0x24d)]()[_0x1dc3d0(0x4c4)]()[_0x1dc3d0(0x59d)](/\[VS8\]/i);else{function _0x30d003(){const _0x500763=_0x1dc3d0;if(this[_0x500763(0x374)]===_0x1a253c)this['initEventsMoveCore']();this['_expireCommonEvent']?_0x32e969[_0x500763(0x176)](this[_0x500763(0x374)]):_0xb9596b[_0x500763(0x507)][_0x500763(0x19e)][_0x500763(0x160)](this);}}}else{if(Imported[_0x1dc3d0(0x546)]&&this[_0x1dc3d0(0x1df)]()){if(_0x1dc3d0(0x477)==='voUkx'){function _0x2a48d2(){const _0x29a293=_0x1dc3d0;if(!this['page']())return;const _0x509571=this[_0x29a293(0x2e7)]();let _0x3b79cd='';for(const _0x1ec559 of _0x509571){if([0x6c,0x198][_0x29a293(0x161)](_0x1ec559[_0x29a293(0x4c3)])){if(_0x3b79cd!=='')_0x3b79cd+='\x0a';_0x3b79cd+=_0x1ec559[_0x29a293(0x297)][0x0];}}this[_0x29a293(0x23d)](_0x3b79cd);}}else return!![];}else{if(_0x1dc3d0(0x413)!=='tTRGs')return this['characterName']()['match'](/\[VS8\]/i);else{function _0x2c03be(){const _0xead185=_0x1dc3d0;_0x5f56c7[0x2]=_0x46b3dd(_0x2fb37b)[_0xead185(0x1de)](0x0)[_0xead185(0x199)]()[_0xead185(0x2da)]();}}}}},VisuMZ['EventsMoveCore']['Game_CharacterBase_direction']=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x31a)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x31a)]=function(){const _0x3f1d57=_0x5f1364;if(this[_0x3f1d57(0x200)]()&&!this[_0x3f1d57(0x4f3)]()&&this[_0x3f1d57(0x3f7)]())return this[_0x3f1d57(0x13c)]();else{if(this[_0x3f1d57(0x200)]()&&!this[_0x3f1d57(0x4f3)]()){if(_0x3f1d57(0x384)!=='ZUJtX'){function _0x1814de(){_0x49554f=_0x548560['parent'];}}else return 0x8;}else return this[_0x3f1d57(0x303)]()&&this['isSpriteVS8dir']()?this[_0x3f1d57(0x49f)]():VisuMZ[_0x3f1d57(0x507)][_0x3f1d57(0x321)][_0x3f1d57(0x160)](this);}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x53a)]=Game_CharacterBase[_0x5f1364(0x5c6)]['setDirection'],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x470)]=function(_0x50d883){const _0x2cf53c=_0x5f1364;if(!this[_0x2cf53c(0x3f7)]())_0x50d883=this[_0x2cf53c(0x459)](_0x50d883);VisuMZ[_0x2cf53c(0x507)][_0x2cf53c(0x53a)][_0x2cf53c(0x160)](this,_0x50d883);},Game_CharacterBase['prototype']['correctFacingDirection']=function(_0x833787){const _0x59a20a=_0x5f1364;if(_0x833787===0x1)return this[_0x59a20a(0x1f9)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x833787===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x833787===0x7)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x833787===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x833787;},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x403)]=function(_0x590079){const _0x4b8af8=_0x5f1364;return[0x1,0x3,0x5,0x7,0x9][_0x4b8af8(0x161)](_0x590079);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x4cb)]=function(){return this['_lastMovedDirection']||0x0;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x574)]=Game_CharacterBase['prototype'][_0x5f1364(0x2c3)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x2c3)]=function(_0x3d525a){const _0x217216=_0x5f1364;this[_0x217216(0x16f)]=_0x3d525a,VisuMZ[_0x217216(0x507)][_0x217216(0x574)][_0x217216(0x160)](this,_0x3d525a);},Game_CharacterBase[_0x5f1364(0x5c6)]['executeMoveDir8']=function(_0x2a2b19){const _0x4dab9d=_0x5f1364;if(!this['isDiagonalDirection'](_0x2a2b19))return this[_0x4dab9d(0x2c3)](_0x2a2b19);let _0x530a5b=0x0,_0x31bf73=0x0;switch(_0x2a2b19){case 0x1:_0x530a5b=0x4,_0x31bf73=0x2;break;case 0x3:_0x530a5b=0x6,_0x31bf73=0x2;break;case 0x7:_0x530a5b=0x4,_0x31bf73=0x8;break;case 0x9:_0x530a5b=0x6,_0x31bf73=0x8;break;}if(VisuMZ[_0x4dab9d(0x507)]['Settings'][_0x4dab9d(0x25b)][_0x4dab9d(0x2c9)]){if(_0x4dab9d(0x5ba)===_0x4dab9d(0x372)){function _0x25f61c(){const _0x355276=_0x4dab9d,_0x343089=_0xcbe83f[_0x355276(0x306)](_0x17fb00,_0x181e45)[_0x355276(0x16d)](_0x16c560=>_0x16c560!==this);return _0x343089[_0x355276(0x509)]>0x0;}}else{if(!this[_0x4dab9d(0x1f9)](this['_x'],this['_y'],_0x530a5b))return this[_0x4dab9d(0x2c3)](_0x31bf73);if(!this[_0x4dab9d(0x1f9)](this['_x'],this['_y'],_0x31bf73))return this[_0x4dab9d(0x2c3)](_0x530a5b);if(!this[_0x4dab9d(0x3e4)](this['_x'],this['_y'],_0x530a5b,_0x31bf73)){if('uhTxO'!==_0x4dab9d(0x1c0)){function _0x1cb626(){const _0x363947=_0x4dab9d;this[_0x363947(0x540)]=!![],this[_0x363947(0x39c)](_0xfd9011);}}else{let _0x1300be=VisuMZ[_0x4dab9d(0x507)][_0x4dab9d(0x18d)][_0x4dab9d(0x25b)]['FavorHorz']?_0x530a5b:_0x31bf73;return this[_0x4dab9d(0x2c3)](_0x1300be);}}}}this['_lastMovedDirection']=_0x2a2b19,this[_0x4dab9d(0x385)](_0x530a5b,_0x31bf73);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x48c)]=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1cd)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1cd)]=function(){const _0x20df17=_0x5f1364;let _0x4ddf28=this[_0x20df17(0x429)];return this[_0x20df17(0x466)]()&&(_0x4ddf28+=this[_0x20df17(0x18e)]()),this['adjustDir8MovementSpeed'](_0x4ddf28);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x18e)]=function(){const _0x4b3cdc=_0x5f1364,_0x20dcc1=VisuMZ[_0x4b3cdc(0x507)][_0x4b3cdc(0x18d)][_0x4b3cdc(0x25b)];if(_0x20dcc1['DashModifier']!==undefined){if(_0x4b3cdc(0x584)===_0x4b3cdc(0x584))return _0x20dcc1['DashModifier'];else{function _0x1a9c82(){const _0x15e432=_0x4b3cdc;return _0x1e3e45[_0x15e432(0x507)]['Game_CharacterBase_direction'][_0x15e432(0x160)](this);}}}else return VisuMZ['EventsMoveCore'][_0x4b3cdc(0x48c)]['call'](this)-this['_moveSpeed'];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x5b5)]=function(_0x314771){const _0x5623d7=_0x5f1364,_0x11e430=VisuMZ[_0x5623d7(0x507)][_0x5623d7(0x18d)][_0x5623d7(0x25b)];if(!_0x11e430[_0x5623d7(0x1d3)])return _0x314771;return[0x1,0x3,0x7,0x9][_0x5623d7(0x161)](this[_0x5623d7(0x16f)])&&(_0x314771*=_0x11e430[_0x5623d7(0x487)]||0.01),_0x314771;},VisuMZ[_0x5f1364(0x507)]['Game_CharacterBase_isDashing']=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x466)],Game_CharacterBase['prototype'][_0x5f1364(0x466)]=function(){const _0x3a8eb8=_0x5f1364;if(this['_forceDashing'])return!![];return VisuMZ[_0x3a8eb8(0x507)][_0x3a8eb8(0x496)][_0x3a8eb8(0x160)](this);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x516)]=function(){return this['isDashing']();},VisuMZ['EventsMoveCore'][_0x5f1364(0x170)]=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x14a)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x14a)]=function(){const _0x4109f2=_0x5f1364;if(this[_0x4109f2(0x303)]()){if(_0x4109f2(0x5bf)===_0x4109f2(0x57f)){function _0x30af07(){const _0x5c26e7=_0x4109f2;if(this[_0x5c26e7(0x2c5)]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this[_0x5c26e7(0x265)](![]))return;_0x228732[_0x5c26e7(0x507)][_0x5c26e7(0x520)][_0x5c26e7(0x160)](this);}}else return this[_0x4109f2(0x30b)]();}else return VisuMZ[_0x4109f2(0x507)][_0x4109f2(0x170)][_0x4109f2(0x160)](this);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x130)]=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x469)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x469)]=function(){const _0x32a888=_0x5f1364;VisuMZ[_0x32a888(0x507)]['Game_CharacterBase_increaseSteps'][_0x32a888(0x160)](this),this[_0x32a888(0x4c0)]();},VisuMZ['EventsMoveCore'][_0x5f1364(0x387)]=Game_CharacterBase[_0x5f1364(0x5c6)]['characterIndex'],Game_CharacterBase[_0x5f1364(0x5c6)]['characterIndex']=function(){const _0x51734e=_0x5f1364;if(this[_0x51734e(0x3f7)]())return this[_0x51734e(0x2ff)]();return VisuMZ[_0x51734e(0x507)][_0x51734e(0x387)][_0x51734e(0x160)](this);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x2ff)]=function(){const _0x3e76a3=_0x5f1364,_0x7fd256=this[_0x3e76a3(0x31a)]();if(this['isJumping']()){if([0x2,0x4,0x6,0x8][_0x3e76a3(0x161)](_0x7fd256))return 0x4;if([0x1,0x3,0x7,0x9][_0x3e76a3(0x161)](_0x7fd256))return 0x5;}else{if(this['isOnLadder']())return 0x6;else{if(this['isPosing']())return this[_0x3e76a3(0x5cd)]();else{if(this[_0x3e76a3(0x4bb)]){if([0x2,0x4,0x6,0x8][_0x3e76a3(0x161)](_0x7fd256))return 0x4;if([0x1,0x3,0x7,0x9][_0x3e76a3(0x161)](_0x7fd256))return 0x5;}else{if(this[_0x3e76a3(0x4a3)]()&&this[_0x3e76a3(0x1e7)]()){if(_0x3e76a3(0x589)===_0x3e76a3(0x234)){function _0x491726(){const _0x3b16f5=_0x3e76a3;return this[_0x3b16f5(0x27c)](_0x2e3588(_0x44b753['$1']));}}else{if([0x2,0x4,0x6,0x8][_0x3e76a3(0x161)](_0x7fd256))return 0x4;if([0x1,0x3,0x7,0x9][_0x3e76a3(0x161)](_0x7fd256))return 0x5;}}else{if(this[_0x3e76a3(0x516)]()){if([0x2,0x4,0x6,0x8][_0x3e76a3(0x161)](_0x7fd256))return 0x2;if([0x1,0x3,0x7,0x9][_0x3e76a3(0x161)](_0x7fd256))return 0x3;}else{if([0x2,0x4,0x6,0x8]['includes'](_0x7fd256))return 0x0;if([0x1,0x3,0x7,0x9][_0x3e76a3(0x161)](_0x7fd256))return 0x1;}}}}}}},Game_CharacterBase['prototype'][_0x5f1364(0x1e7)]=function(){const _0x3ffbb0=_0x5f1364;return VisuMZ[_0x3ffbb0(0x507)]['Settings'][_0x3ffbb0(0x131)]['CarryPose'];},Game_CharacterBase[_0x5f1364(0x5c6)]['isOnRope']=function(){const _0x4f33bc=_0x5f1364;return this[_0x4f33bc(0x200)]()&&this['terrainTag']()===VisuMZ['EventsMoveCore'][_0x4f33bc(0x18d)][_0x4f33bc(0x500)][_0x4f33bc(0x1ad)];},Game_CharacterBase['prototype']['directionOnLadderSpriteVS8dir']=function(){const _0x47a047=_0x5f1364;if(this[_0x47a047(0x259)]()){if(_0x47a047(0x40c)===_0x47a047(0x40c))return 0x4;else{function _0xd4e3d(){const _0x48d79b=_0x47a047;if(_0x1914ba===0x0||_0x208286===0x0)return![];if(!_0x4b7cbf[_0x48d79b(0x2ec)][_0x558b0b])return _0x3cdfdc[_0x48d79b(0x445)]()&&_0x451f57[_0x48d79b(0x2cc)](_0x48d79b(0x1b5)[_0x48d79b(0x35a)](_0x5e5544)),![];return!![];}}}else{if(_0x47a047(0x4b2)!=='QIiWm')return 0x2;else{function _0x5b805a(){const _0x23433c=_0x47a047;for(const _0x118052 of _0x3dcb09){_0x118052[_0x23433c(0x59d)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0xaad0b1=_0x1b3751(_0x87e94e['$1'])[_0x23433c(0x51e)]()['trim'](),_0x49ebf2=_0x2b82a0(_0x42c6a8['$2'])[_0x23433c(0x51e)]()['trim']();const _0x52de3d=_0x405d59[_0x23433c(0x421)]('['+_0x31696b['$3'][_0x23433c(0x59d)](/\d+/g)+']');_0xaad0b1=_0xaad0b1[_0x23433c(0x1de)](0x0)[_0x23433c(0x199)]()+_0xaad0b1['slice'](0x1),_0x49ebf2=_0x49ebf2[_0x23433c(0x1de)](0x0)[_0x23433c(0x199)]()+_0x49ebf2[_0x23433c(0x152)](0x1);const _0x5cb737=_0x23433c(0x1ef)[_0x23433c(0x35a)](_0xaad0b1,_0x49ebf2);if(_0x3d38a3[_0x5cb737])_0x954bd8[_0x5cb737]=_0x4da9e1[_0x5cb737][_0x23433c(0x37d)](_0x52de3d);}}}}},VisuMZ[_0x5f1364(0x507)]['Game_CharacterBase_update']=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1d4)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1d4)]=function(){const _0x196c32=_0x5f1364;VisuMZ['EventsMoveCore'][_0x196c32(0x37a)][_0x196c32(0x160)](this),this[_0x196c32(0x355)]();},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x355)]=function(){const _0x541bc8=_0x5f1364;this[_0x541bc8(0x2df)]=this[_0x541bc8(0x2df)]||0x0;if(this[_0x541bc8(0x2df)]>0x0){if(_0x541bc8(0x14e)===_0x541bc8(0x3a1)){function _0x5cfcdd(){const _0xaddfd7=_0x541bc8;_0x3c273c[_0xaddfd7(0x507)][_0xaddfd7(0x56f)]['call'](this,_0x8e3941);}}else{this[_0x541bc8(0x2df)]--;if(this[_0x541bc8(0x2df)]<=0x0&&this[_0x541bc8(0x19c)]!=='ZZZ')this['clearPose']();}}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x2ba)]=Game_CharacterBase['prototype'][_0x5f1364(0x385)],Game_CharacterBase['prototype']['moveDiagonally']=function(_0x1f52ef,_0x507433){const _0x8776f2=_0x5f1364;VisuMZ[_0x8776f2(0x507)][_0x8776f2(0x2ba)][_0x8776f2(0x160)](this,_0x1f52ef,_0x507433);if(this[_0x8776f2(0x3f7)]())this['setDiagonalDirection'](_0x1f52ef,_0x507433);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x201)]=function(_0x1546c7,_0x32b99a){const _0x3d2407=_0x5f1364;if(_0x1546c7===0x4&&_0x32b99a===0x2)this[_0x3d2407(0x470)](0x1);if(_0x1546c7===0x6&&_0x32b99a===0x2)this[_0x3d2407(0x470)](0x3);if(_0x1546c7===0x4&&_0x32b99a===0x8)this[_0x3d2407(0x470)](0x7);if(_0x1546c7===0x6&&_0x32b99a===0x8)this[_0x3d2407(0x470)](0x9);},VisuMZ['EventsMoveCore'][_0x5f1364(0x5a4)]=Game_CharacterBase['prototype'][_0x5f1364(0x40f)],Game_CharacterBase['prototype'][_0x5f1364(0x40f)]=function(){const _0x1201b8=_0x5f1364;if(this[_0x1201b8(0x303)]()&&this[_0x1201b8(0x562)]()===_0x1201b8(0x329))return!![];return VisuMZ[_0x1201b8(0x507)][_0x1201b8(0x5a4)][_0x1201b8(0x160)](this);},Game_CharacterBase[_0x5f1364(0x5c6)]['setPose']=function(_0x2a153a,_0x56e70c){const _0x421993=_0x5f1364;if(_0x2a153a[_0x421993(0x59d)](/Z/i))_0x2a153a=_0x421993(0x329);if(_0x2a153a['match'](/SLEEP/i))_0x2a153a=_0x421993(0x329);this['isSpriteVS8dir']()&&(this[_0x421993(0x19c)]=_0x2a153a[_0x421993(0x199)]()[_0x421993(0x2da)](),this['_poseDuration']=_0x56e70c||Infinity);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x562)]=function(){const _0x1bfe80=_0x5f1364;if(this[_0x1bfe80(0x3f7)]()){if(_0x1bfe80(0x15b)!==_0x1bfe80(0x15b)){function _0x3c4ebe(){const _0x30e5f5=_0x1bfe80;if(this[_0x30e5f5(0x317)](_0x4dff04,_0x26ea96)[_0x30e5f5(0x509)]>0x0)return!![];if(_0x45c487['x']===_0x3b769b&&_0x3a38d6['y']===_0x3e847a)return!![];if(this[_0x30e5f5(0x40a)]()[_0x30e5f5(0x415)](_0x3add78,_0x4c764a))return!![];if(this[_0x30e5f5(0x1f5)]()[_0x30e5f5(0x415)](_0x20002d,_0x2cdffb))return!![];return![];}}else return(this[_0x1bfe80(0x19c)]||'')['toUpperCase']()[_0x1bfe80(0x2da)]();}else return''[_0x1bfe80(0x199)]()[_0x1bfe80(0x2da)]();},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1d2)]=function(_0xea9e21,_0xb2b531){const _0xfbd4b2=_0x5f1364;if(this[_0xfbd4b2(0x3f7)]()){if(_0xfbd4b2(0x3de)===_0xfbd4b2(0x2bd)){function _0x353c37(){const _0x5f453c=_0xfbd4b2;_0xad5cd3[_0x5f453c(0x5c6)]['update'][_0x5f453c(0x160)](this);if(!this[_0x5f453c(0x50d)]())return;this[_0x5f453c(0x27a)](),this[_0x5f453c(0x37e)](),this[_0x5f453c(0x3a2)](),this['updateOpacity']();}}else{const _0x1e1ed2=['','EXCLAMATION','QUESTION',_0xfbd4b2(0x134),_0xfbd4b2(0x266),_0xfbd4b2(0x33f),'SWEAT',_0xfbd4b2(0x51c),_0xfbd4b2(0x513),_0xfbd4b2(0x3e2),_0xfbd4b2(0x329),'','','','',''][_0xea9e21];this[_0xfbd4b2(0x3d4)](_0x1e1ed2,_0xb2b531);}}},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x4c0)]=function(){const _0x4cc3a1=_0x5f1364;this[_0x4cc3a1(0x19c)]='',this[_0x4cc3a1(0x2df)]=0x0;},Game_CharacterBase[_0x5f1364(0x5c6)]['isPosing']=function(){const _0x1ae0a6=_0x5f1364;return this[_0x1ae0a6(0x3f7)]()&&!!this['_pose'];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x5cd)]=function(){const _0x3970fc=_0x5f1364,_0x107f8d=this[_0x3970fc(0x19c)][_0x3970fc(0x199)]();switch(this[_0x3970fc(0x19c)]['toUpperCase']()['trim']()){case _0x3970fc(0x277):case _0x3970fc(0x2f0):case _0x3970fc(0x137):case _0x3970fc(0x247):case _0x3970fc(0x5aa):case _0x3970fc(0x44a):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x5f1364(0x5c6)]['getPosingCharacterDirection']=function(){const _0x17a93a=_0x5f1364;switch(this[_0x17a93a(0x19c)][_0x17a93a(0x199)]()){case'EXCLAMATION':case _0x17a93a(0x50b):case _0x17a93a(0x134):case'!':case'?':return 0x2;break;case _0x17a93a(0x266):case _0x17a93a(0x33f):case'SWEAT':return 0x4;break;case'ITEM':case _0x17a93a(0x2f0):case _0x17a93a(0x137):case'COBWEB':case _0x17a93a(0x513):case _0x17a93a(0x3e2):return 0x6;break;case _0x17a93a(0x247):case'KNEEL':case'COLLAPSE':case'ZZZ':case _0x17a93a(0x320):return 0x8;break;default:return VisuMZ[_0x17a93a(0x507)][_0x17a93a(0x53a)][_0x17a93a(0x160)](this);break;}},Game_CharacterBase['prototype'][_0x5f1364(0x30b)]=function(){const _0x130eb1=_0x5f1364;switch(this[_0x130eb1(0x19c)][_0x130eb1(0x199)]()){case _0x130eb1(0x277):case _0x130eb1(0x247):case _0x130eb1(0x51f):case'!':case _0x130eb1(0x266):case _0x130eb1(0x51c):return 0x0;break;case'HMPH':case'KNEEL':case _0x130eb1(0x50b):case'?':case _0x130eb1(0x33f):case _0x130eb1(0x513):return 0x1;break;case _0x130eb1(0x137):case _0x130eb1(0x44a):case _0x130eb1(0x134):case _0x130eb1(0x25c):case'LIGHT\x20BULB':return 0x2;break;default:return VisuMZ[_0x130eb1(0x507)][_0x130eb1(0x170)][_0x130eb1(0x160)](this);break;}},Game_CharacterBase['prototype']['forceCarrying']=function(){const _0x2929a4=_0x5f1364;this[_0x2929a4(0x4bb)]=!![];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x364)]=function(){const _0x4dded6=_0x5f1364;this[_0x4dded6(0x4bb)]=![];},Game_CharacterBase[_0x5f1364(0x5c6)]['forceDashing']=function(){this['_forceDashing']=!![];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x30f)]=function(){this['_forceDashing']=![];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x4d6)]=function(){const _0x3bd48f=_0x5f1364;if(this[_0x3bd48f(0x53e)]())return![];if(this[_0x3bd48f(0x1e0)])return![];if(this['_transparent'])return![];if(this[_0x3bd48f(0x442)]==='')return![];if(this[_0x3bd48f(0x1f4)]===Game_Vehicle)return![];return!![];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x159)]=function(){const _0x1c7464=_0x5f1364;if(this[_0x1c7464(0x200)]())return!![];if(this[_0x1c7464(0x1f4)]===Game_Player&&this[_0x1c7464(0x49e)]())return!![];return![];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1fb)]=function(){const _0x2bef72=_0x5f1364;return VisuMZ[_0x2bef72(0x507)][_0x2bef72(0x18d)][_0x2bef72(0x25b)][_0x2bef72(0x1c5)];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x2c4)]=function(){return this['screenX']();},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x2d4)]=function(){const _0x572e4e=_0x5f1364;return this[_0x572e4e(0x21a)]()+this['shiftY']()+this[_0x572e4e(0x3aa)]();},Game_Character['prototype']['findDiagonalDirectionTo']=function(_0x2b8504,_0x566dbc){const _0x45afab=_0x5f1364,_0x227c0e=this[_0x45afab(0x323)](),_0x302337=$gameMap[_0x45afab(0x416)](),_0x5e041f=[],_0x584281=[],_0x1f943a=[],_0x140ea4={};let _0x2988e3=_0x140ea4;if(this['x']===_0x2b8504&&this['y']===_0x566dbc)return 0x0;_0x140ea4[_0x45afab(0x564)]=null,_0x140ea4['x']=this['x'],_0x140ea4['y']=this['y'],_0x140ea4['g']=0x0,_0x140ea4['f']=$gameMap[_0x45afab(0x4b5)](_0x140ea4['x'],_0x140ea4['y'],_0x2b8504,_0x566dbc),_0x5e041f[_0x45afab(0x304)](_0x140ea4),_0x584281['push'](_0x140ea4['y']*_0x302337+_0x140ea4['x']);while(_0x5e041f[_0x45afab(0x509)]>0x0){let _0x21fe01=0x0;for(let _0x4d4da4=0x0;_0x4d4da4<_0x5e041f['length'];_0x4d4da4++){if(_0x5e041f[_0x4d4da4]['f']<_0x5e041f[_0x21fe01]['f']){if('MhtLQ'!==_0x45afab(0x38f))_0x21fe01=_0x4d4da4;else{function _0x502360(){const _0x32fd5a=_0x45afab;_0x3d6f1b[0x2]['match'](/SELF/i)?this['setSelfValue'](_0x44e9fc,_0x5960fa):_0xe5126d['EventsMoveCore']['Game_SelfSwitches_setValue'][_0x32fd5a(0x160)](this,_0x3eeb83,_0x2c9bfd);}}}}const _0x5a8213=_0x5e041f[_0x21fe01],_0x32bb10=_0x5a8213['x'],_0x28acce=_0x5a8213['y'],_0x3ed1b9=_0x28acce*_0x302337+_0x32bb10,_0x5a981c=_0x5a8213['g'];_0x5e041f[_0x45afab(0x5c3)](_0x21fe01,0x1),_0x584281['splice'](_0x584281[_0x45afab(0x275)](_0x3ed1b9),0x1),_0x1f943a[_0x45afab(0x304)](_0x3ed1b9);if(_0x5a8213['x']===_0x2b8504&&_0x5a8213['y']===_0x566dbc){if(_0x45afab(0x51b)!==_0x45afab(0x31d)){_0x2988e3=_0x5a8213;break;}else{function _0x2996b4(){const _0x2a2c8a=_0x45afab,_0x347980=this[_0x2a2c8a(0x179)]()[_0x2a2c8a(0x5a9)];if(_0x347980==='')return;this['checkEventsMoveCoreStringTags'](_0x347980);}}}if(_0x5a981c>=_0x227c0e)continue;const _0xe197a=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x228514=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x395641=0x1;_0x395641<0xa;_0x395641++){if(_0x395641===0x5)continue;const _0x27e6ba=_0x395641,_0x20c546=_0xe197a[_0x395641],_0x48fb15=_0x228514[_0x395641],_0x4e98e0=$gameMap['roundXWithDirection'](_0x32bb10,_0x27e6ba),_0x33c3ae=$gameMap[_0x45afab(0x27e)](_0x28acce,_0x27e6ba),_0x20f503=_0x33c3ae*_0x302337+_0x4e98e0;if(_0x1f943a[_0x45afab(0x161)](_0x20f503))continue;if(this['constructor']===Game_Player&&VisuMZ[_0x45afab(0x507)][_0x45afab(0x18d)][_0x45afab(0x25b)][_0x45afab(0x2c9)]){if(!this[_0x45afab(0x1f9)](_0x32bb10,_0x28acce,_0x20c546))continue;if(!this['canPass'](_0x32bb10,_0x28acce,_0x48fb15))continue;}if(!this[_0x45afab(0x3e4)](_0x32bb10,_0x28acce,_0x20c546,_0x48fb15))continue;const _0x229547=_0x5a981c+0x1,_0x1f4df5=_0x584281[_0x45afab(0x275)](_0x20f503);if(_0x1f4df5<0x0||_0x229547<_0x5e041f[_0x1f4df5]['g']){if('jZtEd'===_0x45afab(0x419)){function _0x19c94b(){const _0x21e611=_0x45afab;if(!_0x450836&&_0x263d87[_0x21e611(0x1fa)]())return![];if(!_0x2fee01&&_0xe7eda4[_0x21e611(0x412)]())return![];if(['none',_0x21e611(0x4d2)][_0x21e611(0x161)](this[_0x21e611(0x287)]()))return!![];return _0x50cb62[_0x21e611(0x587)](this);}}else{let _0x39e6fd={};_0x1f4df5>=0x0?_0x39e6fd=_0x5e041f[_0x1f4df5]:(_0x5e041f[_0x45afab(0x304)](_0x39e6fd),_0x584281['push'](_0x20f503)),_0x39e6fd[_0x45afab(0x564)]=_0x5a8213,_0x39e6fd['x']=_0x4e98e0,_0x39e6fd['y']=_0x33c3ae,_0x39e6fd['g']=_0x229547,_0x39e6fd['f']=_0x229547+$gameMap[_0x45afab(0x4b5)](_0x4e98e0,_0x33c3ae,_0x2b8504,_0x566dbc),(!_0x2988e3||_0x39e6fd['f']-_0x39e6fd['g']<_0x2988e3['f']-_0x2988e3['g'])&&(_0x2988e3=_0x39e6fd);}}}}let _0x25759a=_0x2988e3;while(_0x25759a[_0x45afab(0x564)]&&_0x25759a[_0x45afab(0x564)]!==_0x140ea4){if(_0x45afab(0x4df)!==_0x45afab(0x140))_0x25759a=_0x25759a['parent'];else{function _0x7d9715(){const _0xefd0a4=_0x45afab;_0x1b3010[_0xefd0a4(0x507)][_0xefd0a4(0x2ba)][_0xefd0a4(0x160)](this,_0x202dc6,_0x58882a);if(this[_0xefd0a4(0x3f7)]())this[_0xefd0a4(0x201)](_0x3ea623,_0x268e83);}}}const _0x2017a5=$gameMap[_0x45afab(0x453)](_0x25759a['x'],_0x140ea4['x']),_0x45ae52=$gameMap[_0x45afab(0x296)](_0x25759a['y'],_0x140ea4['y']);if(_0x2017a5<0x0&&_0x45ae52>0x0)return 0x1;if(_0x2017a5>0x0&&_0x45ae52>0x0)return 0x3;if(_0x2017a5<0x0&&_0x45ae52<0x0)return 0x7;if(_0x2017a5>0x0&&_0x45ae52<0x0)return 0x9;if(_0x45ae52>0x0)return 0x2;if(_0x2017a5<0x0)return 0x4;if(_0x2017a5>0x0)return 0x6;if(_0x45ae52<0x0)return 0x8;const _0x56ef64=this[_0x45afab(0x5a8)](_0x2b8504),_0x1c0fae=this[_0x45afab(0x29c)](_0x566dbc);if(Math[_0x45afab(0x454)](_0x56ef64)>Math[_0x45afab(0x454)](_0x1c0fae))return _0x56ef64>0x0?0x4:0x6;else{if(_0x1c0fae!==0x0){if(_0x45afab(0x18f)===_0x45afab(0x276)){function _0x11a541(){const _0x11ab30=_0x45afab;_0x3c4b14[_0x11ab30(0x430)]([this],_0x5e2836);}}else return _0x1c0fae>0x0?0x8:0x2;}}return 0x0;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x2ab)]=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1f9)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x1f9)]=function(_0x5f219e,_0x3abbfc,_0x459a62){const _0x3ff3a3=_0x5f1364;if(this[_0x3ff3a3(0x37b)]===_0x3ff3a3(0x20e)){if(_0x3ff3a3(0x5b9)===_0x3ff3a3(0x5b9))return this['vehicle']()['isAirshipPassable'](_0x5f219e,_0x3abbfc,_0x459a62);else{function _0x5431d1(){const _0x5f2b72=_0x3ff3a3;_0x1bcf93[_0x5f2b72(0x55a)](_0x5a0933['MapId'],_0x341191[_0x5f2b72(0x2b0)]||_0x59948f[_0x5f2b72(0x5be)]());}}}else{if(_0x3ff3a3(0x437)!==_0x3ff3a3(0x400))return VisuMZ[_0x3ff3a3(0x507)][_0x3ff3a3(0x2ab)][_0x3ff3a3(0x160)](this,_0x5f219e,_0x3abbfc,_0x459a62);else{function _0x4f3477(){const _0x57866a=_0x3ff3a3;_0x5c00b7=[_0x51ab62,_0x522c90,_0x3935d7[_0x57866a(0x199)]()[_0x57866a(0x2da)]()];}}}},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x4a0)]=function(){this['_spriteOffsetX']=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x46c)]=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x208)],Game_CharacterBase[_0x5f1364(0x5c6)]['screenX']=function(){const _0x5c5b30=_0x5f1364;return VisuMZ[_0x5c5b30(0x507)][_0x5c5b30(0x46c)][_0x5c5b30(0x160)](this)+(this[_0x5c5b30(0x2db)]||0x0);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x1c1)]=Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x21a)],Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x21a)]=function(){const _0x474a32=_0x5f1364;return VisuMZ['EventsMoveCore'][_0x474a32(0x1c1)][_0x474a32(0x160)](this)+(this[_0x474a32(0x41a)]||0x0);},Game_CharacterBase['prototype'][_0x5f1364(0x3cb)]=function(){this['_stepPattern']='';},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x256)]=Game_CharacterBase['prototype']['updatePattern'],Game_CharacterBase[_0x5f1364(0x5c6)]['updatePattern']=function(){const _0x257670=_0x5f1364;if(this[_0x257670(0x540)])return;if(this[_0x257670(0x220)]())return;VisuMZ[_0x257670(0x507)][_0x257670(0x256)][_0x257670(0x160)](this);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x220)]=function(){const _0x529494=_0x5f1364;if(!this[_0x529494(0x40f)]()&&this[_0x529494(0x1cb)]>0x0)return![];switch(String(this['_stepPattern'])[_0x529494(0x199)]()[_0x529494(0x2da)]()){case'LEFT\x20TO\x20RIGHT':this[_0x529494(0x543)]+=0x1;if(this[_0x529494(0x543)]>0x2)this[_0x529494(0x39c)](0x0);break;case _0x529494(0x5bd):this[_0x529494(0x543)]-=0x1;if(this[_0x529494(0x543)]<0x0)this[_0x529494(0x39c)](0x2);break;case _0x529494(0x497):case'SPIN\x20CW':this[_0x529494(0x2b8)]();break;case _0x529494(0x1c3):case _0x529494(0x2bb):case _0x529494(0x56d):case _0x529494(0x3c4):this[_0x529494(0x294)]();break;default:return![];}return!![];},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x344)]=function(){const _0x379d2a=_0x5f1364;return $gameSystem[_0x379d2a(0x344)](this);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x4a3)]=function(){const _0xa3268f=_0x5f1364,_0x5f2e55=this[_0xa3268f(0x344)]();if(!_0x5f2e55)return![];return _0x5f2e55[_0xa3268f(0x4b8)]>0x0;},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x2ce)]=function(){const _0x435c16=_0x5f1364,_0x49d1f3=this[_0x435c16(0x31a)]();return $gameMap[_0x435c16(0x4e3)](this['x'],_0x49d1f3);},Game_CharacterBase[_0x5f1364(0x5c6)][_0x5f1364(0x3b4)]=function(){const _0x5db96e=_0x5f1364,_0x500a99=this[_0x5db96e(0x31a)]();return $gameMap[_0x5db96e(0x27e)](this['y'],_0x500a99);},Game_CharacterBase['prototype']['backX']=function(){const _0xb3e2ab=_0x5f1364,_0x5e4b63=this[_0xb3e2ab(0x43b)](this[_0xb3e2ab(0x31a)]());return $gameMap[_0xb3e2ab(0x4e3)](this['x'],_0x5e4b63);},Game_CharacterBase['prototype'][_0x5f1364(0x3af)]=function(){const _0x3d43b1=_0x5f1364,_0x579497=this[_0x3d43b1(0x43b)](this[_0x3d43b1(0x31a)]());return $gameMap[_0x3d43b1(0x27e)](this['y'],_0x579497);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x4ec)]=Game_Character['prototype'][_0x5f1364(0x20c)],Game_Character['prototype'][_0x5f1364(0x20c)]=function(_0x1406eb){const _0x592e3d=_0x5f1364;route=JsonEx[_0x592e3d(0x499)](_0x1406eb),VisuMZ[_0x592e3d(0x507)][_0x592e3d(0x4ec)]['call'](this,route);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x5a6)]=Game_Character[_0x5f1364(0x5c6)]['forceMoveRoute'],Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x20d)]=function(_0x53817a){const _0x49086b=_0x5f1364;route=JsonEx[_0x49086b(0x499)](_0x53817a),VisuMZ['EventsMoveCore'][_0x49086b(0x5a6)][_0x49086b(0x160)](this,route);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x56f)]=Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x135)],Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x135)]=function(_0x969b9d){const _0x235d0c=_0x5f1364,_0x501d6e=Game_Character,_0x30f543=_0x969b9d[_0x235d0c(0x297)];if(_0x969b9d[_0x235d0c(0x4c3)]===_0x501d6e[_0x235d0c(0x158)]){let _0x53a68b=_0x969b9d[_0x235d0c(0x297)][0x0];_0x53a68b=this[_0x235d0c(0x4c6)](_0x53a68b),_0x53a68b=this[_0x235d0c(0x471)](_0x53a68b),this[_0x235d0c(0x56b)](_0x969b9d,_0x53a68b);}else VisuMZ['EventsMoveCore']['Game_Character_processMoveCommand'][_0x235d0c(0x160)](this,_0x969b9d);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x4c6)]=function(_0x184ae9){const _0x1830b5=_0x5f1364,_0xacffe8=/\$gameVariables\.value\((\d+)\)/gi,_0xd79227=/\\V\[(\d+)\]/gi;while(_0x184ae9['match'](_0xacffe8)){_0x184ae9=_0x184ae9[_0x1830b5(0x26e)](_0xacffe8,(_0x20d520,_0x487d79)=>$gameVariables[_0x1830b5(0x1b6)](parseInt(_0x487d79)));}while(_0x184ae9[_0x1830b5(0x59d)](_0xd79227)){_0x184ae9=_0x184ae9[_0x1830b5(0x26e)](_0xd79227,(_0x4d351f,_0x13299d)=>$gameVariables[_0x1830b5(0x1b6)](parseInt(_0x13299d)));}return _0x184ae9;},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x471)]=function(_0x4afbbc){const _0x48eb83=_0x5f1364,_0x4dc4dd=/\\SELFVAR\[(\d+)\]/gi;while(_0x4afbbc[_0x48eb83(0x59d)](_0x4dc4dd)){if(_0x48eb83(0x3a7)!==_0x48eb83(0x2c8))_0x4afbbc=_0x4afbbc['replace'](_0x4dc4dd,(_0x326333,_0xb837d0)=>getSelfVariableValue(this[_0x48eb83(0x5cb)],this[_0x48eb83(0x133)],parseInt(_0xb837d0)));else{function _0x47f606(){const _0xa139b7=_0x48eb83;if(this[_0xa139b7(0x540)])return;if(this['updatePatternEventsMoveCore']())return;_0x774e15[_0xa139b7(0x507)][_0xa139b7(0x256)][_0xa139b7(0x160)](this);}}}return _0x4afbbc;},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x56b)]=function(_0x1fee88,_0x405800){const _0x4eab48=_0x5f1364;if(_0x405800[_0x4eab48(0x59d)](/ANIMATION:[ ](\d+)/i)){if(_0x4eab48(0x3a4)===_0x4eab48(0x3a4))return this[_0x4eab48(0x27c)](Number(RegExp['$1']));else{function _0x5af69e(){const _0x11a205=_0x4eab48;this[_0x11a205(0x183)](_0x110d70,_0x2984a2);if(this['x']!==_0x5f2100||this['y']!==_0x2e0831)this[_0x11a205(0x525)]--;}}}if(_0x405800['match'](/BALLOON:[ ](.*)/i)){if(_0x4eab48(0x144)===_0x4eab48(0x144))return this[_0x4eab48(0x34d)](String(RegExp['$1']));else{function _0x2b7f8c(){const _0x592d08=_0x4eab48,_0x4de169=_0x3030b3[_0x592d08(0x4e3)](_0x4714ec,_0x123339),_0x34903b=_0x46c2ac[_0x592d08(0x27e)](_0x38a490,_0x367946),_0x3b7885=_0xc35566['regionId'](_0x4de169,_0x34903b);return this[_0x592d08(0x1dc)][_0x592d08(0x161)](_0x3b7885);}}}if(_0x405800[_0x4eab48(0x59d)](/FADE IN:[ ](\d+)/i)){if(_0x4eab48(0x1da)!=='CLIvT')return this[_0x4eab48(0x52b)](Number(RegExp['$1']));else{function _0x505fe9(){const _0x5a8821=_0x4eab48;if(this[_0x5a8821(0x467)]===_0x298178)this['initEventsMoveCore']();if(this['_EventsMoveCoreSettings'][_0x5a8821(0x24c)]===_0xbdac16)this[_0x5a8821(0x45f)]();this[_0x5a8821(0x467)][_0x5a8821(0x24c)]=_0x221e56;}}}if(_0x405800[_0x4eab48(0x59d)](/FADE OUT:[ ](\d+)/i))return this[_0x4eab48(0x31c)](Number(RegExp['$1']));if(_0x405800[_0x4eab48(0x59d)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x4eab48(0x249)!=='iNiGP')return this[_0x4eab48(0x56a)]();else{function _0x1532e8(){const _0x498b1d=_0x4eab48,_0x95a9c=_0x3c0e48['GetMoveSynchTarget'](this[_0x498b1d(0x576)]());this[_0x498b1d(0x529)](_0x95a9c);}}}if(_0x405800[_0x4eab48(0x59d)](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this[_0x4eab48(0x364)]();if(_0x405800[_0x4eab48(0x59d)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x4eab48(0x519)]();if(_0x405800[_0x4eab48(0x59d)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x4eab48(0x30f)]();if(_0x405800[_0x4eab48(0x59d)](/HUG:[ ]LEFT/i)){if(_0x4eab48(0x194)!==_0x4eab48(0x194)){function _0x45fdbb(){const _0x514fe8=_0x4eab48,_0x499a40=_0x54fe2e[_0x514fe8(0x182)][_0x2a3c7c];_0x499a40[_0x514fe8(0x2c1)][_0x514fe8(0x160)](this,_0x390f4e,_0x26a888,this);}}else return this['processMoveRouteHugWall'](_0x4eab48(0x29f));}if(_0x405800[_0x4eab48(0x59d)](/HUG:[ ]RIGHT/i)){if(_0x4eab48(0x33b)===_0x4eab48(0x33b))return this[_0x4eab48(0x24e)](_0x4eab48(0x1ac));else{function _0x4fea4a(){const _0x21103e=_0x4eab48,_0xcee938=_0x210701['event'](_0x4844b6[_0x21103e(0x2d8)]||_0x316c3d[_0x21103e(0x5be)]());if(!_0xcee938)return;_0x20f6b5['TemplateName']!==_0x21103e(0x3b3)?_0xcee938[_0x21103e(0x27b)](_0x2c6e10['TemplateName']):_0xcee938[_0x21103e(0x3f0)](_0x18a60e[_0x21103e(0x18b)],_0x3df3d3['Step2EventId']||_0x220f5d[_0x21103e(0x5be)]());}}}if(_0x405800[_0x4eab48(0x59d)](/INDEX:[ ](\d+)/i)){if('msHSy'!=='jLIhH')return this['processMoveRouteSetIndex'](Number(RegExp['$1']));else{function _0x3cb708(){const _0x3e183b=_0x4eab48;this[_0x3e183b(0x1b9)]=this[_0x3e183b(0x211)]['labelWindowText'](),this[_0x3e183b(0x575)]();}}}if(_0x405800['match'](/INDEX:[ ]([\+\-]\d+)/i)){const _0x45e5fe=this[_0x4eab48(0x2e8)]+Number(RegExp['$1']);return this[_0x4eab48(0x218)](_0x45e5fe);}if(_0x405800[_0x4eab48(0x59d)](/JUMP FORWARD:[ ](\d+)/i)){if('aJeaM'!==_0x4eab48(0x22f)){function _0x5ef3d6(){_0x4f7cca+=this['dashSpeedModifier']();}}else return this['processMoveRouteJumpForward'](Number(RegExp['$1']));}if(_0x405800[_0x4eab48(0x59d)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4eab48(0x324)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x405800[_0x4eab48(0x59d)](/JUMP TO EVENT:[ ](\d+)/i)){const _0x206dae=$gameMap['event'](Number(RegExp['$1']));return this[_0x4eab48(0x3dd)](_0x206dae);}if(_0x405800[_0x4eab48(0x59d)](/JUMP TO PLAYER/i)){if(_0x4eab48(0x362)!==_0x4eab48(0x362)){function _0x2fa8e1(){const _0x580d2a=_0x4eab48;if(this[_0x580d2a(0x5c9)]===_0x45e176)this['initEventsMoveCore']();const _0x148c23=_0x580d2a(0x4fc)[_0x580d2a(0x35a)](_0xd0caf1,_0x1da5a7);this[_0x580d2a(0x5c9)][_0x148c23]={'template':_0x3c5557,'mapId':_0x450c2a,'eventId':_0x36eb7a};}}else return this['processMoveRouteJumpToCharacter']($gamePlayer);}if(_0x405800[_0x4eab48(0x59d)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if(_0x4eab48(0x222)===_0x4eab48(0x3c8)){function _0x3147e0(){const _0x1cd147=_0x4eab48;this[_0x1cd147(0x29e)]['offsetX']=_0x16ee3d(_0x31eca9['$1']);}}else{const _0xed8f63=String(RegExp['$1']);return this[_0x4eab48(0x568)](_0xed8f63);}}if(_0x405800['match'](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x20a590=Number(RegExp['$1']),_0x196b29=Number(RegExp['$2']);return this[_0x4eab48(0x334)](_0x20a590,_0x196b29);}if(_0x405800[_0x4eab48(0x59d)](/MOVE TO EVENT:[ ](\d+)/i)){if(_0x4eab48(0x563)!==_0x4eab48(0x563)){function _0xba7936(){if(_0x182660)this['processMoveRouteMoveTo'](_0x95d529['x'],_0x213d4a['y']);}}else{const _0xa1f68e=$gameMap[_0x4eab48(0x179)](Number(RegExp['$1']));return this[_0x4eab48(0x239)](_0xa1f68e);}}if(_0x405800[_0x4eab48(0x59d)](/MOVE TO PLAYER/i))return this[_0x4eab48(0x239)]($gamePlayer);if(_0x405800[_0x4eab48(0x59d)](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x4eab48(0x43d)](0x1,Number(RegExp['$1']));if(_0x405800[_0x4eab48(0x59d)](/MOVE DOWN:[ ](\d+)/i)){if(_0x4eab48(0x1f1)!==_0x4eab48(0x1f1)){function _0x2f0965(){const _0x586dc7=_0x4eab48;this[_0x586dc7(0x151)]();}}else return this[_0x4eab48(0x43d)](0x2,Number(RegExp['$1']));}if(_0x405800[_0x4eab48(0x59d)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x3,Number(RegExp['$1']));if(_0x405800[_0x4eab48(0x59d)](/MOVE LEFT:[ ](\d+)/i)){if(_0x4eab48(0x48e)===_0x4eab48(0x48e))return this['processMoveRouteMoveRepeat'](0x4,Number(RegExp['$1']));else{function _0x41de7c(){const _0x469397=_0x4eab48;_0x1affe1[_0x469397(0x148)](_0x207da3[_0x469397(0x560)]),_0x3212b1[_0x469397(0x507)][_0x469397(0x2af)]['call'](this),_0x4e9e02[_0x469397(0x254)](),_0x3c4a5c[_0x469397(0x560)]=_0x428c7c;}}}if(_0x405800[_0x4eab48(0x59d)](/MOVE RIGHT:[ ](\d+)/i)){if('EtTNz'===_0x4eab48(0x3a8))return this[_0x4eab48(0x43d)](0x6,Number(RegExp['$1']));else{function _0x2a3543(){const _0x5bf645=_0x4eab48;return this[_0x5bf645(0x3dd)](_0x1e2a73);}}}if(_0x405800['match'](/MOVE UPPER LEFT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));if(_0x405800[_0x4eab48(0x59d)](/MOVE UP:[ ](\d+)/i))return this[_0x4eab48(0x43d)](0x8,Number(RegExp['$1']));if(_0x405800[_0x4eab48(0x59d)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x9,Number(RegExp['$1']));if(_0x405800[_0x4eab48(0x59d)](/OPACITY:[ ](\d+)([%％])/i)){if(_0x4eab48(0x217)!==_0x4eab48(0x1e2)){const _0x1f9387=Math[_0x4eab48(0x325)](Number(RegExp['$1'])/0x64*0xff);return this[_0x4eab48(0x4bf)](_0x1f9387[_0x4eab48(0x4f2)](0x0,0xff));}else{function _0x5167bf(){const _0x17abae=_0x4eab48,_0x2eff92=_0x358eb1[_0x17abae(0x3df)](this['moveSynchTarget']()),_0x2d1c5b=this[_0x17abae(0x43b)](_0x2eff92[_0x17abae(0x4cb)]());this[_0x17abae(0x530)](this[_0x17abae(0x43b)](_0x2eff92['direction']()));}}}if(_0x405800[_0x4eab48(0x59d)](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if(_0x4eab48(0x2dc)!=='BevJG'){function _0x19437b(){const _0xd9a148=_0x4eab48;return this[_0xd9a148(0x273)];}}else{const _0x1a9574=this[_0x4eab48(0x3c7)]+Math[_0x4eab48(0x325)](Number(RegExp['$1'])/0x64*0xff);return this[_0x4eab48(0x4bf)](_0x1a9574['clamp'](0x0,0xff));}}if(_0x405800[_0x4eab48(0x59d)](/OPACITY:[ ]([\+\-]\d+)/i)){if(_0x4eab48(0x1b7)==='rcxFf'){function _0x1f95aa(){const _0x3ed3b8=_0x4eab48,_0x1bf3f4=this[_0x3ed3b8(0x49b)](_0x4fcdcd),_0x275d9a=_0xbd145b[_0x3ed3b8(0x32f)]((this[_0x3ed3b8(0x153)]-_0x1bf3f4[_0x3ed3b8(0x416)])/0x2);this[_0x3ed3b8(0x3e1)](_0x11e418,_0x275d9a,_0x2fb09f),_0x4f6cbe+=_0x1bf3f4[_0x3ed3b8(0x5b6)];}}else{const _0xcadb82=this[_0x4eab48(0x3c7)]+Number(RegExp['$1']);return this[_0x4eab48(0x4bf)](_0xcadb82['clamp'](0x0,0xff));}}if(_0x405800[_0x4eab48(0x59d)](/PATTERN LOCK:[ ](\d+)/i)){if('IqQbu'===_0x4eab48(0x463)){function _0x21e019(){const _0x376fc9=_0x4eab48;this[_0x376fc9(0x43e)](this['x'],this['y']);}}else return this['processMoveRoutePatternLock'](Number(RegExp['$1']));}if(_0x405800[_0x4eab48(0x59d)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x405800[_0x4eab48(0x59d)](/POSE:[ ](.*)/i)){const _0x2fb0da=String(RegExp['$1'])[_0x4eab48(0x199)]()[_0x4eab48(0x2da)]();return this[_0x4eab48(0x3d4)](_0x2fb0da);}if(_0x405800[_0x4eab48(0x59d)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('RSZFG'!==_0x4eab48(0x5c5)){function _0x4be9f3(){const _0x207307=_0x4eab48;_0x447c08[_0x207307(0x17b)]&&this[_0x207307(0x3f5)](_0x3af3e3,_0xd51c75['x']+0x2,_0x4781ec['y']),_0x4f870e['x']+=_0x327968[_0x207307(0x392)](this[_0x207307(0x4a1)](),_0x413ed1['iconWidth'])+0x4;}}else{const _0x5f40c5=Number(RegExp['$1']),_0x58126b=Number(RegExp['$2']);return this[_0x4eab48(0x183)](_0x5f40c5,_0x58126b);}}if(_0x405800['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x5b79ad=$gameMap[_0x4eab48(0x179)](Number(RegExp['$1']));return this['processMoveRouteStepToCharacter'](_0x5b79ad);}if(_0x405800[_0x4eab48(0x59d)](/STEP TOWARD PLAYER/i))return this['processMoveRouteStepToPlayer']($gamePlayer);if(_0x405800['match'](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4eab48(0x221)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x405800[_0x4eab48(0x59d)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x407ec0=$gameMap[_0x4eab48(0x179)](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x407ec0);}if(_0x405800[_0x4eab48(0x59d)](/STEP AWAY FROM PLAYER/i))return this[_0x4eab48(0x529)]($gamePlayer);if(_0x405800[_0x4eab48(0x59d)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4eab48(0x2a0)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x405800['match'](/TURN TO EVENT:[ ](\d+)/i)){const _0xd30739=$gameMap[_0x4eab48(0x179)](Number(RegExp['$1']));return this['turnTowardCharacter'](_0xd30739);}if(_0x405800[_0x4eab48(0x59d)](/TURN TO PLAYER/i))return this[_0x4eab48(0x326)]($gamePlayer);if(_0x405800[_0x4eab48(0x59d)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4eab48(0x444)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x405800[_0x4eab48(0x59d)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x18bea3=$gameMap['event'](Number(RegExp['$1']));return this['turnAwayFromCharacter'](_0x18bea3);}if(_0x405800['match'](/TURN AWAY FROM PLAYER/i))return this[_0x4eab48(0x180)]($gamePlayer);if(_0x405800[_0x4eab48(0x59d)](/TURN LOWER LEFT/i))return this[_0x4eab48(0x470)](0x1);if(_0x405800[_0x4eab48(0x59d)](/TURN LOWER RIGHT/i))return this[_0x4eab48(0x470)](0x3);if(_0x405800['match'](/TURN UPPER LEFT/i))return this[_0x4eab48(0x470)](0x7);if(_0x405800[_0x4eab48(0x59d)](/TURN UPPER RIGHT/i))return this[_0x4eab48(0x470)](0x9);if(_0x405800['match'](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x4eab48(0x4dc)](RegExp['$1'],RegExp['$2']);if(_0x405800[_0x4eab48(0x59d)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x4eab48(0x142)](RegExp['$1'],RegExp['$2']);if(_0x405800[_0x4eab48(0x59d)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('YzHcE'!==_0x4eab48(0x511))return this[_0x4eab48(0x34f)](Number(RegExp['$1']),Number(RegExp['$2']));else{function _0x4cdb71(){const _0x33fcdc=_0x4eab48;for(const _0x1461f6 of _0x40815a[_0x33fcdc(0x1c8)]()){_0x1461f6[_0x33fcdc(0x575)]();}}}}if(_0x405800[_0x4eab48(0x59d)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x4c8196=$gameMap[_0x4eab48(0x179)](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x4c8196);}if(_0x405800[_0x4eab48(0x59d)](/TELEPORT TO PLAYER/i))return this[_0x4eab48(0x5cf)]($gamePlayer);try{if('StpJI'!==_0x4eab48(0x435)){function _0x4395f2(){const _0xc5d781=_0x4eab48;_0x50c0ac=_0x484ee6[_0xc5d781(0x26e)](_0x31bc0b,(_0x1a0439,_0x46e22b)=>_0x27ad58(this[_0xc5d781(0x5cb)],this[_0xc5d781(0x133)],_0x5f074b(_0x46e22b)));}}else VisuMZ['EventsMoveCore'][_0x4eab48(0x56f)][_0x4eab48(0x160)](this,_0x1fee88);}catch(_0x59487f){if($gameTemp['isPlaytest']())console[_0x4eab48(0x2cc)](_0x59487f);}},Game_Character[_0x5f1364(0x5c6)]['processMoveRouteAnimation']=function(_0x5d001b){const _0x4c3884=_0x5f1364;$gameTemp[_0x4c3884(0x430)]([this],_0x5d001b);},Game_Character['prototype'][_0x5f1364(0x34d)]=function(_0x3e2dc5){const _0xff2109=_0x5f1364;let _0xa296cf=0x0;switch(_0x3e2dc5[_0xff2109(0x199)]()[_0xff2109(0x2da)]()){case'!':case'EXCLAMATION':_0xa296cf=0x1;break;case'?':case'QUESTION':_0xa296cf=0x2;break;case'MUSIC':case _0xff2109(0x26c):case _0xff2109(0x134):case _0xff2109(0x375):case _0xff2109(0x270):_0xa296cf=0x3;break;case _0xff2109(0x266):case _0xff2109(0x251):_0xa296cf=0x4;break;case _0xff2109(0x33f):_0xa296cf=0x5;break;case _0xff2109(0x25c):_0xa296cf=0x6;break;case _0xff2109(0x51c):case _0xff2109(0x2d3):case _0xff2109(0x35c):_0xa296cf=0x7;break;case _0xff2109(0x513):case _0xff2109(0x59a):_0xa296cf=0x8;break;case _0xff2109(0x508):case _0xff2109(0x43c):case _0xff2109(0x3e2):case _0xff2109(0x527):case'LIGHTBULB':_0xa296cf=0x9;break;case'Z':case'ZZ':case _0xff2109(0x329):case _0xff2109(0x320):_0xa296cf=0xa;break;case _0xff2109(0x35e):_0xa296cf=0xb;break;case'USER-DEFINED\x202':_0xa296cf=0xc;break;case'USER-DEFINED\x203':_0xa296cf=0xd;break;case _0xff2109(0x4d4):_0xa296cf=0xe;break;case _0xff2109(0x37c):_0xa296cf=0xf;break;}$gameTemp[_0xff2109(0x4b4)](this,_0xa296cf);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x52b)]=function(_0x4f9113){const _0x418d38=_0x5f1364;_0x4f9113+=this[_0x418d38(0x3c7)],this[_0x418d38(0x4bf)](_0x4f9113[_0x418d38(0x4f2)](0x0,0xff));if(this[_0x418d38(0x3c7)]<0xff)this['_moveRouteIndex']--;},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x31c)]=function(_0x3b5271){const _0x563ef4=_0x5f1364;_0x3b5271=this[_0x563ef4(0x3c7)]-_0x3b5271,this['setOpacity'](_0x3b5271[_0x563ef4(0x4f2)](0x0,0xff));if(this[_0x563ef4(0x3c7)]>0x0)this[_0x563ef4(0x525)]--;},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x24e)]=function(_0x516d8d){const _0xfb5b4d=_0x5f1364,_0x36a5ff=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x3c8182=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x2b3f2d=this['direction'](),_0x474626=(_0x516d8d===_0xfb5b4d(0x29f)?_0x36a5ff:_0x3c8182)[_0x2b3f2d],_0x231fc8=(_0x516d8d===_0xfb5b4d(0x29f)?_0x3c8182:_0x36a5ff)[_0x2b3f2d];if(this['canPass'](this['x'],this['y'],_0x474626)){if(_0x516d8d===_0xfb5b4d(0x29f)){if(_0xfb5b4d(0x45c)==='tuaeA')this[_0xfb5b4d(0x294)]();else{function _0x3c131c(){const _0x3b1af1=_0xfb5b4d;_0x506ad8[_0x3b1af1(0x59d)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x502ddf=_0x36a62f(_0x464430['$1'])[_0x3b1af1(0x51e)]()[_0x3b1af1(0x2da)](),_0x79146b=_0x27a508(_0x2eb048['$2'])['toLowerCase']()[_0x3b1af1(0x2da)]();const _0x55b221=_0x517bde['parse']('['+_0x216e4e['$3']['match'](/\d+/g)+']');_0x502ddf=_0x502ddf[_0x3b1af1(0x1de)](0x0)[_0x3b1af1(0x199)]()+_0x502ddf['slice'](0x1),_0x79146b=_0x79146b[_0x3b1af1(0x1de)](0x0)[_0x3b1af1(0x199)]()+_0x79146b[_0x3b1af1(0x152)](0x1);const _0x209dcd=_0x3b1af1(0x1ef)[_0x3b1af1(0x35a)](_0x502ddf,_0x79146b);if(_0x50f2b7[_0x209dcd])_0x54ae35[_0x209dcd]=_0x11f9cc[_0x209dcd][_0x3b1af1(0x37d)](_0x55b221);}}}else this[_0xfb5b4d(0x2b8)]();}else{if(!this['canPass'](this['x'],this['y'],this[_0xfb5b4d(0x31a)]())){if('qKPbT'!=='qKPbT'){function _0x14939d(){const _0x4839a2=_0xfb5b4d;_0x52c84b[_0x4839a2(0x472)](_0x3eea21,_0x248d7b);const _0x5eadea=_0x114e12['PosX'],_0x5294ad=_0x3ea9e6['PosY'];_0x31ad9a[_0x4839a2(0x57e)](_0x5eadea,_0x5294ad);}}else{if(this[_0xfb5b4d(0x1f9)](this['x'],this['y'],_0x231fc8)){if(_0xfb5b4d(0x1e5)===_0xfb5b4d(0x261)){function _0x17305a(){const _0x3bc1a3=_0xfb5b4d;_0x548c4b+=this[_0x3bc1a3(0x3c7)],this[_0x3bc1a3(0x4bf)](_0x58c139[_0x3bc1a3(0x4f2)](0x0,0xff));if(this[_0x3bc1a3(0x3c7)]<0xff)this[_0x3bc1a3(0x525)]--;}}else{if(_0x516d8d===_0xfb5b4d(0x29f)){if(_0xfb5b4d(0x534)===_0xfb5b4d(0x41e)){function _0x42f378(){const _0x1dec29=_0xfb5b4d;return _0x21def4[_0x1dec29(0x507)]['Game_Variables_value'][_0x1dec29(0x160)](this,_0x39f321);}}else this[_0xfb5b4d(0x2b8)]();}else this[_0xfb5b4d(0x294)]();}}else{if(_0xfb5b4d(0x370)!==_0xfb5b4d(0x370)){function _0x3efe80(){const _0x45e4e2=_0xfb5b4d;return _0x2a290a[_0x45e4e2(0x507)]['Game_SelfSwitches_value']['call'](this,_0x304dfe);;}}else this[_0xfb5b4d(0x28a)]();}}}}this[_0xfb5b4d(0x1f9)](this['x'],this['y'],this['direction']())&&this[_0xfb5b4d(0x57d)]();},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x218)]=function(_0x23cb4d){const _0x15c18a=_0x5f1364;if(ImageManager['isBigCharacter'](this[_0x15c18a(0x442)]))return;_0x23cb4d=_0x23cb4d[_0x15c18a(0x4f2)](0x0,0x7),this[_0x15c18a(0x3e3)](this[_0x15c18a(0x442)],_0x23cb4d);},Game_Character[_0x5f1364(0x5c6)]['processMoveRouteJumpForward']=function(_0x125247){const _0x2db50a=_0x5f1364;switch(this[_0x2db50a(0x31a)]()){case 0x1:this[_0x2db50a(0x5ca)](-_0x125247,_0x125247);break;case 0x2:this[_0x2db50a(0x5ca)](0x0,_0x125247);break;case 0x3:this[_0x2db50a(0x5ca)](_0x125247,_0x125247);break;case 0x4:this['jump'](-_0x125247,0x0);break;case 0x6:this[_0x2db50a(0x5ca)](_0x125247,0x0);break;case 0x7:this[_0x2db50a(0x5ca)](-_0x125247,-_0x125247);break;case 0x8:this[_0x2db50a(0x5ca)](0x0,-_0x125247);break;case 0x9:this[_0x2db50a(0x5ca)](_0x125247,-_0x125247);break;}},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x324)]=function(_0x27f9f1,_0x4b8258){const _0x4de7c5=_0x5f1364,_0x577445=Math[_0x4de7c5(0x325)](_0x27f9f1-this['x']),_0x476101=Math[_0x4de7c5(0x325)](_0x4b8258-this['y']);this['jump'](_0x577445,_0x476101);},Game_Character[_0x5f1364(0x5c6)]['processMoveRouteJumpToCharacter']=function(_0x2e7fc7){const _0x4cecc3=_0x5f1364;if(_0x2e7fc7)this[_0x4cecc3(0x324)](_0x2e7fc7['x'],_0x2e7fc7['y']);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x183)]=function(_0x4ca3a0,_0x2b514d){const _0x908792=_0x5f1364;let _0x431b14=0x0;$gameMap['isSupportDiagonalMovement']()?_0x431b14=this['findDiagonalDirectionTo'](_0x4ca3a0,_0x2b514d):_0x431b14=this[_0x908792(0x547)](_0x4ca3a0,_0x2b514d),this[_0x908792(0x530)](_0x431b14),this[_0x908792(0x567)](!![]);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x271)]=function(_0x28a2d5){if(_0x28a2d5)this['processMoveRouteStepTo'](_0x28a2d5['x'],_0x28a2d5['y']);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x53f)]=function(_0x54e336,_0x5917c1){const _0x3fcc70=_0x5f1364,_0x53f18a=this[_0x3fcc70(0x5a8)](_0x54e336),_0x406d8b=this[_0x3fcc70(0x29c)](_0x5917c1);},Game_Character[_0x5f1364(0x5c6)]['processMoveRouteMoveUntilStop']=function(_0x132707){const _0x23eac9=_0x5f1364,_0x4c3142=['',_0x23eac9(0x4c8),_0x23eac9(0x2d2),_0x23eac9(0x3a3),_0x23eac9(0x3ac),'','RIGHT',_0x23eac9(0x34c),'UP',_0x23eac9(0x4be)],_0x52f270=_0x4c3142['indexOf'](_0x132707[_0x23eac9(0x199)]()['trim']());if(_0x52f270<=0x0)return;this[_0x23eac9(0x1f9)](this['x'],this['y'],_0x52f270)&&(this['executeMoveDir8'](_0x52f270),this['_moveRouteIndex']-=0x1);},Game_Character['prototype'][_0x5f1364(0x334)]=function(_0x349138,_0x3f9384){const _0x381224=_0x5f1364;this[_0x381224(0x183)](_0x349138,_0x3f9384);if(this['x']!==_0x349138||this['y']!==_0x3f9384)this[_0x381224(0x525)]--;},Game_Character['prototype'][_0x5f1364(0x239)]=function(_0x46b448){if(_0x46b448)this['processMoveRouteMoveTo'](_0x46b448['x'],_0x46b448['y']);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x43d)]=function(_0x2f4161,_0x16548e){const _0x790a84=_0x5f1364;_0x16548e=_0x16548e||0x0;const _0x1ca785={'code':0x1,'indent':null,'parameters':[]};_0x1ca785[_0x790a84(0x4c3)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x2f4161],this['_moveRoute'][_0x790a84(0x2e7)][this['_moveRouteIndex']][_0x790a84(0x297)][0x0]='';while(_0x16548e--){if(_0x790a84(0x3a0)==='SdrwA'){function _0x4e24b0(){const _0x3aba7e=_0x790a84;if(this[_0x3aba7e(0x303)]()&&this[_0x3aba7e(0x562)]()===_0x3aba7e(0x329))return!![];return _0x431ab5[_0x3aba7e(0x507)][_0x3aba7e(0x5a4)][_0x3aba7e(0x160)](this);}}else this[_0x790a84(0x4f8)][_0x790a84(0x2e7)]['splice'](this['_moveRouteIndex']+0x1,0x0,_0x1ca785);}},Game_Character['prototype'][_0x5f1364(0x39d)]=function(_0x5eac97){const _0x6b532c=_0x5f1364;this[_0x6b532c(0x540)]=!![],this[_0x6b532c(0x39c)](_0x5eac97);},Game_Character['prototype'][_0x5f1364(0x4dc)]=function(_0x412fec,_0x395376){const _0x39c983=_0x5f1364;if(this===$gamePlayer)return;const _0x51b7d2=[this[_0x39c983(0x5cb)],this[_0x39c983(0x133)],'A'];_0x412fec['match'](/\b[ABCD]\b/i)?_0x51b7d2[0x2]=String(_0x412fec)[_0x39c983(0x1de)](0x0)['toUpperCase']()[_0x39c983(0x2da)]():_0x51b7d2[0x2]='Self\x20Switch\x20%1'[_0x39c983(0x35a)](_0x412fec);switch(_0x395376[_0x39c983(0x199)]()[_0x39c983(0x2da)]()){case'ON':case _0x39c983(0x132):$gameSelfSwitches['setValue'](_0x51b7d2,!![]);break;case'OFF':case _0x39c983(0x3ca):$gameSelfSwitches[_0x39c983(0x13f)](_0x51b7d2,![]);break;case'Toggle':$gameSelfSwitches[_0x39c983(0x13f)](_0x51b7d2,!$gameSelfSwitches[_0x39c983(0x1b6)](_0x51b7d2));break;}},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x142)]=function(_0x2bdac5,_0x59b79b){const _0x48dc3=_0x5f1364;if(this===$gamePlayer)return;const _0x5223f0=[this['_mapId'],this[_0x48dc3(0x133)],_0x48dc3(0x2f7)[_0x48dc3(0x35a)](switchId)];$gameSelfSwitches[_0x48dc3(0x13f)](_0x5223f0,Number(_0x59b79b));},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x34f)]=function(_0x27ab7e,_0x1cd37f){const _0x5cc922=_0x5f1364;this[_0x5cc922(0x57a)](_0x27ab7e,_0x1cd37f);},Game_Character[_0x5f1364(0x5c6)]['processMoveRouteTeleportToCharacter']=function(_0x1e8ddf){const _0x290252=_0x5f1364;if(_0x1e8ddf)this[_0x290252(0x34f)](_0x1e8ddf['x'],_0x1e8ddf['y']);},Game_Character['prototype'][_0x5f1364(0x2b8)]=function(){const _0x3ac8a1=_0x5f1364;switch(this[_0x3ac8a1(0x31a)]()){case 0x1:this[_0x3ac8a1(0x470)](0x7);break;case 0x2:this[_0x3ac8a1(0x470)](0x4);break;case 0x3:this[_0x3ac8a1(0x470)](0x1);break;case 0x4:this['setDirection'](0x8);break;case 0x6:this[_0x3ac8a1(0x470)](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this['setDirection'](0x6);break;case 0x9:this[_0x3ac8a1(0x470)](0x3);break;}},Game_Character[_0x5f1364(0x5c6)]['turnLeft90']=function(){const _0x308fbf=_0x5f1364;switch(this['direction']()){case 0x1:this['setDirection'](0x3);break;case 0x2:this[_0x308fbf(0x470)](0x6);break;case 0x3:this[_0x308fbf(0x470)](0x9);break;case 0x4:this[_0x308fbf(0x470)](0x2);break;case 0x6:this['setDirection'](0x8);break;case 0x7:this[_0x308fbf(0x470)](0x1);break;case 0x8:this[_0x308fbf(0x470)](0x4);break;case 0x9:this[_0x308fbf(0x470)](0x7);break;}},Game_Character[_0x5f1364(0x5c6)]['getDirectionToPoint']=function(_0x1de852,_0x405e6d,_0x424d4b){const _0x25eff5=_0x5f1364,_0x3bf69c=this[_0x25eff5(0x5a8)](_0x1de852),_0x1aa474=this[_0x25eff5(0x29c)](_0x405e6d);if($gameMap[_0x25eff5(0x165)]()){if(_0x424d4b||this[_0x25eff5(0x3f7)]()){if(_0x3bf69c>0x0&&_0x1aa474<0x0)return 0x1;if(_0x3bf69c<0x0&&_0x1aa474<0x0)return 0x3;if(_0x3bf69c>0x0&&_0x1aa474>0x0)return 0x7;if(_0x3bf69c<0x0&&_0x1aa474>0x0)return 0x9;}}if(Math[_0x25eff5(0x454)](_0x3bf69c)>Math[_0x25eff5(0x454)](_0x1aa474))return _0x3bf69c>0x0?0x4:0x6;else{if(_0x1aa474!==0x0)return _0x1aa474>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype']['getDirectionFromPoint']=function(_0x2569df,_0x102a7c,_0x335846){const _0x31f9ad=_0x5f1364,_0x32ac56=this[_0x31f9ad(0x5a8)](_0x2569df),_0x41a221=this[_0x31f9ad(0x29c)](_0x102a7c);if($gameMap['isSupportDiagonalMovement']()){if(_0x31f9ad(0x46f)!==_0x31f9ad(0x46f)){function _0x150bd7(){return!![];}}else{if(_0x335846||this['isSpriteVS8dir']()){if(_0x32ac56>0x0&&_0x41a221<0x0)return 0x9;if(_0x32ac56<0x0&&_0x41a221<0x0)return 0x7;if(_0x32ac56>0x0&&_0x41a221>0x0)return 0x3;if(_0x32ac56<0x0&&_0x41a221>0x0)return 0x1;}}}if(Math[_0x31f9ad(0x454)](_0x32ac56)>Math[_0x31f9ad(0x454)](_0x41a221)){if(_0x31f9ad(0x138)!=='Gzoij')return _0x32ac56>0x0?0x6:0x4;else{function _0x29aeb3(){const _0x7af466=_0x31f9ad;if(this[_0x7af466(0x244)]===_0x950a68)this[_0x7af466(0x45f)]();if(!_0x416401)return;const _0x703b6e='Map%1-Event%2'[_0x7af466(0x35a)](_0x2f4a87[_0x7af466(0x5cb)],_0x3ecf95[_0x7af466(0x133)]);this[_0x7af466(0x244)][_0x703b6e]={'direction':_0xf00c10[_0x7af466(0x31a)](),'x':_0x5edf1d['round'](_0x2881bf['x']),'y':_0x17dc4d[_0x7af466(0x325)](_0x4ceb37['y']),'pageIndex':_0x3b9b7f[_0x7af466(0x2dd)],'moveRouteIndex':_0x542549['_moveRouteIndex']};}}}else{if(_0x41a221!==0x0){if(_0x31f9ad(0x505)!=='Iatgi'){function _0x24c9b4(){const _0xa3b5c1=_0x31f9ad;return this[_0xa3b5c1(0x3ae)]();}}else return _0x41a221>0x0?0x2:0x8;}}return 0x0;},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x2a0)]=function(_0xda2bf8,_0x4b7bbf){const _0x434f9e=_0x5f1364,_0x17f686=this[_0x434f9e(0x517)](_0xda2bf8,_0x4b7bbf,!![]);if(_0x17f686)this[_0x434f9e(0x530)](_0x17f686);},Game_Character[_0x5f1364(0x5c6)]['moveAwayFromPoint']=function(_0xa7f336,_0x5079d3){const _0x5037f9=_0x5f1364,_0x5740d0=this['getDirectionFromPoint'](_0xa7f336,_0x5079d3,!![]);if(_0x5740d0)this[_0x5037f9(0x530)](_0x5740d0);},Game_Character['prototype'][_0x5f1364(0x551)]=function(_0x16be54,_0x227e7d){const _0x5b82af=_0x5f1364,_0x527fe9=this[_0x5b82af(0x517)](_0x16be54,_0x227e7d,![]);if(_0x527fe9)this[_0x5b82af(0x470)](_0x527fe9);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x444)]=function(_0x43ee28,_0x963697){const _0x4fda02=_0x5f1364,_0x4f3060=this[_0x4fda02(0x371)](_0x43ee28,_0x963697,![]);if(_0x4f3060)this[_0x4fda02(0x470)](_0x4f3060);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x32b)]=function(_0x2ec248){if(_0x2ec248)this['moveTowardPoint'](_0x2ec248['x'],_0x2ec248['y']);},Game_Character[_0x5f1364(0x5c6)][_0x5f1364(0x529)]=function(_0x1f1643){const _0x14f0cc=_0x5f1364;if(_0x1f1643)this[_0x14f0cc(0x221)](_0x1f1643['x'],_0x1f1643['y']);},Game_Character['prototype'][_0x5f1364(0x326)]=function(_0x393fd7){if(_0x393fd7)this['turnTowardPoint'](_0x393fd7['x'],_0x393fd7['y']);},Game_Character['prototype'][_0x5f1364(0x180)]=function(_0x398a4e){if(_0x398a4e)this['turnAwayFromPoint'](_0x398a4e['x'],_0x398a4e['y']);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x281)]=Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x466)],Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x466)]=function(){const _0x287f44=_0x5f1364;if(this[_0x287f44(0x4d9)])return!![];return VisuMZ[_0x287f44(0x507)][_0x287f44(0x281)]['call'](this);},Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x516)]=function(){const _0x42aa69=_0x5f1364;return this['isDashing']()&&(this[_0x42aa69(0x260)]()||this[_0x42aa69(0x16c)]()!==0x0&&this[_0x42aa69(0x1f9)](this['_x'],this['_y'],this[_0x42aa69(0x16c)]())||$gameTemp[_0x42aa69(0x5c7)]());},VisuMZ['EventsMoveCore'][_0x5f1364(0x310)]=Game_Player[_0x5f1364(0x5c6)]['getInputDirection'],Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x16c)]=function(){const _0x18bef2=_0x5f1364;if($gameMap[_0x18bef2(0x165)]()){if(_0x18bef2(0x498)===_0x18bef2(0x498))return this['getInputDir8']();else{function _0x1cec81(){const _0x285b16=_0x18bef2;[0x6c,0x198][_0x285b16(0x161)](_0x2c2738['code'])&&(_0x20a8a7+=_0x22a10f[_0x285b16(0x297)][0x0]);}}}else{if(_0x18bef2(0x1a8)===_0x18bef2(0x1a8))return VisuMZ[_0x18bef2(0x507)][_0x18bef2(0x310)]['call'](this);else{function _0x5bf034(){const _0x334883=_0x18bef2;if(!_0x63f72e['isWorking']())return;_0x3cf158[_0x334883(0x3d0)]();}}}},Game_Player['prototype'][_0x5f1364(0x3ae)]=function(){const _0x166b1e=_0x5f1364;return Input[_0x166b1e(0x1be)];},Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x2a2)]=function(){const _0x3befbe=_0x5f1364;if($gameSystem[_0x3befbe(0x3f3)]())return 0x0;if(!this['isMoving']()&&this[_0x3befbe(0x46b)]()){let _0x4c1226=this[_0x3befbe(0x16c)]();if(_0x4c1226>0x0)$gameTemp[_0x3befbe(0x479)]();else{if($gameTemp[_0x3befbe(0x5c7)]()){const _0x3d88a5=$gameTemp['destinationX'](),_0x34ccd6=$gameTemp[_0x3befbe(0x1ae)](),_0x3f7e4=$gameMap[_0x3befbe(0x165)](),_0x2837e1=$gameMap[_0x3befbe(0x59c)](_0x3d88a5,_0x34ccd6),_0x4071d8=$gameMap['eventsXyNt'](_0x3d88a5,_0x34ccd6)[_0x3befbe(0x509)]<=0x0;_0x3f7e4&&_0x2837e1&&_0x4071d8?_0x4c1226=this[_0x3befbe(0x545)](_0x3d88a5,_0x34ccd6):_0x4c1226=this[_0x3befbe(0x547)](_0x3d88a5,_0x34ccd6);}}if(_0x4c1226>0x0){this[_0x3befbe(0x232)]=this['_inputTime']||0x0;if(this['isTurnInPlace']()){if(_0x3befbe(0x330)!==_0x3befbe(0x216))this[_0x3befbe(0x470)](_0x4c1226);else{function _0x18000c(){const _0x3eea0f=_0x3befbe,_0x1e5ec7=_0x3c28a1[_0x3eea0f(0x45b)];this[_0x3eea0f(0x167)]=this[_0x3eea0f(0x1c8)]()['length']>_0x1e5ec7;if(this[_0x3eea0f(0x167)]&&_0x18b70a[_0x3eea0f(0x445)]()){}}}}else this['executeMove'](_0x4c1226);this[_0x3befbe(0x232)]++;}else{if(_0x3befbe(0x358)!==_0x3befbe(0x358)){function _0x264cf8(){if(_0x1609a6)_0x545be0['setChaseOff'](![]);}}else this[_0x3befbe(0x232)]=0x0;}}},Game_Player[_0x5f1364(0x5c6)]['isTurnInPlace']=function(){const _0x4aeee4=_0x5f1364,_0x702e16=VisuMZ[_0x4aeee4(0x507)][_0x4aeee4(0x18d)][_0x4aeee4(0x25b)];if(!_0x702e16['EnableTurnInPlace'])return![];if($gameTemp[_0x4aeee4(0x5c7)]())return![];if(this['isDashing']()||this['isMoving']()||this['isOnLadder']())return![];return this[_0x4aeee4(0x232)]<_0x702e16['TurnInPlaceDelay'];},VisuMZ['EventsMoveCore']['Game_Player_executeMove']=Game_Player['prototype'][_0x5f1364(0x24b)],Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x24b)]=function(_0xa13dcd){const _0x32705d=_0x5f1364;if($gameMap[_0x32705d(0x165)]())this[_0x32705d(0x530)](_0xa13dcd);else{if(_0x32705d(0x2ae)!==_0x32705d(0x27d))VisuMZ[_0x32705d(0x507)][_0x32705d(0x367)][_0x32705d(0x160)](this,_0xa13dcd);else{function _0x3de4b2(){const _0x32b1e1=_0x32705d;return(this[_0x32b1e1(0x19c)]||'')[_0x32b1e1(0x199)]()[_0x32b1e1(0x2da)]();}}}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x26b)]=Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x173)],Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x173)]=function(_0x458758,_0x43950e,_0x31c626){const _0x29802e=_0x5f1364;if($gameMap[_0x29802e(0x4f4)](_0x458758,_0x43950e,_0x31c626,_0x29802e(0x150))){if(this[_0x29802e(0x49e)]()&&this['vehicle']()){if('nhzIX'!=='ITJJR')return this[_0x29802e(0x24d)]()[_0x29802e(0x173)](_0x458758,_0x43950e,_0x31c626);else{function _0x507427(){const _0x4ae2dd=_0x29802e;return!!this[_0x4ae2dd(0x54d)](_0x3a098f);}}}else return!![];}if($gameMap[_0x29802e(0x410)](_0x458758,_0x43950e,_0x31c626,_0x29802e(0x150)))return![];return VisuMZ[_0x29802e(0x507)][_0x29802e(0x26b)]['call'](this,_0x458758,_0x43950e,_0x31c626);},VisuMZ['EventsMoveCore'][_0x5f1364(0x3a5)]=Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x156)],Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x156)]=function(_0x1aaac8){const _0x49d524=_0x5f1364;VisuMZ[_0x49d524(0x507)]['Game_Player_checkEventTriggerHere'][_0x49d524(0x160)](this,_0x1aaac8);if(this[_0x49d524(0x1e9)]()){if('UhwkO'!==_0x49d524(0x483)){function _0x1594c1(){const _0xfb916a=_0x49d524;_0x19af1a[_0xfb916a(0x507)][_0xfb916a(0x474)][_0xfb916a(0x214)](_0x5d5435);}}else{this[_0x49d524(0x4bc)](_0x1aaac8);if(_0x1aaac8['includes'](0x0)&&this[_0x49d524(0x338)]()==='standing'){if(_0x49d524(0x17e)===_0x49d524(0x4a5)){function _0x16bbc2(){const _0x224786=_0x49d524;let _0x3a4119='';for(const _0x2922a6 of _0x20cea1[_0x224786(0x2e7)]){[0x6c,0x198][_0x224786(0x161)](_0x2922a6[_0x224786(0x4c3)])&&(_0x3a4119+=_0x2922a6[_0x224786(0x297)][0x0]);}if(_0x3a4119['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x3a4119['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}}else this[_0x49d524(0x43e)](this['x'],this['y']);}else(_0x1aaac8[_0x49d524(0x161)](0x1)||_0x1aaac8[_0x49d524(0x161)](0x2))&&this[_0x49d524(0x35d)]();}}},VisuMZ[_0x5f1364(0x507)]['Game_Player_checkEventTriggerThere']=Game_Player['prototype']['checkEventTriggerThere'],Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x486)]=function(_0x195049){const _0x364625=_0x5f1364;VisuMZ[_0x364625(0x507)][_0x364625(0x54b)][_0x364625(0x160)](this,_0x195049);if(this['canStartLocalEvents']()&&_0x195049[_0x364625(0x161)](0x0)&&this[_0x364625(0x338)]()===_0x364625(0x2fe)){if('vzFyE'===_0x364625(0x298)){function _0x53cba2(){return!![];}}else{const _0x440ccd=this[_0x364625(0x31a)](),_0xc08f6=$gameMap[_0x364625(0x4e3)](this['x'],_0x440ccd),_0x472c9d=$gameMap[_0x364625(0x27e)](this['y'],_0x440ccd);this[_0x364625(0x43e)](_0xc08f6,_0x472c9d);}}},Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x4bc)]=function(_0x126e3f){const _0x576d62=_0x5f1364;if($gameMap[_0x576d62(0x1fa)]())return;if($gameMap[_0x576d62(0x412)]())return;const _0x141a44=$gameMap[_0x576d62(0x1c8)]();for(const _0x3cf141 of _0x141a44){if(!_0x3cf141)continue;if(!_0x3cf141['isTriggerIn'](_0x126e3f))continue;if(this[_0x576d62(0x345)](_0x3cf141))return _0x3cf141['start']();if(this['meetActivationProximityConditions'](_0x3cf141))return _0x3cf141[_0x576d62(0x457)]();}},Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x345)]=function(_0x482d77){const _0x167387=_0x5f1364;if($gameMap[_0x167387(0x1fa)]())return![];if($gameMap[_0x167387(0x412)]())return![];return _0x482d77[_0x167387(0x2ee)]()[_0x167387(0x161)](this[_0x167387(0x340)]());},Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x587)]=function(_0x4d8150){const _0x3e8dd5=_0x5f1364;if($gameMap[_0x3e8dd5(0x1fa)]())return![];if($gameMap[_0x3e8dd5(0x412)]())return![];if([_0x3e8dd5(0x4ef),_0x3e8dd5(0x4d2)][_0x3e8dd5(0x161)](_0x4d8150[_0x3e8dd5(0x287)]()))return![];const _0x3fb763=_0x4d8150[_0x3e8dd5(0x287)](),_0x1df478=_0x4d8150[_0x3e8dd5(0x441)]();switch(_0x3fb763){case _0x3e8dd5(0x5b1):const _0x319560=$gameMap[_0x3e8dd5(0x4b5)](this['x'],this['y'],_0x4d8150['x'],_0x4d8150['y']);return _0x4d8150['activationProximityDistance']()>=_0x319560;break;case _0x3e8dd5(0x36e):return _0x1df478>=Math[_0x3e8dd5(0x454)](_0x4d8150[_0x3e8dd5(0x5a8)](this['x']))&&_0x1df478>=Math[_0x3e8dd5(0x454)](_0x4d8150[_0x3e8dd5(0x29c)](this['y']));break;case _0x3e8dd5(0x17a):return _0x1df478>=Math[_0x3e8dd5(0x454)](_0x4d8150[_0x3e8dd5(0x29c)](this['y']));break;case _0x3e8dd5(0x452):return _0x1df478>=Math[_0x3e8dd5(0x454)](_0x4d8150[_0x3e8dd5(0x5a8)](this['x']));break;case _0x3e8dd5(0x455):return![];break;}},Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x43e)]=function(_0x301330,_0x3446ea){const _0x1134e6=_0x5f1364;if($gameMap[_0x1134e6(0x1fa)]())return;if($gameMap[_0x1134e6(0x412)]())return;let _0x4d49aa=VisuMZ[_0x1134e6(0x507)][_0x1134e6(0x18d)][_0x1134e6(0x1c9)],_0x37ff53=$gameMap[_0x1134e6(0x340)](_0x301330,_0x3446ea);const _0x2e2459=_0x1134e6(0x4d7)[_0x1134e6(0x35a)](_0x37ff53);_0x4d49aa[_0x2e2459]&&$gameTemp[_0x1134e6(0x176)](_0x4d49aa[_0x2e2459]);},Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x338)]=function(){const _0x33a696=_0x5f1364;return VisuMZ[_0x33a696(0x507)]['Settings'][_0x33a696(0x32c)];},Game_Player[_0x5f1364(0x5c6)]['startMapCommonEventOnTouch']=function(){const _0x4cad8a=_0x5f1364;if($gameMap['isEventRunning']())return;if($gameMap[_0x4cad8a(0x412)]())return;let _0x190833=VisuMZ[_0x4cad8a(0x507)][_0x4cad8a(0x18d)][_0x4cad8a(0x502)];const _0x23ec60=_0x4cad8a(0x4d7)['format'](this[_0x4cad8a(0x340)]());_0x190833[_0x23ec60]&&$gameTemp[_0x4cad8a(0x176)](_0x190833[_0x23ec60]);},VisuMZ['EventsMoveCore'][_0x5f1364(0x4b0)]=Game_Player[_0x5f1364(0x5c6)][_0x5f1364(0x469)],Game_Player['prototype']['increaseSteps']=function(){const _0x509575=_0x5f1364;VisuMZ[_0x509575(0x507)][_0x509575(0x4b0)][_0x509575(0x160)](this),VisuMZ[_0x509575(0x1e1)](0x0);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x2ca)]=Game_Follower['prototype'][_0x5f1364(0x223)],Game_Follower[_0x5f1364(0x5c6)][_0x5f1364(0x223)]=function(_0x1300f){const _0x50659f=_0x5f1364;VisuMZ['EventsMoveCore']['Game_Follower_initialize'][_0x50659f(0x160)](this,_0x1300f),this[_0x50659f(0x438)]=![];},Game_Follower['prototype'][_0x5f1364(0x466)]=function(){const _0x2aa5e4=_0x5f1364;return $gamePlayer[_0x2aa5e4(0x466)]();},Game_Follower[_0x5f1364(0x5c6)][_0x5f1364(0x516)]=function(){return $gamePlayer['isDashingAndMoving']();},Game_Follower[_0x5f1364(0x5c6)][_0x5f1364(0x1cd)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower['prototype'][_0x5f1364(0x154)]=function(_0x41493e){const _0xee6370=_0x5f1364;this[_0xee6370(0x438)]=_0x41493e;},VisuMZ['EventsMoveCore'][_0x5f1364(0x32a)]=Game_Follower[_0x5f1364(0x5c6)][_0x5f1364(0x14f)],Game_Follower[_0x5f1364(0x5c6)]['chaseCharacter']=function(_0x54cce9){const _0x4e6703=_0x5f1364;if(this[_0x4e6703(0x438)])return;if($gameSystem[_0x4e6703(0x2a3)]())return;VisuMZ[_0x4e6703(0x507)][_0x4e6703(0x32a)][_0x4e6703(0x160)](this,_0x54cce9);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x3e5)]=Game_Vehicle['prototype'][_0x5f1364(0x173)],Game_Vehicle[_0x5f1364(0x5c6)][_0x5f1364(0x173)]=function(_0x5fc71c,_0x48e468,_0x3ec4dd){const _0x3db6d4=_0x5f1364;if($gameMap[_0x3db6d4(0x4f4)](_0x5fc71c,_0x48e468,_0x3ec4dd,this[_0x3db6d4(0x550)]))return!![];if($gameMap[_0x3db6d4(0x410)](_0x5fc71c,_0x48e468,_0x3ec4dd,this['_type']))return![];return VisuMZ[_0x3db6d4(0x507)][_0x3db6d4(0x3e5)]['call'](this,_0x5fc71c,_0x48e468,_0x3ec4dd);},Game_Vehicle[_0x5f1364(0x5c6)][_0x5f1364(0x3bb)]=function(_0x3885cf,_0x1f7934,_0x58f466){const _0x3849ad=_0x5f1364;if($gameMap['isRegionAllowPass'](_0x3885cf,_0x1f7934,_0x58f466,this[_0x3849ad(0x550)]))return!![];if($gameMap[_0x3849ad(0x410)](_0x3885cf,_0x1f7934,_0x58f466,this[_0x3849ad(0x550)]))return![];return VisuMZ[_0x3849ad(0x507)][_0x3849ad(0x2ab)][_0x3849ad(0x160)]($gamePlayer,_0x3885cf,_0x1f7934,_0x58f466);},VisuMZ['EventsMoveCore']['Game_Vehicle_isLandOk']=Game_Vehicle['prototype'][_0x5f1364(0x424)],Game_Vehicle[_0x5f1364(0x5c6)]['isLandOk']=function(_0xf576fc,_0x4855b6,_0x4a152f){const _0x1874d5=_0x5f1364;if($gameMap['isRegionDockable'](_0xf576fc,_0x4855b6,_0x4a152f,this[_0x1874d5(0x550)]))return!![];const _0x377521=this[_0x1874d5(0x550)][_0x1874d5(0x1de)](0x0)[_0x1874d5(0x199)]()+this[_0x1874d5(0x550)]['slice'](0x1),_0x46c901='%1DockRegionOnly'[_0x1874d5(0x35a)](_0x377521);if(VisuMZ[_0x1874d5(0x507)][_0x1874d5(0x18d)][_0x1874d5(0x55b)][_0x46c901]){if(_0x1874d5(0x3ce)===_0x1874d5(0x3ce))return![];else{function _0x316104(){const _0x4ba377=_0x1874d5;return this[_0x4ba377(0x540)]=![];}}}else{if(_0x1874d5(0x399)!==_0x1874d5(0x399)){function _0x662136(){const _0x548ea3=_0x1874d5;_0x1e4003[_0x548ea3(0x148)](_0x5c2ec2[_0x548ea3(0x4e7)]),_0x2dfcfd[_0x548ea3(0x507)]['Window_NumberInput_processOk'][_0x548ea3(0x160)](this),_0x36692c[_0x548ea3(0x254)](),_0x2f42e8[_0x548ea3(0x4e7)]=_0x4c2335;}}else return VisuMZ[_0x1874d5(0x507)][_0x1874d5(0x4e0)][_0x1874d5(0x160)](this,_0xf576fc,_0x4855b6,_0x4a152f);}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x28f)]=Game_Vehicle[_0x5f1364(0x5c6)]['initMoveSpeed'],Game_Vehicle['prototype']['initMoveSpeed']=function(){const _0x2b3080=_0x5f1364;VisuMZ[_0x2b3080(0x507)]['Game_Vehicle_initMoveSpeed'][_0x2b3080(0x160)](this);const _0x247887=VisuMZ[_0x2b3080(0x507)][_0x2b3080(0x18d)]['Movement'];if(this[_0x2b3080(0x366)]()){if(_0x247887['BoatSpeed'])this['setMoveSpeed'](_0x247887['BoatSpeed']);}else{if(this[_0x2b3080(0x39b)]()){if(_0x247887[_0x2b3080(0x312)])this[_0x2b3080(0x583)](_0x247887[_0x2b3080(0x312)]);}else{if(this['isAirship']()){if(_0x2b3080(0x258)===_0x2b3080(0x258)){if(_0x247887[_0x2b3080(0x3c1)])this['setMoveSpeed'](_0x247887[_0x2b3080(0x3c1)]);}else{function _0x166bfa(){if(_0x5db219>0x0&&_0x67a62a<0x0)return 0x1;if(_0x187999<0x0&&_0xfa926b<0x0)return 0x3;if(_0x5a5ed6>0x0&&_0x32fd5c>0x0)return 0x7;if(_0xdfef61<0x0&&_0x4f0ece>0x0)return 0x9;}}}}}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x1a3)]=Game_Event['prototype'][_0x5f1364(0x223)],Game_Event[_0x5f1364(0x5c6)]['initialize']=function(_0x165f9b,_0x1bd9a5){const _0x1a419f=_0x5f1364;VisuMZ[_0x1a419f(0x507)][_0x1a419f(0x1a3)][_0x1a419f(0x160)](this,_0x165f9b,_0x1bd9a5),this['setupCopyEvent'](),this['setupMorphEvent'](),this[_0x1a419f(0x3d2)]();},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x289)]=Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x179)],Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x179)]=function(){const _0x1f159e=_0x5f1364;if(this['_eventMorphData']!==undefined){if(_0x1f159e(0x5d1)===_0x1f159e(0x264)){function _0x189464(){const _0x459d35=_0x1f159e;let _0x5e9dca=[_0x470a43,_0x21a717,_0x459d35(0x332)['format'](_0x45fbc5)];typeof _0x466930===_0x459d35(0x2f3)&&(_0x5e9dca=[_0x4ea490,_0x1cce44,_0xf35311[_0x459d35(0x199)]()['trim']()]);}}else{const _0xc71d86=this[_0x1f159e(0x3f2)]['mapId'],_0x442fff=this[_0x1f159e(0x3f2)][_0x1f159e(0x5be)];return VisuMZ[_0x1f159e(0x2ec)][_0xc71d86]['events'][_0x442fff];}}if(this[_0x1f159e(0x501)]!==undefined){const _0x1095f9=this[_0x1f159e(0x501)]['mapId'],_0x52bf7e=this['_eventCopyData']['eventId'];return VisuMZ[_0x1f159e(0x2ec)][_0x1095f9][_0x1f159e(0x1c8)][_0x52bf7e];}if(this[_0x1f159e(0x5a3)]!==undefined){const _0x9cdc7c=this[_0x1f159e(0x5a3)]['mapId'],_0x3191eb=this[_0x1f159e(0x5a3)][_0x1f159e(0x5be)];return VisuMZ[_0x1f159e(0x2ec)][_0x9cdc7c]['events'][_0x3191eb];}if($gameTemp['_spawnData']!==undefined){const _0x3ac03d=$gameTemp[_0x1f159e(0x2c2)][_0x1f159e(0x402)],_0x49257b=$gameTemp[_0x1f159e(0x2c2)][_0x1f159e(0x5be)];return VisuMZ[_0x1f159e(0x2ec)][_0x3ac03d][_0x1f159e(0x1c8)][_0x49257b];}return VisuMZ[_0x1f159e(0x507)][_0x1f159e(0x289)]['call'](this);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x166)]=function(_0x47e175,_0x5f348a){const _0x5cc945=_0x5f1364;if(_0x47e175===0x0||_0x5f348a===0x0)return![];if(!VisuMZ[_0x5cc945(0x2ec)][_0x47e175]){if($gameTemp[_0x5cc945(0x445)]()){if(_0x5cc945(0x580)!=='Yblvu')console['log'](_0x5cc945(0x1b5)[_0x5cc945(0x35a)](_0x47e175));else{function _0x54ab74(){const _0x501847=_0x5cc945;return this[_0x501847(0x519)]();}}}return![];}return!![];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x38b)]=Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x457)],Game_Event['prototype'][_0x5f1364(0x457)]=function(){const _0x3233a=_0x5f1364;VisuMZ['EventsMoveCore']['Game_Event_start'][_0x3233a(0x160)](this);if(Imported['VisuMZ_1_MessageCore']&&Input[_0x3233a(0x3b1)](VisuMZ['MessageCore'][_0x3233a(0x18d)]['General']['FastForwardKey'])){if(_0x3233a(0x4fd)==='PyOCC'){function _0x51b476(){const _0x1ae4ae=_0x3233a;return this[_0x1ae4ae(0x39d)](_0x12d118(_0x3814ba['$1']));}}else Input[_0x3233a(0x136)]();}},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x461)]=function(){const _0x1494b3=_0x5f1364,_0x353c1f=this[_0x1494b3(0x179)]()['note'];if(_0x353c1f==='')return;if(DataManager[_0x1494b3(0x349)]()||DataManager['isEventTest']())return;const _0x3eac74=VisuMZ[_0x1494b3(0x507)]['Settings']['Template'];let _0x31b227=null,_0x525804=0x0,_0x572a7d=0x0;if(_0x353c1f['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x525804=Number(RegExp['$1']),_0x572a7d=Number(RegExp['$2']);else{if(_0x353c1f['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i)){if('fPVKQ'===_0x1494b3(0x14d))_0x525804=Number(RegExp['$1']),_0x572a7d=Number(RegExp['$2']);else{function _0x562716(){const _0x11ae31=_0x1494b3,_0x3a22f3=_0x22a570[_0x11ae31(0x182)][_0x5b0dd0];if(!_0x3a22f3)return;_0x3a22f3[_0x11ae31(0x31e)][_0x11ae31(0x160)](this,_0x32e87f,_0x31eab9,this);}}}else{if(_0x353c1f[_0x1494b3(0x59d)](/<COPY EVENT:[ ](.*?)>/i)){if(_0x1494b3(0x188)!=='sumcX'){function _0x442dd0(){const _0x4c4eb9=_0x1494b3;return this[_0x4c4eb9(0x5cd)]();}}else{const _0x4c09b3=String(RegExp['$1'])[_0x1494b3(0x199)]()[_0x1494b3(0x2da)]();_0x31b227=VisuMZ[_0x1494b3(0x182)][_0x4c09b3];if(!_0x31b227)return;_0x525804=_0x31b227[_0x1494b3(0x531)],_0x572a7d=_0x31b227[_0x1494b3(0x2c0)];}}}}if(!this[_0x1494b3(0x166)](_0x525804,_0x572a7d))return;_0x3eac74['PreCopyJS'][_0x1494b3(0x160)](this,_0x525804,_0x572a7d,this);if(_0x31b227)_0x31b227['PreCopyJS'][_0x1494b3(0x160)](this,_0x525804,_0x572a7d,this);this[_0x1494b3(0x501)]={'mapId':_0x525804,'eventId':_0x572a7d},this[_0x1494b3(0x2dd)]=-0x2,this[_0x1494b3(0x575)](),_0x3eac74[_0x1494b3(0x458)]['call'](this,_0x525804,_0x572a7d,this);if(_0x31b227)_0x31b227['PostCopyJS'][_0x1494b3(0x160)](this,_0x525804,_0x572a7d,this);$gameMap[_0x1494b3(0x423)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x473)]=function(){const _0x53e7ec=_0x5f1364,_0x33f545=$gameSystem['getPreservedMorphEventData'](this);if(!_0x33f545)return;const _0x2461ae=_0x33f545[_0x53e7ec(0x48a)][_0x53e7ec(0x199)]()[_0x53e7ec(0x2da)]();_0x2461ae!==_0x53e7ec(0x3b3)?this[_0x53e7ec(0x27b)](_0x2461ae,!![]):this[_0x53e7ec(0x3f0)](_0x33f545[_0x53e7ec(0x402)],_0x33f545[_0x53e7ec(0x5be)],!![]);},Game_Event['prototype'][_0x5f1364(0x3f0)]=function(_0x1dc6c3,_0x4475c6,_0x3b6048){const _0x3692b1=_0x5f1364;if(!this['checkValidEventerMap'](_0x1dc6c3,_0x4475c6))return;const _0x5f1e85=VisuMZ[_0x3692b1(0x507)]['Settings'][_0x3692b1(0x5c4)];if(!_0x3b6048)_0x5f1e85[_0x3692b1(0x228)][_0x3692b1(0x160)](this,_0x1dc6c3,_0x4475c6,this);this[_0x3692b1(0x3f2)]={'mapId':_0x1dc6c3,'eventId':_0x4475c6},this[_0x3692b1(0x2dd)]=-0x2,this[_0x3692b1(0x575)]();if(!_0x3b6048)_0x5f1e85[_0x3692b1(0x2e3)][_0x3692b1(0x160)](this,_0x1dc6c3,_0x4475c6,this);$gameMap[_0x3692b1(0x423)]();},Game_Event[_0x5f1364(0x5c6)]['morphIntoTemplate']=function(_0x125536,_0x33568e){const _0x348b6e=_0x5f1364;_0x125536=_0x125536[_0x348b6e(0x199)]()[_0x348b6e(0x2da)]();const _0x4866b8=VisuMZ[_0x348b6e(0x182)][_0x125536];if(!_0x4866b8)return;const _0x3488cf=_0x4866b8['MapID'],_0x4380d0=_0x4866b8[_0x348b6e(0x2c0)];if(!this[_0x348b6e(0x166)](_0x3488cf,_0x4380d0))return;if(!_0x33568e)_0x4866b8[_0x348b6e(0x228)][_0x348b6e(0x160)](this,_0x3488cf,_0x4380d0,this);this[_0x348b6e(0x3f0)](_0x3488cf,_0x4380d0,_0x33568e);if(!_0x33568e)_0x4866b8[_0x348b6e(0x2e3)][_0x348b6e(0x160)](this,_0x3488cf,_0x4380d0,this);if($gameMap)$gameMap[_0x348b6e(0x423)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x2f1)]=function(){const _0x39815a=_0x5f1364;this[_0x39815a(0x3f2)]=undefined,this[_0x39815a(0x2dd)]=-0x2,this[_0x39815a(0x575)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x20a)]=function(_0x4436ff){const _0x40a1ba=_0x5f1364,_0x169cc6=VisuMZ[_0x40a1ba(0x507)]['Settings'][_0x40a1ba(0x5c4)],_0x458a87=_0x4436ff['template']['toUpperCase']()[_0x40a1ba(0x2da)](),_0x35e7b8=!['',_0x40a1ba(0x3b3)][_0x40a1ba(0x161)](_0x458a87);let _0x56e72d=0x0,_0x56257a=0x0;if(_0x35e7b8){const _0x5fb1d9=VisuMZ['EventTemplates'][_0x458a87];if(!_0x5fb1d9)return;_0x56e72d=_0x5fb1d9[_0x40a1ba(0x531)],_0x56257a=_0x5fb1d9['EventID'];}else{if(_0x40a1ba(0x149)===_0x40a1ba(0x149))_0x56e72d=_0x4436ff[_0x40a1ba(0x402)],_0x56257a=_0x4436ff[_0x40a1ba(0x5be)];else{function _0x8ffbcc(){this['_forceDashing']=![];}}}if(!this[_0x40a1ba(0x166)](_0x56e72d,_0x56257a))return;if(_0x35e7b8){const _0x13650c=VisuMZ[_0x40a1ba(0x182)][_0x458a87];_0x13650c[_0x40a1ba(0x2c1)][_0x40a1ba(0x160)](this,_0x56e72d,_0x56257a,this);}_0x169cc6[_0x40a1ba(0x2c1)][_0x40a1ba(0x160)](this,_0x56e72d,_0x56257a,this),this['_eventSpawnData']=_0x4436ff,this[_0x40a1ba(0x2dd)]=-0x2,this['_mapId']=$gameMap[_0x40a1ba(0x402)](),this[_0x40a1ba(0x133)]=_0x4436ff['spawnEventId'],this[_0x40a1ba(0x588)]=_0x4436ff[_0x40a1ba(0x242)],this[_0x40a1ba(0x57a)](_0x4436ff['x'],_0x4436ff['y']),this[_0x40a1ba(0x470)](_0x4436ff['direction']),this[_0x40a1ba(0x575)]();if(_0x35e7b8){const _0x27e455=VisuMZ[_0x40a1ba(0x182)][_0x458a87];if(!_0x27e455)return;_0x27e455[_0x40a1ba(0x31e)][_0x40a1ba(0x160)](this,_0x56e72d,_0x56257a,this);}_0x169cc6[_0x40a1ba(0x31e)]['call'](this,_0x56e72d,_0x56257a,this);const _0xe6cbcf=SceneManager[_0x40a1ba(0x446)];if(_0xe6cbcf&&_0xe6cbcf[_0x40a1ba(0x1d1)])_0xe6cbcf['_spriteset'][_0x40a1ba(0x4e4)](this);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x40b)]=function(){return!!this['_eventSpawnData'];},VisuMZ[_0x5f1364(0x507)]['Game_Event_refresh']=Game_Event['prototype'][_0x5f1364(0x575)],Game_Event[_0x5f1364(0x5c6)]['refresh']=function(){const _0x43be94=_0x5f1364,_0x252894=this['_pageIndex'];VisuMZ[_0x43be94(0x507)][_0x43be94(0x41f)][_0x43be94(0x160)](this);if(_0x252894!==this['_pageIndex']){if('CDTqA'!==_0x43be94(0x433)){function _0x222124(){const _0x280b4c=_0x43be94;if(_0x2a66b2||this[_0x280b4c(0x3f7)]()){if(_0x2ba3e4>0x0&&_0x509eb5<0x0)return 0x9;if(_0x3326fc<0x0&&_0x3a834d<0x0)return 0x7;if(_0xff3f45>0x0&&_0x3ea900>0x0)return 0x3;if(_0x2c7f85<0x0&&_0x31c6e5>0x0)return 0x1;}}}else this[_0x43be94(0x351)]();}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x58f)]=Game_Event[_0x5f1364(0x5c6)]['clearPageSettings'],Game_Event['prototype'][_0x5f1364(0x2d5)]=function(){const _0x791bfb=_0x5f1364;VisuMZ[_0x791bfb(0x507)][_0x791bfb(0x58f)]['call'](this),this[_0x791bfb(0x163)]();},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x186)]=Game_Event[_0x5f1364(0x5c6)]['setupPageSettings'],Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x4e5)]=function(){const _0x8bef4=_0x5f1364;this[_0x8bef4(0x291)]=!![],VisuMZ[_0x8bef4(0x507)]['Game_Event_setupPageSettings']['call'](this),this[_0x8bef4(0x351)](),this[_0x8bef4(0x291)]=![];},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x351)]=function(){const _0x4b173a=_0x5f1364;if(!this[_0x4b173a(0x179)]())return;this[_0x4b173a(0x163)](),this['setupEventsMoveCoreNotetags'](),this[_0x4b173a(0x300)](),this[_0x4b173a(0x2fa)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x288)]=function(){const _0x3a321e=_0x5f1364,_0x1c27db=this['event']()[_0x3a321e(0x5a9)];if(_0x1c27db==='')return;this['checkEventsMoveCoreStringTags'](_0x1c27db);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x300)]=function(){const _0x24fc25=_0x5f1364;if(!this['page']())return;const _0x2efb4a=this['list']();let _0x4d7286='';for(const _0x96a67e of _0x2efb4a){if([0x6c,0x198][_0x24fc25(0x161)](_0x96a67e['code'])){if(_0x24fc25(0x4b6)===_0x24fc25(0x299)){function _0x58ccdd(){const _0x83813c=_0x24fc25;this[_0x83813c(0x27b)](_0x1ceaa4,!![]);}}else{if(_0x4d7286!=='')_0x4d7286+='\x0a';_0x4d7286+=_0x96a67e[_0x24fc25(0x297)][0x0];}}}this['checkEventsMoveCoreStringTags'](_0x4d7286);},Game_Event[_0x5f1364(0x5c6)]['initEventsMoveCoreEffects']=function(){const _0x54f553=_0x5f1364,_0x8e4806=VisuMZ['EventsMoveCore'][_0x54f553(0x18d)];this[_0x54f553(0x2a5)]={'type':_0x54f553(0x4ef),'distance':0x0,'regionList':[]},this[_0x54f553(0x4d5)]=![],this[_0x54f553(0x354)]=![],this[_0x54f553(0x4fa)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this[_0x54f553(0x146)]=$gameSystem[_0x54f553(0x344)](this),this[_0x54f553(0x29e)]={'text':'','visibleRange':_0x8e4806['Label'][_0x54f553(0x58a)],'offsetX':_0x8e4806[_0x54f553(0x1ed)][_0x54f553(0x24f)],'offsetY':_0x8e4806[_0x54f553(0x1ed)]['OffsetY']},this[_0x54f553(0x1dc)]=[],this[_0x54f553(0x23f)]={'target':-0x1,'type':_0x54f553(0x319),'delay':0x1},this[_0x54f553(0x2ad)]=_0x8e4806[_0x54f553(0x25b)][_0x54f553(0x41c)]??0x0,this[_0x54f553(0x19a)]=![],this[_0x54f553(0x59e)]={'visible':!![],'filename':_0x8e4806[_0x54f553(0x25b)][_0x54f553(0x1c5)]},this['clearSpriteOffsets'](),this[_0x54f553(0x3cb)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x23d)]=function(_0x269647){const _0x552b31=_0x5f1364;if(_0x269647['match'](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x552b31(0x31f)!=='IHypD')this[_0x552b31(0x2a5)][_0x552b31(0x18c)]=JSON[_0x552b31(0x421)]('['+RegExp['$1'][_0x552b31(0x59d)](/\d+/g)+']'),this[_0x552b31(0x2a5)][_0x552b31(0x21f)]='region';else{function _0x5c3213(){const _0x3bd4f8=_0x552b31;_0x27d51c['ConvertParams'](_0x51c924,_0x4b269c),_0x5e35b6[_0x3bd4f8(0x272)](_0x50027c[_0x3bd4f8(0x50e)]);}}}else{if(_0x269647[_0x552b31(0x59d)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)){if(_0x552b31(0x52a)==='GZpOM'){function _0x48c5b3(){const _0x2490de=_0x552b31;_0x1bb521=this[_0x2490de(0x3c7)]-_0x539383,this[_0x2490de(0x4bf)](_0x54eaa5[_0x2490de(0x4f2)](0x0,0xff));if(this[_0x2490de(0x3c7)]>0x0)this[_0x2490de(0x525)]--;}}else type=String(RegExp['$1'])[_0x552b31(0x51e)]()[_0x552b31(0x2da)](),this['_activationProximity']['type']=type,this['_activationProximity'][_0x552b31(0x4b5)]=Number(RegExp['$2']);}}_0x269647[_0x552b31(0x59d)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x552b31(0x4d5)]=!![]);_0x269647[_0x552b31(0x59d)](/<CLICK TRIGGER>/i)&&(this[_0x552b31(0x354)]=!![]);const _0x3480cc=_0x269647[_0x552b31(0x59d)](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x3480cc){if(_0x552b31(0x301)===_0x552b31(0x301))for(const _0x403be0 of _0x3480cc){if('iZXHp'==='OzSnC'){function _0x2f7c13(){return![];}}else{if(_0x403be0[_0x552b31(0x59d)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){if('nCrXF'==='nCrXF'){const _0xfe666e=String(RegExp['$1'])[_0x552b31(0x51e)]()[_0x552b31(0x2da)](),_0x572a24=Number(RegExp['$2']);this[_0x552b31(0x4fa)][_0xfe666e]=_0x572a24;}else{function _0x36459f(){const _0x38b521=_0x552b31;this[_0x38b521(0x396)]=!![];}}}}}else{function _0x1f3189(){const _0x444675=_0x552b31;return this[_0x444675(0x37b)]===_0x444675(0x20e)?this['vehicle']()['isAirshipPassable'](_0x39e8df,_0x5e22bd,_0x2f7865):_0x28e116['EventsMoveCore'][_0x444675(0x2ab)][_0x444675(0x160)](this,_0x296c45,_0x4eed31,_0x18cd87);}}}if(_0x269647['match'](/<ICON:[ ](\d+)>/i)){if(_0x552b31(0x2e2)===_0x552b31(0x46d)){function _0x572882(){const _0x55a7ba=_0x552b31,_0x35d8bb=_0x4b65bd[_0x55a7ba(0x317)](_0x315ea3,_0x1b62ff);for(const _0xafdd7b of _0x35d8bb){if(_0xafdd7b&&_0xafdd7b[_0x55a7ba(0x45d)]())return _0xafdd7b[_0x55a7ba(0x30e)](),!![];}return![];}}else this[_0x552b31(0x146)]['iconIndex']=Number(RegExp['$1']);}_0x269647[_0x552b31(0x59d)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x552b31(0x146)]['bufferX']=Number(RegExp['$1']));if(_0x269647[_0x552b31(0x59d)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x552b31(0x2bc)===_0x552b31(0x38d)){function _0x59edf2(){const _0x28cf53=_0x552b31;this['removeTemporaryMapSpawnedEvents'](_0x5c879c),this['clearEventCache'](),_0x1ad818['EventsMoveCore']['Game_Map_setup'][_0x28cf53(0x160)](this,_0x5d92a3),this['clearEventCache'](),this[_0x28cf53(0x2a6)](),this['setupRegionRestrictions'](),this['setupSaveEventLocations'](),this[_0x28cf53(0x393)](),this[_0x28cf53(0x423)]();}}else this[_0x552b31(0x146)][_0x552b31(0x3bc)]=Number(RegExp['$1']);}_0x269647[_0x552b31(0x59d)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x552b31(0x146)][_0x552b31(0x3cd)]=Number(RegExp['$1']),this[_0x552b31(0x146)][_0x552b31(0x3bc)]=Number(RegExp['$2']));if(_0x269647[_0x552b31(0x59d)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x554998=String(RegExp['$1'])[_0x552b31(0x199)]()['trim'](),_0x279f43=[_0x552b31(0x336),'ADDITIVE','MULTIPLY',_0x552b31(0x2f6)];this['_eventIcon'][_0x552b31(0x3fb)]=_0x279f43[_0x552b31(0x275)](_0x554998)[_0x552b31(0x4f2)](0x0,0x3);}_0x269647[_0x552b31(0x59d)](/<LABEL:[ ](.*?)>/i)&&(this[_0x552b31(0x29e)]['text']=String(RegExp['$1'])[_0x552b31(0x2da)]());_0x269647[_0x552b31(0x59d)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this[_0x552b31(0x29e)][_0x552b31(0x4b9)]=String(RegExp['$1'])[_0x552b31(0x2da)]());_0x269647[_0x552b31(0x59d)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x552b31(0x29e)]['offsetX']=Number(RegExp['$1']));if(_0x269647[_0x552b31(0x59d)](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if('Wzqwg'!==_0x552b31(0x21b))this[_0x552b31(0x29e)][_0x552b31(0x5b8)]=Number(RegExp['$1']);else{function _0x2f5f9a(){const _0x16d144=_0x552b31;_0x5958ef['ConvertParams'](_0x3058ca,_0x2b809a),_0xf6b6e6[_0x16d144(0x2b3)](0x0),_0xa13668[_0x16d144(0x586)](![]);for(const _0x127c0c of _0x3b7367[_0x16d144(0x2b6)]()[_0x16d144(0x2fc)]){if(_0x127c0c)_0x127c0c[_0x16d144(0x154)](![]);}}}}_0x269647[_0x552b31(0x59d)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x552b31(0x29e)][_0x552b31(0x2a1)]=Number(RegExp['$1']),this[_0x552b31(0x29e)][_0x552b31(0x5b8)]=Number(RegExp['$2']));$gameTemp[_0x552b31(0x148)](this);for(;;){if(this['_labelWindow'][_0x552b31(0x4b9)][_0x552b31(0x59d)](/\\V\[(\d+)\]/gi)){if(_0x552b31(0x1ce)!==_0x552b31(0x155))this['_labelWindow'][_0x552b31(0x4b9)]=this['_labelWindow'][_0x552b31(0x4b9)][_0x552b31(0x26e)](/\\V\[(\d+)\]/gi,(_0x4d0a89,_0x569f4d)=>$gameVariables[_0x552b31(0x1b6)](parseInt(_0x569f4d)));else{function _0x548e3c(){const _0x2ff000=_0x552b31;_0x4e2e5f=_0x229d23[_0x2ff000(0x26e)](_0x3c6941,(_0x486f1a,_0xf2b30)=>_0x4c3520['value'](_0x64aa5(_0xf2b30)));}}}else break;}$gameTemp[_0x552b31(0x254)]();if(_0x269647[_0x552b31(0x59d)](/<LABEL RANGE:[ ](\d+)>/i)){if(_0x552b31(0x43f)===_0x552b31(0x43f))this[_0x552b31(0x29e)][_0x552b31(0x2d6)]=Number(RegExp['$1']);else{function _0x59e312(){const _0x27c554=_0x552b31;return _0x577f8d[_0x27c554(0x507)][_0x27c554(0x48c)]['call'](this)-this[_0x27c554(0x429)];}}}if(_0x269647[_0x552b31(0x59d)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x556820=JSON['parse']('['+RegExp['$1'][_0x552b31(0x59d)](/\d+/g)+']');this[_0x552b31(0x1dc)]=this[_0x552b31(0x1dc)][_0x552b31(0x37d)](_0x556820),this[_0x552b31(0x1dc)][_0x552b31(0x5c8)](0x0);}if(_0x269647[_0x552b31(0x59d)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x49235d=String(RegExp['$1']);if(_0x49235d[_0x552b31(0x59d)](/PLAYER/i))this[_0x552b31(0x23f)][_0x552b31(0x47a)]=0x0;else _0x49235d[_0x552b31(0x59d)](/EVENT[ ](\d+)/i)&&(this[_0x552b31(0x23f)][_0x552b31(0x47a)]=Number(RegExp['$1']));}if(_0x269647[_0x552b31(0x59d)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if(_0x552b31(0x4e2)===_0x552b31(0x535)){function _0x53890e(){const _0x3ac59a=_0x552b31;return this[_0x3ac59a(0x529)](_0x170fec);}}else this[_0x552b31(0x23f)][_0x552b31(0x21f)]=String(RegExp['$1'])[_0x552b31(0x51e)]()[_0x552b31(0x2da)]();}_0x269647[_0x552b31(0x59d)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x552b31(0x23f)][_0x552b31(0x1fd)]=Number(RegExp['$1']));if(_0x269647['match'](/<TRUE RANDOM MOVE>/i)){if(_0x552b31(0x361)==='ZjjaH')this['_randomMoveWeight']=0x0;else{function _0x1a243c(){_0x5b4fa5['push'](_0x34035a),_0x19d45c['push'](_0x401732);}}}else _0x269647[_0x552b31(0x59d)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this['_randomMoveWeight']=Number(RegExp['$1'])||0x0);_0x269647[_0x552b31(0x59d)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocation']=!![]);if(_0x269647[_0x552b31(0x59d)](/<HIDE SHADOW>/i)){if(_0x552b31(0x36d)!==_0x552b31(0x36d)){function _0x1ceaeb(){const _0x5e2ef2=_0x552b31;_0x1d8592[_0x5e2ef2(0x314)](this);}}else this[_0x552b31(0x59e)][_0x552b31(0x485)]=![];}if(_0x269647[_0x552b31(0x59d)](/<SHADOW FILENAME:[ ](.*?)>/i)){if('jwlXN'!=='jwlXN'){function _0x33ccd3(){const _0x269ec1=_0x552b31;_0xd74fee=_0x218533[_0x269ec1(0x499)](_0x18d8d0),_0x50eff0[_0x269ec1(0x507)][_0x269ec1(0x4ec)]['call'](this,_0x2554b8);}}else this['_shadowGraphic'][_0x552b31(0x38a)]=String(RegExp['$1']);}if(_0x269647[_0x552b31(0x59d)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)){if('tpBOP'!=='hlfSV')this[_0x552b31(0x2db)]=Number(RegExp['$1']);else{function _0x2c51ab(){const _0x496a3b=_0x552b31;if(this['_followerChaseOff']===_0x6e2eff)this[_0x496a3b(0x521)]();return this['_followerChaseOff'];}}}if(_0x269647[_0x552b31(0x59d)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x552b31(0x3c2)==='FtFTM'){function _0x2b9501(){const _0x222671=_0x552b31;this[_0x222671(0x2fd)]=this['_frames']||0x0,this[_0x222671(0x2fd)]=_0x21ef3a,this[_0x222671(0x28d)]=!![],this['_frames']=_0x2be25d['max'](0x1,this[_0x222671(0x2fd)]);}}else this[_0x552b31(0x41a)]=Number(RegExp['$1']);}if(_0x269647[_0x552b31(0x59d)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if('diqGi'!==_0x552b31(0x1a0))this[_0x552b31(0x2db)]=Number(RegExp['$1']),this['_spriteOffsetY']=Number(RegExp['$2']);else{function _0x4a0e99(){const _0x1f444a=_0x552b31;if(this['_EventsMoveCoreSettings']===_0x55a3c4)this[_0x1f444a(0x45f)]();if(this[_0x1f444a(0x467)][_0x1f444a(0x24c)]===_0x33a974)this[_0x1f444a(0x45f)]();return this['_EventsMoveCoreSettings'][_0x1f444a(0x24c)];}}}_0x269647[_0x552b31(0x59d)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x552b31(0x2ac)]=String(RegExp['$1'])[_0x552b31(0x199)]()[_0x552b31(0x2da)]());},Game_Event[_0x5f1364(0x5c6)]['updateEventsMoveCoreTagChanges']=function(){const _0x1c11c5=_0x5f1364;this[_0x1c11c5(0x20f)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x2bf)]=function(){const _0xf5e7af=_0x5f1364;if(this['_alwaysUpdateMove'])return!![];return Game_Character[_0xf5e7af(0x5c6)][_0xf5e7af(0x2bf)][_0xf5e7af(0x160)](this);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x28c)]=Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x1bc)],Game_Event['prototype'][_0x5f1364(0x1bc)]=function(){const _0x1506b5=_0x5f1364;if(this[_0x1506b5(0x143)]())return;VisuMZ[_0x1506b5(0x507)][_0x1506b5(0x28c)][_0x1506b5(0x160)](this),this[_0x1506b5(0x260)]()&&VisuMZ[_0x1506b5(0x1e1)](this[_0x1506b5(0x133)]);},Game_Event[_0x5f1364(0x5c6)]['isPreventSelfMovement']=function(){const _0x4dea4f=_0x5f1364,_0x510c22=VisuMZ['EventsMoveCore'][_0x4dea4f(0x18d)][_0x4dea4f(0x25b)];if($gameMap[_0x4dea4f(0x1fa)]()&&_0x510c22[_0x4dea4f(0x1fc)])return!![];if($gameMessage[_0x4dea4f(0x489)]()&&_0x510c22[_0x4dea4f(0x4f9)])return!![];if(!$gameSystem[_0x4dea4f(0x204)]())return!![];if(this[_0x4dea4f(0x576)]()>=0x0)return!![];return![];},Game_Event['prototype']['updateShadowChanges']=function(){const _0x229daf=_0x5f1364,_0x24e7c7=SceneManager['_scene'][_0x229daf(0x1d1)];if(_0x24e7c7){const _0x16d74b=_0x24e7c7[_0x229daf(0x27f)](this);if(_0x16d74b&&_0x16d74b[_0x229daf(0x311)]&&_0x16d74b[_0x229daf(0x311)][_0x229daf(0x17d)]!==this[_0x229daf(0x1fb)]()){if('xqFIr'===_0x229daf(0x219)){function _0x2a0ca6(){const _0x5d47e5=_0x229daf;_0x5eea26[_0x5d47e5(0x13f)](_0x56bec5,!!_0x299ca4);}}else _0x16d74b[_0x229daf(0x311)]['_filename']=this[_0x229daf(0x1fb)](),_0x16d74b[_0x229daf(0x311)][_0x229daf(0x4cc)]=ImageManager[_0x229daf(0x46e)](_0x16d74b[_0x229daf(0x311)][_0x229daf(0x17d)]);}}},Game_Event['prototype']['shadowFilename']=function(){const _0x158a6b=_0x5f1364;return this[_0x158a6b(0x59e)][_0x158a6b(0x38a)];},Game_Event['prototype']['isShadowVisible']=function(){const _0x510220=_0x5f1364;if(!this['_shadowGraphic']['visible'])return![];return Game_CharacterBase[_0x510220(0x5c6)][_0x510220(0x4d6)]['call'](this);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x347)]=function(){const _0x463bca=_0x5f1364;return this[_0x463bca(0x29e)][_0x463bca(0x4b9)];},Game_Event['prototype'][_0x5f1364(0x475)]=function(){const _0x25ff30=_0x5f1364;return this[_0x25ff30(0x29e)][_0x25ff30(0x2d6)];},Game_Event['prototype'][_0x5f1364(0x173)]=function(_0xa6f7b5,_0xc1944e,_0x274c15){const _0x28c435=_0x5f1364;if(this['hasMoveOnlyRegions']())return this[_0x28c435(0x4dd)](_0xa6f7b5,_0xc1944e,_0x274c15);if($gameMap['isRegionAllowPass'](_0xa6f7b5,_0xc1944e,_0x274c15,_0x28c435(0x179)))return!![];if($gameMap[_0x28c435(0x410)](_0xa6f7b5,_0xc1944e,_0x274c15,_0x28c435(0x179)))return![];return Game_Character[_0x28c435(0x5c6)][_0x28c435(0x173)][_0x28c435(0x160)](this,_0xa6f7b5,_0xc1944e,_0x274c15);},Game_Event['prototype']['hasMoveOnlyRegions']=function(){const _0x96a933=_0x5f1364;if(this['_moveOnlyRegions']===undefined)this[_0x96a933(0x163)]();return this[_0x96a933(0x1dc)][_0x96a933(0x509)]>0x0;},Game_Event[_0x5f1364(0x5c6)]['isMoveOnlyRegionPassable']=function(_0x43f0a5,_0x357760,_0x32d6e0){const _0x3e04b0=_0x5f1364,_0x426b1a=$gameMap[_0x3e04b0(0x4e3)](_0x43f0a5,_0x32d6e0),_0x24a9d8=$gameMap[_0x3e04b0(0x27e)](_0x357760,_0x32d6e0),_0x16933c=$gameMap[_0x3e04b0(0x340)](_0x426b1a,_0x24a9d8);return this[_0x3e04b0(0x1dc)][_0x3e04b0(0x161)](_0x16933c);},VisuMZ['EventsMoveCore'][_0x5f1364(0x33a)]=Game_Event['prototype'][_0x5f1364(0x4d8)],Game_Event['prototype']['findProperPageIndex']=function(){const _0x269692=_0x5f1364;return this[_0x269692(0x396)]=![],this['_CPCs']=![],this['event']()?VisuMZ[_0x269692(0x507)]['Game_Event_findProperPageIndex']['call'](this):-0x1;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x58c)]=Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x488)],Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x488)]=function(_0x518bd2){const _0x4ea7ba=_0x5f1364;this[_0x4ea7ba(0x318)](_0x518bd2),$gameTemp[_0x4ea7ba(0x148)](this);const _0x6ea017=VisuMZ['EventsMoveCore'][_0x4ea7ba(0x58c)][_0x4ea7ba(0x160)](this,_0x518bd2);return $gameTemp[_0x4ea7ba(0x254)](),_0x6ea017;},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x47e)]=function(){const _0x5d3996=_0x5f1364;return this[_0x5d3996(0x396)];},Game_Event['prototype'][_0x5f1364(0x318)]=function(_0x12c5f3){const _0x5bcdfd=_0x5f1364,_0x4b20b4=_0x12c5f3[_0x5bcdfd(0x4fe)];if(_0x4b20b4['switch1Valid']&&DataManager[_0x5bcdfd(0x541)](_0x4b20b4[_0x5bcdfd(0x398)])){if(_0x5bcdfd(0x565)!==_0x5bcdfd(0x48f))this[_0x5bcdfd(0x396)]=!![];else{function _0x4b24b6(){const _0x4f009d=_0x5bcdfd;_0x16e807['EventsMoveCore'][_0x4f009d(0x283)][_0x4f009d(0x160)](this),this['initEventsMoveCore'](),this[_0x4f009d(0x521)]();}}}else{if(_0x4b20b4['switch2Valid']&&DataManager[_0x5bcdfd(0x541)](_0x4b20b4[_0x5bcdfd(0x1d5)]))this[_0x5bcdfd(0x396)]=!![];else{if(_0x4b20b4['variableValid']&&DataManager[_0x5bcdfd(0x29d)](_0x4b20b4['variableId'])){if(_0x5bcdfd(0x39f)!=='mLVCv'){function _0x2d9e3e(){const _0x3079b9=_0x5bcdfd;_0x4f5f3e[_0x3079b9(0x263)](_0x275c1)?this[_0x3079b9(0x56e)](_0x552b83,_0x5f2076):_0x59ec5e[_0x3079b9(0x507)]['Game_Variables_setValue'][_0x3079b9(0x160)](this,_0x19d1f6,_0x4d5b21);}}else this[_0x5bcdfd(0x396)]=!![];}}}},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x45d)]=function(){const _0x17d829=_0x5f1364;if(this[_0x17d829(0x38c)])return![];return this['_clickTrigger'];},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x30e)]=function(){const _0x3c6afd=_0x5f1364;$gameTemp['clearDestination'](),this[_0x3c6afd(0x457)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x573)]=function(_0x400433,_0x9240a8){const _0xfc23ec=_0x5f1364;if(this['_addedHitbox']){if(_0xfc23ec(0x139)===_0xfc23ec(0x193)){function _0x140f5a(){const _0x1dae9a=_0xfc23ec,_0xecc821=_0x182867[_0x1dae9a(0x507)][_0x1dae9a(0x42f)][_0x1dae9a(0x160)](this),_0x378e55=_0x256794['EventsMoveCore'][_0x1dae9a(0x474)]['_commonEvents'][_0x1dae9a(0x309)](_0x525d6d=>_0x3a96b7[_0x525d6d]);return _0xecc821[_0x1dae9a(0x37d)](_0x378e55)[_0x1dae9a(0x16d)]((_0x11ade5,_0x446dda,_0x3fccd1)=>_0x3fccd1[_0x1dae9a(0x275)](_0x11ade5)===_0x446dda);}}else return this['posEventsMoveCore'](_0x400433,_0x9240a8);}else return Game_Character['prototype'][_0xfc23ec(0x573)]['call'](this,_0x400433,_0x9240a8);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x253)]=function(_0x26b0ef,_0x3b4ad5){const _0x2a474b=_0x5f1364;var _0x32d063=this['x']-this[_0x2a474b(0x4fa)][_0x2a474b(0x29f)],_0x49c02a=this['x']+this[_0x2a474b(0x4fa)][_0x2a474b(0x1ac)],_0x25b2c1=this['y']-this[_0x2a474b(0x4fa)]['up'],_0x17dd3d=this['y']+this[_0x2a474b(0x4fa)][_0x2a474b(0x331)];return _0x32d063<=_0x26b0ef&&_0x26b0ef<=_0x49c02a&&_0x25b2c1<=_0x3b4ad5&&_0x3b4ad5<=_0x17dd3d;},Game_Event['prototype'][_0x5f1364(0x1f9)]=function(_0x5ae62d,_0x494ceb,_0x206dc4){const _0x31d051=_0x5f1364;for(let _0x3ffcc6=-this[_0x31d051(0x4fa)][_0x31d051(0x29f)];_0x3ffcc6<=this[_0x31d051(0x4fa)][_0x31d051(0x1ac)];_0x3ffcc6++){for(let _0x58c660=-this[_0x31d051(0x4fa)]['up'];_0x58c660<=this[_0x31d051(0x4fa)][_0x31d051(0x331)];_0x58c660++){if(_0x31d051(0x2d1)===_0x31d051(0x22b)){function _0x5f5c20(){const _0x4d230c=_0x31d051;if(this[_0x4d230c(0x467)]===_0x47b3ff)this[_0x4d230c(0x45f)]();if(this[_0x4d230c(0x467)]['DashingEnable']===_0x14437d)this[_0x4d230c(0x45f)]();return this[_0x4d230c(0x467)][_0x4d230c(0x1d6)];}}else{if(!Game_Character[_0x31d051(0x5c6)][_0x31d051(0x1f9)][_0x31d051(0x160)](this,_0x5ae62d+_0x3ffcc6,_0x494ceb+_0x58c660,_0x206dc4))return![];}}}return!![];},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x3b8)]=function(_0x19bbd1,_0x10e7a){const _0x587b79=_0x5f1364;if(Imported[_0x587b79(0x24a)]&&this[_0x587b79(0x1c4)]()){if(_0x587b79(0x363)===_0x587b79(0x1f8)){function _0xce8def(){const _0x306348=_0x587b79;this[_0x306348(0x1b1)]=new _0x10998a(),this[_0x306348(0x1b1)][_0x306348(0x4cc)]=_0x171d56['loadSystem'](_0x306348(0x18a)),this[_0x306348(0x1b1)][_0x306348(0x4cc)]['smooth']=![],this['_eventIconSprite'][_0x306348(0x42b)](0x0,0x0,0x0,0x0),this[_0x306348(0x1b1)]['anchor']['x']=0.5,this['_eventIconSprite'][_0x306348(0x579)]['y']=0x1,this['addChild'](this['_eventIconSprite']);}}else return this[_0x587b79(0x1e8)](_0x19bbd1,_0x10e7a);}else{const _0x4d43db=$gameMap[_0x587b79(0x306)](_0x19bbd1,_0x10e7a)[_0x587b79(0x16d)](_0x27c2c2=>_0x27c2c2!==this);return _0x4d43db[_0x587b79(0x509)]>0x0;}},Game_Event[_0x5f1364(0x5c6)]['checkSmartEventCollision']=function(_0xb2218b,_0x4f9e32){const _0x30c67f=_0x5f1364;if(!this[_0x30c67f(0x553)]())return![];else{const _0xb48ba5=$gameMap[_0x30c67f(0x306)](_0xb2218b,_0x4f9e32)['filter'](_0x440ed5=>_0x440ed5!==this&&_0x440ed5[_0x30c67f(0x553)]());return _0xb48ba5[_0x30c67f(0x509)]>0x0;}},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x287)]=function(){const _0x1330b7=_0x5f1364;return this['_activationProximity'][_0x1330b7(0x21f)]||_0x1330b7(0x4ef);},Game_Event['prototype'][_0x5f1364(0x441)]=function(){const _0x386527=_0x5f1364;return this[_0x386527(0x2a5)][_0x386527(0x4b5)]||0x0;},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x2ee)]=function(){const _0xc0892e=_0x5f1364;return this[_0xc0892e(0x2a5)][_0xc0892e(0x18c)]||[];},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x469)]=function(){const _0x1601dd=_0x5f1364;Game_Character[_0x1601dd(0x5c6)][_0x1601dd(0x469)][_0x1601dd(0x160)](this);if([_0x1601dd(0x4ef),_0x1601dd(0x4d2)][_0x1601dd(0x161)](this[_0x1601dd(0x287)]()))return;$gamePlayer[_0x1601dd(0x4bc)]([0x2]);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x520)]=Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x50a)],Game_Event['prototype']['checkEventTriggerAuto']=function(){const _0x1f953a=_0x5f1364;if(this[_0x1f953a(0x2c5)]!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this[_0x1f953a(0x4ed)](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ[_0x1f953a(0x507)][_0x1f953a(0x520)][_0x1f953a(0x160)](this);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x552)]=Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x1bb)],Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x1bb)]=function(){const _0x63d0b3=_0x5f1364;if(!this[_0x63d0b3(0x494)])return;if(!this['checkRegionEventTrigger'](!![]))return;if(!this[_0x63d0b3(0x265)](!![]))return;VisuMZ[_0x63d0b3(0x507)][_0x63d0b3(0x552)][_0x63d0b3(0x160)](this);},Game_Event[_0x5f1364(0x5c6)]['checkRegionEventTrigger']=function(_0x26ff34){const _0x2eda5e=_0x5f1364;if(!_0x26ff34&&$gameMap[_0x2eda5e(0x1fa)]())return![];if(!_0x26ff34&&$gameMap['isAnyEventStarting']())return![];if(this[_0x2eda5e(0x2ee)]()<=0x0)return!![];return $gamePlayer[_0x2eda5e(0x345)](this);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x265)]=function(_0xb00344){const _0x1d443a=_0x5f1364;if(!_0xb00344&&$gameMap[_0x1d443a(0x1fa)]())return![];if(!_0xb00344&&$gameMap['isAnyEventStarting']())return![];if([_0x1d443a(0x4ef),_0x1d443a(0x4d2)]['includes'](this[_0x1d443a(0x287)]()))return!![];return $gamePlayer['meetActivationProximityConditions'](this);},VisuMZ[_0x5f1364(0x1e1)]=function(_0x54a54b){const _0x2e2d67=_0x5f1364;for(const _0x50d689 of $gameMap[_0x2e2d67(0x1c8)]()){if(!_0x50d689)continue;if(_0x50d689['moveSynchTarget']()===_0x54a54b){if(_0x2e2d67(0x1d7)!==_0x2e2d67(0x305))_0x50d689['updateMoveSynch']();else{function _0x2d2ded(){const _0x1031a6=_0x2e2d67;this[_0x1031a6(0x19c)]=_0x3406cd[_0x1031a6(0x199)]()['trim'](),this['_poseDuration']=_0x47bd7c||_0xe2267e;}}}}},VisuMZ[_0x5f1364(0x3df)]=function(_0x366061){const _0x33c267=_0x5f1364;if(_0x366061===0x0)return $gamePlayer;return $gameMap[_0x33c267(0x179)](_0x366061);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x576)]=function(){const _0x5594cc=_0x5f1364;return this[_0x5594cc(0x23f)][_0x5594cc(0x47a)];},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x5a5)]=function(){const _0x41aac0=_0x5f1364;return this[_0x41aac0(0x23f)][_0x41aac0(0x21f)];},Game_Event['prototype'][_0x5f1364(0x1cd)]=function(){const _0x20af33=_0x5f1364;if(this[_0x20af33(0x576)]()>=0x0){if(_0x20af33(0x411)!==_0x20af33(0x533)){const _0xfe5c21=VisuMZ[_0x20af33(0x3df)](this[_0x20af33(0x576)]());if(_0xfe5c21)return _0xfe5c21[_0x20af33(0x1cd)]();}else{function _0x3f4ef0(){const _0x5b46b9=_0x20af33;return this[_0x5b46b9(0x3f7)]()&&!!this[_0x5b46b9(0x19c)];}}}return Game_Character['prototype'][_0x20af33(0x1cd)]['call'](this);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x4a4)]=function(){const _0x38d2b3=_0x5f1364;this[_0x38d2b3(0x23f)][_0x38d2b3(0x4ac)]=this['_moveSynch'][_0x38d2b3(0x4ac)]||0x0,this[_0x38d2b3(0x23f)][_0x38d2b3(0x4ac)]--;if(this[_0x38d2b3(0x23f)][_0x38d2b3(0x4ac)]>0x0)return;this[_0x38d2b3(0x23f)][_0x38d2b3(0x4ac)]=this[_0x38d2b3(0x23f)][_0x38d2b3(0x1fd)],this[_0x38d2b3(0x15c)]();},Game_Event['prototype']['processMoveSynch']=function(){const _0x44c3e9=_0x5f1364;switch(this[_0x44c3e9(0x5a5)]()){case _0x44c3e9(0x319):this[_0x44c3e9(0x431)]();break;case _0x44c3e9(0x19d):this['processMoveSynchApproach']();break;case _0x44c3e9(0x23c):this[_0x44c3e9(0x3c3)]();break;case _0x44c3e9(0x202):this[_0x44c3e9(0x4c7)]();break;case'mimic':case _0x44c3e9(0x5c1):this[_0x44c3e9(0x285)]();break;case'reverse\x20mimic':case _0x44c3e9(0x3e0):this[_0x44c3e9(0x478)]();break;case _0x44c3e9(0x512):case _0x44c3e9(0x227):case _0x44c3e9(0x348):case _0x44c3e9(0x3da):this[_0x44c3e9(0x3f4)]();break;case _0x44c3e9(0x2aa):case _0x44c3e9(0x269):case _0x44c3e9(0x356):case _0x44c3e9(0x4c9):this[_0x44c3e9(0x30c)]();break;default:this[_0x44c3e9(0x431)]();break;}this[_0x44c3e9(0x1d4)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x431)]=function(){const _0x43f12b=_0x5f1364,_0x31abf8=[0x2,0x4,0x6,0x8];$gameMap[_0x43f12b(0x165)]()&&_0x31abf8[_0x43f12b(0x304)](0x1,0x3,0x7,0x9);const _0x51f3c2=[];for(const _0x2beb3d of _0x31abf8){if(_0x43f12b(0x231)===_0x43f12b(0x2f4)){function _0x158bff(){const _0x3569c6=_0x43f12b;return this[_0x3569c6(0x383)]();}}else{if(this['canPass'](this['x'],this['y'],_0x2beb3d))_0x51f3c2[_0x43f12b(0x304)](_0x2beb3d);}}if(_0x51f3c2[_0x43f12b(0x509)]>0x0){const _0x1e2659=_0x51f3c2[Math['randomInt'](_0x51f3c2[_0x43f12b(0x509)])];this[_0x43f12b(0x530)](_0x1e2659);}},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x15f)]=function(){const _0x236a1b=_0x5f1364,_0x5972d4=VisuMZ[_0x236a1b(0x3df)](this[_0x236a1b(0x576)]());this['moveTowardCharacter'](_0x5972d4);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x3c3)]=function(){const _0x40ea33=_0x5f1364,_0x1ccc15=VisuMZ[_0x40ea33(0x3df)](this[_0x40ea33(0x576)]());this[_0x40ea33(0x529)](_0x1ccc15);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x4c7)]=function(){const _0x4bbee2=_0x5f1364;this[_0x4bbee2(0x151)]();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x285)]=function(){const _0x4c646=_0x5f1364,_0x1bb65a=VisuMZ[_0x4c646(0x3df)](this[_0x4c646(0x576)]());this['executeMoveDir8'](_0x1bb65a[_0x4c646(0x4cb)]());},Game_Event[_0x5f1364(0x5c6)]['processMoveSynchReverseMimic']=function(){const _0x5645b7=_0x5f1364,_0x187d99=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']()),_0x1d5f68=this['reverseDir'](_0x187d99['lastMovedDirection']());this[_0x5645b7(0x530)](this[_0x5645b7(0x43b)](_0x187d99['direction']()));},Game_Event['prototype'][_0x5f1364(0x3f4)]=function(){const _0x18d7ae=_0x5f1364,_0x156526=VisuMZ[_0x18d7ae(0x3df)](this[_0x18d7ae(0x576)]()),_0x267009=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x156526[_0x18d7ae(0x4cb)]()];this[_0x18d7ae(0x530)](_0x267009);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x30c)]=function(){const _0x552658=_0x5f1364,_0x46f828=VisuMZ[_0x552658(0x3df)](this[_0x552658(0x576)]()),_0x412f91=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x46f828[_0x552658(0x4cb)]()];this[_0x552658(0x530)](_0x412f91);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x3d2)]=function(){const _0x6fabb7=_0x5f1364,_0x2fd9bb=$gameSystem[_0x6fabb7(0x394)](this);if(!_0x2fd9bb)return;this['locate'](_0x2fd9bb['x'],_0x2fd9bb['y']),this[_0x6fabb7(0x470)](_0x2fd9bb[_0x6fabb7(0x31a)]);if(this[_0x6fabb7(0x2dd)]===_0x2fd9bb['pageIndex']){if(_0x6fabb7(0x5ce)==='brIiA'){function _0x4414f5(){const _0x44020b=_0x6fabb7,_0x3d5624=this['_eventSpawnData'][_0x44020b(0x402)],_0x57d871=this['_eventSpawnData'][_0x44020b(0x5be)];return _0x1e2fda[_0x44020b(0x2ec)][_0x3d5624]['events'][_0x57d871];}}else this[_0x6fabb7(0x525)]=_0x2fd9bb[_0x6fabb7(0x1ff)];}},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x4bd)]=function(){const _0x34b0dc=_0x5f1364;Game_Character[_0x34b0dc(0x5c6)][_0x34b0dc(0x4bd)][_0x34b0dc(0x160)](this),this[_0x34b0dc(0x408)]();},Game_Event['prototype'][_0x5f1364(0x2e4)]=function(){const _0x42a3a4=_0x5f1364;if($gameMap[_0x42a3a4(0x3fc)]())return!![];return this[_0x42a3a4(0x19a)];},Game_Event['prototype'][_0x5f1364(0x408)]=function(){const _0x10747f=_0x5f1364;if(!this[_0x10747f(0x2e4)]())return;this['saveEventLocation']();},Game_Event['prototype'][_0x5f1364(0x390)]=function(){const _0x43d09b=_0x5f1364;$gameSystem[_0x43d09b(0x390)](this);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x197)]=function(){const _0x4e9f5c=_0x5f1364;$gameSystem[_0x4e9f5c(0x314)](this);},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x344)]=function(){const _0x23db15=_0x5f1364;if($gameSystem[_0x23db15(0x344)](this))return Game_Character[_0x23db15(0x5c6)][_0x23db15(0x344)][_0x23db15(0x160)](this);else{if(_0x23db15(0x2a9)!==_0x23db15(0x2a9)){function _0x18a11b(){return!![];}}else return{'iconIndex':0x0,'bufferX':settings[_0x23db15(0x333)][_0x23db15(0x192)],'bufferY':settings[_0x23db15(0x333)][_0x23db15(0x327)],'blendMode':settings['Icon'][_0x23db15(0x1ca)]};}},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x337)]=function(){const _0x386764=_0x5f1364;return this[_0x386764(0x141)];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x2f9)]=Game_Event['prototype'][_0x5f1364(0x488)],Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x488)]=function(_0x170832){const _0x323fd1=_0x5f1364,_0xd0e712=VisuMZ['EventsMoveCore']['Game_Event_meetsConditionsCPC']['call'](this,_0x170832);if(!_0xd0e712)return![];return this[_0x323fd1(0x212)](_0x170832);},Game_Event[_0x5f1364(0x5c6)]['meetsCPC']=function(_0x1c739){const _0x478eae=_0x5f1364;VisuMZ[_0x478eae(0x507)][_0x478eae(0x474)]['loadCPC'](_0x1c739),this['_CPCs']=_0x1c739['CPC'][_0x478eae(0x509)]>0x0;_0x1c739[_0x478eae(0x2f8)]===undefined&&VisuMZ['EventsMoveCore'][_0x478eae(0x474)][_0x478eae(0x214)](_0x1c739);if(_0x1c739[_0x478eae(0x2f8)][_0x478eae(0x509)]>0x0)return $gameMap[_0x478eae(0x179)](this['_eventId'])&&VisuMZ['EventsMoveCore'][_0x478eae(0x474)][_0x478eae(0x42c)](_0x1c739[_0x478eae(0x2f8)],this[_0x478eae(0x133)]);return!![];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x4ea)]=Game_Troop[_0x5f1364(0x5c6)][_0x5f1364(0x488)],Game_Troop[_0x5f1364(0x5c6)][_0x5f1364(0x488)]=function(_0x4850d8){const _0x5b4181=_0x5f1364;var _0x5422e2=VisuMZ['EventsMoveCore']['Game_Troop_meetsConditionsCPC'][_0x5b4181(0x160)](this,_0x4850d8);return _0x5422e2&&this['CPCsMet'](_0x4850d8);},Game_Troop['prototype'][_0x5f1364(0x229)]=function(_0x1bed9f){const _0x2c0d58=_0x5f1364;_0x1bed9f[_0x2c0d58(0x2f8)]===undefined&&VisuMZ[_0x2c0d58(0x507)][_0x2c0d58(0x474)][_0x2c0d58(0x214)](_0x1bed9f);if(_0x1bed9f[_0x2c0d58(0x2f8)][_0x2c0d58(0x509)]>0x0)return VisuMZ[_0x2c0d58(0x507)][_0x2c0d58(0x474)][_0x2c0d58(0x42c)](_0x1bed9f[_0x2c0d58(0x2f8)],0x0);return!![];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x40d)]=Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x57a)],Game_Event['prototype'][_0x5f1364(0x57a)]=function(_0x3a94ec,_0x104923){const _0x4a21df=_0x5f1364;VisuMZ[_0x4a21df(0x507)]['Game_Event_locate']['call'](this,_0x3a94ec,_0x104923),this[_0x4a21df(0x174)]=_0x3a94ec,this[_0x4a21df(0x549)]=_0x104923;},VisuMZ['EventsMoveCore'][_0x5f1364(0x55d)]=Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x391)],Game_Event[_0x5f1364(0x5c6)]['moveTypeRandom']=function(){const _0x51c8d7=_0x5f1364,_0x8253f9=$gameMap[_0x51c8d7(0x4b5)](this['x'],this['y'],this[_0x51c8d7(0x174)],this['_randomHomeY']),_0x53275f=_0x8253f9*(this[_0x51c8d7(0x2ad)]||0x0);Math[_0x51c8d7(0x319)]()>=_0x53275f?VisuMZ['EventsMoveCore'][_0x51c8d7(0x55d)][_0x51c8d7(0x160)](this):this['moveBackToRandomHome']();},Game_Event[_0x5f1364(0x5c6)][_0x5f1364(0x2b9)]=function(){const _0x1bd84e=_0x5f1364,_0x570347=this[_0x1bd84e(0x5a8)](this[_0x1bd84e(0x174)]),_0x236939=this[_0x1bd84e(0x29c)](this[_0x1bd84e(0x549)]);if(Math[_0x1bd84e(0x454)](_0x570347)>Math['abs'](_0x236939)){if('ixLgs'!==_0x1bd84e(0x2eb)){this[_0x1bd84e(0x2c3)](_0x570347>0x0?0x4:0x6);if(!this[_0x1bd84e(0x1ba)]()&&_0x236939!==0x0){if(_0x1bd84e(0x34a)!=='XXBUV'){function _0x363886(){const _0x10d2e5=_0x1bd84e;return _0x8250d7[_0x10d2e5(0x507)][_0x10d2e5(0x18d)][_0x10d2e5(0x1ed)][_0x10d2e5(0x378)];}}else this[_0x1bd84e(0x2c3)](_0x236939>0x0?0x8:0x2);}}else{function _0x8ce065(){const _0x5986ff=_0x1bd84e;if(this[_0x5986ff(0x2ea)]())this['contentsOpacity']+=this[_0x5986ff(0x448)]();else _0x24a0c5[_0x5986ff(0x446)][_0x5986ff(0x3c5)]>0x0?this['contentsOpacity']=0x0:this[_0x5986ff(0x2d7)]-=this['opacitySpeed']();}}}else{if(_0x236939!==0x0){this[_0x1bd84e(0x2c3)](_0x236939>0x0?0x8:0x2);if(!this['isMovementSucceeded']()&&_0x570347!==0x0){if(_0x1bd84e(0x585)!==_0x1bd84e(0x585)){function _0x278d86(){const _0x366bac=_0x1bd84e;return this[_0x366bac(0x1a6)]=![],![];}}else this[_0x1bd84e(0x2c3)](_0x570347>0x0?0x4:0x6);}}}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x22a)]=Game_Interpreter['prototype'][_0x5f1364(0x577)],Game_Interpreter['prototype'][_0x5f1364(0x577)]=function(){const _0x1596a5=_0x5f1364;if(this[_0x1596a5(0x37f)]==='CallEvent'){if(window[this[_0x1596a5(0x569)]])this[_0x1596a5(0x37f)]='',this[_0x1596a5(0x4a7)]();else return!![];}else{if('wTqzJ'!=='XcmHu')return VisuMZ[_0x1596a5(0x507)][_0x1596a5(0x22a)][_0x1596a5(0x160)](this);else{function _0x36c97f(){const _0x4f1008=_0x1596a5;return this[_0x4f1008(0x2a0)](_0x52efb4(_0xed7d9c['$1']),_0x3ba717(_0x30f343['$2']));}}}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x51a)]=Game_Interpreter[_0x5f1364(0x5c6)][_0x5f1364(0x47b)],Game_Interpreter[_0x5f1364(0x5c6)][_0x5f1364(0x47b)]=function(){const _0x3d5c02=_0x5f1364,_0x4c8646=$gameMap&&this[_0x3d5c02(0x133)]?$gameMap[_0x3d5c02(0x179)](this[_0x3d5c02(0x133)]):null;$gameTemp[_0x3d5c02(0x148)](_0x4c8646);const _0x3511a1=VisuMZ[_0x3d5c02(0x507)]['Game_Interpreter_executeCommand'][_0x3d5c02(0x160)](this);return $gameTemp[_0x3d5c02(0x254)](),_0x3511a1;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x484)]=Game_Interpreter[_0x5f1364(0x5c6)][_0x5f1364(0x3fd)],Game_Interpreter[_0x5f1364(0x5c6)][_0x5f1364(0x3fd)]=function(_0x1aa0f8){const _0x5b163d=_0x5f1364;return $gameTemp[_0x5b163d(0x409)](this),VisuMZ['EventsMoveCore'][_0x5b163d(0x484)][_0x5b163d(0x160)](this,_0x1aa0f8);},Game_Interpreter['prototype'][_0x5f1364(0x22c)]=function(_0x260286){const _0x474905=_0x5f1364;this[_0x474905(0x4a2)]=_0x260286;const _0x257001=_0x474905(0x4eb)['format'](_0x260286[_0x474905(0x402)][_0x474905(0x15a)](0x3));this[_0x474905(0x569)]=_0x474905(0x566)+Graphics[_0x474905(0x597)]+'_'+this[_0x474905(0x5be)](),DataManager['loadDataFile'](this['_callEventMap'],_0x257001);if(window[this[_0x474905(0x569)]]){if(_0x474905(0x523)===_0x474905(0x559)){function _0x5c5a07(){const _0xd4963c=_0x474905;return _0x27d501[_0xd4963c(0x36c)](_0x38beab['abs'](this[_0xd4963c(0x453)](_0xb879a3,_0x5f34d5)),_0x4d18d2[_0xd4963c(0x454)](this['deltaY'](_0x1ef7b5,_0x5f4ec1)));}}else this['startCallEvent']();}else this[_0x474905(0x450)](_0x474905(0x4ab));},Game_Interpreter[_0x5f1364(0x5c6)]['startCallEvent']=function(){const _0x30fe77=_0x5f1364,_0xd1f6b5=this[_0x30fe77(0x4a2)],_0x25cc53=window[this[_0x30fe77(0x569)]],_0x5c7fea=_0x25cc53['events'][_0xd1f6b5[_0x30fe77(0x5be)]];if(_0x5c7fea&&_0x5c7fea['pages'][_0xd1f6b5[_0x30fe77(0x1b2)]-0x1]){const _0x57e7e5=_0x5c7fea[_0x30fe77(0x198)][_0xd1f6b5[_0x30fe77(0x1b2)]-0x1]['list'];this[_0x30fe77(0x3f6)](_0x57e7e5,this[_0x30fe77(0x5be)]());}window[this['_callEventMap']]=undefined,this[_0x30fe77(0x569)]=undefined,this['_callEventData']=undefined;};function Game_CPCInterpreter(){const _0x28379b=_0x5f1364;this[_0x28379b(0x223)][_0x28379b(0x3b6)](this,arguments);};function _0x48c3(_0x4d287d,_0x422168){_0x4d287d=_0x4d287d-0x12f;let _0x145435=_0x1454[_0x4d287d];return _0x145435;}Game_CPCInterpreter[_0x5f1364(0x5c6)]=Object[_0x5f1364(0x42a)](Game_Interpreter['prototype']),Game_CPCInterpreter[_0x5f1364(0x5c6)][_0x5f1364(0x1f4)]=Game_CPCInterpreter,Game_CPCInterpreter[_0x5f1364(0x5c6)][_0x5f1364(0x136)]=function(){const _0x18ef20=_0x5f1364;Game_Interpreter[_0x18ef20(0x5c6)]['clear'][_0x18ef20(0x160)](this),this[_0x18ef20(0x537)]=![];},Game_CPCInterpreter[_0x5f1364(0x5c6)][_0x5f1364(0x248)]=function(){const _0x45e682=_0x5f1364;while(this['isRunning']()){if('JxZNn'!==_0x45e682(0x39e))this[_0x45e682(0x47b)]();else{function _0x489c3c(){const _0x2b3de2=_0x45e682,_0x3f4200=[_0x57299f[_0x2b3de2(0x5cb)],_0x45dcd7[_0x2b3de2(0x133)],_0x2b3de2(0x332)[_0x2b3de2(0x35a)](_0x35909f)];_0x50e504[_0x2b3de2(0x13f)](_0x3f4200,_0x38dde1);}}}},Game_CPCInterpreter[_0x5f1364(0x5c6)][_0x5f1364(0x196)]=function(_0x1d6435){const _0xfd00da=_0x5f1364;return Game_Interpreter['prototype'][_0xfd00da(0x196)][_0xfd00da(0x160)](this,_0x1d6435),this['_comments']['some'](_0x3d03a1=>_0x3d03a1[_0xfd00da(0x59d)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0xfd00da(0x537)]=!![]),!![];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x292)]=Scene_Map[_0x5f1364(0x5c6)][_0x5f1364(0x191)],Scene_Map[_0x5f1364(0x5c6)][_0x5f1364(0x191)]=function(){const _0x30c946=_0x5f1364;VisuMZ[_0x30c946(0x507)][_0x30c946(0x292)]['call'](this),this[_0x30c946(0x1d1)][_0x30c946(0x2ed)]();},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x4ce)]=Scene_Load['prototype'][_0x5f1364(0x592)],Scene_Load[_0x5f1364(0x5c6)][_0x5f1364(0x592)]=function(){const _0x383492=_0x5f1364;if($gameMap)$gameMap[_0x383492(0x423)]();VisuMZ['EventsMoveCore'][_0x383492(0x4ce)][_0x383492(0x160)](this);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x282)]=Sprite_Character[_0x5f1364(0x5c6)]['initMembers'],Sprite_Character[_0x5f1364(0x5c6)]['initMembers']=function(){const _0x54e51e=_0x5f1364;VisuMZ[_0x54e51e(0x507)][_0x54e51e(0x282)][_0x54e51e(0x160)](this),this[_0x54e51e(0x5b2)](),this['createIconSprite']();},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x5b2)]=function(){const _0x231556=_0x5f1364;this[_0x231556(0x3ef)]=0xff;},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x414)]=function(){const _0xcd019f=_0x5f1364;this[_0xcd019f(0x1b1)]=new Sprite(),this['_eventIconSprite']['bitmap']=ImageManager[_0xcd019f(0x46e)](_0xcd019f(0x18a)),this[_0xcd019f(0x1b1)][_0xcd019f(0x4cc)][_0xcd019f(0x54e)]=![],this['_eventIconSprite'][_0xcd019f(0x42b)](0x0,0x0,0x0,0x0),this[_0xcd019f(0x1b1)][_0xcd019f(0x579)]['x']=0.5,this[_0xcd019f(0x1b1)][_0xcd019f(0x579)]['y']=0x1,this[_0xcd019f(0x41d)](this[_0xcd019f(0x1b1)]);},Sprite_Character['prototype'][_0x5f1364(0x3f7)]=function(){const _0x524799=_0x5f1364;return this[_0x524799(0x442)]&&this[_0x524799(0x442)][_0x524799(0x59d)](/\[VS8\]/i);},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x236)]=function(){const _0x337810=_0x5f1364;return this[_0x337810(0x3f7)]()&&VisuMZ['EventsMoveCore'][_0x337810(0x18d)]['VS8'][_0x337810(0x55e)];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x25a)]=Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x1d4)],Sprite_Character[_0x5f1364(0x5c6)]['update']=function(){const _0x23393e=_0x5f1364;VisuMZ[_0x23393e(0x507)][_0x23393e(0x25a)][_0x23393e(0x160)](this);if(VisuMZ[_0x23393e(0x507)][_0x23393e(0x18d)][_0x23393e(0x25b)][_0x23393e(0x49c)]){if(_0x23393e(0x2de)==='toaXj'){function _0x64b645(){_0xd1d818=_0x1317de;}}else this[_0x23393e(0x3b0)]();}if(this['_shadowSprite']){if(_0x23393e(0x1b8)===_0x23393e(0x1b8))this[_0x23393e(0x286)]();else{function _0x190581(){const _0x4e1760=_0x23393e;_0x305be1[_0x4e1760(0x148)](this[_0x4e1760(0x432)]);}}}if(this[_0x23393e(0x1b1)]){if('MARHW'==='CvirS'){function _0x23d62d(){const _0x3c31e4=_0x23393e;return _0xeb91d9[_0x3c31e4(0x507)]['Settings']['Movement']['DefaultShadow'];}}else this[_0x23393e(0x1f3)]();}},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x19f)]=Sprite_Character['prototype'][_0x5f1364(0x44b)],Sprite_Character['prototype'][_0x5f1364(0x44b)]=function(){const _0x12bbc0=_0x5f1364;VisuMZ[_0x12bbc0(0x507)][_0x12bbc0(0x19f)][_0x12bbc0(0x160)](this),this[_0x12bbc0(0x4cc)][_0x12bbc0(0x45e)](this[_0x12bbc0(0x443)]['bind'](this));},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x29a)]=Sprite_Character['prototype']['setCharacterBitmap'],Sprite_Character['prototype'][_0x5f1364(0x4aa)]=function(){const _0x2cffe1=_0x5f1364;VisuMZ[_0x2cffe1(0x507)][_0x2cffe1(0x29a)][_0x2cffe1(0x160)](this),this[_0x2cffe1(0x4cc)][_0x2cffe1(0x45e)](this[_0x2cffe1(0x443)]['bind'](this));},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x443)]=function(){const _0xcc4d78=_0x5f1364;if(!this[_0xcc4d78(0x4cc)])return;this[_0xcc4d78(0x4cc)][_0xcc4d78(0x54e)]=!!VisuMZ[_0xcc4d78(0x507)][_0xcc4d78(0x18d)][_0xcc4d78(0x25b)][_0xcc4d78(0x1c2)];},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x145)]=Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x13b)],Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x13b)]=function(){const _0x43df1b=_0x5f1364;return this['isSpriteVS8dir']()?this[_0x43df1b(0x383)]():VisuMZ[_0x43df1b(0x507)][_0x43df1b(0x145)]['call'](this);},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x383)]=function(){const _0x5adb77=_0x5f1364,_0x5eb01f=this[_0x5adb77(0x1ab)][_0x5adb77(0x31a)](),_0x54bd7b=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x54bd7b[_0x5eb01f]-0x2)/0x2;},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x3b0)]=function(){const _0x18d3df=_0x5f1364;this[_0x18d3df(0x571)]=0x0;if(this[_0x18d3df(0x195)]()){const _0x9eba1c=VisuMZ[_0x18d3df(0x507)][_0x18d3df(0x18d)][_0x18d3df(0x25b)],_0x3022d4=this[_0x18d3df(0x1ab)][_0x18d3df(0x31a)]();let _0x8d30c3=0x0;if([0x1,0x4,0x7][_0x18d3df(0x161)](_0x3022d4))_0x8d30c3=_0x9eba1c[_0x18d3df(0x343)];if([0x3,0x6,0x9][_0x18d3df(0x161)](_0x3022d4))_0x8d30c3=_0x9eba1c['TiltRight'];if([0x2,0x8][_0x18d3df(0x161)](_0x3022d4)){if(_0x18d3df(0x1d9)===_0x18d3df(0x1d9))_0x8d30c3=[-_0x9eba1c[_0x18d3df(0x3bd)],0x0,_0x9eba1c[_0x18d3df(0x3bd)]][this[_0x18d3df(0x1ab)][_0x18d3df(0x14a)]()];else{function _0x4f2452(){const _0x5a083f=_0x18d3df;return _0x37845c[_0x5a083f(0x507)][_0x5a083f(0x18d)][_0x5a083f(0x131)]['CarryPose'];}}}if(this[_0x18d3df(0x4f6)])_0x8d30c3*=-0x1;this[_0x18d3df(0x571)]=_0x8d30c3;}},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x195)]=function(){const _0x389d69=_0x5f1364;if(this[_0x389d69(0x5af)])return![];return this[_0x389d69(0x1ab)][_0x389d69(0x516)]()&&!this[_0x389d69(0x1ab)][_0x389d69(0x200)]()&&!this[_0x389d69(0x1ab)]['isPosing']()&&this[_0x389d69(0x2b5)]()===0x0;},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x286)]=function(){const _0x5aabde=_0x5f1364;this[_0x5aabde(0x311)]['x']=this[_0x5aabde(0x1ab)]['shadowX'](),this[_0x5aabde(0x311)]['y']=this[_0x5aabde(0x1ab)][_0x5aabde(0x2d4)](),this[_0x5aabde(0x311)]['opacity']=this[_0x5aabde(0x49d)],this[_0x5aabde(0x311)][_0x5aabde(0x485)]=this[_0x5aabde(0x1ab)][_0x5aabde(0x4d6)](),this[_0x5aabde(0x311)]['_hidden']=this['_hidden'],!this[_0x5aabde(0x1ab)][_0x5aabde(0x159)]()?(this[_0x5aabde(0x311)]['scale']['x']=Math[_0x5aabde(0x392)](0x1,this[_0x5aabde(0x311)]['scale']['x']+0.1),this['_shadowSprite'][_0x5aabde(0x2ef)]['y']=Math[_0x5aabde(0x392)](0x1,this[_0x5aabde(0x311)][_0x5aabde(0x2ef)]['y']+0.1)):(this['_shadowSprite']['scale']['x']=Math[_0x5aabde(0x36c)](0x0,this[_0x5aabde(0x311)][_0x5aabde(0x2ef)]['x']-0.1),this['_shadowSprite'][_0x5aabde(0x2ef)]['y']=Math['max'](0x0,this[_0x5aabde(0x311)][_0x5aabde(0x2ef)]['y']-0.1));},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x1f3)]=function(){const _0x11473d=_0x5f1364,_0x2600a8=this[_0x11473d(0x1b1)],_0x13331a=this['getEventIconIndex']();if(_0x13331a<=0x0)return _0x2600a8['setFrame'](0x0,0x0,0x0,0x0);else{if(_0x11473d(0x556)!==_0x11473d(0x556)){function _0x40a579(){const _0x854d6e=_0x11473d;return this[_0x854d6e(0x253)](_0x170e45,_0x4ab2e3);}}else{const _0x1f7fe9=ImageManager[_0x11473d(0x25f)],_0x12e823=ImageManager[_0x11473d(0x389)],_0x41251c=_0x13331a%0x10*_0x1f7fe9,_0x268e35=Math[_0x11473d(0x32f)](_0x13331a/0x10)*_0x12e823;_0x2600a8[_0x11473d(0x42b)](_0x41251c,_0x268e35,_0x1f7fe9,_0x12e823),this[_0x11473d(0x485)]=!![];}}const _0x23cdb7=this['_character'][_0x11473d(0x344)]();if(this['isAutoBufferIcon']()){if(_0x11473d(0x33c)==='dkOkh'){function _0x1079d2(){const _0x456f85=_0x11473d;this[_0x456f85(0x2d7)]=0x0;}}else this[_0x11473d(0x4c2)](_0x2600a8);}else{if('LPpHH'===_0x11473d(0x1cc))_0x2600a8['x']=_0x23cdb7?_0x23cdb7[_0x11473d(0x3cd)]:0x0,_0x2600a8['y']=_0x23cdb7?-this[_0x11473d(0x5b6)]+_0x23cdb7[_0x11473d(0x3bc)]:0x0;else{function _0x24e4a1(){const _0x3359df=_0x11473d;return this[_0x3359df(0x470)](0x1);}}}_0x2600a8[_0x11473d(0x3fb)]=_0x23cdb7?_0x23cdb7[_0x11473d(0x3fb)]:0x0,this[_0x11473d(0x210)](_0x2600a8),this['addChild'](_0x2600a8),_0x2600a8['rotation']=-this[_0x11473d(0x571)];},Sprite_Character[_0x5f1364(0x5c6)]['autoEventIconBuffer']=function(_0x48aa1b){const _0x325f1e=_0x5f1364;_0x48aa1b['x']=0x0,_0x48aa1b['y']=-this['height']+this[_0x325f1e(0x5b6)]*0x2/0x5;if(this[_0x325f1e(0x1ab)][_0x325f1e(0x14a)]()!==0x1){if(_0x325f1e(0x5b3)!==_0x325f1e(0x3b7))_0x48aa1b['y']+=0x1;else{function _0x3f62d6(){const _0x18ddde=_0x325f1e;_0x478ea2!==this[_0x18ddde(0x402)]()&&_0x3a8106&&_0x327d82[_0x18ddde(0x4e1)](this['mapId']());}}}},Sprite_Character[_0x5f1364(0x5c6)][_0x5f1364(0x2b5)]=function(){const _0x3a886d=_0x5f1364;if(!this[_0x3a886d(0x1ab)])return 0x0;if(this[_0x3a886d(0x1ab)]['_erased'])return 0x0;const _0xa885d9=this[_0x3a886d(0x1ab)][_0x3a886d(0x344)]();return _0xa885d9?_0xa885d9[_0x3a886d(0x4b8)]||0x0:0x0;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x42e)]=Sprite_Balloon[_0x5f1364(0x5c6)][_0x5f1364(0x1aa)],Sprite_Balloon[_0x5f1364(0x5c6)][_0x5f1364(0x1aa)]=function(_0x4dea21,_0x43b562){const _0x1f152d=_0x5f1364;VisuMZ[_0x1f152d(0x507)][_0x1f152d(0x42e)][_0x1f152d(0x160)](this,_0x4dea21,_0x43b562),VisuMZ[_0x1f152d(0x507)][_0x1f152d(0x18d)][_0x1f152d(0x131)][_0x1f152d(0x572)]&&this[_0x1f152d(0x2e1)][_0x1f152d(0x1ab)][_0x1f152d(0x1d2)](_0x43b562,this[_0x1f152d(0x178)]);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x2c7)]=Sprite_Balloon[_0x5f1364(0x5c6)]['updatePosition'],Sprite_Balloon[_0x5f1364(0x5c6)]['updatePosition']=function(){const _0x1b5d9c=_0x5f1364;VisuMZ[_0x1b5d9c(0x507)][_0x1b5d9c(0x2c7)][_0x1b5d9c(0x160)](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x5f1364(0x5c6)][_0x5f1364(0x2a7)]=function(){const _0x4720e6=_0x5f1364;this[_0x4720e6(0x2e1)][_0x4720e6(0x1ab)][_0x4720e6(0x3f7)]()&&(this['x']+=VisuMZ[_0x4720e6(0x507)][_0x4720e6(0x18d)][_0x4720e6(0x131)][_0x4720e6(0x4a8)],this['y']+=VisuMZ[_0x4720e6(0x507)]['Settings']['VS8'][_0x4720e6(0x422)]);},Sprite_Timer[_0x5f1364(0x5c6)][_0x5f1364(0x2f5)]=function(){const _0x277d04=_0x5f1364;this[_0x277d04(0x4cc)]=new Bitmap(Math['round'](Graphics['boxWidth']/0x2),0x30),this['bitmap'][_0x277d04(0x22e)]=this[_0x277d04(0x22e)](),this[_0x277d04(0x4cc)][_0x277d04(0x428)]=this[_0x277d04(0x428)](),this[_0x277d04(0x4cc)][_0x277d04(0x2b1)]=ColorManager[_0x277d04(0x2b1)]();},Sprite_Timer['prototype'][_0x5f1364(0x369)]=function(){const _0x71c304=_0x5f1364,_0x276313=Math[_0x71c304(0x32f)](this[_0x71c304(0x307)]/0x3c/0x3c),_0x2c0528=Math[_0x71c304(0x32f)](this[_0x71c304(0x307)]/0x3c)%0x3c,_0x267e5b=this[_0x71c304(0x307)]%0x3c;let _0x328035=_0x2c0528[_0x71c304(0x15a)](0x2)+':'+_0x267e5b[_0x71c304(0x15a)](0x2);if(_0x276313>0x0)_0x328035=_0x71c304(0x5bb)[_0x71c304(0x35a)](_0x276313,_0x328035);return _0x328035;},VisuMZ['EventsMoveCore'][_0x5f1364(0x25e)]=Spriteset_Map[_0x5f1364(0x5c6)]['createLowerLayer'],Spriteset_Map[_0x5f1364(0x5c6)]['createLowerLayer']=function(){const _0x45b65a=_0x5f1364;VisuMZ[_0x45b65a(0x507)][_0x45b65a(0x25e)][_0x45b65a(0x160)](this),this[_0x45b65a(0x12f)]();},VisuMZ[_0x5f1364(0x507)]['Spriteset_Map_createShadow']=Spriteset_Map[_0x5f1364(0x5c6)][_0x5f1364(0x274)],Spriteset_Map[_0x5f1364(0x5c6)]['createShadow']=function(){const _0x521dd1=_0x5f1364;VisuMZ[_0x521dd1(0x507)][_0x521dd1(0x209)][_0x521dd1(0x160)](this),this['createShadows']();},Spriteset_Map['prototype'][_0x5f1364(0x3ff)]=function(){const _0x8134e3=_0x5f1364;if(!VisuMZ[_0x8134e3(0x507)]['Settings'][_0x8134e3(0x25b)][_0x8134e3(0x50f)])return;for(const _0x1c320a of this[_0x8134e3(0x213)]){if('DykjL'===_0x8134e3(0x3bf)){function _0xd44db4(){const _0x33f2f3=_0x8134e3;this[_0x33f2f3(0x4cc)]=new _0x257f66(_0xf72d3a[_0x33f2f3(0x325)](_0x6dfb63[_0x33f2f3(0x14c)]/0x2),0x30),this[_0x33f2f3(0x4cc)]['fontFace']=this[_0x33f2f3(0x22e)](),this[_0x33f2f3(0x4cc)][_0x33f2f3(0x428)]=this['fontSize'](),this[_0x33f2f3(0x4cc)]['outlineColor']=_0x1c60b1[_0x33f2f3(0x2b1)]();}}else this[_0x8134e3(0x5b7)](_0x1c320a);}},Spriteset_Map[_0x5f1364(0x5c6)][_0x5f1364(0x5b7)]=function(_0x2fc3cb){const _0x1e1dbb=_0x5f1364;_0x2fc3cb['_shadowSprite']=new Sprite(),_0x2fc3cb[_0x1e1dbb(0x311)][_0x1e1dbb(0x17d)]=_0x2fc3cb[_0x1e1dbb(0x1ab)][_0x1e1dbb(0x1fb)](),_0x2fc3cb['_shadowSprite'][_0x1e1dbb(0x4cc)]=ImageManager[_0x1e1dbb(0x46e)](_0x2fc3cb[_0x1e1dbb(0x311)][_0x1e1dbb(0x17d)]),_0x2fc3cb['_shadowSprite'][_0x1e1dbb(0x579)]['x']=0.5,_0x2fc3cb[_0x1e1dbb(0x311)][_0x1e1dbb(0x579)]['y']=0x1,_0x2fc3cb[_0x1e1dbb(0x311)]['z']=0x0,this[_0x1e1dbb(0x3ab)][_0x1e1dbb(0x41d)](_0x2fc3cb[_0x1e1dbb(0x311)]);},Spriteset_Map['prototype'][_0x5f1364(0x2ed)]=function(){const _0x458b4e=_0x5f1364;if(!VisuMZ[_0x458b4e(0x507)]['Settings'][_0x458b4e(0x25b)]['ShowShadows'])return;for(const _0x54f274 of this['_characterSprites']){this['_tilemap'][_0x458b4e(0x210)](_0x54f274[_0x458b4e(0x311)]);}},Spriteset_Map[_0x5f1364(0x5c6)][_0x5f1364(0x12f)]=function(){const _0x3556b9=_0x5f1364;this[_0x3556b9(0x47f)]=[];for(const _0x252268 of $gameMap[_0x3556b9(0x1c8)]()){this[_0x3556b9(0x542)](_0x252268);}},Spriteset_Map['prototype'][_0x5f1364(0x542)]=function(_0x389e47){const _0x46f53c=_0x5f1364;if(!this[_0x46f53c(0x2c6)](_0x389e47))return;const _0x2a2431=new Window_EventLabel(_0x389e47);_0x2a2431['z']=0x8,_0x2a2431[_0x46f53c(0x4e6)]=Sprite[_0x46f53c(0x449)]++,this[_0x46f53c(0x3ab)][_0x46f53c(0x41d)](_0x2a2431),this[_0x46f53c(0x47f)][_0x46f53c(0x304)](_0x2a2431);},Spriteset_Map[_0x5f1364(0x5c6)][_0x5f1364(0x2c6)]=function(_0x21fd63){const _0xc9a8d4=_0x5f1364,_0x5a3740=_0x21fd63[_0xc9a8d4(0x179)]();if(_0x5a3740[_0xc9a8d4(0x5a9)][_0xc9a8d4(0x59d)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x5a3740[_0xc9a8d4(0x5a9)]['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x346022 of _0x5a3740[_0xc9a8d4(0x198)]){let _0x18d4db='';for(const _0x581476 of _0x346022[_0xc9a8d4(0x2e7)]){[0x6c,0x198][_0xc9a8d4(0x161)](_0x581476[_0xc9a8d4(0x4c3)])&&(_0x18d4db+=_0x581476[_0xc9a8d4(0x297)][0x0]);}if(_0x18d4db[_0xc9a8d4(0x59d)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x18d4db[_0xc9a8d4(0x59d)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0xc9a8d4(0x36b)===_0xc9a8d4(0x36b))return!![];else{function _0x476c04(){const _0x111dcb=_0xc9a8d4,_0x590eb3=[_0x4a43f9[_0x111dcb(0x5cb)],_0x12f1cd[_0x111dcb(0x133)],'Self\x20Variable\x20%1'[_0x111dcb(0x35a)](_0x453938)];return _0x53bf3b[_0x111dcb(0x1b6)](_0x590eb3);}}}}return![];},Spriteset_Map[_0x5f1364(0x5c6)]['createSpawnedEvent']=function(_0x1ad338){const _0x2e0155=_0x5f1364;this[_0x2e0155(0x213)]=this[_0x2e0155(0x213)]||[];const _0xd5f809=new Sprite_Character(_0x1ad338);this['_characterSprites'][_0x2e0155(0x304)](_0xd5f809),this[_0x2e0155(0x3ab)][_0x2e0155(0x41d)](_0xd5f809),this[_0x2e0155(0x5b7)](_0xd5f809),this[_0x2e0155(0x542)](_0x1ad338),_0xd5f809[_0x2e0155(0x1d4)]();},VisuMZ['EventsMoveCore'][_0x5f1364(0x268)]=Game_Message[_0x5f1364(0x5c6)][_0x5f1364(0x591)],Game_Message[_0x5f1364(0x5c6)][_0x5f1364(0x591)]=function(_0x3021a2,_0xd0b303){const _0x30c2bc=_0x5f1364;this[_0x30c2bc(0x4e7)]=$gameTemp[_0x30c2bc(0x16a)](),VisuMZ[_0x30c2bc(0x507)]['Game_Message_setNumberInput'][_0x30c2bc(0x160)](this,_0x3021a2,_0xd0b303);},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x350)]=Window_NumberInput[_0x5f1364(0x5c6)]['start'],Window_NumberInput['prototype'][_0x5f1364(0x457)]=function(){const _0x1d04a8=_0x5f1364;$gameTemp[_0x1d04a8(0x148)]($gameMessage[_0x1d04a8(0x4e7)]),VisuMZ[_0x1d04a8(0x507)]['Window_NumberInput_start']['call'](this),$gameTemp[_0x1d04a8(0x254)]();},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x252)]=Window_NumberInput[_0x5f1364(0x5c6)][_0x5f1364(0x3fa)],Window_NumberInput['prototype'][_0x5f1364(0x3fa)]=function(){const _0x429e18=_0x5f1364;$gameTemp[_0x429e18(0x148)]($gameMessage[_0x429e18(0x4e7)]),VisuMZ[_0x429e18(0x507)][_0x429e18(0x252)][_0x429e18(0x160)](this),$gameTemp[_0x429e18(0x254)](),$gameMessage[_0x429e18(0x4e7)]=undefined;},VisuMZ[_0x5f1364(0x507)]['Game_Message_setItemChoice']=Game_Message[_0x5f1364(0x5c6)][_0x5f1364(0x5c2)],Game_Message[_0x5f1364(0x5c6)]['setItemChoice']=function(_0x9cb4bd,_0x50b6cd){const _0x639cea=_0x5f1364;this[_0x639cea(0x560)]=$gameTemp['getSelfTarget'](),VisuMZ[_0x639cea(0x507)][_0x639cea(0x5a2)][_0x639cea(0x160)](this,_0x9cb4bd,_0x50b6cd);},VisuMZ[_0x5f1364(0x507)]['Window_EventItem_onOk']=Window_EventItem[_0x5f1364(0x5c6)]['onOk'],Window_EventItem[_0x5f1364(0x5c6)][_0x5f1364(0x4da)]=function(){const _0x190569=_0x5f1364;$gameTemp['registerSelfTarget']($gameMessage[_0x190569(0x560)]),VisuMZ[_0x190569(0x507)][_0x190569(0x2af)][_0x190569(0x160)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x190569(0x560)]=undefined;},VisuMZ[_0x5f1364(0x507)][_0x5f1364(0x2cd)]=Window_EventItem[_0x5f1364(0x5c6)][_0x5f1364(0x439)],Window_EventItem[_0x5f1364(0x5c6)][_0x5f1364(0x439)]=function(){const _0x1c1bb7=_0x5f1364;$gameTemp[_0x1c1bb7(0x148)]($gameMessage[_0x1c1bb7(0x560)]),VisuMZ[_0x1c1bb7(0x507)][_0x1c1bb7(0x2cd)]['call'](this),$gameTemp[_0x1c1bb7(0x254)](),$gameMessage[_0x1c1bb7(0x560)]=undefined;},VisuMZ[_0x5f1364(0x507)]['Window_Message_startMessage']=Window_Message['prototype'][_0x5f1364(0x43a)],Window_Message['prototype']['startMessage']=function(){const _0x326460=_0x5f1364;$gameMessage[_0x326460(0x267)](),VisuMZ['EventsMoveCore'][_0x326460(0x4e8)][_0x326460(0x160)](this),$gameTemp[_0x326460(0x254)]();},VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage']=Window_ScrollText['prototype'][_0x5f1364(0x43a)],Window_ScrollText['prototype'][_0x5f1364(0x43a)]=function(){const _0x1c40d4=_0x5f1364;$gameMessage[_0x1c40d4(0x267)](),VisuMZ['EventsMoveCore']['Window_ScrollText_startMessage'][_0x1c40d4(0x160)](this),$gameTemp[_0x1c40d4(0x254)]();};function Window_EventLabel(){this['initialize'](...arguments);}Window_EventLabel[_0x5f1364(0x5c6)]=Object[_0x5f1364(0x42a)](Window_Base[_0x5f1364(0x5c6)]),Window_EventLabel[_0x5f1364(0x5c6)]['constructor']=Window_EventLabel,Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x223)]=function(_0x438b83){const _0x38fc0e=_0x5f1364;this[_0x38fc0e(0x211)]=_0x438b83;const _0x4ddcf0=new Rectangle(0x0,0x0,Graphics[_0x38fc0e(0x14c)]/0x4,this[_0x38fc0e(0x468)](0x1));this[_0x38fc0e(0x1e6)](),Window_Base['prototype'][_0x38fc0e(0x223)][_0x38fc0e(0x160)](this,_0x4ddcf0),this[_0x38fc0e(0x2d7)]=0x0,this[_0x38fc0e(0x3a6)](0x2),this[_0x38fc0e(0x1b9)]='';},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x1e6)]=function(){const _0x581450=_0x5f1364;this[_0x581450(0x185)]=![],this[_0x581450(0x3f8)]=$gameScreen[_0x581450(0x538)](),this[_0x581450(0x1a1)]=this[_0x581450(0x211)][_0x581450(0x208)](),this[_0x581450(0x53c)]=this[_0x581450(0x211)][_0x581450(0x21a)](),this[_0x581450(0x32d)]=this[_0x581450(0x211)]['_labelWindow'][_0x581450(0x2a1)],this['_eventLabelOffsetY']=this[_0x581450(0x211)][_0x581450(0x29e)][_0x581450(0x5b8)],this[_0x581450(0x1a7)]=this['_event'][_0x581450(0x2dd)],this[_0x581450(0x1a6)]=this['isLabelVisible'](),this[_0x581450(0x203)]=$gameSystem[_0x581450(0x313)](),this[_0x581450(0x15e)]=$gamePlayer['x'],this[_0x581450(0x40e)]=$gamePlayer['y'],this[_0x581450(0x14b)]=this[_0x581450(0x211)]['x'],this[_0x581450(0x1a5)]=this[_0x581450(0x211)]['y'];},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x1d4)]=function(){const _0x42add2=_0x5f1364;Window_Base['prototype']['update'][_0x42add2(0x160)](this);if(!this[_0x42add2(0x50d)]())return;this[_0x42add2(0x27a)](),this[_0x42add2(0x37e)](),this[_0x42add2(0x3a2)](),this[_0x42add2(0x425)]();},Window_EventLabel['prototype'][_0x5f1364(0x50d)]=function(){const _0x14090d=_0x5f1364;if(!this[_0x14090d(0x211)])return![];if(!this['_event'][_0x14090d(0x29e)])return![];if(this['_eventPageIndex']!==this[_0x14090d(0x211)][_0x14090d(0x2dd)])return!![];if(this[_0x14090d(0x211)][_0x14090d(0x38c)]&&!this['_eventErased'])return!![];if(this[_0x14090d(0x211)][_0x14090d(0x29e)][_0x14090d(0x4b9)]==='')return![];if(this[_0x14090d(0x3f8)]!==$gameScreen[_0x14090d(0x538)]())return!![];if(this[_0x14090d(0x1a1)]!==this[_0x14090d(0x211)][_0x14090d(0x208)]())return!![];if(this[_0x14090d(0x53c)]!==this[_0x14090d(0x211)]['screenY']())return!![];if(this[_0x14090d(0x32d)]!==this[_0x14090d(0x211)][_0x14090d(0x29e)]['offsetX'])return!![];if(this[_0x14090d(0x495)]!==this[_0x14090d(0x211)][_0x14090d(0x29e)][_0x14090d(0x5b8)])return!![];if(this[_0x14090d(0x15e)]!==$gamePlayer['x'])return!![];if(this[_0x14090d(0x40e)]!==$gamePlayer['y'])return!![];if(this[_0x14090d(0x14b)]!==this[_0x14090d(0x211)]['x'])return!![];if(this[_0x14090d(0x1a5)]!==this[_0x14090d(0x211)]['y'])return!![];if(this[_0x14090d(0x203)]!==$gameSystem[_0x14090d(0x313)]())return!![];if(this[_0x14090d(0x1a6)]&&this[_0x14090d(0x2d7)]<0xff)return!![];if(!this[_0x14090d(0x1a6)]&&this[_0x14090d(0x2d7)]>0x0)return!![];if(SceneManager['_scene'][_0x14090d(0x3c5)]>0x0)return!![];return![];},Window_EventLabel['prototype'][_0x5f1364(0x27a)]=function(){const _0xc4f8fe=_0x5f1364;if(this[_0xc4f8fe(0x211)][_0xc4f8fe(0x347)]()!==this[_0xc4f8fe(0x1b9)]){if(_0xc4f8fe(0x5d0)!==_0xc4f8fe(0x3eb))this[_0xc4f8fe(0x1b9)]=this[_0xc4f8fe(0x211)]['labelWindowText'](),this[_0xc4f8fe(0x575)]();else{function _0x35d019(){const _0x303306=_0xc4f8fe;return _0xd03631[_0x303306(0x507)][_0x303306(0x18d)]['Label'][_0x303306(0x3e6)];}}}},Window_EventLabel['prototype'][_0x5f1364(0x37e)]=function(){const _0x1ef3a8=_0x5f1364;this[_0x1ef3a8(0x2ef)]['x']=0x1/$gameScreen[_0x1ef3a8(0x538)](),this[_0x1ef3a8(0x2ef)]['y']=0x1/$gameScreen[_0x1ef3a8(0x538)](),this['_screenZoomScale']=$gameScreen[_0x1ef3a8(0x538)]();},Window_EventLabel[_0x5f1364(0x5c6)]['updatePosition']=function(){const _0x1faf49=_0x5f1364;if(!SceneManager[_0x1faf49(0x446)])return;if(!SceneManager['_scene'][_0x1faf49(0x1d1)])return;const _0x20ae58=SceneManager[_0x1faf49(0x446)][_0x1faf49(0x1d1)]['findTargetSprite'](this['_event']);if(!_0x20ae58)return;this['x']=Math['round'](this[_0x1faf49(0x211)]['screenX']()-Math[_0x1faf49(0x32f)](this[_0x1faf49(0x416)]*this[_0x1faf49(0x2ef)]['x']/0x2)),this['x']+=this[_0x1faf49(0x211)][_0x1faf49(0x29e)][_0x1faf49(0x2a1)],this['y']=this[_0x1faf49(0x211)][_0x1faf49(0x21a)]()-_0x20ae58[_0x1faf49(0x5b6)],this['y']+=Math[_0x1faf49(0x325)]($gameSystem['windowPadding']()*0.5),this['y']-=Math[_0x1faf49(0x325)](this[_0x1faf49(0x5b6)]*this[_0x1faf49(0x2ef)]['y']),this['y']+=this[_0x1faf49(0x211)][_0x1faf49(0x29e)]['offsetY'],this[_0x1faf49(0x185)]=this[_0x1faf49(0x211)]['_erased'],this['_eventScreenX']=this[_0x1faf49(0x211)][_0x1faf49(0x208)](),this[_0x1faf49(0x53c)]=this['_event']['screenY'](),this[_0x1faf49(0x32d)]=this['_event'][_0x1faf49(0x29e)][_0x1faf49(0x2a1)],this[_0x1faf49(0x495)]=this[_0x1faf49(0x211)][_0x1faf49(0x29e)][_0x1faf49(0x5b8)],this[_0x1faf49(0x1a7)]=this[_0x1faf49(0x211)][_0x1faf49(0x2dd)],this['_eventErased']&&(this[_0x1faf49(0x2d7)]=0x0);},Window_EventLabel['prototype'][_0x5f1364(0x425)]=function(){const _0x43e481=_0x5f1364;if(this[_0x43e481(0x2ea)]()){if(_0x43e481(0x381)!==_0x43e481(0x3fe))this[_0x43e481(0x2d7)]+=this[_0x43e481(0x448)]();else{function _0x119c06(){const _0x1370b1=_0x43e481;_0xe39c40[_0x1370b1(0x472)](_0x3c0e6b,_0x13270a);const _0x1a09f9=_0x301c82[_0x1370b1(0x45a)]||0x0;_0xee7020[_0x1370b1(0x2b4)](_0x1a09f9);}}}else{if(SceneManager[_0x43e481(0x446)][_0x43e481(0x3c5)]>0x0)this['contentsOpacity']=0x0;else{if(_0x43e481(0x308)==='HWUVC'){function _0x13a5f2(){const _0x1d0cbd=_0x43e481;_0x268ea3[_0x1d0cbd(0x507)][_0x1d0cbd(0x23a)][_0x1d0cbd(0x160)](this,_0x541d4b,_0x3a309f);}}else this[_0x43e481(0x2d7)]-=this[_0x43e481(0x448)]();}}},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x2ea)]=function(){const _0x1f2f8b=_0x5f1364;if(!$gameSystem[_0x1f2f8b(0x313)]())return![];if(this[_0x1f2f8b(0x211)]?.[_0x1f2f8b(0x38c)])return![];if(SceneManager[_0x1f2f8b(0x446)]['_encounterEffectDuration']>0x0)return![];const _0x45b69b=$gamePlayer['x'],_0x42c931=$gamePlayer['y'],_0x2dbde3=this[_0x1f2f8b(0x211)]['x'],_0x3b0bc5=this[_0x1f2f8b(0x211)]['y'];if(this[_0x1f2f8b(0x15e)]===_0x45b69b&&this[_0x1f2f8b(0x40e)]===_0x42c931&&this[_0x1f2f8b(0x14b)]===_0x2dbde3&&this[_0x1f2f8b(0x1a5)]===_0x3b0bc5){if('UstHb'===_0x1f2f8b(0x1d0))return this[_0x1f2f8b(0x1a6)];else{function _0x1ad9f6(){const _0x1cc043=_0x1f2f8b;if(!this[_0x1cc043(0x59e)][_0x1cc043(0x485)])return![];return _0xc5616d[_0x1cc043(0x5c6)][_0x1cc043(0x4d6)][_0x1cc043(0x160)](this);}}}this[_0x1f2f8b(0x15e)]=$gamePlayer['x'],this[_0x1f2f8b(0x40e)]=$gamePlayer['y'],this[_0x1f2f8b(0x14b)]=this[_0x1f2f8b(0x211)]['x'],this['_visibleEventY']=this[_0x1f2f8b(0x211)]['y'];if($gameMap[_0x1f2f8b(0x1cf)](_0x45b69b,_0x42c931,_0x2dbde3,_0x3b0bc5)>this[_0x1f2f8b(0x211)][_0x1f2f8b(0x475)]())return this[_0x1f2f8b(0x1a6)]=![],![];return this['_cacheVisibility']=!![],!![];},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x448)]=function(){const _0x1e4428=_0x5f1364;return VisuMZ[_0x1e4428(0x507)][_0x1e4428(0x18d)][_0x1e4428(0x1ed)][_0x1e4428(0x3e6)];},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x376)]=function(){const _0x3cfbf1=_0x5f1364,_0x5f3c6c=this[_0x3cfbf1(0x49b)](this[_0x3cfbf1(0x1b9)]);this[_0x3cfbf1(0x416)]=_0x5f3c6c[_0x3cfbf1(0x416)]+($gameSystem[_0x3cfbf1(0x25d)]()+this['itemPadding']())*0x2,this[_0x3cfbf1(0x5b6)]=Math['max'](this[_0x3cfbf1(0x2b7)](),_0x5f3c6c[_0x3cfbf1(0x5b6)])+$gameSystem[_0x3cfbf1(0x25d)]()*0x2,this[_0x3cfbf1(0x4ad)]();},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x2b7)]=function(){const _0x4d5794=_0x5f1364;return VisuMZ[_0x4d5794(0x507)][_0x4d5794(0x18d)][_0x4d5794(0x1ed)]['LineHeight'];},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x26a)]=function(){const _0x4bbd43=_0x5f1364;Window_Base[_0x4bbd43(0x5c6)][_0x4bbd43(0x26a)][_0x4bbd43(0x160)](this),this[_0x4bbd43(0x555)][_0x4bbd43(0x428)]=this[_0x4bbd43(0x33d)]();},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x33d)]=function(){const _0x1211c3=_0x5f1364;return VisuMZ[_0x1211c3(0x507)][_0x1211c3(0x18d)][_0x1211c3(0x1ed)][_0x1211c3(0x378)];},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x575)]=function(){const _0x11d00d=_0x5f1364;this[_0x11d00d(0x376)](),this['contents'][_0x11d00d(0x136)]();const _0x35619f=this[_0x11d00d(0x1b9)][_0x11d00d(0x1e3)](/[\r\n]+/);let _0x3f2dc2=0x0;for(const _0x54a698 of _0x35619f){if(_0x11d00d(0x1bf)!==_0x11d00d(0x593)){const _0x370d88=this[_0x11d00d(0x49b)](_0x54a698),_0x3e0f87=Math[_0x11d00d(0x32f)]((this[_0x11d00d(0x153)]-_0x370d88[_0x11d00d(0x416)])/0x2);this[_0x11d00d(0x3e1)](_0x54a698,_0x3e0f87,_0x3f2dc2),_0x3f2dc2+=_0x370d88['height'];}else{function _0x4a86b7(){this['contentsOpacity']+=this['opacitySpeed']();}}}},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x532)]=function(_0x3dfffd,_0x3a2a23){const _0x212cee=_0x5f1364;_0x3a2a23['drawing']&&this[_0x212cee(0x3f5)](_0x3dfffd,_0x3a2a23['x']+0x2,_0x3a2a23['y']),_0x3a2a23['x']+=Math[_0x212cee(0x392)](this[_0x212cee(0x4a1)](),ImageManager[_0x212cee(0x25f)])+0x4;},Window_EventLabel[_0x5f1364(0x5c6)][_0x5f1364(0x3f5)]=function(_0x238da4,_0x155a1f,_0xb96922){const _0x491215=_0x5f1364,_0x17fbe9=ImageManager[_0x491215(0x46e)](_0x491215(0x18a)),_0x424e5c=ImageManager['iconWidth'],_0x3213ff=ImageManager[_0x491215(0x389)],_0x1ae432=_0x238da4%0x10*_0x424e5c,_0x3a59d9=Math[_0x491215(0x32f)](_0x238da4/0x10)*_0x3213ff,_0x58a234=Math['min'](this[_0x491215(0x4a1)]()),_0x4362a4=Math[_0x491215(0x392)](this[_0x491215(0x4a1)]());this[_0x491215(0x555)][_0x491215(0x157)](_0x17fbe9,_0x1ae432,_0x3a59d9,_0x424e5c,_0x3213ff,_0x155a1f,_0xb96922,_0x58a234,_0x4362a4);},Window_EventLabel['prototype'][_0x5f1364(0x4a1)]=function(){const _0x32ba67=_0x5f1364;return VisuMZ[_0x32ba67(0x507)][_0x32ba67(0x18d)]['Label'][_0x32ba67(0x4cf)];};