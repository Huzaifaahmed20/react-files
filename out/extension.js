"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const _ = require("lodash");
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const mkdirp = require("mkdirp");
function activate(context) {
    console.log('Congratulations, your extension "code-provider" is now active!');
    let disposable = vscode_1.commands.registerCommand('code-provider.genFuncComp', newComponent);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function promptForComponentName() {
    const componentNameOptions = {
        prompt: "Component Name",
        placeHolder: "DefaultButton",
    };
    return vscode_1.window.showInputBox(componentNameOptions);
}
const newComponent = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const componentName = yield promptForComponentName();
    if (_.isNil(componentName) || componentName.trim() === "") {
        vscode_1.window.showErrorMessage("The component name must not be empty");
        return;
    }
    let targetDirectory = uri.fsPath;
    //TODO: check for pascal case name
    // const pascalCaseBlocName = changeCase.pascalCase(componentName.toLowerCase());
    yield generateComponentCode(componentName, targetDirectory);
});
const generateComponentCode = (componentName, targetDirectory) => __awaiter(void 0, void 0, void 0, function* () {
    const componentDirectoryPath = `${targetDirectory}/${componentName}`;
    if (!fs_1.existsSync(componentDirectoryPath)) {
        yield createDirectory(componentDirectoryPath);
    }
    const targetPath = `${componentDirectoryPath}/index.js`;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.writeFile(targetPath, getComponentTemplate(componentName), "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }));
});
function getComponentTemplate(componentName) {
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
function createDirectory(targetDirectory) {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory);
        resolve();
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map