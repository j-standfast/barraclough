// import  from "obsidian";
import { App, Command } from 'obsidian';

export function allCommands(app: App): Command[] {
	const commands: Command[] = Object.values(app.commands.commands);
	commands.sort((a: Command, b: Command): number =>
		a.name.localeCompare(b.name)
	);
	return commands;
}