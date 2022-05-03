//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Star_Tile_Fix.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); if (parseFloat(OcRam.version) < 1.09) alert("OcRam core v1.09 or greater is required!");

OcRam.addPlugin("Star_Tile_Fix", "1.01");

/*:
 * @target MZ
 * @plugindesc v1.01 This plugin will fix star tile above tall chars based on Y-coordinate!
 * @author OcRam
 * @url https://ocram-codes.net
 * @base OcRam_Core
 * @orderAfter OcRam_Core
 * @orderAfter OcRam_Layers
 * @orderAfter OcRam_Lights
 * @orderAfter OcRam_Passages
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS - None
 * ============================================================================
 * 
 * ----------------------------------------------------------------------------
 * PLUGIN PARAMETERS
 * ============================================================================
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
 * All who have used larger than 1 tile sprites, have propably strugled with
 * star (*) tiles. Star (*) tiles are ALWAYS drawn above characters even if 
 * character stands in FRONT of it.
 * 
 * This plugin will fix star tiles Z index based on Y coordinates!
 * 
 * For example large trees are usually marked with many star (*) tiles:
 * If your big character is in front of tree then tree is BEHIND your big char!
 *
 * No configurations needed - This is plug'n'play plugin! 
 * 
 * For SUPER complex star (*) tiles and very BIG characters OcRam_Passages is
 * recommended (like buildings which have irregular shapes and non-star tiles 
 * mixed with star (*) tiles).
 * 
 * NOTE: Import this plugin AFTER OcRam_Passages if it is used!
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
 * COMMERCIAL USE: (Standard license: 5 EUR, No-credits license: 40 EUR)
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
 * 2021/04/02 v1.00 - Initial release for v1.00 (Credits for camac93 for tests)
 * 2021/06/04 v1.01 - RETRO'ed for RMMV! (Credits to Drakkonis)
 *                    Optimized tile groupping method a lot! Also fixed some
 *                    bugs considering VERY big groups.
 *                    1px gfx glitch (rounding bug) fixed on VERY slow speed.
 *                    Flickering star tiles (1 frame) after any scene is fixed!
 */
/*
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 *     Tilemap.prototype._compareChildOrder
 */

Sprite.prototype.isStarChar = () => { return 0; };
TilingSprite.prototype.isStarChar = function () { return 0; };
if (Tilemap.Layer) Tilemap.Layer.prototype.isStarChar = () => { return 0; };

Sprite_Character.prototype.isStarChar = function () { return 0; };
if (VisuMZ.EventsMoveCore) {
    Window_EventLabel.prototype.isStarChar = function () { return 0; };
}

function Star_Character() {
    this.initialize.apply(this, arguments);
}

Star_Character.prototype = Object.create(Sprite_Character.prototype);
Star_Character.prototype.constructor = Star_Character;

Star_Character.prototype.initialize = function (tileId, px, py) {

   Sprite_Character.prototype.initialize.call(this);
    
    this._tilesetId = $gameMap.tilesetId();
    this._tileId = tileId;
    this._starYShift = OcRam.twh[1];
    //this._spriteId = 99999;

    this._character = {}; // Let's create fake character ;p
    this._character._tilesetId = $gameMap.tilesetId();
    this._character._tileId = tileId;

    if (OcRam.isMZ()) {
        this._character.screenX = function () {
            return ($gameMap.adjustX(px) * OcRam.twh[0] + OcRam.twh50[0]) | 0;
        };
        this._character.screenY = function () {
            return ($gameMap.adjustY(py) * OcRam.twh[1] + OcRam.twh[1]) | 0;
        };
    } else {
        this._character.screenX = function () {
            return Math.ceil($gameMap.adjustX(px) * OcRam.twh[0] + OcRam.twh50[0]);
        };
        this._character.screenY = function () {
            return Math.ceil($gameMap.adjustY(py) * OcRam.twh[1] + OcRam.twh[1]);
        };
    }
    
    this._character.screenZ = function () {
        return 3;
    }; this._character.isTransparent = function () { return false; };

    if (this._tileId > 0) this.setTileBitmap();

};

Star_Character.prototype.isTile = function () {
    return true;
};

Star_Character.prototype.isStarChar = function () {
    return this._starYShift;
};

Star_Character.prototype.update = function () {
    this.updateTileFrame();
    this.updatePosition();
};

Star_Character.prototype.updateBitmap = function () {
    if (this.isImageChanged()) {
        this._tilesetId = $gameMap.tilesetId();
        this._characterName = "";
        this._characterIndex = 0;
        if (this._tileId > 0) this.setTileBitmap();
    }
};

(function () {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================
    const _this = this; // Refers to this plugin - To be used in subscopes...

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    const initSprites = () => {
        _this.debug("Character count before:", SceneManager._scene._spriteset._characterSprites.length);
        let tmp = 0; const tm = SceneManager._scene._spriteset._tilemap;
        for (let x = 0; x < $gameMap.width(); x++) {
            for (let y = $gameMap.height(); y > -1; y--) {
                tmp = tm._readMapData_With_Stars(x, y, 2); if (tm._isHigherTile(tmp)) y = tm.drawStarPassability(tmp, x, y, 2);
                tmp = tm._readMapData_With_Stars(x, y, 3); if (tm._isHigherTile(tmp)) y = tm.drawStarPassability(tmp, x, y, 3);
            }
        } _this.debug("Character count after:", SceneManager._scene._spriteset._characterSprites.length);
    };

    // ------------------------------------------------------------------------------
    // TILE DEBUG
    // ==============================================================================
    let debugTile = () => { }; let initTileDebugger = () => { };

    if (OcRam.getBoolean(this.parameters["Debug mode"])) {

        function Sprite_Debug() {
            this.initialize.apply(this, arguments);
        }

        Sprite_Debug.prototype = Object.create(Sprite.prototype);
        Sprite_Debug.prototype.constructor = Sprite_Debug;

        Sprite_Debug.prototype.initialize = function (x, y, msg) {
            Sprite.prototype.initialize.call(this);
            /*this._x = x * 48; this.x = this._x;
            this._y = y * 48; this.y = this._y;
            this.bitmap = new Bitmap(48, 48);
            this.bitmap.clearRect(0, 0, 48, 48);
            if (msg == undefined || msg == null || msg === false) {
                this.bitmap.fillAll("rgba(255,0,0,0.5");
            } else {
                this.bitmap.fontSize = 20;
                this.bitmap.textColor = "#ffffff";
                this.bitmap.outlineColor = "#000000";
                this.bitmap.outlineWidth = 2;
                this.bitmap.drawText(msg, 0, 0, 48, 48, "center");
            }*/
        };

        // Move sprites when scrolling map
        Game_Map.prototype.moveDebugX_OC = function () {
            SceneManager._scene._spriteset._tileDebugger.x = -(this._displayX * OcRam.twh[0]) | 0;
        };
        Game_Map.prototype.moveDebugY_OC = function () {
            SceneManager._scene._spriteset._tileDebugger.y = -(this._displayY * OcRam.twh[1]) | 0;
        };

        this.extend(Spriteset_Map, "update", function () {
            _this["Spriteset_Map_update"].apply(this, arguments);
            if (SceneManager._scene._spriteset && SceneManager._scene._spriteset._tileDebugger) {
                $gameMap.moveDebugX_OC(); $gameMap.moveDebugY_OC();
            }
        });

        debugTile = (x, y, msg) => {
            OcRam.scene().children[0]._tileDebugger.addChild(new Sprite_Debug(x, y, msg));
        };

        initTileDebugger = sm => {
            sm._spriteset._tileDebugger = new Sprite();
            sm._spriteset._tileDebugger.z = 9999 + 1;
            sm._spriteset._tilemap.addChild(sm._spriteset._tileDebugger);
        };

    }

    // ------------------------------------------------------------------------------
    // Aliases
    // ==============================================================================

    // Core engine calls this to draw tiles >> Do not draw * tiles
    this.extend(Tilemap, "_readMapData", function (x, y, z) {
        if (z > 1 && $gameSwitches.value(67)) {
            const tmp = _this["Tilemap__readMapData"].apply(this, arguments);
            if (this._isHigherTile(tmp)) return 0; return tmp;
        } return _this["Tilemap__readMapData"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // New methods
    // ==============================================================================

    Tilemap.prototype._readMapData_With_Stars = function (x, y, z) {
        return _this["Tilemap__readMapData"].apply(this, arguments);
    };

    Tilemap.prototype.drawStarPassability = function (tile_id, px, py, pz) {

        if (!tile_id) return py;

        const spriteset = SceneManager._scene._spriteset;
        let ry = py | 0; let prev_tile_id = tile_id | 0; let shift = 0;

        // Our very first star tile in this group
        const sc = new Star_Character(tile_id, px, py);
        sc._starYShift = shift;
        spriteset._characterSprites.push(sc);
        spriteset._tilemap.addChild(sc);
        debugTile(px, py, sc._starYShift);

        while (true) { // Seek for other star tiles in this group
            const tid = this._readMapData_With_Stars(px, --ry, 3) || this._readMapData_With_Stars(px, --ry, 2);
            if (!tid) break;
            if (this.isSameTileGroup_OC(tid, prev_tile_id)) {
                shift += OcRam.twh[1];
                const ss = new Star_Character(tid, px, ry);
                ss._starYShift = shift;
                spriteset._characterSprites.push(ss);
                spriteset._tilemap.addChild(ss);
                debugTile(px, ry, ss._starYShift); prev_tile_id = tid;
            } else {
                break;
            }
        } return ++ry;

    };

    Tilemap.prototype.doShiftY_OC = function (tile1, tile2) {
        if (!tile1) return false;
        if (this.isSameTileGroup_OC(tile1, tile2)) {
            tile2 = tile1; return true;
        } else {
            return false;
        }
    };

    Tilemap.prototype.isSameTileGroup_OC = function (tile1, tile2) {
        return true;
    };

    // ------------------------------------------------------------------------------
    // Overrides
    // ==============================================================================
    // Override Tilemap._compareChildOrder (optimized as far as I could)
    Tilemap.prototype._compareChildOrder = function (a, b) {
        if (a.z !== b.z) return a.z - b.z;
        const _tmpA = a.y + a.isStarChar(); const _tmpB = b.y + b.isStarChar();
        return _tmpA !== _tmpB ? _tmpA - _tmpB : a.spriteId - b.spriteId;
    };

    // ------------------------------------------------------------------------------
    // OcRam_Core "must overrides"
    // ==============================================================================
    this.clearPluginData = () => { };
    this.loadPluginData = gs => { };
    this.savePluginData = gs => { };
    this.onMapStart = sm => { if($gameSwitches.value(67)) { initSprites(); initTileDebugger(sm);} };
    this.onMapTerminate = sm => { };
    this.createLowerMapLayer = sm => { };
    this.createLowerBattleLayer = sb => { };
    this.onMapLoaded = sm => { };

}.bind(OcRam.Star_Tile_Fix)());