import { addEmptyPropertiesToActiveFile } from "barraclough/command/addEmptyPropertiesToActiveFile";
import { createNoteWithEmptyProperties } from "barraclough/command/createNoteWithEmptyProperties";
// import { getChangelogOverPeriod } from "barraclough/command/getChangelogOverPeriod";
import { removeEmptyPropertiesFromActiveFile } from "barraclough/command/removeEmptyPropertiesFromActiveFile";
import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	Vault,
} from "obsidian";

// Remember to rename these classes and interfaces!

interface BarracloughPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: BarracloughPluginSettings = {
	mySetting: "default",
};

export default class BarracloughPlugin extends Plugin {
	settings: BarracloughPluginSettings;

	async onload() {
		await this.loadSettings();

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

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "barraclough-create-note-with-empty-properties",
			name: "Create note with empty properties",
			callback: () => createNoteWithEmptyProperties(this.app),
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "barraclough-add-empty-properties-to-active-file",
			name: "Add empty properties to active file",
			callback: () => addEmptyPropertiesToActiveFile(this.app),
		});
		// this.addCommand({
		// 	id: "barraclough-get-changelog-from-selection",
		// 	name: "Get changelog over period from current selection",
		// 	callback: () => getChangelogOverPeriod(this.app),
		// });
		this.addCommand({
			id: "barraclough-remove-empty-properties-from-active-file",
			name: "Remove empty properties from active file",
			callback: () => removeEmptyPropertiesFromActiveFile(this.app),
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: "barraclough-open-sample-modal-complex",
			name: "Open sample modal (complex)",
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

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

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: BarracloughPlugin;

	constructor(app: App, plugin: BarracloughPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
