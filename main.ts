import {
	createNoteWithAllEmptyProperties,
	createNoteWithBaseEmptyProperties,
	createNoteWithExtendedEmptyProperties,
	createNoteWithEmptyPropertiesOld,
	addEmptyPropertiesToActiveFileOld,
	addBaseEmptyPropertiesToActiveFile,
	addAllEmptyPropertiesToActiveFile,
	addExtendedEmptyPropertiesToActiveFile,
} from "barraclough/command/createNoteWithEmptyProperties";
// import { getChangelogOverPeriod } from "barraclough/command/getChangelogOverPeriod";
import { removeEmptyPropertiesFromActiveFile } from "barraclough/command/removeEmptyPropertiesFromActiveFile";
import { Notice, Plugin } from "obsidian";

// Remember to rename these classes and interfaces!

export default class BarracloughPlugin extends Plugin {
	async onload() {
		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon(
			"dice",
			"Barraclough",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				new Notice("Barraclough!");
			}
		);
		// Perform additional things with the ribbon
		ribbonIconEl.addClass("my-plugin-ribbon-class");

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");
2
		// new - create
		this.addCommand({
			id: "create-note-with-empty-properties:all",
			name: "Create note with all empty properties",
			callback: () => createNoteWithAllEmptyProperties(this.app),
		});
		this.addCommand({
			id: "create-note-with-empty-properties:base",
			name: "Create note with basic empty properties",
			callback: () => createNoteWithBaseEmptyProperties(this.app),
		});
		this.addCommand({
			id: "create-note-with-empty-properties:extended",
			name: "Create note with extended empty properties",
			callback: () => createNoteWithExtendedEmptyProperties(this.app),
		});

		// new - add
		this.addCommand({
			id: "add-empty-properties-to-active-file:base",
			name: "Add base empty properties to active file",
			callback: () => addBaseEmptyPropertiesToActiveFile(this.app),
		});
		this.addCommand({
			id: "add-empty-properties-to-active-file:extended",
			name: "Add extended empty properties to active file",
			callback: () => addExtendedEmptyPropertiesToActiveFile(this.app),
		});
    this.addCommand({
			id: "add-empty-properties-to-active-file:all",
			name: "Add all empty properties to active file",
			callback: () => addAllEmptyPropertiesToActiveFile(this.app),
		});


		// remove
		this.addCommand({
			id: "remove-empty-properties-from-active-file:all",
			name: "Remove empty properties from active file (all)",
			callback: () => removeEmptyPropertiesFromActiveFile(this.app),
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, "click", (evt: MouseEvent) => {
		// 	console.log("click", evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(
		// 	window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		// );
	}

	onunload() {
		console.log("BarracloughPlugin onunload");
	}
}
