//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Core.js            (Required by all OcRam MZ -plugins)
//=============================================================================

"use strict"; var Imported = Imported || {};
Imported.OcRam_Core = true; let $temp_OcRam_Core_Ver = "1.09";
// This is for my webparser // OcRam.addPlugin("Core", "1.09");

/*:
 * @target MZ
 * @plugindesc v1.09 Core plugin for other OcRam -plugins.
 * Import this plugin before any other OcRam -plugin.
 * @author OcRam
 * @url https://ocram-codes.net
 *
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 *
 * @command playBGS
 * @text Play BGS
 * @desc Play BGS on desired channel.
 *
 * @arg channel
 * @type number
 * @min 1
 * @max 3
 * @default 1
 * @text Channel
 * @desc Play BGS playing on this channel.
 *
 * @arg name
 * @type file
 * @dir audio/bgs
 * @default
 * @text BGS Name
 * @desc Name of the BGS file.
 *
 * @arg volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text Volume
 * @desc Volume of this BGS.
 *
 * @arg pitch
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text Pitch
 * @desc Pitch of this BGS.
 *
 * @arg pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text Pan
 * @desc Pan of this BGS.
 *
 * @arg fadeIn
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @text Fade in
 * @desc Fade in time in seconds.
 *
 * @command stopBGS
 * @text Stop BGS
 * @desc Stop BGS on desired channel. 0 = All channels.
 *
 * @arg channel
 * @type number
 * @min 0
 * @max 3
 * @default 0
 * @text Channel
 * @desc Stop BGS playing on this channel. 0 = All channels.
 *
 * @arg fadeOut
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @text Fade out
 * @desc Fade out time in seconds.
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 *
 * @param Show BGS2/3 Volume
 * @desc true = Shown in options menu, false = Linked to main BGS.
 * @type boolean
 * @default true
 *
 * @param BGS2/3 Option Caption
 * @parent Show BGS2/3 Volume
 * @desc Caption for BGS2 and BGS3 shown in options menu.
 * @type text
 * @default Weather Volume
 *
 * @param Merge ME/BGM Volume
 * @desc Merge ME Volume to BGM Volume option?
 * @type boolean
 * @default true
 * 
 * @param Enable D-pads
 * @type boolean
 * @desc Enable D-pad on gamepads where available.
 * @default true
 * 
 * @param Event through fix
 * @type boolean
 * @desc Event "Through" option won't stop player movement anymore (applies only to "Player/Event touch" triggers).
 * @default true
 *
 * @param Region passabilities
 * @type boolean
 * @desc Use region passabilities?
 * @default true
 * 
 * @param Allow ALL
 * @parent Region passabilities
 * @type number
 * @desc Region id to allow ALL pass.
 * @default 41
 *
 * @param Allow player
 * @parent Region passabilities
 * @type number
 * @desc Region id to allow player pass.
 * @default 42
 *
 * @param Allow events
 * @parent Region passabilities
 * @type number
 * @desc Region id to allow events pass.
 * @default 43
 * 
 * @param Block ALL
 * @parent Region passabilities
 * @type number
 * @desc Region id to block ALL pass.
 * @default 49
 *
 * @param Block player
 * @parent Region passabilities
 * @type number
 * @desc Region id to block player pass.
 * @default 50
 *
 * @param Block events
 * @parent Region passabilities
 * @type number
 * @desc Region id to block events pass.
 * @default 51
 * 
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * This plugin is utilized by all other OcRam -plugins. Import this plugin 
 * before any other OcRam -plugin.
 *
 * OcRam_Core is FrameWork, which will offer centralized aliases for most
 * commonly used functions. This will help us to save some memory and will 
 * also free up some CPU time for other tasks!
 *
 * Use region passability feature to allow or block player/event passages on
 * desired region ids!
 *
 * This plugin adds 2 BGS channels which will play also in battles.
 * These BGS channels are intended for things like rain/storm/wind etc...
 * Extra channels are utilized by OcRam_Weather_System for example.
 * To add dynamic BGS/SE channels use OcRam_Audio -plugin.
 *
 * ----------------------------------------------------------------------------
 * Notetags
 * ============================================================================
 * To set any tileset and/or map as "indoors" write <indoors> notetag to
 * notefield. Map notes will always override tileset notes.
 * To check if map/tileset is marked as "Indoors" use JS call:
 *     OcRam.isIndoors(); // Will return true if tag is found else false
 *
 * OcRam_Weather_System and OcRam_Time_System will utilize indoors feature
 * a lot. Indoors feature can be used also without those plugins (with 
 * OcRam.isIndoors() -JS call).
 *
 * TIP: Use map notetag <outdoors> to override tileset <indoors> notetag.
 *
 * ----------------------------------------------------------------------------
 * Event COMMENTS:
 * ----------------------------------------------------------------------------
 * <no_ladders> This will prevent "ladder direction" on while on this page.
 * <allow_los>  Allow "line of sight" to pass this event!
 * 
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * 
 * MV example: playBGS 1 Rain 90 100 0 1
 * playBGS      Play BGS on desired "static" channel
 * >> channel   Play BGS playing on this channel. 1 to 3
 * >> name      Name of the BGS file.
 * >> volume    Volume of this BGS. 0 to 100
 * >> pitch     Pitch of this BGS. 0 to 100
 * >> pan       Pan of this BGS. -100 to 100
 * >> fadeIn    Fade in time in seconds.
 *
 * MV example: stopBGS 1 1
 * stopBGS      Stop BGS on desired or all "static" channels
 * >> channel   Stop BGS playing on this channel. 0 to 3 (0 = All channels)
 * >> fadeOut   Fade out time in seconds.
 *
 * ----------------------------------------------------------------------------
 * Usage - JavaScript (New methods / functions)
 * ============================================================================
 * OcRam.isOmitted(object) // Return true if parameter is null or undefined
 * OcRam.getBoolean(object) // Safe boolean - Force to boolean
 * OcRam.getFloat(object) // Safe float - Force to float
 * OcRam.getArray(object, default_values) // Safe array - Force to array
 * OcRam.getJSON(object) // Try to get JSON object returns null if fails
 * OcRam.getJSONArray(object) // Try to get JSON array returns [] if fails
 * OcRam.regulateRGBG(RGBG_object) // Regulate RGBG values
 * OcRam.regulateHexRGBA(RGBA_hex_string) // Regulate RGBA values
 * OcRam.isIndoors() // Returns true if tileset or map is set to <indoors>
 * OcRam.readMapNotetags() // Refresh meta tags (force to read meta tags NOW)
 * OcRam.runCE(common_event_id) // Run common event with this id
 * OcRam.scene() // Get current scene = SceneManager._scene
 * OcRam.isCurrentScene(Scene_Map) // true if current scene is Scene_Map
 * OcRam.getSpriteByEventId(event_id) // Returns character sprite by event id
 * OcRam.setSelfSwitch(event, key, value) // Set self switch by event id/name
 * OcRam.emptyMoveRoute(); // Returns empty moveroute object
 * OcRam._menuCalled; // True if menu was called in last frame
 * OcRam._justTransfered; // True if transfer to NEW area occured < 200ms
 * OcRam._justTransferedAny // Transfered to any area < 200ms
 * OcRam._justLoaded; // True if game load occured < 200ms
 * OcRam.playerActorId() // Returns player actor id!
 * OcRam.playerCharacter() // Return character who started the event (co-op)
 * OcRam.isUrlAvailable(url, succes_cb, error_cb) // Check if url is available
 * OcRam.getDirectionToCharacterFromXY(c, x, y) // Get dir to char from xy
 * OcRam.isInScreen(x, y) // Check if given x/y is in screen (4 tile margin)
 *                        // + always returns true if small map (no culling)
 * 
 * $gameMap.getEventsByName(event_name) // Get all events with this name
 * $gameMap.getEventById(event_id) // Get event by it's unique id
 * $gameMap.currentActorId() // Get actorId who initiated event.
 * $gameMap.isTilePassable(x, y) // Is passable by ANY direction
 * this.event() // Used from event page/moveroute to get this event
 * ImageManager.loadOcRamBitmap(file, hue) // Load bitmap from "./img/ocram"
 * Game_Event.getComments() // Return {comment, commandIndex} as Array
 * Game_Event.getStringComments() // Return comments as Array of String
 * Game_Event.isPlayerInRadius(radius) // Is player in radius of given range?
 *
 * // "Field of sight" in degrees / "xray" = true >> no passability checks
 * Game_Character.lineOfSight(character, distance, field_of_sight, xray)
 * Game_Character.eventsInLineOfSight(dist, fos, xray)
 * Game_Character.rangeTo(character) // How many tiles to given character?
 * Game_Character.sqrRangeTo(character) // How many tiles in "4-dir" mode?
 * Game_Character.eventsInRangeOf(radius) // Event array in given range
 * Game_Character.frontXY() // Get [x,y] in front of this character
 * Game_Character.behindXY() // Get [x,y] behind this character
 * Game_Character.rightXY() // Get [x,y] right-side of this character
 * Game_Character.leftXY() // Get [x,y] left-side front of this character
 * Game_Character.XY() // Get [x,y] of this character
 * Game_Character.flee(character) // Opposite to "Approach" move type...
 * Game_Character.isNearCharacter(character) // Is near this character?
 * Game_Character.jumpRandomly() // Jump randomly to passable dirs
 * Game_Character.jumpTowards(character) // Jump towards to character
 * Game_Character.jumpAway(character) // Jump away from character
 * Game_Character.jumpTo(x, y || chr) // Jump to given point or character
 * Game_Character.moveToXY(x, y); // Character will move towards given point
 * Game_Character.showBalloon(balloon_index, wait) // Show balloon X
 * Game_CharacterBase.isXY(x, y) // Shortcut to check character pos
 * Game_Character.getActor() // Get actor object if linked to this character
 * Game_Actor.getCharacter() // Get character based on actor!
 * 
 * ['Hello', 'World'].toUpperCase() // Convert all items to UPPER CASE
 * ['Hello', 'World'].toLowerCase() // Convert all items to lower case
 * ['Hello', 'World'].remove('World') // Remove desired item from array
 * 'Hello World'.width('12px Arial') // Returns width of the text in pixels
 * '<tag>test</tag>'.getClosedTags(tag) // returns ['test']
 * '<tag:1:2>'.getOpenTags(tag) // returns ['1:2']
 * 'Hello'.left(2) // Returns 'He'
 * 'Hello'.right(2) // Returns 'lo'
 * 'Hello World'.replaceAll('o', 'a') // Returns 'Hella Warld'
 * Math.randomBetween(min, max) // Random integer between given range
 * Math.setSeed(seed) // Seed RNG generator (for seeded randoms)
 * Math.random$() // Give SEEDED random 0 to 1 (Example: 0.65433241...)
 * Math.randomBetween$(min, max) // SEEDED random int between given range
 * 
 * bgs_obj = {name: 'bgs_name', volume: 90, pitch: 100, pan: 0, pos: 0}
 * AudioManager.playBgs2({bgs_obj}, pos) // Play BGS on channel 2
 * AudioManager.stopBgs2() // Stop BGS on channel 2
 * AudioManager.fadeInBgs2(duration) // Fade in BGS on channel 2
 * AudioManager.fadeOutBgs2(duration) // Fade out BGS on channel 2
 * AudioManager.playBgs3({bgs_obj}, pos) // Play BGS on channel 3
 * AudioManager.stopBgs3() // Stop BGS on channel 3
 * AudioManager.fadeInBgs3(duration) // Fade in BGS on channel 3
 * AudioManager.fadeOutBgs3(duration) // Fade out BGS on channel 3
 * 
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL & COMMERCIAL USE: Free to use with credits to 'OcRam'
 * 
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 * 
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2020/09/03 v1.00 - Initial release
 * 2020/09/05 v1.01 - <indoors> tag is now working (Credits to blade911)
 * 2020/09/19 v1.02 - New alias to detect autosaves + JS call OcRam.isOmitted
 * 2020/09/20 v1.03 - String.getOpenTags() bug fixed!
 * 2020/09/27 v1.04 - String.width() prototype added!
 *                    OcRam.getSpriteByEventId(event_id) added!
 * 2020/10/10 v1.05 - Array.remove -polyfill bug fixed (Credits to Kneeshaw)
 * 2020/10/25 v1.06 - Possibility to enable D-pad on gamepads!
 *                    OcRam.setSelfSwitch(event, key, value);
 *                    New plugin parameter "Event through fix"
 * 2021/03/07 v1.07 - Some fail safing when other OcRam -plugins are turned off
 *                    OcRam.emptyMoveRoute(); // Returns empty moveroute
 *                    OcRam.isUrlAvailable(url, suc_cb, err_cb)
 *                    OcRam.getDirectionToCharacterFromXY(c, x, y)
 *                    OcRam.isInScreen(x, y) // Check if given x/y is in screen
 *                    Game_Actor.getCharacter() // Get character based on actor
 *                    $gameMap.isTilePassable(x, y) // By ANY dir
 *                    <no_ladders> to disable flying birds strafe on ladders
 *                    + All vehicles now ignore ladders...
 *                    NEW region passability feature (block/allow passages)!
 *                    Culling is now done in core to avoid overlapped cull!
 *                    >> Checks if map needs to be culled horz, vert or both
 *                    Some flags to check if events has occured in past 200ms
 *                    - OcRam._justTransfered // Transfered to new area?
 *                    - OcRam._justTransferedAny // Transfered to any area?
 *                    - OcRam._justLoaded  // is game just loaded
 *                    A LOT OF NEW CHARACTER CORE FUNCTIONS:
 *                    - moveToXY(x, y) // Move towards given point
 *                    - showBalloon(6, true); // "Sweat" balloon with "wait"
 *                    - isXY(x, y); // Shortcut to check character pos
 *                    - rangeTo(character) // Range to given character
 *                    - eventsInRangeOf(radius) // Event array
 *                    - frontXY/behindXY/leftXY/rightXY() // [x,y] array
 *                    - lineOfSight(chr, dist, fos, xray) // true/false
 *                    - eventsInLineOfSight(dist, fos, xray) // Event array
 *                    - jumpRandomly/Towards/Away/To methods!
 *                    - getActor() // Gets actor object from this character!
 *                      Example: $gamePlayer.getActor() returns actor object
 *                      controlled by player. (Events will return undefined)
 *                    - flee(character) // Opposite to "Approach" move type...
 *                    - isNearCharacter(character) // Is near this character?
 * 2021/04/02 v1.08 - TouchInput._mouseMidPressed & acts as 100ms left click
 *                    OcRam.drawIcon(bitmap, icon_id, x, y) // To draw an icon
 *                    String.height(font) // String height in pixels
 *                    Game_Event.touchedByActor() // Touched by any actor?
 *                    Game_Event.touchedByEvent(event_id) // Touched by event?
 *                    Game_Event.touchedByEvents() // Touched by another event?
 *                    Game_Event.touchedByAny() // Is event touched by any?
 *                    Game_CharacterBase.getSprite() // Return character SPRITE
 *                    Game_Character.isFacing(char) // Is facing character?
 *                    OcRam.playerActorId() // Returns player actor id!
 *                    OcRam.playerCharacter() // Returns event starter
 *                    OcRam.isSelfSwitchOn([1,2],'A') // Self switch check
 *                    Support for VisuMZ "New game on start" QoL setting!
 *                    "lineOfSight" can be blocked now via no-through "same as
 *                    character" priority events, might come handy for puzzles!
 *                    Event comment <allow_los> to allow "line of sight" even
 *                    if event is "same as character" and no-through!
 * 2021/06/04 v1.09 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    Compatibility path for OcRam_Local_Coop!
 *                    OcRam.isMZ() to check if MZ is in use!
 *                    
 * ----------------------------------------------------------------------------
 * Overrides (destructive declarations) are listed here
 * ============================================================================
 * ConfigManager.bgsVolume (IF "Show BGS2/3 Volume" is off/false)
 * Window_Options.addVolumeOptions (IF "Merge ME/BGM Volume" is on/true)
 * Input._updateGamepadState (IF D-pads is enabled)
 * Game_CharacterBase.isOnLadder (IF <no_ladders> comment is found on page)
 */

// ----------------------------------------------------------------------------
// New JS Generic protypes and global name space
// ============================================================================

var VisuMZ = VisuMZ || {}; // In case there's no VisuMZ plugins in use

// These variables are used also in other plugins than OcRam_Local_Coop
let $allPlayers = [$gamePlayer, null, null, null]; // Global player objects
let $tempGamePlayer_OC = null; // Player who started the event

// ----------------------------------------------------------------------------
// CanvasRenderingContext2D object prototype (line, radialGradient?)
// ============================================================================
(function () {

    // Pre-calculate for faster processing...
    const _pi = Math.PI; const _pi2 = _pi / 180;

    /**
     * Draw line to canvas context. TIP: Use arithmetic or 0 when passing parameters to speed this up!
    * Example: myCanvas.line(x1 | 0, y1 | 0, x2 | 0, y2 | 0);
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     */
    this.prototype.line = function (x1, y1, x2, y2) {
        this.beginPath(); this.moveTo(x1, y1); this.lineTo(x2, y2); this.stroke();
    };

    /**
    * Draw radialGradient to canvas context. TIP: Use arithmetic or 0 when passing parameters to speed this up!
    * Example: myCanvas.radialGradient(x1 | 0, y1 | 0, r1 | 0, c);
    * @param {Number} x1 X pos
    * @param {Number} y1 Y pos
    * @param {Number} r1 Radius
    * @param {Number} c Color as RGBA
    */
    this.prototype.radialGradient = function (x1, y1, r1, c) {
        let grd = this.createRadialGradient(x1, y1, 0, x1, y1, r1);
        grd.addColorStop(0, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')');
        grd.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0)');
        this.fillStyle = grd; this.fillRect(x1 - r1, y1 - r1, r1 * 2, r1 * 2);
    };

    /**
    * Draw radialCone to canvas context. TIP: Use arithmetic or 0 when passing parameters to speed this up!
    * Example: myCanvas.radialCone(x1 | 0, y1 | 0, r1 | 0, c, angle, deg, start_at);
    * @param {Number} x1 X pos
    * @param {Number} y1 Y pos
    * @param {Number} r1 Radius
    * @param {Number} c Color as RGBA
    * @param {Number} angle Angle
    * @param {Number} deg Degrees
    * @param {Number} start_at Start gradient at pos
    */
    this.prototype.radialCone = function (x1, y1, r1, c, angle, deg, start_at) {

        const deg50 = Math.orz(deg * 0.5);

        let grd = this.createRadialGradient(x1, y1, 0, x1, y1, r1);
        if (start_at != 0) {
            grd.addColorStop(0, 'transparent');
            grd.addColorStop(start_at, 'transparent');
            grd.addColorStop(start_at, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')');
            grd.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0)');
        } else {
            grd.addColorStop(0, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')');
            grd.addColorStop(1, 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',0)');
        }

        this.fillStyle = grd; this.beginPath(); this.moveTo(x1, y1); // Center

        const am = -(angle - deg50); const ap = -(angle + deg50);
        const am2 = am * _pi2; const ap2 = ap * _pi2;

        /* // In following arithmetic hacks SPEED is almost same as Math.ceil, round, floor
        // xx | 0
        // xx << 0
        // ~~(xx + 0.5)
        // AVOID PARSEINT (if not expecting strings via user input)
        let xx = 1.60780714; let started = null; const tmp = p => {};
        started = Date.now(); for (let i = 0; i < 10000000; i++) { tmp(parseInt(xx)); }
        console.log("parseInt(xx) time:" + (Date.now() - started));
        started = Date.now(); for (let i = 0; i < 10000000; i++) { tmp(Math.floor(xx)); }
        console.log("Math.floor(xx) time:" + (Date.now() - started));
        */

        const r = r1 * 2;
        if (deg < 91) { // Triangle
            this.lineTo(Math.orz(x1 + r * Math.cos(am2)), Math.orz(y1 + r * Math.sin(am2)));
            this.lineTo(Math.orz(x1 + r * Math.cos(ap2)), Math.orz(y1 + r * Math.sin(ap2)));
        } else if (deg < 181) { // Irregular Square
            this.lineTo(Math.orz(x1 + r * Math.cos(am2)), Math.orz(y1 + r * Math.sin(am2)));
            this.lineTo(Math.orz(x1 + r * Math.cos(-(angle) * _pi2)), Math.orz(y1 + r * Math.sin(-(angle) * _pi2)));
            this.lineTo(Math.orz(x1 + r * Math.cos(ap2)), Math.orz(y1 + r * Math.sin(ap2)));
        } else { // Irregular Hexagon
            this.lineTo(Math.orz(x1 + r * Math.cos(am2)), Math.orz(y1 + r * Math.sin(am2)));
            this.lineTo(Math.orz(x1 + r * Math.cos(am * 0.5 * _pi2)), Math.orz(y1 + r * Math.sin(am * 0.5 * _pi2)));
            this.lineTo(Math.orz(x1 + r * Math.cos(-(angle) * _pi2)), Math.orz(y1 + r * Math.sin(-(angle) * _pi2)));
            this.lineTo(Math.orz(x1 + r * Math.cos(ap * 0.5 * _pi2)), Math.orz(y1 + r * Math.sin(ap * 0.5 * _pi2)));
            this.lineTo(Math.orz(x1 + r * Math.cos(ap2)), Math.orz(y1 + r * Math.sin(ap2)));
        } this.closePath(); this.fill();

    };

}.bind(CanvasRenderingContext2D))();

// ----------------------------------------------------------------------------
// Array object prototype
// ============================================================================
(function () {

    /** Convert array to UPPER CASE strings */
    Array.prototype.toUpperCase = function () {
        for (let i = 0; i < this.length; i++) {
            this[i] = (this[i] + '').toUpperCase();
        } return this;
    };

    /** Convert array to lower case strings */
    Array.prototype.toLowerCase = function () {
        for (let i = 0; i < this.length; i++) {
            this[i] = (this[i] + '').toLowerCase();
        } return this;
    };

    /** Polyfill for Array.remove() */
    if (![].remove) {
        Array.prototype.remove = function (itm) {
            let i = this.indexOf(itm);
            if (i > -1) this.splice(i, 1);
            return this;
        };
    }

}.bind(Array))();

// ----------------------------------------------------------------------------
// String object prototype
// ============================================================================
(function () {

    /**
     * Calculate width of desired string.
     * @param {String} font Desired font example '12px Arial'
     */
    String.prototype.width = function (font) {

        const f = font || $gameSystem.mainFontSize() + 'px ' + $gameSystem.mainFontFace();
        let o = document.createElement('div');

        o.innerText = this;
        o.style.padding = '0px';
        o.style.margin = '0px';
        o.style.position = 'absolute';
        o.style.whiteSpace = 'nowrap';
        o.style.visibility = 'hidden';
        o.style.font = f;

        document.body.appendChild(o);
        let w = o.getBoundingClientRect().width;
        o.remove();

        return w;

    };

    /**
     * Calculate height of desired string.
     * @param {String} font Desired font example '12px Arial'
     */
    String.prototype.height = function (font) {

        const f = font || $gameSystem.mainFontSize() + 'px ' + $gameSystem.mainFontFace();
        let o = document.createElement('div');

        o.innerText = this;
        o.style.padding = '0px';
        o.style.margin = '0px';
        o.style.position = 'absolute';
        o.style.whiteSpace = 'nowrap';
        o.style.visibility = 'hidden';
        o.style.font = f;

        document.body.appendChild(o);
        let h = o.getBoundingClientRect().height;
        o.remove();

        return h;

    };

    /**
     * Return closed tag content array. NOTE: Null char will terminate String.
     * '<tag>something</tag>'.getClosedTags('tag') returns ['something']
     * @param {String} tag Tagname to parse
     */
    this.prototype.getClosedTags = function (tag) {
        // test string: 'fdas<tag>test</tag>\n<tag>a\nb</tag>'.getClosedTags('tag');
        // should return: ['test', 'a\nb']
        const rex = new RegExp("<" + tag + ">([^\0]*?)\</" + tag + ">", "gmi");
        const matches = [...this.matchAll(rex)]; let ret = [];
        matches.forEach(m => {
            if (m.length > 1) ret.push(m[1]);
        }); return ret;
    };

    /**
     * Return open tag content array. NOTE: Null char will terminate String.
     * '<tag:2:400>'.getOpenTags('tag') returns ['2:400']
     * @param {String} tag Tagname to parse
     */
    this.prototype.getOpenTags = function (tag) {
        // test string: 'fdas<tag:2:300:131>fads<tag:2>\n<tag>a'.getOpenTags('tag');
        // should return: ['2:300:131', '2', '']
        const rex = new RegExp("\<" + tag + "[\:\>]([^\0]*?)\>", "gmi");
        const matches = [...this.matchAll(rex)];
        let ret = []; const rl = ('</' + tag).length;
        matches.forEach(m => {
            if (m.length > 1 && m[1].right(rl) != '</' + tag) ret.push(m[1]);
        }); return ret;
    };

    /**
     * Return desired amount of characters from string - starting from left.
     * @param {Number} len Amount of characters to return
     */
    this.prototype.left = function (len) {
        return this.substr(0, len);
    };

    /**
     * Return desired amount of characters from string - starting from right.
     * @param {Number} len Amount of characters to return
     */
    this.prototype.right = function (len) {
        return this.substr(this.length - len, this.length);
    };

    // Polyfills... just in case...
    if (!''.replaceAll) {
        /**
        * Replace all occurances in String
        * @param {String} search_string Text to be replaced
        * @param {String} replace_string Replace with this
        */
        this.prototype.replaceAll = function (search_string, replace_string) {
            return this.split(search_string).join(replace_string);
        };
    }

    if (!''.matchAll) {
        /**
         * Returns all instances in string of desired RegExp
         * @param {RegExp} rex
         */
        String.prototype.matchAll = function (rex) {
            const ret = [];
            while (true) {
                const res = rex.exec(this);
                if (!res) break; ret.push(res);
            } return ret;
        };
    }

}.bind(String))();

// ----------------------------------------------------------------------------
// Math object prototype (seededRandom and randomBetween)
// ============================================================================
(function () {

    // Number.MAX_SAFE_INTEGER = 9007199254740990;
    const MAX_SEED = 244837814099629; // Maximum seed value not as HEX...

    // Initialize seed in case that setSeed() is never used... 
    let _seed = ((Date.now() * 3735928559) % MAX_SEED) + 1;
    let _newRandom = 0; // Just a private variable...

    /**
     * Give seed for new RNG!
     * @param {Number} seed Positive number
     */
    this.setSeed = seed => {
        _seed = seed < 1 ? Date.now() : (seed % MAX_SEED) + 1;
    };

    /**
     * Arithmetic or zero - Slightly faster than Math.floor()!
     * @param {Number} i
     */
    this.orz = i => i | 0;

    /** Give SEEDED random */
    this.random$ = () => {
        _newRandom = this.sin(_seed) * 12345; _seed = (_seed % MAX_SEED) + 1;
        return _newRandom - this.floor(_newRandom);
    };

    /**
     * Generates a SEEDED random integer between given range.
     * @param {Number} min Minimum number to generata
     * @param {Number} max Maximum number to generata
     */
    this.randomBetween$ = (min, max) => (min + this.orz((max - min + 1) * this.random$()));

    /**
     * Generates a random integer between given range.
     * @param {Number} min Minimum number to generata
     * @param {Number} max Maximum number to generata
     */
    this.randomBetween = (min, max) => (min + this.orz((max - min + 1) * this.random()));

    /** Tests seeded 2d6 statistics >> F12 >> Console tab >> Math.run2d6Tests() */
    this.run2d6Test = amount => {
        const results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const started = Date.now();
        const iterations = amount || 6000;
        for (let i = 0; i < iterations; i++) {
            results[this.randomBetween$(0, 5) + this.randomBetween$(0, 5)]++;
        } console.log("time:" + (Date.now() - started) + "ms (" + iterations + " iterations)", results);
    };

    /** Tests seeded 1d6 statistics >> F12 >> Console tab >> Math.run1d6Tests() */
    this.run1d6Test = amount => {
        const results = [0, 0, 0, 0, 0, 0];
        const started = Date.now();
        const iterations = amount || 6000;
        for (let i = 0; i < iterations; i++) {
            results[this.randomBetween$(0, 5)]++;
        } console.log("time:" + (Date.now() - started) + "ms (" + iterations + " iterations)",results);
    };

}.bind(Math))();

// ----------------------------------------------------------------------------
// Here we add BGS2 and BGS3 channels to AudioManager class
// ============================================================================
(function () {

    // Common to both channels
    Object.defineProperty(this, "bgsVolume23", {
        get: function () {
            return this._bgsVolume23;
        },
        set: function (value) {
            this._bgsVolume23 = value;
            this.updateBgsParameters2(this._currentBgs2);
            this.updateBgsParameters3(this._currentBgs3);
        },
        configurable: true
    }); this._bgsVolume23 = 100;

    this.replayBgs2 = bgs => {
        if (this.isCurrentBgs2(bgs)) {
            this.updateBgsParameters2(bgs);
        } else {
            if (this._bgsBuffer2) {
                this._bgsBuffer2.fadeIn(this._replayFadeTime);
            }
        }
    };

    this.isCurrentBgs2 = bgs => {
        return (
            this._currentBgs2 &&
            this._bgsBuffer2 &&
            this._currentBgs2.name === bgs.name
        );
    };

    this.updateBgsParameters2 = bgs => {
        this.updateBufferParameters(this._bgsBuffer2, this._bgsVolume23, bgs);
    };

    this.updateCurrentBgs2 = (bgs, pos) => {
        this._currentBgs2 = {
            name: bgs.name,
            volume: bgs.volume,
            pitch: bgs.pitch,
            pan: bgs.pan,
            pos: pos
        };
    };

    this.stopBgs2 = () => {
        if (this._bgsBuffer2) {
            this._bgsBuffer2.destroy();
            this._bgsBuffer2 = null;
            this._currentBgs2 = null;
        }
    };

    this.fadeOutBgs2 = duration => {
        if (this._bgsBuffer2 && this._currentBgs2) {
            this._bgsBuffer2.fadeOut(duration);
            this._currentBgs2 = null;
        }
    };

    this.fadeInBgs2 = duration => {
        if (this._bgsBuffer2 && this._currentBgs2) {
            this._bgsBuffer2.fadeIn(duration);
        }
    };


    this.replayBgs3 = bgs => {
        if (this.isCurrentBgs3(bgs)) {
            this.updateBgsParameters3(bgs);
        } else {
            if (this._bgsBuffer3) {
                this._bgsBuffer3.fadeIn(this._replayFadeTime);
            }
        }
    };

    this.isCurrentBgs3 = bgs => {
        return (
            this._currentBgs3 &&
            this._bgsBuffer3 &&
            this._currentBgs3.name === bgs.name
        );
    };

    this.updateBgsParameters3 = bgs => {
        this.updateBufferParameters(this._bgsBuffer3, this._bgsVolume23, bgs);
    };

    this.updateCurrentBgs3 = (bgs, pos) => {
        this._currentBgs3 = {
            name: bgs.name,
            volume: bgs.volume,
            pitch: bgs.pitch,
            pan: bgs.pan,
            pos: pos
        };
    };

    this.stopBgs3 = () => {
        if (this._bgsBuffer3) {
            this._bgsBuffer3.destroy();
            this._bgsBuffer3 = null;
            this._currentBgs3 = null;
        }
    };

    this.fadeOutBgs3 = duration => {
        if (this._bgsBuffer3 && this._currentBgs3) {
            this._bgsBuffer3.fadeOut(duration);
            this._currentBgs3 = null;
        }
    };

    this.fadeInBgs3 = duration => {
        if (this._bgsBuffer3 && this._currentBgs3) {
            this._bgsBuffer3.fadeIn(duration);
        }
    };

    this.saveBgs2 = () => {
        if (this._currentBgs2) {
            const bgs = this._currentBgs2;
            return {
                name: bgs.name,
                volume: bgs.volume,
                pitch: bgs.pitch,
                pan: bgs.pan,
                pos: this._bgsBuffer2 ? this._bgsBuffer2.seek() : 0
            };
        } else {
            return this.makeEmptyAudioObject();
        }
    };

    this.saveBgs3 = () => {
        if (this._currentBgs3) {
            const bgs = this._currentBgs3;
            return {
                name: bgs.name,
                volume: bgs.volume,
                pitch: bgs.pitch,
                pan: bgs.pan,
                pos: this._bgsBuffer3 ? this._bgsBuffer3.seek() : 0
            };
        } else {
            return this.makeEmptyAudioObject();
        }
    };

}.bind(AudioManager))();

// ----------------------------------------------------------------------------
// Now to the OcRam_Core declarations...
// ============================================================================
class OcRam_Core {

    constructor() { // Init some stuff...

        this.name = "Core"; this.version = '' + $temp_OcRam_Core_Ver;
        $temp_OcRam_Core_Ver = undefined; // Release this temp var
        this.plugins = []; // List of imported OcRam plugins as string...
        this.twh = [48, 48]; // Tile width and height
        this.twh50 = [24, 24]; // 50% of tile width and height
        this.radian = Math.PI / 180; // Pre-calc this
        this._screenTWidth = Graphics.width / 48; // Screen width in tiles?
        this._screenTHeight = Graphics.height / 48; // Screen height in tiles?
        this._isIndoors = false; this._menuCalled = false; this._autoSaving = false;
        this._justTransfered = false; this._justTransferedAny = false; this._justLoaded = false;
        this._cull = [0, 0, 0, 0]; this._doCulling = true; this.initPublics();
        
        if (Utils && Utils.RPGMAKER_NAME == "MZ") {
            this.isMZ = () => true;
        } else {
            this.isMZ = () => false;
        }

    }

    /** This is used to make eventing mor "fail safe", if plugin is turned off for some reason and it's JS is called */
    initPublics() {

        Game_Screen.prototype.showMessage = () => { };
        Game_Event.prototype.isPlayerInLightRadius = function () { }; // If lights are turned off
        Game_Interpreter.prototype.applyTo = function (v) { }; // If followers is turned off
        Game_Character.prototype.setPixelMove = function (v) { }; // If movement is turned off
        Game_Character.prototype.setDiagonalMove = function (v) { }; // If movement is turned off
        Game_Character.prototype.isLit = () => { }; // Is character lit? (has lightdata && type != 0)
        Game_Character.prototype.setFloorLevel = function (v) { }; // Set floor level

        Game_Event.prototype.touchedByActor = function () { // Check if any actor "touches" this event
            if ((Math.round($gamePlayer._x) == Math.round(this._x) && Math.round($gamePlayer._y) == Math.round(this._y)) && $gamePlayer._higherLevel == this._higherLevel) { this._touchedBy = -1; return true; }
            return !!OcRam.followers().find(f => {
                if (f.isVisible() && (Math.round(f._x) == Math.round(this._x) && Math.round(f._y) == Math.round(this._y)) && f._higherLevel == this._higherLevel) return true;
            });
        }; Game_Event.prototype.touchedByEvent = function (event_id) { // Check if specific event "touches" this event
            return !!($gameMap.events().find(ev => {
                if (ev._eventId != event_id || ev._erased || ev._transparent) return false;
                return ev.pos(this._x, this._y) && ev._higherLevel == this._higherLevel;
            }));
        }; Game_Event.prototype.touchedByEvents = function () { // Check if any event "touches" this event
            return !!($gameMap.events().find(ev => {
                if (ev._eventId == this._eventId || ev._erased || ev._transparent) return false;
                if (ev.pos(this._x, this._y) && ev._higherLevel == this._higherLevel) {
                    this._touchedBy = ev._eventId; return true;
                } else {
                    return false;
                }
            }));
        }; Game_Event.prototype.touchedByAny = function () { // Check if anything "touches" this event
            if (this._touchedBy != 0) this._touchedBy = 0;
            return this.touchedByActor() || this.touchedByEvents();
        }; Game_Map.prototype.spawnEvent = function () { }; // If events is turned off
        Game_Map.prototype.copyEvent = function () { }; // If events is turned off
        Game_Character.prototype.setEMotion = function () { }; // If events is turned off

        this.Time_System = {};
        this.Time_System.parameters = {};
        this.Weather_System = {};
        this.Events = {};
        this.Lights = {};
        this.Followers = {};
        this.Followers.follow = () => { };
        this.Followers.saveFormation = () => { };
        this.Followers.restoreFormation = () => { };
        this.Followers.assignActors = () => { };
        this.Followers.maxBattleMembers = () => { };
        this.Followers.clipMembers = () => { };
        this.Followers.locate = () => { };
        this.Followers.lockFormation = () => { };
        this.Audio = {};
        this.Movement = {};
        this.Passages = {};
        this.Passages.setFloorLevel = () => { };
        this.Local_Coop = {};
        this.Local_Coop.anyLiftedEvents = () => {
            return !!($gamePlayer._liftedEvent);
        }; this.Events.preventAutoFill = () => { };
        this.Events.p2pp = () => { return false; };

    }

    /** Base culling >> To be extended by other plugins */
    baseCulling() {
        if (!this._doCulling) return;
        const mx = ($gameMap._displayX - 4) | 0;
        const my = ($gameMap._displayY - 4) | 0;
        const mwx = (mx + OcRam._screenTWidth + 8) | 0;
        const mhy = (my + OcRam._screenTHeight + 8) | 0;
        this._cull = [
            mx, my,
            mwx, mhy,
            mwx.mod($gameMap.width()), mhy.mod($gameMap.height())
        ];
    }

    /** Get player actor id */
    playerActorId() {
        return this.playerCharacter().getActor()._actorId;
    }

    /**
     * Is given x and y in screen right now (with 4 tile marginal)?
     * @param {any} x
     * @param {any} y
     */
    isInScreen(x, y) { return true; }

    /**
     * Is url available?
     * @param {String} url
     * @param {Function} succes_cb
     * @param {Function} error_cb
     */
    isUrlAvailable(url, succes_cb, error_cb) {

        // Check if image is already in cache
        const cache = url.includes("/system/") ? ImageManager._system : ImageManager._cache;
        if (cache[url]) { succes_cb(url); return; }

        // Else check if url available - No need to load whole file...
        // Let's assume it is in desired format and not corrupted etc...
        const xhr = new XMLHttpRequest();
        xhr.open("HEAD", url);
        xhr.onload = () => succes_cb(url);
        xhr.onerror = () => error_cb(url);
        xhr.send();

    }

    /** Make copy from object... */
    makeCopy(p) {
        return { ...p };
    }
    deepCopy(obj) {
        return JsonEx.makeDeepCopy(obj);
    }

    /**
     * Get direction to right, if diagonal round it.
     * @param {Number} dir
     */
    rightDir90(dir) {
        switch (dir) {
            case 2: case 1: return 4;
            case 4: case 7: return 8;
            case 6: case 3: return 2;
            case 8: case 9: return 6;
        } return 0;
    }

    /**
     * Get direction to left, if diagonal round it.
     * @param {Number} dir
     */
    leftDir90(dir) {
        switch (dir) {
            case 2: case 3: return 6;
            case 4: case 1: return 2;
            case 6: case 9: return 8;
            case 8: case 7: return 4;
        } return 0;
    }

    /** By default will always return game player. OcRam_Local_Coop will override this.  */
    playerCharacter() {
        return $gamePlayer;
    }

    /**
     * Return true if parameter is omitted.
     * @param {any} p
     */
    isOmitted(p) {
        return p == null || p == undefined;
    }

    /**
     * Force any object to boolean. Return false if fails.
     * @param {Object} obj
     */
    getBoolean(obj) {
        if (!obj) return false; obj = obj.toString().toLowerCase();
        return (obj == "true" && obj != "0") ? true : false;
    }

    /**
     * Force any object to float. Return 0 if fails.
     * @param {Object} obj
     */
    getFloat(obj) {
        return isNaN(obj - parseFloat(obj)) ? 0 : parseFloat(obj);
    }

    /**
     * Force any object to array. Return [] if everything fails.
     * @param {Object} obj Array as any (also accepted in String format).
     * @param {Array} default_values Default values to be used
     */
    getArray(obj, default_values) {
        if (Array.isArray(obj)) return obj;
        let tmp = eval(obj); if (Array.isArray(tmp)) return tmp;
        if (!default_values || !Array.isArray(default_values)) default_values = [];
        return default_values;
    }

    /**
     * Force any object JSON object. Returns null if JSON parsing fails.
     * @param {Object} obj JSON object (also accepted in String format).
     */
    getJSON(obj) {
        try { return JSON.parse(obj); } catch (ex) { return null; }
    }

    /**
     * Force any object to JSON array. Returns [] if JSON parsing fails.
     * @param {Object} obj JSON object array (also accepted in String format).
     */
    getJSONArray(obj) {
        let tmp = [];
        if (obj) {
            OcRam.getArray(obj, []).forEach((s) => {
                tmp.push(OcRam.getJSON(s));
            });
        } return tmp;
    }

    /**
     * Regulate RGBG -object representing RGBG values.
     * @param {Object} rgbg_obj {Red: 0, Green: 0, Blue: 0, Gray: 0}
     */
    regulateRGBG(rgbg_obj) {
        rgbg_obj.Red = parseInt(rgbg_obj.Red).clamp(-255, 255);
        rgbg_obj.Green = parseInt(rgbg_obj.Green).clamp(-255, 255);
        rgbg_obj.Blue = parseInt(rgbg_obj.Blue).clamp(-255, 255);
        rgbg_obj.Gray = parseInt(rgbg_obj.Gray).clamp(-255, 255);
        return rgbg_obj;
    }

    /**
     * Regulate hex string representing RGBA values.
     * @param {String} hex_string #rrggbbaa
     */
    regulateHexRGBA(hex_string) {
        if (hex_string.substr(0, 1) !== "#") hex_string = "#" + hex_string;
        if (hex_string.length == 7) hex_string = hex_string + "ff";
        return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex_string)[0] || "#ffffffff";
    }

    // hexToRGB & hexToRGBA Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb?rq=1

    hexToRGBA(p) {
        if (p.length < 9) p = p + "ff";
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: parseFloat(parseFloat(parseInt(result[4], 16) / 255).toFixed(2))
        } : null;
    }

    rgbaToHex(rgba) {
        return "#" + this.padHex(rgba.r) + this.padHex(rgba.g) + this.padHex(rgba.b) + this.padHex((255 * rgba.a));
    }

    padHex(p) {
        return ("00" + p.toString(16)).substr(-2);
    }

    /** Is this map set as <indoors>? Return true if it is else false. */
    isIndoors() { return this._isIndoors; }

    /**
     * Get game object (player, follower, vehicle or event) by id
     * @param {Number} event_id -1 player, -2 to -4 follower, -100 to -102 vehicle else event id
     */
    getGameObject(event_id) {
        if (event_id < -1 && event_id > -100) {
            return $gamePlayer._followers._data[-(event_id + 2)];
        } else {
            switch (event_id) {
                case -102: return $gameMap.airship();
                case -101: return $gameMap.ship();
                case -100: return $gameMap.boat();
                case -1: return $gamePlayer;
                default: return $gameMap.getEventById(event_id);
            }
        }
    }

    /**
     * Get game object id
     * @param {any} obj Game_Player, Game_Follower, Game_Vehicle or Game_Event
     */
    getGameObjectId(obj) {
        if (!obj || !obj.isPlayer) return 0;
        if (obj.isFollower()) {
            return -(obj._memberIndex + 1);
        } else if (obj.isPlayer()) {
            return -1;
        } else if (obj.isVehicle()) {
            switch (obj._type) {
                case "airship": return -100; break;
                case "ship": return -101; break;
                case "boat": return -102; break;
            }
        } else {
            return obj._eventId;
        }
    }

    /** Returns empty moveroute object as in RMMZ engine */
    emptyMoveRoute() {
        return {
            repeat: false, skippable: false, wait: false,
            list: [{ code: 0, parameters: [] }]
        };
    }

    /** Shortcut to: $gamePlayer._followers.visibleFollowers() */
    followers() {
        return $gamePlayer && $gamePlayer._followers ? $gamePlayer._followers.visibleFollowers() : [];
    }

    /**
     * Get X dir and Y dir from diagonal dir (1, 3, 7 or 9)
     * @param {any} direction
     */
    getHorzVert(direction) {
        switch (direction) {
            case 1: return [4, 2]; break;
            case 3: return [6, 2]; break;
            case 7: return [4, 8]; break;
            case 9: return [6, 8]; break;
        } return [0, 0];
    }

    /** Shortcut to: SceneManager._scene */
    scene() {
        return SceneManager._scene;
    }

    /**
     * Return true if current scene constructor is desired scene else returns false
     * Usage example: OcRam.isCurrentScene(Scene_Map)
     * @param {Object} scene
     */
    isCurrentScene(scene) {
        return SceneManager._scene && SceneManager._scene.constructor === scene;
    }

    /**
     * Draw an icon to a bitmap on given position.
     * @param {Bitmap} bitmap
     */
    drawIcon(bitmap, icon_id, x, y) {
        const icon_bitmap = ImageManager.loadSystem("IconSet");
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (icon_id % 16) * pw;
        const sy = ((icon_id / 16) | 0) * ph;
        bitmap.blt(icon_bitmap, sx, sy, pw, ph, x, y);
    }

    /**
     * Set self switch to any event in current map.
     * @param {any} event Event id or name
     * @param {String} key Key A, B, C or D
     * @param {Boolean} value true/false
     */
    setSelfSwitch(event, key, value) {
        if (isNaN(event)) {
            $gameMap.getEventsByName(event).forEach(ev => {
                $gameSelfSwitches.setValue([$gameMap._mapId, ev._eventId, key], value);
            });
        } else {
            $gameSelfSwitches.setValue([$gameMap._mapId, event, key], value);
        }
    }

    /**
     * Run common event with desired id.
     * @param {Number} ce_id Common event id
     */
    runCE(ce_id) {
        if ($gameTemp.isCommonEventReserved()) { //let tmpId = ce_id; let tc = this;
            setTimeout(() => { //tc.runCE(tmpId);
                this.runCE(ce_id);
            }, 17);
        } else {
            $gameTemp.reserveCommonEvent(ce_id);
        }
    }

    /**
     * Returns character sprite by event id
     * @param {Number} event_id
     */
    getSpriteByEventId(event_id) {
        let sc = SceneManager._scene; let ret = null;
        if (!sc) return ret;
        if (!sc._spriteset) return ret;
        sc = sc._spriteset;
        if (!sc._characterSprites) return ret;
        sc = sc._characterSprites;
        sc.forEach(cs => {
            if (cs._character._eventId == event_id) ret = cs;
        }); return ret;
    }

    /**
     * Get direction to character from given point.
     * @param {Game_Character} character
     * @param {Number} x
     * @param {Number} y
     */
    getDirectionToCharacterFromXY (character, x, y) {
        const deltaX1 = character.deltaXFrom(x);
        const deltaY1 = character.deltaYFrom(y);
        if (deltaY1 > 0) {
            return (deltaX1 < 0) ? 1 : (deltaX1 > 0) ? 3 : 2;
        } else if (deltaX1 < 0) {
            return (deltaY1 < 0) ? 7 : (deltaY1 > 0) ? 1 : 4;
        } else if (deltaX1 > 0) {
            return (deltaY1 < 0) ? 9 : (deltaY1 > 0) ? 3 : 6;
        } else if (deltaY1 < 0) {
            return (deltaX1 < 0) ? 7 : (deltaX1 > 0) ? 9 : 8;
        } return 0;
    }

    /**
     * Add plugin to OcRam_Core. Call it later like this: OcRam.Plugin_Name
     * @param {String} name Name of the plugin (without OcRam_) prefix
     * @param {Float} version Version of the plugin [Major].[Minor]
     */
    addPlugin(name, version) {

        this[name] = {}; let new_plugin = this[name];
        Imported["OcRam_" + name] = true; this.plugins.push(name);

        new_plugin.name = name; new_plugin.version = version;
        new_plugin.parameters = PluginManager.parameters("OcRam_" + new_plugin.name);

        // Should be overwritten in plugin itself...
        new_plugin.clearPluginData = () => { };
        new_plugin.savePluginData = gs => { };
        new_plugin.loadPluginData = gs => { };
        new_plugin.onMapStart = sm => { };
        new_plugin.onMapTerminate = sm => { };
        new_plugin.createLowerMapLayer = sm => { };
        new_plugin.createLowerBattleLayer = sb => { };
        new_plugin.onMapLoaded = sm => { };

        if (this.getBoolean(new_plugin.parameters["Debug mode"])) {
            /** Debug function enabled */
            new_plugin.debug = function () {
                let args = [].slice.call(arguments);
                args.unshift("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", ":");
                console.log.apply(console, args);
            }; console.log("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", "Debug mode:", "Enabled");
            console.log("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", "Parameters:", new_plugin.parameters);
        } else { /** Debug function disabled - No extra if clauses needed !!! */
            new_plugin.debug = () => { };
        }

        /**
         * Extend any function defined in cb.
         * @param {Object} c Base class
         * @param {String} b Base function
         * @param {Function} cb Callback
         */
        new_plugin.extend = (c, b, cb) => {
            let cb_name = c.name + "_" + b;
            if (c[b]) {
                new_plugin[cb_name] = c[b];
                c[b] = function () {
                    return cb.apply(this, arguments);
                };
            } else {
                new_plugin[cb_name] = c.prototype[b];
                c.prototype[b] = function () {
                    return cb.apply(this, arguments);
                };
            }
        };

    }

    /**
     * Check if self switches A, B, C or D are on given event ids.
     * @param {Array} event_id_array
     * @param {String} page
     */
    isSelfSwitchOn(event_id_array, page) {
        let ret = true;
        event_id_array.some(ev_id => {
            if (!$gameSelfSwitches.value([$gameMap._mapId, ev_id, page])) ret = false;
        }); return ret;
    }

    /** Read map notetags (uses tileset as fallback) */
    readMapNotetags() {
        if (DataManager.isEventTest()) return;
        this.refreshIndoorsFlag(); // Indoors used by several plugins
    }

    /**
     * Extends any function
     * @param {Object} c Base class
     * @param {String} b Base function
     * @param {Function} cb Callback
     */
    extend(c, b, cb) {
        let cb_name = c.name + "_" + b;
        if (c[b]) {
            this[cb_name] = c[b];
            c[b] = function () {
                return cb.apply(this, arguments);
            };
        } else {
            this[cb_name] = c.prototype[b];
            c.prototype[b] = function () {
                return cb.apply(this, arguments);
            };
        }
    }

    /** Debug is disabled by default for optimization reasons */
    debug() { /* Will be extended if debug is enabled */ }

    /** Refresh indoors flag - NOW */
    refreshIndoorsFlag() {
        if ($dataMap.meta["outdoors"]) {
            this.debug("Outdoors meta tag found in MAP note field!", $dataMap.meta);
            this._isIndoors = false;
        } else if ($dataMap.meta["indoors"] !== undefined) {
            this.debug("Indoors meta tag found in MAP note field!", $dataMap.meta); this._isIndoors = true;
        } else {
            if ($dataTilesets[$dataMap.tilesetId].meta["indoors"] !== undefined) {
                this.debug("Indoors meta tag found in TILESET note field!", $dataTilesets[$dataMap.tilesetId].meta); this._isIndoors = true;
            } else {
                this.debug("Indoors meta tag was NOT found!", undefined); this._isIndoors = false;
            }
        }
    }

} let OcRam = new OcRam_Core(); // Create new OcRam_Core!

// ----------------------------------------------------------------------------
// OcRam_Core prototyping / aliasing etc...
// ============================================================================
(function () {

    // ----------------------------------------------------------------------------
    // Plugin init (parameters and private variables)
    // ============================================================================
    const _this = this; this.parameters = PluginManager.parameters('OcRam_' + this.name);
    const _showBGS23Volume = OcRam.getBoolean(this.parameters['Show BGS2/3 Volume']);
    const _bgs23Caption = this.parameters['BGS2/3 Option Caption'] || 'Weather Volume';
    const _mergeMEtoBGM = OcRam.getBoolean(this.parameters['Merge ME/BGM Volume']);
    const _enableDPad = OcRam.getBoolean(this.parameters['Enable D-pads']);
    const _eventThroughFix = OcRam.getBoolean(this.parameters['Event through fix']);

    const _useRegionPassFeat = OcRam.getBoolean(this.parameters['Region passabilities']);
    const _passALL_RID = Number(this.parameters['Allow ALL']);
    const _passPlayer_RID = Number(this.parameters['Allow player']);
    const _passEvents_RID = Number(this.parameters['Allow events']);
    const _blockALL_RID = Number(this.parameters['Block ALL']);
    const _blockPlayer_RID = Number(this.parameters['Block player']);
    const _blockEvents_RID = Number(this.parameters['Block events']);

    if (this.getBoolean(this.parameters["Debug mode"])) { // Debug enabled?
        OcRam_Core.prototype.debug = function () {
            let args = [].slice.call(arguments);
            args.unshift("OcRam_" + this.name + " (v" + this.version + ")", ":");
            console.log.apply(console, args);
        }
    }

    let _screenTileXOptimizer = 0; let _screenTileYOptimizer = 0; let _dashing = false;
    _screenTileXOptimizer = Math.round((Graphics.width / 48) * 16) / 16;
    _screenTileYOptimizer = Math.round((Graphics.height / 48) * 16) / 16;

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    const canPassDiagonally = (x, y, d) => {
        const hv = OcRam.getHorzVert(d);
        if ($gameMap.isPassable(x, y, hv[1]) && $gameMap.isPassable(x, $gameMap.roundXWithDirection(y, hv[1]), hv[0])) {
            return true;
        } if ($gameMap.isPassable(x, y, hv[0]) && $gameMap.isPassable($gameMap.roundXWithDirection(x, hv[0]), y, hv[1])) {
            return true;
        } return false;
    };

    // Util function for character.frontXY/behindXY/leftXY/rightXY
    const getFBLR_XYP = (x, y, d) => {
        const rx = d == 4 ? x - 1 : d == 6 ? x + 1 : x;
        const ry = d == 8 ? y - 1 : d == 2 ? y + 1 : y;
        return [rx, ry];
    };

    // Used to get XY for the jump extensions...
    const getJumpXY = d => {
        let x = 0; let y = 0;
        switch (d) {
            case 1: x = -1; y = 1; break;
            case 2: x = 0; y = 1; break;
            case 3: x = 1; y = 1; break;
            case 4: x = -1; y = 0; break;
            case 5: x = 0; y = 0; break;
            case 6: x = 1; y = 0; break;
            case 7: x = -1; y = -1; break;
            case 8: x = 0; y = -1; break;
            case 9: x = 1; y = -1; break;
        } return [x, y];
    };

    // No culling is needed (small map)!
    const noCullingFuncs = () => {
        OcRam.baseCulling = function () { /* No culling... */ };
        OcRam.isInScreen = function (x, y) { return true; /* No culling... */ };
    };

    // For VERY optimized culling! We redefine cull functions to match the map properties without extra 'iffing' in update loops, 
    // which are called (depending on map - thousands of times) every time player - / event moves!!
    const redefineCullFunctions = gm => {

        OcRam._doCullX = !(gm.width() < OcRam._screenTWidth * 1.5);
        OcRam._doCullY = !(gm.height() < OcRam._screenTHeight * 1.5);
        OcRam._doCulling = OcRam._doCullX || OcRam._doCullY;

        const sw = OcRam._screenTWidth + 8; const sh = OcRam._screenTHeight + 8;

        if (gm.isLoopVertical() || gm.isLoopHorizontal()) { // Is loopped map?
            const gwm = $gameMap.width() - 4; const ghm = $gameMap.height() - 4;
            if (OcRam._doCullX && OcRam._doCullY) {
                OcRam.baseCulling = function () {
                    if (!this._doCulling) return;
                    const mx = ($gameMap._displayX - 4) | 0;
                    const my = ($gameMap._displayY - 4) | 0;
                    const mwx = (mx + sw) | 0;
                    const mhy = (my + sh) | 0;
                    this._cull = [
                        mx, my,
                        mwx, mhy,
                        mwx.mod($gameMap.width()), mhy.mod($gameMap.height())
                    ];
                }; OcRam.isInScreen = function (x, y) {
                    const x_is = (OcRam._cull[0] < 0) ?
                        (x < OcRam._cull[4] || x > gwm) :
                        (OcRam._cull[2] > OcRam._cull[4]) ?
                            (x < OcRam._cull[4] || x > OcRam._cull[0]) :
                            !(x > OcRam._cull[4] || x < OcRam._cull[0]);
                    const y_is = (OcRam._cull[1] < 0) ?
                        (y < OcRam._cull[5] || y > ghm) :
                        (OcRam._cull[3] > OcRam._cull[5]) ?
                            (y < OcRam._cull[5] || y > OcRam._cull[1]) :
                            !(y > OcRam._cull[5] || y < OcRam._cull[1]);
                    return x_is && y_is;
                };
            } else if (OcRam._doCullX) { // Horizontally culled map
                OcRam.baseCulling = function () {
                    if (!this._doCulling) return;
                    const mx = ($gameMap._displayX - 4) | 0;
                    const mwx = (mx + sw) | 0;
                    this._cull = [
                        mx, 0,
                        mwx, 0,
                        mwx.mod($gameMap.width()), 0
                    ];
                }; OcRam.isInScreen = function (x, y) {
                    const x_is = (OcRam._cull[0] < 0) ?
                        (x < OcRam._cull[4] || x > gwm) :
                        (OcRam._cull[2] > OcRam._cull[4]) ?
                            (x < OcRam._cull[4] || x > OcRam._cull[0]) :
                            !(x > OcRam._cull[4] || x < OcRam._cull[0]);
                    return x_is;
                };
            } else if (OcRam._doCullY) { // Vertically culled map
                OcRam.baseCulling = function () {
                    if (!this._doCulling) return;
                    const my = ($gameMap._displayY - 4) | 0;
                    const mhy = (my + sh) | 0;
                    this._cull = [
                        0, my,
                        0, mhy,
                        0, mhy.mod($gameMap.height())
                    ];
                }; OcRam.isInScreen = function (x, y) {
                    const y_is = (OcRam._cull[1] < 0) ?
                        (y < OcRam._cull[5] || y > ghm) :
                        (OcRam._cull[3] > OcRam._cull[5]) ?
                            (y < OcRam._cull[5] || y > OcRam._cull[1]) :
                            !(y > OcRam._cull[5] || y < OcRam._cull[1]);
                    return y_is;
                };
            } else {
                noCullingFuncs();
            }
        } else { // No map loop
            if (OcRam._doCullX && OcRam._doCullY) { // Cull both - horizontal and vertical
                OcRam.baseCulling = function () {
                    const mx = ($gameMap._displayX - 4) | 0; const my = ($gameMap._displayY - 4) | 0;
                    const mwx = (mx + sw) | 0; const mhy = (my + sh) | 0;
                    this._cull = [mx, my, mwx, mhy, 0, 0];
                }; OcRam.isInScreen = function (x, y) {
                    if (x > OcRam._cull[2] || x < OcRam._cull[0]) return false;
                    if (y > OcRam._cull[3] || y < OcRam._cull[1]) return false;
                    return true;
                };
            } else if (OcRam._doCullX) { // Cull only horizontal
                OcRam.baseCulling = function () {
                    const mx = ($gameMap._displayX - 4) | 0; const mwx = (mx + sw) | 0; this._cull = [mx, 0, mwx, 0, 0, 0];
                }; OcRam.isInScreen = function (x, y) { if (x > OcRam._cull[2] || x < OcRam._cull[0]) return false; return true; };
            } else if (OcRam._doCullY) {
                OcRam.baseCulling = function () { // Cull only vertical
                    const my = ($gameMap._displayY - 4) | 0; const mhy = (my + sh) | 0; this._cull = [0, my, 0, mhy, 0, 0];
                }; OcRam.isInScreen = function (x, y) { if (y > OcRam._cull[3] || y < OcRam._cull[1]) return false; return true; };
            } else {
                noCullingFuncs();
            }
        }

        OcRam.baseCulling(); // Do initial culling...

    };

    // ----------------------------------------------------------------------------
    // RMMZ core extensions to existing methods
    // ============================================================================

    // Add BGS2 and BGS3 to RMMZ ConfigManager
    if (_showBGS23Volume) { // Re-define BGS2/3 getters and setters - if BGS2/3 volume control is disabled
        Object.defineProperty(ConfigManager, 'bgsVolume23', {
            get: function () {
                return AudioManager.bgsVolume23;
            },
            set: function (value) {
                AudioManager.bgsVolume23 = value;
            },
            configurable: true
        });
    } else { // Override ConfigManager.bgsVolume
        Object.defineProperty(ConfigManager, 'bgsVolume', {
            get: function () {
                return AudioManager.bgsVolume;
            },
            set: function (value) {
                AudioManager.bgsVolume = value;
                AudioManager.bgsVolume23 = value;
            },
            configurable: true
        });
    }

    if (_mergeMEtoBGM) {
        Object.defineProperty(ConfigManager, "bgmVolume", {
            get: function () {
                return AudioManager.bgmVolume;
            },
            set: function (value) {
                AudioManager.bgmVolume = value;
                AudioManager.meVolume = value;
            },
            configurable: true
        });
        Object.defineProperty(AudioManager, "meVolume", {
            get: function () {
                return this._bgmVolume;
            },
            set: function (value) {
                this._meVolume = this._bgmVolume;
                this.updateMeParameters(this._currentMe);
            },
            configurable: true
        });
    }

    this.extend(TouchInput, "_onMouseUp", function () {
        _this["TouchInput__onMouseUp"].apply(this, arguments);
        this._mouseMidPressed = false;
    });

    this.extend(ConfigManager, "makeData", function () {
        let config = _this["ConfigManager_makeData"].apply(this, arguments);
        config.bgsVolume23 = this.bgsVolume23;
        return config;
    });

    this.extend(ConfigManager, "applyData", function (config) {
        _this["ConfigManager_applyData"].apply(this, arguments);
        if (_showBGS23Volume) {
            this.bgsVolume23 = this.readVolume(config, 'bgsVolume23');
        } else {
            this.bgsVolume23 = this.readVolume(config, 'bgsVolume');;
        }
    });

    // Add BGS2/3 volume control to options if enabled...
    this.extend(Window_Options, "addVolumeOptions", function () {
        if (_mergeMEtoBGM) {
            this.addCommand(TextManager.bgmVolume, "bgmVolume");
            this.addCommand(TextManager.bgsVolume, "bgsVolume");
            this.addCommand(TextManager.seVolume, "seVolume");
        } else {
            _this["Window_Options_addVolumeOptions"].apply(this, arguments);
        } if (_showBGS23Volume) this.addCommand(_bgs23Caption, 'bgsVolume23');
    });

    this.extend(Game_Event, "setupPage", function () {

        _this["Game_Event_setupPage"].apply(this, arguments);

        let cmts = this.getComments();
        if (cmts && cmts.length > 0) {
            cmts.forEach(c => {
                if (('' + c.parameters[0]) == "<allow_los>") this._allowLoS = true;
            });
        }

    });

    /** Stop all audio - Including our new 2 channels */
    this.extend(AudioManager, "stopAll", function () {
        _this["AudioManager_stopAll"].apply(this, arguments);
        this.stopBgs2(); this.stopBgs3();
    });

    /** Check errors also in new BGS channels */
    this.extend(AudioManager, "checkErrors", function () {
        _this["AudioManager_checkErrors"].apply(this, arguments);
        if (this._bgsBuffer2 && this._bgsBuffer2.isError()) this.throwLoadError(this._bgsBuffer2);
        if (this._bgsBuffer3 && this._bgsBuffer3.isError()) this.throwLoadError(this._bgsBuffer3);
    });

    /** Handle new channels also in Game_System (Save/Load) */
    this.extend(Game_System, "initialize", function () {
        _this["Game_System_initialize"].apply(this, arguments);
        this._bgsOnSave2 = null; this._bgsOnSave3 = null;
    });

    /** Is autosaving? */
    this.extend(Scene_Base, "executeAutosave", function () {
        _this._autoSaving = true;
        _this["Scene_Base_executeAutosave"].apply(this, arguments);
        _this._autoSaving = false;
    });

    /** Menu called? */
    this.extend(Scene_Map, "callMenu", function () {
        _this["Scene_Map_callMenu"].apply(this, arguments);
        OcRam.debug("Menu called:", true);
        OcRam._menuCalled = true;
    }); this.extend(Scene_Save, "initialize", function () {
        _this["Scene_Save_initialize"].apply(this, arguments);
        OcRam._menuCalled = true;
    });

    if (_eventThroughFix) { /** Event "Through" fix for player/event touch triggers */
        this.extend(Game_Player, "canMove", function () {
            const ret = _this["Game_Player_canMove"].apply(this, arguments);
            const ev = $gameMap.event($gameMap._interpreter.eventId());
            if (!ev) return ret; if (ev._trigger < 1 || ev._trigger > 2) return ret;
            if (!!$gameMap._interpreter._list.find(function (itm) {
                switch (itm.code) {
                    case 401: case 402: case 404: case 103: case 104: case 205: return true;
                }
            })) return false;
            if (ev.isThrough()) return true;
        });
    }

    /** Just transfered? */
    this.extend(Game_Player, "reserveTransfer", function () {
        _this["Game_Player_reserveTransfer"].apply(this, arguments);
        OcRam._justTransferedAny = true; // Also triggers in SAME MAP!
        if (this._newMapId !== $gameMap.mapId()) OcRam._justTransfered = true;
    });

    // ----------------------------------------------------------------------------
    // "Must override" functions (clear-, load- and savePluginData)
    // ============================================================================
    // "To title command"
    this.extend(Scene_GameEnd, "commandToTitle", function () {
        OcRam._justTransfered = false; OcRam._justTransferedAny = false;
        OcRam._justLoaded = false; OcRam._wasMenuCalled = false;
        OcRam.plugins.forEach(p => { OcRam[p].clearPluginData(); });
        _this["Scene_GameEnd_commandToTitle"].apply(this, arguments);
    });

    // Return to Title Screen
    this.extend(Game_Interpreter, "command354", function () {
        OcRam._justTransfered = false; OcRam._justTransferedAny = false;
        OcRam._justLoaded = false; OcRam._wasMenuCalled = false;
        OcRam.plugins.forEach(p => { OcRam[p].clearPluginData(); });
        _this["Game_Interpreter_command354"].apply(this, arguments); return true;
    });

    // Game over
    this.extend(Scene_Gameover, "gotoTitle", function () {
        OcRam._justTransfered = false; OcRam._justTransferedAny = false;
        OcRam._justLoaded = false; OcRam._wasMenuCalled = false;
        OcRam.plugins.forEach(p => { OcRam[p].clearPluginData(); });
        _this["Scene_Gameover_gotoTitle"].apply(this, arguments);
    });

    // Save plugin data
    this.extend(Game_System, "onBeforeSave", function () {
        _this["Game_System_onBeforeSave"].apply(this, arguments);
        this._bgsOnSave2 = AudioManager.saveBgs2();
        this._bgsOnSave3 = AudioManager.saveBgs3();
        OcRam.plugins.forEach(p => { OcRam[p].savePluginData(this); });
    });

    // Load plugin data
    this.extend(Game_System, "onAfterLoad", function () {
        OcRam._justLoaded = true;
        _this["Game_System_onAfterLoad"].apply(this, arguments);
        OcRam.plugins.forEach(p => { OcRam[p].loadPluginData(this); });
    });

    // Optimize screenTileX/Y it's triggered VERY often - Only need to compute after map init (not each frame!)
    this.extend(Game_Map, "initialize", function () {
        _screenTileXOptimizer = Math.round((Graphics.width / OcRam.twh[0]) * 16) / 16;
        _screenTileYOptimizer = Math.round((Graphics.height / OcRam.twh[1]) * 16) / 16;
        _this["Game_Map_initialize"].apply(this, arguments);
    });

    // onMapStart
    this.extend(Scene_Map, "start", function () {
        _this["Scene_Map_start"].apply(this, arguments);
        redefineCullFunctions($gameMap);
        OcRam.plugins.forEach(p => { OcRam[p].onMapStart(this); });
        requestAnimationFrame(() => {
            OcRam._menuCalled = false;
            setTimeout(function () {
                OcRam._justTransfered = false;
                OcRam._justTransferedAny = false;
                OcRam._justLoaded = false;
            }, 200);
        }); OcRam.scene().update(); // onMapLoaded >> createLowerLayer >> start >> onTransferEnd
    });

    // onMapTerminate
    this.extend(Scene_Map, "terminate", function () {
        OcRam.plugins.forEach(p => { OcRam[p].onMapTerminate(this); });
        _this["Scene_Map_terminate"].apply(this, arguments);
    });

    // createLowerMapLayer
    this.extend(Spriteset_Map, "createLowerLayer", function () {
        _this["Spriteset_Map_createLowerLayer"].apply(this, arguments);
        OcRam.plugins.forEach(p => { OcRam[p].createLowerMapLayer(this); });
    });

    // createLowerBattleLayer
    this.extend(Spriteset_Battle, "createLowerLayer", function () {
        _this["Spriteset_Battle_createLowerLayer"].apply(this, arguments);
        OcRam.plugins.forEach(p => { OcRam[p].createLowerBattleLayer(this); });
    });

    // onMapLoaded - Refresh tile dimensions, menu called and indoors flag */
    this.extend(Scene_Map, "onMapLoaded", function () {

        OcRam.readMapNotetags();

        _this["Scene_Map_onMapLoaded"].apply(this, arguments);

        $gameMap._pixelWidth = $gameMap.width() * OcRam.twh[0];
        $gameMap._pixelHeight = $gameMap.height() * OcRam.twh[1];

        if (!OcRam._menuCalled) {
            OcRam.twh = [$gameMap.tileWidth() - 0, $gameMap.tileHeight() - 0];
            OcRam.twh50 = [OcRam.twh[0] * 0.5, OcRam.twh[1] * 0.5];
            OcRam._screenTWidth = Graphics.width / OcRam.twh[0];
            OcRam._screenTHeight = Graphics.height / OcRam.twh[1];
            OcRam.debug("Tile w/h:", OcRam.twh, "Screen in tiles: ", OcRam._screenTWidth, " x ", OcRam._screenTHeight);
        }

        OcRam.plugins.forEach(p => {
            OcRam[p].onMapLoaded(this);
        });

    });

    // "No ladders" feature - We overwrite isOnLadder IF needed to avoid extra if:fing!
    const Game_CharacterBase_isOnLadder_OC = Game_CharacterBase.prototype.isOnLadder;
    this.extend(Game_Event, "setupPageSettings", function () {
        _this["Game_Event_setupPageSettings"].apply(this, arguments);
        const cmts = this.getStringComments();
        const tag_found = !!(cmts.find(c => {
            if (c == "<no_ladders>") return true;
        })); if (tag_found) {
            this.isOnLadder = () => { return false; }; // Overwrite!
        } else {
            this.isOnLadder = () => {
                return Game_CharacterBase_isOnLadder_OC.call(this);
            };
        }
    });

    /*this.extend(Scene_Boot, "isReady", function () {
        let ret = _this["Scene_Boot_isReady"].apply(this, arguments);
        if (ret) { 
            // Boot is ready and database is loaded...
        } return ret;
    });*/

    // ----------------------------------------------------------------------------
    // New methods to RMMZ core classes
    // ============================================================================

    // By default updateLifted does nothing!
    Game_Character.prototype.updateLifted = function () { };

    TouchInput._onMiddleButtonDown = function (event) {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        this._x = x; this._y = y; this._date = Date.now();
        this._mouseMidPressed = true; const pc = $gamePlayer; // OcRam.playerCharacter();
        if ($gameMap && pc._liftedEvent) {
            const dx = ((TouchInput.x / OcRam.twh[0]) | 0) + $gameMap.displayX();
            const dy = ((TouchInput.y / OcRam.twh[1]) | 0) + $gameMap.displayY();
            let d = pc.findDirectionTo(dx, dy);
            if (d % 2) {
                d = OcRam.getHorzVert(d)[0];
            } pc.setDirection(d);
            return;
        } TouchInput._onLeftButtonDown(event);
        setTimeout(() => {
            this._mousePressed = false;
        }, 100);
    };

    Game_Event.prototype.thisCulling = function () {
        if (this._lightData) {
            if (this._offScreen) { // Is it in screen now?
                if (OcRam.isInScreen(this._x, this._y)) this._offScreen = false;
            } else { // Is it off screen now?
                if (!OcRam.isInScreen(this._x, this._y)) this._offScreen = true;
            }
        }
    };

    // Get actor id which started the event
    Game_Map.prototype.currentActorId = function () {
        return $gameParty.leader().actorId();
    };

    // Used to optimize some updates in OcRam_Lights and OcRam_Passges!
    Game_Player.prototype.refreshBushDepth = function () {
        Game_CharacterBase.prototype.refreshBushDepth.call(this); OcRam.baseCulling();
    }; Game_Event.prototype.refreshBushDepth = function () {
        Game_CharacterBase.prototype.refreshBushDepth.call(this); this.thisCulling();
    };

    // Simple test if character is a player, follower, event or vehicle
    Game_CharacterBase.prototype.isPlayer = function () { return false; };
    Game_CharacterBase.prototype.isFollower = function () { return false; };
    Game_CharacterBase.prototype.isVehicle = function () { return false; };
    Game_CharacterBase.prototype.isEvent = function () { return false; };
    Game_Player.prototype.isPlayer = function () { return true; };
    Game_Follower.prototype.isFollower = function () { return true; };
    Game_Vehicle.prototype.isVehicle = function () { return true; };
    Game_Event.prototype.isEvent = function () { return true; };

    // Scene tests
    Scene_Base.prototype.isBoot = function () { return false; };
    Scene_Base.prototype.isTitle = function () { return false; };
    Scene_Base.prototype.isMap = function () { return false; };
    Scene_Title.prototype.isTitle = function () { return true; };
    Scene_Map.prototype.isMap = function () { return true; };
    Scene_Boot.prototype.isBoot = function () { return true; };

    /** Make copy of sprite object: let my_copy = my_sprite.makeCopy(); */
    Sprite.prototype.makeCopy = function () {
        return _this.makeCopy(this);
    };

    /**
     * Shortcut for: Is character at given point?
     * @param {any} x
     * @param {any} y
     */
    Game_CharacterBase.prototype.isXY = function (x, y) {
        return Math.round(this._x) == x && Math.round(this._y) == y;
    };

    /**
     * Show desired balloon.
     * @param {any} balloon_id 1 = Exclamation, 2 = Question, 3 = Music Note, 4 = Heart, 5 = Anger, 6 = Sweat, 
     * 7 = Frustration, 8 = Silence, 9 = Light bulb, 10 = Zzz, 11 = User1, 12 = User2, 13 = User3, 14 = User4, 16 = User5
     * @param {any} wait Wait for completion?
     */
    Game_Character.prototype.showBalloon = function (balloon_id, wait) {
        $gameTemp.requestBalloon(this, balloon_id);
        if (!!wait) $gameMap._interpreter.setWaitMode("balloon");
    };

    /** Get SPRITE from character */
    Game_CharacterBase.prototype.getSprite = function () {
        let sc = SceneManager._scene; let ret = null;
        if (!sc) return ret;
        if (!sc._spriteset) return ret;
        sc = sc._spriteset;
        if (!sc._characterSprites) return ret;
        sc = sc._characterSprites;
        sc.forEach(cs => {
            if (cs._character === this) ret = cs;
        }); return ret;
    };

    /** Randomly jump 1 tile (if passable!) */
    Game_Character.prototype.jumpRandomly = function () {

        let arr_dirs = [];

        if (this.canPass(this._x, this._y, 1, this._higherLevel)) arr_dirs.push(1);
        if (this.canPass(this._x, this._y, 2, this._higherLevel)) arr_dirs.push(2);
        if (this.canPass(this._x, this._y, 3, this._higherLevel)) arr_dirs.push(3);
        if (this.canPass(this._x, this._y, 4, this._higherLevel)) arr_dirs.push(4);
        if (this.canPass(this._x, this._y, 6, this._higherLevel)) arr_dirs.push(6);
        if (this.canPass(this._x, this._y, 7, this._higherLevel)) arr_dirs.push(7);
        if (this.canPass(this._x, this._y, 8, this._higherLevel)) arr_dirs.push(8);
        if (this.canPass(this._x, this._y, 9, this._higherLevel)) arr_dirs.push(9);

        if (arr_dirs.length < 1) arr_dirs.push(5);
        let d = arr_dirs[Math.randomInt(arr_dirs.length)];
        let xy = getJumpXY(d); this.jump(xy[0], xy[1]);

    };

    /**
     * Is facing towards character?
     * @param {any} character
     */
    Game_Character.prototype.isFacing = function (character) {
        const sx = this.deltaXFrom(character.x);
        const sy = this.deltaYFrom(character.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            return this._direction == (sx > 0 ? 4 : 6);
        } else if (sy !== 0) {
            return this._direction == (sy > 0 ? 8 : 2);
        } return false;
    };

    /**
     * Jump towards to character
     * @param {Object} character Jump towards this character
     */
    Game_Character.prototype.jumpTowards = function (character) {
        if (!$gameMap) return;
        const d = this.findDirectionTo(character._x, character._y);
        let xy = getJumpXY(d); this.jump(xy[0], xy[1]);
    };

    /**
     * Jump away from character
     * @param {Object} character Jump away from this character
     */
    Game_Character.prototype.jumpAway = function (character) {
        if (!$gameMap) return;
        const d = this.findDirectionTo(character._x, character._y);
        let xy = getJumpXY(this.reverseDir(d)); this.jump(xy[0], xy[1]);
    };

    /**
     * Jump to given x,y or character.
     * @param {any} p1 Character /or/ X coordinate
     * @param {any} p2 y IF p1 was "x"
     */
    Game_Character.prototype.jumpTo = function (p1, p2) {
        const is_character = (p1 && p1.isXY) ? true : false;
        const x = is_character ? p1._x : p1;
        const y = is_character ? p1._y : p2;
        this.jump(x - this._x, y - this._y);
    };

    /** Get actor base on this character - undefined if not actor character */
    Game_Character.prototype.getActor = function () { return; };
    Game_Player.prototype.getActor = function () {
        if (!$gameParty || !$gameParty.battleMembers) return;
        return $gameParty.battleMembers()[0];
    }; Game_Follower.prototype.getActor = function () {
        if (!$gameParty || !$gameParty.battleMembers) return;
        return $gameParty.battleMembers()[this._memberIndex];
    };

    /** Get character based on actor! */
    Game_Actor.prototype.getCharacter = function () {
        if ($gamePlayer.getActor()._actorId == this._actorId) return $gamePlayer;
        let ret_obj = OcRam.followers().find(f => {
            return (f.getActor()._actorId == this._actorId);
        }); return ret_obj;
    };

    /** Get Game_Event in event editor like: this.event(); */
    Game_Interpreter.prototype.event = function () {
        return ($gameMap) ? $gameMap.event(this._eventId) : null;
    };

    /**
     * Get Game_Map events by name
     * @param {String} event_name
     */
    Game_Map.prototype.getEventsByName = function (event_name) {
        return this._events.filter(ev => {
            return (ev) ? ev.event().name == event_name : false;
        });
    };

    /**
     * Get Game_Map event by id
     * @param {Number} event_id
     */
    Game_Map.prototype.getEventById = function (event_id) { return this.event(event_id); };

    /**
     * Is tile passable by ANY direction?
     * @param {Number} x
     * @param {Number} y
     */
    Game_Map.prototype.isTilePassable = function (x, y) {
        return this.checkPassage(x, y, 0x0f);
    };

    /** Opposite to "Approach" move type.
     * @param {Game_Character} character
     */
    Game_Character.prototype.flee = function(character) {
        if (!character) character = $gamePlayer
        if (this.isNearCharacter(character)) {
            switch (Math.randomInt(6)) {
                case 0:
                case 1:
                case 2:
                case 3:
                    this.moveAwayFromCharacter(character);
                    break;
                case 4:
                    this.moveRandom();
                    break;
                case 5:
                    this.moveForward();
                    break;
            }
        } else {
            this.moveRandom();
        }
    };

    /**
     * Is this character near given character?
     * @param {Game_Character} character
     */
    Game_Character.prototype.isNearCharacter = function(character) {
        const sx = Math.abs(this.deltaXFrom(character.x));
        const sy = Math.abs(this.deltaYFrom(character.y));
        return sx + sy < 20;
    };

    /**
     * Return true if player is in range of given radius. Else returns false.
     * @param {Number} radius in tiles
     */
    Game_Event.prototype.isPlayerInRadius = function (radius) {

        // If there's no radius return false
        if (radius < 1) return false;

        const pc = OcRam.playerCharacter();

        // Check impossible
        const ax = Math.abs(pc._x - this._x); if (ax > radius) return false;
        const ay = Math.abs(pc._y - this._y); if (ay > radius) return false;
        if ((ax + ay) > (radius * 1.5)) return false; // To make radius as circle - Other wise would be square
        return pc; // PLAYER IN RADIUS !!!

    };

    /**
     * Gives circle like (smoother) range to given character.
     * @param {Object} character
     */
    Game_Character.prototype.rangeTo = function (character) {
        if (!character) return 0;
        const ax = Math.abs(character._x - this._x);
        const ay = Math.abs(character._y - this._y);
        return (!ax || !ay) ? ax + ay : ax + ay - 1;
    };

    /**
     * Gives square (4-dir based) range to given character.
     * @param {Object} character
     */
    Game_Character.prototype.sqrRangeTo = function (character) {
        if (!character) return 0;
        return Math.abs(character._x - this._x) + Math.abs(character._y - this._y);
    };

    /**
     * Get all events that are in range.
     * @param {Number} radius
     */
    Game_Character.prototype.eventsInRangeOf = function (radius) {
        const tmp_arr = [];
        if (!$gameMap) return tmp_arr;
        $gameMap.events().forEach(ev => {
            if (this.rangeTo(ev) <= radius) {
                tmp_arr.push(ev);
            }
        }); return tmp_arr;
    };

    /**
     * Get all events that are in line of sight.
     * @param {Number} radius
     */
    Game_Character.prototype.eventsInLineOfSight = function (distance, field_of_sight, xray) {
        const tmp_arr = [];
        if (!$gameMap) return tmp_arr;
        $gameMap.events().forEach(ev => {
            if (this.lineOfSight(ev, distance, field_of_sight, xray)) tmp_arr.push(ev);
        }); return tmp_arr;
    };

    /**
     * Is character in line-of-sight?
     * @param {Object} character
     * @param {Number} distance in tiles
     * @param {Number} field_of_sight in degrees
     * @param {Boolean} xray if true no passability checks are made
     */
    Game_Character.prototype.lineOfSight = function (character, distance, field_of_sight, xray) {

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * =============================================================== *
         * REMEMBER THAT COPYING ANY CODE FROM THIS PLUGIN IS NOT ALLOWED! *
         * =============================================================== *
         * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 

        // If no field of sight is provided >> default to 360 degrees
        if (!field_of_sight || field_of_sight < 1) field_of_sight = 360;

        const range_ok = this.rangeTo(character) <= distance; if (!range_ok) return false; // First of all is range ok?
        if (field_of_sight > 359 && xray) return true; // It's in range, FoS is 360 and has x-ray mode... char has been spotted!

        if (!xray) { // Get passability to character
            let lx = this._x; let ly = this._y;
            const max_tries = distance * 2; let i = 0;
            let ld = OcRam.getDirectionToCharacterFromXY(character, lx, ly);
            while (ld) {
                if (ld % 2) {
                    if (!canPassDiagonally(lx, ly, ld)) {
                        _this.debug("lineOfSight >> NOT PASSABLE! (diagonal)", lx, ly, ld); return false;
                    }
                } else {
                    if (!$gameMap.isPassable(lx, ly, ld)) { // Not passable. Character is NOT spotted!
                        _this.debug("lineOfSight >> NOT PASSABLE!", lx, ly, ld); return false;
                    }
                } const xy = getJumpXY(ld); lx += xy[0]; ly += xy[1]; // Collided with events??
                if ($gameMap.eventsXyNt(lx, ly).find(ev => ev.isNormalPriority() && !ev._allowLoS)) {
                    _this.debug("lineOfSight >> NOT PASSABLE! (events)", lx, ly, ld); return false;
                } ld = OcRam.getDirectionToCharacterFromXY(character, lx, ly);
                if (i++ > max_tries) { // Character not reached in given limit!?!
                    _this.debug("lineOfSight >> Couldn't find path to character!?!", character); return false;
                }
            } if (field_of_sight > 359) {
                _this.debug("lineOfSight (field_of_sight > 359) >> SPOTTED!", character);
                return true; // Character has been spotted!
            }
        }

        // Get degrees with "down" direction...
        let degrees = Math.atan2(character._x - this._x, character._y - this._y) * 360 / Math.PI;

        /* Degrees when facing "down"
         * 90   0   -90
         * 180  X  -180
         * 270 360 -270 */
         
        switch (this._direction) {
            case 9: break;
            case 8: degrees = 360 - Math.abs(degrees); break;
            case 7: break;
            case 6: degrees = 180 - degrees; break;
            case 4: degrees = degrees + 180; break;
            case 3: break;
            case 1: break;
        } degrees = Math.abs(degrees);
        if (degrees > 360) degrees = degrees - 180;

        if (field_of_sight < degrees) { // Field of Sight is too narrow to see this character...
            _this.debug("lineOfSight >> FoS is too narrow!", field_of_sight, "vs", degrees); return false;
        }

        // All possible checks passed... character is spotted!
        _this.debug("lineOfSight >> SPOTTED!", character); return true;
        
    };

    /** Returns [x,y] point in front of this character */
    Game_Character.prototype.frontXY = function () {
        return getFBLR_XYP(this._x, this._y, this._direction);
    };
    
    /** Returns [x,y] point behind this character */
    Game_Character.prototype.behindXY = function () {
        return getFBLR_XYP(this._x, this._y, this.reverseDir(this._direction));
    };

    /** Returns [x,y] point left-side of this character */
    Game_Character.prototype.leftXY = function () {
        return getFBLR_XYP(this._x, this._y, OcRam.leftDir90(this._direction));
    };

    /** Returns [x,y] point right-side of this character */
    Game_Character.prototype.rightXY = function () {
        return getFBLR_XYP(this._x, this._y, OcRam.rightDir90(this._direction));
    };

    /** Returns [x,y] point of this character */
    Game_Character.prototype.XY = function () {
        return [this._x, this._y];
    };

    /** Returns all comments + commandIndex from Game_Event as Array */
    Game_Event.prototype.getComments = function () {
        if (this._erased || this._pageIndex < 0) return [];
        let comments = []; let i = 0;
        this.list().forEach(p => {
            if (p.code == 108 || p.code == 408) {
                p.commandIndex = i; comments.push(p);
            } i++;
        }); return comments;
    };

    /** Returns all comments from Game_Event as String Array */
    Game_Event.prototype.getStringComments = function () {
        const arr = this.getComments(); let comments = [];
        arr.forEach(c => {
            if (c.code == 108) {
                comments.push(c.parameters[0]);
            } else if (c.code == 408) {
                comments[comments.length - 1] += "\n" + c.parameters[0];
            }
        }); return comments;
    };

    /** Returns all open tags from Game_Event as String Array + adds command index to start */
    Game_Event.prototype.getOpenTags = function (tag) {
        let ret = [];
        this.getComments().forEach(c => {
            (c.parameters[0] + '').getOpenTags(tag).forEach(t => {
                ret.push(c.commandIndex + ":" + t);
            });
        }); return ret;
    };

    /** Returns all closed tags from Game_Event as String Array */
    Game_Event.prototype.getClosedTags = function (tag) {
        let ret = [];
        this.getStringComments().forEach(s => {
            (s + '').getClosedTags(tag).forEach(t => {
                ret.push(t);
            });
        }); return ret;
    };

    /**
     * Load bitmap from ./img/ocram folder
     * @param {String} filename
     * @param {Number} hue
     */
    ImageManager.loadOcRamBitmap = function (filename, hue) {
        return this.loadBitmap('img/ocram/', filename, hue, false);
    };

    /**
     * More optimized core adjustX
     * @param {Number} x
     */
    Game_Map.prototype.adjustX_OC = function (x) {
        if (this.isLoopHorizontal()) {
            if (x < this._displayX - (this.width() - _screenTileXOptimizer) * 0.5) {
                return x - this._displayX + $dataMap.width;
            } else {
                return x - this._displayX;
            }
        } else {
            return x - this._displayX;
        }
    };

    /**
     * More optimized core adjustY
     * @param {Number} y
     */
    Game_Map.prototype.adjustY_OC = function (y) {
        if (this.isLoopVertical()) {
            if (y < this._displayY - (this.height() - _screenTileYOptimizer) * 0.5) {
                return y - this._displayY + $dataMap.height;
            } else {
                return y - this._displayY;
            }
        } else {
            return y - this._displayY;
        }
    };

    /** More optimized core screenX */
    Game_CharacterBase.prototype.screenX_OC = function () {
        return Math.round($gameMap.adjustX_OC(this._realX) * OcRam.twh[0] + OcRam.twh50[0]);
    };

    /** More optimized core screenY */
    Game_CharacterBase.prototype.screenY_OC = function () {
        return Math.round($gameMap.adjustY_OC(this._realY) * OcRam.twh[1] + OcRam.twh50[0] - this.shiftY() - this.jumpHeight());
    };

    /** Shortcut to this.contents.fontSize */
    Window_Base.prototype.fontSize = function () {
        return this.contents.fontSize;
    };

    /**
     * Move 1 step towards given point.
     * @param {Number} x
     * @param {Number} y
     */
    Game_Character.prototype.moveToXY = function (x, y) {
        if (!$gameMap) return;
        const d = this.findDirectionTo(x, y);
        if (d % 2) {
            let hv = OcRam.getHorzVert(d);
            this.moveDiagonally(hv[0], hv[1]);
        } else {
            this.moveStraight(d);
        }
    };

    // ----------------------------------------------------------------------------
    // Overwrites
    // ============================================================================

    // Optimize screenTileX/Y it's triggered VERY often - Removed from use for some compatibility issues with 3rd party plugins
    //Game_Map.prototype.screenTileX = function () { return _screenTileXOptimizer; };
    //Game_Map.prototype.screenTileY = function () { return _screenTileYOptimizer; };

    Game_Player.prototype.isOnLadder = function () { // Vehicles are not ladder type of things...
        return (this._vehicleType != "walk") ? false : Game_CharacterBase_isOnLadder_OC.call(this);
    };

    Game_Player.prototype.isDashButtonPressed = function () {
        const shift = Input.isPressed("shift") || _dashing;
        if (ConfigManager.alwaysDash) {
            return !shift;
        } else {
            return shift;
        }
    };

    if (_enableDPad) {
        Input._updateGamepadState = function (gamepad) {
            const lastState = this._gamepadStates[gamepad.index] || [];
            const newState = [];
            const buttons = gamepad.buttons;
            const axes = gamepad.axes;
            const threshold = 0.25;
            const d_pad = axes[axes.length - 1].toFixed(2);
            newState[12] = false; newState[13] = false;
            newState[14] = false; newState[15] = false;
            if (d_pad != 3.29) { /* D-Pad */
                if (d_pad == -1.00) { newState[12] = true; } // up
                else if (d_pad == -0.43) { newState[15] = true; } // right
                else if (d_pad == 0.14) { newState[13] = true; } // down
                else if (d_pad == 0.71) { newState[14] = true; } // left
                else if (d_pad == 0.43) { newState[13] = true; newState[14] = true; } // 1
                else if (d_pad == -0.14) { newState[13] = true; newState[15] = true; } // 3
                else if (d_pad == 1.00) { newState[12] = true; newState[14] = true; } // 7
                else if (d_pad == -0.71) { newState[12] = true; newState[15] = true; } // 9
            }
            for (let i = 0; i < buttons.length; i++) {
                newState[i] = buttons[i].pressed;
            }
            if (axes[1] < -threshold) {
                newState[12] = true; // up
            } else if (axes[1] > threshold) {
                newState[13] = true; // down
            }
            if (axes[0] < -threshold) {
                newState[14] = true; // left
            } else if (axes[0] > threshold) {
                newState[15] = true; // right
            }
            for (let j = 0; j < newState.length; j++) {
                if (newState[j] !== lastState[j]) {
                    const buttonName = this.gamepadMapper[j];
                    if (buttonName) {
                        this._currentState[buttonName] = newState[j];
                    }
                }
            }
            this._gamepadStates[gamepad.index] = newState;
        };
    }

    if (_useRegionPassFeat) {

        Game_Player.prototype.canPass = function (x, y, d) {
            const rid = $gameMap.regionId($gameMap.roundXWithDirection(x, d), $gameMap.roundYWithDirection(y, d));
            if (rid == _blockALL_RID || rid == _blockPlayer_RID) return false;
            if (rid == _passALL_RID || rid == _passPlayer_RID) return true;
            return Game_CharacterBase.prototype.canPass.call(this, x, y, d);
        };

        Game_Follower.prototype.canPass = function (x, y, d) {
            if (!this.isPlayer()) {
                return Game_CharacterBase.prototype.canPass.call(this, x, y, d);
            } const rid = $gameMap.regionId($gameMap.roundXWithDirection(x, d), $gameMap.roundYWithDirection(y, d));
            if (rid == _blockALL_RID || rid == _blockPlayer_RID) return false;
            if (rid == _passALL_RID || rid == _passPlayer_RID) return true;
            return Game_CharacterBase.prototype.canPass.call(this, x, y, d);
        };

        Game_Event.prototype.canPass = function (x, y, d) {
            const rid = $gameMap.regionId($gameMap.roundXWithDirection(x, d), $gameMap.roundYWithDirection(y, d));
            if (rid == _blockALL_RID || rid == _blockEvents_RID) return false;
            if (rid == _passALL_RID || rid == _passEvents_RID) return true;
            return Game_CharacterBase.prototype.canPass.call(this, x, y, d);
        };

        Game_Map.prototype.isEventAlwaysAllowed = function (x, y) {
            const rid = $gameMap.regionId(x, y);
            return (rid == _passALL_RID || rid == _passEvents_RID);
        };

        Game_Map.prototype.isEventAlwaysBlocked = function (x, y) {
            const rid = $gameMap.regionId(x, y);
            return (rid == _blockALL_RID || rid == _blockEvents_RID);
        };

        Game_Map.prototype.isPlayerAlwaysAllowed = function (x, y) {
            const rid = $gameMap.regionId(x, y);
            return (rid == _passALL_RID || rid == _passPlayer_RID);
        };

        Game_Map.prototype.isPlayerAlwaysBlocked = function (x, y) {
            const rid = $gameMap.regionId(x, y);
            return (rid == _blockALL_RID || rid == _blockPlayer_RID);
        };

    } else {
        Game_Map.prototype.isEventAlwaysAllowed = function (x, y) { return false; };
        Game_Map.prototype.isEventAlwaysBlocked = function (x, y) { return false; };
        Game_Map.prototype.isPlayerAlwaysAllowed = function (x, y) { return false; };
        Game_Map.prototype.isPlayerAlwaysBlocked = function (x, y) { return false; };
    }
    
    // ----------------------------------------------------------------------------
    // Plugin commands - Do not use leximate scope with: args => { ... }
    // ============================================================================
    PluginManager.registerCommand("OcRam_" + this.name, "playBGS", function (args) {
        const tmp_bgs = {
            name: args.name || '',
            volume: Number(args.volume),
            pitch: Number(args.pitch),
            pan: Number(args.pan),
            pos: 0
        }; _this.debug("Plugin command: playBGS (channel:" + args.channel + ")", tmp_bgs);
        switch (Number(args.channel)) {
            case 1: AudioManager.playBgs(tmp_bgs); if (Number(args.fadeIn) > 0) AudioManager.fadeInBgs(Number(args.fadeIn)); break;
            case 2: AudioManager.playBgs2(tmp_bgs); if (Number(args.fadeIn) > 0) AudioManager.fadeInBgs2(Number(args.fadeIn)); break;
            case 3: AudioManager.playBgs3(tmp_bgs); if (Number(args.fadeIn) > 0) AudioManager.fadeInBgs3(Number(args.fadeIn)); break;
        }
    });

    PluginManager.registerCommand("OcRam_" + this.name, "stopBGS", function (args) {
        _this.debug("Plugin command: stopBGS", args);
        if (Number(args.fadeOut) > 0) {
            switch (Number(args.channel)) {
                case 0: // Fade out all
                    AudioManager.fadeOutBgs(Number(args.fadeOut));
                    AudioManager.fadeOutBgs2(Number(args.fadeOut));
                    AudioManager.fadeOutBgs3(Number(args.fadeOut));
                    break;
                case 1: AudioManager.fadeOutBgs(Number(args.fadeOut)); break;
                case 2: AudioManager.fadeOutBgs2(Number(args.fadeOut)); break;
                case 3: AudioManager.fadeOutBgs3(Number(args.fadeOut)); break;
            }
        } else {
            switch (Number(args.channel)) {
                case 0: // Stop all
                    AudioManager.stopBgs();
                    AudioManager.stopBgs2();
                    AudioManager.stopBgs3();
                    break;
                case 1: AudioManager.stopBgs(); break; // BGS channel 1
                case 2: AudioManager.stopBgs2(); break; // BGS channel 2
                case 3: AudioManager.stopBgs3(); break; // BGS channel 3
            };
        }
    });

}.bind(OcRam)());

/*//Handling OcRam_Core later on...
OcRam_Core = class extends OcRam_Core {

    constructor() { super(); }

    // Overwrite
    oldMethodToOverwrite(a, b) {
        console.log("oldMethodToOverwrite - is now overwritten", a, b);
    }

    // Alias
    doSomethingOld(p1, p2) {
        super.doSomethingOld(p1);
        this.doSomethingNew(p2);
    }

    // New method
    doSomethingNew(p) {
        console.log("doSomethingNew", p);
    }

} //...or then just prototype it...*/