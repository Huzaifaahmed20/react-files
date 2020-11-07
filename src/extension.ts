import * as _ from "lodash";
import { commands, ExtensionContext } from "vscode";
import { newComponent } from "./commands";


export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('react-files.genFuncComp', (uri) => newComponent(uri, 'functional')),
		commands.registerCommand('react-files.genClassComp', (uri) => newComponent(uri, 'class'))
	);
}

export function deactivate() { }
