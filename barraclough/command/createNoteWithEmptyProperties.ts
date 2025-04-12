import { App, FrontMatterCache, normalizePath, Notice, TFile } from "obsidian";
import { getDisplayDate } from "../util/time";
import { openFileInNewTab } from "../util/leaf-file";
import { addEmptyProperties, sortProperties } from "../util/properties";
import {
	baseInternalLinkProperties,
	allProperties,
	baseProperties,
	baseExternalLinkProperties,
} from "barraclough/propertySchemas/schemas";

async function createNoteFile(app: App): Promise<TFile> {
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
		console.log("BC / createNote:", {
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
	return file;
}

async function addCreatedToFrontmatter(app: App, file: TFile) {
	const displayDate = getDisplayDate(new Date());
	await app.fileManager.processFrontMatter(file, (fm: FrontMatterCache) => {
		fm.created = displayDate;
	});
}

async function addEmptyPropertiesToActiveFile(
	app: App,
	properties: Record<string, any>
) {
	const file = app.workspace.getActiveFile();
	if (!file) {
		console.error(
			"Barraclough | addEmptyPropertiesToActiveFile | No active file"
		);
		new Notice("No active file");
		return;
	}
	addEmptyProperties(app, file, properties);
	sortProperties(app, file);
}

// addEmptyProperties(app, file);
// sortProperties(app, file);
async function createNoteWithEmptyProperties(
	app: App,
	properties: Record<string, any>
) {
	const file = await createNoteFile(app);
	await addCreatedToFrontmatter(app, file);
	addEmptyProperties(app, file, properties);
	sortProperties(app, file);
	const leaf = await openFileInNewTab(app, file);
	return { file, leaf };
}

// create with empty properties
export function createNoteWithBaseEmptyProperties(app: App) {
	return createNoteWithEmptyProperties(app, baseProperties);
}

export function createNoteWithExtendedEmptyProperties(app: App) {
	return createNoteWithEmptyProperties(app, {
		...baseProperties,
		...baseExternalLinkProperties,
		...baseInternalLinkProperties,
	});
}

export function createNoteWithAllEmptyProperties(app: App) {
	return createNoteWithEmptyProperties(app, allProperties);
}

// add empty properties to active file
export function addBaseEmptyPropertiesToActiveFile(app: App) {
	return addEmptyPropertiesToActiveFile(app, baseProperties);
}

export function addExtendedEmptyPropertiesToActiveFile(app: App) {
	return addEmptyPropertiesToActiveFile(app, {
		...baseProperties,
		...baseExternalLinkProperties,
		...baseInternalLinkProperties,
	});
}

export function addAllEmptyPropertiesToActiveFile(app: App) {
	return addEmptyPropertiesToActiveFile(app, allProperties);
}
