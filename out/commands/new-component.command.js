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
exports.newComponent = void 0;
const _ = require("lodash");
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const mkdirp = require("mkdirp");
const templates_1 = require("../templates");
exports.newComponent = (uri, type) => __awaiter(void 0, void 0, void 0, function* () {
    const componentName = yield promptForComponentName();
    if (_.isNil(componentName) || componentName.trim() === "") {
        vscode_1.window.showErrorMessage("The component name must not be empty");
        return;
    }
    let targetDirectory = uri.fsPath;
    yield generateComponentCode(componentName, targetDirectory, type);
});
function promptForComponentName() {
    const componentNameOptions = {
        prompt: "Component Name",
        placeHolder: "DefaultButton",
    };
    return vscode_1.window.showInputBox(componentNameOptions);
}
const generateComponentCode = (componentName, targetDirectory, type) => __awaiter(void 0, void 0, void 0, function* () {
    const componentDirectoryPath = `${targetDirectory}/${componentName}`;
    if (!fs_1.existsSync(componentDirectoryPath)) {
        yield createDirectory(componentDirectoryPath);
    }
    else {
        vscode_1.window.showErrorMessage('Component already exist');
    }
    const targetPath = `${componentDirectoryPath}/index.js`;
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.writeFile(targetPath, type === 'class' ? templates_1.getClassComponentTemplate(componentName) : templates_1.getComponentTemplate(componentName), "utf8", (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }));
});
function createDirectory(targetDirectory) {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory);
        resolve();
    });
}
//# sourceMappingURL=new-component.command.js.map