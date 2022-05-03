//=========================================================
// Cae_LineOfSight.js
//=========================================================

/*:
 * @plugindesc v1.0 - Adds some handy functions for checking simple line-of-sight. Offers passability-, event-, and region-based occlusion metrics.
 * @author Caethyril
 *
 * @help Plugin Commands:
 *   None.
 *
 * Note: this plugin is not designed to work with:
 *   - looping maps (line-of-sight is assumed to be unique)
 *   - pixel-movement plugins (sight explicitly checks tile by tile)
 *
 * Script calls:
 *   Defines three new functions on Game_CharacterBase:
 *     - getSight_Tile(x, y, range, fov)
 *       -> returns true iff (x, y) is in sight
 *     - getSight_Char(char, range, fov)
 *       -> returns true iff character char is in sight
 *     - getSight_Event(eventId, range, fov)
 *       -> returns true iff map event with ID eventId is in sight
 *   In all cases, range and fov are optional.
 *     - fov defines the vision arc in degrees...
 *       -> e.g. fov = 90 means you can see 45 degrees either side.
 *     - range defines the vision range...
 *       -> e.g. range = 10 means you can see up to 10 tiles away.
 *   To omit the range, you need to pass in the value undefined (see below).
 *   If not specified, the default values will be used (see plugin parameters).
 *
 *   These new functions can be used in the editor via script call.
 *   Move route script examples:
 *     - this.getSight_Event(4, undefined, 90);
 *     - this.getSight_Char($gameMap.vehicle('ship'));
 *   Event command script examples:
 *     - $gameMap.event(this.eventId()).getSight_Char($gamePlayer, 5, 120);
 *     - $gamePlayer.getSight_Tile(5, 8, 3, 180);
 *
 * Parameters:
 *   You can pick an occlusion metric:
 *     - Map Occlusion:
 *       - Ignore: line-of-sight completely ignores tileset passability.
 *       - Any direction: see through any tile that is not X passability.
 *       - Direction-specific: see through tiles passable in sight directions.
 *     - Event Occlusion:
 *       - Ignore events: line-of-sight completely ignores events.
 *       - Object events: object events will block line-of-sight.
 *                        E.g. !$Gate1.png is an object sprite, it starts with !
 *                        (See also Help > Contents > Asset Standards.)
 *       - All events: all events will block line-of-sight.
 *       - Normal priority: only same-as-characters priority events will block.
 *       - All priorities: event priority ignored when determining sight block.
 *     - Region Occlusion:
 *       - Positive numbers denote blocking regions.
 *       - Negative numbers denote "see through" regions.
 *       - E.g. [1,2,3,-50,-51] will allow sight through regions 50 and 51,
 *                               but block sight through regions 1, 2, and 3.
 *       - Note that regions are checked last, and can override map/event blocks.
 *   Note that these settings are only for line-of-sight purposes.
 *   As-is, they won't have any visual impact in your game.
 *
 * Event notetags:
 *      <piercing sight>  when checking this event's sight, occlusion is ignored
 *      <no sight block>  this event cannot block line-of-sight
 *      <sight block>     this event will block line-of-sight
 *   <no sight block> will always take precedence over <sight block>.
 *   These notetags can be customised using the plugin parameters.
 *
 * Compatibility:
 *   Yanfly's EventChasePlayer plugin: load this plugin after Yanfly's.
 *   Aliases canSeePlayer of Game_Event from Yanfly's EventChasePlayer plugin.
 *   Defines three new functions on Game_CharacterBase (see above).
 *
 * Terms of use:
 *   Free to use and modify, commercially or otherwise.
 *   If used or modified, please credit Caethyril.
 *   You can find this plugin on my Google Drive:
 *     https://drive.google.com/drive/folders/0B47clJwJZOS0U2xrbGF0YUpoeEE
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.0: Initial release.
 *
 * @param --- Defaults ---
 * @text --- Defaults ---
 * @type select
 * @desc Values used when not otherwise specified.
 *
 * @param Default FOV
 * @text Default FOV
 * @parent --- Defaults ---
 * @type number
 * @min 0
 * @max 360
 * @desc Value used for field of vision when it's not specified.
 * Default: 90 degrees
 * @default 90
 *
 * @param Default Range
 * @text Default Range
 * @parent --- Defaults ---
 * @type number
 * @min -1
 * @desc Value used for range when it's not specified.
 * Default: -1 (unlimited)
 * @default -1
 *
 * @param --- Anchors ---
 * @text --- Anchors ---
 * @type select
 * @desc Determines where sight lines begin/end within tiles.
 *
 * @param Tile Anchor X
 * @text Tile Anchor X
 * @parent --- Anchors ---
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Determines where sight rays begin/end within a tile.
 * Default: 0.50 (centre)
 * @default 0.50
 *
 * @param Tile Anchor Y
 * @text Tile Anchor Y
 * @parent --- Anchors ---
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Determines where sight rays begin/end within a tile.
 * Default: 0.50 (centre)
 * @default 0.50
 *
 * @param --- Distance ---
 * @text --- Distance ---
 * @type select
 * @desc Options for measuring sight range.
 *
 * @param Distance Metric
 * @text Distance Metric
 * @parent --- Distance ---
 * @type combo
 * @option Default
 * @option Rectilinear
 * @option Cartesian
 * @desc Metric used to measure distance for range check.
 * Default uses distance metric of Game_Map.
 * @default Default
 *
 * @param --- Occlusion ---
 * @text --- Occlusion ---
 * @type select
 * @desc Options for determining what blocks sight.
 *
 * @param Map Occlusion
 * @text Map Occlusion
 * @parent --- Occlusion ---
 * @type combo
 * @option Ignore passability
 * @option Any direction
 * @option Direction-specific
 * @desc Default effect of map passability on line-of-sight.
 * See this plugin's help description for details.
 * @default Direction-specific
 *
 * @param Event Type Occlusion
 * @text Event Type Occlusion
 * @parent --- Occlusion ---
 * @type combo
 * @option Ignore events
 * @option Object events
 * @option All events
 * @desc Default sight-blocking setting for events.
 * See this plugin's help description for details.
 * @default Ignore events
 *
 * @param Event Priority Occlusion
 * @text Event Priority Occlusion
 * @parent --- Occlusion ---
 * @type combo
 * @option Normal priority
 * @option All priorities
 * @desc Restricts the event set checked for blocking sight.
 * See this plugin's help description for details.
 * @default All priorities
 *
 * @param Event Through
 * @text Event Through
 * @parent --- Occlusion ---
 * @type combo
 * @option No effect
 * @option See-through
 * @desc No effect:   Through setting is ignored for line-of-sight.
 * See-through: Through events won't block sight.
 * @default No effect
 *
 * @param Region Occlusion
 * @text Region Occlusion
 * @parent --- Occlusion ---
 * @type number[]
 * @min -255
 * @max 255
 * @desc Region IDs for determining line-of-sight.
 * See this plugin's help description for details.
 * @default []
 *
 * @param --- Notetags ---
 * @text --- Notetags ---
 * @type select
 * @desc Customisation options for notetags.
 * Note that these are all case-sensitive!
 *
 * @param Event tag: block
 * @text Event tag: block
 * @parent --- Notetags ---
 * @type text
 * @desc Custom key for the <sight block> event notetag.
 * Default: sight block
 * @default sight block
 *
 * @param Event tag: no block
 * @text Event tag: no block
 * @parent --- Notetags ---
 * @type text
 * @desc Custom key for the <no sight block> event notetag.
 * Default: no sight block
 * @default no sight block 
 *
 * @param Event tag: piercing
 * @text Event tag: piercing
 * @parent --- Notetags ---
 * @type text
 * @desc Custom key for the <piercing sight> event notetag.
 * Default: piercing sight
 * @default piercing sight
 *
 * @param --- Extras ---
 * @text --- Extras ---
 * @type select
 * @desc Additional cross-plugin features!
 *
 * @param YEP_ECP
 * @text YEP_EventChasePlayer
 * @parent --- Extras ---
 * @type select
 * @desc Options for Yanfly's Event Chase Player plugin.
 *
 * @param YEP_ECP Use LoS
 * @text Use line-of-sight
 * @parent YEP_ECP
 * @type boolean
 * @desc If true, replaces the default canSeePlayer function of Yanfly's plugin with a line-of-sight check.
 * @default false
 *
 * @param YEP_ECP Sight range
 * @text Sight range
 * @parent YEP_ECP
 * @type combo
 * @option
 * @option _chaseRange
 * @option _fleeRange
 * @option _sightRange
 * @desc The property checked to determine LoS range.
 * If blank, this plugin's Default Range value will be used.
 * @default
 *
 * @param YEP_ECP Sight FOV
 * @text Sight FOV
 * @parent YEP_ECP
 * @type combo
 * @option
 * @option _fov
 * @desc The property checked to determine field of vision.
 * If blank, this plugin's Default FOV value will be used.
 * @default
 */

var Imported = Imported || {};			// Import namespace
Imported.Cae_LineOfSight = 1.0;			// Import declaration

var CAE = CAE || {};				// Author namespace
CAE.LineOfSight = CAE.LineOfSight || {};	// Plugin namespace

(function(_) {

'use strict'

// ======================== Setup ======================== //

	_.params = PluginManager.parameters('Cae_LineOfSight');

	_.default = { 	v: Number(_.params['Default FOV'] || 90),
			r: Number(_.params['Default Range'] || -1)	};
	_.anch = {	x: Number(_.params['Tile Anchor X'] || 0.5),
			y: Number(_.params['Tile Anchor Y'] || 0.5)	};
	_.tags = {	evBlock: _.params['Event tag: block'] || 'sight block',
			evNoBlock: _.params['Event tag: no block'] || 'no sight block',
			evPiercing: _.params['Event tag: piercing'] || 'piercing sight'	};

	_.extras = {	YEP_ECP: { 	seeLoS: _.params['YEP_ECP Use LoS'] === 'true',
					defaultR: _.params['YEP_ECP Default range'],
					defaultF: _.params['YEP_ECP Default fov']	}};

	// Array of meaningful event occlusion parameter options in one place for ease of maintenance.
	_.evOcclOpts = ['ignore events', 'object events', 'normal priority', 'see-through'];

	// Text-to-number for convenient storage, retrieval, maintenance, and pedagogical benefit. Don't @ me.
	_.getEvOcclMask = function(text) {
		let index = _.evOcclOpts.indexOf(String(text).toLowerCase());		// Get index of option in array
		return index < 0 ? 0 : 1 << index;					// Return zero if no match, else bitmask
	};

	// Parses occlusion metric parameters into a convenient shorthand and validates them in the process.
	_.parseOcclParam = function(paramType, paramValue) {
		switch (paramType.toLowerCase()) {
			case 'map':
				switch (paramValue.toLowerCase()) {
					case 'direction-specific':	return 'dir';
					case 'any direction':		return 'any';
					case 'ignore passability':	// fall-through
					default:			return '';
				}
			case 'event':
				return paramValue.reduce(function(acc, cur) {	// Reduce all params from text to number
					return acc += _.getEvOcclMask(cur);		// Add 'em up, you can do it!
				}, 0);							// Start at zero
			default:
				console.error('Cae_LineOfSight.js error!\nparseOcclParam failed for inputs: type ' + paramType + ', value ' + paramValue);
				return;		// Uh-oh.
		}
	};

	_.setOcclMetric = function(pArray) {
		let mapVal = pArray.shift();
		let regArr = pArray.pop();
		_.gO = { map: _.parseOcclParam('map', mapVal),
			 event: _.parseOcclParam('event', pArray),
			 regions: JSON.parse(regArr || []).map(Number)	};
	};

	_.gD = { form: _.params['Distance Metric'] };
	_.setOcclMetric([_.params['Map Occlusion']].concat(_.params['Event Type Occlusion'],
			_.params['Event Priority Occlusion'], _.params['Event Through'],
			_.params['Region Occlusion']));

// ======================= Utility ======================= //

	// Returns anchor for input axis ('x' or 'y'); function for compatibility reasons.
	_.anchor = function(axis) { return _.anch[axis]; };

	// Sigh. This is for "infinitesimal" tile nudges, to avoid JS rounding issues.
	// Sub-pixel precision even on maps trillions of tiles high/wide. Problem solved~!
	_.tileEpsilon = function() {
		let w = $gameMap.width(), h = $gameMap.height();
		return Number.EPSILON * Math.max(w, h);
	};

	_.maxLineTiles = function(r) { return r ? 2 * r : 100; };	// Upper bound for tile-fetching loop, in case of error.

	// Returns true iff char is event with relevant notetag.
	_.isPiercingSight = function(char) {
		if (char instanceof Game_Event) {
			return !!char.event().meta[_.tags.evPiercing];
		}
		return false;
	};

	// Returns magnitude of Cartesian displacement between (x1, y1) and (x2, y2).
	_.distanceCart = function(x1, y1, x2, y2) { return Math.hypot(x2 - x1, y2 - y1); };

	// Returns magnitude of rectilinear displacement between (x1, y1) and (x2, y2).
	_.distanceRect = function(x1, y1, x2, y2) { return Math.abs(x2 - x1) + Math.abs(y2 - y1); };

	// Returns distance using specified metric.
	_.distance = function(x1, y1, x2, y2) {
		switch (_.gD) {
			case 'rectilinear':
				return _.distanceRect(x1, y1, x2, y2);
			case 'cartesian':
				return _.distanceCart(x1, y1, x2, y2);
			default:
				return $gameMap.distance(x1, y1, x2, y2);
		}
	};

	// Returns true if points are within distance r of one another.
	_.checkRange = function(x1, y1, x2, y2, r) {
		if (isNaN(r)) r = _.default.r;			// Validate, insert default if apt
		if (r < 0) return true;				// Negative r means unlimited range
		return _.distance(x1, y1, x2, y2) <= r;		// Compare and return
	};

	// Converts direction to degrees from +x axis. Remember it's a left-handed coordinate system!
	_.directionAngle = function(d) {
		switch (d) {
			case 6: return 0;
			case 3: return 45;
			case 2: return 90;
			case 1: return 135;
			case 4: return 180;
			case 7: return 225;
			case 8: return 270;
			case 9: return 315;
			default: return;	// oh what is you doin
		}
	};

	// Returns true if angle is between b1 & b2 inclusive, else false. Angles in degrees.
	_.angleInBounds = function(angle, b1, b2) {
		let arc = Math.abs(b1 - b2);		// Get angle range
		let lo = Math.min(b1, b2);		// Hi bound now via arc
		while (lo < 0) lo += 360;		// Be positive!
		while (angle < lo) angle += 360;	// Same or next revolution
		return lo + arc >= angle;		// Compare
	};

	// Returns true if target is within vision (no range limit).
	_.checkAngle = function(x1, y1, x2, y2, d, v) {
		if (isNaN(v)) v = _.default.v;				// Insert default if needed
		if (v < 0) v *= -1;					// No negative angles plz
		if (v >= 360) return true;				// That's an automatic pass in these parts!
		let t = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;	// Get angle to point, in degrees
		if (t < 0) t += 360;					// [-180, 180] -> [0, 360)
		let c = _.directionAngle(d);				// Get vision axis
		let a = c - v/2, b = c + v/2;				// Lower and upper bounds
		return _.angleInBounds(t, a, b);			// Compare and return
	};

	// Returns gradient of straight line from (x1, y1) to (x2, y2).
	_.getM = function(x1, y1, x2, y2) {
		let dx = x2 - x1, dy = y2 - y1;				// Coordinate differences
		if (dx === 0 && dy === 0) return;			// DISTINCT points plz
		return dy / dx;						// JS returns Infinity on attempted div by 0
	};

	// Get straight-line coords x or y given other coordinate, gradient m, and appropriate intercept.
	_.getX = function(y, m, x0) {
		if (x0 === undefined) return;		// Horizontal line or intercept omitted: x indeterminate!
		return y / m + x0;			// Standard case (including x constant)
	};

	_.getY = function(x, m, y0) {
		if (y0 === undefined) return;		// Vertical line or intercept omitted: y indeterminate!
		return m * x + y0;			// Standard case (including y constant)
	};

	// Get x & y intercepts from a point (x, y) and straight-line gradient m.
	_.getX0 = function(x, y, m) { return     m !== 0 ? x - y / m : undefined; };
	_.getY0 = function(x, y, m) { return isFinite(m) ? y - m * x : undefined; };

	// Converts coord c to in-tile coordinate in [0, 1). (Anchor is now applied in getSightLineTiles.)
	_.getPosInTile = function(c) { return (c % 1 + 1) % 1; };

	// Returns 3 if endpoints equal, 1 or 2 if at start or end respectively, 0 otherwise.
	_.endPt = function(x, y, x1, y1, x2, y2) {
		let  ix = Math.floor(x),   iy = Math.floor(y);	// Compare by tile
		let ix1 = Math.floor(x1), iy1 = Math.floor(y1);
		let ix2 = Math.floor(x2), iy2 = Math.floor(y2);
		if (ix1 === ix2 && iy1 === iy2) return 3;	// U wot
		if (ix  === ix2 && iy  === iy2) return 2;	// End of the line, buster
		if (ix  === ix1 && iy  === iy1) return 1;	// Just started and that's great
		return 0;					// Keep on truckin'
	};

	// Returns array of directions corresponding to tile borders crossed by line with gradient m passing through (x, y).
	// Input end: 3 => ignore both, 2 => ignore c2, 1 => ignore c1, else count both. Line direction e1 -> e2.
	_.getBorderCrosses = function(x, y, m, end) {
		let out = [];
		let tx = _.getPosInTile(x);				// Get tile-internal coordinates
		let ty = _.getPosInTile(y);
		let c1 = _.getY0(tx, ty, m);				// Get tile border y-intercepts (sufficient)
		let c2 = c1 === undefined ? undefined : c1 + m;
		if (~end & 1) {						// Incoming direction (if not ignored)
			if (c1 === undefined) {
				out.push(m > 0 ? 8 : 2);		// Vertical line, is m -Infinity?
			} else {
				     if (c1 >= 1) out.push(2);		// Else determine directions via intercept
				else if (c1 <= 0) out.push(8);		// Gosh dang this backward coordinate system
				else              out.push(4);		// No corners until/if I get around the rounding
			}
		}
		if (~end & 2) {						// Ditto for other edge of tile (outgoing)
			if (c2 === undefined) {
				out.push(m > 0 ? 2 : 8);
			} else {
				     if (c2 >= 1) out.push(2);
				else if (c2 <= 0) out.push(8);
				else              out.push(6);
			}
		}
		return out;						// All done
	};

	// Gets outgoing directions from this tile, given outgoing directions from previous tile.
	_.getNewDirs = function(dirs, prev) {
		return dirs.filter(function(d) {
			return !prev.some(function(p) {
				return d === 10 - p;
			});
		});
	};

	// Offsets old point to next tile using pt.d array as a directional guide.
	_.getNextPtByDirs = function(pt, d) {
		let x = pt.x, y = pt.y;
		let tx = _.getPosInTile(x);			// Get tile-internal coordinates
		let ty = _.getPosInTile(y);			// Thanks!
		let dx = 0, dy = 0;				// Initialise coordinate changes
		let e = _.tileEpsilon();			// For nudging back a tile
		if (d.contains(6)) dx = +1 - tx;		// Determine coordinate changes
		if (d.contains(4)) dx = -e - tx;
		if (dx !== 0) {					// x changed, y should change WITH it
			x += dx;				// Offset old x
			y = undefined;				// To be calculated after return
		} else {					// Otherwise it's a y change
			if (d.contains(2)) dy = +1 - ty;	// Get offset
			if (d.contains(8)) dy = -e - ty;
			if (dy !== 0) {				// Only if it changed
				y += dy;			// Apply offset
				x = undefined;			// To be calculated after return
			}
		}
		return { x: x, y: y, d: pt.d };			// Return new coords and unchanged directions
	};

// ======================= Core functions ======================= //

	// Exactly what it says on the tin. Gets array of tiles on line-of-sight, ordered from observer to target.
	_.getSightLineTiles = function(x_1, y_1, x_2, y_2) {
		let rev = x_1 > x_2;						// Ugly workaround to help border detection
		let x1 = parseInt(rev ? x_2 : x_1) + _.anchor('x');		// Expect integer input, now apply anchor
		let x2 = parseInt(rev ? x_1 : x_2) + _.anchor('x');		// Swap start/end points if appropriate
		let y1 = parseInt(rev ? y_2 : y_1) + _.anchor('y');		// This is why the function params l_o_o_k
		let y2 = parseInt(rev ? y_1 : y_2) + _.anchor('y');
		let out = [];							// Initialise output array
		let m = _.getM(x1, y1, x2, y2);					// Get straight-line gradient
		if (m === undefined) return out;				// Start is the end, no point continuing >_>
		let x0 = _.getX0(x1, y1, m), y0 = _.getY0(x1, y1, m);		// Get intercepts
		let pt = { x: x1, y: y1 };					// Initialise coords
		let end = 1, transit = [];					// Initialise others
		let debug = _.maxLineTiles(_.distanceRect(x1, y1, x2, y2));	// JUST IN CASE. O_O
		while (end < 2 && debug > 0) {					// Continue to end or until utterly lost
			pt.d = _.getBorderCrosses(pt.x, pt.y, m, end);		// Get tile borders crossed
			end = _.endPt(pt.x, pt.y, x1, y1, x2, y2);		// "Are we there yet?"
		/*v*/	out.push(pt);						// Output!
			if (end < 2) {
				transit = _.getNewDirs(pt.d, transit);		// Get direction(s) passing to next tile
				pt = _.getNextPtByDirs(pt, transit);		// Get next point, indicated by transit dir(s)
				if (pt.x === undefined) {			// Get remaining coordinate via eqn of line
					pt.x = _.getX(pt.y, m, x0);
				} else if (pt.y === undefined) {
					pt.y = _.getY(pt.x, m, y0);
				}
				debug--;					// Keep on countin', countin', countin'.
			}
		}
		if (rev) out.reverse();		// Reverse output if we swapped inputs...(no-one saw anything) <_<
		if (debug === 0) {		// O noes, loop timed out! Let's paint a big "kick me" sign right here.
			let msg = 'Cae_LineOfSight.js error!\nSight line failed to reach target within tile limit!';
			msg += '\nStart; end: ' + x1 + ',' + y1 + '; ' + x2 + ',' + y2 + '\nTiles: ' + out;
			console.error(msg);
		}
		return out.map(function(o) {			// Truncate fractional coords before returning
			return { x: Math.floor(o.x), y: Math.floor(o.y), d: o.d };
		});
	};

	// Returns true if tile at (x, y) is impassable in line of sight direction. Checks tileset passability.
	_.isSightBlock_Map = function(tile) {
		let x = tile.x, y = tile.y, dirs = tile.d;				// Shorthand
		switch (_.gO.map) {
			case 'dir':							// Passable in line direction
				return !dirs.every(function(d) {			// "not" because true = block
					return $gameMap.isPassable(x, y, d);
				});
			case 'any':							// Passable if marked O in tileset
				return ![2,4,6,8].some(function(d) {			// Check all directions this time
					return $gameMap.isPassable(x, y, d);
				});
			default:							// Map block setting absent or unrecognised
				return false;						// => No sight block
		}
	};

	// Checks whether events on a tile are blocking line-of-sight, returns true or false.
	_.isSightBlock_Event = function(tile) {
		let ignor = _.gO.event & _.getEvOcclMask('ignore events');			// Check flags
		let objEv = _.gO.event & _.getEvOcclMask('object events');
		let normP = _.gO.event & _.getEvOcclMask('normal priority');
		let cThru = _.gO.event & _.getEvOcclMask('see-through');
		if (!ignor) {									// If not ignoring events...
			let evs = $gameMap.eventsXy(tile.x, tile.y).filter(function(ev) {	// Get all events here
				let test = true;						// Block by default
				if (ev._pageIndex < 0) return false;				// Event inactive: ignore
				if (!ev.event().meta[_.tags.evBlock]) {				// Only if not tagged as block...
					test = test && (cThru ? !ev.isThrough() : true);	// ...apply "ignore through" filter
					test = test && (normP ? ev.isNormalPriority() : true);	// ...apply priority filter
					test = test && (objEv ? ev.isObjectCharacter() : true);	// ...apply !object.png filter
				}
				return test;
			});
			return !evs.every(function(ev) {			// Then don't block iff every remaining event...
				return !!ev.event().meta[_.tags.evNoBlock];	// ...has a <no sight block> tag
			});
		}
		return false;
	};

	// Returns true if tile's region ID is listed in the metric, false otherwise. Maybe extend to tile IDs.
	_.isSightBlock_Region = function(tile) {
		if (_.gO.regions.length < 1) return false;			// No regions, no block
		return _.gO.regions.contains($gameMap.regionId(tile.x, tile.y));
	};

	// Returns true if negative of tile's region ID is listed in the metric, else false.
	_.isSightAllow_Region = function(tile) {
		if (_.gO.regions.length < 1) return false;			// No regions, no change
		return _.gO.regions.contains(-$gameMap.regionId(tile.x, tile.y));
	};		// Separate from region block check cuz this works and I'm scared to change it. Y_Y

	// Returns true if sight is blocked, else false.
	_.isSightBlock = function(tile, isEnd) {
		let mapBlock = _.isSightBlock_Map(tile);
		let evtBlock = isEnd ? false : _.isSightBlock_Event(tile);	// Don't check events at the endpoints, kthxbai
		let regBlock = _.isSightBlock_Region(tile);
		let regAllow = _.isSightAllow_Region(tile);
		return regAllow ? false : (mapBlock || evtBlock || regBlock);
	};

	// Returns true if any tile in the input array is blocked, else false.
	_.isAnyBlocked = function(tiles) {
		return tiles.some(function(t, i) {
			let isEnd = i === 0 || i === tiles.length - 1;
			return _.isSightBlock(t, isEnd);
		});
	};

	// (x1, y1) observing (x2, y2), facing d, vision range r, vision arc v degrees.
	// Returns true iff line of sight is established and not blocked.
	_.getSight = function(x1, y1, x2, y2, r, d, v, pierce) {
		if (!_.checkRange(x1, y1, x2, y2, r)) return false;		// Out of range
		if (!_.checkAngle(x1, y1, x2, y2, d, v)) return false;		// Facing wrong direction
		if (pierce) return true;					// Piercing sight => no occlusion checks
		let tiles = _.getSightLineTiles(x1, y1, x2, y2);		// Get tiles on line-of-sight
		return !_.isAnyBlocked(tiles);					// Return true iff no obstacles
	};

// ================ User-facing functions ================ //

	// Returns true iff tile at (x, y) is in sight and range.
	// Vision arc / field of view (fov) is specified in degrees.
	Game_CharacterBase.prototype.getSight_Tile = function(x, y, range, fov) {
		let pierce = _.isPiercingSight(this);
		return _.getSight(this.x, this.y, x, y, range, this.direction(), fov, pierce);
	};

	// Shortcut for getting sight to character char.
	Game_CharacterBase.prototype.getSight_Char = function(char, range, fov) {
		if (char) return this.getSight_Tile(char.x, char.y, range, fov);
		console.error('Cae_LineOfSight.js error!\nCannot determine line of sight to unspecified character: ' + char);
		return;
	};

	// Shortcut for getting sight to map event with ID eventId.
	Game_CharacterBase.prototype.getSight_Event = function(eventId, range, fov) {
		let ev = $gameMap.event(eventId);
		if (ev) return this.getSight_Char(ev, range, fov);
		console.error('Cae_LineOfSight.js error!\nMap event ' + eventId + ' not found, cannot trace line of sight.');
		return;
	};

// ================= Additional features ================= //

// ------------ YEP Event Chase Player plugin ------------ //

	// Gets value of property on char as defined in plugin parameters.
	_.getYEPECPParam = function(char, p) {
		let suff = String(p).toUpperCase();			// Get property suffix
		let prop = _.extras.YEP_ECP['default' + suff];		// Get property name
		if (prop !== undefined) return char[prop];		// Return value (may be undefined)
		return;							// Unknown p
	};

	// Optional alias for sight check to use line of sight.
	_.Game_Event_canSeePlayer = Game_Event.prototype.canSeePlayer || {};	// Alias or null
	Game_Event.prototype.canSeePlayer = function() {
		if (_.extras.YEP_ECP.seeLoS) {					// Only check LoS if param says so
			let r = _.getYEPECPParam(this, 'r');			// Fetch range...
			let f = _.getYEPECPParam(this, 'f');			// ...and field of view
			if (this.getSight_Char($gamePlayer, r, f)) {		// Check LoS
				this._alertLock = this._sightLock;
				return true;
			} else {
				return false;
			}
		} else {							// Not using LoS
			return _.Game_Event_canSeePlayer.call(this);		// Callback for original behaviour
		}
	};

})(CAE.LineOfSight);