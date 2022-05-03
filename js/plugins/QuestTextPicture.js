//=============================================================================
// RPG Maker MZ - Text Picture
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays text as a picture.
 * @author Yoji Ojima
 *
 * @help TextPicture.js
 *
 * This plugin provides a command to show text as a picture.
 *
 * Use it in the following procedure.
 *   1. Call the plugin command "Set Text Picture".
 *   2. Execute "Show Picture" without specifying an image.
 *
 * @command set
 * @text Set Text Picture
 * @desc Sets text to display as a picture.
 *       After this, execute "Show Picture" without specifying an image.
 *
 * @arg text
 * @type multiline_string
 * @text Text
 * @desc Text to display as a picture.
 *       Control characters are allowed.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command save
 * @text Save Finish Quest
 * @desc Save the ID of the finished quest in a array.
 *
 * @arg id
 * @type string
 * @text ID
 * @desc ID to Save.
 */

/*:ja
 * @target MZ
 * @plugindesc テキストをピクチャとして表示します。
 * @author Yoji Ojima
 *
 * @help TextPicture.js
 *
 * このプラグインは、テキストをピクチャとして表示するコマンドを提供します。
 *
 * 次の手順で使用してください。
 *   1. プラグインコマンド「テキストピクチャの設定」を呼び出します。
 *   2. 画像を指定せずに「ピクチャの表示」を実行します。
 *
 * @command set
 * @text テキストピクチャの設定
 * @desc ピクチャとして表示するテキストを設定します。
 *       この後、画像を指定せずに「ピクチャの表示」を実行してください。
 *
 * @arg text
 * @type multiline_string
 * @text テキスト
 * @desc ピクチャとして表示するテキストです。
 *       制御文字が使用可能です。
 */

(() => {
    const pluginName = "QuestTextPicture";
    let textPictureText = "";
	var questvaluechanged = [];

    PluginManager.registerCommand(pluginName, "set", args => {
	
	textedit = String(Window_Base.prototype.convertEscapeCharacters(String(Window_Base.prototype.convertEscapeCharacters(String(args.text)))));
	
	if (textedit.includes("Quest 3")) {
		textedit = textedit.split("\n");
		textedit.splice(2,1);
		textedit = textedit.join("\n");
	}
	if (textedit.includes("Quest 2")) {
		textedit = textedit.split("\n");
		textedit.splice(1,1);
		textedit = textedit.join("\n");
	}
	if (textedit.includes("Quest 1")) {
		textedit = textedit.split("\n");
		textedit.splice(0,1);
		textedit = textedit.join("\n");
	}
	
	textPictureText = textedit;
    });
	
	

    PluginManager.registerCommand(pluginName, "save", args => {
	
	IDToSave = ('000' + String(args.id)).substr(-3);

	textsavefile = $gameActors.actor(54).name().split("|");
	textsavefile.push(IDToSave);
	$gameActors.actor(54).setName(String(textsavefile.join("|")))

    });
	
	$getQuestValue = function(questid) {
		
		switch (eval(questid)) {
			
			case $gameVariables.value(22):
			
			return $gameVariables.value(25);
			break;
			
			case $gameVariables.value(23):
			
			return $gameVariables.value(26);
			break;
			
			case $gameVariables.value(24):

			return $gameVariables.value(27);
			break;
			
		};
		
	}
	
	
	$getQuestActive = function(questid) {
		
		switch (eval(questid)) {
			
			case $gameVariables.value(22):
			
			return true;
			break;
			
			case $gameVariables.value(23):
			
			return true;
			break;
			
			case $gameVariables.value(24):

			return true;
			break;
			
			default:
			
			return false;
			break;
			
		};
		
	}
	

    const _Game_Picture_show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function() {
        _Game_Picture_show.apply(this, arguments);
        if (this._name === "quest" && textPictureText) {
            this.mzkpquest_text = textPictureText;
            this.mzkp_textChanged = true;
            textPictureText = "";
        }
    };

    const _Sprite_Picture_destroy = Sprite_Picture.prototype.destroy;
    Sprite_Picture.prototype.destroy = function() {
        destroyQuestPictureBitmap(this.bitmap);
        _Sprite_Picture_destroy.apply(this, arguments);
    };

    const _Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        _Sprite_Picture_updateBitmap.apply(this, arguments);
        if (this.visible && this._pictureName === "quest") {
            const picture = this.picture();
            const text = picture ? picture.mzkpquest_text || "" : "";
            const textChanged = picture && picture.mzkp_textChanged;
            if (this.mzkpquest_text !== text || textChanged) {
                this.mzkpquest_text = text;
                destroyQuestPictureBitmap(this.bitmap);
                this.bitmap = createQuestPictureBitmap(text);
                picture.mzkp_textChanged = false;
            }
        } else {
            this.mzkpquest_text = "";
        }
    };

    function createQuestPictureBitmap(text) {
        const tempWindow = new Window_Base(new Rectangle());
        const size = tempWindow.textSizeEx(text);
		const ctext = text.replace(/(\r\n|\n|\r)/gm, " \\\\n ");
		const stext = ctext.split(" ");
        tempWindow.padding = 0;
        tempWindow.move(0, 0, 400, 400);
        tempWindow.createContents();
		tempWindow.drawTextEx("\x1b"+"c[14]                  Quêtes        \x1b"+"c[24]\n___________________________\n\x1b"+"c[0]", 0, 0, 0);
		let x = 0;
		let y = 80;
		for(let i = 0; i < stext.length; i++) {
			if(stext[i] === "") continue;
			if(stext[i] === '\\\\n') {
				y += tempWindow.lineHeight();
				x = 0;
				continue;
			}
			let twtext = "";
			switch(stext[i]) {
				
				case "<quest1>":
				var tempWidth = tempWindow.textWidth($gameVariables.value(25) + "/" + $gameVariables.value(28) + " ");
				twtext = "\x1b"+"c[14]" + $gameVariables.value(25) + "/" + $gameVariables.value(28) + "\x1b"+"c[0]"
				break;
				
				
				case "<quest2>":
				var tempWidth = tempWindow.textWidth($gameVariables.value(26) + "/" + $gameVariables.value(29) + " ");
				twtext = "\x1b"+"c[14]" + $gameVariables.value(26) + "/" + $gameVariables.value(29) + "\x1b"+"c[0]"
				break;
				
				
				case "<quest3>":
				var tempWidth = tempWindow.textWidth($gameVariables.value(27) + "/" + $gameVariables.value(30) + " ");
				twtext = "\x1b"+"c[14]" + $gameVariables.value(27) + "/" + $gameVariables.value(30) + "\x1b"+"c[0]"
				break;
				
				
				
				default:
				var tempWidth = tempWindow.textWidth(stext[i] + " ");
				twtext = stext[i];
			}
			
			if(tempWidth + x > 400) {
				if(tempWidth <= 400) {
					y += tempWindow.lineHeight();
					x = 0;
				}
			}
			tempWindow.drawTextEx(twtext + " ", x, y, 400-x, 'left');
			x += tempWidth;
		}
        const bitmap = tempWindow.contents;
        tempWindow.contents = null;
        tempWindow.destroy();
        bitmap.mzkp_isQuestPicture = true;
        return bitmap;
    }

    function destroyQuestPictureBitmap(bitmap) {
        if (bitmap && bitmap.mzkp_isQuestPicture) {
            bitmap.destroy();
        }
    }
})();
