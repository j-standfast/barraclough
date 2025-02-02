import { App, FrontMatterCache, normalizePath, Notice, TFile } from "obsidian";
import { getDisplayDate } from "../util/time";
import { openFileInNewTab } from "../util/leaf-file";
import { addEmptyProperties, sortProperties } from "../util/properties";


export async function createNote(app: App, relPath: string) {

}

export async function createNoteWithEmptyProperties(app: App) {
    // path
	const root = app.vault.getRoot();
	if (!root) {
		console.error(
			"BC / createNoteWithEmptyProperties: No root folder found"
		);
		new Notice("No root folder found");
		return;
	}
	const relPath = normalizePath(`${root.path}n/untitled`); // strips leading slash
	const absPath = app.vault.getAvailablePath(relPath, "md");
    console.log("BC |", { absPath, relPath });

	// file
	let file: TFile | null = null;
	try {
		file = await app.vault.create(absPath, "");
	} catch (e) {
		console.log("BC / createNoteWithEmptyProperties:", {
			absPath,
			relPath,
			isValid: this.app.vault.checkPath(absPath),
			isExisting: await this.app.vault.exists(absPath, false),
		});
		console.error(
			"BC / createNoteWithEmptyProperties: error creating file - ",
			e
		);
	}
	if (!file) {
		throw new Error(
			"BC / createNoteWithEmptyProperties: failed to create file"
		);
	}

	// frontmatter  
	const displayDate = getDisplayDate(new Date());
	// console.log("SF |", { file, displayDate });
	app.fileManager.processFrontMatter(file, (fm: FrontMatterCache) => {
		fm.created = displayDate;
	});
    addEmptyProperties(app, file);
    sortProperties(app, file);

	// open & focus
	const leaf = await openFileInNewTab(app, file);
	return { file, leaf };
}
