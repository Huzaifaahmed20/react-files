import * as _ from "lodash";
import { commands, ExtensionContext } from "vscode";
import { newComponent } from "./commands";


export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('react-files.genFuncComp', (uri) => newComponent(uri, 'functional', false)),
		commands.registerCommand('react-files.genClassComp', (uri) => newComponent(uri, 'class', false)),
		commands.registerCommand('react-files.genFuncCompCSS', (uri) => newComponent(uri, 'functional', true)),
		commands.registerCommand('react-files.genClassCompCSS', (uri) => newComponent(uri, 'class', true))
	);
}

export function deactivate() { }
