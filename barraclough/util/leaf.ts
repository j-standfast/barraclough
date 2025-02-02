import { App, WorkspaceLeaf, Notice } from "obsidian";

export const focusTitle = async (leaf: WorkspaceLeaf) => {
	const titleContainerEl = document.querySelector(
		"div.workspace-leaf.mod-active div.inline-title"
	);
	if (!(titleContainerEl instanceof HTMLElement)) {
		console.error("SF | Failed to get title container element");
		return;
	}
	titleContainerEl.focus();
	window.getSelection()?.selectAllChildren(titleContainerEl);
	return;
};


// const focusTitle = async (leaf: WorkspaceLeaf) => {
//   if (!leaf) {
// 		return;
// 	}
// 	let titleContainerEl = leaf.view.containerEl.querySelector("div.inline-title");
// 	console.log(titleContainerEl)
// 	//scroll to top
// 	if (!isHTMLElement(titleContainerEl)) {
// 		return;
// 	}
// 	titleContainerEl.focus();
// 	//Find again and filter
// 	titleContainerEl = Array.from(leaf.view.containerEl.querySelectorAll("div.inline-title"))
// 		.filter(e => !e.hidden).first();
// 	window.getSelection()?.selectAllChildren(titleContainerEl);
// }

// async function focusInlineTitle(leaf: WorkspaceLeaf | undefined, app: App) {
// 	if (!leaf) {
// 		return;
// 	}
// 	const titleContainerEl = leaf.view.containerEl.querySelector("div.inline-title");
//   if (!isHTMLElement(titleContainerEl)) {
//     console.error("SF | Failed to get title container element");
// 		return;
// 	}
//   let innerTitle = titleContainerEl;

// 	const frontmatterTitle = app.plugins.enabledPlugins.has("obsidian-front-matter-title-plugin");
// 	if (titleContainerEl.hasAttribute("ofmt-fake-id") && frontmatterTitle) { //plugin frontmattert title
// 		const innerTitleFMT = leaf.view.containerEl.querySelector("div.inline-title[ofmt-original-id]");
// 		if (innerTitleFMT?.hasAttribute("hidden")) {
// 			titleContainerEl.setAttribute("hidden", "");
//       innerTitleFMT.removeAttribute("hidden");
//       if (!isHTMLElement(innerTitleFMT)) {
//         console.error("SF | Failed to get inner title FMT element");
//         return;
//       }
// 			innerTitle = innerTitleFMT;
// 		}
// 	}
//   if (!isHTMLElement(innerTitle)) {
//     console.error("SF | Failed to get inner title element");
//     return;
//   }
//   await innerTitle.focus();
//   console.log("SF | Focused inline title", innerTitle);
// 	window.getSelection()?.selectAllChildren(innerTitle);
// 	return;
// }