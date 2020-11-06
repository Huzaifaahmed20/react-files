import * as _ from "lodash";
import { commands, ExtensionContext, languages, window } from "vscode";
import { newComponent } from "./commands";


export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand('react-provider.genFuncComp', (uri) => newComponent(uri, 'functional')),
		commands.registerCommand('react-provider.genClassComp', (uri) => newComponent(uri, 'class'))
	);
}
//huzaifa-ahmed.react-provider

export function deactivate() { }
