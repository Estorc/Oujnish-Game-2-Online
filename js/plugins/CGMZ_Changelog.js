/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/changelog/
 * @target MZ
 * @plugindesc Creates a changelog option on the title screen
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.2.0
 * ----------------------------------------------------------------------------
 * Description: This plugin adds a "changelog" scene where you can provide info
 * for the player to read about any changes you have made since the last update
 * to your game. This can be easily added to the menu or title with CGMZ
 * command window plugins, or you can use plugin command to call the scene.
 * ----------------------------------------------------------------------------
 * Documentation:
 * Bullet points are optional. If you do not want to display a bullet point
 * before each change, leave the option blank.
 *
 * Bullet points can be numbered. If you want changes to be numbered, set the
 * bullet option to "num". Otherwise, the text entered for the bullet option
 * will be displayed before each change in the changelog. For example, "- "
 * will display a - with a space after it before each change.
 *
 * You can use CGMZ Title Command Window to easily add the changelog scene to
 * your game title screen. To do so, use the JavaScript command below:
 * this._commandWindow.close();
 * SceneManager.push(CGMZ_Scene_Changelog);
 *
 * You can use CGMZ Menu Command Window to easily add the changelog scene to
 * your game menu. To do so, use the JavaScript command below:
 * SceneManager.push(CGMZ_Scene_Changelog);
 *
 * Update History:
 * Version 1.0.0 - Initial Release
 *
 * Version 1.1.0:
 * - Added plugin command to call the changelog scene from anywhere
 * - Added ability to add an image above each entry
 * - Increased how far the window can scroll for really long changelogs
 *
 * Version 1.2.0:
 * - Added ability to change alignment of date / log entries
 * - Added ability to use character codes in text
 * - Removed wrap text option - text now always wraps
 * - Removed command from title screen, use CGMZ Title Command Window
 *   or similar plugin to add changelog option to the title screen.
 *
 * @command Call Scene
 * @desc Calls the Changelog Scene
 *
 * @param Changes
 * @type struct<Change>[]
 * @default []
 * @desc Set up different change log entries here
 *
 * @param Window Options
 *
 * @param Date Alignment
 * @parent Window Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the date text.
 * @default center
 *
 * @param Log Alignment
 * @parent Window Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the log entry text.
 * @default left
 *
 * @param Scroll Speed
 * @parent Window Options
 * @type number
 * @min 0
 * @desc speed at which the changelog window display scrolls (if needed)
 * @default 1
 *
 * @param Scroll Wait
 * @parent Window Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Window Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Window Options
 * @type boolean
 * @desc Determine if the window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Bullet
 * @parent Window Options
 * @desc Character to use as a bullet point before each entry. Set to "num" to number the changes and leave blank to not use a bullet point.
 * @default 
 *
 * @param Order
 * @parent Window Options
 * @type boolean
 * @on Descending
 * @off Ascending
 * @desc If descending, shows the changelog entries from last to first. If ascending, shows entries from first to last.
 * @default true
 *
 * @param Changelog Text
 * @parent Window Options
 * @desc Text to display at the top of the changelog window and in title command window.
 * @default Changelog
*/
/*~struct~Change:
 * @param Entry Date
 * @default 
 * @desc The date the changes were made.
 *
 * @param Entry Image
 * @type file
 * @dir img/pictures
 * @default 
 * @desc The image to represent the change
 *
 * @param Entries
 * @type text[]
 * @default []
 * @desc The changes made, such as additions, tuning, bug fixes, etc.
 */
var Imported = Imported || {};
Imported.CGMZ_Changelog = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Changelog"] = "1.2.0";
CGMZ.Changelog = CGMZ.Changelog || {};
CGMZ.Changelog.parameters = PluginManager.parameters('CGMZ_Changelog');
CGMZ.Changelog.Changes = JSON.parse(CGMZ.Changelog.parameters["Changes"]);
CGMZ.Changelog.Bullet = CGMZ.Changelog.parameters["Bullet"];
CGMZ.Changelog.Order = (CGMZ.Changelog.parameters["Order"] === "true");
CGMZ.Changelog.ScrollSpeed = Number(CGMZ.Changelog.parameters["Scroll Speed"]);
CGMZ.Changelog.ScrollWait = Number(CGMZ.Changelog.parameters["Scroll Wait"]);
CGMZ.Changelog.ScrollDeceleration = parseFloat(CGMZ.Changelog.parameters["Scroll Deceleration"]);
CGMZ.Changelog.AutoScroll = (CGMZ.Changelog.parameters["Auto Scroll"] === "true");
CGMZ.Changelog.WindowTitle = CGMZ.Changelog.parameters["Changelog Text"];
CGMZ.Changelog.LogAlignment = CGMZ.Changelog.parameters["Log Alignment"];
CGMZ.Changelog.DateAlignment = CGMZ.Changelog.parameters["Date Alignment"];
//=============================================================================
// CGMZ_ChangelogEntry
//-----------------------------------------------------------------------------
// Store and manage changelog data
//=============================================================================
function CGMZ_ChangelogEntry() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Entry
//-----------------------------------------------------------------------------
CGMZ_ChangelogEntry.prototype.initialize = function(entry) {
	this._date = entry["Entry Date"];
	this._image = entry["Entry Image"];
	this._imageHeight = 0;
	this._changes = [];
	const entries = JSON.parse(entry["Entries"]);
	for(let i = 0; i < entries.length; i++) {
		this._changes.push(entries[i]);
	}
	this.calcImageHeight();
};
//-----------------------------------------------------------------------------
// Date of the changelog entry
//-----------------------------------------------------------------------------
CGMZ_ChangelogEntry.prototype.getDate = function() {
	return this._date;
};
//-----------------------------------------------------------------------------
// Image of the changelog entry
//-----------------------------------------------------------------------------
CGMZ_ChangelogEntry.prototype.getImage = function() {
	return this._image;
};
//-----------------------------------------------------------------------------
// Image of the changelog entry
//-----------------------------------------------------------------------------
CGMZ_ChangelogEntry.prototype.getImageHeight = function() {
	return this._imageHeight;
};
//-----------------------------------------------------------------------------
// Loads a bitmap of the image, creates a listener for when bitmap is loaded
//-----------------------------------------------------------------------------
CGMZ_ChangelogEntry.prototype.calcImageHeight = function() {
	if(this._image) {
		this._bitmap = ImageManager.loadPicture(this._image);
		this._bitmap.addLoadListener(this.getBitmapHeight.bind(this));
	}
};
//-----------------------------------------------------------------------------
// Get the height of the 
//-----------------------------------------------------------------------------
CGMZ_ChangelogEntry.prototype.getBitmapHeight = function() {
	this._imageHeight = this._bitmap.height;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Manage Changelog Data. Use temp class since this info doesn't need to be
// saved.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize changelog data
//-----------------------------------------------------------------------------
const alias_CGMZ_Changelog_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Changelog_createPluginData.call(this);
	this.initializeChangelogData();
};
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Changelog_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Changelog_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Changelog", "Call Scene", this.pluginCommandChangelogCallScene);
};
//-----------------------------------------------------------------------------
// Call the Changelog Scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandChangelogCallScene = function() {
	SceneManager.push(CGMZ_Scene_Changelog);
};
//-----------------------------------------------------------------------------
// Initialize changelog data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeChangelogData = function() {
	this._changelogEntries = [];
	if(!CGMZ.Changelog.Order) {
		for(let i = 0; i < CGMZ.Changelog.Changes.length; i++) {
			const entry = new CGMZ_ChangelogEntry(JSON.parse(CGMZ.Changelog.Changes[i]));
			this._changelogEntries.push(entry);
		}
	}
	else {
		for(let i = CGMZ.Changelog.Changes.length - 1; i >=0; i--) {
			const entry = new CGMZ_ChangelogEntry(JSON.parse(CGMZ.Changelog.Changes[i]));
			this._changelogEntries.push(entry);
		}
	}
};
//-----------------------------------------------------------------------------
// Get changelogs
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getChangelogs = function() {
	return this._changelogEntries;
};
//=============================================================================
// CGMZ_Scene_Changelog
//-----------------------------------------------------------------------------
// Handles the changelog scene
//=============================================================================
function CGMZ_Scene_Changelog() {
    this.initialize(...arguments);
}
CGMZ_Scene_Changelog.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Changelog.prototype.constructor = CGMZ_Scene_Changelog;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Changelog.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create changelog window
//-----------------------------------------------------------------------------
CGMZ_Scene_Changelog.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createChangelogWindow();
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_Changelog.prototype.createChangelogWindow = function() {
	const rect = this.changelogWindowRect();
    this._changelogWindow = new CGMZ_Window_ChangelogDisplay(rect);
	this._changelogWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._changelogWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the changelog window
//-----------------------------------------------------------------------------
CGMZ_Scene_Changelog.prototype.changelogWindowRect = function() {
	const x = Graphics.boxWidth/8;
	const y = Graphics.boxHeight - Graphics.boxHeight*9/10;
	const height = Graphics.boxHeight - Graphics.boxHeight/5;
	const width = Graphics.boxWidth - Graphics.boxWidth/4;
	return new Rectangle(x, y, width, height);
};
//=============================================================================
// CGMZ_Window_ChangelogDisplay
//-----------------------------------------------------------------------------
// Window displaying changelog information
//=============================================================================
function CGMZ_Window_ChangelogDisplay() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ChangelogDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_ChangelogDisplay.prototype.constructor = CGMZ_Window_ChangelogDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ChangelogDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 30; // maximum of 30 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Changelog.ScrollWait,
													 CGMZ.Changelog.ScrollSpeed, CGMZ.Changelog.AutoScroll,
													 CGMZ.Changelog.ScrollDeceleration);
	this.activate();
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ChangelogDisplay.prototype.refresh = function() {
	this.setupWindowForNewEntry();
	this.drawTitle();
	this._neededHeight = this.drawChanges(this.lineHeight());
};
//-----------------------------------------------------------------------------
// Draw Title of window
//-----------------------------------------------------------------------------
CGMZ_Window_ChangelogDisplay.prototype.drawTitle = function() {
	this.contents.fontBold = true;
	this.CGMZ_drawText(CGMZ.Changelog.WindowTitle, 0, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draw changes. Returns the y-value past the last change drawn
//-----------------------------------------------------------------------------
CGMZ_Window_ChangelogDisplay.prototype.drawChanges = function(y) {
	const num = (CGMZ.Changelog.Bullet === "num");
	const changelogs = $cgmzTemp.getChangelogs();
	if(!changelogs || changelogs.length === 0) { // Error loading changelog data
		$cgmzTemp.reportError("Error loading changelog data", "CGMZ Changelog", "Check changelog entry configuration");
		return y;
	}
	for(let i = 0; i < changelogs.length; i++) {
		this.drawChangeImage(changelogs[i].getImage(), y);
		y += changelogs[i].getImageHeight();
		this.contents.fontBold = true;
		this.CGMZ_drawText(changelogs[i].getDate(), 0, 0, y, this.contents.width, CGMZ.Changelog.DateAlignment);
		this.contents.fontBold = false;
		y += this.lineHeight();
		const changes = changelogs[i]._changes;
		for(let j = 0; j < changes.length; j++) {
			const changeCount = j+1;
			const bulletText = (num) ? changeCount + ". " : CGMZ.Changelog.Bullet;
			y += this.CGMZ_drawText(bulletText + changes[j], 0, 0, y, this.contents.width, CGMZ.Changelog.LogAlignment);
		}
		y += this.lineHeight(); // Add blank line between entries
	}
	y -= this.lineHeight(); // Remove blank line after last entry
	return y;
};
//-----------------------------------------------------------------------------
// Draw change image
//-----------------------------------------------------------------------------
CGMZ_Window_ChangelogDisplay.prototype.drawChangeImage = function(picture, y) {
	if(picture !== "") {
		const sprite = new Sprite();
		this.addInnerChild(sprite);
		sprite.bitmap = ImageManager.loadPicture(picture);
		sprite.x = this.contents.width / 2;
		sprite.y = y;
		sprite.anchor.x = 0.5;
	}
};