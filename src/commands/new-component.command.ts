import * as _ from "lodash";
import { InputBoxOptions, Uri, window, commands, ExtensionContext } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import * as mkdirp from "mkdirp";
import { getComponentTemplate } from "../templates";

export const newComponent = async (uri: Uri) => {

    const componentName = await promptForComponentName();
    if (_.isNil(componentName) || componentName.trim() === "") {
        window.showErrorMessage("The component name must not be empty");
        return;
    }

    let targetDirectory = uri.fsPath;
    await generateComponentCode(componentName, targetDirectory);
};

function promptForComponentName(): Thenable<string | undefined> {
    const componentNameOptions: InputBoxOptions = {
        prompt: "Component Name",
        placeHolder: "DefaultButton",

    };
    return window.showInputBox(componentNameOptions);
}

const generateComponentCode = async (componentName: string, targetDirectory: string) => {
    const componentDirectoryPath = `${targetDirectory}/${componentName}`;

    if (!existsSync(componentDirectoryPath)) {
        await createDirectory(componentDirectoryPath);
    } else {
        window.showErrorMessage('Component already exist');
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



function createDirectory(targetDirectory: string): Promise<void> {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory);
        resolve();
    });
}