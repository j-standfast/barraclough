import { App, Notice } from "obsidian";
import { addEmptyProperties } from "../util/properties";
import { sortProperties } from "../util/properties";

export async function addEmptyPropertiesToActiveFile(app: App) {
	const file = app.workspace.getActiveFile();
	if (!file) {
		console.error("Barraclough | addEmptyPropertiesToActiveFile | No active file");
		new Notice("No active file");
		return;
	}
    addEmptyProperties(app, file);
    sortProperties(app, file);
}