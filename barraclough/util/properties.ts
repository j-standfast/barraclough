import { App, TFile, FrontMatterCache, Notice } from "obsidian";
import { sortByKey } from "./toolbelt";
import { allProperties } from "../propertySchemas/schemas";

export const sortProperties = (app: App, file: TFile) => {
	app.fileManager.processFrontMatter(file, (fm) => {
		// TODO: add type
		const sorted = sortByKey(fm);
		Object.entries(sorted).forEach(([k, v]) => {
			delete fm[k];
			fm[k] = v;
		});
	});
};

export const addEmptyProperties = (app: App, file: TFile) => {
	app.fileManager.processFrontMatter(file, (fm: FrontMatterCache) => {
		for (const [p, s] of Object.entries(allProperties)) {
			if (
				p in fm &&
				fm[p] !== null &&
				(!Array.isArray(fm[p]) || fm[p].length !== 0)
			)
				continue;
			fm[p] = s.type === "list" ? [] : null;
		}
	});
};

export const removeEmptyProperties = (app: App, file: TFile) => {
	app.fileManager.processFrontMatter(file, (fm) => {
		for (const [p, s] of Object.entries(allProperties)) {
			// p=prop, s=schema
			if (!(p in fm)) continue;
			if (
				s.type === "list" &&
				(fm[p] === null || (Array.isArray(fm[p]) && fm[p].length === 0))
			) {
				delete fm[p];
			} else if (!fm[p]) {
				delete fm[p];
			}
		}
	});
};