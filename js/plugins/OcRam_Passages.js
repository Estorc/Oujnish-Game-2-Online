//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Passages.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.09) alert("OcRam core v1.09 or greater is required!");

OcRam.addPlugin("Passages", "1.10");

/*:
 * @target MZ
 * @plugindesc v1.10 Use region IDs to determine a character 'floor level'.
 * Even autotiles can be drawn ABOVE characters.
 * @author OcRam
 * @url https://ocram-codes.net
 * @orderAfter OcRam_Layers
 * @orderAfter OcRam_Lights
 *
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ============================================================================
 * 
 * @command setFloorLevel
 * @text Set Floor Level
 * @desc Set desired floor level to desired game object.
 *
 * @arg objectId
 * @type number
 * @decimals 0
 * @default -1
 * @text Object Id
 * @desc All positive numbers = event id. -1 = player + followers, -100 = airship, -101 = ship, -102 = boat.
 *
 * @arg floorLevel
 * @type select
 * @option Low
 * @value Low
 * @option High
 * @value High
 * @option Auto
 * @value Auto
 * @text Floor level
 * @default Auto
 * @desc To which floor level object is assigned?
 *
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
 * 
 * @param Underpass Region ID
 * @type number
 * @desc Region ID for reducing character 'floor level' lower
 * @default 16
 *
 * @param Overpass Region ID
 * @type number
 * @desc Region ID for raising character 'floor level' higher. Also draws B-E tiles
 * @default 17
 *
 * @param Cover Region ID
 * @type number
 * @desc Region ID for "cover" such as bridges and other B-E tiles
 * @default 18
 *
 * @param Cover Autotile Region ID
 * @type number
 * @desc Region ID for "Autotile cover" such as cliffs, roofs and other A-tiles
 * @default 19
 *
 * @param Block Region ID
 * @type number
 * @desc Region ID to block movement from ALL floor levels
 * @default 20
 *
 * @param Overhead Region ID
 * @type number
 * @desc Region ID to block movement AND show tiles ABOVE character (if low ground)
 * @default 21
 *
 * @param Block High-Low Region ID
 * @type number
 * @desc Use to block movement from high <> low (must be next to underpass)
 * @default 22
 *
 * @param Use automatic floor levels
 * @type boolean
 * @desc 'true' Enable automatic floor level detection else disable function
 * @default true
 * 
 * @param Use tall sprites
 * @type boolean
 * @desc 'true' = player and followers have same floor level. 
 * 'false' = individual floor levels.
 * @default false
 *
 * @param Debug mode
 * @parent Other parameters
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 *
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                  (Made for RPG Maker MZ + RETRO support for MV)
 * ============================================================================
 * This plugin uses region ID to determine a character 'floor level'. Even
 * autotiles can be drawn ABOVE characters (events, player, followers etc).
 *
 * Character passage is also allowed based on floor level (collision tests).
 *
 * Events are signed to desired 'floor level' via event comments <lower> or
 * <higher>. Event comments are processed per event PAGE! Or use "floor_level"
 * plugin command. By default: event interaction is allowed only within same
 * floor level. <trigger_always> will change this.
 *
 * NOTE:  Use DEBUG mode ONLY if you need to debug something. It's logging
 *        quite big JS objects and often ...so it might slow things down.
 *
 * ----------------------------------------------------------------------------
 * Usage (Region IDs)
 * ============================================================================
 * For example horizontal bridge paint following regions (with default ids)
 *
 * 16 = Underpassage point, 17 = Overpassage point, 18 = Bridge (cover tile)
 *
 *      [16] [16] [16]
 * [17] [18] [18] [18] [17]
 *      [16] [16] [16]
 *
 * Possible event comments: <higher>, <lower>, <trigger_always>
 *
 * ----------------------------------------------------------------------------
 * Plugin commands
 * ============================================================================
 * objectId:
 *      -102 = Boat
 *      -101 = Ship
 *      -100 = Airship
 *      -2 to -99 = Followers
 *      -1 = Player (and followers)
 *      > 0 = Event id
 * 
 * floorLevel:
 *      Low = Below cover tiles
 *      High = Above cover tiles
 *      Auto = Automatic assigment based on tile type where character is.
 *
 * MV example: OcRam_Passages/setFloorLevel -1 Low
 * setFloorLevel    To set player, event or vehicle "floor level"
 * >> objectId      See: "objectId" in the begining of this section.
 * >> floorLevel    To which floor level object is assigned?
 * 
 * ----------------------------------------------------------------------------
 * JavaScript commands
 * ============================================================================
 * OcRam.Passages.setFloorLevel($gamePlayer, 'low/high/auto'); // Set floor lvl
 * OcRam.Passages.initSprites(); // Force initialization of ALL sprites
 * character.setFloorLevel('low/high/auto'); // Set floor lvl
 * 
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 * Exception: Obfuscating and/or minifying JS, where ALL comments are removed
 * (incluging these "Terms of Use"), is allowed (won't change ToU itself).
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your project by ANY MEANS (including: donations,
 * crypto-mining, micro-transactions, advertisements, merchandises etc..)
 * it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 20 EUR, No-credits license: 60 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME(S) you are buying / ALL plugins and your PROJECT NAME(S).
 *
 * Licenses are purchased per project and standard licenses requires credits.
 * ALL of my plugins for 1 project = 40 EUR (standard licenses).
 *
 * License for lifetime is 3x base price of any license / bundle. Permission
 * to use this type of license only in projects where you own most of it.
 * Else project license OR project owner lifetime license is required.
 *
 * OcRam -plugins available at https://ocram-codes.net/plugins.aspx?engine=mz
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS PLUGIN AS YOUR OWN!
 * Copyright (c) 2021, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2020/09/03 v1.00 - Initial release for v1.00
 * 2020/09/19 v1.01 - Autosave won't mess up previous maps event floor levels
 * 2020/09/27 v1.02 - Compatibility patch for OcRam_Layers
 *                    + Tileset change bug fixes
 * 2020/10/10 v1.03 - Compatibility patch for OcRam_Movement
 * 2020/10/25 v1.04 - 2. compatibility patch for OcRam_Movement + Followers
 * 2020/10/28 v1.05 - Fixed rare bug when $gamePlayer and 2 events with 
 *                    different floor levels in same tile caused stack overflow
 * 2021/01/06 v1.06 - Compatibility patch for VisuMZ_4_EncounterEffects
 *                    (Credits to Kneeshaw (also for the Visu plugin license))
 *                    New JS method OcRam.Passages.initSprites() in case you
 *                    need to refresh floor levels for every object.
 *                    (Credits to poorrabit)
 *                    Optimized a little bit event update method!
 * 2021/01/26 v1.07 - Compatibility patch for MOG_CharShatterEffect
 *                    (Credits to MasterTenchi)
 * 2021/03/07 v1.08 - Fixed a bug where there was a slight chance for "_flags"
 *                    to be null (_flags can be "empty" but NOT null)
 *                    <higher> and <lower> notetags are now checked for EACH
 *                    page individually and will override any floor level +
 *                    auto-assign will ne performed IF tag not found!
 *                    Balloons/Animations are now shown ABOVE cover tiles!
 *                    "Higher level" sprites are now only created when needed
 *                    and will be purged when changed to "lower level".
 *                    character.autoAssign() -method added (Credits: clitvin)
 *                    Optimized isMapPassable/checkPassage (Credits: clitvin)
 *                    All known character "flickering" issues has been fixed.
 *                    Support for LOOPPED MAPS! + Optimized mapCulling method!
 * 2021/04/02 v1.09 - Compatibility patch for OcRam_Events lift & throw system!
 *                    If character is on underpass region id > autoAssign = low
 *                    Game_Character.setFloorLevel('high'/'low'/'auto');
 * 2021/06/04 v1.10 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    startMapEvent doesn't any more start "Below character"
 *                    events if they are on NON-passable tile.
 *                    1px glitch above "higher level" sprites is now fixed.
 * 
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 *     Game_Map.prototype.isMapPassable
 *     Game_Map.prototype.isPassable
 *     Game_Map.prototype.checkPassage
 *     Game_Player.prototype.startMapEvent
 *     Game_CharacterBase.prototype.isCollidedWithEvents
 *     Game_Event.prototype.isCollidedWithEvents
 *     Game_Vehicle.prototype.refreshBushDepth
 *     Tilemap.prototype._readMapData
 *     Game_CharacterBase.prototype.isCollidedWithEvents_OC (IF OcRam_Movement)
 *     Sprite_Balloon.updatePosition
 *     Sprite_AnimationMV.updatePosition
 *     Game_Player.prototype.checkThrowPass (If OcRam_Events is imported)
 */

Sprite.prototype.isOcRam = () => { return false; }; // Fix for the Visu_4_EncounterEffects

// New class from Sprite_Character to make some adjustments... To reduce code base A LOT
class Sprite_Character_OC extends Sprite_Character {

    constructor(character) {
        super(character); this._lX = 0; this._lY = 0; // _lX & _lY is for Looping maps...
        if (!character.isEvent()) {
            this._character._adjX = 0; this._character._adjY = 0;
            this.updatePosition = () => {
                if (!this.visible) { this.x = -100; this.y = -100; return; }
                this.x = this._character._realX * OcRam.twh[0] + OcRam.twh50[0] + this._lX + this._character._adjX;
                this.y = (this._character._realY * OcRam.twh[1] + OcRam.twh[1] - this._character.jumpHeight() + this._lY + this._character._adjY - 6) | 0;
                if (this._character._altitude) this.y -= this._character._altitude;
                this.z = this._character.screenZ();
            }
        }
    }

    update () {
        if (this._showHigherSprite) {
            this.visible = true; super.update();
        } else {
            if (this.visible) {
                this.visible = false; super.update();
            }
        }
    }

    isOcRam () { return true; }

    updatePosition () {
        if (!this.visible) { this.x = -100; this.y = -100; return; }
        this.x = this._character._realX * OcRam.twh[0] + OcRam.twh50[0] + this._lX;
        this.y = (this._character._realY * OcRam.twh[1] + OcRam.twh[1] - this._character.jumpHeight() + this._lY - (!this._character._isObjectCharacter ? 6 : 0)) | 0;
        if (this._character._altitude) this.y -= this._character._altitude;
        this.z = this._character.screenZ();
    }

}

// Used in OcRam_Time_System (preloader)...
ImageManager.loadTileset_OC = function (filename) {
    return this.loadBitmap('img/tilesets/', filename, 0, true);
};

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    const _underpassId = Number(this.parameters['Underpass Region ID'] || 16);
    const _overpassId = Number(this.parameters['Overpass Region ID'] || 17);
    const _coverId = Number(this.parameters['Cover Region ID'] || 18);
    const _autoCoverId = Number(this.parameters['Cover Autotile Region ID'] || 19);
    const _blockId = Number(this.parameters['Block Region ID'] || 20);
    const _overheadId = Number(this.parameters['Overhead Region ID'] || 21);
    const _blockHighLowId = Number(this.parameters['Block High-Low Region ID'] || 22);
    const _useAutoassign = OcRam.getBoolean(this.parameters['Use automatic floor levels']);
    const _useTallSprites = OcRam.getBoolean(this.parameters['Use tall sprites']);
    const _tableEdgeVirtualId = 10000;

    let _isAirshipLanded = true; // AirShip Sprite landed?
    let _flags = []; // Game_Map flags needs to be loaded only once...
    let _currentShaderTilemap = null; // Used to get shadertilemap bitmaps
    let _cacheReady = false; // Check that cache is ready
    let _tileSprites = []; // Static tiles here (to avoid Y sorting)

    let _useTimeSystem = OcRam.Time_System && OcRam.getFloat(OcRam.Time_System.version) > 1.02;
    if (!_useTimeSystem) {
        this.debug("Create fake OcRam.Time_System object (for tileset changes).");
        OcRam.Time_System = {};
        OcRam.Time_System._currentTilesetId = 0;
        OcRam.Time_System._prevTilesetId = 0;
    }

    // Debuging purposes
    this.getPassageTilesA = () => {
        return _tileSprites[0];
    }; this.getPassageTilesBE = () => {
        return _tileSprites[1];
    }; this.getPassagesLayer = () => {
        if (!SceneManager || !SceneManager._scene || !SceneManager._scene._spriteset) return;
        return SceneManager._scene._spriteset._layerContainer_OC;
    }; this.totalNumberOfCoverSprites = () => {
        let sum = 0; if (SceneManager && SceneManager._scene && SceneManager._scene._spriteset && SceneManager._scene._spriteset._layerContainer_OC) sum += SceneManager._scene._spriteset._layerContainer_OC.children.length - 2;
        if (_tileSprites[0] && _tileSprites[0].children) sum += _tileSprites[0] && _tileSprites[0].children.length; if (_tileSprites[1] && _tileSprites[1].children) sum += _tileSprites[1] && _tileSprites[1].children.length; return sum;
    }

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================
    const autoAssignFloorLevel = ev => {

        if (ev._higherLevel != undefined) return ev._higherLevel;
        if (!_useAutoassign) { return ev._higherLevel || false; }

        const tiles = $gameMap.allTiles(ev._x, ev._y); let tile_id = 0;
        for (let i = 0; i < tiles.length; i++) {
            if (Tilemap.isAutotile(tiles[i])) tile_id = tiles[i];
        }

        let ret = false;
        switch (ev.regionId()) {
            case _coverId: case _autoCoverId: case _overpassId: case _overheadId:
                ret = true; break;
            case _underpassId: ret = false; break;
            default:
                ret = (Tilemap.isRoofTile(tile_id) || Tilemap.isWallTopTile(tile_id));
                break;
        } this.debug("autoAssignFloorLevel (_higherLevel=" + ret + ")", ev); return ret;

    };

    const purgeHigherLevelSprite = obj => {
        let sprite = getCharSprite(obj); if (sprite)
            SceneManager._scene._spriteset._layerContainer_OC.removeChild(sprite); sprite = null;
    };

    const setObjFloorLevel = (obj, level) => {
        if (obj !== undefined && obj != null) {
            let sprite = getCharSprite(this); if (sprite)
                SceneManager._scene._spriteset._layerContainer_OC.removeChild(sprite); sprite = null;
            if (level == "low") obj._higherLevel = false;
            if (level == "high") obj._higherLevel = true;
            if (level == "auto") obj._higherLevel = autoAssignFloorLevel(obj);
            updateEvent(obj);
        }
    };

    const preLoadSeasonTilesets = () => {
        let tmp = [];
        $dataTilesets.forEach(ts => {
            if (ts != null) {
                tmp = [];
                ts.tilesetNames.forEach(s => {
                    tmp.push(ImageManager.loadTileset_OC(s));
                });
            }
        }); isCacheReady();
    };

    const isCacheReady = () => {
        window.setTimeout(() => {
            _cacheReady = ImageManager.isReady();
            if (!_cacheReady) {
                this.debug("preLoadSeasonTilesets()", "...Loading...");
                isCacheReady();
            } else {
                this.debug("preLoadSeasonTilesets()", "...Done!");
            }
        }, 1000);
    };

    const callSeasonChange = () => {

        if (SceneManager._scene.isTitle() || DataManager.isEventTest()) return;

        // Do not change tileset if not required to...
        this.debug("Tileset check:", OcRam.Time_System._prevTilesetId + " -VS- " + OcRam.Time_System._currentTilesetId);
        if (OcRam.Time_System._prevTilesetId == OcRam.Time_System._currentTilesetId) return;

        _currentShaderTilemap = SceneManager._scene._spriteset._tilemap; // Current ShaderTilemap

        let tileset_names = $dataTilesets[OcRam.Time_System._currentTilesetId].tilesetNames;
        this.debug("LOADED NEW TILESET!", tileset_names); // Force new tileset bitmaps...

        OcRam.Time_System._currentTilesetId = OcRam.Time_System._prevTilesetId;

        for (let i = 0; i < tileset_names.length - 1; i++) {
            _currentShaderTilemap._bitmaps[i] = ImageManager.loadTileset_OC(tileset_names[i]);
        }

    };

    const reStartScene = () => {
        if (!OcRam.scene()) return;
        if (OcRam.scene().isReady()) {
            requestAnimationFrame(() => {
                OcRam.scene().start();
            });
        } else {
            requestAnimationFrame(() => {
                reStartScene();
            });
        }
    };

    const initSprites = () => {

        OcRam.twh = [$gameMap.tileWidth(), $gameMap.tileHeight()];

        this.debug("Do culling?", OcRam._doCulling);

        // Initialize bitmap arrays on autotile covers...
        _flags = $gameMap.tilesetFlags();

        let ev_cmts = [];

        $gameSystem.loadPassageData(); callSeasonChange();

        let is_auto_or_overhead = false; let region_id = 0;
        for (let x = 0; x < $gameMap.width(); x++) {
            for (let y = 0; y < $gameMap.height(); y++) {
                region_id = $gameMap.regionId(x, y); is_auto_or_overhead = (region_id == _autoCoverId || region_id == _overheadId);
                if (is_auto_or_overhead) {
                    drawLowerLayers(x, y); // Autotiles covers WHOLE tile
                } if (region_id == _coverId || is_auto_or_overhead || region_id == _overpassId) {
                    drawBELayers(x, y); // Characters and B-E tiles may have transparent backgrounds
                }
            }
        }

        $gameMap.events().forEach(ev => {
            if (ev._higherLevel === undefined) {
                ev._higherLevel = autoAssignFloorLevel(ev);
                ev_cmts = ev.getStringComments();
                ev_cmts.forEach(s => {
                    if (s == "<higher>") {
                        ev._higherLevel = true;
                    } else if (s == "<lower>") {
                        ev._higherLevel = false;
                    }
                });
            } if (ev._higherLevel === undefined) ev._higherLevel = autoAssignFloorLevel(ev);
            if (ev._higherLevel) { updateEvent(ev); }
        });

        let aship_obj = $gameMap.airship(); aship_obj._higherLevel = autoAssignFloorLevel(aship_obj);

        if (aship_obj._mapId == $gameMap.mapId()) {
            updateEvent(aship_obj);
        } drawActors();

        mapCulling(); $gameMap.moveSpritesX_OC(); $gameMap.moveSpritesY_OC();

    };

    const drawLowerLayers = (px, py) => {
        let low_bm = new Bitmap(OcRam.twh[0], OcRam.twh[1]);
        let ctm = SceneManager._scene._spriteset._tilemap;
        ctm.paintTilesOnBitmap_OC(low_bm, null, px, py, true);
        addTileBitmap(low_bm, px * OcRam.twh[0], py * OcRam.twh[1], 0);
    };

    const drawActors = () => {
        // Pre-load actor higherlevel sprites to avoid minor lag when triggered 'higher' level...
        let ev = null; let old_hl = false;
        for (let i = $gamePlayer._followers.visibleFollowers().length - 1; i > -1; i--) {
            ev = $gamePlayer._followers.visibleFollowers()[i];
            old_hl = ev._higherLevel; ev._higherLevel = true; addCharBitmap(ev);
            ev._higherLevel = old_hl; ev._higherLevel = autoAssignFloorLevel(ev); updateEvent(ev);
        } ev = $gamePlayer; old_hl = ev._higherLevel; ev._higherLevel = true; addCharBitmap(ev);
        ev._higherLevel = old_hl; ev._higherLevel = autoAssignFloorLevel(ev); updateEvent(ev);
    };

    // Set visibilities to avoid sprite rendering/sorting for sprites that are off screen!
    const mapCulling = () => {

        if (!OcRam._doCulling) return;

        if (_tileSprites[0]) {
            _tileSprites[0].children.forEach(s => {
                if (s.visible) { // Is it off screen now?
                    if (!OcRam.isInScreen(s._x, s._y)) s.visible = false;
                } else { // Is it in screen now?
                    if (OcRam.isInScreen(s._x, s._y)) s.visible = true;
                }
            });
        }

        if (_tileSprites[1]) {
            _tileSprites[1].children.forEach(s => {
                if (s.visible) { // Is it off screen now?
                    if (!OcRam.isInScreen(s._x, s._y)) s.visible = false;
                } else { // Is it in screen now?
                    if (OcRam.isInScreen(s._x, s._y)) s.visible = true;
                }
            });
        }

    };

    // Draw tile to desired layer
    const addTileBitmap = (p_bitmap, x, y, z) => {

        let sprite = new Sprite(); sprite.bitmap = p_bitmap;

        sprite.x = x; sprite.y = y;
        sprite._x = (x / OcRam.twh[0]) | 0;
        sprite._y = (y / OcRam.twh[1]) | 0;

        sprite.visible = !OcRam._doCulling; sprite.z = z;

        if (z == 0) {
            _tileSprites[0].addChild(sprite); // Lower tiles
        } else {
            _tileSprites[1].addChild(sprite); // Upper tiles
        }

    };

    // Add char to _layerContainer_OC
    const addCharBitmap = ev => {
        if (ev._eventId !== undefined) {
            if (ev._characterName == "" && ev._tileId == 0) { this.debug("Event with no graphics...", ev); return; }
            if (!SceneManager._scene._spriteset || !SceneManager._scene._spriteset._layerContainer_OC) return;
            let sprite = new Sprite_Character_OC(ev); sprite.z = ev._priorityType * 2 + 1; sprite.visible = !OcRam._doCulling;
            SceneManager._scene._spriteset._layerContainer_OC.addChild(sprite); updateEvent(ev);
        }
    };

    // Update event sprite
    const updateEvent = ev => {
        if (ev._eventId == undefined) {
            if (ev.isPlayer()) ev._eventId = -1;
            if (ev.isFollower()) ev._eventId = -(ev._memberIndex + 1);
            if (ev.isVehicle()) {
                if (ev._type == "boat") { ev._eventId = -100; ev._higherLevel = false; }
                if (ev._type == "ship") { ev._eventId = -101; ev._higherLevel = false; }
                if (ev._type == "airship") { ev._eventId = -102; ev._higherLevel = true; }
            }
        } let sprite = getCharSprite(ev);
        if (ev._higherLevel) {
            if (sprite) {
                sprite._showHigherSprite = ev._higherLevel && !ev._transparent;
            } else { // Event not created yet?
                addCharBitmap(ev);
            }
        } else {
            if (sprite) requestAnimationFrame(() => { // 3 frames should be enough to avoid flickering...
                requestAnimationFrame(() => { // 1 more after this one...
                    requestAnimationFrame(() => { purgeHigherLevelSprite(ev); });
                });
            });
        }
    };

    const getCharSprite = ev => {
        if (!ev || !SceneManager._scene._spriteset || !SceneManager._scene._spriteset._layerContainer_OC) return null;
        return SceneManager._scene._spriteset._layerContainer_OC.children.find(sprite => {
            if (sprite.isOcRam() && sprite._character) {
                if (sprite._character._eventId == ev._eventId) return true;
            }
        });
    };

    const drawBELayers = (px, py) => { // Draw B-E tiles - Returns: Bitmap
        let tmp_x = px * OcRam.twh[0]; let tmp_y = py * OcRam.twh[1];
        let low_bm = new Bitmap(OcRam.twh[0], OcRam.twh[1]);
        let high_bm = new Bitmap(OcRam.twh[0], OcRam.twh[1]);
        const ctm = SceneManager._scene._spriteset._tilemap;
        ctm.paintTilesOnBitmap_OC(low_bm, high_bm, px, py, false);
        addTileBitmap(low_bm, tmp_x, tmp_y, 0, px, py); // Add below chars
        addTileBitmap(high_bm, tmp_x, tmp_y, 4, px, py); // Add above chars
    };

    let _shiftedX = false;
    const shiftScreenPassagesX = () => {
        if (_shiftedX) {
            _this.debug("SHOULD REVERT SPRITES TO ORGINAL X!");
            let tiles = _tileSprites[0].children.filter(t => { // A tiles
                return t.x > $gameMap._pixelWidth;
            }); tiles.forEach(t => {
                t.x -= ($gameMap._pixelWidth);
            }); tiles = _tileSprites[1].children.filter(t => { // B-E tiles
                return t.x > $gameMap._pixelWidth;
            }); tiles.forEach(t => {
                t.x -= ($gameMap._pixelWidth);
            }); tiles = SceneManager._scene._spriteset._layerContainer_OC.children.filter(t => {
                return t.isOcRam() && (t.x > $gameMap._pixelWidth);
            }); tiles.forEach(t => { // Characters
                t._lX = 0;
            }); _shiftedX = false;
        } else {
            _this.debug("SHOULD SHIFT SPRITES TO NEW DISP X!");
            let tiles = _tileSprites[0].children.filter(t => {
                return t.x < Graphics.width * 0.75;
            }); tiles.forEach(t => {
                t.x += ($gameMap._pixelWidth);
            }); tiles = _tileSprites[1].children.filter(t => {
                return t.x < Graphics.width * 0.75;
            }); tiles.forEach(t => {
                t.x += ($gameMap._pixelWidth);
            }); tiles = SceneManager._scene._spriteset._layerContainer_OC.children.filter(t => {
                return t.isOcRam() && (t.x < Graphics.width * 0.75);
            }); tiles.forEach(t => {
                t._lX = $gameMap._pixelWidth;
            }); _shiftedX = true;
        }
    };

    let _shiftedY = false;
    const shiftScreenPassagesY = () => {
        if (_shiftedY) {
            _this.debug("SHOULD REVERT SPRITES TO ORGINAL Y!");
            let tiles = _tileSprites[0].children.filter(t => { // A tiles
                return t.y > $gameMap._pixelHeight;
            }); tiles.forEach(t => {
                t.y -= ($gameMap._pixelHeight);
            }); tiles = _tileSprites[1].children.filter(t => { // B-E tiles
                return t.y > $gameMap._pixelHeight;
            }); tiles.forEach(t => {
                t.y -= ($gameMap._pixelHeight);
            }); tiles = SceneManager._scene._spriteset._layerContainer_OC.children.filter(t => {
                return t.isOcRam() && (t.y > $gameMap._pixelHeight);
            }); tiles.forEach(t => { // Characters
                t._lY = 0;
            }); _shiftedY = false;
        } else {
            _this.debug("SHOULD SHIFT SPRITES TO NEW DISP Y!");
            let tiles = _tileSprites[0].children.filter(t => {
                return t.y < Graphics.height * 0.75;
            }); tiles.forEach(t => {
                t.y += ($gameMap._pixelHeight);
            }); tiles = _tileSprites[1].children.filter(t => {
                return t.y < Graphics.height * 0.75;
            }); tiles.forEach(t => {
                t.y += ($gameMap._pixelHeight);
            }); tiles = SceneManager._scene._spriteset._layerContainer_OC.children.filter(t => {
                return t.isOcRam() && (t.y < Graphics.height * 0.75);
            }); tiles.forEach(t => {
                t._lY = $gameMap._pixelHeight;
            }); _shiftedY = true;
        }
    };

    // ------------------------------------------------------------------------------
    // Public plugin functions - Usage: OcRam.PluginName.myFunction(arguments)
    // ==============================================================================
    this.setFloorLevel = (game_obj, str_level) => {
        setObjFloorLevel(game_obj, str_level);
    };

    this.initSprites = () => { initSprites(); };

    this.reStartScene = () => { reStartScene(); };

    // ------------------------------------------------------------------------------
    // MOG_CharShatter fix
    // ==============================================================================
    if (Imported.MOG_CharShatterEffect) {
        const _MOG_CharShatterEffect_Fix = Sprite_Character.prototype.loadShatterData;
        Sprite_Character.prototype.loadShatterData = function (i) {
            if (this._character._shatter[1][i].opacity === undefined) {
                this.saveShatterData(); $gameTemp._forceSkipShatter = true;
            } else {
                _MOG_CharShatterEffect_Fix.call(this, i);
            }
        };
    }

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    // Force autoassign...
    Game_CharacterBase.prototype.autoAssign = function() {
        this._higherLevel = undefined;
        this._higherLevel = autoAssignFloorLevel(this);
        updateEvent(this);
    };

    // This is triggered every frame!
    Tilemap.prototype._sortChildren_OC = function () {
        SceneManager._scene._spriteset._layerContainer_OC.children.sort(this._compareChildOrder_OC.bind(this));
    };

    // This is triggered every frame!
    Tilemap.prototype._compareChildOrder_OC = function (a, b) {
        if (a.z !== b.z) return a.z - b.z;
        if (a.y !== b.y) return a.y - b.y;
        return a.spriteId - b.spriteId;
    };

    // Save passage data (high / low)
    Game_System.prototype.savePassageData = function () {

        this._passageHigh = []; this._passageLow = []; const fl = OcRam.followers().length;

        if ($gamePlayer._higherLevel) { this._passageHigh.push(-1); } else { this._passageLow.push(-1); }
        if (fl > 0 && OcRam.getGameObject(-2)._higherLevel) { this._passageHigh.push(-2); } else { this._passageLow.push(-2); }
        if (fl > 1 && OcRam.getGameObject(-3)._higherLevel) { this._passageHigh.push(-3); } else { this._passageLow.push(-3); }
        if (fl > 2 && OcRam.getGameObject(-4)._higherLevel) { this._passageHigh.push(-4); } else { this._passageLow.push(-4); }
        if (OcRam.getGameObject(-100)._higherLevel) { this._passageHigh.push(-100); } else { this._passageLow.push(-100); }
        if (OcRam.getGameObject(-101)._higherLevel) { this._passageHigh.push(-101); } else { this._passageLow.push(-101); }
        if (OcRam.getGameObject(-102)._higherLevel) { this._passageHigh.push(-102); } else { this._passageLow.push(-102); }

        $gameMap.events().forEach(ev => {
            if (ev._higherLevel) {
                this._passageHigh.push(ev.eventId());
            } else { this._passageLow.push(ev.eventId()); }
        }); _this.debug("savePassageData >>> Saved _passageHigh:", this._passageHigh);

        _this.debug("savePassageData >>> Saved _passageLow:", this._passageLow);

    };

    // Load previously saved passage data (high / low)
    Game_System.prototype.loadPassageData = function () {

        let gobj = null;

        if (this._passageHigh != undefined) {
            if (this._passageHigh.length > 0) {
                _this.debug("Loaded _passageHigh:", this._passageHigh);
                this._passageHigh.forEach(i => {
                    gobj = OcRam.getGameObject(i); if (gobj) gobj._higherLevel = true;
                }); this._passageHigh = [];
            }
        }

        if (this._passageLow != undefined) {
            if (this._passageLow.length > 0) {
                _this.debug("Loaded _passageLow:", this._passageLow);
                this._passageLow.forEach(i => {
                    gobj = OcRam.getGameObject(i); if (gobj) gobj._higherLevel = false;
                }); this._passageLow = [];
            }
        }

    };

    Game_Map.prototype.moveSpritesX_OC = function () {
        SceneManager._scene._spriteset._layerContainer_OC.x = -(this._displayX * OcRam.twh[0]) | 0;
    };

    Game_Map.prototype.moveSpritesY_OC = function () {
        SceneManager._scene._spriteset._layerContainer_OC.y = -(this._displayY * OcRam.twh[1]) | 0;
    };

    // Create layers for cover graphics
    Spriteset_Map.prototype.createCoverLayers_OC = function () {

        // Clear layer container, just in case (you never know what other plugins do in this.terminate)
        if (this._layerContainer_OC !== undefined) {
            alert("OMG! Had to clear _layerContainer_OC >> This shouldn't happen!\nPlease report this message to passages thread!");
            this._tilemap.removeChild(this._layerContainer_OC);
        }

        _tileSprites = []; // Init tile sprite containers
        this._layerContainer_OC = new Sprite(); // Layer wrapper
        this._layerContainer_OC.z = 9999 + 1;
        let s = new Sprite(); s.z = 0; _tileSprites.push(s);
        this._layerContainer_OC.addChild(_tileSprites[0]);
        s = new Sprite(); s.z = 4; _tileSprites.push(s);
        this._layerContainer_OC.addChild(_tileSprites[1]);
        this._tilemap.addChild(this._layerContainer_OC);

    };

    // These methods will force system to draw tiles on bitmap (cover tiles)
    if (OcRam.Layers) {
        if (OcRam.Layers.parallaxOptimization()) {
            this.debug("OcRam.Layers parallax optimization detected", "DISABLE tile drawing totally!");
            Tilemap.prototype.drawTileToBitmap_OC = function () { return; };
        } else {
            this.debug("OcRam.Layers detected", "DISABLE passage tile drawing for <parallax> tilesets/maps!");
            Tilemap.prototype.drawTileToBitmap_OC = function (bitmap, tileId, dx, dy) {
                if (OcRam.Layers._usingParallax) return;
                if (Tilemap.isVisibleTile(tileId)) {
                    if (Tilemap.isAutotile(tileId)) {
                        this.drawAutotile_OC(bitmap, tileId, dx, dy);
                    } else {
                        this.drawNormalTile_OC(bitmap, tileId, dx, dy);
                    }
                }
            };
        }
    } else {
        Tilemap.prototype.drawTileToBitmap_OC = function (bitmap, tileId, dx, dy) {
            if (Tilemap.isVisibleTile(tileId)) {
                if (Tilemap.isAutotile(tileId)) {
                    this.drawAutotile_OC(bitmap, tileId, dx, dy);
                } else {
                    this.drawNormalTile_OC(bitmap, tileId, dx, dy);
                }
            }
        };
    }

    Tilemap.prototype.drawAutotile_OC = function (bitmap, tileId, dx, dy) {

        const kind = Tilemap.getAutotileKind(tileId);
        const shape = Tilemap.getAutotileShape(tileId);
        const tx = kind % 8;
        const ty = Math.floor(kind / 8);

        let setNumber = 0;
        let bx = 0;
        let by = 0;
        let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        let isTable = false;

        if (Tilemap.isTileA1(tileId)) {
            const waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
            setNumber = 0;
            if (kind === 0) {
                bx = waterSurfaceIndex * 2;
                by = 0;
            } else if (kind === 1) {
                bx = waterSurfaceIndex * 2;
                by = 3;
            } else if (kind === 2) {
                bx = 6;
                by = 0;
            } else if (kind === 3) {
                bx = 6;
                by = 3;
            } else {
                bx = Math.floor(tx / 4) * 8;
                by = ty * 6 + (Math.floor(tx / 2) % 2) * 3;
                if (kind % 2 === 0) {
                    bx += waterSurfaceIndex * 2;
                } else {
                    bx += 6;
                    autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
                    by += this.animationFrame % 3;
                }
            }
        } else if (Tilemap.isTileA2(tileId)) {
            setNumber = 1;
            bx = tx * 2;
            by = (ty - 2) * 3;
            isTable = this._isTableTile(tileId);
        } else if (Tilemap.isTileA3(tileId)) {
            setNumber = 2;
            bx = tx * 2;
            by = (ty - 6) * 2;
            autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
        } else if (Tilemap.isTileA4(tileId)) {
            setNumber = 3;
            bx = tx * 2;
            by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
            if (ty % 2 === 1) {
                autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
            }
        }

        const table = autotileTable[shape];
        const w1 = this._tileWidth / 2;
        const h1 = this._tileHeight / 2;

        const source = this._bitmaps[setNumber];

        for (let i = 0; i < 4; i++) {
            const qsx = table[i][0];
            const qsy = table[i][1];
            const sx1 = (bx * 2 + qsx) * w1;
            const sy1 = (by * 2 + qsy) * h1;
            const dx1 = dx + (i % 2) * w1;
            const dy1 = dy + Math.floor(i / 2) * h1;
            if (isTable && (qsy === 1 || qsy === 5)) {
                const qsx2 = qsy === 1 ? (4 - qsx) % 4 : qsx;
                const qsy2 = 3;
                const sx2 = (bx * 2 + qsx2) * w1;
                const sy2 = (by * 2 + qsy2) * h1;
                bitmap.blt(source, sx2, sy2, w1, h1, dx1, dy1, w1, h1);
                dy1 += h1 * 0.5;
                bitmap.blt(source, sx1, sy1, w1, h1 / 2, dx1, dy1, w1, h1 / 2);
            } else {
                bitmap.blt(source, sx1, sy1, w1, h1, dx1, dy1, w1, h1);
            }
        }

    };

    Tilemap.prototype.drawNormalTile_OC = function (bitmap, tileId, dx, dy) {

        let setNumber = 0;

        if (Tilemap.isTileA5(tileId)) {
            setNumber = 4;
        } else {
            setNumber = 5 + Math.floor(tileId / 256);
        }

        const w = this._tileWidth;
        const h = this._tileHeight;
        const sx = ((Math.floor(tileId / 128) % 2) * 8 + (tileId % 8)) * w;
        const sy = (Math.floor((tileId % 256) / 8) % 16) * h;
        const source = this._bitmaps[setNumber];

        if (source) {
            bitmap.blt(source, sx, sy, w, h, dx, dy, w, h);
        }

    };

    Tilemap.prototype.drawTableEdge_OC = function (bitmap, tileId, dx, dy) {
        if (Tilemap.isTileA2(tileId)) {
            const autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
            const kind = Tilemap.getAutotileKind(tileId);
            const shape = Tilemap.getAutotileShape(tileId);
            const tx = kind % 8;
            const ty = Math.floor(kind / 8);
            //const setNumber = 1;
            const bx = tx * 2;
            const by = (ty - 2) * 3;
            const table = autotileTable[shape];
            const w1 = this._tileWidth / 2;
            const h1 = this._tileHeight / 2;
            for (let i = 0; i < 2; i++) {
                const qsx = table[2 + i][0];
                const qsy = table[2 + i][1];
                const sx1 = (bx * 2 + qsx) * w1;
                const sy1 = (by * 2 + qsy) * h1 + h1 / 2;
                const dx1 = dx + (i % 2) * w1;
                const dy1 = dy + Math.floor(i / 2) * h1;
                //layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1 / 2);
                bitmap.blt(source, sx1, sy1, w1, h1 * 0.5, dx1, dy1, w1, h1 * 0.5);
            }
        }

    };

    Tilemap.prototype.drawShadow_OC = function (bitmap, shadowBits, dx, dy) {
        if (shadowBits & 0x0f) {
            const w1 = this._tileWidth / 2;
            const h1 = this._tileHeight / 2;
            for (let i = 0; i < 4; i++) {
                if (shadowBits & (1 << i)) {
                    const dx1 = dx + (i % 2) * w1;
                    const dy1 = dy + Math.floor(i / 2) * h1;
                    bitmap.fillRect(dx1, dy1, w1, h1, 'rgba(0,0,0,0.5)');
                }
            }
        }
    };

    Tilemap.prototype.paintTilesOnBitmap_OC = function (bm_lo, bm_hi, x, y, at) {

        const x1 = 0; const y1 = 0;
        const tileId0 = this._readMapData_OC(x, y, 0); // Autotile (ground)
        const tileId1 = this._readMapData_OC(x, y, 1); // Autotile (bush)
        const tileId2 = this._readMapData_OC(x, y, 2, true); // B-E tile (x/o)
        const tileId3 = this._readMapData_OC(x, y, 3, true); // B-E tile (*)
        const upperTileId1 = this._readMapData_OC(x, y - 1, 1);

        let tilesHigh = []; let tilesLow = [];
        const shadowBits = this._readMapData_OC(x, y, 4);

        if (at) {

            // Autotiles will be drawn "flat" (1 bitmap)

            if (this._isHigherTile(tileId0)) { tilesHigh.push(tileId0); }
            else { tilesLow.push(tileId0); }

            if (this._isHigherTile(tileId1)) { tilesHigh.push(tileId1); }
            else { tilesLow.push(tileId1); }

            bm_lo.clearRect(x1, y1, this._tileWidth, this._tileHeight);

            let i = 0;

            for (i = 0; i < tilesLow.length; i++) {
                const lowerTileId = tilesLow[i];
                if (lowerTileId < 0) {
                } else if (lowerTileId >= _tableEdgeVirtualId) {
                    this.drawTableEdge_OC(bm_lo, upperTileId1, x1, y1);
                } else {
                    this.drawTileToBitmap_OC(bm_lo, lowerTileId, x1, y1);
                } if (at) this.drawShadow_OC(bm_lo, shadowBits, x1, y1);
            }

            for (i = 0; i < tilesHigh.length; i++) {
                this.drawTileToBitmap_OC(bm_lo, tilesHigh[i], x1, y1);
            }

        } else {

            // B-E layers are drawn to low and high (2 bitmaps)

            if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
                if (!Tilemap.isShadowingTile(tileId0)) { tilesLow.push(_tableEdgeVirtualId + upperTileId1); }
            }

            if (this._isHigherTile(tileId2)) { tilesHigh.push(tileId2); }
            else { tilesLow.push(tileId2); }

            if (this._isHigherTile(tileId3)) { tilesHigh.push(tileId3); }
            else { tilesLow.push(tileId3); }

            bm_lo.clearRect(x1, y1, this._tileWidth, this._tileHeight);
            bm_hi.clearRect(x1, y1, this._tileWidth, this._tileHeight);

            for (let i = 0; i < tilesLow.length; i++) {
                const lowerTileId = tilesLow[i];
                if (lowerTileId < 0) {
                } else if (lowerTileId >= _tableEdgeVirtualId) {
                    this.drawTableEdge_OC(bm_lo, upperTileId1, x1, y1);
                } else {
                    this.drawTileToBitmap_OC(bm_lo, lowerTileId, x1, y1);
                } if (at) this.drawShadow_OC(bm_lo, shadowBits, x1, y1);
            }

            for (let i = 0; i < tilesHigh.length; i++) {
                this.drawTileToBitmap_OC(bm_hi, tilesHigh[i], x1, y1);
            }

        }

    };

    // Create shadow sprite to top layer
    Spriteset_Map.prototype.createShadow_OC = function () {
        this._shadowSprite = new Sprite();
        this._shadowSprite.bitmap = ImageManager.loadSystem('Shadow1');
        this._shadowSprite.anchor.x = 0.5;
        this._shadowSprite.anchor.y = 1;
        this._shadowSprite.z = 6;
        this._layerContainer_OC.addChild(this._shadowSprite);
    };

    // Local_Coop compatibility
    Game_Followers.prototype.isSomeoneCollided_OC = function (x, y, hl) {
        return this.visibleFollowers().some(function (follower) {
            return follower.pos(x, y) && (follower._higherLevel == hl);
        }, this);
    };

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    this.extend(Spriteset_Map, "createDestination", function () {
        _this["Spriteset_Map_createDestination"].apply(this, arguments);
        this._destinationSprite.z = 9999 + 2;
    });

    this.extend(Game_Player, "center", function () {
        _this["Game_Player_center"].apply(this, arguments); mapCulling();
    });

    // Preload tilesets
    this.extend(Scene_Boot, "isReady", function () {
        let ret = _this["Scene_Boot_isReady"].apply(this, arguments);
        if (ret) preLoadSeasonTilesets(); return ret;
    });

    // Forces system to reload whole tileset
    this.forceTilesetReload = function () {
        _flags = []; _currentShaderTilemap = null;
        _cacheReady = false; _tileSprites = [];
    };

    // Tileset change
    this.extend(Game_Map, "changeTileset", function (tilesetId, just_loaded) {
        OcRam.Time_System._prevTilesetId = this._tilesetId;
        OcRam.Time_System._currentTilesetId = tilesetId;
        _this["Game_Map_changeTileset"].apply(this, arguments);
        if (!just_loaded) {
            requestAnimationFrame(() => { reStartScene(); });
        }
    });

    // Update "z" based on Y coordinate if same priority
    this.extend(Tilemap, "updateTransform", function () {
        this._sortChildren_OC(); _this["Tilemap_updateTransform"].apply(this, arguments);
    }); if (!OcRam.isMZ()) { // In MV there's ShaderTilemap for webGL
        this.extend(ShaderTilemap, "updateTransform", function () {
            this._sortChildren_OC(); _this["ShaderTilemap_updateTransform"].apply(this, arguments);
        });
    }

    // Do not face up when behind ladders
    this.extend(Game_CharacterBase, "isOnLadder", function () {
        if (!this._higherLevel && this.regionId() == _coverId) return false;
        return _this["Game_CharacterBase_isOnLadder"].apply(this, arguments);
    });

    // Auto-assign floor level to new party members
    this.extend(Game_Party, "addActor", function (actorId) {
        _this["Game_Party_addActor"].apply(this, arguments);
        if (SceneManager._scene.isMap()) {
            const new_index = $gamePlayer._followers.visibleFollowers().length - 1;
            if (new_index < 4 && new_index > -1) {
                $gamePlayer._followers._data[new_index]._higherLevel = autoAssignFloorLevel($gamePlayer._followers._data[new_index]);
            }
        }
    });

    // Move sprites when scrolling map
    this.extend(Spriteset_Map, "update", function () {
        _this["Spriteset_Map_update"].apply(this, arguments);
        if (SceneManager._scene._spriteset && SceneManager._scene._spriteset._layerContainer_OC) {
            $gameMap.moveSpritesX_OC(); $gameMap.moveSpritesY_OC();
        }
    });

    // This is the day, events can underpass AND overpass despite of player floor level...
    this.extend(Game_CharacterBase, "refreshBushDepth", function () {
        _this["Game_CharacterBase_refreshBushDepth"].apply(this, arguments);
        const region_id = this.regionId();
        if (region_id == _overpassId) {
            this._higherLevel = true;
            if (SceneManager._scene._spriteset !== undefined) updateEvent(this);
        } else if (region_id == _underpassId) {
            this._higherLevel = this._priorityType == 2;
            if (SceneManager._scene._spriteset !== undefined) updateEvent(this);
        }
    });

    if (_useTallSprites) { // Followers use same floor level as player...

        this.extend(Game_Player, "refreshBushDepth", function () {
            mapCulling(); const old_lvl = this._higherLevel;
            _this["Game_Player_refreshBushDepth"].apply(this, arguments);
            if (old_lvl != this._higherLevel) {
                this._followers.visibleFollowers().forEach(function (f) {
                    f._higherLevel = $gamePlayer._higherLevel;
                    if (SceneManager._scene._spriteset !== undefined) {
                        getCharSprite(f)._showHigherSprite = f._higherLevel;
                    }
                });
            }
        });

        this.extend(Game_Follower, "refreshBushDepth", function () {
            _this["Game_CharacterBase_refreshBushDepth"].apply(this, arguments);
        });

    } else {

        // Culling done when player is moved (once in distance of tile)
        this.extend(Game_Player, "refreshBushDepth", function () {
            mapCulling(); _this["Game_Player_refreshBushDepth"].apply(this, arguments);
        });

    }

    // Update character graphics on event page change
    this.extend(Game_Event, "setupPage", function () {

        _this["Game_Event_setupPage"].apply(this, arguments);

        const ev_cmts = this.getStringComments();
        ev_cmts.forEach(s => {
            if (s == "<higher>") {
                this._higherLevel = true;
            } else if (s == "<lower>") {
                this._higherLevel = false;
            }
        });

        if (SceneManager._scene._spriteset !== undefined) {
            if (this._higherLevel === undefined) this._higherLevel = autoAssignFloorLevel(this);
            updateEvent(this);
        } else {
            requestAnimationFrame(() => {
                if (this._higherLevel === undefined) this._higherLevel = autoAssignFloorLevel(this);
                updateEvent(this);
            });
        }

    });

    // Check if sprite needs to be drawed
    /*this.extend(Sprite_Character, "updateVisibility", function () {
        _this["Sprite_Character_updateVisibility"].apply(this, arguments);
        if (this._showHigherSprite === undefined && !this._character._higherLevel) return;
        this.visible = (this._character._higherLevel) ? this._showHigherSprite : false;
    });

    // Update sprite graphics on updateAirshipAltitude
    this.extend(Game_Vehicle, "updateAirshipAltitude", function () {

        const is_hl = this._higherLevel;

        if (!this._driving && this.isHighest()) getCharSprite(this).visible = is_hl;
        
        if (!this.isLowest() && !this.isHighest()) {
            updateEvent(this); purgeHigherLevelSprite($gamePlayer);
            OcRam.followers().forEach(f => { purgeHigherLevelSprite(f); });
        }
        
        _this["Game_Vehicle_updateAirshipAltitude"].apply(this, arguments);

        if (!this._driving && this.isLowest()) {
            if (!_isAirshipLanded) {
                _isAirshipLanded = true; $gamePlayer._higherLevel = is_hl; updateEvent($gamePlayer);
                if (is_hl) getCharSprite($gamePlayer)._showHigherSprite = is_hl;
                $gamePlayer._followers.visibleFollowers().forEach(function (f) {
                    f._higherLevel = $gamePlayer._higherLevel; updateEvent(f);
                    if (is_hl) getCharSprite(f)._showHigherSprite = is_hl;
                });
            }
        }

    });

    // Floor level wise landing...
    this.extend(Game_Vehicle, "isLandOk", function (x, y, d) {
        const tmp_ret = _this["Game_Vehicle_isLandOk"].apply(this, arguments);
        if (tmp_ret) {
            if ($gameMap.regionId(x, y) == _coverId) return false;
            if (this._type == "airship") {
                if (!$gameMap.checkPassage(x, y, (1 << (d / 2 - 1)) & 0x0f, true)) return false;
            }
            return true;
        }
    });

    // "Smart" drop >> check which autotile is drawn to landing point
    this.extend(Game_Vehicle, "getOff", function () {
        _isAirshipLanded = false; let is_hl = false;
        if ($gamePlayer._vehicleType == "airship") {
            $gamePlayer._higherLevel = undefined;
            is_hl = autoAssignFloorLevel($gamePlayer) ||
                ($gameMap.regionId($gamePlayer._x, $gamePlayer._y) == _overpassId);
            this._higherLevel = is_hl;
        } _this.debug("Landed to " + (is_hl ? "higher" : "lower") + " level", $gamePlayer);
        _this["Game_Vehicle_getOff"].apply(this, arguments);
    });

    // If it's boat sea level is always 'low' level... Must be overwritten via JS if this is not the case
    this.extend(Game_Player, "updateVehicleGetOff", function() {
        if (!this.areFollowersGathering() && this.vehicle().isLowest()) {
            if ($gamePlayer._vehicleType != "airship") {
                setObjFloorLevel($gamePlayer, 'low');
                OcRam.followers().forEach(f => {
                    setObjFloorLevel(f, 'low');
                });
            }
        } _this["Game_Player_updateVehicleGetOff"].apply(this, arguments);
    });

    // For OcRam_Movement compatibility and floor level wise boarding...
    this.extend(Game_Player, "getOnVehicle", function () {

        const d = this.direction(); const x1 = this.x; const y1 = this.y;
        const x2 = $gameMap.roundXWithDirection(x1, d);
        const y2 = $gameMap.roundYWithDirection(y1, d);

        let vehicle_type = ''; let ret = false;

        if ($gameMap.airship().pos(x1, y1)) {
            vehicle_type = 'airship';
        } else if ($gameMap.ship().pos(x2, y2)) {
            vehicle_type = 'ship';
        } else if ($gameMap.boat().pos(x2, y2)) {
            vehicle_type = 'boat';
        } else {
            return false;
        }

        if (vehicle_type == 'airship' && (this._higherLevel != $gameMap.airship()._higherLevel)) {
            ret = false;
        } else {
            ret = _this["Game_Player_getOnVehicle"].apply(this, arguments);
        }

        return ret;
        
    });

    // Hide actor higherlevel sprites...
    this.extend(Game_Vehicle, "getOn", function () {
        _this["Game_Vehicle_getOn"].apply(this, arguments); let sprite = null;
        this._higherLevel = this.isAirship();
        for (let i = 0; i < $gamePlayer._followers.visibleFollowers().length; i++) {
            $gamePlayer._followers.visibleFollowers()[i]._transparent = true;
            updateEvent($gamePlayer._followers.visibleFollowers()[i]);
        } sprite = getCharSprite($gamePlayer);
        $gamePlayer._higherLevel = this._higherLevel;
        OcRam.followers().forEach(f => {
            f._higherLevel = this._higherLevel;
        }); if (sprite != undefined) sprite.visible = false; updateEvent($gamePlayer);
    });*/

    // Floor level wise collision check
    this.extend(Game_Event, "isCollidedWithPlayerCharacters", function (x, y) {
        if ($gamePlayer._followers.isSomeoneCollided_OC(x, y, this._higherLevel)) return true;
        if ($gamePlayer._higherLevel != this._higherLevel) return false;
        return _this["Game_Event_isCollidedWithPlayerCharacters"].apply(this, arguments);
    });

    // Special alias (to be used diffrently than normal aliases)
    const OC_Tilemap_readMapData = Tilemap.prototype._readMapData;

    // Passages will draw B-E COVER layers ALWAYS
    Tilemap.prototype._readMapData_OC = function (x, y, z) {
        return OC_Tilemap_readMapData.call(this, x, y, z);
    };

    // Core engine calls this to draw tiles 
    // >> Do not draw B-E COVER layers if they are already drawn on higher layers
    Tilemap.prototype._readMapData = function (x, y, z) {
        if (z == 2 || z == 3) {
            if ($gameMap.regionId(x, y) == _coverId) return 0;
        } return OC_Tilemap_readMapData.call(this, x, y, z);
    };

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================

    if (Imported.OcRam_Movement) {
        Game_CharacterBase.prototype.isCollidedWithEvents_OC = function (x, y, d, mx, my) {
            if (this.isPlayer()) {
                if (this.isInAirship()) return false;
                let idir = this.getInputDirection();
                if (OcRam.Movement.isDiagonalDir(idir)) return false;
            } let events = $gameMap.eventsXyNt(x, y);
            let ret = events.some(event => event.isNormalPriority() && (event._higherLevel == this._higherLevel));
            ret = ret && ((mx < 0.5 && my < 0.1) || (my < 0.5 && mx < 0.1));
            if (!ret) {
                switch (d) {
                    case 2: case 8:
                        if (mx > 0.5 && my < 0.1) {
                            events = $gameMap.eventsXyNt(x + 1, y);
                            ret = events.some(event => event.isNormalPriority() && (event._higherLevel == this._higherLevel));
                        } break;
                    case 4: case 6:
                        if (my > 0.5 && mx < 0.1) {
                            events = $gameMap.eventsXyNt(x, y + 1);
                            ret = events.some(event => event.isNormalPriority() && (event._higherLevel == this._higherLevel));
                        } break;
                }
            } return ret;
        };
    }

    // Consider floor level also!
    Game_Map.prototype.isPassable = function(x, y, d, hl) {
        return this.checkPassage(x, y, (1 << (d / 2 - 1)) & 0x0f, hl);
    };

    // Consider floor level also!
    Game_CharacterBase.prototype.isMapPassable = function (x, y, d) {

        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        const next_region_id = $gameMap.regionId(x2, y2);
        if (next_region_id == _blockId) return false;

        const this_region_id = $gameMap.regionId(x, y);
        const t_hl = this._higherLevel;
        const is_this_cover = (this_region_id == _coverId || this_region_id == _autoCoverId);

        if (t_hl) { // This char is in higher ground
            if (is_this_cover) {
                if (next_region_id == _underpassId) return false;
            } if (this_region_id == _blockHighLowId && next_region_id == _underpassId) return false;
        } else { // This char is in lower ground
            if (is_this_cover && (next_region_id == _overpassId || next_region_id == 0)) return false;
            if (next_region_id == _overheadId) return false;
            if ((this_region_id == _underpassId || is_this_cover) && (next_region_id == _underpassId ||
                next_region_id == _coverId || next_region_id == _autoCoverId)) return true;
        } return $gameMap.isPassable(x, y, d, this._higherLevel) && $gameMap.isPassable(x2, y2, this.reverseDir(d), this._higherLevel);

    };

    // Consider floor level also!
    Game_Map.prototype.checkPassage = function (x, y, bit, hl) {

        const this_region_id = $gameMap.regionId(x, y);
        if (this_region_id == _blockId) return false;
        if (!hl) { // Event which called this method, is on lower floor level
            if (this_region_id == _overheadId) return false;
            if (this_region_id == _blockHighLowId) return false;
        }

        const tiles = this.allTiles(x, y);

        for (let i = 0; i < tiles.length; i++) {
            if (tiles) {
                const flag = _flags[tiles[i]];
                if (((flag & 0x10) !== 0) || (hl ? false : (this_region_id == _coverId || this_region_id == _autoCoverId) ? true : false)) // [*] No effect on passage
                    continue;
                if ((flag & bit) === 0) // [o] Passable
                    return true;
                if ((flag & bit) === bit) // [x] Impassable
                    return false;
            }
        } return true;

    };

    // Consider floor level also!
    Game_CharacterBase.prototype.isCollidedWithEvents = function (x, y) {
        let events = $gameMap.eventsXyNt(x, y); const is_hl = this._higherLevel;
        return events.some(function (event) {
            return (event.isNormalPriority() && (event._higherLevel == is_hl));
        });
    };

    // Consider floor level also!
    Game_Event.prototype.isCollidedWithEvents = function (x, y) {
        let events = $gameMap.eventsXyNt(x, y); const is_hl = this._higherLevel;
        return events.some(function (event) {
            return (event.isNormalPriority() && (event._higherLevel == is_hl));
        });
    };

    // Change event interaction by floor level
    Game_Player.prototype.startMapEvent = function (x, y, triggers, normal) {
        // Start events ONLY if they are on same 'floor'
        if (!$gameMap.isEventRunning()) {
            const this_hl = (this !== undefined) ? this._higherLevel : false;
            for (const event of $gameMap.eventsXy(x, y)) {
                if (
                    event.isTriggerIn(triggers) &&
                    event.isNormalPriority() === normal
                ) {
                    let ev_cmts = []; let trigger_always = false;
                    ev_cmts = event.getStringComments(); trigger_always = false;
                    ev_cmts.forEach(s => {
                        if (s == "<trigger_always>") trigger_always = true;
                    }); if (event._higherLevel == this_hl || trigger_always) {
                        event.start(); updateEvent(event);
                    }
                }
            }
            /*$gameMap.eventsXy(x, y).forEach(event => {
                if (event.isTriggerIn(triggers)) {
                    let ev_cmts = []; let trigger_always = false;
                    ev_cmts = event.getStringComments(); trigger_always = false;
                    ev_cmts.forEach(s => {
                        if (s == "<trigger_always>") trigger_always = true;
                    }); if (event._higherLevel == this_hl || trigger_always) {
                        event.start(); updateEvent(event);
                    }
                }
            });*/
        }
    };

    // Do not "refreshBushDepth" if vehicle (prevents undesired under-/over passages)
    Game_Vehicle.prototype.refreshBushDepth = function () { /* do nothing */ };

    // Show balloons ABOVE cover tiles...
    Sprite_Balloon.prototype.updatePosition = function () {
        if ($gameMap) {
            this.x = this._target.x + Math.floor($gameMap._displayX * OcRam.twh[0]);
            this.y = this._target.y - this._target.height + Math.floor($gameMap._displayY * OcRam.twh[1]);
        } else {
            this.x = this._target.x;
            this.y = this._target.y - this._target.height;
        }
    };

    // Show animations ABOVE cover tiles...
    Sprite_AnimationMV.prototype.updatePosition = function () {
        if (this._animation.position === 3) {
            this.x = this.parent.width / 2;
            this.y = this.parent.height / 2;
        } else if (this._targets.length > 0) {
            const target = this._targets[0];
            const parent = target.parent;
            const grandparent = parent ? parent.parent : null;
            if ($gameMap) {
                this.x = target.x + Math.floor($gameMap._displayX * OcRam.twh[0]);
                this.y = target.y + Math.floor($gameMap._displayY * OcRam.twh[1]);
            } else {
                this.x = target.x;
                this.y = target.y;
            }
            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= target.height;
            } else if (this._animation.position === 1) {
                this.y -= target.height / 2;
            }
        }
    };

    Game_Character.prototype.setFloorLevel = function (str_level) {
        setObjFloorLevel(this, str_level);
    };

    if (Imported.OcRam_Events) { // Overwrite Game_Player.prototype.checkThrowPass to allow throw from higher to lower!
        Game_Character.prototype.checkThrowPass = function (x, y) {
            const x1 = this._direction == 6 ? x + 1 : this._direction == 4 ? x - 1 : x;
            const y1 = this._direction == 2 ? y + 1 : this._direction == 8 ? y - 1 : y;
            const nxt_rid = $gameMap.regionId(x1, y1); const ths_rid = $gameMap.regionId(x, y);
            const hne = !($gameMap.eventsXyNt(x1, y1).find(e => { return e._priorityType == 1 && this._higherLevel == e._higherLevel; }));
            return (this.isMapPassable(x, y, this._direction, this._higherLevel) && hne) ||
                (nxt_rid == _underpassId && hne) ||
                nxt_rid == OcRam.Events.allowedThrowRegionId() ||
                nxt_rid == OcRam.Events.allowedLandingRegionId() ||
                ths_rid == OcRam.Events.allowedThrowRegionId() ||
                ths_rid == OcRam.Events.allowedLandingRegionId();
        };
    }

    // ------------------------------------------------------------------------------
    // Core "must overrides"
    // ==============================================================================
    this.clearPluginData = function () {
        this.forceTilesetReload(); // When exited to title clear things up...
    };

    this.loadPluginData = gs => {
        gs.loadPassageData();
    };

    this.savePluginData = gs => {
        if (!OcRam._autoSaving) gs.savePassageData();
    };

    this.onMapStart = sm => {

        initSprites();

        if ($gameMap.isLoopHorizontal()) { // Horizontal loopped map edges....
            Game_Map.prototype.moveSpritesX_OC = function () {
                const cx = (this._displayX * OcRam.twh[0]) | 0;
                SceneManager._scene._spriteset._layerContainer_OC.x = -cx;
                if (_shiftedX && cx < this._pixelWidth - Graphics.width) {
                    shiftScreenPassagesX();
                } else if (!_shiftedX && cx > this._pixelWidth - Graphics.width) {
                    shiftScreenPassagesX();
                }
            }; if (OcRam._menuCalled) shiftScreenPassagesX();
        } else {
            Game_Map.prototype.moveSpritesX_OC = function () {
                SceneManager._scene._spriteset._layerContainer_OC.x = -(this._displayX * OcRam.twh[0]) | 0;
            };
        }

        if ($gameMap.isLoopVertical()) { // Vertical loopped map edges....
            Game_Map.prototype.moveSpritesY_OC = function () {
                const cy = (this._displayY * OcRam.twh[1]) | 0;
                SceneManager._scene._spriteset._layerContainer_OC.y = -cy;
                if (_shiftedY && cy < this._pixelWidth - Graphics.width) {
                    shiftScreenPassagesY();
                } else if (!_shiftedY && cy > this._pixelWidth - Graphics.width) {
                    shiftScreenPassagesY();
                }
            }; if (OcRam._menuCalled) shiftScreenPassagesY();
        } else {
            Game_Map.prototype.moveSpritesY_OC = function () {
                SceneManager._scene._spriteset._layerContainer_OC.y = -(this._displayY * OcRam.twh[1]) | 0;
            };
        }

    };

    this.onMapTerminate = sm => { // Make sure layers are saved before scene is terminated (except if new map)
        if (SceneManager.isNextScene(Scene_Map)) {
            if ($gamePlayer.newMapId() != $gameMap.mapId()) {
                Game_Map.prototype.moveSpritesY_OC = function () { }; Game_Map.prototype.moveSpritesX_OC = function () { };
                this.forceTilesetReload(); this.debug("New map is coming...", "Force to re-load whole tileset!");
            } else {
                if (OcRam.Time_System._currentTilesetId != OcRam.Time_System._prevTilesetId) {
                    this.forceTilesetReload(); this.debug("Season has been changed!", "Force to re-load whole tileset!");
                }
            }
        }
    };

    this.createLowerMapLayer = sm => {
        sm._baseSprite.removeChild(sm._shadowSprite);
        sm.createCoverLayers_OC();
        sm._baseSprite.addChild(sm._shadowSprite);
        sm._effectsContainer = sm._layerContainer_OC; // Show balloons + animations ABOVE cover tiles...
    };

    this.createLowerBattleLayer = sb => { };

    this.onMapLoaded = sm => { };

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================

    PluginManager.registerCommand("OcRam_" + this.name, "setFloorLevel", function (args) {
        _this.debug("Plugin command: setFloorLevel", args);
        if (SceneManager._scene._spriteset !== undefined) {

            const obj_id = Number(args.objectId);
            const this_obj = OcRam.getGameObject(obj_id);
            const str_level = String(args.floorLevel).toLowerCase();

            setObjFloorLevel(this_obj, str_level);
            if (obj_id == -1) { // update followers also...
                OcRam.followers().forEach(f => {
                    setObjFloorLevel(f, str_level);
                });
            }

        }
    });

}.bind(OcRam.Passages)());