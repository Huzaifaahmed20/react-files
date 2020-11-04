import * as _ from "lodash";
import * as changeCase from "change-case";
import { InputBoxOptions, OpenDialogOptions, Uri, window, commands, ExtensionContext } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import * as mkdirp from "mkdirp";
import { Options } from "change-case";


export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "code-provider" is now active!');

	let disposable = commands.registerCommand('code-provider.genFuncComp', newComponent);

	context.subscriptions.push(disposable);
}

function promptForComponentName(): Thenable<string | undefined> {
	const componentNameOptions: InputBoxOptions = {
		prompt: "Component Name",
		placeHolder: "DefaultButton",

	};
	return window.showInputBox(componentNameOptions);
}

const newComponent = async (uri: Uri) => {
	const componentName = await promptForComponentName();
	if (_.isNil(componentName) || componentName.trim() === "") {
		window.showErrorMessage("The component name must not be empty");
		return;
	}

	let targetDirectory = uri.fsPath;
	//TODO: check for pascal case name
	// const pascalCaseBlocName = changeCase.pascalCase(componentName.toLowerCase());
	await generateComponentCode(componentName, targetDirectory);


};

const generateComponentCode = async (componentName: string, targetDirectory: string) => {
	const componentDirectoryPath = `${targetDirectory}/${componentName}`;

	if (!existsSync(componentDirectoryPath)) {
		await createDirectory(componentDirectoryPath);
	}
	const targetPath = `${componentDirectoryPath}/index.js`;


	return new Promise(async (resolve, reject) => {
		writeFile(
			targetPath,
			getDefaultBlocEventTemplate(componentName),
			"utf8",
			(error) => {
				if (error) {
					reject(error);
					return;
				}
				resolve();
			}
		);
	});
};

function getDefaultBlocEventTemplate(blocName: string): string {

	// 	return `part of '${snakeCaseBlocName}_bloc.dart';

	// @immutable
	// abstract class Event {}
	// `;
	return '';
}

function createDirectory(targetDirectory: string): Promise<void> {
	return new Promise((resolve, reject) => {
		mkdirp(targetDirectory);
	});
}


export function deactivate() { }
