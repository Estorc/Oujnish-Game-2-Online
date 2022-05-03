/*******************************************************************************
 * Loot Tables v1.0.0 by dingk
 * For use in RMMV 1.6.2
 ******************************************************************************/
var Imported = Imported || {};
Imported.dingk_LootTables = true;

var dingk = dingk || {};
dingk.Loot = dingk.Loot || {};
dingk.Loot.version = '1.0.0';
dingk.Loot.filename = document.currentScript.src.match(/([^\/]+)\.js/)[1];

/*:
 * @plugindesc [v1.0.0] Create randomized tier-based loot drops within the editor.
 * @author dingk
 *
 * @param Global Loot Tables
 * @desc Pre-define some loot tables if desired, so you don't have to remake them in the Enemies editor.
 * @type struct<DropTable>[]
 * @default ["{\"Name\":\"Sample\",\"Drop Pools\":\"[\\\"{\\\\\\\"Pool Name\\\\\\\":\\\\\\\"Common\\\\\\\",\\\\\\\"Weight\\\\\\\":\\\\\\\"55\\\\\\\",\\\\\\\"Min Amount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Max Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"Pool Name\\\\\\\":\\\\\\\"Rare\\\\\\\",\\\\\\\"Weight\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"Min Amount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Max Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"Pool Name\\\\\\\":\\\\\\\"Epic\\\\\\\",\\\\\\\"Weight\\\\\\\":\\\\\\\"12\\\\\\\",\\\\\\\"Min Amount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Max Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\",\\\"{\\\\\\\"Pool Name\\\\\\\":\\\\\\\"Legendary\\\\\\\",\\\\\\\"Weight\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"Min Amount\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"Max Amount\\\\\\\":\\\\\\\"1\\\\\\\"}\\\"]\"}"]
 *
 * @param Plugin Command Settings
 *
 * @param Display Message
 * @parent Plugin Command Settings
 * @desc Allow the game to display the message of the item drop via plugin commands.
 * @on Yes
 * @off No
 * @default true
 *
 * @param Single Item Format
 * @parent Display Message
 * @desc The text to display when using the plugin command. Leave blank for none. %1 - Icon, %2 - Name
 * @default %1%2 found!
 *
 * @param Multiple Items Format
 * @parent Display Message
 * @desc The text to display when using the plugin command. Leave blank for none. %1 - Icon, %2 - Name, %3 - Count
 * @default %1%2 ×%3 found!
 *
 * @help
 * -----------------------------------------------------------------------------
 *   Introduction
 * -----------------------------------------------------------------------------
 *
 * Do you need your enemies to drop more loot or change how the game drops
 * items?
 *
 * This plugin adds a randomized tier-based loot drop mechanic to your game. 
 * You can customize loot tables in the plugin manager and set up various item 
 * pools. You can assign these loot tables to enemies or use plugin commands on
 * the map.
 *
 * Loot tables consist of different item pools, which are assigned different
 * weights. A pool with a higher weight has a higher chance of being selected.
 * A selected item pool will drop a random item that has been assigned to it.
 *
 * -----------------------------------------------------------------------------
 *   Notetags
 * -----------------------------------------------------------------------------
 *
 * In the notetags below, the keywords Item / Drop / Loot are interchangeable.
 * For example, you can use <Item Table>, <Drop Table>, or <Loot Table>.
 *
 * Item, Weapon, and Armor Notetags:
 *
 * <Loot Pool: name>
 *  - Put this item in the specified item pool.
 *  - Replace 'name' with the name of the item pool.
 *
 * Actor, Class, Weapon, Armor, and State Notetags:
 *
 * <name Weight: +n>
 * <name Weight: -n>
 * <name Weight: *n>
 *  - Adjust the weight at which an item pool is selected.
 *  - Replace 'name' with the name of the item pool.
 *  - Replace 'n' with a number (can be floating point). 
 *
 * Enemy Notetags:
 *
 * <Loot Table: name[, name, name, ...]>
 *  - Assign one or more loot tables in a comma-separated list to this enemy.
 *  - Replace 'name' with the name of the loot table.
 *
 * <Loot Table [rate]>
 * name
 * name: weight
 * name x[amount]: weight
 * name x[minAmount]-[maxAmount]: weight
 * ...
 * </Loot Table>
 *  - Create a local loot table for this enemy. Replace the following variables:
 *    - [Optional] rate : The probability that this table will drop items.
 *      Default is 100%. Replace with a decimal or percent value.
 *    - name : Name of the item or item pool. For items, you can use the names
 *      of the items or use 'Item [id]', 'Weapon [id]', or 'Armor [id]',
 *      replacing [id] with the item ID.
 *    - [amount] : Number of items to drop. Default is 1.
 *    - minAmount-maxAmount : Random range of items to drop (inclusive).
 *    - weight : Weight of the item or item pool. Default is 1.
 *  - Insert multiple of this notetag to allow multiple drops.
 * EXAMPLE:
 * <Loot Table 75%>
 * Item 3
 * Potion x2: 5
 * Common: 5
 * Common x3-5: 4
 * Rare: 1
 * </Loot Table>
 *  - There is a 75% chance that this enemy will drop an item with an ID of 3, 
 *    2 Potions, a random Common item, 3 to 5 of the same random Common item, or
 *    a random Rare item.
 *  - The total weight adds up to 16, so the Rare item has a 1/16 chance to drop,
 *    whereas the two Potions have a 5/16 chance.
 *
 * -----------------------------------------------------------------------------
 *   Plugin Commands
 * -----------------------------------------------------------------------------
 *
 * In the plugin commands below, the keywords Item / Drop / Loot are
 * interchangeable. Customize the message displayed in the plugin manager.
 *
 * GiveLootPool name [minAmount] [maxAmount]
 *  - Give the player an item from this item pool. Replace 'name' with the name
 *    of the item pool.
 *  - [Optional] Replace 'minAmount' and 'maxAmount' with the amount to give
 *    the player. Default is 1.
 *
 * GiveLootTable name
 *  - Give the player an item from this item table. Replace 'name' with the name
 *    of the item table.
 *
 * EnableLootMessage
 * DisableLootMessage
 *  - Toggle the message displayed after using the commands above on or off.
 *
 * SingleLootMessageFormat string
 * MultipleLootMessageFormat string
 *  - Change the message format. Replace 'string' with the new format.
 *    %1 - Icon, %2 - Name, %3 - Count
 *
 * ResetLootMessage
 *  - Return all loot message settings to default.
 *
 * -----------------------------------------------------------------------------
 *   Compatibility
 * -----------------------------------------------------------------------------
 * No issues found
 *
 * -----------------------------------------------------------------------------
 *   Terms of Use
 * -----------------------------------------------------------------------------
 * Free and commercial use and redistribution (under MIT License).
 *
 * -----------------------------------------------------------------------------
 *   Changelog
 * -----------------------------------------------------------------------------
 * v1.0.0 - Initial release
 */
/*~struct~DropTable:
 * @param Name
 * @desc Name of the loot table. Use <Loot Pool: name> in enemy notetags.
 *
 * @param Drop Pools
 * @desc Define one or more pools.
 * @type struct<DropPool>[]
 */
/*~struct~DropPool:
 * @param Pool Name
 * @desc Name of this loot pool. Use an item name to drop that item only.
 *
 * @param Weight
 * @desc The weight of this loot pool.
 * @type number
 * @min 1
 * @default 1
 *
 * @param Min Amount
 * @desc The minimum number of items this loot pool will drop.
 * @type number
 * @min 0
 * @default 1
 *
 * @param Max Amount
 * @desc The maximum number of items this loot pool will drop.
 * @min 0
 * @default 1
 */

//--------------------------------------------------------------------------------------------------
// Classes
//--------------------------------------------------------------------------------------------------

/** Class for item drop object */
class ItemDrop {
	/**
	 * Create item drop
	 * @param {Number} kind - Item, weapon, or armor
	 * @param {Number} dataId - ID of item
	 */
	constructor(kind, dataId) {
		this.kind = kind;
		this.dataId = dataId;
	}
	
	/**
	 * Return database object
	 * @return {Object} Database object
	 */
	getDataItem() {
		switch(this.kind) {
			case 1:
				return $dataItems[this.dataId];
			case 2: {
				let item = $dataWeapons[this.dataId];
				if (Imported.YEP_ItemCore && Imported.dingk_EquipLevels) {
					return DataManager.registerNewItem(item);
				}
				return item;
			}
			case 3: {
				let item = $dataArmors[this.dataId];
				if (Imported.YEP_ItemCore && Imported.dingk_EquipLevels) {
					return DataManager.registerNewItem(item);
				}
				return item;
			}
		}

	}
};

/** Class for the item drop pool */
class DropPool {
	/**
	 * Create drop pool
	 * @param {String} name - Name of pool
	 * @param {Number} minAmount - Minimum number of items dropped
	 * @param {Number} maxAmound - Maximum number of items dropped
	 * @param {Number} level - Level of item
	 * @param {Number} tier - Tier of item
	 */
	constructor(name, weight = 1, minAmount = 0, maxAmount = 0, level = 0, tier = 0) {
		this.name = name;
		this._weight = Math.max(0, Number(weight) || 0);
		this.minAmount = Number(minAmount) || 0;
		this.maxAmount = Number(maxAmount) || 0;
		if (this.minAmount > this.maxAmount) {
			[this.minAmount, this.maxAmount] = [this.maxAmount, this.minAmount];
		}
		this.level = level;
		this.tier = tier;
	}
	/**
	 * Set weight of pool.
	 * @param {Number} weight - Desired weight
	 */
	set weight(weight) {
		if (!weight || weight < 0) weight = 0;
		this._weight = Number(weight) || 0;
	}
	/**
	 * Get weight of pool.
	 * @return {Number} Weight of the pool.
	 */
	get weight() {
		if (this._weight < 0) this._weight = 0;
		return this._weight;
	}
	/**
	 * Return random number of items to drop
	 * @return {Number} Number between minAmount and maxAmount (inclusive)
	 */
	getAmount() {
		return dingk.Loot.randomInt(this.minAmount, this.maxAmount);
	}
};

/** Class for loot table */
class DropTable {
	/**
	 * Create loot table
	 * @param {String} name - Name of table
	 * @param {Array} pools - Array of drop pools
	 * @param {Number} minLevel - Minimum level of items in this table
	 * @param {Number} maxLevel - Maximum level of items in this table
	 * @param {Number} rate - Drop rate of items (0.0 - 1.0)
	 */
	constructor(name = '', pools = [], minLevel = 0, maxLevel = 0, rate = 1.0) {
		this.pools = pools;
		this.name = name;
		this.minLevel = minLevel;
		this.maxLevel = maxLevel;
		this.rate = rate;
	}
	/**
	 * Insert pools in this loot table
	 * @param {Object} pool - DropPool object
	 */
	insert(pool) {
		this.pools = this.pools.concat(pool);
	}
	clear() {
		this.pools = [];
	}
};

//--------------------------------------------------------------------------------------------------
// Globals
//--------------------------------------------------------------------------------------------------
dingk.Loot.Pools = {};
dingk.Loot.Tables = {};

dingk.Loot.params = PluginManager.parameters(dingk.Loot.filename);
dingk.Loot.tablesJson = dingk.Loot.params['Global Loot Tables'];
dingk.Loot.displayMsg = dingk.Loot.params['Display Message'];
dingk.Loot.displaySingle = dingk.Loot.params['Single Item Format'];
dingk.Loot.displayMultiple = dingk.Loot.params['Multiple Items Format'];
dingk.Loot.allowStack = true;

//--------------------------------------------------------------------------------------------------
// DataManager
//--------------------------------------------------------------------------------------------------

/**
 * Check if database is loaded, then process notetags
 * @return {bool} Whether database has loaded
 */
dingk.Loot.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!dingk.Loot.DataManager_isDatabaseLoaded.call(this)) return false;
	if (!dingk.Loot._loaded) {
		this.process_dingk_Loot_lootTables();
		dingk.Loot.getItemNames();
		dingk.Loot.getWeaponNames();
		dingk.Loot.getArmorNames();
		this.process_dingk_Loot_items($dataItems);
		this.process_dingk_Loot_items($dataWeapons);
		this.process_dingk_Loot_items($dataArmors);
		this.process_dingk_Loot_enemies();
		this.process_dingk_Loot_weights($dataActors);
		this.process_dingk_Loot_weights($dataClasses);
		this.process_dingk_Loot_weights($dataWeapons);
		this.process_dingk_Loot_weights($dataArmors);
		this.process_dingk_Loot_weights($dataStates);
		dingk.Loot._loaded = true;
	}
	return true;
};

/** Parse json */
DataManager.process_dingk_Loot_lootTables = function() {
	let jsonTables = JSON.parse(dingk.Loot.tablesJson);
	for (let jsonTable of jsonTables) {
		let table = JSON.parse(jsonTable);
		let name = table['Name'];
		let pools = JSON.parse(table['Drop Pools']);
		let dropTable = new DropTable(name);
		for (let pool of pools) {
			let obj = JSON.parse(pool);
			dropTable.insert(new DropPool(obj['Pool Name'], obj['Weight'],
				obj['Min Amount'], obj['Max Amount'], 0, obj['Tier']));
		}
		dingk.Loot.Tables[name] = dropTable;
	}
};

/** 
 * Parse notetags
 * @param {Array} group - List of database objects
 */
DataManager.process_dingk_Loot_items = function(group) {
	const alias = '(?:drop|loot|item)';
	const regex = new RegExp('<' + alias + ' pool: (.*)>', 'i');
	for (let n = 1; n < group.length; n++) {
		let obj = group[n];
		let notedata = obj.note.split(/[\r\n]+/);

		for (let note of notedata) {
			let result;
			if ([, result] = note.match(regex) || '') {
				let kind = dingk.Loot.getItemType(obj);
				if (!dingk.Loot.Pools[result]) dingk.Loot.Pools[result] = [];
				dingk.Loot.Pools[result].push(new ItemDrop(kind, n));
			}
		}
	}
};

/** Parse enemy notetags */
DataManager.process_dingk_Loot_enemies = function() {
	const group = $dataEnemies;
	const alias = '(?:drop|loot|item) table';
	const longLine = '\\s*(\\d*\\.?\\d+?)?(%)?(?: level)?\\s*(\\d+)?-?(\\d+)?';
	const regex = [
		new RegExp('<' + alias + longLine + '>', 'i'),
		new RegExp('<' + alias + longLine + ': (.*)>', 'i'),
		new RegExp('</' + alias + '(.*)?>', 'i')
	];

	for (let n = 1; n < group.length; n++) {
		let obj = group[n];
		const notedata = obj.note.split(/[\r\n]+/);

		let mode = '';
		let table = [];
		obj.dropTables = [];

		for (const note of notedata) {
			let result;
			// <drop table> <drop table rate> <drop table rate level x-y>
			if ([, ...result] = note.match(regex[0]) || '') {
				mode = 'drop table';
				table = new DropTable();
				// drop rate
				if (result[0]) {
					let rate = Number(result[0]);
					// %
					if (result[1]) rate /= 100;
					table.rate = rate;
				}
				// level
				if (result[2]) {
					let minLevel = Number(result[2]);
					let maxLevel = result[3] ? Number(result[3]) : minLevel;
					if (minLevel > maxLevel) {
						[minLevel, maxLevel] = [maxLevel, minLevel];
					}
					table.minLevel = minLevel;
					table.maxLevel = maxLevel;
				}
			}
			// <drop table: name> <drop table rate: name> <drop table rate level x-y: name>
			else if ([, ...result] = note.match(regex[1]) || '') {
				let rate, minLevel, maxLevel;
				// rate
				if (result[0]) {
					rate = Number(result[0]);
					// %
					if (result[1]) rate /= 100;
				}
				// level
				if (result[2]) {
					minLevel = Number(result[2]);
					maxLevel = result[3] ? Number(result[3]) : minLevel;
					if (minLevel > maxLevel) {
						[minLevel, maxLevel] = [maxLevel, minLevel];
					}
				}
				let names = result[4].split(',').map(a => a.trim());
				for (let name of names) {
					let dropTable = dingk.Loot.Tables[name];
					if (dropTable) {
						if (rate) dropTable.rate = rate;
						if (minLevel) dropTable.minLevel = minLevel;
						if (maxLevel) dropTable.maxLevel = maxLevel;
						obj.dropTables.push(dropTable);
					}
				}
			}
			// </drop table>
			else if (note.match(regex[2])) {
				mode = '';
				obj.dropTables.push(table);
				table = [];
			} else if (mode === 'drop table') {
				// name xmin // name xmin-max // name xmin-max: weight
				if ([, ...result] = note.match(/(.*) x(\d+)-?(\d+)?:?\s*(\d+)?/i) || '') {
					let name = result[0];
					let min = Number(result[1]);
					let max = result[2] ? Number(result[2]) : min;
					let weight = result[3] ? Number(result[3]) : 1;
					table.insert(new DropPool(name, weight, min, max));
				}
				// name: weight
				else if ([, ...result] = note.match(/(.*):\s*(\d+)/) || '') {
					let name = result[0];
					let weight = Number(result[1]);
					table.insert(new DropPool(name, weight, 1, 1));
				}
				// name
				else if ([, result] = note.match(/(.*)/) || '') {
					table.insert(new DropPool(result, 1, 1, 1));
				}
			}
		}
	}
};

/** 
 * Parse notetags
 * @param {Array} group - List of database objects
 */
DataManager.process_dingk_Loot_weights = function(group) {
	const regex = /<(.*) weight:\s*([*+-])?(\d*.?\d+?)>/i;
	for (let n = 1; n < group.length; n++) {
		let obj = group[n];
		const notedata = obj.note.split(/[\r\n]+/);
		
		obj.lootBuffs = {};
		
		for (const note of notedata) {
			let result;
			// <poolName weight: +n> <poolName weight: -n> <poolName weight: *n>
			if ([, ...result] = note.match(regex) || '') {
				if (result[1] === undefined) result[1] = '+';
				let rateAdj = {operation: result[1], rate: Number(result[2])};
				obj.lootBuffs[result[0]] = rateAdj;
			}
		}
	}
}

//--------------------------------------------------------------------------------------------------
// Game_Actor
//--------------------------------------------------------------------------------------------------

/**
 * Return list of weight adjustments of the actor, class, states, and equipment
 * @param {String} name - Name of drop pool
 * @return {Array} List of weight adjustments
 */
Game_Actor.prototype.getWeightAdjustments = function(name) {
	let buff = [this.actor().lootBuffs[name]];
	buff.push(this.currentClass().lootBuffs[name]);
	
	let states = this.states();
	for (let state of states) {
		if (!state) continue;
		buff.push(state.lootBuffs[name]);
	}
	
	let equips = this.equips();
	for (let equip of equips) {
		if (!equip) continue;
		buff.push(equip.lootBuffs[name]);
	}
	
	return buff;
};

//--------------------------------------------------------------------------------------------------
// Game_Enemy
//--------------------------------------------------------------------------------------------------

/**
 * Get drops from loot table
 * @return {Array} List of drops
 */
 
_Game_Enemy_setup = Game_Enemy.prototype.setup
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_Game_Enemy_setup.call(this,enemyId, x, y);
	this.ndrops = [];
	this.dndrops = [];
	this.dndropsdefined = false;
	for (i=0;i<this.enemy().dropItems.length;i++) {
		this.ndrops = this.ndrops.concat(this.enemy().dropItems[i]);
	}
};
 
 
Game_Enemy.prototype.isStollen = function() {
	
	if (!this.dndropsdefined) {
		for (i=0;i<this.enemy().dropTables.length;i++) {
			this.dndrops = this.dndrops.concat(this.enemy().dropTables[i]);
		}
		this.dndropsdefined = true;
	}
	
    const rate = this.dropItemRate();
    let drops = this.ndrops.reduce((r, di, id) => {
        if (di.kind > 0 && Math.random() * di.denominator < rate) {
			this.ndrops.splice(id, 1);
            return r.concat(this.itemObject(di.kind, di.dataId));
        } else {
            return r;
        }
    }, []);
	if (this.dndrops) {
		let pools = this.getDropCategory();
		if (pools && pools.length) {
			for (i=0;i<pools.length;i++) {
				this.dndrops.splice(pools[i].id-i, 1);
			}
			drops = drops.concat(this.getItemsFromPool(pools));
		}
	}
	return drops;
};
 
 
 
	_Game_Action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		if (typeof target._enemyId !== 'undefined' && $dataEnemies[target._enemyId].meta.ppg_action && $ppgIsDead == 0) {
			
			const result = target.result();
			this.subject().clearResult();
			result.clear();
			result.used = this.testApply(target);
			result.missed = 1;
			result.evaded = !result.missed && Math.random() < this.itemEva(target);
			result.physical = this.isPhysical();
			result.drain = this.isDrain();
			if (result.isHit()) {
				if (this.item().damage.type > 0) {
					result.critical = Math.random() < this.itemCri(target);
					const value = this.makeDamageValue(target, result.critical);
					this.executeDamage(target, value);
				}
				for (const effect of this.item().effects) {
					this.applyItemEffect(target, effect);
				}
				this.applyItemUserEffect(target);
			}
			this.updateLastTarget(target);
			
		} else {
			_Game_Action_apply.call(this, target);
			var result = target.result();
			if (result.isHit() && this.item().meta.steal) {
				stolledItem = target.isStollen();
				if (stolledItem.length > 0) {
					for (i=0;i<stolledItem.length;i++) {
						$gameParty.gainItem(stolledItem[i], 1);
						if (Number.isInteger(i/4)) {
							$gameMessage.setBackground(0);
							$gameMessage.setPositionType(2);
							switch (stolledItem.length-i-1) {
								case 0:
									$gameMessage.add(stolledItem[i].name + " volé !")
									break;
								case 1:
									$gameMessage.add(stolledItem[i].name + " volé !\n"+stolledItem[i+1].name + " volé !")
									break;
								case 2:
									$gameMessage.add(stolledItem[i].name + " volé !\n"+stolledItem[i+1].name + " volé !\n"+stolledItem[i+2].name + " volé !")
									break;
								default:
									$gameMessage.add(stolledItem[i].name + " volé !\n"+stolledItem[i+1].name + " volé !\n"+stolledItem[i+2].name + " volé !\n"+stolledItem[i+3].name + " volé !")
									break;
							}
						}
					}
				}
			}	
		}
	};
 
 
Game_Enemy.prototype.dropItemRate = function() {
	
	
	let difficultyDropRate;
	
		switch ($gameVariables.value(1000)) {
			case 0:
				difficultyDropRate = 0.5;
			break;
			case 1:
				difficultyDropRate = 1;
			break;
			case 2:
				difficultyDropRate = 0.5;
			break;
			case 3:
				difficultyDropRate = 0.4;
			break;
			case 4:
				difficultyDropRate = 0.33;
			break;
			case 5:
				difficultyDropRate = 0.25;
			break;
		}
	
	
	
    return $gameParty.hasDropItemDouble() ? (1+1*difficultyDropRate)*(1+difficultyDropRate*($cgmz.getProfession('Chasseur')._level/25)) : 1*(1+difficultyDropRate*($cgmz.getProfession('Chasseur')._level/25));
};
 
Game_Enemy.prototype.makeDropItems = function() {
	
	if (!this.dndropsdefined) {
		for (i=0;i<this.enemy().dropTables.length;i++) {
			this.dndrops = this.dndrops.concat(this.enemy().dropTables[i]);
		}
		this.dndropsdefined = true;
	}
	
	// MOG_TrPopUpBattle compatibility patch
	if (Imported.MOG_TrPopUpBattle && this._treasure.checked) {
		return this._treasure.item;
	}
	
    const rate = this.dropItemRate();
    let drops = this.ndrops.reduce((r, di) => {
        if (di.kind > 0 && Math.random() * di.denominator < rate) {
            return r.concat(this.itemObject(di.kind, di.dataId));
        } else {
            return r;
        }
    }, []);
	
	if (this.dndrops) {
		let pools = this.getDropCategory();
		if (pools && pools.length) {
			drops = drops.concat(this.getItemsFromPool(pools));
		}
	}
	console.log(drops);
	return drops;
};

/**
 * Get pools from table
 * @return {Array} List of pools
 */
Game_Enemy.prototype.getDropCategory = function() {
	let poolsToDrop = [];
	for (i=0;i<this.dndrops.length;i++) {
		if (this.dndrops[i].rate * this.dropItemRate() < Math.random()) continue;
		let pool = dingk.Loot.getDropCategory(this.dndrops[i]);
		pool.id = i;
		if (pool) poolsToDrop.push(pool);
	}
	return poolsToDrop;
};

/**
 * Get items from pools
 * @param {Array} pools - List of pools
 * @return {Array} List of items to be dropped
 */
Game_Enemy.prototype.getItemsFromPool = function(pools) {
	if (Imported.dingk_EquipLevels && dingk.EL.enableEnemyLevels) {
		// Yanfly's Enemy Levels
		if (Imported.YEP_EnemyLevels) {
			return dingk.Loot.getItemsFromPool(pools, this.level);
		}
		// Tsukihime's Enemy Levels
		if (Imported.EnemyLevels) {
			return dingk.Loot.getItemsFromPool(pools, this.level());
		}
	}
	return dingk.Loot.getItemsFromPool(pools);
};

//--------------------------------------------------------------------------------------------------
// Game_Interpreter
//--------------------------------------------------------------------------------------------------

/**
 * Add plugin commands to drop items from pools/tables
 * @param {String} command
 * @param {Array} args
 */
dingk.Loot.GI_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	dingk.Loot.GI_pluginCommand.call(this, command, args);
	let cmd = command.toUpperCase();
	let alias = '(?:drop|loot|item)';
	let rx1 = new RegExp('give' + alias + 'pool', 'i');
	let rx2 = new RegExp('give' + alias + 'table', 'i');
	if (cmd.match(rx1)) {
		let amountLo = Number(args[1]) || 1;
		let amountHi = Number(args[2]) || amountLo;
		let pool = new DropPool(args[0], 1, amountLo, amountHi)
		let drops = dingk.Loot.getItemsFromPool([pool]);
		dingk.Loot.giveDrops(drops);
	} else if (cmd.match(rx2)) {
		let name = args[0];
		let table = dingk.Loot.Tables[name];
		let pool = dingk.Loot.getDropCategory(table);
		let drops = dingk.Loot.getItemsFromPool([pool]);
		dingk.Loot.giveDrops(drops);
	} else if (cmd.match(/EnableLootMessage/i)) {
		dingk.Loot.displayMsg = true;
	} else if (cmd.match(/DisableLootMessage/i)) {
		dingk.Loot.displayMsg = false;
	} else if (cmd.match(/SingleLootMessageFormat/i)) {
		dingk.Loot.displaySingle = args.join(' ');
	} else if (cmd.match(/MultipleLootMessageFormat/i)) {
		dingk.Loot.displayMultiple = args.join(' ');
	} else if (cmd.match(/ResetLootMessage/i)) {
		dingk.Loot.displayMsg = dingk.Loot.params['Display Message'];
		dingk.Loot.displaySingle = dingk.Loot.params['Single Item Format'];
		dingk.Loot.displayMultiple = dingk.Loot.params['Multiple Items Format'];
	}
};

//--------------------------------------------------------------------------------------------------
// Game_Party
//--------------------------------------------------------------------------------------------------

/**
 * Adjust the weights of the loot table based on buffs on actors in party
 * @param {Object} table - Loot table
 * @return {Object} New loot table with adjusted weights
 */
Game_Party.prototype.getWeightAdjustments = function(table) {
	let dropTable = Object.assign(new DropTable(), table);
	dropTable.clear();
	for (let pool of table.pools) {
		let newPool = Object.assign(new DropPool(), pool);
		let [add, multiply] = [0, 1];
		for (let member of this.battleMembers()) {
			let buffs = member.getWeightAdjustments(pool.name);
			for (let buff of buffs) {
				if (!buff) continue;
				if (buff.operation.includes('*')) {
					multiply *= buff.rate;
				} else if (buff.operation.includes('-')) {
					add -= buff.rate;
				} else {
					add += buff.rate;
				}
			}
		}
		newPool.weight = newPool.weight * multiply + add;
		dropTable.insert(newPool);
	}
	return dropTable;
};

//--------------------------------------------------------------------------------------------------
//  dingk.Loot and Utils
//--------------------------------------------------------------------------------------------------

/** Make associative arrays of items with their IDs */
dingk.Loot.getItemNames = function() {
	if (dingk.ItemIds) return;
	dingk.ItemIds = {};
	let group = $dataItems;
	for (let n = 1; n < group.length; n++) {
		if (group[n].name) {
			dingk.ItemIds[group[n].name] = n;
		}
	}
};

/** Make associative arrays of weapons with their IDs */
dingk.Loot.getWeaponNames = function() {
	if (dingk.WeaponIds) return;
	dingk.WeaponIds = {};
	let group = $dataWeapons;
	for (let n = 1; n < group.length; n++) {
		if (group[n].name) {
			dingk.WeaponIds[group[n].name] = n;
		}
	}
};

/** Make associative arrays of armors with their IDs */
dingk.Loot.getArmorNames = function() {
	if (dingk.ArmorIds) return;
	dingk.ArmorIds = {};
	let group = $dataArmors;
	for (let n = 1; n < group.length; n++) {
		if (group[n].name) {
			dingk.ArmorIds[group[n].name] = n;
		}
	}
};

/**
 * Return item type as a number
 * @param {Object} item
 * @return {Number} Item type
 */
dingk.Loot.getItemType = function(item) {
	if (DataManager.isItem(item)) return 1;
	if (DataManager.isWeapon(item)) return 2;
	if (DataManager.isArmor(item)) return 3;
};

/**
 * Get items from pools
 * @param {Array} pools - List of pools
 * @param {Number} level - Level of items
 * @return {Array} List of items to be dropped
 */
dingk.Loot.getItemsFromPool = function(pools, level) {
	let drops = [];
	let item, result;
	for (let pool of pools) {
		let amount = dingk.Loot.randomInt(pool.minAmount, pool.maxAmount);
		if (dingk.ItemIds[pool.name]) {
			item = $dataItems[dingk.ItemIds[pool.name]];
		} else if (dingk.WeaponIds[pool.name]) {
			item = $dataWeapons[dingk.WeaponIds[pool.name]];
		} else if (dingk.ArmorIds[pool.name]) {
			item = $dataArmors[dingk.ArmorIds[pool.name]];
		} else if ([, ...result] = pool.name.match(/(ITEM|WEAPON|ARMOR)\s*(\d+)/i) || '') {
			if (result[0].match(/ITEM/i)) {
				item = $dataItems[result[1]];
			} else if (result[0].match(/WEAPON/i)) {
				item = $dataWeapons[result[1]];
			} else if (result[0].match(/ARMOR/i)) {
				item = $dataArmors[result[1]];
			}
		} else {
			let iPool = dingk.Loot.Pools[pool.name];
			if (!iPool) continue;
			item = iPool[Math.randomInt(iPool.length)].getDataItem();
		}
		
		// dingk_EquipLevels compatibility patch
		if (Imported.YEP_ItemCore && Imported.dingk_EquipLevels && !DataManager.isItem(item)) {
			let newItem = ItemManager.registerEquipLevel(item, level);
			for (let i = 0; newItem && i < amount; i++) drops.push(newItem);
		} else {
			for (let i = 0; item && i < amount; i++) drops.push(item);
		}
	}
	return drops;
};

/**
 * Return a random pool
 * @param {Object} table - Loot table
 * @return {Object} Drop pool
 */
dingk.Loot.getDropCategory = function(table) {
	if (!table) return;
	let newTable = $gameParty.getWeightAdjustments(table);
	let pools = newTable.pools;
	let totalWeight = pools.reduce((a, dp) => a + dp.weight, 0);
	let randWeight = Math.random() * totalWeight;
	let accWeight = 0;
	for (let pool of pools) {
		accWeight += pool.weight;
		if (randWeight < accWeight) {
			return pool;
		}
	}
};

/**
 * Give the party items from a list and display the message
 * @param {Array} drops - List of items to be given
 */
dingk.Loot.giveDrops = function(drops) {
	let itemCount = {}, weaponCount = {}, armorCount = {};

	for (let item of drops) {
		if (DataManager.isItem(item)) {
			itemCount[item.id] = itemCount[item.id] + 1 || 1;
		} else if (DataManager.isWeapon(item)) {
			weaponCount[item.id] = weaponCount[item.id] + 1 || 1;
		} else if (DataManager.isArmor(item)) {
			armorCount[item.id] = armorCount[item.id] + 1 || 1;
		}
	}
	for (let item of drops) {
		if (!item) continue;
		let icon = '\x1bI[' + item.iconIndex + ']';
		let name = item.textColor ?
			'\x1bC[' + item.textColor + ']' + item.name + '\x1bC[0]':
			item.name;

		if (DataManager.isItem(item)) {
			var amount = itemCount[item.id];
			if (amount > 1) itemCount[item.id] = 0;
		} else if (DataManager.isWeapon(item)) {
			var amount = weaponCount[item.id];
			if (amount > 1) weaponCount[item.id] = 0;
		} else if (DataManager.isArmor(item)) {
			var amount = armorCount[item.id];
			if (amount > 1) armorCount[item.id] = 0;
		} else {
			continue;
		}
		if (dingk.Loot.displayMsg && amount > 0) {
			if (amount === 1) {
				let fmt = dingk.Loot.displaySingle;
				if (fmt) $gameMessage.add(fmt.format(icon, name));
			} else {
				let fmt = dingk.Loot.displayMultiple;
				if (fmt) $gameMessage.add(fmt.format(icon, name, amount));
			}
		}
		$gameParty.gainItem(item, 1);
	}
};

/**
 * Return random integer between two numbers (inclusive)
 * @param {Number} min
 * @param {Number} max
 * @return {Number} Random integer between min and max (inclusive)
 */
dingk.Loot.randomInt = function(min, max) {
	if (max < min) [min, max] = [max, min];
	return Math.floor(Math.random() * (max + 1 - min)) + min;
};

/**
 * Eval but faster
 * @param {String} code - Javascript code
 * @return Some value
 */
dingk.Loot.eval = function(code) {
	return Function('return ' + code)();
};