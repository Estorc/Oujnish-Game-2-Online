//=========================================================
// Cae_BuySellVar.js
//=========================================================

/*:
 * @plugindesc v1.2 - Change specified variables when buying/selling.
 * @author Caethyril
 * @target MZ
 *
 * @help Plugin Commands:
 *   None.
 *
 * Item/Weapon/Armor notetags:
 *     <buy var: v, x>
 *       When buying, increase variable v by x per item bought.
 *     <sell var: v, x>
 *       When selling, increase variable v by x per item sold.
 *   x is optional in both of these; if omitted it will default to 1.
 *   Examples:
 *     <buy var: 5>
 *       +1 to var 5 per item bought
 *     <sell var: 12, -1>
 *       -1 to var 12 per item sold
 *   You can customise the names of these notetags via the plugin parameters.
 *
 * Compatibility:
 *   Aliases:
 *     Scene_Shop: doBuy, doSell
 *
 * Terms of use:
 *   Free to use and modify.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Update log:
 *   1.2: Patched careless error with parseInt. .-.
 *   1.1: Parse tags with parseInt rather than Number, for robustness.
 *   1.0: Initial release.
 * 
 * @param Buy Notetag
 * @text Buy Notetag
 * @type text
 * @desc Customise the name of the 'buy var' notetag.
 * @default buy var
 *
 * @param Sell Notetag
 * @text Sell Notetag
 * @type text
 * @desc Customise the name of the 'sell var' notetag.
 * @default sell var
 */

var Imported = Imported || {};			// Import namespace, var can redefine
Imported.Cae_BuySellVar = 1.2;			// Import declaration

var CAE = CAE || {};				// Author namespace, var can redefine
CAE.BuySellVar = CAE.BuySellVar || {};		// Plugin namespace

(function(_) {
	
	function LEshopPriceUp() {
		
		if ($gameSwitches.value(526)) {
			
			return ($gameVariables.value(50)+1);
			
		} else {
			
			return 1;
			
		}
		
	}
	
	

Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    // [Note] Different browser makes different rendering with
    //   textBaseline == 'top'. So we use 'alphabetic' here.
    const context = this.context;
    const alpha = context.globalAlpha;
    maxWidth = maxWidth || 0xffffffff;
    let tx = x;
    let ty = Math.round(y + lineHeight / 2 + this.fontSize * 0.35);
    if (align === "center") {
        tx += maxWidth / 2;
    }
    if (align === "right") {
        tx += maxWidth;
    }
    context.save();
    context.font = this._makeFontNameText();
    context.textAlign = align;
    context.textBaseline = "alphabetic";
    this._drawTextOutline(text, tx, ty, maxWidth);
    context.globalAlpha = alpha;
    this._drawTextBody(text, tx, ty, maxWidth);
    context.restore();
    this._baseTexture.update();
};



_Window_Base_drawItemName = Window_Base.prototype.drawItemName
Window_Base.prototype.drawItemName = function(item, x, y, width) {
    if (item && item.meta.Color && item.meta.Color == " #190830") {
		this.changeOutlineColor("#8741a6");
    }
    if (item && item.meta.Color && item.meta.Color == " #0062ff") {
		this.changeOutlineColor("#cfd2ff");
    }
	_Window_Base_drawItemName.call(this, item, x, y, width)
};



Scene_Shop.prototype.doBuy = function(number) {
	if ($CasinoShop) {
		$gameVariables.setValue(115,$gameVariables.value(115)-number * this.buyingPrice())
	} else {
		$gameParty.loseGold(number * this.buyingPrice());
	}
    $gameParty.gainItem(this._item, number);
};



	Scene_Shop.prototype.buyingPrice = function(number) {
		return Math.floor(this._buyWindow.price(this._item)/(1+(($CasinoShop ? 0 : ($cgmz.getProfession('Marchand')._level-1))/24))) * (LEshopPriceUp() + $gameSwitches.value(526)*(number-1));
	};


	Window_ShopBuy.prototype.isEnabled = function(item) {
		return (
			item && Math.floor(this.price(item)/(1+(($CasinoShop ? 0 : ($cgmz.getProfession('Marchand')._level-1))/24)))*LEshopPriceUp() <= this._money && !$gameParty.hasMaxItems(item)
		);
	};


	Window_ShopBuy.prototype.drawItem = function(index) {
		const item = this.itemAt(index);
		const price = Math.floor(this.price(item)/(1+(($CasinoShop ? 0 : ($cgmz.getProfession('Marchand')._level-1))/24)))*LEshopPriceUp();
		const rect = this.itemLineRect(index);
		const priceWidth = this.priceWidth();
		const priceX = rect.x + rect.width - priceWidth;
		const nameWidth = rect.width - priceWidth;
		this.changePaintOpacity(this.isEnabled(item));
		this.drawItemName(item, rect.x, rect.y, nameWidth);
		this.drawText(price, priceX, rect.y, priceWidth, "right");
		this.changePaintOpacity(true);
	};



	_.update = function(num) {
			if ($gameSwitches.value(515)) {
				let plus = 1 * num;
				$gameVariables.setValue(41, $gameVariables.value(41) + plus);
			}
			if ($gameSwitches.value(526)) {
				let plus = 1 * num;
				$gameVariables.setValue(50, $gameVariables.value(50) + plus);
			}
	};
	
	_Scene_Shop_prepare = Scene_Shop.prototype.prepare
	Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
		_Scene_Shop_prepare.call(this,goods,purchaseOnly);
		if ($CasinoShop) {
			for (i=0;i<this._goods.length;i++) {
				
				if ($gameParty.hasItem($dataItems[this._goods[i][1]])) {
					
					this._goods.splice(i,1);
					
				}
				
			}
		}
	};

	_.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
	Scene_Shop.prototype.doBuy = function(number) {
		for (i = 1; i <= number; i++) {
			if ($CasinoShop) {
				$gameVariables.setValue(115,$gameVariables.value(115)-this.buyingPrice(i))
			} else {
				$gameParty.loseGold(this.buyingPrice(i));
			}
			$gameParty.loseGold(this.buyingPrice(i));
		}
		$gameParty.gainItem(this._item, number);
		
		if ($CasinoShop) {
		const index = this._buyWindow.index();
		this._goods.splice(index, 1);
		this._buyWindow.select(index-1);
		}
		
		_.update(number);
		$cgmz.changeProfessionExp('Marchand','+', number);
	};

  	_.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
	Scene_Shop.prototype.doSell = function(number) {
		_.Scene_Shop_doSell.call(this, number);
		$cgmz.changeProfessionExp('Marchand','+', number);
	};
	
	
	
	Scene_Shop.prototype.onBuyOk = function() {
		this._item = this._buyWindow.item();
		this._buyWindow.hide();
		this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice(1), "buy");
		this._numberWindow.setCurrencyUnit(this.currencyUnit());
		this._numberWindow.show();
		this._numberWindow.activate();
	};
	
	
	Scene_Shop.prototype.onSellOk = function() {
		this._item = this._sellWindow.item();
		this._categoryWindow.hide();
		this._sellWindow.hide();
		this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice(), "sell");
		this._numberWindow.setCurrencyUnit(this.currencyUnit());
		this._numberWindow.show();
		this._numberWindow.activate();
		this._statusWindow.setItem(this._item);
		this._statusWindow.show();
	};

	
	
	Window_ShopNumber.prototype.setup = function(item, max, price, type) {
		this._item = item;
		this._max = Math.floor(max);
		this._price = price;
		this._number = 1;
		this._type = type;
		this.placeButtons();
		this.refresh();
	};
	
	

	Window_ShopNumber.prototype.drawTotalPrice = function() {
		const padding = this.itemPadding();
		let total = 0;
		if (this._type == "buy") {
			for (i = 1; i <= this._number; i++) {
				total += ((this._price / LEshopPriceUp()) * (LEshopPriceUp() + $gameSwitches.value(526)*(i-1)));
			}
		} else {
			total += this._price * this._number;
		}
		const width = this.innerWidth - padding * 2;
		const y = this.totalPriceY();
		this.drawCurrencyValue(total, this._currencyUnit, 0, y, width);
	};

	
	
	Scene_Shop.prototype.maxBuy = function() {
		const num = $gameParty.numItems(this._item);
		const max = $gameParty.maxItems(this._item) - num;
		const price = this.buyingPrice(1);
		let number = 1;
		let temptotal = 0;
		while (this.money() > temptotal && max > number-2) {
			temptotal += ((price / LEshopPriceUp()) * (LEshopPriceUp() + $gameSwitches.value(526)*(number-1)));
			number += 1;
		}
		if (price > 0) {
			return Math.min(max, number-2);
		} else {
			return max;
		}
	};
	
	

})(CAE.BuySellVar);