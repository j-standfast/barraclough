export const aliasSchema = {
	type: "string",
	default: null,
	description: "note alias",
};
export const aliasListSchema = {
	type: "list",
	default: null,
	item: aliasSchema,
};
export const chapterSchema = {
	type: "string",
	default: null,
	description: "Chapter",
}; // TODO: add format
export const chapterListSchema = {
	type: "list",
	default: null,
	item: chapterSchema,
};
export const cssClassSchema = {
	type: "string",
	default: null,
	description: "CSS class",
}; // TODO: add format?
export const cssClassListSchema = {
	type: "list",
	default: null,
	item: cssClassSchema,
};
export const dateTimeStringSchema = {
	type: "string",
	default: null,
	description: "Date and time in TODO format",
}; // TODO: add format
export const relatedNoteSchema = { type: "string", default: null }; // TODO: add format
export const relatedNoteListSchema = {
	type: "list",
	default: null,
	item: relatedNoteSchema,
};
export const tagSchema = { type: "string", default: null, description: "Tag" }; // TODO: add format
export const tagListSchema = { type: "list", default: null, item: tagSchema };
export const urlSchema = { type: "string", default: null, description: "URL" }; // TODO: add format
export const urlListSchema = { type: "list", default: null, item: urlSchema };
export const weekdaySchema = {
	type: "string",
	default: null,
	description: "Weekday",
}; // TODO: add format

export const baseProperties = {
	aliases: {
		...aliasListSchema,
		description: "List of aliases",
	},
	created: dateTimeStringSchema,
	cssclasses: {
		...cssClassListSchema,
		description: "List of CSS classes applied to the note",
	},
	description: { type: "string", description: "Description" },
	tags: {
		type: "list",
		default: [],
		description: "List of tags",
		item: tagSchema,
	},
	srcURLs: {
		...urlListSchema,
		description: "List of primary (generic) URLs referenced by the note",
	},
	relsTopic: {
		...relatedNoteListSchema,
		description: "List of topic notes (akin to parent, but looser)",
	},
};

export const baseExternalLinkProperties = {
  srcURLsSeeAlso: {
    ...urlListSchema,
    description: "List of secondary (generic) URLs referenced by the note",
  },
  srcChapters: {
		...chapterListSchema,
		description: "List of [source, associated chapter(s)] pairs",
	},
	srcURLsSpotify: {
		...urlListSchema,
		description: "List of Spotify URLs referenced by the note",
	},
	srcURLsWiki: {
		...urlListSchema,
		description: "List of Wikipedia URLs referenced by the note",
	},
};

export const baseInternalLinkProperties = {
  relsSeeAlso: {
    ...relatedNoteListSchema,
    description: "List of (loosely) related notes",
  },
  relsChild: {
		...relatedNoteListSchema,
		description: "List of child notes",
	},
	relsParent: {
		...relatedNoteListSchema,
		description: "List of parent notes",
	},
	relsSibling: {
		...relatedNoteListSchema,
		description: "List of sibling notes",
	},
	relsProject: {
		...relatedNoteListSchema,
		description: "List of related project notes",
	},
};

export const codeExtraProperties = {
	codeURLsDocs: {
		type: "list",
		default: [],
		description: "List of URLs to documentation for the code",
		item: urlSchema,
	},
	codeURLsSource: {
		type: "list",
		default: [],
		description: "List of URLs to source code for the code",
		item: urlSchema,
	},
	version: { type: "number", description: "Version of the code" },
};

export const packageExtraProperties = {
	packageRelInstall: {
		...relatedNoteSchema,
		description:
			"Related note to the installation instructions for the package",
	},
	packageURLsHome: {
		...urlListSchema,
		description: "List of URLs to the home page(s) of the package",
	},
	packageURLsNPM: {
		...urlListSchema,
		description: "List of URLs to the NPM page(s) of the package",
	},
	packageURLsRepo: {
		...urlListSchema,
		description: "List of URLs to the GitHub page(s) of the package repo",
	},
};

export const packageVersionExtraProperties = {
  versionPullRequestURL: { ...urlSchema, description: "URL to the pull request for the version" },
  versionPullRequestDate: { ...dateTimeStringSchema, description: "Date of the pull request for the version" },
}

export const problemExtraProperties = {
	probURLsProblem: {
		...urlListSchema,
		description: "List of URLs to the problem(s)/challenge(s)",
	},
	probURLsSolutions: {
		...urlListSchema,
		description:
			"List of URLs to the solution(s) to the problem(s)/challenge(s)",
	},
	probURLsReadme: {
		...urlListSchema,
		description:
			"List of URLs to the README(s) of the problem(s)/challenge(s)",
	},
	probName: {
		type: "string",
		description: "Name of the problem(s)/challenge(s)",
	},
	probId: {
		type: "string",
		description: "ID of the problem(s)/challenge(s)",
	},
};

export const periodExtraProperties = {
	periodRelNext: { ...relatedNoteSchema, description: "Next period" },
	periodRelPrev: { ...relatedNoteSchema, description: "Previous period" },
	periodRelsTask: {
		...relatedNoteListSchema,
		description: "Tasks notes for the period",
	},
	periodStartWeekday: {
		...weekdaySchema,
		description: "Start weekday of the period",
	},
};

export const allProperties = {
  ...baseProperties,
	...baseExternalLinkProperties,
	...baseInternalLinkProperties,
	...codeExtraProperties,
	...packageExtraProperties,
  ...packageVersionExtraProperties,
	...problemExtraProperties,
  ...periodExtraProperties,
};




// export const baseProperties = {
// 	...baseCoreProperties,
// 	...baseExternalLinkProperties,
// 	...baseInternalLinkProperties,
// };

// export const codeProperties = {
// 	...baseProperties,
// 	...codeExtraProperties,
// };


// export const packageProperties = {
// 	...codeProperties,
// 	...packageExtraProperties,
// };


// export const packageVersionProperties = {
//   ...packageProperties,
//   ...packageVersionExtraProperties,
// }


// export const problemProperties = {
// 	...baseProperties,
// 	...problemExtraProperties,
// };

// export const periodProperties = {
// 	...baseProperties,
// 	...periodExtraProperties,
// };