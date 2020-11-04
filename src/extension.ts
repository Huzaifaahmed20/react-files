import * as _ from "lodash";
import { InputBoxOptions, Uri, window, commands, ExtensionContext } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import * as mkdirp from "mkdirp";


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
			getComponentTemplate(componentName),
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

function getComponentTemplate(componentName: string): string {

	return `import React from 'react';

export const ${componentName} = (props) => {
	return (
		<div>
			<h1>${componentName}</h1>
		</div>
	)
}
`;
}

function createDirectory(targetDirectory: string): Promise<void> {
	return new Promise((resolve, reject) => {
		mkdirp(targetDirectory);
		resolve();
	});
}


export function deactivate() { }
