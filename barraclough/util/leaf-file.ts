import { App, WorkspaceLeaf, Notice, TFile } from "obsidian";

export const openFileInNewTab = async (app: App, file: TFile) => {
  const leaf = app.workspace.getLeaf("tab");
  await leaf.openFile(file);
	
  leaf.containerEl.focus();
	const titleEl = leaf.containerEl.querySelector("div.inline-title");
	if (!(titleEl instanceof HTMLElement)) {
		console.error("SF | Failed to get title element");
		throw new Error("Failed to get title element");
	}
	titleEl.focus();
	window.getSelection()?.selectAllChildren(titleEl);
	return leaf;
};