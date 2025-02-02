import { App, Notice } from "obsidian";
import { removeEmptyProperties } from "../util/properties";
import { sortProperties } from "../util/properties";

export async function removeEmptyPropertiesFromActiveFile(app: App) {
	const file = app.workspace.getActiveFile();
	if (!file) {
		console.error("Barraclough | removeEmptyPropertiesFromActiveFile | No active file");
		new Notice("No active file");
		return;
	}
    removeEmptyProperties(app, file);
    sortProperties(app, file);
}