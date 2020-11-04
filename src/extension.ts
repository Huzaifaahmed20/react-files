import * as _ from "lodash";
import { commands, ExtensionContext, languages, window } from "vscode";
import { newComponent } from "./commands";


export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('code-provider.genFuncComp', newComponent));
}

export function deactivate() { }